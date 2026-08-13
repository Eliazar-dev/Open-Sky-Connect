import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardTopBar } from '@/features/dashboard/DashboardTopBar';
import { ActivePlanCard } from '@/features/dashboard/ActivePlanCard';
import { QuickActions } from '@/features/dashboard/QuickActions';
import { DevicesSummaryCard } from '@/features/dashboard/DevicesSummaryCard';
import { BottomNav, type BottomNavTab } from '@/features/dashboard/BottomNav';
import { PaymentHistoryDrawer } from '@/features/paymentHistory/PaymentHistoryDrawer';
import { ProfileDrawer } from '@/features/profile/ProfileDrawer';
import { SupportBottomSheet } from '@/features/support/SupportBottomSheet';
import { NotificationsPopup } from '@/features/notifications/NotificationsPopup';
import { DevicesModal } from '@/features/devices/DevicesModal';
import { useActiveSubscription } from '@/hooks/usePlans';
import { useMyDevices, useNotifications } from '@/hooks/useCustomerData';
import { useAuthContext } from '@/contexts/AuthContext';
import { CUSTOMER_ROUTES } from '@/constants/routes';

type Overlay = 'payment-history' | 'profile' | 'support' | 'notifications' | 'devices' | null;

export function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [activeTab, setActiveTab] = useState<BottomNavTab>('home');

  const { data: subscription, isLoading: isSubLoading } = useActiveSubscription();
  const { data: devices } = useMyDevices();
  const { data: notifications } = useNotifications();
  const unreadCount = notifications?.filter((n) => !n.isRead).length ?? 0;

  const handleTabChange = (tab: BottomNavTab) => {
    setActiveTab(tab);
    if (tab === 'buy') return navigate(CUSTOMER_ROUTES.BUY_INTERNET);
    if (tab === 'history') return setOverlay('payment-history');
    if (tab === 'support') return setOverlay('support');
    if (tab === 'profile') return setOverlay('profile');
    setOverlay(null);
  };

  return (
    <div className="min-h-screen bg-surface pb-24 sm:pb-10">
      <DashboardTopBar unreadCount={unreadCount} onNotificationsClick={() => setOverlay('notifications')} />

      <div className="mx-auto flex max-w-md flex-col gap-5 px-4 pt-2 sm:px-6">
        <div>
          <h1 className="text-xl font-bold text-ink-900">
            Hello, {user?.fullName?.split(' ')[0] ?? 'there'} 👋
          </h1>
        </div>

        <ActivePlanCard subscription={subscription} isLoading={isSubLoading} />

        <QuickActions
          onBuyInternet={() => navigate(CUSTOMER_ROUTES.BUY_INTERNET)}
          onPaymentHistory={() => setOverlay('payment-history')}
          onSupport={() => setOverlay('support')}
          onProfile={() => setOverlay('profile')}
        />

        <DevicesSummaryCard devices={devices} onViewAll={() => setOverlay('devices')} />
      </div>

      <BottomNav active={activeTab} onChange={handleTabChange} />

      <PaymentHistoryDrawer isOpen={overlay === 'payment-history'} onClose={() => setOverlay(null)} />
      <ProfileDrawer isOpen={overlay === 'profile'} onClose={() => setOverlay(null)} />
      <SupportBottomSheet isOpen={overlay === 'support'} onClose={() => setOverlay(null)} />
      <NotificationsPopup isOpen={overlay === 'notifications'} onClose={() => setOverlay(null)} />
      <DevicesModal isOpen={overlay === 'devices'} onClose={() => setOverlay(null)} />
    </div>
  );
}
