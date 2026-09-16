"use client";

import { useEffect, useState } from "react";
import {
  REACTIONS,
  addPost,
  isShared,
  listPosts,
  myReactions,
  react,
  timeAgo,
} from "@/lib/store";

export default function Discussion() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [posting, setPosting] = useState(false);
  const [mine, setMine] = useState({});

  useEffect(() => {
    let live = true;
    listPosts()
      .then((data) => {
        if (!live) return;
        setPosts(data);
        setMine(myReactions());
      })
      .catch((e) => live && setError(e.message))
      .finally(() => live && setLoading(false));
    return () => {
      live = false;
    };
  }, []);

  async function submit(e) {
    e.preventDefault();
    if (!author.trim() || !body.trim()) return;
    setPosting(true);
    setError("");
    try {
      const post = await addPost({ author, body });
      setPosts((prev) => [post, ...prev]);
      setBody("");
    } catch (err) {
      setError(err.message);
    } finally {
      setPosting(false);
    }
  }

  async function onReact(post, key) {
    const previous = posts;
    try {
      const counts = await react(post, key);
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, reactions: counts } : p))
      );
      setMine(myReactions());
    } catch (err) {
      setPosts(previous);
      setError(err.message);
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr]">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <h2 className="font-display text-3xl text-navy">Start something</h2>
        <p className="mt-3 max-w-reading text-navy/70">
          A question about the current read, a book you want us to consider, or a
          problem you are stuck on with your own. Short is fine.
        </p>

        <form onSubmit={submit} className="mt-7 space-y-5">
          <label className="block">
            <span className="text-sm text-navy/70">Your name</span>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              maxLength={60}
              required
              className="mt-1.5 w-full border-b border-navy/25 bg-transparent py-2 text-navy outline-none focus:border-brass"
            />
          </label>

          <label className="block">
            <span className="text-sm text-navy/70">Your post</span>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={5}
              maxLength={2000}
              required
              className="mt-1.5 w-full resize-y border-b border-navy/25 bg-transparent py-2 leading-relaxed text-navy outline-none focus:border-brass"
            />
            <span className="mt-1 block text-right text-xs text-navy/45">
              {body.length}/2000
            </span>
          </label>

          <button
            type="submit"
            disabled={posting || !author.trim() || !body.trim()}
            className="rounded-full bg-navy px-7 py-3 text-sm text-parchment transition-colors hover:bg-navy-soft disabled:opacity-40"
          >
            {posting ? "Posting…" : "Post to the board"}
          </button>
        </form>

        {!isShared && (
          <p className="mt-6 border-l-2 border-brass pl-4 text-sm leading-relaxed text-navy/60">
            This board is running on browser storage, so posts stay on this
            device. Connect the database and everyone sees the same thread —
            setup is in the README.
          </p>
        )}
      </div>

      <div>
        {error && (
          <p role="alert" className="mb-6 text-sm text-[#9A3412]">
            {error}
          </p>
        )}

        {loading && <p className="text-navy/50">Loading the board…</p>}

        {!loading && posts.length === 0 && (
          <div className="border border-dashed border-navy/25 p-10 text-center">
            <p className="font-display text-2xl text-navy">
              Nobody has posted yet
            </p>
            <p className="mx-auto mt-3 max-w-sm text-navy/65">
              Somebody has to go first. Ask the question you would ask if the
              author were already on the call.
            </p>
          </div>
        )}

        <ul className="space-y-5">
          {posts.map((post) => (
            <li
              key={post.id}
              className="rounded-sm border border-navy/15 bg-white/65 p-6"
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-display text-lg text-navy">{post.author}</p>
                <p className="shrink-0 text-xs text-navy/45">
                  {timeAgo(post.created_at)}
                </p>
              </div>

              <p className="mt-3 whitespace-pre-wrap leading-relaxed text-navy/80">
                {post.body}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {REACTIONS.map((r) => {
                  const count = post.reactions?.[r.key] || 0;
                  const active = Boolean(mine[post.id]?.[r.key]);
                  return (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => onReact(post, r.key)}
                      aria-pressed={active}
                      title={r.label}
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors ${
                        active
                          ? "border-brass bg-brass/15 text-brass-deep"
                          : "border-navy/15 text-navy/60 hover:border-navy/35"
                      }`}
                    >
                      <span aria-hidden="true">{r.glyph}</span>
                      <span className="sr-only">{r.label}</span>
                      {count > 0 && <span>{count}</span>}
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
