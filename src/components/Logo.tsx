/** Wordmark: the app's mark, two overlapping rounded squares (a person and a task meeting). */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7">
        <rect x="3" y="5" width="18" height="18" rx="6" fill="none" stroke="#7C5CF6" strokeWidth="3.5" />
        <rect x="11" y="9" width="18" height="18" rx="6" fill="none" stroke="#EC4899" strokeWidth="3.5" />
      </svg>
      <span className="font-display text-[1.35rem] font-bold tracking-tight text-ink">FitRank</span>
    </span>
  );
}
