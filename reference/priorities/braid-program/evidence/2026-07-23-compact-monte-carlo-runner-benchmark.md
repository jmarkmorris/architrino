# Compact Monte Carlo Runner Benchmark

Status: current priority-only measured implementation and performance evidence, 2026-07-23. This report does not grade a braid family or establish stability, energy, retention, quantization, photon identity, or physical realization.

## Verdict

The dedicated compact runner is operational for diagnostic full-taxonomy coverage as well as the retained local-neighborhood performance fixture. It uses the prescribed-path analytical evaluator only, requires `fieldSpeed: 1`, evolves no path, invokes no EOM solver, constructs no full result packet, retains no raw event ledger, performs no independent acceptance, and publishes no database generation.

The exact-source/full-grid B1.3 timing fell from the prior 59.715-second no-sensitivity full-packet measurement to 11.475 seconds in compact mode on the same canonical source and complete protocol. The ratio is `5.20x`. This comparison isolates packet/invariant work because it uses the same source and full numerical grid. Compact mode omits evidence artifacts and therefore does not preserve the full evidence packet; tests establish equality of the scored surface reductions, not equality of the intentionally absent raw evidence.

The reduced coverage grid completed a seeded nine-point A/B/C matrix in 37.160 seconds. More than 99.9 percent of per-case wall time remained inside analytical evaluation; source/protocol setup and compact score construction were each about one millisecond. Further material per-point gains must therefore reduce root/event evaluation cost or event count rather than optimize JSON or storage.

## Implementation boundary

The compact path:

- validates and hashes one exact source per case;
- creates one analysis session per case and reuses validated source trajectories;
- caches prescribed-period closure and primary/refined minimum-separation rows;
- evaluates surface, fixed-internal, moving-receiver, and branch-diagnostic event batches without constructing full result packets;
- omits unused compact-mode topology hashes and source sensitivity;
- records the complete sampled specification, hashes, score, measured cost, and exact rerun instruction; and
- randomizes execution order from the declared SHA-256 seed while sorting output rows by member and sample ordinal.

The default sampler is now `constraint-preserving-full-taxonomy/sha256-counter-v1`. It varies every declared coordinate type through the bounded measure in the methodology, including exact coupled frequency/radius strata, general C axial spacings and identity order, circulation, polarity, and bounded common translation. The earlier local-reference sampler remains available only for reproducing the performance fixture.

## Measured identities

| Identity | Value |
| --- | --- |
| Machine-readable result | `.local-data/braid-analysis/performance/compact-monte-carlo-abc-coverage-v3.json` |
| Campaign hash | `dbb7a33bdd2afd6b75bf541a062c4f698c3dc67bbf984e6aa37b99b0811e1461` |
| Coverage protocol hash | `d9e44a6c00a6274ca11279e697b0f2ab9dec7123d4e247d02a41c56077836e40` |
| Implementation hash | `6cd2429ecd607ec2aef292130e22471e8626cf19e2a286c10e8b9c0ef25b0476` |
| Runtime and host | Node `v26.3.0`; Darwin `25.5.0` arm64 |
| Cases | 9: three each for A1.2, B1.3, and C5 |
| Campaign wall time | 37.160 s |
| Machine-readable result size | 155,609 bytes |
| Maximum process-lifetime RSS observed | 417,296 KiB |

The maximum RSS is a process-lifetime high-water mark. It bounds this run but does not isolate incremental memory attributable to one case.

The complete tolerances, root policy, field speed, and primary/refined grids are bound by the recorded protocol hash rather than restated selectively here. The matrix is reproduced with:

```bash
node scripts/eom/run-compact-monte-carlo.mjs \
  --seed compact-abc-benchmark-20260723-v3 \
  --cases-per-member 3 \
  --resolution coverage \
  --members A1.2,B1.3,C5 \
  --output .local-data/braid-analysis/performance/compact-monte-carlo-abc-coverage-v3.json
```

The same-source/full-grid comparison is reproduced by loading B1.3 from the all-candidate registry, generating its exact prescribed source, and calling `evaluateCompleteCycleCandidate` with the checked-in complete-cycle protocol, `includeSensitivity: false`, and `evidenceMode: "compact"`.

## A/B/C matrix

| Member | Minimum | Median | Maximum | Mean | Mean analytical evaluation |
| --- | ---: | ---: | ---: | ---: | ---: |
| A1.2 | 3.595 s | 3.624 s | 5.287 s | 4.169 s | 4.167 s |
| B1.3 | 2.626 s | 2.905 s | 2.959 s | 2.830 s | 2.829 s |
| C5 | 4.964 s | 5.228 s | 5.968 s | 5.387 s | 5.385 s |

All three B1.3 rows passed every evaluated compact-coverage gate. Two of three A1.2 rows passed; one failed the refined moving-receiver gate. All three C5 rows failed the coverage-resolution surface-quadrature gate. Source sensitivity was not evaluated and is recorded as skipped rather than failed. These outcomes are diagnostic screening results, not independent acceptance decisions.

Each retained case identity occupied 8.4 to 9.6 KiB before the campaign wrapper. The complete pretty-printed result averaged 16.9 KiB per row. Storage and score construction are not current wall-clock bottlenecks.

## Full-taxonomy resolution calibration

The first all-member calibration used one constraint-preserving draw for each of the 21 catalog members and evaluated each exact source at both the compact coverage resolution and the checked-in full numerical resolution.

| Identity or result | Value |
| --- | --- |
| Machine-readable result | `.local-data/braid-analysis/compact-monte-carlo/full-taxonomy-calibration-v3.json` |
| Calibration hash | `2244b9ecc662a9a9d67ae146e01836e18886c96889bdf993c0baee6ba087fdab` |
| Sampler | `constraint-preserving-full-taxonomy/sha256-counter-v1` |
| Seed | `full-taxonomy-calibration-v3` |
| Implementation hash | `25c10eac3fec5737b2fc80286448aa343e696966dc5a06485e61f7461eb85080` |
| Coverage campaign hash | `a9335a48b3883dff96923e50eaef8190c6f580fa84547c97274b2f6a4a9dbc93` |
| Full-resolution campaign hash | `65911d8de42f4bcda4037317771158955ab05c018bb5f1b2e6c289ccc0e7ae0d` |
| Coverage wall time | 89.887 s |
| Full-resolution wall time | 335.319 s |

All 42 draws were retained. Nineteen members completed at both resolutions and were both-reject cases, so the observed case-level false-negative and false-positive counts within that conclusive subset were both zero. A1.3 and C5 were `drawn-not-evaluated` at both resolutions because named surface events failed the event-convergence gate; their sampled specifications and null scores remain in the table. One gate-level disagreement remained: B1.3 passed `fixedInternalRefined` at coverage resolution and failed it at full resolution. Every evaluated row failed `surfaceQuadrature` at both resolutions.

The unresolved exact-source hashes are `918309441319618622b97a4eabc4e02498b2ea8c0781507f3402d1cdde5a583d` for A1.3 and `f0aeef66d7661c2982e7bbd1ab49fc542c6ecd6fd0c0db04f57139b0d52343a7` for C5. The first rejected event differs by resolution:

| Member | Coverage event | Coverage maximum change | Full-resolution event | Full-resolution maximum change |
| --- | --- | ---: | --- | ---: |
| A1.3 | `surface-r1-mu-0-phi-11@4.333333333333333` | `2.3644517455068126e-9` | `surface-r1-mu-9-phi-5@4` | `2.7500313137807098e-9` |
| C5 | `surface-r1-mu-4-phi-8@4.333333333333333` | `2.5525750402266567e-9` | `surface-r1-mu-7-phi-22@4.166666666666667` | `1.2238885460646998e-9` |

Every named event preserved its causal-root identity. The maximum change was the probe-acceleration component change, against the declared `1e-9` event-convergence tolerance. These rows therefore expose a numerical-resolution blocker, not a super-field-speed exclusion or a root-enumeration failure. The A1.3 carrier speed is `1.02165427196553`; the C5 carrier speed is `0.9861935356591941`.

This is a completed structural and first resolution calibration, but it is not an informative favorable-region false-negative estimate because the audit contains no full-resolution pass and two members are unresolved. It also is not independent acceptance: compact calibration intentionally retains no acceptance-bearing raw event packets.

## Quota decision

Do not yet call `N=64` the production full-taxonomy quota. The full sampler was instantiated for all 1,344 proposed rows with seed `production-full-taxonomy-pilot-v1`; all 1,344 exact sources passed the canonical member validator. The sampler inventory hash is `7db3921f504f2cc7a6c8d3273df77920938c457460dcc69bc449b9ddb21b5e47`. The largest sampled total carrier speed was `1.2266717469` at A1.3 sample 19, and the largest common-translation speed was `0.03969276860` at C1 sample 3. The super-field-speed rows are permitted inputs to the event-specific root policy rather than rejected before evaluation.

`N=64` is a reconnaissance quota. In the worst case, a binomial proportion estimated from 64 independent draws has an approximately 12.3-percentage-point 95-percent margin of error, and a favorable region occupying one percent of the declared measure still has about a 52.6-percent probability of being missed. The quota is adequate to exercise every member and locate regions of several percent measure, not to rule out rare regions.

The constraint-preserving sampler and its bounded measure are now frozen in code and methodology. The remaining production blockers are calibration power and the two unresolved event-convergence rows. The completed audit has only one draw per member, all 19 conclusive full-resolution rows rejected at least the surface-quadrature gate, and therefore no full-resolution pass was available to test whether coverage would preserve it. Zero observed false negatives in 19 conclusive comparisons does not establish a small miss rate; with zero observed events, the rule-of-three 95-percent upper bound is about `3/19 = 15.8%`. A targeted resolution ladder must first adjudicate A1.3 and C5. A larger, stratified audit containing full-resolution passes or deliberately near-boundary cases must then precede the production label.

The sequential projection below retains the fully evaluated V2 21-member one-draw coverage matrix. The V3 wall time is not a valid throughput basis because two points exited early as not evaluated.

| Quota per member | Cases | Projected sequential wall time |
| ---: | ---: | ---: |
| 16 | 336 | 28.2 min |
| 32 | 672 | 56.3 min |
| 64 | 1,344 | 112.6 min |
| 128 | 2,688 | 3.75 h |
| 300 | 6,300 | 8.80 h |

## Event-specific root-domain resolution

The active complete-cycle protocol declares `fieldSpeed: 1` and uses `all-retained-roots/event-specific-isolation-certified.v2`. Total path speed above one is no longer a source-domain failure. Each transmitter/event retained interval is subdivided until every part is certified root-free or monotonic, and every sign-changing monotonic part contributes one isolated root.

A separately authored dense bracket-and-bisection fixture finds three roots for a circular super-field-speed transmitter. The evaluator independently returns the same three emission times, including one branch with negative transmitter-side derivative. A deliberately inadequate subdivision budget returns structured `causal_root_enumeration_incomplete` evidence rather than a partial score. This resolves the prior four-anchor precondition blocker without asserting stability, retention, or physical realization.

The provenance-bound small-probe baseline protocol still records `fieldSpeed: 4`; it must not be used for a current conclusion or combined with unit-speed evidence. Changing that legacy number without rebuilding its dependent artifacts would relabel historical inputs rather than reproduce them.

## Falsifiers and remaining work

- A rerun of the exact B1.3 source and full protocol that does not reproduce the compact score hash `ca070808c2db21ef4f7c5515216f4c319355124501c8816e398cccdefb59e45e` falsifies compact-score reproducibility.
- A compact/full test disagreement on an evaluated score or gate falsifies the compact evaluator.
- A broader uncontended catalog pilot whose median or upper-tail case time materially exceeds this A/B/C matrix falsifies the 95-minute projection.
- A coverage/full false-negative audit with unacceptable disagreement falsifies the reduced coverage grid as a useful screen.
- Full taxonomy-space production remains blocked on a larger stratified resolution audit with informative full-resolution passes or boundary cases, followed by the raw-evidence independent-acceptance audit for selected rows.
