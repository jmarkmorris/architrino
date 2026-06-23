#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_SITES,
  octahedralSitePosition,
  octahedralSiteTangent,
} from "./octahedral-root-ledger.mjs";
import {
  buildOctahedralFoldAwareClockLengthOrbitSymmetryReduction,
  validateOctahedralFoldAwareClockLengthOrbitSymmetryReduction,
} from "./octahedral-fold-aware-clock-length-orbit-symmetry-reduction.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_CHART_CLOSURE_PROOF_SCHEMA =
  "neutral-braid-octahedral-fold-aware-clock-length-chart-closure-proof/v1";

const PACKET_ID = "octahedral_fold_aware_clock_length_chart_closure_proof";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_SAMPLE_COUNT = 24;
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const REPRESENTATIVE_ZERO_RAY_SPEED_RATIO = 3.021564740248;
const CHECK_ETA_VALUES = [0.2, 0.9, 1.7];
const CHECK_TOLERANCE = 1e-10;

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  const rounded = Number(value.toFixed(12));
  return Math.abs(rounded) < 5e-13 ? 0 : rounded;
}

function add(left, right) {
  return left.map((entry, index) => entry + right[index]);
}

function subtract(left, right) {
  return left.map((entry, index) => entry - right[index]);
}

function scale(vector, factor) {
  return vector.map((entry) => factor * entry);
}

function dot(left, right) {
  return left.reduce((sum, entry, index) => sum + entry * right[index], 0);
}

function norm(vector) {
  return Math.hypot(...vector);
}

function maxVectorAbs(vector) {
  return Math.max(...vector.map((entry) => Math.abs(entry)));
}

function siteByLabel(label) {
  const site = OCTAHEDRAL_SITES.find((candidate) => candidate.label === label);
  if (!site) {
    throw new Error(`unknown receiver label: ${label}`);
  }
  return site;
}

function labelFor(binary, sign) {
  return `${binary}${sign > 0 ? "+" : "-"}`;
}

function qC(vector) {
  return [vector[2], vector[0], vector[1]];
}

function qS(vector) {
  return scale(vector, -1);
}

const GENERATORS = [
  {
    id: "C",
    phase_shift: 0,
    mapSite(site) {
      return siteByLabel(labelFor((site.binary % 3) + 1, site.sign));
    },
    orthogonalMap: qC,
    label_action: "1+->2+, 2+->3+, 3+->1+ and same for negative labels",
  },
  {
    id: "S",
    phase_shift: 0,
    mapSite(site) {
      return siteByLabel(labelFor(site.binary, -site.sign));
    },
    orthogonalMap: qS,
    label_action: "1+<->1-, 2+<->2-, 3+<->3-",
  },
];

function periodRescaledPosition(site, theta, traceScale) {
  return scale(octahedralSitePosition(site, theta), traceScale);
}

function rootEquation(receiver, source, theta, eta, traceScale) {
  const receiverPosition = periodRescaledPosition(receiver, theta, traceScale);
  const sourcePosition = periodRescaledPosition(source, theta - eta, traceScale);
  return norm(subtract(receiverPosition, sourcePosition)) - eta;
}

function rootJacobian(receiver, source, theta, eta, traceScale) {
  const speedRatio = traceScale;
  const receiverPosition = periodRescaledPosition(receiver, theta, traceScale);
  const sourcePosition = periodRescaledPosition(source, theta - eta, traceScale);
  const displacement = subtract(receiverPosition, sourcePosition);
  const rhat = scale(displacement, 1 / norm(displacement));
  const sourceTangent = octahedralSiteTangent(source, theta - eta);
  return 1 - speedRatio * dot(sourceTangent, rhat);
}

function forceContribution(receiver, source, theta, eta, traceScale) {
  const receiverPosition = periodRescaledPosition(receiver, theta, traceScale);
  const sourcePosition = periodRescaledPosition(source, theta - eta, traceScale);
  const displacement = subtract(receiverPosition, sourcePosition);
  const rhat = scale(displacement, 1 / norm(displacement));
  const jacobian = rootJacobian(receiver, source, theta, eta, traceScale);
  const coefficient = (receiver.polarity * source.polarity) / (eta * eta * Math.abs(jacobian));
  return scale(rhat, coefficient);
}

function evaluateGeneratorChecksum(generator, sampleCount, traceScale) {
  let maxPositionResidual = 0;
  let maxTangentResidual = 0;
  let maxRootEquationResidual = 0;
  let maxJacobianResidual = 0;
  let maxForceVectorResidual = 0;
  let maxScalarForcingResidual = 0;
  let sourceProductFailures = 0;

  for (let sampleIndex = 0; sampleIndex < sampleCount; sampleIndex += 1) {
    const theta = (2 * Math.PI * sampleIndex) / sampleCount;
    for (const receiver of OCTAHEDRAL_SITES) {
      const mappedReceiver = generator.mapSite(receiver);
      const thetaMapped = theta + generator.phase_shift;
      const mappedReceiverPosition = periodRescaledPosition(mappedReceiver, thetaMapped, traceScale);
      const transportedReceiverPosition = generator.orthogonalMap(periodRescaledPosition(receiver, theta, traceScale));
      const mappedReceiverTangent = octahedralSiteTangent(mappedReceiver, thetaMapped);
      const transportedReceiverTangent = generator.orthogonalMap(octahedralSiteTangent(receiver, theta));

      maxPositionResidual = Math.max(
        maxPositionResidual,
        maxVectorAbs(subtract(mappedReceiverPosition, transportedReceiverPosition))
      );
      maxTangentResidual = Math.max(
        maxTangentResidual,
        maxVectorAbs(subtract(mappedReceiverTangent, transportedReceiverTangent))
      );

      for (const source of OCTAHEDRAL_SITES) {
        if (source.id === receiver.id) {
          continue;
        }
        const mappedSource = generator.mapSite(source);
        if (mappedSource.id === mappedReceiver.id) {
          throw new Error(`generator ${generator.id} mapped an ordered distinct pair to a self pair`);
        }
        if (mappedReceiver.polarity * mappedSource.polarity !== receiver.polarity * source.polarity) {
          sourceProductFailures += 1;
        }
        for (const eta of CHECK_ETA_VALUES) {
          const rootResidual = Math.abs(
            rootEquation(mappedReceiver, mappedSource, thetaMapped, eta, traceScale) -
              rootEquation(receiver, source, theta, eta, traceScale)
          );
          const jacobianResidual = Math.abs(
            rootJacobian(mappedReceiver, mappedSource, thetaMapped, eta, traceScale) -
              rootJacobian(receiver, source, theta, eta, traceScale)
          );
          const forceResidual = maxVectorAbs(
            subtract(
              forceContribution(mappedReceiver, mappedSource, thetaMapped, eta, traceScale),
              generator.orthogonalMap(forceContribution(receiver, source, theta, eta, traceScale))
            )
          );
          const scalarResidual = Math.abs(
            dot(mappedReceiverTangent, forceContribution(mappedReceiver, mappedSource, thetaMapped, eta, traceScale)) -
              dot(octahedralSiteTangent(receiver, theta), forceContribution(receiver, source, theta, eta, traceScale))
          );

          maxRootEquationResidual = Math.max(maxRootEquationResidual, rootResidual);
          maxJacobianResidual = Math.max(maxJacobianResidual, jacobianResidual);
          maxForceVectorResidual = Math.max(maxForceVectorResidual, forceResidual);
          maxScalarForcingResidual = Math.max(maxScalarForcingResidual, scalarResidual);
        }
      }
    }
  }

  return {
    generator_id: generator.id,
    label_action: generator.label_action,
    sample_count: sampleCount,
    eta_values: CHECK_ETA_VALUES,
    max_position_residual: formatNumber(maxPositionResidual),
    max_tangent_residual: formatNumber(maxTangentResidual),
    max_root_equation_residual: formatNumber(maxRootEquationResidual),
    max_jacobian_residual: formatNumber(maxJacobianResidual),
    max_force_vector_residual: formatNumber(maxForceVectorResidual),
    max_scalar_forcing_residual: formatNumber(maxScalarForcingResidual),
    source_product_failures: sourceProductFailures,
    checksum_status:
      maxPositionResidual <= CHECK_TOLERANCE &&
      maxTangentResidual <= CHECK_TOLERANCE &&
      maxRootEquationResidual <= CHECK_TOLERANCE &&
      maxJacobianResidual <= CHECK_TOLERANCE &&
      maxForceVectorResidual <= CHECK_TOLERANCE &&
      maxScalarForcingResidual <= CHECK_TOLERANCE &&
      sourceProductFailures === 0
        ? "signed-cyclic-generator-covariance-check-passed"
        : "signed-cyclic-generator-covariance-check-failed",
  };
}

export function buildOctahedralFoldAwareClockLengthChartClosureProof(options = {}) {
  const sampleCount = Number.parseInt(options.sampleCount ?? DEFAULT_SAMPLE_COUNT, 10);
  const rootSubdivisions = Number.parseInt(options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS, 10);
  if (!Number.isInteger(sampleCount) || sampleCount < 6) {
    throw new Error("sampleCount must be an integer >= 6");
  }
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }

  const reduction = buildOctahedralFoldAwareClockLengthOrbitSymmetryReduction({
    sampleCount: 64,
    rootSubdivisions,
  });
  const reductionErrors = validateOctahedralFoldAwareClockLengthOrbitSymmetryReduction(reduction);
  const traceScale = REPRESENTATIVE_ZERO_RAY_SPEED_RATIO;
  const checksums = GENERATORS.map((generator) => evaluateGeneratorChecksum(generator, sampleCount, traceScale));
  const checksumPassed = checksums.every(
    (row) => row.checksum_status === "signed-cyclic-generator-covariance-check-passed"
  );

  return {
    schema: OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_CHART_CLOSURE_PROOF_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-clock-length-orbit-symmetry-reduction.md",
    priority_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-clock-length-chart-closure-proof.md",
    successor_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-representative-profile-decomposition.md",
    source_reduction_check: {
      schema: reduction.schema,
      valid: reductionErrors.length === 0,
      errors: reductionErrors,
      theory_status: reduction.result.theory_status,
      retained_branch: reduction.result.retained_branch,
    },
    theorem_scope: {
      scope: "scalar fold-aware clock/length receiver-orbit chart closure",
      carrier: "rigid period-rescaled octahedral carrier",
      reference_receiver_label: "1+",
      covered_receiver_labels: reduction.reduction_domain.covered_receiver_labels,
      speed_constraint: "none; no fixed speed window is imposed",
      all_ordered_distinct_sources_required: true,
      fold_aware_all_positive_roots_required: true,
      same_coarea_convention_required: true,
      same_zero_ray_required: true,
      representative_zero_ray_speed_ratio: formatNumber(REPRESENTATIVE_ZERO_RAY_SPEED_RATIO),
      S_phase_convention:
        "signed-label convention: Q_S=-I and sigma_S=0; unsigned carrier convention would use a pi shift",
      tensor_or_observer_export_claim: false,
    },
    signed_cyclic_generators: [
      {
        id: "C",
        label_action: "1+->2+, 2+->3+, 3+->1+ and same for negative labels",
        orthogonal_map: "Q_C(x,y,z)=(z,x,y)",
        phase_shift: "0",
      },
      {
        id: "S",
        label_action: "1+<->1-, 2+<->2-, 3+<->3-",
        orthogonal_map: "Q_S=-I in the signed-label convention",
        phase_shift: "0 in the signed-label convention; equivalent to pi in the unsigned carrier convention",
      },
    ],
    analytic_identities: {
      carrier_covariance: "Y_{g i}(u+sigma_g)=Q_g Y_i(u), dY_{g i}/du(u+sigma_g)=Q_g dY_i/du(u)",
      root_equation: "Phi_{g i,g j}(u+sigma_g,eta)=Phi_{i,j}(u,eta)",
      root_set_bijection: "eta is a positive root for (i,j,u) iff eta is a positive root for (g i,g j,u+sigma_g)",
      jacobian: "J_{g i,g j}(u+sigma_g,eta)=J_{i,j}(u,eta)",
      force_vector: "F_{g i}^{fold}(u+sigma_g)=Q_g F_i^{fold}(u)",
      scalar_forcing: "T_{g i}(u+sigma_g) dot F_{g i}^{fold}(u+sigma_g)=T_i(u) dot F_i^{fold}(u)",
      primitive: "A_{g i}(u+sigma_g)-A_{g i}(sigma_g)=A_i(u)-A_i(0)",
      clock_length: "L_{g i}/H=L_i/H, so the clock offset and positivity criterion transport over the orbit",
    },
    executable_checksum: {
      checksum_sample_count: sampleCount,
      trace_scale_used_for_covariance_checksum: formatNumber(traceScale),
      tolerance: CHECK_TOLERANCE,
      generator_rows: checksums,
      status: checksumPassed
        ? "signed-cyclic-chart-closure-covariance-check-passed"
        : "signed-cyclic-chart-closure-covariance-check-failed",
    },
    proof_burden_reduction: {
      certifies_signed_cyclic_chart_closure: true,
      can_transport_representative_interval_profile_to_receiver_orbit: true,
      interval_certificate_receiver_rows_before: 6,
      interval_certificate_representative_rows_after: 1,
      remaining_interval_targets: [
        "representative receiver 1+ forcing enclosure",
        "representative receiver 1+ primitive enclosure for A_min, A_bar, and A_max",
        "representative receiver 1+ Jacobian/root-chart enclosure across fold phases",
      ],
    },
    artifact_claim: {
      certifies_receiver_orbit_chart_closure: checksumPassed,
      certifies_interval_receiver_orbit_symmetry_reduction: checksumPassed,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "analytic signed-cyclic chart closure for the scalar clock/length row; representative interval profile and retained branch remain open",
    },
    result: {
      theory_status:
        reductionErrors.length === 0 && checksumPassed
          ? "fold-aware-clock-length-receiver-orbit-chart-closure-certified"
          : "fold-aware-clock-length-receiver-orbit-chart-closure-failed",
      first_successor_row:
        "representative-profile-decomposition-created-cross-binary-interval-profile-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The receiver-orbit reduction is now analytic for the scalar clock/length row: a future representative receiver interval certificate transports to all six receiver labels. This still does not certify the representative interval profile or retained branch.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareClockLengthChartClosureProof(artifact) {
  const errors = [];
  assertField(
    artifact?.schema === OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_CHART_CLOSURE_PROOF_SCHEMA,
    "schema must match fold-aware clock length chart closure proof schema",
    errors
  );
  assertField(artifact?.packet_id === PACKET_ID, "packet id must match chart closure proof packet", errors);
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(artifact?.source_reduction_check?.valid === true, "source symmetry reduction must validate", errors);
  assertField(
    artifact?.theorem_scope?.speed_constraint === "none; no fixed speed window is imposed",
    "chart closure proof must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.theorem_scope?.all_ordered_distinct_sources_required === true &&
      artifact?.theorem_scope?.fold_aware_all_positive_roots_required === true &&
      artifact?.theorem_scope?.same_coarea_convention_required === true &&
      artifact?.theorem_scope?.S_phase_convention?.includes("sigma_S=0") &&
      artifact?.theorem_scope?.tensor_or_observer_export_claim === false,
    "chart closure proof must declare its scalar all-root assumptions and avoid tensor export claims",
    errors
  );
  assertField(
    artifact?.analytic_identities?.root_set_bijection?.includes("iff") &&
      artifact?.analytic_identities?.scalar_forcing?.includes("dot"),
    "chart closure proof must state root-set and scalar forcing identities",
    errors
  );
  assertField(
    Array.isArray(artifact?.executable_checksum?.generator_rows) &&
      artifact.executable_checksum.generator_rows.length === 2 &&
      artifact.executable_checksum.generator_rows.every(
        (row) => row.checksum_status === "signed-cyclic-generator-covariance-check-passed"
      ),
    "both signed-cyclic generator checksums must pass",
    errors
  );
  assertField(
    artifact?.proof_burden_reduction?.certifies_signed_cyclic_chart_closure === true &&
      artifact?.proof_burden_reduction?.can_transport_representative_interval_profile_to_receiver_orbit === true &&
      artifact?.proof_burden_reduction?.interval_certificate_receiver_rows_before === 6 &&
      artifact?.proof_burden_reduction?.interval_certificate_representative_rows_after === 1,
    "chart closure proof must reduce the interval receiver burden from six rows to one representative row",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_receiver_orbit_chart_closure === true &&
      artifact?.artifact_claim?.certifies_interval_receiver_orbit_symmetry_reduction === true &&
      artifact?.artifact_claim?.certifies_representative_interval_profile === false &&
      artifact?.artifact_claim?.certifies_receiver_orbit_interval_clock_length_return === false &&
      artifact?.artifact_claim?.certifies_bounded_speed_live_ledger === false &&
      artifact?.result?.retained_branch === false &&
      artifact?.result?.retention === "not_retained",
    "chart closure proof must not claim representative profile, interval clock/length return, live ledger, or retention",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-clock-length-chart-closure-proof.mjs [options]",
    "",
    "Options:",
    "  --samples <n>          Number of covariance checksum samples (default: 24)",
    "  --subdivisions <n>     Source orbit root search subdivisions (default: 5000)",
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
          schema: "neutral-braid-octahedral-fold-aware-clock-length-chart-closure-proof-schema/v1",
          artifact_schema: OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_CHART_CLOSURE_PROOF_SCHEMA,
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
    const errors = validateOctahedralFoldAwareClockLengthChartClosureProof(artifact);
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

  const artifact = buildOctahedralFoldAwareClockLengthChartClosureProof({
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
