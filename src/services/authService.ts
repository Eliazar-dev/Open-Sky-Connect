import type { AuthResponse, LoginPayload, RegisterPayload, VerifyOtpPayload } from '@/types';
import { mockUser } from './mockData';

const DELAY = 900;
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory OTP store to simulate a real verification round-trip.
let pendingOtp = '123456';

export const authService = {
  // TODO: Replace with real API call:
  // POST /api/accounts/login/
  async login(payload: LoginPayload): Promise<AuthResponse> {
    await wait(DELAY);
    if (payload.phoneNumber.replace(/\D/g, '').length < 9) {
      throw new Error('Enter a valid phone number');
    }
    if (payload.password.length < 4) {
      throw new Error('Incorrect phone number or password');
    }
    return {
      user: mockUser,
      accessToken: 'mock_access_token',
      refreshToken: 'mock_refresh_token',
    };
  },

  // TODO: Replace with real API call:
  // POST /api/accounts/register/
  async register(payload: RegisterPayload): Promise<{ phoneNumber: string }> {
    await wait(DELAY);
    if (payload.password !== payload.confirmPassword) {
      throw new Error('Passwords do not match');
    }
    if (payload.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    pendingOtp = '123456'; // demo/mock OTP
    return { phoneNumber: payload.phoneNumber };
  },

  // TODO: Replace with real API call:
  // POST /api/accounts/otp/verify/
  async verifyOtp(payload: VerifyOtpPayload): Promise<AuthResponse> {
    await wait(700);
    if (payload.code !== pendingOtp) {
      throw new Error('Invalid verification code. Please try again.');
    }
    return {
      user: { ...mockUser, phoneNumber: payload.phoneNumber },
      accessToken: 'mock_access_token',
      refreshToken: 'mock_refresh_token',
    };
  },

  // TODO: Replace with real API call:
  // POST /api/accounts/otp/resend/
  async resendOtp(_phoneNumber: string): Promise<{ message: string }> {
    await wait(600);
    pendingOtp = '123456';
    return { message: 'A new verification code has been sent.' };
  },

  // TODO: Replace with real API call:
  // POST /api/accounts/password/reset/
  async requestPasswordReset(_phoneNumber: string): Promise<{ message: string }> {
    await wait(DELAY);
    return { message: 'Password reset instructions sent via SMS.' };
  },

  // TODO: Replace with real API call:
  // POST /api/accounts/logout/
  async logout(): Promise<void> {
    localStorage.removeItem('osc_access_token');
  },
};
