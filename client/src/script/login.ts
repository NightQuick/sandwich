import { useAuthStore } from '@/stores/sessionStore';

export function checkLogin() {
  const authStore = useAuthStore();
  authStore.refreshToken;
}
