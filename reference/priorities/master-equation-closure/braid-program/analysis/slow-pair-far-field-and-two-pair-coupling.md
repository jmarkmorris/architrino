# The far field of a slow neutral pair and the coupling of two pairs

## Result

A slow opposite-polarity pair is neutral, yet it accelerates a distant architrino at inverse-square range. The cause is the transmitter weighting: the two members have opposite polarity and opposite velocity, so their velocity-dependent contributions add where their static contributions cancel. The resulting field points along the line of sight and oscillates at the orbital frequency. A second pair orbiting at the same frequency therefore receives a steady mean push that depends on the phase difference between the two pairs.

For two identical pairs a distance $L$ apart the consequences are three.

1. Each pair is pushed along its motion by its neighbour. In the far field this push is a fraction of order $(R/L)^2$ of the push each pair already receives from its own partner. One distant neighbour cannot stop a pair's outward drift.
2. At moderate distance a larger, reciprocal term exchanges angular momentum between the two pairs without changing their total at leading order. It exceeds the self push inside $L\approx2R\,(c_f/v)^{1/3}$.
3. The midpoints of the two pairs accelerate along the line joining them. At large distance this acceleration falls as $1/L^2$ with strength $Kv^2/c_f^2$ and alternates in sign with distance.

**Claim grade:** derived for prescribed circular motions, and confirmed by a separately constructed derivation and by exact causal-root evaluation (measured). The released runs near the end are measured with a float instrument. No assembly is claimed. The unchanged Master Equation is used with every root retained; numerical values use $c_f=1$.

This is the first analysis of the "neutral pair of pairs" step in the Braid Program's [N-ladder](../priorities.md#strategy-the-ratified-n-ladder-evolution-first). Six released runs are reported as a first measurement of that step. They do not complete it, which would need a certified fate over a declared family of starts.

## Setting

Pair B is centred at the origin. Its positive member is at $R\,\mathbf e(s)$ and its negative member at $-R\,\mathbf e(s)$, with $\mathbf e(s)=(\cos(\omega s+\phi_B),\sin(\omega s+\phi_B),0)$ and tangent $\mathbf t(s)=(-\sin(\omega s+\phi_B),\cos(\omega s+\phi_B),0)$. The member speed is $v=\omega R$ and $\epsilon=v/c_f\ll1$. A receiver of positive polarity sits at $\mathbf x=L\,\hat{\mathbf n}$ with $L\gg R$. The coefficient $K$ is the inverse-square coefficient between two architrinos.

Each member contributes one causal root. For a source at $\mathbf X_j(s)$ with velocity $\mathbf V_j(s)$ the row is $\sigma K(\mathbf x-\mathbf X_j)/(\tau^3\lvert1-\mathbf n\cdot\mathbf V_j\rvert)$ with $\tau=\lvert\mathbf x-\mathbf X_j(s)\rvert=T-s$, where $\sigma$ is the product of the two polarities.

## The far field

Expand each row for $\lvert\mathbf X_j\rvert\ll L$ and $\lvert\mathbf V_j\rvert\ll1$, keeping the emission time exact. The delay is $\tau_j=L-\hat{\mathbf n}\cdot\mathbf X_j+\dots$, and the transmitter factor contributes $1+\hat{\mathbf n}\cdot\mathbf V_j+\dots$. Summing the two members with their polarities, every term even in the pair's displacement and velocity cancels, because exchanging the members reverses both. What remains at leading order is

$$
\mathbf F(\mathbf x,T)=\frac{2K\epsilon}{L^2}\,\bigl(\hat{\mathbf n}\cdot\mathbf t\bigr)\,\hat{\mathbf n}
+\frac{2KR}{L^3}\,\bigl[3(\hat{\mathbf n}\cdot\mathbf e)\,\hat{\mathbf n}-\mathbf e\bigr],
$$

with $\mathbf e$ and $\mathbf t$ evaluated at the delayed time $T-L/c_f$. Here $\mathbf F$ is the acceleration given to a receiver of positive polarity; a negative receiver gets $-\mathbf F$.

The second term is the familiar field of two opposite static sources, turning with the pair. The first term has no static counterpart. It comes only from the transmitter factor, points along the line of sight, and falls as $1/L^2$. It is larger than the second term wherever $L>R\,c_f/v$, that is, beyond one orbital wavelength divided by $2\pi$.

The terms of order $K\epsilon^2/L^2$, $K\epsilon R/L^3$ and $KR^2/L^4$ are absent. The first neglected terms are of third order in the two small quantities $\epsilon$ and $R/L$ combined. The phase delay $\omega L/c_f$ is kept exactly and may be large.

## The same statement for any cluster

The pair is one instance of a general fact. For any finite cluster of architrinos all below wake speed, seen from a distance $L$ large compared with its size, the part of its field that falls as $1/L^2$ is

$$
\mathbf F_{1/L^2}(\mathbf x,T)=\frac{K\,\hat{\mathbf n}}{L^2}\sum_j\frac{s_j}{1-\hat{\mathbf n}\cdot\mathbf V_j/c_f},
$$

with each velocity taken at that member's delayed time and $s_j$ its polarity. This is exact in the speeds: at this order only the transmitter factor distinguishes a moving source from a static one. Expanding to first order gives $(K\hat{\mathbf n}/L^2)\,[\,Q+\hat{\mathbf n}\cdot\dot{\mathbf p}/c_f\,]$, where $Q=\sum_js_j$ is the net polarity and $\mathbf p=\sum_js_j\mathbf X_j$ the polarity-weighted position sum. For the pair, $Q=0$ and $\dot{\mathbf p}=2v\,\mathbf t$.

Its time average at the receiver is fixed by the root playback. In the far field the emission time $s_j$ and the reception time $T$ are related by $dT/ds_j=1-\hat{\mathbf n}\cdot\mathbf V_j/c_f$, so for periodic internal motion the average of $1/(1-\hat{\mathbf n}\cdot\mathbf V_j/c_f)$ over reception time is exactly one. Hence

$$
\bigl\langle\mathbf F_{1/L^2}\bigr\rangle=\frac{K\,Q\,\hat{\mathbf n}}{L^2}.
$$

The transmitter weighting never changes the mean inverse-square field of a cluster. A neutral cluster has none, at any speed below wake speed; what it does have at this range oscillates. A steady inverse-square interaction between two neutral clusters can therefore arise only from a correlation between their internal motions, as in the two-pair calculation that follows.

This section is derived from the row alone. It was checked by exact evaluation on one neutral cluster that is not slow, a positive member at rest with a negative member circling it at speed $0.5c_f$ and $0.8c_f$: the formula matched the exact field to a relative difference equal to the size ratio $R/L$, and the reception-time mean of $L^2\,\mathbf F\cdot\hat{\mathbf n}$ was below $10^{-5}$ of its peak value, which was $1.0$ and $4.0$ in units of $K$. It has not had a separately constructed review.

## Two pairs

Pair A is centred at $L\hat{\mathbf n}$, in a plane parallel to that of B, with the same radius, frequency and sense of rotation and with phase $\phi_A$. Let $\theta$ be the angle between $\hat{\mathbf n}$ and the common normal to the orbit planes, so $\theta=\pi/2$ for pairs in one plane and $\theta=0$ for pairs stacked on a common axis. Define the delayed phase difference

$$
\chi=\phi_A-\phi_B+\frac{\omega L}{c_f}.
$$

**Push along the motion.** Averaged over a period, each member of A receives from B an acceleration along its own velocity of

$$
f_{AB}=\frac{K\epsilon}{L^2}\,\sin^2\theta\,\cos\chi
+\frac{2KR}{L^3}\Bigl(1-\tfrac32\sin^2\theta\Bigr)\sin\chi .
$$

Both members of A receive the same push. For comparison, each member's own partner pushes it forward by $f_{\rm self}=K\epsilon/(4R^2)$, the term responsible for the pair's [outward drift](../../binary-research/analysis/slow-binary-first-order-drift.md). The ratio is

$$
\frac{f_{AB}}{f_{\rm self}}=\frac{4R^2}{L^2}\sin^2\theta\cos\chi+\frac{8}{\epsilon}\frac{R^3}{L^3}\Bigl(1-\tfrac32\sin^2\theta\Bigr)\sin\chi .
$$

The first part is at most $4R^2/L^2$. The second part can be large, of order one at $L\approx2R\,\epsilon^{-1/3}$, but it is nearly reciprocal. The push on B from A is obtained by exchanging the roles, which replaces $\chi$ by $\phi_B-\phi_A+\omega L/c_f$. For $\omega L/c_f\ll1$ the two second parts are equal and opposite, so that term moves angular momentum from one pair to the other. The sum of the pushes on both pairs is

$$
f_{AB}+f_{BA}=\frac{2K\epsilon}{L^2}\cos(\phi_A-\phi_B)\Bigl[\sin^2\theta\,\cos\frac{\omega L}{c_f}+\bigl(2-3\sin^2\theta\bigr)\frac{\sin(\omega L/c_f)}{\omega L/c_f}\Bigr],
$$

which is of the size of the first part. For two pairs in one plane and $\omega L/c_f\ll1$ the bracket vanishes. For two pairs on a common axis it tends to $2$, so two stacked pairs half a turn out of step reduce their combined forward push by the fraction $8R^2/L^2$.

**Midpoint acceleration.** Define the acceleration of A's midpoint as the mean of its two members' accelerations. For pairs in one plane its period average is directed along the line joining the pairs, with no transverse part, and equals

$$
c_\parallel=\frac{KR^2}{L^4}\Bigl[\Bigl(\frac{\omega L}{c_f}\Bigr)^2\cos\chi-3\,\frac{\omega L}{c_f}\,\sin\chi-3\cos\chi\Bigr],
$$

positive meaning away from B. At short range this is the mean interaction of two turning static pairs, $-3KR^2\cos\chi/L^4$. At long range it becomes $(K\epsilon^2/L^2)\cos\chi$: an inverse-square acceleration between two neutral objects, smaller than the acceleration between two single architrinos by the factor $v^2/c_f^2$, and attracting or repelling according to the delayed phase. Its sign alternates with distance with period $2\pi c_f/\omega$.

## Evidence

**Independent derivation.** A separately constructed derivation, made without access to this analysis, obtained the same far field, the same push for pairs in one plane, the same reverse push and the same midpoint acceleration. It also proved two lemmas used implicitly above: each row is the gradient $-\sigma K\nabla_{\mathbf x}(1/\tau)$ with respect to receiver position, and the pair's field contains only odd combined orders, which is why the second-order terms cancel. Its record and instrument are retained at `.local-data/master-equation-closure/geometry-session-20261003/independent/far-field-pair.md`.

**Exact evaluation, this analysis.** The instrument `field.py` in `.local-data/master-equation-closure/geometry-session-20261003/` solves each causal root by bisection at 40 digits and evaluates the row. Its controls were run before any target: a stationary source reproduces $K/r^2$ exactly, and a uniformly moving source reproduces the closed-form root and row to $10^{-37}$. The targets were:

| Quantity | Parameters | Agreement with the formula |
| --- | --- | --- |
| Far field $\mathbf F$ | $\epsilon$ and $R/L$ from $10^{-4}$ to $3\times10^{-2}$, $\omega L$ from $0.1$ to $100$, five directions | Residual at most $1.2\times10^{-3}$ of the larger term, scaling as third order |
| Push $f_{AB}$ | $\epsilon,R/L\in\{10^{-2},10^{-3}\}$, $\theta\in\{0,\pi/4,\pi/2\}$, four phase differences | Relative difference at most $2\times10^{-3}$, falling to $10^{-5}$ at the smaller parameters |
| Midpoint $c_\parallel$ | Same, $\theta=\pi/2$ | Relative difference at most $4\times10^{-4}$; transverse mean zero to $10^{-30}$ |

The independent derivation reports residual slopes of exactly three for the field and pushes and four for the midpoint acceleration over a wider parameter range, and equal pushes on the two members to $10^{-49}$.

These are measurements with one instrument family per derivation. The two instruments were written separately and share only the arithmetic library.

## What two released pairs do

The formulas above hold the pairs on prescribed circles. To see what the equation does with them, two pairs were released from circular pasts and evolved under the unchanged delayed equation, each with a zero-delay comparison run from the same start. The instrument is a fixed-step fourth-order integrator for several architrinos below wake speed, `nbody.py`, with the driver `twopairs.py`, retained with outputs in `.local-data/master-equation-closure/geometry-session-20261003/`. Its control is a single pair, for which it measured $d(R^2)/dT=0.9955$ and $0.9996$ at speeds $0.02$ and $0.01$ against the adjudicated value $1$. The runs are float trajectories without error enclosure, at member speed $0.01$, followed for 40 or 60 orbital periods unless they ended sooner.

| Arrangement | Start distance | Phase difference | Zero-delay comparison | Delayed equation |
| --- | --- | --- | --- | --- |
| In one plane | $5R$ | $0$ | Members within $0.2R$ at $1.8$ periods | Both pairs unbound at $1.2$ periods |
| In one plane | $10R$ | $0$ | Drawn together to $3.3R$; both pairs reach eccentricity one at $9.2$ periods | Both pairs reach eccentricity one at $10.0$ periods, $8.1R$ apart |
| In one plane | $20R$ | $0$ | Drawn together to $3.2R$; eccentricity one at $53$ periods | Both pairs reach eccentricity one at $27$ periods, $9.5R$ apart |
| In one plane | $10R$ | $\pi/2$ | Drift apart to $28R$; eccentricities below $0.1$ | Drift apart to $83R$; eccentricity $0.15$; radius grown to $4.6R$ |
| On one axis | $10R$ | $\pi$ | Drawn together; members within $0.26R$ at $6.8$ periods | Drawn together; members within $0.31R$ at $5.9$ periods, where the run stops |
| On one axis | $6R$ | $0$ | Pushed apart to $94R$; pairs intact | Pushed apart to $90R$; pairs intact, radius grown to $3.5R$ |

Three things can be read from the table. The direction in which the midpoints move agrees with the midpoint formula: pairs in one plane and in step attract, stacked pairs half a turn out of step attract, and stacked pairs in step repel. When the pairs attract, they do not settle into a bound four-member motion; each pair's eccentricity is driven to one, or the members come together closer than the instrument can follow. And the delay hastens the outcome at larger distance, because each pair is meanwhile expanding under its own forward push, which strengthens the coupling: at $20R$ the pairs unbind in half the comparison time.

No run produced a bound state of the four members. Six starts are not a survey, and the runs that ended in a close approach say nothing about what follows it.

## What it means for binding by a neighbour

A slow pair expands because its partner's delayed contribution pushes each member forward. The question behind this analysis was whether a second pair could cancel that push. For one neighbour in the far field it cannot: the non-reciprocal part of its push is at most $4R^2/L^2$ of the self push. The reciprocal part is larger but only transfers angular momentum between the pairs.

A sum over many neighbours is a different matter. The fraction $4R^2/L^2$ is not small when summed over a line or a sheet of pairs with ordered phases. A line of stacked pairs, each half a turn out of step with the next, is examined in the [rotating ladder analysis](../../lattice-research/analysis/rotating-alternating-ladder.md), where the forward push is found to vanish at one spacing. That is the constructive outcome of this calculation.

## Limits and falsifiers

- The formulas hold both pairs on prescribed circles. The six released runs above are float trajectories from particular starts; the response of each pair's radius and phase to the pushes has not been derived.
- The formulas need $R\ll L$ and $\epsilon\ll1$. They are not valid for pairs within a few radii of each other.
- The two pairs were given equal radius and frequency. Unequal frequencies remove the mean values, leaving oscillating pushes.
- The zero-delay comparison in the [rotor analysis](slow-rigid-rotor-first-order-torque.md) indicates that neighbouring pairs destabilize one another through the reciprocal term; a mean push says nothing about that.

A complete causal-root evaluation whose residual does not fall as third order, a nonzero transverse mean of the midpoint acceleration, or unequal mean pushes on the two members of a pair would each refute the corresponding formula.
