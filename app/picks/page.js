import PageHeader from "@/components/PageHeader";
import PitchForm from "@/components/PitchForm";
import Reveal from "@/components/Reveal";
import { site } from "@/content/site";

export const metadata = {
  title: "Our Picks",
  description:
    "The books we have read and the authors who joined us, plus the open call for our first season of spotlights.",
};

// A typographic cover plate — used until an author supplies real cover art.
function CoverPlate({ title, author }) {
  return (
    <div className="flex aspect-[2/3] flex-col justify-between border border-navy/15 bg-navy p-6 text-parchment">
      <div className="h-px w-10 bg-brass" />
      <div>
        <p className="font-display text-2xl leading-snug">{title}</p>
        <p className="mt-3 text-sm text-parchment/60">{author}</p>
      </div>
      <div className="h-px w-full bg-parchment/15" />
    </div>
  );
}

export default function PicksPage() {
  const { spotlights } = site;

  return (
    <>
      <PageHeader
        eyebrow="Our Picks"
        title={
          spotlights.length
            ? "Every book we have read together"
            : "The shelf is empty, and that is the opportunity"
        }
        lede={
          spotlights.length
            ? "Each entry is a session: the book, the conversation, and the one thing the author left with."
            : "We have not run our first spotlight yet. Which means the next author we book gets a room of founding members, and a club that will still be talking about their book in a year."
        }
      />

      {spotlights.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {spotlights.map((pick, i) => (
              <Reveal key={pick.title} delay={(i % 3) * 90}>
                <article>
                  <CoverPlate title={pick.title} author={pick.author} />
                  <p className="mt-5 text-xs text-brass-deep">{pick.date}</p>
                  <h2 className="mt-2 font-display text-2xl text-navy">
                    {pick.title}
                  </h2>
                  <p className="mt-1 text-sm text-navy/60">{pick.author}</p>
                  <p className="mt-4 leading-relaxed text-navy/75">
                    {pick.blurb}
                  </p>
                  {pick.takeaway && (
                    <p className="mt-5 border-l-2 border-brass pl-4 text-sm leading-relaxed text-navy/65">
                      {pick.takeaway}
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------- open call */}
      <section className="border-y border-navy/10 bg-parchment-warm">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="font-display text-[clamp(1.9rem,4vw,2.9rem)] leading-tight text-navy">
                {site.openCall.heading}
              </h2>
              <p className="mt-6 max-w-reading leading-relaxed text-navy/75">
                {site.openCall.body}
              </p>

              <ul className="mt-9 space-y-4 text-navy/75">
                {[
                  "Your book gets read properly, by people who finish books.",
                  "Ninety minutes on Zoom: discussion, your questions, then the selling desk.",
                  "A written recap on the blog that keeps working after the call.",
                  "No fee, no tier, no upsell.",
                ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-brass" />
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <PitchForm />
          </div>
        </div>
      </section>
    </>
  );
}
