# Centered parameter enclosures for the unresolved crossing boxes

## Question and unchanged subject

This is a method improvement on the frozen continuous crossing cover, not a larger subdivision budget. The original target has 473 depth-limited unresolved leaves, besides its accepted subject leaves and pending larger boxes. The present calculation keeps those 473 leaf bounds exactly and asks whether a centered interval form of the complete acceleration components excludes zero more efficiently than summing broad per-hit value intervals. All conclusions remain subject evidence until independently reconstructed.

The geometry is constant unit radius, no phase modulation and cosine height, with $K=c_f=1$. Parameters are $p=(H,\beta,\eta)$ and
$$
v=\eta\sqrt{(19/20)^2-\beta^2},\qquad\kappa=v/H.
$$
The original compact domain has $H\in[1/10,5/6]$, $\beta\in[1/20,4/5]$, $\eta\in[1/10,1]$. Every point in this rectangular domain obeys $\beta^2+v^2\le(19/20)^2$. Every line joining a leaf center to another point of the leaf remains in the domain and preserves the complete ordinary chart. There is one root per partner, no positive self root, and $D_s\ge1/20$ throughout. The reception is always the descending zero of the height, $\phi=\pi/2$, where both prescribed axial and tangential accelerations vanish. This fixed phase corresponds to a different physical reception time as parameters vary; the relative geometry below already includes that dependence.

## Exact implicit-root derivatives

For partner $j$, delay $d$ and fixed parameters, define
$$
\alpha=j\pi/3-\beta d,\qquad \ell=\kappa d,\qquad
q(d,p)=\sqrt{2-2\cos\alpha+H^2\sin^2\ell}.
$$
The root is $q(d,p)-d=0$. Its source divisor at that root is
$$
D_s=1+\frac{\beta\sin\alpha-H^2\kappa\sin\ell\cos\ell}{d}>0.
$$
At fixed delay, differentiate $q$ in any parameter coordinate $p_i$. Differentiating the implicit equation along the root gives
$$
(q_d-1)\,\partial_{p_i}d+q_{p_i}=0,
\qquad
\boxed{\partial_{p_i}d=\frac{q_{p_i}}{D_s}.}
$$
The sign is positive because $q_d-1=-D_s$. These are partial derivatives of the parameterized prescribed geometry, not time derivatives of a dynamical solution. The uniformly positive source divisor ensures differentiability of each unique root on a neighborhood of every parameter point. Compactness and the common chart let interval derivatives cover each full leaf.

The coordinate map derivatives, if expanded explicitly, are
$$
\kappa_H=-\kappa/H,\qquad
\kappa_\beta=-\frac{\eta\beta}{H\sqrt{(19/20)^2-\beta^2}},\qquad
\kappa_\eta=\frac{\sqrt{(19/20)^2-\beta^2}}H.
$$
Their denominators stay strictly positive in the declared domain. At fixed $d$,
$$
2q\,q_{p_i}
=2\sin\alpha\,\alpha_{p_i}
+2H\sin^2\ell\,\mathbf1_{p_i=H}
+2H^2\sin\ell\cos\ell\,d\kappa_{p_i},
\qquad\alpha_{p_i}=-d\,\mathbf1_{p_i=\beta}.
$$
This provides a direct formula against which the automatic chain-rule calculation can be checked.

## Differentiating the full crossing components

The exact dimensionless components are
$$
T(p)=\sum_{j=1}^5\frac{-(-1)^j\sin\alpha_j}{d_j^3D_{s,j}},\qquad
Z(p)=-H\sum_{j=1}^5\frac{\sin\ell_j}{d_j^3D_{s,j}}.
$$
For a full parameter derivative, both $d_j$ and the explicit parameters vary. The implementation first encloses the root with the frozen original root contractor. It then evaluates $q_{p_i}$ holding that delay fixed and divides by an enclosure of the source divisor to enclose $\partial_{p_i}d_j$. With this derivative attached to the delay, ordinary sum, product, quotient, sine, cosine and square-root chain rules differentiate the complete expressions for $T$ and $Z$.

A dual interval stores a value interval and three derivative intervals. For example, a product has derivative enclosure $u_iv+uv_i$, a reciprocal has $-u_i/u^2$, and sine has $u_i\cos u$. Each formula is an exact real derivative followed by outward interval evaluation. At roots, intersecting a computed divisor value interval with the independent global range $[1/20,39/20]$ narrows the value enclosure without changing or differentiating that intersection. The derivative still comes from the exact divisor expression. This distinction is essential: the artificial clipping operation is not part of the mathematical function.

No reference instrument is modified. Reusing the frozen root contractor inside this subject does not count as independent numerical evidence. A separate reference must reconstruct the root and derivative/centered enclosure before this subject's conclusions are accepted.

## Centered mean-value form

For a rectangular leaf $B$ with exact rational center $c$, the fundamental theorem of calculus along the straight segment gives
$$
F(p)-F(c)=\int_0^1\nabla F(c+s(p-c))\cdot(p-c)\,ds,
\qquad p\in B,
$$
for either $F=T$ or $F=Z$. If interval $G_i(B)$ contains the full derivative $\partial_{p_i}F$ throughout the leaf, then
$$
\boxed{F(B)\subseteq F(c)+\sum_{i=1}^3G_i(B)(B_i-c_i).}
$$
The center value is itself enclosed by interval roots and arithmetic; it is not a floating point sample substituted as exact. Intersect this centered interval with the direct value interval, since both contain the actual component range. A resulting interval wholly above or below zero excludes exact canonical balance for that entire leaf. An interval still containing zero stays unresolved. No new partition is created.

This form may be tighter because the center evaluates the complete sum and the derivative intervals retain some common parameter dependence across contributions. Improvement is empirical; the theorem only establishes containment, not a guaranteed width reduction by a fixed factor.

## Independently known derivative controls

Before target use, a simple polynomial/trigonometric/quotient dual expression checks the chain-rule operations. The physically relevant known case is the static alternating hexagon at $\beta=\eta=0$, with any fixed positive $H$. Its actual height at the tested phase and all emission times is zero because $\kappa=0$. The five static chord lengths are $1,\sqrt3,2,\sqrt3,1$, and all source divisors equal one.

For an infinitesimal change of rotation at fixed zero height rate, direct implicit differentiation gives $d_{j,\beta}=-\sin(j\pi/3)$. Substitution into the complete tangential row yields
$$
\left.\partial_\beta T\right|_0
=-\sum_{j=1}^5\frac{(-1)^j}{d_j^2}
=2-\frac23+\frac14=\frac{19}{12}.
$$
For the axial component, $v_\eta=19/20$ at $\beta=0$. Expanding only this exact derivative of $\sin(\kappa d)$ at zero gives
$$
\left.\partial_\eta Z\right|_0
=-\frac{19}{20}\sum_{j=1}^5d_j^{-2}
=-\frac{19}{20}\left(2+\frac23+\frac14\right)
=-\frac{133}{48}.
$$
The static values $T=Z=0$ and tangential derivatives in $H$ and $\eta$ equal zero by the same exact geometry. These controls are specified analytically before the instrument runs. They do not prove a target leaf's sign, but they test the implicit derivative sign, polarity sum, parameter speed map and source-divisor differentiation.

## Declared work and evidence boundary

The [centered companion](overnight2-b-centered-crossing.py) must first pass the known controls. A twelve-leaf pilot then measures cost and enclosure behavior. Subject to that measurement, the target processes all 473 frozen unresolved leaves once, with no subdivision. Bounds are at most 1,000 authenticated input leaves, 300 internal seconds, 512 MiB, eight MiB per receipt, one numerical thread and a 360-second supervisor deadline. All original direct enclosures and failed/partial cover results remain preserved. The output records each original leaf index and exact bounds, both final component intervals, its exclusion or unresolved status, and any unprocessed indices.

A false implicit derivative, source/receiver divisor confusion, a center substituted without enclosure, a parameter segment leaving the admitted chart, an incomplete interval derivative range, or a component value outside the returned interval would falsify the affected claim. Closing these leaves would not by itself close the original pending larger boxes or independently certify the earlier accepted subject leaves. The result is a local method comparison on a fixed input collection, with any wider cover verdict requiring its own complete accounting.
