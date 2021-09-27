import { act } from '@ngrx/effects/src/act';
import {
  createFeatureSelector,
  createReducer,
  on,
  createSelector,
} from '@ngrx/store';
import { PokemonDetails } from '../../pokemon-details.model';
import { AppState } from '../../state/state';
import {
  errorList,
  getList,
  loadList,
  setFavs,
  setPagination,
  toggleFavs,
} from './listActions';

export interface PokemonListState {
  list: { pokemonList: PokemonDetails[]; error: string };
  pagination: {
    currentPage: number;
    limit: number;
    totalCount: number;
  };
  favorites: number[];
  isLoading: boolean;
}

export const initialState: PokemonListState = {
  list: { pokemonList: [], error: '' },
  pagination: {
    currentPage: 0,
    limit: 5,
    totalCount: 0,
  },
  favorites: [],
  isLoading: false,
};

export const ListReducer = createReducer<PokemonListState>(
  initialState,
  on(getList, (state, action) => ({ ...state, isLoading: true })),
  on(loadList, (state, action) => ({
    ...state,
    list: { pokemonList: action.pokemonListItems, error: '' },
    pagination: {
      ...state.pagination,
      totalCount: action.totalCount,
    },
    isLoading: false,
  })),
  on(errorList, (state, action) => ({
    ...state,
    list: { pokemonList: [], error: action.message },
  })),
  on(setPagination, (state, action) => ({
    ...state,
    pagination: {
      ...state.pagination,
      currentPage: action.currentPage,
      limit: action.limit,
    },
  })),
  on(toggleFavs, (state, action) => {
    const favoritesPokemons = new Set<number>(state.favorites);
    const id = action.id;
    if (!favoritesPokemons.has(id)) {
      favoritesPokemons.add(id);
    } else {
      favoritesPokemons.delete(id);
    }
    return { ...state, favorites: [...favoritesPokemons] };
  }),
  on(setFavs, (state, action) => ({
    ...state,
    favorites: action.favorites,
  }))
);

export const pokemonListFeatureKey = 'PokemonList';

export const selectItems = (state: PokemonListState) => state.list.pokemonList;

export const selectError = (state: PokemonListState) => state.list.error;

export const _selectFav = (state: PokemonListState) => state.favorites;

export const selectPokemonListState = createFeatureSelector<AppState, PokemonListState>(
  pokemonListFeatureKey
);


export const selectPokemonListItems = createSelector(
  selectPokemonListState,
  selectItems
  // (state) => state.list.pokemonList.map(detail => ({...detail, favorite: state.favorites.includes(detail.id)}))
);

export const selectPokemonListPagination = createSelector(
  selectPokemonListState,
  (state) => state.pagination
);

export const selectFav = createSelector(selectPokemonListState, _selectFav);

export const selectIsLoading = createSelector(
  selectPokemonListState,
  (state) => state.isLoading
);
