
import {
  pokemonAbilitiesFeatureKey,
  PokemonAbilitiesState,
} from './abilities/abilities.reducer';
import {
  pokemonTypesFeatureKey,
  PokemonTypesState,
} from './types/types.reducers';
import {
  pokemonListFeatureKey,
  PokemonListState,
} from './list-via-entities/listReducers';

export interface AppState {
  [pokemonListFeatureKey]: PokemonListState;
  [pokemonAbilitiesFeatureKey]: PokemonAbilitiesState;
  [pokemonTypesFeatureKey]: PokemonTypesState;
}
