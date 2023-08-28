import { IPokemonSpecies } from "pokeapi-typescript";

import { httpClient } from "@/http";
import {
  BaseListResponse,
  CommonQueryParams,
  Pokemon,
  PokemonListItem
} from "@/types";

export const PokemonService = {
  getPokemonList: async ({
    limit = 20,
    offset = 0
  }: CommonQueryParams = {}) => {
    return await httpClient
      .get("pokemon", {
        searchParams: {
          limit,
          offset
        }
      })
      .json<BaseListResponse<PokemonListItem>>();
  },

  getOnePokemon: async ({ id }: { id: string }) => {
    return await httpClient.get(`pokemon/${id}`).json<Pokemon>();
  },

  getOnePokemonSpecies: async ({ id }: { id: string }) => {
    return await httpClient
      .get(`pokemon-species/${id}`)
      .json<IPokemonSpecies>();
  },

  getAllPokemonTypes: async ({
    limit = 18,
    offset = 0
  }: CommonQueryParams = {}) => {
    return await httpClient
      .get("type", {
        searchParams: {
          limit,
          offset
        }
      })
      .json<BaseListResponse<PokemonListItem>>();
  }
};
