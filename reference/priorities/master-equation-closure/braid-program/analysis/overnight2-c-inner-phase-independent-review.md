# Independent review of the inner-equal phase bound

## Verdict and frozen subject

**Derived verdict: supported in the stated domain; no mathematical defect found.** Independently reconstructing the causal map, the two-receiver source inventory and the outer-row estimate gives the proposed phase and spatial bounds for exact configurations with $r_1=r_2=1$, $r_3=b>1$, distinct simultaneous positions and all circular speeds at most one. The selected law remains $K_{\log}=c_f=1$, with its unchanged transmitter factor and all thirty positive partner roots and zero positive self roots. This necessary condition does not establish existence, stability or a bound for general unequal inner radii.

The frozen subject is [the phase-gap note](overnight2-c-inner-equal-phase-gap.md), supplied SHA-256 `5a67e3a829b6fd67656afe24e0d6b24b16985deaee8c879113ffa93ed43fb44b`. This review uses the live Ramon E. Moore lens and the existing second C allocation. The plan/report clock remains launch 03:25:15 UTC, exploration stop 13:55:15 UTC and deadline 15:25:15 UTC on October 7, 2026. Only this new review is authored; the subject and previous reviews remain outside this write scope. No numerical instrument or target is needed for the derivation below.

## Independent causal-map estimate

For the unit inner circle, put $v=\omega\le1/b<1$. The positive root at present clockwise angle $\gamma\in(0,2\pi)$ is represented uniquely by

$$
\gamma=H_v(\alpha)=\alpha-2v\sin(\alpha/2),\qquad D=H_v'(\alpha)=1-v\cos(\alpha/2)>0.
$$

The following auxiliary argument also allows $v=1$, because $D>0$ on the interior $0<\alpha<2\pi$. Direct subtraction yields

$$
3H_v-\alpha D=2\alpha+v\{\alpha\cos(\alpha/2)-6\sin(\alpha/2)\}.
$$

It suffices to check the endpoints of this affine function of $v$. At zero it is $2\alpha>0$. At one it equals $2g(t)$, where $t=\alpha/2$ and $g(t)=2t+t\cos t-3\sin t$. Independent differentiation gives

$$
g'=2-2\cos t-t\sin t,\qquad g''=\sin t-t\cos t,\qquad g'''=t\sin t.
$$

The three initial values $g(0),g'(0),g''(0)$ vanish, and $g'''>0$ for $0<t<\pi$. Successive integration proves $g(t)>0$ there. Consequently $3H_v\ge\alpha D$ on the entire claimed parameter range. All denominators used next are positive, so inversion gives $1/(\alpha D)\ge1/(3\gamma)$, with the direction stated in the subject.

For $0<\gamma\le1/16$, the bound $\pi>3$ and the exact comparison $2<529/256$ imply

$$
H_v(\pi/2)\ge\pi/2-\sqrt2>3/2-23/16=1/16.
$$

Strict monotonicity therefore places the root below $\pi/2$. With $t=\alpha/2$, $\cos t>1/2$ and $\sin t\le\alpha/2$ yield

$$
B_v(\gamma)=\frac{\cos t}{\sin t\,D}\ge\frac1{\alpha D}\ge\frac1{3\gamma}.
$$

For the other member of the same neutral pair, the present angle is $\gamma+\pi>\pi$. Since $H_v(\alpha)\le\alpha$, its root has $\alpha>\pi$, giving $B_v(\gamma+\pi)<0$. Hence $Q_v(\gamma)=B_v(\gamma)-B_v(\gamma+\pi)\ge1/(3\gamma)$. More generally, differentiating $B$ through $d\alpha/d\gamma=1/D$ gives

$$
B_v'(\gamma)=-\frac{1-v\cos^3(\alpha/2)}{2\sin^2(\alpha/2)D^3}<0,
$$

including $v=0$ and interior roots at $v=1$. Thus $Q_v(x)>0$ throughout $0<x<\pi$.

## Source inventory and cancellation

Choose the two positive inner positions at present phases $0$ and $-\beta$ with $0<\beta<\pi$ by ordering the two labels. Distinctness excludes both endpoints. At the first receiver, the second positive and its negative antipode contribute $Q_v(\beta)/2$, while the receiver's own negative antipode contributes $-B_v(\pi)/2$. At the second receiver, the other positive appears at clockwise angle $2\pi-\beta$ and its negative antipode at $\pi-\beta$; their signed contribution is $-Q_v(\pi-\beta)/2$, with the same own-antipode term. Subtraction gives exactly

$$
L=\frac{Q_v(\beta)+Q_v(\pi-\beta)}2>0.
$$

This explicitly retains all three inner sources at each of the two receivers. Let $\rho=\min(\beta,\pi-\beta)$. If $\rho\le1/16$, the corresponding term gives $L\ge1/(6\rho)$; the other term is positive and is not needed for this lower bound.

For an outer source at delayed angle $\theta$ relative to a unit receiver, write $\tau^2=1+b^2-2b\cos\theta$. The unsigned tangential row is $b|\sin\theta|/(\tau^2D)$. Two independently checked square identities are

$$
\tau^2-b^2\sin^2\theta=(b\cos\theta-1)^2,
$$

$$
\tau^4-(b^2-1)^2\sin^2\theta=((1+b^2)\cos\theta-2b)^2.
$$

The first bounds the receiver-tangential projection of the root direction. Since the transmitter and receiver rotate at the same $\omega$, $\mathbf n\cdot\omega J\mathbf y=\mathbf n\cdot\omega J\mathbf x$, giving $D\ge1-v$. This uses the inner receiver speed, even if the outer source speed equals one. The second identity gives $|\sin\theta|/\tau^2\le1/(b^2-1)$. Thus each outer row obeys

$$
|A_t|\le\frac b{(b^2-1)(1-v)}\le\frac{b^2}{(b-1)^2(b+1)}.
$$

There are exactly two outer sources at each of the two receivers, so the magnitude of the outer contribution to their difference is at most $C(b)=4b^2/((b-1)^2(b+1))$. Exact circular balance requires each total tangential component to vanish. Therefore $L\le C(b)$ and, on the small-angle branch, $\rho\ge(b-1)^2(b+1)/(24b^2)$. The complementary branch $\rho>1/16$ proves the minimum form in the subject. No inequality reverses in this argument: $b>1$ and $\rho>0$ make every multiplying denominator positive.

## Spatial conversion, coverage and controls

The four cross-pair endpoint separations have angular distances represented by $\beta$ and $\pi-\beta$, so their minimum is exactly $d=2\sin(\rho/2)$ with $0<\rho\le\pi/2$. Concavity on $[0,\pi/2]$ gives $\sin z\ge2z/\pi\ge z/2$. Hence $d\ge\rho/2$, proving both stated spatial constants. The estimate is deliberately weaker than the available chord bound, but valid. As $b\downarrow1$, its nonconstant spatial term is asymptotic to $(b-1)^2/24$; the quadratic description is appropriate only for this partial-equality class.

The complete-root premise is the already reconstructed [closed-subfield root theorem](overnight2-c-root-bound-independent-review.md): distinct circular positions with both endpoint speeds at most one give one ordinary positive root per ordered distinct pair, no positive self root and a finite full delay interval. It applies to the present equal inner radii and to the outer wake-speed endpoint. The proof here accounts for ten relevant partner rows across the selected two receivers; the remaining twenty rows are not omitted from the model, but are unnecessary for a necessary condition. No positive self root or older-history branch can supply additional cancellation under this premise.

Analytical hand controls are $v=0$, where $H=\alpha$, $D=1$, $B=\cot(\gamma/2)$ and $Q=2/\sin\gamma$, and the small-angle wake endpoint, where $H_1\sim\alpha^3/24$ and $D_1\sim\alpha^2/8$. The latter makes $3H_1$ and $\alpha D_1$ agree to leading order and checks the factor three independently. These are hand derivations, not computational receipts. No numerical target was run.

## Verification boundary and falsifiers

The supported result is a necessary lower bound on an actual cross-pair endpoint separation, not on a radial gap. It remains conditional on exact tangential balance, distinct positions, the selected logarithmic law and the complete circular history. It supplies neither an exact solution nor a global exclusion of all partial-equality configurations. A violation of the explicit $g'''$ identity, the inverse-root domain comparison, either geometric square identity, the counted four-row cancellation cap or the reconstructed clockwise source signs would invalidate the corresponding step. An exact configuration in the stated class below either displayed minimum would falsify the final condition. Parent integration remains separate from this independent review.
