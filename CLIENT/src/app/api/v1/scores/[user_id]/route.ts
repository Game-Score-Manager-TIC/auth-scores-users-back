import { NextResponse } from "next/server";
import users from "client/mocks/users.json";
import scores from "client/mocks/scores.json";

export async function POST(
  req: Request,
  { params }: { params: { user_id: string } }
) {
  const { user_id } = params;
  const { game, score } = await req.json();

  const user = users.find((user) => user.user_id === user_id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const newScore = {
    score_id: `${Date.now()}`,
    user_id,
    game,
    score,
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
  };

  scores.push(newScore); // Agregar el nuevo score al array

  return NextResponse.json(newScore, { status: 201 });
}
