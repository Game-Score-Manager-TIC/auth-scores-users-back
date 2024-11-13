"use client";

import { Params } from "client/types/params/page";

const UserAdminById = ({ params: { user_id } }: { params: Params }) => {
  return (
    <div>
      <h1>User Admin Page: {user_id}</h1>
      {/* Implement admin-specific functionality */}
    </div>
  );
};

export default UserAdminById;
