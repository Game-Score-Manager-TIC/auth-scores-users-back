import { NextResponse } from "next/server";
import users from "client/mocks/users.json";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "User bad request" }, { status: 400 });
  }

  // Check if user already exists
  const user = users.find((u) => u.email === email);

  if (!user) {
    return NextResponse.json({ error: "User not Found" }, { status: 401 });
  }

  // Verify password
  if (user.password !== password) {
    // Asegúrate de que la contraseña esté en el objeto del usuario
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // Simulate user login logic
  const token = Math.random().toString(36).substr(2, 9);

  return NextResponse.json(token);
}
