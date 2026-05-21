# Support-Complete $M=3$ Master Retention Theorem

Promotion status: `priority-only`. This packet states the master certificate that would make the exact-antipodal $M=3$ same-level tri-binary branch mathematically retained. It integrates the tail, root-sheet, dynamics/action, Krawczyk, finite-mode convergence, Noether/event, and stability handoffs into one theorem target.

It does not claim that the branch is retained. It defines the exact row-level meaning of a retained exact-antipodal $M=3$ branch and the first-failure precedence for the present solve route.

---

## 1. Master Certificate

An exact-antipodal $M=3$ retained-branch certificate is the tuple

$$
\mathfrak{R}_{M3}(B)
=
\left(
\mathsf{Geom},
\mathsf{Tail},
\mathsf{Root},
\mathsf{Sheet},
\mathsf{Dyn},
\mathsf{Action},
\mathsf{Kraw},
\mathsf{Limit},
\mathsf{Noether},
\mathsf{Event},
\mathsf{Stability},
\mathsf{Inventory},
\mathsf{Ledger},
\mathsf{Status}
\right).
$$

The rows mean:

| Row | Required packet |
| --- | --- |
| $\mathsf{Geom}$ | exact-antipodal arclength-inverse equal-period geometry, center gauge, support band, noncollision floor |
| $\mathsf{Tail}$ | support-tail exclusion or root-sheet assimilation from the $M=3$ tail packets, with executable margins and $E_{\mathrm{tail}}$ from [support-complete-m3-tail-execution-ledger.md](support-complete-m3-tail-execution-ledger.md) |
| $\mathsf{Root}$ | support-complete root ledger, brackets, excluded gaps, Jacobian floors, source-pair policy |
| $\mathsf{Sheet}$ | root-sheet derivatives and derivative-Lipschitz envelopes if tail roots are assimilated |
| $\mathsf{Dyn}$ | support-complete tangential and curvature residual closure |
| $\mathsf{Action}$ | $\Gamma_B$, virtual-work curl, scalar/tensor inertia, and fit/action compatibility |
| $\mathsf{Kraw}$ | range Krawczyk, cokernel audit, proof budget, obstruction separation, and post-tail normalized score from [support-complete-m3-post-tail-proof-budget.md](support-complete-m3-post-tail-proof-budget.md) |
| $\mathsf{Limit}$ | finite-mode convergence to a curve-level dynamics/action candidate |
| $\mathsf{Noether}$ | total action, generator currents, conservation bounds |
| $\mathsf{Event}$ | inventory, source provenance, endpoint, boundary, recoil, and Noether-Sea exchange rows |
| $\mathsf{Stability}$ | root-dependent monodromy, neutral quotient, conservative/exchange classification, nonlinear recovery |
| $\mathsf{Inventory}$ | $N_+$, $N_-$, $Q$, central-inventory status, architrino labels |
| $\mathsf{Ledger}$ | one shared root, memory, source-pair, endpoint, action, event, and weighting convention |
| $\mathsf{Status}$ | one primary decision status |

The certificate is retained only if all rows use the same ledger. Any row computed on a different ledger exits with

$$
\texttt{ledger-convention-mismatch}.
$$

---

## 2. Master Residual Vector

On one frozen ledger define the master residual

$$
\mathcal{R}_{M3}^{\mathrm{master}}
=
\left(
\mathcal{R}_{\mathrm{geom}},
\mathcal{R}_{\mathrm{tail}},
\mathcal{R}_{\mathrm{root}},
\mathcal{R}_{\mathrm{sheet}},
\mathcal{R}_{T},
\mathcal{R}_{K},
\mathcal{R}_{\gamma},
\mathcal{R}_{\mathrm{curl}},
\mathcal{R}_{\mathrm{iso}},
\mathcal{R}_{\mathrm{kraw}},
\mathcal{R}_{\mathrm{lim}},
\mathcal{R}_{E},
\mathcal{R}_{\mathbf{p}},
\mathcal{R}_{\mathbf{J}},
\mathcal{R}_{Q},
\mathcal{R}_{\mathrm{src}},
\mathcal{R}_{\mathrm{stab}},
\mathcal{R}_{\mathrm{inv}}
\right).
$$

The core dynamics rows are

$$
\mathcal{R}_{T}
=
\mathbf{T}\cdot\widetilde{\mathbf{F}}^{+},
\qquad
\mathcal{R}_{K}
=
\mathbf{K}
-
\Gamma_B
P^\perp\widetilde{\mathbf{F}}^{+},
$$

and

$$
\mathcal{R}_{\gamma}
=
\gamma-\Gamma_B.
$$

The action row uses

$$
\Gamma_B
=
\frac{E_\epsilon(R_*)}{m_{\mathrm{car}}c_f^2},
$$

or an explicitly tensorial inertia replacement. The curl row is

$$
\mathcal{R}_{\mathrm{curl}}
=
\frac{\|\mathcal{C}^{+}\|_{\mathrm{F}}}
{1+\|W^{+}\|_{\mathrm{F}}},
$$

where the plus sign means the support-complete ledger after tail exclusion or tail-root-sheet assimilation.

The event rows are

$$
\mathcal{R}_{\mathrm{event}}
=
\left(
\mathcal{R}_{E},
\mathcal{R}_{\mathbf{p}},
\mathcal{R}_{\mathbf{J}},
\mathcal{R}_{Q},
\mathcal{R}_{\mathrm{src}}
\right).
$$

The stability row is not a scalar contraction test by default. It is the first passing classification among conservative elliptic, conservative orbital, or admitted exchange-attractor rows, after neutral reduction and nonlinear recovery.

---

## 3. Normalized Master Inequality

Let the row tolerances be collected as

$$
\tau_{M3}
=
\left(
\tau_{\mathrm{geom}},
\tau_{\mathrm{tail}},
\tau_{\mathrm{root}},
\tau_{\mathrm{sheet}},
\tau_T,
\tau_K,
\tau_\gamma,
\tau_{\mathrm{curl}},
\tau_{\mathrm{iso}},
\tau_{\mathrm{kraw}},
\tau_{\mathrm{lim}},
\tau_E,
\tau_{\mathbf{p}},
\tau_{\mathbf{J}},
\tau_Q,
\tau_{\mathrm{src}},
\tau_{\mathrm{stab}},
\tau_{\mathrm{inv}}
\right).
$$

Define the normalized master error

$$
\mathfrak{E}_{M3}(B)
=
\max_r
\frac{
\|\mathcal{R}_{M3,r}^{\mathrm{master}}\|
+
\epsilon_{r}^{\mathrm{cert}}
}{
\tau_{M3,r}
},
$$

where $\epsilon_r^{\mathrm{cert}}$ includes the certified tail, root, sheet, mesh, projector, aliasing, action, endpoint, Noether-Sea, and nonlinear-recovery error terms relevant to row $r$.

The exact-antipodal $M=3$ branch is a retained same-level branch candidate only if

$$
\mathfrak{E}_{M3}(B)\le1
$$

and all floor margins are positive:

$$
d_{\min}>d_0,
\qquad
\eta_{\min}>\eta_0,
\qquad
J_{\min}>J_0,
\qquad
\gamma_{\mathrm{gap}}>\gamma_0,
\qquad
s_{\min}>s_0,
\qquad
r_{\max}<r_0.
$$

This single inequality is only meaningful after every row has emitted its certified error envelope. If a row is missing, the corresponding $\epsilon_r^{\mathrm{cert}}$ is undefined and the master status is the first missing-row status, not a failed retained branch.

For the current exact-antipodal route, the computable version of the master error can be written as

$$
\mathfrak{E}_{M3}^{\mathrm{EA}}
=
\max
\left\{
E_{\mathrm{tail}},
E_{\mathrm{sheet}},
E_{\mathrm{root}},
Z,
\frac{Y+Z\rho}{\rho},
\frac{
\epsilon_C+\epsilon_{\mathrm{disc}}+\epsilon_{\mathrm{root}}+\epsilon_{\Gamma}
}{
\tau_{\mathrm{dyn}}
},
\frac{
\|\mathcal{C}^{+}\|_{\mathrm{F}}
}{
\epsilon_{\mathrm{curl}}(1+\|W^{+}\|_{\mathrm{F}})
},
\frac{R_{\mathrm{iso}}^{+}}{\epsilon_{\mathrm{iso}}},
\frac{
A_0\,\operatorname{dist}(\Gamma_B,I_{\Gamma})
}{
\tau_K+\tau_M
},
E_{\mathrm{conv}},
E_{\mathrm{Noeth}},
\frac{
\|\mathcal{R}_{\mathrm{event}}^{M3}\|_{\mathcal{E}_{\mathrm{event}}}
}{
\tau_{\mathrm{event}}
},
E_{\mathrm{stab}}
\right\}.
$$

Here $E_{\mathrm{tail}}$ is the coefficient-box-persistent execution-ledger error on $T_{\mathrm{tail}}$; a pointwise-only tail certificate is not eligible for this master inequality. $Z$ and $(Y+Z\rho)/\rho$ are the Krawczyk range terms; $\epsilon_C$ is the cokernel audit; $I_{\Gamma}$ is the fitted-scale compatibility interval; $E_{\mathrm{conv}}$ is the finite-mode convergence score; $E_{\mathrm{Noeth}}$ is the largest normalized Noether-current residual; and $E_{\mathrm{stab}}$ is the normalized first-failure score from the stability handoff. Retention requires

$$
\operatorname{SameLedger}(\mathfrak{R}_{M3})
\quad\text{and}\quad
\mathfrak{E}_{M3}^{\mathrm{EA}}\le1,
$$

with

$$
\mathsf{Stability}
\in
\{
\texttt{m3-conservative-elliptic-candidate},
\texttt{m3-conservative-orbital-stable-candidate},
\texttt{m3-dissipative-attractor-candidate}
\}.
$$

---

## 4. First-Failure Precedence

The master theorem uses this first-failure order:

| Order | First failing row | Primary status |
| ---: | --- | --- |
| 1 | ledger identity | `ledger-convention-mismatch` |
| 2 | geometry or equal-period chart | `geometry-chart-open` |
| 3 | active/support memory | `active-window-only` or `tail-force-error-unbounded` |
| 4 | tail interval or mesh lift | `tail-certificate-failure`, `tail-antipodal-compression-invalid`, `tail-certificate-pointwise-only`, or `tail-mesh-lift-failed` |
| 5 | root-sheet variation | `root-sheet-derivative-envelope-open` or `root-sheet-second-variation-open` |
| 6 | root/Jacobian/noncollision floors | `root-chart-floor-failed` |
| 7 | action scale or curl | `gamma-fitted-not-derived`, `history-one-form-curl-open`, or `gamma-fit-action-mismatch` |
| 8 | Krawczyk range/cokernel | `krawczyk-range-budget-failed`, `krawczyk-cokernel-tolerance-open`, or `continue-exact-antipodal-refine` |
| 9 | higher exact-antipodal refinement | `continue-exact-antipodal-refine` |
| 10 | support-complete obstruction | `support-complete-exact-antipodal-obstruction` |
| 11 | finite-mode convergence | `finite-mode-convergence-open` |
| 12 | Noether/event rows | `event-action-not-computed` or `noether-conservation-closure-open` |
| 13 | stability rows | `root-ledger-floquet-stability-open` or first stability-handoff failure |
| 14 | inventory/source rows | `central-inventory-unresolved` or `source-provenance-open` |
| 15 | all rows pass | `retained-exact-antipodal-m3-branch-candidate` |

The obstruction row is not a retention failure; it is a mathematically meaningful alternative. It says that the exact-antipodal $M=3$ chart has no local zero inside the certified ball on the declared ledger. Only after exact-antipodal mode refinement fails may midpoint relaxation be opened.

---

## 5. Master Alternative

The exact-antipodal $M=3$ solve has four terminal mathematical alternatives:

$$
\texttt{retained-exact-antipodal-m3-branch-candidate},
$$

$$
\texttt{support-complete-exact-antipodal-dynamics-action-candidate},
$$

$$
\texttt{support-complete-exact-antipodal-obstruction},
$$

or

$$
\texttt{active-window-only}.
$$

The meanings are:

| Status | Mathematical meaning |
| --- | --- |
| `retained-exact-antipodal-m3-branch-candidate` | all master rows pass; branch may be promoted with stated assumptions and unresolved observer exports |
| `support-complete-exact-antipodal-dynamics-action-candidate` | finite support-complete dynamics/action rows pass, but convergence, Noether/event, stability, or inventory rows remain open |
| `support-complete-exact-antipodal-obstruction` | exact-antipodal $M=3$ local zero is excluded inside the certified ball after higher exact-antipodal refinement fails |
| `active-window-only` | support-complete memory has not been certified; current rows are dynamics evidence only |

Midpoint relaxation is not terminal. It is a new chart opened only after the obstruction alternative passes and the relaxation-column span test succeeds.

---

## 6. Master Retention Theorem

**Theorem target: exact-antipodal $M=3$ master retention.** Fix one exact-antipodal arclength-inverse $M=3$ branch class, one source-pair policy, one endpoint convention, one support-complete memory convention, one action/event convention, and one row-weight convention. Suppose:

1. the support tail is either excluded or assimilated as differentiable root sheets;
2. the support-complete root ledger has positive delay, Jacobian, gap, noncollision, speed, and support margins;
3. the dynamics/action residual rows pass the Krawczyk range and cokernel budgets;
4. the finite-mode sequence converges to a curve-level support-complete dynamics/action candidate;
5. the total action and Noether/event rows close energy, momentum, angular momentum, charge, and source provenance;
6. the stability handoff classifies the root-dependent monodromy after neutral reduction and nonlinear recovery;
7. the central inventory and event ledgers match the dynamics/action ledger;
8. the normalized master error satisfies $\mathfrak{E}_{M3}(B)\le1$.

Then $B$ is a retained exact-antipodal $M=3$ same-level tri-binary branch candidate. Observer exports remain downstream claims and do not define retention.

Conversely, if rows 1 and 2 pass but the support-complete adjoint/cokernel obstruction inequality passes after exact-antipodal mode refinement fails, then the exact-antipodal $M=3$ chart is locally obstructed on the declared ledger. Midpoint relaxation may be opened only if its projected columns span the obstructing block.

Proof route:

1. tail and sheet rows give support-complete differentiable force data;
2. action and Krawczyk rows give a finite support-complete dynamics/action zero or obstruction;
3. finite-mode convergence promotes a finite zero to a curve-level dynamics/action candidate;
4. Noether/event rows promote action closure to conservation and provenance closure;
5. stability rows classify the root-dependent return dynamics on the same ledger;
6. inventory rows certify the integer polarity content;
7. the master normalized inequality bundles the certified residual and error budgets.

---

## 7. Current $M=3$ Reading

The present exact-antipodal $M=3$ data do not satisfy the master theorem. The current statuses remain

$$
\texttt{active-window-only},
\qquad
\texttt{tail-force-error-unbounded},
\qquad
\texttt{gamma-fitted-not-derived},
\qquad
\texttt{finite-mode-convergence-open},
\qquad
\texttt{event-action-not-computed},
\qquad
\texttt{root-ledger-floquet-stability-open},
\qquad
\texttt{not-retained}.
$$

The mathematically strongest current positive statement is:

$$
\texttt{m3-extended-window-descent-survives}.
$$

The next decisive row remains the support-tail problem

$$
T_{\mathrm{tail}}
=
(4.5,\ 5.5211575250+m_\eta],
$$

followed by the support-complete corrector and action/Krawczyk rows.

The bounded speed factor model is not certified by this theorem. This packet is the fixed-speed special case

$$
\nu_i\equiv1.
$$

If $\nu_i$ becomes a branch variable, the retained certificate must be rebuilt using [bounded-speed-factor-master-retention-theorem.md](bounded-speed-factor-master-retention-theorem.md). In that successor theorem, the tangential row is no longer $\mathbf{T}\cdot\widetilde{\mathbf{F}}=0$; it is

$$
\nu_i\nu_i'
=
\Gamma_B^{\nu}\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^{\nu},
$$

and the curvature row is

$$
\nu_i^2\mathbf{K}_i
=
\Gamma_B^{\nu}P_i^\perp\widetilde{\mathbf{F}}_i^{\nu}.
$$

The root, tail, Krawczyk, action, Noether, event, and stability rows must then use causal-time root sheets from [bounded-speed-factor-root-sheet-certificate.md](bounded-speed-factor-root-sheet-certificate.md).

---

## 8. Required Output Fields

A master $M=3$ retained packet must emit:

| Field | Required payload |
| --- | --- |
| `master_ledger_id` | root, memory, source-pair, endpoint, action, event, inventory, and weight convention |
| `master_residual_vector` | every component of $\mathcal{R}_{M3}^{\mathrm{master}}$ |
| `master_tolerances` | $\tau_{M3}$ and row normalizations |
| `certified_error_vector` | $\epsilon_r^{\mathrm{cert}}$ for every row |
| `floor_margins` | $d_{\min}$, $\eta_{\min}$, $J_{\min}$, $\gamma_{\mathrm{gap}}$, $s_{\min}$, $r_{\max}$ |
| `tail_sheet_status` | tail exclusion or differentiable root-sheet assimilation |
| `dynamics_action_status` | support-complete Krawczyk/cokernel/action decision |
| `limit_status` | curve-level finite-mode convergence decision |
| `noether_event_status` | generator-current and event-ledger decision |
| `stability_status` | conservative/exchange and nonlinear recovery decision |
| `inventory_status` | integer polarity and source-provenance decision |
| `master_status` | one primary status from Section 4 or 5 |
