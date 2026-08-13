import { Bell } from 'lucide-react';
import { Logo } from '@/components/ui';

interface DashboardTopBarProps {
  unreadCount?: number;
  onNotificationsClick: () => void;
}

export function DashboardTopBar({ unreadCount = 0, onNotificationsClick }: DashboardTopBarProps) {
  return (
    <div className="flex items-center justify-between px-4 pt-5 pb-2 sm:px-6">
      <Logo size={26} />
      <button
        onClick={onNotificationsClick}
        aria-label="Notifications"
        className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-card text-slate-500 hover:text-brand-600"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger-500 text-[10px] font-semibold text-white">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}
