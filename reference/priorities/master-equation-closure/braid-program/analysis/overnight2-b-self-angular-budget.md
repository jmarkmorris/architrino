# Required partner opposition when every self contribution advances rotation

## Derived subject statement

This analytical subject is pending independent review. It concerns the existing alternating six-member radius, phase and height class under the canonical coefficient-one equation with wake speed one. Every ordinary positive-delay partner and self root is retained.

Prescribe complete $C^2$ histories

$$
X_j(t)=R\bigl(\rho(\tau)\cos[\theta(\tau)+j\pi/3],
\rho(\tau)\sin[\theta(\tau)+j\pi/3],(-1)^jz(\tau)\bigr),
\qquad \tau=t/R,\quad R>0.
$$

Write $\omega=\dot\theta$. Suppose the following global normalized-time bounds hold:

$$
0<r_-\le\rho\le r_+,\quad
0<\omega_-\le\omega\le\omega_+,\quad
|\dot\rho|\le v_r,\quad |z|\le h,\quad |\dot z|\le v_z.
$$

Define a complete geometric delay bound, a source-speed bound and an angular-sweep bound by

$$
D_*=2\sqrt{r_+^2+h^2},\qquad
V_*=\sqrt{v_r^2+r_+^2\omega_+^2+v_z^2},\qquad
a=\omega_+D_*<\pi.
$$

Every ordinary self row has tangential acceleration at least

$$
c_*=\frac{r_-\omega_-}{D_*^2(1+V_*)}\frac{\sin a}{a}>0.
$$

If there are $N_s(\tau)$ self roots at a reception, then

$$
A_{t,\mathrm{self}}(\tau)\ge N_s(\tau)c_*.
$$

The inequality is dimensionless. It remains valid if the canonical sum has infinitely many nonnegative rows by monotone summation, although such an infinite lower bound prevents finite exact balance. In the selected finite ordinary domain, $N_s$ is a finite nonnegative integer.

This is a lower bound on every retained self contribution, not an assumption that self roots are absent below wake speed or present above it. The count follows separately from the actual geometry.

## Root-wise proof without a recent-delay floor

At a self root with delay $d$, the source and receiver polar angles differ by

$$
\delta=\int_{\tau-d}^{\tau}\omega(v)\,dv.
$$

All points lie in the normalized ball of radius $\sqrt{r_+^2+h^2}$, so the causal equation implies $0<d\le D_*$. Consequently

$$
0<\omega_-d\le\delta\le\omega_+d\le a<\pi.
$$

In the receiver's current tangential direction, the self separation is $\rho(\tau-d)\sin\delta$. The canonical polarity product for a self hit is positive and its denominator is $d^3|D_s|$, where $D_s=1-n\cdot V_s$ is the signed source divisor. At every root, $|D_s|\le1+V_*$.

The function $\sin x/x$ decreases on $(0,\pi)$. Indeed its derivative has numerator $x\cos x-\sin x$, whose derivative is $-x\sin x<0$ and whose limit at zero is zero. Therefore

$$
\sin\delta=\delta\frac{\sin\delta}{\delta}
\ge\omega_-d\frac{\sin a}{a}.
$$

The row bound follows:

$$
a_{t,\mathrm{self}}
=\frac{\rho(\tau-d)\sin\delta}{d^3|D_s|}
\ge\frac{r_-\omega_-}{d^2(1+V_*)}\frac{\sin a}{a}
\ge c_*.
$$

No lower self-delay floor or lower divisor floor is needed. An increasingly short delay or small divisor strengthens the bound instead of weakening it. The strict angular-sweep condition prevents any omitted longer-delay self contribution from opposing the tangential direction.

## Exact balance constrains the complete partner sum

Let $A_{t,p}$ denote the sum of all partner tangential rows and define $J=\rho^2\omega$. Direct differentiation gives

$$
\dot J=\rho(2\dot\rho\,\omega+\rho\dot\omega)=\rho L_t.
$$

The canonical equation $R L_t=A_{t,p}+A_{t,\mathrm{self}}$ implies, over any interval $[b,b+T]$ of ordinary exact balance,

$$
\int_b^{b+T}\rho A_{t,p}\,d\tau
=R[J(b+T)-J(b)]
-\int_b^{b+T}\rho A_{t,\mathrm{self}}\,d\tau.
$$

Using $r_-^2\omega_-\le J\le r_+^2\omega_+$ yields

$$
\frac1T\int_b^{b+T}\rho A_{t,p}\,d\tau
\le
\frac{R\Delta J}{T}
-r_-c_*\frac1T\int_b^{b+T}N_s(\tau)\,d\tau,
\qquad
\Delta J=r_+^2\omega_+-r_-^2\omega_-.
$$

This is a necessary balance condition derived from the acceleration equation, not an imported angular-momentum conservation law.

If $\rho$ and $\omega$ are periodic with common period $P$, then $J(b+P)=J(b)$, even if the absolute angle is not periodic. Exact balance over a full period requires

$$
\frac1P\int_b^{b+P}\rho A_{t,p}\,d\tau
\le-r_-c_*\frac1P\int_b^{b+P}N_s(\tau)\,d\tau.
$$

The height need not share that period for this identity, although the selected waveform class normally uses a common shape period. Complete history and ordinary exactness remain essential.

## Above-wake receptions force retained self roots

At a reception where the full normalized speed is strictly greater than one, the distance-minus-delay self gap is positive for all sufficiently small positive delays. Beyond $D_*$ it is strictly negative. Continuity gives at least one positive self root. An exact history in the everywhere-ordinary domain must retain it. Thus $N_s(\tau)\ge1$ at every such reception.

If every reception on the exact interval has full speed strictly greater than one, the finite-interval condition simplifies to

$$
\frac1T\int_b^{b+T}\rho A_{t,p}\,d\tau
\le\frac{R\Delta J}{T}-r_-c_*.
$$

For exact periodic radius and angular rate this gives the strict required partner opposition

$$
\frac1P\int_b^{b+P}\rho A_{t,p}\,d\tau\le-r_-c_*<0.
$$

For an unbounded exact future, with no periodicity assumed,

$$
\limsup_{T\to\infty}
\frac1T\int_b^{b+T}\rho A_{t,p}\,d\tau
\le-r_-c_*.
$$

No existence of the time average is required. On compact exact intervals the ordinary finite root charts make the sums locally continuous; singular accumulation is excluded by the selected exactness hypotheses.

More generally, if $E_T$ is the measurable set of strict above-wake receptions within the interval, then $\int N_s\ge |E_T|$. The partner bound requires opposition proportional to this time fraction. No count is inferred at a unit-speed touch from speed alone. The previously accepted wake-speed crossing theorem imposes further restrictions on exact connected histories, but is unnecessary for the displayed root-existence argument.

## Use and falsifiers

This criterion identifies a concrete obligation for a proposed periodic spatial reference: when all self angular sweeps remain below pi and self roots occur throughout the period, the complete partner sum must have a strictly negative radius-weighted mean of the stated magnitude. A small unweighted tangential mean or a selected-root cancellation does not satisfy that obligation. The condition can reject a continuous family if an independently checked partner bound is incompatible with it.

A wrong source-velocity divisor, a self root outside the geometric diameter bound, a nonpositive angular increment within the positive-rate hypotheses, a failure of the sinc inequality, or an ordinary exact history violating the integrated identity would refute this result. Allowing angular sweep to reach or exceed pi removes the self-sign guarantee; the theorem asserts no extension there. No new numerical run, existence claim, stability calculation or singular continuation is involved.

The [current research account](overnight2-b-followup-and-research-2026-10-07.md) receives independent-review disposition. The theorem is a proposed necessary condition for the selected smooth class; the coordinator owns later shared integration.
