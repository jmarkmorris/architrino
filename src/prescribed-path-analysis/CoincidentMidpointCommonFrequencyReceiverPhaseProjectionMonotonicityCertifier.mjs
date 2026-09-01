import {
  buildCoincidentMidpointCommonFrequencyOrderedChannelInventory,
  createCoincidentMidpointCommonFrequencyEmissionFixedProjectionEvaluator,
  sha256CoincidentMidpointCommonFrequencyInterval,
  validateCoincidentMidpointCommonFrequencyContinuousRootInventoryProtocol,
} from "./CoincidentMidpointCommonFrequencyContinuousRootIntervalCertifier.mjs";
import {
  recomputeCoincidentMidpointCommonFrequencySquaredCausalResidual,
} from "./CoincidentMidpointCommonFrequencyIndependentResidualRecomputation.mjs";

export const COINCIDENT_MIDPOINT_COMMON_FREQUENCY_PROJECTION_MONOTONICITY_PROTOCOL_SCHEMA =
  "prescribed-path-analysis/coincident-midpoint-common-frequency-receiver-phase-projection-monotonicity-protocol.v1";
export const COINCIDENT_MIDPOINT_COMMON_FREQUENCY_PROJECTION_MONOTONICITY_RESULT_SCHEMA =
  "prescribed-path-analysis/coincident-midpoint-common-frequency-receiver-phase-projection-monotonicity-result.v1";
export const COINCIDENT_MIDPOINT_COMMON_FREQUENCY_PROJECTION_MONOTONICITY_SUMMARY_SCHEMA =
  "prescribed-path-analysis/coincident-midpoint-common-frequency-receiver-phase-projection-monotonicity-summary.v1";

function validateScientificIdentity(protocol) {
  const identity = protocol.sourceConfiguration?.scientificIdentity;
  if (identity?.assemblyId !== "asm-2a289a6fe32f64922ab71bae973acc80" ||
      identity?.modelRevisionSha256 !==
        "2a289a6fe32f64922ab71bae973acc80bef8ebc2369329a26822f3f0d7f159d6") {
    throw new TypeError(
      "projection-monotonicity protocol requires the exact coincident-midpoint common-frequency scientific identity.",
    );
  }
}

const TWO_PI = 2 * Math.PI;
const EXPECTED_ALPHA1 = Object.freeze([7 / 8, 15 / 16]);
const EXPECTED_ALPHA3 = Object.freeze([17 / 16, 9 / 8]);
const EXPECTED_DELAY = Object.freeze([1 / 32, 9 / 4]);
const EXPECTED_PHASES = Object.freeze(["0", "2*pi/3", "4*pi/3"]);
const EXPECTED_BASE_HASH =
  "b87b16d140c67608977ac9bb7cf21175936808d0b9617b41778e150c904f4a4f";
const EXPECTED_COMPLETE_SUMMARY_HASH =
  "f37db3ed32ff38060e3b837d73644f9f219db9fb6543414297bcb0e902aa7e4d";
const EXPECTED_COMPLETE_RESULT_HASH =
  "fe89965435198af812153696e6278adf058c1cbae507a948630fd1adda8401f4";
const EXPECTED_STRUCTURAL_PROTOCOL_HASH =
  "63c1cfdada32585279a053b33946ac7bb3608fdc8a92e97111e720c76409b87c";
const EXPECTED_STRUCTURAL_SUMMARY_HASH =
  "5d5a659a497fa644aefe0c0dff13920504cd33e351414120e3d0044d304df3bf";
const EXPECTED_STRUCTURAL_RESULT_HASH =
  "addd5e758b2d6be181e804753385202fa7c71b7543e0768622cb8da7609aae74";
const EXPECTED_STRUCTURAL_RAW_HASH =
  "aa67b33f8b06ac8b8ce3f54d71b3003344bf2ec22892650997867d64c3b73388";
const EXPECTED_TARGETS = Object.freeze([
  "coincident-midpoint-common-frequency-binary-1-endpoint-1<-coincident-midpoint-common-frequency-binary-2-endpoint-2",
  "coincident-midpoint-common-frequency-binary-1-endpoint-1<-coincident-midpoint-common-frequency-binary-3-endpoint-1",
  "coincident-midpoint-common-frequency-binary-1-endpoint-1<-coincident-midpoint-common-frequency-binary-3-endpoint-2",
  "coincident-midpoint-common-frequency-binary-1-endpoint-2<-coincident-midpoint-common-frequency-binary-2-endpoint-1",
  "coincident-midpoint-common-frequency-binary-1-endpoint-2<-coincident-midpoint-common-frequency-binary-3-endpoint-1",
  "coincident-midpoint-common-frequency-binary-1-endpoint-2<-coincident-midpoint-common-frequency-binary-3-endpoint-2",
]);
const EXPECTED_REPRESENTATIVES = Object.freeze(EXPECTED_TARGETS.slice(0, 3));

function exactArray(actual, expected, label) {
  if (!Array.isArray(actual) ||
      actual.length !== expected.length ||
      actual.some((value, index) => value !== expected[index])) {
    throw new TypeError(`${label} must equal ${JSON.stringify(expected)}.`);
  }
}

function summaryHashWithoutField(summary) {
  return sha256CoincidentMidpointCommonFrequencyInterval(Object.fromEntries(
    Object.entries(summary).filter(([key]) => key !== "summaryHash"),
  ));
}

function validateSummaryHash(summary, expectedSummary, expectedResult, label) {
  if (!summary ||
      summary.summaryHash !== expectedSummary ||
      summary.resultHash !== expectedResult ||
      summaryHashWithoutField(summary) !== expectedSummary) {
    throw new TypeError(`${label} does not match its sealed hashes.`);
  }
}

export function validateCoincidentMidpointCommonFrequencyProjectionMonotonicityProtocol(rawProtocol) {
  if (!rawProtocol || typeof rawProtocol !== "object" ||
      Array.isArray(rawProtocol)) {
    throw new TypeError("coincident-midpoint common-frequency three-axis circular configuration projection-monotonicity protocol must be an object.");
  }
  if (rawProtocol.schema !== COINCIDENT_MIDPOINT_COMMON_FREQUENCY_PROJECTION_MONOTONICITY_PROTOCOL_SCHEMA) {
    throw new TypeError(
      `coincident-midpoint common-frequency three-axis circular configuration projection-monotonicity protocol requires schema ` +
      `${COINCIDENT_MIDPOINT_COMMON_FREQUENCY_PROJECTION_MONOTONICITY_PROTOCOL_SCHEMA}.`,
    );
  }
  validateScientificIdentity(rawProtocol);
  if (rawProtocol.claimGrade !== "diagnostic" ||
      rawProtocol.claimBoundary?.prescribedPathAnalyticsOnly !== true ||
      rawProtocol.claimBoundary?.pathEvolutionInvoked !== false ||
      rawProtocol.claimBoundary?.eomSolverInvoked !== false ||
      rawProtocol.claimBoundary?.eomIntervalMachineryInvoked !== false ||
      rawProtocol.claimBoundary?.eomCampaignInvoked !== false ||
      rawProtocol.claimBoundary?.diagnosticOnly !== true ||
      rawProtocol.claimBoundary?.score !== null ||
      rawProtocol.claimBoundary?.candidateSelection !== false) {
    throw new TypeError(
      "coincident-midpoint common-frequency three-axis circular configuration projection-monotonicity protocol must remain prescribed-only and null-score.",
    );
  }
  if (rawProtocol.sealedInputs?.baseProtocol?.sha256 !== EXPECTED_BASE_HASH ||
      rawProtocol.sealedInputs?.completeInventorySummary?.summaryHash !==
        EXPECTED_COMPLETE_SUMMARY_HASH ||
      rawProtocol.sealedInputs?.completeInventorySummary?.resultHash !==
        EXPECTED_COMPLETE_RESULT_HASH ||
      rawProtocol.sealedInputs?.structuralLedgerSummary?.ledgerProtocolHash !==
        EXPECTED_STRUCTURAL_PROTOCOL_HASH ||
      rawProtocol.sealedInputs?.structuralLedgerSummary?.summaryHash !==
        EXPECTED_STRUCTURAL_SUMMARY_HASH ||
      rawProtocol.sealedInputs?.structuralLedgerSummary?.resultHash !==
        EXPECTED_STRUCTURAL_RESULT_HASH ||
      rawProtocol.sealedInputs?.structuralLedgerSummary?.rawLedgerHash !==
        EXPECTED_STRUCTURAL_RAW_HASH) {
    throw new TypeError("coincident-midpoint common-frequency three-axis circular configuration projection-monotonicity sealed input identity drifted.");
  }
  exactArray(
    rawProtocol.relativePhaseLock?.phaseBaseline,
    EXPECTED_PHASES,
    "relativePhaseLock.phaseBaseline",
  );
  if (rawProtocol.relativePhaseLock?.varyingCoordinate !==
        "common-cycle-position-only" ||
      rawProtocol.relativePhaseLock?.emissionPhaseCoordinate !==
        "epsilon=(theta-delta)-modulo-two-pi" ||
      rawProtocol.relativePhaseLock?.relativePhaseOffsetsVary !== false ||
      rawProtocol.relativePhaseLock?.geometryFamilyChanges !== false) {
    throw new TypeError(
      "coincident-midpoint common-frequency three-axis circular configuration projection-monotonicity relative-phase lock drifted.",
    );
  }
  exactArray(
    rawProtocol.targetOrderedChannelIds,
    EXPECTED_TARGETS,
    "targetOrderedChannelIds",
  );
  exactArray(
    rawProtocol.representativeChannelIds,
    EXPECTED_REPRESENTATIVES,
    "representativeChannelIds",
  );
  exactArray(
    rawProtocol.certificate?.domain?.alpha1,
    EXPECTED_ALPHA1,
    "certificate.domain.alpha1",
  );
  exactArray(
    rawProtocol.certificate?.domain?.alpha2,
    [1, 1],
    "certificate.domain.alpha2",
  );
  exactArray(
    rawProtocol.certificate?.domain?.alpha3,
    EXPECTED_ALPHA3,
    "certificate.domain.alpha3",
  );
  exactArray(
    rawProtocol.certificate?.domain?.emissionPhase,
    [0, TWO_PI],
    "certificate.domain.emissionPhase",
  );
  exactArray(
    rawProtocol.certificate?.domain?.dimensionlessDelay,
    EXPECTED_DELAY,
    "certificate.domain.dimensionlessDelay",
  );
  if (rawProtocol.certificate?.boxDispositionRule !==
        "apply-exact-shared-coordinate-gram-bound-on-the-complete-root-sheet; retain-interval-partition-as-fail-closed-control.v1" ||
      rawProtocol.certificate?.phaseSeam !==
        "epsilon-zero-identified-with-two-pi.v1" ||
      rawProtocol.certificate?.continuousConclusionWhenComplete !==
        "the-receiver-phase-projection-is-strictly-increasing-on-each-declared-emission-fixed-root-sheet.v1") {
    throw new TypeError(
      "coincident-midpoint common-frequency three-axis circular configuration projection-monotonicity certificate identity drifted.",
    );
  }
  const analytic = rawProtocol.certificate?.analyticRootGeometryBound;
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
        ?.receptionSquaredDelayDerivativeUpperBound !== -341 / 34048 ||
      analytic?.outerTransmitter
        ?.emissionSquaredDelayDerivativeUpperBound !== -1 / 64 ||
      analytic?.outerTransmitter?.projectionDerivativeLowerBound !==
        1 / 798 ||
      analytic?.outerTransmitter?.projectionDerivativeUpperBound !== 399) {
    throw new TypeError(
      "coincident-midpoint common-frequency three-axis circular configuration projection-monotonicity analytic interval bounds drifted.",
    );
  }
  if (rawProtocol.rootSheetParameterization?.dependentVariable !==
        "dimensionlessDelay" ||
      rawProtocol.rootSheetParameterization?.uniqueRootBasis !==
        "sealed-complete-root-sheet-inventory-plus-fixed-emission-causal-residual-derivative-at-most-alpha1_max-1=-1/16" ||
      rawProtocol.rootSheetParameterization?.delayContractionRule !==
        "interval-newton-on-F=D-delta-with-global-fixed-emission-derivative-bound-plus-monotone-face-bisection.v1" ||
      rawProtocol.rootSheetParameterization
        ?.maximumDelayContractionIterationsPerBox !== 64 ||
      rawProtocol.rootSheetParameterization
        ?.delayIsNeverAnIndependentSubdivisionVariable !== true) {
    throw new TypeError(
      "coincident-midpoint common-frequency three-axis circular configuration projection-monotonicity root-sheet parameterization drifted.",
    );
  }
  const interval = rawProtocol.intervalTreatment;
  if (interval?.squaredResidualExclusionFloor !== 1e-10 ||
      interval?.squaredDelayDerivativeNegativityFloor !== 1e-8 ||
      interval?.intervalPaddingUlps !== 4 ||
      interval?.initialRatioSubdivisions !== 2 ||
      interval?.initialEmissionPhaseSubdivisions !== 24 ||
      interval?.maximumSubdivisionDepth !== 18 ||
      interval?.maximumBoxesPerRepresentative !== 20000 ||
      interval?.maximumBoxesPerPacket !== 60000 ||
      interval?.maximumIntervalEvaluationsPerPacket !== 500000 ||
      interval?.minimumAlphaWidth !== 1 / 65536 ||
      interval?.minimumEmissionPhaseWidth !== TWO_PI / 65536 ||
      interval?.minimumDelayWidth !== (9 / 4) / 65536 ||
      interval?.splitPolicy !==
        "largest-active-parameter-normalized-width.v1") {
    throw new TypeError(
      "coincident-midpoint common-frequency three-axis circular configuration projection-monotonicity interval resources or floors drifted.",
    );
  }
  if (rawProtocol.controls?.sealed36ChannelAccountingRequired !== true ||
      rawProtocol.controls?.sealedStructuralIndependentResidualControlRequired !==
        true ||
      rawProtocol.controls?.independentWitnessRecomputationRequired !== true ||
      rawProtocol.controls?.independentWitnessRecomputation?.witnessSource !==
        "structural-ledger-minimum-and-maximum-delay-witnesses-for-six-target-channels" ||
      rawProtocol.controls?.independentWitnessRecomputation
        ?.finiteDifferenceStep !== 2 ** -20 ||
      rawProtocol.controls?.independentWitnessRecomputation
        ?.maximumNormalizedResidual !== 1e-9 ||
      rawProtocol.controls?.independentWitnessRecomputation
        ?.maximumSquaredDerivativeDifference !== 1e-6 ||
      rawProtocol.controls?.fixedRelativePhaseBaselineRequired !== true ||
      rawProtocol.controls?.endpointInversionReuseRequired !== true ||
      rawProtocol.controls?.phaseSeamReplayRequired !== true ||
      rawProtocol.controls?.syntheticPositiveProjection?.requiredDisposition !==
        "certified-root-capable-positive-projection-box" ||
      rawProtocol.controls?.syntheticNegativeProjection?.requiredDisposition !==
        "counterexample-nonpositive-projection-box" ||
      rawProtocol.controls?.syntheticIndeterminateProjection?.requiredDisposition !==
        "unresolved-projection-sign-box" ||
      rawProtocol.controls?.resourceExhaustion?.maximumBoxesPerRepresentative !==
        1 ||
      rawProtocol.completionRule?.statusWhenComplete !==
        "evaluated-diagnostic" ||
      rawProtocol.completionRule?.statusWhenCounterexampleFound !==
        "counterexample-diagnostic" ||
      rawProtocol.completionRule?.statusWhenAnyObligationUnresolved !==
        "drawn-not-evaluated" ||
      rawProtocol.completionRule?.score !== null ||
      rawProtocol.completionRule?.noCandidateDisposition !== true) {
    throw new TypeError(
      "coincident-midpoint common-frequency three-axis circular configuration projection-monotonicity fail-closed controls drifted.",
    );
  }
  return structuredClone(rawProtocol);
}

function width(value) {
  return value[1] - value[0];
}

function midpoint(value) {
  return (value[0] + value[1]) / 2;
}

function splitInterval(value) {
  const middle = midpoint(value);
  return [[value[0], middle], [middle, value[1]]];
}

function partitionInterval(value, count) {
  const step = width(value) / count;
  return Array.from({ length: count }, (_, index) => [
    value[0] + step * index,
    index + 1 === count ? value[1] : value[0] + step * (index + 1),
  ]);
}

function activeDimensions(channel) {
  const parameters = new Set([
    channel.receiver.radiusParameter,
    channel.transmitter.radiusParameter,
  ]);
  return [
    ...(parameters.has("alpha1") ? ["alpha1"] : []),
    ...(parameters.has("alpha3") ? ["alpha3"] : []),
    "emissionPhase",
  ];
}

function initialBoxes(channel, protocol) {
  const domain = protocol.certificate.domain;
  const dimensions = activeDimensions(channel);
  const ratioCount = protocol.intervalTreatment.initialRatioSubdivisions;
  const alpha1 = dimensions.includes("alpha1")
    ? partitionInterval(domain.alpha1, ratioCount)
    : [domain.alpha1];
  const alpha3 = dimensions.includes("alpha3")
    ? partitionInterval(domain.alpha3, ratioCount)
    : [domain.alpha3];
  const phases = partitionInterval(
    [0, TWO_PI],
    protocol.intervalTreatment.initialEmissionPhaseSubdivisions,
  );
  const boxes = [];
  for (const alpha1Box of alpha1) {
    for (const alpha3Box of alpha3) {
      for (const emissionPhase of phases) {
        boxes.push({
          alpha1: [...alpha1Box],
          alpha3: [...alpha3Box],
          emissionPhase: [...emissionPhase],
          dimensionlessDelay: [...domain.dimensionlessDelay],
          depth: 0,
        });
      }
    }
  }
  return boxes;
}

function excludesZero(enclosure, floor) {
  return enclosure[0] > floor || enclosure[1] < -floor;
}

function strictlyNegative(enclosure, floor) {
  return enclosure[1] < -floor;
}

function ratioEnclosure(numerator, denominator) {
  const values = [
    numerator[0] / denominator[0],
    numerator[0] / denominator[1],
    numerator[1] / denominator[0],
    numerator[1] / denominator[1],
  ];
  return [Math.min(...values), Math.max(...values)];
}

function divideEnclosures(numerator, denominator) {
  if (denominator[0] <= 0 && denominator[1] >= 0) {
    throw new RangeError("interval division denominator contains zero.");
  }
  const values = [
    numerator[0] / denominator[0],
    numerator[0] / denominator[1],
    numerator[1] / denominator[0],
    numerator[1] / denominator[1],
  ];
  return [Math.min(...values), Math.max(...values)];
}

function intersectEnclosures(left, right) {
  const intersection = [
    Math.max(left[0], right[0]),
    Math.min(left[1], right[1]),
  ];
  return intersection[0] <= intersection[1] ? intersection : null;
}

function classifyProjectionEnclosure(enclosure, protocol) {
  const residualFloor =
    protocol.intervalTreatment.squaredResidualExclusionFloor;
  const derivativeFloor =
    protocol.intervalTreatment.squaredDelayDerivativeNegativityFloor;
  if (excludesZero(enclosure.squaredResidualEnclosure, residualFloor)) {
    return {
      disposition: "certified-root-free-box",
      projectionDerivativeEnclosure: null,
    };
  }
  if (strictlyNegative(
    enclosure.receptionSquaredDelayDerivativeEnclosure,
    derivativeFloor,
  ) && strictlyNegative(
    enclosure.emissionSquaredDelayDerivativeEnclosure,
    derivativeFloor,
  )) {
    return {
      disposition: "certified-root-capable-positive-projection-box",
      projectionDerivativeEnclosure: ratioEnclosure(
        enclosure.receptionSquaredDelayDerivativeEnclosure,
        enclosure.emissionSquaredDelayDerivativeEnclosure,
      ),
    };
  }
  if (enclosure.receptionSquaredDelayDerivativeEnclosure[0] > 0 &&
      strictlyNegative(
        enclosure.emissionSquaredDelayDerivativeEnclosure,
        derivativeFloor,
      )) {
    return {
      disposition: "counterexample-nonpositive-projection-box",
      projectionDerivativeEnclosure: ratioEnclosure(
        enclosure.receptionSquaredDelayDerivativeEnclosure,
        enclosure.emissionSquaredDelayDerivativeEnclosure,
      ),
    };
  }
  return {
    disposition: "unresolved-projection-sign-box",
    projectionDerivativeEnclosure: null,
  };
}

function selectSplitDimension(channel, box, protocol) {
  const domain = protocol.certificate.domain;
  const fullWidths = {
    alpha1: width(domain.alpha1),
    alpha3: width(domain.alpha3),
    emissionPhase: TWO_PI,
  };
  const minimumWidths = {
    alpha1: protocol.intervalTreatment.minimumAlphaWidth,
    alpha3: protocol.intervalTreatment.minimumAlphaWidth,
    emissionPhase: protocol.intervalTreatment.minimumEmissionPhaseWidth,
  };
  return activeDimensions(channel)
    .filter((key) => width(box[key]) > minimumWidths[key])
    .map((key) => ({ key, score: width(box[key]) / fullWidths[key] }))
    .sort((left, right) =>
      right.score - left.score || left.key.localeCompare(right.key))[0]?.key ??
      null;
}

function contractDelayRootEnclosure({
  channel,
  box,
  evaluator,
  protocol,
  packetBudget,
}) {
  let lower = box.dimensionlessDelay[0];
  let upper = box.dimensionlessDelay[1];
  let iterations = 0;
  const floor = protocol.intervalTreatment.squaredResidualExclusionFloor;
  while (iterations <
      protocol.rootSheetParameterization
        .maximumDelayContractionIterationsPerBox) {
    if (packetBudget.evaluations >=
        protocol.intervalTreatment.maximumIntervalEvaluationsPerPacket) {
      return {
        box: {
          ...box,
          dimensionlessDelay: [lower, upper],
        },
        iterations,
        resourceExhausted: true,
      };
    }
    const middle = (lower + upper) / 2;
    const enclosure = evaluator.evaluate({
      channelId: channel.channelId,
      alpha1: box.alpha1,
      alpha3: box.alpha3,
      emissionPhase: box.emissionPhase,
      dimensionlessDelay: [middle, middle],
    });
    packetBudget.evaluations += 1;
    iterations += 1;
    const receiverRadiusUpper = box.alpha1[1];
    const fixedEmissionCausalDerivative = [
      -1 - receiverRadiusUpper,
      receiverRadiusUpper - 1,
    ];
    const quotient = divideEnclosures(
      enclosure.causalResidualEnclosure,
      fixedEmissionCausalDerivative,
    );
    const newtonImage = [
      middle - quotient[1],
      middle - quotient[0],
    ];
    const contracted = intersectEnclosures(
      [lower, upper],
      newtonImage,
    );
    if (contracted &&
        width(contracted) < 0.999 * (upper - lower)) {
      lower = contracted[0];
      upper = contracted[1];
      continue;
    }
    if (enclosure.squaredResidualEnclosure[0] > floor) {
      lower = middle;
      continue;
    }
    if (enclosure.squaredResidualEnclosure[1] < -floor) {
      upper = middle;
      continue;
    }
    break;
  }
  return {
    box: {
      ...box,
      dimensionlessDelay: [lower, upper],
    },
    iterations,
    resourceExhausted: false,
  };
}

function splitBox(box, dimension) {
  return splitInterval(box[dimension]).map((half) => ({
    ...box,
    [dimension]: half,
    depth: box.depth + 1,
  }));
}

function ledgerRow(channel, box, classification, enclosure, reason = null) {
  return {
    channelId: channel.channelId,
    disposition: classification.disposition,
    parameterBox: {
      alpha1: [...box.alpha1],
      alpha3: [...box.alpha3],
      emissionPhase: [...box.emissionPhase],
      dimensionlessDelay: [...box.dimensionlessDelay],
    },
    squaredResidualEnclosure: enclosure?.squaredResidualEnclosure ?? null,
    receptionSquaredDelayDerivativeEnclosure:
      enclosure?.receptionSquaredDelayDerivativeEnclosure ?? null,
    emissionSquaredDelayDerivativeEnclosure:
      enclosure?.emissionSquaredDelayDerivativeEnclosure ?? null,
    receiverPhaseProjectionDerivativeEnclosure:
      classification.projectionDerivativeEnclosure,
    subdivisionDepth: box.depth,
    reason,
  };
}

function certifyRepresentative({
  channel,
  protocol,
  evaluator,
  packetBudget,
  maximumBoxesPerRepresentative,
  maximumBoxesPerPacket,
}) {
  const stack = initialBoxes(channel, protocol).reverse();
  const ledger = [];
  const unresolved = [];
  const counterexampleEnclosures = [];
  let evaluatedBoxes = 0;
  let rootFreeBoxes = 0;
  let positiveProjectionBoxes = 0;
  let delayContractionEvaluations = 0;
  let maximumDepthReached = 0;
  while (stack.length > 0) {
    if (evaluatedBoxes >= maximumBoxesPerRepresentative ||
        packetBudget.boxes >= maximumBoxesPerPacket) {
      const reason = evaluatedBoxes >= maximumBoxesPerRepresentative
        ? "maximum-boxes-per-representative-reached"
        : "maximum-boxes-per-packet-reached";
      for (const pending of stack) {
        const row = ledgerRow(
          channel,
          pending,
          {
            disposition: "unresolved-resource-box",
            projectionDerivativeEnclosure: null,
          },
          null,
          reason,
        );
        ledger.push(row);
        unresolved.push(row);
      }
      break;
    }
    const pendingBox = stack.pop();
    evaluatedBoxes += 1;
    packetBudget.boxes += 1;
    maximumDepthReached = Math.max(maximumDepthReached, pendingBox.depth);
    const contracted = contractDelayRootEnclosure({
      channel,
      box: pendingBox,
      evaluator,
      protocol,
      packetBudget,
    });
    delayContractionEvaluations += contracted.iterations;
    const box = contracted.box;
    if (contracted.resourceExhausted) {
      const row = ledgerRow(
        channel,
        box,
        {
          disposition: "unresolved-resource-box",
          projectionDerivativeEnclosure: null,
        },
        null,
        "maximum-interval-evaluations-per-packet-reached",
      );
      ledger.push(row);
      unresolved.push(row);
      for (const pending of stack) {
        const pendingRow = ledgerRow(
          channel,
          pending,
          {
            disposition: "unresolved-resource-box",
            projectionDerivativeEnclosure: null,
          },
          null,
          "maximum-interval-evaluations-per-packet-reached",
        );
        ledger.push(pendingRow);
        unresolved.push(pendingRow);
      }
      break;
    }
    if (packetBudget.evaluations >=
        protocol.intervalTreatment.maximumIntervalEvaluationsPerPacket) {
      throw new Error("maximum-interval-evaluations-per-packet-reached");
    }
    const enclosure = evaluator.evaluate({
      channelId: channel.channelId,
      alpha1: box.alpha1,
      alpha3: box.alpha3,
      emissionPhase: box.emissionPhase,
      dimensionlessDelay: box.dimensionlessDelay,
    });
    packetBudget.evaluations += 1;
    const classification = classifyProjectionEnclosure(enclosure, protocol);
    if (classification.disposition === "certified-root-free-box") {
      ledger.push(ledgerRow(channel, box, classification, enclosure));
      rootFreeBoxes += 1;
      continue;
    }
    if (classification.disposition ===
        "certified-root-capable-positive-projection-box") {
      ledger.push(ledgerRow(channel, box, classification, enclosure));
      positiveProjectionBoxes += 1;
      continue;
    }
    const splitDimension =
      box.depth < protocol.intervalTreatment.maximumSubdivisionDepth
        ? selectSplitDimension(channel, box, protocol)
        : null;
    if (splitDimension) {
      const children = splitBox(box, splitDimension);
      stack.push(children[1], children[0]);
      continue;
    }
    const reason = box.depth >=
        protocol.intervalTreatment.maximumSubdivisionDepth
      ? "maximum-subdivision-depth-reached"
      : "minimum-partition-width-reached";
    const row = ledgerRow(channel, box, classification, enclosure, reason);
    ledger.push(row);
    if (classification.disposition ===
        "counterexample-nonpositive-projection-box") {
      counterexampleEnclosures.push(row);
    } else {
      unresolved.push(row);
    }
  }
  const projectionRows = ledger.filter((row) =>
    row.receiverPhaseProjectionDerivativeEnclosure !== null &&
    row.disposition ===
      "certified-root-capable-positive-projection-box");
  return {
    channelId: channel.channelId,
    status: counterexampleEnclosures.length > 0
      ? "counterexample-diagnostic"
      : unresolved.length > 0
        ? "drawn-not-evaluated"
        : "evaluated-diagnostic",
    ledger,
    unresolved,
    counterexampleEnclosures,
    continuousProjectionDerivativeLowerBound:
      projectionRows.length > 0
        ? Math.min(...projectionRows.map((row) =>
          row.receiverPhaseProjectionDerivativeEnclosure[0]))
        : null,
    continuousProjectionDerivativeUpperBound:
      projectionRows.length > 0
        ? Math.max(...projectionRows.map((row) =>
          row.receiverPhaseProjectionDerivativeEnclosure[1]))
        : null,
    counts: {
      evaluatedBoxes,
      rootFreeBoxes,
      positiveProjectionBoxes,
      unresolvedBoxes: unresolved.length,
      counterexampleEnclosureBoxes: counterexampleEnclosures.length,
      maximumDepthReached,
      delayContractionEvaluations,
    },
  };
}

function sealedInputControls({
  protocol,
  baseProtocol,
  completeInventorySummary,
  structuralLedgerSummary,
}) {
  validateSummaryHash(
    completeInventorySummary,
    EXPECTED_COMPLETE_SUMMARY_HASH,
    EXPECTED_COMPLETE_RESULT_HASH,
    "complete inventory summary",
  );
  validateSummaryHash(
    structuralLedgerSummary,
    EXPECTED_STRUCTURAL_SUMMARY_HASH,
    EXPECTED_STRUCTURAL_RESULT_HASH,
    "structural ledger summary",
  );
  const baseHash = sha256CoincidentMidpointCommonFrequencyInterval(baseProtocol);
  const complete36 =
    completeInventorySummary.channelAccounting?.orderedChannelCount === 36 &&
    completeInventorySummary.channelAccounting?.counts
      ?.unresolvedChannelCount === 0 &&
    completeInventorySummary.controls?.completeChannelAccounting?.passed ===
      true;
  const structuralIndependent =
    structuralLedgerSummary.ledgerProtocolHash ===
      protocol.sealedInputs.structuralLedgerSummary.ledgerProtocolHash &&
    structuralLedgerSummary.rawLedger?.hash ===
      protocol.sealedInputs.structuralLedgerSummary.rawLedgerHash &&
    structuralLedgerSummary.controls?.independentResidualAndDerivative
      ?.passed === true &&
    structuralLedgerSummary.controls?.sealedTopology?.passed === true;
  const phasesFixed = JSON.stringify(
    baseProtocol.sourceConfiguration?.phaseBaseline,
  ) === JSON.stringify(EXPECTED_PHASES);
  return {
    baseProtocol: {
      id: "coincident-midpoint-common-frequency-projection-base-protocol-provenance.v1",
      expectedHash: EXPECTED_BASE_HASH,
      observedHash: baseHash,
      passed: baseHash === EXPECTED_BASE_HASH,
    },
    complete36ChannelInventory: {
      id: "coincident-midpoint-common-frequency-projection-sealed-36-channel-inventory.v1",
      orderedChannelCount:
        completeInventorySummary.channelAccounting?.orderedChannelCount,
      unresolvedChannelCount:
        completeInventorySummary.channelAccounting?.counts
          ?.unresolvedChannelCount,
      passed: complete36,
    },
    structuralIndependentResidualAndProvenance: {
      id: "coincident-midpoint-common-frequency-projection-sealed-structural-ledger-control.v1",
      ledgerProtocolHash: structuralLedgerSummary.ledgerProtocolHash,
      rawLedgerHash: structuralLedgerSummary.rawLedger?.hash,
      sampledRootCount:
        structuralLedgerSummary.controls?.independentResidualAndDerivative
          ?.sampledRootCount,
      maximumIndependentNormalizedResidual:
        structuralLedgerSummary.controls?.independentResidualAndDerivative
          ?.maximumIndependentNormalizedResidual,
      passed: structuralIndependent,
    },
    fixedRelativePhases: {
      id: "coincident-midpoint-common-frequency-projection-fixed-relative-phase-control.v1",
      expected: EXPECTED_PHASES,
      observed: baseProtocol.sourceConfiguration?.phaseBaseline,
      varyingCoordinate: protocol.relativePhaseLock.varyingCoordinate,
      passed: phasesFixed,
    },
  };
}

function syntheticControls(protocol) {
  const rows = [
    ["positive", protocol.controls.syntheticPositiveProjection],
    ["negative", protocol.controls.syntheticNegativeProjection],
    ["indeterminate", protocol.controls.syntheticIndeterminateProjection],
  ].map(([name, declaration]) => {
    const classification = classifyProjectionEnclosure(declaration, protocol);
    return {
      name,
      expectedDisposition: declaration.requiredDisposition,
      observedDisposition: classification.disposition,
      passed:
        classification.disposition === declaration.requiredDisposition,
    };
  });
  return {
    id: "coincident-midpoint-common-frequency-projection-classifier-positive-negative-controls.v1",
    rows,
    passed: rows.every((row) => row.passed),
  };
}

function endpointInversionControl({
  protocol,
  channelById,
  evaluator,
}) {
  const domain = protocol.certificate.domain;
  let comparisonCount = 0;
  let maximumDifference = 0;
  const auditAlpha1 = [
    domain.alpha1[0],
    midpoint(domain.alpha1),
    domain.alpha1[1],
  ];
  const auditAlpha3 = [
    domain.alpha3[0],
    midpoint(domain.alpha3),
    domain.alpha3[1],
  ];
  const auditPhases = [0, Math.PI / 7, Math.PI, TWO_PI];
  const auditDelays = [
    domain.dimensionlessDelay[0],
    midpoint(domain.dimensionlessDelay),
    domain.dimensionlessDelay[1],
  ];
  for (const mapping of protocol.endpointInversionReuse) {
    const representative = channelById.get(mapping.representative);
    const reused = channelById.get(mapping.reused);
    if (!representative || !reused) {
      throw new TypeError("projection endpoint-inversion channel is missing.");
    }
    for (const alpha1 of auditAlpha1) {
      for (const alpha3 of auditAlpha3) {
        for (const emissionPhase of auditPhases) {
          for (const delay of auditDelays) {
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
              channelId: reused.channelId,
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
    id: "coincident-midpoint-common-frequency-projection-endpoint-inversion-control.v1",
    comparisonCount,
    maximumEnclosureEndpointDifference: maximumDifference,
    tolerance: 1e-12,
    passed: maximumDifference <= 1e-12,
  };
}

function phaseSeamControl({
  protocol,
  representatives,
  evaluator,
}) {
  const domain = protocol.certificate.domain;
  let maximumDifference = 0;
  let replayCount = 0;
  for (const channel of representatives) {
    for (const alpha1 of domain.alpha1) {
      for (const alpha3 of domain.alpha3) {
        for (const delay of [
          domain.dimensionlessDelay[0],
          midpoint(domain.dimensionlessDelay),
          domain.dimensionlessDelay[1],
        ]) {
          const common = {
            channelId: channel.channelId,
            alpha1: [alpha1, alpha1],
            alpha3: [alpha3, alpha3],
            dimensionlessDelay: [delay, delay],
          };
          const left = evaluator.evaluate({
            ...common,
            emissionPhase: [0, 0],
          });
          const right = evaluator.evaluate({
            ...common,
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
    id: "coincident-midpoint-common-frequency-projection-emission-phase-seam-control.v1",
    replayCount,
    maximumEnclosureEndpointDifference: maximumDifference,
    tolerance: 1e-12,
    passed: maximumDifference <= 1e-12,
  };
}

function independentWitnessControl({
  protocol,
  baseProtocol,
  structuralLedgerSummary,
  channelById,
  evaluator,
}) {
  const declaration = protocol.controls.independentWitnessRecomputation;
  const targetRows = structuralLedgerSummary.channelSummaries.filter((row) =>
    protocol.targetOrderedChannelIds.includes(row.channelId));
  const witnesses = targetRows.flatMap((row) => [
    row.sampledDelayWitnesses.minimum,
    row.sampledDelayWitnesses.maximum,
  ]);
  let maximumNormalizedResidual = 0;
  let maximumReceptionDerivativeDifference = 0;
  let maximumEmissionDerivativeDifference = 0;
  for (const witness of witnesses) {
    const channel = channelById.get(witness.channelId);
    if (!channel) {
      throw new TypeError(
        `independent projection witness channel ${witness.channelId} is missing.`,
      );
    }
    const epsilon = witness.phaseCoordinate;
    const delay = witness.delay;
    const step = declaration.finiteDifferenceStep;
    const direct = (receptionPhase, pointDelay) =>
      recomputeCoincidentMidpointCommonFrequencySquaredCausalResidual({
        protocol: baseProtocol,
        receiver: channel.receiver,
        transmitter: channel.transmitter,
        alpha1: witness.alpha1,
        alpha3: witness.alpha3,
        receptionPhase,
        delay: pointDelay,
      });
    const root = direct(witness.receptionPhase, delay);
    maximumNormalizedResidual = Math.max(
      maximumNormalizedResidual,
      Math.abs(root.normalizedResidual),
    );
    const receptionLower = direct(witness.receptionPhase, delay - step);
    const receptionUpper = direct(witness.receptionPhase, delay + step);
    const directReceptionDerivative =
      (receptionUpper.squaredResidual -
        receptionLower.squaredResidual) / (2 * step);
    const emissionLower = direct(epsilon + delay - step, delay - step);
    const emissionUpper = direct(epsilon + delay + step, delay + step);
    const directEmissionDerivative =
      (emissionUpper.squaredResidual -
        emissionLower.squaredResidual) / (2 * step);
    const primary = evaluator.evaluate({
      channelId: channel.channelId,
      alpha1: [witness.alpha1, witness.alpha1],
      alpha3: [witness.alpha3, witness.alpha3],
      emissionPhase: [epsilon, epsilon],
      dimensionlessDelay: [delay, delay],
    });
    const enclosureMidpoint = (value) => (value[0] + value[1]) / 2;
    maximumReceptionDerivativeDifference = Math.max(
      maximumReceptionDerivativeDifference,
      Math.abs(
        directReceptionDerivative -
        enclosureMidpoint(
          primary.receptionSquaredDelayDerivativeEnclosure,
        ),
      ),
    );
    maximumEmissionDerivativeDifference = Math.max(
      maximumEmissionDerivativeDifference,
      Math.abs(
        directEmissionDerivative -
        enclosureMidpoint(
          primary.emissionSquaredDelayDerivativeEnclosure,
        ),
      ),
    );
  }
  return {
    id: "coincident-midpoint-common-frequency-projection-independent-witness-recomputation.v1",
    witnessCount: witnesses.length,
    finiteDifferenceStep: declaration.finiteDifferenceStep,
    maximumNormalizedResidual,
    normalizedResidualFloor: declaration.maximumNormalizedResidual,
    maximumReceptionSquaredDerivativeDifference:
      maximumReceptionDerivativeDifference,
    maximumEmissionSquaredDerivativeDifference:
      maximumEmissionDerivativeDifference,
    derivativeDifferenceTolerance:
      declaration.maximumSquaredDerivativeDifference,
    passed:
      witnesses.length === 12 &&
      maximumNormalizedResidual <= declaration.maximumNormalizedResidual &&
      maximumReceptionDerivativeDifference <=
        declaration.maximumSquaredDerivativeDifference &&
      maximumEmissionDerivativeDifference <=
        declaration.maximumSquaredDerivativeDifference,
  };
}

function compactRepresentative(row) {
  return {
    channelId: row.channelId,
    status: row.status,
    continuousProjectionDerivativeLowerBound:
      row.continuousProjectionDerivativeLowerBound,
    continuousProjectionDerivativeUpperBound:
      row.continuousProjectionDerivativeUpperBound,
    counts: row.counts,
    unresolved: row.unresolved.slice(0, 24),
    counterexampleEnclosures: row.counterexampleEnclosures.slice(0, 24),
    rawLedgerHash: sha256CoincidentMidpointCommonFrequencyInterval(row.ledger),
  };
}

function analyticRepresentativeCertificate(channel, protocol) {
  const transmitterClass =
    channel.transmitter.radiusParameter === "alpha2"
      ? "middleTransmitter"
      : channel.transmitter.radiusParameter === "alpha3"
        ? "outerTransmitter"
        : null;
  if (!transmitterClass) {
    throw new TypeError(
      `unsupported projection transmitter class for ${channel.channelId}.`,
    );
  }
  const bound =
    protocol.certificate.analyticRootGeometryBound[transmitterClass];
  const row = {
    channelId: channel.channelId,
    disposition: "certified-continuous-positive-projection-root-sheet",
    method:
      protocol.certificate.analyticRootGeometryBound.method,
    parameterDomain: structuredClone(protocol.certificate.domain),
    relativePhaseBaseline:
      structuredClone(protocol.relativePhaseLock.phaseBaseline),
    varyingCoordinate: protocol.relativePhaseLock.varyingCoordinate,
    rootDotIdentity:
      protocol.certificate.analyticRootGeometryBound.rootDotIdentity,
    orthogonalDerivativeBound:
      protocol.certificate.analyticRootGeometryBound
        .orthogonalDerivativeBound,
    positivePolynomial:
      protocol.certificate.analyticRootGeometryBound.positivePolynomial,
    transmitterClass,
    positivePolynomialLowerBound:
      bound.positivePolynomialLowerBound,
    receptionSquaredDelayDerivativeUpperBound:
      bound.receptionSquaredDelayDerivativeUpperBound,
    emissionSquaredDelayDerivativeUpperBound:
      bound.emissionSquaredDelayDerivativeUpperBound,
    receiverPhaseProjectionDerivativeEnclosure: [
      bound.projectionDerivativeLowerBound,
      bound.projectionDerivativeUpperBound,
    ],
    claimBoundary:
      "exact prescribed-circle root-sheet bound; not an EOM, stability, or physical claim",
  };
  return {
    channelId: channel.channelId,
    status: "evaluated-diagnostic",
    ledger: [row],
    unresolved: [],
    counterexampleEnclosures: [],
    continuousProjectionDerivativeLowerBound:
      bound.projectionDerivativeLowerBound,
    continuousProjectionDerivativeUpperBound:
      bound.projectionDerivativeUpperBound,
    counts: {
      evaluatedBoxes: 0,
      rootFreeBoxes: 0,
      positiveProjectionBoxes: 1,
      unresolvedBoxes: 0,
      counterexampleEnclosureBoxes: 0,
      maximumDepthReached: 0,
      delayContractionEvaluations: 0,
    },
  };
}

export function evaluateCoincidentMidpointCommonFrequencyReceiverPhaseProjectionMonotonicity({
  projectionProtocol: rawProjectionProtocol,
  baseProtocol: rawBaseProtocol,
  completeInventorySummary,
  structuralLedgerSummary,
  executionLimits = {},
} = {}) {
  const protocol =
    validateCoincidentMidpointCommonFrequencyProjectionMonotonicityProtocol(rawProjectionProtocol);
  const baseProtocol =
    validateCoincidentMidpointCommonFrequencyContinuousRootInventoryProtocol(rawBaseProtocol);
  const maximumBoxesPerRepresentative =
    executionLimits.maximumBoxesPerRepresentative ??
    protocol.intervalTreatment.maximumBoxesPerRepresentative;
  const maximumBoxesPerPacket =
    executionLimits.maximumBoxesPerPacket ??
    protocol.intervalTreatment.maximumBoxesPerPacket;
  if (maximumBoxesPerRepresentative >
        protocol.intervalTreatment.maximumBoxesPerRepresentative ||
      maximumBoxesPerPacket >
        protocol.intervalTreatment.maximumBoxesPerPacket) {
    throw new RangeError(
      "coincident-midpoint common-frequency three-axis circular configuration projection execution limits may not exceed declared ceilings.",
    );
  }
  const sealedControls = sealedInputControls({
    protocol,
    baseProtocol: rawBaseProtocol,
    completeInventorySummary,
    structuralLedgerSummary,
  });
  const allChannels = buildCoincidentMidpointCommonFrequencyOrderedChannelInventory(baseProtocol);
  const channelById = new Map(allChannels.map((channel) => [
    channel.channelId,
    channel,
  ]));
  const representatives = protocol.representativeChannelIds.map((channelId) => {
    const channel = channelById.get(channelId);
    if (!channel || channel.receiver.radiusParameter !== "alpha1") {
      throw new TypeError(
        `projection representative ${channelId} must have the inner receiver.`,
      );
    }
    return channel;
  });
  const evaluator = createCoincidentMidpointCommonFrequencyEmissionFixedProjectionEvaluator(baseProtocol);
  const packetBudget = { boxes: 0, evaluations: 0 };
  const representativeResults = representatives.map((channel) =>
    analyticRepresentativeCertificate(channel, protocol));
  const synthetic = syntheticControls(protocol);
  const endpointInversion = endpointInversionControl({
    protocol,
    channelById,
    evaluator,
  });
  const phaseSeam = phaseSeamControl({
    protocol,
    representatives,
    evaluator,
  });
  const independentWitness = independentWitnessControl({
    protocol,
    baseProtocol,
    structuralLedgerSummary,
    channelById,
    evaluator,
  });
  const resourcePacket = { boxes: 0, evaluations: 0 };
  const resourceResult = certifyRepresentative({
    channel: representatives[0],
    protocol,
    evaluator,
    packetBudget: resourcePacket,
    maximumBoxesPerRepresentative:
      protocol.controls.resourceExhaustion.maximumBoxesPerRepresentative,
    maximumBoxesPerPacket:
      protocol.controls.resourceExhaustion.maximumBoxesPerRepresentative,
  });
  const resourceExhaustion = {
    id: "coincident-midpoint-common-frequency-projection-resource-exhaustion-negative-control.v1",
    status: resourceResult.status,
    score: null,
    unresolvedBoxCount: resourceResult.unresolved.length,
    passed:
      resourceResult.status ===
        protocol.controls.resourceExhaustion.requiredStatus &&
      resourceResult.unresolved.length > 0,
  };
  const anyCounterexample = representativeResults.some((row) =>
    row.counterexampleEnclosures.length > 0);
  const anyUnresolved = representativeResults.some((row) =>
    row.unresolved.length > 0);
  const requiredControlObjects = [
    ...Object.values(sealedControls),
    synthetic,
    endpointInversion,
    phaseSeam,
    independentWitness,
    resourceExhaustion,
  ];
  const allControlsPassed = requiredControlObjects.every((control) =>
    control.passed === true);
  const statusCode = anyCounterexample
    ? protocol.completionRule.statusWhenCounterexampleFound
    : anyUnresolved || !allControlsPassed
      ? protocol.completionRule.statusWhenAnyObligationUnresolved
      : protocol.completionRule.statusWhenComplete;
  const targetResults = protocol.endpointInversionReuse.flatMap((mapping) => {
    const representative = representativeResults.find((row) =>
      row.channelId === mapping.representative);
    return [
      {
        channelId: mapping.representative,
        representativeChannelId: mapping.representative,
        reuse: false,
        status: representative.status,
        continuousProjectionDerivativeLowerBound:
          representative.continuousProjectionDerivativeLowerBound,
        continuousProjectionDerivativeUpperBound:
          representative.continuousProjectionDerivativeUpperBound,
      },
      {
        channelId: mapping.reused,
        representativeChannelId: mapping.representative,
        reuse: true,
        status: representative.status,
        continuousProjectionDerivativeLowerBound:
          representative.continuousProjectionDerivativeLowerBound,
        continuousProjectionDerivativeUpperBound:
          representative.continuousProjectionDerivativeUpperBound,
      },
    ];
  }).sort((left, right) => left.channelId.localeCompare(right.channelId));
  const resultWithoutHash = {
    schema: COINCIDENT_MIDPOINT_COMMON_FREQUENCY_PROJECTION_MONOTONICITY_RESULT_SCHEMA,
    scientificIdentity: protocol.sourceConfiguration.scientificIdentity,
    evaluator: {
      id: "coincident-midpoint-common-frequency-receiver-phase-projection-monotonicity-certifier",
      version: 1,
      prescribedPathAnalyticsOnly: true,
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
      eomIntervalMachineryInvoked: false,
      eomCampaignInvoked: false,
      diagnosticOnly: true,
    },
    projectionProtocolHash: sha256CoincidentMidpointCommonFrequencyInterval(rawProjectionProtocol),
    sealedInputs: protocol.sealedInputs,
    relativePhaseLock: protocol.relativePhaseLock,
    status: {
      code: statusCode,
      score: null,
      reason: statusCode === "evaluated-diagnostic"
        ? "continuous-positive-projection-certificate-complete-for-six-emission-fixed-channels"
        : statusCode === "counterexample-diagnostic"
          ? "one-or-more-certified-enclosures-have-nonpositive-projection"
          : "one-or-more-projection-sign-obligations-remain-unresolved",
    },
    continuousConclusion: statusCode === "evaluated-diagnostic"
      ? protocol.certificate.continuousConclusionWhenComplete
      : null,
    resources: {
      declared: protocol.intervalTreatment,
      analyticDomainCertificates: representativeResults.length,
      intervalPartitionUsedForConclusion: false,
      intervalFallbackRetainedAsFailClosedControl: true,
      executedBoxes: packetBudget.boxes,
      intervalEvaluations: packetBudget.evaluations,
      executionLimits: {
        maximumBoxesPerRepresentative,
        maximumBoxesPerPacket,
      },
    },
    controls: {
      ...sealedControls,
      syntheticProjectionClassifier: synthetic,
      endpointInversion,
      phaseSeam,
      independentWitness,
      resourceExhaustion,
    },
    targetChannelResults: targetResults,
    representativeResults,
    claimBoundary: protocol.claimBoundary,
  };
  return {
    ...resultWithoutHash,
    resultHash: sha256CoincidentMidpointCommonFrequencyInterval(resultWithoutHash),
  };
}

export function summarizeCoincidentMidpointCommonFrequencyReceiverPhaseProjectionMonotonicity(result) {
  if (!result ||
      result.schema !== COINCIDENT_MIDPOINT_COMMON_FREQUENCY_PROJECTION_MONOTONICITY_RESULT_SCHEMA) {
    throw new TypeError(
      `result must use schema ${COINCIDENT_MIDPOINT_COMMON_FREQUENCY_PROJECTION_MONOTONICITY_RESULT_SCHEMA}.`,
    );
  }
  const summaryWithoutHash = {
    schema: COINCIDENT_MIDPOINT_COMMON_FREQUENCY_PROJECTION_MONOTONICITY_SUMMARY_SCHEMA,
    scientificIdentity: result.scientificIdentity,
    evaluator: result.evaluator,
    projectionProtocolHash: result.projectionProtocolHash,
    sealedInputs: result.sealedInputs,
    resultHash: result.resultHash,
    relativePhaseLock: result.relativePhaseLock,
    status: result.status,
    continuousConclusion: result.continuousConclusion,
    resources: result.resources,
    controls: result.controls,
    targetChannelResults: result.targetChannelResults,
    representativeSummaries:
      result.representativeResults.map(compactRepresentative),
    rawLedger: {
      representativeCount: result.representativeResults.length,
      rowCount: result.representativeResults.reduce(
        (sum, row) => sum + row.ledger.length,
        0,
      ),
      hash: sha256CoincidentMidpointCommonFrequencyInterval(
        result.representativeResults.map((row) => row.ledger),
      ),
      location: "full result artifact bound by resultHash",
    },
    claimBoundary: result.claimBoundary,
  };
  return {
    ...summaryWithoutHash,
    summaryHash: sha256CoincidentMidpointCommonFrequencyInterval(summaryWithoutHash),
  };
}

export {
  analyticRepresentativeCertificate as
    certifyCoincidentMidpointCommonFrequencyProjectionAnalyticRepresentative,
  certifyRepresentative as certifyCoincidentMidpointCommonFrequencyProjectionRepresentativeInterval,
  endpointInversionControl as runCoincidentMidpointCommonFrequencyProjectionEndpointInversionControl,
  phaseSeamControl as runCoincidentMidpointCommonFrequencyProjectionPhaseSeamControl,
  syntheticControls as runCoincidentMidpointCommonFrequencyProjectionSyntheticControls,
};
