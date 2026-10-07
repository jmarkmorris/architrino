# Slow-motion expansion of the extrapolated-line-of-action proposal for the delayed Weber pair

**Status: expansion completed 2026-10-06; self-reviewed, not separately adjudicated; no trajectory was evolved.** This document carries out the one calculation the operator approved for proposal P1 of the [adaptation proposals](weber-delayed-pair-adaptation-proposals.md#proposal-p1-weber-bracket-on-an-extrapolated-line-of-action). Its result is negative for binding: the proposal removes the first-order forward push, as intended, and leaves a third-order forward push, so the pair still expands, far more slowly. All numerical values use $c_f=K=1$; $c_f$ is kept symbolic where its order matters.

## Approval and scope

On 2026-10-06 the launching session offered, as its first next action, to "approve the P1 slow-motion expansion, by hand, with no evolution", stating that P1 is a new variant requiring an explicit yes. The operator replied "do 1 2 and 3". The approval covers the slow-motion expansion of P1 and evaluation of its formulas on prescribed histories. It does not cover evolving any history under P1, nor proposals P2 and P3, which remain unapproved. The [canonical Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) is the baseline; [Section 9a](../../equation-variants/manuscript.md#9a-selected-delayed-weber-adaptation) is the law P1 modifies; the [delayed pair investigation](weber-delayed-pair-investigation.md) supplies the expansion method and the result that motivates P1.

## 1. The proposal

Section 9a assigns to each ordinary causal root an acceleration contribution along the line of action $\mathbf n$, which points from the transmitter's emission position to the receiver. P1 changes only that direction. With $\mathbf w=\mathbf V_j(S)$ the transmitter's velocity at emission, it uses

$$
\tilde{\mathbf n}=\frac{\mathbf n-\mathbf w/c_f}{\|\mathbf n-\mathbf w/c_f\|},
\qquad
\mathbf A_i=\sum_j\sum_{S}\frac{\sigma_{ij}Kc_f}{\mathscr R^2|D_t|}\left[1-\frac{\dot{\mathscr R}^2}{2c_f^2}+\frac{\mathscr R\ddot{\mathscr R}}{c_f^2}\right]\tilde{\mathbf n}.
$$

The vector $\mathbf n-\mathbf w/c_f$ points from where the transmitter would be at reception time, had it kept its emission velocity, to the receiver. The delayed range $\mathscr R$, the transmitter factor $D_t$, the bracket and every other clause of Section 9a are unchanged, and the bracket's derivatives still use $\mathbf n$.

## 2. Expansion of the direction

Let $r$ be the present separation, $\mathbf e$ the present unit direction from transmitter to receiver, and $\mathbf v$, $\mathbf a$, $\mathbf j$ the transmitter's present velocity, acceleration and rate of change of acceleration. Count orders by a speed ratio $\epsilon$, with $\|\mathbf v\|/c_f\sim\epsilon$, $r\|\mathbf a\|/c_f^2\sim\epsilon^2$ and $r^2\|\mathbf j\|/c_f^3\sim\epsilon^3$, which is the ordering on any slow bound history. Write $u=\mathbf e\cdot\mathbf v/c_f$ and let the subscript $\perp$ denote the part of a vector perpendicular to $\mathbf e$.

Expanding the transmitter's history about the reception time, with delay $\tau=\mathscr R/c_f$,

$$
\mathbf X_i(T)-\mathbf X_j(S)-\mathbf w\,\tau
= r\mathbf e+\tfrac12\mathbf a\,\tau^2-\tfrac13\mathbf j\,\tau^3+O(\epsilon^4r).
$$

The terms in $\mathbf v\tau$ cancel exactly: that cancellation is the purpose of the extrapolation. Using $\tau=(r/c_f)(1+u)+O(\epsilon^2)$ and normalizing,

$$
\boxed{
\tilde{\mathbf n}_\perp=\frac{r}{2c_f^2}\,\mathbf a_\perp\,(1+2u)-\frac{r^2}{3c_f^3}\,\mathbf j_\perp+O(\epsilon^4).
}
\tag{2.1}
$$

The extrapolated direction therefore has no first-order transverse part on any history. Its second-order transverse part is set by the transmitter's transverse acceleration and its third-order part by the transverse rate of change of acceleration.

For the prefactor, $\mathscr R=r(1+u)+O(\epsilon^2)$ and $c_f/D_t=1+u+O(\epsilon^2)$, so

$$
\frac{\sigma Kc_f}{\mathscr R^2|D_t|}\,\tilde{\mathbf n}=\frac{\sigma K}{r^2}\,(1-u)\,\mathbf e+O(\epsilon^2).
\tag{2.2}
$$

Compare the canonical prefactor of [Theorem 4.1 of the investigation](weber-delayed-pair-investigation.md#4-slow-motion-expansion-and-the-first-departure-from-section-9), $\sigma K[\mathbf e+(\mathbf v-2(\mathbf e\cdot\mathbf v)\mathbf e)/c_f]/r^2$. The two have the same first-order radial term and differ by exactly the transverse term $\sigma K\mathbf v_\perp/(r^2c_f)$, which is the forward push that unbinds the pair under Section 9a and under the canonical law.

Claim grade: derived, by Taylor expansion on a history with three continuous derivatives. Falsifier: a smooth prescribed history on which the transverse part of the P1 prefactor does not vanish at first order, or on which (2.1) fails at the stated order.

## 3. Consequences for one opposite-polarity pair

Take the mirror pair in its centre frame, with relative separation vector $r\mathbf e$, angular rate $\omega$ and angular quantity $h=r^2\omega$. The partner of member $i$ sits at $-r\mathbf e/2$.

**First order: radial damping and nothing else.** For the mirror pair $u=-\dot r/(2c_f)$, so (2.2) gives the relative equation

$$
\ddot r-\frac{h^2}{r^3}=-\frac{2K}{r^2}-\frac{K}{r^2c_f}\,\dot r,\qquad \dot h=0,
$$

through first order. The last term opposes the radial velocity. With $E=\tfrac12\dot r^2+h^2/(2r^2)-2K/r$ one finds $dE/dT=-K\dot r^2/(r^2c_f)\le0$, so radial oscillation decays toward the circle $r=h^2/(2K)$ at fixed $h$. On a near-circular orbit with member speed $\beta c_f$ the oscillation amplitude falls by the factor $e^{-\pi\beta}$ per revolution. This damping is not new to P1: the canonical prefactor has the same radial term. Under the canonical law and Section 9a it is accompanied by a forward push of the same order; under P1 it stands alone. **Derived** at first order; the statement about relaxation is **inferred** from the first-order equation and is not a theorem about the full neutral delay equation.

**Second order: no tangential term.** By (2.1) the second-order transverse direction is proportional to the partner's transverse acceleration, which for the pair is $-\dot h/(2r)$ along the orbital direction. Since $\dot h$ vanishes through second order, this term feeds back only at higher order. The Weber bracket multiplies $\tilde{\mathbf n}$ and so cannot create a transverse component; it changes the radial dynamics at second order exactly as in Section 9. **Derived.**

**Third order: a forward push.** The partner's transverse rate of change of acceleration is $-\tfrac12(\ddot r-r\omega^2)\omega=K\omega/r^2$ at leading order, for any orbit shape, because $\ddot r-r\omega^2=-2K/r^2$ at that order. Equation (2.1) then tilts the direction backward by $K\omega/(3c_f^3)$, and with $\sigma=-1$ each member receives

$$
\boxed{A_{i,\theta}=+\frac{K^2\omega}{3\,r^2c_f^3}\,\big(1+O(\epsilon)\big),\qquad \frac{dh}{dT}=\frac{2K^2}{3c_f^3}\,\frac{h}{r^3}>0 .}
\tag{3.1}
$$

The angular quantity grows on every slow orbit. **Derived** as a leading-order statement.

**Exact circle.** On a rigid circle every delayed range is constant, so the bracket is exactly one, as in [Theorem 3.1 of the investigation](weber-delayed-pair-investigation.md#3-rigid-rotation). With the root parameter $\xi=\beta\cos\xi$ of the mirror circle, $\mathbf n-\mathbf w=(\cos\xi+\beta\sin2\xi)\,\mathbf e_r-(\sin\xi-\beta\cos2\xi)\,\mathbf e_\theta$, and the tangential acceleration of a member of the opposite-polarity pair is exactly

$$
A_\theta=\frac{K\,(\sin\xi-\beta\cos2\xi)}{4R_0^2\cos^2\xi\,(1+\beta\sin\xi)\,\|\mathbf n-\mathbf w\|}.
$$

The numerator is the one that appears in the [amplitude-gradient circle comparison](../../analysis/amplitude-gradient-regular-pair-investigation.md#7-exact-accelerated-circle-the-push-is-cubic-not-absent), where it is proved strictly positive for $0<\beta<1$; every other factor is positive. Hence P1 admits no exact uniform circle at any strictly subfield speed, and its leading residual is

$$
A_\theta=\frac{K\beta^3}{3R_0^2}\,\big(1+O(\beta^2)\big),
$$

the same leading coefficient as the amplitude-gradient row. **Derived**, using the adjudicated positivity lemma.

**Secular estimate.** Applying the slow-drift estimate that reproduces the adjudicated canonical and amplitude-gradient rates, the near-circular pair under P1 has

$$
\frac{d(R_0^3)}{dT}=\frac{K^2}{2c_f^3},
$$

so the radius grows without bound as the cube root of time. Per revolution the fractional growth is $(16\pi/3)\beta^3$, against the circularization factor $e^{-\pi\beta}$. A pair at member speed $\beta$ needs about $0.14/\beta^3$ revolutions to double its radius under P1, against about $0.12/\beta$ under the canonical law or Section 9a. **Inferred**; a controlled statement would need the remainder analysis given to the amplitude-gradient pair.

## 4. Verdict

| Question put to the expansion | Answer | Grade |
| --- | --- | --- |
| Does the first-order forward push vanish? | Yes, on every history; the first-order term is purely radial | Derived, checked numerically |
| What sign has the next tangential term? | Forward, at third order, with coefficient $+\tfrac13$ on the circle | Derived, checked numerically |
| Does an exact subfield circle exist? | No, at any $0<\beta<1$ | Derived |
| Does the Weber bracket affect the leading drift? | No; it is one on the circle and multiplies a direction with no lower-order transverse part | Derived |
| Is the pair bound under P1? | No. It circularizes at first order and then expands as $R_0^3\propto T$ | Inferred |

P1 therefore does what it was designed to do and does not restore a bound class. It converts a first-order dispersal into a third-order one. Relative to Section 9a the lifetime of a slow pair lengthens by a factor of order $1/\beta^2$.

## 5. What the result indicates

Three results now fix the leading tangential term on the slow mirror circle for laws that point along an extrapolated or present direction, in units of $K\beta^3/R_0^2$: $+\tfrac13$ for the amplitude-gradient row, $+\tfrac13$ for P1, and $-\tfrac23$ for the complete Maxwell-shaped transmitter row of the [yardstick ledger](../../analysis/maxwell-yardstick-ledger-2026-10-04.md#34-uniform-circle-and-regular-alternating-rings). The first two are radial about the extrapolated position. The third adds a term driven by the transmitter's delayed acceleration and directed across the line of action, and that term alone accounts for the change of sign. **Inferred** from comparing the three formulas: no law that is purely radial about the extrapolated position, whatever scalar factor multiplies it, can have a third-order tangential term other than the one fixed by (2.1), because the factor multiplies a direction whose transverse part is already determined. A scalar bracket can no more remove the third-order push under P1 than it could remove the first-order push under Section 9a.

This narrows what a binding delayed law would need. It must contain an acceleration contribution across the extrapolated line of action, of third order on a circle and opposing the orbital motion. The Maxwell-shaped row has one and overshoots, giving contraction. Any intermediate strength would be a coefficient chosen to produce the answer, and is recorded here as an observation, not a proposal.

Proposal P2 places the Weber bracket on the Maxwell-shaped velocity prefactor. By the same argument its leading circle term is that prefactor's own, since the bracket is one on the circle, and the Maxwell-shaped velocity part without its acceleration part is radial about the extrapolated position. Proposal P3 cancels only the first-order term by construction and leaves the third-order question open. Neither is approved, and this document does not examine them.

## 6. Falsifiers

- A smooth prescribed history on which the transverse part of the P1 prefactor scales as the first power of the speed ratio.
- A slow mirror circle on which the P1 tangential acceleration divided by $K\beta^3/R_0^2$ does not approach $+\tfrac13$.
- A zero of the exact P1 tangential residual on $0<\beta<1$.
- A slow non-circular mirror orbit on which the leading P1 tangential acceleration differs from $K^2\omega/(3r^2c_f^3)$.

## Development and validation record

The expansion and the pair consequences were derived by hand in the session that wrote this document. The instrument [weber-delayed-p1-expansion-check.mjs](../evidence/weber-delayed-p1-expansion-check.mjs), run with Node, root-solves the causal equation on prescribed histories and evaluates the canonical and P1 prefactors directly. It evolves nothing.

Its known cases were run before its targets and passed. The canonical mirror circle gives tangential acceleration over $\beta$ equal to $0.249933$ and $0.249983$ at $\beta=0.02$ and $0.01$, against the adjudicated leading value $\tfrac14$. The canonical first-order formula leaves a remainder that falls by the factors $0.242$ and $0.246$ under successive halving of the speed scale on a generic prescribed history, as a second-order remainder should. The canonical forward push on a Kepler mirror pair equals its first-order formula to $0.7\%$ at member speed $0.02$.

On the targets, the remainder of prediction (2.1) on the generic history falls by the factors $0.060$, $0.061$ and $0.062$ under successive halving, against $\tfrac1{16}$ for a fourth-order remainder. At speed scale $0.005$ the transverse part of the P1 prefactor is $5.5\times10^{-7}$ where the canonical first-order transverse term is about $1.2\times10^{-3}$. That transverse part does not fall monotonically at the larger speed scales, because on this history its second- and third-order contributions have opposite signs; the remainder of (2.1) is the clean test. On the mirror circle the direction's tangential part over $\beta^3$ is $-1.33295$ at $\beta=0.01$, against $-\tfrac43$, and the P1 tangential acceleration over $\beta^3$ is $+0.33324$, against $+\tfrac13$; on a grid of step $0.001$ over $0<\beta<1$ the tangential residual is positive at every point. On Kepler mirror pairs of eccentricity $0.3$ at three phases, the P1 tangential acceleration divided by $K^2\omega/(3r^2)$ is within $3.5\%$ of one at member speeds from $0.04$ to $0.065$ and within $0.8\%$ at speeds from $0.010$ to $0.016$, approaching one as the speed falls.

These are double-precision evaluations on prescribed histories. They check the algebra of the expansion. They establish no coupled evolution, no stability property and no fate, and the secular estimate of Section 3 has no instrument behind it.
