# Exact-Antipodal Parity Lemma

Promotion status: `priority-only`. This packet formalizes the residual-parity diagnostic used in [arclength-inverse-m3-rank-and-trust-results.md](arclength-inverse-m3-rank-and-trust-results.md) and the opening rule in [antipodal-relaxation-ansatz.md](antipodal-relaxation-ansatz.md). It explains why a pair-even tangential residual is expected in an exact-antipodal evaluator and why that fact alone is not evidence for opening antipodal relaxation.

No branch is retained.

---

## 1. Antipodal Involution

Let the antipodal involution on site labels be

$$
\iota(a,+)=(a,-),
\qquad
\iota(a,-)=(a,+).
$$

In the exact-antipodal chart,

$$
\mathbf{Y}_{\iota i}(\lambda)
=
-\mathbf{Y}_{i}(\lambda),
$$

and therefore

$$
\mathbf{T}_{\iota i}(\lambda)
=
-\mathbf{T}_i(\lambda),
\qquad
\mathbf{K}_{\iota i}(\lambda)
=
-\mathbf{K}_i(\lambda).
$$

The normal projector is pair-even:

$$
P_{\iota i}^{\perp}
=
I-\mathbf{T}_{\iota i}\mathbf{T}_{\iota i}^{T}
=
I-\mathbf{T}_{i}\mathbf{T}_{i}^{T}
=
P_i^\perp.
$$

Assume the polarity row is also antipodal:

$$
\sigma_{\iota i}=-\sigma_i,
$$

and the source-pair policy is closed under $\iota$:

$$
(i,j,\lambda,\eta)\in\mathcal{A}
\quad\Longleftrightarrow\quad
(\iota i,\iota j,\lambda,\eta)\in\mathcal{A}.
$$

This closure includes memory depth. If a root is emitted for one side but lost for its antipodal mate because the memory/search window changed, the parity lemma does not apply until the root ledger is repaired.

---

## 2. Force Parity

For a retained delayed hit, write

$$
\mathbf{R}_{ij}
=
\mathbf{Y}_i(\lambda)
-
\mathbf{Y}_j(\lambda-\eta),
\qquad
\widehat{\mathbf{R}}_{ij}
=
\frac{\mathbf{R}_{ij}}{\eta}.
$$

The paired hit satisfies

$$
\mathbf{R}_{\iota i,\iota j}
=
-\mathbf{R}_{ij},
\qquad
\widehat{\mathbf{R}}_{\iota i,\iota j}
=
-\widehat{\mathbf{R}}_{ij}.
$$

The delayed root equation and Jacobian are invariant:

$$
G_{\iota i,\iota j}(\eta)
=
G_{ij}(\eta),
\qquad
J_{\iota i,\iota j}(\eta)
=
J_{ij}(\eta).
$$

Since

$$
\sigma_{\iota i}\sigma_{\iota j}
=
\sigma_i\sigma_j,
$$

the line-of-action force contribution has pair-odd parity:

$$
\mathbf{F}_{\iota i,\iota j}
=
-\mathbf{F}_{ij}.
$$

Summing over a ledger closed under $\iota$ gives

$$
\widetilde{\mathbf{F}}_{\iota i}
=
-\widetilde{\mathbf{F}}_i.
$$

Thus the projected normal force is also pair-odd:

$$
P_{\iota i}^\perp
\widetilde{\mathbf{F}}_{\iota i}
=
-
P_i^\perp
\widetilde{\mathbf{F}}_i.
$$

---

## 3. Residual Parity

The retained curvature residual is

$$
\mathcal{R}_{K,i}
=
\mathbf{K}_i
-
\Gamma_KP_i^\perp\widetilde{\mathbf{F}}_i.
$$

Under the hypotheses above,

$$
\mathcal{R}_{K,\iota i}
=
-\mathcal{R}_{K,i}.
$$

Therefore $\mathcal{R}_{K}$ is pair-odd in an exact-antipodal evaluator.

The tangential residual is the scalar

$$
\mathcal{R}_{\mathrm{tan},i}
=
\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i.
$$

Since both $\mathbf{T}_i$ and $\widetilde{\mathbf{F}}_i$ are pair-odd,

$$
\mathcal{R}_{\mathrm{tan},\iota i}
=
\mathcal{R}_{\mathrm{tan},i}.
$$

Thus $\mathcal{R}_{\mathrm{tan}}$ is pair-even. This is not a numerical accident; it is the parity forced by exact antipodality, neutral opposite-pair polarity, and an antipodally closed root ledger.

---

## 4. Why Pair-Even Does Not Mean Obstruction

The exact-antipodal coefficient chart contains variations satisfying

$$
\delta\mathbf{Y}_{\iota i}
=
-\delta\mathbf{Y}_i.
$$

Those variations preserve the pair-odd parity of vectors such as $\mathbf{T}$, $\mathbf{K}$, and $\widetilde{\mathbf{F}}$, but they still change the pair-even scalar row

$$
\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i.
$$

Consequently, a pair-even tangential residual is not automatically outside the range of an exact-antipodal linearized operator. The relevant test is not the parity of the residual by itself. It is whether the gauge-reduced finite-mode Jacobian has a stable left-null obstruction or residual remainder concentrated in the pair-even rows.

This explains the $M=3$ screen: the residual split was pair-even for $\mathcal{R}_{\mathrm{tan}}$ and pair-odd for $\mathcal{R}_{K}$, but the restricted matrix still had full $52$-column rank and a strong range signal. The observed nonlinear failure was a memory-window and support-band issue, not a pair-even linear no-go. The stricter local no-go test is the cokernel inequality in [support-complete-dynamics-obstruction-certificate.md](support-complete-dynamics-obstruction-certificate.md), sharpened by the row-aware block decomposition in [symmetry-block-decomposition-theorem.md](symmetry-block-decomposition-theorem.md).

---

## 5. Antipodal-Relaxation Opening Rule

Antipodal relaxation is a branch-class expansion. It introduces pair-midpoint motion and therefore changes root geometry, center-gauge rows, support-band floors, event/action ledgers, and framed-wake data. It should open only after exact-antipodal continuation fails for a reason that survives memory and support checks.

The safe opening rule is:

1. compute the exact-antipodal restricted matrix on a root-regular, memory-consistent ledger;
2. project any left-null obstruction or nonlinear residual remainder into pair-even and pair-odd rows;
3. verify the obstruction inequality in [support-complete-dynamics-obstruction-certificate.md](support-complete-dynamics-obstruction-certificate.md), including nonlinear remainder, tail error, and discretization error;
4. verify that pair-midpoint columns address the obstructing cokernel direction using [antipodal-relaxation-column-certificate.md](antipodal-relaxation-column-certificate.md);
5. verify that the obstruction is stable under grid, mode, root-window, and support-barrier refinement;
6. rule out `memory-window-exit`, `tail-interval-uncertified`, `support-traded-residual-reduction`, and `action-gamma-rerun-required` as the first hard failures.

Only then may the status change from

$$
\texttt{continue-exact-antipodal}
$$

to

$$
\texttt{antipodal-relaxation-open}.
$$

For the present $M=3$ evidence, the correct status remains

$$
\texttt{continue-exact-antipodal}
$$

because the first failure is explained by finite-memory depth and support growth.

---

## 6. Solver Output Fields

A future exact-antipodal rank or trust packet should emit:

| Field | Required content |
| --- | --- |
| `involution_policy` | site map $\iota$, polarity map, and whether the root ledger is closed under $\iota$ |
| `residual_parity` | pair-even and pair-odd norms for $\mathcal{R}_{\mathrm{tan}}$, $\mathcal{R}_{K}$, and any added residual rows |
| `operator_parity` | parity of the reduced Jacobian columns and row blocks |
| `left_null_parity` | pair-even fraction of each stable left-null obstruction |
| `support_complete_obstruction_certificate` | cokernel obstruction inequality, tail/discretization errors, and decision status |
| `antipodal_relaxation_column_certificate` | whether pair-midpoint columns span the obstructing cokernel residual |
| `residual_remainder_parity` | pair-even fraction of nonlinear residual not explained by the exact-antipodal step |
| `memory_exception` | whether any apparent parity failure is actually a root-ledger or memory-window mismatch |
| `relaxation_decision` | `continue-exact-antipodal`, `antipodal-relaxation-open`, or `not_decidable` |

Failure/status codes:

$$
\texttt{root-ledger-not-antipodally-closed},
\qquad
\texttt{pair-even-left-null-obstruction},
\qquad
\texttt{pair-even-remainder-after-memory-check},
$$

$$
\texttt{memory-window-exit-not-parity-obstruction},
\qquad
\texttt{continue-exact-antipodal},
\qquad
\texttt{not-retained}.
$$
