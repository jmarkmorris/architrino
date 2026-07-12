import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { baseDrum } from "../scripts/braid-ideal/sea-braid-shielding-ratio-diagnostic.mjs";
import {
  drumB,
  staticInteractionEnergy,
  delayedInteractionEnergy,
  localMinima,
  bandLadder,
  invertSpacing,
  invertFromSpacing,
} from "../scripts/braid-ideal/sea-braid-dimer-energy-diagnostic.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/braid-ideal/sea-braid-dimer-energy-diagnostic.mjs", import.meta.url)
);
const OPTIONS = { fieldSpeed: 1, radius: 1, coupling: 1, softening: 0.05, jacobianFloor: 0.05 };

function run(args = []) {
  return JSON.parse(execFileSync(process.execPath, [SCRIPT_PATH, ...args], { encoding: "utf8" }));
}

test("static inter-drum energy: reversed attracts, aligned repels (side-by-side)", () => {
  const a = baseDrum(1);
  const reversed = staticInteractionEnergy(a, drumB(1, "reversed", "lateral", 4), OPTIONS);
  const aligned = staticInteractionEnergy(a, drumB(1, "aligned", "lateral", 4), OPTIONS);
  assert.ok(reversed < 0, `reversed static should be attractive, got ${reversed}`);
  assert.ok(aligned > 0, `aligned static should be repulsive, got ${aligned}`);
  // Sigma-flip symmetry: aligned = -reversed exactly.
  assert.ok(Math.abs(reversed + aligned) < 1e-9);
});

test("localMinima finds interior dips only", () => {
  const s = [1, 2, 3, 4, 5];
  const values = [0, -1, 0, -2, 0];
  const mins = localMinima(values, s);
  assert.equal(mins.length, 2);
  assert.deepEqual(mins.map((m) => m.s), [2, 4]);
});

test("delayed energy develops a confining band the static curve lacks", () => {
  const a = baseDrum(1);
  const omega = (0.6 * 1) / Math.sqrt(2 / 3);
  const scan = [];
  const statics = [];
  for (let i = 0; i <= 40; i += 1) {
    const s = 3 + (6 * i) / 40;
    scan.push(delayedInteractionEnergy(a, drumB(1, "reversed", "lateral", s), omega, OPTIONS, 24));
    statics.push(staticInteractionEnergy(a, drumB(1, "reversed", "lateral", s), OPTIONS));
  }
  const sVals = scan.map((_, i) => 3 + (6 * i) / 40);
  // The delayed curve has an interior confining minimum; the static curve is
  // monotonic (no interior minimum) over the same window.
  assert.ok(localMinima(scan, sVals).length >= 1, "delayed energy should have a confining band");
  assert.equal(localMinima(statics, sVals).length, 0, "static energy should be monotonic");
});

test("energy selects the reversed quiet doublet at a finite s* on the quadrupole branch", () => {
  const report = run([
    "--pairing",
    "both",
    "--offset-dir",
    "lateral",
    "--surface-speed-fraction",
    "0.6",
    "--s-min",
    "3",
    "--s-max",
    "9",
    "--s-samples",
    "40",
    "--time-samples",
    "24",
    "--far-radii",
    "20,40,80,160",
    "--sphere-samples",
    "120",
  ]);
  const reversed = report.pairings.find((p) => p.pairing === "reversed");
  const aligned = report.pairings.find((p) => p.pairing === "aligned");
  assert.ok(reversed.selectedSeparation > 3 && reversed.selectedSeparation < 9);
  assert.ok(reversed.selectedEnergyDelayed < 0, "reversed well should be bound (U < 0)");
  // The delay-selected geometry sits on the quadrupole branch.
  assert.equal(reversed.shieldingAtSelected.shieldingMultipoleEll, 2);
  // The aligned chain stays a dipole and is the shallower state.
  assert.equal(aligned.shieldingAtSelected.shieldingMultipoleEll, 1);
  assert.ok(reversed.selectedEnergyDelayed < aligned.selectedEnergyDelayed, "reversed is the deeper ground state");
});

test("the confining separation tracks cadence (s* shrinks as beta rises)", () => {
  const common = [
    "--pairing", "reversed", "--offset-dir", "lateral", "--s-min", "3", "--s-max", "12",
    "--s-samples", "60", "--time-samples", "24", "--sphere-samples", "96",
  ];
  const slow = run(["--surface-speed-fraction", "0.5", ...common]);
  const fast = run(["--surface-speed-fraction", "0.8", ...common]);
  const sSlow = slow.pairings[0].selectedSeparation;
  const sFast = fast.pairings[0].selectedSeparation;
  assert.ok(sFast < sSlow, `expected s*(0.8)=${sFast} < s*(0.5)=${sSlow}`);
  // Commensurability phase s* * omega is roughly invariant (delay-resonance).
  const phaseSlow = sSlow * slow.parameters.omega;
  const phaseFast = sFast * fast.parameters.omega;
  assert.ok(Math.abs(phaseSlow - phaseFast) / phaseSlow < 0.25, `phase ${phaseSlow} vs ${phaseFast}`);
});

test("bandLadder drops shallow secondary minima and fits the dominant m", () => {
  // Deep primary bands at 5, 8, 11 (spacing 3) plus a shallow ripple at 12.5.
  const minima = [
    { s: 5, value: -0.2 },
    { s: 8, value: -0.19 },
    { s: 11, value: -0.18 },
    { s: 12.5, value: -0.01 },
  ];
  const omega = (2 * Math.PI) / 9; // so that spacing 3 -> spacing*omega = 2*pi/3
  const ladder = bandLadder(minima, omega, 1, 1);
  assert.equal(ladder.primaryBands, 3, "shallow ripple should be filtered out");
  assert.equal(ladder.harmonicNearestInteger, 3);
  assert.ok(Math.abs(ladder.ladderConstantSOmega - (2 * Math.PI) / 3) < 1e-9);
});

test("the confining ladder is m=3 (C3) and beta-independent (~2*pi/3)", () => {
  const IDEAL = (2 * Math.PI) / 3;
  const common = [
    "--pairing", "reversed", "--offset-dir", "lateral", "--s-min", "2.6", "--s-max", "16",
    "--s-samples", "200", "--time-samples", "24", "--sphere-samples", "40", "--far-radii", "20,40",
  ];
  const b06 = run(["--surface-speed-fraction", "0.6", ...common]).pairings[0].bandLadder;
  const b08 = run(["--surface-speed-fraction", "0.8", ...common]).pairings[0].bandLadder;
  assert.equal(b06.harmonicNearestInteger, 3);
  assert.equal(b08.harmonicNearestInteger, 3);
  // Ladder constant sits near 2*pi/3 and does not scale with beta.
  assert.ok(Math.abs(b06.ladderConstantSOmega - IDEAL) / IDEAL < 0.08);
  assert.ok(Math.abs(b08.ladderConstantSOmega - IDEAL) / IDEAL < 0.08);
  assert.ok(Math.abs(b06.ladderConstantSOmega - b08.ladderConstantSOmega) / IDEAL < 0.08);
});

test("inversion round-trips: shell spacing -> cadence recovers the true omega", () => {
  // At beta=0.6 the true omega is 0.6/sqrt(2/3); the measured shell spacing is
  // ~2.876. The spacing-based inversion should recover it to a few percent.
  const trueOmega = 0.6 / Math.sqrt(2 / 3);
  const inv = invertFromSpacing(2.876, 3, 1, 1);
  assert.ok(Math.abs(inv.omegaSea - trueOmega) / trueOmega < 0.05, `got ${inv.omegaSea} vs ${trueOmega}`);
  // Single-shell inversion of a named spacing gives a sub-field cadence.
  const named = invertSpacing(4.25, 3, 1, 1, 1);
  assert.ok(named.siteSpeedFractionSea > 0 && named.siteSpeedFractionSea < 1);
  assert.equal(named.supraField, false);
});

test("report carries the closed-form law and is fail-closed", () => {
  const report = run(["--pairing", "reversed", "--s-samples", "20", "--sphere-samples", "80", "--invert-spacing", "4.25"]);
  assert.equal(report.diagnostic, "sea_braid_dimer_energy_diagnostic.v0");
  assert.equal(report.commensurabilityLaw.dominantHarmonic, 3);
  assert.ok(Math.abs(report.commensurabilityLaw.predictedLadderConstantSOmega - (2 * Math.PI) / 3) < 1e-6);
  assert.equal(report.inversion.observedSpacing, 4.25);
  assert.match(report.claimLevel, /retainedBranchClaim=false/);
  assert.match(report.claimLevel, /scoreMovement=no_score_increase/);
});
