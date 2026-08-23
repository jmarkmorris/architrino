#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const INPUT_SCHEMA =
  "aaa-fixed-law-source-continuation-input/v1";
export const OUTPUT_SCHEMA =
  "aaa-fixed-law-source-continuation-report/v1";

const REQUIRED_BINDINGS = [
  "lawFingerprint",
  "coefficientFingerprint",
  "regulatorFingerprint",
  "projectionFingerprint",
  "toleranceFingerprint",
  "sourceFamilyId",
  "commonHistoryPrefixId",
  "architrinoIdentityDigest",
];

const RETAINED_SOURCE_STATUSES = new Set([
  "accepted_retained",
  "certified_retained",
]);

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function finiteNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function vector(value) {
  if (!Array.isArray(value) || value.length === 0) return null;
  const numbers = value.map(finiteNumber);
  return numbers.every((number) => number !== null) ? numbers : null;
}

function subtract(left, right) {
  return left.map((value, index) => value - right[index]);
}

function add(left, right) {
  return left.map((value, index) => value + right[index]);
}

function scale(values, scalar) {
  return values.map((value) => value * scalar);
}

function norm(values) {
  return Math.sqrt(values.reduce((sum, value) => sum + value * value, 0));
}

function relativeResidual(actual, expected, epsilon) {
  return norm(subtract(actual, expected)) / (norm(expected) + epsilon);
}

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (isRecord(value)) {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function digest(value) {
  return createHash("sha256").update(stableJson(value)).digest("hex");
}

function check(id, passed, detail = null) {
  return { id, passed, detail };
}

function commonBindingChecks(input, rows) {
  const declared = input.commonRecord ?? {};
  const checks = [];
  for (const key of REQUIRED_BINDINGS) {
    const expected = declared[key];
    const mismatches = rows
      .filter((row) => row?.bindings?.[key] !== expected)
      .map((row) => row?.rowId ?? null);
    checks.push(
      check(
        `fixed_binding.${key}`,
        typeof expected === "string" && expected.length > 0 && mismatches.length === 0,
        { expected: expected ?? null, mismatchRowIds: mismatches },
      ),
    );
  }

  checks.push(
    check(
      "nonempty_common_record_id",
      typeof declared.recordId === "string" && declared.recordId.length > 0,
      { recordId: declared.recordId ?? null },
    ),
  );

  const fieldSpeed = finiteNumber(declared.fieldSpeed);
  checks.push(
    check("normalized_field_speed", fieldSpeed === 1, {
      expected: 1,
      actual: fieldSpeed,
    }),
  );

  const rowIds = rows.map((row) => row?.rowId);
  checks.push(
    check(
      "unique_continuation_row_ids",
      rowIds.every((id) => typeof id === "string" && id.length > 0) &&
        new Set(rowIds).size === rowIds.length,
      { rowIds },
    ),
  );

  const zetas = rows.map((row) => finiteNumber(row?.zeta));
  checks.push(
    check(
      "finite_unique_source_preparations",
      zetas.every((value) => value !== null) &&
        new Set(zetas).size === zetas.length,
      { zetas },
    ),
  );

  checks.push(
    check(
      "physical_source_preparation_declared",
      isRecord(input.sourcePreparation) &&
        typeof input.sourcePreparation.kind === "string" &&
        input.sourcePreparation.kind !== "effective_electric_field_multiplier" &&
        input.sourcePreparation.insertedIntoPerHitLaw !== true,
      input.sourcePreparation ?? null,
    ),
  );

  return checks;
}

function rowCompletenessChecks(rows, epsilon) {
  return rows.map((row) => {
    const state = vector(row?.stateVector);
    const roots = Array.isArray(row?.rootRows) ? row.rootRows : [];
    const rootChecks = roots.map((root) => {
      if (!isRecord(root)) return false;
      const dTransmitter = finiteNumber(root.D_t);
      const weight = finiteNumber(root.W_acc);
      const expectedWeight = dTransmitter === null || dTransmitter === 0
        ? null
        : 1 / Math.abs(dTransmitter);
      return (
        typeof root.rootId === "string" &&
        typeof root.transmitterTag === "string" &&
        finiteNumber(root.D_r) !== null &&
        expectedWeight !== null &&
        weight !== null &&
        Math.abs(weight - expectedWeight) <= epsilon
      );
    });
    const margins = row?.margins ?? {};
    const complete =
      state !== null &&
      roots.length > 0 &&
      rootChecks.every(Boolean) &&
      finiteNumber(margins.rootJacobian) !== null &&
      finiteNumber(margins.inactiveGap) !== null &&
      finiteNumber(margins.sectionStability) !== null &&
      finiteNumber(margins.collision) !== null &&
      typeof row?.sourceHistoryId === "string" &&
      typeof row?.seaHistoryId === "string" &&
      typeof row?.receiverHistoryId === "string" &&
      typeof row?.wakeLedgerFingerprint === "string" &&
      Array.isArray(row?.transmitterTags) &&
      row.transmitterTags.length > 0;
    return check(`complete_row.${row?.rowId ?? "missing"}`, complete, {
      stateVectorPass: state !== null,
      rootRowCount: roots.length,
      rootWeightPass: rootChecks.every(Boolean),
    });
  });
}

function computeWeakResponse(input, rows) {
  const tolerance = finiteNumber(input.tolerances?.weakLinearityResidualMax) ?? 0;
  const epsilon = finiteNumber(input.tolerances?.relativeResidualEpsilon) ?? 1e-12;
  const weakMaximum = finiteNumber(input.tolerances?.weakZetaMaximum) ?? 0;
  const baseline = rows.find((row) => finiteNumber(row.zeta) === 0) ?? null;
  const signedRows = rows
    .filter((row) => {
      const zeta = finiteNumber(row?.zeta);
      return zeta !== null && zeta !== 0 && Math.abs(zeta) <= weakMaximum;
    })
    .sort((left, right) => Math.abs(left.zeta) - Math.abs(right.zeta));

  const signedPairs = signedRows
    .filter((row) => row.zeta > 0)
    .map((positive) => ({
      positive,
      negative: signedRows.find(
        (row) => row.zeta < 0 && Math.abs(row.zeta + positive.zeta) <= epsilon,
      ) ?? null,
    }))
    .filter((pair) => pair.negative !== null);
  const positive = signedPairs[0]?.positive ?? null;
  const negative = signedPairs[0]?.negative ?? null;
  const baselineState = baseline === null ? null : vector(baseline.stateVector);
  const positiveState = positive === null ? null : vector(positive.stateVector);
  const negativeState = negative === null ? null : vector(negative.stateVector);
  const dimensionsMatch =
    baselineState !== null &&
    positiveState !== null &&
    negativeState !== null &&
    baselineState.length === positiveState.length &&
    baselineState.length === negativeState.length;

  if (!dimensionsMatch) {
    return {
      status: "blocked_missing_weak_signed_pair",
      passed: false,
      tangentStep: positive?.zeta ?? null,
      tangent: null,
      maxRelativeResidual: null,
      signedPairSteps: signedPairs.map((pair) => pair.positive.zeta),
      rows: [],
    };
  }

  const tangent = scale(
    subtract(positiveState, negativeState),
    1 / (positive.zeta - negative.zeta),
  );
  const evaluated = signedRows.map((row) => {
    const actual = vector(row.stateVector);
    if (actual === null || actual.length !== tangent.length) {
      return { rowId: row.rowId, zeta: row.zeta, residual: Number.POSITIVE_INFINITY };
    }
    const expected = add(baselineState, scale(tangent, row.zeta));
    return {
      rowId: row.rowId,
      zeta: row.zeta,
      residual: relativeResidual(actual, expected, epsilon),
    };
  });
  const maxRelativeResidual = Math.max(...evaluated.map((row) => row.residual));
  const passed = signedPairs.length >= 2 && maxRelativeResidual <= tolerance;
  return {
    status: passed ? "weak_response_pass" : "weak_response_failed",
    passed,
    tolerance,
    tangentStep: positive.zeta,
    tangent,
    maxRelativeResidual,
    signedPairSteps: signedPairs.map((pair) => pair.positive.zeta),
    rows: evaluated,
  };
}

function transitionKinds(row, tolerance) {
  const margins = row.margins ?? {};
  const kinds = [];
  const rootJacobian = finiteNumber(margins.rootJacobian);
  const inactiveGap = finiteNumber(margins.inactiveGap);
  const sectionStability = finiteNumber(margins.sectionStability);
  const collision = finiteNumber(margins.collision);
  if (rootJacobian !== null && rootJacobian <= tolerance) {
    kinds.push("causal_root_transversality_boundary");
  }
  if (inactiveGap !== null && inactiveGap <= tolerance) {
    kinds.push("inactive_root_gap_closure");
  }
  if (sectionStability !== null && sectionStability <= tolerance) {
    kinds.push("section_stability_boundary");
  }
  if (collision !== null && collision <= tolerance) {
    kinds.push("collision_boundary_quarantine");
  }
  if (row.branchStatus !== "retained") {
    kinds.push(`branch_status_${row.branchStatus ?? "missing"}`);
  }
  return kinds;
}

function computeContinuation(input, rows, weakResponse) {
  const epsilon = finiteNumber(input.tolerances?.relativeResidualEpsilon) ?? 1e-12;
  const transitionTolerance = finiteNumber(input.tolerances?.transitionMargin) ?? 0;
  const baseline = rows.find((row) => finiteNumber(row.zeta) === 0) ?? null;
  const baselineState = baseline === null ? null : vector(baseline.stateVector);
  if (!weakResponse.passed || baselineState === null) {
    return {
      status: "blocked_missing_weak_response",
      firstTransition: null,
      rows: [],
    };
  }

  const positiveRows = rows
    .filter((row) => finiteNumber(row.zeta) > 0)
    .sort((left, right) => left.zeta - right.zeta);
  const evaluated = positiveRows.map((row) => {
    const state = vector(row.stateVector);
    const expected = add(baselineState, scale(weakResponse.tangent, row.zeta));
    return {
      rowId: row.rowId,
      zeta: row.zeta,
      geometricResidual:
        state !== null && state.length === expected.length
          ? relativeResidual(state, expected, epsilon)
          : null,
      transitionKinds: transitionKinds(row, transitionTolerance),
      margins: row.margins,
    };
  });
  const transitionIndex = evaluated.findIndex(
    (row) => row.transitionKinds.length > 0,
  );
  const firstTransition = transitionIndex < 0
    ? null
    : {
        ...evaluated[transitionIndex],
        previousRowId: transitionIndex === 0 ? baseline.rowId : evaluated[transitionIndex - 1].rowId,
        previousZeta: transitionIndex === 0 ? 0 : evaluated[transitionIndex - 1].zeta,
      };
  return {
    status: firstTransition === null
      ? "blocked_missing_first_geometric_transition"
      : "first_geometric_transition_reached",
    firstTransition,
    rows: evaluated,
  };
}

function certifiedBasin(basin, expectedSign, commonRecordId) {
  return (
    typeof commonRecordId === "string" &&
    commonRecordId.length > 0 &&
    isRecord(basin) &&
    basin.status === "certified_retained" &&
    basin.retainedBranchAccepted === true &&
    basin.commonRecordId === commonRecordId &&
    finiteNumber(basin.protectedPolarityInventory) === expectedSign * 6 &&
    typeof basin.branchId === "string" &&
    basin.branchId.length > 0 &&
    typeof basin.certificateFingerprint === "string" &&
    basin.certificateFingerprint.length > 0
  );
}

function evaluatePairGate(input) {
  const basins = input.pairBasins ?? {};
  const commonRecordId = input.commonRecord?.recordId ?? null;
  const commonRecordPass =
    typeof commonRecordId === "string" && commonRecordId.length > 0;
  const sourceRecordPass =
    commonRecordPass &&
    RETAINED_SOURCE_STATUSES.has(input.sourceEvidence?.status) &&
    input.sourceEvidence?.retainedBranchAccepted === true;
  const electronPass = certifiedBasin(basins.electron, -1, commonRecordId);
  const positronPass = certifiedBasin(basins.positron, 1, commonRecordId);
  const conjugationPass =
    electronPass &&
    positronPass &&
    basins.electron.conjugateBranchId === basins.positron.branchId &&
    basins.positron.conjugateBranchId === basins.electron.branchId;
  const eligible = sourceRecordPass && electronPass && positronPass && conjugationPass;
  const attemptProvided = isRecord(input.pairCaptureAttempt);

  if (!eligible) {
    return {
      status: attemptProvided
        ? "rejected_pair_attempt_without_certified_conjugate_basins"
        : "skipped_missing_certified_conjugate_basins",
      eligible: false,
      pairCaptureAttempted: false,
      backreactionEvaluated: false,
      commonRecordPass,
      sourceRecordPass,
      electronBasinPass: electronPass,
      positronBasinPass: positronPass,
      conjugationPass,
    };
  }
  if (!attemptProvided) {
    return {
      status: "eligible_missing_pair_capture_attempt_record",
      eligible: true,
      pairCaptureAttempted: false,
      backreactionEvaluated: false,
      commonRecordPass: true,
      sourceRecordPass: true,
      electronBasinPass: true,
      positronBasinPass: true,
      conjugationPass: true,
    };
  }

  const attempt = input.pairCaptureAttempt;
  const sameRecordPass =
    attempt.commonRecordId === commonRecordId &&
    attempt.lawFingerprint === input.commonRecord.lawFingerprint &&
    attempt.architrinoIdentityDigest === input.commonRecord.architrinoIdentityDigest;
  const ledgerResidual = finiteNumber(attempt.ledgerResidual);
  const ledgerTolerance = finiteNumber(input.tolerances?.eventLedgerResidualMax) ?? 0;
  const backreactionPass =
    sameRecordPass &&
    attempt.identityPartitionPass === true &&
    attempt.netPolarityPass === true &&
    attempt.sourceSeaProductBoundaryContinuationPass === true &&
    ledgerResidual !== null &&
    Math.abs(ledgerResidual) <= ledgerTolerance;
  return {
    status: backreactionPass
      ? "pair_capture_and_backreaction_pass"
      : "pair_capture_attempt_failed_backreaction",
    eligible: true,
    pairCaptureAttempted: true,
    backreactionEvaluated: true,
    commonRecordPass: true,
    sourceRecordPass: true,
    electronBasinPass: true,
    positronBasinPass: true,
    conjugationPass: true,
    sameRecordPass,
    ledgerResidual,
    ledgerTolerance,
    backreactionPass,
  };
}

function summaryStatus({ invariantPass, weakResponse, continuation, pairGate, candidateOnly }) {
  if (!invariantPass) return "rejected_fixed_law_or_record_invariant";
  if (!weakResponse.passed) return weakResponse.status;
  if (continuation.firstTransition === null) return continuation.status;
  if (pairGate.status === "rejected_pair_attempt_without_certified_conjugate_basins") {
    return pairGate.status;
  }
  if (pairGate.pairCaptureAttempted && pairGate.backreactionPass !== true) {
    return "rejected_pair_backreaction";
  }
  if (candidateOnly) return "candidate_only_first_transition_reached";
  if (!pairGate.eligible) return "retained_first_transition_reached_pair_skipped";
  if (!pairGate.pairCaptureAttempted) return "retained_first_transition_reached_pair_ready";
  return "retained_first_transition_and_pair_backreaction_reached";
}

export function evaluateFixedLawSourceContinuation(input) {
  const rows = Array.isArray(input?.continuationRows) ? input.continuationRows : [];
  const epsilon = finiteNumber(input?.tolerances?.rootWeightResidualMax) ?? 1e-12;
  const schemaCheck = check("input_schema", input?.schema === INPUT_SCHEMA, {
    expected: INPUT_SCHEMA,
    actual: input?.schema ?? null,
  });
  const bindingChecks = commonBindingChecks(input ?? {}, rows);
  const completenessChecks = rowCompletenessChecks(rows, epsilon);
  const invariantChecks = [schemaCheck, ...bindingChecks, ...completenessChecks];
  const invariantPass = invariantChecks.every((item) => item.passed);
  const weakResponse = computeWeakResponse(input ?? {}, rows);
  const continuation = computeContinuation(input ?? {}, rows, weakResponse);
  const pairGate = evaluatePairGate(input ?? {});
  const sourceStatus = input?.sourceEvidence?.status ?? "missing";
  const candidateOnly = !RETAINED_SOURCE_STATUSES.has(sourceStatus) ||
    input?.sourceEvidence?.retainedBranchAccepted !== true;
  const status = summaryStatus({
    invariantPass,
    weakResponse,
    continuation,
    pairGate,
    candidateOnly,
  });

  return {
    schema: OUTPUT_SCHEMA,
    inputDigest: digest(input),
    claimBoundary: {
      sourceStatus,
      candidateOnly,
      scoreDecision: "no_score_change",
      acceptedPhysicsClaim: false,
      evidenceDecisionOwner: "retained-branch and owning-equation acceptance processes",
    },
    summary: {
      status,
      invariantPass,
      weakResponsePass: weakResponse.passed,
      firstGeometricTransitionReached: continuation.firstTransition !== null,
      firstTransitionZeta: continuation.firstTransition?.zeta ?? null,
      pairCaptureEligible: pairGate.eligible,
      pairCaptureAttempted: pairGate.pairCaptureAttempted,
      backreactionEvaluated: pairGate.backreactionEvaluated,
      nextBlocker: candidateOnly
        ? "missing_accepted_eom_evolved_retained_source_sea_receiver_branch"
        : !pairGate.eligible
          ? "missing_same_record_certified_conjugate_product_basins"
          : !pairGate.pairCaptureAttempted
            ? "missing_same_record_pair_capture_attempt"
            : pairGate.backreactionPass !== true
              ? "pair_backreaction_rows_failed"
              : null,
    },
    invariantChecks,
    weakResponse,
    continuation,
    pairGate,
  };
}

async function main(argv) {
  const args = { input: null, pretty: false, requireTransition: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") args.input = argv[++index];
    else if (arg === "--pretty") args.pretty = true;
    else if (arg === "--require-transition") args.requireTransition = true;
    else if (arg === "--help" || arg === "-h") {
      console.log("Usage: node scripts/mapping-electromagnetism/fixed-law-source-continuation.mjs --input PATH [--pretty] [--require-transition]");
      return;
    } else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!args.input) throw new Error("Missing required --input PATH argument.");
  const input = JSON.parse(await readFile(resolve(args.input), "utf8"));
  const report = evaluateFixedLawSourceContinuation(input);
  console.log(JSON.stringify(report, null, args.pretty ? 2 : 0));
  if (args.requireTransition && !report.summary.firstGeometricTransitionReached) {
    process.exitCode = 1;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main(process.argv.slice(2));
}
