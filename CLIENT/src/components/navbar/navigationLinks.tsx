"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getNavigationLinks } from "./userLinks";
import { useEffect, useState } from "react";
import { useAppSelector } from "client/redux/hooks";

interface User {
  email: string;
  role: string;
}

interface Enlace {
  name: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export default function NavigationsLinks() {
  const pathname = usePathname();
  const [links, setLinks] = useState<Enlace[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    const roles = auth.roles;
    setUser(user);

    const filteredLinks = getNavigationLinks(roles);
    if (roles.length > 0) {
      setLinks(filteredLinks);
    } else {
      setLinks(filteredLinks); // O puedes redirigir al usuario a una página de login
    }
  }, [auth.roles]);

  // Renderiza un mensaje o un loading si links está vacío
  if (links.length === 0) {
    return <div>Cargando enlaces...</div>; // O un spinner
  }

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;

        // Asegúrate de que user esté definido y tenga un email antes de reemplazar
        const href = link.href.replace(":userId", auth.user_id); // Reemplaza el placeholder con el ID real

        return (
          <Link
            key={link.name}
            href={href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-label1 font-medium hover:bg-gradient-3 hover:text-white
            md:flex-none md:justify-start md:p-2 md:px-3
            ${pathname === href ? "bg-gradient-3 text-white" : ""}`}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
