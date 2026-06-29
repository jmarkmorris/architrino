#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const TOPOLOGICAL_CAUSAL_ROOT_LEDGER_SCHEMA =
  "aaa-proof/topological-causal-root-ledger-checker/v1";

const PACKET_ID = "topological_causal_root_ledger_checker";
const PROMOTION_STATUS = "priority-only diagnostic";
const DEFAULT_SUBDIVISIONS = 1200;
const DEFAULT_WINDING_RADIUS = 1;
const ROOT_EPSILON = 1e-8;
const ROOT_TOLERANCE = 1e-10;
const DUPLICATE_ROOT_TOLERANCE = 1e-6;
const DEFAULT_CAUSTIC_TOLERANCE = 1e-4;
const DEFAULT_SOURCE_RECORD_ID = "theta_sea_branch_q0_v0";
const DEFAULT_BRANCH_CLASS = "q0";
const DEFAULT_RETAINED_CHART_ID = "torus_root_ledger_q0";
const DEFAULT_RETAINED_WINDOW_ID = "W0";
const DEFAULT_ACTIVE_ROOT_LEDGER_ID = "R_act_q0";
const DEFAULT_EVENT_LEDGER_ID = "L_EpJ_q0";
const DEFAULT_RESPONSE_OBJECT_ID = "M_sea_q0";

function vecAdd(left, right) {
  return left.map((value, index) => value + right[index]);
}

function vecSub(left, right) {
  return left.map((value, index) => value - right[index]);
}

function vecScale(vector, scale) {
  return vector.map((value) => value * scale);
}

function vecDot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function vecNorm(vector) {
  return Math.hypot(...vector);
}

function vecUnit(vector) {
  const length = vecNorm(vector);
  return length > 0 ? vecScale(vector, 1 / length) : [0, 0, 0];
}

function formatNumber(value, digits = 12) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(digits));
}

function finiteMin(values) {
  return values.reduce((best, value) => (Number.isFinite(value) && value < best ? value : best), Infinity);
}

function finiteMax(values) {
  return values.reduce((best, value) => (Number.isFinite(value) && value > best ? value : best), -Infinity);
}

function stationaryPath(id, polarity, position) {
  return {
    id,
    polarity,
    kind: "stationary",
    position,
    stateAt() {
      return {
        position,
        velocity: [0, 0, 0],
      };
    },
  };
}

function circularPath(id, polarity, center, radius, omega, phase = 0) {
  return {
    id,
    polarity,
    kind: "circular",
    center,
    radius,
    omega,
    phase,
    speed: Math.abs(radius * omega),
    stateAt(time) {
      const theta = omega * time + phase;
      const radial = [Math.cos(theta), Math.sin(theta), 0];
      const tangent = [-Math.sin(theta), Math.cos(theta), 0];
      return {
        position: vecAdd(center, vecScale(radial, radius)),
        velocity: vecScale(tangent, radius * omega),
      };
    },
  };
}

function defaultScenario() {
  const boxLength = 8;
  const cF = 1;
  const torusDiameter = (Math.sqrt(3) / 2) * boxLength;
  return {
    scenario_id: "neutral_torus_pair_self_hinge_photon_v0",
    box_length: boxLength,
    c_f: cF,
    retained_history_window: 7.25,
    eta: 0.02,
    epsilon_c: 0.01,
    caustic_tolerance: DEFAULT_CAUSTIC_TOLERANCE,
    paths: [
      stationaryPath("P_plus", 1, [1, 1, 1]),
      stationaryPath("P_minus", -1, [3, 1, 1]),
      circularPath("S_plus", 1, [4, 4, 4], 1, 1.35, 0),
    ],
    compact_lab: {
      torus_diameter: torusDiameter,
      compact_pair_contact_condition: "h > D_L/c_f",
      compact_pair_contact_condition_holds: 7.25 > torusDiameter / cF,
    },
    photon_channel: {
      c_f: cF,
      c_gamma: 0.995,
      c_eff: 0.997,
      c_0: 0.996,
      propagation_axis: [1, 0, 0],
      transverse_speeds: [0, 0.05, 0.12],
    },
    middle_hinge: {
      c_f: cF,
      speed_samples: [0.97, 1.02, 1, 0.995, 1.05, 1.03, 0.98],
    },
  };
}

function windingVectors(radius) {
  const result = [];
  for (let nx = -radius; nx <= radius; nx += 1) {
    for (let ny = -radius; ny <= radius; ny += 1) {
      for (let nz = -radius; nz <= radius; nz += 1) {
        result.push([nx, ny, nz]);
      }
    }
  }
  return result;
}

function displacementAtTau(receiver, source, scenario, tau, winding) {
  const receiverState = receiver.stateAt(0);
  const sourceState = source.stateAt(-tau);
  const imageShift = vecScale(winding, scenario.box_length);
  return vecSub(vecSub(receiverState.position, sourceState.position), imageShift);
}

function rootFunction(receiver, source, scenario, tau, winding) {
  return vecNorm(displacementAtTau(receiver, source, scenario, tau, winding)) - scenario.c_f * tau;
}

function rootJacobian(receiver, source, scenario, tau, winding) {
  const sourceState = source.stateAt(-tau);
  const displacement = displacementAtTau(receiver, source, scenario, tau, winding);
  const rhat = vecUnit(displacement);
  return 1 - vecDot(rhat, sourceState.velocity) / scenario.c_f;
}

function bisectionRoot(receiver, source, scenario, winding, left, right) {
  let a = left;
  let b = right;
  let fa = rootFunction(receiver, source, scenario, a, winding);
  let fb = rootFunction(receiver, source, scenario, b, winding);

  if (Math.abs(fa) <= ROOT_TOLERANCE) {
    return a;
  }
  if (Math.abs(fb) <= ROOT_TOLERANCE) {
    return b;
  }
  if (fa * fb > 0) {
    return null;
  }

  for (let index = 0; index < 80; index += 1) {
    const middle = 0.5 * (a + b);
    const fm = rootFunction(receiver, source, scenario, middle, winding);
    if (Math.abs(fm) <= ROOT_TOLERANCE || Math.abs(b - a) <= ROOT_TOLERANCE) {
      return middle;
    }
    if (fa * fm <= 0) {
      b = middle;
      fb = fm;
    } else {
      a = middle;
      fa = fm;
    }
  }

  return 0.5 * (a + b);
}

function addUniqueRoot(roots, tau, winding) {
  if (!Number.isFinite(tau) || tau <= ROOT_EPSILON) {
    return;
  }
  const duplicate = roots.some(
    (root) =>
      Math.abs(root.tau - tau) <= DUPLICATE_ROOT_TOLERANCE &&
      root.winding[0] === winding[0] &&
      root.winding[1] === winding[1] &&
      root.winding[2] === winding[2]
  );
  if (!duplicate) {
    roots.push({ tau, winding });
  }
}

function findRoots(receiver, source, scenario, winding, subdivisions) {
  const roots = [];
  let previousTau = ROOT_EPSILON;
  let previousValue = rootFunction(receiver, source, scenario, previousTau, winding);

  for (let step = 1; step <= subdivisions; step += 1) {
    const tau = ROOT_EPSILON + ((scenario.retained_history_window - ROOT_EPSILON) * step) / subdivisions;
    const value = rootFunction(receiver, source, scenario, tau, winding);

    if (Math.abs(value) <= ROOT_TOLERANCE) {
      addUniqueRoot(roots, tau, winding);
    } else if (
      Number.isFinite(previousValue) &&
      Number.isFinite(value) &&
      previousValue * value < 0
    ) {
      addUniqueRoot(roots, bisectionRoot(receiver, source, scenario, winding, previousTau, tau), winding);
    }

    previousTau = tau;
    previousValue = value;
  }

  return roots;
}

function classifyRootRow(receiver, source, scenario, root) {
  const jacobian = rootJacobian(receiver, source, scenario, root.tau, root.winding);
  const absJacobian = Math.abs(jacobian);
  const relation = receiver.id === source.id ? "self-hit" : "partner-hit";
  return {
    receiver: receiver.id,
    source: source.id,
    source_identity: relation,
    polarity_product: receiver.polarity * source.polarity,
    delay_tau: formatNumber(root.tau),
    source_time: formatNumber(-root.tau),
    winding: root.winding,
    winding_owner_present: true,
    root_equation: "G_ij,n(0,s)=||x_i(0)-x_j(s)-L*n||-c_f*(0-s)",
    jacobian: formatNumber(jacobian),
    abs_jacobian: formatNumber(absJacobian),
    row_status:
      absJacobian <= scenario.caustic_tolerance
        ? "caustic_candidate_not_ordinary_force_row"
        : "accepted_simple_root_diagnostic",
    finite_eta_segment: {
      eta: scenario.eta,
      source_time_half_width_estimate: formatNumber(scenario.eta / (scenario.c_f * Math.max(absJacobian, scenario.caustic_tolerance))),
      interpretation: "sharp root selects a source-history point; finite eta samples a source-path neighborhood",
    },
  };
}

function rootLedgerRows(scenario, subdivisions, windingRadius) {
  const windings = windingVectors(windingRadius);
  const rows = [];
  const pairRows = [];
  const selfRows = [];

  for (const receiver of scenario.paths) {
    for (const source of scenario.paths) {
      const roots = [];
      for (const winding of windings) {
        for (const root of findRoots(receiver, source, scenario, winding, subdivisions)) {
          addUniqueRoot(roots, root.tau, root.winding);
        }
      }
      roots.sort((left, right) => left.tau - right.tau);
      const classified = roots.map((root) => classifyRootRow(receiver, source, scenario, root));
      rows.push(...classified);
      const summaryRow = {
        receiver: receiver.id,
        source: source.id,
        source_identity: receiver.id === source.id ? "self-hit" : "partner-hit",
        root_count: classified.length,
        simple_root_count: classified.filter((row) => row.row_status === "accepted_simple_root_diagnostic").length,
        caustic_candidate_count: classified.filter((row) => row.row_status === "caustic_candidate_not_ordinary_force_row").length,
        windings: classified.map((row) => row.winding),
      };
      if (receiver.id === source.id) {
        selfRows.push(summaryRow);
      } else {
        pairRows.push(summaryRow);
      }
    }
  }

  return { rows, pairRows, selfRows };
}

function photonSpeedAudit(photon) {
  const rows = photon.transverse_speeds.map((transverseSpeed) => {
    const absoluteSpeed = Math.hypot(photon.c_gamma, transverseSpeed);
    const exceedsCF = absoluteSpeed > photon.c_f;
    return {
      c_f: photon.c_f,
      c_gamma: photon.c_gamma,
      c_eff: photon.c_eff,
      c_0: photon.c_0,
      transverse_speed: transverseSpeed,
      constituent_absolute_speed: formatNumber(absoluteSpeed),
      speed_relation:
        absoluteSpeed > photon.c_f
          ? "constituent_absolute_speed_exceeds_c_f"
          : "constituent_absolute_speed_not_above_c_f",
      branch_status_decision: exceedsCF
        ? "fail_closed_until_constituent_root_ledger_replay_routes_self_partner_caustic_or_inactive_rows"
        : "speed_split_does_not_force_self_hit_by_itself",
    };
  });

  return {
    speed_symbols: {
      c_f: "primitive causal-wake propagation speed",
      c_gamma: "photon-channel propagation speed",
      c_eff: "Noether sea dressed assembly-channel propagation speed",
      c_0: "asymptotic measured light-channel reference speed",
    },
    decomposition: "v_a = c_gamma*e_hat + v_perp with v_perp perpendicular to e_hat",
    absolute_speed_range: [formatNumber(finiteMin(rows.map((row) => row.constituent_absolute_speed))), formatNumber(finiteMax(rows.map((row) => row.constituent_absolute_speed)))],
    rows,
  };
}

function hingeStatus(speed, cF) {
  const residual = speed - cF;
  if (Math.abs(residual) <= ROOT_TOLERANCE) {
    return {
      symbol: "C",
      residual,
      status: "hinge_caustic_or_finite_eta_route_required",
    };
  }
  if (residual > 0) {
    return {
      symbol: "1",
      residual,
      status: "candidate_super_field_speed_self_hit_row_requires_root_replay",
    };
  }
  return {
    symbol: "0",
    residual,
    status: "strict_sub_field_speed_no_nearby_simple_self_hit",
  };
}

function middleHingeAudit(hinge) {
  const rows = hinge.speed_samples.map((speed, index) => {
    const status = hingeStatus(speed, hinge.c_f);
    return {
      sample_index: index,
      v_M_rel: speed,
      c_f: hinge.c_f,
      residual: formatNumber(status.residual),
      root_status_symbol: status.symbol,
      row_status: status.status,
    };
  });

  return {
    diagnostic: "sign(v_M_rel-c_f) root-status word",
    not_literal_communication: true,
    root_status_word: rows.map((row) => row.root_status_symbol).join(" "),
    rows,
  };
}

function sourceRecordContract(scenario, ledgerSummary) {
  return {
    source_record_id: DEFAULT_SOURCE_RECORD_ID,
    branch_class: DEFAULT_BRANCH_CLASS,
    retained_chart_id: DEFAULT_RETAINED_CHART_ID,
    retained_window: {
      id: DEFAULT_RETAINED_WINDOW_ID,
      h: scenario.retained_history_window,
      memory_depth: scenario.retained_history_window,
    },
    regulator_state: {
      eta: scenario.eta,
      epsilon_c: scenario.epsilon_c,
      status: "declared",
    },
    active_root_ledger: {
      ledger_id: DEFAULT_ACTIVE_ROOT_LEDGER_ID,
      root_row_count: ledgerSummary.root_row_count,
      partner_summary_row_count: ledgerSummary.ordered_partner_pair_count,
      self_summary_row_count: ledgerSummary.self_row_count,
      winding_owner_present: ledgerSummary.winding_owner_present,
      jacobian_floor: ledgerSummary.simple_root_floor_min,
      caustic_candidate_count: ledgerSummary.caustic_candidate_count,
      source_identity_rows: ["partner-hit", "self-hit"],
    },
    event_ledger_id: DEFAULT_EVENT_LEDGER_ID,
    response_object_id: DEFAULT_RESPONSE_OBJECT_ID,
    contract_status:
      "declared_same_record_priority_default; not retained-branch certification",
  };
}

export function buildTopologicalCausalRootLedgerArtifact(options = {}) {
  const scenario = defaultScenario();
  const subdivisions = Number.parseInt(options.subdivisions ?? DEFAULT_SUBDIVISIONS, 10);
  const windingRadius = Number.parseInt(options.windingRadius ?? DEFAULT_WINDING_RADIUS, 10);
  if (!Number.isInteger(subdivisions) || subdivisions < 100) {
    throw new Error("subdivisions must be an integer >= 100");
  }
  if (!Number.isInteger(windingRadius) || windingRadius < 0 || windingRadius > 2) {
    throw new Error("windingRadius must be an integer between 0 and 2");
  }

  const ledger = rootLedgerRows(scenario, subdivisions, windingRadius);
  const absJacobians = ledger.rows.map((row) => row.abs_jacobian).filter(Number.isFinite);
  const pairRootCounts = ledger.pairRows.map((row) => row.root_count);
  const selfRootCounts = ledger.selfRows.map((row) => row.root_count);
  const causticCount = ledger.rows.filter((row) => row.row_status === "caustic_candidate_not_ordinary_force_row").length;
  const allRootsHaveWindingOwners = ledger.rows.every((row) => row.winding_owner_present === true);
  const pairContactMinRootCount = finiteMin(pairRootCounts);
  const selfHitRootCount = selfRootCounts.reduce((sum, count) => sum + count, 0);
  const simpleRootFloorMin = finiteMin(absJacobians);
  const ledgerSummary = {
    path_count: scenario.paths.length,
    ordered_partner_pair_count: ledger.pairRows.length,
    self_row_count: ledger.selfRows.length,
    pair_contact_min_root_count: Number.isFinite(pairContactMinRootCount) ? pairContactMinRootCount : null,
    self_hit_root_count: selfHitRootCount,
    root_row_count: ledger.rows.length,
    winding_owner_present: allRootsHaveWindingOwners,
    simple_root_floor_min: formatNumber(simpleRootFloorMin),
    caustic_candidate_count: causticCount,
  };

  return {
    schema: TOPOLOGICAL_CAUSAL_ROOT_LEDGER_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    claim_level: "diagnostic-only priority artifact; does not certify an eigen-braid or promote corpus prose",
    scenario: {
      scenario_id: scenario.scenario_id,
      box_length: scenario.box_length,
      c_f: scenario.c_f,
      retained_history_window: scenario.retained_history_window,
      eta: scenario.eta,
      epsilon_c: scenario.epsilon_c,
      torus_diameter: formatNumber(scenario.compact_lab.torus_diameter),
      compact_pair_contact_condition: scenario.compact_lab.compact_pair_contact_condition,
      compact_pair_contact_condition_holds: scenario.compact_lab.compact_pair_contact_condition_holds,
      path_inventory: scenario.paths.map((entry) => ({
        id: entry.id,
        polarity: entry.polarity,
        kind: entry.kind,
        speed: formatNumber(entry.speed ?? 0),
      })),
    },
    source_record_contract: sourceRecordContract(scenario, ledgerSummary),
    numerical_method: {
      root_domain_tau: [ROOT_EPSILON, scenario.retained_history_window],
      subdivisions,
      winding_radius: windingRadius,
      root_tolerance: ROOT_TOLERANCE,
      caustic_tolerance: scenario.caustic_tolerance,
      retained_time: 0,
    },
    causal_root_ledger: {
      summary: ledgerSummary,
      pair_rows: ledger.pairRows,
      self_rows: ledger.selfRows,
      root_rows: ledger.rows,
    },
    compact_only_rows: [
      {
        row: "compact_pair_contact_guarantee",
        status: scenario.compact_lab.compact_pair_contact_condition_holds
          ? "holds_in_declared_torus_lab"
          : "not_triggered",
        large_box_limit_status: "not_preserved_for_fixed_h_as_L_to_infinity",
      },
    ],
    source_point_vs_eta_segment: {
      sharp_branch: "selected source-history point s=t-tau for each simple root",
      finite_eta_branch: "source-path neighborhood with half-width estimated by eta/(c_f*|J|)",
      row_count: ledger.rows.length,
    },
    photon_constituent_speed_split: photonSpeedAudit(scenario.photon_channel),
    middle_hinge_root_count_word: middleHingeAudit(scenario.middle_hinge),
    result: {
      diagnostic_status:
        pairContactMinRootCount >= 1 &&
        selfHitRootCount >= 1 &&
        allRootsHaveWindingOwners &&
        simpleRootFloorMin > 0
          ? "diagnostic_passed_priority_only"
          : "diagnostic_failed",
      retained_branch: false,
      updates_live_validation_gate: false,
      strongest_artifact:
        "sampled T_L^3 root-ledger diagnostic with pair contact, self-hit separation, winding ownership, Jacobian floors, photon speed split, and middle-hinge root-status word",
      first_failure_status: "action_wake_history_noether_sea_and_cross_sector_rows_not_computed",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateTopologicalCausalRootLedgerArtifact(artifact) {
  const errors = [];
  assertField(artifact && typeof artifact === "object" && !Array.isArray(artifact), "artifact must be an object", errors);
  if (errors.length > 0) {
    return errors;
  }

  assertField(
    artifact.schema === TOPOLOGICAL_CAUSAL_ROOT_LEDGER_SCHEMA,
    `schema must be ${TOPOLOGICAL_CAUSAL_ROOT_LEDGER_SCHEMA}`,
    errors
  );
  assertField(artifact.packet_id === PACKET_ID, `packet_id must be ${PACKET_ID}`, errors);
  assertField(artifact.promotion_status === PROMOTION_STATUS, `promotion_status must be ${PROMOTION_STATUS}`, errors);
  assertField(artifact.result?.retained_branch === false, "artifact must declare retained_branch=false", errors);
  assertField(artifact.result?.updates_live_validation_gate === false, "artifact must not update a live validation gate", errors);

  const summary = artifact.causal_root_ledger?.summary ?? {};
  assertField(summary.pair_contact_min_root_count >= 1, "partner rows must have at least one sampled root", errors);
  assertField(summary.self_hit_root_count >= 1, "self-hit rows must contain at least one sampled root", errors);
  assertField(summary.root_row_count === artifact.causal_root_ledger?.root_rows?.length, "summary.root_row_count must match root_rows", errors);
  assertField(summary.winding_owner_present === true, "all roots must carry winding ownership", errors);
  assertField(summary.simple_root_floor_min > 0, "simple root floor must be positive", errors);

  const sourceRecord = artifact.source_record_contract ?? {};
  assertField(sourceRecord.source_record_id === DEFAULT_SOURCE_RECORD_ID, `source_record_id must be ${DEFAULT_SOURCE_RECORD_ID}`, errors);
  assertField(sourceRecord.branch_class === DEFAULT_BRANCH_CLASS, `branch_class must be ${DEFAULT_BRANCH_CLASS}`, errors);
  assertField(
    sourceRecord.retained_chart_id === DEFAULT_RETAINED_CHART_ID,
    `retained_chart_id must be ${DEFAULT_RETAINED_CHART_ID}`,
    errors
  );
  assertField(
    sourceRecord.retained_window?.h === artifact.scenario?.retained_history_window,
    "source_record_contract retained_window.h must match scenario retained_history_window",
    errors
  );
  assertField(sourceRecord.regulator_state?.eta === artifact.scenario?.eta, "source_record_contract eta must match scenario eta", errors);
  assertField(
    sourceRecord.regulator_state?.epsilon_c === artifact.scenario?.epsilon_c,
    "source_record_contract epsilon_c must match scenario epsilon_c",
    errors
  );
  assertField(
    sourceRecord.active_root_ledger?.ledger_id === DEFAULT_ACTIVE_ROOT_LEDGER_ID,
    `active_root_ledger.ledger_id must be ${DEFAULT_ACTIVE_ROOT_LEDGER_ID}`,
    errors
  );
  assertField(
    sourceRecord.active_root_ledger?.root_row_count === summary.root_row_count,
    "source_record_contract root_row_count must match root ledger summary",
    errors
  );
  assertField(sourceRecord.event_ledger_id === DEFAULT_EVENT_LEDGER_ID, `event_ledger_id must be ${DEFAULT_EVENT_LEDGER_ID}`, errors);
  assertField(
    sourceRecord.response_object_id === DEFAULT_RESPONSE_OBJECT_ID,
    `response_object_id must be ${DEFAULT_RESPONSE_OBJECT_ID}`,
    errors
  );

  const rootRows = artifact.causal_root_ledger?.root_rows ?? [];
  assertField(Array.isArray(rootRows) && rootRows.length > 0, "root_rows must be a nonempty array", errors);
  assertField(rootRows.every((row) => Array.isArray(row.winding) && row.winding.length === 3), "each root row must carry a 3-entry winding", errors);
  assertField(
    rootRows.every((row) => row.source_identity === "self-hit" || row.source_identity === "partner-hit"),
    "root rows must separate self-hit from partner-hit",
    errors
  );

  const photonRows = artifact.photon_constituent_speed_split?.rows ?? [];
  assertField(photonRows.length >= 2, "photon speed split must include multiple transverse-speed rows", errors);
  assertField(
    photonRows.some((row) => row.speed_relation === "constituent_absolute_speed_exceeds_c_f"),
    "photon speed split must expose a super-field-speed constituent case",
    errors
  );

  const hingeRows = artifact.middle_hinge_root_count_word?.rows ?? [];
  assertField(hingeRows.length > 0, "middle hinge word must include sampled rows", errors);
  assertField(
    artifact.middle_hinge_root_count_word?.not_literal_communication === true,
    "middle hinge diagnostic must reject literal communication semantics",
    errors
  );
  assertField(
    artifact.middle_hinge_root_count_word?.root_status_word?.includes("C"),
    "middle hinge word must include the caustic/finite-eta route symbol",
    errors
  );

  return errors;
}

function usage() {
  return [
    "Usage: node scripts/proof-programs/topological-causal-root-ledger-checker.mjs [options]",
    "",
    "Options:",
    `  --subdivisions <n>     Root-search subdivisions (default: ${DEFAULT_SUBDIVISIONS})`,
    `  --winding-radius <n>   Winding search radius 0..2 (default: ${DEFAULT_WINDING_RADIUS})`,
    "  --out <path>           Write artifact JSON to path instead of stdout",
    "  --validate <path>      Validate an existing artifact JSON file",
    "  --schema               Print the artifact schema identifier",
    "  --pretty               Pretty-print JSON output",
    "  --help                 Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    subdivisions: DEFAULT_SUBDIVISIONS,
    windingRadius: DEFAULT_WINDING_RADIUS,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--subdivisions") {
      args.subdivisions = Number.parseInt(argv[++index], 10);
    } else if (arg === "--winding-radius") {
      args.windingRadius = Number.parseInt(argv[++index], 10);
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
          schema: "aaa-proof/topological-causal-root-ledger-checker-schema/v1",
          artifact_schema: TOPOLOGICAL_CAUSAL_ROOT_LEDGER_SCHEMA,
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
    const errors = validateTopologicalCausalRootLedgerArtifact(artifact);
    process.stdout.write(
      printJson(
        {
          valid: errors.length === 0,
          errors,
          schema: artifact.schema,
          summary: artifact.causal_root_ledger?.summary ?? null,
          result: artifact.result ?? null,
        },
        args.pretty
      )
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact = buildTopologicalCausalRootLedgerArtifact({
    subdivisions: args.subdivisions,
    windingRadius: args.windingRadius,
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
