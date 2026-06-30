# Supabase setup for the portfolio dashboard

Follow these once. Everything else (the app + dashboard) is already wired up.

## 1. Create the project
1. Go to https://supabase.com → sign in → **New project**.
2. Pick a name + a strong database password (save it). Choose the region closest to you.
3. Wait for it to finish provisioning (~2 min).

## 2. Create the table + security rules
Open **SQL Editor** (left sidebar) → **New query** → paste all of this → **Run**:

```sql
-- Projects table (mirrors the old Sanity schema)
create table public.projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  link        text,
  slug        text,
  description text,
  type        text,
  stack       text[] default '{}',
  image_url   text,
  created_at  timestamptz not null default now()
);

alter table public.projects enable row level security;

-- Anyone can read (public portfolio)
create policy "Public read projects"
  on public.projects for select using (true);

-- Only logged-in users (you) can write
create policy "Auth insert projects"
  on public.projects for insert to authenticated with check (true);
create policy "Auth update projects"
  on public.projects for update to authenticated using (true) with check (true);
create policy "Auth delete projects"
  on public.projects for delete to authenticated using (true);
```

## 3. Create the image storage bucket
1. **Storage** (left sidebar) → **New bucket** → name it exactly `images` → toggle **Public bucket** ON → **Create**.
2. Back in **SQL Editor**, run this so the dashboard can upload (public read is already on):

```sql
create policy "Public read images"
  on storage.objects for select using (bucket_id = 'images');
create policy "Auth upload images"
  on storage.objects for insert to authenticated with check (bucket_id = 'images');
create policy "Auth update images"
  on storage.objects for update to authenticated using (bucket_id = 'images');
create policy "Auth delete images"
  on storage.objects for delete to authenticated using (bucket_id = 'images');
```

## 4. Create your admin account + lock down signups
1. **Authentication** → **Users** → **Add user** → **Create new user**.
   - Enter your email + a password, and tick **Auto Confirm User**.
2. **Authentication** → **Sign In / Providers** (or **Settings**) → turn **OFF** "Allow new users to sign up".
   - This makes it single-account: only the user you just created can log in.

## 5. Get your keys
**Project Settings → API**. Copy:
- **Project URL** → `VITE_SUPABASE_URL`
- **anon / public** key → `VITE_SUPABASE_ANON_KEY`

Then tell me the URL + anon key, or put them in a `.env` file (copy `.env.example`):

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

## 6. Re-enter your projects
Sanity has been removed. Your old project content is saved in `sanity-export.json`
for reference — add each project through the dashboard at `/admin` (the form lets you
re-upload the image). 7 projects total.

## 7. Netlify
**Site settings → Environment variables** → add the same two `VITE_…` vars → redeploy.

---
After step 5 you can run `npm run dev` and open `/admin/login`.
