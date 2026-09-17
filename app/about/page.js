import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import { site } from "@/content/site";

export const metadata = {
  title: "About",
  description:
    "A virtual book club that reads three to four times a month, puts the author on the call, and spends the last half hour on what actually sells books.",
};

const people = [
  {
    name: site.founder.name,
    role: site.founder.role,
    body: "Started the club after one too many author calls where the writing questions got real answers and the selling questions got a shrug. Runs the selling desk.",
  },
  {
    name: site.host.name,
    role: site.host.role,
    body: "Runs the room. Keeps the discussion moving, makes sure quieter members get their question in, and protects the author from the one person who wants to talk about their own manuscript.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A reading room with a desk attached"
        lede="We are a virtual club, three to four sessions a month, built around one idea: the conversation an author has with real readers is also the most useful market research they will ever get."
        facts={[
          ["Where", "Zoom"],
          ["How often", "3–4 a month"],
          ["Cost", "Free"],
          ["Founded by", site.founder.name],
        ]}
      />

      <Photo
        src={site.images.about}
        alt="Members of the club reading"
        seed={3}
        className="h-[34vh] min-h-[220px] w-full"
        sizes="100vw"
      />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr]">
          <div className="max-w-reading space-y-6 leading-relaxed text-navy/80">
            <p>
              Most book clubs are built for readers, and most author events are
              built for publicity. Both are fine. Neither does much for a writer
              who has published their own book and now has to work out why nobody
              can find it.
            </p>
            <p>
              So we built something in between. The first hour belongs to the
              readers — the book, the argument about the ending, the questions
              only people who finished it would ask. The last half hour belongs
              to the work: what the author has tried, what is not moving, and the
              one change worth making this week.
            </p>
            <p>
              Members who have never written a word get a great deal out of that
              second half, because it turns out the reasons a book reaches you or
              does not are genuinely interesting. And authors get a room of
              people who read the whole thing and will tell them the truth.
            </p>

            <h2 className="pt-6 font-display text-2xl text-navy">
              Who this is for
            </h2>
            <p>
              Readers who want more than a monthly meeting. Self-published and
              small-press authors who are doing their own marketing. Anyone
              curious about how a book actually gets into somebody&rsquo;s hands,
              which is a stranger process than most people assume.
            </p>

            <h2 className="pt-6 font-display text-2xl text-navy">
              What we do not do
            </h2>
            <p>
              We do not charge authors for a spotlight, we do not promise sales,
              and we do not run paid tiers. The club works because the room is
              honest, and that stops being true the moment somebody is paying to
              be in it.
            </p>
          </div>

          <div className="space-y-10">
            {people.map((person, i) => (
              <Reveal key={person.name} delay={i * 100}>
                <div className="border-t border-navy/15 pt-6">
                  <h3 className="font-display text-2xl text-navy">
                    {person.name}
                  </h3>
                  <p className="mt-1 text-sm text-brass-deep">{person.role}</p>
                  <p className="mt-4 leading-relaxed text-navy/70">
                    {person.body}
                  </p>
                </div>
              </Reveal>
            ))}

            <div className="border border-navy/15 bg-white/60 p-7">
              <p className="font-display text-xl text-navy">
                Sessions run on {site.meeting.platform}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-navy/70">
                {site.meeting.note}
              </p>
              <Link
                href="/#join"
                className="mt-6 inline-block rounded-full bg-navy px-6 py-2.5 text-sm text-parchment transition-colors hover:bg-navy-soft"
              >
                Join the club
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
