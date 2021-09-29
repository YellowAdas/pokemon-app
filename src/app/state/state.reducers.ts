import { createSelector } from '@ngrx/store';
import { pokemonAbilitiesIsLoaded } from './abilities/abilities.reducer';
import { pokemonTypesIsLoaded } from './types/types.reducers';

export const pageLoaded = createSelector(
  pokemonTypesIsLoaded,
  pokemonAbilitiesIsLoaded,
  (typesLoaded, abilitiesLoaded) => typesLoaded && abilitiesLoaded
);
