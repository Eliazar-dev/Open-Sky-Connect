import { Laptop, Smartphone, Tablet, HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui';
import type { ConnectedDevice } from '@/types';

const iconFor = (type: ConnectedDevice['type']) => {
  if (type === 'phone') return Smartphone;
  if (type === 'laptop') return Laptop;
  if (type === 'tablet') return Tablet;
  return HelpCircle;
};

interface DevicesSummaryCardProps {
  devices: ConnectedDevice[] | undefined;
  onViewAll: () => void;
}

export function DevicesSummaryCard({ devices, onViewAll }: DevicesSummaryCardProps) {
  const connectedCount = devices?.filter((d) => d.status === 'connected').length ?? 0;

  return (
    <Card className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {(devices ?? []).slice(0, 3).map((d) => {
            const Icon = iconFor(d.type);
            return (
              <span
                key={d.id}
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-brand-50 text-brand-600"
              >
                <Icon className="h-4 w-4" />
              </span>
            );
          })}
        </div>
        <div>
          <p className="text-sm font-semibold text-ink-900">Connected Devices</p>
          <p className="text-xs text-slate-400">{connectedCount} device{connectedCount === 1 ? '' : 's'} online</p>
        </div>
      </div>
      <button onClick={onViewAll} className="text-sm font-medium text-brand-600 hover:underline">
        View All
      </button>
    </Card>
  );
}
