# Collocation Refinement Error Certificate

Promotion status: `priority-only`. This packet supplies the mesh-refinement certificate needed for support-complete tri-binary dynamics rows. It explains how a finite collocation solve can bound off-grid residuals, root-ledger changes, and projection errors between sampled arclength nodes.

The current $M=2$ and $M=3$ evidence repeatedly shows why this is necessary: a row can descend on a training grid while off-grid residual peaks, root-count changes, or memory-window exits appear on a refined grid. A retained branch packet needs an explicit refinement error row rather than an implicit trust in the sampled nodes.

---

## 1. Grid And Residual Functions

Let

$$
\lambda_n=\frac{Ln}{K},
\qquad
n=0,\ldots,K-1,
$$

with mesh width

$$
h_K=\frac{L}{K}.
$$

For any scalar or vector residual component $H(\lambda)$, define the sampled norm

$$
\|H\|_{\infty,K}
=
\max_n\|H(\lambda_n)\|.
$$

Assume a derivative envelope

$$
\|H'(\lambda)\|\le L_H
\qquad
\text{for all }\lambda.
$$

Then every point $\lambda$ lies within $h_K/2$ of a node, and

$$
\|H(\lambda)\|
\le
\|H\|_{\infty,K}
+
\frac{1}{2}L_Hh_K.
$$

Thus the continuous-grid residual certificate is

$$
\|H\|_{\infty}
\le
\|H\|_{\infty,K}
+
\epsilon_H^{\mathrm{mesh}},
\qquad
\epsilon_H^{\mathrm{mesh}}
=
\frac{1}{2}L_Hh_K.
$$

For an $L^2$-weighted packet with residual vector $H=(H_1,\ldots,H_m)$, the corresponding conservative envelope is

$$
\epsilon_{2}^{\mathrm{mesh}}
=
\left(
\sum_r
\left[
\frac{1}{2}L_{H_r}h_K
\right]^2
\right)^{1/2}.
$$

---

## 2. Fourier Derivative Envelope

For a finite Fourier curve or residual

$$
H(\lambda)
=
\sum_{m=-M_H}^{M_H}
\widehat{H}_m
e^{2\pi im\lambda/L},
$$

a direct derivative bound is

$$
L_H
\le
\frac{2\pi}{L}
\sum_{m=-M_H}^{M_H}
|m|\,\|\widehat{H}_m\|.
$$

If $H$ is not explicitly stored as a Fourier series because it includes roots, projectors, and force denominators, use the chain-rule envelope:

$$
L_H
\le
L_H^{\mathrm{curve}}
+
L_H^{\mathrm{root}}
+
L_H^{\mathrm{force}}
+
L_H^{\mathrm{proj}},
$$

where each term must use the same Jacobian floor, distance floor, support floor, and memory ledger as the residual computation.

The root contribution must include

$$
\frac{d\eta_a}{d\lambda}
=
\frac{
\widehat{\mathbf{R}}_a\cdot
\left[
\mathbf{T}_i(\lambda)
-
\mathbf{T}_j(\lambda-\eta_a)
\right]
}{J_a}.
$$

Thus the derivative envelope fails when $J_a$ approaches zero. In that case the refinement status is a root/Jacobian failure, not merely a mesh issue.

---

## 3. Root-Ledger Refinement

For a source pair $(i,j)$ and node $\lambda_n$, the delayed root function is

$$
G_{ij,n}(\eta)
=
\|\mathbf{Y}_i(\lambda_n)-\mathbf{Y}_j(\lambda_n-\eta)\|-\eta.
$$

The sampled ledger is not refined unless neighboring arclength nodes also preserve the root chart. Let $a=(i,j,n,\mu)$ be a retained root bracket. Define the bracket-center root

$$
\eta_a(\lambda_n)
$$

and assume the branch continues to nearby $\lambda$ with

$$
\left|
\frac{d\eta_a}{d\lambda}
\right|
\le
V_{\eta,\lambda,a}.
$$

If the bracket half-width is $w_a$ and the base root has margin

$$
\Delta_a
=
\min\{\eta_a-\eta_a^-,\,\eta_a^+-\eta_a\},
$$

then the same bracket label remains inside its isolating interval between nodes if

$$
\frac{1}{2}V_{\eta,\lambda,a}h_K
<
\Delta_a.
$$

For excluded intervals, if the gap margin is

$$
\gamma_{\mathrm{gap}}
=
\inf_{\eta\in E_{ij,n}}|G_{ij,n}(\eta)|,
$$

and the arclength derivative of the root function on the excluded set satisfies

$$
\left|
\partial_\lambda G_{ij}(\lambda,\eta)
\right|
\le
L_{G,\lambda},
$$

then no excluded off-grid root appears between nodes if

$$
\frac{1}{2}L_{G,\lambda}h_K
<
\gamma_{\mathrm{gap}}.
$$

These two inequalities convert a nodewise root ledger into a mesh-certified root ledger.

---

## 4. Projection Error For Cokernel Rows

The obstruction and Newton closure certificates require a discretization projection error. Let $P_{\mathrm{cok},K}$ be the left-null projector on the $K$-node weighted grid, and let $P_{\mathrm{cok}}$ denote the continuum or refined-grid target projector. A conservative split is

$$
\epsilon_{\mathrm{disc}}
\le
\epsilon_{\mathrm{res}}^{\mathrm{mesh}}
+
\epsilon_{\mathrm{proj}}^{\mathrm{mesh}},
$$

where

$$
\epsilon_{\mathrm{res}}^{\mathrm{mesh}}
\ge
\left\|
\mathcal{F}_{\eta}
-
\mathcal{F}_{\eta,K}
\right\|,
$$

and

$$
\epsilon_{\mathrm{proj}}^{\mathrm{mesh}}
\ge
\left\|
\left(P_{\mathrm{cok}}-P_{\mathrm{cok},K}\right)
\mathcal{F}_{\eta,K}
\right\|.
$$

If a refined grid $K'$ is used as the reference, the empirical projector drift is

$$
\Delta_{\mathrm{proj}}(K,K')
=
\left\|
\left(P_{\mathrm{cok},K'}-P_{\mathrm{cok},K}\right)
\mathcal{F}_{\eta,K'}
\right\|.
$$

A retained obstruction or closure row should require

$$
\epsilon_{\mathrm{disc}}
\ge
\epsilon_{\mathrm{res}}^{\mathrm{mesh}}
+
\Delta_{\mathrm{proj}}(K,K')
+
\epsilon_{\mathrm{alias}},
$$

where $\epsilon_{\mathrm{alias}}$ covers unresolved Fourier modes and interpolation error.

---

## 5. Refinement Certificate Lemma

**Lemma target: collocation-to-continuum residual guard.** Fix a support-complete root ledger, a finite Fourier curve, and a collocation grid. Suppose:

1. every residual component has a derivative envelope $L_H$ on each grid cell;
2. every active root label satisfies the bracket-containment inequality;
3. every excluded interval satisfies the off-grid gap inequality;
4. the Jacobian, noncollision, support, and memory floors remain positive on each cell;
5. the projector drift and aliasing bounds are emitted for cokernel rows.

Then sampled residual, obstruction, and closure decisions remain valid on the continuous arclength circle up to the declared mesh error envelopes. In particular, a root-count failure found on a refined grid is not a surprise; it means one of the bracket-containment, excluded-gap, or memory-front inequalities was not certified on the coarser grid.

---

## 6. Current Dynamics Reading

The current finite-mode evidence should be read through this certificate:

1. $M=2$ rows with good training-grid descent but refined residual peaks are `mesh-refinement-open`;
2. $M=3$ fixed-window root loss at $\rho=0.4$ is not merely a mesh issue, because the root-frontier packet recovers the missing roots under deeper memory;
3. the future support-complete obstruction and Newton closure rows require $\epsilon_{\mathrm{disc}}$ before their inequalities can decide anything.

Thus the present status is

$$
\texttt{collocation-refinement-certificate-open},
\qquad
\texttt{off-grid-residual-envelope-open},
\qquad
\texttt{not-retained}.
$$

---

## 7. Required Output Fields

Future dynamics packets should emit:

| Field | Required payload |
| --- | --- |
| `mesh_width` | $K$, $L$, and $h_K$ |
| `residual_derivative_bounds` | $L_H$ for tangential, curvature, root, force, and action rows |
| `mesh_residual_error` | $\epsilon_H^{\mathrm{mesh}}$ and $\epsilon_2^{\mathrm{mesh}}$ |
| `root_label_mesh_guard` | $V_{\eta,\lambda,a}$, $\Delta_a$, and pass/fail for each active label |
| `excluded_gap_mesh_guard` | $L_{G,\lambda}$, $\gamma_{\mathrm{gap}}$, and pass/fail for each excluded interval |
| `projector_drift` | $\Delta_{\mathrm{proj}}(K,K')$ for cokernel rows |
| `aliasing_error` | unresolved-mode and interpolation envelope |
| `disc_error_for_certificates` | $\epsilon_{\mathrm{disc}}$ used by obstruction and Newton closure certificates |

Failure/status codes:

$$
\texttt{collocation-refinement-certificate-open},
\qquad
\texttt{off-grid-residual-envelope-open},
\qquad
\texttt{root-label-mesh-guard-failed},
$$

$$
\texttt{excluded-gap-mesh-guard-failed},
\qquad
\texttt{projector-drift-unbounded},
\qquad
\texttt{not-retained}.
$$
