"use client"
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { fetchUsers, removeUser, toggleUserStatus } from "client/redux/features/users";
import { useAppDispatch } from "client/redux/hooks";
import Link from "next/link";

export function CreateScore() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateUserButton({
  page,
  id
}: {
  page: number;
  id: string;
}) {
  const dispatch = useAppDispatch();
  const handletoggleUserStatus = () => {
    const confirmed = confirm("Are you sure you want to change this user's status?");
    if (confirmed) {
      dispatch(toggleUserStatus(id))
        .then(() => {
          dispatch(fetchUsers({ page, limit: 8 }));
        })
        .catch((error) => {
          console.error("Error updating user status:", error);
          alert("There was an error updating the user's status. Please try again.");
        });
    }
  };

  return (
    <button
      onClick={handletoggleUserStatus}
      className="rounded-md border p-2 hover:bg-d-green"
    >
      <PencilIcon className="w-5" />
    </button>
  );
}


export function DeleteUserButton({
  page,
  id
}: {
  page: number;
  id: string;
}) {
  const dispatch = useAppDispatch();
  const handleDeleteUser = () => {
    const confirmed = confirm("Are you sure you want to remove this user ");
    if (confirmed) {
      dispatch(removeUser(id))
        .then(() => {
          dispatch(fetchUsers({ page, limit: 8 }));
        })
        .catch((error) => {
          console.error("Error updating user status:", error);
          alert("There was an error updating the user's status. Please try again.");
        });
    }
  };
  return (
    <>
      <button onClick={handleDeleteUser} className="rounded-md border p-2 hover:bg-d-red">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </>
  );
}
