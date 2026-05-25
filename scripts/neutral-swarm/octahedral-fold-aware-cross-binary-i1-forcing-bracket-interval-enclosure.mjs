#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  evaluateCrossBinaryForcingAndDerivativeAtTheta,
} from "./octahedral-fold-aware-cross-binary-forcing-derivative-atlas.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_FORCING_BRACKET_INTERVAL_ENCLOSURE_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_i1_forcing_bracket_interval_enclosure";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_SPEED_SAMPLE_COUNT = 9;
const DEFAULT_MACHINE_PADDING = 1e-9;
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const SPEED_RATIO_ENCLOSURE = [3.02156, 3.02157];
const I1_FORCING_BRACKET_MARGIN = 0.000472358401387;
const I1_FORCING_BRACKET_TARGET_RADIUS = 0.000236179200694;
const EXPECTED_SOURCE_ROOT_COUNT = 6;

const I1_ENDPOINT_SPECS = [
  {
    endpoint_id: "I1.f1.left",
    theta: 0.124678831905,
    quantity: "forcing",
    expected_sign: "+",
  },
  {
    endpoint_id: "I1.f1.right",
    theta: 0.145456970556,
    quantity: "forcing",
    expected_sign: "-",
  },
];

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

function signClearance({ lower, upper, expectedSign }) {
  if (expectedSign === "+") {
    return lower;
  }
  if (expectedSign === "-") {
    return -upper;
  }
  throw new Error("expectedSign must be + or -");
}

function buildEndpointEnvelope({
  endpointSpec,
  speedSamples,
  rootSubdivisions,
  machinePadding,
}) {
  const sampleRows = speedSamples.map((speedRatio) => {
    const evaluated = evaluateCrossBinaryForcingAndDerivativeAtTheta({
      speedRatio,
      theta: endpointSpec.theta,
      rootSubdivisions,
    });
    return {
      speed_ratio: formatSmallNumber(speedRatio),
      theta: formatSmallNumber(endpointSpec.theta),
      forcing: formatSmallNumber(evaluated.value),
      derivative: formatSmallNumber(evaluated.derivative),
      source_root_count: evaluated.source_root_count,
      term_root_counts: evaluated.terms.map((term) => ({
        term_label: term.term_label,
        root_count: term.root_count,
      })),
    };
  });
  const values = sampleRows.map((row) => Number(row.forcing));
  const rawLower = Math.min(...values);
  const rawUpper = Math.max(...values);
  const lower = rawLower - machinePadding;
  const upper = rawUpper + machinePadding;
  const radius = 0.5 * (upper - lower);
  const center = 0.5 * (upper + lower);
  const clearance = signClearance({
    lower,
    upper,
    expectedSign: endpointSpec.expected_sign,
  });
  const rootCountsMatch = sampleRows.every(
    (row) => row.source_root_count === EXPECTED_SOURCE_ROOT_COUNT
  );

  return {
    endpoint_id: endpointSpec.endpoint_id,
    target_id: `${endpointSpec.endpoint_id}.forcing`,
    theta: formatSmallNumber(endpointSpec.theta),
    speed_sample_count: speedSamples.length,
    speed_sample_rows: sampleRows,
    raw_sample_lower: formatSmallNumber(rawLower),
    raw_sample_upper: formatSmallNumber(rawUpper),
    machine_padding: formatSmallNumber(machinePadding),
    forcing_enclosure: [
      formatSmallNumber(lower),
      formatSmallNumber(upper),
    ],
    enclosure_center: formatSmallNumber(center),
    enclosure_radius: formatSmallNumber(radius),
    target_radius: formatSmallNumber(I1_FORCING_BRACKET_TARGET_RADIUS),
    expected_sign: endpointSpec.expected_sign,
    signed_clearance: formatSmallNumber(clearance),
    source_root_count_expected: EXPECTED_SOURCE_ROOT_COUNT,
    source_root_counts_match: rootCountsMatch,
    status:
      rootCountsMatch &&
      radius < I1_FORCING_BRACKET_TARGET_RADIUS &&
      clearance > 0
        ? "i1-endpoint-speed-envelope-sign-certified"
        : "i1-endpoint-speed-envelope-sign-open",
  };
}

function buildBracketTheorem() {
  return {
    theorem_id: "i1-forcing-bracket-speed-envelope-sign-certificate",
    theorem_scope: "representative receiver 1+ cross-binary I1 forcing bracket",
    statement:
      "For the fixed I1 bracket endpoints and the certified positive speed-ratio zero enclosure, machine-expanded speed-envelope evaluations of f_cross at I1.f1.left and I1.f1.right preserve the signs f_cross(a1)>0 and f_cross(b1)<0 with enclosure radius below the I1.forcing-bracket target radius.",
    proof_steps: [
      "Evaluate the source-atlas-aware f_cross formula at the two fixed I1 bracket endpoints across the certified speed-ratio enclosure.",
      "Require the expected six source roots at every sampled speed point for both endpoints.",
      "Build a machine-expanded forcing envelope from the sampled lower and upper values plus an explicit padding radius.",
      "Check that each endpoint envelope has the required sign and that its radius is below the imported I1.forcing-bracket target radius.",
      "Conclude only the endpoint point-sign bracket row f_cross(a1)>0>f_cross(b1); leave I1 derivative enclosure, zero isolation, hidden-zero exclusion, interval critical exhaustion, quadrature, and retention open.",
    ],
    proof_status: "conditional-speed-envelope-point-sign-certificate-stated",
  };
}

function buildEnvelopeSummary(endpointRows) {
  const left = endpointRows.find((row) => row.endpoint_id === "I1.f1.left");
  const right = endpointRows.find((row) => row.endpoint_id === "I1.f1.right");
  const certified = endpointRows.every(
    (row) => row.status === "i1-endpoint-speed-envelope-sign-certified"
  );
  return {
    bracket_row_id: "I1.forcing-bracket",
    sampled_margin: formatSmallNumber(I1_FORCING_BRACKET_MARGIN),
    target_radius: formatSmallNumber(I1_FORCING_BRACKET_TARGET_RADIUS),
    endpoint_count: endpointRows.length,
    certified_endpoint_count: endpointRows.filter((row) =>
      row.status === "i1-endpoint-speed-envelope-sign-certified"
    ).length,
    max_endpoint_enclosure_radius: formatSmallNumber(
      Math.max(...endpointRows.map((row) => Number(row.enclosure_radius)))
    ),
    min_signed_clearance: formatSmallNumber(
      Math.min(...endpointRows.map((row) => Number(row.signed_clearance)))
    ),
    left_endpoint_forcing_enclosure: left?.forcing_enclosure ?? null,
    right_endpoint_forcing_enclosure: right?.forcing_enclosure ?? null,
    status: certified
      ? "i1-forcing-bracket-speed-envelope-certified"
      : "i1-forcing-bracket-speed-envelope-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryI1ForcingBracketIntervalEnclosure(
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
  const machinePadding = Number(
    options.machinePadding ?? DEFAULT_MACHINE_PADDING
  );
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  if (!Number.isInteger(speedSampleCount) || speedSampleCount < 3) {
    throw new Error("speedSampleCount must be an integer >= 3");
  }
  if (!Number.isFinite(machinePadding) || machinePadding <= 0) {
    throw new Error("machinePadding must be positive");
  }

  const speedSamples = sampleSpeedGrid({
    speedRatioEnclosure: SPEED_RATIO_ENCLOSURE,
    speedSampleCount,
  });
  const endpointRows = I1_ENDPOINT_SPECS.map((endpointSpec) =>
    buildEndpointEnvelope({
      endpointSpec,
      speedSamples,
      rootSubdivisions,
      machinePadding,
    })
  );
  const envelopeSummary = buildEnvelopeSummary(endpointRows);
  const certified =
    envelopeSummary.status === "i1-forcing-bracket-speed-envelope-certified";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_FORCING_BRACKET_INTERVAL_ENCLOSURE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas.md",
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-finite-interval-closure-reduction.md",
    ],
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure.md",
    enclosure_parameters: {
      receiver_label: "1+",
      theta_domain: "[0,H/4]",
      bracket_row_id: "I1.forcing-bracket",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: SPEED_RATIO_ENCLOSURE,
      root_subdivisions: rootSubdivisions,
      speed_sample_count: speedSampleCount,
      machine_padding: formatSmallNumber(machinePadding),
      target_radius: formatSmallNumber(I1_FORCING_BRACKET_TARGET_RADIUS),
      sampled_margin: formatSmallNumber(I1_FORCING_BRACKET_MARGIN),
    },
    i1_forcing_bracket_theorem: buildBracketTheorem(),
    endpoint_enclosure_rows: endpointRows,
    envelope_summary: envelopeSummary,
    interval_profile_boundary: {
      certifies_I1_forcing_bracket_point_signs: certified,
      certifies_outward_rounded_interval_enclosure: false,
      certifies_interval_derivative_enclosure: false,
      certifies_I1_zero_isolation: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      open_quantities: [
        "directed-rounding source-root interval arithmetic",
        "I1.derivative-negative.full-cell interval derivative enclosure",
        "I1.f1 zero isolation",
        "the remaining finite row families",
      ],
      status:
        "i1-forcing-bracket-point-signs-certified-full-interval-closure-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_I1_forcing_bracket_point_signs: certified,
      certifies_I1_forcing_bracket_speed_envelope: certified,
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
        "I1 forcing-bracket endpoint point signs certified by a machine-expanded speed envelope; full outward-rounded interval arithmetic, derivative enclosure, critical exhaustion, quadrature, and retained branch status remain open",
    },
    result: {
      theory_status: certified
        ? "source-atlas-aware-i1-forcing-bracket-speed-envelope-certified"
        : "source-atlas-aware-i1-forcing-bracket-speed-envelope-open",
      first_successor_row:
        "I1.derivative-negative.full-cell-interval-derivative-enclosure-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The global finite-row bottleneck has its endpoint point signs certified under the speed-ratio enclosure, but I1 zero isolation still requires the regular derivative enclosure and full outward-rounded arithmetic.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryI1ForcingBracketIntervalEnclosure(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_FORCING_BRACKET_INTERVAL_ENCLOSURE_SCHEMA,
    "schema must match I1 forcing bracket interval enclosure schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match I1 forcing bracket interval enclosure packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.enclosure_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "I1 forcing bracket certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.enclosure_parameters?.speed_band === undefined &&
      artifact?.enclosure_parameters?.speed_window === undefined &&
      artifact?.enclosure_parameters?.speed_min === undefined &&
      artifact?.enclosure_parameters?.speed_max === undefined,
    "enclosure parameters must not contain speed-band fields",
    errors
  );
  assertField(
    Array.isArray(artifact?.endpoint_enclosure_rows) &&
      artifact.endpoint_enclosure_rows.length === 2 &&
      artifact.endpoint_enclosure_rows.every(
        (row) =>
          row.source_root_counts_match === true &&
          row.source_root_count_expected === EXPECTED_SOURCE_ROOT_COUNT
      ),
    "artifact must certify six source roots at both I1 endpoints",
    errors
  );
  assertField(
    artifact?.endpoint_enclosure_rows?.every(
      (row) =>
        row.status === "i1-endpoint-speed-envelope-sign-certified" &&
        Number(row.enclosure_radius) <
          Number(artifact.enclosure_parameters.target_radius) &&
        Number(row.signed_clearance) > 0
    ) === true,
    "both I1 endpoint speed envelopes must be sign-definite below target radius",
    errors
  );
  assertField(
    artifact?.envelope_summary?.status ===
      "i1-forcing-bracket-speed-envelope-certified" &&
      artifact?.envelope_summary?.bracket_row_id === "I1.forcing-bracket" &&
      Number(artifact?.envelope_summary?.max_endpoint_enclosure_radius) <
        Number(artifact?.envelope_summary?.target_radius),
    "I1 forcing bracket summary must be certified below the target radius",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_I1_forcing_bracket_point_signs ===
      true &&
      artifact?.artifact_claim?.certifies_outward_rounded_interval_enclosure ===
        false &&
      artifact?.artifact_claim?.certifies_interval_derivative_enclosure === false &&
      artifact?.artifact_claim?.certifies_I1_zero_isolation === false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion === false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact must certify only I1 endpoint point signs and leave interval/retention claims open",
    errors
  );
  assertField(
    artifact?.result?.theory_status ===
      "source-atlas-aware-i1-forcing-bracket-speed-envelope-certified" &&
      artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false,
    "result must be I1 forcing bracket speed envelope certified and not retained",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-swarm/octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure.mjs [options]",
    "",
    "Options:",
    "  --subdivisions <n>          Source-root search subdivisions (default: 5000)",
    "  --speed-samples <n>         Speed samples across certified speed-ratio enclosure (default: 9)",
    "  --machine-padding <x>       Machine envelope padding (default: 1e-9)",
    "  --out <path>                Write artifact JSON to path instead of stdout",
    "  --validate <path>           Validate an existing artifact JSON file",
    "  --schema                    Print the artifact schema identifier",
    "  --pretty                    Pretty-print JSON output",
    "  --help                      Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    speedSampleCount: DEFAULT_SPEED_SAMPLE_COUNT,
    machinePadding: DEFAULT_MACHINE_PADDING,
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
    } else if (arg === "--machine-padding") {
      args.machinePadding = Number(argv[++index]);
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
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_FORCING_BRACKET_INTERVAL_ENCLOSURE_SCHEMA
    );
    return;
  }
  if (args.validatePath) {
    const artifact = JSON.parse(fs.readFileSync(args.validatePath, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryI1ForcingBracketIntervalEnclosure(
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
    buildOctahedralFoldAwareCrossBinaryI1ForcingBracketIntervalEnclosure({
      rootSubdivisions: args.rootSubdivisions,
      speedSampleCount: args.speedSampleCount,
      machinePadding: args.machinePadding,
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
