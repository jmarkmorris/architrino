# Intrinsic Curve Solver Protocol

Promotion status: `priority-only`. This packet turns the intrinsic curve equation from [intrinsic-curve-dynamics-equation.md](intrinsic-curve-dynamics-equation.md) into a concrete collocation solver protocol. It builds on the search constraints in [retained-branch-dynamics-protocol.md](retained-branch-dynamics-protocol.md), the current synthesis in [current-dynamics-synthesis.md](current-dynamics-synthesis.md), and the first-order rank target in [linearized-dynamics-matrix.md](linearized-dynamics-matrix.md).

Claim level: solver specification and theorem-target support. This document does not claim a retained shell braid branch, does not certify a nonlinear solution, and does not authorize migration into `content/markdown/aaa`.

This packet is the fixed-speed intrinsic solver unless the unknown vector is augmented by a bounded speed factor. The bounded-speed executable successor is [bounded-speed-factor-executable-solver-protocol.md](bounded-speed-factor-executable-solver-protocol.md), where the solver variables are $(a,b,\gamma)$ and the residual includes $\mathcal{R}_{\parallel}^{\nu}$, $\mathcal{R}_{\perp}^{\nu}$, causal-time roots, and speed-band rows.

---

## 1. Solver Target

The solver searches for six closed dimensionless loops

$$
\mathbf{Y}_i:\mathbb{R}/L\mathbb{Z}\to\mathbb{R}^3,
\qquad
i=1,\ldots,6,
$$

with unit arclength speed

$$
\|\mathbf{Y}_i'(\lambda)\|=1,
$$

and one retained active-root ledger satisfying

$$
\mathbf{Y}_i''(\lambda)
=
\Gamma P_i^\perp(\lambda)\widetilde{\mathbf{F}}_i(\lambda),
\qquad
\mathbf{Y}_i'(\lambda)\cdot\widetilde{\mathbf{F}}_i(\lambda)=0.
$$

For numerical work use a computational phase

$$
\theta\in[0,2\pi),
$$

and a common dimensionless arclength scale

$$
\ell=\frac{L}{2\pi}.
$$

Write the computational loop as

$$
\mathbf{Z}_i(\theta)=\mathbf{Y}_i(\ell\theta).
$$

Then

$$
\mathbf{T}_i(\theta)
=
\frac{\partial_\theta\mathbf{Z}_i(\theta)}{\ell},
\qquad
\mathbf{K}_i(\theta)
=
\frac{\partial_{\theta\theta}\mathbf{Z}_i(\theta)}{\ell^2}.
$$

The unit-speed row becomes

$$
\|\partial_\theta\mathbf{Z}_i(\theta)\|^2-\ell^2=0.
$$

This common-period chart is the first retained-solver target. Rational winding variants may replace the single $\ell$ with $\ell_i$ and integer winding data, but such a variant must emit an explicit period-length row and is not the default protocol.

There is a second, less restrictive numerical chart. One may represent the geometric shapes by finite Fourier curves $\mathbf{Z}_i(\theta)$, require only

$$
\left\|\partial_\theta\mathbf{Z}_i(\theta)\right\|>0,
\qquad
L_i=L_*,
$$

and compute the physical phase through the inverse arclength maps. In that arclength-inverse shape chart the unit-speed row holds by construction and $\mathcal{R}_T$ is replaced by the regularity floor above. The force, root, and curvature rows must then be recomputed with source phases $\theta_j(\lambda-\eta)$ rather than $\theta-\eta/\ell$. See [unit-speed-chart-reparameterization.md](unit-speed-chart-reparameterization.md).

---

## 2. Unknown Vector

Choose a Fourier cutoff $M$ and a collocation count $K\ge 4M+1$. Use nodes

$$
\theta_n=\frac{2\pi n}{K},
\qquad
n=0,\ldots,K-1.
$$

Represent each loop by the real Fourier series

$$
\mathbf{Z}_i(\theta)
=
\mathbf{z}_{i,0}
+
\sum_{m=1}^{M}
\left(
\mathbf{a}_{i,m}\cos m\theta
+
\mathbf{b}_{i,m}\sin m\theta
\right).
$$

The raw unknown vector is

$$
\alpha=
\left(
\{\mathbf{z}_{i,0}\}_{i=1}^{6},
\{\mathbf{a}_{i,m},\mathbf{b}_{i,m}\}_{i=1,m=1}^{6,M},
\ell,
\Gamma,
\delta,
\pi_{\mathrm{pol}},
\mathsf{root\_policy}
\right).
$$

Here $\pi_{\mathrm{pol}}$ is the fixed polarity assignment for the run. The neutral default is

$$
\sigma_{a,+}=+1,
\qquad
\sigma_{a,-}=-1.
$$

The quantities $\delta$ and $\mathsf{root\_policy}$ are continuation and ledger parameters rather than free proof decorations. A run may optimize over $\ell$ and diagnostic $\Gamma$, but a retained branch packet must later replace diagnostic $\Gamma$ with the branch action, energy, and inertia ledger.

### 2.1 Seed Basis

The default seed is the rigid octahedral carrier:

$$
\begin{aligned}
\mathbf{p}_1(\theta)&=(\cos\theta,\sin\theta,0),\\
\mathbf{p}_2(\theta)&=(0,\cos\theta,\sin\theta),\\
\mathbf{p}_3(\theta)&=(\sin\theta,0,\cos\theta),
\end{aligned}
$$

with

$$
\mathbf{Z}_{a,+}^{0}(\theta)=\mathbf{p}_a(\theta+\phi_a),
\qquad
\mathbf{Z}_{a,-}^{0}(\theta)=-\mathbf{p}_a(\theta+\phi_a),
\qquad
\ell^0=1.
$$

Fourier coefficients should be initialized from this seed and then continued through added modes. Plane-normal precession and antipodal relaxation are represented directly by the full vector Fourier coefficients; no separate angle-clock phase variable is required in the final intrinsic chart.

---

## 3. Gauge Rows

The raw Fourier vector contains nonphysical directions. Impose the following algebraic gauge rows before rank tests or Newton steps:

| Gauge row | Collocation or coefficient condition |
| --- | --- |
| Center gauge | $\sum_{i=1}^{6}\mathbf{Z}_i(\theta_n)=\mathbf{0}$ for all $n$, or equivalently mode by mode |
| Velocity center gauge | $\sum_{i=1}^{6}\partial_\theta\mathbf{Z}_i(\theta_n)=\mathbf{0}$ for all $n$ |
| Translation pin | $\sum_i\mathbf{z}_{i,0}=\mathbf{0}$ if center gauge is not imposed mode by mode |
| Orientation gauge | fix three rotational degrees, for example by pinning the seed-frame projections of selected first Fourier coefficients |
| Phase gauge | fix one common phase, for example $\mathbf{a}_{1,1}\cdot\mathbf{e}_2=0$ with positive orientation row |
| Scale gauge | either fix $\ell$ during a continuation step or keep $\ell$ as the single scale row and prevent independent mean-radius drift |

Let

$$
\mathcal{G}(\alpha)=0
$$

denote these rows, and let $N_G$ span the null space of the linearized gauge rows at the current continuation point. All rank checks use gauge-reduced columns.

---

## 4. Collocation Residuals

At each node $(i,n)$ compute

$$
\mathbf{Z}_{i,n}=\mathbf{Z}_i(\theta_n),
\qquad
\mathbf{T}_{i,n}=\frac{\partial_\theta\mathbf{Z}_i(\theta_n)}{\ell},
\qquad
\mathbf{K}_{i,n}=\frac{\partial_{\theta\theta}\mathbf{Z}_i(\theta_n)}{\ell^2}.
$$

The unit-speed row is

$$
R_{T,i,n}
=
\|\partial_\theta\mathbf{Z}_i(\theta_n)\|^2-\ell^2.
$$

The center row is

$$
R_{C,n}
=
\sum_i\mathbf{Z}_i(\theta_n).
$$

The support-band row is reported as inequalities

$$
1-\delta
\le
\|\mathbf{Z}_{i,n}\|
\le
1+\delta.
$$

The noncollision floor is

$$
d_{\min}
=
\min_{i\ne j,n}
\|\mathbf{Z}_{i,n}-\mathbf{Z}_{j,n}\|.
$$

The arclength residual vector used by the solver is

$$
\mathcal{R}_{\mathrm{curve}}
=
\left(
R_T,
R_C,
R_{\mathrm{support}},
R_{\mathrm{root}},
R_{\mathrm{tan}},
R_{\mathrm{curv}}
\right),
$$

with event/action, exposure, Lorentz, photon, color, and strong-field rows marked `not_computed` unless a later packet supplies them on the same root ledger.

In the arclength-inverse shape chart, replace $R_T$ by the inequality floor

$$
\min_{i,n}\|\partial_\theta\mathbf{Z}_i(\theta_n)\|>0
$$

and evaluate $R_{\mathrm{tan}}$ and $R_{\mathrm{curv}}$ using arclength tangents and curvature. A failure of the constant-speed Fourier $R_T$ row is therefore a chart failure unless the arclength-inverse chart also fails the physical force and curvature rows.

---

## 5. Active-Root Solve

For receiver node $\theta_n$, ordered pair $(i,j)$, and dimensionless delay $\eta>0$, solve

$$
G_{ij,n}(\eta)
=
\left\|
\mathbf{Z}_i(\theta_n)
-
\mathbf{Z}_j\!\left(\theta_n-\frac{\eta}{\ell}\right)
\right\|
-
\eta
=0,
$$

where the source phase is evaluated periodically. Define

$$
\widehat{\mathbf{R}}_{ij,n}^{\alpha}
=
\frac{
\mathbf{Z}_i(\theta_n)
-
\mathbf{Z}_j\!\left(\theta_n-\eta_{ij,n}^{\alpha}/\ell\right)
}{
\eta_{ij,n}^{\alpha}
},
$$

and

$$
J_{ij,n}^{\alpha}
=
1-
\mathbf{T}_j\!\left(\theta_n-\frac{\eta_{ij,n}^{\alpha}}{\ell}\right)
\cdot
\widehat{\mathbf{R}}_{ij,n}^{\alpha}.
$$

The derivative is

$$
\frac{dG_{ij,n}}{d\eta}
=
-J_{ij,n}.
$$

### 5.1 Bracket And Refinement Pass

For each $(i,j,n)$:

1. Set a memory window $0<\eta\le\eta_{\max}$, with $\eta_{\max}=2(1+\delta)$ in the center-gauge rest search unless a larger support-band bound is declared.
2. Exclude the near-zero same-source interval $0<\eta<\eta_{\mathrm{self}}$ unless $\mathsf{root\_policy}$ declares `regularized-fold-layer` or `split-source-retained`. Ordinary same-curve self roots are excluded by [same-source-self-root-exclusion-lemma.md](same-source-self-root-exclusion-lemma.md).
3. Sample $G_{ij,n}$ on an adaptive mesh fine enough to isolate every sign-changing bracket and every local near-zero candidate satisfying $|G|<\epsilon_G$.
4. Refine each bracket with a bracket-preserving Newton, secant, or Brent step until

   $$
   |G_{ij,n}(\eta_{ij,n}^{\alpha})|\le\epsilon_G.
   $$

5. Reject duplicate roots whose delay separation is below $\epsilon_{\eta,\mathrm{merge}}$ unless a fold-layer convention explicitly splits them.
6. Continue root labels $\alpha$ from the previous continuation step by nearest delay and source pair, subject to the Jacobian and bracket-margin floors.

The active-root ledger is

$$
\mathcal{A}_{i,n}
=
\{(j,\alpha,\eta_{ij,n}^{\alpha},J_{ij,n}^{\alpha},\mathsf{status})\}.
$$

The root residual is

$$
R_{\mathrm{root}}
=
\max_{i,n,(j,\alpha)}
\frac{|G_{ij,n}(\eta_{ij,n}^{\alpha})|}{\epsilon_G}.
$$

The root ledger fails if a required partner or cross-binary label is absent, if root count changes without a declared branch event, or if a required root is assigned `reject`.

---

## 6. Force And Dynamics Rows

With self and medium terms disabled by default, the dimensionless force is

$$
\widetilde{\mathbf{F}}_{i,n}
=
\sum_{(j,\alpha)\in\mathcal{A}_{i,n}}
\sigma_i\sigma_j
\frac{
\widehat{\mathbf{R}}_{ij,n}^{\alpha}
}{
(\eta_{ij,n}^{\alpha})^2
|J_{ij,n}^{\alpha}|
}.
$$

Optional self or medium-response terms may be appended only when their regulator, action, and event rows are supplied on the same ledger.

The tangential row is

$$
R_{\mathrm{tan},i,n}
=
\mathbf{T}_{i,n}\cdot\widetilde{\mathbf{F}}_{i,n}.
$$

The normal projector is

$$
P_{i,n}^{\perp}
=
I-\mathbf{T}_{i,n}\mathbf{T}_{i,n}^{T}.
$$

The curvature row is

$$
\mathbf{R}_{\mathrm{curv},i,n}
=
\mathbf{K}_{i,n}
-
\Gamma P_{i,n}^{\perp}\widetilde{\mathbf{F}}_{i,n}.
$$

For diagnostics, the best scalar fit is

$$
\Gamma_*
=
\frac{
\sum_{i,n}
\mathbf{K}_{i,n}\cdot
P_{i,n}^{\perp}\widetilde{\mathbf{F}}_{i,n}
}{
\sum_{i,n}
\|P_{i,n}^{\perp}\widetilde{\mathbf{F}}_{i,n}\|^2
}.
$$

The reported solver may use $\Gamma_*$ to classify a failed row, but a retained candidate must report whether $\Gamma$ was diagnostic, continuation-fixed, or ledger-derived.

---

## 7. Floors And Barriers

The hard floors are

$$
d_{\min}>\epsilon_x,
\qquad
J_{\min}>\epsilon_J,
\qquad
\eta_{\min}>\epsilon_\eta,
\qquad
1-\delta\le\|\mathbf{Z}_{i,n}\|\le1+\delta.
$$

Here

$$
J_{\min}
=
\min_{i,n,(j,\alpha)\in\mathcal{A}_{i,n}}
|J_{ij,n}^{\alpha}|,
\qquad
\eta_{\min}
=
\min_{i,n,(j,\alpha)\in\mathcal{A}_{i,n}}
\eta_{ij,n}^{\alpha}.
$$

Use a logarithmic barrier for a positive margin $m>0$:

$$
B(m;m_0,\beta)
=
-\beta\log\left(\frac{m}{m_0}\right),
\qquad
0<m\le m_0,
$$

and $B=0$ for $m>m_0$. If $m\le0$, the candidate is infeasible.

The solver barriers are

$$
\mathcal{B}
=
B(d_{\min}-\epsilon_x;m_x,\beta_x)
+
B(J_{\min}-\epsilon_J;m_J,\beta_J)
+
B(\eta_{\min}-\epsilon_\eta;m_\eta,\beta_\eta)
+
B(m_{\mathrm{support}};m_s,\beta_s)
+
B(m_{\mathrm{root}};m_r,\beta_r),
$$

where

$$
m_{\mathrm{support}}
=
\min_{i,n}
\left[
\delta-
\left|
\|\mathbf{Z}_{i,n}\|-1
\right|
\right],
$$

and $m_{\mathrm{root}}$ is the smallest certified delay separation between distinct retained root labels or between a retained root and a bracket endpoint.

The hard-gate rule is strict: a candidate with finite residual norm but nonpositive barrier margin is rejected, not retained.

---

## 8. Objective Function

Let $\epsilon_k$ be declared tolerances and $w_k$ declared weights. The finite objective is

$$
\mathcal{J}_{\mathrm{curve}}(\alpha)
=
w_T
\left\|
\frac{R_T}{\epsilon_T}
\right\|_2^2
+
w_C
\left\|
\frac{R_C}{\epsilon_C}
\right\|_2^2
+
w_{\mathrm{root}}
\left\|
\frac{R_{\mathrm{root}}}{1}
\right\|_2^2
$$

$$
\quad
+
w_{\mathrm{tan}}
\left\|
\frac{R_{\mathrm{tan}}}{\epsilon_{\mathrm{tan}}}
\right\|_2^2
+
w_{\mathrm{curv}}
\left\|
\frac{R_{\mathrm{curv}}}{\epsilon_{\mathrm{curv}}}
\right\|_2^2
+
\mathcal{B}.
$$

The objective is a search device. Acceptance is by residual rows and hard gates:

$$
\max_k
\frac{\|\mathcal{R}_k\|}{\epsilon_k}
\le1,
$$

with no hard-floor violation. Rows marked `not_computed` cannot support branch, mass, Lorentz, photon, color, or observer-export claims.

---

## 9. Continuation Strategy

The continuation path should be reproducible and monotone in model commitment.

### Stage A: Rigid Reproduction

Set $M=1$, $\ell=1$, $\delta=0$, use the rigid octahedral coefficients, and reproduce the known rigid failure with the same partner and cross-binary root convention. Exit with `rigid-baseline-reproduced` or stop with `root-implementation-mismatch`.

### Stage B: Intrinsic Gauge Initialization

Enable the unit-speed and center-gauge rows in the intrinsic chart while keeping the rigid active-root labels. This stage should produce the same force residuals as the arclength rigid screen up to interpolation error. Exit with `intrinsic-chart-verified` or stop with `arclength-chart-mismatch`.

### Stage C: Low-Mode Pure Geometry Continuation

Increase $M$ and open full vector Fourier coefficients. Keep self and medium terms disabled. Continue $\delta/R$ from $0$ to the declared support-band width. Accept a continuation step only when root labels persist, $d_{\min}$ and $J_{\min}$ stay above floors, and the rank check in Section 10 has no immediate range defect.

### Stage D: Antipodal-Relaxed And Nonplanar Continuation

Allow the plus and minus partners to separate from exact antipodal opposition and allow nonplanar loop deformations. Preserve the central inventory and polarity row. If this stage reduces tangential leakage only by pushing $J_{\min}$ or $d_{\min}$ toward its floor, report `floor-traded-residual-reduction`.

### Stage E: Ledger Extension Only If Needed

Append a self/fold-layer or medium-response term only after the pure-geometry stages fail with stable evidence. The extension must declare its regulator, force contribution, event/action hook, and weak-limit obligation before it is included in $\widetilde{\mathbf{F}}$.

### Stage F: Mesh And Mode Refinement

For any near-pass candidate, refine $K$, increase $M$, rerun the root solve, and compare residuals, floors, and active-root counts. A candidate whose apparent closure disappears under refinement exits as `collocation-aliasing-fail`.

---

## 10. Rank And Conditioning Checks

At every accepted continuation point, form the reduced residual map

$$
\widehat{\mathcal{R}}(\mathbf{a})
=
\mathcal{R}_{\mathrm{curve}}(\alpha_*+N_G\mathbf{a}),
$$

where $N_G$ removes the gauge rows. Compute the Jacobian

$$
A_{\mathrm{curve}}
=
D\widehat{\mathcal{R}}(0)
$$

by automatic differentiation, complex-step differentiation, or centered finite differences with a root-label-preserving step size. The derivative is valid only if the active roots continue with the same labels and floors during the perturbation.

The local range test is

$$
\operatorname{rank}(A_{\mathrm{curve}})
=
\operatorname{rank}
\left(
\begin{bmatrix}
A_{\mathrm{curve}} & -\widehat{\mathcal{R}}(0)
\end{bmatrix}
\right).
$$

Equivalently,

$$
\mathbf{y}^{T}\widehat{\mathcal{R}}(0)=0
\qquad
\text{for every }
\mathbf{y}\in\ker(A_{\mathrm{curve}}^T).
$$

Report:

| Rank field | Required content |
| --- | --- |
| `gauge_dim` | raw coefficient dimension, gauge row rank, reduced dimension |
| `residual_dim` | number of active residual rows by family |
| `singular_values` | sorted singular values of $A_{\mathrm{curve}}$ |
| `rank_tolerance` | numerical threshold used for rank |
| `rank` | $\operatorname{rank}(A_{\mathrm{curve}})$ |
| `augmented_rank` | rank after appending $-\widehat{\mathcal{R}}(0)$ |
| `left_null_obstructions` | projections $\mathbf{y}^{T}\widehat{\mathcal{R}}(0)$ for a basis of $\ker(A_{\mathrm{curve}}^T)$ |
| `range_energy` | fraction $\|P_A\widehat{\mathcal{R}}(0)\|^2/\|\widehat{\mathcal{R}}(0)\|^2$ explained by the current finite-mode column space |
| `left_null_pair_even_fraction` | fraction of any stable left-null obstruction supported on pair-even dynamics or tangential rows |
| `actual_to_predicted_descent` | ratio between retracted nonlinear residual decrease and the corresponding linearized trust prediction |
| `support_trade` | support-band change attached to each residual decrease, including $r_{\min}$, $r_{\max}$, and max coefficient |
| `linear_step_vector` | full-precision reduced-basis step, lifted coefficient step, clipping radius, and length or gauge retraction correction used for reproduction |
| `arclength_inverse_variation` | inverse phase, tangent, curvature, delayed source phase, and root-delay derivative status from [arclength-inverse-variation-formulas.md](arclength-inverse-variation-formulas.md) |
| `eta_max` | declared finite-memory/search depth used for root enumeration and force evaluation |
| `eta_active_max` | maximum retained active delay after root enumeration |
| `r_max` | sampled or interval-certified support radius used to assess memory completeness |
| `memory_policy` | `fixed-window`, `active-window-certified`, or `support-complete-memory` |
| `memory_window_frontier` | maximum active delay by source pair, first label crossing the declared $\eta_{\max}$, and extended-window rescore if a crossing occurs |
| `root_enumeration_certificate` | in-window root brackets, excluded-interval gap margins, and tail-exclusion status; the support bound alone only excludes roots beyond $2r_{\max}$, while [tail-interval-root-exclusion-certificate.md](tail-interval-root-exclusion-certificate.md) gives the sharper tail row |
| `tail_force_error_bound` | omitted-force status for uncertified tails, including $N_{i,n}^{\mathrm{tail}}$, $J_{\mathrm{tail}}$, $\epsilon_F^{\mathrm{tail}}$, and failure status from [unresolved-tail-force-error-bound.md](unresolved-tail-force-error-bound.md) |
| `adaptive_memory_trust_radius` | active-window, support-memory, and tail-certificate continuation radii from [adaptive-memory-trust-radius-lemma.md](adaptive-memory-trust-radius-lemma.md) |
| `support_complete_obstruction_certificate` | left-null basis, cokernel residual norm, nonlinear remainder bound, tail/discretization error, and decision status from [support-complete-dynamics-obstruction-certificate.md](support-complete-dynamics-obstruction-certificate.md) |
| `support_complete_newton_closure` | range right-inverse, Kantorovich radius, corrected range residual, cokernel closure norm, and decision status from [support-complete-newton-closure-certificate.md](support-complete-newton-closure-certificate.md) |
| `antipodal_relaxation_column_certificate` | exact obstruction vector, pair-even fraction, projected pair-midpoint columns, and relaxation decision from [antipodal-relaxation-column-certificate.md](antipodal-relaxation-column-certificate.md) |
| `gamma_fit_action_identifiability` | force-norm floor, fit uncertainty, action-derived $\Gamma_B$, scalar-inertia residual, and decision status from [gamma-fit-action-identifiability-lemma.md](gamma-fit-action-identifiability-lemma.md) |
| `collocation_refinement_error` | residual derivative envelopes, root-label mesh guards, excluded-gap guards, projector drift, and $\epsilon_{\mathrm{disc}}$ from [collocation-refinement-error-certificate.md](collocation-refinement-error-certificate.md) |
| `finite_mode_convergence` | refinement-sequence floors, compactness bounds, residual convergence, and limit status from [finite-mode-branch-convergence-theorem.md](finite-mode-branch-convergence-theorem.md) |
| `same_source_self_root_policy` | ordinary self-root exclusion, fold-layer regulator, or split-source status from [same-source-self-root-exclusion-lemma.md](same-source-self-root-exclusion-lemma.md) |
| `fold_layer_regularization_action` | regulated fold action, weak-limit, curl, and event-ledger status from [fold-layer-regularization-action-theorem.md](fold-layer-regularization-action-theorem.md) |
| `medium_response_constitutive_closure` | response map, memory, exchange, isotropy, curl, and conservation status from [medium-response-constitutive-closure-theorem.md](medium-response-constitutive-closure-theorem.md) |
| `delayed_force_lipschitz_envelope` | $C_0,C_1,C_2$, root-direction-Jacobian derivative bounds, $L_F$, and consumers from [delayed-force-lipschitz-envelope.md](delayed-force-lipschitz-envelope.md) |
| `root_ledger_floquet_stability` | return section, monodromy, gauge multiplier split, transverse spectrum, and perturbation recovery from [root-ledger-floquet-stability-certificate.md](root-ledger-floquet-stability-certificate.md) |
| `noether_action_conservation_closure` | Noether current, event/action, conservation-bound, and ledger-match status from [noether-action-conservation-closure-theorem.md](noether-action-conservation-closure-theorem.md) |
| `floor_sensitivity` | first-order changes in $d_{\min}$, $J_{\min}$, support margin, and root-bracket margin |
| `conditioning` | condition number after gauge reduction and row weighting |

Failure codes:

| Failure code | Meaning |
| --- | --- |
| `curve-linear-range-defect` | augmented-rank equality fails |
| `curve-rank-ill-conditioned` | rank result changes under tolerance or mesh refinement |
| `root-label-derivative-invalid` | derivative step changes active-root labels or root status |
| `fixed-phase-derivative-invalid` | an arclength-inverse derivative was computed without inverse-phase or delayed-root phase variation |
| `linear-step-floor-inadmissible` | Newton or least-squares step violates a hard floor to first order |
| `finite-mode-root-ledger-loss` | clipped nonlinear improvement changes an active-root count or label on a refined grid |
| `finite-mode-memory-window-exit` | clipped nonlinear improvement pushes a retained root outside the declared finite-memory/search window |
| `finite-mode-tail-uncertified` | $\eta_{\max}<2r_{\max}$ and no excluded-interval certificate is supplied for the tail |
| `tail-force-error-unbounded` | an uncertified tail has no finite count/Jacobian envelope, so omitted delayed-force error cannot be bounded |
| `adaptive-memory-trust-radius-open` | the run has no certified continuation radius preserving the same active-root and memory ledger |
| `obstruction-certificate-open` | left-null/cokernel residual, nonlinear remainder, tail error, or discretization projection data are missing |
| `support-complete-newton-closure-open` | range/cokernel Newton certificate data are missing or fail on the support-complete ledger |
| `antipodal-relaxation-column-certificate-open` | pair-midpoint columns have not been tested against a certified exact-antipodal obstruction |
| `gamma-fit-action-identifiability-open` | fitted $\Gamma_K$ lacks action-derived $\Gamma_B$, scalar inertia, or fit uncertainty data |
| `collocation-refinement-certificate-open` | off-grid residual, root-label, excluded-gap, or projector-drift errors are not bounded |
| `finite-mode-convergence-open` | no uniformly certified refinement sequence promotes finite rows to a curve-level branch |
| `ordinary-self-root-excluded` | ordinary same-curve self roots cannot be retained with positive Jacobian floor in the arclength chart |
| `fold-layer-action-row-open` | fold-layer force is not generated by a certified regulated action and event ledger |
| `medium-response-constitutive-closure-open` | medium response lacks a constitutive response/action and exchange-ledger certificate |
| `delayed-force-lipschitz-envelope-open` | per-root force derivative constants are not emitted on the current ledger |
| `root-ledger-floquet-stability-open` | root-ledger-preserving monodromy and perturbation-recovery rows are not certified |
| `noether-conservation-closure-open` | action/event conservation rows are not derived on one matched ledger |
| `support-traded-residual-reduction` | residual decreases mainly by expanding the support band without action-scale closure |
| `pair-even-left-null-obstruction` | stable left-null obstruction is concentrated in pair-even rows and exact-antipodal continuation is overconstrained |

The rank check is not an existence proof. It decides whether the chosen finite curve basis has local directions capable of reducing the current residual while staying inside the same root chart.

---

## 11. Newton And Trust-Region Step

Use a constrained trust-region method on the gauge-reduced variables:

$$
\min_{\Delta\mathbf{a}}
\left\|
W
\left(
\widehat{\mathcal{R}}(0)
+
A_{\mathrm{curve}}\Delta\mathbf{a}
\right)
\right\|_2^2
$$

subject to first-order floor margins

$$
d_{\min}+\nabla d_{\min}\cdot\Delta\mathbf{a}>\epsilon_x,
$$

$$
J_{\min}+\nabla J_{\min}\cdot\Delta\mathbf{a}>\epsilon_J,
$$

and the support and root-bracket margin analogues. The trust radius is

$$
\|\Delta\mathbf{a}\|_2\le\rho_{\mathrm{trust}}.
$$

After each trial step:

1. reconstruct $\alpha$ from $\alpha_*+N_G\Delta\mathbf{a}$;
2. rerun the bracketed root solver from scratch;
3. compare root labels against the continuation ledger;
4. recompute $\mathcal{J}_{\mathrm{curve}}$, hard floors, and rank diagnostics;
5. accept only if the actual-to-predicted decrease ratio exceeds the declared threshold and every hard gate remains feasible.

A successful Newton step produces only a nonlinear candidate for rescreening. It is not a retained branch until every required residual and event/action row passes.

---

## 12. Output Schema

Every run of the intrinsic curve solver must emit one packet with the following fields.

| Field | Required payload |
| --- | --- |
| `metadata` | source commit, solver version, date, branch label, promotion status `priority-only`, and claim level |
| `basis` | $M$, $K$, Fourier basis, computational phase convention, common $\ell$, and endpoint convention |
| `variables` | full-precision coefficient vector, gauges, fixed polarity row, optimized parameters, fixed parameters, and diagnostic parameters |
| `tolerances` | $\epsilon_T$, $\epsilon_C$, $\epsilon_G$, $\epsilon_J$, $\epsilon_x$, $\epsilon_\eta$, $\epsilon_{\mathrm{tan}}$, $\epsilon_{\mathrm{curv}}$, and rank tolerance |
| `root_policy` | partner, cross-binary, same-source, self/fold-layer, and medium-response statuses |
| `root_ledger` | $\mathcal{A}_{i,n}$, delays, Jacobians, root residuals, labels, statuses, and force-used flags |
| `force_rows` | force convention, polarity products, optional self or medium terms, and $\Gamma$ status |
| `work_one_form` | finite-mode history-force one-form entries, one-form curl norm, and whether the force row is action-compatible |
| `residuals` | normalized and raw values for $R_T$, $R_C$, support, root, tangential, and curvature rows |
| `floors` | $d_{\min}$, $J_{\min}$, $\eta_{\min}$, support margin, root-bracket margin, and pass/fail status |
| `objective` | weights, residual norm, barrier values, hard-gate status, and actual-to-predicted decrease history |
| `rank_checks` | gauge dimension, residual dimension, singular values, rank, augmented rank, left-null obstructions, and conditioning |
| `continuation` | stage, path parameters, accepted steps, rejected steps, full trust directions, retraction corrections, root-count changes, and branch-event records |
| `refinement` | mesh and mode refinement results, residual convergence, root-ledger convergence, and aliasing diagnostics |
| `event_action` | `not_computed`, `passed`, or `failed`; no branch claim may use `not_computed` rows |
| `observer_exports` | exposure, Lorentz, photon, color, and strong-field rows marked `not_computed`, `passed`, or `failed` |
| `decision_status` | `no-retained-branch`, `nonlinear-candidate-for-rescreen`, or `retained-search-candidate-pending-event-action` |
| `failure_code` | first hard failure plus secondary diagnostic failures |

The default decision status for this protocol is

$$
\texttt{no-retained-branch}.
$$

Only a later run packet may change that status, and only after the same curve coefficients, active-root ledger, floors, residual rows, and event/action rows pass together.

---

## 13. Minimal Acceptance Statement

A solver output may be called an intrinsic curve near-pass only if it reports:

$$
\|R_T\|_{\infty}\le\epsilon_T,
\qquad
\|R_C\|_{\infty}\le\epsilon_C,
\qquad
R_{\mathrm{root}}\le1,
$$

$$
\|R_{\mathrm{tan}}\|_{\infty}\le\epsilon_{\mathrm{tan}},
\qquad
\|R_{\mathrm{curv}}\|_{\infty}\le\epsilon_{\mathrm{curv}},
$$

and

$$
d_{\min}>\epsilon_x,
\qquad
J_{\min}>\epsilon_J,
\qquad
\eta_{\min}>\epsilon_\eta,
\qquad
m_{\mathrm{support}}>0.
$$

A near-pass still remains priority-side only unless the event/action ledger, stability row, and observer-export statuses required by [retained-branch-dynamics-protocol.md](retained-branch-dynamics-protocol.md) are populated without changing the root convention.

The solver's mathematical purpose is therefore precise: either find a finite-mode intrinsic curve candidate that deserves full retained-branch rescreening, or produce a stable obstruction with a named failure code such as `curve-linear-range-defect`, `floor-traded-residual-reduction`, `curvature-force-mismatch`, or `collocation-aliasing-fail`.
