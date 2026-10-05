# Complete opposite derivative enclosure: frozen protocol

Status: frozen before the new interval target, 2026-10-05. The mathematical subject is $\partial_yG$ in Section 4 of the [independent analytical reference](alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-independent-analytic-reference.md), SHA-256 `85a17a66c5c9c8e6812b90b21881a1600e2dd0274106784dce3b6cd7b39757da`. The complete target rectangle is $x\in[0,3/4]$, $y=m^2\in[0,36]$. The upper angle is an analytic enclosing extension; the physical theorem is restricted to $x/\cos x<1$. Every selected law coefficient, physical source derivative and complete source census is unchanged.

## Mathematical sufficiency

A strictly positive enclosure of $\partial_yG$ on every point of this rectangle, together with the exact value $G(0,x)=-1$, the separately certified $G(1,x)>0$ for $x>0$, and the independent $|m|\ge6$ inverse, proves exactly one positive opposite real frequency, lying below one and simple. Negative derivative samples alone would not prove another root. Every unproved box remains unresolved, and no partial cover is a complete certificate.

## Outward arithmetic and entire-function enclosures

Import the unchanged rational-grid interval arithmetic from the earlier independent Cartesian interval reference (source SHA-256 `43c7da211120330a76f1e8030d9b211667845329d807df08f61e77e4135ee01b`, arithmetic SHA-256 `874c3db24a7f5a12f640b8c6b4a30b32c5b453fabd550f3b9478a744781c9c03`). It rounds outward after each arithmetic operation to a rational grid of step $10^{-45}$. Its midpoint Taylor sine/cosine enclosure supplies $\sin x,\cos x$.

Put $z=4x^2y\in[0,81]$. Evaluate the exact rational Taylor polynomials through term $j=40$ for

$$
C(z)=\sum_{j\ge0}\frac{(-1)^jz^j}{(2j)!},\quad S(z)=\sum_{j\ge0}\frac{(-1)^jz^j}{(2j+1)!},\quad T(z)=2\sum_{j\ge0}\frac{(-1)^jz^j}{(2j+2)!}
$$

and their first $z$ derivatives at the exact interval midpoint. The absolute first omitted term bounds each alternating tail, including the derivative tail: from $j=41$ onwards the consecutive absolute-term ratios are less than one throughout $0\le z\le81$. At zero the polynomial and differentiated polynomial are evaluated through the ordinary recurrence. No subtraction quotient divides by an interval containing zero.

Expand the midpoint enclosures to the entire interval by the mean-value theorem. Global derivative bounds are

$$
|C'|\le\tfrac12,\quad |S'|\le\tfrac16,\quad |T'|\le\tfrac1{12},\quad |C''|\le\tfrac1{12},\quad |S''|\le\tfrac1{60},\quad |T''|\le\tfrac1{180}.
$$

These are derived from $C'=-S/2$, $S(z)=\int_0^1\cos(t\sqrt z)\,dt$, and $T(z)=2\int_0^1(1-t)\cos(t\sqrt z)\,dt$. In particular, $S'=-\tfrac12\int_0^1t^2\operatorname{sinc}(t\sqrt z)\,dt$ and differentiating once more introduces $\tfrac14\int_0^1\int_0^1 t^4u^2\operatorname{sinc}(tu\sqrt z)\,du\,dt$. The corresponding $T$ integrals give $1/12$ and $1/180$.

For an interval with lower endpoint $z_0>0$, let $s_0=\min(1,1/\sqrt{z_0})$ and $t_0=\min(1,4/z_0)$, using an outward upper bound for $s_0$. The following independently derived improvements may be intersected with the global constants:

$$
|C'|\le s_0/2,\quad |S'|\le\frac{1+s_0}{2z_0},\quad |T'|\le\frac{s_0+t_0}{z_0},
$$

$$
|S''|\le\frac{s_0}{4z_0}+\frac{3(1+s_0)}{4z_0^2},\qquad |T''|\le\frac{1/2+(5/2)s_0+2t_0}{z_0^2}.
$$

They follow from $S'=(C-S)/(2z)$, $T'=(S-T)/z$, $S''=-S/(4z)-3(C-S)/(4z^2)$ and $T''=S'/z-2(S-T)/z^2$. Exact $y$ derivatives multiply the resulting $z$ derivative intervals by $4x^2$. All coefficient and signed-product operations in $G$ and $\partial_yG$ remain interval operations.

## Known cases before target

The instrument must record a known pass before any target: exact zero-speed $G=y-1$ and $\partial_yG=1$ at rational points; exact nonzero-speed phase value $G(0,x)=-1$ enclosed; rational alternating sine/cosine controls inherited from the independent reference; elementary entire-function values and derivatives at $z=0$; and overlap of $yG$ with independently assembled Cartesian determinants at rational nonzero angles and frequencies. The current subject does not import its floating diagnostic as a reference. Derivative identities are justified by the frozen mathematics above, not by numerical parity.

## Complete dyadic cover and guards

The root partition has 128 closed rectangles: $x\in[3i/32,3(i+1)/32]$, $i=0,\ldots,7$, and $y\in[9j/4,9(j+1)/4]$, $j=0,\ldots,15$. A box is certified only if the rational lower endpoint of its $\partial_yG$ enclosure is strictly positive. Otherwise bisect its longer normalized side, comparing $(x_{hi}-x_{lo})/(3/4)$ with $(y_{hi}-y_{lo})/36$ and choosing $x$ on a tie. Use exact rational midpoints and record root index plus binary child path. Children cover the complete parent, including their shared boundary.

The instrument retains every certified leaf and every pending or unresolved leaf with exact box bounds. A separate structural audit reconstructs each box from its root and path, checks every recorded bound, rejects duplicate or prefix-overlapping leaves, and requires both children at every internal node. Thus certified plus pending leaves cover the exact rectangle even when a guard fires. A successful complete certificate additionally requires no pending leaf and a positive lower enclosure for every leaf.

Run a watched pilot capped at 120 elapsed seconds or 6,000 evaluated boxes, whichever occurs first. Maximum path depth is 30. Exceptions, nonpositive upper bounds and guard outcomes are retained; no box is silently dropped. The pilot is not interpreted as a full cover unless its queue empties. A subsequent target may resume the frozen pilot queue and certified leaves only after checking source hashes and the structural cover audit. Its additional runtime is capped at 900 seconds or 100,000 evaluated boxes, whichever occurs first, and it retains the same depth guard. Progress is printed at least every 15 elapsed seconds. The root receives the frozen implementation and known receipt before the pilot; a full target follows measured pilot review. Stop new computation by the science cutoff regardless of remaining queue.

Falsifiers: a Taylor tail ratio or derivative bound failure; a non-outward arithmetic operation; loss of a signed coefficient; disagreement with direct Cartesian assembly; a recorded box not matching its dyadic path; missing siblings or uncovered roots; a claimed-positive box with nonpositive exact derivative; or reporting success with any pending box. No elapsed-time or sampled-value claim replaces these mathematical obligations.
