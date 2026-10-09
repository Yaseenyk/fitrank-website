"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { EMAILJS } from "@/lib/emailjs";
import { withBase } from "@/lib/site";

export type Intent = "early-access" | "sales" | "demo" | "question";

const INTENTS: { value: Intent; label: string }[] = [
  { value: "early-access", label: "Pre-register for early access" },
  { value: "sales", label: "Talk to sales about an annual licence" },
  { value: "demo", label: "Book a demo" },
  { value: "question", label: "Ask a question" },
];

const TEAM_SIZES = ["Under 100 people", "100–500 people", "500–2,000 people", "2,000+ people"];

const EMPTY = {
  name: "",
  email: "",
  company: "",
  role: "",
  phone: "",
  teamSize: "",
  message: "",
  website: "", // honeypot: hidden from people, filled by bots
};

type Status = "idle" | "sending" | "sent" | "error";

const SUBMIT_LABEL: Record<Intent, string> = {
  "early-access": "Pre-register",
  sales: "Contact sales",
  demo: "Request a demo",
  question: "Send question",
};

const SENT_MESSAGE: Record<Intent, string> = {
  "early-access": "You're pre-registered. We'll email you about pilot places.",
  sales: "Message sent. We'll reply by email.",
  demo: "Demo requested. We'll email you to agree a time.",
  question: "Question sent. We'll reply by email.",
};

export default function LeadForm({ defaultIntent = "early-access" }: { defaultIntent?: Intent }) {
  const [intent, setIntent] = useState<Intent>(defaultIntent);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [sentIntent, setSentIntent] = useState<Intent>(defaultIntent);
  const [errorDetail, setErrorDetail] = useState("");

  function update(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (status === "sent" || status === "error") setStatus("idle");
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    if (form.website) {
      setSentIntent(intent);
      setStatus("sent");
      return;
    }
    setStatus("sending");
    setErrorDetail("");

    const intentLabel = INTENTS.find((i) => i.value === intent)?.label ?? intent;
    const body = [
      `*** FITRANK — ${intentLabel.toUpperCase()} ***`,
      `Company: ${form.company}`,
      `Role: ${form.role || "-"}`,
      `Team size: ${form.teamSize || "-"}`,
      `Phone: ${form.phone || "-"}`,
      `Page: ${typeof window !== "undefined" ? window.location.pathname : "-"}`,
      "",
      form.message || "(no message)",
    ].join("\n");

    try {
      await emailjs.send(
        EMAILJS.service,
        EMAILJS.template,
        {
          name: form.name,
          from_name: form.name,
          email: form.email,
          reply_to: form.email,
          to_name: EMAILJS.toName,
          to_email: EMAILJS.toEmail,
          message: body,
        },
        EMAILJS.publicKey,
      );
      setSentIntent(intent);
      setStatus("sent");
      setForm(EMPTY);
    } catch (err) {
      const e = err as { status?: number; text?: string };
      setErrorDetail(e?.text ? `${e.status ?? ""} ${e.text}`.trim() : "");
      setStatus("error");
    }
  }

  const disabled = status === "sending";
  const field =
    "mt-1.5 block w-full rounded-md border border-line bg-white px-3 py-2.5 text-[15px] text-ink placeholder:text-ink-mute/70 focus:border-cobalt focus:outline-none focus:ring-2 focus:ring-cobalt/20 disabled:opacity-60";
  const label = "block text-sm font-medium text-ink";

  return (
    <form onSubmit={submit} className="grid gap-5" noValidate={false}>
      <fieldset>
        <legend className={label}>What would you like to do?</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {INTENTS.map((i) => (
            <label
              key={i.value}
              className={`flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2.5 text-sm transition-colors ${
                intent === i.value
                  ? "border-cobalt bg-cobalt-wash text-ink"
                  : "border-line bg-white text-ink-soft hover:border-ink-mute"
              }`}
            >
              <input
                type="radio"
                name="intent"
                value={i.value}
                checked={intent === i.value}
                onChange={() => setIntent(i.value)}
                className="accent-cobalt"
              />
              {i.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>
          Full name
          <input name="name" required autoComplete="name" value={form.name} onChange={update} disabled={disabled} className={field} />
        </label>
        <label className={label}>
          Work email
          <input name="email" type="email" required autoComplete="email" value={form.email} onChange={update} disabled={disabled} className={field} />
        </label>
        <label className={label}>
          Company
          <input name="company" required autoComplete="organization" value={form.company} onChange={update} disabled={disabled} className={field} />
        </label>
        <label className={label}>
          Your role <span className="font-normal text-ink-mute">(optional)</span>
          <input name="role" autoComplete="organization-title" placeholder="e.g. Head of delivery" value={form.role} onChange={update} disabled={disabled} className={field} />
        </label>
        <label className={label}>
          Phone <span className="font-normal text-ink-mute">(optional)</span>
          <input name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={update} disabled={disabled} className={field} />
        </label>
        <label className={label}>
          Company size <span className="font-normal text-ink-mute">(optional)</span>
          <select name="teamSize" value={form.teamSize} onChange={update} disabled={disabled} className={field}>
            <option value="">Choose a size</option>
            {TEAM_SIZES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>

      <label className={label}>
        How do you staff work today? <span className="font-normal text-ink-mute">(optional)</span>
        <textarea name="message" rows={4} value={form.message} onChange={update} disabled={disabled} className={field} placeholder="Tools you use, how many tasks you staff a month, what's hardest." />
      </label>

      <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} />
        </label>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex items-center justify-center rounded-md bg-cobalt px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-cobalt-deep disabled:opacity-70"
        >
          {status === "sending" ? "Sending…" : SUBMIT_LABEL[intent]}
        </button>
        <p className="text-sm text-ink-mute">
          We use your details only to reply. See the <a href={withBase("/privacy/")} className="underline underline-offset-2 hover:text-ink">privacy notice</a>.
        </p>
      </div>

      <div aria-live="polite" className="text-[15px]">
        {status === "sent" && (
          <p className="rounded-md border border-shortlist/30 bg-shortlist-wash px-4 py-3 text-ink">{SENT_MESSAGE[sentIntent]}</p>
        )}
        {status === "error" && (
          <p className="rounded-md border border-review/40 bg-review-wash px-4 py-3 text-ink">
            The message didn&apos;t send{errorDetail ? ` (${errorDetail})` : ""}. Email{" "}
            <a href={`mailto:${EMAILJS.toEmail}`} className="font-medium underline">{EMAILJS.toEmail}</a> instead, or try again.
          </p>
        )}
      </div>
    </form>
  );
}
