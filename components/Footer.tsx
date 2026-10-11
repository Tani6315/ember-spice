import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-char">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-sand md:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href={site.social.instagram} className="hover:text-cream">Instagram</a>
          <a href={site.social.facebook} className="hover:text-cream">Facebook</a>
          <a href={site.social.tiktok} className="hover:text-cream">TikTok</a>
        </div>
      </div>
    </footer>
  );
}
