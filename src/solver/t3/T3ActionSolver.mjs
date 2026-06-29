import { cloneT3State, copyT3StateInto } from "./T3State.mjs";

export const T3_ACTION_SOLVER_SCHEMA = "t3-action-solver.v1";

export const referenceActionSolver = Object.freeze({
  id: "t3-reference-action-solver",
  schema: T3_ACTION_SOLVER_SCHEMA,
  create(input = {}) {
    return new T3ActionSolver(input);
  },
});

export class T3ActionSolver {
  constructor(input = {}) {
    if (!input.topology) {
      throw new TypeError("T3ActionSolver requires a topology");
    }
    if (!input.spatialIndex) {
      throw new TypeError("T3ActionSolver requires a spatialIndex");
    }
    if (!input.interactionPipeline) {
      throw new TypeError("T3ActionSolver requires an interactionPipeline");
    }
    this.id = input.id ?? "t3-reference-action-solver";
    this.schema = T3_ACTION_SOLVER_SCHEMA;
    this.topology = input.topology;
    this.spatialIndex = input.spatialIndex;
    this.interactionPipeline = input.interactionPipeline;
    this.config = input.config ?? {};
    this.lastAcceptedTimestep = null;
    this.rejectedAdaptiveSteps = 0;
  }

  evaluateAccelerations(state) {
    this.interactionPipeline.evaluateAccelerations(this.createContext(state));
    return state;
  }

  step(state, options = {}) {
    const solverConfig = this.config.solver ?? this.config.integration ?? {};
    const mode = options.mode ?? solverConfig.mode ?? solverConfig.timestepMode ?? "fixed";
    if (mode === "adaptive") {
      return this.stepAdaptive(state, options);
    }
    return this.stepFixed(state, options);
  }

  stepFixed(state, options = {}) {
    const dt = positiveFiniteNumber(
      options.timestep ?? options.dt ?? this.config.solver?.timestep ?? this.config.timestep ?? 0.01,
      "timestep"
    );
    this.interactionPipeline.beforeStep(this.createContext(state, { timestep: dt }));
    integrateVelocityVerletInPlace(state, dt, this, { countStep: true });
    this.lastAcceptedTimestep = dt;
    const context = this.createContext(state, { timestep: dt });
    this.interactionPipeline.afterStep(context);
    return {
      schema: "t3-solver-step-result.v1",
      mode: "fixed",
      accepted: true,
      timestep: dt,
      time: state.time,
      stepIndex: state.stepIndex,
    };
  }

  stepAdaptive(state, options = {}) {
    const solverConfig = this.config.solver ?? {};
    const requestedDt = positiveFiniteNumber(
      options.timestep ?? options.dt ?? this.lastAcceptedTimestep ?? solverConfig.timestep ?? 0.01,
      "adaptive timestep"
    );
    const tolerance = positiveFiniteNumber(
      options.tolerance ?? solverConfig.tolerance ?? solverConfig.errorTolerance ?? 1e-6,
      "adaptive tolerance"
    );
    const minTimestep = positiveFiniteNumber(options.minTimestep ?? solverConfig.minTimestep ?? requestedDt / 1024, "minTimestep");
    const maxTimestep = positiveFiniteNumber(options.maxTimestep ?? solverConfig.maxTimestep ?? requestedDt * 4, "maxTimestep");
    const maxAttempts = positiveInteger(options.maxAttempts ?? solverConfig.maxAttempts ?? 16, "maxAttempts");
    const originalStepIndex = state.stepIndex;
    let dt = Math.min(requestedDt, maxTimestep);
    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      const oneStep = cloneT3State(state);
      const twoHalfSteps = cloneT3State(state);
      integrateVelocityVerletInPlace(oneStep, dt, this, { countStep: false });
      integrateVelocityVerletInPlace(twoHalfSteps, dt / 2, this, { countStep: false });
      integrateVelocityVerletInPlace(twoHalfSteps, dt / 2, this, { countStep: false });
      const error = estimateStateError(oneStep, twoHalfSteps, this.topology);
      if (error <= tolerance || dt <= minTimestep) {
        copyT3StateInto(state, twoHalfSteps);
        state.stepIndex = originalStepIndex + 1;
        this.lastAcceptedTimestep = error < tolerance / 8 ? Math.min(maxTimestep, dt * 2) : dt;
        const context = this.createContext(state, { timestep: dt, adaptiveError: error });
        this.interactionPipeline.afterStep(context);
        return {
          schema: "t3-solver-step-result.v1",
          mode: "adaptive",
          accepted: true,
          timestep: dt,
          suggestedNextTimestep: this.lastAcceptedTimestep,
          error,
          tolerance,
          time: state.time,
          stepIndex: state.stepIndex,
          attempts: attempt + 1,
        };
      }
      this.rejectedAdaptiveSteps += 1;
      dt /= 2;
      if (dt < minTimestep) {
        dt = minTimestep;
      }
    }
    throw new Error(`adaptive solver failed to reach tolerance ${tolerance} after ${maxAttempts} attempts`);
  }

  createContext(state, extra = {}) {
    return {
      schema: "t3-solver-context.v1",
      solver: this,
      state,
      topology: this.topology,
      spatialIndex: this.spatialIndex,
      config: this.config,
      ...extra,
    };
  }

  snapshot() {
    return {
      schema: "t3-action-solver-snapshot.v1",
      id: this.id,
      lastAcceptedTimestep: this.lastAcceptedTimestep,
      rejectedAdaptiveSteps: this.rejectedAdaptiveSteps,
    };
  }
}

function integrateVelocityVerletInPlace(state, dt, actionSolver, options = {}) {
  actionSolver.evaluateAccelerations(state);
  for (let index = 0; index < state.particleCount; index += 1) {
    const offset = index * 3;
    state.velocities[offset] += 0.5 * dt * state.accelerations[offset];
    state.velocities[offset + 1] += 0.5 * dt * state.accelerations[offset + 1];
    state.velocities[offset + 2] += 0.5 * dt * state.accelerations[offset + 2];
    state.positions[offset] += dt * state.velocities[offset];
    state.positions[offset + 1] += dt * state.velocities[offset + 1];
    state.positions[offset + 2] += dt * state.velocities[offset + 2];
    actionSolver.topology.wrapPositionInPlace(state.positions, index, state.imageOffsets);
  }
  state.time += dt;
  actionSolver.evaluateAccelerations(state);
  for (let index = 0; index < state.particleCount; index += 1) {
    const offset = index * 3;
    state.velocities[offset] += 0.5 * dt * state.accelerations[offset];
    state.velocities[offset + 1] += 0.5 * dt * state.accelerations[offset + 1];
    state.velocities[offset + 2] += 0.5 * dt * state.accelerations[offset + 2];
  }
  if (options.countStep !== false) {
    state.stepIndex += 1;
  }
}

function estimateStateError(oneStep, twoHalfSteps, topology) {
  let maxError = 0;
  const displacement = [0, 0, 0];
  for (let index = 0; index < oneStep.particleCount; index += 1) {
    topology.nearestImageDisplacement(oneStep.positions, index, twoHalfSteps.positions, index, displacement);
    maxError = Math.max(maxError, Math.hypot(displacement[0], displacement[1], displacement[2]));
    const offset = index * 3;
    maxError = Math.max(
      maxError,
      Math.abs(oneStep.velocities[offset] - twoHalfSteps.velocities[offset]),
      Math.abs(oneStep.velocities[offset + 1] - twoHalfSteps.velocities[offset + 1]),
      Math.abs(oneStep.velocities[offset + 2] - twoHalfSteps.velocities[offset + 2])
    );
  }
  return maxError;
}

function positiveFiniteNumber(value, fieldName) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    throw new TypeError(`${fieldName} must be positive and finite`);
  }
  return numericValue;
}

function positiveInteger(value, fieldName) {
  const numericValue = Number(value);
  if (!Number.isInteger(numericValue) || numericValue <= 0) {
    throw new TypeError(`${fieldName} must be a positive integer`);
  }
  return numericValue;
}
