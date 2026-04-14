# Hotel Palpasa Backend (Node/Express + MongoDB Atlas)

## Setup

1. Create an env file:

- Copy `.env.example` to `.env`
- Fill in `MONGODB_URI`, `JWT_SECRET`, `ADMIN_BOOTSTRAP_KEY`

2. Install + run:

- `npm install`
- `npm run dev`

Health check:

- `GET /health`

## Reservation APIs

### Public (used by booking form)

- `POST /api/reservations`
  - Body: `{ name, email, phone, date, time, guests, message? }`
  - Creates a reservation with `status=pending`

- `GET /api/reservations/:id`
  - Fetch a reservation by id

## Admin Auth

### Bootstrap first admin (one-time)

- `POST /api/admin/auth/bootstrap`
  - Header: `x-bootstrap-key: <ADMIN_BOOTSTRAP_KEY>`
  - Body: `{ email, password, name? }`
  - Only works when no admin user exists yet

### Login

- `POST /api/admin/auth/login`
  - Body: `{ email, password }`
  - Returns `{ token, admin }`

### Current admin

- `GET /api/admin/auth/me`
  - Header: `Authorization: Bearer <token>`

## Admin Reservations (Dashboard)

All endpoints below require:

- Header: `Authorization: Bearer <token>`

- `GET /api/admin/reservations?status=pending&limit=50&skip=0`
  - Lists reservations (default sorted by newest)

- `GET /api/admin/reservations/:id`
  - Reservation details

- `POST /api/admin/reservations/:id/accept`
  - Sets status to `confirmed`

- `POST /api/admin/reservations/:id/reject`
  - Sets status to `cancelled`

- `PATCH /api/admin/reservations/:id/status`
  - Body: `{ status: 'confirmed' | 'cancelled', note? }`

## Notes

- This backend currently implements **admin reservation approval/rejection** plus a **public reservation create** endpoint.
- Your current Frontend still stores reservations in **Firebase Firestore**; to use this backend end-to-end, the Frontend booking/dashboard pages should be switched to call these APIs.
