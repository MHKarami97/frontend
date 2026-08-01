import { defineStore } from 'pinia';
import { api } from '../services/api';
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('ordertrack-token') || '',
    refreshToken: localStorage.getItem('ordertrack-refresh-token') || '',
    role: localStorage.getItem('ordertrack-role') || ''
  }),
  actions: {
    async login(email: string, password: string, scope: 'shop' | 'admin' = 'shop') {
      const result = await api.post('/api/auth/login', { email, password, scope });
      if (result.token) {
        this.token = result.token;
        this.refreshToken = result.refreshToken || '';
        this.role = result.role;
        localStorage.setItem('ordertrack-token', result.token);
        localStorage.setItem('ordertrack-refresh-token', result.refreshToken || '');
        localStorage.setItem('ordertrack-role', result.role);
      }
      return result;
    },
    async logout() {
      await api.post('/api/auth/logout', {});
      this.token = '';
      this.refreshToken = '';
      this.role = '';
      localStorage.removeItem('ordertrack-token');
      localStorage.removeItem('ordertrack-refresh-token');
      localStorage.removeItem('ordertrack-role');
    }
  }
});
