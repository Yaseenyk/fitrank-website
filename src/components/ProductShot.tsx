import type { CSSProperties } from "react";
import type { Shot } from "@/lib/shots";
import { withBase } from "@/lib/site";

/**
 * A real app capture in a browser frame.
 *
 * <picture> rather than two toggled <img> elements, so a phone downloads only the
 * phone capture. Space is reserved per breakpoint with aspect-ratio, so nothing
 * shifts while it loads.
 */
export default function ProductShot({
  shot,
  caption = true,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 1100px",
  className = "",
}: {
  shot: Shot;
  caption?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const style = {
    "--ar": `${shot.width} / ${shot.height}`,
    "--ar-m": `${shot.mobile.width} / ${shot.mobile.height}`,
  } as CSSProperties;

  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-xl border border-ink/10 bg-white shadow-[0_24px_60px_-28px_rgba(20,33,61,0.35)]">
        <div className="flex items-center gap-1.5 border-b border-line bg-paper px-3 py-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="ml-3 hidden truncate rounded bg-white px-2 py-0.5 text-[11px] text-ink-mute sm:block">app.fitrank · demo data</span>
        </div>
        <div style={style} className="[aspect-ratio:var(--ar-m)] sm:[aspect-ratio:var(--ar)]">
          <picture>
            <source media="(max-width: 639px)" srcSet={withBase(shot.mobile.src)} width={shot.mobile.width} height={shot.mobile.height} />
            {/* eslint-disable-next-line @next/next/no-img-element -- static export; next/image cannot emit <picture> */}
            <img
              src={withBase(shot.src)}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes={sizes}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              className="block h-full w-full object-cover object-top"
            />
          </picture>
        </div>
      </div>
      {caption && <figcaption className="mt-3 text-center text-sm text-ink-mute">{shot.caption}</figcaption>}
    </figure>
  );
}
