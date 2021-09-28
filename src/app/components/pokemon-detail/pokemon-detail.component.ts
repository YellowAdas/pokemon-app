import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokemonDetails, PokemonDetailsType, PokemonType } from '../../models/pokemon-details.model';
import { selectPokemonListItems } from '../../state/listActions/listReducers';
import { loadTypes } from '../../state/types/types.actions';
import { selectPokemonTypes } from '../../state/types/types.reducers';
import { loadDetails } from '../../state/PokemonDetail/detailsActions';
import { selectDetails } from '../../state/PokemonDetail/detailsReducers';

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
  types$ : Observable<Dictionary<PokemonType>> = this.store.select(selectPokemonTypes);

  ngOnInit() {
    this.store.dispatch(loadDetails({ idOrName: this.paramsName }));
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
