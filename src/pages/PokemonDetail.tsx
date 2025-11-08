// src/pages/PokemonDetail.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonWithJapaneseName } from "../api/pokemonWithJapaneseName";
import { pokemonTypesMap } from "../pokemonTypesMap";

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const pokemonId = parseInt(id || "0", 10);

  const {
    data: pokemon,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pokemon", "detail", pokemonId],
    queryFn: () => fetchPokemonWithJapaneseName(pokemonId),
    enabled: pokemonId > 0,
  });

  const getTypeColor = (typeName: string): string => {
    const typeInfo = pokemonTypesMap.find((t) => t.type === typeName);
    return typeInfo?.color || "#A8A878";
  };

  const getJapaneseType = (typeName: string): string => {
    const typeInfo = pokemonTypesMap.find((t) => t.type === typeName);
    return typeInfo?.jaType || typeName;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-500 text-xl">エラーが発生しました</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {pokemon.japaneseName}
          </h1>
          <p className="text-gray-500 text-lg">
            No.{pokemon.id.toString().padStart(4, "0")} - {pokemon.name}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex justify-center items-center">
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.japaneseName}
              className="w-64 h-64 object-contain"
            />
          </div>

          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-3">基本情報</h2>
              <div className="space-y-2">
                <div className="flex">
                  <span className="font-semibold w-24">分類:</span>
                  <span>{pokemon.genus}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-24">高さ:</span>
                  <span>{pokemon.height / 10} m</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-24">重さ:</span>
                  <span>{pokemon.weight / 10} kg</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-3">タイプ</h2>
              <div className="flex gap-2">
                {pokemon.types.map((typeInfo) => (
                  <span
                    key={typeInfo.type.name}
                    className="px-4 py-2 rounded-full text-white text-lg font-semibold"
                    style={{
                      backgroundColor: getTypeColor(typeInfo.type.name),
                    }}
                  >
                    {getJapaneseType(typeInfo.type.name)}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-3">特性</h2>
              <div className="space-y-2">
                {pokemon.abilities.map((abilityInfo, index) => (
                  <div key={index} className="flex items-center">
                    <span className="px-3 py-1 bg-gray-200 rounded">
                      {abilityInfo.ability.name}
                    </span>
                    {abilityInfo.is_hidden && (
                      <span className="ml-2 text-sm text-gray-500">
                        (隠れ特性)
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">種族値</h2>
          <div className="space-y-3">
            {pokemon.stats.map((stat) => {
              const statNames: { [key: string]: string } = {
                hp: "HP",
                attack: "こうげき",
                defense: "ぼうぎょ",
                "special-attack": "とくこう",
                "special-defense": "とくぼう",
                speed: "すばやさ",
              };
              return (
                <div key={stat.stat.name}>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">
                      {statNames[stat.stat.name] || stat.stat.name}
                    </span>
                    <span>{stat.base_stat}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
