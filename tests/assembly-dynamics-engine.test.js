import test from "node:test";
import assert from "node:assert/strict";

import { run as runLegacyAssemblyDynamics } from "../scripts/simulations/assembly-dynamics-toy.mjs";
import {
  ANIMATOR_SIMULATION_DATASET_KIND,
  createAssemblyDynamicsConfig,
  runAssemblyDynamicsDataset,
  runAssemblyDynamicsSimulation,
} from "../scripts/simulations/lib/assembly-dynamics-engine.mjs";
import { normalizeAnimatorSimulationDataset } from "../src/apps/animator/AnimatorSimulationDatasetRuntime.js";

const SMALL_RUN = {
  steps: 8,
  stride: 4,
  particles: 2,
  kappa: 0.002,
  rootHaltPolicy: "none",
};

test("assembly dynamics engine module preserves legacy solver output", () => {
  const config = createAssemblyDynamicsConfig({
    ...SMALL_RUN,
    out: "/tmp/not-used.json",
    csv: "/tmp/not-used.csv",
    svg: "/tmp/not-used.svg",
    pretty: true,
  });

  assert.equal(config.out, null);
  assert.equal(config.csv, null);
  assert.equal(config.svg, null);
  assert.equal(config.pretty, false);

  const viaModule = runAssemblyDynamicsSimulation(config);
  const legacy = runLegacyAssemblyDynamics(config);

  assert.equal(viaModule.completed, legacy.completed);
  assert.equal(viaModule.frames.length, legacy.frames.length);
  assert.deepEqual(viaModule.summary.final, legacy.summary.final);
  assert.deepEqual(viaModule.summary.aggregate_hit_stats, legacy.summary.aggregate_hit_stats);
});

test("assembly dynamics engine module emits animator simulation datasets", () => {
  const dataset = normalizeAnimatorSimulationDataset(
    runAssemblyDynamicsDataset(SMALL_RUN, {
      id: "module_small_run",
      claimLevel: "solver-derived-diagnostic",
    })
  );

  assert.equal(dataset.kind, ANIMATOR_SIMULATION_DATASET_KIND);
  assert.equal(dataset.id, "module_small_run");
  assert.equal(dataset.claimLevel, "solver-derived-diagnostic");
  assert.equal(dataset.simulation.mode, "planar-2d");
  assert.equal(dataset.simulation.halt.status, "completed");
  assert.equal(dataset.simulation.solver.engineId, "assembly-dynamics-toy");
  assert.deepEqual(
    dataset.particles.map((particle) => particle.id),
    ["p0", "p1"]
  );
  assert.equal(dataset.frames.length, 3);
  assert.deepEqual(dataset.frames[0].particles[0].position, [1, 0, 0]);
  assert.equal(dataset.frames[2].diagnostics.partnerHits, 2);
  assert.equal(dataset.diagnostics.aggregateHitStats.total_partner_hits, 16);
});
