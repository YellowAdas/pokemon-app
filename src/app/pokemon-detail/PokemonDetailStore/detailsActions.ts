import { createAction, props } from '@ngrx/store';
import { PokemonDetails, AbilityProps } from '../../pokemon-details.model';

export const getDetails = createAction('[fetch-detail] get details',
props<{ idOrName : number | string }>()
);

export const getDetailsSuccess = createAction('[fetch-detail] get details success',
props<{ pokemonDetails : PokemonDetails }>()
);

export const getAbilityProp = createAction('[fetch-detail] get abilities', props<{ name : string }>() );

export const getAbilityPropSuccess = createAction('[fetch-detail] load abilities',props<{ abilityProp : AbilityProps }>()
);

