# BP-012 Source-Bound Regular-Polarity Manifest

Date: 2026-09-02
Compatibility identifier: `aaa-corpus-advancement`
Status: exact manifest and shared root-kernel implementation ready for independent integration review; sharded campaign remains open
Queue owner: [BP-012 — Circular-Path Regular-Polarity Completion](../work-queue.md#bp-012--circular-path-regular-polarity-completion)

## Result

The tracked builder `scripts/prescribed-path-analysis/build-regular-polarity-orbit-manifest.mjs` now emits the complete canonical representative manifest for every balanced regular polarity word with $7\leq N\leq12$. The generated manifest contains exactly 40,952 orbit representatives and accounts for all 3,659,266 labeled balanced words:

| $N$ | Orbit representatives | Labeled balanced words |
| ---: | ---: | ---: |
| 7 | 85 | 3,432 |
| 8 | 257 | 12,870 |
| 9 | 765 | 48,620 |
| 10 | 2,518 | 184,756 |
| 11 | 8,359 | 705,432 |
| 12 | 28,968 | 2,704,156 |

Each row records the canonical polarity word, stable class identifier, exact orbit size, and alternating, antipodal-neutral, or remaining-balanced subclass. The manifest binds the pre-existing ring evaluator source and the BP-012 Burnside reduction by SHA-256.

Plainly: every labeled plus-minus assignment belongs to exactly one recorded symmetry class. The manifest is now an executable campaign input rather than only a count of how many inputs should exist.

## Completeness Checks

For each $N$, the builder independently requires both

$$
\#\text{manifest rows}=\#\text{Burnside orbits}
$$

and

$$
\sum_{\mathcal O\ \text{in manifest}}|\mathcal O|={2N\choose N}.
$$

The focused test compares integer-mask canonicalization against the pre-existing string-orbit implementation, then compares every canonical representative and orbit size through $N=9$. It separately runs the complete $N=7$ through $N=12$ census and reproduces the six accepted totals.

Plainly: the first check verifies the number of symmetry classes; the second verifies that their sizes cover every balanced word without loss. The older implementation supplies a separately written comparison path on the feasible smaller inventories.

## Retained Artifact And Reproduction

The current ignored analytical manifest is:

`./.local-data/braid-analysis/bp012-regular-polarity-20260902/regular-polarity-orbit-manifest.v2.json`

It is 8,082,872 bytes with SHA-256 `2a16ebfc6784aaa85466d5569773feadf964b3cdeed5bd1a588e7d81652681a7`. A second fresh output was byte-identical. Version 2 binds the source generation containing the shared circular-root kernel; the earlier version remains historical and is not the campaign input.

Reproduce without overwriting the retained file:

```sh
node scripts/prescribed-path-analysis/build-regular-polarity-orbit-manifest.mjs --out .local-data/braid-analysis/bp012-regular-polarity-20260902/regular-polarity-orbit-manifest.reproduction.v2.json
node --test tests/regular-polarity-orbit-manifest.test.js
```

The builder SHA-256 is `7886e5076f960fedb9e23418eb11dccd661d8a4ea1619d5c9ca425d07781fbd6`; the test SHA-256 is `d90213a5a3ff2e2b49eb79e92df13010dea0045c0dd6da7b1dd0eb87c7734ff1`. The three focused tests pass; the complete census test finishes in about 31.6 seconds on the measured host.

## Shared Circular-Root Kernel

`buildRegularCircularRootKernel` now evaluates the complete finite chord-domain ledger once for each regular phase separation at fixed $(N,\beta_f)`. `projectRegularPolarityKernel` applies the exact polarity-product convolution to every receiver row without another root solve. The kernel retains all roots, inactive gaps, fold events, topology counts, and root-quality summaries; the projection returns every receiver's radial, tangential, axial, compatible-scale, and full-vector residual rows.

The focused parity test compares the shared projection with the pre-existing direct evaluator for three inventories, five speeds spanning both sides of field speed, and multiple balanced polarity words. All receiver coefficients, root counts, compatible scales, and maximum residuals agree within the declared floating tolerance. The broader unchanged root/reference suite also passes: 18 tests total. This parity verifies the implementation reduction; independent mathematical authority still comes from the finite chord-domain derivation and the unchanged generic/self-root checks at accepted campaign points.

The source module SHA-256 is `8019529f25e72cee00e48329201d41cb85ec96ced59954ce7dc615d4621aefc7`; the shared-kernel test SHA-256 is `13796dec99a8db73287773621a51a19ff2a5c77f0de4b0dd21708c2e0bff776c`.

Plainly: the expensive causal geometry is now computed once per ring and speed, while every polarity word only changes the signs in the final sums. Agreement with the older direct path checks the implementation reduction but does not turn a later finite scan into an interval proof.

## Boundary And Falsifier

The manifest is a derived finite-combinatorics and source-binding result. The shared kernel is an implemented prescribed-path reduction, not a continuous speed-domain certificate. BP-012 still requires the regular-only sharded producer, topology-boundary probes, candidate refinement, completeness reducer, and unchanged independent full-evaluator checks. No balance, bounded negative, evolution, retention, stability, binding, or physical ranking is established here.

A balanced word outside exactly one recorded orbit, a noncanonical row, a manifest/Burnside mismatch, an orbit-population/binomial mismatch, a failed source binding, or a disagreement with the pre-existing canonicalizer overturns the corresponding statement.

Closure goal: independently admit the exact manifest and shared kernel, then build the regular-only sharded producer and completeness reducer without launching the redundant serial evaluator.
