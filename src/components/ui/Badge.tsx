import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export type BadgeVariant = 'success' | 'danger' | 'warning' | 'brand' | 'neutral';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-success-50 text-success-600',
  danger: 'bg-danger-50 text-danger-600',
  warning: 'bg-warning-50 text-warning-500',
  brand: 'bg-brand-50 text-brand-700',
  neutral: 'bg-slate-100 text-slate-600',
};

const dotClasses: Record<BadgeVariant, string> = {
  success: 'bg-success-500',
  danger: 'bg-danger-500',
  warning: 'bg-warning-500',
  brand: 'bg-brand-500',
  neutral: 'bg-slate-400',
};

export function Badge({ className, variant = 'neutral', dot = false, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', dotClasses[variant])} />}
      {children}
    </span>
  );
}

/** Maps common domain statuses to a sensible badge variant. */
export function statusToVariant(status: string): BadgeVariant {
  const s = status.toLowerCase();
  if (['active', 'success', 'online', 'connected'].includes(s)) return 'success';
  if (['inactive', 'failed', 'offline', 'disconnected'].includes(s)) return 'danger';
  if (['pending'].includes(s)) return 'warning';
  return 'neutral';
}
