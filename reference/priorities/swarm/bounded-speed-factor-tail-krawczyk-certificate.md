# Bounded Speed Factor Tail Krawczyk Certificate

Promotion status: `priority-only`. This packet is the bounded speed factor successor to the fixed-speed support-tail and Krawczyk rows in [support-complete-m3-tail-resolution-protocol.md](support-complete-m3-tail-resolution-protocol.md), [support-complete-m3-tail-newton-certificate.md](support-complete-m3-tail-newton-certificate.md), [support-complete-m3-tail-margin-sensitivity.md](support-complete-m3-tail-margin-sensitivity.md), and [support-complete-m3-krawczyk-proof-budget.md](support-complete-m3-krawczyk-proof-budget.md). It uses the bounded speed factor root-sheet formulas from [bounded-speed-factor-root-sheet-certificate.md](bounded-speed-factor-root-sheet-certificate.md) and exports usable tail radii only after the finite-cover predicate in [bounded-speed-factor-tail-cover-completeness-lemma.md](bounded-speed-factor-tail-cover-completeness-lemma.md) closes.

It does not retain a branch. Its purpose is to state the causal-time support-tail predicates and the Krawczyk proof-budget radii that must replace the fixed-speed arclength rows before a bounded speed factor continuation can be certified.

The fixed-speed packets are recovered only in the special case

$$
\nu_i\equiv1.
$$

---

## 1. Causal-Time Tail Coordinates

Let the geometric curves remain arclength-parametrized:

$$
\mathbf{Y}_i:\mathbb{R}/L_i\mathbb{Z}\to\mathbb{R}^3,
\qquad
\|\mathbf{Y}_i'(\lambda_i)\|=1.
$$

A bounded speed factor row supplies positive functions

$$
0<\nu_-\le\nu_i(\lambda_i)\le\nu_+<\infty
$$

and the causal-time coordinate

$$
\chi_i(\lambda_i)
=
\int_0^{\lambda_i}
\frac{d\xi}{\nu_i(\xi)}.
$$

Write

$$
\Lambda_i(u)=\chi_i^{-1}(u),
\qquad
\frac{d\Lambda_i}{du}=\nu_i(\Lambda_i(u)).
$$

The equal-period row is no longer equal arclength. It is

$$
H_i
=
\chi_i(L_i)
=
\int_0^{L_i}
\frac{d\lambda}{\nu_i(\lambda)},
$$

with either

$$
H_i=H_*
\qquad\text{for every }i,
$$

or a declared winding relation

$$
m_iH_i=H_{\mathrm{com}},
\qquad
m_i\in\mathbb{N}.
$$

For a receiver causal-time cell $U_p=[u_p^-,u_p^+]$, ordered source pair $(i,j)$, and delay slab

$$
Q_q=[a_q,b_q]
\subset
T_{\mathrm{tail}}^{\nu},
$$

define the causal-time tail slab

$$
\mathcal{Q}_{p,q}^{\nu}=U_p\times Q_q.
$$

The bounded speed factor support tail uses the same geometric support upper bound in delay,

$$
T_{\mathrm{tail}}^{\nu}
=
(\eta_{\mathrm{mem}},\,B_{\mathrm{sup}}+m_\eta],
$$

because any root still satisfies $\eta=\|\mathbf{R}\|$ and the support distance is geometric. What changes is the source phase inside the root map. On a slab,

$$
\lambda_i=\Lambda_i(u),
\qquad
\lambda_j^-=\Lambda_j(u-\eta),
$$

so the root function is

$$
G_{ij}^{\nu}(u,\eta)
=
\left\|
\mathbf{Y}_i(\Lambda_i(u))
-
\mathbf{Y}_j(\Lambda_j(u-\eta))
\right\|
-\eta.
$$

If either $\Lambda_i(U_p)$ or $\Lambda_j(U_p-Q_q)$ crosses a period cut, the slab must be split into non-wrapping pieces before interval evaluation. An atomic bounded-speed tail cell is therefore

$$
c=(i,j,p,q,s),
\qquad
\mathcal{Q}_c^{\nu}=U_{p,s}\times Q_{q,s},
$$

where $s$ records the period-cut and interval-subdivision piece.

---

## 2. Bounded-Speed Jacobian And Slab Predicates

On an atomic cell define

$$
\mathbf{R}^{\nu}
=
\mathbf{Y}_i(\Lambda_i(u))
-
\mathbf{Y}_j(\Lambda_j(u-\eta)),
\qquad
\widehat{\mathbf{R}}^{\nu}
=
\frac{\mathbf{R}^{\nu}}{\|\mathbf{R}^{\nu}\|}.
$$

With

$$
\mathbf{T}_j^-=\mathbf{Y}_j'(\Lambda_j(u-\eta)),
\qquad
\nu_j^-=\nu_j(\Lambda_j(u-\eta)),
$$

the delay derivative is

$$
\partial_\eta\Lambda_j(u-\eta)=-\nu_j^-,
$$

and the bounded-speed root Jacobian is

$$
J_{ij}^{\nu}
=
1-\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}^{\nu},
\qquad
\partial_\eta G_{ij}^{\nu}=-J_{ij}^{\nu}.
$$

Every atomic cell must receive exactly one terminal status:

| Status | Predicate |
| --- | --- |
| `bounded-speed-tail-cell-empty-distance` | interval distance excludes $G_{ij}^{\nu}=0$ |
| `bounded-speed-tail-cell-empty-monotone` | fixed $J_{ij}^{\nu}$ sign and endpoint signs exclude $G_{ij}^{\nu}=0$ |
| `bounded-speed-tail-cell-empty-lipschitz` | point value plus Lipschitz radius excludes $G_{ij}^{\nu}=0$ |
| `bounded-speed-tail-cell-empty-newton` | interval Newton image is disjoint from the delay slab |
| `bounded-speed-tail-root-tube-krawczyk` | one differentiable tail root sheet is included and assimilated |
| `bounded-speed-tail-cell-uncertified` | no exclusion or assimilation predicate passed |

For distance exclusion, compute

$$
D_c^{\nu}=[D_c^-,D_c^+]
\supset
\left\{
\left\|
\mathbf{Y}_i(\Lambda_i(u))
-
\mathbf{Y}_j(\Lambda_j(u-\eta))
\right\|
:
(u,\eta)\in\mathcal{Q}_c^{\nu}
\right\}.
$$

The cell is root-free if

$$
D_c^+<a_q-\epsilon_G
\qquad\text{or}\qquad
D_c^->b_q+\epsilon_G.
$$

For monotone exclusion, compute

$$
J_c^{\nu}=[J_c^-,J_c^+]
\supset
\left\{
J_{ij}^{\nu}(u,\eta):
(u,\eta)\in\mathcal{Q}_c^{\nu}
\right\}.
$$

If

$$
J_c^->\epsilon_J
\qquad\text{or}\qquad
J_c^+<-\epsilon_J,
$$

then $G_{ij}^{\nu}$ is monotone in $\eta$ on the cell. Let

$$
G_a^{\nu}(U_p)=G_{ij}^{\nu}(U_p,a_q),
\qquad
G_b^{\nu}(U_p)=G_{ij}^{\nu}(U_p,b_q)
$$

be outward-rounded interval values over the receiver cell. The cell is empty when both endpoint intervals are strictly positive with margin,

$$
\inf G_a^{\nu}(U_p)>\epsilon_G,
\qquad
\inf G_b^{\nu}(U_p)>\epsilon_G,
$$

or both are strictly negative with margin,

$$
\sup G_a^{\nu}(U_p)<-\epsilon_G,
\qquad
\sup G_b^{\nu}(U_p)<-\epsilon_G.
$$

For Lipschitz exclusion, choose $z_c=(u_c,\eta_c)\in\mathcal{Q}_c^{\nu}$ and certify

$$
|\nabla_{u,\eta}G_{ij}^{\nu}|\le L_c^{\nu}
\qquad
\text{on }\mathcal{Q}_c^{\nu}.
$$

If $\Delta_c$ is the radius of $\mathcal{Q}_c^{\nu}$ in the declared rectangle norm, and

$$
\operatorname{dist}\big(0,G_{ij}^{\nu}(z_c)\big)
>
L_c^{\nu}\Delta_c+\epsilon_G,
$$

then the cell is empty.

For Newton exclusion, define

$$
N_{U,Q}^{\nu}(\eta_c)
=
\eta_c+
\frac{G_{ij}^{\nu}(U_p,\eta_c)}
{J_{ij}^{\nu}(U_p,Q_q)}.
$$

The signs follow from $\partial_\eta G_{ij}^{\nu}=-J_{ij}^{\nu}$. If

$$
N_{U,Q}^{\nu}(\eta_c)\cap Q_q=\varnothing,
$$

then no root sheet crosses $U_p\times Q_q$.

---

## 3. Tail Root-Tube Assimilation

If a tail root is present, the bounded-speed successor does not add a point root. It adds a causal-time root tube. Let a candidate tube be represented as

$$
\eta=\eta_p(u)+z,
\qquad
z\in Z=[-w,w].
$$

At a node root $(u_p,\eta_p)$ the natural first predictor slope is

$$
s_p^{\nu}
=
\frac{
\widehat{\mathbf{R}}^{\nu}\cdot
\left(
\nu_i\mathbf{T}_i-\nu_j^-\mathbf{T}_j^-
\right)
}{
J_{ij}^{\nu}
},
$$

so one may take

$$
\eta_p(u)=\eta_p+s_p^{\nu}(u-u_p)
$$

before interval correction. Define

$$
H_u^{\nu}(u,z)
=
G_{ij}^{\nu}(u,\eta_p(u)+z).
$$

Its correction derivative is

$$
\partial_zH_u^{\nu}=-J_{ij}^{\nu}(u,\eta_p(u)+z).
$$

Choose a scalar preconditioner

$$
C=-\frac{1}{J_*},
\qquad
J_*\in J_{U,Z}^{\nu},
\qquad
|J_*|>0,
$$

where

$$
J_{U,Z}^{\nu}
\supset
\left\{
J_{ij}^{\nu}(u,\eta_p(u)+z):
u\in U_p,\ z\in Z
\right\}.
$$

The bounded-speed Krawczyk tube image is

$$
K_Z^{\nu}
=
-C\,H_u^{\nu}(U_p,0)
+
\left(1+CJ_{U,Z}^{\nu}\right)Z.
$$

The tube predicate passes when

$$
K_Z^{\nu}\subset\operatorname{int}Z.
$$

It certifies a unique correction $z(u)$, hence a unique tail sheet

$$
\eta_u(u)=\eta_p(u)+z(u)
$$

over the receiver causal-time cell. Assimilation is valid only when the ledger also emits:

| Field | Required bounded-speed payload |
| --- | --- |
| `root_tube_label` | ordered source pair, causal-time cell, delay slab, subdivision, and antipodal mate when imposed |
| `tube_interval` | interval enclosing $\eta_u(U_p)$ |
| `jacobian_sign_stratum` | fixed $\zeta_u=\operatorname{sign}J_{ij}^{\nu}$ with $\zeta_uJ_{ij}^{\nu}\ge J_u^->\epsilon_J$ |
| `tube_gap` | excluded-gap lower bound on $\mathcal{Q}_c^{\nu}\setminus\mathcal{T}_u^{\nu}$ |
| `tube_separation` | separation from active tubes, other tail tubes, slab boundaries, and period cuts |
| `sheet_variation` | derivative row using $\chi_i^{-1}$ and speed-factor variations |

The assimilated force contribution uses the same bounded-speed root label:

$$
\mathbf{f}_u^{\nu}(u)
=
\frac{\sigma_i\sigma_{j(u)}}
{\eta_u(u)^2|J_u^{\nu}(u)|}
\widehat{\mathbf{R}}_u^{\nu}(u).
$$

Thus a tail-root assimilation status replaces the force ledger by

$$
\widetilde{\mathbf{F}}_i^{\nu,+}(u)
=
\widetilde{\mathbf{F}}_i^{\nu,\mathrm{act}}(u)
+
\sum_{r\in\mathcal{U}_i^{\nu,\mathrm{tail}}(u)}
\mathbf{f}_r^{\nu}(u).
$$

The old fixed-speed active-window force is stale after this status unless it is recomputed with the same $\chi_i^{-1}$, $J_{ij}^{\nu}$, and bounded speed factor derivative data.

---

## 4. Bounded-Speed Tail Persistence Radii

Let the finite-dimensional bounded-speed chart be

$$
x=(a,b,\gamma),
$$

where $a$ are curve coefficients, $b$ are speed-factor coefficients, and $\gamma$ is the dynamics scale. A perturbation is

$$
h=(\delta a,\delta b,\delta\gamma).
$$

For the speed component write

$$
\delta\nu_i(\lambda)=D_h\nu_i(\lambda).
$$

At fixed arclength,

$$
D_h\chi_i(\lambda)
=
-
\int_0^\lambda
\frac{\delta\nu_i(\xi)}{\nu_i(\xi)^2}
d\xi.
$$

At fixed causal time,

$$
D_h\Lambda_i(u)
=
-
\nu_i(\Lambda_i(u))
D_h\chi_i(\Lambda_i(u)).
$$

For a fixed-delay tail predicate, not a retained root sheet, there is no $D_h\eta$ term. Define the clock-corrected variations

$$
\Xi_i(u)
=
D_h\mathbf{Y}_i(\lambda_i)
+
\mathbf{T}_i(\lambda_i)D_h\Lambda_i(u),
\qquad
\lambda_i=\Lambda_i(u),
$$

and

$$
\Xi_j^-(u,\eta)
=
D_h\mathbf{Y}_j(\lambda_j^-)
+
\mathbf{T}_j(\lambda_j^-)D_h\Lambda_j(u-\eta),
\qquad
\lambda_j^-=\Lambda_j(u-\eta).
$$

Then

$$
D_hG_{ij}^{\nu}
=
\widehat{\mathbf{R}}^{\nu}\cdot
\left(
\Xi_i-\Xi_j^-
\right).
$$

The Jacobian variation must also include $D_h\nu_j^-$:

$$
D_hJ_{ij}^{\nu}
=
-
D_h(\nu_j^-)\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}^{\nu}
-
\nu_j^-D_h\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}^{\nu}
-
\nu_j^-\mathbf{T}_j^-\cdot D_h\widehat{\mathbf{R}}^{\nu}.
$$

If a selected empty predicate has margin $m_{\emptyset}^{\nu}(c)$, certified numerical error $e_{\emptyset}^{\nu}(c)$, and chart-sensitivity bound

$$
|D_h m_{\emptyset}^{\nu}(c)|
\le
L_{\emptyset,c}^{\nu,x}\|h\|,
$$

then its persistence radius is

$$
\rho_{\emptyset,c}^{\nu}
=
\frac{
m_{\emptyset}^{\nu}(c)-e_{\emptyset}^{\nu}(c)
}{
L_{\emptyset,c}^{\nu,x}
}.
$$

For a Newton-excluded cell,

$$
\rho_{\mathrm{Newt},c}^{\nu}
=
\frac{
m_{\mathrm{Newt}}^{\nu}(c)-e_{\mathrm{Newt}}^{\nu}(c)
}{
L_{\mathrm{Newt},c}^{\nu,x}
}.
$$

For an assimilated Krawczyk tube,

$$
\rho_{\mathrm{Kraw},u}^{\nu}
=
\frac{
m_{\mathrm{Kraw}}^{\nu}(u)-e_{\mathrm{Kraw}}^{\nu}(u)
}{
L_{\mathrm{Kraw},u}^{\nu,x}
},
$$

and the root-tube persistence radius is

$$
\rho_{\mathrm{tube},u}^{\nu}
=
\frac{
m_{\mathrm{root}}^{\nu}(u)-e_{\mathrm{tube}}^{\nu}(u)
}{
L_{\mathrm{tube},u}^{\nu,x}
}.
$$

Every numerator must be positive. A nonpositive numerator gives the status

$$
\texttt{bounded-speed-tail-pointwise-only}.
$$

The bounded-speed local tail persistence radius is

$$
\rho_{\mathrm{tail}}^{\nu}
=
\min
\left\{
\rho_{\emptyset,c}^{\nu},
\rho_{\mathrm{Newt},c}^{\nu},
\rho_{\mathrm{Kraw},u}^{\nu},
\rho_{\mathrm{tube},u}^{\nu}
\right\},
$$

where the minimum ranges only over predicates selected in the terminal tail ledger. This local radius is exportable only when the terminal ledger is a complete owned finite cover with no gaps, no duplicate ownership, overlap consistency, and coefficient-box persistence. Equivalently, the exported radius must satisfy

$$
\rho_{\mathrm{tail}}^{\nu}
\le
\rho_{\mathrm{cover}}^{\nu}
$$

from [bounded-speed-factor-tail-cover-completeness-lemma.md](bounded-speed-factor-tail-cover-completeness-lemma.md). If any terminal cell lacks a positive radius, or if the global cover row is absent, the Krawczyk chart must set

$$
\rho_{\mathrm{tail}}^{\nu}=0
$$

and return

$$
\texttt{bounded-speed-tail-cover-incomplete}.
$$

---

## 5. Speed-Band And Period Margins

The Krawczyk chart also needs margins for the bounded speed factor itself. The speed-band margin is

$$
m_{\mathrm{band}}
=
\min_i
\min
\left\{
\inf_\lambda(\nu_i(\lambda)-\nu_-),
\inf_\lambda(\nu_+-\nu_i(\lambda))
\right\}.
$$

If

$$
|D_h\nu_i(\lambda)|\le L_{\nu,i}\|h\|
$$

on the speed-factor basis, then

$$
\rho_{\nu\mathrm{band}}
=
\frac{m_{\mathrm{band}}-e_{\mathrm{band}}}
{\max_iL_{\nu,i}}.
$$

The period or winding margin is computed from

$$
H_i(b)
=
\int_0^{L_i}
\frac{d\lambda}{\nu_i(\lambda;b)}.
$$

Its first variation is

$$
D_hH_i
=
-
\int_0^{L_i}
\frac{D_h\nu_i(\lambda)}
{\nu_i(\lambda)^2}
d\lambda.
$$

If $L_{H,i}^{\nu}$ bounds this variation and $m_H$ is the declared positive margin preserving the equal-period or winding chart, then

$$
\rho_H
=
\frac{m_H-e_H}
{\max_iL_{H,i}^{\nu}}.
$$

For an exact period equation used as a residual row, $m_H$ is not the residual tolerance itself. It is the chart margin that keeps the selected period convention, winding labels, endpoint ownership, and inverse-time-map interval enclosures unchanged while the Krawczyk solve acts on the period residual.

The inverse-time-map radius $\rho_{\chi}$ records the margin that keeps all $\chi_i$ strictly monotone, all required $\Lambda_i(U)$ enclosures valid, and all period-cut splits unchanged. A sufficient row is

$$
\rho_{\chi}
=
\min
\left\{
\rho_{\nu\mathrm{band}},
\frac{m_{\mathrm{cut}}-e_{\mathrm{cut}}}{L_{\mathrm{cut}}^{\nu}},
\frac{m_{\Lambda}-e_{\Lambda}}{L_{\Lambda}^{\nu}}
\right\}.
$$

If any of these quantities is missing, downstream proof rows return

$$
\texttt{bounded-speed-time-map-persistence-open}.
$$

---

## 6. Bounded-Speed Krawczyk Chart Radius

Let

$$
F_{\nu}(x)
=
W_{\nu}^{1/2}\mathcal{F}_{\nu}(x),
\qquad
x=(a,b,\gamma),
$$

where the default bounded-speed residual includes the period, tangential speed, normal curvature, and scale rows:

$$
\mathcal{F}_{\nu}
=
\begin{bmatrix}
\mathcal{R}_{H}\\
\mathcal{R}_{\parallel}^{\nu}\\
\mathcal{R}_{\perp}^{\nu}\\
\mathcal{R}_{\gamma}^{\nu}
\end{bmatrix}.
$$

Certified variants may append action-curl, isotropy, event, or Noether rows only if their derivatives use the same bounded speed factor tail and root ledger.

The bounded-speed Krawczyk chart radius is

$$
\rho_{\mathrm{chart}}^{\nu}
=
\min
\left\{
\rho_{\mathrm{geom}},
\rho_{\nu\mathrm{band}},
\rho_H,
\rho_{\chi},
\rho_{\mathrm{root}}^{\nu},
\rho_J^{\nu},
\rho_{\mathrm{tail}}^{\nu},
\rho_{\mathrm{sheet}}^{\nu},
\rho_d,
\rho_{\Gamma}^{\nu},
\rho_{\mathrm{curl}}^{\nu},
\rho_{\mathrm{disc}}^{\nu}
\right\}.
$$

Each radius has a nonoptional role:

| Radius | Required margin |
| --- | --- |
| $\rho_{\nu\mathrm{band}}$ | $0<\nu_-<\nu_i<\nu_+$ persists |
| $\rho_H$ | equal-period or winding-period chart persists |
| $\rho_{\chi}$ | $\chi_i^{-1}$ enclosures, monotonicity, and period-cut splits persist |
| $\rho_{\mathrm{root}}^{\nu}$ | active root brackets and excluded gaps for $G_{ij}^{\nu}$ persist |
| $\rho_J^{\nu}$ | retained $J_{ij}^{\nu}$ sign strata persist |
| $\rho_{\mathrm{tail}}^{\nu}$ | support-tail cells remain excluded or assimilated |
| $\rho_{\mathrm{sheet}}^{\nu}$ | retained root-sheet derivative envelopes remain valid |

At the base point $x_0$, compute the declared range SVD of $DF_{\nu}(x_0)$ and preconditioner $C_{\nu}$. The range Krawczyk quantities are

$$
Y_{\nu}
=
\|C_{\nu}F_{\nu,R}(x_0)\|,
$$

and

$$
Z_{\nu}(\rho)
=
\sup_{\|h\|\le\rho}
\left\|
I-C_{\nu}DF_{\nu,R}(x_0+h)
\right\|.
$$

The proof budget passes only if there is a radius $\rho$ such that

$$
0<\rho\le\rho_{\mathrm{chart}}^{\nu},
$$

$$
Z_{\nu}(\rho)<1,
$$

and

$$
Y_{\nu}+Z_{\nu}(\rho)\rho<\rho.
$$

If a fixed-speed matrix is reused without the speed-factor columns $b$, or if $\rho_{\mathrm{tail}}^{\nu}$, $\rho_{\nu\mathrm{band}}$, $\rho_H$, or $\rho_{\chi}$ is missing, the row has status

$$
\texttt{bounded-speed-krawczyk-budget-open}.
$$

---

## 7. Fixed-Speed Special Case

The fixed-speed row is the subcase

$$
\nu_i\equiv1,
\qquad
D_h\nu_i=0.
$$

Then

$$
\chi_i(\lambda)=\lambda,
\qquad
\Lambda_i(u)=u,
\qquad
H_i=L_i,
$$

and the bounded-speed root function becomes

$$
G_{ij}^{\nu}(u,\eta)
=
\|\mathbf{Y}_i(u)-\mathbf{Y}_j(u-\eta)\|
-\eta.
$$

The Jacobian reduces to

$$
J_{ij}^{\nu}
=
1-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}},
$$

and the tail predicates reduce to the fixed-speed support-tail predicates after identifying receiver causal time $u$ with receiver arclength $\lambda$. The speed-specific radii are then discharged as

$$
\rho_{\nu\mathrm{band}}=\rho_{\chi}=\rho_H=\texttt{fixed-speed-special-case},
$$

provided the fixed-speed chart already has its ordinary arclength period and endpoint rows.

This special case is not a certificate for neighboring bounded speed factor branches. It certifies only the slice

$$
\nu_i\equiv1.
$$

Any continuation with $\nu_i\ne1$ must rerun the causal-time tail predicates, tail persistence radii, and Krawczyk chart radius above.

---

## 8. Theorem Target And Output Schema

**Theorem target: bounded speed factor support-tail Krawczyk certificate.** Fix one same-level tri-binary branch class, one bounded speed factor chart, one source-pair policy, one same-source policy, one endpoint convention, one support-tail interval, one causal-time cell cover, and one row-weight convention. Suppose:

1. $0<\nu_-\le\nu_i\le\nu_+$ and the causal-time maps $\chi_i^{-1}$ are interval-enclosed on every required receiver and source cell;
2. the equal-period or winding-period chart has a positive persistence margin;
3. every bounded-speed support-tail cell is either excluded by a distance, monotone, Lipschitz, or Newton predicate, or assimilated by a Krawczyk root tube;
4. every selected tail predicate has a positive bounded-speed persistence radius over the chart variables $(a,b,\gamma)$ and belongs to one complete owned finite cover;
5. active roots, tail roots, Jacobian sign strata, source-pair labels, endpoint ownership, and antipodal pairings all use the same bounded speed factor ledger;
6. the Krawczyk residual includes the speed-factor coefficients and uses a chart radius no larger than $\rho_{\mathrm{chart}}^{\nu}$.

Then the support-tail ledger is stable on the declared Krawczyk ball, and the range Krawczyk proof budget may consume $\rho_{\mathrm{tail}}^{\nu}$, $\rho_{\nu\mathrm{band}}$, $\rho_H$, and $\rho_{\chi}$ as certified chart-radius entries.

The proof route is:

1. the speed band makes each $\chi_i$ strictly monotone and gives $\chi_i^{-1}$;
2. differentiating $\chi_j(\lambda_j^-)=u-\eta$ gives $J_{ij}^{\nu}$;
3. interval tail predicates exclude roots or include one causal-time root sheet on each cell;
4. clock-corrected variations give bounded-speed Lipschitz constants for each predicate;
5. positive margin minus certified error gives persistence radii;
6. the minimum of the tail, speed-band, period, inverse-time-map, root, and sheet radii defines a valid Krawczyk chart.

A bounded-speed tail/Krawczyk run must emit:

| Field | Payload |
| --- | --- |
| `speed_band` | $\nu_-$, $\nu_+$, $m_{\mathrm{band}}$, $e_{\mathrm{band}}$, and $\rho_{\nu\mathrm{band}}$ |
| `clock_map` | $\chi_i$, $\chi_i^{-1}$ interval enclosures, period or winding row, and $\rho_{\chi}$ |
| `period_margin` | $H_i$, chart convention, $m_H$, $e_H$, and $\rho_H$ |
| `tail_cells_nu` | causal-time cells, delay slabs, split labels, and selected terminal predicate |
| `tail_cover_nu` | ownership map, boundary owners, event-reset owners, no-gap residual, overlap consistency, and coefficient-box persistence status |
| `tail_predicate_margins_nu` | distance, monotone, Lipschitz, Newton, or Krawczyk margins and errors |
| `tail_radius_nu` | $\rho_{\mathrm{tail}}^{\nu}$, limiting predicate, and pointwise/coefficient-box status |
| `krawczyk_radius_nu` | $\rho_{\mathrm{chart}}^{\nu}$ with all limiting entries |
| `fixed_speed_reading` | either `fixed-speed-special-case` with $\nu_i\equiv1$ or `bounded-speed-rerun-required` |

Current status before such a run is

$$
\texttt{bounded-speed-tail-certificate-open},
\qquad
\texttt{bounded-speed-krawczyk-budget-open},
\qquad
\texttt{not-retained}.
$$
