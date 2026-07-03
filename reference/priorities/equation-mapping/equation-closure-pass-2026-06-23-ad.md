# Equation Closure Pass 2026-06-23 AD

## Workstream Metadata

- Kind: `priority-detail`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Detail source: [Equation Mapping Detail](equation.md)
- Prior pass: [Equation Closure Pass 2026-06-23 AC](equation-closure-pass-2026-06-23-ac.md)
- Assigned ID: `EQ-16`
- Status: `score-neutral executable weak/gauge exposure-domain pass`
- Scope: priority-only; no reader-facing corpus promotion and no score-table edits
- Claim bucket: derivation/closure target with observer-level gauge-sector readouts

## Closure Result

This pass adds a dedicated `EQ-16` checker for the weak/gauge exposure-domain object:

- [weak-gauge-exposure-domain.mjs](../../../scripts/equation-mapping/weak-gauge-exposure-domain.mjs)
- [weak-gauge-exposure-domain-attempt.v1.json](../../../scripts/equation-mapping/weak-gauge-exposure-domain-attempt.v1.json)

The checker does not derive Yang-Mills equations, QED, QCD, `V-A`, CKM, or PMNS. It tests the smaller prerequisite that those observer-level readouts must be projections of one weak-visible retained domain rather than separately tuned sector records.

The current attempt run reports:

```text
status: blocked_missing_rows
scoreDecision: no_score_increase
nextBlocker: missing_accepted_weak_visible_branch_ledger
domainPass: true
gaugeBranchRecordStable: true
covariancePass: true
vaPass: true
ckmPass: true
pmnsPass: true
provenancePass: true
retunePass: true
```

Those numeric and domain passes are not score evidence because every required weak/gauge row remains attempt-level.

## Mathematical Object

The executable residual is the score-neutral weak/gauge exposure-domain packet

$$
\Theta_{\mathrm{weak/gauge}}
=
\left(
\mathcal{L}_A,
\Pi_{\mathrm{weak}},
Q_{\mathrm{weak}},
\mathcal{E}_{\mathrm{weak}},
\mathcal{R}_{\mathrm{cov}},
\mathcal{R}_{\mathrm{weak}},
\mathcal{R}_{\mathrm{prov}}
\right),
$$

with residual vector

$$
\mathcal R_{16}^{\mathrm{wg}}
=
\left(
\mathcal S_{\mathrm{domain}},
\mathcal R_{\mathrm{cov}},
\mathcal R_{V-A},
\mathcal R_{\mathrm{CKM}},
\mathcal R_{\mathrm{PMNS}},
\mathcal R_{\mathrm{prov}},
\mathcal S_{\mathrm{retune}}
\right).
$$

Here $\mathcal S_{\mathrm{domain}}$ passes only when the branch ledger, weak projection, quotient, exposure record, `V-A` gate, CKM readout, PMNS readout, provenance row, and covariance witness share one concrete weak-visible domain. Gauge covariance also requires that an effective gauge-chart relabeling does not change the physical branch record.

## Required Rows

The attempt fixture defines the required retained rows:

- `weak_visible_branch_ledger`
- `weak_projection`
- `weak_quotient`
- `weak_exposure_record`
- `va_chirality_gate`
- `ckm_overlap_readout`
- `pmns_overlap_readout`
- `weak_corridor_provenance`
- `effective_gauge_covariance_witness`
- `reaction_event_ledger`
- `noether_sea_response`

The first blocker is `missing_accepted_weak_visible_branch_ledger`. After that row is accepted, the checker should expose any hidden domain split, gauge-branch record change, covariance residual, weak-sector residual, provenance residual, or hidden retune residual.

## Score Disposition

| Row | Prior score | Pass AD score | Reason |
| --- | --- | --- | --- |
| `EQ-16` | `2` | `2` | The weak/gauge exposure-domain residual is executable, but the required rows are attempt-level and block first at `missing_accepted_weak_visible_branch_ledger`. |

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: promotion waits for one accepted weak-visible retained domain whose branch ledger, weak projection, quotient, exposure, `V-A`, CKM, PMNS, provenance, covariance, reaction-event, and Noether sea rows are source-backed and bound to the same domain.

## Next Closure Step

Populate the `weak_visible_branch_ledger` row for one retained weak-visible domain. Once that row is accepted, the checker should report whether the weak projection, quotient, exposure, chirality, overlap, provenance, covariance, event-ledger, and Noether sea response rows remain bound to the same retained domain without hidden retuning.
