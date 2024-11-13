import { NextResponse } from "next/server";
import scores from "client/mocks/scores.json";

export async function GET() {
  // Devolvemos todos los scores
  return NextResponse.json(scores);
}
