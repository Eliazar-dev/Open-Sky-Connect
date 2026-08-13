import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, OtpInput } from '@/components/ui';
import { useResendOtp, useVerifyOtp } from '@/hooks/useAuth';
import { useAuthContext } from '@/contexts/AuthContext';
import { maskPhone } from '@/utils/format';

interface OtpOverlayProps {
  isOpen: boolean;
  phoneNumber: string;
  onBack: () => void;
  onChangeNumber: () => void;
}

const RESEND_SECONDS = 45;

/**
 * Full-screen darkened overlay shown after successful registration.
 * Deliberately NOT a route change \u2014 it renders on top of the Auth page,
 * per the "no redirect" requirement in the brief.
 */
export function OtpOverlay({ isOpen, phoneNumber, onBack, onChangeNumber }: OtpOverlayProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const { login: setSession } = useAuthContext();
  const verifyMutation = useVerifyOtp();
  const resendMutation = useResendOtp();

  useEffect(() => {
    if (!isOpen) return;
    setSecondsLeft(RESEND_SECONDS);
    setCode('');
    setError(undefined);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [isOpen, secondsLeft]);

  const handleVerify = () => {
    setError(undefined);
    verifyMutation.mutate(
      { phoneNumber, code },
      {
        onSuccess: (res) => {
          setSession(res.user, res.accessToken);
          toast.success('Phone verified! Welcome to OpenSky Connect.');
        },
        onError: (err) => setError(err instanceof Error ? err.message : 'Verification failed'),
      }
    );
  };

  const handleResend = () => {
    resendMutation.mutate(phoneNumber, {
      onSuccess: () => {
        setSecondsLeft(RESEND_SECONDS);
        toast.success('A new code has been sent via SMS.');
      },
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex items-center justify-center bg-ink-900/70 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-sm rounded-card bg-white p-6 shadow-float text-center"
          >
            <h2 className="text-lg font-semibold text-ink-900">Verify Your Phone</h2>
            <p className="mt-1.5 text-sm text-slate-500">
              We have sent a 6-digit code to <span className="font-medium text-slate-700">{maskPhone(phoneNumber)}</span>
            </p>

            <div className="mt-6">
              <OtpInput value={code} onChange={setCode} error={error} disabled={verifyMutation.isPending} />
            </div>

            <p className="mt-5 text-sm text-slate-400">
              {secondsLeft > 0 ? (
                `Resend OTP in ${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(secondsLeft % 60).padStart(2, '0')}`
              ) : (
                <>
                  Didn't receive code?{' '}
                  <button
                    onClick={handleResend}
                    disabled={resendMutation.isPending}
                    className="font-medium text-brand-600 hover:underline"
                  >
                    Resend OTP
                  </button>
                </>
              )}
            </p>

            <Button
              fullWidth
              size="lg"
              className="mt-5"
              disabled={code.length < 6}
              isLoading={verifyMutation.isPending}
              onClick={handleVerify}
            >
              Verify OTP
            </Button>

            <div className="mt-3 flex items-center justify-center gap-4 text-sm">
              <button onClick={onBack} className="text-slate-400 hover:text-slate-600">
                Back
              </button>
              <span className="text-slate-200">|</span>
              <button onClick={onChangeNumber} className="text-slate-400 hover:text-slate-600">
                Change Phone Number
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
