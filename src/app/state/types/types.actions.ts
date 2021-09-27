import { createAction, props } from '@ngrx/store';
import { PokemonType } from '../../pokemon-details.model';

export const loadTypes = createAction('[get-types-list] load types');

export const loadTypesSuccess = createAction('[get-types-list]] load types success',
props<{ pokemonType : PokemonType[] }>()
);