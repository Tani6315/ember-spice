import SafeImage from "./SafeImage";
import { images } from "@/data/site";

const stats = [
  { value: "12", label: "Years over coal" },
  { value: "40+", label: "Dishes on the menu" },
  { value: "4.9", label: "Average guest rating" },
];

export default function About() {
  return (
    <section id="about" className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:py-32">
      <div className="relative">
        <SafeImage src={images.about} alt="Inside the Ember & Spice dining room" className="aspect-[4/5] w-full rounded-3xl" />
        <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-ember px-6 py-5 text-ink shadow-2xl md:block">
          <p className="font-display text-3xl font-semibold">Since 2014</p>
          <p className="text-sm font-medium">Family recipes, open kitchen</p>
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-saffron">Our story</p>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">
          A family kitchen that never let the fire go out.
        </h2>
        <p className="mt-6 text-sand">
          It started with one charcoal grill and our grandmother&apos;s spice box. Today every kebab is still
          hand-shaped each morning, every curry starts with whole spices toasted in the pan, and the naan goes
          from dough to table in under three minutes.
        </p>
        <p className="mt-4 text-sand">
          Come for a quick lunch, a long family dinner, or a celebration. There&apos;s always room at the table.
        </p>

        <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl font-semibold text-saffron md:text-4xl">{s.value}</dd>
              <dd className="mt-1 text-xs text-sand md:text-sm">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
