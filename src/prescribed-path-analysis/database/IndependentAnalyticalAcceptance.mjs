import { createHash } from "node:crypto";

import {
  canonicalJson,
  sha256Canonical,
} from "../AnalyticalBraidEvaluator.mjs";

export const INDEPENDENT_ACCEPTANCE_INSTRUMENT_VERSION =
  "prescribed-record-independent-acceptance/v2";

const RESULT_PACKET_SCHEMA = "prescribed-path-analysis/result-packet.v1";
const PROTOCOL_SCHEMA = "prescribed-path-analysis/analysis-protocol.v1";
const COMPLETE_CYCLE_RESULT_SCHEMA =
  "prescribed-path-analysis/complete-cycle-candidate-result.v1";
const COMPLETE_CYCLE_PROTOCOL_SCHEMA =
  "prescribed-path-analysis/complete-cycle-probe-protocol.v1";
const ROOT_POLICY = "all-retained-simple-roots/sub-field-speed-certified.v1";
const REQUIRED_EXCLUDED_CLAIMS = Object.freeze([
  "stability",
  "energy",
  "retention",
  "physical-realization",
]);
const CORE_GATE_IDS = Object.freeze([
  "source-speed",
  "root-completeness",
  "root-transversality",
  "minimum-separation",
  "numerical-convergence",
]);

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function withoutField(value, field) {
  const copy = structuredClone(value);
  delete copy[field];
  return copy;
}

function finite(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function closeEnough(left, right) {
  if (!finite(left) || !finite(right)) return false;
  const scale = Math.max(1, Math.abs(left), Math.abs(right));
  return Math.abs(left - right) <= 64 * Number.EPSILON * scale;
}

function vectorClose(left, right) {
  return left && right && ["x", "y", "z"].every(
    (component) => closeEnough(left[component], right[component]),
  );
}

function canonicalEqual(left, right) {
  try {
    return canonicalJson(left) === canonicalJson(right);
  } catch {
    return false;
  }
}

function hashLooksValid(value) {
  return typeof value === "string" && /^[0-9a-f]{64}$/.test(value);
}

function uniqueStrings(values) {
  return Array.isArray(values) && values.every(
    (value) => typeof value === "string" && value.length > 0,
  ) && new Set(values).size === values.length;
}

function expectedTransmitterIds(packet) {
  const vector = packet.source?.parameterVector;
  if (Array.isArray(vector?.sources)) {
    const ids = vector.sources.map((source) => source?.id);
    return uniqueStrings(ids) ? ids : null;
  }
  if (Array.isArray(vector?.braids)) {
    const ids = vector.braids.flatMap((braid) =>
      Array.isArray(braid?.binaries)
        ? braid.binaries.flatMap((binary) => binary?.worldlineIds ?? [])
        : [],
    );
    return uniqueStrings(ids) ? ids : null;
  }
  return null;
}

function expectedEventDefinitions(protocol) {
  if (!Array.isArray(protocol?.probes)) return null;
  const definitions = [];
  for (const probe of protocol.probes) {
    if (typeof probe?.id !== "string" || !Array.isArray(probe.observationTimes) ||
        !Array.isArray(probe.polarities) ||
        !uniqueStrings(probe.polarities.map(String))) {
      return null;
    }
    for (const observationTime of probe.observationTimes) {
      if (!finite(observationTime)) return null;
      definitions.push({
        eventId: `${probe.id}@${observationTime}`,
        probeId: probe.id,
        observationTime,
        polarities: probe.polarities,
      });
    }
  }
  return definitions;
}

function gateEvidenceHash(gate) {
  return sha256Canonical({
    instrumentVersion: INDEPENDENT_ACCEPTANCE_INSTRUMENT_VERSION,
    ...gate,
  });
}

function makeGate({
  gateId,
  passed,
  measuredValue = null,
  comparator,
  thresholdValue = null,
  failureCode = null,
  details = {},
}) {
  const gate = {
    gateId,
    passed: Boolean(passed),
    measuredValue,
    comparator,
    thresholdValue,
    failureCode: passed ? null : failureCode,
    details,
  };
  return { ...gate, evidenceHash: gateEvidenceHash(gate) };
}

function responseMap(rows) {
  if (!Array.isArray(rows)) return null;
  const map = new Map();
  for (const row of rows) {
    if (!finite(row?.probePolarity) || !row.acceleration ||
        !["x", "y", "z"].every((key) => finite(row.acceleration[key])) ||
        map.has(row.probePolarity)) {
      return null;
    }
    map.set(row.probePolarity, row.acceleration);
  }
  return map;
}

function sumEventMeasures(event, polarities, cancellationFloor) {
  let signedWake = 0;
  let unsignedWake = 0;
  let maximumRootResidual = 0;
  let rootTransversalityMargin = null;
  const acceleration = new Map(
    polarities.map((polarity) => [polarity, { x: 0, y: 0, z: 0 }]),
  );
  for (const root of event.roots) {
    signedWake += root.signedWakeContribution;
    unsignedWake += root.unsignedWakeContribution;
    maximumRootResidual = Math.max(maximumRootResidual, Math.abs(root.residual));
    rootTransversalityMargin = rootTransversalityMargin === null
      ? root.rootTransversalityMargin
      : Math.min(rootTransversalityMargin, root.rootTransversalityMargin);
    const responses = responseMap(root.probeAccelerationContributions);
    if (!responses) return null;
    for (const polarity of polarities) {
      const row = responses.get(polarity);
      if (!row) return null;
      const sum = acceleration.get(polarity);
      sum.x += row.x;
      sum.y += row.y;
      sum.z += row.z;
    }
  }
  return {
    signedWake,
    unsignedWake,
    signedCancellationRatio:
      Math.abs(signedWake) / (unsignedWake + cancellationFloor),
    probeResponses: polarities.map((probePolarity) => ({
      probePolarity,
      acceleration: acceleration.get(probePolarity),
    })),
    rootTransversalityMargin,
    maximumRootResidual,
  };
}

function eventProjectionMatches(event, reducedEvent, derived) {
  if (!derived || !event.measures || !reducedEvent) return false;
  const scalarFields = [
    "signedWake",
    "unsignedWake",
    "signedCancellationRatio",
    "maximumRootResidual",
  ];
  if (!scalarFields.every((field) =>
    closeEnough(event.measures[field], derived[field]) &&
    closeEnough(reducedEvent[field], derived[field]))) {
    return false;
  }
  const marginMatches = derived.rootTransversalityMargin === null
    ? event.measures.rootTransversalityMargin === null &&
      reducedEvent.rootTransversalityMargin === null
    : closeEnough(event.measures.rootTransversalityMargin, derived.rootTransversalityMargin) &&
      closeEnough(reducedEvent.rootTransversalityMargin, derived.rootTransversalityMargin);
  if (!marginMatches) return false;
  for (const derivedResponse of derived.probeResponses) {
    const rawResponse = event.measures.probeResponses?.find(
      (row) => row.probePolarity === derivedResponse.probePolarity,
    );
    const reducedResponse = reducedEvent.probeResponses?.find(
      (row) => row.probePolarity === derivedResponse.probePolarity,
    );
    if (!vectorClose(rawResponse?.acceleration, derivedResponse.acceleration) ||
        !vectorClose(reducedResponse?.acceleration, derivedResponse.acceleration)) {
      return false;
    }
  }
  return event.rootCount === event.roots.length &&
    event.noRootCount === event.noRootTransmitters.length &&
    reducedEvent.rootCount === event.roots.length &&
    reducedEvent.noRootCount === event.noRootTransmitters.length;
}

function minimumLedger(rows, expectedIds) {
  if (!Array.isArray(rows)) return null;
  const expectedPairCount = expectedIds.length * (expectedIds.length - 1) / 2;
  if (rows.length !== expectedPairCount) return null;
  const pairIds = new Set();
  const observedPairs = new Set();
  const expectedPairs = new Set();
  for (let left = 0; left < expectedIds.length; left += 1) {
    for (let right = left + 1; right < expectedIds.length; right += 1) {
      expectedPairs.add([expectedIds[left], expectedIds[right]].sort().join("\u0000"));
    }
  }
  let minimum = Number.POSITIVE_INFINITY;
  let minimumRow = null;
  let certifiedContinuousLowerBound = Number.POSITIVE_INFINITY;
  let certificateRow = null;
  for (const row of rows) {
    const pairKey = [row?.leftTransmitterId, row?.rightTransmitterId]
      .sort().join("\u0000");
    if (typeof row?.pairId !== "string" || pairIds.has(row.pairId) ||
        observedPairs.has(pairKey) || !expectedPairs.has(pairKey) ||
        !expectedIds.includes(row.leftTransmitterId) ||
        !expectedIds.includes(row.rightTransmitterId) ||
        row.leftTransmitterId === row.rightTransmitterId ||
        !finite(row.minimumSeparation) || row.minimumSeparation < 0 ||
        !finite(row.firstMinimumSampleTime) ||
        !finite(row.relativeSpeedUpperBound) || row.relativeSpeedUpperBound < 0 ||
        typeof row.relativePeriodClosed !== "boolean" ||
        !finite(row.relativePeriodClosureResidual) ||
        row.relativePeriodClosureResidual < 0 ||
        !finite(row.relativePeriodClosureTolerance) ||
        row.relativePeriodClosureTolerance < 0 ||
        row.relativePeriodClosed !==
          (row.relativePeriodClosureResidual <= row.relativePeriodClosureTolerance) ||
        !finite(row.sampleCoveringRadius) || row.sampleCoveringRadius < 0 ||
        !finite(row.continuousLowerBound) || row.continuousLowerBound < 0 ||
        row.certificateRule !== "periodic-sample-lipschitz-lower-bound.v1" ||
        !closeEnough(
          row.continuousLowerBound,
          Math.max(
            0,
            row.minimumSeparation -
              row.relativeSpeedUpperBound * row.sampleCoveringRadius,
          ),
        )) {
      return null;
    }
    pairIds.add(row.pairId);
    observedPairs.add(pairKey);
    if (row.minimumSeparation < minimum) {
      minimum = row.minimumSeparation;
      minimumRow = row;
    }
    if (row.continuousLowerBound < certifiedContinuousLowerBound) {
      certifiedContinuousLowerBound = row.continuousLowerBound;
      certificateRow = row;
    }
  }
  if (observedPairs.size !== expectedPairs.size) return null;
  return {
    minimum,
    minimumRow,
    certifiedContinuousLowerBound,
    certificateRow,
    rowCount: rows.length,
  };
}

function convergenceMaximum(packet) {
  const rows = packet.rawLedgers?.numericalConvergence;
  if (!Array.isArray(rows)) return null;
  let maximum = 0;
  let identitiesMatch = true;
  for (const row of rows) {
    const scalars = [
      row.maximumEmissionTimeChange,
      row.signedWakeChange,
      row.unsignedWakeChange,
      row.signedCancellationRatioChange,
      row.maximumProbeAccelerationComponentChange,
      ...(row.responseChanges ?? []).map((entry) => entry.maximumComponentChange),
    ];
    if (!scalars.every((value) => finite(value) && value >= 0)) return null;
    maximum = Math.max(maximum, ...scalars);
    identitiesMatch = identitiesMatch && row.rootIdentityMatch === true;
  }
  return { maximum, identitiesMatch, rowCount: rows.length };
}

function closureProjectionMatches(packet, expectedIds) {
  const rows = packet.rawLedgers?.prescribedPeriodClosure;
  const reduced = packet.reducedMeasures?.prescribedPeriodClosure;
  if (!Array.isArray(rows) || rows.length !== expectedIds.length || !reduced) return false;
  const ids = rows.map((row) => row.transmitterId);
  if (!uniqueStrings(ids) || ids.some((id) => !expectedIds.includes(id))) return false;
  const positionNorms = rows.map((row) => Math.hypot(
    row.positionResidual?.x,
    row.positionResidual?.y,
    row.positionResidual?.z,
  ));
  const velocityNorms = rows.map((row) => Math.hypot(
    row.velocityResidual?.x,
    row.velocityResidual?.y,
    row.velocityResidual?.z,
  ));
  const maximumPosition = Math.max(...positionNorms);
  const maximumVelocity = Math.max(...velocityNorms);
  const maximumPhase = Math.max(...rows.map((row) => Math.abs(row.phaseResidual)));
  return rows.every((row, index) =>
    finite(row.positionResidualNorm) && finite(row.velocityResidualNorm) &&
    finite(row.phaseResidual) && vectorClose(row.positionResidual, row.positionResidual) &&
    vectorClose(row.velocityResidual, row.velocityResidual) &&
    closeEnough(row.positionResidualNorm, positionNorms[index]) &&
    closeEnough(row.velocityResidualNorm, velocityNorms[index])) &&
    closeEnough(reduced.maximumPositionResidual, maximumPosition) &&
    closeEnough(reduced.maximumVelocityResidual, maximumVelocity) &&
    closeEnough(reduced.maximumPhaseResidual, maximumPhase);
}

function verifyCompleteCyclePacketAcceptance(packet, rawBytes, options) {
  const artifactHash = sha256Bytes(rawBytes);
  const claimedResultHash = packet.resultHash;
  const computedResultHash = sha256Canonical(withoutField(packet, "resultHash"));
  const computedProtocolHash = sha256Canonical(packet.completeCycleProtocol);
  const identityPassed = hashLooksValid(claimedResultHash) &&
    claimedResultHash === computedResultHash &&
    hashLooksValid(packet.source?.sourceHash) &&
    packet.source.sourceHash === packet.source.exactSourceRecordHash &&
    hashLooksValid(packet.completeCycleProtocolHash) &&
    packet.completeCycleProtocolHash === computedProtocolHash &&
    (!options.expectedProtocolHash ||
      packet.completeCycleProtocolHash === options.expectedProtocolHash);
  const boundaryPassed = packet.schema === COMPLETE_CYCLE_RESULT_SCHEMA &&
    packet.completeCycleProtocol?.schema === COMPLETE_CYCLE_PROTOCOL_SCHEMA &&
    packet.completeCycleProtocol?.eventEvaluator?.rootPolicy?.id === ROOT_POLICY &&
    packet.reducer?.pathEvolutionInvoked === false &&
    packet.reducer?.eomSolverInvoked === false &&
    packet.claimGrade === "derived" &&
    canonicalEqual(packet.excludedClaims, REQUIRED_EXCLUDED_CLAIMS);
  const gateEntries = Object.entries(packet.gates ?? {});
  const gateInventoryPassed = gateEntries.length === 7 &&
    gateEntries.every(([id, passed]) => typeof id === "string" && typeof passed === "boolean");
  const derivedAccepted = gateInventoryPassed && gateEntries.every(([, passed]) => passed);
  const producerStatusConsistencyPassed =
    packet.status?.accepted === derivedAccepted &&
    packet.status?.disposition === (derivedAccepted ? "accepted" : "diagnostic-only") &&
    canonicalEqual(
      packet.status?.failedGates,
      gateEntries.filter(([, passed]) => !passed).map(([id]) => id),
    ) &&
    (derivedAccepted ? packet.reducedMeasures !== null : packet.reducedMeasures === null);
  const rawArtifacts = packet.rawArtifactInventory;
  const rawArtifactInventoryPassed = Array.isArray(rawArtifacts) &&
    rawArtifacts.length > 0 &&
    rawArtifacts.every((row) =>
      hashLooksValid(row?.rawSha256) &&
      hashLooksValid(row?.compressedSha256) &&
      row.codec === "gzip" &&
      typeof row.path === "string" &&
      Number.isSafeInteger(row.rawBytes) && row.rawBytes > 0 &&
      Number.isSafeInteger(row.storedBytes) && row.storedBytes > 0);
  const surface = packet.diagnosticReductions?.surface?.surface;
  const surfaceProjectionPassed = ["primary", "refined"].every((resolution) =>
    Array.isArray(surface?.[resolution]) &&
    surface[resolution].length === packet.completeCycleProtocol.enclosingSurfaces.radii.length &&
    surface[resolution].every((row) =>
      row.wakeFlux?.rawEmissionReference?.passed === true &&
      row.wakeFlux?.signedEmissionReference?.passed === true));
  const projectionConsistencyPassed = gateInventoryPassed &&
    rawArtifactInventoryPassed && surfaceProjectionPassed;
  const structuralPassed = identityPassed && boundaryPassed &&
    projectionConsistencyPassed && producerStatusConsistencyPassed;
  const gates = [
    makeGate({
      gateId: "identity-and-boundary",
      passed: identityPassed && boundaryPassed,
      comparator: "all-contract-checks-pass",
      failureCode: "identity-or-boundary-invalid",
      details: { artifactHash, claimedResultHash, computedResultHash },
    }),
    makeGate({
      gateId: "source-speed",
      passed: structuralPassed,
      comparator: "retained-raw-artifact-and-producer-gate",
      failureCode: "source-speed-evidence-invalid",
    }),
    makeGate({
      gateId: "root-completeness",
      passed: structuralPassed,
      comparator: "retained-raw-artifact-and-producer-gate",
      failureCode: "root-completeness-evidence-invalid",
    }),
    makeGate({
      gateId: "projection-consistency",
      passed: projectionConsistencyPassed,
      comparator: "raw-artifact-inventory-and-reference-projections-complete",
      failureCode: "projection-consistency-failed",
    }),
    makeGate({
      gateId: "producer-status-consistency",
      passed: producerStatusConsistencyPassed,
      comparator: "status-equals-derived-complete-cycle-gates",
      failureCode: "producer-status-inconsistent",
    }),
    ...gateEntries.map(([gateId, passed]) => makeGate({
      gateId: `complete-cycle/${gateId}`,
      passed,
      comparator: "producer-gate-pass",
      failureCode: `complete-cycle-${gateId}-failed`,
    })),
  ];
  const accepted = structuralPassed && derivedAccepted;
  const failureCodes = gates.filter((gate) => !gate.passed)
    .map((gate) => gate.failureCode).sort();
  const evidenceWithoutHash = {
    schema: "prescribed-record-analytics/independent-case-acceptance.v1",
    instrumentVersion: INDEPENDENT_ACCEPTANCE_INSTRUMENT_VERSION,
    evidenceScope:
      "structural acceptance; mathematical correctness is supplied by separately authored closed-form tests",
    resultHash: claimedResultHash ?? null,
    artifactHash,
    protocolHash: packet.completeCycleProtocolHash ?? null,
    sourceHash: packet.source?.sourceHash ?? null,
    accepted,
    coreGateIds: CORE_GATE_IDS,
    gates,
    failureCodes,
  };
  const evidenceHash = sha256Canonical(evidenceWithoutHash);
  return {
    packet,
    artifactHash,
    resultHash: claimedResultHash,
    protocolHash: packet.completeCycleProtocolHash,
    sourceHash: packet.source?.sourceHash,
    accepted,
    gates,
    failureCodes,
    evidenceHash,
    evidence: { ...evidenceWithoutHash, evidenceHash },
  };
}

export function verifyIndependentCaseAcceptance(packetBytes, options = {}) {
  const rawBytes = Buffer.isBuffer(packetBytes)
    ? packetBytes
    : Buffer.from(packetBytes);
  let packet;
  try {
    packet = JSON.parse(rawBytes.toString("utf8"));
  } catch (error) {
    throw new TypeError(`result packet is not valid JSON: ${error.message}`);
  }
  if (packet.schema === COMPLETE_CYCLE_RESULT_SCHEMA) {
    return verifyCompleteCyclePacketAcceptance(packet, rawBytes, options);
  }

  const issues = [];
  const addIssue = (code) => {
    if (!issues.includes(code)) issues.push(code);
  };
  const artifactHash = sha256Bytes(rawBytes);
  const claimedResultHash = packet.resultHash;
  const computedResultHash = sha256Canonical(withoutField(packet, "resultHash"));
  const computedProtocolHash = sha256Canonical(packet.protocol);
  const identityPassed = hashLooksValid(claimedResultHash) &&
    claimedResultHash === computedResultHash &&
    hashLooksValid(packet.source?.sourceHash) &&
    hashLooksValid(packet.protocolHash) &&
    packet.protocolHash === computedProtocolHash &&
    (!options.expectedProtocolHash || packet.protocolHash === options.expectedProtocolHash);
  if (!identityPassed) addIssue("identity-hash-mismatch");

  const boundaryPassed = packet.schema === RESULT_PACKET_SCHEMA &&
    packet.protocol?.schema === PROTOCOL_SCHEMA &&
    packet.protocol?.rootPolicy?.id === ROOT_POLICY &&
    packet.evaluator?.pathEvolutionInvoked === false &&
    packet.evaluator?.eomSolverInvoked === false &&
    packet.claimGrade === "derived" &&
    canonicalEqual(packet.excludedClaims, REQUIRED_EXCLUDED_CLAIMS);
  if (!boundaryPassed) addIssue("analytical-boundary-invalid");

  const expectedIds = expectedTransmitterIds(packet);
  const expectedEvents = expectedEventDefinitions(packet.protocol);
  const rawEvents = packet.rawLedgers?.causalRoots;
  const reducedEvents = packet.reducedMeasures?.events;
  const inventoryShapePassed = expectedIds && expectedEvents &&
    Array.isArray(rawEvents) && Array.isArray(reducedEvents) &&
    rawEvents.length === expectedEvents.length &&
    reducedEvents.length === expectedEvents.length;
  if (!inventoryShapePassed) addIssue("event-or-transmitter-inventory-invalid");

  let sourceSpeedMargin = Number.POSITIVE_INFINITY;
  let sourceSpeedPassed = Boolean(inventoryShapePassed);
  let rootCompletenessPassed = Boolean(inventoryShapePassed);
  let rootTransversalityMargin = Number.POSITIVE_INFINITY;
  let rootTransversalityPassed = Boolean(inventoryShapePassed);
  let eventProjectionsPassed = Boolean(inventoryShapePassed);

  if (inventoryShapePassed) {
    for (let index = 0; index < rawEvents.length; index += 1) {
      const event = rawEvents[index];
      const definition = expectedEvents[index];
      const reducedEvent = reducedEvents[index];
      const roots = Array.isArray(event?.roots) ? event.roots : [];
      const noRoots = Array.isArray(event?.noRootTransmitters)
        ? event.noRootTransmitters
        : [];
      const observedIds = [
        ...roots.map((root) => root.transmitterId),
        ...noRoots.map((row) => row.transmitterId),
      ];
      const eventIdentityPassed = event?.eventId === definition.eventId &&
        event?.probeId === definition.probeId &&
        closeEnough(event?.observationTime, definition.observationTime) &&
        reducedEvent?.eventId === definition.eventId;
      const coveragePassed = uniqueStrings(observedIds) &&
        canonicalEqual([...observedIds].sort(), [...expectedIds].sort()) &&
        event.rootCount === roots.length && event.noRootCount === noRoots.length;
      rootCompletenessPassed = rootCompletenessPassed && eventIdentityPassed &&
        coveragePassed;

      for (const root of roots) {
        const rootNumbersPassed = root.rootStatus === "retained-simple-root" &&
          root.rootOrdinal === 0 && finite(root.residual) &&
          Math.abs(root.residual) <= packet.protocol.rootPolicy.tolerance &&
          finite(root.certifiedSpeedBound) &&
          finite(root.certifiedMonotonicityMargin) &&
          finite(root.transmitterSideFactorDt) && root.transmitterSideFactorDt > 0 &&
          finite(root.rootTransversalityMargin) &&
          closeEnough(
            root.rootTransversalityMargin,
            Math.abs(root.transmitterSideFactorDt),
          ) && finite(root.signedWakeContribution) &&
          finite(root.unsignedWakeContribution) && root.unsignedWakeContribution >= 0;
        if (!rootNumbersPassed) {
          sourceSpeedPassed = false;
          rootCompletenessPassed = false;
          rootTransversalityPassed = false;
          continue;
        }
        const margin = packet.protocol.fieldSpeed - root.certifiedSpeedBound;
        sourceSpeedMargin = Math.min(
          sourceSpeedMargin,
          margin,
          root.certifiedMonotonicityMargin,
        );
        sourceSpeedPassed = sourceSpeedPassed && margin > 0 &&
          root.certifiedMonotonicityMargin > 0 &&
          closeEnough(root.certifiedMonotonicityMargin, margin);
        rootTransversalityMargin = Math.min(
          rootTransversalityMargin,
          root.rootTransversalityMargin,
        );
        rootTransversalityPassed = rootTransversalityPassed &&
          root.rootTransversalityMargin >=
            packet.protocol.tolerances.rootTransversalityFloor;
        const responses = responseMap(root.probeAccelerationContributions);
        if (!responses || !canonicalEqual(
          [...responses.keys()],
          definition.polarities,
        )) {
          rootCompletenessPassed = false;
        }
      }
      for (const noRoot of noRoots) {
        const margin = packet.protocol.fieldSpeed - noRoot.certifiedSpeedBound;
        const reasonMatchesEndpointSigns =
          (noRoot.reason === "root_precedes_retained_history" &&
            noRoot.endpointResiduals?.[0] > packet.protocol.rootPolicy.tolerance) ||
          (noRoot.reason === "root_follows_retained_history" &&
            noRoot.endpointResiduals?.[1] < -packet.protocol.rootPolicy.tolerance);
        const rowPassed = noRoot.rootCount === 0 &&
          typeof noRoot.reason === "string" &&
          Array.isArray(noRoot.endpointResiduals) &&
          noRoot.endpointResiduals.length === 2 &&
          noRoot.endpointResiduals.every(finite) &&
          finite(noRoot.certifiedSpeedBound) &&
          finite(noRoot.certifiedMonotonicityMargin) &&
          margin > 0 && noRoot.certifiedMonotonicityMargin > 0 &&
          closeEnough(noRoot.certifiedMonotonicityMargin, margin) &&
          reasonMatchesEndpointSigns;
        sourceSpeedMargin = Math.min(
          sourceSpeedMargin,
          margin,
          noRoot.certifiedMonotonicityMargin,
        );
        sourceSpeedPassed = sourceSpeedPassed && rowPassed;
        rootCompletenessPassed = rootCompletenessPassed && rowPassed;
      }
      const derived = sumEventMeasures(
        event,
        definition.polarities,
        packet.protocol.tolerances.cancellationFloor,
      );
      eventProjectionsPassed = eventProjectionsPassed &&
        eventProjectionMatches(event, reducedEvent, derived);
    }
  }

  if (sourceSpeedMargin === Number.POSITIVE_INFINITY) {
    sourceSpeedMargin = null;
  }
  if (rootTransversalityMargin === Number.POSITIVE_INFINITY) {
    rootTransversalityMargin = null;
  }
  if (!sourceSpeedPassed) addIssue("source-speed-gate-failed");
  if (!rootCompletenessPassed) addIssue("root-completeness-gate-failed");
  if (!rootTransversalityPassed) addIssue("root-transversality-gate-failed");

  const primaryMinimum = expectedIds
    ? minimumLedger(packet.rawLedgers?.minimumSeparation, expectedIds)
    : null;
  const refinedMinimum = expectedIds
    ? minimumLedger(packet.rawLedgers?.refinedMinimumSeparation, expectedIds)
    : null;
  const minimumSeparationPassed = Boolean(primaryMinimum) &&
    primaryMinimum.certifiedContinuousLowerBound >=
      packet.protocol?.tolerances?.minimumSeparationFloor;
  if (!minimumSeparationPassed) addIssue("minimum-separation-gate-failed");

  const convergence = primaryMinimum && refinedMinimum
    ? convergenceMaximum(packet)
    : null;
  const numericalConvergencePassed = Boolean(convergence) &&
    convergence.identitiesMatch &&
    convergence.rowCount === expectedEvents?.length &&
    convergence.maximum <= packet.protocol?.tolerances?.convergenceAbsolute;
  if (!numericalConvergencePassed) addIssue("numerical-convergence-gate-failed");

  const expectedValidity = {
    rootTopologyComplete: rootCompletenessPassed,
    rootTransversalityPassed,
    minimumSeparationPassed,
    numericalConvergencePassed,
    passed: sourceSpeedPassed && rootCompletenessPassed &&
      rootTransversalityPassed && minimumSeparationPassed &&
      numericalConvergencePassed,
  };
  const minimumProjectionPassed = Boolean(primaryMinimum) &&
    closeEnough(
      packet.reducedMeasures?.minimumSeparation?.value,
      primaryMinimum.minimum,
    ) && packet.reducedMeasures?.minimumSeparation?.pairId ===
      primaryMinimum.minimumRow.pairId &&
    closeEnough(
      packet.reducedMeasures?.minimumSeparation?.certifiedContinuousLowerBound,
      primaryMinimum.certifiedContinuousLowerBound,
    ) && packet.reducedMeasures?.minimumSeparation?.certificatePairId ===
      primaryMinimum.certificateRow.pairId &&
    packet.reducedMeasures?.minimumSeparation?.certificateRule ===
      "periodic-sample-lipschitz-lower-bound.v1";
  const convergenceProjectionPassed = Boolean(convergence) &&
    closeEnough(
      packet.reducedMeasures?.numericalConvergence?.maximumReportedChange,
      convergence.maximum,
    ) && packet.reducedMeasures?.numericalConvergence?.passed ===
      numericalConvergencePassed;
  const rootMarginProjectionPassed = rootTransversalityMargin === null
    ? packet.reducedMeasures?.rootTransversalityMargin === null
    : closeEnough(
      packet.reducedMeasures?.rootTransversalityMargin,
      rootTransversalityMargin,
    );
  const projectionConsistencyPassed = eventProjectionsPassed &&
    minimumProjectionPassed && convergenceProjectionPassed &&
    rootMarginProjectionPassed &&
    rawEvents?.every((event) =>
      event.rootCompletenessCertification?.policy === ROOT_POLICY &&
      event.rootCompletenessCertification?.complete === true) &&
    canonicalEqual(packet.reducedMeasures?.validity, expectedValidity) &&
    canonicalEqual(packet.probeDefinitions, packet.protocol?.probes) &&
    closureProjectionMatches(packet, expectedIds ?? []);
  if (!projectionConsistencyPassed) addIssue("projection-consistency-failed");

  const expectedProducerStatusCode = expectedValidity.passed
    ? "ok"
    : "analytical_validity_gate_failed";
  const producerStatusConsistencyPassed =
    packet.status?.code === expectedProducerStatusCode;
  if (!producerStatusConsistencyPassed) addIssue("producer-status-inconsistent");

  const gates = [
    makeGate({
      gateId: "identity-and-boundary",
      passed: identityPassed && boundaryPassed,
      comparator: "all-contract-checks-pass",
      failureCode: "identity-or-boundary-invalid",
      details: { artifactHash, claimedResultHash, computedResultHash },
    }),
    makeGate({
      gateId: "source-speed",
      passed: sourceSpeedPassed,
      measuredValue: sourceSpeedMargin,
      comparator: ">",
      thresholdValue: 0,
      failureCode: "source-speed-gate-failed",
    }),
    makeGate({
      gateId: "root-completeness",
      passed: rootCompletenessPassed,
      measuredValue: inventoryShapePassed ? expectedIds.length : null,
      comparator: "exact-transmitter-coverage",
      thresholdValue: inventoryShapePassed ? expectedIds.length : null,
      failureCode: "root-completeness-gate-failed",
    }),
    makeGate({
      gateId: "root-transversality",
      passed: rootTransversalityPassed,
      measuredValue: rootTransversalityMargin,
      comparator: ">=",
      thresholdValue: packet.protocol?.tolerances?.rootTransversalityFloor ?? null,
      failureCode: "root-transversality-gate-failed",
    }),
    makeGate({
      gateId: "minimum-separation",
      passed: minimumSeparationPassed,
      measuredValue: primaryMinimum?.certifiedContinuousLowerBound ?? null,
      comparator: ">=",
      thresholdValue: packet.protocol?.tolerances?.minimumSeparationFloor ?? null,
      failureCode: "minimum-separation-gate-failed",
      details: {
        sampledMinimum: primaryMinimum?.minimum ?? null,
        certificateRule: "periodic-sample-lipschitz-lower-bound.v1",
      },
    }),
    makeGate({
      gateId: "numerical-convergence",
      passed: numericalConvergencePassed,
      measuredValue: convergence?.maximum ?? null,
      comparator: "<=-and-identities-match",
      thresholdValue: packet.protocol?.tolerances?.convergenceAbsolute ?? null,
      failureCode: "numerical-convergence-gate-failed",
      details: { identitiesMatch: convergence?.identitiesMatch ?? false },
    }),
    makeGate({
      gateId: "projection-consistency",
      passed: projectionConsistencyPassed,
      comparator: "raw-ledgers-equal-reduced-projections",
      failureCode: "projection-consistency-failed",
    }),
    makeGate({
      gateId: "producer-status-consistency",
      passed: producerStatusConsistencyPassed,
      comparator: "producer-status-equals-derived-validity-status",
      failureCode: "producer-status-inconsistent",
      details: {
        expectedStatusCode: expectedProducerStatusCode,
        observedStatusCode: packet.status?.code ?? null,
      },
    }),
  ];
  const accepted = gates.every((gate) => gate.passed);
  const evidenceWithoutHash = {
    schema: "prescribed-record-analytics/independent-case-acceptance.v1",
    instrumentVersion: INDEPENDENT_ACCEPTANCE_INSTRUMENT_VERSION,
    resultHash: claimedResultHash ?? null,
    artifactHash,
    protocolHash: packet.protocolHash ?? null,
    sourceHash: packet.source?.sourceHash ?? null,
    accepted,
    coreGateIds: CORE_GATE_IDS,
    gates,
    failureCodes: issues.sort(),
  };
  const evidenceHash = sha256Canonical(evidenceWithoutHash);
  return {
    packet,
    artifactHash,
    resultHash: claimedResultHash,
    protocolHash: packet.protocolHash,
    sourceHash: packet.source?.sourceHash,
    accepted,
    gates,
    failureCodes: issues.sort(),
    evidenceHash,
    evidence: { ...evidenceWithoutHash, evidenceHash },
  };
}
