import type { ConnectedDevice } from '@/types';
import { mockDevices } from './mockData';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const devicesService = {
  // TODO: Replace with real API call:
  // GET /api/customers/devices/
  async getMyDevices(): Promise<ConnectedDevice[]> {
    await wait(400);
    return mockDevices;
  },
};
