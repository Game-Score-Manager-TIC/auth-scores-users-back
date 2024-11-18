import axios from "axios";
import Router from "next/router";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    console.log("error", error.status);

    if (typeof window !== "undefined" && error.status === 401) {
      // Handle 401 errors globally
      alert("Your session has expired. Please log in again.");
      setTimeout(() => {
        Router.push("/auth/login"); // Use Router.push instead of useRouter
      }, 2000);

    }
    return Promise.reject(error); // Forward the error for further handling
  }
);


export default apiClient;
