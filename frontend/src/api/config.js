const isDev = import.meta.env.DEV;

export const API_URL = !isDev
  ? import.meta.env.VITE_APP_PRODUCTION_DOMAIN
  : `http://localhost:${import.meta.env.VITE_APP_BACKEND_PORT}`;
