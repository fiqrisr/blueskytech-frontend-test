import { GetServerSideProps } from "next";

import { PokemonCard } from "@/components";
import { PokemonService } from "@/services";
import { Pokemon } from "@/types";
import { generatePokemonList } from "@/utils";

type HomePageProps = {
  pokemonList: Array<{
    id: number;
    name: string;
    types: Pokemon["types"];
    image: string;
  }>;
};

const HomePage = ({ pokemonList }: HomePageProps) => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {pokemonList.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.image}
          types={pokemon.types}
        />
      ))}
    </section>
  );
};

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const pokemonListRes = await PokemonService.getPokemonList();
  const pokemonListData = await generatePokemonList(pokemonListRes.results);

  return {
    props: {
      pokemonList: pokemonListData
    }
  };
};

export default HomePage;
