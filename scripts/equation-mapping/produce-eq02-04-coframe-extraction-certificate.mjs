#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SOURCE_SCHEMA =
  "aaa-equation-map-eq02-04-invariant-cell-coframe-source/v1";
const OUTPUT_SCHEMA =
  "aaa-equation-map-eq02-04-coframe-extraction-certificate/v1";
const PRODUCER_SCHEMA =
  "aaa-equation-map-eq02-04-coframe-extraction-producer/v1";
const DEFAULT_RETAINED_RECORD =
  "scripts/equation-mapping/eq02-04-translating-binary-retained-record-attempt.v1.json";
const ACCEPTED_STATUSES = new Set(["accepted", "populated", "passed"]);
const EPSILON = 1e-12;
const REQUIRED_ROW_BINDINGS = [
  "raw_labeled_rows_preserved_on_retained_history",
  "causal_root_ledger_rows_bound_to_S_eq",
  "wake_tail_rows_bound_to_S_eq",
  "energy_action_rows_bound_to_S_eq",
  "momentum_and_angular_momentum_rows_bound_to_S_eq",
  "phase_rows_bound_to_S_eq",
  "Noether_sea_record_bound_to_S_eq",
];
const REQUIRED_NEGATIVE_CONTROLS = [
  "window_length",
  "section_relocation",
  "transverse_displacement",
  "phase_permutation",
  "reciprocal_unextracted_coframe",
  "holonomy_retune",
];

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printUsage();
  process.exit(0);
}

if (!args.input) {
  throw new Error("Missing required --input PATH argument.");
}

const inputPath = path.resolve(args.input);
const source = readJson(inputPath);
const retainedRecord = args.retainedRecord
  ? readJson(path.resolve(args.retainedRecord))
  : null;
const certificate = produceCertificate({
  source,
  inputPath,
  retainedRecord,
});
writeOutput(args, certificate);

if (args.requireAccepted && certificate.status !== "accepted") {
  process.exitCode = 1;
}

function parseArgs(argv) {
  const parsed = {
    input: null,
    retainedRecord: DEFAULT_RETAINED_RECORD,
    out: null,
    pretty: false,
    summary: false,
    requireAccepted: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") {
      parsed.input = argv[++index];
    } else if (arg === "--retained-record") {
      parsed.retainedRecord = argv[++index];
    } else if (arg === "--no-retained-record") {
      parsed.retainedRecord = null;
    } else if (arg === "--out") {
      parsed.out = argv[++index];
    } else if (arg === "--pretty") {
      parsed.pretty = true;
    } else if (arg === "--summary") {
      parsed.summary = true;
    } else if (arg === "--require-accepted") {
      parsed.requireAccepted = true;
    } else if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return parsed;
}

function printUsage() {
  console.log(`Usage: node scripts/equation-mapping/produce-eq02-04-coframe-extraction-certificate.mjs --input PATH [options]

Options:
  --input PATH             Invariant-cell/coframe source report JSON.
  --retained-record PATH   Retained-record packet used for id and leg checks.
                           Defaults to ${DEFAULT_RETAINED_RECORD}.
  --no-retained-record     Produce from the source report alone.
  --out PATH               Write the certificate JSON to PATH.
  --summary                Emit compact producer summary JSON.
  --pretty                 Pretty-print JSON output.
  --require-accepted       Exit nonzero unless the produced certificate is accepted.
  --help                   Show this help.

This producer is fail-closed. It emits the existing coframe extraction
certificate schema, but only marks it accepted when a durable source report
supplies accepted invariant-cell support, gamma-free extraction basis,
connection/holonomy data, and zero extraction/support/holonomy residuals.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeOutput(parsedArgs, certificate) {
  const payload = parsedArgs.summary
    ? summarizeCertificate(certificate)
    : certificate;
  const text = JSON.stringify(payload, null, parsedArgs.pretty ? 2 : 0);
  if (parsedArgs.out) {
    fs.writeFileSync(path.resolve(parsedArgs.out), `${text}\n`);
  } else {
    console.log(text);
  }
}

function produceCertificate({ source, inputPath, retainedRecord }) {
  const row = retainedRecord?.rows?.gamma_free_coframe_row ?? null;
  const tolerance =
    nonnegativeFiniteNumberOrNull(source.tolerance) ??
    nonnegativeFiniteNumberOrNull(source.tolerances?.coframeExtraction) ??
    nonnegativeFiniteNumberOrNull(retainedRecord?.tolerances?.coframeExtraction) ??
    EPSILON;
  const evidenceScale = evaluateEvidenceScale(source, tolerance);
  const checks = [];
  const check = (id, passed, details = {}) => {
    checks.push({ id, passed, details });
    return passed;
  };

  check("source_schema", source.schema === SOURCE_SCHEMA, {
    expected: SOURCE_SCHEMA,
    actual: source.schema ?? null,
  });
  const sourceStatus = normalizeStatus(source);
  check("source_status", ACCEPTED_STATUSES.has(sourceStatus), {
    sourceStatus,
  });
  check("source_path_durable", durableSourcePath(inputPath), {
    sourcePath: repoRelativePath(inputPath),
  });
  check("source_not_output_certificate", source.schema !== OUTPUT_SCHEMA, {
    sourceSchema: source.schema ?? null,
  });
  check(
    "accept_band_calibrated",
    evidenceScale.passed,
    evidenceScale.details,
  );

  const sourceKind = source.sourceKind ?? "invariant_cell_certificate";
  check(
    "source_kind",
    ["invariant_cell_certificate", "wake_return_extraction_certificate"].includes(
      sourceKind,
    ),
    { sourceKind },
  );

  const ids = {
    commonCarrierId: source.commonCarrierId ?? row?.commonCarrierId ?? null,
    domainId: source.domainId ?? row?.domainId ?? null,
    retainedRowSetId: source.retainedRowSetId ?? row?.retainedRowSetId ?? null,
    supportId: source.supportId ?? row?.supportId ?? null,
  };
  check("common_carrier_id_concrete", concreteNonPlaceholderString(ids.commonCarrierId), {
    commonCarrierId: ids.commonCarrierId,
  });
  check("domain_id_concrete", concreteNonPlaceholderString(ids.domainId), {
    domainId: ids.domainId,
  });
  check(
    "retained_row_set_id",
    ids.retainedRowSetId === "S_eq",
    { retainedRowSetId: ids.retainedRowSetId },
  );
  check("support_id_concrete", concreteNonPlaceholderString(ids.supportId), {
    supportId: ids.supportId,
  });
  if (row) {
    check("row_common_carrier_match", ids.commonCarrierId === row.commonCarrierId, {
      sourceCommonCarrierId: ids.commonCarrierId,
      rowCommonCarrierId: row.commonCarrierId ?? null,
    });
    check("row_domain_match", ids.domainId === row.domainId, {
      sourceDomainId: ids.domainId,
      rowDomainId: row.domainId ?? null,
    });
    check("row_support_match", ids.supportId === row.supportId, {
      sourceSupportId: ids.supportId,
      rowSupportId: row.supportId ?? null,
    });
  }
  const rowBindings = source.rowBindings ?? {};
  for (const id of REQUIRED_ROW_BINDINGS) {
    const rowBinding = evaluateRowBinding(id, rowBindings[id], ids);
    check(`row_binding_${id}`, rowBinding.passed, rowBinding.details);
  }

  const support = source.support ?? source.invariantCell ?? {};
  const supportStatus = normalizeStatus(support);
  check("support_status", ACCEPTED_STATUSES.has(supportStatus), {
    supportStatus,
  });
  const supportKind = source.supportKind ?? support.kind ?? "positive_width_invariant_cell";
  check("support_kind", supportKind === "positive_width_invariant_cell", {
    supportKind,
  });
  for (const field of ["B_N", "Sigma_N", "P_N", "K_P_N"]) {
    const supportField = evaluateSupportField(field, support[field], tolerance);
    check(`support_${field}_certified`, supportField.passed, supportField.details);
  }
  const positiveTransverseWidth = positiveFiniteNumberOrNull(
    support.positiveTransverseWidth,
  );
  check("positive_transverse_width", positiveTransverseWidth !== null, {
    positiveTransverseWidth: support.positiveTransverseWidth ?? null,
  });
  check("return_inclusion", returnInclusionIsCertified(support.returnInclusion), {
    returnInclusion: support.returnInclusion ?? null,
  });
  check("memory_depth", positiveInteger(support.N), { N: support.N ?? null });
  check("truncation_error", nonnegativeFiniteNumberOrNull(support.truncationError) !== null, {
    truncationError: support.truncationError ?? null,
  });
  const refinementPersistence = evaluateRefinementPersistence(
    support.refinementPersistence,
    tolerance,
  );
  check(
    "refinement_persistence",
    refinementPersistence.passed,
    refinementPersistence.details,
  );
  const refinementStepEvidence = evaluateRefinementStepEvidence(
    support.refinementPersistence,
    ids.supportId,
    tolerance,
  );
  check(
    "refinement_persistence_step_sources",
    refinementStepEvidence.stepSourcesPassed,
    refinementStepEvidence.details,
  );
  check(
    "refinement_persistence_support_id_stability",
    refinementStepEvidence.supportIdStabilityPassed,
    refinementStepEvidence.details,
  );

  const extractionBasis = arrayOfStrings(source.extractionBasis);
  const requiredBasis = ["c_f", "u", "L_root", "L_wake"];
  const allowedBasis = new Set([
    "c_f",
    "u",
    "L_root",
    "L_wake",
    "retained_boundary_history",
  ]);
  const forbiddenBasis = [
    "gamma_f",
    "Lorentz_target",
    "mass_shell_target",
    "fitted_clock_envelope",
  ];
  check(
    "extraction_basis_required",
    requiredBasis.every((basis) => extractionBasis.includes(basis)),
    { extractionBasis, requiredBasis },
  );
  check(
    "extraction_basis_allowed",
    extractionBasis.every((basis) => allowedBasis.has(basis)),
    { extractionBasis },
  );
  check(
    "extraction_basis_gamma_free",
    forbiddenBasis.every((basis) => !extractionBasis.includes(basis)),
    { extractionBasis, forbiddenBasis },
  );

  const extractedLegs = source.extractedLegs ?? source.coframeLegs ?? {};
  const legs = {
    e0_dt: positiveFiniteNumberOrNull(extractedLegs.e0_dt ?? extractedLegs.timeLeg),
    e_parallel: finiteNumberOrNull(
      extractedLegs.e_parallel ?? extractedLegs.parallelLeg,
    ),
    e_perp: positiveFiniteNumberOrNull(extractedLegs.e_perp ?? extractedLegs.perpLeg),
  };
  check("extracted_legs_present", Object.values(legs).every((value) => value !== null), {
    extractedLegs,
  });
  if (row && Object.values(legs).every((value) => value !== null)) {
    const legResidual = Math.max(
      Math.abs(legs.e0_dt - row.e0_dt),
      Math.abs(legs.e_parallel - row.e_parallel),
      Math.abs(legs.e_perp - row.e_perp),
    );
    check("extracted_legs_match_retained_row", legResidual <= tolerance, {
      legResidual,
      tolerance,
    });
  }

  const connection = source.connection ?? {};
  check("connection_status", acceptedLike(connection), {
    connectionStatus: normalizeStatus(connection),
  });
  check("connection_omega_status", acceptedLike(connection.omegaStatus), {
    omegaStatus: connection.omegaStatus ?? null,
  });
  const torsionMaxAbs = nonnegativeFiniteNumberOrNull(connection.torsionMaxAbs);
  check("connection_torsion_bound", torsionMaxAbs !== null && torsionMaxAbs <= tolerance, {
    torsionMaxAbs: connection.torsionMaxAbs ?? null,
    tolerance,
  });
  const phaseHolonomyT2 = arrayOfFiniteNumbers(connection.phaseHolonomyT2);
  const phaseHolonomyMaxAbs =
    phaseHolonomyT2.length > 0
      ? Math.max(...phaseHolonomyT2.map((value) => Math.abs(value)))
      : null;
  check(
    "connection_phase_holonomy_bound",
    phaseHolonomyMaxAbs !== null && phaseHolonomyMaxAbs <= tolerance,
    { phaseHolonomyT2: connection.phaseHolonomyT2 ?? null, tolerance },
  );
  const supportTransportResidual = finiteNumberOrNull(
    connection.supportTransportResidual,
  );
  const holonomyTransportResidual = finiteNumberOrNull(
    connection.holonomyTransportResidual,
  );
  check(
    "connection_transport_residuals_present",
    supportTransportResidual !== null && holonomyTransportResidual !== null,
    {
      supportTransportResidual: connection.supportTransportResidual ?? null,
      holonomyTransportResidual: connection.holonomyTransportResidual ?? null,
    },
  );
  check(
    "connection_transport_residuals_bound",
    supportTransportResidual !== null &&
      holonomyTransportResidual !== null &&
      Math.max(
        Math.abs(supportTransportResidual),
        Math.abs(holonomyTransportResidual),
      ) <= tolerance,
    {
      supportTransportResidual,
      holonomyTransportResidual,
      tolerance,
    },
  );

  const residuals = source.residuals ?? {};
  const extractionResidual = finiteNumberOrNull(residuals.extractionResidual);
  const supportBindingResidual = finiteNumberOrNull(
    residuals.supportBindingResidual,
  );
  const holonomyResidual = finiteNumberOrNull(residuals.holonomyResidual);
  const residualMaxAbs = [
    extractionResidual,
    supportBindingResidual,
    holonomyResidual,
  ].every((value) => value !== null)
    ? Math.max(
        Math.abs(extractionResidual),
        Math.abs(supportBindingResidual),
        Math.abs(holonomyResidual),
      )
    : null;
  check("residuals_present", residualMaxAbs !== null, { residuals });
  check("residuals_within_tolerance", residualMaxAbs !== null && residualMaxAbs <= tolerance, {
    residualMaxAbs,
    tolerance,
  });

  const negativeControls = source.negativeControls ?? {};
  for (const id of REQUIRED_NEGATIVE_CONTROLS) {
    const negativeControl = evaluateNegativeControl(
      id,
      negativeControls[id],
      evidenceScale,
    );
    check(
      `negative_control_${id}`,
      negativeControl.accepted,
      negativeControl.details,
    );
    check(
      `negative_control_${id}_margin_calibrated`,
      negativeControl.marginCalibrated,
      negativeControl.details,
    );
  }

  const accepted = checks.every((item) => item.passed);
  const status = accepted ? "accepted" : "blocked";

  return {
    schema: OUTPUT_SCHEMA,
    claimLevel:
      "source-produced coframe extraction certificate; score-neutral until retained-domain row bindings are also accepted",
    status,
    certificateId:
      source.certificateId ??
      `${source.sourceId ?? path.basename(inputPath, ".json")}_coframe_certificate`,
    sourceKind,
    sourcePath: repoRelativePath(inputPath),
    commonCarrierId: ids.commonCarrierId,
    domainId: ids.domainId,
    retainedRowSetId: ids.retainedRowSetId,
    supportKind,
    supportId: ids.supportId,
    support: {
      status: accepted ? "accepted" : supportStatus,
      B_N: support.B_N ?? null,
      Sigma_N: support.Sigma_N ?? null,
      P_N: support.P_N ?? null,
      K_P_N: support.K_P_N ?? null,
      positiveTransverseWidth: positiveTransverseWidth ?? null,
      returnInclusion: support.returnInclusion ?? null,
      N: support.N ?? null,
      truncationError: support.truncationError ?? null,
      refinementPersistence: support.refinementPersistence ?? null,
    },
    extractionBasis,
    extractedLegs: {
      e0_dt: legs.e0_dt,
      e_parallel: legs.e_parallel,
      e_perp: legs.e_perp,
    },
    connection: {
      status: accepted ? "accepted" : normalizeStatus(connection),
      omegaStatus: connection.omegaStatus ?? null,
      torsionMaxAbs: torsionMaxAbs ?? null,
      phaseHolonomyT2,
    },
    residuals: {
      extractionResidual,
      supportBindingResidual,
      holonomyResidual,
    },
    producer: {
      schema: PRODUCER_SCHEMA,
      generatedAt: new Date().toISOString(),
      sourceSchema: source.schema ?? null,
      tolerance,
      status,
      scoreDecision: "no_score_increase",
      checks,
      failedChecks: checks.filter((item) => !item.passed).map((item) => item.id),
      nextBlocker: firstFailedCheck(checks),
    },
  };
}

function summarizeCertificate(certificate) {
  return {
    schema: certificate.schema,
    status: certificate.status,
    certificateId: certificate.certificateId,
    sourcePath: certificate.sourcePath,
    supportId: certificate.supportId,
    producer: {
      schema: certificate.producer.schema,
      generatedAt: certificate.producer.generatedAt,
      status: certificate.producer.status,
      scoreDecision: certificate.producer.scoreDecision,
      failedChecks: certificate.producer.failedChecks,
      nextBlocker: certificate.producer.nextBlocker,
    },
  };
}

function firstFailedCheck(checks) {
  return checks.find((check) => !check.passed)?.id ?? null;
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

function acceptedLike(value) {
  if (value === true) {
    return true;
  }
  return ACCEPTED_STATUSES.has(normalizeStatus(value));
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

function durableSourcePath(filePath) {
  if (!concreteString(filePath)) {
    return false;
  }
  if (
    filePath.includes("/tmp/") ||
    filePath.includes("/private/tmp/") ||
    filePath.includes("content/generated/")
  ) {
    return false;
  }
  try {
    const stat = fs.statSync(filePath);
    return stat.isFile();
  } catch {
    return false;
  }
}

function sourceReferenceExists(value) {
  if (!concreteString(value)) {
    return false;
  }
  const resolved = path.isAbsolute(value) ? value : path.resolve(process.cwd(), value);
  return durableSourcePath(resolved);
}

function supportObjectIsCertified(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  if (!ACCEPTED_STATUSES.has(normalizeStatus(value))) {
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

function evaluateSupportField(field, value, tolerance) {
  if (!supportObjectIsCertified(value)) {
    return {
      passed: false,
      details: { field, value: value ?? null, reason: "support_object_not_certified" },
    };
  }
  if (field === "B_N") {
    const hasGeometry = Boolean(value.intervalHull ?? value.coordinates ?? value.box);
    const hasPositiveSize =
      positiveFiniteNumberOrNull(
        value.radius ?? value.width ?? value.measureLowerBound,
      ) !== null ||
      (Array.isArray(value.radii) &&
        value.radii.length > 0 &&
        value.radii.every((item) => positiveFiniteNumberOrNull(item) !== null));
    return {
      passed: hasGeometry && hasPositiveSize,
      details: {
        field,
        hasGeometry,
        hasPositiveSize,
        id: value.id ?? value.rowId ?? null,
      },
    };
  }
  if (field === "Sigma_N") {
    const transversalityMargin = positiveFiniteNumberOrNull(
      value.transversalityMargin,
    );
    return {
      passed: concreteString(value.sectionRule) && transversalityMargin !== null,
      details: {
        field,
        sectionRule: value.sectionRule ?? null,
        transversalityMargin,
        id: value.id ?? value.rowId ?? null,
      },
    };
  }
  if (field === "P_N") {
    const returnTime = positiveFiniteNumberOrNull(value.returnTime);
    const mapNormBound = nonnegativeFiniteNumberOrNull(value.mapNormBound);
    return {
      passed: returnTime !== null && mapNormBound !== null,
      details: {
        field,
        returnTime,
        mapNormBound,
        id: value.id ?? value.rowId ?? null,
      },
    };
  }
  if (field === "K_P_N") {
    const inclusionResidual = nonnegativeFiniteNumberOrNull(value.inclusionResidual);
    return {
      passed: inclusionResidual !== null && inclusionResidual <= tolerance,
      details: {
        field,
        inclusionResidual,
        tolerance,
        id: value.id ?? value.rowId ?? null,
      },
    };
  }
  return { passed: true, details: { field, id: value.id ?? value.rowId ?? null } };
}

function evaluateRowBinding(bindingId, value, ids) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {
      passed: false,
      details: {
        bindingId,
        rowBinding: value ?? null,
        reason: "row_binding_not_source_bound_object",
      },
    };
  }
  const rowId = value.rowId ?? value.id ?? null;
  const sourcePath = value.sourcePath ?? value.source ?? null;
  const checks = {
    statusAccepted: acceptedLike(value),
    rowIdConcrete: concreteNonPlaceholderString(rowId),
    retainedRowSetMatch: value.retainedRowSetId === ids.retainedRowSetId,
    commonCarrierMatch: value.commonCarrierId === ids.commonCarrierId,
    domainMatch: value.domainId === ids.domainId,
    supportMatch: value.supportId === ids.supportId,
    sourceReferenceExists:
      concreteString(sourcePath) && sourceReferenceExists(sourcePath),
  };
  return {
    passed: Object.values(checks).every(Boolean),
    details: {
      bindingId,
      rowId,
      retainedRowSetId: value.retainedRowSetId ?? null,
      commonCarrierId: value.commonCarrierId ?? null,
      domainId: value.domainId ?? null,
      supportId: value.supportId ?? null,
      sourcePath: sourcePath ?? null,
      checks,
    },
  };
}

function evaluateNegativeControl(id, value, evidenceScale) {
  if (!acceptedLike(value)) {
    return {
      accepted: false,
      marginCalibrated: false,
      details: {
        id,
        negativeControl: value ?? null,
        reason: "negative_control_not_accepted",
      },
    };
  }
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    const violationMargin = positiveFiniteNumberOrNull(
      value.violationMargin ??
        value.failureMargin ??
        value.failureResidual ??
        value.residualGap,
    );
    const accepted = concreteString(value.expectedFailure) && violationMargin !== null;
    const marginCalibrated =
      accepted &&
      evidenceScale.passed &&
      violationMargin >= evidenceScale.requiredNegativeMargin;
    return {
      accepted,
      marginCalibrated,
      details: {
        id,
        expectedFailure: value.expectedFailure ?? null,
        violationMargin,
        requiredNegativeMargin: evidenceScale.requiredNegativeMargin,
        acceptBand: evidenceScale.acceptBand,
        negativeMarginFactor: evidenceScale.negativeMarginFactor,
      },
    };
  }
  return {
    accepted: false,
    marginCalibrated: false,
    details: {
      id,
      negativeControl: value ?? null,
      reason: "negative_control_not_object",
    },
  };
}

function evaluateEvidenceScale(source, tolerance) {
  const acceptBand = positiveFiniteNumberOrNull(
    source.acceptBand ?? source.acceptanceBand ?? source.evidenceScale?.acceptBand,
  );
  const arithmeticNoiseFloor = nonnegativeFiniteNumberOrNull(
    source.arithmeticNoiseFloor ?? source.evidenceScale?.arithmeticNoiseFloor,
  );
  const truncationNoiseFloor = nonnegativeFiniteNumberOrNull(
    source.truncationNoiseFloor ?? source.evidenceScale?.truncationNoiseFloor,
  );
  const negativeMarginFactor = positiveFiniteNumberOrNull(
    source.negativeMarginFactor ?? source.evidenceScale?.negativeMarginFactor,
  );
  const combinedNoiseFloor =
    arithmeticNoiseFloor !== null && truncationNoiseFloor !== null
      ? Math.max(arithmeticNoiseFloor, truncationNoiseFloor, tolerance)
      : null;
  const requiredNegativeMargin =
    acceptBand !== null && negativeMarginFactor !== null
      ? acceptBand * negativeMarginFactor
      : null;
  const passed =
    acceptBand !== null &&
    arithmeticNoiseFloor !== null &&
    truncationNoiseFloor !== null &&
    negativeMarginFactor !== null &&
    negativeMarginFactor > 1 &&
    combinedNoiseFloor !== null &&
    acceptBand >= combinedNoiseFloor &&
    requiredNegativeMargin !== null;
  return {
    passed,
    acceptBand,
    arithmeticNoiseFloor,
    truncationNoiseFloor,
    negativeMarginFactor,
    combinedNoiseFloor,
    requiredNegativeMargin,
    details: {
      acceptBand,
      arithmeticNoiseFloor,
      truncationNoiseFloor,
      negativeMarginFactor,
      combinedNoiseFloor,
      requiredNegativeMargin,
    },
  };
}

function evaluateRefinementPersistence(value, tolerance) {
  if (!acceptedLike(value) || typeof value !== "object" || Array.isArray(value)) {
    return {
      passed: false,
      details: {
        refinementPersistence: value ?? null,
        reason: "refinement_persistence_not_accepted_object",
      },
    };
  }
  const hSequence = arrayOfFiniteNumbers(value.hSequence ?? value.stepSequence);
  const nSequence = arrayOfPositiveIntegers(value.NSequence ?? value.memoryDepthSequence);
  const supportSetStability = value.supportSetStability ?? {};
  const scalarResidualConvergence = value.scalarResidualConvergence ?? {};
  const controls = value.controls ?? {};
  const supportResidual = nonnegativeFiniteNumberOrNull(
    supportSetStability.hausdorffResidual ??
      supportSetStability.supportResidual ??
      supportSetStability.residual,
  );
  const scalarResidual = nonnegativeFiniteNumberOrNull(
    scalarResidualConvergence.maxResidual ??
      scalarResidualConvergence.residual ??
      scalarResidualConvergence.scalarResidual,
  );
  const hSequencePass =
    hSequence.length >= 3 &&
    hSequence.every((item) => item > 0) &&
    strictlyDecreasing(hSequence);
  const nSequencePass = nSequence.length >= 3 && strictlyIncreasing(nSequence);
  const supportSetStabilityPass =
    acceptedLike(supportSetStability) &&
    supportResidual !== null &&
    supportResidual <= tolerance;
  const scalarResidualConvergencePass =
    acceptedLike(scalarResidualConvergence) &&
    scalarResidual !== null &&
    scalarResidual <= tolerance;
  const controlPasses = {
    windowLength: acceptedLike(controls.windowLength),
    sectionPlacement: acceptedLike(controls.sectionPlacement ?? controls.sectionRelocation),
    transverseDisplacement: acceptedLike(controls.transverseDisplacement),
    phasePermutation: acceptedLike(controls.phasePermutation),
  };
  const controlsPass = Object.values(controlPasses).every(Boolean);
  return {
    passed:
      hSequencePass &&
      nSequencePass &&
      supportSetStabilityPass &&
      scalarResidualConvergencePass &&
      controlsPass,
    details: {
      hSequence,
      nSequence,
      hSequencePass,
      nSequencePass,
      supportSetStabilityPass,
      scalarResidualConvergencePass,
      controlPasses,
      tolerance,
    },
  };
}

function evaluateRefinementStepEvidence(value, supportId, tolerance) {
  if (!acceptedLike(value) || typeof value !== "object" || Array.isArray(value)) {
    return {
      stepSourcesPassed: false,
      supportIdStabilityPassed: false,
      details: {
        refinementPersistence: value ?? null,
        reason: "refinement_persistence_not_accepted_object",
      },
    };
  }
  const steps = Array.isArray(value.steps) ? value.steps : [];
  const stepDetails = steps.map((step, index) => {
    const h = positiveFiniteNumberOrNull(step?.h ?? step?.stepSize);
    const N = positiveInteger(step?.N ?? step?.memoryDepth)
      ? step.N ?? step.memoryDepth
      : null;
    const stepSupportId = step?.supportId ?? null;
    const sourcePath = step?.sourcePath ?? step?.source ?? null;
    const inclusionResidual = nonnegativeFiniteNumberOrNull(
      step?.inclusionResidual,
    );
    const supportResidual = nonnegativeFiniteNumberOrNull(
      step?.supportResidual ?? step?.hausdorffResidual,
    );
    const scalarResidual = nonnegativeFiniteNumberOrNull(
      step?.scalarResidual ?? step?.maxResidual,
    );
    return {
      index,
      statusAccepted: acceptedLike(step),
      h,
      N,
      supportId: stepSupportId,
      supportIdMatches: stepSupportId === supportId,
      sourcePath: sourcePath ?? null,
      sourceReferenceExists:
        concreteString(sourcePath) && sourceReferenceExists(sourcePath),
      inclusionResidual,
      inclusionResidualBound:
        inclusionResidual !== null && inclusionResidual <= tolerance,
      supportResidual,
      supportResidualBound: supportResidual !== null && supportResidual <= tolerance,
      scalarResidual,
      scalarResidualBound: scalarResidual !== null && scalarResidual <= tolerance,
    };
  });
  const hSequence = stepDetails.map((step) => step.h).filter((item) => item !== null);
  const nSequence = stepDetails.map((step) => step.N).filter((item) => item !== null);
  const enoughSteps = steps.length >= 3;
  const stepSourcesPassed =
    enoughSteps &&
    stepDetails.every(
      (step) =>
        step.statusAccepted &&
        step.h !== null &&
        step.N !== null &&
        step.sourceReferenceExists &&
        step.inclusionResidualBound &&
        step.supportResidualBound &&
        step.scalarResidualBound,
    ) &&
    strictlyDecreasing(hSequence) &&
    strictlyIncreasing(nSequence);
  const supportIdStabilityPassed =
    enoughSteps &&
    concreteNonPlaceholderString(supportId) &&
    stepDetails.every((step) => step.supportIdMatches);
  return {
    stepSourcesPassed,
    supportIdStabilityPassed,
    details: {
      expectedSupportId: supportId,
      stepCount: steps.length,
      enoughSteps,
      hSequence,
      nSequence,
      hSequencePass: hSequence.length === steps.length && strictlyDecreasing(hSequence),
      nSequencePass: nSequence.length === steps.length && strictlyIncreasing(nSequence),
      stepDetails,
      tolerance,
    },
  };
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

function finiteNumberOrNull(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function nonnegativeFiniteNumberOrNull(value) {
  const number = finiteNumberOrNull(value);
  return number !== null && number >= 0 ? number : null;
}

function positiveFiniteNumberOrNull(value) {
  const number = finiteNumberOrNull(value);
  return number !== null && number > 0 ? number : null;
}

function positiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function arrayOfStrings(value) {
  return Array.isArray(value)
    ? value.filter((item) => typeof item === "string")
    : [];
}

function arrayOfFiniteNumbers(value) {
  return Array.isArray(value)
    ? value.filter((item) => Number.isFinite(item))
    : [];
}

function arrayOfPositiveIntegers(value) {
  return Array.isArray(value)
    ? value.filter((item) => Number.isInteger(item) && item > 0)
    : [];
}

function strictlyDecreasing(values) {
  return values.every((value, index) => index === 0 || value < values[index - 1]);
}

function strictlyIncreasing(values) {
  return values.every((value, index) => index === 0 || value > values[index - 1]);
}

function repoRelativePath(filePath) {
  const relative = path.relative(process.cwd(), filePath);
  return relative.startsWith("..") ? filePath : relative;
}
