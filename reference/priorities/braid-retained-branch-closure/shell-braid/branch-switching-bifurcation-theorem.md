# Branch-Switching Bifurcation Theorem

Promotion status: `priority-only`. This packet refines [coefficient-space-branch-continuation-theorem.md](coefficient-space-branch-continuation-theorem.md), [branch-event-normal-forms.md](branch-event-normal-forms.md), [adjoint-cokernel-equations.md](adjoint-cokernel-equations.md), [symmetry-block-decomposition-theorem.md](symmetry-block-decomposition-theorem.md), [antipodal-relaxation-column-certificate.md](antipodal-relaxation-column-certificate.md), and [second-variation-action-stability-theorem.md](second-variation-action-stability-theorem.md). It states when a same-level braid continuation point is a genuine branch switch rather than a memory, tail, support, root, chart, action, or proof-budget event.

The theorem is local to one support-complete dynamics/action zero, one fixed root stratum, one action convention, one event-margin vector, one gauge quotient, and one residual weighting.

---

## 1. Branch Switch Versus Event Reset

Let

$$
\mathcal{G}(z)=0
$$

be the support-complete dynamics/action system from coefficient-space continuation, with $z$ collecting reduced coefficients and same-ledger scalar variables. A branch switch is considered only at a point $z_*$ satisfying

$$
\mathcal{G}(z_*)=0
$$

and

$$
\min_k\mathcal{E}_{\mathrm{evt},k}(z_*)>0.
$$

Thus every memory, support-tail, root-Jacobian, noncollision, chart-speed, equal-period, action, $\Gamma$, curl, and event-ledger margin is still positive. If any event margin vanishes first, the point is governed by [branch-event-normal-forms.md](branch-event-normal-forms.md), not by a branch-switch theorem.

The event separation rule is:

$$
\text{event boundary first}
\Longrightarrow
\texttt{event-reset-before-branch-switch}.
$$

In particular,

$$
\texttt{jacobian-root-fold}
$$

is a root-ledger event, not a fold bifurcation of the support-complete dynamics/action branch.

---

## 2. Simple Extra-Kernel Hypothesis

Let

$$
A_*=D\mathcal{G}(z_*):X\to\mathcal{E}
$$

be the weighted derivative on the fixed ledger. A regular continuation point has

$$
\ker A_*=\operatorname{span}\{\tau\},
$$

where $\tau$ is the tangent along the known branch.

A simple branch-switch point has exactly one additional kernel direction:

$$
\ker A_*=\operatorname{span}\{\tau,\phi\},
$$

with

$$
\phi\notin\operatorname{span}\{\tau\}.
$$

Let $\ell$ be the corresponding normalized adjoint cokernel vector:

$$
A_*^*\ell=0,
\qquad
\|\ell\|_{\mathcal{E}}=1.
$$

Choose complements

$$
X=\operatorname{span}\{\tau,\phi\}\oplus X_1,
\qquad
\mathcal{E}=\operatorname{span}\{\ell\}\oplus \operatorname{ran}A_*,
$$

and require range invertibility

$$
A_*:X_1\to\operatorname{ran}A_*
$$

with a certified inverse bound. If this range equation is not invertible, the correct status is

$$
\texttt{lyapunov-schmidt-range-fail}.
$$

---

## 3. Lyapunov-Schmidt Reduction

Write nearby states as

$$
z=z_*+x\tau+y\phi+w(x,y),
\qquad
w(x,y)\in X_1.
$$

The range equation

$$
Q\mathcal{G}(z_*+x\tau+y\phi+w)=0
$$

determines $w$ with

$$
w(0,0)=0,
\qquad
Dw(0,0)=0,
$$

where $Q$ projects to $\operatorname{ran}A_*$. The scalar cokernel equation is

$$
\psi(x,y)
=
\left\langle
\ell,
\mathcal{G}(z_*+x\tau+y\phi+w(x,y))
\right\rangle_{\mathcal{E}}
=0.
$$

Because $y=0$ is the known branch,

$$
\psi(x,0)=0,
$$

and therefore

$$
\psi(x,y)=y\Psi(x,y).
$$

The crossing coefficient is

$$
a
=
\left\langle
\ell,
D^2\mathcal{G}(z_*)[\tau,\phi]
\right\rangle_{\mathcal{E}}.
$$

A simple crossing requires

$$
a\ne0
$$

after all ledger, root, action, and gauge rows are included.

---

## 4. Scalar Normal Forms

If

$$
\Psi(x,y)
=
ax+by+O(x^2+|xy|+y^2)
$$

and

$$
ab\ne0,
$$

then the local branch switch is transcritical-type:

$$
y(x)
=
-
\frac{a}{b}x
+
O(x^2).
$$

If symmetry forces $b=0$ and

$$
\Psi(x,y)
=
ax+cy^2
+
O(x^2+|x|y^2+|y|^4),
\qquad
ac\ne0,
$$

then the opening is pitchfork-type:

$$
y_{\pm}(x)
=
\pm
\sqrt{-\frac{a}{c}x}
+
O(|x|).
$$

If an external branch parameter $\mu$ is used instead of the known-branch coordinate $x$, a genuine fold of the dynamics/action solution set has

$$
\psi(\mu,y)
=
a\mu+cy^2
+
O(\mu^2+|\mu y|+|y|^3),
\qquad
ac\ne0.
$$

This is distinct from the root equation fold

$$
G_a(\eta;z)=0,
\qquad
J_a=0,
$$

which remains a root-ledger event.

---

## 5. Symmetry-Breaking Midpoint Branch

For a relaxed midpoint chart, write

$$
\mathbf{Y}_{a,\sigma}
=
\mathbf{m}_a+\sigma\mathbf{r}_a.
$$

A midpoint symmetry-breaking branch can open only in a certified pair-even standard binary block $\beta$ from [symmetry-block-decomposition-theorem.md](symmetry-block-decomposition-theorem.md). The extra kernel direction must have the form

$$
\phi=(\delta u,\delta m_{\beta}),
\qquad
\delta m_{\beta}\ne0,
$$

with adjoint block $\ell_{\beta}$ satisfying the block cokernel equation. The reduced block equation is

$$
\Psi_{\beta}(x,m_{\beta})=0.
$$

In one real isotropy direction it reduces to the scalar forms above. In complex standard-block notation, with $m_{\beta}\in\mathbb{C}$ and $C_3$ equivariance, the generic form is

$$
\Psi_{\beta}(x,m_{\beta})
=
\kappa x\,m_{\beta}
+
q\,\overline{m_{\beta}}^{\,2}
+
\gamma |m_{\beta}|^2m_{\beta}
+
\cdots.
$$

If the quadratic term is allowed, the symmetry-breaking opening is transcritical-like in the standard block. If an additional declared parity removes it, the cubic pitchfork form controls the opening. Either way, midpoint relaxation is not a branch switch unless the exact-antipodal support-complete zero already has the extra kernel and the adjoint block obstruction is certified.

---

## 6. Action And Monodromy Compatibility

The switch direction must be visible in the action and return-map rows on the same ledger:

$$
\phi\in\ker\mathscr{J}_{B,\perp},
\qquad
M_B\phi=\phi.
$$

Here $\mathscr{J}_{B,\perp}$ is the quotient action Hessian from [second-variation-action-stability-theorem.md](second-variation-action-stability-theorem.md), and $M_B$ is the reduced monodromy from [root-dependent-variational-equation.md](root-dependent-variational-equation.md). If the derivative has an algebraic extra kernel but the action Hessian or monodromy does not show the corresponding neutral direction, the packet must report

$$
\texttt{morse-floquet-mismatch},
$$

not a branch switch.

For a conservative action/Noether branch, [conservative-monodromy-stability-classification.md](conservative-monodromy-stability-classification.md) also requires the new unit multiplier to be compatible with the presymplectic quotient and reciprocal multiplier audit.

---

## 7. Theorem Target

**Theorem target: support-complete branch switching.** Suppose $z_*$ is a support-complete dynamics/action zero with all event margins positive. Suppose $D\mathcal{G}(z_*)$ has exactly the known continuation tangent plus one additional simple kernel direction, the adjoint cokernel is certified, the Lyapunov-Schmidt range equation is invertible on complements, and the crossing coefficient or symmetry-reduced normal-form coefficient is nonzero. Then the zero set of $\mathcal{G}$ has the local branch-switch normal form in Sections 4 or 5.

If the extra direction lies in the pair-even standard midpoint block and passes the relaxation-column block test, the switch opens a symmetry-breaking midpoint branch. If the extra direction lies outside the permitted block, or if an event margin vanishes first, no midpoint branch switch is certified.

Proof route:

1. use the certified inverse on $X_1$ to solve the range equation for $w(x,y)$;
2. project the remaining equation onto the adjoint cokernel vector $\ell$;
3. factor the known branch as $y=0$;
4. classify the first nonzero coefficients of $\Psi$;
5. apply row-aware symmetry projectors for midpoint branches;
6. verify that action-Hessian nullity and monodromy unit multipliers match the new kernel direction.

---

## 8. Output Schema And Current Reading

Future support-complete continuation packets should emit:

| Field | Required content |
| --- | --- |
| `event_margin_at_switch` | proof that all $\mathcal{E}_{\mathrm{evt},k}(z_*)$ remain positive |
| `kernel_split` | tangent $\tau$, extra direction $\phi$, singular values, and complement basis |
| `adjoint_switch_basis` | normalized $\ell$ with $\|A_*^*\ell\|$ bound |
| `ls_range_inverse` | inverse bound for $A_*:X_1\to\operatorname{ran}A_*$ |
| `normal_form_coefficients` | $a,b,c$ or block-equivariant coefficients $\kappa,q,\gamma$ |
| `symmetry_block` | pair sector and binary Fourier block of $\phi$ and $\ell$ |
| `relaxation_block_status` | whether midpoint columns span the switch block |
| `morse_floquet_match` | action-Hessian and monodromy unit-direction compatibility |
| `branch_switch_decision` | first passing or failing status |

Failure/status codes:

$$
\texttt{branch-switch-candidate},
\qquad
\texttt{simple-kernel-crossing-certified},
\qquad
\texttt{lyapunov-schmidt-range-fail},
$$

$$
\texttt{adjoint-cokernel-mismatch},
\qquad
\texttt{symmetry-breaking-midpoint-branch},
\qquad
\texttt{bifurcation-transcritical},
$$

$$
\texttt{bifurcation-pitchfork},
\qquad
\texttt{bifurcation-fold},
\qquad
\texttt{event-reset-before-branch-switch},
$$

$$
\texttt{root-fold-event-not-branch-switch},
\qquad
\texttt{morse-floquet-mismatch},
\qquad
\texttt{not-retained}.
$$

Current $M=3$ evidence has no support-complete dynamics/action zero, no branch tangent kernel, and no adjoint kernel crossing. Its correct status remains

$$
\texttt{continue-exact-antipodal},
\qquad
\texttt{exact-antipodal-obstruction-required-first},
\qquad
\texttt{not-retained}.
$$

