import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  getAllScores,
  createScore,
  deleteScore as deleteScoreAPI,
  getTopFiveScores,
} from "client/services/features/scoresService"; // Ajusta la ruta de importación según tu estructura de archivos

export type Score = {
  score_id: string;
  game: string;
  score: number;
  user_id: string;
};

export type User = {
  name: string;
  email: string;
  avatar: string;
}

export type ScoreTopFive = {
  score_id: string;
  game: string;
  score: number;
  user_id: string;
  user: User;
}

type ScoresState = {
  scores: Score[];
  scoresTopFive: ScoreTopFive[]
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: ScoresState = {
  scores: [],
  scoresTopFive: [],
  status: "idle",
  error: null,
};

// Thunk para obtener todos los puntajes
export const fetchScores = createAsyncThunk(
  "scores/fetchScores",
  async (paginationQuery: { page: number; limit: number }, { getState }) => {
    const token = (getState() as RootState).auth.token; // Obtén el token de la autenticación
    return await getAllScores(paginationQuery, token);
  }
);

// Thunk para obtner los 5 mejores scores
export const fetchTopFiveScores = createAsyncThunk<
  ScoreTopFive[], 
  void,
  { rejectValue: string }
>(
  "scores/fetchTopFiveScores",
  async (_, { getState }) => {
    const token = (getState() as RootState).auth.token;
    return await getTopFiveScores(token);
  }
);

// Thunk para agregar un nuevo puntaje
export const addNewScore = createAsyncThunk(
  "scores/addNewScore",
  async (newScore: { playerId: string; score: number }, { getState }) => {
    const token = (getState() as RootState).auth.token;
    return await createScore(newScore, token);
  }
);

// Thunk para eliminar un puntaje
export const deleteScore = createAsyncThunk(
  "scores/deleteScore",
  async (scoreId: string, { getState }) => {
    const token = (getState() as RootState).auth.token;
    await deleteScoreAPI(scoreId, token);
    return scoreId;
  }
);

// Slice de Redux para los puntajes
export const scores = createSlice({
  name: "scores",
  initialState,
  reducers: {
    restoreScoreData: () => {
      // Elimina los datos de los puntajes en el estado inicial
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // Caso fulfilled para fetchScores
    builder.addCase(fetchScores.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.scores = action.payload;
    });
    // Caso pending para fetchScores
    builder.addCase(fetchScores.pending, (state) => {
      state.status = "loading";
    });
    // Caso rejected para fetchScores
    builder.addCase(fetchScores.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Error fetching scores";
    });
    // Caso fulfilled para fetchTopFiveScores
    builder.addCase(fetchTopFiveScores.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.scoresTopFive = action.payload;
    });
    // Caso pending para fetchTopFiveScores
    builder.addCase(fetchTopFiveScores.pending, (state) => {
      state.status = "loading";

    });

    // Caso fulfilled para addNewScore
    builder.addCase(addNewScore.fulfilled, (state, action) => {
      state.scores.push(action.payload);
    });

    // Caso fulfilled para deleteScore
    builder.addCase(deleteScore.fulfilled, (state, action) => {
      state.scores = state.scores.filter(
        (score) => score.score_id !== action.payload
      );
    });
  },
});

// Exportar la acción para usarla en otros lugares
export const { restoreScoreData } = scores.actions;

// Selectores
export const selecAllScores = (state: { scores: ScoresState }) =>
  state.scores.scores;
export const selecTopFiveScores = (state: { scores: ScoresState }) =>
  state.scores.scoresTopFive
export const selecScoresById =
  (user_id: string) => (state: { scores: ScoresState }) =>
    state.scores.scores.filter((score) => score.user_id === user_id);
export const selecScoresByGame =
  (game: string) => (state: { scores: ScoresState }) =>
    state.scores.scores.filter((score) => score.game === game);

// Exportar el reducer
export default scores.reducer;
