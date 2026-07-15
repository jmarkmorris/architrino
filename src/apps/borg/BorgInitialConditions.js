export const BORG_MAX_INITIAL_ARCHITRINO_COUNT = 512;

const POSITRINO_STATE_FLAG = 1;
const ELECTRINO_STATE_FLAG = 2;
const FIRST_PATH_KEY = 1001;
const POSITION_INSET_RATIO = 0.08;

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

export function validateBorgInitialConditionConfig(candidate = {}) {
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
  if (totalCount > BORG_MAX_INITIAL_ARCHITRINO_COUNT) {
    errors.push(`The combined population cannot exceed ${BORG_MAX_INITIAL_ARCHITRINO_COUNT}.`);
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
  const bounds = manifest?.simulationEnvelope?.centralVolume?.bounds ?? {};
  const stateFlags = createBalancedStateFlags(
    accepted.electrinoCount,
    accepted.positrinoCount,
  );

  return Object.freeze(stateFlags.map((flags, index) => Object.freeze({
    pathKey: FIRST_PATH_KEY + index,
    frameIndex: 0,
    time: 0,
    position: createRandomCentralPosition(bounds, rng),
    velocity: createRandomVelocity(
      rng,
      accepted.randomVelocityMaxComponentMagnitude,
      accepted.randomVelocityMinSpeed,
    ),
    errorBound: 0,
    stateFlags: flags,
    runSource: "seeded-random-live-initial-state",
    valueAuthority: "app-generated-native-run-initial-condition",
  })));
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

function createRandomCentralPosition(bounds, rng) {
  return {
    x: randomAxisValue(bounds.x, rng),
    y: randomAxisValue(bounds.y, rng),
    z: randomAxisValue(bounds.z, rng),
  };
}

function randomAxisValue(axisBounds, rng) {
  const [min, max] = Array.isArray(axisBounds) ? axisBounds : [0, 1];
  const low = Number.isFinite(Number(min)) ? Number(min) : 0;
  const high = Number.isFinite(Number(max)) ? Number(max) : low + 1;
  const span = Math.max(1, high - low);
  const inset = Math.min(span * POSITION_INSET_RATIO, span * 0.4);
  return low + inset + rng() * Math.max(0, span - inset * 2);
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
