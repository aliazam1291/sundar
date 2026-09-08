"use client";

import { useState } from "react";
import { SpiceIcon } from "@/components/spice-icons";

/**
 * The enquiry form — general questions and distributor leads in one place.
 *
 * This used to `setTimeout` for 1.2s and then show "Dhanyawaad!", which meant
 * every enquiry ever typed into it was thrown away while telling the sender it
 * had arrived. There is no backend in this project, so the form now hands the
 * filled-in enquiry to the visitor's own mail client addressed to customer
 * care. That actually delivers, and it cannot silently lose a lead.
 *
 * To move to a real endpoint later, replace the body of `handleSubmit` with a
 * POST and keep everything else: the fields below are the ones sales asked for
 * (name, phone, city, enquiry type) and are worth keeping whatever the
 * transport is.
 */

const INBOX = "customercare@sundermasala.com";

/* "Distributor / wholesale" is first because it is the enquiry the business
   most wants to receive, and the one the old form gave nowhere to declare. */
const TOPICS = [
  "Distributor / wholesale enquiry",
  "Product question",
  "Order support",
  "Something else",
];

const EMPTY = { name: "", phone: "", email: "", city: "", topic: TOPICS[0], message: "" };

const field =
  "w-full rounded-xl border-2 border-ink/20 bg-paper/50 px-4 py-3 text-copy text-ink placeholder:text-ink/40 focus:border-marigold focus:outline-none";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState(EMPTY);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = [
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `City: ${form.city}`,
      `Enquiry: ${form.topic}`,
      "",
      form.message,
    ].join("\n");

    window.location.href =
      `mailto:${INBOX}` +
      `?subject=${encodeURIComponent(`${form.topic} — ${form.name}`)}` +
      `&body=${encodeURIComponent(body)}`;

    setSent(true);
  };

  return (
    <div className="card-poster card-pad bg-paper text-ink" style={{ "--card-shadow": "var(--color-marigold)" }}>
      <h2 className="h-poster-xs text-ink mb-6 text-[1.8rem]">Send us a message</h2>

      {sent ? (
        <div className="card-poster card-pad bg-forest text-ghee flex flex-col items-center text-center gap-4 py-8">
          <SpiceIcon name="pinch" className="w-12 text-marigold" />
          <h3 className="h-poster-xs text-marigold">Almost there!</h3>
          <p className="text-copy text-ghee/90 max-w-sm">
            Your mail app should have opened with the enquiry ready to send — press send and it
            reaches us. If nothing opened, write to{" "}
            <a href={`mailto:${INBOX}`} className="font-semibold text-marigold underline">
              {INBOX}
            </a>{" "}
            or call 77249 99871.
          </p>
          <button onClick={() => { setSent(false); setForm(EMPTY); }} className="btn btn-gold btn-sm mt-4">
            Write another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-5">
          <div>
            <label htmlFor="contact-name" className="eyebrow block text-ink-soft mb-2">
              Your name
            </label>
            <input
              id="contact-name" type="text" name="name" required autoComplete="name"
              value={form.name} onChange={handleChange}
              placeholder="e.g. Ramesh Kumar" className={field}
            />
          </div>

          {/* Phone and city side by side: two short fields, and a distributor
              lead is close to useless without both. */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-phone" className="eyebrow block text-ink-soft mb-2">
                Phone number
              </label>
              <input
                id="contact-phone" type="tel" name="phone" required autoComplete="tel"
                inputMode="tel" pattern="[0-9+ ()-]{7,}"
                value={form.phone} onChange={handleChange}
                placeholder="98765 43210" className={field}
              />
            </div>
            <div>
              <label htmlFor="contact-city" className="eyebrow block text-ink-soft mb-2">
                City
              </label>
              <input
                id="contact-city" type="text" name="city" required autoComplete="address-level2"
                value={form.city} onChange={handleChange}
                placeholder="e.g. Indore" className={field}
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-email" className="eyebrow block text-ink-soft mb-2">
              Email address
            </label>
            <input
              id="contact-email" type="email" name="email" required autoComplete="email"
              value={form.email} onChange={handleChange}
              placeholder="you@example.com" className={field}
            />
          </div>

          <div>
            <label htmlFor="contact-topic" className="eyebrow block text-ink-soft mb-2">
              Enquiry related to
            </label>
            <select
              id="contact-topic" name="topic" required
              value={form.topic} onChange={handleChange}
              className={field}
            >
              {TOPICS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="contact-message" className="eyebrow block text-ink-soft mb-2">
              How can we help?
            </label>
            <textarea
              id="contact-message" name="message" required rows={4}
              value={form.message} onChange={handleChange}
              placeholder="Formats and monthly volume if you are a distributor, or your blend question."
              className={`${field} resize-none`}
            />
          </div>

          <button type="submit" className="btn btn-hot justify-center w-full mt-2">
            <SpiceIcon mono name="truck" className="w-4" />
            Submit enquiry
          </button>
        </form>
      )}
    </div>
  );
}
