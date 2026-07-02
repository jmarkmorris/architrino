# Solver GPU Feasibility Harness

Status: learning harness.

The solver keeps production GPU acceleration deferred until the central CPU solver contract, precision behavior, and app-facing API are stable. A separate GPU feasibility harness is still useful now because it lets us learn the browser/WebGPU toolchain, measure regular parallel kernels on macOS hardware, and identify the kinds of solver work that could later justify an acceleration tier.

## Scope

- Keep the harness isolated from production solver correctness paths.
- Use WebGPU first because it runs from the existing local web server and exercises the same class of GPU compute APIs available to browser apps.
- Treat all harness measurements as exploratory performance data.
- Treat WebGPU `f32` kernel output as non-authoritative for precision claims.
- Compare every GPU run against a CPU reference path with hit counts and checksums.
- Record adapter identity, pair count, repetitions, total runtime, dispatch/readback runtime, throughput, hit count, checksum, and parity result.

## Current Harness

Harness page: [../../../solver-gpu-harness.html](../../../solver-gpu-harness.html)

Runtime module: [../../../src/apps/solver-gpu-harness/main.js](../../../src/apps/solver-gpu-harness/main.js)

The first kernel is a broad-phase source-receiver emission-shell scan. It uses structure-of-arrays-like typed buffers, one work item per source-receiver pair, and a simple residual check:

$$
\left|\lVert r_i - s_i\rVert - R_i\right| < \epsilon.
$$

This is not the central solver algorithm. It is a regular, massively parallel shape of work that is close enough to the solver's source-receiver and emission-shell workload to teach useful lessons about GPU dispatch cost, readback cost, throughput, and CPU/GPU parity handling.

## Measurement Rules

- Always report whether WebGPU is available.
- Always run the CPU reference when comparing speed.
- Separate GPU setup cost from dispatch/readback cost where possible.
- Do not infer high-precision solver suitability from `f32` WebGPU parity alone.
- Do not migrate app-facing solver paths to GPU from this harness.
- Use results to decide whether a future native Metal or WebGPU acceleration tier deserves a dedicated design.

## Initial Manual Observation

Early browser measurements on macOS via the Apple/Metal WebGPU adapter do not yet justify moving GPU work into the production solver. A smaller benchmark run showed CPU ahead by roughly $5.3\times$ when total GPU dispatch/readback time was included. A larger run at about two million pairs and nine repetitions showed the GPU only about $1.06\times$ faster.

Interpretation: the GPU can reach break-even on larger regular batches, but the observed gain is too small to justify production complexity by itself. The first production solver should remain CPU-first. GPU work should stay in the harness until a more solver-representative kernel shows a large, repeatable advantage after transfer, dispatch, readback, and CPU verification costs are included.

## Candidate Follow-Up Kernels

- Broad causal-root bracketing over independent source-receiver pairs.
- Bulk field/grid sampling for visualization or coarse screening.
- Path-history downsampling and display projection.
- Spatial-block and time-slab broad-phase intersection screening.
- Residual scans where the precision contract allows a GPU prefilter followed by CPU verification.

## Promotion Criteria

GPU acceleration should move beyond this harness only when all of the following are true:

- A regular, massively parallel hotspot is measured in the CPU solver profile.
- The GPU kernel can be placed behind the same solver API and work-packet schema.
- The CPU path remains the deterministic validation and precision authority.
- The GPU path has parity tests, precision limits, stage-level benchmarks, and deterministic fallback behavior.
- Data transfer and readback costs do not erase the speed benefit for realistic solver packet sizes.
