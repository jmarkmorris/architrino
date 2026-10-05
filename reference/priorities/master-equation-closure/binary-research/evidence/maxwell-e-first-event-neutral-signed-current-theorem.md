# Signed intrinsic current block after the exact E transformation

Derived prospective sharpening of the [exact transformation](maxwell-e-first-event-neutral-velocity-transform-theorem.md) and [complete-history error theorem](maxwell-e-first-event-neutral-velocity-error-theorem.md). It keeps the same physical preparation, E equation, full roots and delayed physical source acceleration. No target result or new physical prefix is asserted. Coefficient families, source histories, positive radius/clock and conditional stopping/continuation obligations are unchanged.

Use receiving radial/tangential coordinates with counterclockwise tangential unit vector. Define the clockwise skew matrix $J=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$. Intrinsic p components obey $p_{\mathrm{intr}}'=H_{\mathrm{intr}}+\omega Jp_{\mathrm{intr}}$. Write the signed radius difference $\rho=r_a-r_c$, signed intrinsic p difference $z=p_a-p_c$, and the signed intrinsic physical velocity difference $\delta u=u_a-u_c$. At each receiving time rotate the actual tuple by the constant rotation aligning its radial ray with the comparison radial ray, exactly as in the complete-history theorem.

The sequential fixed-source-offset/nominal-clock comparison supplies independently enclosed current radial columns $Q=q_X n_c$ and $C=H_X n_c$ in this receiving frame, and a receiving-velocity matrix $U=H_u$. All of these are whole mean-value families; their particular averaged values may differ, so the final interval family must contain all independent combinations. The source-only vector errors satisfy $|f_q^{\mathrm{vec}}|\leq f_q$ and $|f_H^{\mathrm{vec}}|\leq f_H$, with f_q/f_H defined by the complete-history theorem and full physical source X/V/A plus finite source-angle inventories. The unchanged original E residual is included in f_H. Thus

$$
\delta q=Q\rho+f_q^{\mathrm{vec}},\qquad
\delta u=z-Q\rho-f_q^{\mathrm{vec}},\qquad
\delta H=C\rho+U\delta u+f_H^{\mathrm{vec}}.
$$

The exact radial equation gives $\rho'=\delta u_r$. The exact angular-rate difference is

$$
\omega_a-\omega_c=\frac{z_t-Q_t\rho-f_{q,t}^{\mathrm{vec}}}{r_a}-\frac{u_{c,t}\rho}{r_ar_c}.
$$

Subtracting the two intrinsic p equations, the term $\omega_aJz$ remains skew. Hence the signed three-component system has current matrix

$$
\begin{pmatrix}\rho\\z\end{pmatrix}'=
\begin{pmatrix}
-Q_r&e_r^{\mathsf T}\\
C-UQ-Jp_c\left(Q_t/r_a+u_{c,t}/(r_ar_c)\right)&U+(Jp_c)e_t^{\mathsf T}/r_a+\omega_aJ
\end{pmatrix}
\begin{pmatrix}\rho\\z\end{pmatrix}
+\begin{pmatrix}-f_{q,r}^{\mathrm{vec}}\\f_H^{\mathrm{vec}}-Uf_q^{\mathrm{vec}}-(Jp_c)f_{q,t}^{\mathrm{vec}}/r_a\end{pmatrix}.
$$

This is an exact decomposition with particular mean-value coefficients inside the retained families. It assumes no source jerk of the actual solution. Every nominal-clock J is comparison source J only. In particular the lower-right rank-one term has a plus sign for the stated clockwise J; omitting the Q_t angular term or reversing that rank-one sign does not reproduce the exact angular-rate identity.

Freeze a positive receiving-cell metric $\nu$ and set $y=(\nu\rho,z_r,z_t)$. Similarity by $\operatorname{diag}(\nu,1,1)$ gives the current matrix M. Its top row is $(-Q_r,\nu,0)$; its lower-left column is the displayed vector divided by $\nu$. Both p coordinates have equal metric, so the entire current $\omega_aJ$ drops from the symmetric part exactly, regardless of actual angular rate. Do not discard the rank-one term or the comparison p angular-rate contribution.

For an independently enclosed upper bound $\mu\geq\lambda_{\max}((M+M^{\mathsf T})/2)$ over every current mean-value/radius/source family, the Euclidean norm $W=|y|$ satisfies

$$
D^+W\leq\mu W+F,\qquad
F=\sqrt{(\nu f_q)^2+\left[f_H+(U_H+P_c/r_a)f_q\right]^2}.
$$

The source forcing bound follows directly by the triangle inequality in the p pair, then the Euclidean norm of the first coordinate and that pair. This preserves source history and introduces no cancellation between unknown source errors. The norm/logarithmic-norm inequality is the derivative of $|y|^2$ followed by the Rayleigh quotient bound; at W=0 its upper Dini form follows from the forcing norm. A prescribed whole-cell trial supplies every coefficient and r_a floor. Signed matrix averaging cannot be replaced by a nominal-point Jacobian.

For a constant whole-cell \mu and F, exact scalar variation yields endpoint bound $W_{\mathrm{end}}\leq e^{\mu dt}W_0+\phi(\mu,dt)F$, where $\phi=\int_0^{dt}e^{\mu s}\,ds$. A safe whole-cell bound is $\max(1,e^{\mu dt})W_0+\phi F$. Both bounds need independently enclosed exponentials, including negative \mu. Physical radius and intrinsic p norm errors are bounded by W/\nu and W. Physical receiving velocity still satisfies $e_u\leq W+C_qW/\nu+f_q$; actual acceleration must still be reconstructed from the original E field and stored on every completed source bin. Use the whole-cell W for histories and the endpoint W for the next receiving seed. Across prescribed metric changes multiply the endpoint seed by $\max(1,\nu_{\mathrm{new}}/\nu_{\mathrm{old}})$, which bounds the operator norm of the diagonal similarity.

Initialization from an independently admitted physical prefix uses $W_0\leq\sqrt{(\nu e_r)^2+(e_u+e_q)^2}$ with the separately checked complete q/root/source bound e_q. No p reset or source-history substitution occurs. Every future receiving cell requires strict improvement over its prescribed W and reconstructed physical U trial, positive receiving separation, complete closed source/angular inventories and full root-family inclusion before induction. Endpoint physical speed lower bounds and the independently assessed conditional stopping theorem retain sole authority for a first-unit contradiction.

For unit-ray coefficient output, let d be the comparison receiving radial vector expressed in the ray frame, and let $B=\begin{pmatrix}d_r&d_t\\-d_t&d_r\end{pmatrix}$. Then $Q=B q_X d$, $C=B H_X d$, and $U=B H_uB^{\mathsf T}$ over the same complete families. The nominal p components are the receiving-frame nominal physical velocity plus nominal q rotated by B. A wider independently enclosed family is valid. The full original position/source boxes still guard roots and every intermediate clock; projecting current columns does not reduce those guards.

An interval symmetric matrix can be enclosed by its rational symmetric midpoint S_0 plus symmetric radius matrix E with $\|E\|_2\leq\|E\|_F$. Thus a rigorous midpoint eigenvalue upper \alpha plus the Frobenius interval-radius upper bounds \mu. A rational certificate $\alpha I-S_0\succeq0$ can be checked by all seven principal minors in dimension three. A proof of that principal-minor criterion: if a positive diagonal exists, permute it first, take its Schur complement, and use the 2x2 principal-minor criterion; the Schur-complement diagonal and determinant equal corresponding nonnegative principal minors divided by the positive pivot. If all diagonals vanish, every 2x2 principal minor forces each off-diagonal to vanish, so the matrix is zero. Conversely a positive-semidefinite matrix has nonnegative principal minors by restricting its quadratic form. Rational bisection may search an upper \alpha, but only its final checked certificate enters the bound. Gershgorin row sums plus positive padding supply a finite starting upper; polynomial/runtime search is not a physical parameter fit.

Falsifiers are a missing independent coefficient combination, an incomplete source/root family, wrong clockwise J/angular signs, loss of Q_t or nominal p terms, unequal p metrics used to cancel current skew, an uncertified symmetric-matrix upper, omitted q/physical conversion, missing physical source A or a claimed actual J, and a physical event inferred from W failure. This prospective theorem alone establishes no numerical advantage or event.
