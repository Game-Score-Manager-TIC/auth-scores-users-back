import { NextResponse } from "next/server";
import users from "client/mocks/users.json";

export async function GET() {
  return NextResponse.json({ users }, { status: 200 });
}
