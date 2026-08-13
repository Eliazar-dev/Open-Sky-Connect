import { Wifi, Receipt, LifeBuoy, User } from 'lucide-react';
import { cn } from '@/utils/cn';

interface QuickAction {
  key: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  accent: string;
}

interface QuickActionsProps {
  onBuyInternet: () => void;
  onPaymentHistory: () => void;
  onSupport: () => void;
  onProfile: () => void;
}

export function QuickActions({ onBuyInternet, onPaymentHistory, onSupport, onProfile }: QuickActionsProps) {
  const actions: QuickAction[] = [
    { key: 'buy', label: 'Buy Internet', icon: <Wifi className="h-5 w-5" />, onClick: onBuyInternet, accent: 'bg-brand-50 text-brand-600' },
    { key: 'history', label: 'Payment History', icon: <Receipt className="h-5 w-5" />, onClick: onPaymentHistory, accent: 'bg-success-50 text-success-600' },
    { key: 'support', label: 'Support', icon: <LifeBuoy className="h-5 w-5" />, onClick: onSupport, accent: 'bg-warning-50 text-warning-500' },
    { key: 'profile', label: 'Profile', icon: <User className="h-5 w-5" />, onClick: onProfile, accent: 'bg-slate-100 text-slate-600' },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action) => (
        <button
          key={action.key}
          onClick={action.onClick}
          className="flex flex-col items-center gap-2 rounded-2xl bg-white p-3 shadow-card transition-transform active:scale-95"
        >
          <span className={cn('flex h-11 w-11 items-center justify-center rounded-xl', action.accent)}>{action.icon}</span>
          <span className="text-center text-[11px] font-medium leading-tight text-slate-600">{action.label}</span>
        </button>
      ))}
    </div>
  );
}
