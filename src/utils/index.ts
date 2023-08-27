import { BASE_POKEMON_ARTWORK_IMAGE_URL } from "@/configs";
import { PokemonService } from "@/services";
import { PokemonListItem } from "@/types";

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
