# Support-Complete $M=3$ Successor Certificate Target

Promotion status: `priority-only`. This packet composes the $M=3$ root-frontier, adaptive-memory, tail-exclusion, tail-assimilation, Lipschitz, refinement, Newton, obstruction, and action rows into one certificate target for the next exact-antipodal arclength-inverse run. The executable ordered solve theorem is stated in [support-complete-m3-executable-solve-theorem.md](support-complete-m3-executable-solve-theorem.md). This packet does not retain a branch. Its purpose is to decide whether the next $M=3$ continuation row is a support-complete dynamics candidate, an exact-antipodal obstruction, or only an active-window descent screen.

The certificate is local to one exact-antipodal branch class, one equal-period arclength-inverse chart, one source-pair policy, one memory convention, one collocation refinement ladder, and one weighted residual norm. Its event semantics are supplied by [branch-event-classification-theorem.md](branch-event-classification-theorem.md): memory exits, support escape, chart failures, tail failures, proof-budget failures, and action/$\Gamma$ obstructions are distinct outcomes and must not be collapsed into a generic dynamics failure.

---

## 1. Certificate Object

Let $\alpha$ be the exact-antipodal $M=3$ coefficient vector in the arclength-inverse chart, with equal-period and gauge constraints already imposed. The successor packet is

$$
\mathsf{S}_{M3}(\alpha,\eta_{\mathrm{mem}})
=
\left(
\mathcal{A}_{\eta},
\mathcal{B}_{\mathrm{root}},
\mathcal{T}_{\mathrm{tail}},
\mathcal{I}_{\mathrm{tail}},
\mathcal{M}_{\mathrm{tail}},
\mathcal{X}_{\mathrm{tail}},
\mathcal{D}_{\mathrm{sheet}},
\mathcal{F}_{\eta}^{(3)},
\mathcal{H}_{\mathrm{aug}},
\mathcal{L}_{\mathrm{force}},
\mathcal{K}_{\mathrm{pb}},
\mathcal{P}_{\mathrm{post}},
\mathcal{N}_{\mathrm{range}},
\mathcal{O}_{\mathrm{cok}},
\mathcal{E}_{\mathrm{disc}},
\mathcal{G}_{\Gamma},
\mathcal{G}_{B},
\mathcal{V}_{\mathrm{curl}},
\mathcal{M}_{\mathrm{ref}},
\mathcal{C}_{\mathrm{lim}},
\mathcal{N}_{\mathrm{event}},
\mathcal{P}_{\mathrm{stab}},
\mathcal{R}_{\mathrm{master}}
\right).
$$

Here:

| Entry | Meaning |
| --- | --- |
| $\mathcal{A}_{\eta}$ | active delayed-root ledger under the declared memory depth |
| $\mathcal{B}_{\mathrm{root}}$ | bracket, excluded-gap, Jacobian, noncollision, and chart-speed barriers |
| $\mathcal{T}_{\mathrm{tail}}$ | support-complete tail exclusion, tail-root assimilation, or explicit failure status |
| $\mathcal{I}_{\mathrm{tail}}$ | interval enclosures for tail-slab source phases, distances, Jacobians, endpoint signs, and Lipschitz constants |
| $\mathcal{M}_{\mathrm{tail}}$ | mesh lift from nodewise tail slabs to arclength-cell exclusion or root-sheet assimilation |
| $\mathcal{X}_{\mathrm{tail}}$ | execution ledger from [support-complete-m3-tail-execution-ledger.md](support-complete-m3-tail-execution-ledger.md), including endpoint ownership, coefficient-box persistence, atomic cell margins, and $E_{\mathrm{tail}}$ |
| $\mathcal{D}_{\mathrm{sheet}}$ | root-sheet coefficient derivatives, second-variation envelopes, force derivatives, action/curl derivatives, scalar-inertia updates, and Krawczyk envelopes from [support-complete-m3-root-sheet-variations.md](support-complete-m3-root-sheet-variations.md) when tail roots are assimilated |
| $\mathcal{F}_{\eta}^{(3)}$ | support-complete dynamics residual map for $\mathcal{R}_{\mathrm{tan}}$ and $\mathcal{R}_{K}$ |
| $\mathcal{H}_{\mathrm{aug}}$ | optional augmented-root residual with retained delays as explicit variables |
| $\mathcal{L}_{\mathrm{force}}$ | delayed-force Lipschitz envelope on the certified chart ball |
| $\mathcal{K}_{\mathrm{pb}}$ | Krawczyk chart radius, derivative envelopes, range residual, and cokernel proof budget |
| $\mathcal{P}_{\mathrm{post}}$ | single-ledger post-tail proof score from [support-complete-m3-post-tail-proof-budget.md](support-complete-m3-post-tail-proof-budget.md) |
| $\mathcal{N}_{\mathrm{range}}$ | Newton, Kantorovich, or Krawczyk range-closure certificate |
| $\mathcal{O}_{\mathrm{cok}}$ | cokernel closure or obstruction certificate |
| $\mathcal{E}_{\mathrm{disc}}$ | collocation refinement and projector-drift error certificate |
| $\mathcal{G}_{\Gamma}$ | fitted-versus-action-derived $\Gamma_K$ compatibility row |
| $\mathcal{G}_{B}$ | $\Gamma_B$ action-scale row, virtual-work curl, scalar inertia, and $D\Gamma_B$ derivative status |
| $\mathcal{V}_{\mathrm{curl}}$ | virtual-work one-form curl row for action exactness |
| $\mathcal{M}_{\mathrm{ref}}$ | exact-antipodal higher-mode column test before relaxation |
| $\mathcal{C}_{\mathrm{lim}}$ | finite-mode convergence handoff from [support-complete-m3-finite-mode-convergence-handoff.md](support-complete-m3-finite-mode-convergence-handoff.md), computed after a finite dynamics/action candidate |
| $\mathcal{N}_{\mathrm{event}}$ | Noether/event handoff from [support-complete-m3-noether-event-handoff.md](support-complete-m3-noether-event-handoff.md), computed only after a dynamics/action candidate |
| $\mathcal{P}_{\mathrm{stab}}$ | root-ledger Floquet, conservative/exchange classification, and perturbation-recovery row from [support-complete-m3-stability-handoff.md](support-complete-m3-stability-handoff.md), computed only after dynamics/action and Noether/event closure |
| $\mathcal{R}_{\mathrm{master}}$ | normalized retention residual from [support-complete-m3-master-retention-theorem.md](support-complete-m3-master-retention-theorem.md) |

The support-complete dynamics residual is

$$
\mathcal{F}_{\eta}^{(3)}(\alpha)
=
\begin{bmatrix}
\mathcal{R}_{\mathrm{tan}}^{(\eta)}(\alpha)\\
\mathcal{R}_{K}^{(\eta)}(\alpha)
\end{bmatrix},
$$

where every root, tangent, curvature, and delayed source phase derivative is evaluated with the fixed-arclength variation formulas from [arclength-inverse-variation-formulas.md](arclength-inverse-variation-formulas.md).

---

## 2. Active-Window Versus Support-Complete Rows

Define

$$
\eta_{\mathrm{act}}
=
\max_{a\in\mathcal{A}_{\eta}}\eta_a,
\qquad
B_{\mathrm{sup}}
=
2r_{\max},
$$

and

$$
m_{\mathrm{act}}
=
\eta_{\mathrm{mem}}-\eta_{\mathrm{act}},
\qquad
m_{\mathrm{sup}}
=
\eta_{\mathrm{mem}}-B_{\mathrm{sup}}-m_\eta.
$$

The active-window row passes when

$$
m_{\mathrm{act}}>0,
$$

and all emitted active roots have positive bracket, excluded-gap, Jacobian, noncollision, and chart-speed margins. This proves only that the emitted labels lie inside the declared memory window.

The support-complete row passes only if either

$$
m_{\mathrm{sup}}\ge0,
$$

or the tail interval

$$
T_{\mathrm{tail}}
=
(\eta_{\mathrm{mem}},\,B_{\mathrm{sup}}+m_\eta]
$$

is covered by certified root-free slabs from [tail-interval-root-exclusion-certificate.md](tail-interval-root-exclusion-certificate.md).

Thus the implication chain is

$$
\texttt{support-complete}
\Longrightarrow
\texttt{active-window},
$$

but not conversely.

For the current extended $M=3$ frontier at $\rho=0.8$,

$$
\eta_{\mathrm{act}}\approx4.4058154936,
\qquad
\eta_{\mathrm{mem}}=4.5,
$$

so the active-window margin is only

$$
m_{\mathrm{act}}\approx0.0941845064.
$$

The same row has

$$
B_{\mathrm{sup}}
=
2r_{\max}
\approx5.5211575250,
$$

so

$$
m_{\mathrm{sup}}<0
$$

under $\eta_{\mathrm{mem}}=4.5$. Therefore the current row is `active-window-only` until the interval $(4.5,5.5211575250]$ is either searched on the same source-pair policy or certified root-free.

---

## 3. Range-Cokernel Dynamics Certificate

Let

$$
A_N
=
D(\mathcal{F}_{\eta}^{(3)}\circ N)(0)
$$

be the reduced equal-period derivative in the certified arclength-inverse chart. Use the singular-value decomposition

$$
A_N=U_R\Sigma V^T
$$

to define the numerical range projector and cokernel projector:

$$
Q_{\mathrm{ran}}=U_RU_R^T,
\qquad
P_{\mathrm{cok}}=I-Q_{\mathrm{ran}}.
$$

The range coordinates are

$$
F_R(u)
=
U_R^T\mathcal{F}_{\eta}^{(3)}(\alpha_0+Nu).
$$

The preferred successor certificate is the Krawczyk row. With an approximate inverse $C\approx (DF_R(0))^{-1}$, define

$$
Y=\|CF_R(0)\|,
\qquad
Z=\sup_{\|u\|\le\rho}\|I-CDF_R(u)\|.
$$

If

$$
Y+Z\rho<\rho,
\qquad
Z<1,
$$

then the range equation has a unique enclosed zero $u_*$ in the ball.

The cokernel audit must then satisfy

$$
\sup_{\|u-u_*\|\le r_*}
\left\|
P_{\mathrm{cok}}\mathcal{F}_{\eta}^{(3)}(\alpha_0+Nu)
\right\|
+
\epsilon_{\mathcal{F}}^{\mathrm{tail}}
+
\epsilon_{\mathrm{disc}}
\le
\tau_{\mathrm{dyn}}.
$$

This is the first row that permits the phrase `support-complete dynamics candidate`. Full rank and residual descent alone are not enough. The concrete post-tail residual and derivative system is stated in [support-complete-m3-corrector-system.md](support-complete-m3-corrector-system.md), and its proof-budget version is stated in [support-complete-m3-krawczyk-proof-budget.md](support-complete-m3-krawczyk-proof-budget.md).

---

## 3.1 Tail Resolution Before Corrector

For the current $\rho=0.8$ row, the next certificate is not a new relaxation ansatz. It is the finite tail problem

$$
T_{\mathrm{tail}}
=
(4.5,\ 5.5211575250+m_\eta].
$$

The required local protocol is [support-complete-m3-tail-resolution-protocol.md](support-complete-m3-tail-resolution-protocol.md), with slab enclosures from [support-complete-m3-tail-interval-enclosures.md](support-complete-m3-tail-interval-enclosures.md), arclength-cell lift from [support-complete-m3-tail-mesh-lift.md](support-complete-m3-tail-mesh-lift.md), and the execution ledger in [support-complete-m3-tail-execution-ledger.md](support-complete-m3-tail-execution-ledger.md). It has only these decision outcomes:

| Tail outcome | Successor meaning |
| --- | --- |
| `tail-exclusion-restored` | all support-tail slabs are root-free; set $\epsilon_{\mathcal{F}}^{\mathrm{tail}}=0$ and run the exact-antipodal corrector on the certified active ledger |
| `tail-root-sheet-assimilated` | tail roots are bracketed, antipodally paired, lifted to continuous sheets, and included; rerun force, $\Gamma$, curl, action, cokernel, and refinement rows on the extended ledger |
| `tail-root-sheet-assimilated-rerun-required` | tail sheets are certified but downstream dynamics/action rows are stale until recomputed on $\mathcal{A}_{\eta}^{+}$ |
| `tail-certificate-pointwise-only` | the tail certificate holds only at $\alpha_0$ and cannot feed Krawczyk or master retention |
| `tail-certificate-failure` | at least one slab is uncertified; status remains `active-window-only` and `tail-force-error-unbounded` |

Only the first two outcomes permit the support-complete corrector row.

If the second outcome occurs, the successor packet must also emit the root-sheet variation row from [support-complete-m3-root-sheet-variations.md](support-complete-m3-root-sheet-variations.md). The derivative chain is not complete until $D_v\eta_u(\lambda)$ and its derivative-Lipschitz envelope have been propagated through $D\widetilde{\mathbf{F}}$, $D\mathcal{R}_K$, the curl matrix, scalar inertia, $D\Gamma_B$, and the Krawczyk derivative envelope.

---

## 3.2 Action-Scale And Mode-Refinement Fork

After tail resolution, the support-complete corrector must distinguish the diagnostic fitted scale from the action-derived scale. The post-tail action row is supplied by [support-complete-m3-action-scale-protocol.md](support-complete-m3-action-scale-protocol.md):

$$
\Gamma_B
=
\frac{E_\epsilon(R_*)}{m_{\mathrm{car}}c_f^2},
$$

with virtual-work exactness, scalar inertia reduction, $D\Gamma_B$, and fit/action compatibility computed on the same support-complete ledger.

Thus the fitted residual

$$
K-\Gamma_K^{\mathrm{fit}}P^\perp\widetilde{\mathbf{F}}
$$

is not enough for branch retention. The retained dynamics/action row must control

$$
K-\Gamma_BP^\perp\widetilde{\mathbf{F}}.
$$

If a support-complete $M=3$ corrector leaves a stable cokernel defect, the next step is not automatically midpoint relaxation. The new exact-antipodal columns must be tested by [exact-antipodal-mode-refinement-certificate.md](exact-antipodal-mode-refinement-certificate.md). In symbols, if $c_3$ is the $M=3$ cokernel defect and $B_4$ is the projected $M=4$ exact-antipodal column matrix, then a promising exact-antipodal refinement satisfies

$$
\left\|
\left(I-B_4B_4^\dagger\right)c_3
\right\|
\le
\theta_{\mathrm{lift}}\|c_3\|,
\qquad
\theta_{\mathrm{lift}}<1.
$$

Only after the declared exact-antipodal refinement ladder fails and the adjoint obstruction inequality passes may pair-midpoint relaxation be tested.

---

## 4. Obstruction And Relaxation Decision

If the range certificate fails, this does not automatically prove a dynamics obstruction. It may only mean that the proof budget, trust radius, derivative envelope, or collocation resolution is insufficient.

An exact-antipodal support-complete obstruction is certified only when a left-null vector $y$ or cokernel projector gives a lower bound

$$
\left\|
P_{\mathrm{cok}}\mathcal{F}_{\eta}^{(3)}(\alpha_0)
\right\|
>
\epsilon_{\mathrm{nl}}
+
\epsilon_{\mathcal{F}}^{\mathrm{tail}}
+
\epsilon_{\mathrm{disc}}
+
\tau_{\mathrm{dyn}},
$$

where $\epsilon_{\mathrm{nl}}$ bounds the nonlinear range of exact-antipodal corrections over the certified chart ball.

Only after that obstruction is support-complete may the pair-midpoint relaxation columns be tested. Let $B_{\mathrm{mid}}$ be the projected derivative contributed by antipodal midpoint columns. The conservative opening test is

$$
\sigma_{\min}
\left(
P_{\mathrm{cok}}B_{\mathrm{mid}}
\right)
>
\epsilon_{\mathrm{col}},
$$

on the same cokernel basis. If this fails, antipodal relaxation is not the correct next geometric row even if exact-antipodal closure fails.

---

## 5. Action And Scale Compatibility

Let $\Gamma_K^{\mathrm{fit}}$ be the least-squares curvature coefficient from the dynamics residual and let $\Gamma_B$ be the action-derived branch coefficient from [gamma-scale-action-row.md](gamma-scale-action-row.md). The successor packet must emit the projection identity

$$
\mathcal{R}_B
=
\mathcal{R}_{\mathrm{fit}}
+
(\Gamma_K^{\mathrm{fit}}-\Gamma_B)A_{\mathrm{force}},
$$

with a tolerance bound

$$
|\Gamma_K^{\mathrm{fit}}-\Gamma_B|\,
\|A_{\mathrm{force}}\|
\le
\tau_{\Gamma}.
$$

It must also emit the finite-mode curl row

$$
\frac{\|\mathcal{C}\|_{\mathrm{F}}}{1+\|W\|_{\mathrm{F}}}
\le
\epsilon_{\mathrm{curl}}.
$$

If $\Gamma_B$ or the curl row is not computed on the same support-complete root ledger, the status is

$$
\texttt{gamma-fitted-not-derived}.
$$

Such a row may guide the next solve, but it cannot retain a branch or support energy, mass, or observer-export claims.

---

## 6. Composite Theorem Target

**Theorem target: support-complete $M=3$ successor certificate.** Fix an exact-antipodal $M=3$ arclength-inverse chart and a base point $\alpha_0$. Suppose:

1. the equal-period and gauge-reduced chart has positive speed floor and uses the fixed-arclength variation formulas;
2. every required active root is bracketed, isolated, source-pair complete, and has $|J_a|\ge J_0>0$;
3. the active-window row passes and the support-complete row passes by $m_{\mathrm{sup}}\ge0$, a certified tail-exclusion cover, or a tail-root-sheet assimilation cover from [tail-root-assimilation-theorem.md](tail-root-assimilation-theorem.md) and [support-complete-m3-root-sheet-variations.md](support-complete-m3-root-sheet-variations.md);
4. the delayed-force Lipschitz envelope bounds derivative variation on the chart ball;
5. the Krawczyk or Kantorovich range certificate encloses a unique range zero;
6. the cokernel audit closes to tolerance after tail and discretization errors are added;
7. the fitted curvature coefficient is compatible with an action-derived $\Gamma_B$ and the work one-form passes the curl row;
8. the finite-mode refinement sequence has bounded off-grid residual, root-label drift, excluded-gap drift, and projector drift.

Then the packet is a support-complete $M=3$ dynamics candidate on the declared branch label. It is not yet a fully retained tri-binary branch until the Noether action/conservation rows and root-ledger Floquet stability row also pass on the same ledger.

The finite-mode convergence handoff is specified in [support-complete-m3-finite-mode-convergence-handoff.md](support-complete-m3-finite-mode-convergence-handoff.md). It upgrades finite $M=3$ rows to a curve-level dynamics/action candidate only when a certified refinement sequence has uniform floors and vanishing continuous errors. The exact $M=3$ Noether/event handoff is specified in [support-complete-m3-noether-event-handoff.md](support-complete-m3-noether-event-handoff.md). It must not be run before the dynamics/action candidate exists, but it is mandatory before any retained-branch claim. The same is true for the stability handoff in [support-complete-m3-stability-handoff.md](support-complete-m3-stability-handoff.md): root-ledger monodromy, neutral-mode quotient, conservative or exchange classification, and nonlinear recovery must all use the same ledger.

The master retained-branch decision is stated in [support-complete-m3-master-retention-theorem.md](support-complete-m3-master-retention-theorem.md). It is the only $M=3$ packet here that permits `retained-exact-antipodal-m3-branch-candidate`, and only after all component rows emit certified error envelopes.

Conversely, if conditions 1 through 4 and 8 hold but the cokernel lower bound in Section 4 holds, then exact-antipodal $M=3$ dynamics closure is locally obstructed on that support-complete chart. Antipodal relaxation may be opened only if the pair-midpoint projected-column test also passes.

If the support-complete row fails, the correct status is `active-window-only`, `tail-interval-uncertified`, or `tail-force-error-unbounded`, not `dynamics-obstructed`.

---

## 7. Required Output Fields For The Next Run

The next $M=3$ run should emit at least:

| Field | Required payload |
| --- | --- |
| `coefficient_vector` | exact-antipodal $M=3$ coefficients and equal-period projection data |
| `eta_mem` | declared memory depth and policy |
| `eta_active_max` | maximum emitted active delay and margin $m_{\mathrm{act}}$ |
| `support_bound` | $2r_{\max}$, $m_{\mathrm{sup}}$, and support-growth bounds |
| `tail_certificate` | slab cover and pass/fail margins, or explicit uncertified interval |
| `tail_assimilation` | assimilated tail-root brackets, gaps, Jacobian floors, and ledger extension, when roots are found |
| `root_sheet_variation` | $\eta_u(\lambda)$, $\eta_u'(\lambda)$, $D_v\eta_u$, $D_{v,w}^{2}\eta_u$, sheet force derivatives, scalar-inertia updates, and derivative envelopes when tail roots are assimilated |
| `root_barriers` | bracket signs, excluded gaps, $J_{\min}$, source-pair completeness, and noncollision floor |
| `variation_audit` | confirmation that inverse-phase, tangent, curvature, and root-delay variations are included |
| `lipschitz_envelope` | derivative constants from [delayed-force-lipschitz-envelope.md](delayed-force-lipschitz-envelope.md) |
| `svd_range_data` | singular values, rank threshold, range projector, and cokernel projector |
| `krawczyk_bounds` | $Y$, $Z$, $\rho$, and enclosing radius |
| `cokernel_audit` | point or interval bound after tail and discretization errors |
| `refinement_error` | $\epsilon_{\mathrm{disc}}$ and off-grid residual envelope |
| `gamma_action_row` | $\Gamma_K^{\mathrm{fit}}$, $\Gamma_B$, fit penalty, and action provenance |
| `curl_row` | finite-mode one-form curl and tolerance |
| `stability_status` | `not_computed` until dynamics and action rows pass |

---

## 8. Current Status

The present $M=3$ data are positive but not yet certifying:

$$
\texttt{m3-extended-window-descent-survives},
\qquad
\texttt{active-window-only}.
$$

They are not yet:

$$
\texttt{support-complete-dynamics-candidate},
\qquad
\texttt{exact-antipodal-obstructed},
\qquad
\texttt{antipodal-relaxation-open}.
$$

The immediate mathematical gap is therefore not another broad ansatz. It is a support-complete successor packet that either closes the tail and Newton/cokernel rows, or proves a genuine exact-antipodal obstruction after the tail and refinement errors are accounted for.
