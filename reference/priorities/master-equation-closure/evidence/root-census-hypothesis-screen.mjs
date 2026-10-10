// root-census-hypothesis-screen.mjs — screen for the audit analysis/root-census-hypothesis-audit-2026-10-09.md. Lists paragraphs that assert existence of a partner or causal root and
// classifies the speed wording in the same paragraph. It only selects passages to be read; it classifies nothing finally.
// Usage: node root-census-hypothesis-screen.mjs known | scan [--list]   (run the known cases first)
import fs from "node:fs"; import path from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EXIST = /exactly one partner root|one partner root|unique partner root|exactly one (causal )?root|exactly one zero|unique (causal )?root|root census|partner root exists|has a partner root|existence of (a|the) (partner|causal) root|at least one (partner |causal )?root|exactly one root/i;
const UNIFORM = /uniform|margin|at most|\\le\b|\\leq|≤|v_\{?\\max|\\beta\s*<\s*1|\(1-\\eta\)|bounded by|supremum|\\sup|strict global|global speed bound|speed ratio at most/i;
const POINTWISE = /(speed|speeds|velocity)[^.$]{0,40}(below|less than|under)|subfield|sub-wake|below the wake speed|<\s*c_f|strictly slower|slower than the wake/i;
const CONSTRUCT = /rigid|circle|circular|periodic|compact|bounded (path|position|orbit|history|support)|supplied|prescribed|held|at rest|stationary|finite (window|interval|past)/i;
function classify(par) { if (!EXIST.test(par)) return null; const u = UNIFORM.test(par), p = POINTWISE.test(par), c = CONSTRUCT.test(par); return { cls: u ? "uniform-wording" : p ? "pointwise-wording" : "no-speed-wording", construct: c }; }
function paragraphs(file) { const lines = fs.readFileSync(file, "utf8").split("\n"); const out = []; let buf = [], start = 0, fence = false;
  lines.forEach((l, i) => { if (l.startsWith("```")) fence = !fence; if (!fence && l.trim() === "") { if (buf.length) out.push({ line: start + 1, text: buf.join("\n") }); buf = []; } else { if (!buf.length) start = i; buf.push(l); } });
  if (buf.length) out.push({ line: start + 1, text: buf.join("\n") }); return out; }
function walk(dir, acc = []) { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, e.name); if (e.isDirectory()) { if (e.name !== "evidence" && !e.name.startsWith(".")) walk(p, acc); } else if (e.name.endsWith(".md")) acc.push(p); } return acc; }
const mode = process.argv[2];
if (mode === "known") {
  const cases = [
    ["Weber Lemma 2.1, original wording (must be pointwise)", "**Lemma 2.1 (root census below the wake speed).** Let both members have speed below $c_f$ on the whole history up to $T$ and positive separation. Then each receiver has exactly one partner root and no self root", "pointwise-wording"],
    ["wider-regime census (must be uniform)", "If the entire supplied and constructed history has physical speed ratio at most $\\beta<1$, the partner causal gap increases with delay. It therefore has exactly one zero.", "uniform-wording"],
    ["sentence with no existence claim (must be skipped)", "Both members have speed below $c_f$ at every time.", null],
    ["existence claim with no speed wording", "Each receiver has exactly one partner root by the chord inequality.", "no-speed-wording"],
  ];
  let ok = true; for (const [name, text, want] of cases) { const got = classify(text); const g = got ? got.cls : null; const pass = g === want; ok = ok && pass; console.log(`${pass ? "PASS" : "FAIL"} ${name}: got ${g}`); }
  // note: the first case contains "whole history", so it tests that the uniform pattern is not triggered by that phrase alone
  process.exit(ok ? 0 : 1);
}
if (mode === "scan") {
  const files = walk(ROOT); const tally = {}; const flagged = []; let withClaim = 0, pars = 0;
  for (const f of files) { let any = false; for (const p of paragraphs(f)) { const c = classify(p.text); if (!c) continue; any = true; pars++; const key = c.cls + (c.construct ? "+construct" : ""); tally[key] = (tally[key] || 0) + 1; if (c.cls === "pointwise-wording") flagged.push({ file: path.relative(ROOT, f), line: p.line, construct: c.construct, text: p.text.replace(/\s+/g, " ").slice(0, 260) }); } if (any) withClaim++; }
  console.log(`files scanned ${files.length}; files with an existence claim ${withClaim}; paragraphs with an existence claim ${pars}`); console.log("tally", JSON.stringify(tally));
  const byFile = {}; for (const x of flagged) (byFile[x.file] ||= []).push(x);
  console.log(`pointwise-wording paragraphs: ${flagged.length} in ${Object.keys(byFile).length} files`);
  if (process.argv.includes("--list")) for (const [f, xs] of Object.entries(byFile)) for (const x of xs) console.log(`${x.construct ? "C" : "-"} ${f}:${x.line} :: ${x.text}`);
  else for (const [f, xs] of Object.entries(byFile)) console.log(`${String(xs.length).padStart(3)} ${xs.some((x) => !x.construct) ? "-" : "C"} ${f}`);
}
