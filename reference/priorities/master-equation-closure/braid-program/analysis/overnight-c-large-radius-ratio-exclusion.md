# A subfield exclusion when both outer pairs are far from the inner pair

## Result

Claim grade: derived, pending independent review. In the same common-center circular logarithmic geometry with $K_{\log}=c_f=1$, $r_1=1$, arbitrary relative phases and complete strictly subfield histories, there is no exact balance when

$$
11\le r_2<r_3,\qquad 0\le|\omega|r_3<1.
$$

The pair labels here are ordered only for the statement of this chart. Each pair remains a fixed positive/negative antipodal pair throughout. No assertion is made about configurations with the middle radius below eleven, superfield histories, or noncircular paths. The obstruction is that the four distant sources cannot supply enough radial acceleration to cancel the inner binary's inward contribution at the small common angular rate forced by the outer subfield condition.

The complete paths are $X_{a,s}(t)=s r_a e^{i(\omega t+\phi_a)}$ for every real $t$, $q_{a,s}=s$. The [selected equation](../../equation-variants/logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement) supplies every ordinary positive-delay partner and self hit with the unchanged transmitter weight. The logarithmic scale covariance makes eleven a radius ratio, not a physical length selection.

## Root coverage and the inner partner

Every speed is strictly below one and all radii are distinct, so the distance-minus-delay gap is strictly decreasing in each partner channel. It starts positive and eventually becomes negative because each source history is bounded. There is exactly one root per partner channel and no positive-delay self root. Thus thirty directed partner roots form the complete census. This is the same elementary complete-past argument used in the [independently checked slow theorem](overnight-c-slow-rotation-independent-review.md#complete-root-census-and-ordinary-domain-margins); it does not require a uniform margin as $|\omega|r_3$ approaches one.

By reflection it suffices to use $\omega\ge0$. At the inner positive receiver, the inner negative partner has delay $\tau_0$ satisfying $\tau_0=2\cos(\omega\tau_0/2)$, and $0<\tau_0\le2$. Its exact radial row is

$$
A_{r,0}=-\frac1{2D_0},\qquad
D_0=1+\omega\sin(\omega\tau_0/2).
$$

Since $0\le\omega\le1/11$, $\sin x\le x$ gives $D_0\le1+\omega^2$, hence

$$
A_{r,0}\le-\frac1{2(1+\omega^2)}.
$$

The inward contribution retains its actual transmitter weighting. The formula uses the causal chord and circular geometry, not a prescribed central acceleration.

## Uniform bound on the four outer contributions

For any source on a circle of radius $b>1$, its delayed chord to the inner receiver has length $d\ge b-1$. At any relative angle $\theta$, the perpendicular-height identity gives $b|\sin\theta|/d\le1$. Consequently its actual transmitter factor satisfies

$$
D=1+\frac{\omega b\sin\theta}{d}\ge1-\omega>0.
$$

This stronger receiver-radius bound is valid even when the outer source speed is close to one. Each outer inverse-distance row therefore has vector magnitude at most $1/((1-\omega)(b-1))$. Its radial component is bounded above by that magnitude, regardless of polarity or phase. Summing the two endpoints of each outer pair gives

$$
A_{r,\mathrm{outer}}
\le\frac2{1-\omega}\left(\frac1{r_2-1}+\frac1{r_3-1}\right).
$$

If both outer radii exceed a common lower bound $R$, then $\omega\le1/R$ and

$$
A_{r,\mathrm{outer}}\le\frac{4R}{(R-1)^2}.
$$

This estimate intentionally ignores possible cancellation, so it remains valid for every phase and includes all four outer channels.

## Radial contradiction

The inner circular equation requires the residual $F_{1,r}=A_{r,0}+A_{r,\mathrm{outer}}+\omega^2$ to vanish. Using $R=11$ bounds it uniformly by

$$
F_{1,r}
\le\frac1{11^2}-\frac{11^2}{2(11^2+1)}+\frac{4\cdot11}{(11-1)^2}
=-\frac{35161}{738100}<0.
$$

All terms have been bounded in the direction that makes the residual as large as possible. Even that bound stays strictly negative, so no choice of the two outer phases or larger outer radii can satisfy the inner radial equation. The three-binary configuration therefore cannot be an exact reference in this domain.

Falsifiers are a missing subfield root, an incorrect inner antipodal row, violation of the circle-height transmitter bound, undercounted outer source contributions, wrong rational sign, or an exact circular balance meeting the displayed assumptions. A solution with smaller middle radius or a superfield outer member is outside this statement.

## Verification status

Shared-venv `fractions.Fraction` arithmetic was run after the known control $3/4-1/2=1/4$ passed. It returned the exact negative residual bound displayed above. The analytical derivation remains pending separate review; no floating search or interval target is a premise of this result.
