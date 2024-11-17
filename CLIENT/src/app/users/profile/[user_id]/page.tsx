"use client";

import { fetchUserById, selectUserById } from "client/redux/features/users";
import { useAppDispatch, useAppSelector } from "client/redux/hooks";
import { Params } from "client/types/params/page";
import { useEffect } from "react";
import { Avatar, Badge, Chip, Image } from "@nextui-org/react";
import { CheckIcon } from "client/components/ui/CheckIcon";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import TableScoresByUser from "client/components/scores/tableScoresByUser";
import { fetchScoresByUserId, selecScoresByUserId } from "client/redux/features/scores";

const ProfileById = ({ params: { user_id } }: { params: Params }) => {
  const dispatch = useAppDispatch()

  const user = useAppSelector((state) => selectUserById(user_id)(state));
  const userScores = useAppSelector((state) => selecScoresByUserId(user_id)(state));
  const userStatus = useAppSelector((state) => state.users.status);
  const scoresStatus = useAppSelector((state) => state.scores.status);

  useEffect(() => {
    if (user_id && !user) {
      dispatch(fetchUserById(user_id));
    }
  }, [user_id, user, dispatch]);

  useEffect(() => {
    if (user_id && userScores.length === 0 && scoresStatus !== "loading") {
      dispatch(fetchScoresByUserId(user_id));
    }
  }, [user_id]);

  console.log("userScores: " + userScores);
  

  if (status === "loading" || !user) {
    return <div>Loading...</div>;
  }

  const content = user.status === "ACTIVE" ? <CheckIcon /> : <LockClosedIcon className="w-4 text-white" />
  const color = user.status === "ACTIVE" ? "success" : "danger"

  return (
    <div className="flex flex-col">
      <div className="flex gap-6">
        <button className=" cursor-pointer w-36 h-36">
          <Badge isOneChar content={content} color={color} size="lg" placement="top-right">
            <Avatar
              radius="sm"
              src={user.avatar}
              alt="NextUI Album Cover"
              className="w-32 h-32 text-large"
            />
          </Badge>
        </button>
        <div className="flex flex-col pt-6">

          <h1 className="text-white text-heading5">{user.name}</h1>
          <Chip
            variant="flat"
            color="secondary"
            className="text-white"
          >
            {user.email}
          </Chip>
        </div>
      </div>
      <TableScoresByUser data={userScores} />
    </div>

  );
};

export default ProfileById;
