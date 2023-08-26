import { BASE_POKEMON_ARTWORK_IMAGE_URL } from "@/configs";
import { PokemonListItem } from "@/types";

export const generatePokemonList = (pokemonList: PokemonListItem[]) => {
  return pokemonList.map((pokemon) => {
    const pokemonId = pokemon.url.split("/")[6];
    const pokemonImage = `${BASE_POKEMON_ARTWORK_IMAGE_URL}/${pokemonId}.png`;

    return {
      id: +pokemonId,
      image: pokemonImage,
      ...pokemon
    };
  });
};
