export const API_URL =
  import.meta.env.VITE_APP_PRODUCTION_DOMAIN ??
  `http://localhost:${import.meta.env.VITE_APP_BACKEND_PORT}`;
