import Link from "next/link";

type PokemonCardProps = {
  id: number;
  name: string;
  image: string;
};

const PokemonCard = ({ id, name, image }: PokemonCardProps) => {
  return (
    <Link
      href={`/pokemon/${id}`}
      className="flex flex-col gap-8 items-center justify-center border-2 rounded-lg border-gray-200 p-5 hover:shadow-xl hover:-translate-y-2 hover:bg-gray-50 transition-all"
    >
      <div className="h-24 w-24 flex items-center justify-center">
        <img src={image} alt={`${name} sprite`} />
      </div>
      <h3 className="text-2xl font-medium">{name}</h3>
    </Link>
  );
};

export default PokemonCard;
