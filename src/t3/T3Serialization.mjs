import fs from "node:fs";
import path from "node:path";

import { createT3State } from "./T3State.mjs";

export function serializeT3State(state) {
  return {
    schema: state.schema,
    particleCount: state.particleCount,
    time: state.time,
    stepIndex: state.stepIndex,
    positions: Array.from(state.positions),
    velocities: Array.from(state.velocities),
    accelerations: Array.from(state.accelerations),
    imageOffsets: Array.from(state.imageOffsets),
    orientations: Array.from(state.orientations),
    angularVelocities: Array.from(state.angularVelocities),
    integrationWeights: Array.from(state.integrationWeights),
    electrineFractions: Array.from(state.electrineFractions),
    ids: [...state.ids],
    metadata: JSON.parse(JSON.stringify(state.metadata ?? {})),
  };
}

export function deserializeT3State(record) {
  return createT3State(record);
}

export function createT3TrajectoryFrame(state, options = {}) {
  const stride = positiveInteger(options.stride ?? 1, "trajectory stride");
  const particleIndexes = [];
  for (let index = 0; index < state.particleCount; index += stride) {
    particleIndexes.push(index);
  }
  const positions = [];
  const velocities = [];
  const imageOffsets = [];
  const electrineFractions = [];
  for (const index of particleIndexes) {
    const offset = index * 3;
    positions.push(state.positions[offset], state.positions[offset + 1], state.positions[offset + 2]);
    velocities.push(state.velocities[offset], state.velocities[offset + 1], state.velocities[offset + 2]);
    imageOffsets.push(state.imageOffsets[offset], state.imageOffsets[offset + 1], state.imageOffsets[offset + 2]);
    electrineFractions.push(state.electrineFractions[index]);
  }
  return {
    schema: "t3-trajectory-frame.v1",
    time: state.time,
    stepIndex: state.stepIndex,
    particleCount: state.particleCount,
    sampledParticleCount: particleIndexes.length,
    stride,
    particleIndexes,
    positions,
    velocities,
    imageOffsets,
    electrineFractions,
  };
}

export function createT3Checkpoint({ config, state, solverSnapshot = {}, metadata = {} }) {
  return {
    schema: "t3-checkpoint.v1",
    createdAt: new Date().toISOString(),
    config,
    state: serializeT3State(state),
    solver: solverSnapshot,
    metadata,
  };
}

export function writeT3ExperimentOutput(input) {
  const outputDir = path.resolve(input.outputDir ?? ".tmp/t3-universe-run");
  fs.mkdirSync(outputDir, { recursive: true });
  const written = {};
  if (input.config) {
    written.config = writeJson(path.join(outputDir, "config.t3-universe.json"), input.config);
  }
  if (input.metadata) {
    written.metadata = writeJson(path.join(outputDir, "metadata.t3-universe.json"), input.metadata);
  }
  if (input.statistics) {
    written.statistics = writeJson(path.join(outputDir, "statistics.t3-universe.json"), input.statistics);
  }
  if (input.checkpoint) {
    written.checkpoint = writeJson(path.join(outputDir, "checkpoint.t3-universe.json"), input.checkpoint);
  }
  if (Array.isArray(input.trajectoryFrames)) {
    const trajectoryPath = path.join(outputDir, "trajectory.t3-universe.jsonl");
    fs.writeFileSync(
      trajectoryPath,
      input.trajectoryFrames.map((frame) => JSON.stringify(frame)).join("\n") +
        (input.trajectoryFrames.length > 0 ? "\n" : "")
    );
    written.trajectory = trajectoryPath;
  }
  return {
    schema: "t3-experiment-output.v1",
    outputDir,
    written,
  };
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
  return filePath;
}

function positiveInteger(value, fieldName) {
  const numericValue = Number(value);
  if (!Number.isInteger(numericValue) || numericValue <= 0) {
    throw new TypeError(`${fieldName} must be a positive integer`);
  }
  return numericValue;
}
