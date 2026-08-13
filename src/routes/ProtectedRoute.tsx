import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { CUSTOMER_ROUTES } from '@/constants/routes';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthContext();
  if (!isAuthenticated) {
    return <Navigate to={CUSTOMER_ROUTES.AUTH} replace />;
  }
  return <>{children}</>;
}
