import { useQuery } from '@tanstack/react-query';
import { paymentsService } from '@/services/paymentsService';
import { devicesService } from '@/services/devicesService';
import { notificationsService } from '@/services/notificationsService';

export function useMyPaymentHistory() {
  return useQuery({
    queryKey: ['my-payment-history'],
    queryFn: paymentsService.getMyPaymentHistory,
  });
}

export function useMyDevices() {
  return useQuery({
    queryKey: ['my-devices'],
    queryFn: devicesService.getMyDevices,
  });
}

export function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: notificationsService.getNotifications,
  });
}
