// ---------------------------------------------------------------------------
// Domain types shared across the customer portal and the admin dashboard.
// These mirror the shape the Django REST Framework backend is expected to
// return. Keeping them centralized means services/components/hooks all
// agree on one contract, and swapping mocks for real API calls later only
// touches the `services/` layer.
// ---------------------------------------------------------------------------

export type ID = string;

export type AccountStatus = 'active' | 'inactive';
export type PaymentStatus = 'success' | 'pending' | 'failed';
export type PlanStatus = 'active' | 'inactive';
export type RouterStatus = 'online' | 'offline';
export type ConnectionStatus = 'connected' | 'disconnected';

export interface User {
  id: ID;
  fullName: string;
  phoneNumber: string;
  email?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Customer {
  id: ID;
  fullName: string;
  phoneNumber: string;
  status: AccountStatus;
  lastActiveAt: string;
  joinedAt: string;
  totalSpent: number;
}

export interface Plan {
  id: ID;
  name: string;
  durationLabel: string;
  durationMs: number;
  speedLabel: string;
  price: number;
  status: PlanStatus;
  description?: string;
  isPopular?: boolean;
}

export interface ActiveSubscription {
  plan: Plan;
  status: 'active' | 'expired';
  startedAt: string;
  expiresAt: string;
  dataUsedGb: number;
  dataCapGb: number | null; // null = unlimited
  balance: number;
}

export interface Payment {
  id: ID;
  customerName: string;
  customerPhone: string;
  planName: string;
  amount: number;
  method: 'M-Pesa' | 'Card' | 'Cash';
  status: PaymentStatus;
  date: string;
  transactionId: string;
}

export interface Router {
  id: ID;
  name: string;
  location: string;
  status: RouterStatus;
  connectedUsers: number;
  ipAddress: string;
  model?: string;
  lastSeenAt: string;
}

export interface ConnectedDevice {
  id: ID;
  name: string;
  type: 'phone' | 'laptop' | 'tablet' | 'other';
  status: ConnectionStatus;
  lastSeenAt: string;
  isThisDevice?: boolean;
  macAddress: string;
}

export interface AppNotification {
  id: ID;
  title: string;
  message: string;
  type: 'payment' | 'plan' | 'system' | 'promo';
  isRead: boolean;
  createdAt: string;
}

export interface Receipt {
  id: ID;
  planName: string;
  amount: number;
  date: string;
  transactionId: string;
  phoneNumber: string;
}

export interface RevenuePoint {
  label: string;
  revenue: number;
}

export interface DashboardStats {
  totalCustomers: number;
  activeUsers: number;
  revenueThisMonth: number;
  revenueChangePct: number;
  todayRevenue: number;
  todayRevenueChangePct: number;
  revenueOverview: RevenuePoint[];
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export interface LoginPayload {
  phoneNumber: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterPayload {
  fullName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface VerifyOtpPayload {
  phoneNumber: string;
  code: string;
}

// ---------------------------------------------------------------------------
// Admin Auth (email-based, passwordless token authentication)
// ---------------------------------------------------------------------------

export interface AdminUser {
  name: string;
  email: string;
  loginTime?: string;
}

export interface AdminRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AdminRegisterResponse {
  message: string;
  email: string;
}

export interface AdminVerifyEmailPayload {
  email: string;
  token: string;
}

export interface AdminVerifyEmailResponse {
  message: string;
  email: string;
}

export interface AdminLoginRequestPayload {
  email: string;
}

export interface AdminLoginRequestResponse {
  message: string;
}

export interface AdminVerifyTokenPayload {
  email: string;
  token: string;
}

export interface AdminVerifyTokenResponse {
  message: string;
  email: string;
  name: string;
  login_time: string;
  access_token: string;
  refresh_token: string;
}

export interface AdminForgotPasswordPayload {
  email: string;
}

export interface AdminResetPasswordPayload {
  email: string;
  token: string;
  new_password: string;
  confirm_password: string;
}

// ---------------------------------------------------------------------------
// Buy Internet flow
// ---------------------------------------------------------------------------

export type BuyFlowStep = 'choose-plan' | 'confirm' | 'awaiting-payment' | 'success' | 'failed';

export interface InitiatePaymentPayload {
  planId: ID;
  phoneNumber: string;
}

export interface InitiatePaymentResponse {
  checkoutRequestId: string;
  message: string;
}

// ---------------------------------------------------------------------------
// Generic API envelope + paginated list helper
// ---------------------------------------------------------------------------

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  message: string;
  code?: string;
  fieldErrors?: Record<string, string>;
}
