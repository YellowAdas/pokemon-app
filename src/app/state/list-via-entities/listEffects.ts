import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import {
  setPagination,
  toggleFavs,
  initFavs,
  setFavs,
  loadListSuccess,
  loadListCheck,
  loadDetail,
  loadDetailsSuccess,
  loadList,
  initNotes,
  setNotes,
} from './listActions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { EMPTY, forkJoin, of, pipe } from 'rxjs';
import { PokemonApiService } from '../../PokemonApiService/pokemon-api.service';
import { Store } from '@ngrx/store';
import {
  selectFav,
  selectPokemonDetail,
  selectPokemonListIds,
  selectPokemonListPagination,
} from './listReducers';

@Injectable()
export class ListEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private pokemonApiService: PokemonApiService
  ) {}

  loadDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDetail),
      concatLatestFrom(() => this.store.select(selectPokemonListIds)),
      switchMap(([action, ids]) => {
        if (!(ids as string[]).includes(action.idOrName))
          return this.pokemonApiService
            .fetchDetails(action.idOrName)
            .pipe(
              map((pokemonDetails) => loadDetailsSuccess({ pokemonDetails }))
            );
        return EMPTY;
      })
    )
  );

  loadList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadList),
      concatLatestFrom(() => this.store.select(selectPokemonListPagination)),
      switchMap(([_, pagination]) =>
        this.pokemonApiService
          .fetchList(
            pagination.limit,
            pagination.limit * pagination.currentPage
          )
          .pipe(
            concatLatestFrom(() => this.store.select(selectPokemonListIds)),
            switchMap(([result, ids]) => {
              const resultIds = result.results.map((pokemon) => pokemon.name);

              // przefiltrowac idki przed mapowaniem na fetch;
              // ps. selector do uzycia w page list
              // ps2. selctor do pobrania idikow;
              const resultRequests = resultIds
                .filter((id) => !(ids as string[]).includes(id))

                //.filter( tutaj filtrowanie () => boolean - true to zostaw, false to zignoruj) // !([].inculdes())
                .map((id) => this.pokemonApiService.fetchDetails(id));
              if (resultRequests.length > 0) {
                return forkJoin(resultRequests).pipe(
                  map((details) =>
                    loadListSuccess({
                      pokemonListItems: details,
                      totalCount: result.count,
                      lista: resultIds,
                    })
                  )
                );
              }
              return of(
                loadListSuccess({
                  pokemonListItems: [],
                  totalCount: result.count,
                  lista: resultIds,
                })
              );
            })
          )
      )
    )
  );

  loadListOnPaginationChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setPagination),
      map(() => loadList())
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

  initNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initNotes),
      map(() => {
        const parsed = JSON.parse(localStorage.getItem('Notatki: ')) ?? '';
        return setNotes({ quickNote: parsed });
      })
    )
  );
}
