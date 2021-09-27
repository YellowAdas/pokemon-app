import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { PokemonApiService } from '../../PokemonApiService/pokemon-api.service';
import { getAbilities, loadAbilitiesSuccess } from './abilities.actions';


@Injectable()
export class AbilitiesListEffects {
  constructor(
    private pokemonApiService: PokemonApiService,
    private store: Store,
    private actions$: Actions
  ) {}

  loadAbilityList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAbilities),
      switchMap(() => this.pokemonApiService.fetchAbilityList(99999)),
      switchMap((result) => {
        const resultRequests = result.results.map((ability) =>
          this.pokemonApiService.fetchAbility(ability.name)
        );
        return forkJoin(resultRequests);
      }),
      map((abilityProps) => loadAbilitiesSuccess({ abilityProps }))
    )
  );
}
