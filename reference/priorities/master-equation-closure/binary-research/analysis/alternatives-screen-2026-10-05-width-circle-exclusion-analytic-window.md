# A triangular-window radial bound for complete antipodal circles

Claim grade: derived, pending coordinating assessment. For the same four finite-width/core laws with $K_{ij}=c_f=1$, the complete antipodal circular radial balance is impossible wherever the speed exceeds the explicit bound derived below. In particular, at every radius $0<R\le2$, the law $(h,\rho)=(1/16,1/32)$ has no circle with $\beta\ge13/2$, and the law $(1/16,1/64)$ has no circle with $\beta\ge7$. This improves the upper-speed exclusions in the [frozen interval protocol](alternatives-screen-2026-10-05-width-circle-exclusion-protocol.md) without modifying that protocol or its instrument. No numerical target is used in this derivation.

## Radial geometry and a pointwise window inequality

For an antipodal circle of radius $R$, the self radial contribution is nonnegative, while the negative partner contribution has normalized radial magnitude

$$
-RA_r\le\frac12\int_0^T g(r_p(\tau))\delta_h(r_p(\tau)-\tau)\,d\tau,
\qquad T=2R+h,\qquad
g(r)=\frac{r^2}{(r^2+\rho^2)^{3/2}}.
$$

The upper endpoint $T$ contains the complete source-age support because every chord range is at most $2R$. The selected triangular window is $\delta_h(z)=W(z/h)/h$, with $W(t)=\max(0,1-|t|)$. Differentiation shows that $g$ has its maximum at $r=\sqrt2\rho$ and

$$
0\le g(r)\le\frac2{3\sqrt3\rho}<M:=\frac2{5\rho},\qquad g(r)\le\frac1r\quad(r>0).
$$

For every $\tau>h$, the support condition gives $r>0$, and

$$
\frac{W((r-\tau)/h)}r\le\frac1\tau.
$$

To check the claim, outside the window the left side is zero. For $r\ge\tau$, use $W\le1$ and $r\ge\tau$. For $r\le\tau$ inside the window, $W=(r-\tau+h)/h$, and the desired inequality is equivalent to $(\tau-h)(r-\tau)\le0$. Thus the inequality holds on the whole support, including its corners, without a derivative or a root-count assumption.

Consequently the complete partner radial integrand is bounded by $M/h$ for $0\le\tau\le h$ and by $\min(M,1/\tau)/h$ for $\tau>h$. This retains the triangular taper and is sharper than bounding the window everywhere by its maximum.

## Integrated bound and explicit excluded regions

Let $a=1/M=5\rho/2$ and $b=\max(h,a)$. Since $T\ge h$, the preceding piecewise bound integrates to

$$
-RA_r\le U_{\triangle}(R):=
\begin{cases}
MT/(2h),&T\le b,\\[2pt]
\big[M b+\log(T/b)\big]/(2h),&T>b.
\end{cases}
$$

When $b=a\ge h$, the constant bound applies through age $a$ and the reciprocal-age bound thereafter. When $b=h>a$, the initial constant part ends at $h$, and every later age uses the reciprocal bound. These are all cases; the formulas agree at the join. Radial balance requires $\beta^2=-RA_r$, so $\beta^2>U_{\triangle}(R)$ excludes a circle. Taking the minimum of this bound, the previous complete-age logarithmic bound, and the small-radius bound remains valid and may sharpen a parameter-box exclusion.

For $(h,\rho)=(1/16,1/32)$ and $R\le2$, one has $a=b=5/64$ and $T/b\le52<64$. If $T\le b$ the bound is at most $1/(2h)=8$; otherwise, using $\log2<7/10$,

$$
U_{\triangle}(R)<8(1+\log64)<8\left(1+6\frac7{10}\right)=\frac{208}{5}<\left(\frac{13}{2}\right)^2.
$$

Hence every circle with $R\le2$ and $\beta\ge13/2$ is excluded in this law.

For $(h,\rho)=(1/16,1/64)$, one has $b=h$, $M=128/5$ and $T/h\le65$. Since $\log(1+t)\le t$ for $t\ge0$,

$$
U_{\triangle}(R)\le\frac{64}{5}+8\log65
\le\frac{64}{5}+8\left(6\log2+\frac1{64}\right)
<\frac{1861}{40}<7^2.
$$

Thus every circle with $R\le2$ and $\beta\ge7$ is excluded in the second law. The elementary bound $\log2<7/10$ follows from the positive exponential series, because its terms through degree three already give $1+7/10+(7/10)^2/2+(7/10)^3/6>2$. The bound for $\log(1+t)$ follows by integrating $1/(1+s)\le1$ from zero to $t$. No floating logarithm supplies these inequalities.

For the narrower windows, the radius-dependent formula remains useful even though these coarse substitutions do not exclude every large radius at speed eight. For example, when $(h,\rho)=(1/32,1/64)$ and $R\le1/4$, $T/b\le68/5<16$ and $b=5/128$. Therefore $U_{\triangle}<16(1+4\cdot7/10)=304/5<8^2$, excluding $\beta\ge8$ on that radius region. The general formula, rather than these convenient sufficient thresholds, is the primary bound.

## Scope and falsifiers

The derivation includes the full causal age integral and both self and partner channels. It discards the nonnegative self radial contribution only to make a conservative upper bound on inward input; it does not delete that channel from the law. It requires no tangential sign, no incoming history, no numerical quadrature and no boundary root selection. Its conclusion is absence of radial balance in the stated regions, hence absence of antipodal circles there. It supplies no dynamical stability or noncircular fate claim.

Falsifiers are a negative self radial contribution for the stated circular geometry, a contribution at age $\tau>2R+h$, a failure of $\tau W((r-\tau)/h)\le r$ for $\tau>h$, or a balanced circle violating $\beta^2\le U_{\triangle}(R)$. Parameter regions not covered by a strict comparison remain unresolved. The accompanying interval work must preserve those regions rather than treating this partial theorem as a complete rectangle exclusion.
