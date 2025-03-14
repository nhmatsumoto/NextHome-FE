import axios from "axios";
import { getSession, getCsrfToken } from "next-auth/react";

const api = axios.create({
  baseURL: "https://localhost:7041", //API
  withCredentials: true, // Permite cookies de autenticação
});

// Intercepta requisições e adiciona tokens
api.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});

export default api;
