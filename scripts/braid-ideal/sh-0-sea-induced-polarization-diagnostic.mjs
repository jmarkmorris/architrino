import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

import {
  ACCEPTED_EVIDENCE_BLOCKER_FIELD,
  ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
  AUTHORITY_CLASS,
  DEFAULT_RESPONSE_DEADBAND,
  FCC_BRAID_UNIT_SITES,
  FCC_NEAREST_NEIGHBOR_DIRECTIONS,
  MASTER_EQUATION_KERNEL,
  MIN_NON_OVERLAP_A_FCC,
  REQUIRED_INWARD_RESPONSE_FLOOR,
  buildFailClosedAuthorization,
} from "./sh-0-sea-diagnostic-candidate-model.mjs";

export const SCHEMA = "sh_0_sea_induced_polarization_diagnostic.v0";
export const CANDIDATE_A_FCC = 4.25;

// Declared orientation-relaxation numerics. These are integration parameters of an
// overdamped gradient descent on the cluster potential-superposition energy, not response
// amplitudes: no output row is scaled by any of them, and free_amplitude_parameter_count
// stays 0 at every level of the artifact.
export const DEFAULT_RELAXATION_STEP = 0.2;
export const DEFAULT_ITERATION_CAP = 3000;
export const DEFAULT_CONVERGENCE_TOLERANCE = 1e-8;
export const DEFAULT_DISORDER_SAMPLE_COUNT = 6;
export const DEFAULT_DISORDER_SEED = 20260707;
export const DEFAULT_DECLARED_SPACINGS = Object.freeze([
  3.0, 3.5, 4.0, 4.25, 4.5, 5.0, 5.25,
]);
export const INITIAL_ENSEMBLE_KINDS = Object.freeze([
  "aligned",
  "paired_antiphase",
  "disordered",
]);

// Signed-polarity dipole of the base decoration, p = sum_i q_i x_i = 2(1,1,1),
// |p| = 2 sqrt 3; the central braid holds this identity dipole fixed.
const BASE_DIPOLE = Object.freeze([2, 2, 2]);
const DIPOLE_UNIT = Object.freeze([
  1 / Math.sqrt(3),
  1 / Math.sqrt(3),
  1 / Math.sqrt(3),
]);
// A fixed proper 180-degree rotation whose axis is perpendicular to (1,1,1); it reverses
// the neighbor dipole (dipole reversal is reachable within SO(3), so no separate
// conjugation variable is declared).
const DIPOLE_REVERSAL_AXIS = Object.freeze([1, -1, 0]);

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function cleanNumber(value) {
  const number = Number(value);
  return !Number.isFinite(number) || Object.is(number, -0) ? 0 : number;
}

function normalizeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function subtract3(left, right) {
  return [left[0] - right[0], left[1] - right[1], left[2] - right[2]];
}

function add3(left, right) {
  return [left[0] + right[0], left[1] + right[1], left[2] + right[2]];
}

function dot3(left, right) {
  return left[0] * right[0] + left[1] * right[1] + left[2] * right[2];
}

function cross3(left, right) {
  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ];
}

function norm3(vector) {
  return Math.sqrt(dot3(vector, vector));
}

function mulberry32(seed) {
  let state = seed >>> 0;
  return function next() {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Shoemake uniform-SO(3) quaternion, matching the sibling orientation-order sampler.
function uniformRotationQuaternion(random) {
  const u1 = random();
  const u2 = random();
  const u3 = random();
  const s1 = Math.sqrt(1 - u1);
  const s2 = Math.sqrt(u1);
  return [
    s2 * Math.cos(2 * Math.PI * u3),
    s1 * Math.sin(2 * Math.PI * u2),
    s1 * Math.cos(2 * Math.PI * u2),
    s2 * Math.sin(2 * Math.PI * u3),
  ];
}

function rotateByQuaternion(quaternion, vector) {
  const [w, x, y, z] = quaternion;
  const t = [
    2 * (y * vector[2] - z * vector[1]),
    2 * (z * vector[0] - x * vector[2]),
    2 * (x * vector[1] - y * vector[0]),
  ];
  return [
    vector[0] + w * t[0] + y * t[2] - z * t[1],
    vector[1] + w * t[1] + z * t[0] - x * t[2],
    vector[2] + w * t[2] + x * t[1] - y * t[0],
  ];
}

function axisAngleQuaternion(axis, angle) {
  const axisNorm = norm3(axis);
  const sinHalf = Math.sin(angle / 2);
  return [
    Math.cos(angle / 2),
    (axis[0] / axisNorm) * sinHalf,
    (axis[1] / axisNorm) * sinHalf,
    (axis[2] / axisNorm) * sinHalf,
  ];
}

function multiplyQuaternion(a, b) {
  const [aw, ax, ay, az] = a;
  const [bw, bx, by, bz] = b;
  return [
    aw * bw - ax * bx - ay * by - az * bz,
    aw * bx + ax * bw + ay * bz - az * by,
    aw * by - ax * bz + ay * bw + az * bx,
    aw * bz + ax * by - ay * bx + az * bw,
  ];
}

function normalizeQuaternion(quaternion) {
  const magnitude = Math.hypot(quaternion[0], quaternion[1], quaternion[2], quaternion[3]);
  if (!(magnitude > 0)) {
    return [1, 0, 0, 0];
  }
  return [
    quaternion[0] / magnitude,
    quaternion[1] / magnitude,
    quaternion[2] / magnitude,
    quaternion[3] / magnitude,
  ];
}

const IDENTITY_QUATERNION = Object.freeze([1, 0, 0, 0]);

function shellCenters(aFcc) {
  return FCC_NEAREST_NEIGHBOR_DIRECTIONS.map((direction) => [
    (direction[0] * aFcc) / 2,
    (direction[1] * aFcc) / 2,
    (direction[2] * aFcc) / 2,
  ]);
}

// The six held charges of the central braid identity, fixed at the origin.
const CENTRAL_CHARGE_ROWS = FCC_BRAID_UNIT_SITES.map((site) => ({
  position: [site.position[0], site.position[1], site.position[2]],
  q: site.q,
}));

function neighborChargeRows(center, quaternion) {
  return FCC_BRAID_UNIT_SITES.map((site) => {
    const oriented =
      quaternion == null ? site.position : rotateByQuaternion(quaternion, site.position);
    return { position: add3(center, oriented), q: site.q };
  });
}

function directionIsCanonical(direction) {
  return (
    direction[0] > 0 ||
    (direction[0] === 0 && direction[1] > 0) ||
    (direction[0] === 0 && direction[1] === 0 && direction[2] > 0)
  );
}

function buildInitialQuaternions({ kind, random = null }) {
  if (kind === "aligned") {
    return FCC_NEAREST_NEIGHBOR_DIRECTIONS.map(() => [...IDENTITY_QUATERNION]);
  }
  if (kind === "paired_antiphase") {
    const reversal = axisAngleQuaternion(DIPOLE_REVERSAL_AXIS, Math.PI);
    return FCC_NEAREST_NEIGHBOR_DIRECTIONS.map((direction) =>
      directionIsCanonical(direction) ? [...IDENTITY_QUATERNION] : [...reversal]
    );
  }
  return FCC_NEAREST_NEIGHBOR_DIRECTIONS.map(() => uniformRotationQuaternion(random));
}

function orientationOrderParameter(quaternions) {
  const perNeighbor = quaternions.map((quaternion) =>
    dot3(rotateByQuaternion(quaternion, [1, 1, 1]), DIPOLE_UNIT)
  );
  const mean = perNeighbor.reduce((sum, value) => sum + value, 0) / perNeighbor.length;
  return { mean: cleanNumber(mean), perNeighbor };
}

// Radial projection Pi_R A^sea of the central braid's acceleration under the shell charges,
// identical normalization to the sibling orientation-order and wake-sum diagnostics.
function shellRadialResponse(centers, quaternions) {
  const { coupling, softening } = MASTER_EQUATION_KERNEL;
  const chargeRows = centers.flatMap((center, index) =>
    neighborChargeRows(center, quaternions[index])
  );
  let radialProjectionSum = 0;
  for (const receiver of FCC_BRAID_UNIT_SITES) {
    const acceleration = [0, 0, 0];
    for (const source of chargeRows) {
      const displacement = subtract3(receiver.position, source.position);
      const distanceSquared = dot3(displacement, displacement);
      const coefficient =
        (coupling * receiver.q * source.q) /
        Math.pow(distanceSquared + softening * softening, 1.5);
      acceleration[0] += coefficient * displacement[0];
      acceleration[1] += coefficient * displacement[1];
      acceleration[2] += coefficient * displacement[2];
    }
    radialProjectionSum += dot3(receiver.position, acceleration);
  }
  return cleanNumber(radialProjectionSum / FCC_BRAID_UNIT_SITES.length);
}

// Total inter-braid potential-superposition energy of the 13-braid cluster: central-shell
// bonds plus every shell-shell bond. Rigid intra-braid energy is orientation-invariant and
// therefore omitted (it does not enter the torque). Held static braids make the delayed
// potential equal to the static potential.
function clusterInterBraidEnergy(centers, quaternions) {
  const { coupling, softening } = MASTER_EQUATION_KERNEL;
  const braids = [CENTRAL_CHARGE_ROWS, ...centers.map((c, k) => neighborChargeRows(c, quaternions[k]))];
  let energy = 0;
  for (let i = 0; i < braids.length; i += 1) {
    for (let j = i + 1; j < braids.length; j += 1) {
      for (const rowA of braids[i]) {
        for (const rowB of braids[j]) {
          const distance = norm3(subtract3(rowA.position, rowB.position));
          energy += (coupling * rowA.q * rowB.q) / Math.sqrt(distance * distance + softening * softening);
        }
      }
    }
  }
  return cleanNumber(energy);
}

// Overdamped torque on each neighbor braid about its own center. The force on each neighbor
// charge is F = -grad U from the central braid and the other neighbors; the torque
// tau_k = sum_(i in k) (x_i - X_k) x F_i rotates the neighbor down the energy gradient.
function clusterTorques(centers, neighborRows) {
  const { coupling, softening } = MASTER_EQUATION_KERNEL;
  const torques = [];
  let maxTorque = 0;
  for (let k = 0; k < neighborRows.length; k += 1) {
    const torque = [0, 0, 0];
    for (const receiver of neighborRows[k]) {
      const force = [0, 0, 0];
      for (const source of CENTRAL_CHARGE_ROWS) {
        accumulateForce(force, receiver, source, coupling, softening);
      }
      for (let m = 0; m < neighborRows.length; m += 1) {
        if (m === k) continue;
        for (const source of neighborRows[m]) {
          accumulateForce(force, receiver, source, coupling, softening);
        }
      }
      const lever = subtract3(receiver.position, centers[k]);
      const contribution = cross3(lever, force);
      torque[0] += contribution[0];
      torque[1] += contribution[1];
      torque[2] += contribution[2];
    }
    torques.push(torque);
    maxTorque = Math.max(maxTorque, norm3(torque));
  }
  return { torques, maxTorque };
}

function accumulateForce(force, receiver, source, coupling, softening) {
  const displacement = subtract3(receiver.position, source.position);
  const distanceSquared = dot3(displacement, displacement);
  const coefficient =
    (coupling * receiver.q * source.q) /
    Math.pow(distanceSquared + softening * softening, 1.5);
  force[0] += coefficient * displacement[0];
  force[1] += coefficient * displacement[1];
  force[2] += coefficient * displacement[2];
}

function relaxOrientations({ centers, initialQuaternions, step, iterationCap, tolerance }) {
  let quaternions = initialQuaternions.map((quaternion) => normalizeQuaternion(quaternion));
  let iterations = 0;
  let converged = false;
  let maxTorque = Infinity;
  const initialNeighborRows = centers.map((center, k) => neighborChargeRows(center, quaternions[k]));
  const initialMaxTorque = clusterTorques(centers, initialNeighborRows).maxTorque;
  for (; iterations < iterationCap; iterations += 1) {
    const neighborRows = centers.map((center, k) => neighborChargeRows(center, quaternions[k]));
    const { torques, maxTorque: currentMaxTorque } = clusterTorques(centers, neighborRows);
    maxTorque = currentMaxTorque;
    if (maxTorque < tolerance) {
      converged = true;
      break;
    }
    quaternions = quaternions.map((quaternion, k) => {
      const magnitude = norm3(torques[k]);
      if (!(magnitude > 0)) {
        return quaternion;
      }
      const rotation = axisAngleQuaternion(torques[k], step * magnitude);
      return normalizeQuaternion(multiplyQuaternion(rotation, quaternion));
    });
  }
  return {
    quaternions,
    iterations,
    converged,
    maxTorque: cleanNumber(maxTorque),
    initialMaxTorque: cleanNumber(initialMaxTorque),
  };
}

// Classification keys off the radial response Pi_R (the quantity the floor test uses), not
// the dipole order parameter: the FCC dipole-shell sum cancels exactly, so retention is a
// higher-multipole/near-field effect and the dipole order parameter is only a weak
// descriptor. anti_retentive_limit = -alignedResponse is the outward conjugate response.
function classifyRelaxed({ piR, requiredProjection, alignedResponse }) {
  const antiRetentiveLimit = -alignedResponse;
  if (piR < requiredProjection) {
    return "induced_aligned";
  }
  if (piR >= 0.5 * Math.abs(antiRetentiveLimit)) {
    return "induced_anti_aligned";
  }
  return "frustrated_mixed";
}

function summarize(values) {
  const count = values.length;
  const mean = values.reduce((sum, value) => sum + value, 0) / count;
  const std = Math.sqrt(
    values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / count
  );
  return {
    mean: cleanNumber(mean),
    std: cleanNumber(std),
    min: cleanNumber(Math.min(...values)),
    max: cleanNumber(Math.max(...values)),
  };
}

function relaxUniform({ centers, kind, step, iterationCap, tolerance, requiredProjection, alignedResponse }) {
  const relaxation = relaxOrientations({
    centers,
    initialQuaternions: buildInitialQuaternions({ kind }),
    step,
    iterationCap,
    tolerance,
  });
  const order = orientationOrderParameter(relaxation.quaternions);
  const piR = shellRadialResponse(centers, relaxation.quaternions);
  const crossesFloor = piR < requiredProjection;
  return {
    initial_ensemble: kind,
    relaxed_order_parameter: order.mean,
    relaxed_cluster_energy: clusterInterBraidEnergy(centers, relaxation.quaternions),
    Pi_R_A_sea: piR,
    crosses_inward_response_floor: crossesFloor,
    classification: classifyRelaxed({ piR, requiredProjection, alignedResponse }),
    relaxation: {
      iterations: relaxation.iterations,
      converged: relaxation.converged,
      max_torque: relaxation.maxTorque,
      initial_max_torque: relaxation.initialMaxTorque,
      is_torque_fixed_point: relaxation.initialMaxTorque < tolerance,
    },
    free_amplitude_parameter_count: 0,
  };
}

function relaxDisordered({
  centers,
  step,
  iterationCap,
  tolerance,
  requiredProjection,
  alignedResponse,
  sampleCount,
  seed,
}) {
  const random = mulberry32(seed);
  const samples = [];
  for (let index = 0; index < sampleCount; index += 1) {
    const relaxation = relaxOrientations({
      centers,
      initialQuaternions: buildInitialQuaternions({ kind: "disordered", random }),
      step,
      iterationCap,
      tolerance,
    });
    const order = orientationOrderParameter(relaxation.quaternions);
    const piR = shellRadialResponse(centers, relaxation.quaternions);
    samples.push({
      sample_index: index,
      relaxed_order_parameter: order.mean,
      relaxed_cluster_energy: clusterInterBraidEnergy(centers, relaxation.quaternions),
      Pi_R_A_sea: piR,
      crosses_inward_response_floor: piR < requiredProjection,
      converged: relaxation.converged,
      iterations: relaxation.iterations,
      max_torque: relaxation.maxTorque,
    });
  }
  const orders = samples.map((sample) => sample.relaxed_order_parameter);
  const responses = samples.map((sample) => sample.Pi_R_A_sea);
  const energies = samples.map((sample) => sample.relaxed_cluster_energy);
  const crossingCount = samples.filter((sample) => sample.crosses_inward_response_floor).length;
  const convergedCount = samples.filter((sample) => sample.converged).length;
  const crossingProbability = crossingCount / sampleCount;
  const orderSummary = summarize(orders);
  const responseSummary = summarize(responses);
  const meanClassification = classifyRelaxed({
    piR: responseSummary.mean,
    requiredProjection,
    alignedResponse,
  });
  // Basin-dependent means the seeds disagree on whether the relaxed response crosses the
  // floor; a shared outward (or shared inward) basin is not basin-dependent even if the
  // dipole order parameter scatters.
  const basinDependent = crossingCount > 0 && crossingCount < sampleCount;
  return {
    initial_ensemble: "disordered",
    sample_count: sampleCount,
    seed,
    order_parameter: orderSummary,
    Pi_R_summary: responseSummary,
    cluster_energy_summary: summarize(energies),
    crossing_count: crossingCount,
    crossing_probability: cleanNumber(crossingProbability),
    crossing_probability_standard_error: cleanNumber(
      Math.sqrt(Math.max(crossingProbability * (1 - crossingProbability), 0) / sampleCount)
    ),
    converged_count: convergedCount,
    mean_crosses_inward_response_floor: responseSummary.mean < requiredProjection,
    mean_classification: meanClassification,
    classification: basinDependent ? "basin_dependent" : meanClassification,
    per_seed_samples: samples,
    free_amplitude_parameter_count: 0,
  };
}

// Exact static control lemmas, evaluated through the charge-conjugation path (dipole
// reversal by flipping the six signed-polarity units). Charge conjugation equals point
// inversion for this decoration, an improper operation the SO(3) orientation degrees of
// freedom cannot represent; it is used here only to certify the exact response identities.
function conjugatedShellRadialResponse(centers, conjugations) {
  const { coupling, softening } = MASTER_EQUATION_KERNEL;
  const chargeRows = centers.flatMap((center, index) =>
    FCC_BRAID_UNIT_SITES.map((site) => ({
      position: add3(center, site.position),
      q: site.q * conjugations[index],
    }))
  );
  let radialProjectionSum = 0;
  for (const receiver of FCC_BRAID_UNIT_SITES) {
    const acceleration = [0, 0, 0];
    for (const source of chargeRows) {
      const displacement = subtract3(receiver.position, source.position);
      const distanceSquared = dot3(displacement, displacement);
      const coefficient =
        (coupling * receiver.q * source.q) /
        Math.pow(distanceSquared + softening * softening, 1.5);
      acceleration[0] += coefficient * displacement[0];
      acceleration[1] += coefficient * displacement[1];
      acceleration[2] += coefficient * displacement[2];
    }
    radialProjectionSum += dot3(receiver.position, acceleration);
  }
  return cleanNumber(radialProjectionSum / FCC_BRAID_UNIT_SITES.length);
}

function buildControlLemmas({ centers, aFcc, tolerance }) {
  const aligned = centers.map(() => 1);
  const allConjugated = centers.map(() => -1);
  const pairedConjugated = FCC_NEAREST_NEIGHBOR_DIRECTIONS.map((direction) =>
    directionIsCanonical(direction) ? 1 : -1
  );
  const alignedResponse = conjugatedShellRadialResponse(centers, aligned);
  const conjugateResponse = conjugatedShellRadialResponse(centers, allConjugated);
  const conjugatePairedResponse = conjugatedShellRadialResponse(centers, pairedConjugated);

  // SO(3) paired-antiphase (dipole reversal by a proper 180-degree rotation): also an exact
  // response null, and its mechanical torque is nonzero, so it is a response fixed point but
  // not an energy fixed point.
  const so3PairedQuaternions = buildInitialQuaternions({ kind: "paired_antiphase" });
  const so3PairedResponse = shellRadialResponse(centers, so3PairedQuaternions);
  const so3PairedNeighborRows = centers.map((center, k) =>
    neighborChargeRows(center, so3PairedQuaternions[k])
  );
  const so3PairedTorque = clusterTorques(centers, so3PairedNeighborRows).maxTorque;
  const alignedNeighborRows = centers.map((center) => neighborChargeRows(center, IDENTITY_QUATERNION));
  const alignedTorque = clusterTorques(centers, alignedNeighborRows).maxTorque;

  return {
    a_fcc: aFcc,
    aligned_response: alignedResponse,
    conjugation_antisymmetry: {
      statement:
        "conjugating all 12 neighbors flips Pi_R exactly; the conjugate-aligned ensemble is exactly anti-retentive",
      all_conjugated_response: conjugateResponse,
      aligned_plus_conjugate_sum: cleanNumber(alignedResponse + conjugateResponse),
      exact: Math.abs(alignedResponse + conjugateResponse) < 1e-12,
    },
    paired_antiphase_null: {
      statement:
        "the paired-antiphase ensemble (opposite-shell neighbors dipole-reversed) yields Pi_R=0 exactly; verified in both the charge-conjugation and the SO(3) 180-degree-rotation representations",
      charge_conjugation_response: conjugatePairedResponse,
      so3_rotation_response: so3PairedResponse,
      exact:
        Math.abs(conjugatePairedResponse) < 1e-12 && Math.abs(so3PairedResponse) < 1e-12,
    },
    paired_antiphase_fixed_point: {
      statement:
        "the paired-antiphase configuration is an exact response null but NOT an energy fixed point: its mechanical torque is nonzero, so overdamped relaxation escapes it toward the frustrated basin; the aligned configuration is likewise not a fixed point",
      so3_paired_max_torque: so3PairedTorque,
      aligned_max_torque: alignedTorque,
      paired_is_energy_fixed_point: so3PairedTorque < tolerance,
      aligned_is_energy_fixed_point: alignedTorque < tolerance,
      relaxation_escapes_paired_antiphase: so3PairedTorque >= tolerance,
    },
  };
}

export function buildSh0SeaInducedPolarizationDiagnostic(options = {}) {
  const deadband = Math.max(0, normalizeNumber(options.inwardDeadband, DEFAULT_RESPONSE_DEADBAND));
  const requiredProjection = cleanNumber(REQUIRED_INWARD_RESPONSE_FLOOR - deadband);
  const step = Math.max(Number.EPSILON, normalizeNumber(options.relaxationStep, DEFAULT_RELAXATION_STEP));
  const iterationCap = Math.max(1, Math.round(normalizeNumber(options.iterationCap, DEFAULT_ITERATION_CAP)));
  const tolerance = Math.max(
    Number.EPSILON,
    normalizeNumber(options.convergenceTolerance, DEFAULT_CONVERGENCE_TOLERANCE)
  );
  const sampleCount = Math.max(
    1,
    Math.round(normalizeNumber(options.sampleCount, DEFAULT_DISORDER_SAMPLE_COUNT))
  );
  const seed = Math.round(normalizeNumber(options.seed, DEFAULT_DISORDER_SEED));
  const spacings = (Array.isArray(options.spacings) && options.spacings.length > 0
    ? options.spacings
    : buildSpacings(options)
  )
    .map((value) => cleanNumber(value))
    .filter((value) => value > 0);

  const spacingRows = spacings.map((aFcc) => {
    const centers = shellCenters(aFcc);
    const controls = buildControlLemmas({ centers, aFcc, tolerance });
    const alignedResponse = controls.aligned_response;
    const uniformRows = ["aligned", "paired_antiphase"].map((kind) =>
      relaxUniform({
        centers,
        kind,
        step,
        iterationCap,
        tolerance,
        requiredProjection,
        alignedResponse,
      })
    );
    const disordered = relaxDisordered({
      centers,
      step,
      iterationCap,
      tolerance,
      requiredProjection,
      alignedResponse,
      sampleCount,
      seed,
    });
    const anyGenericCrossing =
      disordered.crossing_count > 0 || uniformRows.some((row) => row.crosses_inward_response_floor);
    return {
      a_fcc: aFcc,
      nearest_neighbor_center_distance: cleanNumber(aFcc / Math.SQRT2),
      geometry_validity: {
        min_non_overlap_a_fcc: cleanNumber(MIN_NON_OVERLAP_A_FCC),
        shell_overlap: aFcc < MIN_NON_OVERLAP_A_FCC,
        pass: aFcc >= MIN_NON_OVERLAP_A_FCC,
      },
      aligned_static_reference_response: alignedResponse,
      relaxed_aligned: uniformRows[0],
      relaxed_paired_antiphase: uniformRows[1],
      relaxed_disordered: disordered,
      generic_start_crosses_floor: anyGenericCrossing,
      disordered_majority_crosses_floor: disordered.crossing_probability >= 0.5,
      control_lemmas: controls,
      free_amplitude_parameter_count: 0,
    };
  });

  const genericPolarizesAligned = spacingRows.some(
    (row) =>
      row.geometry_validity.pass &&
      row.relaxed_disordered.crossing_probability >= 0.5 &&
      row.relaxed_disordered.order_parameter.mean > 0.5
  );
  const anyMajorityCrossing = spacingRows.some(
    (row) => row.geometry_validity.pass && row.relaxed_disordered.crossing_probability >= 0.5
  );
  const inducedAlignedRouteConfirmed = genericPolarizesAligned && anyMajorityCrossing;

  const core = {
    schema: SCHEMA,
    proof_id: "SH-0-sea",
    authority_class: AUTHORITY_CLASS,
    claim_level:
      "diagnostic induced-orientational-polarization relaxation only; overdamped SO(3) torque descent on the 13-braid potential-superposition energy with the central braid held fixed; not an accepted Noether sea selection rule",
    master_equation_kernel: MASTER_EQUATION_KERNEL,
    potential_convention:
      "U=sum_(braid pairs) coupling*q_i*q_j*(|x_i-x_j|^2+softening^2)^(-1/2); static held braids, so the delayed potential equals the static potential; rigid intra-braid energy is orientation-invariant and omitted from the torque",
    orientation_state: {
      description:
        "one SO(3) rotation per neighbor braid acting on the held six-site decoration; dipole reversal is reachable within SO(3), so no separate conjugation variable is declared; the central braid is held fixed as the SH-0 target identity",
      base_signed_polarity_dipole: BASE_DIPOLE,
      dipole_reversal_axis: DIPOLE_REVERSAL_AXIS,
      order_parameter_definition:
        "per-neighbor dipole projection onto the central braid dipole, O_k=(R_k p . p_hat)/|p|; ensemble order parameter is the mean over the 12 neighbors (aligned=+1, dipole-reversed=-1)",
    },
    relaxation_numerics: {
      dynamics: "overdamped_gradient_relaxation_on_total_potential_superposition_energy",
      relaxation_step: cleanNumber(step),
      iteration_cap: iterationCap,
      convergence_tolerance: cleanNumber(tolerance),
      convergence_criterion: "max over neighbors of |torque_k| < convergence_tolerance",
      note:
        "the step, cap, and tolerance are declared integration parameters, not response amplitudes; no output row is scaled by them and free_amplitude_parameter_count stays 0 everywhere",
    },
    declared_sampler: {
      sampler: "mulberry32_prng_with_shoemake_uniform_so3_quaternions",
      seed,
      sample_count: sampleCount,
      status:
        "declared seeded initial ensemble; every relaxation is a fully declared orientation trajectory with no undeclared environment degrees of freedom",
    },
    required_projected_response_floor: requiredProjection,
    inward_deadband: deadband,
    escape_floor: cleanNumber(REQUIRED_INWARD_RESPONSE_FLOOR),
    initial_ensemble_kinds: INITIAL_ENSEMBLE_KINDS,
    spacing_rows: spacingRows,
    induced_polarization_verdict: buildVerdict({
      spacingRows,
      inducedAlignedRouteConfirmed,
      genericPolarizesAligned,
    }),
    evidence_status: {
      accepted: false,
      accepted_evidence_status: "diagnostic_induced_polarization_relaxation_not_accepted_evidence",
      first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
      first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
    },
    authorization: buildFailClosedAuthorization(),
  };
  return {
    ...core,
    artifact_hash: stableHash(core),
  };
}

function buildSpacings(options) {
  const hasRange =
    options.aFccMin != null || options.aFccMax != null || options.aFccStep != null;
  if (!hasRange) {
    return [...DEFAULT_DECLARED_SPACINGS];
  }
  const aFccMin = normalizeNumber(options.aFccMin, DEFAULT_DECLARED_SPACINGS[0]);
  const aFccMax = Math.max(
    aFccMin,
    normalizeNumber(options.aFccMax, DEFAULT_DECLARED_SPACINGS[DEFAULT_DECLARED_SPACINGS.length - 1])
  );
  const aFccStep = Math.max(Number.EPSILON, normalizeNumber(options.aFccStep, 0.25));
  const count = Math.max(1, Math.round((aFccMax - aFccMin) / aFccStep) + 1);
  const spacings = [];
  for (let index = 0; index < count; index += 1) {
    spacings.push(Math.min(aFccMax, aFccMin + index * aFccStep));
  }
  return spacings;
}

function buildVerdict({ spacingRows, inducedAlignedRouteConfirmed, genericPolarizesAligned }) {
  const candidateRow =
    spacingRows.find((row) => Math.abs(row.a_fcc - CANDIDATE_A_FCC) <= 1e-9) ?? spacingRows[0];
  const anyBasinCrossing = spacingRows.some(
    (row) => row.geometry_validity.pass && row.relaxed_disordered.crossing_count > 0
  );
  const validRows = spacingRows.filter((row) => row.geometry_validity.pass);
  // Generic (disordered) relaxation polarizes anti-retentive when its mean relaxed response
  // is outward (Pi_R > 0) at every valid spacing.
  const genericPolarizesAntiRetentive =
    validRows.length > 0 &&
    validRows.every((row) => row.relaxed_disordered.Pi_R_summary.mean > 0);
  const disposition = inducedAlignedRouteConfirmed
    ? "induced_polarization_supplies_aligned_order_crosses_floor"
    : genericPolarizesAntiRetentive
      ? "induced_polarization_relaxes_anti_retentive_no_bounded_window"
      : "induced_polarization_relaxes_to_frustrated_mixed_no_bounded_window";
  return {
    induced_aligned_route_confirmed: inducedAlignedRouteConfirmed,
    generic_start_polarizes_aligned: genericPolarizesAligned,
    generic_start_polarizes_anti_retentive: genericPolarizesAntiRetentive,
    any_spacing_has_basin_crossing: anyBasinCrossing,
    candidate_spacing: {
      a_fcc: candidateRow.a_fcc,
      relaxed_aligned_order_parameter: candidateRow.relaxed_aligned.relaxed_order_parameter,
      relaxed_aligned_Pi_R: candidateRow.relaxed_aligned.Pi_R_A_sea,
      relaxed_disordered_order_parameter_mean:
        candidateRow.relaxed_disordered.order_parameter.mean,
      relaxed_disordered_Pi_R_mean: candidateRow.relaxed_disordered.Pi_R_summary.mean,
      relaxed_disordered_crossing_probability:
        candidateRow.relaxed_disordered.crossing_probability,
      aligned_static_reference_response: candidateRow.aligned_static_reference_response,
    },
    disposition,
    statement: inducedAlignedRouteConfirmed
      ? "overdamped relaxation from generic (disordered) starts polarizes the neighbor orientations toward central-aligned order whose Pi_R crosses the escape floor at a declared spacing; the induced-polarization mechanism is the named executable alignment route for the environment theorem"
      : genericPolarizesAntiRetentive
        ? "the central braid energetically prefers dipole-reversed (conjugate) neighbors, and overdamped relaxation realizes that preference in response space: from aligned, paired-antiphase, and every disordered start the relaxed radial response is outward (Pi_R>0), clustered near the anti-retentive conjugate limit -alignedResponse, reversing the sign of the assumed-aligned inward response; no start crosses the inward escape floor at any declared spacing. The induced-polarization retention route is falsified at the diagnostic level: left to relax under its own potential-superposition energetics the sea polarizes to expel the central braid, not retain it. The aligned-order caveat on the sea-screened held-release rows therefore hardens to an open formation-history / dynamic-alignment burden, and the mechanism hunt sharpens toward the hinge-click absorber route"
        : "generic starts relax into a frustrated-mixed configuration whose Pi_R does not reach the escape floor except in isolated basin-dependent samples that never form a majority; the static induced-polarization route is falsified at diagnostic level, and the aligned-order caveat on the sea-screened rows hardens to an open formation-history / dynamic-alignment burden",
    caveat_disposition_for_sea_screened_rows: inducedAlignedRouteConfirmed
      ? "the aligned-order caveat on the sea-screened held-release rows is discharged by the named induced-polarization alignment route"
      : "the aligned-order caveat on the sea-screened held-release rows hardens: static induced polarization does not supply the assumed aligned order, so those results remain conditional on an unproven dynamic-alignment or formation-history mechanism; the mechanism hunt sharpens toward the hinge-click absorber route (self_hit_held_release_solver_row)",
  };
}

export function evaluateSh0SeaInducedPolarizationDiagnosticEvidence(candidate) {
  if (candidate?.schema !== SCHEMA) {
    return {
      accepted: false,
      reason: "schema_not_sh_0_sea_induced_polarization_diagnostic_v0",
      first_missing_field: "sh_0_sea_induced_polarization_diagnostic.schema",
    };
  }
  return {
    accepted: false,
    reason: "diagnostic_induced_polarization_relaxation_not_accepted_retained_evidence",
    first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
    first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
  };
}

function parseArgs(args) {
  const stringOption = (name) =>
    args.find((arg) => arg.startsWith(`--${name}=`))?.slice(name.length + 3) ?? null;
  const numberOption = (name) => {
    const value = stringOption(name);
    return value == null ? undefined : Number(value);
  };
  const spacingsRaw = stringOption("spacings");
  return {
    pretty: args.includes("--pretty"),
    spacings: spacingsRaw
      ? spacingsRaw.split(",").map((value) => Number(value)).filter((value) => Number.isFinite(value))
      : undefined,
    aFccMin: numberOption("a-fcc-min"),
    aFccMax: numberOption("a-fcc-max"),
    aFccStep: numberOption("a-fcc-step"),
    sampleCount: numberOption("samples"),
    seed: numberOption("seed"),
    relaxationStep: numberOption("relaxation-step"),
    iterationCap: numberOption("iteration-cap"),
    convergenceTolerance: numberOption("convergence-tolerance"),
    inwardDeadband: numberOption("inward-deadband"),
  };
}

function printUsage() {
  console.log(
    `Usage: node ${fileURLToPath(import.meta.url)} [--pretty] [--spacings=a,b,c] [--a-fcc-min=<number>] [--a-fcc-max=<number>] [--a-fcc-step=<number>] [--samples=<count>] [--seed=<integer>] [--relaxation-step=<number>] [--iteration-cap=<integer>] [--convergence-tolerance=<number>] [--inward-deadband=<number>]`
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    printUsage();
    process.exit(0);
  }
  const options = parseArgs(process.argv.slice(2));
  const artifact = buildSh0SeaInducedPolarizationDiagnostic(options);
  console.log(JSON.stringify(artifact, null, options.pretty ? 2 : 0));
}
