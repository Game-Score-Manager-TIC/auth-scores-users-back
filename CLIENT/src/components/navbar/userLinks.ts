import {
  UserGroupIcon,
  GlobeAltIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  TrophyIcon,
  // LockClosedIcon,
  ArrowLeftStartOnRectangleIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

const global = [
  { name: "Ranking Global", href: "/scores/leaderboard", icon: GlobeAltIcon },
];

const playerRoutes = [
  ...global,
  { name: "Perfil", href: "/users/profile/:userId", icon: UserIcon },
  { name: "Puntuaciones", href: "/users/scores/:userId", icon: TrophyIcon },
  { name: "Añadir Puntuación", href: "/scores/:userId", icon: TrophyIcon },
];

const adminRoutes = [
  ...global,
  { name: "Admin - Jugadores", href: "/users/admin", icon: UserGroupIcon },
  { name: "Perfil", href: "/users/profile/:userId", icon: UserIcon },
];

export const getNavigationLinks = (roles: string[]) => {
  return roles.includes("ADMIN")
    ? adminRoutes
    : roles.includes("PLAYER")
      ? playerRoutes
      : global;
};

export const authLinks = [
  { name: "Registro", href: "/auth/register", icon: UserIcon },
  {
    name: "Iniciar sesión",
    href: "/auth/login",
    icon: ArrowRightOnRectangleIcon,
  },
];

export const logoutLinks = [
  { name: "Salir", href: "/auth/login", icon: ArrowLeftStartOnRectangleIcon },
];
