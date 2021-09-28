import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import {
  PokemonDetails,
  PokemonAbility,
} from '../../models/pokemon-details.model';
import { AppState } from '../state';
import {
  loadDetailsSuccess,
  loadAbilityPropSuccess,
} from './detailsActions';

export interface PokemonDetailState {
  pokemonDetails: PokemonDetails | null;
  abilityDesc: PokemonAbility | null;
}

export const initialState: PokemonDetailState = {
  pokemonDetails: null,
  abilityDesc: null,
};

export const DetailsReducer = createReducer<PokemonDetailState>(
  initialState,
  on(loadDetailsSuccess, (state, action) => ({
    ...state,
    pokemonDetails: action.pokemonDetails,
  })),
  on(loadAbilityPropSuccess, (state, action) => ({
    ...state,
    abilityDesc: action.abilityProp,
  }))
);

export const pokemonDetailFeatureKey = 'PokemonDetail';

export const selectPokemonDetailsState = createFeatureSelector<
  AppState,
  PokemonDetailState
>(pokemonDetailFeatureKey);

export const selectDetails = createSelector(
  selectPokemonDetailsState,
  (state) => state.pokemonDetails
);

export const selectAbilityProp = createSelector(
  selectPokemonDetailsState,
  (state) => state.abilityDesc
);


