# A root birth at small delay drives its receiver to wake speed

## Result

When an architrino above wake speed passes close to one below wake speed, a new pair of causal roots reaches the slower one a short time later. This note derives what that pair does. The two newborn rows are unbounded at the instant of birth, their sum over time is finite, and at leading order they obey a closed two-variable system with an exact first integral. The slower architrino reaches wake speed after the time

$$
t_*=\frac{\tau_b^{4}\,\kappa\,(y_*-y_0)^2\,(y_*+2y_0)}{24},
$$

where $\tau_b$ is the delay of the newborn roots, $\kappa$ is the curvature of the root function at the birth, $y_0=1-\mathbf n\cdot\mathbf v$ is fixed by the receiver's velocity at the birth, and $y_*$ is fixed by its speed and the polarities. The description is self-consistent when $\tau_b\ll1$ and $\kappa\tau_b^3\ll1$ in units of $K/c_f^2$, and when $\kappa$ changes little along the source path over the emission-time spread $Q\tau_b^2/4$ of the newborn pair, where $Q=\lvert y_*^2-y_0^2\rvert\le4$. On a straight source path $\kappa\tau_b^3=(V^2-1)\tau_b^2=b^2V^2$, where $b$ is the passing distance and $V$ the source's speed, so a fast source needs $bV\ll1$ and not only $b\ll1$. **Grade: derived at leading order**; the error terms are estimated and not bounded. A delegated [independent adjudication](root-birth-impulse-law-independent-adjudication-2026-10-06.md) in the same session derived the law blind before reading this note, confirmed every formula, tested it with its own integrator on prescribed source paths for both polarity products, and accepted the note with nine corrections, all applied here. The most important one is the second condition above: the first version of this note claimed validity for every source speed, and the adjudicator's test at $V=100$ refuted that.

Three consequences follow.

- **A birth at small delay ends the receiver's regular motion (derived at leading order, conditional on Theorem U).** The receiver arrives at wake speed from below, at a positive rate, with every row finite at the arrival. Those are the hypotheses of [Theorem U](curved-path-wake-speed-obstructions.md), which then excludes every continuation with continuous velocity and ordinary roots.
- **The newborn delay is set by the distance of the passage.** For a source on a straight path at speed $V>1$ passing a receiver at distance $b$, $\tau_b=bV/\sqrt{V^2-1}$. A passage with $bV\ll1$ and $bV/\sqrt{V^2-1}\ll1$ is therefore enough. Smallness of $b$ alone is not: the rows of the whole passage, summed over time on a receiver held in place, give exactly $2/(Vb)$, and in a prescribed-source test an opposite-polarity receiver at rest did not reach wake speed for $Vb$ of $1.5$ and above. For a fast source the newborn delay is close to the passing distance.
- **The time is short.** On a straight source path $t_*$ is of order $\tau_b^3(V^2-1)$, which is far shorter than the delay itself exactly when $(V^2-1)\tau_b^2\ll1$, the same condition as above.

**Measured.** In eight resolved releases of five different balances the interval between the birth and the arrival at wake speed agrees with $t_*$ to between $0.6$ and $1.8$ percent on the seven births with $\tau_b\le0.012$, and to 20 percent on one with $\tau_b=0.20$, where the law is not expected to hold closely. A delegated blind reproduction of one run, made before this formula was written and without knowledge of it, measured the interval as $2.90438\times10^{-6}$ time units at four resolutions; the formula gives $2.902\times10^{-6}$.

Units: $K=c_f=1$ throughout, so that lengths and times are in units of $K/c_f^2$ and $K/c_f^3$. Every statement concerns the unchanged Master Equation.

## Setting

A receiver with position $\mathbf x(t)$, velocity $\mathbf v(t)$ and polarity $s_i$ receives from a source path $\mathbf X(s)$ with velocity $\mathbf V$, acceleration $\mathbf A$ and polarity $s_j$. Put

$$
g(\tau,t)=\tau-\lvert\mathbf x(t)-\mathbf X(t-\tau)\rvert,\qquad \mathbf n=\frac{\mathbf x(t)-\mathbf X(t-\tau)}{\lvert\mathbf x(t)-\mathbf X(t-\tau)\rvert}.
$$

The causal roots are the positive zeros of $g$ in $\tau$. Each contributes the row $s_is_j\,\mathbf n/(\tau^2\lvert D\rvert)$ to the receiver's acceleration, with transmitter factor $D=1-\mathbf n\cdot\mathbf V$. Three derivatives are needed:

$$
\frac{\partial g}{\partial\tau}=1-\mathbf n\cdot\mathbf V=D,\qquad
\frac{\partial g}{\partial t}=1-D-\mathbf n\cdot\mathbf v,\qquad
\frac{\partial^2 g}{\partial\tau^2}=\mathbf n\cdot\mathbf A-\frac{\lvert\mathbf V\rvert^2-(\mathbf n\cdot\mathbf V)^2}{\lvert\mathbf x-\mathbf X\rvert}.
$$

The first follows from $\partial\mathbf X(t-\tau)/\partial\tau=-\mathbf V$. The second follows from $\partial(\mathbf x-\mathbf X)/\partial t=\mathbf v-\mathbf V$ at fixed $\tau$. For the third, $\partial\mathbf n/\partial\tau=(\mathbf V-\mathbf n(\mathbf n\cdot\mathbf V))/\lvert\mathbf x-\mathbf X\rvert$ and $\partial\mathbf V(t-\tau)/\partial\tau=-\mathbf A$.

**A birth** is a point $(\tau_b,t_b)$ with $\tau_b>0$, $g=0$ and $D=0$. There $\mathbf n\cdot\mathbf V=1$, which requires a source above wake speed, and

$$
\frac{\partial g}{\partial t}=1-\mathbf n\cdot\mathbf v=:y_0,\qquad
\frac{\partial^2 g}{\partial\tau^2}=\mathbf n\cdot\mathbf A-\frac{\lvert\mathbf V\rvert^2-1}{\tau_b}=:-\kappa .
$$

A receiver below wake speed has $y_0>0$. Assume $\kappa>0$, which holds whenever the source's acceleration along $\mathbf n$ is less than $(\lvert\mathbf V\rvert^2-1)/\tau_b$, and in particular at small delay for bounded source acceleration. Then $g$ has a local maximum in $\tau$ whose value rises through zero as $t$ increases, and two roots exist after $t_b$ and none nearby before it. With $\kappa<0$ the same point is a merger of two roots; the last section returns to it.

## The local system

Let $G(t)$ be the value of $g$ at its local maximum in $\tau$. Because $\partial g/\partial\tau=0$ there,

$$
\frac{dG}{dt}=\frac{\partial g}{\partial t}\Big|_{\max}=1-\mathbf n\cdot\mathbf v(t)=:y(t),
$$

which is exact when $\mathbf n$ is taken at the maximizing delay. Near the maximum $g\approx G-\tfrac12\kappa(\tau-\tau_m)^2$, so the two newborn roots sit at $\tau_m\pm\sqrt{2G/\kappa}$ and each has

$$
\lvert D\rvert=\kappa\,\lvert\tau-\tau_m\rvert=\sqrt{2\kappa G}.
$$

Both rows point along the same $\mathbf n$ to leading order and both carry $\lvert D\rvert$ in the denominator, so they add:

$$
\mathbf x''\approx s_is_j\,\mathbf n\,\frac{2}{\tau_b^2\sqrt{2\kappa G}}.
$$

Write $\sigma=s_is_j$ and $c=\sqrt2/(\tau_b^2\sqrt\kappa)$. The component of the receiver's velocity across $\mathbf n$, of magnitude $v_\perp$, does not change at this order, and $y=1-\mathbf n\cdot\mathbf v$ obeys

$$
\frac{dy}{dt}=-\frac{\sigma c}{\sqrt G},\qquad \frac{dG}{dt}=y,\qquad G(t_b)=0,\quad y(t_b)=y_0 .
$$

Dividing the two equations gives $y\,dy=-\sigma c\,G^{-1/2}dG$, and so the **first integral**

$$
y^2=y_0^2-4\sigma c\sqrt G .
$$

The acceleration grows like $(t-t_b)^{-1/2}$ at the birth and its integral is finite: the velocity is continuous through the birth, with a square-root cusp.

## Time to wake speed

The receiver's speed is $\sqrt{(1-y)^2+v_\perp^2}$. It equals one at

$$
y_*=1+\sqrt{1-v_\perp^2}\ \ (\sigma=-1),\qquad y_*=1-\sqrt{1-v_\perp^2}\ \ (\sigma=+1).
$$

For opposite polarities $y$ increases without bound along the first integral, so $y_*$ is reached. For like polarities $y$ decreases from $y_0$ toward zero, and $y_*$ lies between, because a receiver below wake speed has $1-y_0<\sqrt{1-v_\perp^2}$. In both cases $y_*$ is reached at a finite $G_*$ with $\sqrt{G_*}=\lvert y_*^2-y_0^2\rvert/(4c)$.

The time follows from $dt=dG/y$ and $\sqrt G=\lvert y^2-y_0^2\rvert/(4c)$, which give $dt=\lvert y^2-y_0^2\rvert\,dy/(4c^2)$ up to the sign of $dy$. Integrating from $y_0$ to $y_*$,

$$
t_*=\frac{(y_*-y_0)^2(y_*+2y_0)}{12c^2}=\frac{\tau_b^4\,\kappa\,(y_*-y_0)^2(y_*+2y_0)}{24},
$$

the same expression for both signs of $\sigma$.

**State at the arrival.** With $Q=\lvert y_*^2-y_0^2\rvert\le4$:

| Quantity at the arrival | Leading-order value |
| --- | --- |
| Displacement of each newborn root from the birth delay | $Q\tau_b^2/4$ |
| Transmitter factor of each newborn row | $\lvert D_*\rvert=\kappa Q\tau_b^2/4$ |
| Sum of the two newborn rows | $8/(\kappa Q\tau_b^4)$ |
| Rate of change of the receiver's speed | $\sqrt{1-v_\perp^2}\;8/(\kappa Q\tau_b^4)$ |

**Self-consistency.** The quadratic form of $g$ requires the roots to move by much less than the delay over which $\partial^2g/\partial\tau^2$ changes, and holding $\mathbf n$ and $\tau_b$ fixed requires $t_*\ll\tau_b$. On a straight source path $\partial^3g/\partial\tau^3=3\kappa/\tau_b$ and $\partial^4g/\partial\tau^4=3\kappa(V^2-5)/\tau_b^2$ at the birth, so the first requirement is $Q\tau_b/4\ll1$ together with $V^2(Q\tau_b/4)^2\ll1$, and the second is $\kappa\tau_b^3\ll1$ with $\kappa\tau_b^3=(V^2-1)\tau_b^2$. The description therefore closes on itself when $\tau_b\ll1$ and $\kappa\tau_b^3\ll1$; for a fast source the second is the stronger condition. On an accelerated source path $\kappa$ must in addition change little over the emission-time spread $Q\tau_b^2/4$, which fails as $\kappa\to0$. The two higher derivatives were supplied and checked symbolically by the adjudication. Rows from other roots, of total magnitude $B$, change the velocity by $Bt_*$ in that time, which must also be small. The relative error of $t_*$ is of second order in $\tau_b$ at fixed source data, of order $\kappa\tau_b^3$, plus the square of the relative change of $\kappa$ across the newborn pair, plus a term of order $Bt_*$ from other rows (inferred: the first-order terms are odd in the displacement of the two roots from the maximum and cancel in their sum; not bounded). The transmitter factors of the two newborn rows individually differ from the tabulated value by about $\pm Q\tau_b/4$ in relative terms, with opposite signs.

## Consequence: a small-delay birth is terminal

At the arrival the receiver's speed is rising. Its velocity component along $\mathbf n$ is $1-y_*=\sigma\sqrt{1-v_\perp^2}$ and the newborn rows point along $\sigma\mathbf n$, so the rate of change of the speed is $\sqrt{1-v_\perp^2}\;8/(\kappa Q\tau_b^4)$, which is positive and large. The transmitter factors of the newborn rows are away from zero, $\lvert D_*\rvert=\kappa Q\tau_b^2/4$, so every row is bounded and continuous in a neighbourhood of the arrival that excludes the birth. These supply hypotheses (U1) and (U2) of [Theorem U](curved-path-wake-speed-obstructions.md), arrival from below at a linear rate with bounded, continuous rows from other architrinos, under three further conditions that the local calculation does not provide: the receiver has been below wake speed at every earlier time and not only since the birth (U1 asks this of the whole history, and it is what makes the rows from other architrinos the whole acceleration in U2); no other root on the receiver is born, merges or has vanishing transmitter factor at the arrival instant; and every source has continuous velocity at the emission points of the roots then acting. Continuity of the rows along any continuation then holds because a row depends on the receiver's position and the source's path and not on the receiver's velocity. That theorem then gives: no continuation exists with velocity continuous at the arrival and absolutely continuous after it, with ordinary roots. The [jump exclusion](curved-path-wake-speed-jump-exclusion.md) extends this to velocities of bounded variation under its stated hypotheses.

The chain is: a passage of a member above wake speed at speed $V$ within a distance $b$ of a member below wake speed, with $bV\ll1$ and $bV/\sqrt{V^2-1}\ll1$, produces a birth with $\tau_b\ll1$ and $\kappa\tau_b^3\ll1$; the birth drives the slower member to wake speed in the time $t_*$; the arrival cannot be continued regularly. **Grade: derived at leading order for the first two links, derived for the third; the chain as a whole is conditional on the leading-order description and on the three further conditions just listed. The measurements below support the first two links on eight mutual releases and on the adjudication's prescribed-source cases.**

**Straight source path.** If the source moves on a straight line at constant speed $V>1$ and the receiver is at rest at distance $b$ from the line, the birth happens when the emission direction makes the angle $\arccos(1/V)$ with the source's velocity. Then $\tau_b=bV/\sqrt{V^2-1}$, $\kappa=(V^2-1)/\tau_b$, $y_0=1$, $v_\perp=0$, and

$$
t_*=\frac{\tau_b^3\,(V^2-1)}{6}\ \ (\sigma=-1),\qquad t_*=\frac{\tau_b^3\,(V^2-1)}{12}\ \ (\sigma=+1).
$$

A like-polarity receiver is driven to wake speed sooner than an opposite one. For the like case $y_*=0$: the receiver reaches wake speed moving directly away from the emission point, at the instant its own motion stops the growth of $G$.

## A straight source: exact rows, the first correction, and the threshold

For a source on a straight line at constant speed the two causal roots can be written in closed form, and three things left open above can be settled: the first correction to $t_*$, which the adjudication had measured, is derived; the fast-source limit reduces to one equation with one parameter; and the passing distance beyond which the receiver is not driven to wake speed is computed. This section was added on 2026-10-06 after the first adjudication. A second delegated [adjudication](root-birth-straight-source-independent-adjudication-2026-10-06.md) of this section alone derived the rows, the limit equation and the coefficients blind, by its own algebra and code, and accepted the section with corrections, all applied here: one threshold value in its fourth digit, one sign in the outline, a missing condition on where the roots exist, and the non-uniformity near wake speed.

**Exact rows (derived).** Let the source move along the $x$ axis, $\mathbf X(s)=(Vs,0,0)$ with $V>1$, and let the receiver be at $(x,y)$ in a plane through the axis at time $t$. Put $\gamma^2=V^2-1$, $\xi=Vt-x$ and $\Delta=\xi^2-\gamma^2y^2$. The root condition is a quadratic in the emission time, with two positive-delay roots where $\xi>0$ and $\Delta>0$, which is the inside of the cone behind the source; where $\Delta>0$ and $\xi<0$ both solutions of the quadratic have negative delay and are not causal roots. For each root $\tau\lvert D\rvert=\sqrt\Delta$, and the sum of the two rows is

$$
a_y=\sigma\,\frac{2y\,(V^2\xi^2+\Delta)}{(\xi^2+y^2)^2\sqrt\Delta},\qquad
a_x=\sigma\,\frac{2\xi\,\bigl(V^2\xi^2-(2V^2-1)\Delta\bigr)}{\gamma^2(\xi^2+y^2)^2\sqrt\Delta}.
$$

The right-hand sides depend on the receiver's position and the time and not on its velocity, so a free receiver beside a prescribed straight source obeys an ordinary differential equation with no delay. The birth is at $\Delta=0$, where both components grow as $\Delta^{-1/2}$ along $\mathbf n=(1,\gamma)/V$, in agreement with the local system.

**The fast-source limit (derived).** Let $V\to\infty$ with $\lambda=2/(Vb)$ fixed, for a receiver starting at rest at distance $b$. The two emission points then lie symmetrically ahead of and behind the receiver, the axial parts of the two rows cancel, and the receiver moves straight toward or away from the axis. With $\eta=y/b$ and $\theta=T/b$, where $T$ is the time since the source passed abeam,

$$
\frac{d^2\eta}{d\theta^2}=\sigma\,\lambda\,\frac{\eta}{\theta^2\sqrt{\theta^2-\eta^2}}\quad(\theta>\eta),\qquad \eta(1)=1,\quad \eta'(1)=0 .
$$

This is the equation of a receiver in the wake of a line that lights up all at once: the wake reaches distance $y$ at $T=y$. For a receiver held in place the rows sum over time to $\lambda=2/(Vb)$, which is the value the adjudication derived and checked. The whole outcome depends on the single number $\lambda$.

**The first correction to $t_*$ (derived by first-order perturbation theory with the integrals carried out symbolically; reproduced symbolically by a second route and numerically to nine digits by the straight-source adjudication).** For a receiver at rest beside a straight source at any speed $V>1$, first-order perturbation theory in $b^2$ from the exact rows gives the time from the birth to wake speed as

$$
t=t_*\Bigl[1+b^2V^2\,C_\sigma(V)+O(b^4)\Bigr],\qquad
C_{-}(V)=\frac{269}{896}-\frac{291}{2240\,(V^2-1)},\qquad
C_{+}(V)=\frac{223}{2240}-\frac{3}{140\,(V^2-1)},
$$

with $C_-$ for opposite polarities and $C_+$ for like, and $b^2V^2=\kappa\tau_b^3$. The steps are these. Scale $t-t_b=b^3T$, $x=b^3X$ and $y=b+b^3Y$, so that velocities are of order one. Let $w=VT-X$, let $\rho=\mathbf n\cdot\mathbf v$, and let $G_e=\Delta/(2\gamma b^4)=(w-\gamma Y)+b^2(w^2-\gamma^2Y^2)/(2\gamma)$, which is exact. Expanding the exact rows to first order in $b^2$ gives

$$
\frac{d\rho}{dT}=\sigma\,\frac{2\gamma}{V\sqrt{2\gamma G_e}}\,(1+b^2F),\qquad \frac{dG_e}{dT}=z=V(1-\rho)+b^2H,
$$

$$
F=\frac{1}{V^2}\Bigl[\frac{3w}{\gamma}-2\gamma w+(\gamma^2-4)Y-\frac{2G}{\gamma}\Bigr],\qquad
H=\frac1\gamma\Bigl[w\Bigl(V-\frac\rho V\Bigr)-\frac{\gamma^3Y\rho}{V}\Bigr],
$$

where on the right $w$, $Y$, $G=w-\gamma Y$ and $\rho$ take their leading-order values. Equivalently $F=[(1/\gamma-2\gamma)w+(\gamma^2-2)Y]/V^2$, and $H$ is the leading-order value of the exact $(w\,\dot w-\gamma^2Y\dot Y)/\gamma$. The velocity across $\mathbf n$ is of order $b^2$ and enters the speed only at order $b^4$. With $U=(4/V^2)\sqrt{2\gamma G_e}$ the equation for $z$ integrates to $z^2=V^2[1-\sigma(U+b^2K_2)]$, where $K_2=\int F\,dU-(2\sigma/V^2)\int(dH/dT)\,dG_e$ along the leading-order motion, and the time is $\int dG_e/z$. The arrival is at $\rho=\sigma$, which is $z=2V+b^2H$ for opposite polarities and $z=b^2H$ for like; in the second case the square-root end point of the time integral is cut short, which contributes $-3/64$ to $C_+$. On the leading-order motion every quantity is a polynomial in $p=1-\rho$, so the integrals are elementary; the script `coefficient_V.py` carries them out symbolically. The fast-source values are $269/896=0.30022$ and $223/2240=0.09955$. At $V^2-1=0.432$, that is $V=1.197$, the opposite-polarity correction changes sign, and nearer wake speed the receiver arrives sooner than $t_*$. The like-polarity correction changes sign at $V^2-1=48/223$, that is $V=1.102$. Both coefficients have a pole at $V=1$, so the correction is of relative size $\tau_b^2=b^2V^2/(V^2-1)$ there and the $O(b^4)$ remainder is not uniform in $V$: the two-term formula needs $\tau_b\ll1$ as well as $bV\ll1$.

| $V$ | $C_-$ derived | $C_-$ from the exact equation | $C_+$ derived | $C_+$ from the exact equation |
| --- | --- | --- | --- | --- |
| $1.1$ | $-0.31840$ | $-0.31840$ | $-0.00249$ | $-0.00249$ |
| $1.5$ | $0.19629$ | $0.19629$ | $0.08241$ | $0.08241$ |
| $2$ | $0.25692$ | $0.25692$ | $0.09241$ | $0.09241$ |
| $3$ | $0.28398$ | $0.28398$ | $0.09688$ | $0.09688$ |
| $10$ | $0.29891$ | $0.29891$ | $0.09934$ | $0.09934$ |
| $100$ | $0.30021$ | $0.30021$ | $0.09955$ | $0.09955$ |

The numerical column integrates the exact closed-form equation at $bV=0.04$, $0.02$ and $0.01$ and extrapolates to zero (`straight.py`). The adjudication's independent integrator, run before this derivation existed, had measured $0.195$ to $0.197$ and $0.083$ to $0.084$ at $V=1.5$, and $0.298$ to $0.302$ and $0.0995$ to $0.101$ at $V=10$ and $30$. This replaces the measured coefficients $0.30$ and $0.10$ with derived ones for this family. It is a first correction and not a bound on the remainder; for a moving receiver or an accelerated source no correction is derived.

**The threshold (computed from the exact equation).** A receiver at rest is driven to wake speed only if the source passes closely enough. Bisection on the exact equation gives the largest $bV$ for which it happens:

| $V$ | Opposite polarities: $bV$ below | Like polarities: $bV$ below |
| --- | --- | --- |
| $1.1$ | $1.20$ | $3.17$ |
| $1.5$ | $1.26$ | $3.25$ |
| $2$ | $1.28$ | $3.28$ |
| $5$ | $1.30$ | $3.32$ |
| $10$ and above | $1.31$ | $3.33$ |

Solving the fast-source limit equation directly (`limit_ode.py`) gives the limiting values: an opposite-polarity receiver is driven to wake speed when $\lambda=2/(Vb)$ exceeds $1.5280$, that is $bV<1.3089$, and a like-polarity receiver when $\lambda$ exceeds $0.6005$, that is $bV<3.330$. The same solver reproduces the two-term expansion of the arrival time above to a few parts in a million at $\lambda=20$ and $40$. A like-polarity receiver is the easier one to drive (measured: the thresholds above). A receiver held in place collects exactly $\lambda$, so without displacement the threshold would be $\lambda=1$ for both polarities; displacement raises it to $1.528$ for opposite polarities and lowers it to $0.6005$ for like. The reading is that the like-polarity receiver is pushed away from the axis and keeps pace with the spreading wake, so $\theta^2-\eta^2$ stays small and the rows on it stay large for longer, while the opposite-polarity receiver moves inward, away from the wake front (inferred). Near its threshold its speed approaches wake speed only slowly, and the value moves from $3.317$ to $3.328$ at $V=10$ as the run is lengthened from 400 to 400,000 passing distances, after which it no longer changes. The opposite-polarity threshold does not depend on the run length: the speed has a single peak, which in the fast-source limit is at the first crossing of the axis, at $\theta=2.148$, and the threshold $\lambda=1.52796$ is stable to six digits between run lengths of $10^2$ and $10^6$ passing distances (measured by the straight-source adjudication, which corrected this session's first value of $1.5286$). The adjudication had bracketed the opposite-polarity threshold between $bV=1.3$ and $1.5$ and had found like-polarity arrivals up to $bV=3$ without a threshold; both are consistent with the table. These thresholds are for a receiver at rest beside a straight source; they are measured values of a derived equation, with no closed form.

## Measured checks

The checks use the root-birth-resolving release integrator `release4.py` of the [release analysis](../braid-program/analysis/released-balances-and-nonrigid-search-2026-10-05.md), which lands on each birth and constructs the newborn roots. At the first step after a birth the script `birth_impulse.py` records $\tau_b$, $\kappa$ by a centred difference of $D$, $y_0$, $v_\perp$ and the polarities, and evaluates $t_*$. The measured interval runs from that step to the arrival at speed one, interpolated linearly inside the last step. Each row of the table is one release of a rigid balance from a small kick.

| Balance released | $\tau_b$ | Source speed at emission | Receiver speed at birth | Other rows $B$ | Predicted $t_*$ | Measured | Ratio |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Closed-form pair, kick 1 | $0.004086$ | $19.75$ | $0.506$ | $1.37$ | $2.902\times10^{-6}$ | $2.946\times10^{-6}$ | $1.015$ |
| Closed-form pair, kick 2 | $0.004083$ | $19.77$ | $0.506$ | $1.37$ | $2.904\times10^{-6}$ | $2.949\times10^{-6}$ | $1.016$ |
| Asymmetric three-member rotor, kick 2 | $0.008939$ | $7.97$ | $0.654$ | $0.58$ | $1.457\times10^{-6}$ | $1.482\times10^{-6}$ | $1.018$ |
| Three-member rotor (fourth of its family), kick 1 | $0.01221$ | $9.41$ | $0.542$ | $0.46$ | $1.205\times10^{-5}$ | $1.213\times10^{-5}$ | $1.006$ |
| Same, kick 2 | $0.01208$ | $9.65$ | $0.531$ | $0.45$ | $1.268\times10^{-5}$ | $1.283\times10^{-5}$ | $1.012$ |
| Three-member few-body balance, kick 2 | $0.01139$ | $10.49$ | $0.502$ | $0.45$ | $1.371\times10^{-5}$ | $1.380\times10^{-5}$ | $1.007$ |
| Four-member few-body balance, kick 1 | $0.1977$ | $4.22$ | $0.602$ | $1.01$ | $0.01478$ | $0.01782$ | $1.205$ |
| Second four-member few-body balance, kick 1, finer grading | $0.005891$ | $7.66$ | $0.730$ | $0.87$ | $1.773\times10^{-7}$ | $1.798\times10^{-7}$ | $1.014$ |

All eight births have opposite polarities between receiver and source; no birth between like polarities followed by an arrival has been measured in a mutual release. The one to two percent excess is a resolution effect of this instrument, which integrates the inverse-square-root onset with ordinary steps: on the last row the ratio is $1.115$ at the census setting, where the step is graded to a tenth of the time to the birth, and $1.014$ when it is graded to three hundredths. The first seven rows are at the census setting. When the integrator adds the velocity change of the birth step in closed form from the first integral above (`release5.py`), the ratio at the census settings becomes $1.002$ and $1.001$ on the last row's balance and $1.0012$ on the first row's, where the first correction $0.30\,\kappa\tau_b^3$ predicts $1.0004$ and $1.0014$. The seven births at small delay have $\kappa\tau_b^3$ between $0.0015$ and $0.010$. The last row has $\tau_b=0.20$ and $(V^2-1)\tau_b^2=0.66$, and its 20 percent excess matches $0.30\times0.66$, the coefficient the adjudication measured for opposite polarities (inferred, because that coefficient was measured for a receiver at rest beside a straight source).

**Blind value.** The [delegated blind reproduction](../binary-research/analysis/released-pair-blind-reproduction-2026-10-06.md) of the first row integrated the same release with its own instrument, landing on the birth to $10^{-10}$ time units. It reports the birth-to-arrival interval as $2.90438\times10^{-6}$ time units, identical to six digits at four resolutions, and the newborn delay as $0.0040860995$. It was written before this note and knew neither the formula nor the expected outcome. The formula gives $2.902\times10^{-6}$ with $\tau_b=0.0040861$, $\kappa=6.752\times10^4$, $y_0=0.8591$ and $y_*=1.8740$ taken from this session's integrator: agreement to $0.1$ percent, against an expected error of about $0.3\,\kappa\tau_b^3=0.14$ percent. The inputs to the formula come from this session's integrator and the interval from the other, so the comparison is not a comparison of one code with itself; both integrate the same equation in float arithmetic (measured).

**Prescribed-source test by the adjudication (measured, separate code).** A source on a prescribed path, not influenced by the receiver, and a free receiver starting exactly at a birth constructed in closed form, for straight paths at $V=1.5$, $3$, $10$, $30$ and $100$, two circular paths and two accelerated straight paths, receivers at rest and moving obliquely, and both polarity products. Wherever $\kappa\tau_b^3\le0.01$ and other rows are weak, the measured interval agrees with $t_*$ to between $10^{-6}$ and $5\times10^{-3}$. At fixed $V$ the deviation scales as $\tau_b^2$, and across $V$ it follows $\kappa\tau_b^3$, with coefficient $0.27$ to $0.34$ for opposite polarities and $0.10$ for like polarities at $V\ge3$. Like-polarity births, which the mutual releases above do not contain, obey the law equally well. The law's limit is also measured: with opposite polarities and a receiver at rest there is no arrival at $V=10$, $b=0.3$ (largest speed $0.52$) or at $V=100$, $b=0.019$ (largest speed $0.75$), and a coarse scan puts the threshold between $Vb=1.3$ and $Vb=1.5$. Like-polarity receivers arrived in every case tried, up to $Vb=3$; no derivation says that they always do. The full table is in the [adjudication record](root-birth-impulse-law-independent-adjudication-2026-10-06.md#numerical-test).

**State at the arrival, first row.** At the arrival the two newborn roots have delays $0.0040773$ and $0.0041003$ and transmitter factors $0.772$ and $-0.777$; the leading-order value is $0.782$. The rate of change of the receiver's speed over the last step is $1.33\times10^5$; the leading-order value, $0.874$ times the row sum $1.53\times10^5$, is $1.34\times10^5$. The third root, from the source's earlier path, has delay $0.9155$ and transmitter factor $0.869$ throughout. So in this run the rows on the receiver are bounded and continuous at the arrival and the rate is positive (measured).

## What it means

- **A length scale appears in the unchanged equation.** A member above wake speed at speed $V$ ends the regular motion of a member below wake speed when it passes within a distance $b$ with $bV\ll1$ and $bV/\sqrt{V^2-1}\ll1$, in units of $K/c_f^2$ and $c_f$. The passing distance that matters shrinks in proportion to $1/V$ for a fast source. Nothing in the equation softens this: the newborn rows scale as the inverse square of a small delay.
- **It explains how the mixed-speed releases end.** In the releases of balances that have members on both sides of wake speed, a fast member's close passage is followed by a slower member reaching wake speed within a small fraction of a period of the birth, a millionth of a period for the closed-form pair. The law accounts for that interval quantitatively.
- **It corrects an earlier reading.** The record of the closed-form pair said its inward ending lay outside Theorem U because the rows on the slow member are unbounded when the wake of the passage arrives. They are unbounded at the birth and bounded at the arrival, which comes later by $t_*$; the measured run meets the theorem's hypotheses.

## Limits and falsifiers

- The derivation is a leading-order asymptotic calculation. It bounds no remainder. A proof would control the variation of $\mathbf n$, $\kappa$ and $v_\perp$ over the interval and the contribution of other rows.
- It assumes a receiver below wake speed, $\kappa>0$, and a birth isolated from other births on the same receiver. A receiver above wake speed obeys the same local system, but $y_0$ may have either sign and the outcome is not an arrival from below; that case is not analysed.
- **Mergers.** With $\kappa<0$ two existing roots approach and merge as the minimum of $g$ rises to zero. The same system run toward the merger gives a change of $y^2$ of order $4\varepsilon/\tau_b$ over the last stretch on which each root is within $\varepsilon\tau_b$ of the merger delay, which is again large at small delay (derived at leading order; not measured).
- When $\tau_b$ or $\kappa\tau_b^3$ is not small the receiver need not reach wake speed. For a straight source the rows of the whole passage, summed over time on a receiver held in place, give $2/(Vb)$ (derived by the adjudication and checked there to five digits), which sets the scale of what a passage supplies and is not a bound once the receiver moves. For a receiver at rest beside a straight source the threshold is computed above: $Vb$ below about $1.31$ for opposite polarities and $3.33$ for like, at large $V$. One mutual release at $\tau_b=0.20$ did reach wake speed.
- The straight-path formulas assume a receiver at rest and a source without acceleration; in the measured runs the source is strongly accelerated, and $\kappa$ differs from $(V^2-1)/\tau_b$ by about 30 percent.
- The checks are float integrations: eight mutual releases by one instrument, one interval measured by a second, separately written instrument, and the adjudication's prescribed-source cases by a third. All were written by instances of the same model family in one research session, so their agreement is not independent evidence in the strong sense. The coefficients of the first correction are derived only for a receiver at rest beside a straight source; for other cases the measured values $0.30$ and $0.10$ are a guide and not a result.

**Falsifiers.** A resolved release in which a birth with $\tau_b<0.02$, $\kappa\tau_b^3<0.1$ and $Bt_*<0.1$ on a receiver below wake speed is not followed by an arrival at wake speed within $2t_*$; a measured interval differing from $t_*$ in relative terms by more than a few times the sum of $\kappa\tau_b^3$, $Bt_*$ and the square of the relative change of $\kappa$ across the newborn pair; or an error in one of the three derivatives of $g$, which a direct numerical differentiation would expose.
