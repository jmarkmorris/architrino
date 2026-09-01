import fs from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

import {
  EXACT_PRESCRIBED_SOURCE_RECORD_SCHEMA,
  computeCoincidentAxisThreeBinaryRadialScalingRows,
  evaluateCoincidentAxisThreeBinaryStreamingSurfaceReductions,
  evaluatePrescribedRecordAnalysis,
  evaluateRealSphericalHarmonic,
  reduceCoincidentAxisThreeBinarySurfaceSampleGrid,
  sha256Canonical,
  validateCoincidentAxisThreeBinaryCompleteCycleProbeProtocol,
} from "../src/prescribed-path-analysis/index.mjs";

const protocolPath = new URL(
  "../src/prescribed-path-analysis/protocols/coincident-axis-three-binary-complete-cycle-probe-protocol.v1.json",
  import.meta.url,
);

function compactProtocol() {
  const protocol = JSON.parse(fs.readFileSync(protocolPath, "utf8"));
  protocol.completeCycle.primary = { timeSamples: 16, polarOrder: 6, azimuthCount: 12 };
  protocol.completeCycle.refined = { timeSamples: 24, polarOrder: 8, azimuthCount: 16 };
  protocol.angularReduction.maximumDegree = 2;
  protocol.spectralReduction.maximumHarmonic = 3;
  return validateCoincidentAxisThreeBinaryCompleteCycleProbeProtocol(protocol);
}

function near(actual, expected, tolerance = 2e-11) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `expected ${actual} to be within ${tolerance} of ${expected}`,
  );
}

function scaled(vector, scalar) {
  return {
    x: vector.x * scalar,
    y: vector.y * scalar,
    z: vector.z * scalar,
  };
}

function sample({
  direction,
  signedWake,
  unsignedWake,
  amplitude,
  eventId,
  normalWakeFluxContributions = null,
}) {
  const positive = scaled(direction.unitVector, amplitude);
  const negative = scaled(positive, -1);
  const transmitterRootContributions = normalWakeFluxContributions ?? [
    {
      transmitterRootId: "synthetic-positive:root-0",
      transmitterId: "synthetic-positive",
      rootOrdinal: 0,
      signed: (unsignedWake + signedWake) / 2,
    },
    {
      transmitterRootId: "synthetic-negative:root-0",
      transmitterId: "synthetic-negative",
      rootOrdinal: 0,
      signed: (signedWake - unsignedWake) / 2,
    },
  ];
  return {
    eventId,
    signedWake,
    unsignedWake,
    normalWakeFluxDensity: {
      signed: signedWake,
      raw: unsignedWake,
      transmitterRootContributions,
    },
    probeAccelerations: { "1": positive, "-1": negative },
    rawAccelerationMagnitudeSums: { "1": Math.abs(amplitude), "-1": Math.abs(amplitude) },
  };
}

function staticSixSourceRecord() {
  const positions = [
    [-0.3, 0, 0], [0.3, 0, 0], [0, -0.3, 0],
    [0, 0.3, 0], [0, 0, -0.3], [0, 0, 0.3],
  ];
  return {
    schema: EXACT_PRESCRIBED_SOURCE_RECORD_SCHEMA,
    recordId: "coincident-axis-three-binary-streaming-independent-static-six-source",
    assemblyId: "asm-02d73c88ccf8244e6873d2ee2cd58973",
    modelRevisionSha256:
      "02d73c88ccf8244e6873d2ee2cd58973dc35d2475df102173726563210a39c27",
    sourceSchema: "independent-static-six-source.v1",
    engineId: "prescribed-geometry",
    engineVersion: "independent-test-fixture.v1",
    claimGrade: "derived",
    evidenceStatus: "test-fixture",
    history: { start: 0, end: 8 },
    sources: positions.map(([x, y, z], index) => ({
      id: `static-${index}`,
      charge: index % 2 === 0 ? 1 : -1,
      trajectory: {
        kind: "moving-circular.v1",
        epochTime: 0,
        centerAtEpoch: { x, y, z },
        centerVelocity: { x: 0, y: 0, z: 0 },
        radiusU: { x: 0, y: 0, z: 0 },
        radiusV: { x: 0, y: 0, z: 0 },
        angularVelocity: 0,
        angularAcceleration: 0,
        phaseAtEpoch: 0,
      },
    })),
  };
}

function rehashPacket(packet) {
  const withoutHash = { ...packet };
  delete withoutHash.resultHash;
  packet.resultHash = sha256Canonical(withoutHash);
  return packet;
}

test("independent static closed form fixes exposure, wake norm, monopole power, and radial exponents", () => {
  const protocol = compactProtocol();
  const surfaces = protocol.enclosingSurfaces.radii.map((radius) =>
    reduceCoincidentAxisThreeBinarySurfaceSampleGrid({
      completeCycleProtocol: protocol,
      radius,
      sampleAt: ({ direction, timeIndex, directionIndex }) => sample({
        direction,
        signedWake: 3 / radius ** 2,
        unsignedWake: 5 / radius ** 2,
        amplitude: 2 / radius ** 2,
        eventId: `static-${radius}-${timeIndex}-${directionIndex}`,
      }),
    }));

  for (const surface of surfaces) {
    const expectedExposure = 4 * Math.PI * 4 / surface.radius ** 2;
    surface.exposures.forEach((row) => {
      near(row.L_ext, expectedExposure, 2e-10);
      near(row.L_raw, expectedExposure, 2e-10);
      near(row.eta_ext, 1, 2e-14);
    });
    near(surface.wakeSurfaceNorms.signedWake, Math.sqrt(4 * Math.PI) * 3 / surface.radius);
    near(surface.wakeSurfaceNorms.unsignedWake, Math.sqrt(4 * Math.PI) * 5 / surface.radius);
    near(surface.wakeFlux.signedCycleIntegral, 4 * 4 * Math.PI * 3, 3e-10);
    near(surface.wakeFlux.rawCycleIntegral, 4 * 4 * Math.PI * 5, 3e-10);
    near(surface.wakeFlux.residualCycleIntegral, 4 * 4 * Math.PI * 3, 3e-10);
    near(surface.wakeFlux.etaWakeFlux, 3 / 5, 2e-14);
    assert.equal(surface.wakeFlux.rawEmissionReference, null);
    const signedMonopole = surface.angularPowerRows.find(
      (row) => row.channel === "signedWake" && row.degree === 0,
    );
    near(signedMonopole.power, 4 * Math.PI * (3 / surface.radius ** 2) ** 2, 3e-10);
    const signedAnisotropy = surface.anisotropyRows.find((row) => row.channel === "signedWake");
    near(signedAnisotropy.nonMonopolePowerFraction, 0, 2e-27);
  }

  const radialRows = computeCoincidentAxisThreeBinaryRadialScalingRows(surfaces);
  near(radialRows.find((row) => row.measureId === "L_ext/probe-polarity-1").global.exponent, 2);
  near(radialRows.find((row) => row.measureId === "signed-wake-surface-norm").global.exponent, 1);
  near(radialRows.find(
    (row) => row.measureId === "angular-power/signedWake/degree-0",
  ).global.exponent, 4);
});

test("independent static-source evaluation fixes the full-cycle raw wake flux at every radius", () => {
  const protocol = compactProtocol();
  const packet = evaluateCoincidentAxisThreeBinaryStreamingSurfaceReductions({
    sourceRecord: staticSixSourceRecord(),
    completeCycleProtocol: protocol,
  });

  assert.equal(packet.excludedClaims.includes("energy"), true);
  for (const surface of packet.diagnosticReductions.surface.primary) {
    near(surface.wakeFlux.rawCycleIntegral, 24, 3e-4);
    near(surface.wakeFlux.signedCycleIntegral, 0, 2e-10);
    assert.equal(surface.wakeFlux.rawEmissionReference.expectedCycleIntegral, 24);
    assert.equal(surface.wakeFlux.rawEmissionReference.passed, true);
    assert.equal(surface.wakeFlux.signedEmissionReference.expectedCycleIntegral, 0);
    assert.equal(surface.wakeFlux.signedEmissionReference.passed, true);
    assert.match(surface.wakeFlux.claimBoundary, /not energy/);
  }
  assert.equal(
    packet.convergenceComparisons.quadrature.gates.causalWakeFlux.passed,
    true,
  );
  assert.equal(
    packet.convergenceComparisons.quadrature.gates.rawEmissionReference.passed,
    true,
  );
  assert.equal(
    packet.convergenceComparisons.quadrature.gates.frequencyResolvedWakeFlux.passed,
    true,
  );
  assert.equal(
    packet.convergenceComparisons.quadrature.gates.frequencyResolvedWakeFluxBandCoverage.passed,
    true,
  );
});

test("compact surface evidence preserves reduced scores without raw packet identities", () => {
  const protocol = compactProtocol();
  const sourceRecord = staticSixSourceRecord();
  const full = evaluateCoincidentAxisThreeBinaryStreamingSurfaceReductions({
    sourceRecord,
    completeCycleProtocol: protocol,
  });
  const compact = evaluateCoincidentAxisThreeBinaryStreamingSurfaceReductions({
    sourceRecord,
    completeCycleProtocol: protocol,
    evidenceMode: "compact",
  });

  const metricOnly = (value) => JSON.parse(JSON.stringify(value, (key, row) =>
    [
      "eventProtocolHash",
      "eventResultHash",
      "rawCausalRootLedgerHash",
      "numericalConvergenceLedgerHash",
      "evidenceMode",
    ].includes(key)
      ? undefined
      : row));
  assert.deepEqual(
    metricOnly(compact.diagnosticReductions),
    metricOnly(full.diagnosticReductions),
  );
  assert.deepEqual(compact.convergenceComparisons, full.convergenceComparisons);
  assert.deepEqual(compact.reducedMeasures, full.reducedMeasures);
  assert.equal(compact.reducer.evidenceMode, "compact");
  assert.ok(compact.surfaceEvaluations.every((row) =>
    row.eventProtocolHash === null &&
    row.eventResultHash === null &&
    row.rawCausalRootLedgerHash === null &&
    row.numericalConvergenceLedgerHash === null));
});

test("streaming reduction rejects a source outside the exact coincident-axis identity set", () => {
  const sourceRecord = staticSixSourceRecord();
  sourceRecord.assemblyId = "asm-00000000000000000000000000000000";
  sourceRecord.modelRevisionSha256 = "0".repeat(64);
  assert.throws(
    () => evaluateCoincidentAxisThreeBinaryStreamingSurfaceReductions({
      sourceRecord,
      completeCycleProtocol: compactProtocol(),
    }),
    /four exact scientific identities/u,
  );
});

test("symmetry-protected dipole occupies only the real l=1,m=0 angular channel", () => {
  const protocol = compactProtocol();
  const surface = reduceCoincidentAxisThreeBinarySurfaceSampleGrid({
    completeCycleProtocol: protocol,
    radius: 1,
    sampleAt: ({ direction, timeIndex, directionIndex }) => sample({
      direction,
      signedWake: direction.cosTheta,
      unsignedWake: 1,
      amplitude: 1,
      eventId: `dipole-${timeIndex}-${directionIndex}`,
    }),
  });
  const signedRows = surface.angularPowerRows.filter((row) => row.channel === "signedWake");
  near(signedRows.find((row) => row.degree === 0).power, 0, 2e-29);
  near(signedRows.find((row) => row.degree === 1).power, 4 * Math.PI / 3, 2e-11);
  near(signedRows.find((row) => row.degree === 2).power, 0, 2e-28);
  near(
    surface.anisotropyRows.find((row) => row.channel === "signedWake")
      .nonMonopolePowerFraction,
    1,
    2e-14,
  );

  near(evaluateRealSphericalHarmonic(0, 0, 0.2, 1.1), 1 / Math.sqrt(4 * Math.PI));
  near(evaluateRealSphericalHarmonic(1, 0, 0.2, 1.1), Math.sqrt(3 / (4 * Math.PI)) * 0.2);
});

test("closed-form complete-cycle Fourier rows recover authored cosine and sine amplitudes", () => {
  const protocol = compactProtocol();
  const surface = reduceCoincidentAxisThreeBinarySurfaceSampleGrid({
    completeCycleProtocol: protocol,
    radius: 1,
    sampleAt: ({ direction, timeIndex, directionIndex }) => {
      const phase = 2 * Math.PI * timeIndex / protocol.completeCycle.primary.timeSamples;
      const amplitude = 1 + 0.25 * Math.cos(2 * phase) + 0.5 * Math.sin(3 * phase);
      return sample({
        direction,
        signedWake: 1,
        unsignedWake: 1,
        amplitude,
        eventId: `fourier-${timeIndex}-${directionIndex}`,
      });
    },
  });
  const rows = surface.spectralCoefficientRows.filter((row) =>
    row.channel === "radialProbeAccelerationPositive" && row.degree === 0 && row.order === 0);
  const rootArea = Math.sqrt(4 * Math.PI);
  const harmonic0 = rows.find((row) => row.harmonic === 0);
  const harmonic2 = rows.find((row) => row.harmonic === 2);
  const harmonic3 = rows.find((row) => row.harmonic === 3);
  near(harmonic0.real, rootArea);
  near(harmonic0.imaginary, 0);
  near(harmonic2.real, 0.125 * rootArea);
  near(harmonic2.imaginary, 0);
  near(harmonic3.real, 0);
  near(harmonic3.imaginary, -0.25 * rootArea);
  const band = surface.spectralBandRows.find((row) =>
    row.channel === "radialProbeAccelerationPositive" && row.degree === null);
  near(band.parsevalResidual, 0, 2e-12);
});

test("transmitter-tagged normal wake-flux coefficients resolve frequency-selective cancellation", () => {
  const protocol = compactProtocol();
  const surface = reduceCoincidentAxisThreeBinarySurfaceSampleGrid({
    completeCycleProtocol: protocol,
    radius: 1,
    sampleAt: ({ direction, timeIndex, directionIndex }) => {
      const phase = 2 * Math.PI * timeIndex / protocol.completeCycle.primary.timeSamples;
      const sourceA = Math.cos(2 * phase) + 0.5 * Math.sin(3 * phase);
      const sourceB = -0.5 * Math.cos(2 * phase) + 0.125 * Math.sin(3 * phase);
      const signed = sourceA + sourceB;
      const raw = Math.abs(sourceA) + Math.abs(sourceB);
      return sample({
        direction,
        signedWake: signed,
        unsignedWake: raw,
        amplitude: 1,
        eventId: `wake-flux-fourier-${timeIndex}-${directionIndex}`,
        normalWakeFluxContributions: [
          {
            transmitterRootId: "source-a:root-0",
            transmitterId: "source-a",
            rootOrdinal: 0,
            signed: sourceA,
          },
          {
            transmitterRootId: "source-b:root-0",
            transmitterId: "source-b",
            rootOrdinal: 0,
            signed: sourceB,
          },
        ],
      });
    },
  });
  const rootArea = Math.sqrt(4 * Math.PI);
  const coefficient = (transmitterRootId, harmonic) =>
    surface.transmitterTaggedWakeFluxSpectralRows.find((row) =>
      row.transmitterRootId === transmitterRootId && row.degree === 0 && row.order === 0 &&
      row.harmonic === harmonic);
  near(coefficient("source-a:root-0", 2).real, 0.5 * rootArea, 3e-12);
  near(coefficient("source-b:root-0", 2).real, -0.25 * rootArea, 3e-12);
  near(coefficient("source-a:root-0", 3).imaginary, -0.25 * rootArea, 3e-12);
  near(coefficient("source-b:root-0", 3).imaginary, -0.0625 * rootArea, 3e-12);

  const cancellation = (harmonic) => surface.wakeFluxSpectralCancellationRows.find((row) =>
    row.degree === 0 && row.order === 0 && row.harmonic === harmonic);
  near(cancellation(2).rawMagnitude, 0.75 * rootArea, 3e-12);
  near(cancellation(2).netMagnitude, 0.25 * rootArea, 3e-12);
  near(cancellation(2).etaWakeFlux, 1 / 3, 3e-12);
  near(cancellation(3).rawMagnitude, 0.3125 * rootArea, 3e-12);
  near(cancellation(3).netMagnitude, 0.3125 * rootArea, 3e-12);
  near(cancellation(3).etaWakeFlux, 1, 3e-12);
  near(surface.transmitterTaggedWakeFluxBandCoverage.parsevalRelativeResidual, 0, 2e-12);
  near(surface.transmitterTaggedWakeFluxBandCoverage.outOfBandRmsFraction, 0, 5e-8);
  assert.match(surface.transmitterTaggedWakeFluxBandCoverage.claimBoundary, /not energy/);
});

test("frequency-resolved wake-flux reduction does not advance without reconstructing transmitter tags", () => {
  const protocol = compactProtocol();
  assert.throws(
    () => reduceCoincidentAxisThreeBinarySurfaceSampleGrid({
      completeCycleProtocol: protocol,
      radius: 1,
      sampleAt: ({ direction, timeIndex, directionIndex }) => {
        const row = sample({
          direction,
          signedWake: 1,
          unsignedWake: 1,
          amplitude: 1,
          eventId: `untagged-${timeIndex}-${directionIndex}`,
        });
        delete row.normalWakeFluxDensity.transmitterRootContributions;
        return row;
      },
    }),
    /lacks transmitter-root-tagged normal wake-flux contributions/,
  );
});

test("streaming acceptance does not advance when any event-level validity obligation is unmet", () => {
  const protocol = compactProtocol();
  const sourceRecord = staticSixSourceRecord();
  const defects = [
    {
      label: "causal root domain",
      pattern: /causal-root-domain inspection/,
      mutate(packet) {
        packet.rawLedgers.causalRoots[0]
          .rootCompletenessCertification.transmitterCertificates[0]
          .rootCount += 1;
      },
    },
    {
      label: "root completeness",
      pattern: /root-completeness inspection/,
      mutate(packet) {
        packet.rawLedgers.causalRoots[0].rootCompletenessCertification.complete = false;
      },
    },
    {
      label: "root transversality",
      pattern: /root-transversality gate/,
      mutate(packet) {
        packet.rawLedgers.causalRoots[0].roots[0].rootTransversalityMargin = 0;
      },
    },
    {
      label: "minimum separation",
      pattern: /minimumSeparation gate/,
      mutate(packet) {
        packet.rawLedgers.minimumSeparation[0].minimumSeparation = 0;
      },
    },
    {
      label: "event convergence",
      pattern: /event-convergence gate/,
      mutate(packet) {
        packet.rawLedgers.numericalConvergence[0].maximumEmissionTimeChange = 1;
      },
    },
  ];
  for (const defect of defects) {
    assert.throws(() => evaluateCoincidentAxisThreeBinaryStreamingSurfaceReductions({
      sourceRecord,
      completeCycleProtocol: protocol,
      evaluate(request) {
        const packet = evaluatePrescribedRecordAnalysis(request);
        defect.mutate(packet);
        return rehashPacket(packet);
      },
    }), defect.pattern, defect.label);
  }
});
