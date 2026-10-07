# A finite-speed comparison preserving the outer neutral pair

## Proposed result and fixed scenario

**Derived claims pending independent reconstruction.** Consider the complete coefficient-one logarithmic circular histories with three neutral antipodal pairs of radii $1,1,b$, $b>1$, positive phases $0,-\beta,\chi$, $0<\beta<\pi$, common angular rate $\omega\ge0$ and $\omega b\le1$. The equation has $K_{\log}=c_f=1$, unchanged transmitter weighting and all ordinary positive roots. The root census is thirty partner and zero positive self roots.

The actual outer-pair vector response at a positive unit receiver differs from a static neutral-pair response at angle $\theta-\omega b$ by at most

$$
E(b,\omega)=\frac{2\omega(2b-1)}{(b-1)^2(1-\omega)}.
$$

The shift is identical at the two unit receivers. This yields a joint vector necessary condition preserving their separation $\beta$, rather than allowing two unrelated static response phases. As a continuous exclusion, the estimate and the inner correlated tangential inequality imply

$$
3\le b\le4,\quad 0\le\omega\le\frac1{12}
\quad\Longrightarrow\quad
A_{1,t}-A_{2,t}\ge\frac{11419}{177892}>0.
$$

At least one absolute tangential residual is therefore at least $11419/355784$. This is a new strip beyond the checked $\omega\le1/80$ exclusion. It asserts neither exactness nor exclusion of the remaining higher-speed domain.

## One delayed row and the common comparison angle

Use a local receiver frame with $x=(1,0)$. A source of polarity $\sigma$ at radius $b$ has present phase $\theta$, emission phase $\theta-\omega\tau$, and causal chord $p=x-y(-\tau)$ of length $\tau$. Geometry gives

$$
b-1\le\tau\le b+1,\qquad |\tau-b|\le1.
$$

Compare this row to a static source at the same radius and phase $\theta-\omega b$. Denote that position by $y_*$ and chord by $p_*=x-y_*$, with $d_*=|p_*|\ge b-1$. The arc-length bound gives

$$
|p-p_*|=|y(-\tau)-y_*|\le b\omega|\tau-b|\le b\omega.
$$

This does not set either source's actual delay to $b$. It merely selects a common rotated static geometry for a controlled comparison. Each actual source still uses its separate complete causal root.

For the actual circular source velocity $v_s=\omega Jy(-\tau)$, where $J$ rotates a planar vector by $\pi/2$, the unit chord direction is $n=p/\tau$. Since $y=x-\tau n$,

$$
n\cdot v_s=\omega n\cdot Jx,\qquad
D=1-n\cdot v_s=1-\omega n_t.
$$

Consequently $D\ge1-\omega>0$ and $|D-1|\le\omega$. The relevant factor bound is controlled by the receiver radius and common circular geometry. It remains valid at outer speed $\omega b=1$, and does not assign the smaller speed to the outer transmitter.

## Error in the complete row and pair

The Euclidean inversion identity gives

$$
\left|\frac p{\tau^2}-\frac{p_*}{d_*^2}\right|
=\frac{|p-p_*|}{\tau d_*}
\le\frac{b\omega}{(b-1)^2}.
$$

The actual signed row is $A=\sigma p/(\tau^2D)$, and the static comparison is $A_*=\sigma p_*/d_*^2$. Splitting the difference exactly gives

$$
A-A_*=\sigma\left[\frac1D\left(\frac p{\tau^2}-\frac{p_*}{d_*^2}\right)
+\frac{p_*}{d_*^2}\left(\frac1D-1\right)\right].
$$

Thus

$$
|A-A_*|\le\frac{\omega}{1-\omega}
\left[\frac b{(b-1)^2}+\frac1{b-1}\right]
=\frac{\omega(2b-1)}{(b-1)^2(1-\omega)}.
$$

The negative antipode's comparison phase is exactly $\theta+\pi-\omega b$. The two comparison sources remain a single neutral antipodal pair, even though their actual emission phases are generally not antipodal. Summing their separate row errors proves the stated $E(b,\omega)$ bound for the complete pair.

Write a vector as radial plus $i$ times tangential. The static pair response at angle $s$ is

$$
G^{(0)}_b(s)=\frac1{1-be^{-is}}-\frac1{1+be^{-is}}
=\frac{2be^{-is}}{1-b^2e^{-2is}}.
$$

The two actual responses satisfy the simultaneous inequalities

$$
|G_{1,b}(\chi;\omega)-G^{(0)}_b(\chi-\omega b)|\le E,
\qquad
|G_{1,b}(\chi+\beta;\omega)-G^{(0)}_b(\chi+\beta-\omega b)|\le E.
$$

The same phase $\chi-\omega b$ appears in both comparisons. At exact balance, replace the two actual responses by their required complex values $W_1,W_2$ from the [complete linked equations](overnight2-c-linked-response-independent-review.md). In particular, for any two real planar vectors $\ell_1,\ell_2$,

$$
\ell_1\cdot W_1+\ell_2\cdot W_2
\le\max_{s\in\mathbb T}
\left[\ell_1\cdot G^{(0)}_b(s)+\ell_2\cdot G^{(0)}_b(s+\beta)\right]
+(|\ell_1|+|\ell_2|)E.
$$

This is a derived joint radial–tangential necessary condition. No numerical maximization or claim about its sharpness is made here. The two remaining outer-receiver equations must still hold for an exact reference.

## A continuous tangential exclusion

The complete inner-source tangential difference is

$$
L=\frac{Q_v(\beta)+Q_v(\pi-\beta)}2\ge Q_v(\pi/2),\qquad v=\omega.
$$

Here the independently checked circle chart defines $H_v(\alpha)=\alpha-2v\sin(\alpha/2)=\gamma$, $D_v=1-v\cos(\alpha/2)$, $B_v(\gamma)=\cot(\alpha/2)/D_v$ and $Q_v(\gamma)=B_v(\gamma)-B_v(\gamma+\pi)$. The inequality follows from the [checked convexity of $Q_v$](overnight2-c-tangential-convexity-independent-review.md). The own-antipode terms at the two unit receivers cancel in this difference.

For $v\le1/12$, the causal angle at present angle $\pi/2$ is between $\pi/2$ and $\pi/2+2v<\pi$, so $B_v(\pi/2)\ge\cot(\pi/4+v)$. At present angle $3\pi/2$, the negative cotangent has magnitude at least one and its factor is at most $1+v$. Therefore

$$
L\ge\cot(\pi/4+v)+\frac1{1+v}.
$$

Both terms decrease with $v$ on this interval. At its upper endpoint, $\sin v\le v$ and $\cos v\ge1-v^2/2$ give $\tan(1/12)\le24/287$, and hence

$$
L\ge\frac{1-24/287}{1+24/287}+\frac{12}{13}
=\frac{263}{311}+\frac{12}{13}=\frac{7151}{4043}.
$$

The static neutral-pair tangential response is

$$
G^{(0)}_{b,t}(s)=\frac{-2b(b^2+1)\sin s}{(b^2-1)^2+4b^2\sin^2s}.
$$

The square $(b^2-1-2b|\sin s|)^2\ge0$ gives $|G^{(0)}_{b,t}|\le(b^2+1)/(2(b^2-1))$. For $b\ge3$, the difference of its two receiver values is consequently at most $5/4$ in magnitude. The actual two-receiver error is at most $2E$. Since $(2b-1)/(b-1)^2$ has derivative $-2b/(b-1)^3<0$,

$$
2E\le\frac{5v}{1-v}\le\frac5{11},\qquad b\ge3,\quad v\le1/12.
$$

The complete tangential difference therefore obeys

$$
A_{1,t}-A_{2,t}\ge\frac{7151}{4043}-\frac54-\frac5{11}
=\frac{314644-303225}{177892}
=\frac{11419}{177892}>0.
$$

The required circular acceleration has zero tangential component, so this excludes exact full balance. The maximum absolute component is at least half this difference. The declared strip $3\le b\le4$ ensures all speeds are at most one; in fact outer speed is at most $1/3$. All phases are covered without an arbitrary angular cutoff. With the separately checked $b\ge4$ exclusion, an exact inner-equal configuration with $b\ge3$ must have $3\le b<4$ and $\omega>1/12$.

## Evidence boundary and continuation

This derivation is analytic. At $\omega=0$, the phase shift and error vanish, recovering the exact static pair. The inversion identity is an exact norm identity, and the two static-axis values $G^{(0)}_b(0)=-2b/(b^2-1)$ and $G^{(0)}_b(\pi/2)=-2bi/(b^2+1)$ check its signs. These are controls, not computational target results. Independent reconstruction must verify the common phase, factor identity, full inventory, and exact rational margin before the claim is integrated as checked.

The response estimate remains valid on the whole distinct inner-equal closed-subfield class with $b>1$, but becomes weak as $b\downarrow1$. It does not certify the remaining higher-speed domain, actual-time dynamics, stability or an exact configuration. Wrong source polarity, an omitted causal root, failure of the common shift at either receiver, or a factor error would invalidate the comparison. An exact configuration in the declared strip would falsify its exclusion. If the joint support bound contains the required response elsewhere, that is an unresolved estimate, not evidence of exactness.
