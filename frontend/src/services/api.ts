export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://ordertrack-api.mhkarami97.workers.dev';
const getToken = () => localStorage.getItem('ordertrack-token') || '';
const getRefreshToken = () => localStorage.getItem('ordertrack-refresh-token') || '';
const getHeaders = () => ({ 'Content-Type': 'application/json', ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}) });

interface CacheEntry {
  data: any;
  timestamp: number;
}
const cache = new Map<string, CacheEntry>();

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
    if (refreshed) {
      response = await fetch(`${apiBaseUrl}${path}`, { ...options, headers: getHeaders() });
    }
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  
  if (!response.ok) {
    throw new Error('خطای ارتباط با سرور یا فرمت نامعتبر پاسخ');
  }

  return response.text();
};

export const api = {
  get: async (path: string, ttl: number = 1000) => {
    if (ttl > 0) {
      const cached = cache.get(path);
      if (cached && (Date.now() - cached.timestamp < ttl)) {
        return cached.data;
      }
    }
    const data = await request(path);
    if (ttl > 0 && !data.error && !data.message) {
      cache.set(path, { data, timestamp: Date.now() });
    }
    return data;
  },
  post: (path: string, body: unknown) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  patch: (path: string, body: unknown) => request(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (path: string) => request(path, { method: 'DELETE' }),
  clearCache: (path?: string) => {
    if (path) cache.delete(path);
    else cache.clear();
  }
};

// نگاشت هوشمند آدرس عکس برای پشتیبانی از داده‌های قدیمی و جدید
export const getFullImageUrl = (val: string | null | undefined) => {
  if (!val) return '';
  if (val.startsWith('http')) return val; // دیتای قبلی که کامل ذخیره شده
  if (val.startsWith('/')) return `${apiBaseUrl}${val}`; // دیتای قبلی که به صورت پث ذخیره شده
  return `${apiBaseUrl}/api/upload/${val}`; // دیتای جدید که فقط شناسه است
};
