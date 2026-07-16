# Unit-Speed Chart And Reparameterization

Promotion status: `priority-only`. This packet separates a physical dynamics obstruction from a computational chart obstruction in the same-level braid intrinsic curve program. It builds on [arc-length-dynamics-reduction.md](arc-length-dynamics-reduction.md), [intrinsic-curve-dynamics-equation.md](intrinsic-curve-dynamics-equation.md), [intrinsic-curve-solver-protocol.md](intrinsic-curve-solver-protocol.md), and [equal-period-constraint-qualification.md](equal-period-constraint-qualification.md).

The main point is simple: for a regular closed curve, fixed carrier speed is obtained by arclength reparameterization. Therefore the construction-speed row $\mathcal{R}_T$ is not a force-balance residual in the same sense as $\mathcal{R}_{\mathrm{tan}}$ or $\mathcal{R}_{\mathrm{curv}}$. It is a chart row that appears when the solver insists that the computational Fourier phase is already proportional to arclength. If the branch uses the bounded speed factor from [variable-speed-factor-extension.md](variable-speed-factor-extension.md), this packet supplies the geometric arclength part only; the physical clock is then controlled by $\nu_i$.

No branch is retained.

---

## 1. Arbitrary Phase Versus Arclength Phase

Let a candidate site curve be represented in a computational phase

$$
\mathbf{Z}_i:\mathbb{R}/2\pi\mathbb{Z}\to\mathbb{R}^3,
$$

with

$$
S_i(\theta)
=
\left\|
\partial_{\theta}\mathbf{Z}_i(\theta)
\right\|.
$$

Assume the nondegeneracy floor

$$
S_i(\theta)\ge s_{\min}>0.
$$

Define arclength

$$
\lambda_i(\theta)
=
\int_0^\theta S_i(\zeta)\,d\zeta,
$$

and total length

$$
L_i=\lambda_i(2\pi).
$$

The inverse arclength phase

$$
\theta_i=\theta_i(\lambda)
$$

is well-defined on $\mathbb{R}/L_i\mathbb{Z}$ and satisfies

$$
\frac{d\theta_i}{d\lambda}
=
\frac{1}{S_i(\theta_i(\lambda))}.
$$

The arclength-parametrized curve is

$$
\mathbf{Y}_i(\lambda)
=
\mathbf{Z}_i(\theta_i(\lambda)).
$$

Then

$$
\left\|
\frac{d\mathbf{Y}_i}{d\lambda}
\right\|
=
1
$$

identically. Thus fixed speed is a consequence of the arclength clock, not a separate physical force equation.

For a bounded speed factor branch, keep the same geometric arclength curve but introduce the causal-time coordinate

$$
\chi_i(\lambda)
=
\int_0^\lambda
\frac{d\xi}{\nu_i(\xi)}.
$$

The common period row becomes

$$
H_i=\chi_i(L_i)=H_*,
$$

not merely $L_i=L_*$. In a computational phase $\theta$, this is

$$
\chi_i(\theta)
=
\int_0^\theta
\frac{S_i(\zeta)}{\nu_i(\zeta)}
d\zeta.
$$

---

## 2. Curvature And Force In The Arclength-Inverse Chart

The arclength tangent is

$$
\mathbf{T}_i(\lambda)
=
\frac{\partial_{\theta}\mathbf{Z}_i(\theta_i(\lambda))}
{S_i(\theta_i(\lambda))}.
$$

The curvature vector is

$$
\mathbf{K}_i(\lambda)
=
\frac{1}{S_i(\theta_i(\lambda))}
\frac{d}{d\theta}
\left.
\left(
\frac{\partial_{\theta}\mathbf{Z}_i(\theta)}
{S_i(\theta)}
\right)
\right|_{\theta=\theta_i(\lambda)}.
$$

Equivalently,

$$
\mathbf{K}_i
=
\frac{\partial_{\theta\theta}\mathbf{Z}_i}{S_i^2}
-
\frac{\partial_{\theta}\mathbf{Z}_i}
{S_i^4}
\left(
\partial_{\theta}\mathbf{Z}_i
\cdot
\partial_{\theta\theta}\mathbf{Z}_i
\right),
$$

evaluated at $\theta=\theta_i(\lambda)$.

If the equal-period row closes,

$$
L_i=L_*
\qquad
\text{for all }i,
$$

then the six sites share the same arclength period. The retained delayed root equation becomes

$$
G_{ij}(\lambda,\eta)
=
\left\|
\mathbf{Z}_i(\theta_i(\lambda))
-
\mathbf{Z}_j(\theta_j(\lambda-\eta))
\right\|
-
\eta
=0.
$$

The root Jacobian is

$$
J_{ij}^{\alpha}(\lambda)
=
1-
\mathbf{T}_j(\lambda-\eta_{ij}^{\alpha})
\cdot
\widehat{\mathbf{R}}_{ij}^{\alpha}(\lambda).
$$

The force and dynamics rows keep the same intrinsic form:

$$
\mathbf{T}_i(\lambda)\cdot
\widetilde{\mathbf{F}}_i(\lambda)
=0,
$$

and

$$
\mathbf{K}_i(\lambda)
=
\Gamma P_i^\perp(\lambda)
\widetilde{\mathbf{F}}_i(\lambda).
$$

The arclength-inverse chart therefore removes $\mathcal{R}_T$ as an independent residual, but it does not remove the root, tangential, curvature, period, support, event, or action rows.

---

## 3. Why The Finite Fourier Solver Still Sees $\mathcal{R}_T$

The solver protocol often writes a common computational phase

$$
\theta=\frac{2\pi\lambda}{L_*}
$$

and asks for

$$
\left\|
\partial_{\theta}\mathbf{Z}_i(\theta)
\right\|^2-\ell^2=0,
\qquad
\ell=\frac{L_*}{2\pi}.
$$

This is a stronger chart demand than arclength physics requires. It says that the chosen finite Fourier phase is already proportional to arclength. A generic deformed finite Fourier curve will not satisfy this. Forcing it to do so uses shape coefficients to repair parameter speed, which can steal degrees of freedom from the force and curvature closure.

This explains the current numerical pattern:

$$
\mathcal{R}_{\mathrm{tan}}
\quad
\text{and}
\quad
\mathcal{R}_{\mathrm{curv}}
$$

can descend in the exact-antipodal $M=2$ chart while the construction-speed spread stays open. That does not by itself prove a physical speed failure. It proves that the finite Fourier construction phase is not yet an arclength phase.

---

## 4. Reparameterization Lemma Target

**Lemma target: arclength reparameterization of a regular equal-period curve family.** Let $\mathbf{Z}_i(\theta;\alpha)$ be $C^2$ periodic curves with

$$
\left\|
\partial_{\theta}\mathbf{Z}_i(\theta;\alpha)
\right\|
\ge s_{\min}>0
$$

and equal lengths

$$
L_i(\alpha)=L_*.
$$

Then the inverse arclength maps $\theta_i(\lambda;\alpha)$ exist, are $C^1$ in $\lambda$, and depend $C^1$ on $\alpha$ inside any chart where $s_{\min}$ remains positive. In the arclength variables, the unit-speed row holds exactly:

$$
\left\|
\partial_{\lambda}
\mathbf{Z}_i(\theta_i(\lambda;\alpha);\alpha)
\right\|=1.
$$

If the active-root ledger is certified on the same chart by the root/Jacobian barrier lemma, then the root, force, tangent, and curvature residual maps are $C^1$ functions of $\alpha$ after arclength reparameterization.

### Proof Route

The derivative of $\lambda_i(\theta;\alpha)$ with respect to $\theta$ is $S_i(\theta;\alpha)$, which is bounded below by $s_{\min}$. The inverse function theorem gives the local inverse $\theta_i(\lambda;\alpha)$ and its $C^1$ dependence. Periodicity and equal length patch the local inverses into a global circle diffeomorphism. The formulas above give the unit tangent and curvature. The root/Jacobian barrier lemma supplies smooth delayed-root continuation, so the force residuals inherit $C^1$ dependence on the same chart.

---

## 5. Solver Implication

There are now two legitimate solver charts.

### 5.1 Constant-Speed Fourier Chart

Keep the protocol in [intrinsic-curve-solver-protocol.md](intrinsic-curve-solver-protocol.md):

$$
\mathbf{Z}_i(\theta)=\mathbf{Y}_i(\ell\theta),
\qquad
\left\|\partial_{\theta}\mathbf{Z}_i\right\|^2-\ell^2=0.
$$

Then $\mathcal{R}_T$ is a hard algebraic row and the restricted dynamics target from [equal-period-constraint-qualification.md](equal-period-constraint-qualification.md) is

$$
\mathcal{H}_{\mathrm{const}}
=
\left(
\mathcal{R}_T,
\mathcal{R}_{\mathrm{tan}},
\mathcal{R}_{\mathrm{curv}}
\right)
$$

on

$$
\ker D\mathbf{L}.
$$

This chart is clean but restrictive.

### 5.2 Arclength-Inverse Shape Chart

Represent the geometric shapes by finite Fourier curves $\mathbf{Z}_i(\theta)$, enforce only

$$
S_i(\theta)>0,
\qquad
L_i=L_*,
$$

and compute roots, tangents, and curvature through the inverse arclength maps $\theta_i(\lambda)$. Then the restricted dynamics target is

$$
\mathcal{H}_{\mathrm{arc}}
=
\left(
\mathcal{R}_{\mathrm{tan}},
\mathcal{R}_{\mathrm{curv}}
\right)
$$

on the equal-period manifold, with $\mathcal{R}_T$ replaced by the floor

$$
\min_{i,\theta}S_i(\theta)>0.
$$

This chart is closer to the physics of [arc-length-dynamics-reduction.md](arc-length-dynamics-reduction.md). It may also explain why the exact-antipodal $M=2$ solve can reduce force residuals while the construction-speed row stays open: the row is partly measuring a missing reparameterization degree of freedom.

---

## 6. Next Numerical Certificate

Before the full root/force recomputation, the current refined $M=2$ candidate already passes the first arclength-inverse admissibility check. Using the same length evaluator as [equal-period-projection-results.md](equal-period-projection-results.md), the refined candidate has:

| Binary | $L_a$ | $\ell_a=L_a/(2\pi)$ | $\min S_a$ | $\max S_a$ | Speed-spread RMS about $\ell_a$ |
| --- | ---: | ---: | ---: | ---: | ---: |
| $1$ | $9.1113549620$ | $1.4501171805$ | $0.9313038816$ | $1.7405929650$ | $0.2090243748$ |
| $2$ | $9.0630143825$ | $1.4424235383$ | $0.8792512950$ | $1.7780454349$ | $0.2269011832$ |
| $3$ | $9.1400781880$ | $1.4546886239$ | $0.6946494423$ | $1.8085570254$ | $0.2690955585$ |

After the minimum-norm equal-period projection from [equal-period-projection-results.md](equal-period-projection-results.md), the length row is nearly closed and the construction-speed floor remains positive:

| Binary | $L_a$ | $\ell_a=L_a/(2\pi)$ | $\min S_a$ | $\max S_a$ | Speed-spread RMS about $\ell_a$ |
| --- | ---: | ---: | ---: | ---: | ---: |
| $1$ | $9.1038061293$ | $1.4489157464$ | $0.9297898369$ | $1.7394871763$ | $0.2091815922$ |
| $2$ | $9.1038237403$ | $1.4489185493$ | $0.8865015227$ | $1.7844103673$ | $0.2264183545$ |
| $3$ | $9.1038319736$ | $1.4489198597$ | $0.6903536524$ | $1.8030278390$ | $0.2687957327$ |

Thus the global floor on the projected row is approximately

$$
\min_{a,\theta}S_a(\theta)\approx0.6903536524.
$$

This is strong enough for the arclength-inverse lemma as a numerical screen. It also shows why the construction-speed residual should not be overread: the speed variation is large enough that the computational phase is not arclength, but it is not a cusp or degeneracy.

The next solver packet should compare both charts on the same projected equal-period candidate:

| Diagnostic | Constant-speed Fourier chart | Arclength-inverse shape chart |
| --- | --- | --- |
| Period row | $\mathbf{L}(\alpha)=0$ | $\mathbf{L}(\alpha)=0$ |
| Speed row | $\mathcal{R}_T=0$ as an equation | replaced by $S_i>0$ and inverse arclength map |
| Root equation | $\mathbf{Z}_j(\theta-\eta/\ell)$ | $\mathbf{Z}_j(\theta_j(\lambda-\eta))$ |
| Curvature | $\partial_{\theta\theta}\mathbf{Z}_i/\ell^2$ if $\theta$ is arclength phase | arclength curvature formula using $S_i$ |
| Rank target | $D(\mathcal{R}_T,\mathcal{R}_{\mathrm{tan}},\mathcal{R}_{\mathrm{curv}})N_L$ | $D(\mathcal{R}_{\mathrm{tan}},\mathcal{R}_{\mathrm{curv}})N_L$ |
| Failure meaning | no zero in the restrictive constant-speed finite Fourier chart | no zero in the geometric curve chart |

If the arclength-inverse chart improves residual closure without harming root floors, then the next finite-mode solver should add explicit phase-diffeomorphism variables rather than spend vector Fourier coefficients enforcing constant computational speed.

Failure/status codes:

$$
\texttt{unit-speed-chart-artifact},
\qquad
\texttt{arclength-inverse-chart-needed},
\qquad
\texttt{force-residuals-still-open},
\qquad
\texttt{not-retained}.
$$
