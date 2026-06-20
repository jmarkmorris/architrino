import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../solver-gpu-harness.html", import.meta.url), "utf8");
const runtime = readFileSync(
  new URL("../src/apps/solver-gpu-harness/main.js", import.meta.url),
  "utf8"
);
const priorityDoc = readFileSync(
  new URL("../reference/priorities/solver/gpu-feasibility-harness.md", import.meta.url),
  "utf8"
);
const solverDoc = readFileSync(
  new URL("../reference/priorities/solver/solver.md", import.meta.url),
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

test("solver priority docs keep GPU harness exploratory and non-authoritative", () => {
  assert.match(priorityDoc, /Status: learning harness/);
  assert.match(priorityDoc, /non-authoritative for precision claims/);
  assert.match(priorityDoc, /CPU path remains the deterministic validation and precision authority/);
  assert.match(solverDoc, /\[GPU feasibility harness\]\(gpu-feasibility-harness\.md\)/);
});
