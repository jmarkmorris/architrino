#!/usr/bin/env node

import fs from "node:fs";
import { fileURLToPath } from "node:url";

export const BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_SCHEMA =
  "breather-receiver-normal-force-margin-fixture/v0";
export const BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_ARTIFACT_ID =
  "breather-receiver-normal-force-margin-restart/v0";

export const BREATHER_FORCE_MARGIN_STATUSES = Object.freeze({
  missing: "receiver_normal_breather_force_margin_missing",
  branchChartUnauthorized: "breather-force-margin-branch-chart-unauthorized",
  checksumMismatch: "breather-force-margin-branch-family-checksum-mismatch",
  receiverStrengthSubstitution: "breather-force-margin-source-normal-substitution",
  oldShellBraidResidue: "breather-force-margin-old-shell-braid-residue",
  aggregateOnly: "breather-force-margin-aggregate-only",
  derivativeMissing: "breather-force-margin-derivative-row-missing",
  derivativeReconstructionFailed: "breather-force-margin-derivative-reconstruction-failed",
  signStratumOpen: "breather-force-margin-sign-stratum-open",
  nonpositive: "breather-force-margin-nonpositive",
  passed: "breather-force-margin-fixture-passed-priority-only",
});

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const NUMERIC_TOLERANCE = 1e-12;

export function buildBreatherReceiverNormalForceMarginFixtureSchema() {
  return {
    artifact_schema: BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_SCHEMA,
    artifact_id: BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_ARTIFACT_ID,
    claim_level: "priority-only fixture validator",
    required_top_level_fields: [
      "artifact_id",
      "packet_identity",
      "branch_chart_authorized",
      "branch_family_checksum",
      "receiver_normal_rows",
      "receiver_normal_derivative_rows",
      "margin_consumers",
      "margin_intervals",
      "negative_controls",
      "source_hashes",
    ],
    receiver_normal_row_contract: [
      "retained_record_key",
      "branch_family_checksum",
      "D_s_interval",
      "D_t_interval",
      "W_rec_interval",
      "sign_stratum.zeta_s",
      "sign_stratum.zeta_t",
    ],
    receiver_normal_derivative_row_contract: [
      "retained_record_key",
      "variation_key",
      "branch_family_checksum",
      "D_vD_s_interval",
      "D_vD_t_interval",
      "D_vW_rec_interval",
      "geometry_derivatives",
      "force_kernel_derivatives",
    ],
    margin_consumer_contract: [
      "consumer_id",
      "branch_family_checksum",
      "retained_record_keys",
      "derivative_variation_keys",
    ],
    margin_interval_contract: [
      "consumer_id",
      "branch_family_checksum",
      "gamma_rec_interval",
    ],
    fail_closed_statuses: Object.values(BREATHER_FORCE_MARGIN_STATUSES).filter(
      (status) => status !== BREATHER_FORCE_MARGIN_STATUSES.passed,
    ),
  };
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function present(value) {
  return value !== null && value !== undefined && value !== "";
}

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function stableStringify(value) {
  if (!isPlainObject(value)) {
    return String(value);
  }
  return JSON.stringify(
    Object.fromEntries(Object.entries(value).sort(([left], [right]) => left.localeCompare(right))),
  );
}

function intervalOf(value) {
  if (isFiniteNumber(value)) {
    return [value, value];
  }
  if (Array.isArray(value) && value.length === 2 && value.every(isFiniteNumber)) {
    const [left, right] = value;
    return left <= right ? [left, right] : null;
  }
  if (isPlainObject(value)) {
    const lower = value.lower ?? value.lo ?? value.min;
    const upper = value.upper ?? value.hi ?? value.max;
    if (isFiniteNumber(lower) && isFiniteNumber(upper) && lower <= upper) {
      return [lower, upper];
    }
  }
  return null;
}

function intervalExcludesZero(interval) {
  return interval[1] < 0 || interval[0] > 0;
}

function intervalContains(container, expected, tolerance = NUMERIC_TOLERANCE) {
  return (
    container[0] <= expected[0] + tolerance * Math.max(1, Math.abs(expected[0])) &&
    container[1] >= expected[1] - tolerance * Math.max(1, Math.abs(expected[1]))
  );
}

function intervalFromEndpointPairs(left, right, operation) {
  const values = [
    operation(left[0], right[0]),
    operation(left[0], right[1]),
    operation(left[1], right[0]),
    operation(left[1], right[1]),
  ];
  if (!values.every(isFiniteNumber)) {
    return null;
  }
  return [Math.min(...values), Math.max(...values)];
}

function addInterval(left, right) {
  return [left[0] + right[0], left[1] + right[1]];
}

function subtractInterval(left, right) {
  return [left[0] - right[1], left[1] - right[0]];
}

function multiplyInterval(left, right) {
  return intervalFromEndpointPairs(left, right, (a, b) => a * b);
}

function divideInterval(left, right) {
  if (!intervalExcludesZero(right)) {
    return null;
  }
  return intervalFromEndpointPairs(left, right, (a, b) => a / b);
}

function absoluteInterval(interval) {
  if (interval[0] <= 0 && interval[1] >= 0) {
    return [0, Math.max(Math.abs(interval[0]), Math.abs(interval[1]))];
  }
  return [Math.min(Math.abs(interval[0]), Math.abs(interval[1])), Math.max(Math.abs(interval[0]), Math.abs(interval[1]))];
}

function squareIntervalExcludingZero(interval) {
  if (!intervalExcludesZero(interval)) {
    return null;
  }
  return [Math.min(interval[0] * interval[0], interval[1] * interval[1]), Math.max(interval[0] * interval[0], interval[1] * interval[1])];
}

function retainedRecordKey(record) {
  if (typeof record?.retained_record_key === "string") {
    return record.retained_record_key;
  }
  if (isPlainObject(record?.retained_record_key) && present(record.retained_record_key.record_id)) {
    return String(record.retained_record_key.record_id);
  }
  if (present(record?.retained_record_id)) {
    return String(record.retained_record_id);
  }
  if (present(record?.record_id)) {
    return String(record.record_id);
  }
  return null;
}

function variationKey(record) {
  return record?.variation_key ?? record?.v_key ?? record?.variation_id ?? null;
}

function hasSubstitutionFlag(entry) {
  return (
    entry?.uses_source_normal_substitution === true ||
    entry?.uses_source_normal_denominator === true ||
    entry?.substitutes_D_s_for_W_rec === true ||
    entry?.substitutes_J_for_W_rec === true
  );
}

function hasOldShellBraidFlag(entry) {
  return (
    entry?.uses_old_shell_braid_force_residue === true ||
    entry?.uses_old_shell_braid_force_weight === true ||
    entry?.old_shell_braid_residue_consumed === true
  );
}

function diagnosticsForMissingFixture() {
  return [
    "fixture object is absent",
    "same-record receiver-normal rows are absent",
    "same-record derivative rows are absent",
    "breather force-margin consumers are absent",
  ];
}

function fail(status, diagnostics, extra = {}) {
  return {
    schema: BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_SCHEMA,
    artifact_id: BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_ARTIFACT_ID,
    verdict: "fail_closed",
    pass: false,
    status,
    diagnostics,
    ...extra,
  };
}

function pass(diagnostics, extra = {}) {
  return {
    schema: BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_SCHEMA,
    artifact_id: BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_ARTIFACT_ID,
    verdict: "pass_priority_only",
    pass: true,
    status: BREATHER_FORCE_MARGIN_STATUSES.passed,
    diagnostics,
    row_consumption_authorized: false,
    branch_chart_authorized: true,
    ...extra,
  };
}

function branchFamilyChecksum(value) {
  return present(value) ? stableStringify(value) : null;
}

function rowInterval(row, names) {
  for (const name of names) {
    const interval = intervalOf(row?.[name]);
    if (interval) {
      return interval;
    }
  }
  return null;
}

function buildRowIndex(rows) {
  const index = new Map();
  for (const row of rows) {
    const key = retainedRecordKey(row);
    if (key) {
      index.set(key, row);
    }
  }
  return index;
}

function derivativeIndexKey(recordKey, vKey) {
  return `${recordKey}::${vKey ?? "default"}`;
}

function buildDerivativeIndex(rows) {
  const index = new Map();
  for (const row of rows) {
    const key = retainedRecordKey(row);
    if (!key) continue;
    index.set(derivativeIndexKey(key, variationKey(row)), row);
  }
  return index;
}

function expectedWInterval(receiverRow) {
  const dS = rowInterval(receiverRow, ["D_s_interval", "D_s"]);
  const dT = rowInterval(receiverRow, ["D_t_interval", "D_t"]);
  if (!dS || !dT || !intervalExcludesZero(dS)) {
    return null;
  }
  const ratio = divideInterval(dT, dS);
  return ratio ? absoluteInterval(ratio) : null;
}

function expectedDvWInterval(receiverRow, derivativeRow) {
  const dS = rowInterval(receiverRow, ["D_s_interval", "D_s"]);
  const dT = rowInterval(receiverRow, ["D_t_interval", "D_t"]);
  const dvDS = rowInterval(derivativeRow, ["D_vD_s_interval", "D_vD_s"]);
  const dvDT = rowInterval(derivativeRow, ["D_vD_t_interval", "D_vD_t"]);
  const zetaS = receiverRow?.sign_stratum?.zeta_s ?? receiverRow?.zeta_s;
  const zetaT = receiverRow?.sign_stratum?.zeta_t ?? receiverRow?.zeta_t;
  if (!dS || !dT || !dvDS || !dvDT || ![zetaS, zetaT].every((value) => value === -1 || value === 1)) {
    return null;
  }
  const dSSquared = squareIntervalExcludingZero(dS);
  if (!dSSquared) {
    return null;
  }
  const numerator = subtractInterval(multiplyInterval(dS, dvDT), multiplyInterval(dT, dvDS));
  const signedNumerator = zetaS * zetaT === 1 ? numerator : [-numerator[1], -numerator[0]];
  return divideInterval(signedNumerator, dSSquared);
}

function consumerRecordKeys(consumer) {
  const keys = consumer?.retained_record_keys ?? consumer?.retained_record_ids ?? consumer?.record_keys ?? [];
  return Array.isArray(keys) ? keys.map(String) : [];
}

function consumerVariationKeys(consumer) {
  const keys = consumer?.derivative_variation_keys ?? consumer?.variation_keys ?? [];
  return Array.isArray(keys) && keys.length > 0 ? keys.map(String) : ["default"];
}

export function validateBreatherReceiverNormalForceMarginFixture(fixture) {
  if (!fixture) {
    return fail(BREATHER_FORCE_MARGIN_STATUSES.missing, diagnosticsForMissingFixture());
  }

  const diagnostics = [];
  if (!isPlainObject(fixture)) {
    return fail(BREATHER_FORCE_MARGIN_STATUSES.missing, ["fixture is not a JSON object"]);
  }

  if (fixture.artifact_id !== BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_ARTIFACT_ID) {
    diagnostics.push("artifact_id does not match breather-receiver-normal-force-margin-restart/v0");
  }
  if (!present(fixture.packet_identity)) {
    diagnostics.push("packet_identity is absent");
  }
  const checksum = branchFamilyChecksum(fixture.branch_family_checksum);
  if (!checksum) {
    diagnostics.push("branch_family_checksum is absent");
  }

  const receiverRows = Array.isArray(fixture.receiver_normal_rows) ? fixture.receiver_normal_rows : [];
  const derivativeRows = Array.isArray(fixture.receiver_normal_derivative_rows)
    ? fixture.receiver_normal_derivative_rows
    : [];
  const consumers = Array.isArray(fixture.margin_consumers) ? fixture.margin_consumers : [];
  const intervals = Array.isArray(fixture.margin_intervals) ? fixture.margin_intervals : [];

  if (receiverRows.length === 0) {
    diagnostics.push("receiver_normal_rows is empty");
  }
  if (consumers.length === 0) {
    diagnostics.push("margin_consumers is empty");
  }
  if (intervals.length === 0) {
    diagnostics.push("margin_intervals is empty");
  }
  if (diagnostics.length > 0) {
    return fail(BREATHER_FORCE_MARGIN_STATUSES.missing, diagnostics);
  }

  if ([fixture, ...receiverRows, ...derivativeRows, ...consumers, ...intervals].some(hasSubstitutionFlag)) {
    return fail(BREATHER_FORCE_MARGIN_STATUSES.receiverStrengthSubstitution, [
      "fixture declares a forbidden receiver-strength substitution",
    ]);
  }
  if ([fixture, ...receiverRows, ...derivativeRows, ...consumers, ...intervals].some(hasOldShellBraidFlag)) {
    return fail(BREATHER_FORCE_MARGIN_STATUSES.oldShellBraidResidue, [
      "fixture declares consumption of a legacy shell-braid residue",
    ]);
  }
  if (fixture.branch_chart_authorized !== true) {
    return fail(BREATHER_FORCE_MARGIN_STATUSES.branchChartUnauthorized, [
      "same-packet branch chart is not authorized",
    ]);
  }

  const checksumRows = [...receiverRows, ...derivativeRows, ...consumers, ...intervals].filter((entry) =>
    present(entry?.branch_family_checksum),
  );
  if (
    checksumRows.length !== receiverRows.length + derivativeRows.length + consumers.length + intervals.length ||
    checksumRows.some((entry) => branchFamilyChecksum(entry.branch_family_checksum) !== checksum)
  ) {
    return fail(BREATHER_FORCE_MARGIN_STATUSES.checksumMismatch, [
      "not every consumed row repeats the fixture branch_family_checksum",
    ]);
  }

  const rowIndex = buildRowIndex(receiverRows);
  if (rowIndex.size !== receiverRows.length) {
    return fail(BREATHER_FORCE_MARGIN_STATUSES.missing, [
      "one or more receiver_normal_rows lacks a retained record key",
    ]);
  }

  for (const row of receiverRows) {
    const dS = rowInterval(row, ["D_s_interval", "D_s"]);
    const dT = rowInterval(row, ["D_t_interval", "D_t"]);
    const wRec = rowInterval(row, ["W_rec_interval", "W_rec"]);
    const zetaS = row?.sign_stratum?.zeta_s ?? row?.zeta_s;
    const zetaT = row?.sign_stratum?.zeta_t ?? row?.zeta_t;
    if (!dS || !dT || !wRec || !intervalExcludesZero(dS) || ![zetaS, zetaT].every((value) => value === -1 || value === 1)) {
      return fail(BREATHER_FORCE_MARGIN_STATUSES.signStratumOpen, [
        `retained row ${retainedRecordKey(row) ?? "<missing>"} lacks fixed receiver-normal intervals or signs`,
      ]);
    }
    const expectedW = expectedWInterval(row);
    if (!expectedW || !intervalContains(wRec, expectedW)) {
      return fail(BREATHER_FORCE_MARGIN_STATUSES.receiverStrengthSubstitution, [
        `retained row ${retainedRecordKey(row)} does not contain reconstructed W_rec`,
      ]);
    }
  }

  const derivativeIndex = buildDerivativeIndex(derivativeRows);
  for (const consumer of consumers) {
    const keys = consumerRecordKeys(consumer);
    if (consumer?.aggregate_only === true || keys.length === 0) {
      return fail(BREATHER_FORCE_MARGIN_STATUSES.aggregateOnly, [
        `consumer ${consumer?.consumer_id ?? "<missing>"} does not name retained rows`,
      ]);
    }
    for (const key of keys) {
      if (!rowIndex.has(key)) {
        return fail(BREATHER_FORCE_MARGIN_STATUSES.aggregateOnly, [
          `consumer ${consumer?.consumer_id ?? "<missing>"} names unknown retained row ${key}`,
        ]);
      }
    }
    if (consumer.requires_derivatives !== false) {
      for (const key of keys) {
        for (const vKey of consumerVariationKeys(consumer)) {
          const derivative = derivativeIndex.get(derivativeIndexKey(key, vKey));
          if (!derivative) {
            return fail(BREATHER_FORCE_MARGIN_STATUSES.derivativeMissing, [
              `consumer ${consumer?.consumer_id ?? "<missing>"} lacks derivative row ${key}::${vKey}`,
            ]);
          }
          const dvW = rowInterval(derivative, ["D_vW_rec_interval", "D_vW_rec"]);
          const expected = expectedDvWInterval(rowIndex.get(key), derivative);
          if (!dvW || !expected || !intervalContains(dvW, expected)) {
            return fail(BREATHER_FORCE_MARGIN_STATUSES.derivativeReconstructionFailed, [
              `derivative row ${key}::${vKey} does not contain reconstructed D_vW_rec`,
            ]);
          }
          if (!present(derivative.geometry_derivatives) || !present(derivative.force_kernel_derivatives)) {
            return fail(BREATHER_FORCE_MARGIN_STATUSES.derivativeMissing, [
              `derivative row ${key}::${vKey} lacks geometry or force-kernel derivative payload`,
            ]);
          }
        }
      }
    }
  }

  const intervalConsumerIds = new Set(intervals.map((entry) => String(entry.consumer_id)));
  for (const consumer of consumers) {
    if (!intervalConsumerIds.has(String(consumer.consumer_id))) {
      return fail(BREATHER_FORCE_MARGIN_STATUSES.nonpositive, [
        `consumer ${consumer?.consumer_id ?? "<missing>"} lacks a margin interval`,
      ]);
    }
  }
  for (const intervalRow of intervals) {
    const gamma = rowInterval(intervalRow, ["gamma_rec_interval", "gamma_interval", "gamma_rec"]);
    if (!gamma || gamma[0] <= 0) {
      return fail(BREATHER_FORCE_MARGIN_STATUSES.nonpositive, [
        `consumer ${intervalRow?.consumer_id ?? "<missing>"} has a nonpositive lower margin`,
      ]);
    }
  }

  return pass(["same-record receiver-normal force-margin fixture passed priority-only checks"], {
    retained_record_count: receiverRows.length,
    derivative_row_count: derivativeRows.length,
    margin_consumer_count: consumers.length,
    margin_interval_count: intervals.length,
  });
}

function parseArgs(argv) {
  const args = {
    fixturePath: null,
    allowFailClosed: false,
    pretty: false,
    schema: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--fixture" || arg === "--validate") {
      args.fixturePath = argv[index + 1];
      index += 1;
    } else if (arg === "--allow-fail-closed") {
      args.allowFailClosed = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--schema") {
      args.schema = true;
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return args;
}

function usage() {
  return [
    "Usage:",
    `  node ${SCRIPT_PATH} --fixture <fixture.json> [--allow-fail-closed] [--pretty]`,
    `  node ${SCRIPT_PATH} --allow-fail-closed [--pretty]`,
    `  node ${SCRIPT_PATH} --schema [--pretty]`,
  ].join("\n");
}

function readFixture(pathname) {
  return JSON.parse(fs.readFileSync(pathname, "utf8"));
}

if (process.argv[1] === SCRIPT_PATH) {
  try {
    const args = parseArgs(process.argv.slice(2));
    if (args.help) {
      console.log(usage());
      process.exit(0);
    }
    if (args.schema) {
      console.log(
        JSON.stringify(
          buildBreatherReceiverNormalForceMarginFixtureSchema(),
          null,
          args.pretty ? 2 : 0,
        ),
      );
      process.exit(0);
    }
    const fixture = args.fixturePath ? readFixture(args.fixturePath) : null;
    const report = validateBreatherReceiverNormalForceMarginFixture(fixture);
    console.log(JSON.stringify(report, null, args.pretty ? 2 : 0));
    if (!report.pass && !args.allowFailClosed) {
      process.exit(1);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    console.error(usage());
    process.exit(2);
  }
}
