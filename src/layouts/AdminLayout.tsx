import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminNavbar } from '@/components/layout/AdminNavbar';
import { AdminMobileDrawer } from '@/components/layout/AdminMobileDrawer';
import { ADMIN_ROUTES } from '@/constants/routes';

const titleByPath: Record<string, string> = {
  [ADMIN_ROUTES.DASHBOARD]: 'Dashboard',
  [ADMIN_ROUTES.CUSTOMERS]: 'Customers',
  [ADMIN_ROUTES.PLANS]: 'Internet Plans',
  [ADMIN_ROUTES.PAYMENTS]: 'Payments',
  [ADMIN_ROUTES.ROUTERS]: 'Routers',
  [ADMIN_ROUTES.REPORTS]: 'Reports',
  [ADMIN_ROUTES.SETTINGS]: 'Settings',
};

export function AdminLayout() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();
  const title = titleByPath[location.pathname] ?? 'Admin';

  return (
    <div className="flex h-screen bg-surface">
      <AdminSidebar />
      <AdminMobileDrawer isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminNavbar title={title} onMenuClick={() => setIsMobileNavOpen(true)} />
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
