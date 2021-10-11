import { createAction, props } from '@ngrx/store';
import { PokemonAbility } from '../../models/pokemon-details.model';

export const getAbilities = createAction(
  '[get-abilities] get abilities'
);

export const getAbilitiesById = createAction(
  '[get-abilities-list] get abilities by ids',
  props<{ abilitiesIds: string[] }>()
);

export const loadAbilitiesSuccess = createAction(
  '[get-abilities-list]] load abilities success',
  props<{ abilityProps: PokemonAbility[] }>()
);

export const getAbilityById = createAction(
  '[fetch-abilities] get ability by id',
  props<{ abilityId: string }>()
);

export const loadAbilitySuccess = createAction(
  '[fetch-abilities] load needed abilities success',
  props<{ abilityProps: PokemonAbility }>()
);
