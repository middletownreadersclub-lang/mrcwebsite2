import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { posts } from "@/content/posts";

export const metadata = {
  title: "The Margin",
  description:
    "Notes from the selling desk: metadata, launch timing, email lists and the rest of the work that decides whether a book is found.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Margin"
        title="Notes from the selling desk"
        lede="What we work through with authors on the back half of each session, written down so it outlives the call. Nothing here costs money to act on."
      />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <ul className="divide-y divide-navy/15 border-y border-navy/15">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-4 py-9 transition-colors hover:bg-white/50 md:grid-cols-[13rem_1fr] md:gap-10 md:px-4"
              >
                <div className="text-sm text-navy/50">
                  <p>{post.dateLabel}</p>
                  <p className="mt-1">{post.readingTime}</p>
                  {post.draft && (
                    <p className="mt-3 inline-block border border-brass/60 px-2 py-0.5 text-xs text-brass-deep">
                      In progress
                    </p>
                  )}
                </div>
                <div className="max-w-2xl">
                  <h2 className="font-display text-[clamp(1.5rem,3vw,2.1rem)] leading-snug text-navy">
                    {post.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-navy/70">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
