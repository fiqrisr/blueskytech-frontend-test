import { PokemonDetail } from "@/types";

const PokemonAbout = ({
  id,
  ability,
  description,
  height,
  resistances,
  weight,
  weaknesses
}: PokemonDetail) => {
  return (
    <div className="border rounded-lg overflow-hidden p-5 w-full">
      <h2 className="text-3xl font-semibold mb-5">About</h2>

      <div className="flex flex-col gap-y-2">
        <div className="flex flex-col md:flex-row gap-y-2 gap-x-5 items-start text-lg font-medium">
          <div className="w-28 shrink-0">
            <span className="text-neutral-500">Description</span>
          </div>
          <span className="font-bold">
            {description.replace(/(\r\n|\n|\r|\f)/gm, " ")}
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-y-2 gap-x-5 items-start text-lg font-medium">
          <div className="w-28 shrink-0">
            <span className="text-neutral-500">Ability</span>
          </div>
          <span className="font-bold">{ability}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-y-2 gap-x-5 items-start text-lg font-medium">
          <div className="w-28 shrink-0">
            <span className="text-neutral-500">Height</span>
          </div>
          <span className="font-bold">{height / 10} m</span>
        </div>

        <div className="flex flex-col md:flex-row gap-y-2 gap-x-5 items-start text-lg font-medium">
          <div className="w-28 shrink-0">
            <span className="text-neutral-500">Weight</span>
          </div>
          <span className="font-bold">{weight / 10} kg</span>
        </div>

        <div className="flex flex-col md:flex-row gap-y-2 gap-x-5 items-start text-lg font-medium">
          <div className="w-28 shrink-0">
            <span className="text-neutral-500">Weaknesses</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {weaknesses.map((w) => (
              <span
                key={`${id}-${w}`}
                className="rounded-full bg-slate-300 px-4 py-[1px] text-white text-lg text-center"
                style={{
                  backgroundColor: `var(--color-${w}-type-dark)`
                }}
              >
                {w}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-y-2 gap-x-5 items-start text-lg font-medium">
          <div className="w-28 shrink-0">
            <span className="text-neutral-500">Resistances</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {resistances.map((r) => (
              <span
                key={`${id}-${r}`}
                className="rounded-full bg-slate-300 px-4 py-[1px] text-white text-lg text-center"
                style={{
                  backgroundColor: `var(--color-${r}-type-dark)`
                }}
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonAbout;
