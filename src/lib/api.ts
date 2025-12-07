import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API functions
export const gamesApi = {
  getAll: (provider?: string) => 
    api.get('/games', { params: { provider } }),
  
  getBets: (params: { startDate: string; endDate: string; page?: number; limit?: number; provider?: string }) =>
    api.get('/bets', { params }),
}

export const walletApi = {
  get: () => api.get('/wallet'),
  
  adjust: (data: { userId: string; amount: number; type: string; remark?: string }) =>
    api.post('/wallet/adjust', data),
  
  getTransactions: (params?: { page?: number; limit?: number; type?: string }) =>
    api.get('/wallet/transactions', { params }),
}

export const reportsApi = {
  getSummary: () => api.get('/reports/summary'),
  
  getDashboard: () => api.get('/reports/dashboard'),
  
  getTransactions: (params?: { startDate?: string; endDate?: string }) =>
    api.get('/reports/transactions', { params }),
}

export const usersApi = {
  getAll: (params?: { page?: number; limit?: number; search?: string; role?: string }) =>
    api.get('/users', { params }),
  
  getById: (id: string) => api.get(`/users/${id}`),
  
  update: (id: string, data: Partial<{ full_name: string; role: string; is_active: boolean }>) =>
    api.patch(`/users/${id}`, data),
  
  updatePassword: (id: string, password: string) =>
    api.post(`/users/${id}/password`, { password }),
}
