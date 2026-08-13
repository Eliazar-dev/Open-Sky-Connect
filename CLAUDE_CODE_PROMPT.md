# Claude Code Kickoff Prompt — Open Sky Connect Frontend

Copy everything below into Claude Code once you've unzipped
`opensky-connect-frontend.zip` and opened the folder as your project.

---

I'm continuing work on **Open Sky Connect**, a commercial Wi-Fi hotspot
billing platform. This folder already contains a working React + TypeScript
+ Vite + Tailwind CSS frontend that I had scaffolded in a previous session —
it builds cleanly and runs against a mocked service layer. Please start by
reading `README.md`, then explore `src/` to understand the architecture
before changing anything.

**Stack**: React 19, TypeScript, Vite, Tailwind CSS v4, React Router 7,
TanStack Query, Axios, React Hook Form + Zod, Lucide React, Framer Motion,
Sonner, Recharts, Day.js.

**Backend**: Django REST Framework + PostgreSQL + JWT auth + Safaricom Daraja
API (M-Pesa) + MikroTik API. The backend is separate/not in this repo — for
now, everything in `src/services/*Service.ts` reads from
`src/services/mockData.ts` instead of calling the real API.

**Design reference images** are in `docs/design-reference/` (customer portal,
admin dashboard, and logo) — refer to these for any visual work so new
screens stay consistent with the established look.

## First, run a setup check

1. `npm install`
2. `npm run dev` and confirm it boots without errors
3. `npm run build` and confirm it type-checks and builds cleanly
4. Briefly summarize the current folder structure and routing back to me so
   we're aligned before you start changing things

## What's already built

- Full design-system component library in `src/components/ui/` (Button,
  Input, PhoneInput, OtpInput, Card, Badge, Modal, Drawer, BottomSheet,
  Table, SearchBar, Dropdown, Alert, Pagination, Breadcrumbs, EmptyState,
  ErrorState, Skeleton loaders, OfflineBanner, Tabs, StatCard)
- Customer portal: Auth page (Login/Register tabs, OTP overlay, Forgot
  Password modal), Dashboard page (active plan, quick actions, connected
  devices, bottom nav) with Payment History / Profile / Support /
  Notifications / Devices as overlays, and the full Buy Internet flow
  (choose plan → confirm → awaiting M-Pesa → success/failed)
- Admin dashboard: sidebar + navbar shell, and all 7 pages (Dashboard,
  Customers, Internet Plans, Payments, Routers, Reports, Settings) with
  drawers/modals for details and add/edit forms
- Mocked service layer + TanStack Query hooks for every domain (auth, plans,
  payments, customers, routers, devices, notifications, dashboard stats)
- Auth session handled via `AuthContext` + `ProtectedRoute`

## What I need you to help with next (roughly in this order)

1. **Wire up the real Django REST Framework API.** Go through every file in
   `src/services/` and replace the mock function bodies with real
   `apiClient` (axios) calls, using the existing function signatures and
   TypeScript types in `src/types/index.ts` as the contract. Ask me for the
   actual endpoint paths/payload shapes if they're not obvious, rather than
   guessing.
2. **Real JWT auth flow**: token refresh, logout-on-401 handling (there's a
   response interceptor stub in `src/services/apiClient.ts` to build on),
   and persisting/restoring sessions properly.
3. **Real M-Pesa STK push polling** in `plansService.initiatePayment` /
   `checkPaymentStatus` — this currently simulates the Daraja callback with
   a random success/fail; replace with real polling or websocket/webhook
   handling once the backend exposes it.
4. **Form validation parity**: double check the Zod schemas in
   `src/features/auth/*` match whatever validation rules the Django backend
   enforces (password rules, phone number format, etc).
5. **Testing**: set up Vitest + React Testing Library and add tests for the
   design-system components and the Buy Internet flow state machine at
   minimum.
6. **Code-splitting**: the production build currently warns about a >500kB
   main chunk. Please add route-based lazy loading (`React.lazy` +
   `Suspense`) for the Admin routes at least, since customers never load
   that code.
7. **PWA / offline polish** if relevant — there's already a basic
   `OfflineBanner` + `useOnlineStatus` hook to build on.

Please work incrementally, run `npm run build` after each meaningful change
to catch regressions early, and flag anywhere you had to guess at backend
behavior so we can confirm it against the real API later.
