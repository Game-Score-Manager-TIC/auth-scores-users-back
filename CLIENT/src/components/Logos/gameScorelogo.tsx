import { montserrat } from "client/app/fonts";

export default function GameScoreLogo() {
  return (
    <div
      className={`${montserrat.className} flex flex-col leading-none text-white items-start`}
    >
      <span className="size-12 i-mdi-gamepad-variant"></span>
      <p className="text-[1.875rem]">Game Score Manager</p>
    </div>
  );
}
