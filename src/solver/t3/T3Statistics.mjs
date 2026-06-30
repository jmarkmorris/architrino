export function computeParticleStatistics(state, topology, options = {}) {
  const momentum = computeMomentum(state);
  const kineticEnergy = computeKineticEnergy(state);
  const speed = computeSpeedSummary(state);
  const density = {
    particleCount: state.particleCount,
    volume: topology.volume,
    meanNumberDensity: state.particleCount / topology.volume,
  };
  return {
    schema: "t3-particle-statistics.v1",
    time: state.time,
    stepIndex: state.stepIndex,
    particleCount: state.particleCount,
    density,
    momentum,
    kineticEnergy,
    speed,
    interactionEnergy: options.interactionEnergy ?? null,
    totalEnergy:
      options.interactionEnergy == null ? kineticEnergy : kineticEnergy + Number(options.interactionEnergy),
  };
}

export function computeMomentum(state) {
  const value = [0, 0, 0];
  for (let index = 0; index < state.particleCount; index += 1) {
    const offset = index * 3;
    const integrationWeight = state.integrationWeights[index];
    value[0] += integrationWeight * state.velocities[offset];
    value[1] += integrationWeight * state.velocities[offset + 1];
    value[2] += integrationWeight * state.velocities[offset + 2];
  }
  return {
    x: value[0],
    y: value[1],
    z: value[2],
    magnitude: Math.hypot(value[0], value[1], value[2]),
  };
}

export function computeKineticEnergy(state) {
  let energy = 0;
  for (let index = 0; index < state.particleCount; index += 1) {
    const offset = index * 3;
    const vx = state.velocities[offset];
    const vy = state.velocities[offset + 1];
    const vz = state.velocities[offset + 2];
    energy += 0.5 * state.integrationWeights[index] * (vx * vx + vy * vy + vz * vz);
  }
  return energy;
}

export function computeSpeedSummary(state) {
  if (state.particleCount === 0) {
    return { min: 0, max: 0, mean: 0, rms: 0 };
  }
  let min = Number.POSITIVE_INFINITY;
  let max = 0;
  let sum = 0;
  let sumSquares = 0;
  for (let index = 0; index < state.particleCount; index += 1) {
    const offset = index * 3;
    const speed = Math.hypot(
      state.velocities[offset],
      state.velocities[offset + 1],
      state.velocities[offset + 2]
    );
    min = Math.min(min, speed);
    max = Math.max(max, speed);
    sum += speed;
    sumSquares += speed * speed;
  }
  return {
    min,
    max,
    mean: sum / state.particleCount,
    rms: Math.sqrt(sumSquares / state.particleCount),
  };
}
