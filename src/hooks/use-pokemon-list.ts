import { MouseEventHandler, useEffect, useState } from "react";

import { PokemonCard } from "@/types";

type UsePokemonListProps = {
  initialData: PokemonCard[];
};

export const usePokemonList = ({ initialData }: UsePokemonListProps) => {
  const [pokemonListData, setPokemonListData] = useState<PokemonCard[]>([]);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setPokemonListData(initialData.slice(0, 20));
    setCurrentOffset(20);
    setHasNextPage(true);
  }, [initialData]);

  const loadNextPage: MouseEventHandler = (e) => {
    e.preventDefault();

    const newPokemonListData = [
      ...pokemonListData,
      ...initialData.slice(currentOffset, currentOffset + 20)
    ];

    setPokemonListData(newPokemonListData);

    setCurrentOffset(currentOffset + 20);

    if (newPokemonListData.length < initialData.length)
      return setHasNextPage(true);

    return setHasNextPage(false);
  };

  return {
    pokemonListData,
    hasNextPage,
    loadNextPage
  };
};
