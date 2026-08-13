import { useRef, type ClipboardEvent, type KeyboardEvent } from 'react';
import { cn } from '@/utils/cn';

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

/** Six boxed digit inputs that behave like a single OTP field: auto-advance, backspace-back, paste support. */
export function OtpInput({ length = 6, value, onChange, error, disabled }: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? '');

  const setDigit = (index: number, digit: string) => {
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join(''));
  };

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, '').slice(-1);
    setDigit(index, digit);
    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) inputsRef.current[index - 1]?.focus();
    if (e.key === 'ArrowRight' && index < length - 1) inputsRef.current[index + 1]?.focus();
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange(pasted.padEnd(0, ''));
    onChange(pasted);
    const lastIndex = Math.min(pasted.length, length) - 1;
    if (lastIndex >= 0) inputsRef.current[lastIndex]?.focus();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center gap-2.5">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            value={digit}
            disabled={disabled}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            inputMode="numeric"
            maxLength={1}
            aria-label={`Digit ${index + 1}`}
            className={cn(
              'h-12 w-11 rounded-xl border border-slate-200 bg-white text-center text-lg font-semibold text-ink-900',
              'focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400',
              'disabled:bg-slate-50',
              error && 'border-danger-500'
            )}
          />
        ))}
      </div>
      {error && <p className="text-center text-xs text-danger-500">{error}</p>}
    </div>
  );
}
