import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { faqs, site } from "@/content/site";

export const metadata = {
  title: "FAQs",
  description:
    "How sessions run, how often we meet, what it costs, and how authors get spotlighted.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQs"
        title="Questions people actually ask"
        lede="If yours is not here, write to us. We answer everything."
      />

      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="border-t border-navy/15">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group border-b border-navy/15 py-6"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                <h2 className="font-display text-xl leading-snug text-navy sm:text-2xl">
                  {item.q}
                </h2>
                <span
                  aria-hidden="true"
                  className="mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-brass-deep">
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      className="origin-center transition-transform duration-300 group-open:rotate-45"
                    />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 max-w-reading leading-relaxed text-navy/75">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-14 border border-navy/15 bg-white/60 p-8">
          <h2 className="font-display text-2xl text-navy">Still stuck?</h2>
          <p className="mt-3 leading-relaxed text-navy/70">
            Email{" "}
            <a
              href={`mailto:${site.email}`}
              className="link-underline pb-0.5 text-navy"
            >
              {site.email}
            </a>{" "}
            or post it on{" "}
            <Link href="/community" className="link-underline pb-0.5 text-navy">
              the board
            </Link>
            , where a member will probably get to it first.
          </p>
        </div>
      </section>
    </>
  );
}
