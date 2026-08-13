import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { Check, Loader2, Wifi, XCircle } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import type { Plan } from '@/types';

interface SuccessStepProps {
  plan: Plan;
  onGoToDashboard: () => void;
}

/**
 * Combines Payment Successful -> Connecting -> Connected into one step with
 * an internal micro-animation, matching "beautiful loading animations" from
 * the brief without adding extra route/page overhead.
 */
export function SuccessStep({ plan, onGoToDashboard }: SuccessStepProps) {
  const [phase, setPhase] = useState<'success' | 'connecting' | 'connected'>('success');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('connecting'), 1200);
    const t2 = setTimeout(() => setPhase('connected'), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const startedAt = dayjs();
  const expiresAt = startedAt.add(plan.durationMs, 'millisecond');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-6 text-center">
      <motion.div
        key={phase}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="flex h-24 w-24 items-center justify-center rounded-full bg-success-50 text-success-500"
      >
        {phase === 'success' && <Check className="h-11 w-11" strokeWidth={2.5} />}
        {phase === 'connecting' && <Loader2 className="h-11 w-11 animate-spin" />}
        {phase === 'connected' && <Wifi className="h-11 w-11" />}
      </motion.div>

      <h2 className="mt-6 text-lg font-semibold text-ink-900">
        {phase === 'success' && 'Payment Successful'}
        {phase === 'connecting' && 'Connecting...'}
        {phase === 'connected' && "You're Connected!"}
      </h2>
      <p className="mt-1.5 text-sm text-slate-500">
        {phase === 'connected' ? 'Enjoy fast, reliable internet.' : 'You are now connected!'}
      </p>

      <Card className="mt-6 w-full max-w-xs text-left">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-ink-900">{plan.name}</p>
          <span className="text-xs font-medium text-success-600">{plan.speedLabel}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span>Start Time</span>
          <span className="font-medium text-slate-600">{startedAt.format('D MMM YYYY, h:mm A')}</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between text-xs text-slate-400">
          <span>End Time</span>
          <span className="font-medium text-slate-600">{expiresAt.format('D MMM YYYY, h:mm A')}</span>
        </div>
      </Card>

      <Button fullWidth size="lg" className="mt-6 max-w-xs" onClick={onGoToDashboard}>
        Go to Dashboard
      </Button>
    </div>
  );
}

export function FailedStep({ onRetry, onGoToDashboard }: { onRetry: () => void; onGoToDashboard: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-6 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-danger-50 text-danger-500">
        <XCircle className="h-11 w-11" />
      </div>
      <h2 className="mt-6 text-lg font-semibold text-ink-900">Payment Failed</h2>
      <p className="mt-1.5 max-w-xs text-sm text-slate-500">
        We couldn't confirm your M-Pesa payment. Please try again.
      </p>
      <div className="mt-6 flex w-full max-w-xs flex-col gap-2.5">
        <Button fullWidth size="lg" onClick={onRetry}>
          Try Again
        </Button>
        <Button fullWidth variant="ghost" onClick={onGoToDashboard}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
