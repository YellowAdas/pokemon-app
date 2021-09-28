import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findEng'
})
export class FindEngPipe implements PipeTransform {

  transform(effect_entries: { effect: string, language : {
    name:string}}[]): any {
    return effect_entries.find(x => x.language.name =='en').effect;
  }
}


