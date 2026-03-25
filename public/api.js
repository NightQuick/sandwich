const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed fetch');
    }
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error ${endpoint}:`, error);
    throw error;
  }
}
export const dataApi = {
  getAllIng: (category) => request(`/data/ingredients/${category}`),
  getAllPositions: (category) => request(`/data/sandwiches/${category}`)
};
export const ordersApi = {
  // Создать заказ
  create: (data) =>
    request('/orders', {
      method: 'POST',
      body: JSON.stringify(data)
    })
};
