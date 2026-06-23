# Support-Complete $M=3$ Krawczyk Proof Budget

Promotion status: `priority-only`. This packet makes the Krawczyk row in [support-complete-m3-corrector-system.md](support-complete-m3-corrector-system.md) computable. It states the chart radius, row weighting, derivative envelopes, range enclosure, cokernel audit, and obstruction-separation inequalities needed after the $M=3$ tail ledger is support-complete. The tail contribution to the chart radius and master error is supplied by [support-complete-m3-tail-execution-ledger.md](support-complete-m3-tail-execution-ledger.md).

It does not retain a branch. Its purpose is to keep a failed corrector from being misread as a physical obstruction when only the proof budget, derivative envelope, tail persistence, action row, or discretization row is missing.

This proof budget is a fixed-speed budget unless the residual vector explicitly includes bounded speed factor coefficients. For the bounded-speed model, the chart radius and derivative envelopes must be replaced by the rows in [bounded-speed-factor-root-sheet-certificate.md](bounded-speed-factor-root-sheet-certificate.md) and [bounded-speed-factor-master-retention-theorem.md](bounded-speed-factor-master-retention-theorem.md).

---

## 1. Weighted Residual And Reduced Coordinates

Fix a support-complete ledger

$$
\mathcal{L}
=
\left(
\eta_{\mathrm{mem}},
\mathcal{A}_{\eta},
\Pi_{\mathrm{src}},
\Pi_{\mathrm{end}},
\operatorname{sign}J,
W_{\mathcal{E}}
\right).
$$

Let $x=(u,\gamma)$ be the reduced exact-antipodal $M=3$ coefficient and scale vector, with equal-period and gauge rows eliminated. Define

$$
F(x)
=
W_{\mathcal{E}}^{1/2}
\mathcal{F}_{M3}(x),
$$

where $\mathcal{F}_{M3}$ is the support-complete residual from [support-complete-m3-corrector-system.md](support-complete-m3-corrector-system.md). The default certified Newton row uses

$$
\mathcal{F}_{M3}
=
\begin{bmatrix}
R_T\\
R_K\\
R_\gamma
\end{bmatrix},
$$

and treats $R_{\mathrm{curl}}$ and $R_{\mathrm{iso}}$ as interval audits unless their derivatives are certified. If the curl and scalar-inertia derivatives are certified, the full row may use

$$
\mathcal{F}_{M3}^{\mathrm{full}}
=
\begin{bmatrix}
R_T\\
R_K\\
R_\gamma\\
R_{\mathrm{curl}}\\
R_{\mathrm{iso}}
\end{bmatrix}.
$$

The row weights must be declared before the SVD is computed. Changing weights after seeing the cokernel residual changes the cokernel basis and invalidates the obstruction comparison.

A tolerance-normalized block choice has the form

$$
W_{\mathcal{E}}
=
\operatorname{diag}
\left(
w_T^2I,\,
w_K^2I,\,
w_\gamma^2,\,
w_{\mathrm{curl}}^2I,\,
w_{\mathrm{iso}}^2
\right),
$$

with

$$
w_b=\tau_b^{-1}
$$

when the row tolerance $\tau_b$ is the intended unit scale. Whatever weights are chosen, the same $W_{\mathcal{E}}$ must be used in the residual, derivative, SVD, Krawczyk range row, cokernel audit, and adjoint obstruction row.

---

## 2. Certified Chart Radius

The Krawczyk ball radius must be smaller than every radius that preserves the declared chart:

$$
\rho_{\mathrm{chart}}
=
\min
\left\{
\rho_{\mathrm{root}},
\rho_J,
\rho_{\mathrm{tail}},
\rho_d,
\rho_s,
\rho_{\mathrm{ep}},
\rho_{\Gamma},
\rho_{\mathrm{curl}},
\rho_{\mathrm{disc}}
\right\}.
$$

Each entry has a concrete meaning:

| Radius | Required margin |
| --- | --- |
| $\rho_{\mathrm{root}}$ | retained root brackets and excluded-gap signs persist |
| $\rho_J$ | retained Jacobian floors keep $|J_a|>\epsilon_J$ |
| $\rho_{\mathrm{tail}}$ | support-tail slab statuses persist under coefficient-box inflation |
| $\rho_d$ | noncollision floor keeps $d_{\min}>\epsilon_x$ |
| $\rho_s$ | arclength speed floor keeps $S_i>s_0$ |
| $\rho_{\mathrm{ep}}$ | equal-period/gauge chart remains valid |
| $\rho_{\Gamma}$ | $\Gamma_B$, $m_{\mathrm{car}}$, and $R_*$ stay in their declared scale chart |
| $\rho_{\mathrm{curl}}$ | root-sensitive one-form curl row uses the same ledger |
| $\rho_{\mathrm{disc}}$ | collocation-refinement error budget remains below its declared tolerance |

If a margin $m$ has coefficient Lipschitz envelope $L_m$, the corresponding sufficient radius is

$$
\rho_m
=
\frac{m}{L_m}.
$$

For example, if $\Lambda_G(\rho)$ and $\Lambda_J(\rho)$ bound root-function and Jacobian variation on root brackets and excluded intervals, a root/Jacobian radius may be defined as the largest $\rho$ satisfying

$$
\Lambda_G(\rho)
<
\min\{\gamma_{\mathrm{end}},\gamma_{\mathrm{gap}}\},
$$

$$
\Lambda_J(\rho)
<
J_0-\epsilon_J,
$$

and

$$
\frac{\Lambda_G(\rho)}
{J_0-\Lambda_J(\rho)}
<
\Delta_\eta.
$$

The last inequality keeps the implicit root inside its isolating bracket. For simpler linear margin rows,

$$
\rho_J
=
\frac{J_{\min}-\epsilon_J}{L_J},
\qquad
\rho_s
=
\frac{s_{\min}-s_0}{L_s},
\qquad
\rho_d
=
\frac{d_{\min}-\epsilon_x}{L_d}.
$$

For a tail slab with exclusion gap $g_q$, use

$$
\rho_{\mathrm{tail},q}
=
\frac{g_q}{L_{G,q}^{\alpha}},
$$

where $L_{G,q}^{\alpha}$ bounds coefficient variation of the tail root function on that slab. Then

$$
\rho_{\mathrm{tail}}
=
\min_q\rho_{\mathrm{tail},q}.
$$

Equivalently, when the tail execution ledger emits atomic margins and numerical errors, the Krawczyk row may use the positive denominator of the certified tail error:

$$
\rho_{\mathrm{tail}}
=
\min
\left\{
\frac{m_{\emptyset}(c)-e_{\emptyset}(c)}{L_{\emptyset,c}^{\alpha}},
\frac{m_{\mathrm{root}}(u)-e_{\mathrm{tube}}(u)}{L_{\mathrm{tube},u}^{\alpha}}
\right\},
$$

where the minimum is over all empty cells $c$ and assimilated tubes $u$ that define the support-complete ledger. This formula is legal only when the execution ledger has coefficient-box persistence; a pointwise tail pass forces $\rho_{\mathrm{tail}}=0$ for Krawczyk purposes.

If support completeness is instead maintained by the global support margin, use

$$
V_B\rho+\frac12A_B\rho^2\le m_{\mathrm{sup}}.
$$

If it is maintained by slab exclusion margins, use the tail-certificate persistence inequality

$$
V_\delta\rho+\frac12A_\delta\rho^2<\delta_{\mathrm{tail}}.
$$

If any required envelope is missing, set the corresponding radius to zero and return

$$
\texttt{krawczyk-chart-radius-open}.
$$

---

## 3. Range SVD

At the base point $x_0$, compute

$$
A_0=DF(x_0).
$$

Let the thin singular-value decomposition on the declared rank be

$$
A_0=U_R\Sigma V^T,
\qquad
\sigma_{\min}=\min\operatorname{diag}\Sigma.
$$

The range and cokernel projectors are

$$
Q_{\mathrm{ran}}=U_RU_R^T,
\qquad
P_{\mathrm{cok}}=I-Q_{\mathrm{ran}}.
$$

The square range residual is

$$
F_R(x)
=
U_R^TF(x),
$$

and the SVD inverse is

$$
C=V\Sigma^{-1}.
$$

Thus

$$
\|C\|=\sigma_{\min}^{-1}.
$$

If $\sigma_{\min}\le\sigma_{\mathrm{cut}}$, the row does not have a certified range inverse and exits with

$$
\texttt{krawczyk-range-rank-open}.
$$

---

## 4. Derivative Envelope And $Z$ Bound

On the ball

$$
B_\rho(x_0)=\{x_0+h:\|h\|\le\rho\},
\qquad
\rho\le\rho_{\mathrm{chart}},
$$

assume a range derivative Lipschitz envelope

$$
\left\|
DF_R(x_0+h)-DF_R(x_0)
\right\|
\le
L_R\rho.
$$

This envelope is assembled from the root-sensitive derivative formulas, the delayed-force Lipschitz envelope, the arclength-inverse curvature derivative, the $\Gamma_B$ derivative, and any certified curl or inertia derivatives included in the Newton row. If the tail stage returns `tail-root-sheet-assimilated`, $L_R$ must include the first and second root-sheet variation envelopes from [support-complete-m3-root-sheet-variations.md](support-complete-m3-root-sheet-variations.md):

$$
L_R
=
L_R^{\mathrm{active}}
+
L_R^{\mathrm{sheet}}
+
L_R^{\Gamma}
+
\mathbf{1}_{\mathrm{curl}}L_R^{\mathrm{curl}}
+
\mathbf{1}_{\mathrm{iso}}L_R^{\mathrm{iso}}.
$$

The term $L_R^{\mathrm{sheet}}$ is not certified by first root-sheet derivatives alone. It requires an interval, analytic, or automatic-differentiation enclosure for the chart-ball variation of $D\eta_u$, $DJ_u$, and $D\mathbf{f}_u$ on every retained sheet tube.

Then

$$
Z
=
\sup_{\|h\|\le\rho}
\|I-CDF_R(x_0+h)\|
\le
\|C\|L_R\rho
=
\frac{L_R\rho}{\sigma_{\min}}.
$$

If $C$ is not certified as the exact inverse of $DF_R(x_0)$, use the more general bound

$$
Z
\le
\|I-CDF_R(x_0)\|
+
\|C\|L_R\rho.
$$

The range residual size is

$$
Y=\|CF_R(x_0)\|.
$$

The Krawczyk range row passes when

$$
Z<1,
\qquad
Y+Z\rho<\rho,
\qquad
\rho\le\rho_{\mathrm{chart}}.
$$

A convenient certified enclosure radius for the range zero is

$$
\rho_*
=
\frac{Y}{1-Z},
$$

provided

$$
\rho_*<\rho.
$$

This gives a unique $x_*\in B_{\rho_*}(x_0)$ satisfying

$$
F_R(x_*)=0.
$$

It does not yet prove dynamics closure, because the cokernel residual may remain.

When

$$
a=\|C\|L_R,
$$

and $C$ is exact at $x_0$, the inequality $Y+Z\rho<\rho$ is implied by the quadratic proof-budget window

$$
4aY<1,
$$

and

$$
\rho_-<\rho<\min\{\rho_+,\rho_{\mathrm{chart}}\},
$$

where

$$
\rho_\pm
=
\frac{1\pm\sqrt{1-4aY}}{2a}.
$$

If $a=0$, the condition reduces to

$$
Y<\rho\le\rho_{\mathrm{chart}}.
$$

---

## 5. Cokernel Audit

The base cokernel residual is

$$
c_0=P_{\mathrm{cok}}F(x_0).
$$

Because

$$
P_{\mathrm{cok}}A_0=0,
$$

the cokernel residual on the range enclosure is controlled by the nonlinear cokernel remainder. If

$$
\left\|
P_{\mathrm{cok}}
\left[
F(x_0+h)-F(x_0)-A_0h
\right]
\right\|
\le
\frac12L_{\mathrm{cok}}\|h\|^2,
$$

for $\|h\|\le\rho_*$, then

$$
\epsilon_C
\le
\|c_0\|
+
\frac12L_{\mathrm{cok}}\rho_*^2.
$$

An interval implementation may replace this bound by the direct enclosure

$$
\epsilon_C
=
\sup_{\|h\|\le\rho_*}
\|P_{\mathrm{cok}}F(x_0+h)\|.
$$

The support-complete dynamics/action row passes only if

$$
\epsilon_C
+
\epsilon_{\mathrm{disc}}
+
\epsilon_{\mathrm{root}}
+
\epsilon_{\Gamma}
\le
\tau_{\mathrm{dyn}},
$$

with

$$
\epsilon_{\mathcal{F}}^{\mathrm{tail}}=0
$$

because the tail was already excluded or assimilated.

If this inequality fails but no lower-bound obstruction is certified, the status is

$$
\texttt{krawczyk-cokernel-tolerance-open}.
$$

---

## 6. Obstruction Lower Bound

A failed Krawczyk audit is not an obstruction. A local exact-antipodal obstruction requires a lower bound on the cokernel residual that cannot be canceled by nonlinear remainder or proof errors.

If

$$
\|c_0\|
-
\frac12L_{\mathrm{cok}}\rho^2
-
\epsilon_{\mathrm{disc}}
-
\epsilon_{\mathrm{root}}
-
\epsilon_{\Gamma}
>
\tau_{\mathrm{dyn}},
$$

then no exact-antipodal zero exists inside $B_\rho(x_0)$ on this support-complete ledger and within this residual tolerance.

Equivalently, for a normalized adjoint vector $\ell$,

$$
|\langle F(x_0),\ell\rangle|
>
\epsilon_{\mathrm{adj}}\rho
+
\frac12L_\ell\rho^2
+
\epsilon_{\mathrm{disc}}
+
\epsilon_{\mathrm{root}}
+
\epsilon_{\Gamma}
+
\tau_{\mathrm{dyn}}
$$

certifies an adjoint scalar obstruction in that mode.

This obstruction is local. It does not rule out higher exact-antipodal modes unless [exact-antipodal-mode-refinement-certificate.md](exact-antipodal-mode-refinement-certificate.md) has failed on the declared refinement ladder.

---

## 7. Proof-Budget Status Codes

The Krawczyk packet emits exactly one primary status:

| Status | Meaning |
| --- | --- |
| `support-complete-range-closed` | Krawczyk range row passes, but cokernel/action audits still determine candidate status |
| `support-complete-exact-antipodal-dynamics-action-candidate` | range, cokernel, action-scale, curl, inertia, and refinement rows pass on the exact-antipodal $M=3$ ledger |
| `krawczyk-chart-radius-open` | at least one chart-preservation radius is missing or zero |
| `krawczyk-range-rank-open` | SVD range inverse is not certified |
| `krawczyk-derivative-envelope-open` | $L_R$ or $L_{\mathrm{cok}}$ is missing |
| `root-sheet-derivative-envelope-open` | tail sheets are assimilated but their first derivative envelope is missing from $L_R$ |
| `root-sheet-second-variation-open` | tail sheets are assimilated but the derivative-Lipschitz envelope for $D\eta_u$, $DJ_u$, or $D\mathbf{f}_u$ is missing |
| `krawczyk-range-budget-failed` | $Z<1$ or $Y+Z\rho<\rho$ fails |
| `krawczyk-cokernel-tolerance-open` | range closes but cokernel tolerance does not pass and no obstruction is certified |
| `support-complete-exact-antipodal-obstruction` | lower-bound obstruction inequality passes |
| `continue-exact-antipodal-refine` | proof budget fails without obstruction |

The correct relaxation status remains closed unless both the obstruction and higher-mode refinement failure have been certified:

$$
\texttt{open-antipodal-relaxation}
$$

requires

$$
\texttt{support-complete-exact-antipodal-obstruction}
$$

and

$$
\texttt{exact-antipodal-mode-refinement-failed}.
$$

---

## 8. Output Schema

A support-complete $M=3$ Krawczyk run should emit:

| Field | Payload |
| --- | --- |
| `residual_rows` | rows included in the Newton map and rows held for interval audit |
| `weights` | $W_{\mathcal{E}}$ and row normalization constants |
| `chart_radius` | every radius entering $\rho_{\mathrm{chart}}$ and the limiting row |
| `svd_range` | singular values, rank cutoff, $U_R,\Sigma,V$ convention |
| `range_residual` | $Y$, $L_R$, $Z$, chosen $\rho$, and enclosed $\rho_*$ |
| `cokernel_audit` | $c_0$, $L_{\mathrm{cok}}$, $\epsilon_C$, and tolerance comparison |
| `proof_errors` | $\epsilon_{\mathrm{disc}}$, $\epsilon_{\mathrm{root}}$, $\epsilon_\Gamma$, $E_{\mathrm{tail}}$, coefficient-box persistence, and tail status |
| `action_audits` | $\Gamma_B$, curl, scalar inertia, and fit/action compatibility statuses |
| `obstruction_lower_bound` | adjoint vectors or projector lower bounds if closure fails |
| `mode_refinement_required` | whether $B_4$ or higher exact-antipodal columns must be tested |
| `primary_status` | one status from Section 7 |

---

## 9. Current $M=3$ Reading

The present $M=3$ evidence has rank and descent, but it does not yet emit:

1. support-complete tail status;
2. $\rho_{\mathrm{chart}}$ from tail, root, speed, noncollision, action, and discretization margins;
3. derivative envelopes $L_R$ and $L_{\mathrm{cok}}$ on that chart;
4. a Krawczyk radius $\rho_*$;
5. a cokernel audit with $\Gamma_B$ and scalar inertia;
6. an obstruction lower bound after higher exact-antipodal mode testing.

Therefore the current status remains

$$
\texttt{support-complete-newton-closure-open},
\qquad
\texttt{continue-exact-antipodal}.
$$
