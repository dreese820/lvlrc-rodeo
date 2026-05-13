# Long Valley Lions Rodeo Club — Web App

4-rodeo series management system with public entry form, live standings, and secure admin panel.

## Pages

| URL | Who sees it | What it does |
|-----|-------------|--------------|
| `/login` | Admin only | Sign in to the admin panel |
| `/admin` | Admin only | Add contestants, manage entries, draw order, enter scores, view results |
| `/enter` | Public | Online entry form (only active when admin opens a rodeo) |
| `/standings` | Public | All-around standings + event results |

---

## One-Time Setup (30–45 minutes)

### 1. Supabase — create the database

1. Go to [supabase.com](https://supabase.com) → **New project** (free tier is fine)
2. Choose a name, set a database password, pick a region close to Utah
3. Wait for the project to spin up (~2 min)
4. Go to **SQL Editor → New Query**, paste the entire contents of `schema.sql`, and click **Run**
5. Go to **Project Settings → API** and copy:
   - **Project URL** → this is your `SUPABASE_URL`
   - **service_role** secret key → this is your `SUPABASE_SERVICE_KEY`

### 2. Vercel — deploy the app

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. If your code is in GitHub: import the repo. Otherwise, install the Vercel CLI:
   ```
   npm i -g vercel
   cd rodeo-app
   vercel
   ```
3. In Vercel project settings → **Environment Variables**, add:
   ```
   SUPABASE_URL          = https://your-project.supabase.co
   SUPABASE_SERVICE_KEY  = your-service-role-secret-key
   JWT_SECRET            = any-long-random-string-you-make-up
   ```
   Generate a good JWT_SECRET with: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`

4. Deploy (Vercel auto-deploys on every push to main)

### 3. Create the admin user

After deploying, run this once from the `rodeo-app` folder:

```bash
npm install          # installs bcryptjs, jsonwebtoken, @supabase/supabase-js
cp .env.example .env.local   # then fill in your real values
node setup-admin.js
```

It will prompt for a username and password. That's your login at `/login`.

---

## Daily Use

### Admin workflow for each rodeo:

1. **Before entries open:** Go to `/admin` → **Settings** tab → click **Open Entries** for the upcoming rodeo. Share the `/enter` link with families.
2. **Entry deadline:** Go back to Settings and **Close Entries**.
3. **Day of rodeo:** Go to **Draw** tab → click **Draw All Events** to randomize ride order. Print the draw sheet.
4. **During rodeo:** Go to **Secretary** tab → select gender/age/event → type in times and scores as events happen. Rankings update live.
5. **After rodeo:** Close the entry window if still open. Standings at `/standings` update automatically.

### Public links to share:
- Entry form: `https://your-app.vercel.app/enter`
- Standings: `https://your-app.vercel.app/standings`

---

## Project Structure

```
rodeo-app/
├── api/
│   ├── auth.js           POST /api/auth — admin login
│   ├── contestants.js    GET/POST/DELETE /api/contestants
│   ├── entries.js        GET/POST /api/entries
│   ├── draws.js          GET/POST /api/draws
│   ├── results.js        GET/PUT /api/results
│   ├── settings.js       GET/PUT /api/settings
│   └── public-entry.js   POST /api/public-entry — public form submission
├── lib/
│   ├── supabase.js       Supabase client
│   └── auth.js           JWT helpers
├── public/
│   └── shared.js         EVENTS, RODEOS, ranking logic (used by all pages)
├── admin.html            Protected admin panel
├── login.html            Admin login
├── enter.html            Public entry form
├── results.html          Public standings
├── schema.sql            Run once in Supabase SQL editor
├── setup-admin.js        Run once to create admin user
├── vercel.json           URL rewrites
└── package.json
```

## Scoring Rules (preserved from original)

- **Timed events** — lowest total time wins (time + penalty)
- **Dummy Roping** — most catches wins; ties broken by fastest total time
- **Rough Stock** — highest score wins (0–100)
- **Lead Line (LL)** — 0–5 age group only; always places after independent riders but still earns points
- **NT/TO** — no time/turn out; no points, always last
- **Points** — 10 down to 1; ties split (e.g., tied 2nd = 8.5 each)
- **Team Roping** — entered as Header OR Heeler, never both
- **All-Around** — cumulative points across all 4 rodeos for year-end prizes
