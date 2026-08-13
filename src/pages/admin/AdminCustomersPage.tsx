import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Badge, Button, Pagination, SearchBar, Table } from '@/components/ui';
import { statusToVariant } from '@/components/ui/Badge';
import type { Column } from '@/components/ui/Table';
import { useAdminCustomers } from '@/hooks/useAdminData';
import { CustomerDetailsDrawer } from '@/features/admin/CustomerDetailsDrawer';
import { AddCustomerModal } from '@/features/admin/AddCustomerModal';
import type { Customer } from '@/types';
import { formatRelativeTime } from '@/utils/format';

const PAGE_SIZE = 6;

export function AdminCustomersPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Customer | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const { data, isLoading } = useAdminCustomers({ search, page, pageSize: PAGE_SIZE });

  const columns: Column<Customer>[] = [
    { key: 'name', header: 'Name', render: (c) => <span className="font-medium text-ink-900">{c.fullName}</span> },
    { key: 'phone', header: 'Phone Number', render: (c) => c.phoneNumber },
    {
      key: 'status',
      header: 'Status',
      render: (c) => <Badge variant={statusToVariant(c.status)}>{c.status}</Badge>,
    },
    { key: 'lastActive', header: 'Last Active', render: (c) => formatRelativeTime(c.lastActiveAt) },
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
          placeholder="Search customers..."
          className="sm:max-w-xs"
        />
        <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setIsAddOpen(true)}>
          Add Customer
        </Button>
      </div>

      <Table
        columns={columns}
        data={data?.items ?? []}
        keyExtractor={(c) => c.id}
        isLoading={isLoading}
        emptyMessage="No customers match your search."
        onRowClick={setSelected}
      />

      {data && (
        <Pagination page={page} totalPages={Math.ceil(data.total / PAGE_SIZE)} onPageChange={setPage} />
      )}

      <CustomerDetailsDrawer customer={selected} onClose={() => setSelected(null)} />
      <AddCustomerModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </div>
  );
}
