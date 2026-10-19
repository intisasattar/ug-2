import type { Metadata } from "next";
import { Accordion } from "@/components/Accordion";
import { Button } from "@/components/Button";
import { CtaPanel } from "@/components/CtaPanel";
import { Eyebrow } from "@/components/Eyebrow";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import ed from "@/components/Editorial.module.css";
import { boundaryNote } from "@/content/copy";
import { clientFaqs } from "@/content/faqs";
import { pageMetadata, seo } from "@/content/seo";
import { consultationHref, consultationIsExternal, routes } from "@/content/site";

export const metadata: Metadata = pageMetadata(seo.services);

const disciplines = [
  {
    kicker: "Conversations",
    title: "B2B sales conversations",
    body: "We engage qualified prospects on your behalf, explain your proposition clearly and help buyers evaluate whether your service fits their needs, conducted in a manner consistent with your brand.",
  },
  {
    kicker: "Discovery",
    title: "Understanding buyer priorities",
    body: "Effective closing begins with listening. We explore each prospect’s objectives, constraints, timing and decision process so that the conversation addresses what genuinely matters to them.",
  },
  {
    kicker: "Objections",
    title: "Ethical objection handling",
    body: "We address genuine concerns with relevant information and honest answers. We do not use pressure tactics, false urgency or claims your business cannot support.",
  },
  {
    kicker: "Closing",
    title: "Commercial next steps",
    body: "We guide suitable opportunities towards an informed commercial decision and a clear, agreed next step, whether that is a proposal, a decision meeting or a signed agreement within your process.",
  },
  {
    kicker: "Follow-up",
    title: "Pipeline follow-up",
    body: "We maintain continuity across agreed follow-up stages, keeping track of next steps so viable opportunities are not forgotten or left to lose momentum.",
  },
  {
    kicker: "Reporting",
    title: "Opportunity progression and reporting",
    body: "We agree the measures that matter and a reporting cadence, giving you visibility of opportunity progress, follow-up activity and commercial outcomes.",
  },
];

export default function ServicesPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: clientFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHero
        eyebrow="Sales Closing Services"
        lines={["B2B Sales Closing,", "Built Around Your", "Existing Pipeline."]}
        lede={
          <p>
            You have already created demand. We focus on the next stage: purposeful conversations, professional closing
            and consistent follow-up for qualified business prospects.
          </p>
        }
        actions={
          <Button href={consultationHref} external={consultationIsExternal} onDark size="lg" track="client_consultation_cta_click" trackAudience="client">
            Discuss Your Sales Process
          </Button>
        }
      />

      {/* Positioning: closing vs lead generation */}
      <section className="section bg-porcelain" aria-labelledby="focus-title">
        <div className="container">
          <div className={ed.split}>
            <div>
              <Eyebrow>Our focus</Eyebrow>
              <h2 id="focus-title" data-reveal="">
                We Begin Where Qualified Interest Already Exists.
              </h2>
            </div>
            <div className={ed.bodyCopy} data-reveal="" style={{ ["--reveal-delay" as string]: 120 }}>
              <p>
                Advertising and lead generation create interest. Sales closing converts it. UG Global works in the
                second of those disciplines: the conversations between a qualified enquiry and a commercial decision.
              </p>
              <p>
                That focus keeps our attention on preparation, discovery, objection handling and follow-up, rather than
                on media spend or prospect lists.
              </p>
            </div>
          </div>
          <div className={ed.detailGrid} style={{ marginTop: "var(--space-8)" }} data-stagger="">
            <div className={ed.detail}>
              <p className={ed.cardKicker}>What we do</p>
              <h3>Sales closing &amp; follow-up</h3>
              <ul className={ed.checks}>
                <li>Conversations with qualified B2B prospects you have already generated</li>
                <li>Discovery, objection handling and progression to a clear next step</li>
                <li>Agreed follow-up across your pipeline stages</li>
                <li>Reporting against measures agreed at the outset</li>
              </ul>
            </div>
            <div className={ed.detail}>
              <p className={ed.cardKicker}>What we do not do</p>
              <h3>Lead generation &amp; advertising</h3>
              <ul className={`${ed.checks} ${ed.exclusions}`}>
                <li>Running advertising or paid-media campaigns</li>
                <li>Generating, buying or supplying lead lists</li>
                <li>Consumer (B2C) call-centre activity</li>
                <li>Guaranteeing a particular conversion rate or revenue outcome</li>
              </ul>
            </div>
          </div>
          <p className={ed.note} data-reveal="">
            <span className={ed.noteLabel}>Service boundary</span>
            {boundaryNote}
          </p>
        </div>
      </section>

      {/* Disciplines */}
      <section className="section bg-white" aria-labelledby="disciplines-title">
        <div className="container">
          <SectionHeading
            id="disciplines-title"
            eyebrow="What the service covers"
            title="Six Connected Disciplines, One Commercial Focus."
            align="split"
            intro={<p>Each engagement is scoped individually. These are the areas in which we can support your sales process.</p>}
          />
          <ul className={`${ed.cards} ${ed.cards3}`} data-stagger="">
            {disciplines.map((d) => (
              <li key={d.title} className={ed.card}>
                <p className={ed.cardKicker}>{d.kicker}</p>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Scope, responsibilities */}
      <section className="section bg-navy grain on-dark" aria-labelledby="scope-title">
        <div className="container">
          <SectionHeading id="scope-title" eyebrow="Scope & responsibilities" title="A Clearly Agreed Scope, Before Any Conversation Begins." />
          <div className={ed.split}>
            <div className={ed.bodyCopy} data-reveal="">
              <h3 style={{ marginBottom: "var(--space-4)" }}>How scope is agreed</h3>
              <p>
                Every engagement begins with a consultation. We assess your objectives, opportunity volume, expected
                scope and operational requirements before preparing a tailored proposal. Pricing and contract terms are
                consultation-based and confirmed directly with you. We do not publish a rate card or fixed packages.
              </p>
              <p>
                Together we agree which opportunities are assigned to UG Global, the stages we are responsible for, how
                hand-offs work and how progress is reported.
              </p>
            </div>
            <div data-reveal="" style={{ ["--reveal-delay" as string]: 120 }}>
              <h3 style={{ marginBottom: "var(--space-5)" }}>What we will ask you to provide</h3>
              <ul className={ed.checks}>
                <li>A clear understanding of your offer, positioning and commercial terms</li>
                <li>Your ideal customer profile and the common concerns your buyers raise</li>
                <li>The qualified opportunities in scope and their current status</li>
                <li>Your communication standards, brand guidelines and approval boundaries</li>
                <li>Agreed access to the systems or records needed for the work, where both parties confirm this is appropriate</li>
                <li>A named point of contact for hand-offs, questions and decisions outside the agreed scope</li>
              </ul>
            </div>
          </div>
          <div className={`${ed.cards}`} style={{ marginTop: "var(--space-8)" }} data-stagger="">
            <div className={ed.card}>
              <p className={ed.cardKicker}>Responsibilities</p>
              <h3>Who does what</h3>
              <p>
                You remain responsible for your offer, pricing decisions, delivery and client contracts. UG Global is
                responsible for conducting the agreed sales conversations and follow-up to the standards set out in the
                engagement.
              </p>
            </div>
            <div className={ed.card}>
              <p className={ed.cardKicker}>Hand-offs</p>
              <h3>Clear transitions</h3>
              <p>
                We agree in advance when and how an opportunity moves between your team and ours, so that buyers
                experience a consistent, well-informed conversation throughout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-porcelain" aria-labelledby="faq-title">
        <div className="container">
          <div className={ed.split}>
            <div className={ed.sticky}>
              <Eyebrow>Questions</Eyebrow>
              <h2 id="faq-title" data-reveal="">
                Frequently Asked Questions.
              </h2>
              <div className={ed.actions} data-reveal="">
                <Button href={routes.howWeWork} variant="ghost">
                  How we work
                </Button>
              </div>
            </div>
            <Accordion items={clientFaqs} />
          </div>
        </div>
      </section>

      <CtaPanel
        tone="ink"
        title="Let’s Look at Your Sales Process Together."
        body={<p>Tell us about your offer, your pipeline and where qualified opportunities tend to stall.</p>}
        ctaLabel="Discuss Your Sales Process"
        microcopy="An initial discussion to understand your business and explore the appropriate scope."
      />
    </>
  );
}
