import { z } from "zod";
import {
  CONTACT_TOPICS,
  ENGLISH_OPTIONS,
  type FieldErrors,
  MAX_CV_BYTES,
  PARTNER_VOLUME_OPTIONS,
  REGION_OPTIONS,
} from "./leads.constants";

export * from "./leads.constants";

/** Shared (client + server) form definitions and validation. */

const CV_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const trimmed = (max: number) => z.string().trim().max(max);
const orEmpty = (v: unknown) => v ?? "";
const optionalUrl = (host: RegExp, msg: string) =>
  z
    .string()
    .trim()
    .max(300)
    .transform((v) => (v && !/^https?:\/\//i.test(v) ? `https://${v}` : v))
    .refine((v) => v === "" || (URL.canParse(v) && host.test(new URL(v).hostname)), msg);

const values = <T extends readonly { value: string }[]>(opts: T) =>
  opts.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

export const applicationSchema = z.object({
  fullName: trimmed(120).min(2, "Please enter your full name"),
  email: z.string().trim().toLowerCase().pipe(z.email("Please enter a valid email")),
  linkedin: z.preprocess(
    orEmpty,
    optionalUrl(/(^|\.)linkedin\.com$/i, "Please enter a valid LinkedIn URL").refine(
      (v) => v !== "",
      "Please add your LinkedIn profile",
    ),
  ),
  github: z.preprocess(
    orEmpty,
    optionalUrl(/(^|\.)github\.com$/i, "Please enter a valid GitHub URL"),
  ),
  region: z.enum(values(REGION_OPTIONS), { error: "Please choose your region" }),
  english: z.enum(values(ENGLISH_OPTIONS), { error: "Please choose your English level" }),
  jobId: trimmed(120).optional(),
  consent: z.literal("on", { error: "Please agree so we can process your application" }),
});

export const partnerSchema = z.object({
  name: trimmed(120).min(2, "Please enter your name"),
  email: z.string().trim().toLowerCase().pipe(z.email("Please enter a valid work email")),
  company: trimmed(160).min(2, "Please enter your company"),
  website: z.preprocess(
    orEmpty,
    z
      .string()
      .trim()
      .max(300)
      .transform((v) => (v && !/^https?:\/\//i.test(v) ? `https://${v}` : v))
      .refine((v) => v === "" || URL.canParse(v), "Please enter a valid URL"),
  ),
  volume: z.enum(values(PARTNER_VOLUME_OPTIONS), { error: "Please choose a volume" }),
  message: trimmed(4000).min(10, "Tell us a little about what you need"),
  consent: z.literal("on", { error: "Please agree so we can reply" }),
});

export const contactSchema = z.object({
  name: trimmed(120).min(2, "Please enter your name"),
  email: z.string().trim().toLowerCase().pipe(z.email("Please enter a valid email")),
  topic: z.enum(values(CONTACT_TOPICS), { error: "Please choose a topic" }),
  message: trimmed(4000).min(10, "Please write a short message"),
  consent: z.literal("on", { error: "Please agree so we can reply" }),
});

export function validateCv(file: FormDataEntryValue | null): { file?: File; error?: string } {
  if (!file || typeof file === "string" || file.size === 0)
    return { error: "Please attach your CV (PDF or Word)" };
  if (file.size > MAX_CV_BYTES) return { error: "CV must be 4 MB or smaller" };
  const ext = file.name.toLowerCase().split(".").pop() ?? "";
  if (
    !["pdf", "doc", "docx"].includes(ext) ||
    (file.type && !CV_MIME.has(file.type) && file.type !== "application/octet-stream")
  ) {
    return { error: "CV must be a PDF, DOC or DOCX file" };
  }
  return { file };
}

export function flattenErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

export const labelFor = (opts: readonly { value: string; label: string }[], v: string) =>
  opts.find((o) => o.value === v)?.label ?? v;
