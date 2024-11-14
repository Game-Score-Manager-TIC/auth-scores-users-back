"use client";
import { CheckIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold",
        {
          "bg-d-red text-white": status === "BLOCKED", // Fondo rojo para "BLOCKED"
          "bg-d-green text-white": status === "ACTIVE", // Fondo verde para "ACTIVE"
        }
      )}
    >
      {status === "BLOCKED" ? (
        <>
          Bloqueado
          <LockClosedIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === "ACTIVE" ? (
        <>
          Activo
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
