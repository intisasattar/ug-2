/**
 * Central site configuration.
 *
 * Company details are intentionally `null` until verified and approved
 * (see README → "Outstanding approvals"). Null values are never rendered.
 */

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000")
).replace(/\/$/, "");

const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || null;

export const routes = {
  home: "/",
  services: "/services",
  howWeWork: "/how-we-work",
  results: "/results",
  about: "/about",
  careers: "/careers",
  contact: "/contact",
  businessEnquiry: "/contact#business",
  candidateEnquiry: "/contact#candidate",
  privacy: "/privacy",
  cookies: "/cookies",
} as const;

/** Destination for every client consultation CTA. */
export const consultationHref = bookingUrl ?? routes.businessEnquiry;
export const consultationIsExternal = bookingUrl !== null;

export const mainNav = [
  { label: "Home", href: routes.home },
  { label: "Services", href: routes.services },
  { label: "How We Work", href: routes.howWeWork },
  { label: "Results", href: routes.results },
  { label: "About", href: routes.about },
  { label: "Careers", href: routes.careers },
  { label: "Contact", href: routes.contact },
] as const;

export const company: {
  name: string;
  signature: string;
  description: string;
  legalName: string | null;
  registrationNumber: string | null;
  address: string | null;
  email: string | null;
  phone: string | null;
  social: { label: string; href: string }[];
} = {
  name: "UG Global",
  signature: "Your Sales. Our Focus.",
  description:
    "Specialist B2B sales closing and pipeline follow-up for agencies and service businesses with qualified opportunities already in their pipeline.",
  legalName: null,
  registrationNumber: null,
  address: null,
  email: null,
  phone: null,
  social: [],
};
