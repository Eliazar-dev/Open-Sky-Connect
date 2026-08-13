import type { AppNotification } from '@/types';
import { mockNotifications } from './mockData';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const notificationsService = {
  // TODO: Replace with real API call:
  // GET /api/notifications/
  async getNotifications(): Promise<AppNotification[]> {
    await wait(400);
    return mockNotifications;
  },

  // TODO: Replace with real API call:
  // POST /api/notifications/mark-read/
  async markAllRead(): Promise<void> {
    await wait(300);
    mockNotifications.forEach((n) => (n.isRead = true));
  },
};
