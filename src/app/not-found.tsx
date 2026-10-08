import { Container, PrimaryLink, SecondaryLink } from "@/components/Blocks";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <Container className="py-28">
      <h1 className="font-display text-5xl font-semibold text-ink">This page doesn&apos;t exist</h1>
      <p className="mt-4 max-w-[52ch] text-lg text-ink-soft">The link may be old or mistyped. Start from the home page or see what FitRank does.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <PrimaryLink href="/">Go to the home page</PrimaryLink>
        <SecondaryLink href="/features/">See features</SecondaryLink>
      </div>
    </Container>
  );
}
