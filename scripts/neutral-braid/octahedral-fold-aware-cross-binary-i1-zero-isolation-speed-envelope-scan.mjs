#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  evaluateCrossBinaryForcingAndDerivativeAtTheta,
} from "./octahedral-fold-aware-cross-binary-forcing-derivative-atlas.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryI1DerivativeNegativeSpeedEnvelopeScan,
  validateOctahedralFoldAwareCrossBinaryI1DerivativeNegativeSpeedEnvelopeScan,
} from "./octahedral-fold-aware-cross-binary-i1-derivative-negative-speed-envelope-scan.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryI1ForcingBracketIntervalEnclosure,
  validateOctahedralFoldAwareCrossBinaryI1ForcingBracketIntervalEnclosure,
} from "./octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_ZERO_ISOLATION_SPEED_ENVELOPE_SCAN_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_i1_zero_isolation_speed_envelope_scan";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_SPEED_SAMPLE_COUNT = 9;
const DEFAULT_DERIVATIVE_THETA_SAMPLE_COUNT = 48;
const DEFAULT_ENDPOINT_PADDING = 1e-5;
const DEFAULT_MACHINE_PADDING = 1e-9;
const DEFAULT_BISECTION_TOLERANCE = 1e-12;
const DEFAULT_MAX_BISECTION_STEPS = 80;
const NO_SPEED_WINDOW =
  "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only";
const SPEED_RATIO_ENCLOSURE = [3.02156, 3.02157];
const I1_LEFT_ENDPOINT = 0.124678831905;
const I1_RIGHT_ENDPOINT = 0.145456970556;
const EXPECTED_SOURCE_ROOT_COUNT = 6;

function formatSmallNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(12));
}

function sampleSpeedGrid({ speedRatioEnclosure, speedSampleCount }) {
  const [left, right] = speedRatioEnclosure;
  if (speedSampleCount === 1) {
    return [0.5 * (left + right)];
  }
  return Array.from({ length: speedSampleCount }, (_, index) =>
    left + ((right - left) * index) / (speedSampleCount - 1)
  );
}

function evaluateAt({ speedRatio, theta, rootSubdivisions }) {
  return evaluateCrossBinaryForcingAndDerivativeAtTheta({
    speedRatio,
    theta,
    rootSubdivisions,
  });
}

function bisectForcingRoot({
  speedRatio,
  left,
  right,
  rootSubdivisions,
  bisectionTolerance,
  maxBisectionSteps,
}) {
  let a = left;
  let b = right;
  let leftEval = evaluateAt({ speedRatio, theta: a, rootSubdivisions });
  let rightEval = evaluateAt({ speedRatio, theta: b, rootSubdivisions });
  let fa = leftEval.value;
  const fb = rightEval.value;

  if (!(fa > 0 && fb < 0)) {
    throw new Error("I1 bracket endpoints must satisfy f(left)>0>f(right)");
  }

  let rootTheta = 0.5 * (a + b);
  let rootEval = evaluateAt({
    speedRatio,
    theta: rootTheta,
    rootSubdivisions,
  });
  let steps = 0;
  for (; steps < maxBisectionSteps; steps += 1) {
    rootTheta = 0.5 * (a + b);
    rootEval = evaluateAt({
      speedRatio,
      theta: rootTheta,
      rootSubdivisions,
    });
    if (
      Math.abs(rootEval.value) <= bisectionTolerance ||
      Math.abs(b - a) <= bisectionTolerance
    ) {
      break;
    }
    if (fa * rootEval.value <= 0) {
      b = rootTheta;
      rightEval = rootEval;
    } else {
      a = rootTheta;
      fa = rootEval.value;
      leftEval = rootEval;
    }
  }

  return {
    left_bracket_theta: leftEval.theta ?? a,
    right_bracket_theta: rightEval.theta ?? b,
    root_theta: rootTheta,
    root_evaluation: rootEval,
    bisection_steps: steps + 1,
    final_bracket_width: Math.abs(b - a),
  };
}

function buildRootBranchRows({
  speedSamples,
  rootSubdivisions,
  bisectionTolerance,
  maxBisectionSteps,
}) {
  return speedSamples.map((speedRatio) => {
    const leftEndpoint = evaluateAt({
      speedRatio,
      theta: I1_LEFT_ENDPOINT,
      rootSubdivisions,
    });
    const rightEndpoint = evaluateAt({
      speedRatio,
      theta: I1_RIGHT_ENDPOINT,
      rootSubdivisions,
    });
    const root = bisectForcingRoot({
      speedRatio,
      left: I1_LEFT_ENDPOINT,
      right: I1_RIGHT_ENDPOINT,
      rootSubdivisions,
      bisectionTolerance,
      maxBisectionSteps,
    });
    const rootEval = root.root_evaluation;
    const rootInsideBracket =
      root.root_theta > I1_LEFT_ENDPOINT && root.root_theta < I1_RIGHT_ENDPOINT;
    const sourceRootCountPreserved =
      rootEval.source_root_count === EXPECTED_SOURCE_ROOT_COUNT &&
      leftEndpoint.source_root_count === EXPECTED_SOURCE_ROOT_COUNT &&
      rightEndpoint.source_root_count === EXPECTED_SOURCE_ROOT_COUNT;
    const termRootCountSignature = rootEval.terms.map((term) => term.root_count);
    const rootRows = rootEval.terms.flatMap((term) => term.root_rows ?? []);
    const minAbsFDelta = Math.min(
      ...rootRows.map((rootRow) => Math.abs(Number(rootRow.F_delta)))
    );
    const termRootDeltaSeparations = rootEval.terms.flatMap((term) => {
      const deltas = (term.root_rows ?? [])
        .map((rootRow) => Number(rootRow.delta))
        .sort((left, right) => left - right);
      return deltas.slice(1).map((delta, index) => delta - deltas[index]);
    });
    const minMultirootTermDeltaSeparation =
      termRootDeltaSeparations.length > 0
        ? Math.min(...termRootDeltaSeparations)
        : null;
    const bracketSignsPreserved =
      leftEndpoint.value > 0 && rightEndpoint.value < 0;
    const rootResidual = Math.abs(rootEval.value);
    const derivativeAtRootNegative = rootEval.derivative < 0;

    return {
      speed_ratio: formatSmallNumber(speedRatio),
      bracket_left_theta: formatSmallNumber(I1_LEFT_ENDPOINT),
      bracket_right_theta: formatSmallNumber(I1_RIGHT_ENDPOINT),
      left_forcing: formatSmallNumber(leftEndpoint.value),
      right_forcing: formatSmallNumber(rightEndpoint.value),
      root_theta: formatSmallNumber(root.root_theta),
      root_forcing: formatSmallNumber(rootEval.value),
      root_forcing_abs: formatSmallNumber(rootResidual),
      root_derivative: formatSmallNumber(rootEval.derivative),
      source_root_count: rootEval.source_root_count,
      endpoint_source_root_counts: [
        leftEndpoint.source_root_count,
        rightEndpoint.source_root_count,
      ],
      term_root_count_signature: termRootCountSignature,
      min_abs_F_delta: formatSmallNumber(minAbsFDelta),
      min_multiroot_term_delta_separation: formatSmallNumber(
        minMultirootTermDeltaSeparation
      ),
      term_root_counts: rootEval.terms.map((term) => ({
        term_label: term.term_label,
        root_count: term.root_count,
      })),
      bisection_steps: root.bisection_steps,
      final_bracket_width: formatSmallNumber(root.final_bracket_width),
      root_inside_bracket: rootInsideBracket,
      bracket_signs_preserved: bracketSignsPreserved,
      derivative_at_root_negative: derivativeAtRootNegative,
      source_root_count_preserved: sourceRootCountPreserved,
      status:
        rootInsideBracket &&
        bracketSignsPreserved &&
        derivativeAtRootNegative &&
        sourceRootCountPreserved &&
        rootResidual <= bisectionTolerance
          ? "i1-f1-sampled-simple-root-certified"
          : "i1-f1-sampled-simple-root-open",
    };
  });
}

function strictlyDecreases(values) {
  return values.every((value, index) => index === 0 || value < values[index - 1]);
}

function buildRootBranchSummary({ rootBranchRows, bisectionTolerance }) {
  const rootValues = rootBranchRows.map((row) => Number(row.root_theta));
  const derivativeValues = rootBranchRows.map((row) => Number(row.root_derivative));
  const residualValues = rootBranchRows.map((row) => Number(row.root_forcing_abs));
  const fDeltaMargins = rootBranchRows.map((row) => Number(row.min_abs_F_delta));
  const termDeltaSeparations = rootBranchRows
    .map((row) => Number(row.min_multiroot_term_delta_separation))
    .filter(Number.isFinite);
  const signatureSet = [
    ...new Set(
      rootBranchRows.map((row) => row.term_root_count_signature.join(","))
    ),
  ].sort();
  const sourceRootCounts = [
    ...new Set(rootBranchRows.map((row) => row.source_root_count)),
  ].sort((left, right) => left - right);
  const rootEnvelopeLower = Math.min(...rootValues) - bisectionTolerance;
  const rootEnvelopeUpper = Math.max(...rootValues) + bisectionTolerance;
  const derivativeEnvelopeLower =
    Math.min(...derivativeValues) - bisectionTolerance;
  const derivativeEnvelopeUpper =
    Math.max(...derivativeValues) + bisectionTolerance;
  const rootBranchDecreases = strictlyDecreases(rootValues);
  const allRowsCertified = rootBranchRows.every(
    (row) => row.status === "i1-f1-sampled-simple-root-certified"
  );

  return {
    zero_row_id: "I1.f1.zero-isolation.speed-envelope-scan",
    derivative_row_id: "I1.derivative-negative.full-cell.speed-envelope-scan",
    forcing_bracket_row_id: "I1.forcing-bracket",
    speed_sample_count: rootBranchRows.length,
    sampled_root_count: rootBranchRows.length,
    source_root_count_expected: EXPECTED_SOURCE_ROOT_COUNT,
    source_root_counts: sourceRootCounts,
    term_root_count_signatures: signatureSet,
    source_root_count_preserved:
      sourceRootCounts.length === 1 &&
      sourceRootCounts[0] === EXPECTED_SOURCE_ROOT_COUNT,
    root_theta_envelope: [
      formatSmallNumber(rootEnvelopeLower),
      formatSmallNumber(rootEnvelopeUpper),
    ],
    root_theta_span: formatSmallNumber(Math.max(...rootValues) - Math.min(...rootValues)),
    root_derivative_envelope: [
      formatSmallNumber(derivativeEnvelopeLower),
      formatSmallNumber(derivativeEnvelopeUpper),
    ],
    max_root_forcing_abs: formatSmallNumber(Math.max(...residualValues)),
    min_abs_F_delta: formatSmallNumber(Math.min(...fDeltaMargins)),
    min_multiroot_term_delta_separation: formatSmallNumber(
      Math.min(...termDeltaSeparations)
    ),
    bisection_tolerance: formatSmallNumber(bisectionTolerance),
    sampled_root_branch_monotone_decreasing_in_speed: rootBranchDecreases,
    certified_root_rows: rootBranchRows.filter(
      (row) => row.status === "i1-f1-sampled-simple-root-certified"
    ).length,
    status:
      allRowsCertified &&
      rootBranchDecreases &&
      signatureSet.length === 1 &&
      signatureSet[0] === "1,3,1,1" &&
      Math.min(...fDeltaMargins) > 0 &&
      Math.min(...termDeltaSeparations) > 0 &&
      derivativeEnvelopeUpper < 0
        ? "i1-f1-zero-isolation-speed-envelope-scan-certified"
        : "i1-f1-zero-isolation-speed-envelope-scan-open",
  };
}

function buildCompositionTheorem() {
  return {
    theorem_id: "i1-f1-zero-isolation-speed-envelope-scan-composition",
    theorem_scope: "representative receiver 1+ sampled I1 forcing-zero branch",
    statement:
      "The certified I1 endpoint point signs, the negative derivative speed-envelope scan, and direct bisection roots compose into a sampled speed-envelope zero-isolation certificate for I1.f1. The result tracks one simple root inside the I1 bracket at every sampled speed in the certified speed-ratio enclosure, but does not prove full continuous interval zero isolation.",
    proof_steps: [
      "Import the I1 forcing-bracket endpoint sign certificate f_cross(a1)>0>f_cross(b1).",
      "Import the I1 derivative-negative speed-envelope scan on the compact regular I1 core.",
      "For each sampled speed in the certified speed-ratio enclosure, bisect the bracket [a1,b1] and require a forcing residual below the bisection tolerance.",
      "Check that the bisection root stays inside the bracket, has six source roots, and has negative derivative.",
      "Record the sampled root-theta envelope and monotone-decreasing sampled root branch in speed.",
      "Conclude only a sampled speed-envelope zero-isolation certificate; leave full directed-rounding interval derivative enclosure and full I1.f1 zero isolation open.",
    ],
    proof_status: "sampled-speed-envelope-zero-isolation-composition-certified",
  };
}

export function buildOctahedralFoldAwareCrossBinaryI1ZeroIsolationSpeedEnvelopeScan(
  options = {}
) {
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  const speedSampleCount = Number.parseInt(
    options.speedSampleCount ?? DEFAULT_SPEED_SAMPLE_COUNT,
    10
  );
  const derivativeThetaSampleCount = Number.parseInt(
    options.derivativeThetaSampleCount ?? DEFAULT_DERIVATIVE_THETA_SAMPLE_COUNT,
    10
  );
  const endpointPadding = Number(
    options.endpointPadding ?? DEFAULT_ENDPOINT_PADDING
  );
  const machinePadding = Number(
    options.machinePadding ?? DEFAULT_MACHINE_PADDING
  );
  const bisectionTolerance = Number(
    options.bisectionTolerance ?? DEFAULT_BISECTION_TOLERANCE
  );
  const maxBisectionSteps = Number.parseInt(
    options.maxBisectionSteps ?? DEFAULT_MAX_BISECTION_STEPS,
    10
  );

  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  if (!Number.isInteger(speedSampleCount) || speedSampleCount < 3) {
    throw new Error("speedSampleCount must be an integer >= 3");
  }
  if (
    !Number.isInteger(derivativeThetaSampleCount) ||
    derivativeThetaSampleCount < 8
  ) {
    throw new Error("derivativeThetaSampleCount must be an integer >= 8");
  }
  if (!Number.isFinite(endpointPadding) || endpointPadding <= 0) {
    throw new Error("endpointPadding must be positive");
  }
  if (!Number.isFinite(machinePadding) || machinePadding <= 0) {
    throw new Error("machinePadding must be positive");
  }
  if (!Number.isFinite(bisectionTolerance) || bisectionTolerance <= 0) {
    throw new Error("bisectionTolerance must be positive");
  }
  if (!Number.isInteger(maxBisectionSteps) || maxBisectionSteps < 20) {
    throw new Error("maxBisectionSteps must be an integer >= 20");
  }

  const forcingBracketPacket =
    buildOctahedralFoldAwareCrossBinaryI1ForcingBracketIntervalEnclosure({
      rootSubdivisions,
      speedSampleCount,
      machinePadding,
    });
  const derivativeScanPacket =
    buildOctahedralFoldAwareCrossBinaryI1DerivativeNegativeSpeedEnvelopeScan({
      rootSubdivisions,
      thetaSampleCount: derivativeThetaSampleCount,
      speedSampleCount,
      endpointPadding,
      machinePadding,
    });
  const forcingBracketErrors =
    validateOctahedralFoldAwareCrossBinaryI1ForcingBracketIntervalEnclosure(
      forcingBracketPacket
    );
  const derivativeScanErrors =
    validateOctahedralFoldAwareCrossBinaryI1DerivativeNegativeSpeedEnvelopeScan(
      derivativeScanPacket
    );
  const speedSamples = sampleSpeedGrid({
    speedRatioEnclosure: SPEED_RATIO_ENCLOSURE,
    speedSampleCount,
  });
  const rootBranchRows = buildRootBranchRows({
    speedSamples,
    rootSubdivisions,
    bisectionTolerance,
    maxBisectionSteps,
  });
  const rootBranchSummary = buildRootBranchSummary({
    rootBranchRows,
    bisectionTolerance,
  });
  const certified =
    forcingBracketErrors.length === 0 &&
    derivativeScanErrors.length === 0 &&
    forcingBracketPacket.artifact_claim
      .certifies_I1_forcing_bracket_point_signs === true &&
    derivativeScanPacket.artifact_claim
      .certifies_I1_derivative_negative_speed_envelope_scan === true &&
    rootBranchSummary.status ===
      "i1-f1-zero-isolation-speed-envelope-scan-certified";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_ZERO_ISOLATION_SPEED_ENVELOPE_SCAN_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure.md",
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-i1-derivative-negative-speed-envelope-scan.md",
    ],
    priority_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan.md",
    forcing_bracket_certificate_check: {
      schema: forcingBracketPacket.schema,
      valid: forcingBracketErrors.length === 0,
      errors: forcingBracketErrors,
      theory_status: forcingBracketPacket.result.theory_status,
      retained_branch: forcingBracketPacket.result.retained_branch,
      certifies_I1_forcing_bracket_point_signs:
        forcingBracketPacket.artifact_claim
          .certifies_I1_forcing_bracket_point_signs === true,
      certifies_I1_zero_isolation:
        forcingBracketPacket.artifact_claim.certifies_I1_zero_isolation === true,
    },
    derivative_negative_scan_check: {
      schema: derivativeScanPacket.schema,
      valid: derivativeScanErrors.length === 0,
      errors: derivativeScanErrors,
      theory_status: derivativeScanPacket.result.theory_status,
      retained_branch: derivativeScanPacket.result.retained_branch,
      certifies_I1_derivative_negative_speed_envelope_scan:
        derivativeScanPacket.artifact_claim
          .certifies_I1_derivative_negative_speed_envelope_scan === true,
      certifies_interval_derivative_enclosure:
        derivativeScanPacket.artifact_claim
          .certifies_interval_derivative_enclosure === true,
      derivative_scan_summary: derivativeScanPacket.derivative_scan_summary,
    },
    scan_parameters: {
      receiver_label: "1+",
      zero_row_id: "I1.f1",
      theta_domain: "[0,H/4]",
      bracket_interval: [
        formatSmallNumber(I1_LEFT_ENDPOINT),
        formatSmallNumber(I1_RIGHT_ENDPOINT),
      ],
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: SPEED_RATIO_ENCLOSURE,
      root_subdivisions: rootSubdivisions,
      speed_sample_count: speedSampleCount,
      derivative_theta_sample_count: derivativeThetaSampleCount,
      endpoint_padding: formatSmallNumber(endpointPadding),
      machine_padding: formatSmallNumber(machinePadding),
      bisection_tolerance: formatSmallNumber(bisectionTolerance),
      max_bisection_steps: maxBisectionSteps,
    },
    i1_zero_isolation_speed_envelope_theorem: buildCompositionTheorem(),
    root_branch_rows: rootBranchRows,
    root_branch_summary: rootBranchSummary,
    interval_profile_boundary: {
      certifies_I1_f1_zero_isolation_speed_envelope_scan: certified,
      certifies_I1_f1_root_branch_speed_envelope_scan: certified,
      certifies_I1_f1_full_interval_zero_isolation: false,
      certifies_I1_zero_isolation: false,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      open_quantities: [
        "directed-rounding derivative bounds on the continuous compact I1 interval",
        "directed-rounding composition of endpoint signs and derivative negativity over all speeds in the enclosure",
        "I1.f1 full interval zero isolation",
        "remaining finite row-family enclosures",
      ],
      status:
        "i1-f1-zero-isolation-speed-envelope-scan-certified-full-interval-zero-isolation-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      composes_I1_endpoint_signs_and_derivative_scan: certified,
      certifies_I1_f1_zero_isolation_speed_envelope_scan: certified,
      certifies_I1_f1_root_branch_speed_envelope_scan: certified,
      certifies_I1_f1_sampled_simple_root_branch: certified,
      certifies_I1_f1_full_interval_zero_isolation: false,
      certifies_outward_rounded_interval_enclosure: false,
      certifies_interval_derivative_enclosure: false,
      certifies_I1_zero_isolation: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "I1.f1 sampled zero-isolation speed-envelope scan and simple-root branch; full continuous interval zero isolation, derivative enclosure, critical exhaustion, quadrature, and retained branch status remain open",
    },
    result: {
      theory_status: certified
        ? "source-atlas-aware-i1-f1-zero-isolation-speed-envelope-scan-certified"
        : "source-atlas-aware-i1-f1-zero-isolation-speed-envelope-scan-open",
      first_successor_row:
        "I1.derivative-negative.full-cell-directed-rounding-interval-enclosure-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The I1 endpoint signs and derivative-negative scan now compose into a sampled simple-root branch for I1.f1, but full interval zero isolation still requires directed-rounding derivative and composition enclosures.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryI1ZeroIsolationSpeedEnvelopeScan(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_ZERO_ISOLATION_SPEED_ENVELOPE_SCAN_SCHEMA,
    "schema must match I1 zero isolation speed envelope scan schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match I1 zero isolation speed envelope scan packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.forcing_bracket_certificate_check?.valid === true &&
      artifact?.forcing_bracket_certificate_check
        ?.certifies_I1_forcing_bracket_point_signs === true &&
      artifact?.forcing_bracket_certificate_check?.certifies_I1_zero_isolation ===
        false,
    "forcing bracket predecessor must certify endpoint signs without zero isolation",
    errors
  );
  assertField(
    artifact?.derivative_negative_scan_check?.valid === true &&
      artifact?.derivative_negative_scan_check
        ?.certifies_I1_derivative_negative_speed_envelope_scan === true &&
      artifact?.derivative_negative_scan_check
        ?.certifies_interval_derivative_enclosure === false,
    "derivative predecessor must certify only the derivative speed-envelope scan",
    errors
  );
  assertField(
    artifact?.scan_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "I1 zero isolation scan must not impose a fixed speed window",
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
    Array.isArray(artifact?.root_branch_rows) &&
      artifact.root_branch_rows.length ===
        artifact?.scan_parameters?.speed_sample_count &&
      artifact.root_branch_rows.every(
        (row) =>
          row.status === "i1-f1-sampled-simple-root-certified" &&
          row.source_root_count === EXPECTED_SOURCE_ROOT_COUNT &&
          Array.isArray(row.term_root_count_signature) &&
          row.term_root_count_signature.join(",") === "1,3,1,1" &&
          Number(row.min_abs_F_delta) > 0 &&
          Number(row.min_multiroot_term_delta_separation) > 0 &&
          row.source_root_count_preserved === true &&
          row.bracket_signs_preserved === true &&
          row.root_inside_bracket === true &&
          row.derivative_at_root_negative === true &&
          Number(row.root_forcing_abs) <=
            Number(artifact?.scan_parameters?.bisection_tolerance) &&
          Number(row.root_derivative) < 0
      ),
    "all root branch rows must certify one sampled simple root inside the bracket with six source roots",
    errors
  );
  assertField(
    artifact?.root_branch_summary?.zero_row_id ===
      "I1.f1.zero-isolation.speed-envelope-scan" &&
      artifact?.root_branch_summary?.status ===
        "i1-f1-zero-isolation-speed-envelope-scan-certified" &&
      artifact?.root_branch_summary
        ?.sampled_root_branch_monotone_decreasing_in_speed === true &&
      artifact?.root_branch_summary?.source_root_count_preserved === true &&
      artifact?.root_branch_summary?.term_root_count_signatures?.length === 1 &&
      artifact?.root_branch_summary?.term_root_count_signatures?.[0] ===
        "1,3,1,1" &&
      Number(artifact?.root_branch_summary?.min_abs_F_delta) > 0 &&
      Number(artifact?.root_branch_summary?.min_multiroot_term_delta_separation) >
        0 &&
      Number(artifact?.root_branch_summary?.root_derivative_envelope?.[1]) < 0,
    "root branch summary must certify a decreasing sampled simple-root branch with negative derivative",
    errors
  );
  assertField(
    artifact?.artifact_claim?.composes_I1_endpoint_signs_and_derivative_scan ===
      true &&
      artifact?.artifact_claim
        ?.certifies_I1_f1_zero_isolation_speed_envelope_scan === true &&
      artifact?.artifact_claim?.certifies_I1_f1_root_branch_speed_envelope_scan ===
        true &&
      artifact?.artifact_claim?.certifies_I1_f1_sampled_simple_root_branch ===
        true &&
      artifact?.artifact_claim?.certifies_I1_f1_full_interval_zero_isolation ===
        false &&
      artifact?.artifact_claim?.certifies_outward_rounded_interval_enclosure ===
        false &&
      artifact?.artifact_claim?.certifies_interval_derivative_enclosure === false &&
      artifact?.artifact_claim?.certifies_I1_zero_isolation === false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion === false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact must certify only the sampled zero-isolation scan and leave interval/retention claims open",
    errors
  );
  assertField(
    artifact?.result?.theory_status ===
      "source-atlas-aware-i1-f1-zero-isolation-speed-envelope-scan-certified" &&
      artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false,
    "result must be I1.f1 zero-isolation speed-envelope scan certified and not retained",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan.mjs [options]",
    "",
    "Options:",
    "  --subdivisions <n>                  Source-root search subdivisions (default: 5000)",
    "  --speed-samples <n>                 Speed samples across certified speed-ratio enclosure (default: 9)",
    "  --derivative-theta-samples <n>      Compact I1 derivative theta samples (default: 48)",
    "  --endpoint-padding <x>              Padding from derivative scan endpoints (default: 1e-5)",
    "  --machine-padding <x>               Machine envelope padding (default: 1e-9)",
    "  --bisection-tolerance <x>           Root bisection tolerance (default: 1e-12)",
    "  --max-bisection-steps <n>           Maximum bisection steps (default: 80)",
    "  --out <path>                        Write artifact JSON to path instead of stdout",
    "  --validate <path>                   Validate an existing artifact JSON file",
    "  --schema                            Print the artifact schema identifier",
    "  --pretty                            Pretty-print JSON output",
    "  --help                              Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    speedSampleCount: DEFAULT_SPEED_SAMPLE_COUNT,
    derivativeThetaSampleCount: DEFAULT_DERIVATIVE_THETA_SAMPLE_COUNT,
    endpointPadding: DEFAULT_ENDPOINT_PADDING,
    machinePadding: DEFAULT_MACHINE_PADDING,
    bisectionTolerance: DEFAULT_BISECTION_TOLERANCE,
    maxBisectionSteps: DEFAULT_MAX_BISECTION_STEPS,
    outPath: null,
    validatePath: null,
    printSchema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--subdivisions") {
      args.rootSubdivisions = Number.parseInt(argv[++index], 10);
    } else if (arg === "--speed-samples") {
      args.speedSampleCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--derivative-theta-samples") {
      args.derivativeThetaSampleCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--endpoint-padding") {
      args.endpointPadding = Number(argv[++index]);
    } else if (arg === "--machine-padding") {
      args.machinePadding = Number(argv[++index]);
    } else if (arg === "--bisection-tolerance") {
      args.bisectionTolerance = Number(argv[++index]);
    } else if (arg === "--max-bisection-steps") {
      args.maxBisectionSteps = Number.parseInt(argv[++index], 10);
    } else if (arg === "--out") {
      args.outPath = argv[++index];
    } else if (arg === "--validate") {
      args.validatePath = argv[++index];
    } else if (arg === "--schema") {
      args.printSchema = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
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
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_ZERO_ISOLATION_SPEED_ENVELOPE_SCAN_SCHEMA
    );
    return;
  }
  if (args.validatePath) {
    const artifact = JSON.parse(fs.readFileSync(args.validatePath, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryI1ZeroIsolationSpeedEnvelopeScan(
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
    buildOctahedralFoldAwareCrossBinaryI1ZeroIsolationSpeedEnvelopeScan({
      rootSubdivisions: args.rootSubdivisions,
      speedSampleCount: args.speedSampleCount,
      derivativeThetaSampleCount: args.derivativeThetaSampleCount,
      endpointPadding: args.endpointPadding,
      machinePadding: args.machinePadding,
      bisectionTolerance: args.bisectionTolerance,
      maxBisectionSteps: args.maxBisectionSteps,
    });
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
