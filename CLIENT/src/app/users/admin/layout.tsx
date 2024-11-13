"use client";

import withAuth from "client/hoc/with-auth";

function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}

export default withAuth(Layout, "ADMIN");
