import {
  buildA11OrderedChannelInventory,
  createA11EmissionFixedProjectionEvaluator,
  createA11InterBinaryRootFoldEvaluator,
  sha256A11Interval,
  validateA11ContinuousRootInventoryProtocol,
} from "./A11ContinuousRootIntervalCertifier.mjs";
import {
  recomputeA11SquaredCausalResidual,
} from "./A11IndependentResidualRecomputation.mjs";
import {
  applyA11RootSheetExecutionLimits,
  certifyA11RootSheetAnchorInventory,
  certifyA11RootSheetRepresentativeNoFold,
  evaluateA11RootSheetMonotonicEnclosureTreatment,
  runA11RootSheetEndpointAndSeamControl,
  runA11RootSheetResourceExhaustionControl,
  runA11RootSheetSyntheticFoldControl,
  summarizeA11RootSheetMonotonicEnclosureTreatment,
} from "./A11RootSheetMonotonicEnclosureCertifier.mjs";
import {
  certifyA11ProjectionAnalyticRepresentative,
  certifyA11ProjectionRepresentativeInterval,
  evaluateA11ReceiverPhaseProjectionMonotonicity,
  runA11ProjectionEndpointInversionControl,
  runA11ProjectionPhaseSeamControl,
  runA11ProjectionSyntheticControls,
  summarizeA11ReceiverPhaseProjectionMonotonicity,
} from "./A11ReceiverPhaseProjectionMonotonicityCertifier.mjs";

export const A11_HISTORY_EXTENSION_INDEPENDENT_PROTOCOL_SCHEMA =
  "prescribed-path-analysis/" +
  "a1-1-history-policy-extension-independent-verifier-protocol.v1";
export const A11_HISTORY_EXTENSION_INDEPENDENT_RESULT_SCHEMA =
  "prescribed-path-analysis/" +
  "a1-1-history-policy-extension-independent-verifier-result.v1";
export const A11_HISTORY_EXTENSION_INDEPENDENT_SUMMARY_SCHEMA =
  "prescribed-path-analysis/" +
  "a1-1-history-policy-extension-independent-verifier-summary.v1";

const TWO_PI = 2 * Math.PI;
const EXPECTED_ALPHA1 = Object.freeze([7 / 8, 15 / 16]);
const EXPECTED_ALPHA3 = Object.freeze([
  9 / (8 * Math.sin(9 / 8)),
  5 / 4,
]);
const EXPECTED_DELAY = Object.freeze([1 / 32, 145 / 64]);
const EXPECTED_PHASES = Object.freeze(["0", "2*pi/3", "4*pi/3"]);
const EXPECTED_BASE_HASH =
  "7b2a3a2a56abbe97971d3fae447cd3406724cb2c5916e8ba3a0d39ad80772849";
const EXPECTED_TARGETS = Object.freeze([
  "a1-1-binary-1-endpoint-1<-a1-1-binary-2-endpoint-1",
  "a1-1-binary-1-endpoint-1<-a1-1-binary-2-endpoint-2",
  "a1-1-binary-1-endpoint-1<-a1-1-binary-3-endpoint-1",
  "a1-1-binary-1-endpoint-1<-a1-1-binary-3-endpoint-2",
  "a1-1-binary-2-endpoint-1<-a1-1-binary-1-endpoint-1",
  "a1-1-binary-2-endpoint-1<-a1-1-binary-1-endpoint-2",
  "a1-1-binary-2-endpoint-1<-a1-1-binary-3-endpoint-1",
  "a1-1-binary-2-endpoint-1<-a1-1-binary-3-endpoint-2",
  "a1-1-binary-3-endpoint-1<-a1-1-binary-1-endpoint-1",
  "a1-1-binary-3-endpoint-1<-a1-1-binary-1-endpoint-2",
  "a1-1-binary-3-endpoint-1<-a1-1-binary-2-endpoint-1",
  "a1-1-binary-3-endpoint-1<-a1-1-binary-2-endpoint-2",
]);
const EXPECTED_PROJECTION_REPRESENTATIVES = Object.freeze([
  "a1-1-binary-1-endpoint-1<-a1-1-binary-2-endpoint-2",
  "a1-1-binary-1-endpoint-1<-a1-1-binary-3-endpoint-1",
  "a1-1-binary-1-endpoint-1<-a1-1-binary-3-endpoint-2",
]);
const EXPECTED_PROJECTION_TARGETS = Object.freeze([
  "a1-1-binary-1-endpoint-1<-a1-1-binary-2-endpoint-2",
  "a1-1-binary-1-endpoint-1<-a1-1-binary-3-endpoint-1",
  "a1-1-binary-1-endpoint-1<-a1-1-binary-3-endpoint-2",
  "a1-1-binary-1-endpoint-2<-a1-1-binary-2-endpoint-1",
  "a1-1-binary-1-endpoint-2<-a1-1-binary-3-endpoint-1",
  "a1-1-binary-1-endpoint-2<-a1-1-binary-3-endpoint-2",
]);
const EXPECTED_ROOT_PROTOCOL_HASH =
  "f750ae72e6da9005d23104218a5dbe9fdc4524ef471cd93233fdeb4f2e6f8e1f";
const EXPECTED_ROOT_RESULT_HASH =
  "7d930245906fef42966a883d93e8afddb57b7d4320acd1d5c1be25f776d45e1e";
const EXPECTED_ROOT_SUMMARY_HASH =
  "d43a763f11198a0bb2d1ce29eed8462ae08576980a739fecd72788d2c5b2a74a";
const EXPECTED_PROJECTION_PROTOCOL_HASH =
  "6dc5b65ae6d8ffce78018c75142a74ba02169522e34eb191c4b7c441caabc237";
const EXPECTED_PROJECTION_RESULT_HASH =
  "75de3038ee36b4058ae86a44f1045b421a344f4cd3c91cb1cf080ba00758a447";
const EXPECTED_PROJECTION_SUMMARY_HASH =
  "15a8c88c64792797f6b4bae16cd9876ad1cde4a3a56bac7133a09382fa9152df";
const EXPECTED_BOUNDARY_PROTOCOL_HASH =
  "79c93f59eb113fbeb7ad05aa9f6067b06ccc129bd4df9d2ca3a7f5e3ce9a1cfd";
const EXPECTED_BOUNDARY_RESULT_HASH =
  "ae2596b32d046c4657de805777732e4695d455e2ad247546f7f5d1fbb9900e95";
const EXPECTED_BOUNDARY_SUMMARY_HASH =
  "284bf4e33f82a996d31ce04547f52fa49f1e4f144e10753a18602232c26be37c";
const EXPECTED_SUBJECT_PROTOCOL_HASH =
  "b09b1b5a07db3904acfc387e8da90a2e282f93946b1f2c294fcbc3a4618f6f4f";
const EXPECTED_SUBJECT_RESULT_HASH =
  "edae3d88d1347656519f7efba4d0f9f530aec4eab7fce78bf687f4c28125145c";
const EXPECTED_SUBJECT_SUMMARY_HASH =
  "ddf8e622f0556b64c6cf348b6d9ee9cb109f7c28fc19dac508e356c9d540f57e";

function exactArray(actual, expected, label) {
  if (!Array.isArray(actual) ||
      actual.length !== expected.length ||
      actual.some((value, index) => value !== expected[index])) {
    throw new TypeError(`${label} must equal ${JSON.stringify(expected)}.`);
  }
}

function summaryHashWithoutField(summary) {
  return sha256A11Interval(Object.fromEntries(
    Object.entries(summary).filter(([key]) => key !== "summaryHash"),
  ));
}

function invertedEndpointChannelId(channelId) {
  return channelId
    .replaceAll("endpoint-1", "endpoint-x")
    .replaceAll("endpoint-2", "endpoint-1")
    .replaceAll("endpoint-x", "endpoint-2");
}

function validateHashBoundSummary(summary, declaration, label) {
  if (!summary ||
      summary.resultHash !== declaration.resultHash ||
      summary.summaryHash !== declaration.summaryHash ||
      summaryHashWithoutField(summary) !== declaration.summaryHash) {
    throw new TypeError(`${label} does not match its sealed hashes.`);
  }
}

function validateFrozenResources(protocol) {
  const fold = protocol.foldExclusion;
  const projection = protocol.projectionIntervalTreatment;
  if (fold?.squaredResidualExclusionFloor !== 1e-10 ||
      fold?.squaredDelayDerivativeExclusionFloor !== 1e-8 ||
      fold?.intervalPaddingUlps !== 4 ||
      fold?.initialRatioSubdivisions !== 2 ||
      fold?.initialReceptionPhaseSubdivisions !== 24 ||
      fold?.maximumSubdivisionDepth !== 18 ||
      fold?.maximumBoxesPerRepresentative !== 20000 ||
      fold?.maximumBoxesPerPacket !== 180000 ||
      fold?.minimumAlphaWidth !== 1 / 65536 ||
      fold?.minimumReceptionPhaseWidth !== TWO_PI / 65536 ||
      fold?.minimumDelayWidth !== (9 / 4) / 65536 ||
      fold?.splitPolicy !== "largest-active-normalized-width.v1" ||
      projection?.squaredResidualExclusionFloor !== 1e-10 ||
      projection?.squaredDelayDerivativeNegativityFloor !== 1e-8 ||
      projection?.intervalPaddingUlps !== 4 ||
      projection?.initialRatioSubdivisions !== 2 ||
      projection?.initialEmissionPhaseSubdivisions !== 24 ||
      projection?.maximumSubdivisionDepth !== 18 ||
      projection?.maximumBoxesPerRepresentative !== 20000 ||
      projection?.maximumBoxesPerPacket !== 60000 ||
      projection?.maximumIntervalEvaluationsPerPacket !== 500000 ||
      projection?.minimumAlphaWidth !== 1 / 65536 ||
      projection?.minimumEmissionPhaseWidth !== TWO_PI / 65536 ||
      projection?.minimumDelayWidth !== (9 / 4) / 65536 ||
      projection?.splitPolicy !==
        "largest-active-parameter-normalized-width.v1") {
    throw new TypeError(
      "A1.1 independent verifier may not alter frozen resources or floors.",
    );
  }
}

export function validateA11HistoryPolicyExtensionIndependentProtocol(
  rawProtocol,
) {
  if (!rawProtocol || typeof rawProtocol !== "object" ||
      Array.isArray(rawProtocol) ||
      rawProtocol.schema !== A11_HISTORY_EXTENSION_INDEPENDENT_PROTOCOL_SCHEMA) {
    throw new TypeError(
      `independent verifier requires schema ` +
      `${A11_HISTORY_EXTENSION_INDEPENDENT_PROTOCOL_SCHEMA}.`,
    );
  }
  if (rawProtocol.claimGrade !==
        "independent-acceptance-of-diagnostic-mathematics" ||
      rawProtocol.claimBoundary?.prescribedPathAnalyticsOnly !== true ||
      rawProtocol.claimBoundary?.pathEvolutionInvoked !== false ||
      rawProtocol.claimBoundary?.eomSolverInvoked !== false ||
      rawProtocol.claimBoundary?.eomCampaignInvoked !== false ||
      rawProtocol.claimBoundary?.diagnosticOnly !== true ||
      rawProtocol.claimBoundary?.score !== null ||
      rawProtocol.claimBoundary?.candidateSelection !== false ||
      rawProtocol.baseProtocol?.sha256 !== EXPECTED_BASE_HASH) {
    throw new TypeError(
      "A1.1 independent verifier must remain diagnostic-only and null-score.",
    );
  }
  exactArray(
    rawProtocol.relativePhaseLock?.phaseBaseline,
    EXPECTED_PHASES,
    "relativePhaseLock.phaseBaseline",
  );
  if (rawProtocol.relativePhaseLock?.relativePhaseOffsetsVary !== false ||
      rawProtocol.relativePhaseLock?.varyingCoordinate !==
        "common-cycle-position-only") {
    throw new TypeError("A1.1 independent relative-phase lock drifted.");
  }
  const domain = rawProtocol.rootSheet?.domain;
  exactArray(domain?.alpha1, EXPECTED_ALPHA1, "rootSheet.domain.alpha1");
  exactArray(domain?.alpha2, [1, 1], "rootSheet.domain.alpha2");
  exactArray(domain?.alpha3, EXPECTED_ALPHA3, "rootSheet.domain.alpha3");
  exactArray(
    domain?.receptionPhase,
    [0, TWO_PI],
    "rootSheet.domain.receptionPhase",
  );
  exactArray(
    domain?.dimensionlessDelayInterior,
    EXPECTED_DELAY,
    "rootSheet.domain.dimensionlessDelayInterior",
  );
  if (rawProtocol.rootSheet?.leftBoundaryOwnership !==
        "previous-boundary-control-owned/new-slice-left-open-right-closed" ||
      rawProtocol.rootSheet?.rootCountInvarianceTheorem?.id !==
        "connected-parameter-domain/no-root-endpoint/no-fold-root-count-invariance.v1" ||
      rawProtocol.rootSheet?.subFieldSpeedCoordinateCharts?.id !==
        "a1-1-sub-field-endpoint-root-sheet-coordinate-charts.v1") {
    throw new TypeError("A1.1 independent root-sheet declaration drifted.");
  }
  exactArray(
    rawProtocol.targetRepresentatives,
    EXPECTED_TARGETS,
    "targetRepresentatives",
  );
  const expectedInversion = EXPECTED_TARGETS.map((representative) => ({
    representative,
    reused: invertedEndpointChannelId(representative),
  }));
  if (JSON.stringify(rawProtocol.endpointInversionReuse) !==
      JSON.stringify(expectedInversion)) {
    throw new TypeError("A1.1 independent endpoint-inversion map drifted.");
  }
  const anchor = rawProtocol.anchorRootInventory;
  if (anchor?.point?.alpha1 !== 29 / 32 ||
      anchor?.point?.alpha3 !== 5 / 4 ||
      anchor?.point?.coordinatePhase !== Math.PI / 7 ||
      anchor?.expectedRootCountPerRepresentative !== 1 ||
      anchor?.initialDelaySubdivisions !== 32 ||
      anchor?.maximumSubdivisionDepth !== 48 ||
      anchor?.maximumBoxesPerRepresentative !== 4096 ||
      anchor?.minimumDelayWidth !== 1e-10 ||
      anchor?.rootResidualFloor !== 1e-10 ||
      anchor?.rootTransversalityFloor !== 1e-8 ||
      anchor?.independentNormalizedResidualFloor !== 1e-9 ||
      anchor?.rootSeparationFloor !== 1e-7) {
    throw new TypeError("A1.1 independent anchor declaration drifted.");
  }
  const projection = rawProtocol.projectionCertificate;
  exactArray(
    projection?.representativeChannelIds,
    EXPECTED_PROJECTION_REPRESENTATIVES,
    "projectionCertificate.representativeChannelIds",
  );
  const expectedProjectionInversion =
    EXPECTED_PROJECTION_REPRESENTATIVES.map((representative) => ({
      representative,
      reused: invertedEndpointChannelId(representative),
    }));
  exactArray(
    projection?.targetOrderedChannelIds,
    EXPECTED_PROJECTION_TARGETS,
    "projectionCertificate.targetOrderedChannelIds",
  );
  if (JSON.stringify(projection?.endpointInversionReuse) !==
      JSON.stringify(expectedProjectionInversion)) {
    throw new TypeError("A1.1 independent projection inversion map drifted.");
  }
  exactArray(
    projection?.certificate?.domain?.alpha1,
    EXPECTED_ALPHA1,
    "projectionCertificate.certificate.domain.alpha1",
  );
  exactArray(
    projection?.certificate?.domain?.alpha3,
    EXPECTED_ALPHA3,
    "projectionCertificate.certificate.domain.alpha3",
  );
  exactArray(
    projection?.certificate?.domain?.alpha2,
    [1, 1],
    "projectionCertificate.certificate.domain.alpha2",
  );
  exactArray(
    projection?.certificate?.domain?.emissionPhase,
    [0, TWO_PI],
    "projectionCertificate.certificate.domain.emissionPhase",
  );
  exactArray(
    projection?.certificate?.domain?.dimensionlessDelay,
    EXPECTED_DELAY,
    "projectionCertificate.certificate.domain.dimensionlessDelay",
  );
  const analytic = projection?.certificate?.analyticRootGeometryBound;
  if (analytic?.method !==
        "exact-shared-coordinate-gram-bound-over-declared-radius-intervals.v1" ||
      analytic?.middleTransmitter?.positivePolynomialLowerBound !== 1 / 64 ||
      analytic?.middleTransmitter
        ?.receptionSquaredDelayDerivativeUpperBound !== -1 / 368 ||
      analytic?.middleTransmitter
        ?.emissionSquaredDelayDerivativeUpperBound !== -1 / 128 ||
      analytic?.middleTransmitter?.projectionDerivativeLowerBound !==
        8 / 22103 ||
      analytic?.middleTransmitter?.projectionDerivativeUpperBound !== 736 ||
      analytic?.outerTransmitter?.positivePolynomialLowerBound !==
        1023 / 16384 ||
      analytic?.outerTransmitter
        ?.receptionSquaredDelayDerivativeUpperBound !== -1023 / 110080 ||
      analytic?.outerTransmitter
        ?.emissionSquaredDelayDerivativeUpperBound !== -1 / 64 ||
      analytic?.outerTransmitter?.projectionDerivativeLowerBound !==
        33 / 30100 ||
      analytic?.outerTransmitter?.projectionDerivativeUpperBound !== 430) {
    throw new TypeError("A1.1 independent projection bounds drifted.");
  }
  const originalRoot = rawProtocol.sealedOriginalVerifier?.rootSheet;
  const originalProjection = rawProtocol.sealedOriginalVerifier?.projection;
  const boundary = rawProtocol.sealedPreviousBoundary;
  const subject = rawProtocol.sealedSubject;
  if (originalRoot?.protocolHash !== EXPECTED_ROOT_PROTOCOL_HASH ||
      originalRoot?.resultHash !== EXPECTED_ROOT_RESULT_HASH ||
      originalRoot?.summaryHash !== EXPECTED_ROOT_SUMMARY_HASH ||
      originalProjection?.protocolHash !==
        EXPECTED_PROJECTION_PROTOCOL_HASH ||
      originalProjection?.resultHash !== EXPECTED_PROJECTION_RESULT_HASH ||
      originalProjection?.summaryHash !== EXPECTED_PROJECTION_SUMMARY_HASH ||
      boundary?.protocolHash !== EXPECTED_BOUNDARY_PROTOCOL_HASH ||
      boundary?.resultHash !== EXPECTED_BOUNDARY_RESULT_HASH ||
      boundary?.summaryHash !== EXPECTED_BOUNDARY_SUMMARY_HASH ||
      boundary?.requiredStatus !== "counterexample-diagnostic" ||
      boundary?.requiredBoundary !== "9/(8*sin(9/8))" ||
      subject?.protocolHash !== EXPECTED_SUBJECT_PROTOCOL_HASH ||
      subject?.resultHash !== EXPECTED_SUBJECT_RESULT_HASH ||
      subject?.summaryHash !== EXPECTED_SUBJECT_SUMMARY_HASH) {
    throw new TypeError("A1.1 independent sealed control identity drifted.");
  }
  validateFrozenResources(rawProtocol);
  const controls = rawProtocol.controls;
  if (controls?.originalVerifierExactReplayRequired !== true ||
      controls?.previousBoundaryExactReplayRequired !== true ||
      controls?.producerStatusNotAcceptanceEvidence !== true ||
      controls?.completeInterBinaryAccountingRequired !== true ||
      controls?.endpointInversionReuseRequired !== true ||
      controls?.phaseSeamReplayRequired !== true ||
      controls?.independentPointWitnessesRequired !== true ||
      controls?.independentNormalizedResidualFloor !== 1e-9 ||
      controls?.independentDerivativeDifferenceTolerance !== 1e-6 ||
      controls?.finiteDifferenceStep !== 2 ** -20 ||
      controls?.resourceExhaustion?.maximumBoxesPerRepresentative !== 1 ||
      rawProtocol.completionRule?.statusWhenComplete !==
        "independent-acceptance-passed" ||
      rawProtocol.completionRule?.statusWhenCounterexampleFound !==
        "counterexample-diagnostic" ||
      rawProtocol.completionRule?.statusWhenAnyObligationUnresolved !==
        "drawn-not-evaluated" ||
      rawProtocol.completionRule?.score !== null ||
      rawProtocol.completionRule?.noCandidateDisposition !== true ||
      rawProtocol.completionRule?.stopAfterThisSlice !== true) {
    throw new TypeError(
      "A1.1 independent verification/advancement controls drifted.",
    );
  }
  return structuredClone(rawProtocol);
}

function rootTreatmentView(protocol) {
  return {
    rootSheet: protocol.rootSheet,
    foldExclusion: protocol.foldExclusion,
    anchorRootInventory: protocol.anchorRootInventory,
    negativeControls: {
      syntheticFold: protocol.controls.syntheticFold,
      resourceExhaustion: protocol.controls.resourceExhaustion,
    },
  };
}

function projectionView(protocol) {
  return {
    certificate: protocol.projectionCertificate.certificate,
    intervalTreatment: protocol.projectionIntervalTreatment,
    rootSheetParameterization: protocol.rootSheetParameterization,
    endpointInversionReuse:
      protocol.projectionCertificate.endpointInversionReuse,
    relativePhaseLock: protocol.relativePhaseLock,
    controls: protocol.controls,
  };
}

function endpointInversionKey(channel) {
  return [
    channel.receiver.binaryIndex,
    channel.transmitter.binaryIndex,
    channel.receiver.endpointSign * channel.transmitter.endpointSign,
  ].join(":");
}

function runOriginalVerifierReplay({
  protocol,
  baseProtocol,
  originalRootProtocol,
  originalRootSealedSummary,
  originalRootSummary,
  originalProjectionProtocol,
  originalStructuralSummary,
  originalProjectionSummary,
}) {
  const rootDeclaration = protocol.sealedOriginalVerifier.rootSheet;
  const projectionDeclaration = protocol.sealedOriginalVerifier.projection;
  if (sha256A11Interval(originalRootProtocol) !==
        rootDeclaration.protocolHash ||
      sha256A11Interval(originalProjectionProtocol) !==
        projectionDeclaration.protocolHash) {
    throw new TypeError("original verifier protocol identity drifted.");
  }
  validateHashBoundSummary(
    originalRootSummary,
    rootDeclaration,
    "original root verifier summary",
  );
  validateHashBoundSummary(
    originalProjectionSummary,
    projectionDeclaration,
    "original projection verifier summary",
  );
  const rootResult = evaluateA11RootSheetMonotonicEnclosureTreatment({
    treatmentProtocol: originalRootProtocol,
    baseProtocol,
    sealedSummary: originalRootSealedSummary,
  });
  const rootSummary =
    summarizeA11RootSheetMonotonicEnclosureTreatment(rootResult);
  const projectionResult =
    evaluateA11ReceiverPhaseProjectionMonotonicity({
      projectionProtocol: originalProjectionProtocol,
      baseProtocol,
      completeInventorySummary: originalRootSummary,
      structuralLedgerSummary: originalStructuralSummary,
    });
  const projectionSummary =
    summarizeA11ReceiverPhaseProjectionMonotonicity(projectionResult);
  return {
    id: "a1-1-original-full-domain-verifier-exact-replay.v1",
    rootSheet: {
      expectedResultHash: rootDeclaration.resultHash,
      observedResultHash: rootResult.resultHash,
      expectedSummaryHash: rootDeclaration.summaryHash,
      observedSummaryHash: rootSummary.summaryHash,
      passed:
        rootResult.resultHash === rootDeclaration.resultHash &&
        rootSummary.summaryHash === rootDeclaration.summaryHash,
    },
    projection: {
      expectedResultHash: projectionDeclaration.resultHash,
      observedResultHash: projectionResult.resultHash,
      expectedSummaryHash: projectionDeclaration.summaryHash,
      observedSummaryHash: projectionSummary.summaryHash,
      passed:
        projectionResult.resultHash === projectionDeclaration.resultHash &&
        projectionSummary.summaryHash === projectionDeclaration.summaryHash,
    },
    passed:
      rootResult.resultHash === rootDeclaration.resultHash &&
      rootSummary.summaryHash === rootDeclaration.summaryHash &&
      projectionResult.resultHash === projectionDeclaration.resultHash &&
      projectionSummary.summaryHash === projectionDeclaration.summaryHash,
  };
}

function validateSubjectControl(protocol, subjectProtocol, subjectSummary) {
  const declaration = protocol.sealedSubject;
  if (sha256A11Interval(subjectProtocol) !== declaration.protocolHash) {
    throw new TypeError("sealed producer protocol identity drifted.");
  }
  validateHashBoundSummary(subjectSummary, declaration, "sealed producer summary");
  const domain = subjectProtocol.radiusExpansion?.combinedBox;
  const passed =
    subjectProtocol.radiusExpansion?.innerBandChanged === false &&
    subjectProtocol.radiusExpansion?.middleRadiusFieldSpeedPin === 1 &&
    subjectProtocol.radiusExpansion?.relativePhaseOffsetsVary === false &&
    JSON.stringify(subjectProtocol.radiusExpansion?.relativePhases) ===
      JSON.stringify(EXPECTED_PHASES) &&
    JSON.stringify(domain?.alpha1) === JSON.stringify(EXPECTED_ALPHA1) &&
    JSON.stringify(domain?.alpha3) === JSON.stringify(EXPECTED_ALPHA3) &&
    JSON.stringify(domain?.dimensionlessDelayInterior) ===
      JSON.stringify(EXPECTED_DELAY) &&
    subjectSummary.status?.score === null &&
    subjectSummary.claimBoundary?.diagnosticOnly === true &&
    subjectSummary.claimBoundary?.candidateSelection === false;
  return {
    id: "a1-1-history-extension-sealed-subject-identity-control.v1",
    protocolHash: declaration.protocolHash,
    resultHash: declaration.resultHash,
    summaryHash: declaration.summaryHash,
    producerStatusConsumedAsAcceptanceEvidence: false,
    passed,
  };
}

function validatePreviousBoundaryReplay(protocol, replay) {
  const declaration = protocol.sealedPreviousBoundary;
  const passed =
    replay?.protocolHash === declaration.protocolHash &&
    replay?.resultHash === declaration.resultHash &&
    replay?.summaryHash === declaration.summaryHash &&
    replay?.status === declaration.requiredStatus &&
    replay?.boundaryAlpha3 === EXPECTED_ALPHA3[0] &&
    replay?.passed === true;
  return {
    id: "a1-1-previous-history-edge-boundary-exact-replay-control.v1",
    ...replay,
    passed,
  };
}

function runIndependentTopology({
  protocol,
  baseProtocol,
  allChannels,
  executionLimits,
}) {
  const treatment = rootTreatmentView(protocol);
  const channelById = new Map(allChannels.map((channel) => [
    channel.channelId,
    channel,
  ]));
  const representatives = protocol.targetRepresentatives.map((channelId) => {
    const channel = channelById.get(channelId);
    if (!channel || channel.kind !== "inter-binary") {
      throw new TypeError(
        `independent topology target ${channelId} is not inter-binary.`,
      );
    }
    return channel;
  });
  const evaluator = createA11InterBinaryRootFoldEvaluator(baseProtocol);
  const limits = applyA11RootSheetExecutionLimits(treatment, executionLimits);
  const packetBudget = { boxes: 0 };
  const folds = representatives.map((channel) =>
    certifyA11RootSheetRepresentativeNoFold({
      channel,
      protocol: treatment,
      evaluator,
      packetBudget,
      ...limits,
    }));
  const anchors = representatives.map((channel) =>
    certifyA11RootSheetAnchorInventory({
      channel,
      protocol: treatment,
      baseProtocol,
      evaluator,
      packetBudget,
    }));
  const endpointAndSeam =
    runA11RootSheetEndpointAndSeamControl(treatment);
  const syntheticFold = runA11RootSheetSyntheticFoldControl(treatment);
  const resourceExhaustion = runA11RootSheetResourceExhaustionControl({
    protocol: treatment,
    channels: representatives,
    evaluator,
  });
  const representativeResults = representatives.map((channel, index) => {
    const fold = folds[index];
    const anchor = anchors[index];
    const rootCount =
      fold.status === "fold-excluded-diagnostic" &&
      anchor.passed &&
      endpointAndSeam.passed
        ? anchor.observedCertifiedRootCount
        : null;
    return {
      channelId: channel.channelId,
      foldExclusion: fold,
      anchorRootInventory: anchor,
      rootCountInvariance: {
        theoremId: treatment.rootSheet.rootCountInvarianceTheorem.id,
        parameterDomainConnected: true,
        endpointRootsExcluded:
          endpointAndSeam.nearZeroRootFree &&
          endpointAndSeam.historyEdgeRootFree,
        phaseSeamIdentified: endpointAndSeam.phaseSeamExact,
        foldExcluded: fold.status === "fold-excluded-diagnostic",
        anchorRootCountCertified: anchor.passed,
        inferredRootCountAcrossParameterDomain: rootCount,
      },
    };
  });
  const topologyById = {};
  const inversionRows = protocol.endpointInversionReuse.map((mapping) => {
    const representative = channelById.get(mapping.representative);
    const reused = channelById.get(mapping.reused);
    const result = representativeResults.find((row) =>
      row.channelId === mapping.representative);
    const exactInversion =
      representative &&
      reused &&
      endpointInversionKey(representative) === endpointInversionKey(reused);
    const rootCount =
      exactInversion
        ? result?.rootCountInvariance.inferredRootCountAcrossParameterDomain
        : null;
    topologyById[mapping.representative] = rootCount;
    topologyById[mapping.reused] = rootCount;
    return {
      ...mapping,
      exactEndpointInversion: exactInversion,
      continuousRootCount: rootCount,
      passed: exactInversion && rootCount === 1,
    };
  });
  const unresolved = representativeResults.flatMap((row) => [
    ...row.foldExclusion.unresolved.map((item) => ({
      stage: "fold-exclusion",
      channelId: row.channelId,
      ...item,
    })),
    ...row.anchorRootInventory.unresolved.map((item) => ({
      stage: "anchor-root-inventory",
      channelId: row.channelId,
      ...item,
    })),
  ]);
  const passed =
    representatives.length === 12 &&
    representativeResults.every((row) =>
      row.rootCountInvariance.inferredRootCountAcrossParameterDomain === 1) &&
    inversionRows.length === 12 &&
    inversionRows.every((row) => row.passed) &&
    Object.keys(topologyById).length === 24 &&
    endpointAndSeam.passed &&
    syntheticFold.passed &&
    resourceExhaustion.passed &&
    unresolved.length === 0;
  return {
    id: "a1-1-history-extension-independent-root-topology.v1",
    passed,
    topologyById,
    representativeResults,
    inversionRows,
    unresolved,
    controls: {
      endpointAndSeam,
      syntheticFold,
      resourceExhaustion,
    },
    resources: {
      declared: treatment.foldExclusion,
      effective: limits,
      totalEvaluatedBoxes: packetBudget.boxes,
      foldEvaluatedBoxCount: folds.reduce(
        (sum, row) => sum + row.counts.evaluatedBoxes,
        0,
      ),
      anchorEvaluatedBoxCount: anchors.reduce(
        (sum, row) => sum + row.counts.evaluatedBoxes,
        0,
      ),
      maximumDepthReached: Math.max(
        0,
        ...folds.map((row) => row.counts.maximumDepthReached),
      ),
    },
  };
}

function projectionPointWitnesses({
  protocol,
  baseProtocol,
  channelById,
  evaluator,
  topology,
}) {
  const step = protocol.controls.finiteDifferenceStep;
  const rows = protocol.projectionCertificate.endpointInversionReuse.flatMap(
    (mapping) => {
      const anchor = topology.representativeResults.find((row) =>
        row.channelId === mapping.representative)
        ?.anchorRootInventory.roots[0]?.independentRecomputation;
      if (!anchor) return [];
      return [mapping.representative, mapping.reused].map((channelId) => {
        const channel = channelById.get(channelId);
        const delay = anchor.delay;
        const receptionPhase = anchor.receptionPhase;
        const epsilon = receptionPhase - delay;
        const direct = (theta, pointDelay) =>
          recomputeA11SquaredCausalResidual({
            protocol: baseProtocol,
            receiver: channel.receiver,
            transmitter: channel.transmitter,
            alpha1: anchor.alpha1,
            alpha3: anchor.alpha3,
            receptionPhase: theta,
            delay: pointDelay,
          });
        const root = direct(receptionPhase, delay);
        const receptionLower = direct(receptionPhase, delay - step);
        const receptionUpper = direct(receptionPhase, delay + step);
        const emissionLower = direct(
          epsilon + delay - step,
          delay - step,
        );
        const emissionUpper = direct(
          epsilon + delay + step,
          delay + step,
        );
        const finiteReception =
          (receptionUpper.squaredResidual -
            receptionLower.squaredResidual) / (2 * step);
        const finiteEmission =
          (emissionUpper.squaredResidual -
            emissionLower.squaredResidual) / (2 * step);
        const primary = evaluator.evaluate({
          channelId,
          alpha1: [anchor.alpha1, anchor.alpha1],
          alpha3: [anchor.alpha3, anchor.alpha3],
          emissionPhase: [epsilon, epsilon],
          dimensionlessDelay: [delay, delay],
        });
        const middle = (value) => (value[0] + value[1]) / 2;
        const receptionDifference = Math.abs(
          finiteReception -
          middle(primary.receptionSquaredDelayDerivativeEnclosure),
        );
        const emissionDifference = Math.abs(
          finiteEmission -
          middle(primary.emissionSquaredDelayDerivativeEnclosure),
        );
        return {
          channelId,
          representativeChannelId: mapping.representative,
          alpha1: anchor.alpha1,
          alpha3: anchor.alpha3,
          receptionPhase,
          delay,
          normalizedResidual: root.normalizedResidual,
          receptionSquaredDerivativeDifference: receptionDifference,
          emissionSquaredDerivativeDifference: emissionDifference,
          passed:
            Math.abs(root.normalizedResidual) <=
              protocol.controls.independentNormalizedResidualFloor &&
            receptionDifference <=
              protocol.controls.independentDerivativeDifferenceTolerance &&
            emissionDifference <=
              protocol.controls.independentDerivativeDifferenceTolerance,
        };
      });
    },
  );
  return {
    id: "a1-1-history-extension-independent-projection-point-controls.v1",
    rows,
    witnessCount: rows.length,
    maximumNormalizedResidual: Math.max(
      0,
      ...rows.map((row) => Math.abs(row.normalizedResidual)),
    ),
    maximumReceptionSquaredDerivativeDifference: Math.max(
      0,
      ...rows.map((row) => row.receptionSquaredDerivativeDifference),
    ),
    maximumEmissionSquaredDerivativeDifference: Math.max(
      0,
      ...rows.map((row) => row.emissionSquaredDerivativeDifference),
    ),
    passed: rows.length === 6 && rows.every((row) => row.passed),
  };
}

function runIndependentProjection({
  protocol,
  baseProtocol,
  allChannels,
  topology,
}) {
  const view = projectionView(protocol);
  const channelById = new Map(allChannels.map((channel) => [
    channel.channelId,
    channel,
  ]));
  const representatives =
    protocol.projectionCertificate.representativeChannelIds.map(
      (channelId) => channelById.get(channelId),
    );
  if (representatives.some((channel) => !channel)) {
    throw new TypeError("independent projection representative is missing.");
  }
  const evaluator = createA11EmissionFixedProjectionEvaluator(baseProtocol);
  const representativeResults = representatives.map((channel) =>
    certifyA11ProjectionAnalyticRepresentative(channel, view));
  const endpointInversion = runA11ProjectionEndpointInversionControl({
    protocol: view,
    channelById,
    evaluator,
  });
  const phaseSeam = runA11ProjectionPhaseSeamControl({
    protocol: view,
    representatives,
    evaluator,
  });
  const synthetic = runA11ProjectionSyntheticControls(view);
  const resourcePacket = { boxes: 0, evaluations: 0 };
  const resourceResult = certifyA11ProjectionRepresentativeInterval({
    channel: representatives[0],
    protocol: view,
    evaluator,
    packetBudget: resourcePacket,
    maximumBoxesPerRepresentative:
      protocol.controls.resourceExhaustion.maximumBoxesPerRepresentative,
    maximumBoxesPerPacket:
      protocol.controls.resourceExhaustion.maximumBoxesPerRepresentative,
  });
  const resourceExhaustion = {
    id: "a1-1-history-extension-independent-projection-resource-control.v1",
    status: resourceResult.status,
    score: null,
    unresolvedBoxCount: resourceResult.unresolved.length,
    passed:
      resourceResult.status ===
        protocol.controls.resourceExhaustion.requiredStatus &&
      resourceResult.unresolved.length > 0,
  };
  const pointWitnesses = projectionPointWitnesses({
    protocol,
    baseProtocol,
    channelById,
    evaluator,
    topology,
  });
  const targetRows =
    protocol.projectionCertificate.endpointInversionReuse.flatMap((mapping) => {
      const representative = representativeResults.find((row) =>
        row.channelId === mapping.representative);
      return [mapping.representative, mapping.reused].map((channelId) => ({
        channelId,
        representativeChannelId: mapping.representative,
        reuse: channelId !== mapping.representative,
        topologyRootCount: topology.topologyById[channelId],
        projectionDerivativeEnclosure: [
          representative.continuousProjectionDerivativeLowerBound,
          representative.continuousProjectionDerivativeUpperBound,
        ],
        disposition:
          topology.topologyById[channelId] === 1 &&
          representative.status === "evaluated-diagnostic"
            ? "certified-continuous-positive-projection-root-sheet"
            : "unresolved-projection-root-sheet",
      }));
    });
  const passed =
    representativeResults.every((row) =>
      row.status === "evaluated-diagnostic" &&
      row.continuousProjectionDerivativeLowerBound > 0) &&
    targetRows.length === 6 &&
    targetRows.every((row) =>
      row.topologyRootCount === 1 &&
      row.disposition ===
        "certified-continuous-positive-projection-root-sheet") &&
    endpointInversion.passed &&
    phaseSeam.passed &&
    synthetic.passed &&
    resourceExhaustion.passed &&
    pointWitnesses.passed;
  return {
    id: "a1-1-history-extension-independent-positive-projection.v1",
    passed,
    continuousConclusion: passed
      ? protocol.projectionCertificate.certificate
        .continuousConclusionWhenComplete
      : null,
    representativeResults,
    targetRows,
    controls: {
      endpointInversion,
      phaseSeam,
      synthetic,
      resourceExhaustion,
      pointWitnesses,
    },
  };
}

export function evaluateA11HistoryPolicyExtensionIndependentVerifier({
  verifierProtocol: rawVerifierProtocol,
  baseProtocol: rawBaseProtocol,
  originalRootProtocol,
  originalRootSealedSummary,
  originalRootSummary,
  originalProjectionProtocol,
  originalStructuralSummary,
  originalProjectionSummary,
  previousBoundaryReplay,
  subjectProtocol,
  subjectSummary,
  executionLimits = null,
} = {}) {
  const protocol =
    validateA11HistoryPolicyExtensionIndependentProtocol(rawVerifierProtocol);
  const baseProtocol =
    validateA11ContinuousRootInventoryProtocol(rawBaseProtocol);
  if (sha256A11Interval(rawBaseProtocol) !== protocol.baseProtocol.sha256) {
    throw new TypeError("live base protocol does not match independent verifier.");
  }
  const originalVerifierReplay = runOriginalVerifierReplay({
    protocol,
    baseProtocol: rawBaseProtocol,
    originalRootProtocol,
    originalRootSealedSummary,
    originalRootSummary,
    originalProjectionProtocol,
    originalStructuralSummary,
    originalProjectionSummary,
  });
  const boundaryControl =
    validatePreviousBoundaryReplay(protocol, previousBoundaryReplay);
  const subjectControl =
    validateSubjectControl(protocol, subjectProtocol, subjectSummary);
  const allChannels = buildA11OrderedChannelInventory(baseProtocol);
  const topology = runIndependentTopology({
    protocol,
    baseProtocol,
    allChannels,
    executionLimits,
  });
  const projection = runIndependentProjection({
    protocol,
    baseProtocol,
    allChannels,
    topology,
  });
  const counterexample = false;
  const allControlsPassed =
    originalVerifierReplay.passed &&
    boundaryControl.passed &&
    subjectControl.passed &&
    topology.passed &&
    projection.passed;
  const statusCode = counterexample
    ? protocol.completionRule.statusWhenCounterexampleFound
    : allControlsPassed
      ? protocol.completionRule.statusWhenComplete
      : protocol.completionRule.statusWhenAnyObligationUnresolved;
  const resultWithoutHash = {
    schema: A11_HISTORY_EXTENSION_INDEPENDENT_RESULT_SCHEMA,
    verifier: {
      id: "a1-1-history-policy-extension-independent-full-domain-verifier",
      version: 1,
      extends:
        "a1-1-root-sheet-and-receiver-phase-projection-verifiers.v1",
      importsOuterRadiusProducer: false,
      consumesProducerGateBooleans: false,
      prescribedPathAnalyticsOnly: true,
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
      eomIntervalMachineryInvoked: false,
      eomCampaignInvoked: false,
      diagnosticOnly: true,
    },
    verifierProtocolHash: sha256A11Interval(rawVerifierProtocol),
    baseProtocolHash: sha256A11Interval(rawBaseProtocol),
    status: {
      code: statusCode,
      score: null,
      acceptedDiagnosticMathematics:
        statusCode === "independent-acceptance-passed",
      reason: statusCode === "independent-acceptance-passed"
        ? "independent-full-domain-topology-and-projection-gates-passed-on-new-history-slice"
        : statusCode === "counterexample-diagnostic"
          ? "independent-verifier-found-a-topology-or-projection-counterexample"
          : "one-or-more-independent-verifier-obligations-remain-unresolved",
    },
    scope: {
      alpha1: [...EXPECTED_ALPHA1],
      alpha2: [1, 1],
      alpha3: [...EXPECTED_ALPHA3],
      alpha3BoundaryOwnership:
        protocol.rootSheet.leftBoundaryOwnership,
      dimensionlessDelay: [...EXPECTED_DELAY],
      relativePhases: [...EXPECTED_PHASES],
      nextRadiusExecuted: false,
      historyBeyond145Over64Executed: false,
    },
    controls: {
      originalVerifierReplay,
      previousBoundaryReplay: boundaryControl,
      sealedSubject: subjectControl,
    },
    topology,
    projection,
    claimBoundary: protocol.claimBoundary,
  };
  return {
    ...resultWithoutHash,
    resultHash: sha256A11Interval(resultWithoutHash),
  };
}

function compactTopology(result) {
  return {
    id: result.id,
    passed: result.passed,
    representativeCount: result.representativeResults.length,
    inversionReuseCount: result.inversionRows.length,
    continuousOneRootOrderedChannelCount:
      result.inversionRows.filter((row) => row.continuousRootCount === 1)
        .length * 2,
    unresolvedBoxCount: result.unresolved.length,
    resources: result.resources,
    controls: result.controls,
    representativeRows: result.representativeResults.map((row) => ({
      channelId: row.channelId,
      foldExclusionStatus: row.foldExclusion.status,
      foldExclusionMethod: row.foldExclusion.method,
      anchorRootCount:
        row.anchorRootInventory.observedCertifiedRootCount,
      maximumIndependentNormalizedResidual:
        row.anchorRootInventory.maximumIndependentNormalizedResidual,
      inferredRootCountAcrossParameterDomain:
        row.rootCountInvariance.inferredRootCountAcrossParameterDomain,
      foldLedgerHash: sha256A11Interval(row.foldExclusion.ledger),
      anchorLedgerHash: sha256A11Interval(row.anchorRootInventory.ledger),
    })),
  };
}

export function summarizeA11HistoryPolicyExtensionIndependentVerifier(result) {
  if (!result ||
      result.schema !== A11_HISTORY_EXTENSION_INDEPENDENT_RESULT_SCHEMA) {
    throw new TypeError(
      `result must use schema ` +
      `${A11_HISTORY_EXTENSION_INDEPENDENT_RESULT_SCHEMA}.`,
    );
  }
  const summaryWithoutHash = {
    schema: A11_HISTORY_EXTENSION_INDEPENDENT_SUMMARY_SCHEMA,
    verifier: result.verifier,
    verifierProtocolHash: result.verifierProtocolHash,
    baseProtocolHash: result.baseProtocolHash,
    resultHash: result.resultHash,
    status: result.status,
    scope: result.scope,
    controls: result.controls,
    topology: compactTopology(result.topology),
    projection: {
      id: result.projection.id,
      passed: result.projection.passed,
      continuousConclusion: result.projection.continuousConclusion,
      representativeRows: result.projection.representativeResults.map(
        (row) => ({
          channelId: row.channelId,
          status: row.status,
          continuousProjectionDerivativeLowerBound:
            row.continuousProjectionDerivativeLowerBound,
          continuousProjectionDerivativeUpperBound:
            row.continuousProjectionDerivativeUpperBound,
        }),
      ),
      targetRows: result.projection.targetRows,
      controls: result.projection.controls,
    },
    rawLedger: {
      topologyRepresentativeCount:
        result.topology.representativeResults.length,
      foldRowCount: result.topology.representativeResults.reduce(
        (sum, row) => sum + row.foldExclusion.ledger.length,
        0,
      ),
      anchorRowCount: result.topology.representativeResults.reduce(
        (sum, row) => sum + row.anchorRootInventory.ledger.length,
        0,
      ),
      hash: sha256A11Interval({
        topology: result.topology.representativeResults.map((row) => ({
          channelId: row.channelId,
          fold: row.foldExclusion.ledger,
          anchor: row.anchorRootInventory.ledger,
        })),
        projection: result.projection.representativeResults.map((row) =>
          row.ledger),
      }),
      location:
        ".local-data/braid-program/a1-1/" +
        "a1-1-history-policy-extension-independent-verifier.v1.json.gz",
    },
    claimBoundary: result.claimBoundary,
  };
  return {
    ...summaryWithoutHash,
    summaryHash: sha256A11Interval(summaryWithoutHash),
  };
}
