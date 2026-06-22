#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "noether-braid-envelope-hessian-scan.mock.json");
const DEFAULT_TOLERANCE = 1e-9;
const DEFAULT_READOUT_CANDIDATES = [
  { name: "fixed_core_readout", q_R: 0, q_xi: 0 },
  { name: "transverse_radius_readout", q_R: 1, q_xi: 0 },
  { name: "volume_equivalent_readout", q_R: 1, q_xi: 1 / 3 },
  { name: "parallel_radius_readout", q_R: 1, q_xi: 1 },
];

function parseArgs(argv) {
  const args = {
    input: DEFAULT_INPUT_PATH,
    out: null,
    pretty: false,
    requireBranchEvidence: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--input") {
      args.input = argv[++i];
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--require-branch-evidence") {
      args.requireBranchEvidence = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/mass-map/noether-braid-envelope-hessian-scanner.mjs [options]

Options:
  --input PATH  Hessian scan packet. Defaults to scripts/mass-map/noether-braid-envelope-hessian-scan.mock.json
  --out PATH    Write JSON output to a file instead of stdout.
  --pretty      Pretty-print JSON output.
  --require-branch-evidence
                Fail candidate rows unless their scenario declares accepted finite-branch Hessian evidence.
  --help        Show this help.

This evaluates the reduced Noether swarm envelope Hessian rescue conditions:
  Delta_H = k_R k_xi - k_Rxi^2
  A_H = (k_xi c_R - k_Rxi c_xi) / D_H
  B_H = (k_R c_xi - k_Rxi c_R) / D_H
  c_R A_H + c_xi B_H = 1
  G_chi (b_n - b_lambda A_H - b_R Q_H)
    = (G_Gamma - G_chi/(1 + gamma_eff)) (d_n + d_lambda A_H - d_R Q_H).
It is a priority-side branch-certificate aid, not an empirical validation runner.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`${label} must be a finite number.`);
  }
  return number;
}

function optionalFiniteNumber(value, label, fallback = 0) {
  return value === undefined ? fallback : finiteNumber(value, label);
}

function positiveNumber(value, label) {
  const number = finiteNumber(value, label);
  if (number <= 0) {
    throw new Error(`${label} must be positive.`);
  }
  return number;
}

function nonnegativeNumber(value, label) {
  const number = finiteNumber(value, label);
  if (number < 0) {
    throw new Error(`${label} must be nonnegative.`);
  }
  return number;
}

function asObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object.`);
  }
  return value;
}

function scenarioTolerance(packet, scenario) {
  return nonnegativeNumber(
    scenario.tolerance ?? packet.defaults?.tolerance ?? DEFAULT_TOLERANCE,
    "tolerance",
  );
}

function closeToZero(value, tolerance) {
  return Math.abs(value) <= tolerance;
}

function maxAbs(values) {
  return values.reduce((max, value) => Math.max(max, Math.abs(value)), 0);
}

function thetaSamples(packet, scenario) {
  const raw = scenario.theta_samples ?? packet.defaults?.theta_samples;
  if (raw !== undefined) {
    if (!Array.isArray(raw) || raw.length === 0) {
      throw new Error(`${scenario.name}.theta_samples must be a nonempty array.`);
    }
    return raw.map((entry, index) => finiteNumber(entry, `${scenario.name}.theta_samples[${index}]`));
  }
  const thetaAbsMax = nonnegativeNumber(
    scenario.theta_abs_max ?? packet.defaults?.theta_abs_max ?? 1,
    `${scenario.name}.theta_abs_max`,
  );
  return [thetaAbsMax];
}

function readoutCandidates(packet, scenario) {
  const raw = scenario.readout_candidates ?? packet.readout_candidates ?? DEFAULT_READOUT_CANDIDATES;
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new Error(`${scenario.name}.readout_candidates must be a nonempty array.`);
  }
  return raw.map((candidate, index) => {
    const source = asObject(candidate, `${scenario.name}.readout_candidates[${index}]`);
    return {
      name: typeof source.name === "string" ? source.name : `readout_${index}`,
      q_R: finiteNumber(source.q_R, `${scenario.name}.readout_candidates[${index}].q_R`),
      q_xi: finiteNumber(source.q_xi, `${scenario.name}.readout_candidates[${index}].q_xi`),
    };
  });
}

function rowValues(row, label, keys) {
  const source = asObject(row, label);
  return Object.fromEntries(keys.map((key) => [key, finiteNumber(source[key], `${label}.${key}`)]));
}

function hessianValues(scenario) {
  const hessian = asObject(scenario.hessian, `${scenario.name}.hessian`);
  return {
    k_R: finiteNumber(hessian.k_R, `${scenario.name}.hessian.k_R`),
    k_xi: finiteNumber(hessian.k_xi, `${scenario.name}.hessian.k_xi`),
    k_Rxi: finiteNumber(hessian.k_Rxi, `${scenario.name}.hessian.k_Rxi`),
  };
}

function pressureValues(scenario) {
  const pressure = asObject(scenario.pressure, `${scenario.name}.pressure`);
  const gammaEff = finiteNumber(pressure.gamma_eff, `${scenario.name}.pressure.gamma_eff`);
  if (gammaEff === -1) {
    throw new Error(`${scenario.name}.pressure.gamma_eff must not be -1.`);
  }
  return {
    G_Gamma: finiteNumber(pressure.G_Gamma, `${scenario.name}.pressure.G_Gamma`),
    G_chi: finiteNumber(pressure.G_chi, `${scenario.name}.pressure.G_chi`),
    gamma_eff: gammaEff,
  };
}

function branchEvidence(scenario, requireBranchEvidence) {
  const raw = scenario.branch_evidence;
  const evidence = raw === undefined ? {} : asObject(raw, `${scenario.name}.branch_evidence`);
  const kind = typeof evidence.kind === "string" ? evidence.kind : "unspecified";
  const status = typeof evidence.status === "string" ? evidence.status : null;
  const source = typeof evidence.source === "string" && evidence.source.trim() !== ""
    ? evidence.source
    : null;
  const required = requireBranchEvidence || evidence.required === true;
  const acceptedHistorySegment =
    evidence.accepted_history_segment === true || status === "accepted_history_segment";
  const hessianEntriesDerived = evidence.hessian_entries_derived === true;
  const hessianSource = typeof evidence.hessian_source === "string" ? evidence.hessian_source : null;
  const failureReasons = [];

  if (required) {
    if (kind !== "finite_branch") {
      failureReasons.push("finite_branch_evidence_missing");
    }
    if (!acceptedHistorySegment) {
      failureReasons.push("accepted_history_segment_missing");
    }
    if (!hessianEntriesDerived) {
      failureReasons.push("hessian_entries_not_derived");
    }
    if (!source) {
      failureReasons.push("branch_source_missing");
    }
    if (!hessianSource) {
      failureReasons.push("hessian_source_missing");
    }
  }

  return {
    required,
    kind,
    status,
    source,
    accepted_history_segment: acceptedHistorySegment,
    hessian_entries_derived: hessianEntriesDerived,
    hessian_source: hessianSource,
    pass: failureReasons.length === 0,
    failure_reasons: failureReasons,
  };
}

function evaluateHessian(scenario, tolerance) {
  const { k_R, k_xi, k_Rxi } = hessianValues(scenario);
  const c_R = positiveNumber(scenario.c_R ?? 3, `${scenario.name}.c_R`);
  const c_xi = finiteNumber(scenario.c_xi ?? 1, `${scenario.name}.c_xi`);
  const deltaH = k_R * k_xi - k_Rxi ** 2;
  const D_H = k_xi * c_R ** 2 - 2 * k_Rxi * c_R * c_xi + k_R * c_xi ** 2;
  const positiveBranch =
    k_R > tolerance &&
    k_xi > tolerance &&
    deltaH > tolerance &&
    D_H > tolerance;
  const kEnvV = D_H === 0 ? null : deltaH / D_H;
  const A_H = D_H === 0 ? null : (k_xi * c_R - k_Rxi * c_xi) / D_H;
  const B_H = D_H === 0 ? null : (k_R * c_xi - k_Rxi * c_R) / D_H;
  const affineResidual = A_H === null || B_H === null ? null : c_R * A_H + c_xi * B_H - 1;
  return {
    k_R,
    k_xi,
    k_Rxi,
    c_R,
    c_xi,
    Delta_H: deltaH,
    D_H,
    k_env_V: kEnvV,
    A_H,
    B_H,
    affine_residual: affineResidual,
    positive_branch: positiveBranch,
  };
}

function alphaPressure(pressure) {
  if (pressure.G_chi === 0) {
    return null;
  }
  return (pressure.G_Gamma - pressure.G_chi / (1 + pressure.gamma_eff)) / pressure.G_chi;
}

function candidateStar({ hessian, candidate, rows, alpha, tolerance }) {
  const { c_R: cR, c_xi: cXi } = hessian;
  const { q_R: qR, q_xi: qXi } = candidate;
  const { b, d } = rows;
  if (alpha === null) {
    return {
      mode: "undefined_alpha",
      feasible: false,
      reason: "G_chi is zero, so alpha_P is undefined.",
    };
  }

  if (Math.abs(cXi) > tolerance) {
    const q0 = qXi / cXi;
    const q1 = qR - (qXi * cR) / cXi;
    const C0 = b.b_n - b.b_R * q0;
    const C1 = b.b_lambda + b.b_R * q1;
    const D0 = d.d_n - d.d_R * q0;
    const D1 = d.d_lambda - d.d_R * q1;
    const denominator = C1 + alpha * D1;
    const numerator = C0 - alpha * D0;
    if (Math.abs(denominator) <= tolerance) {
      return {
        mode: "c_xi_nonzero",
        q0,
        q1,
        C0,
        C1,
        D0,
        D1,
        numerator,
        denominator,
        feasible: Math.abs(numerator) <= tolerance,
        unresolved_A_H: Math.abs(numerator) <= tolerance,
      };
    }
    const AStar = numerator / denominator;
    const BStar = (1 - cR * AStar) / cXi;
    const QStar = q0 + q1 * AStar;
    return {
      mode: "c_xi_nonzero",
      q0,
      q1,
      C0,
      C1,
      D0,
      D1,
      numerator,
      denominator,
      A_H_star: AStar,
      B_H_star: BStar,
      Q_H_star: QStar,
      feasible: true,
      unresolved_A_H: false,
    };
  }

  const AStar = 1 / cR;
  const qBase = qR * AStar;
  const CBase = b.b_n - b.b_lambda * AStar - b.b_R * qBase;
  const CB = -b.b_R * qXi;
  const DBase = d.d_n + d.d_lambda * AStar - d.d_R * qBase;
  const DB = -d.d_R * qXi;
  const denominator = CB - alpha * DB;
  const numerator = alpha * DBase - CBase;
  if (Math.abs(denominator) <= tolerance) {
    return {
      mode: "c_xi_zero",
      A_H_star: AStar,
      CBase,
      CB,
      DBase,
      DB,
      numerator,
      denominator,
      feasible: Math.abs(numerator) <= tolerance,
      unresolved_B_H: Math.abs(numerator) <= tolerance,
    };
  }
  const BStar = numerator / denominator;
  return {
    mode: "c_xi_zero",
    A_H_star: AStar,
    B_H_star: BStar,
    Q_H_star: qBase + qXi * BStar,
    CBase,
    CB,
    DBase,
    DB,
    numerator,
    denominator,
    feasible: true,
    unresolved_B_H: false,
  };
}

function evaluateCandidate({ packet, scenario, branchEvidenceResult, hessian, pressure, rows, candidate, tolerance }) {
  const alpha = alphaPressure(pressure);
  const Q_H = hessian.A_H === null || hessian.B_H === null
    ? null
    : candidate.q_R * hessian.A_H + candidate.q_xi * hessian.B_H;
  const delayDenominator = Q_H === null
    ? null
    : rows.d.d_n + rows.d.d_lambda * hessian.A_H - rows.d.d_R * Q_H;
  const cadenceSide = Q_H === null
    ? null
    : rows.b.b_n - rows.b.b_lambda * hessian.A_H - rows.b.b_R * Q_H;
  const pressureMismatch = pressure.G_Gamma - pressure.G_chi / (1 + pressure.gamma_eff);
  const scalarResidual = Q_H === null
    ? null
    : pressure.G_chi * cadenceSide - pressureMismatch * delayDenominator;
  const scalarPass = scalarResidual !== null && closeToZero(scalarResidual, tolerance);
  const kappaN = delayDenominator === null || closeToZero(delayDenominator, tolerance)
    ? null
    : pressure.G_chi / delayDenominator;
  const densitySignPass = kappaN !== null && kappaN > 0;
  const samples = thetaSamples(packet, scenario);
  const xiPerTheta = kappaN === null || hessian.B_H === null ? null : -kappaN * hessian.B_H;
  const xiResiduals = xiPerTheta === null ? [] : samples.map((theta) => xiPerTheta * theta);
  const xiResidualMaxAbs = xiResiduals.length === 0 ? null : maxAbs(xiResiduals);
  const epsilonXi = nonnegativeNumber(
    scenario.epsilon_xi_P ?? packet.defaults?.epsilon_xi_P ?? 0,
    `${scenario.name}.epsilon_xi_P`,
  );
  const strictScalar = Boolean(scenario.strict_scalar ?? packet.defaults?.strict_scalar ?? false);
  const strictScalarPass = hessian.B_H !== null && closeToZero(hessian.B_H, tolerance);
  const boundedXiPass = xiResidualMaxAbs !== null && xiResidualMaxAbs <= epsilonXi + tolerance;
  const xiPass = strictScalar ? strictScalarPass : boundedXiPass;
  const star = candidateStar({ hessian, candidate, rows, alpha, tolerance });
  const starResidual = star.A_H_star === undefined || hessian.A_H === null
    ? null
    : hessian.A_H - star.A_H_star;

  const failureReasons = [];
  if (!hessian.positive_branch) {
    failureReasons.push("positive_hessian_failed");
  }
  if (!branchEvidenceResult.pass) {
    failureReasons.push("branch_evidence_failed");
  }
  if (!scalarPass) {
    failureReasons.push("scalar_feasibility_failed");
  }
  if (!densitySignPass) {
    failureReasons.push("density_sign_failed");
  }
  if (!xiPass) {
    failureReasons.push(strictScalar ? "shape_ratio_not_cancelled" : "shape_ratio_bound_failed");
  }

  const status = failureReasons.length === 0 ? "pass" : "fail";
  return {
    name: candidate.name,
    status,
    failure_reasons: failureReasons,
    readout: {
      q_R: candidate.q_R,
      q_xi: candidate.q_xi,
      Q_H,
    },
    scalar_feasibility: {
      alpha_P: alpha,
      cadence_side: cadenceSide,
      delay_side: delayDenominator,
      residual: scalarResidual,
      pass: scalarPass,
      star,
      A_H_minus_A_H_star: starResidual,
    },
    branch_evidence: branchEvidenceResult,
    density_sign: {
      denominator: delayDenominator,
      kappa_n: kappaN,
      pass: densitySignPass,
    },
    shape_ratio_residual: {
      strict_scalar: strictScalar,
      xi_per_theta: xiPerTheta,
      theta_samples: samples,
      residuals: xiResiduals,
      max_abs: xiResidualMaxAbs,
      epsilon_xi_P: epsilonXi,
      strict_scalar_pass: strictScalarPass,
      bounded_pass: boundedXiPass,
      pass: xiPass,
    },
  };
}

function evaluateScenario(packet, scenario, index, options) {
  const name = typeof scenario.name === "string" ? scenario.name : `scenario_${index}`;
  const normalizedScenario = { ...scenario, name };
  const tolerance = scenarioTolerance(packet, normalizedScenario);
  const hessian = evaluateHessian(normalizedScenario, tolerance);
  const pressure = pressureValues(normalizedScenario);
  const branchEvidenceResult = branchEvidence(
    normalizedScenario,
    options.requireBranchEvidence,
  );
  const rows = {
    b: rowValues(normalizedScenario.cadence_row, `${name}.cadence_row`, ["b_n", "b_lambda", "b_R"]),
    d: rowValues(normalizedScenario.delay_row, `${name}.delay_row`, ["d_n", "d_lambda", "d_R"]),
  };
  const candidates = readoutCandidates(packet, normalizedScenario).map((candidate) =>
    evaluateCandidate({
      packet,
      scenario: normalizedScenario,
      branchEvidenceResult,
      hessian,
      pressure,
      rows,
      candidate,
      tolerance,
    }),
  );
  const passCount = candidates.filter((candidate) => candidate.status === "pass").length;
  return {
    name,
    status: passCount > 0 ? "pass" : "fail",
    tolerance,
    pressure,
    branch_evidence: branchEvidenceResult,
    hessian,
    rows,
    candidates,
    diagnostics: {
      candidate_count: candidates.length,
      candidate_pass_count: passCount,
      candidate_fail_count: candidates.length - passCount,
    },
  };
}

function evaluatePacket(packet, options) {
  const scenarios = Array.isArray(packet.scenarios) ? packet.scenarios : [];
  if (scenarios.length === 0) {
    throw new Error("scenarios must be a nonempty array.");
  }
  const results = scenarios.map((scenario, index) => evaluateScenario(packet, scenario, index, options));
  const candidateResults = results.flatMap((result) => result.candidates);
  return {
    schema: "aaa-noether-braid-envelope-hessian-scan-output/v1",
    input_schema: packet.schema ?? "aaa-noether-braid-envelope-hessian-scan-input/v1",
    diagnostics: {
      scenario_count: results.length,
      scenario_pass_count: results.filter((result) => result.status === "pass").length,
      scenario_fail_count: results.filter((result) => result.status === "fail").length,
      candidate_count: candidateResults.length,
      candidate_pass_count: candidateResults.filter((result) => result.status === "pass").length,
      candidate_fail_count: candidateResults.filter((result) => result.status === "fail").length,
    },
    results,
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const packet = readJson(args.input);
  const output = evaluatePacket(packet, { requireBranchEvidence: args.requireBranchEvidence });
  const json = JSON.stringify(output, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(args.out, `${json}\n`);
  } else {
    console.log(json);
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
