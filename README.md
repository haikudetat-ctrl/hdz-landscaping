# HDZ Landing (Public)

Standalone public marketing/intake app for HDZ.

## Why separate
- Stays public without auth/onboarding middleware from the main ops app.
- Lets you deploy and iterate landing funnels independently.
- Still writes leads into the same Supabase project via server-side API.

## Run locally
1. Copy `.env.example` to `.env.local` and fill values.
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Open: `http://localhost:3010`

## Routes
- `/` landing page
- `/intake` lead intake form
- `POST /api/leads` server endpoint to insert leads and upload lead photos

## Supabase tables expected
- `public.leads`
- `public.lead_photos`

These are created by the migration in the main app repo:
`supabase/migrations/20260508121000_add_public_leads_and_lead_photos.sql`
