# Finite-Width Close-Approach And Caustic Route

## Status

- Packet id: `eom_finite_width_close_approach_caustic_route/v0`
- Date opened: 2026-07-16
- Claim level: `derived-design`
- Implementation status: `adjudicated-native-route-implemented; live-core-ladder-fails-closed; certified-transit-open`
- Owning queue item: `coupled_retained_history_integrator`
- Mathematical authority:
  [master-eom-binding-v0.md](master-eom-binding-v0.md)
- Evolution authority: [evolution-contract-v0.md](evolution-contract-v0.md)
- Production authority: fail-closed adjudication only; transit authority remains
  absent until every acceptance row below passes

## Closure Target

Replace the generic minimum-step collapse at a certified finite-order
source-normal fold with one of two explicit outcomes:

1. an atomically published coupled segment whose fold contribution, endpoint
   state, regulator ladder, root topology, and sharp-chart exit are certified;
2. an unchanged input history plus an adjudicated failure naming the first
   failed row, regulator level, and residual.

Exact $\|\mathbf V\|=c_f$ is not an entry event. Every decision below uses the
actual ordered-pair causal residual and line-of-action projections.

## Event-Window Objects

For an attempted receiver-time window $[T_0,T_1]$, let
$h_T=T_1-T_0>0$. For each routed ordered pair $(i,j)$, the bound finite-width
pair acceleration is

$$
\mathbf A_{ij}^{(\eta,\epsilon_c)}(T)
=
\kappa\,\sigma_{ij}|q_iq_j|
\int_{T-h}^{T}
\mathbf K_{\epsilon_c}(\mathbf r_{ij}(T,S))
|D_{T,ij}(T,S)|
\delta_\eta(g_{ij}(T,S))\,dS.
$$

The event route consumes two joint integrals over reception and emission time:

$$
\mathbf I_{ij}^{(\eta,\epsilon_c)}
=
\int_{T_0}^{T_1}\mathbf A_{ij}^{(\eta,\epsilon_c)}(T)\,dT,
$$

$$
\mathbf M_{ij}^{(\eta,\epsilon_c)}
=
\int_{T_0}^{T_1}(T_1-T)
\mathbf A_{ij}^{(\eta,\epsilon_c)}(T)\,dT.
$$

The first is the finite velocity impulse. The second is its first reception-time
moment and is required to advance position without reconstructing an infinite
pointwise force. Both are evaluated on the same interval cells, retained-history
view, causal triangle, regulator values, and deterministic reduction order.

Claim grade: `derived`. The position moment follows by integrating
$\dot{\mathbf X}=\mathbf V$ once after integrating
$\dot{\mathbf V}=\mathbf A$. Falsifier: a direct interval integration of the
same finite-width acceleration that does not overlap the reported
$\mathbf M_{ij}^{(\eta,\epsilon_c)}$.

## Entry Predicate

An ordered pair enters the event set $\mathcal E$ only when all entry rows are
certified from the same attempted coupled candidate:

1. `FWC-ENTRY-01/history`: the complete reception/emission causal triangle is
   covered by accepted retained histories and the memory boundary is root-free;
2. `FWC-ENTRY-02/stratum`: the exact-pair certificate reports
   `caustic_route_required` with a source-normal enclosure containing zero,
   independent start/end complete scans certify an interior opposite-sign root
   pair birth/death $\Delta N_{ij}=\pm2$, $\Delta D_{ij}=0$, or a consumed
   sharp-root separation enclosure intersects the declared core-route radius
   $r\le\epsilon_c$;
3. `FWC-ENTRY-03/order`: the difficult cell is consistent with a finite-order
   isolated fold; a persistent zero normal, unresolved accumulation, cusp, or
   higher stratum is not admitted;
4. `FWC-ENTRY-04/core`: the finite-width core integrand is defined across the
   event window, including the bound zero-extension rule at coordinate
   coincidence;
5. `FWC-ENTRY-05/policy`: the request selected
   `sharp_with_finite_width_fallback` and records $\eta$, $\epsilon_c$, the
   refinement ratio, ladder length, tolerances, and resource ceilings.

A speed magnitude equal to $c_f$ cannot satisfy `FWC-ENTRY-02` by itself.
Receiver-normal silence $D_T=0$ also does not enter the route unless the
source-normal predicate independently passes.

Claim grade: `derived-design`. Falsifier: a route entry whose same-record root
certificate has neither a zero-containing $D_s$ enclosure, the certified
opposite-sign interior topology change, nor a separation enclosure intersecting
the declared core-route radius.

## Coupled Event Corrector

Let $\mathcal E_i$ be the routed sources for receiver $i$. Let
$\mathbf B_i(T)$ be the deterministic sum of all non-event ordered-pair
contributions. No pair may appear in both $\mathbf B_i$ and $\mathcal E_i$.
For one corrector iterate, use the certified endpoint background enclosures
$\mathbf B_{i,0}$ and $\mathbf B_{i,1}$ and update

$$
\mathbf V_{i,1}
=
\mathbf V_{i,0}
+\frac{h_T}{2}(\mathbf B_{i,0}+\mathbf B_{i,1})
+\sum_{j\in\mathcal E_i}\mathbf I_{ij}^{(\eta,\epsilon_c)},
$$

$$
\mathbf X_{i,1}
=
\mathbf X_{i,0}+h_T\mathbf V_{i,0}
+\frac{h_T^2}{6}(2\mathbf B_{i,0}+\mathbf B_{i,1})
+\sum_{j\in\mathcal E_i}\mathbf M_{ij}^{(\eta,\epsilon_c)}.
$$

The endpoint state defines a cubic Hermite candidate segment. All paths are
rebuilt from one immutable accepted input view, all event pairs are integrated
on that same candidate family, and no segment is appended before coupled
acceptance. Iterate until the endpoint position and velocity changes between
successive event candidates fit their declared correction budgets. The ordinary
full-step/two-half-step comparison remains the independent local-truncation
control around this event-aware substep.

Claim grade: `derived-design`. Falsifier: pair-accounting reconstruction finds
double counting or omission, or the recomputed endpoint from the emitted
$\mathbf B$, $\mathbf I$, and $\mathbf M$ rows does not enclose the published
endpoint.

## Regulator Refinement Ladder

For the causal-surface ladder, hold $\epsilon_c$ and every non-regulator input
fixed and evaluate

$$
\eta_\ell=\eta_0\rho^\ell,
\qquad 0<\rho<1,
\qquad \ell=0,\ldots,L-1,
\qquad L\ge3.
$$

Every level must independently certify $\mathbf I_{ij}^{(\eta_\ell,\epsilon_c)}$
and $\mathbf M_{ij}^{(\eta_\ell,\epsilon_c)}$. For interval vectors define the
componentwise enclosure distance

$$
d_\infty(\mathbf U,\mathbf W)
=
\max_k\max\left(
|\underline U_k-\overline W_k|,
|\overline U_k-\underline W_k|
\right).
$$

The causal-width series passes only when the maximum pairwise ladder distances
for both $\mathbf I$ and $\mathbf M$ do not exceed their declared convergence
budgets. If core proximity activates $\epsilon_c$, run the analogous
one-control-at-a-time $\epsilon_c$ ladder while holding $\eta$ fixed. A joint
hidden scaling of both regulators is prohibited because it cannot identify
which limit failed.

The accepted event update uses the declared base-width interval, not a fitted or
extrapolated value. The refinement ladder certifies stability of that declared
finite-width result; it does not silently replace the model input.

Claim grade: `derived-design`. Falsifier: any required level is uncertified, or
the recomputed maximum ladder distance exceeds its recorded budget.

## Outer Step Recovery

The Borg shadow request carries the controller triple
`initial_step`, `minimum_step`, and `maximum_step`, plus the Boolean
`use_adaptive_step_growth`. The Borg default is the nominal controller height
$h_0=0.1$, the existing floor $h_{\min}=10^{-4}$, and
$h_{\max}=\max(h_0,\Delta T_{\mathrm{chunk}})$. The actual attempted height is

$$
h_{\mathrm{try}}
=
\min\!\left(h_{\mathrm{controller}},T_1-T\right),
$$

so no atomic request can cross its chunk endpoint. With the current Borg chunk
length $\Delta T_{\mathrm{chunk}}=0.05$, the first attempted height is $0.05$
even though the nominal controller token is `0.1`.

A rejected step retains the existing fail-closed reduction rule. After an
accepted step, growth is allowed only after two consecutive accepted steps for
which every path's position and velocity local-error rows use at most one
eighth of their unchanged budgets. The controller then doubles the height,
capped by $h_{\max}$ and by the remaining chunk interval. Thus a difficult
encounter can reduce $h$ without converting that reduction into a permanent
smooth-phase cost. No tolerance, minimum-step floor, caustic predicate, or
publication rule changes.

Claim grade: `derived-design`. Falsifier: a Borg request omits either new
control, the EOM solver grows after a local-error row exceeds the one-eighth
gate, or an attempted step exceeds either `maximum_step` or the remaining
chunk interval.

## Exit Predicate

An event candidate returns to the sharp chart only when complete endpoint scans
certify all of the following:

1. every routed pair has a complete finite root set and root-free complement;
2. every admitted endpoint root has $|D_s|\ge\nu_s$ with nonzero signed grading;
3. the observed interior root-count change, if any, is an opposite-sign pair
   change with degree preserved;
4. no routed root touches the retained-memory boundary;
5. the finite-width event update and the sharp endpoint reconstruction share
   the same accepted endpoint history and overlap on their common domain.

If the endpoint remains inside a supported finite-width stratum, the controller
subdivides the event window and retries. If no subdivision above the declared
event floor obtains the exit predicate, the run halts with
`caustic_exit_not_certified`; it does not fall through to
`minimum_step_exhausted`.

Claim grade: `derived-design`. Falsifier: a published event segment whose
endpoint pair is still `caustic_route_required`, has an unsigned source-normal
grade, or lacks a complete complement certificate.

## Acceptance And Error-Budget Rows

Every attempted event emits these rows, including failures:

| Contract row | Quantity and required record | Pass condition | Named failure |
| --- | --- | --- | --- |
| `FWC-ENTRY-01` | history coverage and memory-boundary residual | boundary residual excludes zero | `caustic_history_coverage_failed` |
| `FWC-ENTRY-02` | entry source-normal enclosure or topology delta | certified fold predicate | `caustic_entry_not_certified` |
| `FWC-ENTRY-03` | stratum order and isolation | supported finite-order fold | `unsupported_caustic_or_singular_chart` |
| `FWC-QUAD-01` | $\mathbf I$ enclosure, cells, depth, precision, largest residual width | component widths within impulse budget | `caustic_impulse_not_certified` |
| `FWC-QUAD-02` | $\mathbf M$ enclosure, cells, depth, precision, largest residual width | component widths within position-moment budget | `caustic_position_moment_not_certified` |
| `FWC-REG-01` | $\eta$ levels and pairwise $d_\infty$ for $\mathbf I$ and $\mathbf M$ | complete ladder within both budgets | `caustic_eta_convergence_failed` |
| `FWC-REG-02` | $\epsilon_c$ levels when core-active | complete independent ladder within both budgets | `caustic_core_convergence_failed` |
| `FWC-STATE-01` | reconstructed endpoint versus emitted background/event rows | published endpoint enclosed | `caustic_state_reconstruction_failed` |
| `FWC-STATE-02` | successive event-corrector endpoint deltas | position and velocity correction budgets pass | `caustic_correction_failed` |
| `FWC-STEP-01` | full/two-half event-aware local error | position and velocity step budgets pass | `numeric_step_budget_exceeded` |
| `FWC-EXIT-01` | endpoint roots, signed $D_s$, degree, boundary clearance | sharp-chart exit passes | `caustic_exit_not_certified` |
| `FWC-ATOM-01` | input, candidate, and published history fingerprints | unchanged on failure; candidate on complete acceptance | `caustic_atomic_publication_failed` |

Each failed row records receiver/source identities, attempted window, regulator
level, precision route, achieved precision, enclosure or scalar residual,
declared tolerance, resource counts, and the nested numeric failure code. The
evolution-level halt is `caustic_transit_uncertified` with the first failed row
preserved; generic step-floor exhaustion is not an admissible adjudication once
`FWC-ENTRY-02` has passed.

## Independent Reference And Acceptance Evidence

The independent reference is the Decimal interval oracle in
`scripts/eom/oracle/phase4_acceptance.py`. It was authored separately from the
C++ engine and already integrates the same bound finite-width law over the
joint causal triangle. Before engine implementation, extend that reference to
certify the reception-time moment $\mathbf M$ and add an analytic constant-
acceleration moment control. Commit the reference change separately from the
engine change. Native agreement is evidence only when both $\mathbf I$ and
$\mathbf M$ overlap the independent reference and the analytic control passes.

Required acceptance evidence:

1. existing Python and Borg JavaScript suites pass;
2. a synthetic fold transits with certified $\mathbf I$, $\mathbf M$, sharp
   exit, and atomic publication, while each named resource/convergence negative
   fails closed;
3. the seed-0 Borg 3:3 reproduction reaches beyond its former first
   close-approach time or halts with `caustic_transit_uncertified` and a complete
   first-failed-row record;
4. the evidence packet reports wall time and the full $\eta$ ladder;
5. every reported claim carries its grade and an operator-checkable falsifier.

## Promotion Disposition

This packet is `priority-only` until the independent oracle, engine route, and
live reproduction pass. The finite-width equation itself is already promoted
and frozen in the Master EOM binding; no new reader-facing theory claim is made
here.
