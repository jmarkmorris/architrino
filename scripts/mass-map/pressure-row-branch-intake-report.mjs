#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const REQUIRED_FIELDS = [
  {
    path: "branch_id",
    requirement: "Accepted finite branch identity for the retained pressure row.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "accepted_history_segment_id",
    requirement: "Accepted history segment emitted by the branch packet or generated report.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "source_path",
    requirement: "Path to the priority packet or generated report that emits the accepted history segment.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "quotient_chart_id",
    requirement: "Exposure quotient chart used by the mass-facing source row.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "residual_status",
    requirement: "Pass or accepted residual status for the same pressure row.",
    failureCode: "pressure_row_residual_not_accepted",
    acceptedValues: ["accepted", "pass", "residual_pass"],
  },
  {
    path: "gap_or_stability_status",
    requirement: "Positive branch-gap or accepted stability status for the same row.",
    failureCode: "pressure_row_stability_not_accepted",
    acceptedValues: ["positive_gap", "positive_stability_gap", "accepted", "pass"],
  },
  {
    path: "eta_ladder_status",
    requirement: "Eta-ladder persistence status when required by the row.",
    failureCode: "pressure_row_eta_ladder_not_accepted",
    acceptedValues: ["not_required", "accepted", "persistent", "pass"],
  },
  {
    path: "pressure_record.Pi",
    requirement: "Same-row isotropic pressure-loading entry.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "pressure_record.A",
    requirement: "Same-row anisotropic pressure-loading entry.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "pressure_record.s_n",
    requirement: "Same-row packing-headroom entry.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "pressure_record.Q_chi_ab",
    requirement: "Same-row delay-response tensor direction or source record.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "pressure_record.S_dev_ab",
    requirement: "Same-row retained strain-channel source record.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "pressure_record.retained_replay_direction",
    requirement: "Declared replay direction for retained trace-free pressure response.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "exposure_source_record.E_internal",
    requirement: "Branch-emitted internal-energy source for the same row.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "exposure_source_record.zeta",
    requirement: "Branch-emitted shielding or exposure coefficient for the same row.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "exposure_source_record.M0_src",
    requirement: "Branch-emitted exposed source mass for the same row.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "exposure_source_record.N_tf_ab",
    requirement: "Branch-emitted trace-free numerator for the same row.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "pressure_response_record.partial_P_M0_src",
    requirement: "Branch-emitted pressure derivative of the exposed source mass.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "pressure_response_record.C_chi_iso",
    requirement: "Branch-emitted shared isotropic delay coefficient.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "pressure_response_record.C_chi_aniso",
    requirement: "Branch-emitted shared anisotropic delay coefficient.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "pressure_response_record.m_S",
    requirement: "Branch-emitted medium-response coefficient for the same row.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "reversible_domain.R_tr",
    requirement: "Same-row reversible trace residual.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "reversible_domain.R_tr_star",
    requirement: "Declared reversible trace residual threshold.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "reversible_domain.loss_channels_closed",
    requirement: "Loss channels must be closed for branch-derived reversible response.",
    failureCode: "pressure_row_reversible_domain_not_accepted",
    acceptedValues: [true],
  },
  {
    path: "null_sector_record.clock_signal",
    requirement: "Clock/signal null-sector row for the same branch intake.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "null_sector_record.birefringence",
    requirement: "Birefringence null-sector row for the same branch intake.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "null_sector_record.photon_dispersion",
    requirement: "Photon-dispersion null-sector row for the same branch intake.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "null_sector_record.preferred_frame",
    requirement: "Preferred-frame null-sector row for the same branch intake.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "null_sector_record.directional_tensor",
    requirement: "Directional-tensor null-sector row for the same branch intake.",
    failureCode: "finite_branch_evidence_missing",
  },
  {
    path: "null_sector_record.transport",
    requirement: "Transport-threshold null-sector row for the same branch intake.",
    failureCode: "finite_branch_evidence_missing",
  },
];

const SAME_ROW_BINDING_KEYS = [
  "row_id",
  "pressure_row_id",
  "retained_pressure_row_id",
  "record_row_id",
  "same_row_id",
  "row_ref",
  "pressure_row_ref",
  "retained_pressure_row_ref",
  "same_row_ref",
  "source_ref",
  "source_path",
  "record_ref",
];

function parseArgs(argv) {
  const args = {
    input: null,
    out: null,
    validate: null,
    pretty: false,
    printContract: false,
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
    } else if (arg === "--validate") {
      args.validate = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--print-contract") {
      args.printContract = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/mass-map/pressure-row-branch-intake-report.mjs [options]

Options:
  --input PATH       Candidate retained pressure-row intake JSON.
  --validate PATH    Validate an emitted pressure-row branch-intake report.
  --print-contract   Print the required retained pressure-row intake fields.
  --out PATH         Write JSON output to a file instead of stdout.
  --pretty           Pretty-print JSON output.
  --help             Show this help.

This is a fail-closed priority-side checker for pressure-row branch intake. It
does not fit pressure coefficients and does not promote empirical or toy rows.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function getPath(value, pathExpression) {
  return pathExpression.split(".").reduce((cursor, key) => cursor?.[key], value);
}

function present(value) {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === "string") {
    return value.trim() !== "";
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (isObject(value)) {
    return Object.keys(value).length > 0;
  }
  return true;
}

function acceptedStatus(value, acceptedValues) {
  if (!acceptedValues) {
    return present(value);
  }
  return acceptedValues.includes(value);
}

function bindingValue(value) {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed === "" ? null : trimmed;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return null;
}

function directBindingEntries(value, fieldPath) {
  if (!isObject(value)) {
    return [];
  }
  return SAME_ROW_BINDING_KEYS.flatMap((key) => {
    const normalized = bindingValue(value[key]);
    return normalized === null
      ? []
      : [
          {
            path: fieldPath,
            binding_key: key,
            value: normalized,
          },
        ];
  });
}

function evaluateSameRowBinding(candidate) {
  const entries = REQUIRED_FIELDS.flatMap((field) =>
    directBindingEntries(getPath(candidate, field.path), field.path)
  );
  const entriesByKey = new Map();

  for (const entry of entries) {
    const valueToPaths = entriesByKey.get(entry.binding_key) ?? new Map();
    const paths = valueToPaths.get(entry.value) ?? new Set();
    paths.add(entry.path);
    valueToPaths.set(entry.value, paths);
    entriesByKey.set(entry.binding_key, valueToPaths);
  }

  const bindingGroups = [...entriesByKey.entries()]
    .map(([bindingKey, valueToPaths]) => ({
      binding_key: bindingKey,
      values: [...valueToPaths.keys()].sort(),
      paths_by_value: Object.fromEntries(
        [...valueToPaths.entries()]
          .sort(([left], [right]) => left.localeCompare(right))
          .map(([value, paths]) => [value, [...paths].sort()])
      ),
    }))
    .sort((left, right) => left.binding_key.localeCompare(right.binding_key));
  const conflictingBindings = bindingGroups.filter((group) => group.values.length > 1);

  return {
    rule:
      "Every declared row or source binding on required pressure-row fields must resolve to one retained pressure row.",
    checked_binding_keys: SAME_ROW_BINDING_KEYS,
    binding_groups: bindingGroups,
    conflicting_bindings: conflictingBindings,
    pass: conflictingBindings.length === 0,
    failure_code: conflictingBindings.length === 0 ? null : "finite_branch_evidence_missing",
  };
}

function contract() {
  return {
    schema: "pressure_row_branch_intake_contract/v0",
    purpose:
      "Minimum same-row retained pressure object before pressure coefficients may be treated as branch-derived.",
    required_fields: REQUIRED_FIELDS.map(({ path: fieldPath, requirement, failureCode, acceptedValues }) => ({
      path: fieldPath,
      requirement,
      failure_code: failureCode,
      accepted_values: acceptedValues ?? null,
    })),
    authorization_boundary: {
      branch_derived_pressure_response_requires_all_fields: true,
      branch_derived_pressure_response_requires_same_row_binding: true,
      cross_row_bundle_authorized_by_this_contract: false,
      empirical_mass_response_authorized_by_this_contract: false,
      toy_or_material_replay_authorized_by_this_contract: false,
      observer_or_export_readiness_authorized_by_this_contract: false,
    },
  };
}

function evaluateField(candidate, field) {
  const value = getPath(candidate, field.path);
  const pass = acceptedStatus(value, field.acceptedValues);
  return {
    path: field.path,
    requirement: field.requirement,
    present: present(value),
    pass,
    failure_code: pass ? null : field.failureCode,
  };
}

export function buildReport(candidate, options = {}) {
  if (!isObject(candidate)) {
    throw new Error("Candidate pressure-row intake must be a JSON object.");
  }

  const fieldResults = REQUIRED_FIELDS.map((field) => evaluateField(candidate, field));
  const failedFields = fieldResults.filter((field) => !field.pass);
  const sameRowBindingEvidence = evaluateSameRowBinding(candidate);
  const sameRowBinding = failedFields.length === 0 && sameRowBindingEvidence.pass;
  const firstFailure = failedFields[0]?.failure_code ?? sameRowBindingEvidence.failure_code;
  const accepted = sameRowBinding;
  const missingOrRejectedFields = failedFields.map((field) => field.path);
  if (!sameRowBindingEvidence.pass) {
    missingOrRejectedFields.push("same_row_binding");
  }

  return {
    schema: "pressure_row_branch_intake_report/v0",
    source_ref: options.sourceRef ?? candidate.source_ref ?? null,
    row_id: candidate.row_id ?? candidate.id ?? "pressure-row-intake-candidate",
    provider_source_status: candidate.provider_source_status ?? null,
    target_status: candidate.target_status ?? null,
    provider_target: candidate.provider_target ?? null,
    same_row_binding: sameRowBinding,
    same_row_binding_evidence: sameRowBindingEvidence,
    branch_intake_verdict: accepted ? "accepted_retained_pressure_row" : "finite_branch_evidence_missing",
    first_failure: firstFailure,
    missing_or_rejected_fields: missingOrRejectedFields,
    field_results: fieldResults,
    source_frontier: candidate.branch_source_frontier ?? null,
    source_ownership: candidate.source_ownership ?? null,
    authorization: {
      branch_derived_pressure_response: accepted,
      empirical_mass_response: false,
      retained_branch_claim: false,
      observer_export: false,
      export_readiness: false,
    },
  };
}

export function validationErrors(report) {
  const errors = [];
  if (!isObject(report)) {
    return ["report must be an object"];
  }
  if (report.schema !== "pressure_row_branch_intake_report/v0") {
    errors.push("schema must be pressure_row_branch_intake_report/v0");
  }
  if (typeof report.row_id !== "string" || report.row_id.trim() === "") {
    errors.push("row_id must be a nonempty string");
  }
  if (!["accepted_retained_pressure_row", "finite_branch_evidence_missing"].includes(report.branch_intake_verdict)) {
    errors.push("branch_intake_verdict is not recognized");
  }
  if (report.branch_intake_verdict === "accepted_retained_pressure_row" && report.first_failure !== null) {
    errors.push("accepted reports must not carry first_failure");
  }
  if (report.branch_intake_verdict === "finite_branch_evidence_missing" && typeof report.first_failure !== "string") {
    errors.push("blocked reports must carry first_failure");
  }
  if (report.branch_intake_verdict === "accepted_retained_pressure_row" && report.same_row_binding !== true) {
    errors.push("accepted reports must carry same_row_binding");
  }
  if (report.branch_intake_verdict === "finite_branch_evidence_missing" && report.same_row_binding !== false) {
    errors.push("blocked reports must not carry same_row_binding");
  }
  if (!isObject(report.same_row_binding_evidence)) {
    errors.push("same_row_binding_evidence must be an object");
  }
  if (!Array.isArray(report.field_results)) {
    errors.push("field_results must be an array");
  }
  if (!isObject(report.authorization)) {
    errors.push("authorization must be an object");
  }
  if (
    report.branch_intake_verdict === "finite_branch_evidence_missing" &&
    report.authorization?.branch_derived_pressure_response !== false
  ) {
    errors.push("blocked reports must not authorize branch_derived_pressure_response");
  }
  if (
    report.branch_intake_verdict === "accepted_retained_pressure_row" &&
    report.authorization?.branch_derived_pressure_response !== true
  ) {
    errors.push("accepted reports must authorize branch_derived_pressure_response");
  }
  if (report.authorization?.empirical_mass_response !== false) {
    errors.push("empirical_mass_response must remain false");
  }
  if (report.authorization?.retained_branch_claim !== false) {
    errors.push("retained_branch_claim must remain false");
  }
  if (report.authorization?.observer_export !== false) {
    errors.push("observer_export must remain false");
  }
  if (report.authorization?.export_readiness !== false) {
    errors.push("export_readiness must remain false");
  }
  return errors;
}

function writeOutput(value, args) {
  const body = `${JSON.stringify(value, null, args.pretty ? 2 : 0)}\n`;
  if (args.out) {
    fs.mkdirSync(path.dirname(args.out), { recursive: true });
    fs.writeFileSync(args.out, body);
  } else {
    process.stdout.write(body);
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  if (args.printContract) {
    writeOutput(contract(), args);
    return;
  }
  if (args.validate) {
    const report = readJson(args.validate);
    const errors = validationErrors(report);
    writeOutput(
      {
        valid: errors.length === 0,
        errors,
        row_id: report.row_id ?? null,
        branch_intake_verdict: report.branch_intake_verdict ?? null,
        first_failure: report.first_failure ?? null,
      },
      args,
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  if (!args.input) {
    throw new Error("--input is required unless --validate or --print-contract is used.");
  }
  const candidate = readJson(args.input);
  writeOutput(buildReport(candidate, { sourceRef: args.input }), args);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
