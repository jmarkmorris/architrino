import fs from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

import {
  COINCIDENT_AXIS_THREE_BINARY_COMPLETE_CYCLE_PROBE_PROTOCOL_SCHEMA,
  buildCoincidentAxisThreeBinaryFixedInternalEventAnalysisProtocol,
  buildCoincidentAxisThreeBinarySurfaceEventAnalysisProtocol,
  createCoincidentAxisThreeBinaryCapAngleSensitivityStencil,
  createGaussLegendreNodesAndWeights,
  createPeriodicCycleTimes,
  createSphericalProductQuadrature,
  summarizeCoincidentAxisThreeBinaryCompleteCycleProbeProtocol,
  validateCoincidentAxisThreeBinaryCompleteCycleProbeProtocol,
} from "../src/prescribed-path-analysis/index.mjs";

const protocolPath = new URL(
  "../src/prescribed-path-analysis/protocols/coincident-axis-three-binary-complete-cycle-probe-protocol.v1.json",
  import.meta.url,
);

function loadProtocol() {
  return JSON.parse(fs.readFileSync(protocolPath, "utf8"));
}

function assertNear(actual, expected, tolerance = 2e-13) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `expected ${actual} to be within ${tolerance} of ${expected}`,
  );
}

test("declared coincident-axis three-binary protocol covers one complete retained-history cycle and fixes event counts", () => {
  const protocol = validateCoincidentAxisThreeBinaryCompleteCycleProbeProtocol(loadProtocol());
  const summary = summarizeCoincidentAxisThreeBinaryCompleteCycleProbeProtocol(protocol);

  assert.equal(protocol.schema, COINCIDENT_AXIS_THREE_BINARY_COMPLETE_CYCLE_PROBE_PROTOCOL_SCHEMA);
  assert.equal(protocol.applicability.configurationKind, "coincident-axis-three-binary");
  assert.equal(protocol.applicability.acceptedScientificIdentities.length, 4);
  assert.equal(
    protocol.applicability.acceptedScientificIdentities.every(
      (identity) => identity.assemblyId.startsWith("asm-") &&
        /^[0-9a-f]{64}$/u.test(identity.modelRevisionSha256),
    ),
    true,
  );
  assert.deepEqual(protocol.enclosingSurfaces.radii, [0.75, 1, 1.5, 2]);
  assert.equal(summary.primary.surfaceDirectionCount, 12 * 24);
  assert.equal(summary.primary.surfaceEventCount, 4 * 12 * 24 * 64);
  assert.equal(summary.refined.surfaceEventCount, 4 * 18 * 36 * 128);
  assert.equal(summary.primary.internalFixedProbeCount, 125);
  assert.equal(summary.primary.endpointReceiverCount, 6);
  assert.equal(
    summary.implementedByCurrentEvaluator.fullCycleCausalWakeFluxReduction,
    true,
  );
  assert.equal(
    summary.implementedByCurrentEvaluator.frequencyResolvedCausalWakeFluxReduction,
    true,
  );
  assert.equal(
    protocol.causalWakeFluxReduction.claimBoundary,
    "causal-wake measure only; not energy, potential, work, or leakage",
  );

  // Independent causal reach bound: T_t >= T - (R_surface + R_source)/c_f.
  const earliestPossibleEmission = 4 - (2 + 0.5) / 1;
  assert.equal(earliestPossibleEmission, 1.5);
  assert.equal(summary.conservativeRetardedHistoryMargin, 1.5);
  assert.ok(earliestPossibleEmission >= protocol.eventEvaluator.history.start);
  assert.equal(protocol.completeCycle.start + protocol.completeCycle.period, 8);
  assert.equal(protocol.eventEvaluator.history.end, 8);
});

test("Gauss-Legendre construction satisfies independently known polynomial moments", () => {
  const { nodes, weights } = createGaussLegendreNodesAndWeights(12);
  for (let exponent = 0; exponent <= 23; exponent += 1) {
    const quadrature = nodes.reduce(
      (sum, node, index) => sum + weights[index] * node ** exponent,
      0,
    );
    const closedForm = exponent % 2 === 0 ? 2 / (exponent + 1) : 0;
    assertNear(quadrature, closedForm, 8e-13);
  }
});

test("surface quadrature reproduces sphere area and symmetry-protected Cartesian moments", () => {
  const grid = createSphericalProductQuadrature({ polarOrder: 12, azimuthCount: 24 });
  const area = grid.reduce((sum, row) => sum + row.solidAngleWeight, 0);
  const firstMoment = grid.reduce((sum, row) => ({
    x: sum.x + row.solidAngleWeight * row.unitVector.x,
    y: sum.y + row.solidAngleWeight * row.unitVector.y,
    z: sum.z + row.solidAngleWeight * row.unitVector.z,
  }), { x: 0, y: 0, z: 0 });
  const secondMomentX = grid.reduce(
    (sum, row) => sum + row.solidAngleWeight * row.unitVector.x ** 2,
    0,
  );

  assertNear(area, 4 * Math.PI, 2e-13);
  assertNear(firstMoment.x, 0);
  assertNear(firstMoment.y, 0);
  assertNear(firstMoment.z, 0);
  assertNear(secondMomentX, 4 * Math.PI / 3, 2e-13);
});

test("complete-cycle grid independently separates all retained DFT harmonics", () => {
  const count = 64;
  const times = createPeriodicCycleTimes({ start: 4, period: 4, sampleCount: count });
  assert.equal(times.length, count);
  assert.equal(times[0], 4);
  assert.equal(times.at(-1), 4 + 4 * 63 / 64);
  assert.ok(times.at(-1) < 8);

  for (let harmonic = 1; harmonic <= 16; harmonic += 1) {
    const coefficient = times.reduce((sum, time) => {
      const phase = -2 * Math.PI * harmonic * (time - 4) / 4;
      return {
        real: sum.real + Math.cos(phase) / count,
        imaginary: sum.imaginary + Math.sin(phase) / count,
      };
    }, { real: 0, imaginary: 0 });
    assertNear(coefficient.real, 0, 3e-15);
    assertNear(coefficient.imaginary, 0, 3e-15);
  }
});

test("surface expansion is a valid canonical event protocol with exact declared coordinates", () => {
  const eventProtocol = buildCoincidentAxisThreeBinarySurfaceEventAnalysisProtocol(loadProtocol(), {
    radius: 1.5,
    resolution: "primary",
  });
  assert.equal(eventProtocol.probes.length, 288);
  assert.equal(eventProtocol.probes[0].observationTimes.length, 64);
  assert.deepEqual(eventProtocol.probes[0].polarities, [1, -1]);
  for (const probe of eventProtocol.probes) {
    const radius = Math.hypot(probe.position.x, probe.position.y, probe.position.z);
    assertNear(radius, 1.5, 4e-15);
  }
});

test("fixed internal expansion retains the complete cycle and both probe polarities", () => {
  const eventProtocol = buildCoincidentAxisThreeBinaryFixedInternalEventAnalysisProtocol(loadProtocol());
  assert.equal(eventProtocol.probes.length, 125);
  assert.deepEqual(eventProtocol.probes[62].position, { x: 0, y: 0, z: 0 });
  assert.deepEqual(eventProtocol.probes[62].polarities, [1, -1]);
  assert.equal(eventProtocol.probes[62].observationTimes.length, 64);
});

test("cap-angle stencils exactly differentiate a separately authored quadratic case", () => {
  const domain = [0, Math.PI / 2];
  const step = Math.PI / 512;
  for (const value of [0, 0.7, Math.PI / 2]) {
    const stencil = createCoincidentAxisThreeBinaryCapAngleSensitivityStencil({ value, domain, step });
    const derivative = stencil.coordinates.reduce(
      (sum, coordinate, index) => sum + stencil.weights[index] * (3 * coordinate ** 2 + 2 * coordinate + 7),
      0,
    );
    assertNear(derivative, 6 * value + 2, 2e-11);
  }
});

test("protocol validation does not advance on surface/history and resolution defects", () => {
  const insideEnvelope = loadProtocol();
  insideEnvelope.enclosingSurfaces.radii[0] = 0.5;
  assert.throws(
    () => validateCoincidentAxisThreeBinaryCompleteCycleProbeProtocol(insideEnvelope),
    /must exceed the source envelope radius/,
  );

  const shortHistory = loadProtocol();
  shortHistory.completeCycle.start = 2;
  assert.throws(
    () => validateCoincidentAxisThreeBinaryCompleteCycleProbeProtocol(shortHistory),
    /history does not cover/,
  );

  const aliasedSpectrum = loadProtocol();
  aliasedSpectrum.spectralReduction.maximumHarmonic = 32;
  assert.throws(
    () => validateCoincidentAxisThreeBinaryCompleteCycleProbeProtocol(aliasedSpectrum),
    /Nyquist margin/,
  );

  const relabeledAsEnergy = loadProtocol();
  relabeledAsEnergy.causalWakeFluxReduction.normalProjection = "energy-flux.v1";
  assert.throws(
    () => validateCoincidentAxisThreeBinaryCompleteCycleProbeProtocol(relabeledAsEnergy),
    /must bind the declared full-cycle formulas/,
  );

  const discardedSourceTags = loadProtocol();
  discardedSourceTags.causalWakeFluxReduction.frequencyResolved.transmitterRootTag =
    "discard-before-superposition.v1";
  assert.throws(
    () => validateCoincidentAxisThreeBinaryCompleteCycleProbeProtocol(discardedSourceTags),
    /must bind the declared coefficient formulas/,
  );
});

test("protocol validation rejects exact scientific identity drift", () => {
  const drifted = loadProtocol();
  drifted.applicability.acceptedScientificIdentities[0].assemblyId =
    "asm-00000000000000000000000000000000";
  assert.throws(
    () => validateCoincidentAxisThreeBinaryCompleteCycleProbeProtocol(drifted),
    /four accepted exact scientific identities/u,
  );
});
