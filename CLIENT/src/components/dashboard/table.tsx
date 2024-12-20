import Image from "next/image";
import { UpdateUserButton, DeleteUserButton } from "./buttons";
import UserStatus from "./status";
import { useRouter } from "next/navigation";

export default function UsersTable({
  data,
  currentPage,
}: {
  data: Array<{
    userId: string;
    name: string;
    email: string;
    avatar: string | null;
    roles: string[];
    status: "ACTIVE" | "BLOCKED" | "INACTIVE";
  }>;
  currentPage: number;
}) {
  const router = useRouter();

  const handleProfailDetail = (userId: string) => {
    // Implement your own logic to handle the profail detail
    router.push(`/users/profile/${userId}`);
  }


  if (!data.length) return <div>No users found</div>;




  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gradient-1 p-2 md:pt-0">
          {/* Mobile view */}
          <div className="md:hidden">
            {data.map((user) => (
              <div
                key={user.userId}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleProfailDetail(user.userId)}>
                  {user.avatar && (
                    <Image
                      src={user.avatar}
                      className="rounded-full"
                      width={40}
                      height={40}
                      alt={`${user.name}'s profile picture`}
                    />
                  )}
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-sm text-gray-500">
                      Roles: {user.roles.join(", ")}
                    </p>
                    <UserStatus status={user.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop view */}
          <table className="hidden min-w-full table-fixed text-white md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="w-[20%] px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="w-[25%] px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="w-[20%] px-3 py-5 font-medium">
                  Roles
                </th>
                <th scope="col" className="w-[15%] px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="w-[20%] py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gradient-1 rounded-lg">
              {data.map((user) => (
                <tr
                  key={user.userId}
                  className="w-full  border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg py-3 text-sm hover:bg-gradient-3 hover:text-white"

                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex cursor-pointer items-center gap-3" onClick={() => handleProfailDetail(user.userId)}>
                      {user.avatar && (
                        <Image
                          src={user.avatar}
                          className="rounded-full"
                          width={28}
                          height={28}
                          alt={`${user.name}'s profile picture`}
                        />
                      )}
                      <p>{user.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{user.email}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {user.roles.join(",")}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <UserStatus status={user.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateUserButton id={user.userId} page={currentPage} />
                      <DeleteUserButton id={user.userId} page={currentPage} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


