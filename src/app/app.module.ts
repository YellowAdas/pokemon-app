import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import {
  ListReducer,
  pokemonListFeatureKey,
} from './state/list/listReducers';
import { ListEffects } from './state/list/listEffects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PokemonTypeToColorPipe } from './pipes/pokemon-type-to-color.pipe';
import { DetailsEffects } from './state/PokemonDetail/detailsEffects';
import {
  pokemonAbilitiesReducer,
  pokemonAbilitiesFeatureKey,
} from './state/abilities/abilities.reducer';
import {
  DetailsReducer,
  pokemonDetailFeatureKey,
} from './state/PokemonDetail/detailsReducers';
import { DetailAbilityComponent } from './components/pokemon-detail/detail-ability/detail-ability.component';
import { FindEngPipe } from './components/pokemon-detail/detail-ability/find-eng.pipe';
import { HeaderComponent } from './components/header/header.component';
import { AbilitiesListEffects } from './state/abilities/abilities.effects';
import { pokemonTypesFeatureKey, pokemonTypesReducer } from './state/types/types.reducers';
import { TypesListEffects } from './state/types/types.effects';

const appRoutes: Routes = [
  { path: '', component: PokemonListComponent },
  {
    path: 'pokemonDetail/:name',
    component: PokemonDetailComponent,
  },
  {
    path: 'pokemonDetail/:name/ability/:name',
    component: DetailAbilityComponent,
  },
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    MatPaginatorModule,
    MatIconModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot(
      {
        [pokemonListFeatureKey]: ListReducer,
        [pokemonDetailFeatureKey]: DetailsReducer,
        [pokemonAbilitiesFeatureKey]: pokemonAbilitiesReducer,
        [pokemonTypesFeatureKey]: pokemonTypesReducer,
      },
      {}
    ),
    EffectsModule.forRoot([ListEffects, DetailsEffects, AbilitiesListEffects, TypesListEffects]),
    StoreDevtoolsModule.instrument({}),
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    PokemonTypeToColorPipe,
    DetailAbilityComponent,
    FindEngPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
