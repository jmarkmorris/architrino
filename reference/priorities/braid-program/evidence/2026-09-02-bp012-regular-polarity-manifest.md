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

## Regular-Only Shard Producer And Reducer

The tracked `run-regular-polarity-shard.mjs` now supplies three fail-closed modes. `kernel` writes one complete source-bound kernel artifact for fixed $(N,\beta_f)$. `project` assigns manifest representatives by index modulo the declared shard count and projects them through that bound kernel without solving another root. `reduce` requires every shard index exactly once, rejects source mismatches and duplicate or unknown class identifiers, recomputes every projection, and requires exact manifest coverage.

A retained $N=7$, $\beta_f=3.070356625390253$ four-shard execution consumes the current 40,952-row manifest and one 39,653-byte kernel. The kernel has 28 roots per receiver, no fold event, minimum Jacobian floor $0.7071146280572445$, and maximum root-equation residual $8.24\times10^{-13}$. Its SHA-256 is `60fcc4f669e94569e85b40968220bf3fac9c97c3a0fded355caafba56ef1a4c3`. The four projection shards contain all 85 representatives exactly once; the reducer replays all 85 and reports zero missing or duplicate rows. The reduction receipt SHA-256 is `ab537a2e808a9aa4a3c94d47e3c73e8b2ff9b4b18257967cc94b5e7963481859`.

The same fixed-speed kernel mode was then run once for every remaining inventory, without invoking the redundant direct polarity evaluator:

| $N$ | Roots per receiver | Kernel bytes | Kernel SHA-256 |
| ---: | ---: | ---: | --- |
| 8 | 32 | 45,268 | `cc94402be6ac9fb6ddc75056a42d990dab1a1e63e5c11f1825dc2cadc59595bf` |
| 9 | 36 | 50,796 | `8ec001b0309c2cdc3f8c2b9d113fd0fba7f9a9310e075de885bd3d647288ea14` |
| 10 | 40 | 55,998 | `026f253e6aaae3b62a785e222c5668f45d05a363c7c6cc68148304773d62650e` |
| 11 | 44 | 61,546 | `ebed4458961636b559cce4575b8b322823405b6e7383dc0ccc56fad13577cd68` |
| 12 | 48 | 67,180 | `afdc455f85f395b3f39388bf2afa6499f340e82c9b53400532988427c5d7fbd2` |

All six $N=7$ through $N=12$ kernels report complete finite chord ledgers, no fold event at this speed, minimum Jacobian floor at least $0.7071146280572445$, and maximum root-equation residual $8.24\times10^{-13}$. The four-shard producer and reducer then projected the full fixed-speed manifest:

| $N$ | Expected and replayed representatives | Total shard bytes | Reduction SHA-256 |
| ---: | ---: | ---: | --- |
| 7 | 85 | 603,989 | `ab537a2e808a9aa4a3c94d47e3c73e8b2ff9b4b18257967cc94b5e7963481859` |
| 8 | 257 | 2,048,693 | `80917bec692860364533da5e55df3ab7958b94586bc8b497d7efa0c97cf34816` |
| 9 | 765 | 6,776,801 | `06afe25827427b0cabbd7276ec21a3bdb31cc5172d0b75014e4b95a37ad11ed0` |
| 10 | 2,518 | 24,551,872 | `9729e58284f9204495cd134cb31d36e32ec5f91bc5528d74c95c0816193de86d` |
| 11 | 8,359 | 88,884,746 | `a0854e6abe5113a2007f7132cb5cb897e0441973ae47a959dedbc1cad4e45a5b` |
| 12 | 28,968 | 333,556,228 | `43398ac56edc391ff1476dd144bbba8e78d751d58c4db9ed957092fcf069d7fa` |

Every reduction reports expected count equal to received and replayed count, with zero duplicate or missing class identifiers. The retained ignored analytical directory occupies 467 MiB including the manifest, kernels, shards, and receipts. This completes all 40,952 regular-polarity projections at one fixed speed, but it does not certify an interval in speed.

Plainly: one reusable root table and one source-bound floating projection now exist for every declared polarity class at the demonstration speed. The bounded speed schedule, topology-boundary probes, and candidate refinement remain open.

## Fixed-Speed Full-Vector Diagnostic

A read-only reduction over the complete retained shard set measured the smallest maximum-member full-vector residual in each inventory at $\beta_f=3.070356625390253$:

| $N$ | Classes read | Smallest maximum-member residual | Minimizing class |
| ---: | ---: | ---: | --- |
| 7 | 85 | 7.9798228240434605 | alternating |
| 8 | 257 | 10.84037148292789 | alternating |
| 9 | 765 | 13.315014578036166 | alternating |
| 10 | 2,518 | 16.838461085428204 | alternating |
| 11 | 8,359 | 19.98356543037336 | alternating |
| 12 | 28,968 | 24.16997687850113 | alternating |

No class had maximum-member full-vector residual below one at this speed. In every minimizing row the axial residual is exactly zero in floating output, the radial residual is at most $1.34\times10^{-15}$, and the displayed residual is therefore tangential. The read-only pass consumed all 40,952 rows in 2.56 measured wall-clock seconds. This is a finite-point measured diagnostic of the prescribed evaluator, not an interval lower bound and not an independent proof that the alternating class is globally optimal in speed.

Plainly: at this one speed, every regular polarity class misses full-vector balance by a visible tangential component; the alternating word misses least for every tested ring size. A different speed can change that ordering or create a zero, so the bounded speed search remains necessary.

The pipeline script SHA-256 is `b826d709c5f83ad610923de80be278b442d5020506484bea130d00514dedf778`; its focused end-to-end test SHA-256 is `f02106d4fc86ad1ea94bb1cce711b2d835c6c68b4f98d983bd096c4c2e051ab6`. The fixed-speed pipeline test and both shared-kernel tests pass.

Plainly: the campaign now has a working nonredundant data path from manifest to one root kernel per ring size to independent shards to exact completeness receipts. This one-speed census is finite-point infrastructure evidence, not a search result across the declared speed interval.

## Boundary And Falsifier

The manifest is a derived finite-combinatorics and source-binding result. The shared kernel and sharded pipeline are implemented prescribed-path reductions, not a continuous speed-domain certificate. BP-012 still requires a declared speed/topology schedule, topology-boundary probes, candidate refinement, the full scheduled $N=7$ through $N=12$ campaign reduction beyond this single speed, and unchanged independent full-evaluator checks at promoted candidates and negative controls. No balance, bounded negative, evolution, retention, stability, binding, or physical ranking is established here.

A balanced word outside exactly one recorded orbit, a noncanonical row, a manifest/Burnside mismatch, an orbit-population/binomial mismatch, a failed source binding, a disagreement with the pre-existing canonicalizer, or a retained projection row below the reported fixed-speed minima overturns the corresponding statement.

Closure goal: independently admit the manifest, shared kernel, and fixed-speed shard pipeline, then freeze the speed/topology schedule and run the bounded $N=7$ through $N=12$ campaign without using the redundant serial evaluator.
