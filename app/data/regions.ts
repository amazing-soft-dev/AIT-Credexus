export type RegionSlug = "latam" | "asia" | "europe" | "canada";

export type Region = {
  slug: RegionSlug;
  name: string;
  short: string;
  headline: string;
  intro: string;
  countries: string[];
  /** ISO 3166-1 alpha-2 codes used to suggest this region from the visitor's IP country. */
  isoCodes: string[];
  timezones: string;
  highlights: { title: string; body: string }[];
};

export const regions: Region[] = [
  {
    slug: "latam",
    name: "Latin America",
    short: "Latam",
    headline: "Remote AI training roles for engineers across Latin America",
    intro:
      "Work in US-overlapping hours from Mexico to Argentina. We help Latam engineers get onto the platforms that pay in USD for coding, evaluation and RLHF work.",
    countries: [
      "Mexico",
      "Brazil",
      "Argentina",
      "Colombia",
      "Chile",
      "Peru",
      "Uruguay",
      "Costa Rica",
    ],
    isoCodes: [
      "MX",
      "BR",
      "AR",
      "CO",
      "CL",
      "PE",
      "UY",
      "CR",
      "EC",
      "BO",
      "PY",
      "VE",
      "GT",
      "PA",
      "DO",
      "SV",
      "HN",
      "NI",
    ],
    timezones: "UTC−3 to UTC−6 — natural overlap with US-based AI teams",
    highlights: [
      {
        title: "USD-denominated work",
        body: "Most platforms pay in US dollars via international payout providers.",
      },
      {
        title: "Bilingual advantage",
        body: "Spanish and Portuguese fluency opens multilingual evaluation projects on top of coding work.",
      },
      {
        title: "Same-day collaboration",
        body: "Your working day overlaps with US project leads, so reviews and feedback move fast.",
      },
    ],
  },
  {
    slug: "asia",
    name: "Asia",
    short: "Asia",
    headline: "Remote AI training roles for engineers across Asia",
    intro:
      "From Manila to Bengaluru to Ho Chi Minh City, we help strong engineers in Asia get vetted and onboarded for asynchronous AI training work.",
    countries: [
      "India",
      "Philippines",
      "Vietnam",
      "Indonesia",
      "Malaysia",
      "Pakistan",
      "Singapore",
      "Japan",
    ],
    isoCodes: [
      "IN",
      "PH",
      "VN",
      "ID",
      "MY",
      "PK",
      "SG",
      "JP",
      "KR",
      "TH",
      "BD",
      "LK",
      "TW",
      "HK",
      "NP",
    ],
    timezones: "UTC+5 to UTC+9 — async-first projects that fit your day",
    highlights: [
      {
        title: "Async-friendly projects",
        body: "Most AI training tasks are self-paced, so time zones rarely get in the way.",
      },
      {
        title: "Competitive rates",
        body: "Expert coding tasks are paid by skill level, not by local salary bands.",
      },
      {
        title: "Multilingual demand",
        body: "Native fluency in Asian languages qualifies you for specialised evaluation projects.",
      },
    ],
  },
  {
    slug: "europe",
    name: "Europe",
    short: "Europe",
    headline: "Remote AI training roles for engineers across Europe",
    intro:
      "Senior engineers in Europe are in demand for complex coding, agent and evaluation projects. We match you with platforms that value depth over volume.",
    countries: [
      "Poland",
      "Portugal",
      "Spain",
      "Romania",
      "Ukraine",
      "Germany",
      "Serbia",
      "Bulgaria",
    ],
    isoCodes: [
      "PL",
      "PT",
      "ES",
      "RO",
      "UA",
      "DE",
      "RS",
      "BG",
      "FR",
      "IT",
      "NL",
      "GB",
      "IE",
      "CZ",
      "HU",
      "GR",
      "HR",
      "SK",
      "LT",
      "LV",
      "EE",
      "SE",
      "FI",
      "DK",
      "NO",
      "AT",
      "BE",
      "CH",
    ],
    timezones: "UTC+0 to UTC+3 — overlap with both US East Coast and Asia",
    highlights: [
      {
        title: "Senior-level projects",
        body: "Agentic coding, system design and code-review tasks reward deep experience.",
      },
      {
        title: "GDPR-conscious process",
        body: "We only share your profile with a platform after you say yes.",
      },
      {
        title: "Contract flexibility",
        body: "Take on projects alongside your current role or go full-time on AI work.",
      },
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    short: "Canada",
    headline: "Remote AI training roles for engineers in Canada",
    intro:
      "Canadian engineers are eligible for many projects reserved for North American contributors. We fast-track you onto the ones that fit your stack.",
    countries: ["Ontario", "British Columbia", "Quebec", "Alberta", "Nova Scotia", "Manitoba"],
    isoCodes: ["CA"],
    timezones: "UTC−3:30 to UTC−8 — fully aligned with US AI labs",
    highlights: [
      {
        title: "North America-only projects",
        body: "Some evaluation work is restricted to US/Canada residents — you qualify.",
      },
      {
        title: "Higher rate bands",
        body: "Specialist and senior tasks often carry premium rates for North American experts.",
      },
      {
        title: "English & French",
        body: "French fluency adds bilingual evaluation work on top of coding projects.",
      },
    ],
  },
];

export const regionBySlug = (slug: string) => regions.find((r) => r.slug === slug);

export const regionForCountry = (iso?: string | null) =>
  iso ? regions.find((r) => r.isoCodes.includes(iso.toUpperCase())) : undefined;
