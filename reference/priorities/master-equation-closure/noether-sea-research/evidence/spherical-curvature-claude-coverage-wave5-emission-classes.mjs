// Wave 5 copy of the wave-4 classifier (input file name, H1L-only filter, L read from the cell). classify every root of every H1L cell/sample by emission epoch relative to the preparation start s = -L,
// and summarize D_t / transmitter-weight ranges. Input: the wave-4 results JSON. Run from the evidence directory:
//   node spherical-curvature-claude-coverage-wave5-emission-classes.mjs
import fs from "node:fs";
const d = JSON.parse(fs.readFileSync("spherical-curvature-claude-coverage-wave5-results.json"));
const out = []; const f = (x, p = 5) => Number(x).toPrecision(p);
for (const r of d.rows) {
  if (r.H !== "H1L") continue;
  const Lm = r.id.match(/-L([0-9.]+)-/); const L = Lm ? parseFloat(Lm[1]) : 1; const R = r.R;   // L from the cell id (T-*-L<L>-*) or 1 for the L1-* cells const R = r.R;
  let cls = { stationary: 0, preparation: 0, extension: 0 }; let Dts = []; let sts = [];
  for (const m of r.members) for (const h of m.roots) { const st = (r.T - h.tau) / R; sts.push(st); Dts.push(h.Dt); if (st <= -L + 1e-12) cls.stationary++; else if (st < 0) cls.preparation++; else cls.extension++; }
  const minDt = Math.min(...Dts), maxDt = Math.max(...Dts);
  const row = { id: r.id, G: r.G, V: r.V, H: r.H, L, R, v: r.v, s: r.s, roots: Dts.length, selfRoots: r.selfRootCounts.reduce((a, b) => a + b, 0), classes: cls, latestEmission_s: Math.max(...sts), earliestEmission_s: Math.min(...sts), DtMin: minDt, DtMax: maxDt, weightMin: 1 / maxDt, weightMax: 1 / minDt,
    absPA: r.members.map((m) => m.absPA), dspeed: r.speedDerivatives, verdict: r.verdict.split(" ")[0], vectors: r.geometry.members.map((m) => `${m.q > 0 ? "P" : "E"}: n=(${m.n0.map((x) => +x.toFixed(4)).join(",")}) t=(${m.t0.map((x) => +x.toFixed(4)).join(",")})`) };
  out.push(row);
  const u = (arr, p = 5) => { const s = new Set(arr.map((x) => f(x, p))); return s.size === 1 ? f(arr[0], p) : arr.map((x) => f(x, 4)).join(", "); };
  console.log(`| ${r.id} | ${r.s} | ${cls.stationary}/${cls.preparation}/${cls.extension} | ${f(row.latestEmission_s, 4)} | ${f(minDt, 4)} / ${f(maxDt, 4)} | ${f(1 / maxDt, 4)} / ${f(1 / minDt, 4)} | ${u(row.absPA)} | ${u(r.speedDerivatives)} | ${row.verdict} |`);
}
fs.writeFileSync("spherical-curvature-claude-coverage-wave5-emission-classes.json", JSON.stringify(out, null, 0));
