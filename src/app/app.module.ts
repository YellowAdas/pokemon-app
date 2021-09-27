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
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import {
  ListReducer,
  pokemonListFeatureKey,
} from './pokemon-list/store/listReducers';
import { ListEffects } from './pokemon-list/store/listEffects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PokemonTypeToColorPipe } from './pokemon-type-to-color.pipe';
import { DetailsEffects } from './pokemon-detail/PokemonDetailStore/detailsEffects';
import {
  pokemonAbilitiesReducer,
  pokemonAbilitiesFeatureKey,
} from './state/abilities/abilities.reducer';
import {
  DetailsReducer,
  pokemonDetailFeatureKey,
} from './pokemon-detail/PokemonDetailStore/detailsReducers';
import { DetailAbilityComponent } from './pokemon-detail/detail-ability/detail-ability.component';
import { FindEngPipe } from './pokemon-detail/detail-ability/find-eng.pipe';
import { HeaderComponent } from './header/header.component';
import { AbilitiesListEffects } from './state/abilities/abilities.effects';
import { pokemonTypesFeatureKey, pokemonTypesReducer } from './state/types/types.reducers';

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
    EffectsModule.forRoot([ListEffects, DetailsEffects, AbilitiesListEffects]),
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
