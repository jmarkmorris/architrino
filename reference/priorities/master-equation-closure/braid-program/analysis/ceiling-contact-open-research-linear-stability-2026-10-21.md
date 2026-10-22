# Linear stability of the pursuit-limit spiral without symmetry assumptions (ceiling-contact open research, obligation 1 continued)

**The equation behind this record is the field-speed ceiling variant, not the Master Equation**, and the system treated is the *pursuit limit* of its approaching pair: two points at wake speed, each aimed exactly at the other's causal image, with no third member. It is the formal limit of the [contact study's](ceiling-contact-two-hour-2026-10-06.md#7-the-pursuit-limit-spiral-a-closed-form-comparison-and-its-formal-spectrum) Section 7. Nothing here adopts the variant or selects any rule.

On 2026-10-21 the operator asked for an attempt at the asymmetric proof with position information. The [asymmetric pursuit record](ceiling-contact-open-research-asymmetric-pursuit-2026-10-20.md) had shown why variables without positions cannot carry it. This record gives the linear part of that proof in position variables, in three dimensions and with no symmetry assumed, and names the nonlinear step that remains. Units $c_f=1$.

## 1. Result

**Theorem (derived, with an interval-certified root count).** Linearize the pursuit limit about the self-similar spiral, with no symmetry assumed: in-plane displacements relative to each member's position, and displacements normal to the plane relative to the spiral's size $s$, the time remaining to coincidence. Every solution of the linearized equations, for every continuous initial history over one delay, is the sum of two parts:
- a combination of the seven symmetry modes: rotation in the plane, two tilts of the plane, three translations, and a shift of the coincidence instant;
- a remainder that decays relative to the spiral at least as fast as $s^{1.359}$, that is, $\lVert q(u)\rVert\le K\,e^{-1.359(u-u_0)}\lVert\phi\rVert$ in logarithmic time $u=-\ln s$, for a constant $K$.

The rate $1.359$ is within $10^{-3}$ of the true slowest decay, the symmetric in-plane exponent $1.3599815$.

**What this means.** The symmetry modes are the linear images of the nearby exact spirals: rotated, tilted, translated, or meeting at a slightly different instant. So, to linear order, every small perturbation of the spiral converges to a nearby relabeled spiral, with the deviation from it shrinking at least as $s^{1.359}$. The delay ratio is the same on every relabeled spiral. Its linear perturbation therefore lies entirely in the remainder and decays at least as $s^{1.359}$: the linearized delay-ratio bound holds with convergence, without the mirror symmetry the [delay-ratio record](ceiling-contact-open-research-delay-ratio-bound-2026-10-11.md) assumed.

**What is new against the earlier records.**
- *A theorem, not a formal spectrum.* The study's formal spectrum listed roots and noted that no theorem followed from them. Here the linear system is identified as a retarded delay equation with one constant delay, to which a standard decomposition theorem applies.
- *Certified counts.* The root counts that the theorem needs are certified with interval arithmetic, where the study, this thread's brief and the Codex outside reading had floating-point counts.

**What is not established.** The nonlinear statement: that solutions of the pursuit limit itself near the spiral converge to a relabeled spiral. That needs a principle of linearized stability for delay equations whose delay depends on the state, here the causal delay, together with modulation of the seven symmetry parameters. Theorems of that kind exist for state-dependent delay equations, but their hypotheses, smoothness of the delay functional on the solution manifold and the treatment of a symmetry group, have not been checked for this system. Nor does anything here include the pointing error or the third member of the variant itself. The coincidence of release C1 therefore remains inferred.

## 2. The linearized equations as a retarded delay equation

**In the plane.** The study's linearization, re-derived by this thread and by the Codex outside reading, is

$$
\xi_0+\frac{s\,\xi_0'(s)}{1+ik}=\frac{i}{\lambda-1}\bigl[\operatorname{Im}W_0+\kappa\operatorname{Re}W_0\bigr],\qquad W_0=\frac{\xi_0(s)+\lambda^{1+ik}\xi_2(\lambda s)}{1+ik},
$$

and the same with the labels exchanged. Here $\xi_j$ is member $j$'s complex displacement relative to its spiral position, $k=2/\sqrt{\lambda-1}$ and $\kappa=\cot(\tfrac12k\ln\lambda)$. In log time $u=-\ln s$, $s\,d/ds=-d/du$ and $\xi_2(\lambda s)$ is $\xi_2$ at $u-\ln\lambda$, so

$$
\frac{d\xi_0}{du}=(1+ik)\Bigl[\xi_0(u)-\frac{i}{\lambda-1}\bigl(\operatorname{Im}W_0+\kappa\operatorname{Re}W_0\bigr)\Bigr],\qquad W_0=\frac{\xi_0(u)+\lambda^{1+ik}\xi_2(u-L)}{1+ik},\quad L=\ln\lambda
$$

Written in the real and imaginary parts of $\xi_0$ and $\xi_2$, this is $x'(u)=A\,x(u)+B\,x(u-L)$ with constant real $4\times4$ matrices: an autonomous linear retarded functional differential equation with one constant delay.

**Out of the plane.** For normal displacements $\zeta_j$ the first-order equation is $\zeta_2(\lambda s)-\zeta_0(s)+(\lambda-1)s\,\zeta_0'(s)=0$. In log time this is $d\zeta_0/du=-(\zeta_0(u)-\zeta_2(u-L))/(\lambda-1)$, and likewise for $\zeta_2$: again retarded, in two real dimensions. In-plane and normal displacements decouple at first order, because a normal displacement changes the causal distance only at second order.

**Characteristic equations.** Exponential solutions $x\propto e^{\rho u}$ exist exactly when $\det(\rho I-A-Be^{-\rho L})=0$. With $\mu=-\rho$, which makes the perturbation proportional to $s^{\mu}$, this determinant equals $Q_+(\mu)\,Q_-(\mu)/(\lambda-1)^2$ in the plane, where

$$
Q_\eta(\mu)=(\lambda-1)\mu^2+(2\lambda-3)\mu+\lambda+\eta\,\lambda^{\mu+1}(\mu-1),\qquad \eta=\pm1,
$$

is the form found by the Codex reading, equal to $(\lambda-1)D_\eta(\mu)$. Out of the plane the equation is $O_\eta(\nu)=\eta\lambda^{\nu}-1+(\lambda-1)\nu=0$, with the absolute displacement proportional to $s^{\nu}$. The in-plane identity was checked numerically, as a cross-check rather than part of the proof: the ratio of the two sides at six random points is the constant $1/(\lambda-1)^2=0.625396$, to better than $10^{-8}$ relative.

**Decomposition theorem used.** For an autonomous linear retarded equation $x'(u)=Ax(u)+Bx(u-L)$ on the space of continuous histories over $[-L,0]$, the following holds; see Hale and Verduyn Lunel, *Introduction to Functional Differential Equations* (Springer, 1993), Chapter 7. For any real $\beta$, only finitely many characteristic roots have real part at least $\beta$. The space of histories splits into the finite-dimensional span $P$ of their generalized eigenfunctions and a complementary invariant subspace $Q$. If no root has real part equal to $\beta$, the solution with any history in $Q$ is bounded by $Ke^{\beta(u-u_0)}$ times the history's norm. Apply it with $\beta=-1.359$ in the plane and $\beta=-2.40$ out of the plane: below these lines, Section 3 certifies that the only roots are the symmetry roots, all simple. The normal displacement relative to the spiral's size is $\zeta/s=\zeta\,e^{u}$, so its remainder decays relative to the spiral at rate $2.40-1=1.40$. The combined relative rate is the smaller, $1.359$.

The seven symmetry roots and their modes:

| Symmetry | Root | Sector |
| --- | --- | --- |
| rotation in the plane | $\mu=0$ | in plane, $\eta=+1$ |
| shift of the coincidence instant | $\mu=-1$ | in plane, $\eta=+1$ |
| translation in the plane (two) | $\mu=-1\pm ik$ | in plane, $\eta=-1$ |
| translation along the normal | $\nu=0$ | out of plane, $\eta=+1$ |
| tilt of the plane (two) | $\nu=1\pm ik$ | out of plane, $\eta=-1$ |

Each is an exact root, verified here by an interval evaluation enclosing zero. Each is simple, because each certified count below equals the number of distinct symmetry roots in its region.

## 3. Interval-certified root counts

**Exclusion bounds (derived by the Codex reading; checked here).** A zero of $Q_\eta$ with $\operatorname{Re}\mu\le a$ satisfies $\lvert\mu\rvert\le R(a)$, where $R(a)$ is the positive root of $(\lambda-1)R^2=(\lvert2\lambda-3\rvert+\lambda^{a+1})R+\lambda+\lambda^{a+1}$. This follows from $\lvert\lambda^{\mu+1}\rvert=\lambda^{\operatorname{Re}\mu+1}$ and $\lvert\mu-1\rvert\le\lvert\mu\rvert+1$. Likewise a zero of $O_\eta$ with $\operatorname{Re}\nu\le b$ satisfies $\lvert\nu\rvert\le(1+\lambda^b)/(\lambda-1)$. So each half-plane's zeros lie in a known rectangle. The count in that rectangle is the winding number of the function along its boundary.

**Method (`ccor_linear_theorem.py`, mpmath interval arithmetic at 120 bits).** The spiral constant is enclosed first. The root $u^\ast$ of $u\operatorname{arccot}u=\ln(1+u^2)$ is enclosed in an interval of width $2\times10^{-30}$ by a certified sign change; Part A of the [spiral brief](ceiling-contact-open-research-spiral-root-and-spectrum-brief-2026-10-11.md) proves the root unique. Every constant thereafter is an interval: $\lambda=1+u^{\ast2}$ is enclosed to width $4.5\times10^{-30}$. The rectangle's boundary is cut into segments. On each segment the function's real and imaginary parts are enclosed with interval arithmetic. The enclosure must exclude zero and lie in an open half-plane through the origin; then the argument change along the segment is less than $\pi$ in magnitude and equals the principal argument of the ratio of the end values, itself computed as an interval. Segments that fail are bisected. The total, divided by $2\pi$, must lie strictly within $\tfrac12$ of an integer. The rectangle extends $0.2$ beyond each bound $R$ on the left, top and bottom. That margin is far larger than the floating-point evaluation of $R$, which is the one quantity not carried as an interval.

**Known cases, asserted before the target.** The counter returned the known answers:
- $(z+2)^2\bigl((z-0.2)^2+0.49\bigr)(z-4)$: 4 zeros in $[-3,1]\times[-2,2]$ and 2 in $[-1,1]\times[-2,2]$;
- $e^z-1$: 3 zeros in $[-1,1]\times[-7,7]$ and 1 in $[-1,1]\times[-5,5]$.

All seven symmetry roots were also confirmed as exact zeros.

**Target counts.**

| Function | Region | Certified count | Symmetry roots in the region | Segments |
| --- | --- | --- | --- | --- |
| $Q_+$ | $\operatorname{Re}\mu\le1.359$, rectangle to $\lvert\mu\rvert\le7.80$ | $2$ | $\mu=-1,\,0$ | 308 |
| $Q_-$ | $\operatorname{Re}\mu\le1.359$ | $2$ | $\mu=-1\pm ik$ | 256 |
| $O_+$ | $\operatorname{Re}\nu\le2.40$, rectangle to $\lvert\nu\rvert\le6.61$ | $1$ | $\nu=0$ | 272 |
| $O_-$ | $\operatorname{Re}\nu\le2.40$ | $2$ | $\nu=1\pm ik$ | 256 |

Every winding number is certified to be the integer shown. So no non-symmetry root has $\operatorname{Re}\mu\le1.359$ in the plane or $\operatorname{Re}\nu\le2.40$ out of it. The next roots, from the floating-point searches of this thread and of the Codex reading, are $\mu=1.3599815\pm4.8722817\,i$ and $\nu=2.4049287\pm5.4106922\,i$. Both lie just beyond the certified lines, which are as close to them as the theorem needs.

**Numerical cross-check (not part of the proof).** The real delay equation of Section 2 was integrated from a random continuous history: fourth-order Runge–Kutta with step $\ln\lambda/400$ and delayed values interpolated linearly. The symmetry modes, computed as null vectors of the characteristic matrix at the four in-plane symmetry roots, were removed by least squares over each delay window. The remainder fell from $2.7\times10^{-3}$ to $8.4\times10^{-8}$ by $u=7.4$, at a fitted rate of $1.40$ per unit of log time. That is above the certified $1.359$, as expected when faster modes are also excited. Beyond $u\approx7$ the symmetry modes, which grow as $e^{u}$, amplify the integration error above the remainder, so the fit stops there. The first form of this check used hand-written symmetry modes and reported a decay rate of $0.39$. The defect was in those modes, not in the equation: the characteristic identity held throughout. They were replaced by computed null vectors.

## 4. What remains for a proof of the nonlinear statement and for C1

1. **Nonlinear, in the pursuit limit.** Show that the pursuit limit near the spiral converges to a relabeled spiral. This requires the principle of linearized stability for a state-dependent delay equation, transformed to log time and to coordinates scaled by the spiral. It also requires handling of the seven-dimensional family of relabeled spirals, which is invariant but whose time-shift and translation directions grow in the scaled frame. The linear theorem above supplies the spectral input, certified. The functional-analytic hypotheses are what must be checked.
2. **The variant itself.** Add the pointing error, of relative size $2\tau$, and the third member's row, as perturbations that decay in log time. They then enter a nonlinear argument of the kind in item 1 as decaying forcing.

## 5. Claim grades and falsifiers

| Claim | Grade | Falsifier, and where to look |
| --- | --- | --- |
| The linearized pursuit limit is an autonomous linear retarded delay equation with constant delay $\ln\lambda$, with characteristic functions $Q_\pm$, $O_\pm$ | Derived; the in-plane determinant identity checked numerically | An error in the log-time transformation; a mismatch of the determinant identity |
| No non-symmetry root with $\operatorname{Re}\mu\le1.359$ (plane) or $\operatorname{Re}\nu\le2.40$ (normal) | Derived: interval-certified winding numbers with analytic exclusion bounds | A zero found inside the certified regions; an error in the exclusion bound; a defect in the counter, which passed four known cases |
| Linear stability modulo symmetries, with relative rate $1.359$ | Derived from the two rows above and the decomposition theorem for linear retarded equations | A linear solution whose remainder after removing symmetry modes decays more slowly; `ccor-linear-theorem.json` holds one numerical example |
| Nonlinear convergence to a relabeled spiral | Not established; measured in two-pursuer simulations (asymmetric record) and inferred | A pursuit-limit history near the spiral that does not converge |

## 6. Validation, files and review status

Command, from `.local-data/master-equation-closure/ceiling-contact-open-research-20261011/`, under the shared venv `../.venv/bin/python` relative to the repository root (numpy and mpmath):

```
python ccor_linear_theorem.py
```

The run takes under one second. Receipt `ccor-linear-theorem.json`, log `ccor-linear-theorem.log`. Review status: self-review only. The theorem rests on a published decomposition theorem, cited and not re-proved, and on counts certified by an instrument written in this thread. An outside reading of the certificate, and of the identification of the linearization as a retarded equation, would be the useful next check.
