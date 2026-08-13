import { Home, Wifi, Clock, LifeBuoy, User } from 'lucide-react';
import { cn } from '@/utils/cn';

export type BottomNavTab = 'home' | 'buy' | 'history' | 'support' | 'profile';

interface BottomNavProps {
  active: BottomNavTab;
  onChange: (tab: BottomNavTab) => void;
}

const items: { key: BottomNavTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'buy', label: 'Buy', icon: Wifi },
  { key: 'history', label: 'History', icon: Clock },
  { key: 'support', label: 'Support', icon: LifeBuoy },
  { key: 'profile', label: 'Profile', icon: User },
];

/** Fixed bottom tab bar for the mobile-first customer experience. */
export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-100 bg-white/95 backdrop-blur px-2 pb-[env(safe-area-inset-bottom)] pt-1.5 sm:hidden">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onChange(item.key)}
              className="flex flex-1 flex-col items-center gap-0.5 py-1.5"
            >
              <Icon className={cn('h-5 w-5', isActive ? 'text-brand-600' : 'text-slate-400')} />
              <span className={cn('text-[10px] font-medium', isActive ? 'text-brand-600' : 'text-slate-400')}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
