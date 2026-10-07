# Transverse source comparison with an explicit prescribed clock

**Status: derived subject supplement; target use awaits independent admission.** This completes the source bracket of the [physical-u ordering](authorized-cases-ten-hour-a-transverse-physical-u-proof.md). The original Section 7 E equation, complete compatible history and delayed physical acceleration remain fixed.

## Complete translated source family

At a fixed reception and actual emission $s_*$, work in the one receiving-aligned Cartesian frame. Freeze the actual receiver $x_a,u_a$, and define $d_x=X_a(s_*)-X_c(s_*)$ and $d_v=V_a(s_*)-V_c(s_*)$. Here the histories already carry the one constant rotation from the ordering proof. On a complete ordinary root family define

$$
t-s_\lambda=|x_a+X_c(s_\lambda)+\lambda d_x|,
\qquad v_\lambda=V_c(s_\lambda)+\lambda d_v,
\quad 0\le\lambda\le1.
$$

The positive-member source sign convention gives the physical negative-member source as its negative. At $\lambda=1$ the root is exactly $s_*$ by uniqueness; at zero it is the nominal-source root for the actual receiver. The virtual translated position clock uses $V_c(s_\lambda)$, whereas the acceleration-field formula uses $v_\lambda$. These need not be equal. There is no requirement that the virtual field velocity be the derivative of the translated virtual position, because this family is an algebraic field comparison, not an auxiliary dynamical history.

Write $n,t_n$ for the relative ray and counterclockwise tangent, $R=t-s_\lambda$, $v_{c,n}=n\cdot V_c$, $v_{c,t}=t_n\cdot V_c$, and $D_c=1+v_{c,n}$. Exact differentiation gives

$$
\dot s_\lambda=-\frac{n\cdot d_x}{D_c},\quad
\dot R=-\dot s_\lambda,\quad
\dot\theta=\frac{t_n\cdot d_x+v_{c,t}\dot s_\lambda}{R},\quad
\dot v_\lambda=A_c(s_\lambda)\dot s_\lambda+d_v.
$$

The physical-u field chart separately requires $D_f=1+n\cdot v_\lambda>0$ and $w=1-n\cdot u_a>0$. The nominal root clock requires $D_c>0$. A bound for one denominator may not silently replace the other. The root family, both field-velocity faces and the physical-u trial must all be enclosed on the entire source support. Only prescribed source acceleration $A_c$ enters this differentiation; no actual jerk or actual-source acceleration difference is differentiated away.

Let $F$ denote q or H in relative-ray components. Let $F_R,F_v,F_u$ be its ray-coordinate derivatives. A rotation of the ray at fixed Cartesian field v and receiving u has physical vector derivative

$$
F_\theta=F_{v_n}v_t-F_{v_t}v_n+F_{u_n}u_t-F_{u_t}u_n+J_+F,
\qquad J_+=\begin{pmatrix}0&-1\\1&0\end{pmatrix}.
$$

The source-position derivative in this ray frame has columns

$$
K_F(:,n)=\frac{F_R-F_v A_c-v_{c,t}F_\theta/R}{D_c},
\qquad K_F(:,t_n)=F_\theta/R.
$$

Therefore the exact source bracket is

$$
f_F^{\rm source}=\int_0^1[K_F(\lambda)d_x+F_v(\lambda)d_v],d\lambda.
$$

Complete upper bounds $L_{Fx},L_{Fv}$ yield $|f_F^{\rm source}|\le L_{Fx}|d_x|+L_{Fv}|d_v|$. The old source errors bound $d_x,d_v$ at the actual emission, while every derivative and nominal clock is enclosed on the full auxiliary family. This separation must be preserved when source support is refined. The comparison's original E residual adds its signed multiplier term to the H bracket; norm forcing must include $\|(I+q_{u,c})d\|$. Physical acceleration reconstruction still retains the entire source-A inventory.

The nominal position bracket is the special case $v_\lambda=V_c(s)$ and $D_f=D_c$ with receiving $u_a$ fixed. It is only this case that the earlier physical-u coefficient v1 handles. The explicit-clock v2 helper covers both cases; its caller must still supply independently admitted family enclosures.

## Exact finite velocity coefficient

At the fixed nominal root/ray of the final velocity bracket, write $w_a=1-n_0\cdot u_a$ and $w_c=1-n_0\cdot u_c$. Since

$$
\frac1{w_a}-\frac1{w_c}=\frac{n_0\cdot(u_a-u_c)}{w_aw_c},
$$

the average coefficient in the prior proof has the exact finite form

$$
A=\alpha t_0n_0^{\mathsf T},\qquad
\alpha=\frac{v_{0,t}}{R_0D_0w_aw_c}.
$$

This identity also covers $n_0\cdot(u_a-u_c)=0$, with no division by that difference. It retains a single nominal ray, so $A^2=0$ and $E=I-A$ remain exact. It can give a narrower coefficient than evaluating a squared denominator over an independently widened segment. The H derivative average U still needs the complete physical-u segment; no analogous endpoint substitution has been assumed for it.

## Instruments and falsifiers

The subject `authorized-cases-ten-hour-a-transverse-physical-u-coefficients-v2.mjs` evaluates rational interval automatic derivatives in $(R,v_n,v_t,u_n,u_t)$ and accepts prescribed `clockV` explicitly. Its SHA-256 is `a986e75dc8eb5c699f85db905ca0f95b84e8d06d781d965d8f7643cf1b5d5b6d`. Known-only receipt `.local-data/master-equation-closure/binary-research/authorized-cases-ten-hour/a/transverse-physical-u-known-v2.json`, SHA-256 `443d85bbf7865a033c14f27c2cdf29cf268abd31927c6a45cfae5ef02f056fca`, records exact stationary-source, rational moving-source, correction-difference, fixed-ray nilpotence, quarter-turn and denominator rejection controls. Its additional different-clock control uses $R=2$, field $v=(1/5,3/10)$, receiving $u=(1/4,7/30)$ and stationary clock/zero prescribed acceleration; then q's radial position column is exactly $(0,-1/12)$. No target has used either physical-u coefficient version.

A missing source interval, use of field D in place of clock D, varying the nominal ray within the finite velocity coefficient, omitted physical-u or field-velocity chart, omitted residual multiplier or source-A reconstruction invalidates the corresponding application. These known controls are local algebraic checks; they do not certify a receiving trial or the complete translated-root family.
