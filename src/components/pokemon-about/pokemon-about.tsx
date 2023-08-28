import { PokemonDetail } from "@/types";

const PokemonAbout = ({ description, height, weight }: PokemonDetail) => {
  return (
    <div className="border rounded-lg overflow-hidden p-5 w-full">
      <h2 className="text-3xl font-semibold mb-5">About</h2>

      <div className="flex gap-5 items-center justify-between text-lg font-medium">
        <div className="w-24">
          <span className="text-neutral-500">Description</span>
        </div>
        <span>{description.replace(/(\r\n|\n|\r|\f)/gm, " ")}</span>
      </div>
    </div>
  );
};

export default PokemonAbout;
