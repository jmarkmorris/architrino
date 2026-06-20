# GPU Acceleration Deferral

Status: `closed-design-capture`

Kind: `solver-acceleration-policy`

Source task: `gpu_acceleration_deferral` in [solver.md](solver.md)

Primary dependencies:

- [cpp-clang-runtime-validation.md](cpp-clang-runtime-validation.md)
- [threading-execution-policy.md](threading-execution-policy.md)
- [work-packet-transport-contract.md](work-packet-transport-contract.md)
- [path-history-stream-contract.md](path-history-stream-contract.md)
- [precision-dynamic-range-contract.md](precision-dynamic-range-contract.md)
- [app-bridge-contract.md](app-bridge-contract.md)

Related learning harness:

- [gpu-feasibility-harness.md](gpu-feasibility-harness.md)

## Decision

GPU acceleration is deferred for the first central solver core, first app
migration, and first production validation path. The first solver authority is
the C++20 / Clang CPU runtime with deterministic single-thread fallback, bounded
native threading, WebAssembly smoke coverage, and shared app bridge validation.

Metal, WebGPU, CUDA-like service kernels, and any other GPU compute path are not
part of the first production solver contract. A GPU result cannot be the
precision authority, migration-parity authority, validation-replay authority, or
root-ledger authority until a later reopened design supplies explicit parity,
precision, fallback, and benchmark evidence.

## Preserved GPU-Ready Structure

Deferring GPU execution does not remove GPU-ready CPU structure. The solver
should continue to preserve:

- structure-of-arrays columns for hot path, root, hit, phase, and geometry rows;
- explicit packet ids, input ranges, output slots, checksums, and deterministic
  merge keys;
- independent source-receiver, time-slab, spatial-block, emission-shell, stream,
  replay, and benchmark packets where those units also improve CPU execution;
- stable binary layouts, stream ids, row counts, chunk ids, numeric encodings,
  and manifests that do not depend on a GPU vendor or device model;
- CPU deterministic reduction and single-thread replay as the correctness
  authority for any later acceleration tier.

These rules are CPU-value rules first. They also leave a future GPU path possible
without changing app-facing schemas or solver artifact vocabulary.

## Learning Harness Boundary

[gpu-feasibility-harness.md](gpu-feasibility-harness.md) remains a learning
harness, not a production solver path. Its WebGPU broad-phase source-receiver
emission-shell scan can measure dispatch cost, readback cost, throughput,
adapter identity, hit counts, checksums, and CPU/GPU parity for regular parallel
kernels.

Harness results are exploratory. WebGPU `f32` parity does not establish
high-precision solver suitability, app migration readiness, or validation
authority.

## Reopen Conditions

GPU acceleration may be reopened only after all of these are true:

1. CPU profiles identify a regular, massively parallel hotspot in the central
   solver or an app-facing bridge workload.
2. The candidate GPU kernel fits behind the same solver API, work-packet schema,
   stream/index contract, and app bridge schema.
3. The CPU path remains the deterministic validation and precision authority.
4. The GPU path declares numeric limits, precision downgrade behavior, and
   deterministic fallback behavior.
5. Parity tests compare GPU output with CPU output for hit counts, root labels,
   checksums, residuals, stream rows, and status records where applicable.
6. Stage-level benchmarks prove that dispatch, transfer, and readback costs do
   not erase the speed benefit for realistic packet sizes.

## Completion Judgment

`gpu_acceleration_deferral` is complete as a first-core policy artifact. The
production path is CPU-first, GPU-ready in data layout and packet structure, and
explicitly barred from claiming GPU acceleration until a later reopened design
meets the reopen conditions above.
