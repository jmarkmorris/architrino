import test from "node:test";
import assert from "node:assert/strict";

import {
  assessCircularBalance,
  ledgerAt,
  LINE_OF_ACTION,
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

test("the extrapolated self direction agrees with its independent circular closed form", () => {
  const beta = 3;
  const x = selfRoots(beta)[0];
  const ledger = ledgerAt(beta, {
    lineOfAction:
      LINE_OF_ACTION.INERTIALLY_EXTRAPOLATED_EMISSION_SITE,
  });
  const doubled = 2 * x;
  const extrapolatedSeparation = [
    1 - Math.cos(doubled) - 2 * x * Math.sin(doubled),
    Math.sin(doubled) - 2 * x * Math.cos(doubled),
  ];
  const extrapolatedDistance = Math.hypot(...extrapolatedSeparation);
  const jacobian = 1 - x / Math.tan(x);
  const causalDistance = (2 * x) / beta;
  const scale =
    1 / (causalDistance * causalDistance * Math.abs(jacobian));
  const expected = extrapolatedSeparation.map(
    (component) => (scale * component) / extrapolatedDistance,
  );

  closeTo(ledger.self[0].radial, expected[0], 2e-11);
  closeTo(ledger.self[0].tangential, expected[1], 2e-11);
});

test("the former emission-site candidates fail alternative-line acceleration balance", () => {
  const formerCandidates = [
    [3.070356625390253, 0.1986630539600795, -0.33509898165834867],
    [6.218454963409138, 0.1969175233348653, -0.12710861412060762],
    [9.376436028216506, 0.18815540194608202, -0.07428630687174287],
  ];

  for (const [beta, radial, tangential] of formerCandidates) {
    const emissionSiteAssessment = assessCircularBalance(beta);
    assert.equal(emissionSiteAssessment.equilibrium, true);
    assert.equal(
      emissionSiteAssessment.stabilityStatus,
      "eligible-for-history-space-stability-analysis",
    );

    const assessment = assessCircularBalance(beta, {
      lineOfAction:
        LINE_OF_ACTION.INERTIALLY_EXTRAPOLATED_EMISSION_SITE,
    });
    closeTo(assessment.radial, radial, 2e-10);
    closeTo(assessment.tangential, tangential, 2e-10);
    assert.equal(assessment.radialInward, false);
    assert.equal(assessment.equilibrium, false);
    assert.equal(
      assessment.stabilityStatus,
      "not-an-equilibrium-no-stability-spectrum",
    );
  }
});

test("alternative-line tangential zeros through beta=20 all have outward radial acceleration", () => {
  const lineOfAction =
    LINE_OF_ACTION.INERTIALLY_EXTRAPOLATED_EMISSION_SITE;
  const scan = scanLedger({
    maxBeta: 20,
    samplesPerInterval: 2400,
    ledgerName: "fullCircular",
    lineOfAction,
  });
  const expectedBetas = [
    3.225396098935436,
    6.22263796120129,
    9.376926090187187,
    12.528726796127465,
    15.677221438449457,
    18.823658189124366,
  ];

  assert.equal(scan.zeros.length, expectedBetas.length);
  scan.zeros.forEach((zero, index) => {
    closeTo(zero.beta, expectedBetas[index], 2e-9);
    assert.ok(zero.radial > 0);
    const assessment = assessCircularBalance(zero.beta, { lineOfAction });
    assert.equal(assessment.equilibrium, false);
    assert.equal(
      assessment.stabilityStatus,
      "not-an-equilibrium-no-stability-spectrum",
    );
  });
});
