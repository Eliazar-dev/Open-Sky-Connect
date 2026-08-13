# Open Sky Connect — Frontend

Commercial Wi-Fi hotspot billing platform frontend. React + TypeScript + Vite +
Tailwind CSS. Consumes a Django REST Framework backend (not included here) via
a mocked service layer that mirrors the real API contract.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router 7 · TanStack Query ·
Axios · React Hook Form + Zod · Lucide React · Framer Motion · Sonner · Recharts · Day.js

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build     # type-check + production build
npm run preview   # preview the production build locally
```

Copy `.env.example` to `.env` and point `VITE_API_BASE_URL` at your Django
backend when it's ready. Until then, everything runs against realistic mock
data in `src/services/mockData.ts`.

## Demo login

The auth flow is fully mocked. On the Login tab, any phone number + any
password (4+ characters) logs you in. On Register, the OTP overlay accepts
`123456` as the verification code.

## Folder structure

```
src/
  components/ui        Reusable design-system primitives (Button, Modal, Table, ...)
  components/layout     Admin shell pieces (sidebar, navbar, mobile drawer)
  components/charts     Recharts wrappers
  layouts/               Route-level layouts (AdminLayout)
  pages/                 Route components (auth, customer, admin)
  features/              Feature-scoped UI grouped by domain (auth, dashboard,
                          buyInternet, paymentHistory, profile, support,
                          notifications, devices, admin)
  hooks/                 TanStack Query hooks per domain
  services/              Mock service layer + Axios client (swap mocks for real
                          calls here when the backend is ready)
  types/                 Shared TypeScript interfaces mirroring the DRF API
  utils/                 Formatting + class-name helpers
  constants/             Route paths, support contact info
  contexts/              AuthContext (session state)
  routes/                Router config + ProtectedRoute guard
```

## Architecture notes

- **Two customer pages only** (Auth, Dashboard); everything else is a
  Modal / Drawer / BottomSheet overlay, per the product brief. Buy Internet
  is the one full-screen flow, with internal step state (choose plan →
  confirm → awaiting payment → success/failed).
- **Admin has 7 pages** behind a shared `AdminLayout` (sidebar + navbar).
  Row-level detail views open as drawers/modals rather than new routes.
- **No hardcoded data in components.** Every page reads through a
  `hooks/use*` → `services/*Service.ts` → `services/mockData.ts` chain, so
  swapping in the real Django API later only touches the service layer.
- **Design tokens** (brand blue, ink navy, status colors, card radius/shadow)
  live in `src/index.css` under `@theme`, sampled from the OpenSky Connect
  logo and reference designs.
