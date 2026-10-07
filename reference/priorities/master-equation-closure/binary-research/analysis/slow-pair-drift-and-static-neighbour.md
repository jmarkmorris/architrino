# A slow pair that drifts, and a slow pair near a stationary architrino

## Result

Two simple departures from the isolated mirror pair are examined: the pair's midpoint moves, or a third architrino sits nearby at rest.

1. **Drift.** If the midpoint of a slow opposite pair moves with a small uniform velocity $\mathbf W$, the delay brakes the part of $\mathbf W$ along the pair's axis of rotation and leaves the part in the orbit plane unchanged on average. The mean midpoint acceleration is $-K\,\mathbf W_\perp/(4R^2c_f)$, where $\mathbf W_\perp$ is the axial part and $R$ the pair radius.
2. **A stationary neighbour cannot offset the outward drift.** A source at rest gives an exactly static inverse-square row with no delay correction. Its line integral around any closed path of a member is zero, so it contributes no mean push along a circular orbit.
3. **A stationary neighbour does destroy the circle.** Its row acts oppositely on the two members and steadily converts the pair's angular momentum into eccentricity. In the zero-delay comparison a circular pair with a neighbour at distance $L$ becomes a radial, head-on orbit after a time $\pi L^2/(6\sqrt{KR})$. That is shorter than the pair's own expansion time when $L<R\sqrt{3c_f/(\pi v)}$.

**Claim grade:** derived for items 1 and 2 on the [adjudicated local kernel](slow-binary-independent-adjudication-2026-10-03.md), and measured for item 1 by exact causal-root evaluation; inferred for item 3, which uses the zero-delay comparison and a first-order averaging of it, with a measured check in that comparison only. Numbers use $c_f=1$ and $K=1$. The pair's motion is prescribed in items 1 and 2.

## A drifting pair

Let the members be at $\mathbf W T\pm R\,\mathbf e(T)$, with $\mathbf e$ turning at rate $\omega$ in a fixed plane and $\lvert\mathbf W\rvert$ and $v=\omega R$ both small. The local kernel gives member 1, from member 2 at separation $r=2R$ in direction $\mathbf n$,

$$
\mathbf a_1=-\frac{K}{r^2}\Bigl[\mathbf n+\mathbf u_2-2(\mathbf n\cdot\mathbf u_2)\,\mathbf n\Bigr],\qquad \mathbf u_2=\mathbf W-v\,\hat{\mathbf t},
$$

and member 2 the same expression with $\mathbf n\to-\mathbf n$ and $\mathbf u_1=\mathbf W+v\,\hat{\mathbf t}$. The parts containing $v$ are the forward pushes of the isolated pair. The parts containing $\mathbf W$ are identical for the two members:

$$
\mathbf a_{\rm mid}=-\frac{K}{4R^2c_f}\Bigl[\mathbf W-2(\mathbf n\cdot\mathbf W)\,\mathbf n\Bigr].
$$

As the pair turns, $\mathbf n$ sweeps the orbit plane and the average of $2(\mathbf n\cdot\mathbf W)\mathbf n$ is the in-plane part of $\mathbf W$. The in-plane part therefore cancels and

$$
\langle\mathbf a_{\rm mid}\rangle=-\frac{K}{4R^2c_f}\,\mathbf W_\perp .
$$

The receiver's own velocity does not enter, because the Master Equation's acceleration depends on the receiver's position only.

**Evidence.** With both members prescribed and every root solved exactly at 40 digits, by the instrument `drift.py` with the evaluator `field.py` in `.local-data/master-equation-closure/geometry-session-20261003/`, whose controls are a stationary source and a uniformly moving source: for $v=10^{-2}$ and $10^{-3}$ and axial drifts of $0.1v$, $0.25v$ and $0.5v$, the mean midpoint acceleration equals the formula to all five printed digits. For an in-plane drift of $0.5v$ the mean is $-8.3\times10^{-12}$ at $v=10^{-2}$ and $-8.3\times10^{-17}$ at $v=10^{-3}$, a fifth-order remainder.

**Consequence.** Axial drift decays at the rate $K/(4R^2c_f)$. Because the pair is expanding with $R^2=R_0^2+KT/c_f$, the decay integrates to $W_\perp\propto(R_0/R)^{1/2}$: slow, and never complete. In-plane drift persists. The exact rings and the [rotating ladder](../../lattice-research/analysis/rotating-alternating-ladder.md) show the same axial braking.

## A stationary neighbour

**No mean push.** A source at rest at $\mathbf x_3$ gives a receiver at $\mathbf x$ the row $\sigma K(\mathbf x-\mathbf x_3)/\lvert\mathbf x-\mathbf x_3\rvert^3$ exactly: the emission site does not move, and the transmitter factor is one. This row is the gradient of a fixed function of position. Its integral along any closed path is zero, so over one circuit of a circular orbit it gives no net push along the motion. The outward drift of a pair is caused by a term that is not a gradient, and no arrangement of stationary sources can cancel it on a closed orbit. A neighbour must move to do so, as the neighbouring pairs of the ladder do.

**Loss of the circle.** Place a stationary architrino of polarity $s_3$ at distance $L\gg R$ in the orbit plane. Across the pair its row is nearly uniform and acts with opposite sign on the two members, so the midpoint is unaffected at leading order and the separation vector $\mathbf d$ obeys, in the zero-delay comparison,

$$
\ddot{\mathbf d}=-\frac{2K\,\mathbf d}{\lvert\mathbf d\rvert^3}+\mathbf g,\qquad \lvert\mathbf g\rvert=\frac{2K}{L^2}.
$$

This is an inverse-square orbit with a small constant perturbation. Averaging over the orbit, the angular momentum and the eccentricity vector turn into one another at the rate

$$
\omega_S=\frac32\,g\,\sqrt{\frac{a}{2K}}=\frac{3\sqrt{KR}}{L^2},
$$

with $a=2R$ the separation. A circular pair reaches zero angular momentum, a radial orbit, at $T=\pi/(2\omega_S)=\pi L^2/(6\sqrt{KR})$. Compared with the expansion time $R^2c_f/K$ and using $v^2=K/(4R)$, the ratio is $(\pi/3)(L/R)^2(v/c_f)$. The neighbour acts first when

$$
L<R\,\sqrt{\frac{3c_f}{\pi v}},
$$

about ten radii at $v/c_f=10^{-2}$ and thirty at $10^{-3}$.

A radial orbit of an opposite pair is the collinear approach, which under the unchanged equation reaches wake speed at positive separation and has [no continuation](../../collinear-research/analysis/class-level-first-exit-independent-adjudication-2026-10-03.md) in the classes examined.

**Evidence, comparison only.** Direct integration of the comparison equation above from a circular start, after a control with $g=0$ that held the radius to nine digits, gave a near-radial orbit, with closest approach one hundredth of the starting separation, at $T=52.8$ for $L=10R$ against the predicted $52.4$, and at $T=20.7$ for $L=6R$ against $18.8$. This checks the averaged rate within the comparison. It is not a delayed calculation.

## What it means

A single stationary architrino near a slow pair does not hold it. It can only make the pair's fate arrive sooner, by turning the circular orbit into a head-on one. Binding by an environment, if it occurs, needs neighbours whose own motion is correlated with the pair's.

## Limits and falsifiers

The drift result assumes a prescribed uniformly drifting circular pair; the response of the orbit to the oscillating in-plane term is not followed. The neighbour result holds the third architrino fixed, although under the equation it would respond, and it uses the zero-delay comparison with first-order averaging. Out-of-plane neighbours tilt the orbit as well and were not analysed.

An exact evaluation in which a drifting pair's mean midpoint acceleration departs from $-K\mathbf W_\perp/(4R^2c_f)$ at first order would refute item 1. A stationary source producing a nonzero mean push along a closed orbit would refute item 2. A delayed three-member calculation in which a circular pair near a held neighbour keeps its angular momentum beyond the stated time would refute item 3.
