import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { AdminUser } from '@/types';

interface AdminAuthContextValue {
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  setAdminSession: (adminUser: AdminUser, accessToken: string) => void;
  adminLogout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'osc_admin_user';
const TOKEN_KEY = 'osc_admin_access_token';

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AdminUser) : null;
  });

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [adminUser]);

  const setAdminSession = (nextAdminUser: AdminUser, accessToken: string) => {
    localStorage.setItem(TOKEN_KEY, accessToken);
    setAdminUser(nextAdminUser);
  };

  const adminLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('osc_admin_refresh_token');
    setAdminUser(null);
  };

  const value = useMemo(
    () => ({ adminUser, isAdminAuthenticated: !!adminUser, setAdminSession, adminLogout }),
    [adminUser]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuthContext() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuthContext must be used within AdminAuthProvider');
  return ctx;
}
