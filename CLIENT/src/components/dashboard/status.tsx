"use client";
import { CheckIcon, LockClosedIcon, PauseIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold",
        {
          "bg-d-red text-white": status === "BLOCKED", 
          "bg-d-green text-white": status === "ACTIVE", 
          "bg-d-gray text-gray-500": status === "INACTIVE",
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
      {status === "INACTIVE" ? (
        <>
          Inactivo
          <PauseIcon className="ml-1 w-4 text-black" />
        </>
      ) : null}
    </span>
  );
}
