import { createSeededRandom } from "./T3Random.mjs";
import { createT3State, normalizeFraction, wrapAllPositions } from "./T3State.mjs";
import { createT3Topology } from "./T3Topology.mjs";

export function createInitialT3State(config = {}) {
  const topology = createT3Topology(config.topology ?? config);
  const initial = config.initialConditions ?? config.initial ?? {};
  if (initial.importedState || initial.state) {
    return wrapAllPositions(createT3State(initial.importedState ?? initial.state), topology);
  }

  const userParticles = initial.particles ?? config.particles?.items;
  if (Array.isArray(userParticles)) {
    return createStateFromUserParticles(userParticles, config, topology);
  }

  const particleCount = resolveParticleCount(config, topology);
  const state = createT3State({
    particleCount,
    electrineFraction: config.particles?.electrineFraction ?? config.electrineFraction ?? 0.5,
    masses: config.particles?.mass ?? config.mass ?? 1,
    metadata: {
      initialCondition: initial.kind ?? initial.distribution ?? "random",
      seed: initial.seed ?? config.seed ?? 1,
    },
  });
  const random = createSeededRandom(initial.seed ?? config.seed ?? 1);
  fillPositions(state, topology, initial, random);
  fillVelocities(state, initial, random);
  wrapAllPositions(state, topology);
  return state;
}

function resolveParticleCount(config, topology) {
  const count = config.particles?.count ?? config.architrinoCount ?? config.particleCount;
  if (count != null) {
    return positiveInteger(count, "particle count");
  }
  const density = config.particles?.spatialDensity ?? config.spatialDensity;
  if (density != null) {
    return Math.max(1, Math.round(positiveFiniteNumber(density, "spatialDensity") * topology.volume));
  }
  return 1;
}

function fillPositions(state, topology, initial, random) {
  const distribution = initial.distribution ?? initial.positionDistribution ?? initial.kind ?? "random";
  if (distribution === "random") {
    fillRandomPositions(state, topology, initial, random);
  } else if (distribution === "lattice") {
    fillLatticePositions(state, topology);
  } else if (distribution === "clustered" || distribution === "clusters") {
    fillClusteredPositions(state, topology, initial, random);
  } else {
    throw new TypeError(`unsupported position distribution: ${distribution}`);
  }
}

function fillRandomPositions(state, topology, initial, random) {
  const gradient = initial.densityGradient;
  for (let index = 0; index < state.particleCount; index += 1) {
    const offset = index * 3;
    if (gradient) {
      const point = sampleGradientPoint(topology, gradient, random);
      state.positions[offset] = point[0];
      state.positions[offset + 1] = point[1];
      state.positions[offset + 2] = point[2];
    } else {
      state.positions[offset] = random.next() * topology.sideLength;
      state.positions[offset + 1] = random.next() * topology.sideLength;
      state.positions[offset + 2] = random.next() * topology.sideLength;
    }
  }
}

function sampleGradientPoint(topology, gradient, random) {
  const axis = axisIndex(gradient.axis ?? "x");
  const strength = clamp(Number(gradient.strength ?? 0), -0.95, 0.95);
  const point = [0, 0, 0];
  while (true) {
    point[0] = random.next() * topology.sideLength;
    point[1] = random.next() * topology.sideLength;
    point[2] = random.next() * topology.sideLength;
    const normalized = point[axis] / topology.sideLength;
    const weight = Math.max(0.01, 1 + strength * (2 * normalized - 1));
    if (random.next() <= weight / (1 + Math.abs(strength))) {
      return point;
    }
  }
}

function fillLatticePositions(state, topology) {
  const cellsPerAxis = Math.ceil(Math.cbrt(state.particleCount));
  const spacing = topology.sideLength / cellsPerAxis;
  for (let index = 0; index < state.particleCount; index += 1) {
    const ix = index % cellsPerAxis;
    const iy = Math.floor(index / cellsPerAxis) % cellsPerAxis;
    const iz = Math.floor(index / (cellsPerAxis * cellsPerAxis));
    const offset = index * 3;
    state.positions[offset] = (ix + 0.5) * spacing;
    state.positions[offset + 1] = (iy + 0.5) * spacing;
    state.positions[offset + 2] = (iz + 0.5) * spacing;
  }
}

function fillClusteredPositions(state, topology, initial, random) {
  const clusters = normalizeClusters(initial.clusters, topology);
  const totalWeight = clusters.reduce((sum, cluster) => sum + cluster.weight, 0);
  for (let index = 0; index < state.particleCount; index += 1) {
    const cluster = pickWeighted(clusters, totalWeight, random);
    const offset = index * 3;
    state.positions[offset] = cluster.center[0] + random.gaussian(0, cluster.sigma);
    state.positions[offset + 1] = cluster.center[1] + random.gaussian(0, cluster.sigma);
    state.positions[offset + 2] = cluster.center[2] + random.gaussian(0, cluster.sigma);
  }
}

function normalizeClusters(clusters, topology) {
  if (!Array.isArray(clusters) || clusters.length === 0) {
    return [
      {
        center: [topology.sideLength / 2, topology.sideLength / 2, topology.sideLength / 2],
        sigma: topology.sideLength / 12,
        weight: 1,
      },
    ];
  }
  return clusters.map((cluster, index) => ({
    center: normalizeVector(cluster.center, topology.sideLength, `clusters[${index}].center`),
    sigma: positiveFiniteNumber(cluster.sigma ?? topology.sideLength / 12, `clusters[${index}].sigma`),
    weight: positiveFiniteNumber(cluster.weight ?? 1, `clusters[${index}].weight`),
  }));
}

function pickWeighted(items, totalWeight, random) {
  let threshold = random.next() * totalWeight;
  for (const item of items) {
    threshold -= item.weight;
    if (threshold <= 0) {
      return item;
    }
  }
  return items[items.length - 1];
}

function fillVelocities(state, initial, random) {
  const velocityMode = initial.velocityDistribution ?? initial.velocities ?? "stationary";
  if (velocityMode === "stationary") {
    state.velocities.fill(0);
  } else if (velocityMode === "random") {
    const maxSpeed = positiveFiniteNumber(initial.maxSpeed ?? 1, "maxSpeed");
    for (let index = 0; index < state.velocities.length; index += 1) {
      state.velocities[index] = (random.next() * 2 - 1) * maxSpeed;
    }
  } else if (velocityMode === "gaussian") {
    const mean = Number(initial.velocityMean ?? 0);
    const standardDeviation = positiveFiniteNumber(initial.velocityStdDev ?? initial.velocitySigma ?? 1, "velocityStdDev");
    for (let index = 0; index < state.velocities.length; index += 1) {
      state.velocities[index] = random.gaussian(mean, standardDeviation);
    }
  } else if (Array.isArray(velocityMode)) {
    if (velocityMode.length !== state.velocities.length) {
      throw new TypeError(`velocities must contain ${state.velocities.length} values`);
    }
    state.velocities.set(velocityMode);
  } else {
    throw new TypeError(`unsupported velocity distribution: ${velocityMode}`);
  }
}

function createStateFromUserParticles(particles, config, topology) {
  const state = createT3State({
    particleCount: particles.length,
    electrineFraction: config.particles?.electrineFraction ?? config.electrineFraction ?? 0.5,
    masses: config.particles?.mass ?? config.mass ?? 1,
  });
  particles.forEach((particle, index) => {
    const vectorOffset = index * 3;
    const orientationOffset = index * 4;
    const position = normalizeVector(particle.position ?? [0, 0, 0], topology.sideLength, `particles[${index}].position`);
    const velocity = normalizeVector(particle.velocity ?? [0, 0, 0], Number.POSITIVE_INFINITY, `particles[${index}].velocity`);
    state.positions.set(position, vectorOffset);
    state.velocities.set(velocity, vectorOffset);
    state.masses[index] = positiveFiniteNumber(particle.mass ?? state.masses[index], `particles[${index}].mass`);
    state.electrineFractions[index] = normalizeFraction(
      particle.electrineFraction ?? particle.electrinePercentage ?? state.electrineFractions[index]
    );
    if (particle.id != null) {
      state.ids[index] = String(particle.id);
    }
    if (particle.orientation != null) {
      const orientation = normalizeOrientation(particle.orientation, `particles[${index}].orientation`);
      state.orientations.set(orientation, orientationOffset);
    }
  });
  return wrapAllPositions(state, topology);
}

function normalizeVector(value, limit, fieldName) {
  if (!Array.isArray(value) && !(value instanceof Float64Array)) {
    throw new TypeError(`${fieldName} must be a 3-vector`);
  }
  if (value.length !== 3) {
    throw new TypeError(`${fieldName} must contain 3 values`);
  }
  return Array.from(value, (entry) => {
    const numericEntry = Number(entry);
    if (!Number.isFinite(numericEntry)) {
      throw new TypeError(`${fieldName} entries must be finite`);
    }
    if (Number.isFinite(limit) && Math.abs(numericEntry) > limit * 4) {
      throw new TypeError(`${fieldName} entry is outside the supported setup range`);
    }
    return numericEntry;
  });
}

function normalizeOrientation(value, fieldName) {
  if (!Array.isArray(value) && !(value instanceof Float64Array)) {
    throw new TypeError(`${fieldName} must be a quaternion`);
  }
  if (value.length !== 4) {
    throw new TypeError(`${fieldName} must contain 4 values`);
  }
  return Array.from(value, (entry) => {
    const numericEntry = Number(entry);
    if (!Number.isFinite(numericEntry)) {
      throw new TypeError(`${fieldName} entries must be finite`);
    }
    return numericEntry;
  });
}

function axisIndex(axis) {
  if (axis === "x" || axis === 0) return 0;
  if (axis === "y" || axis === 1) return 1;
  if (axis === "z" || axis === 2) return 2;
  throw new TypeError("densityGradient.axis must be x, y, z, 0, 1, or 2");
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function positiveInteger(value, fieldName) {
  const numericValue = Number(value);
  if (!Number.isInteger(numericValue) || numericValue <= 0) {
    throw new TypeError(`${fieldName} must be a positive integer`);
  }
  return numericValue;
}

function positiveFiniteNumber(value, fieldName) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    throw new TypeError(`${fieldName} must be positive and finite`);
  }
  return numericValue;
}
