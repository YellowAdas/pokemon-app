import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PokemonDetails, PokemonAbility, PokemonDetailsType, PokemonType } from '../models/pokemon-details.model';
import { PokemonListItem } from '../models/pokemon-list-item.model';

export interface ListResult {
  count: number;
  next: string;
  prev: string;
  results: {name:string; url: string;}[];
}


@Injectable({ providedIn: 'root' })
export class PokemonApiService {
  constructor(private http: HttpClient) {}

  fetchList(limit: number, offset: number) {
    const params = new HttpParams({ fromObject: { limit, offset } });

    return this.http.get<ListResult>(
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
    return this.http.get<PokemonAbility>(
      `https://pokeapi.co/api/v2/ability/${name}`
    );
  }

  fetchTypesList(limit: number) {    const params = new HttpParams({ fromObject: { limit } });
  return this.http.get<ListResult>(`https://pokeapi.co/api/v2/type/`,{ params });
}

fetchType(name: string) {
  return this.http.get<PokemonType>(
    `https://pokeapi.co/api/v2/type/${name}`
  );
}

  fetchAbilityList(limit: number) {    const params = new HttpParams({ fromObject: { limit } });
    return this.http.get<ListResult>(`https://pokeapi.co/api/v2/ability/`,{ params });
  }
}
