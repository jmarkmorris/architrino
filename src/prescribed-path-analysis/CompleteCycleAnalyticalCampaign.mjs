import {
  canonicalJson,
  createPrescribedRecordAnalysisSession,
  evaluatePrescribedRecordAnalysis,
  sha256Canonical,
  validatePrescribedRecordAnalysisProtocol,
} from "./AnalyticalBraidEvaluator.mjs";
import {
  buildB1FixedInternalEventAnalysisProtocol,
  createPeriodicCycleTimes,
  validateB1CompleteCycleProbeProtocol,
} from "./B1CompleteCycleProbeProtocol.mjs";
import {
  evaluateB1StreamingSurfaceReductions,
  finalizeB1StreamingReductionPacket,
} from "./B1StreamingReductions.mjs";
import {
  evaluateExactPrescribedSourceState,
  validateExactPrescribedSourceRecord,
} from "./ExactPrescribedSourceWake.mjs";
import {
  createPrescribedBraidExactSourceRecord,
  validatePrescribedBraidSpec,
} from "../../scripts/eom/generate-prescribed-braid-record.mjs";

export const COMPLETE_CYCLE_CANDIDATE_RESULT_SCHEMA =
  "prescribed-path-analysis/complete-cycle-candidate-result.v1";
export const COMPLETE_CYCLE_CAMPAIGN_REDUCER_VERSION =
  "prescribed-record-analytics/complete-cycle-campaign-reducer.v2";
export const POINTWISE_SUMMED_ACCELERATION_REDUCER_VERSION =
  "prescribed-record-analytics/pointwise-summed-acceleration-screen.v1";

function fail(message) {
  throw new Error(message);
}

function add(left, right) {
  return { x: left.x + right.x, y: left.y + right.y, z: left.z + right.z };
}

function subtract(left, right) {
  return { x: left.x - right.x, y: left.y - right.y, z: left.z - right.z };
}

function scale(vector, scalar) {
  return { x: vector.x * scalar, y: vector.y * scalar, z: vector.z * scalar };
}

function norm(vector) {
  return Math.hypot(vector.x, vector.y, vector.z);
}

function dot(left, right) {
  return left.x * right.x + left.y * right.y + left.z * right.z;
}

function finite(value, label) {
  const normalized = Number(value);
  if (!Number.isFinite(normalized)) throw new TypeError(`${label} must be finite.`);
  return normalized;
}

function eventProtocolFields(protocol, protocolId, probes) {
  return validatePrescribedRecordAnalysisProtocol({
    schema: "prescribed-path-analysis/analysis-protocol.v1",
    protocolId,
    fieldSpeed: protocol.eventEvaluator.fieldSpeed,
    coupling: protocol.eventEvaluator.coupling,
    history: protocol.eventEvaluator.history,
    returnWindow: {
      start: protocol.completeCycle.start,
      period: protocol.completeCycle.period,
    },
    rootPolicy: protocol.eventEvaluator.rootPolicy,
    tolerances: protocol.eventEvaluator.tolerances,
    geometry: protocol.eventEvaluator.geometry,
    convergence: protocol.eventEvaluator.convergence,
    probes,
  });
}

function writePacket(onRawPacket, packet, context) {
  return onRawPacket ? onRawPacket(packet, context) : {
    rawBytes: Buffer.byteLength(JSON.stringify(packet)),
    resultHash: packet.resultHash,
  };
}

function retainPacket(onRawPacket, packet, context, evidenceMode) {
  if (evidenceMode === "compact") {
    return {
      artifactKind: context.artifactKind ?? "raw-analytical-result-packet",
      retention: "not-retained-compact-diagnostic",
      context,
      resultHash: null,
      rawBytes: null,
    };
  }
  return writePacket(onRawPacket, packet, context);
}

export function evaluatePrescribedCircularAcceleration(source, time) {
  const trajectory = source.trajectory;
  const dt = time - trajectory.epochTime;
  const phase = trajectory.phaseAtEpoch +
    trajectory.angularVelocity * dt +
    0.5 * trajectory.angularAcceleration * dt * dt;
  const angularRate = trajectory.angularVelocity + trajectory.angularAcceleration * dt;
  const radial = add(
    scale(trajectory.radiusU, Math.cos(phase)),
    scale(trajectory.radiusV, Math.sin(phase)),
  );
  const tangent = add(
    scale(trajectory.radiusU, -Math.sin(phase)),
    scale(trajectory.radiusV, Math.cos(phase)),
  );
  return add(
    scale(radial, -(angularRate ** 2)),
    scale(tangent, trajectory.angularAcceleration),
  );
}

function projectionBasisAt(source, time, fallbackFrame = null) {
  const trajectory = source.trajectory;
  const dt = time - trajectory.epochTime;
  const phase = trajectory.phaseAtEpoch +
    trajectory.angularVelocity * dt +
    0.5 * trajectory.angularAcceleration * dt * dt;
  const radius = norm(trajectory.radiusU);
  if (radius === 0) {
    return {
      axial: fallbackFrame?.n ?? { x: 1, y: 0, z: 0 },
      radial: fallbackFrame?.e1 ?? { x: 0, y: 1, z: 0 },
      tangential: fallbackFrame?.e2 ?? { x: 0, y: 0, z: 1 },
      radialFrameDisposition: "declared-fallback-frame-for-zero-radius-source",
    };
  }
  return {
    axial: fallbackFrame?.n ?? { x: 1, y: 0, z: 0 },
    radial: scale(add(
      scale(trajectory.radiusU, Math.cos(phase)),
      scale(trajectory.radiusV, Math.sin(phase)),
    ), 1 / radius),
    tangential: scale(add(
      scale(trajectory.radiusU, -Math.sin(phase)),
      scale(trajectory.radiusV, Math.cos(phase)),
    ), 1 / radius),
    radialFrameDisposition: "instantaneous-prescribed-orbit-frame",
  };
}

function reduceScalarSeries(rows) {
  const mean = rows.reduce((sum, value) => sum + value, 0) / rows.length;
  return {
    signedCycleAverage: mean,
    rms: Math.sqrt(rows.reduce((sum, value) => sum + value * value, 0) / rows.length),
    maximumAbsolute: Math.max(...rows.map(Math.abs)),
  };
}

function reduceVectorSeries(rows, period) {
  const count = rows.length;
  const mean = scale(rows.reduce((sum, row) => add(sum, row), { x: 0, y: 0, z: 0 }), 1 / count);
  const rms = Math.sqrt(rows.reduce((sum, row) => sum + norm(row) ** 2, 0) / count);
  const peak = rows.reduce((best, row, index) => {
    const magnitude = norm(row);
    return !best || magnitude > best.magnitude ? { index, magnitude, vector: row } : best;
  }, null);
  return {
    mean,
    rms,
    peak,
    cycleIntegral: scale(mean, period),
  };
}

function maximumOrbitalRadius(trajectory) {
  const uu = dot(trajectory.radiusU, trajectory.radiusU);
  const uv = dot(trajectory.radiusU, trajectory.radiusV);
  const vv = dot(trajectory.radiusV, trajectory.radiusV);
  const discriminant = Math.hypot(uu - vv, 2 * uv);
  return Math.sqrt(Math.max(0, (uu + vv + discriminant) / 2));
}

function maximumPrescribedSpeed(source, history) {
  const trajectory = source.trajectory;
  const rates = [history.start, history.end].map((time) =>
    Math.abs(
      trajectory.angularVelocity +
        trajectory.angularAcceleration * (time - trajectory.epochTime),
    ));
  return norm(trajectory.centerVelocity) +
    Math.max(...rates) * maximumOrbitalRadius(trajectory);
}

function certifyDeclaredAccelerationInventory(packet, sourceRecord, fieldSpeed) {
  const sourceIds = sourceRecord.sources.map((source) => source.id);
  const sourceIdSet = new Set(sourceIds);
  const events = packet.rawLedgers?.causalRoots ?? [];
  const reasons = [];
  const history = sourceRecord.history;
  const maximumSourceSpeed = fieldSpeed === null
    ? null
    : Math.max(...sourceRecord.sources.map((source) =>
        maximumPrescribedSpeed(source, history)));
  const allSourcesStrictlySubField = fieldSpeed !== null &&
    maximumSourceSpeed < fieldSpeed;

  if (packet.reducedMeasures?.validity?.passed !== true) {
    reasons.push("moving-endpoint analytical validity gates did not all pass");
  }
  if (!allSourcesStrictlySubField) {
    reasons.push(
      "strict sub-field-speed path bound does not exclude a positive-delay same-worldline root",
    );
  }
  if (events.length === 0) {
    reasons.push("moving-endpoint packet contains no causal-root events");
  }

  for (const event of events) {
    const receiverId = event.receiverSourceId;
    const expectedIds = sourceIds.filter((sourceId) => sourceId !== receiverId);
    const certificates =
      event.rootCompletenessCertification?.transmitterCertificates ?? [];
    const certificateIds = certificates.map((row) => row.transmitterId);
    const uniqueCertificateIds = new Set(certificateIds);
    const exactCertificateInventory =
      sourceIdSet.has(receiverId) &&
      event.expectedTransmitterCount === expectedIds.length &&
      certificates.length === expectedIds.length &&
      uniqueCertificateIds.size === expectedIds.length &&
      expectedIds.every((sourceId) => uniqueCertificateIds.has(sourceId)) &&
      certificates.every((row) => row.complete === true);
    if (event.rootCompletenessCertification?.complete !== true ||
        !exactCertificateInventory) {
      reasons.push(
        `event ${event.eventId} lacks a complete exact transmitter-inventory certificate`,
      );
    }
  }

  const complete = reasons.length === 0;
  return {
    schema:
      "prescribed-path-analysis/declared-isolated-acceleration-inventory-certificate.v1",
    complete,
    status: complete ? "certified" : "not-certified",
    scope:
      "all retained canonical-kernel contributions from the declared isolated architrino-worldline inventory",
    sourceCount: sourceIds.length,
    sourceIds,
    eventCount: events.length,
    fieldSpeed,
    maximumCertifiedSourceSpeed: maximumSourceSpeed,
    strictSubFieldSpeedPassed: allSourcesStrictlySubField,
    rootCompletenessPassed: events.length > 0 && events.every(
      (event) => event.rootCompletenessCertification?.complete === true,
    ),
    sameTransmitterRootDisposition: allSourcesStrictlySubField
      ? "no-positive-delay-root-by-strict-sub-field-speed-path-length-bound"
      : "not-certified",
    outsideCertifiedScope: [
      "Noether-sea response",
      "undeclared external architrino worldlines",
    ],
    reasons,
  };
}

export function reducePointwiseSummedAccelerationNecessaryCondition(
  endpointReduction,
  {
    absoluteTolerance,
    numericalConvergenceBound = 0,
  } = {},
) {
  const tolerance = finite(
    absoluteTolerance,
    "pointwise summed-acceleration absoluteTolerance",
  );
  const convergenceBound = finite(
    numericalConvergenceBound,
    "pointwise summed-acceleration numericalConvergenceBound",
  );
  if (tolerance < 0 || convergenceBound < 0) {
    throw new RangeError(
      "pointwise summed-acceleration tolerances must be nonnegative.",
    );
  }

  const certificate = endpointReduction?.accelerationInventoryCertification;
  const shared = {
    schema:
      "prescribed-path-analysis/pointwise-summed-acceleration-necessary-condition.v1",
    reducerVersion: POINTWISE_SUMMED_ACCELERATION_REDUCER_VERSION,
    claimGrade: "derived",
    claimScope:
      "falsification-only screen for the exact isolated prescribed history under its declared architrino-worldline inventory",
    sufficientConditionClaim: false,
    branchExistenceClaim: false,
    taxonomyClaim: false,
    absoluteTolerance: tolerance,
    numericalConvergenceBound: convergenceBound,
  };
  if (certificate?.complete !== true) {
    return {
      ...shared,
      status: "inapplicable-incomplete-acceleration-inventory",
      outcome: "not-evaluated",
      falsifiedAsExactIsolatedPrescribedHistory: null,
      accelerationInventoryCertification: certificate ?? null,
      rows: [],
      summary: null,
    };
  }

  const receivers = endpointReduction.receivers;
  if (!Array.isArray(receivers) || receivers.length === 0) {
    fail("certified pointwise summed-acceleration reduction requires receivers.");
  }
  const eventCount = receivers[0].events.length;
  if (eventCount === 0 ||
      receivers.some((receiver) => receiver.events.length !== eventCount)) {
    fail("pointwise summed-acceleration receiver event grids differ.");
  }

  const rows = [];
  for (let eventIndex = 0; eventIndex < eventCount; eventIndex += 1) {
    const observationTime = receivers[0].events[eventIndex].observationTime;
    if (receivers.some(
      (receiver) => receiver.events[eventIndex].observationTime !== observationTime,
    )) {
      fail("pointwise summed-acceleration receiver observation times differ.");
    }
    const summedEvaluatedAcceleration = receivers.reduce(
      (sum, receiver) =>
        add(sum, receiver.events[eventIndex].netAccelerationFromOtherSources),
      { x: 0, y: 0, z: 0 },
    );
    const summedPrescribedAcceleration = receivers.reduce(
      (sum, receiver) =>
        add(sum, receiver.events[eventIndex].prescribedPathAcceleration),
      { x: 0, y: 0, z: 0 },
    );
    const summedEquationResidual = subtract(
      summedPrescribedAcceleration,
      summedEvaluatedAcceleration,
    );
    rows.push({
      eventIndex,
      observationTime,
      summedEvaluatedAcceleration,
      summedEvaluatedAccelerationNorm: norm(summedEvaluatedAcceleration),
      summedPrescribedAcceleration,
      summedPrescribedAccelerationNorm: norm(summedPrescribedAcceleration),
      summedEquationResidual,
      summedEquationResidualNorm: norm(summedEquationResidual),
    });
  }

  const peak = (field) => rows.reduce(
    (best, row) => !best || row[field] > best[field] ? row : best,
    null,
  );
  const peakEvaluated = peak("summedEvaluatedAccelerationNorm");
  const peakPrescribed = peak("summedPrescribedAccelerationNorm");
  const peakResidual = peak("summedEquationResidualNorm");
  const adjudicationThreshold =
    tolerance + receivers.length * convergenceBound;
  const prescribedAccelerationSumZeroWithinTolerance =
    peakPrescribed.summedPrescribedAccelerationNorm <= tolerance;
  const falsified = prescribedAccelerationSumZeroWithinTolerance &&
    peakEvaluated.summedEvaluatedAccelerationNorm > adjudicationThreshold;
  const status = !prescribedAccelerationSumZeroWithinTolerance
    ? "inapplicable-nonzero-prescribed-acceleration-sum"
    : "evaluated-falsification-only";
  const outcome = !prescribedAccelerationSumZeroWithinTolerance
    ? "not-evaluated"
    : falsified
      ? "falsified-exact-isolated-prescribed-history"
      : "not-falsified-by-this-screen";

  return {
    ...shared,
    status,
    outcome,
    falsifiedAsExactIsolatedPrescribedHistory:
      prescribedAccelerationSumZeroWithinTolerance ? falsified : null,
    accelerationInventoryCertification: certificate,
    hypotheses: {
      completeAccelerationInventory: true,
      commonObservationGrid: true,
      prescribedAccelerationSumZeroWithinTolerance,
    },
    adjudicationThreshold,
    rows,
    summary: {
      eventCount,
      receiverCount: receivers.length,
      maximumSummedEvaluatedAccelerationNorm:
        peakEvaluated.summedEvaluatedAccelerationNorm,
      peakSummedEvaluatedAcceleration: {
        eventIndex: peakEvaluated.eventIndex,
        observationTime: peakEvaluated.observationTime,
        vector: peakEvaluated.summedEvaluatedAcceleration,
      },
      maximumSummedPrescribedAccelerationNorm:
        peakPrescribed.summedPrescribedAccelerationNorm,
      peakSummedPrescribedAcceleration: {
        eventIndex: peakPrescribed.eventIndex,
        observationTime: peakPrescribed.observationTime,
        vector: peakPrescribed.summedPrescribedAcceleration,
      },
      maximumSummedEquationResidualNorm:
        peakResidual.summedEquationResidualNorm,
      peakSummedEquationResidual: {
        eventIndex: peakResidual.eventIndex,
        observationTime: peakResidual.observationTime,
        vector: peakResidual.summedEquationResidual,
      },
    },
    interpretation:
      "A falsifying outcome applies only to this exact isolated prescribed history. A non-falsifying outcome establishes no branch, taxonomy, stability, retention, or physical-realization claim.",
  };
}

export function reduceCompleteCycleEndpointPacket(packet, sourceRecord, period, {
  fieldSpeed = null,
} = {}) {
  const eventsBySource = new Map(sourceRecord.sources.map((source) => [source.id, []]));
  const declaredFrame = sourceRecord.parameterVector?.frame ?? null;
  const accelerationInventoryCertification =
    certifyDeclaredAccelerationInventory(packet, sourceRecord, fieldSpeed);
  for (const event of packet.rawLedgers.causalRoots) {
    const source = sourceRecord.sources.find((row) => row.id === event.receiverSourceId);
    if (!source) fail(`endpoint event ${event.eventId} lacks its receiver source.`);
    const response = event.measures.probeResponses.find(
      (row) => row.probePolarity === source.charge,
    );
    if (!response) fail(`endpoint event ${event.eventId} lacks its receiver-polarity response.`);
    const prescribedAcceleration = evaluatePrescribedCircularAcceleration(
      source,
      event.observationTime,
    );
    const mismatch = subtract(prescribedAcceleration, response.acceleration);
    const basis = projectionBasisAt(source, event.observationTime, declaredFrame);
    eventsBySource.get(source.id).push({
      eventId: event.eventId,
      observationTime: event.observationTime,
      receiverPosition: event.probePosition,
      receiverVelocity: event.probeVelocity,
      netAccelerationFromOtherSources: response.acceleration,
      prescribedPathAcceleration: prescribedAcceleration,
      partialPrescribedPathMismatch: mismatch,
      declaredInventoryPrescribedPathResidual: mismatch,
      residualProjections: {
        axial: dot(mismatch, basis.axial),
        radial: dot(mismatch, basis.radial),
        tangential: dot(mismatch, basis.tangential),
      },
      projectionBasis: basis,
      roots: event.roots.map((root) => ({
        transmitterId: root.transmitterId,
        rootId: root.rootId,
        emissionTime: root.emissionTime,
        transmitterSideFactorDt: root.transmitterSideFactorDt,
        receiverSideFactorDr: root.receiverSideFactorDr,
        rootPlaybackDerivative: root.rootPlaybackDerivative,
        acceleration: root.probeAccelerationContributions.find(
          (row) => row.probePolarity === source.charge,
        ).acceleration,
      })),
    });
  }
  const receivers = [...eventsBySource.entries()].map(([transmitterId, events]) => ({
    transmitterId,
    eventCount: events.length,
    accelerationFromOtherSources: reduceVectorSeries(
      events.map((row) => row.netAccelerationFromOtherSources),
      period,
    ),
    partialPrescribedPathMismatch: reduceVectorSeries(
      events.map((row) => row.partialPrescribedPathMismatch),
      period,
    ),
    declaredInventoryPrescribedPathResidual: reduceVectorSeries(
      events.map((row) => row.declaredInventoryPrescribedPathResidual),
      period,
    ),
    residualProjections: {
      axial: reduceScalarSeries(events.map((row) => row.residualProjections.axial)),
      radial: reduceScalarSeries(events.map((row) => row.residualProjections.radial)),
      tangential: reduceScalarSeries(events.map((row) => row.residualProjections.tangential)),
    },
    events,
  }));
  const endpointReduction = {
    selfHitPolicy: "exclude-same-transmitter-id.v1",
    implementedContributions: ["acceleration from every other prescribed source"],
    sameTransmitterRootDisposition:
      accelerationInventoryCertification.sameTransmitterRootDisposition,
    completeDeclaredSourceInventory:
      accelerationInventoryCertification.complete,
    accelerationInventoryCertification,
    omittedContributions: [
      ...(accelerationInventoryCertification.strictSubFieldSpeedPassed
        ? []
        : ["same-source self-hit acceleration"]),
      "Noether-sea response",
      "any other acceleration contribution not present in the prescribed-source evaluator",
    ],
    mismatchDisposition: "partial-prescribed-path-equation-mismatch",
    receivers,
  };
  const absoluteTolerance =
    packet.tolerances?.convergenceAbsolute ??
    packet.reducedMeasures?.numericalConvergence?.absoluteTolerance;
  const numericalConvergenceBound =
    packet.reducedMeasures?.numericalConvergence?.maximumReportedChange ?? 0;
  return {
    ...endpointReduction,
    pointwiseSummedAccelerationNecessaryCondition:
      reducePointwiseSummedAccelerationNecessaryCondition(endpointReduction, {
        absoluteTolerance,
        numericalConvergenceBound,
      }),
  };
}

function buildEndpointProtocol(protocol, sourceRecord, resolution) {
  const times = createPeriodicCycleTimes({
    start: protocol.completeCycle.start,
    period: protocol.completeCycle.period,
    sampleCount: protocol.completeCycle[resolution].timeSamples,
  });
  return eventProtocolFields(
    protocol,
    `${protocol.protocolId}-moving-endpoints-${resolution}`,
    sourceRecord.sources.map((source) => ({
      id: `moving-endpoint-${source.id}`,
      kind: "prescribed-source-endpoint-probe.v1",
      transmitterId: source.id,
      selfHitPolicy: "exclude-same-transmitter-id.v1",
      observationTimes: times,
      polarities: [source.charge],
    })),
  );
}

function rootIdentitySet(event) {
  return event.roots.map((root) => root.transmitterId).sort().join(",");
}

export function differentiateMatchedRootBranches(minus, plus, denominator, field) {
  if (rootIdentitySet(minus) !== rootIdentitySet(plus)) {
    return {
      status: "rejected-root-topology-discontinuity",
      minusRootIdentities: rootIdentitySet(minus),
      plusRootIdentities: rootIdentitySet(plus),
    };
  }
  const minusRoots = new Map(minus.roots.map((root) => [root.transmitterId, root]));
  const plusRoots = new Map(plus.roots.map((root) => [root.transmitterId, root]));
  return {
    status: "accepted-continuous-root-branches",
    branchRows: [...minusRoots.entries()].map(([transmitterId, minusRoot]) => {
      const plusRoot = plusRoots.get(transmitterId);
      const minusAcceleration = minusRoot.probeAccelerationContributions.find(
        (row) => row.probePolarity === 1,
      ).acceleration;
      const plusAcceleration = plusRoot.probeAccelerationContributions.find(
        (row) => row.probePolarity === 1,
      ).acceleration;
      return {
        transmitterId,
        signedWakeDerivative:
          (plusRoot.signedWakeContribution - minusRoot.signedWakeContribution) / denominator,
        accelerationDerivative: scale(
          subtract(plusAcceleration, minusAcceleration),
          1 / denominator,
        ),
      };
    }),
    netSignedWakeDerivative:
      (plus.measures.signedWake - minus.measures.signedWake) / denominator,
    netAccelerationDerivative: scale(
      subtract(
        plus.measures.probeResponses[0].acceleration,
        minus.measures.probeResponses[0].acceleration,
      ),
      1 / denominator,
    ),
    derivativeVariable: field,
  };
}

function evaluateBranchDiagnostics(
  sourceRecord,
  protocol,
  onRawPacket,
  evidenceMode,
  analysisSession,
) {
  const coordinateStep = protocol.branchDiagnostics.coordinateStep;
  const timeStep = protocol.branchDiagnostics.timeStep;
  const [x, y, z] = protocol.branchDiagnostics.probePosition;
  const centerTime = protocol.completeCycle.start;
  const declarations = [
    ["x-minus", { x: x - coordinateStep, y, z }, centerTime],
    ["x-plus", { x: x + coordinateStep, y, z }, centerTime],
    ["y-minus", { x, y: y - coordinateStep, z }, centerTime],
    ["y-plus", { x, y: y + coordinateStep, z }, centerTime],
    ["z-minus", { x, y, z: z - coordinateStep }, centerTime],
    ["z-plus", { x, y, z: z + coordinateStep }, centerTime],
    ["time-minus", { x, y, z }, centerTime - timeStep],
    ["time-plus", { x, y, z }, centerTime + timeStep],
  ];
  const diagnosticProtocol = eventProtocolFields(
    protocol,
    `${protocol.protocolId}-branch-diagnostics`,
    declarations.map(([id, position, observationTime]) => ({
      id: `branch-${id}`,
      kind: "stationary-coordinate-probe.v1",
      position,
      observationTimes: [observationTime],
      polarities: [1, -1],
    })),
  );
  const packet = evaluatePrescribedRecordAnalysis({
    sourceRecord,
    protocol: diagnosticProtocol,
    session: analysisSession,
    resultMode:
      evidenceMode === "compact" ? "compact-event-batch" : "full",
  });
  const artifact = retainPacket(
    onRawPacket,
    packet,
    {
      stage: "branch-diagnostics",
      refinement: "primary",
    },
    evidenceMode,
  );
  const events = new Map(packet.rawLedgers.causalRoots.map((event) => [event.probeId, event]));
  return {
    artifact,
    spatialGradient: ["x", "y", "z"].map((axis) => ({
      axis,
      ...differentiateMatchedRootBranches(
        events.get(`branch-${axis}-minus`),
        events.get(`branch-${axis}-plus`),
        2 * coordinateStep,
        axis,
      ),
    })),
    temporalVariation: differentiateMatchedRootBranches(
      events.get("branch-time-minus"),
      events.get("branch-time-plus"),
      2 * timeStep,
      "absolute-time",
    ),
  };
}

function topologySignature(packet) {
  return packet.rawLedgers.causalRoots.map((event) => ({
    probeId: event.probeId,
    observationTime: event.observationTime,
    roots: event.roots.map((root) => root.transmitterId).sort(),
    noRoots: event.noRootTransmitters.map((row) => row.transmitterId).sort(),
  }));
}

function surfaceMetricVector(reduction) {
  const surface = reduction.reducedMeasures?.surface?.find(
    (row) => row.radius === Math.max(...reduction.completeCycleProtocol.enclosingSurfaces.radii),
  );
  if (!surface) return null;
  const positiveExposure = surface.exposures.find((row) => row.probePolarity === 1);
  return {
    etaExtPositive: positiveExposure.eta_ext,
    etaWakeFlux: surface.wakeFlux.etaWakeFlux,
  };
}

function endpointRmsVector(endpointReduction) {
  return Object.fromEntries(endpointReduction.receivers.map((row) => [
    row.transmitterId,
    row.accelerationFromOtherSources.rms,
  ]));
}

export function perturbDeclaredPrimaryBraidPhaseOffset(spec, delta) {
  const perturbed = structuredClone(spec);
  perturbed.braids[0].phaseOffset += delta;
  return validatePrescribedBraidSpec(perturbed);
}

export function centeredSensitivityDerivative(minus, plus, denominator) {
  if (!(Number.isFinite(denominator) && denominator > 0)) {
    throw new RangeError("centered sensitivity denominator must be positive and finite.");
  }
  const derivative = {};
  for (const key of Object.keys(minus)) {
    if (typeof minus[key] === "number") derivative[key] = (plus[key] - minus[key]) / denominator;
  }
  return derivative;
}

export function adjudicateTransmitterSensitivityConvergence({
  primaryDerivative,
  refinedDerivative,
  endpointRmsDerivatives,
  baseEndpointRmsBySource,
  threshold,
  normalization = {},
}) {
  const ratioScale = finite(
    normalization.surfaceRatioScale ?? 1,
    "source sensitivity surfaceRatioScale",
  );
  const endpointFloor = finite(
    normalization.endpointRmsRelativeFloor ?? 1e-12,
    "source sensitivity endpointRmsRelativeFloor",
  );
  if (!(ratioScale > 0) || !(endpointFloor > 0) || !(threshold > 0)) {
    throw new RangeError("source sensitivity normalization scales and threshold must be positive.");
  }
  const surface = Object.fromEntries(Object.keys(primaryDerivative).map((measureId) => {
    const primary = primaryDerivative[measureId];
    const refined = refinedDerivative[measureId];
    const absoluteUncertainty = Math.abs(primary - refined);
    const comparisonScale = Math.max(
      Math.abs(primary),
      Math.abs(refined),
      ratioScale,
    );
    return [measureId, {
      primary,
      refined,
      absoluteUncertainty,
      comparisonScale,
      normalizedUncertainty: absoluteUncertainty / comparisonScale,
      scaleRule: "max-derivative-magnitude-or-declared-surface-ratio-scale.v1",
    }];
  }));
  const endpoints = Object.fromEntries(Object.keys(endpointRmsDerivatives).map((transmitterId) => {
    const derivative = endpointRmsDerivatives[transmitterId];
    const absoluteUncertainty = Math.abs(derivative.primary - derivative.refined);
    const comparisonScale = Math.max(
      Math.abs(derivative.primary),
      Math.abs(derivative.refined),
      Math.abs(baseEndpointRmsBySource[transmitterId] ?? 0),
      endpointFloor,
    );
    return [transmitterId, {
      primary: derivative.primary,
      refined: derivative.refined,
      absoluteUncertainty,
      comparisonScale,
      normalizedUncertainty: absoluteUncertainty / comparisonScale,
      scaleRule:
        "max-derivative-magnitude-base-endpoint-rms-or-declared-floor.v1",
    }];
  }));
  const maximumNormalizedUncertainty = Math.max(
    0,
    ...Object.values(surface).map((row) => row.normalizedUncertainty),
    ...Object.values(endpoints).map((row) => row.normalizedUncertainty),
  );
  return {
    rule: "per-measure-dimensionless-stencil-settling.v1",
    threshold,
    surface,
    endpoints,
    maximumNormalizedUncertainty,
    passed: maximumNormalizedUncertainty <= threshold,
  };
}

function evaluateSensitivity({
  baseSpec,
  baseSource,
  baseSurface,
  baseTopologyHash,
  baseEndpoint,
  protocol,
  onRawPacket,
  sourceOptions,
  sensitivityAdapter,
}) {
  const primaryStep = protocol.localTransmitterSensitivity.primaryStep;
  const refinedStep = protocol.localTransmitterSensitivity.refinedStep;
  const rows = new Map();
  const rawArtifactInventory = [];
  const coordinateId = sensitivityAdapter?.coordinateId ??
    "declared-primary-braid-phase-offset";
  const coordinatePath = sensitivityAdapter?.coordinatePath ?? "braids[0].phaseOffset";
  const perturbSpec = sensitivityAdapter?.perturbSpec ??
    perturbDeclaredPrimaryBraidPhaseOffset;
  const createSourceRecord = sensitivityAdapter?.createSourceRecord ??
    ((spec, options) => createPrescribedBraidExactSourceRecord(spec, options));
  for (const delta of [-primaryStep, primaryStep, -refinedStep, refinedStep]) {
    const perturbedSpec = perturbSpec(baseSpec, delta);
    const sourceRecord = validateExactPrescribedSourceRecord(
      createSourceRecord(perturbedSpec, sourceOptions),
    );
    const exactSourceArtifact = writePacket(onRawPacket, sourceRecord, {
      stage: "source-sensitivity-exact-source",
      coordinate: coordinateId,
      delta,
      artifactKind: "exact-source-record",
    });
    rawArtifactInventory.push(exactSourceArtifact);
    const topology = [];
    const surface = evaluateB1StreamingSurfaceReductions({
      sourceRecord,
      completeCycleProtocol: protocol,
      onSurfacePacket(packet, context) {
        topology.push(...topologySignature(packet));
        const artifact = writePacket(onRawPacket, packet, {
          ...context,
          stage: "source-sensitivity-surface",
          coordinate: coordinateId,
          delta,
        });
        rawArtifactInventory.push(artifact);
        return artifact;
      },
    });
    const endpointProtocol = buildEndpointProtocol(protocol, sourceRecord, "primary");
    const endpointPacket = evaluatePrescribedRecordAnalysis({
      sourceRecord,
      protocol: endpointProtocol,
    });
    const endpointArtifact = writePacket(onRawPacket, endpointPacket, {
      stage: "source-sensitivity-endpoint",
      coordinate: coordinateId,
      delta,
      refinement: "primary",
    });
    rawArtifactInventory.push(endpointArtifact);
    rows.set(delta, {
      delta,
      sourceHash: sha256Canonical(sourceRecord),
      exactSourceRecord: sourceRecord,
      surfaceResultHash: surface.resultHash,
      surfaceArtifactHashes: surface.surfaceEvaluations.map((row) => row.artifact),
      endpointArtifact,
      exactSourceArtifact,
      topologyHash: sha256Canonical(topology),
      topology,
      metric: {
        ...surfaceMetricVector(surface),
        endpointRmsBySource: endpointRmsVector(
          reduceCompleteCycleEndpointPacket(
            endpointPacket,
            sourceRecord,
            protocol.completeCycle.period,
            { fieldSpeed: protocol.eventEvaluator.fieldSpeed },
          ),
        ),
      },
      accepted: surface.status.acceptedReducedMeasures &&
        endpointPacket.reducedMeasures.validity.passed,
    });
  }
  const topologyMatch = [...rows.values()].every((row) =>
    row.topology.length > 0 && row.topologyHash === baseTopologyHash);
  const primaryMinus = rows.get(-primaryStep);
  const primaryPlus = rows.get(primaryStep);
  const refinedMinus = rows.get(-refinedStep);
  const refinedPlus = rows.get(refinedStep);
  const allAccepted = [...rows.values()].every((row) => row.accepted);
  const primarySurface = centeredSensitivityDerivative(
    primaryMinus.metric,
    primaryPlus.metric,
    2 * primaryStep,
  );
  const refinedSurface = centeredSensitivityDerivative(
    refinedMinus.metric,
    refinedPlus.metric,
    2 * refinedStep,
  );
  const endpointDerivatives = {};
  for (const transmitterId of Object.keys(primaryMinus.metric.endpointRmsBySource)) {
    endpointDerivatives[transmitterId] = {
      primary: (
        primaryPlus.metric.endpointRmsBySource[transmitterId] -
        primaryMinus.metric.endpointRmsBySource[transmitterId]
      ) / (2 * primaryStep),
      refined: (
        refinedPlus.metric.endpointRmsBySource[transmitterId] -
        refinedMinus.metric.endpointRmsBySource[transmitterId]
      ) / (2 * refinedStep),
    };
    endpointDerivatives[transmitterId].uncertainty = Math.abs(
      endpointDerivatives[transmitterId].primary - endpointDerivatives[transmitterId].refined,
    );
  }
  const uncertainty = Object.fromEntries(Object.keys(primarySurface).map((key) => [
    key,
    Math.abs(primarySurface[key] - refinedSurface[key]),
  ]));
  const maximumUncertainty = Math.max(
    0,
    ...Object.values(uncertainty),
    ...Object.values(endpointDerivatives).map((row) => row.uncertainty),
  );
  const threshold =
    protocol.failClosedGates.quadratureConvergence.transmitterSensitivityRelativeOrAbsolute;
  const convergenceAdjudication = adjudicateTransmitterSensitivityConvergence({
    primaryDerivative: primarySurface,
    refinedDerivative: refinedSurface,
    endpointRmsDerivatives: endpointDerivatives,
    baseEndpointRmsBySource: endpointRmsVector(baseEndpoint),
    threshold,
    normalization: protocol.localTransmitterSensitivity.normalization,
  });
  const accepted = allAccepted && topologyMatch && convergenceAdjudication.passed;
  return {
    coordinateId,
    coordinatePath,
    unit: "radian",
    baseSourceHash: sha256Canonical(baseSource),
    baseSurfaceResultHash: baseSurface.resultHash,
    baseEndpointRmsBySource: endpointRmsVector(baseEndpoint),
    stencil: {
      primary: { kind: "three-point-centered-periodic.v1", step: primaryStep },
      refined: { kind: "three-point-centered-periodic.v1", step: refinedStep },
    },
    perturbedSources: [...rows.values()].map((row) => ({
      delta: row.delta,
      sourceHash: row.sourceHash,
      surfaceResultHash: row.surfaceResultHash,
      topologyHash: row.topologyHash,
      accepted: row.accepted,
    })),
    topologyMatch,
    primaryDerivative: primarySurface,
    refinedDerivative: refinedSurface,
    endpointRmsDerivatives: endpointDerivatives,
    derivativeUncertainty: uncertainty,
    maximumUncertainty,
    maximumNormalizedUncertainty:
      convergenceAdjudication.maximumNormalizedUncertainty,
    convergenceAdjudication,
    threshold,
    accepted,
    disposition: accepted ? "accepted" : "diagnostic-only",
    failureCode: accepted
      ? null
      : !topologyMatch
        ? "root-topology-discontinuity"
        : !allAccepted
          ? "perturbed-evaluation-gate-failed"
          : "stencil-refinement-failed",
    rawArtifactInventory,
  };
}

function topologyLedger(surfaceReduction) {
  const evaluations = surfaceReduction.surfaceEvaluations;
  const transitions = [];
  const byRadiusResolution = new Map();
  for (const row of evaluations) {
    const key = `${row.radius}:${row.resolution}`;
    const list = byRadiusResolution.get(key) ?? [];
    list.push(row);
    byRadiusResolution.set(key, list);
  }
  for (const [key, rows] of byRadiusResolution) {
    rows.sort((left, right) => left.timeIndex - right.timeIndex);
    for (let index = 1; index < rows.length; index += 1) {
      if (rows[index].rawCausalRootCount !== rows[index - 1].rawCausalRootCount) {
        transitions.push({
          surface: key,
          fromTimeIndex: rows[index - 1].timeIndex,
          toTimeIndex: rows[index].timeIndex,
          fromRootCount: rows[index - 1].rawCausalRootCount,
          toRootCount: rows[index].rawCausalRootCount,
          kind: rows[index].rawCausalRootCount > rows[index - 1].rawCausalRootCount
            ? "root-birth"
            : "root-death",
        });
      }
    }
  }
  const rootPolicy =
    surfaceReduction.completeCycleProtocol.eventEvaluator.rootPolicy.id;
  return {
    rootPolicy,
    topologyIdentity: "transmitter-id plus root ordinal",
    transitions,
    foldEvents: [],
    foldDisposition: rootPolicy ===
      "all-retained-roots/event-specific-isolation-certified.v2"
      ? "possible non-transverse folds remain unevaluated unless every retained interval is certified root-free or monotonic"
      : "inapplicable inside the certified strictly sub-field-speed simple-root domain; fail before evaluation if the domain is crossed",
  };
}

export function evaluateCompleteCycleCandidate({
  candidateId,
  sourceRecord: rawSourceRecord,
  sourceSpec,
  completeCycleProtocol: rawProtocol,
  onRawPacket = null,
  includeSensitivity = true,
  sourceOptions = {},
  sensitivityAdapter = null,
  onProgress = null,
  evidenceMode = "full",
} = {}) {
  const sourceRecord = validateExactPrescribedSourceRecord(rawSourceRecord);
  const protocol = validateB1CompleteCycleProbeProtocol(rawProtocol);
  if (evidenceMode !== "full" && evidenceMode !== "compact") {
    throw new TypeError("evidenceMode must be full or compact.");
  }
  if (evidenceMode === "compact" && includeSensitivity) {
    throw new Error(
      "compact evidence mode does not evaluate source sensitivity; " +
      "use includeSensitivity=false or the full-adjudication lane.",
    );
  }
  const analysisSession = createPrescribedRecordAnalysisSession(sourceRecord);
  const completeCycleProtocolHash = sha256Canonical(protocol);
  const sourceHash = sha256Canonical(sourceRecord);
  const surfaceTopology = [];
  onProgress?.({ candidateId, stage: "surface-reduction-start" });
  const surface = evaluateB1StreamingSurfaceReductions({
    sourceRecord,
    completeCycleProtocol: protocol,
    evidenceMode,
    analysisSession,
    onProgress(progress) {
      onProgress?.({ candidateId, ...progress });
    },
    onSurfacePacket(packet, context) {
      const signature =
        evidenceMode === "full" ? topologySignature(packet) : null;
      const topologyHash =
        signature === null ? null : sha256Canonical(signature);
      if (signature !== null) surfaceTopology.push(...signature);
      const artifact = retainPacket(
        onRawPacket,
        packet,
        {
          ...context,
          stage: "complete-cycle-surface",
        },
        evidenceMode,
      );
      return { ...artifact, topologyHash };
    },
  });
  surface.surfaceEvaluations.forEach((row) => {
    row.topologyHash = row.artifact?.topologyHash ?? null;
  });
  onProgress?.({ candidateId, stage: "internal-fixed-start" });
  const internalFixed = {};
  for (const resolution of ["primary", "refined"]) {
    const fixedProtocol = buildB1FixedInternalEventAnalysisProtocol(protocol, { resolution });
    const packet = evaluatePrescribedRecordAnalysis({
      sourceRecord,
      protocol: fixedProtocol,
      session: analysisSession,
      resultMode:
        evidenceMode === "compact" ? "compact-event-batch" : "full",
    });
    internalFixed[resolution] = {
      packet,
      artifact: retainPacket(
        onRawPacket,
        packet,
        {
          stage: "complete-cycle-internal-fixed",
          refinement: resolution,
        },
        evidenceMode,
      ),
    };
  }
  onProgress?.({ candidateId, stage: "moving-receivers-start" });
  const internalReceivers = {};
  for (const resolution of ["primary", "refined"]) {
    const endpointProtocol = buildEndpointProtocol(protocol, sourceRecord, resolution);
    const packet = evaluatePrescribedRecordAnalysis({
      sourceRecord,
      protocol: endpointProtocol,
      session: analysisSession,
      resultMode:
        evidenceMode === "compact" ? "compact-event-batch" : "full",
    });
    internalReceivers[resolution] = {
      artifact: retainPacket(
        onRawPacket,
        packet,
        {
          stage: "complete-cycle-moving-receivers",
          refinement: resolution,
        },
        evidenceMode,
      ),
      reduction: reduceCompleteCycleEndpointPacket(
        packet,
        sourceRecord,
        protocol.completeCycle.period,
        { fieldSpeed: protocol.eventEvaluator.fieldSpeed },
      ),
      validity: packet.reducedMeasures.validity,
      resultHash: packet.resultHash ?? null,
    };
  }
  onProgress?.({ candidateId, stage: "branch-diagnostics-start" });
  const branchDiagnostics = evaluateBranchDiagnostics(
    sourceRecord,
    protocol,
    onRawPacket,
    evidenceMode,
    analysisSession,
  );
  onProgress?.({ candidateId, stage: "source-sensitivity-start" });
  const sensitivity = includeSensitivity
    ? evaluateSensitivity({
        baseSpec: sourceSpec,
        baseSource: sourceRecord,
        baseSurface: surface,
        baseTopologyHash: sha256Canonical(surfaceTopology),
        baseEndpoint: internalReceivers.primary.reduction,
        protocol,
        onRawPacket,
        sourceOptions,
        sensitivityAdapter,
      })
    : {
        accepted: false,
        disposition: "diagnostic-only",
        failureCode: "sensitivity-not-evaluated",
      };
  const gates = {
    surfaceQuadrature: surface.convergenceComparisons.quadrature.passed,
    fixedInternalPrimary: internalFixed.primary.packet.reducedMeasures.validity.passed,
    fixedInternalRefined: internalFixed.refined.packet.reducedMeasures.validity.passed,
    movingReceiverPrimary: internalReceivers.primary.validity.passed,
    movingReceiverRefined: internalReceivers.refined.validity.passed,
    branchContinuity: [
      ...branchDiagnostics.spatialGradient,
      branchDiagnostics.temporalVariation,
    ].every((row) => row.status === "accepted-continuous-root-branches"),
    transmitterSensitivity: sensitivity.accepted,
  };
  const accepted = Object.values(gates).every(Boolean);
  const packetWithoutHash = {
    schema: COMPLETE_CYCLE_CANDIDATE_RESULT_SCHEMA,
    reducer: {
      id: COMPLETE_CYCLE_CAMPAIGN_REDUCER_VERSION,
      eventEvaluator: "evaluatePrescribedRecordAnalysis({ sourceRecord, protocol })",
      surfaceReducer: surface.reducer,
      ...(evidenceMode === "compact" ? { evidenceMode } : {}),
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
    },
    candidateId,
    claimGrade: "derived",
    claimScope: "conditional analytical consequences of exact prescribed paths",
    excludedClaims: ["stability", "energy", "retention", "physical-realization"],
    source: {
      ...surface.source,
      sourceHash,
      exactSourceRecordHash: sourceHash,
    },
    completeCycleProtocolHash,
    completeCycleProtocol: protocol,
    rawArtifactInventory: [
      ...surface.surfaceEvaluations.map((row) => row.artifact),
      internalFixed.primary.artifact,
      internalFixed.refined.artifact,
      internalReceivers.primary.artifact,
      internalReceivers.refined.artifact,
      branchDiagnostics.artifact,
      ...(sensitivity.rawArtifactInventory ?? []),
    ],
    diagnosticReductions: {
      surface: surface.diagnosticReductions,
      internalFixed: {
        primaryResultHash: internalFixed.primary.packet.resultHash ?? null,
        refinedResultHash: internalFixed.refined.packet.resultHash ?? null,
      },
      internalReceivers,
      branchDiagnostics,
      rootTopology: topologyLedger(surface),
      transmitterSensitivity: sensitivity,
      symmetryResiduals: {
        status: "inapplicable-with-reason",
        reason:
          "the exact source-record schema contains no machine-readable chart-symmetry transform and probe mapping",
      },
    },
    convergenceComparisons: {
      surface: surface.convergenceComparisons,
      transmitterSensitivity: sensitivity,
    },
    reducedMeasures: accepted
      ? {
          surface: surface.reducedMeasures,
          internalReceiverWakeAndAcceleration: internalReceivers.primary.reduction,
          branchDiagnostics,
          rootTopology: topologyLedger(surface),
          transmitterSensitivity: sensitivity,
        }
      : null,
    gates,
    status: {
      code: accepted ? "ok" : "complete-cycle-gate-failed",
      accepted,
      disposition: accepted ? "accepted" : "diagnostic-only",
      failedGates: Object.entries(gates).filter(([, passed]) => !passed).map(([id]) => id),
    },
    methodologyBoundary: {
      prescribedPathAccelerationMismatch: "partial",
      omittedAccelerationContributions:
        internalReceivers.primary.reduction.omittedContributions,
      pointwiseSummedAccelerationNecessaryCondition:
        "falsification-only for an exact isolated prescribed history when the declared architrino-worldline acceleration inventory is certified complete and the summed prescribed acceleration vanishes within tolerance; a non-falsifying result establishes no branch or taxonomy claim",
      symmetryResiduals:
        "inapplicable until the source-record contract declares an exact transform and probe mapping",
    },
    falsifier:
      "Reject this result if an independent closed form disagrees beyond tolerance, a retained root is missing, a complete-cycle reference identity fails after refinement, a raw ledger cannot reconstruct a reduced row, an identity mismatch is accepted, or a required candidate or measure is absent.",
  };
  onProgress?.({ candidateId, stage: "candidate-complete", accepted });
  return finalizeB1StreamingReductionPacket(packetWithoutHash);
}

export function verifyCompleteCycleCandidatePacket(packet) {
  if (packet?.schema !== COMPLETE_CYCLE_CANDIDATE_RESULT_SCHEMA) {
    throw new TypeError(`candidate packet requires schema ${COMPLETE_CYCLE_CANDIDATE_RESULT_SCHEMA}.`);
  }
  const { resultHash, ...withoutHash } = packet;
  if (resultHash !== sha256Canonical(withoutHash)) fail("complete-cycle candidate result hash mismatch.");
  if (packet.reducer.pathEvolutionInvoked || packet.reducer.eomSolverInvoked) {
    fail("complete-cycle candidate packet crossed the prescribed-path claim boundary.");
  }
  if (packet.status.accepted !== Object.values(packet.gates).every(Boolean)) {
    fail("complete-cycle candidate acceptance differs from its gate rows.");
  }
  if (packet.status.accepted && packet.reducedMeasures === null) {
    fail("accepted complete-cycle candidate lacks reduced measures.");
  }
  if (!packet.status.accepted && packet.reducedMeasures !== null) {
    fail("rejected complete-cycle candidate exposed accepted reduced measures.");
  }
  return packet;
}
