# Assessment of full phase monotonicity and parameter density

Claim grade: derived acceptance. The [coordinator candidate](authorized-cases-ten-hour-b-phase-density-candidate.md), SHA-256 `b8d5e6ed5360f21831ae3ea25d06d1600ab5eb2d818c550e6410f3df54a782bc`, was read after the [independent blind derivation](authorized-cases-ten-hour-reference-b-phase-density-blind.md), SHA-256 `ca0b3c9a19014a532f8002acaf4aa626f07787a23c6d9ec4a11c03559d229282`, was frozen. The full derivative sign and the candidate's sharper measure constant are accepted.

Both proofs bound every term of the finite critical expression on a relative complex disk and only then apply Cauchy's derivative estimate. The candidate differentiates the normalized remainder $G=z^9\Theta-9/256$; the reference differentiates the unnormalized remainder. The candidate's bound $|G|<2^{10012}\varepsilon$ is justified by the exact constant slow coefficient $(1-I)/4$, the auxiliary-parameter Cauchy coefficient sum, the original complete initial coefficient norm, and the explicit margins of $d$, $A^{1/3}$ and $k_{13}$. The disks remain valid uniformly for every $0<\varepsilon\le2^{-200000}$. This gives its sharper remainder $|\varepsilon^{10}\Theta'+81/256|<2^{10017}\varepsilon$ and the same independently derived interval

$$
 \frac14\varepsilon^{-10}< -\Theta'(\varepsilon)<\frac12\varepsilon^{-10}.
$$

The candidate improves the reference's shell count by integrating the derivative upper bound instead of using its maximum. For a shell $[a/2,a]$, the resulting phase length is below $(511/18)a^{-9}$. The number of integer-turn windows intersecting this image is at most that length divided by $2\pi$, plus two. Since $2\pi>6$ and $a<1$, this number is below

$$
 \frac{511}{108}a^{-9}+2<7a^{-9}.
$$

This includes windows centered just outside either endpoint: enlarging the phase interval by the tolerance at both ends adds less than one full turn, and the integer counting bound contributes the remaining one. The tolerance $M a^2$, with $M=2^{191000}$, is strictly below $\pi$. Each window has inverse-image length at most its full width $2Ma^2$ times the inverse derivative bound $4a^{10}$. Monotonicity ensures that there is at most one such preimage interval. Hence the shell bound is $56Ma^3$, and summing the dyadic shells multiplies it by $8/7$, giving exactly $64Ma^3$.

Accordingly, for the explicitly defined test-unresolved set

$$
 U=\{0<\varepsilon\le2^{-200000}:\operatorname{dist}(\Theta(\varepsilon),2\pi\mathbb Z)\le2^{191000}\varepsilon^2\},
$$

one has

$$
 |U\cap(0,a]|\le2^{191006}a^3,\qquad
 |U\cap(0,a]|/a\le2^{191006}a^2
 \quad(0<a\le2^{-200000}).
$$

At the admitted endpoint the absolute bound is $2^{-408994}$ and the relative bound is $2^{-208994}$. The [independently assessed uniform physical consumer](authorized-cases-ten-hour-reference-b-positive-interval-assessment.md) puts every possible zero-terminal-speed member inside $U$. All parameters outside $U$ therefore have nonzero limiting physical vector velocity and linear asymptotic separation within the original preparation family. The classified positive-speed parameters have one-sided density one at zero.

No existence of a zero-speed member, zero measure of $U$ on the full admitted interval, physical probability distribution, arbitrary-history robustness, or common positive terminal-speed lower bound is inferred. The full critical function's monotonicity is not monotonicity of physical terminal speed. No finite expression, source history, scalar evaluator or trajectory was recomputed. The earlier reference's weaker measure estimate remains valid and immutable. The falsifiers are the complex-domain, full-remainder, window-counting or uniform-consumer failures stated in the two sources.
