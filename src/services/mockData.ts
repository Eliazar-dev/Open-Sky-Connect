import dayjs from 'dayjs';
import type {
  ActiveSubscription,
  AppNotification,
  ConnectedDevice,
  Customer,
  DashboardStats,
  Payment,
  Plan,
  Router,
  User,
} from '@/types';

// ---------------------------------------------------------------------------
// Seed data mirroring the reference designs. All "services/*Service.ts" files
// read from here and simulate network latency, so swapping to the real
// Django REST Framework API later only means replacing these functions'
// bodies with real axios calls.
// ---------------------------------------------------------------------------

export const mockUser: User = {
  id: 'usr_1',
  fullName: 'Eliazar Ouko',
  phoneNumber: '+254712345678',
  createdAt: dayjs().subtract(4, 'month').toISOString(),
};

export const mockPlans: Plan[] = [
  {
    id: 'plan_1h',
    name: '1 Hour',
    durationLabel: '1 Hour',
    durationMs: 60 * 60 * 1000,
    speedLabel: 'Up to 5 Mbps',
    price: 50,
    status: 'active',
  },
  {
    id: 'plan_1d',
    name: '1 Day',
    durationLabel: '24 Hours',
    durationMs: 24 * 60 * 60 * 1000,
    speedLabel: 'Up to 10 Mbps',
    price: 150,
    status: 'active',
    isPopular: true,
  },
  {
    id: 'plan_3d',
    name: '3 Days',
    durationLabel: '72 Hours',
    durationMs: 3 * 24 * 60 * 60 * 1000,
    speedLabel: 'Up to 15 Mbps',
    price: 350,
    status: 'active',
  },
  {
    id: 'plan_7d',
    name: '7 Days',
    durationLabel: '7 Days',
    durationMs: 7 * 24 * 60 * 60 * 1000,
    speedLabel: 'Up to 20 Mbps',
    price: 700,
    status: 'active',
  },
  {
    id: 'plan_30d',
    name: '30 Days',
    durationLabel: '30 Days',
    durationMs: 30 * 24 * 60 * 60 * 1000,
    speedLabel: 'Up to 30 Mbps',
    price: 1200,
    status: 'active',
  },
];

export const mockActiveSubscription: ActiveSubscription = {
  plan: mockPlans[1],
  status: 'active',
  startedAt: dayjs().subtract(5, 'hour').toISOString(),
  expiresAt: dayjs().add(18, 'hour').add(42, 'minute').toISOString(),
  dataUsedGb: 3.6,
  dataCapGb: null,
  balance: 0,
};

export const mockPaymentHistory: Payment[] = [
  {
    id: 'pay_1',
    customerName: mockUser.fullName,
    customerPhone: mockUser.phoneNumber,
    planName: '1 Day Unlimited',
    amount: 150,
    method: 'M-Pesa',
    status: 'success',
    date: dayjs().subtract(1, 'day').hour(10).minute(30).toISOString(),
    transactionId: 'MPESA-ABC123XY1Z',
  },
  {
    id: 'pay_2',
    customerName: mockUser.fullName,
    customerPhone: mockUser.phoneNumber,
    planName: '3 Days',
    amount: 350,
    method: 'M-Pesa',
    status: 'success',
    date: dayjs().subtract(8, 'day').hour(9).minute(15).toISOString(),
    transactionId: 'MPESA-QWE456RT2Y',
  },
  {
    id: 'pay_3',
    customerName: mockUser.fullName,
    customerPhone: mockUser.phoneNumber,
    planName: '1 Hour',
    amount: 50,
    method: 'M-Pesa',
    status: 'success',
    date: dayjs().subtract(13, 'day').hour(8).minute(20).toISOString(),
    transactionId: 'MPESA-ZXC789UI3O',
  },
  {
    id: 'pay_4',
    customerName: mockUser.fullName,
    customerPhone: mockUser.phoneNumber,
    planName: '7 Days',
    amount: 700,
    method: 'M-Pesa',
    status: 'success',
    date: dayjs().subtract(18, 'day').hour(11).minute(5).toISOString(),
    transactionId: 'MPESA-LKJ321HG4T',
  },
];

export const mockDevices: ConnectedDevice[] = [
  {
    id: 'dev_1',
    name: 'Redmi Note 14',
    type: 'phone',
    status: 'connected',
    lastSeenAt: dayjs().toISOString(),
    isThisDevice: true,
    macAddress: 'A4:5E:60:1C:2B:3D',
  },
  {
    id: 'dev_2',
    name: 'HP Laptop',
    type: 'laptop',
    status: 'connected',
    lastSeenAt: dayjs().subtract(5, 'minute').toISOString(),
    macAddress: 'C8:3D:97:5A:8E:11',
  },
  {
    id: 'dev_3',
    name: 'iPhone 13',
    type: 'phone',
    status: 'disconnected',
    lastSeenAt: dayjs().subtract(2, 'day').toISOString(),
    macAddress: 'F0:18:98:2D:4C:6A',
  },
];

export const mockNotifications: AppNotification[] = [
  {
    id: 'ntf_1',
    title: 'Payment successful',
    message: 'Payment of KSh 150 successful.',
    type: 'payment',
    isRead: false,
    createdAt: dayjs().subtract(2, 'minute').toISOString(),
  },
  {
    id: 'ntf_2',
    title: 'Plan expiring soon',
    message: 'Your plan will expire in 1 hour.',
    type: 'plan',
    isRead: false,
    createdAt: dayjs().subtract(30, 'minute').toISOString(),
  },
  {
    id: 'ntf_3',
    title: 'New plan available',
    message: 'New 30-Day plan available.',
    type: 'promo',
    isRead: true,
    createdAt: dayjs().subtract(1, 'hour').toISOString(),
  },
];

// ---------------------------------------------------------------------------
// Admin mock data
// ---------------------------------------------------------------------------

export const mockCustomers: Customer[] = [
  {
    id: 'cus_1',
    fullName: 'Eliazar Ouko',
    phoneNumber: '0723 456 678',
    status: 'active',
    lastActiveAt: dayjs().toISOString(),
    joinedAt: dayjs().subtract(4, 'month').toISOString(),
    totalSpent: 4200,
  },
  {
    id: 'cus_2',
    fullName: 'Mary Achieng',
    phoneNumber: '0712 345 987',
    status: 'active',
    lastActiveAt: dayjs().subtract(5, 'minute').toISOString(),
    joinedAt: dayjs().subtract(2, 'month').toISOString(),
    totalSpent: 2100,
  },
  {
    id: 'cus_3',
    fullName: 'John Kamau',
    phoneNumber: '0705 678 432',
    status: 'active',
    lastActiveAt: dayjs().subtract(15, 'minute').toISOString(),
    joinedAt: dayjs().subtract(6, 'month').toISOString(),
    totalSpent: 6800,
  },
  {
    id: 'cus_4',
    fullName: 'Grace Wanjiru',
    phoneNumber: '0708 111 222',
    status: 'inactive',
    lastActiveAt: dayjs().subtract(2, 'day').toISOString(),
    joinedAt: dayjs().subtract(1, 'month').toISOString(),
    totalSpent: 350,
  },
  {
    id: 'cus_5',
    fullName: 'Brian Otieno',
    phoneNumber: '0733 222 111',
    status: 'active',
    lastActiveAt: dayjs().subtract(1, 'hour').toISOString(),
    joinedAt: dayjs().subtract(3, 'month').toISOString(),
    totalSpent: 1500,
  },
  {
    id: 'cus_6',
    fullName: 'Faith Njeri',
    phoneNumber: '0799 888 777',
    status: 'active',
    lastActiveAt: dayjs().subtract(3, 'hour').toISOString(),
    joinedAt: dayjs().subtract(2, 'week').toISOString(),
    totalSpent: 700,
  },
];

export const mockPayments: Payment[] = [
  {
    id: 'apay_1',
    customerName: 'Eliazar Ouko',
    customerPhone: '0723 456 678',
    planName: '1 Day',
    amount: 150,
    method: 'M-Pesa',
    status: 'success',
    date: dayjs().subtract(1, 'day').hour(10).minute(30).toISOString(),
    transactionId: 'MPESA-9F2K1L0Q',
  },
  {
    id: 'apay_2',
    customerName: 'Mary Achieng',
    customerPhone: '0712 345 987',
    planName: '3 Days',
    amount: 350,
    method: 'M-Pesa',
    status: 'success',
    date: dayjs().subtract(3, 'day').hour(8).minute(16).toISOString(),
    transactionId: 'MPESA-7H3J2K1P',
  },
  {
    id: 'apay_3',
    customerName: 'John Kamau',
    customerPhone: '0705 678 432',
    planName: '1 Hour',
    amount: 50,
    method: 'M-Pesa',
    status: 'success',
    date: dayjs().subtract(5, 'day').hour(8).minute(26).toISOString(),
    transactionId: 'MPESA-4D8F9G2H',
  },
  {
    id: 'apay_4',
    customerName: 'Grace Wanjiru',
    customerPhone: '0708 111 222',
    planName: '7 Days',
    amount: 700,
    method: 'M-Pesa',
    status: 'success',
    date: dayjs().subtract(10, 'day').hour(11).minute(59).toISOString(),
    transactionId: 'MPESA-1A2S3D4F',
  },
  {
    id: 'apay_5',
    customerName: 'Brian Otieno',
    customerPhone: '0733 222 111',
    planName: '1 Day',
    amount: 150,
    method: 'M-Pesa',
    status: 'pending',
    date: dayjs().subtract(2, 'hour').toISOString(),
    transactionId: 'MPESA-5G6H7J8K',
  },
  {
    id: 'apay_6',
    customerName: 'Faith Njeri',
    customerPhone: '0799 888 777',
    planName: '1 Hour',
    amount: 50,
    method: 'M-Pesa',
    status: 'failed',
    date: dayjs().subtract(6, 'hour').toISOString(),
    transactionId: 'MPESA-9K8J7H6G',
  },
];

export const mockRouters: Router[] = [
  {
    id: 'rtr_1',
    name: 'Main Office Router',
    location: 'Main Office',
    status: 'online',
    connectedUsers: 12,
    ipAddress: '192.168.88.1',
    model: 'MikroTik hAP ac2',
    lastSeenAt: dayjs().toISOString(),
  },
  {
    id: 'rtr_2',
    name: 'Hostel Router 1',
    location: 'Hostel',
    status: 'online',
    connectedUsers: 25,
    ipAddress: '192.168.89.1',
    model: 'MikroTik RB951Ui-2HnD',
    lastSeenAt: dayjs().toISOString(),
  },
  {
    id: 'rtr_3',
    name: 'Hostel Router 2',
    location: 'Hostel',
    status: 'offline',
    connectedUsers: 0,
    ipAddress: '192.168.90.1',
    model: 'MikroTik RB951Ui-2HnD',
    lastSeenAt: dayjs().subtract(3, 'hour').toISOString(),
  },
  {
    id: 'rtr_4',
    name: 'Apartment Router',
    location: 'Apartments',
    status: 'online',
    connectedUsers: 8,
    ipAddress: '192.168.91.1',
    model: 'MikroTik hAP lite',
    lastSeenAt: dayjs().toISOString(),
  },
];

export const mockDashboardStats: DashboardStats = {
  totalCustomers: 1248,
  activeUsers: 312,
  revenueThisMonth: 245860,
  revenueChangePct: 12,
  todayRevenue: 14450,
  todayRevenueChangePct: 8,
  revenueOverview: [
    { label: '16 Jul', revenue: 18000 },
    { label: '17 Jul', revenue: 22000 },
    { label: '18 Jul', revenue: 19500 },
    { label: '19 Jul', revenue: 27000 },
    { label: '20 Jul', revenue: 31000 },
    { label: '21 Jul', revenue: 26500 },
    { label: '22 Jul', revenue: 29800 },
  ],
};
