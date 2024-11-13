"use client";
import Pagination from "client/components/dashboard/pagination";
import Search from "client/components/dashboard/search";
import Table from "client/components/dashboard/table";
import { InvoicesTableSkeleton } from "client/components/ui/skeletons";
import { Suspense, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "client/redux/hooks";
import { fetchUsers, selectAllUsers } from "client/redux/features/users";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);
  const status = useAppSelector((state) => state.users.status);
  const query = searchParams?.query || "";

  useEffect(() => {
    // Despachar la acción fetchUsers cuando el componente se monta
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Admin Dashboard</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search users..." />
      </div>

      {/* Muestra el skeleton mientras los datos están cargando */}
      {status === "loading" ? (
        <InvoicesTableSkeleton />
      ) : (
        <Table data={users} query={query} currentPage={1} />
      )}

      <div className="mt-5 flex w-full justify-center">
        {/* Aquí puedes agregar la lógica de paginación o mostrar el total de usuarios */}
      </div>
    </div>
  );
}
