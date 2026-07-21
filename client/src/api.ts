import { Position } from '@constants';
import { useAuthStore } from '@/stores/sessionStore';

const API_BASE = '/api';

let isRefreshing = false;
let queue: Array<() => void> = [];
const PUBLIC_ENDPOINTS = [
  '/users/autorization/login',
  '/users/autorization/registration',
  '/users/autorization/refreshToken',
];

async function request(endpoint: string, options: RequestInit = {}, retry = true): Promise<any> {
  const url = `${API_BASE}${endpoint}`;
  const auth = useAuthStore();

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(auth.accessToken ? { Authorization: `Bearer ${auth.accessToken}` } : {}),
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  const isPublic = PUBLIC_ENDPOINTS.includes(endpoint);

  if (response.status === 401 && retry && !isPublic) {
    if (isRefreshing) {
      await new Promise<void>((resolve) => queue.push(resolve));
      return request(endpoint, options, false);
    }

    isRefreshing = true;
    try {
      await auth.refreshToken();
      queue.forEach((cb) => cb());
      queue = [];
      return request(endpoint, options, false);
    } catch (refreshError) {
      auth.clearAuth();
      queue = [];
      throw refreshError;
    } finally {
      isRefreshing = false;
    }
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed fetch');
  }
  if (response.status === 204) return null;
  return await response.json();
}

export const dataApi = {
  login: (email: string, password: string) =>
    request('/users/autorization/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  register: (email: string, password: string) =>
    request('/users/autorization/registration', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  logout: () =>
    request(
      '/users/autorization/logout',
      {
        method: 'POST',
        credentials: 'include',
      },
      false,
    ),
  refreshToken: () =>
    request('/users/autorization/refreshToken', { method: 'POST', credentials: 'include' }, false),
  getAllIng: (category: string) => request(`/data/ingredients/${category}`),
  getAllPositions: (category: string) => request(`/data/sandwiches/${category}`),
};

export const ordersApi = {
  create: (data: Omit<Position, 'image' | 'description'>[]) =>
    request('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
