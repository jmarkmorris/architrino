# Bounded Speed Factor Proof Stack Impact Map

Promotion status: `priority-only`. This packet maps the bounded speed factor extension across the same-level tri-binary proof stack. It does not retain a branch. It classifies the existing fixed-speed packets as the special case $\nu_i\equiv1$ and states the successor outputs required before a bounded speed factor branch can replace a fixed-speed certificate.

The source equation packet is [variable-speed-factor-extension.md](variable-speed-factor-extension.md). This packet is an impact map: every downstream row that used the fixed-speed clock, fixed-speed Jacobian, fixed-speed tangential residual, or fixed-speed variational equation must either declare

$$
\nu_i\equiv1
$$

or rerun on the bounded speed factor ledger.

---

## 1. Specialization Map

Let the geometric site curves remain arclength-parametrized:

$$
\mathbf{Y}_i:\mathbb{R}/L_i\mathbb{Z}\to\mathbb{R}^3,
\qquad
\|\mathbf{Y}_i'(\lambda_i)\|=1,
\qquad
\mathbf{T}_i=\mathbf{Y}_i',
\qquad
\mathbf{K}_i=\mathbf{Y}_i''.
$$

A bounded speed factor branch adds positive functions

$$
\nu_i(\lambda_i)>0,
\qquad
0<\nu_-\le\nu_i(\lambda_i)\le\nu_+<\infty.
$$

The physical velocity is

$$
\dot{\mathbf{x}}_i(t)
=
c_f\nu_i(\lambda_i(t))\mathbf{T}_i(\lambda_i(t)).
$$

Define the causal-time coordinate

$$
\chi_i(\lambda)
=
\int_0^\lambda
\frac{d\xi}{\nu_i(\xi)}.
$$

Then

$$
\frac{c_ft}{R_*}
=
\chi_i(\lambda_i(t)),
\qquad
\frac{d\lambda_i}{d(c_ft/R_*)}
=
\nu_i(\lambda_i).
$$

The fixed-speed specialization is the submanifold

$$
\mathcal{B}_{\mathrm{fix}}
=
\{\nu_i\equiv1,\ \nu_i'\equiv0,\ \chi_i(\lambda)=\lambda\}.
$$

On $\mathcal{B}_{\mathrm{fix}}$,

$$
\dot{\mathbf{x}}_i=c_f\mathbf{T}_i,
\qquad
\ddot{\mathbf{x}}_i=\frac{c_f^2}{R_*}\mathbf{K}_i,
$$

and every bounded speed factor row below reduces to the fixed-speed arclength row.

Thus existing packets that do not emit $\nu_i$, $\chi_i$, and bounded speed factor derivative data have status

$$
\texttt{fixed-speed-special-case}
$$

relative to this extension. They remain valid only as certificates on $\mathcal{B}_{\mathrm{fix}}$.

| Existing row family | Fixed-speed reading | Bounded speed factor rerun burden |
| --- | --- | --- |
| arclength and unit-speed chart rows | $\chi_i(\lambda)=\lambda$ | emit $\chi_i$, $\chi_i^{-1}$, period/winding row, and $\nu_i$ variation envelopes |
| intrinsic dynamics rows | $\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i=0$ and $\mathbf{K}_i=\Gamma P_i^\perp\widetilde{\mathbf{F}}_i$ | replace tangential closure by speed-factor evolution and normal curvature by $\nu_i^2\mathbf{K}_i$ |
| root/Jacobian rows | $J=1-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}$ | use $J^\nu=1-\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}$ and $\chi_j^{-1}$ source phases |
| tail and Krawczyk rows | derivative envelopes in curve coefficients only | include speed-factor coefficients, inverse-time-map derivatives, and speed-band persistence |
| action and Noether rows | speed is a fixed constraint, so tangential work must vanish | account for speed-factor kinetic, constraint, exchange, and current terms |
| stability rows | perturb only the curve and root delays | perturb the pair $(\mathbf{Y}_i,\nu_i)$ and root phases through $\delta\chi_i$ |
| same-source self rows | ordinary self roots are excluded by chord-arclength and $J_{\mathrm{self}}=0$ | allow only overspeed-hinge self-hit intervals with positive $J^\nu_{\mathrm{self}}$ and event/action rows |

---

## 2. Impacted Row: Time Map

A bounded speed factor successor must replace common arclength time by common causal time

$$
u=\frac{c_ft}{R_*}.
$$

The site phase at causal time $u$ is

$$
\lambda_i(u)=\chi_i^{-1}(u).
$$

The physical period row is

$$
H_i
=
\chi_i(L_i)
=
\int_0^{L_i}\frac{d\xi}{\nu_i(\xi)}.
$$

The equal-period branch row is

$$
H_i=H_*
\qquad
\text{for all }i,
$$

or a declared winding row

$$
m_iH_i=H_{\mathrm{com}},
\qquad
m_i\in\mathbb{N}.
$$

Thus the period residual is

$$
\mathcal{R}_{H,i}=H_i-H_1,
\qquad
i=2,\ldots,6,
$$

not merely $L_i-L_1$. The fixed-speed row is recovered because $\nu_i\equiv1$ gives $H_i=L_i$.

A successor certificate must emit the time-map derivative:

$$
D_{\delta\nu_i}\chi_i(\lambda)
=
-
\int_0^\lambda
\frac{\delta\nu_i(\xi)}{\nu_i(\xi)^2}
d\xi,
$$

and the inverse-map variation at fixed $u$:

$$
D_{\delta\nu_i}\chi_i^{-1}(u)
=
-
\nu_i(\lambda_i(u))D_{\delta\nu_i}\chi_i(\lambda_i(u)).
$$

Without these formulas, every downstream derivative row has status

$$
\texttt{bounded-speed-time-map-derivatives-open}.
$$

---

## 3. Impacted Row: Root And Jacobian

At receiver causal time $u$, let

$$
\lambda_i=\chi_i^{-1}(u),
\qquad
\lambda_j^-=\chi_j^{-1}(u-\eta).
$$

The bounded speed factor root function is

$$
G_{ij}^{\nu}(u,\eta)
=
\left\|
\mathbf{Y}_i(\lambda_i)
-
\mathbf{Y}_j(\lambda_j^-)
\right\|
-\eta.
$$

Write

$$
\mathbf{R}_{ij}^{\nu}
=
\mathbf{Y}_i(\lambda_i)
-
\mathbf{Y}_j(\lambda_j^-),
\qquad
\widehat{\mathbf{R}}_{ij}^{\nu}
=
\frac{\mathbf{R}_{ij}^{\nu}}{\eta}.
$$

Since

$$
\frac{\partial\lambda_j^-}{\partial\eta}
=
-\nu_j(\lambda_j^-),
$$

the root derivative is

$$
\frac{\partial G_{ij}^{\nu}}{\partial\eta}
=
\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_{ij}^{\nu}
-1
=
-J_{ij}^{\nu},
$$

where

$$
J_{ij}^{\nu}
=
1-\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_{ij}^{\nu}.
$$

If the receiver arclength $\lambda_i$ is used as the local coordinate, then

$$
\frac{\partial\lambda_j^-}{\partial\lambda_i}
=
\frac{\nu_j^-}{\nu_i},
$$

and

$$
\frac{\partial G_{ij}^{\nu}}{\partial\lambda_i}
=
\widehat{\mathbf{R}}_{ij}^{\nu}\cdot
\left(
\mathbf{T}_i
-
\frac{\nu_j^-}{\nu_i}\mathbf{T}_j^-
\right).
$$

The fixed-speed root row is exactly the specialization

$$
\nu_i=\nu_j^-=1,
\qquad
G_{ij}^{\nu}=G_{ij},
\qquad
J_{ij}^{\nu}=J_{ij}.
$$

Therefore an old bracket, root-frontier, or root-sheet packet does not certify the bounded speed factor branch unless it recomputes:

$$
G_{ij}^{\nu},
\qquad
J_{ij}^{\nu},
\qquad
D G_{ij}^{\nu},
\qquad
D J_{ij}^{\nu},
\qquad
D\eta_{ij}^{\nu}.
$$

The default failure status is

$$
\texttt{root-jacobian-rerun-required}.
$$

---

## 4. Impacted Row: Force And Dynamics

The force ledger must use the same bounded speed factor root ledger:

$$
\widetilde{\mathbf{F}}_i^{\nu}
=
\sum_{(j,\alpha)\in\mathcal{A}_i^{\nu}}
\sigma_i\sigma_j
\frac{
\widehat{\mathbf{R}}_{ij}^{\nu,\alpha}
}{
(\eta_{ij}^{\nu,\alpha})^2
|J_{ij}^{\nu,\alpha}|
}
+
\widetilde{\mathbf{F}}_{i,\mathrm{self}}^{\nu}
+
\widetilde{\mathbf{F}}_{i,\mathrm{med}}^{\nu}.
$$

Differentiating

$$
\dot{\mathbf{x}}_i=c_f\nu_i\mathbf{T}_i
$$

gives

$$
\ddot{\mathbf{x}}_i
=
\frac{c_f^2}{R_*}
\left(
\nu_i^2\mathbf{K}_i
+
\nu_i\nu_i'\mathbf{T}_i
\right).
$$

Hence the bounded speed factor dynamics residual is

$$
\mathcal{R}_{\mathrm{dyn},i}^{\nu}
=
\nu_i^2\mathbf{K}_i
+
\nu_i\nu_i'\mathbf{T}_i
-
\Gamma_B^{\nu}\widetilde{\mathbf{F}}_i^{\nu}.
$$

Splitting tangent and normal parts gives the two proof rows:

$$
\mathcal{R}_{\mathrm{tan},i}^{\nu}
=
\nu_i\nu_i'
-
\Gamma_B^{\nu}\mathbf{T}_i\cdot
\widetilde{\mathbf{F}}_i^{\nu}
=0,
$$

and

$$
\mathcal{R}_{K,i}^{\nu}
=
\nu_i^2\mathbf{K}_i
-
\Gamma_B^{\nu}P_i^\perp
\widetilde{\mathbf{F}}_i^{\nu}
=0.
$$

The fixed-speed tangential row is not deleted. It is the constrained subcase:

$$
\nu_i\equiv1
\quad\Longrightarrow\quad
\mathcal{R}_{\mathrm{tan},i}^{\nu}
=
-\Gamma_B\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i.
$$

Thus a nonzero tangential force projection is admissible only when it is balanced by $\nu_i\nu_i'$ and carried by the action/Noether ledger. A dynamics packet that reports only

$$
\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i\ne0
$$

without an emitted $\nu_i$ evolution row has status

$$
\texttt{speed-factor-exchange-unledgered}.
$$

---

## 5. Impacted Row: Action And Noether

A bounded speed factor branch must declare whether $\nu_i$ is:

| Speed-factor status | Meaning |
| --- | --- |
| `dynamical` | $\nu_i$ is varied in the branch action and has an Euler-Lagrange row |
| `constrained` | $\nu_i$ is determined by a constraint row, multiplier, and speed-band budget |
| `prescribed-diagnostic` | $\nu_i$ is fitted or imposed and cannot support conservation or retention |
| `fixed-speed-special-case` | $\nu_i\equiv1$ and the old fixed-speed rows apply |

The total action must be lifted from

$$
\mathcal{S}_{\mathrm{tot}}
=
\mathcal{S}_{\mathrm{car}}
+
\mathcal{S}_{\mathrm{hist}}
+
\mathcal{S}_{\mathrm{constraints}}
+
\mathcal{S}_{\mathrm{sea/event}}
$$

to a bounded speed factor action

$$
\mathcal{S}_{\mathrm{tot}}^{\nu}
=
\mathcal{S}_{\mathrm{car}}^{\nu}
+
\mathcal{S}_{\mathrm{hist}}^{\nu}
+
\mathcal{S}_{\mathrm{speed}}^{\nu}
+
\mathcal{S}_{\mathrm{constraints}}^{\nu}
+
\mathcal{S}_{\mathrm{sea/event}}^{\nu}.
$$

At minimum the carrier energy row must account for

$$
K_i^{\nu}
=
\frac12m_i c_f^2\nu_i^2,
$$

or replace the scalar mass row by an explicitly declared inertia operator. The work one-form must include both curve and speed-factor columns:

$$
\omega^{\nu}
=
\sum_i
\left\langle
\mathcal{R}_{\mathrm{dyn},i}^{\nu},
\delta\mathbf{Y}_i
\right\rangle
+
\sum_i
\mathcal{R}_{\nu,i}\delta\nu_i.
$$

The exactness row becomes

$$
d\omega^{\nu}=0
\qquad
\text{up to }
\epsilon_{\mathrm{curl}}^{\nu}.
$$

The Noether identity must carry the speed-factor current:

$$
\delta_{\xi}\mathcal{S}_{\mathrm{tot}}^{\nu}
=
\left[
\mathcal{J}_{\xi}^{\nu}
\right]_{t_-}^{t_+}
+
\int_{t_-}^{t_+}
\left\langle
\mathrm{EL}_{Y}^{\nu},
\delta_{\xi}Y
\right\rangle dt
+
\int_{t_-}^{t_+}
\left\langle
\mathrm{EL}_{\nu},
\delta_{\xi}\nu
\right\rangle dt
+
\mathcal{R}_{\xi,\mathrm{sea}}^{\nu}
+
\mathcal{R}_{\xi,\mathrm{boundary}}^{\nu}.
$$

The quantitative conservation bound must therefore include a speed-factor error term:

$$
|\mathcal{R}_{\xi}^{\nu}|
\le
C_{\xi,Y}\|\mathrm{EL}_{Y}^{\nu}\|
+
C_{\xi,\nu}\|\mathrm{EL}_{\nu}\|
+
\epsilon_{\mathrm{curl}}^{\nu}
+
\epsilon_{\mathrm{tail}}^{\nu}
+
\epsilon_{\mathrm{disc}}^{\nu}
+
\epsilon_{\mathrm{endpoint}}^{\nu}.
$$

If the successor uses a fitted $\nu_i$ or fitted $\Gamma_K$ without this action row, the status is

$$
\texttt{bounded-speed-action-not-derived}.
$$

---

## 6. Impacted Row: Tail And Krawczyk

The geometric support bound still gives

$$
G_{ij}^{\nu}(u,\eta)=0
\quad\Longrightarrow\quad
\eta
=
\left\|
\mathbf{Y}_i(\lambda_i)
-
\mathbf{Y}_j(\lambda_j^-)
\right\|
\le
2r_{\max},
$$

so the root-support upper bound in $\eta$ is unchanged. What changes is the root map inside every active and tail slab.

For a finite-dimensional solve, let

$$
x=(\alpha,v,\Gamma)
$$

where $\alpha$ are curve coefficients and $v$ are speed-factor coefficients. A bounded speed factor support-complete residual has the form

$$
F^{\nu}(x)
=
\begin{bmatrix}
\mathcal{R}_{H}^{\nu}\\
\mathcal{R}_{\mathrm{tan}}^{\nu}\\
\mathcal{R}_{K}^{\nu}\\
\mathcal{R}_{\Gamma}^{\nu}\\
\mathcal{R}_{\mathrm{curl}}^{\nu}
\end{bmatrix},
$$

with the row selection declared before the SVD or Krawczyk split.

The Krawczyk chart radius must now satisfy

$$
\rho_{\mathrm{chart}}^{\nu}
=
\min
\left\{
\rho_{\mathrm{root}}^{\nu},
\rho_J^{\nu},
\rho_{\mathrm{tail}}^{\nu},
\rho_d,
\rho_s,
\rho_H^{\nu},
\rho_{\nu},
\rho_{\chi},
\rho_{\Gamma}^{\nu},
\rho_{\mathrm{curl}}^{\nu},
\rho_{\mathrm{disc}}^{\nu}
\right\}.
$$

The new radii mean:

| Radius | Required bounded speed factor margin |
| --- | --- |
| $\rho_H^{\nu}$ | equal physical periods or winding periods persist |
| $\rho_{\nu}$ | $0<\nu_-<\nu_i<\nu_+$ persists on the coefficient box |
| $\rho_{\chi}$ | $\chi_i^{-1}$ exists with bounded derivative and interval enclosure |
| $\rho_{\mathrm{root}}^{\nu}$ | root brackets and excluded gaps persist for $G^{\nu}$ |
| $\rho_J^{\nu}$ | $|J^{\nu}|>\epsilon_J$ persists |
| $\rho_{\mathrm{tail}}^{\nu}$ | tail slabs remain root-free or root-assimilated for $G^{\nu}$ |

The Krawczyk row is then unchanged in form:

$$
Y^{\nu}=\|C F_R^{\nu}(0)\|,
\qquad
Z^{\nu}
=
\sup_{\|h\|\le\rho}
\|I-CDF_R^{\nu}(h)\|,
$$

and the range certificate requires

$$
Y^{\nu}+Z^{\nu}\rho<\rho,
\qquad
Z^{\nu}<1.
$$

But an old value of $Y$, $Z$, or $\rho_{\mathrm{chart}}$ computed at fixed speed has status

$$
\texttt{bounded-speed-krawczyk-stale}.
$$

---

## 7. Impacted Row: Stability

The root-dependent variational equation must perturb both the curve and the bounded speed factor:

$$
(\xi_i,\zeta_i)
=
(\delta\mathbf{Y}_i,\delta\nu_i).
$$

At fixed causal time $u$, define

$$
\delta\chi_i(\lambda)
=
-
\int_0^\lambda
\frac{\zeta_i(\xi)}{\nu_i(\xi)^2}
d\xi.
$$

For a retained bounded speed factor root $a=(i,j,u,\eta_a)$, the phase variations are

$$
\delta\lambda_i
=
-\nu_i\delta\chi_i(\lambda_i),
$$

and

$$
\delta\lambda_j^-
=
-\nu_j^-\delta\eta_a
-\nu_j^-\delta\chi_j(\lambda_j^-).
$$

The root-delay variation is therefore

$$
\delta\eta_a[\xi,\zeta]
=
\frac{
\widehat{\mathbf{R}}_a\cdot
\left[
\xi_i
-
\xi_j^-
-
\nu_i\mathbf{T}_i\delta\chi_i
+
\nu_j^-\mathbf{T}_j^-\delta\chi_j^-
\right]
}{
J_a^{\nu}
}.
$$

This replaces the fixed-speed formula with denominator $J_a$ and no $\delta\chi$ terms.

The linearized dynamics operator must include speed-factor variations:

$$
\delta
\left(
\nu_i^2\mathbf{K}_i
+
\nu_i\nu_i'\mathbf{T}_i
\right)
=
2\nu_i\zeta_i\mathbf{K}_i
+
\nu_i^2\delta\mathbf{K}_i
+
(\zeta_i\nu_i'+\nu_i\zeta_i')\mathbf{T}_i
+
\nu_i\nu_i'\delta\mathbf{T}_i.
$$

Thus the bounded speed factor stability operator has the schematic form

$$
\mathcal{L}_{\mathrm{stab}}^{\nu}(\xi,\zeta)
=
\delta
\left(
\nu^2K+\nu\nu'T
\right)
-
D\Gamma_B^{\nu}[\xi,\zeta]\widetilde{\mathbf{F}}^{\nu}
-
\Gamma_B^{\nu}D\widetilde{\mathbf{F}}^{\nu}[\xi,\zeta].
$$

A Floquet or monodromy packet that freezes roots, omits $\zeta_i$, or computes the fixed-speed operator has status

$$
\texttt{bounded-speed-stability-stale}.
$$

Gauge and neutral-mode quotients must also declare whether any speed-factor direction is gauge, physical neutral freedom, constrained exchange, or instability.

---

## 8. Impacted Row: Self-Hit

For an ordinary same-source row $i=j$, let $\lambda^-<\lambda$ denote the earlier phase on a non-winding segment and put

$$
h=\lambda-\lambda^-.
$$

The bounded speed factor elapsed causal distance is

$$
\eta
=
\int_{\lambda^-}^{\lambda}
\frac{d\xi}{\nu_i(\xi)}.
$$

Define the overspeed excess and chord deficit:

$$
\mathcal{A}_i(\lambda^-,\lambda)
=
\int_{\lambda^-}^{\lambda}
\left(
1-\frac{1}{\nu_i(\xi)}
\right)d\xi,
$$

and

$$
\mathcal{D}_i(\lambda^-,\lambda)
=
h-
\left\|
\mathbf{Y}_i(\lambda)
-
\mathbf{Y}_i(\lambda^-)
\right\|.
$$

The ordinary self-hit hinge is

$$
\mathcal{A}_i(\lambda^-,\lambda)
=
\mathcal{D}_i(\lambda^-,\lambda).
$$

The bounded speed factor same-source Jacobian is

$$
J_{\mathrm{self}}^{\nu}
=
1-\nu_i(\lambda^-)\mathbf{T}_i(\lambda^-)\cdot\widehat{\mathbf{R}}_{\mathrm{self}}.
$$

An ordinary same-source delayed root is admissible only on a declared event interval

$$
\mathcal{H}_i
=
\{
\lambda:
\mathcal{A}_i=\mathcal{D}_i,\
J_{\mathrm{self}}^{\nu}\ge J_{\mathrm{self},0}>0
\}.
$$

The event interval must satisfy

$$
\operatorname{dur}_t(\mathcal{H}_i)
\le
\tau_{\mathrm{hit}},
$$

and

$$
\int_{\mathcal{H}_i}
(\nu_i-1)_+\,d\lambda
\le
B_{\mathrm{hit}}.
$$

When $\nu_i\equiv1$,

$$
\mathcal{A}_i=0,
\qquad
\mathcal{D}_i\ge0,
$$

and equality forces the fixed-speed zero-Jacobian case from [same-source-self-root-exclusion-lemma.md](same-source-self-root-exclusion-lemma.md). Therefore every fixed-speed self-hit packet is a $\nu_i\equiv1$ special case, not an admissible ordinary self-hit under the bounded speed factor row.

Allowed self-row statuses are:

| Status | Required proof content |
| --- | --- |
| `absent-by-policy` | no ordinary same-source force enters the ledger |
| `fixed-speed-self-root-excluded` | $\nu_i\equiv1$ and the chord-arclength lemma controls |
| `bounded-speed-self-hit-candidate` | overspeed hinge, positive $J_{\mathrm{self}}^{\nu}$ floor, duration, budget, action, and event rows pass |
| `regularized-fold-layer` | non-ordinary same-source contribution with its own regulator, action, and event ledger |
| `self-hit-mode-unledgered` | a self-hit appears without all bounded speed factor admissibility rows |

---

## 9. Impact Theorem Target

**Theorem target: bounded speed factor proof-stack lift.** Fix one same-level tri-binary branch class, one source-pair policy, one same-source policy, one support scale $R_*$, one finite-mode chart, and one bounded speed factor basis. Suppose:

1. $0<\nu_-\le\nu_i\le\nu_+$ and $\chi_i^{-1}$ exists on the full event interval;
2. equal physical periods or declared winding periods pass;
3. the active and tail root ledgers use $G^{\nu}$, $J^{\nu}$, and derivative envelopes including $D\nu$ and $D\chi^{-1}$;
4. the force ledger uses the same bounded speed factor root labels and Jacobians;
5. $\mathcal{R}_{\mathrm{tan}}^{\nu}=0$ and $\mathcal{R}_{K}^{\nu}=0$ close with an action-derived $\Gamma_B^{\nu}$ or declared inertia operator;
6. the action/curl/Noether rows vary both $\mathbf{Y}_i$ and $\nu_i$ and include speed-factor current and error terms;
7. the Krawczyk or Newton proof budget is recomputed on the expanded coefficient vector $(\alpha,v,\Gamma)$;
8. stability uses the root-dependent variational equation for $(\xi,\zeta)$;
9. every same-source row is absent, fixed-speed-excluded, regularized, or bounded-speed-self-hit certified.

Then the packet is a bounded speed factor dynamics/action candidate on the declared ledger. It is not retained until the master retention theorem is rerun on the same bounded speed factor ledger.

Conversely, if a packet sets

$$
\nu_i\equiv1
$$

and satisfies the old fixed-speed rows, then it is a valid fixed-speed special case but supplies no certificate for neighboring bounded speed factor branches with $\nu_i\ne1$.

Proof route:

1. positivity of $\nu_i$ gives a regular causal-time coordinate;
2. differentiating $\chi_j(\lambda_j^-)=u-\eta$ gives $J^{\nu}$ and root-sheet derivatives;
3. differentiating $\dot{\mathbf{x}}_i=c_f\nu_i\mathbf{T}_i$ gives the tangent and normal dynamics rows;
4. adding $\nu_i$ columns to the action one-form decides whether tangential work is physical exchange or a fitted residual;
5. bounded root/Jacobian, speed-band, time-map, and tail radii give the Krawczyk chart;
6. the root-dependent $(\xi,\zeta)$ variational equation gives the stability handoff;
7. the overspeed hinge is the only ordinary same-source route not excluded by the fixed-speed lemma.

---

## 10. Successor Output Schema

A bounded speed factor successor packet must emit:

| Field | Required payload |
| --- | --- |
| `branch_scope` | branch class, source-pair policy, same-source policy, support scale $R_*$, endpoint convention, finite-mode chart, and coefficient box |
| `specialization_status` | `bounded-speed-factor` or `fixed-speed-special-case` with explicit $\nu_i\equiv1$ declaration |
| `speed_factor` | $\nu_i(\lambda)$, coefficient vector $v$, $\nu_-$, $\nu_+$, $\nu_i'$, speed-band margins, and whether $\nu_i$ is dynamical, constrained, prescribed, or fixed |
| `time_map` | $\chi_i$, $\chi_i^{-1}$, $D\chi_i$, $D\chi_i^{-1}$, $H_i$, $\mathcal{R}_H$, and winding/equal-period status |
| `root_jacobian` | $G_{ij}^{\nu}$, $J_{ij}^{\nu}$, root brackets, excluded gaps, $D\eta^{\nu}$, $DJ^{\nu}$, noncollision floors, and source-pair completeness |
| `force_ledger` | $\mathcal{A}_i^{\nu}$, $\widetilde{\mathbf{F}}_i^{\nu}$, self/fold/medium terms, and Jacobian-weighted force sums |
| `dynamics_rows` | $\mathcal{R}_{\mathrm{tan}}^{\nu}$, $\mathcal{R}_{K}^{\nu}$, row weights, residual norms, and tolerance bounds |
| `action_noether` | $\mathcal{S}_{\mathrm{tot}}^{\nu}$, $\Gamma_B^{\nu}$ or inertia operator, $\omega^{\nu}$, curl row, speed-factor Euler-Lagrange row, Noether currents, and conservation error envelope |
| `tail_krawczyk` | support bound, tail slabs for $G^{\nu}$, coefficient-box persistence, $\rho_{\mathrm{chart}}^{\nu}$, $Y^{\nu}$, $Z^{\nu}$, range enclosure, and cokernel audit |
| `stability` | $(\xi,\zeta)$ variational operator, root-delay variation with $\delta\chi$, return section, neutral quotient, current leaf, and monodromy spectrum |
| `self_hit` | same-source policy, hinge intervals, $J_{\mathrm{self}}^{\nu}$ floors, $\tau_{\mathrm{hit}}$, $B_{\mathrm{hit}}$, return-to-baseline row, action entries, and event entries |
| `fixed_speed_comparison` | list of reused fixed-speed packets and the exact reason each is only a $\nu_i\equiv1$ special case or has been rerun |
| `status` | first failed row or one of `fixed-speed-special-case`, `bounded-speed-row-open`, `bounded-speed-dynamics-action-candidate`, `bounded-speed-retention-rerun-required`, `self-hit-mode-unledgered`, `not-retained` |

Minimal machine-check status implications:

$$
\texttt{bounded-speed-dynamics-action-candidate}
\Longrightarrow
\texttt{time-map-rerun-complete}
\wedge
\texttt{root-jacobian-rerun-complete}
\wedge
\texttt{force-dynamics-rerun-complete}
\wedge
\texttt{action-noether-rerun-complete}
\wedge
\texttt{tail-krawczyk-rerun-complete}.
$$

and

$$
\texttt{fixed-speed-special-case}
\Longleftrightarrow
\left[
\nu_i\equiv1
\text{ for every site }i
\right].
$$

Current status:

$$
\texttt{bounded-speed-row-open},
\qquad
\texttt{fixed-speed-packets-classified-as-special-cases},
\qquad
\texttt{not-retained}.
$$
