import { ChevronRight, KeyRound, LogOut, User, Wallet } from 'lucide-react';
import { Drawer } from '@/components/ui';
import { useAuthContext } from '@/contexts/AuthContext';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { key: 'edit', label: 'Edit Profile', icon: User },
  { key: 'password', label: 'Change Password', icon: KeyRound },
  { key: 'methods', label: 'Payment Methods', icon: Wallet },
];

export function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
  const { user, logout } = useAuthContext();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Profile">
      <div className="flex flex-col items-center gap-3 border-b border-slate-100 pb-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-xl font-semibold text-brand-600">
          {user?.fullName?.charAt(0) ?? 'U'}
        </div>
        <div className="text-center">
          <p className="font-semibold text-ink-900">{user?.fullName ?? 'Guest User'}</p>
          <p className="text-sm text-slate-400">{user?.phoneNumber}</p>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-slate-100 pt-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              className="flex items-center gap-3 py-3.5 text-left text-sm font-medium text-slate-600 hover:text-ink-900"
            >
              <Icon className="h-4 w-4 text-slate-400" />
              <span className="flex-1">{item.label}</span>
              <ChevronRight className="h-4 w-4 text-slate-300" />
            </button>
          );
        })}
        <button
          onClick={logout}
          className="flex items-center gap-3 py-3.5 text-left text-sm font-medium text-danger-500 hover:text-danger-600"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </Drawer>
  );
}
