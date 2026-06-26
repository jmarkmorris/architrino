# EQ-16 Weak-Visible Branch Ledger Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parent: [EQ-12 Through EQ-16A Photon, Quantum, Gauge, And Neutrino Packet](eq-12-16a-photon-quantum-gauge-neutrino-packet.md)
- Source runner: [weak-gauge-exposure-domain.mjs](../../../scripts/equation-mapping/weak-gauge-exposure-domain.mjs)
- Source fixture: [weak-gauge-exposure-domain-attempt.v1.json](../../../scripts/equation-mapping/weak-gauge-exposure-domain-attempt.v1.json)
- Row served: `EQ-16`
- Claim level: candidate source-field map and attack card
- Promotion status: priority-only

## Boundary

This map does not populate accepted retained evidence. It narrows `EQ-16` to one source-backed `weak_visible_branch_ledger` on a fixed weak-visible domain. It is not the `ordered_frame_loop` route for `EQ-15`/`EQ-27`, and it is not the `neutral_lepton_retained_branch` route for `EQ-16A`.

No score changes.

## Equation Attack Card

| Coordinate | Current answer |
| --- | --- |
| Row | `EQ-16` |
| Current score and closure driver | Score `2`; recover gauge and Standard Model-facing equations as sector-visible projections with reaction provenance. |
| Primary AAA carrier | `weak_visible_branch_ledger` on one fixed weak-visible retained domain. |
| Smallest score-moving evidence object | One accepted weak-visible branch ledger with projection, quotient, exposure, `V-A`, CKM/PMNS readouts, provenance, covariance, reaction-event, Noether sea rows, and no-retune on the same domain. |
| Exact first blocker | `missing_accepted_weak_visible_branch_ledger`. |
| Candidate breakthrough angle | Use `EQ-16A` PMNS/common-clock as a consumer clue only; PMNS must read from the same weak-exposure domain, but the neutral-lepton branch cannot substitute for the weak-visible ledger. |
| Fail-closed negative control | Durable-source numeric rows with `pmns_overlap_readout.domainId` on a different domain must fail before score review at hidden domain split. |

## Accepted-Object Contract

Use the current fixed pair as the contract key unless a later source map globally renames it:

```text
domainId: D_weak_visible_attempt_0001
branchRecordId: A_weak_attempt_0001
```

Accepted rows, all durable source-backed:

- `weak_visible_branch_ledger`;
- `weak_projection`;
- `weak_quotient`;
- `weak_exposure_record`;
- `va_chirality_gate`;
- `ckm_overlap_readout`;
- `pmns_overlap_readout`;
- `weak_corridor_provenance`;
- `effective_gauge_covariance_witness`;
- `reaction_event_ledger`, with event/domain binding to the same domain;
- `noether_sea_response`.

Gauge and residual requirements:

| Field | Required content |
| --- | --- |
| `gaugeChartId` | Fixed effective weak chart. |
| `physicalBranchRecordChanged` | `false`. |
| `covarianceResidual` | At or below tolerance. |
| `vaResidual` | At or below tolerance. |
| `ckmResidual` | At or below tolerance. |
| `pmnsResidual` | At or below tolerance. |
| `provenanceResidual` | At or below tolerance. |
| `retuneResidual` | At or below tolerance. |

## Fail-Closed Control

Use `weak.hidden_domain_split`: an accepted-looking fixture with durable sources and zero numeric residuals changes `pmns_overlap_readout.domainId` or another readout domain. Numeric `V-A`, CKM, PMNS, provenance, and no-retune passes cannot override shared-domain identity.

## Next Action

Create one durable source-backed `weak_visible_branch_ledger` row for `D_weak_visible_attempt_0001` / `A_weak_attempt_0001`, then run:

```sh
node scripts/equation-mapping/weak-gauge-exposure-domain.mjs --input scripts/equation-mapping/weak-gauge-exposure-domain-attempt.v1.json --summary --pretty
```

Until that row exists, the correct result remains `missing_accepted_weak_visible_branch_ledger`.

