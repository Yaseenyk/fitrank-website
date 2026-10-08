"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";

const NAV = [
  { href: "/features/", label: "Features" },
  { href: "/use-cases/", label: "Use cases" },
  { href: "/how-it-works/", label: "How it works" },
  { href: "/security/", label: "Trust" },
  { href: "/pricing/", label: "Pricing" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="FitRank home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => {
            const active = pathname?.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-[15px] transition-colors ${
                  active ? "text-ink font-medium" : "text-ink-soft hover:text-ink"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/contact/" className="rounded-md px-3 py-2 text-[15px] text-ink-soft hover:text-ink">
            Contact sales
          </Link>
          <Link href="/early-access/" className="rounded-md bg-cobalt px-4 py-2 text-[15px] font-semibold text-white hover:bg-cobalt-deep">
            Pre-register
          </Link>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-line bg-paper px-4 pb-5 pt-2 md:hidden">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block border-b border-line/70 py-3 text-base text-ink">
              {n.label}
            </Link>
          ))}
          <div className="mt-4 grid gap-2">
            <Link href="/early-access/" onClick={() => setOpen(false)} className="rounded-md bg-cobalt px-4 py-3 text-center font-semibold text-white">
              Pre-register
            </Link>
            <Link href="/contact/" onClick={() => setOpen(false)} className="rounded-md border border-line px-4 py-3 text-center text-ink">
              Contact sales
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
