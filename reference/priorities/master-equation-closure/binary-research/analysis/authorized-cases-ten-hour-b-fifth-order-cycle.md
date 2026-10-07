# The signed fifth-order cycle coefficients

**Status: derived finite-coefficient candidate, unreviewed.** Keep the exact member $\epsilon=2^{-200000}$, $K=c_f=1$, $R_0=2^{399998}$ and its complete [case preparation](authorized-cases-ten-hour-b-case.md). This document develops the deterministic terms needed by the [finite phase-map route](authorized-cases-ten-hour-b-phase-map-route.md). The delayed path and its sixth seams remain unchanged. The calculations below determine finite autonomous coefficients and their cycle averages; they do not yet supply an actual long-time phase enclosure.

Write $p=r'$, $t=h/r$ for the radial and tangential speeds, and $g=4/3$. The symbol $t$ in this document is a speed component, not the time variable $s$. Let $e_r,e_\theta$ be the polar frame. The finite comparison field begins with

$$
F_0=-\frac{e_r}{r^2},\qquad
F_2=-\frac{t^2}{2r^2}e_r-\frac{pt}{r^2}e_\theta,
\qquad
F_3=\frac{g}{r^3}(-2p e_r+t e_\theta).
\tag{1}
$$

These are the already admitted coefficients, used as analytical controls before computing the higher ones.

## 1. Complete fourth and fifth coefficients

Hold the source path fixed during the receiver gradient. Put $q(u)=x+y(s-u)$, $L=|q|$, and evaluate at $x=y(s)$ only after differentiation. The present-source coefficient rule gives

$$
C_4=\tfrac12\partial_u^4(Lq)|_0,
\qquad C_5=\tfrac{2}{15}\partial_u^5((q\cdot q)q)|_0.
\tag{2}
$$

The acceleration-dependent part of $C_2$ is $(I-e_re_r^{\mathsf T})y''/r$ and $C_3=-(4/3)y'''$. Thus the autonomous substitutions required at these orders are

$$
F_4=C_4[F_0]+\frac{(F_2)_\theta}{r}e_\theta,
\qquad
F_5=C_5[F_0]+\frac{(F_3)_\theta}{r}e_\theta
-\frac43\mathcal D_{F_0}F_2.
\tag{3}
$$

The central jets used in (2) are

$$
\begin{aligned}
y''&=-r^{-2}e_r,\\
y'''&=r^{-3}(2p e_r-t e_\theta),\\
y^{(4)}&=\{(3t^2-6p^2)r^{-4}-2r^{-5}\}e_r
+6pt r^{-4}e_\theta,\\
y^{(5)}&=\{(24p^3-36pt^2)r^{-5}+22p r^{-6}\}e_r\\
&\quad+\{(9t^3-36p^2t)r^{-5}-8t r^{-6}\}e_\theta.
\end{aligned}
\tag{4}
$$

For an explicit polynomial check on the fifth calculation, the derivatives $b_j=\partial_u^j(q\cdot q)|_0$ are

$$
\begin{aligned}
b_0&=4r^2,& b_1&=-4rp,&b_2&=2(p^2+t^2)-4/r,\\
b_3&=-2p/r^2,&b_4&=(4t^2-8p^2)/r^3-2/r^4,\\
b_5&=(-36p^3+54pt^2)/r^4-28p/r^5.
\end{aligned}
\tag{5}
$$

Inserting (4)–(5) in the binomial derivative of $(q\cdot q)q$ yields

$$
\begin{aligned}
(C_5)_r&=\frac{-32p^3+88pt^2}{5r^3}+\frac{4p}{5r^4},\\
(C_5)_\theta&=\frac{56p^2t-24t^3}{5r^3}+\frac{4t}{15r^4}.
\end{aligned}
$$

The needed quadratic jerk is

$$
\mathcal D_{F_0}F_2
=\frac{3pt^2}{r^3}e_r
+\left\{\frac{3p^2t-(3/2)t^3}{r^3}+\frac{t}{r^4}\right\}e_\theta.
\tag{6}
$$

Equations (2)–(6) give the complete coefficients

$$
\boxed{
\begin{aligned}
(F_4)_r&=-\frac{3t^4}{8r^2}+\frac{4(t^2-p^2)}{r^3}-\frac1{r^4},\\
(F_4)_\theta&=\frac{7pt}{r^3}-\frac{3pt^3}{2r^2},\\
(F_5)_r&=\frac{-32p^3+68pt^2}{5r^3}+\frac{4p}{5r^4},\\
(F_5)_\theta&=\frac{36p^2t-14t^3}{5r^3}+\frac{4t}{15r^4}.
\end{aligned}}
\tag{7}
$$

At the central circular control $r=t=1,p=0$, (7) returns $(F_4)_r=21/8$ and $(F_5)_\theta=-38/15$, matching the direct receiver-gradient controls in the [prepared-seed calculation](authorized-cases-ten-hour-b-prepared-seed-correction.md). This is an analytical consistency check; a separate reference must adjudicate the full coefficients.

## 2. Fourth-order primitives remove the reversible terms

Define the auxiliary angular quantity $\mathcal H$ and account $\mathcal E_4$ by

$$
\mathcal H=H\exp\left[\epsilon^4
\left(\frac7{2r^2}-\frac{h^2}{2r^3}\right)\right],
\tag{8}
$$

$$
\mathcal E_4=\mathcal E+\epsilon^4
\left(-\frac{2p^2}{r^2}+\frac{2h^2}{r^4}
-\frac{3h^4}{8r^5}+\frac1{r^3}\right).
\tag{9}
$$

Neither is physical energy or a new equation. Direct differentiation using the coefficients through five gives, as finite coefficient identities,

$$
(\log\mathcal H)'=\frac{g\epsilon^3}{r^3}
+\epsilon^5G_5+\text{terms of degree at least six},
\tag{10}
$$

$$
\mathcal E_4'=\frac{g\epsilon^3}{r^4}
+\epsilon^5D_5+\text{terms of degree at least six},
\tag{11}
$$

where

$$
G_5=\frac{36p^2-14t^2}{5r^3}+\frac4{15r^4},
\tag{12}
$$

$$
D_5=\frac{-32p^4+104p^2t^2-14t^4}{5r^3}
+\frac{4p^2-2t^2}{5r^4}.
\tag{13}
$$

For example, $(F_4)_\theta/t$ is the central derivative of $-7/(2r^2)+h^2/(2r^3)$, proving the angular cancellation. In the account calculation the fifth contribution from its existing two corrections is $-(g/2)t^2/r^4$, which must be added to $p(F_5)_r+t(F_5)_\theta$. Omitting it gives an incorrect coefficient in (13).

Integrating (12)–(13) on an undeformed central conic gives

$$
\oint G_5\,ds=-\frac{\pi(76+14e^2)}{15h^5},
\qquad
\oint D_5\,ds=\frac{\pi(-32-44e^2+e^4)}{5h^7}.
\tag{14}
$$

These are not yet the full fifth-order cycle drift. The quadratic deformation of the cycle also modifies the leading cubic integrals at fifth order.

## 3. Carry the quadratic orbit deformation before averaging

For the frozen reversible problem through quadratic order, put

$$
W=H^2/r,\qquad U=Hp,\qquad
\delta=\epsilon/H,\qquad d\psi/ds=H/r^2.
$$

The quadratic equations are $W_\psi=-U$ and $U_\psi=W-1+(3/2)\delta^2W^2$. With $e$ defined as the fundamental Fourier amplitude of $W$, the finite expansion is

$$
\begin{aligned}
W&=1+e\cos\theta+\delta^2
\left(-\frac32-\frac34e^2+\frac14e^2\cos2\theta\right)
+\text{terms of degree at least four},\\
U&=e(1+\tfrac32\delta^2)\sin\theta
+\tfrac12\delta^2e^2\sin2\theta
+\text{terms of degree at least four},\\
\frac{d\theta}{d\psi}&=1+\frac32\delta^2
+\text{terms of degree at least four}.
\end{aligned}
\tag{15}
$$

Substitution in the quadratic equation verifies each harmonic: its constant forcing is $-(3/2)(1+e^2/2)$, its fundamental forcing shifts the squared frequency by $3\delta^2$, and its second harmonic gives $e^2\cos2\theta/4$. The geometric angle obeys

$$
\frac{d\phi}{d\theta}
=1+\delta^2(-\tfrac12+e\cos\theta)
+\text{terms of degree at least four}.
\tag{16}
$$

Thus even the geometric angle per radial cycle is $2\pi(1-\delta^2/2)$ through this order. This precession is part of the finite-map input.

For the leading cubic integrals, $ds=H^3W^{-2}(d\theta)/(1+(3/2)\delta^2)$. The integrals of $W$ and $W^2$ in (15) supply their quadratic corrections. Adding (14), and using $\mathcal H=H+O(\delta^4H)$, gives the formal full cycle increments

$$
\Delta\log\mathcal H
=\pi\delta^3\left\{\frac83
-\frac{196+44e^2}{15}\delta^2\right\}
+\text{terms of degree at least six},
\tag{17}
$$

$$
\mathcal H^2\Delta\mathcal E_4
=\pi\delta^3\left\{\frac83(1+e^2/2)
+\frac{-92-74e^2+e^4}{5}\delta^2\right\}
+\text{terms of degree at least six}.
\tag{18}
$$

At degree five the slow change within a cycle has no effect on these coefficients: its leading size is degree three, and insertion in the degree-three drift first contributes at degree six. This is a finite coefficient statement. It does not bound an accumulated degree-six remainder over the actual number of cycles.

## 4. The signed growth correction

Let $q=e^2$. The reversible account expressed in the same cycle coordinate is

$$
\mathcal H^2\mathcal E_4
=\frac{q-1}{2}+\frac{\delta^2}{2}(1+3q)
+\text{terms of degree at least three}.
\tag{19}
$$

For this finite averaged calculation the cubic oscillatory part is removed by its cycle primitive. It does not change the quadratic coefficient displayed in (19). Dividing (18) by (17) gives

$$
\frac{\mathcal H^2\Delta\mathcal E_4}{\Delta\log\mathcal H}
=1+\frac q2+\delta^2\left(-2-2q+\frac58q^2\right)
+\text{terms of degree at least three}.
\tag{20}
$$

Differentiating the explicitly displayed part of (19), including $d\delta/d\log\mathcal H=-\delta$, therefore gives the signed averaged coefficient

$$
\boxed{
\frac{dq}{d\log\mathcal H}
=3q+\delta^2\left(-q+\frac54q^2\right)
+\text{higher-order averaged terms}.
}
\tag{21}
$$

The small-mode coefficient is negative:

$$
\frac{d\log e}{d\log\mathcal H}
=\frac32-\frac12\delta^2+\frac58q\delta^2
+\text{higher-order averaged terms}.
\tag{22}
$$

A magnitude-only treatment would discard precisely this sign. The distinction between (14) and the full increments (17)–(18) is essential to it.

The compact-mode amplitude satisfies $A=e(1+(3/2)\delta^2)/\sqrt2$ through quadratic order, because its centered reversible account is $q(1+3\delta^2)/2$. Thus the corresponding finite coefficient for that amplitude is

$$
\frac{d\log A}{d\log H}
=\frac32-\frac72\delta^2+\frac58q\delta^2
+\text{higher-order averaged terms}.
\tag{23}
$$

As a second algebraic check, differentiating the actual finite polar field at its moving center gives the centered trace $4\delta^3-(584/15)\delta^5$ in the frozen orbital clock. The slowly changing potential curvature contributes $4\delta^5$ to the logarithmic squared-norm rate. Division by twice the center rate $(4/3)\delta^3-(128/15)\delta^5$ returns $3/2-(7/2)\delta^2$, agreeing with (23). This check is authored here and is not an independent reference assessment.

## 5. The attainable next estimate and its present boundary

The equations above make the next signed estimate concrete. A center through degree eight and a cycle primitive through degree five would aim to bound the omitted logarithmic transport by

$$
C\left(\delta^3+\frac{\delta^6}{A}\right)
\tag{24}
$$

per unit $\log H$ on the accepted compact chart, after replacing the actual acceleration by the independently admitted finite value comparison. The accepted lower amplitude bound $A\asymp\epsilon^3H^{3/2}$ makes the integral of (24) of relative order $C\epsilon^3$. Its nonlinear displayed term integrates to relative order $C\epsilon^6$ before the first fixed-amplitude section. The negative linear correction in (23), by contrast, integrates to $-(7/4)\epsilon^2$ at that section. This separates the desired signed term from the next power if an explicit $C<2^{200000}$ is proved.

Combining that prospective transport with the prepared-seed coefficient would give the candidate relative coefficient

$$
-\frac{104059}{40960}-\frac74
=-\frac{175739}{40960}
\tag{25}
$$

for the late compact value of $A/H^{3/2}$. Equation (25) is a proposed combined coefficient, not an admitted actual-history theorem: (24), its explicit constant, the norm change and the higher center still require an operation-level construction. The prepared-seed subject itself remains subject to separate review. No unspecified constant is assumed smaller than the fixed dyadic scale.

Even proving (24) would leave a relative cubic remainder, which the leading critical-angle sensitivity can amplify to order $\epsilon^{-6}$. It would sharpen the preparation-to-turn transport without determining its final phase. The eventual phase certificate needs further finite orders, their initial-layer matching and the uniform last-section argument already stated in the phase-map treatment.

The falsifiers are an incorrect receiver-gradient coefficient in (2), an omitted autonomous substitution in (3), a failed reversible cancellation in (10)–(13), omission of the quadratic cycle deformation, or an incorrect account-coordinate derivative in passing from (20) to (21). All are finite algebraic checks available to an independent reviewer. No target trajectory, scalar phase computation, source-history replacement, external physical premise, Python process or Git mutation was used.
