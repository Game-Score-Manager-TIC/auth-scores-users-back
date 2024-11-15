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
  const { page, totalPages } = useAppSelector((state) => state.users)
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;


  useEffect(() => {
    // Despachar la acción fetchUsers cuando el componente se monta
    dispatch(fetchUsers({ page: currentPage, limit: 8, query }));
  }, [dispatch, currentPage]);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Admin Dashboard</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search users..." />
      </div>
      <Suspense key={query + page} fallback={<InvoicesTableSkeleton />}>
        <Table data={users} currentPage={page} />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
