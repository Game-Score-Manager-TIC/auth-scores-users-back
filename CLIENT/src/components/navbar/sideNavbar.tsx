"use client";
import Link from "next/link";
import NavigationLinks from "client/components/navbar/navigationLinks";
import AuthNavLinks from "client/components/navbar/authLinks";
import GameScoreLogo from "../Logos/gameScorelogo";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-gradient-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <GameScoreLogo />
        </div>
      </Link>
      <div className="flex flex-col h-full text-white">
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:justify-start md:space-x-0 md:space-y-2">
          <NavigationLinks />
        </div>
        <div className="md:justify-end border-t-2 ">
          <AuthNavLinks />
        </div>
      </div>
    </div>
  );
}
