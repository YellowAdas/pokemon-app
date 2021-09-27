import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonTypeToColor',
})
export class PokemonTypeToColorPipe implements PipeTransform {
  transform(types: { type: { name: string } }[]): any {
    const typeNames: string[] = types.map((el) => el.type.name);
    if (typeNames.length == 0) {
      return 'gray';
    }
    const partSize = 100 / typeNames.length;

    const colorsToUse = typeNames.map((typeName) => this.typeToColor(typeName));

    const gradientParts = [];

    for (let part = 0; part < typeNames.length; part++) {
      gradientParts.push(`${colorsToUse[part]} ${partSize * part}%`);
      gradientParts.push(`${colorsToUse[part]} ${partSize * (part + 1)}%`);
    }

    const gradient = `linear-gradient(180deg, ${gradientParts.join(', ')})`;
    return gradient;
  }

  typeToColor(typeName: string) {
    switch (typeName) {
      case 'normal':
        return '#94946A';
      case 'fire':
        return '#D3712A';
      case 'water':
        return '#5C7FD3';
      case 'grass':
        return '#6AB046';
      case 'electric':
        return '#DAB72A';
      case 'ice':
        return '#86BEBE';
      case 'fighting':
        return '#A92A23';
      case 'poison':
        return '#8D388D';
      case 'ground':
        return '#C5A95C';
      case 'flying':
        return '#AEA5D9';
      case 'psychic':
        return '#DA4D78';
      case 'bug':
        return '#94A21C';
      case 'rock':
        return '#A28D31';
      case 'ghost':
        return '#634D86';
      case 'dark':
        return '#634D3F';
      case 'dragon':
        return '#6331DA';
      case 'steel':
        return '#A2A2B7';
      case 'fairy':
        return '#D3A0A5';
      default:
        return 'gray';
    }
  }
}
