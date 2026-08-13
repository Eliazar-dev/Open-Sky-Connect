import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserPlus } from 'lucide-react';
import { Button, Input, PhoneInput } from '@/components/ui';
import { useRegister } from '@/hooks/useAuth';
import { formatPhoneDisplay } from '@/utils/format';

// TODO: Ensure Django backend enforces these validation rules:
// - fullName: Minimum 2 characters
// - phoneNumber: Exactly 9 digits (Kenyan format without country code)
// - password: Minimum 6 characters (adjust based on Django password requirements)
// - confirmPassword: Must match password
const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Enter your full name'),
    phoneNumber: z.string().min(9, 'Enter a valid phone number').max(9, 'Enter a valid phone number'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onRegistered: (phoneNumber: string) => void;
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onRegistered, onSwitchToLogin }: RegisterFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (values: RegisterFormValues) => {
    setServerError(null);
    const phoneNumber = formatPhoneDisplay(values.phoneNumber);
    registerMutation.mutate(
      { ...values, phoneNumber },
      {
        onSuccess: () => onRegistered(phoneNumber),
        onError: (err) => setServerError(err instanceof Error ? err.message : 'Registration failed'),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input label="Full Name" placeholder="Jane Doe" error={errors.fullName?.message} {...register('fullName')} />
      <PhoneInput label="Phone Number" error={errors.phoneNumber?.message} {...register('phoneNumber')} />
      <Input
        label="Password"
        type="password"
        placeholder="Create a password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Re-enter your password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      {serverError && <p className="text-sm text-danger-500 text-center">{serverError}</p>}

      <Button type="submit" fullWidth size="lg" isLoading={registerMutation.isPending} leftIcon={<UserPlus className="h-4 w-4" />}>
        Register
      </Button>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{' '}
        <button type="button" onClick={onSwitchToLogin} className="font-medium text-brand-600 hover:underline">
          Login
        </button>
      </p>
    </form>
  );
}
