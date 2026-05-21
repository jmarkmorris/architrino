# Bounded Speed Factor Variational Noether Closure

Promotion status: `priority-only`. This packet closes the row-level gap between bounded speed factor dynamics, Euler-Lagrange rows, speed-factor storage/exchange, and Noether currents. It refines [bounded-speed-factor-action-stability-closure.md](bounded-speed-factor-action-stability-closure.md), [bounded-speed-factor-speed-ode-solvability.md](bounded-speed-factor-speed-ode-solvability.md), [free-support-action-compatibility-theorem.md](free-support-action-compatibility-theorem.md), [bounded-speed-factor-coupled-fixed-point-theorem.md](bounded-speed-factor-coupled-fixed-point-theorem.md), and [bounded-speed-factor-master-retention-theorem.md](bounded-speed-factor-master-retention-theorem.md).

It does not retain a branch. It states the variational conditions under which the speed-factor Euler-Lagrange row, the tangential speed ODE, the speed-factor exchange ledger, support work, and Noether-Sea/event exchange are one ledger rather than parallel diagnostics.

---

## 1. Branch Variables And Period Rows

Work on one bounded-speed branch chart with

$$
\mathfrak{Z}_{\mathrm{VN}}^{\nu}
=
\left(
\mathbf{Y},
\nu,
\eta,
\mathcal{A}_{\nu},
\mathcal{D}_{\mathrm{supp}},
\mu,
e,
\Gamma_B^{\nu}
\right).
$$

Here $\mathbf{Y}_i:\mathbb{R}/L_i\mathbb{Z}\to\mathbb{R}^3$ are arclength curves, $\nu_i$ are positive bounded speed factors, $\eta$ are active causal-delay root sheets, $\mathcal{A}_{\nu}$ is the active root ledger, $\mathcal{D}_{\mathrm{supp}}$ is the support descriptor, $\mu$ are support multipliers when active, and $e$ denotes event variables and endpoint jumps.

The causal clock is

$$
\chi_i(\lambda)
=
\int_0^\lambda
\frac{d\xi}{\nu_i(\xi)},
\qquad
\Lambda_i=\chi_i^{-1},
\qquad
H_i^{\nu}
=
\int_0^{L_i}
\frac{d\lambda}{\nu_i(\lambda)}.
$$

For a single-cover equal-period branch,

$$
R_{H,i}^{\nu}
=
H_i^{\nu}-H_*
=0,
$$

and for winding,

$$
R_{H,i}^{\nu,\mathrm{wind}}
=
m_iH_i^{\nu}-H_{\mathrm{com}}
=0.
$$

There are two admissible variational conventions.

**Fixed-period variation.** The admissible speed variation $\rho_i=D_v\nu_i$ is tangent to the period row:

$$
D_vH_i^{\nu}
=
-
\int_0^{L_i}
\frac{\rho_i(\lambda)}
{\nu_i(\lambda)^2}
d\lambda
=0,
$$

or $m_iD_vH_i^{\nu}=0$ in the winding case. This convention tests constrained stationarity only on the tangent space of the period surface.

**Period-constrained variation.** The speed factor is varied freely and the action carries a period multiplier:

$$
\mathcal{S}_{\mathrm{per}}^{\nu}
=
\sum_i
\Theta_i
\left(
H_i^{\nu}-H_*
\right),
$$

or

$$
\mathcal{S}_{\mathrm{per}}^{\nu,\mathrm{wind}}
=
\sum_i
\Theta_i
\left(
m_iH_i^{\nu}-H_{\mathrm{com}}
\right).
$$

The multiplier contribution to the speed-factor Euler-Lagrange row is therefore

$$
\mathrm{EL}_{\nu,i}^{\mathrm{per}}
=
-
\frac{\Theta_i}{\nu_i^2},
$$

or $-m_i\Theta_i/\nu_i^2$ for winding. The two conventions are equivalent only when the period constraint qualification holds:

$$
D H_i^{\nu}\ne0
\quad
\text{on the active speed-factor chart}.
$$

If the packet does not declare which convention it uses, its status is `period-variation-mode-undeclared`.

---

## 2. Variational Action On The Live Ledger

The bounded-speed variational action is a functional of curves, speed factors, roots, support data, and event variables:

$$
\mathcal{S}_{\mathrm{VN}}^{\nu}
\left[
\mathbf{Y},
\nu,
\eta,
\mathcal{D}_{\mathrm{supp}},
\mu,
e
\right]
=
\mathcal{S}_{\mathrm{car}}^{\nu}
+
\mathcal{S}_{\mathrm{hist}}^{\nu}
+
\mathcal{S}_{\mathrm{speed}}^{\nu}
+
\mathcal{S}_{\mathrm{root}}^{\nu}
+
\mathcal{S}_{\mathrm{supp}}^{\nu}
+
\mathcal{S}_{\mathrm{per}}^{\nu}
+
\mathcal{S}_{\mathrm{band/gauge}}^{\nu}
+
\mathcal{S}_{\mathrm{sea/event}}^{\nu}.
$$

The carrier row is evaluated on the bounded-speed clock:

$$
\mathcal{S}_{\mathrm{car}}^{\nu}
=
\frac{R_*}{c_f}
\sum_i
\int_0^{H_*}
\frac12m_{\mathrm{car}}c_f^2
\nu_i(u)^2
du
=
\frac{m_{\mathrm{car}}c_fR_*}{2}
\sum_i
\int_0^{L_i}
\nu_i(\lambda)
d\lambda,
$$

with tensorial inertia replacing $m_{\mathrm{car}}$ when the branch uses an inertia operator.

The root constraint row is

$$
\mathcal{S}_{\mathrm{root}}^{\nu}
=
\sum_{r\in\mathcal{A}_{\nu}}
\int_0^{H_*}
\alpha_r(u)
G_r^{\nu}(u,\eta_r)
du,
$$

where

$$
G_r^{\nu}(u,\eta_r)
=
\left\|
\mathbf{Y}_i(\Lambda_i(u))
-
\mathbf{Y}_j(\Lambda_j(u-\eta_r))
\right\|
-
\eta_r.
$$

The support row is the multiplier or variational-inequality action from the same support descriptor:

$$
\mathcal{S}_{\mathrm{supp}}^{\nu}
=
\frac{R_*E_\epsilon(R_*)}{c_f}
\sum_i
\int
\left(
\mu_i^+B_i^+
+
\mu_i^-B_i^-
\right)du,
$$

with complementarity and endpoint impulses included in $e$ when support contacts are nonsmooth. The event/Noether-Sea row $\mathcal{S}_{\mathrm{sea/event}}^{\nu}$ records coherent medium exchange, event endpoint jumps, and source-provenance changes on the same event window.

The first variation has the form

$$
D\mathcal{S}_{\mathrm{VN}}^{\nu}[v]
=
\int
\sum_i
\left\langle
\mathrm{EL}_{Y,i}^{\nu},
\xi_i
\right\rangle du
+
\sum_i
\int_0^{L_i}
\mathrm{EL}_{\nu,i}^{\nu}
\rho_i
d\lambda
+
\sum_{r\in\mathcal{A}_{\nu}}
\int
\mathrm{EL}_{\eta,r}^{\nu}
\delta\eta_r
du
+
D\mathcal{S}_{\mathrm{supp/event}}^{\nu}[v]
+
\left[
\mathcal{B}^{\nu}[v]
\right].
$$

Every derivative in this row uses the same $\chi_i$, $\Lambda_i$, $\eta_r$, $J_r^{\nu}$, support descriptor, endpoint convention, and event variables as the dynamics residuals.

---

## 3. Speed-Factor Euler-Lagrange Row

The speed-factor Euler-Lagrange row is

$$
R_{\nu,i}^{\mathrm{EL}}
=
\frac{\delta}{\delta\nu_i}
\left(
\mathcal{S}_{\mathrm{car}}^{\nu}
+
\mathcal{S}_{\mathrm{hist}}^{\nu}
+
\mathcal{S}_{\mathrm{speed}}^{\nu}
+
\mathcal{S}_{\mathrm{root}}^{\nu}
+
\mathcal{S}_{\mathrm{supp}}^{\nu}
+
\mathcal{S}_{\mathrm{band/gauge}}^{\nu}
+
\mathcal{S}_{\mathrm{sea/event}}^{\nu}
\right)
-
\frac{\Theta_i}{\nu_i^2},
$$

with the winding replacement $-\Theta_i/\nu_i^2\mapsto-m_i\Theta_i/\nu_i^2$ when used. In fixed-period mode the same row is interpreted modulo the period normal:

$$
R_{\nu,i}^{\mathrm{EL}}
\sim
R_{\nu,i}^{\mathrm{EL}}
+
c_i\nu_i^{-2}.
$$

The tangential speed dynamics row is

$$
R_{T,i}^{\nu}
=
\nu_i\nu_i'
-
\Gamma_B^{\nu}
\mathbf{T}_i\cdot
\widetilde{\mathbf{F}}_{i,\mathrm{tot}}^{\nu},
$$

or, in center time,

$$
\frac{d\nu_i}{du}
=
\Gamma_B^{\nu}
T_i(u)\cdot F_{i,\mathrm{tot}}^{\nu}(u).
$$

The speed-factor Euler-Lagrange row is equivalent to the speed ODE only if the reduced speed/action sector emits a calibrated operator identity

$$
\Pi_{H,i}^{\nu,*}
R_{\nu,i}^{\mathrm{EL}}
=
\mathcal{M}_{\nu,i}
R_{T,i}^{\nu}.
$$

Here $\Pi_{H,i}^{\nu,*}$ removes the period-normal component $\nu_i^{-2}$ and $\mathcal{M}_{\nu,i}$ is injective on the declared periodic speed-factor subspace after event endpoint jumps have been matched. Therefore

$$
R_{\nu,i}^{\mathrm{EL}}=0
\quad
\text{with the period multiplier}
\quad
\Longleftrightarrow
\quad
R_{T,i}^{\nu}=0
$$

only under all of these rows:

1. $\Gamma_B^{\nu}$ is action-derived or an inertia operator is supplied on the same ledger;
2. the history, support, root, and event derivatives include the bounded-speed clock and root-sheet variations;
3. the period constraint qualification holds or fixed-period variations are explicitly projected;
4. support work and event/Noether-Sea exchange are assigned in the same action;
5. boundary and event terms in $\mathcal{B}^{\nu}$ vanish, cancel, or are ledgered.

Without the calibrated identity, $R_{\nu}^{\mathrm{EL}}$ and $R_T^{\nu}$ are separate rows. A packet may not claim Noether closure from the speed ODE alone.

---

## 4. Speed-Factor Storage And Exchange

The speed-factor storage is

$$
E_{\mathrm{spd},i}^{\nu}(u)
=
\frac12m_{\mathrm{car}}c_f^2
\left(
\nu_i(u)^2-1
\right).
$$

Define the pointwise exchange residual

$$
R_{\mathrm{exch},i}^{\nu}
=
\frac{dE_{\mathrm{spd},i}^{\nu}}{du}
-
E_\epsilon(R_*)
\nu_i
\mathbf{T}_i\cdot
\widetilde{\mathbf{F}}_{i,\mathrm{tot}}^{\nu}
-
\mathcal{P}_{\mathrm{per},i}^{\nu}
-
\mathcal{P}_{\mathrm{band/gauge},i}^{\nu}
-
\mathcal{P}_{\mathrm{supp},i}^{\nu}
-
\mathcal{P}_{\mathrm{sea/event},i}^{\nu}.
$$

For active free-support multipliers,

$$
\mathcal{P}_{\mathrm{supp},i}^{\nu}
=
E_\epsilon(R_*)
\nu_i
\left(
\mu_i^+-\mu_i^-
\right)
\mathbf{n}_i\cdot\mathbf{T}_i.
$$

For a closed fixed-period branch, $\mathcal{P}_{\mathrm{per},i}^{\nu}$ has zero net period work. If the period row is crossed at an event or the common period is reset, the nonzero multiplier work must be assigned to $\mathcal{P}_{\mathrm{sea/event},i}^{\nu}$ or to an explicit endpoint current.

The window exchange residual is

$$
R_{\mathrm{exch}}^{\nu}(W)
=
\sum_i
\left[
E_{\mathrm{spd},i}^{\nu}
\right]_{u_-}^{u_+}
-
\sum_i
\int_{u_-}^{u_+}
\left(
E_\epsilon(R_*)
\nu_i
\mathbf{T}_i\cdot
\widetilde{\mathbf{F}}_{i,\mathrm{tot}}^{\nu}
+
\mathcal{P}_{\mathrm{per},i}^{\nu}
+
\mathcal{P}_{\mathrm{band/gauge},i}^{\nu}
+
\mathcal{P}_{\mathrm{supp},i}^{\nu}
+
\mathcal{P}_{\mathrm{sea/event},i}^{\nu}
\right)du.
$$

When $R_T^{\nu}=0$ and

$$
\Gamma_B^{\nu}
=
\frac{E_\epsilon(R_*)}{m_{\mathrm{car}}c_f^2},
$$

the first two terms cancel after multiplying the tangential row by $m_{\mathrm{car}}c_f^2\nu_i$. The remaining residual is exactly the unledgered constraint, support, and event exchange. Thus nonzero tangential work is admissible only when it is stored in $\nu$ or assigned to named exchange channels.

---

## 5. Noether Identity With Speed And Exchange

Let $\zeta$ be a symmetry generator acting on $\mathbf{Y}$, $\nu$, root sheets, support data, and event variables. The bounded-speed Noether identity is

$$
\delta_{\zeta}
\mathcal{S}_{\mathrm{VN}}^{\nu}
=
\left[
\mathcal{J}_{\zeta}^{\nu}
\right]_{u_-}^{u_+}
+
\int_{u_-}^{u_+}
\sum_i
\left\langle
\mathrm{EL}_{Y,i}^{\nu},
\delta_{\zeta}\mathbf{Y}_i
\right\rangle du
+
\int
\sum_i
\mathrm{EL}_{\nu,i}^{\nu}
\delta_{\zeta}\nu_i
d\lambda
+
\sum_r
\int_{u_-}^{u_+}
\mathrm{EL}_{\eta,r}^{\nu}
\delta_{\zeta}\eta_r
du
+
\mathcal{R}_{\zeta,\mathrm{supp}}^{\nu}
+
\mathcal{R}_{\zeta,\mathrm{exch}}^{\nu}
+
\mathcal{R}_{\zeta,\mathrm{sea/event}}^{\nu}
+
\mathcal{R}_{\zeta,\mathrm{boundary}}^{\nu}.
$$

The current splits as

$$
\mathcal{J}_{\zeta}^{\nu}
=
\mathcal{J}_{\zeta,Y}^{\nu}
+
\mathcal{J}_{\zeta,\mathrm{hist}}^{\nu}
+
\mathcal{J}_{\zeta,\mathrm{spd}}^{\nu}
+
\mathcal{J}_{\zeta,\mathrm{supp}}^{\nu}
+
\mathcal{J}_{\zeta,\mathrm{sea/event}}^{\nu}.
$$

The speed-factor current is

$$
\mathcal{J}_{\zeta,\mathrm{spd}}^{\nu}
=
\sum_i
\pi_{\nu,i}^{\nu}
\delta_{\zeta}\nu_i
-
\zeta^u
\sum_i
E_{\mathrm{spd},i}^{\nu},
\qquad
\pi_{\nu,i}^{\nu}
=
\frac{\partial\mathcal{L}_{\mathrm{speed}}^{\nu}}
{\partial(\partial_u\nu_i)}.
$$

If $\mathcal{L}_{\mathrm{speed}}^{\nu}$ has no $\partial_u\nu_i$ dependence, then $\pi_{\nu,i}^{\nu}=0$, but the energy current still carries $E_{\mathrm{spd}}^{\nu}$ and $R_{\mathrm{exch}}^{\nu}$.

The support residual is

$$
\mathcal{R}_{\zeta,\mathrm{supp}}^{\nu}
=
\frac{R_*E_\epsilon(R_*)}{c_f}
\sum_i
\int_{u_-}^{u_+}
\left(
\mu_i^+D_{\zeta}B_i^+
+
\mu_i^-D_{\zeta}B_i^-
\right)du.
$$

Event and Noether-Sea exchange close the current only when

$$
\mathcal{R}_{\zeta,\mathrm{exch}}^{\nu}
+
\mathcal{R}_{\zeta,\mathrm{supp}}^{\nu}
+
\mathcal{R}_{\zeta,\mathrm{sea/event}}^{\nu}
+
\mathcal{R}_{\zeta,\mathrm{boundary}}^{\nu}
=0
$$

up to the declared error envelope. Quantitatively,

$$
|\mathcal{R}_{\zeta}^{\nu}|
\le
C_{\zeta,Y}\|\mathrm{EL}_{Y}^{\nu}\|
+
C_{\zeta,\nu}\|\Pi_H^{\nu,*}\mathrm{EL}_{\nu}^{\nu}\|
+
C_{\zeta,\eta}\|\mathrm{EL}_{\eta}^{\nu}\|
+
C_{\zeta,\mathrm{exch}}\|R_{\mathrm{exch}}^{\nu}\|
+
C_{\zeta,\mathrm{supp}}\|\mathcal{R}_{\zeta,\mathrm{supp}}^{\nu}\|
+
\epsilon_{\mathrm{curl}}^{\nu}
+
\epsilon_{\mathrm{root}}^{\nu}
+
\epsilon_{\mathrm{tail}}^{\nu}
+
\epsilon_{\mathrm{disc}}^{\nu}
+
\epsilon_{\mathrm{endpoint}}^{\nu}.
$$

This is the conservation row consumed by bounded-speed energy, momentum, angular momentum, source-provenance, and observer-export packets.

---

## 6. Theorem Target

**Theorem target: bounded speed factor variational Noether closure.** Fix one bounded-speed branch chart, one causal-root ledger, one support descriptor, one source-pair policy, one same-source policy, one endpoint convention, one period/winding convention, and one event window. Suppose:

1. the positive speed band makes each $\chi_i$ invertible and the period row satisfies the declared fixed-period or period-constrained convention;
2. active roots satisfy $G_r^{\nu}=0$ with positive delay and Jacobian floors, and root variations are computed on the same bounded-speed ledger;
3. the action $\mathcal{S}_{\mathrm{VN}}^{\nu}$ includes carrier, history, speed, root, support, period, constraint, and event/Noether-Sea rows on the same variables;
4. the period multiplier row is present or the fixed-period projection is explicitly applied;
5. the speed-factor Euler-Lagrange row is calibrated to the tangential speed ODE by $\Pi_H^{\nu,*}R_{\nu}^{\mathrm{EL}}=\mathcal{M}_{\nu}R_T^{\nu}$;
6. support multiplier work, period/band/gauge work, and event/Noether-Sea exchange are included in $R_{\mathrm{exch}}^{\nu}$;
7. the action is invariant under the declared symmetry generator $\zeta$ up to the named support, exchange, event, boundary, tail, root, and discretization residuals.

Then bounded-speed variational stationarity implies the coupled dynamics rows

$$
R_{T}^{\nu}=0,
\qquad
R_{\perp}^{\nu}=0,
\qquad
R_{\nu}^{\mathrm{EL}}=0
\quad
\text{modulo period constraints},
$$

and the Noether current satisfies the quantitative conservation envelope in Section 5. In the zero-error closed-window limit with no unassigned event exchange,

$$
R_{\mathrm{exch}}^{\nu}(W)=0,
\qquad
\left[
\mathcal{J}_{\zeta}^{\nu}
\right]_{u_-}^{u_+}
=0
$$

for each retained symmetry generator $\zeta$.

Proof route:

1. use the speed band to define the causal-time chart and bounded-speed root sheets;
2. apply root and support multipliers before eliminating constrained variables, so their work terms remain visible;
3. convert fixed-period stationarity to a period-multiplier row by the period constraint qualification;
4. identify the projected speed-factor Euler-Lagrange row with the tangential speed ODE through the calibrated operator $\mathcal{M}_{\nu}$;
5. multiply the tangential row by $m_{\mathrm{car}}c_f^2\nu_i$ to obtain the speed-factor storage identity;
6. assign all remaining period, band, support, event, and Noether-Sea powers to $R_{\mathrm{exch}}^{\nu}$;
7. apply Noether's identity on the same root/action/support/event ledger;
8. bound residual current leakage by the Euler-Lagrange, exchange, support, curl, root, tail, discretization, and endpoint errors.

---

## 7. Output Schema

A variational Noether packet must emit:

| Field | Required payload |
| --- | --- |
| `branch_scope` | branch class, source-pair policy, same-source policy, endpoint convention, normalization scale $R_*$, support descriptor, period/winding convention, event window, and finite chart |
| `variation_mode` | `fixed-period` with $D_vH_i^{\nu}=0$ projection, or `period-constrained` with multiplier $\Theta_i$ |
| `period_rows` | $H_i^{\nu}$, $R_{H,i}^{\nu}$ or winding row, multiplier contribution $-\Theta_i/\nu_i^2$, and constraint-qualification status |
| `action_functional` | $\mathcal{S}_{\mathrm{VN}}^{\nu}$ terms on $(\mathbf{Y},\nu,\eta,\mathcal{D}_{\mathrm{supp}},\mu,e)$ and declared inertia or $\Gamma_B^{\nu}$ row |
| `root_support_event_rows` | $G_r^{\nu}$, $\eta_r$, $J_r^{\nu}$ floors, support barriers, support multipliers or variational inequality, and event endpoint rows |
| `speed_factor_el` | $R_{\nu}^{\mathrm{EL}}$, period projection, boundary terms, and derivative columns through clocks, roots, support, and events |
| `speed_ode_equivalence` | $R_T^{\nu}$, calibrated identity $\Pi_H^{\nu,*}R_{\nu}^{\mathrm{EL}}=\mathcal{M}_{\nu}R_T^{\nu}$, injectivity domain, and failure status |
| `storage_exchange` | $E_{\mathrm{spd}}^{\nu}$, $R_{\mathrm{exch}}^{\nu}$, period/band/gauge power, support power, Noether-Sea/event power, and window residual |
| `noether_identity` | symmetry generators, current split, speed-factor current, support residual, event/Noether-Sea exchange, and conservation envelope |
| `fixed_speed_special_case` | explicit $\nu_i\equiv1$ declaration, vanished period/speed/exchange rows, and fixed-speed tangent row recovery |
| `status` | first failed row or `bounded-speed-factor-variational-noether-candidate` |

---

## 8. First-Failure Status Ordering

Report the first failed row in this order:

1. `variational-noether-schema-open`
2. `period-variation-mode-undeclared`
3. `period-row-open`
4. `period-constraint-qualification-fails`
5. `speed-band-failure`
6. `root-ledger-mismatch`
7. `root-jacobian-floor-failure`
8. `action-functional-incomplete`
9. `bounded-speed-action-kinetic-stale`
10. `support-multiplier-missing`
11. `support-work-unledgered`
12. `period-multiplier-row-open`
13. `speed-factor-el-row-open`
14. `speed-el-ode-equivalence-open`
15. `speed-ode-mean-fails`
16. `speed-primitive-mismatch`
17. `speed-clock-length-fails`
18. `bounded-speed-factor-exchange-open`
19. `event-noether-sea-exchange-open`
20. `noether-current-speed-factor-missing`
21. `noether-conservation-envelope-open`
22. `derivative-block-stale`
23. `fixed-speed-special-case`
24. `bounded-speed-factor-variational-noether-candidate`

The fixed-speed special case is not a bounded-speed failure:

$$
\texttt{fixed-speed-special-case}
\Longleftrightarrow
\nu_i\equiv1
\text{ for every site }i.
$$

Current priority status:

$$
\texttt{bounded-speed-factor-variational-noether-open},
\qquad
\texttt{not-retained}.
$$
