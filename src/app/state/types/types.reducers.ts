import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  createReducer,
  createSelector,
  createFeatureSelector,
  on,
} from '@ngrx/store';
import { PokemonType } from '../../pokemon-details.model';
import * as typesActions from './types.actions';
import { AppState } from '../../state/state';



export interface PokemonTypesState extends EntityState<PokemonType> {
  // additional state property
  isLoaded: boolean;
}

export const adapter: EntityAdapter<PokemonType> =
  createEntityAdapter<PokemonType>({selectId: (type)=> type.type.name});

export const initialState: PokemonTypesState = adapter.getInitialState({
  // additional entity state properties
  isLoaded: false,
});

export const pokemonTypesReducer = createReducer(
  initialState,
  on(typesActions.loadTypesSuccess, (state, { pokemonType }) => {
    return adapter.setAll(pokemonType, { ...state, isLoaded: true });
  })
);



const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const pokemonTypesFeatureKey = 'PokemonTypes';

export const selectPokemonTypesState = createFeatureSelector<
  AppState,
  PokemonTypesState
>(pokemonTypesFeatureKey);

export const selectPokemonTypes = createSelector(
  selectPokemonTypesState,
  selectEntities
);

export const pokemonTypesIsLoaded = createSelector(
  selectPokemonTypesState,
  (state) => state.isLoaded
);

