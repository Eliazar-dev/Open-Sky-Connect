import axios from 'axios';

/**
 * Central Axios instance for the (future) Django REST Framework backend.
 * Every real service call should go through this client so auth headers,
 * base URL, and error interceptors live in exactly one place.
 *
 * Right now all `services/*Service.ts` files use in-memory mocks (see
 * mockData.ts) instead of calling `apiClient`, so the app runs standalone.
 * Swap a mock function's body for a real `apiClient.get/post(...)` call to
 * go live — the function signatures and return types are already the
 * contract the rest of the app expects.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('osc_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Admin-specific Axios instance for admin authentication and admin-only endpoints.
 * Uses admin tokens (osc_admin_access_token, osc_admin_refresh_token).
 */
export const adminApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

adminApiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('osc_admin_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Track ongoing token refresh to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

/**
 * Add a callback to be executed when token refresh completes
 */
function subscribeTokenRefresh(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

/**
 * Notify all waiting callbacks that token refresh completed
 */
function onTokenRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 error and we haven't tried refreshing yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, wait for the refresh to complete
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // TODO: Replace with real API call:
        // POST /api/accounts/token/refresh/
        const refreshToken = localStorage.getItem('osc_refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Mock refresh response - replace with real API call
        // const response = await apiClient.post('/api/accounts/token/refresh/', {
        //   refresh: refreshToken,
        // });
        // const { access } = response.data;

        // For now, just use the existing token as a mock
        const access = localStorage.getItem('osc_access_token') || 'mock_access_token';

        localStorage.setItem('osc_access_token', access);
        onTokenRefreshed(access);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear tokens and redirect to login
        localStorage.removeItem('osc_access_token');
        localStorage.removeItem('osc_refresh_token');
        
        // TODO: Trigger redirect to login via AuthContext or window.location
        // For now, just reject the error
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
