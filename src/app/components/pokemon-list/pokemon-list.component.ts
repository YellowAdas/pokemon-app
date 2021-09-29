import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator/paginator';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  loadList,
  setPagination,
  toggleFavs,
  initFavs,
} from '../../state/list-via-entities/listActions';
import {
  selectPokemonListItems,
  selectPokemonListPagination,
  selectFav,
  selectIsLoading,
} from '../../state/list-via-entities/listReducers';
import { PokemonDetails } from '../../models/pokemon-details.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  items$: Observable<PokemonDetails[]> = this.store.pipe(
    select(selectPokemonListItems)
  );

  pagination$ = this.store.pipe(select(selectPokemonListPagination));
  favorites$ = this.store.pipe(select(selectFav));
  isLoading$ = this.store.pipe(select(selectIsLoading));

  constructor(private store: Store<{}>) {}

  toggleList = true;

  ngOnInit() {
    this.store.dispatch(loadList());
    this.store.dispatch(initFavs());
    this.items$.subscribe((items) => {
      console.log(items);
    });
  }

  onPageChange(event: PageEvent) {
    this.store.dispatch(
      setPagination({ currentPage: event.pageIndex, limit: event.pageSize })
    );
  }

  onFavClick(id: number) {
    this.store.dispatch(toggleFavs({ id }));
  }
}
