import { ChevronLeft } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import type { Plan } from '@/types';
import { formatCurrency } from '@/utils/format';

interface ConfirmPaymentStepProps {
  plan: Plan;
  phoneNumber: string;
  isSubmitting: boolean;
  onPayNow: () => void;
  onBack: () => void;
}

export function ConfirmPaymentStep({ plan, phoneNumber, isSubmitting, onPayNow, onBack }: ConfirmPaymentStepProps) {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <div className="flex items-center gap-3 px-4 pt-5 pb-2 sm:px-6">
        <button onClick={onBack} aria-label="Back" className="text-slate-400 hover:text-slate-600">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold text-ink-900">Confirm Payment</h1>
      </div>
      <p className="px-4 text-sm text-slate-400 sm:px-6">Pay securely via M-Pesa</p>

      <div className="mx-auto w-full max-w-md flex-1 px-4 pt-4 sm:px-6">
        <Card className="mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Plan</span>
            <span className="font-semibold text-ink-900">{plan.name}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-slate-400">Phone Number</span>
            <span className="font-semibold text-ink-900">{phoneNumber}</span>
          </div>
          <div className="mt-3 border-t border-slate-100 pt-3 flex items-center justify-between">
            <span className="text-sm text-slate-400">Amount</span>
            <span className="text-lg font-bold text-brand-600">{formatCurrency(plan.price)}</span>
          </div>
        </Card>

        <Card padding="sm" className="bg-brand-50 border-none">
          <ol className="list-decimal space-y-1.5 pl-4 text-sm text-brand-800">
            <li>You will receive an M-Pesa prompt</li>
            <li>Enter your M-Pesa PIN</li>
            <li>Wait for confirmation</li>
          </ol>
        </Card>
      </div>

      <div className="sticky bottom-0 mx-auto w-full max-w-md bg-surface px-4 py-4 sm:px-6">
        <Button fullWidth size="lg" isLoading={isSubmitting} onClick={onPayNow}>
          Pay Now
        </Button>
      </div>
    </div>
  );
}
