import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wifi } from 'lucide-react';
import { toast } from 'sonner';
import { Button, Input, PhoneInput } from '@/components/ui';
import { useLogin } from '@/hooks/useAuth';
import { useAuthContext } from '@/contexts/AuthContext';
import { formatPhoneDisplay } from '@/utils/format';

// TODO: Ensure Django backend enforces these validation rules:
// - phoneNumber: Exactly 9 digits (Kenyan format without country code)
// - password: Minimum 4 characters (adjust based on Django password requirements)
const loginSchema = z.object({
  phoneNumber: z.string().min(9, 'Enter a valid phone number').max(9, 'Enter a valid phone number'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onForgotPassword: () => void;
}

export function LoginForm({ onForgotPassword }: LoginFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const { login: setSession } = useAuthContext();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: true },
  });

  const onSubmit = (values: LoginFormValues) => {
    setServerError(null);
    loginMutation.mutate(
      { ...values, phoneNumber: formatPhoneDisplay(values.phoneNumber) },
      {
        onSuccess: (res) => {
          setSession(res.user, res.accessToken);
          toast.success(`Welcome back, ${res.user.fullName.split(' ')[0]}!`);
        },
        onError: (err) => setServerError(err instanceof Error ? err.message : 'Login failed'),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <PhoneInput label="Phone Number" error={errors.phoneNumber?.message} {...register('phoneNumber')} />
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register('password')}
      />

      <div className="flex items-center justify-between -mt-1">
        <label className="flex items-center gap-2 text-sm text-slate-500">
          <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-brand-500 focus:ring-brand-400" {...register('rememberMe')} />
          Remember Me
        </label>
        <button type="button" onClick={onForgotPassword} className="text-sm font-medium text-brand-600 hover:text-brand-700">
          Forgot Password?
        </button>
      </div>

      {serverError && <p className="text-sm text-danger-500 text-center">{serverError}</p>}

      <Button type="submit" fullWidth size="lg" isLoading={loginMutation.isPending} leftIcon={<Wifi className="h-4 w-4" />}>
        Connect Now
      </Button>

      <p className="text-center text-xs text-slate-400">
        By clicking "Connect Now" you agree to our{' '}
        <a href="#" className="text-brand-600 hover:underline">Terms of Service</a> &{' '}
        <a href="#" className="text-brand-600 hover:underline">Data Privacy Policy</a>.
      </p>
    </form>
  );
}
