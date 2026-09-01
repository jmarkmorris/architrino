import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { Q } from "../scripts/eom/derive-subfield-circular-root-reference.mjs";
import {
  CIRCULAR_ERROR_CONTRACT, certifyCircularSegment, circularConstructionBudget,
  cubicEndpointDefects, formatCircularBound, parseCircularToken, circularCarrierDomain,
} from "../src/prescribed-path-analysis/CircularHistoryConformance.mjs";

const p = (token) => { const value = parseCircularToken(String(token)); return [value, value]; };
const source = (changes = {}) => ({ kind: "moving-circular.v1", centerAtEpoch: ["0", "0", "0"],
  centerVelocity: ["0", "0", "0"], radiusU: ["1", "0", "0"], radiusV: ["0", "1", "0"],
  phaseAtEpoch: "0", angularVelocity: "0", angularAcceleration: "0", epochTime: "2", ...changes });
const segment = () => ({ tStart: "2", tEnd: "2.002", coefficients: [["1", "0", "0", "0"], ["0", "0", "0", "0"], ["0", "0", "0", "0"]],
  positionErrors: [CIRCULAR_ERROR_CONTRACT.positionError].flatMap((x) => [x, x, x]),
  velocityErrors: [CIRCULAR_ERROR_CONTRACT.velocityError].flatMap((x) => [x, x, x]) });

test("exact cubic endpoint controls give zero defect", () => {
  const result = cubicEndpointDefects(["1", "2", "3", "4"], parseCircularToken("0.25"),
    p(1), p(2), p("1.75"), p("4.25"));
  assert.equal(result.positionDefect, 0n);
  assert.equal(result.velocityDefect, 0n);
});

test("equal endpoint positions do not hide a tangent error", () => {
  const result = cubicEndpointDefects(["0", "0.000001", "-0.000001", "0"], Q,
    p(0), p(0), p(0), p(0));
  assert(result.positionDefect * 3n >= parseCircularToken("0.000001"));
  assert.equal(result.velocityDefect, parseCircularToken("0.000001"));
});

test("known stationary geometry passes with nonzero widths, not H3 authority", () => {
  const result = certifyCircularSegment(source(), segment());
  assert.equal(result.accepted, true);
  assert.equal(result.h3EvidenceEligible, false);
  assert.equal(result.authority, "single-segment-only");
});

test("wrong position, wrong tangent, widths, and grid fail closed", () => {
  const wrongPosition = segment(); wrongPosition.coefficients[0][0] = "1.000000001";
  assert.equal(certifyCircularSegment(source(), wrongPosition).accepted, false);
  const wrongTangent = segment(); wrongTangent.coefficients[0][1] = "1e-9";
  wrongTangent.coefficients[0][2] = "-0.0000005";
  assert.equal(certifyCircularSegment(source(), wrongTangent).accepted, false);
  const zero = segment(); zero.positionErrors = ["0", "0", "0"];
  assert.throws(() => certifyCircularSegment(source(), zero), /widths/);
  const short = segment(); short.tEnd = "2.001";
  assert.throws(() => certifyCircularSegment(source(), short), /0.002/);
  assert.throws(() => certifyCircularSegment(source({ centerVelocity: ["0", "1", "0"] }), segment()), /stationary/);
});

test("exact normalized constant-circle construction budget closes", () => {
  const result = circularConstructionBudget(source(), "0");
  assert.equal(result.accepted, true);
  assert.equal(result.authority, "conditional-construction-budget-only");
  assert.equal(result.h3EvidenceEligible, false);
  assert.equal(parseCircularToken(result.velocityErrorUpper[0]), parseCircularToken("3.02e-10"));
  assert(parseCircularToken(result.positionErrorUpper[0]) * 3n >= parseCircularToken("3.02e-13"));
  assert.throws(() => circularConstructionBudget(source(), "1"), /sub-field/);
});

test("conservative cohort fourth derivative still fits the analytic-reference spread", () => {
  // omega=1, Ux=104 gives the independently reviewed conservative M4=104.
  // The supplied speed bound is a theorem assumption, not established by this
  // synthetic operator. The production budget CLI supplies source-bound vMax.
  const result = circularConstructionBudget(source({ radiusU: ["104", "0", "0"], angularVelocity: "1" }), "0.989601685881");
  assert.equal(result.fourthDerivativeUpper[0], "104");
  assert.equal(result.accepted, true);
  assert(parseCircularToken(result.positionErrorUpper[0]) < parseCircularToken("5.648e-12"));
  assert(parseCircularToken(result.velocityErrorUpper[0]) < parseCircularToken("1.044e-7"));
  assert(parseCircularToken(result.representationRootSpreadUpper) < parseCircularToken("8.611e-9"));
});

test("exact binary64 overhangs extend both nominal endpoints", () => {
  const domain = circularCarrierDomain("2", "2.002");
  assert.equal(domain.left, 2n * Q - Q / 2n ** 52n);
  assert(domain.right > parseCircularToken("2.002"));
  assert(domain.right - domain.left < parseCircularToken(CIRCULAR_ERROR_CONTRACT.maximumProofStep));
  assert.throws(() => circularCarrierDomain("0", "0.002"), /pilot/);
  const result = certifyCircularSegment(source(), segment());
  assert.equal(result.proofDomain[0], formatCircularBound(domain.left));
  assert.equal(result.proofDomain[1], formatCircularBound(domain.right));
  assert.equal(result.parsedEndpointBits[0], "4000000000000000");
});

test("declared error radii are exact binary64 dyadics", () => {
  assert.equal(parseCircularToken(CIRCULAR_ERROR_CONTRACT.positionError) * 2n ** 37n, Q);
  assert.equal(parseCircularToken(CIRCULAR_ERROR_CONTRACT.velocityError) * 2n ** 22n, Q);
  assert.equal(Number(CIRCULAR_ERROR_CONTRACT.positionError), 2 ** -37);
  assert.equal(Number(CIRCULAR_ERROR_CONTRACT.velocityError), 2 ** -22);
});

test("decimal tokens preserve exact values and reject nonfinite carriers", () => {
  assert.equal(formatCircularBound(parseCircularToken("-0.002")), "-0.002");
  for (const token of [NaN, "NaN", "Infinity", "1e-400", "1e400", "0.".repeat(100)]) {
    assert.throws(() => parseCircularToken(token));
  }
});

test("nonconstant circle is checked against separately derived rational Taylor endpoints", () => {
  // Rational sin/cos polynomials through degree13/12 have error below1e-45 at
  // h=1/500. Convert the independently calculated endpoint Hermite coefficients
  // to60 decimal places. This is an oracle-control fixture, not an adapter run.
  const gcd = (a, b) => { while (b) [a, b] = [b, a % b]; return a < 0n ? -a : a; };
  const rat = (n, d = 1n) => { const g = gcd(n, d); return [n / g, d / g]; };
  const add = (a, b) => rat(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
  const mul = (a, b) => rat(a[0] * b[0], a[1] * b[1]);
  const sc = (a, n, d = 1n) => mul(a, rat(n, d));
  let factorial = 1n, power = rat(1n), sine = rat(0n), cosine = rat(0n);
  for (let n = 0n; n <= 13n; n++) {
    if (n > 0n) { factorial *= n; power = sc(power, 1n, 500n); }
    const sign = ((n / 2n) % 2n) ? -1n : 1n;
    if (n % 2n) sine = add(sine, sc(power, sign, factorial));
    else cosine = add(cosine, sc(power, sign, factorial));
  }
  const coefficients = (p0, v0, p1, v1) => {
    const delta = add(p1, sc(p0, -1n));
    return [p0, v0,
      add(sc(delta, 750000n), sc(add(sc(v0, 2n), v1), -500n)),
      add(sc(delta, -250000000n), sc(add(v0, v1), 250000n)),
    ].map(([n, d]) => formatCircularBound(n * Q / d));
  };
  const row = segment();
  row.coefficients = [coefficients(rat(1n), rat(0n), cosine, sc(sine, -1n)),
    coefficients(rat(0n), rat(1n), sine, cosine), ["0", "0", "0", "0"]];
  assert.equal(certifyCircularSegment(source({ angularVelocity: "1" }), row).accepted, true);
});

test("budget CLI checks all frozen members and never overwrites evidence", () => {
  const directory = mkdtempSync(path.join(tmpdir(), "subfield-circular-budget-test-"));
  try {
    const output = path.join(directory, "budget.json");
    const command = ["scripts/eom/derive-subfield-circular-history-budget.mjs", "--out", output];
    const result = spawnSync(process.execPath, command, { encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr);
    const report = JSON.parse(readFileSync(output));
    assert.equal(report.accepted, true);
    assert.equal(report.results.length, 16);
    assert.equal(report.results.reduce((sum, row) => sum + row.members.length, 0), 132);
    assert.equal(report.actualCarrierValidated, false);
    writeFileSync(output, "preserve\n");
    const retry = spawnSync(process.execPath, command, { encoding: "utf8" });
    assert.equal(retry.status, 1);
    assert.equal(readFileSync(output, "utf8"), "preserve\n");
  } finally { rmSync(directory, { recursive: true }); }
});
