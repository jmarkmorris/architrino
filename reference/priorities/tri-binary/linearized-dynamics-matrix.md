# Linearized Dynamics Matrix

Promotion status: `priority-only`. This packet derives a finite-dimensional first-order balance system around the rigid octahedral carrier. It is a theorem-target and search-matrix specification only. It does not claim a retained same-level branch, a nonlinear deformation theorem, a stability result, an event/action ledger, or migration readiness.

Claim level: linearized finite-mode balance target. A solution of the matrix system below is evidence that the chosen Fourier deformation space can cancel the rigid tangential, speed, and radial residual rows to first order on a fixed active-root ledger. It becomes branch-retention material only after the same candidate also preserves the support band, noncollision, active-root counts, Jacobian floors, phase/winding rows, and event ledgers under a nonlinear rescreen.

---

## 1. Rigid Reference Row

Use the rigid octahedral carrier from [octahedral-carrier-worked-example.md](octahedral-carrier-worked-example.md), with optional fixed phase offsets $\phi_a^0$:

$$
\mathbf{x}_{a,\sigma}^{0}(t)
=
\sigma R\mathbf{p}_a(\theta+\phi_a^0),
\qquad
\theta=\omega t,
\qquad
\omega=\frac{c_f}{R},
\qquad
\sigma\in\{+1,-1\}.
$$

The carrier directions are

$$
\begin{aligned}
\mathbf{p}_1(\theta)&=(\cos\theta,\sin\theta,0),\\
\mathbf{p}_2(\theta)&=(0,\cos\theta,\sin\theta),\\
\mathbf{p}_3(\theta)&=(\sin\theta,0,\cos\theta).
\end{aligned}
$$

Write a site as $i=(a,\sigma)$ and define

$$
\mathbf{n}_i^0(\theta)
=
\sigma\mathbf{p}_a(\theta+\phi_a^0),
\qquad
\mathbf{t}_i^0(\theta)
=
\sigma\mathbf{p}_a'(\theta+\phi_a^0),
$$

so that

$$
\mathbf{u}_i^0=c_f\mathbf{t}_i^0,
\qquad
\mathbf{x}_i^0=R\mathbf{n}_i^0.
$$

The default neutral polarity row is

$$
q_{a,+}=+\epsilon,
\qquad
q_{a,-}=-\epsilon.
$$

The corresponding structural inventory row is $(N_{\mathrm{attr}},N_{\mathrm{rep}})=(3,2)$ for every receiver, as isolated in [attraction-repulsion-inventory-theorem.md](attraction-repulsion-inventory-theorem.md). The linearized force matrix must still use the weighted delayed root sums below.

All dimensionless force rows below remove the common factor $\kappa\epsilon^2/R^2$.

---

## 2. Active-Root Assumptions

Fix a collocation grid

$$
\theta_n=\frac{2\pi n}{K},
\qquad
t_n=\frac{\theta_n}{\omega},
\qquad
n=0,\ldots,K-1.
$$

For every receiver $i$ and node $n$, freeze the active root labels from the screened rigid row:

$$
\mathcal{A}_{i,n}^{0}
=
\{(j,\alpha):G_{ij}^{0}(t_n,s_{ij,n}^{0,\alpha})=0,\ s_{ij,n}^{0,\alpha}<t_n\}.
$$

The dimensionless delay is

$$
y_{ij,n}^{\alpha}
=
\omega(t_n-s_{ij,n}^{0,\alpha}).
$$

The retained root assumptions for this linear matrix are:

1. Partner roots and cross-binary roots use the same root-label convention as the rigid screen.
2. Same-source roots are absent from the default matrix because the rigid circular row has no retained positive-delay same-source root.
3. A self/fold-layer row may be appended only after a declared `retained-positive-delay` or `regularized-fold-layer` convention supplies its own root and event-ledger columns.
4. Every retained root is simple:

   $$
   |J_{ij,n}^{0,\alpha}|\ge J_{\mathrm{floor}}^{0}>\epsilon_J.
   $$

5. Every root bracket has a positive endpoint margin, so first-order root shifts cannot create, delete, or merge active roots inside the certified perturbation radius.

For a retained root, define

$$
\mathbf{d}_{ij,n}^{\alpha}
=
\frac{
\mathbf{x}_i^0(t_n)-\mathbf{x}_j^0(s_{ij,n}^{0,\alpha})
}{R},
\qquad
\widehat{\mathbf{r}}_{ij,n}^{\alpha}
=
\frac{\mathbf{d}_{ij,n}^{\alpha}}{y_{ij,n}^{\alpha}},
$$

and

$$
J_{ij,n}^{0,\alpha}
=
1-
\mathbf{t}_j^0(\theta_n-y_{ij,n}^{\alpha})\cdot
\widehat{\mathbf{r}}_{ij,n}^{\alpha}.
$$

The dimensionless baseline per-root force is

$$
\widetilde{\mathbf{F}}_{ij,n}^{0,\alpha}
=
\sigma_i\sigma_j
\frac{
\widehat{\mathbf{r}}_{ij,n}^{\alpha}
}{
\left(y_{ij,n}^{\alpha}\right)^2
|J_{ij,n}^{0,\alpha}|
},
$$

and

$$
\widetilde{\mathbf{F}}_{i,n}^{0}
=
\sum_{(j,\alpha)\in\mathcal{A}_{i,n}^{0}}
\widetilde{\mathbf{F}}_{ij,n}^{0,\alpha}.
$$

---

## 3. Fourier-Mode Unknown Vector

Let $M$ be the harmonic cutoff and define the real Fourier basis

$$
\varphi_0(\theta)=1,
$$

$$
\varphi_{m,c}(\theta)=\cos m\theta,
\qquad
\varphi_{m,s}(\theta)=\sin m\theta,
\qquad
1\le m\le M.
$$

Let $\mathcal{H}_M$ be the resulting set of $H=2M+1$ modes. The finite deformation vector contains radial breathing, phase modulation, plane-normal precession, antipodal relaxation, and one radial scale/coupling correction:

$$
\mathbf{c}_M
=
\left(
\{B_{i,h}\},
\{\Psi_{i,h}\},
\{M_{a,k,h}\},
\{E_{a,k,h}\},
\gamma_R
\right)^T.
$$

Here $i=(a,\sigma)$, $a\in\{1,2,3\}$, $k\in\{1,2,3\}$, and $h\in\mathcal{H}_M$. The coefficient count before gauges is

$$
N_{\mathrm{raw}}=12H+9H+9H+1=30H+1.
$$

The mode functions are

$$
b_i(\theta)
=
\sum_{h\in\mathcal{H}_M}B_{i,h}\varphi_h(\theta),
$$

$$
\psi_i(\theta)
=
\sum_{h\in\mathcal{H}_M}\Psi_{i,h}\varphi_h(\theta),
$$

$$
\boldsymbol{\mu}_a(\theta)
=
\sum_{k=1}^{3}
\sum_{h\in\mathcal{H}_M}
M_{a,k,h}\varphi_h(\theta)\mathbf{e}_k,
$$

and

$$
\mathbf{E}_a(\theta)
=
\sum_{k=1}^{3}
\sum_{h\in\mathcal{H}_M}
E_{a,k,h}\varphi_h(\theta)\mathbf{e}_k.
$$

The dimensionless first-order displacement is

$$
\boldsymbol{\zeta}_{a,\sigma}(\theta)
=
\sigma b_{a,\sigma}(\theta)\mathbf{p}_a(\theta+\phi_a^0)
+
\sigma\psi_{a,\sigma}(\theta)\mathbf{p}_a'(\theta+\phi_a^0)
$$

$$
\quad
+
\sigma\boldsymbol{\mu}_a(\theta)\times
\mathbf{p}_a(\theta+\phi_a^0)
+
\frac{1}{2}\mathbf{E}_a(\theta),
$$

with physical displacement

$$
\boldsymbol{\xi}_{a,\sigma}(\theta)=R\boldsymbol{\zeta}_{a,\sigma}(\theta).
$$

The finite vector $\mathbf{c}_M$ already includes the first-order amplitude. The formal expansion is

$$
\mathbf{x}_i
=
\mathbf{x}_i^0+\boldsymbol{\xi}_i+O(\|\mathbf{c}_M\|^2),
$$

so a matrix solution is meaningful only while $\mathbf{c}_M$ remains inside the floor-preserving neighborhood in Section 7.

### 3.1 Gauge Rows

Before solving, impose a linear gauge system

$$
G_M\mathbf{c}_M=0.
$$

The minimum gauge set is:

1. Center gauge, mode by mode:

   $$
   \sum_i\boldsymbol{\zeta}_{i,h}=\mathbf{0}.
   $$

2. Internal velocity center gauge, mode by mode:

   $$
   \sum_i\boldsymbol{\zeta}_{i,h}'=\mathbf{0}.
   $$

3. Orientation gauge for plane precession:

   $$
   \sum_{a=1}^{3}\boldsymbol{\mu}_{a,h}=\mathbf{0}
   $$

   or an equivalent pinned-plane convention.

4. Common phase gauge, for example $\Psi_{1,+,0}=0$ or $\sum_i\Psi_{i,0}=0$.

5. Common support-radius gauge, unless the branch explicitly treats a mean radius shift as part of the scale/coupling row.

Let $N_G$ be any matrix whose columns span $\ker G_M$. The gauge-reduced unknown is

$$
\mathbf{c}_M=N_G\mathbf{a}_M.
$$

---

## 4. Column Formula From Root Shifts

For each raw basis column $\ell$, let $\boldsymbol{\zeta}^{[\ell]}$ be the corresponding dimensionless displacement. Define the dimensionless root shift

$$
\nu_{ij,n}^{\alpha,[\ell]}
=
\omega\eta_{ij,n}^{\alpha,[\ell]}
=
-
\frac{
\widehat{\mathbf{r}}_{ij,n}^{\alpha}\cdot
\left[
\boldsymbol{\zeta}_i^{[\ell]}(\theta_n)
-
\boldsymbol{\zeta}_j^{[\ell]}(\theta_n-y_{ij,n}^{\alpha})
\right]
}{
J_{ij,n}^{0,\alpha}
}.
$$

The dimensionless separation variation is

$$
\delta\mathbf{d}_{ij,n}^{\alpha,[\ell]}
=
\boldsymbol{\zeta}_i^{[\ell]}(\theta_n)
-
\boldsymbol{\zeta}_j^{[\ell]}(\theta_n-y_{ij,n}^{\alpha})
-
\mathbf{t}_j^0(\theta_n-y_{ij,n}^{\alpha})
\nu_{ij,n}^{\alpha,[\ell]}.
$$

Let

$$
P_{ij,n}^{\alpha}
=
I-
\widehat{\mathbf{r}}_{ij,n}^{\alpha}
\widehat{\mathbf{r}}_{ij,n}^{\alpha T}.
$$

Then

$$
\delta\widehat{\mathbf{r}}_{ij,n}^{\alpha,[\ell]}
=
\frac{
P_{ij,n}^{\alpha}
\delta\mathbf{d}_{ij,n}^{\alpha,[\ell]}
}{
y_{ij,n}^{\alpha}
}.
$$

The dimensionless source-velocity variation is

$$
\delta\mathbf{t}_{j,*}^{\alpha,[\ell]}
=
\boldsymbol{\zeta}_j^{[\ell]\prime}(\theta_n-y_{ij,n}^{\alpha})
+
\mathbf{t}_j^{0\prime}(\theta_n-y_{ij,n}^{\alpha})
\nu_{ij,n}^{\alpha,[\ell]}.
$$

Thus

$$
\delta J_{ij,n}^{\alpha,[\ell]}
=
-
\delta\mathbf{t}_{j,*}^{\alpha,[\ell]}\cdot
\widehat{\mathbf{r}}_{ij,n}^{\alpha}
-
\mathbf{t}_j^0(\theta_n-y_{ij,n}^{\alpha})\cdot
\delta\widehat{\mathbf{r}}_{ij,n}^{\alpha,[\ell]}.
$$

The dimensionless per-root force variation is

$$
\delta\widetilde{\mathbf{F}}_{ij,n}^{\alpha,[\ell]}
=
\sigma_i\sigma_j
\left[
\frac{
\left(
I-
3\widehat{\mathbf{r}}_{ij,n}^{\alpha}
\widehat{\mathbf{r}}_{ij,n}^{\alpha T}
\right)
\delta\mathbf{d}_{ij,n}^{\alpha,[\ell]}
}{
\left(y_{ij,n}^{\alpha}\right)^3
|J_{ij,n}^{0,\alpha}|
}
\right.
$$

$$
\left.
\quad
-
\frac{
\widehat{\mathbf{r}}_{ij,n}^{\alpha}
\operatorname{sgn}(J_{ij,n}^{0,\alpha})
\delta J_{ij,n}^{\alpha,[\ell]}
}{
\left(y_{ij,n}^{\alpha}\right)^2
|J_{ij,n}^{0,\alpha}|^2
}
\right].
$$

Finally,

$$
\delta\widetilde{\mathbf{F}}_{i,n}^{[\ell]}
=
\sum_{(j,\alpha)\in\mathcal{A}_{i,n}^{0}}
\delta\widetilde{\mathbf{F}}_{ij,n}^{\alpha,[\ell]}.
$$

These equations are the concrete column builder for all three residual matrices.

---

## 5. Residual Rows

The stacked residual vector has $18K$ rows:

$$
\mathbf{r}_M(\mathbf{c}_M)
=
\begin{bmatrix}
\mathbf{r}_{\mathrm{tan}}\\
\mathbf{r}_{\mathrm{speed}}\\
\mathbf{r}_{\mathrm{rad}}
\end{bmatrix}
=
\mathbf{r}_M^0+A_M\mathbf{c}_M+O(\|\mathbf{c}_M\|^2).
$$

### 5.1 Tangential Rows

The rigid tangential residual is

$$
r_{\mathrm{tan},i,n}^{0}
=
\mathbf{t}_i^0(\theta_n)\cdot
\widetilde{\mathbf{F}}_{i,n}^{0}.
$$

The tangential matrix row for column $\ell$ is

$$
A_{\mathrm{tan},(i,n),\ell}
=
\boldsymbol{\zeta}_i^{[\ell]\prime}(\theta_n)\cdot
\widetilde{\mathbf{F}}_{i,n}^{0}
+
\mathbf{t}_i^0(\theta_n)\cdot
\delta\widetilde{\mathbf{F}}_{i,n}^{[\ell]}.
$$

This is the dimensionless form of

$$
\dot{\boldsymbol{\xi}}_i\cdot\mathbf{F}_i^0
+
\mathbf{u}_i^0\cdot\delta\mathbf{F}_i.
$$

### 5.2 Speed Rows

The rigid speed residual is zero:

$$
r_{\mathrm{speed},i,n}^{0}=0.
$$

The matrix row is

$$
A_{\mathrm{speed},(i,n),\ell}
=
\mathbf{t}_i^0(\theta_n)\cdot
\boldsymbol{\zeta}_i^{[\ell]\prime}(\theta_n).
$$

For the explicit deformation variables, this row is

$$
\mathcal{S}_{a,\sigma}[\boldsymbol{\zeta}]
=
b_{a,\sigma}
+
\psi_{a,\sigma}'
+
\mathbf{p}_a'(\theta+\phi_a^0)\cdot
\left[
\boldsymbol{\mu}_a'(\theta)\times
\mathbf{p}_a(\theta+\phi_a^0)
\right]
$$

$$
\quad
+
\frac{\sigma}{2}
\mathbf{p}_a'(\theta+\phi_a^0)\cdot
\mathbf{E}_a'(\theta).
$$

The leading fixed-speed constraint is therefore

$$
A_{\mathrm{speed}}\mathbf{c}_M=\mathbf{0}.
$$

The familiar radial-phase coupling is the subcase

$$
b_{a,\sigma}+\psi_{a,\sigma}'=0.
$$

### 5.3 Radial Rows

Let

$$
\Gamma_R=\frac{c_f^2R}{\kappa\epsilon^2}.
$$

The rigid dimensionless radial residual is

$$
r_{\mathrm{rad},i,n}^{0}
=
\mathbf{n}_i^0(\theta_n)\cdot
\widetilde{\mathbf{F}}_{i,n}^{0}
+
\Gamma_R.
$$

For a displacement column, define

$$
\rho_{i,n}^{[\ell]}
=
\mathbf{n}_i^0(\theta_n)\cdot
\boldsymbol{\zeta}_i^{[\ell]}(\theta_n),
$$

and

$$
\delta\mathbf{n}_{i,n}^{[\ell]}
=
\left(
I-
\mathbf{n}_i^0(\theta_n)
\mathbf{n}_i^0(\theta_n)^T
\right)
\boldsymbol{\zeta}_i^{[\ell]}(\theta_n).
$$

Because $\omega=c_f/R$, the normalized first-order variation of
$-\ddot{\rho}_i+c_f^2/\rho_i$ contributes

$$
-\Gamma_R
\left[
\frac{d^2}{d\theta^2}\rho_i^{[\ell]}(\theta_n)
+
\rho_i^{[\ell]}(\theta_n)
\right].
$$

The radial matrix row is

$$
A_{\mathrm{rad},(i,n),\ell}
=
\delta\mathbf{n}_{i,n}^{[\ell]}\cdot
\widetilde{\mathbf{F}}_{i,n}^{0}
+
\mathbf{n}_i^0(\theta_n)\cdot
\delta\widetilde{\mathbf{F}}_{i,n}^{[\ell]}
$$

$$
\quad
-
\Gamma_R
\left[
\frac{d^2}{d\theta^2}\rho_i^{[\ell]}(\theta_n)
+
\rho_i^{[\ell]}(\theta_n)
\right]
+
\mathbf{1}_{\ell=\gamma_R}.
$$

The column $\gamma_R$ represents a first-order correction to the scale/coupling row. If the scale/coupling value is fixed externally, delete this column and set $\mathbf{1}_{\ell=\gamma_R}=0$.

---

## 6. Finite Linear Balance System

The raw collocation system is

$$
A_M\mathbf{c}_M
=
-
\mathbf{r}_M^0,
$$

where

$$
A_M
=
\begin{bmatrix}
A_{\mathrm{tan}}\\
A_{\mathrm{speed}}\\
A_{\mathrm{rad}}
\end{bmatrix},
\qquad
\mathbf{r}_M^0
=
\begin{bmatrix}
\mathbf{r}_{\mathrm{tan}}^0\\
\mathbf{0}\\
\mathbf{r}_{\mathrm{rad}}^0
\end{bmatrix}.
$$

After gauge reduction,

$$
\widehat{A}_M\mathbf{a}_M
=
-
\mathbf{r}_M^0,
\qquad
\widehat{A}_M=A_MN_G.
$$

If symmetry is proved for the same active-root ledger, a row-reduction matrix $\Pi$ may be applied:

$$
\Pi\widehat{A}_M\mathbf{a}_M
=
-
\Pi\mathbf{r}_M^0.
$$

The matrix $\Pi$ is allowed only after the proof shows that active-root sets, delays, Jacobians, polarity products, and projection rows are equivariant under the same symmetry. Instantaneous octahedral symmetry alone is not enough.

For numerical work, use a weighted least-squares diagnostic

$$
\mathcal{J}_{\mathrm{lin}}
=
\left\|
W
\left(
\mathbf{r}_M^0+\widehat{A}_M\mathbf{a}_M
\right)
\right\|_2^2,
$$

but the theorem target is exact linear solvability in the declared row space, not merely a reduced norm.

---

## 7. Floor And Support Constraints

A linear solution is admissible only if it remains inside the certified neighborhood of the rigid root ledger.

Define the first-order noncollision displacement size

$$
\Delta_x(\mathbf{c}_M)
=
\max_{i\ne j,n}
\left\|
\boldsymbol{\zeta}_i(\theta_n)
-
\boldsymbol{\zeta}_j(\theta_n)
\right\|.
$$

A sufficient sampled noncollision condition is

$$
R\Delta_x(\mathbf{c}_M)
<
d_{\min}^{0}-\epsilon_x.
$$

Define the first-order Jacobian variation size

$$
\Delta_J(\mathbf{c}_M)
=
\max_{i,n,(j,\alpha)\in\mathcal{A}_{i,n}^{0}}
|\delta J_{ij,n}^{\alpha}(\mathbf{c}_M)|.
$$

A sufficient sampled Jacobian-floor condition is

$$
\Delta_J(\mathbf{c}_M)
<
J_{\min}^{0}-\epsilon_J.
$$

The support-band displacement is

$$
\Delta_{\rho}(\mathbf{c}_M)
=
\max_{i,n}
\left|
\mathbf{n}_i^0(\theta_n)\cdot
\boldsymbol{\zeta}_i(\theta_n)
\right|.
$$

The first-order support-band screen is

$$
R\Delta_{\rho}(\mathbf{c}_M)<\delta.
$$

The active-root bracket screen requires

$$
\max_{i,n,(j,\alpha)}
|\nu_{ij,n}^{\alpha}(\mathbf{c}_M)|
<
\Delta_{\mathrm{bracket}},
$$

where $\Delta_{\mathrm{bracket}}$ is the smallest certified distance, in dimensionless delay units, from a retained root to a bracket endpoint or neighboring root label.

These inequalities are not branch proofs. They are open-neighborhood tests that decide whether the first-order matrix solution deserves nonlinear rescreening.

---

## 8. Rank And Solvability Theorem Target

Let $A_{\mathrm{red}}=\Pi A_MN_G$ and $\mathbf{r}_{\mathrm{red}}^0=\Pi\mathbf{r}_M^0$, where $\Pi=I$ unless a root-ledger symmetry reduction has been proved.

### Theorem Target: First-Order Coupled Balance

Assume:

1. The active-root ledger $\mathcal{A}_{i,n}^{0}$ is fixed and every retained root is simple with $|J_{ij,n}^{0,\alpha}|>\epsilon_J$.
2. The force, speed, and radial residual maps are differentiable on a floor-preserving neighborhood of the rigid carrier.
3. The gauge rows $G_M\mathbf{c}_M=0$ remove only center, orientation, common phase, and common support-radius gauge directions.
4. The finite Fourier grid resolves the selected mode space, with no aliasing in the sampled residual rows.

Then a first-order Fourier deformation killing tangential, speed, and radial residuals on the declared collocation row exists if and only if

$$
\operatorname{rank}(A_{\mathrm{red}})
=
\operatorname{rank}
\left(
\begin{bmatrix}
A_{\mathrm{red}} & -\mathbf{r}_{\mathrm{red}}^0
\end{bmatrix}
\right).
$$

Equivalently,

$$
\mathbf{y}^T\mathbf{r}_{\mathrm{red}}^0=0
\qquad
\text{for every }
\mathbf{y}\in\ker(A_{\mathrm{red}}^T).
$$

If

$$
\operatorname{rank}(A_{\mathrm{red}})
=
\text{number of residual rows},
$$

then the selected deformation space can kill any residual vector compatible with the gauges. If the augmented-rank equality fails, no deformation using the chosen finite modes, active-root convention, and scale/coupling choice can kill all three residual families at first order.

If the rank condition holds, a candidate coefficient vector must still satisfy

$$
A_{\mathrm{red}}\mathbf{a}_M=-\mathbf{r}_{\mathrm{red}}^0,
$$

and the floor inequalities from Section 7. If every exact solution violates at least one floor inequality, the correct conclusion is not a retained branch; it is

$$
\texttt{linear-solvable-but-floor-inadmissible}.
$$

If the least-squares residual is nonzero, the failure code is sharper:

$$
\texttt{linear-range-defect}.
$$

The nonlinear retained-branch theorem would require a separate step: prove that the $O(\|\mathbf{c}_M\|^2)$ remainder can be controlled, rescreen active roots on the deformed support-band carrier, and close the event/action rows on the same branch data.

---

## 9. Proof Route

1. **Root differentiability.** The simple-root floor gives the root-shift formula by the implicit function theorem applied to $G_{ij}(t,s)=0$.
2. **Force differentiability.** The noncollision and Jacobian floors keep $y_{ij}^{\alpha}$ and $J_{ij}^{\alpha}$ away from singular values, so the per-root force is differentiable in the finite-mode coefficients.
3. **Residual linearization.** Substituting the force variation into the tangential and radial projection equations gives the row formulas in Section 5. The speed row is the linearization of $\|\mathbf{u}_i\|=c_f$.
4. **Finite-dimensional reduction.** Fourier truncation and collocation convert the derivative into the matrix $A_M$.
5. **Gauge quotient.** Multiplication by $N_G$ removes nonphysical null directions before rank is tested.
6. **Linear algebra.** The augmented-rank equality is necessary and sufficient for first-order residual cancellation in the selected finite space.
7. **Open-floor screen.** The floor inequalities decide whether the linear solution lies in the domain where the derivative and active-root ledger remain valid.

This proof route deliberately stops at first order. It identifies the next mathematical obstruction: either a range defect in the coupled linear operator, or a floor obstruction caused by the size of the deformation required to cancel the rigid residuals.

---

## 10. Minimal Output Record For A Linear Solver

A solver implementing this packet should emit:

| Field | Contents |
| --- | --- |
| `mode_cutoff` | $M$, $K$, Fourier basis, endpoint convention |
| `active_roots` | $\mathcal{A}_{i,n}^{0}$, $y_{ij,n}^{\alpha}$, $J_{ij,n}^{0,\alpha}$, root statuses |
| `gauge_matrix` | $G_M$, null basis $N_G$, removed gauge dimensions |
| `residual_vector` | $\mathbf{r}_{\mathrm{tan}}^0$, $\mathbf{0}$, $\mathbf{r}_{\mathrm{rad}}^0$ |
| `linear_matrix` | $A_{\mathrm{tan}}$, $A_{\mathrm{speed}}$, $A_{\mathrm{rad}}$, and $A_{\mathrm{red}}$ |
| `rank_test` | $\operatorname{rank}(A_{\mathrm{red}})$ and augmented rank |
| `left_null_obstructions` | basis for $\ker(A_{\mathrm{red}}^T)$ and projections against $\mathbf{r}_{\mathrm{red}}^0$ |
| `solution_family` | particular solution plus nullspace basis, if rank-solvable |
| `floor_screen` | $\Delta_x$, $\Delta_J$, $\Delta_{\rho}$, and root-bracket margin |
| `failure_code` | `linear-range-defect`, `linear-solvable-but-floor-inadmissible`, or `linear-candidate-for-nonlinear-rescreen` |

Priority decision: this matrix packet is not promotion-ready by itself. It becomes promotion material only if a later nonlinear candidate passes the same active-root, support-band, speed, tangential, radial, event/action, and stability rows required by the tri-binary decision gate.
