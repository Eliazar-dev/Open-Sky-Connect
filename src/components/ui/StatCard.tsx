import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui';
import { cn } from '@/utils/cn';

interface StatCardProps {
  label: string;
  value: string;
  changePct?: number;
}

export function StatCard({ label, value, changePct }: StatCardProps) {
  const isPositive = (changePct ?? 0) >= 0;

  return (
    <Card>
      <p className="text-sm text-slate-400">{label}</p>
      <div className="mt-2 flex items-end justify-between">
        <p className="text-2xl font-bold text-ink-900">{value}</p>
        {changePct !== undefined && (
          <span
            className={cn(
              'flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold',
              isPositive ? 'bg-success-50 text-success-600' : 'bg-danger-50 text-danger-600'
            )}
          >
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(changePct)}%
          </span>
        )}
      </div>
    </Card>
  );
}
