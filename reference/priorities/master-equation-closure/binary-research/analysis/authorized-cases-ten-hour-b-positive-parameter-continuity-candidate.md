# Positive terminal speed under nearby preparation parameters

**Status: derived candidate awaiting independent assessment.** This question stays inside the [fixed complete degree-five preparation family](authorized-cases-ten-hour-b-case.md) and its [admitted range](authorized-cases-ten-hour-reference-b-adjudication.md#5-current-adjudicated-conclusion), $0<\epsilon\le e_0=2^{-200000}$. It selects no new preparation rule, equation, geometry or numerical target. The coordinator constructed the argument before receiving the separately assigned reference worker's conclusions.

The proposed conclusion is local in parameter: the set of members with nonzero limiting physical vector velocity is relatively open in $(0,e_0]$, and the vector $V_\infty(\epsilon)$ is continuous on that set. The claim does not include continuity at a zero-speed member, a numerical neighborhood width, arbitrary-history robustness, a zero-speed existence theorem or a uniform tail time for the entire admitted family.

## Exact controls and premises

The elementary tail integral is

$$
\int_s^\infty\frac{C\,du}{[R+m(u-s_*)]^2}
=\frac{C}{m[R+m(s-s_*)]},\qquad R,m>0.
\tag{1}
$$

Differentiating the right-hand side with respect to $s$ gives the negative integrand, and its limit at infinity is zero. Thus the constants and time scaling in the proposed uniform-tail bound can be checked exactly before its use. A straight affine path has zero acceleration and satisfies this bound strictly. These are comparison controls, not claimed solutions of the delayed equation.

Use the original normalized variables $X_\pm(T)=\pm y_\epsilon(s)/(4\epsilon^2)$ and $s=4\epsilon^3T$, so the positive member's physical velocity is $V_\epsilon(T)=\epsilon y_\epsilon'(4\epsilon^3T)$. The complete admitted family has separated ordinary evolution, one partner root, no positive-delay self root, and uniformly small physical speed. The [exact outward-tail proof](../../analysis/amplitude-gradient-elongated-independent-adjudication.md#74-the-outward-section-and-a-radius-independent-acceleration-constant), specialized in the quantitative assessment, supplies a finite tail entry for each positive-speed member, a positive radial lower speed, and $r^2|y''|\le16$ thereafter. Its source recursion and original complete past remain premises; the finite normal-form coefficients alone do not supply parameter dependence of an actual solution.

## Finite-prefix continuity without differentiating a seam

Fix a positive parameter $\bar\epsilon$ in the admitted range and a compact relative parameter interval $I$ around it, bounded away from zero. The compatible finite jet branch is locally continuous by its independently proved contraction/implicit system; its selected branch and uniform contraction box are unchanged. The fixed cutoff is independent of the parameter. Consequently the complete normalized past varies continuously in $C^2$, indeed through the available higher finite derivatives, on every compact time interval. It is constant at all earlier normalized times, so no omitted remote tail must be supplied.

On a fixed finite receiving interval the admitted separation and complete speed bounds give a strictly positive delay lower bound and an ordinary clock derivative bounded away from zero, uniformly after shrinking $I$. Partition that interval into steps shorter than the delay bound. On each step the complete sampled path is already known. Its position, velocity and acceleration are continuous in the parameter in the required compact-time norms, and the sampled acceleration is Lipschitz in source time because the admitted history is $C^{5,1}$. The implicit source clock and the exact acceleration row are therefore locally Lipschitz in current position and continuous in parameter and preceding history. The resulting ordinary differential step has continuous dependence; its acceleration row then supplies $C^2$ dependence on the closed step. Compatibility joins these steps. A finite induction proves joint continuity of $(y,y',y'')$ in parameter and finite reception time.

This argument does not differentiate the actual path with respect to the parameter or differentiate a propagated sixth-order seam. Nor does it invoke a general neutral-equation flow theorem with unverified hypotheses. The delayed acceleration is part of the known preceding step. The positive delay bound may be extremely small, and the number of steps extremely large, but both are finite for each fixed parameter interval and finite receiving horizon. No quantitative computational cost is asserted.

At any finite reception where the base member's mathematical account is strictly positive, that same inequality holds for all sufficiently close family members. The admitted dichotomy then gives nonzero terminal velocity for those members. This already proves relative openness; the stronger uniform-tail argument below is needed for continuity of the vector limit.

## A common late tail for nearby members

For the base member choose a sufficiently late normalized reception $s_*$. Its source time tends to infinity by complete strict speed and linear tail growth; hence the entire interval from its sampled source to $s_*$ lies beyond its original tail entry. On this compact interval $r^2|y''|\le16$. Its radial speed is bounded below by a positive constant and radius tends to infinity. Choose $s_*$ so late that

$$
r_*p_*^2>256,\qquad p_*>0,\qquad
\frac{7\epsilon^2}{r_*}<\frac12,
\tag{2}
$$

with strict slack uniformly available for nearby parameters; here $r_*=r(s_*)$ and $p_*=r'(s_*)$. Finite-prefix continuity, including a small enlargement of the sampled interval, gives a relative neighborhood $J\subset I$ where (2) holds and the entire incoming source interval has $r^2|y''|<24$. Complete physical speed remains below $1/8$ by the independently admitted family bounds. The strict source-clock derivative makes all subsequent source times increase, so no older unbounded acceleration interval can re-enter this tail.

Use the enlarged comparison constant $C_A=32$, with $24<32$ on the supplied tail segment. This changes a proof bound only. The original exact row estimate gives

$$
r^2|y''|\le\frac52+\frac{7\epsilon^2}{r}
\sup_{\text{admitted sources}}r_d^2|y_d''|
<\frac52+16<32.
\tag{3}
$$

The supremum in (3) is propagated causally from that full incoming source interval, not from one sampled acceleration value. While radial speed is positive, $r''\ge-32/r^2$ gives

$$
p(s)^2\ge p_*^2-\frac{64}{r_*}>\frac12p_*^2.
\tag{4}
$$

These strict improvements close the acceleration and outward-speed bounds by first exit. The all-future family theorem already supplies ordinary existence and complete root coverage; the tail argument strengthens its estimates without changing its continuation class. Shrink $J$ once more to obtain constants $R,m>0$ with $r_*(\epsilon)\ge R$ and $p_*(\epsilon)/\sqrt2\ge m$ for every $\epsilon\in J$. Then

$$
r_\epsilon(s)\ge R+m(s-s_*),\qquad
|y_\epsilon''(s)|\le\frac{32}{[R+m(s-s_*)]^2}
\quad(s\ge s_*).
\tag{5}
$$

The constants and neighborhood exist by strict finite inequalities. This note does not evaluate them or use the base terminal speed as a numerical input.

## Uniform tail convergence and the physical vector

Combining (1) and (5) yields, for every $\epsilon\in J$,

$$
|y_\epsilon'(s)-v_\infty(\epsilon)|
\le\frac{32}{m[R+m(s-s_*)]}.
\tag{6}
$$

The finite-time velocity maps are continuous by the step argument, and (6) makes their convergence uniform on $J$. Their limit $v_\infty$ is continuous there. Multiplication by $\epsilon$ gives continuity of the physical vector $V_\infty(\epsilon)=\epsilon v_\infty(\epsilon)$.

For an explicit common physical-time form, write $0<a\le\epsilon\le b$ on $J$. For $T\ge s_* /(4a^3)$,

$$
|V_\epsilon(T)-V_\infty(\epsilon)|
\le\frac{32b}{m[R+m(4a^3T-s_*)]}.
\tag{7}
$$

This bound is uniform only on the local positive-speed neighborhood whose constants were chosen above. It tends to zero and distinguishes a finite-time estimate from the actual asymptotic vector. The corresponding asymptotic pair-separation slope $2|V_\infty(\epsilon)|$ is continuous there as well. At the admitted endpoint the neighborhood is one-sided in the relative parameter interval.

The possible zero-speed set is consequently relatively closed within $(0,e_0]$ by the all-future dichotomy and openness of its complement. This topological statement neither proves it is empty nor constructs any of its members, and does not improve the existing parameter-length bound by itself.

Falsifiers are failure of the finite compatibility branch's continuity, lack of a uniform positive delay on a compact finite prefix, an unavailable source-acceleration Lipschitz bound, loss of complete incoming-tail coverage, or an incorrect exact row/radial estimate. An assertion of continuity at a zero-speed member would require a different uniform-tail argument and is outside this candidate. No new computation, coefficient evaluation, history or law was introduced.
