import { GetServerSideProps } from "next";
import Head from "next/head";

import {
  Button,
  Spinner,
  PokemonCard,
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
  Input
} from "@/components";
import { PokemonService } from "@/services";
import { PokemonCard as PokemonCardProps, PokemonListItem } from "@/types";
import { generatePokemonList } from "@/utils";
import { usePokemonList, usePokemonFilters } from "@/hooks";
import { MoveRight } from "lucide-react";

type HomePageProps = {
  pokemonList: Array<PokemonListItem | PokemonCardProps>;
  pokemonTypes: Array<PokemonListItem>;
};

const HomePage = ({ pokemonList, pokemonTypes = [] }: HomePageProps) => {
  const {
    search,
    setSearch,
    selectedType,
    setSelectedType,
    selectedSort,
    setSelectedSort,
    debouncedSearch
  } = usePokemonFilters();
  const { pokemonListData, hasNextPage, loadNextPage, loading, filterLoading } =
    usePokemonList({
      initialData: pokemonList,
      filters: {
        search: debouncedSearch
      }
    });

  return (
    <>
      <Head>
        <title>Home | Pokedex</title>
      </Head>

      <div className="flex gap-5">
        <Input
          placeholder="Search pokemon name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="max-w-[180px]">
            <SelectValue placeholder="Pokemon type" />
          </SelectTrigger>
          <SelectContent>
            {pokemonTypes.map((type) => (
              <SelectItem key={type.name} value={type.name}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedSort} onValueChange={setSelectedSort}>
          <SelectTrigger className="max-w-[180px]">
            <SelectValue placeholder="Sort pokemon" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">
              <div className="flex gap-1">
                <span>Name</span>
                <span>( A</span>
                <MoveRight className="mx-1" size={20} />
                <span>Z )</span>
              </div>
            </SelectItem>
            <SelectItem value="desc">
              <div className="flex gap-1">
                <span>Name</span>
                <span>( Z</span>
                <MoveRight className="mx-1" size={20} />
                <span>A )</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filterLoading ? (
        <div className="flex justify-center items-center mt-8">
          {filterLoading && <Spinner />}
        </div>
      ) : (
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
          {(pokemonListData as unknown as PokemonCardProps[]).map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.types}
            />
          ))}
        </section>
      )}

      <div className="flex justify-center items-center mt-8">
        {loading && <Spinner />}

        {hasNextPage && !loading && !filterLoading && (
          <Button onClick={loadNextPage} variant="outline">
            See more
          </Button>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const pokemonListRes = await PokemonService.getPokemonList({ limit: 200 });
  const pokemonListData = await generatePokemonList(pokemonListRes.results);
  const pokemonTypes = await PokemonService.getAllPokemonTypes();

  return {
    props: {
      pokemonList: pokemonListData,
      pokemonTypes: pokemonTypes.results
    }
  };
};

export default HomePage;
