import apiClient from "../apiClient";

// Obtener todos los puntajes con paginación
export async function getAllScores(paginationQuery: { page: number; limit: number }, token: string) {
  const response = await apiClient.get("/scores", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: paginationQuery,
  });
  return response.data;
}

// Crear un nuevo puntaje
export async function createScore(createScoreDto: { userId: string; game: string; score: number }, token: string) {
  const response = await apiClient.post("/scores", createScoreDto, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getScoresByUserId(userId: string, token: string) {
  const response = await apiClient.get(`/scores/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

// Obtener los 10 puntajes más altos
export async function getTopFiveScores(token: string) {
  const response = await apiClient.get("/scores/top-five", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

// Obtener un puntaje por ID
export async function getScoreById(scoreId: string, token: string) {
  const response = await apiClient.get(`/scores/${scoreId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

// Actualizar un puntaje por ID
export async function updateScore(scoreId: string, updateScoreDto: { score: number }, token: string) {
  const response = await apiClient.put(`/scores/${scoreId}`, updateScoreDto, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

// Eliminar un puntaje por ID
export async function deleteScore(scoreId: string, token: string) {
  const response = await apiClient.delete(`/scores/${scoreId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
