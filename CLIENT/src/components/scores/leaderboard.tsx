import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { ScoreTopFive, User } from 'client/redux/features/scores';
import clsx from 'clsx';
import Image from 'next/image';
import { TrophyIcon, StarIcon } from '@heroicons/react/24/outline'; // Iconos de la copa, medalla y corona
import { useFormattedScore } from 'client/hooks/useFormattedScore';
import { Badge, Avatar } from "@nextui-org/react";

type LeaderBoardProps = {
  data: ScoreTopFive[];  // El tipo esperado por el componente debe ser ScoreTopFive[]
};

export default async function LeaderBoard({ data }: LeaderBoardProps) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">Leaderboard</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gradient-1 p-4">
        <div className="bg-d-saphire-50 rounded-xl px-6 text-white">
          {data.map(({ game, score, user }, i) => {
            const formattedScore = useFormattedScore(score);
            // Definir el icono de acuerdo a la posición
            let positionIcon;
            if (i === 0) positionIcon = "👑"
            else if (i === 1 || i === 2) positionIcon = "🏆"
            else positionIcon = `🏅`

            // Definir el estilo de la burbuja del puntaje
            const scoreBubbleStyle = i === 0 ? 'shadow bg-d-gold-20 text-d-black-20' : 'shadow bg-d-sapphire-20 text-d-pearl-100-75';

            return (
              <div
                key={i}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  { 'border-t': i !== 0 }
                )}
              >
                <div className="flex items-center gap-4">
                  {/* Mostrar el icono según la posición */}
                  <div className="mr-2 ">
                    {i + 1}
                  </div>

                  {/* Avatar y nombre del jugador */}
                  <Badge size="lg" content={positionIcon} placement="top-right" shape="circle" isOneChar>
                    <Avatar
                      src={user.avatar}
                      alt={`${user.name}'s profile picture`}
                      radius="full"
                      size="lg"
                    />
                  </Badge>
                  <div className="min-w-0">
                    <p className="truncate text-sm  font-semibold md:text-base">
                      {user.name}
                    </p>
                    <p className="hidden text-sm  sm:block">
                      {game}
                    </p>
                  </div>
                </div>

                {/* Burbuja con el puntaje */}
                <div className={clsx('flex items-center rounded-full px-4 py-1', scoreBubbleStyle)}>
                  {i === 0 ? <span className="size-6 i i-mdi-crown-outline text-black" ></span> : ""}
                  {formattedScore}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 " />
          <h3 className="ml-2 text-sm ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
