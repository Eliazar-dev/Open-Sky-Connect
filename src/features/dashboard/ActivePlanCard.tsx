import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Badge, Card, Skeleton } from '@/components/ui';
import type { ActiveSubscription } from '@/types';
import { formatCountdown, formatCurrency } from '@/utils/format';

interface ActivePlanCardProps {
  subscription: ActiveSubscription | null | undefined;
  isLoading?: boolean;
  onClick?: () => void;
}

export function ActivePlanCard({ subscription, isLoading, onClick }: ActivePlanCardProps) {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (!subscription) return;
    const update = () => setSecondsLeft(Math.max(0, dayjs(subscription.expiresAt).diff(dayjs(), 'second')));
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [subscription]);

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-brand-500 to-brand-600">
        <Skeleton className="h-4 w-24 bg-white/30 mb-3" />
        <Skeleton className="h-6 w-40 bg-white/30" />
      </Card>
    );
  }

  if (!subscription) {
    return (
      <Card className="text-center py-8">
        <p className="text-sm font-medium text-ink-900">No active plan</p>
        <p className="mt-1 text-sm text-slate-500">Buy internet to get connected</p>
      </Card>
    );
  }

  return (
    <Card
      onClick={onClick}
      className="cursor-pointer bg-gradient-to-br from-brand-500 to-brand-600 text-white border-none"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-white/70">Active Plan</p>
          <h3 className="mt-1 text-lg font-bold">{subscription.plan.name} {subscription.dataCapGb === null ? 'Unlimited' : ''}</h3>
        </div>
        <Badge variant="success" className="bg-white/20 text-white" dot>
          Active
        </Badge>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-white/60">Expires</p>
          <p className="mt-0.5 text-sm font-semibold">{formatCountdown(secondsLeft)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-white/60">Data Used</p>
          <p className="mt-0.5 text-sm font-semibold">{subscription.dataUsedGb} GB</p>
        </div>
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
        <div
          className="h-full rounded-full bg-white"
          style={{
            width: `${Math.max(
              4,
              100 - (secondsLeft / dayjs(subscription.expiresAt).diff(dayjs(subscription.startedAt), 'second')) * 100
            )}%`,
          }}
        />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-3 text-sm">
        <span className="text-white/70">Balance</span>
        <span className="font-semibold">{formatCurrency(subscription.balance)}</span>
      </div>
    </Card>
  );
}
