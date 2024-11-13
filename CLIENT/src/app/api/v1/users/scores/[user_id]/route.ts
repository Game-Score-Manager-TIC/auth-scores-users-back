import { NextResponse } from "next/server";
import scores from "client/mocks/scores.json";

export async function GET(
  req: Request,
  { params }: { params: { user_id: string } }
) {
  const { user_id } = params; // Capturamos `user_id` desde params
  const scoresByUserId = scores.filter((score) => {
    return score.user_id === user_id;
  });

  if (!scoresByUserId) {
    return NextResponse.json(
      { error: "User or scores not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(scoresByUserId); // Devuelve todos los scores de un usuario
}
