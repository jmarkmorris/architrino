# Necessary alternating polarity on the equal-radius boundary

## Statement

Claim grade: derived, pending independent reconstruction. Consider the complete equal-radius circular histories of three fixed neutral antipodal unit-polarity pairs with six distinct present positions, $K_{\log}=c_f=1$, unchanged transmitter factor and common speed $0<v\le1$. If the complete circular equations hold, the six member polarities must alternate around the circle. Equivalently, the three positive endpoints cannot lie in any closed semicircle. This excludes nonalternating angular arrangements; it does not prove existence or exclude the remaining alternating, nonuniform arrangements.

The result concerns the equal-radius boundary of C's strictly ordered class. Extending it to nearby unequal radii would require a uniform quantitative margin on a declared region. No such neighborhood is inferred merely from a pointwise boundary sign.

## Strictly ordered radial reception

Use the [complete angle chart](overnight2-c-equal-radius-next-step.md). Let $\beta\in(0,2\pi)$ be the present clockwise source separation from a receiver and let $\alpha$ solve

$$
\beta=\alpha-2v\sin(\alpha/2),\qquad
D=1-v\cos(\alpha/2)>0.
$$

Define the unsigned radial factor

$$
R_v(\beta)=\frac1{1-v\cos(\alpha(\beta)/2)}.
$$

Since $d\alpha/d\beta=1/D$ and $0<\alpha<2\pi$,

$$
R_v'(\beta)=-\frac{v\sin(\alpha/2)}{2D^3}<0.
$$

Thus the radial contribution of a unit polarity product is $R_v(\beta)/(2a)$, strictly decreasing as the present clockwise separation increases. This comparison remains strict at $v=1$ for every distinct partner because its root is ordinary and $\alpha>0$.

A positive source at separation $0<\beta<\pi$ has a negative antipode at $\beta+\pi$, and their combined radial contribution to a positive receiver is

$$
\frac{R_v(\beta)-R_v(\beta+\pi)}{2a}>0.
$$

If instead $\pi<\beta<2\pi$, that negative antipode lies at $\beta-\pi$, and the same pair contributes a strictly negative radial quantity. The receiver's own negative antipode always contributes the common value $-R_v(\pi)/(2a)$.

## Earliest and latest phases contradict equal acceleration

Suppose the three positive endpoints lie in a closed semicircle. No two may differ by exactly $\pi$, because one would coincide with the other's negative endpoint. Choose unwrapped phases whose span is therefore strictly less than $\pi$, and let $i_-$ and $i_+$ be the smallest-phase and largest-phase positive endpoints.

At receiver $i_+$, each other positive endpoint lies clockwise less than $\pi$ away. Each of its two other neutral pairs therefore supplies a positive radial contribution. Hence

$$
A_{i_+,r}>-\frac{R_v(\pi)}{2a}.
$$

At receiver $i_-$, each other positive endpoint lies clockwise more than $\pi$ away. Both other pair contributions are negative, giving

$$
A_{i_-,r}<-\frac{R_v(\pi)}{2a}.
$$

The two radial accelerations cannot be equal. Exact common-radius circular motion would require both to equal $-v^2/a$. Thus no such configuration is exact, independently of its tangential equations. All five partner rows at both receivers were included; no positive self root exists for $v\le1$.

## Equivalence to alternating cyclic polarity

Place the three positive endpoint phases in cyclic order and let their successive positive-to-positive gaps be $A,B,C$, with $A+B+C=2\pi$. Distinctness excludes a gap of $\pi$. They fit in a semicircle exactly when one cyclic gap exceeds $\pi$: its complementary arc then contains all three, and conversely an enclosing semicircle leaves such a complementary gap.

If all three gaps are less than $\pi$, exactly one negative endpoint lies in each positive-to-positive gap. For example, after putting one positive endpoint at zero and the next at $A$, the antipode of the third positive endpoint has phase $A+B-\pi$. The inequalities $C<\pi$ and $B<\pi$ give $0<A+B-\pi<A$. The antipodes of the gap's endpoints do not lie in that gap because $A<\pi$. Applying the same argument cyclically yields alternating signs around the circle. If a positive-to-positive gap exceeds $\pi$, the complementary semicircle contains three positive endpoints and cannot have alternating signs throughout the six-member circle. This establishes the equivalence.

The static case $v=0$ is separately excluded by the radial sum $-1/(2a)\ne0$; it is not obtained by treating the strict derivative above as nonzero at zero speed.

## Evidence boundary

The decisive ingredients are the complete angle chart, strict radial-factor derivative, pairing of every opposite endpoint and equal required radial accelerations. A reversed clockwise convention, a sign error in either paired contribution, an overlooked coincident label, or a nonalternating exact equal-radius configuration would falsify the claim. Independent reconstruction is required before this result enters the checked synthesis. There is no numerical target, stability spectrum or actual-time continuation premise.
