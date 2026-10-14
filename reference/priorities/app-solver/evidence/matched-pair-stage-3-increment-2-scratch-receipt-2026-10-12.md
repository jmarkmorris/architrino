# Stage 3 Increment 2: Whole-Step Matched Pairs, Scratch Qualification Receipt — 2026-10-12

Increment 2 lets the serial validated evolution driver enclose a declared matched pair by one whole-step interval. The independent reviewer released it after accepting increment 1, in the [version 4 review](../analysis/matched-pair-review-stage-3-increment-1-v4-2026-10-12.md), and asked for a scratch packet first. This receipt is that packet. **Nothing here is applied to the live solver:** `diff -rq src/eom .tmp/eom-matched-pair/stage3g-tree/src/eom` still reports no difference at 19:54:46Z, so the live tree is exactly the accepted increment 1 version 4. The mathematics is in [design addendum 3](../analysis/matched-pair-stage-3-evolution-design-addendum-3.md). Every instance uses $c_f=1$.

## What was built

- **A whole-step pair bound** in the matched-pair unit, `whole_step_pair_bound`. Given a receiver box that holds for the whole step, two member histories and the slab $[S_{\min},T]$ as exact tokens, it returns the tube-form radius $B$ of the accepted Stage 2 theorem from bounds over the whole slab, or a refusal code. It reuses the snapshot piecewise route's own cell construction and radius formula; the existing snapshot functions are not changed.
- **Declared groups in the step producer.** A step may be given pairs of path identifiers. For a receiver that is neither member, a pair with exactly opposite charges whose members are both uniformly present, and whose bound is certified, contributes one interval $[-B,B]$ on each axis in place of its two individual boxes. In every other case the members are enclosed one by one exactly as before. A member whose lower sign is undecided declines the whole step, as before.
- **Accounting.** Each step records, per receiver and declared pair, the disposition, both member identities, the slab, every bound that enters $B$, $B$ itself and the width of the interval. Each step also records counts: the $N$ self relationships, which are excluded because by H1 no path has a causal root on its own past, and the $N(N-1)$ others, each of which is individual, absent, or one of the two members of a grouped pair.
- **Driver.** A request selects the pair policy `canonical_whole_step_piecewise_tube/v1` together with at least one declared pair, or neither. Declarations must name two different existing paths and be pairwise disjoint; otherwise the initial population is refused. The policy token and the declared pairs, in declared order, are bound controls of the sealed continuation.

With no pair declared, nothing changes.

## Identities

| Item | SHA-256 |
| --- | --- |
| Scratch tree `.tmp/eom-matched-pair/stage3h-tree/src/eom`, copied from live version 4 | 90-file inventory [scratch-increment-2-source-inventory.sha256](matched-pair-stage-3-increment-2/scratch-increment-2-source-inventory.sha256); seven files differ from live |
| `MatchedPairEnclosure.hpp` | `e3a7a72350c0c795edde31453c054d1daacf9fa28ed80f92c621f04e2658202a` |
| `MatchedPairEnclosure.cpp` | `9c992072f88c7103335b90dc989ddc58472d1b543c7061cea2664f681e1f5911` |
| `ValidatedFarStep.hpp` | `1734462f574dbf73e6e7fd8eb0f16a0eb67212ff8efe00a88d3f8426c2b0cc10` |
| `ValidatedFarStep.cpp` | `d829f475425d81d46a3b2e70fba49fa683a65261cae3fbd5f4df9cbecda857ba` |
| `ValidatedEvolution.hpp` | `c626cd58df51e2247d2070ca28ee59c3fba1afc00f19906d3ddc8f5ae4e0ee69` |
| `ValidatedEvolution.cpp` | `2c1e6869a9722fb2c87a2ba370ebcdc6917d24609a4c306e629ff84481b6d66f` |
| `native/eom_validated_evolution_fixture_cli.cpp` | `2eb475c6e9b8e5b0b42a9b8dd29f838847c0b518c2bef6a22c1fc78ce6d70e9f` |
| Scratch build library, `.tmp/eom-matched-pair/build-stage3h/` | `8ce2c8a2356a77b7153f189a3bd28aa87d314694ad1555476e47e98e2eeccab0` |
| Scratch evolution fixture program | `1c8dcc85a5a117f617aa95d65c85e0b731a65a09c796d4e0c2591c60658eb60d` |
| [matched_pair_stage_3_increment_2_check.py](matched_pair_stage_3_increment_2_check.py) | `3c935d48e0760b30d92296c47c4de2e1ef2555974b2263597e571ee5c9edb946` |
| [matched_pair_stage_3_increment_2_truth.py](matched_pair_stage_3_increment_2_truth.py) | `feb9c68cb4fed5c1828afe33b3e9fb89a95a561aa32f71005cb22ffce697afe4` |
| [matched_pair_stage_3_increment_2_delta.py](matched_pair_stage_3_increment_2_delta.py) | `b1e579db459e110f7ff6086d7d78284be7f8c4987c73c3eee417f47d2009dc44` |
| Scratch outputs, 21 files | [scratch-output-identities.sha256](matched-pair-stage-3-increment-2/scratch-output-identities.sha256); the files are under `.local-data/eom-matched-pair/2026-10-12/increment-2/scratch-outputs/` |

The evidence directory [matched-pair-stage-3-increment-2/](matched-pair-stage-3-increment-2/) holds the seven changed sources, [increment-1-v4-to-increment-2.diff](matched-pair-stage-3-increment-2/increment-1-v4-to-increment-2.diff), which is the whole change, the run script, the checker and delta outputs, and the grouping fixture output. The build is CMake Release, two workers, with no compiler warning, run under the owned-compute supervisor with exit status 0.

## Instruments

The truth reference is exact rational interval arithmetic with rational square-root brackets and uses no solver code. It rests on one fact: a hit received before any emission after time zero can have arrived was emitted from the exact prescribed past, so its contribution is known in closed form. Its own known cases run first: one static source, a symmetric pair that cancels, the opposite pair at 10 and 11, a uniformly receding source, the same source given as a cubic piece, and a receiver box.

The checker is the increment 1 version 4 checker with a section added; no earlier checker was modified. All of its increment 1 rows are also applied to the grouped runs. The delta instrument compares outputs row by row with the accepted increment 1 outputs.

The fixture, the checker and the truth reference were written by the implementation writer. The independent elements are the reviewer's frozen three-path state brackets, read unchanged, and whatever the reviewer runs.

## Results on the scratch build

| Check | Result |
| --- | --- |
| Increment 2 checker | 133 of 133 assertions, five recorded quantities, exit status 0 |
| Increment 1 version 4 checker, unchanged, on the increment 2 outputs | 100 of 100 |
| Six ordinary solver fixture outputs and four far-step fixture outputs against the accepted live outputs | 10 of 10 byte-identical |
| Ten evolution fixture files that existed before, row by row against the accepted live outputs | 260 rows; no existing field differs; the only new fields are the step accounting, the group list and the pairing declaration |
| Library-port gate checker | 95 of 95 rows |

### Known cases first

- The truth reference's own known cases pass.
- With no declaration the three-path run publishes exactly the content chains of increment 1's three-path case.
- For the static pair at 10 and 11 the first-step bound is the analytic $2\kappa\ell/r^3$: $B=2.0000000000458\times10^{-6}$ against $2\times10^{-6}$.

### Accounting and the bound

- **Accounting**, 138 certified steps across every fixture file: $N$ self relationships excluded, the pair list has exactly $N(N-1)$ entries with no self entry, and individual plus absent plus grouped members equals $N(N-1)$, with grouped members twice the number of group intervals. For three paths that is six relationships, never nine.
- **The bound**, 20 receiver-group intervals: $B$ equals the tube-form radius recomputed in exact rationals from the exposed bounds, rounded outward by less than one part in $10^{12}$; the interval width is at least $2B$; the factor floor is at most one minus the speed bound; the receiver is never a member; and both members are marked grouped for that receiver.
- **Two identities, one interval:** a receiver whose only sources are the grouped pair has $[-B,B]$ on every axis, wider only by the outward rounding of one addition.

### Truth

- **Continuous over the receiver box.** On all 13 grouped steps of the static runs, the closed-form pair contribution over the receiver's whole step box lies inside $[-B,B]$; the smallest margin is $2.6\times10^{-7}$.
- **Individual route.** On every ungrouped step, the exact contribution at both axis ends of the receiver box lies inside the individual acceleration box. The contribution is monotone along the axis, so those two values span its range there.
- **Reviewer's frozen state brackets.** At $t=1/128$, $1/64$ and $1/32$ the position and velocity brackets of all three paths lie inside the grouped tubes, with four steps of $1/128$ and with eight steps of $1/256$.

### Between nodes

One long step of $0.125$. The follower rests at $11$ except for a smooth bump of height $0.0025$ in its past, placed so that hits from the bump arrive only at reception times strictly inside the step. At both ends of the step the pair is seen at rest.

| Quantity | Measured |
| --- | --- |
| Bound for the same pair with no bump | $B=2.0000000117\times10^{-6}$; contains the static truth |
| True contribution at reception times $0$ and $0.125$ | inside that at-rest bound |
| True contribution at 129 sampled reception times | exceeds the at-rest bound at 30 of them; largest magnitude $2.6225\times10^{-6}$ |
| Whole-step bound with the bump | $B=3.5895\times10^{-4}$; every sampled true contribution inside. Sampled, not continuous |
| Individual route on the same step | every sampled true contribution inside its box |

A bound formed from what the pair looks like at the step's ends would have been wrong inside the step. The whole-step bound is not, because its bounds are taken over the whole slab.

### Fallbacks, refusals and continuation

| Case | Measured |
| --- | --- |
| Two paths, the pair declared | every receiver is a member; identical to the undeclared run |
| One member present, one absent | not grouped; identical to the undeclared run |
| Equal charges declared as a pair | not grouped; identical to the undeclared run |
| Members on either side of the receiver | bound refused with `MPE-GEO-01`, no distance floor; identical to the undeclared run |
| Both members beyond the retained past | both absent; identical to the undeclared run |
| A member exactly at the edge of the retained past | step declined on the lower sign, `VFS-H3-01`, nothing published |
| Generated histories declared without their evidence | initial population refused |
| Generated histories with their evidence | grouped, with the declared radii in the separation and the velocity allowance |
| Unknown path, one path twice, overlapping pairs | initial population refused, each with its reason |
| Policy without pairs, pairs without policy, another policy token | request refused |
| Grouped run cancelled after two steps and resumed with the same declaration | identical to the uninterrupted run in content chains, end states, ledger and continuation |
| Resumed with the declaration removed, the members swapped, or a declaration added | continuation refused |

"Identical" means the same content chains, end states, ledger and published coefficients and radii.

## The measured cost of grouping

| Receiver position radius at $t=1/32$ | Four steps of $1/128$ | Eight steps of $1/256$ |
| --- | --- | --- |
| Ungrouped | $2.336\times10^{-19}$ | $1.142\times10^{-19}$ |
| Grouped | $9.794\times10^{-10}$ | $9.804\times10^{-10}$ |
| Ratio | $4.2\times10^{9}$ | $8.6\times10^{9}$ |

Grouping widens the receiver's tube by about nine orders of magnitude here, and a smaller step does not narrow it. Under the default increment budget of $10^{-8}$ the grouped run is refused on the budget at every step and publishes nothing; the comparisons above use a budget of $10^{-6}$ for both routes. The design predicted the direction; this is its size on one population. No timing was taken.

A first version of the between-node case used a bump four times higher. The bound's per-segment control boxes doubled the speed bound to $0.96$, $B$ came out near $9.9$, and the step was refused on H1. That output and the first run's other case-design errors are retained under `.local-data/eom-matched-pair/2026-10-12/increment-2/first-run-case-design/`.

## What this establishes and what it does not

**Claim grade: measured** for everything in the results, on the scratch build; **derived** for the bound itself, by the reduction in design addendum 3.

Established on these cases: the grouped interval contains the true pair contribution over the whole step and the whole receiver box where truth is available in closed form; grouping never applies where its conditions fail, and then the result is the individual route's exactly; a request with no declaration is unchanged; and the declaration is part of the resumed controller identity.

Not established: live qualification, which has not been attempted; any benefit of grouping, of which there is none on this evidence; behaviour on populations larger than three paths or with more than one pair; the between-node truth as a continuous statement; and cost. The full slab makes the bound's work grow with retained history, and the bound is loose where a member's past has a fast or sharply accelerating episode. Evidence and continuation remain sealed in one process, and nothing is bound into the ordinary request or the checkpoint identity.

**Falsifiers.** A receiver event of a certified grouped step at which the true pair contribution is outside $[-B,B]$; a declared pair grouped for a receiver that is one of its members, or with charges that are not exact opposites, or with unequal dispositions; a fallback run that differs from its undeclared run; an accounting row in which the classes do not sum to $N(N-1)$; any difference in an output of a request that declares no pair; or a resumed grouped run that differs from its uninterrupted run.
