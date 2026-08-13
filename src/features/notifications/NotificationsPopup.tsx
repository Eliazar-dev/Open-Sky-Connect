import { AnimatePresence, motion } from 'framer-motion';
import { X, CreditCard, Wifi, Info, Megaphone } from 'lucide-react';
import { EmptyState } from '@/components/ui';
import { useNotifications } from '@/hooks/useCustomerData';
import { formatRelativeTime } from '@/utils/format';
import type { AppNotification } from '@/types';
import { cn } from '@/utils/cn';

interface NotificationsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconFor = (type: AppNotification['type']) => {
  if (type === 'payment') return CreditCard;
  if (type === 'plan') return Wifi;
  if (type === 'promo') return Megaphone;
  return Info;
};

export function NotificationsPopup({ isOpen, onClose }: NotificationsPopupProps) {
  const { data: notifications, isLoading } = useNotifications();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="fixed right-4 top-16 z-50 w-[calc(100%-2rem)] max-w-sm rounded-card bg-white shadow-float sm:right-6"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h3 className="text-base font-semibold text-ink-900">Notifications</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto px-5 py-2">
              {isLoading ? (
                <div className="py-6 text-center text-sm text-slate-400">Loading...</div>
              ) : !notifications?.length ? (
                <EmptyState title="You're all caught up" description="No new notifications." />
              ) : (
                <div className="flex flex-col divide-y divide-slate-100">
                  {notifications.map((n) => {
                    const Icon = iconFor(n.type);
                    return (
                      <div key={n.id} className="flex items-start gap-3 py-3.5">
                        <span
                          className={cn(
                            'mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full',
                            n.isRead ? 'bg-slate-100 text-slate-400' : 'bg-brand-50 text-brand-600'
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-slate-700">{n.message}</p>
                          <p className="mt-0.5 text-xs text-slate-400">{formatRelativeTime(n.createdAt)}</p>
                        </div>
                        {!n.isRead && <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-500" />}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 px-5 py-3 text-center">
              <button className="text-sm font-medium text-brand-600 hover:underline">View all notifications</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
