export default function PageHeader({ eyebrow, title, lede, facts }) {
  return (
    <section className="relative overflow-hidden border-b border-navy/10">
      <div className="arc-frame left-1/2 top-10 h-[360px] w-[620px] -translate-x-1/2 text-navy" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-20 lg:grid-cols-[1.6fr_1fr] lg:items-end">
        <div>
          {eyebrow && (
            <p className="font-display text-base italic text-brass-deep">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 font-display text-[clamp(2.4rem,6vw,4rem)] leading-[1.05] text-navy">
            {title}
          </h1>
          {lede && (
            <p className="mt-6 max-w-reading text-lg leading-relaxed text-navy/70">
              {lede}
            </p>
          )}
        </div>

        {facts && (
          <dl className="hidden lg:block">
            {facts.map(([term, value]) => (
              <div
                key={term}
                className="flex items-baseline justify-between gap-6 border-t border-navy/15 py-3"
              >
                <dt className="text-sm text-navy/55">{term}</dt>
                <dd className="text-right font-display text-lg text-navy">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
