import type { Metadata } from "next";
import { siteUrl } from "./site";

type PageSeo = { title: string; description: string; path: string };

export const seo = {
  home: {
    title: "B2B Sales Closing & Follow-Up | UG Global",
    description:
      "Specialist B2B sales closing and structured follow-up for agencies and service businesses. Explore a tailored sales partnership with UG Global.",
    path: "/",
  },
  services: {
    title: "B2B Sales Closing Services | UG Global",
    description:
      "Professional closing, objection handling and qualified pipeline follow-up for agencies and service businesses.",
    path: "/services",
  },
  howWeWork: {
    title: "How We Work: A Structured Sales Closing Partnership | UG Global",
    description:
      "Assess, immerse, execute and review. How UG Global works alongside agencies and service businesses to progress qualified B2B opportunities.",
    path: "/how-we-work",
  },
  results: {
    title: "B2B Sales Closing Case Studies | UG Global",
    description:
      "Explore anonymised examples of structured sales follow-up and B2B closing, with outcomes presented in context.",
    path: "/results",
  },
  about: {
    title: "About UG Global: Professional B2B Sales Closing Standards",
    description:
      "Why UG Global believes careful preparation, honest communication and professional judgement are essential to effective B2B sales closing.",
    path: "/about",
  },
  careers: {
    title: "Remote Sales Closer Opportunities | UG Global",
    description:
      "Explore international B2B sales closer opportunities, including role-specific salaried and contractor arrangements with UG Global.",
    path: "/careers",
  },
  contact: {
    title: "Contact UG Global: Business Enquiries & Sales Careers",
    description:
      "Book a sales consultation for your agency or service business, or submit your profile as a B2B sales professional. Two separate routes.",
    path: "/contact",
  },
} satisfies Record<string, PageSeo>;

export function pageMetadata(page: PageSeo, opts: { index?: boolean } = {}): Metadata {
  const url = `${siteUrl}${page.path}`;
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      type: "website",
      siteName: "UG Global",
      locale: "en_GB",
      url,
      title: page.title,
      description: page.description,
    },
    twitter: { card: "summary_large_image", title: page.title, description: page.description },
    robots: opts.index === false ? { index: false, follow: true } : undefined,
  };
}
