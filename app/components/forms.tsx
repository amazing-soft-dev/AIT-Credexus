import { CheckCircle2, Loader2, Paperclip } from "lucide-react";
import * as React from "react";
import { Link, useFetcher, useSearchParams } from "react-router";
import { BorderBeam } from "~/components/magicui/border-beam";
import { Button } from "~/components/ui/button";
import { Input, NativeSelect, Textarea } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  CONTACT_TOPICS,
  CV_ACCEPT,
  ENGLISH_OPTIONS,
  type LeadResult,
  MAX_CV_BYTES,
  PARTNER_VOLUME_OPTIONS,
  REGION_OPTIONS,
} from "~/lib/leads.constants";
import { cn } from "~/lib/utils";

function Field({
  id,
  label,
  error,
  hint,
  optional,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactElement<Record<string, unknown>>;
}) {
  const describedBy =
    [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>
        {label}
        {optional && <span className="text-subtle ml-1.5 text-xs font-normal">optional</span>}
      </Label>
      {React.cloneElement(children, {
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
      })}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-subtle text-xs">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-danger text-xs">
          {error}
        </p>
      )}
    </div>
  );
}

/** Hidden anti-spam fields: honeypot + render timestamp. */
function BotTrap() {
  const [t, setT] = React.useState("");
  React.useEffect(() => setT(String(Date.now())), []);
  return (
    <>
      <input type="hidden" name="_t" value={t} />
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
    </>
  );
}

function Consent({ error, children }: { error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-muted flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          name="consent"
          required
          aria-invalid={error ? true : undefined}
          className="border-border-strong bg-background accent-primary mt-0.5 size-4 shrink-0 rounded"
        />
        <span>{children}</span>
      </label>
      {error && <p className="text-danger mt-2 text-xs">{error}</p>}
    </div>
  );
}

function FormShell({
  fetcher,
  action,
  multipart,
  children,
  submitLabel,
  title,
}: {
  fetcher: ReturnType<typeof useFetcher<LeadResult>>;
  action: string;
  multipart?: boolean;
  children: React.ReactNode;
  submitLabel: string;
  title?: string;
}) {
  const busy = fetcher.state !== "idle";
  const ref = React.useRef<HTMLFormElement>(null);
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => setHydrated(true), []);

  // Results from a no-JS submission come back as ?sent=<kind> / ?form_error=<kind> (see respond()).
  const [params] = useSearchParams();
  const kind = action.split("/").pop();
  const sent = params.get("sent") === kind;
  const failed = params.get("form_error") === kind;
  const result = React.useMemo<LeadResult | undefined>(
    () =>
      fetcher.data ??
      (sent
        ? {
            ok: true,
            message: "Thanks — your submission was received. We'll be in touch by email.",
          }
        : failed
          ? { ok: false, formError: "Please complete all required fields and try again." }
          : undefined),
    [fetcher.data, sent, failed],
  );

  React.useEffect(() => {
    const fe = fetcher.data && !fetcher.data.ok ? fetcher.data.fieldErrors : undefined;
    const first = fe ? Object.keys(fe)[0] : undefined;
    if (first) ref.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }, [fetcher.data]);

  if (result?.ok) {
    return (
      <div
        role="status"
        className="card glow-ring relative flex flex-col items-center px-6 py-14 text-center"
      >
        <span className="border-success/30 bg-success/10 text-success grid size-14 place-items-center rounded-full border">
          <CheckCircle2 className="size-7" aria-hidden />
        </span>
        <h3 className="mt-6 text-xl font-semibold">Thank you!</h3>
        <p className="text-muted mt-2 max-w-sm">{result.message}</p>
      </div>
    );
  }

  return (
    <fetcher.Form
      ref={ref}
      method="post"
      action={action}
      encType={multipart ? "multipart/form-data" : undefined}
      // Native browser validation until hydrated (no-JS fallback); our own messages after.
      noValidate={hydrated}
      className="card glow-ring relative flex flex-col gap-5 p-6 sm:p-8"
    >
      {title && <h3 className="text-xl font-semibold">{title}</h3>}
      <BotTrap />
      {children}
      {result && !result.ok && result.formError && (
        <p
          role="alert"
          className="border-danger/30 bg-danger/10 text-danger rounded-xl border px-4 py-3 text-sm"
        >
          {result.formError}
        </p>
      )}
      <Button type="submit" size="lg" disabled={busy} className="mt-1 w-full">
        {busy ? (
          <>
            <Loader2 className="animate-spin" aria-hidden /> Sending…
          </>
        ) : (
          submitLabel
        )}
      </Button>
      <BorderBeam size={180} duration={12} />
    </fetcher.Form>
  );
}

const errs = (r: LeadResult | undefined) => (r && !r.ok ? (r.fieldErrors ?? {}) : {});

export function ApplicationForm({
  jobId,
  defaultRegion,
  title,
}: {
  jobId?: string;
  defaultRegion?: string;
  title?: string;
}) {
  const fetcher = useFetcher<LeadResult>({ key: `apply-${jobId ?? "general"}` });
  const e = errs(fetcher.data);
  const [fileName, setFileName] = React.useState<string>("");
  const [fileError, setFileError] = React.useState<string>();

  return (
    <FormShell
      fetcher={fetcher}
      action="/api/apply"
      multipart
      submitLabel="Submit application"
      title={title}
    >
      {jobId && <input type="hidden" name="jobId" value={jobId} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="ap-name" label="Full name" error={e.fullName}>
          <Input
            name="fullName"
            autoComplete="name"
            required
            maxLength={120}
            placeholder="Ana Souza"
          />
        </Field>
        <Field id="ap-email" label="Email" error={e.email}>
          <Input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
          />
        </Field>
        <Field id="ap-linkedin" label="LinkedIn" error={e.linkedin}>
          <Input
            name="linkedin"
            type="url"
            inputMode="url"
            required
            placeholder="linkedin.com/in/you"
          />
        </Field>
        <Field id="ap-github" label="GitHub" optional error={e.github}>
          <Input name="github" type="url" inputMode="url" placeholder="github.com/you" />
        </Field>
        <Field id="ap-region" label="Primary region" error={e.region}>
          <NativeSelect name="region" required defaultValue={defaultRegion ?? ""}>
            <option value="" disabled>
              Select region
            </option>
            {REGION_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field id="ap-english" label="English proficiency" error={e.english}>
          <NativeSelect name="english" required defaultValue="">
            <option value="" disabled>
              Select level
            </option>
            {ENGLISH_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </NativeSelect>
        </Field>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="ap-cv">Resume / CV</Label>
        <label
          htmlFor="ap-cv"
          className={cn(
            "hover:border-accent/60 focus-within:border-accent/70 focus-within:ring-primary/20 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed px-4 py-4 text-sm transition-colors focus-within:ring-4 hover:bg-white/[0.02]",
            e.cv || fileError ? "border-danger/70" : "border-border-strong",
          )}
        >
          <span className="bg-primary/15 text-accent grid size-9 place-items-center rounded-lg">
            <Paperclip className="size-4" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="text-foreground block truncate">{fileName || "Upload your CV"}</span>
            <span className="text-subtle text-xs">PDF, DOC or DOCX · max 4 MB</span>
          </span>
          <input
            id="ap-cv"
            name="cv"
            type="file"
            accept={CV_ACCEPT}
            required
            aria-invalid={e.cv || fileError ? true : undefined}
            aria-describedby={e.cv || fileError ? "ap-cv-error" : undefined}
            className="sr-only"
            onChange={(ev) => {
              const f = ev.currentTarget.files?.[0];
              setFileName(f?.name ?? "");
              if (f && f.size > MAX_CV_BYTES) {
                setFileError("CV must be 4 MB or smaller");
                ev.currentTarget.value = "";
                setFileName("");
              } else setFileError(undefined);
            }}
          />
        </label>
        {(fileError || e.cv) && (
          <p id="ap-cv-error" className="text-danger text-xs">
            {fileError || e.cv}
          </p>
        )}
      </div>

      <Consent error={e.consent}>
        I agree that Credexus may store my details and CV to assess my application and share my
        profile with a platform only after asking me. See our{" "}
        <Link to="/privacy" className="text-accent underline underline-offset-4">
          privacy policy
        </Link>
        .
      </Consent>
    </FormShell>
  );
}

export function PartnerForm() {
  const fetcher = useFetcher<LeadResult>({ key: "partner" });
  const e = errs(fetcher.data);
  return (
    <FormShell fetcher={fetcher} action="/api/partner" submitLabel="Send inquiry">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="pt-name" label="Your name" error={e.name}>
          <Input name="name" autoComplete="name" required />
        </Field>
        <Field id="pt-email" label="Work email" error={e.email}>
          <Input name="email" type="email" autoComplete="email" required />
        </Field>
        <Field id="pt-company" label="Company" error={e.company}>
          <Input name="company" autoComplete="organization" required />
        </Field>
        <Field id="pt-website" label="Website" optional error={e.website}>
          <Input name="website" type="url" inputMode="url" placeholder="company.com" />
        </Field>
      </div>
      <Field id="pt-volume" label="How many engineers do you need?" error={e.volume}>
        <NativeSelect name="volume" required defaultValue="">
          <option value="" disabled>
            Select volume
          </option>
          {PARTNER_VOLUME_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </NativeSelect>
      </Field>
      <Field id="pt-message" label="Project details" error={e.message}>
        <Textarea
          name="message"
          required
          placeholder="Stacks, seniority, languages, regions, timelines…"
        />
      </Field>
      <Consent error={e.consent}>
        I agree that Credexus may use these details to respond to my inquiry.
      </Consent>
    </FormShell>
  );
}

export function ContactForm() {
  const fetcher = useFetcher<LeadResult>({ key: "contact" });
  const e = errs(fetcher.data);
  return (
    <FormShell fetcher={fetcher} action="/api/contact" submitLabel="Send message">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="ct-name" label="Name" error={e.name}>
          <Input name="name" autoComplete="name" required />
        </Field>
        <Field id="ct-email" label="Email" error={e.email}>
          <Input name="email" type="email" autoComplete="email" required />
        </Field>
      </div>
      <Field id="ct-topic" label="Topic" error={e.topic}>
        <NativeSelect name="topic" required defaultValue="">
          <option value="" disabled>
            Select a topic
          </option>
          {CONTACT_TOPICS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </NativeSelect>
      </Field>
      <Field id="ct-message" label="Message" error={e.message}>
        <Textarea name="message" required />
      </Field>
      <Consent error={e.consent}>
        I agree that Credexus may use these details to reply to me.
      </Consent>
    </FormShell>
  );
}
