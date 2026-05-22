#!/usr/bin/env node

import fs from "node:fs";

const EPS = 1e-12;
const SQRT_HALF = Math.SQRT1_2;
const P_SAME_LOW = (1 - SQRT_HALF) / 2;
const P_SAME_HIGH = (1 + SQRT_HALF) / 2;

const ANGLES = {
  A0: 0,
  A1: Math.PI / 2,
  B0: Math.PI / 4,
  B1: (3 * Math.PI) / 4,
};

const CHSH_CONTEXTS = [
  ["A0", "B0"],
  ["A0", "B1"],
  ["A1", "B0"],
  ["A1", "B1"],
];

function parseArgs(argv) {
  const args = {
    out: null,
    pretty: false,
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
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (args.out === undefined) {
    throw new Error("--out requires a path.");
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/quantum/source-measure-joint-basin-emitter.mjs [options]

Options:
  --out PATH  Write generated candidate JSON to PATH instead of stdout.
  --pretty    Pretty-print JSON output.
  --help      Show this help.

This emits a diagnostic source-measure candidate for the Bell-family harness.
It is an ideal joint-basin target, not an AAA Bell closure proof.`);
}

function thresholdBins() {
  return [
    {
      id: "low",
      eta_min: 0,
      eta_max: P_SAME_LOW,
      weight: P_SAME_LOW,
    },
    {
      id: "middle",
      eta_min: P_SAME_LOW,
      eta_max: P_SAME_HIGH,
      weight: SQRT_HALF,
    },
    {
      id: "high",
      eta_min: P_SAME_HIGH,
      eta_max: 1,
      weight: P_SAME_LOW,
    },
  ];
}

function sourceRecords() {
  return thresholdBins().flatMap((bin) =>
    [-1, 1].map((marginalSign) => ({
      id: `pi_${bin.id}_${marginalSign === -1 ? "minus" : "plus"}`,
      weight: bin.weight / 2,
      correlation_interval: [bin.eta_min, bin.eta_max],
      marginal_branch: marginalSign,
      retained_pair_provenance: {
        branch_bin: bin.id,
        marginal_branch: marginalSign,
        angular_momentum_balance: "singlet-like target ledger; not substrate-derived",
      },
    }))
  );
}

function recordCycleSourceRecords() {
  return thresholdBins().flatMap((bin) =>
    [-1, 1].map((marginalSign) => ({
      id: `rc_${bin.id}_${marginalSign === -1 ? "minus" : "plus"}`,
      weight: bin.weight / 2,
      eta_AB_interval: [bin.eta_min, bin.eta_max],
      marginal_branch: marginalSign,
      retained_pair_provenance: {
        branch_bin: bin.id,
        marginal_branch: marginalSign,
        angular_momentum_balance: "singlet-like target ledger; not substrate-derived",
        theta_AB_rel:
          "relative pair phase component retained by Theta_AB^rel; represented by phi_Pi_fraction here",
      },
      local_record_cycle_coordinate: {
        formula: "eta_AB = frac(theta_rec_A - theta_rec_B + phi_Pi)",
        theta_rec_A_fraction: [0, 0],
        theta_rec_B_fraction: [0, 0],
        phi_Pi_fraction: [bin.eta_min, bin.eta_max],
        eta_AB_interval: [bin.eta_min, bin.eta_max],
      },
    }))
  );
}

function singletCorrelation(aSetting, bSetting) {
  return -Math.cos(ANGLES[aSetting] - ANGLES[bSetting]);
}

function sameOutcomeThreshold(correlation) {
  return (1 + correlation) / 2;
}

function sameOutcome(record, threshold) {
  const [etaMin, etaMax] =
    record.correlation_interval ??
    record.eta_AB_interval ??
    record.local_record_cycle_coordinate?.eta_AB_interval;
  if (etaMax <= threshold + EPS) {
    return true;
  }
  if (etaMin >= threshold - EPS) {
    return false;
  }
  throw new Error(
    `${record.id} straddles basin threshold ${threshold}; split the source record first.`
  );
}

function outcomeKey(outcome) {
  return Object.entries(outcome)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([party, value]) => `${party}:${value}`)
    .join("|");
}

function parseOutcomeKey(key) {
  return Object.fromEntries(
    key.split("|").map((entry) => {
      const [party, value] = entry.split(":");
      return [party, Number(value)];
    })
  );
}

function contextProbabilities(records, aSetting, bSetting) {
  const correlation = singletCorrelation(aSetting, bSetting);
  const threshold = sameOutcomeThreshold(correlation);
  const distribution = {};

  for (const record of records) {
    const a = record.marginal_branch;
    const b = sameOutcome(record, threshold) ? a : -a;
    const key = outcomeKey({ A: a, B: b });
    distribution[key] = (distribution[key] ?? 0) + record.weight;
  }

  return Object.entries(distribution)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, p]) => ({ outcome: parseOutcomeKey(key), p }));
}

function contextScreening(records) {
  return {
    records: records.map((record) => ({
      id: record.id,
      weight: record.weight,
      local: {
        A: { "-1": 0.5, "1": 0.5 },
        B: { "-1": 0.5, "1": 0.5 },
      },
    })),
  };
}

function jointBasinContexts(records) {
  return CHSH_CONTEXTS.map(([aSetting, bSetting]) => {
    const correlation = singletCorrelation(aSetting, bSetting);
    return {
      id: `joint_basin_${aSetting}_${bSetting}`,
      settings: { A: aSetting, B: bSetting },
      target_correlation: correlation,
      basin_threshold: sameOutcomeThreshold(correlation),
      basin_rule:
        "same outcome when correlation_interval is below the context threshold; opposite outcome otherwise",
      probabilities: contextProbabilities(records, aSetting, bSetting),
      screening: contextScreening(records),
    };
  });
}

function recordCycleContexts(records) {
  return CHSH_CONTEXTS.map(([aSetting, bSetting]) => {
    const correlation = singletCorrelation(aSetting, bSetting);
    return {
      id: `record_cycle_${aSetting}_${bSetting}`,
      settings: { A: aSetting, B: bSetting },
      target_correlation: correlation,
      eta_AB_threshold: sameOutcomeThreshold(correlation),
      basin_rule:
        "same outcome when eta_AB_interval from the record-cycle coordinate lies below the context threshold; opposite outcome otherwise",
      probabilities: contextProbabilities(records, aSetting, bSetting),
      screening: contextScreening(records),
    };
  });
}

function candidate() {
  const records = sourceRecords();
  const recordCycleRecords = recordCycleSourceRecords();
  return {
    artifact: "bell-family-source-measure-candidate",
    generated_by: "scripts/quantum/source-measure-joint-basin-emitter.mjs",
    scenarios: [
      {
        id: "candidate_joint_record_basin_singlet_target",
        description:
          "Generated source-measure candidate for an ideal joint record-basin target; recovers the singlet CHSH benchmark but does not prove a substrate mechanism.",
        classification: "diagnostic_candidate",
        parties: ["A", "B"],
        source_protocol: {
          id: "ideal_joint_record_basin_target",
          source_section: "six-cell return section from a uniform correlation-threshold coordinate and marginal branch",
          measure:
            "setting-independent cell weights induced by splitting a uniform threshold coordinate at the benchmark basin thresholds",
        },
        source_records: records,
        source_balance: {
          status: "target_emitter",
          angular_momentum:
            "records preserve an effective singlet-like balance label; the Noether swarm derivation remains open",
          measurement_independence:
            "source weights are reused unchanged for every context",
        },
        local_apparatus_records: {
          status: "idealized",
          material_measure:
            "unbiased local marginal branch with no distant-setting dependence",
          unresolved_variable:
            "marginal_branch supplies unbiased local records; correlation_interval supplies joint-basin thresholding",
        },
        record_basins: {
          construction: "context-indexed joint basin over retained source records",
          threshold_coordinate: "correlation_interval",
          thresholds: {
            low: P_SAME_LOW,
            high: P_SAME_HIGH,
          },
          caveat:
            "the joint basin is a target object to be derived from apparatus and pair provenance, not an accepted mechanism",
        },
        compression_audit: {
          expected: "product_screening_escape_pass",
          baseline:
            "context screening uses the same source records with independent unbiased local marginals",
        },
        guardrails: {
          expected: [
            "no_signaling_pass",
            "measurement_independence_pass",
            "tsirelson_pass",
            "product_screening_escape_pass",
          ],
        },
        contexts: jointBasinContexts(records),
        chsh: {
          a0: "A0",
          a1: "A1",
          b0: "B0",
          b1: "B1",
        },
      },
      {
        id: "candidate_record_cycle_pair_coordinate",
        description:
          "Generated diagnostic for the pair record-cycle coordinate eta_AB = frac(theta_rec_A - theta_rec_B + phi_Pi); recovers the singlet CHSH benchmark as a reduced target without proving the substrate origin of phi_Pi.",
        classification: "diagnostic_candidate",
        parties: ["A", "B"],
        source_protocol: {
          id: "pair_record_cycle_coordinate_target",
          source_section:
            "six-cell return section from a uniform eta_AB pushforward and unbiased marginal branch",
          measure:
            "setting-independent cell weights; each source record carries a retained relative phase component and local record-cycle coordinate metadata",
        },
        source_records: recordCycleRecords,
        source_balance: {
          status: "target_emitter",
          angular_momentum:
            "records preserve an effective singlet-like balance label; deriving phi_Pi from the Noether swarm pair ledger remains open",
          measurement_independence:
            "source weights and retained eta_AB intervals are reused unchanged for every context",
        },
        local_apparatus_records: {
          status: "idealized_record_cycle_coordinate",
          material_measure:
            "local record-cycle phases are represented in normalized phase fractions; the emitted target uses the calibrated uniform-pushforward case",
          unresolved_variable:
            "theta_rec_A and theta_rec_B are local record-cycle phases; phi_Pi is the retained relative pair phase component",
        },
        record_basins: {
          construction:
            "context-indexed same/opposite basin over eta_AB generated from record-cycle coordinate metadata",
          threshold_coordinate:
            "eta_AB = frac(theta_rec_A - theta_rec_B + phi_Pi)",
          thresholds: {
            low: P_SAME_LOW,
            high: P_SAME_HIGH,
          },
          caveat:
            "the diagnostic tests the reduced coordinate shape; it does not derive phi_Pi or the local record-cycle measures from substrate dynamics",
        },
        compression_audit: {
          expected: "product_screening_escape_pass",
          baseline:
            "context screening uses the same source records with independent unbiased local marginals",
        },
        guardrails: {
          expected: [
            "no_signaling_pass",
            "measurement_independence_pass",
            "tsirelson_pass",
            "product_screening_escape_pass",
          ],
        },
        contexts: recordCycleContexts(recordCycleRecords),
        chsh: {
          a0: "A0",
          a1: "A1",
          b0: "B0",
          b1: "B1",
        },
      },
    ],
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const json = JSON.stringify(candidate(), null, args.pretty ? 2 : 0);
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
