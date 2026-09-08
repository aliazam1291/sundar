/**
 * Instagram and Facebook glyphs.
 *
 * Deliberately plain, unlike spice-icons.jsx. Those are folk-poster
 * illustrations with their own palette — appropriate for a spice or a truck,
 * wrong for a brand mark a visitor needs to actually recognise mid-scroll.
 * These are outline strokes in `currentColor`, sized to sit in the same
 * circle-badge treatment as the footer's category icons.
 */

export const Instagram = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </g>
  </svg>
);

export const Facebook = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M15.5 8.5H13.8c-.4 0-.8.4-.8 1v2h2.4l-.3 2.5H13v7h-2.7v-7H8.5v-2.5h1.8V9.2c0-1.9 1.1-3.2 3.2-3.2h2v2.5Z"
    />
  </svg>
);

/** name + href, in the order they should render. */
export const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://www.instagram.com/madebysunder", Icon: Instagram },
  { name: "Facebook", href: "https://www.facebook.com/sundermasale/", Icon: Facebook },
];
