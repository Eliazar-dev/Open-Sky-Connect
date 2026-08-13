import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';
import { formatPhoneDisplay } from '@/utils/format';

interface WaitingForPaymentStepProps {
  phoneNumber: string;
  onCancel: () => void;
}

/** Shown while polling the mocked M-Pesa STK push status. */
export function WaitingForPaymentStep({ phoneNumber, onCancel }: WaitingForPaymentStepProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-6 text-center">
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-brand-600"
      >
        <Smartphone className="h-9 w-9" />
      </motion.div>

      <h2 className="mt-6 text-lg font-semibold text-ink-900">Waiting for Payment</h2>
      <p className="mt-1.5 max-w-xs text-sm text-slate-500">Please complete the payment on your phone</p>
      <p className="mt-4 text-sm text-slate-400">
        We have sent a payment request to <span className="font-medium text-slate-700">{formatPhoneDisplay(phoneNumber)}</span>
      </p>

      <div className="mt-6 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-brand-400"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      <button onClick={onCancel} className="mt-8 text-sm font-medium text-slate-400 hover:text-slate-600">
        Cancel Payment
      </button>
    </div>
  );
}
