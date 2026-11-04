"use client";

import { useState } from "react";
import DemoView from "@/components/DemoView";

// The interactive version: same markup as the server-rendered DemoView, with tab state.
export default function DecisionDemo({ initial = "a" }: { initial?: string }) {
  const [active, setActive] = useState(initial);
  return <DemoView active={active} onSelect={setActive} />;
}
