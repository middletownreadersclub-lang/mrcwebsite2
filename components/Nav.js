"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "./Logo";
import { nav } from "@/content/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-parchment/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" aria-label="Middletown Readers Club, home">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`link-underline pb-0.5 text-sm ${
                pathname.startsWith(item.href)
                  ? "text-brass-deep"
                  : "text-navy/80 hover:text-navy"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#join"
            className="rounded-full bg-navy px-5 py-2 text-sm text-parchment transition-colors hover:bg-navy-soft"
          >
            Join the club
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
            {open ? (
              <path
                d="M5 5l14 14M19 5L5 19"
                stroke="#16294A"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 8h16M4 16h16"
                stroke="#16294A"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-navy/10 bg-parchment px-5 pb-6 pt-2 md:hidden"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block border-b border-navy/5 py-3 font-display text-lg text-navy"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#join"
            className="mt-5 block rounded-full bg-navy px-5 py-3 text-center text-sm text-parchment"
          >
            Join the club
          </Link>
        </nav>
      )}
    </header>
  );
}
