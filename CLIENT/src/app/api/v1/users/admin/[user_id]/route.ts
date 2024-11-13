import { NextResponse } from "next/server";
import users from "client/mocks/users.json";

export async function PATCH(
  req: Request,
  { params }: { params: { user_id: string } }
) {
  const { user_id } = params; // Capturamos `user_id` desde params
  const { status } = await req.json(); // Leemos el cuerpo en formato JSON
  // Extraemos el campo `status` del cuerpo de la petición
  // Verificamos que el nuevo estado sea válido
  if (typeof status === "undefined" || !["enable", "block"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  const user = users.find((user) => user.user_id === user_id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  // Actualizamos el estado del usuario en el array
  user.status = status;
  return NextResponse.json(user);
}

export async function DELETE(
  req: Request,
  { params }: { params: { user_id: string } }
) {
  const { user_id } = params;

  const user = users.find((user) => user.user_id === user_id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "User deleted successfully" },
    { status: 200 }
  );
}
