import { Badge, Drawer } from '@/components/ui';
import { statusToVariant } from '@/components/ui/Badge';
import type { Customer } from '@/types';
import { formatCurrency, formatDate, formatRelativeTime } from '@/utils/format';

interface CustomerDetailsDrawerProps {
  customer: Customer | null;
  onClose: () => void;
}

export function CustomerDetailsDrawer({ customer, onClose }: CustomerDetailsDrawerProps) {
  return (
    <Drawer isOpen={!!customer} onClose={onClose} title="Customer Details">
      {customer && (
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-lg font-semibold text-brand-600">
              {customer.fullName.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-ink-900">{customer.fullName}</p>
              <p className="text-sm text-slate-400">{customer.phoneNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 text-sm">
            <div>
              <p className="text-slate-400">Status</p>
              <Badge variant={statusToVariant(customer.status)} className="mt-1">
                {customer.status}
              </Badge>
            </div>
            <div>
              <p className="text-slate-400">Total Spent</p>
              <p className="mt-1 font-semibold text-ink-900">{formatCurrency(customer.totalSpent)}</p>
            </div>
            <div>
              <p className="text-slate-400">Joined</p>
              <p className="mt-1 font-medium text-ink-900">{formatDate(customer.joinedAt)}</p>
            </div>
            <div>
              <p className="text-slate-400">Last Active</p>
              <p className="mt-1 font-medium text-ink-900">{formatRelativeTime(customer.lastActiveAt)}</p>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
