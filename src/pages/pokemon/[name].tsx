import Head from "next/head";
import { GetServerSideProps } from "next";
import { MoveLeft } from "lucide-react";

import { Button, PokemonHeader, PokemonAbout } from "@/components";
import { PokemonService } from "@/services";
import { PokemonDetail } from "@/types";
import Link from "next/link";
import { getWeaknessesAndResistances } from "@/utils";

type PokemonDetailPageProps = {
  pokemonData: PokemonDetail;
};

const PokemonDetailPage = ({ pokemonData }: PokemonDetailPageProps) => {
  return (
    <>
      <Head>
        <title>{`${pokemonData.name} | Pokemon`}</title>
      </Head>

      <div className="flex justify-between">
        <Link href={"/"}>
          <Button className="flex gap-2 mb-6" variant="ghost">
            <MoveLeft />
            <span className="text-base">Go Back</span>
          </Button>
        </Link>

        <Button variant="outline">Compare</Button>
      </div>

      <PokemonHeader pokemonData={pokemonData} />

      <section className="flex gap-4 mt-10">
        <PokemonAbout {...pokemonData} />
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  PokemonDetailPageProps
> = async (ctx) => {
  const { id, abilities, name, height, types, weight } =
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
      pokemonData: {
        id,
        ability: abilities[0].ability.name,
        description: flavor_text_entries.find(
          (text) => text.language.name === "en"
        )?.flavor_text!,
        name,
        height,
        resistances,
        types,
        weight,
        weaknesses
      }
    }
  };
};

export default PokemonDetailPage;
