// Fails the build if a sitemap URL has no page in out/, or a page is missing its canonical.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
// Files in out/ have no base path; URLs and src attributes do.
const BASE = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const local = (p) => (BASE && p.startsWith(BASE) ? p.slice(BASE.length) || "/" : p);
const xml = readFileSync(join(OUT, "sitemap.xml"), "utf8");
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const problems = [];

const origin = new URL(urls[0]).origin;

for (const url of urls) {
  const path = local(new URL(url).pathname);
  const file = join(OUT, path, "index.html");
  if (!existsSync(file)) {
    problems.push(`missing page for ${url}`);
    continue;
  }
  const html = readFileSync(file, "utf8");
  if (!html.includes(`<link rel="canonical" href="${url}"`)) problems.push(`canonical mismatch on ${url}`);
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) problems.push(`noindex page in sitemap: ${url}`);
  if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) problems.push(`expected exactly one h1 on ${url}`);
  for (const img of html.match(/<img\b[^>]*>/g) ?? []) {
    if (!/\balt="[^"]+"/.test(img)) problems.push(`image without alt text on ${url}`);
    const src = img.match(/\bsrc="([^"]+)"/)?.[1];
    if (src?.startsWith("/") && !existsSync(join(OUT, local(src)))) problems.push(`missing image ${src} on ${url}`);
    if (BASE && src?.startsWith("/") && !src.startsWith(`${BASE}/`)) problems.push(`image ${src} misses the base path on ${url}`);
  }
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  if (title.length > 65) problems.push(`title over 65 characters on ${url}: ${title}`);
  const og = html.match(/<meta property="og:image" content="([^"]*)"/)?.[1];
  if (!og) problems.push(`no share image on ${url}`);
  else if (og.startsWith(origin) && !existsSync(join(OUT, local(new URL(og).pathname)))) problems.push(`share image missing for ${url}: ${og} (run scripts/generate-images.py)`);
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  if (desc.length < 50 || desc.length > 160) problems.push(`description is ${desc.length} characters on ${url}`);
}

for (const f of ["robots.txt", "llms.txt", "llms-full.txt", "image-sitemap.xml", "CNAME", "favicon.ico", "manifest.webmanifest", "logo.png"]) {
  if (!existsSync(join(OUT, f))) problems.push(`missing ${f}`);
}

if (problems.length) {
  console.error(`verify-sitemap: ${problems.length} problem(s)\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log(`verify-sitemap: OK — ${urls.length} URLs resolve, each with its canonical and one h1.`);
