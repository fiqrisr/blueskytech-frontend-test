import { BASE_POKEMON_ARTWORK_IMAGE_URL } from "@/configs";
import { Pokemon } from "@/types";

type PokemonHeaderProps = {
  pokemonData: Pick<Pokemon, "id" | "name" | "types">;
};

const PokemonHeader = ({ pokemonData }: PokemonHeaderProps) => {
  return (
    <section className="relative flex flex-col-reverse md:flex-row border-b-2 pb-8 items-center gap-y-10 gap-x-4 md:justify-between px-5 md:px-32 lg:px-40 w-full">
      <span className="absolute text-8xl opacity-10 font-bold top-1 left-1 -z-10">
        #{pokemonData.id}
      </span>
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-neutral-800 font-semibold">
          {pokemonData.name}
        </h1>
        <div className="flex gap-x-3">
          {pokemonData.types.map((type) => (
            <div
              key={`${pokemonData.id}-${type.type.name}`}
              className="rounded-full bg-slate-300 px-4 py-[2px] text-white text-lg text-center"
              style={{
                backgroundColor: `var(--color-${type.type.name}-type-dark)`
              }}
            >
              {type.type.name}
            </div>
          ))}
        </div>
      </div>
      <div className="h-64 w-64">
        <img src={`${BASE_POKEMON_ARTWORK_IMAGE_URL}/${pokemonData.id}.png`} />
      </div>
    </section>
  );
};

export default PokemonHeader;
