# Eventora – Event Booking Platform
Next.js 14 (App Router), TypeScript, Tailwind, Framer Motion, Lucide, Supabase.

## Run locally
1. `npm install`
2. Copy `.env.example` to `.env.local`, fill in Supabase URL and anon key (Project Settings > API). Never use the service_role key.
3. In Supabase SQL Editor run `supabase/schema.sql`. Create a public Storage bucket `event-images`.
4. `npm run dev` then open http://localhost:3000
Without Supabase keys the site runs in demo mode (sample events, bookings saved in the browser).

## Roles
Signup offers Attendee or Organizer. To make an admin run: `update profiles set role='admin' where id=(select id from auth.users where email='you@email.com');`

## GitHub
`git init && git add . && git commit -m "Eventora" && git branch -M main && git remote add origin <repo-url> && git push -u origin main`

## Vercel
Import the GitHub repo at vercel.com/new, add the two env vars from `.env.example`, click Deploy. In Supabase Auth > URL Configuration add your Vercel URL.

## Not included yet
Real payments (add Stripe Checkout), image upload UI, event editing UI, blog likes/comments saved to DB (tables exist), reviews and favorites UI, admin user-management UI, per-event image uploads.


## Eventora refreshed homepage
The homepage now uses a dark midnight-purple and magenta concert theme, with a custom festival hero image in `public/eventora-hero.png`. It includes event/city search, city tabs, eight featured categories, organizer CTA, payment-method labels, and a three-step QR-ticket explainer. The footer includes Refund Policy and Terms & Conditions links plus Instagram/Facebook links.

### Run locally
1. Install Node.js 18 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and configure Supabase values if you want live backend features.
4. Run `npm run dev` and open the local URL shown in the terminal.

Note: JazzCash, easypaisa and bank card are displayed as intended payment options; live payment processing requires merchant credentials and payment-gateway integration. The policy pages are starter templates and should be reviewed before launch.
