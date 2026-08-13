import { Badge, Drawer } from '@/components/ui';
import { statusToVariant } from '@/components/ui/Badge';
import type { Router } from '@/types';
import { formatRelativeTime } from '@/utils/format';

interface RouterDetailsDrawerProps {
  router: Router | null;
  onClose: () => void;
}

export function RouterDetailsDrawer({ router, onClose }: RouterDetailsDrawerProps) {
  return (
    <Drawer isOpen={!!router} onClose={onClose} title="Router Details">
      {router && (
        <div className="flex flex-col gap-5">
          <div>
            <p className="font-semibold text-ink-900">{router.name}</p>
            <p className="text-sm text-slate-400">{router.location}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 text-sm">
            <div>
              <p className="text-slate-400">Status</p>
              <Badge variant={statusToVariant(router.status)} className="mt-1">
                {router.status}
              </Badge>
            </div>
            <div>
              <p className="text-slate-400">Connected Users</p>
              <p className="mt-1 font-semibold text-ink-900">{router.connectedUsers}</p>
            </div>
            <div>
              <p className="text-slate-400">IP Address</p>
              <p className="mt-1 font-medium text-ink-900">{router.ipAddress}</p>
            </div>
            <div>
              <p className="text-slate-400">Model</p>
              <p className="mt-1 font-medium text-ink-900">{router.model ?? '\u2014'}</p>
            </div>
            <div className="col-span-2">
              <p className="text-slate-400">Last Seen</p>
              <p className="mt-1 font-medium text-ink-900">{formatRelativeTime(router.lastSeenAt)}</p>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
