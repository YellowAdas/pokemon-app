import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import {
  getList,
  loadList,
  errorList,
  setPagination,
  toggleFavs,
  initFavs,
  setFavs,
} from './listActions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { PokemonApiService } from '../../PokemonApiService/pokemon-api.service';
import { Store } from '@ngrx/store';
import { selectFav, selectPokemonListPagination } from './listReducers';
import { loadListSuccess } from '../list via entities/listActions';
@Injectable()
export class ListEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private pokemonApiService: PokemonApiService
  ) {}

  loadList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getList),
      concatLatestFrom((action) =>
        this.store.select(selectPokemonListPagination)
      ),
      switchMap(([action, pagination]) =>
        this.pokemonApiService
          .fetchList(
            pagination.limit,
            pagination.limit * pagination.currentPage
          )
          .pipe(
            switchMap((result) => {
              const resultIds = result.results.map((pokomon) => pokomon.name);
              // przefiltrowac idki przed mapowaniem na fetch;
              // ps. selector do uzycia w page list
              // ps2. selctor do pobrania idikow;
              const resultRequests = resultIds
                //.filter( tutaj filtrowanie () => boolean - true to zostaw, false to zignoruj) // !([].inculdes())
                .map((id) => this.pokemonApiService.fetchDetails(id));
              return forkJoin(resultRequests).pipe(
                map((details) =>
                  loadListSuccess({
                    pokemonListItems: details,
                    totalCount: result.count,
                    list: resultIds,
                  })
                )
              );
            }),
            catchError((error) => of(errorList({ message: error })))
          )
      )
    )
  );

  loadListOnPaginationChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setPagination),
      map(() => getList())
    )
  );

  saveFavorites$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(toggleFavs),
        concatLatestFrom(() => this.store.select(selectFav)),
        tap(([_, favs]) => {
          console.log(favs);
          localStorage.setItem('Favorites', JSON.stringify(favs));
        })
      ),
    { dispatch: false }
  );

  initFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initFavs),
      map(() => {
        const parsed = JSON.parse(localStorage.getItem('Favorites')) ?? [];
        return setFavs({ favorites: parsed });
      })
    )
  );
}
