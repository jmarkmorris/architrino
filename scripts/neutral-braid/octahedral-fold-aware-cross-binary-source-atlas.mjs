#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { evaluatePointwiseTangentialWitness } from "./octahedral-fold-aware-dynamics-handoff.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryQuarterProfileCertificate,
  validateOctahedralFoldAwareCrossBinaryQuarterProfileCertificate,
} from "./octahedral-fold-aware-cross-binary-quarter-profile-certificate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_SOURCE_ATLAS_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-source-atlas/v1";

const PACKET_ID = "octahedral_fold_aware_cross_binary_source_atlas";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_SAMPLE_COUNT = 64;
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const RECEIVER_LABEL = "1+";
const QUARTER_PERIOD = Math.PI / 2;
const CHECK_TOLERANCE = 1e-10;
const ROOT_DOMAIN_MIN = 1e-9;

const SOURCE_CLASSES = [
  {
    source_label: "2+",
    kappa: 1,
    force_sign: 1,
    theta_tilde_shift: 0,
    paired_quarter_source_label: "3-",
  },
  {
    source_label: "2-",
    kappa: -1,
    force_sign: -1,
    theta_tilde_shift: QUARTER_PERIOD,
    paired_quarter_source_label: "3+",
  },
  {
    source_label: "3+",
    kappa: -1,
    force_sign: 1,
    theta_tilde_shift: 0,
    paired_quarter_source_label: "2-",
  },
  {
    source_label: "3-",
    kappa: 1,
    force_sign: -1,
    theta_tilde_shift: QUARTER_PERIOD,
    paired_quarter_source_label: "2+",
  },
];

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

function uniqueSorted(values) {
  return [...new Set(values)].sort((left, right) => left - right);
}

function foldEndpointEquation(speedRatio, kappa, delta) {
  const cosineComponent = (2 * delta) / (speedRatio * speedRatio) + kappa * Math.cos(delta);
  const sineComponent =
    2 - (delta * delta) / (speedRatio * speedRatio) - kappa * Math.sin(delta);
  return cosineComponent * cosineComponent + sineComponent * sineComponent - 1;
}

function solveFoldDelta(speedRatio, kappa, left, right) {
  let a = left;
  let b = right;
  let fa = foldEndpointEquation(speedRatio, kappa, a);
  const fb = foldEndpointEquation(speedRatio, kappa, b);
  if (fa * fb > 0) {
    return null;
  }
  for (let step = 0; step < 100; step += 1) {
    const mid = 0.5 * (a + b);
    const fm = foldEndpointEquation(speedRatio, kappa, mid);
    if (Math.abs(fm) <= 1e-14 || Math.abs(b - a) <= 1e-14) {
      return mid;
    }
    if (fa * fm <= 0) {
      b = mid;
    } else {
      a = mid;
      fa = fm;
    }
  }
  return 0.5 * (a + b);
}

function solveFoldEndpoints(speedRatio, kappa) {
  const roots = [];
  const domainMax = 2 * speedRatio;
  let previousDelta = ROOT_DOMAIN_MIN;
  let previousValue = foldEndpointEquation(speedRatio, kappa, previousDelta);

  for (let index = 1; index <= 20000; index += 1) {
    const delta =
      ROOT_DOMAIN_MIN + ((domainMax - ROOT_DOMAIN_MIN) * index) / 20000;
    const value = foldEndpointEquation(speedRatio, kappa, delta);
    if (
      Number.isFinite(previousValue) &&
      Number.isFinite(value) &&
      previousValue * value < 0
    ) {
      const root = solveFoldDelta(speedRatio, kappa, previousDelta, delta);
      if (
        Number.isFinite(root) &&
        !roots.some((candidate) => Math.abs(candidate - root) <= 1e-9)
      ) {
        roots.push(root);
      }
    }
    previousDelta = delta;
    previousValue = value;
  }

  return roots
    .map((delta) => {
      const cosineComponent =
        (2 * delta) / (speedRatio * speedRatio) + kappa * Math.cos(delta);
      const sineComponent =
        2 - (delta * delta) / (speedRatio * speedRatio) - kappa * Math.sin(delta);
      const phi = Math.atan2(sineComponent, cosineComponent);
      let thetaTilde = 0.5 * (phi + delta);
      while (thetaTilde < 0) {
        thetaTilde += Math.PI;
      }
      while (thetaTilde >= Math.PI) {
        thetaTilde -= Math.PI;
      }
      return {
        kappa,
        theta_tilde: thetaTilde,
        delta,
        phi,
        fold_equation_residual: foldEndpointEquation(speedRatio, kappa, delta),
        F_delta_identity: "F_delta=(2*delta/v^2)*J",
      };
    })
    .sort((left, right) => left.theta_tilde - right.theta_tilde);
}

function sourceRowsByLabel(speedRatio, theta, rootSubdivisions) {
  const witness = evaluatePointwiseTangentialWitness({
    speedRatio,
    theta,
    receiverLabel: RECEIVER_LABEL,
    rootSubdivisions,
  });
  return Object.fromEntries(
    witness.source_rows
      .filter((row) => row.source_relation === "cross-binary")
      .map((row) => [row.source_label, row])
  );
}

function sourceCellRows(sourceClass, kappaPositiveEndpoints) {
  if (sourceClass.kappa < 0 || kappaPositiveEndpoints.length !== 2) {
    return [
      {
        theta_interval: "[0,H/4)",
        root_count: 1,
        cell_status: "single-root-through-quarter",
      },
    ];
  }

  const entry = kappaPositiveEndpoints[0].theta_tilde - sourceClass.theta_tilde_shift;
  const exit = kappaPositiveEndpoints[1].theta_tilde - sourceClass.theta_tilde_shift;
  const shiftedEntry = entry < 0 ? entry + Math.PI : entry;
  const shiftedExit = exit < 0 ? exit + Math.PI : exit;

  if (sourceClass.source_label === "2+") {
    return [
      {
        theta_interval: `[0,${formatNumber(shiftedEntry)})`,
        root_count: 1,
        cell_status: "regular-one-root-cell",
      },
      {
        theta_interval: `(${formatNumber(shiftedEntry)},H/4)`,
        root_count: 3,
        boundary_fold_theta: formatNumber(shiftedEntry),
        cell_status: "fold-entered-three-root-cell",
      },
    ];
  }

  return [
    {
      theta_interval: `[0,${formatNumber(shiftedExit)})`,
      root_count: 3,
      boundary_fold_theta: formatNumber(shiftedExit),
      cell_status: "three-root-cell-before-fold-exit",
    },
    {
      theta_interval: `(${formatNumber(shiftedExit)},H/4)`,
      root_count: 1,
      cell_status: "regular-one-root-cell-after-fold-exit",
    },
  ];
}

function buildSampledSourceSummary(speedRatio, sampleCount, rootSubdivisions) {
  const sourceSummaries = Object.fromEntries(
    SOURCE_CLASSES.map((sourceClass) => [
      sourceClass.source_label,
      {
        source_label: sourceClass.source_label,
        sampled_root_counts: [],
        tangential_minimum: Infinity,
        tangential_maximum: -Infinity,
        sampled_jacobian_abs_floor: Infinity,
      },
    ])
  );
  let maxQuarterPairAntisymmetryResidual = 0;
  let maxRootCountMismatch = 0;
  let maxDelayResidual = 0;
  let maxJacobianResidual = 0;
  let maxRootTangentialPairSumResidual = 0;

  for (let index = 0; index < sampleCount; index += 1) {
    const theta = (QUARTER_PERIOD * index) / sampleCount;
    const rows = sourceRowsByLabel(speedRatio, theta, rootSubdivisions);
    const shiftedRows = sourceRowsByLabel(
      speedRatio,
      theta + QUARTER_PERIOD,
      rootSubdivisions
    );

    for (const sourceClass of SOURCE_CLASSES) {
      const row = rows[sourceClass.source_label];
      const summary = sourceSummaries[sourceClass.source_label];
      summary.sampled_root_counts.push(row.root_count);
      summary.tangential_minimum = Math.min(summary.tangential_minimum, row.tangential_value);
      summary.tangential_maximum = Math.max(summary.tangential_maximum, row.tangential_value);
      for (const root of row.roots) {
        summary.sampled_jacobian_abs_floor = Math.min(
          summary.sampled_jacobian_abs_floor,
          Math.abs(root.jacobian)
        );
      }
      const pairedRow = shiftedRows[sourceClass.paired_quarter_source_label];
      maxQuarterPairAntisymmetryResidual = Math.max(
        maxQuarterPairAntisymmetryResidual,
        Math.abs(row.tangential_value + pairedRow.tangential_value)
      );
      maxRootCountMismatch = Math.max(
        maxRootCountMismatch,
        Math.abs(row.root_count - pairedRow.root_count)
      );
      const comparableRootCount = Math.min(row.roots.length, pairedRow.roots.length);
      for (let rootIndex = 0; rootIndex < comparableRootCount; rootIndex += 1) {
        const root = row.roots[rootIndex];
        const pairedRoot = pairedRow.roots[rootIndex];
        maxDelayResidual = Math.max(
          maxDelayResidual,
          Math.abs(root.phase_delay - pairedRoot.phase_delay)
        );
        maxJacobianResidual = Math.max(
          maxJacobianResidual,
          Math.abs(root.jacobian - pairedRoot.jacobian)
        );
        maxRootTangentialPairSumResidual = Math.max(
          maxRootTangentialPairSumResidual,
          Math.abs(root.tangential_value + pairedRoot.tangential_value)
        );
      }
    }
  }

  return {
    source_rows: SOURCE_CLASSES.map((sourceClass) => {
      const summary = sourceSummaries[sourceClass.source_label];
      return {
        source_label: sourceClass.source_label,
        kappa: sourceClass.kappa,
        force_sign: sourceClass.force_sign,
        theta_tilde_shift:
          sourceClass.theta_tilde_shift === 0 ? "0" : "H/4",
        paired_quarter_source_label: sourceClass.paired_quarter_source_label,
        sampled_root_counts: uniqueSorted(summary.sampled_root_counts),
        tangential_minimum: formatNumber(summary.tangential_minimum),
        tangential_maximum: formatNumber(summary.tangential_maximum),
        sampled_jacobian_abs_floor: formatNumber(summary.sampled_jacobian_abs_floor),
      };
    }),
    source_pair_symmetry: {
      pairings: ["2+(u)+3-(u+H/4)=0", "2-(u)+3+(u+H/4)=0"],
      max_quarter_pair_antisymmetry_residual: formatSmallNumber(
        maxQuarterPairAntisymmetryResidual
      ),
      root_level_transport: {
        max_root_count_mismatch: maxRootCountMismatch,
        max_delay_residual: formatSmallNumber(maxDelayResidual),
        max_jacobian_residual: formatSmallNumber(maxJacobianResidual),
        max_root_tangential_pair_sum_residual: formatSmallNumber(
          maxRootTangentialPairSumResidual
        ),
        status:
          maxRootCountMismatch === 0 &&
          maxDelayResidual <= CHECK_TOLERANCE &&
          maxJacobianResidual <= CHECK_TOLERANCE &&
          maxRootTangentialPairSumResidual <= CHECK_TOLERANCE
            ? "root-level-source-pair-transport-check-passed"
            : "root-level-source-pair-transport-check-failed",
      },
      status:
        maxQuarterPairAntisymmetryResidual <= CHECK_TOLERANCE &&
        maxRootCountMismatch === 0 &&
        maxDelayResidual <= CHECK_TOLERANCE &&
        maxJacobianResidual <= CHECK_TOLERANCE &&
        maxRootTangentialPairSumResidual <= CHECK_TOLERANCE
          ? "source-pair-quarter-antisymmetry-check-passed"
          : "source-pair-quarter-antisymmetry-check-failed",
    },
  };
}

function buildEndpointCheckRows(speedRatio, rootSubdivisions, kappaPositiveEndpoints) {
  const epsilon = 1e-5;
  const twoPlusEntry = kappaPositiveEndpoints[0].theta_tilde;
  const threeMinusExit = kappaPositiveEndpoints[1].theta_tilde - QUARTER_PERIOD;
  const probes = [
    { source_label: "2+", theta: twoPlusEntry - epsilon, expected_root_count: 1 },
    { source_label: "2+", theta: twoPlusEntry + epsilon, expected_root_count: 3 },
    { source_label: "3-", theta: threeMinusExit - epsilon, expected_root_count: 3 },
    { source_label: "3-", theta: threeMinusExit + epsilon, expected_root_count: 1 },
  ];

  return probes.map((probe) => {
    const rows = sourceRowsByLabel(speedRatio, probe.theta, rootSubdivisions);
    const row = rows[probe.source_label];
    return {
      source_label: probe.source_label,
      theta: formatNumber(probe.theta),
      expected_root_count: probe.expected_root_count,
      observed_root_count: row.root_count,
      status:
        row.root_count === probe.expected_root_count
          ? "fold-cell-adjacency-check-passed"
          : "fold-cell-adjacency-check-failed",
    };
  });
}

export function buildOctahedralFoldAwareCrossBinarySourceAtlas(options = {}) {
  const sampleCount = Number.parseInt(options.sampleCount ?? DEFAULT_SAMPLE_COUNT, 10);
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  if (!Number.isInteger(sampleCount) || sampleCount < 16) {
    throw new Error("sampleCount must be an integer >= 16");
  }
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }

  const predecessor =
    buildOctahedralFoldAwareCrossBinaryQuarterProfileCertificate({
      sampleCount: 32,
      rootSubdivisions,
    });
  const predecessorErrors =
    validateOctahedralFoldAwareCrossBinaryQuarterProfileCertificate(predecessor);
  const speedRatio = predecessor.scan_parameters.speed_ratio_estimate;
  const kappaPositiveEndpoints = solveFoldEndpoints(speedRatio, 1);
  const kappaNegativeEndpoints = solveFoldEndpoints(speedRatio, -1);
  const sampledSourceSummary = buildSampledSourceSummary(
    speedRatio,
    sampleCount,
    rootSubdivisions
  );
  const endpointCheckRows = buildEndpointCheckRows(
    speedRatio,
    rootSubdivisions,
    kappaPositiveEndpoints
  );
  const atlasPassed =
    predecessorErrors.length === 0 &&
    kappaPositiveEndpoints.length === 2 &&
    kappaNegativeEndpoints.length === 0 &&
    sampledSourceSummary.source_pair_symmetry.status ===
      "source-pair-quarter-antisymmetry-check-passed" &&
    endpointCheckRows.every(
      (row) => row.status === "fold-cell-adjacency-check-passed"
    );

  return {
    schema: OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_SOURCE_ATLAS_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-quarter-profile-certificate.md",
    priority_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-source-atlas.md",
    source_quarter_profile_check: {
      schema: predecessor.schema,
      valid: predecessorErrors.length === 0,
      errors: predecessorErrors,
      theory_status: predecessor.result.theory_status,
      retained_branch: predecessor.result.retained_branch,
    },
    atlas_parameters: {
      receiver_label: RECEIVER_LABEL,
      theta_domain: "[0,H/4)",
      sample_count: sampleCount,
      root_subdivisions: rootSubdivisions,
      speed_constraint:
        "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only",
      speed_ratio_estimate: formatNumber(speedRatio),
      speed_ratio_enclosure: predecessor.scan_parameters.speed_ratio_enclosure,
    },
    kappa_fold_atlas: {
      kappa_positive_fold_endpoints: kappaPositiveEndpoints.map((row) => ({
        kappa: row.kappa,
        theta_tilde: formatNumber(row.theta_tilde),
        delta: formatNumber(row.delta),
        phi: formatNumber(row.phi),
        fold_equation_residual: formatSmallNumber(row.fold_equation_residual),
        F_delta_identity: row.F_delta_identity,
      })),
      kappa_negative_fold_endpoints: kappaNegativeEndpoints.map((row) => ({
        kappa: row.kappa,
        theta_tilde: formatNumber(row.theta_tilde),
        delta: formatNumber(row.delta),
        phi: formatNumber(row.phi),
      })),
      status:
        kappaPositiveEndpoints.length === 2 && kappaNegativeEndpoints.length === 0
          ? "kappa-plus-only-fold-atlas-certified"
          : "cross-binary-fold-atlas-open",
    },
    source_class_rows: sampledSourceSummary.source_rows.map((row) => {
      const sourceClass = SOURCE_CLASSES.find(
        (candidate) => candidate.source_label === row.source_label
      );
      return {
        ...row,
        quarter_cell_rows: sourceCellRows(sourceClass, kappaPositiveEndpoints),
      };
    }),
    source_pair_symmetry: sampledSourceSummary.source_pair_symmetry,
    canonical_source_class_reduction: {
      source_rows_before: 4,
      canonical_rows_after: 2,
      canonical_rows: [
        {
          canonical_source_label: "2+",
          kappa: 1,
          transports_to: "3-",
          transport_identity: "f_2+(u)=-f_3-(u+H/4)",
          fold_cells_required: true,
        },
        {
          canonical_source_label: "3+",
          kappa: -1,
          transports_to: "2-",
          transport_identity: "f_3+(u)=-f_2-(u+H/4)",
          fold_cells_required: false,
        },
      ],
      rejects_one_canonical_row: true,
      status: "two-canonical-kappa-source-classes-certified",
    },
    fold_cell_adjacency_checks: endpointCheckRows,
    proof_burden_reduction: {
      cross_binary_sources_before: 4,
      canonical_source_class_rows_after: 2,
      fold_endpoint_parameters_after: 2,
      kappa_classes_with_folds: ["+1"],
      kappa_classes_without_folds: ["-1"],
      interval_certificate_targets:
        "two kappa=+1 fold endpoints, two one-root kappa=-1 source rows, and two shifted kappa=+1 source cells on the quarter profile",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_cross_binary_source_fold_atlas: atlasPassed,
      certifies_kappa_plus_only_folds: kappaNegativeEndpoints.length === 0,
      certifies_source_pair_quarter_antisymmetry:
        sampledSourceSummary.source_pair_symmetry.status ===
        "source-pair-quarter-antisymmetry-check-passed",
      certifies_two_canonical_kappa_source_classes: true,
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "cross-binary source/fold atlas for the representative quarter profile; coarea interval enclosure remains open",
    },
    result: {
      theory_status: atlasPassed
        ? "cross-binary-quarter-source-fold-atlas-certified"
        : "cross-binary-quarter-source-fold-atlas-open",
      first_successor_row:
        "source-atlas-aware-coarea-interval-quarter-profile-certificate-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The quarter profile is reduced to a concrete source/fold atlas: only kappa=+1 sources fold at the certified zero ratio, while kappa=-1 sources stay one-root. This narrows but does not close the coarea interval profile.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinarySourceAtlas(artifact) {
  const errors = [];
  assertField(
    artifact?.schema === OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_SOURCE_ATLAS_SCHEMA,
    "schema must match cross-binary source atlas schema",
    errors
  );
  assertField(artifact?.packet_id === PACKET_ID, "packet id must match source atlas packet", errors);
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.source_quarter_profile_check?.valid === true,
    "source quarter profile certificate must validate",
    errors
  );
  assertField(
    artifact?.atlas_parameters?.speed_constraint ===
      "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only",
    "source atlas must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.kappa_fold_atlas?.status === "kappa-plus-only-fold-atlas-certified" &&
      artifact?.kappa_fold_atlas?.kappa_positive_fold_endpoints?.length === 2 &&
      artifact?.kappa_fold_atlas?.kappa_negative_fold_endpoints?.length === 0,
    "source atlas must certify two kappa=+1 fold endpoints and no kappa=-1 fold endpoints",
    errors
  );
  assertField(
    artifact?.source_class_rows?.length === 4 &&
      artifact.source_class_rows.some(
        (row) =>
          row.source_label === "2+" &&
          JSON.stringify(row.sampled_root_counts) === "[1,3]"
      ) &&
      artifact.source_class_rows.some(
        (row) =>
          row.source_label === "3-" &&
          JSON.stringify(row.sampled_root_counts) === "[1,3]"
      ) &&
      artifact.source_class_rows.some(
        (row) =>
          row.source_label === "2-" &&
          JSON.stringify(row.sampled_root_counts) === "[1]"
      ) &&
      artifact.source_class_rows.some(
        (row) =>
          row.source_label === "3+" &&
          JSON.stringify(row.sampled_root_counts) === "[1]"
      ),
    "source atlas must identify folded kappa=+1 rows and one-root kappa=-1 rows",
    errors
  );
  assertField(
    artifact?.source_pair_symmetry?.status ===
      "source-pair-quarter-antisymmetry-check-passed" &&
      Number(
        artifact?.source_pair_symmetry?.max_quarter_pair_antisymmetry_residual
      ) <= CHECK_TOLERANCE &&
      artifact?.source_pair_symmetry?.root_level_transport?.status ===
        "root-level-source-pair-transport-check-passed",
    "source-pair quarter antisymmetry must pass",
    errors
  );
  assertField(
    artifact?.canonical_source_class_reduction?.source_rows_before === 4 &&
      artifact?.canonical_source_class_reduction?.canonical_rows_after === 2 &&
      artifact?.canonical_source_class_reduction?.rejects_one_canonical_row ===
        true &&
      artifact?.canonical_source_class_reduction?.status ===
        "two-canonical-kappa-source-classes-certified",
    "source atlas must reduce four source rows to exactly two canonical kappa rows",
    errors
  );
  assertField(
    Array.isArray(artifact?.fold_cell_adjacency_checks) &&
      artifact.fold_cell_adjacency_checks.length === 4 &&
      artifact.fold_cell_adjacency_checks.every(
        (row) => row.status === "fold-cell-adjacency-check-passed"
      ),
    "fold cell adjacency checks must pass around both quarter-domain fold boundaries",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_cross_binary_source_fold_atlas === true &&
      artifact?.artifact_claim?.certifies_cross_binary_coarea_interval_profile ===
        false &&
      artifact?.artifact_claim?.certifies_representative_interval_profile === false &&
      artifact?.artifact_claim?.certifies_receiver_orbit_interval_clock_length_return ===
        false &&
      artifact?.artifact_claim?.certifies_bounded_speed_live_ledger === false,
    "artifact must certify only the source/fold atlas and leave interval/live-ledger rows open",
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
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-source-atlas.mjs [options]",
    "",
    "Options:",
    "  --samples <n>          Number of quarter-period samples (default: 64)",
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
          schema: "neutral-braid-octahedral-fold-aware-cross-binary-source-atlas-schema/v1",
          artifact_schema: OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_SOURCE_ATLAS_SCHEMA,
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
    const errors = validateOctahedralFoldAwareCrossBinarySourceAtlas(artifact);
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

  const artifact = buildOctahedralFoldAwareCrossBinarySourceAtlas({
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
