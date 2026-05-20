#!/usr/bin/env node

import fs from "node:fs";

const INPUT_SCHEMA = "aaa-proof/field-speed-head-on-finite-history/v1";
const RESULT_SCHEMA = "aaa-proof/field-speed-head-on-finite-history-result/v1";
const SQRT_TWO_PI = Math.sqrt(2 * Math.PI);
const COMPACT_POLYNOMIAL_MOLLIFIER = "compact_polynomial_c1_15_16";
const GAUSSIAN_MOLLIFIER = "gaussian";

function parseArgs(argv) {
  const args = {
    input: null,
    out: null,
    pretty: false,
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
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/field-speed-head-on-finite-history.mjs --input PATH [options]

Options:
  --input PATH  Finite-history head-on audit JSON, schema ${INPUT_SCHEMA}.
  --out PATH    Write result JSON to PATH instead of stdout.
  --pretty      Pretty-print JSON.
  --help        Show this help.

This script evaluates the closed-form continuous finite-history dual-mollified
acceleration for the exact field-speed affine head-on history before the origin
caustic. It also emits an optional countable-emission comparison when a discrete
cadence is supplied.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value, pretty) {
  const text = JSON.stringify(value, null, pretty ? 2 : 0) + "\n";
  if (filePath) {
    fs.writeFileSync(filePath, text);
  } else {
    process.stdout.write(text);
  }
}

function finitePositive(value, name) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    throw new Error(`${name} must be a finite positive number.`);
  }
  return number;
}

function finiteNonnegative(value, name) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) {
    throw new Error(`${name} must be a finite nonnegative number.`);
  }
  return number;
}

function readShellMollifier(parameters) {
  const spec = parameters.shell_mollifier;
  if (spec == null) {
    throw new Error(
      `parameters.shell_mollifier is required; use "${COMPACT_POLYNOMIAL_MOLLIFIER}" or "${GAUSSIAN_MOLLIFIER}".`
    );
  }

  const type = typeof spec === "string" ? spec : spec.type;
  if (type !== COMPACT_POLYNOMIAL_MOLLIFIER && type !== GAUSSIAN_MOLLIFIER) {
    throw new Error(
      `parameters.shell_mollifier.type must be "${COMPACT_POLYNOMIAL_MOLLIFIER}" or "${GAUSSIAN_MOLLIFIER}".`
    );
  }
  return { type };
}

function gaussianShell(value, eta) {
  return Math.exp(-(value * value) / (2 * eta * eta)) / (SQRT_TWO_PI * eta);
}

function logGaussianShell(value, eta) {
  return -(value * value) / (2 * eta * eta) - Math.log(SQRT_TWO_PI * eta);
}

function compactPolynomialBase(z) {
  if (Math.abs(z) > 1) {
    return 0;
  }
  return (15 / 16) * (1 - z * z) ** 2;
}

function shellValue(value, eta, mollifier) {
  if (mollifier.type === GAUSSIAN_MOLLIFIER) {
    return gaussianShell(value, eta);
  }
  return compactPolynomialBase(value / eta) / eta;
}

function logShellValue(value, eta, mollifier) {
  if (mollifier.type === GAUSSIAN_MOLLIFIER) {
    return logGaussianShell(value, eta);
  }
  const base = compactPolynomialBase(value / eta);
  return base > 0 ? Math.log(base) - Math.log(eta) : Number.NEGATIVE_INFINITY;
}

function shellFormula(mollifier) {
  if (mollifier.type === GAUSSIAN_MOLLIFIER) {
    return "delta_eta(y)=exp(-y^2/(2*eta^2))/(sqrt(2*pi)*eta)";
  }
  return "delta_eta(y)=eta^-1*(15/16)*(1-(y/eta)^2)^2 for |y|<=eta, and 0 otherwise";
}

function shellSupportMetadata(value, eta, mollifier) {
  if (mollifier.type === GAUSSIAN_MOLLIFIER) {
    return {
      outside_compact_support: null,
      zero_reason: shellValue(value, eta, mollifier) === 0 ? "floating_underflow" : null,
    };
  }

  const outside = Math.abs(value / eta) > 1;
  return {
    outside_compact_support: outside,
    zero_reason: outside ? "outside_compact_support" : null,
  };
}

function continuousIntegralFromShift(shift, horizon, cF, epsilonC) {
  return (
    Math.atan((shift + cF * horizon) / epsilonC) -
    Math.atan(shift / epsilonC)
  ) / (cF * epsilonC);
}

function discreteSumFromShift(shift, horizon, cadence, cF, epsilonC) {
  const count = Math.floor(horizon / cadence);
  let sum = 0;
  for (let k = 1; k <= count; k += 1) {
    const u = k * cadence;
    const radius = shift + cF * u;
    sum += 1 / (radius * radius + epsilonC * epsilonC);
  }
  return {
    count,
    sum,
  };
}

function readParameters(input) {
  if (input.schema !== INPUT_SCHEMA) {
    throw new Error(`Expected schema ${INPUT_SCHEMA}, got ${input.schema ?? "missing"}.`);
  }

  const parameters = input.parameters ?? {};
  const cF = finitePositive(parameters.c_f, "parameters.c_f");
  const x0 = finitePositive(parameters.x0, "parameters.x0");
  const g = finitePositive(parameters.g, "parameters.g");
  const epsilonC = finitePositive(parameters.epsilon_c, "parameters.epsilon_c");
  const eta = finitePositive(parameters.eta, "parameters.eta");
  const shellMollifier = readShellMollifier(parameters);
  const auditTime = finiteNonnegative(parameters.audit_time ?? 0, "parameters.audit_time");
  const horizons = Array.isArray(parameters.history_horizons)
    ? parameters.history_horizons.map((value, index) =>
        finitePositive(value, `parameters.history_horizons[${index}]`)
      )
    : [];
  if (horizons.length === 0) {
    throw new Error("parameters.history_horizons must contain at least one positive horizon.");
  }
  const cadence = parameters.discrete_emission_cadence == null
    ? null
    : finitePositive(parameters.discrete_emission_cadence, "parameters.discrete_emission_cadence");

  return {
    cF,
    x0,
    g,
    epsilonC,
    eta,
    shellMollifier,
    auditTime,
    horizons,
    cadence,
  };
}

function evaluate(input) {
  const params = readParameters(input);
  const collisionTime = params.x0 / params.cF;
  const partnerShift = 2 * (params.x0 - params.cF * params.auditTime);
  const shellAtZero = shellValue(0, params.eta, params.shellMollifier);
  const shellAtPartnerShift = shellValue(
    partnerShift,
    params.eta,
    params.shellMollifier
  );
  const logShellAtZero = logShellValue(0, params.eta, params.shellMollifier);
  const logShellAtPartnerShift = logShellValue(
    partnerShift,
    params.eta,
    params.shellMollifier
  );
  const partnerShellMetadata = shellSupportMetadata(
    partnerShift,
    params.eta,
    params.shellMollifier
  );
  const preOrigin = params.auditTime < collisionTime;

  const continuousRows = params.horizons.map((horizon) => {
    const selfIntegral = continuousIntegralFromShift(0, horizon, params.cF, params.epsilonC);
    const partnerIntegral = preOrigin
      ? continuousIntegralFromShift(partnerShift, horizon, params.cF, params.epsilonC)
      : null;
    const selfAcceleration = -params.g * shellAtZero * selfIntegral;
    const partnerAcceleration = partnerIntegral == null
      ? null
      : -params.g * shellAtPartnerShift * partnerIntegral;
    return {
      horizon,
      right_receiver_self_acceleration: selfAcceleration,
      right_receiver_partner_acceleration: partnerAcceleration,
      right_receiver_total_acceleration:
        partnerAcceleration == null ? null : selfAcceleration + partnerAcceleration,
      left_receiver_total_acceleration:
        partnerAcceleration == null ? null : -(selfAcceleration + partnerAcceleration),
      self_integral: selfIntegral,
      partner_integral: partnerIntegral,
    };
  });

  const selfInfiniteIntegral = Math.PI / (2 * params.cF * params.epsilonC);
  const partnerInfiniteIntegral = preOrigin
    ? (Math.PI / 2 - Math.atan(partnerShift / params.epsilonC)) /
      (params.cF * params.epsilonC)
    : null;
  const selfInfiniteAcceleration = -params.g * shellAtZero * selfInfiniteIntegral;
  const partnerInfiniteAcceleration = partnerInfiniteIntegral == null
    ? null
    : -params.g * shellAtPartnerShift * partnerInfiniteIntegral;

  const discreteRows = params.cadence == null
    ? []
    : params.horizons.map((horizon) => {
        const self = discreteSumFromShift(0, horizon, params.cadence, params.cF, params.epsilonC);
        const partner = preOrigin
          ? discreteSumFromShift(partnerShift, horizon, params.cadence, params.cF, params.epsilonC)
          : null;
        const selfAcceleration = -params.g * shellAtZero * self.sum;
        const partnerAcceleration = partner == null
          ? null
          : -params.g * shellAtPartnerShift * partner.sum;
        return {
          horizon,
          cadence: params.cadence,
          count: self.count,
          right_receiver_self_acceleration_raw_countable: selfAcceleration,
          right_receiver_partner_acceleration_raw_countable: partnerAcceleration,
          right_receiver_total_acceleration_raw_countable:
            partnerAcceleration == null ? null : selfAcceleration + partnerAcceleration,
          self_sum: self.sum,
          partner_sum: partner?.sum ?? null,
        };
      });

  const shellBaseAtZero = shellAtZero * params.eta;
  const regulatorAsymptotic = -params.g * Math.PI * shellBaseAtZero /
    (2 * params.cF * params.epsilonC * params.eta);

  return {
    schema: RESULT_SCHEMA,
    packet_id: input.packet_id ?? "field-speed-head-on-finite-history-v0",
    source_input: input.packet_id ?? null,
    status: preOrigin
      ? "finite_history_formula_evaluated_pre_origin"
      : "origin_or_post_origin_caustic_not_evaluated",
    claim_level: "closed-form finite-history dual-mollified acceleration for affine field-speed pre-origin history",
    branch_chart_authorized: false,
    candidate_cycle_authorized: false,
    updates_live_ledger: false,
    parameters: {
      c_f: params.cF,
      x0: params.x0,
      g: params.g,
      epsilon_c: params.epsilonC,
      eta: params.eta,
      shell_mollifier: params.shellMollifier,
      audit_time: params.auditTime,
      collision_time: collisionTime,
      discrete_emission_cadence: params.cadence,
    },
    formulas: {
      right_receiver_self:
        "-g*delta_eta(0)*atan(c_f*H/epsilon_c)/(c_f*epsilon_c)",
      right_receiver_partner:
        "-g*delta_eta(2*(x0-c_f*t))*(atan((2*(x0-c_f*t)+c_f*H)/epsilon_c)-atan(2*(x0-c_f*t)/epsilon_c))/(c_f*epsilon_c)",
      shell_mollifier: shellFormula(params.shellMollifier),
    },
    shell_values: {
      base_delta_0: shellBaseAtZero,
      delta_eta_0: shellAtZero,
      log_delta_eta_0: logShellAtZero,
      partner_shift: partnerShift,
      delta_eta_partner_shift: shellAtPartnerShift,
      log_delta_eta_partner_shift: logShellAtPartnerShift,
      partner_shell_value_is_zero: shellAtPartnerShift === 0,
      partner_shell_outside_compact_support:
        partnerShellMetadata.outside_compact_support,
      partner_shell_zero_reason: partnerShellMetadata.zero_reason,
    },
    continuous_history_rows: continuousRows,
    continuous_horizon_limit: {
      right_receiver_self_acceleration: selfInfiniteAcceleration,
      right_receiver_partner_acceleration: partnerInfiniteAcceleration,
      right_receiver_total_acceleration:
        partnerInfiniteAcceleration == null
          ? null
          : selfInfiniteAcceleration + partnerInfiniteAcceleration,
    },
    raw_countable_emission_rows: discreteRows,
    regulator_limit_assessment: {
      fixed_eta_epsilon_history_limit: "finite",
      eta_epsilon_to_zero: "divergent_self_continuum",
      leading_self_asymptotic: regulatorAsymptotic,
      leading_self_asymptotic_class: "1/(eta*epsilon_c)",
      meaning:
        "The infinite-history limit saturates for fixed eta and epsilon_c, but the exact field-speed seed has no regulator-independent acceleration because the same-source continuum scales like 1/(eta*epsilon_c).",
    },
    theory_success_marker:
      "closed_form_field_speed_self_continuum_regularized_acceleration",
    next_lawful_step:
      "Evaluate a solved or dephased finite-history preparation; do not treat the exact affine field-speed seed as a simple-root candidate cycle.",
  };
}

const args = parseArgs(process.argv.slice(2));
if (args.help || !args.input) {
  printHelp();
  process.exit(args.help ? 0 : 1);
}

writeJson(args.out, evaluate(readJson(args.input)), args.pretty);
