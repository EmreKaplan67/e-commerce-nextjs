# Next.js E‑Commerce Platform

A modern, full‑stack e‑commerce application built with **Next.js (App Router)** and **React 19 Server Components**, focused on performance, type safety, and a clean developer experience.

This project includes a secure admin dashboard, Stripe payments with webhooks, transactional emails, and a scalable database setup using Prisma and PostgreSQL.

---

## ✨ Features

### 🛍️ Storefront
- Product listing with filters (most recent, most popular)
- Secure checkout with **Stripe**
- Order confirmation and receipt emails

### 🔐 Admin Panel
- Protected `/admin` routes
- Browser‑based authentication
- Product and order management
- Secure server actions for mutations

### 📧 Email
- Transactional emails using **React Email**
- Sent via **Resend**
- Product confirmations & payment receipts

### 💳 Payments
- Stripe Checkout integration
- Stripe Webhooks for payment verification
- Secure server‑side handling of events

---

## 🧰 Tech Stack

**Framework & Language**
- Next.js (App Router)
- React 19 (Server Components & Actions)
- TypeScript

**Styling & UI**
- Tailwind CSS
- shadcn/ui
- Lucide Icons

**Database & ORM**
- PostgreSQL
- Prisma ORM
- Prisma Data Platform

**Validation & Auth**
- Zod (schema validation)
- Custom browser authentication via `proxy.ts`

**Payments & Emails**
- Stripe (payments + webhooks)
- React Email
- Resend

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/EmreKaplan67/e-commerce-nextjs
cd <project-name>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file and configure the following:

```env
NEXT_PUBLIC_SERVER_URL
ADMIN_USERNAME=
HASHED_ADMIN_PASSWORD=
DATABASE_URL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
RESEND_API_KEY=
```

### 4. Database Setup
```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Run the Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to view the app.


---

## 📈 Future Improvements

- Inventory tracking
- Customer accounts
- Order history dashboard
- Role‑based admin permissions
- Analytics & reporting

---


## 🙌 Acknowledgements

- Next.js
- Stripe
- Prisma
- shadcn/ui
- Resend

