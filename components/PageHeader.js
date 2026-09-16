export default function PageHeader({ eyebrow, title, lede }) {
  return (
    <section className="relative overflow-hidden border-b border-navy/10">
      <div className="arc-frame left-1/2 top-10 h-[360px] w-[620px] -translate-x-1/2 text-navy" />
      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-20">
        {eyebrow && (
          <p className="font-display text-base italic text-brass-deep">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.4rem,6vw,4rem)] leading-[1.05] text-navy">
          {title}
        </h1>
        {lede && (
          <p className="mt-6 max-w-reading text-lg leading-relaxed text-navy/70">
            {lede}
          </p>
        )}
      </div>
    </section>
  );
}
