import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboardService';
import { customersService, type GetCustomersParams } from '@/services/customersService';
import { paymentsService, type GetPaymentsParams } from '@/services/paymentsService';
import { routersService } from '@/services/routersService';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: dashboardService.getStats,
  });
}

export function useAdminCustomers(params: GetCustomersParams) {
  return useQuery({
    queryKey: ['admin-customers', params],
    queryFn: () => customersService.getCustomers(params),
    placeholderData: (prev) => prev,
  });
}

export function useAdminPayments(params: GetPaymentsParams) {
  return useQuery({
    queryKey: ['admin-payments', params],
    queryFn: () => paymentsService.getPayments(params),
    placeholderData: (prev) => prev,
  });
}

export function useAdminRouters() {
  return useQuery({
    queryKey: ['admin-routers'],
    queryFn: routersService.getRouters,
  });
}
