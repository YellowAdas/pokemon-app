import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  createFeatureSelector,
  createReducer,
  on,
  createSelector,
} from '@ngrx/store';
import {
  PokemonDetails,
  PokemonType,
} from '../../models/pokemon-details.model';
import { AppState } from '../state';
import {
  loadList,
  loadListSuccess,
  setFavs,
  setPagination,
  toggleFavs,
} from './listActions';

export interface PokemonListState extends EntityState<PokemonDetails> {
  // additional state property
  isLoaded: boolean;

  list: { pokemonList: PokemonDetails[]; error: string };
  pagination: {
    currentPage: number;
    limit: number;
    totalCount: number;
  };
  favorites: number[];
  isLoading: boolean;
}

export const adapter: EntityAdapter<PokemonDetails> =
  createEntityAdapter<PokemonDetails>({
    selectId: (pokemonDetail) => pokemonDetail.name,
  });

export const initialState: PokemonListState = adapter.getInitialState({
  // additional entity state properties
  isLoaded: false,

  list: { pokemonList: [], error: '' },
  pagination: {
    currentPage: 0,
    limit: 5,
    totalCount: 0,
  },
  favorites: [],
  isLoading: false,
});

export const ListReducer = createReducer<PokemonListState>(
  initialState,
  on(loadList, (state, action) => ({ ...state, isLoading: true })),
  on(loadListSuccess, (state, action) => ({
    ...state,
    list: { pokemonList: action.pokemonListItems, error: '' },
    pagination: {
      ...state.pagination,
      totalCount: action.totalCount,
    },
    isLoading: false,
  })),

  on(loadListSuccess, (state, action) => {
    return adapter.setAll(action.pokemonListItems, {
      ...state,
      isLoading: false,
    });
  }),

  // on(AbilitiesActions.loadAbilitiesSuccess, (state, { abilityProps }) => {
  //   return adapter.setAll(abilityProps, { ...state, isLoaded: true });

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

const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

export const pokemonListFeatureKey = 'PokemonList';

export const selectItems = (state: PokemonListState) => state.list.pokemonList;

export const selectError = (state: PokemonListState) => state.list.error;

export const _selectFav = (state: PokemonListState) => state.favorites;

export const selectPokemonListState = createFeatureSelector<
  AppState,
  PokemonListState
>(pokemonListFeatureKey);

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
