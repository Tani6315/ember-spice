import SafeImage from "./SafeImage";
import { images } from "@/data/site";

export default function Gallery() {
  const [a, b, c, d, e, f] = images.gallery;
  return (
    <section id="gallery" className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-saffron">Gallery</p>
          <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">A look inside</h2>
        </div>
        <a href="#" className="text-sm text-sand underline-offset-4 hover:text-cream hover:underline">
          More on Instagram →
        </a>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-4">
        <SafeImage src={a} alt="Dining room" className="col-span-2 row-span-2 aspect-square h-full w-full rounded-2xl md:aspect-auto" />
        <SafeImage src={b} alt="Shared platter" className="aspect-square w-full rounded-2xl" />
        <SafeImage src={c} alt="Fresh dishes" className="aspect-square w-full rounded-2xl" />
        <SafeImage src={d} alt="Salad bowl" className="aspect-square w-full rounded-2xl" />
        <SafeImage src={e} alt="Stone-baked bread" className="aspect-square w-full rounded-2xl" />
        <SafeImage src={f} alt="Dessert" className="col-span-2 aspect-[2/1] w-full rounded-2xl md:hidden" />
      </div>
    </section>
  );
}
