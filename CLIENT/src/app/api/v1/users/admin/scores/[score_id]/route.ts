import { NextResponse } from "next/server";
import scores from "client/mocks/scores.json";
export async function DELETE(
  req: Request,
  { params }: { params: { score_id: string } }
) {
  const { score_id } = params;
  console.log("score_id: " + score_id);

  // Implement logic to delete the score with the given ID
  const score = scores.find((score) => score.score_id === score_id);
  if (!score) {
    return NextResponse.json({ error: "Score not found" }, { status: 404 });
  }

  const newScores = scores.filter((score) => score.score_id !== score_id);
  if (newScores.length > 0) {
    return NextResponse.json(
      { message: "Score deleted successfully" },
      { status: 200 }
    );
  }
}
