import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  getAllScores,
  createScore,
  deleteScore as deleteScoreAPI,
  getTopFiveScores,
  getScoresByUserId,
} from "client/services/features/scoresService"; // Ajusta la ruta de importación según tu estructura de archivos

export type Score = {
  scoreId: string;
  game: string;
  score: number;
  userId: string;
};

export type User = {
  name: string;
  email: string;
  avatar: string;
}

export type ScoreTopFive = {
  scoreId: string;
  game: string;
  score: number;
  userId: string;
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

// Tunk para obtener los scores de un usuario
export const fetchScoresByUserId = createAsyncThunk(
  "scores/fetchScoresByUserId",
  async (userId: string, { getState }) => {
    const token = (getState() as RootState).auth.token;
    return await getScoresByUserId(userId, token);
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
    // Caso para fullfilled para fetchScoresByUserId
    builder.addCase(fetchScoresByUserId.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.scores = action.payload;
    });
    // Caso pending para fetchScoresByUserId
    builder.addCase(fetchScoresByUserId.pending, (state) => {
      state.status = "loading";
    });
    // Caso rejected para fetchScoresByUserId
    builder.addCase(fetchScoresByUserId.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Error fetching scores by user";
    });

    // Caso fulfilled para addNewScore
    builder.addCase(addNewScore.fulfilled, (state, action) => {
      state.scores.push(action.payload);
    });

    // Caso fulfilled para deleteScore
    builder.addCase(deleteScore.fulfilled, (state, action) => {
      state.scores = state.scores.filter(
        (score) => score.scoreId !== action.payload
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
export const selecScoresByUserId =
  (user_id: string) => (state: { scores: ScoresState }) => {
    return state.scores.scores.filter((score) => score.userId === user_id);
  }
export const selecScoresByGame =
  (game: string) => (state: { scores: ScoresState }) =>
    state.scores.scores.filter((score) => score.game === game);



// Exportar el reducer
export default scores.reducer;
