"use client";

import { useState } from "react";
import { SpiceIcon } from "@/components/spice-icons";

export default function ContactForm() {
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate form submission
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div 
      className="card-poster card-pad bg-paper text-ink"
      style={{ "--card-shadow": "var(--color-marigold)" }}
    >
      <h2 className="h-poster-xs text-ink mb-6 text-[1.8rem]">Send us a message</h2>

      {status === "success" ? (
        <div className="card-poster card-pad bg-forest text-ghee flex flex-col items-center text-center gap-4 py-8">
          <SpiceIcon name="pinch" className="w-12 text-marigold animate-bounce" />
          <h3 className="h-poster-xs text-marigold">Dhanyawaad!</h3>
          <p className="text-copy text-ghee/90 max-w-sm">
            We have received your message. A member of our family will get back to you soon.
          </p>
          <button 
            onClick={() => setStatus(null)}
            className="btn btn-gold btn-sm mt-4"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-5">
          <div>
            <label htmlFor="contact-name" className="eyebrow block text-ink-soft mb-2">
              Your name
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Ramesh Kumar"
              className="w-full rounded-xl border-2 border-ink/20 bg-paper/50 px-4 py-3 text-copy text-ink placeholder:text-ink/40 focus:border-marigold focus:outline-none"
              disabled={status === "submitting"}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="eyebrow block text-ink-soft mb-2">
              Email address
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-xl border-2 border-ink/20 bg-paper/50 px-4 py-3 text-copy text-ink placeholder:text-ink/40 focus:border-marigold focus:outline-none"
              disabled={status === "submitting"}
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="eyebrow block text-ink-soft mb-2">
              How can we help?
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about the blend questions or distribution requirements..."
              className="w-full rounded-xl border-2 border-ink/20 bg-paper/50 px-4 py-3 text-copy text-ink placeholder:text-ink/40 focus:border-marigold focus:outline-none resize-none"
              disabled={status === "submitting"}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-hot justify-center w-full mt-2"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? (
              <span className="flex items-center gap-2">
                Sending...
              </span>
            ) : (
              <>
                <SpiceIcon mono name="truck" className="w-4" />
                Submit enquiry
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
