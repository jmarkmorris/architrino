# Claims-Triage Small-Population Long-Horizon Evolution Plan

## Purpose

This packet defines the EOM capability needed now to adjudicate the quarantined
T2 stability and T3 dynamical claims in the
[claims-triage ledger](../app-solver/claims-triage-ledger-2026-07-12.md).
The ledger objects are pairs, triples, the six-worldline V5, and dressed or
payload-bearing objects in the low tens of worldlines. The governing workload
is therefore complete all-pair retained-history evolution over long physical
horizons, not million-path population scale.

The million-path profile remains a long-term EOM conformance goal. It is not a
dependency of this plan.

## Immediate Outcomes

1. Restore complete-root certification across the evolving §97 off-diagonal
   and antipodal-pair precision walls. The current campaign halts at $t=0.335$
   against the required $t\ge6.931754$ even though projected wall time is small.
2. Add a provenance-bound drifting-circular retained-history factory so the
   converged sub-$c_f$ §98 `M-O-I` object can retain its recorded common axial
   drift rather than being replaced by a different object.
3. Attribute and then repair the exact-root cost after the exact-$v=c_f$
   pinned-fold temporal step removed the first-order onset estimator artifact.
   Clean serialized measurement now assigns 99.2861% of one accepted §86 step
   to exact-pair root certification and only 0.7117% to finite-width execution.
4. Re-run §97 and §98 to their required horizons and refinement ladders; do not
   adjudicate a sign from the current short, nonconverged histories.
5. After §86 becomes feasible, run its horizon and refinement ladders before
   using it as a stability reference.
6. Advance the remaining T3 evolutions and the anchored §99 direct-evolution
   confirmation in the ledger's recorded order.

## Capability Matrix

| Capability | Present state | Work needed now | Ledger effect |
| --- | --- | --- | --- |
| Continuous retained-history input | Implemented for stationary circular histories | Preserve exact object provenance, add uniformly drifting circular history, and reject state-only starts | Immediate §98 blocker and required for every rerun |
| Complete partner and self-root accounting | Implemented for the native correctness nucleus; evolving §97 rows currently exhaust certification at 512 and 1024 MPFR bits | Repair root continuation/enclosure across the identified off-diagonal and antipodal-pair walls without relaxing fail-closed tolerances | Immediate §97 blocker and required for every rerun |
| Atomic coupled accepted steps | Implemented | Preserve fail-closed publication through longer runs | Required for every rerun |
| Finite-width fold/caustic route | Analytic exact-$v=c_f$ circular-prefix treatment and provenance-gated temporal onset step certified; onset accepts $5\times10^{-4}$ and post-onset accepts $10^{-3}$ | Preserve the certified route; do not treat its 1,928-cell count as a cost proxy | Not the §86 step-time owner; integral and onset-step collapse are closed |
| Persistent long-run history ownership | Partial; worker persists but complete histories are still transported per chunk | Keep native histories resident across accepted windows and checkpoint them without reconstruction drift | Needed for all long-horizon campaigns |
| Checkpoint/restart | Single-host foundation implemented | Bind restart to the campaign manifest, continuation identities, precision state, and observable accumulators | Needed for practical multi-hour runs |
| Precision escalation | MPFR difficult-row routes exist | Exercise and validate only the precision routes encountered by each bounded-population object; add split absolute time before long horizons threaten local resolution | Needed for claim authority |
| Convergence campaign driver | Individual ladders and tests exist | Automate timestep, history-depth, sampling, regulator, perturbation, precision, and worker-count ladders with deterministic manifests | Needed before any claim leaves quarantine |
| Claim observables | Case-specific diagnostics exist | Emit control-relative rotation, separation, growth/decay, locking, settling, and complete provenance directly from accepted histories | Needed to adjudicate T2/T3 statements |
| CPU performance | Persistent multithreaded native path exists | Profile the actual low-tens-worldline long-horizon cases and optimize the measured bottleneck | Immediate performance lane |
| Million-path heterogeneous execution | Architecture and partial traversal evidence exist | Defer compressed block reduction, GPU, multi-GPU, and distributed histories to the long-term scale queue | Does not block this ledger |

## Execution Order

### Lane A — Returned Blocked: §97/§98 Sub-$c_f$ Sign Campaign

The first campaign is recorded in the §97/§98 horizon-blocker evidence
packet (legacy-braid ref: `braid-archive/braid-ideal/evidence/section-97-98-direct-evolution-horizon-blocker-2026-07-14.md`).
The exact zero-drift §97 finalist certifies at time zero and evolves only to
$t=0.335$, or $4.83\%$ of the required $t\ge6.931754$, before identified
ordered-pair rows report `numeric_precision_limit_exhausted`. Raising the MPFR
ceiling from 512 to 1024 bits did not move the wall, so the next task is root-
completeness analysis and repair, not another blind precision increase.

The converged sub-$c_f$ §98 `M-O-I` point cannot yet be constructed faithfully
because its recorded worldlines have common axial drift $u=0.156$ and the
provenance-bound circular factory has no drift parameter. The next history
artifact is a uniformly drifting circular factory with analytic endpoint and
interpolation certificates.

After those two engine objects exist, repeat the control-relative RMS rotation
campaign through $t\gtrsim5/\lambda_{\mathrm{expected}}$ with the recorded
step, history-depth, sampling, perturbation-direction, perturbation-magnitude,
precision, regulator, and worker-count ladders. Adjudicate only the sign claim;
the historical pencil magnitudes remain retired.

### Lane B — Blocking Mathematics and Numerics: §86 Cubic Endpoint Tangency

The exact $v=c_f$ circular start is part of the claim and cannot be moved away
from the speed pin. The current finite-width calculation can publish the first
cubic-tangency departure step, but its step cost makes a horizon of
$t\gtrsim1/\lambda\approx5$ infeasible.

For the exact V5 middle self pair,

$$
g(D)=2\rho\sin(\omega D/2)-c_fD
=-\frac{\rho\omega^3}{24}D^3+O(D^5),
$$

so the coincident endpoint is a triple root, not an interior fold. If the
chord is formed from independently inflated positions with uncertainty
$\epsilon$, the sign becomes inaccessible below the scale

$$
D_{\mathrm{noise}}
\simeq \frac{1}{\omega}
\left(\frac{24\epsilon}{\rho}\right)^{1/3}.
$$

At $\epsilon=2\times10^{-6}$ this is about `0.0354`, close to the observed
difficult delay near `0.0419`. Classification alone therefore does not imply
a cheaper calculation.

The analytic integral artifact is complete: it encloses an independent
90-digit fold quadrature and reduces the exact-V5 fold pair from 193,338 to
1,928 cells without changing the master equation, root topology, or declared
tolerances. It does not make the horizon feasible because larger steps still
fail the velocity budget and exact-root/correction work dominates wall time.

The four-way atomic-step ablation separated two numerical mechanisms:

1. correlation-preserving self-chord evaluation, using the fact that receiver
   and source are the same retained worldline rather than hulling two
   independent position errors; and
2. cancellation-stable evaluation of the circular residual, preserving the
   cubic term instead of subtracting two nearly equal linear terms.

The independent, correlated-only, stable-only, and combined rows all accepted
with `maximum_quadrature_cells=1928` and classified the middle self pair as
`coincident_endpoint_root_continuation`. Correlation was active in 1,582 cells
but did not reduce the maximum. The exact-circle stable residual was active in
zero cells at the cost maximum because that maximum occurs on evolved history,
outside the exact analytic circular prefix. Concurrent-load step times were
`623.540`, `603.705`, `543.591`, and `601.144` seconds respectively; they are
diagnostic only while the §97 horizon run is active. Correct classification
therefore still takes the same finite-width route at the same cell count. The
result is accepted as a clean negative: neither mechanism is an active
performance target.

A clean serialized measurement then suspended the competing §97 campaign,
ran one §86 worker, and resumed §97 afterward. One fixed `0.0005` step accepted
on its first attempt in `632.318909` seconds. Exact-pair root certification
used `627.804960` seconds (`99.2861%`), of which MPFR used `626.152585` CPU
seconds (`99.0248%` of total wall). Finite-width execution used `4.500060`
seconds (`0.7117%`). Retained-history reconstruction, traversal, copy, and hash
used `0.008046` seconds (`0.00127%`). The corrector executed nine iterations
across three accepted substeps (`4,3,2`), with no rejected substep or atomic
retry; its `581.400232` inclusive seconds are snapshot certification work,
while exclusive corrector control used `0.000175` seconds. Additional MPFR
precision attempts used `445.736570` seconds (`70.4924%`) inside the exact-root
total. Profiler samples place allocation/free activity at `26.9130%` of the
active worker, also nested inside MPFR root work.

The 1,928-cell value remains useful only as a deterministic-work check. It does
not track wall cost and no localization of its owner is active. The attribution
is recorded in
[section-86-step-cost-attribution-2026-07-14.json](evidence/section-86-step-cost-attribution-2026-07-14.json).

Frequency continuation remains outside the accepted fixture because it crosses
a self-root topology change.

### Lane C — Remaining Ledger Campaign

After the §86 route passes its horizon and refinement ladders:

1. re-run §83 release, §90 saturation, §92/§93 locking, §94 settling, and §60
   expansion as true retained-history evolutions;
2. confirm the anchored §99 stability verdict through direct evolution;
3. advance the remaining T2 rows by geometry class, reusing only validated
   campaign machinery and never a prescribed future path;
4. address supra-$c_f$ rows only after the pinned-fold route covers their
   encountered root topology.

## Claim Acceptance Record

A ledger row may leave quarantine only when one immutable campaign packet
contains:

- exact object identity, charges, model binding, units, and continuous retained
  histories;
- the declared horizon and an explanation of why it can distinguish the target
  effect from the seed transient;
- complete ordered-pair accounting, including same-source roots and inactive
  intervals;
- atomic accepted histories with no prescribed future input;
- all event, regulator, precision-escalation, rejection, and first-failure rows;
- the claim-specific observable computed from accepted histories;
- converged timestep, history-depth, sampling, perturbation, regulator,
  precision, and worker-count ladders applicable to that claim;
- checkpoint/restart identity for campaigns that cross a checkpoint;
- independent-oracle coverage of the mathematical routes actually exercised;
- a fail-closed result if any required root, history, event, precision, or
  convergence decision remains unresolved.

Passing a short initial-slope run, replaying a prescribed orbit, matching the
old evaluator, or completing the million-path gate is neither necessary nor
sufficient to promote a ledger claim.

## Explicit Non-Goals For The Immediate Campaign

- million-path manifests and $10^{12}$-relationship execution;
- compressed million-path block reduction;
- GPU, multi-GPU, or distributed-history promotion;
- a polished standalone EOM application beyond controls needed to run, stop,
  resume, inspect, and preserve the bounded-population campaigns;
- recovery of retired pencil magnitudes by tuning the evolved result.

These remain valuable later work. They enter the critical path only if
measurement shows that the bounded-population native CPU route cannot reach a
specific claim's required horizon after root completeness, the pinned-fold
route, and persistent-history work are complete.
