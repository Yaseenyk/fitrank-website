"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/components/nav";

// The only part of the header that needs the current path (active-link state).
export default function NavLinks() {
  const pathname = usePathname();
  return (
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
  );
}
