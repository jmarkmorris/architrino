# Analytical exclusion of the final high-speed circle rectangle

Status: new derived subject, frozen before the prepared high-speed interval target, pending independent coordinating assessment. It does not modify the [frozen high-speed protocol](alternatives-screen-2026-10-05-width-high-protocol.md), its driver, known-control receipt or earlier references. The target interval computation has not run at the time this proof is frozen.

Claim grade: derived. For the same four fixed laws with $K_{ij}=c_f=1$, self sign $+1$, opposite-polarity partner sign $-1$, triangular window $\delta_h(z)=h^{-1}(1-|z|/h)_+$, and $(h,\rho)\in\{1/16,1/32\}\times\{1/32,1/64\}$, there is no complete fixed-center antipodal uniform circle with

$$
8\le\beta\le10,\qquad0<R\le2.
$$

This contains the entire final compact rectangle proposed for the interval target. Together with the finite upper-speed bound already derived in the frozen protocol, it excludes all $\beta\ge8$, $0<R\le2$ without numerical integration. The full positive-radius/positive-speed assembly remains a separate coordinating assessment of every component.

## Complete-age inequalities used

At receiver $(R,0)$ and age $\tau$, the partner chord range is $r_p(\tau)=2R|\cos(\beta\tau/(2R))|$. The self radial contribution is nonnegative, and all ages above $T=2R+h$ vanish. With $g(r)=r^2/(r^2+\rho^2)^{3/2}$ and $W(x)=(1-|x|)_+$,

$$
-RA_r\le\frac1{2h}\int_0^T g(r_p(\tau))W\!\left(\frac{r_p(\tau)-\tau}{h}\right)d\tau.
$$

The [triangular-window theorem](alternatives-screen-2026-10-05-width-circle-exclusion-analytic-window.md) derives

$$
-RA_r\le U_\triangle(R)=
\begin{cases}
MT/(2h),&T\le b,\\
\big[Mb+\log(T/b)\big]/(2h),&T>b,
\end{cases}
\qquad M=\frac2{5\rho},\quad b=\max(h,5\rho/2).
$$

Its inputs are $g\le M$, $g\le1/r$ and $W((r-\tau)/h)/r\le1/\tau$ for $\tau>h$. The last inequality is immediate for $r\ge\tau$ and equivalent to $(\tau-h)(r-\tau)\le0$ for $r\le\tau$ on the window support. Thus every corner and active age is included.

Also, since the partner chord is $\beta$-Lipschitz and $r_p(0)=2R$, active ages obey

$$
\tau\ge\tau_0:=\frac{2R-h}{\beta+1}.
$$

Indeed $r_p(\tau)\ge2R-\beta\tau$, while reception requires $r_p(\tau)\le\tau+h$. If $\tau_0>h$, integrating the reciprocal-age bound over the complete possible age interval gives

$$
-RA_r\le\frac1{2h}\log\frac{T}{\tau_0}
=\frac1{2h}\log\frac{(2R+h)(\beta+1)}{2R-h}.
$$

No assumption is made that every age in this interval is active; including inactive ages in the upper bound is conservative. A circle requires $-RA_r=\beta^2$.

## Wide windows

For $h=1/16$ and $R\le2$, the complete triangular theorem gives $U_\triangle<208/5$ when $\rho=1/32$ and $U_\triangle<1861/40$ when $\rho=1/64$. Both bounds are below $49<64$. Therefore every $\beta\ge8$ is excluded for these two laws.

## Narrow windows at radii at most one quarter

Let $h=1/32$ and $0<R\le1/4$. Then $T\le17/32$.

For $\rho=1/32$, one has $b=5/64$, $Mb=1$, and $T/b\le34/5<8$. The triangular bound is strictly below

$$
16(1+\log8)<16\left(1+3\frac7{10}\right)=\frac{248}{5}<64.
$$

For $\rho=1/64$, one has $b=5/128$, $Mb=1$, and $T/b\le68/5<16$. The bound is strictly below

$$
16(1+\log16)<16\left(1+4\frac7{10}\right)=\frac{304}{5}<64.
$$

If $T\le b$, the constant branch is at most 16 and also satisfies these upper bounds. The elementary estimate $\log2<7/10$ follows from $\exp(7/10)>1+7/10+(7/10)^2/2+(7/10)^3/6>2$. Both narrow-window laws are therefore excluded for every $\beta\ge8$ in this radius region.

## Narrow windows from radius one quarter through two

Now take $h=1/32$, $1/4\le R\le2$, and $8\le\beta\le10$. The first possible active age satisfies

$$
\tau_0\ge\frac{1/2-1/32}{11}=\frac{15}{352}>\frac1{32}=h.
$$

The reciprocal-age estimate therefore applies throughout this rectangle. The ratio $(2R+h)/(2R-h)$ decreases with positive $R>h/2$, so

$$
\frac{(2R+h)(\beta+1)}{2R-h}
\le\frac{17}{15}\,11=\frac{187}{15}<16.
$$

Consequently, independently of the selected core size,

$$
-RA_r\le16\log\frac{(2R+h)(\beta+1)}{2R-h}
<16\log16<\frac{224}{5}<64\le\beta^2.
$$

This rules out radial balance on the remaining region. The bounds overlap at $R=1/4$ and include speeds eight and ten, so their union has no boundary gap.

## Scope and proof disposition

The proof controls the entire self-inclusive equation by retaining self input as a nonnegative radial contribution and conservatively bounding the partner's full possible age interval. It uses no diagnostic samples, numerical quadrature, sharp-window limit, omitted chord lobe, fitted coefficient or spectrum. The result concerns complete fixed-center antipodal uniform circles only, not capture, causal release, noncircular motion or stability.

The prepared interval cover of $[8,10]\times[1/512,2]$ is no longer mathematically necessary for this region if the coordinator independently accepts this derivation. Its frozen known controls and protocol remain preserved. Running it would supply an additional implementation check, not independent proof of the elementary inequalities unless assessed against this separate analytical reference.

A balanced circle in the stated region, a negative self radial contribution, an active age before $\tau_0$, a contribution after $2R+h$, or a failure of the triangular/reciprocal-age inequalities is an operator-checkable falsifier. The explicit six-region positive-domain union is retained in the frozen high-speed protocol; the new analytical theorem can replace its formerly pending sixth region without altering any earlier reference.
