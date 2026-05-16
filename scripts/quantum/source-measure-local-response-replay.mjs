#!/usr/bin/env node

import fs from "node:fs";

const EPS = 1e-9;
const RESIDUAL_KEYS = ["Delta_rec", "Delta_div", "entropy_locking", "event_ledger"];

function parseArgs(argv) {
  const args = {
    candidate: null,
    scenario: "all",
    out: null,
    pretty: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--candidate") {
      args.candidate = argv[++i];
    } else if (arg === "--scenario") {
      args.scenario = argv[++i];
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (args.help) {
    return args;
  }

  if (!args.candidate) {
    throw new Error("--candidate requires a path.");
  }
  if (!args.scenario) {
    throw new Error("--scenario requires an id.");
  }
  if (args.out === undefined) {
    throw new Error("--out requires a path.");
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/quantum/source-measure-local-response-replay.mjs [options]

Options:
  --candidate PATH  Read a Bell-family candidate JSON file.
  --scenario ID     Scenario id to replay, or "all". Defaults to all.
  --out PATH        Write JSON output to a file instead of stdout.
  --pretty          Pretty-print JSON output.
  --help            Show this help.

This fixture replays retained source rows through available local one-wing
response signs for the CHSH settings. It reports Delta_par, missing local
response data, missing local record residuals, and whether a context table is
a replay pass, an incomplete replay target, or a failure-boundary obstruction.`);
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function assertNumber(value, label) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number.`);
  }
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function candidateScenarios(candidate) {
  if (Array.isArray(candidate.scenarios)) {
    return candidate.scenarios;
  }
  if (isPlainObject(candidate) && Array.isArray(candidate.contexts)) {
    return [candidate];
  }
  throw new Error("candidate JSON must contain scenarios[] or be a single scenario object.");
}

function selectedScenarios(scenarios, scenarioId) {
  if (scenarioId === "all") {
    return scenarios;
  }
  const selected = scenarios.filter((scenario) => scenario.id === scenarioId);
  if (selected.length === 0) {
    throw new Error(`No scenario found for id: ${scenarioId}`);
  }
  return selected;
}

function contextKey(settings) {
  return Object.entries(settings)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([party, setting]) => `${party}:${setting}`)
    .join("|");
}

function contextBySettings(scenario) {
  const map = new Map();
  for (const context of scenario.contexts ?? []) {
    if (!isPlainObject(context.settings)) {
      throw new Error(`${scenario.id}.${context.id} is missing settings.`);
    }
    map.set(contextKey(context.settings), context);
  }
  return map;
}

function findContext(scenario, settings) {
  const context = contextBySettings(scenario).get(contextKey(settings));
  if (!context) {
    throw new Error(`${scenario.id} is missing context ${contextKey(settings)}.`);
  }
  return context;
}

function chshEntries(scenario) {
  if (!scenario.chsh) {
    return null;
  }
  const { a0, a1, b0, b1 } = scenario.chsh;
  for (const [key, value] of Object.entries({ a0, a1, b0, b1 })) {
    if (typeof value !== "string" || value.length === 0) {
      throw new Error(`${scenario.id}.chsh.${key} must be a setting id.`);
    }
  }
  return [
    { key: `${a0}_${b0}`, settings: { A: a0, B: b0 }, context: findContext(scenario, { A: a0, B: b0 }) },
    { key: `${a0}_${b1}`, settings: { A: a0, B: b1 }, context: findContext(scenario, { A: a0, B: b1 }) },
    { key: `${a1}_${b0}`, settings: { A: a1, B: b0 }, context: findContext(scenario, { A: a1, B: b0 }) },
    { key: `${a1}_${b1}`, settings: { A: a1, B: b1 }, context: findContext(scenario, { A: a1, B: b1 }) },
  ];
}

function sourceEntries(scenario, entries) {
  if (Array.isArray(scenario.source_records) && scenario.source_records.length > 0) {
    return scenario.source_records.map((record, index) => {
      assertSourceRecord(record, `${scenario.id}.source_records[${index}]`);
      return { id: record.id, weight: record.weight, record, source: "source_records" };
    });
  }

  const records = new Map();
  for (const { context } of entries) {
    for (const record of context.screening?.records ?? []) {
      assertSourceRecord(record, `${scenario.id}.${context.id}.screening.records`);
      if (!records.has(record.id)) {
        records.set(record.id, {
          id: record.id,
          weight: record.weight,
          record,
          source: "screening_records",
        });
      }
    }
  }
  return [...records.values()];
}

function assertSourceRecord(record, label) {
  if (!isPlainObject(record)) {
    throw new Error(`${label} must be an object.`);
  }
  if (typeof record.id !== "string" || record.id.length === 0) {
    throw new Error(`${label}.id must be a nonempty string.`);
  }
  assertNumber(record.weight, `${label}.weight`);
  if (record.weight < -EPS) {
    throw new Error(`${label}.weight must be nonnegative.`);
  }
}

function deterministicDistributionValue(distribution) {
  if (!isPlainObject(distribution)) {
    return null;
  }
  let selected = null;
  for (const [key, probability] of Object.entries(distribution)) {
    if (typeof probability !== "number" || !Number.isFinite(probability)) {
      return null;
    }
    if (probability >= 1 - EPS) {
      if (selected !== null) {
        return null;
      }
      selected = Number(key);
    } else if (probability > EPS) {
      return null;
    }
  }
  return selected === -1 || selected === 1 ? selected : null;
}

function parseSign(value) {
  if (value === -1 || value === 1) {
    return { sign: value, source_detail: "numeric_sign" };
  }
  if (!isPlainObject(value)) {
    return null;
  }

  for (const key of ["sign", "outcome", "value"]) {
    if (value[key] === -1 || value[key] === 1) {
      return { sign: value[key], source_detail: key };
    }
  }

  const distributionSign = deterministicDistributionValue(value);
  if (distributionSign) {
    return { sign: distributionSign, source_detail: "deterministic_distribution" };
  }

  return null;
}

function explicitLocalResponseSign(record, party, setting) {
  const containers = [
    ["local_response", record.local_response],
    ["local_responses", record.local_responses],
    ["local_apparatus_response", record.local_apparatus_response],
    ["local_apparatus_responses", record.local_apparatus_responses],
    ["local", record.local],
  ];

  for (const [source, container] of containers) {
    const direct = container?.[party]?.[setting];
    const parsedDirect = parseSign(direct);
    if (parsedDirect) {
      return { sign: parsedDirect.sign, source: `${source}.${party}.${setting}` };
    }

    const flat = container?.[`${party}_${setting}`] ?? container?.[`${party}:${setting}`];
    const parsedFlat = parseSign(flat);
    if (parsedFlat) {
      return { sign: parsedFlat.sign, source: `${source}.${party}_${setting}` };
    }
  }

  return null;
}

function screeningRecord(context, recordId) {
  return context.screening?.records?.find((record) => record.id === recordId) ?? null;
}

function screeningLocalSign(context, recordId, party) {
  const record = screeningRecord(context, recordId);
  if (!record) {
    return null;
  }
  const sign = deterministicDistributionValue(record.local?.[party]);
  return sign ? { sign, source: `screening_local_response:${context.id}` } : null;
}

function setLocalSign(result, party, setting, sign, source) {
  const current = result.signs[party][setting];
  if (current === null) {
    result.signs[party][setting] = sign;
    result.sources[party][setting] = source;
    return;
  }
  if (current !== sign) {
    result.conflicts.push({
      party,
      setting,
      left: current,
      right: sign,
      source,
    });
  }
}

function localResponseReplay(recordEntry, entries) {
  const aSettings = unique(entries.map((entry) => entry.settings.A));
  const bSettings = unique(entries.map((entry) => entry.settings.B));
  const result = {
    signs: {
      A: Object.fromEntries(aSettings.map((setting) => [setting, null])),
      B: Object.fromEntries(bSettings.map((setting) => [setting, null])),
    },
    sources: {
      A: Object.fromEntries(aSettings.map((setting) => [setting, "missing"])),
      B: Object.fromEntries(bSettings.map((setting) => [setting, "missing"])),
    },
    conflicts: [],
  };

  for (const setting of aSettings) {
    const explicit = explicitLocalResponseSign(recordEntry.record, "A", setting);
    if (explicit) {
      setLocalSign(result, "A", setting, explicit.sign, explicit.source);
    }
  }
  for (const setting of bSettings) {
    const explicit = explicitLocalResponseSign(recordEntry.record, "B", setting);
    if (explicit) {
      setLocalSign(result, "B", setting, explicit.sign, explicit.source);
    }
  }

  for (const { context, settings } of entries) {
    const a = screeningLocalSign(context, recordEntry.id, "A");
    if (a) {
      setLocalSign(result, "A", settings.A, a.sign, a.source);
    }
    const b = screeningLocalSign(context, recordEntry.id, "B");
    if (b) {
      setLocalSign(result, "B", settings.B, b.sign, b.source);
    }
  }

  return result;
}

function completeLocalResponse(localReplay) {
  return Object.values(localReplay.signs).every((bySetting) =>
    Object.values(bySetting).every((value) => value === -1 || value === 1)
  );
}

function unique(values) {
  return [...new Set(values)];
}

function thresholdIntervalSign(record, context) {
  const interval =
    record.correlation_interval ??
    record.eta_AB_interval ??
    record.local_record_cycle_coordinate?.eta_AB_interval;
  const threshold = context.basin_threshold ?? context.eta_AB_threshold;

  if (!Array.isArray(interval) || interval.length !== 2 || typeof threshold !== "number") {
    return null;
  }

  const [etaMin, etaMax] = interval;
  if (
    typeof etaMin !== "number" ||
    typeof etaMax !== "number" ||
    etaMin < -EPS ||
    etaMax > 1 + EPS ||
    etaMin > etaMax + EPS
  ) {
    return null;
  }

  if (etaMax <= threshold + EPS) {
    return { sign: 1, source: "threshold_interval" };
  }
  if (etaMin >= threshold - EPS) {
    return { sign: -1, source: "threshold_interval" };
  }
  return { sign: null, reason: "record_interval_straddles_context_threshold" };
}

function declaredContextPairSign(recordEntry, entry) {
  const a = screeningLocalSign(entry.context, recordEntry.id, "A");
  const b = screeningLocalSign(entry.context, recordEntry.id, "B");
  if (a && b) {
    return { sign: a.sign * b.sign, source: "screening_local_response" };
  }

  const threshold = thresholdIntervalSign(recordEntry.record, entry.context);
  if (threshold) {
    return threshold;
  }

  return { sign: null, reason: "no_declared_context_pair_sign" };
}

function replayedPairSigns(localReplay, entries) {
  if (!completeLocalResponse(localReplay)) {
    return null;
  }
  return Object.fromEntries(
    entries.map(({ key, settings }) => [
      key,
      localReplay.signs.A[settings.A] * localReplay.signs.B[settings.B],
    ])
  );
}

function parityProduct(signs) {
  const values = Object.values(signs);
  if (values.some((value) => value !== -1 && value !== 1)) {
    return null;
  }
  return values.reduce((product, value) => product * value, 1);
}

function sourceSummary(record) {
  return {
    phase_certificate_id:
      record.phase_certificate_id ??
      record.phase_certificate?.id ??
      record.branch_certificate_id ??
      null,
    varphi_Pi_status:
      record.varphi_Pi_status ??
      record.phi_Pi_status ??
      record.phase_certificate?.status ??
      record.retained_pair_provenance?.phi_Pi_status ??
      "not_declared",
    eta_AB_interval:
      record.eta_AB_interval ??
      record.local_record_cycle_coordinate?.eta_AB_interval ??
      null,
    correlation_interval: record.correlation_interval ?? null,
    retained_pair_provenance_status:
      record.retained_pair_provenance?.status ??
      record.retained_pair_provenance?.angular_momentum_balance ??
      null,
  };
}

function localResidualObject(record, party, setting) {
  const containers = [
    record.local_record_residuals,
    record.local_apparatus_residuals,
    record.local_apparatus_records?.residuals,
    record.local_response?.[party]?.[setting]?.residuals,
    record.local_responses?.[party]?.[setting]?.residuals,
    record.local_apparatus_response?.[party]?.[setting]?.residuals,
    record.local_apparatus_responses?.[party]?.[setting]?.residuals,
  ];

  for (const container of containers) {
    if (!isPlainObject(container)) {
      continue;
    }
    const direct = container?.[party]?.[setting] ?? container?.[`${party}_${setting}`] ?? container?.[`${party}:${setting}`];
    if (isPlainObject(direct)) {
      return direct;
    }
    if (RESIDUAL_KEYS.some((key) => typeof container[key] === "number")) {
      return container;
    }
  }

  return null;
}

function localRecordResidualReport(record, entries) {
  const report = {};
  const missing = [];
  for (const party of ["A", "B"]) {
    const settings = unique(entries.map((entry) => entry.settings[party]));
    report[party] = {};
    for (const setting of settings) {
      const source = localResidualObject(record, party, setting);
      const row = {};
      const missingForSetting = [];
      for (const key of RESIDUAL_KEYS) {
        const value = source?.[key];
        row[key] = typeof value === "number" && Number.isFinite(value) ? value : null;
        if (row[key] === null) {
          missingForSetting.push(key);
          missing.push(`${party}.${setting}.${key}`);
        }
      }
      row.status = missingForSetting.length === 0 ? "complete" : "missing";
      report[party][setting] = row;
    }
  }
  return { report, missing };
}

function replayRecord(recordEntry, entries) {
  const localReplay = localResponseReplay(recordEntry, entries);
  const declaredPairSigns = {};
  const declaredPairSources = {};
  const missingDeclaredPairSigns = [];

  for (const entry of entries) {
    const declared = declaredContextPairSign(recordEntry, entry);
    declaredPairSigns[entry.key] = declared.sign ?? null;
    declaredPairSources[entry.key] = declared.source ?? declared.reason;
    if (declared.sign !== -1 && declared.sign !== 1) {
      missingDeclaredPairSigns.push(entry.key);
    }
  }

  const replayPairs = replayedPairSigns(localReplay, entries);
  const replayConflicts = [];
  if (replayPairs) {
    for (const [key, sign] of Object.entries(replayPairs)) {
      if (declaredPairSigns[key] === -1 || declaredPairSigns[key] === 1) {
        if (declaredPairSigns[key] !== sign) {
          replayConflicts.push({ context: key, declared: declaredPairSigns[key], replayed: sign });
        }
      }
    }
  }

  const declaredParity = missingDeclaredPairSigns.length === 0 ? parityProduct(declaredPairSigns) : null;
  const replayedParity = replayPairs ? parityProduct(replayPairs) : null;
  const localComplete = completeLocalResponse(localReplay);
  const residuals = localRecordResidualReport(recordEntry.record, entries);
  const missingLocalResponse = [];
  for (const [party, bySetting] of Object.entries(localReplay.signs)) {
    for (const [setting, value] of Object.entries(bySetting)) {
      if (value !== -1 && value !== 1) {
        missingLocalResponse.push(`${party}.${setting}`);
      }
    }
  }

  const status = recordStatus({
    declaredParity,
    localComplete,
    localResponseConflicts: localReplay.conflicts,
    replayConflicts,
    missingResidualCount: residuals.missing.length,
  });

  return {
    id: recordEntry.id,
    weight: recordEntry.weight,
    source: recordEntry.source,
    source_row: sourceSummary(recordEntry.record),
    local_response_availability: availabilityMap(localReplay),
    local_response_signs: localReplay.signs,
    local_response_sources: localReplay.sources,
    local_response_conflicts: localReplay.conflicts,
    missing_local_response: missingLocalResponse,
    declared_pair_signs: declaredPairSigns,
    declared_pair_sources: declaredPairSources,
    declared_parity_product: declaredParity,
    replayed_pair_signs: replayPairs,
    replayed_parity_product: replayedParity,
    replay_conflicts: replayConflicts,
    local_record_residuals: residuals.report,
    missing_local_record_residuals: residuals.missing,
    status,
  };
}

function availabilityMap(localReplay) {
  return Object.fromEntries(
    Object.entries(localReplay.signs).map(([party, bySetting]) => [
      party,
      Object.fromEntries(
        Object.entries(bySetting).map(([setting, value]) => [
          setting,
          value === -1 || value === 1 ? "available" : "missing",
        ])
      ),
    ])
  );
}

function recordStatus({
  declaredParity,
  localComplete,
  localResponseConflicts,
  replayConflicts,
  missingResidualCount,
}) {
  if (localResponseConflicts.length > 0 || replayConflicts.length > 0) {
    return "fail_context_table_conflicts_with_local_replay";
  }
  if (declaredParity === -1 && !localComplete) {
    return "failure_boundary_missing_local_response";
  }
  if (declaredParity === -1) {
    return "fail_complete_record_parity_obstruction";
  }
  if (!localComplete) {
    return "simulation_target_missing_local_response";
  }
  if (missingResidualCount > 0) {
    return "incomplete_local_record_residuals";
  }
  return "complete_local_replay_product_screened";
}

function scenarioStatus(summary) {
  if (summary.context_table_conflict_weight > EPS) {
    return "fail_context_table_conflicts_with_local_replay";
  }
  if (summary.Delta_par > EPS && summary.missing_local_response_weight > EPS) {
    return "failure_boundary_missing_local_response";
  }
  if (summary.Delta_par > EPS) {
    return "fail_complete_record_parity_obstruction";
  }
  if (summary.missing_local_response_weight > EPS) {
    return "simulation_target_missing_local_response";
  }
  if (summary.missing_local_record_residual_weight > EPS) {
    return "incomplete_local_record_residuals";
  }
  return "complete_local_replay_product_screened";
}

function replayScenario(scenario) {
  const entries = chshEntries(scenario);
  if (!entries) {
    return {
      id: scenario.id,
      status: "not_applicable",
      reason: "scenario has no CHSH declaration",
    };
  }

  const records = sourceEntries(scenario, entries);
  const recordReports = records.map((record) => replayRecord(record, entries));
  const summary = {
    checked_record_count: recordReports.length,
    total_weight: cleanNumber(recordReports.reduce((sum, record) => sum + record.weight, 0)),
    complete_local_replay_count: recordReports.filter((record) => record.missing_local_response.length === 0).length,
    missing_local_response_count: recordReports.filter((record) => record.missing_local_response.length > 0).length,
    missing_local_response_weight: cleanNumber(
      recordReports
        .filter((record) => record.missing_local_response.length > 0)
        .reduce((sum, record) => sum + record.weight, 0)
    ),
    missing_local_record_residual_count: recordReports.filter(
      (record) => record.missing_local_record_residuals.length > 0
    ).length,
    missing_local_record_residual_weight: cleanNumber(
      recordReports
        .filter((record) => record.missing_local_record_residuals.length > 0)
        .reduce((sum, record) => sum + record.weight, 0)
    ),
    obstructed_record_count: recordReports.filter((record) => record.declared_parity_product === -1).length,
    Delta_par: cleanNumber(
      recordReports
        .filter((record) => record.declared_parity_product === -1)
        .reduce((sum, record) => sum + record.weight, 0)
    ),
    context_table_conflict_weight: cleanNumber(
      recordReports
        .filter(
          (record) =>
            record.local_response_conflicts.length > 0 || record.replay_conflicts.length > 0
        )
        .reduce((sum, record) => sum + record.weight, 0)
    ),
  };
  summary.status = scenarioStatus(summary);
  summary.pass_fail =
    summary.status === "complete_local_replay_product_screened"
      ? "pass_replay_negative_for_bell_closure"
      : summary.status.startsWith("fail") || summary.status.startsWith("failure")
        ? "fail"
        : "incomplete";

  return {
    id: scenario.id,
    description: scenario.description ?? null,
    input_classification: scenario.classification ?? null,
    chsh_context_order: entries.map((entry) => entry.key),
    summary,
    records: recordReports,
  };
}

function cleanNumber(value) {
  return Math.abs(value) < 1e-15 ? 0 : value;
}

function emit(candidate, args) {
  const scenarios = selectedScenarios(candidateScenarios(candidate), args.scenario);
  return {
    artifact: "source-measure-local-response-replay",
    schema: "aaa-source-measure-local-response-replay/v1",
    generated_by: "scripts/quantum/source-measure-local-response-replay.mjs",
    candidate_path: args.candidate,
    comparison_level: "retained source-row local-response replay for CHSH contexts",
    benchmark_policy: {
      bell_closure_claimed: false,
      role:
        "Falsification fixture: a complete deterministic local replay product-screens; a parity obstruction without local replay remains a simulation target.",
    },
    scenarios: scenarios.map(replayScenario),
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const output = emit(readJson(args.candidate), args);
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
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
