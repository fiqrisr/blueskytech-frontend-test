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

export type PokemonCard = {
  id: number;
  name: string;
  types: Pokemon["types"];
  image: string;
};

export type PokemonDetail = Pick<
  IPokemon,
  "id" | "name" | "height" | "stats" | "types" | "weight"
> & {
  ability: string;
  description: string;
  weaknesses: string[];
  resistances: string[];
};
