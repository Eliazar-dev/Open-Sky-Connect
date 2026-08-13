import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Badge, Button, Table } from '@/components/ui';
import { statusToVariant } from '@/components/ui/Badge';
import type { Column } from '@/components/ui/Table';
import { useAdminRouters } from '@/hooks/useAdminData';
import { RouterDetailsDrawer } from '@/features/admin/RouterDetailsDrawer';
import { AddRouterModal } from '@/features/admin/AddRouterModal';
import type { Router } from '@/types';

export function AdminRoutersPage() {
  const { data: routers, isLoading } = useAdminRouters();
  const [selected, setSelected] = useState<Router | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const columns: Column<Router>[] = [
    { key: 'name', header: 'Router Name', render: (r) => <span className="font-medium text-ink-900">{r.name}</span> },
    { key: 'location', header: 'Location', render: (r) => r.location },
    { key: 'status', header: 'Status', render: (r) => <Badge variant={statusToVariant(r.status)}>{r.status}</Badge> },
    { key: 'users', header: 'Users', render: (r) => r.connectedUsers },
    {
      key: 'action',
      header: 'Action',
      align: 'right',
      render: (r) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelected(r);
          }}
          className="text-sm font-medium text-brand-600 hover:underline"
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setIsAddOpen(true)}>
          Add Router
        </Button>
      </div>

      <Table columns={columns} data={routers ?? []} keyExtractor={(r) => r.id} isLoading={isLoading} onRowClick={setSelected} />

      <RouterDetailsDrawer router={selected} onClose={() => setSelected(null)} />
      <AddRouterModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </div>
  );
}
