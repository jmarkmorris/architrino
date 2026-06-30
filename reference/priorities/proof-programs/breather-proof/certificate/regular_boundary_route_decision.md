# Regular-Boundary Route Decision

## Scope

This packet continues the v10 regular-boundary topology/no-double-counting
handoff for `fresh-same-packet-fold-shear-seed-v0`.

It does not accept any row, does not update a live ledger, and does not
authorize `branch_chart.json`. It records the first proof-strategy decision
that cannot be resolved from the current certificate data.

## Source Evidence

The finite ownership target in
`regular_boundary_topology_ownership_certificate_target.md` requires, for each
residual core $C$, an ownership certificate
$$
T(C)
$$
with exact separator assignment, same-packet inclusion, branch-reuse exclusion,
endpoint disjointness, fold-layer nonexpansion/domination, and non-core
complement closure.

The current sidecars supply a finite target but not the consumable fields:

| Field class | Current state |
| --- | --- |
| residual core inventory | 10 imported v9/v10 cores |
| finite candidate families | 4 families, 20 candidate membership edges |
| exact separator assignments | 0 certified |
| same-packet inclusion proofs | 0 certified |
| topology/no-double-counting certificates | 0 certified |
| branch-reuse exclusions | 0 certified |
| fold-layer nonexpansion certificates | 0 certified |
| non-core complement closures | 0 certified |

The decisive additional obstruction is the domination audit from
proof-interval-v8. For each
$$
\sigma\in\{\Sigma_1,\Sigma_2,\Sigma_3,\Sigma_4\},
$$
the audit records an accepted fold ceiling only for the historical packet
`seed-doubled-four-arc-cosine-template-v0`, not for the fresh packet:

| Separator | Historical fold ceiling present | Same packet as fresh sidecar | Regular-boundary bound present | Enlarged fresh ceiling present |
| --- | --- | --- | --- | --- |
| `Sigma_1` | yes | no | no | no |
| `Sigma_2` | yes | no | no | no |
| `Sigma_3` | yes | no | no | no |
| `Sigma_4` | yes | no | no | no |

Thus topology ownership alone cannot consume a parent complement. Even a perfect
separator selector would still fail because no same-packet inequality proves
$$
\sum_{B\in\mathcal{F}_{\sigma}}
I^{\mathrm{fold}}_{\eta,\epsilon_c,B}
+
\sum_{C\in\mathcal{C}^{\mathrm{reg}}_{\sigma}}
I^{\mathrm{reg\text{-}bdry}}_{\eta,\epsilon_c,C}
\le
I^{\mathrm{fold}}_{\eta,\epsilon_c,\sigma},
$$
and no enlarged fresh ceiling has been accepted.

## Decision Point

The regular-boundary route now has two lawful continuations:

1. **Fresh domination packet.** Build a same-packet fold-layer and
   regular-boundary domination packet for `fresh-same-packet-fold-shear-seed-v0`.
   This route must supply fresh separator aggregates, bounds for the residual
   regular-boundary cores, non-core complement closure, and then revisit
   separator assignment and topology ownership.
2. **Candidate repair / strict-gap route.** Treat the 10 parent-complement
   collars as structural evidence that this sidecar should be repaired or
   replaced so those collars become strict range-empty, exact fold-layer, or
   endpoint-owned rows before any branch-chart work begins.

Route 1 is mathematically possible but broad: it creates a fresh same-packet
fold/domination proof packet and still leaves separator assignment,
topology/no-double-counting, and non-core closure to prove afterward. Route 2 is
lower risk for the current proof queue because the sidecar already lacks a fresh
fold ceiling and the live fold-shear construction was originally introduced to
open null-coordinate gaps.

## Selected Route

Op approved continuation toward closure after this decision point. The active
route is now **candidate repair / strict-gap closure**.

The regular-boundary $T(C)$ route remains a deferred alternative, not the next
work item. The next proof packet should treat the 10 v10 parent-complement
collars as strict-gap targets for a repaired or successor candidate identity.

## Blocker

The prior pass could not decide this inside its authority without choosing a proof
strategy. That decision has now been made:

- The immediate proof work is candidate repair or accepted same-packet
  fold-layer exact membership so the parent complements no longer require a
  broad regular-boundary theorem.
- Preserving the current fresh sidecar by building a fresh same-packet
  domination packet is deferred.

No AAA prose should be promoted from this decision. The current reader-facing
generic same-packet complement predicate remains sufficient.

## Capture Decision

Priority-only. This packet records the proof-strategy decision point and the
selected route. It should remain under `reference/priorities` as the audit trail
for why the next packet pivots away from regular-boundary domination and toward
strict-gap candidate repair.
