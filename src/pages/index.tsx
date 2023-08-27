import { GetServerSideProps } from "next";

import { Button, Spinner, PokemonCard } from "@/components";
import { PokemonService } from "@/services";
import { PokemonCard as PokemonCardProps, PokemonListItem } from "@/types";
import { generatePokemonList } from "@/utils";
import { usePokemonList } from "@/hooks";

type HomePageProps = {
  pokemonList: Array<PokemonListItem | PokemonCardProps>;
};

const HomePage = ({ pokemonList }: HomePageProps) => {
  const { pokemonListData, hasNextPage, loadNextPage, loading } =
    usePokemonList({
      initialData: pokemonList
    });

  return (
    <>
      <div></div>

      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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

      <div className="flex justify-center items-center mt-8">
        {loading && <Spinner />}

        {hasNextPage && !loading && (
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

  return {
    props: {
      pokemonList: pokemonListData
    }
  };
};

export default HomePage;
