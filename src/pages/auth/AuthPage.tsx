import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Logo, Tabs } from '@/components/ui';
import { LoginForm } from '@/features/auth/LoginForm';
import { RegisterForm } from '@/features/auth/RegisterForm';
import { OtpOverlay } from '@/features/auth/OtpOverlay';
import { ForgotPasswordModal } from '@/features/auth/ForgotPasswordModal';
import { NeedHelpFooter } from '@/features/auth/NeedHelpFooter';
import { useAuthContext } from '@/contexts/AuthContext';
import { CUSTOMER_ROUTES } from '@/constants/routes';

type AuthTab = 'login' | 'register';

export function AuthPage() {
  const { isAuthenticated } = useAuthContext();
  const [tab, setTab] = useState<AuthTab>('login');
  const [otpPhone, setOtpPhone] = useState<string | null>(null);
  const [isForgotOpen, setIsForgotOpen] = useState(false);

  if (isAuthenticated) {
    return <Navigate to={CUSTOMER_ROUTES.DASHBOARD} replace />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-2 mb-8">
          <Logo size={40} showWordmark={false} />
          <div className="text-center">
            <h1 className="text-xl font-bold text-ink-900">OpenSky Connect</h1>
            <p className="mt-1 text-sm text-slate-400">Fast, reliable & affordable internet</p>
          </div>
        </div>

        <div className="rounded-card bg-white p-6 shadow-card">
          <Tabs
            className="mb-6"
            value={tab}
            onChange={(v) => setTab(v as AuthTab)}
            tabs={[
              { label: 'Login', value: 'login' },
              { label: 'Register', value: 'register' },
            ]}
          />

          {tab === 'login' ? (
            <LoginForm onForgotPassword={() => setIsForgotOpen(true)} />
          ) : (
            <RegisterForm onRegistered={(phone) => setOtpPhone(phone)} onSwitchToLogin={() => setTab('login')} />
          )}
        </div>

        <div className="mt-6">
          <NeedHelpFooter />
        </div>
      </div>

      <OtpOverlay
        isOpen={!!otpPhone}
        phoneNumber={otpPhone ?? ''}
        onBack={() => setOtpPhone(null)}
        onChangeNumber={() => {
          setOtpPhone(null);
          setTab('register');
        }}
      />

      <ForgotPasswordModal isOpen={isForgotOpen} onClose={() => setIsForgotOpen(false)} />
    </div>
  );
}
