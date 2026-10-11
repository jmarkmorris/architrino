// Wave 5 (3): per-seed summary of the balanced seeded placements (release state, H1, v = 1/2, R = 1).
// Run from the evidence directory: node spherical-curvature-claude-coverage-wave5-seed-summary.mjs
import fs from "node:fs";
const d = JSON.parse(fs.readFileSync("spherical-curvature-claude-coverage-wave5-results.json"));
const f = (x, p = 4) => Number(x).toPrecision(p); const out = [];
for (const r of d.rows.filter((x) => x.id.startsWith("S2026"))) {
  const chords = r.members.flatMap((m) => m.roots.map((h) => h.r)); const Dts = r.members.flatMap((m) => m.roots.map((h) => Math.abs(h.Dt)));
  const pa = r.members.map((m) => m.absPA); const ds = r.speedDerivatives;
  const row = { id: r.id, seed: r.geometry.seed, attempts: r.geometry.attempts, minChord: Math.min(...chords), minAbsDt: Math.min(...Dts), absPA: pa, maxAbsPA: Math.max(...pa), minAbsPA: Math.min(...pa), dspeed: ds, dspeedSpread: Math.max(...ds) - Math.min(...ds), nearEquilibriumCandidate: Math.max(...pa) < 0.1,
    members: r.geometry.members.map((m) => `${m.q > 0 ? "P" : "E"}: n=(${m.n0.map((x) => +x.toFixed(4)).join(",")}) t=(${m.t0.map((x) => +x.toFixed(4)).join(",")})`), patternNotes: r.patternNotes };
  out.push(row);
  console.log(`| ${r.id} | ${row.seed} | ${row.attempts} | ${f(row.minChord)} | ${f(row.minAbsDt)} | ${pa.map((x) => f(x)).join(", ")} | ${f(row.maxAbsPA)} | ${ds.map((x) => f(x)).join(", ")} | ${f(row.dspeedSpread)} | ${row.nearEquilibriumCandidate ? "yes" : "no"} |`);
}
for (const row of out.filter((x) => x.id.endsWith("-V1"))) console.log(row.id, row.members.join("; "));
fs.writeFileSync("spherical-curvature-claude-coverage-wave5-seed-summary.json", JSON.stringify(out, null, 0));
