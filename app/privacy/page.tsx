import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/content/seo";

export const metadata: Metadata = pageMetadata(
  {
    title: "Privacy Notice | UG Global",
    description: "How UG Global handles personal information submitted through business enquiries and candidate applications.",
    path: "/privacy",
  },
  { index: false },
);

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Privacy" lines={["Privacy Notice."]}>
      <h2>Our full privacy notice is being finalised</h2>
      <p>
        UG Global’s complete privacy notice, covering company identification, lawful bases, data retention and
        international data transfers, is currently under legal review and will be published here once approved.
      </p>
      <h2>How submissions are used</h2>
      <p>
        Business enquiries are used only to respond to your enquiry and to assess whether our sales-closing services are
        an appropriate fit. They are routed to our business-development team.
      </p>
      <p>
        Candidate applications are used only to assess your suitability for current or future sales opportunities. They
        are routed to our recruitment team and kept separate from business enquiries.
      </p>
      <p>
        We do not ask you to submit recordings of real sales calls or information about third parties. Please do not
        include sensitive personal information in any form.
      </p>
      <p>
        If you have a question about your information before the full notice is published, please use the relevant
        contact route and mention that your enquiry relates to privacy.
      </p>
    </LegalPage>
  );
}
