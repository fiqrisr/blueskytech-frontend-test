import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import Fuse from "fuse.js";

import { PokemonCard, PokemonListItem } from "@/types";
import { getPokemonListItemDetailData } from "@/utils";

type UsePokemonListProps = {
  initialData: Array<PokemonListItem | PokemonCard>;
  filters?: Partial<{
    search: string;
    type: string;
    sort: string;
  }>;
};

export const usePokemonList = ({
  initialData,
  filters
}: UsePokemonListProps) => {
  const [pokemonListData, setPokemonListData] = useState<
    Array<PokemonListItem | PokemonCard>
  >([]);
  const [initialFilteredPokemonListData, setInitialFilteredPokemonListData] =
    useState<Array<PokemonListItem | PokemonCard>>([]);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);

  useEffect(() => {
    if (!filters?.search) {
      setPokemonListData(initialData.slice(0, 20));
      setCurrentOffset(20);
      setHasNextPage(true);
    }
  }, [initialData, filters?.search]);

  const loadNextPage: MouseEventHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    let nextPagePokemonListItemDetailData: PokemonListItem[] = [];

    if (!filters?.search) {
      nextPagePokemonListItemDetailData = await getPokemonListItemDetailData(
        (initialData as unknown as PokemonListItem[]).slice(
          currentOffset,
          currentOffset + 20
        )
      );
    }

    if (filters?.search) {
      nextPagePokemonListItemDetailData = await getPokemonListItemDetailData(
        (initialFilteredPokemonListData as unknown as PokemonListItem[]).slice(
          currentOffset,
          currentOffset + 20
        )
      );
    }

    const newPokemonListData = [
      ...pokemonListData,
      ...nextPagePokemonListItemDetailData
    ];

    setPokemonListData(newPokemonListData);
    setCurrentOffset(currentOffset + 20);
    setLoading(false);

    if (newPokemonListData.length < initialData.length && !filters?.search)
      return setHasNextPage(true);

    if (
      newPokemonListData.length < initialFilteredPokemonListData.length &&
      filters?.search
    )
      return setHasNextPage(true);

    return setHasNextPage(false);
  };

  const filterPokemonList = useCallback(() => {
    if (initialData as unknown as PokemonListItem[]) {
      setHasNextPage(false);

      const fuse = new Fuse(initialData, {
        keys: ["name"]
      });

      let filteredPokemon: Array<PokemonListItem | PokemonCard> = initialData;

      if (filters?.search)
        filteredPokemon = fuse
          .search(filters?.search)
          .map((result) => result.item);

      return filteredPokemon;
    }

    return [];
  }, [filters?.search, initialData]);

  const populateFilteredPokemonList = useCallback(async () => {
    if (filters?.search) {
      const filterdPokemonData = filterPokemonList();
      setInitialFilteredPokemonListData(filterdPokemonData);

      setCurrentOffset(20);

      if (filterdPokemonData.length > 20) setHasNextPage(true);

      setFilterLoading(true);

      const filteredPokemonDataWithDetail = await getPokemonListItemDetailData(
        (filterdPokemonData as unknown as PokemonListItem[]).slice(0, 20)
      );

      setPokemonListData(filteredPokemonDataWithDetail);
      setFilterLoading(false);
    }
  }, [filters?.search, filterPokemonList]);

  useEffect(() => {
    populateFilteredPokemonList();
  }, [filters?.search, populateFilteredPokemonList]);

  return {
    pokemonListData,
    hasNextPage,
    loadNextPage,
    loading,
    filterLoading
  };
};
