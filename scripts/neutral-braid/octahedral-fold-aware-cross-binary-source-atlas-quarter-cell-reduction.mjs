#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { evaluatePointwiseTangentialWitness } from "./octahedral-fold-aware-dynamics-handoff.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryQuarterProfileCertificate,
  validateOctahedralFoldAwareCrossBinaryQuarterProfileCertificate,
} from "./octahedral-fold-aware-cross-binary-quarter-profile-certificate.mjs";
import {
  buildOctahedralFoldAwareCrossBinarySourceAtlas,
  validateOctahedralFoldAwareCrossBinarySourceAtlas,
} from "./octahedral-fold-aware-cross-binary-source-atlas.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_SOURCE_ATLAS_QUARTER_CELL_REDUCTION_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-source-atlas-quarter-cell-reduction/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_source_atlas_quarter_cell_reduction";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const RECEIVER_LABEL = "1+";
const QUARTER_PERIOD = Math.PI / 2;
const CHECK_TOLERANCE = 1e-10;

const SOURCE_LABELS = ["2+", "2-", "3+", "3-"];

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  const rounded = Number(value.toFixed(12));
  return Math.abs(rounded) < 5e-13 ? 0 : rounded;
}

function formatSmallNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(12));
}

function crossBinaryRootCountsBySource(witness) {
  const rows = witness.source_rows.filter(
    (row) => row.source_relation === "cross-binary"
  );
  return Object.fromEntries(rows.map((row) => [row.source_label, row.root_count]));
}

function maxSourceCountMismatch(observed, expected) {
  return SOURCE_LABELS.reduce(
    (maximum, label) => Math.max(maximum, Math.abs(observed[label] - expected[label])),
    0
  );
}

function sumExpectedCounts(expected) {
  return SOURCE_LABELS.reduce((sum, label) => sum + expected[label], 0);
}

function extractQuarterFoldThetas(atlas) {
  const positiveEndpoints =
    atlas?.kappa_fold_atlas?.kappa_positive_fold_endpoints ?? [];
  if (positiveEndpoints.length !== 2) {
    throw new Error("source atlas must provide exactly two kappa=+1 fold endpoints");
  }
  const sortedEndpoints = [...positiveEndpoints].sort(
    (left, right) => Number(left.theta_tilde) - Number(right.theta_tilde)
  );
  const twoPlusFoldTheta = Number(sortedEndpoints[0].theta_tilde);
  const threeMinusFoldTheta =
    Number(sortedEndpoints[1].theta_tilde) - QUARTER_PERIOD;
  return {
    three_minus_fold_theta: threeMinusFoldTheta,
    two_plus_fold_theta: twoPlusFoldTheta,
  };
}

export function buildSourceAtlasQuarterCellPartition(atlas) {
  const { three_minus_fold_theta: threeMinusFoldTheta, two_plus_fold_theta: twoPlusFoldTheta } =
    extractQuarterFoldThetas(atlas);
  const ordered =
    0 < threeMinusFoldTheta &&
    threeMinusFoldTheta < twoPlusFoldTheta &&
    twoPlusFoldTheta < QUARTER_PERIOD;

  const cells = [
    {
      cell_id: "I1",
      theta_interval: `[0,${formatNumber(threeMinusFoldTheta)})`,
      theta_left: 0,
      theta_right: threeMinusFoldTheta,
      expected_cross_root_count: 6,
      expected_source_root_counts: {
        "2+": 1,
        "2-": 1,
        "3+": 1,
        "3-": 3,
      },
      cell_status: "regular-open-cell-before-3minus-fold",
    },
    {
      cell_id: "I2",
      theta_interval: `(${formatNumber(threeMinusFoldTheta)},${formatNumber(
        twoPlusFoldTheta
      )})`,
      theta_left: threeMinusFoldTheta,
      theta_right: twoPlusFoldTheta,
      expected_cross_root_count: 4,
      expected_source_root_counts: {
        "2+": 1,
        "2-": 1,
        "3+": 1,
        "3-": 1,
      },
      cell_status: "regular-open-cell-between-folds",
    },
    {
      cell_id: "I3",
      theta_interval: `(${formatNumber(twoPlusFoldTheta)},H/4)`,
      theta_left: twoPlusFoldTheta,
      theta_right: QUARTER_PERIOD,
      expected_cross_root_count: 6,
      expected_source_root_counts: {
        "2+": 3,
        "2-": 1,
        "3+": 1,
        "3-": 1,
      },
      cell_status: "regular-open-cell-after-2plus-fold",
    },
  ];

  return {
    receiver_label: RECEIVER_LABEL,
    theta_domain: "[0,H/4)",
    fold_ordering: {
      theta_3minus_fold: formatNumber(threeMinusFoldTheta),
      theta_2plus_fold: formatNumber(twoPlusFoldTheta),
      quarter_endpoint: formatNumber(QUARTER_PERIOD),
      ordering_statement:
        "0 < theta_3minus_fold < theta_2plus_fold < H/4",
      ordering_certified: ordered,
    },
    fold_endpoint_rows: [
      {
        source_label: "3-",
        kappa: 1,
        theta: formatNumber(threeMinusFoldTheta),
        transition: "three-root-to-one-root",
        endpoint_role: "quarter-cell-left-fold-boundary",
      },
      {
        source_label: "2+",
        kappa: 1,
        theta: formatNumber(twoPlusFoldTheta),
        transition: "one-root-to-three-root",
        endpoint_role: "quarter-cell-right-fold-boundary",
      },
    ],
    unified_quarter_cells: cells.map((cell) => ({
      ...cell,
      theta_left: formatNumber(cell.theta_left),
      theta_right: formatNumber(cell.theta_right),
    })),
    proof_burden_reduction: {
      source_rows_before_atlas: 4,
      independent_source_rows_after_transport: 2,
      independent_quarter_cells_after_unification: 3,
      fold_endpoint_rows_after_unification: 2,
      regular_cell_root_count_vector: cells.map(
        (cell) => cell.expected_cross_root_count
      ),
      next_integral_form:
        "C_cross=sum_{r=1}^3 integral_{I_r} f_cross(theta)dtheta with fold endpoint rows at theta_3minus_fold and theta_2plus_fold",
    },
    status: ordered
      ? "source-atlas-quarter-cell-partition-derived"
      : "source-atlas-quarter-cell-partition-open",
  };
}

export function evaluateSourceAtlasQuarterCellMidpointChecks({
  speedRatio,
  partition,
  rootSubdivisions = DEFAULT_ROOT_SUBDIVISIONS,
}) {
  const rows = partition.unified_quarter_cells.map((cell) => {
    const thetaLeft = Number(cell.theta_left);
    const thetaRight =
      cell.theta_right === null || cell.theta_right === undefined
        ? QUARTER_PERIOD
        : Number(cell.theta_right);
    const midpoint = 0.5 * (thetaLeft + thetaRight);
    const witness = evaluatePointwiseTangentialWitness({
      speedRatio,
      theta: midpoint,
      receiverLabel: RECEIVER_LABEL,
      rootSubdivisions,
    });
    const observedSourceRootCounts = crossBinaryRootCountsBySource(witness);
    const expectedSourceRootCounts = cell.expected_source_root_counts;
    const sourceMismatch = maxSourceCountMismatch(
      observedSourceRootCounts,
      expectedSourceRootCounts
    );
    const expectedCrossRootCount = sumExpectedCounts(expectedSourceRootCounts);

    return {
      cell_id: cell.cell_id,
      theta_midpoint: formatNumber(midpoint),
      expected_cross_root_count: expectedCrossRootCount,
      observed_cross_root_count: witness.cross_root_count,
      expected_source_root_counts: expectedSourceRootCounts,
      observed_source_root_counts: observedSourceRootCounts,
      source_root_count_mismatch: sourceMismatch,
      cross_tangential_value: formatNumber(witness.cross_tangential_value),
      jacobian_abs_min: formatNumber(witness.jacobian_abs_min),
      status:
        witness.cross_root_count === expectedCrossRootCount &&
        sourceMismatch === 0
          ? "quarter-cell-midpoint-check-passed"
          : "quarter-cell-midpoint-check-failed",
    };
  });

  return {
    root_subdivisions: rootSubdivisions,
    rows,
    max_source_root_count_mismatch: rows.reduce(
      (maximum, row) => Math.max(maximum, row.source_root_count_mismatch),
      0
    ),
    max_cross_root_count_mismatch: rows.reduce(
      (maximum, row) =>
        Math.max(
          maximum,
          Math.abs(row.observed_cross_root_count - row.expected_cross_root_count)
        ),
      0
    ),
    min_midpoint_jacobian_abs: formatNumber(
      rows.reduce(
        (minimum, row) => Math.min(minimum, Number(row.jacobian_abs_min)),
        Infinity
      )
    ),
    status: rows.every((row) => row.status === "quarter-cell-midpoint-check-passed")
      ? "quarter-cell-midpoint-checks-passed"
      : "quarter-cell-midpoint-checks-failed",
  };
}

export function buildOctahedralFoldAwareCrossBinarySourceAtlasQuarterCellReduction(
  options = {}
) {
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }

  const atlas = buildOctahedralFoldAwareCrossBinarySourceAtlas({
    sampleCount: 64,
    rootSubdivisions,
  });
  const atlasErrors = validateOctahedralFoldAwareCrossBinarySourceAtlas(atlas);
  const quarterProfile = buildOctahedralFoldAwareCrossBinaryQuarterProfileCertificate({
    sampleCount: 32,
    rootSubdivisions,
  });
  const quarterProfileErrors =
    validateOctahedralFoldAwareCrossBinaryQuarterProfileCertificate(
      quarterProfile
    );
  const speedRatio = Number(atlas.atlas_parameters.speed_ratio_estimate);
  const partition = buildSourceAtlasQuarterCellPartition(atlas);
  const midpointChecks = evaluateSourceAtlasQuarterCellMidpointChecks({
    speedRatio,
    partition,
    rootSubdivisions,
  });
  const reductionCertified =
    atlasErrors.length === 0 &&
    quarterProfileErrors.length === 0 &&
    partition.status === "source-atlas-quarter-cell-partition-derived" &&
    midpointChecks.status === "quarter-cell-midpoint-checks-passed";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_SOURCE_ATLAS_QUARTER_CELL_REDUCTION_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-source-atlas.md",
    priority_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-source-atlas-quarter-cell-reduction.md",
    source_atlas_check: {
      schema: atlas.schema,
      valid: atlasErrors.length === 0,
      errors: atlasErrors,
      theory_status: atlas.result.theory_status,
      retained_branch: atlas.result.retained_branch,
      two_canonical_kappa_source_classes:
        atlas.canonical_source_class_reduction.status ===
        "two-canonical-kappa-source-classes-certified",
    },
    sampled_quarter_profile_check: {
      schema: quarterProfile.schema,
      valid: quarterProfileErrors.length === 0,
      errors: quarterProfileErrors,
      theory_status: quarterProfile.result.theory_status,
      sampled_reference_payload: {
        C_cross_sampled: quarterProfile.quarter_profile_summary.quarter_integral,
        m_Q_sampled: quarterProfile.quarter_profile_summary.primitive_minimum,
        M_Q_sampled: quarterProfile.quarter_profile_summary.primitive_maximum,
        D_cross_sampled:
          quarterProfile.transported_clock_profile_summary
            .centered_excursion_radius,
        centered_speed_minimum_sampled:
          quarterProfile.transported_clock_profile_summary.centered_speed_minimum,
        centered_speed_maximum_sampled:
          quarterProfile.transported_clock_profile_summary.centered_speed_maximum,
      },
      quadrature_convention:
        quarterProfile.scan_parameters.quadrature_convention,
    },
    reduction_parameters: {
      receiver_label: RECEIVER_LABEL,
      theta_domain: "[0,H/4)",
      root_subdivisions: rootSubdivisions,
      speed_constraint:
        "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only",
      speed_ratio_estimate: formatNumber(speedRatio),
      speed_ratio_enclosure: atlas.atlas_parameters.speed_ratio_enclosure,
    },
    source_atlas_aware_formula_reduction: {
      quarter_period: "Q=H/4=pi/2",
      root_equation:
        "F_{kappa,v}(theta_tilde,delta)=delta^2/v^2-2+sin(2*theta_tilde-delta)+kappa*sin(delta)=0",
      jacobian_identity:
        "F_delta=2*delta/v^2-cos(2*theta_tilde-delta)+kappa*cos(delta)=(2*delta/v^2)*J",
      coarea_phase: "phi=2*theta_tilde-delta",
      source_row_kernel:
        "B_kappa(phi,delta)=-0.5*(cos(phi)+kappa*cos(delta))",
      canonical_source_scalar:
        "s_{kappa,sigma}(theta_tilde;v)=sum_{delta in R^+_{kappa,v}(theta_tilde)} 2*sigma*B_kappa(2*theta_tilde-delta,delta)/(v*delta^2*|F_delta(theta_tilde,delta)|)",
      quarter_forcing_formula:
        "f_cross(u)=s_{+,+}(u)-s_{+,+}(u+Q)+s_{-,+}(u)-s_{-,+}(u+Q)",
      interval_targets: [
        "C_cross=int_0^Q f_cross(q)dq",
        "A(u)=int_0^u f_cross(q)dq",
        "m_Q=min_{0<=u<=Q} A(u)",
        "M_Q=max_{0<=u<=Q} A(u)",
      ],
      fold_endpoint_equation:
        "E_{kappa,v}(delta)=(2*delta/v^2+kappa*cos(delta))^2+(2-delta^2/v^2-kappa*sin(delta))^2-1",
      source_cell_constraints: [
        "2+: [0,theta_2plus_fold), (theta_2plus_fold,Q)",
        "3-: [0,theta_3minus_fold), (theta_3minus_fold,Q)",
        "2-,3+: [0,Q) one-root",
      ],
      certifies_formula_targets_not_intervals: true,
      status:
        "source-atlas-aware-quarter-profile-formula-reduction-certified",
    },
    quarter_cell_partition: partition,
    midpoint_checks: midpointChecks,
    interval_profile_boundary: {
      certifies_cross_binary_coarea_interval_profile: false,
      open_quantities: ["C_cross", "m_Q", "M_Q"],
      exact_cell_integral_form:
        "C_cross=sum_{r=1}^3 integral_{I_r} f_cross(theta)dtheta",
      primitive_extrema_boundary:
        "m_Q and M_Q must be enclosed on the same three open cells plus the two fold endpoint limits",
      status: "source-atlas-aware-coarea-interval-quarter-profile-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_cross_binary_source_fold_atlas:
        atlas.artifact_claim.certifies_cross_binary_source_fold_atlas === true,
      certifies_kappa_plus_only_folds:
        atlas.artifact_claim.certifies_kappa_plus_only_folds === true,
      certifies_source_pair_quarter_antisymmetry:
        atlas.artifact_claim.certifies_source_pair_quarter_antisymmetry === true,
      certifies_two_canonical_kappa_source_classes:
        atlas.artifact_claim.certifies_two_canonical_kappa_source_classes === true,
      certifies_sampled_cross_binary_quarter_profile:
        quarterProfile.artifact_claim.certifies_sampled_cross_binary_quarter_profile ===
        true,
      certifies_source_atlas_aware_quarter_profile_formula_reduction: true,
      certifies_source_atlas_aware_C_m_Q_M_Q_targets: true,
      certifies_source_atlas_quarter_cell_reduction: reductionCertified,
      certifies_unified_quarter_cell_partition:
        partition.status === "source-atlas-quarter-cell-partition-derived",
      certifies_quarter_cell_midpoint_root_counts:
        midpointChecks.status === "quarter-cell-midpoint-checks-passed",
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_clock_length_positive_profile_from_interval_bounds: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "source-atlas-aware quarter-cell reduction for the representative cross-binary profile; coarea interval enclosure remains open",
    },
    result: {
      theory_status: reductionCertified
        ? "source-atlas-aware-cross-binary-quarter-profile-formula-quarter-cell-reduction-certified"
        : "source-atlas-quarter-cell-reduction-open",
      first_successor_row:
        "source-atlas-aware-coarea-interval-quarter-profile-certificate-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The source atlas is unified into three regular quarter cells and two fold endpoint rows, with the source-atlas-aware formula for C_cross, m_Q, and M_Q targets fixed. This fixes the topology and equations for the future interval enclosure but does not certify those interval quantities.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinarySourceAtlasQuarterCellReduction(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_SOURCE_ATLAS_QUARTER_CELL_REDUCTION_SCHEMA,
    "schema must match cross-binary source-atlas quarter-cell reduction schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match source-atlas quarter-cell reduction packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.source_atlas_check?.valid === true &&
      artifact?.source_atlas_check?.two_canonical_kappa_source_classes === true,
    "source atlas predecessor must validate with two canonical kappa source classes",
    errors
  );
  assertField(
    artifact?.sampled_quarter_profile_check?.valid === true &&
      artifact?.sampled_quarter_profile_check?.theory_status ===
        "sampled-cross-binary-quarter-profile-positive-clock-check" &&
      artifact?.sampled_quarter_profile_check?.quadrature_convention?.includes(
        "not an interval enclosure"
      ),
    "sampled quarter profile predecessor must validate while remaining non-interval",
    errors
  );
  assertField(
    artifact?.reduction_parameters?.speed_constraint ===
      "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only",
    "quarter-cell reduction must not impose a fixed speed window",
    errors
  );
  const ordering = artifact?.quarter_cell_partition?.fold_ordering;
  assertField(
    ordering?.ordering_certified === true &&
      Number(ordering?.theta_3minus_fold) > 0 &&
      Number(ordering?.theta_3minus_fold) < Number(ordering?.theta_2plus_fold) &&
      Number(ordering?.theta_2plus_fold) < Number(ordering?.quarter_endpoint),
    "fold ordering must certify 0 < theta_3minus_fold < theta_2plus_fold < H/4",
    errors
  );
  const cells = artifact?.quarter_cell_partition?.unified_quarter_cells ?? [];
  assertField(
    cells.length === 3 &&
      JSON.stringify(cells.map((cell) => cell.expected_cross_root_count)) ===
        "[6,4,6]",
    "quarter-cell partition must reduce to three cells with cross root counts [6,4,6]",
    errors
  );
  assertField(
    cells.some(
      (cell) =>
        cell.cell_id === "I1" &&
        cell.expected_source_root_counts?.["3-"] === 3 &&
        cell.expected_source_root_counts?.["2+"] === 1
    ) &&
      cells.some(
        (cell) =>
          cell.cell_id === "I2" &&
          SOURCE_LABELS.every(
            (label) => cell.expected_source_root_counts?.[label] === 1
          )
      ) &&
      cells.some(
        (cell) =>
          cell.cell_id === "I3" &&
          cell.expected_source_root_counts?.["2+"] === 3 &&
          cell.expected_source_root_counts?.["3-"] === 1
      ),
    "quarter cells must assign the folded source rows to 3- before the first fold and 2+ after the second fold",
    errors
  );
  assertField(
    artifact?.midpoint_checks?.status === "quarter-cell-midpoint-checks-passed" &&
      artifact?.midpoint_checks?.max_source_root_count_mismatch === 0 &&
      artifact?.midpoint_checks?.max_cross_root_count_mismatch === 0,
    "quarter-cell midpoint checks must pass without root-count mismatch",
    errors
  );
  assertField(
    artifact?.source_atlas_aware_formula_reduction?.status ===
      "source-atlas-aware-quarter-profile-formula-reduction-certified" &&
      artifact?.source_atlas_aware_formula_reduction
        ?.certifies_formula_targets_not_intervals === true &&
      artifact?.source_atlas_aware_formula_reduction?.interval_targets?.includes(
        "C_cross=int_0^Q f_cross(q)dq"
      ) &&
      artifact?.source_atlas_aware_formula_reduction?.interval_targets?.includes(
        "m_Q=min_{0<=u<=Q} A(u)"
      ) &&
      artifact?.source_atlas_aware_formula_reduction?.interval_targets?.includes(
        "M_Q=max_{0<=u<=Q} A(u)"
      ),
    "source-atlas-aware formula reduction must define the C_cross, m_Q, and M_Q targets",
    errors
  );
  assertField(
    Number(artifact?.midpoint_checks?.min_midpoint_jacobian_abs) > CHECK_TOLERANCE,
    "quarter-cell midpoint checks must stay root-regular at midpoints",
    errors
  );
  assertField(
    artifact?.interval_profile_boundary
      ?.certifies_cross_binary_coarea_interval_profile === false &&
      Array.isArray(artifact?.interval_profile_boundary?.open_quantities) &&
      artifact.interval_profile_boundary.open_quantities.includes("C_cross") &&
      artifact.interval_profile_boundary.open_quantities.includes("m_Q") &&
      artifact.interval_profile_boundary.open_quantities.includes("M_Q"),
    "interval boundary must leave C_cross, m_Q, and M_Q open",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_source_atlas_quarter_cell_reduction ===
      true &&
      artifact?.artifact_claim
        ?.certifies_source_atlas_aware_quarter_profile_formula_reduction ===
        true &&
      artifact?.artifact_claim?.certifies_source_atlas_aware_C_m_Q_M_Q_targets ===
        true &&
      artifact?.artifact_claim?.certifies_C_m_Q_M_Q_interval_enclosure === false &&
      artifact?.artifact_claim?.certifies_cross_binary_coarea_interval_profile ===
        false &&
      artifact?.artifact_claim
        ?.certifies_clock_length_positive_profile_from_interval_bounds === false &&
      artifact?.artifact_claim?.certifies_representative_interval_profile === false &&
      artifact?.artifact_claim?.certifies_receiver_orbit_interval_clock_length_return ===
        false &&
      artifact?.artifact_claim?.certifies_bounded_speed_live_ledger === false,
    "artifact must certify only the quarter-cell reduction and leave interval/live-ledger rows open",
    errors
  );
  assertField(
    artifact?.artifact_claim?.retained_branch === false &&
      artifact?.result?.retained_branch === false &&
      artifact?.result?.retention === "not_retained",
    "artifact must not claim retained branch status",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-source-atlas-quarter-cell-reduction.mjs [options]",
    "",
    "Options:",
    "  --subdivisions <n>     Root search subdivisions (default: 5000)",
    "  --out <path>           Write artifact JSON to path instead of stdout",
    "  --validate <path>      Validate an existing artifact JSON file",
    "  --schema               Print the artifact schema identifier",
    "  --pretty               Pretty-print JSON output",
    "  --help                 Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--subdivisions") {
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
          schema:
            "neutral-braid-octahedral-fold-aware-cross-binary-source-atlas-quarter-cell-reduction-schema/v1",
          artifact_schema:
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_SOURCE_ATLAS_QUARTER_CELL_REDUCTION_SCHEMA,
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
    const errors =
      validateOctahedralFoldAwareCrossBinarySourceAtlasQuarterCellReduction(
        artifact
      );
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

  const artifact =
    buildOctahedralFoldAwareCrossBinarySourceAtlasQuarterCellReduction({
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
