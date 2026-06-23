#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_SITES,
  octahedralSiteById,
  octahedralSitePosition,
  octahedralSiteTangent,
  orderedOctahedralPairs,
} from "./octahedral-root-ledger.mjs";
import {
  OCTAHEDRAL_FOLD_AWARE_ZERO_BRACKET_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareZeroBracketCertificate,
  validateOctahedralFoldAwareZeroBracketCertificate,
} from "./octahedral-fold-aware-zero-bracket-certificate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_DYNAMICS_HANDOFF_SCHEMA =
  "neutral-braid-octahedral-fold-aware-dynamics-handoff/v1";

const PACKET_ID = "octahedral_fold_aware_dynamics_handoff";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_WITNESS_THETA = Math.PI / 4;
const DEFAULT_WITNESS_RECEIVER = "1+";
const DEFAULT_ROOT_SUBDIVISIONS = 50000;
const ROOT_DOMAIN_MIN = 1e-9;
const ROOT_DOMAIN_MARGIN = 1e-8;
const ROOT_TOLERANCE = 1e-12;
const DUPLICATE_ROOT_TOLERANCE = 1e-7;

function add(left, right) {
  return left.map((entry, index) => entry + right[index]);
}

function subtract(left, right) {
  return left.map((entry, index) => entry - right[index]);
}

function dot(left, right) {
  return left.reduce((sum, entry, index) => sum + entry * right[index], 0);
}

function norm(vector) {
  return Math.hypot(...vector);
}

function scaleVector(vector, factor) {
  return vector.map((entry) => factor * entry);
}

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

function siteByLabel(label) {
  const site = OCTAHEDRAL_SITES.find((candidate) => candidate.label === label);
  if (!site) {
    throw new Error(`unknown receiver label: ${label}`);
  }
  return site;
}

function periodRescaledPosition(site, theta, traceScale) {
  return scaleVector(octahedralSitePosition(site, theta), traceScale);
}

function periodRescaledUnitTangent(site, theta) {
  const tangent = octahedralSiteTangent(site, theta);
  return scaleVector(tangent, 1 / norm(tangent));
}

function rootDomainMax(traceScale) {
  return 2 * traceScale + ROOT_DOMAIN_MARGIN * Math.max(1, traceScale);
}

function rootEquation(receiver, source, theta, y, traceScale, periodRatio) {
  const receiverPosition = periodRescaledPosition(receiver, theta, traceScale);
  const sourcePosition = periodRescaledPosition(
    source,
    theta - y / periodRatio,
    traceScale
  );
  return norm(subtract(receiverPosition, sourcePosition)) - y;
}

function bisectRoot(receiver, source, theta, left, right, traceScale, periodRatio) {
  let a = left;
  let b = right;
  let fa = rootEquation(receiver, source, theta, a, traceScale, periodRatio);
  const fb = rootEquation(receiver, source, theta, b, traceScale, periodRatio);

  if (Math.abs(fa) <= ROOT_TOLERANCE) {
    return a;
  }
  if (Math.abs(fb) <= ROOT_TOLERANCE) {
    return b;
  }
  if (fa * fb > 0) {
    return null;
  }

  for (let step = 0; step < 90; step += 1) {
    const mid = 0.5 * (a + b);
    const fm = rootEquation(receiver, source, theta, mid, traceScale, periodRatio);
    if (Math.abs(fm) <= ROOT_TOLERANCE || Math.abs(b - a) <= ROOT_TOLERANCE) {
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

function addUniqueRoot(roots, root, domainMax) {
  if (!Number.isFinite(root)) {
    return;
  }
  if (root <= ROOT_DOMAIN_MIN || root > domainMax + DUPLICATE_ROOT_TOLERANCE) {
    return;
  }
  if (!roots.some((candidate) => Math.abs(candidate - root) <= DUPLICATE_ROOT_TOLERANCE)) {
    roots.push(root);
  }
}

function findRoots(receiver, source, theta, traceScale, periodRatio, rootSubdivisions) {
  const roots = [];
  const domainMax = rootDomainMax(traceScale);
  let previousY = ROOT_DOMAIN_MIN;
  let previousValue = rootEquation(receiver, source, theta, previousY, traceScale, periodRatio);

  for (let step = 1; step <= rootSubdivisions; step += 1) {
    const y =
      ROOT_DOMAIN_MIN + ((domainMax - ROOT_DOMAIN_MIN) * step) / rootSubdivisions;
    const value = rootEquation(receiver, source, theta, y, traceScale, periodRatio);
    if (Math.abs(value) <= ROOT_TOLERANCE) {
      addUniqueRoot(roots, y, domainMax);
    } else if (
      Number.isFinite(previousValue) &&
      Number.isFinite(value) &&
      previousValue * value < 0
    ) {
      addUniqueRoot(
        roots,
        bisectRoot(receiver, source, theta, previousY, y, traceScale, periodRatio),
        domainMax
      );
    }
    previousY = y;
    previousValue = value;
  }

  return roots.sort((left, right) => left - right);
}

function rootForceContribution(pair, receiver, source, theta, y, traceScale, periodRatio) {
  const speedRatio = traceScale / periodRatio;
  const sourcePhase = theta - y / periodRatio;
  const displacement = subtract(
    periodRescaledPosition(receiver, theta, traceScale),
    periodRescaledPosition(source, sourcePhase, traceScale)
  );
  const distance = norm(displacement);
  const rhat = scaleVector(displacement, 1 / distance);
  const sourcePhaseTangent = octahedralSiteTangent(source, sourcePhase);
  const jacobian = 1 - speedRatio * dot(sourcePhaseTangent, rhat);
  const coefficient = pair.force_sign / (y * y * Math.abs(jacobian));
  return {
    force: scaleVector(rhat, coefficient),
    tangential_value: null,
    jacobian,
  };
}

export function evaluatePointwiseTangentialWitness({
  speedRatio,
  theta = DEFAULT_WITNESS_THETA,
  receiverLabel = DEFAULT_WITNESS_RECEIVER,
  rootSubdivisions = DEFAULT_ROOT_SUBDIVISIONS,
}) {
  const traceScale = speedRatio;
  const periodRatio = 1;
  const receiver = siteByLabel(receiverLabel);
  const unitTangent = periodRescaledUnitTangent(receiver, theta);
  let totalForce = [0, 0, 0];
  let partnerForce = [0, 0, 0];
  let crossForce = [0, 0, 0];
  let activeRootCount = 0;
  let partnerRootCount = 0;
  let crossRootCount = 0;
  let jacobianAbsMin = Infinity;
  const sourceRows = [];

  for (const pair of orderedOctahedralPairs().filter((candidate) => candidate.receiver === receiver.id)) {
    const source = octahedralSiteById(pair.source);
    const roots = findRoots(receiver, source, theta, traceScale, periodRatio, rootSubdivisions);
    let sourceTangentialValue = 0;
    const rootRows = [];

    for (const y of roots) {
      const contribution = rootForceContribution(
        pair,
        receiver,
        source,
        theta,
        y,
        traceScale,
        periodRatio
      );
      const tangentialValue = dot(unitTangent, contribution.force);
      sourceTangentialValue += tangentialValue;
      activeRootCount += 1;
      jacobianAbsMin = Math.min(jacobianAbsMin, Math.abs(contribution.jacobian));
      totalForce = add(totalForce, contribution.force);
      if (pair.source_relation === "antipodal-partner") {
        partnerRootCount += 1;
        partnerForce = add(partnerForce, contribution.force);
      } else if (pair.source_relation === "cross-binary") {
        crossRootCount += 1;
        crossForce = add(crossForce, contribution.force);
      }
      rootRows.push({
        phase_delay: y / periodRatio,
        physical_delay: y,
        jacobian: contribution.jacobian,
        tangential_value: tangentialValue,
      });
    }

    sourceRows.push({
      source: pair.source,
      source_label: pair.source_label,
      source_relation: pair.source_relation,
      root_count: roots.length,
      tangential_value: sourceTangentialValue,
      roots: rootRows,
    });
  }

  const totalTangentialValue = dot(unitTangent, totalForce);
  const partnerTangentialValue = dot(unitTangent, partnerForce);
  const crossTangentialValue = dot(unitTangent, crossForce);

  return {
    receiver: receiver.id,
    receiver_label: receiver.label,
    theta,
    speed_ratio: speedRatio,
    trace_scale: traceScale,
    period_ratio: periodRatio,
    active_root_count: activeRootCount,
    partner_root_count: partnerRootCount,
    cross_root_count: crossRootCount,
    jacobian_abs_min: jacobianAbsMin,
    total_tangential_value: totalTangentialValue,
    partner_tangential_value: partnerTangentialValue,
    cross_tangential_value: crossTangentialValue,
    source_rows: sourceRows,
  };
}

function formatRootRow(row) {
  return {
    phase_delay: formatNumber(row.phase_delay),
    physical_delay: formatNumber(row.physical_delay),
    jacobian: formatNumber(row.jacobian),
    tangential_value: formatNumber(row.tangential_value),
  };
}

function formatSourceRow(row) {
  return {
    source: row.source,
    source_label: row.source_label,
    source_relation: row.source_relation,
    root_count: row.root_count,
    tangential_value: formatNumber(row.tangential_value),
    roots: row.roots.map(formatRootRow),
  };
}

function formatWitness(row) {
  return {
    receiver: row.receiver,
    receiver_label: row.receiver_label,
    theta: formatNumber(row.theta),
    speed_ratio: formatNumber(row.speed_ratio),
    trace_scale: formatNumber(row.trace_scale),
    period_ratio: formatNumber(row.period_ratio),
    active_root_count: row.active_root_count,
    partner_root_count: row.partner_root_count,
    cross_root_count: row.cross_root_count,
    jacobian_abs_min: formatNumber(row.jacobian_abs_min),
    total_tangential_value: formatNumber(row.total_tangential_value),
    partner_tangential_value: formatSmallNumber(row.partner_tangential_value),
    cross_tangential_value: formatNumber(row.cross_tangential_value),
    source_rows: row.source_rows.map(formatSourceRow),
  };
}

export function buildOctahedralFoldAwareDynamicsHandoff(options = {}) {
  const sourceCertificate = buildOctahedralFoldAwareZeroBracketCertificate();
  const sourceErrors = validateOctahedralFoldAwareZeroBracketCertificate(sourceCertificate);
  const speedRatio = sourceCertificate.zero_existence_certificate.speed_ratio_estimate;
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  const witnessTheta = Number(options.witnessTheta ?? DEFAULT_WITNESS_THETA);
  const witnessReceiver = options.witnessReceiver ?? DEFAULT_WITNESS_RECEIVER;

  if (!Number.isFinite(speedRatio) || speedRatio <= 0) {
    throw new Error("source certificate must provide a positive speed-ratio estimate");
  }
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  if (!Number.isFinite(witnessTheta)) {
    throw new Error("witnessTheta must be finite");
  }

  const pointwiseWitness = evaluatePointwiseTangentialWitness({
    speedRatio,
    theta: witnessTheta,
    receiverLabel: witnessReceiver,
    rootSubdivisions,
  });
  const fixedSpeedObstructed =
    Math.abs(pointwiseWitness.total_tangential_value) > 0.01 &&
    pointwiseWitness.jacobian_abs_min > 0.1;

  return {
    schema: OCTAHEDRAL_FOLD_AWARE_DYNAMICS_HANDOFF_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_schema: OCTAHEDRAL_FOLD_AWARE_ZERO_BRACKET_CERTIFICATE_SCHEMA,
    predecessor_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-zero-bracket-certificate.md",
    priority_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-dynamics-handoff.md",
    source_certificate_check: {
      schema: sourceCertificate.schema,
      valid: sourceErrors.length === 0,
      errors: sourceErrors,
      zero_status: sourceCertificate.zero_existence_certificate.status,
      transversality_status: sourceCertificate.transversality_certificate.status,
      clock_scale_status: sourceCertificate.clock_scale_gauge_lemma.status,
    },
    representative_zero_ray_point: {
      speed_constraint: "none; representative h=1 point on the projective zero ray",
      speed_ratio: formatNumber(speedRatio),
      trace_scale: formatNumber(speedRatio),
      period_ratio: 1,
      physical_period: formatNumber(2 * Math.PI),
      path_length: formatNumber(2 * Math.PI * speedRatio),
      path_speed: formatNumber(speedRatio),
    },
    pointwise_tangential_witness: formatWitness(pointwiseWitness),
    fixed_speed_tangent_closure_test: {
      required_equation:
        "T_i(theta) dot F_i^{fold}(theta)=0 for every receiver and phase on a retained fixed-speed trace branch",
      witness_receiver: pointwiseWitness.receiver_label,
      witness_theta: formatNumber(pointwiseWitness.theta),
      witness_total_tangential_value: formatNumber(pointwiseWitness.total_tangential_value),
      witness_cross_tangential_value: formatNumber(pointwiseWitness.cross_tangential_value),
      witness_partner_tangential_value: formatSmallNumber(pointwiseWitness.partner_tangential_value),
      witness_jacobian_abs_min: formatNumber(pointwiseWitness.jacobian_abs_min),
      status: fixedSpeedObstructed
        ? "fixed-speed-pointwise-tangent-closure-rejected"
        : "fixed-speed-pointwise-tangent-closure-open",
    },
    bounded_speed_handoff: {
      mean_zero_equation: "integral_0^H T_i dot F_i^{fold} du=0",
      speed_ode_equation: "nu_i nu_i'=Gamma_B^nu T_i dot F_i^{fold}",
      primitive_return_condition:
        "zero period mean is the necessary condition for a periodic speed primitive",
      primitive_status: "period-mean-compatible-ordinary-primitive-not-certified",
      ordinary_theta_warning:
        "cross-binary folds are projection singularities; a live primitive must use the coarea or branch-chart convention, not a dropped-root one-root theta ledger",
      status: "bounded-speed-primitive-handoff-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_fold_aware_period_mean_zero:
        sourceCertificate.artifact_claim.certifies_fold_aware_multiroot_zero_bracket === true,
      certifies_simple_zero_transversality:
        sourceCertificate.artifact_claim.certifies_simple_zero_transversality === true,
      rejects_fixed_speed_pointwise_tangent_closure: fixedSpeedObstructed,
      identifies_bounded_speed_successor: fixedSpeedObstructed,
      certifies_bounded_speed_primitive: false,
      certifies_action_noether_event_rows: false,
      certifies_observer_export: false,
      retained_branch: false,
      claim_level:
        "period-mean zero classified as fixed-speed pointwise obstruction plus bounded-speed primitive handoff; not retained",
    },
    result: {
      theory_status: fixedSpeedObstructed
        ? "fixed-speed-pointwise-tangent-obstructed-bounded-speed-primitive-handoff"
        : "fold-aware-dynamics-handoff-open",
      first_successor_row:
        "coarea-speed-primitive-and-normal-reconstruction-required-on-live-ledger",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The sign-certified zero closes the fold-aware period mean, but a regular all-root pointwise witness rejects fixed-speed tangential closure. The candidate can only proceed through a bounded-speed primitive and live-ledger normal/action/event rows.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareDynamicsHandoff(artifact) {
  const errors = [];
  assertField(
    artifact?.schema === OCTAHEDRAL_FOLD_AWARE_DYNAMICS_HANDOFF_SCHEMA,
    "schema must match fold-aware dynamics handoff schema",
    errors
  );
  assertField(artifact?.packet_id === PACKET_ID, "packet id must match dynamics handoff packet", errors);
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.representative_zero_ray_point?.speed_constraint ===
      "none; representative h=1 point on the projective zero ray",
    "artifact must not impose a speed window",
    errors
  );
  assertField(
    artifact?.source_certificate_check?.valid === true,
    "source zero bracket certificate must validate",
    errors
  );
  assertField(
    artifact?.pointwise_tangential_witness?.active_root_count === 9,
    "witness must include the expected nine active roots at receiver 1+ and theta=pi/4",
    errors
  );
  assertField(
    Number(artifact?.pointwise_tangential_witness?.jacobian_abs_min) > 0.5,
    "pointwise witness must be root-regular",
    errors
  );
  assertField(
    Math.abs(Number(artifact?.pointwise_tangential_witness?.total_tangential_value)) > 0.1,
    "pointwise witness must show nonzero tangential force",
    errors
  );
  assertField(
    artifact?.fixed_speed_tangent_closure_test?.status ===
      "fixed-speed-pointwise-tangent-closure-rejected",
    "fixed-speed pointwise tangential closure must be rejected",
    errors
  );
  assertField(
    artifact?.bounded_speed_handoff?.status === "bounded-speed-primitive-handoff-open",
    "bounded-speed primitive handoff must remain open",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_bounded_speed_primitive === false &&
      artifact?.artifact_claim?.certifies_action_noether_event_rows === false &&
      artifact?.artifact_claim?.certifies_observer_export === false,
    "artifact must leave bounded-speed primitive, action/Noether/event rows, and observer export uncertified",
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
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-dynamics-handoff.mjs [options]",
    "",
    "Options:",
    "  --subdivisions <n>       Root search subdivisions (default: 50000)",
    "  --witness-theta <x>      Witness phase in radians (default: pi/4)",
    "  --witness-receiver <id>  Witness receiver label (default: 1+)",
    "  --out <path>             Write artifact JSON to path instead of stdout",
    "  --validate <path>        Validate an existing artifact JSON file",
    "  --schema                 Print the artifact schema identifier",
    "  --pretty                 Pretty-print JSON output",
    "  --help                   Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    witnessTheta: DEFAULT_WITNESS_THETA,
    witnessReceiver: DEFAULT_WITNESS_RECEIVER,
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
    } else if (arg === "--witness-theta") {
      args.witnessTheta = Number(argv[++index]);
    } else if (arg === "--witness-receiver") {
      args.witnessReceiver = argv[++index];
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
          schema: "neutral-braid-octahedral-fold-aware-dynamics-handoff-schema/v1",
          artifact_schema: OCTAHEDRAL_FOLD_AWARE_DYNAMICS_HANDOFF_SCHEMA,
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
    const errors = validateOctahedralFoldAwareDynamicsHandoff(artifact);
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

  const artifact = buildOctahedralFoldAwareDynamicsHandoff({
    rootSubdivisions: args.rootSubdivisions,
    witnessTheta: args.witnessTheta,
    witnessReceiver: args.witnessReceiver,
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
