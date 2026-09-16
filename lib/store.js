// ---------------------------------------------------------------------------
// Community storage.
//
// Out of the box this runs on localStorage, which means posts live in the
// browser that wrote them. That is fine for a preview, and wrong for a real
// community — nobody sees anybody else's posts.
//
// To make it shared, create a free Supabase project, run the SQL in README.md,
// and set these two environment variables in Vercel:
//
//   NEXT_PUBLIC_SUPABASE_URL
//   NEXT_PUBLIC_SUPABASE_ANON_KEY
//
// Nothing else changes. The adapter below switches automatically.
// ---------------------------------------------------------------------------

const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isShared = Boolean(URL_BASE && ANON_KEY);

export const REACTIONS = [
  { key: "love", glyph: "♥", label: "Loved it" },
  { key: "insight", glyph: "✦", label: "Good point" },
  { key: "reading", glyph: "❧", label: "Adding to my list" },
  { key: "question", glyph: "?", label: "Say more" },
];

const LOCAL_KEY = "mrc:posts:v1";
const MINE_KEY = "mrc:reactions:v1";

/* ------------------------------ local helpers ----------------------------- */

function readLocal() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(LOCAL_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeLocal(posts) {
  try {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(posts));
  } catch {
    /* storage full or blocked — the UI still works for this session */
  }
}

export function myReactions() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(MINE_KEY) || "{}");
  } catch {
    return {};
  }
}

function rememberReaction(postId, key, on) {
  const mine = myReactions();
  mine[postId] = mine[postId] || {};
  if (on) mine[postId][key] = true;
  else delete mine[postId][key];
  try {
    window.localStorage.setItem(MINE_KEY, JSON.stringify(mine));
  } catch {
    /* ignore */
  }
}

/* ------------------------------ supabase calls ---------------------------- */

function headers(extra = {}) {
  return {
    apikey: ANON_KEY,
    Authorization: `Bearer ${ANON_KEY}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

/* --------------------------------- public --------------------------------- */

export async function listPosts() {
  if (!isShared) {
    return readLocal().sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  const res = await fetch(
    `${URL_BASE}/rest/v1/posts?select=*&order=created_at.desc&limit=100`,
    { headers: headers(), cache: "no-store" }
  );
  if (!res.ok) throw new Error("Could not load the discussion.");
  return res.json();
}

export async function addPost({ author, body }) {
  const record = {
    author: author.trim().slice(0, 60),
    body: body.trim().slice(0, 2000),
  };

  if (!isShared) {
    const post = {
      ...record,
      id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      created_at: new Date().toISOString(),
      reactions: {},
    };
    const posts = readLocal();
    posts.push(post);
    writeLocal(posts);
    return post;
  }

  const res = await fetch(`${URL_BASE}/rest/v1/posts`, {
    method: "POST",
    headers: headers({ Prefer: "return=representation" }),
    body: JSON.stringify([{ ...record, reactions: {} }]),
  });
  if (!res.ok) throw new Error("Your post did not save. Try again.");
  const [post] = await res.json();
  return post;
}

export async function react(post, key) {
  const mine = myReactions()[post.id] || {};
  const on = !mine[key];
  const counts = { ...(post.reactions || {}) };
  counts[key] = Math.max(0, (counts[key] || 0) + (on ? 1 : -1));
  if (counts[key] === 0) delete counts[key];

  rememberReaction(post.id, key, on);

  if (!isShared) {
    const posts = readLocal().map((p) =>
      p.id === post.id ? { ...p, reactions: counts } : p
    );
    writeLocal(posts);
    return counts;
  }

  const res = await fetch(`${URL_BASE}/rest/v1/posts?id=eq.${post.id}`, {
    method: "PATCH",
    headers: headers({ Prefer: "return=minimal" }),
    body: JSON.stringify({ reactions: counts }),
  });
  if (!res.ok) throw new Error("That reaction did not register.");
  return counts;
}

export function timeAgo(iso) {
  const seconds = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}
