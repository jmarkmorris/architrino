# A1.3/C5 Resolution And Coverage-Calibration Protocol

Status: **predeclared priority-only protocol; do not execute until the active
compact family sweep has ended and its outputs are immutable**.

Promotion disposition: **priority-only**. This packet defines a later
prescribed-path numerical campaign. It does not alter the active sweep, the
checked-in evaluator, the compact runner, the registry, the current protocol,
the analytical database, or any existing campaign output.

## Closure target

Adjudicate the known A1.3 and C5 numerical-resolution failures and measure how
often the compact coverage resolution disagrees with the full resolution,
without changing a tolerance, row-selection rule, denominator, or stop rule
after results are visible.

The protocol is bound to the active sweep identities:

| Identity | Frozen value |
| --- | --- |
| Compact implementation hash | `d6d9b8e99ebde7321df69522ae014a8366919c644c34424a03478e42b4e021f9` |
| Full source-protocol hash | `28de1f3583d6e8af5a95ded454643f56ce4dbc4d4fa0fa0a0b99a7ea9fcb93b8` |
| Generated compact coverage-protocol hash | `6fd0490db0cce13732a4483082a836480a6e91f18679c69f37faca2491f3e2db` |
| Wake speed | $c_f=1$ |
| Root policy | `all-retained-roots/event-specific-isolation-certified.v2` |
| Sampler | `constraint-preserving-full-taxonomy/sha256-counter-v1` |

The protocol sources are the [braid-program method](method.md), the
[compact-runner benchmark](evidence/2026-07-23-compact-monte-carlo-runner-benchmark.md),
the [gate-adjudication packet](analytical-gate-adjudication.md), the
[performance and retention methodology](analytical-campaign-performance.md),
the [prescribed-path analysis contract](../../../src/prescribed-path-analysis/README.md),
the
[current complete-cycle protocol](../../../src/prescribed-path-analysis/protocols/all-candidate-complete-cycle-protocol.v1.json),
and the
[coordinator-owned sweep analyzer](../../../scripts/eom/analyze-compact-family-sweep.mjs).
The existing machine-readable targeted ladder at
`.local-data/braid-analysis/gate-adjudication/targeted-resolution-ladders.v1.json`
is runtime evidence rather than repository source.

## Predeclaration lock

Execution begins only after all expected source campaigns are complete,
immutable, and hash-verified. From that point:

1. No tolerance, ladder level, sample, cohort, denominator, classification,
   promotion trigger, or stop rule in this packet may change.
2. A necessary change creates a new versioned packet and new output identity.
   The V1 output remains governed by this packet and is not relabeled.
3. Every source draw remains in the inventory. A failed evaluation retains its
   exact sampled specification, source hash, case identity, null score, failure
   stage, reason code, and structured details.
4. A row is never rerolled, replaced, or omitted because it is expensive,
   unfavorable, or not evaluated.
5. The original compact and full-resolution verdicts remain bound to their
   original protocol hashes. A stricter targeted protocol produces a new
   verdict; it does not retroactively convert an original null or rejection
   into a pass.

Any preflight identity mismatch stops the whole packet before numerical work.
Any row-local numerical failure stops that row at the declared failure state
but does not erase it or stop unrelated rows.

## Receipt-bound source cohort

The sweep input directory is
`.local-data/braid-analysis/compact-monte-carlo/family-sweep-v1/`. The
coordinator owns one pilot and a throughput-adapted sequence of sharded waves.
Each shard is a distinct compact campaign with its own campaign hash. This
packet does not create, request, or infer a canonical merged campaign.

After the coordinator sweep task reaches a terminal state, run the checked-in
sweep analyzer once over that settled directory and retain its complete JSON
output as the final analyzer receipt, $R_{\mathrm{sweep}}$. Calibration may
begin only after the receipt file itself is immutable and its SHA-256 is
recorded.

Let:

- $\mathcal S=R_{\mathrm{sweep}}.\texttt{campaignAndFileManifest.shards}$ be
  the receipt's ordered manifest of verified, distinct shard campaigns;
- $N_{\mathrm{sweep}}=R_{\mathrm{sweep}}.\texttt{drawCounts.actual}$ be the
  total verified census size;
- $N_{\mathrm{A1.3}}$ be the `actualDrawCount` for A1.3 in
  `perMemberCounts`; and
- $N_{\mathrm{C5}}$ be the `actualDrawCount` for C5 in `perMemberCounts`.

The receipt fixes these values before calibration begins. No early wave-count,
throughput projection, or draft quota may substitute for them.

The receipt is admissible only if:

- `coordinatorReceipt.status` is `complete-for-discovered-valid-shards`;
- `skippedFiles` is empty;
- `drawCounts.expected`, `drawCounts.actual`,
  `coordinatorReceipt.expectedDrawCount`, and
  `coordinatorReceipt.actualDrawCount` all equal $N_{\mathrm{sweep}}$;
- `coordinatorReceipt.completedShardCount` equals
  `campaignAndFileManifest.distinctCampaignHashCount` and
  $|\mathcal S|$;
- every manifest row has `campaignHashVerified: true` and a recorded file
  SHA-256, campaign hash, protocol hash, and implementation hash;
- `coordinatorReceipt.distinctShardCampaignsPreserved` is true and
  `canonicalMergedCampaignCreated` is false;
- the frozen identity set contains only the declared sampler, coverage-protocol
  hash, implementation hash, and $c_f=1$ identity; and
- the frozen identity set contains all 21 registry members, with
  $N_{\mathrm{A1.3}}>0$ and $N_{\mathrm{C5}}>0$; and
- the coordinator's terminal handoff identifies this exact analyzer receipt as
  the complete final shard inventory.

A newly discovered, skipped, changing, partial, hash-invalid, or
coordinator-unsealed shard invalidates the receipt and stops calibration until
a new terminal receipt is generated. Older receipts remain provenance records
and are not overwritten or silently extended.

The calibration census is every retained case row in every shard named by
$\mathcal S$, including every null-score or `drawn-not-evaluated` row. Shard
campaign hashes remain attached to their rows throughout calibration,
classification, full-adjudication selection, and reporting.

The calibration reuses every exact sampled specification; it does not sample a
replacement. Exact duplicate source hashes, if any, remain separate draw
identities because multiplicity is part of the seeded Monte Carlo sample. The
report must additionally show unique-source counts so repeated coordinates
cannot be mistaken for broader coverage.

## Fixed A1.3/C5 ladder

The targeted cohort is every A1.3 and C5 row in the receipt-bound census,
whether its compact row was evaluated or `drawn-not-evaluated`. Its fixed
sizes are $N_{\mathrm{A1.3}}$ and $N_{\mathrm{C5}}$, as recorded by
$R_{\mathrm{sweep}}$. Selection is by member identity only and is independent
of outcome.

### Root-resolution sequence

The current failure occurs in the primary-versus-tighter event ledger. Each
targeted source is therefore evaluated at three fixed root tolerances while all
other source and gate declarations remain unchanged:

| Root tier | Root tolerance | Maximum iterations | Purpose |
| --- | ---: | ---: | --- |
| R0 | $10^{-12}$ | 128 | Current primary event ledger |
| R1 | $10^{-14}$ | 192 | Current refined event ledger |
| R2 | $10^{-15}$ | 256 | Predeclared tighter comparison ledger |

The R0/R1 comparison exactly preserves the current $10^{-9}$ absolute event
convergence gate. R1/R2 is a separate strict-resolution comparison with the
same $10^{-9}$ gate. No average may replace the worst event or worst reported
component.

A source is `root-resolution-settled` only if:

- every R0, R1, and R2 event ledger is complete;
- transmitter and root-ordinal identities match across all three tiers;
- every retained root satisfies the existing $10^{-8}$ transversality floor;
- the R1/R2 maximum reported change is at most $10^{-9}$; and
- if the R0/R1 change exceeds $10^{-9}$, the R1/R2 change is no more than half
  the R0/R1 change.

Otherwise the source is `root-resolution-unresolved`. A topology mismatch,
unresolved candidate interval, nonfinite value, exhausted iteration budget, or
failure of the final settling rule cannot be repaired by raising an iteration
limit, changing a tolerance, or discarding the event after execution starts.

### Surface-resolution sequence

Every root-resolution-settled source proceeds through all three surface
comparisons. Passing an early level does not stop the ladder.

| Surface level | Primary grid | Refined grid | Four retained radii |
| --- | --- | --- | --- |
| S0 | $12\times8\times16$ | $24\times12\times24$ | $1,1.25,1.5,2$ |
| S1 | $24\times12\times24$ | $48\times16\times32$ | $1,1.25,1.5,2$ |
| S2 | $48\times16\times32$ | $96\times20\times40$ | $1,1.25,1.5,2$ |

Each grid entry is time samples, Gauss-Legendre polar order, and azimuth count.
The surface ladder uses R1 as its primary root tolerance and R2 as its refined
root tolerance. It retains the complete event identities and worst entries at
every level.

The current full-protocol thresholds remain fixed:

| Gate | Acceptance threshold |
| --- | ---: |
| Event-ledger convergence | absolute change at most $10^{-9}$ |
| Exposure | relative change at most $0.01$ |
| Anisotropy | absolute change at most $0.01$ |
| Retained spectral power | relative change at most $0.02$ |
| Radial exponent | absolute change at most $0.05$ |
| Aggregate causal-wake flux | relative-or-absolute change at most $0.01$ |
| Frequency-resolved causal-wake flux | relative-or-absolute change at most $0.05$ |
| Frequency-resolved out-of-band RMS fraction | at most $0.02$ |
| Raw emission-reference residual | relative change at most $0.01$ |
| Signed emission-reference residual | relative-or-absolute change at most $0.01$ |

The existing coefficient comparison floor, exposure floor, flux floor,
cancellation floor, minimum-separation floor, basis degree, harmonic band,
source speed policy, and all identity checks remain those of the hash-bound
full protocol. They are not retuned here.

A source is `surface-resolution-settled` only when S1 and S2 both pass every
applicable surface subgate with matching identities. S0 remains reported even
when it fails. The final targeted disposition is:

- `resolution-settled`: both root and surface settlement pass;
- `root-resolution-unresolved`: the root sequence does not settle;
- `surface-resolution-unresolved`: roots settle but S1 or S2 does not;
- `invalidated`: a source, protocol, identity, or finite-value obligation
  fails.

These are numerical dispositions only. None is a catalog-acceptance state.

## Compact-versus-full calibration

### Paired design

All $N_{\mathrm{sweep}}$ exact draws are paired by shard campaign hash, case
identity, and sampled-specification hash:

- the compact side is the already retained result under coverage-protocol hash
  `6fd0490db0cce13732a4483082a836480a6e91f18679c69f37faca2491f3e2db`;
- the full side evaluates the identical exact source under full source-protocol
  hash `28de1f3583d6e8af5a95ded454643f56ce4dbc4d4fa0fa0a0b99a7ea9fcb93b8`;
- both sides remain diagnostic compact packets without source sensitivity,
  raw acceptance-bearing event packets, database publication, or independent
  acceptance.

The paired result retains the receipt's file SHA-256, shard campaign hash, and
case hash for each row. It may summarize across shards, but it must not assign
the collection a synthetic campaign hash or describe it as one merged
campaign.

The full-resolution run must use the frozen implementation. If that exact
implementation cannot be reproduced after the sweep, execution stops; a newer
implementation requires a new two-sided calibration and new packet version.

### Case classifications

Every paired draw receives exactly one case classification:

| Compact side | Full side | Classification |
| --- | --- | --- |
| pass | pass | `both-pass` |
| reject | reject | `both-reject` |
| reject | pass | `coverage-false-negative` |
| pass | reject | `coverage-false-positive` |
| not evaluated | evaluated | `inconclusive-compact-not-evaluated` |
| evaluated | not evaluated | `inconclusive-full-not-evaluated` |
| not evaluated | not evaluated | `inconclusive-neither-evaluated` |

`Pass` means every evaluated compact gate passed at that resolution; it does
not mean independent acceptance. Each jointly evaluated row also retains a
comparison for every named gate. A case-level agreement does not erase a
gate-level disagreement such as one gate exchanging pass/fail while both cases
remain rejected overall.

### Boundary stress stratum

The calibration is a census of the active cohort, so no row is selected out of
the full evaluation. A separately labeled stress summary is nevertheless
required.

For each member, define the normalized distance of an evaluated compact row
from a numerical gate as

$$
m_g=\frac{|v_g-\tau_g|}{\max(|\tau_g|,10^{-30})},
$$

where $v_g$ is the recorded maximum change and $\tau_g$ is that gate's frozen
threshold. The row margin is the minimum finite $m_g$. Identity-only failures
receive margin zero. The stress stratum contains, per member, the two passing
and two rejecting evaluated rows with the smallest margins, using ascending
case hash as the tie-break. Missing categories are reported as missing and are
not backfilled.

This stratum tests the decision boundary deliberately. Its disagreement rate
is descriptive stress evidence and must not be presented as an estimate over
the full sampler measure.

## Sample size and uncertainty

The previous audit had 19 conclusive both-reject comparisons, two inconclusive
rows, and no full-resolution pass. Its zero observed false negatives therefore
did not identify the false-negative rate conditional on a full pass. The
rule-of-three approximation gives an upper bound near $3/19=15.8\%$ for an
unconditional zero-event rate; the exact one-sided 95-percent bound is about
$14.6\%$.

The primary estimand is

$$
p_{\mathrm{FN}}
=
P(\text{compact rejects}\mid\text{full resolution passes}).
$$

Its denominator is the number of full-resolution passes that were evaluated
on both sides, not all conclusive rows. The report must give:

- exact counts for all seven case classifications;
- drawn, evaluated, and not-evaluated counts at each resolution;
- the observed false-negative rate and one-sided 95-percent exact
  Clopper-Pearson upper bound among full-resolution passes;
- the observed false-positive rate and corresponding upper bound among compact
  passes;
- two-sided 95-percent exact intervals for not-evaluated rates;
- pooled and per-member gate-disagreement counts;
- member-level results and an equal-member macro average for draw-state rates,
  so the four 19-draw B members do not silently outweigh the 15-draw members;
- false-negative and false-positive member rates only where the relevant
  conditional denominator is nonzero, with zero-denominator members listed as
  unidentified rather than imputed or silently omitted; and
- the same inventory for the boundary stress stratum, clearly labeled
  non-population evidence.

With zero false negatives, the exact one-sided upper bound is
$1-0.05^{1/n}$. At least 59 jointly evaluated full-resolution passes are
therefore required before zero false negatives can put this bound below
five percent. The calibration is statistically insufficient unless:

- there are at least 59 full-resolution passes evaluated on both sides;
- those passes occur in all three families and at least 11 of the 21 members;
- the one-sided 95-percent upper bound for $p_{\mathrm{FN}}$ is at most $0.05$;
- the one-sided 95-percent upper bound for the false-positive rate is at most
  $0.10$;
- the not-evaluated point rate is at most $0.05$ at each resolution; and
- no single gate disagreement occurs in more than ten percent of its jointly
  evaluated rows or in three or more families without full adjudication.

Failure of a sample-size or distribution condition is reported as
`calibration-insufficient`, not as a pass or a negative estimate. No additional
draws are launched under V1 merely to cross a favorable stopping threshold.

## Promotion to retained full adjudication

Compact calibration never performs independent acceptance. It creates a
mandatory full-adjudication queue containing:

1. every `both-pass` or `coverage-false-negative` row;
2. every case-level or gate-level cross-resolution disagreement;
3. every A1.3/C5 `resolution-settled` row and every topology or replay anomaly;
4. every boundary-stress row;
5. every interrupted or replay-mismatched row; and
6. a deterministic audit sample of concordant both-reject rows: rows whose
   SHA-256 case hash interpreted as an unsigned integer is below five percent
   of the 256-bit range.

Each queued row receives its own hash-bound, separately retained
full-adjudication packet with the complete raw surface, fixed-probe,
moving-receiver, branch-diagnostic, and required sensitivity ledgers. The
separately authored independent-acceptance instrument must then verify the
retained record. Replay by the producer establishes determinism only and cannot
substitute for independent acceptance.

An A1.3/C5 result generated with the stricter R1/R2 root pair has a new protocol
hash. Before that stricter protocol can be used as a general compact screen, it
requires a fresh paired calibration under the same protocol on both sides. The
V1 current-protocol calibration cannot be combined with it.

## Stop rules

Stop the entire packet before evaluation if:

- the final analyzer receipt is missing, nonterminal, inadmissible under the
  receipt-bound source-cohort rules, or fails its file, analysis, or manifest
  hash check;
- any source campaign, case inventory, implementation, protocol, registry, or
  sampler identity differs from the frozen declarations;
- $c_f\ne1$;
- a source campaign is partial, mutable, hash-invalid, or missing a draw;
- the output directory already contains a different packet identity; or
- the executor would need to edit the active runner, evaluator, registry,
  protocol, database, or source campaign.

Stop one targeted row and retain its failure if:

- root enumeration is incomplete, root identities disagree, a value is
  nonfinite, or an iteration/candidate-interval budget is exhausted;
- a source or protocol preimage no longer reproduces its hash; or
- any ladder level cannot produce its required raw diagnostic ledger.

Complete the fixed ladder even after an early numerical pass. Do not loosen a
gate, raise a floor, enlarge an iteration budget, drop a radius, remove an
event, change the retained band, or add draws in response to the observed
outcome.

## Exact falsifiers

This packet is falsified as an executable V1 protocol if:

- the frozen implementation cannot reproduce an active compact case and score
  hash from its exact rerun instruction;
- the analyzer receipt's SHA-256, `analysisHash`, or `manifestHash` does not
  reproduce, or any synthetic merged campaign identity appears;
- paired rows differ in sampled-specification or exact-source hash;
- any receipt-named draw or distinct shard campaign disappears from the census;
- R0/R1 does not reproduce the original A1.3/C5 disposition under the original
  protocol;
- a purported settled targeted row violates any root identity, event
  convergence, S1, or S2 requirement above;
- the reported classification counts do not sum to the complete draw count;
- uncertainty uses conclusive rows rather than full-resolution passes for the
  false-negative denominator;
- a not-evaluated row is counted as a pass, rejection, false positive, or false
  negative;
- the calibration exceeds a predeclared statistical bound or lacks the
  required full-pass breadth;
- a queued full-adjudication record fails raw-ledger reconstruction or
  independent acceptance; or
- any result is used to claim stability, energy, retention, binding,
  quantization, particle identity, catalog acceptance, or physical realization.

## Evidence boundary

Claim grade is **measured** for future hash-bound numerical rows, costs, and
classification counts; **derived** for the fixed classification and confidence
formulas; and **inferred** only where a later report explicitly names an
interpretation and its falsifier.

The source paths remain prescribed. This protocol evaluates acceleration
responses and numerical convergence only. It does not evolve a path, invoke
the EOM solver, independently validate the acceleration law, or establish
stability, energy, retention, binding, quantization, particle identity, catalog
acceptance, or physical realization.

## Future execution interface

No command in this section is authorized while the active sweep is running.
After the coordinator declares the sweep terminal, create the final immutable
analyzer receipt without launching evaluations, importing SQLite, or changing
any shard:

```bash
node scripts/eom/analyze-compact-family-sweep.mjs \
  --input .local-data/braid-analysis/compact-monte-carlo/family-sweep-v1 \
  > .local-data/braid-analysis/compact-monte-carlo/family-sweep-v1/final-sweep-analyzer-receipt.v1.json
```

The follow-up implementation must then add one solver-free calibration harness
that implements this packet literally and does not modify the evaluator,
compact runner, registry, current protocols, database, shard campaigns, or
analyzer receipt. Its required interface is:

```bash
node --test tests/a1-3-c5-resolution-coverage-calibration.test.js

node scripts/eom/run-a1-3-c5-resolution-coverage-calibration.mjs \
  --packet reference/priorities/braid-program/a1-3-c5-resolution-and-coverage-calibration-protocol.md \
  --sweep-input .local-data/braid-analysis/compact-monte-carlo/family-sweep-v1 \
  --sweep-receipt .local-data/braid-analysis/compact-monte-carlo/family-sweep-v1/final-sweep-analyzer-receipt.v1.json \
  --output .local-data/braid-analysis/resolution-calibration/a1-3-c5-and-full-taxonomy-v1.json
```

After the harness finishes, verification is read-only and must not publish or
import the result:

```bash
node scripts/eom/run-a1-3-c5-resolution-coverage-calibration.mjs \
  --verify .local-data/braid-analysis/resolution-calibration/a1-3-c5-and-full-taxonomy-v1.json \
  --packet reference/priorities/braid-program/a1-3-c5-resolution-and-coverage-calibration-protocol.md \
  --sweep-receipt .local-data/braid-analysis/compact-monte-carlo/family-sweep-v1/final-sweep-analyzer-receipt.v1.json
```

The analyzer exists and is read-only. The calibration harness and its
independent test are future work. These commands are a predeclared interface,
not evidence that the calibration files already exist or that the calibration
has run.
