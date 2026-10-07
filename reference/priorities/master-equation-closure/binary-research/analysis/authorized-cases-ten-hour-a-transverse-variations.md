# Exact first variations for the transverse Maxwell E representation

**Status: ◐ Derived subject candidate; independent proof and numerical coefficient admission pending.** This note supplies explicit first-variation formulas for the [transverse error representation](authorized-cases-ten-hour-a-transverse-error-candidate.md). It keeps the exact Package A history and equation. A first variation is the derivative with respect to an auxiliary comparison parameter, not an additional physical perturbation or a proposed response term.

## Complete chart and root variations

Let $x,p$ be receiving position and transverse transformed velocity, $y(s)$ the prescribed positive-member comparison source, and $s$ the complete mirror root of $t-s=|x+y(s)|$. Write $v=y'(s)$, $a_c=y''(s)$, $R=t-s$, $n=(x+y(s))/R$, $D=1+n\cdot v$, $w=1-n\cdot p$, and $P=I-nn^{\mathsf T}$. All formulas require complete source support and strict whole-family lower bounds for $R,D,w$. For a receiving-position variation $\xi$ at fixed time and fixed source history,

$$
\dot s=-\frac{n\cdot\xi}{D},\qquad
\dot R=-\dot s,\qquad
\dot n=\frac{P(\xi+v\dot s)}R,\qquad
\dot v=a_c\dot s.
$$

Dots here denote the comparison-parameter variation. For a receiving-p variation $\zeta$ at fixed receiving position, all four displayed root/geometry variations vanish and $\dot p=\zeta$. A spatial translation of the complete prescribed source contributes its translation vector in place of $\xi$ in the root/geometry formulas. When physical source velocity is replaced at the fixed actual root, use $\dot s=\dot R=\dot n=0$ and the independent replacement direction $\dot v$; this is a fixed-root field variation, not a variation of the source curve defining the nominal clock. The distinction keeps the nominal clock denominator separate from the velocity-expanded field denominator.

Only the prescribed source acceleration $a_c$ enters the spatial root variation. There is no $\dot a_c$ because the transformed fields do not contain $a_c$. Thus these first derivatives require no source jerk. The actual source acceleration remains in physical reconstruction and regularity, as stated in the parent note.

## Algebraic field variations

For any consistent input variation $(\dot R,\dot n,\dot v,\dot p)$, define

$$
\dot D=\dot n\cdot v+n\cdot\dot v,\quad
\dot w=-\dot n\cdot p-n\cdot\dot p,\quad
\dot P=-\dot n n^{\mathsf T}-n\dot n^{\mathsf T}.
$$

Let $q=Pv/(RDw)$ and $u=p-q$. Their exact variations are

$$
\dot q=\frac{\dot P v+P\dot v}{RDw}-q\left(\frac{\dot R}R+\frac{\dot D}D+\frac{\dot w}w\right),\qquad \dot u=\dot p-\dot q.
$$

These formulas directly define the inverse-map Jacobian columns $L_x,L_p$ and the fixed-root source-velocity columns used by the intrinsic error system. Enclosing them over the complete current and replacement families, then integrating the mean-value parameter from zero to one, produces valid averaged coefficients. A nominal-point evaluation does not.

To differentiate the transformed right-hand side without hiding a second history derivative, introduce $\gamma=w/D$, $\eta=P(u+\gamma v)/R$, $\alpha=1-|v|^2$, $C=\alpha(n+v)/(R^2D^3)$ and $h=\alpha/(R^2D^2)$. The physical meaning of $\gamma$ is the clock rate $s'$, and $\eta$ is the ray-direction rate $n'$. Their variations are

$$
\dot\gamma=\frac{\dot w}D-\frac{w\dot D}{D^2},
$$

$$
\dot\eta=\frac{\dot P(u+\gamma v)+P(\dot u+\dot\gamma v+\gamma\dot v)}R-\eta\frac{\dot R}R,
$$

$$
\dot\alpha=-2v\cdot\dot v,\qquad
\dot C=\frac{\dot\alpha(n+v)+\alpha(\dot n+\dot v)}{R^2D^3}-C\left(2\frac{\dot R}R+3\frac{\dot D}D\right),
$$

$$
\dot h=\frac{\dot\alpha}{R^2D^2}-h\left(2\frac{\dot R}R+2\frac{\dot D}D\right).
$$

Define a vector $A=-(n\cdot v)\eta-n(v\cdot\eta)$ and scalar

$$
\ell=-\frac hw-\frac{v\cdot\eta}D+\frac{u\cdot\eta}w-\frac{1-\gamma}R.
$$

The parent equation is exactly $\mathcal H=-C+A/(RDw)+q\ell$. Its variations are

$$
\dot A=-(\dot n\cdot v+n\cdot\dot v)\eta-(n\cdot v)\dot\eta-\dot n(v\cdot\eta)-n(\dot v\cdot\eta+v\cdot\dot\eta),
$$

$$
\begin{aligned}
\dot\ell={}&-\frac{\dot h}w+\frac{h\dot w}{w^2}
-\frac{\dot v\cdot\eta+v\cdot\dot\eta}D+\frac{(v\cdot\eta)\dot D}{D^2}\\
&+\frac{\dot u\cdot\eta+u\cdot\dot\eta}w-\frac{(u\cdot\eta)\dot w}{w^2}
+\frac{\dot\gamma}R+\frac{(1-\gamma)\dot R}{R^2},
\end{aligned}
$$

$$
\dot{\mathcal H}=-\dot C+\frac{\dot A-A(\dot R/R+\dot D/D+\dot w/w)}{RDw}+\dot q\ell+q\dot\ell.
$$

Every term follows from the product and quotient rules applied to the displayed fields. The formulas expose every inverse denominator and every source input, so an interval implementation can be checked term by term against an independent differentiation rather than against shared code.

## Complete error inequalities to establish before target use

Let complete physical source error inventories be $s_r,s_v,s_a$ in intrinsic radius, velocity and acceleration; let $R_s,V_s,A_s$ bound the prescribed source position, velocity and acceleration; and let $\Psi$ enclose the entire source-to-receiver angular difference. A fixed-reception rotation gives source-position and source-velocity offsets bounded by $s_r+R_s\Psi$ and $s_v+V_s\Psi$. Source acceleration $s_a+A_s\Psi$ remains in original E reconstruction, but it need not enter $\mathcal U,\mathcal H$ themselves.

With whole-family spatial and fixed-root velocity derivative norms $C_U,V_U,C_H,V_H$, the sequential source comparison gives

$$
|f_U|\le C_U(s_r+R_s\Psi)+V_U(s_v+V_s\Psi),
$$

$$
|f_H|\le C_H(s_r+R_s\Psi)+V_H(s_v+V_s\Psi)+(1+|q_c|/w_c)|d|.
$$

These are conditional inequalities: their constants must enclose every frozen-offset/translated-root family and their source windows must be complete. They do not replace the more precise signed component enclosures used by a successful future instrument. The source clock's transversality uses the actual derivative of the prescribed curve; a velocity-offset replacement in the field cannot silently replace that derivative.

The initial joint norm requires a proved coordinate transfer. At a fixed actual tuple, the difference from the old unscaled correction is $q_{\rm transverse}-q_{\rm old}=Pv/(RDw)-(n+v)/(RD)$. A mean-value enclosure for this difference over the complete actual/comparison receiver/source families, added to the admitted old signed p error, can supply a new p bound. A simpler independently admitted physical-velocity bound plus the complete transverse-q error is also valid. Both routes must keep the old radius error and every earlier physical X/V/A and phase bound. Neither provides a free zero initialization.

Given these constants and a positive $w$ family, the intrinsic error matrix in the parent note yields a whole-cell logarithmic-norm bound and source forcing. The physical-U reconstruction must strictly fit its trial, and the original E reconstruction must supply finite source-A for all later generations. The first unsupported numerical condition is presently the complete $w$ and derivative family on a chosen transferred endpoint; no such endpoint/family has been computed. A proof that the fields are smooth on an unspecified compact chart does not quantify that condition.

## Analytical controls and falsifiers

For $v=0$, $q=0$ and $\mathcal H=-n/R^2$. At fixed source position the receiving-p derivative of $\mathcal H$ is zero even though intermediate terms involving $u,\gamma,\eta$ can be nonzero; their cancellation is a stringent known-case control. For a radial position variation $\xi=n$, the derivative is $2n/R^3$; for a tangential position variation $\xi\perp n$, it is $-\xi/R^3$. A constant-velocity source with exact rational unit ray supplies nonzero $q$ and independent clock/field denominator controls. Differentiating an arbitrary comparison residual tests the necessary $(I+q_u)$ multiplier. A discrepancy in any known control, an omitted source interval, an interval denominator reaching zero or a changed physical history invalidates the corresponding application. No computational target or new physical claim follows from these prospective formulas.
