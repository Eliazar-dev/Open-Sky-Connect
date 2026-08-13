import { useState } from 'react';
import { Plus, Pencil } from 'lucide-react';
import { Badge, Button, Table } from '@/components/ui';
import { statusToVariant } from '@/components/ui/Badge';
import type { Column } from '@/components/ui/Table';
import { usePlans } from '@/hooks/usePlans';
import { PlanFormModal } from '@/features/admin/PlanFormModal';
import type { Plan } from '@/types';
import { formatCurrency } from '@/utils/format';

export function AdminPlansPage() {
  const { data: plans, isLoading } = usePlans();
  const [editingPlan, setEditingPlan] = useState<Plan | null | undefined>(undefined);

  const columns: Column<Plan>[] = [
    { key: 'name', header: 'Plan Name', render: (p) => <span className="font-medium text-ink-900">{p.name}</span> },
    { key: 'duration', header: 'Duration', render: (p) => p.durationLabel },
    { key: 'speed', header: 'Speed', render: (p) => p.speedLabel },
    { key: 'price', header: 'Price', render: (p) => formatCurrency(p.price) },
    { key: 'status', header: 'Status', render: (p) => <Badge variant={statusToVariant(p.status)}>{p.status}</Badge> },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (p) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEditingPlan(p);
          }}
          className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setEditingPlan(null)}>
          Add Plan
        </Button>
      </div>

      <Table columns={columns} data={plans ?? []} keyExtractor={(p) => p.id} isLoading={isLoading} />

      <PlanFormModal isOpen={editingPlan !== undefined} onClose={() => setEditingPlan(undefined)} plan={editingPlan} />
    </div>
  );
}
