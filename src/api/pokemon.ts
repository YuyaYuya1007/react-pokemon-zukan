// src/api/pokemon.ts

import { API_BASE_URL } from "../config";
import type { Pokemon, PokemonListResponse } from "./pokemon.type";

export const fetchPokemonList = async (
  offset: number = 0,
  limit: number = 20
): Promise<PokemonListResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("ポケモン一覧の取得に失敗しました");
  }
  const data = await response.json();
  return data;
};

export const fetchPokemon = async (id: number): Promise<Pokemon> => {
  const response = await fetch(`${API_BASE_URL}/pokemon/${id}`);
  if (!response.ok) {
    throw new Error(`ポケモン(ID: ${id})の取得に失敗しました`);
  }
  const data = await response.json();
  return data;
};
