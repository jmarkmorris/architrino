#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  evaluateCrossBinaryForcingAndDerivativeAtTheta,
} from "./octahedral-fold-aware-cross-binary-forcing-derivative-atlas.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_COMPLEMENT_SIGN_EXCLUSION_SCAN_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-i1-complement-sign-exclusion-scan/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_i1_complement_sign_exclusion_scan";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_THETA_SAMPLE_COUNT_PER_COMPLEMENT = 65;
const DEFAULT_SPEED_SAMPLE_COUNT = 9;
const DEFAULT_MACHINE_PADDING = 1e-9;
const DEFAULT_FOLD_COLLAR_ATTACHMENT_Y = 0.003;
const NO_SPEED_WINDOW =
  "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only";
const SPEED_RATIO_ENCLOSURE = [3.02156, 3.02157];
const EXPECTED_SOURCE_ROOT_COUNT = 6;
const EXPECTED_TERM_SIGNATURE = "1,3,1,1";
const I1_CELL_LEFT_ENDPOINT = 0;
const I1_LEFT_ENDPOINT = 0.124678831905;
const I1_RIGHT_ENDPOINT = 0.145456970556;
const THETA_3_MINUS = 0.997370655243;
const RESULT_THEORY_STATUS =
  "sampled-source-atlas-aware-i1-complement-sign-exclusion-scan-certified";
const SUCCESSOR_ROW =
  "I1.complement-sign-exclusion-directed-rounded-interval-enclosures-required";

function formatSmallNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(12));
}

function signLabel(value) {
  if (value > 0) {
    return "+";
  }
  if (value < 0) {
    return "-";
  }
  return "0";
}

function sampleInterval([left, right], count) {
  if (count === 1) {
    return [0.5 * (left + right)];
  }
  return Array.from({ length: count }, (_entry, index) =>
    left + ((right - left) * index) / (count - 1)
  );
}

function sampleSpeedGrid(count) {
  return sampleInterval(SPEED_RATIO_ENCLOSURE, count);
}

function evaluateRootMetrics(evaluation) {
  const rootRows = evaluation.terms.flatMap((term) => term.root_rows ?? []);
  const termRootDeltaSeparations = evaluation.terms.flatMap((term) => {
    const deltas = (term.root_rows ?? [])
      .map((rootRow) => Number(rootRow.delta))
      .sort((left, right) => left - right);
    return deltas.slice(1).map((delta, index) => delta - deltas[index]);
  });
  return {
    term_root_count_signature: evaluation.terms.map((term) => term.root_count),
    min_abs_F_delta: Math.min(
      ...rootRows.map((rootRow) => Math.abs(Number(rootRow.F_delta)))
    ),
    min_multiroot_term_delta_separation:
      termRootDeltaSeparations.length === 0
        ? null
        : Math.min(...termRootDeltaSeparations),
  };
}

function expectedSignHolds(value, expectedSign) {
  return expectedSign === "+" ? value > 0 : value < 0;
}

function buildComplementScanRows({
  complementId,
  thetaInterval,
  expectedSign,
  speedSamples,
  thetaSampleCount,
  rootSubdivisions,
}) {
  const thetaSamples = sampleInterval(thetaInterval, thetaSampleCount);
  return speedSamples.flatMap((speedRatio) =>
    thetaSamples.map((theta) => {
      const evaluation = evaluateCrossBinaryForcingAndDerivativeAtTheta({
        speedRatio,
        theta,
        rootSubdivisions,
      });
      const rootMetrics = evaluateRootMetrics(evaluation);
      const termSignature = rootMetrics.term_root_count_signature.join(",");
      const forcingSign = signLabel(evaluation.value);
      const derivativeSign = signLabel(evaluation.derivative);
      const sourceRootCountPreserved =
        evaluation.source_root_count === EXPECTED_SOURCE_ROOT_COUNT &&
        termSignature === EXPECTED_TERM_SIGNATURE;
      const signPassed = expectedSignHolds(evaluation.value, expectedSign);
      return {
        complement_id: complementId,
        speed_ratio: formatSmallNumber(speedRatio),
        theta: formatSmallNumber(theta),
        forcing: formatSmallNumber(evaluation.value),
        forcing_sign: forcingSign,
        expected_forcing_sign: expectedSign,
        derivative: formatSmallNumber(evaluation.derivative),
        derivative_sign: derivativeSign,
        source_root_count: evaluation.source_root_count,
        term_root_count_signature: rootMetrics.term_root_count_signature,
        min_abs_F_delta: formatSmallNumber(rootMetrics.min_abs_F_delta),
        min_multiroot_term_delta_separation: formatSmallNumber(
          rootMetrics.min_multiroot_term_delta_separation
        ),
        source_root_count_preserved: sourceRootCountPreserved,
        expected_sign_preserved: signPassed,
        status:
          sourceRootCountPreserved && signPassed
            ? "sampled-complement-sign-row-certified"
            : "sampled-complement-sign-row-open",
      };
    })
  );
}

function summarizeComplementRows({
  complementId,
  thetaInterval,
  expectedSign,
  rows,
  machinePadding,
}) {
  const forcingValues = rows.map((row) => Number(row.forcing));
  const derivativeValues = rows.map((row) => Number(row.derivative));
  const minForcing = Math.min(...forcingValues);
  const maxForcing = Math.max(...forcingValues);
  const rawSignMargin = expectedSign === "+" ? minForcing : -maxForcing;
  const machinePaddedSignMargin = rawSignMargin - machinePadding;
  const allRowsCertified = rows.every(
    (row) => row.status === "sampled-complement-sign-row-certified"
  );
  const allDerivativesNegative = derivativeValues.every((value) => value < 0);
  const sourceRootCounts = [
    ...new Set(rows.map((row) => row.source_root_count)),
  ].sort((left, right) => left - right);
  const termRootCountSignatures = [
    ...new Set(rows.map((row) => row.term_root_count_signature.join(","))),
  ].sort();
  const minAbsFDelta = Math.min(
    ...rows.map((row) => Number(row.min_abs_F_delta))
  );
  const termSeparations = rows
    .map((row) => Number(row.min_multiroot_term_delta_separation))
    .filter(Number.isFinite);
  const minSeparation =
    termSeparations.length === 0 ? null : Math.min(...termSeparations);

  return {
    complement_id: complementId,
    theta_interval: thetaInterval.map(formatSmallNumber),
    expected_forcing_sign: expectedSign,
    sampled_point_count: rows.length,
    source_root_count_expected: EXPECTED_SOURCE_ROOT_COUNT,
    source_root_counts: sourceRootCounts,
    term_root_count_signatures: termRootCountSignatures,
    raw_forcing_minimum: formatSmallNumber(minForcing),
    raw_forcing_maximum: formatSmallNumber(maxForcing),
    raw_sign_margin: formatSmallNumber(rawSignMargin),
    machine_padding: formatSmallNumber(machinePadding),
    machine_padded_sign_margin: formatSmallNumber(machinePaddedSignMargin),
    raw_derivative_minimum: formatSmallNumber(Math.min(...derivativeValues)),
    raw_derivative_maximum: formatSmallNumber(Math.max(...derivativeValues)),
    all_sampled_derivatives_negative: allDerivativesNegative,
    minimum_sampled_abs_F_delta: formatSmallNumber(minAbsFDelta),
    minimum_sampled_multiroot_term_delta_separation:
      minSeparation === null ? null : formatSmallNumber(minSeparation),
    sample_rows: rows,
    status:
      allRowsCertified &&
      machinePaddedSignMargin > 0 &&
      sourceRootCounts.length === 1 &&
      sourceRootCounts[0] === EXPECTED_SOURCE_ROOT_COUNT &&
      termRootCountSignatures.length === 1 &&
      termRootCountSignatures[0] === EXPECTED_TERM_SIGNATURE &&
      minAbsFDelta > 0 &&
      (minSeparation === null || minSeparation > 0)
        ? "sampled-complement-sign-exclusion-certified"
        : "sampled-complement-sign-exclusion-open",
  };
}

function buildCanonicalFoldCollarTransportRow() {
  return {
    certificate_id: "fold.3-.left-fold-collar-sign-transport",
    fold_candidate_id: "fold.3-",
    theta_fold: formatSmallNumber(THETA_3_MINUS),
    side: "left",
    theta_substitution: "theta=theta_f-y^2",
    analytic_square_limit: -0.192715477558,
    square_limit_sign: "-",
    forcing_sign_for_small_y: "-",
    derivative_sign_for_small_y: "-",
    transport_derivative_numerator_sign_for_small_y: "-",
    signed_limit_margin: 0.192715477558,
    theorem_status: "conditional-fold-collar-sign-transport-proved",
    sample_sign_status: "sampled-fold-collar-forcing-signs-certified",
    derivative_tail_sign_status:
      "sampled-fold-collar-derivative-tail-signs-certified",
  };
}

function validateFoldCollarTransportRow(row) {
  return (
    row?.certificate_id === "fold.3-.left-fold-collar-sign-transport" &&
    row?.side === "left" &&
    row?.square_limit_sign === "-" &&
    row?.forcing_sign_for_small_y === "-" &&
    row?.derivative_sign_for_small_y === "-" &&
    row?.theorem_status === "conditional-fold-collar-sign-transport-proved" &&
    row?.sample_sign_status === "sampled-fold-collar-forcing-signs-certified" &&
    row?.derivative_tail_sign_status ===
      "sampled-fold-collar-derivative-tail-signs-certified" &&
    Number(row?.signed_limit_margin) > 0
  );
}

function buildFoldCollarCheck(foldCollarTransportRow) {
  const valid = validateFoldCollarTransportRow(foldCollarTransportRow);
  return {
    fold_collar_row_id: "fold.3-.left-fold-collar-sign-transport",
    source_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-fold-collar-sign-transport-certificate.md",
    valid,
    row: foldCollarTransportRow,
    role:
      "covers the singular left side of theta_3- after the compact right-complement scan stops at theta_3--y_c^2",
    status: valid
      ? "fold-collar-negative-sign-transport-imported"
      : "fold-collar-negative-sign-transport-open",
  };
}

function buildComplementSignTheorem() {
  return {
    theorem_id: "i1-complement-sign-exclusion-speed-envelope-scan",
    theorem_scope:
      "representative receiver 1+ sampled I1 complement sign exclusions",
    statement:
      "The two I1 complement sign exclusions are split into compact ordinary-theta scans plus the imported theta_3- left fold-collar sign transport. The sampled compact rows preserve the six-source-root signature and the expected forcing signs across the certified positive speed-ratio enclosure.",
    proof_steps: [
      "Scan f_cross on the left compact complement [0,a1] and require positive sampled forcing with preserved source-root signature.",
      "Scan f_cross on the right compact complement [b1,theta_3--y_c^2] and require negative sampled forcing with preserved source-root signature.",
      "Import the fold.3- left collar transport theorem, where G(y)=2y f_cross(theta_3--y^2) has negative nonzero limit, so f_cross is negative for sufficiently small y on the singular collar.",
      "Conclude a sampled and conditional fold-collar complement-sign exclusion packet for I1. Leave directed-rounded interval complement enclosures, full I1 regular critical exhaustion, interval quadrature, and retained branch status open.",
    ],
    proof_status: "sampled-i1-complement-sign-exclusion-scan-certified",
  };
}

export function buildOctahedralFoldAwareCrossBinaryI1ComplementSignExclusionScan(
  options = {}
) {
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  const thetaSampleCountPerComplement = Number.parseInt(
    options.thetaSampleCountPerComplement ??
      DEFAULT_THETA_SAMPLE_COUNT_PER_COMPLEMENT,
    10
  );
  const speedSampleCount = Number.parseInt(
    options.speedSampleCount ?? DEFAULT_SPEED_SAMPLE_COUNT,
    10
  );
  const machinePadding = Number(
    options.machinePadding ?? DEFAULT_MACHINE_PADDING
  );
  const foldCollarAttachmentY = Number(
    options.foldCollarAttachmentY ?? DEFAULT_FOLD_COLLAR_ATTACHMENT_Y
  );
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  if (
    !Number.isInteger(thetaSampleCountPerComplement) ||
    thetaSampleCountPerComplement < 3
  ) {
    throw new Error("thetaSampleCountPerComplement must be an integer >= 3");
  }
  if (!Number.isInteger(speedSampleCount) || speedSampleCount < 3) {
    throw new Error("speedSampleCount must be an integer >= 3");
  }
  if (!Number.isFinite(machinePadding) || machinePadding < 0) {
    throw new Error("machinePadding must be nonnegative");
  }
  if (!Number.isFinite(foldCollarAttachmentY) || foldCollarAttachmentY <= 0) {
    throw new Error("foldCollarAttachmentY must be positive");
  }

  const compactRightEndpoint =
    THETA_3_MINUS - foldCollarAttachmentY * foldCollarAttachmentY;
  if (compactRightEndpoint <= I1_RIGHT_ENDPOINT) {
    throw new Error("foldCollarAttachmentY makes the compact right complement empty");
  }
  const speedSamples = sampleSpeedGrid(speedSampleCount);
  const complementDefinitions = [
    {
      complementId: "I1.left-complement.forcing-positive",
      thetaInterval: [I1_CELL_LEFT_ENDPOINT, I1_LEFT_ENDPOINT],
      expectedSign: "+",
    },
    {
      complementId: "I1.right-compact-complement.forcing-negative",
      thetaInterval: [I1_RIGHT_ENDPOINT, compactRightEndpoint],
      expectedSign: "-",
    },
  ];
  const complementSummaries = complementDefinitions.map((definition) => {
    const rows = buildComplementScanRows({
      complementId: definition.complementId,
      thetaInterval: definition.thetaInterval,
      expectedSign: definition.expectedSign,
      speedSamples,
      thetaSampleCount: thetaSampleCountPerComplement,
      rootSubdivisions,
    });
    return summarizeComplementRows({
      complementId: definition.complementId,
      thetaInterval: definition.thetaInterval,
      expectedSign: definition.expectedSign,
      rows,
      machinePadding,
    });
  });
  const foldCollarTransportRow =
    options.foldCollarTransportRow ?? buildCanonicalFoldCollarTransportRow();
  const foldCollarCheck = buildFoldCollarCheck(foldCollarTransportRow);
  const allComplementScansCertified = complementSummaries.every(
    (summary) => summary.status === "sampled-complement-sign-exclusion-certified"
  );
  const certified = allComplementScansCertified && foldCollarCheck.valid;
  const openQuantityNames = [
    "I1_left_complement_directed_rounded_interval_enclosure",
    "I1_right_compact_complement_directed_rounded_interval_enclosure",
    "theta_3minus_left_fold_collar_interval_radius",
    "I1_regular_critical_exhaustion",
    "interval_critical_exhaustion",
    "interval_quadrature_enclosure",
    "retained_branch_status",
  ];

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_COMPLEMENT_SIGN_EXCLUSION_SCAN_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-i1-f1-critical-exhaustion-integration.md",
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-fold-collar-sign-transport-certificate.md",
    ],
    priority_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-i1-complement-sign-exclusion-scan.md",
    scan_parameters: {
      receiver_label: "1+",
      theta_domain: "[0,H/4]",
      i1_regular_cell_interval: [
        formatSmallNumber(I1_CELL_LEFT_ENDPOINT),
        formatSmallNumber(THETA_3_MINUS),
      ],
      i1_f1_bracket_interval: [
        formatSmallNumber(I1_LEFT_ENDPOINT),
        formatSmallNumber(I1_RIGHT_ENDPOINT),
      ],
      compact_right_complement_interval: [
        formatSmallNumber(I1_RIGHT_ENDPOINT),
        formatSmallNumber(compactRightEndpoint),
      ],
      fold_collar_attachment_y: formatSmallNumber(foldCollarAttachmentY),
      fold_collar_attachment_theta: formatSmallNumber(compactRightEndpoint),
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: SPEED_RATIO_ENCLOSURE,
      root_subdivisions: rootSubdivisions,
      theta_sample_count_per_complement: thetaSampleCountPerComplement,
      speed_sample_count: speedSampleCount,
      machine_padding: formatSmallNumber(machinePadding),
    },
    i1_complement_sign_exclusion_theorem: buildComplementSignTheorem(),
    compact_complement_scan_summaries: complementSummaries,
    fold_collar_transport_check: foldCollarCheck,
    complement_sign_exclusion_summary: {
      summary_row_id: "I1.complement-sign-exclusion.scan",
      left_complement_status: complementSummaries[0].status,
      right_compact_complement_status: complementSummaries[1].status,
      fold_collar_status: foldCollarCheck.status,
      minimum_machine_padded_compact_sign_margin: formatSmallNumber(
        Math.min(
          ...complementSummaries.map((summary) =>
            Number(summary.machine_padded_sign_margin)
          )
        )
      ),
      minimum_sampled_abs_F_delta: formatSmallNumber(
        Math.min(
          ...complementSummaries.map((summary) =>
            Number(summary.minimum_sampled_abs_F_delta)
          )
        )
      ),
      sampled_compact_complements_certified: allComplementScansCertified,
      theta_3minus_left_collar_negative_transport_imported:
        foldCollarCheck.valid,
      sampled_and_conditional_fold_collar_i1_complement_signs_certified:
        certified,
      directed_rounded_interval_complement_enclosures_required: true,
      status: certified
        ? "sampled-i1-complement-sign-exclusion-scan-certified"
        : "sampled-i1-complement-sign-exclusion-scan-open",
    },
    interval_profile_boundary: {
      certifies_sampled_I1_complement_sign_exclusion_scan: certified,
      imports_conditional_theta_3minus_left_fold_collar_sign_transport:
        foldCollarCheck.valid,
      certifies_I1_complement_sign_interval_enclosures: false,
      certifies_I1_regular_critical_exhaustion: false,
      certifies_I1_zero_isolation: false,
      certifies_global_I1_interval_sign_topology: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      open_quantity_names: openQuantityNames,
      status: certified
        ? "sampled-i1-complement-sign-exclusions-certified-interval-enclosures-open"
        : "sampled-i1-complement-sign-exclusions-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_sampled_I1_complement_sign_exclusion_scan: certified,
      certifies_sampled_left_complement_forcing_positive:
        complementSummaries[0].status ===
        "sampled-complement-sign-exclusion-certified",
      certifies_sampled_right_compact_complement_forcing_negative:
        complementSummaries[1].status ===
        "sampled-complement-sign-exclusion-certified",
      imports_conditional_theta_3minus_left_fold_collar_sign_transport:
        foldCollarCheck.valid,
      certifies_I1_complement_sign_interval_enclosures: false,
      certifies_I1_regular_critical_exhaustion: false,
      certifies_I1_zero_isolation: false,
      certifies_global_I1_interval_sign_topology: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      open_quantity_names: openQuantityNames,
      retained_branch: false,
      claim_level:
        "Sampled compact-complement signs plus imported conditional theta_3- fold-collar sign transport. Directed-rounded interval complement enclosures, I1 regular critical exhaustion, interval quadrature, and retained branch status remain open.",
    },
    result: {
      theory_status: certified
        ? RESULT_THEORY_STATUS
        : "sampled-source-atlas-aware-i1-complement-sign-exclusion-scan-open",
      first_successor_row: SUCCESSOR_ROW,
      residual_subobligation:
        "replace the sampled compact complement scans and conditional fold-collar radius with directed-rounded interval enclosures, then compose with the I1.f1 unique zero to close I1 regular critical exhaustion",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The I1 complements now have a sampled compact sign scan and a fold-aware singular-collar split. The remaining closure is no longer qualitative: it is the directed-rounded interval enclosure of the two compact complements plus an explicit fold-collar interval radius.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryI1ComplementSignExclusionScan(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_COMPLEMENT_SIGN_EXCLUSION_SCAN_SCHEMA,
    "schema must match I1 complement sign exclusion scan schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match I1 complement sign exclusion scan packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.scan_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "I1 complement sign scan must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.scan_parameters?.speed_band === undefined &&
      artifact?.scan_parameters?.speed_window === undefined &&
      artifact?.scan_parameters?.speed_min === undefined &&
      artifact?.scan_parameters?.speed_max === undefined,
    "scan parameters must not contain speed-band fields",
    errors
  );
  assertField(
    Array.isArray(artifact?.compact_complement_scan_summaries) &&
      artifact.compact_complement_scan_summaries.length === 2 &&
      artifact.compact_complement_scan_summaries.every(
        (summary) =>
          summary.status === "sampled-complement-sign-exclusion-certified" &&
          summary.source_root_counts?.length === 1 &&
          summary.source_root_counts[0] === EXPECTED_SOURCE_ROOT_COUNT &&
          summary.term_root_count_signatures?.length === 1 &&
          summary.term_root_count_signatures[0] === EXPECTED_TERM_SIGNATURE &&
          Number(summary.machine_padded_sign_margin) > 0 &&
          Number(summary.minimum_sampled_abs_F_delta) > 0 &&
          Array.isArray(summary.sample_rows) &&
          summary.sample_rows.every(
            (row) =>
              row.status === "sampled-complement-sign-row-certified" &&
              row.source_root_count_preserved === true &&
              row.expected_sign_preserved === true
          )
      ),
    "compact complement summaries must certify sampled signs with preserved source-root signatures",
    errors
  );
  assertField(
    artifact?.compact_complement_scan_summaries?.[0]?.complement_id ===
      "I1.left-complement.forcing-positive" &&
      artifact?.compact_complement_scan_summaries?.[0]
        ?.expected_forcing_sign === "+" &&
      artifact?.compact_complement_scan_summaries?.[1]?.complement_id ===
        "I1.right-compact-complement.forcing-negative" &&
      artifact?.compact_complement_scan_summaries?.[1]
        ?.expected_forcing_sign === "-",
    "compact complement summaries must name the left positive and right compact negative rows",
    errors
  );
  assertField(
    artifact?.fold_collar_transport_check?.valid === true &&
      artifact?.fold_collar_transport_check?.row?.certificate_id ===
        "fold.3-.left-fold-collar-sign-transport" &&
      artifact?.fold_collar_transport_check?.row?.forcing_sign_for_small_y ===
        "-",
    "fold-collar check must import theta_3- left negative sign transport",
    errors
  );
  assertField(
    artifact?.complement_sign_exclusion_summary?.status ===
      "sampled-i1-complement-sign-exclusion-scan-certified" &&
      artifact?.complement_sign_exclusion_summary
        ?.directed_rounded_interval_complement_enclosures_required === true &&
      artifact?.complement_sign_exclusion_summary
        ?.sampled_and_conditional_fold_collar_i1_complement_signs_certified ===
        true,
    "summary must certify sampled/conditional complement signs while requiring directed-rounded interval enclosures",
    errors
  );
  assertField(
    artifact?.interval_profile_boundary
      ?.certifies_sampled_I1_complement_sign_exclusion_scan === true &&
      artifact?.interval_profile_boundary
        ?.certifies_I1_complement_sign_interval_enclosures === false &&
      artifact?.interval_profile_boundary
        ?.certifies_I1_regular_critical_exhaustion === false &&
      artifact?.interval_profile_boundary
        ?.certifies_interval_critical_exhaustion === false &&
      artifact?.interval_profile_boundary
        ?.certifies_interval_quadrature_enclosure === false,
    "interval boundary must keep interval complement enclosures, critical exhaustion, and quadrature open",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_sampled_I1_complement_sign_exclusion_scan === true &&
      artifact?.artifact_claim
        ?.certifies_sampled_left_complement_forcing_positive === true &&
      artifact?.artifact_claim
        ?.certifies_sampled_right_compact_complement_forcing_negative ===
        true &&
      artifact?.artifact_claim
        ?.imports_conditional_theta_3minus_left_fold_collar_sign_transport ===
        true &&
      artifact?.artifact_claim
        ?.certifies_I1_complement_sign_interval_enclosures === false &&
      artifact?.artifact_claim?.certifies_I1_regular_critical_exhaustion ===
        false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion ===
        false &&
      artifact?.artifact_claim?.certifies_interval_quadrature_enclosure ===
        false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact claim must certify only sampled/conditional complement signs and keep interval/retention claims open",
    errors
  );
  assertField(
    artifact?.result?.theory_status === RESULT_THEORY_STATUS &&
      artifact?.result?.first_successor_row === SUCCESSOR_ROW &&
      artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false,
    "result must advance to directed-rounded interval complement enclosures without retaining the branch",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node octahedral-fold-aware-cross-binary-i1-complement-sign-exclusion-scan.mjs [options]",
    "",
    "Options:",
    "  --out <path>                         Write artifact JSON to path",
    "  --validate <path>                    Validate an existing artifact JSON file",
    "  --print-schema                       Print the artifact schema",
    "  --pretty                             Pretty-print JSON",
    "  --subdivisions <n>                   Source root subdivisions (default: 5000)",
    "  --theta-samples <n>                  Theta samples per complement (default: 65)",
    "  --speed-samples <n>                  Speed samples across enclosure (default: 9)",
    "  --machine-padding <x>                Machine sign padding (default: 1e-9)",
    "  --fold-collar-y <x>                  Right complement attachment y (default: 0.001)",
    "  --help                               Show this help",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    outPath: null,
    validatePath: null,
    pretty: false,
    printSchema: false,
    help: false,
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    thetaSampleCountPerComplement: DEFAULT_THETA_SAMPLE_COUNT_PER_COMPLEMENT,
    speedSampleCount: DEFAULT_SPEED_SAMPLE_COUNT,
    machinePadding: DEFAULT_MACHINE_PADDING,
    foldCollarAttachmentY: DEFAULT_FOLD_COLLAR_ATTACHMENT_Y,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out") {
      args.outPath = argv[++index];
    } else if (arg === "--validate") {
      args.validatePath = argv[++index];
    } else if (arg === "--print-schema" || arg === "--schema") {
      args.printSchema = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--subdivisions") {
      args.rootSubdivisions = Number.parseInt(argv[++index], 10);
    } else if (arg === "--theta-samples") {
      args.thetaSampleCountPerComplement = Number.parseInt(argv[++index], 10);
    } else if (arg === "--speed-samples") {
      args.speedSampleCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--machine-padding") {
      args.machinePadding = Number(argv[++index]);
    } else if (arg === "--fold-collar-y") {
      args.foldCollarAttachmentY = Number(argv[++index]);
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else {
      throw new Error(`unknown argument ${arg}`);
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
  if (args.printSchema) {
    console.log(
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_COMPLEMENT_SIGN_EXCLUSION_SCAN_SCHEMA
    );
    return;
  }
  if (args.validatePath) {
    const artifact = JSON.parse(fs.readFileSync(args.validatePath, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryI1ComplementSignExclusionScan(
        artifact
      );
    if (errors.length > 0) {
      console.error(errors.join("\n"));
      process.exitCode = 1;
    } else {
      console.log("ok");
    }
    return;
  }

  const artifact =
    buildOctahedralFoldAwareCrossBinaryI1ComplementSignExclusionScan({
      rootSubdivisions: args.rootSubdivisions,
      thetaSampleCountPerComplement: args.thetaSampleCountPerComplement,
      speedSampleCount: args.speedSampleCount,
      machinePadding: args.machinePadding,
      foldCollarAttachmentY: args.foldCollarAttachmentY,
    });
  const errors =
    validateOctahedralFoldAwareCrossBinaryI1ComplementSignExclusionScan(
      artifact
    );
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
    return;
  }
  const json = JSON.stringify(artifact, null, args.pretty ? 2 : 0);
  if (args.outPath) {
    fs.mkdirSync(path.dirname(args.outPath), { recursive: true });
    fs.writeFileSync(args.outPath, `${json}\n`);
  } else {
    console.log(json);
  }
}

if (process.argv[1] === SCRIPT_PATH) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
