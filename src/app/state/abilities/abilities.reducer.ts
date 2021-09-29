import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  Action,
  createReducer,
  createSelector,
  createFeatureSelector,
  on,
} from '@ngrx/store';
import { PokemonAbility } from '../../models/pokemon-details.model';
import * as AbilitiesActions from './abilities.actions';
import { AppState } from '../../state/state';
export interface PokemonAbilitiesState extends EntityState<PokemonAbility> {
  // additional state property
  isLoaded: boolean;
}

export const adapter: EntityAdapter<PokemonAbility> =
  createEntityAdapter<PokemonAbility>({ selectId: (ability) => ability.name });

export const initialState: PokemonAbilitiesState = adapter.getInitialState({
  // additional entity state properties
  isLoaded: false,
});

export const pokemonAbilitiesReducer = createReducer(
  initialState,
  on(AbilitiesActions.loadAbilitiesSuccess, (state, { abilityProps }) => {
    return adapter.setAll(abilityProps, { ...state, isLoaded: true });
  })
);

const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

export const pokemonAbilitiesFeatureKey = 'PokemonAbilities';

export const selectPokemonAbilitiesState = createFeatureSelector<
  AppState,
  PokemonAbilitiesState
>(pokemonAbilitiesFeatureKey);

export const selectPokemonAbilities = createSelector(
  selectPokemonAbilitiesState,
  selectEntities
);

export const pokemonAbilitiesIsLoaded = createSelector(
  selectPokemonAbilitiesState,
  (state) => state.isLoaded
);
