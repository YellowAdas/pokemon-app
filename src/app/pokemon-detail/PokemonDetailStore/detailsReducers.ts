import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import {
  PokemonDetails,
  AbilityProps,
} from '../../pokemon-details.model';
import { AppState } from '../../state/state';
import {
  getDetailsSuccess,
  getAbilityPropSuccess,
} from '../PokemonDetailStore/detailsActions';

export interface PokemonDetailState {
  pokemonDetails: PokemonDetails | null;
  abilityDesc: AbilityProps | null;
}

export const initialState: PokemonDetailState = {
  pokemonDetails: null,
  abilityDesc: null,
};

export const DetailsReducer = createReducer<PokemonDetailState>(
  initialState,
  on(getDetailsSuccess, (state, action) => ({
    ...state,
    pokemonDetails: action.pokemonDetails,
  })),
  on(getAbilityPropSuccess, (state, action) => ({
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


