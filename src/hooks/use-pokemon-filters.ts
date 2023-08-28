import { useState } from "react";

export const usePokemonFilters = () => {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined
  );
  const [selectedSort, setSelectedSort] = useState("asc");

  return {
    search,
    setSearch,
    selectedType,
    setSelectedType,
    selectedSort,
    setSelectedSort
  };
};
