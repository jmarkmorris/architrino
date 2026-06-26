#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const DEFAULT_INPUT_PATH = path.join(
  SCRIPT_DIR,
  "eq02-04-translating-binary-retained-record-attempt.v1.json",
);
const INPUT_SCHEMA =
  "aaa-equation-map-eq02-04-translating-binary-retained-record-input/v1";
const OUTPUT_SCHEMA =
  "aaa-equation-map-eq02-04-translating-binary-retained-record-check/v1";
const COFRAME_EXTRACTION_SCHEMA =
  "aaa-equation-map-eq02-04-coframe-extraction-certificate/v1";
const COFRAME_EXTRACTION_PRODUCER_SCHEMA =
  "aaa-equation-map-eq02-04-coframe-extraction-producer/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "populated", "passed"]);
const EPSILON = 1e-12;

const ROWS = [
  {
    key: "common_carrier",
    row: "common carrier",
    consumes: ["EQ-02", "EQ-03", "EQ-04"],
  },
  {
    key: "retained_branch_chart",
    row: "retained branch chart",
    consumes: ["EQ-02", "EQ-03", "EQ-04"],
  },
  {
    key: "root_starvation_row",
    row: "root-starvation row",
    consumes: ["EQ-02", "EQ-03"],
    diagnostic: "rootStarvation",
  },
  {
    key: "same_root_conservation_row",
    row: "same-root conservation row",
    consumes: ["EQ-02", "EQ-03", "EQ-04", "EQ-05"],
    diagnostic: "sameRootConservation",
  },
  {
    key: "same_branch_chart_identity",
    row: "same-branch chart identity",
    consumes: ["EQ-02", "EQ-03", "EQ-04"],
  },
  {
    key: "gamma_free_coframe_row",
    row: "gamma-free coframe row",
    consumes: ["EQ-02", "EQ-03", "EQ-04"],
    diagnostic: "coframeReciprocity",
  },
  {
    key: "clock_row",
    row: "clock row",
    consumes: ["EQ-02"],
    diagnostic: "clock",
  },
  {
    key: "envelope_row",
    row: "envelope row",
    consumes: ["EQ-03"],
    diagnostic: "envelope",
  },
  {
    key: "two_way_signal_row",
    row: "two-way signal row",
    consumes: ["EQ-02", "EQ-07", "EQ-09"],
    diagnostic: "twoWaySignal",
  },
  {
    key: "energy_row",
    row: "energy row",
    consumes: ["EQ-04", "EQ-05"],
    diagnostic: "energy",
  },
  {
    key: "exposure_row",
    row: "exposure row",
    consumes: ["EQ-04", "mass-map handoff"],
    diagnostic: "exposure",
  },
  {
    key: "momentum_row",
    row: "momentum row",
    consumes: ["EQ-04", "EQ-05"],
    diagnostic: "momentum",
  },
  {
    key: "rest_mass_row",
    row: "rest-mass row",
    consumes: ["EQ-04"],
    diagnostic: "restMass",
  },
  {
    key: "mass_shell_row",
    row: "mass-shell row",
    consumes: ["EQ-04"],
    diagnostic: "massShell",
  },
  {
    key: "medium_response_row",
    row: "medium-response row",
    consumes: ["EQ-04", "Noether sea handoff"],
    diagnostic: "mediumResponse",
  },
];

const WITNESSES = [
  {
    key: "support_witness_zero",
    row: "support witness",
    diagnostic: "supportWitness",
  },
  {
    key: "holonomy_witness_zero",
    row: "holonomy witness",
    diagnostic: "holonomyWitness",
  },
  {
    key: "split_witness_zero",
    row: "split witness",
    diagnostic: "splitWitness",
  },
  {
    key: "retune_witness_zero",
    row: "hidden-retune witness",
    diagnostic: "retuneWitness",
  },
];

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

const input = readJson(path.resolve(args.input));
const output = evaluateRetainedRecord(input, path.resolve(args.input));
writeOutput(args, output);

if (args.requirePopulated && output.summary.status !== "populated") {
  process.exitCode = 1;
}

function parseArgs(argv) {
  const parsed = {
    input: DEFAULT_INPUT_PATH,
    out: null,
    pretty: false,
    summary: false,
    requirePopulated: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") {
      parsed.input = argv[++index];
    } else if (arg === "--out") {
      parsed.out = argv[++index];
    } else if (arg === "--pretty") {
      parsed.pretty = true;
    } else if (arg === "--summary") {
      parsed.summary = true;
    } else if (arg === "--require-populated") {
      parsed.requirePopulated = true;
    } else if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return parsed;
}

function printHelp() {
  console.log(`Usage: node scripts/equation-mapping/eq02-04-translating-binary-retained-record.mjs [options]

Options:
  --input PATH             Retained-record packet input. Defaults to the attempt fixture.
  --out PATH               Write JSON output to PATH.
  --summary                Emit compact status, blocker, row, witness, and diagnostic summary.
  --pretty                 Pretty-print JSON output.
  --require-populated      Exit nonzero unless the retained record is populated.
  --help                   Show this help.

This runner evaluates the direct retained-record shape for the EQ-02 through
EQ-04 translating-binary closure target. It is score-neutral unless every row,
witness, and residual is accepted on one common carrier. The gamma-free coframe
diagnostics separate reciprocal arithmetic from extraction evidence: reciprocity
can pass on declared legs, but extraction remains not evaluated until the input
supplies accepted wake-return coframe evidence on the same retained support.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeOutput(parsedArgs, output) {
  const payload = parsedArgs.summary ? summarizeOutput(output) : output;
  const text = JSON.stringify(payload, null, parsedArgs.pretty ? 2 : 0);
  if (parsedArgs.out) {
    fs.writeFileSync(path.resolve(parsedArgs.out), `${text}\n`);
  } else {
    console.log(text);
  }
}

function evaluateRetainedRecord(input, inputPath) {
  const schemaOk = input.schema === INPUT_SCHEMA;
  const commonCarrierId = input.commonCarrierId ?? input.carrier?.commonCarrierId ?? null;
  const domainId = input.domainId ?? input.domain?.id ?? null;
  const sameBranchIdentity = evaluateSameBranchIdentity(input.sameBranchIdentity);
  const drift = evaluateDrift(input.drift ?? {});
  const rowChecks = ROWS.map((definition) =>
    evaluateRow({
      definition,
      value: input.rows?.[definition.key],
      commonCarrierId,
      domainId,
    }),
  );
  const witnessChecks = WITNESSES.map((definition) =>
    evaluateRow({
      definition,
      value: input.witnesses?.[definition.key],
      commonCarrierId,
      domainId,
      witness: true,
    }),
  );
  const diagnostics = evaluateDiagnostics({
    input,
    drift,
    tolerances: input.tolerances ?? {},
  });
  const negativeControls = evaluateNegativeControls({
    controls: input.negativeControls ?? {},
    tolerances: input.tolerances ?? {},
  });
  const missingRows = rowChecks.filter((check) => !check.accepted).map((check) => check.key);
  const missingWitnesses = witnessChecks
    .filter((check) => !check.accepted)
    .map((check) => check.key);
  const failedDiagnostics = Object.entries(diagnostics)
    .filter(([, diagnostic]) => diagnostic.status === "failed")
    .map(([key]) => key);
  const undeclaredDiagnostics = Object.entries(diagnostics)
    .filter(([, diagnostic]) => diagnostic.status === "not_evaluated")
    .map(([key]) => key);
  const failedNegativeControls = Object.entries(negativeControls)
    .filter(([, control]) => control.status === "failed")
    .map(([key]) => key);
  const undeclaredNegativeControls = Object.entries(negativeControls)
    .filter(([, control]) => control.status === "not_evaluated")
    .map(([key]) => key);
  const populated =
    schemaOk &&
    sameBranchIdentity.accepted &&
    drift.status === "passed" &&
    missingRows.length === 0 &&
    missingWitnesses.length === 0 &&
    failedDiagnostics.length === 0 &&
    undeclaredDiagnostics.length === 0 &&
    failedNegativeControls.length === 0 &&
    undeclaredNegativeControls.length === 0;
  const status = !schemaOk
    ? "blocked_invalid_schema"
    : !sameBranchIdentity.accepted
      ? "blocked_same_branch_identity"
    : drift.status !== "passed"
      ? "blocked_invalid_drift"
      : populated
        ? "populated"
        : failedDiagnostics.length > 0
          ? "failed_residual"
          : failedNegativeControls.length > 0
            ? "failed_negative_control"
            : "blocked_missing_rows";
  const nextBlocker = nextBlockerForRecord({
    status,
    sameBranchIdentity,
    drift,
    missingRows,
    missingWitnesses,
    failedDiagnostics,
    undeclaredDiagnostics,
    failedNegativeControls,
    undeclaredNegativeControls,
  });
  const nextBlockerDetails = nextBlockerDetailsForRecord({
    status,
    schema: input.schema ?? null,
    sameBranchIdentity,
    drift,
    rowChecks,
    witnessChecks,
    diagnostics,
    negativeControls,
    missingRows,
    missingWitnesses,
    failedDiagnostics,
    undeclaredDiagnostics,
    failedNegativeControls,
    undeclaredNegativeControls,
  });

  return {
    schema: OUTPUT_SCHEMA,
    generatedAt: new Date().toISOString(),
    input: {
      path: inputPath,
      schema: input.schema ?? null,
      schemaOk,
      claimLevel: input.claimLevel ?? null,
    },
    target: {
      id: "Theta_02-04_bin_retained_record",
      commonCarrierId,
      domainId,
      supportedRows: ["EQ-02", "EQ-03", "EQ-04", "EQ-05"],
      sameBranchIdentityInputPath: sameBranchIdentity.inputPath,
      claimLevel:
        "direct retained-record evaluator; attempt rows and current proxies are not score evidence",
    },
    summary: {
      status,
      scoreDecision: populated ? "eligible_for_score_review" : "no_score_increase",
      nextBlocker,
      nextBlockerDetails,
      commonCarrierId,
      domainId,
      sameBranchIdentityStatus: sameBranchIdentity.status,
      sameBranchIdentityNextBlocker: sameBranchIdentity.nextBlocker,
      driftStatus: drift.status,
      beta_f: drift.beta,
      gamma_f: drift.gamma,
      acceptedRowCount: rowChecks.filter((check) => check.accepted).length,
      rowCount: ROWS.length,
      acceptedWitnessCount: witnessChecks.filter((check) => check.accepted).length,
      witnessCount: WITNESSES.length,
      diagnosticPassCount: Object.values(diagnostics).filter(
        (diagnostic) => diagnostic.status === "passed",
      ).length,
      diagnosticCount: Object.keys(diagnostics).length,
      missingRows,
      missingWitnesses,
      failedDiagnostics,
      undeclaredDiagnostics,
      failedNegativeControls,
      undeclaredNegativeControls,
      rowStatuses: Object.fromEntries(rowChecks.map((check) => [check.key, check.status])),
      rowReasons: Object.fromEntries(rowChecks.map((check) => [check.key, check.reason])),
      witnessStatuses: Object.fromEntries(
        witnessChecks.map((check) => [check.key, check.status]),
      ),
      witnessReasons: Object.fromEntries(
        witnessChecks.map((check) => [check.key, check.reason]),
      ),
      diagnosticStatuses: Object.fromEntries(
        Object.entries(diagnostics).map(([key, diagnostic]) => [key, diagnostic.status]),
      ),
      negativeControlPassCount: Object.values(negativeControls).filter(
        (control) => control.status === "passed",
      ).length,
      negativeControlCount: Object.keys(negativeControls).length,
      negativeControlStatuses: Object.fromEntries(
        Object.entries(negativeControls).map(([key, control]) => [key, control.status]),
      ),
    },
    sameBranchIdentity,
    drift,
    rows: rowChecks,
    witnesses: witnessChecks,
    diagnostics,
    negativeControls,
  };
}

function summarizeOutput(output) {
  return {
    schema: output.schema,
    generatedAt: output.generatedAt,
    input: output.input,
    target: output.target,
    summary: output.summary,
    sameBranchIdentity: output.sameBranchIdentity,
    diagnostics: output.diagnostics,
    negativeControls: output.negativeControls,
  };
}

function evaluateSameBranchIdentity(raw) {
  const inputPath = raw?.inputPath ?? raw?.path ?? null;
  if (!concreteString(inputPath)) {
    return {
      accepted: false,
      status: "missing",
      nextBlocker: "missing_same_branch_identity_input",
      inputPath: null,
      summary: null,
      checkerStatus: "not_run",
    };
  }
  const resolvedInputPath = path.isAbsolute(inputPath)
    ? inputPath
    : path.resolve(process.cwd(), inputPath);
  const checkerPath = path.join(SCRIPT_DIR, "check-same-branch-chart-identity.mjs");
  const result = spawnSync(
    process.execPath,
    [checkerPath, "--input", resolvedInputPath, "--summary"],
    {
      cwd: process.cwd(),
      encoding: "utf8",
      maxBuffer: 1024 * 1024,
    },
  );
  if (result.error || result.status !== 0) {
    return {
      accepted: false,
      status: "checker_failed",
      nextBlocker: "same_branch_identity_checker_failed",
      inputPath: resolvedInputPath,
      summary: null,
      checkerStatus: result.status,
      stderr: result.stderr?.trim() ?? String(result.error ?? ""),
    };
  }
  const parsed = JSON.parse(result.stdout);
  const summary = parsed.summary ?? {};
  return {
    accepted: summary.status === "accepted",
    status: summary.status ?? "unknown",
    nextBlocker:
      summary.nextBlocker ??
      (summary.status === "accepted" ? null : "missing_accepted_same_branch_chart_identity"),
    inputPath: resolvedInputPath,
    summary,
    checkerStatus: result.status,
  };
}

function evaluateDrift(drift) {
  const u = finiteNumberOrNull(drift.u);
  const cF = positiveFiniteNumberOrNull(drift.c_f ?? drift.cF);
  if (u === null || cF === null) {
    return {
      status: "not_evaluated",
      reason: "missing_u_or_c_f",
      u,
      c_f: cF,
      beta: null,
      gamma: null,
      uVector: vectorOrNull(drift.uVector),
      hat_e: vectorOrNull(drift.hat_e),
    };
  }
  const beta = u / cF;
  if (Math.abs(beta) >= 1) {
    return {
      status: "failed",
      reason: "beta_not_subluminal",
      u,
      c_f: cF,
      beta,
      gamma: null,
      uVector: vectorOrNull(drift.uVector),
      hat_e: vectorOrNull(drift.hat_e),
    };
  }
  return {
    status: "passed",
    reason: "passed",
    u,
    c_f: cF,
    beta,
    gamma: 1 / Math.sqrt(1 - beta * beta),
    uVector: vectorOrNull(drift.uVector) ?? [u, 0, 0],
    hat_e: vectorOrNull(drift.hat_e),
  };
}

function evaluateRow({ definition, value, commonCarrierId, domainId, witness = false }) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {
      key: definition.key,
      row: definition.row,
      consumes: definition.consumes ?? [],
      accepted: false,
      status: "missing",
      reason: "missing",
      rowId: null,
      sourcePath: null,
      commonCarrierId: null,
      domainId: null,
    };
  }
  const base = {
    key: definition.key,
    row: definition.row,
    consumes: definition.consumes ?? [],
    accepted: false,
    status: normalizeStatus(value),
    reason: null,
    rowId: value.rowId ?? value.eventId ?? value.witnessId ?? null,
    sourcePath: value.sourcePath ?? value.source ?? null,
    commonCarrierId: value.commonCarrierId ?? null,
    domainId: value.domainId ?? null,
  };
  if (!ACCEPTED_STATUSES.has(value.status)) {
    return {
      ...base,
      reason: witness ? "witness_not_accepted" : "row_not_accepted",
    };
  }
  if (!concreteString(base.rowId)) {
    return {
      ...base,
      status: "accepted_without_row_reference",
      reason: "missing_row_reference",
    };
  }
  if (!concreteString(base.sourcePath)) {
    return {
      ...base,
      status: witness
        ? "accepted_without_concrete_witness_source"
        : "accepted_without_concrete_source",
      reason: "missing_source_reference",
    };
  }
  if (!sourceReferenceExists(base.sourcePath)) {
    return {
      ...base,
      status: witness
        ? "accepted_without_existing_witness_source"
        : "accepted_without_existing_source",
      reason: "source_not_found_or_not_durable",
    };
  }
  if (commonCarrierId && base.commonCarrierId !== commonCarrierId) {
    return {
      ...base,
      status: "accepted_common_carrier_mismatch",
      reason: "common_carrier_mismatch",
    };
  }
  if (domainId && base.domainId && base.domainId !== domainId) {
    return {
      ...base,
      status: "accepted_domain_mismatch",
      reason: "domain_mismatch",
    };
  }
  return {
    ...base,
    accepted: true,
    reason: "accepted",
  };
}

function evaluateDiagnostics({ input, drift, tolerances }) {
  const rows = input.rows ?? {};
  return {
    rootStarvation: residualDiagnostic({
      value: rows.root_starvation_row?.rootStarvationResidual,
      tolerance: tolerance(tolerances, "rootStarvation"),
    }),
    sameRootConservation: residualDiagnostic({
      value: rows.same_root_conservation_row?.residual,
      tolerance: tolerance(tolerances, "sameRootConservation"),
    }),
    coframeReciprocity: coframeReciprocityDiagnostic(
      rows.gamma_free_coframe_row,
      drift,
      tolerance(tolerances, "coframeReciprocity"),
    ),
    coframeExtraction: coframeExtractionDiagnostic(
      rows.gamma_free_coframe_row,
      tolerance(tolerances, "coframeExtraction"),
    ),
    clock: clockDiagnostic(rows.clock_row, drift, tolerance(tolerances, "clock")),
    envelope: envelopeDiagnostic(rows.envelope_row, drift, tolerances),
    twoWaySignal: residualDiagnostic({
      value: rows.two_way_signal_row?.delta_tw,
      tolerance: tolerance(tolerances, "twoWaySignal"),
    }),
    energy: energyDiagnostic(rows.energy_row, drift, tolerance(tolerances, "energy")),
    exposure: exposureDiagnostic(rows.exposure_row),
    momentum: momentumDiagnostic(rows.momentum_row, drift, tolerance(tolerances, "momentum")),
    restMass: restMassDiagnostic(rows.rest_mass_row, tolerance(tolerances, "restMass")),
    massShell: massShellDiagnostic(rows.mass_shell_row, tolerance(tolerances, "massShell")),
    mediumResponse: mediumResponseDiagnostic(
      rows.medium_response_row,
      tolerance(tolerances, "mediumResponse"),
    ),
    supportWitness: residualDiagnostic({
      value: input.witnesses?.support_witness_zero?.residual,
      tolerance: tolerance(tolerances, "witness"),
    }),
    holonomyWitness: residualDiagnostic({
      value: input.witnesses?.holonomy_witness_zero?.residual,
      tolerance: tolerance(tolerances, "witness"),
    }),
    splitWitness: residualDiagnostic({
      value: input.witnesses?.split_witness_zero?.residual,
      tolerance: tolerance(tolerances, "witness"),
    }),
    retuneWitness: residualDiagnostic({
      value: input.witnesses?.retune_witness_zero?.residual,
      tolerance: tolerance(tolerances, "witness"),
    }),
  };
}

function evaluateNegativeControls({ controls, tolerances }) {
  const limit = tolerance(tolerances, "negativeControl");
  return {
    clock_only_retune: negativeControlDiagnostic({
      control: controls.clock_only_retune,
      fitKeys: ["clockResidual"],
      failureKeys: ["envelopeResidual", "retuneResidual", "rootSplitResidual"],
      tolerance: limit,
    }),
    envelope_only_retune: negativeControlDiagnostic({
      control: controls.envelope_only_retune,
      fitKeys: ["envelopeResidual"],
      failureKeys: ["rootSplitResidual", "retuneResidual"],
      tolerance: limit,
    }),
    velocity_dependent_rest_mass: negativeControlDiagnostic({
      control: controls.velocity_dependent_rest_mass,
      fitKeys: ["massShellResidual"],
      failureKeys: ["restMassResidual"],
      tolerance: limit,
    }),
    medium_response_compensator: negativeControlDiagnostic({
      control: controls.medium_response_compensator,
      fitKeys: ["momentumResidual"],
      failureKeys: ["mediumResponseResidual"],
      tolerance: limit,
    }),
    gamma_inserted_coframe: negativeControlDiagnostic({
      control: controls.gamma_inserted_coframe,
      fitKeys: ["reciprocityResidual"],
      failureKeys: ["forbiddenInputResidual", "holonomyResidual"],
      tolerance: limit,
    }),
    reciprocal_unextracted_coframe: negativeControlDiagnostic({
      control: controls.reciprocal_unextracted_coframe,
      fitKeys: ["reciprocityResidual"],
      failureKeys: [
        "extractionSourceResidual",
        "supportBindingResidual",
        "holonomyResidual",
      ],
      tolerance: limit,
    }),
  };
}

function negativeControlDiagnostic({ control, fitKeys, failureKeys, tolerance: limit }) {
  if (!control || typeof control !== "object" || Array.isArray(control)) {
    return notEvaluated("missing_negative_control");
  }
  const fitResiduals = fitKeys.map((key) => [key, finiteNumberOrNull(control[key])]);
  const failureResiduals = failureKeys.map((key) => [
    key,
    finiteNumberOrNull(control[key]),
  ]);
  if (fitResiduals.some(([, value]) => value === null)) {
    return notEvaluated("missing_fit_residual");
  }
  if (failureResiduals.every(([, value]) => value === null)) {
    return notEvaluated("missing_failure_residual");
  }
  const fitPass = fitResiduals.every(([, value]) => Math.abs(value) <= limit);
  const caughtFailure = failureResiduals.some(
    ([, value]) => value !== null && Math.abs(value) > limit,
  );
  return {
    status: fitPass && caughtFailure ? "passed" : "failed",
    fitPass,
    caughtFailure,
    tolerance: limit,
    fitResiduals: Object.fromEntries(fitResiduals),
    failureResiduals: Object.fromEntries(failureResiduals),
  };
}

function clockDiagnostic(row, drift, limit) {
  if (drift.status !== "passed") {
    return notEvaluated("invalid_drift");
  }
  const tRatio = finiteNumberOrNull(row?.T_u_T0);
  if (tRatio === null) {
    return notEvaluated("missing_T_u_T0");
  }
  const residual = tRatio - drift.gamma;
  return scalarResult(residual, limit, { T_u_T0: tRatio, gamma_f: drift.gamma });
}

function envelopeDiagnostic(row, drift, tolerances) {
  if (drift.status !== "passed") {
    return notEvaluated("invalid_drift");
  }
  const rParallel = finiteNumberOrNull(row?.R_parallel);
  const rPerp = positiveFiniteNumberOrNull(row?.R_perp);
  if (rParallel === null || rPerp === null) {
    return notEvaluated("missing_R_parallel_or_R_perp");
  }
  const xi = rParallel / rPerp;
  const residual = xi - 1 / drift.gamma;
  const shape = finiteNumberOrNull(row?.shapeResidual);
  const envelopeResult = scalarResult(residual, tolerance(tolerances, "envelope"), {
    R_parallel: rParallel,
    R_perp: rPerp,
    xi,
    gamma_f: drift.gamma,
  });
  const shapeResult =
    shape === null
      ? notEvaluated("missing_shape_residual")
      : scalarResult(shape, tolerance(tolerances, "shape"), { shapeResidual: shape });
  const status =
    envelopeResult.status === "passed" && shapeResult.status === "passed"
      ? "passed"
      : envelopeResult.status === "failed" || shapeResult.status === "failed"
        ? "failed"
        : "not_evaluated";
  return {
    status,
    residual,
    tolerance: tolerance(tolerances, "envelope"),
    details: {
      envelope: envelopeResult,
      shape: shapeResult,
    },
  };
}

function coframeReciprocityDiagnostic(row, drift, limit) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return notEvaluated("missing_gamma_free_coframe_row");
  }
  const declaration = evaluateGammaFreeDeclaration(row.inputDeclaration);
  if (declaration.status === "failed") {
    return {
      status: "failed",
      reason: declaration.reason,
      residual: null,
      absoluteResidual: null,
      tolerance: limit,
      details: { inputDeclaration: declaration },
    };
  }
  if (declaration.status !== "passed") {
    return notEvaluated(declaration.reason);
  }
  const timeLeg = positiveFiniteNumberOrNull(row.e0_dt ?? row.timeLeg);
  const parallelLeg = finiteNumberOrNull(row.e_parallel ?? row.parallelLeg);
  const perpendicularLeg = positiveFiniteNumberOrNull(row.e_perp ?? row.perpLeg);
  if (timeLeg === null || parallelLeg === null || perpendicularLeg === null) {
    return notEvaluated("missing_coframe_leg");
  }
  const reciprocalLeg = parallelLeg / perpendicularLeg;
  const residual = timeLeg * reciprocalLeg - 1;
  const result = scalarResult(residual, limit, {
    e0_dt: timeLeg,
    e_parallel: parallelLeg,
    e_perp: perpendicularLeg,
    reciprocalLeg,
    inputDeclaration: declaration,
    lambdaMinusGamma:
      drift.status === "passed" && drift.gamma !== null ? timeLeg - drift.gamma : null,
    gamma_f_for_comparison_only: drift.gamma ?? null,
  });
  return {
    ...result,
    reason: result.status === "passed" ? "passed_gamma_free_reciprocity" : "failed_reciprocity",
  };
}

function coframeExtractionDiagnostic(row, limit) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return notEvaluated("missing_gamma_free_coframe_row");
  }
  const loaded = resolveCoframeExtractionEvidence(
    row.extractionEvidence ?? { certificatePath: row.extractionEvidencePath },
  );
  if (loaded.status === "failed") {
    return {
      status: "failed",
      reason: loaded.reason,
      residual: null,
      absoluteResidual: null,
      tolerance: limit,
      details: loaded.details,
    };
  }
  if (loaded.status !== "passed") {
    return notEvaluatedWithDetails(loaded.reason, loaded.details);
  }
  const evidence = loaded.evidence;
  const status = normalizeStatus(evidence);
  if (!ACCEPTED_STATUSES.has(status)) {
    return notEvaluatedWithDetails("coframe_extraction_evidence_not_accepted", {
      evidenceStatus: status,
      certificatePath: loaded.certificatePath,
      schema: evidence.schema ?? null,
    });
  }
  if (!concreteString(evidence.certificateId)) {
    return notEvaluated("missing_coframe_extraction_certificate_id");
  }
  const producerRecord = evaluateCoframeExtractionProducerRecord(
    evidence.producer,
    limit,
  );
  if (producerRecord.status !== "passed") {
    return producerRecord;
  }
  const sourcePath = evidence.sourcePath ?? evidence.source ?? null;
  if (!sourceReferenceExists(sourcePath)) {
    return {
      status: "failed",
      reason: "coframe_extraction_source_not_durable",
      residual: null,
      absoluteResidual: null,
      tolerance: limit,
      details: { sourcePath },
    };
  }
  const sourceIndependence = evaluateCoframeExtractionSourceIndependence({
    sourcePath,
    certificatePath: loaded.certificatePath,
    limit,
  });
  if (sourceIndependence.status !== "passed") {
    return sourceIndependence;
  }
  const sourceKind = evidence.sourceKind ?? null;
  const acceptedSourceKinds = new Set([
    "solver_certificate",
    "proof_certificate",
    "invariant_cell_certificate",
    "wake_return_extraction_certificate",
  ]);
  if (!acceptedSourceKinds.has(sourceKind)) {
    return {
      status: "failed",
      reason: "coframe_extraction_source_kind_not_evidence",
      residual: null,
      absoluteResidual: null,
      tolerance: limit,
      details: { sourceKind },
    };
  }
  if (evidence.commonCarrierId !== row.commonCarrierId) {
    return {
      status: "failed",
      reason: "coframe_extraction_common_carrier_mismatch",
      residual: null,
      absoluteResidual: null,
      tolerance: limit,
      details: {
        evidenceCommonCarrierId: evidence.commonCarrierId ?? null,
        rowCommonCarrierId: row.commonCarrierId ?? null,
      },
    };
  }
  const expectedRetainedRowSetId = row.retainedRowSetId ?? "S_eq";
  if (evidence.retainedRowSetId !== expectedRetainedRowSetId) {
    return {
      status: "failed",
      reason: "coframe_extraction_retained_row_set_mismatch",
      residual: null,
      absoluteResidual: null,
      tolerance: limit,
      details: {
        evidenceRetainedRowSetId: evidence.retainedRowSetId ?? null,
        rowRetainedRowSetId: expectedRetainedRowSetId,
      },
    };
  }
  if (evidence.domainId !== row.domainId) {
    return {
      status: "failed",
      reason: "coframe_extraction_domain_mismatch",
      residual: null,
      absoluteResidual: null,
      tolerance: limit,
      details: {
        evidenceDomainId: evidence.domainId ?? null,
        rowDomainId: row.domainId ?? null,
      },
    };
  }
  const supportKinds = new Set([
    "positive_width_invariant_cell",
    "fixed_or_periodic_point_in_certified_cell",
  ]);
  if (!supportKinds.has(evidence.supportKind)) {
    return {
      status: "failed",
      reason: "coframe_extraction_support_not_certified",
      residual: null,
      absoluteResidual: null,
      tolerance: limit,
      details: { supportKind: evidence.supportKind ?? null },
    };
  }
  if (!concreteString(evidence.supportId)) {
    return notEvaluated("missing_coframe_extraction_support_id");
  }
  if (concreteString(row.supportId) && evidence.supportId !== row.supportId) {
    return {
      status: "failed",
      reason: "coframe_extraction_support_id_mismatch",
      residual: null,
      absoluteResidual: null,
      tolerance: limit,
      details: {
        evidenceSupportId: evidence.supportId ?? null,
        rowSupportId: row.supportId,
      },
    };
  }
  const supportCertificate = evaluateCoframeInvariantSupport(evidence.support, limit);
  if (supportCertificate.status !== "passed") {
    return supportCertificate;
  }
  const extractionBasis = arrayOfStringsOrEmpty(evidence.extractionBasis);
  const requiredBasis = ["c_f", "u", "L_root", "L_wake"];
  const missingBasis = requiredBasis.filter((basis) => !extractionBasis.includes(basis));
  if (missingBasis.length > 0) {
    return notEvaluated("missing_coframe_extraction_basis");
  }
  const allowedBasis = new Set([
    "c_f",
    "u",
    "L_root",
    "L_wake",
    "retained_boundary_history",
  ]);
  const unsupportedBasis = extractionBasis.filter((basis) => !allowedBasis.has(basis));
  if (unsupportedBasis.length > 0) {
    return {
      status: "failed",
      reason: "unsupported_coframe_extraction_basis_used",
      residual: null,
      absoluteResidual: null,
      tolerance: limit,
      details: { unsupportedBasis },
    };
  }
  const forbiddenBasis = ["gamma_f", "Lorentz_target", "mass_shell_target", "fitted_clock_envelope"];
  const usedForbiddenBasis = forbiddenBasis.filter((basis) => extractionBasis.includes(basis));
  if (usedForbiddenBasis.length > 0) {
    return {
      status: "failed",
      reason: "forbidden_coframe_extraction_basis_used",
      residual: null,
      absoluteResidual: null,
      tolerance: limit,
      details: { usedForbiddenBasis },
    };
  }
  const certificateLegs =
    evidence.extractedLegs && typeof evidence.extractedLegs === "object"
      ? evidence.extractedLegs
      : evidence.coframeLegs && typeof evidence.coframeLegs === "object"
        ? evidence.coframeLegs
        : {};
  const certificateTimeLeg = positiveFiniteNumberOrNull(
    certificateLegs.e0_dt ?? certificateLegs.timeLeg,
  );
  const certificateParallelLeg = finiteNumberOrNull(
    certificateLegs.e_parallel ?? certificateLegs.parallelLeg,
  );
  const certificatePerpLeg = positiveFiniteNumberOrNull(
    certificateLegs.e_perp ?? certificateLegs.perpLeg,
  );
  if (
    certificateTimeLeg === null ||
    certificateParallelLeg === null ||
    certificatePerpLeg === null
  ) {
    return notEvaluated("missing_coframe_extraction_legs");
  }
  const rowTimeLeg = positiveFiniteNumberOrNull(row.e0_dt ?? row.timeLeg);
  const rowParallelLeg = finiteNumberOrNull(row.e_parallel ?? row.parallelLeg);
  const rowPerpLeg = positiveFiniteNumberOrNull(row.e_perp ?? row.perpLeg);
  if (rowTimeLeg === null || rowParallelLeg === null || rowPerpLeg === null) {
    return notEvaluated("missing_coframe_leg");
  }
  const legResidual = Math.max(
    Math.abs(certificateTimeLeg - rowTimeLeg),
    Math.abs(certificateParallelLeg - rowParallelLeg),
    Math.abs(certificatePerpLeg - rowPerpLeg),
  );
  if (legResidual > limit) {
    return {
      status: "failed",
      reason: "coframe_extraction_leg_mismatch",
      residual: legResidual,
      absoluteResidual: legResidual,
      tolerance: limit,
      details: {
        rowLegs: {
          e0_dt: rowTimeLeg,
          e_parallel: rowParallelLeg,
          e_perp: rowPerpLeg,
        },
        certificateLegs: {
          e0_dt: certificateTimeLeg,
          e_parallel: certificateParallelLeg,
          e_perp: certificatePerpLeg,
        },
      },
    };
  }
  const residuals =
    evidence.residuals && typeof evidence.residuals === "object" ? evidence.residuals : evidence;
  const extractionResidual = finiteNumberOrNull(residuals.extractionResidual);
  const supportBindingResidual = finiteNumberOrNull(residuals.supportBindingResidual);
  const holonomyResidual = finiteNumberOrNull(residuals.holonomyResidual);
  if (
    extractionResidual === null ||
    supportBindingResidual === null ||
    holonomyResidual === null
  ) {
    return notEvaluated("missing_coframe_extraction_residual");
  }
  const residual = Math.max(
    Math.abs(extractionResidual),
    Math.abs(supportBindingResidual),
    Math.abs(holonomyResidual),
  );
  return scalarResult(residual, limit, {
    sourcePath,
    sourceKind,
    certificatePath: loaded.certificatePath,
    producer: producerRecord.details,
    supportKind: evidence.supportKind,
    support: supportCertificate.details,
    extractionBasis,
    legResidual,
    extractionResidual,
    supportBindingResidual,
    holonomyResidual,
  });
}

function evaluateCoframeInvariantSupport(support, limit) {
  if (!support || typeof support !== "object" || Array.isArray(support)) {
    return failedCoframeExtractionSupport(
      "missing_coframe_extraction_support_certificate",
      limit,
      {},
    );
  }
  const supportStatus = normalizeStatus(support);
  if (!ACCEPTED_STATUSES.has(supportStatus)) {
    return failedCoframeExtractionSupport(
      "coframe_extraction_support_certificate_not_accepted",
      limit,
      { supportStatus },
    );
  }
  const requiredFields = ["B_N", "Sigma_N", "P_N", "K_P_N"];
  const missingFields = requiredFields.filter(
    (field) => !supportFieldIsCertified(support[field]),
  );
  if (missingFields.length > 0) {
    return failedCoframeExtractionSupport(
      "missing_coframe_extraction_support_field",
      limit,
      { missingFields },
    );
  }
  const positiveTransverseWidth = positiveFiniteNumberOrNull(
    support.positiveTransverseWidth,
  );
  if (positiveTransverseWidth === null) {
    return failedCoframeExtractionSupport(
      "missing_positive_transverse_width",
      limit,
      { positiveTransverseWidth: support.positiveTransverseWidth ?? null },
    );
  }
  if (!returnInclusionIsCertified(support.returnInclusion)) {
    return failedCoframeExtractionSupport(
      "coframe_extraction_return_inclusion_not_certified",
      limit,
      { returnInclusion: support.returnInclusion ?? null },
    );
  }
  return {
    status: "passed",
    residual: 0,
    absoluteResidual: 0,
    tolerance: limit,
    details: {
      supportStatus,
      B_N: support.B_N,
      Sigma_N: support.Sigma_N,
      P_N: support.P_N,
      K_P_N: support.K_P_N,
      positiveTransverseWidth,
      returnInclusion: support.returnInclusion,
    },
  };
}

function failedCoframeExtractionSupport(reason, limit, details) {
  return {
    status: "failed",
    reason,
    residual: null,
    absoluteResidual: null,
    tolerance: limit,
    details,
  };
}

function evaluateCoframeExtractionProducerRecord(producer, limit) {
  if (!producer || typeof producer !== "object" || Array.isArray(producer)) {
    return failedCoframeExtractionSupport(
      "missing_coframe_extraction_producer_record",
      limit,
      {},
    );
  }
  if (producer.schema !== COFRAME_EXTRACTION_PRODUCER_SCHEMA) {
    return failedCoframeExtractionSupport(
      "invalid_coframe_extraction_producer_schema",
      limit,
      { schema: producer.schema ?? null },
    );
  }
  const producerStatus = normalizeStatus(producer);
  if (!ACCEPTED_STATUSES.has(producerStatus)) {
    return failedCoframeExtractionSupport(
      "coframe_extraction_producer_not_accepted",
      limit,
      { producerStatus },
    );
  }
  const failedChecks = arrayOfStringsOrEmpty(producer.failedChecks);
  if (failedChecks.length > 0) {
    return failedCoframeExtractionSupport(
      "coframe_extraction_producer_failed_checks",
      limit,
      { failedChecks },
    );
  }
  return {
    status: "passed",
    residual: 0,
    absoluteResidual: 0,
    tolerance: limit,
    details: {
      producerStatus,
      generatedAt: producer.generatedAt ?? null,
      scoreDecision: producer.scoreDecision ?? null,
    },
  };
}

function evaluateCoframeExtractionSourceIndependence({
  sourcePath,
  certificatePath,
  limit,
}) {
  const resolvedSourcePath = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(process.cwd(), sourcePath);
  const resolvedCertificatePath = concreteString(certificatePath)
    ? path.resolve(certificatePath)
    : null;
  if (
    resolvedCertificatePath &&
    resolvedSourcePath === resolvedCertificatePath
  ) {
    return failedCoframeExtractionSupport(
      "coframe_extraction_source_is_certificate",
      limit,
      { sourcePath: resolvedSourcePath, certificatePath: resolvedCertificatePath },
    );
  }
  if (path.extname(resolvedSourcePath) !== ".json") {
    return {
      status: "passed",
      residual: 0,
      absoluteResidual: 0,
      tolerance: limit,
      details: { sourcePath: resolvedSourcePath },
    };
  }
  let parsed;
  try {
    parsed = readJson(resolvedSourcePath);
  } catch (error) {
    return failedCoframeExtractionSupport(
      "coframe_extraction_source_json_invalid",
      limit,
      {
        sourcePath: resolvedSourcePath,
        error: String(error?.message ?? error),
      },
    );
  }
  if (parsed.schema === COFRAME_EXTRACTION_SCHEMA) {
    return failedCoframeExtractionSupport(
      "coframe_extraction_source_is_certificate_schema",
      limit,
      { sourcePath: resolvedSourcePath, schema: parsed.schema },
    );
  }
  return {
    status: "passed",
    residual: 0,
    absoluteResidual: 0,
    tolerance: limit,
    details: { sourcePath: resolvedSourcePath, sourceSchema: parsed.schema ?? null },
  };
}

function supportFieldIsCertified(value) {
  if (typeof value === "string") {
    return concreteNonPlaceholderString(value);
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const status = normalizeStatus(value);
  if (!ACCEPTED_STATUSES.has(status)) {
    return false;
  }
  const id =
    value.id ??
    value.rowId ??
    value.certificateId ??
    value.sourcePath ??
    value.source ??
    null;
  if (!concreteNonPlaceholderString(id)) {
    return false;
  }
  const sourcePath = value.sourcePath ?? value.source ?? null;
  if (concreteString(sourcePath) && !sourceReferenceExists(sourcePath)) {
    return false;
  }
  return true;
}

function returnInclusionIsCertified(value) {
  if (value === true) {
    return true;
  }
  if (typeof value === "string") {
    return ACCEPTED_STATUSES.has(value);
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  return ACCEPTED_STATUSES.has(normalizeStatus(value));
}

function resolveCoframeExtractionEvidence(rawEvidence) {
  if (!rawEvidence || typeof rawEvidence !== "object" || Array.isArray(rawEvidence)) {
    return {
      status: "not_evaluated",
      reason: "missing_coframe_extraction_evidence",
      details: {},
      evidence: null,
      certificatePath: null,
    };
  }
  const certificatePath = rawEvidence.certificatePath ?? null;
  if (!concreteString(certificatePath)) {
    return {
      status: "passed",
      reason: "inline_coframe_extraction_evidence",
      details: {},
      evidence: rawEvidence,
      certificatePath: null,
    };
  }
  const resolvedCertificatePath = path.isAbsolute(certificatePath)
    ? certificatePath
    : path.resolve(process.cwd(), certificatePath);
  if (!sourceReferenceExists(resolvedCertificatePath)) {
    return {
      status: "not_evaluated",
      reason: "missing_coframe_extraction_certificate",
      details: { certificatePath: resolvedCertificatePath },
      evidence: null,
      certificatePath: resolvedCertificatePath,
    };
  }
  let parsed;
  try {
    parsed = readJson(resolvedCertificatePath);
  } catch (error) {
    return {
      status: "failed",
      reason: "invalid_coframe_extraction_certificate_json",
      details: {
        certificatePath: resolvedCertificatePath,
        error: String(error?.message ?? error),
      },
      evidence: null,
      certificatePath: resolvedCertificatePath,
    };
  }
  if (parsed.schema !== COFRAME_EXTRACTION_SCHEMA) {
    return {
      status: "failed",
      reason: "invalid_coframe_extraction_certificate_schema",
      details: {
        certificatePath: resolvedCertificatePath,
        schema: parsed.schema ?? null,
      },
      evidence: null,
      certificatePath: resolvedCertificatePath,
    };
  }
  return {
    status: "passed",
    reason: "loaded_coframe_extraction_certificate",
    details: { certificatePath: resolvedCertificatePath },
    evidence: {
      ...parsed,
      certificatePath: resolvedCertificatePath,
    },
    certificatePath: resolvedCertificatePath,
  };
}

function evaluateGammaFreeDeclaration(declaration) {
  if (!declaration || typeof declaration !== "object" || Array.isArray(declaration)) {
    return {
      status: "not_evaluated",
      reason: "missing_coframe_input_declaration",
    };
  }
  const forbiddenFlags = [
    "usesGammaInput",
    "usesLorentzTargetCoefficients",
    "usesMassShellTarget",
    "usesFittedClockEnvelopeRows",
  ];
  const usedForbiddenInputs = forbiddenFlags.filter((key) => declaration[key] === true);
  if (usedForbiddenInputs.length > 0) {
    return {
      status: "failed",
      reason: "forbidden_coframe_input_used",
      usedForbiddenInputs,
    };
  }
  const undeclaredFlags = forbiddenFlags.filter((key) => declaration[key] !== false);
  if (undeclaredFlags.length > 0) {
    return {
      status: "not_evaluated",
      reason: "missing_forbidden_input_declaration",
      undeclaredFlags,
    };
  }
  const allowedInputs = arrayOfStringsOrEmpty(declaration.allowedInputs);
  const requiredAllowedInputs = ["c_f", "u", "L_root", "L_wake"];
  const missingAllowedInputs = requiredAllowedInputs.filter(
    (inputName) => !allowedInputs.includes(inputName),
  );
  if (missingAllowedInputs.length > 0) {
    return {
      status: "not_evaluated",
      reason: "missing_required_allowed_coframe_input",
      missingAllowedInputs,
      allowedInputs,
    };
  }
  return {
    status: "passed",
    reason: "gamma_free_input_declaration_passed",
    allowedInputs,
  };
}

function energyDiagnostic(row, drift, limit) {
  if (drift.status !== "passed") {
    return notEvaluated("invalid_drift");
  }
  const eCM = finiteNumberOrNull(row?.E_CM_u);
  const m0 = positiveFiniteNumberOrNull(row?.M0_bin);
  const cF = positiveFiniteNumberOrNull(row?.c_f ?? drift.c_f);
  if (eCM === null || m0 === null || cF === null) {
    return notEvaluated("missing_E_CM_M0_or_c_f");
  }
  const residual = eCM / (m0 * cF * cF) - drift.gamma;
  return scalarResult(residual, limit, { E_CM_u: eCM, M0_bin: m0, c_f: cF });
}

function exposureDiagnostic(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return notEvaluated("missing_exposure_row");
  }
  const zeta = finiteNumberOrNull(row.zeta_bin ?? row.zeta);
  const declaredAbsent = row.shieldingExtractionAbsent === true;
  if (zeta === null && !declaredAbsent) {
    return notEvaluated("missing_zeta_or_declared_absence");
  }
  return {
    status: "passed",
    residual: 0,
    tolerance: 0,
    details: {
      zeta,
      shieldingExtractionAbsent: declaredAbsent,
    },
  };
}

function momentumDiagnostic(row, drift, limit) {
  if (drift.status !== "passed") {
    return notEvaluated("invalid_drift");
  }
  const pCM = vectorOrNull(row?.p_CM_u);
  const uVector = vectorOrNull(row?.uVector) ?? drift.uVector;
  const m0 = positiveFiniteNumberOrNull(row?.M0_bin);
  const cF = positiveFiniteNumberOrNull(row?.c_f ?? drift.c_f);
  if (!pCM || !uVector || m0 === null || cF === null || pCM.length !== uVector.length) {
    return notEvaluated("missing_p_CM_u_uVector_M0_or_c_f");
  }
  const residualVector = pCM.map(
    (component, index) => component / (m0 * cF) - drift.gamma * (uVector[index] / cF),
  );
  const residual = vectorNorm(residualVector);
  return scalarResult(residual, limit, { residualVector, p_CM_u: pCM, uVector });
}

function restMassDiagnostic(row, limit) {
  const m0u = finiteNumberOrNull(row?.M0_u);
  const m00 = positiveFiniteNumberOrNull(row?.M0_0);
  if (m0u === null || m00 === null) {
    return notEvaluated("missing_M0_u_or_M0_0");
  }
  const residual = (m0u - m00) / (m00 + EPSILON);
  return scalarResult(residual, limit, { M0_u: m0u, M0_0: m00 });
}

function massShellDiagnostic(row, limit) {
  const eCM = finiteNumberOrNull(row?.E_CM_u);
  const pCM = vectorOrNull(row?.p_CM_u);
  const m0 = positiveFiniteNumberOrNull(row?.M0_bin);
  const cF = positiveFiniteNumberOrNull(row?.c_f);
  const h = matrixOrNull(row?.h_ab);
  if (eCM === null || !pCM || m0 === null || cF === null || !h) {
    return notEvaluated("missing_mass_shell_inputs");
  }
  const pSquared = quadraticForm(h, pCM);
  if (pSquared === null) {
    return notEvaluated("invalid_h_ab_or_p_CM_u");
  }
  const denominator = m0 * m0 * cF ** 4 + EPSILON;
  const residual = (eCM ** 2 - cF * cF * pSquared - m0 * m0 * cF ** 4) / denominator;
  return scalarResult(residual, limit, { E_CM_u: eCM, pSquared, M0_bin: m0, c_f: cF });
}

function mediumResponseDiagnostic(row, limit) {
  const cF = positiveFiniteNumberOrNull(row?.c_f);
  const mSea = matrixOrNull(row?.M_sea_ab);
  const h = matrixOrNull(row?.h_ab);
  if (cF === null || !mSea || !h || mSea.length !== h.length) {
    return notEvaluated("missing_medium_response_inputs");
  }
  const residualTensor = [];
  for (let rowIndex = 0; rowIndex < mSea.length; rowIndex += 1) {
    if (!Array.isArray(mSea[rowIndex]) || !Array.isArray(h[rowIndex])) {
      return notEvaluated("invalid_medium_response_matrix");
    }
    const residualRow = [];
    for (let columnIndex = 0; columnIndex < mSea[rowIndex].length; columnIndex += 1) {
      const target = h[rowIndex][columnIndex] / (cF * cF);
      residualRow.push(cF * cF * (mSea[rowIndex][columnIndex] - target));
    }
    residualTensor.push(residualRow);
  }
  const residual = Math.max(...residualTensor.flat().map((value) => Math.abs(value)));
  return scalarResult(residual, limit, { residualTensor });
}

function residualDiagnostic({ value, tolerance: limit }) {
  const residual = finiteNumberOrNull(value);
  if (residual === null) {
    return notEvaluated("missing_residual");
  }
  return scalarResult(residual, limit, {});
}

function scalarResult(residual, limit, details) {
  const absoluteResidual = Math.abs(residual);
  return {
    status: absoluteResidual <= limit ? "passed" : "failed",
    residual,
    absoluteResidual,
    tolerance: limit,
    details,
  };
}

function notEvaluated(reason) {
  return {
    status: "not_evaluated",
    reason,
    residual: null,
    absoluteResidual: null,
    tolerance: null,
    details: {},
  };
}

function notEvaluatedWithDetails(reason, details) {
  return {
    status: "not_evaluated",
    reason,
    residual: null,
    absoluteResidual: null,
    tolerance: null,
    details,
  };
}

function nextBlockerForRecord({
  status,
  sameBranchIdentity,
  drift,
  missingRows,
  missingWitnesses,
  failedDiagnostics,
  undeclaredDiagnostics,
  failedNegativeControls,
  undeclaredNegativeControls,
}) {
  if (status === "populated") {
    return null;
  }
  if (status === "blocked_invalid_schema") {
    return "invalid_schema";
  }
  if (!sameBranchIdentity.accepted) {
    return sameBranchIdentity.nextBlocker ?? "missing_accepted_same_branch_chart_identity";
  }
  if (drift.status !== "passed") {
    return `invalid_drift_${drift.reason}`;
  }
  if (missingRows.length > 0) {
    return `missing_accepted_${missingRows[0]}`;
  }
  if (missingWitnesses.length > 0) {
    return `missing_accepted_${missingWitnesses[0]}`;
  }
  if (failedDiagnostics.length > 0) {
    return `failed_${failedDiagnostics[0]}`;
  }
  if (undeclaredDiagnostics.length > 0) {
    return `missing_${undeclaredDiagnostics[0]}_diagnostic`;
  }
  if (failedNegativeControls.length > 0) {
    return `failed_${failedNegativeControls[0]}_negative_control`;
  }
  if (undeclaredNegativeControls.length > 0) {
    return `missing_${undeclaredNegativeControls[0]}_negative_control`;
  }
  return status;
}

function nextBlockerDetailsForRecord({
  status,
  schema,
  sameBranchIdentity,
  drift,
  rowChecks,
  witnessChecks,
  diagnostics,
  negativeControls,
  missingRows,
  missingWitnesses,
  failedDiagnostics,
  undeclaredDiagnostics,
  failedNegativeControls,
  undeclaredNegativeControls,
}) {
  if (status === "populated") {
    return null;
  }
  if (status === "blocked_invalid_schema") {
    return {
      id: "schema",
      status: "invalid",
      expectedSchema: INPUT_SCHEMA,
      actualSchema: schema,
    };
  }
  if (!sameBranchIdentity.accepted) {
    return {
      id: "same_branch_identity",
      status: sameBranchIdentity.status,
      reason: sameBranchIdentity.nextBlocker,
      inputPath: sameBranchIdentity.inputPath,
      checkerStatus: sameBranchIdentity.checkerStatus,
      blocker: sameBranchIdentity.summary?.nextBlocker ?? sameBranchIdentity.nextBlocker,
      blockerDetails: sameBranchIdentity.summary?.nextBlockerDetails ?? null,
    };
  }
  if (drift.status !== "passed") {
    return {
      id: "drift",
      status: drift.status,
      reason: drift.reason,
      u: drift.u,
      c_f: drift.c_f,
      beta_f: drift.beta,
    };
  }
  if (missingRows.length > 0) {
    return rowLikeDetail(rowChecks.find((check) => check.key === missingRows[0]));
  }
  if (missingWitnesses.length > 0) {
    return rowLikeDetail(witnessChecks.find((check) => check.key === missingWitnesses[0]));
  }
  if (failedDiagnostics.length > 0) {
    return diagnosticDetail(failedDiagnostics[0], diagnostics[failedDiagnostics[0]]);
  }
  if (undeclaredDiagnostics.length > 0) {
    return diagnosticDetail(
      undeclaredDiagnostics[0],
      diagnostics[undeclaredDiagnostics[0]],
    );
  }
  if (failedNegativeControls.length > 0) {
    return negativeControlDetail(
      failedNegativeControls[0],
      negativeControls[failedNegativeControls[0]],
    );
  }
  if (undeclaredNegativeControls.length > 0) {
    return negativeControlDetail(
      undeclaredNegativeControls[0],
      negativeControls[undeclaredNegativeControls[0]],
    );
  }
  return {
    id: "record",
    status,
  };
}

function rowLikeDetail(check) {
  if (!check) {
    return null;
  }
  return {
    id: check.key,
    row: check.row,
    status: check.status,
    reason: check.reason,
    rowId: check.rowId,
    sourcePath: check.sourcePath,
    sourceReferenceExists: sourceReferenceExists(check.sourcePath),
    commonCarrierId: check.commonCarrierId,
    domainId: check.domainId,
    consumes: check.consumes,
  };
}

function diagnosticDetail(id, diagnostic) {
  if (!diagnostic) {
    return null;
  }
  return {
    id,
    status: diagnostic.status,
    reason: diagnostic.reason ?? null,
    residual: diagnostic.residual ?? null,
    absoluteResidual: diagnostic.absoluteResidual ?? null,
    tolerance: diagnostic.tolerance ?? null,
    details: diagnostic.details ?? {},
  };
}

function negativeControlDetail(id, control) {
  if (!control) {
    return null;
  }
  return {
    id,
    status: control.status,
    reason: control.reason ?? null,
    fitPass: control.fitPass ?? null,
    caughtFailure: control.caughtFailure ?? null,
    tolerance: control.tolerance ?? null,
    fitResiduals: control.fitResiduals ?? null,
    failureResiduals: control.failureResiduals ?? null,
  };
}

function tolerance(tolerances, key) {
  return nonnegativeFiniteNumberOrNull(tolerances[key]) ?? EPSILON;
}

function normalizeStatus(value) {
  if (value === undefined || value === null) {
    return "missing";
  }
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "object" && !Array.isArray(value)) {
    return value.status ?? "declared";
  }
  return "invalid";
}

function concreteString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function concreteNonPlaceholderString(value) {
  if (!concreteString(value)) {
    return false;
  }
  return !(
    value.includes("attempt") ||
    value.includes("pending") ||
    value.includes("placeholder") ||
    value.includes("mock") ||
    value.includes("toy") ||
    value.includes("/tmp/") ||
    value.includes("/private/tmp/") ||
    value.includes("content/generated/")
  );
}

function sourceReferenceExists(value) {
  if (!concreteString(value)) {
    return false;
  }
  if (
    value.includes("pending") ||
    value.includes("placeholder") ||
    value.includes("/tmp/") ||
    value.includes("/private/tmp/") ||
    value.includes("content/generated/")
  ) {
    return false;
  }
  const resolved = path.isAbsolute(value) ? value : path.resolve(process.cwd(), value);
  try {
    const stat = fs.statSync(resolved);
    return stat.isFile();
  } catch {
    return false;
  }
}

function finiteNumberOrNull(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function positiveFiniteNumberOrNull(value) {
  const number = finiteNumberOrNull(value);
  return number !== null && number > 0 ? number : null;
}

function nonnegativeFiniteNumberOrNull(value) {
  const number = finiteNumberOrNull(value);
  return number !== null && number >= 0 ? number : null;
}

function vectorOrNull(value) {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }
  const vector = value.map(finiteNumberOrNull);
  return vector.every((entry) => entry !== null) ? vector : null;
}

function matrixOrNull(value) {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }
  const matrix = value.map(vectorOrNull);
  return matrix.every((row) => row !== null) ? matrix : null;
}

function arrayOfStringsOrEmpty(value) {
  return Array.isArray(value)
    ? value.filter((entry) => typeof entry === "string")
    : [];
}

function vectorNorm(vector) {
  return Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
}

function quadraticForm(matrix, vector) {
  if (matrix.length !== vector.length) {
    return null;
  }
  let sum = 0;
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex += 1) {
    if (matrix[rowIndex].length !== vector.length) {
      return null;
    }
    for (let columnIndex = 0; columnIndex < vector.length; columnIndex += 1) {
      sum += vector[rowIndex] * matrix[rowIndex][columnIndex] * vector[columnIndex];
    }
  }
  return sum;
}
