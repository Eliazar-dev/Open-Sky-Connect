import { StatCard } from '@/components/ui/StatCard';
import { StatCardSkeleton } from '@/components/ui';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { useDashboardStats } from '@/hooks/useAdminData';
import { formatCurrency } from '@/utils/format';

export function AdminDashboardPage() {
  const { data: stats, isLoading } = useDashboardStats();

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading || !stats ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <StatCard label="Total Customers" value={stats.totalCustomers.toLocaleString()} />
            <StatCard label="Active Users" value={stats.activeUsers.toLocaleString()} />
            <StatCard label="Revenue (This Month)" value={formatCurrency(stats.revenueThisMonth)} changePct={stats.revenueChangePct} />
            <StatCard label="Today's Revenue" value={formatCurrency(stats.todayRevenue)} changePct={stats.todayRevenueChangePct} />
          </>
        )}
      </div>

      {stats && <RevenueChart data={stats.revenueOverview} />}
    </div>
  );
}
