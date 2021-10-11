import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { PokemonApiService } from '../../PokemonApiService/pokemon-api.service';
import {
  loadAbilitiesSuccess,
  getAbilityById,
  getAbilitiesById,
  getAbilities,
} from './abilities.actions';
import {
  selectPokemonAbilities,
  selectPokemonAbilitiesIds,
} from './abilities.reducer';
import { Store } from '@ngrx/store';
import { PokemonAbility } from 'src/app/models/pokemon-details.model';
@Injectable()
export class AbilitiesListEffects {
  constructor(
    private pokemonApiService: PokemonApiService,
    private actions$: Actions,
    private store: Store
  ) {}

  loadAbilities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAbilities),
      switchMap(() => this.pokemonApiService.fetchAbilityList(99999)),
      switchMap((result) => {
        const abilitiesIds = result.results.map((ability) => ability.name);
        return of(getAbilitiesById({ abilitiesIds }));
      })
    )
  );

  loadAbilityById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAbilityById),
      concatLatestFrom(() => this.store.select(selectPokemonAbilitiesIds)),
      switchMap(([action, ids]) => {
        //chce sprawdzic czy musze zrobic request
        if (!(ids as string[]).includes(action.abilityId)) {
          //jezeli nie ma w ids to chce
          return forkJoin([
            this.pokemonApiService.fetchAbility(action.abilityId),
          ]);
        }
        //jezeli nie ma to ignoruje
        return of([] as PokemonAbility[]);
      }),
      map((abilityProps) => loadAbilitiesSuccess({ abilityProps }))
    )
  );

  loadAbilitesByIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAbilitiesById),
      concatLatestFrom(() => this.store.select(selectPokemonAbilitiesIds)),
      switchMap(([action, ids]) => {
        const resultRequests = action.abilitiesIds
          .filter((id) => !(ids as string[]).includes(id))
          .map((id) => this.pokemonApiService.fetchAbility(id));
        if (resultRequests.length > 0) {
          return forkJoin(resultRequests).pipe(
            map((abilities) =>
              loadAbilitiesSuccess({
                abilityProps: abilities,
              })
            )
          );
        }
        return of(
          loadAbilitiesSuccess({
            abilityProps: [],
          })
        );

        //zamiast pojdynczego musisz zrobic dla wielu - > action.abilieteisIds.filter().map()
      })
    )
  );
}
