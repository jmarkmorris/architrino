import {
  classifyPlanarRingCharacteristics,
  enumerateBalancedPolarityClasses,
  evaluatePlanarCoRotatingRing,
  regularRingPhases,
  verifyReflectionCovariance,
  verifyRotationCovariance,
} from "./PlanarCoRotatingRingBalance.mjs";

const TWO_PI = 2 * Math.PI;

function uniqueSorted(values, tolerance = 1e-11) {
  return [...values].sort((a, b) => a - b).filter((value, index, rows) =>
    index === 0 || Math.abs(value - rows[index - 1]) > tolerance * Math.max(1, Math.abs(value)));
}

function linspace(start, end, count) {
  return Array.from({ length: count }, (_, index) => start + (end - start) * index / (count - 1));
}

function configurationObjective(evaluation) {
  if (!evaluation.rootCompleteness.complete) {
    return 1e12 + evaluation.rootCompleteness.foldEvents.length;
  }
  if (evaluation.compatibleScale == null) {
    return 1e6 + evaluation.residuals.maximumFullVector;
  }
  return evaluation.residuals.maximumFullVector;
}

function compactEvaluation(evaluation, { includeLedger = false } = {}) {
  const compact = {
    beta: evaluation.beta,
    rootTopologySignature: evaluation.rootTopologySignature,
    rootCount: evaluation.rootCount,
    compatibleScale: evaluation.compatibleScale,
    residuals: evaluation.residuals,
    rootCompleteness: {
      complete: evaluation.rootCompleteness.complete,
      coincidentSelfRootsExcluded: evaluation.rootCompleteness.coincidentSelfRootsExcluded,
      nontrivialSameTransmitterRootsIncluded: evaluation.rootCompleteness.nontrivialSameTransmitterRootsIncluded,
      foldEventCount: evaluation.rootCompleteness.foldEvents.length,
      minimumJacobianFloor: evaluation.rootCompleteness.minimumJacobianFloor,
      maximumRootEquationResidual: evaluation.rootCompleteness.maximumRootEquationResidual,
      maximumDirectChordResidual: evaluation.rootCompleteness.maximumDirectChordResidual,
      basis: evaluation.rootCompleteness.basis,
    },
    receiverCoefficients: evaluation.receivers.map((receiver) => ({
      receiverIndex: receiver.receiverIndex,
      radial: receiver.radialCoefficient,
      tangential: receiver.tangentialCoefficient,
      axial: receiver.axialCoefficient,
      rootCounts: receiver.directedPairs.map((pair) => pair.rootCount),
    })),
  };
  if (includeLedger) {
    compact.completeRootLedger = evaluation.receivers.flatMap((receiver) =>
      receiver.directedPairs.flatMap((pair) => pair.roots));
    compact.inactiveRootGaps = evaluation.rootCompleteness.inactiveRootGaps;
    compact.foldEvents = evaluation.rootCompleteness.foldEvents;
  }
  return compact;
}

function refineTopologyBoundary({ phases, polarities, left, right, leftSignature, iterations = 48 }) {
  let low = left;
  let high = right;
  for (let iteration = 0; iteration < iterations; iteration += 1) {
    const middle = (low + high) / 2;
    const signature = evaluatePlanarCoRotatingRing({ phases, polarities, beta: middle }).rootTopologySignature;
    if (signature === leftSignature) low = middle;
    else high = middle;
  }
  return { lower: low, upper: high, width: high - low };
}

function goldenMinimum(fn, left, right, iterations = 72) {
  const ratio = (Math.sqrt(5) - 1) / 2;
  let a = left;
  let b = right;
  let c = b - ratio * (b - a);
  let d = a + ratio * (b - a);
  let fc = fn(c);
  let fd = fn(d);
  for (let iteration = 0; iteration < iterations; iteration += 1) {
    if (fc <= fd) {
      b = d;
      d = c;
      fd = fc;
      c = b - ratio * (b - a);
      fc = fn(c);
    } else {
      a = c;
      c = d;
      fc = fd;
      d = a + ratio * (b - a);
      fd = fn(d);
    }
  }
  return fc <= fd ? { x: c, value: fc } : { x: d, value: fd };
}

function bisectScalar(fn, left, right, iterations = 100) {
  let fLeft = fn(left);
  let fRight = fn(right);
  if (fLeft === 0) return left;
  if (fRight === 0) return right;
  if (Math.sign(fLeft) === Math.sign(fRight)) throw new Error("scalar zero is not bracketed");
  for (let iteration = 0; iteration < iterations; iteration += 1) {
    const middle = (left + right) / 2;
    const fMiddle = fn(middle);
    if (Math.abs(fMiddle) <= 2e-13 || right - left <= 2e-13 * Math.max(1, Math.abs(middle))) return middle;
    if (Math.sign(fMiddle) === Math.sign(fLeft)) {
      left = middle;
      fLeft = fMiddle;
    } else {
      right = middle;
      fRight = fMiddle;
    }
  }
  return (left + right) / 2;
}

function regularBetaSamples({ minimumBeta, maximumBeta, betaStep }) {
  const values = [
    minimumBeta,
    0.25,
    0.5,
    0.75,
    0.95,
    0.99,
    1,
    1.01,
    1.05,
    3.070356625390253,
    6.218454963409138,
    9.376436028216506,
    maximumBeta,
  ];
  for (let beta = minimumBeta; beta <= maximumBeta + betaStep / 2; beta += betaStep) values.push(Math.min(beta, maximumBeta));
  return uniqueSorted(values.filter((value) => value >= minimumBeta && value <= maximumBeta));
}

export function scanRegularPolarityClass({
  n,
  polarityClass,
  minimumBeta = 0.05,
  maximumBeta = 20,
  betaStep = 0.025,
  balanceTolerance = 2e-8,
  progress = () => {},
} = {}) {
  const phases = regularRingPhases(n);
  const polarities = polarityClass.polarities;
  const betaSamples = regularBetaSamples({ minimumBeta, maximumBeta, betaStep });
  const samples = betaSamples.map((beta, index) => {
    const evaluation = evaluatePlanarCoRotatingRing({ phases, polarities, beta });
    if ((index + 1) % 100 === 0 || index + 1 === betaSamples.length) {
      progress({ stage: "base-scan", completed: index + 1, total: betaSamples.length, beta });
    }
    return { beta, signature: evaluation.rootTopologySignature, objective: configurationObjective(evaluation) };
  });
  const boundaryBrackets = [];
  for (let index = 1; index < samples.length; index += 1) {
    if (samples[index - 1].signature !== samples[index].signature) {
      boundaryBrackets.push(refineTopologyBoundary({
        phases,
        polarities,
        left: samples[index - 1].beta,
        right: samples[index].beta,
        leftSignature: samples[index - 1].signature,
      }));
      progress({ stage: "topology-boundary", completed: boundaryBrackets.length, sampledIndex: index });
    }
  }
  const intervalBoundaries = uniqueSorted([
    minimumBeta,
    ...boundaryBrackets.flatMap((row) => [row.lower, row.upper]),
    maximumBeta,
  ]);
  const topologyIntervals = [];
  for (let index = 0; index < intervalBoundaries.length - 1; index += 1) {
    const left = intervalBoundaries[index];
    const right = intervalBoundaries[index + 1];
    if (right - left <= 1e-10) continue;
    const midpoint = (left + right) / 2;
    const evaluation = evaluatePlanarCoRotatingRing({ phases, polarities, beta: midpoint });
    topologyIntervals.push({
      interval: [left, right],
      representativeBeta: midpoint,
      signature: evaluation.rootTopologySignature,
      rootCount: evaluation.rootCount,
      minimumJacobianFloor: evaluation.rootCompleteness.minimumJacobianFloor,
    });
  }
  progress({ stage: "topology-census", completed: topologyIntervals.length, total: topologyIntervals.length });

  const minimaBrackets = [];
  for (let index = 1; index < samples.length - 1; index += 1) {
    const prior = samples[index - 1];
    const row = samples[index];
    const next = samples[index + 1];
    if (row.signature === prior.signature && row.signature === next.signature &&
        row.objective <= prior.objective && row.objective <= next.objective) {
      minimaBrackets.push([prior.beta, next.beta]);
    }
  }
  const tangentialZeros = [];
  for (let topologyIndex = 0; topologyIndex < topologyIntervals.length; topologyIndex += 1) {
    const topology = topologyIntervals[topologyIndex];
    const [left, right] = topology.interval;
    const span = right - left;
    if (span <= 1e-8) continue;
    const fractions = [
      1e-8, 1e-7, 1e-6, 1e-5, 1e-4, 1e-3, 0.003, 0.01,
      ...linspace(0.02, 0.98, 65),
      0.99, 0.997, 0.999, 0.9999, 0.99999, 0.999999, 0.9999999, 0.99999999,
    ];
    const localSamples = uniqueSorted(fractions.map((fraction) => left + span * fraction))
      .map((beta) => ({ beta, evaluation: evaluatePlanarCoRotatingRing({ phases, polarities, beta }) }))
      .filter((row) => row.evaluation.rootTopologySignature === topology.signature &&
        row.evaluation.rootCompleteness.complete);
    for (let index = 1; index < localSamples.length - 1; index += 1) {
      const prior = configurationObjective(localSamples[index - 1].evaluation);
      const current = configurationObjective(localSamples[index].evaluation);
      const next = configurationObjective(localSamples[index + 1].evaluation);
      if (current <= prior && current <= next) {
        minimaBrackets.push([localSamples[index - 1].beta, localSamples[index + 1].beta]);
      }
    }
    // A regular alternating word is transitive under one label rotation combined
    // with the same spatial rotation, so every receiver has the same projected
    // coefficient. Candidate acceptance below still evaluates every receiver.
    const receiverIndices = polarityClass.alternating
      ? [0]
      : Array.from({ length: phases.length }, (_, receiverIndex) => receiverIndex);
    for (const receiverIndex of receiverIndices) {
      for (let index = 1; index < localSamples.length; index += 1) {
        const prior = localSamples[index - 1];
        const next = localSamples[index];
        const priorValue = prior.evaluation.receivers[receiverIndex].tangentialCoefficient;
        const nextValue = next.evaluation.receivers[receiverIndex].tangentialCoefficient;
        if (priorValue === 0 || nextValue === 0 || Math.sign(priorValue) !== Math.sign(nextValue)) {
          const beta = bisectScalar((candidate) => evaluatePlanarCoRotatingRing({
            phases, polarities, beta: candidate,
          }).receivers[receiverIndex].tangentialCoefficient, prior.beta, next.beta);
          tangentialZeros.push(evaluatePlanarCoRotatingRing({ phases, polarities, beta }));
        }
      }
    }
    if ((topologyIndex + 1) % 10 === 0 || topologyIndex + 1 === topologyIntervals.length) {
      progress({
        stage: "topology-refinement",
        completed: topologyIndex + 1,
        total: topologyIntervals.length,
        interval: topology.interval,
      });
    }
  }
  const refined = minimaBrackets.map(([left, right]) => {
    const minimum = goldenMinimum((beta) => configurationObjective(
      evaluatePlanarCoRotatingRing({ phases, polarities, beta })), left, right);
    return evaluatePlanarCoRotatingRing({ phases, polarities, beta: minimum.x });
  });
  refined.push(...tangentialZeros);
  for (const special of [minimumBeta, 0.99, 1, 1.01, 3.070356625390253, maximumBeta]) {
    if (special >= minimumBeta && special <= maximumBeta) {
      refined.push(evaluatePlanarCoRotatingRing({ phases, polarities, beta: special }));
    }
  }
  refined.sort((left, right) => configurationObjective(left) - configurationObjective(right));
  const uniqueMinima = [];
  for (const evaluation of refined) {
    if (!uniqueMinima.some((prior) => Math.abs(prior.beta - evaluation.beta) <= 1e-7)) uniqueMinima.push(evaluation);
  }
  const best = uniqueMinima[0];
  const tightened = best ? evaluatePlanarCoRotatingRing({
    phases,
    polarities,
    beta: best.beta,
    rootTolerance: 2e-14,
    foldTolerance: 2e-11,
  }) : null;
  const characteristics = classifyPlanarRingCharacteristics({ n, phases, polarities });
  return {
    n,
    phaseConfiguration: "regular-2n-gon",
    phases,
    polarityClass,
    characteristics,
    scanInterval: [minimumBeta, maximumBeta],
    betaStep,
    sampledBetaCount: samples.length,
    tangentialSearchReceiverIndices: polarityClass.alternating
      ? [0]
      : Array.from({ length: phases.length }, (_, receiverIndex) => receiverIndex),
    topologyBoundaryBrackets: boundaryBrackets,
    rootTopologyIntervals: topologyIntervals,
    candidateBetaValues: uniqueMinima.slice(0, 8).map((evaluation) => compactEvaluation(evaluation)),
    best: best ? compactEvaluation(best, { includeLedger: configurationObjective(best) <= balanceTolerance * 100 }) : null,
    refinement: best ? {
      primaryRootTolerance: 2e-13,
      tightenedRootTolerance: 2e-14,
      primaryMaximumFullVectorResidual: best.residuals.maximumFullVector,
      tightenedMaximumFullVectorResidual: tightened.residuals.maximumFullVector,
      rootTopologyMatch: best.rootTopologySignature === tightened.rootTopologySignature,
      compatibleScaleChange: best.compatibleScale == null || tightened.compatibleScale == null
        ? null
        : Math.abs(best.compatibleScale - tightened.compatibleScale),
    } : null,
    independentReference: "tests compare the specialized ledger with the unchanged generic prescribed-history evaluator and circular-binary instrument",
    claimGrade: "diagnostic unless the independent checks and declared tolerances pass",
    falsifier: "A missed admissible root, failed covariance or oracle comparison, topology change under refinement, or receiver residual above tolerance overturns the verdict.",
    verdict: best && best.rootCompleteness.complete && best.compatibleScale != null &&
      best.residuals.maximumFullVector <= balanceTolerance &&
      tightened.residuals.maximumFullVector <= balanceTolerance
      ? "balanced-candidate"
      : "bounded-negative",
  };
}

function softmaxGaps(logits, minimumGap) {
  const maximum = Math.max(...logits);
  const weights = logits.map((value) => Math.exp(value - maximum));
  const total = weights.reduce((sum, value) => sum + value, 0);
  const available = TWO_PI - logits.length * minimumGap;
  return weights.map((value) => minimumGap + available * value / total);
}

function phasesFromGaps(gaps) {
  const phases = [0];
  for (let index = 0; index < gaps.length - 1; index += 1) phases.push(phases[index] + gaps[index]);
  return phases;
}

function logistic(value) {
  if (value >= 0) return 1 / (1 + Math.exp(-value));
  const exponential = Math.exp(value);
  return exponential / (1 + exponential);
}

function logit(value) {
  return Math.log(value / (1 - value));
}

function decodeNonuniformVector(vector, { memberCount, minimumGap, minimumBeta, maximumBeta }) {
  const gaps = softmaxGaps(vector.slice(0, memberCount), minimumGap);
  const beta = minimumBeta + (maximumBeta - minimumBeta) * logistic(vector[memberCount]);
  return { gaps, phases: phasesFromGaps(gaps), beta };
}

function nelderMead(fn, initial, { step = 0.18, maxEvaluations = 900, tolerance = 2e-7 } = {}) {
  const dimension = initial.length;
  const simplex = [initial.slice(), ...initial.map((_, axis) => initial.map((value, index) => value + (index === axis ? step : 0)))];
  let rows = simplex.map((point) => ({ point, value: fn(point) }));
  let evaluations = rows.length;
  const evaluate = (point) => {
    evaluations += 1;
    return { point, value: fn(point) };
  };
  while (evaluations < maxEvaluations) {
    rows.sort((left, right) => left.value - right.value);
    const spread = Math.max(...rows.map((row) => Math.abs(row.value - rows[0].value)));
    const diameter = Math.max(...rows.slice(1).map((row) => Math.hypot(...row.point.map((value, index) => value - rows[0].point[index]))));
    if (spread <= tolerance * Math.max(1, Math.abs(rows[0].value)) && diameter <= tolerance) break;
    const centroid = Array.from({ length: dimension }, (_, axis) =>
      rows.slice(0, -1).reduce((sum, row) => sum + row.point[axis], 0) / dimension);
    const worst = rows[dimension];
    const reflectedPoint = centroid.map((value, axis) => value + (value - worst.point[axis]));
    const reflected = evaluate(reflectedPoint);
    if (reflected.value < rows[0].value) {
      const expanded = evaluate(centroid.map((value, axis) => value + 2 * (reflectedPoint[axis] - value)));
      rows[dimension] = expanded.value < reflected.value ? expanded : reflected;
    } else if (reflected.value < rows[dimension - 1].value) {
      rows[dimension] = reflected;
    } else {
      const contractedPoint = reflected.value < worst.value
        ? centroid.map((value, axis) => value + 0.5 * (reflectedPoint[axis] - value))
        : centroid.map((value, axis) => value + 0.5 * (worst.point[axis] - value));
      const contracted = evaluate(contractedPoint);
      if (contracted.value < Math.min(reflected.value, worst.value)) {
        rows[dimension] = contracted;
      } else {
        const best = rows[0].point;
        rows = [rows[0], ...rows.slice(1).map((row) => evaluate(
          row.point.map((value, axis) => best[axis] + 0.5 * (value - best[axis]))))];
      }
    }
  }
  rows.sort((left, right) => left.value - right.value);
  return { ...rows[0], evaluations };
}

function initialNonuniformVector({ memberCount, beta, minimumBeta, maximumBeta, seedIndex }) {
  const fraction = Math.min(1 - 1e-9, Math.max(1e-9, (beta - minimumBeta) / (maximumBeta - minimumBeta)));
  return [
    ...Array.from({ length: memberCount }, (_, index) => seedIndex === 0 ? 0 : 0.22 * Math.sin((index + 1) * (seedIndex + 1))),
    logit(fraction),
  ];
}

export function searchNonuniformPolarityClass({
  n,
  polarityClass,
  betaSeeds,
  minimumBeta = 0.05,
  maximumBeta = 20,
  minimumPhaseGap = 0.01,
  maxEvaluationsPerSeed = 900,
  balanceTolerance = 2e-8,
} = {}) {
  const memberCount = 2 * n;
  const seeds = uniqueSorted([
    ...(betaSeeds ?? []),
    0.5,
    1.01,
    3.070356625390253,
    10,
    19.5,
  ].map((value) => Math.min(maximumBeta - 1e-6, Math.max(minimumBeta + 1e-6, value)))
    .filter((value) => value > minimumBeta && value < maximumBeta)).slice(0, 7);
  const runs = [];
  seeds.forEach((beta, seedIndex) => {
    const initial = initialNonuniformVector({ memberCount, beta, minimumBeta, maximumBeta, seedIndex });
    const initialDecoded = decodeNonuniformVector(initial, {
      memberCount, minimumGap: minimumPhaseGap, minimumBeta, maximumBeta,
    });
    const initialEvaluation = evaluatePlanarCoRotatingRing({
      phases: initialDecoded.phases,
      polarities: polarityClass.polarities,
      beta: initialDecoded.beta,
    });
    const result = nelderMead((vector) => {
      const decoded = decodeNonuniformVector(vector, { memberCount, minimumGap: minimumPhaseGap, minimumBeta, maximumBeta });
      return configurationObjective(evaluatePlanarCoRotatingRing({
        phases: decoded.phases,
        polarities: polarityClass.polarities,
        beta: decoded.beta,
      }));
    }, initial, { maxEvaluations: maxEvaluationsPerSeed });
    const decoded = decodeNonuniformVector(result.point, { memberCount, minimumGap: minimumPhaseGap, minimumBeta, maximumBeta });
    const evaluation = evaluatePlanarCoRotatingRing({
      phases: decoded.phases,
      polarities: polarityClass.polarities,
      beta: decoded.beta,
    });
    if (configurationObjective(initialEvaluation) <= configurationObjective(evaluation)) {
      runs.push({
        seedBeta: beta,
        evaluations: result.evaluations,
        selectedPoint: "initial-seed",
        gaps: initialDecoded.gaps,
        phases: initialDecoded.phases,
        evaluation: initialEvaluation,
      });
    } else {
      runs.push({
        seedBeta: beta,
        evaluations: result.evaluations,
        selectedPoint: "optimized",
        gaps: decoded.gaps,
        phases: decoded.phases,
        evaluation,
      });
    }
  });
  runs.sort((left, right) => configurationObjective(left.evaluation) - configurationObjective(right.evaluation));
  const regularSublocusCandidates = uniqueSorted(betaSeeds ?? [])
    .filter((beta) => beta > minimumBeta && beta < maximumBeta)
    .map((beta) => {
      const gaps = Array.from({ length: memberCount }, () => TWO_PI / memberCount);
      const phases = phasesFromGaps(gaps);
      return {
        beta,
        gaps,
        phases,
        evaluation: evaluatePlanarCoRotatingRing({ phases, polarities: polarityClass.polarities, beta }),
      };
    });
  const combined = [
    ...runs,
    ...regularSublocusCandidates.map((row) => ({
      ...row,
      selectedPoint: "direct-regular-sublocus",
      evaluations: 1,
    })),
  ].sort((left, right) => configurationObjective(left.evaluation) - configurationObjective(right.evaluation));
  const best = combined[0];
  const tightened = best ? evaluatePlanarCoRotatingRing({
    phases: best.phases,
    polarities: polarityClass.polarities,
    beta: best.evaluation.beta,
    rootTolerance: 2e-14,
    foldTolerance: 2e-11,
  }) : null;
  const characteristics = best ? classifyPlanarRingCharacteristics({ n, phases: best.phases, polarities: polarityClass.polarities }) : null;
  return {
    n,
    phaseConfiguration: "nonuniform-fixed-cyclic-order",
    polarityClass,
    characteristics,
    scanInterval: [minimumBeta, maximumBeta],
    minimumPhaseGap,
    optimization: "deterministic multistart Nelder-Mead over phase-gap logits and beta",
    seedCount: seeds.length,
    runSummaries: runs.map((run) => ({
      seedBeta: run.seedBeta,
      evaluations: run.evaluations,
      selectedPoint: run.selectedPoint,
      gaps: run.gaps,
      phases: run.phases,
      result: compactEvaluation(run.evaluation),
    })),
    regularSublocusCandidates: regularSublocusCandidates.map((run) => ({
      beta: run.beta,
      result: compactEvaluation(run.evaluation),
    })),
    best: best ? {
      gaps: best.gaps,
      phases: best.phases,
      result: compactEvaluation(best.evaluation, { includeLedger: configurationObjective(best.evaluation) <= balanceTolerance * 100 }),
    } : null,
    refinement: best ? {
      primaryMaximumFullVectorResidual: best.evaluation.residuals.maximumFullVector,
      tightenedMaximumFullVectorResidual: tightened.residuals.maximumFullVector,
      rootTopologyMatch: best.evaluation.rootTopologySignature === tightened.rootTopologySignature,
    } : null,
    independentReference: "no independent global optimizer; ledger identities are checked separately",
    claimGrade: "bounded diagnostic",
    nonregularExtensionVerdict: "unresolved",
    falsifier: "A lower-residual configuration inside the declared phase-gap and beta domain, a missed root, or failed refinement overturns this optimizer result.",
    verdict: best && best.evaluation.rootCompleteness.complete && best.evaluation.compatibleScale != null &&
      best.evaluation.residuals.maximumFullVector <= balanceTolerance &&
      tightened.residuals.maximumFullVector <= balanceTolerance
      ? "balanced-candidate"
      : "unresolved",
  };
}

function minimumAngularGap(phases) {
  const sorted = phases.map((value) => ((value % TWO_PI) + TWO_PI) % TWO_PI).sort((a, b) => a - b);
  return Math.min(...sorted.map((value, index) => {
    const next = index + 1 < sorted.length ? sorted[index + 1] : sorted[0] + TWO_PI;
    return next - value;
  }));
}

function halton(index, base) {
  let fraction = 1;
  let result = 0;
  let cursor = index;
  while (cursor > 0) {
    fraction /= base;
    result += fraction * (cursor % base);
    cursor = Math.floor(cursor / base);
  }
  return result;
}

function antipodalChartPoint(vector, minimumBeta, maximumBeta) {
  const alpha = TWO_PI * logistic(vector[0]);
  const gamma = TWO_PI * logistic(vector[1]);
  const beta = minimumBeta + (maximumBeta - minimumBeta) * logistic(vector[2]);
  return {
    phases: [0, Math.PI, alpha, alpha + Math.PI, gamma, gamma + Math.PI],
    polarities: [1, -1, 1, -1, 1, -1],
    beta,
  };
}

export function searchPlanarThreeBinaryAntipodalPhaseChart({
  minimumBeta = 0.05,
  maximumBeta = 20,
  minimumPhaseGap = 0.01,
  globalSamples = 2400,
  retainedSeeds = 18,
  maxEvaluationsPerSeed = 1200,
  balanceTolerance = 2e-8,
  regularBetaSeeds = [],
} = {}) {
  const sampled = [];
  for (let index = 1; index <= globalSamples; index += 1) {
    const phases = [0, Math.PI, TWO_PI * halton(index, 2), TWO_PI * halton(index, 2) + Math.PI,
      TWO_PI * halton(index, 3), TWO_PI * halton(index, 3) + Math.PI];
    if (minimumAngularGap(phases) < minimumPhaseGap) continue;
    const beta = minimumBeta + (maximumBeta - minimumBeta) * halton(index, 5);
    const evaluation = evaluatePlanarCoRotatingRing({ phases, polarities: [1, -1, 1, -1, 1, -1], beta });
    sampled.push({ phases, beta, objective: configurationObjective(evaluation) });
  }
  sampled.sort((left, right) => left.objective - right.objective);
  const stratumBounds = uniqueSorted([minimumBeta, 0.95, 1.05, 4, 10, maximumBeta]
    .filter((value) => value >= minimumBeta && value <= maximumBeta));
  const seeds = [];
  const perStratum = Math.max(1, Math.ceil(retainedSeeds / Math.max(1, stratumBounds.length - 1)));
  for (let index = 0; index < stratumBounds.length - 1; index += 1) {
    const left = stratumBounds[index];
    const right = stratumBounds[index + 1];
    seeds.push(...sampled.filter((row) => row.beta >= left &&
      (index + 1 === stratumBounds.length - 1 ? row.beta <= right : row.beta < right)).slice(0, perStratum));
  }
  const regularPhaseSeeds = uniqueSorted([...regularBetaSeeds, 0.5, 0.99, 1.01, 3.070356625390253, 6.218454963409138,
    9.376436028216506, 15, maximumBeta - 1e-6]
    .filter((beta) => beta > minimumBeta && beta < maximumBeta))
    .map((beta) => ({
      phases: [0, Math.PI, 2 * Math.PI / 3, 5 * Math.PI / 3, 4 * Math.PI / 3, 7 * Math.PI / 3],
      beta,
      objective: Number.NaN,
    }));
  seeds.push(...regularPhaseSeeds);
  const runs = seeds.map((seed) => {
    const initial = [
      logit(Math.min(1 - 1e-9, Math.max(1e-9, (seed.phases[2] % TWO_PI) / TWO_PI))),
      logit(Math.min(1 - 1e-9, Math.max(1e-9, (seed.phases[4] % TWO_PI) / TWO_PI))),
      logit((seed.beta - minimumBeta) / (maximumBeta - minimumBeta)),
    ];
    const result = nelderMead((vector) => {
      const point = antipodalChartPoint(vector, minimumBeta, maximumBeta);
      if (minimumAngularGap(point.phases) < minimumPhaseGap) return Number.POSITIVE_INFINITY;
      return configurationObjective(evaluatePlanarCoRotatingRing(point));
    }, initial, { step: 0.14, maxEvaluations: maxEvaluationsPerSeed, tolerance: 5e-8 });
    const point = antipodalChartPoint(result.point, minimumBeta, maximumBeta);
    const evaluation = evaluatePlanarCoRotatingRing(point);
    return { seed, evaluations: result.evaluations, point, evaluation };
  }).sort((left, right) => configurationObjective(left.evaluation) - configurationObjective(right.evaluation));
  const directRegularCandidates = regularPhaseSeeds.map((seed) => {
    const point = { phases: seed.phases, polarities: [1, -1, 1, -1, 1, -1], beta: seed.beta };
    return { seed, evaluations: 1, point, evaluation: evaluatePlanarCoRotatingRing(point), selectedPoint: "direct-regular-sublocus" };
  });
  const combined = [...runs, ...directRegularCandidates]
    .sort((left, right) => configurationObjective(left.evaluation) - configurationObjective(right.evaluation));
  const best = combined[0];
  const tightened = best ? evaluatePlanarCoRotatingRing({ ...best.point, rootTolerance: 2e-14, foldTolerance: 2e-11 }) : null;
  return {
    chart: "complete-equal-radius-antipodal-neutral-planar-three-binary-phase-chart",
    characteristics: best ? classifyPlanarRingCharacteristics({ n: 3, phases: best.point.phases, polarities: best.point.polarities }) : null,
    scanInterval: [minimumBeta, maximumBeta],
    minimumPhaseGap,
    globalSampling: { rule: "three-dimensional Halton sequence bases 2,3,5", requested: globalSamples, evaluated: sampled.length },
    localOptimization: {
      retainedSeeds: seeds.length,
      maximumEvaluationsPerSeed: maxEvaluationsPerSeed,
      betaStrata: stratumBounds,
      regularHexagonSpeedSeeds: regularPhaseSeeds.map((row) => row.beta),
    },
    bestSampledPoints: sampled.slice(0, 12),
    optimizedRuns: runs.map((run) => ({
      seed: run.seed,
      evaluations: run.evaluations,
      phases: run.point.phases,
      beta: run.point.beta,
      result: compactEvaluation(run.evaluation),
    })),
    regularSublocusCandidates: directRegularCandidates.map((run) => ({
      beta: run.point.beta,
      result: compactEvaluation(run.evaluation),
    })),
    best: best ? {
      phases: best.point.phases,
      beta: best.point.beta,
      result: compactEvaluation(best.evaluation, { includeLedger: configurationObjective(best.evaluation) <= balanceTolerance * 100 }),
    } : null,
    refinement: best ? {
      primaryMaximumFullVectorResidual: best.evaluation.residuals.maximumFullVector,
      tightenedMaximumFullVectorResidual: tightened.residuals.maximumFullVector,
      rootTopologyMatch: best.evaluation.rootTopologySignature === tightened.rootTopologySignature,
    } : null,
    independentReference: "the configuration relation is exact; root-ledger checks are independent; global phase-chart coverage is sampled and optimized, not proved exhaustive",
    claimGrade: "bounded diagnostic",
    broaderPhaseChartVerdict: "unresolved",
    falsifier: "A lower-residual antipodal-neutral phase point in the declared domain, a missed causal root, a collision below the declared gap, or failed refinement overturns the bounded verdict.",
    verdict: best && best.evaluation.rootCompleteness.complete && best.evaluation.compatibleScale != null &&
      best.evaluation.residuals.maximumFullVector <= balanceTolerance &&
      tightened.residuals.maximumFullVector <= balanceTolerance
      ? "balanced-candidate"
      : "unresolved",
  };
}

export function runPlanarRingCampaign({
  minimumBeta = 0.05,
  maximumBeta = 20,
  betaStep = 0.025,
  minimumPhaseGap = 0.01,
  nonuniformEvaluationsPerSeed = 900,
  planarThreeBinaryGlobalSamples = 2400,
  planarThreeBinaryRetainedSeeds = 18,
  reusedRegular = null,
  progress = () => {},
} = {}) {
  const regular = [];
  const nonuniform = [];
  for (let n = 2; n <= 6; n += 1) {
    const classes = enumerateBalancedPolarityClasses(n, { includeReflection: true });
    const covariance = {
      rotation: verifyRotationCovariance({ phases: regularRingPhases(n), polarities: classes[0].polarities, beta: 3.070356625390253 }),
      reflectionAndCirculationReversal: verifyReflectionCovariance({ phases: regularRingPhases(n), polarities: classes[0].polarities, beta: 3.070356625390253 }),
    };
    const reusedGroup = reusedRegular?.find((group) => group.n === n);
    let rows;
    if (reusedGroup) {
      rows = structuredClone(reusedGroup.classes);
      progress({ stage: "regular-reused", n, classCount: classes.length });
      regular.push(structuredClone(reusedGroup));
    } else {
      progress({ stage: "regular", n, classCount: classes.length });
      rows = classes.map((polarityClass, classIndex) => {
        const row = scanRegularPolarityClass({
          n, polarityClass, minimumBeta, maximumBeta, betaStep,
        });
        progress({ stage: "regular-class", n, classIndex: classIndex + 1, classCount: classes.length });
        return row;
      });
      regular.push({ n, covariance, classes: rows });
    }
    progress({ stage: "nonuniform", n, classCount: classes.length });
    nonuniform.push({
      n,
      classes: classes.map((polarityClass, classIndex) => {
        const regularRow = rows.find((row) => row.polarityClass.classId === polarityClass.classId);
        const betaSeeds = regularRow.candidateBetaValues.slice(0, 3).map((row) => row.beta);
        const row = searchNonuniformPolarityClass({
          n,
          polarityClass,
          betaSeeds,
          minimumBeta,
          maximumBeta,
          minimumPhaseGap,
          maxEvaluationsPerSeed: nonuniformEvaluationsPerSeed,
        });
        progress({ stage: "nonuniform-class", n, classIndex: classIndex + 1, classCount: classes.length });
        return row;
      }),
    });
  }
  progress({ stage: "planar-three-binary-antipodal-chart" });
  const planarThreeBinaryAntipodalPhaseChart = searchPlanarThreeBinaryAntipodalPhaseChart({
    minimumBeta,
    maximumBeta,
    minimumPhaseGap,
    globalSamples: planarThreeBinaryGlobalSamples,
    retainedSeeds: planarThreeBinaryRetainedSeeds,
    regularBetaSeeds: regular.find((group) => group.n === 3).classes
      .find((row) => row.polarityClass.alternating).candidateBetaValues
      .filter((row) => row.residuals.maximumFullVector <= 2e-8)
      .map((row) => row.beta),
  });
  const regularRows = regular.flatMap((group) => group.classes);
  const balanced = regularRows.filter((row) => row.verdict === "balanced-candidate");
  const unresolvedSearchRowCount = nonuniform.flatMap((group) => group.classes).length + 1;
  return {
    schema: "braid-program/planar-n-n-circular-balance-campaign.v1",
    campaignId: "planar-co-rotating-n-n-uncapped-master-equation-2026-08-29",
    correctionOf: ".local-data/braid-analysis/retained-evidence/planar-co-rotating-rings/2026-08-29-planar-co-rotating-n-n-circular-balance.v3.json",
    correctionReason: "The third closed run preserved the regular planar three-binary common-center chart point but did not retain every exact regular phase point in the general nonuniform charts; this packet adds those exact chart subloci while keeping every nonregular extension unresolved.",
    compatibilityIdentifier: "aaa-corpus-advancement",
    model: {
      fieldSpeed: 1,
      masterEquation: "default uncapped emission-site acceleration law",
      lineOfAction: "emission-site",
      universalSpeedCeilingApplied: false,
      radiusNormalization: 1,
      physicalScaleCoordinate: "R/R_star=-mean(radial coefficient)/beta_f^2",
    },
    declaredDomain: {
      n: [2, 3, 4, 5, 6],
      beta: [minimumBeta, maximumBeta],
      regularBetaStep: betaStep,
      nonuniformMinimumPhaseGap: minimumPhaseGap,
      phaseClass: "one common planar circle, fixed cyclic order, common angular rate, equal radius",
      excluded: ["collisions", "unresolved folds", "variable speed", "breathing", "eccentricity", "nonplanarity", "free evolution"],
    },
    symmetryReduction: {
      rotations: "exact label rotation orbit",
      globalPolarityConjugation: "exact because every acceleration sign is a receiver-transmitter polarity product",
      reflection: "used only with reflection plus circulation reversal after covariance check; canonical orbit records remain explicit",
    },
    regular,
    nonuniform,
    planarThreeBinaryAntipodalPhaseChart,
    summary: {
      balancedCandidateCount: balanced.length,
      unresolvedSearchRowCount,
      balancedCandidateScopes: balanced.map((row) => ({
        n: row.n ?? 3,
        phaseConfiguration: row.phaseConfiguration ?? row.chart,
        polarityClass: row.polarityClass?.canonicalWord ?? "+-+-+- with explicit antipodal pair ordering",
        best: row.best,
      })),
      verdict: balanced.length > 0
        ? "balanced-regular-subloci-found-with-broader-phase-search-unresolved"
        : "no-balanced-regular-candidate-found-with-broader-phase-search-unresolved",
      claimGrade: "mixed derived configuration relation, independently checked ledger implementation, and bounded numerical search",
      excludedClaims: ["retention", "binding", "stability", "release survival", "physical identity", "score increase", "scientific acceptance"],
      falsifier: "Any missing causal root, failed independent check, nonconvergent residual, or balanced point inside the declared bounded domain overturns the corresponding result.",
    },
  };
}
