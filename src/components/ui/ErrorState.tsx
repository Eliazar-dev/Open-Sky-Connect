import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'We couldn\u2019t load this data. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-danger-50 text-danger-500">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm font-semibold text-ink-900">{title}</p>
        <p className="mt-1 text-sm text-slate-500 max-w-xs">{description}</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} leftIcon={<RefreshCw className="h-3.5 w-3.5" />}>
          Retry
        </Button>
      )}
    </div>
  );
}

/** Full-page variant for route-level errors (e.g. React Router errorElement). */
export function ErrorPage({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm rounded-card bg-white p-8 shadow-card">
        <ErrorState
          title="Page failed to load"
          description="An unexpected error occurred. Please refresh or try again."
          onRetry={onRetry ?? (() => window.location.reload())}
        />
      </div>
    </div>
  );
}
