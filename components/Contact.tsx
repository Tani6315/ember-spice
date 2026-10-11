import { site } from "@/data/site";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-white/5">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-3">
        <div>
          <h3 className="font-display text-2xl font-semibold">Find us</h3>
          <p className="mt-4 text-sand">{site.address}</p>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-saffron underline underline-offset-4"
          >
            Get directions →
          </a>
        </div>

        <div>
          <h3 className="font-display text-2xl font-semibold">Opening hours</h3>
          <dl className="mt-4 space-y-2">
            {site.hours.map((h) => (
              <div key={h.day} className="flex justify-between gap-4 text-sm">
                <dt className="text-sand">{h.day}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h3 className="font-display text-2xl font-semibold">Get in touch</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`tel:${site.phone}`} className="text-sand hover:text-cream">{site.phone}</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="text-sand hover:text-cream">{site.email}</a>
            </li>
            <li>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-sand hover:text-cream">
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
