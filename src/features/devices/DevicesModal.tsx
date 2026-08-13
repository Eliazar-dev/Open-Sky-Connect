import { ChevronRight, Laptop, Smartphone, Tablet, HelpCircle } from 'lucide-react';
import { Badge, Modal, TableSkeleton, EmptyState } from '@/components/ui';
import { useMyDevices } from '@/hooks/useCustomerData';
import { formatRelativeTime } from '@/utils/format';
import type { ConnectedDevice } from '@/types';

interface DevicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconFor = (type: ConnectedDevice['type']) => {
  if (type === 'phone') return Smartphone;
  if (type === 'laptop') return Laptop;
  if (type === 'tablet') return Tablet;
  return HelpCircle;
};

export function DevicesModal({ isOpen, onClose }: DevicesModalProps) {
  const { data: devices, isLoading } = useMyDevices();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="My Devices">
      <p className="mb-3 text-sm text-slate-400">Connect up to 2 devices</p>
      {isLoading ? (
        <TableSkeleton rows={3} columns={2} />
      ) : !devices?.length ? (
        <EmptyState title="No devices connected" />
      ) : (
        <div className="flex flex-col divide-y divide-slate-100">
          {devices.map((device) => {
            const Icon = iconFor(device.type);
            return (
              <div key={device.id} className="flex items-center gap-3 py-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink-900">
                    {device.name} {device.isThisDevice && <span className="text-xs text-slate-400">(This Device)</span>}
                  </p>
                  <p className="text-xs text-slate-400">
                    {device.status === 'connected' ? 'Connected' : `Last seen: ${formatRelativeTime(device.lastSeenAt)}`}
                  </p>
                </div>
                {device.status === 'connected' ? (
                  <Badge variant="success">Connected</Badge>
                ) : (
                  <ChevronRight className="h-4 w-4 text-slate-300" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </Modal>
  );
}
