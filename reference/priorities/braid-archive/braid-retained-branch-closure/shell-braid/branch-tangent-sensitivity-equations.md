# Branch-Tangent Sensitivity Equations

Promotion status: `priority-only`. This packet gives the derivative equations needed to follow an exact-antipodal $M=3$ support-complete branch, predict event crossings, assemble Newton/Krawczyk matrices, recompute $\Gamma$ rows, and feed the Floquet stability certificate. It complements [arclength-inverse-variation-formulas.md](arclength-inverse-variation-formulas.md) and [delayed-force-lipschitz-envelope.md](delayed-force-lipschitz-envelope.md).

The equations are local to one arclength-inverse chart, one active root ledger, one source-pair policy, one memory convention, one branch tangent, and one coefficient norm.

---

## 1. Branch Tangent

Let $z=(u,\chi)$ be the coefficient-space continuation state from [coefficient-space-branch-continuation-theorem.md](coefficient-space-branch-continuation-theorem.md). A branch tangent is

$$
\tau=\dot z
$$

satisfying the linearized branch equation

$$
D\mathcal{G}(z)\tau=0
$$

after the pseudo-arclength orientation has been fixed. For any branch-dependent quantity $Q(z)$, write

$$
\dot Q=DQ(z)\tau.
$$

The formulas below are the pointwise entries that build $D\mathcal{G}(z)\tau$ and the event derivative vector.

---

## 2. Inverse Arclength Phase

For construction curve $\mathbf{Z}_i(\theta;u)$, let

$$
S_i(\theta)=\|\partial_\theta\mathbf{Z}_i(\theta)\|.
$$

The arclength phase $\theta_i(\lambda;u)$ is defined by

$$
\int_0^{\theta_i(\lambda;u)}S_i(\zeta;u)\,d\zeta=\lambda.
$$

Along branch tangent $\tau$,

$$
\dot\theta_i(\lambda)
=
-
\frac{
\int_0^{\theta_i(\lambda)}
\dot S_i(\zeta)\,d\zeta
}{
S_i(\theta_i(\lambda))
}.
$$

Here

$$
\dot S_i
=
\frac{
\partial_\theta\mathbf{Z}_i\cdot
\partial_\theta\dot{\mathbf{Z}}_i
}{S_i}
$$

on the chart where $S_i>0$.

The arclength curve derivative is

$$
\dot{\mathbf{Y}}_i(\lambda)
=
\dot{\mathbf{Z}}_i(\theta_i(\lambda))
+
\partial_\theta\mathbf{Z}_i(\theta_i(\lambda))\dot\theta_i(\lambda).
$$

This is the branch-tangent version of the fixed-arclength variation formulas. It is the derivative used in every root, force, curl, and event row.

---

## 3. Root Delay Sensitivity

For a retained root label

$$
a=(i,j,\lambda_n,\mu),
$$

write

$$
\mathbf{R}_a
=
\mathbf{Y}_i(\lambda_n)
-
\mathbf{Y}_j(\lambda_n-\eta_a),
\qquad
\widehat{\mathbf{R}}_a
=
\frac{\mathbf{R}_a}{\eta_a},
$$

and

$$
J_a
=
1-
\mathbf{T}_j(\lambda_n-\eta_a)\cdot\widehat{\mathbf{R}}_a.
$$

Differentiating the root equation

$$
\|\mathbf{R}_a\|-\eta_a=0
$$

gives

$$
\dot\eta_a
=
\frac{
\widehat{\mathbf{R}}_a\cdot
\left[
\dot{\mathbf{Y}}_i(\lambda_n)
-
\dot{\mathbf{Y}}_j(\lambda_n-\eta_a)
\right]
}{J_a}.
$$

The delayed source phase derivative contains the root-delay correction:

$$
\frac{d}{ds}\theta_j(\lambda_n-\eta_a)
=
\dot\theta_j(\lambda_n-\eta_a)
-
\frac{\dot\eta_a}{S_j(\theta_j(\lambda_n-\eta_a))}.
$$

The delayed separation derivative is

$$
\dot{\mathbf{R}}_a
=
\dot{\mathbf{Y}}_i(\lambda_n)
-
\dot{\mathbf{Y}}_j(\lambda_n-\eta_a)
+
\mathbf{T}_j(\lambda_n-\eta_a)\dot\eta_a.
$$

The direction derivative is

$$
\dot{\widehat{\mathbf{R}}}_a
=
\frac{
\left(I-\widehat{\mathbf{R}}_a\widehat{\mathbf{R}}_a^T\right)
\dot{\mathbf{R}}_a
}{\eta_a}.
$$

---

## 4. Jacobian And Force Sensitivity

The total delayed tangent derivative is

$$
\dot{\mathbf{T}}_{j,a}^{-}
=
\dot{\mathbf{T}}_j(\lambda_n-\eta_a)
-
\mathbf{K}_j(\lambda_n-\eta_a)\dot\eta_a.
$$

The root Jacobian derivative is therefore

$$
\dot J_a
=
-
\dot{\mathbf{T}}_{j,a}^{-}\cdot\widehat{\mathbf{R}}_a
-
\mathbf{T}_j(\lambda_n-\eta_a)\cdot\dot{\widehat{\mathbf{R}}}_a.
$$

The source-normal Jacobian derivative above is a root-chart diagnostic. It is not
the received force/action branch strength. The receiver-normal restart row for
the per-root force term is

$$
\mathbf{f}_a
=
\sigma_i\sigma_j\,\eta_a^{-2}W_a^{\mathrm{rec}}
\widehat{\mathbf{R}}_a.
$$

Let

$$
w_a^{\mathrm{rec}}=\eta_a^{-2}W_a^{\mathrm{rec}},
\qquad
W_a^{\mathrm{rec}}=\left|\frac{D_{T,a}}{D_{s,a}}\right|.
$$

Then the force-sensitivity row must be rebuilt from the same retained record
that emits $D_{s,a}$, $D_{T,a}$, and $D_vW_a^{\mathrm{rec}}$:

$$
\dot w_a^{\mathrm{rec}}
=
w_a^{\mathrm{rec}}
\left(
-2\frac{\dot\eta_a}{\eta_a}
+
\frac{\dot W_a^{\mathrm{rec}}}{W_a^{\mathrm{rec}}}
\right),
$$

when $W_a^{\mathrm{rec}}>0$ on the branch chart. Therefore

$$
\dot{\mathbf{f}}_a
=
\sigma_i\sigma_j\,w_a^{\mathrm{rec}}
\left(
\dot{\widehat{\mathbf{R}}}_a
-
\left(
2\frac{\dot\eta_a}{\eta_a}
-
\frac{\dot W_a^{\mathrm{rec}}}{W_a^{\mathrm{rec}}}
\right)
\widehat{\mathbf{R}}_a
\right).
$$

Until that receiver-normal derivative row is emitted, this packet is
`receiver-normal-restart-required` rather than an active force/action
certificate.

The receiver force sensitivity is

$$
\dot{\widetilde{\mathbf{F}}}_{i,n}
=
\sum_{a\in\mathcal{A}_{i,n}}
\dot{\mathbf{f}}_a.
$$

These formulas are valid only while root labels, Jacobian signs, source-pair policy, and memory convention do not change.

---

## 5. Tangential And Curvature Residual Sensitivity

The tangential residual is

$$
\mathcal{R}_{\mathrm{tan},i,n}
=
\mathbf{T}_{i,n}\cdot\widetilde{\mathbf{F}}_{i,n}.
$$

Its tangent derivative is

$$
\dot{\mathcal{R}}_{\mathrm{tan},i,n}
=
\dot{\mathbf{T}}_{i,n}\cdot\widetilde{\mathbf{F}}_{i,n}
+
\mathbf{T}_{i,n}\cdot\dot{\widetilde{\mathbf{F}}}_{i,n}.
$$

Let

$$
A=P^\perp\widetilde{\mathbf{F}},
\qquad
\mathcal{R}_{K}
=
\mathbf{K}-\Gamma A.
$$

The projected-force derivative is

$$
\dot A
=
\dot P^\perp\widetilde{\mathbf{F}}
+
P^\perp\dot{\widetilde{\mathbf{F}}},
$$

where

$$
\dot P^\perp
=
-
\dot{\mathbf{T}}\mathbf{T}^T
-
\mathbf{T}\dot{\mathbf{T}}^T.
$$

For a fitted scale,

$$
\Gamma_K^{\mathrm{fit}}
=
\frac{\langle\mathbf{K},A\rangle}{\langle A,A\rangle}.
$$

Its branch derivative is

$$
\dot\Gamma_K^{\mathrm{fit}}
=
\frac{
\langle\dot{\mathbf{K}},A\rangle
+
\langle\mathbf{K},\dot A\rangle
-
\Gamma_K^{\mathrm{fit}}\,2\langle A,\dot A\rangle
}{
\langle A,A\rangle
}.
$$

The fitted curvature-residual derivative is

$$
\dot{\mathcal{R}}_{K}^{\mathrm{fit}}
=
\dot{\mathbf{K}}
-
\dot\Gamma_K^{\mathrm{fit}}A
-
\Gamma_K^{\mathrm{fit}}\dot A.
$$

For an action-derived branch, replace $\Gamma_K^{\mathrm{fit}}$ by $\Gamma_B$ and use

$$
\dot{\mathcal{R}}_{K}^{B}
=
\dot{\mathbf{K}}
-
\dot\Gamma_B A
-
\Gamma_B\dot A,
$$

with $\dot\Gamma_B$ obtained from the same action/inertia row as the branch scale. The difference between these two derivatives is part of the $\Gamma$ compatibility audit.

For the scale row

$$
E_\epsilon=\frac{\kappa\epsilon^2}{R_*},
\qquad
\Gamma_B=\frac{E_\epsilon}{m_{\mathrm{car}}c_f^2},
$$

with $c_f,\epsilon,\kappa$ fixed, this derivative is

$$
\dot\Gamma_B
=
-
\Gamma_B
\left(
\frac{\dot R_*}{R_*}
+
\frac{\dot m_{\mathrm{car}}}{m_{\mathrm{car}}}
\right).
$$

---

## 6. Curl And Action Sensitivity

Let $W_p(z)$ be the finite-mode work one-form component for coefficient coordinate $p$:

$$
W_p
=
\int
\sum_i
P_i^\perp\widetilde{\mathbf{F}}_i
\cdot
\partial_p\mathbf{Y}_i^\perp
d\lambda.
$$

The exterior curl entries are

$$
\mathcal{C}_{pq}
=
\partial_p W_q-\partial_q W_p.
$$

Along the branch tangent,

$$
\dot W_p
=
\int
\sum_i
\left(
\dot P_i^\perp\widetilde{\mathbf{F}}_i
+
P_i^\perp\dot{\widetilde{\mathbf{F}}}_i
\right)
\cdot
\partial_p\mathbf{Y}_i^\perp
d\lambda
+
\int
\sum_i
P_i^\perp\widetilde{\mathbf{F}}_i
\cdot
\frac{d}{ds}
\partial_p\mathbf{Y}_i^\perp
d\lambda.
$$

This derivative is not a substitute for the curl matrix; it is the branch-direction audit. A valid action row still requires

$$
\frac{\|\mathcal{C}\|_{\mathrm{F}}}{1+\|W\|_{\mathrm{F}}}
\le
\epsilon_{\mathrm{curl}}.
$$

If the root ledger changes, $W_p$, $\dot W_p$, and $\mathcal{C}_{pq}$ must be recomputed from the new ledger.

---

## 7. Event Margin Sensitivities

The branch tangent predicts event crossings by differentiating event margins. The main rows are:

$$
\dot m_{\mathrm{act}}
=
\dot\eta_{\mathrm{mem}}
-
\max_{a\in\mathcal{A}_{\eta}}\dot\eta_a
$$

for a unique active-delay maximizer;

$$
\dot m_{\mathrm{sup}}
=
\dot\eta_{\mathrm{mem}}
-
2\dot r_{\max}
-
\dot m_\eta
$$

for a unique support maximizer;

$$
\frac{d}{ds}(J_{\min}-\epsilon_J)
=
\dot J_{a_*}
$$

for the unique minimum-Jacobian root $a_*$;

$$
\frac{d}{ds}(d_{\min}-\epsilon_x)
=
\widehat{\mathbf{D}}_{ij}\cdot
\left(
\dot{\mathbf{Y}}_i-\dot{\mathbf{Y}}_j
\right)
$$

for the unique closest pair; and

$$
\frac{d}{ds}
\left(
\epsilon_{\mathrm{curl}}
-
\frac{\|\mathcal{C}\|_{\mathrm{F}}}{1+\|W\|_{\mathrm{F}}}
\right)
=
-
\frac{
\langle\mathcal{C},\dot{\mathcal{C}}\rangle_{\mathrm{F}}(1+\|W\|_{\mathrm{F}})
-
\|\mathcal{C}\|_{\mathrm{F}}\frac{\langle W,\dot W\rangle}{\|W\|}
}{
\|\mathcal{C}\|_{\mathrm{F}}(1+\|W\|_{\mathrm{F}})^2
}
$$

when $W$ and $\mathcal{C}$ are nonzero. Nonsmooth ties are multi-event boundaries and must be rescreened rather than differentiated through a single label.

---

## 8. Sensitivity Theorem Target

**Theorem target.** On a root-regular, support-complete exact-antipodal $M=3$ arclength-inverse branch with fixed ledger convention and positive event margins, every residual and event derivative in the continuation system is obtained by the chain

$$
\tau
\mapsto
\dot\theta_i
\mapsto
\dot{\mathbf{Y}}_i,\dot{\mathbf{T}}_i,\dot{\mathbf{K}}_i
\mapsto
\dot\eta_a,\dot J_a,\dot{\mathbf{f}}_a
\mapsto
\dot{\widetilde{\mathbf{F}}},\dot{\mathcal{R}}_{\mathrm{tan}},\dot{\mathcal{R}}_K,\dot W,\dot{\mathcal{E}}_{\mathrm{evt}}.
$$

The formulas above are valid until the first event surface. At a memory reset, tail assimilation, root fold, chart change, support-band change, or action-ledger change, the derivative chain must be rebuilt with the new ledger convention.
