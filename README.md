# Middletown Readers Club

The club website. Next.js 14 (App Router) + Tailwind, deployed on Vercel.

---

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## Put it on GitHub and Vercel

```bash
git init
git add .
git commit -m "Middletown Readers Club website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/middletown-readers-club.git
git push -u origin main
```

Then at vercel.com → **Add New → Project** → import the repo. Vercel detects
Next.js on its own; you do not need to change any build settings. Click Deploy.

Every push to `main` redeploys automatically after that.

---

## Where to edit things

| What you want to change | File |
| --- | --- |
| Club name, tagline, email, meeting details, founder and host | `content/site.js` |
| The FAQ list | `content/site.js` |
| Books and authors you have spotlighted | `content/site.js` → `spotlights` |
| Blog posts | `content/posts.js` |
| Colours and fonts | `tailwind.config.js` and `app/globals.css` |
| The logo | `components/Logo.js` and `public/logo.svg` |

**The logo is a vector recreation** of the image you supplied, drawn from
scratch so it has a transparent background and works on dark surfaces. If you
get the original vector from your designer, drop the paths into
`components/Logo.js` and `public/logo.svg` and nothing else changes.

### Adding a spotlight

Open `content/site.js` and add to the `spotlights` array:

```js
spotlights: [
  {
    title: "The Book",
    author: "Author Name",
    date: "October 2026",
    blurb: "One or two sentences about the book.",
    takeaway: "The selling lesson that came out of the session.",
  },
],
```

The Picks page switches from the open-call state to the grid automatically.

### Adding a blog post

Add an object to the **top** of the array in `content/posts.js`. Set
`draft: true` while you are still writing — it stays listed but reads as in
progress. `body` is plain HTML: `<p>`, `<h2>`, `<ul><li>`, `<em>`.

---

## The community board

Out of the box the board saves posts to **browser storage**, which means each
visitor only sees their own posts. Fine for a preview, wrong for a real
community. To make it shared:

1. Create a free project at [supabase.com](https://supabase.com).
2. In the SQL editor, run:

```sql
create table posts (
  id uuid primary key default gen_random_uuid(),
  author text not null,
  body text not null,
  reactions jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table posts enable row level security;

create policy "anyone can read"   on posts for select using (true);
create policy "anyone can post"   on posts for insert with check (true);
create policy "anyone can react"  on posts for update using (true) with check (true);
```

3. In Vercel → Project → Settings → Environment Variables, add:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...
```

4. Redeploy.

The site switches to the shared database automatically and the "running on
browser storage" notice disappears.

**Be aware of what those policies do.** They let anyone post and anyone edit
reactions, with no accounts. That is the right trade for a small, friendly
club and the wrong one once you get spam. When that day comes, the options are
Supabase Auth (members sign in), or a moderation column that hides posts until
approved. Ask and I will wire either.

---

## Photos

Drop image files into `public/images/`, then set the paths in
`content/site.js` under `images`. Any slot left `null` renders a generated
atmosphere panel, so the site looks finished before you have a single photo.

Every photo is pushed through the club's navy-and-brass duotone automatically.
That is what makes free stock images look like they were shot for you instead
of pulled off a library.

Full guide, including which searches to use and what size to export:
`public/images/README.md`.

Vercel serves and optimises these for you — WebP and AVIF conversion, per-device
resizing, CDN caching. Nothing to configure and nothing extra to pay for.

---

## The join form

Both forms post to Formspree form `mkjgwdgr`, set in `content/site.js`. The
free tier allows 50 submissions a month — watch it if signups pick up.

---

## Accessibility and motion

Keyboard focus is visible throughout, the carousel responds to arrow keys, and
everything collapses to a single column on small screens. All animation is
switched off for visitors who have "reduce motion" enabled in their OS.
