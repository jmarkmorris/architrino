# Deterministic Recursive Block-Exclusion First Path

## Status

- Packet id: `eom_recursive_block_exclusion_first_path/v0`
- Date opened: 2026-07-16
- Claim level: `priority-design`
- Implementation status: `complete-for-declared-first-path-round`
- Production authority: none
- Governing contracts:
  [evolution-contract-v0-amendment-1-million-path-scale.md](evolution-contract-v0-amendment-1-million-path-scale.md)
  and
  [million-path-certified-execution-architecture.md](million-path-certified-execution-architecture.md)

## Closure Target

Implement and measure the first deterministic recursive large-population
block-exclusion path over accepted retained histories. The path must prove
complete ordered-pair accounting and measure the exact pair searches avoided
on a staged population ladder. This round ends at CPU recursive exclusion,
complete exact surviving-pair fallback, independent correctness controls, and
matched performance evidence. It does not include GPU, distributed execution,
active-contribution aggregation, or million-path production integration.

## Required Traversal Contract

The causal index is bounded by a declared node, exact-pair, wall-time, and
memory envelope. Each visited receiver-membership, source-membership, and
emission-interval block returns exactly one route:

1. `excluded`: an outward-rounded residual enclosure proves the complete block
   root free;
2. `subdivide`: the enclosure is inconclusive and deterministic child blocks
   remain;
3. `exact_tile`: the declared leaf policy has been reached, so every covered
   ordered pair is promoted to complete retained-interval exact certification;
4. `unresolved`: certification or the resource envelope fails, rejecting the
   candidate window.

Splits are deterministic and may divide receiver membership, source
membership, or emission interval. Traversal preserves causal ordering and the
canonical coincident-endpoint convention. Authoritative bounds use only
accepted retained histories; predictor or rejected candidate histories cannot
enter the index.

## Complete Pair Accounting

Every ordered receiver-source relationship is present, including self-pairs.
The disjoint relationship ledger obeys

$$
P_{\mathrm{logical}}
=
P_{\mathrm{excluded}}
+P_{\mathrm{exact}}
+P_{\mathrm{enclosed}}
+P_{\mathrm{unresolved}}.
$$

This first path has no active-contribution enclosure, so
$P_{\mathrm{enclosed}}=0$. Acceptance requires
$P_{\mathrm{unresolved}}=0$. Time-cell decisions collapse to one complete
relationship outcome: if any time cell for a pair survives exclusion, that
pair's complete retained interval enters exact certification and the pair is
counted only in $P_{\mathrm{exact}}$.

Membership records must be deterministic, complete, and nonoverlapping. An
inconclusive block subdivides or falls back to exact evaluation; it is never
classified as inactive.

## Exclusion Implication To Prove

For receiver membership $R$, source membership $B$, emission interval $I$,
positive field speed $c_f$, separation enclosure
$\mathcal D_{RB}(I)=[d^-_{RB},d^+_{RB}]$, and causal-delay enclosure
$\Delta_{RB}(I)=[\Delta^-_{RB},\Delta^+_{RB}]$, the outward residual
enclosure is

$$
\mathcal G_{RB}(I)
=
\left[
d^-_{RB}-c_f\Delta^+_{RB},
d^+_{RB}-c_f\Delta^-_{RB}
\right].
$$

The implementation evidence must state the inclusion proof: every covered
pair-time residual lies in $\mathcal G_{RB}(I)$; therefore, if
$0\notin\mathcal G_{RB}(I)$, no covered pair-time point satisfies the causal
root equation. The proof must identify the outward-rounding implementation and
the accepted-history inputs that support the bounds.

## Prohibited Approximations

This path cannot use distance cutoffs, sampled-residual decisions, neighbor
heuristics, average-density assumptions, active-force aggregation, multipoles,
or another approximation. It cannot silently drop a retained-history
contribution. A resource or certification failure produces `unresolved` and
rejects the candidate result.

## Independent Validation Matrix

Do not modify an independent oracle in the same change as the EOM solver
implementation. Compare the block results against the existing independently
authored decimal-interval and exact-pair oracles and against analytically known
constant-history cases.

Required adversarial controls are:

- a root-free block;
- an active-root block;
- interval overlap near zero;
- coincident geometry;
- self-pairs;
- a dense noncompressible population.

The controls must show that no independently detected active root lies inside
an `excluded` block. Repeated runs and every permitted thread count must emit
byte-identical membership and accounting.

## Performance Ladder

Rebuild before measurement and record source, static-library, and executable
timestamps. Run staged populations such as $N=128$, $512$, $2{,}048$, and
$10{,}000$, stopping safely when the declared wall-time or memory ceiling is
reached. Use both sparse/root-free and dense/inconclusive populations.

Where exhaustive exact-pair evaluation is feasible, compare it with recursive
block traversal under matched histories, reception time, emission interval,
numeric policy, thread count, and host load. Report:

- wall seconds;
- logical pairs;
- visited blocks;
- excluded pairs;
- exact fallback pairs;
- exclusion ratio;
- exact-search reduction;
- peak memory;
- seconds per logical pair.

Cost conclusions come only from matched wall timing, not from block or cell
counts. Long runs emit a heartbeat and remain observed until completion or a
declared stop.

## Stop Conditions

Stop and report without weakening the certificate if:

- an independently detected root lies in an `excluded` block;
- membership accounting is incomplete or overlapping;
- the dense workload does not fit the declared resource envelope; or
- recursive traversal does not outperform exhaustive evaluation on the
  intended sparse case.

## Deliverables And Falsifiers

The round delivers a scoped EOM solver implementation and tests, a focused
record under `evidence/`, a concise dated entry in
[work-log.md](work-log.md), measured compression and performance results, and
claim grades on every conclusion.

Correctness is overturned by any independently detected root inside an
`excluded` membership, any duplicate or missing ordered pair, any accepted
result with nonzero unresolved membership, any nonaccepted history used to
build an authoritative bound, or any permitted schedule that changes the
membership ledger. Performance is overturned when a matched sparse control
does not reduce wall time relative to exhaustive exact-pair certification, or
when the reported advantage disappears under the declared repeat protocol.
