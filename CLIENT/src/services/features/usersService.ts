import apiClient from "../apiClient";

export const getAllUsers = async (
  paginationQuery: { page: number; limit: number; query?: string },
  token: string
) => {
  const params = new URLSearchParams({
    page: String(paginationQuery.page),
    limit: String(paginationQuery.limit),
  });

  // Agregar el parámetro `query` si está definido
  if (paginationQuery.query) {
    params.append("query", paginationQuery.query);
  }

  const response = await apiClient.get("/users", {
    headers: { Authorization: `Bearer ${token}` },
    params, // Esto ahora incluye `page`, `limit`, y `query` si existe
  });

  return response.data;
};

export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
  roles: string[];
}) => {
  const response = await apiClient.post("/users", userData);
  return response.data;
};

export const updateUser = async (
  userId: string,
  formData: FormData,
  token: string
) => {
  const response = await apiClient.put(`/users/${userId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const downloadImageUser = async (userId: string, token: string) => {
  const response = await apiClient.get(`/users/${userId}/download-image`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'json', // Se espera un JSON con la URL de la imagen
  });
  return response.data.avatarUrl; // Ahora retornamos la URL completa de la imagen
};


export const getUserById = async (userId: string, token: string) => {
  const response = await apiClient.get(`/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteUser = async (userId: string, token: string) => {
  await apiClient.delete(`/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const changeUserStatus = async (userId: string, token: string) => {
  const response = await apiClient.patch(
    `/users/${userId}`,
    {},  // Enviar un objeto vacío como cuerpo si es necesario
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  console.log("Response!", response);
  return response;
};
