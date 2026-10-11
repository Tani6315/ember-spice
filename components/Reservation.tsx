"use client";

import { useEffect, useMemo, useState } from "react";
import { booking, site } from "@/data/site";

// ------------------------------------------------------------
// Date and time helpers (all in the visitor's local time)
// ------------------------------------------------------------

// "2026-10-12" built from LOCAL date parts (toISOString uses UTC and can
// give the wrong day in Pakistan and other UTC+ time zones).
function toKey(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

// The exact moment of a slot on a given day.
function slotDate(dayKey: string, slot: string) {
  const [y, mo, d] = dayKey.split("-").map(Number);
  const [h, mi] = slot.split(":").map(Number);
  return new Date(y, mo - 1, d, h, mi);
}

// "19:00" -> "7:00 PM"
function to12h(slot: string) {
  const [h, m] = slot.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${suffix}`;
}

// "Sun, 12 Oct 2026"
function niceDate(d: Date) {
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

// A slot can be booked only if it starts at least `minHoursAhead` from now.
function isBookable(dayKey: string, slot: string, now: Date) {
  const earliest = now.getTime() + booking.minHoursAhead * 60 * 60 * 1000;
  return slotDate(dayKey, slot).getTime() >= earliest;
}

// ------------------------------------------------------------
// Input rules
// ------------------------------------------------------------

// Name: letters (any language, e.g. English or Urdu) and single spaces only.
function cleanName(value: string) {
  return value.replace(/[^\p{L}\s]/gu, "").replace(/\s{2,}/g, " ").replace(/^\s+/, "");
}

// Phone: digits only. Pasted numbers like "+92 300-123 4567" become "923001234567".
const PHONE_MIN = 10;
const PHONE_MAX = 15;
function cleanPhone(value: string) {
  return value.replace(/\D/g, "").slice(0, PHONE_MAX);
}

type Day = { key: string; label: string };

function buildDays(now: Date): Day[] {
  const days: Day[] = [];
  for (let i = 0; i < booking.daysAhead; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const key = toKey(d);
    // Skip a day if none of its slots can still be booked (e.g. today, late at night).
    if (!booking.slots.some((s) => isBookable(key, s, now))) continue;
    const prefix = i === 0 ? "Today · " : i === 1 ? "Tomorrow · " : "";
    days.push({ key, label: prefix + niceDate(d) });
  }
  return days;
}

// ------------------------------------------------------------
// Sending the request
// ------------------------------------------------------------

type Booking = { name: string; phone: string; date: string; time: string; guests: string; note: string };

function bookingText(b: Booking) {
  return [
    `Hi ${site.name}, I'd like to book a table.`,
    `Name: ${b.name}`,
    `Phone: ${b.phone}`,
    `Date: ${b.date}`,
    `Time: ${b.time}`,
    `Guests: ${b.guests}`,
    b.note ? `Note: ${b.note}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendEmail(b: Booking) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: booking.web3formsKey,
      subject: `New table booking: ${b.date}, ${b.time} (${b.guests} guests)`,
      from_name: `${site.name} website`,
      ...b,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    // Web3Forms explains what went wrong in `message` (wrong key, blocked domain, etc.)
    console.error("Web3Forms error:", res.status, data);
    throw new Error(data.message || `HTTP ${res.status}`);
  }
}

// ------------------------------------------------------------
// Component
// ------------------------------------------------------------

export default function Reservation() {
  // `now` is set only in the browser. The site is pre-built as static HTML,
  // so any date calculated at build time would be out of date.
  const [now, setNow] = useState<Date | null>(null);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [toast, setToast] = useState(false);

  // Hide the success notification after 5 seconds.
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(false), 5000);
    return () => clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    setNow(new Date());
    // Refresh every minute so slots disappear if the page stays open.
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const days = useMemo(() => (now ? buildDays(now) : []), [now]);
  const slots = useMemo(
    () => (now && day ? booking.slots.filter((s) => isBookable(day, s, now)) : []),
    [now, day]
  );

  // Clear a chosen day or time that is no longer valid.
  useEffect(() => {
    if (day && !days.some((d) => d.key === day)) setDay("");
  }, [days, day]);
  useEffect(() => {
    if (time && !slots.includes(time)) setTime("");
  }, [slots, time]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // Final check at the moment of sending.
    const checkNow = new Date();
    if (!day || !time || !isBookable(day, time, checkNow)) {
      setNow(checkNow);
      setTime("");
      setError(`Please choose a time at least ${booking.minHoursAhead} hours from now.`);
      return;
    }

    const cleanNameValue = name.trim();
    if (cleanNameValue.length < 2) {
      setError("Please enter your name using letters only.");
      return;
    }
    if (phone.length < PHONE_MIN) {
      setError(`Please enter a valid phone number (${PHONE_MIN}–${PHONE_MAX} digits, numbers only).`);
      return;
    }

    const f = new FormData(e.currentTarget);
    const b: Booking = {
      name: cleanNameValue,
      phone,
      date: niceDate(slotDate(day, time)),
      time: to12h(time),
      guests: String(f.get("guests")),
      note: String(f.get("note") || "").trim(),
    };

    // Open WhatsApp first: browsers block pop-ups opened after a network wait.
    if (booking.method !== "email") {
      window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(bookingText(b))}`, "_blank");
    }

    if (booking.method !== "whatsapp") {
      setStatus("sending");
      try {
        await sendEmail(b);
      } catch (err) {
        setStatus("idle");
        const reason = err instanceof Error ? err.message : "Network error";
        setError(`Sorry, we couldn't send your request (${reason}). Please call us at ${site.phone}.`);
        return;
      }
    }

    setStatus("sent");
    setToast(true);
  }

  const field =
    "w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-cream placeholder:text-sand/50 outline-none transition focus:border-ember disabled:opacity-50";

  const sentMessage =
    booking.method === "email"
      ? "We've received your request and will confirm your table by phone shortly."
      : "Your booking details opened in WhatsApp. Send the message and we'll confirm your table shortly.";

  return (
    <section id="reserve" className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      {toast && (
        <div
          role="status"
          className="rise fixed inset-x-4 bottom-24 z-50 mx-auto flex max-w-sm items-center gap-3 rounded-2xl border border-emerald-400/30 bg-ink/95 px-5 py-4 shadow-2xl backdrop-blur"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-ink">✓</span>
          <div className="flex-1">
            <p className="font-semibold">Booking request sent</p>
            <p className="text-sm text-sand">We&apos;ll call you to confirm your table.</p>
          </div>
          <button onClick={() => setToast(false)} aria-label="Close" className="text-sand hover:text-cream">
            ✕
          </button>
        </div>
      )}
      <div className="grid gap-12 overflow-hidden rounded-[2rem] bg-gradient-to-br from-coal to-char p-7 md:grid-cols-5 md:p-14">
        <div className="md:col-span-2">
          <p className="text-xs uppercase tracking-[0.25em] text-saffron">Reservations</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight">Save your seat at the table</h2>
          <p className="mt-5 text-sand">
            Book at least {booking.minHoursAhead} hours ahead. For same-day tables, groups larger than 12 or private
            events, call us at{" "}
            <a href={`tel:${site.phone}`} className="text-cream underline underline-offset-4">
              {site.phone}
            </a>
            .
          </p>
        </div>

        {status === "sent" ? (
          <div className="flex flex-col items-start justify-center rounded-2xl border border-ember/30 bg-ink/40 p-8 md:col-span-3">
            <p className="font-display text-3xl font-semibold">Request sent ✓</p>
            <p className="mt-3 text-sand">{sentMessage}</p>
            <button
              onClick={() => {
                setStatus("idle");
                setDay("");
                setTime("");
                setName("");
                setPhone("");
              }}
              className="mt-6 text-sm text-saffron underline underline-offset-4"
            >
              Make another booking
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2 md:col-span-3">
            <label>
              <span className="mb-1.5 block text-sm text-sand">Full name</span>
              <input
                name="name"
                required
                placeholder="Your name"
                autoComplete="name"
                maxLength={50}
                value={name}
                onChange={(e) => setName(cleanName(e.target.value))}
                className={field}
              />
            </label>
            <label>
              <span className="mb-1.5 block text-sm text-sand">Phone</span>
              <input
                name="phone"
                type="tel"
                inputMode="numeric"
                required
                placeholder="03001234567"
                autoComplete="tel"
                maxLength={PHONE_MAX}
                value={phone}
                onChange={(e) => setPhone(cleanPhone(e.target.value))}
                className={field}
              />
            </label>

            <label>
              <span className="mb-1.5 block text-sm text-sand">Date</span>
              <select
                name="date"
                required
                value={day}
                onChange={(e) => setDay(e.target.value)}
                disabled={!now}
                className={field}
              >
                <option value="" disabled>
                  {now ? "Choose a date" : "Loading dates…"}
                </option>
                {days.map((d) => (
                  <option key={d.key} value={d.key}>
                    {d.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="mb-1.5 block text-sm text-sand">Time</span>
              <select
                name="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={!day}
                className={field}
              >
                <option value="" disabled>
                  {day ? "Choose a time" : "Choose a date first"}
                </option>
                {slots.map((s) => (
                  <option key={s} value={s}>
                    {to12h(s)}
                  </option>
                ))}
              </select>
            </label>

            <label className="sm:col-span-2">
              <span className="mb-1.5 block text-sm text-sand">Guests</span>
              <select name="guests" required className={field} defaultValue="2">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
            </label>
            <label className="sm:col-span-2">
              <span className="mb-1.5 block text-sm text-sand">Special request (optional)</span>
              <textarea name="note" rows={3} placeholder="Birthday, high chair, window seat…" className={field} />
            </label>

            {error && (
              <p role="alert" className="rounded-xl bg-ember/10 px-4 py-3 text-sm text-ember sm:col-span-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-full bg-ember py-3.5 font-semibold text-ink transition hover:bg-saffron disabled:opacity-60 sm:col-span-2"
            >
              {status === "sending" ? "Sending…" : "Request booking"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
