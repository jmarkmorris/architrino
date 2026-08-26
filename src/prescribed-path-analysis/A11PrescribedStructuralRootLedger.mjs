import {
  buildA11OrderedChannelInventory,
  createA11InterBinaryRootFoldEvaluator,
  sha256A11Interval,
  validateA11ContinuousRootInventoryProtocol,
} from "./A11ContinuousRootIntervalCertifier.mjs";
import {
  recomputeA11SquaredCausalResidual,
} from "./A11IndependentResidualRecomputation.mjs";

export const A11_STRUCTURAL_ROOT_LEDGER_PROTOCOL_SCHEMA =
  "prescribed-path-analysis/a1-1-prescribed-structural-root-ledger-protocol.v1";
export const A11_STRUCTURAL_ROOT_LEDGER_RESULT_SCHEMA =
  "prescribed-path-analysis/a1-1-prescribed-structural-root-ledger-result.v1";
export const A11_STRUCTURAL_ROOT_LEDGER_SUMMARY_SCHEMA =
  "prescribed-path-analysis/a1-1-prescribed-structural-root-ledger-summary.v1";

const TWO_PI = 2 * Math.PI;
const EXPECTED_BASE_HASH =
  "b4517dd8058644dd9ca7f20ff7388a83ad68b92bc26e97163b0e9b0302ee1f56";
const EXPECTED_CONTINUOUS_SUMMARY_HASH =
  "624f5350ac3a0e4e57cf9da08225c1d7a635daa16c959dd96dc0778440256cdb";
const EXPECTED_CONTINUOUS_RESULT_HASH =
  "c2673e581fed4948536c18478b364f516ea821761e8d45c03d38dfeed814ab9f";
const EXPECTED_ROOT_SHEET_SUMMARY_HASH =
  "d43a763f11198a0bb2d1ce29eed8462ae08576980a739fecd72788d2c5b2a74a";
const EXPECTED_ROOT_SHEET_RESULT_HASH =
  "7d930245906fef42966a883d93e8afddb57b7d4320acd1d5c1be25f776d45e1e";
const EXPECTED_ALPHA1 = Object.freeze([7 / 8, 29 / 32, 15 / 16]);
const EXPECTED_ALPHA3 = Object.freeze([17 / 16, 35 / 32, 9 / 8]);
const EXPECTED_DELAY = Object.freeze([1 / 32, 9 / 4]);
const EXPECTED_DECLARED_ROWS = Object.freeze([
  "sealed-root-count-topology-by-declared-sheet-chart",
  "sampled-root-delay-range-and-witnesses",
  "sampled-sheet-coordinate-transversality-margin",
  "sampled-reception-coordinate-conditioning-margin",
  "sampled-receiver-phase-projection-range-and-sign-change-brackets",
  "sampled-radius-and-phase-sensitivity-range",
  "endpoint-inversion-symmetry-relation",
  "raw-root-and-provenance-row",
]);

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

function validateSummaryHash(summary, expectedSummaryHash, expectedResultHash, label) {
  if (!summary || summary.summaryHash !== expectedSummaryHash ||
      summary.resultHash !== expectedResultHash ||
      summaryHashWithoutField(summary) !== expectedSummaryHash) {
    throw new TypeError(`${label} does not match its sealed hashes.`);
  }
}

export function validateA11StructuralRootLedgerProtocol(rawProtocol) {
  if (!rawProtocol || typeof rawProtocol !== "object" ||
      Array.isArray(rawProtocol)) {
    throw new TypeError("A1.1 structural-root protocol must be an object.");
  }
  if (rawProtocol.schema !== A11_STRUCTURAL_ROOT_LEDGER_PROTOCOL_SCHEMA) {
    throw new TypeError(
      `A1.1 structural-root protocol requires schema ` +
      `${A11_STRUCTURAL_ROOT_LEDGER_PROTOCOL_SCHEMA}.`,
    );
  }
  if (rawProtocol.claimGrade !== "diagnostic" ||
      rawProtocol.claimBoundary?.prescribedPathAnalyticsOnly !== true ||
      rawProtocol.claimBoundary?.pathEvolutionInvoked !== false ||
      rawProtocol.claimBoundary?.eomSolverInvoked !== false ||
      rawProtocol.claimBoundary?.eomIntervalMachineryInvoked !== false ||
      rawProtocol.claimBoundary?.eomCampaignInvoked !== false ||
      rawProtocol.claimBoundary?.diagnosticOnly !== true ||
      rawProtocol.claimBoundary?.candidateScore !== null ||
      rawProtocol.claimBoundary?.candidateSelection !== false) {
    throw new TypeError(
      "A1.1 structural-root protocol must remain prescribed-only and null-score.",
    );
  }
  if (rawProtocol.sealedInputs?.baseProtocol?.sha256 !== EXPECTED_BASE_HASH ||
      rawProtocol.sealedInputs?.continuousInventorySummary?.summaryHash !==
        EXPECTED_CONTINUOUS_SUMMARY_HASH ||
      rawProtocol.sealedInputs?.continuousInventorySummary?.resultHash !==
        EXPECTED_CONTINUOUS_RESULT_HASH ||
      rawProtocol.sealedInputs?.rootSheetSummary?.summaryHash !==
        EXPECTED_ROOT_SHEET_SUMMARY_HASH ||
      rawProtocol.sealedInputs?.rootSheetSummary?.resultHash !==
        EXPECTED_ROOT_SHEET_RESULT_HASH) {
    throw new TypeError("A1.1 structural-root sealed input identity drifted.");
  }
  exactArray(rawProtocol.sampling?.alpha1, EXPECTED_ALPHA1, "sampling.alpha1");
  exactArray(rawProtocol.sampling?.alpha2, [1], "sampling.alpha2");
  exactArray(rawProtocol.sampling?.alpha3, EXPECTED_ALPHA3, "sampling.alpha3");
  exactArray(
    rawProtocol.declaredRows,
    EXPECTED_DECLARED_ROWS,
    "declaredRows",
  );
  exactArray(
    rawProtocol.sampling?.dimensionlessDelay,
    EXPECTED_DELAY,
    "sampling.dimensionlessDelay",
  );
  if (rawProtocol.sampling?.phaseNodeCount !== 24 ||
      rawProtocol.sampling?.phaseNodeRule !==
        "theta-or-epsilon=2*pi*k/24-for-k=0-through-23.v1" ||
      rawProtocol.sheetCharts?.chartSource !==
        "sealed-root-sheet-summary-when-present; otherwise-reception-fixed" ||
      rawProtocol.rootSolve?.method !==
        "bracketed-bisection-on-sealed-single-sheet-root.v1" ||
      rawProtocol.rootSolve?.iterations !== 128 ||
      rawProtocol.rootSolve?.projectionFoldTreatment !==
        "retain-adjacent-phase-node-bracket-and-endpoint-rows.v1" ||
      rawProtocol.rootSolve?.independentNormalizedResidualFloor !== 1e-9 ||
      rawProtocol.rootSolve?.primaryIndependentDerivativeAgreementTolerance !==
        1e-7 ||
      rawProtocol.rootSolve?.endpointInversionSymmetryTolerance !== 1e-12 ||
      rawProtocol.rootSolve?.phaseSeamTolerance !== 1e-12) {
    throw new TypeError("A1.1 structural-root sampling or solve declaration drifted.");
  }
  if (rawProtocol.resources?.maximumSampledRootRows !== 5400 ||
      rawProtocol.resources?.maximumProjectionFoldBrackets !== 512 ||
      rawProtocol.resources?.maximumBisectionEvaluations !== 800000) {
    throw new TypeError("A1.1 structural-root resource declaration drifted.");
  }
  if (rawProtocol.controls?.sealed36ChannelAccountingRequired !== true ||
      rawProtocol.controls?.independentResidualRecomputationRequiredForEverySampledRoot !==
        true ||
      rawProtocol.controls?.independentDirectDerivativeAgreementRequiredForEverySampledRoot !==
        true ||
      rawProtocol.controls?.endpointInversionSymmetryRequiredForAllInterBinaryGridRows !==
        true ||
      rawProtocol.controls?.phaseSeamReplayRequiredAtTwoPi !== true ||
      rawProtocol.controls?.syntheticProjectionFold?.derivative !==
        "cos(phase)" ||
      rawProtocol.controls?.syntheticProjectionFold?.requiredAdjacentSignChange !==
        true ||
      rawProtocol.controls?.syntheticMonotoneProjection?.derivative !== "1" ||
      rawProtocol.controls?.syntheticMonotoneProjection?.requiredAdjacentSignChange !==
        false ||
      rawProtocol.controls?.noRootSelfControl?.requiredNontrivialRootCount !==
        0 ||
      rawProtocol.controls?.outerSelfControl?.binaryIndex !== 3 ||
      rawProtocol.controls?.outerSelfControl?.requiredNontrivialRootCount !==
        1 ||
      rawProtocol.completionRule?.statusWhenComplete !== "evaluated-diagnostic" ||
      rawProtocol.completionRule?.statusWhenAnyRequiredControlFails !==
        "drawn-not-evaluated" ||
      rawProtocol.completionRule?.score !== null ||
      rawProtocol.completionRule?.noCandidateDisposition !== true) {
    throw new TypeError("A1.1 structural-root fail-closed declaration drifted.");
  }
  return structuredClone(rawProtocol);
}

function radiusFor(channelEndpoint, alpha1, alpha3) {
  if (channelEndpoint.radiusParameter === "alpha1") return alpha1;
  if (channelEndpoint.radiusParameter === "alpha2") return 1;
  if (channelEndpoint.radiusParameter === "alpha3") return alpha3;
  throw new TypeError(
    `unsupported radius parameter ${channelEndpoint.radiusParameter}.`,
  );
}

function vectorScale(vector, scale) {
  return vector.map((value) => value * scale);
}

function vectorSubtract(left, right) {
  return left.map((value, index) => value - right[index]);
}

function dot(left, right) {
  return left.reduce(
    (sum, value, index) => sum + value * right[index],
    0,
  );
}

function endpointKinematics(endpoint, alpha1, alpha3, commonPhase) {
  const radius = radiusFor(endpoint, alpha1, alpha3);
  const angle = commonPhase + endpoint.phase;
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  const signedRadius = endpoint.endpointSign * radius;
  const signedUnit = endpoint.plane.e1.map((component, index) =>
    endpoint.endpointSign * (
      component * cosine + endpoint.plane.e2[index] * sine
    ));
  const point = vectorScale(signedUnit, radius);
  const velocity = endpoint.plane.e1.map((component, index) =>
    signedRadius * (
      -component * sine + endpoint.plane.e2[index] * cosine
    ));
  return { point, velocity, signedUnit, radius };
}

function directGeometry(channel, alpha1, alpha3, receptionPhase, delay) {
  const receiver = endpointKinematics(
    channel.receiver,
    alpha1,
    alpha3,
    receptionPhase,
  );
  const transmitter = endpointKinematics(
    channel.transmitter,
    alpha1,
    alpha3,
    receptionPhase - delay,
  );
  const separation = vectorSubtract(receiver.point, transmitter.point);
  const separationSquared = dot(separation, separation);
  const receptionSquaredDelayDerivative =
    2 * dot(separation, transmitter.velocity) - 2 * delay;
  const emissionSquaredDelayDerivative =
    2 * dot(separation, receiver.velocity) - 2 * delay;
  const commonPhaseDerivative =
    2 * dot(
      separation,
      vectorSubtract(receiver.velocity, transmitter.velocity),
    );
  const ratioPartials = {};
  for (const parameter of ["alpha1", "alpha3"]) {
    const receiverPartial =
      channel.receiver.radiusParameter === parameter
        ? receiver.signedUnit
        : [0, 0, 0];
    const transmitterPartial =
      channel.transmitter.radiusParameter === parameter
        ? transmitter.signedUnit
        : [0, 0, 0];
    ratioPartials[parameter] =
      2 * dot(
        separation,
        vectorSubtract(receiverPartial, transmitterPartial),
      );
  }
  return {
    separationSquared,
    squaredResidual: separationSquared - delay * delay,
    receptionSquaredDelayDerivative,
    emissionSquaredDelayDerivative,
    commonPhaseDerivative,
    ratioPartials,
  };
}

function midpointOfInterval(value) {
  return (value[0] + value[1]) / 2;
}

function exactCircularPrimary(channel, alpha1, alpha3, delay) {
  const radius = radiusFor(channel.receiver, alpha1, alpha3);
  if (channel.kind === "same-transmitter-self") {
    return {
      squaredResidual:
        4 * radius * radius * Math.sin(delay / 2) ** 2 - delay * delay,
      squaredDelayDerivative:
        2 * radius * radius * Math.sin(delay) - 2 * delay,
    };
  }
  if (channel.kind === "same-binary-opposite-endpoint") {
    return {
      squaredResidual:
        4 * radius * radius * Math.cos(delay / 2) ** 2 - delay * delay,
      squaredDelayDerivative:
        -2 * radius * radius * Math.sin(delay) - 2 * delay,
    };
  }
  throw new TypeError(`unsupported exact circular kind ${channel.kind}.`);
}

function channelSymmetryKey(channel) {
  if (channel.kind === "inter-binary") {
    return [
      channel.kind,
      channel.receiver.binaryIndex,
      channel.transmitter.binaryIndex,
      channel.receiver.endpointSign * channel.transmitter.endpointSign,
    ].join(":");
  }
  return [
    channel.kind,
    channel.receiver.binaryIndex,
  ].join(":");
}

function rootCountForDeclaredSheet(channel) {
  if (channel.kind === "same-transmitter-self" &&
      channel.receiver.binaryIndex < 3) {
    return 0;
  }
  return 1;
}

function buildChartByChannel(allChannels, rootSheetSummary) {
  const channelById = new Map(allChannels.map((channel) => [
    channel.channelId,
    channel,
  ]));
  const chartByKey = new Map();
  for (const row of rootSheetSummary.representativeSummaries) {
    const channel = channelById.get(row.channelId);
    if (!channel) {
      throw new TypeError(`root-sheet channel ${row.channelId} is missing.`);
    }
    chartByKey.set(
      channelSymmetryKey(channel),
      row.coordinateChart?.chart ?? "reception-fixed",
    );
  }
  return new Map(allChannels.map((channel) => [
    channel.channelId,
    channel.kind === "inter-binary"
      ? chartByKey.get(channelSymmetryKey(channel)) ?? "reception-fixed"
      : "reception-fixed",
  ]));
}

function primaryEvaluation({
  channel,
  chart,
  alpha1,
  alpha3,
  phaseCoordinate,
  delay,
  interBinaryEvaluator,
}) {
  const receptionPhase = chart === "emission-fixed"
    ? phaseCoordinate + delay
    : phaseCoordinate;
  if (channel.kind !== "inter-binary") {
    return {
      receptionPhase,
      ...exactCircularPrimary(channel, alpha1, alpha3, delay),
    };
  }
  const enclosure = interBinaryEvaluator.evaluate({
    channelId: channel.channelId,
    alpha1: [alpha1, alpha1],
    alpha3: [alpha3, alpha3],
    receptionPhase: [receptionPhase, receptionPhase],
    dimensionlessDelay: [delay, delay],
  });
  return {
    receptionPhase,
    squaredResidual: midpointOfInterval(enclosure.squaredResidualEnclosure),
    squaredDelayDerivative:
      midpointOfInterval(enclosure.squaredDelayDerivativeEnclosure),
  };
}

function solveDeclaredRoot({
  channel,
  chart,
  alpha1,
  alpha3,
  phaseCoordinate,
  interBinaryEvaluator,
  protocol,
  budget,
}) {
  let lower = EXPECTED_DELAY[0];
  let upper = EXPECTED_DELAY[1];
  let lowerEvaluation = primaryEvaluation({
    channel,
    chart,
    alpha1,
    alpha3,
    phaseCoordinate,
    delay: lower,
    interBinaryEvaluator,
  });
  let upperEvaluation = primaryEvaluation({
    channel,
    chart,
    alpha1,
    alpha3,
    phaseCoordinate,
    delay: upper,
    interBinaryEvaluator,
  });
  budget.bisectionEvaluations += 2;
  if (!(lowerEvaluation.squaredResidual > 0) ||
      !(upperEvaluation.squaredResidual < 0)) {
    throw new Error(
      `root bracket failed for ${channel.channelId} at ` +
      `alpha1=${alpha1}, alpha3=${alpha3}, phase=${phaseCoordinate}.`,
    );
  }
  for (let iteration = 0; iteration < protocol.rootSolve.iterations; iteration += 1) {
    if (budget.bisectionEvaluations >=
        protocol.resources.maximumBisectionEvaluations) {
      throw new Error("maximum-bisection-evaluations-reached");
    }
    const middle = (lower + upper) / 2;
    const middleEvaluation = primaryEvaluation({
      channel,
      chart,
      alpha1,
      alpha3,
      phaseCoordinate,
      delay: middle,
      interBinaryEvaluator,
    });
    budget.bisectionEvaluations += 1;
    if (middleEvaluation.squaredResidual > 0) {
      lower = middle;
      lowerEvaluation = middleEvaluation;
    } else {
      upper = middle;
      upperEvaluation = middleEvaluation;
    }
  }
  const delay = (lower + upper) / 2;
  const primary = primaryEvaluation({
    channel,
    chart,
    alpha1,
    alpha3,
    phaseCoordinate,
    delay,
    interBinaryEvaluator,
  });
  budget.bisectionEvaluations += 1;
  const direct = directGeometry(
    channel,
    alpha1,
    alpha3,
    primary.receptionPhase,
    delay,
  );
  const independent = recomputeA11SquaredCausalResidual({
    protocol: protocol.baseProtocol,
    receiver: channel.receiver,
    transmitter: channel.transmitter,
    alpha1,
    alpha3,
    receptionPhase: primary.receptionPhase,
    delay,
  });
  const sheetSquaredDelayDerivative = chart === "emission-fixed"
    ? direct.emissionSquaredDelayDerivative
    : direct.receptionSquaredDelayDerivative;
  const sheetCausalDerivative =
    sheetSquaredDelayDerivative / (2 * delay);
  const receptionCausalDerivative =
    direct.receptionSquaredDelayDerivative / (2 * delay);
  const phaseSensitivity =
    -direct.commonPhaseDerivative / sheetSquaredDelayDerivative;
  const projectionDerivative = chart === "emission-fixed"
    ? direct.receptionSquaredDelayDerivative /
      direct.emissionSquaredDelayDerivative
    : 1;
  return {
    channelId: channel.channelId,
    channelKind: channel.kind,
    symmetryKey: channelSymmetryKey(channel),
    chart,
    alpha1,
    alpha3,
    phaseCoordinate:
      ((phaseCoordinate % TWO_PI) + TWO_PI) % TWO_PI,
    receptionPhase:
      ((primary.receptionPhase % TWO_PI) + TWO_PI) % TWO_PI,
    emissionPhase:
      (((primary.receptionPhase - delay) % TWO_PI) + TWO_PI) % TWO_PI,
    delay,
    primarySquaredResidual: primary.squaredResidual,
    independentRecomputation: independent,
    primaryReceptionSquaredDelayDerivative: primary.squaredDelayDerivative,
    directReceptionSquaredDelayDerivative:
      direct.receptionSquaredDelayDerivative,
    directSheetSquaredDelayDerivative: sheetSquaredDelayDerivative,
    receptionCausalResidualDelayDerivative: receptionCausalDerivative,
    sheetCausalResidualDelayDerivative: sheetCausalDerivative,
    receiverPhaseProjectionDerivative: projectionDerivative,
    delaySensitivityToSheetPhase: phaseSensitivity,
    delaySensitivityToAlpha1:
      -direct.ratioPartials.alpha1 / sheetSquaredDelayDerivative,
    delaySensitivityToAlpha3:
      -direct.ratioPartials.alpha3 / sheetSquaredDelayDerivative,
  };
}

function sampleCoordinates(channel, protocol) {
  if (channel.kind === "inter-binary") {
    const rows = [];
    for (const alpha1 of protocol.sampling.alpha1) {
      for (const alpha3 of protocol.sampling.alpha3) {
        for (let phaseIndex = 0;
          phaseIndex < protocol.sampling.phaseNodeCount;
          phaseIndex += 1) {
          rows.push({
            alpha1,
            alpha3,
            phaseIndex,
            phaseCoordinate:
              TWO_PI * phaseIndex / protocol.sampling.phaseNodeCount,
          });
        }
      }
    }
    return rows;
  }
  const radiusParameter = channel.receiver.radiusParameter;
  const values = radiusParameter === "alpha1"
    ? protocol.sampling.alpha1
    : radiusParameter === "alpha3"
      ? protocol.sampling.alpha3
      : [1];
  return values.map((value, index) => ({
    alpha1: radiusParameter === "alpha1" ? value : EXPECTED_ALPHA1[1],
    alpha3: radiusParameter === "alpha3" ? value : EXPECTED_ALPHA3[1],
    phaseIndex: index,
    phaseCoordinate: 0,
  }));
}

function minBy(rows, selector) {
  return rows.reduce((best, row) =>
    best === null || selector(row) < selector(best) ? row : best, null);
}

function maxBy(rows, selector) {
  return rows.reduce((best, row) =>
    best === null || selector(row) > selector(best) ? row : best, null);
}

function range(rows, selector) {
  if (rows.length === 0) return null;
  return [
    Math.min(...rows.map(selector)),
    Math.max(...rows.map(selector)),
  ];
}

function maximumAbsolute(rows, selector) {
  return rows.length === 0
    ? null
    : Math.max(...rows.map((row) => Math.abs(selector(row))));
}

function projectionFoldBrackets(channelRows, protocol) {
  if (channelRows[0]?.chart !== "emission-fixed") return [];
  const byRatio = new Map();
  for (const row of channelRows) {
    const key = `${row.alpha1}:${row.alpha3}`;
    const group = byRatio.get(key) ?? [];
    group.push(row);
    byRatio.set(key, group);
  }
  const brackets = [];
  for (const rows of byRatio.values()) {
    rows.sort((left, right) => left.phaseCoordinate - right.phaseCoordinate);
    for (let index = 0; index < rows.length; index += 1) {
      const left = rows[index];
      const right = rows[(index + 1) % rows.length];
      const leftValue = left.receiverPhaseProjectionDerivative;
      const rightValue = right.receiverPhaseProjectionDerivative;
      if (leftValue === 0 || rightValue === 0 || leftValue * rightValue < 0) {
        brackets.push({
          channelId: left.channelId,
          alpha1: left.alpha1,
          alpha3: left.alpha3,
          phaseCoordinate: [
            left.phaseCoordinate,
            index + 1 === rows.length
              ? TWO_PI
              : right.phaseCoordinate,
          ],
          endpointProjectionDerivatives: [leftValue, rightValue],
          endpointDelays: [left.delay, right.delay],
          seamCrossing: index + 1 === rows.length,
          disposition:
            "sampled-receiver-phase-projection-fold-sign-change-bracket",
          claimBoundary:
            "prescribed-sheet diagnostic bracket; not an interval-certified fold, retained caustic, or physical claim",
        });
      }
    }
  }
  if (brackets.length > protocol.resources.maximumProjectionFoldBrackets) {
    throw new Error("maximum-projection-fold-brackets-reached");
  }
  return brackets;
}

function summarizeChannel(channel, chart, rows, foldBrackets) {
  const rootCount = rootCountForDeclaredSheet(channel);
  const minimumDelayRow = minBy(rows, (row) => row.delay);
  const maximumDelayRow = maxBy(rows, (row) => row.delay);
  return {
    channelId: channel.channelId,
    channelKind: channel.kind,
    symmetryKey: channelSymmetryKey(channel),
    declaredSheetChart: chart,
    sealedRootCountByDeclaredSheetChart: rootCount,
    receptionPhaseRootCountStatus:
      chart === "emission-fixed"
        ? "not-inferred-from-emission-chart; inspect-projection-fold-brackets"
        : rootCount,
    sampledRootRowCount: rows.length,
    sampledDelayRange:
      rows.length > 0
        ? [minimumDelayRow.delay, maximumDelayRow.delay]
        : null,
    sampledDelayWitnesses:
      rows.length > 0
        ? { minimum: minimumDelayRow, maximum: maximumDelayRow }
        : null,
    sampledSheetCausalDerivativeRange:
      range(rows, (row) => row.sheetCausalResidualDelayDerivative),
    sampledReceptionCausalDerivativeRange:
      range(rows, (row) => row.receptionCausalResidualDelayDerivative),
    minimumAbsoluteSampledSheetCausalDerivative:
      rows.length > 0
        ? Math.min(...rows.map((row) =>
          Math.abs(row.sheetCausalResidualDelayDerivative)))
        : null,
    minimumAbsoluteSampledReceptionCausalDerivative:
      rows.length > 0
        ? Math.min(...rows.map((row) =>
          Math.abs(row.receptionCausalResidualDelayDerivative)))
        : null,
    sampledReceiverPhaseProjectionDerivativeRange:
      range(rows, (row) => row.receiverPhaseProjectionDerivative),
    receiverPhaseProjectionFoldBrackets: foldBrackets,
    sampledSensitivityMaxima: {
      absoluteDelayToSheetPhase:
        maximumAbsolute(rows, (row) => row.delaySensitivityToSheetPhase),
      absoluteDelayToAlpha1:
        maximumAbsolute(rows, (row) => row.delaySensitivityToAlpha1),
      absoluteDelayToAlpha3:
        maximumAbsolute(rows, (row) => row.delaySensitivityToAlpha3),
    },
  };
}

function symmetryControl(allChannels, rootRows, tolerance) {
  const rowsByChannel = new Map();
  for (const row of rootRows.filter((item) =>
    item.channelKind === "inter-binary")) {
    const rows = rowsByChannel.get(row.channelId) ?? [];
    rows.push(row);
    rowsByChannel.set(row.channelId, rows);
  }
  const groups = new Map();
  for (const channel of allChannels.filter((row) =>
    row.kind === "inter-binary")) {
    const key = channelSymmetryKey(channel);
    const group = groups.get(key) ?? [];
    group.push(channel);
    groups.set(key, group);
  }
  let maximumDelayDifference = 0;
  let maximumProjectionDifference = 0;
  let comparisonCount = 0;
  for (const group of groups.values()) {
    if (group.length !== 2) {
      throw new TypeError("inter-binary symmetry group must contain two channels.");
    }
    const left = rowsByChannel.get(group[0].channelId);
    const right = rowsByChannel.get(group[1].channelId);
    if (!left || !right || left.length !== right.length) {
      throw new TypeError("inter-binary symmetry rows are incomplete.");
    }
    for (let index = 0; index < left.length; index += 1) {
      maximumDelayDifference = Math.max(
        maximumDelayDifference,
        Math.abs(left[index].delay - right[index].delay),
      );
      maximumProjectionDifference = Math.max(
        maximumProjectionDifference,
        Math.abs(
          left[index].receiverPhaseProjectionDerivative -
          right[index].receiverPhaseProjectionDerivative,
        ),
      );
      comparisonCount += 1;
    }
  }
  return {
    id: "a1-1-endpoint-inversion-structural-ledger-control.v1",
    comparisonCount,
    maximumDelayDifference,
    maximumProjectionDerivativeDifference: maximumProjectionDifference,
    tolerance,
    passed:
      maximumDelayDifference <= tolerance &&
      maximumProjectionDifference <= tolerance,
  };
}

function syntheticProjectionControls(protocol) {
  const count = protocol.sampling.phaseNodeCount;
  const cosineValues = Array.from(
    { length: count },
    (_, index) => Math.cos(TWO_PI * index / count),
  );
  const hasAdjacentSignChange = (values) => values.some((value, index) => {
    const next = values[(index + 1) % values.length];
    return value === 0 || next === 0 || value * next < 0;
  });
  const foldDetected = hasAdjacentSignChange(cosineValues);
  const monotoneDetected = hasAdjacentSignChange(Array(count).fill(1));
  return {
    id: "a1-1-projection-sign-change-detector-controls.v1",
    syntheticFold: {
      derivative: protocol.controls.syntheticProjectionFold.derivative,
      adjacentSignChangeDetected: foldDetected,
      passed:
        foldDetected ===
        protocol.controls.syntheticProjectionFold.requiredAdjacentSignChange,
    },
    syntheticMonotone: {
      derivative: protocol.controls.syntheticMonotoneProjection.derivative,
      adjacentSignChangeDetected: monotoneDetected,
      passed:
        monotoneDetected ===
        protocol.controls.syntheticMonotoneProjection.requiredAdjacentSignChange,
    },
    passed:
      foldDetected === true &&
      monotoneDetected === false,
  };
}

function seamReplayControl({
  channels,
  chartByChannel,
  interBinaryEvaluator,
  protocol,
  budget,
  rootRows,
}) {
  const phaseZeroRows = rootRows.filter((row) =>
    row.channelKind === "inter-binary" &&
    row.phaseCoordinate === 0);
  let maximumDelayDifference = 0;
  let maximumProjectionDifference = 0;
  for (const row of phaseZeroRows) {
    const channel = channels.find((item) => item.channelId === row.channelId);
    const replay = solveDeclaredRoot({
      channel,
      chart: chartByChannel.get(channel.channelId),
      alpha1: row.alpha1,
      alpha3: row.alpha3,
      phaseCoordinate: TWO_PI,
      interBinaryEvaluator,
      protocol,
      budget,
    });
    maximumDelayDifference = Math.max(
      maximumDelayDifference,
      Math.abs(row.delay - replay.delay),
    );
    maximumProjectionDifference = Math.max(
      maximumProjectionDifference,
      Math.abs(
        row.receiverPhaseProjectionDerivative -
        replay.receiverPhaseProjectionDerivative,
      ),
    );
  }
  return {
    id: "a1-1-structural-ledger-phase-seam-replay.v1",
    replayCount: phaseZeroRows.length,
    maximumDelayDifference,
    maximumProjectionDerivativeDifference: maximumProjectionDifference,
    tolerance: protocol.rootSolve.phaseSeamTolerance,
    passed:
      maximumDelayDifference <= protocol.rootSolve.phaseSeamTolerance &&
      maximumProjectionDifference <= protocol.rootSolve.phaseSeamTolerance,
  };
}

export function evaluateA11PrescribedStructuralRootLedger({
  ledgerProtocol: rawLedgerProtocol,
  baseProtocol: rawBaseProtocol,
  continuousSummary,
  rootSheetSummary,
} = {}) {
  const protocol = validateA11StructuralRootLedgerProtocol(rawLedgerProtocol);
  const baseProtocol = validateA11ContinuousRootInventoryProtocol(rawBaseProtocol);
  protocol.baseProtocol = baseProtocol;
  if (sha256A11Interval(rawBaseProtocol) !== EXPECTED_BASE_HASH) {
    throw new TypeError("A1.1 structural-root base protocol hash drifted.");
  }
  validateSummaryHash(
    continuousSummary,
    EXPECTED_CONTINUOUS_SUMMARY_HASH,
    EXPECTED_CONTINUOUS_RESULT_HASH,
    "continuous inventory summary",
  );
  validateSummaryHash(
    rootSheetSummary,
    EXPECTED_ROOT_SHEET_SUMMARY_HASH,
    EXPECTED_ROOT_SHEET_RESULT_HASH,
    "root-sheet summary",
  );
  if (rootSheetSummary.controls?.completeChannelAccounting?.passed !== true ||
      rootSheetSummary.channelAccounting?.orderedChannelCount !== 36 ||
      rootSheetSummary.channelAccounting?.counts?.unresolvedChannelCount !== 0) {
    throw new TypeError("sealed 36-channel accounting is not complete.");
  }
  const allChannels = buildA11OrderedChannelInventory(baseProtocol);
  const chartByChannel = buildChartByChannel(allChannels, rootSheetSummary);
  const interBinaryEvaluator =
    createA11InterBinaryRootFoldEvaluator(baseProtocol);
  const budget = {
    bisectionEvaluations: 0,
  };
  const rootRows = [];
  for (const channel of allChannels) {
    if (rootCountForDeclaredSheet(channel) === 0) continue;
    const chart = chartByChannel.get(channel.channelId);
    for (const coordinate of sampleCoordinates(channel, protocol)) {
      if (rootRows.length >= protocol.resources.maximumSampledRootRows) {
        throw new Error("maximum-sampled-root-rows-reached");
      }
      rootRows.push(solveDeclaredRoot({
        channel,
        chart,
        ...coordinate,
        interBinaryEvaluator,
        protocol,
        budget,
      }));
    }
  }
  const rowsByChannel = new Map();
  for (const row of rootRows) {
    const rows = rowsByChannel.get(row.channelId) ?? [];
    rows.push(row);
    rowsByChannel.set(row.channelId, rows);
  }
  const channelSummaries = allChannels.map((channel) => {
    const rows = rowsByChannel.get(channel.channelId) ?? [];
    const foldBrackets = projectionFoldBrackets(rows, protocol);
    return summarizeChannel(
      channel,
      chartByChannel.get(channel.channelId),
      rows,
      foldBrackets,
    );
  });
  const maximumIndependentNormalizedResidual = Math.max(
    0,
    ...rootRows.map((row) =>
      Math.abs(row.independentRecomputation.normalizedResidual)),
  );
  const maximumPrimaryDirectDerivativeDifference = Math.max(
    0,
    ...rootRows.map((row) => Math.abs(
      row.primaryReceptionSquaredDelayDerivative -
      row.directReceptionSquaredDelayDerivative,
    )),
  );
  const residualControl = {
    id: "a1-1-structural-ledger-independent-root-control.v1",
    sampledRootCount: rootRows.length,
    maximumIndependentNormalizedResidual,
    independentNormalizedResidualFloor:
      protocol.rootSolve.independentNormalizedResidualFloor,
    maximumPrimaryDirectDerivativeDifference,
    derivativeAgreementTolerance:
      protocol.rootSolve.primaryIndependentDerivativeAgreementTolerance,
    passed:
      maximumIndependentNormalizedResidual <=
        protocol.rootSolve.independentNormalizedResidualFloor &&
      maximumPrimaryDirectDerivativeDifference <=
        protocol.rootSolve.primaryIndependentDerivativeAgreementTolerance,
  };
  const symmetry = symmetryControl(
    allChannels,
    rootRows,
    protocol.rootSolve.endpointInversionSymmetryTolerance,
  );
  const syntheticProjection = syntheticProjectionControls(protocol);
  const seamReplay = seamReplayControl({
    channels: allChannels,
    chartByChannel,
    interBinaryEvaluator,
    protocol,
    budget,
    rootRows,
  });
  const noRootSelfRows = channelSummaries.filter((row) =>
    row.channelKind === "same-transmitter-self" &&
    [1, 2].includes(
      allChannels.find((channel) =>
        channel.channelId === row.channelId).receiver.binaryIndex,
    ));
  const outerSelfRows = channelSummaries.filter((row) =>
    row.channelKind === "same-transmitter-self" &&
    allChannels.find((channel) =>
      channel.channelId === row.channelId).receiver.binaryIndex === 3);
  const topologyControl = {
    id: "a1-1-structural-ledger-sealed-topology-control.v1",
    orderedChannelCount: channelSummaries.length,
    noRootSelfChannelCount: noRootSelfRows.length,
    outerSelfChannelCount: outerSelfRows.length,
    allOtherDeclaredSheetCountsOne: channelSummaries.every((row) =>
      row.channelKind === "same-transmitter-self" &&
      noRootSelfRows.some((item) => item.channelId === row.channelId)
        ? row.sealedRootCountByDeclaredSheetChart === 0
        : row.sealedRootCountByDeclaredSheetChart === 1),
    passed:
      channelSummaries.length === 36 &&
      noRootSelfRows.length === 4 &&
      noRootSelfRows.every((row) =>
        row.sealedRootCountByDeclaredSheetChart === 0 &&
        row.sampledRootRowCount === 0) &&
      outerSelfRows.length === 2 &&
      outerSelfRows.every((row) =>
        row.sealedRootCountByDeclaredSheetChart === 1 &&
        row.sampledRootRowCount === 3),
  };
  const requiredControlsPassed =
    residualControl.passed &&
    symmetry.passed &&
    syntheticProjection.passed &&
    seamReplay.passed &&
    topologyControl.passed &&
    budget.bisectionEvaluations <=
      protocol.resources.maximumBisectionEvaluations;
  const projectionFoldBracketCount = channelSummaries.reduce(
    (sum, row) => sum + row.receiverPhaseProjectionFoldBrackets.length,
    0,
  );
  const resultWithoutHash = {
    schema: A11_STRUCTURAL_ROOT_LEDGER_RESULT_SCHEMA,
    evaluator: {
      id: "a1-1-prescribed-structural-root-ledger",
      version: 1,
      prescribedPathAnalyticsOnly: true,
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
      eomIntervalMachineryInvoked: false,
      eomCampaignInvoked: false,
      diagnosticOnly: true,
    },
    ledgerProtocolHash: sha256A11Interval(rawLedgerProtocol),
    sealedInputs: protocol.sealedInputs,
    status: {
      code: requiredControlsPassed
        ? protocol.completionRule.statusWhenComplete
        : protocol.completionRule.statusWhenAnyRequiredControlFails,
      score: null,
      reason: requiredControlsPassed
        ? "all-predeclared-structural-ledger-rows-and-controls-complete"
        : "one-or-more-predeclared-structural-ledger-controls-failed",
    },
    sampling: protocol.sampling,
    resources: {
      declared: protocol.resources,
      sampledRootRows: rootRows.length,
      bisectionEvaluations: budget.bisectionEvaluations,
      projectionFoldBrackets: projectionFoldBracketCount,
    },
    controls: {
      sealedTopology: topologyControl,
      independentResidualAndDerivative: residualControl,
      endpointInversionSymmetry: symmetry,
      phaseSeamReplay: seamReplay,
      syntheticProjectionDetector: syntheticProjection,
    },
    observations: {
      receiverPhaseProjectionFoldBracketCount:
        projectionFoldBracketCount,
      channelsWithProjectionFoldBrackets: channelSummaries
        .filter((row) => row.receiverPhaseProjectionFoldBrackets.length > 0)
        .map((row) => row.channelId),
      minimumAbsoluteSampledSheetCausalDerivative: Math.min(
        ...channelSummaries
          .map((row) => row.minimumAbsoluteSampledSheetCausalDerivative)
          .filter((value) => value !== null),
      ),
      minimumAbsoluteSampledReceptionCausalDerivative: Math.min(
        ...channelSummaries
          .map((row) => row.minimumAbsoluteSampledReceptionCausalDerivative)
          .filter((value) => value !== null),
      ),
      claimBoundary:
        "sampled prescribed-path structural observations only; no composite score or physical disposition",
    },
    channelSummaries,
    rawRootRows: rootRows,
    claimBoundary: protocol.claimBoundary,
  };
  return {
    ...resultWithoutHash,
    resultHash: sha256A11Interval(resultWithoutHash),
  };
}

export function summarizeA11PrescribedStructuralRootLedger(result) {
  if (!result || result.schema !== A11_STRUCTURAL_ROOT_LEDGER_RESULT_SCHEMA) {
    throw new TypeError(
      `result must use schema ${A11_STRUCTURAL_ROOT_LEDGER_RESULT_SCHEMA}.`,
    );
  }
  const summaryWithoutHash = {
    schema: A11_STRUCTURAL_ROOT_LEDGER_SUMMARY_SCHEMA,
    evaluator: result.evaluator,
    ledgerProtocolHash: result.ledgerProtocolHash,
    sealedInputs: result.sealedInputs,
    resultHash: result.resultHash,
    status: result.status,
    sampling: result.sampling,
    resources: result.resources,
    controls: result.controls,
    observations: result.observations,
    channelSummaries: result.channelSummaries.map((row) => ({
      ...row,
      sampledDelayWitnesses: row.sampledDelayWitnesses
        ? {
            minimum: {
              channelId: row.sampledDelayWitnesses.minimum.channelId,
              chart: row.sampledDelayWitnesses.minimum.chart,
              alpha1: row.sampledDelayWitnesses.minimum.alpha1,
              alpha3: row.sampledDelayWitnesses.minimum.alpha3,
              phaseCoordinate:
                row.sampledDelayWitnesses.minimum.phaseCoordinate,
              receptionPhase:
                row.sampledDelayWitnesses.minimum.receptionPhase,
              delay: row.sampledDelayWitnesses.minimum.delay,
            },
            maximum: {
              channelId: row.sampledDelayWitnesses.maximum.channelId,
              chart: row.sampledDelayWitnesses.maximum.chart,
              alpha1: row.sampledDelayWitnesses.maximum.alpha1,
              alpha3: row.sampledDelayWitnesses.maximum.alpha3,
              phaseCoordinate:
                row.sampledDelayWitnesses.maximum.phaseCoordinate,
              receptionPhase:
                row.sampledDelayWitnesses.maximum.receptionPhase,
              delay: row.sampledDelayWitnesses.maximum.delay,
            },
          }
        : null,
    })),
    rawLedger: {
      rowCount: result.rawRootRows.length,
      hash: sha256A11Interval(result.rawRootRows),
      location: "full result artifact bound by resultHash",
    },
    claimBoundary: result.claimBoundary,
  };
  return {
    ...summaryWithoutHash,
    summaryHash: sha256A11Interval(summaryWithoutHash),
  };
}
