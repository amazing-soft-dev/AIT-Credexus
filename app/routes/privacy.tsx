import { PageHero } from "~/components/sections/page-hero";
import { site } from "~/data/site";
import { cacheHeaders, seo } from "~/lib/seo";
import type { Route } from "./+types/privacy";

// NOTE: Starter policy. Have it reviewed by a qualified lawyer for every jurisdiction you operate in.

export const meta: Route.MetaFunction = () =>
  seo({
    title: "Privacy Policy",
    description: "How Credexus collects, uses and protects your personal data.",
    path: "/privacy",
  });

export const headers: Route.HeadersFunction = () => cacheHeaders();

export default function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated ${site.legalUpdated}`}
      />
      <article className="container-x prose-legal max-w-3xl pb-8">
        <p>
          This policy explains how {site.legalName} ("Credexus", "we") handles personal data
          collected through this website. We act as the data controller for the information you
          submit.
        </p>
        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Applications:</strong> name, email, LinkedIn and GitHub URLs, region, English
            level, the role you applied for, and your CV.
          </li>
          <li>
            <strong>Inquiries:</strong> name, email, company, website and your message.
          </li>
          <li>
            <strong>Technical data:</strong> approximate country derived from your IP address by our
            hosting provider, and the page you submitted from. We do not use advertising cookies.
          </li>
        </ul>
        <h2>How we use it</h2>
        <ul>
          <li>To assess your application and match you with suitable AI training platforms.</li>
          <li>To contact you about your application, opportunities or your inquiry.</li>
          <li>To keep the site secure and prevent spam.</li>
        </ul>
        <p>
          Our legal bases are your consent (given when you submit a form) and our legitimate
          interest in operating a recruiting service.
        </p>
        <h2>Who we share it with</h2>
        <ul>
          <li>
            <strong>Platforms:</strong> we share your profile with a hiring platform only after you
            agree to a specific introduction.
          </li>
          <li>
            <strong>Service providers:</strong> website hosting (Vercel) and email delivery
            (Resend), which process data on our behalf.
          </li>
          <li>We never sell your personal data.</li>
        </ul>
        <h2>International transfers</h2>
        <p>
          Our providers may process data outside your country, including in the United States. Where
          required, transfers rely on appropriate safeguards such as Standard Contractual Clauses.
        </p>
        <h2>How long we keep it</h2>
        <p>
          We keep application data for up to 24 months after our last contact with you, unless you
          ask us to delete it sooner.
        </p>
        <h2>Your rights</h2>
        <p>
          Depending on where you live (for example under the GDPR, Canada's PIPEDA or Brazil's
          LGPD), you may have the right to access, correct, delete or export your data, to object to
          or restrict processing, and to withdraw consent at any time. Email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> and we will respond within 30 days. You
          may also complain to your local data-protection authority.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about this policy: <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </article>
    </>
  );
}
