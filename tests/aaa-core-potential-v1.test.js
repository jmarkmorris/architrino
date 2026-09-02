import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

import {
  AAA_CORE_POTENTIAL_API_ID,
  AAA_CORE_POTENTIAL_SUPPORTED_CONSUMERS,
  computePotentialSamples,
  createPotentialSamplesRunRequest,
} from "../src/aaa-core/potential-v1.mjs";
import {
  computeTopoPotentialSamples,
  createTopoPotentialSamplesRunRequest,
} from "../src/apps/topo/TopoPotentialConsumer.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTRACT = JSON.parse(fs.readFileSync(
  path.join(ROOT, "reference/priorities/app-aaa-core/aaa-core-potential.v1.json"),
  "utf8",
));

function createModel() {
  return {
    fieldSpeed: 1,
    architrinos: [
      {q: 1, position: {x: -1, y: 0, z: 0}, velocity: {x: 0, y: 0, z: 0}},
      {q: -1, position: {x: 1, y: 0, z: 0}, velocity: {x: 0, y: 0, z: 0}},
    ],
  };
}

function createRunHandle(runRequest, potentials, statuses = []) {
  const rows = runRequest.config.geometryRequest.delayedPotentials.map((request, itemIndex) => ({
    itemIndex,
    statusCode: statuses[itemIndex] ?? 0,
    potential: potentials[itemIndex],
    emissionTime: request.observationTime - 1,
  }));
  return {
    runId: runRequest.runId,
    datasetId: runRequest.datasetId,
    response: {
      runId: runRequest.runId,
      datasetId: runRequest.datasetId,
      geometry: {delayedPotentials: rows},
      status: {code: "ok", severity: "ok"},
    },
  };
}

test("AAA Core is the single Potential API owner for the declared consumers", () => {
  assert.equal(CONTRACT.schema, AAA_CORE_POTENTIAL_API_ID);
  assert.equal(CONTRACT.owner, "AAA Core");
  assert.equal(CONTRACT.ownershipBoundary.standalonePotentialApplicationApproved, false);
  assert.deepEqual(
    CONTRACT.supportedConsumers.map(({consumerId}) => consumerId),
    AAA_CORE_POTENTIAL_SUPPORTED_CONSUMERS,
  );
  assert.equal(fs.existsSync(path.join(ROOT, "src/apps/ideal-braid/IdealBraidAnalysisAdapters.js")), false);
  const applicationSources = [
    "src/apps/ideal-braid/IdealBraidSurfaceSolverScheduler.js",
    "src/apps/topo/TopoPotentialConsumer.js",
  ].map((relativePath) => fs.readFileSync(path.join(ROOT, relativePath), "utf8")).join("\n");
  assert.doesNotMatch(applicationSources, /computeDelayedPotential|geometryRequest:\s*\{\s*delayedPotentials/u);
});

test("Lorentz Geometry consumes a complete Potential batch through AAA Core", async () => {
  const request = {
    consumerId: "ideal-braid",
    samplePoints: [{x: 0, y: 1, z: 0}],
    model: createModel(),
    observationTime: 2,
  };
  const runRequest = createPotentialSamplesRunRequest(request);
  const snapshot = await computePotentialSamples(
    {...request, runRequest},
    {runPrescribedPathAnalysis: async () => createRunHandle(runRequest, [0.75, -0.25])},
  );
  assert.equal(snapshot.apiId, AAA_CORE_POTENTIAL_API_ID);
  assert.deepEqual(snapshot.samplePotentials, [0.5]);
  assert.equal(snapshot.contributionsBySample[0].length, 2);
});

test("Topo consumes the same Core API without owning a calculation", async () => {
  const request = {
    samplePoints: [{x: 0, y: 1, z: 0}],
    model: createModel(),
    observationTime: 2,
  };
  const runRequest = createTopoPotentialSamplesRunRequest(request);
  assert.equal(runRequest.appId, "topo");
  const snapshot = await computeTopoPotentialSamples(
    {...request, runRequest},
    {runPrescribedPathAnalysis: async () => createRunHandle(runRequest, [1.25, -0.5])},
  );
  assert.deepEqual(snapshot.samplePotentials, [0.75]);
});

test("Potential output fails closed on missing, unavailable, and nonfinite rows", async () => {
  const request = {
    consumerId: "ideal-braid",
    samplePoints: [{x: 0, y: 1, z: 0}],
    model: createModel(),
    observationTime: 2,
  };
  const runRequest = createPotentialSamplesRunRequest(request);
  await assert.rejects(
    computePotentialSamples(
      {...request, runRequest},
      {runPrescribedPathAnalysis: async () => ({response: {geometry: {delayedPotentials: []}}})},
    ),
    /potential_output_unavailable: expected 2 contribution rows/u,
  );
  await assert.rejects(
    computePotentialSamples(
      {...request, runRequest},
      {runPrescribedPathAnalysis: async () => createRunHandle(runRequest, [1, 2], [0, 9])},
    ),
    /potential_output_unavailable: contribution row 1 has status 9/u,
  );
  await assert.rejects(
    computePotentialSamples(
      {...request, runRequest},
      {runPrescribedPathAnalysis: async () => createRunHandle(runRequest, [1, Number.NaN])},
    ),
    /potential_output_unavailable/u,
  );
  const malformedRunRequest = structuredClone(runRequest);
  malformedRunRequest.config.geometryRequest.delayedPotentials.pop();
  await assert.rejects(
    computePotentialSamples({...request, runRequest: malformedRunRequest}),
    /invalid_potential_request: run request must contain 2 Potential rows/u,
  );
});

test("unsupported consumers and provider failures return explicit Core errors", async () => {
  assert.throws(
    () => createPotentialSamplesRunRequest({
      consumerId: "potential-app",
      samplePoints: [{x: 0, y: 0, z: 0}],
      model: createModel(),
      observationTime: 0,
    }),
    /unsupported_potential_consumer/u,
  );
  const request = {
    consumerId: "topo",
    samplePoints: [{x: 0, y: 0, z: 0}],
    model: createModel(),
    observationTime: 0,
  };
  const runRequest = createPotentialSamplesRunRequest(request);
  await assert.rejects(
    computePotentialSamples(
      {...request, runRequest},
      {runPrescribedPathAnalysis: async () => { throw new Error("provider offline"); }},
    ),
    /potential_output_unavailable: provider offline/u,
  );
});

test("Potential has no standalone public route or scene classification", () => {
  assert.equal(fs.existsSync(path.join(ROOT, "potential.html")), false);
  assert.equal(fs.existsSync(path.join(ROOT, "content/scenes/archie/potential.json")), false);
  for (const sceneName of [
    "applications.json",
    "applications_explore_models.json",
    "applications_analyze_evidence.json",
    "applications_build_simulate.json",
    "applications_learn_reference.json",
  ]) {
    const scene = fs.readFileSync(path.join(ROOT, "content/scenes/archie", sceneName), "utf8");
    assert.doesNotMatch(scene, /potential\.html|archie__potential|"nodeId"\s*:\s*"potential"/u);
  }
  const runtime = fs.readFileSync(
    path.join(ROOT, "src/apps/ideal-braid/IdealBraidRuntime.js"),
    "utf8",
  );
  assert.match(runtime, /if \(!snapshot\) \{\s*surfacePoints\.visible = false;\s*return;/u);
  assert.doesNotMatch(runtime, /snapshot\?\.surfacePotentials\s*\?\?/u);
});
