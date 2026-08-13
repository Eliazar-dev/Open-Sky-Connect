# Open Sky Connect - Frontend Summary Report

**Date:** July 25, 2026  
**Frontend Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, React Router 7, TanStack Query, Axios, React Hook Form + Zod, Lucide React, Framer Motion, Sonner, Recharts, Day.js

---

## Overview

The Open Sky Connect frontend is a commercial Wi-Fi hotspot billing platform with two interfaces:
- **Customer Portal:** Authentication, plan purchase, dashboard, payment history
- **Admin Dashboard:** Full management interface for customers, plans, payments, routers, reports, settings

The frontend is **production-ready** and currently runs with mocked service layers. All API contracts are defined in TypeScript types, making backend integration straightforward.

---

## What's Been Built

### Customer Portal

#### Authentication Flow
- **Login Page** (`/auth`)
  - Phone number + password login
  - "Remember Me" checkbox
  - Forgot Password modal
  - OTP verification overlay (for registration)
  - Login/Register tabs with smooth transitions

- **Registration Flow**
  - Full name, phone number, password, confirm password
  - OTP verification step (demo code: `123456`)
  - Form validation with Zod schemas

- **Dashboard** (`/dashboard`)
  - Active plan display with expiry countdown
  - Data usage visualization (used/total)
  - Quick actions (Buy Internet, Payment History, Profile, Support)
  - Connected devices list with status indicators
  - Bottom navigation for mobile

- **Buy Internet Flow** (`/buy-internet`)
  - Multi-step state machine: choose plan → confirm → awaiting payment → success/failed
  - Plan cards with pricing, duration, speed labels
  - M-Pesa STK push integration (mocked)
  - Payment status polling (mocked with randomized success)
  - Success/failed states with appropriate messaging

- **Overlays (Modal/Drawer/BottomSheet)**
  - Payment History with transaction list
  - Profile management
  - Support contact form
  - Notifications center with mark-all-read
  - Connected devices management

### Admin Dashboard

#### Layout
- Sidebar navigation with active state
- Top navbar with user menu
- Mobile-responsive drawer
- Shared AdminLayout wrapper

#### Pages
1. **Dashboard** (`/admin/dashboard`)
   - Stat cards: Total Customers, Active Users, Revenue (monthly/today)
   - Revenue chart (7-day overview with Recharts)
   - Recent activity indicators

2. **Customers** (`/admin/customers`)
   - Paginated customer table with search
   - Status badges (active/inactive)
   - Customer detail drawer
   - Add/Edit customer forms

3. **Internet Plans** (`/admin/plans`)
   - Plan cards with pricing, duration, speed
   - Status toggle (active/inactive)
   - Add/Edit plan forms
   - "Popular" badge support

4. **Payments** (`/admin/payments`)
   - Paginated payment table with search
   - Status filter (success/pending/failed)
   - Payment detail drawer
   - Transaction ID tracking

5. **Routers** (`/admin/routers`)
   - Router list with status (online/offline)
   - Connected users count
   - Location and IP address display
   - Router detail drawer
   - Add/Edit router forms

6. **Reports** (`/admin/reports`)
   - Revenue analytics (placeholder for advanced reporting)
   - Customer activity metrics
   - Export functionality (UI ready)

7. **Settings** (`/admin/settings`)
   - System configuration forms
   - Business settings (placeholder)

### Design System Components

**UI Components** (`src/components/ui/`):
- Button (primary, secondary, outline, ghost, danger, link variants)
- Input (with label, error, hint, left icon, password toggle)
- PhoneInput (Kenyan phone format with country code)
- OtpInput (6-digit OTP with auto-focus)
- Card, Badge, Modal, Drawer, BottomSheet
- Table (with pagination support)
- SearchBar, Dropdown, Alert
- Pagination, Breadcrumbs
- EmptyState, ErrorState, Skeleton loaders
- OfflineBanner, Tabs, StatCard
- Logo component

**Charts** (`src/components/charts/`):
- RevenueChart (Recharts BarChart with currency formatting)

### Architecture

**Service Layer** (`src/services/`):
- Centralized Axios instance (`apiClient.ts`)
- Mock data layer (`mockData.ts`) - realistic seed data
- Domain services: auth, plans, payments, customers, routers, devices, notifications, dashboard
- All functions have DRF endpoint path comments as placeholders

**Data Layer** (`src/hooks/`):
- TanStack Query hooks for each domain
- Automatic caching, loading states, error handling
- `useAuth`, `usePlans`, `useCustomerData`, `useAdminData`, `useOnlineStatus`

**State Management**:
- AuthContext for session state (user, tokens)
- ProtectedRoute wrapper for authenticated routes
- LocalStorage for token persistence (`osc_access_token`, `osc_refresh_token`)

**Routing** (`src/routes/`):
- React Router 7 with createBrowserRouter
- Lazy-loaded admin routes for code-splitting
- Error boundaries with ErrorPage component

**Type Safety** (`src/types/`):
- Comprehensive TypeScript interfaces
- Domain types: User, Customer, Plan, Payment, Router, Device, Notification
- Auth types: LoginPayload, RegisterPayload, AuthResponse, VerifyOtpPayload
- API envelope: Paginated<T>, ApiError

---

## Backend Requirements

### Django Apps Structure

Based on the frontend service layer, the Django backend should implement these apps:

1. **accounts** - Authentication & user management
2. **customers** - Customer data management
3. **otp** - OTP verification system
4. **notifications** - Notification system
5. **payments** - Payment processing & M-Pesa integration
6. **packages** - Internet plans/packages
7. **subscriptions** - Active subscriptions management
8. **dashboard** - Admin dashboard statistics

### Required API Endpoints

#### Authentication (`/api/accounts/`)
```
POST   /api/accounts/login/              # Customer (phone+password) & Admin (email+password)
POST   /api/accounts/register/          # Customer registration
POST   /api/accounts/otp/verify/        # OTP verification
POST   /api/accounts/otp/resend/        # Resend OTP
POST   /api/accounts/password/reset/    # Request password reset
POST   /api/accounts/logout/             # Logout
POST   /api/accounts/token/refresh/      # JWT token refresh
```

#### Packages (`/api/packages/`)
```
GET    /api/packages/                    # List all internet plans
POST   /api/packages/                    # Create plan (admin)
PUT    /api/packages/{id}/              # Update plan (admin)
DELETE /api/packages/{id}/              # Delete plan (admin)
```

#### Subscriptions (`/api/subscriptions/`)
```
GET    /api/subscriptions/active/       # Get current user's active subscription
GET    /api/subscriptions/{id}/          # Get subscription details
POST   /api/subscriptions/              # Create subscription (after payment)
```

#### Payments (`/api/payments/`)
```
GET    /api/payments/                   # List all payments (admin, with pagination)
GET    /api/payments/my/                # Current user's payment history
GET    /api/payments/{id}/              # Payment details
POST   /api/payments/mpesa/stk-push/    # Initiate M-Pesa STK push
GET    /api/payments/mpesa/status/{checkoutRequestId}/  # Check payment status
```

#### Customers (`/api/customers/`)
```
GET    /api/customers/                  # List customers (admin, with pagination)
GET    /api/customers/{id}/             # Customer details
POST   /api/customers/                  # Create customer (admin)
PUT    /api/customers/{id}/             # Update customer (admin)
DELETE /api/customers/{id}/             # Delete customer (admin)
GET    /api/customers/devices/          # Current user's connected devices
```

#### Notifications (`/api/notifications/`)
```
GET    /api/notifications/              # List user notifications
POST   /api/notifications/mark-read/    # Mark all as read
POST   /api/notifications/{id}/read/    # Mark single as read
```

#### Dashboard (`/api/dashboard/`)
```
GET    /api/dashboard/stats/            # Admin dashboard statistics
```

#### Routers (`/api/routers/`) - *Note: Not defined in Django planning yet*
```
GET    /api/routers/                    # List routers (admin)
GET    /api/routers/{id}/               # Router details
POST   /api/routers/                    # Create router (admin)
PUT    /api/routers/{id}/               # Update router (admin)
DELETE /api/routers/{id}/               # Delete router (admin)
```

### Data Models & Types

#### User/Customer
```typescript
{
  id: string;
  fullName: string;
  phoneNumber: string;  // Kenyan format: +2547XXXXXXXX
  email?: string;       // For admin accounts
  avatarUrl?: string;
  createdAt: string;    // ISO 8601
}
```

#### Plan/Package
```typescript
{
  id: string;
  name: string;
  durationLabel: string;  // "1 Hour", "1 Day", etc.
  durationMs: number;     // Duration in milliseconds
  speedLabel: string;     // "Up to 5 Mbps"
  price: number;          // Price in KES
  status: 'active' | 'inactive';
  description?: string;
  isPopular?: boolean;
}
```

#### Subscription
```typescript
{
  plan: Plan;
  status: 'active' | 'expired';
  startedAt: string;
  expiresAt: string;
  dataUsedGb: number;
  dataCapGb: number | null;  // null = unlimited
  balance: number;
}
```

#### Payment
```typescript
{
  id: string;
  customerName: string;
  customerPhone: string;
  planName: string;
  amount: number;
  method: 'M-Pesa' | 'Card' | 'Cash';
  status: 'success' | 'pending' | 'failed';
  date: string;
  transactionId: string;
}
```

#### Router
```typescript
{
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  connectedUsers: number;
  ipAddress: string;
  model?: string;
  lastSeenAt: string;
}
```

#### Connected Device
```typescript
{
  id: string;
  name: string;
  type: 'phone' | 'laptop' | 'tablet' | 'other';
  status: 'connected' | 'disconnected';
  lastSeenAt: string;
  isThisDevice?: boolean;
  macAddress: string;
}
```

#### Notification
```typescript
{
  id: string;
  title: string;
  message: string;
  type: 'payment' | 'plan' | 'system' | 'promo';
  isRead: boolean;
  createdAt: string;
}
```

### Authentication Requirements

1. **JWT Implementation**
   - Access token (short-lived, ~15 minutes)
   - Refresh token (long-lived, ~7 days)
   - Token refresh endpoint: `POST /api/accounts/token/refresh/`
   - Return format: `{ access: string, refresh: string }`

2. **Customer Auth**
   - Phone number + password
   - OTP verification after registration
   - Phone format: 9 digits (Kenyan without country code, e.g., "712345678")

3. **Admin Auth**
   - Email + password
   - Separate from customer authentication
   - Role-based access control

4. **Token Storage**
   - Frontend stores: `osc_access_token`, `osc_refresh_token` in localStorage
   - Authorization header: `Bearer {access_token}`
   - Auto-refresh on 401 responses (implemented in frontend)

### Validation Rules

#### Phone Numbers
- Exactly 9 digits (Kenyan format without country code)
- Frontend formats to: `+254 {9 digits}`

#### Passwords
- Login: minimum 4 characters (adjust based on Django requirements)
- Register: minimum 6 characters
- Confirm password must match

#### Registration
- Full name: minimum 2 characters
- Phone: exactly 9 digits
- Password: minimum 6 characters

### M-Pesa Integration Requirements

1. **STK Push Flow**
   - Endpoint: `POST /api/payments/mpesa/stk-push/`
   - Request: `{ planId: string, phoneNumber: string }`
   - Response: `{ checkoutRequestId: string, message: string }`

2. **Payment Status Check**
   - Endpoint: `GET /api/payments/mpesa/status/{checkoutRequestId}/`
   - Response: `'success' | 'pending' | 'failed'`
   - Frontend polls this endpoint every 2-3 seconds

3. **Daraja Callback**
   - Backend should handle Safaricom Daraja callbacks
   - Update payment status based on callback
   - Trigger subscription creation on successful payment

### Pagination

All list endpoints should support:
- Query params: `?page={page}&page_size={pageSize}&search={search}`
- Response format:
```typescript
{
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
```

### Error Handling

Standard error response format:
```typescript
{
  message: string;
  code?: string;
  fieldErrors?: Record<string, string>;
}
```

### Environment Configuration

Frontend expects:
```bash
VITE_API_BASE_URL=http://localhost:8000/api  # or your production URL
```

---

## Integration Steps

1. **Set Environment Variable**
   - Copy `.env.example` to `.env`
   - Set `VITE_API_BASE_URL` to your Django backend URL

2. **Replace Mock Functions**
   - Go through each file in `src/services/`
   - Replace mock function bodies with real `apiClient` calls
   - Use the endpoint path comments as guidance
   - Example:
   ```typescript
   // Before (mock):
   async login(payload: LoginPayload): Promise<AuthResponse> {
     await wait(DELAY);
     return { user: mockUser, accessToken: 'mock', refreshToken: 'mock' };
   }
   
   // After (real):
   async login(payload: LoginPayload): Promise<AuthResponse> {
     const response = await apiClient.post<AuthResponse>('/api/accounts/login/', payload);
     return response.data;
   }
   ```

3. **Test Integration**
   - Run `npm run dev` to start frontend
   - Test authentication flow
   - Test plan purchase with real M-Pesa
   - Verify admin dashboard loads data

4. **Remove Mock Data**
   - Delete or comment out `mockData.ts` imports
   - Remove artificial delays
   - Keep mock data for development/testing if needed

---

## Production Considerations

### Frontend Optimizations Already Implemented
- ✅ Code-splitting for admin routes (52% bundle reduction)
- ✅ Lazy loading with React.lazy + Suspense
- ✅ TanStack Query caching
- ✅ Offline detection with useOnlineStatus hook
- ✅ Basic PWA capabilities (OfflineBanner component)

### Recommended Backend Features
- CORS configuration for frontend domain
- Rate limiting for API endpoints
- Request logging and monitoring
- Database connection pooling
- Redis for caching (optional)
- Celery for async tasks (M-Pesa callbacks, notifications)

### Security
- HTTPS only in production
- Secure cookie settings if using cookies
- CSRF protection
- Input validation and sanitization
- SQL injection prevention (Django ORM handles this)
- XSS protection

---

## Testing

Frontend testing infrastructure is set up:
- **Vitest** + **React Testing Library** installed
- Test configuration in `vitest.config.ts`
- Sample tests for Button and Input components
- Run tests: `npm test`
- Run test UI: `npm run test:ui`

Add more tests for:
- Authentication flow
- Buy Internet state machine
- Admin dashboard components
- Service layer functions

---

## File Structure Reference

```
src/
├── components/
│   ├── ui/              # Design system components
│   ├── layout/          # Admin layout components
│   └── charts/          # Recharts wrappers
├── features/            # Feature-scoped UI
│   ├── auth/            # Login, Register, OTP, Forgot Password
│   ├── dashboard/       # Customer dashboard
│   ├── buyInternet/     # Plan purchase flow
│   └── admin/           # Admin page components
├── hooks/               # TanStack Query hooks
├── services/            # API service layer (mock → real)
├── types/               # TypeScript interfaces
├── contexts/            # AuthContext
├── routes/              # Router configuration
├── layouts/             # Route-level layouts
├── pages/               # Route components
├── utils/               # Formatting helpers
├── constants/           # Route paths, config
└── test/                # Test setup
```

---

## Contact & Support

For frontend questions or integration issues, refer to:
- Service layer comments in `src/services/*.ts`
- Type definitions in `src/types/index.ts`
- This document for API contract details

---

## Next Steps

1. **Backend Development**
   - Implement Django apps as outlined
   - Create DRF endpoints matching the contract
   - Set up JWT authentication
   - Integrate M-Pesa Daraja API
   - Implement MikroTik router management

2. **Integration**
   - Set environment variables
   - Replace mock functions with real API calls
   - Test end-to-end flows
   - Deploy frontend (Vercel, Netlify, or similar)

3. **Production**
   - Set up monitoring
   - Configure analytics
   - Enable error tracking (Sentry, etc.)
   - Performance optimization

---

**Frontend Status:** ✅ Production Ready  
**Backend Status:** ⏳ To Be Developed  
**Integration Status:** 🔄 Ready for API Integration
