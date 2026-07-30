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
  evaluateA11PrescribedStructuralRootLedger,
  summarizeA11PrescribedStructuralRootLedger,
} from "./A11PrescribedStructuralRootLedger.mjs";
import {
  evaluateA11ReceiverPhaseProjectionMonotonicity,
  summarizeA11ReceiverPhaseProjectionMonotonicity,
} from "./A11ReceiverPhaseProjectionMonotonicityCertifier.mjs";
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

export const A11_OUTER_RADIUS_EXPANSION_PROTOCOL_SCHEMA =
  "prescribed-path-analysis/a1-1-outer-radius-band-expansion-protocol.v1";
export const A11_OUTER_RADIUS_EXPANSION_RESULT_SCHEMA =
  "prescribed-path-analysis/a1-1-outer-radius-band-expansion-result.v1";
export const A11_OUTER_RADIUS_EXPANSION_SUMMARY_SCHEMA =
  "prescribed-path-analysis/a1-1-outer-radius-band-expansion-summary.v1";
export const A11_OUTER_RADIUS_SECOND_EXPANSION_PROTOCOL_SCHEMA =
  "prescribed-path-analysis/" +
  "a1-1-outer-radius-second-band-expansion-protocol.v1";
export const A11_OUTER_RADIUS_SECOND_EXPANSION_RESULT_SCHEMA =
  "prescribed-path-analysis/" +
  "a1-1-outer-radius-second-band-expansion-result.v1";
export const A11_OUTER_RADIUS_SECOND_EXPANSION_SUMMARY_SCHEMA =
  "prescribed-path-analysis/" +
  "a1-1-outer-radius-second-band-expansion-summary.v1";
export const A11_OUTER_RADIUS_HISTORY_EXTENSION_PROTOCOL_SCHEMA =
  "prescribed-path-analysis/" +
  "a1-1-outer-radius-history-policy-extension-protocol.v1";
export const A11_OUTER_RADIUS_HISTORY_EXTENSION_RESULT_SCHEMA =
  "prescribed-path-analysis/" +
  "a1-1-outer-radius-history-policy-extension-result.v1";
export const A11_OUTER_RADIUS_HISTORY_EXTENSION_SUMMARY_SCHEMA =
  "prescribed-path-analysis/" +
  "a1-1-outer-radius-history-policy-extension-summary.v1";

const TWO_PI = 2 * Math.PI;
const EXPECTED_ALPHA1 = Object.freeze([7 / 8, 15 / 16]);
const EXPECTED_BASELINE_ALPHA3 = Object.freeze([17 / 16, 9 / 8]);
const EXPECTED_ADDED_BAND = Object.freeze([9 / 8, 19 / 16]);
const EXPECTED_ALPHA3 = Object.freeze([17 / 16, 19 / 16]);
const EXPECTED_SECOND_BASELINE_ALPHA3 = Object.freeze([17 / 16, 19 / 16]);
const EXPECTED_SECOND_ADDED_BAND = Object.freeze([19 / 16, 5 / 4]);
const EXPECTED_SECOND_ALPHA3 = Object.freeze([17 / 16, 5 / 4]);
const EXPECTED_HISTORY_BOUNDARY_ALPHA3 = 9 / (8 * Math.sin(9 / 8));
const EXPECTED_HISTORY_EXTENSION_ALPHA3 = Object.freeze([
  EXPECTED_HISTORY_BOUNDARY_ALPHA3,
  5 / 4,
]);
const EXPECTED_DELAY = Object.freeze([1 / 32, 9 / 4]);
const EXPECTED_EXTENDED_DELAY = Object.freeze([1 / 32, 145 / 64]);
const EXPECTED_PHASES = Object.freeze(["0", "2*pi/3", "4*pi/3"]);
const EXPECTED_REPRESENTATIVES = Object.freeze([
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

function exactArray(actual, expected, label) {
  if (!Array.isArray(actual) ||
      actual.length !== expected.length ||
      actual.some((value, index) => value !== expected[index])) {
    throw new TypeError(`${label} must equal ${JSON.stringify(expected)}.`);
  }
}

function midpoint(interval) {
  return (interval[0] + interval[1]) / 2;
}

function summaryHashWithoutField(summary) {
  return sha256A11Interval(Object.fromEntries(
    Object.entries(summary).filter(([key]) => key !== "summaryHash"),
  ));
}

function validateSealedSummary(summary, declaration, label) {
  const passed =
    summary?.resultHash === declaration.resultHash &&
    summary?.summaryHash === declaration.summaryHash &&
    summaryHashWithoutField(summary) === declaration.summaryHash;
  if (!passed) {
    throw new TypeError(`${label} does not match its sealed result and summary hashes.`);
  }
}

export function validateA11OuterRadiusExpansionProtocol(rawProtocol) {
  if (!rawProtocol || typeof rawProtocol !== "object" ||
      Array.isArray(rawProtocol)) {
    throw new TypeError("A1.1 outer-radius expansion protocol must be an object.");
  }
  if (rawProtocol.schema !== A11_OUTER_RADIUS_EXPANSION_PROTOCOL_SCHEMA) {
    throw new TypeError(
      `A1.1 outer-radius expansion requires schema ` +
      `${A11_OUTER_RADIUS_EXPANSION_PROTOCOL_SCHEMA}.`,
    );
  }
  const boundary = rawProtocol.claimBoundary;
  if (rawProtocol.claimGrade !== "diagnostic" ||
      boundary?.prescribedPathAnalyticsOnly !== true ||
      boundary?.pathEvolutionInvoked !== false ||
      boundary?.eomSolverInvoked !== false ||
      boundary?.eomIntervalMachineryInvoked !== false ||
      boundary?.eomCampaignInvoked !== false ||
      boundary?.diagnosticOnly !== true ||
      boundary?.score !== null ||
      boundary?.candidateSelection !== false) {
    throw new TypeError(
      "A1.1 outer-radius expansion must remain prescribed-only and null-score.",
    );
  }
  const expansion = rawProtocol.radiusExpansion;
  if (expansion?.order !== 1 ||
      expansion?.variedBand !== "outer-radius-upper-adjacent-band-only" ||
      expansion?.innerBandChanged !== false ||
      expansion?.middleRadiusFieldSpeedPin !== 1 ||
      expansion?.relativePhaseOffsetsVary !== false ||
      expansion?.historyReachChi !== 9 / 4) {
    throw new TypeError("A1.1 expansion order or fixed-coordinate declaration drifted.");
  }
  exactArray(expansion.baseline?.alpha1, EXPECTED_ALPHA1, "baseline.alpha1");
  exactArray(expansion.baseline?.alpha2, [1, 1], "baseline.alpha2");
  exactArray(
    expansion.baseline?.alpha3,
    EXPECTED_BASELINE_ALPHA3,
    "baseline.alpha3",
  );
  exactArray(expansion.addedOuterBand, EXPECTED_ADDED_BAND, "addedOuterBand");
  exactArray(
    expansion.combinedBox?.alpha1,
    EXPECTED_ALPHA1,
    "combinedBox.alpha1",
  );
  exactArray(expansion.combinedBox?.alpha2, [1, 1], "combinedBox.alpha2");
  exactArray(
    expansion.combinedBox?.alpha3,
    EXPECTED_ALPHA3,
    "combinedBox.alpha3",
  );
  exactArray(
    expansion.combinedBox?.dimensionlessDelayInterior,
    EXPECTED_DELAY,
    "combinedBox.dimensionlessDelayInterior",
  );
  exactArray(expansion.relativePhases, EXPECTED_PHASES, "relativePhases");
  exactArray(
    rawProtocol.targetRepresentatives,
    EXPECTED_REPRESENTATIVES,
    "targetRepresentatives",
  );
  const rootSheet = rawProtocol.rootSheet;
  exactArray(rootSheet?.domain?.alpha1, EXPECTED_ALPHA1, "rootSheet.domain.alpha1");
  exactArray(rootSheet?.domain?.alpha2, [1, 1], "rootSheet.domain.alpha2");
  exactArray(rootSheet?.domain?.alpha3, EXPECTED_ALPHA3, "rootSheet.domain.alpha3");
  exactArray(
    rootSheet?.domain?.dimensionlessDelayInterior,
    EXPECTED_DELAY,
    "rootSheet.domain.dimensionlessDelayInterior",
  );
  if (rootSheet?.dependentVariable !== "dimensionlessDelay" ||
      rootSheet?.phaseSeam !==
        "theta-zero-identified-with-two-pi/exact-four-pi-sigma-periodicity.v1" ||
      rootSheet?.rootCountInvarianceTheorem?.id !==
        "connected-parameter-domain/no-root-endpoint/no-fold-root-count-invariance.v1") {
    throw new TypeError("A1.1 expanded root-sheet declaration drifted.");
  }
  const fold = rawProtocol.foldExclusion;
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
      fold?.splitPolicy !== "largest-active-normalized-width.v1") {
    throw new TypeError(
      "A1.1 expanded fold treatment may not relax the certified baseline settings.",
    );
  }
  const projection = rawProtocol.projectionCertificate;
  if (projection?.middleTransmitter?.positivePolynomialLowerBound !== 1 / 64 ||
      projection?.middleTransmitter
        ?.receptionSquaredDelayDerivativeUpperBound !== -1 / 368 ||
      projection?.middleTransmitter
        ?.emissionSquaredDelayDerivativeUpperBound !== -1 / 128 ||
      projection?.middleTransmitter?.projectionDerivativeLowerBound !==
        8 / 22103 ||
      projection?.middleTransmitter?.projectionDerivativeUpperBound !== 736 ||
      projection?.outerTransmitter?.positivePolynomialLowerBound !==
        1023 / 16384 ||
      projection?.outerTransmitter
        ?.receptionSquaredDelayDerivativeUpperBound !== -1023 / 106112 ||
      projection?.outerTransmitter
        ?.emissionSquaredDelayDerivativeUpperBound !== -1 / 64 ||
      projection?.outerTransmitter?.projectionDerivativeLowerBound !==
        33 / 28186 ||
      projection?.outerTransmitter?.projectionDerivativeUpperBound !==
        829 / 2) {
    throw new TypeError("A1.1 expanded projection bounds drifted.");
  }
  const controls = rawProtocol.controls;
  if (controls?.baselineExactReplayRequired !== true ||
      controls?.complete36ChannelAccountingRequired !== true ||
      controls?.sameAndPartnerChannelsReexecuted !== true ||
      controls?.independentResidualAndDerivativeRequired !== true ||
      controls?.independentWitnessCount !== 12 ||
      controls?.independentNormalizedResidualFloor !== 1e-9 ||
      controls?.independentDerivativeDifferenceTolerance !== 1e-6 ||
      controls?.finiteDifferenceStep !== 2 ** -20 ||
      controls?.resourceExhaustion?.maximumBoxesPerRepresentative !== 1 ||
      rawProtocol.completionRule?.statusWhenComplete !== "evaluated-diagnostic" ||
      rawProtocol.completionRule?.statusWhenCounterexampleFound !==
        "counterexample-diagnostic" ||
      rawProtocol.completionRule?.statusWhenAnyObligationUnresolved !==
        "drawn-not-evaluated" ||
      rawProtocol.completionRule?.score !== null ||
      rawProtocol.completionRule?.noCandidateDisposition !== true ||
      rawProtocol.completionRule?.stopAfterThisBand !== true) {
    throw new TypeError(
      "A1.1 outer-radius verification/advancement controls drifted.",
    );
  }
  return structuredClone(rawProtocol);
}

export function validateA11OuterRadiusSecondBandExpansionProtocol(rawProtocol) {
  if (!rawProtocol || typeof rawProtocol !== "object" ||
      Array.isArray(rawProtocol)) {
    throw new TypeError(
      "A1.1 second outer-radius expansion protocol must be an object.",
    );
  }
  if (rawProtocol.schema !==
      A11_OUTER_RADIUS_SECOND_EXPANSION_PROTOCOL_SCHEMA) {
    throw new TypeError(
      `A1.1 second outer-radius expansion requires schema ` +
      `${A11_OUTER_RADIUS_SECOND_EXPANSION_PROTOCOL_SCHEMA}.`,
    );
  }
  const boundary = rawProtocol.claimBoundary;
  if (rawProtocol.claimGrade !== "diagnostic" ||
      boundary?.prescribedPathAnalyticsOnly !== true ||
      boundary?.pathEvolutionInvoked !== false ||
      boundary?.eomSolverInvoked !== false ||
      boundary?.eomIntervalMachineryInvoked !== false ||
      boundary?.eomCampaignInvoked !== false ||
      boundary?.diagnosticOnly !== true ||
      boundary?.score !== null ||
      boundary?.candidateSelection !== false) {
    throw new TypeError(
      "A1.1 second outer-radius expansion must remain prescribed-only " +
      "and null-score.",
    );
  }
  const expansion = rawProtocol.radiusExpansion;
  if (expansion?.order !== 2 ||
      expansion?.variedBand !== "outer-radius-upper-adjacent-band-only" ||
      expansion?.innerBandChanged !== false ||
      expansion?.middleRadiusFieldSpeedPin !== 1 ||
      expansion?.relativePhaseOffsetsVary !== false ||
      expansion?.historyReachChi !== 9 / 4) {
    throw new TypeError(
      "A1.1 second expansion order or fixed-coordinate declaration drifted.",
    );
  }
  exactArray(expansion.baseline?.alpha1, EXPECTED_ALPHA1, "baseline.alpha1");
  exactArray(expansion.baseline?.alpha2, [1, 1], "baseline.alpha2");
  exactArray(
    expansion.baseline?.alpha3,
    EXPECTED_SECOND_BASELINE_ALPHA3,
    "baseline.alpha3",
  );
  exactArray(
    expansion.addedOuterBand,
    EXPECTED_SECOND_ADDED_BAND,
    "addedOuterBand",
  );
  exactArray(
    expansion.combinedBox?.alpha1,
    EXPECTED_ALPHA1,
    "combinedBox.alpha1",
  );
  exactArray(expansion.combinedBox?.alpha2, [1, 1], "combinedBox.alpha2");
  exactArray(
    expansion.combinedBox?.alpha3,
    EXPECTED_SECOND_ALPHA3,
    "combinedBox.alpha3",
  );
  exactArray(
    expansion.combinedBox?.dimensionlessDelayInterior,
    EXPECTED_DELAY,
    "combinedBox.dimensionlessDelayInterior",
  );
  exactArray(expansion.relativePhases, EXPECTED_PHASES, "relativePhases");
  exactArray(
    rawProtocol.targetRepresentatives,
    EXPECTED_REPRESENTATIVES,
    "targetRepresentatives",
  );
  const rootSheet = rawProtocol.rootSheet;
  exactArray(rootSheet?.domain?.alpha1, EXPECTED_ALPHA1, "rootSheet.domain.alpha1");
  exactArray(rootSheet?.domain?.alpha2, [1, 1], "rootSheet.domain.alpha2");
  exactArray(
    rootSheet?.domain?.alpha3,
    EXPECTED_SECOND_ALPHA3,
    "rootSheet.domain.alpha3",
  );
  exactArray(
    rootSheet?.domain?.dimensionlessDelayInterior,
    EXPECTED_DELAY,
    "rootSheet.domain.dimensionlessDelayInterior",
  );
  if (rootSheet?.dependentVariable !== "dimensionlessDelay" ||
      rootSheet?.phaseSeam !==
        "theta-zero-identified-with-two-pi/exact-four-pi-sigma-periodicity.v1" ||
      rootSheet?.rootCountInvarianceTheorem?.id !==
        "connected-parameter-domain/no-root-endpoint/no-fold-root-count-invariance.v1") {
    throw new TypeError("A1.1 second expanded root-sheet declaration drifted.");
  }
  const fold = rawProtocol.foldExclusion;
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
      fold?.splitPolicy !== "largest-active-normalized-width.v1") {
    throw new TypeError(
      "A1.1 second expanded fold treatment may not relax baseline settings.",
    );
  }
  const projection = rawProtocol.projectionCertificate;
  if (projection?.middleTransmitter?.positivePolynomialLowerBound !== 1 / 64 ||
      projection?.middleTransmitter
        ?.receptionSquaredDelayDerivativeUpperBound !== -1 / 368 ||
      projection?.middleTransmitter
        ?.emissionSquaredDelayDerivativeUpperBound !== -1 / 128 ||
      projection?.middleTransmitter?.projectionDerivativeLowerBound !==
        8 / 22103 ||
      projection?.middleTransmitter?.projectionDerivativeUpperBound !== 736 ||
      projection?.outerTransmitter?.positivePolynomialLowerBound !==
        1023 / 16384 ||
      projection?.outerTransmitter
        ?.receptionSquaredDelayDerivativeUpperBound !== -1023 / 110080 ||
      projection?.outerTransmitter
        ?.emissionSquaredDelayDerivativeUpperBound !== -1 / 64 ||
      projection?.outerTransmitter?.projectionDerivativeLowerBound !==
        33 / 30100 ||
      projection?.outerTransmitter?.projectionDerivativeUpperBound !== 430) {
    throw new TypeError("A1.1 second expanded projection bounds drifted.");
  }
  const prior = rawProtocol.sealedPriorCombinedBox;
  if (prior?.protocolHash !==
        "ba964f401401b36a46e96683e7329fa21ac13ce04331d1c909648a6df237b8bd" ||
      prior?.resultHash !==
        "389fe1a37065198fe4f6c5139b9359c733b22a08dd5f800c2e7d66703977bc57" ||
      prior?.summaryHash !==
        "a8c789f826ff286ef01f02f0a9aacc6faa72991e5e8535a436bc0531027eb23a") {
    throw new TypeError("A1.1 prior combined-box control identity drifted.");
  }
  const controls = rawProtocol.controls;
  if (controls?.baselineExactReplayRequired !== true ||
      controls?.priorCombinedBoxExactReplayRequired !== true ||
      controls?.complete36ChannelAccountingRequired !== true ||
      controls?.sameAndPartnerChannelsReexecuted !== true ||
      controls?.independentResidualAndDerivativeRequired !== true ||
      controls?.independentWitnessCount !== 12 ||
      controls?.independentNormalizedResidualFloor !== 1e-9 ||
      controls?.independentDerivativeDifferenceTolerance !== 1e-6 ||
      controls?.finiteDifferenceStep !== 2 ** -20 ||
      controls?.refinedHistoryEdgeRequired !== true ||
      controls?.historyEdgePhaseSubdivisions !== 24 ||
      controls?.resourceExhaustion?.maximumBoxesPerRepresentative !== 1 ||
      rawProtocol.completionRule?.statusWhenComplete !== "evaluated-diagnostic" ||
      rawProtocol.completionRule?.statusWhenCounterexampleFound !==
        "counterexample-diagnostic" ||
      rawProtocol.completionRule?.statusWhenAnyObligationUnresolved !==
        "drawn-not-evaluated" ||
      rawProtocol.completionRule?.score !== null ||
      rawProtocol.completionRule?.noCandidateDisposition !== true ||
      rawProtocol.completionRule?.stopAfterThisBand !== true) {
    throw new TypeError(
      "A1.1 second-band verification/advancement controls drifted.",
    );
  }
  return structuredClone(rawProtocol);
}

export function validateA11OuterRadiusHistoryPolicyExtensionProtocol(
  rawProtocol,
) {
  if (!rawProtocol || typeof rawProtocol !== "object" ||
      Array.isArray(rawProtocol)) {
    throw new TypeError(
      "A1.1 outer-radius history-policy extension protocol must be an object.",
    );
  }
  if (rawProtocol.schema !==
      A11_OUTER_RADIUS_HISTORY_EXTENSION_PROTOCOL_SCHEMA) {
    throw new TypeError(
      `A1.1 outer-radius history-policy extension requires schema ` +
      `${A11_OUTER_RADIUS_HISTORY_EXTENSION_PROTOCOL_SCHEMA}.`,
    );
  }
  const boundary = rawProtocol.claimBoundary;
  if (rawProtocol.claimGrade !== "diagnostic" ||
      boundary?.prescribedPathAnalyticsOnly !== true ||
      boundary?.pathEvolutionInvoked !== false ||
      boundary?.eomSolverInvoked !== false ||
      boundary?.eomIntervalMachineryInvoked !== false ||
      boundary?.eomCampaignInvoked !== false ||
      boundary?.diagnosticOnly !== true ||
      boundary?.score !== null ||
      boundary?.candidateSelection !== false) {
    throw new TypeError(
      "A1.1 history-policy extension must remain prescribed-only " +
      "and null-score.",
    );
  }
  const history = rawProtocol.historyPolicyExtension;
  if (history?.previousRetainedReachChi !== 9 / 4 ||
      history?.retainedReachChi !== 145 / 64 ||
      history?.retainedReachExact !== "145/64" ||
      history?.reachPolicyStep !== 1 / 64 ||
      history?.smallerTestReachChi !== 289 / 128 ||
      history?.previousBoundaryAlpha3 !== EXPECTED_HISTORY_BOUNDARY_ALPHA3 ||
      history?.previousBoundaryStatus !==
        "exact-history-edge-root-topology-boundary" ||
      history?.leftBoundaryOwnership !==
        "previous-boundary-control-owned/new-slice-left-open-right-closed") {
    throw new TypeError(
      "A1.1 retained-history declaration or prior-boundary ownership drifted.",
    );
  }
  exactArray(
    history.addedHistoryInterval,
    [9 / 4, 145 / 64],
    "historyPolicyExtension.addedHistoryInterval",
  );
  const expansion = rawProtocol.radiusExpansion;
  if (expansion?.order !== 3 ||
      expansion?.variedBand !==
        "previously-unadjudicated-outer-radius-slice-only" ||
      expansion?.innerBandChanged !== false ||
      expansion?.middleRadiusFieldSpeedPin !== 1 ||
      expansion?.relativePhaseOffsetsVary !== false ||
      expansion?.historyReachChi !== 145 / 64) {
    throw new TypeError(
      "A1.1 history-policy extension scope or fixed coordinate drifted.",
    );
  }
  exactArray(expansion.baseline?.alpha1, EXPECTED_ALPHA1, "baseline.alpha1");
  exactArray(expansion.baseline?.alpha2, [1, 1], "baseline.alpha2");
  exactArray(
    expansion.baseline?.alpha3,
    EXPECTED_SECOND_ALPHA3,
    "baseline.alpha3",
  );
  exactArray(
    expansion.addedOuterBand,
    EXPECTED_HISTORY_EXTENSION_ALPHA3,
    "addedOuterBand",
  );
  exactArray(
    expansion.combinedBox?.alpha1,
    EXPECTED_ALPHA1,
    "combinedBox.alpha1",
  );
  exactArray(expansion.combinedBox?.alpha2, [1, 1], "combinedBox.alpha2");
  exactArray(
    expansion.combinedBox?.alpha3,
    EXPECTED_HISTORY_EXTENSION_ALPHA3,
    "combinedBox.alpha3",
  );
  exactArray(
    expansion.combinedBox?.dimensionlessDelayInterior,
    EXPECTED_EXTENDED_DELAY,
    "combinedBox.dimensionlessDelayInterior",
  );
  exactArray(expansion.relativePhases, EXPECTED_PHASES, "relativePhases");
  exactArray(
    rawProtocol.targetRepresentatives,
    EXPECTED_REPRESENTATIVES,
    "targetRepresentatives",
  );
  const rootSheet = rawProtocol.rootSheet;
  exactArray(rootSheet?.domain?.alpha1, EXPECTED_ALPHA1, "rootSheet.domain.alpha1");
  exactArray(rootSheet?.domain?.alpha2, [1, 1], "rootSheet.domain.alpha2");
  exactArray(
    rootSheet?.domain?.alpha3,
    EXPECTED_HISTORY_EXTENSION_ALPHA3,
    "rootSheet.domain.alpha3",
  );
  exactArray(
    rootSheet?.domain?.dimensionlessDelayInterior,
    EXPECTED_EXTENDED_DELAY,
    "rootSheet.domain.dimensionlessDelayInterior",
  );
  if (rootSheet?.dependentVariable !== "dimensionlessDelay" ||
      rootSheet?.phaseSeam !==
        "theta-zero-identified-with-two-pi/exact-four-pi-sigma-periodicity.v1" ||
      rootSheet?.rootCountInvarianceTheorem?.id !==
        "connected-parameter-domain/no-root-endpoint/no-fold-root-count-invariance.v1") {
    throw new TypeError("A1.1 extended-history root-sheet declaration drifted.");
  }
  const fold = rawProtocol.foldExclusion;
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
      fold?.splitPolicy !== "largest-active-normalized-width.v1") {
    throw new TypeError(
      "A1.1 history-policy extension may not alter precision, tolerances, " +
      "or resources.",
    );
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
    throw new TypeError("A1.1 history-policy anchor or root gates drifted.");
  }
  const projection = rawProtocol.projectionCertificate;
  exactArray(
    projection?.outerTransmitter?.transmitterRadiusInterval,
    EXPECTED_HISTORY_EXTENSION_ALPHA3,
    "projectionCertificate.outerTransmitter.transmitterRadiusInterval",
  );
  if (projection?.middleTransmitter?.positivePolynomialLowerBound !== 1 / 64 ||
      projection?.middleTransmitter
        ?.receptionSquaredDelayDerivativeUpperBound !== -1 / 368 ||
      projection?.middleTransmitter
        ?.emissionSquaredDelayDerivativeUpperBound !== -1 / 128 ||
      projection?.middleTransmitter?.projectionDerivativeLowerBound !==
        8 / 22103 ||
      projection?.middleTransmitter?.projectionDerivativeUpperBound !== 736 ||
      projection?.outerTransmitter?.positivePolynomialLowerBound !==
        1023 / 16384 ||
      projection?.outerTransmitter
        ?.receptionSquaredDelayDerivativeUpperBound !== -1023 / 110080 ||
      projection?.outerTransmitter
        ?.emissionSquaredDelayDerivativeUpperBound !== -1 / 64 ||
      projection?.outerTransmitter?.projectionDerivativeLowerBound !==
        33 / 30100 ||
      projection?.outerTransmitter?.projectionDerivativeUpperBound !== 430) {
    throw new TypeError("A1.1 extended-history projection bounds drifted.");
  }
  const previous = rawProtocol.sealedPreviousBoundary;
  if (previous?.protocolHash !==
        "79c93f59eb113fbeb7ad05aa9f6067b06ccc129bd4df9d2ca3a7f5e3ce9a1cfd" ||
      previous?.resultHash !==
        "ae2596b32d046c4657de805777732e4695d455e2ad247546f7f5d1fbb9900e95" ||
      previous?.summaryHash !==
        "284bf4e33f82a996d31ce04547f52fa49f1e4f144e10753a18602232c26be37c") {
    throw new TypeError("A1.1 previous boundary control identity drifted.");
  }
  const controls = rawProtocol.controls;
  if (controls?.previousBoundaryExactReplayRequired !== true ||
      controls?.complete36ChannelAccountingRequired !== true ||
      controls?.sameAndPartnerChannelsReexecuted !== true ||
      controls?.historyPolicySufficiencyRequired !== true ||
      controls?.independentResidualAndDerivativeRequired !== true ||
      controls?.independentWitnessCount !== 12 ||
      controls?.independentNormalizedResidualFloor !== 1e-9 ||
      controls?.independentDerivativeDifferenceTolerance !== 1e-6 ||
      controls?.finiteDifferenceStep !== 2 ** -20 ||
      controls?.refinedHistoryEdgeRequired !== true ||
      controls?.historyEdgePhaseSubdivisions !== 24 ||
      controls?.resourceExhaustion?.maximumBoxesPerRepresentative !== 1 ||
      rawProtocol.completionRule?.statusWhenComplete !== "evaluated-diagnostic" ||
      rawProtocol.completionRule?.statusWhenCounterexampleFound !==
        "counterexample-diagnostic" ||
      rawProtocol.completionRule?.statusWhenAnyObligationUnresolved !==
        "drawn-not-evaluated" ||
      rawProtocol.completionRule?.score !== null ||
      rawProtocol.completionRule?.noCandidateDisposition !== true ||
      rawProtocol.completionRule?.stopAfterThisSlice !== true) {
    throw new TypeError(
      "A1.1 history-policy verification/advancement controls drifted.",
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

function endpointInversionKey(channel) {
  return [
    channel.receiver.binaryIndex,
    channel.transmitter.binaryIndex,
    channel.receiver.endpointSign * channel.transmitter.endpointSign,
  ].join(":");
}

function exactCircularResidual(kind, radius, delay) {
  if (kind === "same-transmitter-self") {
    return 2 * radius * Math.sin(delay / 2) - delay;
  }
  return 2 * radius * Math.cos(delay / 2) - delay;
}

function bisectExactCircular(kind, radius, lower = 1 / 32, upper = 9 / 4) {
  let left = lower;
  let right = upper;
  let leftValue = exactCircularResidual(kind, radius, left);
  let rightValue = exactCircularResidual(kind, radius, right);
  if (!(leftValue > 0 && rightValue < 0)) {
    return null;
  }
  for (let iteration = 0; iteration < 128; iteration += 1) {
    const center = (left + right) / 2;
    const value = exactCircularResidual(kind, radius, center);
    if (value > 0) {
      left = center;
      leftValue = value;
    } else {
      right = center;
      rightValue = value;
    }
  }
  return {
    delay: (left + right) / 2,
    bracket: [left, right],
    endpointResiduals: [leftValue, rightValue],
  };
}

function runSameAndPartnerInventory({ protocol, baseProtocol, allChannels }) {
  const domain = protocol.radiusExpansion.combinedBox;
  const delayInterval = domain.dimensionlessDelayInterior;
  const historyEdge = delayInterval[1];
  const outerSelfBoundaryAlpha3 =
    historyEdge / (2 * Math.sin(historyEdge / 2));
  const outerSelfBoundaryInside =
    domain.alpha3[0] < outerSelfBoundaryAlpha3 &&
    outerSelfBoundaryAlpha3 <= domain.alpha3[1];
  const rows = allChannels
    .filter((channel) => channel.kind !== "inter-binary")
    .map((channel) => {
      const binaryIndex = channel.receiver.binaryIndex;
      const radiusInterval = binaryIndex === 1
        ? domain.alpha1
        : binaryIndex === 2
          ? [1, 1]
          : domain.alpha3;
      const outerSelf =
        channel.kind === "same-transmitter-self" && binaryIndex === 3;
      const rootCount =
        outerSelf && outerSelfBoundaryInside
          ? null
          : channel.kind === "same-binary-opposite-endpoint" || outerSelf
            ? 1
            : 0;
      return {
        channelId: channel.channelId,
        channelKind: channel.kind,
        radiusInterval,
        continuousRootCount: rootCount,
        method: channel.kind === "same-transmitter-self"
          ? outerSelf
            ? outerSelfBoundaryInside
              ? "exact-circular-self-history-edge-topology-boundary.v1"
              : "exact-circular-self-one-maximum-endpoint-sign-certificate.v1"
            : "exact-circular-self-sine-strict-inequality-no-root-certificate.v1"
          : "exact-circular-partner-strictly-decreasing-endpoint-sign-certificate.v1",
        endpointSigns: channel.kind === "same-transmitter-self"
          ? outerSelf
            ? {
              nearZero: "positive-for-alpha3>1",
              historyEdgeUpper:
                2 * domain.alpha3[1] * Math.sin(delayInterval[1] / 2) -
                delayInterval[1],
            }
            : {
              positiveDelay: "strictly-negative-or-zero-only-at-delay-zero",
            }
          : {
            nearZeroLower:
              2 * radiusInterval[0] * Math.cos(delayInterval[0] / 2) -
              delayInterval[0],
            historyEdgeUpper:
              2 * radiusInterval[1] * Math.cos(delayInterval[1] / 2) -
              delayInterval[1],
        },
      };
    });
  const outerSelfChannels = allChannels.filter((channel) =>
    channel.kind === "same-transmitter-self" &&
    channel.receiver.binaryIndex === 3);
  const firstTopologyBoundary = outerSelfBoundaryInside
    ? {
      id: "a1-1-outer-self-history-edge-topology-boundary.v1",
      status: "exact-history-edge-root-topology-boundary",
      alpha3: outerSelfBoundaryAlpha3,
      exactExpression: "9/(8*sin(9/8))",
      historyReachChi: historyEdge,
      channelIds: outerSelfChannels.map((channel) => channel.channelId),
      lowerAddedBandEdge: protocol.radiusExpansion.addedOuterBand[0],
      upperAddedBandEdge: protocol.radiusExpansion.addedOuterBand[1],
      historyEdgeCausalResidualAtLowerAddedBand:
        2 * protocol.radiusExpansion.addedOuterBand[0] *
          Math.sin(historyEdge / 2) -
        historyEdge,
      historyEdgeCausalResidualAtBoundary:
        2 * outerSelfBoundaryAlpha3 * Math.sin(historyEdge / 2) -
        historyEdge,
      historyEdgeCausalResidualAtUpperAddedBand:
        2 * protocol.radiusExpansion.addedOuterBand[1] *
          Math.sin(historyEdge / 2) -
        historyEdge,
      causalResidualDelayDerivativeAtBoundary:
        outerSelfBoundaryAlpha3 * Math.cos(historyEdge / 2) - 1,
      independentWitnesses: outerSelfChannels.map((channel) => {
        const independent = recomputeA11SquaredCausalResidual({
          protocol: baseProtocol,
          receiver: channel.receiver,
          transmitter: channel.transmitter,
          alpha1: midpoint(domain.alpha1),
          alpha3: outerSelfBoundaryAlpha3,
          receptionPhase: Math.PI / 7,
          delay: historyEdge,
        });
        return {
          channelId: channel.channelId,
          instrumentId: independent.evaluatorId,
          squaredResidual: independent.squaredResidual,
          normalizedResidual: independent.normalizedResidual,
          passed:
            Math.abs(independent.normalizedResidual) <=
              protocol.controls.independentNormalizedResidualFloor,
        };
      }),
      topologyDirection: {
        belowBoundary:
          "one-simple-root-in-the-declared-interior-history-window",
        atBoundary: "simple-root-on-the-history-edge",
        aboveBoundary:
          "outer-self-root-lies-beyond-the-unchanged-history-reach",
      },
    }
    : null;
  if (firstTopologyBoundary) {
    firstTopologyBoundary.passed =
      firstTopologyBoundary.alpha3 >
        firstTopologyBoundary.lowerAddedBandEdge &&
      firstTopologyBoundary.alpha3 <
        firstTopologyBoundary.upperAddedBandEdge &&
      firstTopologyBoundary.historyEdgeCausalResidualAtLowerAddedBand < 0 &&
      Math.abs(
        firstTopologyBoundary.historyEdgeCausalResidualAtBoundary,
      ) <= Number.EPSILON &&
      firstTopologyBoundary.historyEdgeCausalResidualAtUpperAddedBand > 0 &&
      firstTopologyBoundary.causalResidualDelayDerivativeAtBoundary < 0 &&
      firstTopologyBoundary.independentWitnesses.every((row) => row.passed);
  }
  const sampledRoots = rows
    .filter((row) => row.continuousRootCount === 1)
    .map((row) => {
      const channel = allChannels.find((item) => item.channelId === row.channelId);
      const radius = channel.kind === "same-transmitter-self"
        ? domain.alpha3[1]
        : midpoint(row.radiusInterval);
      const root = bisectExactCircular(
        channel.kind,
        radius,
        delayInterval[0],
        delayInterval[1],
      );
      if (!root) return { channelId: channel.channelId, passed: false };
      const alpha1 = channel.receiver.binaryIndex === 1
        ? radius
        : midpoint(domain.alpha1);
      const alpha3 = channel.receiver.binaryIndex === 3
        ? radius
        : midpoint(domain.alpha3);
      const independent = recomputeA11SquaredCausalResidual({
        protocol: baseProtocol,
        receiver: channel.receiver,
        transmitter: channel.transmitter,
        alpha1,
        alpha3,
        receptionPhase: Math.PI / 7,
        delay: root.delay,
      });
      return {
        channelId: channel.channelId,
        radius,
        ...root,
        independentNormalizedResidual: independent.normalizedResidual,
        passed: Math.abs(independent.normalizedResidual) <=
          protocol.controls.independentNormalizedResidualFloor,
      };
    });
  const passed =
    firstTopologyBoundary === null &&
    rows.length === 12 &&
    rows.filter((row) => row.continuousRootCount === 0).length === 4 &&
    rows.filter((row) => row.continuousRootCount === 1).length === 8 &&
    rows.every((row) => {
      if (row.endpointSigns.historyEdgeUpper !== undefined &&
          !(row.endpointSigns.historyEdgeUpper < 0)) return false;
      if (row.endpointSigns.nearZeroLower !== undefined &&
          !(row.endpointSigns.nearZeroLower > 0)) return false;
      return true;
    }) &&
    sampledRoots.every((row) => row.passed);
  return {
    id: "a1-1-expanded-same-and-partner-root-inventory.v1",
    passed,
    orderedChannelCount: rows.length,
    noRootChannelCount: rows.filter((row) =>
      row.continuousRootCount === 0).length,
    oneRootChannelCount: rows.filter((row) =>
      row.continuousRootCount === 1).length,
    ...(firstTopologyBoundary
      ? {
        boundaryChannelCount: rows.filter((row) =>
          row.continuousRootCount === null).length,
      }
      : {}),
    maximumIndependentNormalizedResidual: Math.max(
      0,
      ...sampledRoots.map((row) => Math.abs(
        row.independentNormalizedResidual ?? Number.POSITIVE_INFINITY,
      )),
    ),
    ...(firstTopologyBoundary ? { firstTopologyBoundary } : {}),
    rows,
    sampledRoots,
  };
}

function runRefinedHistoryEdgeControl({
  protocol,
  baseProtocol,
  representatives,
  evaluator,
}) {
  const domain = protocol.rootSheet.domain;
  const phaseSubdivisions = protocol.controls.historyEdgePhaseSubdivisions;
  const historyEdge = domain.dimensionlessDelayInterior[1];
  const representativeRows = representatives.map((channel) => {
    let maximumSquaredResidualUpperBound = Number.NEGATIVE_INFINITY;
    let worstPhaseInterval = null;
    let worstEnclosure = null;
    for (let index = 0; index < phaseSubdivisions; index += 1) {
      const phaseInterval = [
        TWO_PI * index / phaseSubdivisions,
        TWO_PI * (index + 1) / phaseSubdivisions,
      ];
      const enclosure = evaluator.evaluate({
        channelId: channel.channelId,
        alpha1: domain.alpha1,
        alpha3: domain.alpha3,
        receptionPhase: phaseInterval,
        dimensionlessDelay: [historyEdge, historyEdge],
      });
      if (enclosure.squaredResidualEnclosure[1] >
          maximumSquaredResidualUpperBound) {
        maximumSquaredResidualUpperBound =
          enclosure.squaredResidualEnclosure[1];
        worstPhaseInterval = phaseInterval;
        worstEnclosure = enclosure.squaredResidualEnclosure;
      }
    }
    const directCandidates = [];
    for (const alpha1 of domain.alpha1) {
      for (const alpha3 of domain.alpha3) {
        const receptionPhase = midpoint(worstPhaseInterval);
        const direct = recomputeA11SquaredCausalResidual({
          protocol: baseProtocol,
          receiver: channel.receiver,
          transmitter: channel.transmitter,
          alpha1,
          alpha3,
          receptionPhase,
          delay: historyEdge,
        });
        directCandidates.push({
          alpha1,
          alpha3,
          receptionPhase,
          squaredResidual: direct.squaredResidual,
          normalizedResidual: direct.normalizedResidual,
          enclosed:
            direct.squaredResidual >= worstEnclosure[0] &&
            direct.squaredResidual <= worstEnclosure[1],
        });
      }
    }
    const independentWorst = directCandidates.reduce(
      (worst, row) =>
        row.squaredResidual > worst.squaredResidual ? row : worst,
      directCandidates[0],
    );
    return {
      channelId: channel.channelId,
      evaluatedPhaseBoxes: phaseSubdivisions,
      worstPhaseInterval,
      squaredResidualEnclosure: worstEnclosure,
      maximumSquaredResidualUpperBound,
      independentWorst,
      passed:
        maximumSquaredResidualUpperBound <
          -protocol.foldExclusion.squaredResidualExclusionFloor &&
        independentWorst.squaredResidual < 0 &&
        independentWorst.enclosed,
    };
  });
  return {
    id: "a1-1-history-edge-phase-partition-refinement.v1",
    historyEdge,
    alpha1Interval: [...domain.alpha1],
    alpha3Interval: [...domain.alpha3],
    phaseSubdivisions,
    evaluatedPhaseBoxes: representativeRows.reduce(
      (sum, row) => sum + row.evaluatedPhaseBoxes,
      0,
    ),
    maximumSquaredResidualUpperBound: Math.max(
      ...representativeRows.map((row) =>
        row.maximumSquaredResidualUpperBound),
    ),
    maximumIndependentSquaredResidual: Math.max(
      ...representativeRows.map((row) =>
        row.independentWorst.squaredResidual),
    ),
    maximumIndependentNormalizedResidual: Math.max(
      ...representativeRows.map((row) =>
        Math.abs(row.independentWorst.normalizedResidual)),
    ),
    requiredNegativeFloor:
      protocol.foldExclusion.squaredResidualExclusionFloor,
    independentInstrument:
      "a1-1-squared-causal-residual-direct-coordinate-recomputation.v1",
    passed: representativeRows.every((row) => row.passed),
    representativeRows,
  };
}

function runExpandedInterBinaryInventory({
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
      throw new TypeError(`expanded representative ${channelId} is not inter-binary.`);
    }
    return channel;
  });
  const evaluator = createA11InterBinaryRootFoldEvaluator(baseProtocol);
  const limits = applyA11RootSheetExecutionLimits(treatment, executionLimits);
  const packetBudget = { boxes: 0 };
  const foldResults = representatives.map((channel) =>
    certifyA11RootSheetRepresentativeNoFold({
      channel,
      protocol: treatment,
      evaluator,
      packetBudget,
      ...limits,
    }));
  const anchorResults = representatives.map((channel) =>
    certifyA11RootSheetAnchorInventory({
      channel,
      protocol: treatment,
      baseProtocol,
      evaluator,
      packetBudget,
    }));
  const coarseEndpointAndSeam =
    runA11RootSheetEndpointAndSeamControl(treatment);
  const historyEdgeRefinement = protocol.controls.refinedHistoryEdgeRequired
    ? runRefinedHistoryEdgeControl({
      protocol,
      baseProtocol,
      representatives,
      evaluator,
    })
    : null;
  const endpointAndSeam = historyEdgeRefinement
    ? {
      ...coarseEndpointAndSeam,
      coarseHistoryEdgeRootFree:
        coarseEndpointAndSeam.historyEdgeRootFree,
      historyEdgeRootFree: historyEdgeRefinement.passed,
      historyEdgeRefinement,
      passed:
        coarseEndpointAndSeam.nearZeroRootFree &&
        historyEdgeRefinement.passed &&
        coarseEndpointAndSeam.phaseSeamExact,
    }
    : coarseEndpointAndSeam;
  const syntheticFold = runA11RootSheetSyntheticFoldControl(treatment);
  const resourceExhaustion = runA11RootSheetResourceExhaustionControl({
    protocol: treatment,
    channels: representatives,
    evaluator,
  });
  const representativeResults = representatives.map((channel, index) => {
    const fold = foldResults[index];
    const anchor = anchorResults[index];
    const rootCount =
      fold.status === "fold-excluded-diagnostic" &&
      anchor.passed &&
      endpointAndSeam.passed
        ? anchor.observedCertifiedRootCount
        : null;
    return {
      channelId: channel.channelId,
      endpointInversionKey: endpointInversionKey(channel),
      foldExclusion: fold,
      anchorRootInventory: anchor,
      continuousRootCount: rootCount,
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
        claimGrade: "derived-within-declared-prescribed-path-diagnostic",
      },
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
    representativeResults.every((row) => row.continuousRootCount === 1) &&
    endpointAndSeam.passed &&
    syntheticFold.passed &&
    resourceExhaustion.passed &&
    unresolved.length === 0;
  return {
    id: "a1-1-expanded-inter-binary-root-sheet-inventory.v1",
    passed,
    representativeCount: representatives.length,
    endpointInversionReusedChannelCount: representatives.length,
    continuousOneRootOrderedChannelCount: representatives.length * 2,
    resources: {
      declared: treatment.foldExclusion,
      effective: limits,
      totalEvaluatedBoxes: packetBudget.boxes,
      foldEvaluatedBoxCount: foldResults.reduce(
        (sum, row) => sum + row.counts.evaluatedBoxes,
        0,
      ),
      anchorEvaluatedBoxCount: anchorResults.reduce(
        (sum, row) => sum + row.counts.evaluatedBoxes,
        0,
      ),
      maximumDepthReached: Math.max(
        0,
        ...foldResults.map((row) => row.counts.maximumDepthReached),
      ),
    },
    controls: {
      endpointAndSeam,
      syntheticFold,
      resourceExhaustion,
    },
    representativeResults,
    unresolved,
  };
}

function solveEmissionFixedRoot({
  evaluator,
  channelId,
  alpha1,
  alpha3,
  epsilon,
  delayInterval,
}) {
  let lower = delayInterval[0];
  let upper = delayInterval[1];
  const residual = (delay) => midpoint(evaluator.evaluate({
    channelId,
    alpha1: [alpha1, alpha1],
    alpha3: [alpha3, alpha3],
    emissionPhase: [epsilon, epsilon],
    dimensionlessDelay: [delay, delay],
  }).squaredResidualEnclosure);
  if (!(residual(lower) > 0 && residual(upper) < 0)) return null;
  for (let iteration = 0; iteration < 128; iteration += 1) {
    const center = (lower + upper) / 2;
    if (residual(center) > 0) lower = center;
    else upper = center;
  }
  return (lower + upper) / 2;
}

function independentProjectionWitnesses({
  protocol,
  baseProtocol,
  channelById,
  evaluator,
}) {
  const rows = [];
  const step = protocol.controls.finiteDifferenceStep;
  const alpha1Interval = protocol.radiusExpansion.combinedBox.alpha1;
  const delayInterval =
    protocol.radiusExpansion.combinedBox.dimensionlessDelayInterior;
  const boundaryAlpha3 = protocol.radiusExpansion.addedOuterBand;
  for (const [index, channelId] of
    protocol.projectionCertificate.targetOrderedChannelIds.entries()) {
    const channel = channelById.get(channelId);
    for (const [boundaryIndex, alpha3] of boundaryAlpha3.entries()) {
      const alpha1 = (index + boundaryIndex) % 2 === 0
        ? alpha1Interval[0]
        : alpha1Interval[1];
      const epsilon = boundaryIndex === 0 ? Math.PI / 7 : Math.PI + Math.PI / 7;
      const delay = solveEmissionFixedRoot({
        evaluator,
        channelId,
        alpha1,
        alpha3,
        epsilon,
        delayInterval,
      });
      if (delay === null) {
        rows.push({ channelId, alpha1, alpha3, epsilon, passed: false });
        continue;
      }
      const direct = (receptionPhase, pointDelay) =>
        recomputeA11SquaredCausalResidual({
          protocol: baseProtocol,
          receiver: channel.receiver,
          transmitter: channel.transmitter,
          alpha1,
          alpha3,
          receptionPhase,
          delay: pointDelay,
        });
      const receptionPhase = epsilon + delay;
      const root = direct(receptionPhase, delay);
      const receptionLower = direct(receptionPhase, delay - step);
      const receptionUpper = direct(receptionPhase, delay + step);
      const emissionLower = direct(epsilon + delay - step, delay - step);
      const emissionUpper = direct(epsilon + delay + step, delay + step);
      const finiteReception =
        (receptionUpper.squaredResidual - receptionLower.squaredResidual) /
        (2 * step);
      const finiteEmission =
        (emissionUpper.squaredResidual - emissionLower.squaredResidual) /
        (2 * step);
      const primary = evaluator.evaluate({
        channelId,
        alpha1: [alpha1, alpha1],
        alpha3: [alpha3, alpha3],
        emissionPhase: [epsilon, epsilon],
        dimensionlessDelay: [delay, delay],
      });
      const primaryReception =
        midpoint(primary.receptionSquaredDelayDerivativeEnclosure);
      const primaryEmission =
        midpoint(primary.emissionSquaredDelayDerivativeEnclosure);
      const receptionDifference = Math.abs(
        finiteReception - primaryReception,
      );
      const emissionDifference = Math.abs(finiteEmission - primaryEmission);
      rows.push({
        channelId,
        alpha1,
        alpha3,
        epsilon,
        receptionPhase,
        delay,
        independentNormalizedResidual: root.normalizedResidual,
        finiteDifferenceReceptionSquaredDerivative: finiteReception,
        primaryReceptionSquaredDerivative: primaryReception,
        receptionSquaredDerivativeDifference: receptionDifference,
        finiteDifferenceEmissionSquaredDerivative: finiteEmission,
        primaryEmissionSquaredDerivative: primaryEmission,
        emissionSquaredDerivativeDifference: emissionDifference,
        passed:
          Math.abs(root.normalizedResidual) <=
            protocol.controls.independentNormalizedResidualFloor &&
          receptionDifference <=
            protocol.controls.independentDerivativeDifferenceTolerance &&
          emissionDifference <=
            protocol.controls.independentDerivativeDifferenceTolerance,
      });
    }
  }
  return {
    id: "a1-1-expanded-projection-independent-boundary-witnesses.v1",
    witnessCount: rows.length,
    maximumIndependentNormalizedResidual: Math.max(
      0,
      ...rows.map((row) => Math.abs(
        row.independentNormalizedResidual ?? Number.POSITIVE_INFINITY,
      )),
    ),
    maximumReceptionSquaredDerivativeDifference: Math.max(
      0,
      ...rows.map((row) =>
        row.receptionSquaredDerivativeDifference ?? Number.POSITIVE_INFINITY),
    ),
    maximumEmissionSquaredDerivativeDifference: Math.max(
      0,
      ...rows.map((row) =>
        row.emissionSquaredDerivativeDifference ?? Number.POSITIVE_INFINITY),
    ),
    normalizedResidualFloor:
      protocol.controls.independentNormalizedResidualFloor,
    derivativeDifferenceTolerance:
      protocol.controls.independentDerivativeDifferenceTolerance,
    passed:
      rows.length === protocol.controls.independentWitnessCount &&
      rows.every((row) => row.passed),
    rows,
  };
}

function projectionEndpointInversion({
  protocol,
  allChannels,
  evaluator,
}) {
  const representativeIds =
    protocol.projectionCertificate.representativeChannelIds;
  const channelGroups = new Map();
  for (const channel of allChannels.filter((row) => row.kind === "inter-binary")) {
    const key = endpointInversionKey(channel);
    const rows = channelGroups.get(key) ?? [];
    rows.push(channel);
    channelGroups.set(key, rows);
  }
  let comparisonCount = 0;
  let maximumDifference = 0;
  const domain = protocol.radiusExpansion.combinedBox;
  const alpha1Points = [
    domain.alpha1[0],
    midpoint(domain.alpha1),
    domain.alpha1[1],
  ];
  const alpha3Points = [
    domain.alpha3[0],
    protocol.radiusExpansion.addedOuterBand[0],
    domain.alpha3[1],
  ];
  const delayPoints = [
    domain.dimensionlessDelayInterior[0],
    midpoint(domain.dimensionlessDelayInterior),
    domain.dimensionlessDelayInterior[1],
  ];
  for (const representativeId of representativeIds) {
    const representative = allChannels.find((row) =>
      row.channelId === representativeId);
    const pair = channelGroups.get(endpointInversionKey(representative))
      .find((row) => row.channelId !== representativeId);
    for (const alpha1 of alpha1Points) {
      for (const alpha3 of alpha3Points) {
        for (const emissionPhase of [0, Math.PI / 7, Math.PI, TWO_PI]) {
          for (const delay of delayPoints) {
            const input = {
              alpha1: [alpha1, alpha1],
              alpha3: [alpha3, alpha3],
              emissionPhase: [emissionPhase, emissionPhase],
              dimensionlessDelay: [delay, delay],
            };
            const left = evaluator.evaluate({
              channelId: representative.channelId,
              ...input,
            });
            const right = evaluator.evaluate({
              channelId: pair.channelId,
              ...input,
            });
            for (const key of [
              "squaredResidualEnclosure",
              "receptionSquaredDelayDerivativeEnclosure",
              "emissionSquaredDelayDerivativeEnclosure",
            ]) {
              maximumDifference = Math.max(
                maximumDifference,
                Math.abs(left[key][0] - right[key][0]),
                Math.abs(left[key][1] - right[key][1]),
              );
            }
            comparisonCount += 1;
          }
        }
      }
    }
  }
  return {
    id: "a1-1-expanded-projection-endpoint-inversion-control.v1",
    comparisonCount,
    maximumEnclosureEndpointDifference: maximumDifference,
    tolerance: 1e-12,
    passed: maximumDifference <= 1e-12,
  };
}

function projectionPhaseSeam({ protocol, channelById, evaluator }) {
  let replayCount = 0;
  let maximumDifference = 0;
  const domain = protocol.radiusExpansion.combinedBox;
  const delayPoints = [
    domain.dimensionlessDelayInterior[0],
    midpoint(domain.dimensionlessDelayInterior),
    domain.dimensionlessDelayInterior[1],
  ];
  for (const channelId of
    protocol.projectionCertificate.representativeChannelIds) {
    const channel = channelById.get(channelId);
    for (const alpha1 of domain.alpha1) {
      for (const alpha3 of domain.alpha3) {
        for (const delay of delayPoints) {
          const input = {
            channelId: channel.channelId,
            alpha1: [alpha1, alpha1],
            alpha3: [alpha3, alpha3],
            dimensionlessDelay: [delay, delay],
          };
          const left = evaluator.evaluate({
            ...input,
            emissionPhase: [0, 0],
          });
          const right = evaluator.evaluate({
            ...input,
            emissionPhase: [TWO_PI, TWO_PI],
          });
          for (const key of [
            "squaredResidualEnclosure",
            "receptionSquaredDelayDerivativeEnclosure",
            "emissionSquaredDelayDerivativeEnclosure",
          ]) {
            maximumDifference = Math.max(
              maximumDifference,
              Math.abs(left[key][0] - right[key][0]),
              Math.abs(left[key][1] - right[key][1]),
            );
          }
          replayCount += 1;
        }
      }
    }
  }
  return {
    id: "a1-1-expanded-projection-phase-seam-control.v1",
    replayCount,
    maximumEnclosureEndpointDifference: maximumDifference,
    tolerance: 1e-12,
    passed: maximumDifference <= 1e-12,
  };
}

function runProjectionCertificate({
  protocol,
  baseProtocol,
  allChannels,
  interBinary,
}) {
  const channelById = new Map(allChannels.map((channel) => [
    channel.channelId,
    channel,
  ]));
  const evaluator = createA11EmissionFixedProjectionEvaluator(baseProtocol);
  const topologyById = new Map();
  for (const representative of interBinary.representativeResults) {
    const channel = channelById.get(representative.channelId);
    topologyById.set(channel.channelId, representative.continuousRootCount);
    const pair = allChannels
      .filter((row) => row.kind === "inter-binary")
      .find((row) =>
        row.channelId !== channel.channelId &&
        endpointInversionKey(row) === endpointInversionKey(channel));
    topologyById.set(pair.channelId, representative.continuousRootCount);
  }
  const representativeRows =
    protocol.projectionCertificate.representativeChannelIds.map((channelId) => {
      const channel = channelById.get(channelId);
      const transmitterClass =
        channel.transmitter.radiusParameter === "alpha2"
          ? "middleTransmitter"
          : "outerTransmitter";
      const bound = protocol.projectionCertificate[transmitterClass];
      return {
        channelId,
        transmitterClass,
        topologyRootCount: topologyById.get(channelId),
        positivePolynomialLowerBound: bound.positivePolynomialLowerBound,
        receptionSquaredDelayDerivativeUpperBound:
          bound.receptionSquaredDelayDerivativeUpperBound,
        emissionSquaredDelayDerivativeUpperBound:
          bound.emissionSquaredDelayDerivativeUpperBound,
        receiverPhaseProjectionDerivativeEnclosure: [
          bound.projectionDerivativeLowerBound,
          bound.projectionDerivativeUpperBound,
        ],
        disposition:
          topologyById.get(channelId) === 1 &&
          bound.positivePolynomialLowerBound > 0 &&
          bound.receptionSquaredDelayDerivativeUpperBound < 0 &&
          bound.emissionSquaredDelayDerivativeUpperBound < 0 &&
          bound.projectionDerivativeLowerBound > 0
            ? "certified-continuous-positive-projection-root-sheet"
            : "unresolved-or-counterexample-projection-root-sheet",
      };
    });
  const endpointInversion = projectionEndpointInversion({
    protocol,
    allChannels,
    evaluator,
  });
  const phaseSeam = projectionPhaseSeam({
    protocol,
    channelById,
    evaluator,
  });
  const independentWitness =
    independentProjectionWitnesses({
      protocol,
      baseProtocol,
      channelById,
      evaluator,
    });
  const targetRows =
    protocol.projectionCertificate.targetOrderedChannelIds.map((channelId) => {
      const channel = channelById.get(channelId);
      const key = endpointInversionKey(channel);
      const representative = representativeRows.find((row) =>
        endpointInversionKey(channelById.get(row.channelId)) === key);
      return {
        channelId,
        representativeChannelId: representative.channelId,
        reuse: channelId !== representative.channelId,
        topologyRootCount: topologyById.get(channelId),
        projectionDerivativeEnclosure:
          representative.receiverPhaseProjectionDerivativeEnclosure,
        disposition: representative.disposition,
      };
    });
  const passed =
    representativeRows.every((row) =>
      row.disposition ===
        "certified-continuous-positive-projection-root-sheet") &&
    targetRows.length === 6 &&
    targetRows.every((row) => row.topologyRootCount === 1) &&
    endpointInversion.passed &&
    phaseSeam.passed &&
    independentWitness.passed;
  return {
    id: "a1-1-expanded-receiver-phase-projection-monotonicity.v1",
    passed,
    continuousConclusion: passed
      ? protocol.projectionCertificate.continuousConclusionWhenComplete
      : null,
    representativeRows,
    targetRows,
    controls: {
      endpointInversion,
      phaseSeam,
      independentWitness,
    },
  };
}

function runBaselineReplay({
  protocol,
  baseProtocol,
  baselineRootSheetProtocol,
  baselineContinuousSummary,
  baselineRootSheetSummary,
  baselineStructuralProtocol,
  baselineStructuralSummary,
  baselineProjectionProtocol,
  baselineProjectionSummary,
}) {
  validateSealedSummary(
    baselineRootSheetSummary,
    protocol.sealedBaseline.rootSheet,
    "baseline root-sheet summary",
  );
  validateSealedSummary(
    baselineStructuralSummary,
    protocol.sealedBaseline.structuralLedger,
    "baseline structural summary",
  );
  validateSealedSummary(
    baselineProjectionSummary,
    protocol.sealedBaseline.projectionMonotonicity,
    "baseline projection summary",
  );
  const rootResult = evaluateA11RootSheetMonotonicEnclosureTreatment({
    treatmentProtocol: baselineRootSheetProtocol,
    baseProtocol,
    sealedSummary: baselineContinuousSummary,
  });
  const rootSummary =
    summarizeA11RootSheetMonotonicEnclosureTreatment(rootResult);
  const structuralResult = evaluateA11PrescribedStructuralRootLedger({
    ledgerProtocol: baselineStructuralProtocol,
    baseProtocol,
    continuousSummary: baselineContinuousSummary,
    rootSheetSummary: baselineRootSheetSummary,
  });
  const structuralSummary =
    summarizeA11PrescribedStructuralRootLedger(structuralResult);
  const projectionResult =
    evaluateA11ReceiverPhaseProjectionMonotonicity({
      projectionProtocol: baselineProjectionProtocol,
      baseProtocol,
      completeInventorySummary: baselineRootSheetSummary,
      structuralLedgerSummary: baselineStructuralSummary,
    });
  const projectionSummary =
    summarizeA11ReceiverPhaseProjectionMonotonicity(projectionResult);
  const controls = {
    rootSheet: {
      expectedResultHash: protocol.sealedBaseline.rootSheet.resultHash,
      observedResultHash: rootResult.resultHash,
      expectedSummaryHash: protocol.sealedBaseline.rootSheet.summaryHash,
      observedSummaryHash: rootSummary.summaryHash,
      passed:
        rootResult.resultHash ===
          protocol.sealedBaseline.rootSheet.resultHash &&
        rootSummary.summaryHash ===
          protocol.sealedBaseline.rootSheet.summaryHash,
    },
    structuralLedger: {
      expectedResultHash: protocol.sealedBaseline.structuralLedger.resultHash,
      observedResultHash: structuralResult.resultHash,
      expectedSummaryHash: protocol.sealedBaseline.structuralLedger.summaryHash,
      observedSummaryHash: structuralSummary.summaryHash,
      expectedRawLedgerHash:
        protocol.sealedBaseline.structuralLedger.rawLedgerHash,
      observedRawLedgerHash: structuralSummary.rawLedger.hash,
      passed:
        structuralResult.resultHash ===
          protocol.sealedBaseline.structuralLedger.resultHash &&
        structuralSummary.summaryHash ===
          protocol.sealedBaseline.structuralLedger.summaryHash &&
        structuralSummary.rawLedger.hash ===
          protocol.sealedBaseline.structuralLedger.rawLedgerHash,
    },
    projectionMonotonicity: {
      expectedResultHash:
        protocol.sealedBaseline.projectionMonotonicity.resultHash,
      observedResultHash: projectionResult.resultHash,
      expectedSummaryHash:
        protocol.sealedBaseline.projectionMonotonicity.summaryHash,
      observedSummaryHash: projectionSummary.summaryHash,
      passed:
        projectionResult.resultHash ===
          protocol.sealedBaseline.projectionMonotonicity.resultHash &&
        projectionSummary.summaryHash ===
          protocol.sealedBaseline.projectionMonotonicity.summaryHash,
    },
  };
  return {
    id: "a1-1-original-radius-box-exact-deterministic-replay.v1",
    passed: Object.values(controls).every((row) => row.passed),
    controls,
  };
}

function runPriorCombinedBoxReplay({
  protocol,
  priorExpansionProtocol,
  priorExpansionSummary,
  baseProtocol,
  baselineRootSheetProtocol,
  baselineContinuousSummary,
  baselineRootSheetSummary,
  baselineStructuralProtocol,
  baselineStructuralSummary,
  baselineProjectionProtocol,
  baselineProjectionSummary,
}) {
  const declaration = protocol.sealedPriorCombinedBox;
  if (sha256A11Interval(priorExpansionProtocol) !==
      declaration.protocolHash) {
    throw new TypeError("A1.1 prior combined-box protocol hash drifted.");
  }
  validateSealedSummary(
    priorExpansionSummary,
    declaration,
    "prior combined-box summary",
  );
  const result = evaluateA11OuterRadiusBandExpansion({
    expansionProtocol: priorExpansionProtocol,
    baseProtocol,
    baselineRootSheetProtocol,
    baselineContinuousSummary,
    baselineRootSheetSummary,
    baselineStructuralProtocol,
    baselineStructuralSummary,
    baselineProjectionProtocol,
    baselineProjectionSummary,
  });
  const summary = summarizeA11OuterRadiusBandExpansion(result);
  return {
    id: "a1-1-prior-combined-box-exact-deterministic-replay.v1",
    expectedProtocolHash: declaration.protocolHash,
    observedProtocolHash: sha256A11Interval(priorExpansionProtocol),
    expectedResultHash: declaration.resultHash,
    observedResultHash: result.resultHash,
    expectedSummaryHash: declaration.summaryHash,
    observedSummaryHash: summary.summaryHash,
    passed:
      result.resultHash === declaration.resultHash &&
      summary.summaryHash === declaration.summaryHash,
  };
}

function runPreviousBoundaryReplay({
  protocol,
  previousBoundaryProtocol,
  previousBoundarySummary,
  priorExpansionProtocol,
  priorExpansionSummary,
  baseProtocol,
  baselineRootSheetProtocol,
  baselineContinuousSummary,
  baselineRootSheetSummary,
  baselineStructuralProtocol,
  baselineStructuralSummary,
  baselineProjectionProtocol,
  baselineProjectionSummary,
}) {
  const declaration = protocol.sealedPreviousBoundary;
  if (sha256A11Interval(previousBoundaryProtocol) !==
      declaration.protocolHash) {
    throw new TypeError("A1.1 previous boundary protocol hash drifted.");
  }
  validateSealedSummary(
    previousBoundarySummary,
    declaration,
    "previous boundary summary",
  );
  const result = evaluateA11OuterRadiusBandExpansion({
    expansionProtocol: previousBoundaryProtocol,
    baseProtocol,
    baselineRootSheetProtocol,
    baselineContinuousSummary,
    baselineRootSheetSummary,
    baselineStructuralProtocol,
    baselineStructuralSummary,
    baselineProjectionProtocol,
    baselineProjectionSummary,
    priorExpansionProtocol,
    priorExpansionSummary,
  });
  const summary = summarizeA11OuterRadiusBandExpansion(result);
  return {
    id: "a1-1-previous-history-edge-boundary-exact-replay.v1",
    expectedProtocolHash: declaration.protocolHash,
    observedProtocolHash: sha256A11Interval(previousBoundaryProtocol),
    expectedResultHash: declaration.resultHash,
    observedResultHash: result.resultHash,
    expectedSummaryHash: declaration.summaryHash,
    observedSummaryHash: summary.summaryHash,
    preservedStatus: result.status,
    preservedBoundary: result.stopBoundary.firstUncertifiedBoundary,
    passed:
      result.resultHash === declaration.resultHash &&
      summary.summaryHash === declaration.summaryHash &&
      result.status.code === "counterexample-diagnostic" &&
      result.stopBoundary.firstUncertifiedBoundary?.status ===
        "exact-history-edge-root-topology-boundary",
  };
}

function runHistoryPolicySufficiencyControl({
  protocol,
  baseProtocol,
  allChannels,
}) {
  const history = protocol.historyPolicyExtension;
  const upperRadius = protocol.radiusExpansion.addedOuterBand[1];
  const previousReach = history.previousRetainedReachChi;
  const retainedReach = history.retainedReachChi;
  const smallerTestReach = history.smallerTestReachChi;
  const upperRadiusRoot = bisectExactCircular(
    "same-transmitter-self",
    upperRadius,
    previousReach,
    retainedReach,
  );
  const outerSelfChannels = allChannels.filter((channel) =>
    channel.kind === "same-transmitter-self" &&
    channel.receiver.binaryIndex === 3);
  const independentWitnesses = upperRadiusRoot
    ? outerSelfChannels.map((channel) => {
      const independent = recomputeA11SquaredCausalResidual({
        protocol: baseProtocol,
        receiver: channel.receiver,
        transmitter: channel.transmitter,
        alpha1: midpoint(protocol.radiusExpansion.combinedBox.alpha1),
        alpha3: upperRadius,
        receptionPhase: Math.PI / 7,
        delay: upperRadiusRoot.delay,
      });
      return {
        channelId: channel.channelId,
        instrumentId: independent.evaluatorId,
        delay: upperRadiusRoot.delay,
        squaredResidual: independent.squaredResidual,
        normalizedResidual: independent.normalizedResidual,
        passed:
          Math.abs(independent.normalizedResidual) <=
            protocol.controls.independentNormalizedResidualFloor,
      };
    })
    : [];
  const nextHistoryEdgeBoundaryAlpha3 =
    retainedReach / (2 * Math.sin(retainedReach / 2));
  const previousReachResidualAtUpperRadius =
    exactCircularResidual(
      "same-transmitter-self",
      upperRadius,
      previousReach,
    );
  const retainedReachResidualAtUpperRadius =
    exactCircularResidual(
      "same-transmitter-self",
      upperRadius,
      retainedReach,
    );
  const smallerTestReachResidualAtUpperRadius =
    exactCircularResidual(
      "same-transmitter-self",
      upperRadius,
      smallerTestReach,
    );
  const delayDerivativeAtUpperRadiusRoot = upperRadiusRoot
    ? upperRadius * Math.cos(upperRadiusRoot.delay / 2) - 1
    : null;
  const passed =
    previousReachResidualAtUpperRadius > 0 &&
    smallerTestReachResidualAtUpperRadius > 0 &&
    retainedReachResidualAtUpperRadius <
      -protocol.foldExclusion.squaredResidualExclusionFloor &&
    upperRadiusRoot !== null &&
    upperRadiusRoot.delay > previousReach &&
    upperRadiusRoot.delay < retainedReach &&
    delayDerivativeAtUpperRadiusRoot <
      -protocol.foldExclusion.squaredDelayDerivativeExclusionFloor &&
    nextHistoryEdgeBoundaryAlpha3 > upperRadius &&
    independentWitnesses.length === 2 &&
    independentWitnesses.every((row) => row.passed);
  return {
    id: "a1-1-outer-radius-retained-history-sufficiency.v1",
    claimGrade: "derived-with-independent-direct-coordinate-controls",
    previousRetainedReachChi: previousReach,
    retainedReachChi: retainedReach,
    retainedReachExact: history.retainedReachExact,
    reachPolicyStep: history.reachPolicyStep,
    smallerTestReachChi: smallerTestReach,
    addedHistoryInterval: [...history.addedHistoryInterval],
    upperRadius,
    previousReachResidualAtUpperRadius,
    smallerTestReachResidualAtUpperRadius,
    retainedReachResidualAtUpperRadius,
    upperRadiusRoot: upperRadiusRoot
      ? {
        delay: upperRadiusRoot.delay,
        bracket: upperRadiusRoot.bracket,
        endpointResiduals: upperRadiusRoot.endpointResiduals,
        delayDerivative: delayDerivativeAtUpperRadiusRoot,
      }
      : null,
    nextHistoryEdgeBoundaryAlpha3,
    independentWitnesses,
    falsifier:
      "fails if the retained-edge residual is nonnegative, the upper-radius " +
      "root is not simple and interior, the next topology boundary is at or " +
      "below 5/4, or either independent residual exceeds its frozen floor",
    passed,
  };
}

export function evaluateA11OuterRadiusBandExpansion({
  expansionProtocol: rawExpansionProtocol,
  baseProtocol: rawBaseProtocol,
  baselineRootSheetProtocol,
  baselineContinuousSummary,
  baselineRootSheetSummary,
  baselineStructuralProtocol,
  baselineStructuralSummary,
  baselineProjectionProtocol,
  baselineProjectionSummary,
  priorExpansionProtocol = null,
  priorExpansionSummary = null,
  previousBoundaryProtocol = null,
  previousBoundarySummary = null,
  executionLimits = null,
} = {}) {
  const secondBand =
    rawExpansionProtocol?.schema ===
      A11_OUTER_RADIUS_SECOND_EXPANSION_PROTOCOL_SCHEMA;
  const historyExtension =
    rawExpansionProtocol?.schema ===
      A11_OUTER_RADIUS_HISTORY_EXTENSION_PROTOCOL_SCHEMA;
  const protocol = historyExtension
    ? validateA11OuterRadiusHistoryPolicyExtensionProtocol(rawExpansionProtocol)
    : secondBand
      ? validateA11OuterRadiusSecondBandExpansionProtocol(rawExpansionProtocol)
      : validateA11OuterRadiusExpansionProtocol(rawExpansionProtocol);
  const baseProtocol = validateA11ContinuousRootInventoryProtocol(
    rawBaseProtocol,
  );
  const baseHash = sha256A11Interval(rawBaseProtocol);
  if (baseHash !== protocol.sealedBaseline.baseProtocol.sha256) {
    throw new TypeError("A1.1 expansion base protocol hash drifted.");
  }
  const replayArguments = {
    protocol,
    baseProtocol,
    baselineRootSheetProtocol,
    baselineContinuousSummary,
    baselineRootSheetSummary,
    baselineStructuralProtocol,
    baselineStructuralSummary,
    baselineProjectionProtocol,
    baselineProjectionSummary,
  };
  const baselineReplay = historyExtension
    ? runPreviousBoundaryReplay({
      ...replayArguments,
      previousBoundaryProtocol,
      previousBoundarySummary,
      priorExpansionProtocol,
      priorExpansionSummary,
    })
    : secondBand
      ? runPriorCombinedBoxReplay({
        ...replayArguments,
        priorExpansionProtocol,
        priorExpansionSummary,
      })
      : runBaselineReplay(replayArguments);
  const allChannels = buildA11OrderedChannelInventory(baseProtocol);
  const historyPolicySufficiency = historyExtension
    ? runHistoryPolicySufficiencyControl({
      protocol,
      baseProtocol,
      allChannels,
    })
    : null;
  const sameAndPartner = runSameAndPartnerInventory({
    protocol,
    baseProtocol,
    allChannels,
  });
  const topologyBoundary =
    sameAndPartner.firstTopologyBoundary?.passed === true
      ? sameAndPartner.firstTopologyBoundary
      : null;
  const executionProtocol = topologyBoundary
    ? (() => {
      const prefix = structuredClone(protocol);
      prefix.radiusExpansion.combinedBox.alpha3[1] =
        topologyBoundary.alpha3;
      prefix.radiusExpansion.addedOuterBand[1] =
        topologyBoundary.alpha3;
      prefix.rootSheet.domain.alpha3[1] = topologyBoundary.alpha3;
      return prefix;
    })()
    : protocol;
  const interBinary = runExpandedInterBinaryInventory({
    protocol: executionProtocol,
    baseProtocol,
    allChannels,
    executionLimits,
  });
  const projection = runProjectionCertificate({
    protocol: executionProtocol,
    baseProtocol,
    allChannels,
    interBinary,
  });
  const completeChannelAccounting = {
    id: "a1-1-expanded-complete-36-ordered-channel-accounting.v1",
    orderedChannelCount: allChannels.length,
    sameOrPartnerOrderedChannelCount: sameAndPartner.orderedChannelCount,
    interBinaryRepresentativeCount: interBinary.representativeCount,
    endpointInversionReusedChannelCount:
      interBinary.endpointInversionReusedChannelCount,
    unresolvedChannelCount: topologyBoundary
      ? sameAndPartner.boundaryChannelCount
      : sameAndPartner.passed && interBinary.passed
        ? 0
        : 36,
    passed:
      topologyBoundary === null &&
      allChannels.length === 36 &&
      sameAndPartner.passed &&
      interBinary.passed &&
      sameAndPartner.orderedChannelCount +
        interBinary.continuousOneRootOrderedChannelCount === 36,
  };
  const anyCounterexample =
    topologyBoundary !== null ||
    projection.representativeRows.some((row) =>
      row.positivePolynomialLowerBound <= 0 ||
      row.receptionSquaredDelayDerivativeUpperBound >= 0 ||
      row.emissionSquaredDelayDerivativeUpperBound >= 0 ||
      row.receiverPhaseProjectionDerivativeEnclosure[0] <= 0);
  const anyObligationUnresolved =
    !baselineReplay.passed ||
    (historyExtension && !historyPolicySufficiency.passed) ||
    !interBinary.passed ||
    !projection.passed ||
    (!sameAndPartner.passed && topologyBoundary === null);
  const confirmedTopologyBoundary =
    topologyBoundary !== null && !anyObligationUnresolved
      ? topologyBoundary
      : null;
  const allControlsPassed =
    baselineReplay.passed &&
    (!historyExtension || historyPolicySufficiency.passed) &&
    sameAndPartner.passed &&
    interBinary.passed &&
    projection.passed &&
    completeChannelAccounting.passed;
  const statusCode = anyObligationUnresolved
    ? protocol.completionRule.statusWhenAnyObligationUnresolved
    : anyCounterexample
      ? protocol.completionRule.statusWhenCounterexampleFound
      : allControlsPassed
        ? protocol.completionRule.statusWhenComplete
        : protocol.completionRule.statusWhenAnyObligationUnresolved;
  const resultWithoutHash = {
    schema: historyExtension
      ? A11_OUTER_RADIUS_HISTORY_EXTENSION_RESULT_SCHEMA
      : secondBand
        ? A11_OUTER_RADIUS_SECOND_EXPANSION_RESULT_SCHEMA
        : A11_OUTER_RADIUS_EXPANSION_RESULT_SCHEMA,
    evaluator: {
      id: historyExtension
        ? "a1-1-outer-radius-history-policy-extension-diagnostic"
        : secondBand
          ? "a1-1-outer-radius-second-band-expansion-diagnostic"
          : "a1-1-outer-radius-band-expansion-diagnostic",
      version: 1,
      prescribedPathAnalyticsOnly: true,
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
      eomIntervalMachineryInvoked: false,
      eomCampaignInvoked: false,
      diagnosticOnly: true,
    },
    expansionProtocolHash: sha256A11Interval(rawExpansionProtocol),
    baseProtocolHash: baseHash,
    radiusExpansion: protocol.radiusExpansion,
    ...(historyExtension
      ? { historyPolicyExtension: protocol.historyPolicyExtension }
      : {}),
    ...(confirmedTopologyBoundary
      ? {
        adjudicatedPrefix: {
          alpha1: [...executionProtocol.radiusExpansion.combinedBox.alpha1],
          alpha2: [...executionProtocol.radiusExpansion.combinedBox.alpha2],
          alpha3: [...executionProtocol.radiusExpansion.combinedBox.alpha3],
          historyReachChi:
            executionProtocol.radiusExpansion.historyReachChi,
          reason:
            "execution-stopped-at-first-exact-outer-self-topology-boundary",
        },
      }
      : {}),
    status: {
      code: statusCode,
      score: null,
      reason: statusCode === "evaluated-diagnostic"
        ? historyExtension
          ? "complete-root-topology-and-positive-projection-certified-on-extended-history-outer-radius-slice"
          : secondBand
            ? "complete-root-topology-and-positive-projection-certified-on-second-outer-radius-band-expansion"
            : "complete-root-topology-and-positive-projection-certified-on-one-outer-radius-band-expansion"
        : statusCode === "counterexample-diagnostic"
          ? confirmedTopologyBoundary
            ? "exact-outer-self-root-history-edge-topology-boundary-found"
            : "a-certified-nonpositive-projection-or-topology-counterexample-was-found"
          : "one-or-more-topology-projection-control-or-resource-obligations-remain-unresolved",
    },
    stopBoundary: {
      ...(historyExtension
        ? { stoppedAfterDeclaredSlice: confirmedTopologyBoundary === null }
        : { stoppedAfterDeclaredBand: confirmedTopologyBoundary === null }),
      ...(confirmedTopologyBoundary
        ? { stoppedAtFirstBoundary: true }
        : {}),
      nextBandExecuted: false,
      firstUncertifiedBoundary: confirmedTopologyBoundary ?? (
        statusCode === "evaluated-diagnostic"
        ? historyExtension
          ? "alpha3-greater-than-5/4-not-evaluated-under-145/64-history-policy"
          : secondBand
            ? "alpha3-greater-than-5/4-not-evaluated"
            : "alpha3-greater-than-19/16-not-evaluated"
        : interBinary.unresolved[0] ?? projection.representativeRows.find((row) =>
          row.disposition !==
            "certified-continuous-positive-projection-root-sheet") ?? null
      ),
    },
    controls: {
      ...(historyExtension
        ? {
          previousBoundaryExactReplay: baselineReplay,
          historyPolicySufficiency,
        }
        : secondBand
          ? { priorCombinedBoxExactReplay: baselineReplay }
          : { baselineExactReplay: baselineReplay }),
      sameAndPartner,
      interBinary: {
        id: interBinary.id,
        passed: interBinary.passed,
        representativeCount: interBinary.representativeCount,
        endpointInversionReusedChannelCount:
          interBinary.endpointInversionReusedChannelCount,
        continuousOneRootOrderedChannelCount:
          interBinary.continuousOneRootOrderedChannelCount,
        resources: interBinary.resources,
        controls: interBinary.controls,
      },
      projection: {
        id: projection.id,
        passed: projection.passed,
        continuousConclusion: projection.continuousConclusion,
        controls: projection.controls,
      },
      completeChannelAccounting,
    },
    interBinaryRepresentativeResults: interBinary.representativeResults,
    interBinaryUnresolved: interBinary.unresolved,
    projectionRepresentativeRows: projection.representativeRows,
    projectionTargetRows: projection.targetRows,
    claimBoundary: protocol.claimBoundary,
  };
  return {
    ...resultWithoutHash,
    resultHash: sha256A11Interval(resultWithoutHash),
  };
}

export function summarizeA11OuterRadiusBandExpansion(result) {
  if (!result ||
      ![
        A11_OUTER_RADIUS_EXPANSION_RESULT_SCHEMA,
        A11_OUTER_RADIUS_SECOND_EXPANSION_RESULT_SCHEMA,
        A11_OUTER_RADIUS_HISTORY_EXTENSION_RESULT_SCHEMA,
      ].includes(result.schema)) {
    throw new TypeError(
      "result must use a supported A1.1 outer-radius expansion schema.",
    );
  }
  const secondBand =
    result.schema === A11_OUTER_RADIUS_SECOND_EXPANSION_RESULT_SCHEMA;
  const historyExtension =
    result.schema === A11_OUTER_RADIUS_HISTORY_EXTENSION_RESULT_SCHEMA;
  const compactRepresentative = (row) => ({
    channelId: row.channelId,
    endpointInversionKey: row.endpointInversionKey,
    continuousRootCount: row.continuousRootCount,
    rootCountInvariance: row.rootCountInvariance,
    foldExclusion: {
      status: row.foldExclusion.status,
      method: row.foldExclusion.method,
      coordinateChart: row.foldExclusion.coordinateChart,
      counts: row.foldExclusion.counts,
      unresolvedCount: row.foldExclusion.unresolved.length,
      rawLedgerHash: sha256A11Interval(row.foldExclusion.ledger),
    },
    anchorRootInventory: {
      status: row.anchorRootInventory.status,
      passed: row.anchorRootInventory.passed,
      observedCertifiedRootCount:
        row.anchorRootInventory.observedCertifiedRootCount,
      maximumIndependentNormalizedResidual:
        row.anchorRootInventory.maximumIndependentNormalizedResidual,
      counts: row.anchorRootInventory.counts,
      rawLedgerHash: sha256A11Interval(row.anchorRootInventory.ledger),
    },
  });
  const summaryWithoutHash = {
    schema: historyExtension
      ? A11_OUTER_RADIUS_HISTORY_EXTENSION_SUMMARY_SCHEMA
      : secondBand
        ? A11_OUTER_RADIUS_SECOND_EXPANSION_SUMMARY_SCHEMA
        : A11_OUTER_RADIUS_EXPANSION_SUMMARY_SCHEMA,
    evaluator: result.evaluator,
    expansionProtocolHash: result.expansionProtocolHash,
    baseProtocolHash: result.baseProtocolHash,
    resultHash: result.resultHash,
    radiusExpansion: result.radiusExpansion,
    ...(result.historyPolicyExtension
      ? { historyPolicyExtension: result.historyPolicyExtension }
      : {}),
    ...(result.adjudicatedPrefix
      ? { adjudicatedPrefix: result.adjudicatedPrefix }
      : {}),
    status: result.status,
    stopBoundary: result.stopBoundary,
    controls: result.controls,
    interBinaryRepresentativeSummaries:
      result.interBinaryRepresentativeResults.map(compactRepresentative),
    projectionRepresentativeRows: result.projectionRepresentativeRows,
    projectionTargetRows: result.projectionTargetRows,
    rawLedger: {
      location: "full result artifact bound by resultHash",
      interBinaryRepresentativeCount:
        result.interBinaryRepresentativeResults.length,
      hash: sha256A11Interval(
        result.interBinaryRepresentativeResults.map((row) => ({
          channelId: row.channelId,
          fold: row.foldExclusion.ledger,
          anchor: row.anchorRootInventory.ledger,
        })),
      ),
    },
    claimBoundary: result.claimBoundary,
  };
  return {
    ...summaryWithoutHash,
    summaryHash: sha256A11Interval(summaryWithoutHash),
  };
}
