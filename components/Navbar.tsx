"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

const links = [
  { href: "#about", label: "About" },
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Visit" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-ink/95 backdrop-blur border-b border-white/5" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="font-display text-xl font-semibold tracking-tight">
          Ember <span className="text-ember">&amp;</span> Spice
        </a>

        <ul className="hidden items-center gap-8 text-sm text-sand md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition hover:text-cream">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#reserve"
          className="hidden rounded-full bg-ember px-5 py-2 text-sm font-semibold text-ink transition hover:bg-saffron md:inline-block"
        >
          Book a table
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className="relative block h-4 w-6">
            <span className={`absolute left-0 h-0.5 w-6 bg-cream transition ${open ? "top-2 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-2 h-0.5 w-6 bg-cream transition ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-0.5 w-6 bg-cream transition ${open ? "top-2 -rotate-45" : "top-4"}`} />
          </span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/5 px-5 pb-6 md:hidden">
          <ul className="flex flex-col gap-1 py-3">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block py-3 text-lg text-sand">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#reserve"
            onClick={() => setOpen(false)}
            className="block rounded-full bg-ember py-3 text-center font-semibold text-ink"
          >
            Book a table
          </a>
          <a href={`tel:${site.phone}`} className="mt-3 block text-center text-sm text-sand">
            Or call {site.phone}
          </a>
        </div>
      )}
    </header>
  );
}
