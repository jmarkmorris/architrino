import assert from "node:assert/strict";
import { test } from "node:test";
import { describeAssemblyRadii } from "../src/apps/borg/library/BorgLibraryRadii.mjs";

// Independent controls: Euclidean norm identities and specified polynomials,
// not recorded output or calls to the production worldline evaluator. c_f=1.
const origin = { centerAtEpoch: [0, 0, 0], velocity: [0, 0, 0] };
const window = { start: 0, end: 1 };
const classify = (operators, placement = origin, interval = window) => describeAssemblyRadii({
  geometry: { assemblyPlacement: placement }, worldlines: operators.map((operator) => ({ operator })),
}, interval);
const circle = (height, radius, extra = {}) => ({ kind: "moving-circular.v1", centerAtEpoch: [0, 0, height], centerVelocity: [0, 0, 0], radiusU: [radius, 0, 0], radiusV: [0, radius, 0], phaseAtEpoch: 0, angularVelocity: 1, angularAcceleration: 0, ...extra });
const breathing = (base, amplitude = 0, angularFrequency = 1, phase = 0) => ({ base, amplitude, angularFrequency, phase });
const harmonic = (axial, radial, extra = {}) => ({ kind: "f6c-harmonic-member.v1", assemblyCenterAtEpoch: [0, 0, 0], assemblyVelocity: [0, 0, 0], axis: [0, 0, 1], transverseU: [1, 0, 0], transverseV: [0, 1, 0], axial, radial, ...extra });
const linear = (positionAtEpoch, velocity) => ({ kind: "inertial.v1", positionAtEpoch, velocity, epochTime: 0 });

test("assembly radius includes circle-center displacement, not just orbit radius", () => {
  // 3²+4² = 0²+5² = 25 despite different orbit radii.
  assert.equal(classify([circle(3, 4), circle(0, 5)]).value, "iso");
  // Same orbit radius 4, but assembly radii 5 and 4.
  const unequal = classify([circle(3, 4), circle(0, 4)]);
  assert.equal(unequal.value, "hetero");
  assert.deepEqual(unequal.witness, { time: 0, min: 4, max: 5 });
  assert.equal(classify([circle(3, 4, { angularAcceleration: 2 }), circle(0, 5)]).value, "iso");
});

test("assembly translation and a distinct epoch preserve relative radii", () => {
  const placement = { centerAtEpoch: [10, 20, 30], velocity: [1, 2, 3], epochTime: 2 };
  const one = circle(3, 4, { centerAtEpoch: [8, 16, 27], centerVelocity: [1, 2, 3], epochTime: 0 });
  const two = circle(0, 5, { centerAtEpoch: [11, 22, 33], centerVelocity: [1, 2, 3], epochTime: 3 });
  assert.equal(classify([one, two], placement, { start: 4, end: 7 }).value, "iso");
});

test("a circle displaced sideways has phase-dependent assembly radius", () => {
  // First squared radius = 2+2cos(T), second = 4. Equal only at T=0.
  const result = classify([circle(0, 1, { centerAtEpoch: [1, 0, 0] }), circle(0, 2)]);
  assert.equal(result.value, "hetero");
  assert.ok(result.witness.time > 0);
  assert.ok(result.witness.min < result.witness.max);
  assert.equal(classify([circle(0, 1, { centerAtEpoch: [1, 0, 0], angularAcceleration: 1 }), circle(0, 2)]).value, "unavailable");
});

test("common breathing is iso, unequal sectors become hetero after an equal first frame", () => {
  const a = harmonic(breathing(1), breathing(1, .2));
  assert.equal(classify([a, structuredClone(a)]).value, "iso");
  const b = harmonic(breathing(1), breathing(1, -.1));
  const result = classify([a, b]);
  assert.equal(result.value, "hetero");
  assert.ok(result.witness.time > 0);
  const t = result.witness.time;
  assert.ok(Math.abs(result.witness.max - Math.hypot(1, 1 + .2 * Math.sin(t))) < 1e-12);
  assert.ok(Math.abs(result.witness.min - Math.hypot(1, 1 - .1 * Math.sin(t))) < 1e-12);
});

test("harmonic coefficient comparison includes phases, negative rates, epochs and cancellation", () => {
  // sin²(T)+cos²(T)=1 even though the component functions differ.
  assert.equal(classify([
    harmonic(breathing(0, 1), breathing(0, 1, 1, Math.PI / 2)),
    harmonic(breathing(0), breathing(1)),
  ]).value, "iso");
  const a = harmonic(breathing(1), breathing(2, .1, 2, .4));
  const b = harmonic(breathing(1), breathing(2, -.1, -2, -.4));
  assert.equal(classify([a, b]).value, "iso");
  const shifted = harmonic(breathing(1), breathing(2, .1, 2, 2.4), { epochTime: 1 });
  assert.equal(classify([a, shifted], origin, { start: 3, end: 5 }).value, "iso");
  assert.equal(classify([harmonic(breathing(1), breathing(2, .1, 0, Math.PI / 2)), harmonic(breathing(1), breathing(2.1))]).value, "iso");
});

test("linear radius polynomials distinguish equality at one instant from equality over time", () => {
  assert.equal(classify([linear([1, 0, 0], [1, 0, 0]), linear([-1, 0, 0], [-1, 0, 0])]).value, "iso");
  const result = classify([linear([1, 0, 0], [1, 0, 0]), linear([-1, 0, 0], [0, 0, 0])]);
  assert.equal(result.value, "hetero");
  assert.ok(result.witness.time > 0);
  assert.equal(classify([{ kind: "stationary.v1", position: [1, 0, 0] }, { kind: "stationary.v1", position: [0, 1, 0] }]).value, "iso");
});

test("F5 radius follows orthogonal axial and selected ring parts", () => {
  const a = { kind: "f5-phase-varying-member.v1", assemblyCenter: [0, 0, 0], bodyAxes: [[1, 0, 0], [0, 1, 0], [0, 0, 1]], axialHalfSeparation: 3, transverseRadii: [4, 0], ringIndex: 1 };
  const result = classify([a, { ...a, ringIndex: 2 }]);
  assert.equal(result.value, "hetero");
  assert.deepEqual(result.witness, { time: 0, min: 3, max: 5 });
});

test("sampled agreement cannot establish iso-radii", () => {
  // Every one of the 17 probe times has sin(32pi T)=0. The functions still
  // differ between probes, so the coefficient test must refuse iso.
  const result = classify([harmonic(breathing(0), breathing(1, .1, 32 * Math.PI)), harmonic(breathing(0), breathing(1))]);
  assert.equal(result.value, "unavailable");
});

test("missing centers, unsupported paths, malformed bases and invalid windows fail closed", () => {
  assert.equal(describeAssemblyRadii({ worldlines: [{ operator: circle(0, 1) }] }, window).value, "unavailable");
  assert.equal(classify([{ kind: "future.v1" }]).value, "unavailable");
  assert.equal(classify([null]).value, "unavailable");
  assert.equal(classify([circle(0, 1, { radiusV: [1, 0, 0] })]).value, "unavailable");
  assert.equal(classify([circle(0, 1)], origin, { start: 1, end: 1 }).value, "unavailable");
  assert.equal(classify([linear([1, 0, 0], [1, 0, 0])], origin, { start: 0, end: 1e308 }).value, "unavailable");
});
