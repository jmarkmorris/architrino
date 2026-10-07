# Independent reconstruction of the equal-radius polarity-order restriction

## Verdict and assumptions

**Derived verdict:** the [frozen polarity-order theorem](overnight2-c-equal-radius-polarity-order.md) is correct. Any exact complete circular configuration of three neutral antipodal unit-polarity pairs with a common radius $a>0$, six distinct simultaneous positions, and $0<v=ua\le1$ must have alternating cyclic polarities. The selected logarithmic equation remains $K_{\log}=c_f=1$ with the unchanged transmitter factor and every ordinary positive-delay hit. The theorem excludes all nonalternating equal-radius configurations using radial equations alone. It neither admits nor excludes the remaining alternating configurations.

The proof below reconstructs the ordering obstruction from the independently reviewed [complete causal-angle chart](overnight2-c-equal-radius-chart-independent-review.md). No numerical sampling or shared numerical oracle enters. No defect was found. The result does not supply a quantitative neighborhood in unequal-radius space, a stability verdict, or actual-time dynamics.

## Radial ordering from the causal equation

Place a positive receiver at angular phase zero and measure present source separation clockwise by $\beta\in(0,2\pi)$. The complete partner root is represented by the unique emission separation $\alpha\in(0,2\pi)$ satisfying

$$
\beta=H_v(\alpha)=\alpha-2v\sin(\alpha/2),\qquad
D=1-v\cos(\alpha/2)>0.
$$

The chart's geometric derivation gives $\tau=2a\sin(\alpha/2)$ and outward chord component $n_r=\sin(\alpha/2)$. Thus the logarithmic radial row is $q_iq_j/(2aD)$. Define $R_v(\beta)=D^{-1}$. Differentiating the causal equation first gives $d\alpha/d\beta=D^{-1}$; differentiating $D$ with respect to $\alpha$ gives $(v/2)\sin(\alpha/2)$. Therefore

$$
\frac{dR_v}{d\beta}
=-\frac{v\sin(\alpha/2)}{2D^3}<0.
$$

All factors establishing strictness are positive for $0<v\le1$ and $0<\alpha<2\pi$. At $v=1$ the only zero of $D$ is at the excluded endpoint $\alpha=0$, so no ordinary partner comparison loses strictness there. At $v=0$ the derivative is zero and this strict ordering argument is unavailable.

Now group the five sources seen by a positive receiver into its own negative partner and the other two neutral pairs. Its own negative partner has present separation $\pi$ and radial contribution $-R_v(\pi)/(2a)$, identical at every positive receiver. If a different positive source has $0<\beta<\pi$, its negative antipode has separation $\beta+\pi$; that complete pair contributes

$$
P_v(\beta)=\frac{R_v(\beta)-R_v(\beta+\pi)}{2a}>0.
$$

If instead $\pi<\beta<2\pi$, its negative antipode has separation $\beta-\pi$ and

$$
P_v(\beta)=\frac{R_v(\beta)-R_v(\beta-\pi)}{2a}<0.
$$

The signs follow solely from strict monotonicity. They do not assume equal delays for antipodal sources or complementary emission angles. The positive-source separation cannot equal zero by distinctness; it cannot equal $\pi$ because that would place the positive source at the receiver's negative partner. Consequently every pair used here has one of these strict signs.

## Enclosing semicircle gives incompatible radial accelerations

Suppose all three positive endpoints lie in some closed semicircle. Choose counterclockwise unwrapped positive phases $\theta_-<\theta_0<\theta_+$. Their span is at most $\pi$; equality is impossible because the two extreme positive endpoints would be antipodal and coincide with opposite-polarity labels. Hence $0<\theta_+-\theta_-<\pi$.

At the maximum-phase receiver, both other positive endpoints have clockwise separation in $(0,\pi)$. At the minimum-phase receiver, the same separations are represented in $(\pi,2\pi)$. The complete five-row radial sums therefore satisfy

$$
A_{+,r}>-\frac{R_v(\pi)}{2a},\qquad
A_{-,r}<-\frac{R_v(\pi)}{2a}.
$$

In particular $A_{+,r}>A_{-,r}$, whereas common-radius common-rate circular motion requires both to equal $-u^2a=-v^2/a$. This is a contradiction regardless of the value of that common required acceleration and regardless of the tangential equations. All five directed partner hits at each receiver enter the two pair sums and own-partner term. The complete chart proves there are no additional positive self hits for $v\le1$.

## Proving the cyclic-polarity equivalence

Let $A,B,C>0$ be the successive counterclockwise positive-to-positive gaps, with $A+B+C=2\pi$. Distinctness of all six labels excludes any gap equal to $\pi$, since its endpoints would be antipodal positives. The positives lie in a semicircle if and only if some gap exceeds $\pi$: a gap exceeding $\pi$ leaves its complementary containing arc shorter than $\pi$; conversely the complementary gap outside an enclosing arc is at least $\pi$, and equality is excluded.

If no gap exceeds $\pi$, all three are smaller than $\pi$. Put one positive endpoint at zero, the next at $A$, and the third at $A+B$. Because $C<\pi$, the third endpoint's negative antipode has phase $A+B-\pi>0$. Because $B<\pi$, that phase is less than $A$. Thus it lies in the gap $(0,A)$. The antipodes of the two endpoints of this gap are outside the gap because $A<\pi$. Exactly one negative endpoint is therefore inside it. Cyclic application proves exactly one negative endpoint in every positive-to-positive gap, which is precisely alternating cyclic polarity.

For an explicit converse check, suppose $A>\pi$ and use the same phase placement. All three negative phases lie in $(0,A)$: they are $\pi$, $A-\pi$, and $A+B-\pi$. The gap contains no positive endpoint by definition, so this order cannot alternate. This also rules out an unnoticed nonalternating arrangement whose positive phases evade every semicircle. Persistent pair labels are preserved throughout; no polarity reassignment was used.

## Controls, limitations, and falsifiers

Hand-derived controls are sufficient for this analytic review. The regular alternating hexagon has positive-to-positive gaps $2\pi/3$, and the gap argument inserts exactly one negative endpoint in each gap. Three positives at phases $0,\pi/6,\pi/3$ fit inside a semicircle; at the last phase both other pair radial sums are positive, and at phase zero both are negative, as the general proof requires. These examples check the angular convention; they are not numerical equilibrium evaluations. At $v=0$, neutrality instead gives radial sum $-1/(2a)$ at every receiver, incompatible with zero prescribed circular acceleration; the static exclusion is separate from the strict derivative argument.

The proof is pointwise and does not itself bound its strict margin uniformly as speed, phases, or radius vary. A neighborhood exclusion in unequal-radius space requires an additional continuity and uniform-margin argument on a specified set. A sign diagnostic over finitely many linked phases would remain measured sample evidence and would not prove the alternating remainder empty.

A counterexample to monotonicity of $R_v$ within the complete ordinary chart, a reversal of either paired radial sign under the stated clockwise convention, a nonalternating antipodal arrangement with no enclosing positive semicircle, or an exact nonalternating equal-radius solution would falsify the result. Removing distinctness, antipodal pairing, common radius/rate, unit opposite polarities, or the speed bound changes the assumptions and does not test this theorem.

## Provenance and execution

This review was separately authored after the subject was frozen. The source identity measured with `shasum -a 256` was `fcbe167c4b026db38657ab46453d5592f62aeedc892c7af31debe8082cfd5700`. Only this new review was written; the subject, previous reviews, main C report, shared owners, and production sources were preserved. No Python instrument, numerical target, interval cover, background job, Git mutation, or recursive delegation was used.

The existing second-allocation limits remain launch 2026-10-07 03:25:15 UTC, exploration stop 13:55:15 UTC, hard deadline 15:25:15 UTC. Parent integration remains separate from this independent theorem verdict.
