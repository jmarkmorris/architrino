# EQ-16 Weak-Visible Branch Ledger Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parent: [EQ-12 Through EQ-16A Photon, Quantum, Gauge, And Neutrino Packet](eq-12-16a-photon-quantum-gauge-neutrino-packet.md)
- Source runner: [weak-gauge-exposure-domain.mjs](../../../scripts/equation-mapping/weak-gauge-exposure-domain.mjs)
- Source fixtures:
  - [weak-gauge-exposure-domain-attempt.v1.json](../../../scripts/equation-mapping/weak-gauge-exposure-domain-attempt.v1.json)
  - [weak-gauge-exposure-domain-source-attempt.v1.json](../../../scripts/equation-mapping/weak-gauge-exposure-domain-source-attempt.v1.json)
  - [weak-gauge-exposure-domain-ledger-source-contract-attempt.v1.json](../../../scripts/equation-mapping/weak-gauge-exposure-domain-ledger-source-contract-attempt.v1.json)
- Negative-control fixtures:
  - [weak-gauge-exposure-domain-split-negative-control.v1.json](../../../scripts/equation-mapping/weak-gauge-exposure-domain-split-negative-control.v1.json)
  - [weak-gauge-exposure-domain-priority-source-negative-control.v1.json](../../../scripts/equation-mapping/weak-gauge-exposure-domain-priority-source-negative-control.v1.json)
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
| Existing scripts/fixtures/packets | [weak-gauge-exposure-domain.mjs](../../../scripts/equation-mapping/weak-gauge-exposure-domain.mjs), [weak-gauge-exposure-domain-attempt.v1.json](../../../scripts/equation-mapping/weak-gauge-exposure-domain-attempt.v1.json), [weak-gauge-exposure-domain-source-attempt.v1.json](../../../scripts/equation-mapping/weak-gauge-exposure-domain-source-attempt.v1.json), [weak-gauge-exposure-domain-ledger-source-contract-attempt.v1.json](../../../scripts/equation-mapping/weak-gauge-exposure-domain-ledger-source-contract-attempt.v1.json), [weak-gauge-exposure-domain-split-negative-control.v1.json](../../../scripts/equation-mapping/weak-gauge-exposure-domain-split-negative-control.v1.json), and [weak-gauge-exposure-domain-priority-source-negative-control.v1.json](../../../scripts/equation-mapping/weak-gauge-exposure-domain-priority-source-negative-control.v1.json). |
| Candidate breakthrough angle | Use `EQ-16A` PMNS/common-clock as a consumer clue only; PMNS must read from the same weak-exposure domain, but the neutral-lepton branch cannot substitute for the weak-visible ledger. |
| Fail-closed negative control | Durable-source numeric rows with `pmns_overlap_readout.domainId` on a different domain must fail before score review at hidden domain split. |
| Smaller next action | Replace the ledger-only source-attempt and carrier-shell boundary with one durable non-priority `weak_visible_branch_ledger` row on `D_weak_visible_attempt_0001` / `A_weak_attempt_0001`, then require the checker to advance only to `missing_accepted_weak_projection` with no score movement. |

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

## Direct Geometry Layer

| Standard comparison term | AAA geometric readout | Required carrier or row | Same-record binding | Fail-closed negative control | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| Weak-visible sector identity | `weak_visible_branch_ledger` on one retained weak-visible domain, not a free Standard Model sector label | `weak_visible_branch_ledger` | Same `domainId`, `branchRecordId`, and gauge chart across every weak/gauge row | `accepted_without_evidence_source`; `weak.hidden_domain_split` after durable evidence exists | Durable non-priority `weak_visible_branch_ledger` source with explicit `EQ-16` support, fixed `domainId`, fixed `branchRecordId`, and event/source provenance. |
| Gauge projection and quotient terms | `weak_projection` and `weak_quotient` as projections from the retained domain and quotient construction | `weak_projection`, `weak_quotient`, `effective_gauge_covariance_witness` | Same gauge chart, branch record, domain, and covariance witness as the ledger row | `weak.hidden_domain_split` | Accepted projection/quotient rows whose covariance residual is computed on the same domain as the ledger. |
| Exposure-domain current and chirality terms | `weak_exposure_record` plus `va_chirality_gate` as readouts of the same exposure domain | `weak_exposure_record`, `va_chirality_gate` | Same exposure record, weak domain, reaction-event ledger, and no-retune witness as CKM/PMNS readouts | `weak.hidden_domain_split` | Accepted exposure and `V-A` rows showing chirality is a same-domain readout, not an imported chiral rule. |
| CKM and PMNS overlap readouts | `ckm_overlap_readout` and `pmns_overlap_readout` as sector-visible overlaps sharing the weak domain | `ckm_overlap_readout`, `pmns_overlap_readout` | Same `domainId`, branch record, gauge chart, reaction provenance, and Noether sea response; `EQ-16A` PMNS is a consumer clue only | `weak.hidden_domain_split` | Accepted overlap rows whose residuals pass while preserving the ledger domain; the neutral-lepton branch cannot substitute for this ledger. |
| Reaction provenance and corridor support | Weak corridor provenance as event-bound support for the sector-visible readouts | `weak_corridor_provenance`, `reaction_event_ledger`, `noether_sea_response` | Same event/domain binding, branch record, and Noether sea response as the projection and overlap rows | `accepted_without_evidence_source`; event/domain split variants of `weak.hidden_domain_split` | Accepted reaction-event ledger with corridor provenance and Noether sea response on the same weak-visible domain. |
| No-hidden-retune witness | Residual witness that the gauge chart, branch record, domain, and readout rows are not changed per comparison | All accepted rows plus `retuneResidual` | Same `domainId`, `branchRecordId`, gauge chart, event ledger, and source path class across every row | `weak.hidden_domain_split` and source-evidence guard | Populated same-domain packet with every required row accepted from durable evidence and residuals at tolerance. |

## Fail-Closed Control

Use `weak.hidden_domain_split`: an accepted-looking fixture with durable sources and zero numeric residuals changes `pmns_overlap_readout.domainId` or another readout domain. Numeric `V-A`, CKM, PMNS, provenance, and no-retune passes cannot override shared-domain identity. The current fixture is [weak-gauge-exposure-domain-split-negative-control.v1.json](../../../scripts/equation-mapping/weak-gauge-exposure-domain-split-negative-control.v1.json); it reports `nextBlocker: weak_hidden_domain_split` and exits nonzero under `--require-populated`.

Use `accepted_without_evidence_source`: an accepted-looking fixture with every row on one domain but with `sourcePath` pointed back to this priority map must not populate the row. The current fixture is [weak-gauge-exposure-domain-priority-source-negative-control.v1.json](../../../scripts/equation-mapping/weak-gauge-exposure-domain-priority-source-negative-control.v1.json); it reports `status: blocked_source_evidence`, `nextBlocker: accepted_without_evidence_source`, and exits nonzero under `--require-populated`.

## Ledger-Only Source-Attempt Probe

The ledger-only source-attempt probe is [weak-gauge-exposure-domain-source-attempt.v1.json](../../../scripts/equation-mapping/weak-gauge-exposure-domain-source-attempt.v1.json):

```sh
node scripts/equation-mapping/weak-gauge-exposure-domain.mjs --input scripts/equation-mapping/weak-gauge-exposure-domain-source-attempt.v1.json --summary --pretty
node scripts/equation-mapping/weak-gauge-exposure-domain.mjs --input scripts/equation-mapping/weak-gauge-exposure-domain-source-attempt.v1.json --summary --pretty --require-populated
```

The probe marks only `weak_visible_branch_ledger` as accepted-looking on `D_weak_visible_source_attempt_0001` / `A_weak_source_attempt_0001` while leaving projection, quotient, exposure, `V-A`, CKM, PMNS, provenance, covariance, reaction-event, and Noether sea rows at `attempt`. After the source-evidence guard, the expected result is `status: blocked_missing_rows`, `scoreDecision: no_score_increase`, and `nextBlocker: accepted_without_evidence_source`, because the accepted-looking ledger row still points to this priority map. The `--require-populated` form must exit nonzero.

This is a guard probe, not retained evidence. The next ladder step requires a durable, non-priority source-backed `weak_visible_branch_ledger`; only then should the checker advance to `missing_accepted_weak_projection`.

The carrier-shell source-contract boundary is staged at [weak-gauge-exposure-domain-ledger-source-contract.v1.json](../../../scripts/equation-mapping/weak-gauge-exposure-domain-ledger-source-contract.v1.json) and exercised by [weak-gauge-exposure-domain-ledger-source-contract-attempt.v1.json](../../../scripts/equation-mapping/weak-gauge-exposure-domain-ledger-source-contract-attempt.v1.json):

```sh
node scripts/equation-mapping/weak-gauge-exposure-domain.mjs --input scripts/equation-mapping/weak-gauge-exposure-domain-ledger-source-contract-attempt.v1.json --summary --pretty
```

The expected boundary run reports `status: blocked_missing_rows`, `nextBlocker: missing_accepted_weak_projection`, `sourceEvidencePass: true`, and `scoreDecision: no_score_increase`. This does not land retained evidence. It only proves that once the parent weak-visible ledger is source-backed, the checker advances to the first child row instead of using numeric `V-A`, CKM, PMNS, provenance, or covariance residuals as score evidence.

## Next Action

Create one durable source-backed `weak_visible_branch_ledger` row for `D_weak_visible_attempt_0001` / `A_weak_attempt_0001`, then run:

```sh
node scripts/equation-mapping/weak-gauge-exposure-domain.mjs --input scripts/equation-mapping/weak-gauge-exposure-domain-attempt.v1.json --summary --pretty
```

Until that row exists, the correct result remains `missing_accepted_weak_visible_branch_ledger`.
