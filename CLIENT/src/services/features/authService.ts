import apiClient from "../apiClient";

export async function loginUser(email: string, password: string) {
  const response = await apiClient.post("/auth/login", { email, password });
  return response.data;
}

export async function validateToken(token: string) {
  const response = await apiClient.get("/auth/token-validate", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function logoutUser(token: string) {
  const response = await apiClient.post("/auth/logout", null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
