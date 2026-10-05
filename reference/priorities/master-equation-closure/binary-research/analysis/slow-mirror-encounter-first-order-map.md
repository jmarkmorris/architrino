# Slow two-architrino encounters: what one passage does

## Result

When two architrinos pass each other slowly as a mirror pair, the delay changes their motion by an amount that can be written in closed form for every kind of passage: a bound revolution, a parabolic passage, or a flyby, and for either polarity. Three statements summarize it.

1. **Every passage raises the comparison quantity.** For opposite polarity and for like polarity alike, on every comparison orbit, the quantity $E=\tfrac12v^2+\sigma K/(4\rho)$ increases, or is unchanged in the limit of an undeflected straight path. There is no slow two-body passage that loses it.
2. **Angular momentum changes at a fixed rate per radian.** For opposite polarity the angular momentum per member grows by exactly $K/(4c_f)$ per radian swept about the center, whatever the shape of the orbit. For like polarity it falls at the same rate.
3. **Slow encounters do not capture.** An unbound opposite-polarity pair leaves less bound than it arrived. A bound pair gains on every revolution, its eccentricity grows in proportion to its angular momentum, and it unbinds. Two delayed-equation runs show this happening, in three revolutions and in two.

**Claim grade:** derived for the first-order rates, on the [independently adjudicated local kernel](slow-binary-independent-adjudication-2026-10-03.md); derived for their integrals along the comparison conics; measured for the agreement of the unchanged delayed equation with them; inferred for the statements about capture, unbinding and the reach of wake speed, which extrapolate first-order results over a whole passage. All numbers use $c_f=1$ and $K=1$. No physical mass or energy is assumed; $E$ and $\ell$ are bookkeeping quantities of the comparison.

The near-circular bound case is already treated rigorously by the [controlled secular theorem](slow-binary-controlled-secular-comparison.md) and the [changing-scale continuation](slow-binary-changing-scale-fate.md), which this note does not repeat. Its contribution is the unbound and strongly eccentric cases, the like-polarity case, and a measured unbinding. The like-polarity continuation is proved for all time in the [global theorem](like-polarity-mirror-global-continuation.md).

## Setting

Member 1 is at $\mathbf X(T)$ and member 2 at $-\mathbf X(T)$. Write $\rho=\lvert\mathbf X\rvert$, $\hat{\mathbf e}=\mathbf X/\rho$, and split the velocity into a radial part $v_r$ along $\hat{\mathbf e}$ and a tangential part $v_t$. The polarity product is $\sigma$: $-1$ for an opposite pair, which attracts, and $+1$ for a like pair, which repels. The separation of the two members is $2\rho$.

The local kernel, with the partner's velocity equal to $-\mathbf V$, gives member 1 the acceleration

$$
\mathbf a=\frac{\sigma K}{4\rho^2}\Bigl[\hat{\mathbf e}+\frac{v_r}{c_f}\,\hat{\mathbf e}-\frac{v_t}{c_f}\,\hat{\mathbf t}\Bigr]
$$

to first order, where $\hat{\mathbf t}$ is the unit tangential direction. The first term is the static row. For an opposite pair the correction pushes the member forward along its tangential motion and opposes its radial motion. For a like pair both signs reverse.

Define the comparison quantities

$$
E=\tfrac12v^2+\frac{\sigma K}{4\rho},\qquad \ell=\rho\,v_t .
$$

Then, at first order,

$$
\frac{dE}{dT}=-\frac{\sigma K}{4\rho^2c_f}\bigl(v_t^2-v_r^2\bigr),\qquad
\frac{d\ell}{dT}=-\frac{\sigma K}{4\rho^2c_f}\,\ell .
$$

Because $\ell\,dT/\rho^2$ is the angle swept, the second relation is $d\ell/d\theta=-\sigma K/(4c_f)$ exactly within the first-order comparison.

## One passage on a comparison conic

At zeroth order the member moves on a conic with focus at the center: $1/\rho=(1+e\cos\theta)/p$ for an opposite pair and $1/\rho=(e\cos\theta-1)/p$ for a like pair, with $p=4\ell^2/K$ and eccentricity $e=\sqrt{1+32E\ell^2/K^2}$. Integrating the two rates along the conic gives the change over one complete passage.

| Passage | Change of $E$ | Change of $\ell$ |
| --- | --- | --- |
| Opposite pair, one bound revolution, any $e<1$ | $\dfrac{\pi K^2}{8\,\ell\,p\,c_f}$ | $+\dfrac{\pi K}{2c_f}$ |
| Opposite pair, parabolic passage | $\dfrac{\pi K^3}{32\,\ell^3c_f}$ | $+\dfrac{\pi K}{2c_f}$ |
| Opposite pair, flyby, $e>1$ | $\dfrac{K^2}{8\,\ell\,p\,c_f}\Bigl[\sqrt{e^2-1}+\arccos(-1/e)\Bigr]$ | $+\dfrac{K}{2c_f}\arccos(-1/e)$ |
| Like pair, flyby, $e>1$ | $\dfrac{K^2}{8\,\ell\,p\,c_f}\Bigl[\sqrt{e^2-1}-\arccos(1/e)\Bigr]$ | $-\dfrac{K}{2c_f}\arccos(1/e)$ |
| Like pair, head-on | $\dfrac43\,E\,\dfrac{v_\infty}{c_f}$ | $0$ |

Here $v_\infty=\sqrt{2E}$ is the speed at large separation. Every entry in the middle column is positive: $\sqrt{e^2-1}-\arccos(1/e)=\tan\theta_0-\theta_0>0$ with $\cos\theta_0=1/e$. In the limit of a wide, fast flyby both flyby entries tend to zero relative to $E$; a straight path gains nothing at this order, because the gain near closest approach, where the motion is tangential, is cancelled by the loss on the two radial legs.

Two features of the bound case stand out. The gain of $E$ per revolution does not depend on eccentricity at fixed $\ell$. And the gain of $\ell$ per revolution, $\pi K/(2c_f)$, does not depend on the orbit at all.

For the like pair the flyby entry can be written with $q=\sqrt{e^2-1}$ as $\Delta E/E=4(v_\infty/c_f)(q-\arctan q)/q^3$, which tends to $\tfrac43v_\infty/c_f$ head-on.

These closed forms are the leading term in the small ratio $K/(\ell c_f)$, which is the size of the fractional change of $\ell$ in one passage. They are evaluated on the undisturbed conic and do not include the change of the orbit during the passage.

## Eccentricity and unbinding of a bound pair

For a bound opposite pair, $E=-K(1-e^2)/(8p)$ and $\ell^2=Kp/4$. Inserting the changes per revolution gives $\Delta e/e=\Delta\ell/\ell$. So the ratio $e/\ell$ is unchanged by the averaged first-order map: eccentricity grows in proportion to angular momentum. This is the averaged form of the statement, proved for the near-circular class in the changing-scale analysis, that eccentricity divided by angular motion converges while eccentricity itself grows.

A pair released with eccentricity $e_0$ and angular momentum $\ell_0$ therefore reaches $e=1$ when $\ell=\ell_0/e_0$, after sweeping about

$$
\Delta\theta\approx\frac{4c_f\,\ell_0}{K}\Bigl(\frac1{e_0}-1\Bigr)
$$

radians. An exactly circular pair never does so in this average; it expands indefinitely. Any nonzero eccentricity leads to unbinding after finitely many revolutions, the fewer the more eccentric the start.

Reaching $e=1$ is not yet escape. On the outgoing leg the motion is radial and $E$ falls, by at most $\tfrac14Kv/(\rho c_f)$ from distance $\rho$ outward at speed $v$. If $E$ at the last pericenter exceeds that remaining loss the pair leaves; otherwise it returns for one more passage, on which it gains again.

## Reaching wake speed in a flyby

In the zero-delay comparison an opposite pair's speed at closest approach is $v_p=K(1+e)/(4\ell)$. For a slow incoming pair, $e\approx1$ and $v_p\approx K/(2\ell)$. Writing $\ell=b\,v_\infty$, with $b$ the distance of each incoming path from the center line, the closest-approach speed reaches $c_f$ when

$$
b\approx b_c=\frac{K}{2c_f\,v_\infty}.
$$

For $b\gg b_c$ the passage stays slow, $v_p/c_f\approx b_c/b$, and the table above applies. For $b\lesssim b_c$ the pair is carried toward wake speed, where the first-order description fails and the [first-exit obstruction](../../collinear-research/analysis/class-level-first-exit-independent-adjudication-2026-10-03.md) is the only established result, and that only for collinear approach. The estimate of $b_c$ is inferred from the comparison orbit; it is not a theorem about the delayed motion near wake speed.

## Agreement with the delayed equation

The instrument is a fixed-step fourth-order integrator for the mirror pair under the unchanged equation, `mirror.py`, retained with its run scripts and outputs in `.local-data/master-equation-closure/geometry-session-20261003/`. At each stage it solves the partner's causal root by fixed-point iteration on a cubic-Hermite history. It uses floating-point arithmetic, so its results are measured and not certified. Its control is the independently adjudicated circular drift $d(R^2)/dT=K/c_f$: for speeds $0.02$, $0.01$ and $0.005$ it measured $0.99189$, $0.99817$ and $0.99992$, approaching one as the speed falls.

**Bound orbits.** Released from comparison ellipses and followed for five revolutions:

| Start eccentricity | Speed scale | $d\ell/d\theta$ measured, expected $0.25$ | $e/\ell$ at first and last pericenter |
| --- | --- | --- | --- |
| $0.3$ | $0.01$ | $0.250009$ | $0.012008$ and $0.012021$ |
| $0.3$ | $0.005$ | $0.250001$ | $0.0060005$ and $0.0060019$ |
| $0.6$ | $0.01$ | $0.250002$ | $0.024007$ and $0.024017$ |
| $0.6$ | $0.005$ | $0.250009$ | $0.0120001$ and $0.0120014$ |

Over those revolutions the eccentricity itself rose by a tenth or more, for example from $0.638$ to $0.714$, while $e/\ell$ held to one part in a thousand.

**Flybys.** Each run starts at 150 times the closest-approach distance with a uniformly moving past and ends at the same distance outbound. The middle columns compare the delayed equation with a direct integration of the first-order comparison from the same start; the last column is the closed form for the complete conic at the nominal $E$ and $\ell$.

| Polarity | $v_\infty$ | $e$ | $\Delta E/E$ delayed | $\Delta E/E$ first-order | $\Delta E/E$ closed form | $\Delta\ell$ delayed | $\Delta\ell$ closed form |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Opposite | $0.01$ | $2$ | $2.83884\times10^{-2}$ | $2.83882\times10^{-2}$ | $2.946\times10^{-2}$ | $1.03588$ | $1.04720$ |
| Opposite | $0.005$ | $2$ | $1.43967\times10^{-2}$ | $1.43966\times10^{-2}$ | $1.473\times10^{-2}$ | $1.03791$ | $1.04720$ |
| Opposite | $0.01$ | $1.2$ | $0.365883$ | $0.365793$ | $0.441$ | $1.23187$ | $1.27795$ |
| Like | $0.01$ | $2$ | $5.24450\times10^{-3}$ | $5.24458\times10^{-3}$ | $5.272\times10^{-3}$ | $-0.52019$ | $-0.52360$ |
| Like | $0.01$ | $1.3$ | $9.59472\times10^{-3}$ | $9.59466\times10^{-3}$ | $9.596\times10^{-3}$ | $-0.34323$ | $-0.34658$ |
| Like | $0.01$ | head-on | $1.33334\times10^{-2}$ | $1.33330\times10^{-2}$ | $1.33333\times10^{-2}$ | $0$ | $0$ |
| Like | $0.005$ | $2$ | $2.61013\times10^{-3}$ | $2.61014\times10^{-3}$ | $2.636\times10^{-3}$ | $-0.52069$ | $-0.52360$ |
| Like | $0.005$ | head-on | $6.63320\times10^{-3}$ | $6.63316\times10^{-3}$ | $6.667\times10^{-3}$ | $0$ | $0$ |

The delayed equation and the first-order comparison agree to between one part in $10^{4}$ and one part in $10^{6}$. The closed forms differ from both by a few percent in the opposite-polarity runs, which is the expected effect of the orbit changing during the passage: in the third row $E$ itself changes by more than a third, and the closed form is outside its range. The head-on like-polarity values lie within one percent of $\tfrac43v_\infty/c_f$; the finite starting distance lowers the measured value by about $2/150$ in units of $v_\infty/c_f$ and the second-order term raises it by about $\tfrac43v_\infty/c_f$ in the same units, and at $v_\infty=0.01$ the two happen to cancel.

**An unbinding.** An opposite pair was released on a comparison ellipse with $e_0=0.7$ at speed scale $0.02$, so $\ell_0=12.5$ and $e_0/\ell_0=0.056$. The delayed run gave $e/\ell=0.05610$, $0.05616$ and $0.05619$ at its three pericenters, with $e=0.790$, $0.879$ and $0.968$. Just after the third pericenter, at $19.5$ radians from release, $E$ became positive; the averaged estimate is $21.4$ radians. The run continued outward to $\rho=2.5\times10^{5}$, a hundred times the largest pericenter distance, where $E=2.9\times10^{-6}$ and the remaining first-order loss is at most $2.8\times10^{-9}$. The maximum speed during the run stayed far below wake speed. A second run, with $e_0=0.9$ at speed scale $0.01$, gave $e/\ell=0.03601$ at both of its pericenters against $e_0/\ell_0=0.036$, became unbound at $12.2$ radians against the averaged estimate of $11.1$, and reached $\rho=7.4\times10^{5}$ with $E=3.3\times10^{-6}$ and a remaining first-order loss below $10^{-9}$. These are two measured unbindings of slow eccentric pairs under the unchanged equation. Neither is a certified escape: the trajectories have no error enclosure, and the bound on the remaining loss is the first-order one.

**Independent derivation.** A separately constructed derivation, made from a problem statement without access to this note, obtained the same first-order acceleration, the same two rates, every entry of the passage table, the relation $\Delta e/e=\Delta\ell/\ell$ and the invariance of $e/\ell$, and found no first-order turning of the orbit's long axis. Its quadratures agree with the closed forms to $10^{-13}$ or better, and its own delayed integrator measured $\Delta\ell$ per revolution within $0.14\%$ of $\pi K/(2c_f)$ on eccentric orbits. Its record is retained at `.local-data/master-equation-closure/geometry-session-20261003/independent/rotor-and-conic.md`. The two derivations share no code; both were produced within one working session, so a review by a different author would still add assurance.

## What it means

- **No slow capture.** A slow opposite pair that meets from afar leaves with more of the comparison quantity than it brought. Two free architrinos of opposite polarity therefore do not form a bound pair by a slow passage, at this order. The only remaining route to a bound state from an encounter is a close passage with $b\lesssim b_c$, which leads to wake speed.
- **Bound pairs are transient.** Together with the adjudicated near-circular theorems, the picture is consistent: a slow pair expands, its eccentricity grows with its angular momentum, and it unbinds. The measured run is an instance. The [elongated-continuation task](../work-queue.md#control-the-elongated-slow-binary-continuation) asks for the proof; this note supplies the first-order invariant $e/\ell$, the predicted angle, and one delayed trajectory to compare against.
- **Slow motion does not settle.** In the mirror frame every slow passage, of either polarity, adds a fraction of order $v/c_f$ to the comparison quantity. A dilute slow population would on this evidence speed up with each encounter until the slow description fails, and would not relax toward rest. This is an inference from two-body mirror passages only. When the pair's midpoint also moves, the delay exchanges between midpoint and relative motion with either sign, as the [drift note](slow-pair-drift-and-static-neighbour.md) shows for a bound pair, and no population calculation has been made.
- **Like pairs are simple.** They repel, gain a fraction of order $v/c_f$ of their comparison quantity, and separate. Nothing singular happens, and the global theorem proves it.

## Limits and falsifiers

The rates are first order in $v/c_f$ and require slow motion over the whole causal window. The integrals are first order in $K/(\ell c_f)$. Mirror symmetry is imposed throughout; an encounter between two members with unequal speeds is not covered and may differ. The unbinding is one float trajectory.

A delayed run in the slow regime whose $d\ell/d\theta$ differs from $-\sigma K/(4c_f)$ beyond second order, a slow passage of either polarity on which $E$ falls by more than the second-order remainder, or a slow eccentric pair whose $e/\ell$ drifts at first order would each refute the corresponding statement. A certified trajectory in which an eccentric slow pair remains bound indefinitely would refute the unbinding inference.
