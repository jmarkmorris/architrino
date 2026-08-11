#!/usr/bin/env node

// Non-evidence toy integrator for the antipodal one-partner-root binary.
//
// Each step:
//   1. predicts the state at the middle of a fixed angular arc;
//   2. evaluates the canonical circular one-root acceleration there;
//   3. applies the radial-velocity and forward-velocity accelerations as
//      scalar increments over the arc with a midpoint update.
//
// This is deliberately not the EOM solver. It discards the evolved delayed
// history after reducing each midpoint to a local circular chart. In
// particular, the operator-prescribed scalar forward-speed update intentionally
// omits the polar-vector basis term -v_r v_t / r.

import fs from "node:fs";

const KILOMETRES_PER_KILOPARSEC = 3.0856775814913673e16;
const SECONDS_PER_JULIAN_YEAR = 31557600;

function option(name, fallback) {
  const prefix = `--${name}=`;
  const argument = process.argv.slice(2).find((value) =>
    value.startsWith(prefix));
  return argument === undefined ? fallback : argument.slice(prefix.length);
}

function numberOption(name, fallback) {
  const value = Number(option(name, fallback));
  if (!Number.isFinite(value)) {
    throw new Error(`--${name} must be finite`);
  }
  return value;
}

function integerOption(name, fallback) {
  const value = numberOption(name, fallback);
  if (!Number.isSafeInteger(value)) {
    throw new Error(`--${name} must be a safe integer`);
  }
  return value;
}

function partnerRootXi(beta) {
  if (!(beta >= 0 && beta < 1)) {
    throw new Error(`circular one-root beta must lie in [0, 1): ${beta}`);
  }
  let lower = 0;
  let upper = Math.PI / 2;
  for (let iteration = 0; iteration < 100; iteration += 1) {
    const middle = 0.5 * (lower + upper);
    if (middle - beta * Math.cos(middle) < 0) {
      lower = middle;
    } else {
      upper = middle;
    }
  }
  return 0.5 * (lower + upper);
}

function circularCoefficients(beta) {
  const xi = partnerRootXi(beta);
  const cosine = Math.cos(xi);
  const jacobian = 1 + beta * Math.sin(xi);
  return {
    xi,
    radial: 1 / (4 * cosine * jacobian),
    tangential:
      Math.sin(xi) / (4 * cosine * cosine * jacobian),
  };
}

function derivatives(state, coupling) {
  const beta = Math.abs(state.tangentialVelocity);
  const coefficients = circularCoefficients(beta);
  const wakeRadialAcceleration =
    -coupling * coefficients.radial / (state.radius * state.radius);
  const wakeTangentialAcceleration =
    coupling * coefficients.tangential / (state.radius * state.radius);
  return {
    radius: state.radialVelocity,
    radialVelocity:
      state.tangentialVelocity * state.tangentialVelocity / state.radius +
      wakeRadialAcceleration,
    tangentialVelocity: wakeTangentialAcceleration,
    wakeRadialAcceleration,
    wakeTangentialAcceleration,
    coefficients,
  };
}

function advanceOneArc(state, coupling, angleStep) {
  const start = derivatives(state, coupling);
  const firstTimeStep =
    state.radius * angleStep / state.tangentialVelocity;
  const midpointGuess = {
    radius: state.radius + 0.5 * firstTimeStep * start.radius,
    radialVelocity:
      state.radialVelocity + 0.5 * firstTimeStep * start.radialVelocity,
    tangentialVelocity:
      state.tangentialVelocity +
      0.5 * firstTimeStep * start.tangentialVelocity,
  };
  const timeStep =
    midpointGuess.radius * angleStep /
    midpointGuess.tangentialVelocity;
  const midpoint = {
    radius: state.radius + 0.5 * timeStep * start.radius,
    radialVelocity:
      state.radialVelocity + 0.5 * timeStep * start.radialVelocity,
    tangentialVelocity:
      state.tangentialVelocity +
      0.5 * timeStep * start.tangentialVelocity,
  };
  const middle = derivatives(midpoint, coupling);
  return {
    state: {
      angle: state.angle + angleStep,
      time: state.time + timeStep,
      radius: state.radius + timeStep * middle.radius,
      radialVelocity:
        state.radialVelocity + timeStep * middle.radialVelocity,
      tangentialVelocity:
        state.tangentialVelocity + timeStep * middle.tangentialVelocity,
    },
    midpoint,
    middle,
    timeStep,
  };
}

function totalSpeed(state) {
  return Math.hypot(state.radialVelocity, state.tangentialVelocity);
}

function interpolate(left, right, fraction) {
  return left + fraction * (right - left);
}

function physicalRow(state, options, diagnostic) {
  const yearsPerSolverTime =
    options.radiusKpc * KILOMETRES_PER_KILOPARSEC /
    options.fieldSpeedKmS / SECONDS_PER_JULIAN_YEAR;
  return {
    arc: state.arc,
    angleDegrees: state.angle * 180 / Math.PI,
    revolutions: state.angle / (2 * Math.PI),
    solverTime: state.time,
    elapsedYears: state.time * yearsPerSolverTime,
    radiusKpc: state.radius * options.radiusKpc,
    totalSpeedKmS: totalSpeed(state) * options.fieldSpeedKmS,
    radialVelocityKmS:
      state.radialVelocity * options.fieldSpeedKmS,
    tangentialVelocityKmS:
      state.tangentialVelocity * options.fieldSpeedKmS,
    wakeRadialAcceleration:
      diagnostic?.wakeRadialAcceleration ?? Number.NaN,
    wakeTangentialAcceleration:
      diagnostic?.wakeTangentialAcceleration ?? Number.NaN,
    radialVelocityAcceleration:
      diagnostic?.radialVelocity ?? Number.NaN,
    forwardVelocityAcceleration:
      diagnostic?.tangentialVelocity ?? Number.NaN,
  };
}

function csvLine(row) {
  return [
    row.arc,
    row.angleDegrees,
    row.revolutions,
    row.solverTime,
    row.elapsedYears,
    row.radiusKpc,
    row.totalSpeedKmS,
    row.radialVelocityKmS,
    row.tangentialVelocityKmS,
    row.wakeRadialAcceleration,
    row.wakeTangentialAcceleration,
    row.radialVelocityAcceleration,
    row.forwardVelocityAcceleration,
  ].join(",");
}

function main() {
  const options = {
    radiusKpc: numberOption("radius-kpc", 2),
    initialSpeedKmS: numberOption("initial-speed-km-s", 100),
    targetSpeedKmS: numberOption("target-speed-km-s", 170),
    fieldSpeedKmS: numberOption("field-speed-km-s", 299792.458),
    angleStepDegrees: numberOption("angle-step-deg", 1),
    maxArcs: integerOption("max-arcs", 1000000),
    sampleEvery: integerOption("sample-every", 360),
    output: option("output", ""),
  };
  if (!(options.radiusKpc > 0) ||
      !(options.initialSpeedKmS > 0) ||
      !(options.targetSpeedKmS > options.initialSpeedKmS) ||
      !(options.targetSpeedKmS < options.fieldSpeedKmS) ||
      !(options.angleStepDegrees > 0) ||
      options.maxArcs < 1 || options.sampleEvery < 1) {
    throw new Error("invalid toy-solver domain");
  }

  const initialBeta =
    options.initialSpeedKmS / options.fieldSpeedKmS;
  const targetBeta =
    options.targetSpeedKmS / options.fieldSpeedKmS;
  const initialCoefficients = circularCoefficients(initialBeta);
  const coupling =
    initialBeta * initialBeta / initialCoefficients.radial;
  const angleStep = options.angleStepDegrees * Math.PI / 180;
  let state = {
    arc: 0,
    angle: 0,
    time: 0,
    radius: 1,
    radialVelocity: 0,
    tangentialVelocity: initialBeta,
  };

  const rows = [];
  rows.push(physicalRow(state, options));
  let crossing = null;
  let status = "max_arcs_reached";
  for (let arc = 1; arc <= options.maxArcs; arc += 1) {
    const previous = state;
    const advanced = advanceOneArc(state, coupling, angleStep);
    state = {...advanced.state, arc};
    if (!(state.radius > 0) ||
        !Number.isFinite(state.radius) ||
        !Number.isFinite(totalSpeed(state))) {
      status = "invalid_state";
      break;
    }
    if (state.tangentialVelocity <= 0 ||
        Math.abs(state.tangentialVelocity) >= 1) {
      status = "left_one_root_circular_chart";
      break;
    }

    const previousSpeed = totalSpeed(previous);
    const currentSpeed = totalSpeed(state);
    if (previousSpeed < targetBeta && currentSpeed >= targetBeta) {
      const fraction =
        (targetBeta - previousSpeed) / (currentSpeed - previousSpeed);
      const estimated = {
        arc: previous.arc + fraction,
        angle: interpolate(previous.angle, state.angle, fraction),
        time: interpolate(previous.time, state.time, fraction),
        radius: interpolate(previous.radius, state.radius, fraction),
        radialVelocity: interpolate(
            previous.radialVelocity, state.radialVelocity, fraction),
        tangentialVelocity: interpolate(
            previous.tangentialVelocity,
            state.tangentialVelocity,
            fraction),
      };
      crossing = physicalRow(estimated, options, advanced.middle);
      status = "target_reached";
    }

    if (arc % options.sampleEvery === 0 || crossing !== null ||
        arc === options.maxArcs) {
      rows.push(physicalRow(state, options, advanced.middle));
    }
    if (crossing !== null) break;
  }

  if (options.output !== "") {
    const header = [
      "arc",
      "angle_degrees",
      "revolutions",
      "solver_time",
      "elapsed_years",
      "radius_kpc",
      "total_speed_km_s",
      "radial_velocity_km_s",
      "tangential_velocity_km_s",
      "midpoint_wake_radial_acceleration",
      "midpoint_wake_tangential_acceleration",
      "midpoint_radial_velocity_acceleration",
      "midpoint_forward_velocity_acceleration",
    ].join(",");
    fs.writeFileSync(
        options.output,
        `${header}\n${rows.map(csvLine).join("\n")}\n`);
  }

  console.log(JSON.stringify({
    schema: "antipodal_binary_arc_toy/v2",
    status,
    evidenceGrade: "non-evidence toy midpoint circular closure",
    angleStepDegrees: options.angleStepDegrees,
    coupling,
    initialPartnerPhase: 2 * initialCoefficients.xi,
    final: physicalRow(state, options),
    crossing,
  }, null, 2));
}

try {
  main();
} catch (error) {
  console.error(`antipodal-binary-arc-toy error: ${error.message}`);
  process.exitCode = 1;
}
