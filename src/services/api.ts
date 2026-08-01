import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const BASE_URL = import.meta.env.VITE_API_URL || 'https://ordertrack-backend.YOUR_SUBDOMAIN.workers.dev'

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      const refreshToken = localStorage.getItem('refresh_token')
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${BASE_URL}/api/auth/refresh`, { refreshToken })
          localStorage.setItem('access_token', data.accessToken)
          original.headers.Authorization = `Bearer ${data.accessToken}`
          return api(original)
        } catch {
          localStorage.clear()
          window.location.hash = '/login'
        }
      }
    }
    return Promise.reject(error)
  }
)

export const authApi = {
  login: (email: string, password: string) =>
    api.post('/api/auth/login', { email, password }),
  adminLogin: (email: string, password: string) =>
    api.post('/api/auth/admin/login', { email, password }),
  register: (data: any) => api.post('/api/auth/register', data),
  logout: () => api.post('/api/auth/logout'),
}

export const orderApi = {
  list: (params?: any) => api.get('/api/orders', { params }),
  create: (data: any) => api.post('/api/orders', data),
  get: (id: string) => api.get(`/api/orders/${id}`),
  update: (id: string, data: any) => api.patch(`/api/orders/${id}`, data),
}

export const customerApi = {
  list: (params?: any) => api.get('/api/customers', { params }),
  orders: (id: string) => api.get(`/api/customers/${id}/orders`),
}

export const reportApi = {
  summary: () => api.get('/api/reports/summary'),
  salesChart: (period: string) => api.get('/api/reports/sales-chart', { params: { period } }),
  byCity: () => api.get('/api/reports/by-city'),
  byGender: () => api.get('/api/reports/by-gender'),
  financial: (period: string) => api.get('/api/reports/financial', { params: { period } }),
}

export const trackApi = {
  get: (token: string) => api.get(`/api/track/${token}`),
}

export const adminApi = {
  shops: (params?: any) => api.get('/api/admin/shops', { params }),
  stats: () => api.get('/api/admin/stats'),
  approveShop: (id: string) => api.patch(`/api/admin/shops/${id}/approve`),
  suspendShop: (id: string) => api.patch(`/api/admin/shops/${id}/suspend`),
  updateLimit: (id: string, daily_limit: number) =>
    api.patch(`/api/admin/shops/${id}/limit`, { daily_limit }),
  orders: (params?: any) => api.get('/api/admin/orders', { params }),
}
