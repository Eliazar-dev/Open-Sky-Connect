import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { KeyRound } from 'lucide-react';
import { Button, Modal, PhoneInput } from '@/components/ui';
import { useRequestPasswordReset } from '@/hooks/useAuth';
import { formatPhoneDisplay } from '@/utils/format';

// TODO: Ensure Django backend enforces these validation rules:
// - phoneNumber: Exactly 9 digits (Kenyan format without country code)
const schema = z.object({
  phoneNumber: z.string().min(9, 'Enter a valid phone number').max(9, 'Enter a valid phone number'),
});
type FormValues = z.infer<typeof schema>;

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [sent, setSent] = useState(false);
  const resetMutation = useRequestPasswordReset();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const handleClose = () => {
    reset();
    setSent(false);
    onClose();
  };

  const onSubmit = (values: FormValues) => {
    resetMutation.mutate(formatPhoneDisplay(values.phoneNumber), {
      onSuccess: () => {
        setSent(true);
        toast.success('Reset instructions sent via SMS');
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Forgot Password">
      {sent ? (
        <div className="flex flex-col items-center gap-3 py-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-50 text-success-600">
            <KeyRound className="h-6 w-6" />
          </div>
          <p className="text-sm text-slate-600">
            We've sent password reset instructions via SMS. Follow the link to set a new password.
          </p>
          <Button fullWidth onClick={handleClose}>
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <p className="text-sm text-slate-500">
            Enter the phone number linked to your account and we'll send you instructions to reset your password.
          </p>
          <PhoneInput label="Phone Number" error={errors.phoneNumber?.message} {...register('phoneNumber')} />
          <Button type="submit" fullWidth isLoading={resetMutation.isPending}>
            Send Reset Instructions
          </Button>
        </form>
      )}
    </Modal>
  );
}
