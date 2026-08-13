import { useState } from 'react';
import { Badge, Dropdown, Pagination, SearchBar, Table } from '@/components/ui';
import { statusToVariant } from '@/components/ui/Badge';
import type { Column } from '@/components/ui/Table';
import { useAdminPayments } from '@/hooks/useAdminData';
import { PaymentDetailsModal } from '@/features/admin/PaymentDetailsModal';
import type { Payment, PaymentStatus } from '@/types';
import { formatCurrency, formatDate } from '@/utils/format';

const PAGE_SIZE = 6;

const statusOptions = [
  { label: 'All Status', value: 'all' },
  { label: 'Success', value: 'success' },
  { label: 'Pending', value: 'pending' },
  { label: 'Failed', value: 'failed' },
];

const dateOptions = [
  { label: 'Today', value: 'today' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
  { label: 'All Time', value: 'all' },
];

export function AdminPaymentsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<PaymentStatus | 'all'>('all');
  const [dateRange, setDateRange] = useState('today');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Payment | null>(null);

  const { data, isLoading } = useAdminPayments({ search, status, page, pageSize: PAGE_SIZE });

  const columns: Column<Payment>[] = [
    { key: 'customer', header: 'Customer', render: (p) => <span className="font-medium text-ink-900">{p.customerName}</span> },
    { key: 'plan', header: 'Plan', render: (p) => p.planName },
    { key: 'amount', header: 'Amount', render: (p) => formatCurrency(p.amount) },
    { key: 'method', header: 'Method', render: (p) => p.method },
    { key: 'status', header: 'Status', render: (p) => <Badge variant={statusToVariant(p.status)}>{p.status}</Badge> },
    { key: 'date', header: 'Date', render: (p) => formatDate(p.date) },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
          placeholder="Search payments..."
          className="sm:max-w-xs"
        />
        <div className="flex gap-3">
          <Dropdown
            options={statusOptions}
            value={status}
            onChange={(v) => {
              setStatus(v as PaymentStatus | 'all');
              setPage(1);
            }}
            className="w-36"
          />
          <Dropdown options={dateOptions} value={dateRange} onChange={setDateRange} className="w-36" />
        </div>
      </div>

      <Table
        columns={columns}
        data={data?.items ?? []}
        keyExtractor={(p) => p.id}
        isLoading={isLoading}
        emptyMessage="No payments match your filters."
        onRowClick={setSelected}
      />

      {data && <Pagination page={page} totalPages={Math.ceil(data.total / PAGE_SIZE)} onPageChange={setPage} />}

      <PaymentDetailsModal payment={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
