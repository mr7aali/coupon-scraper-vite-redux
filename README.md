# Coupon Admin Dashboard

Vite + React admin dashboard for the `coupon-scraper-fastapi` backend.

## Auth Stack

- Redux Toolkit store
- RTK Query for admin auth API calls
- persisted admin session in `localStorage`
- protected routes for the dashboard

## Environment

Create a `.env` file if needed:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

## Run

```powershell
npm install
npm run dev
```
