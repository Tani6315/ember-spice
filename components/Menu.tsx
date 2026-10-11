"use client";

import { useState } from "react";
import { menu } from "@/data/site";

const categories = Object.keys(menu);

const tagStyle: Record<string, string> = {
  "Chef's pick": "bg-saffron/15 text-saffron",
  Spicy: "bg-ember/15 text-ember",
  Vegetarian: "bg-emerald-400/10 text-emerald-300",
  New: "bg-cream/10 text-cream",
};

export default function Menu() {
  const [active, setActive] = useState(categories[0]);

  return (
    <section id="menu" className="grain relative bg-char py-24 md:py-32">
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-saffron">The menu</p>
          <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">Made fresh, every day</h2>
        </div>

        <div className="-mx-5 mt-10 overflow-x-auto px-5">
          <div role="tablist" className="mx-auto flex w-max gap-2 rounded-full border border-white/10 p-1.5">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={active === c}
                onClick={() => setActive(c)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition ${
                  active === c ? "bg-ember text-ink" : "text-sand hover:text-cream"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <ul key={active} className="rise mx-auto mt-12 grid max-w-4xl gap-x-12 gap-y-8 md:grid-cols-2">
          {menu[active].map((item) => (
            <li key={item.name}>
              <div className="flex items-baseline gap-3">
                <h3 className="font-display text-xl font-semibold">{item.name}</h3>
                <span className="flex-1 translate-y-[-4px] border-b border-dotted border-white/20" />
                <span className="font-display text-xl font-semibold text-saffron">${item.price}</span>
              </div>
              <p className="mt-1.5 text-sm text-sand">{item.description}</p>
              {item.tag && (
                <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${tagStyle[item.tag]}`}>
                  {item.tag}
                </span>
              )}
            </li>
          ))}
        </ul>

        <p className="mt-14 text-center text-sm text-sand">
          Allergies or dietary needs? Tell your server and our chefs will adjust any dish.
        </p>
      </div>
    </section>
  );
}
