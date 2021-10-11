import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  PokemonDetails,
  PokemonType,
} from '../../models/pokemon-details.model';
import { selectPokemonTypes } from '../../state/types/types.reducers';
import {
  selectPokemonDetail,
  selectPokemonListItems,
} from 'src/app/state/list-via-entities/listReducers';
import { map } from 'rxjs/operators';
import { loadDetail } from 'src/app/state/list-via-entities/listActions';
import { getAbilitiesById } from 'src/app/state/abilities/abilities.actions';

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

  pokemonDetail$: Observable<PokemonDetails> = this.store
    .select(selectPokemonDetail)
    .pipe(map((abilities) => abilities[this.paramsName]));

  paramsName = this.route.snapshot.params['name'];
  types$: Observable<Dictionary<PokemonType>> =
    this.store.select(selectPokemonTypes);

  ngOnInit() {
    this.store.dispatch(loadDetail({ idOrName: this.paramsName }));
    this.pokemonDetail$.subscribe((pokemonDetail) => {
      const ids = pokemonDetail.abilities.map(
        (ability) => ability.ability.name
      );
      this.store.dispatch(getAbilitiesById({ abilitiesIds: ids }));
    });
  }

  goBackToList() {
    this.router.navigate(['']);
  }

  items$: Observable<PokemonDetails[]> = this.store.pipe(
    select(selectPokemonListItems)
  );
}
