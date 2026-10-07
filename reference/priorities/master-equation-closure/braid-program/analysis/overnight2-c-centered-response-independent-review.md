# Independent review of the common rotated pair comparison

## Verdict and frozen scope

**Derived verdict: supported; no mathematical defect found.** The common rotated static-pair comparison gives the stated uniform pair error $E$, preserves the two inner receivers' phase separation and yields the joint support inequality. Its tangential consequence excludes every noncollision phase configuration with $3\le b\le4$, $0\le\omega\le1/12$, with difference margin $11419/177892$ and maximum-component margin $11419/355784$.

The frozen subject is [the centered-pair response note](overnight2-c-centered-pair-response.md). Its SHA-256 measured with `shasum -a 256` is `3c6eec2fa70bc71d45c80a955e170e5d7cfd4a0e7ee11137c8db973e004b68ab`, matching the supplied identity. The comparison's general domain is the distinct-member inner-equal circular class with radii $1,1,b$, $b>1$, common $\omega\ge0$, $\omega b\le1$ and the unchanged coefficient-one logarithmic law $K_{\log}=c_f=1$. Positive inner phases are $0,-\beta$ with $0<\beta<\pi$, and the outer positive phase is $\chi$. All complete histories and persistent polarities are retained.

The clock tool returned 2026-10-07 10:42:21 UTC at review start. The original allocation remains launch 03:25:15 UTC, exploration stop 13:55:15 UTC and hard deadline 15:25:15 UTC. This review uses the live Ramon E. Moore lens and writes only this new review. No numerical instrument, target or optimization was run.

## Independent common-angle construction and factor identity

Fix reception time zero and use the receiver's local frame $x=(1,0)$. A source on the radius-$b$ circle has emission position $y(-\tau)$ at phase $\theta-\omega\tau$. Its causal chord $p=x-y(-\tau)$ satisfies $|p|=\tau$. The reverse and ordinary triangle inequalities immediately give $b-1\le\tau\le b+1$, and hence $|\tau-b|\le1$.

Choose a static comparison source at phase $\theta-\omega b$, write its position as $y_*$ and put $p_*=x-y_*$, $d_*=|p_*|$. Then $d_*\ge b-1$, and the arc-length bound along the circle gives

$$
|p-p_*|=|y(-\tau)-y_*|\le b\omega|\tau-b|\le b\omega.
$$

This is an estimate between two source positions, not a substitution of $b$ for the actual delay. The negative source has a separate causal root but its comparison angle is exactly $\theta+\pi-\omega b$. Therefore the comparison positions remain antipodal.

Let $J$ denote counterclockwise rotation by $\pi/2$, $n=p/\tau$, and $v_s=\omega Jy(-\tau)$. Since $y=x-\tau n$ and $n\cdot Jn=0$,

$$
n\cdot v_s=\omega n\cdot Jx=\omega n_t,
\qquad D=1-\omega n_t.
$$

Thus $|D-1|\le\omega$ and $D\ge1-\omega>0$, since $\omega\le1/b<1$. This derives the receiver-radius bound from the actual transmitter velocity; it does not replace the transmitter speed by $\omega$. In direct angular coordinates, $n_t=-b\sin(\theta-\omega\tau)/\tau$, recovering the checked factor $D=1+\omega b\sin(\theta-\omega\tau)/\tau$. In particular the bound remains valid when the outer speed equals one.

## Row and pair error with the original factor

For any two nonzero Euclidean vectors, expansion of the squared norms proves

$$
\left|\frac p{|p|^2}-\frac{p_*}{|p_*|^2}\right|
=\frac{|p-p_*|}{|p|\,|p_*|}.
$$

Consequently the unsigned inversion difference is at most $b\omega/(b-1)^2$. For either polarity $\sigma=\pm1$, write the actual and comparison rows as $A=\sigma p/(\tau^2D)$ and $A_*=\sigma p_*/d_*^2$. Their exact difference is

$$
A-A_*=\sigma\left[\frac1D\left(\frac p{\tau^2}-\frac{p_*}{d_*^2}\right)
+\frac{p_*}{d_*^2}\left(\frac1D-1\right)\right].
$$

The first term has norm at most $b\omega/[(b-1)^2(1-\omega)]$. The second has norm at most $\omega/[(b-1)(1-\omega)]$. Summing gives the single-row bound

$$
|A-A_*|\le\frac{\omega(2b-1)}{(b-1)^2(1-\omega)}.
$$

Applying it separately to both persistent source polarities proves the pair bound

$$
E(b,\omega)=\frac{2\omega(2b-1)}{(b-1)^2(1-\omega)}.
$$

The signed pair error is bounded by the sum of the two norms; their actual emission positions need not be antipodal. Both denominator effects and both actual delays remain present. The divergence of this estimate as $b\downarrow1$ is a limitation of this bound, not a change of law or a claim about the actual response.

## Linked support inequality

The source's present counterclockwise phases relative to the two unit receivers are $\chi$ and $\chi+\beta$. Their respective static comparison phases are therefore $s=\chi-\omega b$ and $s+\beta$. Encoding local radial plus $i$ times tangential response, the static pair is

$$
G_b^{(0)}(s)=\frac1{1-be^{-is}}-\frac1{1+be^{-is}}.
$$

Thus the actual responses have the simultaneous representation

$$
G_1=G_b^{(0)}(s)+e_1,\qquad G_2=G_b^{(0)}(s+\beta)+e_2,\qquad |e_1|,|e_2|\le E.
$$

No independence or independent phase choice for the errors is assumed. For fixed real planar vectors $\ell_1,\ell_2$, Cauchy–Schwarz gives $\ell_1\cdot e_1+\ell_2\cdot e_2\le(|\ell_1|+|\ell_2|)E$. Maximizing the remaining static expression over the one common phase yields exactly the subject's support inequality. The maximum exists because the phase torus is compact and the static response is continuous for $b>1$. At exact balance, $G_i$ can be replaced by the required local vectors $W_i$ from the complete linked equations. This proves a necessary condition; it does not make it sufficient, remove the outer receiver equations or assert a sharp support value.

The subsequent scalar exclusion uses a coarser static tangential bound rather than evaluating this joint maximum. That weakening is legitimate and should not be reported as a numerical solution of the support problem.

## Independent strip margin

Put $v=\omega$. The exact inner-source difference is $L=[Q_v(\beta)+Q_v(\pi-\beta)]/2$. The already reviewed strict convexity of $Q_v$ gives $L\ge Q_v(\pi/2)$. For $v\le1/12$, the complete root at $\pi/2$ lies in $[\pi/2,\pi/2+2v]\subset(0,\pi)$, where its positive cotangent is divided by $D\le1$. At $3\pi/2$, the negative cotangent has magnitude at least one and $D\le1+v$. Hence

$$
L\ge\cot(\pi/4+v)+\frac1{1+v}.
$$

Both terms decrease in this interval. Using $\sin v\le v$ and $\cos v\ge1-v^2/2$ at $v=1/12$ gives $\tan v\le24/287<1$. The positive-denominator tangent addition formula then yields

$$
L\ge\frac{287-24}{287+24}+\frac{12}{13}
=\frac{263}{311}+\frac{12}{13}=\frac{7151}{4043}.
$$

Summing the two static signed source rows independently gives

$$
G_{b,t}^{(0)}(s)=-\frac{2b(b^2+1)\sin s}{(b^2-1)^2+4b^2\sin^2s}.
$$

The square $(b^2-1-2b|\sin s|)^2\ge0$ implies $|G_{b,t}^{(0)}|\le(b^2+1)/(2(b^2-1))$. For $b\ge3$, this is at most $5/8$, so the difference of two static receiver values has magnitude at most $5/4$. This is valid for their linked phases as well as for arbitrary phases.

There are two pair errors in the receiver difference, for a total at most $2E$. Direct differentiation gives $d[(2b-1)/(b-1)^2]/db=-2b/(b-1)^3<0$, with value $5/4$ at $b=3$. Therefore $2E\le5v/(1-v)\le5/11$ on the stated strip. Combining all three bounds gives

$$
A_{1,t}-A_{2,t}\ge\frac{7151}{4043}-\frac54-\frac5{11}
=\frac{7151\cdot44-4043\cdot75}{4043\cdot44}
=\frac{11419}{177892}>0.
$$

Half this difference bounds at least one absolute tangential component, giving $11419/355784$. Required circular acceleration has zero tangential component, so exact full balance is impossible. The constants hold on all closed strip boundaries, including $v=0$. Combining this exclusion with the independently checked $b\ge4$ exclusion gives the stated necessary conditions $3\le b<4$ and $\omega>1/12$ for an exact inner-equal configuration with $b\ge3$.

## Complete roots, hand controls and limits

The general comparison class has distinct positions and all speeds at most one, so the reviewed complete circular root theorem supplies thirty ordinary positive partner roots and no positive self roots, including the outer wake-speed boundary. In the exclusion strip the outer speed is at most $1/3$, which is strictly inside that root domain. Each selected receiver's three inner and two outer source rows are present; each static comparison of an outer row is used only to bound its actual complete contribution. No static or actual root is merged across the two polarities.

At $\omega=0$, both the phase shift and the error bound vanish, recovering the exact static pair. The static values $G_b^{(0)}(0)=-2b/(b^2-1)$ and $G_b^{(0)}(\pi/2)=-2bi/(b^2+1)$ independently verify radial and tangential signs. The factor identity agrees with the direct angular dot product, and the inversion identity follows from a norm expansion for arbitrary nonzero vectors. These are analytical controls, not computational receipts. No numerical maximum, interval cover or moving trajectory was evaluated.

The supported conclusions are the declared comparison estimate, necessary joint support inequality and continuous strip exclusion. They do not establish exactness or exclude the remaining higher-speed region, nor do they address stability or actual-time continuation. A mismatch between the two comparison phase shifts, a factor other than $1-\omega n_t$, omitted source polarity or root, failure of either inversion bound, or violation of the displayed exact arithmetic would invalidate the corresponding step. An exact configuration in the strip would falsify its exclusion. A support inequality that contains the required responses elsewhere merely leaves that parameter point unresolved. The frozen subject, prior reviews, main report and shared owners were preserved. This completes the assigned review; parent integration remains separate.
