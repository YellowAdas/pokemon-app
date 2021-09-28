import { createSelector } from '@ngrx/store/src/selector';
import {
  pokemonDetailFeatureKey,
  PokemonDetailState,
  selectDetails,
} from './PokemonDetail/detailsReducers';
import {
  pokemonListFeatureKey,
  PokemonListState,
} from './listActions/listReducers';

import { pokemonAbilitiesFeatureKey, PokemonAbilitiesState, selectPokemonAbilities } from './abilities/abilities.reducer';
import { pokemonTypesFeatureKey, PokemonTypesState } from './types/types.reducers';

export interface AppState {
  [pokemonListFeatureKey]: PokemonListState;
  [pokemonDetailFeatureKey]: PokemonDetailState;
  [pokemonAbilitiesFeatureKey]: PokemonAbilitiesState;
  [pokemonTypesFeatureKey]: PokemonTypesState;
}