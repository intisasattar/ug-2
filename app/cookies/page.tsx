import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/content/seo";

export const metadata: Metadata = pageMetadata(
  {
    title: "Cookie Information | UG Global",
    description: "Information about cookies and similar technologies on the UG Global website.",
    path: "/cookies",
  },
  { index: false },
);

export default function CookiesPage() {
  return (
    <LegalPage eyebrow="Cookies" lines={["Cookie Information."]}>
      <h2>Current use</h2>
      <p>
        This website does not currently set analytics, advertising or tracking cookies, and does not load third-party
        tracking scripts.
      </p>
      <p>
        If analytics or other non-essential technologies are introduced in future, this page will be updated and, where
        required by law, your consent will be requested before they are activated.
      </p>
    </LegalPage>
  );
}
