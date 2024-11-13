"use client";

import { useAppSelector } from "client/redux/hooks";
import { Params } from "client/types/params/page";

const ProfileById = ({ params: { user_id } }: { params: Params }) => {
  const userIdFromRedux = useAppSelector((state) => state.auth.user_id);

  const finalUserId = user_id || userIdFromRedux;
  return (
    <div>
      <h1>Profile Page: {finalUserId}</h1>
    </div>
  );
};

export default ProfileById;
