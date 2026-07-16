#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryForcingSignBracketCertificate,
  validateOctahedralFoldAwareCrossBinaryForcingSignBracketCertificate,
} from "./octahedral-fold-aware-cross-binary-forcing-sign-bracket-certificate.mjs";
import {
  buildOctahedralFoldAwareCrossBinarySourceAtlasIntervalImplication,
  validateOctahedralFoldAwareCrossBinarySourceAtlasIntervalImplication,
} from "./octahedral-fold-aware-cross-binary-source-atlas-interval-implication.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_BRIDGE_PREDICATE_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-bridge-predicate-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_bridge_predicate_certificate";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_SCAN_SAMPLES_PER_CELL = 96;
const DEFAULT_TOPOLOGY_SAMPLES_PER_CELL = 48;
const DEFAULT_DERIVATIVE_SAMPLES_PER_CELL = 8;
const DEFAULT_SOURCE_ATLAS_SAMPLE_COUNT = 64;
const DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT = 96;
const DEFAULT_VALUE_QUADRATURE_PANELS_PER_SEGMENT = 384;
const DEFAULT_TARGET_MARGIN_FACTOR = 0.5;
const DEFAULT_DERIVATIVE_TAIL_SAMPLE_COUNT = 4;
const NO_SPEED_WINDOW =
  "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only";
const CHECK_TOLERANCE = 1e-10;

function formatSmallNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(12));
}

function rowById(rows, rowId) {
  const row = rows.find((entry) => entry.row_id === rowId);
  if (!row) {
    throw new Error(`missing signed witness row ${rowId}`);
  }
  return row;
}

function signMargin(value, expectedSign) {
  if (expectedSign === "+") {
    return Number(value);
  }
  if (expectedSign === "-") {
    return -Number(value);
  }
  throw new Error(`unsupported expected sign: ${expectedSign}`);
}

function buildBridgePropagationLemma() {
  return {
    lemma_id: "regular-bridge-sign-propagation",
    theorem_scope: "regular source-atlas bridge intervals in I2",
    statements: [
      "If f'_cross>0 on [a,b] and f_cross(a)>0, then f_cross>0 on [a,b].",
      "If f'_cross<0 on [a,b] and f_cross(b)>0, then f_cross>0 on [a,b].",
      "If f'_cross<0 on [a,b] and f_cross(a)<0, then f_cross<0 on [a,b].",
    ],
    proof:
      "Each statement is the one-dimensional monotonicity theorem applied to f_cross on a compact regular source-atlas interval.",
    proof_status: "conditional-bridge-propagation-lemma-proved",
  };
}

function buildSampleEndpointRows(signCertificate) {
  const rows = signCertificate.signed_witness_rows;
  const specs = [
    {
      sample_id: "theta_3plus.entry",
      witness_row_id: "I2.left-scan",
      expected_sign: "+",
      bridge_predicate_id: "theta_3plus.regular-entry-positive",
      role: "regular entry sample immediately after theta_3-",
    },
    {
      sample_id: "I2.turn-crest",
      witness_row_id: "I2.d1",
      expected_sign: "+",
      bridge_predicate_id: "I2.turn-bridge-forcing-positive",
      role: "positive crest sample inside the derivative-turn bridge",
    },
    {
      sample_id: "I2.left-forcing-bracket",
      witness_row_id: "I2.f1.left",
      expected_sign: "+",
      bridge_predicate_id: "I2.turn-bridge-forcing-positive",
      role: "positive right endpoint for the decreasing turn-to-zero bridge",
    },
    {
      sample_id: "I2.right-forcing-bracket",
      witness_row_id: "I2.f1.right",
      expected_sign: "-",
      bridge_predicate_id: "theta_2minus.regular-exit-negative",
      role: "negative left endpoint for post-zero transport to the regular exit before theta_2+",
    },
    {
      sample_id: "theta_2minus.exit",
      witness_row_id: "I2.right-scan",
      expected_sign: "-",
      bridge_predicate_id: "theta_2minus.regular-exit-negative",
      role: "regular exit sample immediately before theta_2+",
    },
  ];
  return specs.map((spec) => {
    const row = rowById(rows, spec.witness_row_id);
    const margin = signMargin(row.forcing, spec.expected_sign);
    return {
      ...spec,
      theta: row.theta,
      forcing: row.forcing,
      forcing_sign: row.forcing_sign,
      derivative: row.derivative,
      derivative_sign: row.derivative_sign,
      source_root_count: row.source_root_count,
      signed_forcing_margin: formatSmallNumber(margin),
      status:
        margin > CHECK_TOLERANCE && row.forcing_sign === spec.expected_sign
          ? "sampled-bridge-endpoint-sign-certified"
          : "sampled-bridge-endpoint-sign-open",
    };
  });
}

function buildBridgeCertificateRows({ endpointRows }) {
  const endpointById = Object.fromEntries(
    endpointRows.map((row) => [row.sample_id, row])
  );
  const entry = endpointById["theta_3plus.entry"];
  const crest = endpointById["I2.turn-crest"];
  const leftBracket = endpointById["I2.left-forcing-bracket"];
  const rightBracket = endpointById["I2.right-forcing-bracket"];
  const exit = endpointById["theta_2minus.exit"];
  return [
    {
      bridge_predicate_id: "theta_3plus.regular-entry-positive",
      required_sample_ids: ["theta_3plus.entry"],
      expected_sign: "+",
      propagation_rule:
        "with f'_cross>0 on the entry-to-turn bridge, the positive entry sample transports positivity forward",
      weakest_sample_margin: entry.signed_forcing_margin,
      status:
        entry.status === "sampled-bridge-endpoint-sign-certified"
          ? "sampled-bridge-predicate-certified"
          : "sampled-bridge-predicate-open",
    },
    {
      bridge_predicate_id: "I2.turn-bridge-forcing-positive",
      required_sample_ids: ["I2.turn-crest", "I2.left-forcing-bracket"],
      expected_sign: "+",
      propagation_rule:
        "with f'_cross>0 before the turn and f'_cross<0 after the turn, positivity at the entry/crest and at I2.f1.left transports positivity across both bridge pieces",
      weakest_sample_margin: formatSmallNumber(
        Math.min(
          Number(crest.signed_forcing_margin),
          Number(leftBracket.signed_forcing_margin)
        )
      ),
      status:
        crest.status === "sampled-bridge-endpoint-sign-certified" &&
        leftBracket.status === "sampled-bridge-endpoint-sign-certified"
          ? "sampled-bridge-predicate-certified"
          : "sampled-bridge-predicate-open",
    },
    {
      bridge_predicate_id: "theta_2minus.regular-exit-negative",
      required_sample_ids: ["I2.right-forcing-bracket", "theta_2minus.exit"],
      expected_sign: "-",
      propagation_rule:
        "with f'_cross<0 after I2.f1, the negative right-bracket sample transports negativity to the regular exit before theta_2+",
      weakest_sample_margin: formatSmallNumber(
        Math.min(
          Number(rightBracket.signed_forcing_margin),
          Number(exit.signed_forcing_margin)
        )
      ),
      status:
        rightBracket.status === "sampled-bridge-endpoint-sign-certified" &&
        exit.status === "sampled-bridge-endpoint-sign-certified"
          ? "sampled-bridge-predicate-certified"
          : "sampled-bridge-predicate-open",
    },
  ];
}

function buildDerivativeBridgeRows() {
  return [
    {
      derivative_bridge_id: "I2.entry-to-turn",
      interval: "[theta_3+, I2.d1]",
      required_derivative_sign: "+",
      source_interval_target: "I2.derivative-positive.before-turn",
      propagation_use:
        "transports positive entry forcing forward to the derivative turn",
      status: "conditional-derivative-bridge-row-stated",
    },
    {
      derivative_bridge_id: "I2.turn-to-left-forcing-bracket",
      interval: "[I2.d1, I2.f1.left]",
      required_derivative_sign: "-",
      source_interval_target: "I2.derivative-negative.after-turn",
      propagation_use:
        "transports positivity backward from I2.f1.left across the post-turn bridge",
      status: "conditional-derivative-bridge-row-stated",
    },
    {
      derivative_bridge_id: "I2.right-forcing-bracket-to-theta_2minus",
      interval: "[I2.f1.right, theta_2minus regular exit]",
      required_derivative_sign: "-",
      source_interval_target: "I2.derivative-negative.after-turn",
      propagation_use:
        "transports negativity forward from I2.f1.right to the regular exit before theta_2+",
      status: "conditional-derivative-bridge-row-stated",
    },
  ];
}

function summarizeBridgeRows(rows) {
  return {
    bridge_predicate_count: rows.length,
    sampled_bridge_predicate_certified_count: rows.filter(
      (row) => row.status === "sampled-bridge-predicate-certified"
    ).length,
    minimum_sampled_bridge_margin: formatSmallNumber(
      Math.min(...rows.map((row) => Number(row.weakest_sample_margin)))
    ),
    bridge_predicate_ids: rows.map((row) => row.bridge_predicate_id),
    status: rows.every((row) => row.status === "sampled-bridge-predicate-certified")
      ? "sampled-bridge-predicates-certified"
      : "sampled-bridge-predicates-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryBridgePredicateCertificate(
  options = {}
) {
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  const scanSamplesPerCell = Number.parseInt(
    options.scanSamplesPerCell ?? DEFAULT_SCAN_SAMPLES_PER_CELL,
    10
  );
  const topologySamplesPerCell = Number.parseInt(
    options.topologySamplesPerCell ?? DEFAULT_TOPOLOGY_SAMPLES_PER_CELL,
    10
  );
  const derivativeSamplesPerCell = Number.parseInt(
    options.derivativeSamplesPerCell ?? DEFAULT_DERIVATIVE_SAMPLES_PER_CELL,
    10
  );
  const sourceAtlasSampleCount = Number.parseInt(
    options.sourceAtlasSampleCount ?? DEFAULT_SOURCE_ATLAS_SAMPLE_COUNT,
    10
  );
  const sourceQuadraturePanelsPerSegment = Number.parseInt(
    options.sourceQuadraturePanelsPerSegment ??
      DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT,
    10
  );
  const valueQuadraturePanelsPerSegment = Number.parseInt(
    options.valueQuadraturePanelsPerSegment ??
      DEFAULT_VALUE_QUADRATURE_PANELS_PER_SEGMENT,
    10
  );
  const targetMarginFactor = Number(
    options.targetMarginFactor ?? DEFAULT_TARGET_MARGIN_FACTOR
  );
  const derivativeTailSampleCount = Number.parseInt(
    options.derivativeTailSampleCount ?? DEFAULT_DERIVATIVE_TAIL_SAMPLE_COUNT,
    10
  );
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  if (!Number.isInteger(scanSamplesPerCell) || scanSamplesPerCell < 16) {
    throw new Error("scanSamplesPerCell must be an integer >= 16");
  }
  if (!Number.isInteger(topologySamplesPerCell) || topologySamplesPerCell < 16) {
    throw new Error("topologySamplesPerCell must be an integer >= 16");
  }
  if (
    !Number.isInteger(derivativeSamplesPerCell) ||
    derivativeSamplesPerCell < 4
  ) {
    throw new Error("derivativeSamplesPerCell must be an integer >= 4");
  }
  if (!Number.isInteger(sourceAtlasSampleCount) || sourceAtlasSampleCount < 16) {
    throw new Error("sourceAtlasSampleCount must be an integer >= 16");
  }
  if (
    !Number.isInteger(sourceQuadraturePanelsPerSegment) ||
    sourceQuadraturePanelsPerSegment < 32
  ) {
    throw new Error("sourceQuadraturePanelsPerSegment must be an integer >= 32");
  }
  if (
    !Number.isInteger(valueQuadraturePanelsPerSegment) ||
    valueQuadraturePanelsPerSegment < 32
  ) {
    throw new Error("valueQuadraturePanelsPerSegment must be an integer >= 32");
  }
  if (
    !Number.isFinite(targetMarginFactor) ||
    targetMarginFactor <= 0 ||
    targetMarginFactor > 1
  ) {
    throw new Error("targetMarginFactor must satisfy 0 < targetMarginFactor <= 1");
  }
  if (
    !Number.isInteger(derivativeTailSampleCount) ||
    derivativeTailSampleCount < 1
  ) {
    throw new Error("derivativeTailSampleCount must be an integer >= 1");
  }

  const intervalImplication =
    buildOctahedralFoldAwareCrossBinarySourceAtlasIntervalImplication({
      rootSubdivisions,
      scanSamplesPerCell,
      topologySamplesPerCell,
      derivativeSamplesPerCell,
      sourceAtlasSampleCount,
      sourceQuadraturePanelsPerSegment,
      valueQuadraturePanelsPerSegment,
      targetMarginFactor,
      derivativeTailSampleCount,
    });
  const implicationErrors =
    validateOctahedralFoldAwareCrossBinarySourceAtlasIntervalImplication(
      intervalImplication
    );
  const signCertificate =
    buildOctahedralFoldAwareCrossBinaryForcingSignBracketCertificate({
      rootSubdivisions,
      scanSamplesPerCell,
      topologySamplesPerCell,
      derivativeSamplesPerCell,
      sourceQuadraturePanelsPerSegment,
    });
  const signCertificateErrors =
    validateOctahedralFoldAwareCrossBinaryForcingSignBracketCertificate(
      signCertificate
    );
  const endpointRows = buildSampleEndpointRows(signCertificate);
  const bridgeRows = buildBridgeCertificateRows({ endpointRows });
  const summary = summarizeBridgeRows(bridgeRows);
  const passed =
    implicationErrors.length === 0 &&
    signCertificateErrors.length === 0 &&
    summary.status === "sampled-bridge-predicates-certified";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_BRIDGE_PREDICATE_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-source-atlas-interval-implication.md",
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-forcing-sign-bracket-certificate.md",
    ],
    priority_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-bridge-predicate-certificate.md",
    source_interval_implication_check: {
      schema: intervalImplication.schema,
      valid: implicationErrors.length === 0,
      errors: implicationErrors,
      theory_status: intervalImplication.result.theory_status,
      retained_branch: intervalImplication.result.retained_branch,
      bridge_predicates_identified:
        intervalImplication.artifact_claim.identifies_missing_bridge_predicates ===
        true,
      certifies_interval_sign_topology:
        intervalImplication.artifact_claim.certifies_interval_sign_topology ===
        true,
    },
    source_sign_bracket_certificate_check: {
      schema: signCertificate.schema,
      valid: signCertificateErrors.length === 0,
      errors: signCertificateErrors,
      theory_status: signCertificate.result.theory_status,
      retained_branch: signCertificate.result.retained_branch,
      sign_bracket_status: signCertificate.sign_bracket_summary.status,
      certifies_interval_derivative_enclosure:
        signCertificate.artifact_claim.certifies_interval_derivative_enclosure ===
        true,
    },
    bridge_parameters: {
      receiver_label: "1+",
      theta_domain: "[0,H/4]",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_estimate:
        intervalImplication.interval_implication_parameters.speed_ratio_estimate,
      speed_ratio_enclosure:
        intervalImplication.interval_implication_parameters.speed_ratio_enclosure,
      root_subdivisions: rootSubdivisions,
      scan_samples_per_cell: scanSamplesPerCell,
      topology_samples_per_cell: topologySamplesPerCell,
      derivative_samples_per_cell: derivativeSamplesPerCell,
      source_atlas_sample_count: sourceAtlasSampleCount,
      source_quadrature_panels_per_segment: sourceQuadraturePanelsPerSegment,
      value_quadrature_panels_per_segment: valueQuadraturePanelsPerSegment,
      target_margin_factor: formatSmallNumber(targetMarginFactor),
    },
    bridge_propagation_lemma: buildBridgePropagationLemma(),
    bridge_endpoint_sample_rows: endpointRows,
    derivative_bridge_rows: buildDerivativeBridgeRows(),
    bridge_predicate_certificate_rows: bridgeRows,
    bridge_summary: summary,
    interval_profile_boundary: {
      certifies_bridge_propagation_lemma: passed,
      certifies_sampled_bridge_predicates: passed,
      certifies_interval_bridge_predicates: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      open_quantities: [
        "interval derivative-sign enclosures on the three bridge intervals",
        "interval endpoint sign enclosures for theta_3+, I2 turn/left bracket, and the theta_2+ regular exit",
        "shared source-atlas interval sign topology",
        "candidate-value interval quadrature",
      ],
      status: "sampled-bridge-predicates-certified-interval-bridge-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_bridge_propagation_lemma: passed,
      certifies_sampled_bridge_predicates: passed,
      certifies_interval_bridge_predicates: false,
      certifies_interval_sign_topology: false,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "bridge propagation lemma plus sampled bridge predicate certificate; interval bridge predicates and retained branch status remain open",
    },
    result: {
      theory_status: passed
        ? "sampled-source-atlas-aware-bridge-predicate-certificate-certified"
        : "source-atlas-aware-bridge-predicate-certificate-open",
      first_successor_row:
        "source-atlas-aware-interval-bridge-predicate-enclosures-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The three bridge predicates now have a propagation lemma and sampled endpoint signs; theorem-grade closure requires interval derivative and endpoint sign enclosures on the same bridge intervals.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryBridgePredicateCertificate(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_BRIDGE_PREDICATE_CERTIFICATE_SCHEMA,
    "schema must match bridge predicate certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match bridge predicate certificate packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.source_interval_implication_check?.valid === true &&
      artifact?.source_interval_implication_check?.bridge_predicates_identified ===
        true &&
      artifact?.source_interval_implication_check
        ?.certifies_interval_sign_topology === false,
    "source interval implication must validate with bridge predicates identified and interval topology open",
    errors
  );
  assertField(
    artifact?.source_sign_bracket_certificate_check?.valid === true &&
      artifact?.source_sign_bracket_certificate_check?.sign_bracket_status ===
        "sampled-forcing-sign-brackets-certified" &&
      artifact?.source_sign_bracket_certificate_check
        ?.certifies_interval_derivative_enclosure === false,
    "source sign bracket certificate must validate without interval derivative enclosure",
    errors
  );
  assertField(
    artifact?.bridge_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "bridge predicate certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.bridge_parameters?.speed_band === undefined &&
      artifact?.bridge_parameters?.speed_window === undefined &&
      artifact?.bridge_parameters?.speed_min === undefined &&
      artifact?.bridge_parameters?.speed_max === undefined,
    "bridge parameters must not contain speed-band fields",
    errors
  );
  assertField(
    artifact?.bridge_propagation_lemma?.proof_status ===
      "conditional-bridge-propagation-lemma-proved" &&
      artifact?.bridge_propagation_lemma?.statements?.length === 3,
    "bridge propagation lemma must state the three monotone sign transports",
    errors
  );
  assertField(
    Array.isArray(artifact?.bridge_endpoint_sample_rows) &&
      artifact.bridge_endpoint_sample_rows.length === 5 &&
      artifact.bridge_endpoint_sample_rows.every(
        (row) => row.status === "sampled-bridge-endpoint-sign-certified"
      ),
    "bridge endpoint samples must certify five sampled endpoint signs",
    errors
  );
  assertField(
    Array.isArray(artifact?.derivative_bridge_rows) &&
      artifact.derivative_bridge_rows.length === 3 &&
      artifact.derivative_bridge_rows.every(
        (row) => row.status === "conditional-derivative-bridge-row-stated"
      ),
    "artifact must emit three conditional derivative bridge rows",
    errors
  );
  assertField(
    Array.isArray(artifact?.bridge_predicate_certificate_rows) &&
      artifact.bridge_predicate_certificate_rows.length === 3 &&
      artifact.bridge_predicate_certificate_rows.every(
        (row) => row.status === "sampled-bridge-predicate-certified"
      ),
    "artifact must certify the three sampled bridge predicates",
    errors
  );
  assertField(
    artifact?.bridge_summary?.bridge_predicate_count === 3 &&
      artifact?.bridge_summary?.sampled_bridge_predicate_certified_count === 3 &&
      artifact?.bridge_summary?.status === "sampled-bridge-predicates-certified",
    "bridge summary must certify all three sampled bridge predicates",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_bridge_propagation_lemma === true &&
      artifact?.artifact_claim?.certifies_sampled_bridge_predicates === true &&
      artifact?.artifact_claim?.certifies_interval_bridge_predicates === false &&
      artifact?.artifact_claim?.certifies_interval_sign_topology === false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion === false &&
      artifact?.artifact_claim?.certifies_interval_quadrature_enclosure === false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact must certify only bridge lemma and sampled bridge predicates",
    errors
  );
  assertField(
    artifact?.result?.theory_status ===
      "sampled-source-atlas-aware-bridge-predicate-certificate-certified" &&
      artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false,
    "result must be sampled bridge predicate certified and not retained",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-bridge-predicate-certificate.mjs [options]",
    "",
    "Options:",
    "  --topology-samples-per-cell <n>    Regular-cell forcing topology samples per cell (default: 48)",
    "  --derivative-samples-per-cell <n>  Source derivative atlas samples per cell (default: 8)",
    "  --derivative-tail-samples <n>      Fold-collar derivative tail samples (default: 4)",
    "  --scan-subdivisions <n>            Primitive critical scan samples per cell (default: 96)",
    "  --source-atlas-samples <n>         Source fold atlas samples (default: 64)",
    "  --source-quadrature-panels <n>     Source critical-value quadrature panels per segment (default: 96)",
    "  --value-quadrature-panels <n>      Candidate-value quadrature panels per segment (default: 384)",
    "  --target-margin-factor <x>         Target radius factor applied to sampled budgets (default: 0.5)",
    "  --subdivisions <n>                 Root search subdivisions (default: 5000)",
    "  --out <path>                       Write artifact JSON to path instead of stdout",
    "  --validate <path>                  Validate an existing artifact JSON file",
    "  --schema                           Print the artifact schema identifier",
    "  --pretty                           Pretty-print JSON output",
    "  --help                             Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    topologySamplesPerCell: DEFAULT_TOPOLOGY_SAMPLES_PER_CELL,
    derivativeSamplesPerCell: DEFAULT_DERIVATIVE_SAMPLES_PER_CELL,
    derivativeTailSampleCount: DEFAULT_DERIVATIVE_TAIL_SAMPLE_COUNT,
    scanSamplesPerCell: DEFAULT_SCAN_SAMPLES_PER_CELL,
    sourceAtlasSampleCount: DEFAULT_SOURCE_ATLAS_SAMPLE_COUNT,
    sourceQuadraturePanelsPerSegment: DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT,
    valueQuadraturePanelsPerSegment: DEFAULT_VALUE_QUADRATURE_PANELS_PER_SEGMENT,
    targetMarginFactor: DEFAULT_TARGET_MARGIN_FACTOR,
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--schema") {
      args.schema = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--out") {
      args.out = argv[(index += 1)];
    } else if (arg === "--validate") {
      args.validate = argv[(index += 1)];
    } else if (arg === "--topology-samples-per-cell") {
      args.topologySamplesPerCell = argv[(index += 1)];
    } else if (arg === "--derivative-samples-per-cell") {
      args.derivativeSamplesPerCell = argv[(index += 1)];
    } else if (arg === "--derivative-tail-samples") {
      args.derivativeTailSampleCount = argv[(index += 1)];
    } else if (arg === "--scan-subdivisions") {
      args.scanSamplesPerCell = argv[(index += 1)];
    } else if (arg === "--source-atlas-samples") {
      args.sourceAtlasSampleCount = argv[(index += 1)];
    } else if (arg === "--source-quadrature-panels") {
      args.sourceQuadraturePanelsPerSegment = argv[(index += 1)];
    } else if (arg === "--value-quadrature-panels") {
      args.valueQuadraturePanelsPerSegment = argv[(index += 1)];
    } else if (arg === "--target-margin-factor") {
      args.targetMarginFactor = argv[(index += 1)];
    } else if (arg === "--subdivisions") {
      args.rootSubdivisions = argv[(index += 1)];
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return;
  }
  if (args.schema) {
    console.log(
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_BRIDGE_PREDICATE_CERTIFICATE_SCHEMA
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryBridgePredicateCertificate(artifact);
    if (errors.length > 0) {
      for (const error of errors) {
        console.error(error);
      }
      process.exitCode = 1;
    }
    return;
  }

  const artifact =
    buildOctahedralFoldAwareCrossBinaryBridgePredicateCertificate(args);
  const json = JSON.stringify(artifact, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.mkdirSync(path.dirname(args.out), { recursive: true });
    fs.writeFileSync(args.out, `${json}\n`);
  } else {
    console.log(json);
  }
}

if (process.argv[1] === SCRIPT_PATH) {
  main();
}
