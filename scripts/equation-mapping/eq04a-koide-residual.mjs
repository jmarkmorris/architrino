#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "eq04a-koide-residual-attempt.v1.json");
const INPUT_SCHEMA = "aaa-equation-map-eq04a-koide-residual-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-eq04a-koide-residual-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";
const DEFAULT_INHERITED_BLOCKER = "missing_accepted_raw_labeled_rows_preserved_on_retained_history";
const REQUIRED_CARRIER_ROWS = [
  "same_branch_chart_identity",
  "mass_shell_row",
  "rest_mass_row",
  "medium_response_row",
];

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

const inputPath = path.resolve(args.input);
const input = readJson(inputPath);
const output = evaluateEq04aKoideResidual(input, inputPath);
writeOutput(output, args);

if (args.requirePopulated && output.summary.status !== "populated_score_neutral") {
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
  console.log(`Usage: node scripts/equation-mapping/eq04a-koide-residual.mjs [options]

Options:
  --input PATH          EQ-04A Koide residual input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the residual is populated.
  --help                Show this help.

This checker is score-neutral. It computes Koide, angle, and moment-map
diagnostics only after confirming that the charged-lepton masses come from one
frozen, non-Koide-tuned mass map. It never raises an equation score.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeOutput(output, parsedArgs) {
  const payload = parsedArgs.summary ? summarizeOutput(output) : output;
  const text = JSON.stringify(payload, null, parsedArgs.pretty ? 2 : 0);
  if (parsedArgs.out) {
    fs.writeFileSync(path.resolve(parsedArgs.out), `${text}\n`);
  } else {
    console.log(text);
  }
}

function evaluateEq04aKoideResidual(input, inputPath) {
  const packet = input.packet ?? input;
  const tolerances = parseTolerances(packet.tolerances ?? input.tolerances ?? {});
  const inheritedBlocker = packet.inheritedBlocker ?? input.inheritedBlocker ?? DEFAULT_INHERITED_BLOCKER;
  const carrier = evaluateCarrier(packet.carrier ?? {});
  const massMap = evaluateMassMap(packet.massMap ?? {}, carrier.ids);
  const generations = evaluateGenerations(packet.generations ?? [], massMap, carrier.ids);
  const residual = computeResidual(generations.rows);
  const uncertainty = computeUncertaintyBand(generations.rows);
  const directFit = evaluateDirectFit(packet.massMap ?? {}, packet.controls ?? {});
  const status = decideStatus({
    schemaOk: input.schema === INPUT_SCHEMA,
    directFit,
    carrier,
    massMap,
    generations,
    uncertainty,
    tolerances,
  });
  const nextBlocker = firstBlocker({
    status,
    inheritedBlocker,
    directFit,
    carrier,
    massMap,
    generations,
    uncertainty,
    tolerances,
  });

  return {
    schema: OUTPUT_SCHEMA,
    generatedAt: new Date().toISOString(),
    input: {
      path: inputPath,
      schema: input.schema ?? null,
      schemaOk: input.schema === INPUT_SCHEMA,
      claimLevel: input.claimLevel ?? null,
    },
    residual: {
      id: packet.residualId ?? "R_04A_koide_residual",
      row: "EQ-04A",
      claimLevel:
        "score-neutral Koide residual diagnostic; inherited EQ-04 mass-shell carrier and non-Koide mass map are required before interpretation",
      scoreDecision: SCORE_DECISION,
    },
    summary: {
      status,
      scoreDecision: SCORE_DECISION,
      nextBlocker,
      inheritedBlocker,
      directFitBlocked: directFit.blocked,
      carrierAccepted: carrier.accepted,
      carrierReason: carrier.reason,
      massShellAccepted: carrier.massShellAccepted,
      sharedMassMapPass: massMap.sharedMassMapPass && generations.sharedMassMapPass,
      massMapReason: massMap.reason,
      noRetunePass: massMap.noRetunePass && generations.noRetunePass,
      massConventionPass: massMap.massConventionPass,
      generationRowsAccepted: generations.accepted,
      generationRowReasons: generations.rows.map((row) => ({
        id: row.id,
        reason: row.reason,
      })),
      uncertaintyBandPass:
        uncertainty.maxRelativeUncertainty <= tolerances.maxRelativeUncertainty &&
        uncertainty.bandWidth <= tolerances.maxCos2BandWidth,
      maxRelativeUncertainty: uncertainty.maxRelativeUncertainty,
      cos2ThetaInterval: uncertainty.cos2ThetaInterval,
      residualInterval: uncertainty.residualInterval,
      bandWidth: uncertainty.bandWidth,
      Q_l: residual.Q,
      inverseRatio: residual.inverseRatio,
      cos2Theta: residual.cos2Theta,
      RKoide: residual.RKoide,
      RInv: residual.RInv,
      RAngle: residual.RAngle,
      J_K: residual.JK,
      normalizedJ_K: residual.normalizedJK,
      R_d: residual.Rd,
      R_tr_norm2: residual.RtrNorm2,
      R_d_abs2: residual.RdAbs2,
      failureCodes: failureCodes({
        directFit,
        carrier,
        massMap,
        generations,
        uncertainty,
        tolerances,
      }),
    },
    carrier,
    massMap,
    generations,
    residual,
    uncertainty,
  };
}

function parseTolerances(raw) {
  return {
    maxRelativeUncertainty: finiteOr(raw.maxRelativeUncertainty, 0.05),
    maxCos2BandWidth: finiteOr(raw.maxCos2BandWidth, 0.02),
  };
}

function evaluateCarrier(raw) {
  const ids = {
    commonCarrierId: raw.commonCarrierId ?? null,
    domainId: raw.domainId ?? null,
    supportId: raw.supportId ?? null,
    retainedRowSetId: raw.retainedRowSetId ?? null,
  };
  const rows = raw.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_CARRIER_ROWS.map((rowId) => [rowId, evaluateAcceptedEvidence(rows[rowId])]),
  );
  const missingRows = REQUIRED_CARRIER_ROWS.filter((rowId) => !rowChecks[rowId].accepted);
  const carrierEvidence = evaluateAcceptedEvidence(raw);
  const idsConcrete =
    concreteString(ids.commonCarrierId) &&
    concreteString(ids.domainId) &&
    concreteString(ids.supportId) &&
    ids.retainedRowSetId === "S_eq";
  return {
    ids,
    status: normalizeStatus(raw),
    accepted: carrierEvidence.accepted && missingRows.length === 0 && idsConcrete,
    reason: carrierEvidence.accepted
      ? missingRows.length === 0
        ? idsConcrete
          ? "accepted"
          : "carrier_ids_not_concrete"
        : "missing_required_rows"
      : carrierEvidence.reason,
    idsConcrete,
    massShellAccepted: rowChecks.mass_shell_row?.accepted ?? false,
    missingRows,
    rowChecks,
  };
}

function evaluateMassMap(raw, carrierIds) {
  const evidence = evaluateAcceptedEvidence(raw);
  const fitObjective = String(raw.fitObjective ?? "").toLowerCase();
  const koideObjectiveWeight = finiteOr(raw.koideObjectiveWeight, 0);
  const sharedIds = {
    massMapId: raw.massMapId ?? raw.id ?? null,
    exposureRowId: raw.exposureRowId ?? null,
    shieldingRowId: raw.shieldingRowId ?? null,
    noetherSeaResponseRowId: raw.NoetherSeaResponseRowId ?? raw.noetherSeaResponseRowId ?? null,
    fixedParameterHash: raw.fixedParameterHash ?? null,
    massConvention: raw.massConvention ?? null,
    scheme: raw.scheme ?? null,
    scale: raw.scale ?? null,
  };
  const commonCarrierMatch =
    concreteString(raw.commonCarrierId) &&
    concreteString(carrierIds.commonCarrierId) &&
    raw.commonCarrierId === carrierIds.commonCarrierId;
  const domainMatch =
    concreteString(raw.domainId) &&
    concreteString(carrierIds.domainId) &&
    raw.domainId === carrierIds.domainId;
  const supportMatch =
    concreteString(raw.supportId) &&
    concreteString(carrierIds.supportId) &&
    raw.supportId === carrierIds.supportId;
  const sharedMassMapPass =
    concreteString(sharedIds.massMapId) &&
    concreteString(sharedIds.exposureRowId) &&
    concreteString(sharedIds.shieldingRowId) &&
    concreteString(sharedIds.noetherSeaResponseRowId) &&
    concreteString(sharedIds.fixedParameterHash) &&
    commonCarrierMatch &&
    domainMatch &&
    supportMatch;
  const massConventionPass = concreteString(sharedIds.massConvention);
  const directFitFlag =
    raw.koideObjectiveUsed === true ||
    koideObjectiveWeight > 0 ||
    fitObjective === "koide" ||
    fitObjective === "koide_residual";
  return {
    status: normalizeStatus(raw),
    accepted: evidence.accepted,
    reason: evidence.reason,
    sourcePath: raw.sourcePath ?? raw.source ?? null,
    sharedIds,
    commonCarrierMatch,
    domainMatch,
    supportMatch,
    sharedMassMapPass,
    massConventionPass,
    noRetunePass: sharedMassMapPass && !directFitFlag,
    directFitFlag,
  };
}

function evaluateGenerations(rawRows, massMap, carrierIds) {
  const rows = rawRows.map((row) => {
    const evidence = evaluateAcceptedEvidence(row);
    const mass = parseMass(row.massReadout ?? row.mass ?? {});
    const checks = {
      statusAccepted: evidence.accepted,
      generationIndex: Number.isInteger(row.generationIndex) && row.generationIndex >= 0 && row.generationIndex <= 2,
      massPositive: Number.isFinite(mass.value) && mass.value > 0,
      uncertaintyValid: Number.isFinite(mass.uncertainty) && mass.uncertainty >= 0 && mass.uncertainty < mass.value,
      massMapMatch: row.massMapId === massMap.sharedIds.massMapId,
      commonCarrierMatch:
        concreteString(row.commonCarrierId) &&
        concreteString(carrierIds.commonCarrierId) &&
        row.commonCarrierId === carrierIds.commonCarrierId,
      domainMatch:
        concreteString(row.domainId) &&
        concreteString(carrierIds.domainId) &&
        row.domainId === carrierIds.domainId,
      supportMatch:
        concreteString(row.supportId) &&
        concreteString(carrierIds.supportId) &&
        row.supportId === carrierIds.supportId,
      exposureMatch: concreteString(row.exposureRowId) && row.exposureRowId === massMap.sharedIds.exposureRowId,
      shieldingMatch: concreteString(row.shieldingRowId) && row.shieldingRowId === massMap.sharedIds.shieldingRowId,
      seaResponseMatch:
        concreteString(row.NoetherSeaResponseRowId ?? row.noetherSeaResponseRowId) &&
        (row.NoetherSeaResponseRowId ?? row.noetherSeaResponseRowId) === massMap.sharedIds.noetherSeaResponseRowId,
    };
    return {
      id: row.id ?? row.branchId ?? null,
      branchId: row.branchId ?? null,
      generationIndex: row.generationIndex ?? null,
      status: normalizeStatus(row),
      accepted: evidence.accepted,
      reason: evidence.reason,
      sourcePath: row.sourcePath ?? row.source ?? null,
      mass,
      checks,
    };
  });
  const sorted = rows.slice().sort((a, b) => a.generationIndex - b.generationIndex);
  const indices = new Set(sorted.map((row) => row.generationIndex));
  const completeTriplet = sorted.length === 3 && indices.has(0) && indices.has(1) && indices.has(2);
  const accepted = completeTriplet && sorted.every((row) => row.accepted);
  const sharedMassMapPass =
    completeTriplet &&
    sorted.every((row) =>
      row.checks.massPositive &&
      row.checks.uncertaintyValid &&
      row.checks.massMapMatch &&
      row.checks.commonCarrierMatch &&
      row.checks.domainMatch &&
      row.checks.supportMatch,
    );
  const noRetunePass =
    sharedMassMapPass &&
    sorted.every(
      (row) =>
        row.checks.exposureMatch &&
        row.checks.shieldingMatch &&
        row.checks.seaResponseMatch,
    );
  return {
    rows: sorted,
    completeTriplet,
    accepted,
    sharedMassMapPass,
    noRetunePass,
  };
}

function parseMass(raw) {
  if (Number.isFinite(raw)) {
    return { value: raw, uncertainty: 0 };
  }
  const value = finiteOr(raw.value ?? raw.central ?? raw.mass, NaN);
  const uncertainty = finiteOr(raw.uncertainty ?? raw.sigma ?? raw.halfWidth, 0);
  return { value, uncertainty };
}

function computeResidual(rows) {
  if (!rows || rows.length !== 3 || rows.some((row) => !(row.mass.value > 0))) {
    return emptyResidual();
  }
  const roots = rows.map((row) => Math.sqrt(row.mass.value));
  const sumMass = rows.reduce((sum, row) => sum + row.mass.value, 0);
  const sumRoot = roots.reduce((sum, root) => sum + root, 0);
  const Q = sumMass / (sumRoot * sumRoot);
  const inverseRatio = (sumRoot * sumRoot) / sumMass;
  const cos2Theta = inverseRatio / 3;
  const Rd = sumRoot / Math.sqrt(3);
  const RdAbs2 = Rd * Rd;
  const RtrNorm2 = sumMass - RdAbs2;
  const JK = RtrNorm2 - RdAbs2;
  return {
    Q,
    inverseRatio,
    cos2Theta,
    RKoide: Math.abs(Q - 2 / 3),
    RInv: Math.abs(inverseRatio - 3 / 2),
    RAngle: Math.abs(cos2Theta - 1 / 2),
    Rd,
    RdAbs2,
    RtrNorm2,
    JK,
    normalizedJK: JK / sumMass,
  };
}

function emptyResidual() {
  return {
    Q: null,
    inverseRatio: null,
    cos2Theta: null,
    RKoide: null,
    RInv: null,
    RAngle: null,
    Rd: null,
    RdAbs2: null,
    RtrNorm2: null,
    JK: null,
    normalizedJK: null,
  };
}

function computeUncertaintyBand(rows) {
  if (!rows || rows.length !== 3 || rows.some((row) => !(row.mass.value > 0))) {
    return {
      cos2ThetaInterval: [null, null],
      residualInterval: [null, null],
      bandWidth: Infinity,
      maxRelativeUncertainty: Infinity,
    };
  }
  const intervals = rows.map((row) => {
    const value = row.mass.value;
    const uncertainty = row.mass.uncertainty ?? 0;
    return [Math.max(Number.MIN_VALUE, value - uncertainty), value + uncertainty];
  });
  const values = [];
  for (const a of intervals[0]) {
    for (const b of intervals[1]) {
      for (const c of intervals[2]) {
        values.push(computeResidual([
          { mass: { value: a } },
          { mass: { value: b } },
          { mass: { value: c } },
        ]).cos2Theta);
      }
    }
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const residuals = values.map((value) => Math.abs(value - 1 / 2));
  const maxRelativeUncertainty = Math.max(
    ...rows.map((row) => (row.mass.uncertainty ?? 0) / row.mass.value),
  );
  return {
    cos2ThetaInterval: [min, max],
    residualInterval: [Math.min(...residuals), Math.max(...residuals)],
    bandWidth: max - min,
    maxRelativeUncertainty,
  };
}

function evaluateDirectFit(massMap, controls) {
  const fitObjective = String(massMap.fitObjective ?? controls.fitObjective ?? "").trim().toLowerCase();
  const weight = finiteOr(massMap.koideObjectiveWeight ?? controls.koideObjectiveWeight, 0);
  const used = massMap.koideObjectiveUsed === true || controls.koideObjectiveUsed === true;
  const blocked = used || weight > 0 || fitObjective.includes("koide");
  return {
    blocked,
    reason: blocked ? "koide.direct_fit" : "passed",
    fitObjective: fitObjective || null,
    koideObjectiveWeight: weight,
    koideObjectiveUsed: used,
  };
}

function decideStatus({ schemaOk, directFit, carrier, massMap, generations, uncertainty, tolerances }) {
  if (!schemaOk) return "blocked_schema";
  if (directFit.blocked) return "blocked_direct_fit";
  if (!carrier.accepted) return "blocked_inherited_carrier";
  if (!massMap.accepted || !massMap.sharedMassMapPass || !massMap.massConventionPass) {
    return "blocked_missing_accepted_charged_lepton_mass_map";
  }
  if (!generations.accepted || !generations.sharedMassMapPass || !generations.noRetunePass) {
    return "blocked_missing_accepted_generation_rows";
  }
  if (uncertainty.maxRelativeUncertainty > tolerances.maxRelativeUncertainty || uncertainty.bandWidth > tolerances.maxCos2BandWidth) {
    return "blocked_uncertainty_band_too_wide";
  }
  return "populated_score_neutral";
}

function firstBlocker({ status, inheritedBlocker, directFit, carrier, massMap, generations, uncertainty, tolerances }) {
  if (status === "blocked_direct_fit") return directFit.reason;
  if (status === "blocked_inherited_carrier") return inheritedBlocker;
  if (status === "blocked_missing_accepted_charged_lepton_mass_map") {
    if (!massMap.massConventionPass) return "koide.mass_scheme_ambiguous";
    if (!massMap.sharedMassMapPass) return "koide.split_generation_map";
    return "koide.accepted_mass_map_missing";
  }
  if (status === "blocked_missing_accepted_generation_rows") {
    if (!generations.completeTriplet) return "koide.generation_triplet_missing";
    if (!generations.sharedMassMapPass || !generations.noRetunePass) return "koide.split_generation_map";
    return "koide.accepted_branch_missing";
  }
  if (uncertainty.maxRelativeUncertainty > tolerances.maxRelativeUncertainty || uncertainty.bandWidth > tolerances.maxCos2BandWidth) {
    return "koide.error_band_too_wide";
  }
  if (carrier.missingRows.length > 0) return carrier.missingRows[0];
  return null;
}

function failureCodes({ directFit, carrier, massMap, generations, uncertainty, tolerances }) {
  const codes = [];
  if (directFit.blocked) codes.push("koide.direct_fit");
  if (!carrier.accepted) codes.push("koide.mass_shell_disconnect");
  if (!massMap.massConventionPass) codes.push("koide.mass_scheme_ambiguous");
  if (!massMap.sharedMassMapPass || !generations.sharedMassMapPass || !generations.noRetunePass) {
    codes.push("koide.split_generation_map");
  }
  if (!generations.accepted) codes.push("koide.accepted_branch_missing");
  if (uncertainty.maxRelativeUncertainty > tolerances.maxRelativeUncertainty || uncertainty.bandWidth > tolerances.maxCos2BandWidth) {
    codes.push("koide.error_band_too_wide");
  }
  return [...new Set(codes)];
}

function evaluateAcceptedEvidence(raw) {
  const status = normalizeStatus(raw);
  if (!ACCEPTED_STATUSES.has(status)) {
    return { accepted: false, reason: "row_not_accepted" };
  }
  const sourcePath = raw?.sourcePath ?? raw?.source ?? null;
  const source = evaluateSourcePath(sourcePath);
  if (!source.accepted) {
    return { accepted: false, reason: source.reason };
  }
  return { accepted: true, reason: "accepted" };
}

function normalizeStatus(raw) {
  if (raw == null) return "missing";
  if (typeof raw === "string") return raw;
  return raw.status ?? raw.retainedStatus ?? raw.claimStatus ?? "missing";
}

function evaluateSourcePath(sourcePath) {
  if (!sourcePath || typeof sourcePath !== "string") {
    return { accepted: false, reason: "missing_source_path" };
  }
  if (
    sourcePath.includes("pending") ||
    sourcePath.includes("placeholder")
  ) {
    return { accepted: false, reason: "placeholder_source_path" };
  }
  const absolute = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.join(REPO_ROOT, sourcePath.replace(/#.*/, ""));
  const relative = path.relative(REPO_ROOT, absolute);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return { accepted: false, reason: "source_outside_repo" };
  }
  if (isNonDurableSourcePath(absolute)) {
    return { accepted: false, reason: "non_durable_source_path" };
  }
  if (!fs.existsSync(absolute)) {
    return { accepted: false, reason: "source_missing" };
  }
  if (!fs.statSync(absolute).isFile()) {
    return { accepted: false, reason: "source_not_file" };
  }
  if (!isEvidenceSourcePath(absolute)) {
    return { accepted: false, reason: "accepted_without_evidence_source" };
  }
  return { accepted: true, reason: "accepted" };
}

function isNonDurableSourcePath(filePath) {
  const normalized = path.normalize(filePath);
  return (
    normalized.startsWith(`${path.normalize("/tmp")}${path.sep}`) ||
    normalized.startsWith(`${path.normalize("/private/tmp")}${path.sep}`) ||
    normalized.includes(`${path.sep}content${path.sep}generated${path.sep}`) ||
    path.basename(normalized).includes(".tmp")
  );
}

function isEvidenceSourcePath(filePath) {
  const normalized = path.normalize(filePath);
  const relative = path.relative(REPO_ROOT, normalized);
  if (relative === "" || relative.startsWith("..") || path.isAbsolute(relative)) {
    return false;
  }
  if (relative.startsWith(`reference${path.sep}priorities${path.sep}`)) {
    return false;
  }
  if (relative.startsWith(`content${path.sep}markdown${path.sep}aaa${path.sep}`)) {
    return false;
  }
  const lowerBasename = path.basename(normalized).toLowerCase();
  return !(
    lowerBasename.includes("attempt") ||
    lowerBasename.includes("toy") ||
    lowerBasename.includes("source-evidence-probe") ||
    lowerBasename.includes("probe") ||
    lowerBasename.includes("mock") ||
    lowerBasename.includes("negative-control")
  );
}

function concreteString(value) {
  return typeof value === "string" && value.trim().length > 0 && !/attempt|pending|placeholder|mock|toy/i.test(value);
}

function finiteOr(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function summarizeOutput(output) {
  return {
    schema: output.schema,
    generatedAt: output.generatedAt,
    input: output.input,
    residual: output.residual,
    summary: output.summary,
  };
}
