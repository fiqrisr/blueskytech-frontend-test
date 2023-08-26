import type { IPokemon } from "pokeapi-typescript";

export type BaseListResponse<TResource> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TResource[];
};

export type CommonQueryParams = {
  limit?: number;
  offset?: number;
};

export type PokemonListItem = {
  name: string;
  url: string;
};

export type Pokemon = IPokemon;
