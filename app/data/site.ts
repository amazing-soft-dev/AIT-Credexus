export const site = {
  name: "Credexus",
  legalName: "Credexus",
  tagline: "Remote AI training roles for software engineers",
  description:
    "Credexus matches software engineers in Latam, Asia, Europe and Canada with remote, well-paid AI training and evaluation work on the platforms frontier AI labs rely on. Free for candidates.",
  email: "hello@credexus.com",
  talentEmail: "talent@credexus.com",
  partnersEmail: "partners@credexus.com",
  socials: {
    linkedin: "https://www.linkedin.com/company/credexus",
    x: "https://x.com/credexus",
  },
  /** Last material update to legal pages — bump when you edit them. */
  legalUpdated: "2026-10-15",
} as const;

export const nav = [
  { label: "For Engineers", to: "/for-engineers" },
  { label: "Jobs", to: "/jobs" },
  { label: "Platforms", to: "/platforms" },
  { label: "How it works", to: "/how-it-works" },
  { label: "For Partners", to: "/for-partners" },
] as const;

export const footerNav = [
  {
    title: "Engineers",
    links: [
      { label: "Apply", to: "/for-engineers#apply" },
      { label: "Open roles", to: "/jobs" },
      { label: "How it works", to: "/how-it-works" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "Regions",
    links: [
      { label: "Latin America", to: "/latam" },
      { label: "Asia", to: "/asia" },
      { label: "Europe", to: "/europe" },
      { label: "Canada", to: "/canada" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "For Partners", to: "/for-partners" },
      { label: "Platforms", to: "/platforms" },
      { label: "Contact", to: "/contact" },
    ],
  },
] as const;
