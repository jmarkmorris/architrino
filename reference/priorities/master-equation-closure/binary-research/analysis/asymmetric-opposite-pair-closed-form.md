# An opposite pair on two circles: a closed-form exact balance with one member below wake speed

## Result

Two architrinos of opposite polarity can circle a common centre on two different circles, at one angular rate, and satisfy the unchanged Master Equation exactly. The balance has a closed form. Let $x$ be the root in $(0,1)$ of

$$
x^5-6x^3-4x^2-11x+4=0,\qquad x=0.311957402386568\ldots
$$

Then, in units $K=c_f=1$,

$$
R_1=\frac{4}{\pi^2x(1+x)^2}=0.754788860450680\ldots,\qquad R_2=xR_1=0.235461972256512\ldots,\qquad\omega=\frac{\pi}{2R_1}=2.081106928177218\ldots
$$

| Member | Radius, in $K/c_f^2$ | Speed, in $c_f$ | Causal roots received |
| --- | --- | --- | --- |
| Fast | $0.754788860$ | $\pi/2=1.570796327$ | One from the partner, one from its own path |
| Slow | $0.235461972$ | $\pi x/2=0.490021542$ | One from the partner |

The slow member leads the fast one in angle by $\pi(1-x)/2$, which is $61.92^\circ$. The period is $3.0192\,K/c_f^3$.

The balance works because every contribution arrives along a line through the centre. The slow member receives the fast member's wake from the point diametrically opposite it. The fast member receives the slow member's wake from a point on its own radius, and its own wake from the point diametrically opposite, emitted half a turn earlier. No row has a tangential part, so the tangential conditions hold identically, and the two radial conditions fix the two radii.

Three statements about two-member rigid motions are proved along the way.

1. **Two architrinos of like polarity never balance on circles**, at any speeds and any radii.
2. **Two architrinos never balance with both below wake speed**, for either polarity, any radii, and with or without translation along the axis.
3. **The balance above exists**, with a derived root census.

The balance is unstable. The delayed first variation has five characteristic roots with positive real part, in units of $\omega$: $0.853$ on the real axis and the complex pairs $0.114\pm1.007\,i$ and $0.026\pm1.799\,i$.

**Claim grade:** derived for statements 1 to 3, by the hand argument below; statements 2 and 3 are confirmed by a separately constructed [independent check](small-exact-balances-independent-adjudication-2026-10-04.md), and statement 1 is self-reviewed. Measured for the characteristic roots, with the count and locations confirmed by that check, by an instrument validated on finite-difference tests and on the ring research's certified growth rates. The roots are formal growing modes of the first variation and carry no nonlinear statement. The equation is unchanged: every positive-delay causal root is included, own-path roots among them, with no speed cap and no event rule.

This configuration was found on 2026-10-04 by a random search over two-member rotors at speeds up to $4\,c_f$, and its closed form was recognized from the delay angles the search returned. It is distinct from the [equal-radius circles above wake speed](superwake-circle-stability-2026-10-03.md), in which both members move at the same speed.

## Rows for uniform circular motion

Let a receiver sit at radius $R_i$ and angle $\phi_i$, and a source at radius $R_j$ and angle $\phi_j$, both turning at rate $\omega$. A causal root is a delay $\tau>0$ equal to the distance from the receiver to the source's position a time $\tau$ earlier. Put $\psi=\phi_i-\phi_j+\omega\tau$, the angle by which the receiver's direction leads the direction of the emission point. Then

$$
\tau^2=R_i^2+R_j^2-2R_iR_j\cos\psi ,
$$

and the row has radial and tangential parts, positive outward and forward,

$$
\frac{\sigma\,(R_i-R_j\cos\psi)}{\tau^3\lvert D\rvert},\qquad\frac{\sigma\,R_j\sin\psi}{\tau^3\lvert D\rvert},\qquad D=1-\frac{R_iR_j\,\omega\sin\psi}{\tau},
$$

where $\sigma$ is the product of the two polarities and $D$ is the transmitter factor. For a member's own path, $R_j=R_i$ and $\psi=\omega\tau$, and $\sigma=+1$. A balance requires, for each member, that the tangential parts sum to zero and the radial parts sum to $-\omega^2R_i$.

Two facts about own-path roots are used. A member below wake speed has none: the distance to its own earlier position grows more slowly than the delay. A member at speed $\beta=\omega R$ between $1$ and $\pi$ has exactly one, at the delay angle $\theta=\omega\tau$ solving $\theta=2\beta\sin(\theta/2)$: any root has $\theta\le2\beta<2\pi$, and the function $\theta-2\beta\sin(\theta/2)$ vanishes at zero, starts downward and is strictly convex on $(0,2\pi)$.

## Like polarity never balances

Take two members of like polarity, $\sigma=+1$, on circles of radii $R_o\ge R_i$. Consider the member on the outer circle. The radial part of its partner's row is proportional to $R_o-R_i\cos\psi$, which is positive unless $R_o=R_i$ and $\cos\psi=1$; that exception would place the emission point at the receiver, at zero distance, which is not a positive-delay root. The radial part of each of its own-path rows is proportional to $R_o(1-\cos\psi)$, which is positive for the same reason. Every row on the outer member therefore points outward, and the sum cannot equal the inward value $-\omega^2R_o$. This holds at every speed and for every number of roots.

## Both below wake speed never balances

Let both members be below wake speed, with either polarity. Each then receives exactly one row, from its partner. A single row cannot cancel its own tangential part, so both rows must be radial: $\sin\psi=0$ for the row on member 1 and $\sin\psi'=0$ for the row on member 2. Adding the two definitions gives

$$
\psi+\psi'=\omega(\tau+\tau') ,
$$

with $\tau$ and $\tau'$ the two delays. Each of $\psi$ and $\psi'$ is a multiple of $\pi$. A value that is an even multiple of $\pi$ puts the emission point on the receiver's radius, at delay $\lvert R_1-R_2\rvert$; an odd multiple puts it diametrically opposite, at delay $R_1+R_2$. Both delays are at most $R_1+R_2$, so $\omega(\tau+\tau')\le2(\omega R_1+\omega R_2)<4$, and the only positive multiple of $\pi$ available is $\pi$ itself. One row is then on the receiver's radius, which needs unequal radii because the delay $\lvert R_1-R_2\rvert$ must be positive, and the other is diametrically opposite; the delays add to twice the larger radius. So $2\omega R_{\max}=\pi$: the outer member moves at $\pi/2$, above wake speed. That contradicts the assumption.

The same holds when the pair also translates along the rotation axis at speed $u$ with the members at different heights. Each single row must then have no axial part either, which requires $z_1-z_2+u\tau=0$ and $z_2-z_1+u\tau'=0$. Adding gives $u(\tau+\tau')=0$, so $u=0$ and the heights are equal, which is the planar case just excluded.

This extends the [exclusion of the equal-radius circle](../../braid-program/analysis/ring-arbitrary-inventory-low-speed-independent-adjudication-2026-10-03.md#verdict-and-scope) at every speed up to wake speed to unequal radii and to translating pairs. It does not cover motions that are not rigid.

## The balance

The argument above leaves one possibility open when the outer member is above wake speed. Let member 1, the outer and faster one, have speed between $1$ and $\pi$, and let member 2 be below wake speed, with opposite polarities, $\sigma=-1$.

**The slow member.** It receives one row, which must be radial. With the emission point on its own radius the row would point outward, so the emission point is diametrically opposite: $\psi'=\pi$ and $\tau'=R_1+R_2$. The transmitter factor is $1$, and the row is $-1/(R_1+R_2)^2$, inward. The radial condition is

$$
\frac{1}{(R_1+R_2)^2}=\omega^2R_2 .
$$

**The fast member.** By the angle sum, its partner row has $\psi=\omega(\tau+R_1+R_2)-\pi$. Choose the collinear arrangement $\psi=0$: the slow member's emission point lies on the fast member's own radius, at delay $\tau=R_1-R_2$. The angle sum then reads $2\omega R_1=\pi$, so the fast member moves at exactly $\pi/2$. At that speed its own-path root solves $\theta=\pi\sin(\theta/2)$, which gives $\theta=\pi$: its own wake arrives from the diametrically opposite point, at delay $2R_1$. Both of its rows are radial with transmitter factor $1$. The partner row is $-1/(R_1-R_2)^2$, inward, and the own-path row is $+1/(4R_1^2)$, outward. The radial condition is

$$
\frac{1}{(R_1-R_2)^2}-\frac{1}{4R_1^2}=\omega^2R_1 .
$$

**Solving.** Put $R_2=xR_1$ and $\omega=\pi/(2R_1)$. The two radial conditions become

$$
R_1=\frac{4}{\pi^2x(1+x)^2},\qquad R_1=\frac{4}{\pi^2}\Bigl[\frac{1}{(1-x)^2}-\frac14\Bigr] ,
$$

and equating them gives $x(1+x)^2\bigl[4-(1-x)^2\bigr]=4(1-x)^2$, which expands to the quintic in the Result. The left side of that equation rises from $0$ at $x=0$ and the right side falls from $4$ to $0$ at $x=1$, so there is exactly one root in $(0,1)$. The slow member's lead in angle follows from $\psi=0$: it is $\omega(R_1-R_2)=\pi(1-x)/2$.

**Root census.** Four statements complete the proof that these three rows are all the rows.

- The slow member has no own-path root, being below wake speed.
- The fast member has exactly one own-path root, by the convexity argument above, and it is $\theta=\pi$.
- The fast member receives exactly one root from the slow member, because a source below wake speed supplies exactly one.
- The slow member receives exactly one root from the fast member. Here the source is above wake speed, so the general lemma does not apply. Any root has a delay between $R_1-R_2$ and $R_1+R_2$. The function $\tau-d(\tau)$, with $d$ the distance to the emission point, has derivative $1-R_1R_2\,\omega\sin\psi/d$, and $R_1R_2\,\omega/d\le R_1R_2\,\omega/(R_1-R_2)=(\pi/2)\,x/(1-x)=0.712$. The derivative is therefore positive on the whole admissible range, and the root at $\tau'=R_1+R_2$ is the only one.

**Numerical confirmation.** The general all-root evaluator, which scans for every positive-delay root, finds exactly these three rows and a balance residual of $3\times10^{-16}$ relative to the acceleration.

## Is it the only one?

The collinear choice $\psi=0$ is a choice. With $\psi\ne0$ the fast member's partner row has a tangential part, which its own-path row could cancel, and the three conditions that remain have three unknowns, so other isolated balances are not excluded by the argument. Three random searches of about 3,600 starts each, over speeds up to $4\,c_f$ with every causal root included, returned only two opposite-pair balances: this one, and the equal-radius circle at $3.0704\,c_f$ already on record. Higher speeds, where members receive several own-path and partner roots, were not searched.

## Stability

The delayed first variation was assembled for both members, with displacement out of the plane included, giving a six-by-six characteristic matrix. A derived bound confines every root with non-negative real part to $\lvert\lambda\rvert\le5.06\,\omega$. Inside that bound the argument-principle count of roots with real part above $0.00005\,\omega$ is five, and the five were located: $0.8531\,\omega$, $(0.1138\pm1.0071\,i)\,\omega$ and $(0.0256\pm1.7990\,i)\,\omega$.

The equal-radius circle at its first reference also has five growing roots, the fastest at $2.1\,\omega$. The unequal pair grows more slowly relative to its rotation: its fastest mode grows by a factor $e$ in about a fifth of a period, and its slowest in about six periods.

## Independent check

A [separately constructed check](small-exact-balances-independent-adjudication-2026-10-04.md), written from a statement of the claim without this analysis or its instruments, confirms the balance. It re-derived the mechanism and the quintic, proved the three-row census, confirmed the residual at sixty digits, and certified with its own interval test that the closed-form point is the only solution of the full equation within relative distance $10^{-4}$. It proved independently that a pair of this class cannot have both members below wake speed. Its own search for other opposite pairs on unequal circles, over speeds of the fast member up to $8\,c_f$ on a lattice and from about 8,000 starts, returned only this balance.

It confirms five growing roots, at the locations listed above, and strengthens the count: with a contour indented around the neutral roots it finds exactly five roots with positive real part and none on the imaginary axis other than the neutral ones. All five belong to motion in the plane; displacement out of the plane does not grow. The brief it was given quoted a preliminary bisection estimate of the fastest rate, $0.859\,\omega$; it found $0.853142\,\omega$, which is the located value stated in this document. Both analyses were produced within one working session and share the problem statement and the interval library.

## What it means

- **An exact solution can be written down by hand.** Every other exact moving solution on record is the zero of a transcendental system located numerically. This one reduces to a quintic because all its delays are collinear with the centre.
- **A two-member balance needs one member above wake speed, and the other may be below.** Statement 2 shows the need. The slow member here is at $0.49\,c_f$ and receives no wake of its own. It is held by the faster partner alone.
- **The fast member's own wake pushes it outward.** Its own-path row is $0.439$ against the partner's pull of $3.708$, in units of $c_f^4/K$, so it removes about an eighth of the inward acceleration. Unlike the [charged trimer](../../braid-program/analysis/charged-trimer-above-wake-speed.md), where the own wake supplies a forward push, here it has no tangential part at all.
- **It is unstable, like every other exact balance examined.** Five growing roots is the smallest count on record, shared with the equal-radius circle.

## Limits and falsifiers

The like-polarity exclusion is a hand derivation with no second reading. The exclusions cover rigid rotation, with or without axial translation, and nothing else. Uniqueness is certified only near the solution; elsewhere it rests on two float searches, not a proof. The stability count is a float measurement of formal modes; the bound that makes it complete uses float matrix norms.

A fourth causal root for either member at the stated parameters, a nonzero tangential or radial residual there, or a second root of the quintic in $(0,1)$ would refute the balance. A like-polarity pair or a pair below wake speed that balances in rigid rotation would refute the exclusions. A characteristic determinant that does not vanish at the listed roots, or a different count inside the bound, would refute the stability result.

## Instruments

The search, the all-root evaluator, the characteristic matrix and the root bound are in `rigid.py`, `search.py`, `fewbody.py` and `locate.py` in `.local-data/master-equation-closure/geometry-session-20261004/`. Their controls, run before any target, are recorded in the [search analysis](../../braid-program/analysis/rigid-balance-search-2026-10-04.md#instruments-and-controls).
