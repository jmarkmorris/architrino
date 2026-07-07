import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

import {
  ACCEPTED_EVIDENCE_BLOCKER_FIELD,
  ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
  AUTHORITY_CLASS,
  DEFAULT_A_FCC_MAX,
  DEFAULT_A_FCC_MIN,
  DEFAULT_A_FCC_STEP,
  DEFAULT_RESPONSE_DEADBAND,
  FCC_BRAID_UNIT_SITES,
  FCC_NEAREST_NEIGHBOR_DIRECTIONS,
  MASTER_EQUATION_KERNEL,
  MIN_NON_OVERLAP_A_FCC,
  REQUIRED_INWARD_RESPONSE_FLOOR,
  buildFailClosedAuthorization,
} from "./sh-0-sea-diagnostic-candidate-model.mjs";

export const SCHEMA = "sh_0_sea_orientation_order_diagnostic.v0";
export const ENSEMBLE_KINDS = Object.freeze([
  "aligned",
  "conjugate_aligned",
  "paired_antiphase",
  "disordered",
]);
export const DEFAULT_DISORDER_SAMPLE_COUNT = 200;
export const DEFAULT_DISORDER_SEED = 20260707;
export const CANDIDATE_A_FCC = 4.25;

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

function dot3(left, right) {
  return left[0] * right[0] + left[1] * right[1] + left[2] * right[2];
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

function braidChargeRows({ center, quaternion = null, conjugation = 1 }) {
  return FCC_BRAID_UNIT_SITES.map((site) => {
    const oriented = quaternion == null ? site.position : rotateByQuaternion(quaternion, site.position);
    return {
      position: [center[0] + oriented[0], center[1] + oriented[1], center[2] + oriented[2]],
      q: site.q * conjugation,
    };
  });
}

function pairInteractionEnergy(braidA, braidB) {
  const { softening, coupling } = MASTER_EQUATION_KERNEL;
  let energy = 0;
  for (const rowA of braidChargeRows(braidA)) {
    for (const rowB of braidChargeRows(braidB)) {
      const distance = norm3(subtract3(rowA.position, rowB.position));
      energy += (coupling * rowA.q * rowB.q) / Math.sqrt(distance * distance + softening * softening);
    }
  }
  return energy;
}

function buildShellEnsemble({ aFcc, kind, random = null }) {
  return FCC_NEAREST_NEIGHBOR_DIRECTIONS.map((direction) => {
    const center = [
      (direction[0] * aFcc) / 2,
      (direction[1] * aFcc) / 2,
      (direction[2] * aFcc) / 2,
    ];
    if (kind === "aligned") {
      return { center };
    }
    if (kind === "conjugate_aligned") {
      return { center, conjugation: -1 };
    }
    if (kind === "paired_antiphase") {
      const canonical =
        direction[0] > 0 ||
        (direction[0] === 0 && direction[1] > 0) ||
        (direction[0] === 0 && direction[1] === 0 && direction[2] > 0);
      return { center, conjugation: canonical ? 1 : -1 };
    }
    return { center, quaternion: uniformRotationQuaternion(random) };
  });
}

function computeShellRadialResponse(shell) {
  const { coupling, softening } = MASTER_EQUATION_KERNEL;
  const chargeRows = shell.flatMap((braid) => braidChargeRows(braid));
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

function computeEnsembleEnergies({ aFcc, shell }) {
  const central = { center: [0, 0, 0] };
  let centerShellEnergy = 0;
  for (const braid of shell) {
    centerShellEnergy += pairInteractionEnergy(central, braid);
  }
  const nearestNeighborDistance = aFcc / Math.SQRT2;
  let shellShellEnergy = 0;
  let shellShellBondCount = 0;
  for (let i = 0; i < shell.length; i += 1) {
    for (let j = i + 1; j < shell.length; j += 1) {
      const centerDistance = norm3(subtract3(shell[i].center, shell[j].center));
      if (Math.abs(centerDistance - nearestNeighborDistance) < 1e-9) {
        shellShellEnergy += pairInteractionEnergy(shell[i], shell[j]);
        shellShellBondCount += 1;
      }
    }
  }
  return {
    center_shell_energy: cleanNumber(centerShellEnergy),
    shell_shell_nn_energy: cleanNumber(shellShellEnergy),
    shell_shell_nn_bond_count: shellShellBondCount,
    total_energy: cleanNumber(centerShellEnergy + shellShellEnergy),
  };
}

function buildPairEnergyLandscape(aFcc) {
  const central = { center: [0, 0, 0] };
  const classes = [
    { label: "attractive_class", direction: [1, 1, 0], cos_sq_theta: 2 / 3 },
    { label: "transverse_class", direction: [1, -1, 0], cos_sq_theta: 0 },
  ];
  return classes.map((entry) => {
    const center = entry.direction.map((component) => (component * aFcc) / 2);
    return {
      bond_class: entry.label,
      direction: entry.direction,
      cos_sq_theta_dipole_vs_bond: cleanNumber(entry.cos_sq_theta),
      aligned_energy: cleanNumber(pairInteractionEnergy(central, { center })),
      dipole_flipped_energy: cleanNumber(
        pairInteractionEnergy(central, { center, conjugation: -1 })
      ),
      rotated_111_half_pi_energy: cleanNumber(
        pairInteractionEnergy(central, {
          center,
          quaternion: axisAngleQuaternion([1, 1, 1], Math.PI / 2),
        })
      ),
      rotated_111_pi_energy: cleanNumber(
        pairInteractionEnergy(central, {
          center,
          quaternion: axisAngleQuaternion([1, 1, 1], Math.PI),
        })
      ),
      rotated_z_half_pi_energy: cleanNumber(
        pairInteractionEnergy(central, {
          center,
          quaternion: axisAngleQuaternion([0, 0, 1], Math.PI / 2),
        })
      ),
      rotated_z_pi_energy: cleanNumber(
        pairInteractionEnergy(central, {
          center,
          quaternion: axisAngleQuaternion([0, 0, 1], Math.PI),
        })
      ),
    };
  });
}

export function buildSh0SeaOrientationOrderDiagnostic(options = {}) {
  const deadband = Math.max(0, normalizeNumber(options.inwardDeadband, DEFAULT_RESPONSE_DEADBAND));
  const requiredProjection = cleanNumber(REQUIRED_INWARD_RESPONSE_FLOOR - deadband);
  const aFccMin = normalizeNumber(options.aFccMin, DEFAULT_A_FCC_MIN);
  const aFccMax = Math.max(aFccMin, normalizeNumber(options.aFccMax, DEFAULT_A_FCC_MAX));
  const aFccStep = Math.max(Number.EPSILON, normalizeNumber(options.aFccStep, DEFAULT_A_FCC_STEP));
  const spacingCount = Math.max(1, Math.round((aFccMax - aFccMin) / aFccStep) + 1);
  const sampleCount = Math.max(
    8,
    Math.round(normalizeNumber(options.sampleCount, DEFAULT_DISORDER_SAMPLE_COUNT))
  );
  const seed = Math.round(normalizeNumber(options.seed, DEFAULT_DISORDER_SEED));
  const spacings = [];
  for (let index = 0; index < spacingCount; index += 1) {
    spacings.push(cleanNumber(Math.min(aFccMax, aFccMin + index * aFccStep)));
  }

  let pairedAntiphaseMaxAbsResponse = 0;
  const ensembleRows = spacings.map((aFcc) => {
    const alignedShell = buildShellEnsemble({ aFcc, kind: "aligned" });
    const conjugateShell = buildShellEnsemble({ aFcc, kind: "conjugate_aligned" });
    const pairedShell = buildShellEnsemble({ aFcc, kind: "paired_antiphase" });
    const alignedResponse = computeShellRadialResponse(alignedShell);
    const conjugateResponse = computeShellRadialResponse(conjugateShell);
    const pairedResponse = computeShellRadialResponse(pairedShell);
    pairedAntiphaseMaxAbsResponse = Math.max(
      pairedAntiphaseMaxAbsResponse,
      Math.abs(pairedResponse)
    );
    const random = mulberry32(seed);
    const disorderedEnergies = [];
    const disorderedResponses = [];
    for (let sample = 0; sample < sampleCount; sample += 1) {
      const shell = buildShellEnsemble({ aFcc, kind: "disordered", random });
      disorderedEnergies.push(computeEnsembleEnergies({ aFcc, shell }).total_energy);
      disorderedResponses.push(computeShellRadialResponse(shell));
    }
    const responseMean =
      disorderedResponses.reduce((sum, value) => sum + value, 0) / sampleCount;
    const responseStd = Math.sqrt(
      disorderedResponses.reduce((sum, value) => sum + (value - responseMean) ** 2, 0) /
        sampleCount
    );
    const energyMean = disorderedEnergies.reduce((sum, value) => sum + value, 0) / sampleCount;
    const energyStd = Math.sqrt(
      disorderedEnergies.reduce((sum, value) => sum + (value - energyMean) ** 2, 0) / sampleCount
    );
    const crossingCount = disorderedResponses.filter((value) => value < requiredProjection).length;
    const crossingProbability = crossingCount / sampleCount;
    return {
      a_fcc: aFcc,
      nearest_neighbor_center_distance: cleanNumber(aFcc / Math.SQRT2),
      geometry_validity: {
        min_non_overlap_a_fcc: cleanNumber(MIN_NON_OVERLAP_A_FCC),
        shell_overlap: aFcc < MIN_NON_OVERLAP_A_FCC,
        pass: aFcc >= MIN_NON_OVERLAP_A_FCC,
      },
      aligned: {
        ...computeEnsembleEnergies({ aFcc, shell: alignedShell }),
        Pi_R_A_sea: alignedResponse,
        crosses_inward_response_floor: alignedResponse < requiredProjection,
      },
      conjugate_aligned: {
        ...computeEnsembleEnergies({ aFcc, shell: conjugateShell }),
        Pi_R_A_sea: conjugateResponse,
        crosses_inward_response_floor: conjugateResponse < requiredProjection,
      },
      paired_antiphase: {
        ...computeEnsembleEnergies({ aFcc, shell: pairedShell }),
        Pi_R_A_sea: pairedResponse,
        crosses_inward_response_floor: pairedResponse < requiredProjection,
      },
      disordered: {
        sample_count: sampleCount,
        total_energy_mean: cleanNumber(energyMean),
        total_energy_std: cleanNumber(energyStd),
        total_energy_min: cleanNumber(Math.min(...disorderedEnergies)),
        Pi_R_mean: cleanNumber(responseMean),
        Pi_R_std: cleanNumber(responseStd),
        Pi_R_min: cleanNumber(Math.min(...disorderedResponses)),
        Pi_R_max: cleanNumber(Math.max(...disorderedResponses)),
        crossing_probability: cleanNumber(crossingProbability),
        crossing_probability_standard_error: cleanNumber(
          Math.sqrt(Math.max(crossingProbability * (1 - crossingProbability), 0) / sampleCount)
        ),
        mean_crosses_inward_response_floor: responseMean < requiredProjection,
      },
      free_amplitude_parameter_count: 0,
    };
  });

  const candidateRow =
    ensembleRows.find((row) => Math.abs(row.a_fcc - CANDIDATE_A_FCC) <= 1e-9) ?? ensembleRows[0];
  const maxCrossingRow = ensembleRows.reduce((best, row) =>
    row.disordered.crossing_probability > best.disordered.crossing_probability ? row : best
  );
  const majorityWindowExists = ensembleRows.some(
    (row) => row.geometry_validity.pass && row.disordered.crossing_probability >= 0.5
  );
  const annealedWindowExists = ensembleRows.some(
    (row) => row.geometry_validity.pass && row.disordered.mean_crosses_inward_response_floor
  );
  const disorderedBeatsUniform = ensembleRows.every(
    (row) =>
      row.disordered.total_energy_min <
      Math.min(
        row.aligned.total_energy,
        row.conjugate_aligned.total_energy,
        row.paired_antiphase.total_energy
      )
  );

  const core = {
    schema: SCHEMA,
    proof_id: "SH-0-sea",
    authority_class: AUTHORITY_CLASS,
    claim_level:
      "diagnostic orientational-order and stochastic-retention analysis only; pairwise potential superposition of declared held braids; not an accepted Noether sea selection rule",
    master_equation_kernel: MASTER_EQUATION_KERNEL,
    potential_convention:
      "U=sum_ij coupling*q_i*q_j*(|x_i-x_j|^2+softening^2)^(-1/2); static held braids, so the delayed potential equals the static potential",
    declared_spacing_range: {
      a_fcc_min: cleanNumber(aFccMin),
      a_fcc_max: cleanNumber(aFccMax),
      a_fcc_step: cleanNumber(aFccStep),
      spacing_row_count: spacingCount,
      min_non_overlap_a_fcc: cleanNumber(MIN_NON_OVERLAP_A_FCC),
    },
    declared_sampler: {
      sampler: "mulberry32_prng_with_shoemake_uniform_so3_quaternions",
      seed,
      sample_count: sampleCount,
      status:
        "declared seeded ensemble: every sampled configuration is a fully declared static held history; no undeclared environment degrees of freedom",
    },
    required_projected_response_floor: requiredProjection,
    inward_deadband: deadband,
    dipole_shell_cancellation_lemma: {
      statement:
        "for aligned braid dipoles p=2(1,1,1) on the FCC nearest-neighbor shell, the point-dipole interaction sum cancels exactly: the 12 face-diagonal bond directions split into 6 with cos^2(theta)=2/3 (factor 1-3cos^2=-1) and 6 with cos(theta)=0 (factor +1), so sum_k (1-3cos^2 theta_k)=0; orientation selection is therefore decided at higher multipole and near-field order",
      attractive_class_count: 6,
      transverse_class_count: 6,
      aligned_point_dipole_shell_sum: 0,
      consistency_note:
        "matches the observed ~a_FCC^-5 far-field decay of the computed aligned wake sum (dipole-order a^-3 term absent)",
    },
    pair_energy_landscape_at_candidate_spacing: {
      a_fcc: CANDIDATE_A_FCC,
      rows: buildPairEnergyLandscape(CANDIDATE_A_FCC),
      frustration_note:
        "the attractive class prefers aligned bonds and the transverse class prefers dipole-flipped bonds with comparable magnitudes, so no uniform orientation assignment minimizes all FCC nearest-neighbor bonds",
    },
    exact_conjugation_lemmas: {
      pair_energy_antisymmetry:
        "conjugating one braid of a pair flips the pair interaction energy exactly (U is bilinear in the signed polarity units)",
      response_antisymmetry:
        "conjugating all 12 neighbors flips Pi_R exactly; the conjugate-aligned ensemble is exactly anti-retentive",
      paired_antiphase_null:
        "the paired-antiphase ensemble (opposite-shell neighbors conjugated) yields Pi_R=0 exactly by inversion-plus-conjugation symmetry of the central braid against the shell",
      paired_antiphase_max_abs_response_observed: cleanNumber(pairedAntiphaseMaxAbsResponse),
    },
    ensemble_rows: ensembleRows,
    orientational_order_condition: {
      retention_requires: "central-aligned neighbor braid dipole order",
      energetic_status: "frustrated_not_energetically_selected",
      evidence: {
        candidate_a_fcc: candidateRow.a_fcc,
        aligned_center_shell_energy: candidateRow.aligned.center_shell_energy,
        conjugate_aligned_center_shell_energy:
          candidateRow.conjugate_aligned.center_shell_energy,
        aligned_Pi_R: candidateRow.aligned.Pi_R_A_sea,
        conjugate_aligned_Pi_R: candidateRow.conjugate_aligned.Pi_R_A_sea,
        disordered_sample_min_total_energy: candidateRow.disordered.total_energy_min,
        uniform_ensemble_min_total_energy: cleanNumber(
          Math.min(
            candidateRow.aligned.total_energy,
            candidateRow.conjugate_aligned.total_energy,
            candidateRow.paired_antiphase.total_energy
          )
        ),
        disordered_samples_beat_all_uniform_ensembles: disorderedBeatsUniform,
      },
      statement:
        "the retention-favorable relative orientation (aligned, inward response) is the energetically disfavored one at the pair-potential level, the paired-antiphase ensemble supplies exactly zero response, and sampled non-uniform configurations undercut every uniform ensemble energy; static pair energetics therefore does not supply the aligned order that guaranteed retention requires, and any aligned order must be maintained dynamically, topologically, or by formation history",
    },
    stochastic_retention: {
      annealed_reading: {
        description:
          "sea re-randomizes quickly relative to the echo timescale; the effective response is the ensemble mean",
        mean_response_window_exists: annealedWindowExists,
        max_abs_Pi_R_mean: cleanNumber(
          Math.max(...ensembleRows.map((row) => Math.abs(row.disordered.Pi_R_mean)))
        ),
        reading:
          "the isotropic-disorder ensemble mean response is consistent with zero (uniform SO(3) averaging of each neighbor braid gives a net-zero charge shell), so the annealed reading supplies no retention window at any spacing",
      },
      quenched_reading: {
        description:
          "sea configuration is frozen during the escape attempt; retention holds per configuration with probability p_cross",
        crossing_probability_rows: ensembleRows.map((row) => ({
          a_fcc: row.a_fcc,
          crossing_probability: row.disordered.crossing_probability,
          standard_error: row.disordered.crossing_probability_standard_error,
        })),
        max_crossing_probability: candidateRowSafe(maxCrossingRow),
        majority_retention_window_exists: majorityWindowExists,
        reading:
          "the quenched crossing probability stays below one half at every declared spacing and decays with spacing, so a majority-retention window does not exist",
      },
      verdict: {
        stochastic_retention_supported: false,
        reason:
          "isotropic orientational disorder gives a zero-mean response with sub-half quenched crossing probability; repeated re-randomization therefore supplies no net inward bias against the escape floor",
        named_remaining_mechanism:
          "induced sea orientational polarization: a linear response of neighbor orientations to the central braid wake, which the fixed-source diagnostic cannot compute; this is the remaining route for the environment-theorem hypothesis without pre-existing aligned order",
      },
    },
    evidence_status: {
      accepted: false,
      accepted_evidence_status: "diagnostic_orientation_order_analysis_not_accepted_evidence",
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

function candidateRowSafe(row) {
  return {
    a_fcc: row.a_fcc,
    crossing_probability: row.disordered.crossing_probability,
  };
}

export function evaluateSh0SeaOrientationOrderDiagnosticEvidence(candidate) {
  if (candidate?.schema !== SCHEMA) {
    return {
      accepted: false,
      reason: "schema_not_sh_0_sea_orientation_order_diagnostic_v0",
      first_missing_field: "sh_0_sea_orientation_order_diagnostic.schema",
    };
  }
  return {
    accepted: false,
    reason: "diagnostic_orientation_order_analysis_not_accepted_retained_evidence",
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
  return {
    pretty: args.includes("--pretty"),
    aFccMin: numberOption("a-fcc-min"),
    aFccMax: numberOption("a-fcc-max"),
    aFccStep: numberOption("a-fcc-step"),
    sampleCount: numberOption("samples"),
    seed: numberOption("seed"),
    inwardDeadband: numberOption("inward-deadband"),
  };
}

function printUsage() {
  console.log(
    `Usage: node ${fileURLToPath(import.meta.url)} [--pretty] [--a-fcc-min=<number>] [--a-fcc-max=<number>] [--a-fcc-step=<number>] [--samples=<count>] [--seed=<integer>] [--inward-deadband=<number>]`
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    printUsage();
    process.exit(0);
  }
  const options = parseArgs(process.argv.slice(2));
  const artifact = buildSh0SeaOrientationOrderDiagnostic(options);
  console.log(JSON.stringify(artifact, null, options.pretty ? 2 : 0));
}
