import Link from "next/link";
import { Emblem } from "./Logo";
import { nav, site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-parchment">
      <div className="arc-frame left-1/2 top-16 h-[520px] w-[820px] -translate-x-1/2 text-brass" />

      <div className="relative mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Emblem className="h-16 w-auto" navy="#F7F3EA" brass="#C2A04A" />
            <p className="mt-5 max-w-sm font-display text-2xl leading-snug">
              {site.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-2 md:items-end">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-parchment/70 transition-colors hover:text-brass-light"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="rule-brass my-10 opacity-40" />

        <div className="flex flex-col gap-3 text-sm text-parchment/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Meeting on{" "}
            {site.meeting.platform}, {site.meeting.cadence}.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="link-underline pb-0.5 text-parchment/70"
          >
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
