import { data, redirect } from "react-router";
import { jobById } from "~/data/jobs";
import { sendConfirmation, sendLeadEmail } from "./email.server";
import {
  applicationSchema,
  CONTACT_TOPICS,
  contactSchema,
  ENGLISH_OPTIONS,
  flattenErrors,
  labelFor,
  type LeadResult,
  PARTNER_VOLUME_OPTIONS,
  partnerSchema,
  REGION_OPTIONS,
  validateCv,
} from "./leads";

const MIN_FILL_MS = 2500;

/** Honeypot + minimum fill time. Returns true when the submission looks automated. */
function isBot(form: FormData) {
  if (String(form.get("company_website") ?? "") !== "") return true;
  const started = Number(form.get("_t"));
  return Number.isFinite(started) && started > 0 && Date.now() - started < MIN_FILL_MS;
}

const fail = (result: Extract<LeadResult, { ok: false }>, status = 400) =>
  data<LeadResult>(result, { status });
const fakeOk = () => data<LeadResult>({ ok: true, message: "Thanks! We'll be in touch." });

async function readForm(request: Request) {
  if (request.method !== "POST")
    throw data({ ok: false, formError: "Method not allowed" }, { status: 405 });
  try {
    return await request.formData();
  } catch {
    throw data<LeadResult>(
      {
        ok: false,
        formError:
          "We couldn't read that submission. If you attached a large file, try one under 4 MB.",
      },
      { status: 413 },
    );
  }
}

const meta = (request: Request): [string, string | undefined][] => [
  ["Country (IP)", request.headers.get("x-vercel-ip-country") ?? undefined],
  ["Page", request.headers.get("referer") ?? undefined],
];

export async function handleApplication(request: Request) {
  const form = await readForm(request);
  if (isBot(form)) return fakeOk();

  const parsed = applicationSchema.safeParse(
    Object.fromEntries([...form].filter(([, v]) => typeof v === "string")),
  );
  const cv = validateCv(form.get("cv"));
  if (!parsed.success || cv.error) {
    return fail({
      ok: false,
      fieldErrors: {
        ...(parsed.success ? {} : flattenErrors(parsed.error)),
        ...(cv.error ? { cv: cv.error } : {}),
      },
    });
  }
  const v = parsed.data;
  const job = v.jobId ? jobById(v.jobId) : undefined;
  const file = cv.file!;
  const safeName = `${v.fullName.replace(/[^\p{L}\p{N}]+/gu, "_")}_CV.${file.name.split(".").pop()!.toLowerCase()}`;

  try {
    await sendLeadEmail({
      subject: `New application: ${v.fullName} (${labelFor(REGION_OPTIONS, v.region)})${job ? ` — ${job.title}` : ""}`,
      replyTo: v.email,
      fields: [
        ["Name", v.fullName],
        ["Email", v.email],
        ["LinkedIn", v.linkedin],
        ["GitHub", v.github || undefined],
        ["Region", labelFor(REGION_OPTIONS, v.region)],
        ["English", labelFor(ENGLISH_OPTIONS, v.english)],
        ["Role", job ? `${job.title} (${job.id})` : undefined],
        ["CV", `${file.name} (${Math.round(file.size / 1024)} KB, attached)`],
        ...meta(request),
      ],
      attachments: [{ filename: safeName, content: Buffer.from(await file.arrayBuffer()) }],
    });
  } catch (e) {
    console.error("[apply] send failed", e);
    return fail(
      {
        ok: false,
        formError:
          "Something went wrong sending your application. Please try again, or email us directly.",
      },
      502,
    );
  }
  await sendConfirmation(v.email, v.fullName.split(" ")[0] ?? v.fullName);
  return data<LeadResult>({
    ok: true,
    message:
      "Application received. We'll review your profile and email you within a few business days.",
  });
}

export async function handlePartner(request: Request) {
  const form = await readForm(request);
  if (isBot(form)) return fakeOk();
  const parsed = partnerSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return fail({ ok: false, fieldErrors: flattenErrors(parsed.error) });
  const v = parsed.data;
  try {
    await sendLeadEmail({
      subject: `Partner inquiry: ${v.company} (${labelFor(PARTNER_VOLUME_OPTIONS, v.volume)})`,
      replyTo: v.email,
      fields: [
        ["Name", v.name],
        ["Email", v.email],
        ["Company", v.company],
        ["Website", v.website || undefined],
        ["Volume", labelFor(PARTNER_VOLUME_OPTIONS, v.volume)],
        ["Message", v.message],
        ...meta(request),
      ],
    });
  } catch (e) {
    console.error("[partner] send failed", e);
    return fail(
      { ok: false, formError: "Something went wrong. Please try again, or email us directly." },
      502,
    );
  }
  return data<LeadResult>({
    ok: true,
    message: "Thanks — our partnerships team will reply within one business day.",
  });
}

export async function handleContact(request: Request) {
  const form = await readForm(request);
  if (isBot(form)) return fakeOk();
  const parsed = contactSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return fail({ ok: false, fieldErrors: flattenErrors(parsed.error) });
  const v = parsed.data;
  try {
    await sendLeadEmail({
      subject: `Contact: ${labelFor(CONTACT_TOPICS, v.topic)} — ${v.name}`,
      replyTo: v.email,
      fields: [
        ["Name", v.name],
        ["Email", v.email],
        ["Topic", labelFor(CONTACT_TOPICS, v.topic)],
        ["Message", v.message],
        ...meta(request),
      ],
    });
  } catch (e) {
    console.error("[contact] send failed", e);
    return fail(
      { ok: false, formError: "Something went wrong. Please try again, or email us directly." },
      502,
    );
  }
  return data<LeadResult>({ ok: true, message: "Message sent. We'll get back to you soon." });
}

/**
 * No-JS / pre-hydration fallback: a native form POST (Accept: text/html) would otherwise show
 * raw JSON. Redirect back to the form's page with a status flag the form can display instead.
 */
export function respond(
  request: Request,
  result: ReturnType<typeof data<LeadResult>>,
  kind: string,
) {
  const accept = request.headers.get("accept") ?? "";
  if (!accept.includes("text/html")) return result;
  const referer = request.headers.get("referer");
  let target = new URL("/", request.url);
  try {
    if (referer && new URL(referer).origin === new URL(request.url).origin)
      target = new URL(referer);
  } catch {
    /* keep default */
  }
  target.searchParams.delete("sent");
  target.searchParams.delete("form_error");
  target.searchParams.set(result.data.ok ? "sent" : "form_error", kind);
  target.hash = "";
  return redirect(`${target.pathname}${target.search}`, 303);
}
