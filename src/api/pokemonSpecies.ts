// src/api/pokemonSpecies.ts

import { API_BASE_URL } from "../config";
import type { PokemonSpecies } from "./pokemonSpecies.type";

export const fetchPokemonSpecies = async (
  id: number
): Promise<PokemonSpecies> => {
  const response = await fetch(`${API_BASE_URL}/pokemon-species/${id}`);
  if (!response.ok) {
    throw new Error(`ポケモン種族情報(ID: ${id})の取得に失敗しました`);
  }
  const data = await response.json();
  return data;
};
