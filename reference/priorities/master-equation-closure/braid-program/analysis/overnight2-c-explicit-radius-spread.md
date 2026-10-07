# A constructive radius-spread bound from the equal-radius exclusion

## Proposed quantitative conclusion

**Derived claim pending independent reconstruction:** in the selected exact strictly subfield ordered-radius logarithmic three-binary circular class, normalized by $r_1=1$, the outer radius obeys $r_3>1+\varepsilon_0$, where the following explicit positive number is sufficient. Set $R=35$, retain the previously independently checked separation floor $\delta$, and define

$$
u_0=\frac{\delta}{100R^2},\qquad
m=\frac{u_0}{16},\qquad
t_0=\frac{\delta}{4},\qquad
d_0=\frac{\delta^2}{512R^2},
$$

$$
\varepsilon_0=\min\left\{\frac{\delta}{4},\frac{m d_0^3t_0^2}{212}\right\}.
$$

The constant $d_0$ bounds a transmitter factor; it is not a member separation. The construction depends on the independently checked alternating equal-radius residual margin and the earlier nonalternating radial margin. The formula is mathematical rather than a claim of a useful numerical covering width. No floating evaluation or computational-cost estimate is made.

The history and equation are unchanged: three persistent neutral antipodal pairs with common center, plane and angular rate $\omega>0$, unit polarities, $K_{\log}=c_f=1$, and all ordinary positive-delay roots. Let $h=r_3-1$, so each radius lies in $[1,1+h]$. The previously checked necessary conditions for an exact configuration give $r_3<R$, all present member separations at least $\delta$, and $\omega>u_0$. The explicit formula for $\delta$ gives $0<\delta<1$.

## Deforming the radii without losing roots

Suppose for contradiction that $0<h\le\varepsilon_0$. Keep every phase, polarity and the angular rate fixed, and define a radius homotopy for $0\le q\le1$ by

$$
r_a(q)=1+q(r_a-1).
$$

Thus $q=1$ is the assumed exact configuration and $q=0$ is the equal-radius comparison. Each present point moves by at most $h$ between any two homotopy parameters. Every present pair separation is consequently at least $\delta-2h\ge\delta/2$. All radii remain at most $R$ and at least one. Speeds satisfy $\omega r_a(q)\le\omega r_3<1$, so the whole path lies within the closed-subfield ordinary-root theorem. It has exactly thirty partner roots and zero positive self roots throughout. Each partner root satisfies

$$
\tau\ge t_0,\qquad D\ge d_0.
$$

These bounds follow by substituting the separation floor $\delta/2$ into the independently checked inequalities $\tau\ge d/2$ and $D\ge d^2/(128R^2)$. Root uniqueness and the ordinary implicit-function theorem make each delay differentiable along this path. The homotopy is a comparison of prescribed histories, not an asserted dynamical evolution.

## Bounding the change of one complete acceleration row

Fix reception time zero and one directed partner row. Write $x(q)$ for the receiving point, $y(q,t)$ for the source path, $v(q,t)=\partial_t y(q,t)$ for its velocity, and

$$
r=x(q)-y(q,-\tau(q)),\qquad n=\frac r\tau,\qquad
D=1-n\cdot v(q,-\tau(q)).
$$

The circular root equation gives $|r|=\tau$. A dot denotes total derivative with respect to $q$ only in the estimates below. At fixed source time, the homotopy derivatives of both positions have norm at most $h$. Differentiating the root equation therefore gives

$$
D\dot\tau=n\cdot(\partial_q x-\partial_q y),\qquad
|\dot\tau|\le\frac{2h}{d_0}.
$$

Source speed is at most one. Hence

$$
|\dot r|\le2h+|\dot\tau|\le\frac{4h}{d_0},
\qquad
|\dot n|\le\frac{2|\dot r|}{\tau}
\le\frac{8h}{d_0t_0}.
$$

Here $d_0\le1$ and $t_0\le1$ by construction. The factor two in the unit-vector derivative is a conservative bound obtained by differentiating $r/|r|$; it is not an additional response factor in the equation.

At fixed source time, $|\partial_q v|\le\omega h\le h$, since $\omega r_3<1$ and $r_3\ge1$. The source acceleration magnitude is $\omega^2r_a(q)\le1$. Accounting for the changing emission time gives

$$
|\dot v|\le h+|\dot\tau|\le\frac{3h}{d_0},\qquad
|\dot D|\le|\dot n|+|\dot v|
\le\frac{11h}{d_0t_0}.
$$

The complete signed logarithmic row is $A=\sigma n/(\tau D)$ with $\sigma=\pm1$. The factor is positive on the entire homotopy, so differentiating it gives

$$
|\dot A|\le
\frac{|\dot n|}{\tau D}
+\frac{|\dot\tau|}{\tau^2D}
+\frac{|\dot D|}{\tau D^2}
\le\frac{21h}{d_0^3t_0^2}.
$$

The three contributions are bounded respectively by $8h/(d_0^2t_0^2)$, $2h/(d_0^2t_0^2)$ and $11h/(d_0^3t_0^2)$. The same inequality applies to each polarity sign and every directed partner. No source row is discarded or replaced.

## Full residual comparison and contradiction

At a positive receiver, let $F(q)$ denote the two-component radial and tangential residual, including the required circular term $\omega^2r_a(q)$ in the radial component. Its basis stays fixed because phases are fixed. There are five partner rows and no positive self row. Consequently

$$
|\dot F(q)|\le\frac{105h}{d_0^3t_0^2}+h
\le\frac{106h}{d_0^3t_0^2}.
$$

Integration over $q\in[0,1]$ bounds the absolute change of every one of the six positive-receiver scalar residuals by this last expression. Since $F(1)=0$ at the assumed exact configuration and $h\le\varepsilon_0$, the equal-radius comparison must have

$$
\|F(0)\|_\infty\le\frac{106h}{d_0^3t_0^2}\le\frac m2.
$$

But at $q=0$ the common radius is one, its speed is $v=\omega\in(u_0,1)$, and all six points remain distinct. If its polarity order is nonalternating, the independently checked radial-margin theorem gives $\|F(0)\|_\infty>v/16>u_0/16=m$. If its order is alternating, the [alternating residual bound](overnight2-c-alternating-residual-margin.md), once independently checked, gives $\|F(0)\|_\infty\ge23/6400>m$. The last inequality follows from $\delta<1$, $R=35$ and $m=\delta/(1600R^2)<1/1600<23/6400$. These two polarity orders exhaust the distinct six-point circle.

Either case contradicts the upper bound $m/2$. Thus no exact ordered configuration has $0<h\le\varepsilon_0$. The case $h=0$ is already excluded by the complete equal-radius theorem. This proves the proposed strict radius-spread bound, conditional only on the separately named checked inputs and independent reconstruction of the present estimates.

## Evidence boundary and falsifiers

The argument uses the [closed-subfield root bound](overnight2-c-closed-subfield-root-bound.md), [constructive separation formula](overnight2-c-explicit-global-separation.md), [compact-domain angular-rate cutoff](overnight2-c-explicit-compact-domain.md), [nonalternating margin](overnight2-c-radial-margin-independent-review.md), and the new alternating margin. The latter uses the completed independent speed certificate, whose global lower bound for $S$ exceeds $9/50$. All these are the fixed original equation and histories, with no fitted coupling or evolution claim. No numerical target is requested for the present extension.

An incorrect homotopy separation estimate, loss of a root or positive factor, omitted emission-time derivative, wrong row count, invalid residual margin, or exact configuration with $r_3\le1+\varepsilon_0$ would falsify the relevant step. The width concerns simultaneous near-equality of all three radii. It does not exclude either partial-equality boundary away from that neighborhood or the remaining general unequal-radius class. Independent review must adjudicate the root differentiation, factor differentiation, constants and full-domain scope before this becomes a completed finding.
