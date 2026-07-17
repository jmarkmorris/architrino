# Finite-Width Close-Approach And Caustic Route

## Status

- Packet id: `eom_finite_width_close_approach_caustic_route/v0`
- Date opened: 2026-07-16
- Claim level: `derived-design`
- Implementation status: `adjudicated-native-route-implemented; demo-track-regulator-halt-accepted; certified-transit-open`
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

If repeated step reduction reaches `minimum_step` while the ordered-pair root
certificate remains incomplete, the engine has not earned either sharp-chart
continuation or finite-width entry. It halts as
`caustic_entry_uncertified`, names `FWC-ENTRY-02/stratum`, records the nested
root failure and achieved precision, and records the regulator level as
`not-evaluated`. This is an adjudicated entry failure, not a caustic claim.

Claim grade: `derived-design`. Falsifier: a route entry whose same-record root
certificate has neither a zero-containing $D_s$ enclosure, the certified
opposite-sign interior topology change, nor a separation enclosure intersecting
the declared core-route radius.

### Segment-Join Simple-Root Enclosure

A retained segment join with decimal token $b$ is represented by the outward
MPFR interval $[b^-,b^+]$. A simple root at that join must not fail merely
because the represented join width consumes a few units in the last place of
the root tolerance $\tau$. Let

$$
w_b=b^+-b^-<\tau,
\qquad
\rho=\operatorname{round}_{\downarrow}\!\left(
\frac{\tau-w_b}{2}
\right).
$$

The final join probe uses inward-rounded endpoints

$$
s_-=\operatorname{round}_{\uparrow}(b^- - \rho),
\qquad
s_+=\operatorname{round}_{\downarrow}(b^+ + \rho).
$$

It is admitted only when $s_-<b^-\le b^+<s_+$,
$s_+-s_-\le\tau$, the directed causal-residual enclosures at $s_-$ and $s_+$
have strict opposite signs, and the left/right source-normal enclosures have
one common strict sign. The intermediate-value theorem then proves existence,
and the strict source-normal sign proves uniqueness. If any condition fails,
the root remains `endpoint_root_not_surrounded` and entry remains fail-closed.

Claim grade: `derived`. Falsifier: directed recomputation finds a bracket wider
than $\tau$, a non-strict or equal residual sign, a zero-containing source
normal, or more than one root in the admitted join bracket.

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

### FWC-STATE-01 chart-matching obligation

`FWC-STATE-01` has two obligations that must be certified separately. First,
the event-aware state reconstruction above must enclose the candidate endpoint
component by component. A routed pair is absent from $\mathbf B_i$ and enters
the reconstruction exactly once through its certified $\mathbf I_{ij}$ and
$\mathbf M_{ij}$ rows.

Second, sharp/finite-width chart agreement is tested only on a declared common
domain $C_{ij}\subset[T_0,T_1]$ where the sharp roots and root-free complement
are complete, every admitted root has $|D_s|\ge\nu_s>0$, and the separation is
outside the core-active stratum. The restricted integrals must satisfy

$$
\mathbf I^{\sharp}_{ij}(C_{ij})
\cap
\mathbf I^{(\eta,\epsilon_c)}_{ij}(C_{ij})\ne\varnothing,
\qquad
\mathbf M^{\sharp}_{ij}(C_{ij})
\cap
\mathbf M^{(\eta,\epsilon_c)}_{ij}(C_{ij})\ne\varnothing
$$

component by component. The fold/core portion is not a common sharp-chart
domain and is supplied only by the finite-width rows.

An endpoint-linear shortcut is admissible on a common-domain interval of width
$h_C$ only with a certified component bound
$L_{2,k}\ge\sup_C|d^2A_k^{\sharp}/dT^2|$. Its outward remainder rows are

$$
R_{I,k}=\frac{h_C^3}{12}L_{2,k},
\qquad
R_{M,k}=\frac{h_C^4}{24}L_{2,k}.
$$

These constants follow by integrating the linear-interpolation remainder
$\tfrac12 L_{2,k}t(h_C-t)$, once without a weight and once with the
position-moment weight $h_C-t$. A raw full-window endpoint trapezoid is not a
certificate across a fold because no finite $L_{2,k}$ has been established
there.

Once an ordered pair enters the finite-width route, subdivision does not erase
the obligation. The pair remains pinned to every child event window until one
child passes the state reconstruction, common-domain chart agreement, and exit
rows, or the declared event floor produces an adjudicated halt. A sharp retry
with no finite-width row cannot certify passage of the rejected event.

Claim grade: `derived`. Falsifier: an independent integration of the emitted
background and event rows excludes the candidate endpoint; a claimed
common-domain cell contains $D_s=0$, incomplete roots, or the core stratum; an
endpoint shortcut exceeds either remainder; or a rejected event pair
disappears from a child retry before `FWC-STATE-01` and `FWC-EXIT-01` pass.

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

### Demo-track regulator disposition

The accepted state of the Borg demo-tolerance seed-0 track is its atomic
`FWC-REG-02` halt. The default candidate enters the route, exhausts the
200,000-cell ceiling at core-scale level $\epsilon_c=0.1$, and remains
unpublished. The declared `1e-7` impulse budget and the cell ceiling are not
changed to force passage.

The resource sweep in the seed-0 evidence record increased the core cell
ceiling fourfold while reducing the final impulse width only from
`1.95713e-7` to `1.82541e-7`, or `6.73%`. The retained-history track therefore
sets the active enclosure floor for this adjudication, and additional cell
spend is not an accepted remedy. This closes the prior choice “certify the
default $\epsilon_c=0.1$ level or retain its regulator halt” on the retain
branch.

Claim grade: `measured` for the sweep and `operator-decision` for retaining
the halt. Falsifier: a repeat on the same retained histories certifies
$\epsilon_c=0.1$ inside the unchanged `1e-7` and 200,000-cell budgets at a
bounded wall cost; that result would reopen this disposition.

Research-tolerance discrimination and any remaining `FWC-STATE-01` work are
owned by a follow-up finite-width-route thread. They are not prerequisites for
accepting the demo track's named fail-closed terminal state and are not part of
the far-field enclosure implementation.

## Core-Scale Quadrature Resource Closure

Core refinement does not relax either event error budget. For the softened
kernel

$$
K_a(\mathbf d)=\frac{d_a}{(\|\mathbf d\|^2+\epsilon_c^2)^{3/2}},
$$

the binary64 interval route intersects its direct natural interval extension
with the centered mean-value enclosure

$$
K_a(\mathbf D)
\subseteq
K_a(\mathbf m)+
\sum_b
\left(
\frac{\delta_{ab}}{Q^{3/2}}-
\frac{3D_aD_b}{Q^{5/2}}
\right)(D_b-m_b),
\qquad
Q=\|\mathbf D\|^2+\epsilon_c^2,
$$

where $\mathbf D$ is the displacement box and $\mathbf m$ is its componentwise
midpoint. The line-of-action unit vector uses the analogous centered
Jacobian enclosure wherever the separation interval excludes zero. The
receiver-normal factor and softened kernel are also enclosed as one
mean-value product, so their common displacement is not split into independent
interval variables.

For monotone emission cells, the two Gaussian CDF endpoints are evaluated as
one difference with a shared receiver-position and reception-time box. When
both endpoints lie in one retained source segment, their source displacement
reuses the segment certificate

$$
|e(S_2)-e(S_1)|
\le
\min(2\epsilon_x,\epsilon_v|S_2-S_1|).
$$

The best-first queue uses a reception-to-emission subdivision aspect target of
`16:1`, because the Gaussian is already integrated analytically along emission
time while receiver-state dependence remains interval-enclosed. Deterministic
reduction, declared depth, and the impulse and position-moment tolerances remain
unchanged.

If this tighter inclusion still misses the declared budget, a cell-ceiling
increase is admissible only after a measured sequence records enclosure width,
evaluated cells, and wall time and shows the requested level reaches the
existing tolerance. Exhaustion at any ceiling remains
`event_impulse_cell_limit_exhausted`; it never publishes the candidate.

Claim grade: `derived-design`. Falsifier: a mean-value/direct intersection is
empty, a synthetic-fold enclosure loses overlap with the independently
authored Decimal oracle, or a live level is called certified with an impulse
or position-moment component wider than its unchanged declared tolerance.

## Outer Step Recovery

The Borg shadow request carries the controller triple
`initial_step`, `minimum_step`, and `maximum_step`, plus the Boolean
`use_adaptive_step_growth`. The Borg default is the reachable controller
height $h_0=h_{\max}=0.05$, equal to the atomic chunk length, with the existing
floor $h_{\min}=10^{-4}$. The actual attempted height is

$$
h_{\mathrm{try}}
=
\min\!\left(h_{\mathrm{controller}},T_1-T\right),
$$

so no atomic request can cross its chunk endpoint. The declared default and
the effective first attempted height are therefore both $0.05$; no unreachable
`0.1` controller knob remains.

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
| `FWC-STATE-01` | event-aware endpoint reconstruction, common-domain chart overlap with any shortcut remainder, and pinned child-window coverage | endpoint enclosed and every routed pair discharged only by a passing state/exit row | `caustic_state_reconstruction_failed` |
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
