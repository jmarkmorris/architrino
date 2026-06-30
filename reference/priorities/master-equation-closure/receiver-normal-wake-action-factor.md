# Receiver-Normal Wake-Action Factor

Status. Mandatory model-change audit for master-equation closure, A1 outward
constants, action/wake-history closure, and solver support. This packet records
the receiver-normal factor required by the canonical Master EOM branch law.
Rows without the receiver-normal numerator are not force/action evidence.
Stationary, fixed-source, or fixed-receiver reductions must be recomputed from
this identity inside the selected retained row.

Claim level. Accepted correction to the Master EOM branch-strength law; exact
geometry identity for smooth retained roots; downstream proof paths must restart
their force/action rows from this law.

Current disposition. `priority-only` for wake-history closure. The identity
below is accepted as the branch-strength correction, but no wake-history,
action, power, breather, or mass-response packet promotes from it until that
packet supplies the same retained record with accepted branch identity,
$D_s$, $D_t$, $W^{\mathrm{rec}}$, and the derivative rows consumed by the
packet.

## Receiver-Normal Identity

For source $j$, receiver $i$, and causal constraint
$$
F_{ij}(t,s)=\|\mathbf{x}_i(t)-\mathbf{x}_j(s)\|-c_f(t-s)=0,
$$
define
$$
D_{s,ij}=c_f-\hat{\mathbf r}_{ij}(t,s)\cdot\mathbf v_j(s),
\qquad
D_{t,ij}=c_f-\hat{\mathbf r}_{ij}(t,s)\cdot\mathbf v_i(t).
$$
On a retained simple-root branch $s=s_\ell(t)$ with $D_{s,ij}\ne0$,
implicit differentiation gives
$$
\frac{ds_\ell}{dt}=\frac{D_{t,ij}}{D_{s,ij}}.
$$

Interpretation. $D_{s,ij}^{-1}$ is the source-normal causal-root denominator.
It remains the transversality floor that makes a simple root legal. $D_{t,ij}$
is the receiver-normal numerator: it says how fast the receiver path cuts
through the source-emitted causal wake sequence. If a receiver is stationary in
the Euclidean-void rest frame, then $D_{t,ij}=c_f$ follows by substitution in
this equation. That reduction is a receiver-normal sanity check, not a promotion
route for rows that omit $D_t$. In every nontrivial receiver-normal case,
$D_{t,ij}/D_{s,ij}$ is geometry-dependent and cannot be replaced by one
constant.

## Proof Impact

| Proof lane | Immediate impact |
| --- | --- |
| Event-local Master EOM force rows | Restart required for force magnitude. Source-normal root and inactive-gap rows survive as topology inputs, but strength rows that omit $D_t$ are not branch-action evidence. |
| Action / wake-history / power rows | Restart required. Each row must use $D_{t,ij}/D_{s,ij}$ on the same retained record. |
| A1 outward constants | Invalid as closure evidence until each selected retained row emits receiver-normal bounds $D_{t,\alpha}^{-},D_{t,\alpha}^{+}$ on the same boxes. |
| Noether wake-history closure | Needs same-record binding between active roots, source-normal Jacobian floors, receiver-normal factors, and boundary wake-history charges. |
| Solver packets | Central branch weight / delayed-hit strength consumes the unsigned receiver-normal factor, while the source-normal denominator remains a transversality field. |

## A1-Specific Target

For each retained A1 label $\alpha\in\{P_1,P_2,P_3,S_1\}$, the action-ready
same-box row should add
$$
D_{t,\alpha}(\theta,p)
=
c_f-\hat{\mathbf r}_{\alpha}(\theta,p)\cdot\mathbf v_i(\theta,p)
$$
and report outward bounds $D_{t,\alpha}^{-},D_{t,\alpha}^{+}$ on the same
$I_c\times W_\alpha$ boxes used for $D_{s,\alpha}$, inactive-cover gaps, and
branch-sum constants. A missing $D_t$ row invalidates the force/action/
wake-history row as closure evidence. It does not falsify root topology,
inactive gaps, or source-normal transversality rows.

## Solver Acceptance Target

A solver-side receiver-normal row is accepted only when it reports:

- source-to-receiver unit direction,
- source normal speed $\hat{\mathbf r}\cdot\mathbf v_j$,
- receiver normal speed $\hat{\mathbf r}\cdot\mathbf v_i$,
- source-normal denominator $D_s$,
- receiver-normal numerator $D_t$,
- receiver-normal factor $D_t/D_s$,
- fail-closed status for nonfinite values, small $D_s$, or small $D_t$ when the selected proof requires monotone receiver sampling.

This is consumed as the branch-strength row. A separate variational proof is
still required for action derivation, but not for using receiver-normal branch
strength in the Master EOM.

## Wake-History Pullback Theorem Target

Wake-history closure is not merely the presence of event rows on a retained
ledger. A wake-history action or power packet consumes the receiver-normal
sampling rate along a moving receiver path, so its first theorem target is a
same-record pullback statement.

For every retained branch row $\rho=(i,j,\ell,t,s_\ell)$ used by a
wake-history increment, the row must bind
$$
D_{s,\rho},
\qquad
D_{t,\rho},
\qquad
W_{\rho}^{\mathrm{rec}}=\left|D_{t,\rho}/D_{s,\rho}\right|,
\qquad
D_vD_{s,\rho},
\qquad
D_vD_{t,\rho},
\qquad
D_vW_{\rho}^{\mathrm{rec}}
$$
to the same source/receiver ids, retained box, regulator state, event ledger,
and source artifact hash. On a fixed $D_s,D_t$ sign stratum the reconstruction
condition is
$$
D_vW_{\rho}^{\mathrm{rec}}
=
\frac{\zeta_{t,\rho}\zeta_{s,\rho}}{D_{s,\rho}^2}
\left(
D_{s,\rho}D_vD_{t,\rho}
-
D_{t,\rho}D_vD_{s,\rho}
\right).
$$

The closure equation to prove is that the finite-window wake-history increment
is a pullback of source-provenanced emitted weight through the same
receiver-normal branch record:
$$
D_v\mathcal{H}_{\mathrm{wake}}^{W}
=
\sum_{\rho\in\mathfrak{R}_{W}^{\mathrm{ret}}}
q_{\rho}
\left[
D_vW_{\rho}^{\mathrm{rec}}\,
\mathcal{K}_{\rho}^{(\eta,\epsilon_c)}
+
W_{\rho}^{\mathrm{rec}}\,
D_v\mathcal{K}_{\rho}^{(\eta,\epsilon_c)}
\right]
+
\mathcal{R}_{\mathrm{wake},v}^{\mathrm{rec}},
$$
with the same retained branch list $\mathfrak{R}_{W}^{\mathrm{ret}}$ consumed by
the action, power, event, and Noether balance rows. A source-normal diagnostic
alone, a terminal aggregate, a finite-difference table after branch identity is
erased, or an H39/theta3minus source-map diagnostic fails with
`receiver-normal-first-derivative-row-missing` or
`receiver-normal-derivative-record-mismatch` rather than authorizing
wake-history closure. A row that carries a different retained branch list exits
as `branch-family-consumer-checksum-mismatch`. An H39/theta3minus
provider-object branch row may enter only through
`h39-receiver-normal-retained-record-preimage-row/v0`, after it is bound to an
accepted retained causal-root force/action record with the receiver-normal
derivative bundle above. H39 primitive-vector replays, hybrid prefix-Cauchy
diagnostics, coefficient-series source-map residual provider candidates,
source-map residual envelopes, provider-fit diagnostics, and signed-radius
targets remain negative controls until that preimage row exists.

## First Executable Wake-History Consumer Contract

Status. Priority-only executable row-logic artifact. The wake-history consumer
lane now has one concrete same-record derivative contract in
`scripts/proof-programs/event-wake-history-pullback-diagnostic.mjs`, with
coverage in `tests/event-wake-history-pullback-diagnostic.test.js`.

The first populated consumer was `energy_wake`. The contract has now been
extended to each required event row:

| Event row | Receiver-normal derivative status |
| --- | --- |
| `energy_wake` | Same-record derivative bundle accepted at row-logic level. |
| `momentum_wake` | Same-record derivative bundle accepted at row-logic level. |
| `angular_momentum_wake` | Same-record derivative bundle accepted at row-logic level. |
| `medium_update` | Same-record derivative bundle accepted at row-logic level. |

This remains non-promotional. The diagnostic reports
`receiver_normal_derivative_contract_ready` only for a row-logic fixture that
populates all four event rows, and the artifact still declares
`retained_branch: false` and `updates_live_validation_gate: false`. The value
is narrower: any declared accepted wake-history row is rejected unless its
`wake_history_derivation_proof_object` also carries the existing
`receiver-normal-retained-branch-family-first-derivative/v0` artifact on the
same retained source record, retained event ledger, retained record key, source
artifact hash, and consumer row.

Each fixture row uses the nontrivial linear moving-receiver row-shape values
$$
D_s=1,
\qquad
D_t=\frac{3}{2},
\qquad
W^{\mathrm{rec}}=\frac{3}{2},
\qquad
D_vD_s=0.1,
\qquad
D_vD_t=0.4,
\qquad
D_vW^{\mathrm{rec}}=0.25.
$$
The last value is not accepted as an independent fit. The diagnostic recomputes
it from
$$
D_vW^{\mathrm{rec}}
=
\frac{\zeta_t\zeta_s}{D_s^2}
\left(D_sD_vD_t-D_tD_vD_s\right)
$$
and rejects the row if the emitted value drifts from that reconstruction.

Executable fail-closed controls now include:

| Control | Failure surface |
| --- | --- |
| Missing accepted wake-history proof-object provider | The proof-object boundary reports `provider_status: wake_history_derivation_proof_object_missing`, `accepted_retained_provider_ready: false`, and `first_blocked_downstream_consumer: partial_L_EpJ`. |
| Missing proof object with the derivative bundle present | The selected row reports `wake-history-derivation-proof-object-missing` and lists only `wake_history_derivation_proof_object` in `required_object_blockers`. |
| Proof-object status/provenance mismatch with the derivative bundle present | The selected row reports `wake-history-derivation-proof-object-status-not-accepted` or `wake-history-derivation-proof-object-provenance-mismatch` and keeps `partial_L_EpJ` blocked. |
| Missing receiver-normal derivative bundle | The contract summary reports `receiver-normal-first-derivative-row-missing` and lists `receiver_normal_derivative_bundle` in `required_object_blockers`. |
| Source-record drift inside the derivative bundle | The row reports `event_evidence.receiver_normal_derivative_bundle.source_record_id`. |
| Reconstruction drift for $D_vW^{\mathrm{rec}}$ | The row reports `event_evidence.receiver_normal_derivative_bundle.receiver_normal_derivatives.D_vW_rec_reconstruction`. |
| Incomplete event-row set | `receiver_normal_derivative_contract_summary.blocked_row_ids` names the remaining missing rows. |
| Branch-family checksum drift | The contract summary reports `branch-family-consumer-checksum-mismatch`. |
| Missing derivation proof object | The row lists `wake_history_derivation_proof_object` in `required_object_blockers`. |

CLI replay/falsification. The same cases can be emitted from the command line
through the existing diagnostic:

```bash
node scripts/proof-programs/event-wake-history-pullback-diagnostic.mjs \
  --control receiver-normal-branch-family-checksum-mismatch \
  --event-row momentum_wake
```

The receiver-normal controls are
`receiver-normal-derivative-contract-row-logic`,
`receiver-normal-missing-proof-object-provider`,
`receiver-normal-proof-object-provenance-mismatch`,
`receiver-normal-missing-derivative-bundle`,
`receiver-normal-reconstruction-drift`,
`receiver-normal-record-mismatch`, and
`receiver-normal-branch-family-checksum-mismatch`. The `--event-row` selector
accepts `energy_wake`, `momentum_wake`, `angular_momentum_wake`,
`medium_update`, or `all`. Negative controls populate the surrounding four-row
row-logic fixture and falsify the selected row, so the reported first blocked
row and failure code identify the intended receiver-normal contract break.

Provider boundary. A local search found no non-fixture accepted retained
wake-history provider object for `wake_history_derivation_proof_object`. The
diagnostic therefore emits
`wake_history_derivation_proof_object_boundary` as the accepted-provider
boundary. It includes the
`wake-history-derivation-proof-object-provider-target/v0` target, which names
the expected proof-object role, the expected
`receiver-normal-retained-branch-family-first-derivative/v0` artifact, required
retained-record fields, required receiver-normal derivative fields, required
proof-object/provenance fields, and the excluded source classes. The same
boundary now emits `same_record_identity_boundary`,
`proof_object_provenance_boundary`, and `downstream_consumer_boundary`; the
last keeps `partial_L_EpJ` blocked until an accepted retained provider object
satisfies that target.
This keeps a complete four-row derivative row-logic replay distinct from an
accepted retained wake-history proof-object provider.

This is the first same-record wake-history derivative consumer contract. It is
not an A1, VP-1, breather, circular, H39/theta3minus, eigen-braid, assembly, or
Noether-closure pass, and it is not accepted retained evidence. H39/theta3minus
quotient rows remain excluded unless a future regenerated provider-object
preimage row is bound to an accepted retained causal-root force/action record
carrying the same receiver-normal derivative bundle.
