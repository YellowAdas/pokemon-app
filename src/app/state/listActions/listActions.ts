import { createAction, props } from '@ngrx/store';
import { PokemonDetails } from '../../models/pokemon-details.model';

export const setPagination = createAction(
  '[fetch-list] set list pagination',
  props<{ limit: number; currentPage: number }>()
);

export const getList = createAction('[fetch-list] get list');

export const loadList = createAction(
  '[fetch-list] load list',
  props<{ pokemonListItems: PokemonDetails[]; totalCount: number }>()
);

export const errorList = createAction(
  '[fetch-list] load list error',
  props<{ message: string }>()
);

export const toggleFavs = createAction(
  '[fav-list] toggle',
  props<{ id: number }>()
);

export const initFavs = createAction('[fav-list] init favorites');

export const setFavs = createAction(
  '[fav-list] set favorites',
  props<{ favorites: number[] }>()
);

export const toggleLoading = createAction('[fetch-list] loading');
