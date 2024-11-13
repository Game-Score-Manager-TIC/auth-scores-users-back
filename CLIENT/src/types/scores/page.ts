export interface Score {
  score_id: string; // uuid string
  user_id: string; // uuid string
  game: string; // name of the game, e.g., "COD"
  score: number; // the actual score as a number
  created_at: string; // ISO 8601 date-time string
  updated_at: string; // ISO 8601 date-time string
}

export type ScoresUserList = Score[]; // an array of Score objects
