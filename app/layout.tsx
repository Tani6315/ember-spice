import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ember & Spice | Grill and Desi Kitchen",
  description:
    "Charcoal grills, slow-cooked curries and fresh tandoor bread. Book a table at Ember & Spice.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
