# Bounded Speed Factor Master Retention Theorem

Promotion status: `priority-only`. This packet is the bounded-speed successor to the fixed-speed master theorem in [support-complete-m3-master-retention-theorem.md](support-complete-m3-master-retention-theorem.md). It defines what it would mean to retain a same-level tri-binary branch when each architrino carries a bounded speed factor $\nu_i$ rather than the fixed-speed constraint $\nu_i\equiv1$.

It does not claim retention. It states the rows that must be recomputed before the bounded-speed model can replace the current exact-antipodal $M=3$ fixed-speed screens.

---

## 1. Bounded-Speed Certificate Tuple

A bounded-speed retained-branch certificate is the tuple

$$
\mathfrak{R}_{\nu}(B)
=
\left(
\mathsf{Geom},
\mathsf{Speed},
\mathsf{Clock},
\mathsf{Tail}^{\nu},
\mathsf{Root}^{\nu},
\mathsf{Sheet}^{\nu},
\mathsf{Dyn}^{\nu},
\mathsf{Action}^{\nu},
\mathsf{Kraw}^{\nu},
\mathsf{Limit}^{\nu},
\mathsf{Noether}^{\nu},
\mathsf{Event}^{\nu},
\mathsf{Stability}^{\nu},
\mathsf{Inventory},
\mathsf{Ledger}^{\nu},
\mathsf{Status}
\right).
$$

The new rows are:

| Row | Bounded-speed meaning |
| --- | --- |
| $\mathsf{Speed}$ | positive speed factors $\nu_i$ with declared band $0<\nu_-\le\nu_i\le\nu_+$, derivative bounds, and overspeed budget if self-hit intervals are present |
| $\mathsf{Clock}$ | equal physical period or declared winding relation using $H_i=\int_0^{L_i}d\lambda/\nu_i$ |
| $\mathsf{Tail}^{\nu}$ | tail exclusion or assimilation for causal-time roots $G_{ij}(u,\eta)$ |
| $\mathsf{Root}^{\nu}$ | root ledger using $J_{ij}^{\nu}=1-\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}$ |
| $\mathsf{Sheet}^{\nu}$ | sheet slopes, coefficient variations, and force derivatives from [bounded-speed-factor-root-sheet-certificate.md](bounded-speed-factor-root-sheet-certificate.md) |
| $\mathsf{Dyn}^{\nu}$ | tangential speed evolution and normal curvature rows |
| $\mathsf{Action}^{\nu}$ | action scale, work-form curl, kinetic speed term, and fit/action compatibility on the same bounded-speed ledger |
| $\mathsf{Kraw}^{\nu}$ | Krawczyk range, cokernel, chart radius, and obstruction rows including speed coefficients |
| $\mathsf{Noether}^{\nu}$ | conservation currents including speed-factor work and event exchange |
| $\mathsf{Stability}^{\nu}$ | monodromy of the augmented shape-speed-delay system after neutral reduction |

The fixed-speed master theorem is recovered by setting

$$
\nu_i\equiv1,
\qquad
D\nu_i=0,
\qquad
\mathsf{Speed}=\mathsf{Clock}=\texttt{fixed-speed-special-case}.
$$

---

## 2. Master Residual Vector

Let the branch variables be

$$
x=(a,b,\gamma),
$$

where $a$ are geometric coefficients, $b$ are speed-factor coefficients, and $\gamma$ is the fitted or action-derived dynamics scale. On one frozen bounded-speed ledger define

$$
\mathcal{R}_{\nu}^{\mathrm{master}}
=
\left(
\mathcal{R}_{\mathrm{geom}},
\mathcal{R}_{\mathrm{band}},
\mathcal{R}_{H},
\mathcal{R}_{\mathrm{tail}}^{\nu},
\mathcal{R}_{\mathrm{root}}^{\nu},
\mathcal{R}_{\mathrm{sheet}}^{\nu},
\mathcal{R}_{\parallel}^{\nu},
\mathcal{R}_{\perp}^{\nu},
\mathcal{R}_{\gamma}^{\nu},
\mathcal{R}_{\mathrm{curl}}^{\nu},
\mathcal{R}_{\mathrm{kraw}}^{\nu},
\mathcal{R}_{\mathrm{lim}}^{\nu},
\mathcal{R}_{\mathrm{Noeth}}^{\nu},
\mathcal{R}_{\mathrm{event}}^{\nu},
\mathcal{R}_{\mathrm{stab}}^{\nu},
\mathcal{R}_{\mathrm{inv}}
\right).
$$

The speed-band residual is an inequality row:

$$
\mathcal{R}_{\mathrm{band}}
=
\max_i
\max
\left\{
\sup_\lambda(\nu_- - \nu_i(\lambda))_+,
\sup_\lambda(\nu_i(\lambda)-\nu_+)_+
\right\}.
$$

The physical-period row is

$$
\mathcal{R}_{H,i}
=
\int_0^{L_i}
\frac{d\lambda}{\nu_i(\lambda)}
-H_*,
$$

or the corresponding winding row

$$
m_i
\int_0^{L_i}
\frac{d\lambda}{\nu_i(\lambda)}
-H_{\mathrm{com}}.
$$

The bounded-speed dynamics rows are

$$
\mathcal{R}_{\parallel,i}^{\nu}
=
\nu_i\nu_i'
-
\Gamma_B^{\nu}\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^{\nu},
$$

and

$$
\mathcal{R}_{\perp,i}^{\nu}
=
\nu_i^2\mathbf{K}_i
-
\Gamma_B^{\nu}P_i^\perp\widetilde{\mathbf{F}}_i^{\nu}.
$$

The old fixed-speed tangential residual $\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i=0$ is no longer a closure row. It is the special case $\nu_i'=0$.

---

## 3. Action And Work Rows

The bounded-speed kinetic term is

$$
K_i^{\nu}
=
\frac12m_{\mathrm{car}}c_f^2\nu_i^2.
$$

The action row must specify whether $m_{\mathrm{car}}$ is held fixed or is a ledger-derived response. If $m_{\mathrm{car}}$ is held fixed, the dimensionful kinetic action over one causal-time period is

$$
S_{\mathrm{car}}^{\nu}
=
\frac{R_*}{c_f}
\sum_i
\int_0^{H_*}
\frac12m_{\mathrm{car}}c_f^2\nu_i(u)^2\,du.
$$

Equivalently, in arclength measure,

$$
S_{\mathrm{car}}^{\nu}
=
\frac{m_{\mathrm{car}}c_fR_*}{2}
\sum_i
\int_0^{L_i}
\nu_i(\lambda)\,d\lambda.
$$

This identity follows from $du=d\lambda/\nu_i(\lambda)$. If an action packet uses the fixed-speed kinetic term after $\nu_i$ varies, its status is

$$
\texttt{bounded-speed-action-kinetic-stale}.
$$

The virtual-work one-form is now defined on the augmented coefficient space $(a,b)$:

$$
W_p^{\nu,+}
=
\sum_i
\int_0^{H_*}
\widetilde{\mathbf{F}}_i^{\nu,+}(u)
\cdot
D_p\mathbf{Y}_i(\Lambda_i(u))
\,du,
$$

where $D_p\mathbf{Y}_i(\Lambda_i(u))$ includes the clock correction from $D_p\Lambda_i(u)$. The curl row is

$$
\mathcal{R}_{\mathrm{curl}}^{\nu}
=
\frac{
\left\|
D_pW_q^{\nu,+}-D_qW_p^{\nu,+}
\right\|_{\mathrm{F}}
}{
1+\|W^{\nu,+}\|_{\mathrm{F}}
}.
$$

Every derivative in this row must use the bounded-speed root-sheet formulas. A curl row computed with fixed-speed roots exits with

$$
\texttt{bounded-speed-curl-ledger-stale}.
$$

---

## 4. Krawczyk And Obstruction Rows

The weighted residual is

$$
F_{\nu}(x)
=
W_{\nu}^{1/2}
\mathcal{F}_{\nu}(x),
\qquad
x=(a,b,\gamma),
$$

with

$$
\mathcal{F}_{\nu}
=
\begin{bmatrix}
\mathcal{R}_{H}\\
\mathcal{R}_{\parallel}^{\nu}\\
\mathcal{R}_{\perp}^{\nu}\\
\mathcal{R}_{\gamma}^{\nu}
\end{bmatrix}
$$

by default. Certified variants may append $\mathcal{R}_{\mathrm{curl}}^{\nu}$ and action-isotropy rows only if their derivatives are enclosed on the same bounded-speed ledger.

The chart radius must include both geometry and speed-factor margins:

$$
\rho_{\mathrm{chart}}^{\nu}
=
\min
\left\{
\rho_{\mathrm{geom}},
\rho_{\mathrm{band}},
\rho_H,
\rho_{\mathrm{root}}^{\nu},
\rho_J^{\nu},
\rho_{\mathrm{tail}}^{\nu},
\rho_{\mathrm{sheet}}^{\nu},
\rho_d,
\rho_{\Gamma}^{\nu},
\rho_{\mathrm{curl}}^{\nu},
\rho_{\mathrm{disc}}
\right\}.
$$

The derivative envelope is

$$
\left\|
DF_{\nu,R}(x_0+h)-DF_{\nu,R}(x_0)
\right\|
\le
L_R^{\nu}\|h\|,
$$

where

$$
L_R^{\nu}
=
L_R^{\mathrm{geom}}
+
L_R^{\mathrm{speed}}
+
L_R^{\mathrm{root},\nu}
+
L_R^{\mathrm{sheet},\nu}
+
L_R^{\mathrm{action},\nu}.
$$

The range Krawczyk inequalities keep their form:

$$
Z_{\nu}<1,
\qquad
Y_{\nu}+Z_{\nu}\rho<\rho,
\qquad
\rho\le\rho_{\mathrm{chart}}^{\nu}.
$$

The obstruction inequality also keeps its form after replacing every fixed-speed error term by a bounded-speed one:

$$
\|c_0^{\nu}\|
-
\frac12L_{\mathrm{cok}}^{\nu}\rho^2
-
\epsilon_{\mathrm{disc}}^{\nu}
-
\epsilon_{\mathrm{root}}^{\nu}
-
\epsilon_{\Gamma}^{\nu}
>
\tau_{\mathrm{dyn}}^{\nu}.
$$

If the old fixed-speed matrix is reused without the $b$ columns, the result is not a bounded-speed obstruction. The status is

$$
\texttt{bounded-speed-column-span-open}.
$$

---

## 5. Stability And Event Rows

The bounded-speed variational state includes both shape and speed perturbations:

$$
\delta X^{\nu}
=
\left(
\delta\mathbf{Y},
\delta\mathbf{T},
\delta\nu,
\delta\eta,
\delta\Gamma,
\delta\mathcal{E}
\right).
$$

For $\rho_i=\delta\nu_i$, the first variations of the two dynamics rows are

$$
\delta R_{N,i}^{\nu}
=
\nu_i^2\delta\mathbf{K}_i
+
2\nu_i\rho_i\mathbf{K}_i
-
\delta\Gamma_B^{\nu}P_i^\perp\widetilde{\mathbf{F}}_i^{\nu}
-
\Gamma_B^{\nu}\delta\!\left(P_i^\perp\widetilde{\mathbf{F}}_i^{\nu}\right),
$$

and

$$
\delta R_{T,i}^{\nu}
=
\rho_i\nu_i'
+
\nu_i\rho_i'
-
\delta\Gamma_B^{\nu}\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^{\nu}
-
\Gamma_B^{\nu}
\left(
\delta\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^{\nu}
+
\mathbf{T}_i\cdot\delta\widetilde{\mathbf{F}}_i^{\nu}
\right).
$$

Here $\delta\widetilde{\mathbf{F}}_i^{\nu}$ includes the clock, root, Jacobian, and source-speed variations from [bounded-speed-factor-root-sheet-certificate.md](bounded-speed-factor-root-sheet-certificate.md). These two equations are the minimal augmented rows required by the Hessian, Floquet, Krawczyk-cokernel, and stability-handoff packets.

The monodromy operator must linearize the coupled system

$$
\nu_i\nu_i'
=
\Gamma_B^{\nu}\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^{\nu},
\qquad
\nu_i^2\mathbf{K}_i
=
\Gamma_B^{\nu}P_i^\perp\widetilde{\mathbf{F}}_i^{\nu}.
$$

A stability packet that freezes $\nu_i$ while using bounded-speed roots is a mixed-ledger calculation and exits with

$$
\texttt{bounded-speed-stability-ledger-mismatch}.
$$

If a self-hit interval is present, the event row must additionally emit:

$$
\operatorname{dur}_t(\mathcal{H}_i)\le\tau_{\mathrm{hit}},
\qquad
\int_{\mathcal{H}_i}(\nu_i-1)_+\,d\lambda\le B_{\mathrm{hit}},
$$

the positive $J_{\mathrm{self}}^{\nu}$ floor, and the action/event exchange associated with entering and leaving the interval. Without these rows, the master status is

$$
\texttt{bounded-speed-self-hit-unledgered}.
$$

---

## 6. Theorem Target

**Theorem target: bounded speed factor master retention.** Fix one same-level tri-binary branch class, one source-pair policy, one same-source policy, one bounded-speed chart, one endpoint convention, one support-complete memory convention, one action/event convention, and one row-weight convention. Suppose:

1. the speed band and equal physical-period or winding rows hold;
2. the causal-time root ledger has positive delay, Jacobian, gap, support, and noncollision margins;
3. the support tail is either excluded or assimilated as differentiable bounded-speed root sheets;
4. the bounded-speed dynamics/action residual passes the Krawczyk range and cokernel budgets;
5. the action row derives or identifies $\Gamma_B^{\nu}$ on the same ledger;
6. the Noether/event rows include speed-factor work, self-hit event exchange if present, and source provenance;
7. the stability row classifies the augmented shape-speed-delay monodromy after neutral reduction;
8. the inventory ledger matches the same root/action/event ledger;
9. the normalized master error satisfies $\mathfrak{E}_{\nu}(B)\le1$.

Then $B$ is a retained bounded-speed same-level tri-binary branch candidate.

Proof route:

1. the positive speed band makes each $\chi_i$ invertible and gives causal-time roots;
2. root/Jacobian floors make the bounded-speed root sheets differentiable;
3. the sheet derivative formulas propagate speed-factor variations into force, action, and Krawczyk rows;
4. the tangential dynamics row converts formerly forbidden work into speed-factor evolution;
5. action and event rows decide whether the speed exchange is physical rather than a fit;
6. the augmented monodromy classifies stability on the same ledger;
7. the master inequality bundles the certified residual and error budgets.

---

## 7. Current Reading

The existing exact-antipodal $M=3$ packets remain fixed-speed evidence:

$$
\nu_i\equiv1.
$$

They are valuable as a limiting branch and as initial data for bounded-speed continuation. They do not certify the bounded-speed model until the root, tail, derivative, action, Krawczyk, Noether, event, and stability rows above are recomputed.

Current bounded-speed statuses:

$$
\texttt{bounded-speed-root-sheet-open},
\qquad
\texttt{bounded-speed-action-row-open},
\qquad
\texttt{bounded-speed-krawczyk-envelope-open},
\qquad
\texttt{bounded-speed-stability-ledger-open},
\qquad
\texttt{not-retained}.
$$
