# Ember & Spice

A restaurant website for a modern grill and desi kitchen, built with Next.js, TypeScript and Tailwind CSS.

**Live demo:** _coming soon_

## Features

- Responsive layout for mobile, tablet and desktop
- Menu with category tabs (Starters, Grill, Curries, Rice & Bread, Desserts)
- Table reservation form
  - Only future dates can be selected
  - Same-day bookings require a minimum lead time (5 hours by default)
  - Name and phone fields accept letters and digits only
  - Requests are delivered by email through Web3Forms, with optional WhatsApp hand-off
- Photo gallery, guest reviews, opening hours and contact details
- Floating WhatsApp chat button
- Static export: deploys to Vercel, Netlify or any standard web host

## Tech stack

| | |
| --- | --- |
| Framework | Next.js 15 (App Router, static export) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Forms | Web3Forms |
| Hosting | Vercel |

## Getting started

Requires Node.js 20 or later.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  layout.tsx        Page metadata and root layout
  page.tsx          Home page, assembles all sections
  globals.css       Theme colours, fonts and animations
components/         One file per section (Hero, Menu, Reservation, ...)
data/
  site.ts           All content and settings
```

## Configuration

All restaurant content lives in `data/site.ts`, so the site can be adapted for a new business without touching the components:

- `site`: name, phone, WhatsApp number, address, opening hours, social links
- `menu`: categories, dishes, descriptions and prices
- `reviews`: guest testimonials
- `images`: hero, about and gallery photos
- `booking`: delivery method, Web3Forms access key, minimum lead time, booking window and time slots

Brand colours are defined in the `@theme` block of `app/globals.css`.

## Deployment

The project is configured for static export (`output: "export"` in `next.config.ts`).

**Vercel:** import the repository at [vercel.com/new](https://vercel.com/new) and deploy with the default settings.

**Any other host:** run `npm run build` and upload the contents of the generated `out/` folder.

## Credits

Photography from [Unsplash](https://unsplash.com). Fonts: Fraunces and Inter from Google Fonts.
