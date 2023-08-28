import Head from "next/head";
import { GetServerSideProps } from "next";
import { MoveLeft } from "lucide-react";
import clsx from "clsx";

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  ScrollArea,
  PokemonHeader,
  PokemonAbout,
  PokemonStats,
  Spinner
} from "@/components";
import { PokemonService } from "@/services";
import { PokemonDetail, PokemonListItem } from "@/types";
import Link from "next/link";
import { getWeaknessesAndResistances } from "@/utils";
import { usePokemonCompare } from "@/hooks";

type PokemonDetailPageProps = {
  pokemonList: PokemonListItem[];
  pokemonData: PokemonDetail;
};

const PokemonDetailPage = ({
  pokemonList,
  pokemonData
}: PokemonDetailPageProps) => {
  const {
    compareActive,
    setCompareActive,
    compareDataLoading,
    selectedPokemon,
    setSelectedPokemon,
    selectedPokemonData
  } = usePokemonCompare();

  return (
    <>
      <Head>
        <title>{`${pokemonData.name} | Pokedex`}</title>
      </Head>

      <div className="flex justify-between">
        <Link href={"/"}>
          <Button className="flex gap-2 mb-6" variant="ghost">
            <MoveLeft />
            <span className="text-base">Go Back</span>
          </Button>
        </Link>

        {!compareActive && (
          <Button variant="outline" onClick={() => setCompareActive(true)}>
            Compare
          </Button>
        )}
      </div>

      <PokemonHeader pokemonData={pokemonData} />

      <div className={clsx(compareActive && "grid grid-cols-2")}>
        <section
          className={clsx(
            "flex flex-col md:flex-row gap-4 mt-10",
            compareActive && "pr-10 border-r-2 !flex-col"
          )}
        >
          <PokemonAbout {...pokemonData} />
          <PokemonStats baseStats={pokemonData.stats} />
        </section>
        {compareActive && (
          <section
            className={clsx(
              "flex flex-col md:flex-row gap-4 mt-10",
              compareActive && "pl-10 !flex-col"
            )}
          >
            {!selectedPokemonData && (
              <div className="flex items-center gap-3">
                <span>Select Pokemon to compare:</span>
                <Select
                  value={selectedPokemon}
                  onValueChange={setSelectedPokemon}
                >
                  <SelectTrigger className="max-w-[180px]">
                    <SelectValue placeholder="Pokemon type" />
                  </SelectTrigger>
                  <SelectContent>
                    <ScrollArea className="h-[300px]">
                      {pokemonList.map((pokemon) => (
                        <SelectItem key={pokemon.name} value={pokemon.name}>
                          {pokemon.name}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>
            )}
            {compareDataLoading && (
              <div className="flex justify-center items-center mt-8">
                <Spinner />
              </div>
            )}
            {selectedPokemonData && (
              <>
                <PokemonAbout {...selectedPokemonData} />
                <PokemonStats baseStats={selectedPokemonData?.stats} />
              </>
            )}
          </section>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  PokemonDetailPageProps
> = async (ctx) => {
  const pokemonListRes = await PokemonService.getPokemonList({ limit: 200 });

  const { id, abilities, name, height, stats, types, weight } =
    await PokemonService.getOnePokemon({
      id: ctx.params?.name as string
    });

  const { flavor_text_entries } = await PokemonService.getOnePokemonSpecies({
    id: ctx.params?.name as string
  });

  const pokemonTypesData = await Promise.all(
    types.map(async (type) => {
      const { damage_relations } = await PokemonService.getOnePokemonType({
        id: type.type.name
      });

      return damage_relations;
    })
  );

  const { weaknesses, resistances } =
    getWeaknessesAndResistances(pokemonTypesData);

  return {
    props: {
      pokemonList: pokemonListRes.results,
      pokemonData: {
        id,
        ability: abilities[0].ability.name,
        description: flavor_text_entries.find(
          (text) => text.language.name === "en"
        )?.flavor_text!,
        name,
        height,
        resistances,
        stats,
        types,
        weight,
        weaknesses
      }
    }
  };
};

export default PokemonDetailPage;
