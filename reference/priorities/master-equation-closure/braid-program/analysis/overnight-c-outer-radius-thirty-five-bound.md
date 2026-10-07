# An outer radius ratio below thirty-five

## Statement

Claim grade: derived, pending independent review. For the unchanged logarithmic inverse-distance equation with $K_{\log}=c_f=1$, an exact strictly subfield circular configuration of three persistent neutral antipodal pairs with common center and angular rate, ordered unequal radii $r_1=1<r_2<r_3$, and arbitrary phases must satisfy

$$
r_3<35.
$$

The six complete paths are $X_{a,\sigma}(t)=\sigma r_a e^{i(\omega t+\phi_a)}$ for every real time, with unit polarity $q_{a,\sigma}=\sigma$ and fixed pair identities. The [selected logarithmic equation](../../equation-variants/logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement) retains all ordinary positive-delay partner and self hits, their original transmitter factors, and no ceiling or receiver multiplier. Strict subfield means $|\omega|r_3<1$. This gives exactly thirty partner roots and no positive-delay self root by the complete-past monotonicity argument; no root is discarded to obtain the bound.

The proof divides the middle-radius possibilities into five intervals. If the inner pairs are well separated in radius, their static scalar contraction cannot receive enough causal correction or outer contribution. If their radii are close, the same scalar identity forces a nearby cross-pair source whose vector contribution is too large to cancel. This strengthens the earlier [four-hundred bound](overnight-c-outer-radius-independent-review.md) and the [exact-count refinement](overnight-c-outer-radius-hundred-bound.md); neither an optimizer nor an interval-cover target is a premise. Thirty-five is not claimed optimal.

## Excluding the large middle radii

Suppose that $s=r_3\ge S=35$ and put $u=|\omega|<1/s$. The [independently checked separated-radius condition](overnight-c-separated-radius-independent-review.md) excludes $r_2\ge6$ whenever $r_3\ge30$. Hence a hypothetical exact configuration in this domain must have $1<r_2<6$. The remaining cases are $1<r_2\le2$ and the four closed intervals $r_2\in[L,L+1]$, $L=2,3,4,5$. Shared endpoints cause harmless overlap; the cases leave no gap.

The four inner members have radii $(1,1,r,r)$, where $r=r_2$. Their instantaneous comparison scalar contraction is exactly $-2$, because they are neutral and each unordered unit-polarity pair contributes its polarity product. Their directed radius-product sum, squared-radius sum, and outer-source receiver sum are respectively

$$
C(r)=2+8r+2r^2,\qquad I(r)=2(1+r^2),\qquad O(r)=4(1+r).
$$

There are twelve directed internal rows and eight rows received from the two outer members. These counts and the static identity concern the inner equations of the full six-member system, not a replacement four-member model.

## Well-separated inner radii

For each internal hit, the [checked finite causal comparison](overnight-c-curvature-independent-review.md) gives the difference from its instantaneous logarithmic row at present distance $d_{ij}$ as at most

$$
\frac{u r_j}{(1-u r_j)d_{ij}}+
\frac{u^2r_j}{2(1-u r_j)^2}.
$$

This bound includes the difference between the source's average and emission velocities, so it retains the actual transmitter weighting over the full delay. Multiplication by the receiver radius and summation bounds the internal scalar correction. For one antipodal pair of radius $a$, its two directed present-distance factors sum to $a$. Thus the two intrapair contributions to $\sum r_ir_j/d_{ij}$ sum to $1+r$.

For the two different inner pairs, their two complementary distances are

$$
d_\pm=\sqrt{1+r^2\pm2r\cos\phi_2}.
$$

Among their eight directed rows, four have each distance and every radius product is $r$. The reciprocal sum is largest when $|\cos\phi_2|=1$, giving

$$
4r\left(\frac1{d_-}+\frac1{d_+}\right)
\le4r\left(\frac1{r-1}+\frac1{r+1}\right)
=\frac{8r^2}{r^2-1}.
$$

The function on the right decreases for $r>1$. Therefore, on a band $L\le r\le M=L+1$,

$$
\sum_{i\ne j\ \mathrm{inner}}\frac{r_ir_j}{d_{ij}}
\le A_{L,M}:=1+M+\frac{8L^2}{L^2-1}.
$$

Every inner speed is at most $Mu$. The source-factor floor at each inner receiver for either outer source is $1-Mu$, and its delayed range is at least $s-M$. The latter bound follows from the unequal circle radii, while the factor floor follows from the circle-height identity. Applying the twelve internal and eight outer bounds, and using the required circular scalar contraction, gives the necessary inequality

$$
2\le\frac{A_{L,M}u}{1-Mu}
+\frac{C(M)u^2}{2(1-Mu)^2}
+\frac{O(M)}{(s-M)(1-Mu)}+I(M)u^2.
$$

Replacing $u$ by $1/s$ increases this right side. All resulting terms decrease as $s>M$ increases, so for $s\ge35$ it is at most

$$
Q_{L,M}=\frac{A_{L,M}}{35-M}
+\frac{C(M)/2+35O(M)}{(35-M)^2}
+\frac{I(M)}{35^2}.
$$

For the middle term, direct differentiation of $(C/2+Os)/(s-M)^2$ gives $-(Os+OM+C)/(s-M)^3<0$, which verifies the claimed monotonicity rather than relying on sampled values. Exact rational evaluation of the four bands gives:

| Middle-radius band | $A_{L,M}$ | $Q_{L,M}$ | Strict margin $2-Q_{L,M}$ |
| --- | --- | --- | --- |
| $[2,3]$ | $44/3$ | $392509/376320$ | $360131/376320$ |
| $[3,4]$ | $14$ | $1462249/1177225$ | $892201/1177225$ |
| $[4,5]$ | $218/15$ | $1333/882$ | $431/882$ |
| $[5,6]$ | $46/3$ | $5646527/3090675$ | $534823/3090675$ |

Every margin is positive. Each band therefore contradicts the necessary scalar equation for every phase and every strictly subfield angular rate with $s\ge35$.

## Nearby inner radii

It remains to consider $1<r_2\le2$. Let $d$ be the smallest present separation among the four inner members, and use $M=2$. Without dividing the distances by pair type, their exact radius-product sum gives the internal correction bound $C(M)u/((1-Mu)d)+C(M)u^2/(2(1-Mu)^2)$. Here $C(M)=26$, $I(M)=10$, and $O(M)=12$. The same static comparison therefore requires

$$
2\le\frac{26}{(s-2)d}+H(s),\qquad
H(s)=\frac{13+12s}{(s-2)^2}+\frac{10}{s^2}.
$$

As above, $H$ decreases for $s>2$. At $s=35$,

$$
H(35)=\frac{108263}{266805}<\frac{41}{100}.
$$

Thus every hypothetical exact configuration in this final band must satisfy

$$
d<\frac{26}{33(159/100)}=\frac{2600}{5247}<\frac12.
$$

The intrapair separations are at least two, so a cross-pair source realizes this minimum. By antipodal symmetry, there is a middle-pair endpoint at distance $d$ from the positive radius-one receiver. Its opposite endpoint has present distance at least $2-d>3/2$.

Take uniform speed bounds $v=2/35$ for either middle-pair source and $U=1/35$ for the inner angular rate. A source with speed at most $v$ and present separation $d$ has causal delay at most $d/(1-v)$ and factor at most $1+v$. Therefore the nearby logarithmic row has magnitude

$$
|A_{\mathrm{near}}|\ge\frac{1-v}{(1+v)d}
>\frac{66}{37}>\frac74.
$$

The four other contributions are fully bounded as follows. The own antipodal partner has factor at least one and delay at least $2/(1+u)$, giving norm at most $(1+U)/2=18/35$. The far middle endpoint has factor at least $1-v$ and delay greater than $(3/2)/(1+v)$, giving norm less than $74/99$. The two outer norms sum to at most $2s/(s-1)^2\le35/578$, using the radius-one circle-height factor. The required circular acceleration norm is at most $U^2=1/1225$.

Thus the full vector equation would require the nearby row norm to be at most

$$
R<\frac{18}{35}+\frac{74}{99}+\frac{35}{578}+\frac1{1225}
=\frac{92747407}{70096950}<\frac43.
$$

But it is greater than $7/4$. The triangle inequality fails by more than $7/4-4/3=5/12$. This excludes the final middle-radius band and completes the proof for all $1<r_2<r_3$ with $r_3\ge35$.

## Verification boundary

Shared-venv exact arithmetic evaluated the four band bounds, the nearby-band remainder and separation bound, and the vector cancellation bound after the known control $2/3+1/3=1$ passed. The frozen proof is pending independent reconstruction. Its new content is the complementary-distance sum on each finite radius band and the combination of those bands with the near-source vector contradiction. Existing reviews of its ingredient inequalities do not automatically validate this new case coverage or arithmetic.

The result excludes an unbounded radius region within the selected strictly subfield class. It provides no exact reference below thirty-five, no whole-class exclusion, and no stability, time-evolution, superfield or boundary-continuation result. The remaining ordinary parameter region is still noncompact because collisions and wake-speed endpoints can be approached. Falsifiers are a missed radius band, an incorrect antipodal distance multiplicity or monotonicity, a failed causal/source-factor estimate, an omitted ordinary hit, incorrect exact constants, a wrong near/far pairing, or an exact circular configuration meeting the excluded assumptions.
