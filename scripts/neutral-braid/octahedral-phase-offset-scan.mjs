#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { OCTAHEDRAL_SITES, orderedOctahedralPairs } from "./octahedral-root-ledger.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_PHASE_OFFSET_SCAN_SCHEMA = "neutral-braid-octahedral-phase-offset-scan/v1";

const PACKET_ID = "octahedral_phase_offset_scan";
const PROMOTION_STATUS = "priority-only";
const TAU = 2 * Math.PI;
const ROOT_DOMAIN_MIN = 1e-9;
const ROOT_DOMAIN_MAX = 2;
const ROOT_TOLERANCE = 1e-11;
const DUPLICATE_ROOT_TOLERANCE = 1e-7;
const DEFAULT_GRID = 9;
const DEFAULT_PHASE_SAMPLES = 25;
const DEFAULT_Y_SUBDIVISIONS = 160;
const DEFAULT_TOP = 8;

function carrierPoint(binary, theta) {
  if (binary === 1) {
    return [Math.cos(theta), Math.sin(theta), 0];
  }
  if (binary === 2) {
    return [0, Math.cos(theta), Math.sin(theta)];
  }
  if (binary === 3) {
    return [Math.sin(theta), 0, Math.cos(theta)];
  }
  throw new Error(`unknown binary id: ${binary}`);
}

function carrierTangent(binary, theta) {
  if (binary === 1) {
    return [-Math.sin(theta), Math.cos(theta), 0];
  }
  if (binary === 2) {
    return [0, -Math.sin(theta), Math.cos(theta)];
  }
  if (binary === 3) {
    return [Math.cos(theta), 0, -Math.sin(theta)];
  }
  throw new Error(`unknown binary id: ${binary}`);
}

function scale(vector, factor) {
  return vector.map((entry) => factor * entry);
}

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

function siteById(id) {
  const site = OCTAHEDRAL_SITES.find((candidate) => candidate.id === id);
  if (!site) {
    throw new Error(`unknown site id: ${id}`);
  }
  return site;
}

function phaseForSite(site, theta, offsets) {
  return theta + offsets[site.binary];
}

function sitePosition(site, theta, offsets) {
  return scale(carrierPoint(site.binary, phaseForSite(site, theta, offsets)), site.sign);
}

function siteTangent(site, theta, offsets) {
  return scale(carrierTangent(site.binary, phaseForSite(site, theta, offsets)), site.sign);
}

function rootEquation(receiver, source, theta, y, offsets) {
  const receiverPosition = sitePosition(receiver, theta, offsets);
  const sourcePosition = sitePosition(source, theta - y, offsets);
  return norm(subtract(receiverPosition, sourcePosition)) - y;
}

function bisectRoot(receiver, source, theta, left, right, offsets) {
  let a = left;
  let b = right;
  let fa = rootEquation(receiver, source, theta, a, offsets);
  let fb = rootEquation(receiver, source, theta, b, offsets);

  if (Math.abs(fa) <= ROOT_TOLERANCE) {
    return a;
  }
  if (Math.abs(fb) <= ROOT_TOLERANCE) {
    return b;
  }
  if (fa * fb > 0) {
    return null;
  }

  for (let step = 0; step < 80; step += 1) {
    const mid = 0.5 * (a + b);
    const fm = rootEquation(receiver, source, theta, mid, offsets);
    if (Math.abs(fm) <= ROOT_TOLERANCE || Math.abs(b - a) <= ROOT_TOLERANCE) {
      return mid;
    }
    if (fa * fm <= 0) {
      b = mid;
      fb = fm;
    } else {
      a = mid;
      fa = fm;
    }
  }

  return 0.5 * (a + b);
}

function addUniqueRoot(roots, root) {
  if (!Number.isFinite(root)) {
    return;
  }
  if (root <= ROOT_DOMAIN_MIN || root > ROOT_DOMAIN_MAX + DUPLICATE_ROOT_TOLERANCE) {
    return;
  }
  if (!roots.some((candidate) => Math.abs(candidate - root) <= DUPLICATE_ROOT_TOLERANCE)) {
    roots.push(root);
  }
}

function findRoots(receiver, source, theta, offsets, ySubdivisions) {
  const roots = [];
  let previousY = ROOT_DOMAIN_MIN;
  let previousValue = rootEquation(receiver, source, theta, previousY, offsets);

  for (let step = 1; step <= ySubdivisions; step += 1) {
    const y = ROOT_DOMAIN_MIN + ((ROOT_DOMAIN_MAX - ROOT_DOMAIN_MIN) * step) / ySubdivisions;
    const value = rootEquation(receiver, source, theta, y, offsets);
    if (Math.abs(value) <= ROOT_TOLERANCE) {
      addUniqueRoot(roots, y);
    } else if (Number.isFinite(previousValue) && Number.isFinite(value) && previousValue * value < 0) {
      addUniqueRoot(roots, bisectRoot(receiver, source, theta, previousY, y, offsets));
    }
    previousY = y;
    previousValue = value;
  }

  return roots.sort((left, right) => left - right);
}

function rootJacobian(receiver, source, theta, y, offsets) {
  const receiverPosition = sitePosition(receiver, theta, offsets);
  const sourcePosition = sitePosition(source, theta - y, offsets);
  const displacement = subtract(receiverPosition, sourcePosition);
  const distance = norm(displacement);
  const rhat = scale(displacement, 1 / distance);
  const sourceTangent = siteTangent(source, theta - y, offsets);
  return 1 - dot(sourceTangent, rhat);
}

function normalizedDisplacement(receiver, source, theta, y, offsets) {
  const receiverPosition = sitePosition(receiver, theta, offsets);
  const sourcePosition = sitePosition(source, theta - y, offsets);
  const displacement = subtract(receiverPosition, sourcePosition);
  return scale(displacement, 1 / norm(displacement));
}

function simultaneousClearance(theta, offsets) {
  let minimum = Infinity;
  for (let leftIndex = 0; leftIndex < OCTAHEDRAL_SITES.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < OCTAHEDRAL_SITES.length; rightIndex += 1) {
      const left = sitePosition(OCTAHEDRAL_SITES[leftIndex], theta, offsets);
      const right = sitePosition(OCTAHEDRAL_SITES[rightIndex], theta, offsets);
      minimum = Math.min(minimum, norm(subtract(left, right)));
    }
  }
  return minimum;
}

function rms(values) {
  if (values.length === 0) {
    return null;
  }
  return Math.sqrt(values.reduce((sum, value) => sum + value * value, 0) / values.length);
}

function finiteMin(values) {
  return values.reduce((best, value) => (Number.isFinite(value) && value < best ? value : best), Infinity);
}

function finiteMax(values) {
  return values.reduce((best, value) => (Number.isFinite(value) && value > best ? value : best), -Infinity);
}

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toFixed(12));
}

function evaluateOffsets(phi2, phi3, options) {
  const offsets = { 1: 0, 2: phi2, 3: phi3 };
  const pairs = orderedOctahedralPairs();
  const residuals = [];
  const absResiduals = [];
  const jacobians = [];
  const delays = [];
  const rootCounts = [];
  const clearances = [];
  const failures = [];
  let worstNode = null;

  for (let phaseIndex = 0; phaseIndex < options.phaseSamples; phaseIndex += 1) {
    const theta = (TAU * phaseIndex) / options.phaseSamples;
    clearances.push(simultaneousClearance(theta, offsets));

    for (const receiver of OCTAHEDRAL_SITES) {
      let force = [0, 0, 0];
      for (const pair of pairs.filter((candidate) => candidate.receiver === receiver.id)) {
        const source = siteById(pair.source);
        const roots = findRoots(receiver, source, theta, offsets, options.ySubdivisions);
        rootCounts.push(roots.length);
        if (roots.length !== 1) {
          failures.push({
            phase_index: phaseIndex,
            theta: formatNumber(theta),
            receiver: pair.receiver,
            source: pair.source,
            root_count: roots.length,
          });
          continue;
        }

        const y = roots[0];
        const jacobian = rootJacobian(receiver, source, theta, y, offsets);
        const rhat = normalizedDisplacement(receiver, source, theta, y, offsets);
        force = add(force, scale(rhat, pair.force_sign / (y * y * Math.abs(jacobian))));
        delays.push(y);
        jacobians.push(jacobian);
      }

      if (failures.length > 0) {
        continue;
      }

      const tangentialResidual = dot(siteTangent(receiver, theta, offsets), force);
      const absTangentialResidual = Math.abs(tangentialResidual);
      residuals.push(tangentialResidual);
      absResiduals.push(absTangentialResidual);
      if (!worstNode || absTangentialResidual > worstNode.abs_tangential_residual) {
        worstNode = {
          phase_index: phaseIndex,
          theta: formatNumber(theta),
          site: receiver.id,
          label: receiver.label,
          tangential_residual: formatNumber(tangentialResidual),
          abs_tangential_residual: formatNumber(absTangentialResidual),
        };
      }
    }
  }

  const rootCountMin = finiteMin(rootCounts);
  const rootCountMax = finiteMax(rootCounts);
  const rootStatus = failures.length === 0 && rootCountMin === 1 && rootCountMax === 1 ? "sampled-root-count-passed" : "sampled-root-count-failed";

  return {
    phi2: formatNumber(phi2),
    phi3: formatNumber(phi3),
    root_status: rootStatus,
    root_count_min: Number.isFinite(rootCountMin) ? rootCountMin : null,
    root_count_max: Number.isFinite(rootCountMax) ? rootCountMax : null,
    failed_root_node_count: failures.length,
    first_failed_root_node: failures[0] ?? null,
    max_abs_tangential_residual: formatNumber(finiteMax(absResiduals)),
    rms_tangential_residual: formatNumber(rms(residuals)),
    jacobian_floor_min: formatNumber(finiteMin(jacobians.map(Math.abs))),
    delay_min: formatNumber(finiteMin(delays)),
    delay_max: formatNumber(finiteMax(delays)),
    simultaneous_clearance_min: formatNumber(finiteMin(clearances)),
    evaluated_site_phase_nodes: residuals.length,
    worst_node: worstNode,
    retention: "not_retained",
  };
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

export function buildOctahedralPhaseOffsetScan(options = {}) {
  const grid = Number.parseInt(options.grid ?? DEFAULT_GRID, 10);
  const phaseSamples = Number.parseInt(options.phaseSamples ?? DEFAULT_PHASE_SAMPLES, 10);
  const ySubdivisions = Number.parseInt(options.ySubdivisions ?? DEFAULT_Y_SUBDIVISIONS, 10);
  const top = Number.parseInt(options.top ?? DEFAULT_TOP, 10);
  if (!Number.isInteger(grid) || grid < 1) {
    throw new Error("grid must be a positive integer");
  }
  if (!Number.isInteger(phaseSamples) || phaseSamples < 1) {
    throw new Error("phaseSamples must be a positive integer");
  }
  if (!Number.isInteger(ySubdivisions) || ySubdivisions < 10) {
    throw new Error("ySubdivisions must be an integer >= 10");
  }
  if (!Number.isInteger(top) || top < 1) {
    throw new Error("top must be a positive integer");
  }

  const candidates = [];
  for (let i = 0; i < grid; i += 1) {
    for (let j = 0; j < grid; j += 1) {
      candidates.push(
        evaluateOffsets((TAU * i) / grid, (TAU * j) / grid, {
          phaseSamples,
          ySubdivisions,
        })
      );
    }
  }

  candidates.sort((left, right) => {
    const leftRms = Number.isFinite(left.rms_tangential_residual) ? left.rms_tangential_residual : Infinity;
    const rightRms = Number.isFinite(right.rms_tangential_residual) ? right.rms_tangential_residual : Infinity;
    if (leftRms !== rightRms) {
      return leftRms - rightRms;
    }
    const leftMax = Number.isFinite(left.max_abs_tangential_residual) ? left.max_abs_tangential_residual : Infinity;
    const rightMax = Number.isFinite(right.max_abs_tangential_residual) ? right.max_abs_tangential_residual : Infinity;
    return leftMax - rightMax;
  });

  const best = candidates[0];
  const zeroOffset = candidates.find((candidate) => candidate.phi2 === 0 && candidate.phi3 === 0) ?? null;

  return {
    schema: OCTAHEDRAL_PHASE_OFFSET_SCAN_SCHEMA,
    packet_id: PACKET_ID,
    artifact_id: "neutral_braid_octahedral_phase_offset_scan.sampled_diagnostic.v1",
    promotion_status: PROMOTION_STATUS,
    sources: [
      "reference/priorities/braid/shell-braid/rigid-carrier-dynamics-results.md",
      "reference/priorities/braid/neutral-braid/octahedral-force-residual-diagnostic.md",
    ],
    artifact_claim: {
      kind: "sampled_phase_offset_scan",
      solves_dynamics: false,
      certifies_root_ledger: false,
      retained_branch: false,
      strongest_claim:
        "The sampled rigid phase-offset grid can reduce tangential RMS relative to the zero-offset row, but it does not close the fixed-speed force residual.",
    },
    branch_scope: {
      seed: "rigid-octahedral-carrier-with-phase-offsets",
      fixed_gauge: "phi1=0",
      scanned_offsets: ["phi2", "phi3"],
      pair_policy: {
        name: "Pi_all",
        kind: "ordered-distinct-source-pairs",
        cardinality: orderedOctahedralPairs().length,
      },
      same_source_policy: {
        selected: "ordinary-same-source-excluded",
        ordinary_force_rows_include_same_source: false,
      },
    },
    numerical_method: {
      phase_offset_grid: grid,
      phase_offset_values_per_axis: grid,
      phase_sample_count: phaseSamples,
      phase_domain: "[0, 2*pi)",
      endpoint_duplicate_included: false,
      y_subdivisions: ySubdivisions,
      candidates_evaluated: candidates.length,
      top_rows_returned: Math.min(top, candidates.length),
    },
    site_inventory: siteInventory(),
    scan_summary: {
      zero_offset: zeroOffset,
      best,
      rms_improvement_over_zero_offset:
        zeroOffset && Number.isFinite(zeroOffset.rms_tangential_residual) && Number.isFinite(best?.rms_tangential_residual)
          ? formatNumber(zeroOffset.rms_tangential_residual - best.rms_tangential_residual)
          : null,
      best_rows: candidates.slice(0, top),
    },
    result: {
      phase_offset_scan: "sampled_completed",
      best_row_status: best?.root_status ?? null,
      rigid_phase_family_status: "not_retained",
      retained_branch: false,
      retention: "not_retained",
      first_failure_status: "sampled-tangential-residual-open",
      master_first_failure_status: "interval-payload-open",
      status_note:
        "This is a sampled grid search over rigid phase offsets. It is a screening artifact only and does not close tangential, radial, root-certification, action, event, or Noether rows.",
    },
    not_retained_reason: [
      "best sampled tangential residual remains nonzero",
      "root ledger is sampled rather than interval-certified",
      "radial/support-band, bounded-speed, action, Noether, event, and stability rows remain open",
    ],
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralPhaseOffsetScan(artifact) {
  const errors = [];
  assertField(artifact && typeof artifact === "object" && !Array.isArray(artifact), "artifact must be an object", errors);
  if (errors.length > 0) {
    return errors;
  }

  assertField(artifact.schema === OCTAHEDRAL_PHASE_OFFSET_SCAN_SCHEMA, `schema must be ${OCTAHEDRAL_PHASE_OFFSET_SCAN_SCHEMA}`, errors);
  assertField(artifact.packet_id === PACKET_ID, `packet_id must be ${PACKET_ID}`, errors);
  assertField(artifact.promotion_status === PROMOTION_STATUS, `promotion_status must be ${PROMOTION_STATUS}`, errors);
  assertField(artifact.artifact_claim?.solves_dynamics === false, "artifact must declare solves_dynamics=false", errors);
  assertField(artifact.artifact_claim?.retained_branch === false, "artifact must declare retained_branch=false", errors);
  assertField(artifact.result?.retained_branch === false, "result.retained_branch must be false", errors);
  assertField(artifact.result?.retention === "not_retained", "retention must be not_retained", errors);
  assertField(artifact.branch_scope?.pair_policy?.cardinality === 30, "pair policy cardinality must be 30", errors);

  const candidatesEvaluated = artifact.numerical_method?.candidates_evaluated;
  const grid = artifact.numerical_method?.phase_offset_grid;
  assertField(candidatesEvaluated === grid * grid, "candidates_evaluated must equal grid squared", errors);

  const best = artifact.scan_summary?.best;
  assertField(best && typeof best === "object", "scan_summary.best must be present", errors);
  assertField(Number.isFinite(best?.rms_tangential_residual), "best RMS tangential residual must be finite", errors);
  assertField(Number.isFinite(best?.max_abs_tangential_residual), "best max tangential residual must be finite", errors);
  assertField(best?.retention === "not_retained", "best row retention must be not_retained", errors);
  assertField(Array.isArray(artifact.scan_summary?.best_rows), "best_rows must be an array", errors);
  assertField(artifact.scan_summary.best_rows.length > 0, "best_rows must not be empty", errors);
  assertField(
    artifact.result?.master_first_failure_status === "interval-payload-open",
    "master first failure must remain interval-payload-open",
    errors
  );

  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-phase-offset-scan.mjs [options]",
    "",
    "Options:",
    "  --grid <n>          Phase-offset values per axis for phi2,phi3 (default: 9)",
    "  --samples <n>       Receiver phase samples over [0, 2*pi) (default: 25)",
    "  --subdivisions <n>  Root-search subdivisions over 0 < y <= 2 (default: 160)",
    "  --top <n>           Number of best rows to include (default: 8)",
    "  --out <path>        Write artifact JSON to path instead of stdout",
    "  --validate <path>   Validate an existing artifact JSON file",
    "  --schema            Print the artifact schema identifier",
    "  --pretty            Pretty-print JSON output",
    "  --help              Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    grid: DEFAULT_GRID,
    phaseSamples: DEFAULT_PHASE_SAMPLES,
    ySubdivisions: DEFAULT_Y_SUBDIVISIONS,
    top: DEFAULT_TOP,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--grid") {
      args.grid = Number.parseInt(argv[++index], 10);
    } else if (arg === "--samples") {
      args.phaseSamples = Number.parseInt(argv[++index], 10);
    } else if (arg === "--subdivisions") {
      args.ySubdivisions = Number.parseInt(argv[++index], 10);
    } else if (arg === "--top") {
      args.top = Number.parseInt(argv[++index], 10);
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
          schema: "neutral-braid-octahedral-phase-offset-scan-schema/v1",
          artifact_schema: OCTAHEDRAL_PHASE_OFFSET_SCAN_SCHEMA,
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
    const errors = validateOctahedralPhaseOffsetScan(artifact);
    process.stdout.write(
      printJson(
        {
          valid: errors.length === 0,
          errors,
          schema: artifact.schema,
          grid: artifact.numerical_method?.phase_offset_grid ?? null,
          candidates_evaluated: artifact.numerical_method?.candidates_evaluated ?? null,
          result: artifact.result ?? null,
          best: artifact.scan_summary?.best ?? null,
        },
        args.pretty
      )
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact = buildOctahedralPhaseOffsetScan({
    grid: args.grid,
    phaseSamples: args.phaseSamples,
    ySubdivisions: args.ySubdivisions,
    top: args.top,
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
