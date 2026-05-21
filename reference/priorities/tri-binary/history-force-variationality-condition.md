# History-Force Variationality Condition

Promotion status: `priority-only`. This packet supplies a concrete action test for the delayed force ledger used in [gamma-scale-action-row.md](gamma-scale-action-row.md), [adaptive-memory-action-row.md](adaptive-memory-action-row.md), and [adaptive-root-front-dynamics.md](adaptive-root-front-dynamics.md). It does not claim that the current $M=3$ force row is variational; it states the finite-mode condition that must pass before a fitted $\Gamma_K$ can be promoted to an action-derived scale.

---

## 1. Root-Stratum Work One-Form

Fix a memory policy $\eta_{\mathrm{mem}}$, a source-pair policy, and an active causal-root ledger

$$
\mathcal{A}_{\eta_{\mathrm{mem}}}(\alpha)
$$

on a root-regular coefficient chart. Root-regular means that every retained root is bracketed and isolated, every excluded interval has positive gap margin, every retained Jacobian satisfies

$$
|J_a|\ge\epsilon_J,
$$

and the noncollision and support floors remain positive.

For an admissible normal variation $\delta\mathbf{Y}^\perp$, define the dimensionless history-force work one-form

$$
\omega_{\eta_{\mathrm{mem}}}(\alpha)
\left[
\delta\mathbf{Y}^\perp
\right]
=
\int_0^L
\sum_i
P_i^\perp\widetilde{\mathbf{F}}_i^{(\eta_{\mathrm{mem}})}(\lambda;\alpha)
\cdot
\delta\mathbf{Y}_i^\perp(\lambda)
d\lambda.
$$

The corresponding dimensionful virtual-work row in [gamma-scale-action-row.md](gamma-scale-action-row.md) is

$$
\delta\mathcal{S}_{\mathrm{hist}}^\perp
=
\frac{R_*E_\epsilon(R_*)}{c_f}
\omega_{\eta_{\mathrm{mem}}}.
$$

This row is an action row only if $\omega_{\eta_{\mathrm{mem}}}$ is an exact one-form on the retained root stratum.

---

## 2. Exactness Criterion

Let $\mathcal{M}_{\eta}$ be the finite-mode coefficient manifold after gauge, center, period, arclength, and support rows have been imposed or restricted. In local coordinates $\alpha^p$, define

$$
W_p(\alpha)
=
\omega_{\eta_{\mathrm{mem}}}(\alpha)
\left[
\frac{\partial\mathbf{Y}}{\partial\alpha^p}
\right].
$$

The finite-mode exterior curl is the skew matrix

$$
\mathcal{C}_{pq}(\alpha)
=
\frac{\partial W_q}{\partial\alpha^p}
-
\frac{\partial W_p}{\partial\alpha^q}.
$$

If

$$
\mathcal{C}_{pq}=0
\qquad
\text{for every }p,q
$$

on a simply connected root-regular chart, then there is a local scalar history action

$$
\mathcal{S}_{\mathrm{hist}}(\alpha)
$$

such that

$$
d\mathcal{S}_{\mathrm{hist}}
=
\frac{R_*E_\epsilon(R_*)}{c_f}
\omega_{\eta_{\mathrm{mem}}}.
$$

Conversely, if the skew matrix is nonzero above tolerance in the retained finite chart, the emitted delayed force row is not yet an action-derived force on that chart. The packet must exit with

$$
\texttt{history-one-form-curl-open}
$$

or must add the missing branch-history, self/fold-layer, endpoint, medium-response, or inertia terms that close the one-form.

This is the finite-dimensional Poincare lemma applied to the active-root stratum. The hard part is not the lemma; it is proving that the chosen force ledger, root policy, endpoint convention, and memory policy make $\omega_{\eta_{\mathrm{mem}}}$ closed.

---

## 3. Root Sensitivity In The Curl

The curl test must include root motion. For a retained root $a=(i,j,\lambda,\mu)$,

$$
\eta_a=\eta_a(\alpha)
$$

satisfies

$$
G_a(\eta_a;\alpha)=0.
$$

For a coefficient variation $v$, the first-order root shift is

$$
D_v\eta_a
=
\frac{
\widehat{\mathbf{R}}_a\cdot
\left[
D_v\mathbf{Y}_i(\lambda)
-
D_v\mathbf{Y}_j(\lambda-\eta_a)
\right]
}{
J_a
}.
$$

Therefore a finite-difference curl test that freezes roots is not testing the action row. It is only testing a frozen-ledger surrogate. The true one-form derivative must either differentiate the bracketed root solver or recompute roots after each coefficient perturbation.

The $M=3$ root-frontier result makes this condition operational. Once $\rho$ crosses the fixed $\eta=4$ window, the root derivative remains meaningful only in an extended memory chart. A curl value computed under $\eta_{\max}=4$ and compared with one computed under $\eta_{\max}=4.5$ is comparing two different one-forms.

---

## 4. Gamma Implication

The fitted diagnostic scale

$$
\Gamma_K^{\mathrm{fit}}
=
\frac{\langle \mathbf{K},P^\perp\widetilde{\mathbf{F}}\rangle}
{\langle P^\perp\widetilde{\mathbf{F}},P^\perp\widetilde{\mathbf{F}}\rangle}
$$

can guide descent even when the one-form curl is open. It cannot be interpreted as

$$
\Gamma_K(B)
=
\frac{E_\epsilon(R_*)}
{m_{\mathrm{car}}(B)c_f^2}
$$

until the history-force one-form passes exactness and the inertia row reduces to a scalar on the retained branch modes.

Thus a dynamics packet has four distinct levels:

| Level | Required rows | Claim allowed |
| --- | --- | --- |
| `force-fit-diagnostic` | residuals and fitted $\Gamma_K$ only | numerical descent direction |
| `root-regular-force-screen` | residuals, active roots, brackets, gaps, Jacobian and noncollision floors | root-consistent dynamics screen |
| `variational-force-screen` | root-regular force screen plus $\|\mathcal{C}\|$ below tolerance | action-compatible force row |
| `scale-action-candidate` | variational force row plus scalar inertia and energy/action ledgers | candidate physical $\Gamma_K$ row |

The current $M=3$ arclength-inverse rows reach at most the first two levels depending on memory policy. They have not yet computed $\mathcal{C}$.

---

## 5. Numerical Output Target

A successor adaptive-memory $M=3$ packet should emit:

| Field | Required content |
| --- | --- |
| `work_one_form` | $W_p$ values on the reduced equal-period coefficient basis |
| `root_sensitivity` | $D\eta_a[\partial_p]$ or root-recomputed finite differences for every retained label |
| `one_form_curl` | skew matrix $\mathcal{C}_{pq}$, norm, tolerance, and dominant skew entries |
| `memory_policy` | fixed, active-window, or support-complete memory convention used for all $W_p$ evaluations |
| `gamma_status` | `fit-only`, `variational-force-screen`, or `scale-action-candidate` |
| `failure_code` | first failing row among root regularity, memory tail, curl, inertia, and action ledgers |

The acceptance criterion for the variational force row is

$$
\frac{\|\mathcal{C}\|_{\mathrm{F}}}
{1+\|W\|_{\mathrm{F}}}
\le
\epsilon_{\mathrm{curl}},
$$

with the same root brackets and memory policy used in every finite-difference column. If this criterion fails stably under refinement, the current delayed force law is missing a compensating branch-history term or the chosen branch class is not generated by a scalar action.

Failure/status codes:

$$
\texttt{history-one-form-curl-open},
\qquad
\texttt{frozen-root-curl-invalid},
\qquad
\texttt{memory-policy-curl-mismatch},
$$

$$
\texttt{gamma-fit-only},
\qquad
\texttt{variational-force-screen-open},
\qquad
\texttt{not-retained}.
$$
