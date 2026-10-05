# A rotating ladder of alternating polarity: an exact moving balance below wake speed

## Result

An infinite line of opposite-polarity pairs, stacked on a common axis with each pair turned half a revolution from the next, can rotate rigidly about that axis at any speed below wake speed and satisfy the unchanged Master Equation, provided the spacing between pairs takes one particular value for each speed. The spacing is $d\approx3.345\,R$ for pair radius $R$ at small speed, and falls to about $2R$ as the speed approaches wake speed. Every member then receives exactly its centripetal acceleration: the push along the motion that makes an isolated pair expand is cancelled by the neighbouring pairs.

When it was found this was, as far as the Master-Equation Closure record shows, the first configuration below wake speed that moves and balances exactly under the delayed equation; the other recorded balances were the checkerboard at rest and circular histories above wake speed. Finite balances below wake speed were found later the same day and are recorded with the [Braid Program](../../braid-program/analysis/six-member-balance-below-wake-speed.md).

Two qualifications are essential.

- **It is unstable.** At small speed its largest growth rate is $0.99$ times the angular rate, in the zero-delay comparison and in the delayed linearization alike. As the speed rises the largest rate falls to about $0.52$ times the angular rate near speed $0.76\,c_f$ and then rises to $0.57$ times the angular rate near wake speed; above $0.76\,c_f$ the fastest mode is an oscillation that is neutral in the zero-delay comparison and that the delay makes grow. The ladder is an exact reference, not a retained assembly.
- **It is infinite.** The balance uses the whole line of pairs. Nothing here says a finite segment balances.

A second finding concerns twist. If successive pairs are turned by an angle other than half a revolution, the structure is a double helix with a handedness, and the delay then accelerates every member along the axis. Such a structure has an exact balance only if it also translates along its axis at a definite fraction of its rotation speed. A branch of these rotating and translating balances is computed below.

**Claim grade:** derived for the first-order balance condition and for the convergence of the sums; measured for the exact balance, by float evaluation of every causal root with the sum truncated at two different lengths, and reproduced by a separately constructed analysis; measured for the zero-delay growth rates and for the delayed characteristic roots, which are formal growing modes of the first variation and carry no nonlinear statement, and which a separately constructed adjudication reproduced and extended; derived for existence as an exact solution at every sufficiently small speed, by the separate proof linked below. All numbers use $c_f=1$ and $K=1$. The equation is unchanged: every member is below wake speed, so each source has one causal root and no member has a self root.

## The configuration

For every integer $k$ there is a pair at height $z=kd$. Its positive member is at $(-1)^kR\,\mathbf e(T)$ and its negative member at $-(-1)^kR\,\mathbf e(T)$, with $\mathbf e(T)=(\cos\omega T,\sin\omega T)$. Viewed from the side there are two vertical rails, and along each rail the polarity alternates. Each rung joins a positive and a negative member.

Two symmetries make all members equivalent: a shift by $d$ combined with half a turn, and half a turn combined with exchanging the polarities. A reflection $z\to-z$ maps the structure to itself without reversing the rotation, so the axial acceleration of every member vanishes identically. Rotational symmetry means that a balance at one instant is a balance at all times. It is therefore enough to examine the positive member of rung $0$ at one time, and two conditions remain: the acceleration along its motion must vanish, and its radial acceleration must equal $-\omega^2R$.

The contribution of rung $k$ falls as $1/k^3$ in the static radial part and as $1/k^2$ in the velocity-dependent part, so the sum over rungs converges absolutely. No summation convention is needed, unlike the three-dimensional checkerboard.

## First order: where the push vanishes

Write $\delta=d/R$ and $v=\omega R$. Using the [first-order row](../../binary-research/analysis/slow-binary-independent-adjudication-2026-10-03.md) in present-position variables, the members on the receiver's own rail are directly above and below it, at distance $\lvert k\rvert d$ with polarity $(-1)^k$, moving parallel to it. Each contributes $(-1)^kKv/(k^2d^2)$ along the motion; the sum over $k\ne0$ is $-\pi^2Kv/(6d^2)$, a braking. The members on the other rail are at distance $\sqrt{4R^2+k^2d^2}$ with polarity $-(-1)^k$, moving antiparallel; each contributes $(-1)^kKv/(4R^2+k^2d^2)$, and the sum over all $k$ is $\pi Kv/(2Rd\sinh(2\pi R/d))$. The push along the motion is therefore

$$
f=\frac{Kv}{c_f}\left[\frac{\pi}{2Rd\,\sinh(2\pi R/d)}-\frac{\pi^2}{6d^2}\right].
$$

For $d\to\infty$ the bracket tends to $1/(4R^2)$, the isolated pair's forward push. The bracket vanishes when

$$
y\,\sinh y=6,\qquad y=\frac{2\pi R}{d},
$$

whose root is $y=1.878224$, that is

$$
\frac{d}{R}=3.345280 .
$$

For closer spacing the like-polarity neighbours on the same rail dominate and the push is backward; for wider spacing the partner dominates and it is forward. The derivative of the bracket with respect to $d/R$ at the root is $0.1304/R^2$, not zero, so the root is simple.

At that spacing the static inward acceleration is $S\,K/R^2$ with

$$
S=2\sum_{k}\frac{(-1)^k}{(4+k^2\delta^2)^{3/2}}=0.191535,
$$

so the rotation speed obeys $v^2=0.191535\,K/R$. An isolated pair has $v^2=0.25\,K/R$.

## Exact balance under the delayed equation

With every causal root solved exactly, the two conditions were solved for $(d,\omega)$ at each radius. The instrument is `ladder.py`, retained in `.local-data/master-equation-closure/geometry-session-20261003/`. It evaluates all rows of rungs $\lvert k\rvert\le N$ in float arithmetic, solving each root by fixed-point iteration. Its control is the limit of very large spacing, where only the partner remains: the exact tangential and radial accelerations then equal the isolated pair's first-order values to $1.7\times10^{-5}$ and $1.3\times10^{-5}$ at speed $5\times10^{-3}$, the expected second-order difference.

A second check compares the float evaluator with root solving at 30 digits by the separate evaluator `field.py`, at $R=100$ with 300 rungs on each side: the radial and tangential sums agree to $2\times10^{-16}$ and $7\times10^{-17}$ in units of $K/R^2$.

| Radius $R$ | Speed $v/c_f$ | Balanced $d/R$ | Residuals (radial, tangential, axial), units $K/R^2$ |
| --- | --- | --- | --- |
| $10^6$ | $0.000438$ | $3.345280$ | below $10^{-16}$ |
| $10^4$ | $0.004377$ | $3.345256$ | below $10^{-16}$ |
| $10^3$ | $0.013841$ | $3.345035$ | below $10^{-16}$ |
| $100$ | $0.043803$ | $3.342823$ | below $10^{-16}$ |
| $10$ | $0.139634$ | $3.319866$ | below $10^{-16}$ |
| $3$ | $0.260605$ | $3.252220$ | below $10^{-15}$ |
| $1$ | $0.484399$ | $2.973283$ | below $10^{-16}$ |
| $0.7$ | $0.606381$ | $2.744579$ | below $10^{-16}$ |
| $0.48$ | $0.776777$ | $2.398820$ | below $10^{-15}$ |
| $0.38$ | $0.899960$ | $2.163973$ | below $10^{-16}$ |
| $0.32$ | $0.994736$ | $2.006244$ | below $10^{-16}$ |

Radii are in units of $K/c_f^2$. Changing the truncation from $N=2000$ to $N=8000$, and from $4000$ to $12000$ on the faster rows, moved $d/R$ by less than $2\times10^{-9}$. The small-speed limit reproduces the first-order root $3.345280$. The branch was followed to speed $0.995$, where the spacing has fallen to about $2R$. It therefore spans every speed below wake speed. It was not followed above wake speed, where each member would also receive its own wake and the evaluator used here does not apply.

For each radius the solution found is locally unique: two equations fix the two unknowns, and the solver converges to the same values from perturbed starts. Whether other branches exist at the same radius was not examined.

**Independent derivation.** A separately constructed analysis, made from a description of the configuration alone and with its own code, reached the same results. It derived the same first-order condition and root, $d/R=3.3452801575$. Its exact balance agrees with the table to all eight printed digits at $R=10^4$, $10^3$, $100$, $10$, $2$ and $1$. It followed the branch to its end at wake speed, where $d/R\to1.99825$ and $R\to0.31701$ in units of $K/c_f^2$, and found no solution below wake speed for smaller radius. It found the solution isolated: one root in a scan of $d/R$ from $0.15$ to $60$, with a Jacobian determinant that never vanishes along the branch. It showed that the static acceleration is inward at every spacing, by writing it as a series of positive terms, and that the truncation error falls as the inverse cube of the number of rungs. In the zero-delay comparison it obtained the same growth rate at the balanced spacing, $0.988\,\omega$, and the large-spacing law $10\,\omega\,(R/d)^{3/2}$. It did not analyse delayed stability. Its record and scripts are retained at `.local-data/master-equation-closure/geometry-session-20261003/independent/rotating-ladder.md`. Both analyses were produced within one working session.

**Existence at small speed is proved.** A [separate proof](rotating-ladder-small-speed-existence.md) establishes that for every sufficiently small speed there is exactly one balanced spacing in any fixed window around the first-order root, that the ladder with that spacing satisfies the delayed equation exactly at every member and time with absolutely convergent sums, and that the spacing is a continuously differentiable function of the speed with

$$
\frac dR=3.3452801575-1.277966\,\frac{v^2}{c_f^2}+\dots
$$

Existence and uniqueness need only sums dominated term by term by a multiple of $1/k^2$. The derivative in the speed needs the cancellation between successive rungs, which the proof supplies through an exact identity for the tangential sum. The measured branch agrees: at $v/c_f=0.0438$ the formula gives $3.342828$ and the measurement $3.342823$. The proof is graded derived. Its [independent adjudication](rotating-ladder-small-speed-existence-independent-adjudication-2026-10-03.md) accepts the theorem as stated, with corrections to one decimal and to wording that are applied in both documents; it rechecked every lemma against a reference written beforehand and reproduced the balanced spacings with its own evaluator. It gives no numerical value for the speed below which it holds, and it says nothing about the larger speeds of the measured branch or about stability.

## Zero-delay stability

In the zero-delay comparison, the ladder is a relative equilibrium at every spacing. Perturbations were analysed with one positive and one negative member per screw cell and a phase $e^{iqk}$ from rung to rung, the perturbation being turned with each rung. The instrument is `ladder_stability0.py`; its control is $d/R=400$, where the pairs are nearly isolated and the largest growth rate is $0.0013\,\omega$, consistent with the neutral pair.

| Spacing $d/R$ | Largest growth rate divided by $\omega$ | Wavenumber $q$ |
| --- | --- | --- |
| $400$ (control) | $0.0013$ | $\pi$ |
| $8$ | $0.401$ | $\pi$ |
| $5$ | $0.689$ | $\pi$ |
| $3.34528$ (balanced) | $0.988$ | $2.67$ |
| $2.5$ | $1.676$ | $\pi$ |

The ladder is unstable at every spacing examined, most strongly for perturbations that alternate from rung to rung. The growth rate falls toward zero only as the pairs are moved far apart, and it does so slowly: the values at $d/R=8$ and $400$ both fit $9\,\omega\,(R/d)^{3/2}$ (the independent analysis finds a coefficient of $10$ at larger spacings), the square root of the strength of the static coupling between neighbouring pairs, which falls as $(R/d)^3$. The mechanism is the reciprocal exchange between neighbouring pairs described in the [two-pair analysis](../../braid-program/analysis/slow-pair-far-field-and-two-pair-coupling.md): each pair alone moves on a closed comparison orbit, and coupling two such orbits of equal period destabilizes both.

These rates belong to the comparison dynamics. The next section replaces the comparison by the delayed equation.

## Delayed linear stability

The exact balance is a solution of the Master Equation, so its first variation is defined. Perturb every member by a small displacement that grows as $e^{\lambda T}$ in its own co-rotating frame, with phase $e^{iqk}$ from rung to rung. One row $\mathbf a=\sigma K\mathbf R/(\tau^3D)$, with $\mathbf R=\mathbf x-\mathbf X(s)$, $\tau=\lvert\mathbf R\rvert$, $\mathbf n=\mathbf R/\tau$ and $D=1-\mathbf n\cdot\mathbf V(s)$, changes under a receiver shift $\delta\mathbf x$, a source shift $\delta\mathbf X$ and a source velocity shift $\delta\mathbf V$, all at the root, by

$$
\delta\mathbf a=\sigma K\Bigl[H\,(\delta\mathbf x-\delta\mathbf X)+\frac{\mathbf n\mathbf n^{\mathsf T}}{\tau^2D^2}\,\delta\mathbf V\Bigr],
$$

$$
H=\frac{G-3\mathbf n\mathbf n^{\mathsf T}/D}{\tau^3D}+\frac{\mathbf n\,(\mathbf V^{\mathsf T}G)}{\tau^3D^2}-\frac{\mathbf n\mathbf n^{\mathsf T}}{\tau^2D^3}\Bigl(\frac{\mathbf n\cdot\mathbf V}{\tau}+\mathbf n\cdot\mathbf A\Bigr),\qquad G=I+\frac{\mathbf V\mathbf n^{\mathsf T}}{D},
$$

where $\mathbf A$ is the source's acceleration at the root. The shift of the emission time is included. For zero speed $H$ reduces to the static matrix $(I-3\mathbf n\mathbf n^{\mathsf T})/\tau^3$. Summing over all rungs with the factors $e^{-\lambda\tau}$ and $e^{iqk}$ gives a six-by-six characteristic matrix, which by the symmetry between the two members of a rung splits into two three-by-three problems. Its zeros in $\lambda$ are the characteristic roots.

The instrument is `ladder_delay_stability.py` with the driver `ladder_delay_run.py`. Two controls ran first. The variation formula was compared with a finite difference of an exactly evaluated row under smooth perturbations of receiver and source, with relative difference $1.1\times10^{-9}$. And at speed $1.4\times10^{-3}$ the delayed roots reproduce the zero-delay growth rates: the largest is $0.9873\,\omega$ against $0.988\,\omega$.

The roots that are unstable in the zero-delay comparison were then followed along the balanced branch for nine values of $q$ between $0$ and $\pi$. Roots that are neutral in that comparison were not seeded, although the delay makes many of them grow. The last column is from the [independent adjudication](rotating-ladder-delayed-stability-independent-adjudication-2026-10-03.md); entries marked with a dagger are the largest of the root families computed at that row and not a full search:

| Speed $v/c_f$ | Balanced $d/R$ | Largest tracked growth rate divided by $\omega$ (real-root family) | Largest growth rate found divided by $\omega$ |
| --- | --- | --- | --- |
| $0.0014$ | $3.3453$ | $0.987$ | $0.988$† |
| $0.044$ | $3.3428$ | $0.985$ | $0.985$† |
| $0.140$ | $3.3199$ | $0.915$ | $0.915$ |
| $0.261$ | $3.2522$ | $0.754$ | $0.754$† |
| $0.381$ | $3.1293$ | $0.606$ | $0.606$† |
| $0.484$ | $2.9733$ | $0.561$ | $0.562$ |
| $0.606$ | $2.7446$ | $0.536$ | $0.538$† |
| $0.737$ | $2.4788$ | $0.525$ | $0.525$† |
| $0.872$ | $2.2145$ | $0.513$ | $0.547$ |
| $0.978$ | $2.0329$ | $0.510$ | $0.567$ |

Among the tracked roots the delay lowers the largest growth rate, which levels off near half the angular rate and is still there at $0.98\,c_f$. The delay does not reduce the number of growing roots. An [independent census](rotating-ladder-delayed-stability-independent-adjudication-2026-10-03.md) by the argument principle, at the same nine wavenumbers, counts 23 roots with growth rate above $0.03\,\omega$ at speed $0.014$ and 70 at speed $0.978$: oscillations that are neutral in the zero-delay comparison acquire a growth rate proportional to the speed. Above speed about $0.76$ one of them, an oscillation in the plane of rotation with every pair in step ($q=0$), grows faster than every tracked root, at $0.547\,\omega$ at speed $0.872$; at speed $0.978$ a second $q=0$ oscillation leads at $0.567\,\omega$. Within these searches the ladder has growing modes at every speed below wake speed.

The adjudication derived the first variation separately before reading the formula above and found the two algebraically identical. It reproduced every root recorded by this analysis with a separately built matrix, and it corrected two statements of an earlier version of this section, which had said that the delay removes growing roots and that the largest rate near wake speed is $0.51\,\omega$.

Two limits apply. The table's third column follows only roots continued from the zero-delay unstable set. The census cited above shows that other roots do grow, at every speed, and supplies the larger rates. That census is complete only for growth rates above $0.03\,\omega$, at nine wavenumbers in each symmetry sector and at seven speeds. And these are formal modes of the first variation: connecting them to growth of actual nearby solutions needs a history-flow argument of the kind supplied for the [six-member ring](../../braid-program/analysis/t02-admissible-nonlinear-history-connection.md), which has not been made for the ladder.

## Twisted structures move along their axis

Let successive rungs be turned by an angle $\alpha$ in place of half a revolution. For $\alpha<\pi$ the positive members lie on one helix and the negative members on another. The structure now has a handedness, and reflection in $z$ is no longer a symmetry.

**First-order balance.** In the zero-delay comparison the structure is again a relative equilibrium, and a spacing at which the first-order push along the motion vanishes exists for a range of twists. At that spacing the comparison growth rate is never smaller than at $\alpha=\pi$:

| Twist $\alpha/\pi$ | Zero-push $d/R$ | Largest growth rate divided by $\omega$ |
| --- | --- | --- |
| $1.0$ | $3.3453$ | $0.988$ |
| $0.9$ | $3.2756$ | $0.991$ |
| $0.8$ | $3.0591$ | $1.043$ |
| $0.7$ | $2.6732$ | $1.171$ |
| $0.6$ | $2.1211$ | $1.430$ |
| $0.5$ | $1.6726$ | $1.706$ |
| $0.4$ | $1.3644$ | $2.032$ |
| $0.3$ | $1.0256$ | $3.204$ |

For twists between $0.6\pi$ and $0.9\pi$ a second, closer zero-push spacing exists with growth rates between three and eleven times $\omega$. At $\alpha=0.2\pi$ the only zero-push spacing has a growth rate of nearly sixteen times $\omega$, and at $\alpha=0.1\pi$ and $0.05\pi$ no zero-push spacing with inward static acceleration was found. The instrument is `helix_scan.py`; its control reproduces the ladder's spacing and growth rate at $\alpha=\pi$.

**Axial drive.** With delay, a twisted structure that rotates without translating receives an axial acceleration on every member, equal on all of them by the screw symmetry. At the zero-push spacing it is $-0.0425$, $-0.180$ and $-0.537$ in units of $Kv/(R^2c_f)$ for $\alpha/\pi=0.9$, $0.7$ and $0.5$, and zero at $\alpha=\pi$. The whole structure is pushed along its axis.

**Axial braking.** A uniform axial speed $u$ of the whole structure produces an axial acceleration proportional to $u$ and opposed to it. For the ladder the first-order coefficient is

$$
\frac{a_z}{u}=\frac{K}{R^2c_f}\left[\frac{\pi^2}{6\delta^2}-\sum_k\frac{(-1)^k(4-k^2\delta^2)}{(4+k^2\delta^2)^2}\right]=-0.1423\,\frac{K}{R^2c_f}
$$

at the balanced spacing, and exact evaluation gives the same slope, $-0.14227$, for axial speeds up to the rotation speed. Translation along the axis is therefore self-limiting, as it is for the [exact rings](../../braid-program/campaigns/planar-three-binary-work-queue.md#accepted-foundation), whose axial weights are also negative.

**Rotating and translating balances.** Drive and braking cancel at one axial speed. Solving the three conditions, radial, tangential and axial, exactly for spacing, rotation rate and axial speed at $R=10^3$ gives a branch that leaves the ladder continuously:

| Twist $\alpha/\pi$ | $d/R$ | Rotation speed | Axial speed | Axial speed divided by rotation speed |
| --- | --- | --- | --- | --- |
| $1.00$ | $3.34504$ | $0.013841$ | $0$ | $0$ |
| $0.98$ | $3.33861$ | $0.013835$ | $-0.000803$ | $-0.058$ |
| $0.96$ | $3.31887$ | $0.013818$ | $-0.001642$ | $-0.119$ |
| $0.94$ | $3.28413$ | $0.013787$ | $-0.002563$ | $-0.186$ |
| $0.92$ | $3.23047$ | $0.013736$ | $-0.003647$ | $-0.265$ |
| $0.90$ | $3.14770$ | $0.013646$ | $-0.005089$ | $-0.373$ |
| $0.88$ | $2.97821$ | $0.013417$ | $-0.008064$ | $-0.601$ |

All three residuals are below $10^{-14}$ in each row, and the values do not change to nine digits between truncations at 4000 and 12000 rungs. At $R=100$ and $\alpha=0.9\pi$ the ratio is $-0.375$, nearly the same, so the ratio is a property of the shape. The continuation was lost below $\alpha=0.88\pi$, where the spacing is falling quickly; whether the branch turns back there was not determined. A separate solution at $\alpha=0.6\pi$ with $d/R=0.640$ and axial speed $2.6$ times the rotation speed was also found; it lies on a different branch and was not followed.

The sign of the axial speed reverses with the handedness. These are exact balances of an infinite translating helix. They are not localized carriers, and by the table above they are at least as unstable in the comparison dynamics as the ladder.

## What it means

- **Existence below wake speed is not the obstacle.** A moving configuration can balance exactly at every speed below wake speed. What the ladder lacks is stability. At small speed the instability is the zero-delay one common to every slow structure with more than two members examined so far, and the delay at higher speed reduces that mode's growth without curing it, while making other, oscillatory modes grow.
- **Like-polarity neighbours are the brake.** The forward push of an opposite partner can be cancelled by like-polarity neighbours at a suitable distance. A periodic structure has the free spacing needed to arrange this; a finite rigid rotor does not, as the [rotor analysis](../../braid-program/analysis/slow-rigid-rotor-first-order-torque.md) shows.
- **Handedness produces axial motion.** A chiral structure is driven along its axis and settles at an axial speed proportional to its rotation speed. This is a mechanism by which an internal rotation sets a translation speed, which the [photon candidate](../../photon-research/priorities.md) requires and which planar rings do not supply. It has been shown only for infinite helices.

## Limits and falsifiers

- Away from small speed the exact balance is a float measurement with no interval enclosure. The existence proof covers small speeds only and gives no explicit threshold.
- Only rigid rotation, and rigid rotation with uniform axial translation, were considered. Finite segments, bent or closed ladders, and sheets or three-dimensional arrays of pairs were not.
- The delayed stability result tracks a finite set of characteristic roots at nine wavenumbers with the sum truncated at 3000 rungs, and is linear.
- Mirror-image members were assumed equal in speed and radius; a ladder whose two rails differ was not examined.

An exact evaluation with a longer truncation, or interval arithmetic, in which the tangential residual does not vanish at the tabulated spacing would refute the balance. A derivation of the first-order push that does not reduce to $y\sinh y=6$ would refute the first-order condition. A zero-delay spectrum at the balanced spacing with no growing mode, or a delayed characteristic matrix whose determinant does not vanish at the tabulated roots, would overturn the stability tables. For the twisted structures, an exact evaluation showing zero axial acceleration at rest for $\alpha\ne\pi$ would refute the axial drive.
