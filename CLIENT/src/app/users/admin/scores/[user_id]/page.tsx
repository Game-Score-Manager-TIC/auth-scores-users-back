"use client";

import { Params } from "client/types/params/page";

const AdminScoreByUser = ({ params: { user_id } }: { params: Params }) => {
  return (
    <div>
      <h1>Admin Score Page Delete: {user_id}</h1>
      {/* Implement logic to fetch and display user's score */}
    </div>
  );
};

export default AdminScoreByUser;
