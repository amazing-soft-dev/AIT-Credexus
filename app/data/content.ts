export const faqs: { q: string; a: string; group: "Engineers" | "Process" | "Partners" }[] = [
  {
    group: "Engineers",
    q: "Does Credexus charge candidates anything?",
    a: "No. Credexus is 100% free for engineers. We are paid by the platforms and companies we place talent with — never by you, and never through deductions from your earnings.",
  },
  {
    group: "Engineers",
    q: "What is AI training work, exactly?",
    a: "AI labs need experienced engineers to write, review, debug and rank code produced by AI models, and to design hard problems that push models further. Your judgement becomes training and evaluation data that makes the models better.",
  },
  {
    group: "Engineers",
    q: "Who can apply?",
    a: "Software engineers based in Latin America, Asia, Europe or Canada with professional coding experience and strong written English. Most projects look for 2+ years of experience; senior and specialist projects pay more.",
  },
  {
    group: "Engineers",
    q: "Is this full-time or part-time?",
    a: "Both. Many projects are flexible contracts from 10 hours a week, and some run full-time. You choose what fits around your current commitments.",
  },
  {
    group: "Process",
    q: "How does Credexus help me get accepted faster?",
    a: "We review your profile once, tell you which platforms fit your stack and level, help you prepare for their assessments, and introduce you where we can — so you skip the guesswork of applying blindly to a dozen platforms.",
  },
  {
    group: "Process",
    q: "How long does it take to hear back?",
    a: "We aim to review every application within 3 business days. Onboarding timelines after that depend on each platform's assessment and project demand.",
  },
  {
    group: "Process",
    q: "How and when do I get paid?",
    a: "You are paid directly by the platform you work on, under its own terms — typically weekly or bi-weekly in USD through international payout providers. Credexus never handles your earnings.",
  },
  {
    group: "Process",
    q: "Are you affiliated with the platforms you list?",
    a: "Credexus is an independent recruiting agency. We list the platforms our candidates work on; this does not imply endorsement by those companies. All trademarks belong to their owners.",
  },
  {
    group: "Partners",
    q: "What does Credexus offer AI training platforms?",
    a: "A pre-screened pipeline of software engineers across four regions, matched to your project's stack, seniority, language and time-zone requirements.",
  },
  {
    group: "Partners",
    q: "How quickly can you deliver candidates?",
    a: "For common stacks we can usually share a first shortlist within days. Tell us your volume and requirements and we will give you a realistic timeline.",
  },
];

export const steps = [
  {
    n: "01",
    title: "Apply once",
    body: "Share your experience, stack, region and English level in a 3-minute application. Attach your CV — no cover letter needed.",
  },
  {
    n: "02",
    title: "Get screened & matched",
    body: "Our team reviews your profile and maps it to the platforms and projects where you are most likely to be accepted and paid well.",
  },
  {
    n: "03",
    title: "Prepare & get introduced",
    body: "We brief you on each platform's assessment, share what reviewers look for, and introduce you where we have a direct line.",
  },
  {
    n: "04",
    title: "Start earning",
    body: "Pass onboarding, pick up projects, and get paid directly by the platform. We stay in touch to help you level up to higher-paying work.",
  },
];

export const engineerBenefits = [
  {
    icon: "wallet",
    title: "Free, always",
    body: "Platforms pay us. You never pay a fee or give up a share of your earnings.",
  },
  {
    icon: "zap",
    title: "Skip the cold applications",
    body: "One application gets you matched across 19 platforms instead of guessing which to try.",
  },
  {
    icon: "globe",
    title: "Work from anywhere",
    body: "Remote, flexible projects open to engineers across Latam, Asia, Europe and Canada.",
  },
  {
    icon: "trending",
    title: "Grow into senior work",
    body: "We point you to specialist and agentic projects as your track record grows.",
  },
  {
    icon: "shield",
    title: "Your data, your call",
    body: "We share your profile with a platform only after you agree to it.",
  },
  {
    icon: "message",
    title: "A human in your corner",
    body: "Real recruiters who answer questions about assessments, projects and pay.",
  },
] as const;

export const screeningCriteria = [
  {
    title: "Professional coding experience",
    body: "Typically 2+ years shipping production software in at least one mainstream language.",
  },
  {
    title: "Strong written English",
    body: "Most tasks require clear written rationales. We assess this from your application.",
  },
  {
    title: "Analytical rigour",
    body: "AI training rewards engineers who can explain why something is right or wrong — not just fix it.",
  },
  {
    title: "Reliable availability",
    body: "Even 10 focused hours a week is enough for many projects.",
  },
];

export const partnerBenefits = [
  {
    title: "Pre-screened engineers",
    body: "Candidates are reviewed for coding depth, written English and reasoning before they reach you.",
  },
  {
    title: "Four-region reach",
    body: "Talent across Latin America, Asia, Europe and Canada — for coverage, language and time-zone needs.",
  },
  {
    title: "Stack-specific sourcing",
    body: "From Python and TypeScript to C++, Rust and ML — we source to your project's exact requirements.",
  },
  {
    title: "Ramp up or down",
    body: "Scale cohorts for project spikes without growing an internal recruiting team.",
  },
];

/**
 * Testimonials. Only add real quotes from real candidates who agreed to be quoted.
 * The section is hidden in production while this list is empty; in development it shows
 * dashed placeholder cards so you can see where testimonials will appear.
 */
export const testimonials: { quote: string; name: string; role: string; region: string }[] = [];
