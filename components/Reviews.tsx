import { reviews } from "@/data/site";

export default function Reviews() {
  return (
    <section id="reviews" className="grain relative bg-char py-24 md:py-32">
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-saffron">Guest reviews</p>
          <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">What our guests say</h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-3xl border border-white/10 bg-ink/50 p-7">
              <div className="text-saffron" aria-label={`${r.rating} out of 5 stars`}>
                {"★".repeat(r.rating)}
              </div>
              <blockquote className="mt-4 font-display text-lg leading-relaxed">&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption className="mt-5 text-sm text-sand">— {r.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
