// src/api/pokemonWithJapaneseName.ts

import { fetchPokemon, fetchPokemonList } from "./pokemon";
import { fetchPokemonSpecies } from "./pokemonSpecies";
import type { Pokemon } from "./pokemon.type";

export interface PokemonWithJapaneseName extends Pokemon {
  japaneseName: string;
  genus: string;
}

export interface PokemonListWithJapaneseNames {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonWithJapaneseName[];
}

export const fetchPokemonWithJapaneseName = async (
  id: number
): Promise<PokemonWithJapaneseName> => {
  const [pokemon, species] = await Promise.all([
    fetchPokemon(id),
    fetchPokemonSpecies(id),
  ]);

  const japaneseName =
    species.names.find((name) => name.language.name === "ja")?.name ||
    pokemon.name;

  const genus =
    species.genera.find((g) => g.language.name === "ja")?.genus || "";

  return {
    ...pokemon,
    japaneseName,
    genus,
  };
};

export const fetchPokemonListWithJapaneseNames = async (
  offset: number = 0,
  limit: number = 20
): Promise<PokemonListWithJapaneseNames> => {
  const listResponse = await fetchPokemonList(offset, limit);

  const pokemonIds = listResponse.results.map((p) => {
    const id = p.url.split("/").filter(Boolean).pop();
    return parseInt(id || "0", 10);
  });

  const pokemonWithNames = await Promise.all(
    pokemonIds.map((id) => fetchPokemonWithJapaneseName(id))
  );

  return {
    ...listResponse,
    results: pokemonWithNames,
  };
};
