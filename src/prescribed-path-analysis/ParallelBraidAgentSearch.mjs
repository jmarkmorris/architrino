import { createHash } from "node:crypto";
import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

export const PARALLEL_BRAID_AGENT_SEARCH_SCHEMA =
  "braid-program/parallel-agent-search-manifest.v1";

const REQUIRED_EXCLUDED_CLAIMS = Object.freeze([
  "binding",
  "retention",
  "stability",
  "candidate-promotion",
  "score-change",
  "particle-identity",
  "physical-realization",
]);

function fail(message) {
  throw new Error(message);
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function stableRead(file) {
  const link = lstatSync(file);
  if (!link.isFile() || link.isSymbolicLink()) {
    fail(`${file} must be a regular non-symlink file.`);
  }
  const before = statSync(file);
  const bytes = readFileSync(file);
  const after = statSync(file);
  if (before.size !== after.size || before.mtimeMs !== after.mtimeMs ||
      bytes.length !== after.size) {
    fail(`${file} changed during its stable read.`);
  }
  return bytes;
}

function isSafeRelativePath(value) {
  return typeof value === "string" && value.length > 0 &&
    !path.isAbsolute(value) &&
    value.split(/[\\/]/u).every((part) => part !== ".." && part !== "");
}

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) =>
      `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function validateSourceBindings(bindings, { verifyFiles, cwd }) {
  if (!Array.isArray(bindings) || bindings.length === 0) {
    fail("sourceBindings must contain at least one frozen source.");
  }
  const ids = new Set();
  const paths = new Set();
  for (const binding of bindings) {
    if (!/^[a-z0-9][a-z0-9-]*$/u.test(binding.id ?? "")) {
      fail(`invalid source binding id ${binding.id}.`);
    }
    if (ids.has(binding.id)) fail(`duplicate source binding id ${binding.id}.`);
    if (!isSafeRelativePath(binding.path)) {
      fail(`source binding ${binding.id} has an unsafe path.`);
    }
    if (paths.has(binding.path)) fail(`duplicate source path ${binding.path}.`);
    if (!/^[0-9a-f]{64}$/u.test(binding.sha256 ?? "")) {
      fail(`source binding ${binding.id} must carry a SHA-256 digest.`);
    }
    ids.add(binding.id);
    paths.add(binding.path);
    if (verifyFiles) {
      const bytes = stableRead(path.resolve(cwd, binding.path));
      const actual = sha256(bytes);
      if (actual !== binding.sha256) {
        fail(
          `source binding ${binding.id} differs: expected ${binding.sha256}, ` +
          `received ${actual}.`,
        );
      }
    }
  }
  return ids;
}

function validateLane(lane, sourceIds, outputRoot, seenLaneIds, seenOutputs) {
  if (!/^[a-z0-9][a-z0-9-]*$/u.test(lane.laneId ?? "")) {
    fail(`invalid lane id ${lane.laneId}.`);
  }
  if (seenLaneIds.has(lane.laneId)) fail(`duplicate lane id ${lane.laneId}.`);
  seenLaneIds.add(lane.laneId);
  if (!["ready", "dependency-gated"].includes(lane.status)) {
    fail(`${lane.laneId} has an invalid status.`);
  }
  if (!Array.isArray(lane.sourceBindingIds) ||
      lane.sourceBindingIds.some((id) => !sourceIds.has(id))) {
    fail(`${lane.laneId} references an unknown frozen source.`);
  }
  if (!Array.isArray(lane.candidates) || lane.candidates.length === 0) {
    fail(`${lane.laneId} must name at least one candidate or search object.`);
  }
  if (!Array.isArray(lane.dependencies)) {
    fail(`${lane.laneId} dependencies must be an array.`);
  }
  if (!Number.isInteger(lane.resources?.workerThreads) ||
      lane.resources.workerThreads < 0) {
    fail(`${lane.laneId} must declare a nonnegative worker-thread count.`);
  }
  if (lane.agentContract?.repositoryWritePolicy !== "report-only") {
    fail(`${lane.laneId} must remain report-only for search agents.`);
  }
  if (lane.agentContract?.integrationOwner !== "coordinator") {
    fail(`${lane.laneId} must reserve repository integration to the coordinator.`);
  }
  const expectedOutput = `${outputRoot}/${lane.laneId}`;
  if (lane.outputDirectory !== expectedOutput ||
      !isSafeRelativePath(lane.outputDirectory)) {
    fail(`${lane.laneId} must use its unique campaign output directory.`);
  }
  if (seenOutputs.has(lane.outputDirectory)) {
    fail(`${lane.laneId} reuses output directory ${lane.outputDirectory}.`);
  }
  seenOutputs.add(lane.outputDirectory);
}

function validateDependencyGraph(lanes) {
  const byId = new Map(lanes.map((lane) => [lane.laneId, lane]));
  for (const lane of lanes) {
    for (const dependency of lane.dependencies) {
      if (!byId.has(dependency)) {
        fail(`${lane.laneId} depends on unknown lane ${dependency}.`);
      }
    }
    if (lane.status === "ready" && lane.dependencies.length > 0) {
      fail(`${lane.laneId} is ready but has unresolved dependencies.`);
    }
  }
  const visiting = new Set();
  const visited = new Set();
  function visit(id) {
    if (visiting.has(id)) fail(`dependency cycle reaches ${id}.`);
    if (visited.has(id)) return;
    visiting.add(id);
    byId.get(id).dependencies.forEach(visit);
    visiting.delete(id);
    visited.add(id);
  }
  lanes.forEach((lane) => visit(lane.laneId));
}

export function validateParallelBraidAgentSearchManifest(manifest, {
  verifyFiles = true,
  cwd = process.cwd(),
} = {}) {
  if (manifest?.schema !== PARALLEL_BRAID_AGENT_SEARCH_SCHEMA) {
    fail("parallel braid agent search manifest schema differs.");
  }
  if (manifest.status !== "operator-authorized-prescribed-search") {
    fail("manifest is not operator-authorized for prescribed search.");
  }
  if (manifest.normalizedUnits?.fieldSpeed !== 1) {
    fail("parallel braid search must use normalized c_f=1 units.");
  }
  if (manifest.executionBoundary?.ordinaryEomEvolutionPermitted !== false ||
      manifest.executionBoundary?.h3RootSearchPermitted !== false) {
    fail("the parallel manifest must exclude H3 root search and ordinary EOM evolution.");
  }
  const excludedClaims = new Set(manifest.claimBoundary?.excludedClaims ?? []);
  for (const claim of REQUIRED_EXCLUDED_CLAIMS) {
    if (!excludedClaims.has(claim)) fail(`claim boundary must exclude ${claim}.`);
  }
  const budget = manifest.resourceBudget;
  if (!Number.isInteger(budget?.maxConcurrentAgents) ||
      budget.maxConcurrentAgents < 1 ||
      !Number.isInteger(budget.maxAggregateWorkerThreads) ||
      budget.maxAggregateWorkerThreads < 1 ||
      !Number.isInteger(budget.heartbeatSeconds) ||
      budget.heartbeatSeconds < 1 || budget.heartbeatSeconds > 60) {
    fail("resource budget or heartbeat is invalid.");
  }
  if (manifest.outputContract?.writePolicy !== "create-exclusive-no-overwrite" ||
      manifest.outputContract?.retryPolicy !== "new-attempt-path-same-lane-identity" ||
      manifest.outputContract?.databaseWriterPolicy !== "single-writer") {
    fail("output contract must be write-once with one database writer.");
  }
  const outputRoot = manifest.outputContract?.root;
  const expectedRoot =
    `.local-data/braid-analysis/parallel-agent-search/${manifest.campaignId}`;
  if (outputRoot !== expectedRoot || !isSafeRelativePath(outputRoot)) {
    fail("output root must be the campaign-isolated local-data path.");
  }
  const sourceIds = validateSourceBindings(
    manifest.sourceBindings,
    { verifyFiles, cwd },
  );
  if (!Array.isArray(manifest.lanes) || manifest.lanes.length < 2) {
    fail("manifest must contain multiple parallel lanes.");
  }
  const seenLaneIds = new Set();
  const seenOutputs = new Set();
  manifest.lanes.forEach((lane) => validateLane(
    lane,
    sourceIds,
    outputRoot,
    seenLaneIds,
    seenOutputs,
  ));
  validateDependencyGraph(manifest.lanes);
  const ready = manifest.lanes.filter((lane) => lane.status === "ready");
  const gated = manifest.lanes.filter((lane) => lane.status === "dependency-gated");
  if (ready.length === 0) fail("manifest must contain at least one ready lane.");
  return {
    schema: manifest.schema,
    campaignId: manifest.campaignId,
    manifestCanonicalSha256: sha256(canonicalJson(manifest)),
    readyLaneCount: ready.length,
    dependencyGatedLaneCount: gated.length,
    sourceBindingCount: manifest.sourceBindings.length,
    readyWorkerThreads: ready.reduce(
      (sum, lane) => sum + lane.resources.workerThreads,
      0,
    ),
  };
}

function renderAgentPrompt(manifest, lane) {
  return [
    `Closure goal: ${lane.closureGoal}`,
    "",
    `Campaign: ${manifest.campaignId}`,
    `Lane: ${lane.laneId}`,
    `Objects: ${lane.candidates.join(", ")}`,
    `Frozen inputs: ${lane.sourceBindingIds.join(", ")}`,
    "",
    "Work only at the prescribed-geometry or H1/H2 level declared by this lane.",
    "Do not run H3 root search or ordinary EOM evolution.",
    "Do not edit repository files. Return a report and write only create-exclusive local lane artifacts.",
    `Local output: ${lane.outputDirectory}`,
    `Worker threads: ${lane.resources.workerThreads}`,
    `Deliverable: ${lane.deliverable}`,
    `Falsifier: ${lane.falsifier}`,
    "",
    "Excluded claims: binding, retention, stability, candidate promotion, score change, particle identity, and physical realization.",
    "Missing output is incomplete coverage, not a negative result. Preserve exact uncertainty and evidence grades.",
  ].join("\n");
}

export function buildParallelBraidAgentLaunchPlan(manifest, options = {}) {
  const validation = validateParallelBraidAgentSearchManifest(manifest, options);
  const ready = manifest.lanes.filter((lane) => lane.status === "ready");
  const waves = [];
  let current = [];
  let workers = 0;
  for (const lane of ready) {
    const nextWorkers = workers + lane.resources.workerThreads;
    if (current.length >= manifest.resourceBudget.maxConcurrentAgents ||
        nextWorkers > manifest.resourceBudget.maxAggregateWorkerThreads) {
      waves.push(current);
      current = [];
      workers = 0;
    }
    current.push({
      laneId: lane.laneId,
      workerThreads: lane.resources.workerThreads,
      outputDirectory: lane.outputDirectory,
      prompt: renderAgentPrompt(manifest, lane),
    });
    workers += lane.resources.workerThreads;
  }
  if (current.length > 0) waves.push(current);
  return {
    schema: "braid-program/parallel-agent-search-launch-plan.v1",
    campaignId: manifest.campaignId,
    manifestCanonicalSha256: validation.manifestCanonicalSha256,
    generatedFromFrozenSources: true,
    heartbeatSeconds: manifest.resourceBudget.heartbeatSeconds,
    waves: waves.map((lanes, index) => ({
      wave: index + 1,
      agentCount: lanes.length,
      aggregateWorkerThreads: lanes.reduce(
        (sum, lane) => sum + lane.workerThreads,
        0,
      ),
      lanes,
    })),
    dependencyGated: manifest.lanes
      .filter((lane) => lane.status === "dependency-gated")
      .map((lane) => ({
        laneId: lane.laneId,
        dependencies: lane.dependencies,
        reason: lane.gateReason,
      })),
  };
}

export function writeLaunchPlanOnce(file, launchPlan) {
  if (existsSync(file)) fail(`${file} already exists; launch plans are write-once.`);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, `${JSON.stringify(launchPlan, null, 2)}\n`, { flag: "wx" });
  return file;
}
