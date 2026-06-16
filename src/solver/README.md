# Architrino Solver

This directory is the first C++/WebAssembly scaffold for the central architrino motion and geometry solver.

The first implementation target is a minimal causal-root and delayed-hit core behind a shared app bridge. The current files establish the toolchain, package boundary, native smoke targets, WebAssembly smoke target, app-facing TypeScript contract, shared geometry helpers, first precision diagnostics, first deterministic batch solver, and first native path-history stream.

## Toolchain

Run the preflight before building:

```bash
node scripts/solver-toolchain-preflight.mjs
```

`EM_CACHE` defaults to `.tmp/solver-emcache` when it is not set. That avoids Emscripten writing into the Homebrew cellar and keeps the cache out of source control through the existing `.tmp/` ignore rule.

To override it for a shell session:

```bash
export EM_CACHE=/private/tmp/architrino-emcache
```

## Smoke Builds

Build and run the native smoke target, and build the WebAssembly smoke target:

```bash
node scripts/build-solver-smoke.mjs all
```

Native and WebAssembly build outputs live under `.tmp/solver-build/`.

The smoke command verifies:

- C++20 native build through Clang/LLVM and Ninja;
- Boost.Multiprecision availability;
- model-contract, error-budget, simulation-envelope, and admission validation;
- shared geometry helpers for vector math, path bounds, bounds overlap, and spherical emission point checks;
- precision diagnostics through C++ and C ABI paths that classify ordinary and high-dynamic-range causal-root requests;
- deterministic causal-root solving over linear source and receiver path segments;
- delayed-hit event projection from retained causal roots;
- deterministic batch causal-root solving through C++ and C ABI paths, with native CPU worker fan-out and a WebAssembly sequential fallback;
- native binary path-history stream append/read behavior with chunk index and metadata manifest;
- the first fixed-layout `f64` causal-root C ABI;
- WebAssembly module loading, exported smoke calls, and bridge-level causal-root readback.
- transient stream descriptors for the first root and delayed-hit buffers;
- app bridge stream open, range readback, byte-range selection, max-byte pressure reporting, and stream release.

## First ABI Surface

The first checked ABI is intentionally narrow:

- `architrino_solver_solve_causal_roots_f64`
- `architrino_solver_solve_causal_root_batch_f64`
- `architrino_solver_diagnose_precision_f64`
- fixed-layout source and receiver linear path segments;
- fixed-layout root rows that correspond to the first `root_ledger.v1` fields;
- fixed-layout batch item rows that map each request to a root offset and root count;
- fixed-layout precision diagnostic rows that report scale stress and selected precision path;
- fixed-layout delayed-hit rows that correspond to the first `delayed_hit_events.v1` fields;
- ABI metadata for row sizes and ABI version;
- app bridge methods `diagnosePrecisionF64`, `solveCausalRootsF64`, `solveCausalRootBatchF64`, and `solveRootsAndHitsF64`.

This is a bootstrap ABI, not the final app migration API. It exists so the shared JavaScript bridge can call one real C++ solver function through WebAssembly while the full request, stream, and dataset contracts are still being implemented.

## First Path-History Stream

`solveRootsAndHitsF64` returns:

- root rows with layout `root_ledger.v1`;
- delayed-hit rows with layout `delayed_hit_events.v1`;
- buffer descriptors with row counts, byte lengths, numeric type, layout id, and copied `ArrayBuffer` payloads;
- one transient stream descriptor using `stream_index.v1` ranges.

The native `PathHistoryStreamWriter` writes fixed-layout `path_segment.v1` rows to a binary data file, writes fixed-layout `stream_index.v1` chunk rows to a companion index file, and writes a small metadata manifest. It is the first durable storage slice for path histories; it is intentionally narrow and will grow toward larger per-path datasets, range queries, and app-facing durable stream reads.

The app bridge can also open and range-read the first transient caller-buffer stream produced by `solveRootsAndHitsF64`. This gives apps one stable stream handle path for root and delayed-hit buffers before OPFS or native-file stream storage is exposed through the bridge.
