import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { PokemonApiService } from '../../PokemonApiService/pokemon-api.service';
import { loadTypes, loadTypesSuccess } from './types.actions';


@Injectable()
export class TypesListEffects {
  constructor(
    private pokemonApiService: PokemonApiService,
    private actions$: Actions
  ) {}

  loadAbilityList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTypes),
      switchMap(() => this.pokemonApiService.fetchTypesList(99999)),
      switchMap((result) => {
        const resultRequests = result.results.map((type) =>
          this.pokemonApiService.fetchType(type.name)
        );
        return forkJoin(resultRequests);
      }),
      map((pokemonType) => loadTypesSuccess({ pokemonType }))
    )
  );
}
