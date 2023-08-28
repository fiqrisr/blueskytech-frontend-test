import { useState } from "react";
import { useDebounce } from ".";

export const usePokemonFilters = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
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
    setSelectedSort,
    debouncedSearch
  };
};
