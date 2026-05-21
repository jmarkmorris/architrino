# Unresolved Tail Force Error Bound

Promotion status: `priority-only`. This packet supplies an error row for active-window dynamics screens whose finite-memory tail has not yet been fully excluded by [tail-interval-root-exclusion-certificate.md](tail-interval-root-exclusion-certificate.md). It does not allow branch retention with an uncertified tail. Its purpose is to quantify how large the omitted delayed-force contribution could be if unresolved tail roots exist.

---

## 1. Tail Force Set

Fix a memory convention, source-pair policy, and a node $\lambda_n$. Let the unresolved tail for receiver $i$ be

$$
\mathcal{U}_{i,n}
=
\left\{
a=(i,j,n,\mu):
\eta_a\in(\eta_{\mathrm{mem}},\eta_{\mathrm{tail}}],
\quad
G_a(\eta_a)=0,
\quad
a\ \text{not certified absent}
\right\}.
$$

The omitted dimensionless force is

$$
\Delta\widetilde{\mathbf{F}}_{i,n}^{\mathrm{tail}}
=
\sum_{a\in\mathcal{U}_{i,n}}
\frac{\sigma_i\sigma_{j(a)}}{\eta_a^2|J_a|}
\widehat{\mathbf{R}}_a.
$$

If the tail certificate proves $\mathcal{U}_{i,n}=\varnothing$, then this error is zero. If the tail remains uncertified, the error row should emit a worst-case bound rather than silently treating the active-window force as complete.

---

## 2. Counting And Jacobian Bound

Assume the unresolved tail row emits:

$$
N_{i,n}^{\mathrm{tail}}
\ge
|\mathcal{U}_{i,n}|,
$$

and lower bounds

$$
\eta_a\ge\eta_0,
\qquad
|J_a|\ge J_{\mathrm{tail}}>0
$$

for every unresolved possible tail root. Since

$$
\|\widehat{\mathbf{R}}_a\|=1,
$$

the omitted force obeys

$$
\left\|
\Delta\widetilde{\mathbf{F}}_{i,n}^{\mathrm{tail}}
\right\|
\le
\frac{
N_{i,n}^{\mathrm{tail}}
}{
\eta_0^2J_{\mathrm{tail}}
}.
$$

For a whole collocation packet, define

$$
\epsilon_F^{\mathrm{tail}}
=
\left(
\sum_{i,n}
\left[
\frac{N_{i,n}^{\mathrm{tail}}}{\eta_0^2J_{\mathrm{tail}}}
\right]^2
\right)^{1/2}.
$$

This is a worst-case vector-norm envelope. It can be sharpened if the certificate emits direction cones for $\widehat{\mathbf{R}}_a$ or separate source-pair counts, but the scalar bound is the minimum safe row.

---

## 3. Residual Error Bound

Let

$$
A=P^\perp\widetilde{\mathbf{F}},
\qquad
B=P^\perp\Delta\widetilde{\mathbf{F}}^{\mathrm{tail}},
$$

and let

$$
\|B\|\le\epsilon_F^{\mathrm{tail}}.
$$

The retained intrinsic residual computed on the active window is

$$
\mathcal{R}_{K}^{\mathrm{act}}
=
\mathbf{K}
-
\Gamma_K(A)A,
$$

where

$$
\Gamma_K(A)
=
\frac{\langle\mathbf{K},A\rangle}{\langle A,A\rangle}.
$$

The tail-corrected diagnostic residual is

$$
\mathcal{R}_{K}^{\mathrm{tail}}
=
\mathbf{K}
-
\Gamma_K(A+B)(A+B).
$$

If

$$
\|A\|>0,
\qquad
\epsilon_F^{\mathrm{tail}}<\frac{1}{2}\|A\|,
$$

then the fitted scale perturbation is bounded to first order by

$$
|\delta\Gamma_K|
\lesssim
\frac{
\|\mathbf{K}\|\epsilon_F^{\mathrm{tail}}
}{
\|A\|^2
}
+
\frac{
2|\Gamma_K(A)|\epsilon_F^{\mathrm{tail}}
}{
\|A\|
},
$$

and the residual perturbation satisfies

$$
\left\|
\mathcal{R}_{K}^{\mathrm{tail}}
-
\mathcal{R}_{K}^{\mathrm{act}}
\right\|
\lesssim
|\Gamma_K(A)|\epsilon_F^{\mathrm{tail}}
+
|\delta\Gamma_K|
\left(
\|A\|+\epsilon_F^{\mathrm{tail}}
\right).
$$

The $\lesssim$ marks a diagnostic perturbation estimate, not a branch certificate. A retained row must either certify the tail absent or include the tail roots in the force and action ledgers.

---

## 4. $M=3$ Interpretation

At $\rho=0.8$, the extended-window screen has

$$
\eta_{\mathrm{act}}\approx4.4058154936,
\qquad
\eta_{\mathrm{mem}}=4.5,
$$

and the unresolved support tail is

$$
(4.5,\ 5.5211575250].
$$

Without a tail-exclusion certificate, the run cannot set

$$
N_{i,n}^{\mathrm{tail}}=0.
$$

Without a tail Jacobian envelope, it also cannot choose a positive $J_{\mathrm{tail}}$ for the error row. Therefore the current $M=3$ active-window rescore has status

$$
\texttt{tail-force-error-unbounded}
$$

as a branch certificate, even though it remains a useful dynamics screen.

If the tail certificate later proves the interval root-free, then

$$
\epsilon_F^{\mathrm{tail}}=0
$$

and the active-window force row becomes support-complete for that emitted curve and grid. If the tail certificate finds additional roots, the force, $\Gamma_K$, variationality, action, and event rows must be recomputed with those roots included.

---

## 5. Output Fields

An active-window dynamics packet with an uncertified tail should emit:

| Field | Required content |
| --- | --- |
| `tail_interval` | unresolved interval and support-bound endpoint |
| `tail_count_bound` | $N_{i,n}^{\mathrm{tail}}$ by receiver, source pair, and node |
| `tail_delay_floor` | $\eta_0$ used in the force bound |
| `tail_jacobian_floor` | $J_{\mathrm{tail}}$ or `not_available` |
| `tail_force_bound` | per-node bound and $\epsilon_F^{\mathrm{tail}}$ |
| `gamma_perturbation_bound` | fitted-scale perturbation estimate, or `not_available` |
| `residual_perturbation_bound` | $\mathcal{R}_{K}$ perturbation estimate, or `not_available` |
| `tail_decision` | `tail-absent`, `tail-bounded`, `tail-unbounded`, or `tail-roots-found` |

Failure/status codes:

$$
\texttt{tail-force-error-unbounded},
\qquad
\texttt{tail-count-bound-missing},
\qquad
\texttt{tail-jacobian-bound-missing},
$$

$$
\texttt{tail-roots-found-rerun-required},
\qquad
\texttt{tail-absent-force-error-zero},
\qquad
\texttt{not-retained}.
$$
