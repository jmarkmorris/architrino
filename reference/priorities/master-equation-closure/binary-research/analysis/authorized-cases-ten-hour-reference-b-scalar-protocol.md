# Independent directed evaluation of the fixed finite scalar expression

This protocol freezes the separately authored [integer-grid instrument](../evidence/authorized-cases-ten-hour-reference-b-scalar.py), SHA-256 `de9e15cfb387887f8389461d524553c7844357330c95a495fdad3cd178cb0cb5`, before its physical-input target. It imports no producer helper and has not read the producer numerical result. The reference is the [independently derived scalar identity](authorized-cases-ten-hour-reference-b-scalar-interval.md); the initial and slow coefficients have already passed their separate [complete audits](authorized-cases-ten-hour-reference-b-input-slow-acceptance.md).

The alternative identities are

$$
\pi=8\arctan(1/3)+4\arctan(1/7),\qquad
\log2=2\operatorname{atanh}(1/3),\qquad
\log3=\log2+2\operatorname{atanh}(1/5).
$$

The first follows from $\tan(2\arctan(1/3))=3/4$ and the angle-addition identity giving tangent one after adding $\arctan(1/7)$; the angle lies between zero and $\pi/2$. The logarithm identities follow directly from $2\operatorname{atanh}x=\log((1+x)/(1-x))$.

For each inverse integer argument, the independent binary split returns the power, odd-denominator product and two reversed numerators for the positive and alternating sums. If an interval is split into lengths $L$ and $M$, the numerators combine as $q^{2M}N_LD_R+(\pm1)^LN_RD_L$. This recurrence follows by separating the two finite sums. The omitted absolute tails are less than one grid unit because the term count is at least $\lceil(P+40)/k\rceil$ and $q^2\ge2^k$. Both endpoints receive one additional grid unit. No floating-point transcendental or rounding premise enters.

Signed products and quotients enumerate all four endpoint combinations and use exact integer floor and ceiling. The positive cube root uses integer Newton iteration with an explicit final bracketing assertion. Tiny logarithm and argument corrections use 32 terms and the conservative absolute geometric tail. The modular quotient is accepted only if both directed endpoints have the same floor; otherwise the result remains unresolved.

Measured controls passed first at 128 bits: signed rational products and quotients, exact and inexact cube roots, every binary-split sum against independently summed rational terms for three bases and five lengths, the alternative tangent identity, rational brackets for all three constants, positive and negative modular quotients, a quotient crossing a boundary, normalized leading phase and a tiny alternating-series enclosure. The known receipt is local `reference/b-scalar-known-v1.json`. The separate 65,536-bit constant-only profile passed in 0.768 seconds with 25.5 MB recorded peak RSS; its receipt is `reference/b-scalar-profile-v1.json`. These profile figures establish only the observed profile cost.

The single target uses 2,080,000 bits, 1800 seconds internal and 1860 seconds outer deadline, three GiB peak RSS checked during arithmetic progress, 32 MiB output limit, shared Python and the owned-compute supervisor. It reads only the two hash-bound accepted finite coefficient files and writes one immutable local `reference/b-scalar-target-v1.json`. Ten-second progress messages identify the active arithmetic stage. Target evidence establishes a finite-expression interval only. The physical-section chart coverage correction reported by the coordinator is a separate proof obligation; no finite-distance Boolean resolves it.

Falsifiers are a changed digest, failed known control, failed root bracket, unresolved quotient, insufficient final enclosure, or a violated operational limit. All prior subject and reference files remain unchanged.
