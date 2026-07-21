#!/usr/bin/env node

// Converts a `borg-fixture-trajectory.v1`-shaped replay file (the attractor
// ensemble harness's current output) into an `assembly-view-record.v0` file
// that the viewer apps replay directly (borg.html?eomRecord=<url>).
//
// Viewer-not-instrument rule: this converter computes no physics. It rebuilds
// display-only piecewise-cubic segments from the replay's own sampled
// position+velocity rows using the declared cubic-Hermite interpolation rule
// (`piecewise-cubic-hermite/v0` — the same rule Borg's EOM seed import uses),
// and stamps that reconstruction into the record's provenance. Because these
// cubics are not the EOM solver's published retained-history segments, every
// converted record is a chart hypothesis and display-only. The source evidence
// status is retained as metadata only and is never inherited or consumed as
// authority.
//
// Usage:
//   node scripts/eom/convert-borg-trajectory-to-assembly-view-record.mjs \
//     --in <replay.borg-trajectory.json> --out <record.json> \
//     [--engine-id eom-solver] [--generating-spec <path-or-id>] [--delay-horizon <h>]

import fs from "node:fs";

export const ASSEMBLY_VIEW_RECORD_SCHEMA = "assembly-view-record.v0";
export const ASSEMBLY_VIEW_CONVERTER_ID =
  "convert-borg-trajectory-to-assembly-view-record.v0";

const POSITRINO_STATE_FLAG = 1;
const ELECTRINO_STATE_FLAG = 2;
const AXES = ["x", "y", "z"];

export function convertBorgTrajectoryToAssemblyViewRecord(trajectory, options = {}) {
  if (trajectory?.schema !== "borg-fixture-trajectory.v1") {
    throw new TypeError(
      `converter requires a borg-fixture-trajectory.v1 replay; received ${String(trajectory?.schema ?? "none")}.`,
    );
  }
  const rows = trajectory.currentStateFrames;
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new TypeError("converter requires nonempty currentStateFrames rows.");
  }
  const runId = String(trajectory.runId ?? "");
  if (runId.length === 0) {
    throw new TypeError("converter requires the replay to carry a runId.");
  }
  const engineVersion = requiredConcreteString(
    options.engineVersion ?? trajectory.engineVersion ?? trajectory.engineBuildId,
    "engineVersion",
  );
  const generatingSpec = requiredConcreteString(
    options.generatingSpec ?? trajectory.generatingSpec,
    "generatingSpec",
  );
  const delayHorizon = requiredFiniteNumber(
    options.delayHorizon ?? trajectory.historyDepth,
    "delayHorizon",
  );
  if (delayHorizon < 0) {
    throw new TypeError("converter delayHorizon must be nonnegative.");
  }
  const byPathKey = new Map();
  rows.forEach((row) => {
    const pathKey = Number(row.pathKey);
    const pathRows = byPathKey.get(pathKey) ?? [];
    pathRows.push(row);
    byPathKey.set(pathKey, pathRows);
  });
  const worldlines = [...byPathKey.entries()]
    .sort(([left], [right]) => left - right)
    .map(([pathKey, pathRows]) => createWorldlineFromRows(pathKey, pathRows));
  const start = Math.max(...worldlines.map((worldline) => Number(worldline.coverageStart)));
  const end = Math.min(...worldlines.map((worldline) => Number(worldline.coverageEnd)));
  return {
    schema: ASSEMBLY_VIEW_RECORD_SCHEMA,
    provenance: {
      engineId: options.engineId ?? "eom-solver",
      engineVersion,
      runId,
      claimGrade: "chart-hypothesis",
      evidenceStatus: "display-only",
      generatingSpec,
      date: options.date ?? new Date().toISOString().slice(0, 10),
      conversion: {
        converter: ASSEMBLY_VIEW_CONVERTER_ID,
        sourceSchema: "borg-fixture-trajectory.v1",
        sourceClaimLevel: trajectory.claimLevel ?? null,
        sourceRecordAuthority: trajectory.recordAuthority ?? null,
        sourceEvidenceStatus: trajectory.eomEvidenceStatus ?? null,
        interpolation: "piecewise-cubic-hermite/v0",
      },
    },
    window: {
      start,
      end,
      delayHorizon,
      sampleInterval: requiredFiniteNumber(trajectory.sampleInterval, "sampleInterval"),
    },
    worldlines,
    binaries: [],
    ansatz: [],
    events: [],
  };
}

function createWorldlineFromRows(pathKey, rows) {
  rows.sort((left, right) => Number(left.time) - Number(right.time));
  const uniqueRows = rows.filter(
    (row, index) => index === 0 || Number(row.time) > Number(rows[index - 1].time),
  );
  if (uniqueRows.length < 2) {
    throw new TypeError(
      `converter requires at least two sampled times for path ${pathKey}.`,
    );
  }
  const segments = [];
  for (let index = 0; index + 1 < uniqueRows.length; index += 1) {
    segments.push(createHermiteSegment(uniqueRows[index], uniqueRows[index + 1]));
  }
  const stateFlags = Number(uniqueRows[0].stateFlags) || 0;
  return {
    id: String(pathKey),
    pathKey,
    polarity: polarityForStateFlags(stateFlags),
    charge: String(polarityForStateFlags(stateFlags)),
    stateFlags,
    coverageStart: String(Number(uniqueRows[0].time)),
    coverageEnd: String(Number(uniqueRows.at(-1).time)),
    interpolation: "piecewise-cubic-hermite/v0",
    segments,
  };
}

function createHermiteSegment(start, end) {
  const t0 = Number(start.time);
  const t1 = Number(end.time);
  const duration = t1 - t0;
  if (!(duration > 0)) {
    throw new TypeError("converter requires strictly increasing sample times.");
  }
  const coefficients = AXES.map((axis) => {
    const x0 = requiredFiniteNumber(start.position?.[axis], `${axis} start position`);
    const x1 = requiredFiniteNumber(end.position?.[axis], `${axis} end position`);
    const v0 = requiredFiniteNumber(start.velocity?.[axis], `${axis} start velocity`);
    const v1 = requiredFiniteNumber(end.velocity?.[axis], `${axis} end velocity`);
    const delta = x1 - x0;
    return [
      String(x0),
      String(v0),
      String((3 * delta) / duration ** 2 - (2 * v0 + v1) / duration),
      String((-2 * delta) / duration ** 3 + (v0 + v1) / duration ** 2),
    ];
  });
  const errorBound = Math.max(Number(start.errorBound) || 0, Number(end.errorBound) || 0);
  return {
    startTime: String(t0),
    endTime: String(t1),
    coefficients,
    positionError: String(errorBound),
    velocityError: String(errorBound),
  };
}

function polarityForStateFlags(stateFlags) {
  if (stateFlags === POSITRINO_STATE_FLAG) {
    return 1;
  }
  if (stateFlags === ELECTRINO_STATE_FLAG) {
    return -1;
  }
  throw new TypeError(
    `converter requires a declared path polarity; stateFlags ${stateFlags} is neither positrino (1) nor electrino (2).`,
  );
}

function requiredFiniteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new TypeError(`converter ${label} must be finite.`);
  }
  return number;
}

function requiredConcreteString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0 || value === "unspecified") {
    throw new TypeError(`converter requires a concrete ${label}.`);
  }
  return value;
}

function finiteOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function parseArgs(rawArgs) {
  const parsed = { inPath: null, outPath: null, options: {} };
  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    const next = () => {
      const value = rawArgs[index + 1];
      if (value == null) {
        throw new TypeError(`${arg} requires a value`);
      }
      index += 1;
      return value;
    };
    if (arg === "--in") {
      parsed.inPath = next();
    } else if (arg === "--out") {
      parsed.outPath = next();
    } else if (arg === "--engine-id") {
      parsed.options.engineId = next();
    } else if (arg === "--generating-spec") {
      parsed.options.generatingSpec = next();
    } else if (arg === "--delay-horizon") {
      parsed.options.delayHorizon = Number(next());
    } else {
      throw new TypeError(`Unknown argument: ${arg}`);
    }
  }
  if (!parsed.inPath || !parsed.outPath) {
    throw new TypeError(
      "usage: convert-borg-trajectory-to-assembly-view-record.mjs --in <replay.json> --out <record.json>",
    );
  }
  return parsed;
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").at(-1))) {
  const { inPath, outPath, options } = parseArgs(process.argv.slice(2));
  const trajectory = JSON.parse(fs.readFileSync(inPath, "utf8"));
  const record = convertBorgTrajectoryToAssemblyViewRecord(trajectory, options);
  fs.writeFileSync(outPath, `${JSON.stringify(record, null, 2)}\n`);
  console.log(
    `assembly-view-record.v0 written: ${outPath} (${record.worldlines.length} worldlines, window [${record.window.start}, ${record.window.end}])`,
  );
}
