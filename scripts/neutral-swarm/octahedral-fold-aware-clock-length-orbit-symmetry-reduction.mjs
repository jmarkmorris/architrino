#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { OCTAHEDRAL_SITES } from "./octahedral-root-ledger.mjs";
import {
  buildOctahedralFoldAwareClockLengthOrbitScan,
  validateOctahedralFoldAwareClockLengthOrbitScan,
} from "./octahedral-fold-aware-clock-length-orbit-scan.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_ORBIT_SYMMETRY_REDUCTION_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-clock-length-orbit-symmetry-reduction/v1";

const PACKET_ID = "octahedral_fold_aware_clock_length_orbit_symmetry_reduction";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_SAMPLE_COUNT = 64;
const DEFAULT_ROOT_SUBDIVISIONS = 5000;

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  const rounded = Number(value.toFixed(12));
  return Math.abs(rounded) < 5e-13 ? 0 : rounded;
}

function receiverMaps() {
  return [
    {
      receiver_label: "1+",
      generator_word: "I",
      binary_shift_mod_3: 0,
      sign_flip: false,
      phase_shift: "0",
    },
    {
      receiver_label: "1-",
      generator_word: "S",
      binary_shift_mod_3: 0,
      sign_flip: true,
      phase_shift: "pi",
    },
    {
      receiver_label: "2+",
      generator_word: "C",
      binary_shift_mod_3: 1,
      sign_flip: false,
      phase_shift: "0",
    },
    {
      receiver_label: "2-",
      generator_word: "CS",
      binary_shift_mod_3: 1,
      sign_flip: true,
      phase_shift: "pi",
    },
    {
      receiver_label: "3+",
      generator_word: "C^2",
      binary_shift_mod_3: 2,
      sign_flip: false,
      phase_shift: "0",
    },
    {
      receiver_label: "3-",
      generator_word: "C^2S",
      binary_shift_mod_3: 2,
      sign_flip: true,
      phase_shift: "pi",
    },
  ];
}

function receiverLabels() {
  return OCTAHEDRAL_SITES.map((site) => site.label);
}

function maxAbs(values) {
  return Math.max(...values.map((value) => Math.abs(Number(value))));
}

export function buildOctahedralFoldAwareClockLengthOrbitSymmetryReduction(options = {}) {
  const sampleCount = Number.parseInt(options.sampleCount ?? DEFAULT_SAMPLE_COUNT, 10);
  const rootSubdivisions = Number.parseInt(options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS, 10);
  if (!Number.isInteger(sampleCount) || sampleCount < 16) {
    throw new Error("sampleCount must be an integer >= 16");
  }
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }

  const orbitScan = buildOctahedralFoldAwareClockLengthOrbitScan({
    sampleCount,
    rootSubdivisions,
  });
  const orbitErrors = validateOctahedralFoldAwareClockLengthOrbitScan(orbitScan);
  const rows = orbitScan.receiver_profile_rows;
  const primitiveMinimums = rows.map((row) => row.primitive_minimum);
  const primitiveAverages = rows.map((row) => row.primitive_average);
  const primitiveMaximums = rows.map((row) => row.primitive_maximum);
  const positivityMargins = rows.map((row) => row.positivity_margin);
  const forcingMeans = rows.map((row) => row.forcing_mean);
  const labels = receiverLabels();
  const maps = receiverMaps();
  const mapsCoverLabels =
    maps.length === labels.length && labels.every((label) => maps.some((row) => row.receiver_label === label));

  return {
    schema: OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_ORBIT_SYMMETRY_REDUCTION_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-clock-length-orbit-scan.md",
    successor_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-clock-length-chart-closure-proof.md",
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-clock-length-orbit-symmetry-reduction.md",
    source_orbit_check: {
      schema: orbitScan.schema,
      valid: orbitErrors.length === 0,
      errors: orbitErrors,
      theory_status: orbitScan.result.theory_status,
      retained_branch: orbitScan.result.retained_branch,
    },
    reduction_scope: "sampled-clock-length-receiver-orbit",
    reduction_domain: {
      reference_receiver_label: "1+",
      covered_receiver_labels: labels,
      orbit_generators: [
        {
          id: "C",
          label_action: "1+->2+, 2+->3+, 3+->1+ and same for negative labels",
          coordinate_action: "Q_C(x,y,z)=(z,x,y)",
          phase_shift: "0",
        },
        {
          id: "S",
          label_action: "1+<->1-, 2+<->2-, 3+<->3-",
          coordinate_action: "Y_{i-}(u)=Y_{i+}(u+pi)=-Y_{i+}(u)",
          phase_shift: "pi in the unsigned-carrier convention; 0 in the signed-label convention",
        },
      ],
      receiver_maps: maps,
      maps_cover_receiver_orbit: mapsCoverLabels,
      speed_constraint: "none; no fixed speed window is imposed",
      requires_source_relabeling: true,
      requires_phase_shift: true,
      fold_aware_all_roots_required: true,
      ordinary_theta_dropped_root_ledger_allowed: false,
      same_zero_ray_required: true,
    },
    reduction_lemma: {
      status: "candidate-for-interval-chart-proof",
      statement:
        "If the fold-aware coarea/root chart is closed under the signed-cyclic carrier maps C and S, then certifying the representative receiver 1+ profile certifies the six receiver orbit by phase-shifted source relabeling.",
      force_profile_identity:
        "f_{g i}(u+sigma_g)=f_i(u) for g in <C,S>, with source rows permuted and |J| preserved",
      root_equation_identity:
        "Phi_{g i,g j}(u+sigma_g,eta)=Phi_{i,j}(u,eta) because Q_g is orthogonal and source labels are relabeled",
      jacobian_identity:
        "J_{g i,g j}(u+sigma_g,eta)=J_{i,j}(u,eta) under the same root eta",
      force_vector_identity:
        "F_{g i}^{fold}(u+sigma_g)=Q_g F_i^{fold}(u), hence T_{g i} dot F_{g i}^{fold}=T_i dot F_i^{fold}",
      primitive_identity:
        "A_{g i}(u+sigma_g)-A_{g i}(0)=A_i(u)-A_i(0) under the same zero-mean primitive convention",
      clock_length_identity:
        "L_{g i}/H=L_i/H, so the clock offset and positivity criterion are identical over the receiver orbit",
      interval_certificate_reduction_condition:
        "one representative interval profile plus a signed-cyclic chart-closure proof would be sufficient for all six receiver labels",
    },
    sampled_checksum: {
      sample_count: sampleCount,
      root_subdivisions: rootSubdivisions,
      root_count_set: orbitScan.orbit_summary.active_root_counts,
      jacobian_floor_min: formatNumber(Math.min(...rows.map((row) => row.jacobian_abs_floor))),
      orbit_symmetry_status: orbitScan.orbit_summary.orbit_symmetry_status,
      primitive_minimum_spread: orbitScan.orbit_summary.primitive_minimum_spread,
      primitive_average_spread: orbitScan.orbit_summary.primitive_average_spread,
      primitive_maximum_spread: orbitScan.orbit_summary.primitive_maximum_spread,
      clock_initial_speed_spread: orbitScan.orbit_summary.clock_initial_speed_spread,
      speed_minimum_spread: orbitScan.orbit_summary.speed_minimum_spread,
      speed_maximum_spread: orbitScan.orbit_summary.speed_maximum_spread,
      weakest_positivity_margin: orbitScan.orbit_summary.weakest_positivity_margin,
      forcing_mean_abs_max: formatNumber(maxAbs(forcingMeans)),
      direct_spread_checks: {
        primitive_minimum: formatNumber(Math.max(...primitiveMinimums) - Math.min(...primitiveMinimums)),
        primitive_average: formatNumber(Math.max(...primitiveAverages) - Math.min(...primitiveAverages)),
        primitive_maximum: formatNumber(Math.max(...primitiveMaximums) - Math.min(...primitiveMaximums)),
        positivity_margin: formatNumber(Math.max(...positivityMargins) - Math.min(...positivityMargins)),
      },
      equivariance_status: "sampled-receiver-orbit-equivariance-checked",
    },
    proof_burden_reduction: {
      interval_certificate_receiver_rows_before_chart_proof: 6,
      conditional_representative_rows_after_chart_proof: 1,
      can_replace_six_receiver_interval_certification: false,
      remaining_interval_targets: [
        "representative forcing enclosure for f_{1+}(u)",
        "representative primitive enclosure for A_min, A_bar, and A_max",
        "representative Jacobian/root-chart enclosure across fold phases",
        "signed-cyclic chart-closure proof for the chosen coarea convention",
      ],
      not_required_after_reduction:
        "six independent receiver interval searches, provided the signed-cyclic chart-closure proof is supplied",
    },
    artifact_claim: {
      certifies_sampled_receiver_orbit_equivariance: true,
      certifies_interval_receiver_orbit_symmetry_reduction: false,
      certifies_sampled_receiver_orbit_positive_profile:
        orbitScan.artifact_claim.certifies_sampled_receiver_orbit_positive_profile,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "sampled receiver-orbit equivariance checksum plus candidate one-receiver interval reduction; interval chart proof and retained branch remain open",
    },
    result: {
      theory_status:
        orbitErrors.length === 0 && mapsCoverLabels
          ? "sampled-fold-aware-clock-length-receiver-orbit-equivariance-reduction-staged"
          : "sampled-fold-aware-clock-length-receiver-orbit-equivariance-reduction-failed",
      first_successor_row:
        "representative-interval-profile-certificate-plus-signed-cyclic-chart-closure-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The sampled six-receiver equality is packaged as a candidate one-receiver interval reduction, but it cannot replace six interval rows until a signed-cyclic chart-closure proof is supplied.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareClockLengthOrbitSymmetryReduction(artifact) {
  const errors = [];
  assertField(
    artifact?.schema === OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_ORBIT_SYMMETRY_REDUCTION_SCHEMA,
    "schema must match fold-aware orbit symmetry reduction schema",
    errors
  );
  assertField(artifact?.packet_id === PACKET_ID, "packet id must match orbit symmetry reduction packet", errors);
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(artifact?.source_orbit_check?.valid === true, "source orbit scan must validate", errors);
  assertField(
    artifact?.reduction_domain?.speed_constraint === "none; no fixed speed window is imposed",
    "symmetry reduction must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.reduction_scope === "sampled-clock-length-receiver-orbit",
    "symmetry reduction scope must remain sampled clock length receiver orbit",
    errors
  );
  assertField(
    artifact?.reduction_domain?.reference_receiver_label === "1+",
    "symmetry reduction must use receiver 1+ as representative",
    errors
  );
  assertField(
    Array.isArray(artifact?.reduction_domain?.covered_receiver_labels) &&
      artifact.reduction_domain.covered_receiver_labels.length === 6 &&
      new Set(artifact.reduction_domain.covered_receiver_labels).size === 6,
    "symmetry reduction must declare six unique receiver labels",
    errors
  );
  assertField(
    Array.isArray(artifact?.reduction_domain?.orbit_generators) &&
      artifact.reduction_domain.orbit_generators.length === 2,
    "symmetry reduction must declare the signed-cyclic generators",
    errors
  );
  assertField(
    Array.isArray(artifact?.reduction_domain?.receiver_maps) &&
      artifact.reduction_domain.receiver_maps.length === 6 &&
      artifact.reduction_domain.maps_cover_receiver_orbit === true,
    "symmetry reduction maps must cover the six receiver orbit",
    errors
  );
  assertField(
    artifact?.reduction_domain?.requires_source_relabeling === true &&
      artifact?.reduction_domain?.requires_phase_shift === true &&
      artifact?.reduction_domain?.fold_aware_all_roots_required === true &&
      artifact?.reduction_domain?.ordinary_theta_dropped_root_ledger_allowed === false &&
      artifact?.reduction_domain?.same_zero_ray_required === true,
    "symmetry reduction must declare its chart and source-relabeling assumptions",
    errors
  );
  assertField(
    artifact?.reduction_lemma?.force_profile_identity ===
      "f_{g i}(u+sigma_g)=f_i(u) for g in <C,S>, with source rows permuted and |J| preserved",
    "symmetry reduction must state the force-profile identity",
    errors
  );
  assertField(
    artifact?.proof_burden_reduction?.interval_certificate_receiver_rows_before_chart_proof === 6 &&
      artifact?.proof_burden_reduction?.conditional_representative_rows_after_chart_proof === 1 &&
      artifact?.proof_burden_reduction?.can_replace_six_receiver_interval_certification === false,
    "sampled symmetry reduction must keep interval replacement conditional on a chart proof",
    errors
  );
  assertField(
    Number(artifact?.sampled_checksum?.weakest_positivity_margin) > 2,
    "source sampled orbit must keep a large positive speed margin",
    errors
  );
  assertField(
    Number(artifact?.sampled_checksum?.direct_spread_checks?.primitive_minimum) < 1e-9 &&
      Number(artifact?.sampled_checksum?.direct_spread_checks?.positivity_margin) < 1e-9,
    "sampled checksum must keep receiver rows matched",
    errors
  );
  assertField(
    artifact?.sampled_checksum?.equivariance_status === "sampled-receiver-orbit-equivariance-checked",
    "sampled checksum must state sampled receiver-orbit equivariance status",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_sampled_receiver_orbit_equivariance === true &&
      artifact?.artifact_claim?.certifies_interval_receiver_orbit_symmetry_reduction === false &&
      artifact?.artifact_claim?.certifies_receiver_orbit_interval_clock_length_return === false &&
      artifact?.artifact_claim?.certifies_bounded_speed_live_ledger === false &&
      artifact?.result?.retained_branch === false &&
      artifact?.result?.retention === "not_retained",
    "symmetry reduction must not claim interval clock/length, live ledger, or retention",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-swarm/octahedral-fold-aware-clock-length-orbit-symmetry-reduction.mjs [options]",
    "",
    "Options:",
    "  --samples <n>          Number of period samples for checksum (default: 64)",
    "  --subdivisions <n>     Root search subdivisions for checksum (default: 5000)",
    "  --out <path>           Write artifact JSON to path instead of stdout",
    "  --validate <path>      Validate an existing artifact JSON file",
    "  --schema               Print the artifact schema identifier",
    "  --pretty               Pretty-print JSON output",
    "  --help                 Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    sampleCount: DEFAULT_SAMPLE_COUNT,
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--samples") {
      args.sampleCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--subdivisions") {
      args.rootSubdivisions = Number.parseInt(argv[++index], 10);
    } else if (arg === "--out") {
      args.out = argv[++index];
    } else if (arg === "--validate") {
      args.validate = argv[++index];
    } else if (arg === "--schema") {
      args.schema = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }

  return args;
}

function printJson(value, pretty) {
  return `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }
  if (args.schema) {
    process.stdout.write(
      printJson(
        {
          schema: "neutral-swarm-octahedral-fold-aware-clock-length-orbit-symmetry-reduction-schema/v1",
          artifact_schema: OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_ORBIT_SYMMETRY_REDUCTION_SCHEMA,
          promotion_status: PROMOTION_STATUS,
          packet_id: PACKET_ID,
        },
        args.pretty
      )
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors = validateOctahedralFoldAwareClockLengthOrbitSymmetryReduction(artifact);
    process.stdout.write(
      printJson(
        {
          valid: errors.length === 0,
          errors,
          schema: artifact.schema,
          result: artifact.result ?? null,
        },
        args.pretty
      )
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact = buildOctahedralFoldAwareClockLengthOrbitSymmetryReduction({
    sampleCount: args.sampleCount,
    rootSubdivisions: args.rootSubdivisions,
  });
  const output = printJson(artifact, args.pretty);
  if (args.out) {
    fs.mkdirSync(path.dirname(args.out), { recursive: true });
    fs.writeFileSync(args.out, output);
  } else {
    process.stdout.write(output);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
