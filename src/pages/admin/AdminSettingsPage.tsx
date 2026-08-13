import {
  Building2,
  Smartphone,
  Users,
  ShieldCheck,
  DatabaseBackup,
  ScrollText,
  ChevronRight,
} from 'lucide-react';
import { Card } from '@/components/ui';

const settingsItems = [
  { key: 'company', label: 'Company Settings', icon: Building2 },
  { key: 'mpesa', label: 'M-Pesa Settings', icon: Smartphone },
  { key: 'users', label: 'System Users', icon: Users },
  { key: 'roles', label: 'Roles & Permissions', icon: ShieldCheck },
  { key: 'backup', label: 'Backup & Restore', icon: DatabaseBackup },
  { key: 'logs', label: 'Activity Logs', icon: ScrollText },
];

export function AdminSettingsPage() {
  return (
    <Card padding="none" className="max-w-xl divide-y divide-slate-100">
      {settingsItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.key}
            className="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-slate-50"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Icon className="h-4 w-4" />
            </span>
            <span className="flex-1 text-sm font-medium text-ink-900">{item.label}</span>
            <ChevronRight className="h-4 w-4 text-slate-300" />
          </button>
        );
      })}
    </Card>
  );
}
