#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const OUTPUT_SCHEMA = "aaa-equation-map-same-branch-chart-identity-check/v1";
const EQ02_04_SOURCE_SCHEMA =
  "aaa-equation-map-eq02-04-invariant-cell-coframe-source/v1";
const RETAINED_GEOMETRY_EVIDENCE_SCHEMA =
  "aaa-equation-map-eq02-04-retained-geometry-source/v1";
const RETAINED_GEOMETRY_PROVENANCE_SCHEMA =
  "aaa-equation-map-eq02-04-retained-geometry-provenance/v1";
const INPUT_SCHEMA_PREFIX = "aaa-tri-binary-frequency-candidate-solver-report";
const RETAINED_DOMAIN_SCHEMA_PREFIX =
  "aaa-equation-map-same-branch-retained-domain-packet";
const SOURCE_AUDIT_PATH =
  "frequencyTripletSearch.equalFrequencyEnergyRadiusAudit";
const TARGET_ROW = "same_branch_chart_identity";
const ACCEPTED_STATUSES = new Set(["accepted", "populated", "passed"]);
const RETAINED_EVIDENCE_DISCLAIMER_PATTERN =
  /\b(not evidence|not retained evidence|not retained geometry evidence|score-neutral|negative control|attempt|toy|probe|mock|shell)\b/;
const RETAINED_PROVENANCE_DISCLAIMER_PATTERN =
  /\b(not evidence|not retained evidence|not retained geometry evidence|score-neutral|negative control|attempt|toy|probe|mock|shell|synthetic|fixture)\b/;
const RETAINED_ROW_SET_ID = "S_eq";
const SUPPORT_KINDS = new Set([
  "finite_event",
  "retained_event",
  "positive_width_domain",
]);
const ZERO_TOLERANCE = 1e-12;
const RETAINED_IDENTITY_REQUIREMENTS = [
  {
    id: "raw_labeled_rows_preserved_on_retained_history",
    source: (packet) => packet.rowBindings?.raw_labeled_rows_preserved_on_retained_history,
  },
  {
    id: "six_body_polarity_neutral_inventory_preserved",
    source: (packet) => packet.rowBindings?.six_body_polarity_neutral_inventory_preserved,
  },
  {
    id: "role_map_selected_or_quotient_policy_declared",
    source: (packet) => packet.rowBindings?.role_map_selected_or_quotient_policy_declared,
  },
  {
    id: "shared_retained_event_or_positive_width_domain",
    source: (packet) => packet.domain,
    support: true,
  },
  {
    id: "path_history_rows_bound_to_S_eq",
    source: (packet) => packet.rowBindings?.path_history_rows_bound_to_S_eq,
  },
  {
    id: "causal_root_ledger_rows_bound_to_S_eq",
    source: (packet) => packet.rowBindings?.causal_root_ledger_rows_bound_to_S_eq,
  },
  {
    id: "wake_tail_rows_bound_to_S_eq",
    source: (packet) => packet.rowBindings?.wake_tail_rows_bound_to_S_eq,
  },
  {
    id: "energy_action_rows_bound_to_S_eq",
    source: (packet) => packet.rowBindings?.energy_action_rows_bound_to_S_eq,
  },
  {
    id: "momentum_and_angular_momentum_rows_bound_to_S_eq",
    source: (packet) => packet.rowBindings?.momentum_and_angular_momentum_rows_bound_to_S_eq,
  },
  {
    id: "phase_rows_bound_to_S_eq",
    source: (packet) => packet.rowBindings?.phase_rows_bound_to_S_eq,
  },
  {
    id: "retained_plane_orientation_rows_bound_to_S_eq",
    source: (packet) => packet.rowBindings?.retained_plane_orientation_rows_bound_to_S_eq,
  },
  {
    id: "response_center_and_group_velocity_rows_bound_to_S_eq",
    source: (packet) => packet.rowBindings?.response_center_and_group_velocity_rows_bound_to_S_eq,
  },
  {
    id: "Noether_sea_record_bound_to_S_eq",
    source: (packet) => packet.rowBindings?.Noether_sea_record_bound_to_S_eq,
  },
  {
    id: "binary_to_binary_phase_row_set_identity",
    source: (packet) => packet.rowBindings?.binary_to_binary_phase_row_set_identity,
  },
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
const report = readJson(inputPath);
const output = createOutput({ report, inputPath });
writeOutput(args, output);

if (args.requireAccepted && output.summary.status !== "accepted") {
  process.exitCode = 1;
}

function parseArgs(argv) {
  const parsed = {
    input: null,
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
  console.log(`Usage: node scripts/equation-mapping/check-same-branch-chart-identity.mjs --input PATH [options]

Options:
  --input PATH          Tri-binary solver report JSON or retained-domain packet.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-accepted    Exit nonzero unless same-branch identity is accepted.
  --help                Show this help.

This checker consumes either ${SOURCE_AUDIT_PATH} from a tri-binary solver
report or a direct retained-domain packet for S_eq. Current proxy evidence and
attempt rows never count as accepted retained ${TARGET_ROW} evidence.`);
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

function createOutput({ report, inputPath }) {
  if (isRetainedDomainPacket(report)) {
    return createRetainedDomainOutput({ packet: report, inputPath });
  }
  return createSolverReportOutput({ report, inputPath });
}

function createSolverReportOutput({ report, inputPath }) {
  const audit = report.frequencyTripletSearch?.equalFrequencyEnergyRadiusAudit ?? null;
  const scaffold = audit?.retainedRowSetScaffold ?? null;
  const witness = audit?.retainedRowSetIdentityStructuralWitnessAudit ?? null;
  const candidateRows =
    report.frequencyTripletSearch?.candidateSetReview?.rows ?? [];
  const accepted =
    scaffold?.retainedRowSetIdentityPass === true &&
    witness?.retainedRowSetIdentityPass === true;
  const currentProxyPopulated =
    scaffold?.currentProxyEvidencePopulated === true ||
    numberOrZero(scaffold?.currentProxyEvidencePopulatedCount) > 0 ||
    witness?.currentStructuralWitnessPass === true;
  const missingRetainedInputs = uniqueStrings([
    ...(scaffold?.blockingRequirementIds ?? []),
    ...(witness?.firstMissingRetainedIdentityInputs ?? []),
  ]);
  const status = !audit
    ? "blocked_missing_equal_frequency_audit"
    : accepted
      ? "accepted"
      : currentProxyPopulated
        ? "blocked_current_proxy_only"
        : "blocked_missing_current_proxy_evidence";

  return {
    schema: OUTPUT_SCHEMA,
    generatedAt: new Date().toISOString(),
    input: {
      path: inputPath,
      kind: "tri_binary_solver_report",
      schema: report.schema ?? null,
      schemaOk:
        typeof report.schema === "string" &&
        report.schema.startsWith(INPUT_SCHEMA_PREFIX),
      sourceAuditPath: SOURCE_AUDIT_PATH,
    },
    target: {
      row: TARGET_ROW,
      retainedRowSetId:
        scaffold?.retainedRowSetId ??
        witness?.retainedRowSetId ??
        firstDefined(candidateRows.map((row) => row.retainedRowSetId)) ??
        null,
      claimLevel:
        "acceptance extractor only; current proxy row-set evidence is not score evidence",
    },
    summary: {
      status,
      scoreDecision: "no_score_increase",
      retainedBranchClaim: audit?.retainedBranchClaim === true,
      retainedRowSetIdentityPass: accepted,
      currentProxyEvidencePopulatedCount:
        scaffold?.currentProxyEvidencePopulatedCount ?? null,
      currentProxyEvidenceSourceCount:
        scaffold?.currentProxyEvidenceSourceCount ?? null,
      retainedAcceptancePassCount:
        scaffold?.retainedAcceptancePassCount ?? null,
      structuralWitnessCurrentPass:
        witness?.currentStructuralWitnessPass ?? null,
      structuralWitnessCurrentPopulatedCount:
        witness?.currentStructuralWitnessPopulatedCount ?? null,
      structuralWitnessSourceCount: witness?.sourceCount ?? null,
      structuralWitnessRetainedPass:
        witness?.retainedRowSetIdentityPass ?? null,
      acceptedRetainedIdentityRequirementCount:
        witness?.acceptedRetainedIdentityRequirementCount ?? null,
      retainedIdentityRequirementCount:
        witness?.retainedIdentityRequirementCount ?? null,
      missingRetainedInputs,
      nextBlocker: nextBlockerForRetainedIdentity({
        status,
        missingRetainedInputs,
        missingDomainWitnesses: [],
      }),
    },
    scaffold: summarizeScaffold(scaffold),
    structuralWitness: summarizeWitness(witness),
    candidateRows: summarizeCandidateRows(candidateRows),
  };
}

function createRetainedDomainOutput({ packet, inputPath }) {
  const retainedRowSetId = packet.retainedRowSetId ?? packet.rowSetId ?? null;
  const domainId = packet.domain?.id ?? null;
  const commonCarrierId = retainedDomainCommonCarrierId(packet);
  const targetRow = packet.targetRow ?? TARGET_ROW;
  const targetRowPass = targetRow === TARGET_ROW;
  const retainedRowSetPass = retainedRowSetId === RETAINED_ROW_SET_ID;
  const requirementChecks = RETAINED_IDENTITY_REQUIREMENTS.map((requirement) =>
    evaluateRetainedRequirement({
      requirement,
      packet,
      retainedRowSetId,
      domainId,
      commonCarrierId,
    }),
  );
  const acceptedRequirementCount = requirementChecks.filter(
    (check) => check.accepted,
  ).length;
  const missingRetainedInputs = requirementChecks
    .filter((check) => !check.accepted)
    .map((check) => check.id);
  const splitWitness = evaluateZeroWitness(
    packet.witnesses?.split_witness_zero ?? packet.split_witness_zero,
    { commonCarrierId, domainId },
  );
  const retuneWitness = evaluateZeroWitness(
    packet.witnesses?.retune_witness_zero ?? packet.retune_witness_zero,
    { commonCarrierId, domainId },
  );
  const overlapPreimage = evaluateOverlapPreimage(
    packet.overlapPreimageAudit ??
      packet.witnesses?.overlap_preimage_identity,
    { commonCarrierId, domainId },
  );
  const fiberProductCarrier = evaluateFiberProductCarrier({
    packet,
    commonCarrierId,
  });
  const missingDomainWitnesses = [
    splitWitness.accepted ? null : "split_witness_zero",
    retuneWitness.accepted ? null : "retune_witness_zero",
    overlapPreimage.accepted ? null : "overlap_preimage_identity",
  ].filter(Boolean);
  const retainedRequirementsPass =
    acceptedRequirementCount === RETAINED_IDENTITY_REQUIREMENTS.length;
  const domainWitnessPass = missingDomainWitnesses.length === 0;
  const accepted =
    targetRowPass &&
    retainedRowSetPass &&
    retainedRequirementsPass &&
    domainWitnessPass &&
    fiberProductCarrier.accepted;
  const hasAttemptRows = requirementChecks.some((check) => check.present);
  const status = accepted
    ? "accepted"
    : !targetRowPass
      ? "blocked_invalid_retained_domain_packet"
      : !retainedRowSetPass
        ? "blocked_wrong_retained_row_set"
        : missingRetainedInputs.includes(
              "shared_retained_event_or_positive_width_domain",
            )
          ? "blocked_missing_retained_event_or_domain"
          : retainedRequirementsPass && !domainWitnessPass
            ? "blocked_split_or_retune_witness"
            : retainedRequirementsPass &&
                domainWitnessPass &&
                !fiberProductCarrier.accepted
              ? "blocked_fiber_product_carrier"
              : hasAttemptRows
                ? "blocked_retained_domain_rows_missing"
                : "blocked_missing_retained_domain_rows";
  const nextBlocker = nextBlockerForRetainedIdentity({
    status,
    missingRetainedInputs,
    missingDomainWitnesses,
  });
  const nextBlockerDetails = retainedDomainNextBlockerDetails({
    nextBlocker,
    requirementChecks,
    splitWitness,
    retuneWitness,
    overlapPreimage,
    fiberProductCarrier,
  });

  return {
    schema: OUTPUT_SCHEMA,
    generatedAt: new Date().toISOString(),
    input: {
      path: inputPath,
      kind: "retained_domain_packet",
      schema: packet.schema ?? null,
      schemaOk: true,
      sourceAuditPath: null,
    },
    target: {
      row: targetRow,
      retainedRowSetId,
      claimLevel:
        "direct retained-domain acceptance extractor; attempt rows and current proxies are not score evidence",
    },
    summary: {
      status,
      scoreDecision: "no_score_increase",
      retainedBranchClaim: accepted,
      retainedRowSetIdentityPass: accepted,
      currentProxyEvidencePopulatedCount: null,
      currentProxyEvidenceSourceCount: null,
      retainedAcceptancePassCount: acceptedRequirementCount,
      structuralWitnessCurrentPass: null,
      structuralWitnessCurrentPopulatedCount: null,
      structuralWitnessSourceCount: null,
      structuralWitnessRetainedPass: domainWitnessPass,
      acceptedRetainedIdentityRequirementCount: acceptedRequirementCount,
      retainedIdentityRequirementCount: RETAINED_IDENTITY_REQUIREMENTS.length,
      targetRowPass,
      retainedRowSetPass,
      missingRetainedInputs,
      retainedRequirementStatuses: Object.fromEntries(
        requirementChecks.map((check) => [check.id, check.status]),
      ),
      retainedRequirementReasons: Object.fromEntries(
        requirementChecks.map((check) => [check.id, check.reason]),
      ),
      commonCarrierId,
      fiberProductCarrierPass: fiberProductCarrier.accepted,
      fiberProductCarrierReason: fiberProductCarrier.reason,
      fiberProductLegStatuses: fiberProductCarrier.legStatuses,
      missingDomainWitnesses,
      domainWitnessStatuses: {
        split_witness_zero: splitWitness.status,
        retune_witness_zero: retuneWitness.status,
        overlap_preimage_identity: overlapPreimage.status,
      },
      domainWitnessReasons: {
        split_witness_zero: splitWitness.reason,
        retune_witness_zero: retuneWitness.reason,
        overlap_preimage_identity: overlapPreimage.reason,
      },
      nextBlocker,
      nextBlockerDetails,
      supportKind: packet.domain?.kind ?? null,
      supportId: domainId,
      splitWitnessPass: splitWitness.accepted,
      retuneWitnessPass: retuneWitness.accepted,
      overlapPreimagePass: overlapPreimage.accepted,
    },
    retainedDomain: summarizeRetainedDomain(packet),
    requirementChecks,
    domainWitnesses: {
      splitWitness,
      retuneWitness,
      overlapPreimage,
    },
  };
}

function summarizeOutput(output) {
  return {
    schema: output.schema,
    generatedAt: output.generatedAt,
    input: output.input,
    target: output.target,
    summary: output.summary,
  };
}

function retainedDomainNextBlockerDetails({
  nextBlocker,
  requirementChecks,
  splitWitness,
  retuneWitness,
  overlapPreimage,
  fiberProductCarrier,
}) {
  if (!nextBlocker) {
    return null;
  }
  const prefix = "missing_accepted_";
  const blockerId = nextBlocker.startsWith(prefix)
    ? nextBlocker.slice(prefix.length)
    : nextBlocker;
  const requirement = requirementChecks.find((check) => check.id === blockerId);
  if (requirement) {
    const sourceEvidence = sourceEvidenceReferenceStatus(requirement.sourcePath);
    return {
      id: requirement.id,
      status: requirement.status,
      reason: requirement.reason,
      rowId: requirement.rowId,
      sourcePath: requirement.sourcePath,
      sourceReferenceExists: sourceEvidence.sourceReferenceExists,
      sourceEvidenceReferenceExists: sourceEvidence.accepted,
      sourceEvidenceReason: sourceEvidence.reason,
      sourceEvidenceProducerStatus: sourceEvidence.producerStatus ?? null,
      sourceEvidenceProducerNextBlocker: sourceEvidence.producerNextBlocker ?? null,
    };
  }
  const witnesses = {
    split_witness_zero: splitWitness,
    retune_witness_zero: retuneWitness,
    overlap_preimage_identity: overlapPreimage,
  };
  const witness = witnesses[blockerId];
  if (witness) {
    const sourceEvidence = sourceEvidenceReferenceStatus(witness.sourcePath);
    return {
      id: blockerId,
      status: witness.status,
      reason: witness.reason,
      residual: witness.residual ?? null,
      sourcePath: witness.sourcePath ?? null,
      sourceReferenceExists: sourceEvidence.sourceReferenceExists,
      sourceEvidenceReferenceExists: sourceEvidence.accepted,
      sourceEvidenceReason: sourceEvidence.reason,
      sourceEvidenceProducerStatus: sourceEvidence.producerStatus ?? null,
      sourceEvidenceProducerNextBlocker: sourceEvidence.producerNextBlocker ?? null,
    };
  }
  if (blockerId === "blocked_fiber_product_carrier") {
    return {
      id: blockerId,
      reason: fiberProductCarrier.reason,
      legStatuses: fiberProductCarrier.legStatuses,
    };
  }
  return {
    id: blockerId,
    reason: nextBlocker,
  };
}

function isRetainedDomainPacket(report) {
  return (
    typeof report.schema === "string" &&
    report.schema.startsWith(RETAINED_DOMAIN_SCHEMA_PREFIX)
  );
}

function evaluateRetainedRequirement({
  requirement,
  packet,
  retainedRowSetId,
  domainId,
  commonCarrierId,
}) {
  const row = requirement.source(packet);
  const rowCheck = requirement.support
    ? evaluateDomainSupport(row, { commonCarrierId })
    : evaluateRetainedRowBinding({
        row,
        retainedRowSetId,
        domainId,
        commonCarrierId,
      });
  return {
    id: requirement.id,
    present: row !== undefined && row !== null,
    accepted: rowCheck.accepted,
    status: rowCheck.status,
    reason: rowCheck.reason,
    rowId: row?.rowId ?? null,
    sourcePath: row?.sourcePath ?? row?.source ?? null,
  };
}

function evaluateDomainSupport(row, { commonCarrierId } = {}) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return { accepted: false, status: "missing", reason: "missing_support" };
  }
  if (!SUPPORT_KINDS.has(row.kind)) {
    return {
      accepted: false,
      status: row.status ?? "declared",
      reason: "invalid_or_missing_support_kind",
    };
  }
  if (!ACCEPTED_STATUSES.has(row.status)) {
    return {
      accepted: false,
      status: row.status ?? "declared",
      reason: "support_not_accepted",
    };
  }
  if (!concreteString(row.id) || !concreteString(row.rowId)) {
    return {
      accepted: false,
      status: row.status,
      reason: "support_identity_not_concrete",
    };
  }
  if (!concreteString(row.sourcePath ?? row.source)) {
    return {
      accepted: false,
      status: row.status,
      reason: "support_source_not_concrete",
    };
  }
  if (!sourceReferenceExists(row.sourcePath) && !sourceReferenceExists(row.source)) {
    return {
      accepted: false,
      status: row.status,
      reason: "support_source_not_found",
    };
  }
  if (
    !sourceEvidenceReferenceExists(row.sourcePath) &&
    !sourceEvidenceReferenceExists(row.source)
  ) {
    return {
      accepted: false,
      status: row.status,
      reason: "accepted_without_evidence_source",
    };
  }
  if (!carrierMatches(row, commonCarrierId)) {
    return {
      accepted: false,
      status: row.status,
      reason: "common_carrier_mismatch",
    };
  }
  return { accepted: true, status: row.status, reason: "accepted" };
}

function evaluateRetainedRowBinding({
  row,
  retainedRowSetId,
  domainId,
  commonCarrierId,
}) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return { accepted: false, status: "missing", reason: "missing_row" };
  }
  const status = row.status ?? "declared";
  if (!ACCEPTED_STATUSES.has(status)) {
    return { accepted: false, status, reason: "row_not_accepted" };
  }
  if (
    !concreteString(row.rowId) ||
    !concreteString(row.sourcePath ?? row.source)
  ) {
    return { accepted: false, status, reason: "row_reference_not_concrete" };
  }
  if (!sourceReferenceExists(row.sourcePath) && !sourceReferenceExists(row.source)) {
    return { accepted: false, status, reason: "row_source_not_found" };
  }
  if (
    !sourceEvidenceReferenceExists(row.sourcePath) &&
    !sourceEvidenceReferenceExists(row.source)
  ) {
    return { accepted: false, status, reason: "accepted_without_evidence_source" };
  }
  if (retainedRowSetId && row.retainedRowSetId !== retainedRowSetId) {
    return { accepted: false, status, reason: "retained_row_set_mismatch" };
  }
  const rowDomainId = row.domainId ?? row.supportId ?? row.eventId ?? null;
  if (domainId && rowDomainId !== domainId) {
    return { accepted: false, status, reason: "support_mismatch" };
  }
  if (!carrierMatches(row, commonCarrierId)) {
    return { accepted: false, status, reason: "common_carrier_mismatch" };
  }
  return { accepted: true, status, reason: "accepted" };
}

function evaluateZeroWitness(witness, { commonCarrierId, domainId } = {}) {
  if (!witness || typeof witness !== "object" || Array.isArray(witness)) {
    return { accepted: false, status: "missing", reason: "missing_witness" };
  }
  const status = witness.status ?? "declared";
  const base = {
    rowId: witness.rowId ?? null,
    sourcePath: witness.sourcePath ?? witness.source ?? null,
  };
  if (!ACCEPTED_STATUSES.has(status)) {
    return { ...base, accepted: false, status, reason: "witness_not_accepted" };
  }
  if (
    !concreteString(witness.rowId) ||
    !concreteString(witness.sourcePath ?? witness.source)
  ) {
    return {
      ...base,
      accepted: false,
      status,
      reason: "witness_reference_not_concrete",
    };
  }
  if (
    !sourceReferenceExists(witness.sourcePath) &&
    !sourceReferenceExists(witness.source)
  ) {
    return { ...base, accepted: false, status, reason: "witness_source_not_found" };
  }
  if (
    !sourceEvidenceReferenceExists(witness.sourcePath) &&
    !sourceEvidenceReferenceExists(witness.source)
  ) {
    return {
      ...base,
      accepted: false,
      status,
      reason: "accepted_without_evidence_source",
    };
  }
  const residual = Number(witness.residual ?? witness.value ?? 0);
  if (!Number.isFinite(residual) || Math.abs(residual) > ZERO_TOLERANCE) {
    return {
      ...base,
      accepted: false,
      status,
      reason: "witness_not_zero",
      residual,
    };
  }
  if (!witnessSupportMatches(witness, domainId)) {
    return { ...base, accepted: false, status, reason: "support_mismatch", residual };
  }
  if (!carrierMatches(witness, commonCarrierId)) {
    return {
      ...base,
      accepted: false,
      status,
      reason: "common_carrier_mismatch",
      residual,
    };
  }
  return { ...base, accepted: true, status, reason: "accepted", residual };
}

function evaluateOverlapPreimage(witness, { commonCarrierId, domainId } = {}) {
  if (!witness || typeof witness !== "object" || Array.isArray(witness)) {
    return { accepted: false, status: "missing", reason: "missing_witness" };
  }
  const status = witness.status ?? "declared";
  const base = {
    rowId: witness.rowId ?? null,
    sourcePath: witness.sourcePath ?? witness.source ?? null,
  };
  if (!ACCEPTED_STATUSES.has(status)) {
    return { ...base, accepted: false, status, reason: "witness_not_accepted" };
  }
  if (
    !concreteString(witness.rowId) ||
    !concreteString(witness.sourcePath ?? witness.source)
  ) {
    return {
      ...base,
      accepted: false,
      status,
      reason: "witness_reference_not_concrete",
    };
  }
  if (
    !sourceReferenceExists(witness.sourcePath) &&
    !sourceReferenceExists(witness.source)
  ) {
    return { ...base, accepted: false, status, reason: "witness_source_not_found" };
  }
  if (
    !sourceEvidenceReferenceExists(witness.sourcePath) &&
    !sourceEvidenceReferenceExists(witness.source)
  ) {
    return {
      ...base,
      accepted: false,
      status,
      reason: "accepted_without_evidence_source",
    };
  }
  if (witness.consistent !== true) {
    return {
      ...base,
      accepted: false,
      status,
      reason: "overlap_preimage_not_consistent",
    };
  }
  if (!witnessSupportMatches(witness, domainId)) {
    return { ...base, accepted: false, status, reason: "support_mismatch" };
  }
  if (!carrierMatches(witness, commonCarrierId)) {
    return { ...base, accepted: false, status, reason: "common_carrier_mismatch" };
  }
  return { ...base, accepted: true, status, reason: "accepted" };
}

function retainedDomainCommonCarrierId(packet) {
  return (
    packet.commonCarrierId ??
    packet.commonCarrier?.id ??
    packet.carrier?.commonCarrierId ??
    packet.domain?.commonCarrierId ??
    null
  );
}

function evaluateFiberProductCarrier({ packet, commonCarrierId }) {
  const legs = [
    ["domain", packet.domain],
    ...Object.entries(packet.rowBindings ?? {}),
    ...Object.entries(packet.witnesses ?? {}),
  ];
  const legStatuses = Object.fromEntries(
    legs.map(([id, value]) => [id, fiberProductLegStatus(value, commonCarrierId)]),
  );
  if (!concreteString(commonCarrierId)) {
    return {
      accepted: false,
      reason: "missing_common_carrier_id",
      legStatuses,
    };
  }
  const firstMismatch = Object.entries(legStatuses).find(
    ([, status]) => status !== "matched",
  );
  return {
    accepted: !firstMismatch,
    reason: firstMismatch
      ? `carrier_leg_${firstMismatch[0]}_${firstMismatch[1]}`
      : "accepted",
    legStatuses,
  };
}

function fiberProductLegStatus(value, commonCarrierId) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return "missing";
  }
  if (!concreteString(commonCarrierId)) {
    return "common_carrier_not_declared";
  }
  return value.commonCarrierId === commonCarrierId ? "matched" : "mismatch";
}

function carrierMatches(row, commonCarrierId) {
  return concreteString(commonCarrierId) && row.commonCarrierId === commonCarrierId;
}

function witnessSupportMatches(witness, domainId) {
  if (!domainId) {
    return true;
  }
  const witnessDomainId =
    witness.domainId ?? witness.supportId ?? witness.eventId ?? null;
  return witnessDomainId === domainId;
}

function summarizeRetainedDomain(packet) {
  return {
    schema: packet.schema ?? null,
    claimLevel: packet.claimLevel ?? null,
    retainedRowSetId: packet.retainedRowSetId ?? packet.rowSetId ?? null,
    domain: packet.domain
      ? {
          id: packet.domain.id ?? null,
          kind: packet.domain.kind ?? null,
          status: packet.domain.status ?? null,
          rowId: packet.domain.rowId ?? null,
          sourcePath: packet.domain.sourcePath ?? packet.domain.source ?? null,
        }
      : null,
  };
}

function summarizeScaffold(scaffold) {
  if (!scaffold) {
    return null;
  }
  return {
    schema: scaffold.schema ?? null,
    status: scaffold.status ?? null,
    claimLevel: scaffold.claimLevel ?? null,
    retainedRowSetId: scaffold.retainedRowSetId ?? null,
    canonicalFamily: scaffold.canonicalFamily ?? null,
    currentProxyEvidenceSources:
      scaffold.currentProxyEvidenceSources?.map((source) => ({
        id: source.id ?? null,
        residualComponent: source.residualComponent ?? null,
        schema: source.schema ?? null,
        status: source.status ?? null,
        currentEvidencePopulated: source.currentEvidencePopulated ?? null,
        retainedAcceptancePass: source.retainedAcceptancePass ?? null,
      })) ?? [],
    requiredRowGroups: scaffold.requiredRowGroups ?? [],
    blockingRequirementIds: scaffold.blockingRequirementIds ?? [],
    retainedRowSetIdentityPass:
      scaffold.retainedRowSetIdentityPass ?? null,
    retainedBranchClaim: scaffold.retainedBranchClaim ?? null,
  };
}

function summarizeWitness(witness) {
  if (!witness) {
    return null;
  }
  return {
    schema: witness.schema ?? null,
    status: witness.status ?? null,
    claimLevel: witness.claimLevel ?? null,
    retainedRowSetId: witness.retainedRowSetId ?? null,
    canonicalFamily: witness.canonicalFamily ?? null,
    sourceCount: witness.sourceCount ?? null,
    rowSetIdentityCandidatePassCount:
      witness.rowSetIdentityCandidatePassCount ?? null,
    currentStructuralWitnessPopulatedCount:
      witness.currentStructuralWitnessPopulatedCount ?? null,
    currentStructuralWitnessPass:
      witness.currentStructuralWitnessPass ?? null,
    acceptedRetainedIdentityRequirementCount:
      witness.acceptedRetainedIdentityRequirementCount ?? null,
    retainedIdentityRequirementCount:
      witness.retainedIdentityRequirementCount ?? null,
    retainedRowSetIdentityPass:
      witness.retainedRowSetIdentityPass ?? null,
    firstMissingRetainedIdentityInputs:
      witness.firstMissingRetainedIdentityInputs ?? [],
  };
}

function summarizeCandidateRows(rows) {
  return rows
    .filter((row) => row && Object.hasOwn(row, "retainedRowSetIdentityPass"))
    .map((row) => ({
      familyId: row.familyId ?? null,
      familyRoleAssignedRelation: row.familyRoleAssignedRelation ?? null,
      retainedRowSetId: row.retainedRowSetId ?? null,
      retainedRowSetIdentityPass:
        row.retainedRowSetIdentityPass ?? null,
      retainedRowSetCurrentProxyEvidencePopulatedCount:
        row.retainedRowSetCurrentProxyEvidencePopulatedCount ?? null,
      retainedRowSetBlockingRequirementIds:
        row.retainedRowSetBlockingRequirementIds ?? [],
      retainedRowSetIdentityStructuralWitnessStatus:
        row.retainedRowSetIdentityStructuralWitnessStatus ?? null,
      retainedRowSetIdentityStructuralWitnessCurrentPass:
        row.retainedRowSetIdentityStructuralWitnessCurrentPass ?? null,
      retainedRowSetIdentityStructuralWitnessRetainedPass:
        row.retainedRowSetIdentityStructuralWitnessRetainedPass ?? null,
      retainedRowSetIdentityStructuralWitnessFirstMissingInputs:
        row.retainedRowSetIdentityStructuralWitnessFirstMissingInputs ?? [],
    }));
}

function firstDefined(values) {
  return values.find((value) => value !== undefined && value !== null);
}

function numberOrZero(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function uniqueStrings(values) {
  return [...new Set(values.filter((value) => typeof value === "string"))];
}

function nextBlockerForRetainedIdentity({
  status,
  missingRetainedInputs,
  missingDomainWitnesses,
}) {
  if (status === "accepted") {
    return null;
  }
  const firstRetainedInput = missingRetainedInputs[0];
  if (firstRetainedInput) {
    return `missing_accepted_${firstRetainedInput}`;
  }
  const firstWitness = missingDomainWitnesses[0];
  if (firstWitness) {
    return `missing_accepted_${firstWitness}`;
  }
  if (status === "blocked_missing_equal_frequency_audit") {
    return "missing_equal_frequency_energy_radius_audit";
  }
  return status;
}

function concreteString(value) {
  const text = typeof value === "string" ? value.trim() : "";
  const lowerText = text.toLowerCase();
  return (
    text !== "" &&
    text !== "..." &&
    !text.includes("<") &&
    !lowerText.includes("todo") &&
    !lowerText.includes("pending") &&
    !lowerText.includes("placeholder")
  );
}

function sourceClaimText(record) {
  return [
    record?.claimLevel,
    record?.claim,
    record?.description,
    ...(Array.isArray(record?.notes) ? record.notes : []),
  ]
    .filter((item) => typeof item === "string")
    .join(" ")
    .toLowerCase();
}

function sourceClaimDisclaimsRetainedEvidence(record) {
  return RETAINED_EVIDENCE_DISCLAIMER_PATTERN.test(sourceClaimText(record));
}

function sourceClaimDisclaimsRetainedProvenance(record) {
  return RETAINED_PROVENANCE_DISCLAIMER_PATTERN.test(sourceClaimText(record));
}

function collectStringValues(value) {
  if (typeof value === "string") {
    return [value];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item) => collectStringValues(item));
  }
  if (value && typeof value === "object") {
    return Object.values(value).flatMap((item) => collectStringValues(item));
  }
  return [];
}

function provenanceRecordDisclaimsRetainedGeometry(record) {
  const text = collectStringValues(record).join(" ").toLowerCase();
  return RETAINED_PROVENANCE_DISCLAIMER_PATTERN.test(text);
}

function sourceReferenceExists(value) {
  if (!concreteString(value)) {
    return false;
  }
  const resolvedPath = resolveSourcePath(value);
  if (isNonDurableSourcePath(resolvedPath)) {
    return false;
  }
  try {
    return fs.statSync(resolvedPath).isFile();
  } catch {
    return false;
  }
}

function sourceEvidenceReferenceExists(value) {
  return sourceEvidenceReferenceStatus(value).accepted;
}

function sourceEvidenceReferenceStatus(value) {
  if (!sourceReferenceExists(value)) {
    return {
      accepted: false,
      sourceReferenceExists: false,
      reason: "source_reference_not_found_or_not_durable",
    };
  }
  const resolvedPath = resolveSourcePath(value);
  if (!isEvidenceSourcePath(resolvedPath)) {
    return {
      accepted: false,
      sourceReferenceExists: true,
      reason: "source_path_not_evidence_path",
    };
  }
  const producerStatus = eq02_04SourceProducerStatus(resolvedPath);
  if (producerStatus.applies && !producerStatus.accepted) {
    return {
      accepted: false,
      sourceReferenceExists: true,
      reason: "source_report_not_producer_accepted",
      producerStatus: producerStatus.status,
      producerNextBlocker: producerStatus.nextBlocker,
    };
  }
  if (producerStatus.applies && producerStatus.accepted) {
    return {
      accepted: true,
      sourceReferenceExists: true,
      reason: "accepted_source_report",
      producerStatus: producerStatus.status,
      producerNextBlocker: producerStatus.nextBlocker,
    };
  }
  const recordStatus = retainedGeometryEvidenceRecordStatus(resolvedPath);
  if (!recordStatus.accepted) {
    return {
      accepted: false,
      sourceReferenceExists: true,
      reason: recordStatus.reason,
      producerStatus: null,
      producerNextBlocker: null,
      evidenceSchema: recordStatus.schema ?? null,
    };
  }
  return {
    accepted: true,
    sourceReferenceExists: true,
    reason: "accepted_retained_geometry_evidence",
    producerStatus: null,
    producerNextBlocker: null,
    evidenceSchema: recordStatus.schema ?? null,
  };
}

function retainedGeometryEvidenceRecordStatus(filePath) {
  if (path.extname(filePath) !== ".json") {
    return {
      accepted: false,
      reason: "source_evidence_json_required",
    };
  }
  let parsed;
  try {
    parsed = readJson(filePath);
  } catch (error) {
    return {
      accepted: false,
      reason: "source_evidence_json_invalid",
      detail: String(error?.message ?? error),
    };
  }
  if (sourceClaimDisclaimsRetainedEvidence(parsed)) {
    return {
      accepted: false,
      reason: "source_claim_disclaims_retained_evidence",
      schema: parsed.schema ?? null,
    };
  }
  if (parsed.schema !== RETAINED_GEOMETRY_EVIDENCE_SCHEMA) {
    return {
      accepted: false,
      reason: "source_schema_not_retained_geometry_evidence",
      schema: parsed.schema ?? null,
    };
  }
  if (!ACCEPTED_STATUSES.has(parsed.status)) {
    return {
      accepted: false,
      reason: "source_evidence_status_not_accepted",
      schema: parsed.schema ?? null,
    };
  }
  if (
    parsed.retainedRowSetId !== RETAINED_ROW_SET_ID ||
    !concreteString(parsed.commonCarrierId) ||
    !concreteString(parsed.domainId) ||
    !concreteString(parsed.supportId)
  ) {
    return {
      accepted: false,
      reason: "source_identity_incomplete",
      schema: parsed.schema ?? null,
    };
  }
  const payloadStatus = retainedGeometryEvidencePayloadStatus(parsed, filePath);
  if (!payloadStatus.accepted) {
    return {
      accepted: false,
      reason: payloadStatus.reason,
      schema: parsed.schema ?? null,
      details: payloadStatus.details,
    };
  }
  return {
    accepted: true,
    reason: "accepted_retained_geometry_evidence",
    schema: parsed.schema,
  };
}

function retainedGeometryEvidencePayloadStatus(source, filePath) {
  const geometry = source.retainedGeometry ?? source.geometry ?? {};
  const rawRows =
    geometry.rawLabeledRowsPreservedOnRetainedHistory ??
    source.rawLabeledRowsPreservedOnRetainedHistory ??
    {};
  const rawRowList = rawRows.rows ?? rawRows.rawRows ?? [];
  const invariantCell =
    geometry.positiveWidthInvariantCell ??
    source.positiveWidthInvariantCell ??
    source.invariantCell ??
    {};
  const refinementTrace =
    geometry.refinementTrace ??
    source.refinementTrace ??
    invariantCell.refinementTrace ??
    {};
  const payloadPresent =
    ACCEPTED_STATUSES.has(rawRows.status) &&
    Array.isArray(rawRowList) &&
    rawRowList.length > 0 &&
    ACCEPTED_STATUSES.has(invariantCell.status) &&
    ["B_N", "Sigma_N", "P_N", "K_P_N"].every((field) =>
      Boolean(invariantCell[field] ?? source[field]),
    ) &&
    ACCEPTED_STATUSES.has(refinementTrace.status) &&
    Array.isArray(refinementTrace.steps) &&
    refinementTrace.steps.length >= 3;
  if (!payloadPresent) {
    return {
      accepted: false,
      reason: "source_retained_geometry_payload_missing",
    };
  }
  const provenanceDetails = [
    sourceProvenanceDetail(
      "raw_labeled_rows_preserved_on_retained_history",
      rawRows.sourcePath ?? rawRows.source,
      filePath,
      source,
    ),
    ...["B_N", "Sigma_N", "P_N", "K_P_N"].map((field) => {
      const value = invariantCell[field] ?? source[field] ?? {};
      return sourceProvenanceDetail(
        field,
        value.sourcePath ?? value.source,
        filePath,
        source,
      );
    }),
    ...refinementTrace.steps.map((step, index) =>
      sourceProvenanceDetail(
        `refinement_step_${index}`,
        step?.sourcePath ?? step?.source,
        filePath,
        source,
      ),
    ),
  ];
  if (!provenanceDetails.every((detail) => detail.accepted)) {
    const failedReasons = [
      ...new Set(
        provenanceDetails
          .filter((detail) => !detail.accepted)
          .map((detail) => detail.reason)
          .filter(concreteString),
      ),
    ];
    return {
      accepted: false,
      reason:
        failedReasons.length === 1
          ? failedReasons[0]
          : "source_retained_geometry_provenance_missing",
      details: provenanceDetails,
    };
  }
  return {
    accepted: true,
    reason: "accepted_retained_geometry_evidence",
  };
}

function sourceProvenanceDetail(id, value, ownerPath, expectedIds) {
  const sourceReferenceFound = sourceReferenceExists(value);
  const resolvedPath = sourceReferenceFound ? resolveSourcePath(value) : null;
  const selfReference =
    resolvedPath !== null && resolvedPath === path.normalize(ownerPath);
  const evidenceSource =
    resolvedPath !== null && !selfReference && isEvidenceSourcePath(resolvedPath);
  const provenanceStatus =
    evidenceSource && resolvedPath !== null
      ? retainedGeometryProvenanceStatus(resolvedPath, id, expectedIds)
      : {
          accepted: false,
          reason: !sourceReferenceFound
            ? "source_provenance_reference_not_found_or_not_durable"
            : selfReference
              ? "source_provenance_path_is_owner_record"
              : "source_provenance_path_not_evidence_path",
        };
  return {
    id,
    sourcePath: value ?? null,
    sourceReferenceExists: sourceReferenceFound,
    sourceSelfReference: selfReference,
    sourceEvidenceReferenceExists: evidenceSource,
    sourceProvenanceReferenceExists: provenanceStatus.accepted,
    evidenceSchema: provenanceStatus.schema ?? null,
    reason: provenanceStatus.reason,
    accepted: provenanceStatus.accepted,
    details: provenanceStatus.details ?? null,
  };
}

function retainedGeometryProvenanceStatus(filePath, targetId, expectedIds) {
  if (path.extname(filePath) !== ".json") {
    return {
      accepted: false,
      reason: "source_provenance_json_required",
    };
  }
  let parsed;
  try {
    parsed = readJson(filePath);
  } catch (error) {
    return {
      accepted: false,
      reason: "source_provenance_json_invalid",
      detail: String(error?.message ?? error),
    };
  }
  if (parsed.schema !== RETAINED_GEOMETRY_PROVENANCE_SCHEMA) {
    return {
      accepted: false,
      reason: "source_provenance_schema_not_retained_geometry_provenance",
      schema: parsed.schema ?? null,
    };
  }
  if (!ACCEPTED_STATUSES.has(parsed.status)) {
    return {
      accepted: false,
      reason: "source_provenance_status_not_accepted",
      schema: parsed.schema ?? null,
    };
  }
  const identityChecks = {
    retainedRowSetId: parsed.retainedRowSetId === expectedIds?.retainedRowSetId,
    commonCarrierId: parsed.commonCarrierId === expectedIds?.commonCarrierId,
    domainId: parsed.domainId === expectedIds?.domainId,
    supportId: parsed.supportId === expectedIds?.supportId,
  };
  if (!Object.values(identityChecks).every(Boolean)) {
    return {
      accepted: false,
      reason: "source_provenance_identity_mismatch",
      schema: parsed.schema ?? null,
      details: identityChecks,
    };
  }
  if (sourceClaimDisclaimsRetainedProvenance(parsed)) {
    return {
      accepted: false,
      reason: "source_provenance_payload_disclaimed_or_synthetic",
      schema: parsed.schema ?? null,
      details: { targetId },
    };
  }
  const records =
    parsed.provenanceRecords ??
    parsed.retainedGeometryProvenance?.records ??
    parsed.provenance?.records ??
    [];
  const matchingRecord = Array.isArray(records)
    ? records.find((record) => {
        const id = record?.id ?? record?.targetId ?? record?.field ?? null;
        return id === targetId && ACCEPTED_STATUSES.has(record?.status);
      })
    : null;
  if (matchingRecord && provenanceRecordDisclaimsRetainedGeometry(matchingRecord)) {
    return {
      accepted: false,
      reason: "source_provenance_payload_disclaimed_or_synthetic",
      schema: parsed.schema ?? null,
      details: { targetId },
    };
  }
  const hasPayload =
    matchingRecord &&
    concreteString(
      matchingRecord.traceId ??
        matchingRecord.sourceHash ??
        matchingRecord.rawDatasetId ??
        matchingRecord.derivationId ??
        matchingRecord.certificateId,
    ) &&
    (Array.isArray(matchingRecord.rows) ||
      Array.isArray(matchingRecord.observations) ||
      Array.isArray(matchingRecord.steps) ||
      concreteString(matchingRecord.statement));
  if (!hasPayload) {
    return {
      accepted: false,
      reason: "source_retained_geometry_provenance_payload_missing",
      schema: parsed.schema ?? null,
      details: {
        targetId,
        recordCount: Array.isArray(records) ? records.length : null,
      },
    };
  }
  return {
    accepted: true,
    reason: "accepted_retained_geometry_provenance",
    schema: parsed.schema,
  };
}

function eq02_04SourceProducerStatus(filePath) {
  if (path.extname(filePath) !== ".json") {
    return { applies: false };
  }
  let parsed;
  try {
    parsed = readJson(filePath);
  } catch (error) {
    return {
      applies: true,
      accepted: false,
      status: "invalid_json",
      nextBlocker: String(error?.message ?? error),
    };
  }
  if (parsed.schema !== EQ02_04_SOURCE_SCHEMA) {
    return { applies: false };
  }
  const producerPath = path.join(
    SCRIPT_DIR,
    "produce-eq02-04-coframe-extraction-certificate.mjs",
  );
  const result = spawnSync(
    process.execPath,
    [producerPath, "--input", filePath, "--summary", "--no-retained-record"],
    {
      cwd: REPO_ROOT,
      encoding: "utf8",
      maxBuffer: 1024 * 1024,
    },
  );
  if (result.error || result.status !== 0) {
    return {
      applies: true,
      accepted: false,
      status: "producer_failed",
      nextBlocker: result.stderr?.trim() ?? String(result.error ?? ""),
    };
  }
  let summary;
  try {
    summary = JSON.parse(result.stdout);
  } catch (error) {
    return {
      applies: true,
      accepted: false,
      status: "producer_output_invalid_json",
      nextBlocker: String(error?.message ?? error),
    };
  }
  return {
    applies: true,
    accepted: summary.status === "accepted",
    status: summary.status ?? "unknown",
    nextBlocker: summary.producer?.nextBlocker ?? null,
  };
}

function resolveSourcePath(value) {
  const source = value.trim();
  return path.isAbsolute(source)
    ? path.normalize(source)
    : path.resolve(REPO_ROOT, source);
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
  if (
    relative === "" ||
    relative.startsWith("..") ||
    path.isAbsolute(relative)
  ) {
    return false;
  }
  if (relative.startsWith(`reference${path.sep}priorities${path.sep}`)) {
    return false;
  }
  if (relative.startsWith(`reference${path.sep}entourage${path.sep}`)) {
    return false;
  }
  if (relative.startsWith(`content${path.sep}markdown${path.sep}aaa${path.sep}`)) {
    return false;
  }
  const lowerBasename = path.basename(normalized).toLowerCase();
  return !(
    lowerBasename.includes("attempt") ||
    lowerBasename.includes("toy") ||
    lowerBasename.includes("probe") ||
    lowerBasename.includes("mock") ||
    lowerBasename.includes("source-contract") ||
    lowerBasename.includes("negative-control")
  );
}
