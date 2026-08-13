import type { DashboardStats } from '@/types';
import { mockDashboardStats } from './mockData';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const dashboardService = {
  // TODO: Replace with real API call:
  // GET /api/dashboard/stats/
  async getStats(): Promise<DashboardStats> {
    await wait(500);
    return mockDashboardStats;
  },
};
