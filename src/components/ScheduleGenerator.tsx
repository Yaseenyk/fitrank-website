"use client";

import { useMemo, useState } from "react";

// A free, browser-only weekly schedule generator. Nothing leaves the page: no backend, no storage.
// People, shifts and simple constraints in; a filled week, per-person totals and unfilled slots out.

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;
const ALL_DAYS: Day[] = [0, 1, 2, 3, 4, 5, 6];

type Person = { id: number; name: string; maxShifts: number; unavailable: Day[] };
type Shift = { id: number; name: string; days: Day[]; needed: number };

type Slot = { shift: Shift; day: Day; assigned: Person[]; short: number };

const EXAMPLE_PEOPLE: Person[] = [
  { id: 1, name: "Asha", maxShifts: 5, unavailable: [6] },
  { id: 2, name: "Ben", maxShifts: 5, unavailable: [0] },
  { id: 3, name: "Chen", maxShifts: 4, unavailable: [5, 6] },
  { id: 4, name: "Dev", maxShifts: 5, unavailable: [] },
  { id: 5, name: "Elena", maxShifts: 3, unavailable: [1, 3] },
  { id: 6, name: "Farid", maxShifts: 5, unavailable: [2] },
];
const EXAMPLE_SHIFTS: Shift[] = [
  { id: 1, name: "Morning", days: [0, 1, 2, 3, 4, 5, 6], needed: 2 },
  { id: 2, name: "Evening", days: [0, 1, 2, 3, 4, 5, 6], needed: 1 },
  { id: 3, name: "Saturday cover", days: [5], needed: 1 },
];

/**
 * Greedy fill, scarcest slot first. For each slot it picks the eligible person with the fewest
 * shifts so far (ties: fewest available days, then list order). Deterministic, so the same input
 * always gives the same schedule. It does not search for a globally optimal plan.
 */
export function generate(people: Person[], shifts: Shift[], oneShiftPerDay: boolean): { slots: Slot[]; load: Map<number, number> } {
  const load = new Map<number, number>(people.map((p) => [p.id, 0]));
  const busy = new Set<string>(); // `${personId}-${day}`
  const eligible = (p: Person, day: Day) => !p.unavailable.includes(day) && (!oneShiftPerDay || !busy.has(`${p.id}-${day}`));

  const slots: Slot[] = [];
  for (const shift of shifts) for (const day of [...shift.days].sort()) slots.push({ shift, day, assigned: [], short: 0 });
  // Fill the slots with the fewest possible people first, so the hard ones are not left with nobody.
  slots.sort((a, b) => {
    const ca = people.filter((p) => !p.unavailable.includes(a.day)).length - a.shift.needed;
    const cb = people.filter((p) => !p.unavailable.includes(b.day)).length - b.shift.needed;
    return ca - cb || a.day - b.day || a.shift.id - b.shift.id;
  });

  for (const slot of slots) {
    for (let k = 0; k < slot.shift.needed; k++) {
      const pick = people
        .filter((p) => eligible(p, slot.day) && (load.get(p.id) ?? 0) < p.maxShifts && !slot.assigned.includes(p))
        .sort((a, b) => (load.get(a.id) ?? 0) - (load.get(b.id) ?? 0) || b.unavailable.length - a.unavailable.length || a.id - b.id)[0];
      if (!pick) {
        slot.short++;
        continue;
      }
      slot.assigned.push(pick);
      load.set(pick.id, (load.get(pick.id) ?? 0) + 1);
      busy.add(`${pick.id}-${slot.day}`);
    }
  }
  slots.sort((a, b) => a.shift.id - b.shift.id || a.day - b.day);
  return { slots, load };
}

function toRows(shifts: Shift[], slots: Slot[]): string[][] {
  const header = ["Shift", ...DAYS];
  const rows = shifts.map((s) => [
    s.name,
    ...ALL_DAYS.map((d) => {
      const slot = slots.find((x) => x.shift.id === s.id && x.day === d);
      if (!slot) return "";
      const names = slot.assigned.map((p) => p.name);
      if (slot.short) names.push(`UNFILLED x${slot.short}`);
      return names.join(", ");
    }),
  ]);
  return [header, ...rows];
}

const csvCell = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);

function DayPicker({ value, onChange, label }: { value: Day[]; onChange: (d: Day[]) => void; label: string }) {
  return (
    <fieldset className="flex flex-wrap gap-1">
      <legend className="sr-only">{label}</legend>
      {ALL_DAYS.map((d) => {
        const on = value.includes(d);
        return (
          <label key={d} className={`cursor-pointer select-none rounded px-1.5 py-0.5 text-xs ${on ? "bg-cobalt text-white" : "bg-paper text-ink-soft"}`}>
            <input
              type="checkbox"
              className="sr-only"
              checked={on}
              onChange={(e) => onChange(e.target.checked ? [...value, d].sort() : value.filter((x) => x !== d))}
            />
            {DAYS[d]}
          </label>
        );
      })}
    </fieldset>
  );
}

const inputClass = "w-full rounded-md border border-line bg-white px-2.5 py-1.5 text-[15px] text-ink focus:border-cobalt";
const buttonClass = "rounded-md border border-ink/20 bg-white px-3 py-1.5 text-sm font-medium text-ink hover:border-ink/50";

export default function ScheduleGenerator() {
  const [people, setPeople] = useState<Person[]>(EXAMPLE_PEOPLE);
  const [shifts, setShifts] = useState<Shift[]>(EXAMPLE_SHIFTS);
  const [oneShiftPerDay, setOneShiftPerDay] = useState(true);
  const [result, setResult] = useState<ReturnType<typeof generate> | null>(null);
  const [copied, setCopied] = useState(false);

  const nextId = (xs: { id: number }[]) => Math.max(0, ...xs.map((x) => x.id)) + 1;
  const updatePerson = (id: number, patch: Partial<Person>) => setPeople((ps) => ps.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  const updateShift = (id: number, patch: Partial<Shift>) => setShifts((ss) => ss.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const demand = useMemo(() => shifts.reduce((n, s) => n + s.days.length * s.needed, 0), [shifts]);
  const capacity = useMemo(() => people.reduce((n, p) => n + Math.min(p.maxShifts, 7 - p.unavailable.length), 0), [people]);

  const run = () => {
    const valid = people.filter((p) => p.name.trim());
    setResult(generate(valid, shifts.filter((s) => s.name.trim() && s.days.length), oneShiftPerDay));
    setCopied(false);
  };

  const rows = result ? toRows(shifts, result.slots) : [];
  const unfilled = result ? result.slots.reduce((n, s) => n + s.short, 0) : 0;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(rows.map((r) => r.join("\t")).join("\n"));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };
  const download = () => {
    const csv = rows.map((r) => r.map(csvCell).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "weekly-schedule.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-xl border border-line bg-white p-5 sm:p-6">
      <div className="grid gap-8 lg:grid-cols-2">
        <section aria-labelledby="gen-people">
          <div className="flex items-baseline justify-between">
            <h2 id="gen-people" className="font-display text-xl font-semibold text-ink">1. People</h2>
            <button type="button" className={buttonClass} onClick={() => setPeople((ps) => [...ps, { id: nextId(ps), name: "", maxShifts: 5, unavailable: [] }])}>
              Add person
            </button>
          </div>
          <p className="mt-1 text-sm text-ink-mute">Name, the most shifts they can take this week, and the days they cannot work.</p>
          <ul className="mt-4 space-y-3">
            {people.map((p) => (
              <li key={p.id} className="grid grid-cols-[1fr_5rem_auto] items-center gap-2 rounded-lg border border-line p-3">
                <input aria-label="Name" className={inputClass} value={p.name} placeholder="Name" onChange={(e) => updatePerson(p.id, { name: e.target.value })} />
                <label className="text-xs text-ink-mute">
                  Max shifts
                  <input
                    type="number"
                    min={0}
                    max={14}
                    className={`${inputClass} mt-0.5`}
                    value={p.maxShifts}
                    onChange={(e) => updatePerson(p.id, { maxShifts: Math.max(0, Number(e.target.value) || 0) })}
                  />
                </label>
                <button type="button" aria-label={`Remove ${p.name || "person"}`} className="text-sm text-ink-mute hover:text-ink" onClick={() => setPeople((ps) => ps.filter((x) => x.id !== p.id))}>
                  Remove
                </button>
                <div className="col-span-3">
                  <span className="text-xs text-ink-mute">Unavailable on:</span>
                  <DayPicker label={`Days ${p.name || "this person"} cannot work`} value={p.unavailable} onChange={(d) => updatePerson(p.id, { unavailable: d })} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="gen-shifts">
          <div className="flex items-baseline justify-between">
            <h2 id="gen-shifts" className="font-display text-xl font-semibold text-ink">2. Shifts or tasks</h2>
            <button type="button" className={buttonClass} onClick={() => setShifts((ss) => [...ss, { id: nextId(ss), name: "", days: [0, 1, 2, 3, 4], needed: 1 }])}>
              Add shift
            </button>
          </div>
          <p className="mt-1 text-sm text-ink-mute">A shift&apos;s name, the days it runs, and how many people it needs each day.</p>
          <ul className="mt-4 space-y-3">
            {shifts.map((s) => (
              <li key={s.id} className="grid grid-cols-[1fr_5rem_auto] items-center gap-2 rounded-lg border border-line p-3">
                <input aria-label="Shift name" className={inputClass} value={s.name} placeholder="Shift name" onChange={(e) => updateShift(s.id, { name: e.target.value })} />
                <label className="text-xs text-ink-mute">
                  People
                  <input
                    type="number"
                    min={1}
                    max={20}
                    className={`${inputClass} mt-0.5`}
                    value={s.needed}
                    onChange={(e) => updateShift(s.id, { needed: Math.max(1, Number(e.target.value) || 1) })}
                  />
                </label>
                <button type="button" aria-label={`Remove ${s.name || "shift"}`} className="text-sm text-ink-mute hover:text-ink" onClick={() => setShifts((ss) => ss.filter((x) => x.id !== s.id))}>
                  Remove
                </button>
                <div className="col-span-3">
                  <span className="text-xs text-ink-mute">Runs on:</span>
                  <DayPicker label={`Days ${s.name || "this shift"} runs`} value={s.days} onChange={(d) => updateShift(s.id, { days: d })} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-6">
        <label className="flex items-center gap-2 text-[15px] text-ink-soft">
          <input type="checkbox" checked={oneShiftPerDay} onChange={(e) => setOneShiftPerDay(e.target.checked)} />
          At most one shift per person per day
        </label>
        <p className="tabular text-sm text-ink-mute">
          {demand} slots to fill, {capacity} available this week{capacity < demand ? ": some slots will stay unfilled" : ""}
        </p>
        <button type="button" onClick={run} className="ml-auto rounded-md bg-cobalt px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-cobalt-deep">
          Generate schedule
        </button>
      </div>

      {result && (
        <section aria-labelledby="gen-result" className="mt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="gen-result" className="font-display text-xl font-semibold text-ink">3. Your week</h2>
            <div className="flex gap-2">
              <button type="button" className={buttonClass} onClick={copy}>{copied ? "Copied" : "Copy as text"}</button>
              <button type="button" className={buttonClass} onClick={download}>Download CSV</button>
            </div>
          </div>
          {unfilled > 0 ? (
            <p className="mt-2 rounded-md bg-review-wash px-3 py-2 text-sm text-review">
              {unfilled} slot{unfilled === 1 ? "" : "s"} could not be filled within the limits. Add people, raise a max, or free a day.
            </p>
          ) : (
            <p className="mt-2 rounded-md bg-shortlist-wash px-3 py-2 text-sm text-shortlist">Every slot is filled within the limits you set.</p>
          )}
          <div className="mt-4 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[44rem] text-left text-sm">
              <caption className="sr-only">Generated weekly schedule by shift and day</caption>
              <thead>
                <tr className="border-b border-line bg-paper text-ink-mute">
                  {rows[0].map((h) => <th key={h} scope="col" className="px-3 py-2 font-medium">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.slice(1).map((r) => (
                  <tr key={r[0]} className="border-b border-line last:border-0 align-top">
                    <th scope="row" className="px-3 py-2 font-semibold text-ink">{r[0]}</th>
                    {r.slice(1).map((cell, i) => (
                      <td key={i} className={`px-3 py-2 ${cell.includes("UNFILLED") ? "text-review" : "text-ink-soft"}`}>{cell || <span className="text-ink-mute">—</span>}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="mt-6 font-semibold text-ink">Shifts per person</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {people.filter((p) => p.name.trim()).map((p) => (
              <li key={p.id} className="tabular rounded-md border border-line px-3 py-1.5 text-sm text-ink-soft">
                {p.name}: {result.load.get(p.id) ?? 0} of {p.maxShifts}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
