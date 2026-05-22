# Intrinsic Curve Dynamics Equation

Promotion status: `priority-only`. This packet rewrites same-level tri-binary dynamics as an intrinsic curve equation. It builds on [arc-length-dynamics-reduction.md](arc-length-dynamics-reduction.md): fixed speed is handled by arclength, and the remaining physical equation is that the delayed causal-wake force equals the curvature acceleration of each carrier curve. The bounded speed factor extension is stated separately in [variable-speed-factor-extension.md](variable-speed-factor-extension.md); it recovers this packet when $\nu_i\equiv1$.

This is a theorem-target formulation. It does not prove that a retained shell swarm branch exists.

---

## 1. Dimensionless Arclength Chart

Use a common arclength variable

$$
\lambda=\frac{c_ft}{R_*},
$$

where $R_*$ is a declared normalization scale. A same-level branch is represented by six closed curves

$$
\mathbf{Y}_i:\mathbb{R}/L\mathbb{Z}\to\mathbb{R}^3,
\qquad
i=1,\ldots,6,
$$

parameterized by dimensionless arclength:

$$
\left\|\frac{d\mathbf{Y}_i}{d\lambda}\right\|=1.
$$

Write

$$
\mathbf{T}_i(\lambda)=\mathbf{Y}_i'(\lambda),
\qquad
\mathbf{K}_i(\lambda)=\mathbf{Y}_i''(\lambda).
$$

Then

$$
\mathbf{T}_i\cdot\mathbf{K}_i=0.
$$

The physical branch in the center-gauge chart is

$$
\mathbf{x}_i(t)=R_*\mathbf{Y}_i(\lambda),
\qquad
\lambda=\frac{c_ft}{R_*}.
$$

This automatically gives

$$
\|\dot{\mathbf{x}}_i(t)\|=c_f.
$$

This is the fixed-speed special case. In the bounded speed factor model, the same arclength curve is traversed with a positive speed factor $\nu_i(\lambda)$:

$$
\dot{\mathbf{x}}_i(t)=c_f\nu_i(\lambda)\mathbf{T}_i(\lambda),
$$

and the intrinsic dynamics equation changes as in [variable-speed-factor-extension.md](variable-speed-factor-extension.md).

---

## 2. Delayed Root Equation On Loops

For receiver loop phase $\lambda$ and source delay $\eta>0$, the dimensionless causal-root equation is

$$
G_{ij}(\lambda,\eta)
=
\left\|
\mathbf{Y}_i(\lambda)
-\mathbf{Y}_j(\lambda-\eta)
\right\|
-\eta
=0.
$$

The retained active-root ledger is

$$
\mathcal{A}_i(\lambda)
=
\{(j,\alpha,\eta_{ij}^{\alpha}(\lambda)):
G_{ij}(\lambda,\eta_{ij}^{\alpha})=0,\ \eta_{ij}^{\alpha}>0\}.
$$

The root Jacobian is

$$
J_{ij}^{\alpha}(\lambda)
=
1-
\mathbf{T}_j(\lambda-\eta_{ij}^{\alpha})
\cdot
\widehat{\mathbf{R}}_{ij}^{\alpha}(\lambda),
$$

where

$$
\widehat{\mathbf{R}}_{ij}^{\alpha}(\lambda)
=
\frac{
\mathbf{Y}_i(\lambda)-\mathbf{Y}_j(\lambda-\eta_{ij}^{\alpha})
}{
\eta_{ij}^{\alpha}
}.
$$

A retained root chart requires

$$
\eta_{\min}>0,
\qquad
J_{\min}>\epsilon_J,
\qquad
|\mathcal{A}_i(\lambda)|<\infty.
$$

Same-source roots are included only if the ledger declares `retained-positive-delay` or a controlled `regularized-fold-layer` row.

---

## 3. Dimensionless Wake Force

Remove the common scale factor

$$
\frac{\kappa\epsilon^2}{R_*^2}.
$$

The dimensionless architrino force is

$$
\widetilde{\mathbf{F}}_i(\lambda)
=
\sum_{(j,\alpha)\in\mathcal{A}_i(\lambda)}
\sigma_i\sigma_j
\frac{
\widehat{\mathbf{R}}_{ij}^{\alpha}(\lambda)
}{
(\eta_{ij}^{\alpha}(\lambda))^2
|J_{ij}^{\alpha}(\lambda)|
}
+\widetilde{\mathbf{F}}_i^{\mathrm{self}}(\lambda)
+\widetilde{\mathbf{F}}_i^{\mathrm{med}}(\lambda).
$$

Here $\sigma_i=\pm1$ is the architrino polarity sign. The self and medium terms are zero unless their ledgers are explicitly supplied.

The dimensionless coupling from force scale to curvature acceleration is

$$
\Gamma
=
\frac{\kappa\epsilon^2}{R_*c_f^2}
\times
\text{mass-normalization factor}.
$$

The mass-normalization factor is not free proof decoration. It must be fixed by the action, energy, and branch-inertia ledger for the candidate branch. In numerical screens, $\Gamma$ may be fitted only as a diagnostic.

---

## 4. Intrinsic Dynamics Equation

The same-level fixed-speed dynamics equation is

$$
\mathbf{K}_i(\lambda)
=
\Gamma
\widetilde{\mathbf{F}}_i(\lambda),
\qquad
i=1,\ldots,6.
$$

Because $\mathbf{K}_i\perp\mathbf{T}_i$, this vector equation contains the necessary tangential condition

$$
\mathbf{T}_i(\lambda)\cdot
\widetilde{\mathbf{F}}_i(\lambda)
=0.
$$

Equivalently, separate the force into tangent and normal parts:

$$
\widetilde{\mathbf{F}}_i
=
\left(\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i\right)\mathbf{T}_i
+
P_i^{\perp}\widetilde{\mathbf{F}}_i,
$$

where

$$
P_i^{\perp}
=
I-\mathbf{T}_i\mathbf{T}_i^T.
$$

Then the branch equations are

$$
\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i=0,
$$

and

$$
\mathbf{K}_i
=
\Gamma P_i^{\perp}\widetilde{\mathbf{F}}_i.
$$

The first equation prevents the delayed wake ledger from doing work along the fixed-speed carrier. The second equation requires the normal force to supply the exact curvature of the same curve that generated the roots.

---

## 5. Closure Conditions

A curve solution of the intrinsic equation is not yet a retained branch unless it satisfies the following rows on the same active-root convention:

| Row | Equation or gate |
| --- | --- |
| Unit tangent | $\|\mathbf{Y}'_i(\lambda)\|=1$ |
| Period closure | $\mathbf{Y}_i(\lambda+L)=\mathbf{Y}_i(\lambda)$ and $\mathbf{T}_i(\lambda+L)=\mathbf{T}_i(\lambda)$ |
| Center gauge | $\sum_i\mathbf{Y}_i(\lambda)=\mathbf{0}$ or a declared moving-center export |
| Support band | $1-\delta\le\|\mathbf{Y}_i(\lambda)\|\le1+\delta$ after scale normalization |
| Noncollision | $\inf_{i\ne j,\lambda}\|\mathbf{Y}_i(\lambda)-\mathbf{Y}_j(\lambda)\|>\epsilon_x/R_*$ |
| Root floor | $J_{\min}>\epsilon_J$ |
| Finite memory | $\eta_{ij}^{\alpha}\le h_{\mathrm{mem}}/R_*$ for every retained hit |
| Tangential closure | $\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i=0$ |
| Curvature closure | $\mathbf{Y}_i''-\Gamma P_i^\perp\widetilde{\mathbf{F}}_i=\mathbf{0}$ |
| Event/action | $Q$, $E$, $\mathbf{p}$, $\mathbf{J}$, provenance, and medium-update rows close |

Thus the retained residual vector becomes

$$
\mathcal{R}_{\mathrm{curve}}
=
\left(
\mathcal{R}_{T},
\mathcal{R}_{L},
\mathcal{R}_{\mathrm{center}},
\mathcal{R}_{\mathrm{support}},
\mathcal{R}_{\mathrm{root}},
\mathcal{R}_{\mathrm{tan}},
\mathcal{R}_{\mathrm{curv}},
\mathcal{R}_{\mathrm{event}},
\mathcal{R}_{\mathrm{action}}
\right).
$$

This is the arclength replacement for the earlier angle-clock residual vector.

---

## 6. Integral Form

The curvature equation can be integrated once into a tangent equation:

$$
\mathbf{T}_i'(\lambda)
=
\Gamma P_i^\perp(\lambda)
\widetilde{\mathbf{F}}_i(\lambda).
$$

Since $\|\mathbf{T}_i\|=1$, this is an evolution on the tangent sphere. The curve then follows from

$$
\mathbf{Y}_i'(\lambda)=\mathbf{T}_i(\lambda).
$$

A periodic branch requires

$$
\int_0^L \mathbf{T}_i(\lambda)\,d\lambda=\mathbf{0},
$$

and

$$
\mathbf{T}_i(L)=\mathbf{T}_i(0).
$$

This form is useful for numerical continuation because it separates:

1. the tangent-sphere dynamics;
2. the loop-closure conditions;
3. the delayed-root ledger.

---

## 7. No-Go Diagnostic For A Candidate Curve

For any proposed six-loop curve and active-root convention, define the best scalar curvature fit

$$
\Gamma_*
=
\frac{
\sum_{i,n}
\widetilde{\mathbf{F}}_{i,n}
\cdot
\mathbf{K}_{i,n}
}{
\sum_{i,n}
\|\mathbf{K}_{i,n}\|^2
}.
$$

The branch fails the intrinsic dynamics screen if either

$$
\max_{i,n}
|\mathbf{T}_{i,n}\cdot\widetilde{\mathbf{F}}_{i,n}|
>
\epsilon_{\mathrm{tan}},
$$

or

$$
\left[
\frac{1}{6K}
\sum_{i,n}
\left\|
\widetilde{\mathbf{F}}_{i,n}
-\Gamma_*\mathbf{K}_{i,n}
\right\|^2
\right]^{1/2}
>
\epsilon_{\mathrm{curv}}.
$$

The common-breathing arclength screen in [arclength-deformation-search-results.md](arclength-deformation-search-results.md) fails the second condition by order one. Therefore its improved tangential row is useful but not enough.

---

## 8. Search Consequence

The next high-value search should solve directly for loops $\mathbf{Y}_i$ rather than treating radius and phase as independent functions of an angle clock. A finite-mode version is

$$
\mathbf{Y}_i(\lambda)
=
\sum_{m=0}^{M}
\mathbf{a}_{i,m}\cos m\lambda
+
\mathbf{b}_{i,m}\sin m\lambda,
$$

with algebraic constraints enforcing approximate arclength:

$$
\|\mathbf{Y}'_i(\lambda_n)\|=1
$$

at collocation nodes. The objective should be

$$
\mathcal{J}_{\mathrm{curve}}
=
\|\mathcal{R}_{T}\|^2
+\|\mathcal{R}_{L}\|^2
+\|\mathcal{R}_{\mathrm{tan}}\|^2
+\|\mathcal{R}_{\mathrm{curv}}\|^2
+\mathcal{P}_{x}
+\mathcal{P}_{J}
+\mathcal{P}_{\mathrm{support}}.
$$

This formulation is stricter than the first deformation searches but better aligned with the actual dynamics. It also gives a clear no-go result: if no low-mode curve can make the delayed force field tangent-free and curvature-aligned while preserving the root floors, then the branch needs either a controlled self/fold-layer row, a medium-response term, or a different carrier topology.
