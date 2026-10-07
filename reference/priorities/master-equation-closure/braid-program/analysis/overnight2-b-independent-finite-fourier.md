# Independent finite-Fourier slow-family obstruction review

## Verdict and assumptions

**Derived and independently accepted, without a mathematical repair.** The [frozen finite-Fourier theorem](overnight2-b-finite-fourier-obstruction.md) correctly excludes exact canonical six-member slow histories uniformly for sufficiently small positive $\epsilon$, at every $R>0$, under the stated common profile/radius/rate bounds and fixed finite maximal degrees for both radius and periodic phase correction. No finite-degree hypothesis on height is needed. The threshold is existential and has no numerical value established here.

The proof uses the [accepted compact exact-family reduction and derivative-convergence upgrade](overnight2-b-independent-compact-slow-scale.md), the normalized simultaneous limiting equation, and its independently reconstructed necessary torque mean. The canonical scenario has $K=c_f=1$, complete ordinary causal-delay root inclusion and no selected response multiplier. The conclusion concerns the common slow scaling, not arbitrary finite-speed trajectories. The frozen subject SHA-256 measured by native `shasum -a 256` is `83f7db0a8ab61b6395d7c47df277b80128428bd8b8e5718cbca58524a64feab1`.

More precisely, fix positive radius and rate floors, finite amplitude/derivative bounds, and finite nonnegative integer degree limits $M_\rho,M_p$. Let all three profiles be real $2\pi$-periodic $C^2$ functions satisfying the common bounds, with $\rho\ge r_->0$ and $b,k$ in fixed compact subsets of $(0,\infty)$. Require the actual radius and phase profiles, not merely numerical approximations to them, to have degrees at most $M_\rho,M_p$. Coefficients and height profiles may vary arbitrarily with $\epsilon$ within these hypotheses. A constant additive phase is harmless and $p'=0$ below means a constant correction, not necessarily a zero correction.

## Compact limit and closure of the Fourier constraint

If no uniform positive exclusion threshold existed, there would be exact members with $0<\epsilon_n<1/n$ and arbitrary $R_n>0$. The compact exact-family theorem gives a subsequence such that
$$
\lambda_n=R_n\epsilon_n^2\to\lambda\in(0,\infty),\qquad b_n\to b>0,\qquad k_n\to k>0.
$$
The common $C^2$ bounds give a $C^1$ subsequence by Arzela–Ascoli. Uniform ordinary-root acceleration convergence and the exact acceleration equation solve for all second derivatives with denominators bounded away from zero, upgrading this subsequence to $C^2$ convergence. This is an exact-balance consequence, not an assertion that arbitrary bounded $C^2$ sets are compact in $C^2$.

For completeness, finite-degree closure can be checked without any Fourier-series completeness assumption. Write
$$
\rho_n(\phi)=\sum_{j=-M_\rho}^{M_\rho}c_{n,j}e^{ij\phi},\qquad
c_{n,j}=\frac1{2\pi}\int_0^{2\pi}\rho_n(\phi)e^{-ij\phi}\,d\phi.
$$
Uniform convergence gives $c_{n,j}\to c_j$ for each of the finitely many indices. Passing to the limit in the finite sum proves $\rho=\sum c_je^{ij\phi}$. The same proof applies to $p$. Degree can drop, but cannot exceed the declared fixed limits. Reality gives $c_{-j}=\overline{c_j}$. The positive radius floor passes to the limit.

The limiting tangential equation gives the constant angular quantity
$$
\ell=\sqrt\lambda\,\rho^2\omega,\qquad \omega=b+kp'.
$$
Averaging $\omega=\ell/(\sqrt\lambda\rho^2)$ and using real periodicity of $p$ gives
$$
\ell=\frac{\sqrt\lambda b}{\langle\rho^{-2}\rangle}>0,\qquad
\rho^2\omega=\frac\ell{\sqrt\lambda}>0.
$$
The limiting orbit is regular and radial/axial periodic. The separately established first-order expansion and exact period identity additionally require its leading torque mean to vanish; the zeroth-order limiting equation alone would not supply that requirement.

## Highest-frequency argument

Suppose $\rho$ is nonconstant. Since it is real, its actual highest positive Fourier index $m$ is at least one and has coefficient $c_m\ne0$. In the finite Laurent product $\rho^2$, the only index pair adding to $2m$ is $(m,m)$, so its coefficient there is $c_m^2\ne0$. This remains nonzero for complex Fourier coefficients because the coefficient field has no zero divisors; no sign or positivity of $c_m$ is needed.

The real trigonometric polynomial $\omega=b+kp'$ has mean $b>0$, so it is not identically zero. If its actual degree is $n\ge1$, let $d_n\ne0$ be its highest positive coefficient. In $\rho^2\omega$, an index from $\rho^2$ is at most $2m$ and an index from $\omega$ at most $n$. Equality of their sum to $2m+n$ requires both maximal indices. Thus that coefficient is exactly $c_m^2d_n\ne0$. If instead $\omega$ has degree zero, its value is its mean $b$, and the coefficient of index $2m$ is $bc_m^2\ne0$.

Either case contradicts the identity that $\rho^2\omega$ is a constant. Reality is consequential: it prevents a nonconstant radius from having only negative frequencies, so no Laurent-monomial exception occurs. Therefore $\rho=r_0>0$ is constant. The constant product then makes $\omega$ constant, its mean identifies it as $b$, and $k>0$ gives $p'=0$.

This calculation is an exact finite-product identity. Aliasing, truncation after multiplication, a sampled angular equation, or a residual near numerical precision cannot replace it. It also covers limiting degree loss because it uses actual nonzero highest coefficients only after taking the limit.

## Constant radius, planar limit and torque contradiction

The normalized radial equation at constant radius is
$$
0=\frac{\ell^2}{r_0^3}+\frac{a_r(h)}{r_0^2},\qquad h=z/r_0,
$$
$$
a_r(h)=\frac1{\sqrt3}-\frac1{(1+4h^2)^{3/2}}-\frac1{4(1+h^2)^{3/2}}.
$$
Thus $a_r(h)=-\ell^2/r_0$ is constant in time. Differentiating as a function of $x=h^2\ge0$ yields
$$
\frac{d a_r}{dx}=6(1+4x)^{-5/2}+\frac38(1+x)^{-5/2}>0.
$$
The derivative signs and factors follow from differentiating the two negative reciprocal powers. Strict monotonicity makes $h^2$ constant. If that constant is positive, continuity on the connected time domain fixes the sign of $h$; if it is zero, $h$ is identically zero. Since $r_0$ is constant, $z$ is constant in either case.

The normalized axial equation is
$$
\ddot z=-z\left[\frac4{(r_0^2+4z^2)^{3/2}}+\frac1{4(r_0^2+z^2)^{3/2}}\right].
$$
Its bracket is positive for $r_0>0$, so constant $z$ must equal zero. The radial equation then gives $\ell^2=c_0r_0$, $c_0=5/4-1/\sqrt3>0$. This is a planar circular solution of the simultaneous limiting equation, which by itself is not a solution of the causal-delay equation.

The necessary torque condition inherited from an exact slow sequence is
$$
M_\chi=\ell\left\langle\frac{C(z/r)}{r^2}\right\rangle_\chi=0.
$$
Direct evaluation of the previously reconstructed coefficient gives
$$
C(0)=2-\frac23+\frac14=\frac{19}{12}.
$$
At the only possible limit, therefore,
$$
M_\chi=\frac{19\ell}{12r_0^2}>0,
$$
contradicting the necessary zero. No stability calculation, height Fourier constraint or assumption of nonplanarity was needed. In some specific boxes the limiting zero height also conflicts with their height restrictions, but the torque contradiction proves the broader stated theorem even when planar heights are allowed.

The hypothesized sequence cannot exist. By the initial sequential contradiction, there is a single $\epsilon_0>0$ for the whole class defined by the fixed common bounds and degree limits, such that every member with $0<\epsilon<\epsilon_0$ fails exact canonical balance for every $R>0$. The compact scale bounds are derived from exactness, so the argument does not overlook sequences with unbounded $R$. It supplies neither a computable threshold here nor an exclusion at a specified finite speed above that unknown threshold.

## Application to the declared proposal classes

The profile and rate definitions in the [receiving research account](overnight2-b-followup-and-research-2026-10-07.md), in its first chart, wider speed-budget family and additional-harmonic family, support the claimed applications under simultaneous slow scaling of both physical rates. These are applications of the declared function classes, not acceptance of numerical search outcomes.

| Declared class | Radius and phase degree limits | Simple positive radius floor |
| --- | --- | --- |
| Original second-harmonic box | $2,2$ | $1-2(0.06)=0.88$ |
| Wider second-harmonic box | $2,2$ | $1-2(0.25)=0.5$ |
| Second-/fourth-harmonic box | $4,4$ | $1-4(0.15)=0.4$ |

These deliberately coarse radius floors suffice; no independently unreviewed sharp chart estimate is needed. Finite bounded coefficients give common $C^2$ bounds for all profiles. The height functions in these classes also have finite degree, but that extra fact is unnecessary.

For the original box, base rotation and deformation rates already lie in positive compact intervals. For the wider box, the mapped unscaled rates are $b_0=u/r_+$ and $k_0=v/S$, where
$$
S=\sqrt{(2A_r)^2+(2r_+A_p)^2+(H+3A_z)^2}.
$$
The compact coordinate box has $u\ge0.03$, $v\ge0.05$, $H\ge0.2$, and all smoothed amplitude expressions are positive continuous bounded functions. Thus $r_+$ and $S$ have finite upper bounds and positive lower bounds; $S\ge H\ge0.2$. The images $b_0,k_0$ lie in compact subsets of $(0,\infty)$ even though they depend on the coefficients. The same reasoning applies to the higher-harmonic map $S=\sqrt{R_1^2+(r_+P_1)^2+Z_1^2}$, since $Z_1\ge H\ge0.35$. Scaling to actual rates $\epsilon b_0,\epsilon k_0$ therefore fits the theorem in each case.

These observations establish the uniform asymptotic exclusion for all three declared classes, including rate ratios outside the earlier angular-zero-count corollary. They do not place any retained finite-speed numerical proposal below the unknown threshold. The finite-speed charts and failed searches remain separate evidence with their original qualifications.

## Required phase for nonconstant radius and infinite tails

The limiting angular relation can instead be solved without a finite-degree phase restriction. Its constant is $b/\langle\rho^{-2}\rangle$, so
$$
p'=\frac bk\left(\frac{\rho^{-2}}{\langle\rho^{-2}\rangle}-1\right).
$$
The expression is real and has zero phase mean. Integrating from a fixed phase defines a real periodic phase correction up to an additive constant. For a positive $C^2$ radius, its reciprocal square is $C^2$, so this integration has more than the regularity needed here. If the radius is a nonconstant positive trigonometric polynomial and $b,k>0$, this derivative cannot itself be a finite trigonometric polynomial: otherwise the exact constant-product argument would give a contradiction. Finite degree for $p$ and for $p'$ are equivalent apart from an arbitrary constant.

This formula is a necessary angular representation. It does not establish radial/axial balance, either necessary causal-delay mean, exact finite-speed continuation or stability. Nor does the theorem exclude all infinite-tail representations: an approximation by a finite polynomial plus a rigorously controlled nonzero tail is not an exact finite-degree profile. However, tails are not an automatic escape from the compact-limit argument. If an exact compact sequence has tails that tend to zero so that both limiting radius and phase are finite trigonometric polynomials, the same limiting contradiction applies. A general exclusion of fixed or nonvanishing infinite tails is not established here.

## Falsifiers, validation and preservation

Operator-checkable falsifiers are failure of uniform compact-family extraction or its exact-balance convergence upgrade; a positive real finite-degree radius and finite-degree phase whose product $\rho^2(b+kp')$ is a positive constant despite nonconstant radius; a missing highest-frequency contribution or an additional contribution cancelling it; a nonconstant continuous height with constant square; an axial constant solution with nonzero height at positive radius; or zero leading torque for the displayed planar limit. The equations above expose the derivative signs, coefficient products and mean needed to check each step.

An exact sequence satisfying all fixed-degree, common-bound and positive-rate hypotheses with $\epsilon\to0$ would falsify the final theorem. A single finite-speed solution, increasing degrees, loss of common radius/derivative bounds, vanishing mean rotation, nonperiodic phase correction or general infinite-tail profiles does not satisfy the same assertion. The theorem proves exclusion within its quantified class; it neither asserts global theory closure nor replaces complete causal-delay balance checks for other classes.

The evidence is the analytical derivation in this new report. No numerical target, arithmetic companion or runtime receipt was needed; no new known-first sequence or empirical resource claim is made. This report is the sole reviewer-authored deliverable. The subject, prior independent reports and receipts, parent account, numerical instruments and shared owners were not edited. No production run, regular tests, recursive agents, generator or Git mutation was used. No evidence was deleted, moved or replaced, and no remote-backup or replay claim is made. Parent integration remains the receiving disposition step.

Final scoped verification: native `shasum -a 256` reproduced the frozen subject identity after this review. Native `git diff --no-index --check /dev/null` emitted no whitespace diagnostic for the new report; exit one denotes its new-file difference. The highest-frequency, radial monotonicity, torque and compactness arguments were independently reconstructed as displayed. Read-only inspection of the three proposal definitions in the receiving account established the degree and uniform-bound applications above; no numerical output was promoted into evidence for the theorem.
