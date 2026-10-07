# Blind sixth-jet reference for the exact gradient row

**Derived before sixth-order subject disclosure.** Keep the fixed compatible $C^{5,1}$ history and exact normalized amplitude-gradient row from the [original B reference](authorized-cases-ten-hour-reference-b.md). This note addresses the mixed reception estimate through derivative four; it does not quantify the later signed-mode transport or select the terminal branch.

Let $\delta=\epsilon L$, current state $(y,v)$, sampled state $(y_d,v_d,a_d)$, and define source-segment integrals

$$
I_1=\int_0^1a(s-\theta\delta)\,d\theta,\qquad
I_2=\int_0^1(1-\theta)a(s-\theta\delta)\,d\theta.
$$

The exact integral Taylor identities are $y_d=y-\delta v+\delta^2 I_2$ and $v_d=v-\delta I_1$. Set

$$
Y=y+\frac{\delta^2}{2}(I_2-I_1)
=y-\frac{\epsilon^2L^2}{2}\int_0^1\theta a(s-\theta\epsilon L)\,d\theta.
$$

Then the actual ray satisfies the exact affine identity $y+y_d=2Y-\epsilon L v_d$. Consequently its non-acceleration row is the closed affine response at $(Y,v_d)$, even though neither actual path is affine. Writing $r_Y=|Y|$, the affine response is

$$
F_{\rm aff}(Y,V;\epsilon)
=-\frac{(1-\epsilon^2|V|^2)Y+\epsilon^2(Y\cdot V)V}
{r_Y^3[1-\epsilon^2(|V|^2-(Y\cdot V)^2/r_Y^2)]^{3/2}}.
$$

It is exactly even in epsilon and equals $F_0(Y)+\epsilon^2G(Y,V,\epsilon^2)$ on any fixed strict affine chart. The complete exact row therefore factors as

$$
F-F_0(y)=\epsilon^2\left[
\int_0^1DF_0(y+\lambda(Y-y))\frac{Y-y}{\epsilon^2}\,d\lambda
+G(Y,v_d,\epsilon^2)+\frac{4n(n\cdot a_d)}{LD^3}
\right].
$$

This exact factorization removes the first-order cancellation before differentiating reception time. Four reception derivatives of either source-segment integral use at most four derivatives of a, hence source jet six almost everywhere. The same is true of the explicit $a_d$ term. Four derivatives of sampled velocity use jet five. The clock derivatives through four are bounded on the strict implicit-root chart. The maps $s\mapsto s-\theta\epsilon L(s)$ have derivative $(1-\theta)+\theta s_d'>0$, so compatible sixth-jet seams compose as almost-everywhere bounded terms; no delta distribution or seventh source derivative is introduced.

A quantitative constant can be obtained directly from this identity. In the factorial-weighted $W^{4,\infty}$ norm, products obey the algebra inequality. If the derivatives through four of every interpolated clock, divided by their factorials, are at most K, and source jets two through six are at most M, the conservative Bell-polynomial bound $24M(1+24K)^4$ bounds each unweighted composed acceleration through derivative four; the integrals add no larger factor. Bounds for L, its four derivatives, inverse L/D, the straight Y-to-y segment radius, and the first five derivatives of the explicit central/affine functions then give a stated finite constant C with $\|F-F_0\|_{W^{4,\infty}}\le C\epsilon^2$. The geometric margins and derivative constants must actually be evaluated before claiming a particular numerical C; a large unevaluated exponent is not an admission. This reference does not supply that final ledger.

The estimate differentiates reception time at fixed epsilon. Derivatives across an epsilon-dependent history family require separately established parameter regularity and are not granted by $C^{5,1}$ time regularity. Known exact controls are constant source acceleration zero, where Y=y and the affine even formula applies; stationary source, where the row is exactly central; and direct quadratic Taylor data, where the two integrals are $a$ and $a/2$ and $Y-y=-\delta^2a/4$. A missing factor epsilon squared, a source derivative above six, a singular Y segment or clock margin, or treating supplied sixth jets as generated central jets would falsify the respective claim. No computation or new preparation was used.
