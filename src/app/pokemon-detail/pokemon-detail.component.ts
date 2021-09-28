import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokemonDetails, PokemonType } from '../pokemon-details.model';
import { selectPokemonListItems } from '../pokemon-list/store/listReducers';
import { loadTypes } from '../state/types/types.actions';
import { selectPokemonTypes } from '../state/types/types.reducers';
import { getDetails } from './PokemonDetailStore/detailsActions';
import { selectDetails } from './PokemonDetailStore/detailsReducers';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<{}>
  ) {}

  paramsName = this.route.snapshot.params['name'];
  types$ : Observable<PokemonType> = this.store.select(selectPokemonTypes).pipe(map((types) => types.types.type[this.paramsName]));

  ngOnInit() {
    this.store.dispatch(getDetails({ idOrName: this.paramsName }));
    this.store.dispatch(loadTypes());
  }

  pokemonDetails$: Observable<PokemonDetails> =
    this.store.select(selectDetails);

  goBackToList() {
    this.router.navigate(['']);
  }

  items$: Observable<PokemonDetails[]> = this.store.pipe(
    select(selectPokemonListItems)
  );
}
