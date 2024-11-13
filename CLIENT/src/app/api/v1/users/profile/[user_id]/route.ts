import { NextResponse } from "next/server";
import users from "client/mocks/users.json";

export async function GET(
  req: Request,
  { params }: { params: { user_id: string } }
) {
  const { user_id } = params; // Capturamos `user_id` desde params

  // Filtrar datos en base al `user_id` (solo si es necesario)
  const userData = users.find((user) => user.user_id === user_id);

  if (!userData) {
    return NextResponse.json(
      { error: "User is not authenticated" },
      { status: 401 }
    );
  }

  return NextResponse.json(userData);
}

export async function PUT(
  req: Request,
  { params }: { params: { user_id: string } }
) {
  const { user_id } = params; // Capturamos `user_id` desde params
  const body = await req.json(); // Leemos el cuerpo en formato JSON

  // Extraemos los campos `username` y `avatar` del cuerpo de la petición
  const { username, avatar } = body;

  // Variable para almacenar el usuario actualizado
  let userUpdated = null;

  // Recorremos los usuarios y actualizamos solo si coincide el `user_id`
  users.forEach((user) => {
    if (user.user_id === user_id) {
      userUpdated = {
        ...user,
        username: username || user.username, // Actualizamos solo si se proporciona
        avatar: avatar || user.avatar, // Actualizamos solo si se proporciona
      };
    }
  });

  // Si no encontramos al usuario, devolvemos un 404
  if (!userUpdated) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Devolvemos solo el usuario editado
  return NextResponse.json(userUpdated);
}
