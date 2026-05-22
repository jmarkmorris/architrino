# Krein Elliptic Stability Theorem

Promotion status: `priority-only`. This packet refines [conservative-monodromy-stability-classification.md](conservative-monodromy-stability-classification.md), [second-variation-action-stability-theorem.md](second-variation-action-stability-theorem.md), [root-ledger-floquet-stability-certificate.md](root-ledger-floquet-stability-certificate.md), [noether-neutral-mode-reduction-theorem.md](noether-neutral-mode-reduction-theorem.md), and [energy-momentum-orbital-stability-theorem.md](energy-momentum-orbital-stability-theorem.md). It states the conservative unit-circle stability test after gauge, Noether-neutral, and branch-family directions have been quotient-reduced.

The theorem is local to one support-complete conservative branch, one action ledger, one boundary two-form, one monodromy operator, and one neutral-mode quotient.

---

## 1. Conservative Quotient

Let $B$ be a support-complete conservative same-level branch with reduced monodromy

$$
M_B
$$

on the stability quotient. Let

$$
\Omega_{\perp}
$$

be the reduced boundary two-form from [conservative-monodromy-stability-classification.md](conservative-monodromy-stability-classification.md), and let

$$
Q_B
$$

be the constrained action Hessian from [second-variation-action-stability-theorem.md](second-variation-action-stability-theorem.md). The quotient is admissible only if

$$
M_B^T\Omega_{\perp}M_B
=
\Omega_{\perp}+E_{\Omega},
\qquad
\frac{\|E_{\Omega}\|}
{1+\|\Omega_{\perp}\|}
\le
\epsilon_{\Omega},
$$

and if $\Omega_{\perp}$ is nondegenerate after removing declared gauge, phase, torus, branch-neutral, and fixed Noether-level directions.

If the quotient still has unexplained nullity, this theorem exits with

$$
\texttt{omega-quotient-degenerate}.
$$

---

## 2. Krein Form

For a unit multiplier

$$
\mu=e^{i\theta},
$$

define the complex eigenspace

$$
E_{\mu}
=
\ker(M_B-\mu I).
$$

The Krein Hermitian form on $E_{\mu}$ is

$$
\mathfrak{k}_{\mu}(v,w)
=
i\,\Omega_{\perp}(\overline{v},w),
\qquad
v,w\in E_{\mu}.
$$

The multiplier is elliptically admissible only if $E_{\mu}$ is semisimple and $\mathfrak{k}_{\mu}$ is nondegenerate on $E_{\mu}$. Its Krein signature is

$$
\operatorname{sig}_K(\mu)
=
\left(
n_+(\mathfrak{k}_{\mu}),
n_-(\mathfrak{k}_{\mu})
\right).
$$

If $M_B$ has a unit multiplier with a nontrivial Jordan block, the status is

$$
\texttt{unit-multiplier-nonsemisimple}.
$$

If $\mathfrak{k}_{\mu}$ is degenerate on the unit eigenspace, the status is

$$
\texttt{krein-form-not-defined}.
$$

---

## 3. Relation To The Action Hessian

If the branch emits a compatible Hamiltonian generator row

$$
Q_B[\xi,\zeta]
=
\Omega_{\perp}(\xi,\mathcal{A}_B\zeta),
$$

and

$$
M_B
\simeq
\mathcal{T}
\exp
\int_0^L
\mathcal{A}_B(\lambda)\,d\lambda,
$$

then an eigenmode with phase frequency

$$
\omega=\frac{\theta}{L}
$$

satisfies the sign relation

$$
Q_B^{\mathbb{C}}[\overline{v},v]
=
\omega\,\mathfrak{k}_{\mu}(v,v)
+
O(
\epsilon_{\Omega}
+
\epsilon_{\mathrm{curl}}
+
\epsilon_{\mathrm{tail}}
+
\epsilon_{\mathrm{disc}}
+).
$$

Thus the Morse index is not a contraction certificate. In a conservative branch it counts negative-energy elliptic directions on the reduced quotient. The twisted Hessian check is

$$
\ker\mathscr{J}_{B,\perp}^{(\mu)}
\cong
\ker(M_B-\mu I),
$$

and index jumps of $\mathscr{J}_{B,\perp}^{(e^{i\theta})}$ across a unit multiplier are governed by the Krein signature.

If the emitted Morse index and Krein signatures disagree outside the certified error budget, the status is

$$
\texttt{morse-krein-index-mismatch}.
$$

---

## 4. Elliptic Stability Criterion

A conservative branch may be classified as

$$
\texttt{krein-elliptic-stable-candidate}
$$

only if every non-gauge transverse multiplier satisfies

$$
||\mu|-1|\le\epsilon_{\mathrm{ell}},
$$

every unit multiplier is semisimple, and every unit eigenspace has definite nonzero Krein signature:

$$
\operatorname{sig}_K(\mu)=(m,0)
\quad
\text{or}
\quad
\operatorname{sig}_K(\mu)=(0,m).
$$

This status means conservative linear boundedness candidate, not attracting contraction. It must be paired with the neutral-mode reduction row so that expected gauge, Noether, and branch-family unit multipliers have already been removed or declared.

If the branch is action-coercive but no dissipative or exchange row is present, the correct attracting-stability status remains

$$
\texttt{action-coercive-not-attracting}.
$$

---

## 5. Krein Collision Instability

Let two unit multipliers approach the same unit value:

$$
\mu_1,\mu_2\to\mu_*.
$$

If their Krein forms have opposite signs, then the collision is structurally dangerous:

$$
\operatorname{sig}_K(\mu_1)
\ \text{and}\
\operatorname{sig}_K(\mu_2)
\ \text{have opposite sign}.
$$

The status is

$$
\texttt{krein-collision-instability-candidate}.
$$

Under a generic conservative perturbation, the pair may leave the unit circle as a reciprocal quartet:

$$
\mu,
\qquad
\overline{\mu},
\qquad
\mu^{-1},
\qquad
\overline{\mu}^{-1}.
$$

If the collision is same-sign and semisimple, it is benign to first order:

$$
\texttt{same-sign-krein-collision-benign}.
$$

If a Jordan block appears on the unit circle, the status is instead

$$
\texttt{conservative-parabolic-open}.
$$

---

## 6. Theorem Target

**Theorem target: Krein elliptic stability.** Suppose a same-level branch packet passes support-complete dynamics/action closure, Noether neutral-mode reduction, conservative boundary two-form audit, and root-ledger monodromy construction. Suppose the reduced two-form is nondegenerate and the monodromy preserves it to tolerance.

Then every non-gauge transverse multiplier is subject to reciprocal pairing. Unit-circle multipliers are linearly admissible only when their eigenspaces are semisimple and have nondegenerate Krein form. Definite nonzero Krein signatures give an elliptic conservative stability candidate; opposite-sign collisions give a conservative instability candidate.

The theorem does not prove nonlinear KAM persistence, does not prove attraction, and does not replace medium-response or event-exchange damping rows when contraction is claimed.

---

## 7. Output Schema And Current Reading

Future conservative stability packets should emit:

| Field | Required content |
| --- | --- |
| `reduced_two_form` | $\Omega_{\perp}$ and quotient nullity after neutral-mode reduction |
| `symplectic_audit` | $\|M_B^T\Omega_{\perp}M_B-\Omega_{\perp}\|/(1+\|\Omega_{\perp}\|)$ |
| `unit_eigenspaces` | $E_{\mu}$ for each unit-circle multiplier and semisimplicity status |
| `krein_forms` | $\mathfrak{k}_{\mu}$ matrices and signatures |
| `morse_krein_relation` | $Q_B$ sign relation or twisted-Hessian index audit |
| `collision_scan` | close unit multiplier pairs and opposite-sign collision flags |
| `krein_decision` | first passing or failing status |

Failure/status codes:

$$
\texttt{boundary-two-form-open},
\qquad
\texttt{omega-quotient-degenerate},
\qquad
\texttt{krein-form-not-defined},
$$

$$
\texttt{unit-multiplier-nonsemisimple},
\qquad
\texttt{krein-definite-elliptic-pass},
\qquad
\texttt{mixed-krein-signature},
$$

$$
\texttt{krein-collision-instability-candidate},
\qquad
\texttt{same-sign-krein-collision-benign},
\qquad
\texttt{morse-krein-index-mismatch},
$$

$$
\texttt{action-coercive-not-attracting},
\qquad
\texttt{spurious-conservative-contraction},
\qquad
\texttt{not-retained}.
$$

Current $M=3$ rows have no support-complete branch, no boundary two-form, and no root-ledger monodromy. Their status remains

$$
\texttt{root-ledger-floquet-stability-open},
\qquad
\texttt{boundary-two-form-open},
\qquad
\texttt{not-retained}.
$$
