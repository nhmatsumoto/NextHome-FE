// Exemplo de como estruturar seus endpoints
export const API_ENDPOINTS = {
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
    },
    USERS: {
      BASE: '/users',
      BY_ID: (id: string) => `/users/${id}`,
      PROFILE: '/users/profile',
    },
    PRODUCTS: {
      BASE: '/products',
      SEARCH: '/products/search',
      BY_ID: (id: string) => `/products/${id}`,
    },
  };