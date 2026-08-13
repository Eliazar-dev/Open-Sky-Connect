import type { Router } from '@/types';
import { mockRouters } from './mockData';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const routersService = {
  // TODO: Replace with real API call:
  // GET /api/routers/ (Note: routers app not defined yet in Django planning)
  async getRouters(): Promise<Router[]> {
    await wait(500);
    return mockRouters;
  },

  // TODO: Replace with real API call:
  // GET /api/routers/{id}/ (Note: routers app not defined yet in Django planning)
  async getRouterById(id: string): Promise<Router | undefined> {
    await wait(400);
    return mockRouters.find((r) => r.id === id);
  },
};
