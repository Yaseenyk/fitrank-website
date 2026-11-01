"use client";

import { useMemo, useState } from "react";

type Unit = "days" | "months";

const DAY = 24 * 60 * 60 * 1000;

function parse(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return m ? new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]))) : null;
}

function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function show(d: Date): string {
  return d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

function todayIso(): string {
  return new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);
}

/** Last working day: N days counted from the resignation day (or the day after), or N months to the same date. */
function lastWorkingDay(start: Date, amount: number, unit: Unit, countResignationDay: boolean): Date {
  if (unit === "months") {
    const d = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + amount, 1));
    const lastOfMonth = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
    d.setUTCDate(Math.min(start.getUTCDate(), lastOfMonth));
    return countResignationDay ? new Date(d.getTime() - DAY) : d;
  }
  return new Date(start.getTime() + (countResignationDay ? amount - 1 : amount) * DAY);
}

export default function NoticePeriodCalculator() {
  const [resigned, setResigned] = useState(todayIso());
  const [amount, setAmount] = useState(90);
  const [unit, setUnit] = useState<Unit>("days");
  const [countDay, setCountDay] = useState(true);
  const [buyout, setBuyout] = useState(0);

  const result = useMemo(() => {
    const start = parse(resigned);
    if (!start || !Number.isFinite(amount) || amount < 1 || amount > 365) return null;
    const last = lastWorkingDay(start, amount, unit, countDay);
    const shortened = buyout > 0 ? new Date(last.getTime() - buyout * DAY) : null;
    const today = parse(todayIso())!;
    const left = Math.round((last.getTime() - today.getTime()) / DAY);
    const weekend = [0, 6].includes(last.getUTCDay());
    return { last, shortened, left, weekend };
  }, [resigned, amount, unit, countDay, buyout]);

  const field = "mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-ink focus:border-cobalt focus:outline-none";

  return (
    <div className="grid gap-8 rounded-xl border border-line bg-white p-6 sm:p-8 lg:grid-cols-[1fr_1.1fr]">
      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()} aria-label="Notice period details">
        <label className="block text-sm font-medium text-ink">
          Date you resign (submit your resignation)
          <input type="date" className={field} value={resigned} onChange={(e) => setResigned(e.target.value)} />
        </label>
        <div className="grid grid-cols-[1fr_1fr] gap-3">
          <label className="block text-sm font-medium text-ink">
            Notice period
            <input
              type="number"
              min={1}
              max={365}
              className={field}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </label>
          <label className="block text-sm font-medium text-ink">
            In
            <select className={field} value={unit} onChange={(e) => setUnit(e.target.value as Unit)}>
              <option value="days">days</option>
              <option value="months">months</option>
            </select>
          </label>
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Common notice periods">
          {[30, 60, 90].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                setAmount(n);
                setUnit("days");
              }}
              className="rounded-md border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-cobalt hover:text-ink"
            >
              {n} days
            </button>
          ))}
        </div>
        <label className="flex items-start gap-3 text-sm text-ink">
          <input type="checkbox" className="mt-1" checked={countDay} onChange={(e) => setCountDay(e.target.checked)} />
          <span>Count the day I resign as day 1 of the notice period (common in Indian companies; check your offer letter)</span>
        </label>
        <label className="block text-sm font-medium text-ink">
          Days you plan to buy out or have waived (optional)
          <input type="number" min={0} max={365} className={field} value={buyout} onChange={(e) => setBuyout(Math.max(0, Number(e.target.value)))} />
        </label>
      </form>

      <div aria-live="polite" className="rounded-lg bg-paper p-6">
        {result ? (
          <>
            <p className="text-sm text-ink-mute">Last working day</p>
            <p className="mt-1 font-display text-3xl font-semibold text-ink">{show(result.last)}</p>
            <p className="mt-1 text-sm text-ink-mute">{iso(result.last)}</p>
            {result.weekend && <p className="mt-3 text-sm text-ink-soft">This falls on a weekend. Many companies then treat the Friday before as your last working day; ask HR.</p>}
            <p className="mt-4 leading-relaxed text-ink-soft">
              {result.left > 0 ? `${result.left} days from today.` : result.left === 0 ? "That is today." : `That was ${-result.left} days ago.`}
            </p>
            {result.shortened && (
              <p className="mt-4 leading-relaxed text-ink-soft">
                With {buyout} days bought out or waived: <strong className="text-ink">{show(result.shortened)}</strong>.
              </p>
            )}
            <p className="mt-6 text-sm leading-relaxed text-ink-mute">
              Calendar days, not working days. Holidays and leave during notice are counted the way your company&rsquo;s policy says, which this calculator
              cannot know. Your offer letter or HR policy is the final word.
            </p>
          </>
        ) : (
          <p className="text-ink-soft">Enter a resignation date and a notice period between 1 and 365 days.</p>
        )}
      </div>
    </div>
  );
}
