// src/queryKeys.ts
import {
  createQueryKeys,
  mergeQueryKeys,
} from "@lukemorales/query-key-factory";

export const pokemonQueryKeys = createQueryKeys("pokemon", {
  list: (page?: number, limit?: number) => [
    "list",
    { page: page || 0, limit: limit || 20 },
  ],
  detail: (id: number) => ["detail", id],
  details: (ids: number[]) => ["details", ids],
});

export const apiQueryKeys = mergeQueryKeys(pokemonQueryKeys);
