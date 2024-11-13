"use client";

import { Params } from "client/types/params/page";

const ScoresUser = ({ params: { user_id } }: { params: Params }) => {
  return (
    <div>
      <h1>Scores User Page</h1>
      {/* Implement table or graph to display user's scores */}
      {`User ID: ${user_id}`}
    </div>
  );
};

export default ScoresUser;
