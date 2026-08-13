import { adminApiClient } from './apiClient';
import type {
  AdminRegisterPayload,
  AdminRegisterResponse,
  AdminVerifyEmailPayload,
  AdminVerifyEmailResponse,
  AdminLoginRequestPayload,
  AdminLoginRequestResponse,
  AdminVerifyTokenPayload,
  AdminVerifyTokenResponse,
  AdminForgotPasswordPayload,
  AdminResetPasswordPayload,
} from '@/types';

export const adminAuthService = {
  /**
   * Register a new admin account
   * POST /users/api/register/
   */
  async register(payload: AdminRegisterPayload): Promise<AdminRegisterResponse> {
    const response = await adminApiClient.post<AdminRegisterResponse>('/users/api/register/', payload);
    return response.data;
  },

  /**
   * Verify admin email with token
   * POST /users/api/verify-email/
   */
  async verifyEmail(payload: AdminVerifyEmailPayload): Promise<AdminVerifyEmailResponse> {
    const response = await adminApiClient.post<AdminVerifyEmailResponse>('/users/api/verify-email/', payload);
    return response.data;
  },

  /**
   * Resend email verification token
   * POST /users/api/resend-verification/
   */
  async resendVerification(email: string): Promise<{ message: string }> {
    const response = await adminApiClient.post<{ message: string }>('/users/api/resend-verification/', { email });
    return response.data;
  },

  /**
   * Request login token (passwordless login)
   * POST /users/api/login/
   */
  async requestLoginToken(payload: AdminLoginRequestPayload): Promise<AdminLoginRequestResponse> {
    const response = await adminApiClient.post<AdminLoginRequestResponse>('/users/api/login/', payload);
    return response.data;
  },

  /**
   * Resend login token
   * POST /users/api/resend-login-token/
   */
  async resendLoginToken(email: string): Promise<{ message: string }> {
    const response = await adminApiClient.post<{ message: string }>('/users/api/resend-login-token/', { email });
    return response.data;
  },

  /**
   * Verify login token and get access tokens
   * POST /users/api/verify-token/
   */
  async verifyLoginToken(payload: AdminVerifyTokenPayload): Promise<AdminVerifyTokenResponse> {
    const response = await adminApiClient.post<AdminVerifyTokenResponse>('/users/api/verify-token/', payload);
    return response.data;
  },

  /**
   * Request password reset
   * POST /users/api/forgot-password/
   */
  async forgotPassword(payload: AdminForgotPasswordPayload): Promise<{ message: string }> {
    const response = await adminApiClient.post<{ message: string }>('/users/api/forgot-password/', payload);
    return response.data;
  },

  /**
   * Reset password with token
   * POST /users/api/reset-password/
   */
  async resetPassword(payload: AdminResetPasswordPayload): Promise<{ message: string }> {
    const response = await adminApiClient.post<{ message: string }>('/users/api/reset-password/', payload);
    return response.data;
  },

  /**
   * Logout admin
   */
  async logout(): Promise<void> {
    localStorage.removeItem('osc_admin_access_token');
    localStorage.removeItem('osc_admin_refresh_token');
  },
};
