export const CUSTOMER_ROUTES = {
  AUTH: '/',
  DASHBOARD: '/dashboard',
  BUY_INTERNET: '/buy-internet',
} as const;

export const ADMIN_ROUTES = {
  ROOT: '/admin',
  DASHBOARD: '/admin/dashboard',
  CUSTOMERS: '/admin/customers',
  PLANS: '/admin/plans',
  PAYMENTS: '/admin/payments',
  ROUTERS: '/admin/routers',
  REPORTS: '/admin/reports',
  SETTINGS: '/admin/settings',
} as const;

export const SUPPORT_CONTACT = {
  whatsapp: '254712345678',
  phone: '+254712345678',
} as const;
