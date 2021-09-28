import { createAction, props } from '@ngrx/store';
import { PokemonDetails, PokemonAbility } from '../../models/pokemon-details.model';

export const loadDetails = createAction('[fetch-detail] get details',
props<{ idOrName : number | string }>()
);

export const loadDetailsSuccess = createAction('[fetch-detail] get details success',
props<{ pokemonDetails : PokemonDetails }>()
);

export const loadAbilityProp = createAction('[fetch-detail] get abilities', props<{ name : string }>() );

export const loadAbilityPropSuccess = createAction('[fetch-detail] load abilities',props<{ abilityProp : PokemonAbility }>()
);

