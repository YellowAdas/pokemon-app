import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getAbilities } from 'src/app/state/abilities/abilities.actions';
import { PokemonAbility } from '../../../models/pokemon-details.model';
import { selectPokemonAbilities } from '../../../state/abilities/abilities.reducer';

@Component({
  selector: 'app-detail-ability',
  templateUrl: './detail-ability.component.html',
  styleUrls: ['./detail-ability.component.css'],
})
export class DetailAbilityComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<{}>
  ) {}

  paramsName = this.route.snapshot.params['name'];
  abilityProps$: Observable<PokemonAbility> = this.store
    .select(selectPokemonAbilities)
    .pipe(map((abilities) => abilities[this.paramsName]));

  ngOnInit() {
    this.store.dispatch(getAbilities());
  }

  goBackToList() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  findEnglish(array: string[]) {
    return array.find((element) => element == 'en');
  }
}
