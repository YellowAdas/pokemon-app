import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator/paginator';
import { Observable } from 'rxjs';
import { PokemonListItem } from '../../models/pokemon-list-item.model';
import { Store, select } from '@ngrx/store';
import { getList, setPagination, toggleFavs, initFavs  } from '../../state/list/listActions';
import {
  selectPokemonListItems,
  selectPokemonListPagination,
  selectFav,
  selectIsLoading
} from '../../state/list/listReducers';
import { PokemonDetails } from '../../models/pokemon-details.model';
import { loadDetails } from 'src/app/state/PokemonDetail/detailsActions';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  items$: Observable<PokemonDetails[]> = this.store.pipe(
    select(selectPokemonListItems)
  );

  pagination$ = this.store.pipe(select(selectPokemonListPagination));
  favorites$ = this.store.pipe(select(selectFav));
  isLoading$ = this.store.pipe(select(selectIsLoading))

  constructor(
    private store: Store<{}>
  ) {}

  totalCount: number;
  pageSize: number = 20;
  currentPage = 0;
  toggleList = true;

  pokemonListItem: PokemonListItem[] = [];

  ngOnInit() {
    this.store.dispatch(getList());
    this.store.dispatch(initFavs());
  }

  onPageChange(event: PageEvent) {
    this.store.dispatch(
      setPagination({ currentPage: event.pageIndex, limit: event.pageSize })
    );
  }
  
  onFavClick(id: number) {
    this.store.dispatch(toggleFavs({id}))
  }

  getDetails() {
//this.store.select()
  }
}


