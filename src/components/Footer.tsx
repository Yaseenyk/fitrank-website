import Link from "next/link";
import Logo from "@/components/Logo";
import { CONTACT, MAKER } from "@/lib/site";
import { USE_CASES } from "@/lib/content";

const PRODUCT_LINKS = [
  { href: "/features/", label: "Features" },
  { href: "/how-it-works/", label: "How it works" },
  { href: "/results/", label: "Benchmarks" },
  { href: "/security/", label: "Trust and privacy" },
  { href: "/pricing/", label: "Pricing" },
];

const COMPANY_LINKS = [
  { href: "/early-access/", label: "Pre-register" },
  { href: "/contact/", label: "Contact sales" },
  { href: "/privacy/", label: "Privacy notice" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-paper-deep/60">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1.3fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
            Staffing recommendations with a probability and a reason for every person. A manager makes every final call.
          </p>
          <p className="mt-6 text-sm text-ink-soft">
            <a href={`mailto:${CONTACT.email}`} className="hover:text-ink">{CONTACT.email}</a>
            <br />
            <a href={CONTACT.phoneHref} className="tabular hover:text-ink">{CONTACT.phoneDisplay}</a>
            <br />
            {CONTACT.city}, {CONTACT.country}
          </p>
        </div>
        <FooterList title="Product" links={PRODUCT_LINKS} />
        <FooterList
          title="Use cases"
          links={USE_CASES.slice(0, 6).map((u) => ({ href: `/use-cases/${u.slug}/`, label: u.title }))}
        />
        <FooterList title="Company" links={COMPANY_LINKS} />
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-page flex-col gap-2 px-4 py-6 text-sm text-ink-mute sm:flex-row sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} FitRank. Built by <a href={MAKER.url} className="underline underline-offset-2 hover:text-ink">{MAKER.name}</a>.</p>
          <p>Early access. Sold as an annual licence.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-ink-soft hover:text-ink">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
