import SafeImage from "./SafeImage";
import { images, site } from "@/data/site";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[92vh] items-end overflow-hidden">
      <SafeImage src={images.hero} alt="Dinner table at Ember & Spice" className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-32 md:pb-28">
        <p className="rise mb-5 inline-flex items-center gap-2 rounded-full border border-saffron/30 bg-ink/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-saffron">
          <span className="h-1.5 w-1.5 rounded-full bg-ember" />
          Open tonight until 11 PM
        </p>
        <h1 className="rise-2 max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
          Fire, spice, and food worth gathering for.
        </h1>
        <p className="rise-3 mt-6 max-w-xl text-lg text-sand">
          Charcoal grills, slow-cooked curries and naan straight from the tandoor. {site.name} brings
          the flavours of a desi kitchen to your table.
        </p>
        <div className="rise-3 mt-9 flex flex-wrap gap-3">
          <a href="#reserve" className="rounded-full bg-ember px-7 py-3.5 font-semibold text-ink transition hover:bg-saffron">
            Reserve a table
          </a>
          <a href="#menu" className="rounded-full border border-cream/25 px-7 py-3.5 font-semibold transition hover:border-cream/60">
            View the menu
          </a>
        </div>
      </div>
    </section>
  );
}
