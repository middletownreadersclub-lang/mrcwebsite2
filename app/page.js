import Link from "next/link";
import { Emblem } from "@/components/Logo";
import Carousel from "@/components/Carousel";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import JoinForm from "@/components/JoinForm";
import { posts } from "@/content/posts";
import { site } from "@/content/site";

const sessionShape = (images) => [
  {
    image: images.sessions?.[0],
    kicker: "First half hour",
    title: "The read",
    body: "We talk about the book the way you would with a friend who finished it last night — what worked, what did not, the part you had to reread. Pollyanna keeps it moving and flags spoilers before they land.",
  },
  {
    image: images.sessions?.[1],
    kicker: "Second half hour",
    title: "The author hour",
    body: "The writer joins and takes questions from the room. Not a reading, not a publicity spot. Members ask what they actually want to know, and authors answer more honestly than they would on a panel.",
  },
  {
    image: images.sessions?.[2],
    kicker: "Last half hour",
    title: "The selling desk",
    body: "We turn to the business of it. Categories, keywords, the email list, what the launch runway should have looked like. The author leaves with one thing to ship that week, and everyone listening learns it too.",
  },
];

export default function HomePage() {
  const latest = posts.filter((p) => !p.draft).slice(0, 3);
  const sessions = sessionShape(site.images);

  return (
    <>
      {/* ---------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden bg-navy-deep text-parchment">
        <Photo
          src={site.images.hero}
          alt=""
          priority
          seed={2}
          className="absolute inset-0 opacity-40"
          sizes="100vw"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-navy-deep/55 via-navy-deep/75 to-navy-deep"
        />
        <div className="arc-frame draw-arc left-1/2 top-[-60px] h-[760px] w-[1100px] -translate-x-1/2 text-brass" />
        <div className="arc-frame draw-arc left-1/2 top-[20px] h-[600px] w-[860px] -translate-x-1/2 text-parchment" />

        <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-20 sm:pt-24">
          <Emblem className="rise h-20 w-auto sm:h-24" navy="#F7F3EA" brass="#C2A04A" />

          <h1 className="mt-10 font-display text-[clamp(2.7rem,8vw,5.6rem)] leading-[0.98]">
            <span className="rise block" style={{ animationDelay: "120ms" }}>
              Read the book.
            </span>
            <span className="rise block" style={{ animationDelay: "260ms" }}>
              Meet the author.
            </span>
            <span
              className="rise block text-brass-light"
              style={{ animationDelay: "400ms" }}
            >
              Help them sell it.
            </span>
          </h1>

          <div
            className="rise mt-9 max-w-reading"
            style={{ animationDelay: "560ms" }}
          >
            <p className="text-lg leading-relaxed text-parchment/80">
              {site.intro}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/#join"
                className="rounded-full bg-brass px-7 py-3 text-sm font-medium text-navy-deep transition-colors hover:bg-brass-light"
              >
                Join the club
              </Link>
              <Link
                href="/picks"
                className="link-underline pb-1 text-sm text-parchment/85"
              >
                See what we are reading
              </Link>
            </div>

            <p className="mt-10 text-sm text-parchment/50">
              {site.meeting.cadence} on {site.meeting.platform}. Free to join.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- how it works */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-[clamp(1.9rem,4vw,2.9rem)] leading-tight text-navy">
            Ninety minutes, in three movements
          </h2>
          <p className="mt-5 max-w-reading leading-relaxed text-navy/70">
            Most clubs stop when the discussion does. Ours has a second half that
            is closer to a workshop, because the authors who come to us are
            usually doing their own selling.
          </p>
        </div>

        <div className="mt-12">
          <Carousel items={sessions} label="How a session runs" />
        </div>
      </section>

      {/* ------------------------------------------------------- founder note */}
      <section className="border-y border-navy/10 bg-parchment-warm">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <h2 className="font-display text-[clamp(1.9rem,4vw,2.9rem)] leading-tight text-navy">
              Why we added the second half
            </h2>
            <div className="mt-6 max-w-reading space-y-5 leading-relaxed text-navy/75">
              <p>
                I kept noticing the same thing on author calls. The writing
                questions got good answers. The selling questions got a shrug, or
                a story about something that worked once and nobody could
                explain.
              </p>
              <p>
                Meanwhile the authors I knew were spending money on ads before
                they had fixed their categories, and launching books in four days
                that needed twelve weeks. Not for lack of effort. For lack of
                anyone telling them the order.
              </p>
              <p>
                So we built a club with a desk attached. You get the book
                conversation you came for, and the author gets an hour with a
                room of readers who will tell them the truth about their blurb.
                Both halves make the other one better.
              </p>
            </div>
            <p className="mt-8 font-display text-lg text-navy">
              {site.founder.name}
              <span className="ml-2 text-sm not-italic text-navy/55">
                {site.founder.role}
              </span>
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:pl-6">
            <figure className="border-l-2 border-brass pl-7">
              <blockquote className="font-display text-[clamp(1.5rem,3vw,2.1rem)] italic leading-snug text-navy">
                A book club is the cheapest focus group an author will ever sit
                in, and the only one that reads the whole thing first.
              </blockquote>
            </figure>

            <dl className="mt-12 space-y-7">
              {[
                ["Where", `${site.meeting.platform}, link by email`],
                ["How often", site.meeting.cadence],
                ["Hosted by", `${site.host.name}, ${site.host.role}`],
                ["Cost", "Free, with nothing to upgrade to"],
              ].map(([term, value]) => (
                <div
                  key={term}
                  className="flex items-baseline justify-between gap-6 border-b border-navy/10 pb-3"
                >
                  <dt className="text-sm text-navy/55">{term}</dt>
                  <dd className="text-right font-display text-lg text-navy">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------- open call */}
      <section className="relative overflow-hidden bg-navy text-parchment">
        <Photo
          src={site.images.openCall}
          alt=""
          seed={5}
          className="absolute inset-y-0 right-0 hidden w-1/2 opacity-40 lg:block"
          sizes="50vw"
        />
        <div className="arc-frame left-[-140px] top-24 h-[420px] w-[640px] text-brass" />
        <div className="relative mx-auto max-w-6xl px-5 py-24">
          <Reveal className="max-w-2xl">
            <p className="font-display text-base italic text-brass-light">
              Authors
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4.5vw,3.2rem)] leading-tight">
              {site.openCall.heading}
            </h2>
            <p className="mt-6 max-w-reading leading-relaxed text-parchment/75">
              {site.openCall.body}
            </p>
            <Link
              href="/picks"
              className="mt-9 inline-block rounded-full border border-brass px-7 py-3 text-sm text-brass-light transition-colors hover:bg-brass hover:text-navy-deep"
            >
              {site.openCall.cta}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------------- blog */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-[clamp(1.9rem,4vw,2.9rem)] leading-tight text-navy">
              The Margin
            </h2>
            <p className="mt-4 max-w-reading leading-relaxed text-navy/70">
              What we work through at the selling desk, written down so it
              outlives the call.
            </p>
          </div>
          <Link href="/blog" className="link-underline pb-1 text-sm text-navy">
            All posts
          </Link>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-navy/15 bg-navy/15 md:grid-cols-3">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-parchment p-8 transition-colors hover:bg-white/70"
            >
              <p className="text-xs text-navy/45">
                {post.dateLabel} · {post.readingTime}
              </p>
              <h3 className="mt-4 font-display text-2xl leading-snug text-navy">
                {post.title}
              </h3>
              <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-navy/70">
                {post.excerpt}
              </p>
              <span className="mt-6 text-sm text-brass-deep">Read</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- community */}
      <section className="relative overflow-hidden border-y border-navy/10 bg-parchment-warm">
        <Photo
          src={site.images.community}
          alt=""
          seed={7}
          tone="parchment"
          duotone={false}
          className="absolute inset-y-0 right-0 hidden w-2/5 opacity-25 md:block"
          sizes="40vw"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-20 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(1.7rem,3.5vw,2.4rem)] leading-tight text-navy">
              The conversation keeps going between sessions
            </h2>
            <p className="mt-4 leading-relaxed text-navy/70">
              Post a question, put a book forward, or work through something you
              are stuck on. Members react so the good threads rise.
            </p>
          </div>
          <Link
            href="/community"
            className="shrink-0 rounded-full bg-navy px-7 py-3 text-sm text-parchment transition-colors hover:bg-navy-soft"
          >
            Open the board
          </Link>
        </div>
      </section>

      {/* --------------------------------------------------------------- join */}
      <section id="join" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="font-display text-[clamp(1.9rem,4vw,2.9rem)] leading-tight text-navy">
                Join the club
              </h2>
              <p className="mt-5 max-w-reading leading-relaxed text-navy/70">
                {site.meeting.note}
              </p>
              <div className="rule-brass mt-9 max-w-xs" />
              <p className="mt-9 text-sm text-navy/55">
                Prefer email? Write to{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline pb-0.5 text-navy"
                >
                  {site.email}
                </a>
              </p>
            </div>

            <JoinForm />
          </div>
        </div>
      </section>
    </>
  );
}
