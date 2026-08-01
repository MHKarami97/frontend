const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://ordertrack-api.example.workers.dev';
const getToken = () => localStorage.getItem('ordertrack-token') || '';
const getRefreshToken = () => localStorage.getItem('ordertrack-refresh-token') || '';
const getHeaders = () => ({ 'Content-Type': 'application/json', ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}) });

const tryRefresh = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;
  const response = await fetch(`${apiBaseUrl}/api/auth/refresh`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ refreshToken }) });
  if (!response.ok) return false;
  const result = await response.json();
  if (result.token) {
    localStorage.setItem('ordertrack-token', result.token);
    return true;
  }
  return false;
};

const request = async (path: string, options: RequestInit = {}) => {
  let response = await fetch(`${apiBaseUrl}${path}`, { ...options, headers: getHeaders() });
  if (response.status === 401) {
    const refreshed = await tryRefresh();
    if (refreshed) response = await fetch(`${apiBaseUrl}${path}`, { ...options, headers: getHeaders() });
  }
  return response.json();
};

export const api = {
  get: (path: string) => request(path),
  post: (path: string, body: unknown) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  patch: (path: string, body: unknown) => request(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (path: string) => request(path, { method: 'DELETE' })
};
