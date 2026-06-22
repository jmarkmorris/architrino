# Gamma Scale And Action Row

Promotion status: `priority-only`. This packet develops the scale/action row needed to turn a diagnostic fitted $\Gamma$ from intrinsic-curve screens into a derived branch quantity. It uses [intrinsic-curve-dynamics-equation.md](intrinsic-curve-dynamics-equation.md), [minimal-dynamics-closure-theorem.md](minimal-dynamics-closure-theorem.md), [central-inventory-and-event-ledgers.md](central-inventory-and-event-ledgers.md), [observer-export-and-mass-map-targets.md](observer-export-and-mass-map-targets.md), and [current-dynamics-synthesis.md](current-dynamics-synthesis.md).

This is a theorem-target packet. It does not claim a retained shell braid branch.

---

## 1. Gamma Convention

The intrinsic curve equation uses the curvature-from-force convention

$$
\mathbf{K}_i(\lambda)
=
\Gamma_K P_i^\perp(\lambda)\widetilde{\mathbf{F}}_i(\lambda),
\qquad
\mathbf{T}_i(\lambda)\cdot\widetilde{\mathbf{F}}_i(\lambda)=0,
$$

where

$$
\mathbf{K}_i=\mathbf{Y}_i'',
\qquad
P_i^\perp=I-\mathbf{T}_i\mathbf{T}_i^T.
$$

Some numerical screens fit the reciprocal force-from-curvature coefficient

$$
\Gamma_F^{\mathrm{fit}}
=
\operatorname*{argmin}_{\gamma}
\sum_{i,n}
\left\|
P_{i,n}^\perp\widetilde{\mathbf{F}}_{i,n}
-\gamma\mathbf{K}_{i,n}
\right\|^2.
$$

When a scalar scale row is valid, the two coefficients must obey

$$
\Gamma_F=\Gamma_K^{-1}.
$$

Therefore a report that says "fitted $\Gamma$" must declare which convention it used:

| Symbol | Equation | Meaning |
| --- | --- | --- |
| $\Gamma_K$ | $\mathbf{K}=\Gamma_KP^\perp\widetilde{\mathbf{F}}$ | derived curvature response per dimensionless force |
| $\Gamma_F$ | $P^\perp\widetilde{\mathbf{F}}=\Gamma_F\mathbf{K}$ | reciprocal force scale per curvature |
| $\Gamma^{\mathrm{fit}}$ | least-squares scalar on a fixed curve | diagnostic only until the action row derives it |

The retained branch row should store both values when a reciprocal diagnostic is used:

$$
\Gamma_K^{\mathrm{diag}}=\frac{1}{\Gamma_F^{\mathrm{fit}}},
$$

but only after the fit residual is below tolerance and the convention is recorded.

The fit/action compatibility test is sharpened in [gamma-fit-action-identifiability-lemma.md](gamma-fit-action-identifiability-lemma.md): a fitted $\Gamma_K$ is compatible with an action-derived $\Gamma_B$ only inside the force-norm and uncertainty bounds on the same support-complete ledger.

The rescore in [arclength-inverse-rescore-results.md](arclength-inverse-rescore-results.md) shows why this bookkeeping matters. On the equal-period projected $M=2$ candidate at $K=12$, the reciprocal force-from-curvature residual is about $0.6377$, matching the earlier projection packet, while the retained curvature-from-force residual is about $0.8952$. Those are not contradictory numbers; they are different least-squares questions away from an exact scalar-aligned zero.

---

## 2. Dimensional Scaling

Use the normalization scale $R_*$ and arclength clock

$$
\lambda=\frac{c_ft}{R_*},
\qquad
\mathbf{x}_i(t)=R_*\mathbf{Y}_i(\lambda).
$$

Here $R_*$ is a normalization scale for the action row. The actual branch support data remain in the support descriptor; a fixed radius or common support band is an additional sector row, not a consequence of this scaling convention.

Then

$$
\dot{\mathbf{x}}_i=c_f\mathbf{T}_i,
\qquad
\ddot{\mathbf{x}}_i=\frac{c_f^2}{R_*}\mathbf{K}_i.
$$

For neutral same-level tri-binary dynamics,

$$
q_{a,+}=+\epsilon,
\qquad
q_{a,-}=-\epsilon,
\qquad
\epsilon=\frac{|e|}{6}.
$$

Define the branch Coulomb-scale energy

$$
E_\epsilon(R_*)=\frac{\kappa\epsilon^2}{R_*}.
$$

The corresponding force scale is

$$
\frac{E_\epsilon(R_*)}{R_*}
=
\frac{\kappa\epsilon^2}{R_*^2}.
$$

If the branch action supplies a common scalar carrier inertia $m_{\mathrm{car}}(B)$ for the normal same-level carrier modes, the dimensional normal equation is

$$
m_{\mathrm{car}}(B)\frac{c_f^2}{R_*}\mathbf{K}_i
=
\frac{E_\epsilon(R_*)}{R_*}
P_i^\perp\widetilde{\mathbf{F}}_i.
$$

Thus the dimensionless curvature coefficient is

$$
\Gamma_K(B)
=
\frac{E_\epsilon(R_*)}
{m_{\mathrm{car}}(B)c_f^2}
=
\frac{\kappa\epsilon^2}
{m_{\mathrm{car}}(B)R_*c_f^2}.
$$

Equivalently,

$$
\Gamma_F(B)
=
\frac{m_{\mathrm{car}}(B)c_f^2}
{E_\epsilon(R_*)}.
$$

This is the scale row a retained packet must derive. A numerical fit chooses the ratio after seeing the curve; it does not identify $m_{\mathrm{car}}(B)$.

---

## 3. Action Row

The minimum local scalar action row has the dimensionful form

$$
\mathcal{S}_{\mathrm{car}}[Y]
=
\frac{m_{\mathrm{car}}c_fR_*}{2}
\int_0^L
\sum_i
\left\|
\mathbf{Y}_i'(\lambda)
\right\|^2
d\lambda,
$$

plus a history-dependent force contribution whose first variation on the retained active-root stratum is

$$
\delta\mathcal{S}_{\mathrm{hist}}^\perp
=
\frac{R_*E_\epsilon(R_*)}{c_f}
\int_0^L
\sum_i
P_i^\perp\widetilde{\mathbf{F}}_i(\lambda)
\cdot
\delta\mathbf{Y}_i^\perp(\lambda)
d\lambda.
$$

The center gauge, unit-speed row, support-band row, and period row enter as constraints. Stationarity of

$$
\mathcal{S}_B
=
\mathcal{S}_{\mathrm{car}}
+\mathcal{S}_{\mathrm{hist}}
+\mathcal{S}_{\mathrm{constraints}}
+\mathcal{S}_{\mathrm{sea/event}}
$$

under normal variations gives

$$
m_{\mathrm{car}}c_f^2\mathbf{K}_i
=
E_\epsilon(R_*)P_i^\perp\widetilde{\mathbf{F}}_i,
$$

and hence

$$
\mathbf{K}_i
=
\Gamma_KP_i^\perp\widetilde{\mathbf{F}}_i.
$$

This derivation has three non-negotiable obligations. The first obligation is sharpened in [history-force-variationality-condition.md](history-force-variationality-condition.md): the delayed force defines an action row only when its virtual-work one-form is closed on the same root stratum.

| Obligation | Required object | Failure if omitted |
| --- | --- | --- |
| Exact action or virtual-work row | $\delta\mathcal{S}_{\mathrm{hist}}^\perp$ computed from the same active roots as the force and passing the one-form curl test | a force fit is not an action derivation |
| Carrier inertia | $m_{\mathrm{car}}(B)$ or an inertia operator whose scalar reduction is proven | $\Gamma$ remains a fitted parameter |
| Ledger compatibility | energy, momentum, angular momentum, charge, source provenance, and Noether sea updates use the same history and root convention | dynamics-only row cannot support mass or observer export |

The scalar row is a special case. A more general action may produce a normal inertia operator

$$
\mathsf{M}_{B,\perp}:
\delta\mathbf{Y}^\perp
\mapsto
\delta\mathbf{P}^\perp,
$$

with mass units. Then the dimensionless equation is

$$
\mathsf{M}_{B,\perp}\mathbf{K}
=
\frac{E_\epsilon(R_*)}{c_f^2}
P^\perp\widetilde{\mathbf{F}}.
$$

A single scalar $\Gamma_K$ is justified only if the branch proves

$$
\mathsf{M}_{B,\perp}\mathbf{K}
=
m_{\mathrm{car}}(B)\mathbf{K}
$$

on the retained carrier modes, after quotienting gauge directions and tangent constraints. Otherwise the correct retained equation is tensorial or nonlocal in phase, not a scalar-$\Gamma$ equation.

### Bounded Speed Factor Variant

For the bounded speed factor model in [variable-speed-factor-extension.md](variable-speed-factor-extension.md), the fixed-speed kinetic action is no longer the right variational row. The branch velocity is

$$
\dot{\mathbf{x}}_i=c_f\nu_i\mathbf{T}_i,
$$

and the causal-time measure satisfies

$$
du_i=\frac{d\lambda_i}{\nu_i(\lambda_i)}.
$$

Thus the dimensionful carrier kinetic action contributes

$$
S_{\mathrm{car}}^{\nu}
=
\frac{R_*}{c_f}
\sum_i\int
\frac12m_{\mathrm{car}}c_f^2\nu_i(u)^2\,du
=
\frac{m_{\mathrm{car}}c_fR_*}{2}
\sum_i\int
\nu_i(\lambda)\,d\lambda.
$$

Stationarity must now recover both bounded-speed dynamics rows:

$$
\nu_i\nu_i'
=
\Gamma_B^{\nu}\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^{\nu},
\qquad
\nu_i^2\mathbf{K}_i
=
\Gamma_B^{\nu}P_i^\perp\widetilde{\mathbf{F}}_i^{\nu}.
$$

The action ledger must therefore declare whether $m_{\mathrm{car}}$ is fixed, speed-weighted, or history-derived. A scalar action scale is admissible only when the same bounded-speed root ledger supplies the work-form curl, speed-factor variation, and inertia row. If this packet is used with $\nu_i\not\equiv1$ but without those rows, the status is

$$
\texttt{bounded-speed-action-row-open}.
$$

---

## 4. Branch Inertia Ledger

The branch packet must emit an inertia/action ledger

$$
\mathcal{L}_{\Gamma}^{(B)}
=
\left(
R_*,
E_\epsilon,
\eta_{\mathrm{mem}},
\mathcal{A}_B,
\mathcal{H}_B,
\mathcal{S}_B,
\mathsf{M}_{B,\perp},
m_{\mathrm{car}},
\Gamma_K,
\Gamma_F,
\mathcal{R}_{\Gamma}
\right).
$$

The entries mean:

| Entry | Role |
| --- | --- |
| $R_*$ | declared normalization scale used by the root, force, action, and mass rows |
| $E_\epsilon$ | branch charge-interaction scale $\kappa\epsilon^2/R_*$ |
| $\eta_{\mathrm{mem}}$ | dimensionless memory depth used by the active-root, force, and action rows |
| $\mathcal{A}_B$ | retained active causal-root ledger |
| $\mathcal{H}_B$ | branch history used by force, energy, and action rows |
| $\mathcal{S}_B$ | action or exact virtual-work object |
| $\mathsf{M}_{B,\perp}$ | normal carrier inertia operator from the action ledger |
| $m_{\mathrm{car}}$ | scalar reduction of $\mathsf{M}_{B,\perp}$, if it exists |
| $\Gamma_K,\Gamma_F$ | derived reciprocal scale coefficients |
| $\mathcal{R}_{\Gamma}$ | residuals for convention, scale, inertia, action, and refinement consistency |

For a scalar six-site same-level row, the inertia residual can be written as

$$
\mathcal{R}_{\mathrm{iso}}
=
\sup_{\|\mathbf{v}\|=1}
\frac{
\left\|
\mathsf{M}_{B,\perp}\mathbf{v}
-m_{\mathrm{car}}\mathbf{v}
\right\|
}
{m_{\mathrm{car}}}.
$$

The scale row passes only if

$$
\mathcal{R}_{\mathrm{iso}}\le\epsilon_{\mathrm{iso}},
\qquad
\left|
\Gamma_K
-\frac{E_\epsilon}{m_{\mathrm{car}}c_f^2}
\right|
\le\epsilon_{\Gamma},
$$

and the same active-root ledger also passes the intrinsic dynamics residual

$$
\mathbf{K}_i-\Gamma_KP_i^\perp\widetilde{\mathbf{F}}_i=\mathbf{0}.
$$

The active-root ledger includes the memory depth. The $M=3$ root-frontier result in [arclength-inverse-m3-root-frontier.md](arclength-inverse-m3-root-frontier.md) shows that changing $\eta_{\mathrm{mem}}$ from $4$ to $4.5$ recovers delayed roots that the shallower window omits. Therefore $\Gamma_K$ values fitted under different memory depths are not directly interchangeable. A retained scale row must compute $\mathcal{A}_B$, $\mathcal{H}_B$, $\mathcal{S}_B$, and $\widetilde{\mathbf{F}}$ under one declared $\eta_{\mathrm{mem}}$.

---

## 5. Coupling To Energy, History, And Mass Map

The mass-map packet defines the retained branch energy row

$$
\overline{E}_{\mathrm{hist}}^{(B)}
=
\frac{1}{|W|}
\int_W
E_{\mathrm{hist}}^{(B)}(t)\,dt,
$$

and the translational mass target

$$
m_{\mathrm{tr}}(B)
=
\frac{\overline{E}_{\mathrm{hist}}^{(B)}}{c_f^2}
\left(
\zeta_B+\zeta_{\mathrm{sea},B}
\right),
$$

where

$$
\zeta_{\mathrm{sea},B}
=
\frac{
h_{ab}\mathcal{M}_{\mathrm{sea},B}^{ab}
}
{3\overline{E}_{\mathrm{hist}}^{(B)}}.
$$

The carrier inertia is not automatically $m_{\mathrm{tr}}/6$. The action row must supply a dimensionless internal allocation coefficient

$$
\mu_{\mathrm{car}}(B)
=
\frac{m_{\mathrm{car}}(B)}{m_{\mathrm{tr}}(B)}
$$

or explain why translational exposure and internal carrier inertia coincide. With this allocation,

$$
m_{\mathrm{car}}(B)c_f^2
=
\mu_{\mathrm{car}}(B)
\overline{E}_{\mathrm{hist}}^{(B)}
\left(
\zeta_B+\zeta_{\mathrm{sea},B}
\right),
$$

so the derived curvature coefficient is

$$
\Gamma_K(B)
=
\frac{
E_\epsilon(R_*)
}
{
\mu_{\mathrm{car}}(B)
\overline{E}_{\mathrm{hist}}^{(B)}
\left(
\zeta_B+\zeta_{\mathrm{sea},B}
\right)
}.
$$

This formula is the desired bridge between intrinsic dynamics and the mass map. It says that $\Gamma_K$ is not a free numerical knob. It is the ratio of the architrino charge-interaction scale to the branch's exposed internal inertia energy.

The branch packet must also emit the energy residual

$$
\mathcal{R}_{E}^{(B)}
=
\sup_{t\in W}
\frac{
\left|
E_{\mathrm{hist}}^{(B)}(t)-E_{\mathrm{hist}}^{(B)}(t_0)
\right|
}
{\epsilon_E},
$$

and the event ledger residuals

$$
\left(
\mathcal{R}_{N_+},
\mathcal{R}_{N_-},
\mathcal{R}_Q,
\mathcal{R}_E,
\mathcal{R}_{\mathbf{p}},
\mathcal{R}_{\mathbf{J}}
\right)
=
\left(
0,0,0,0,\mathbf{0},\mathbf{0}
\right),
$$

under the same root, regulator, endpoint, history, and Noether sea convention. If these rows are omitted, $\Gamma_K$ can support at most a dynamics-only diagnostic.

---

## 6. Why Fitted Gamma Is Not Retention

A least-squares $\Gamma^{\mathrm{fit}}$ is useful because it measures whether the delayed force is roughly aligned with curvature on a proposed curve. It is not a retention certificate.

First, a scalar fit can hide an open tangential row:

$$
\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i\ne0.
$$

Second, a scalar fit can hide a non-scalar inertia row:

$$
\mathsf{M}_{B,\perp}\ne m_{\mathrm{car}}I
$$

on the normal carrier modes.

Third, a scalar fit can drift with discretization, Fourier order, normalization scale, support descriptor, or root policy:

$$
\Gamma^{\mathrm{fit}}(M,K,\mathcal{A})
\not\to
\Gamma_{\mathrm{action}}(B).
$$

Fourth, a scalar fit is computed after choosing a curve. The action row must compute the inertia scale before the residual is judged:

$$
\Gamma_K
=
\frac{E_\epsilon}{m_{\mathrm{car}}c_f^2},
\qquad
\mathcal{R}_{\mathrm{dyn},i}
=
\mathbf{K}_i-\Gamma_KP_i^\perp\widetilde{\mathbf{F}}_i.
$$

Fifth, a fitted $\Gamma$ does not close source provenance, branch energy, momentum, angular momentum, charge, Noether sea response, or observer export. Those rows are separate obligations.

Therefore the correct status of any run with only a fitted $\Gamma$ is

$$
\texttt{dynamics-screen},
\qquad
\texttt{gamma-diagnostic-only},
\qquad
\texttt{no-retained-branch}.
$$

---

## 7. Theorem Targets

### T1. Scale-Action Reduction

**Theorem target.** Fix a same-level branch class $B$ with normalization scale $R_*$, support descriptor, active causal-root ledger $\mathcal{A}_B$, branch history $\mathcal{H}_B$, and closed arclength curves $\mathbf{Y}_i$. Assume:

1. the causal-root ledger has finite active roots, finite memory, positive Jacobian floor, and noncollision floor;
2. the normal virtual-work row is exact on the retained root stratum or is supplied by an action $\mathcal{S}_{\mathrm{hist}}$;
3. the normal carrier inertia operator reduces to a common scalar $m_{\mathrm{car}}(B)$ on the carrier modes;
4. the center-gauge, period, support descriptor, and fixed-speed or bounded-speed clock rows close.

Then stationarity of $\mathcal{S}_B$ under normal variations implies

$$
\mathbf{K}_i
=
\Gamma_K(B)P_i^\perp\widetilde{\mathbf{F}}_i,
\qquad
\Gamma_K(B)
=
\frac{\kappa\epsilon^2}
{m_{\mathrm{car}}(B)R_*c_f^2}.
$$

This theorem target derives the scale coefficient. It does not prove that such a branch exists.

### T2. Gamma-Mass Consistency

**Theorem target.** Assume the mass-map rows are computed on the same branch:

$$
\left(
E_{\mathrm{hist}},
\mathcal{Z}^{ab},
\zeta,
\mathcal{M}_{\mathrm{sea}}^{ab},
m_{\mathrm{tr}}
\right).
$$

Assume also that the action ledger supplies $\mu_{\mathrm{car}}=m_{\mathrm{car}}/m_{\mathrm{tr}}$. Then

$$
\Gamma_K(B)
=
\frac{
\kappa\epsilon^2/R_*
}
{
\mu_{\mathrm{car}}(B)
\overline{E}_{\mathrm{hist}}^{(B)}
\left(
\zeta_B+\zeta_{\mathrm{sea},B}
\right)
}
$$

must agree with the dynamics row and remain stable under branch refinement. If the formula disagrees with the fitted reciprocal scale beyond tolerance, the dynamics screen fails the scale/action row even if its geometric residuals improved.

### T3. Diagnostic Gamma No-Retention Lemma

**Lemma target.** Let a curve family and root policy produce a finite diagnostic value $\Gamma^{\mathrm{fit}}$. If any one of the following rows is missing or open:

$$
\mathcal{R}_{\mathrm{tan}},
\quad
\mathcal{R}_{\mathrm{curv}},
\quad
\mathcal{R}_{\mathrm{iso}},
\quad
\mathcal{R}_{E},
\quad
\mathcal{R}_{\mathrm{event}},
\quad
\mathcal{R}_{\Gamma},
$$

then the run cannot be promoted from `dynamics-screen` to retained branch. The fit may guide a next deformation or solver step, but it is not a physical scale derivation.

---

## 8. Failure Codes

| Failure code | Trigger |
| --- | --- |
| `gamma-convention-mismatch` | the run does not declare whether $\Gamma$ means curvature-from-force or force-from-curvature |
| `gamma-fitted-not-derived` | $\Gamma$ is least-squares fitted without an action or inertia ledger |
| `inertia-ledger-missing` | $m_{\mathrm{car}}$ or $\mathsf{M}_{B,\perp}$ is not emitted |
| `inertia-not-scalar` | $\mathsf{M}_{B,\perp}$ does not reduce to $m_{\mathrm{car}}I$ on the claimed scalar row |
| `history-action-not-exact` | the history-force virtual-work row is not shown to come from an action or exact branch-history form |
| `history-one-form-curl-open` | the finite-mode exterior curl of the delayed-force work one-form is nonzero above tolerance |
| `force-action-ledger-mismatch` | force, action, energy, or event rows use different active roots, regulators, endpoints, or histories |
| `scale-row-dimension-error` | $\Gamma_K$ is not dimensionless or does not equal $\kappa\epsilon^2/(m_{\mathrm{car}}R_*c_f^2)$ under the declared convention |
| `mass-map-gamma-mismatch` | the mass-map formula for $m_{\mathrm{tr}}$ and $\mu_{\mathrm{car}}$ gives a $\Gamma_K$ outside tolerance |
| `gamma-refinement-drift` | fitted $\Gamma$ changes beyond tolerance under collocation, Fourier-order, normalization-scale, support-descriptor, or root-policy refinement |
| `event-action-not-computed` | event/action rows are omitted while the result is described as more than dynamics-only |
| `gamma-retention-overclaim` | a run with fitted $\Gamma$ but open residuals is described as a retained branch |

---

## 9. Output Row For Future Runs

A solver packet that wants to promote a fitted scale into a derived quantity should emit:

| Output field | Required value |
| --- | --- |
| `gamma_convention` | `curvature_from_force` or `force_from_curvature` |
| `R_star` | declared normalization scale |
| `epsilon` | $\epsilon=|e|/6$ |
| `E_epsilon` | $\kappa\epsilon^2/R_*$ |
| `active_root_ledger` | same ledger used by force, action, energy, and event rows |
| `M_perp` | carrier inertia operator or scalar certificate |
| `m_car` | scalar carrier inertia if the scalar row is claimed |
| `mu_car` | $m_{\mathrm{car}}/m_{\mathrm{tr}}$, if mass-map coupling is claimed |
| `Gamma_K_action` | $E_\epsilon/(m_{\mathrm{car}}c_f^2)$ |
| `Gamma_F_action` | reciprocal coefficient |
| `Gamma_fit` | diagnostic least-squares value with convention |
| `R_gamma` | convention, scale, inertia, action, mass-map, and refinement residuals |
| `status` | `diagnostic`, `dynamics-only`, or `retained-shell-braid-branch-candidate` |

The status `retained-shell-braid-branch-candidate` is allowed only when the same packet also passes the intrinsic dynamics residual, the hard root and noncollision floors, the energy/action row, the inventory row, the stability row, and the event ledger rows required by the minimal dynamics closure theorem on one live ledger.

Until then the scale row remains:

$$
\texttt{priority-only},
\qquad
\texttt{gamma-diagnostic-only},
\qquad
\texttt{no-retained-same-level-branch-yet}.
$$
