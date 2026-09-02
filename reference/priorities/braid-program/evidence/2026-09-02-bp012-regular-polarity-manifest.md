# BP-012 Source-Bound Regular-Polarity Manifest

Date: 2026-09-02
Compatibility identifier: `aaa-corpus-advancement`
Status: exact manifest and completeness checks ready for independent integration review; shared root-kernel producer remains open
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

The ignored analytical manifest is:

`./.local-data/braid-analysis/bp012-regular-polarity-20260902/regular-polarity-orbit-manifest.v1.json`

It is 8,082,872 bytes with SHA-256 `2ddede04f9e50d8c8c00e217bce43c54e00560893e4bc15102d1b223c31662b5`. A second fresh output was byte-identical.

Reproduce without overwriting the retained file:

```sh
node scripts/prescribed-path-analysis/build-regular-polarity-orbit-manifest.mjs --out .local-data/braid-analysis/bp012-regular-polarity-20260902/regular-polarity-orbit-manifest.reproduction.v1.json
node --test tests/regular-polarity-orbit-manifest.test.js
```

The builder SHA-256 is `7886e5076f960fedb9e23418eb11dccd661d8a4ea1619d5c9ca425d07781fbd6`; the test SHA-256 is `d90213a5a3ff2e2b49eb79e92df13010dea0045c0dd6da7b1dd0eb87c7734ff1`. The three focused tests pass; the complete census test finishes in about 31.6 seconds on the measured host.

## Boundary And Falsifier

This is a derived finite-combinatorics and source-binding result. It does not calculate a causal root, topology cell, residual, balance, bounded negative, evolution, retention, stability, binding, or physical ranking. BP-012 still requires the shared circular-root kernel, regular-only sharded projection, topology-boundary probes, candidate refinement, completeness reducer, and unchanged independent full-evaluator checks.

A balanced word outside exactly one recorded orbit, a noncanonical row, a manifest/Burnside mismatch, an orbit-population/binomial mismatch, a failed source binding, or a disagreement with the pre-existing canonicalizer overturns the corresponding statement.

Closure goal: independently admit the exact manifest, then implement one polarity-independent root kernel per $(N,\beta_f)$ and project the 40,952 rows through it without launching the redundant serial evaluator.
