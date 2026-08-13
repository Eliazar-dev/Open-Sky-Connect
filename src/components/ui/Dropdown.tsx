import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  size?: 'sm' | 'md';
}

/** Lightweight custom select used for admin table filters (status, date range, month). */
export function Dropdown({ options, value, onChange, className, size = 'sm' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          'flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50',
          size === 'sm' ? 'h-10 px-3' : 'h-11 px-3.5',
          'w-full'
        )}
      >
        <span className="truncate">{selected?.label ?? 'Select'}</span>
        <ChevronDown className={cn('h-4 w-4 flex-shrink-0 text-slate-400 transition-transform', isOpen && 'rotate-180')} />
      </button>
      {isOpen && (
        <div className="absolute right-0 z-20 mt-1.5 w-full min-w-[10rem] overflow-hidden rounded-xl border border-slate-100 bg-white py-1 shadow-float">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className="flex w-full items-center justify-between px-3.5 py-2 text-left text-sm text-slate-600 hover:bg-slate-50"
            >
              {opt.label}
              {opt.value === value && <Check className="h-4 w-4 text-brand-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
