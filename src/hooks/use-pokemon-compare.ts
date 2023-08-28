import { useCallback, useEffect, useState } from "react";
import { IPokemonStat } from "pokeapi-typescript";

import { PokemonService } from "@/services";
import { getWeaknessesAndResistances } from "@/utils";
import { PokemonDetail } from "@/types";

export const usePokemonCompare = () => {
  const [compareActive, setCompareActive] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [compareDataLoading, setCompareDataLoading] = useState(false);
  const [selectedPokemonData, setSelectedPokemonData] =
    useState<PokemonDetail | null>(null);

  const getPokemonData = useCallback(async () => {
    if (selectedPokemon) {
      setCompareDataLoading(true);
      const { id, abilities, name, height, stats, types, weight } =
        await PokemonService.getOnePokemon({
          id: selectedPokemon
        });

      const { flavor_text_entries } = await PokemonService.getOnePokemonSpecies(
        {
          id: selectedPokemon
        }
      );

      const pokemonTypesData = await Promise.all(
        types.map(async (type) => {
          const { damage_relations } = await PokemonService.getOnePokemonType({
            id: type.type.name
          });

          return damage_relations;
        })
      );

      const { weaknesses, resistances } =
        getWeaknessesAndResistances(pokemonTypesData);

      setCompareDataLoading(false);

      return setSelectedPokemonData({
        id,
        ability: abilities[0].ability.name,
        description: flavor_text_entries.find(
          (text) => text.language.name === "en"
        )?.flavor_text!,
        name,
        height,
        resistances,
        stats,
        types,
        weight,
        weaknesses
      });
    }
  }, [selectedPokemon]);

  useEffect(() => {
    getPokemonData();
  }, [selectedPokemon, getPokemonData]);

  return {
    compareActive,
    setCompareActive,
    selectedPokemon,
    setSelectedPokemon,
    compareDataLoading,
    selectedPokemonData
  };
};
