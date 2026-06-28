# Bounded Speed Factor Action Stability After Normal Candidate

Promotion status: `priority-only`. This packet consumes the
`bounded_speed_normal_reconstruction_candidate` boundary from
[bounded-speed-factor-speed-ode-zero-mean-correction-target.md](bounded-speed-factor-speed-ode-zero-mean-correction-target.md)
and [bounded-speed-factor-normal-reconstruction-theorem.md](bounded-speed-factor-normal-reconstruction-theorem.md). It refines
[bounded-speed-factor-action-stability-closure.md](bounded-speed-factor-action-stability-closure.md),
[bounded-speed-factor-variational-noether-closure.md](bounded-speed-factor-variational-noether-closure.md),
[bounded-speed-factor-coupled-fixed-point-theorem.md](bounded-speed-factor-coupled-fixed-point-theorem.md),
[bounded-speed-factor-tail-cover-completeness-lemma.md](bounded-speed-factor-tail-cover-completeness-lemma.md),
[root-ledger-floquet-stability-certificate.md](root-ledger-floquet-stability-certificate.md), and
[observer-export-status-row.md](observer-export-status-row.md).

It does not retain a branch and does not make an observer export. Its purpose is to say exactly what a bounded-speed normal-reconstruction candidate must emit next before it can become a bounded-speed live-ledger action/stability candidate.

---

## 1. Input Boundary

The only admissible input is a same-ledger normal candidate

$$
\mathfrak{N}_{\nu}^{\mathrm{cand}}
=
\left(
\mathbf{Y},
\nu,
\chi,
\Lambda,
\mathcal{A}_{\nu},
F^{\nu},
\Gamma_B^{\nu},
\mathsf{Support}^{\nu},
\mathsf{PeriodWind},
\mathsf{Margins}^{\nu}
\right)
$$

with status

$$
\texttt{bounded-speed-normal-reconstruction-candidate}.
$$

The candidate must already have closed the scalar speed row, primitive return, speed band, clock/length row, normal residual, tangent holonomy, position closure, unit-tangent residual, support margin, noncollision, root-ledger persistence, and normal Krawczyk rows on one bounded-speed ledger id.

This packet upgrades only the next rows:

$$
\mathfrak{A}_{\nu}^{\mathrm{afterN}}
=
\left(
\mathcal{L}_{\mathrm{live}}^{\nu},
\mathcal{S}_{\mathrm{tot}}^{\nu},
\Gamma_B^{\nu},
\mathcal{R}_{\mathrm{curl}}^{\nu},
\mathcal{L}_{\mathrm{exch}}^{\nu},
\mathcal{J}_{\zeta}^{\nu},
\mathcal{T}_{\mathrm{tail/ref}}^{\nu},
\mathcal{P}_{\mathrm{stab}}^{\nu},
\mathsf{ExportElig}^{\nu},
\mathfrak{C}_{\mathrm{cpl}}^{\nu}
\right).
$$

The output may at most become

$$
\texttt{bounded-speed-action-stability-intake-candidate},
\qquad
\texttt{not_retained}.
$$

It is not a retained branch because the coupled fixed-point, branch-decision, refinement, and observer-export rows still require certified downstream verdicts.

---

## 2. Same-Live-Ledger Requirement

Every row below must use one live bounded-speed ledger

$$
\mathcal{L}_{\mathrm{live}}^{\nu}
=
\left(
\mathcal{L}_{\mathrm{chart}},
\mathcal{L}_{\mathrm{clock}},
\mathcal{L}_{\mathrm{root}},
\mathcal{L}_{\mathrm{force}},
\mathcal{L}_{\mathrm{support}},
\mathcal{L}_{\mathrm{action}},
\mathcal{L}_{\mathrm{event}},
\mathcal{L}_{\mathrm{der}},
\mathcal{L}_{\mathrm{tail}},
\mathcal{L}_{\mathrm{ref}}
\right).
$$

The ledger identity is the tuple

$$
\operatorname{id}\mathcal{L}_{\mathrm{live}}^{\nu}
=
\left(
\texttt{ledger\_convention\_id},
\texttt{branch\_chart\_id},
\texttt{speed\_clock\_id},
\texttt{root\_ledger\_id},
\texttt{force\_checksum},
\texttt{support\_descriptor\_id},
\texttt{action\_convention\_id},
\texttt{event\_window\_id},
\texttt{tail\_cover\_id},
\texttt{consumer\_checksum}
\right).
$$

The normal candidate, action rows, Noether/event rows, stability row, observer-export eligibility row, and coupled fixed-point object must all report this same tuple. A fixed-speed root label may appear only as source provenance. It cannot substitute for bounded-speed clocks, inverse clocks, root derivatives, Jacobian floors, tail ownership, action curl, or event exchange.

If any checksum or convention differs, the first failed row is

$$
\texttt{after-normal-ledger-mismatch}.
$$

---

## 3. Action-Derived Scale And Action Curl

The scale consumed by the normal candidate becomes action-eligible only if it is emitted as an action-derived quantity on the same ledger:

$$
\Gamma_B^{\nu}
=
\Gamma_{\mathrm{act}}^{\nu}
\left[
\mathcal{S}_{\mathrm{tot}}^{\nu},
\mathcal{L}_{\mathrm{live}}^{\nu}
\right].
$$

The packet must distinguish:

| Scale status | Meaning |
| --- | --- |
| `gamma-action-derived` | $\Gamma_B^{\nu}$ is derived from the bounded-speed action, inertia row, support action, and event convention on $\mathcal{L}_{\mathrm{live}}^{\nu}$ |
| `gamma-fitted-not-derived` | $\Gamma_B^{\nu}$ is fitted or inherited from a diagnostic solve; it may support screening but not action/stability closure |
| `gamma-ledger-mismatch` | the scale uses a different root, force, support, event, or clock convention |

The bounded-speed history-work one-form must be the causal-time, clock-corrected form

$$
\omega_{\mathrm{hist}}^{\nu}(v)
=
\frac{R_*E_\epsilon(R_*)}{c_f}
\sum_i
\int_0^{H_*}
\widetilde{\mathbf{F}}_i^{\nu}(u)\cdot
\Xi_{v,i}(u)\,du
+\omega_{\mathrm{root}}^{\nu}(v),
$$

with bounded-speed root and Jacobian derivatives. The action curl row is

$$
\mathcal{R}_{\mathrm{curl}}^{\nu}
=
\sup_{\|v\|,\|w\|\le1}
\frac{
\left|
D_v\omega_{\mathrm{hist}}^{\nu}(w)
-D_w\omega_{\mathrm{hist}}^{\nu}(v)
\right|
}{
1+\|\omega_{\mathrm{hist}}^{\nu}\|_{\mathrm{F}}
}.
$$

The action row is eligible only when

$$
\mathcal{R}_{\mathrm{curl}}^{\nu}\le\epsilon_{\mathrm{curl}}^{\nu}.
$$

If the normal candidate reuses a fitted scale, fixed-speed curl row, frozen root derivative, or arclength-only history work after $\nu$ is active, the first failed row is one of

$$
\texttt{gamma-fitted-not-derived},
\qquad
\texttt{action-curl-open},
\qquad
\texttt{bounded-speed-factor-history-work-stale}.
$$

---

## 4. Noether/Event Exchange

The Noether/event row must close the speed-factor storage and coherent exchange ledger:

$$
\mathcal{R}_{\mathrm{exch},i}^{\nu}
=
\frac{dE_{\mathrm{spd},i}^{\nu}}{du}
-E_\epsilon(R_*)\nu_i\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^{\nu}
-\mathcal{P}_{\mathrm{constr},i}^{\nu}
-\mathcal{P}_{\mathrm{sea/event},i}^{\nu}.
$$

For every declared generator $\zeta$, the current split

$$
\mathcal{J}_{\zeta}^{\nu}
=
\mathcal{J}_{\zeta,Y}^{\nu}
+\mathcal{J}_{\zeta,\mathrm{hist}}^{\nu}
+\mathcal{J}_{\zeta,\mathrm{spd}}^{\nu}
+\mathcal{J}_{\zeta,\mathrm{sea/event}}^{\nu}
$$

must be evaluated on the same branch, support, event, and tail convention as the normal candidate. The packet must report conservation residuals for energy, momentum, angular momentum, charge, source provenance, and Noether sea exchange:

$$
\mathcal{R}_{\mathrm{Noether/event}}^{\nu}
=
\left(
\mathcal{R}_E^{\nu},
\mathcal{R}_{\mathbf{p}}^{\nu},
\mathcal{R}_{\mathbf{J}}^{\nu},
\mathcal{R}_Q^{\nu},
\mathcal{R}_{\mathrm{src}}^{\nu},
\mathcal{R}_{\mathrm{sea/event}}^{\nu}
\right).
$$

If speed-factor storage, support work, event endpoint jumps, source-provenance changes, or Noether sea exchange are omitted, the first failed row is

$$
\texttt{noether-event-exchange-open}.
$$

If the row is computed on another event window or a fixed-speed ledger, the first failed row is

$$
\texttt{noether-event-mixed-ledger}.
$$

---

## 5. Tail And Refinement Persistence

The normal candidate must preserve the retained causal-root ledger beyond the finite sampled row. This packet requires a tail/refinement payload

$$
\mathcal{T}_{\mathrm{tail/ref}}^{\nu}
=
\left(
\Omega_{\mathrm{tail}}^{\nu},
\rho_{\mathrm{tail}}^{\nu},
\epsilon_{\mathrm{tail}}^{\nu},
\epsilon_{\mathrm{disc}}^{\nu},
\epsilon_{\mathrm{alias}}^{\nu},
\mathcal{C}_{\mathrm{ref}}^{\nu}
\right).
$$

The tail cover must be a finite owned cover of the bounded-speed causal-time tail domain with terminal predicates `excluded`, `assimilated-root-tube`, `boundary-owned`, or `event-reset`. The refinement payload must state how the normal candidate persists under mesh, mode, quadrature, and tail refinement:

$$
\epsilon_{\mathrm{tail}}^{\nu}
+\epsilon_{\mathrm{disc}}^{\nu}
+\epsilon_{\mathrm{alias}}^{\nu}
\le
\tau_{\mathrm{ref}}^{\nu},
$$

and it must keep the same root labels, sign labels, source-pair policy, support descriptor, event convention, and speed-band margins on the proof ball.

If causal-time tail exclusion or assimilation is unresolved before local cover
predicates can be checked, the first failed row is

$$
\texttt{tail-persistence-open}.
$$

If only local tail predicates exist, the first failed row is

$$
\texttt{bounded-speed-tail-cover-incomplete}.
$$

If the finite-mode candidate has no persistence row under refinement, the first failed row is

$$
\texttt{refinement-persistence-open}.
$$

An `event-reset` terminal predicate stops the current certificate and sends control to the event row; it is not a tail success for retention.

---

## 6. Stability Row

The stability row must use the bounded-speed variational state

$$
\delta X^{\nu}
=
\left(
\delta\mathbf{Y},
\delta\mathbf{T},
\delta\nu,
\delta\eta,
\delta\Gamma,
\delta\mathcal{E}
\right)
$$

and the reduced monodromy

$$
M_B^{\nu}
=
\Pi_{\mathrm{ng}}^{\nu}
\Phi_B^{\nu}(H_*)
\Pi_{\Sigma}^{\nu}
$$

on the same root, action, exchange, and event ledger. The packet must report:

1. root-dependent variational equations including $D_v\eta_r^{\nu}$ and $D_vJ_r^{\nu}$;
2. Hessian blocks in $\mathbf{Y}$, $\nu$, and $\Gamma_B^{\nu}$;
3. neutral-mode quotient and declared gauge directions;
4. conservative, exchange, or dissipative classification;
5. Krein or energy-momentum signature row when the ledger is conservative;
6. nonlinear perturbation-recovery or rejection row.

The speed sector cannot be silently treated as gauge. It must be classified as a physical neutral family, constrained exchange mode, stable transverse mode, or instability.

If the row uses fixed-speed monodromy, omits $\delta\nu$, freezes roots, or lacks the conservative/exchange classification, the first failed row is

$$
\texttt{bounded-speed-stability-ledger-mismatch}
$$

or

$$
\texttt{bounded-speed-factor-monodromy-state-incomplete}.
$$

---

## 7. Observer-Export Eligibility

This packet may only report export eligibility, not export success. Define

$$
\mathsf{ExportElig}^{\nu}
=
\left(
\mathsf{Root}^{\nu},
\mathsf{Tail}^{\nu},
\mathsf{Dynamics}^{\nu},
\mathsf{Support}^{\nu},
\mathsf{Action}^{\nu},
\mathsf{Noether}^{\nu},
\mathsf{Event}^{\nu},
\mathsf{Stability}^{\nu},
\mathsf{Inventory}^{\nu}
\right).
$$

Observer rows may move from `blocked:<row>` to `not_computed` only when every component above exists on the same live ledger. Lorentz, photon, mass-map, color, strong-field, and cosmology rows remain downstream computed rows. A mass, Lorentz, photon, color, strong-field, or cosmology value computed from a fixed-speed or mixed ledger must report

$$
\texttt{invalid_mixed_ledger}.
$$

The passing eligibility status is

$$
\texttt{observer-export-eligible-not-computed}.
$$

It does not imply `passed` for any export row and does not retain a branch.

---

## 8. Coupled Fixed-Point Consumption

After the action, event, tail/refinement, and stability rows close, the same data must be consumed by the coupled residual object

$$
\mathfrak{C}_{\mathrm{cpl}}^{\nu}
=
\left(
\mathfrak{Z}_{\nu},
\mathcal{R}_{\mathrm{cpl}}^{\nu},
W_{\mathrm{cpl}},
\mathcal{L}_{\mathrm{live}}^{\nu},
\mathcal{D}_{\mathrm{cpl}}^{\nu},
\mathcal{K}_{\mathrm{cpl}}^{\nu},
\mathcal{S}_1
\right).
$$

The coupled residual must include the speed mean, primitive, tangent dynamics, normal dynamics, unit tangent, tangent holonomy, position closure, support-radial row, support-band row, root row, root-persistence row, action/support row, and event row. Its derivative must include active columns in

$$
z=(a,b,r,\gamma,s,e)
$$

or a certified Schur replacement with the displayed implicit derivative correction from the coupled fixed-point theorem. A small residual norm is not enough; the Krawczyk budget, range/cokernel split, tail/discretization bounds, and proof-ball margins must all be emitted.

The passing coupled status is

$$
\texttt{bounded-speed-coupled-fixed-point-candidate}.
$$

This still means bounded-speed dynamics/action candidate, not retained branch. Retention remains blocked until the branch-decision, refinement, observer-export status, and master-retention predicate consume this candidate without a first-failure row.

---

## 9. First-Failure Ladder

A packet consuming `bounded_speed_normal_reconstruction_candidate` must report the first failed row in this order:

1. `normal-candidate-missing`
2. `after-normal-ledger-mismatch`
3. `bounded-speed-live-ledger-open`
4. `gamma-fitted-not-derived`
5. `gamma-ledger-mismatch`
6. `action-curl-open`
7. `bounded-speed-factor-history-work-stale`
8. `bounded-speed-factor-exchange-open`
9. `noether-event-exchange-open`
10. `noether-event-mixed-ledger`
11. `tail-persistence-open`
12. `bounded-speed-tail-cover-incomplete`
13. `refinement-persistence-open`
14. `bounded-speed-stability-ledger-mismatch`
15. `bounded-speed-factor-monodromy-state-incomplete`
16. `stability-classification-open`
17. `observer-export-eligibility-open`
18. `observer-export-eligible-not-computed`
19. `coupled-residual-object-open`
20. `coupled-unknown-schema-open`
21. `coupled-derivative-matrix-open`
22. `coupled-cokernel-open`
23. `coupled-krawczyk-open`
24. `bounded-speed-coupled-fixed-point-candidate`
25. `bounded-speed-action-stability-intake-candidate`

Rows 24 and 25 are candidate statuses only. They must still carry

$$
\texttt{retention=not\_retained},
\qquad
\texttt{retained\_branch=false}.
$$

---

## 10. Output Schema

The packet must emit:

| Field | Required payload |
| --- | --- |
| `normal_candidate_input` | source artifact id, `bounded-speed-normal-reconstruction-candidate` status, speed/clock/normal/root/support rows, force checksum, consumer checksum, and non-retention flags |
| `live_ledger_identity` | full $\operatorname{id}\mathcal{L}_{\mathrm{live}}^{\nu}$ tuple and equality checks across normal, action, event, tail, stability, observer, and coupled rows |
| `bounded_speed_live_ledger` | fail-closed target object with the normal-candidate ledger id, force checksum, consumer checksum, `bounded-speed-live-ledger-open`, the nested `live_ledger_identity_target`, and the required same-ledger rows for action-derived scale, action curl, speed-factor storage/exchange, Noether/event exchange, tail/refinement persistence, bounded-speed stability, observer-export eligibility, and coupled fixed point |
| `bounded_speed_live_ledger.live_ledger_identity_target` | priority-only identity target with the exact normal-candidate ledger tuple, required closed rows, current closed rows, missing closed rows, `first_missing_closed_row=action_derived_scale`, and the negative control `same-ledger-id-tuple-without-closed-downstream-rows-not-live-ledger` |
| `bounded_speed_live_ledger.action_derived_scale_target` | priority-only target for the first missing downstream row: $\Gamma_B^{\nu}$, the action functional, scale parameter, speed-factor profile, force/action pairing, scale margin, and required same-ledger action rows; the fixture rejects by `same-ledger-tuple-without-action-scale-rows-not-action-derived-scale` |
| `action_scale` | $\Gamma_B^{\nu}$, `gamma-action-derived` / `gamma-fitted-not-derived` / `gamma-ledger-mismatch`, inertia or scale derivation, and scale margins |
| `action_curl` | $\omega_{\mathrm{hist}}^{\nu}$, clock-corrected variations, bounded-speed root derivatives, $\mathcal{R}_{\mathrm{curl}}^{\nu}$, and tolerance |
| `storage_exchange` | $E_{\mathrm{spd}}^{\nu}$, $\mathcal{R}_{\mathrm{exch}}^{\nu}$, support-work assignment, Noether sea/event exchange, and window residuals |
| `noether_event` | Noether currents, energy/momentum/angular-momentum/charge/source-provenance residuals, event endpoint jumps, and same-event-window proof |
| `tail_refinement_persistence` | finite tail ownership map, terminal predicates, $\rho_{\mathrm{tail}}^{\nu}$, refinement sequence or error envelope, and same-ledger persistence verdict |
| `stability` | bounded-speed variational state, Hessian, monodromy, neutral quotient, speed-sector classification, conservative/exchange classification, and nonlinear recovery row |
| `observer_export_eligibility` | blocked, `not_computed`, `invalid_mixed_ledger`, or `observer-export-eligible-not-computed` status for each export family |
| `coupled_fixed_point` | $\mathfrak{C}_{\mathrm{cpl}}^{\nu}$, derivative or Schur derivative, Krawczyk budget, range/cokernel split, tail/discretization bounds, and first-failure row |
| `status` | first failed row from the ladder above, plus `retention=not_retained` and `retained_branch=false` |

Current priority status:

$$
\texttt{bounded-speed-action-stability-after-normal-candidate-open},
\qquad
\texttt{after-normal-fixture-fails-closed-at-bounded-speed-live-ledger-open},
\qquad
\texttt{not_retained}.
$$

## 11. Current First-Failure Application 2026-06-28

Applying the ladder to non-fixture branch work in the current priority tree
still stops at the first row:

$$
\texttt{normal-candidate-missing}.
$$

The frozen fixed-speed root ledger, frozen speed-ODE diagnostic, zero-mean
correction intake, range/cokernel probes, live-matrix previews, $\alpha_B$
directions, post-correction speed primitive feasibility rows, clock/length
return rows, and normal-reconstruction handoff packets remain source
provenance only. None currently emits a same-ledger
`bounded-speed-normal-reconstruction-candidate` with the scalar speed row,
primitive return, speed band, clock/length row, normal residual, tangent
holonomy, position closure, unit-tangent residual, support margin,
noncollision, root-ledger persistence, and normal Krawczyk rows all closed on
one bounded-speed ledger id.

### Next Evidence Object: `bounded_speed_normal_reconstruction_candidate/v0`

The next admissible object is a single same-ledger normal candidate. It is not
a speed-ODE correction, not a range/cokernel probe, and not a handoff packet
unless every row below is emitted on one bounded-speed ledger id.

| Field | Required same-ledger content | Current reading |
| --- | --- | --- |
| `ledger_id` | One $\mathcal{L}_{\mathrm{live}}^\nu$ identity shared by speed, clock, normal, root, support, and force rows. | absent |
| `scalar_speed_row` | Bounded-speed scalar speed row with speed band and primitive return. | preview only |
| `clock_length_row` | Clock and length return on the same ledger as the speed row. | preview only |
| `normal_residual_row` | Normal reconstruction residual with tolerance and source checksum. | absent |
| `tangent_holonomy_row` | Tangent holonomy and unit-tangent residual on the same ledger. | absent |
| `position_closure_row` | Position closure row tied to the same active-root convention. | absent |
| `support_noncollision_row` | Support margin, noncollision, and support-band status. | absent |
| `root_persistence_row` | Active-root persistence and Jacobian-floor status after bounded-speed reconstruction. | absent |
| `normal_krawczyk_row` | Krawczyk or equivalent proof-ball budget for the normal reconstruction unknowns. | absent |
| `candidate_status` | `bounded-speed-normal-reconstruction-candidate` with `retention=not_retained` and `retained_branch=false`. | `normal-candidate-missing` |

Current candidate-source boundary:

| Source row | Current reading | Consumption rule |
| --- | --- | --- |
| Frozen fixed-speed root ledger | certified only for rigid octahedral fixed-speed roots; `retained_branch=false` | provenance only |
| Frozen speed-ODE diagnostic | fails `sampled-speed-ode-zero-mean-failed` with no bounded-speed live ledger | provenance only |
| Zero-mean correction intake schema | can accept supplied normal-candidate packets | schema support only |
| Normal-reconstruction handoff | fixture-only; not currently emitted by a non-fixture bounded-speed ledger id with force and consumer checksums | first missing non-fixture prerequisite |
| Supplied normal candidate | fixture-only; absent for non-fixture branch work | keeps non-fixture branch work below retention |
| Downstream action/stability rows | not reached | keep `retention=not_retained` and `retained_branch=false` |

Executable normal-candidate fixture status, 2026-06-28:
[zero-mean-normal-candidate](../../../../scripts/neutral-braid/fixtures/zero-mean-normal-candidate/README.md)
supplies the same-ledger packet chain consumed by
`scripts/neutral-braid/octahedral-zero-mean-correction-intake.mjs`. The fixture
validates the plumbing path through `live-derivative-matrix-certified`,
`correction-direction-found`, `speed-primitive-feasibility-certified`,
`speed-clock-length-return-certified`, `normal-reconstruction-handoff-staged`,
`bounded-speed-normal-reconstruction-candidate`, and the fail-closed
`bounded-speed-action-stability-after-normal-candidate-intake` boundary.

The generated artifact reports:

| Field | Fixture result |
| --- | --- |
| `result.intake_status` | `zero-mean-action-stability-after-normal-candidate-blocked` |
| `residual_vector.first_failure_row` | `bounded-speed-live-ledger-open` |
| `artifact_claim.emits_bounded_speed_normal_reconstruction_candidate` | `true` |
| `artifact_claim.emits_action_stability_after_normal_candidate_intake` | `true` |
| `artifact_claim.certifies_normal_reconstruction` | `true` for supplied same-ledger candidate rows |
| `artifact_claim.certifies_bounded_speed_live_ledger` | `false` |
| `artifact_claim.certifies_action_stability` | `false` |
| `artifact_claim.certifies_observer_export` | `false` |
| `action_stability_after_normal_candidate_intake.bounded_speed_live_ledger.required_same_ledger_rows.*` | all required rows present and `blocked:bounded-speed-live-ledger-open` |
| `action_stability_after_normal_candidate_intake.bounded_speed_live_ledger.live_ledger_identity_target` | target-only identity object whose required closed rows are the normal candidate plus eight downstream live-ledger rows, while the current packet supplies only `bounded_speed_normal_reconstruction_candidate` and lists `action_derived_scale` as the first missing closed row |
| `action_stability_after_normal_candidate_intake.bounded_speed_live_ledger.action_derived_scale_target` | target-only object for the first missing row; it requires `action_measure_row`, `scale_derivative_row`, `force_action_pairing_row`, `normal_speed_pullback_row`, and `scale_margin_row`, and rejects the current fixture because it supplies only the normal candidate plus tuple identity |
| `action_stability_after_normal_candidate_intake.downstream_row_statuses.*` | `blocked:bounded-speed-live-ledger-open` |
| `result.retained_branch` | `false` |

This moves the executable fixture boundary past `normal-candidate-missing` for a
supplied same-ledger packet chain only, and then records the first after-normal
failure at `bounded-speed-live-ledger-open`. It does not create a retained
branch, certify bounded-speed live-ledger closure, or authorize
action/Noether/event, stability, observer-export, or coupled fixed-point
consumption.

The added identity target is a negative control against over-consuming the
fixture's matching ledger/checksum tuple. It records that the tuple is shared
with the normal candidate, but the current artifact closes only
`bounded_speed_normal_reconstruction_candidate`; action-derived scale, action
curl, speed-factor storage/exchange, Noether/event exchange,
tail/refinement persistence, bounded-speed stability, observer-export
eligibility, and coupled fixed point are still missing closed rows. Tuple
equality alone is therefore not a bounded-speed live ledger certificate.

The executable `action_derived_scale_target` makes the first missing downstream
row concrete without accepting it. It names the needed variables
$\Gamma_B^{\nu}$, $A^{\nu}$, scale parameter, speed-factor profile,
force/action pairing, and scale margin, then requires same-ledger rows for the
action measure, scale derivative, force/action pairing, normal-speed pullback,
and scale margin. The current fixture supplies only
`bounded_speed_normal_reconstruction_candidate`, so it is rejected by
`same-ledger-tuple-without-action-scale-rows-not-action-derived-scale` and keeps
`certifies_action_derived_scale=false`,
`certifies_bounded_speed_live_ledger=false`, and `retained_branch=false`.

The smallest durable artifact is one supplied same-ledger normal candidate that
matches the handoff's bounded-speed ledger id, force checksum, and consumer
checksum, then closes normal residual, tangent holonomy, position closure,
unit-tangent, support margin, noncollision, root persistence, and normal
Krawczyk rows. Even if that artifact passes, it may only set
`bounded-speed-normal-reconstruction-candidate`; it still does not retain a
branch or certify bounded-speed live-ledger closure.

Therefore the after-normal action/stability consumer may only consume the
normal candidate as a fail-closed intake boundary until a real same-ledger live
ledger exists. It must not attempt $\Gamma_B^\nu$, action curl, Noether/event
exchange, tail/refinement, stability, observer-export eligibility, or coupled
fixed-point consumption from the fixture. For non-fixture branch work, the next
admissible artifact remains the normal candidate itself. For the fixture path,
the next admissible artifact is a real same-ledger live-ledger certificate
whose action, event, tail/refinement, stability, observer-export eligibility,
and coupled-fixed-point rows are not merely blocked by
`bounded-speed-live-ledger-open`. Until that exists, every downstream row in
this packet inherits

$$
\texttt{retention=not\_retained},
\qquad
\texttt{retained\_branch=false}.
$$
