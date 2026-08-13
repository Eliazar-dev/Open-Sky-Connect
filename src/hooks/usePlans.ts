import { useMutation, useQuery } from '@tanstack/react-query';
import { plansService } from '@/services/plansService';
import type { InitiatePaymentPayload } from '@/types';

export function usePlans() {
  return useQuery({
    queryKey: ['plans'],
    queryFn: plansService.getPlans,
  });
}

export function useActiveSubscription() {
  return useQuery({
    queryKey: ['active-subscription'],
    queryFn: plansService.getActiveSubscription,
  });
}

export function useInitiatePayment() {
  return useMutation({
    mutationFn: (payload: InitiatePaymentPayload) => plansService.initiatePayment(payload),
  });
}

export function useCheckPaymentStatus() {
  return useMutation({
    mutationFn: (checkoutRequestId: string) => plansService.checkPaymentStatus(checkoutRequestId),
  });
}
