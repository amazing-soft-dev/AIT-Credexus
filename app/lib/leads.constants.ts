/** Form options and types shared by client and server (no validation libs here, keeps the client bundle small). */

export const REGION_OPTIONS = [
  { value: "latam", label: "Latin America" },
  { value: "asia", label: "Asia" },
  { value: "europe", label: "Europe" },
  { value: "canada", label: "Canada" },
] as const;

export const ENGLISH_OPTIONS = [
  { value: "native", label: "Native / bilingual" },
  { value: "c2", label: "C2 — Proficient" },
  { value: "c1", label: "C1 — Advanced" },
  { value: "b2", label: "B2 — Upper intermediate" },
  { value: "b1", label: "B1 — Intermediate" },
] as const;

export const PARTNER_VOLUME_OPTIONS = [
  { value: "1-10", label: "1–10 engineers" },
  { value: "10-50", label: "10–50 engineers" },
  { value: "50-200", label: "50–200 engineers" },
  { value: "200+", label: "200+ engineers" },
] as const;

export const CONTACT_TOPICS = [
  { value: "candidate", label: "I'm an engineer" },
  { value: "partner", label: "Partnership / hiring" },
  { value: "press", label: "Press" },
  { value: "other", label: "Something else" },
] as const;

/** Vercel serverless functions accept request bodies up to 4.5 MB. */
export const MAX_CV_BYTES = 4 * 1024 * 1024;
export const CV_ACCEPT = ".pdf,.doc,.docx";
export type FieldErrors = Partial<Record<string, string>>;
export type LeadResult =
  { ok: true; message: string } | { ok: false; formError?: string; fieldErrors?: FieldErrors };
