# EQ-01 And EQ-05 Root-Conservation Closure Packet

## Packet Metadata

- Kind: `priority`
- Status: `priority-only`
- Assigned IDs: `EQ-01`, `EQ-05`
- Claim level: `EQ-01` is native at the per-hit causal wake law; `EQ-05` remains an internal/candidate finite-window conservation packet until a symmetry-preserving action chart and residual calculation close on one retained branch.
- Source rows: [equation.md](equation.md) and [priorities.md](priorities.md)
- Edit boundary: this packet only. Do not update `equation.md` or `priorities.md` from this packet.

This packet ties the native causal wake equation to Noether-style conservation laws without promoting a new reader-facing claim. The central rule is same-root conservation: energy, momentum, and angular momentum may be scored only when their wake-history charges, event ledger, boundary flux, and residuals consume the same causal-root ledger, transmitter-side floors, memory convention, branch label, and Noether sea state as the acceleration calculation.

## Packet Attack Card

- Current score snapshot: `EQ-01` remains score `5`; `EQ-05` remains score `4`. This pass does not update [equation.md](equation.md).
- Closure driver: the native per-hit causal wake row can support finite-window conservation only when force, action, wake-history charge, event ledger, boundary flux, and residual rows use the same retained branch chart and causal-root signature.
- Exact first blocker: [finite-window-conservation-residual.mjs](../../../scripts/equation-mapping/finite-window-conservation-residual.mjs) blocks at `missing_accepted_branch_chart`; the attempt fixture has the residual grammar but no accepted branch chart, event, boundary, or wake-history rows.
- First implementation target for this packet: replace the priority-only conservation attempt with a durable retained branch-chart source object, then advance the same-root checksum and event-ledger rows under the checker. No score change follows until those rows are accepted from durable source evidence.
- Smallest accepted evidence object: one source-backed retained branch chart $\mathfrak B$ with certified active roots, inactive gaps, Jacobian floor, memory convention, endpoint convention, event ledger, boundary flux, wake-energy crosswalk, and same-root checksum rows.
- Smallest next artifact: one durable retained branch-chart source shell with active-root, Jacobian-floor, endpoint, event-ledger, and boundary-flux source paths that the finite-window conservation checker can reject or advance without changing scores.
- Runnable route: run the attempt and negative controls below; they must remain score-neutral until a source-backed retained branch chart exists.

```sh
node scripts/equation-mapping/finite-window-conservation-residual.mjs --input scripts/equation-mapping/finite-window-conservation-attempt.v1.json --summary --pretty
node scripts/equation-mapping/finite-window-conservation-residual.mjs --input scripts/equation-mapping/finite-window-conservation-root-signature-split-negative-control.v1.json --summary --pretty
node scripts/equation-mapping/finite-window-conservation-residual.mjs --input scripts/equation-mapping/finite-window-conservation-coordination-source-negative-control.v1.json --summary --pretty
node scripts/equation-mapping/finite-window-conservation-residual.mjs --input scripts/equation-mapping/finite-window-conservation-wake-crosswalk-split-negative-control.v1.json --summary --pretty --require-populated
node scripts/equation-mapping/finite-window-conservation-residual.mjs --input scripts/equation-mapping/finite-window-conservation-no-double-count-negative-control.v1.json --summary --pretty --require-populated
```

## Direct Geometry Layer

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Negative control required for advancement | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| Native causal wake acceleration (`EQ-01`) | Per-hit active-root record with transmitter/receiver identity, causal emission time, transmitter-side factor, polarity, distance, and retained Noether sea state. | Retained branch chart $\mathfrak B$ with accepted active-root set and transmitter-side floor records. | The acceleration calculation must share ordered-pair policy, active-root labels, memory depth, regularization, transmitter-side floor, endpoint convention, tail convention, branch label, and Noether sea state with every conservation consumer. | Root-signature split, missing branch chart, missing active roots, or observer-level acceleration fit that bypasses causal-root provenance. | Evidence-backed retained branch chart proving the active-root records and transmitter-side causal data for the selected finite window. |
| Same-root conservation checksum | $d_{\mathrm{root}}(\operatorname{RootSig}_X,\operatorname{RootSig}_Y)=0$ across acceleration, action, wake charge, event, boundary, and observer-export records. | Accepted `same_root_conservation_checksum` record under the same branch chart. | Acceleration, action, wake-energy, momentum, angular-momentum, event-ledger, and boundary records must share the same $\operatorname{RootSig}$ or explicitly report `ledger-rerun-required`. | `eq01-05.root_signature_split`, same-transmitter policy missing, or local active-root relabeling. | Accepted same-root checksum object comparing all conservation consumers against the acceleration root signature. |
| Finite-window energy, momentum, and angular-momentum charges (`EQ-05`) | $E_{\mathrm{ret}}$, $\mathbf P_{\mathrm{ret}}$, $\mathbf J_{\mathrm{ret}}$ from mechanical, wake, and declared Noether sea terms on one retained chart. | Accepted finite-window charge rows plus wake-history and Noether sea inclusion/exclusion declarations. | Mechanical, wake, Noether sea, branch chart, boundary, and event rows must agree on which terms are retained in $\Omega(t)$ and which leave through updates. | Double-counting Noether sea terms, wake-energy crosswalk split, and energy/momentum charges built from a separate potential. | Source-backed finite-window charge bundle with wake, mechanical, Noether sea, and exclusion rows all bound to $\mathfrak B$. |
| Event-ledger balance | $\mathcal L_{E\mathbf p\mathbf J}(\mathsf e)=0$ for branch transitions, radiation, reactions, support-boundary crossings, and medium updates. | Accepted event ledger record with transmitter branch, selected channels, outgoing assemblies, photon packets, medium updates, remnant states, and provenance records. | Event inputs $X$, channel set $I_{\mathsf e}$, outputs $Y_{\mathsf e}$, root signatures, path records, and remnant/medium updates must share one event identity. | Hidden sinks, unrecorded medium/remnant update, same-transmitter policy bypass, and an event record supported only by a priority packet. | Retained event object whose energy, momentum, angular momentum, polarity, architrino, path, medium, and remnant deltas close or report classified defects. |
| Flux-boundary balance | Boundary flux from causal-wake escapement, assembly crossings, retained medium exchange, endpoint leakage, and support-boundary updates. | Accepted boundary-flux row under the retained branch chart. | Boundary flux must consume the same support window, branch chart, active-root ledger, event rows, and retained Noether sea inclusion policy as the charge rows. | Boundary flux as an independent continuum reservoir, endpoint leakage hidden inside a fitted conservation residual, or support-window mismatch. | Source-backed boundary-flux row proving outgoing/incoming terms and endpoint leakage for the selected finite window. |
| Finite-window conservation residual | $\mathcal R_{01-05}^{\mathfrak B}(W)$ with normalized $\epsilon_E$, $\epsilon_P$, $\epsilon_J$, endpoint/cut leakage, event residuals, boundary residuals, and wake-energy crosswalk. | Accepted `finite_window_conservation_residual` row with accepted branch chart and all dependent rows. | The residual must use one branch chart, one root signature policy, one event ledger set, one boundary-flux row, and one wake-energy construction route or an explicit crosswalk residual. | `missing_accepted_branch_chart`, wake-energy route split, unclassified finite-window defect, and hidden retune between force and conservation rows. | One retained branch calculation where the checker advances past `missing_accepted_branch_chart` and reports all finite-window defects as Euler/force residual, endpoint leakage, event ledger, or boundary flux. |

## Root Law And Retained Window

For receiver $r$ and transmitter $t$, the native per-hit causal wake acceleration is

$$
\mathbf A_{r\leftarrow t}(T_r;T_t)
=
\kappa\,\sigma_{q_t q_r}
\frac{|q_t q_r|}{r^2}
W_{r\leftarrow t}^{\mathrm{acc}}(T_r;T_t)
\hat{\mathbf r}_t,
$$

with transmitter-side acceleration weight and separate signed root playback

$$
D_t=c_f-\mathbf V_t(T_t)\cdot\hat{\mathbf r}_t,
\qquad
D_r=c_f-\mathbf V_r(T_r)\cdot\hat{\mathbf r}_t,
\qquad
W_{r\leftarrow t}^{\mathrm{acc}}=\frac{c_f}{|D_t|},
\qquad
\frac{dT_t}{dT_r}=\frac{D_r}{D_t}.
$$

On a retained branch chart

$$
\mathfrak{B}
=
\left(
q,
W=[t_a,t_b],
\Omega,
h,
\eta,
\epsilon_c,
\mathcal{A}^{\mathfrak{B}},
\mathcal{I}^{\mathfrak{B}},
\mathcal{H}_{\partial W},
\mathcal{N}_{\mathrm{sea}}
\right),
$$

the active root set for one ordered transmitter/receiver pair is

$$
\mathcal{A}_{rt}^{\mathfrak{B}}(T_r;h)
=
\left\{
\alpha:
0<\eta_{rt,\alpha}(T_r)\le h,\,
G_{rt}(T_r,\eta_{rt,\alpha})=0,\,
|D_{t,rt,\alpha}(T_r)|\ge D_{t,0}
\right\}.
$$

The acceleration used by every downstream equation is therefore the retained-branch sum

$$
\mathbf A_r^{\mathfrak{B}}(T_r)
=
\sum_t
\sum_{\alpha\in\mathcal{A}_{rt}^{\mathfrak{B}}(T_r;h)}
\kappa\,\sigma_{q_t q_r}
|q_t q_r|
\frac{W_{r\leftarrow t,\alpha}^{\mathrm{acc}}}
{r_{rt,\alpha}^{2}}
\hat{\mathbf r}_{t,\alpha}.
$$

This calculation is native only when the same retained active-root ledger carries $D_t$, $D_r$, $W^{\mathrm{acc}}$, and $D_r/D_t$ for each branch, with playback kept separate from acceleration strength. The open conservation burden is to derive energy, momentum, angular momentum, wake, event, and boundary records from that same retained state rather than from a separate fitted potential or observer-level field.

## Same-Root Conservation Contract

For any consumer row $X$ in the packet, let

$$
\operatorname{RootSig}_X(\mathfrak{B})
=
\left(
\Pi_X,
\mathcal{A}_X,
\mathcal{I}_X,
h_X,
\eta_X,
\epsilon_{c,X},
J_{0,X},
\operatorname{owner}_X,
\operatorname{tail}_X,
\mathcal{N}_{\mathrm{sea},X}
\right)
$$

be the ordered-pair policy, active root labels, inactive-gap cover, memory depth, regularization, Jacobian floor, owner convention, tail convention, and retained Noether sea state used by row $X$. The reusable same-root equation is

$$
\mathcal{R}_{\mathrm{same}}(X,Y;\mathfrak{B})
=
d_{\mathrm{root}}
\left(
\operatorname{RootSig}_X(\mathfrak{B}),
\operatorname{RootSig}_Y(\mathfrak{B})
\right),
$$

with pass condition

$$
\mathcal{R}_{\mathrm{same}}(X,Y;\mathfrak{B})=0.
$$

Here $d_{\mathrm{root}}=0$ only when the two records share the same ordered transmitter-pair policy, active root labels, inactive-root gaps, finite memory convention, transmitter-side floor, acceleration weights, playback convention, endpoint convention, tail treatment, branch label, and Noether sea state. If the acceleration, action, wake-history charge, event ledger, or observer export uses a different signature, the downstream result must return `ledger-rerun-required`.

Same-transmitter self-hit records are not compressed into the cross-site all-pairs ledger. When a retained branch needs self-hit roots, it must attach an explicit same-transmitter policy

$$
\operatorname{SelfRootSig}_{i}(\mathfrak{B})
=
\left(
\mathcal{A}_{ii}^{\mathrm{self}},
\mathcal{I}_{ii}^{\mathrm{self}},
h_{ii}^{\mathrm{self}},
D_{t,0,ii}^{\mathrm{self}},
W_{ii}^{\mathrm{acc,self}},
\mathrm{trivial\ diagonal\ exclusion},
\mathrm{core\ cutoff}
\right)
$$

and then include that signature in $\operatorname{RootSig}_X$. A same-transmitter record can support self-hit energy and angular momentum only if it preserves the nontrivial self-root convention and does not rewrite the cross-site ordered-pair ledger.

## Conservation Charges On One Retained Chart

Let the retained finite-window charge vector be

$$
\mathcal{Q}_{\mathrm{ret}}^{\mathfrak{B}}(t)
=
\left(
E_{\mathrm{ret}}^{\mathfrak{B}},
\mathbf{P}_{\mathrm{ret}}^{\mathfrak{B}},
\mathbf{J}_{\mathrm{ret}}^{\mathfrak{B}}
\right)(t),
$$

with

$$
E_{\mathrm{ret}}^{\mathfrak{B}}
=
K_{\mu}^{\mathfrak{B}}
+E_{\mathrm{wake}}^{\mathfrak{B}}
+E_{\mathrm{sea},\Omega}^{\mathfrak{B}},
$$

$$
\mathbf{P}_{\mathrm{ret}}^{\mathfrak{B}}
=
\mathbf{P}_{\mathrm{mech}}^{\mathfrak{B}}
+\mathbf{P}_{\mathrm{wake}}^{\mathfrak{B}}
+\mathbf{P}_{\mathrm{sea},\Omega}^{\mathfrak{B}},
$$

and

$$
\mathbf{J}_{\mathrm{ret}}^{\mathfrak{B}}
=
\mathbf{J}_{\mathrm{mech}}^{\mathfrak{B}}
+\mathbf{J}_{\mathrm{wake}}^{\mathfrak{B}}
+\mathbf{J}_{\mathrm{sea},\Omega}^{\mathfrak{B}}.
$$

The Noether sea terms are present only when the retained window explicitly includes Noether sea degrees of freedom. If the Noether sea is represented instead as an outgoing event channel or a boundary update, those entries must not also be counted in $\mathcal{Q}_{\mathrm{ret}}^{\mathfrak{B}}$.

For a symmetry-preserving action chart, the same action kernel must supply both the acceleration row and the wake-history charges:

$$
\operatorname{RootSig}_{\mathrm{force}}
=
\operatorname{RootSig}_{E_{\mathrm{wake}}}
=
\operatorname{RootSig}_{\mathbf{P}_{\mathrm{wake}}}
=
\operatorname{RootSig}_{\mathbf{J}_{\mathrm{wake}}}.
$$

For a working regularized model, the same equations are diagnostics until the variation residual, endpoint leakage, and conservation residuals close.

## Event-Ledger Equation

For any discrete branch transition, radiation event, recoil, reaction, measurement record, support-boundary crossing, or Noether sea update inside $W$, use the shared event record

$$
\mathsf e
=
\left(
X,
I_{\mathsf e},
Y_{\mathsf e}
\right),
$$

where $X$ contains the source branch, causal-wake ledger, active roots, branch Jacobians, local Noether sea state, and sector-local variables; $I_{\mathsf e}$ is the finite selected channel set; and $Y_{\mathsf e}$ names outgoing assemblies, photon packets, recoil targets, medium updates, remnant states, and provenance records.

The reusable event-ledger equation is

$$
\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)
=
\left(
\Delta_E,
\Delta_{\mathbf p},
\Delta_{\mathbf J},
\Delta_{\mathrm{pol}},
\Delta_{\mathrm{arch}},
\Delta_{\mathrm{path}},
\Delta_{\mathrm{med}},
\Delta_{\mathrm{rem}}
\right)(\mathsf e)
=
\mathbf{0}.
$$

The first three rows are

$$
\Delta_E
=
\sum_{\alpha\in\mathcal{I}_{\mathrm{in}}}E_\alpha
-
\sum_{\beta\in\mathcal{I}_{\mathrm{out}}}E_\beta
-
\Delta E_{\mathrm{upd}},
$$

$$
\Delta_{\mathbf p}
=
\sum_{\alpha\in\mathcal{I}_{\mathrm{in}}}\mathbf p_\alpha
-
\sum_{\beta\in\mathcal{I}_{\mathrm{out}}}\mathbf p_\beta
-
\Delta\mathbf p_{\mathrm{upd}},
$$

and

$$
\Delta_{\mathbf J}
=
\sum_{\alpha\in\mathcal{I}_{\mathrm{in}}}\mathbf J_\alpha
-
\sum_{\beta\in\mathcal{I}_{\mathrm{out}}}\mathbf J_\beta
-
\Delta\mathbf J_{\mathrm{upd}}.
$$

The update terms are not hidden sinks. They are allowed only when the recorded branch update, Noether sea update, support-boundary update, or remnant update is computed from the same $X$ and appears in $Y_{\mathsf e}$. The path record must include transmitter identity, emission time, active causal-root branch, branch-Jacobian provenance, and any same-transmitter or fold-layer convention used by the event.

## Flux-Boundary Equation

For a finite spatial window $\Omega(t)$, wake history that exits the retained window is not lost energy or momentum. It is boundary flux. For charge row $Q\in\{E,\mathbf P,\mathbf J\}$, define

$$
\Phi_{Q,\partial\Omega}^{\mathfrak{B}}(W)
=
\int_W
\int_{\partial\Omega(t)}
\mathbf{J}_{Q}^{\mathfrak{B}}(t,\mathbf x)
\cdot\hat{\mathbf n}\,dA\,dt.
$$

The reusable flux-boundary equation is

$$
\Delta_W Q_{\mathrm{ret}}^{\mathfrak{B}}
+
\Phi_{Q,\partial\Omega}^{\mathfrak{B}}(W)
-
Q_{\mathrm{ext}}^{\mathfrak{B}}(W)
-
Q_{\mathrm{event}}^{\mathfrak{B}}(W)
=
R_{Q,W}^{\mathfrak{B}}.
$$

Here $Q_{\mathrm{ext}}$ is declared external work, impulse, or torque through non-isolated boundary conditions. $Q_{\mathrm{event}}$ is the sum of discrete in-window event updates already tested by $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$. For isolated branch charts with closed event ledgers and no external drive, the residual should converge to zero as the branch chart, regularization, and retained memory are refined.

The boundary flux must be computed from causal-wake escapement, assembly crossings, and retained medium exchange. It is not a separate continuum field ontology. It is the finite-window projection of path-history terms not retained inside $\Omega(t)$.

## Conservation-Residual Equation

Collect the finite-window residuals into

$$
\mathcal{R}_{01-05}^{\mathfrak{B}}(W)
=
\left(
\mathcal{R}_{\mathrm{same}},
\epsilon_E^{\mathfrak{B}},
\epsilon_P^{\mathfrak{B}},
\epsilon_J^{\mathfrak{B}},
\epsilon_{\mathrm{event}}^{\mathfrak{B}},
\epsilon_{\partial\Omega}^{\mathfrak{B}},
\epsilon_{\mathrm{cross}}^{\mathfrak{B}}
\right).
$$

The normalized conservation residuals are

$$
\epsilon_E^{\mathfrak{B}}
=
\frac{|R_{E,W}^{\mathfrak{B}}|}
{|\Delta_W E_{\mathrm{ret}}^{\mathfrak{B}}|
+|\Phi_{E,\partial\Omega}^{\mathfrak{B}}|
+|E_{\mathrm{ext}}^{\mathfrak{B}}|
+|E_{\mathrm{event}}^{\mathfrak{B}}|
+\varepsilon_E},
$$

$$
\epsilon_P^{\mathfrak{B}}
=
\frac{\|R_{\mathbf P,W}^{\mathfrak{B}}\|}
{\|\Delta_W \mathbf{P}_{\mathrm{ret}}^{\mathfrak{B}}\|
+\|\Phi_{\mathbf P,\partial\Omega}^{\mathfrak{B}}\|
+\|\mathbf{P}_{\mathrm{ext}}^{\mathfrak{B}}\|
+\|\mathbf{P}_{\mathrm{event}}^{\mathfrak{B}}\|
+\varepsilon_P},
$$

and

$$
\epsilon_J^{\mathfrak{B}}
=
\frac{\|R_{\mathbf J,W}^{\mathfrak{B}}\|}
{\|\Delta_W \mathbf{J}_{\mathrm{ret}}^{\mathfrak{B}}\|
+\|\Phi_{\mathbf J,\partial\Omega}^{\mathfrak{B}}\|
+\|\mathbf{J}_{\mathrm{ext}}^{\mathfrak{B}}\|
+\|\mathbf{J}_{\mathrm{event}}^{\mathfrak{B}}\|
+\varepsilon_J}.
$$

The event residual is

$$
\epsilon_{\mathrm{event}}^{\mathfrak{B}}
=
\max_{\mathsf e\in W}
\left\|
\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)
\right\|,
$$

and the crosswalk residual $\epsilon_{\mathrm{cross}}^{\mathfrak{B}}$ compares any simultaneously used wake-energy construction routes: action-boundary charge, work-integral reconstruction, and boundary-flux reconstruction. A conservation claim fails if these routes are used as independent reservoirs for the same near-field or Noether sea content.

The theorem target is:

> For a retained branch chart $\mathfrak{B}$ whose per-hit force row is native, whose action regularization is symmetry-preserving, and whose event and boundary rows use the same root signature, $\mathcal{R}_{01-05}^{\mathfrak{B}}(W)\to0$ under the declared refinement limit for every isolated finite window $W$ before any energy, momentum, angular-momentum, mass-shell, photon, metric, or thermodynamic row is treated as more than a diagnostic map.

## Relationship To Other Equation Rows

| Consumer row | How it consumes this packet | Failure if EQ-01/EQ-05 is bypassed |
| --- | --- | --- |
| `EQ-02` and `EQ-03` | Moving-clock, moving-ruler, and oblate spheroidal envelope rows must use the same retained root ledger as momentum and angular-momentum transport. | Lorentz-looking geometry becomes a separate kinematic fit. |
| `EQ-04` | Mass-shell and rest-energy rows need $E_{\mathrm{ret}}$, $\mathbf P_{\mathrm{ret}}$, and $\mathbf J_{\mathrm{ret}}$ from the same branch that supplies $M_0$, $\zeta(A)$, and $\mathcal M_{\mathrm{sea}}^{ab}$. | Energy-momentum closure hides wake, recoil, or Noether sea exchange. |
| `EQ-06`, `EQ-24`, and `EQ-25` | Noether sea continuity, medium response, and thermodynamics use the same event, flux-boundary, and entropy/thermalization rows. | Continuum or statistical equations absorb unbalanced finite-window defects. |
| `EQ-07` through `EQ-11` | Effective metric and weak-gravity rows require stress, lapse, drift, signal, and curvature readouts to share the conservation source record. | Effective geometry receives stress-energy without branch provenance. |
| `EQ-12` through `EQ-16A` | Photon, Maxwell, Born-current, spinor, gauge, and neutrino rows must close event ledgers before field or sector equations are promoted. | Effective field equations replace source-path-receiver accounting. |
| `EQ-17` through `EQ-20` | Redshift, effective cosmology, Friedmann-like bookkeeping, and dark-energy rows need boundary flux and Noether sea exchange as one finite-window record. | Cosmology terms become fitted reservoirs rather than path-history transfer rows. |
| `EQ-21` through `EQ-23` and `EQ-32` | Growth, CMB, BBN, and low-acceleration galaxy rows need the same Noether sea state and finite-window event/flux ledger. | Observation fits split the medium state across incompatible records. |
| `EQ-26` through `EQ-31` | Atomic, recoil, radiation, scattering, and resonance rows are event-ledger consumers. | Precision benchmarks close only by omitted recoil, remnant, medium, or path-history terms. |

## Common Sub-Equation Candidates

These candidates are reusable enough to become independent equation rows or named residuals if they are populated by an accepted branch calculation:

| Candidate name | Equation object | Primary consumers | Status |
| --- | --- | --- | --- |
| `same_root_conservation_checksum` | $\mathcal{R}_{\mathrm{same}}(X,Y;\mathfrak{B})=0$ | Every equation row that claims common branch provenance. | Internal/candidate; native root data exist, but no all-row checksum is executed. |
| `event_ledger_balance_equation` | $\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)=\mathbf 0$ | Photon, reaction, radiation, measurement, recoil, resonance, and branch-transition rows. | Already established as priority grammar; needs sector instantiations. |
| `flux_boundary_balance_equation` | $\Delta_W Q_{\mathrm{ret}}+\Phi_{Q,\partial\Omega}-Q_{\mathrm{ext}}-Q_{\mathrm{event}}=R_{Q,W}$ | Noether sea transport, thermodynamics, cosmology, entropy, and finite detector windows. | Internal/candidate; energy version has native support, vector rows need worked examples. |
| `finite_window_conservation_residual` | $\mathcal{R}_{01-05}^{\mathfrak{B}}(W)$ with $(\epsilon_E,\epsilon_P,\epsilon_J)$ | Mass-shell, Lorentz, effective metric, photon, and precision rows. | Executable attempt exists in [finite-window-conservation-residual.mjs](../../../scripts/equation-mapping/finite-window-conservation-residual.mjs); current fixture blocks at `missing_accepted_branch_chart`. |
| `same_transmitter_self_hit_policy` | $\operatorname{SelfRootSig}_{i}(\mathfrak{B})$ attached to $\operatorname{RootSig}_X$ | Self-hit energy, angular momentum, photon branch maintenance, and nested shell braid transitions. | Internal/candidate; prevents same-transmitter records from being hidden inside cross-site ledgers. |
| `wake_energy_crosswalk_residual` | $\epsilon_{\mathrm{cross}}^{\mathfrak{B}}$ comparing action-boundary, work-integral, and boundary-flux routes. | Delay-energy, effective Lagrangian, thermodynamics, and no-runaway claims. | Internal/candidate; required when more than one wake-energy construction is invoked. |
| `ledger_transition_gauge_matching` | Equality of pre/post branch energy gauges plus declared $\Delta_{\mathrm{ledger}}$ at root changes. | Action quantization, nested shell braid energy routing, and branch-transition packets. | Internal/candidate; strong local use in energy bookkeeping, no general theorem yet. |

## 2026-06-23 Maturity Assessment

This table restates the dated ledger assessment for packet alignment. It is not
retained evidence and has no score authority; current scores are owned by
[equation.md](equation.md).

| ID | Recorded `6/23` assessment | Reason |
| --- | --- | --- |
| `EQ-01` | `5` | The per-hit causal wake law and causal-root Jacobian are native substrate equations. The maintenance burden is dependency discipline, not a mapping proof. |
| `EQ-05` | `4` | The finite-window conservation grammar, same-root checksum, event ledger, boundary-flux row, and wake-energy crosswalk are explicit. The row remains below `5` until $\mathcal{R}_{01-05}^{\mathfrak{B}}(W)$ is populated on a retained branch with event, boundary, and wake-history rows closed. |

## First Mathematical Object To Add Next

The executable shape now exists in [finite-window-conservation-attempt.v1.json](../../../scripts/equation-mapping/finite-window-conservation-attempt.v1.json). The next mathematical object is the first accepted instantiation of `finite_window_conservation_residual` on the smallest branch where all required rows are available:

$$
\mathcal{R}_{01-05}^{\mathfrak{B}}(W)
=
\left(
\mathcal{R}_{\mathrm{same}},
\epsilon_E,
\epsilon_P,
\epsilon_J,
\epsilon_{\mathrm{event}},
\epsilon_{\partial\Omega},
\epsilon_{\mathrm{cross}}
\right)
$$

for a two-body or reduced neutral-braid branch chart with declared $h$, $\eta$, $\epsilon_c$, active roots, inactive gaps, transmitter-side floor, acceleration weights, separate playback, and endpoint convention. The calculation should output:

- the force row from the native per-hit causal wake law;
- the wake-history charge route used for $E_{\mathrm{wake}}$, $\mathbf P_{\mathrm{wake}}$, and $\mathbf J_{\mathrm{wake}}$;
- the event ledger for any root transition, recoil, remnant, support-boundary crossing, or medium update;
- boundary flux through $\partial\Omega$ or an explicit isolated-window proof that the flux is absent;
- the same-root checksum between force, wake charge, event, and boundary rows.

The first proof step is not to prove all conservation laws globally. It is to show that every nonzero finite-window defect is classified as one of four objects on the same branch: Euler/force residual, endpoint or period-cut leakage, event-ledger row, or boundary flux.

## Failure Modes

| Failure code | Meaning |
| --- | --- |
| `eq01-05.root_signature_split` | Force, action, wake charge, event, or boundary rows use different active-root labels, memory depth, regularization, Jacobian floor, endpoint convention, or Noether sea state. |
| `eq01-05.wake_charge_placeholder` | $E_{\mathrm{wake}}$, $\mathbf P_{\mathrm{wake}}$, or $\mathbf J_{\mathrm{wake}}$ is named but not constructed from the causal-history law and branch convention that generated the force row. |
| `eq01-05.event_sink_hidden` | Recoil, remnant, medium update, radiation, support-boundary, or branch transition is used as an untracked loss term instead of a row in $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$. |
| `eq01-05.boundary_flux_hidden` | Wake escapement or assembly/medium crossing leaves $\Omega$ without appearing in $\Phi_{Q,\partial\Omega}$. |
| `eq01-05.no_double_count_failed` | The same near-field, wake, or Noether sea exchange is counted both in a retained charge and in an event or boundary channel. |
| `eq01-05.same_transmitter_policy_missing` | A self-hit contribution is used for energy or angular momentum without a declared same-transmitter root policy and trivial-diagonal exclusion. |
| `eq01-05.action_symmetry_overreach` | A regularized equation-of-motion diagnostic is described as an exact Noether charge before the action regularization, variation residual, and endpoint leakage rows close. |

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

`EQ-01` is already native as the causal wake law and causal-root Jacobian. The new material in this packet is not a completed derivation of `EQ-05`; it is a same-root conservation residual grammar. Candidate promotion targets, after a worked residual closes, are:

- `content/markdown/aaa/dynamics/master-equation.md`
- `content/markdown/aaa/dynamics/effective-lagrangian.md`
- `content/markdown/aaa/dynamics/energy.md`
- `content/markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md`
- `content/markdown/aaa/validation/reaction-ledger.md`
- `content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md`

Promotion should wait until one retained branch calculation demonstrates the same-root checksum, finite-window energy/momentum/angular-momentum residuals, event ledger, boundary flux, and wake-energy crosswalk on the same branch chart.

## Worker Handoff

- Completed now: one priority-only packet tying the native per-hit causal wake equation to finite-window Noether conservation residuals.
- Executable now: [finite-window-conservation-residual.mjs](../../../scripts/equation-mapping/finite-window-conservation-residual.mjs) evaluates the residual grammar and reports first blockers.
- Runnable now:

```sh
node scripts/equation-mapping/finite-window-conservation-residual.mjs --input scripts/equation-mapping/finite-window-conservation-attempt.v1.json --summary --pretty
node scripts/equation-mapping/finite-window-conservation-residual.mjs --input scripts/equation-mapping/finite-window-conservation-wake-crosswalk-split-negative-control.v1.json --summary --pretty --require-populated
node scripts/equation-mapping/finite-window-conservation-residual.mjs --input scripts/equation-mapping/finite-window-conservation-no-double-count-negative-control.v1.json --summary --pretty --require-populated
```

- Reusable common equations named now: same-root checksum, event-ledger balance, flux-boundary balance, finite-window conservation residual, same-transmitter self-hit policy, wake-energy crosswalk residual, and ledger-transition gauge matching.
- Open blocker: no accepted branch calculation currently populates $\mathcal{R}_{01-05}^{\mathfrak{B}}(W)$ with source-backed event, boundary, and wake-history rows.
- Next mathematical object: replace the attempt fixture with an accepted branch chart carrying certified active roots and a declared action or work-integral route.
