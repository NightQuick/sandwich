import { dataApi } from '@/api';
import { UserProfile } from '@constants';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null as string | null,
    user: null as UserProfile | null,
    isLoading: false,
    isInitialized: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },

  actions: {
    async refreshToken() {
      let result = await dataApi.refreshToken();
      console.log(result);
      this.setAuth(result.accessToken, result.user);
    },
    async login(email: string, password: string) {
      const result = await dataApi.login(email, password);
      if (result.status == 401) {
        console.log(result.error);
      } else this.setAuth(result.accessToken, result.user);
    },
    async register(email: string, password: string) {
      try {
        const result = await dataApi.register(email, password);
        this.setAuth(result.accessToken, result.user);
      } catch (err) {
        console.log((err as Error).message);
      }
    },
    setAuth(accessToken: string, user: UserProfile) {
      this.accessToken = accessToken;
      this.user = user;
    },
    async logout() {
      dataApi.logout();
      this.clearAuth();
    },
    clearAuth() {
      this.accessToken = null;
      this.user = null;
    },
  },
});
