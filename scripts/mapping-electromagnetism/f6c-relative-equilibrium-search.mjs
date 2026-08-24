import {
  evaluatePrescribedRecordAnalysis,
} from "../../src/prescribed-path-analysis/index.mjs";

// Report-grade bounded search for a uniform-cadence relative equilibrium on
// the F6c polarity-resolved tetrahedral symmetry surface. The script evaluates
// prescribed histories only. It does not evolve a path or establish binding,
// retention, stability, or particle identity.

const TWO_PI = 2 * Math.PI;
const axes = [
  [1, 1, 1],
  [1, -1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
].map((vector) => vector.map((entry) => entry / Math.sqrt(3)));
const circulationSigns = [-1, -1, 1, 1];
const phases = [0, Math.PI, 4 * Math.PI / 3, Math.PI / 3];
const bases = [2, 3, 5, 7, 11, 13];

function parsePositiveInteger(name, fallback) {
  const prefix = `--${name}=`;
  const argument = process.argv.slice(2).find((entry) => entry.startsWith(prefix));
  if (!argument) return fallback;
  const value = Number.parseInt(argument.slice(prefix.length), 10);
  if (!Number.isInteger(value) || value < 1) {
    throw new TypeError(`${name} must be a positive integer.`);
  }
  return value;
}

const searchRows = parsePositiveInteger("rows", 512);
const sampleCount = parsePositiveInteger("samples", 12);
const refinementRounds = parsePositiveInteger("refinement-rounds", 4);

function halton(index, base) {
  let fraction = 1;
  let result = 0;
  let remaining = index;
  while (remaining > 0) {
    fraction /= base;
    result += fraction * (remaining % base);
    remaining = Math.floor(remaining / base);
  }
  return result;
}

function cross(left, right) {
  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ];
}

function unit(vector) {
  const magnitude = Math.hypot(...vector);
  return vector.map((entry) => entry / magnitude);
}

function vector(array) {
  return { x: array[0], y: array[1], z: array[2] };
}

function multiply(value, scalar) {
  return { x: value.x * scalar, y: value.y * scalar, z: value.z * scalar };
}

function subtract(left, right) {
  return { x: left.x - right.x, y: left.y - right.y, z: left.z - right.z };
}

function dot(left, right) {
  return left.x * right.x + left.y * right.y + left.z * right.z;
}

function norm(value) {
  return Math.sqrt(dot(value, value));
}

function lerp(minimum, maximum, fraction) {
  return minimum + (maximum - minimum) * fraction;
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function decode(unitCoordinates) {
  const rhoPositive = lerp(0.18, 0.48, unitCoordinates[0]);
  const hPositive = rhoPositive * lerp(0.5, 2.5, unitCoordinates[1]);
  const rhoNegative = rhoPositive * lerp(0.6, 1.6, unitCoordinates[2]);
  const hNegative = rhoNegative * lerp(0.5, 2.5, unitCoordinates[3]);
  const memberSpeed = lerp(0.15, 0.75, unitCoordinates[4]);
  const angularRate = memberSpeed / Math.max(rhoPositive, rhoNegative);
  const negativePhaseOffset = TWO_PI * unitCoordinates[5];
  return {
    rhoPositive,
    hPositive,
    rhoNegative,
    hNegative,
    angularRate,
    negativePhaseOffset,
    maximumMemberSpeed: Math.max(rhoPositive, rhoNegative) * angularRate,
  };
}

function buildRequest(parameters, requestedSampleCount, confirmation = false) {
  const sources = [];
  const centers = new Map();
  const radii = new Map();
  const signedAxes = new Map();
  for (let moduleIndex = 0; moduleIndex < 4; moduleIndex += 1) {
    const axis = axes[moduleIndex];
    const localU = unit(cross([0, 0, 1], axis));
    const localV = cross(axis, localU);
    for (const polarity of [1, -1]) {
      const suffix = polarity > 0 ? "Positive" : "Negative";
      const id = `${moduleIndex}${polarity > 0 ? "+" : "-"}`;
      const h = parameters[`h${suffix}`];
      const rho = parameters[`rho${suffix}`];
      const thetaOffset = polarity > 0 ? 0 : parameters.negativePhaseOffset;
      const center = vector(axis.map((entry) => polarity * h * entry));
      centers.set(id, center);
      radii.set(id, rho);
      signedAxes.set(id, vector(axis.map((entry) => polarity * entry)));
      sources.push({
        id,
        charge: polarity,
        trajectory: {
          kind: "moving-circular.v1",
          epochTime: 0,
          centerAtEpoch: center,
          centerVelocity: { x: 0, y: 0, z: 0 },
          radiusU: vector(localU.map((entry) => rho * entry)),
          radiusV: vector(localV.map((entry) => rho * entry)),
          angularVelocity:
            polarity * circulationSigns[moduleIndex] * parameters.angularRate,
          angularAcceleration: 0,
          phaseAtEpoch:
            phases[moduleIndex]
            + polarity * circulationSigns[moduleIndex] * thetaOffset,
        },
      });
    }
  }

  const period = TWO_PI / parameters.angularRate;
  const observationTimes = Array.from(
    { length: requestedSampleCount },
    (_, index) => index * period / requestedSampleCount,
  );
  const probes = sources.map((source) => ({
    id: `receiver-${source.id}`,
    kind: "prescribed-source-endpoint-probe.v1",
    transmitterId: source.id,
    selfHitPolicy: "exclude-same-transmitter-id.v1",
    observationTimes,
    polarities: [source.charge],
  }));
  const sourceRecord = {
    schema: "prescribed-path-analysis/exact-source-record.v1",
    recordId: "f6c-uniform-cadence-relative-equilibrium-search-row-v1",
    engineId: "prescribed-geometry",
    claimGrade: "guessed-prescribed-geometry",
    evidenceStatus: "diagnostic-only",
    history: { start: -16, end: period },
    sources,
  };
  const protocol = {
    schema: "prescribed-path-analysis/analysis-protocol.v1",
    protocolId: `f6c-relative-equilibrium-${requestedSampleCount}-sample-${confirmation ? "confirmation" : "search"}-v1`,
    fieldSpeed: 1,
    polarityMagnitude: 1,
    coupling: 1,
    history: { start: -16, end: period, minimumDelay: 1e-10 },
    returnWindow: { start: 0, period },
    rootPolicy: {
      id: "all-retained-simple-roots/sub-field-speed-certified.v1",
      tolerance: confirmation ? 1e-12 : 1e-11,
      maxIterations: confirmation ? 128 : 96,
    },
    tolerances: {
      cancellationFloor: 1e-30,
      rootTransversalityFloor: 0.20,
      minimumSeparationFloor: 1e-5,
      convergenceAbsolute: confirmation ? 1e-9 : 1e-8,
    },
    geometry: { minimumSeparationSamples: confirmation ? 2048 : 128 },
    convergence: {
      rootTolerance: confirmation ? 1e-14 : 1e-13,
      maxIterations: confirmation ? 192 : 144,
      minimumSeparationSamples: confirmation ? 4096 : 256,
    },
    probes,
  };
  return { sourceRecord, protocol, centers, radii, signedAxes };
}

function evaluate(unitCoordinates, requestedSampleCount = sampleCount, confirmation = false) {
  const parameters = decode(unitCoordinates);
  const { sourceRecord, protocol, centers, radii, signedAxes } = buildRequest(
    parameters,
    requestedSampleCount,
    confirmation,
  );
  try {
    const packet = evaluatePrescribedRecordAnalysis({ sourceRecord, protocol });
    if (!packet.reducedMeasures.validity.passed) return null;
    const rows = packet.rawLedgers.causalRoots.map((event) => {
      const center = centers.get(event.receiverSourceId);
      const rho = radii.get(event.receiverSourceId);
      const radial = multiply(subtract(event.probePosition, center), 1 / rho);
      const tangent = multiply(
        event.probeVelocity,
        1 / norm(event.probeVelocity),
      );
      const evaluated = event.measures.probeResponses[0].acceleration;
      const prescribed = multiply(
        radial,
        -rho * parameters.angularRate ** 2,
      );
      return {
        evaluated,
        prescribed,
        axial: signedAxes.get(event.receiverSourceId),
        radial,
        tangent,
      };
    });
    const numerator = rows.reduce(
      (sum, row) => sum + dot(row.evaluated, row.prescribed),
      0,
    );
    const denominator = rows.reduce(
      (sum, row) => sum + dot(row.evaluated, row.evaluated),
      0,
    );
    const coupling = Math.max(0, numerator / denominator);
    const residuals = rows.map((row) => norm(subtract(
      multiply(row.evaluated, coupling),
      row.prescribed,
    )));
    const prescribedRms = Math.sqrt(rows.reduce(
      (sum, row) => sum + dot(row.prescribed, row.prescribed),
      0,
    ) / rows.length);
    const residualRms = Math.sqrt(
      residuals.reduce((sum, value) => sum + value ** 2, 0) / residuals.length,
    );
    const residualComponents = Object.fromEntries(
      ["axial", "radial", "tangent"].map((component) => {
        const values = rows.map((row) => dot(
          subtract(multiply(row.evaluated, coupling), row.prescribed),
          row[component],
        ));
        return [component, {
          normalizedRms: Math.sqrt(
            values.reduce((sum, value) => sum + value ** 2, 0) / values.length,
          ) / prescribedRms,
          normalizedPeakAbsolute:
            Math.max(...values.map(Math.abs)) / prescribedRms,
        }];
      }),
    );
    return {
      objective: residualRms / prescribedRms,
      normalizedPeakResidual: Math.max(...residuals) / prescribedRms,
      fittedCommonCoupling: coupling,
      residualComponents,
      parameters,
      sourceHash: packet.source.sourceHash,
      protocolHash: packet.protocolHash,
      resultHash: packet.resultHash,
      rootCountRange: [
        Math.min(...packet.rawLedgers.causalRoots.map((event) => event.rootCount)),
        Math.max(...packet.rawLedgers.causalRoots.map((event) => event.rootCount)),
      ],
      minimumSeparation: packet.reducedMeasures.minimumSeparation.value,
      maximumRootResidual: Math.max(...packet.rawLedgers.causalRoots.flatMap(
        (event) => event.roots.map((root) => Math.abs(root.residual)),
      )),
      unitCoordinates: [...unitCoordinates],
    };
  } catch {
    return null;
  }
}

const survivors = [];
let rejectedRows = 0;
for (let rowIndex = 1; rowIndex <= searchRows; rowIndex += 1) {
  const unitCoordinates = bases.map((base) => halton(rowIndex, base));
  const result = evaluate(unitCoordinates);
  if (result) survivors.push(result);
  else rejectedRows += 1;
}
survivors.sort((left, right) => left.objective - right.objective);

const refined = [];
for (const start of survivors.slice(0, Math.min(5, survivors.length))) {
  let current = start;
  let step = 0.08;
  for (let round = 0; round < refinementRounds; round += 1) {
    const candidates = [current];
    for (let coordinate = 0; coordinate < bases.length; coordinate += 1) {
      for (const direction of [-1, 1]) {
        const trial = [...current.unitCoordinates];
        trial[coordinate] = clamp01(trial[coordinate] + direction * step);
        const result = evaluate(trial);
        if (result) candidates.push(result);
      }
    }
    candidates.sort((left, right) => left.objective - right.objective);
    current = candidates[0];
    step /= 2;
  }
  refined.push(current);
}

const ranked = [...survivors.slice(0, 12), ...refined]
  .sort((left, right) => left.objective - right.objective);
const distinct = [];
const hashes = new Set();
for (const row of ranked) {
  if (hashes.has(row.sourceHash)) continue;
  hashes.add(row.sourceHash);
  distinct.push(row);
}
const confirmation = distinct.length > 0
  ? evaluate(distinct[0].unitCoordinates, 128, true)
  : null;

console.log(JSON.stringify({
  claimGrade: "measured-report-grade-bounded-prescribed-path-search",
  excludedClaims: [
    "ordinary-evolution",
    "binding",
    "retention",
    "stability",
    "relative-equilibrium-existence-outside-the-declared-domain",
    "particle-identity",
  ],
  fieldSpeed: 1,
  polarityMagnitude: 1,
  search: {
    sampler: "deterministic-halton-plus-coordinate-refinement-v1",
    searchRows,
    sampleCount,
    refinementRounds,
    acceptedRows: survivors.length,
    rejectedRows,
    fixedConditions: {
      positiveThetaOffset: 0,
      commonUniformAngularRate: true,
      oneCommonFittedPositiveCouplingPerCandidate: true,
    },
    domain: {
      rhoPositive: [0.18, 0.48],
      hPositiveOverRhoPositive: [0.5, 2.5],
      rhoNegativeOverRhoPositive: [0.6, 1.6],
      hNegativeOverRhoNegative: [0.5, 2.5],
      maximumMemberSpeed: [0.15, 0.75],
      negativePhaseOffset: [0, TWO_PI],
    },
  },
  frozenBestRowConfirmation128: confirmation
    ? (({ unitCoordinates, ...row }) => row)(confirmation)
    : null,
  bestRows: distinct.slice(0, 12).map(({ unitCoordinates, ...row }) => row),
}, null, 2));
