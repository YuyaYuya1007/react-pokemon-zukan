// src/components/PokemonCard.tsx

import { Link } from "react-router-dom";
import type { PokemonWithJapaneseName } from "../api/pokemonWithJapaneseName";
import { pokemonTypesMap } from "../pokemonTypesMap";

interface PokemonCardProps {
  pokemon: PokemonWithJapaneseName;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const getTypeColor = (typeName: string): string => {
    const typeInfo = pokemonTypesMap.find((t) => t.type === typeName);
    return typeInfo?.color || "#A8A878";
  };

  const getJapaneseType = (typeName: string): string => {
    const typeInfo = pokemonTypesMap.find((t) => t.type === typeName);
    return typeInfo?.jaType || typeName;
  };

  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4"
    >
      <div className="flex flex-col items-center">
        <div className="text-gray-500 text-sm font-semibold mb-2">
          No.{pokemon.id.toString().padStart(4, "0")}
        </div>
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.japaneseName}
          className="w-32 h-32 object-contain mb-4"
        />
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {pokemon.japaneseName}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{pokemon.name}</p>
        <div className="flex gap-2">
          {pokemon.types.map((typeInfo) => (
            <span
              key={typeInfo.type.name}
              className="px-3 py-1 rounded-full text-white text-sm font-semibold"
              style={{ backgroundColor: getTypeColor(typeInfo.type.name) }}
            >
              {getJapaneseType(typeInfo.type.name)}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
