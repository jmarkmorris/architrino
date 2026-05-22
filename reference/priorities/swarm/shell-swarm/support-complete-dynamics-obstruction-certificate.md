# Support-Complete Dynamics Obstruction Certificate

Promotion status: `priority-only`. This packet states the finite-mode obstruction certificate needed before exact-antipodal $M=3$ continuation can be declared genuinely blocked. It connects [adaptive-memory-trust-radius-lemma.md](adaptive-memory-trust-radius-lemma.md), [unresolved-tail-force-error-bound.md](unresolved-tail-force-error-bound.md), [exact-antipodal-parity-lemma.md](exact-antipodal-parity-lemma.md), [history-force-variationality-condition.md](history-force-variationality-condition.md), and [adjoint-cokernel-equations.md](adjoint-cokernel-equations.md). It does not retain a branch and does not claim that the current $M=3$ rows already satisfy the obstruction test.

The core distinction is this:

$$
\text{nonzero residual after a descent step}
\ne
\text{proof that exact antipodality is impossible}.
$$

An obstruction requires a certified left-null residual that cannot be removed by finite-mode nonlinear remainder, tail corrections, discretization error, or a memory-ledger change.

---

## 1. Residual Map On One Ledger

Fix:

1. an exact-antipodal arclength-inverse coefficient chart;
2. the equal-period gauge-reduced tangent space $T_{\alpha_0}\mathcal{M}_{\mathrm{ep}}$;
3. one source-pair policy;
4. one support-complete memory ledger $\mathcal{A}_\eta$.

Define the residual map

$$
\mathcal{F}_{\eta}(\alpha)
=
\begin{bmatrix}
\mathcal{R}_{\mathrm{tan}}^{(\eta)}(\alpha)\\
\mathcal{R}_{K}^{(\eta)}(\alpha)
\end{bmatrix},
$$

where

$$
\mathcal{R}_{K}^{(\eta)}
=
\mathbf{K}
-
\Gamma_K^{\mathrm{fit}}
P^\perp\widetilde{\mathbf{F}}^{(\eta)}
$$

unless a derived action-scale row replaces the fitted scale. The linearized dynamics matrix is

$$
A
=
D\mathcal{F}_{\eta}(\alpha_0)
:
T_{\alpha_0}\mathcal{M}_{\mathrm{ep}}
\to
\mathcal{E}_{\eta},
$$

where $\mathcal{E}_{\eta}$ is the weighted residual space on the same grid, memory ledger, and row convention.

Let $P_{\mathrm{cok}}$ be the orthogonal projection onto the numerical cokernel of $A$:

$$
P_{\mathrm{cok}}A=0.
$$

In practice $P_{\mathrm{cok}}$ is built from the left singular vectors whose singular values are below the declared range tolerance, plus the exact orthogonal complement when $A$ is tall and full column rank.

---

## 2. Certified Ball

A ball

$$
B_\rho(\alpha_0)
=
\{\alpha_0+\delta:\|\delta\|\le\rho\}
$$

is admissible for this certificate only if all of the following are already certified on the same ball:

1. root labels, endpoint signs, excluded gaps, Jacobian floors, and noncollision floors persist by [root-jacobian-barrier-lemma.md](root-jacobian-barrier-lemma.md);
2. the adaptive-memory inequalities in [adaptive-memory-trust-radius-lemma.md](adaptive-memory-trust-radius-lemma.md) preserve either support-complete memory or a certified root-free tail;
3. unresolved tail roots, if any remain outside the active window, have a finite error envelope from [unresolved-tail-force-error-bound.md](unresolved-tail-force-error-bound.md);
4. the root sensitivities and force rows are recomputed on the current ledger, not frozen from a shallower run;
5. discretization refinement emits an error envelope $\epsilon_{\mathrm{disc}}$ for the residual projection, using [collocation-refinement-error-certificate.md](collocation-refinement-error-certificate.md).

Let

$$
\epsilon_{\mathcal{F}}^{\mathrm{tail}}
$$

denote the residual-space tail error induced by the omitted-force bound. Under support-complete memory,

$$
\epsilon_{\mathcal{F}}^{\mathrm{tail}}=0.
$$

---

## 3. Cokernel Remainder Bound

Assume the nonlinear remainder projected to the cokernel obeys

$$
\left\|
P_{\mathrm{cok}}
\left[
\mathcal{F}_{\eta}(\alpha_0+\delta)
-
\mathcal{F}_{\eta}(\alpha_0)
-
A\delta
\right]
\right\|
\le
\frac{1}{2}L_{\mathrm{cok}}\|\delta\|^2
$$

for every $\|\delta\|\le\rho$. The constant $L_{\mathrm{cok}}$ may be obtained from interval Hessian bounds, finite-difference Lipschitz screens with safety margin, or a certified automatic-differentiation envelope.

Define the base cokernel residual

$$
c_0
=
\left\|
P_{\mathrm{cok}}\mathcal{F}_{\eta}(\alpha_0)
\right\|.
$$

The obstruction test is:

$$
c_0
>
\frac{1}{2}L_{\mathrm{cok}}\rho^2
+
\epsilon_{\mathcal{F}}^{\mathrm{tail}}
+
\epsilon_{\mathrm{disc}}.
$$

---

## 4. Obstruction Lemma

**Lemma target: support-complete exact-antipodal dynamics obstruction.** Under the certified-ball assumptions above, if

$$
\left\|
P_{\mathrm{cok}}\mathcal{F}_{\eta}(\alpha_0)
\right\|
>
\frac{1}{2}L_{\mathrm{cok}}\rho^2
+
\epsilon_{\mathcal{F}}^{\mathrm{tail}}
+
\epsilon_{\mathrm{disc}},
$$

then there is no exact-antipodal dynamics zero

$$
\mathcal{F}_{\eta}(\alpha)=0
$$

inside $B_\rho(\alpha_0)$ on the declared support-complete memory ledger.

Proof route. If such a zero existed at $\alpha_0+\delta$, Taylor expansion gives

$$
0
=
P_{\mathrm{cok}}\mathcal{F}_{\eta}(\alpha_0+\delta)
=
P_{\mathrm{cok}}\mathcal{F}_{\eta}(\alpha_0)
+
P_{\mathrm{cok}}A\delta
+
P_{\mathrm{cok}}\mathcal{N}(\delta)
+
\mathcal{E}_{\mathrm{tail}}
+
\mathcal{E}_{\mathrm{disc}}.
$$

Since $P_{\mathrm{cok}}A\delta=0$, the base cokernel residual could only be canceled by nonlinear remainder, tail correction, or discretization error. The displayed strict inequality makes those effects too small, giving a contradiction.

The result is local. It does not rule out a zero outside the ball, on a deeper memory ledger, at higher mode number, or after opening a different symmetry chart.

---

## 5. Pair-Parity Decision Rule

The exact-antipodal parity lemma shows that

$$
\mathcal{R}_{\mathrm{tan}}
\quad\text{is pair-even},
\qquad
\mathcal{R}_K
\quad\text{is pair-odd}
$$

on an antipodally closed ledger. Therefore a pair-even residual component is not automatically an obstruction. It becomes evidence for opening antipodal relaxation only if all rows below pass:

1. the obstruction inequality holds on a support-complete or tail-bounded ledger;
2. the obstructing left-null vector is stable under grid refinement, mode refinement, and memory-depth refinement;
3. the obstructing projection is concentrated in the exact-antipodal pair-even sector beyond a declared fraction $\chi_{\mathrm{even}}$;
4. the projected residual is not removed by recomputing $\Gamma_K$, action, or the variationality/curl row;
5. the same obstruction survives after root sensitivities are recomputed on the current ledger.

Only then is the correct next action

$$
\text{open antipodal relaxation}.
$$

Otherwise the correct status remains

$$
\text{continue exact-antipodal continuation}.
$$

---

## 6. Current $M=3$ Reading

The existing $M=3$ packets do not yet provide the data needed to apply this certificate retrospectively. In particular, the current documents do not emit:

1. the full residual vector on a support-complete memory ledger;
2. the full left singular vector basis for the gauge-reduced equal-period matrix;
3. the projected base residual $P_{\mathrm{cok}}\mathcal{F}_{\eta}(\alpha_0)$;
4. a certified cokernel Lipschitz constant $L_{\mathrm{cok}}$;
5. the discretization projection error $\epsilon_{\mathrm{disc}}$;
6. a tail-exclusion certificate or finite tail-force envelope for the $\rho=0.8$ support tail.

Thus the present mathematical state is not

$$
\texttt{exact-antipodal-obstructed}.
$$

It is

$$
\texttt{obstruction-certificate-open},
\qquad
\texttt{support-complete-memory-open},
\qquad
\texttt{tail-force-error-unbounded},
\qquad
\texttt{continue-exact-antipodal}.
$$

---

## 7. Required Output Fields

The next support-complete $M=3$ dynamics packet should emit:

| Field | Required payload |
| --- | --- |
| `support_complete_residual_vector` | weighted $\mathcal{F}_{\eta}(\alpha_0)$ on the declared ledger |
| `gauge_reduced_matrix` | $A=D\mathcal{F}_{\eta}(\alpha_0)$ after equal-period and gauge projection |
| `left_null_basis` | left singular vectors, singular values, and tolerance defining $P_{\mathrm{cok}}$ |
| `cokernel_residual_norm` | $c_0=\|P_{\mathrm{cok}}\mathcal{F}_{\eta}(\alpha_0)\|$ |
| `cokernel_lipschitz_bound` | $L_{\mathrm{cok}}$ and derivation method |
| `certificate_radius` | $\rho$ after root/Jacobian, memory, tail, support, and noncollision trust limits |
| `tail_residual_error` | $\epsilon_{\mathcal{F}}^{\mathrm{tail}}$, equal to zero only under support-complete memory |
| `discretization_projection_error` | $\epsilon_{\mathrm{disc}}$ from [collocation-refinement-error-certificate.md](collocation-refinement-error-certificate.md) |
| `pair_parity_projection` | pair-even and pair-odd fractions of the obstructing left-null residual |
| `decision` | `continue-exact-antipodal`, `open-antipodal-relaxation`, or `rerun-memory-ledger` |

Failure/status codes:

$$
\texttt{obstruction-certificate-open},
\qquad
\texttt{support-complete-obstruction-certified},
\qquad
\texttt{left-null-stability-unproven},
$$

$$
\texttt{pair-even-obstruction-certified},
\qquad
\texttt{tail-error-dominates-obstruction},
\qquad
\texttt{not-retained}.
$$
