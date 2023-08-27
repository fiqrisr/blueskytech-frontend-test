import { GetServerSideProps } from "next";

import { Button, PokemonCard } from "@/components";
import { PokemonService } from "@/services";
import { Pokemon, PokemonCard as PokemonCardProps } from "@/types";
import { generatePokemonList } from "@/utils";
import { useState } from "react";
import { usePokemonList } from "@/hooks/use-pokemon-list";

type HomePageProps = {
  pokemonList: PokemonCardProps[];
};

const HomePage = ({ pokemonList }: HomePageProps) => {
  const { pokemonListData, hasNextPage, loadNextPage } = usePokemonList({
    initialData: pokemonList
  });

  return (
    <>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {pokemonListData.map((pokemon) => (
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
        {hasNextPage && (
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
