import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface PhoneInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

/**
 * Kenyan phone number field: fixed "+254" country prefix + local number.
 * Matches the reference design's segmented phone input on the auth screens.
 */
export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, containerClassName, label, error, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className={cn('flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <div
          className={cn(
            'flex h-11 items-center rounded-xl border border-slate-200 bg-white overflow-hidden',
            'focus-within:ring-2 focus-within:ring-brand-400 focus-within:border-brand-400',
            error && 'border-danger-500 focus-within:ring-danger-500 focus-within:border-danger-500'
          )}
        >
          <span className="flex h-full items-center gap-1 border-r border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-600 select-none">
            🇰🇪 +254
          </span>
          <input
            ref={ref}
            id={inputId}
            type="tel"
            inputMode="numeric"
            maxLength={9}
            placeholder="712 345 678"
            aria-invalid={!!error}
            className={cn(
              'h-full flex-1 min-w-0 bg-transparent px-3 text-sm text-ink-900 placeholder:text-slate-400',
              'focus:outline-none',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-danger-500">{error}</p>}
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';
