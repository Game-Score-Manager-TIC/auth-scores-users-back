"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useEffect } from "react";
import { fetchUsers } from "client/redux/features/users";
import { useAppDispatch } from "client/redux/hooks";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    params.set("page", "1");
    push(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    const query = searchParams.get("query");
    const page = searchParams.get("page");
    if (query) {
      dispatch(fetchUsers({ page: Number(page) || 1, limit: 8, query }));
    } else {
      dispatch(fetchUsers({ page: Number(page) || 1, limit: 8 }));
    }
  }, [searchParams, dispatch]);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 bg-gradient-5"
        placeholder={placeholder}
        onChange={(event) => handleSearch(event.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
