import { Badge, Modal } from '@/components/ui';
import { statusToVariant } from '@/components/ui/Badge';
import type { Payment } from '@/types';
import { formatCurrency, formatDateTime } from '@/utils/format';

interface PaymentDetailsModalProps {
  payment: Payment | null;
  onClose: () => void;
}

export function PaymentDetailsModal({ payment, onClose }: PaymentDetailsModalProps) {
  return (
    <Modal isOpen={!!payment} onClose={onClose} title="Payment Details">
      {payment && (
        <dl className="grid grid-cols-2 gap-y-3 text-sm">
          <dt className="text-slate-400">Customer</dt>
          <dd className="text-right font-medium text-ink-900">{payment.customerName}</dd>
          <dt className="text-slate-400">Phone</dt>
          <dd className="text-right font-medium text-ink-900">{payment.customerPhone}</dd>
          <dt className="text-slate-400">Plan</dt>
          <dd className="text-right font-medium text-ink-900">{payment.planName}</dd>
          <dt className="text-slate-400">Amount</dt>
          <dd className="text-right font-semibold text-brand-600">{formatCurrency(payment.amount)}</dd>
          <dt className="text-slate-400">Method</dt>
          <dd className="text-right font-medium text-ink-900">{payment.method}</dd>
          <dt className="text-slate-400">Status</dt>
          <dd className="text-right">
            <Badge variant={statusToVariant(payment.status)}>{payment.status}</Badge>
          </dd>
          <dt className="text-slate-400">Date</dt>
          <dd className="text-right font-medium text-ink-900">{formatDateTime(payment.date)}</dd>
          <dt className="text-slate-400">Transaction ID</dt>
          <dd className="text-right font-medium text-ink-900">{payment.transactionId}</dd>
        </dl>
      )}
    </Modal>
  );
}
