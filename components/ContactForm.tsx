"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { fill } from "@/lib/i18n";
import { site } from "@/lib/site";

// Where the form is sent. Set NEXT_PUBLIC_CONTACT_ENDPOINT (see .env.example) to a form service
// such as Formspree or Web3Forms, or to your own API. Without it the form falls back to opening
// the visitor's email app, which is what the original draft did.
const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

type Status = { kind: "idle" | "sending" | "sent" | "error"; message?: string };

export default function ContactForm({ t }: { t: Dictionary["contact"]["form"] }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = `${data.get("firstName") ?? ""} ${data.get("lastName") ?? ""}`.trim();
    const subject = fill(t.subject, { name });

    if (!endpoint) {
      const body = `${data.get("message")}\n\n— ${name}\n${data.get("email")}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus({ kind: "sending" });
    try {
      data.set("subject", subject);
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus({ kind: "sent", message: t.sent });
    } catch {
      setStatus({ kind: "error", message: fill(t.error, { email: site.email }) });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="fn">{t.firstName}</label>
        <input id="fn" name="firstName" autoComplete="given-name" required />
      </div>
      <div className="field">
        <label htmlFor="ln">{t.lastName}</label>
        <input id="ln" name="lastName" autoComplete="family-name" />
      </div>
      <div className="field full">
        <label htmlFor="em">{t.email}</label>
        <input id="em" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field full">
        <label htmlFor="msg">{t.message}</label>
        <textarea id="msg" name="message" required />
      </div>
      <button className="btn" type="submit" disabled={status.kind === "sending"}>
        {status.kind === "sending" ? t.sending : t.send} <span aria-hidden="true">→</span>
      </button>
      {status.message && (
        <p className={`form-status${status.kind === "error" ? " error" : ""}`} role="status">
          {status.message}
        </p>
      )}
    </form>
  );
}
