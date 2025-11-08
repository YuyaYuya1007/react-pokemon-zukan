// src/api/pokemonSpecies.type.ts

import type { Name, NamedAPIResource } from "./common.type.ts";

export interface PokemonSpecies {
  id: number;
  name: string;
  names: Name[];
  genera: {
    genus: string;
    language: NamedAPIResource;
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: NamedAPIResource;
    version: NamedAPIResource;
  }[];
}
