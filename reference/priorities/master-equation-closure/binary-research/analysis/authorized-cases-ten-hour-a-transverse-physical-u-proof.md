# Exact physical-velocity comparison for the transverse coordinate

**Status: ◐ Derived subject candidate; numerical application awaits independent admission.** This supplies a more restrictive comparison path for the [transverse coordinate](authorized-cases-ten-hour-a-transverse-error-candidate.md). Every auxiliary receiving velocity lies in the original physical-velocity trial. The inverse between error coordinates is obtained algebraically at one fixed nominal geometry, so no additional arbitrary transformed-p interpolation is required.

## Ordered comparison at one reception

Fix a reception $t$ and align the actual receiving radial ray with the comparison ray by the same constant rotation used by the admitted intrinsic proof. Let $x_a=x_c+\rho e_r$, where $\rho$ is the signed radius difference and $e_r$ is the comparison receiving radial unit vector. Let $u_a,u_c$ be the two physical velocities in this common frame. Let $\mathscr H_a$ be the entire rotated actual source history and $\mathscr H_c$ the entire prescribed source history. The rotation is constant when source derivatives are taken. Both $q$ and $H$ below use the exact transverse definition; $p=u+q$ is its mathematical transformed velocity.

For either field $F=q$ or $F=H$, use precisely the following telescoping identity:

$$
\begin{aligned}
F(x_a,u_a;\mathscr H_a)-F(x_c,u_c;\mathscr H_c)
={}&[F(x_a,u_a;\mathscr H_a)-F(x_a,u_a;\mathscr H_c)]\\
&+[F(x_a,u_a;\mathscr H_c)-F(x_c,u_a;\mathscr H_c)]\\
&+[F(x_c,u_a;\mathscr H_c)-F(x_c,u_c;\mathscr H_c)].
\end{aligned}
$$

The first bracket freezes the actual receiving position and actual physical velocity while replacing the source. Its source-position offset is frozen at the actual emission; the existing translated-source clock construction bounds its complete source comparison. The second bracket varies only receiving position along $x_c+\lambda\rho e_r$, keeps receiving velocity $u_a$ fixed and uses the prescribed source throughout. The third bracket holds receiving position and prescribed source fixed at $x_c,\mathscr H_c$, varying receiving velocity along $u_c+\lambda(u_a-u_c)$. This order is essential: the last bracket has one nominal ray and one nominal root independent of $\lambda$.

Every source and position family keeps the receiving velocity inside the already prescribed physical trial, and every velocity-segment member belongs to its convex hull. If that trial has the complete bound $|u|\le b_u<1$, then each true unit ray satisfies $w=1-n\cdot u\ge1-b_u>0$. This proves an actual chart margin; an interval evaluator must still enclose it without falsely treating independent component overestimation as physical loss. The ordinary-root $R,D$ and the complete nominal clock family remain separately required. Source replacement velocities change the field denominator while the nominal root derivative still uses the prescribed source velocity.

## Nilpotent average at the fixed nominal ray

Write the complete decompositions as

$$
\delta q=B_q\rho+A\delta u+f_q,\qquad
\delta H=B_H\rho+U\delta u+f_H.
$$

The columns $B_q,B_H$ are the averages of radial position derivatives from the second bracket. The matrices $A,U$ are the receiving-velocity derivative averages from the third bracket. The vectors $f_q,f_H$ are the complete source errors from the first bracket, with the transformed residual included in $f_H$. Their averages can differ and must be independently enclosed. Their source/root and physical-velocity domains may not be shortened by a nominal-point evaluation.

At the fixed nominal geometry in the third bracket, let $n_0$ be its relative ray, $t_0$ its counterclockwise tangent, $R_0,D_0$ its range and source denominator, and $v_{0,t}=t_0\cdot v_0$. The exact receiving derivative is

$$
q_u=\frac{v_{0,t}}{R_0D_0[1-n_0\cdot u]^2}\,t_0n_0^{\mathsf T}.
$$

Only its scalar coefficient varies along the velocity segment. Hence

$$
A=\alpha t_0n_0^{\mathsf T},\qquad
\alpha=\int_0^1\frac{v_{0,t}}{R_0D_0[1-n_0\cdot(u_c+\lambda\delta u)]^2}\,d\lambda,
\qquad A^2=0.
$$

The square vanishes because $n_0\cdot t_0=0$. Averaging independently rotated matrices would not establish this identity. Across receiving times the nominal ray may vary, but the pointwise identity holds at each time before any interval enclosure. An interval matrix representing $A$ need not itself square to the zero interval; the proof concerns the actual averaged matrix contained in it.

Since $z=\delta p=\delta u+\delta q$, define $E=I-A$. Exact inversion gives

$$
\delta u=E z-E B_q\rho-E f_q.
$$

No smallness condition on $\alpha$ is needed for invertibility. In an orthonormal ray frame, $E=\begin{pmatrix}1&0\\-\alpha&1\end{pmatrix}$, whose largest singular value is $\sqrt{1+\alpha^2/4}+|\alpha|/2$. This follows by computing the two eigenvalues of $E^{\mathsf T}E$, whose determinant is one and trace is $2+\alpha^2$. The bound is useful for source forcing, but full signed matrices are retained for the current block.

## Substituted intrinsic error equation

Set $L_p=E$, $L_x=-E B_q$ and $g_U=-E f_q$. Substituting the exact inverse error relation into the H decomposition gives

$$
\delta H=C\rho+V z+g_H,\qquad
C=B_H-U E B_q,\quad V=UE,\quad g_H=f_H-U E f_q.
$$

Let $u_{c,t}$ be comparison intrinsic tangential physical velocity, $r_a,r_c>0$ actual/comparison radii, and $J=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$. The exact angular-rate difference is $\delta\omega=e_t^{\mathsf T}(L_x\rho+L_pz+g_U)/r_a-u_{c,t}\rho/(r_ar_c)$. Therefore

$$
\begin{pmatrix}\rho\\z\end{pmatrix}'=
\begin{pmatrix}
e_r^{\mathsf T}L_x&e_r^{\mathsf T}L_p\\
C+(Jp_c)(e_t^{\mathsf T}L_x/r_a-u_{c,t}/(r_ar_c))&V+(Jp_c)e_t^{\mathsf T}L_p/r_a+\omega_aJ
\end{pmatrix}
\begin{pmatrix}\rho\\z\end{pmatrix}
+\begin{pmatrix}g_{U,r}\\g_H+(Jp_c)g_{U,t}/r_a\end{pmatrix}.
$$

This displays H coefficients after the physical-u substitution, including both occurrences of $UE$ and the source term $-UEf_q$. Omitting either would change the error equation. Similarity by $\operatorname{diag}(\nu,1,1)$, $\nu>0$, makes the current intrinsic rotation skew in the last two coordinates, so it drops from the symmetric norm-growth matrix. The rank-one angular terms and nominal $p_c$ remain. A whole-family logarithmic-norm enclosure and a complete forcing enclosure then give the same scalar variation-of-constants bound as the admitted signed-current framework, with newly proved inputs.

For example, a conservative forcing norm follows from $|g_U|\le\|E\|f_q$ and $|g_H|\le f_H+\|U\|\|E\|f_q$. After metric scaling it is bounded by

$$
\left[(\nu\|E\|f_q)^2+\left(f_H+[\|U\|+|p_c|/r_a]\|E\|f_q\right)^2\right]^{1/2}.
$$

These quantities use complete source position/velocity error inventories and the full angular window. No delayed physical acceleration uncertainty is deleted from the scientific record; it remains in original E acceleration reconstruction and future regularity.

## Endpoint transfer and current decision boundary

The original signed endpoint measures the unscaled coordinate, so it is not automatically an endpoint for this transformed system. The correction difference, in the relative-ray frame with positive-source velocity, is

$$
q_{\rm transverse}-q_{\rm old}=\left(-\frac1R,\frac{v_t u_n}{RD(1-u_n)}\right).
$$

A complete mean-value bound for this difference between actual and comparison tuples, added to the admitted old p error, is a sufficient transfer. A sharper transfer can retain the joint old norm while substituting its admitted relation between $\delta u$ and old transformed error. Either route must be independently proved and evaluated; neither may infer a zero correction error. The old physical radius, velocity, acceleration, source and phase inventories stay fixed. The original E residual becomes $(I+q_{u,c})d$ and must carry that multiplier.

The immediate test is a single fixed receiving physical-radius/velocity trial with a separately stated new transformed-norm trial, initialized by an admitted same-history transfer. It must show a stronger physical error bound after full root/source/derivative certification; a transformed norm in different coordinates is not directly comparable with the old norm. Presently the coefficient families, residual multiplier and coordinate-transfer inequalities are uncomputed. The derived ordering removes the extra arbitrary p-box chart obligation, but it does not close these numerical conditions.

Falsifiers include varying the nominal ray inside the q-u average, using independently rotated averages to claim nilpotence, omitting physical-u or source chart margins, replacing actual source velocity along an unproved clock, dropping the $UEf_q$ source term, omitting the residual multiplier or changing the complete physical preparation. A failed transfer or receiving trial is a method obstruction, not a physical stopping event.
