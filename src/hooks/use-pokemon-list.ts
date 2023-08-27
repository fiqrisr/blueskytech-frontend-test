import { MouseEventHandler, useEffect, useState } from "react";

import { PokemonCard, PokemonListItem } from "@/types";
import { getPokemonListItemDetailData } from "@/utils";

type UsePokemonListProps = {
  initialData: Array<PokemonListItem | PokemonCard>;
};

export const usePokemonList = ({ initialData }: UsePokemonListProps) => {
  const [pokemonListData, setPokemonListData] = useState<
    Array<PokemonListItem | PokemonCard>
  >([]);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPokemonListData(initialData.slice(0, 20));
    setCurrentOffset(20);
    setHasNextPage(true);
  }, [initialData]);

  const loadNextPage: MouseEventHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const nextPagePokemonListItemDetailData =
      await getPokemonListItemDetailData(
        (initialData as unknown as PokemonListItem[]).slice(
          currentOffset,
          currentOffset + 20
        )
      );

    const newPokemonListData = [
      ...pokemonListData,
      ...nextPagePokemonListItemDetailData
    ];

    setPokemonListData(newPokemonListData);
    setCurrentOffset(currentOffset + 20);
    setLoading(false);

    if (newPokemonListData.length < initialData.length)
      return setHasNextPage(true);

    return setHasNextPage(false);
  };

  return {
    pokemonListData,
    hasNextPage,
    loadNextPage,
    loading
  };
};
