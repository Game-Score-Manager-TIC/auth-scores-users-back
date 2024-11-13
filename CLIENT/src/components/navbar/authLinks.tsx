"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authLinks, logoutLinks } from "./userLinks";
import { useAppDispatch, useAppSelector } from "client/redux/hooks";
import { logout } from "client/redux/features/auth";
import { useEffect } from "react";
import { resetUserData } from "client/redux/features/users";
import { restoreScoreData } from "client/redux/features/scores";

export default function AuthLinks() {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Evita la redirección por defecto
    dispatch(logout(auth.token)); // Despacha el logout
    dispatch(resetUserData());
    dispatch(restoreScoreData());
    router.push("/auth/login");
  };

  useEffect(() => {
    if (!auth.token && auth.status === "idle") {
      router.push("/auth/login"); // Redirige si el usuario está deslogueado
    }
  }, [auth.token, auth.status, router]);

  // Clases comunes para reutilizar
  const linkClass =
    "flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-label1 font-medium hover:bg-gradient-3 hover:text-white md:flex-none md:justify-start md:p-1";

  return (
    <div className="mt-3 flex md:gap-1 justify-center">
      {!auth.token
        ? authLinks.map((link) => {
            const LinkIcon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`${linkClass} ${
                  pathname === link.href ? "bg-gradient-3 text-white" : ""
                }`}
              >
                <LinkIcon className="w-6" />
                <p className="hidden md:block">{link.name}</p>
              </Link>
            );
          })
        : logoutLinks.map((link) => {
            const LinkIcon = link.icon;
            return link.name === "Salir" ? (
              <button
                key={link.name}
                onClick={handleLogout}
                className={`${linkClass} md:px-4`}
              >
                <LinkIcon className="w-6" />
                <p className="hidden md:block">{link.name}</p>
              </button>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className={`${linkClass} ${
                  pathname === link.href ? "bg-gradient-3 text-white" : ""
                }`}
              >
                <LinkIcon className="w-6" />
                <p className="hidden md:block">{link.name}</p>
              </Link>
            );
          })}
    </div>
  );
}
