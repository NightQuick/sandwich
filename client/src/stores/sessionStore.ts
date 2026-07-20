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
    async login(email: string, password: string) {
      const result = await dataApi.login(email, password);
      if (result.status == 401) {
        console.log(result.error);
      }
    },
    setAuth(accessToken: string, user: UserProfile) {
      this.accessToken = accessToken;
      this.user = user;
    },
    clearAuth() {
      this.accessToken = null;
      this.user = null;
    },
  },
});
