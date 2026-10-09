"use client";

import { useState } from "react";

type Band = "shortlist" | "review" | "hidden";
type Decision = { key: string; options: [string, number][] };
type Candidate = {
  id: string;
  label: string;
  facts: string[];
  decisions: Decision[];
  fit: number;
  band: Band;
  flag?: string;
};

// Illustrative example for the hero. Numbers are made up for the demo, not benchmark results.
const CANDIDATES: Candidate[] = [
  {
    id: "a",
    label: "Candidate A",
    facts: ["Must-have skills 3 of 3", "4 years Azure Data Factory", "2 banking projects", "Free from 28 Oct"],
    decisions: [
      { key: "Skill match", options: [["excellent", 0.71], ["good", 0.22], ["partial", 0.07]] },
      { key: "Level fit", options: [["right", 0.86], ["over", 0.1], ["under", 0.04]] },
      { key: "Domain relevance", options: [["yes", 0.91], ["no", 0.09]] },
      { key: "Delivery risk", options: [["low", 0.78], ["medium", 0.19], ["high", 0.03]] },
      { key: "Overall fit", options: [["yes", 0.88], ["no", 0.12]] },
    ],
    fit: 0.88,
    band: "shortlist",
  },
  {
    id: "b",
    label: "Candidate B",
    facts: ["Must-have skills 3 of 3", "9 years experience, task needs 4", "1 banking project", "Free from 3 Nov"],
    decisions: [
      { key: "Skill match", options: [["good", 0.58], ["excellent", 0.3], ["partial", 0.12]] },
      { key: "Level fit", options: [["over", 0.55], ["right", 0.41], ["under", 0.04]] },
      { key: "Domain relevance", options: [["yes", 0.62], ["no", 0.38]] },
      { key: "Delivery risk", options: [["medium", 0.52], ["low", 0.4], ["high", 0.08]] },
      { key: "Overall fit", options: [["yes", 0.57], ["no", 0.43]] },
    ],
    fit: 0.57,
    band: "review",
    flag: "Model unsure (57%), so a person checks this one",
  },
  {
    id: "c",
    label: "Candidate C",
    facts: ["Must-have skills 1 of 3", "Last used the main skill 3 years ago", "No banking projects", "Free from 20 Oct"],
    decisions: [
      { key: "Skill match", options: [["partial", 0.61], ["weak", 0.28], ["good", 0.11]] },
      { key: "Level fit", options: [["under", 0.7], ["right", 0.27], ["over", 0.03]] },
      { key: "Domain relevance", options: [["no", 0.8], ["yes", 0.2]] },
      { key: "Delivery risk", options: [["high", 0.5], ["medium", 0.38], ["low", 0.12]] },
      { key: "Overall fit", options: [["no", 0.82], ["yes", 0.18]] },
    ],
    fit: 0.18,
    band: "hidden",
  },
];

const BAND_STYLE: Record<Band, { label: string; chip: string; bar: string; text: string }> = {
  shortlist: { label: "Shortlist", chip: "bg-shortlist-wash text-shortlist border-shortlist/30", bar: "bg-shortlist", text: "text-shortlist" },
  review: { label: "Review", chip: "bg-review-wash text-review border-review/40", bar: "bg-review", text: "text-review" },
  hidden: { label: "Hidden", chip: "bg-hidden-wash text-ink-mute border-hidden/40", bar: "bg-hidden", text: "text-ink-mute" },
};

const pct = (p: number) => `${Math.round(p * 100)}%`;

export default function DecisionDemo() {
  const [active, setActive] = useState("a");
  const c = CANDIDATES.find((x) => x.id === active) ?? CANDIDATES[0];
  const band = BAND_STYLE[c.band];

  return (
    <figure className="rounded-xl border border-line bg-white shadow-[0_1px_0_#D5DBD8,0_24px_48px_-28px_rgba(20,33,61,0.35)]">
      <div className="border-b border-line px-5 py-4">
        <p className="text-sm text-ink-mute">Task</p>
        <p className="mt-0.5 font-medium text-ink">Data engineer for a banking client, Azure Data Factory, starts 3 Nov</p>
      </div>

      <div role="tablist" aria-label="Candidates" className="flex gap-1 overflow-x-auto border-b border-line px-2 pt-3 sm:px-3">
        {CANDIDATES.map((x) => {
          const selected = x.id === active;
          return (
            <button
              key={x.id}
              role="tab"
              type="button"
              id={`tab-${x.id}`}
              aria-selected={selected}
              aria-controls="candidate-panel"
              onClick={() => setActive(x.id)}
              className={`-mb-px flex items-center gap-1.5 whitespace-nowrap rounded-t-md border px-2 py-2 text-[13px] transition-colors sm:gap-2 sm:px-3 sm:text-sm ${
                selected ? "border-line border-b-white bg-white font-medium text-ink" : "border-transparent text-ink-mute hover:text-ink"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${BAND_STYLE[x.band].bar}`} aria-hidden="true" />
              {x.label}
            </button>
          );
        })}
      </div>

      <div id="candidate-panel" role="tabpanel" aria-labelledby={`tab-${c.id}`} className="px-5 py-5">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="text-sm text-ink-mute">
            Overall fit <span className={`tabular ml-1 font-display text-3xl font-semibold ${band.text}`}>{pct(c.fit)}</span>
          </p>
          <span className={`rounded-full border px-3 py-1 text-sm font-medium ${band.chip}`}>{band.label}</span>
        </div>
        {c.flag && <p className="mt-2 text-sm text-review">{c.flag}</p>}

        <dl className="mt-5 space-y-3.5">
          {c.decisions.map((d) => (
            <div key={d.key}>
              <div className="flex items-baseline justify-between text-sm">
                <dt className="text-ink-soft">{d.key}</dt>
                <dd className="tabular text-ink">
                  <span className="font-medium">{d.options[0][0]}</span> {pct(d.options[0][1])}
                </dd>
              </div>
              <div className="mt-1.5 flex h-2 overflow-hidden rounded-full bg-paper-deep" aria-hidden="true">
                {d.options.map(([opt, p], i) => (
                  <span
                    key={opt}
                    title={`${opt} ${pct(p)}`}
                    className={`h-full transition-[width] duration-500 ease-out ${
                      i === 0 ? "bg-cobalt" : i === 1 ? "bg-cobalt/35" : "bg-cobalt/15"
                    }`}
                    style={{ width: pct(p) }}
                  />
                ))}
              </div>
            </div>
          ))}
        </dl>

        <div className="mt-5 border-t border-line pt-4">
          <p className="text-sm font-medium text-ink">Facts worked out in code</p>
          <ul className="mt-2 grid gap-x-4 gap-y-1 text-sm text-ink-soft sm:grid-cols-2">
            {c.facts.map((f, i) => (
              <li key={f}>
                <span className="tabular text-ink-mute">F{i + 1}</span> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="border-t border-line px-5 py-3 text-xs text-ink-mute">
        Illustrative example. Every answer is a probability over fixed options; a manager makes the call.
      </figcaption>
    </figure>
  );
}
