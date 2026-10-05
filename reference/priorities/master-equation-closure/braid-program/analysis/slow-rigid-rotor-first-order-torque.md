# Slow rigid rotors: the first-order push, and why only the pair is neutral

## Result

Take any set of architrinos turning rigidly and slowly about a common center. At zeroth order in the speed each member receives the static inverse-square accelerations of the others, and for suitable shapes these supply exactly the centripetal acceleration: the shape is a relative equilibrium of the zero-delay comparison. At first order the delay adds a push along each member's motion. This analysis gives that push in closed form and applies it to several shapes.

Three findings follow.

1. **The sign is set by polarity and geometry.** For members on one circle, every opposite-polarity member pushes a given member forward and every like-polarity member pushes it back, each with weight $1/(4\sin^2(\theta/2))$ for angular separation $\theta$. A neutral pair is pushed forward and expands. A charged trimer, with one member at rest in the center and two like members orbiting it, is pushed back and contracts, with $d(R^2)/dT=-K/c_f$: the exact opposite of the pair's rate.
2. **No slow finite rotor examined is free of the push.** The pair, the alternating square and the alternating hexagon are pushed forward. The trimer and a collinear four-member rotor are pushed back. A slow rigid rotor of these kinds is therefore not a solution of the Master Equation; it is a comparison shape that the equation slowly deforms. Later in the same session an exact balance at low speed was found with eighteen members, three concentric hexagons with no member above $0.13\,c_f$, recorded in the [balances below wake speed](six-member-balance-below-wake-speed.md#larger-balances-below-wake-speed); it is outside the census below, which stops at six members, and it is unstable.
3. **Every slow rotor with more than two members is unstable already at zeroth order.** In the zero-delay comparison the trimer, the rings and the four-member rotor have growth rates between one and four times their angular rate, and a census of all rigid rotors found with up to six members shows the same for each of sixteen. The two-member pair alone is neutral. The first-order push is then beside the point for those shapes: they come apart within a revolution.

**Claim grade:** derived for the first-order formulas, on the [independently adjudicated local kernel](../../binary-research/analysis/slow-binary-independent-adjudication-2026-10-03.md); measured for their agreement with exact causal-root evaluation; measured for the zero-delay spectra and the census. The spectra belong to the zero-delay comparison dynamics and are not stability statements about solutions of the Master Equation, because these rotors are not solutions of it. All numbers use $c_f=1$ and $K=1$.

## Setting

Member $i$ has polarity $s_i$, position $\mathbf x_i$ in the plane of rotation and velocity $\mathbf u_i=\omega\,\hat{\mathbf z}\times\mathbf x_i$, small compared with $c_f$. One member may sit at rest at the center. Write $\sigma_{ij}=s_is_j$, $r_{ij}=\lvert\mathbf x_i-\mathbf x_j\rvert$ and $\mathbf n_{ij}=(\mathbf x_i-\mathbf x_j)/r_{ij}$, all at the reception time.

The local kernel gives the acceleration of $i$ due to $j$ to first order in the speeds:

$$
\mathbf a_{ij}=\frac{\sigma_{ij}K}{r_{ij}^2}\Bigl[\mathbf n_{ij}+\mathbf u_j-2(\mathbf n_{ij}\cdot\mathbf u_j)\,\mathbf n_{ij}\Bigr].
$$

The first term is the static row. The other two come from the source's displacement during the delay and from the transmitter factor. The remainder is of second order in the speeds provided the source's acceleration over the delay is correspondingly small, as the kernel's adjudication states.

## The push along the motion

**Members on one circle.** Put member $0$ at angle $0$ and member $j$ at angle $\theta$ on a circle of radius $R$, with speed $v=\omega R$. Then $r=2R\sin(\theta/2)$, $\hat{\mathbf t}_0\cdot\hat{\mathbf t}_j=\cos\theta$ and $\mathbf n\cdot\hat{\mathbf t}_0=\mathbf n\cdot\hat{\mathbf t}_j=-\cos(\theta/2)$, so

$$
\hat{\mathbf t}_0\cdot\bigl[\hat{\mathbf t}_j-2(\mathbf n\cdot\hat{\mathbf t}_j)\,\mathbf n\bigr]=\cos\theta-2\cos^2(\theta/2)=-1 .
$$

The bracket is $-1$ for every angle. The push on member $0$ along its motion is therefore

$$
f_0=-\frac{Kv}{4R^2c_f}\sum_{j\ne0}\frac{\sigma_{0j}}{\sin^2(\theta_j/2)} .
$$

A member at the center contributes nothing to this sum: a source at rest gives an exactly radial row.

**General planar rotor.** For any rigid planar arrangement the same kernel gives the rate of change of total angular momentum per unit response, $L=\sum_i(\mathbf x_i\times\mathbf u_i)_z$:

$$
\frac{dL}{dT}=\frac{K\omega}{c_f}\sum_{i\ne j}\frac{\sigma_{ij}}{r_{ij}^2}\Bigl[\mathbf x_i\cdot\mathbf x_j-\frac{2\,(\mathbf x_i\times\mathbf x_j)_z^2}{r_{ij}^2}\Bigr].
$$

The static rows cancel in this sum because they are equal and opposite along the line joining each pair. For two members on a line through the center the bracket is $-R_iR_j$ divided by $(R_i+R_j)^2$ if they are on opposite sides, and $+R_iR_j$ divided by $(R_i-R_j)^2$ if they are on the same side.

**Alternating rings.** For $N$ members with alternating polarity the sum is $\sum_{k=1}^{N-1}(-1)^k/\sin^2(\pi k/N)$, which equals $-1$, $-3$, $-19/3$ and $-11$ for $N=2,4,6,8$, matching $-(N^2+2)/6$. Each member is pushed forward by

$$
f=\frac{(N^2+2)}{24}\,\frac{Kv}{R^2c_f}.
$$

The pair is the case $N=2$, $f=Kv/(4R^2c_f)$.

## Worked shapes

The table lists the first-order push on a member, in units of $Kv/(R^2c_f)$ with $R$ and $v$ that member's own radius and speed, and the sign of the angular-momentum change.

| Shape | Members and polarity | Push along the motion | Angular momentum |
| --- | --- | --- | --- |
| Pair | $+$ and $-$, antipodal | $+1/4$ | Grows |
| Trimer | $-$ at rest in the center; two $+$ antipodal | $-1/4$ | Shrinks |
| Alternating square | four on a circle | $+3/4$ | Grows |
| Alternating hexagon | six on a circle | $+19/12$ | Grows |
| Collinear four-member rotor | $+$ at $R_1$, $-$ at $-R_1$, $-$ at $R_2$, $+$ at $-R_2$, with $R_2/R_1=3.483785$ | Negative on both the inner and the outer members | Shrinks |

For the four-member rotor the ratio $R_2/R_1$ is fixed by requiring the static rows to give both radii the same angular rate.

**The trimer's contraction rate.** The static inward acceleration on an orbiting member is $K/R^2$ from the center less $K/(4R^2)$ from the other orbiting member, so $v^2=3K/(4R)$ and the angular momentum per member is $\ell=Rv$ with $\ell^2=3KR/4$. The push gives $d\ell/dT=Rf=-Kv/(4Rc_f)$. Differentiating $\ell^2$ gives $dR/dT=-2v^2/(3c_f)$ and

$$
\frac{d(R^2)}{dT}=-\frac{K}{c_f}.
$$

The neutral pair obeys the same law with the opposite sign. A trimer left to this drift would shrink, speed up as $v^2=3K/(4R)$, and approach wake speed in a time of order $R^2c_f/K$. The zero-delay instability below acts far sooner.

## Agreement with exact evaluation

Each shape was prescribed as an all-past rigid rotation and every causal root was solved exactly. The instrument `rotor.py`, with the evaluator `field.py`, is retained in `.local-data/master-equation-closure/geometry-session-20261003/`. Its controls ran first: a stationary source gives $K/r^2$ exactly and a uniformly moving source reproduces its closed-form root and row to $10^{-37}$.

| Shape | Speed $v/c_f$ | Exact torque divided by the formula |
| --- | --- | --- |
| Pair | $5\times10^{-3}$ and $5\times10^{-4}$ | $0.999983$ and $1.000000$ |
| Trimer | $8.7\times10^{-3}$ and $8.7\times10^{-4}$ | $0.999950$ and $1.000000$ |
| Square | $6.8\times10^{-3}$ and $6.8\times10^{-4}$ | $1.000010$ and $1.000000$ |
| Hexagon | $8.2\times10^{-3}$ and $8.2\times10^{-4}$ | $1.000007$ and $1.000000$ |
| Four-member rotor | $2.0\times10^{-3}$ and $2.0\times10^{-4}$ on the inner radius | $0.999999$ and $1.000000$ |

The departures scale as the square of the speed, as a first-order formula should. The center member of the trimer has zero acceleration to $10^{-49}$, as symmetry requires.

**Independent derivation.** A separately constructed derivation, made from a problem statement without access to this analysis, obtained the same kernel, the same push for each shape in the table, the same ratio $R_2/R_1=3.48378534$ for the four-member rotor, and $d(R^2)/dT=-K/c_f$ for the trimer. Its own delayed integration of a mirror-symmetric trimer measured a contraction rate between $-0.9995K$ and $-1.0000K$, and of a pair an expansion rate between $0.9986K$ and $1.0020K$, in $c_f=1$ units. Its record is retained at `.local-data/master-equation-closure/geometry-session-20261003/independent/rotor-and-conic.md`.

## Zero-delay stability

The zero-delay comparison replaces each delayed row by its static value. It is the limit of the Master Equation as $v/c_f\to0$ at fixed shape, and it is used here only to ask whether a slow rotor is neutral before any delay correction is added. In it, every shape above is an exact relative equilibrium. Linearizing in the rotating frame, including motion out of the plane, gives:

| Shape | Largest growth rate divided by $\omega$ | Other growing modes, divided by $\omega$ |
| --- | --- | --- |
| Pair (control) | $0$ | None |
| Trimer | $2.508$ | None |
| Alternating square | $1.518$ | $1.244$ twice |
| Alternating hexagon | $2.883$ | $2.054$ twice, $1.342$ twice |
| Alternating octagon | $4.105$ | $3.457$ twice, $2.217$ twice, $1.374$ twice |
| Collinear four-member rotor | $3.925$ | $1.987$ |

The instrument is `rotor_stability0.py`. Its control is the pair, whose spectrum must be purely imaginary or zero and is. Each equilibrium's balance residual is below $10^{-14}$.

The pair is neutral because two bodies with an inverse-square mutual acceleration move on closed comparison orbits. Add a third member and that closure is lost. The growth rates are of the order of the angular rate itself, far larger than any correction of relative size $v/c_f$.

## A census up to six members

To test whether the six shapes are typical, every planar rigid rotor of the zero-delay comparison was sought for each polarity count up to six members. A rigid rotor is an arrangement whose static accelerations equal $-\omega^2\mathbf x_i$ for every member. The instrument `census0.py` starts a least-squares solver from 4000 random arrangements per polarity class, keeps solutions with residual below $10^{-10}$, removes duplicates by their labelled distance lists, and computes the spectrum of each. Its controls are the pair, found from every start with a neutral spectrum, and the trimer and square, found with the growth rates of the table above.

| Members ($+$, $-$) | Distinct rotors found | Largest growth rate divided by $\omega$ | Remarks |
| --- | --- | --- | --- |
| 1, 1 | 1 | $0$ | The pair |
| 2, 1 | 1 | $2.51$ | Collinear trimer |
| 2, 2 | 2 | $1.52$ and $3.92$ | Square; collinear four-member rotor |
| 3, 1 | 1 | $2.90$ | Three like members around a central opposite one |
| 3, 2 | 3 | $3.35$ to $5.31$ | One collinear |
| 4, 1 | 1 | $10.47$ | Four like members around a central opposite one |
| 3, 3 | 4 | $2.88$ to $6.59$ | The hexagon is the least unstable; two others occur in mirror-image copies |
| 4, 2 | 4 | $4.08$ to $11.26$ | None symmetric |
| 5, 1 | 0 | Not applicable | Five like members repel more strongly than one center attracts |

Sixteen rotors with three to six members were found, and every one has at least one growing mode with a rate above $1.5\,\omega$. The search is random and can miss rotors with small basins, so the list may be incomplete; one of the sixteen was reached from a single start. Classes with all members alike have no rotor, since nothing holds them in. Polarity-reversed classes are equivalent.

## What released rotors do

Three of the shapes were released from their rigid pasts and evolved under the unchanged delayed equation at member speed $0.01$, with the integrator `nbody.py` and driver `rotor_fate.py` described in the [two-pair analysis](slow-pair-far-field-and-two-pair-coupling.md#what-two-released-pairs-do). These are float trajectories.

| Shape | Departs by a tenth in some distance | State when a member passed $60R$ | Largest speed reached |
| --- | --- | --- | --- |
| Trimer | $2.1$ periods | At $13$ periods: one like member free; the center and the other member a bound opposite pair, $0.71R$ apart | $0.034$ |
| Alternating square | $0.5$ periods | At $15$ periods: two bound opposite pairs, $2.4R$ and $2.3R$ across, $58R$ from each other | $0.022$ |
| Alternating hexagon | $0.4$ periods | At $12$ periods: three bound opposite pairs, each $1.9R$ across, $58R$ to $59R$ from one another | $0.029$ |

Each shape came apart within a few periods, as the comparison spectra indicate, and each left opposite pairs: the neutral shapes divided completely into pairs, and the charged one left a pair and a free member. All speeds stayed far below wake speed.

## What this means

- **The pair is the slow unit.** In three released runs the larger shapes decayed into opposite pairs. With the pair's own outward drift and eventual unbinding, recorded in [binary research](../../binary-research/analysis/slow-mirror-encounter-first-order-map.md), the slow regime shows a cascade from shapes to pairs to free architrinos, at measured and inferred grade.
- **For slow assemblies.** Below wake speed, at small speed, the Master Equation is the zero-delay comparison plus small corrections. Every finite rigid rotor with more than two members examined here is unstable in that comparison at a rate the corrections cannot offset. A slow assembly, if one exists, is therefore not a small rigid rotor. This is an inference from a census of sixteen rotors with up to six members, not a theorem: the search may have missed rotors, and motions that are not rigid rotations were not examined.
- **For the sign of the drift.** Expansion is not universal. Like-polarity neighbours on the same circle brake. A structure that mixes the two could in principle have zero push. No finite relative equilibrium has a free shape parameter with which to arrange that, but an infinite periodic structure does; the [rotating ladder](../../lattice-research/analysis/rotating-alternating-ladder.md) is such a case.
- **For the exact rings.** The exact rings of the [planar campaign](../campaigns/planar-three-binary-work-queue.md#accepted-foundation) exist only above wake speed. The forward push on a slow alternating ring, $(N^2+2)Kv/(24R^2c_f)$, is the reason no slow ring balances: its tangential row cannot vanish at small speed. This agrees with the recorded absence of a balance in the lowest speed cell.

## Limits and falsifiers

The first-order formulas assume rigid slow rotation with a complete past, exactly one causal root per source and no self root. They say nothing above wake speed. The zero-delay spectra are properties of the comparison dynamics; a statement that the delayed motion near such a shape departs at the same rate is inferred and would need its own proof, since the shapes are not delayed solutions and cannot be linearized about under the Master Equation.

An exact causal-root evaluation whose torque differs from the formula by more than second order in the speed refutes the formula. A slow rotor with more than two members whose zero-delay spectrum has no growing mode would refute the generalization in the first bullet above; candidates worth testing are hierarchical arrangements, in which a tight pair orbits far from a third body.
