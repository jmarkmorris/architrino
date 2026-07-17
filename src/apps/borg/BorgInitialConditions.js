export const BORG_MAX_INITIAL_ARCHITRINO_COUNT = 512;
export const BORG_PRESCRIBED_INITIAL_HISTORY_PROVENANCE =
  "app-authored-linear-initial-history-non-eom";
export const BORG_PRESCRIBED_INITIAL_HISTORY_CLAIM_LEVEL =
  "conditional-prescribed-initial-history";
export const BORG_ACCEPTED_SEED_HISTORY_PROVENANCE =
  "analytic-inertial-c1-initial-datum/v1";
export const BORG_ACCEPTED_SEED_HISTORY_CLAIM_LEVEL =
  "accepted-initial-datum-only-not-eom-output";
export const BORG_ACCEPTED_SEED_HISTORY_CERTIFICATE_VERSION =
  "borg-eom-seed-history-certificate.v1";

const POSITRINO_STATE_FLAG = 1;
const ELECTRINO_STATE_FLAG = 2;
const FIRST_PATH_KEY = 1001;

export function createBorgInitialConditionConfig(initialConditions = {}) {
  return Object.freeze({
    electrinoCount: nonNegativeInteger(initialConditions.electrinoCount, 8),
    positrinoCount: nonNegativeInteger(initialConditions.positrinoCount, 8),
    randomVelocityMaxComponentMagnitude: nonNegativeNumber(
      initialConditions.randomVelocityMaxComponentMagnitude,
      0.042,
    ),
    randomVelocityMinSpeed: nonNegativeNumber(
      initialConditions.randomVelocityMinSpeed,
      0.0144,
    ),
  });
}

export function validateBorgInitialConditionConfig(
  candidate = {},
  { maximumTotalCount = BORG_MAX_INITIAL_ARCHITRINO_COUNT } = {},
) {
  const errors = [];
  const electrinoCount = strictNonNegativeInteger(candidate.electrinoCount);
  const positrinoCount = strictNonNegativeInteger(candidate.positrinoCount);
  const maxComponent = strictNonNegativeNumber(candidate.randomVelocityMaxComponentMagnitude);
  const minSpeed = strictNonNegativeNumber(candidate.randomVelocityMinSpeed);

  if (electrinoCount == null) {
    errors.push("Electrino count must be a whole number of zero or more.");
  }
  if (positrinoCount == null) {
    errors.push("Positrino count must be a whole number of zero or more.");
  }
  const totalCount = (electrinoCount ?? 0) + (positrinoCount ?? 0);
  if (electrinoCount != null && positrinoCount != null && totalCount < 1) {
    errors.push("At least one electrino or positrino is required.");
  }
  if (totalCount > maximumTotalCount) {
    errors.push(`The combined population cannot exceed ${maximumTotalCount}.`);
  }
  if (maxComponent == null) {
    errors.push("Maximum velocity component must be zero or greater.");
  }
  if (minSpeed == null) {
    errors.push("Minimum speed must be zero or greater.");
  }
  if (
    maxComponent != null &&
    minSpeed != null &&
    minSpeed > Math.sqrt(3) * maxComponent
  ) {
    errors.push("Minimum speed cannot exceed the largest speed allowed by the component limit.");
  }

  return Object.freeze({
    ok: errors.length === 0,
    errors: Object.freeze(errors),
    config: errors.length === 0
      ? Object.freeze({
          electrinoCount,
          positrinoCount,
          randomVelocityMaxComponentMagnitude: maxComponent,
          randomVelocityMinSpeed: minSpeed,
        })
      : null,
  });
}

export function createBorgSeededInitialConditionRows({ manifest, seedIndex = 0, config }) {
  const validation = validateBorgInitialConditionConfig(config);
  if (!validation.ok) {
    throw new TypeError(validation.errors[0]);
  }
  const accepted = validation.config;
  const rng = createSeededRandom([
    manifest?.initialConditions?.initialConditionSeed ?? "borg",
    manifest?.initialConditions?.velocitySeed ?? "velocity",
    seedIndex,
    accepted.electrinoCount,
    accepted.positrinoCount,
    accepted.randomVelocityMaxComponentMagnitude,
    accepted.randomVelocityMinSpeed,
  ].join(":"));
  const envelopeCenter = manifest?.simulationEnvelope?.center ?? {};
  const outerRadius = Number(manifest?.simulationEnvelope?.outerRadius);
  if (![envelopeCenter.x, envelopeCenter.y, envelopeCenter.z].every(Number.isFinite) ||
      !(outerRadius > 0)) {
    throw new TypeError("Borg initial conditions require a finite spherical-envelope center and positive outer radius.");
  }
  const stateFlags = createBalancedStateFlags(
    accepted.electrinoCount,
    accepted.positrinoCount,
  );
  const positions = createSeparatedRandomSimulationEnvelopePositions(
      stateFlags.length,
      envelopeCenter,
      calculateBorgSeedingRadius(manifest, stateFlags.length),
      rng,
      nonNegativeNumber(manifest?.initialConditions?.minimumPairSeparation, 0),
    );
  const initialStateRunSource = "seeded-random-minimum-separation-initial-state";

  return Object.freeze(stateFlags.map((flags, index) => Object.freeze({
    pathKey: FIRST_PATH_KEY + index,
    frameIndex: 0,
    time: 0,
    position: positions[index],
    velocity: createRandomVelocity(
      rng,
      accepted.randomVelocityMaxComponentMagnitude,
      accepted.randomVelocityMinSpeed,
    ),
    errorBound: 0,
    stateFlags: flags,
    runSource: initialStateRunSource,
    valueAuthority: "app-generated-native-run-initial-condition",
  })));
}

export function calculateBorgInertialHistoryDepth(
  endpointRows,
  {
    fieldSpeed = 1,
    sampleInterval = 0.01,
    safetyMargin = sampleInterval,
    maximumSeparation = 0,
  } = {},
) {
  const speed = Number(fieldSpeed);
  const interval = Number(sampleInterval);
  const margin = Number(safetyMargin);
  if (!Array.isArray(endpointRows) || endpointRows.length === 0) {
    throw new TypeError("Borg inertial history coverage requires endpoint rows.");
  }
  if (!(speed > 0) || !(interval > 0) || !(margin >= 0)) {
    throw new RangeError("Borg inertial history coverage requires positive field speed and sample interval.");
  }
  let delayUpperBound = 0;
  let maximumSourceSpeed = 0;
  endpointRows.forEach((receiver) => {
    endpointRows.forEach((source) => {
      const sourceSpeed = vectorMagnitude(source.velocity);
      if (!(sourceSpeed < speed)) {
        throw new RangeError(
          `Borg inertial initial history requires sub-field source speed for path ${source.pathKey}.`,
        );
      }
      maximumSourceSpeed = Math.max(maximumSourceSpeed, sourceSpeed);
      const separation = vectorDistance(receiver.position, source.position);
      delayUpperBound = Math.max(
        delayUpperBound,
        separation / (speed - sourceSpeed),
      );
    });
  });
  const separationBound = Number(maximumSeparation);
  if (Number.isFinite(separationBound) && separationBound > 0) {
    delayUpperBound = Math.max(
      delayUpperBound,
      separationBound / (speed - maximumSourceSpeed),
    );
  }
  return Number((Math.ceil((delayUpperBound + margin) / interval) * interval).toFixed(12));
}

export async function createBorgAcceptedInertialSeedHistory(
  endpointRows,
  {
    historyStartTime,
    historyEndTime,
    sampleInterval = 0.01,
    minimumPairSeparation = 0,
    digest = sha256Hex,
  } = {},
) {
  const startTime = Number(historyStartTime);
  const endTime = Number(historyEndTime);
  if (!Array.isArray(endpointRows) || endpointRows.length === 0) {
    throw new TypeError("Borg accepted EOM seed requires endpoint rows.");
  }
  if (!Number.isFinite(startTime) || !Number.isFinite(endTime) || startTime >= endTime) {
    throw new RangeError("Borg accepted EOM seed requires an increasing retained-history interval.");
  }
  const duration = endTime - startTime;
  const interval = Number(sampleInterval);
  const segmentCount = Math.round(duration / interval);
  if (!(interval > 0) || Math.abs(segmentCount * interval - duration) > 1e-9) {
    throw new RangeError("Borg accepted EOM seed interval must contain whole sample intervals.");
  }
  const geometryCertificate = certifyBorgMinimumSeparation(endpointRows, {
    minimumPairSeparation,
  });
  if (!geometryCertificate.accepted) {
    throw new RangeError(
      `Borg initial geometry minimum separation ${geometryCertificate.measuredMinimumSeparation} is below ${geometryCertificate.requiredMinimumSeparation}.`,
    );
  }
  const rows = Object.freeze(endpointRows.flatMap((row) => {
    const position = cloneVector(row.position);
    const velocity = cloneVector(row.velocity);
    const common = {
      pathKey: row.pathKey,
      errorBound: 0,
      stateFlags: row.stateFlags ?? 0,
      runSource: "accepted-inertial-eom-seed-history",
      valueAuthority: "accepted-mathematical-initial-datum",
      historySourceProvenance: BORG_ACCEPTED_SEED_HISTORY_PROVENANCE,
      historySourceClaimLevel: BORG_ACCEPTED_SEED_HISTORY_CLAIM_LEVEL,
      historySourceAcceptedInitialDatum: true,
      historySourceIsEomOutput: false,
    };
    return [0, segmentCount].map((sampleIndex) => {
      const time = sampleIndex === 0 ? startTime : endTime;
      const offsetFromEnd = endTime - time;
      return Object.freeze({
        ...common,
        historyInterpolation: "exact-inertial-polynomial/v1",
        frameIndex: sampleIndex,
        time,
        position: Object.freeze({
          x: position.x - velocity.x * offsetFromEnd,
          y: position.y - velocity.y * offsetFromEnd,
          z: position.z - velocity.z * offsetFromEnd,
        }),
        velocity: Object.freeze(velocity),
      });
    });
  }));
  const certificatePayload = {
    schema: BORG_ACCEPTED_SEED_HISTORY_CERTIFICATE_VERSION,
    construction: BORG_ACCEPTED_SEED_HISTORY_PROVENANCE,
    historyStartTime: startTime,
    historyEndTime: endTime,
    sampleInterval: interval,
    pathCount: endpointRows.length,
    geometryCertificate,
    paths: endpointRows
      .map((row) => ({
        pathKey: Number(row.pathKey),
        stateFlags: Number(row.stateFlags ?? 0),
        position: cloneVector(row.position),
        velocity: cloneVector(row.velocity),
      }))
      .sort((left, right) => left.pathKey - right.pathKey),
  };
  const contentSha256 = await digest(JSON.stringify(certificatePayload));
  const certificate = Object.freeze({
    ...certificatePayload,
    contentSha256,
    accepted: true,
    acceptanceScope: "eom-continuous-initial-datum-only",
    mathematicalClass: "C1-exact-inertial-polynomial",
    interpolationErrorBound: 0,
    futurePathPrescription: false,
    eomOutput: false,
    canonicalEomEvidence: false,
    independentReference:
      "eom_independent_oracle/v0:inertial-history-representation",
  });
  return Object.freeze({
    rows,
    endpointRows: Object.freeze(endpointRows.map((row) => Object.freeze({
      ...row,
      position: Object.freeze(cloneVector(row.position)),
      velocity: Object.freeze(cloneVector(row.velocity)),
    }))),
    certificate,
  });
}

export function certifyBorgMinimumSeparation(
  endpointRows,
  { minimumPairSeparation = 0, comparisonTolerance = 1e-12 } = {},
) {
  const required = nonNegativeNumber(minimumPairSeparation, 0);
  const tolerance = nonNegativeNumber(comparisonTolerance, 1e-12);
  let measured = Number.POSITIVE_INFINITY;
  let closestPair = null;
  for (let left = 0; left < endpointRows.length; left += 1) {
    for (let right = left + 1; right < endpointRows.length; right += 1) {
      const separation = vectorDistance(
        endpointRows[left].position,
        endpointRows[right].position,
      );
      if (separation < measured) {
        measured = separation;
        closestPair = Object.freeze([
          endpointRows[left].pathKey,
          endpointRows[right].pathKey,
        ]);
      }
    }
  }
  if (!Number.isFinite(measured)) {
    measured = Number.POSITIVE_INFINITY;
  }
  return Object.freeze({
    schema: "borg-minimum-separation-certificate.v1",
    claimLevel: "measured-endpoint-geometry",
    instrument: "all-unordered-pair-euclidean-distance-at-T0",
    requiredMinimumSeparation: required,
    measuredMinimumSeparation: measured,
    comparisonTolerance: tolerance,
    closestPair,
    accepted: measured + tolerance >= required,
  });
}

export function createBorgPrescribedLinearHistoryRows(
  endpointRows,
  { historyStartTime, historyEndTime } = {},
) {
  const startTime = Number(historyStartTime);
  const endTime = Number(historyEndTime);
  if (!Array.isArray(endpointRows) || endpointRows.length === 0) {
    throw new TypeError("Borg prescribed initial history requires endpoint rows.");
  }
  if (!Number.isFinite(startTime) || !Number.isFinite(endTime) || startTime >= endTime) {
    throw new RangeError("Borg prescribed initial history requires an increasing time interval.");
  }
  const duration = endTime - startTime;
  return Object.freeze(endpointRows.flatMap((row) => {
    const position = cloneVector(row.position);
    const velocity = cloneVector(row.velocity);
    const common = {
      pathKey: row.pathKey,
      errorBound: row.errorBound ?? 0,
      stateFlags: row.stateFlags ?? 0,
      runSource: "prescribed-linear-eom-initial-history",
      valueAuthority: "app-authored-prescribed-initial-history",
      historySourceProvenance: BORG_PRESCRIBED_INITIAL_HISTORY_PROVENANCE,
      historySourceClaimLevel: BORG_PRESCRIBED_INITIAL_HISTORY_CLAIM_LEVEL,
    };
    return [
      Object.freeze({
        ...common,
        frameIndex: 0,
        time: startTime,
        position: Object.freeze({
          x: position.x - velocity.x * duration,
          y: position.y - velocity.y * duration,
          z: position.z - velocity.z * duration,
        }),
        velocity: Object.freeze(velocity),
      }),
      Object.freeze({
        ...common,
        frameIndex: 1,
        time: endTime,
        position: Object.freeze(position),
        velocity: Object.freeze(velocity),
      }),
    ];
  }));
}

function createBalancedStateFlags(electrinoCount, positrinoCount) {
  let electrinosRemaining = electrinoCount;
  let positrinosRemaining = positrinoCount;
  const flags = [];
  while (electrinosRemaining > 0 || positrinosRemaining > 0) {
    if (positrinosRemaining > 0) {
      flags.push(POSITRINO_STATE_FLAG);
      positrinosRemaining -= 1;
    }
    if (electrinosRemaining > 0) {
      flags.push(ELECTRINO_STATE_FLAG);
      electrinosRemaining -= 1;
    }
  }
  return flags;
}

function createRandomSimulationEnvelopePosition(center, radius, rng) {
  for (let attempt = 0; attempt < 256; attempt += 1) {
    const offset = {
      x: (rng() * 2 - 1) * radius,
      y: (rng() * 2 - 1) * radius,
      z: (rng() * 2 - 1) * radius,
    };
    if (Math.hypot(offset.x, offset.y, offset.z) <= radius) {
      return {
        x: Number(center.x) + offset.x,
        y: Number(center.y) + offset.y,
        z: Number(center.z) + offset.z,
      };
    }
  }
  throw new RangeError("Borg could not draw a position inside the spherical simulation envelope.");
}

/**
 * Seeding radius that holds the manifest's declared number density as the
 * population grows. The manifest declares its population inside its outer
 * radius; N architrinos at that same density need a ball whose volume scales
 * with N, so the radius scales with the cube root of the population ratio.
 *
 * Without this, larger populations are impossible rather than merely dense:
 * a minimum separation of s reserves a ball of radius s/2 per architrino, and
 * random sequential placement saturates near ~30% of the packing limit. The
 * declared 0.2 separation cannot place 64 architrinos inside radius 0.5 at
 * all (measured 2026-07-17: RangeError after 20000 attempts), which is a
 * geometry failure, not a physics one.
 */
export function calculateBorgSeedingRadius(manifest, count) {
  const outerRadius = Number(manifest?.simulationEnvelope?.outerRadius);
  const declaredCount = Number(manifest?.population?.architrinoCount);
  if (!(outerRadius > 0)) {
    throw new TypeError("Borg seeding radius requires a positive envelope outer radius.");
  }
  if (!Number.isInteger(declaredCount) || declaredCount <= 0 ||
      !Number.isInteger(count) || count <= 0 || count <= declaredCount) {
    return outerRadius;
  }
  return outerRadius * Math.cbrt(count / declaredCount);
}

function createSeparatedRandomSimulationEnvelopePositions(
  count,
  center,
  radius,
  rng,
  minimumSeparation,
) {
  const positions = [];
  for (let index = 0; index < count; index += 1) {
    let accepted = null;
    for (let attempt = 0; attempt < 20000; attempt += 1) {
      const candidate = createRandomSimulationEnvelopePosition(center, radius, rng);
      if (positions.every((position) => vectorDistance(position, candidate) >= minimumSeparation)) {
        accepted = Object.freeze(candidate);
        break;
      }
    }
    if (!accepted) {
      throw new RangeError(
        `Borg could not place ${count} architrinos with minimum separation ${minimumSeparation}.`,
      );
    }
    positions.push(accepted);
  }
  return Object.freeze(positions);
}

function createRandomVelocity(rng, maxComponentMagnitude, minSpeed) {
  if (maxComponentMagnitude === 0) {
    return { x: 0, y: 0, z: 0 };
  }
  for (let attempt = 0; attempt < 64; attempt += 1) {
    const velocity = {
      x: randomSignedMagnitude(rng, maxComponentMagnitude),
      y: randomSignedMagnitude(rng, maxComponentMagnitude),
      z: randomSignedMagnitude(rng, maxComponentMagnitude),
    };
    if (Math.hypot(velocity.x, velocity.y, velocity.z) >= minSpeed) {
      return velocity;
    }
  }
  const component = minSpeed / Math.sqrt(3);
  return { x: component, y: component, z: component };
}

function randomSignedMagnitude(rng, magnitude) {
  return (rng() * 2 - 1) * magnitude;
}

function cloneVector(vector = {}) {
  return {
    x: Number(vector.x) || 0,
    y: Number(vector.y) || 0,
    z: Number(vector.z) || 0,
  };
}

async function sha256Hex(text) {
  const subtle = globalThis.crypto?.subtle;
  if (!subtle || typeof TextEncoder !== "function") {
    throw new Error("Borg accepted EOM seed certification requires Web Crypto SHA-256.");
  }
  const bytes = new TextEncoder().encode(text);
  const digest = await subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function createSeededRandom(seedText) {
  let state = hashSeedText(seedText);
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeedText(seedText) {
  let hash = 2166136261;
  String(seedText).split("").forEach((character) => {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  });
  return hash >>> 0;
}

function vectorMagnitude(vector) {
  const x = Number(vector?.x);
  const y = Number(vector?.y);
  const z = Number(vector?.z);
  if (![x, y, z].every(Number.isFinite)) {
    throw new TypeError("Borg inertial history coverage requires finite velocity components.");
  }
  return Math.hypot(x, y, z);
}

function vectorDistance(left, right) {
  const values = [
    Number(left?.x) - Number(right?.x),
    Number(left?.y) - Number(right?.y),
    Number(left?.z) - Number(right?.z),
  ];
  if (!values.every(Number.isFinite)) {
    throw new TypeError("Borg inertial history coverage requires finite positions.");
  }
  return Math.hypot(...values);
}

function strictNonNegativeInteger(value) {
  const number = Number(value);
  return Number.isInteger(number) && number >= 0 ? number : null;
}

function strictNonNegativeNumber(value) {
  if (value === "" || value == null) {
    return null;
  }
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

function nonNegativeInteger(value, fallback) {
  return strictNonNegativeInteger(value) ?? fallback;
}

function nonNegativeNumber(value, fallback) {
  return strictNonNegativeNumber(value) ?? fallback;
}
