import Link from "next/link";
import Logo from "@/components/Logo";
import NavLinks from "@/components/NavLinks";
import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="FitRank home">
          <Logo />
        </Link>

        <NavLinks />

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/contact/" className="rounded-md px-3 py-2 text-[15px] text-ink-soft hover:text-ink">
            Contact sales
          </Link>
          <Link href="/early-access/" className="rounded-md bg-cobalt px-4 py-2 text-[15px] font-semibold text-white hover:bg-cobalt-deep">
            Pre-register
          </Link>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
