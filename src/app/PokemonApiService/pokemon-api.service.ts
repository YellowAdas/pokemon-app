import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PokemonDetails, AbilityProps } from '../pokemon-details.model';
import { PokemonListItem } from '../pokemon-list-item.model';

export interface ListWrapper<ListItem> {
  count: number;
  next: string;
  prev: string;
  results: ListItem[];
}

export type PokemonListResult = ListWrapper<PokemonListItem>;

@Injectable({ providedIn: 'root' })
export class PokemonApiService {
  constructor(private http: HttpClient) {}

  fetchList(limit: number, offset: number) {
    const params = new HttpParams({ fromObject: { limit, offset } });

    return this.http.get<PokemonListResult>(
      'https://pokeapi.co/api/v2/pokemon',
      { params }
    );
  }

  fetchDetails(nameOrId: string | number) {
    return this.http.get<PokemonDetails>(
      `https://pokeapi.co/api/v2/pokemon/${nameOrId}`
    );
  }

  fetchAbility(name: string) {
    return this.http.get<AbilityProps>(
      `https://pokeapi.co/api/v2/ability/${name}`
    );
  }

  fetchAbilityList(limit: number) {    const params = new HttpParams({ fromObject: { limit } });
    return this.http.get<ListWrapper<AbilityProps>>(`https://pokeapi.co/api/v2/ability/`,{ params });
  }
}
