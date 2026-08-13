import { Download } from 'lucide-react';
import { Button, Logo, Modal } from '@/components/ui';
import type { Payment } from '@/types';
import { formatCurrency, formatDateTime } from '@/utils/format';

interface ReceiptModalProps {
  payment: Payment | null;
  onClose: () => void;
}

export function ReceiptModal({ payment, onClose }: ReceiptModalProps) {
  return (
    <Modal isOpen={!!payment} onClose={onClose} title="Payment Receipt">
      {payment && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            <Logo size={30} />
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <dl className="grid grid-cols-2 gap-y-3 text-sm">
              <dt className="text-slate-400">Plan</dt>
              <dd className="text-right font-medium text-ink-900">{payment.planName}</dd>
              <dt className="text-slate-400">Amount</dt>
              <dd className="text-right font-medium text-ink-900">{formatCurrency(payment.amount)}</dd>
              <dt className="text-slate-400">Date</dt>
              <dd className="text-right font-medium text-ink-900">{formatDateTime(payment.date)}</dd>
              <dt className="text-slate-400">Transaction ID</dt>
              <dd className="text-right font-medium text-ink-900">{payment.transactionId}</dd>
            </dl>
          </div>

          <Button fullWidth leftIcon={<Download className="h-4 w-4" />} onClick={() => window.print()}>
            Download Receipt
          </Button>
        </div>
      )}
    </Modal>
  );
}
