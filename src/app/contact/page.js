import Link from "next/link";
import Bilingual, { DevaWatermark } from "@/components/bilingual";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";
import PagePortrait from "@/components/page-portrait";
import ContactForm from "@/components/contact-form";

export const metadata = {
  title: "Contact Us — Baat Karein",
  description: "Get in touch with Sunder Masala. Enquire about retail distribution, quick commerce availability, or spice blend formulations.",
  alternates: { canonical: "/contact" },
};

const QUICK_APPS = ["Blinkit", "Zepto", "Swiggy Instamart"];

export default function ContactPage() {
  return (
    <>
      {/* ── masthead ── */}
      <section className="relative isolate overflow-hidden bg-cobalt section text-paper">
        <Sunburst
          className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full text-marigold"
          rays={50}
          opacity={0.1}
        />
        <DevaWatermark word="संपर्क" className="text-marigold" position="right" opacity={0.08} />

        <div className="shell relative">
          <div className="grid items-center gap-8 w-full md:grid-cols-[1.15fr_0.85fr] md:gap-12">
            <div className="max-w-3xl">
              <p
                className="plaque tilt-tag label-micro inline-flex items-center gap-2.5"
                style={{ "--plaque-bg": "var(--color-marigold)", "--plaque-fg": "var(--color-ink)" }}
              >
                <Star className="w-3.5" />
                Baat Karein · Contact Us
              </p>

              <Bilingual
                as="h1"
                className="mt-4"
                accent="text-sun"
                hi="कोई सवाल? हमसे बात करें।"
                en="Get In Touch!"
              />

              <p className="lede mt-5 max-w-xl text-paper/80">
                We'd love to hear from you - please use the form to send us your message or ideas. Or simply pop in for a cup of fresh tea and a cookie.
              </p>
            </div>

            <PagePortrait
              src="/pihu-cutout.webp"
              alt="Pihu giving a thumbs up"
              width={1145}
              height={1374}
              name="Pihu"
              spot="var(--color-marigold)"
              plaqueBg="var(--color-sun)"
              priority
            />
          </div>
        </div>
      </section>

      <div className="trim-band" style={{ "--trim-a": "var(--color-marigold)", "--trim-b": "var(--color-raspberry)" }} aria-hidden="true" />

      {/* ── body content ── */}
      <section className="bg-paper section-lg">
        <div className="shell">
          <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16 items-start">
            {/* info column */}
            <div className="grid gap-6">
              {/* direct contact */}
              <div 
                className="card-poster card-pad bg-paper text-ink"
                style={{ "--card-shadow": "var(--color-oxblood)" }}
              >
                <p className="label-micro text-oxblood font-bold">Talk directly</p>
                <h3 className="h-poster-xs mt-2 text-[1.5rem]">Reach out</h3>
                <p className="mt-3 text-copy text-ink-soft">
                  Drop us a line for queries about order support, product questions, or ideas.
                </p>
                
                <div className="mt-6 flex flex-col gap-3">
                  <a href="mailto:sundermasala.website@gmail.com" className="flex items-center gap-3 text-copy font-bold text-oxblood hover:underline break-all">
                    <SpiceIcon mono name="pinch" className="w-5 shrink-0" />
                    sundermasala.website@gmail.com
                  </a>
                  <a href="tel:07312905169" className="flex items-center gap-3 text-copy font-bold text-oxblood hover:underline">
                    <SpiceIcon mono name="truck" className="w-5 shrink-0" />
                    TEXT: 0731-2905169
                  </a>
                </div>
              </div>

              {/* physical address */}
              <div 
                className="card-poster card-pad bg-marigold text-ink"
                style={{ "--card-shadow": "var(--color-oxblood)" }}
              >
                <p className="label-micro text-oxblood">Visit the mill</p>
                <h3 className="h-poster-xs mt-2 text-[1.5rem]">Come pop in</h3>
                <p className="mt-3 text-copy text-ink-soft">
                  Stop by for a cup of fresh tea and a cookie:
                </p>
                <p className="mt-4 text-copy font-semibold leading-snug">
                  204 SAMTA NAGAR, NEMAWAR ROAD, PALDA, INDORE (M.P.) PIN CODE: 452020
                </p>
                <div className="rule-dots my-4 text-ink/20" aria-hidden="true" />
                <p className="label-micro text-oxblood">Opening Hours</p>
                <p className="mt-1 text-copy font-bold">
                  MON to SAT: 9:00AM - 10:00PM
                </p>
              </div>

              {/* trade & distribution */}
              <div 
                className="card-poster card-pad bg-oxblood text-paper"
                style={{ "--card-shadow": "var(--color-sun)" }}
              >
                <p className="label-micro text-marigold">Wholesale & HoReCa</p>
                <h3 className="h-poster-xs mt-2 text-[1.5rem]">Distributor ya retailer hain?</h3>
                <p className="mt-3 text-copy text-paper/80">
                  Bulk formats, distribution opportunities and business enquiries. 
                  Tell us your city, volume requirements, and product needs.
                </p>
                <a 
                  href="mailto:trade@sundermasala.com" 
                  className="btn btn-gold btn-sm mt-5 self-start"
                  style={{ "--btn-shadow": "var(--color-ink)" }}
                >
                  Become a distributor
                </a>
              </div>
            </div>

            {/* form column */}
            <div className="sticky top-24">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
