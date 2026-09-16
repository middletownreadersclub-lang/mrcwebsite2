"use client";

import { useState } from "react";
import { site } from "@/content/site";

export default function JoinForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

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

      const payload = await res.json().catch(() => null);
      setError(
        payload?.errors?.[0]?.message ||
          "That did not go through. Try again, or email us directly."
      );
      setStatus("error");
    } catch {
      setError("No connection. Check your network and try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-sm border border-brass/50 bg-white/70 p-8">
        <h3 className="font-display text-2xl text-navy">You are in</h3>
        <p className="mt-3 max-w-reading text-navy/75">
          We will email you the schedule for the coming month, and the Zoom link
          the day before each session. Nothing else.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-navy/70">Name</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            className="mt-1.5 w-full border-b border-navy/25 bg-transparent py-2 text-navy outline-none transition-colors focus:border-brass"
          />
        </label>
        <label className="block">
          <span className="text-sm text-navy/70">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="mt-1.5 w-full border-b border-navy/25 bg-transparent py-2 text-navy outline-none transition-colors focus:border-brass"
          />
        </label>
      </div>

      <fieldset>
        <legend className="text-sm text-navy/70">
          What brings you here?
        </legend>
        <div className="mt-3 flex flex-wrap gap-5">
          {[
            ["reader", "I want to read and discuss"],
            ["author", "I have a book to spotlight"],
            ["both", "Both"],
          ].map(([value, label]) => (
            <label key={value} className="flex items-center gap-2 text-sm text-navy/80">
              <input
                type="radio"
                name="role"
                value={value}
                defaultChecked={value === "reader"}
                className="h-4 w-4 accent-[#C2A04A]"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="text-sm text-navy/70">
          Anything you want us to know (optional)
        </span>
        <textarea
          name="message"
          rows={3}
          className="mt-1.5 w-full border-b border-navy/25 bg-transparent py-2 text-navy outline-none transition-colors focus:border-brass"
        />
      </label>

      {/* honeypot */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} aria-hidden="true" />

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-navy px-7 py-3 text-sm text-parchment transition-colors hover:bg-navy-soft disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Join the club"}
        </button>
        <p className="text-sm text-navy/55">
          Free. Schedule by email, nothing else.
        </p>
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-[#9A3412]">
          {error}
        </p>
      )}
    </form>
  );
}
