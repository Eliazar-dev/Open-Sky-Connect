import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/authService';
import type { LoginPayload, RegisterPayload, VerifyOtpPayload } from '@/types';

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
  });
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => authService.verifyOtp(payload),
  });
}

export function useResendOtp() {
  return useMutation({
    mutationFn: (phoneNumber: string) => authService.resendOtp(phoneNumber),
  });
}

export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: (phoneNumber: string) => authService.requestPasswordReset(phoneNumber),
  });
}
