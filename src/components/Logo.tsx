/** Wordmark: three bars in the band colours, tallest first, like a ranked shortlist. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
        <rect x="2" y="3" width="20" height="5" rx="1.5" fill="#0E7C66" />
        <rect x="2" y="10" width="14" height="5" rx="1.5" fill="#B7791F" />
        <rect x="2" y="17" width="8" height="5" rx="1.5" fill="#8A94A6" />
      </svg>
      <span className="font-display text-[1.35rem] font-semibold tracking-tight text-ink">FitRank</span>
    </span>
  );
}
