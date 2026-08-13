import type {
  ActiveSubscription,
  InitiatePaymentPayload,
  InitiatePaymentResponse,
  Plan,
} from '@/types';
import { mockActiveSubscription, mockPlans } from './mockData';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const plansService = {
  // TODO: Replace with real API call:
  // GET /api/packages/
  async getPlans(): Promise<Plan[]> {
    await wait(500);
    return mockPlans;
  },

  // TODO: Replace with real API call:
  // GET /api/subscriptions/active/
  async getActiveSubscription(): Promise<ActiveSubscription | null> {
    await wait(500);
    return mockActiveSubscription;
  },

  // TODO: Replace with real API call:
  // POST /api/payments/mpesa/stk-push/
  async initiatePayment(payload: InitiatePaymentPayload): Promise<InitiatePaymentResponse> {
    await wait(800);
    if (!payload.planId) throw new Error('Select a plan to continue');
    return {
      checkoutRequestId: `ws_CO_${Date.now()}`,
      message: 'STK push sent. Enter your M-Pesa PIN to complete payment.',
    };
  },

  /**
   * Polls the (mocked) M-Pesa STK push result. In the real integration this
   * calls the Django endpoint that checks Daraja's callback status.
   * Randomized success bias so the demo mostly succeeds but occasionally
   * shows the failure path.
   */
  // TODO: Replace with real API call:
  // GET /api/payments/mpesa/status/{checkoutRequestId}/
  async checkPaymentStatus(_checkoutRequestId: string): Promise<'success' | 'pending' | 'failed'> {
    await wait(1800);
    return Math.random() > 0.12 ? 'success' : 'failed';
  },
};
