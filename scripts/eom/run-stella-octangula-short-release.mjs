#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";

import { createBorgNativeEomProcessClient } from "./BorgNativeEomProcessClient.mjs";
import { prepareOrdinaryEvolutionRequest } from "./prepare-ordinary-evolution-request.mjs";
import {
  canonicalStringify,
  getBorgCertifiedBudgetPreset,
} from "../../src/apps/borg/BorgCertifiedBudgets.js";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const REPO_ROOT = path.resolve(path.dirname(SCRIPT_PATH), "../..");
const DEFAULT_PREDECLARATION = path.resolve(
  REPO_ROOT,
  "reference/priorities/braid-program/evidence/2026-09-01-stella-octangula-short-eom-release.predeclaration.v1.json",
);
const ALLOWED_OUTPUT_ROOT = path.resolve(REPO_ROOT, ".local-data/braid-analysis");

function check(condition, message) {
  if (!condition) throw new Error(message);
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function canonical(value) {
  return canonicalStringify(value);
}

function readBoundJson(filePath, maximumBytes = 16 * 1024 * 1024) {
  const bytes = readFileSync(filePath);
  check(bytes.length <= maximumBytes, `bounded JSON input exceeded: ${filePath}`);
  return { bytes, sha256: sha256(bytes), value: JSON.parse(bytes.toString("utf8")) };
}

function writeFreshJson(filePath, value) {
  const bytes = Buffer.from(`${JSON.stringify(value, null, 2)}\n`);
  writeFileSync(filePath, bytes, { flag: "wx", mode: 0o600 });
  const reread = readFileSync(filePath);
  check(reread.equals(bytes), `published file changed: ${filePath}`);
  return { path: filePath, sha256: sha256(bytes), bytes: bytes.length };
}

function bindingMap(declaration) {
  return new Map(declaration.bindings.map((binding) => [binding.role, binding]));
}

function authenticateBindings(declaration) {
  for (const binding of declaration.bindings) {
    const absolute = path.resolve(REPO_ROOT, binding.path);
    const bytes = readFileSync(absolute);
    check(bytes.length === binding.bytes, `binding byte count changed: ${binding.role}`);
    check(sha256(bytes) === binding.sha256, `binding SHA-256 changed: ${binding.role}`);
  }
}

function constituentSources(staticSpec) {
  const constituentById = new Map(staticSpec.constituents.map((row) => [row.id, row]));
  const worldlineById = new Map(staticSpec.worldlines.map((row) => [row.id, row]));
  return staticSpec.relationships.sourceOrder.map((constituentId) => {
    const constituent = constituentById.get(constituentId);
    const worldline = worldlineById.get(constituent?.worldlineId);
    check(worldline?.operator?.kind === "stationary.v1", `${constituentId} is not stationary.v1`);
    return {
      constituentId,
      pathId: worldline.id,
      polarity: constituent.polarity,
      position: structuredClone(worldline.operator.position),
    };
  });
}

export function buildStationaryHistories(staticSpec, declaration) {
  const start = declaration.scientificConditions.historyStart;
  const release = declaration.scientificConditions.releaseTime;
  return constituentSources(staticSpec).map((source) => {
    const segments = [{
      startTime: start,
      endTime: release,
      coefficients: source.position.map((coordinate) => [String(coordinate), "0", "0", "0"]),
      positionErrors: ["0", "0", "0"],
      velocityErrors: ["0", "0", "0"],
    }];
    const sourceFingerprint = sha256(canonical({
      schema: "braid-program/exact-stationary-history.v1",
      pathId: source.pathId,
      constituentId: source.constituentId,
      polarity: source.polarity,
      segments,
    }));
    return {
      pathId: source.pathId,
      sourceHistoryId: `${declaration.packetId}/past/${source.constituentId}`,
      sourceFingerprint,
      polarity: source.polarity,
      segments,
    };
  });
}

function certifiedBudgetForRung(rung) {
  const base = structuredClone(getBorgCertifiedBudgetPreset("research-certified-v1"));
  const presetId = `stella-octangula-${rung.id}-fixed-step-v1`;
  const allocations = base.allocations;
  allocations.presetId = presetId;
  allocations.controller = {
    initialStep: rung.step,
    minimumStep: rung.step,
    maximumStep: rung.step,
    adaptiveGrowth: false,
  };
  allocations.resources = { ...allocations.resources, workerThreads: 1 };
  const allocationCanonicalJson = canonical(allocations);
  return {
    presetId,
    allocations,
    allocationCanonicalJson,
    allocationHash: sha256(allocationCanonicalJson),
  };
}

export function buildPreparedRequest(staticSpec, declaration, rung) {
  const histories = buildStationaryHistories(staticSpec, declaration);
  const certifiedBudget = certifiedBudgetForRung(rung);
  const a = certifiedBudget.allocations;
  const input = {
    candidateId: "stella-octangula-stationary-release",
    releaseTime: declaration.scientificConditions.releaseTime,
    historyCoverageStart: declaration.scientificConditions.historyStart,
    historyEvidence: declaration.historyEvidence,
    histories,
    settings: {
      runId: `${declaration.packetId}-${rung.id}`,
      endTime: declaration.scientificConditions.endTime,
      strength: {
        effectiveStrength: declaration.scientificConditions.effectiveStrength,
        chargeMagnitude: declaration.scientificConditions.chargeMagnitude,
        coupling: declaration.scientificConditions.coupling,
      },
      numericalControls: {
        initialStep: a.controller.initialStep,
        minimumStep: a.controller.minimumStep,
        maximumStep: a.controller.maximumStep,
        useAdaptiveStepGrowth: a.controller.adaptiveGrowth,
        rootTolerance: a.ordinary.rootTimeEnclosure,
        accelerationTolerance: a.ordinary.accelerationEnclosure,
        farFieldEnclosureFraction: a.ordinary.farFieldEnclosureFraction,
        positionTolerance: a.ordinary.acceptedStepPosition,
        velocityTolerance: a.ordinary.acceptedStepVelocity,
        correctionTolerance: a.ordinary.correctionAccelerationResidual,
        threadCount: a.resources.workerThreads,
      },
      coreScale: a.finiteWidth.coreScale,
      certifiedBudget,
      operationalLimits: structuredClone(declaration.operationalLimits),
    },
  };
  const preparation = prepareOrdinaryEvolutionRequest(input);
  check(preparation.status === "mechanically-prepared-not-authorized",
    `${rung.id} ordinary preparation did not close mechanically`);
  check(preparation.canonicalBudgetGate ===
    "canonical-validator-and-encoder-passed-not-EOM-validation",
  `${rung.id} canonical budget gate did not pass`);
  check(preparation.transportRequest?.runGrade === "certified",
    `${rung.id} transport request is not certified-grade`);
  return preparation;
}

function polynomial(coefficients, time) {
  const [c0, c1, c2, c3] = coefficients.map(Number);
  return c0 + time * (c1 + time * (c2 + time * c3));
}

function derivative(coefficients, time) {
  const [, c1, c2, c3] = coefficients.map(Number);
  return c1 + time * (2 * c2 + time * 3 * c3);
}

function evaluateHistory(history, time) {
  const segment = history.segments.find((candidate, index) =>
    Number(candidate.startTime) <= time &&
    (time < Number(candidate.endTime) || index + 1 === history.segments.length));
  check(segment, `history ${history.pathId} does not cover ${time}`);
  const local = time - Number(segment.startTime);
  return {
    pathId: history.pathId,
    position: segment.coefficients.map((axis) => polynomial(axis, local)),
    velocity: segment.coefficients.map((axis) => derivative(axis, local)),
  };
}

function dot(left, right) {
  return left.reduce((sum, value, axis) => sum + value * right[axis], 0);
}

function norm(vector) {
  return Math.sqrt(dot(vector, vector));
}

function subtract(left, right) {
  return left.map((value, axis) => value - right[axis]);
}

function scale(vector, scalar) {
  return vector.map((value) => value * scalar);
}

function frameMetrics(histories, time) {
  const rows = histories.map((history) => evaluateHistory(history, time));
  const center = [0, 1, 2].map((axis) =>
    rows.reduce((sum, row) => sum + row.position[axis], 0) / rows.length);
  const memberRows = rows.map((row) => {
    const radius = norm(row.position);
    const radialDirection = scale(row.position, 1 / radius);
    const radialVelocity = dot(row.velocity, radialDirection);
    const tangentialVelocity = subtract(row.velocity, scale(radialDirection, radialVelocity));
    return {
      ...row,
      radius,
      radialVelocity,
      tangentialSpeed: norm(tangentialVelocity),
    };
  });
  let minimumPairSeparation = Number.POSITIVE_INFINITY;
  for (let left = 0; left < rows.length; left += 1) {
    for (let right = left + 1; right < rows.length; right += 1) {
      minimumPairSeparation = Math.min(
        minimumPairSeparation,
        norm(subtract(rows[left].position, rows[right].position)),
      );
    }
  }
  return {
    time,
    center,
    centerNorm: norm(center),
    minimumRadius: Math.min(...memberRows.map((row) => row.radius)),
    maximumRadius: Math.max(...memberRows.map((row) => row.radius)),
    minimumRadialVelocity: Math.min(...memberRows.map((row) => row.radialVelocity)),
    maximumRadialVelocity: Math.max(...memberRows.map((row) => row.radialVelocity)),
    maximumTangentialSpeed: Math.max(...memberRows.map((row) => row.tangentialSpeed)),
    minimumPairSeparation,
    members: memberRows,
  };
}

function acceptedFrameTimes(response) {
  const first = response.histories?.[0];
  if (!first) return [];
  return [...new Set(first.segments
    .map((segment) => Number(segment.endTime))
    .filter((time) => time > 0 && time <= Number(response.acceptedEndTime)))]
    .sort((left, right) => left - right);
}

export function summarizeResponse(response, declaration) {
  const frames = Array.isArray(response.histories)
    ? acceptedFrameTimes(response).map((time) => frameMetrics(response.histories, time))
    : [];
  const finalFrame = frames.at(-1) ?? null;
  const thresholds = declaration.stoppingRules;
  const event = frames.find((frame) =>
    frame.centerNorm > thresholds.maximumCenterResidual ||
    frame.maximumTangentialSpeed > thresholds.maximumTangentialSpeed ||
    frame.maximumRadialVelocity > thresholds.radialReversalTolerance ||
    frame.minimumPairSeparation < thresholds.minimumPairSeparation) ?? null;
  return {
    status: response.status,
    evidenceStatus: response.evidenceStatus,
    claimGrade: response.claimGrade,
    haltCode: response.haltCode ?? null,
    acceptedEndTime: response.acceptedEndTime,
    acceptedStepCount: response.acceptedStepCount,
    rejectedStepCount: response.rejectedStepCount,
    frameCount: frames.length,
    stoppingEvent: event == null ? null : {
      time: event.time,
      centerNorm: event.centerNorm,
      maximumTangentialSpeed: event.maximumTangentialSpeed,
      maximumRadialVelocity: event.maximumRadialVelocity,
      minimumPairSeparation: event.minimumPairSeparation,
    },
    finalFrame,
    frames,
  };
}

function maximumStateDelta(left, right) {
  if (!left?.finalFrame || !right?.finalFrame) return null;
  const rightById = new Map(right.finalFrame.members.map((row) => [row.pathId, row]));
  let maximum = 0;
  for (const row of left.finalFrame.members) {
    const peer = rightById.get(row.pathId);
    for (const field of ["position", "velocity"]) {
      for (let axis = 0; axis < 3; axis += 1) {
        maximum = Math.max(maximum, Math.abs(row[field][axis] - peer[field][axis]));
      }
    }
  }
  return maximum;
}

function parseArgs(argv) {
  const values = new Map();
  for (let index = 0; index < argv.length; index += 2) {
    check(["--binary", "--predeclaration", "--out"].includes(argv[index]) && argv[index + 1],
      "usage: --binary FILE [--predeclaration FILE] --out FRESH_DIRECTORY");
    values.set(argv[index], argv[index + 1]);
  }
  check(values.has("--binary") && values.has("--out"),
    "usage: --binary FILE [--predeclaration FILE] --out FRESH_DIRECTORY");
  return values;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const binaryPath = realpathSync(path.resolve(args.get("--binary")));
  const predeclarationPath = path.resolve(args.get("--predeclaration") ?? DEFAULT_PREDECLARATION);
  const outputDirectory = path.resolve(args.get("--out"));
  check(outputDirectory.startsWith(`${ALLOWED_OUTPUT_ROOT}${path.sep}`),
    "output must be a fresh child of .local-data/braid-analysis");
  check(!existsSync(outputDirectory), "output directory already exists");
  check(realpathSync(path.dirname(outputDirectory)) === path.dirname(outputDirectory),
    "output parent must already exist canonically");

  const loadedDeclaration = readBoundJson(predeclarationPath);
  const declaration = loadedDeclaration.value;
  check(declaration.schema ===
    "braid-program/stella-octangula-short-eom-release-predeclaration.v1",
  "wrong short-release predeclaration schema");
  authenticateBindings(declaration);
  const bindings = bindingMap(declaration);
  const binaryBinding = bindings.get("eom-executable");
  check(binaryPath === path.resolve(REPO_ROOT, binaryBinding.path),
    "invoked EOM executable differs from predeclaration");
  check(sha256(readFileSync(binaryPath)) === binaryBinding.sha256,
    "invoked EOM executable hash differs from predeclaration");
  const sourceBinding = bindings.get("static-assembly-source");
  const staticSpec = readBoundJson(path.resolve(REPO_ROOT, sourceBinding.path)).value;
  const releasePacketBinding = bindings.get("stationary-release-packet");
  const releasePacket = readBoundJson(path.resolve(REPO_ROOT, releasePacketBinding.path)).value;
  check(releasePacket.verdict === "passed", "stationary release packet did not pass");
  check(releasePacket.resultHash === declaration.stationaryReleaseResultHash,
    "stationary release result hash differs from predeclaration");

  mkdirSync(outputDirectory, { mode: 0o700 });
  const declarationCopy = writeFreshJson(
    path.resolve(outputDirectory, "predeclaration.json"),
    declaration,
  );
  const results = [];
  let stopReason = null;
  for (const rung of declaration.rungs) {
    authenticateBindings(declaration);
    const preparation = buildPreparedRequest(staticSpec, declaration, rung);
    const preparationBinding = writeFreshJson(
      path.resolve(outputDirectory, `${rung.id}-preparation.json`),
      preparation,
    );
    const client = createBorgNativeEomProcessClient({
      binaryPath,
      timeoutMs: declaration.operationalLimits.wallSeconds * 1000,
      historyDiskLimitBytes: declaration.operationalLimits.outputBytes,
    });
    const started = performance.now();
    let response;
    try {
      response = await client.evolveRetainedHistories(preparation.transportRequest);
    } finally {
      await client.dispose();
    }
    const elapsedSeconds = (performance.now() - started) / 1000;
    const responseBinding = writeFreshJson(
      path.resolve(outputDirectory, `${rung.id}-response.json`),
      response,
    );
    const summary = summarizeResponse(response, declaration);
    results.push({
      rung,
      elapsedSeconds,
      preparation: preparationBinding,
      response: responseBinding,
      summary,
    });
    if (rung.role === "primary" && response.status !== "completed") {
      stopReason = `primary-${response.haltCode ?? response.status}`;
      break;
    }
    if (rung.role === "primary" && summary.stoppingEvent) {
      stopReason = "primary-stopping-event";
      break;
    }
  }
  authenticateBindings(declaration);
  const primary = results.find((row) => row.rung.role === "primary")?.summary ?? null;
  const medium = results.find((row) => row.rung.id === "medium")?.summary ?? null;
  const coarse = results.find((row) => row.rung.id === "coarse")?.summary ?? null;
  const summary = {
    schema: "braid-program/stella-octangula-short-eom-release-run.v1",
    packetId: declaration.packetId,
    predeclaration: declarationCopy,
    binary: { path: binaryBinding.path, sha256: binaryBinding.sha256 },
    operationallyComplete: stopReason == null && results.length === declaration.rungs.length,
    stopReason,
    rungs: results,
    comparisons: {
      primaryToMediumMaximumStateDelta: maximumStateDelta(primary, medium),
      primaryToCoarseMaximumStateDelta: maximumStateDelta(primary, coarse),
    },
    animationProduced: false,
    braidClassificationAttempted: false,
  };
  const summaryBinding = writeFreshJson(path.resolve(outputDirectory, "run-summary.json"), summary);
  process.stdout.write(`${JSON.stringify({
    outputDirectory,
    summary: summaryBinding,
    operationallyComplete: summary.operationallyComplete,
    stopReason,
    rungStatuses: results.map((row) => ({
      id: row.rung.id,
      status: row.summary.status,
      acceptedEndTime: row.summary.acceptedEndTime,
      acceptedStepCount: row.summary.acceptedStepCount,
      haltCode: row.summary.haltCode,
    })),
  })}\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) {
  main().catch((error) => {
    process.stderr.write(`${error.stack}\n`);
    process.exitCode = 1;
  });
}
