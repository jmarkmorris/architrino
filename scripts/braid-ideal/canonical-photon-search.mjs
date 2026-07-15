#!/usr/bin/env node

// Canonical-photon search runner (successor to the retired §99 photon
// branch). Object: two 6-architrino braids (3 conjugate +/- binaries each,
// ring planes perpendicular to z) in a lead/trail drift arrangement — 12
// explicit worldlines, net charge certified 0 from explicit per-site charges.
//
// Stage 1 (this file): static force-balance screen at evaluator grade over
// the declared grids in canonical-photon-search-fixture.mjs. The screen
// implements the src/eom sharp master-equation law
//   a = kappa q_r q_s |D_T / D_s| r_hat / r^2   per certified delayed root,
// with self-pairs included as first-class (super-c_f helical self-roots),
// no softening, and fail-closed row flags (caustic |D_s| floor, unresolved
// tangency, window/tail budget). It carries NO stability, locking, or
// temporal claim. Stage 2 (eom coupled release) is gated on rows passing
// force balance here.
//
// Independent references (evidence independence):
// - non-self roots cross-checked against the production moving-circular
//   runtime (mode=legacy-parity);
// - self roots and self forces cross-checked against the closed-form
//   helical residual 2R|sin(omega delta/2)| = sqrt(c_f^2-u^2) delta via an
//   independent mpmath comparator (mode=self-parity-emit +
//   scripts/eom/canonical-photon-self-root-parity.py);
// - §99 analytic symmetric-pair anchor and §92/§93/§95 controls reproduced
//   as implementation tests (modes anchor/controls; no target authority).
//
// The central solver is not modified. src/eom is not modified.

import { mkdirSync, appendFileSync, writeFileSync, readFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { CANONICAL_PHOTON_SEARCH_FIXTURE as FIXTURE, CANONICAL_PHOTON_SEARCH_SCHEMA as SCHEMA } from "./canonical-photon-search-fixture.mjs";

const TAU = 2 * Math.PI;

// ---------------------------------------------------------------------------
// Object builder and certification
// ---------------------------------------------------------------------------

export function buildCanonicalPhoton(config, fixture = FIXTURE) {
  const { u, RI, RO, vI, vM, vO, d1, d2, gap, phiM, phiO, senses, conj, delta } = config;
  const cu = fixture.chargeUnit;
  const pairs = [
    { label: "I", radius: RI, speed: vI, phase: 0 },
    { label: "M", radius: fixture.grids.radiusM, speed: vM, phase: phiM },
    { label: "O", radius: RO, speed: vO, phase: phiO },
  ];
  // Axial order front (larger z, drift +z) to back: lead I, M, O | gap |
  // trail O, M, I (reflection-symmetric primary family; O faces the gap).
  const zLead = { I: gap / 2 + d2 + d1, M: gap / 2 + d2, O: gap / 2 };
  const sites = [];
  for (const braid of ["lead", "trail"]) {
    const isLead = braid === "lead";
    for (let b = 0; b < 3; b++) {
      const pair = pairs[b];
      const sense = (isLead ? 1 : -1) * senses[b];
      const omega = (sense * pair.speed) / pair.radius;
      const basePhase = pair.phase + (isLead ? 0 : delta);
      const z = isLead ? zLead[pair.label] : -zLead[pair.label];
      const conjugate = !isLead && conj;
      for (const sign of [1, -1]) {
        const polarity = conjugate ? -sign : sign;
        sites.push({
          id: `${braid}:${pair.label}:${sign > 0 ? "a" : "b"}`,
          braid,
          binary: pair.label,
          plusSlot: sign > 0,
          radius: pair.radius,
          omega,
          speed: pair.speed,
          phase: basePhase + (sign > 0 ? 0 : Math.PI),
          z,
          charge: polarity * cu,
          polarity,
        });
      }
    }
  }
  certifyCanonicalPhoton(sites, config);
  return sites;
}

export function certifyCanonicalPhoton(sites, config) {
  if (sites.length !== 12) throw new Error(`object defect: ${sites.length} worldlines (canonical photon has 12)`);
  const plus = sites.filter((s) => s.polarity > 0).length;
  if (plus !== 6) throw new Error(`object defect: polarity split ${plus}/${12 - plus} (canonical: 6/6)`);
  const net = sites.reduce((s, x) => s + x.charge, 0);
  if (Math.abs(net) > 1e-15) throw new Error(`object defect: net charge ${net} != 0 (explicit per-site sum)`);
  for (const braid of ["lead", "trail"]) {
    for (const binary of ["I", "M", "O"]) {
      const members = sites.filter((s) => s.braid === braid && s.binary === binary);
      if (members.length !== 2) throw new Error(`object defect: occupancy ${members.length} != 2 on ${braid}:${binary}`);
      if (members[0].polarity * members[1].polarity !== -1) throw new Error(`object defect: ${braid}:${binary} is not a +/- conjugate pair`);
      const dphi = Math.abs(((members[0].phase - members[1].phase) % TAU + TAU) % TAU - Math.PI);
      if (dphi > 1e-12) throw new Error(`object defect: ${braid}:${binary} pair is not antipodal`);
    }
  }
  for (const binary of ["I", "M", "O"]) {
    const lead = sites.find((s) => s.braid === "lead" && s.binary === binary);
    const trail = sites.find((s) => s.braid === "trail" && s.binary === binary);
    if (Math.abs(lead.radius - trail.radius) > 1e-15 || Math.abs(Math.abs(lead.omega) - Math.abs(trail.omega)) > 1e-15) {
      throw new Error(`object defect: lead/trail ${binary} geometry mismatch`);
    }
    if (lead.omega * trail.omega >= 0) throw new Error(`object defect: lead/trail ${binary} senses are not opposite`);
  }
  void config;
  return true;
}

// ---------------------------------------------------------------------------
// Helical kinematics (drift u along +z; ring plane perpendicular to z)
// ---------------------------------------------------------------------------

function sitePosition(site, u, t) {
  const a = site.omega * t + site.phase;
  return [site.radius * Math.cos(a), site.radius * Math.sin(a), site.z + u * t];
}

function siteVelocity(site, u, t) {
  const a = site.omega * t + site.phase;
  return [-site.radius * site.omega * Math.sin(a), site.radius * site.omega * Math.cos(a), u];
}

function requiredAcceleration(site, u, t) {
  const a = site.omega * t + site.phase;
  const w2 = site.omega * site.omega;
  return [-site.radius * w2 * Math.cos(a), -site.radius * w2 * Math.sin(a), 0];
}

// ---------------------------------------------------------------------------
// Delayed-root scanner (sharp law; bisection on the causal residual)
// ---------------------------------------------------------------------------

function causalResidual(rx, ry, rz, site, u, tau, t, cf) {
  const p = sitePosition(site, u, tau);
  const dx = rx - p[0], dy = ry - p[1], dz = rz - p[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz) - cf * (t - tau);
}

// Complete Lipschitz root finder on a scalar residual f over [a, b]:
// a cell whose endpoint magnitudes both exceed slopeCap * width cannot
// contain a crossing (|f'| <= slopeCap is rigorous) and is pruned; every
// other cell is bisected until it yields a bracketed simple root or reaches
// the width floor, where an unresolved cell fails closed. Root completeness
// is therefore certified at binary64 evaluator grade rather than sampled.
function lipschitzRoots(f, a, b, slopeCap, points, screen, flags) {
  if (b <= a) return [];
  const n = Math.max(64, Math.min(screen.maxScanPoints, points));
  const h = (b - a) / n;
  const roots = [];
  const floorCells = [];

  const bisect = (lo, hi, flo) => {
    for (let i = 0; i < 80; i++) {
      const mid = 0.5 * (lo + hi);
      const fm = f(mid);
      if ((flo <= 0) === (fm <= 0)) { lo = mid; flo = fm; } else hi = mid;
    }
    const x = 0.5 * (lo + hi);
    roots.push({ x, residual: f(x) });
  };

  const stack = [];
  let xPrev = a;
  let fPrev = f(xPrev);
  for (let k = 1; k <= n; k++) {
    const xk = a + k * h;
    const fk = f(xk);
    stack.push([xPrev, fPrev, xk, fk]);
    xPrev = xk; fPrev = fk;
  }
  let budget = screen.maxCellsPerSolve;
  while (stack.length) {
    if (--budget < 0) { flags.scanBudgetExhausted = true; break; } // fail closed
    const [x0, f0, x1, f1] = stack.pop();
    if ((f0 <= 0) !== (f1 <= 0)) { bisect(x0, x1, f0); continue; }
    const width = x1 - x0;
    if (Math.min(Math.abs(f0), Math.abs(f1)) > slopeCap * width) continue; // certified root-free
    if (width < screen.widthFloor) { floorCells.push(0.5 * (x0 + x1)); continue; }
    const xm = 0.5 * (x0 + x1);
    stack.push([x0, f0, xm, f(xm)], [xm, f(xm), x1, f1]);
  }
  roots.sort((p, q) => p.x - q.x);
  const unique = roots.filter((r, i) => i === 0 || Math.abs(r.x - roots[i - 1].x) > screen.duplicateRootSpacing);
  for (const x of floorCells) {
    // A floor cell shouldering an already-booked root is that root's own
    // near-zero neighborhood; anything else is an unresolved tangency.
    if (!unique.some((r) => Math.abs(r.x - x) < 1e-6)) { flags.tangentRoot = true; break; }
  }
  return unique;
}

function scanRoots({ receiverPos, source, u, t, cf, window, points, exclusion, screen, flags }) {
  const [rx, ry, rz] = receiverPos;
  const slopeCap = cf + Math.hypot(source.speed, u) + 1e-12;
  const f = (tau) => causalResidual(rx, ry, rz, source, u, tau, t, cf);
  return lipschitzRoots(f, t - window, t - exclusion, slopeCap, points, screen, flags)
    .map((r) => ({ tau: r.x, residual: r.residual }));
}

// Self-roots on a drifting circular worldline have the exact closed-form
// residual (derivable by hand from the helix chord):
//   h(delta) = 2 R |sin(omega delta / 2)| - sqrt(c_f^2 - u^2) delta,
// with self-roots at h = 0, delta > 0, bounded by
// delta_max = 2R / sqrt(c_f^2 - u^2). The coincident endpoint delta = 0 is
// excluded analytically: h'(0+) = v_t - sqrt(c_f^2 - u^2) > 0 exactly when
// the total speed exceeds c_f, so the first self-root is interior. This
// closed form is also the independent mpmath comparator's reference.
function selfRootDelays(site, u, cf, screen, flags) {
  const vt = Math.abs(site.omega) * site.radius;
  const total = Math.hypot(vt, u);
  if (total <= cf) return [];
  if (u >= cf) return []; // no helical self-roots at or beyond luminal drift
  const s = Math.sqrt(cf * cf - u * u);
  const omega = Math.abs(site.omega);
  const deltaMax = (2 * site.radius) / s;
  const f = (delta) => 2 * site.radius * Math.abs(Math.sin((omega * delta) / 2)) - s * delta;
  const slopeCap = vt + s + 1e-12;
  const points = Math.ceil(((deltaMax * 1.001) * omega * screen.scanOversample) / TAU);
  // start away from the analytically excluded coincident endpoint
  const start = Math.min(1e-6, deltaMax * 1e-6);
  return lipschitzRoots(f, start, deltaMax * 1.001, slopeCap, points, screen, flags).map((r) => ({ delta: r.x, residual: r.residual }));
}

// ---------------------------------------------------------------------------
// Master-equation force screen (single row)
// ---------------------------------------------------------------------------

export function measureCanonicalPhotonRow(config, { samples, windowFactor = 1, fixture = FIXTURE } = {}) {
  const screen = fixture.screen;
  const cf = fixture.fieldSpeed;
  const u = config.u;
  const sites = buildCanonicalPhoton(config, fixture);
  const ns = samples ?? fixture.samplingLadder[0];

  const omegaAbs = sites.map((s) => Math.abs(s.omega));
  const omegaMin = Math.min(...omegaAbs);
  const omegaMax = Math.max(...omegaAbs);
  const slowPeriod = TAU / omegaMin;
  const rMax = Math.max(...sites.map((s) => s.radius));
  const extent = config.gap + 2 * (config.d1 + config.d2) + 2 * rMax;
  const window = windowFactor * screen.windowMargin * Math.max(screen.scanWindowPeriods * slowPeriod, screen.scanWindowLengths * extent / cf);
  const basePoints = Math.ceil((window * omegaMax * screen.scanOversample) / TAU);

  const flags = { tangentRoot: false, causticDs: false, luminalSelfPin: false, scanBudgetExhausted: false };
  const receivers = sites.filter((s) => s.plusSlot);
  const perSample = [];
  let rootCount = 0, maxRootResidual = 0, minAbsDs = Infinity, maxStrength = 0, minSiteDistance = Infinity;

  for (let k = 0; k < ns; k++) {
    const t = (k * slowPeriod) / ns;
    // instantaneous collision floor over all distinct site pairs
    const positions = sites.map((s) => sitePosition(s, u, t));
    for (let i = 0; i < sites.length; i++) for (let j = i + 1; j < sites.length; j++) {
      const dx = positions[i][0] - positions[j][0], dy = positions[i][1] - positions[j][1], dz = positions[i][2] - positions[j][2];
      minSiteDistance = Math.min(minSiteDistance, Math.sqrt(dx * dx + dy * dy + dz * dz));
    }
    for (const receiver of receivers) {
      const rPos = sitePosition(receiver, u, t);
      const rVel = siteVelocity(receiver, u, t);
      const force = [0, 0, 0];
      for (const source of sites) {
        const isSelf = source.id === receiver.id;
        let roots = [];
        if (isSelf) {
          const total = Math.hypot(source.speed, u);
          if (Math.abs(total - cf) < 1e-9) { flags.luminalSelfPin = true; continue; }
          // Exact closed-form self-root ledger (theorem-anchored); empty for
          // sub-field total speed and for luminal-or-faster drift.
          roots = selfRootDelays(source, u, cf, screen, flags).map((r) => ({ tau: t - r.delta, residual: r.residual }));
        } else {
          roots = scanRoots({ receiverPos: rPos, source, u, t, cf, window, points: basePoints, exclusion: 0, screen, flags });
        }
        for (const root of roots) {
          const sPos = sitePosition(source, u, root.tau);
          const sVel = siteVelocity(source, u, root.tau);
          const dx = rPos[0] - sPos[0], dy = rPos[1] - sPos[1], dz = rPos[2] - sPos[2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (!(dist > 1e-12)) continue;
          const nx = dx / dist, ny = dy / dist, nz = dz / dist;
          const ds = cf - (nx * sVel[0] + ny * sVel[1] + nz * sVel[2]);
          const dt = cf - (nx * rVel[0] + ny * rVel[1] + nz * rVel[2]);
          minAbsDs = Math.min(minAbsDs, Math.abs(ds));
          if (Math.abs(ds) < screen.sourceNormalFloor) { flags.causticDs = true; continue; }
          const strength = Math.abs(dt / ds);
          maxStrength = Math.max(maxStrength, strength);
          const w = (receiver.charge * source.charge * strength) / (dist * dist);
          force[0] += w * nx; force[1] += w * ny; force[2] += w * nz;
          rootCount += 1;
          maxRootResidual = Math.max(maxRootResidual, Math.abs(root.residual));
        }
      }
      perSample.push({ t, receiver, x: rPos, force, required: requiredAcceleration(receiver, u, t) });
    }
  }

  // Common-coupling fit and binding residual (symmetry-reduced: the minus
  // partners are the pi-rotation + charge-conjugation images, contributing
  // identical sums).
  let fitNum = 0, fitDen = 0, reqNorm = 0;
  for (const row of perSample) {
    fitNum += row.force[0] * row.required[0] + row.force[1] * row.required[1] + row.force[2] * row.required[2];
    fitDen += row.force[0] ** 2 + row.force[1] ** 2 + row.force[2] ** 2;
    reqNorm += row.required[0] ** 2 + row.required[1] ** 2 + row.required[2] ** 2;
  }
  const kappaStar = fitDen > 1e-20 ? fitNum / fitDen : 0;
  let residual = 0, pump = 0, axialNet = 0, axialLead = 0, axialTrail = 0;
  for (const row of perSample) {
    const rx = kappaStar * row.force[0] - row.required[0];
    const ry = kappaStar * row.force[1] - row.required[1];
    const rz = kappaStar * row.force[2] - row.required[2];
    residual += rx * rx + ry * ry + rz * rz;
    pump += (row.x[0] * kappaStar * row.force[1] - row.x[1] * kappaStar * row.force[0]);
    axialNet += kappaStar * row.force[2];
    if (row.receiver.braid === "lead") axialLead += kappaStar * row.force[2]; else axialTrail += kappaStar * row.force[2];
  }
  const count = perSample.length || 1;
  const bindingResidual = Math.sqrt(residual / Math.max(reqNorm, 1e-20));
  pump = (2 * pump) / count; axialNet = (2 * axialNet) / count;
  axialLead = (2 * axialLead) / count; axialTrail = (2 * axialTrail) / count;

  // Tail DIAGNOSTIC for roots beyond the scan window (reported, not gated;
  // window sufficiency is controlled by the declared window-doubling ladder).
  const qq = fixture.chargeUnit * fixture.chargeUnit;
  const tSrcMin = TAU / omegaMax;
  const tailForce = 12 * screen.maxRootsPerSourcePeriod * screen.tailStrengthCap * qq * Math.abs(kappaStar) *
    (1 / (cf * cf)) * (1 / (window * tSrcMin) + 1 / (window * window));
  const reqScale = Math.sqrt(reqNorm / count) || 1;
  const tailBudgetRatio = tailForce / reqScale;

  const certified = !flags.tangentRoot && !flags.causticDs && !flags.scanBudgetExhausted &&
    maxRootResidual <= FIXTURE.gates.rootResidual;

  const netCharge = sites.reduce((s, x) => s + x.charge, 0);
  return {
    schema: SCHEMA,
    config,
    samples: ns,
    kappaStar,
    bindingResidual,
    axialPump: pump,
    axialNet, axialLead, axialTrail,
    chargeInE: netCharge,
    record: { rootCount, maxRootResidual, minAbsDs, minSiteDistance, maxStrength, window, tailBudgetRatio },
    flags,
    certified,
    gates: {
      bind: kappaStar > 0 && bindingResidual <= FIXTURE.gates.bindResidual,
      pumpCancel: Math.abs(pump) <= FIXTURE.gates.pump,
      charge: Math.abs(netCharge) <= FIXTURE.gates.charge,
      collisionFree: minSiteDistance >= FIXTURE.gates.collisionFloor,
      rootConverged: maxRootResidual <= FIXTURE.gates.rootResidual,
    },
  };
}

// ---------------------------------------------------------------------------
// Grid enumeration (declared in the fixture; exact counts derive from here)
// ---------------------------------------------------------------------------

export function stageP1Rows(fixture = FIXTURE) {
  const g = fixture.grids;
  const rows = [];
  for (const u of g.driftPrimary)
    for (const RI of g.radiusI) for (const RO of g.radiusO)
      for (const vI of g.speed) for (const vM of g.speed) for (const vO of g.speed)
        for (const d1 of g.spacing) for (const d2 of g.spacing)
          for (const gap of g.gap) {
            rows.push({
              id: `p1:${rows.length}`, stage: "p1",
              u, RI, RO, vI, vM, vO, d1, d2, gap,
              phiM: 0, phiO: 0, senses: [1, 1, 1], conj: false,
              delta: g.partnerOffsetPrimary,
            });
          }
  return rows;
}

export function stageP1bRows(fixture = FIXTURE) {
  const g = fixture.grids;
  const c = g.coreB;
  const rows = [];
  for (const u of g.driftPrimary)
    for (const RI of c.radius) for (const RO of c.radius)
      for (const v of c.speed)
        for (const d of c.spacing)
          for (const gap of c.gap)
            for (const phiM of g.phase) for (const phiO of g.phase)
              for (const senses of g.sensePatterns)
                for (const conj of g.polarityConjugate)
                  for (const delta of g.partnerOffset) {
                    rows.push({
                      id: `p1b:${rows.length}`, stage: "p1b",
                      u, RI, RO, vI: v, vM: v, vO: v, d1: d, d2: d, gap,
                      phiM, phiO, senses: [...senses], conj, delta,
                    });
                  }
  return rows;
}

export function stageP2Rows(champions, fixture = FIXTURE) {
  const g = fixture.grids;
  const rows = [];
  for (const champ of champions)
    for (const phiM of g.phase) for (const phiO of g.phase)
      for (const senses of g.sensePatterns)
        for (const conj of g.polarityConjugate)
          for (const delta of g.partnerOffset) {
            rows.push({
              ...champ, id: `p2:${rows.length}`, stage: "p2",
              phiM, phiO, senses: [...senses], conj, delta,
              parent: champ.id,
            });
          }
  return rows;
}

export function neighborhoodRows(champion, u, stage, fixture = FIXTURE) {
  const rows = [{ ...champion, id: `${stage}:center:${champion.id}`, stage, u, parent: champion.id }];
  const dofMap = { radiusI: "RI", radiusO: "RO", speedI: "vI", speedM: "vM", speedO: "vO", d1: "d1", d2: "d2", gap: "gap" };
  for (const dof of fixture.selection.neighborhoodDofs)
    for (const factor of fixture.selection.neighborhoodFactors) {
      const key = dofMap[dof];
      rows.push({ ...champion, id: `${stage}:${dof}:${factor}:${champion.id}`, stage, u, parent: champion.id, [key]: champion[key] * factor });
    }
  return rows;
}

// ---------------------------------------------------------------------------
// Shard I/O and champion selection
// ---------------------------------------------------------------------------

function readShardRows(dir, prefix) {
  if (!existsSync(dir)) return [];
  const rows = [];
  for (const file of readdirSync(dir)) {
    if (!file.startsWith(prefix) || !file.endsWith(".jsonl")) continue;
    for (const line of readFileSync(path.join(dir, file), "utf8").split("\n")) {
      if (line.trim()) rows.push(JSON.parse(line));
    }
  }
  return rows;
}

export function selectChampions(rows, count) {
  return rows
    .filter((r) => r.certified && r.kappaStar > 0)
    .sort((a, b) => (a.bindingResidual - b.bindingResidual) || (Math.abs(a.axialPump) - Math.abs(b.axialPump)))
    .slice(0, count);
}

// Fallback when no certified positive-coupling row exists: rank certified
// rows regardless of coupling sign so continuation stages remain populated
// (reported as such; a negative-coupling row can never pass the bind gate).
export function selectChampionsLenient(rows, count) {
  const strict = selectChampions(rows, count);
  if (strict.length > 0) return { rows: strict, lenient: false };
  return {
    rows: rows.filter((r) => r.certified).sort((a, b) => a.bindingResidual - b.bindingResidual).slice(0, count),
    lenient: true,
  };
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function arg(name, fallback = null) {
  const prefix = `--${name}=`;
  for (const a of process.argv.slice(2)) if (a.startsWith(prefix)) return a.slice(prefix.length);
  return fallback;
}

function runScreen({ rows, offset, limit, out, tag, samples }) {
  mkdirSync(out, { recursive: true });
  const slice = rows.slice(offset, offset + limit);
  const file = path.join(out, `${tag}-${offset}.jsonl`);
  const started = Date.now();
  let lines = [];
  for (let i = 0; i < slice.length; i++) {
    const result = measureCanonicalPhotonRow(slice[i], { samples });
    lines.push(JSON.stringify({ ...result, index: offset + i }));
    if (lines.length >= 200) { appendFileSync(file, lines.join("\n") + "\n"); lines = []; }
    if ((i + 1) % 100 === 0) {
      process.stderr.write(`heartbeat row=${offset + i + 1}/${offset + slice.length} wall=${((Date.now() - started) / 1000).toFixed(1)}s\n`);
    }
  }
  if (lines.length) appendFileSync(file, lines.join("\n") + "\n");
  process.stderr.write(`done rows=[${offset},${offset + slice.length}) wall=${((Date.now() - started) / 1000).toFixed(1)}s -> ${file}\n`);
}

async function main() {
  const mode = arg("mode", "count");
  const out = arg("out", FIXTURE.evidenceDir);
  const offset = Number(arg("offset", 0));
  const limit = Number(arg("limit", 1000));
  const samples = Number(arg("samples", FIXTURE.samplingLadder[0]));

  if (mode === "count") {
    const p1 = stageP1Rows();
    const p1b = stageP1bRows();
    const perChampion = FIXTURE.grids.phase.length ** 2 * FIXTURE.grids.sensePatterns.length * FIXTURE.grids.polarityConjugate.length * FIXTURE.grids.partnerOffset.length;
    process.stdout.write(JSON.stringify({
      p1: p1.length,
      p1PerDrift: p1.length / FIXTURE.grids.driftPrimary.length,
      p1b: p1b.length,
      p1bPerDrift: p1b.length / FIXTURE.grids.driftPrimary.length,
      p2PerChampion: perChampion,
      p2: perChampion * FIXTURE.selection.stageP2ChampionsPerDrift * FIXTURE.grids.driftPrimary.length,
      p3: (1 + FIXTURE.selection.neighborhoodDofs.length * FIXTURE.selection.neighborhoodFactors.length) * FIXTURE.selection.stageP3Champions * FIXTURE.grids.driftContinuation.length,
      p4: (1 + FIXTURE.selection.neighborhoodDofs.length * FIXTURE.selection.neighborhoodFactors.length) * FIXTURE.selection.stageP3Champions,
    }, null, 2) + "\n");
    return;
  }

  if (mode === "bench") {
    const rows = stageP1Rows().slice(offset, offset + Math.min(limit, 20));
    const started = Date.now();
    for (const row of rows) measureCanonicalPhotonRow(row, { samples });
    process.stdout.write(`rows=${rows.length} wall=${(Date.now() - started) / 1000}s perRow=${((Date.now() - started) / rows.length / 1000).toFixed(3)}s\n`);
    return;
  }

  if (mode === "screen-p1") {
    runScreen({ rows: stageP1Rows(), offset, limit, out, tag: "p1", samples });
    return;
  }

  if (mode === "screen-p1b") {
    runScreen({ rows: stageP1bRows(), offset, limit, out, tag: "p1b", samples });
    return;
  }

  if (mode === "select-p2") {
    const p1 = readShardRows(out, "p1-").filter((r) => r.config.stage === "p1");
    const champions = [];
    let lenient = false;
    for (const u of FIXTURE.grids.driftPrimary) {
      const picked = selectChampionsLenient(p1.filter((r) => r.config.u === u), FIXTURE.selection.stageP2ChampionsPerDrift);
      lenient = lenient || picked.lenient;
      champions.push(...picked.rows.map((r) => r.config));
    }
    writeFileSync(path.join(out, "p2-champions.json"), JSON.stringify({ lenient, champions }, null, 2));
    process.stdout.write(`p2 champions=${champions.length} lenient=${lenient}\n`);
    return;
  }

  if (mode === "screen-p2") {
    const { champions } = JSON.parse(readFileSync(path.join(out, "p2-champions.json"), "utf8"));
    runScreen({ rows: stageP2Rows(champions), offset, limit, out, tag: "p2", samples });
    return;
  }

  if (mode === "select-p3") {
    const pool = [...readShardRows(out, "p1-"), ...readShardRows(out, "p1b-"), ...readShardRows(out, "p2-")].filter((r) => r.config.u > 0);
    const picked = selectChampionsLenient(pool, FIXTURE.selection.stageP3Champions);
    writeFileSync(path.join(out, "p3-champions.json"), JSON.stringify({ lenient: picked.lenient, champions: picked.rows.map((r) => r.config) }, null, 2));
    process.stdout.write(`p3 champions=${picked.rows.length} lenient=${picked.lenient}\n`);
    return;
  }

  if (mode === "screen-p3" || mode === "screen-p4") {
    const { champions } = JSON.parse(readFileSync(path.join(out, "p3-champions.json"), "utf8"));
    const rows = [];
    if (mode === "screen-p3") {
      for (const u of FIXTURE.grids.driftContinuation) for (const c of champions) rows.push(...neighborhoodRows(c, u, "p3"));
    } else {
      for (const c of champions) rows.push(...neighborhoodRows(c, FIXTURE.grids.driftLuminal, "p4"));
    }
    runScreen({ rows, offset, limit, out, tag: mode === "screen-p3" ? "p3" : "p4", samples });
    return;
  }

  if (mode === "ladder") {
    const stage = arg("stage", "p1");
    const rows = readShardRows(out, `${stage}-`);
    const marginal = rows.filter((r) => r.certified && r.bindingResidual <= FIXTURE.nearMarginalFactor * FIXTURE.gates.bindResidual);
    const champs = selectChampionsLenient(rows, 6).rows;
    const targets = [...new Map([...marginal, ...champs].map((r) => [r.config.id, r.config])).values()];
    const replay = [];
    for (const config of targets) {
      for (const ns of FIXTURE.samplingLadder) {
        const m = measureCanonicalPhotonRow(config, { samples: ns });
        replay.push({ id: config.id, samples: ns, windowFactor: 1, bindingResidual: m.bindingResidual, kappaStar: m.kappaStar, axialPump: m.axialPump, certified: m.certified });
      }
      for (const wf of FIXTURE.screen.windowLadder.slice(1)) {
        const m = measureCanonicalPhotonRow(config, { samples: FIXTURE.samplingLadder[1], windowFactor: wf });
        replay.push({ id: config.id, samples: FIXTURE.samplingLadder[1], windowFactor: wf, bindingResidual: m.bindingResidual, kappaStar: m.kappaStar, axialPump: m.axialPump, certified: m.certified });
      }
    }
    writeFileSync(path.join(out, `ladder-${stage}.json`), JSON.stringify(replay, null, 2));
    process.stdout.write(`ladder rows=${targets.length} entries=${replay.length}\n`);
    return;
  }

  if (mode === "summarize") {
    const all = [];
    for (const tag of ["p1-", "p1b-", "p2-", "p3-", "p4-"]) all.push(...readShardRows(out, tag));
    const certified = all.filter((r) => r.certified);
    const best = (rows) => rows.slice().sort((a, b) => a.bindingResidual - b.bindingResidual)[0] ?? null;
    const compact = (r) => r && {
      id: r.config.id, stage: r.config.stage, u: r.config.u,
      RI: r.config.RI, RO: r.config.RO, v: [r.config.vI, r.config.vM, r.config.vO],
      d1: r.config.d1, d2: r.config.d2, gap: r.config.gap,
      phiM: r.config.phiM, phiO: r.config.phiO, senses: r.config.senses, conj: r.config.conj, delta: r.config.delta,
      kappaStar: r.kappaStar, bindingResidual: r.bindingResidual, axialPump: r.axialPump,
      gates: r.gates, flags: r.flags,
    };
    const driftValues = [...new Set(all.map((r) => r.config.u))].sort((a, b) => a - b);
    const perDrift = {};
    for (const u of driftValues) {
      const rows = certified.filter((r) => r.config.u === u);
      const b = best(rows);
      perDrift[u] = {
        rows: rows.length,
        best: compact(b),
        bindPassCount: rows.filter((r) => r.gates.bind).length,
        minBindingResidual: b ? b.bindingResidual : null,
      };
    }
    // (a) is pi selected? best row per Delta at each primary drift
    const piSelection = {};
    for (const u of FIXTURE.grids.driftPrimary) {
      piSelection[u] = FIXTURE.grids.partnerOffset.map((delta) => {
        const b = best(certified.filter((r) => r.config.u === u && Math.abs(r.config.delta - delta) < 1e-12));
        return { delta, minBindingResidual: b ? b.bindingResidual : null };
      });
    }
    // (b) sense patterns and (c) polarity variants
    const senseBests = FIXTURE.grids.sensePatterns.map((p) => {
      const key = p.join(",");
      const b = best(certified.filter((r) => r.config.senses.join(",") === key));
      return { pattern: key, minBindingResidual: b ? b.bindingResidual : null };
    });
    const polarityBests = FIXTURE.grids.polarityConjugate.map((conj) => {
      const b = best(certified.filter((r) => r.config.conj === conj));
      return { conjugated: conj, minBindingResidual: b ? b.bindingResidual : null, bindPass: certified.some((r) => r.config.conj === conj && r.gates.bind) };
    });
    // d_i(u) flattening diagnostic from the best certified row per drift
    const flattening = driftValues.map((u) => {
      const b = best(certified.filter((r) => r.config.u === u));
      return b ? { u, d1: b.config.d1, d2: b.config.d2, gap: b.config.gap, bindingResidual: b.bindingResidual } : { u, d1: null, d2: null, gap: null };
    });
    // Richardson extrapolation of min binding residual toward u = c_f
    const pts = FIXTURE.luminal.richardsonPoints
      .map((u) => ({ e: 1 - u, y: perDrift[u]?.minBindingResidual }))
      .filter((p) => Number.isFinite(p.y));
    let luminalExtrapolation = null;
    if (pts.length >= 2) {
      const [p2, p1] = pts.slice(-2);
      const two = p1.y + (p2.y - p1.y) * (0 - p1.e) / (p2.e - p1.e);
      let three = null;
      if (pts.length >= 3) {
        const [a, b, c] = pts.slice(-3);
        const L = (x, pI, pJ, pK) => pI.y * ((x - pJ.e) * (x - pK.e)) / ((pI.e - pJ.e) * (pI.e - pK.e));
        three = L(0, a, b, c) + L(0, b, a, c) + L(0, c, a, b);
      }
      luminalExtrapolation = { twoPoint: two, threePoint: three, errorBudget: three === null ? null : Math.abs(two - three) };
    }
    const rest = perDrift[0] ?? { rows: 0, best: null, bindPassCount: 0 };
    const luminalDirect = perDrift[1] ?? null;
    const anyBind = certified.some((r) => r.gates.bind && r.config.u > 0);
    const restBind = rest.bindPassCount > 0;
    const summary = {
      schema: SCHEMA,
      generatedAt: new Date().toISOString(),
      totals: { rows: all.length, certified: certified.length, uncertified: all.length - certified.length },
      perDrift, piSelection, senseBests, polarityBests, flattening, luminalExtrapolation,
      restBranch: { rows: rest.rows, bindPassCount: rest.bindPassCount, minBindingResidual: rest.best?.bindingResidual ?? null },
      luminalDirect,
      decision: anyBind
        ? (restBind ? "candidate_rows_bind_but_rest_branch_also_binds_no_photon" : "force_balanced_drift_rows_found_candidate_pending_eom_release")
        : "no_canonical_photon_row_reaches_force_balance_in_declared_coverage",
    };
    writeFileSync(path.join(out, "summary.json"), JSON.stringify(summary, null, 2));
    process.stdout.write(JSON.stringify(summary, null, 2) + "\n");
    return;
  }

  if (mode === "anchor") {
    const { planarPencilAnalyticAnchor } = await import("./planar-assembled-free-particle.mjs");
    const anchor = planarPencilAnalyticAnchor({});
    process.stdout.write(JSON.stringify({ anchor: { error: anchor.error, passes: anchor.passes, actualLeading: anchor.actualLeading, expected: anchor.expectedEigenvalues } }, null, 2) + "\n");
    return;
  }

  if (mode === "controls") {
    const which = arg("which", "92");
    if (which === "92") {
      const { contraRotatingProAntiPairInstrument } = await import("./contra-rotating-pro-anti-pair-instrument.mjs");
      const s92 = contraRotatingProAntiPairInstrument();
      const free = s92.jointFlutter.freePair.leadingRe, hard = s92.jointFlutter.hardLockCounterfactual.leadingRe;
      process.stdout.write(JSON.stringify({ section92: { free, hard, dFree: Math.abs(free - 0.19885688497216406), dHard: Math.abs(hard - 0.19629953398461314) } }) + "\n");
    } else if (which === "93") {
      const { contraRotatingCrossCouplingCompletion } = await import("./contra-rotating-pro-anti-cross-coupling.mjs");
      const s93 = contraRotatingCrossCouplingCompletion();
      process.stdout.write(JSON.stringify({ section93: { separation: s93.selectedCell.separation, phase: s93.selectedCell.phase, leadingRe: s93.jointSpectrum.leadingRe, dSep: Math.abs(s93.selectedCell.separation - 1.419842173795055), dPhase: Math.abs(s93.selectedCell.phase - 3.8435815410366416), dRe: Math.abs(s93.jointSpectrum.leadingRe - 5.30422826) } }) + "\n");
    } else {
      const { dressedContraRotatingElectronCompletion } = await import("./dressed-contra-rotating-electron.mjs");
      const s95 = dressedContraRotatingElectronCompletion();
      process.stdout.write(JSON.stringify({ section95: { chargeInE: s95.observables.netChargeInE, decision: s95.decision, leadingRe: s95.jointSpectrumWithPayload.leadingRe } }) + "\n");
    }
    return;
  }

  if (mode === "legacy-parity") {
    const { solveMovingCircularSourceCausalRoots } = await import("../../src/solver/app/AbsoluteHistoryRootRuntime.mjs");
    const rows = stageP1Rows();
    const stride = Number(arg("stride", 4999));
    const report = [];
    for (let idx = offset; idx < rows.length && report.length < Number(arg("pairs", 8)); idx += stride) {
      const config = rows[idx];
      const sites = buildCanonicalPhoton(config);
      // trail <- lead is the short-delay (backward-emission) direction at
      // drift; lead <- trail is the long-delay chase direction.
      const receiver = sites.find((s) => s.plusSlot && s.braid === "trail" && s.binary === "M");
      const source = sites.find((s) => s.braid === "lead" && s.binary === "M" && s.plusSlot);
      const t = 0.37;
      const rPos = sitePosition(receiver, config.u, t), rVel = siteVelocity(receiver, config.u, t);
      const screenFlags = { tangentRoot: false, causticDs: false };
      const window = 40;
      const mine = scanRoots({ receiverPos: rPos, source, u: config.u, t, cf: 1, window, points: 8000, exclusion: 0, screen: FIXTURE.screen, flags: screenFlags });
      const legacy = solveMovingCircularSourceCausalRoots({
        source: {
          centerAtEpoch: { x: 0, y: 0, z: source.z }, centerVelocity: { x: 0, y: 0, z: config.u },
          radiusU: { x: source.radius * Math.cos(source.phase), y: source.radius * Math.sin(source.phase), z: 0 },
          radiusV: { x: -source.radius * Math.sin(source.phase), y: source.radius * Math.cos(source.phase), z: 0 },
          angularVelocity: source.omega, angularAcceleration: 0, phaseAtEpoch: 0, epochTime: 0,
        },
        receiver: { startTime: t, positionAtStart: { x: rPos[0], y: rPos[1], z: rPos[2] }, velocity: { x: rVel[0], y: rVel[1], z: rVel[2] } },
        hitTime: t, signalSpeed: 1, sourceStartTime: t - window, sourceEndTime: t - 1e-9,
        rootTolerance: 1e-12, scanSubdivisions: 8000, maxRoots: 64,
      }).roots ?? [];
      const legacyTimes = legacy.map((r) => r.emissionTime).sort((a, b) => a - b);
      const mineTimes = mine.map((r) => r.tau).sort((a, b) => a - b);
      const matched = mineTimes.length === legacyTimes.length && mineTimes.every((v, i) => Math.abs(v - legacyTimes[i]) <= FIXTURE.crossCheck.legacyRootTolerance);
      report.push({ index: idx, u: config.u, mineCount: mineTimes.length, legacyCount: legacyTimes.length, matched, maxDelta: Math.max(0, ...mineTimes.map((v, i) => Math.abs(v - (legacyTimes[i] ?? Infinity)))) });
    }
    process.stdout.write(JSON.stringify({ allMatched: report.every((r) => r.matched), report }, null, 2) + "\n");
    return;
  }

  if (mode === "self-parity-emit") {
    // Emit super-c_f helical self-root cases for the independent mpmath
    // comparator (closed-form residual 2R|sin(w d/2)| = sqrt(cf^2-u^2) d).
    const cases = [
      { radius: 1.0, speed: 1.25, u: 0, phase: 0.3, z: 0 },
      { radius: 0.75, speed: 0.9, u: 0.99, phase: 1.1, z: 0.4 },
      { radius: 1.3, speed: 1.25, u: 0.9999, phase: 0, z: -0.2 },
    ].map((c, i) => {
      const site = { id: `case${i}`, radius: c.radius, omega: c.speed / c.radius, speed: c.speed, phase: c.phase, z: c.z, charge: 1 / 6, polarity: 1, plusSlot: true, braid: "lead", binary: "M" };
      const t = 0.81;
      const rPos = sitePosition(site, c.u, t), rVel = siteVelocity(site, c.u, t);
      const flags = { tangentRoot: false, causticDs: false };
      // production path: exact closed-form self-root ledger (as the screen)
      const roots = selfRootDelays(site, c.u, 1, FIXTURE.screen, flags).map((r) => ({ tau: t - r.delta, residual: r.residual }));
      // consistency: the generic Lipschitz scanner over the causal residual
      const genericFlags = { tangentRoot: false, causticDs: false, scanBudgetExhausted: false };
      const deltaMax = (2 * c.radius) / Math.sqrt(1 - c.u * c.u);
      const window = 1.05 * deltaMax + TAU / Math.abs(site.omega);
      const points = Math.ceil((window * Math.abs(site.omega) * FIXTURE.screen.scanOversample) / TAU);
      const genericRoots = scanRoots({ receiverPos: rPos, source: site, u: c.u, t, cf: 1, window, points, exclusion: 1e-6, screen: FIXTURE.screen, flags: genericFlags });
      const force = [0, 0, 0];
      for (const root of roots) {
        const sPos = sitePosition(site, c.u, root.tau), sVel = siteVelocity(site, c.u, root.tau);
        const dx = rPos[0] - sPos[0], dy = rPos[1] - sPos[1], dz = rPos[2] - sPos[2];
        const dist = Math.hypot(dx, dy, dz);
        const nx = dx / dist, ny = dy / dist, nz = dz / dist;
        const ds = 1 - (nx * sVel[0] + ny * sVel[1] + nz * sVel[2]);
        const dt = 1 - (nx * rVel[0] + ny * rVel[1] + nz * rVel[2]);
        const w = (site.charge * site.charge * Math.abs(dt / ds)) / (dist * dist);
        force[0] += w * nx; force[1] += w * ny; force[2] += w * nz;
      }
      return { ...c, t, omega: site.omega, receptionDelays: roots.map((r) => t - r.tau), genericScanDelays: genericRoots.map((r) => t - r.tau), genericFlags, force, flags };
    });
    mkdirSync(out, { recursive: true });
    writeFileSync(path.join(out, "self-parity-cases.json"), JSON.stringify({ fieldSpeed: 1, chargeUnit: 1 / 6, cases }, null, 2));
    process.stdout.write(`emitted ${cases.length} cases -> ${path.join(out, "self-parity-cases.json")}\n`);
    return;
  }

  throw new Error(`unknown mode: ${mode}`);
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) main().catch((error) => { process.stderr.write(`${error.stack}\n`); process.exit(1); });
