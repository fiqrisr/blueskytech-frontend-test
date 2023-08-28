import { BASE_POKEMON_ARTWORK_IMAGE_URL } from "@/configs";
import { PokemonService } from "@/services";
import { PokemonListItem } from "@/types";
import { IType } from "pokeapi-typescript";

export const getPokemonListItemDetailData = async (
  pokemonList: PokemonListItem[]
) => {
  return Promise.all(
    pokemonList.map(async (pokemon) => {
      const pokemonId = pokemon.url.split("/")[6];
      const pokemonDetails = await PokemonService.getOnePokemon({
        id: pokemonId
      });
      const pokemonImage = `${BASE_POKEMON_ARTWORK_IMAGE_URL}/${pokemonId}.png`;

      return {
        id: pokemonDetails.id,
        url: pokemon.url,
        name: pokemonDetails.name,
        image: pokemonImage,
        types: pokemonDetails.types
      };
    })
  );
};

export const generatePokemonList = async (pokemonList: PokemonListItem[]) => {
  const first20PokemonData = await getPokemonListItemDetailData(
    pokemonList.slice(0, 20)
  );

  return [...first20PokemonData, ...pokemonList.slice(20, pokemonList.length)];
};

export const removeDuplicates = (array: Array<string>) => {
  return array.filter(
    (resistance, index) => array.indexOf(resistance) === index
  );
};

export const getWeaknessesAndResistances = (
  damage_relations: IType["damage_relations"][]
) => {
  const allWeaknesses: Array<string> = [];
  const allResistances: Array<string> = [];
  const allNoDamages: Array<string> = [];

  damage_relations.forEach((dmg) => {
    allWeaknesses.push(
      ...dmg.double_damage_from.map((doubleDamageType) => doubleDamageType.name)
    );

    allResistances.push(
      ...dmg.half_damage_from.map((halfDamageType) => halfDamageType.name)
    );

    allNoDamages.push(
      ...dmg.no_damage_from.map((noDamageType) => noDamageType.name)
    );
  });

  const weaknesses = removeDuplicates(
    allWeaknesses
      .filter((weakness) => !allResistances.includes(weakness))
      .filter((weakness) => !allNoDamages.includes(weakness))
  ).sort();

  const resistances = removeDuplicates(
    allResistances.filter((resistance) => !allWeaknesses.includes(resistance))
  ).sort();

  return { weaknesses, resistances };
};

export const capitalize = (name: string) => {
  return name.replace(/\b\w/g, (l) => l.toUpperCase());
};
