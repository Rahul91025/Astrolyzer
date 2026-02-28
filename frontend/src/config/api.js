const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const getApiUrl = (path) => `${API_BASE_URL}${path}`;

