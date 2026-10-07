# A seventh-order Taylor enclosure of the fifth-order comparison response

**Derived candidate, pending independent assessment.** The [pointwise fifth-order comparison field](overnight2-a-seventh-order-method.md) is analytic on the same complex tube used for the accepted cubic comparison. Its two additional terms fit inside the existing tube with explicit reserve. This note bounds the Taylor remainder of its evaluated response through degree seven. Identification of the printed seventh-order coefficients still requires their separate derivation; actual-history transfer is another obligation.

The comparison is a local analytical instrument. The canonical inverse-square equation, original coefficients, complete physical past and $c_f=1$ remain unchanged. Complex parameters below serve coefficient bounds only and describe no physical continuation.

## Tube retained after adding the fourth and fifth terms

Use the [accepted cubic complex construction](overnight2-a-reference-fifth-order-remainder.md), with real receiving data $|P|\le3$, $0\le Q\le4$, $P^2+Q^2\le16$, complex $|\alpha|\le.02$, and $|\xi|\le2.5$. The comparison satisfies $y_\xi=\alpha w$, $w_\xi=\alpha F_5$, with $y(0)=(1,0)$ and $w(0)=(P,Q)$. On $\|y-(1,0)\|\le.25$, $\|w\|\le5.5$, retain the bilinear square-root branch $\rho=\sqrt{y\cdot y}$ and the bounds

$$
|\rho|^{-1}<1.513,\quad |\rho|^{-2}<2.29,
\quad \|n\|<1.9,\quad |p|<10.45,\quad \|v\|<25.355.
$$

All dot products inside the analytic field are bilinear; all norms in these bounds are Hermitian. Set the convenient majorants

$$
q_2=643,\quad p_*=10.45,\quad v_*=25.355,
\quad Q/|\rho|<6.052,\quad Q^2/|\rho|^2<36.64.
$$

Here $q_2$ bounds $|v\cdot v|$; it is not a new dynamical parameter. For the scalar coefficients $a_4,b_4,a_5,b_5$ of the method's pointwise field, direct absolute-value substitution gives

$$
|a_4|<64000,\quad |b_4|<3761,
\qquad |a_5|<554000,\quad |b_5|<22000.
\tag{1}
$$

For example, the five contributions to $a_4$ are bounded by $(8/3)(6.052)(10.45)^2$, $643^2/8$, $(8/3)(6.052)(643)$ and $36.64$; their sum is below 64000. The two $b_4$ terms are bounded by $(10.45)(643)/2$ and $(19/3)(6.052)(10.45)$. The same substitutions in the displayed fifth-order coefficients give the remaining bounds in (1).

The additional vector field contributions are therefore bounded by

$$
\frac{Q|\alpha|^4}{|\rho|^2}(|a_4|\|n\|+|b_4|\|v\|)<.319,
$$
$$
\frac{Q|\alpha|^5}{|\rho|^2}(|a_5|\|n\|+|b_5|\|v\|)<.048.
$$

The accepted cubic field bound was $28.843$. Thus $\|F_5\|<29.21<29.5$ on this same tube. Integrating gives velocity change at most $1.475$ and position change at most

$$
.02(2.5)(4)+\frac{(.02)^2(2.5)^2}{2}(29.5)=.236875.
$$

Both remain strictly inside the tube. The holomorphic ODE continuation argument used for the cubic field therefore applies with these revised constants. No assertion about an analytic physical history flow is needed.

## Complex clock and transverse response

The unchanged implicit comparison clock is $L=\sqrt{S\cdot S}/2$, $S=(1,0)+y(-2L)$, on $|L-1|\le.25$. Its argument is covered by the same $\xi$ disk, its image lies in $|L-1|<.144$, and its derivative is below $.145$. These statements depend only on the retained position and velocity tube, so their constants remain valid. The unique holomorphic root has $|\sqrt{S\cdot S}|>1.713$ and transmitter modulus above $.855$. Hence the evaluated response $\Phi_5=-4S/[(S\cdot S)^{3/2}D]$ obeys $\|\Phi_5\|<2.1$.

The transverse factor must be separately retained. Since $n_t=y_t/\rho$ and $v_t=w_t-py_t/\rho$, the fourth- and fifth-order transverse field additions have coefficients proportional to

$$
\frac{a_j-pb_j}{\rho}\,y_t+b_jw_t.
$$

For the fourth term, cancellation before bounding gives

$$
a_4-pb_4=\frac{9Qp^2}{\rho}+\frac{q^4}{8}
-\frac{8Qq^2}{3\rho}+\frac{Q^2}{\rho^2}-\frac{p^2q^2}{2}.
$$

Its modulus is below 104000. Therefore its additional transverse coefficients are below $.231$ for $|y_t|$ and $.00552$ for $|w_t|$. For the fifth term,

$$
a_5-pb_5=\frac{62Qp^3}{5\rho}-\frac{171Qpq^2}{10\rho}
+\frac{16Q^2p}{5\rho^2},
$$

whose modulus is below 785000. Its added coefficients are below $.035$ and $.000645$. Combining with the accepted cubic coefficients $22.1$ and $.223$ gives

$$
|(F_5)_t|<22.5|y_t|+.23|w_t|.
\tag{2}
$$

On any complex radial segment of the $\xi$ disk, $Y_t\le.05W_t$ and $W_t\le Q+.05(22.5Y_t+.23W_t)$. Thus

$$
W_t\le Q/.93225<1.073Q,
\qquad Y_t<.05365Q.
$$

The exact response denominator then gives the slightly rounded uniform estimate

$$
|\Phi_{5,t}|<.051Q.
\tag{3}
$$

At $Q=0$ the same component integral yields zero identically. The bound is proved before dividing by any angular quantity.

## Seventh-order Taylor consequence

Let $T_7\Phi_5$ denote the true degree-seven Taylor polynomial of this analytic comparison response. Cauchy's bound and the complete geometric tail imply, for real $0\le\alpha\le.001$,

$$
\|\Phi_5-T_7\Phi_5\|
\le\frac{2.1}{(.02)^8(1-\alpha/.02)}\alpha^8
<8.7\times10^{13}\alpha^8,
$$
$$
|\Phi_{5,t}-(T_7\Phi_5)_t|
\le\frac{.051Q}{(.02)^8(1-\alpha/.02)}\alpha^8
<2.11\times10^{12}Q\alpha^8.
\tag{4}
$$

The arithmetic uses $.02^8=2.56\times10^{-14}$ and a geometric denominator at least $.95$. The separately pending seventh-order coefficient reference must identify its printed list with this Taylor polynomial. Equation (4) is independent of that identification.

This is a comparison-response theorem candidate. Adding the actual-history discrepancy requires the accepted fifth-order row at every receiver of a complete enlarged source window, real component derivatives of $F_5$, both root displacements and the proper scaling back to physical slow acceleration. It does not settle the original release interval, nominal/spatial forcing or accumulated phase. No infinite-order convergence or replacement equation is inferred.

Falsifiers are a failed coefficient majorant in (1), a missing cancellation or factor in (2), loss of holomorphic retention or clock contraction, or an incorrect Taylor-tail denominator. All inequalities are analytical; no new target or process was run for this note. The note is frozen for separate assessment, with integration owned by the [main A report](overnight2-a-followup-and-research-2026-10-07.md).
