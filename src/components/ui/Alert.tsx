import type { ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/utils/cn';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}

const config: Record<AlertVariant, { icon: ReactNode; classes: string }> = {
  success: { icon: <CheckCircle2 className="h-5 w-5" />, classes: 'bg-success-50 text-success-600' },
  error: { icon: <AlertCircle className="h-5 w-5" />, classes: 'bg-danger-50 text-danger-600' },
  warning: { icon: <AlertTriangle className="h-5 w-5" />, classes: 'bg-warning-50 text-warning-500' },
  info: { icon: <Info className="h-5 w-5" />, classes: 'bg-brand-50 text-brand-700' },
};

export function Alert({ variant = 'info', title, children, className }: AlertProps) {
  const { icon, classes } = config[variant];
  return (
    <div className={cn('flex items-start gap-3 rounded-xl px-4 py-3', classes, className)}>
      <span className="flex-shrink-0 mt-0.5">{icon}</span>
      <div className="text-sm">
        {title && <p className="font-medium mb-0.5">{title}</p>}
        <div className="opacity-90">{children}</div>
      </div>
    </div>
  );
}
