import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  buildSources,
  internalLedger,
  netFarField,
  fibonacciSphere,
  linearSlope,
} from "../scripts/braid-ideal/sea-braid-shielding-ratio-diagnostic.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/braid-ideal/sea-braid-shielding-ratio-diagnostic.mjs", import.meta.url)
);

const OPTIONS = { fieldSpeed: 1, radius: 1, coupling: 1, softening: 0.05, jacobianFloor: 0.05 };

function runDiagnostic(args = []) {
  const stdout = execFileSync(process.execPath, [SCRIPT_PATH, ...args], { encoding: "utf8" });
  return JSON.parse(stdout);
}

test("neutral drum and both dimer pairings carry zero net polarity inventory", () => {
  const single = buildSources(1, "single");
  const reversed = buildSources(1, "doublet", { pairing: "reversed", offsetDir: "lateral", offset: 0.5 });
  const aligned = buildSources(1, "doublet", { pairing: "aligned", offsetDir: "lateral", offset: 0.5 });
  assert.equal(single.length, 6);
  assert.equal(reversed.length, 12);
  assert.equal(aligned.length, 12);
  const sum = (list) => list.reduce((acc, s) => acc + s.sigma, 0);
  assert.equal(sum(single), 0);
  assert.equal(sum(reversed), 0);
  assert.equal(sum(aligned), 0);
});

test("internal potential-superposition ledger is finite and the doublet stores more", () => {
  const single = internalLedger(buildSources(1, "single"), OPTIONS);
  const doublet = internalLedger(
    buildSources(1, "doublet", { pairing: "reversed", offsetDir: "lateral", offset: 0.5 }),
    OPTIONS,
  );
  assert.ok(Number.isFinite(single.net) && Number.isFinite(single.abs));
  assert.ok(single.abs > 0);
  // Twelve sites carry a larger magnitude ledger than six.
  assert.ok(doublet.abs > single.abs);
});

test("neutral drum DC far field falls as a dipole (slope ~ -2, ell = 1)", () => {
  const directions = fibonacciSphere(200);
  const sources = buildSources(1, "single");
  const beta = 0.6;
  const omega = (beta * OPTIONS.fieldSpeed) / (OPTIONS.radius * Math.sqrt(2 / 3));
  const period = (2 * Math.PI) / omega;
  const context = { options: OPTIONS, sources, omega };
  const radii = [20, 40, 80, 160];
  const means = radii.map((r) => netFarField(r, directions, period, context, 64).mean);
  const slope = linearSlope(radii.map((r) => Math.log(r)), means.map((m) => Math.log(m)));
  assert.ok(Math.abs(slope - -2) < 0.15, `expected dipole slope near -2, got ${slope}`);
});

test("far-field depth discriminates the ground state: reversed=quadrupole shields, aligned chain=dipole does not", () => {
  const report = runDiagnostic([
    "--mode",
    "both",
    "--pairing",
    "both",
    "--offset-dir",
    "lateral",
    "--surface-speed-fractions",
    "0.6",
    "--far-radii",
    "20,40,80,160",
    "--sphere-samples",
    "200",
    "--time-samples",
    "48",
  ]);
  const single = report.modes.find((m) => m.label === "single").speedRows[0];
  const reversed = report.modes.find((m) => m.label === "doublet_reversed").speedRows[0];
  const aligned = report.modes.find((m) => m.label === "doublet_aligned").speedRows[0];
  // The quiet doublet (dipole-reversed) collapses to a quadrupole; the chain
  // (aligned dipoles) stays a dipole -> the shielding depth is the selector.
  assert.equal(single.shieldingMultipoleEll, 1);
  assert.equal(reversed.shieldingMultipoleEll, 2);
  assert.equal(aligned.shieldingMultipoleEll, 1);
  const ratioReversed = reversed.radiusRows.at(-1).shieldingRatio;
  const ratioAligned = aligned.radiusRows.at(-1).shieldingRatio;
  // The reversed pairing out-shields the aligned chain by orders of magnitude.
  assert.ok(ratioReversed > 100 * ratioAligned, `reversed ${ratioReversed} vs aligned ${ratioAligned}`);
});

test("the oscillating channel is a radiative 1/r tail (slope ~ -1) at every speed", () => {
  const report = runDiagnostic([
    "--mode",
    "single",
    "--surface-speed-fractions",
    "0.3,0.9",
    "--far-radii",
    "20,40,80,160",
    "--sphere-samples",
    "160",
    "--time-samples",
    "48",
  ]);
  for (const row of report.modes[0].speedRows) {
    assert.ok(Math.abs(row.radiativeSlope - -1) < 0.15, `expected -1, got ${row.radiativeSlope} at beta ${row.surfaceSpeedFraction}`);
  }
});

test("rail row stays time-converged via beta-adaptive sampling (dipole recovered at beta=0.99)", () => {
  const report = runDiagnostic([
    "--mode",
    "single",
    "--surface-speed-fractions",
    "0.99",
    "--far-radii",
    "20,40,80,160",
    "--sphere-samples",
    "120",
    "--time-samples",
    "24",
  ]);
  const row = report.modes[0].speedRows[0];
  assert.ok(row.effectiveTimeSamples > 24, "expected beta-adaptive upsampling near the rail");
  assert.equal(row.shieldingMultipoleEll, 1);
});

test("report is fail-closed and self-describing", () => {
  const report = runDiagnostic(["--mode", "single", "--surface-speed-fractions", "0.6", "--far-radii", "20,40,80"]);
  assert.equal(report.diagnostic, "sea_braid_shielding_ratio_diagnostic.v0");
  assert.match(report.claimLevel, /retainedBranchClaim=false/);
  assert.match(report.claimLevel, /scoreMovement=no_score_increase/);
  assert.match(report.interiorEnergyNote, /A_0/);
});
