import type { RegionSlug } from "./regions";

/**
 * Fictional example profiles for the talent row.
 * These are not real candidates and must not be presented as hires.
 */
export type SampleEngineer = {
  id: string;
  name: string;
  role: string;
  years: number;
  region: RegionSlug;
  summary: string;
  portrait: string;
  portraitWidth: number;
  portraitHeight: number;
};

export const sampleEngineers: SampleEngineer[] = [
  {
    id: "mateo-vargas",
    name: "Mateo Vargas",
    role: "Senior backend engineer",
    years: 11,
    region: "latam",
    summary:
      "Reviews Python services and writes the reference solutions models are scored against.",
    portrait: "/images/talent/mateo-vargas.jpg",
    portraitWidth: 864,
    portraitHeight: 1152,
  },
  {
    id: "hanae-okada",
    name: "Hanae Okada",
    role: "ML evaluation engineer",
    years: 8,
    region: "asia",
    summary: "Scores model answers on distributed systems and marks where the reasoning fails.",
    portrait: "/images/talent/hanae-okada.jpg",
    portraitWidth: 864,
    portraitHeight: 1152,
  },
  {
    id: "elise-moreau",
    name: "Elise Moreau",
    role: "Full-stack engineer",
    years: 9,
    region: "europe",
    summary: "Ranks generated TypeScript for correctness, clarity, and test coverage.",
    portrait: "/images/talent/elise-moreau.jpg",
    portraitWidth: 864,
    portraitHeight: 1152,
  },
  {
    id: "amara-okonkwo",
    name: "Amara Okonkwo",
    role: "Staff software engineer",
    years: 13,
    region: "canada",
    summary: "Leads backend code reviews and steers models toward production-grade diffs.",
    portrait: "/images/talent/amara-okonkwo.jpg",
    portraitWidth: 864,
    portraitHeight: 1152,
  },
];
