# Images

Put your photo files in this folder, then set the paths in `content/site.js`
under `images`. Anything left as `null` renders a generated atmosphere panel
instead, so the site never breaks or shows an empty box.

Every photo is automatically pushed through the club's navy-and-brass duotone.
That is deliberate: it means ordinary stock photography comes out looking like
it was shot for you, and a mismatched set of images still reads as one brand.

## The slots

| Set in `site.js` | Filename to use | What works |
| --- | --- | --- |
| `hero` | `hero.jpg` | Wide, low detail, nothing important in the left half — text sits on top. A blurred shelf of books, a table with several open books, hands turning a page. |
| `about` | `about.jpg` | Wide band. People reading together, or a reading room with depth. |
| `openCall` | `authors.jpg` | Portrait-ish. A writer working — notebook, laptop, desk. This one sits beside the author pitch. |
| `community` | `community.jpg` | People mid-conversation. Hands, a table, coffee. Lighter than the rest, it sits on parchment. |
| `sessions[0..2]` | `session-1.jpg`, `session-2.jpg`, `session-3.jpg` | Landscape, roughly 3:2. One for reading, one for talking, one for working. |

## Where to get them

**Unsplash** — https://unsplash.com — free for commercial use, no permission
and no attribution needed. Good starting searches:

- https://unsplash.com/s/photos/book-club
- https://unsplash.com/s/photos/reading
- https://unsplash.com/s/photos/books
- https://unsplash.com/s/photos/writing

**Pexels** — https://www.pexels.com — same idea, different library. Worth a
look if Unsplash results feel overused.

Pick photos that are **dark or low-contrast**. Bright, busy images fight the
duotone. Look for a lot of shadow, warm light, and few competing colours.

## Before you upload

Resize and compress. A 6000px camera file will make your site slow even with
Next.js optimisation.

- Hero and about: 2000px wide, quality 75–80
- Sessions and community: 1200px wide
- Keep every file under ~300KB

https://squoosh.app does this in the browser, free, no account.

## Then

```js
// content/site.js
images: {
  hero: "/images/hero.jpg",
  about: "/images/about.jpg",
  openCall: "/images/authors.jpg",
  community: "/images/community.jpg",
  sessions: ["/images/session-1.jpg", "/images/session-2.jpg", "/images/session-3.jpg"],
},
```

Commit, push, and Vercel serves and optimises them automatically — it converts
to WebP and AVIF, resizes per device, and caches on its CDN. There is no
separate image host to set up and nothing to pay for.

## Later, when you have real ones

Session screenshots, author portraits, your own photos from meetups — all of
them beat stock. Swap the files, keep the filenames, and nothing else changes.
