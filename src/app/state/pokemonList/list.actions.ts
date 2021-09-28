import { createAction, props } from '@ngrx/store';
import { PokemonDetails } from 'src/app/models/pokemon-details.model';

export const loadList = createAction('[fetch List] get list');
export const loadListSucces = createAction('[fetch List] get list success',
props<{ pokemonList : PokemonDetails[]; limit : number }>());
