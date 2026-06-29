#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_SITES,
  findOctahedralRoots,
  octahedralRootJacobian,
  octahedralSiteById,
  octahedralSitePosition,
  octahedralSiteTangent,
  orderedOctahedralPairs,
} from "./octahedral-root-ledger.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FORCE_RESIDUAL_SCHEMA = "neutral-braid-octahedral-force-residual/v1";

const PACKET_ID = "octahedral_force_residual_diagnostic";
const PROMOTION_STATUS = "priority-only";
const TAU = 2 * Math.PI;
const DEFAULT_PHASE_SAMPLES = 181;
const DEFAULT_Y_SUBDIVISIONS = 720;
const DEFAULT_TANGENTIAL_TOLERANCE = 1e-9;

function add(left, right) {
  return left.map((entry, index) => entry + right[index]);
}

function scale(vector, factor) {
  return vector.map((entry) => factor * entry);
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

function phaseTheta(index, phaseSamples) {
  if (phaseSamples <= 1) {
    return 0;
  }
  return (TAU * index) / (phaseSamples - 1);
}

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toFixed(12));
}

function siteInventory() {
  return {
    sites: OCTAHEDRAL_SITES.map((site) => ({
      id: site.id,
      binary: site.binary,
      sign: site.sign,
      label: site.label,
      polarity: site.polarity,
      polarity_label: site.polarity > 0 ? "positive" : "negative",
    })),
    polarity_balance: {
      positive: OCTAHEDRAL_SITES.filter((site) => site.polarity === 1).length,
      negative: OCTAHEDRAL_SITES.filter((site) => site.polarity === -1).length,
      q_core_units: OCTAHEDRAL_SITES.reduce((sum, site) => sum + site.polarity, 0),
    },
  };
}

function finiteMin(values) {
  return values.reduce((best, value) => (Number.isFinite(value) && value < best ? value : best), Infinity);
}

function finiteMax(values) {
  return values.reduce((best, value) => (Number.isFinite(value) && value > best ? value : best), -Infinity);
}

function rms(values) {
  if (values.length === 0) {
    return null;
  }
  return Math.sqrt(values.reduce((sum, value) => sum + value * value, 0) / values.length);
}

function normalizedDisplacement(receiver, source, theta, y) {
  const receiverPosition = octahedralSitePosition(receiver, theta);
  const sourcePosition = octahedralSitePosition(source, theta - y);
  const displacement = subtract(receiverPosition, sourcePosition);
  const distance = norm(displacement);
  return scale(displacement, 1 / distance);
}

function forceContribution(pair, theta, y) {
  const receiver = octahedralSiteById(pair.receiver);
  const source = octahedralSiteById(pair.source);
  const rhat = normalizedDisplacement(receiver, source, theta, y);
  const jacobian = octahedralRootJacobian(receiver, source, theta, y);
  const receiverTangent = octahedralSiteTangent(receiver, theta);
  const receiverNormalNumerator = 1 - dot(receiverTangent, rhat);
  const receiverNormalFactor = receiverNormalNumerator / jacobian;
  const coefficient = pair.force_sign * Math.abs(receiverNormalFactor) / (y * y);
  return {
    vector: scale(rhat, coefficient),
    jacobian,
  };
}

function receiverResidual(receiver, theta, pairs, ySubdivisions) {
  let force = [0, 0, 0];
  const roots = [];
  const failures = [];

  for (const pair of pairs.filter((candidate) => candidate.receiver === receiver.id)) {
    const source = octahedralSiteById(pair.source);
    const pairRoots = findOctahedralRoots(receiver, source, theta, ySubdivisions);
    if (pairRoots.length !== 1) {
      failures.push({
        receiver: pair.receiver,
        source: pair.source,
        root_count: pairRoots.length,
      });
      continue;
    }

    const y = pairRoots[0];
    const contribution = forceContribution(pair, theta, y);
    force = add(force, contribution.vector);
    roots.push({
      source: pair.source,
      y,
      jacobian: contribution.jacobian,
    });
  }

  const tangent = octahedralSiteTangent(receiver, theta);
  return {
    tangential_residual: dot(tangent, force),
    force,
    roots,
    failures,
  };
}

export function buildOctahedralForceResidual(options = {}) {
  const phaseSamples = Number.parseInt(options.phaseSamples ?? DEFAULT_PHASE_SAMPLES, 10);
  const ySubdivisions = Number.parseInt(options.ySubdivisions ?? DEFAULT_Y_SUBDIVISIONS, 10);
  const tangentialTolerance = Number(options.tangentialTolerance ?? DEFAULT_TANGENTIAL_TOLERANCE);
  if (!Number.isInteger(phaseSamples) || phaseSamples < 1) {
    throw new Error("phaseSamples must be a positive integer");
  }
  if (!Number.isInteger(ySubdivisions) || ySubdivisions < 10) {
    throw new Error("ySubdivisions must be an integer >= 10");
  }
  if (!Number.isFinite(tangentialTolerance) || tangentialTolerance < 0) {
    throw new Error("tangentialTolerance must be a nonnegative number");
  }

  const pairs = orderedOctahedralPairs();
  const residualValues = [];
  const absoluteResidualValues = [];
  const rootFailures = [];
  const siteRows = OCTAHEDRAL_SITES.map((site) => ({
    site: site.id,
    label: site.label,
    max_abs_tangential_residual: 0,
    rms_tangential_residual: 0,
    phase_sample_count: phaseSamples,
  }));

  let worstNode = null;
  const perSiteValues = new Map(OCTAHEDRAL_SITES.map((site) => [site.id, []]));

  for (let phaseIndex = 0; phaseIndex < phaseSamples; phaseIndex += 1) {
    const theta = phaseTheta(phaseIndex, phaseSamples);
    for (const site of OCTAHEDRAL_SITES) {
      const residual = receiverResidual(site, theta, pairs, ySubdivisions);
      if (residual.failures.length > 0) {
        rootFailures.push({
          phase_index: phaseIndex,
          theta: formatNumber(theta),
          site: site.id,
          failures: residual.failures,
        });
        continue;
      }

      const value = residual.tangential_residual;
      const absValue = Math.abs(value);
      residualValues.push(value);
      absoluteResidualValues.push(absValue);
      perSiteValues.get(site.id).push(value);

      if (!worstNode || absValue > worstNode.abs_tangential_residual) {
        worstNode = {
          phase_index: phaseIndex,
          theta: formatNumber(theta),
          site: site.id,
          label: site.label,
          tangential_residual: formatNumber(value),
          abs_tangential_residual: formatNumber(absValue),
        };
      }
    }
  }

  for (const row of siteRows) {
    const values = perSiteValues.get(row.site);
    row.max_abs_tangential_residual = formatNumber(finiteMax(values.map(Math.abs)));
    row.rms_tangential_residual = formatNumber(rms(values));
  }

  const maxAbsResidual = finiteMax(absoluteResidualValues);
  const rootDiagnosticPassed = rootFailures.length === 0;
  const tangentialPassed = rootDiagnosticPassed && maxAbsResidual <= tangentialTolerance;

  return {
    schema: OCTAHEDRAL_FORCE_RESIDUAL_SCHEMA,
    packet_id: PACKET_ID,
    artifact_id: "neutral_braid_octahedral_force_residual.sampled_diagnostic.v1",
    promotion_status: PROMOTION_STATUS,
    sources: [
      "reference/priorities/braid-retained-branch-closure/shell-braid/octahedral-carrier-worked-example.md",
      "scripts/neutral-braid/octahedral-root-ledger.mjs",
    ],
    artifact_claim: {
      kind: "sampled_force_residual_diagnostic",
      solves_dynamics: false,
      certifies_root_ledger: false,
      retained_branch: false,
      strongest_claim:
        "The rigid zero-offset octahedral seed fails the sampled fixed-speed tangential force-residual diagnostic under the declared neutral polarity assignment.",
    },
    branch_scope: {
      seed: "rigid-octahedral-carrier",
      force_row: "dimensionless neutral fixed-speed tangential residual",
      common_factor_removed: "kappa*epsilon^2/R^2",
      pair_policy: {
        name: "Pi_all",
        kind: "ordered-distinct-source-pairs",
        cardinality: pairs.length,
      },
      same_source_policy: {
        selected: "ordinary-same-source-excluded",
        ordinary_force_rows_include_same_source: false,
      },
    },
    numerical_method: {
      phase_sample_count: phaseSamples,
      phase_domain: "[0, 2*pi]",
      endpoint_duplicate_included: phaseSamples > 1,
      y_subdivisions: ySubdivisions,
      tangential_tolerance: tangentialTolerance,
      force_formula:
        "sum_j sign(q_i*q_j)*rhat_ij/(y_ij^2*abs(J_ij)); residual_i=T_i dot force_i",
    },
    site_inventory: siteInventory(),
    sampled_root_dependency: {
      status: rootDiagnosticPassed ? "certified-root-ledger-dependency-passed" : "sampled-root-ledger-diagnostic-failed",
      failed_root_node_count: rootFailures.length,
      first_failed_root_node: rootFailures[0] ?? null,
    },
    force_residual: {
      status: tangentialPassed ? "sampled-tangential-residual-passed" : "sampled-tangential-residual-failed",
      site_rows: siteRows,
      sampled_summary: {
        max_abs_tangential_residual: formatNumber(maxAbsResidual),
        rms_tangential_residual: formatNumber(rms(residualValues)),
        residual_min: formatNumber(finiteMin(residualValues)),
        residual_max: formatNumber(finiteMax(residualValues)),
        evaluated_site_phase_nodes: residualValues.length,
        worst_node: worstNode,
      },
    },
    residual_vector: {
      rows: [
        { row: "R_root_all_sampled", status: rootDiagnosticPassed ? "passed" : "failed", value: rootFailures.length },
        {
          row: "R_tangential_sampled",
          status: tangentialPassed ? "passed" : "failed",
          value: formatNumber(maxAbsResidual),
        },
        { row: "R_normal", status: "not_computed", value: null },
        { row: "R_speedODE", status: "not_computed", value: null },
        { row: "R_action_Noether", status: "not_computed", value: null },
      ],
      diagnostic_first_failure_row: rootDiagnosticPassed
        ? "sampled-tangential-residual-failed"
        : "sampled-root-ledger-diagnostic-failed",
      master_first_failure_row: "closed-rejected:rigid-octahedral-fixed-speed-neutral-row",
    },
    result: {
      force_residual_diagnostic: tangentialPassed ? "sampled_passed" : "sampled_failed",
      rigid_carrier_status: tangentialPassed ? "not_rejected_by_sampled_tangential_residual" : "rejected_by_sampled_tangential_residual",
      retention: "not_retained",
      retained_branch: false,
      diagnostic_first_failure_status: rootDiagnosticPassed
        ? "sampled-tangential-residual-failed"
        : "sampled-root-ledger-diagnostic-failed",
      master_first_failure_status: "closed-rejected:rigid-octahedral-fixed-speed-neutral-row",
      status_note:
        "This artifact uses the certified rigid-octahedral root ledger to evaluate the fixed-speed tangential residual. The rigid seed is not retained because the tangential residual is nonzero.",
    },
    not_retained_reason: [
      "rigid-octahedral fixed-speed tangential residual is nonzero",
      "sampled fixed-speed tangential residual is nonzero",
      "normal force, speed ODE, action, Noether, event, stability, and observer-export rows are not closed",
    ],
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralForceResidual(artifact) {
  const errors = [];
  assertField(artifact && typeof artifact === "object" && !Array.isArray(artifact), "artifact must be an object", errors);
  if (errors.length > 0) {
    return errors;
  }

  assertField(artifact.schema === OCTAHEDRAL_FORCE_RESIDUAL_SCHEMA, `schema must be ${OCTAHEDRAL_FORCE_RESIDUAL_SCHEMA}`, errors);
  assertField(artifact.packet_id === PACKET_ID, `packet_id must be ${PACKET_ID}`, errors);
  assertField(artifact.promotion_status === PROMOTION_STATUS, `promotion_status must be ${PROMOTION_STATUS}`, errors);
  assertField(artifact.artifact_claim?.solves_dynamics === false, "artifact must declare solves_dynamics=false", errors);
  assertField(artifact.artifact_claim?.retained_branch === false, "artifact must declare retained_branch=false", errors);
  assertField(artifact.result?.retained_branch === false, "result.retained_branch must be false", errors);

  const sites = artifact.site_inventory?.sites ?? [];
  assertField(Array.isArray(sites) && sites.length === 6, "site inventory must contain six sites", errors);
  assertField(artifact.site_inventory?.polarity_balance?.positive === 3, "polarity balance must contain three positive sites", errors);
  assertField(artifact.site_inventory?.polarity_balance?.negative === 3, "polarity balance must contain three negative sites", errors);
  assertField(artifact.site_inventory?.polarity_balance?.q_core_units === 0, "polarity balance must have q_core_units=0", errors);
  assertField(artifact.branch_scope?.pair_policy?.cardinality === 30, "pair policy cardinality must be 30", errors);

  const rootDependency = artifact.sampled_root_dependency ?? {};
  assertField(rootDependency.status === "certified-root-ledger-dependency-passed", "certified root dependency must pass", errors);
  assertField(rootDependency.failed_root_node_count === 0, "sampled root dependency failed node count must be 0", errors);

  const summary = artifact.force_residual?.sampled_summary ?? {};
  assertField(
    Number.isFinite(summary.max_abs_tangential_residual) && summary.max_abs_tangential_residual > 1,
    "max_abs_tangential_residual must show a nontrivial sampled failure",
    errors
  );
  assertField(
    Number.isFinite(summary.rms_tangential_residual) && summary.rms_tangential_residual > 0,
    "rms_tangential_residual must be positive",
    errors
  );
  assertField(
    artifact.force_residual?.status === "sampled-tangential-residual-failed",
    "force residual status must be sampled-tangential-residual-failed",
    errors
  );
  assertField(artifact.result?.force_residual_diagnostic === "sampled_failed", "force residual diagnostic must fail", errors);
  assertField(
    artifact.result?.rigid_carrier_status === "rejected_by_sampled_tangential_residual",
    "rigid carrier must be rejected by sampled tangential residual",
    errors
  );
  assertField(artifact.result?.retention === "not_retained", "retention must be not_retained", errors);
  assertField(
    artifact.result?.master_first_failure_status === "closed-rejected:rigid-octahedral-fixed-speed-neutral-row",
    "master first failure must be the rigid-octahedral fixed-speed rejection",
    errors
  );

  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-force-residual.mjs [options]",
    "",
    "Options:",
    "  --samples <n>       Phase samples over [0, 2*pi] (default: 181)",
    "  --subdivisions <n>  Root-search subdivisions over 0 < y <= 2 (default: 720)",
    "  --tolerance <x>     Tangential residual pass tolerance (default: 1e-9)",
    "  --out <path>        Write artifact JSON to path instead of stdout",
    "  --validate <path>   Validate an existing artifact JSON file",
    "  --schema            Print the artifact schema identifier",
    "  --pretty            Pretty-print JSON output",
    "  --help              Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    phaseSamples: DEFAULT_PHASE_SAMPLES,
    ySubdivisions: DEFAULT_Y_SUBDIVISIONS,
    tangentialTolerance: DEFAULT_TANGENTIAL_TOLERANCE,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--samples") {
      args.phaseSamples = Number.parseInt(argv[++index], 10);
    } else if (arg === "--subdivisions") {
      args.ySubdivisions = Number.parseInt(argv[++index], 10);
    } else if (arg === "--tolerance") {
      args.tangentialTolerance = Number(argv[++index]);
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
          schema: "neutral-braid-octahedral-force-residual-schema/v1",
          artifact_schema: OCTAHEDRAL_FORCE_RESIDUAL_SCHEMA,
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
    const errors = validateOctahedralForceResidual(artifact);
    process.stdout.write(
      printJson(
        {
          valid: errors.length === 0,
          errors,
          schema: artifact.schema,
          phase_sample_count: artifact.numerical_method?.phase_sample_count ?? null,
          result: artifact.result ?? null,
          summary: artifact.force_residual?.sampled_summary ?? null,
        },
        args.pretty
      )
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact = buildOctahedralForceResidual({
    phaseSamples: args.phaseSamples,
    ySubdivisions: args.ySubdivisions,
    tangentialTolerance: args.tangentialTolerance,
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
