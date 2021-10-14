import { createAction, props } from '@ngrx/store';
import { PokemonDetails } from '../../models/pokemon-details.model';

export const setPagination = createAction(
  '[fetch-list] set list pagination',
  props<{ limit: number; currentPage: number }>()
);

export const loadList = createAction('[fetch-list] get list');

export const loadListCheck = createAction('[fetch-list] get list check');

export const loadListSuccess = createAction(
  '[fetch-list] load list',
  props<{
    pokemonListItems: PokemonDetails[];
    totalCount: number;
    lista: string[];
  }>()
);

export const loadListError = createAction(
  '[fetch-list] load list error',
  props<{ message: string }>()
);

export const initNotes = createAction('[quick-notes] Initializing');

export const setNotes = createAction(
  '[quick-notes] Setting',
  props<{ quickNote: string }>()
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

export const loadDetail = createAction(
  '[detail] load detail',
  props<{ idOrName: string }>()
);

export const loadDetailsSuccess = createAction(
  '[detail] load detail success',
  props<{ pokemonDetails: PokemonDetails }>()
);
