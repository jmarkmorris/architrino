# Independent reconstruction of the equal-radius wake-speed exclusion

## Verdict and assumptions

**Derived verdict:** the [frozen wake-speed boundary theorem](overnight2-c-equal-radius-wake-exclusion.md) is correct. No exact circular configuration of three neutral antipodal unit-polarity pairs can have a common radius $a>0$, distinct simultaneous member positions, and common speed $v=1$, under the selected logarithmic equation with $K_{\log}=c_f=1$, unchanged transmitter factor, and complete infinite circular histories. The exclusion covers arbitrary phases. The qualitative exclusion of exact ordered-radius sequences simultaneously approaching $r_3=1$ and $\omega r_3=1$ is also supported, conditional on the previously independently reconstructed uniform-separation and closed-subfield root-continuity results. No defect was found.

The proof below independently reconstructs the curvature, three-cycle obstruction, complete radial indexing, and regular-case inequality. It neither excludes all strictly subfield equal-radius configurations nor establishes stability, a numerical neighborhood width, or a superfield continuation rule.

## Reconstructing the radial curvature

Fix positive rotation and clockwise present partner separation $\beta\in(0,2\pi)$. The independently checked complete angle chart gives $\alpha\in(0,2\pi)$ as the unique solution of $\beta=\alpha-2v\sin(\alpha/2)$. Write $x=\alpha/2$, $s=\sin x>0$, $c=\cos x$, and $D=1-vc>0$. Then $d\beta/dx=2D$, and $R_v(\beta)=D^{-1}$ obeys

$$
R_v'(\beta)=-\frac{v s}{2D^3},\qquad
R_v''(\beta)=-\frac{v(cD-3vs^2)}{4D^5}
=-\frac{v(c+2vc^2-3v)}{4D^5}.
$$

This derivation first differentiates $R_v$ with respect to $x$ and then multiplies by $dx/d\beta=1/(2D)$ at each step. At $v=1$ it reduces to

$$
R'=-\frac{s}{2D^3}<0,\qquad
R''=\frac{3-c-2c^2}{4D^5}
=\frac{(1-c)(2c+3)}{4D^5}>0.
$$

Indeed $-1<c<1$, so $1-c>0$ and $2c+3>1$. Hence $R$ is strictly decreasing and strictly convex on the entire open present-angle interval. For $0<t<\pi$, define $P(t)=R(t)-R(t+\pi)$. Strict convexity makes $R'$ strictly increasing and therefore

$$
P'(t)=R'(t)-R'(t+\pi)<0.
$$

Thus $P$ is strictly decreasing and invertible onto its actual image. No derivative bound at an excluded coincidence is needed. As a hand control, at emission angle $\alpha=\pi$ one has $\beta=\pi-2$, $s=D=1$, $c=0$, $R=1$, $R'=-1/2$, and $R''=3/4$, consistent with the unfactored and factored formulas.

## Complete rows and radial equations from the original paths

The original paths are $X_{k,\pm}(t)=\pm a\exp(i(ut+\phi_k))$ for all real times, with $ua=1$ and corresponding polarities $\pm1$. The previously independently reconstructed polarity-order theorem excludes nonalternating exact configurations. For any putative exact remaining configuration, order the three positive phases counterclockwise using a fixed permutation of the original pair labels. Their positive-to-positive gaps $G_i$ lie in $(0,\pi)$ and sum to $2\pi$. Put $x_i=\pi-G_i>0$, so $x_1+x_2+x_3=\pi$.

At positive receiver $i$, direct present-phase subtraction gives all five signed partner terms in $2aA_{i,r}$:

$$
\begin{aligned}
&+R(\pi-x_{i-1}) &&\text{preceding positive},\\
&-R(2\pi-x_{i-1}) &&\text{its negative antipode},\\
&+R(\pi+x_i) &&\text{following positive},\\
&-R(x_i) &&\text{its negative antipode},\\
&-R(\pi) &&\text{receiver's own negative antipode}.
\end{aligned}
$$

Combining them gives $2aA_{i,r}=P(\pi-x_{i-1})-P(x_i)-R(\pi)$. Circular radial acceleration at $ua=1$ is $-u^2a=-1/a$, so the three radial equations are exactly

$$
P(\pi-x_{i-1})-P(x_i)=C,\qquad C=R(\pi)-2,\qquad i=1,2,3.
$$

This independently matches the [reviewed gap reduction](overnight2-c-alternating-gap-independent-review.md). All arguments are interior. The original complete-history chart supplies exactly one ordinary root for each of these partners, zero positive self roots, and thirty directed partner roots for the six members. Antipodal symmetry preserves the local component equations at negative receivers. No radial term has been discarded, and no tangential premise has been added.

## A finite-orbit proof of the three-gap obstruction

At any gap value $t$ occurring in a putative solution, the radial relation determines the successor uniquely as

$$
f(t)=P^{-1}\bigl(P(\pi-t)-C\bigr).
$$

The argument of $P^{-1}$ lies in the image of $P$ at these three orbit values because the putative equations explicitly identify it with $P(x_i)$. No extension of $f$ to every $t\in(0,\pi)$ is presumed. If two occurring values satisfy $t<t'$, then $P(\pi-t)<P(\pi-t')$, and the decreasing inverse reverses this order: $f(t)>f(t')$.

The finite orbit has $f(x_1)=x_2$, $f(x_2)=x_3$, and $f(x_3)=x_1$. If, for example, $x_1<x_2$, order reversal successively gives $x_2>x_3$, then $x_3<x_1$, then $x_1>x_2$, a contradiction. Starting with $x_1>x_2$ yields the reversed contradiction. Thus $x_1=x_2$, and the single-valued successor relation then implies $x_2=x_3$. Their sum forces $x_i=\pi/3$ and $G_i=2\pi/3$.

This finite-order argument handles repeated as well as distinct orbit values and does not rely on a globally defined third iterate. It establishes that every radial-balanced alternating configuration at this boundary would be the regular alternating hexagon. Nonalternating configurations were already eliminated, so no arbitrary phase arrangement is left outside this dichotomy.

## Independent exclusion of the regular case

At a positive receiver of the regular alternating hexagon, the clockwise present partner separations are $k\pi/3$, $k=1,\ldots,5$, with products $-,+,-,+,-$. Let $R_k=R(k\pi/3)$. Then the complete radial sum is

$$
2aA_r=-R_1+(R_2-R_3)+(R_4-R_5)>-R_1,
$$

since $R$ strictly decreases. The causal map evaluated at a convenient exact emission angle is

$$
H_1(2\pi/3)=2\pi/3-\sqrt3<\pi/3.
$$

For an elementary hand check of the strict inequality, $\pi<4$ gives $\pi/3<4/3$, and $(4/3)^2=16/9<3$ gives $4/3<\sqrt3$. Because $H_1$ strictly increases, its root for present angle $\pi/3$ therefore has emission angle greater than $2\pi/3$. Cosine strictly decreases on $(0,\pi)$, so $\cos(\alpha/2)<1/2$, $D>1/2$, and $R_1<2$.

Consequently $2aA_r>-R_1>-2$, contradicting the required value $-2$. This exact comparison completes the exclusion. It is independent of any sampled hexagon residual, uses no numerical root approximation, and does not require a tangential sign. The two positive differences in the sum are essential for the stated lower-bound direction; grouping the alternating sum the other way would give a different bound.

## Checking the joint-corner consequence

Consider exact strictly subfield ordered-radius configurations with $r_1=1\le r_2\le r_3<35$. Suppose a sequence had $r_3\to1$ and $v_3=\omega r_3\to1$. Then $r_2\to1$ and $\omega\to1$. The relative phase torus is compact, so a subsequence of relative phases converges.

The previously independently reconstructed separation theorem supplies one fixed $\delta>0$ for all members of this exact family. Continuity of present positions therefore keeps the limiting six labels separated by at least $\delta$. This is the step that individual distinctness alone cannot replace. The earlier closed-subfield root bounds, for bounded radii $R=35$, give $\tau\ge\delta/2$ and $D\ge\delta^2/(128R^2)>0$, with one root per partner and no positive self roots. Root uniqueness, the implicit-function theorem locally at each partner root, and the uniform bounds preserve the complete partner rows through the limit. Thus all exact radial equations pass to a distinct-member equal-radius speed-one limit, which the theorem above excludes.

It follows by the sequential contradiction just proved that there exists $\varepsilon>0$ for which every exact configuration in this class satisfies

$$
\max\{r_3-1,\,1-\omega r_3\}\ge\varepsilon.
$$

Indeed failure would permit choosing one exact configuration with both nonnegative quantities below $1/n$ for every positive integer $n$, producing the prohibited sequence. This implication does not require estimating $\varepsilon$ and does not establish a cost for checking its neighborhood. It remains conditional on the earlier uniform-separation and complete-root continuity theorems; a defect there would reopen this consequence independently of the pointwise equal-radius exclusion.

## Limits, falsifiers, and preservation

The global curvature route is specific to $v=1$. For any fixed $0<v<1$, the general curvature numerator $c+2vc^2-3v$ tends to $1-v>0$ as $c\to1$, while its prefactor in $R_v''$ is negative. Thus $R_v''<0$ sufficiently near the excluded coincidence endpoint, and strict global convexity cannot be carried unchanged into the strictly subfield phase domain. This confirms the subject's stated limitation rather than supplying a further exclusion.

The boundary theorem would be falsified by a wrong sign in the independently expanded curvature numerator, a discrepancy in the five-source inventory, a nonconstant three-cycle for the finite strictly decreasing successor relation, or a complete radial-balanced configuration at common speed one. The neighborhood consequence would additionally fail if an exact approaching sequence could lose its uniform separation or ordinary complete-root limit. Neither a finite unsuccessful search nor a sampled tangential sign is evidence for this theorem.

The subject SHA-256 measured with `shasum -a 256` is `f1c9202bbebed4f435f386b05edd996c7ffe6382df3e1b8aa968de2fef225c1f`, matching the frozen identity supplied by the parent. Only this new review file was written for this second sequential task; the subject, main report, prior reviews, shared owners, and other agents' files were preserved. No Python calculation, numerical search, background worker, Git mutation, or recursive delegation was performed.

The unchanged second allocation begins 2026-10-07 03:25:15 UTC, stops exploration at 13:55:15 UTC, and ends at 15:25:15 UTC. This finishes the two assigned reviews for this continuation; the parent owns integration and further selection.
