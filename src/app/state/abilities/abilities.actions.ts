import { createAction, props } from '@ngrx/store';
import { AbilityProps } from '../../pokemon-details.model';

export const getAbilities = createAction('[get-abilities-list] get abilities');

export const loadAbilitiesSuccess = createAction('[get-abilities-list]] load abilities success',
props<{ abilityProps : AbilityProps[] }>()
);