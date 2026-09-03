# BP-012 Bounded Speed and Topology Schedule

Date: 2026-09-02
Compatibility identifier: `aaa-corpus-advancement`
Status: exact fold schedule frozen; seven-speed 40,952-class diagnostic complete; continuous exclusions remain open
Queue owner: [BP-012 — Circular-Path Regular-Polarity Completion](../work-queue.md#bp-012--circular-path-regular-polarity-completion)

## Exact Topology Schedule

For a regular $N{:}N$ ring, every fold boundary on $0.05\leq\beta_f\leq20$ is indexed by a positive integer $q$ and solves

$$
M(\beta_f)
=
\sqrt{\beta_f^2-1}-\arccos(1/\beta_f)
=
\frac{\pi q}{2N}.
$$

Because $M'(\beta_f)=\sqrt{\beta_f^2-1}/\beta_f>0$ for $\beta_f>1$, every admitted $q$ has one boundary. The tracked schedule enumerates all such boundaries and the open topology cells between them:

| $N$ | Fold boundaries | Open topology cells | First fold | Last fold below $20$ |
| ---: | ---: | ---: | ---: | ---: |
| 7 | 82 | 83 | 1.4280031481794913 | 19.94648096519581 |
| 8 | 93 | 94 | 1.388154767094031 | 19.806053451678046 |
| 9 | 105 | 106 | 1.3562923888572653 | 19.871586604709 |
| 10 | 117 | 118 | 1.3301486520078236 | 19.92401273181641 |
| 11 | 129 | 130 | 1.3082525742724451 | 19.96690657655919 |
| 12 | 140 | 141 | 1.2896055860174487 | 19.871586604709 |

Every campaign cell receives its midpoint as the topology representative. Every fold receives separate one-sided floating probes; the fold itself remains outside ordinary-root evaluation and requires a fold-aware interval treatment.

Plainly: the speed interval is no longer an arbitrary grid. It is partitioned at every speed where a causal-root pair is born or dies, so later interval work knows exactly which root owners must remain fixed inside each cell.

## Seven-Speed Census

The shared-kernel census was extended from one speed to the fixed set $\{0.05,0.5,0.99,1.01,3.070356625390253,10,20\}$. All 40,952 representatives were projected at every speed: 286,664 finite-point projections. The alternating class minimized the maximum member full-vector residual in every one of the 42 inventory-speed rows. The smallest observed residual for each inventory occurred at $\beta_f=0.05$:

| $N$ | Smallest scheduled residual | Class |
| ---: | ---: | --- |
| 7 | 0.41252091171058414 | alternating |
| 8 | 0.5375209117234139 | alternating |
| 9 | 0.6791875783882606 | alternating |
| 10 | 0.837520911721434 | alternating |
| 11 | 1.0125209117149065 | alternating |
| 12 | 1.2041875783795177 | alternating |

The unchanged full evaluator was rerun at the finite-point minimizer and, when distinct, the first manifest negative control. All 42 recorded controls agree with the shared projection. This is implementation consistency, not an independent continuous proof. No residual lower bound is asserted between scheduled points or across a fold.

Plainly: seven separated speeds all give a visible nonzero residual, and the alternating word is best at every measured row. A balance can still exist between those speeds, so this is a bounded-search diagnostic rather than a no-zero theorem.

## Reproduction And Boundary

Run:

```sh
node scripts/prescribed-path-analysis/run-bp012-bounded-schedule.mjs
node --test tests/bp012-bounded-schedule.test.js tests/regular-polarity-shared-kernel.test.js tests/regular-polarity-shard-pipeline.test.js
```

The schedule/census source SHA-256 is `bbf8b59093d6082ae175b5d709773deba01340a7090f0fffea850e837dbf31fa`; the focused schedule test SHA-256 is `6eb20b99e394848c2dae944257510d45f3028e981c1a535f72f7717ea8ef4d1b`.

Claim grades are **derived** for the fold equation, its monotonic uniqueness, and the finite topology partition; **measured** for the 286,664 projection census; and **consistency only** for shared-kernel/full-evaluator agreement. No interval-certified exclusion, balance, evolution, retention, stability, binding, identity, score, or scientific acceptance follows.

A missing fold, a duplicated or gapped topology cell, an unresolved scheduled ordinary point, a smaller retained projection than reported, a nonalternating scheduled minimizer, or a disagreement with the unchanged full evaluator falsifies the corresponding statement.

Closure goal: run outward-rounded root and residual enclosures cell by cell, beginning with the alternating class and any finite-point near-minimizers, while retaining all other classes until interval bounds exclude them.
