import type { Customer, Paginated } from '@/types';
import { mockCustomers } from './mockData';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface GetCustomersParams {
  search?: string;
  page?: number;
  pageSize?: number;
}

export const customersService = {
  // TODO: Replace with real API call:
  // GET /api/customers/?search={search}&page={page}&page_size={pageSize}
  async getCustomers({ search = '', page = 1, pageSize = 10 }: GetCustomersParams = {}): Promise<
    Paginated<Customer>
  > {
    await wait(500);
    const filtered = mockCustomers.filter(
      (c) =>
        c.fullName.toLowerCase().includes(search.toLowerCase()) ||
        c.phoneNumber.replace(/\s/g, '').includes(search.replace(/\s/g, ''))
    );
    const start = (page - 1) * pageSize;
    return {
      items: filtered.slice(start, start + pageSize),
      total: filtered.length,
      page,
      pageSize,
    };
  },

  // TODO: Replace with real API call:
  // GET /api/customers/{id}/
  async getCustomerById(id: string): Promise<Customer | undefined> {
    await wait(400);
    return mockCustomers.find((c) => c.id === id);
  },
};
