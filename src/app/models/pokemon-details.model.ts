export interface PokemonDetails {
  name: string;
  height: number;
  id: number;
  abilities: PokemonDetailsAbility[];
  sprites: {
    front_default: string;
    back_default: string;
  };
  types: PokemonDetailsType[];
}

export interface PokemonDetailsAbility {
  ability: {
    name: string;
    description: string;
    effect_entries: {
      effect: string;
      language: string;
    };
    url: string;
    short_effect: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonDetailsType {
  type: {
    name: string;
    url: string;
  };
  slot: number;
}

export interface PokemonAbility {
  name: string;
  description: string;
  effect_entries: {
    effect: string;
    language: 
    {name : string};
  }[];
  
}


export interface PokemonType {
  name: string;
}