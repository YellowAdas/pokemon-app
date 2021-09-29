import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getAbilities } from './state/abilities/abilities.actions';
import { pageLoaded } from './state/state.reducers';
import { loadTypes } from './state/types/types.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<{}>) {}
  ngOnInit() {
    this.store.dispatch(getAbilities());
    this.store.dispatch(loadTypes());
  }
  isLoaded$ = this.store.pipe(select(pageLoaded));
}
