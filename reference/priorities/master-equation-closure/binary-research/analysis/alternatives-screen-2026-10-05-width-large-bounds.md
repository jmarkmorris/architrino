# Analytical radius and speed bounds for the four finite-width circle laws

Status: new derived subject, frozen before enlarged diagnostic targets, pending independent coordinating assessment. The four selected laws have $K_{ij}=c_f=1$, self sign $+1$, opposite-polarity partner sign $-1$, triangular reception $\delta_h(z)=h^{-1}(1-|z|/h)_+$, and $(h,\rho)\in\{1/16,1/32\}\times\{1/32,1/64\}$. No equation coefficient is varied.

Claim grade: derived. Among complete antipodal uniform circles with $R\ge2$ and $\beta\ge\pi/2$, every possible balanced circle must satisfy

$$
2\le R<4,\qquad \frac{11}{4}<\beta<\frac72.
$$

The remaining rectangle is not asserted to contain a circle. This theorem excludes all larger-radius and larger-speed tails analytically, without extrapolating a sweep. Together with the earlier positive-tangent exclusion below $\pi/2$, it bounds the possible radius of any positive-speed antipodal circle by four. The previous independently assessed bounded radial result remains a separate source for smaller radii.

## Complete integral and first active age

At reception zero, the partner range is $r_p(\tau)=2R|\cos(\beta\tau/(2R))|$, while the self radial contribution is nonnegative. Put $T=2R+h$, $g(r)=r^2/(r^2+\rho^2)^{3/2}$, and $W(x)=(1-|x|)_+$. The complete inward radial input obeys

$$
-RA_r\le\frac1{2h}\int_0^T g(r_p(\tau))W\!\left(\frac{r_p(\tau)-\tau}{h}\right)d\tau,
\qquad g(r)\le\min\left(\frac2{5\rho},\frac1r\right).
$$

All older ages vanish because every chord is at most $2R$. A circle requires $-RA_r=\beta^2$. Dropping the nonnegative self contribution is conservative; it does not remove self input from the equation.

The partner range is $\beta$-Lipschitz and starts at $2R$. Thus any active age satisfies

$$
\tau\ge\tau_0:=\frac{2R-h}{\beta+1}.
$$

A stronger lower bound will be useful when $R\ge2$ and $\beta\ge\pi/2>3/2$:

$$
\tau>\frac{11R}{4(\beta+1)}=:\tau_*.
$$

To prove it, use $|\cos x|\ge\cos x\ge1-x^2/2$, which gives $r_p(\tau)\ge2R-\beta^2\tau^2/(4R)$. At $\tau=\tau_*$, writing $x=1/(\beta+1)\in(0,2/5)$, the lower bound for $(r_p-\tau)/R$ is

$$
2-\frac{121}{64}(1-x)^2-\frac{11}4x
=\frac7{64}+\frac{33}{32}x-\frac{121}{64}x^2
\ge\frac7{64}.
$$

The last concave polynomial is bounded below by its endpoint minimum on $[0,2/5]$, namely $7/64$; the other endpoint is $351/1600>7/64$. Since $h/R\le1/32$, this lower bound exceeds $h/R$. The quadratic lower bound decreases with nonnegative age, so all earlier ages are also inactive. On active ages one consequently has

$$
r_p\ge\tau-h> a:=\frac{11R}{4(\beta+1)}-h.
$$

For $R\ge2$ and $\beta\le6$, $a\ge(5/2)R/(\beta+1)$. For $R\ge4$ and $\beta\le6$, the stronger $a\ge(21/8)R/(\beta+1)$ holds. Both follow by moving $h$ into the coefficient and using $h\le1/16$.

## Exclusion for every speed at least six

For $\tau>h$, the triangular taper satisfies $W((r-\tau)/h)/r\le1/\tau$. For $r\ge\tau$ this follows from $W\le1$. For $r\le\tau$ on the support it is equivalent to $(\tau-h)(r-\tau)\le0$. Therefore, whenever $\tau_0>h$,

$$
-RA_r\le\frac1{2h}\log\frac{(2R+h)(\beta+1)}{2R-h}
\le16\log\left[\frac{65}{63}(\beta+1)\right]\qquad(R\ge2).
$$

At $\beta=6$, the last expression is below $16\log8<168/5<36$. The difference $\beta^2-16\log[(65/63)(\beta+1)]$ increases for $\beta\ge6$, since its derivative is $2\beta-16/(\beta+1)>0$. Here $\log2<7/10$ follows from the positive exponential series through degree three.

If $\tau_0\le h$, then $R\le h(\beta+2)/2$ and, since $R\ge2$, necessarily $\beta\ge62$. The constant bound for $g$ gives

$$
-RA_r\le\frac{2R+h}{5h\rho}
\le\frac{\beta+3}{5\rho}\le\frac{64}{5}(\beta+3)<\beta^2.
$$

The final comparison already holds at $\beta=16$ and increases thereafter. These two cases exhaust all radii and speeds under consideration. Hence no circle has $R\ge2$, $\beta\ge6$.

## Which partner chord lobes can contribute below speed six

Use phase $\theta=\beta\tau/R$. The first partner lobe is $0\le\theta\le\pi$, where $r_p=2R\cos(\theta/2)$ and $d(r_p-\tau)/d\tau=-\beta\sin(\theta/2)-1\le-1$. Its entire triangular reception weight therefore has integral at most one under the monotone change of variable $r_p-\tau$. Using $g\le1/a$, its inward contribution is at most $1/(2a)$.

Later lobes start at $\theta=(2k-1)\pi$, $k=1,2,\ldots$. Their maximum gap divided by $R$ is

$$
\frac{f_k(\beta)}\beta,
\qquad f_k(\beta)=2\sqrt{\beta^2-1}-(2k-1)\pi-2\arccos(1/\beta).
$$

This follows by differentiating the concave lobe gap. Its derivative with respect to speed is $f_k'(\beta)=2\sqrt{\beta^2-1}/\beta>0$ for $\beta>1$. A negative bound at the largest speed therefore bounds every smaller speed, and increasing $k$ further decreases the maximum.

For $\beta\le11/4$, only the first lobe can be active. Indeed, $\arccos(4/11)>9/8$ because $\cos(9/8)\ge1-(9/8)^2/2=47/128>4/11$. With $\pi>157/50$ and $\sqrt{105}/2<21/4$,

$$
f_1(11/4)<\frac{21}4-\frac{157}{50}-\frac94=-\frac7{50}.
$$

For $R\ge2$ the gap on every later lobe is thus below $-(14/275)R\le-28/275<-h$. Such lobes contribute exactly zero. The first-lobe upper bound $1/(2a)$ is at most $3/8$, using $a\ge(5/2)R/(\beta+1)\ge4/3$. This is strictly below $\beta^2$ for $\beta\ge\pi/2$. Hence $R\ge2$, $\pi/2\le\beta\le11/4$ is excluded.

For all $\beta\le6$, at most one later lobe can contribute. The alternating cosine series gives

$$
\cos(7/5)\ge1-\frac{49}{50}+\frac{2401}{15000}-\frac{117649}{11250000}
=\frac{1908101}{11250000}>\frac16,
$$

so $\arccos(1/6)>7/5$. Consequently

$$
f_2(6)<12-3\frac{157}{50}-2\frac75=-\frac{11}{50}.
$$

For $R\ge2$, the third and every subsequent lobe have gap below $-(11/300)R\le-11/150<-h$. Thus the only possible partner input below speed six consists of the first monotone lobe and the following lobe. This is a complete support statement, including lobes whose central gap stays negative but could otherwise meet a finite-width window.

## Curvature bound for the remaining lobe

A twice differentiable concave function with second derivative at most $-\kappa<0$ has total set length at most $4\sqrt{h/\kappa}$ where its values lie in $[-h,h]$. To prove this, split at its maximum into at most two monotone sides. Each side contributes at most one interval. On an interval of length $L$ on either side, concavity and the derivative sign at the endpoint nearest the maximum imply a value drop of at least $\kappa L^2/2$. Since the values stay in a band of width $2h$, $L\le2\sqrt{h/\kappa}$. Summing both sides proves the bound. The same argument covers a maximum at an endpoint.

On each complete chord lobe, restrict to the interval where $r_p\ge a$. Every active point lies there, and

$$
\frac{d^2(r_p-\tau)}{d\tau^2}=-\frac{\beta^2r_p}{4R^2}
\le-\kappa,\qquad \kappa=\frac{\beta^2a}{4R^2}.
$$

The interval restriction is connected because a chord lobe is concave. It excludes the chord cusps from differentiation while retaining all active input. The preceding band-length theorem and $W\le1$, $g\le1/a$ bound the inward contribution from the one potentially active later lobe by $4R/(\beta\sqrt h\,a^{3/2})$. Including the first lobe gives

$$
-RA_r\le\frac1{2a}+\frac{4R}{\beta\sqrt h\,a^{3/2}}.
$$

If $a\ge cR/(\beta+1)$, division by the circle's required $\beta^2$ yields

$$
\frac{-RA_r}{\beta^2}\le
\frac{\beta+1}{2cR\beta^2}
+\frac{4(\beta+1)^{3/2}}{\beta^3c^{3/2}\sqrt{hR}}.
$$

Both speed-dependent factors decrease for positive speed. For $R\ge2$, $7/2\le\beta\le6$, use $c=5/2$, $hR\ge1/16$. The first term is at most $9/245<1/16$, while the square of the second is at most

$$
\frac{11943936}{14706125}<\frac{225}{256}.
$$

Their sum is strictly below $1/16+15/16=1$. This excludes the whole region $R\ge2$, $7/2\le\beta\le6$.

For $R\ge4$, $11/4\le\beta\le6$, use $c=21/8$, $hR\ge1/8$. The first term is at most $20/847<1/16$, while the square of the second is at most

$$
\frac{524288000}{607645423}<\frac{225}{256}.
$$

Again the sum is strictly below one. Together with the previous speed regions, this excludes every $R\ge4$, $\beta\ge\pi/2$. All displayed numerical comparisons are rational inequalities; a mandated-venv `fractions.Fraction` calculation checked their exact values before any enlarged circle target.

## Remaining domain, relationship to diagnostics and falsifiers

The enlarged proposed diagnostic rectangle $[\pi/2,32]\times[2,128]$ now has only $\beta\in(11/4,7/2)$, $R\in[2,4)$ analytically unresolved. A diagnostic driver may record the analytical disposition of the rest and evaluate the unresolved part; it must retain the original domain and masks explicitly. These conclusions derive from the complete source-age integral and do not depend on diagnostic quadrature, a root search or a stability spectrum.

The proof is falsified by an active partner age below the derived minimum, a missing lobe with gap at least $-h$, failure of the concave-band length bound, or a circle violating one of the stated inward-input upper bounds. An interval or root computation in the remaining region still needs its own known controls and independent assessment. The existence of a circle there remains open in this source.
