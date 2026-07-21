#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const binaryPath = process.argv[2];
const options = parseOptions(process.argv.slice(3));
if (!binaryPath) {
  throw new Error(
    "usage: profile-borg-certified-budget-sweep.mjs <eom_borg_shadow_cli> " +
    "[--seeds=0,1,2,3] [--populations=6] [--chunks=4] " +
    "[--rungs=research-certified,interactive-certified]",
  );
}

const profilerPath = fileURLToPath(new URL(
  "./profile-borg-incremental-chunks.mjs",
  import.meta.url,
));
const seeds = integerList(options.seeds, [0, 1, 2, 3]);
const populations = integerList(options.populations, [6]);
const chunkCount = positiveInteger(options.chunks, 4);
const requestedRungs = stringList(options.rungs, [
  "research-certified",
  "interactive-certified",
]);
const rungById = new Map(createRungs().map((rung) => [rung.id, rung]));
const rungs = requestedRungs.map((id) => {
  const rung = rungById.get(id);
  if (!rung) {
    throw new Error(`unknown certified-budget profile rung: ${id}`);
  }
  return rung;
});
const forwardedOptions = [
  "chunk-duration",
  "coupling",
  "max-per-axis-speed",
  "history-depth",
].flatMap((key) => options[key] == null ? [] : [`--${key}=${options[key]}`]);

const runs = [];
for (const population of populations) {
  if (population % 2 !== 0) {
    throw new Error("profile populations must be even for balanced 1:1 polarity");
  }
  for (const seed of seeds) {
    for (const rung of rungs) {
      const budgetId = `${rung.presetId}-n${population}-seed${seed}`;
      const child = spawnSync(process.execPath, [
        profilerPath,
        binaryPath,
        `--chunks=${chunkCount}`,
        `--seed=${seed}`,
        `--electrinos=${population / 2}`,
        `--positrinos=${population / 2}`,
        `--certified-budget-id=${rung.presetId}`,
        "--summary-only=true",
        ...forwardedOptions,
      ], {
        encoding: "utf8",
        maxBuffer: 256 * 1024 * 1024,
        timeout: positiveInteger(options["timeout-ms"], 600000),
      });
      if (child.stderr) {
        process.stderr.write(child.stderr);
      }
      if (child.status !== 0) {
        throw new Error(
          `profile rung ${budgetId} failed (${child.signal ?? child.status}): ` +
          child.stderr.trim(),
        );
      }
      const profile = JSON.parse(child.stdout);
      runs.push(summarizeRun(profile, { population, seed, rung }));
      process.stderr.write(
        `[budget-sweep] population=${population} seed=${seed} rung=${rung.id} ` +
        `status=${profile.status} t=${profile.acceptedEndTime} ` +
        `native=${profile.nativeTotalWallSeconds}s\n`,
      );
    }
  }
}

const comparisons = [];
for (const population of populations) {
  for (const seed of seeds) {
    const group = runs.filter(
      (run) => run.population === population && run.seed === seed,
    );
    const reference = group.find((run) => run.rungId === "research-certified");
    if (!reference) continue;
    group.forEach((candidate) => {
      comparisons.push(compareRuns(reference, candidate));
    });
  }
}

process.stdout.write(`${JSON.stringify({
  schema: "borg_certified_budget_sweep/v1",
  claimLevel: "measured-current-binary-sensitivity-control",
  protocol: "EOM_BORG_NATIVE_V10",
  closeEncounterBudgets: {
    researchReceiverImpulse: "1e-7",
    researchReceiverPositionMoment: "1e-7",
    interactiveReceiverImpulse: "1e-6",
    interactiveReceiverPositionMoment: "1e-6",
    authority: "ratified-run-selected-certified-budget",
  },
  oracleStatus:
    "same-engine tolerance sensitivity only; not an independent correctness oracle",
  seeds,
  populations,
  chunkCount,
  rungIds: rungs.map((rung) => rung.id),
  runs,
  comparisons,
}, null, 2)}\n`);

function createRungs() {
  return [
    {
      id: "research-certified",
      presetId: "research-certified-v1",
      kind: "ratified-research-control",
      values: { acceleration: 1e-1, eventReceiverTotal: 1e-7 },
    },
    {
      id: "interactive-certified",
      presetId: "interactive-certified-v1",
      kind: "ratified-interactive-candidate",
      values: { acceleration: 3e-1, eventReceiverTotal: 1e-6 },
    },
  ];
}

function summarizeRun(profile, { population, seed, rung }) {
  return {
    population,
    seed,
    rungId: rung.id,
    rungKind: rung.kind,
    allocations: rung.values,
    budgetId: profile.budgetProvenance.budgetId,
    allocationHash: profile.budgetProvenance.allocationHash,
    status: profile.status,
    haltCode: profile.haltCode,
    acceptedEndTime: profile.acceptedEndTime,
    completedSimulatedDuration: profile.completedSimulatedDuration,
    nativeTotalWallSeconds: profile.nativeTotalWallSeconds,
    nativeSimulatedSecondsPerWallSecond:
      profile.nativeSimulatedSecondsPerWallSecond,
    outerTotalWallSeconds: profile.outerTotalWallSeconds,
    outerSimulatedSecondsPerWallSecond:
      profile.outerSimulatedSecondsPerWallSecond,
    chunkWallTime: profile.chunkWallTime,
    steps: profile.steps,
    maximumMemoryEstimateBytes: profile.maximumMemoryEstimateBytes,
    timingTotals: profile.timingTotals,
    wallTimeShares: profile.wallTimeShares,
    precisionEscalationChunks: profile.precisionEscalationChunks,
    endpointFrames: profile.endpointFrames,
    chunks: profile.chunks,
  };
}

function compareRuns(referenceRun, candidate) {
  const referenceEndpointTime = commonFrameTime(referenceRun.endpointFrames);
  const candidateEndpointTime = commonFrameTime(candidate.endpointFrames);
  const commonAcceptedTime =
    referenceEndpointTime != null && referenceEndpointTime === candidateEndpointTime
      ? referenceEndpointTime
      : null;
  const referenceByPath = new Map(
    referenceRun.endpointFrames.map((frame) => [String(frame.pathKey), frame]),
  );
  let maximumPositionDelta = 0;
  let maximumVelocityDelta = 0;
  let allDisplayedErrorIntervalsOverlap = true;
  const referenceErrors = new Map(
    (referenceRun.chunks.at(-1)?.endpointSegmentErrors ?? []).map((row) =>
      [String(row.pathId), row]
    ),
  );
  const candidateErrors = new Map(
    (candidate.chunks.at(-1)?.endpointSegmentErrors ?? []).map((row) =>
      [String(row.pathId), row]
    ),
  );
  if (commonAcceptedTime != null) candidate.endpointFrames.forEach((frame) => {
    const reference = referenceByPath.get(String(frame.pathKey));
    if (!reference || Number(reference.time) !== Number(frame.time)) {
      allDisplayedErrorIntervalsOverlap = false;
      return;
    }
    for (const axis of ["x", "y", "z"]) {
      const positionDelta = Math.abs(
        Number(reference.position[axis]) - Number(frame.position[axis]),
      );
      const velocityDelta = Math.abs(
        Number(reference.velocity[axis]) - Number(frame.velocity[axis]),
      );
      maximumPositionDelta = Math.max(maximumPositionDelta, positionDelta);
      maximumVelocityDelta = Math.max(maximumVelocityDelta, velocityDelta);
      const referenceError = referenceErrors.get(String(frame.pathKey));
      const candidateError = candidateErrors.get(String(frame.pathKey));
      const positionCombinedRadius = referenceError && candidateError
        ? Number(referenceError.positionError) + Number(candidateError.positionError)
        : Number(reference.errorBound) + Number(frame.errorBound);
      const velocityCombinedRadius = referenceError && candidateError
        ? Number(referenceError.velocityError) + Number(candidateError.velocityError)
        : Number(reference.errorBound) + Number(frame.errorBound);
      if (
        positionDelta > positionCombinedRadius ||
        velocityDelta > velocityCombinedRadius
      ) {
        allDisplayedErrorIntervalsOverlap = false;
      }
    }
  });
  return {
    population: candidate.population,
    seed: candidate.seed,
    referenceRungId: referenceRun.rungId,
    candidateRungId: candidate.rungId,
    commonAcceptedTime,
    sameTerminalOutcome:
      referenceRun.status === candidate.status &&
        referenceRun.haltCode === candidate.haltCode,
    maximumPositionDelta,
    maximumVelocityDelta,
    maximumReferencePositionRadius: Math.max(
      0,
      ...[...referenceErrors.values()].map((row) => Number(row.positionError)),
    ),
    maximumReferenceVelocityRadius: Math.max(
      0,
      ...[...referenceErrors.values()].map((row) => Number(row.velocityError)),
    ),
    maximumCandidatePositionRadius: Math.max(
      0,
      ...[...candidateErrors.values()].map((row) => Number(row.positionError)),
    ),
    maximumCandidateVelocityRadius: Math.max(
      0,
      ...[...candidateErrors.values()].map((row) => Number(row.velocityError)),
    ),
    displayedErrorIntervalsOverlap:
      commonAcceptedTime == null ? null : allDisplayedErrorIntervalsOverlap,
    visiblySimilarTrajectory: commonAcceptedTime == null
      ? null
      : maximumPositionDelta <= 1e-3 && maximumVelocityDelta <= 1e-3,
    trajectorySimilarityThreshold:
      "diagnostic-only absolute component threshold 1e-3; not certification",
  };
}

function commonFrameTime(frames) {
  const times = new Set(frames.map((frame) => Number(frame.time)));
  return times.size === 1 ? [...times][0] : null;
}

function positiveInteger(token, fallback) {
  const value = Number(token);
  return Number.isInteger(value) && value > 0 ? value : fallback;
}

function integerList(token, fallback) {
  if (token == null) return fallback;
  const values = token.split(",").map(Number);
  if (values.length === 0 || values.some(
    (value) => !Number.isSafeInteger(value) || value < 0,
  )) {
    throw new Error(`invalid nonnegative integer list: ${token}`);
  }
  return values;
}

function stringList(token, fallback) {
  return token == null ? fallback : token.split(",").filter(Boolean);
}

function parseOptions(tokens) {
  const parsed = {};
  for (const token of tokens) {
    if (!token.startsWith("--") || !token.includes("=")) {
      throw new Error(`invalid option: ${token}`);
    }
    const separator = token.indexOf("=");
    parsed[token.slice(2, separator)] = token.slice(separator + 1);
  }
  return parsed;
}
