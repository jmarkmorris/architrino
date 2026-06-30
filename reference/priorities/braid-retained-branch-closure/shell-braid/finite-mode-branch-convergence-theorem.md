# Finite-Mode Branch Convergence Theorem

Promotion status: `priority-only`. This packet states the convergence theorem target that connects certified finite Fourier/collocation rows to an actual curve-level same-level tri-binary dynamics branch. It depends on the root/Jacobian barriers, adaptive-memory certificates, delayed-force Lipschitz envelope, collocation-refinement certificate, and support-complete Newton/obstruction rows.

The point is to separate two claims:

$$
\text{a finite row is certified on one grid}
$$

from

$$
\text{a curve-level branch exists in the continuum chart}.
$$

The first is necessary evidence. The second requires uniform certificate bounds under refinement.

---

## 1. Certified Finite Sequence

Let $M_\nu,K_\nu\to\infty$ be mode and collocation-grid refinements. For each $\nu$, suppose the solver emits an exact-antipodal curve packet

$$
\mathbf{Y}^{(\nu)}
=
\{\mathbf{Y}_i^{(\nu)}\}_{i=1}^6
$$

with common arclength period $L_\nu$, one normalization scale, and support descriptor normalized in the same chart. The packet is certified on one source-pair policy and one memory convention if it emits:

1. uniform noncollision floor $d_{\min}^{(\nu)}\ge d_0>0$;
2. uniform delay floor $\eta_{\min}^{(\nu)}\ge\eta_0>0$;
3. uniform root Jacobian floor $J_{\min}^{(\nu)}\ge J_0>0$;
4. support bound $r_{\max}^{(\nu)}\le r_0$;
5. support-complete memory or certified root-free tails;
6. uniform $C^2$ curve bound

$$
\max_i\|\mathbf{Y}_i^{(\nu)}\|_{C^2}\le C_Y;
$$

7. collocation-refinement error

$$
\epsilon_{\mathrm{disc}}^{(\nu)}\to0;
$$

8. continuous residual envelope

$$
\|\mathcal{F}_{\eta}^{(\nu)}\|_{\infty}
\le
\epsilon_{\mathrm{dyn}}^{(\nu)}
\to0.
$$

The memory and source-pair rows must be the same rows for every $\nu$, except for certified addition of roots whose delays converge inside the support-complete memory bound.

---

## 2. Compactness Of Curves

The uniform $C^2$ bound and common support chart give compactness. After passing to a subsequence,

$$
\mathbf{Y}_i^{(\nu)}
\to
\mathbf{Y}_i^{(*)}
$$

in $C^1$, and weakly in $C^2$. If the Fourier coefficients have a uniform stronger bound or the curvature residual converges strongly, the convergence improves to the regularity needed by the retained dynamics row.

The exact-antipodal condition is closed under this convergence:

$$
\mathbf{Y}_{\iota i}^{(\nu)}=-\mathbf{Y}_i^{(\nu)}
\quad\Rightarrow\quad
\mathbf{Y}_{\iota i}^{(*)}=-\mathbf{Y}_i^{(*)}.
$$

The equal-period row is also closed if

$$
L_i^{(\nu)}-L_j^{(\nu)}\to0
$$

for all binary labels $i,j$.

---

## 3. Root-Ledger Convergence

For a retained label $a=(i,j,\lambda,\mu)$, roots satisfy

$$
G_a^{(\nu)}(\eta_a^{(\nu)};\lambda)=0,
\qquad
|J_a^{(\nu)}|\ge J_0.
$$

The delayed root functions converge in $C^1$ on compact delay intervals because the curves converge in $C^1$ and the delay floor prevents singular evaluation. By the implicit function theorem with a uniform Jacobian floor, the root functions converge:

$$
\eta_a^{(\nu)}(\lambda)
\to
\eta_a^{(*)}(\lambda)
$$

in $C^1$ on every certified root chart. The limit satisfies

$$
G_a^{(*)}(\eta_a^{(*)};\lambda)=0,
\qquad
|J_a^{(*)}|\ge J_0.
$$

Excluded intervals remain root-free if their certified gap margins obey

$$
\gamma_{\mathrm{gap}}^{(\nu)}\ge\gamma_0>0.
$$

If $\gamma_{\mathrm{gap}}^{(\nu)}\to0$, the sequence may converge to a root event, and the theorem does not certify a retained branch beyond that event.

---

## 4. Force And Residual Convergence

The per-root force is

$$
\mathbf{f}_a^{(\nu)}
=
\sigma_i\sigma_j(\eta_a^{(\nu)})^{-2}
W_a^{\mathrm{rec},(\nu)}
\widehat{\mathbf{R}}_a^{(\nu)}.
$$

The floors $\eta_0,J_0$, convergence of root functions, and same-record
convergence of receiver-normal factors imply

$$
\mathbf{f}_a^{(\nu)}
\to
\mathbf{f}_a^{(*)}
$$

uniformly for each retained label. Finite active-root count then gives

$$
\widetilde{\mathbf{F}}^{(\nu)}
\to
\widetilde{\mathbf{F}}^{(*)}
$$

uniformly on the support-complete ledger.

If

$$
\mathcal{R}_{\mathrm{tan}}^{(\nu)}
\to0,
\qquad
\mathcal{R}_{K}^{(\nu)}
\to0
$$

in the continuous residual norm, then the limit satisfies

$$
\mathbf{T}_i^{(*)}\cdot
\widetilde{\mathbf{F}}_i^{(*)}=0,
$$

and

$$
\mathbf{K}_i^{(*)}
=
\Gamma_K^{(*)}
P_i^{\perp,*}
\widetilde{\mathbf{F}}_i^{(*)}
$$

whenever the scale row converges to a finite value

$$
\Gamma_K^{(\nu)}\to\Gamma_K^{(*)}.
$$

If $\Gamma_K^{(\nu)}$ is fitted only, this proves only convergence of the fitted dynamics equation. If $\Gamma_K^{(\nu)}$ is action-derived and the action/identifiability rows converge, then the limit has an action-compatible scale.

---

## 5. Theorem Target

**Theorem target: finite-mode convergence to a same-level dynamics branch.** Suppose a refinement sequence satisfies the certified finite sequence assumptions, with uniform root/Jacobian/noncollision/support floors, support-complete memory, delayed-force Lipschitz envelopes, collocation-refinement errors tending to zero, and dynamics residual envelopes tending to zero. Suppose also that the scale/action row converges in one declared convention. Then a subsequence converges to an exact-antipodal curve packet $\mathbf{Y}^{(*)}$ that satisfies the intrinsic same-level dynamics equation on the limiting support-complete root ledger.

If the inventory, event, and stability certificate rows also converge and close on the same live ledger, the limit becomes a retained shell braid branch candidate. Without those rows, it is only a retained dynamics candidate. Observer-export rows do not define retention, but any downstream Lorentz, photon, mass, color, strong-field, cosmology, or corpus-migration claim remains blocked until the relevant export rows are explicitly statused.

Proof route:

1. use compactness from uniform $C^2$ and support bounds;
2. pass exact antipodality, equal period, and support rows to the limit;
3. use uniform Jacobian floors and the implicit function theorem for root convergence;
4. use the delayed-force Lipschitz envelope for force convergence;
5. use collocation-refinement envelopes to upgrade sampled residual convergence to continuous residual convergence;
6. pass the dynamics residual equation to the limit.

---

## 6. Failure Modes

The convergence theorem fails if any of the following occur:

| Failure | Meaning |
| --- | --- |
| `floor-not-uniform` | $d_{\min}$, $\eta_{\min}$, or $J_{\min}$ tends to zero |
| `memory-not-uniform` | support-complete memory or tail exclusion changes without a convergent ledger |
| `root-gap-collapse` | excluded-interval gaps shrink to zero, allowing a root event in the limit |
| `support-bound-diverges` | $r_{\max}$ has no uniform bound |
| `mesh-error-not-vanishing` | $\epsilon_{\mathrm{disc}}^{(\nu)}$ does not tend to zero |
| `residual-not-vanishing` | continuous residual envelopes do not tend to zero |
| `gamma-convention-drift` | $\Gamma_K$ changes between fitted, reciprocal, and action-derived conventions |

These failures do not necessarily disprove the model. They show that the particular finite-mode refinement sequence has not produced a retained curve-level dynamics branch.

---

## 7. Current $M=3$ Reading

The present $M=3$ row is not yet a convergence sequence. It is a local exact-antipodal evidence packet:

1. it has full restricted rank at the sampled seed;
2. it descends under clipped continuation;
3. its first apparent root loss is a memory-window exit;
4. it lacks support-complete memory at $\rho=0.8$ under $\eta_{\mathrm{mem}}=4.5$;
5. it lacks a tail certificate, force Lipschitz envelope, mesh error envelope, action-derived $\Gamma_K$, and refinement sequence.

Therefore the status is

$$
\texttt{finite-mode-convergence-open},
\qquad
\texttt{local-dynamics-evidence-only},
\qquad
\texttt{not-retained}.
$$

---

## 8. Required Output Fields

A future refinement packet should emit:

| Field | Required payload |
| --- | --- |
| `refinement_sequence` | $M_\nu,K_\nu$, grids, coefficient vectors, and memory policies |
| `uniform_floors` | $d_0,\eta_0,J_0,\gamma_0$ and support bound $r_0$ |
| `compactness_bounds` | $C^2$ or stronger coefficient/curve bounds |
| `root_convergence` | label-wise convergence and excluded-gap persistence |
| `force_convergence` | delayed-force Lipschitz envelopes and force-difference bounds |
| `mesh_error_sequence` | $\epsilon_{\mathrm{disc}}^{(\nu)}\to0$ |
| `continuous_residual_sequence` | $\epsilon_{\mathrm{dyn}}^{(\nu)}\to0$ |
| `gamma_convergence` | fitted/action convention and limit value |
| `limit_status` | `dynamics-limit-candidate`, `retained-shell-braid-branch-candidate`, or first failure code |

Failure/status codes:

$$
\texttt{finite-mode-convergence-open},
\qquad
\texttt{local-dynamics-evidence-only},
\qquad
\texttt{root-gap-collapse},
$$

$$
\texttt{mesh-error-not-vanishing},
\qquad
\texttt{gamma-convention-drift},
\qquad
\texttt{not-retained}.
$$
