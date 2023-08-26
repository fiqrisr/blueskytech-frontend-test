import { GetServerSideProps } from "next";

import { PokemonService } from "@/services";
import { BaseListResponse, PokemonListItem } from "@/types";

type HomePageProps = {
  pokemonList: BaseListResponse<PokemonListItem>;
};

const HomePage = ({ pokemonList }: HomePageProps) => {
  return <div>{JSON.stringify(pokemonList)}</div>;
};

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const pokemonListData = await PokemonService.getPokemonList();

  return {
    props: {
      pokemonList: pokemonListData
    }
  };
};

export default HomePage;
