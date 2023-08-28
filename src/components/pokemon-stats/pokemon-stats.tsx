import { useState, useEffect } from "react";
import { IPokemonStat } from "pokeapi-typescript";

import { capitalize } from "@/utils";
import { Progress } from "..";

type PokemonStatsProps = {
  baseStats: IPokemonStat[];
};

const PokemonStats = ({ baseStats }: PokemonStatsProps) => {
  const [stats, setStats] = useState(baseStats);

  useEffect(() => {
    setStats(
      baseStats.map((stat) => {
        switch (stat.stat.name) {
          case "special-attack":
            stat.stat.name = "Sp. Atk";
            break;
          case "special-defense":
            stat.stat.name = "Sp. Def";
            break;
          default:
            break;
        }

        return stat;
      })
    );
  }, [baseStats]);

  return (
    <div className="border rounded-lg overflow-hidden p-5 w-full">
      <h2 className="text-3xl font-semibold mb-5">Base Stats</h2>

      <div className="flex flex-col gap-y-3">
        {stats.map((stat) => (
          <div
            key={stat.stat.name}
            className="flex flex-row gap-y-1 md:gap-y-2 gap-x-5 items-start md:items-center text-lg font-medium"
          >
            <div className="w-20 shrink-0">
              <span className="text-neutral-500">
                {capitalize(stat.stat.name)}
              </span>
            </div>
            <div className="w-14">{stat.base_stat}</div>
            <div className="w-full">
              <Progress value={(stat.base_stat / 250) * 100} />
            </div>
          </div>
        ))}
        <div className="flex flex-row gap-y-2 gap-x-5 items-start md:items-center text-lg font-medium">
          <div className="w-20 shrink-0">
            <span className="text-neutral-500">Total</span>
          </div>
          <div className="w-14">
            {stats.reduce((previous, stat) => previous + stat.base_stat, 0)}
          </div>
          <div className="w-full">
            <Progress
              value={
                (stats.reduce(
                  (previous, stat) => previous + stat.base_stat,
                  0
                ) *
                  100) /
                1500
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonStats;
