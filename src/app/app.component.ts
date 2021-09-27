import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { pokemonAbilitiesIsLoaded } from './state/abilities/abilities.reducer';
import { getAbilities } from './state/abilities/abilities.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<{}>) {}
  ngOnInit(){
    this.store.dispatch(getAbilities());
  }
  isLoaded$ = this.store.pipe(select(pokemonAbilitiesIsLoaded));
}
