import { METRICS } from "@/lib/content";

export function BenchmarkTable({ rows }: { rows: typeof METRICS }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-white">
      <table className="w-full min-w-[30rem] text-left">
        <caption className="sr-only">FitRank compared with a rules-only ranking</caption>
        <thead>
          <tr className="border-b border-line text-sm text-ink-mute">
            <th scope="col" className="px-5 py-3 font-medium">Measure</th>
            <th scope="col" className="px-5 py-3 font-medium text-ink">FitRank</th>
            <th scope="col" className="px-5 py-3 font-medium">Rules only</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((m) => (
            <tr key={m.label} className="border-b border-line last:border-0 align-top">
              <th scope="row" className="px-5 py-4 font-normal text-ink-soft">
                {m.label}
                {m.note && <span className="mt-1 block text-sm text-ink-mute">{m.note}</span>}
              </th>
              <td className="tabular px-5 py-4 font-display text-2xl font-semibold text-ink">{m.fitrank}</td>
              <td className="tabular px-5 py-4 text-lg text-ink-mute">{m.baseline ?? "n/a"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="mt-0.5 h-5 w-5 flex-none text-shortlist">
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.12" />
      <path d="M6 10.5l2.5 2.5L14 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
