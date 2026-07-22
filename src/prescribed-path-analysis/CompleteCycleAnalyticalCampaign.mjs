import {
  canonicalJson,
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
  "prescribed-record-analytics/complete-cycle-campaign-reducer.v1";

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

function accelerationAt(source, time) {
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

function reduceEndpointPacket(packet, sourceRecord, period) {
  const eventsBySource = new Map(sourceRecord.sources.map((source) => [source.id, []]));
  for (const event of packet.rawLedgers.causalRoots) {
    const source = sourceRecord.sources.find((row) => row.id === event.receiverSourceId);
    if (!source) fail(`endpoint event ${event.eventId} lacks its receiver source.`);
    const response = event.measures.probeResponses.find(
      (row) => row.probePolarity === source.charge,
    );
    if (!response) fail(`endpoint event ${event.eventId} lacks its receiver-polarity response.`);
    const prescribedAcceleration = accelerationAt(source, event.observationTime);
    const mismatch = subtract(prescribedAcceleration, response.acceleration);
    eventsBySource.get(source.id).push({
      eventId: event.eventId,
      observationTime: event.observationTime,
      receiverPosition: event.probePosition,
      receiverVelocity: event.probeVelocity,
      netAccelerationFromOtherSources: response.acceleration,
      prescribedPathAcceleration: prescribedAcceleration,
      partialPrescribedPathMismatch: mismatch,
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
  const receivers = [...eventsBySource.entries()].map(([sourceId, events]) => ({
    sourceId,
    eventCount: events.length,
    accelerationFromOtherSources: reduceVectorSeries(
      events.map((row) => row.netAccelerationFromOtherSources),
      period,
    ),
    partialPrescribedPathMismatch: reduceVectorSeries(
      events.map((row) => row.partialPrescribedPathMismatch),
      period,
    ),
    events,
  }));
  return {
    selfHitPolicy: "exclude-same-source-id.v1",
    implementedContributions: ["acceleration from every other prescribed source"],
    omittedContributions: [
      "same-source self-hit acceleration",
      "Noether-sea response",
      "any other acceleration contribution not present in the prescribed-source evaluator",
    ],
    mismatchDisposition: "partial-prescribed-path-equation-mismatch",
    receivers,
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
      sourceId: source.id,
      selfHitPolicy: "exclude-same-source-id.v1",
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

function evaluateBranchDiagnostics(sourceRecord, protocol, onRawPacket) {
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
  const packet = evaluatePrescribedRecordAnalysis({ sourceRecord, protocol: diagnosticProtocol });
  const artifact = writePacket(onRawPacket, packet, {
    stage: "branch-diagnostics",
    refinement: "primary",
  });
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
    row.sourceId,
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

function evaluateSensitivity({
  baseSpec,
  baseSource,
  baseSurface,
  baseTopologyHash,
  baseEndpoint,
  protocol,
  onRawPacket,
  sourceOptions,
}) {
  const primaryStep = protocol.localSourceSensitivity.primaryStep;
  const refinedStep = protocol.localSourceSensitivity.refinedStep;
  const rows = new Map();
  const rawArtifactInventory = [];
  for (const delta of [-primaryStep, primaryStep, -refinedStep, refinedStep]) {
    const perturbedSpec = perturbDeclaredPrimaryBraidPhaseOffset(baseSpec, delta);
    const sourceRecord = validateExactPrescribedSourceRecord(
      createPrescribedBraidExactSourceRecord(perturbedSpec, sourceOptions),
    );
    const exactSourceArtifact = writePacket(onRawPacket, sourceRecord, {
      stage: "source-sensitivity-exact-source",
      coordinate: "declared-primary-braid-phase-offset",
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
          coordinate: "declared-primary-braid-phase-offset",
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
      coordinate: "declared-primary-braid-phase-offset",
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
          reduceEndpointPacket(endpointPacket, sourceRecord, protocol.completeCycle.period),
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
  for (const sourceId of Object.keys(primaryMinus.metric.endpointRmsBySource)) {
    endpointDerivatives[sourceId] = {
      primary: (
        primaryPlus.metric.endpointRmsBySource[sourceId] -
        primaryMinus.metric.endpointRmsBySource[sourceId]
      ) / (2 * primaryStep),
      refined: (
        refinedPlus.metric.endpointRmsBySource[sourceId] -
        refinedMinus.metric.endpointRmsBySource[sourceId]
      ) / (2 * refinedStep),
    };
    endpointDerivatives[sourceId].uncertainty = Math.abs(
      endpointDerivatives[sourceId].primary - endpointDerivatives[sourceId].refined,
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
    protocol.failClosedGates.quadratureConvergence.sourceSensitivityRelativeOrAbsolute;
  const accepted = allAccepted && topologyMatch && maximumUncertainty <= threshold;
  return {
    coordinateId: "declared-primary-braid-phase-offset",
    coordinatePath: "braids[0].phaseOffset",
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
  return {
    rootPolicy: "all-retained-simple-roots/sub-field-speed-certified.v1",
    topologyIdentity: "transmitter-id plus root ordinal",
    transitions,
    foldEvents: [],
    foldDisposition:
      "inapplicable inside the certified strictly sub-field-speed simple-root domain; fail before evaluation if the domain is crossed",
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
  onProgress = null,
} = {}) {
  const sourceRecord = validateExactPrescribedSourceRecord(rawSourceRecord);
  const protocol = validateB1CompleteCycleProbeProtocol(rawProtocol);
  const completeCycleProtocolHash = sha256Canonical(protocol);
  const sourceHash = sha256Canonical(sourceRecord);
  const surfaceTopology = [];
  onProgress?.({ candidateId, stage: "surface-reduction-start" });
  const surface = evaluateB1StreamingSurfaceReductions({
    sourceRecord,
    completeCycleProtocol: protocol,
    onSurfacePacket(packet, context) {
      const signature = topologySignature(packet);
      const topologyHash = sha256Canonical(signature);
      surfaceTopology.push(...signature);
      const artifact = writePacket(onRawPacket, packet, {
        ...context,
        stage: "complete-cycle-surface",
      });
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
    const packet = evaluatePrescribedRecordAnalysis({ sourceRecord, protocol: fixedProtocol });
    internalFixed[resolution] = {
      packet,
      artifact: writePacket(onRawPacket, packet, {
        stage: "complete-cycle-internal-fixed",
        refinement: resolution,
      }),
    };
  }
  onProgress?.({ candidateId, stage: "moving-receivers-start" });
  const internalReceivers = {};
  for (const resolution of ["primary", "refined"]) {
    const endpointProtocol = buildEndpointProtocol(protocol, sourceRecord, resolution);
    const packet = evaluatePrescribedRecordAnalysis({ sourceRecord, protocol: endpointProtocol });
    internalReceivers[resolution] = {
      artifact: writePacket(onRawPacket, packet, {
        stage: "complete-cycle-moving-receivers",
        refinement: resolution,
      }),
      reduction: reduceEndpointPacket(packet, sourceRecord, protocol.completeCycle.period),
      validity: packet.reducedMeasures.validity,
      resultHash: packet.resultHash,
    };
  }
  onProgress?.({ candidateId, stage: "branch-diagnostics-start" });
  const branchDiagnostics = evaluateBranchDiagnostics(sourceRecord, protocol, onRawPacket);
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
    sourceSensitivity: sensitivity.accepted,
  };
  const accepted = Object.values(gates).every(Boolean);
  const packetWithoutHash = {
    schema: COMPLETE_CYCLE_CANDIDATE_RESULT_SCHEMA,
    reducer: {
      id: COMPLETE_CYCLE_CAMPAIGN_REDUCER_VERSION,
      eventEvaluator: "evaluatePrescribedRecordAnalysis({ sourceRecord, protocol })",
      surfaceReducer: surface.reducer,
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
        primaryResultHash: internalFixed.primary.packet.resultHash,
        refinedResultHash: internalFixed.refined.packet.resultHash,
      },
      internalReceivers,
      branchDiagnostics,
      rootTopology: topologyLedger(surface),
      sourceSensitivity: sensitivity,
      symmetryResiduals: {
        status: "inapplicable-with-reason",
        reason:
          "the exact source-record schema contains no machine-readable chart-symmetry transform and probe mapping",
      },
    },
    convergenceComparisons: {
      surface: surface.convergenceComparisons,
      sourceSensitivity: sensitivity,
    },
    reducedMeasures: accepted
      ? {
          surface: surface.reducedMeasures,
          internalReceiverWakeAndAcceleration: internalReceivers.primary.reduction,
          branchDiagnostics,
          rootTopology: topologyLedger(surface),
          sourceSensitivity: sensitivity,
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
