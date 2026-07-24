import test from "node:test";
import assert from "node:assert/strict";

import {
  ledgerAt,
  scanLedger,
  selfRoots,
} from "../scripts/equation-mapping/analyze-circular-self-hit-binary.mjs";

const closeTo = (actual, expected, tolerance = 1e-10) => {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `expected ${actual} to be within ${tolerance} of ${expected}`,
  );
};

test("principal self-hit radial projection is outward and flips tangential sign at pi/2", () => {
  const below = ledgerAt(1.5).self[0];
  const threshold = ledgerAt(Math.PI / 2).self[0];
  const above = ledgerAt(1.65).self[0];

  assert.ok(below.radial > 0);
  assert.ok(threshold.radial > 0);
  assert.ok(above.radial > 0);
  assert.ok(below.tangential > 0);
  closeTo(threshold.tangential, 0, 1e-14);
  assert.ok(above.tangential < 0);
});

test("the absolute-chord census includes five self roots at beta=8", () => {
  const roots = selfRoots(8);
  assert.equal(roots.length, 5);
  const delayAnglesDegrees = roots.map((x) => (2 * x * 180) / Math.PI);
  const expected = [
    319.2408665465,
    413.6433089991,
    632.7111544904,
    859.1794129463,
    911.8418756932,
  ];
  delayAnglesDegrees.forEach((value, index) =>
    closeTo(value, expected[index], 1e-9),
  );
});

test("the pasted principal-partner magnitudes are reproduced through beta=6", () => {
  const expected = new Map([
    [1.2, [0.20879860964493643, 0.4665551033078555]],
    [1.4, [0.2320538518775931, 0.07070530524330115]],
    [Math.PI / 2, [0.2512251454629234, 0]],
    [1.7, [0.26543241336049495, -0.024775103945908764]],
    [2, [0.29775021075760594, -0.05420639871337755]],
    [3, [0.40218056001885427, -0.09548176554658246]],
    [6, [0.7083439236372812, -0.17621216931578854]],
  ]);

  for (const [beta, [partnerTangential, principalSelfTangential]] of expected) {
    const ledger = ledgerAt(beta);
    closeTo(ledger.partner[0].tangential, partnerTangential);
    closeTo(ledger.self[0].tangential, principalSelfTangential);
  }
});

test("the complete simple-root circular ledger has a tangential zero with inward radial acceleration", () => {
  const scan = scanLedger({
    maxBeta: 4,
    samplesPerInterval: 2400,
    ledgerName: "fullCircular",
  });
  assert.equal(scan.zeros.length, 1);
  closeTo(scan.zeros[0].beta, 3.070356625390253, 2e-10);
  assert.ok(scan.zeros[0].radial < 0);
  closeTo(scan.zeros[0].tangential, 0, 2e-9);
});
