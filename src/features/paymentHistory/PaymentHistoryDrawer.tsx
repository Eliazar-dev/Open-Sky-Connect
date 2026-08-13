import { useState } from 'react';
import { Drawer, Badge, TableSkeleton, EmptyState } from '@/components/ui';
import { statusToVariant } from '@/components/ui/Badge';
import { useMyPaymentHistory } from '@/hooks/useCustomerData';
import { formatCurrency, formatDateTime } from '@/utils/format';
import { ReceiptModal } from './ReceiptModal';
import type { Payment } from '@/types';

interface PaymentHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentHistoryDrawer({ isOpen, onClose }: PaymentHistoryDrawerProps) {
  const { data: payments, isLoading } = useMyPaymentHistory();
  const [selected, setSelected] = useState<Payment | null>(null);

  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose} title="Payment History">
        {isLoading ? (
          <TableSkeleton rows={4} columns={2} />
        ) : !payments?.length ? (
          <EmptyState title="No payments yet" description="Your payment history will show up here." />
        ) : (
          <div className="flex flex-col divide-y divide-slate-100">
            {payments.map((payment) => (
              <button
                key={payment.id}
                onClick={() => setSelected(payment)}
                className="flex items-center justify-between py-3.5 text-left hover:bg-slate-50 -mx-2 px-2 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-ink-900">{formatDateTime(payment.date)}</p>
                  <p className="text-xs text-slate-400">{payment.planName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-ink-900">{formatCurrency(payment.amount)}</p>
                  <Badge variant={statusToVariant(payment.status)} className="mt-1">
                    {payment.status}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        )}
      </Drawer>

      <ReceiptModal payment={selected} onClose={() => setSelected(null)} />
    </>
  );
}
