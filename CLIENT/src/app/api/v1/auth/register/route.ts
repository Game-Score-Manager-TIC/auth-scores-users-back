import { NextResponse } from "next/server";
import users from "client/mocks/users.json";

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  if (!username || !email || !password) {
    return NextResponse.json({ error: "User bad request" }, { status: 400 });
  }

  const userEmail = users.find((u) => u.email === email);

  if (userEmail) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 409 }
    );
  }

  const userUserName = users.find((u) => u.username === username);

  if (userUserName) {
    return NextResponse.json(
      { error: "Username already exists" },
      { status: 409 }
    );
  }

  // Simulate user registration logic
  const userCreated = {
    user_id: Math.random().toString(36).substr(2, 9),
    username,
    email,
  };

  return NextResponse.json(userCreated, { status: 201 });
}
