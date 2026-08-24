# EOM C++ Production Host

## Status

Accepted on 2026-07-13 by operator decision. Numerical and accelerator promotion remains evidence-gated.

## Context

EOM must combine native CPU threading, SIMD, explicit memory control, heterogeneous accelerator execution, continuous retained histories, exact ordered-pair accounting, and precision beyond hardware floating point. The independent Python oracle is deliberately too slow to be the production engine, while JavaScript remains suitable only for a thin application shell.

The local architecture baseline established strong C++ CPU evidence but had not selected a host language because the prior decision rule required a second native-language benchmark. The operator has now selected C++ directly. That choice settles the host-language question without weakening any mathematical, precision, parity, performance, or migration gate.

## Decision

1. The EOM production host is C++20.
2. Regular certified numeric work begins with outward-rounded hardware binary64. Difficult rows escalate locally through MPFR/GMP directed interval arithmetic, with the precision route and achieved precision recorded.
3. The independent Python decimal-interval oracle remains separately authored and must not import or become the C++ production implementation.
4. CPU threading and SIMD live in the C++ host. Accelerator kernels may use the native API required by each platform, but they return certified difficult rows to the host and must preserve one mathematical and certificate schema.
5. The new engine lives under `src/eom`.
6. No native C ABI or application bridge is frozen until the coupled integrator and streaming ownership boundaries determine the stable request, result, cancellation, checkpoint, and progress contracts.
7. EOM is the endorsed solver and sole forward production target. New solver-dependent work must use or extend EOM.
8. No other production solver may be introduced, restored from history, or used to create authoritative motion, causal-root, path-history, coupled- evolution, or solver-owned geometry output.
9. Producer-asserted evidence flags do not create authority. EOM output gains authority only through the declared acceptance and migration gates backed by independent oracles.
10. JavaScript solver code may exist only as explicitly named reference, fallback, test, fixture, or comparison code. It cannot become the production path or bypass a missing EOM capability.
11. When EOM lacks a required capability, dependent application, simulation, or research-instrument work remains blocked, quarantined, or explicitly non-authoritative.
12. Topology, EOM solver and ABI, versioned record contracts, interaction law, path-history storage, wake-history and event rows, output datasets, and visualization remain separate responsibilities.

## Consequences

- A second host-language benchmark is no longer a prerequisite for choosing C++; it may still be run as a risk or portability comparison.
- C++ implementation work may proceed immediately, but no output has EOM authority until the complete coupled evolution and acceptance gates pass.
- MPFR and GMP are host dependencies for certified difficult-row replay.
- Metal, CUDA, HIP, SYCL, multi-GPU, and distributed execution remain measured backend decisions rather than host-language decisions.

## Re-evaluation Triggers

Revisit this decision if a required target lacks a conforming C++20 and MPFR/GMP toolchain, if measured accelerator integration cannot preserve the certificate contract, or if representative end-to-end evidence shows that the chosen host cannot meet the accepted resource envelope.
