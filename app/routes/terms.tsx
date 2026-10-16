import { PageHero } from "~/components/sections/page-hero";
import { site } from "~/data/site";
import { cacheHeaders, seo } from "~/lib/seo";
import type { Route } from "./+types/terms";

// NOTE: Starter terms. Have them reviewed by a qualified lawyer before launch.

export const meta: Route.MetaFunction = () =>
  seo({
    title: "Terms of Use",
    description: "Terms governing use of the Credexus website and services.",
    path: "/terms",
  });

export const headers: Route.HeadersFunction = () => cacheHeaders();

export default function Terms() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description={`Last updated ${site.legalUpdated}`}
      />
      <article className="container-x prose-legal max-w-3xl pb-8">
        <h2>1. About Credexus</h2>
        <p>
          Credexus is an independent recruiting agency. We help software engineers find AI training
          and evaluation work on third-party platforms, and help those platforms find engineers.
        </p>
        <h2>2. Free for candidates</h2>
        <p>
          We do not charge candidates any fee and do not take a share of candidates' earnings. We
          may be compensated by platforms or companies we work with.
        </p>
        <h2>3. No guarantee of placement</h2>
        <p>
          Acceptance onto any platform, project availability, rates and payment terms are decided
          solely by the platform. Pay ranges shown on this site are indicative and may change.
        </p>
        <h2>4. Third-party platforms</h2>
        <p>
          Platform names and marks belong to their respective owners. Listing a platform does not
          imply that it endorses or is affiliated with Credexus. Your work for a platform is
          governed by your agreement with that platform.
        </p>
        <h2>5. Your submissions</h2>
        <p>
          You confirm that the information and documents you submit are accurate and that you have
          the right to share them. Our handling of your data is described in our Privacy Policy.
        </p>
        <h2>6. Acceptable use</h2>
        <p>
          Do not misuse this site, submit false information, attempt to disrupt our systems, or
          scrape content at scale.
        </p>
        <h2>7. Liability</h2>
        <p>
          This site is provided "as is". To the extent permitted by law, Credexus is not liable for
          indirect or consequential losses arising from your use of the site or of third-party
          platforms.
        </p>
        <h2>8. Changes</h2>
        <p>We may update these terms. The date at the top shows the latest version.</p>
        <h2>9. Contact</h2>
        <p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </article>
    </>
  );
}
