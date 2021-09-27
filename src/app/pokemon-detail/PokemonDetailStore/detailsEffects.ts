import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { PokemonApiService } from '../../PokemonApiService/pokemon-api.service';
import {
  getDetails,
  getDetailsSuccess,
  getAbilityProp,
  getAbilityPropSuccess,
} from '../PokemonDetailStore/detailsActions';

@Injectable()
export class DetailsEffects {
  constructor(
    private pokemonApiService: PokemonApiService,
    private actions$: Actions
  ) {}

  getDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDetails),
      switchMap((action) =>
        this.pokemonApiService.fetchDetails(action.idOrName)
      ),
      map((pokemonDetails) => getDetailsSuccess({ pokemonDetails }))
    )
  );

  getAbilityProp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAbilityProp),
      switchMap((action) => this.pokemonApiService.fetchAbility(action.name)),
      map((abilityProp) =>
        getAbilityPropSuccess({ abilityProp })
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
