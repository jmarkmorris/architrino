# An outer radius ratio below one hundred

## Result

Claim grade: derived, pending independent review. Under the unchanged logarithmic equation with $K_{\log}=c_f=1$, every exact strictly subfield circular configuration of three persistent neutral antipodal pairs with a common center and angular rate, ordered radii $r_1=1<r_2<r_3$, and arbitrary phases must satisfy

$$
r_3<100.
$$

All six histories are $X_{a,\sigma}(t)=\sigma r_a e^{i(\omega t+\phi_a)}$ for every real time, with unit polarity $q_{a,\sigma}=\sigma$. The [selected equation](../../equation-variants/logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement) retains every ordinary positive-delay root and its original transmitter weight. Strict subfield means $|\omega|r_3<1$. No ceiling, receiver factor, source omission, coupling tuning, or continuation rule is introduced.

This strengthens the [independently checked bound of four hundred](overnight-c-outer-radius-independent-review.md). The improvement comes from retaining the actual radius products in the scalar-contraction estimate, rather than replacing all four inner radii by their common upper bound. The same full-vector contradiction then applies. One hundred is a conservative bound, not a claim of optimality or a dynamically selected scale.

## The middle radius bound

Suppose that $s=r_3\ge S=100$. The [separated-radius condition](overnight-c-separated-radius-independent-review.md) requires $B(r_2,s)>0$, where

$$
B(r,s)=\frac1{s^2}-\frac{s^2}{2(s^2+1)}
+\frac{2s}{s-1}\left(\frac1{r-1}+\frac1{s-1}\right).
$$

This function decreases with either radius. At $M=21/4$ and $S=100$,

$$
B(M,S)=\frac1{10000}-\frac{5000}{10001}
+\frac{200}{99}\left(\frac4{17}+\frac1{99}\right)<0.
$$

Exact rational evaluation gives $-68357663383/16663366170000$. Consequently the hypothetical configuration must have $r_2<M$. Set $u=|\omega|$, so $u<1/s$ and the four inner source speeds are bounded by $Mu<1$.

## Retaining the exact radius multiplicities

The four inner members have radii $(1,1,r_2,r_2)$. For these labels define three positive sums:

$$
C(r)=\sum_{i\ne j\ \mathrm{inner}}r_ir_j=2+8r+2r^2,
\qquad I(r)=\sum_{i\ \mathrm{inner}}r_i^2=2(1+r^2),
$$

$$
O(r)=2\sum_{i\ \mathrm{inner}}r_i=4(1+r).
$$

The first sum counts twelve directed inner rows. The factor two in $O$ counts the two outer sources received by each inner member, giving eight outer rows. At the fixed upper value $M=21/4$ these sums are

$$
C=\frac{793}{8},\qquad I=\frac{457}{8},\qquad O=25.
$$

Each sum increases with $r>0$, so these are uniform upper bounds for $r_2<M$. The exact static scalar contraction of the four neutral inner members remains $-2$.

Let $d>0$ be the smallest present separation among those four members. The [independently reconstructed per-row causal comparison](overnight-c-distant-outer-independent-review.md) gives internal scalar error at most

$$
\frac{C u}{(1-Mu)d}+\frac{C u^2}{2(1-Mu)^2}.
$$

The row estimate retains both the average-velocity displacement correction and the difference between average and emission velocity. Multiplying each row by its receiver radius and summing the actual products gives $C$ and $C/2$ above. No asymptotic truncation is used. Both outer sources together contribute at most $O/((s-M)(1-Mu))$, by the circle-height factor floor at the inner receivers and delayed ranges at least $s-M$. The prescribed circular scalar magnitude is at most $Iu^2$.

Thus a necessary consequence of the inner four exact equations is

$$
2\le\frac{C}{(s-M)d}+\widetilde H(s),
\qquad
\widetilde H(s)=\frac{C/2+Os}{(s-M)^2}+\frac{I}{s^2},
$$

after the conservative replacement $u\le1/s$. This is the earlier finite-separation proof with its directed radius sums evaluated more accurately. Its complete causal census is still thirty partner roots and no positive-delay self roots; no received contribution has been removed.

For fixed positive $C,O,I,M$ and $s>M$,

$$
\widetilde H'(s)=-\frac{Os+OM+C}{(s-M)^3}-\frac{2I}{s^3}<0.
$$

At $S=100$, exact arithmetic gives $\widetilde H(S)=3329083937/11491280000<3/10$. Hence for every $s\ge S$,

$$
d\le\frac{C}{(s-M)(2-\widetilde H(s))}
<\frac{793/8}{(379/4)(17/10)}
=\frac{3965}{6443}<\frac58.
$$

All denominators are positive. The last strict inequality is the integer comparison $31720<32215$. Since both same-pair separations are at least two, this small separation must be between endpoints from the two different inner pairs. Antipodal symmetry supplies such a nearby endpoint at distance $d$ from the positive radius-one receiver; the other endpoint of its pair is at present distance at least $2-d>11/8$.

## The one nearby vector cannot be cancelled

The nearby source speed is at most $v=M/S=21/400$, and the inner angular rate is at most $U=1/S=1/100$. The [two-sided delay and row-norm bounds](overnight-c-outer-radius-independent-review.md) follow from source speed and the actual transmitter factor: a present distance $d$ has causal delay at most $d/(1-v)$, and $D\le1+v$. Therefore

$$
|A_{\mathrm{near}}|\ge\frac{1-v}{(1+v)d}
>\frac{379}{421}\frac85
=\frac{3032}{2105}>\frac75.
$$

The remaining contributions at this receiver are exactly its own negative antipode, the far endpoint of the middle pair, and the two outer members. Its own partner has $D_0\ge1$ and delay at least $2/(1+u)$, so its row norm is at most $(1+U)/2=101/200$. The far middle endpoint has present distance greater than $11/8$, delay at least that distance divided by $1+v$, and factor at least $1-v$. Its row norm is therefore less than $(421/379)(8/11)=3368/4169$. The two outer row norms sum to at most $2S/(S-1)^2=200/9801$, using the radius-one circle-height factor bound. The required circular acceleration norm is at most $U^2=1/10000$.

Consequently all possible cancellation and the prescribed acceleration together have the upper bound

$$
R<\frac{101}{200}+\frac{3368}{4169}+\frac{200}{9801}+\frac1{10000}
<\frac{27}{20}.
$$

The final comparison can be checked with small rational upper bounds: the four terms are respectively below $51/100$, $81/100$, $21/1000$, and $1/1000$; their sum is $671/500<27/20$. But $|A_{\mathrm{near}}|>7/5=28/20$. The triangle inequality for the full vector equation therefore fails by more than $1/20$. This contradiction excludes every configuration with $s\ge100$ under the stated assumptions.

## Verification boundary and falsifiers

Known-first shared-venv exact arithmetic checked $7/4\cdot4/7=1$ before computing the corner value, radius sums, remainder, separation bound and vector margin. The proof is frozen pending independent reconstruction. Its new obligations are the exact multiplicities, their insertion into the causal estimate, monotonicity, and the rational comparisons; previously checked row bounds do not automatically validate those new steps.

The result excludes an unbounded part of the strictly subfield radius domain. It establishes no solution below one hundred, no full-class exclusion, no compactness of the remaining ordinary parameter domain, and no stability, actual-time contact or superfield statement. Falsifiers are an omitted source or root, a failed per-row comparison, incorrect radius sums or monotonicity, a wrong near/far geometric pairing, a reversed norm bound, arithmetic failure, or an exact configuration satisfying the excluded assumptions. The partial interval cover is not a premise.
