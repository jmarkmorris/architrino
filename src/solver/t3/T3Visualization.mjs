export function createT3VisualizationFrame(state, topology, options = {}) {
  return {
    schema: "t3-visualization-frame.v1",
    time: state.time,
    stepIndex: state.stepIndex,
    particleCount: state.particleCount,
    sideLength: topology.sideLength,
    positions: Array.from(state.positions),
    velocities: options.includeVelocities === false ? undefined : Array.from(state.velocities),
    imageOffsets: options.includeImageOffsets === false ? undefined : Array.from(state.imageOffsets),
    densityMap:
      options.densityGridResolution === false
        ? undefined
        : createDensityMap(state, topology, options.densityGridResolution ?? 16),
    trails: options.trails,
    statistics: options.statistics,
  };
}

export function createDensityMap(state, topology, resolution = 16) {
  const gridResolution = positiveInteger(resolution, "densityGridResolution");
  const cellCount = gridResolution ** 3;
  const counts = new Uint32Array(cellCount);
  const cellSize = topology.sideLength / gridResolution;
  for (let index = 0; index < state.particleCount; index += 1) {
    const offset = index * 3;
    const ix = clampCell(Math.floor(state.positions[offset] / cellSize), gridResolution);
    const iy = clampCell(Math.floor(state.positions[offset + 1] / cellSize), gridResolution);
    const iz = clampCell(Math.floor(state.positions[offset + 2] / cellSize), gridResolution);
    counts[ix + gridResolution * (iy + gridResolution * iz)] += 1;
  }
  return {
    schema: "t3-density-map.v1",
    resolution: gridResolution,
    cellSize,
    counts: Array.from(counts),
  };
}

export function createTrailRecorder(input = {}) {
  const maxSamples = positiveInteger(input.maxSamples ?? 256, "max trail samples");
  const stride = positiveInteger(input.stride ?? 1, "trail stride");
  const samples = [];
  return {
    record(state) {
      const positions = [];
      const imageOffsets = [];
      for (let index = 0; index < state.particleCount; index += stride) {
        const offset = index * 3;
        positions.push(state.positions[offset], state.positions[offset + 1], state.positions[offset + 2]);
        imageOffsets.push(state.imageOffsets[offset], state.imageOffsets[offset + 1], state.imageOffsets[offset + 2]);
      }
      samples.push({
        time: state.time,
        stepIndex: state.stepIndex,
        stride,
        positions,
        imageOffsets,
      });
      while (samples.length > maxSamples) {
        samples.shift();
      }
    },
    snapshot() {
      return {
        schema: "t3-trails.v1",
        maxSamples,
        stride,
        samples: samples.map((sample) => ({ ...sample })),
      };
    },
  };
}

function clampCell(value, resolution) {
  return Math.max(0, Math.min(resolution - 1, value));
}

function positiveInteger(value, fieldName) {
  const numericValue = Number(value);
  if (!Number.isInteger(numericValue) || numericValue <= 0) {
    throw new TypeError(`${fieldName} must be a positive integer`);
  }
  return numericValue;
}
