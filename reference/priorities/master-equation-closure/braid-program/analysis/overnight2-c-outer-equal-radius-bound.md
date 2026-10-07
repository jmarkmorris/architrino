# A radius-ratio bound on the outer-equal boundary

## Proposed exclusion

**Derived claim pending independent reconstruction:** in the selected distinct-member closed-subfield logarithmic circular class with radii $r_1=1$, $r_2=r_3=b>1$, exact configurations require $b<9$. For every configuration with $b\ge9$, the two positive outer receivers can be ordered so their tangential acceleration difference satisfies

$$
A_{2,t}-A_{3,t}>\frac9{160b}.
$$

Consequently at least one absolute tangential balance residual exceeds $9/(320b)$. This includes all phases, zero speed and the outer wake-speed endpoint. The law is $K_{\log}=c_f=1$ with unchanged transmitter weighting and persistent unit polarities. All thirty ordinary positive partner roots and zero positive self roots are included. Neither the strictly ordered outer-radius theorem nor a numerical target is used to establish this boundary bound.

## Normalize the equal pair radii

Scale length and time by $b$, so the two outer pair radii become one, the remaining pair radius becomes $a=1/b<1$, and the common outer speed becomes $v=\omega b\in[0,1]$. The logarithmic scale covariance preserves $K_{\log}=c_f=1$, all speeds and the complete root census. Accelerations in the original units are the scaled accelerations divided by $b$.

Order the two positive unit-radius endpoints so their clockwise separation is $\beta\in(0,\pi)$. Their complete three-source tangential difference, before adding the radius-$a$ pair, is

$$
L=\frac{Q_v(\beta)+Q_v(\pi-\beta)}2,
\qquad Q_v(x)=B_v(x)-B_v(x+\pi).
$$

The source inventory is identical to the independently checked two-receiver subtraction on the inner-equal boundary: the identical own-antipode terms cancel, and the other unit-radius pair contributes the two positive $Q_v$ terms. Only the radius of the remaining pair has changed. These comparison formulas do not presume exact balance.

## A uniform derivative bound for the circle response

For any present angle $\gamma\in(0,2\pi)$, let $\alpha$ be its complete unit-circle emission angle, $c=\cos(\alpha/2)\in(-1,1)$ and $D=1-vc>0$. The previously independently reconstructed derivative is

$$
-B_v'(\gamma)=\frac{1-vc^3}{2(1-c^2)(1-vc)^3}.
$$

For $0\le c<1$, one has $1-vc^3\ge1-vc=D$ and $D\le1$, so $-B_v'\ge1/[2(1-c^2)D^2]\ge1/2$.

For $-1<c\le0$, put $x=-c\in[0,1)$. The numerator $1+vx^3$ is at least one and $1+vx\le1+x$. Hence

$$
-B_v'\ge\frac1{2(1-x^2)(1+x)^3}
=\frac1{2(1-x)(1+x)^4}.
$$

The polynomial $p(x)=(1-x)(1+x)^4$ has derivative $p'(x)=(1+x)^3(3-5x)$ and reaches its maximum at $x=3/5$, where $p=8192/3125$. Thus

$$
-B_v'\ge\frac{3125}{16384}>\frac3{16}.
$$

The strict rational comparison is $3125>3072$. Both cosine sectors therefore give the uniform bound $-B_v'(\gamma)\ge3/16$ on all interior angles and all $v\in[0,1]$. Integrating over a present-angle interval of length $\pi$ gives

$$
Q_v(x)=-\int_x^{x+\pi}B_v'(\gamma)\,d\gamma
\ge\frac{3\pi}{16}>\frac9{16},\qquad 0<x<\pi.
$$

Consequently $L>9/16$ for arbitrary $\beta$. No convexity or assumption about the location of a minimum is needed for this uniform estimate.

## The inner pair has insufficient tangential contribution

At either unit-radius receiver, an emitting source of radius $a<1$ has

$$
\tau^2=1+a^2-2a\cos\theta,
\qquad |A_t|=\frac{a|\sin\theta|}{\tau^2D}.
$$

Its source speed is $va\le a$, so $D=1-n\cdot v_s\ge1-a>0$. This uses the inner source speed; the unit-radius receiver may be at wake speed. The geometric square identity

$$
(1+a^2-2a\cos\theta)^2-(1-a^2)^2\sin^2\theta
=((1+a^2)\cos\theta-2a)^2\ge0
$$

then gives

$$
|A_t|\le\frac{a}{(1-a^2)(1-a)}
=\frac{a}{(1-a)^2(1+a)}.
$$

There are two inner sources at each of the two receivers. Their possible contribution to the tangential difference is therefore at most

$$
\left|A^{\mathrm{small}}_{2,t}-A^{\mathrm{small}}_{3,t}\right|
\le\frac{4a}{(1-a)^2(1+a)}.
$$

The positive function $a/[(1-a)^2(1+a)]$ increases for $0<a<1$, since its logarithmic derivative is

$$
\frac1a+\frac2{1-a}-\frac1{1+a}
=\frac{1+a+2a^2}{a(1-a)(1+a)}>0.
$$

For $b\ge9$ one has $a\le1/9$, so the last bound is at most $81/160$. Subtracting its largest opposing contribution from the unit-radius-pair difference yields

$$
\widetilde A_{2,t}-\widetilde A_{3,t}
>\frac9{16}-\frac{81}{160}=\frac9{160}>0.
$$

Here tildes denote the scaled acceleration. Scaling back supplies the claimed difference $9/(160b)$ and maximum-component margin $9/(320b)$. Circular balance requires both tangential residuals to vanish, which is impossible.

## Complete roots, controls and falsifiers

Distinct positions with speeds at most one retain the [complete circular root census](overnight2-c-root-bound-independent-review.md) at every finite $b$. At the unit-radius receivers, the three equal-radius sources use the complete circle chart and the two smaller-radius sources have factors at least $1-a$. All five source rows at each selected receiver are therefore present. The remaining receivers are not discarded from the system; one failed necessary equation suffices to exclude full balance. No positive self root appears at the closed speed endpoint.

At $v=0$, the known response is $B_0(\gamma)=\cot(\gamma/2)$ and $-B_0'=1/[2\sin^2(\gamma/2)]\ge1/2$, providing a hand control on the new derivative lower bound. The source-inventory control $\beta=\pi/3$ gives positive-neutral-pair arguments $\pi/3$ and $2\pi/3$ in the difference. The polynomial extremum and rational comparisons are exact analytic calculations, not sampled values or a newly run instrument.

An error in the derivative bound, reversed scale covariance, wrong clockwise inventory, underestimated inner-source factor or missing root would reopen the conclusion. An exact configuration with $r_1=1$, $r_2=r_3\ge9$ would falsify it. The region $1<b<9$, general unequal radii, superfield configurations and stability remain unresolved by this argument. The frozen proof requires independent reconstruction before its claim is integrated as complete.
