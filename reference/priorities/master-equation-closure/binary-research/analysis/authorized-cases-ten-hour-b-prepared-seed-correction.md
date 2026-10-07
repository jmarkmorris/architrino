# The first explicit correction to the prepared radial invariant

**Status: derived subject addendum, unreviewed.** Retain exactly $\epsilon=2^{-200000}$, $K=c_f=1$, $R_0=2^{399998}$ and the original complete history. The amplitude and cycle correction in this calculation are precisely those of the [quantified compact-mode subject](authorized-cases-ten-hour-b-quantified-compact-mode.md); no improved norm or favourable phase is selected. This computes actual preparation data for that norm, not a final escape margin.

## 1. Two finite coefficients at the central circular state

The prescribed central circle is used only as an analytical coefficient control. Hold its source path fixed while differentiating the receiver position, then substitute receiver $x=e_1$ and source mirror path. For the positive summed vector the source-time parameter gives

$$
q(u)=(1+\cos u,-\sin u),\qquad
\ell(u)=2\cos(u/2).
$$

The general present-source coefficient is $C_n=(4/n!)\nabla_x\partial_u^n\ell^{n-1}|_{u=0}$. Therefore the radial fourth coefficient follows from

$$
\partial_{x_1}\ell^3=12\cos^3(u/2),\qquad
\partial_u^4\partial_{x_1}\ell^3\big|_0=63/4,
\qquad (C_4)_r=21/8.
\tag{1}
$$

The tangential fifth coefficient follows from

$$
\partial_{x_2}\ell^4=-8\sin u-4\sin(2u),\qquad
\partial_u^5\partial_{x_2}\ell^4\big|_0=-136,
\qquad (C_5)_\theta=-68/15.
\tag{2}
$$

The factor $4/n!$ has not been included twice: (1) and (2) first differentiate the scalar power, then apply that factor. The corresponding third-order control gives the known positive coefficient $4/3$.

Autonomous substitution adds terms to these prescribed coefficients. In the quadratic coefficient, the present acceleration has matrix coefficient $(I-ee^{\mathsf T})/r$. The cubic coefficient is exactly $-(4/3)y'''$. At the central circular state $r=1$, $p=0$, $v=e_2$,

$$
F_2=-\tfrac12e_1,\qquad F_3=\tfrac43e_2,
\qquad \mathcal D_{F_0}F_2=-\tfrac12e_2.
$$

The quadratic projection of $F_2$ vanishes, so $(F_4)_r=21/8$. At fifth order the quadratic acceleration replacement contributes $4/3$ and the cubic jerk replacement contributes $2/3$. Hence

$$
(F_4)_r=\frac{21}{8},\qquad
(F_5)_\theta=-\frac{68}{15}+\frac43+\frac23=-\frac{38}{15}.
\tag{3}
$$

This calculation uses the receiver gradient before any autonomous substitution. Differentiating a reduced circular scalar in place of that gradient would not compute the selected row.

## 2. The quartic radial center and quintic velocity center

Write $x=\delta^2$. The quadratic fast radial balance has

$$
P(\rho,\delta)=\rho^{-2}
-e^{2x/\rho}(\rho^{-3}-x/(2\rho^4)).
$$

Its static center through $x^2$ is $1+(3/2)x-(5/4)x^2$. The outward term $(21/8)\delta^4$ in (3), together with $G_{0,\rho}(1,0)=-1$, changes the quartic center coefficient by $21/8$. Motion of the center first contributes to this radial equation at degree six, so

$$
\rho_4=-\frac54+\frac{21}{8}=\frac{11}{8}.
\tag{4}
$$

The corrected angular rate has cubic term $g\delta^3/\rho^3$, $g=4/3$. Evaluating at $\rho_s=1+(3/2)\delta^2+\cdots$ contributes $-6\delta^5$. The fifth-order tangent in (3) contributes $-(38/15)\delta^5$. Thus the center rate is

$$
b_s=\frac43\delta^3-\frac{128}{15}\delta^5+O(\delta^7).
$$

The exact center invariance equation for its radial coordinate gives $u_s=b_s(2\rho_s-\delta\rho_s')$. The quadratic term in the parenthesis cancels. Therefore

$$
\rho_s=1+\frac32\delta^2+\frac{11}{8}\delta^4+O(\delta^6),
\qquad
u_s=\frac83\delta^3-\frac{256}{15}\delta^5.
\tag{5}
$$

The displayed velocity center is the entire odd part of the degree-six center already used by the compact norm. No seventh-order center is assumed.

## 3. Exact release data and the signed seed correction

At release

$$
\rho_0=(1-\epsilon^2/2)e^{2\epsilon^2},\qquad
\delta_0^2=\epsilon^2\rho_0,\qquad u_0=0.
$$

Substitute these exact quantities in (5). With $z=\rho-\rho_s$ and $q=u-u_s$, the first terms are

$$
z_0=-\frac{21}{8}\epsilon^4+O(\epsilon^6),
\qquad
q_0=-\frac83\epsilon^3+\frac{166}{15}\epsilon^5+O(\epsilon^7).
\tag{6}
$$

The norm is $\widehat J=q^2/2+v-(4/3)\delta^3\chi$. Since $v=z^2/2+O(\delta^2z^2+z^3)$ and $\chi=-(5/2)qz+O((|q|+|z|)^3+\delta^2(q^2+z^2))$, its cycle-correction term begins at order $\epsilon^{10}$ here. It therefore does not change the next coefficient:

$$
\widehat J_0=\frac{32}{9}\epsilon^6
+\left(-\frac{1328}{45}+\frac{441}{128}\right)\epsilon^8+O(\epsilon^{10})
=\frac{32}{9}\epsilon^6-\frac{150139}{5760}\epsilon^8+O(\epsilon^{10}).
\tag{7}
$$

Taking the positive square root and using $H_0^{-3/2}=1+(9/8)\epsilon^2+O(\epsilon^4)$ gives the prepared invariant

$$
\boxed{
\frac{A_0}{H_0^{3/2}}
=\frac{4\sqrt2}{3}\epsilon^3
\left[1-\frac{104059}{40960}\epsilon^2+O(\epsilon^4)\right].
}
\tag{8}
$$

Thus the first explicit correction is negative for this fixed preparation and this fixed norm. It is not inferred from a fitted trajectory or from an adjustable phase.

The center coefficient budget $2^{90000}$, the compact potential derivatives and the cycle bound in the compact subject permit the conservative explicit replacement of the remainder in brackets by $|\eta_4|\le2^{185000}\epsilon^4$. Products of two center-coefficient bounds are below $2^{180000}$; the remaining finite rational factors and the positive square-root denominator fit inside the extra exponent allowance. The initial layer up to $s=200\epsilon$ changes this normalized seed by at most another $2^{180000}\epsilon^4$ relatively: the cubic norm rate integrates for only $O(\epsilon)$ time, and the sixth-order initial additive defect integrates to order $\epsilon^7$ against a cubic amplitude. Enlarging the same bound by a factor two if needed gives

$$
\left|\frac{A(200\epsilon)}{(4\sqrt2/3)\epsilon^3H(200\epsilon)^{3/2}}
-1+\frac{104059}{40960}\epsilon^2\right|
\le2^{185001}\epsilon^4.
\tag{9}
$$

At the selected dyadic parameter that remainder is much smaller than the displayed quadratic correction. Equations (8)–(9) concern preparation-specific mode data. A complete final-passage calculation would need further deterministic coefficients, the correlated phase and the actual near-critical section; this single correction does not select terminal speed.

## Review and computation boundary

The sensitive checks are the sign of the cubic present-jerk coefficient, the two autonomous contributions to $F_5$, the moving-center invariance factor $2\rho_s-\delta\rho_s'$, and the normalization by $H_0^{3/2}$. A wrong coefficient in any of them would overturn (8). The explicit remainder and short-layer budget also require independent review. No numerical instrument, target trajectory, changed history, external physical premise, Python execution, long process or Git mutation was used.
