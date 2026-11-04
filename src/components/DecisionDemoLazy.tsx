"use client";

import type { ComponentType } from "react";
import { useEffect, useRef, useState } from "react";
import DemoView from "@/components/DemoView";

// The interactive tabs load in ONE deferred step: after first paint when the browser is idle,
// when the demo nears the viewport, or on the first tab click. Until then the identical
// server-rendered markup (full text, same height) is shown, so nothing shifts.
export default function DecisionDemoLazy() {
  const [pick, setPick] = useState<string | null>(null);
  const [Live, setLive] = useState<ComponentType<{ initial?: string }> | null>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      io?.disconnect();
      import("@/components/DecisionDemo").then((m) => setLive(() => m.default));
    };
    const io = "IntersectionObserver" in window ? new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && go(), { rootMargin: "400px" }) : null;
    if (box.current) io?.observe(box.current);
    let t: number | undefined;
    const start = () => {
      t = window.setTimeout(go, 0);
    };
    const idle = () => {
      const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
      if (w.requestIdleCallback) w.requestIdleCallback(start, { timeout: 4000 });
      else window.setTimeout(start, 4000);
    };
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });
    return () => {
      done = true;
      io?.disconnect();
      window.removeEventListener("load", idle);
      if (t) clearTimeout(t);
    };
  }, []);

  return (
    <div ref={box}>
      {Live ? (
        <Live initial={pick ?? "a"} />
      ) : (
        <DemoView
          active="a"
          onSelect={(id) => {
            setPick(id);
            import("@/components/DecisionDemo").then((m) => setLive(() => m.default));
          }}
        />
      )}
    </div>
  );
}
