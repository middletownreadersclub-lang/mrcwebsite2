import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { site } from "@/content/site";

export const metadata = {
  title: "Contact",
  description: `Write to ${site.name} at ${site.email}.`,
};

const reasons = [
  {
    heading: "You want to join",
    body: "The form on the home page is faster, but email works just as well. Tell us your name and we will add you to the schedule.",
    href: "/#join",
    label: "Use the join form",
  },
  {
    heading: "You have a book",
    body: "Send the title, the genre, a link if there is one, and what you would want the selling desk to look at. We reply either way.",
    href: "/picks",
    label: "Pitch your book",
  },
  {
    heading: "Something else",
    body: "A correction, a partnership, a member who is being a problem, or a question the FAQs did not answer. All of it comes to the same inbox.",
    href: "/faq",
    label: "Read the FAQs first",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="One inbox, read by people"
        lede="There is no ticketing system and no autoresponder. Mail goes to the founder and the host, and gets answered."
      />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <a
          href={`mailto:${site.email}`}
          className="group block border-y border-navy/15 py-12 text-center transition-colors hover:bg-white/50"
        >
          <span className="block text-sm text-navy/55">Write to us at</span>
          <span className="mt-3 block break-all font-display text-[clamp(1.6rem,5vw,3rem)] text-navy">
            {site.email}
          </span>
          <span className="mx-auto mt-6 block h-px w-0 bg-brass transition-all duration-500 group-hover:w-40" />
        </a>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {reasons.map((reason) => (
            <div key={reason.heading} className="border-t border-navy/15 pt-5">
              <h2 className="font-display text-xl text-navy">
                {reason.heading}
              </h2>
              <p className="mt-3 leading-relaxed text-navy/70">{reason.body}</p>
              <Link
                href={reason.href}
                className="link-underline mt-5 inline-block pb-0.5 text-sm text-brass-deep"
              >
                {reason.label}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
