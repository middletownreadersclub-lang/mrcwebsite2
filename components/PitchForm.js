"use client";

import { useState } from "react";
import { site } from "@/content/site";

const fields = [
  { name: "name", label: "Your name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "book", label: "Book title", type: "text", required: true },
  { name: "genre", label: "Genre or category", type: "text", required: false },
  { name: "link", label: "Link to the book", type: "url", required: false },
];

export default function PitchForm() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("_subject", "Author spotlight pitch");

    setStatus("sending");
    setError("");

    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setStatus("done");
        form.reset();
        return;
      }
      setError("That did not go through. Try again, or email us directly.");
      setStatus("error");
    } catch {
      setError("No connection. Check your network and try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="border border-brass/50 bg-white/70 p-8">
        <h3 className="font-display text-2xl text-navy">Pitch received</h3>
        <p className="mt-3 max-w-reading text-navy/75">
          We read everything that comes in and reply either way, usually within a
          week. If it is a fit, Pollyanna will send you two or three dates.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.name} className="block">
            <span className="text-sm text-navy/70">
              {f.label}
              {!f.required && (
                <span className="text-navy/40"> (optional)</span>
              )}
            </span>
            <input
              type={f.type}
              name={f.name}
              required={f.required}
              className="mt-1.5 w-full border-b border-navy/25 bg-transparent py-2 text-navy outline-none transition-colors focus:border-brass"
            />
          </label>
        ))}
      </div>

      <label className="block">
        <span className="text-sm text-navy/70">
          What would you want the selling desk to look at?
        </span>
        <textarea
          name="ask"
          rows={4}
          placeholder="Categories, blurb, launch plan, list — whatever is stuck."
          className="mt-1.5 w-full border-b border-navy/25 bg-transparent py-2 leading-relaxed text-navy outline-none transition-colors placeholder:text-navy/35 focus:border-brass"
        />
      </label>

      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} aria-hidden="true" />

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-navy px-7 py-3 text-sm text-parchment transition-colors hover:bg-navy-soft disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Put your book forward"}
        </button>
        <p className="text-sm text-navy/55">No fee, ever.</p>
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-[#9A3412]">
          {error}
        </p>
      )}
    </form>
  );
}
