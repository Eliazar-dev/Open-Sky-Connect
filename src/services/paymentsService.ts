import type { Paginated, Payment, PaymentStatus } from '@/types';
import { mockPaymentHistory, mockPayments } from './mockData';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface GetPaymentsParams {
  search?: string;
  status?: PaymentStatus | 'all';
  page?: number;
  pageSize?: number;
}

export const paymentsService = {
  // TODO: Replace with real API call:
  // GET /api/payments/?search={search}&status={status}&page={page}&page_size={pageSize}
  async getPayments({ search = '', status = 'all', page = 1, pageSize = 10 }: GetPaymentsParams = {}): Promise<
    Paginated<Payment>
  > {
    await wait(500);
    const filtered = mockPayments.filter((p) => {
      const matchesSearch =
        p.customerName.toLowerCase().includes(search.toLowerCase()) ||
        p.transactionId.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === 'all' || p.status === status;
      return matchesSearch && matchesStatus;
    });
    const start = (page - 1) * pageSize;
    return {
      items: filtered.slice(start, start + pageSize),
      total: filtered.length,
      page,
      pageSize,
    };
  },

  // TODO: Replace with real API call:
  // GET /api/payments/my/
  /** Customer-facing payment history for the logged-in user only. */
  async getMyPaymentHistory(): Promise<Payment[]> {
    await wait(500);
    return mockPaymentHistory;
  },
};
