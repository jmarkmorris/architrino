import {
  buildA11OrderedChannelInventory,
  createA11InterBinaryRootFoldEvaluator,
  sha256A11Interval,
  validateA11ContinuousRootInventoryProtocol,
} from "./A11ContinuousRootIntervalCertifier.mjs";
import {
  recomputeA11SquaredCausalResidual,
} from "./A11IndependentResidualRecomputation.mjs";

export const A11_ROOT_SHEET_TREATMENT_PROTOCOL_SCHEMA =
  "prescribed-path-analysis/a1-1-root-sheet-monotonic-enclosure-treatment-protocol.v1";
export const A11_ROOT_SHEET_TREATMENT_RESULT_SCHEMA =
  "prescribed-path-analysis/a1-1-root-sheet-monotonic-enclosure-treatment-result.v1";
export const A11_ROOT_SHEET_TREATMENT_SUMMARY_SCHEMA =
  "prescribed-path-analysis/a1-1-root-sheet-monotonic-enclosure-treatment-summary.v1";

const TWO_PI = 2 * Math.PI;
const EXPECTED_ALPHA1 = Object.freeze([7 / 8, 15 / 16]);
const EXPECTED_ALPHA3 = Object.freeze([17 / 16, 9 / 8]);
const EXPECTED_DELAY = Object.freeze([1 / 32, 9 / 4]);
const EXPECTED_BASE_PROTOCOL_HASH =
  "7b2a3a2a56abbe97971d3fae447cd3406724cb2c5916e8ba3a0d39ad80772849";
const EXPECTED_SEALED_SUMMARY_HASH =
  "624f5350ac3a0e4e57cf9da08225c1d7a635daa16c959dd96dc0778440256cdb";
const EXPECTED_SEALED_RESULT_HASH =
  "c2673e581fed4948536c18478b364f516ea821761e8d45c03d38dfeed814ab9f";
const EXPECTED_CLOSED_CHANNEL_IDS = Object.freeze([
  "a1-1-binary-1-endpoint-1<-a1-1-binary-2-endpoint-1",
  "a1-1-binary-1-endpoint-2<-a1-1-binary-2-endpoint-2",
  "a1-1-binary-2-endpoint-1<-a1-1-binary-3-endpoint-1",
  "a1-1-binary-2-endpoint-2<-a1-1-binary-3-endpoint-2",
  "a1-1-binary-3-endpoint-1<-a1-1-binary-1-endpoint-1",
  "a1-1-binary-3-endpoint-2<-a1-1-binary-1-endpoint-2",
]);
const EXPECTED_TARGET_REPRESENTATIVES = Object.freeze([
  "a1-1-binary-1-endpoint-1<-a1-1-binary-2-endpoint-2",
  "a1-1-binary-1-endpoint-1<-a1-1-binary-3-endpoint-1",
  "a1-1-binary-1-endpoint-1<-a1-1-binary-3-endpoint-2",
  "a1-1-binary-2-endpoint-1<-a1-1-binary-1-endpoint-1",
  "a1-1-binary-2-endpoint-1<-a1-1-binary-1-endpoint-2",
  "a1-1-binary-2-endpoint-1<-a1-1-binary-3-endpoint-2",
  "a1-1-binary-3-endpoint-1<-a1-1-binary-1-endpoint-2",
  "a1-1-binary-3-endpoint-1<-a1-1-binary-2-endpoint-1",
  "a1-1-binary-3-endpoint-1<-a1-1-binary-2-endpoint-2",
]);

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new TypeError(`${label} must be finite.`);
  return number;
}

function positiveNumber(value, label) {
  const number = finiteNumber(value, label);
  if (!(number > 0)) throw new RangeError(`${label} must be positive.`);
  return number;
}

function positiveInteger(value, label) {
  const number = finiteNumber(value, label);
  if (!Number.isSafeInteger(number) || number < 1) {
    throw new RangeError(`${label} must be a positive safe integer.`);
  }
  return number;
}

function exactArray(actual, expected, label) {
  if (!Array.isArray(actual) ||
      actual.length !== expected.length ||
      actual.some((value, index) => value !== expected[index])) {
    throw new TypeError(`${label} must equal ${JSON.stringify(expected)}.`);
  }
}

function exactDomain(protocol) {
  const domain = protocol.rootSheet?.domain;
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
}

export function validateA11RootSheetTreatmentProtocol(rawProtocol) {
  if (!rawProtocol || typeof rawProtocol !== "object" ||
      Array.isArray(rawProtocol)) {
    throw new TypeError("A1.1 root-sheet treatment protocol must be an object.");
  }
  if (rawProtocol.schema !== A11_ROOT_SHEET_TREATMENT_PROTOCOL_SCHEMA) {
    throw new TypeError(
      `A1.1 root-sheet treatment requires schema ` +
      `${A11_ROOT_SHEET_TREATMENT_PROTOCOL_SCHEMA}.`,
    );
  }
  if (rawProtocol.claimGrade !== "diagnostic" ||
      rawProtocol.claimBoundary?.prescribedPathAnalyticsOnly !== true ||
      rawProtocol.claimBoundary?.pathEvolutionInvoked !== false ||
      rawProtocol.claimBoundary?.eomSolverInvoked !== false ||
      rawProtocol.claimBoundary?.diagnosticOnly !== true ||
      rawProtocol.claimBoundary?.score !== null) {
    throw new TypeError(
      "A1.1 root-sheet treatment must preserve the null-score diagnostic boundary.",
    );
  }
  if (rawProtocol.baseProtocol?.sha256 !== EXPECTED_BASE_PROTOCOL_HASH) {
    throw new TypeError("A1.1 root-sheet treatment has the wrong base protocol hash.");
  }
  if (rawProtocol.sealedRegressionReceipt?.summaryHash !==
        EXPECTED_SEALED_SUMMARY_HASH ||
      rawProtocol.sealedRegressionReceipt?.resultHash !==
        EXPECTED_SEALED_RESULT_HASH) {
    throw new TypeError("A1.1 root-sheet treatment has the wrong sealed receipt hash.");
  }
  exactArray(
    rawProtocol.sealedRegressionReceipt?.closedInterBinaryChannelIds,
    EXPECTED_CLOSED_CHANNEL_IDS,
    "sealedRegressionReceipt.closedInterBinaryChannelIds",
  );
  exactArray(
    rawProtocol.targetRepresentatives,
    EXPECTED_TARGET_REPRESENTATIVES,
    "targetRepresentatives",
  );
  if (rawProtocol.rootSheet?.dependentVariable !== "dimensionlessDelay" ||
      rawProtocol.rootSheet?.phaseSeam !==
        "theta-zero-identified-with-two-pi/exact-four-pi-sigma-periodicity.v1" ||
      rawProtocol.rootSheet?.rootCountInvarianceTheorem?.id !==
        "connected-parameter-domain/no-root-endpoint/no-fold-root-count-invariance.v1" ||
      rawProtocol.rootSheet?.subFieldSpeedCoordinateCharts?.id !==
        "a1-1-sub-field-endpoint-root-sheet-coordinate-charts.v1" ||
      rawProtocol.rootSheet?.subFieldSpeedCoordinateCharts?.receptionFixed
        ?.causalResidualDerivativeUpperBound !== "alpha1_max-1=-1/16" ||
      rawProtocol.rootSheet?.subFieldSpeedCoordinateCharts?.emissionFixed
        ?.causalResidualDerivativeUpperBound !== "alpha1_max-1=-1/16") {
    throw new TypeError("A1.1 root-sheet variables or theorem identity drifted.");
  }
  exactDomain(rawProtocol);
  const fold = rawProtocol.foldExclusion;
  for (const field of [
    "squaredResidualExclusionFloor",
    "squaredDelayDerivativeExclusionFloor",
    "minimumAlphaWidth",
    "minimumReceptionPhaseWidth",
    "minimumDelayWidth",
  ]) {
    positiveNumber(fold?.[field], `foldExclusion.${field}`);
  }
  for (const field of [
    "intervalPaddingUlps",
    "initialRatioSubdivisions",
    "initialReceptionPhaseSubdivisions",
    "maximumSubdivisionDepth",
    "maximumBoxesPerRepresentative",
    "maximumBoxesPerPacket",
  ]) {
    positiveInteger(fold?.[field], `foldExclusion.${field}`);
  }
  if (fold.maximumSubdivisionDepth !== 18 ||
      fold.squaredResidualExclusionFloor !== 1e-10 ||
      fold.squaredDelayDerivativeExclusionFloor !== 1e-8 ||
      fold.intervalPaddingUlps !== 4 ||
      fold.initialRatioSubdivisions !== 2 ||
      fold.initialReceptionPhaseSubdivisions !== 24 ||
      fold.maximumBoxesPerRepresentative !== 20000 ||
      fold.maximumBoxesPerPacket !== 180000 ||
      fold.minimumAlphaWidth !== 1 / 65536 ||
      fold.minimumReceptionPhaseWidth !== TWO_PI / 65536 ||
      fold.minimumDelayWidth !== (9 / 4) / 65536 ||
      fold.splitPolicy !== "largest-active-normalized-width.v1") {
    throw new TypeError(
      "A1.1 root-sheet treatment may not relax the reviewed fold-exclusion resources.",
    );
  }
  const anchor = rawProtocol.anchorRootInventory;
  if (anchor?.point?.alpha1 !== 29 / 32 ||
      anchor?.point?.alpha3 !== 35 / 32 ||
      anchor?.point?.coordinatePhase !== Math.PI / 7 ||
      anchor?.point?.coordinateRule !==
        "use-epsilon-in-emission-fixed-chart; otherwise-use-theta" ||
      anchor?.expectedRootCountPerRepresentative !== 1) {
    throw new TypeError("A1.1 root-sheet treatment requires one anchor root.");
  }
  for (const field of [
    "minimumDelayWidth",
    "rootResidualFloor",
    "rootTransversalityFloor",
    "independentNormalizedResidualFloor",
    "rootSeparationFloor",
  ]) {
    positiveNumber(anchor?.[field], `anchorRootInventory.${field}`);
  }
  for (const field of [
    "initialDelaySubdivisions",
    "maximumSubdivisionDepth",
    "maximumBoxesPerRepresentative",
  ]) {
    positiveInteger(anchor?.[field], `anchorRootInventory.${field}`);
  }
  if (anchor.initialDelaySubdivisions !== 32 ||
      anchor.maximumSubdivisionDepth !== 48 ||
      anchor.maximumBoxesPerRepresentative !== 4096 ||
      anchor.minimumDelayWidth !== 1e-10 ||
      anchor.rootResidualFloor !== 1e-10 ||
      anchor.rootTransversalityFloor !== 1e-8 ||
      anchor.independentNormalizedResidualFloor !== 1e-9 ||
      anchor.rootSeparationFloor !== 1e-7 ||
      anchor.boundaryOwnership !==
        "left-open-right-closed/internal; near-zero-and-history-edge-owned-by-endpoint-proofs.v1") {
    throw new TypeError("A1.1 root-sheet anchor declaration drifted.");
  }
  if (rawProtocol.negativeControls?.syntheticFold?.requiredDisposition !==
        "unresolved-possible-fold-box" ||
      rawProtocol.negativeControls?.resourceExhaustion
        ?.maximumBoxesPerRepresentative !== 1 ||
      rawProtocol.negativeControls?.resourceExhaustion?.requiredStatus !==
        "drawn-not-evaluated" ||
      rawProtocol.negativeControls?.resourceExhaustion?.requiredScore !== null ||
      rawProtocol.completionRule?.statusWhenComplete !== "evaluated-diagnostic" ||
      rawProtocol.completionRule?.statusWhenAnyObligationFails !==
        "drawn-not-evaluated" ||
      rawProtocol.completionRule?.score !== null ||
      rawProtocol.completionRule?.noCandidateFailureFromUnresolved !== true) {
    throw new TypeError(
      "A1.1 root-sheet treatment must preserve fail-closed null-score completion.",
    );
  }
  return structuredClone(rawProtocol);
}

function summaryHashWithoutField(summary) {
  return sha256A11Interval(Object.fromEntries(
    Object.entries(summary).filter(([key]) => key !== "summaryHash"),
  ));
}

function validateSealedRegressionReceipt(protocol, summary) {
  const closedIds = summary.channelSummaries
    .filter((row) =>
      row.channelKind === "inter-binary" &&
      row.status === "evaluated-diagnostic")
    .map((row) => row.channelId);
  const passed =
    summary.summaryHash === protocol.sealedRegressionReceipt.summaryHash &&
    summaryHashWithoutField(summary) === summary.summaryHash &&
    summary.resultHash === protocol.sealedRegressionReceipt.resultHash &&
    JSON.stringify(closedIds) === JSON.stringify(
      protocol.sealedRegressionReceipt.closedInterBinaryChannelIds,
    );
  return {
    id: "sealed-six-channel-regression-control.v1",
    passed,
    reEvaluatedClosedChannels: false,
    sealedSummaryHash: summary.summaryHash,
    recomputedSummaryHash: summaryHashWithoutField(summary),
    sealedResultHash: summary.resultHash,
    closedInterBinaryChannelIds: closedIds,
  };
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
  const span = width(value) / count;
  return Array.from({ length: count }, (_, index) => [
    value[0] + index * span,
    index + 1 === count ? value[1] : value[0] + (index + 1) * span,
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
    "receptionPhase",
    "dimensionlessDelay",
  ];
}

function initialFoldBoxes(channel, protocol) {
  const domain = protocol.rootSheet.domain;
  const dimensions = activeDimensions(channel);
  const ratioCount = protocol.foldExclusion.initialRatioSubdivisions;
  const alpha1 = dimensions.includes("alpha1")
    ? partitionInterval(domain.alpha1, ratioCount)
    : [domain.alpha1];
  const alpha3 = dimensions.includes("alpha3")
    ? partitionInterval(domain.alpha3, ratioCount)
    : [domain.alpha3];
  const phase = partitionInterval(
    [0, TWO_PI],
    protocol.foldExclusion.initialReceptionPhaseSubdivisions,
  );
  const boxes = [];
  for (const alpha1Box of alpha1) {
    for (const alpha3Box of alpha3) {
      for (const phaseBox of phase) {
        boxes.push({
          alpha1: [...alpha1Box],
          alpha3: [...alpha3Box],
          receptionPhase: [...phaseBox],
          dimensionlessDelay: [...domain.dimensionlessDelayInterior],
          depth: 0,
        });
      }
    }
  }
  return boxes;
}

function excludesZero(value, floor) {
  return value[0] > floor || value[1] < -floor;
}

function selectSplitDimension(channel, box, protocol) {
  const domain = protocol.rootSheet.domain;
  const fullWidths = {
    alpha1: width(domain.alpha1),
    alpha3: width(domain.alpha3),
    receptionPhase: TWO_PI,
    dimensionlessDelay: width(domain.dimensionlessDelayInterior),
  };
  const minimumWidths = {
    alpha1: protocol.foldExclusion.minimumAlphaWidth,
    alpha3: protocol.foldExclusion.minimumAlphaWidth,
    receptionPhase: protocol.foldExclusion.minimumReceptionPhaseWidth,
    dimensionlessDelay: protocol.foldExclusion.minimumDelayWidth,
  };
  return activeDimensions(channel)
    .filter((key) => width(box[key]) > minimumWidths[key])
    .map((key) => ({ key, score: width(box[key]) / fullWidths[key] }))
    .sort((left, right) =>
      right.score - left.score || left.key.localeCompare(right.key))[0]?.key ?? null;
}

function splitBox(box, dimension) {
  return splitInterval(box[dimension]).map((half) => ({
    ...box,
    [dimension]: half,
    depth: box.depth + 1,
  }));
}

function foldLedgerRow(channel, box, disposition, enclosure, reason = null) {
  return {
    channelId: channel.channelId,
    disposition,
    parameterBox: {
      alpha1: [...box.alpha1],
      alpha3: [...box.alpha3],
      receptionPhase: [...box.receptionPhase],
      dimensionlessDelay: [...box.dimensionlessDelay],
    },
    squaredResidualEnclosure:
      enclosure?.squaredResidualEnclosure ?? null,
    squaredDelayDerivativeEnclosure:
      enclosure?.squaredDelayDerivativeEnclosure ?? null,
    subdivisionDepth: box.depth,
    reason,
  };
}

function subFieldSpeedCoordinateChart(channel, protocol) {
  const charts = protocol.rootSheet.subFieldSpeedCoordinateCharts;
  const alpha1Upper = protocol.rootSheet.domain.alpha1[1];
  const derivativeUpperBound = alpha1Upper - 1;
  if (channel.transmitter.radiusParameter === "alpha1") {
    return {
      id: charts.id,
      chart: "reception-fixed",
      parameterPhase: charts.receptionFixed.parameterPhase,
      dependentVariable: charts.receptionFixed.dependentVariable,
      movingEndpointAtFixedPhase:
        charts.receptionFixed.movingEndpointAtFixedPhase,
      radiusUpperBound: alpha1Upper,
      causalResidualDerivativeUpperBound: derivativeUpperBound,
      squaredResidualFoldExcludedAtPositiveDelayRoots: true,
      domainCoverage: charts.chartTransition.domainCoverage,
      seamRule: charts.chartTransition.seamRule,
      chartTransition: "identity",
    };
  }
  if (channel.receiver.radiusParameter === "alpha1") {
    return {
      id: charts.id,
      chart: "emission-fixed",
      parameterPhase: charts.emissionFixed.parameterPhase,
      dependentVariable: charts.emissionFixed.dependentVariable,
      movingEndpointAtFixedPhase:
        charts.emissionFixed.movingEndpointAtFixedPhase,
      radiusUpperBound: alpha1Upper,
      causalResidualDerivativeUpperBound: derivativeUpperBound,
      squaredResidualFoldExcludedAtPositiveDelayRoots: true,
      domainCoverage: charts.chartTransition.domainCoverage,
      seamRule: charts.chartTransition.seamRule,
      chartTransition: charts.chartTransition.map,
    };
  }
  return null;
}

function certifyRepresentativeNoFold({
  channel,
  protocol,
  evaluator,
  packetBudget,
  maximumBoxesPerRepresentative,
  maximumBoxesPerPacket,
}) {
  const coordinateChart = subFieldSpeedCoordinateChart(channel, protocol);
  if (coordinateChart) {
    return {
      channelId: channel.channelId,
      status: "fold-excluded-diagnostic",
      method: "exact-sub-field-endpoint-coordinate-chart.v1",
      coordinateChart,
      ledger: [{
        channelId: channel.channelId,
        disposition: "certified-root-capable-no-fold-domain",
        parameterBox: {
          alpha1: [...protocol.rootSheet.domain.alpha1],
          alpha3: [...protocol.rootSheet.domain.alpha3],
          receptionPhase: [0, TWO_PI],
          dimensionlessDelay: [
            ...protocol.rootSheet.domain.dimensionlessDelayInterior,
          ],
        },
        squaredResidualEnclosure: null,
        squaredDelayDerivativeEnclosure: null,
        subdivisionDepth: 0,
        reason:
          "the seam-aware fixed-phase chart bounds the causal-residual " +
          "delay derivative above by -1/16 throughout the declared domain",
      }],
      unresolved: [],
      counts: {
        evaluatedBoxes: 0,
        rootFreeBoxes: 0,
        rootCapableNoFoldBoxes: 1,
        unresolvedBoxes: 0,
        maximumDepthReached: 0,
      },
    };
  }
  const stack = initialFoldBoxes(channel, protocol).reverse();
  const ledger = [];
  const unresolved = [];
  let evaluatedBoxes = 0;
  let rootFreeBoxes = 0;
  let rootCapableNoFoldBoxes = 0;
  let maximumDepthReached = 0;
  while (stack.length > 0) {
    if (evaluatedBoxes >= maximumBoxesPerRepresentative ||
        packetBudget.boxes >= maximumBoxesPerPacket) {
      const reason = evaluatedBoxes >= maximumBoxesPerRepresentative
        ? "maximum-boxes-per-representative-reached"
        : "maximum-boxes-per-packet-reached";
      for (const pending of stack) {
        const row = foldLedgerRow(
          channel,
          pending,
          "unresolved-resource-box",
          null,
          reason,
        );
        ledger.push(row);
        unresolved.push(row);
      }
      break;
    }
    const box = stack.pop();
    evaluatedBoxes += 1;
    packetBudget.boxes += 1;
    maximumDepthReached = Math.max(maximumDepthReached, box.depth);
    const enclosure = evaluator.evaluate({
      channelId: channel.channelId,
      alpha1: box.alpha1,
      alpha3: box.alpha3,
      receptionPhase: box.receptionPhase,
      dimensionlessDelay: box.dimensionlessDelay,
    });
    if (excludesZero(
      enclosure.squaredResidualEnclosure,
      protocol.foldExclusion.squaredResidualExclusionFloor,
    )) {
      ledger.push(foldLedgerRow(
        channel,
        box,
        "certified-root-free-box",
        enclosure,
      ));
      rootFreeBoxes += 1;
      continue;
    }
    if (excludesZero(
      enclosure.squaredDelayDerivativeEnclosure,
      protocol.foldExclusion.squaredDelayDerivativeExclusionFloor,
    )) {
      ledger.push(foldLedgerRow(
        channel,
        box,
        "certified-root-capable-no-fold-box",
        enclosure,
      ));
      rootCapableNoFoldBoxes += 1;
      continue;
    }
    const splitDimension =
      box.depth < protocol.foldExclusion.maximumSubdivisionDepth
        ? selectSplitDimension(channel, box, protocol)
        : null;
    if (!splitDimension) {
      const reason = box.depth >= protocol.foldExclusion.maximumSubdivisionDepth
        ? "maximum-subdivision-depth-reached"
        : "minimum-partition-width-reached";
      const row = foldLedgerRow(
        channel,
        box,
        "unresolved-possible-fold-box",
        enclosure,
        reason,
      );
      ledger.push(row);
      unresolved.push(row);
      continue;
    }
    const children = splitBox(box, splitDimension);
    stack.push(children[1], children[0]);
  }
  return {
    channelId: channel.channelId,
    status: unresolved.length === 0
      ? "fold-excluded-diagnostic"
      : "drawn-not-evaluated",
    method: "interval-squared-residual-fold-exclusion.v1",
    coordinateChart: null,
    ledger,
    unresolved,
    counts: {
      evaluatedBoxes,
      rootFreeBoxes,
      rootCapableNoFoldBoxes,
      unresolvedBoxes: unresolved.length,
      maximumDepthReached,
    },
  };
}

function receptionPhaseForCoordinate(point, coordinateChart, delay) {
  return coordinateChart?.chart === "emission-fixed"
    ? point.coordinatePhase + delay
    : point.coordinatePhase;
}

function faceEnclosure(
  evaluator,
  channelId,
  point,
  coordinateChart,
  delay,
) {
  const receptionPhase = receptionPhaseForCoordinate(
    point,
    coordinateChart,
    delay,
  );
  return evaluator.evaluate({
    channelId,
    alpha1: [point.alpha1, point.alpha1],
    alpha3: [point.alpha3, point.alpha3],
    receptionPhase: [receptionPhase, receptionPhase],
    dimensionlessDelay: [delay, delay],
  }).squaredResidualEnclosure;
}

function refineAnchorRoot({
  baseProtocol,
  channel,
  point,
  coordinateChart,
  delayBox,
  iterations = 128,
}) {
  let lower = delayBox[0];
  let upper = delayBox[1];
  let lowerRow = recomputeA11SquaredCausalResidual({
    protocol: baseProtocol,
    receiver: channel.receiver,
    transmitter: channel.transmitter,
    alpha1: point.alpha1,
    alpha3: point.alpha3,
    receptionPhase: receptionPhaseForCoordinate(
      point,
      coordinateChart,
      lower,
    ),
    delay: lower,
  });
  for (let iteration = 0; iteration < iterations; iteration += 1) {
    const middle = (lower + upper) / 2;
    const middleRow = recomputeA11SquaredCausalResidual({
      protocol: baseProtocol,
      receiver: channel.receiver,
      transmitter: channel.transmitter,
      alpha1: point.alpha1,
      alpha3: point.alpha3,
      receptionPhase: receptionPhaseForCoordinate(
        point,
        coordinateChart,
        middle,
      ),
      delay: middle,
    });
    if (lowerRow.squaredResidual * middleRow.squaredResidual <= 0) {
      upper = middle;
    } else {
      lower = middle;
      lowerRow = middleRow;
    }
  }
  const delay = (lower + upper) / 2;
  return recomputeA11SquaredCausalResidual({
    protocol: baseProtocol,
    receiver: channel.receiver,
    transmitter: channel.transmitter,
    alpha1: point.alpha1,
    alpha3: point.alpha3,
    receptionPhase: receptionPhaseForCoordinate(
      point,
      coordinateChart,
      delay,
    ),
    delay,
  });
}

function certifyAnchorRootInventory({
  channel,
  protocol,
  baseProtocol,
  evaluator,
  packetBudget,
}) {
  const anchor = protocol.anchorRootInventory;
  const point = anchor.point;
  const coordinateChart = subFieldSpeedCoordinateChart(channel, protocol);
  const stack = partitionInterval(
    protocol.rootSheet.domain.dimensionlessDelayInterior,
    anchor.initialDelaySubdivisions,
  ).reverse().map((dimensionlessDelay) => ({
    dimensionlessDelay,
    depth: 0,
  }));
  const ledger = [];
  const unresolved = [];
  const roots = [];
  let evaluatedBoxes = 0;
  while (stack.length > 0) {
    if (evaluatedBoxes >= anchor.maximumBoxesPerRepresentative ||
        packetBudget.boxes >= protocol.foldExclusion.maximumBoxesPerPacket) {
      const reason = evaluatedBoxes >= anchor.maximumBoxesPerRepresentative
        ? "maximum-anchor-boxes-per-representative-reached"
        : "maximum-boxes-per-packet-reached";
      for (const pending of stack) {
        const row = {
          disposition: "unresolved-anchor-resource-box",
          dimensionlessDelay: [...pending.dimensionlessDelay],
          subdivisionDepth: pending.depth,
          reason,
        };
        ledger.push(row);
        unresolved.push(row);
      }
      break;
    }
    const box = stack.pop();
    evaluatedBoxes += 1;
    packetBudget.boxes += 1;
    const receptionPhase = coordinateChart?.chart === "emission-fixed"
      ? [
          point.coordinatePhase + box.dimensionlessDelay[0],
          point.coordinatePhase + box.dimensionlessDelay[1],
        ]
      : [point.coordinatePhase, point.coordinatePhase];
    const enclosure = evaluator.evaluate({
      channelId: channel.channelId,
      alpha1: [point.alpha1, point.alpha1],
      alpha3: [point.alpha3, point.alpha3],
      receptionPhase,
      dimensionlessDelay: box.dimensionlessDelay,
    });
    const squaredResidual = enclosure.squaredResidualEnclosure;
    const squaredDerivative = enclosure.squaredDelayDerivativeEnclosure;
    if (excludesZero(squaredResidual, anchor.rootResidualFloor)) {
      ledger.push({
        disposition: "certified-anchor-root-free-box",
        dimensionlessDelay: [...box.dimensionlessDelay],
        squaredResidualEnclosure: squaredResidual,
        squaredDelayDerivativeEnclosure: squaredDerivative,
        subdivisionDepth: box.depth,
      });
      continue;
    }
    const derivativeSign = coordinateChart
      ? -1
      : squaredDerivative[0] > anchor.rootTransversalityFloor
        ? 1
        : squaredDerivative[1] < -anchor.rootTransversalityFloor
          ? -1
          : 0;
    const lowerFace = faceEnclosure(
      evaluator,
      channel.channelId,
      point,
      coordinateChart,
      box.dimensionlessDelay[0],
    );
    const upperFace = faceEnclosure(
      evaluator,
      channel.channelId,
      point,
      coordinateChart,
      box.dimensionlessDelay[1],
    );
    const lowerPositive = lowerFace[0] > anchor.rootResidualFloor;
    const lowerNegative = lowerFace[1] < -anchor.rootResidualFloor;
    const upperPositive = upperFace[0] > anchor.rootResidualFloor;
    const upperNegative = upperFace[1] < -anchor.rootResidualFloor;
    const brackets =
      derivativeSign > 0
        ? lowerNegative && upperPositive
        : derivativeSign < 0
          ? lowerPositive && upperNegative
          : false;
    const monotoneSameSign =
      derivativeSign !== 0 &&
      ((lowerPositive && upperPositive) || (lowerNegative && upperNegative));
    if (brackets) {
      const independent = refineAnchorRoot({
        baseProtocol,
        channel,
        point,
        coordinateChart,
        delayBox: box.dimensionlessDelay,
      });
      const row = {
        disposition: "certified-anchor-simple-root",
        dimensionlessDelay: [...box.dimensionlessDelay],
        squaredResidualEnclosure: squaredResidual,
        squaredDelayDerivativeEnclosure: squaredDerivative,
        lowerDelayFaceSquaredResidualEnclosure: lowerFace,
        upperDelayFaceSquaredResidualEnclosure: upperFace,
        subdivisionDepth: box.depth,
        independentRecomputation: independent,
        anchorCoordinateChart:
          coordinateChart?.chart ?? "reception-fixed-interval",
      };
      ledger.push(row);
      roots.push(row);
      continue;
    }
    if (monotoneSameSign) {
      ledger.push({
        disposition: "certified-anchor-monotone-root-free-box",
        dimensionlessDelay: [...box.dimensionlessDelay],
        squaredResidualEnclosure: squaredResidual,
        squaredDelayDerivativeEnclosure: squaredDerivative,
        lowerDelayFaceSquaredResidualEnclosure: lowerFace,
        upperDelayFaceSquaredResidualEnclosure: upperFace,
        subdivisionDepth: box.depth,
      });
      continue;
    }
    if (box.depth >= anchor.maximumSubdivisionDepth ||
        width(box.dimensionlessDelay) <= anchor.minimumDelayWidth) {
      const row = {
        disposition: "unresolved-anchor-root-box",
        dimensionlessDelay: [...box.dimensionlessDelay],
        squaredResidualEnclosure: squaredResidual,
        squaredDelayDerivativeEnclosure: squaredDerivative,
        subdivisionDepth: box.depth,
        reason: box.depth >= anchor.maximumSubdivisionDepth
          ? "maximum-anchor-subdivision-depth-reached"
          : "minimum-anchor-delay-width-reached",
      };
      ledger.push(row);
      unresolved.push(row);
      continue;
    }
    const children = splitInterval(box.dimensionlessDelay).map((half) => ({
      dimensionlessDelay: half,
      depth: box.depth + 1,
    }));
    stack.push(children[1], children[0]);
  }
  const rootDelays = roots.map((row) =>
    row.independentRecomputation.delay).sort((left, right) => left - right);
  const separations = rootDelays.slice(1).map(
    (delay, index) => delay - rootDelays[index],
  );
  const maximumIndependentResidual = Math.max(
    0,
    ...roots.map((row) => Math.abs(
      row.independentRecomputation.normalizedResidual,
    )),
  );
  const passed =
    unresolved.length === 0 &&
    roots.length === anchor.expectedRootCountPerRepresentative &&
    separations.every((value) => value > anchor.rootSeparationFloor) &&
    maximumIndependentResidual <= anchor.independentNormalizedResidualFloor;
  return {
    channelId: channel.channelId,
    anchorCoordinateChart:
      coordinateChart?.chart ?? "reception-fixed-interval",
    status: passed ? "anchor-root-count-certified" : "drawn-not-evaluated",
    passed,
    expectedRootCount: anchor.expectedRootCountPerRepresentative,
    observedCertifiedRootCount: roots.length,
    minimumRootSeparation:
      separations.length > 0 ? Math.min(...separations) : null,
    maximumIndependentNormalizedResidual: maximumIndependentResidual,
    ledger,
    roots,
    unresolved,
    counts: {
      evaluatedBoxes,
      rootFreeBoxes: ledger.filter((row) =>
        row.disposition.includes("root-free")).length,
      simpleRootBoxes: roots.length,
      unresolvedBoxes: unresolved.length,
    },
  };
}

function endpointAndSeamControl(protocol) {
  const domain = protocol.rootSheet.domain;
  const nearDelay = domain.dimensionlessDelayInterior[0];
  const historyEdge = domain.dimensionlessDelayInterior[1];
  const minimumRadiusGap = Math.min(
    1 - domain.alpha1[1],
    domain.alpha3[0] - 1,
    domain.alpha3[0] - domain.alpha1[1],
  );
  const maximumInterBinaryRadiusSum = Math.max(
    domain.alpha1[1] + 1,
    domain.alpha1[1] + domain.alpha3[1],
    1 + domain.alpha3[1],
  );
  const nearZeroMargin = minimumRadiusGap ** 2 - nearDelay ** 2;
  const historyEdgeMargin =
    maximumInterBinaryRadiusSum ** 2 - historyEdge ** 2;
  const phaseSeamExact =
    protocol.rootSheet.phaseSeam ===
      "theta-zero-identified-with-two-pi/exact-four-pi-sigma-periodicity.v1";
  return {
    id: "a1-1-root-sheet-endpoint-and-phase-seam-control.v1",
    nearZeroSquaredResidualLowerMargin: nearZeroMargin,
    historyEdgeSquaredResidualUpperMargin: historyEdgeMargin,
    nearZeroRootFree: nearZeroMargin > 0,
    historyEdgeRootFree: historyEdgeMargin < 0,
    phaseSeamIdentity:
      protocol.rootSheet.phaseSeam,
    phaseSeamExact,
    phaseSeamProof:
      "the declared trigonometric arguments change by exact integer " +
      "multiples of two-pi under theta->theta+two-pi",
    passed:
      nearZeroMargin > 0 &&
      historyEdgeMargin < 0 &&
      phaseSeamExact,
  };
}

function syntheticFoldControl(protocol) {
  const foldPoint = protocol.negativeControls.syntheticFold.foldPoint;
  const squaredResidual = [(foldPoint - 1) ** 2, (foldPoint - 1) ** 2];
  const squaredDerivative = [2 * (foldPoint - 1), 2 * (foldPoint - 1)];
  const disposition =
    !excludesZero(
      squaredResidual,
      protocol.foldExclusion.squaredResidualExclusionFloor,
    ) &&
    !excludesZero(
      squaredDerivative,
      protocol.foldExclusion.squaredDelayDerivativeExclusionFloor,
    )
      ? "unresolved-possible-fold-box"
      : "incorrectly-disposed";
  return {
    id: "synthetic-exact-fold-negative-control.v1",
    rootFunction: protocol.negativeControls.syntheticFold.rootFunction,
    foldPoint,
    squaredResidualEnclosure: squaredResidual,
    squaredDelayDerivativeEnclosure: squaredDerivative,
    disposition,
    passed:
      disposition ===
      protocol.negativeControls.syntheticFold.requiredDisposition,
  };
}

function applyExecutionLimits(protocol, executionLimits) {
  const limits = {
    maximumBoxesPerRepresentative:
      protocol.foldExclusion.maximumBoxesPerRepresentative,
    maximumBoxesPerPacket: protocol.foldExclusion.maximumBoxesPerPacket,
  };
  if (executionLimits === null) return limits;
  if (!executionLimits || typeof executionLimits !== "object" ||
      Array.isArray(executionLimits)) {
    throw new TypeError("executionLimits must be null or an object.");
  }
  for (const key of Object.keys(limits)) {
    if (key in executionLimits) {
      const requested = positiveInteger(
        executionLimits[key],
        `executionLimits.${key}`,
      );
      if (requested > limits[key]) {
        throw new RangeError(`${key} may not exceed its declared ceiling.`);
      }
      limits[key] = requested;
    }
  }
  return limits;
}

function runResourceExhaustionControl({
  protocol,
  channels,
  evaluator,
}) {
  const intervalChannel = channels.find((channel) =>
    subFieldSpeedCoordinateChart(channel, protocol) === null);
  if (!intervalChannel) {
    throw new TypeError(
      "resource-exhaustion control requires an interval-treated representative.",
    );
  }
  const packetBudget = { boxes: 0 };
  const result = certifyRepresentativeNoFold({
    channel: intervalChannel,
    protocol,
    evaluator,
    packetBudget,
    maximumBoxesPerRepresentative:
      protocol.negativeControls.resourceExhaustion.maximumBoxesPerRepresentative,
    maximumBoxesPerPacket:
      protocol.negativeControls.resourceExhaustion.maximumBoxesPerRepresentative,
  });
  const status = result.unresolved.length > 0
    ? "drawn-not-evaluated"
    : "evaluated-diagnostic";
  return {
    id: "resource-exhaustion-fail-closed-negative-control.v1",
    status,
    score: null,
    unresolvedBoxCount: result.unresolved.length,
    passed:
      status === protocol.negativeControls.resourceExhaustion.requiredStatus &&
      protocol.negativeControls.resourceExhaustion.requiredScore === null &&
      result.unresolved.length > 0,
  };
}

function endpointInversionKey(channel) {
  return [
    channel.receiver.binaryIndex,
    channel.transmitter.binaryIndex,
    channel.receiver.endpointSign * channel.transmitter.endpointSign,
  ].join(":");
}

function buildCompleteChannelAccounting({
  allChannels,
  protocol,
  sealedSummary,
  representativeResults,
}) {
  const sealedStatusById = new Map(sealedSummary.channelSummaries.map((row) => [
    row.channelId,
    row.status,
  ]));
  const representativeById = new Map(representativeResults.map((row) => [
    row.channelId,
    row,
  ]));
  const interBinaryByKey = new Map();
  for (const channel of allChannels.filter((row) => row.kind === "inter-binary")) {
    const key = endpointInversionKey(channel);
    const group = interBinaryByKey.get(key) ?? [];
    group.push(channel);
    interBinaryByKey.set(key, group);
  }
  if ([...interBinaryByKey.values()].some((group) => group.length !== 2)) {
    throw new TypeError(
      "A1.1 endpoint-inversion accounting requires two channels per class.",
    );
  }
  const representativeForPairedChannel = new Map();
  for (const representative of representativeResults) {
    const channel = allChannels.find((row) =>
      row.channelId === representative.channelId);
    const group = interBinaryByKey.get(endpointInversionKey(channel));
    const paired = group.find((row) => row.channelId !== channel.channelId);
    if (!paired) {
      throw new TypeError(
        `A1.1 representative ${channel.channelId} has no inversion pair.`,
      );
    }
    representativeForPairedChannel.set(paired.channelId, channel.channelId);
  }
  const rows = allChannels.map((channel) => {
    const sealedStatus = sealedStatusById.get(channel.channelId);
    if (channel.kind !== "inter-binary") {
      return {
        channelId: channel.channelId,
        channelKind: channel.kind,
        status: sealedStatus,
        disposition: "sealed-base-complete-diagnostic",
        representativeChannelId: channel.channelId,
        evidenceHash: sealedSummary.resultHash,
      };
    }
    if (protocol.sealedRegressionReceipt.closedInterBinaryChannelIds
      .includes(channel.channelId)) {
      return {
        channelId: channel.channelId,
        channelKind: channel.kind,
        status: sealedStatus,
        disposition: "sealed-six-channel-closure-regression",
        representativeChannelId: channel.channelId,
        evidenceHash: sealedSummary.resultHash,
      };
    }
    const representative = representativeById.get(channel.channelId);
    if (representative) {
      return {
        channelId: channel.channelId,
        channelKind: channel.kind,
        status: representative.rootCountInvariance
          .inferredRootCountAcrossParameterDomain === 1
          ? "evaluated-diagnostic"
          : "drawn-not-evaluated",
        disposition: "root-sheet-representative-evaluated",
        representativeChannelId: channel.channelId,
        evidenceHash: null,
      };
    }
    const representativeChannelId =
      representativeForPairedChannel.get(channel.channelId);
    const pairedRepresentative =
      representativeById.get(representativeChannelId);
    return {
      channelId: channel.channelId,
      channelKind: channel.kind,
      status: pairedRepresentative?.rootCountInvariance
        .inferredRootCountAcrossParameterDomain === 1
        ? "evaluated-diagnostic"
        : "drawn-not-evaluated",
      disposition: representativeChannelId
        ? "root-sheet-endpoint-inversion-symmetry-reuse"
        : "unresolved-missing-root-sheet-representative",
      representativeChannelId: representativeChannelId ?? null,
      evidenceHash: null,
    };
  });
  const passed =
    rows.length === 36 &&
    rows.every((row) => row.status === "evaluated-diagnostic") &&
    rows.filter((row) =>
      row.disposition === "sealed-base-complete-diagnostic").length === 12 &&
    rows.filter((row) =>
      row.disposition === "sealed-six-channel-closure-regression").length === 6 &&
    rows.filter((row) =>
      row.disposition === "root-sheet-representative-evaluated").length === 9 &&
    rows.filter((row) =>
      row.disposition ===
        "root-sheet-endpoint-inversion-symmetry-reuse").length === 9;
  return {
    id: "a1-1-complete-36-ordered-channel-accounting.v1",
    passed,
    orderedChannelCount: rows.length,
    counts: {
      sealedSameOrPartnerChannelCount: rows.filter((row) =>
        row.disposition === "sealed-base-complete-diagnostic").length,
      sealedInterBinaryChannelCount: rows.filter((row) =>
        row.disposition === "sealed-six-channel-closure-regression").length,
      rootSheetRepresentativeChannelCount: rows.filter((row) =>
        row.disposition === "root-sheet-representative-evaluated").length,
      endpointInversionReusedChannelCount: rows.filter((row) =>
        row.disposition ===
          "root-sheet-endpoint-inversion-symmetry-reuse").length,
      unresolvedChannelCount: rows.filter((row) =>
        row.status !== "evaluated-diagnostic").length,
    },
    rows,
  };
}

export function evaluateA11RootSheetMonotonicEnclosureTreatment({
  treatmentProtocol: rawTreatmentProtocol,
  baseProtocol: rawBaseProtocol,
  sealedSummary,
  executionLimits = null,
} = {}) {
  const protocol = validateA11RootSheetTreatmentProtocol(rawTreatmentProtocol);
  const baseProtocol = validateA11ContinuousRootInventoryProtocol(rawBaseProtocol);
  const baseProtocolHash = sha256A11Interval(rawBaseProtocol);
  if (baseProtocolHash !== protocol.baseProtocol.sha256) {
    throw new TypeError("live A1.1 base protocol does not match the treatment.");
  }
  const regressionControl =
    validateSealedRegressionReceipt(protocol, sealedSummary);
  const allChannels = buildA11OrderedChannelInventory(baseProtocol);
  const channelById = new Map(allChannels.map((channel) => [
    channel.channelId,
    channel,
  ]));
  const channels = protocol.targetRepresentatives.map((channelId) => {
    const channel = channelById.get(channelId);
    if (!channel || channel.kind !== "inter-binary") {
      throw new TypeError(`treatment target ${channelId} is not inter-binary.`);
    }
    return channel;
  });
  const evaluator = createA11InterBinaryRootFoldEvaluator(baseProtocol);
  const limits = applyExecutionLimits(protocol, executionLimits);
  const packetBudget = { boxes: 0 };
  const foldResults = channels.map((channel) =>
    certifyRepresentativeNoFold({
      channel,
      protocol,
      evaluator,
      packetBudget,
      ...limits,
    }));
  const anchorResults = channels.map((channel) =>
    certifyAnchorRootInventory({
      channel,
      protocol,
      baseProtocol,
      evaluator,
      packetBudget,
    }));
  const endpointSeamControl = endpointAndSeamControl(protocol);
  const syntheticFold = syntheticFoldControl(protocol);
  const resourceExhaustion = runResourceExhaustionControl({
    protocol,
    channels,
    evaluator,
  });
  const unresolved = [
    ...foldResults.flatMap((row) => row.unresolved.map((item) => ({
      stage: "fold-exclusion",
      channelId: row.channelId,
      ...item,
    }))),
    ...anchorResults.flatMap((row) => row.unresolved.map((item) => ({
      stage: "anchor-root-inventory",
      channelId: row.channelId,
      ...item,
    }))),
  ];
  const representativeResults = channels.map((channel, index) => ({
    channelId: channel.channelId,
      foldExclusion: foldResults[index],
    anchorRootInventory: anchorResults[index],
    rootCountInvariance: {
      theoremId: protocol.rootSheet.rootCountInvarianceTheorem.id,
      parameterDomainConnected: true,
      endpointRootsExcluded: endpointSeamControl.nearZeroRootFree &&
        endpointSeamControl.historyEdgeRootFree,
      phaseSeamIdentified: endpointSeamControl.phaseSeamExact,
      foldExcluded:
        foldResults[index].status === "fold-excluded-diagnostic",
      anchorRootCountCertified: anchorResults[index].passed,
      inferredRootCountAcrossParameterDomain:
        foldResults[index].status === "fold-excluded-diagnostic" &&
        anchorResults[index].passed &&
        endpointSeamControl.nearZeroRootFree &&
        endpointSeamControl.historyEdgeRootFree &&
        endpointSeamControl.phaseSeamExact
          ? anchorResults[index].observedCertifiedRootCount
          : null,
      claimGrade: "derived-within-declared-prescribed-path-diagnostic",
    },
  }));
  const channelAccounting = buildCompleteChannelAccounting({
    allChannels,
    protocol,
    sealedSummary,
    representativeResults,
  });
  const complete =
    regressionControl.passed &&
    endpointSeamControl.passed &&
    syntheticFold.passed &&
    resourceExhaustion.passed &&
    channelAccounting.passed &&
    foldResults.every((row) => row.status === "fold-excluded-diagnostic") &&
    anchorResults.every((row) => row.passed) &&
    unresolved.length === 0;
  const resultWithoutHash = {
    schema: A11_ROOT_SHEET_TREATMENT_RESULT_SCHEMA,
    evaluator: {
      id: "a1-1-root-sheet-monotonic-enclosure-certifier",
      version: 1,
      prescribedPathAnalyticsOnly: true,
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
      eomIntervalMachineryInvoked: false,
      diagnosticOnly: true,
    },
    treatmentProtocolHash: sha256A11Interval(rawTreatmentProtocol),
    baseProtocolHash,
    sealedRegressionSummaryHash: sealedSummary.summaryHash,
    status: {
      code: complete
        ? protocol.completionRule.statusWhenComplete
        : protocol.completionRule.statusWhenAnyObligationFails,
      score: null,
      reason: complete
        ? "all-36-ordered-channels-accounted-with-nine-new-root-sheet-representatives"
        : "one-or-more-root-sheet-treatment-obligations-remain-unresolved",
    },
    rootSheetDeclaration: protocol.rootSheet,
    resources: {
      declared: protocol.foldExclusion,
      effective: limits,
      totalEvaluatedBoxes: packetBudget.boxes,
    },
    controls: {
      sealedSixChannelRegression: regressionControl,
      endpointAndPhaseSeam: endpointSeamControl,
      syntheticFold,
      resourceExhaustion,
      completeChannelAccounting: {
        id: channelAccounting.id,
        passed: channelAccounting.passed,
        orderedChannelCount: channelAccounting.orderedChannelCount,
        counts: channelAccounting.counts,
      },
    },
    counts: {
      targetRepresentativeCount: channels.length,
      foldExcludedRepresentativeCount: foldResults.filter((row) =>
        row.status === "fold-excluded-diagnostic").length,
      anchorCertifiedRepresentativeCount: anchorResults.filter((row) =>
        row.passed).length,
      globallyClosedRepresentativeCount: representativeResults.filter((row) =>
        row.rootCountInvariance.inferredRootCountAcrossParameterDomain === 1).length,
      unresolvedBoxCount: unresolved.length,
      foldEvaluatedBoxCount: foldResults.reduce(
        (sum, row) => sum + row.counts.evaluatedBoxes,
        0,
      ),
      anchorEvaluatedBoxCount: anchorResults.reduce(
        (sum, row) => sum + row.counts.evaluatedBoxes,
        0,
      ),
    },
    representativeResults,
    channelAccounting,
    unresolved,
    claimBoundary: protocol.claimBoundary,
  };
  return {
    ...resultWithoutHash,
    resultHash: sha256A11Interval(resultWithoutHash),
  };
}

export function summarizeA11RootSheetMonotonicEnclosureTreatment(result) {
  if (!result || result.schema !== A11_ROOT_SHEET_TREATMENT_RESULT_SCHEMA) {
    throw new TypeError(
      `result must use schema ${A11_ROOT_SHEET_TREATMENT_RESULT_SCHEMA}.`,
    );
  }
  const summaryWithoutHash = {
    schema: A11_ROOT_SHEET_TREATMENT_SUMMARY_SCHEMA,
    evaluator: result.evaluator,
    treatmentProtocolHash: result.treatmentProtocolHash,
    baseProtocolHash: result.baseProtocolHash,
    sealedRegressionSummaryHash: result.sealedRegressionSummaryHash,
    resultHash: result.resultHash,
    status: result.status,
    rootSheetDeclaration: result.rootSheetDeclaration,
    resources: result.resources,
    controls: result.controls,
    counts: result.counts,
    representativeSummaries: result.representativeResults.map((row) => ({
      channelId: row.channelId,
      foldExclusionStatus: row.foldExclusion.status,
      foldExclusionMethod: row.foldExclusion.method,
      coordinateChart: row.foldExclusion.coordinateChart,
      foldExclusionCounts: row.foldExclusion.counts,
      anchorRootInventoryStatus: row.anchorRootInventory.status,
      anchorRootInventoryCounts: row.anchorRootInventory.counts,
      anchorRootCount: row.anchorRootInventory.observedCertifiedRootCount,
      maximumIndependentNormalizedResidual:
        row.anchorRootInventory.maximumIndependentNormalizedResidual,
      rootCountInvariance: row.rootCountInvariance,
    })),
    channelAccounting: result.channelAccounting,
    unresolvedLedger: {
      count: result.unresolved.length,
      completeLedgerLocation: "full result artifact bound by resultHash",
      completeLedgerHash: sha256A11Interval(result.unresolved),
      sample: result.unresolved.slice(0, 128),
    },
    claimBoundary: result.claimBoundary,
  };
  return {
    ...summaryWithoutHash,
    summaryHash: sha256A11Interval(summaryWithoutHash),
  };
}

export {
  applyExecutionLimits as applyA11RootSheetExecutionLimits,
  certifyAnchorRootInventory as certifyA11RootSheetAnchorInventory,
  certifyRepresentativeNoFold as certifyA11RootSheetRepresentativeNoFold,
  endpointAndSeamControl as runA11RootSheetEndpointAndSeamControl,
  runResourceExhaustionControl as runA11RootSheetResourceExhaustionControl,
  subFieldSpeedCoordinateChart as selectA11RootSheetCoordinateChart,
  syntheticFoldControl as runA11RootSheetSyntheticFoldControl,
};
