import { httpClient } from "@/http";
import { BaseListResponse, CommonQueryParams, PokemonListItem } from "@/types";

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
  }
};
