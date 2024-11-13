import apiClient from "../apiClient";

export const getAllUsers = async (token: string) => {
  const response = await apiClient.get("/users", {
    headers: { Authorization: `Bearer ${token}` },
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
  await apiClient.patch(`/users/${userId}`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
