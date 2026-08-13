import { cn } from '@/utils/cn';

interface TabsProps {
  tabs: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/** Segmented pill tab switcher, matching the Login/Register toggle in the reference design. */
export function Tabs({ tabs, value, onChange, className }: TabsProps) {
  return (
    <div className={cn('flex rounded-xl bg-slate-100 p-1', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            'flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors',
            value === tab.value ? 'bg-brand-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
