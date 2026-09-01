import assert from "node:assert/strict";
import { test } from "node:test";
import { describeBorgCircleOccupancy } from "../src/apps/borg/BorgOrbitGeometry.mjs";
import { describeBorgOrbitTrails } from "../src/apps/borg/BorgOrbitTrails.mjs";

// Independent geometric controls, c_f=1. A unit circle is determined by its
// center, radius and plane, not its phase, angular rate or occupants' polarity.
const circle = (overrides = {}) => ({ kind: "moving-circular.v1", epochTime: 0,
  centerAtEpoch: [0, 0, 0], centerVelocity: [0, 0, 0], radiusU: [1, 0, 0], radiusV: [0, 1, 0],
  angularVelocity: 1, angularAcceleration: 0, phaseAtEpoch: 0, ...overrides });
function dataset(...operators) {
  const worldlines = operators.map((operator, i) => ({ id: String(i), constituentId: `member-${i}`, operator }));
  return { provenance: { engineId: "prescribed-geometry", fieldSpeed: 1, prescribedGeometry: { coordinates: { worldlines } } },
    window: { start: 0, end: 2*Math.PI }, worldlines: worldlines.map(({ id }) => ({ id, polarity: 1 })) };
}
const value = (...ops) => describeBorgCircleOccupancy(dataset(...ops)).value;

test("circle occupancy ignores phase, rate, circulation, polarity and binary declarations", () => {
  for (const variation of [{ phaseAtEpoch: .37 }, { angularVelocity: 2 }, { angularVelocity: -1 }, { angularAcceleration: .2 }]) {
    const data = dataset(circle(), circle(variation));
    assert.equal(describeBorgCircleOccupancy(data).value, "multiple");
    assert.ok([...describeBorgOrbitTrails(data).values()].every((r) => r.mode === "unavailable"), "geometric occupancy does not authorize half-turn tails");
  }
  assert.deepEqual(describeBorgCircleOccupancy(dataset(circle(), circle(), circle())).groups, [["0", "1", "2"]]);
});

test("occupancy distinguishes one, multiple, and mixed circle classes", () => {
  const other = circle({ centerAtEpoch: [0, 0, 2] });
  assert.equal(value(circle(), other), "one");
  assert.equal(value(circle()), "one");
  assert.equal(value(circle(), circle(), other), "mixed");
  assert.equal(value(circle(), circle(), other, other), "multiple");
  assert.deepEqual(describeBorgCircleOccupancy(dataset(circle(), circle(), other)).groups, [["0", "1"], ["2"]]);
});

test("basis and epoch changes preserve a track; congruent and crossing circles do not merge", () => {
  assert.equal(value(circle(), circle({ radiusU: [0, 1, 0], radiusV: [1, 0, 0] })), "multiple");
  const speed = [1, 0, 0];
  assert.equal(value(circle({ centerVelocity: speed }), circle({ centerVelocity: speed, epochTime: 2, centerAtEpoch: [2, 0, 0] })), "multiple");
  // XY and XZ circles cross at (+/-1,0,0), but have different tracks.
  assert.equal(value(circle(), circle({ radiusV: [0, 0, 1] })), "one");
  assert.equal(value(circle(), circle({ centerAtEpoch: [1, 0, 0] })), "one");
  assert.equal(value(circle(), circle({ radiusU: [2, 0, 0], radiusV: [0, 2, 0] })), "one");
  assert.equal(value(circle(), circle({ centerVelocity: speed })), "unavailable");
});

test("missing, duplicate, malformed, non-orbital and ambiguous tracks fail closed", () => {
  const missing = dataset(circle(), circle());
  missing.provenance.prescribedGeometry.coordinates.worldlines.pop();
  assert.equal(describeBorgCircleOccupancy(missing).value, "unavailable");
  const duplicate = dataset(circle(), circle());
  duplicate.provenance.prescribedGeometry.coordinates.worldlines[1].id = "0";
  assert.equal(describeBorgCircleOccupancy(duplicate).value, "unavailable");
  const malformed = dataset(circle());
  malformed.provenance.prescribedGeometry.coordinates.worldlines[0] = null;
  assert.equal(describeBorgCircleOccupancy(malformed).value, "unavailable");
  for (const op of [{ kind: "future-orbit.v1" }, circle({ radiusU: [NaN, 0, 0] }), circle({ angularVelocity: 0 }),
    circle({ radiusU: [1e-12, 0, 0], radiusV: [0, 2e-12, 0] })]) assert.equal(value(circle(), op), "unavailable");
  const linear = { kind: "sd3-centered-linear-member.v1", positionAtEpoch: [0, 0, 0], velocity: [1, 0, 0] };
  assert.match(describeBorgCircleOccupancy(dataset(linear)).reason, /noncircular or unsupported/);
  assert.equal(value(circle(), linear), "unavailable");
  // A~B and B~C but A!~C must not become a three-occupant shared group.
  const near = [0, .75e-10, 1.5e-10].map((x) => circle({ centerAtEpoch: [x, 0, 0] }));
  for (const ordering of [near, [near[1], near[0], near[2]]]) assert.equal(value(...ordering), "unavailable");
});

const harmonic = (polarity) => ({ kind: "f6c-harmonic-member.v1", epochTime: 0,
  assemblyCenterAtEpoch: [0, 0, 0], assemblyVelocity: [0, 0, 0], axis: [0, 0, 1],
  transverseU: [1, 0, 0], transverseV: [0, 1, 0], polarity, circulationSign: 1, phaseOffset: 0,
  axial: { base: 2, amplitude: .2, angularFrequency: 1, phase: 0 },
  radial: { base: 1, amplitude: .1, angularFrequency: 1, phase: 0 },
  phase: { offset: 0, rate: 1, modulationAmplitude: 0 } });

test("noncircular and mixed circular-noncircular inventories remain unassigned", () => {
  assert.equal(value(harmonic(1), harmonic(-1)), "unavailable");
  assert.equal(value(harmonic(1), harmonic(1)), "unavailable");
  assert.equal(value(circle(), circle(), harmonic(1)), "unavailable");
  const broken = harmonic(1); delete broken.axial;
  assert.equal(value(broken), "unavailable");
});

test("circle occupancy does not infer circles reconstructed by another operator kind", () => {
  const f5 = { kind: "f5-phase-varying-member.v1", assemblyCenter: [0, 0, 0],
    bodyAxes: [[1, 0, 0], [0, 1, 0], [0, 0, 1]], axisIndex: 2, ringIndex: 1,
    polarity: 1, branchSign: -1, axialHalfSeparation: 2, transverseRadii: [1, .75],
    resultantAmplitude: .8, resultantAngularFrequency: 1 };
  assert.equal(value(f5, circle({ centerAtEpoch: [0, 0, 2] })), "unavailable");
  assert.equal(value(f5, { ...f5, ringIndex: 2 }), "unavailable");
  assert.equal(value(f5, { ...f5, resultantAmplitude: 0 }), "unavailable");
});
