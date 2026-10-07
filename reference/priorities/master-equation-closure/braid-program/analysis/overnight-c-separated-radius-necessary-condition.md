# A necessary relation between the two outer radius ratios

## Statement and scope

Claim grade: derived, pending independent review. Consider the isolated six-member circular geometry with three persistent antipodal neutral pairs, complete paths $X_{a,s}(t)=s r_a e^{i(\omega t+\phi_a)}$, unit polarities $q_{a,s}=s$, $r_1=1<r_2<r_3$, and arbitrary phases. Use the [authorized logarithmic equation](../../equation-variants/logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement) with $K_{\log}=c_f=1$, unchanged transmitter weighting, every ordinary positive-delay root and no ceiling. Assume strictly subfield histories, $|\omega|r_3<1$.

Write $r=r_2$ and $s=r_3$. A necessary condition for full-vector circular balance is

$$
B(r,s)\equiv\frac1{s^2}-\frac{s^2}{2(s^2+1)}
+\frac{2s}{s-1}\left(\frac1{r-1}+\frac1{s-1}\right)\ge0.
$$

Whenever this explicit expression is negative, the inner radial equation cannot hold for any relative phases or any strictly subfield angular rate. This condition refines the [radius-eleven exclusion](overnight-c-large-radius-ratio-exclusion.md) by keeping the outermost radius rather than replacing both outer radii with one common lower bound. It is a necessary condition only: a nonnegative value does not supply a solution or make the other five equations hold.

## Derivation from the actual received acceleration

The strictly subfield census has one ordinary root for each of the thirty directed partner channels and no positive-delay self root. The proof uses strict decrease of distance minus delay on the full positive half-line, with positive present partner separation and bounded circular source histories. It applies separately to every allowed finite radius choice, without requiring a uniform margin over an unbounded domain. The [independent large-radius review](overnight-c-large-radius-independent-review.md#complete-root-census-without-a-compact-radius-bound) gives the complete argument; nothing in that argument requires the lower value eleven.

By reflection take $u=|\omega|\ge0$, so $u<1/s<1$. The inner negative partner has delay $\tau_0\le2$ and exact radial contribution

$$
A_{r,0}=-\frac1{2D_0},\qquad
D_0=1+u\sin(u\tau_0/2)\le1+u^2.
$$

The antipodal chord relation $\tau_0=2\cos(u\tau_0/2)$ is valid since $u\tau_0/2\le u<1<\pi/2$. Hence

$$
A_{r,0}\le-\frac1{2(1+u^2)}
\le-\frac{s^2}{2(s^2+1)}.
$$

For an outer source of radius $b>1$, let $d$ be its delayed chord length and $\theta$ its delayed relative angle to the inner receiver. The identity $d^2-b^2\sin^2\theta=(1-b\cos\theta)^2$ implies $b|\sin\theta|/d\le1$. Thus $D\ge1-u>0$ at its ordinary hit. With $d\ge b-1$, each outer row has norm at most $1/((1-u)(b-1))$. Summing the four outer sources and using $u\le1/s$ yields

$$
A_{r,\mathrm{outer}}
\le\frac{2s}{s-1}\left(\frac1{r-1}+\frac1{s-1}\right).
$$

The necessary inner radial residual is $F_{1,r}=A_{r,0}+A_{r,\mathrm{outer}}+u^2$. Since $u^2\le1/s^2$, all three upper bounds combine to give $F_{1,r}\le B(r,s)$. If $B<0$, this component never vanishes. No source cancellation or phase restriction enters the estimate.

## Explicit excluded domains

For fixed $r>1$, every term in $B(r,s)$ decreases with $s>1$: $1/s^2$ decreases, $-s^2/[2(s^2+1)]$ decreases, and the positive factors $s/(s-1)$ and $1/(s-1)$ decrease. For fixed $s$, the only $r$-dependent term also decreases with $r$. Therefore a negative value at a lower corner excludes the entire upper domain, intersected with $1<r<s$ and strict subfield speed.

Exact rational substitution gives

$$
B(7,20)=-\frac{6005717}{173713200}<0,
\qquad
B(6,30)=-\frac{9000059}{681966900}<0.
$$

Consequently both $r_2\ge7,\ r_3\ge20$ and $r_2\ge6,\ r_3\ge30$ are excluded, with $r_2<r_3$ retained and all phases allowed. These are additional continuous domains, not numerical samples promoted into coverage. Evaluating $B(11,11)$ is legitimate as an upper-bound corner even though equality of the two outer radii is outside the path class; its value is $-35161/738100$, reproducing the earlier radius-eleven bound algebraically.

## Constraint when the outermost pair becomes distant

Define

$$
C(s)=\frac{s^2}{2(s^2+1)}-\frac1{s^2}-\frac{2s}{(s-1)^2}.
$$

Then $B(r,s)=-C(s)+2s/((s-1)(r-1))$. Whenever $C(s)>0$, an exact circular configuration must therefore satisfy

$$
r_2\le1+\frac{2r_3}{(r_3-1)C(r_3)}.
$$

Since $C(s)\to1/2$ as $s\to\infty$, this necessary upper bound tends to five. Thus any hypothetical sequence of exact strictly subfield configurations with $r_3\to\infty$ must have $\limsup r_2\le5$. This is a restriction on such a sequence, not evidence that any member or sequence exists. It does not exclude every geometry with $r_2\le5$, nor does it cover superfield histories.

## Evidence boundary and falsifiers

Shared-venv rational arithmetic returned the two displayed corner values after the known check $1/3+1/6=1/2$ passed. The present derivation is pending independent reconstruction; the earlier reviewed source bounds supply its starting inequalities, not automatic validation of the new algebra or limiting statement. A violated source-factor estimate, an omitted causal root, an incorrect bound direction or monotonicity claim, wrong rational arithmetic, or an exact solution with $B<0$ would overturn the relevant conclusion. No stability or nonlinear fate is inferred.
