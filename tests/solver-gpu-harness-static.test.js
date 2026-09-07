import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../solver-gpu-harness.html", import.meta.url), "utf8");
const runtime = readFileSync(
  new URL("../src/apps/solver-gpu-harness/main.js", import.meta.url),
  "utf8"
);
const solverDoc = readFileSync(
  new URL("../reference/priorities/app-solver/priorities.md", import.meta.url),
  "utf8"
);

test("solver GPU harness is wired as a local app", () => {
  assert.match(
    html,
    /src="\/src\/apps\/solver-gpu-harness\/main\.js"/,
    "root harness page should load the focused runtime module"
  );
  assert.match(html, /Solver GPU Harness/);
  assert.match(html, /Run CPU and GPU/);
});

test("solver GPU harness keeps CPU parity and WebGPU feature detection explicit", () => {
  assert.match(runtime, /navigator\.gpu/);
  assert.match(runtime, /runCpuBenchmark/);
  assert.match(runtime, /runGpuBenchmark/);
  assert.match(runtime, /CPU\/GPU parity/);
  assert.match(runtime, /GPUBufferUsage\.STORAGE/);
  assert.match(runtime, /dispatchWorkgroups/);
  assert.match(runtime, /WebGPU f32/);
});

// The harness's own status note was deleted with the EOM consolidation
// (4ea188081, 2026-07-16). The live owner of the statement that GPU paths are
// research lanes whose promotion needs oracle agreement is decision 12 of the
// app-solver tracker; EOM-014 repointed this test there.
test("solver priority tracker keeps GPU paths research-grade and oracle-gated", () => {
  assert.match(solverDoc, /GPU and other accelerator paths remain required long-term research and implementation lanes/);
  assert.match(solverDoc, /depend on agreement with the independent oracle and declared precision budgets, not on speed alone/);
  assert.match(solverDoc, /`EOM` is the endorsed solver and sole forward production target/);
});
