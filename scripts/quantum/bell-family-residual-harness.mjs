#!/usr/bin/env node

import fs from "node:fs";

const EPS = 1e-9;
const SQRT2 = Math.sqrt(2);

function parseArgs(argv) {
  const args = {
    pretty: false,
    out: null,
    scenario: "all",
    candidate: null,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else if (arg === "--scenario") {
      args.scenario = argv[++i];
    } else if (arg === "--candidate") {
      args.candidate = argv[++i];
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (args.out === undefined) {
    throw new Error("--out requires a path.");
  }
  if (args.scenario === undefined) {
    throw new Error("--scenario requires an id.");
  }
  if (args.candidate === undefined) {
    throw new Error("--candidate requires a path.");
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/quantum/bell-family-residual-harness.mjs [options]

Options:
  --scenario ID  Scenario id to evaluate, or "all". Defaults to all.
  --candidate PATH
                 Read candidate scenario JSON instead of built-in scenarios.
  --out PATH     Write JSON output to a file instead of stdout.
  --pretty       Pretty-print JSON output.
  --help         Show this help.

This is a validation scaffold for Bell-family residuals. It evaluates
probability-table benchmarks and negative controls; it is not an AAA Bell
closure proof.`);
}

function outcomeKey(outcome) {
  return Object.entries(outcome)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([party, value]) => `${party}:${value}`)
    .join("|");
}

function contextKey(settings) {
  return Object.entries(settings)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([party, setting]) => `${party}:${setting}`)
    .join("|");
}

function assertProbabilityTable(context) {
  const total = context.probabilities.reduce((sum, row) => {
    if (typeof row.p !== "number" || !Number.isFinite(row.p) || row.p < -EPS) {
      throw new Error(`${context.id} has an invalid probability.`);
    }
    return sum + row.p;
  }, 0);
  if (Math.abs(total - 1) > 1e-8) {
    throw new Error(`${context.id} probabilities sum to ${total}, not 1.`);
  }
}

function tvDistance(left, right) {
  const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
  let total = 0;
  for (const key of keys) {
    total += Math.abs((left[key] ?? 0) - (right[key] ?? 0));
  }
  return 0.5 * total;
}

function l1Distance(left, right) {
  const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
  let total = 0;
  for (const key of keys) {
    total += Math.abs((left[key] ?? 0) - (right[key] ?? 0));
  }
  return total;
}

function contextBySettings(scenario) {
  const map = new Map();
  for (const context of scenario.contexts) {
    assertProbabilityTable(context);
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

function marginal(context, parties) {
  const selected = Array.isArray(parties) ? parties : [parties];
  const result = {};
  for (const row of context.probabilities) {
    const projection = {};
    for (const party of selected) {
      projection[party] = row.outcome[party];
    }
    const key = outcomeKey(projection);
    result[key] = (result[key] ?? 0) + row.p;
  }
  return result;
}

function correlation(context, parties) {
  return context.probabilities.reduce((sum, row) => {
    const product = parties.reduce((acc, party) => acc * Number(row.outcome[party]), 1);
    return sum + product * row.p;
  }, 0);
}

function eventProbability(context, event) {
  return context.probabilities.reduce((sum, row) => {
    for (const [party, value] of Object.entries(event)) {
      if (row.outcome[party] !== value) {
        return sum;
      }
    }
    return sum + row.p;
  }, 0);
}

function jointDistribution(context) {
  const result = {};
  for (const row of context.probabilities) {
    const key = outcomeKey(row.outcome);
    result[key] = (result[key] ?? 0) + row.p;
  }
  return result;
}

function productMarginalDistribution(context, parties) {
  const marginals = parties.map((party) => marginal(context, party));
  const keysByParty = marginals.map((dist) => Object.keys(dist));
  const result = {};

  function visit(index, outcome, probability) {
    if (index === parties.length) {
      result[outcomeKey(outcome)] = probability;
      return;
    }
    const party = parties[index];
    for (const key of keysByParty[index]) {
      const value = key.split(":")[1];
      visit(index + 1, { ...outcome, [party]: numericValue(value) }, probability * marginals[index][key]);
    }
  }

  visit(0, {}, 1);
  return result;
}

function numericValue(value) {
  const numeric = Number(value);
  return Number.isNaN(numeric) ? value : numeric;
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function assertNonemptyString(value, label) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${label} must be a nonempty string.`);
  }
}

function assertNumber(value, label) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number.`);
  }
}

function assertDistribution(distribution, label) {
  if (!isPlainObject(distribution)) {
    throw new Error(`${label} must be an object distribution.`);
  }
  const total = Object.entries(distribution).reduce((sum, [key, value]) => {
    assertNumber(value, `${label}.${key}`);
    if (value < -EPS) {
      throw new Error(`${label}.${key} must be nonnegative.`);
    }
    return sum + value;
  }, 0);
  if (Math.abs(total - 1) > 1e-8) {
    throw new Error(`${label} probabilities sum to ${total}, not 1.`);
  }
}

function chshContextEntries(scenario) {
  if (!scenario.chsh) {
    return null;
  }
  const { a0, a1, b0, b1 } = scenario.chsh;
  return [
    { key: `${a0}_${b0}`, context: findContext(scenario, { A: a0, B: b0 }) },
    { key: `${a0}_${b1}`, context: findContext(scenario, { A: a0, B: b1 }) },
    { key: `${a1}_${b0}`, context: findContext(scenario, { A: a1, B: b0 }) },
    { key: `${a1}_${b1}`, context: findContext(scenario, { A: a1, B: b1 }) },
  ];
}

function chshMetrics(scenario) {
  const entries = chshContextEntries(scenario);
  if (!entries) {
    return null;
  }
  const { sign = [1, -1, 1, 1] } = scenario.chsh;
  const expectations = entries.map(({ context }) => correlation(context, ["A", "B"]));
  const s = expectations.reduce((sum, value, index) => sum + sign[index] * value, 0);
  return {
    expectations: Object.fromEntries(entries.map(({ key }, index) => [key, expectations[index]])),
    S: s,
    abs_S: Math.abs(s),
    local_bound_excess: Math.max(0, Math.abs(s) - 2),
    tsirelson_excess: Math.max(0, Math.abs(s) - 2 * SQRT2),
  };
}

function ghzMetrics(scenario) {
  if (!scenario.ghz) {
    return null;
  }
  const contextExpectations = {};
  let residual = 0;
  for (const [label, sign] of Object.entries(scenario.ghz.signs)) {
    const settings = Object.fromEntries(
      scenario.parties.map((party, index) => [party, label[index]])
    );
    const context = findContext(scenario, settings);
    const expectation = correlation(context, scenario.parties);
    contextExpectations[label] = expectation;
    residual = Math.max(residual, Math.max(0, 1 - sign * expectation));
  }
  const signProduct = Object.values(scenario.ghz.signs).reduce((product, sign) => product * sign, 1);
  return {
    context_expectations: contextExpectations,
    sign_product: signProduct,
    residual,
  };
}

function hardyMetrics(scenario) {
  if (!scenario.hardy) {
    return null;
  }
  const terms = {};
  for (const term of scenario.hardy.terms) {
    const context = findContext(scenario, term.settings);
    terms[term.id] = eventProbability(context, term.event);
  }
  const margin = Math.max(
    0,
    terms.positive -
      scenario.hardy.zero_terms.reduce((sum, id) => sum + terms[id], 0)
  );
  return {
    terms,
    margin,
  };
}

function noSignalingMetrics(scenario) {
  let residual = 0;
  const witnesses = [];
  for (const party of scenario.parties) {
    const settings = new Set(scenario.contexts.map((context) => context.settings[party]));
    for (const setting of settings) {
      const matches = scenario.contexts.filter((context) => context.settings[party] === setting);
      for (let i = 0; i < matches.length; i += 1) {
        for (let j = i + 1; j < matches.length; j += 1) {
          const left = marginal(matches[i], party);
          const right = marginal(matches[j], party);
          const value = l1Distance(left, right);
          if (value > residual) {
            residual = value;
          }
          if (value > EPS) {
            witnesses.push({
              party,
              setting,
              contexts: [matches[i].id, matches[j].id],
              residual: value,
            });
          }
        }
      }
    }
  }
  return { residual, witnesses };
}

function measurementIndependenceMetrics(scenario) {
  const contexts = scenario.contexts.filter((context) => context.provenance);
  if (contexts.length === 0) {
    return null;
  }
  const baseline = contexts[0].provenance;
  let residual = 0;
  const witnesses = [];
  for (const context of contexts) {
    const value = tvDistance(baseline, context.provenance);
    residual = Math.max(residual, value);
    if (value > EPS) {
      witnesses.push({ context: context.id, residual: value });
    }
  }
  return { residual, baseline_context: contexts[0].id, witnesses };
}

function observedFactorizationMetrics(scenario) {
  let residual = 0;
  const byContext = {};
  for (const context of scenario.contexts) {
    const joint = jointDistribution(context);
    const product = productMarginalDistribution(context, scenario.parties);
    const value = tvDistance(joint, product);
    byContext[context.id] = value;
    residual = Math.max(residual, value);
  }
  return { residual, by_context: byContext };
}

function productScreeningMetrics(scenario) {
  const contexts = scenario.contexts.filter((context) => context.screening?.records?.length);
  if (contexts.length === 0) {
    return null;
  }

  let residual = 0;
  const byContext = {};
  const stateCounts = {};
  for (const context of contexts) {
    const observed = jointDistribution(context);
    const screened = productDistributionFromLocalRecords(context.screening.records, scenario.parties);
    const value = tvDistance(observed, screened);
    byContext[context.id] = value;
    stateCounts[context.id] = context.screening.records.length;
    residual = Math.max(residual, value);
  }

  return {
    residual,
    by_context: byContext,
    state_counts: stateCounts,
    reduces_to_product_screening: residual <= (scenario.thresholds.product_screening ?? EPS),
  };
}

function completeRecordParityMetrics(scenario) {
  const entries = chshContextEntries(scenario);
  if (!entries || scenario.parties.length !== 2 || !scenario.parties.includes("A") || !scenario.parties.includes("B")) {
    return null;
  }

  const records = completeRecordParityRecords(scenario, entries);
  if (records.length === 0) {
    return null;
  }

  const audits = records.map((record) => completeRecordParityAudit(record, entries));
  const checkedRecords = audits.filter((record) => record.status !== "incomplete");
  const obstructedRecords = audits.filter((record) => record.status === "obstructed");
  const incompleteRecords = audits.filter((record) => record.status === "incomplete");
  const obstructedWeight = obstructedRecords.reduce((sum, record) => sum + record.weight, 0);
  const incompleteWeight = incompleteRecords.reduce((sum, record) => sum + record.weight, 0);
  const includeAllRecords = Boolean(scenario.source_records) || audits.length <= 40;

  return {
    status:
      obstructedWeight > (scenario.thresholds.complete_record_parity ?? EPS)
        ? "fail"
        : incompleteRecords.length > 0
          ? "incomplete"
          : "pass",
    interpretation:
      "A deterministic complete local-response record must satisfy (A0B0)(A0B1)(A1B0)(A1B1)=+1.",
    context_order: entries.map(({ key }) => key),
    expected_local_response_parity: 1,
    record_source: scenario.source_records ? "source_records" : "screening_records",
    checked_record_count: checkedRecords.length,
    obstructed_record_count: obstructedRecords.length,
    obstructed_weight: obstructedWeight,
    incomplete_record_count: incompleteRecords.length,
    incomplete_weight: incompleteWeight,
    record_reports_complete: includeAllRecords,
    omitted_admissible_record_count: includeAllRecords
      ? 0
      : audits.filter((record) => record.status === "admissible").length,
    records: includeAllRecords
      ? audits
      : audits.filter((record) => record.status !== "admissible").slice(0, 40),
  };
}

function completeRecordParityRecords(scenario, entries) {
  if (Array.isArray(scenario.source_records) && scenario.source_records.length > 0) {
    return scenario.source_records.map((record) => ({
      id: record.id,
      weight: record.weight,
      record,
    }));
  }

  const records = new Map();
  for (const { context } of entries) {
    for (const record of context.screening?.records ?? []) {
      if (!records.has(record.id)) {
        records.set(record.id, {
          id: record.id,
          weight: record.weight,
          record,
        });
      }
    }
  }
  return [...records.values()];
}

function completeRecordParityAudit(recordEntry, entries) {
  const signs = {};
  const sources = {};
  const missing_contexts = [];
  let parityProduct = 1;

  for (const { key, context } of entries) {
    const inferred = completeRecordContextSign(recordEntry, context);
    if (!inferred.sign) {
      signs[key] = null;
      sources[key] = inferred.reason;
      missing_contexts.push(key);
      continue;
    }
    signs[key] = inferred.sign;
    sources[key] = inferred.source;
    parityProduct *= inferred.sign;
  }

  const status =
    missing_contexts.length > 0
      ? "incomplete"
      : parityProduct === 1
        ? "admissible"
        : "obstructed";

  return {
    id: recordEntry.id,
    weight: recordEntry.weight,
    signs,
    parity_product: missing_contexts.length > 0 ? null : parityProduct,
    status,
    sources,
    missing_contexts,
  };
}

function completeRecordContextSign(recordEntry, context) {
  const screeningRecord = context.screening?.records?.find((record) => record.id === recordEntry.id);
  const screeningSign = screeningRecord ? deterministicScreeningSign(screeningRecord) : null;
  if (screeningSign) {
    return { sign: screeningSign, source: "screening_local_response" };
  }

  const thresholdSign = thresholdIntervalSign(recordEntry.record, context);
  if (thresholdSign) {
    return thresholdSign;
  }

  return { sign: null, reason: "no_deterministic_record_context_sign" };
}

function deterministicScreeningSign(record) {
  const a = deterministicDistributionValue(record.local?.A);
  const b = deterministicDistributionValue(record.local?.B);
  return a === null || b === null ? null : a * b;
}

function deterministicDistributionValue(distribution) {
  if (!isPlainObject(distribution)) {
    return null;
  }
  let selected = null;
  for (const [key, probability] of Object.entries(distribution)) {
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

function gate(passed, value, threshold, code) {
  const status = passed ? "pass" : "fail";
  return {
    status,
    value,
    threshold,
    failure_code: status === "pass" ? null : code,
  };
}

function evaluateScenario(scenario) {
  const chsh = chshMetrics(scenario);
  const ghz = ghzMetrics(scenario);
  const hardy = hardyMetrics(scenario);
  const noSignaling = noSignalingMetrics(scenario);
  const measurementIndependence = measurementIndependenceMetrics(scenario);
  const observedFactorization = observedFactorizationMetrics(scenario);
  const productScreening = productScreeningMetrics(scenario);
  const completeRecordParity = completeRecordParityMetrics(scenario);

  const gates = {
    no_signaling: gate(
      noSignaling.residual <= scenario.thresholds.no_signaling,
      noSignaling.residual,
      scenario.thresholds.no_signaling,
      "bell.signal_transfer"
    ),
    measurement_independence: measurementIndependence
      ? gate(
          measurementIndependence.residual <= scenario.thresholds.measurement_independence,
          measurementIndependence.residual,
          scenario.thresholds.measurement_independence,
          "bell.measurement_independence_blur"
        )
      : null,
  };

  if (chsh) {
    gates.tsirelson = gate(
      chsh.tsirelson_excess <= scenario.thresholds.tsirelson_excess,
      chsh.tsirelson_excess,
      scenario.thresholds.tsirelson_excess,
      "bell.tsirelson_open"
    );
  }
  if (ghz) {
    gates.ghz = gate(
      ghz.residual <= scenario.thresholds.ghz,
      ghz.residual,
      scenario.thresholds.ghz,
      "bell.ghz_parity_open"
    );
  }
  if (hardy) {
    gates.hardy_margin = gate(
      hardy.margin > scenario.thresholds.hardy_margin,
      hardy.margin,
      scenario.thresholds.hardy_margin,
      "bell.hardy_margin_open"
    );
  }
  if (productScreening) {
    gates.product_screening_escape = gate(
      productScreening.residual > scenario.thresholds.product_screening,
      productScreening.residual,
      scenario.thresholds.product_screening,
      "bell.product_screening_collapse"
    );
  }
  if (completeRecordParity && completeRecordParity.checked_record_count > 0) {
    gates.complete_record_parity = gate(
      completeRecordParity.obstructed_weight <= scenario.thresholds.complete_record_parity,
      completeRecordParity.obstructed_weight,
      scenario.thresholds.complete_record_parity,
      "bell.complete_record_parity_obstruction"
    );
  }

  const failureCodes = Object.values(gates)
    .filter(Boolean)
    .filter((entry) => entry.status === "fail")
    .map((entry) => entry.failure_code);

  return {
    id: scenario.id,
    description: scenario.description,
    classification: scenario.classification,
    source_protocol: scenario.source_protocol ?? null,
    source_record_count: scenario.source_records?.length ?? null,
    metrics: {
      chsh,
      ghz,
      hardy,
      no_signaling: noSignaling,
      measurement_independence: measurementIndependence,
      observed_factorization: observedFactorization,
      product_screening: productScreening,
      complete_record_parity: completeRecordParity,
    },
    gates,
    witness_tags: witnessTags({
      chsh,
      ghz,
      hardy,
      noSignaling,
      measurementIndependence,
      productScreening,
      completeRecordParity,
    }),
    failure_codes: failureCodes,
  };
}

function witnessTags({
  chsh,
  ghz,
  hardy,
  noSignaling,
  measurementIndependence,
  productScreening,
  completeRecordParity,
}) {
  const tags = [];
  if (chsh?.local_bound_excess > EPS) {
    tags.push("bell.chsh_local_bound_violated");
  }
  if (chsh?.tsirelson_excess > EPS) {
    tags.push("bell.superquantum");
  }
  if (ghz?.residual <= EPS) {
    tags.push("bell.ghz_products_matched");
  }
  if (hardy?.margin > EPS) {
    tags.push("bell.hardy_positive_margin");
  }
  if (noSignaling.residual > EPS) {
    tags.push("bell.signal_transfer");
  }
  if (measurementIndependence?.residual > EPS) {
    tags.push("bell.measurement_independence_blur");
  }
  if (productScreening?.reduces_to_product_screening) {
    tags.push("bell.product_screening_collapse");
  }
  if (completeRecordParity?.obstructed_weight > EPS) {
    tags.push("bell.complete_record_parity_obstruction");
  }
  return tags;
}

function binaryDistribution(contextId, settings, correlationValue, provenance = { shared: 1 }) {
  const probabilities = [];
  for (const a of [-1, 1]) {
    for (const b of [-1, 1]) {
      probabilities.push({
        outcome: { A: a, B: b },
        p: 0.25 * (1 + a * b * correlationValue),
      });
    }
  }
  return { id: contextId, settings, probabilities, provenance };
}

function principalAngle(left, right) {
  let delta = Math.abs(left - right) % (2 * Math.PI);
  if (delta > Math.PI) {
    delta = 2 * Math.PI - delta;
  }
  return delta;
}

function singletCorrelation(left, right) {
  return -Math.cos(left - right);
}

function classicalAxisCorrelation(left, right) {
  return -1 + (2 * principalAngle(left, right)) / Math.PI;
}

function chshContexts(idPrefix, correlationFn, provenanceFor = () => ({ shared: 1 })) {
  const angles = {
    A0: 0,
    A1: Math.PI / 2,
    B0: Math.PI / 4,
    B1: (3 * Math.PI) / 4,
  };
  return [
    ["A0", "B0"],
    ["A0", "B1"],
    ["A1", "B0"],
    ["A1", "B1"],
  ].map(([a, b]) =>
    binaryDistribution(
      `${idPrefix}_${a}_${b}`,
      { A: a, B: b },
      correlationFn(angles[a], angles[b]),
      provenanceFor(a, b)
    )
  );
}

function productSignDistribution(id, settings, parties, sign, provenance = { shared: 1 }) {
  const rows = [];
  const outcomes = enumerateOutcomes(parties, [-1, 1]);
  const valid = outcomes.filter((outcome) =>
    parties.reduce((product, party) => product * outcome[party], 1) === sign
  );
  for (const outcome of valid) {
    rows.push({ outcome, p: 1 / valid.length });
  }
  return { id, settings, probabilities: rows, provenance };
}

function deterministicDistribution(id, settings, outcome, provenance = { shared: 1 }) {
  return { id, settings, probabilities: [{ outcome, p: 1 }], provenance };
}

function distributionRows(distribution) {
  return Object.entries(distribution)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, p]) => ({ outcome: parseOutcomeKey(key), p }));
}

function parseOutcomeKey(key) {
  return Object.fromEntries(
    key.split("|").map((entry) => {
      const [party, value] = entry.split(":");
      return [party, numericValue(value)];
    })
  );
}

function enumerateOutcomes(parties, values) {
  const result = [];
  function visit(index, outcome) {
    if (index === parties.length) {
      result.push(outcome);
      return;
    }
    const party = parties[index];
    for (const value of values) {
      visit(index + 1, { ...outcome, [party]: value });
    }
  }
  visit(0, {});
  return result;
}

function productDistributionFromLocalRecords(records, parties) {
  const result = {};

  for (const record of records) {
    function visit(index, outcome, probability) {
      if (index === parties.length) {
        const key = outcomeKey(outcome);
        result[key] = (result[key] ?? 0) + record.weight * probability;
        return;
      }
      const party = parties[index];
      const dist = record.local[party];
      for (const [value, p] of Object.entries(dist)) {
        visit(index + 1, { ...outcome, [party]: numericValue(value) }, probability * p);
      }
    }

    visit(0, {}, 1);
  }

  return result;
}

function provenanceDistribution(records) {
  return Object.fromEntries(records.map((record) => [record.id, record.weight]));
}

function uniformPlanarPairProvenance(count) {
  return Array.from({ length: count }, (_, index) => {
    const phi = ((index + 0.5) * 2 * Math.PI) / count;
    return {
      id: `pi_${String(index).padStart(3, "0")}`,
      weight: 1 / count,
      axis_A: phi,
      axis_B: phi + Math.PI,
    };
  });
}

function deterministicAxisKernel(settingAngle, pairRecord, axisKey) {
  const projection = Math.cos(settingAngle - pairRecord[axisKey]);
  const value = projection >= 0 ? 1 : -1;
  return { [value]: 1 };
}

function generatedPairProvenanceContext(id, settings, angles, pairRecords) {
  const screeningRecords = pairRecords.map((pairRecord) => ({
    id: pairRecord.id,
    weight: pairRecord.weight,
    local: {
      A: deterministicAxisKernel(angles[settings.A], pairRecord, "axis_A"),
      B: deterministicAxisKernel(angles[settings.B], pairRecord, "axis_B"),
    },
  }));

  return {
    id,
    settings,
    probabilities: distributionRows(productDistributionFromLocalRecords(screeningRecords, ["A", "B"])),
    provenance: provenanceDistribution(pairRecords),
    screening: {
      records: screeningRecords,
    },
  };
}

function generatedPairProvenanceContexts(idPrefix, count = 720) {
  const angles = {
    A0: 0,
    A1: Math.PI / 2,
    B0: Math.PI / 4,
    B1: (3 * Math.PI) / 4,
  };
  const pairRecords = uniformPlanarPairProvenance(count);
  return [
    ["A0", "B0"],
    ["A0", "B1"],
    ["A1", "B0"],
    ["A1", "B1"],
  ].map(([a, b]) =>
    generatedPairProvenanceContext(
      `${idPrefix}_${a}_${b}`,
      { A: a, B: b },
      angles,
      pairRecords
    )
  );
}

function hardyContext(id, settings, rows, provenance = { shared: 1 }) {
  return {
    id,
    settings,
    probabilities: rows.map(([a, b, p]) => ({ outcome: { A: a, B: b }, p })),
    provenance,
  };
}

function defaults(overrides = {}) {
  return {
    no_signaling: 1e-9,
    measurement_independence: 1e-9,
    tsirelson_excess: 1e-9,
    ghz: 1e-9,
    hardy_margin: 1e-9,
    product_screening: 1e-9,
    complete_record_parity: 1e-9,
    ...overrides,
  };
}

function readCandidateScenarios(candidatePath) {
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(candidatePath, "utf8"));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Unable to read candidate JSON ${candidatePath}: ${message}`);
  }

  const scenarios = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed?.scenarios)
      ? parsed.scenarios
      : [parsed];

  if (scenarios.length === 0) {
    throw new Error(`${candidatePath} contains no candidate scenarios.`);
  }

  return scenarios.map((scenario, index) =>
    normalizeCandidateScenario(scenario, `candidate scenario ${index + 1} in ${candidatePath}`)
  );
}

function normalizeCandidateScenario(scenario, label) {
  if (!isPlainObject(scenario)) {
    throw new Error(`${label} must be an object.`);
  }
  assertNonemptyString(scenario.id, `${label}.id`);
  if (!Array.isArray(scenario.parties) || scenario.parties.length === 0) {
    throw new Error(`${label}.parties must be a nonempty array.`);
  }
  const parties = scenario.parties.map((party, index) => {
    assertNonemptyString(party, `${label}.parties[${index}]`);
    return party;
  });

  assertObjectField(scenario, "source_protocol", label);
  assertObjectField(scenario, "source_balance", label);
  assertObjectField(scenario, "local_apparatus_records", label);
  assertObjectField(scenario, "record_basins", label);
  assertObjectField(scenario, "compression_audit", label);
  assertObjectField(scenario, "guardrails", label);

  const sourceRecords = normalizeSourceRecords(scenario.source_records, `${label}.source_records`);
  const thresholds = normalizeThresholds(scenario.thresholds, `${label}.thresholds`);
  if (!Array.isArray(scenario.contexts) || scenario.contexts.length === 0) {
    throw new Error(`${label}.contexts must be a nonempty array.`);
  }
  const contexts = scenario.contexts.map((context, index) =>
    normalizeCandidateContext(
      context,
      `${label}.contexts[${index}]`,
      parties,
      sourceRecords.records,
      sourceRecords.provenance
    )
  );

  return {
    ...scenario,
    classification: scenario.classification ?? "candidate",
    parties,
    source_records: sourceRecords.records,
    contexts,
    thresholds,
  };
}

function assertObjectField(scenario, key, label) {
  if (!isPlainObject(scenario[key])) {
    throw new Error(`${label}.${key} must be an object.`);
  }
}

function normalizeThresholds(thresholds, label) {
  if (thresholds === undefined) {
    return defaults();
  }
  if (!isPlainObject(thresholds)) {
    throw new Error(`${label} must be an object when present.`);
  }
  for (const [key, value] of Object.entries(thresholds)) {
    assertNumber(value, `${label}.${key}`);
    if (value < 0) {
      throw new Error(`${label}.${key} must be nonnegative.`);
    }
  }
  return defaults(thresholds);
}

function normalizeSourceRecords(records, label) {
  if (!Array.isArray(records) || records.length === 0) {
    throw new Error(`${label} must be a nonempty array.`);
  }

  let total = 0;
  const provenance = {};
  const normalized = records.map((record, index) => {
    const recordLabel = `${label}[${index}]`;
    if (!isPlainObject(record)) {
      throw new Error(`${recordLabel} must be an object.`);
    }
    assertNonemptyString(record.id, `${recordLabel}.id`);
    assertNumber(record.weight, `${recordLabel}.weight`);
    if (record.weight < -EPS) {
      throw new Error(`${recordLabel}.weight must be nonnegative.`);
    }
    if (record.local_response !== undefined) {
      validateLocalResponse(record.local_response, `${recordLabel}.local_response`);
    }
    total += record.weight;
    provenance[record.id] = record.weight;
    return record;
  });

  if (Math.abs(total - 1) > 1e-8) {
    throw new Error(`${label} weights sum to ${total}, not 1.`);
  }

  return { records: normalized, provenance };
}

function validateLocalResponse(localResponse, label) {
  if (!isPlainObject(localResponse)) {
    throw new Error(`${label} must be an object when present.`);
  }
  for (const [party, settings] of Object.entries(localResponse)) {
    if (!isPlainObject(settings)) {
      throw new Error(`${label}.${party} must be an object.`);
    }
    for (const [setting, distribution] of Object.entries(settings)) {
      assertDistribution(distribution, `${label}.${party}.${setting}`);
    }
  }
}

function normalizeCandidateContext(context, label, parties, sourceRecords, sourceProvenance) {
  if (!isPlainObject(context)) {
    throw new Error(`${label} must be an object.`);
  }
  assertNonemptyString(context.id, `${label}.id`);
  if (!isPlainObject(context.settings)) {
    throw new Error(`${label}.settings must be an object.`);
  }
  const settings = { ...context.settings };
  for (const party of parties) {
    if (!(party in settings)) {
      throw new Error(`${label}.settings is missing party ${party}.`);
    }
  }
  if (!Array.isArray(context.probabilities) || context.probabilities.length === 0) {
    throw new Error(`${label}.probabilities must be a nonempty array.`);
  }

  const probabilities = context.probabilities.map((row, index) =>
    normalizeProbabilityRow(row, `${label}.probabilities[${index}]`, parties)
  );
  const provenance = context.provenance ?? sourceProvenance;
  if (provenance) {
    assertDistribution(provenance, `${label}.provenance`);
  }

  const screening =
    context.screening ??
    buildScreeningFromLocalResponses(sourceRecords, parties, settings);

  return {
    ...context,
    settings,
    probabilities,
    provenance,
    screening: screening ? normalizeScreening(screening, `${label}.screening`, parties) : undefined,
  };
}

function normalizeProbabilityRow(row, label, parties) {
  if (!isPlainObject(row)) {
    throw new Error(`${label} must be an object.`);
  }
  if (!isPlainObject(row.outcome)) {
    throw new Error(`${label}.outcome must be an object.`);
  }
  assertNumber(row.p, `${label}.p`);
  if (row.p < -EPS) {
    throw new Error(`${label}.p must be nonnegative.`);
  }
  const outcome = {};
  for (const party of parties) {
    if (!(party in row.outcome)) {
      throw new Error(`${label}.outcome is missing party ${party}.`);
    }
    outcome[party] = row.outcome[party];
  }
  return { outcome, p: row.p };
}

function buildScreeningFromLocalResponses(sourceRecords, parties, settings) {
  if (!sourceRecords.every((record) => isPlainObject(record.local_response))) {
    return null;
  }

  return {
    records: sourceRecords.map((record) => {
      const local = {};
      for (const party of parties) {
        const setting = settings[party];
        const distribution = record.local_response?.[party]?.[setting];
        if (!distribution) {
          throw new Error(
            `source record ${record.id} is missing local_response.${party}.${setting}.`
          );
        }
        local[party] = distribution;
      }
      return {
        id: record.id,
        weight: record.weight,
        local,
      };
    }),
  };
}

function normalizeScreening(screening, label, parties) {
  if (!isPlainObject(screening)) {
    throw new Error(`${label} must be an object.`);
  }
  if (!Array.isArray(screening.records) || screening.records.length === 0) {
    throw new Error(`${label}.records must be a nonempty array.`);
  }
  let total = 0;
  const records = screening.records.map((record, index) => {
    const recordLabel = `${label}.records[${index}]`;
    if (!isPlainObject(record)) {
      throw new Error(`${recordLabel} must be an object.`);
    }
    assertNonemptyString(record.id, `${recordLabel}.id`);
    assertNumber(record.weight, `${recordLabel}.weight`);
    if (record.weight < -EPS) {
      throw new Error(`${recordLabel}.weight must be nonnegative.`);
    }
    if (!isPlainObject(record.local)) {
      throw new Error(`${recordLabel}.local must be an object.`);
    }
    const local = {};
    for (const party of parties) {
      if (!isPlainObject(record.local[party])) {
        throw new Error(`${recordLabel}.local.${party} must be a distribution.`);
      }
      assertDistribution(record.local[party], `${recordLabel}.local.${party}`);
      local[party] = record.local[party];
    }
    total += record.weight;
    return { id: record.id, weight: record.weight, local };
  });

  if (Math.abs(total - 1) > 1e-8) {
    throw new Error(`${label}.records weights sum to ${total}, not 1.`);
  }

  return { ...screening, records };
}

const SCENARIOS = [
  {
    id: "chsh_quantum_singlet",
    description: "Unbiased singlet-table CHSH benchmark with |S| = 2 sqrt(2).",
    classification: "benchmark",
    parties: ["A", "B"],
    contexts: chshContexts("singlet", singletCorrelation),
    chsh: { a0: "A0", a1: "A1", b0: "B0", b1: "B1" },
    thresholds: defaults(),
  },
  {
    id: "local_classical_axis",
    description: "Classical opposite-axis response with the known linear correlation failure.",
    classification: "negative_control",
    parties: ["A", "B"],
    contexts: chshContexts("axis", classicalAxisCorrelation),
    chsh: { a0: "A0", a1: "A1", b0: "B0", b1: "B1" },
    thresholds: defaults(),
  },
  {
    id: "separable_pair_measure",
    description: "Independent unbiased outcomes for every CHSH context.",
    classification: "negative_control",
    parties: ["A", "B"],
    contexts: chshContexts("separable", () => 0),
    chsh: { a0: "A0", a1: "A1", b0: "B0", b1: "B1" },
    thresholds: defaults(),
  },
  {
    id: "generated_pair_provenance_screened_axis",
    description: "Generated pair-provenance grid with local axis kernels; deliberately collapses to Bell-local product screening.",
    classification: "negative_control",
    parties: ["A", "B"],
    contexts: generatedPairProvenanceContexts("generated_axis"),
    chsh: { a0: "A0", a1: "A1", b0: "B0", b1: "B1" },
    thresholds: defaults(),
  },
  {
    id: "setting_dependent_provenance",
    description: "Singlet probabilities with setting-dependent provenance labels; catches measurement-independence leakage.",
    classification: "negative_control",
    parties: ["A", "B"],
    contexts: chshContexts("mi_leak", singletCorrelation, (a, b) => ({
      shared: a === "A0" && b === "B0" ? 0.7 : 0.3,
      leaked: a === "A0" && b === "B0" ? 0.3 : 0.7,
    })),
    chsh: { a0: "A0", a1: "A1", b0: "B0", b1: "B1" },
    thresholds: defaults(),
  },
  {
    id: "signaling_box",
    description: "A two-party box where Alice's marginal changes with Bob's setting.",
    classification: "negative_control",
    parties: ["A", "B"],
    contexts: [
      binaryDistribution("signal_A0_B0", { A: "A0", B: "B0" }, 0),
      {
        id: "signal_A0_B1",
        settings: { A: "A0", B: "B1" },
        probabilities: [
          { outcome: { A: -1, B: -1 }, p: 0.05 },
          { outcome: { A: -1, B: 1 }, p: 0.05 },
          { outcome: { A: 1, B: -1 }, p: 0.45 },
          { outcome: { A: 1, B: 1 }, p: 0.45 },
        ],
        provenance: { shared: 1 },
      },
      binaryDistribution("signal_A1_B0", { A: "A1", B: "B0" }, 0),
      binaryDistribution("signal_A1_B1", { A: "A1", B: "B1" }, 0),
    ],
    chsh: { a0: "A0", a1: "A1", b0: "B0", b1: "B1" },
    thresholds: defaults(),
  },
  {
    id: "ghz_product_benchmark",
    description: "GHZ product-sign table with product signs multiplying to -1.",
    classification: "benchmark",
    parties: ["A", "B", "C"],
    contexts: [
      productSignDistribution("ghz_XXX", { A: "X", B: "X", C: "X" }, ["A", "B", "C"], -1),
      productSignDistribution("ghz_XYY", { A: "X", B: "Y", C: "Y" }, ["A", "B", "C"], 1),
      productSignDistribution("ghz_YXY", { A: "Y", B: "X", C: "Y" }, ["A", "B", "C"], 1),
      productSignDistribution("ghz_YYX", { A: "Y", B: "Y", C: "X" }, ["A", "B", "C"], 1),
    ],
    ghz: { signs: { XXX: -1, XYY: 1, YXY: 1, YYX: 1 } },
    thresholds: defaults(),
  },
  {
    id: "ghz_local_value_table",
    description: "A context-independent local X/Y value table; fails GHZ parity.",
    classification: "negative_control",
    parties: ["A", "B", "C"],
    contexts: [
      deterministicDistribution("local_XXX", { A: "X", B: "X", C: "X" }, { A: 1, B: 1, C: 1 }),
      deterministicDistribution("local_XYY", { A: "X", B: "Y", C: "Y" }, { A: 1, B: 1, C: 1 }),
      deterministicDistribution("local_YXY", { A: "Y", B: "X", C: "Y" }, { A: 1, B: 1, C: 1 }),
      deterministicDistribution("local_YYX", { A: "Y", B: "Y", C: "X" }, { A: 1, B: 1, C: 1 }),
    ],
    ghz: { signs: { XXX: -1, XYY: 1, YXY: 1, YYX: 1 } },
    thresholds: defaults(),
  },
  {
    id: "hardy_no_signaling_margin",
    description: "No-signaling Hardy-pattern box with three zero terms and a positive event.",
    classification: "benchmark",
    parties: ["A", "B"],
    contexts: [
      hardyContext("hardy_UU", { A: "U", B: "U" }, [
        [0, 0, 0],
        [0, 1, 0.5],
        [1, 0, 0.5],
        [1, 1, 0],
      ]),
      hardyContext("hardy_DU", { A: "D", B: "U" }, [
        [0, 0, 0.5],
        [0, 1, 0],
        [1, 0, 0],
        [1, 1, 0.5],
      ]),
      hardyContext("hardy_UD", { A: "U", B: "D" }, [
        [0, 0, 0.5],
        [0, 1, 0],
        [1, 0, 0],
        [1, 1, 0.5],
      ]),
      hardyContext("hardy_DD", { A: "D", B: "D" }, [
        [0, 0, 0.09],
        [0, 1, 0.41],
        [1, 0, 0.41],
        [1, 1, 0.09],
      ]),
    ],
    hardy: {
      zero_terms: ["uu_forbidden", "du_forbidden", "ud_forbidden"],
      terms: [
        { id: "uu_forbidden", settings: { A: "U", B: "U" }, event: { A: 1, B: 1 } },
        { id: "du_forbidden", settings: { A: "D", B: "U" }, event: { A: 1, B: 0 } },
        { id: "ud_forbidden", settings: { A: "U", B: "D" }, event: { A: 0, B: 1 } },
        { id: "positive", settings: { A: "D", B: "D" }, event: { A: 1, B: 1 } },
      ],
    },
    thresholds: defaults(),
  },
  {
    id: "hardy_local_forbidden_event",
    description: "Local-realist Hardy repair: the positive event is offset by the forbidden U,U event.",
    classification: "negative_control",
    parties: ["A", "B"],
    contexts: [
      hardyContext("hardy_local_UU", { A: "U", B: "U" }, [
        [0, 0, 0.41],
        [0, 1, 0.25],
        [1, 0, 0.25],
        [1, 1, 0.09],
      ]),
      hardyContext("hardy_local_DU", { A: "D", B: "U" }, [
        [0, 0, 0.5],
        [0, 1, 0],
        [1, 0, 0],
        [1, 1, 0.5],
      ]),
      hardyContext("hardy_local_UD", { A: "U", B: "D" }, [
        [0, 0, 0.5],
        [0, 1, 0],
        [1, 0, 0],
        [1, 1, 0.5],
      ]),
      hardyContext("hardy_local_DD", { A: "D", B: "D" }, [
        [0, 0, 0.09],
        [0, 1, 0.41],
        [1, 0, 0.41],
        [1, 1, 0.09],
      ]),
    ],
    hardy: {
      zero_terms: ["uu_forbidden", "du_forbidden", "ud_forbidden"],
      terms: [
        { id: "uu_forbidden", settings: { A: "U", B: "U" }, event: { A: 1, B: 1 } },
        { id: "du_forbidden", settings: { A: "D", B: "U" }, event: { A: 1, B: 0 } },
        { id: "ud_forbidden", settings: { A: "U", B: "D" }, event: { A: 0, B: 1 } },
        { id: "positive", settings: { A: "D", B: "D" }, event: { A: 1, B: 1 } },
      ],
    },
    thresholds: defaults(),
  },
];

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const scenarioPool = args.candidate
    ? readCandidateScenarios(args.candidate)
    : SCENARIOS;
  const selected =
    args.scenario === "all"
      ? scenarioPool
      : scenarioPool.filter((scenario) => scenario.id === args.scenario);

  if (selected.length === 0) {
    throw new Error(`Unknown scenario: ${args.scenario}`);
  }

  const result = {
    metadata: {
      artifact: "bell-family-residual-harness",
      comparison_level: "probability-table validation scaffold",
      note: "Benchmarks and negative controls only; not an AAA Bell closure proof.",
      source: args.candidate ? "candidate" : "built_in",
      candidate_path: args.candidate,
    },
    scenarios: selected.map(evaluateScenario),
  };

  const json = JSON.stringify(result, null, args.pretty ? 2 : 0);
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
