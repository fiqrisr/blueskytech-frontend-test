import Link from "next/link";
import clsx from "clsx";

import { Pokemon } from "@/types";

type PokemonCardProps = {
  id: number;
  name: string;
  image: string;
  types: Pokemon["types"];
};

const PokemonCard = ({ id, name, image, types }: PokemonCardProps) => {
  return (
    <Link
      href={`/pokemon/${id}`}
      className={clsx(
        "flex flex-col items-center justify-center border rounded-lg overflow-hidden transition-all pt-6 relative",
        "hover:shadow-xl hover:-translate-y-2 hover:bg-gray-100"
      )}
      style={{
        borderColor: `var(--color-${types[0].type.name}-type-dark)`
      }}
    >
      <span className="absolute top-4 right-4 text-6xl opacity-10 font-bold">
        #{id}
      </span>
      <div className="h-36 w-36 mb-7 flex items-center justify-center">
        <img src={image} alt={`${name} sprite`} className="z-10" />
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-x-3 gap-y-1 mb-5 flex-1 w-full">
        {types.map((type) => (
          <div
            key={`${id}-${type.type.name}`}
            className="rounded-full bg-slate-300 px-4 py-[2px] text-white text-center"
            style={{
              backgroundColor: `var(--color-${type.type.name}-type-dark)`
            }}
          >
            {type.type.name}
          </div>
        ))}
      </div>
      <h3
        className="text-2xl font-medium py-2 w-full text-center text-white"
        style={{
          backgroundColor: `var(--color-${types[0].type.name}-type-dark)`
        }}
      >
        {name}
      </h3>
    </Link>
  );
};

export default PokemonCard;
