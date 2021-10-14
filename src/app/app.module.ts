import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AppComponent } from './app.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import {
  ListReducer,
  pokemonListFeatureKey,
} from './state/list-via-entities/listReducers';
import { ListEffects } from './state/list-via-entities/listEffects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PokemonTypeToColorPipe } from './pipes/pokemon-type-to-color.pipe';
import {
  pokemonAbilitiesReducer,
  pokemonAbilitiesFeatureKey,
} from './state/abilities/abilities.reducer';
import { DetailAbilityComponent } from './components/pokemon-detail/detail-ability/detail-ability.component';
import { FindEngPipe } from './components/pokemon-detail/detail-ability/find-eng.pipe';
import { HeaderComponent } from './components/header/header.component';
import { AbilitiesListEffects } from './state/abilities/abilities.effects';
import {
  pokemonTypesFeatureKey,
  pokemonTypesReducer,
} from './state/types/types.reducers';
import { TypesListEffects } from './state/types/types.effects';
import { ControlValueAccessorDirective } from './shared/control-value-accessor.directive';

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
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot(
      {
        [pokemonListFeatureKey]: ListReducer,
        [pokemonAbilitiesFeatureKey]: pokemonAbilitiesReducer,
        [pokemonTypesFeatureKey]: pokemonTypesReducer,
      },
      {}
    ),
    EffectsModule.forRoot([
      ListEffects,
      AbilitiesListEffects,
      TypesListEffects,
    ]),
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
    ControlValueAccessorDirective,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
  ],
})
export class AppModule {}
