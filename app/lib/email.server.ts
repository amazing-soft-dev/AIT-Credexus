import { Resend } from "resend";

type Attachment = { filename: string; content: Buffer };

type SendInput = {
  subject: string;
  /** Rows rendered as a two-column table. */
  fields: [label: string, value: string | undefined][];
  replyTo?: string;
  attachments?: Attachment[];
};

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

const linkify = (v: string) =>
  /^https?:\/\//.test(v) ? `<a href="${esc(v)}">${esc(v)}</a>` : esc(v).replace(/\n/g, "<br>");

function renderHtml(subject: string, fields: SendInput["fields"]) {
  const rows = fields
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;color:#6b7280;white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:8px 12px;color:#111827">${linkify(v!)}</td></tr>`,
    )
    .join("");
  return `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#f6f7fb;padding:24px">
<div style="max-width:620px;margin:auto;background:#fff;border-radius:12px;border:1px solid #e5e7eb;overflow:hidden">
<div style="background:#0c0e26;color:#fff;padding:18px 20px;font-weight:600">${esc(subject)}</div>
<table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>
<p style="padding:12px 20px;color:#9ca3af;font-size:12px;margin:0">Sent from the Credexus website · ${new Date().toISOString()}</p>
</div></body></html>`;
}

function renderText(fields: SendInput["fields"]) {
  return fields
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

/**
 * Sends a lead notification to LEADS_TO_EMAIL via Resend.
 * Without RESEND_API_KEY (local dev) the email is logged instead of sent.
 */
export async function sendLeadEmail({ subject, fields, replyTo, attachments }: SendInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = (process.env.LEADS_TO_EMAIL ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const from = process.env.LEADS_FROM_EMAIL || "Credexus <onboarding@resend.dev>";

  if (!apiKey || to.length === 0) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Email is not configured: set RESEND_API_KEY and LEADS_TO_EMAIL");
    }
    console.info(
      `[email:dev] ${subject}\n${renderText(fields)}\nattachments: ${attachments?.map((a) => `${a.filename} (${a.content.byteLength} B)`).join(", ") || "none"}`,
    );
    return;
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject,
    replyTo,
    html: renderHtml(subject, fields),
    text: renderText(fields),
    attachments,
  });
  if (error) throw new Error(`Resend error: ${error.name} — ${error.message}`);
}

/** Optional confirmation to the applicant. Never throws. */
export async function sendConfirmation(to: string, firstName: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || process.env.SEND_CONFIRMATION_EMAIL !== "true") return;
  try {
    await new Resend(apiKey).emails.send({
      from: process.env.LEADS_FROM_EMAIL || "Credexus <onboarding@resend.dev>",
      to,
      subject: "We received your Credexus application",
      text: `Hi ${firstName},\n\nThanks for applying to Credexus. Our team will review your profile and get back to you by email.\n\nCredexus is always free for engineers.\n\n— The Credexus team`,
    });
  } catch (e) {
    console.error("[email] confirmation failed", e);
  }
}
