# An analytic speed-monotonicity quotient for the complete opposite frequency

Status: independently derived mathematical reference, frozen before the new numerical target. The [protocol](alternatives-screen-2026-10-05-time-symmetric-frequency-monotonicity-protocol.md) specifies the complete rectangle and required known controls. The law remains the equal-past/future canonical radial binary, $K=c_f=1$, with every partner source and the complete source-clock/source-acceleration derivative retained. No previous determinant subject or reference is changed.

The [assessed all-speed frequency theorem](alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-complete-adjudication.md) gives the unique simple opposite frequency $0<m_*(\beta)<1$. In its notation $F_-(m,x)=m^2G(m^2,x)$, $G(0,x)=-1$, $G_y>0$, and $x=\beta\cos x$. The new question is monotonicity with respect to speed, not the already proved monotonicity in squared frequency.

## 1. Removal of both apparent axis singularities

Let $t=x^2$, $z=4ty$, and

$$
E_r(z)=\sum_{n=0}^\infty\frac{(-1)^nz^n}{(2n+r)!},\qquad 0\le r\le4.
$$

Set $v=E_1(t)/E_0(t)=\tan x/x$, $h=(1+tv)^{-1}=1/D$, $p=tvh$, $u=th^2$, and $q=tv^2=\tan^2x$. These are analytic at $t=0$. The denominators are positive on $0\le t\le9/16$, because $\cos\sqrt t>0$ and $1+tv>0$. Useful exact identities are $p=1-h$ and $uq=p^2$.

For the frequency argument $z$, write

$$
C=E_0(z),\quad S=E_1(z),\quad T=2E_2(z),\quad
S_1=-E_3(z),\quad T_1=-2E_4(z).
$$

Thus $S_1=(S-1)/z$, $T_1=(T-1)/z$, $T=2(1-C)/z$, with their analytic values at zero. These equalities follow term by term from the entire series and hold at both axes without division.

The frozen full determinant has $G=a_0d-f^2+yad$, where $a,d,f$ are its regularized coefficients, not the unregularized matrix entries. Rewrite them using the exact circle relation:

$$
\begin{aligned}
a_0&=-(3+u),\\
a&=-1+t[(2+u+q)T-2hS],\\
d&=-1+t[-h^2T+2qh(S-T)],\\
f&=-2+(p-u)S-pC.
\end{aligned}
\tag{1}
$$

For example $2Ux^2=t(2+u+q)$, $\kappa c^2x=th$, $\kappa s^2x=tqh$, and $2xW=p-u$. For the tangential coefficient, $2V=-h^2-2qh$ follows from $uq=p^2$ and $p=1-h$. These identities derive (1) directly from the complete tensor's scalar coefficients; they do not alter the selected law.

The exact zero-frequency values are $d_0=-1-u$ and $f_0=-2-u$. Define the divided coefficients by their regular formulas

$$
\begin{aligned}
D_1&=4t^2[-h^2T_1+2qh(S_1-T_1)],\\
F_1&=4t[(p-u)S_1+pT/2].
\end{aligned}
\tag{2}
$$

Indeed $d=d_0+yD_1$ and $f=f_0+yF_1$. The second identity uses $(C-1)/z=-T/2$. Substitution and $a_0d_0-f_0^2=-1$ give the exact factorization

$$
G(y,x)=-1+yJ(t,y),\qquad
J=-(3+u)D_1+2(2+u)F_1-yF_1^2+ad.
\tag{3}
$$

Consequently the proposed quotient has the analytic extension

$$
\frac{G_x(y,x)}{xy}=2J_t(x^2,y).
\tag{4}
$$

At $t=0$, $v=h=1$, $p=u=q=0$, $a=d=-1$, and $D_1=F_1=0$. More precisely $p=u=t+O(t^2)$, $q=t+O(t^2)$, $a=-1+O(t^2)$, $d=-1-t+O(t^2)$, and $D_1,F_1=O(t^2)$, uniformly for $0\le y\le1$. Therefore

$$
J(0,y)=1,\qquad J_t(0,y)=1,
$$

and the quotient's zero-angle value is exactly two for every $y$ in the target, including $y=0$. This is an independent check of the proposed limit. No sign for positive $t$ has yet been inferred.

## 2. Complete enclosure recipe

Enclose $J_t$ on $[0,9/16]\times[0,1]$ using first-order interval jets in $t$. A jet $(a,a_t)$ obeys the exact addition, product and reciprocal rules; its derivative component is always an interval enclosure, not a floating finite difference. In (1)–(3), seed $t_t=1$ and $y_t=0$ and use the entire functions and their derivatives at both $t$ and $z=4ty$. This retains every parameter derivative of the circle coefficients and the source phase.

For $r\ge1$,

$$
E_r(z)=\frac1{(r-1)!}\int_0^1(1-v)^{r-1}\cos(v\sqrt z)\,dv.
$$

The beta integral of each cosine-series term proves this representation. If $C(z)=\cos\sqrt z$, then $C'(z)=-\operatorname{sinc}(\sqrt z)/2$ and

$$
C''(z)=\frac14\int_0^1v^2\operatorname{sinc}(v\sqrt z)\,dv.
$$

For $z\ge0$, these give $|C'|\le1/2$, $|C''|\le1/12$. Differentiating under the displayed integral and evaluating its polynomial moments gives, including $r=0$,

$$
|E_r'|\le\frac1{(r+2)!},\qquad
|E_r''|\le\frac2{(r+4)!}.
\tag{5}
$$

At a rational interval midpoint, sum the exact rational series through degree 40, and its derivative through that degree. The first omitted alternating term bounds each remainder, since both value and differentiated term magnitudes decrease throughout the remaining tail on $z\le9/4$. The differentiated magnitude ratio for terms $n$ and $n+1$ is $z(n+1)/[n(2n+r+2)(2n+r+1)]$, strictly below one for $n\ge41$. Enlarge to the complete interval by its radius times the two bounds in (5). Every operation thereafter uses unchanged outward rational interval arithmetic, including signed products and reciprocals with checked positive denominators.

The frozen protocol specifies all exact roots, adaptive bisections, known-before-target controls, retained pending boxes, guards and coverage audit. A strict positive lower enclosure on every leaf proves $J_t>0$ everywhere. If any leaf remains unresolved, the result is only a partial sufficient-condition certificate; a wide enclosure cannot refute monotonicity. Independent evaluation and proof review remain required for acceptance.

## 3. Consequences if the complete positive cover is obtained

Since $x_\beta=c/D>0$, implicit differentiation at the unique root $y_*(x)=m_*^2$ gives

$$
\frac{dy_*}{dx}=-\frac{G_x}{G_y}
=-\frac{2xy_*J_t}{G_y}<0,
\qquad
m_*'(\beta)=-\frac{x\,m_*\,J_t}{G_y}\frac cD<0.
\tag{6}
$$

The second formula follows by dividing the first by $2m_*$. It is nonzero at every fixed physical speed if the proposed complete positivity certificate succeeds. No numerical derivative of a fitted root curve is used.

For an exact endpoint description, let $x_*$ be the unique positive solution of $x_*=\cos x_*$. The same analytic determinant extends through this angle, which is strictly inside $[0,3/4]$. The previously assessed derivative certificate gives $G_y>0$ there; the finite first-frequency certificate gives $G(1,x_*)>0$, while $G(0,x_*)=-1$. Thus there is a unique $y_{\rm end}\in(0,1)$ with $G(y_{\rm end},x_*)=0$, and $m_{\rm end}=\sqrt{y_{\rm end}}$. Analytic implicit continuation makes this the limit as $\beta\uparrow1$. It is an exact implicit constant; no decimal estimate is required for the following claim.

Combining (6), $m_*(\beta)\to1$ as $\beta\downarrow0$, and the upper-end limit gives a bijection

$$
m_*:(0,1)\longrightarrow(m_{\rm end},1).
\tag{7}
$$

Therefore a rational $j/k\in(0,1)$ is accessible at a unique physical speed exactly when $m_{\rm end}<j/k<1$. Equality with the lower endpoint is not attained at a strictly subfield speed. Every accessible rational resonance is transverse. Fractions in lowest terms give the nominated fundamental-period denominator; unreduced fractions repeat the same resonance. These consequences are conditional on the complete positive cover and do not infer stability or nonlinear behavior from a frequency alone.

## 4. Independence and falsifiers

This derivation was completed without reading the independently assigned Moore monotonicity reference or any new coordinator monotonicity argument. The prior complete determinant and its separate Cartesian controls remain unchanged antecedents. Known axis values and direct full-Cartesian determinant comparisons test the new algebra before target use. The independently proved derivative certificate for $G_y$ is a premise for (6), not a second check of $J_t$.

Falsifiers are an incorrect coefficient identity in (1), a missing divided term in (2), failure of the factorization (3), an incorrect axis value, an inward derivative enclosure, a failed entire remainder or derivative bound, an uncovered target box, a nonpositive true $J_t$ on a certified leaf, or an incorrect implicit-derivative sign. If the sufficient condition fails, monotonicity may still hold only along the actual root curve. Until the target and independent review succeed, all-speed monotonicity and (7) remain conditional consequences, not admitted findings.
