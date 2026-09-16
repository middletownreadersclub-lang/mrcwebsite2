import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/content/posts";
import { site } from "@/content/site";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return { title: "Not found" };
  return { title: post.title, description: post.excerpt };
}

export default function PostPage({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="relative overflow-hidden border-b border-navy/10">
          <div className="arc-frame left-1/2 top-8 h-[300px] w-[520px] -translate-x-1/2 text-navy" />
          <div className="relative mx-auto max-w-3xl px-5 pb-14 pt-20">
            <p className="text-sm text-brass-deep">
              {post.dateLabel} · {post.readingTime}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.2rem,5.5vw,3.6rem)] leading-[1.06] text-navy">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-navy/70">
              {post.excerpt}
            </p>
          </div>
        </header>

        <div
          className="prose-mrc mx-auto max-w-reading px-5 py-16"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        <div className="mx-auto max-w-reading px-5 pb-16">
          <div className="rule-brass" />
          <p className="mt-8 leading-relaxed text-navy/70">
            We work through this kind of thing live on the back half of every
            session.{" "}
            <Link href="/#join" className="link-underline pb-0.5 text-navy">
              Join the club
            </Link>{" "}
            or write to{" "}
            <a
              href={`mailto:${site.email}`}
              className="link-underline pb-0.5 text-navy"
            >
              {site.email}
            </a>
            .
          </p>
        </div>
      </article>

      <section className="border-t border-navy/10 bg-parchment-warm">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-display text-2xl text-navy">Keep reading</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/blog/${other.slug}`}
                className="group border-t border-navy/15 pt-5"
              >
                <h3 className="font-display text-xl leading-snug text-navy">
                  {other.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-navy/70">
                  {other.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
