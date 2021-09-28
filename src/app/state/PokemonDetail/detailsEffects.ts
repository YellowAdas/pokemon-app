import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { PokemonApiService } from '../../PokemonApiService/pokemon-api.service';
import {
  loadDetails,
  loadDetailsSuccess,
  loadAbilityProp,
  loadAbilityPropSuccess,
} from './detailsActions';

@Injectable()
export class DetailsEffects {
  constructor(
    private pokemonApiService: PokemonApiService,
    private actions$: Actions
  ) {}

  loadDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDetails),
      switchMap((action) =>
        this.pokemonApiService.fetchDetails(action.idOrName)
      ),
      map((pokemonDetails) => loadDetailsSuccess({ pokemonDetails }))
    )
  );

  loadAbilityProp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAbilityProp),
      switchMap((action) => this.pokemonApiService.fetchAbility(action.name)),
      map((abilityProp) =>
        loadAbilityPropSuccess({ abilityProp })
      )
    )
  );
}
// onFetchDetails() {
//   this.pokemonApiService
//     .fetchDetails(this.paramsName)
//     .subscribe(responseData => {
//       this.pokemonDetails = responseData;
//     });
// }
