import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";

test("F6c identity-return group has two proper phase actions", () => {
  const result = spawnSync(
    process.execPath,
    ["scripts/mapping-electromagnetism/f6c-identity-return-group.mjs"],
    { encoding: "utf8" },
  );
  assert.equal(result.status, 0, result.stderr);
  const packet = JSON.parse(result.stdout);
  assert.deepEqual(packet.summary, {
    coordinateOrthogonalTetrahedralSymmetries: 24,
    f6cChartPreservingSymmetries: 8,
    properF6cChartPreservingRotations: 4,
    improperF6cChartPreservingMaps: 4,
    distinctProperPhaseActions: 2,
  });

  const actions = new Set(packet.properReturnActions.map((row) =>
    JSON.stringify([
      row.phaseAction.positive.slope,
      row.phaseAction.positive.offsetPiFraction,
      row.phaseAction.negative.slope,
      row.phaseAction.negative.offsetPiFraction,
    ])));
  assert.deepEqual(actions, new Set([
    JSON.stringify([1, { numerator: 0, denominator: 1 },
      1, { numerator: 0, denominator: 1 }]),
    JSON.stringify([-1, { numerator: -1, denominator: 3 },
      -1, { numerator: 1, denominator: 3 }]),
  ]));

  const direct = packet.properReturnActions.filter(
    (row) => row.phaseAction.positive.slope === 1,
  );
  const reflected = packet.properReturnActions.filter(
    (row) => row.phaseAction.positive.slope === -1,
  );
  assert.equal(direct.length, 2);
  assert.equal(reflected.length, 2);
  assert.ok(direct.every((row) =>
    row.phaseActionOrder === 1
      && row.currentAxisMultiplier === 1
      && row.observableReturnOrders.orientationQuotientedScalarShape === 1
      && row.observableReturnOrders.sectorCadence === 1
      && row.observableReturnOrders.axialCurrent === 1));
  assert.ok(reflected.every((row) =>
    row.phaseActionOrder === 2
      && row.currentAxisMultiplier === -1
      && row.observableReturnOrders.orientationQuotientedScalarShape === 1
      && row.observableReturnOrders.sectorCadence === 2
      && row.observableReturnOrders.axialCurrent === 2));
});
