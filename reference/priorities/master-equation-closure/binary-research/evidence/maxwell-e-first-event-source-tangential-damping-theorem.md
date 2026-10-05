# Conditional source-tangential damping comparison theorem

Status: derived prospective comparison rule on the unchanged original Section 7 E case, requiring independent assessment before implementation or target. This rule preserves complete root/source families and the signed source-radius theorem. It introduces no physical preparation, equation, source exclusion or continuation rule. Every claim is conditional on the original no-prior-unit stopping hypothesis and the independently admitted incoming induction.

## Fixed-root velocity decomposition

At receiving time $T$, apply the single constant rotation aligning its actual radial ray with the comparison radial ray. At the actual completed partner root $S_a$, let $n_c,t_c$ be the comparison positive-label radial/tangential basis, $R_s$ the actual-to-comparison source-axis rotation, and $r_a,r_c,h_a,h_c,u_a,u_c$ the respective intrinsic source quantities. The actual negative-label source velocity is $-R_s(u_a n_c+h_a t_c/r_a)$, and its comparison velocity is $-(u_c n_c+h_c t_c/r_c)$. Thus its difference is exactly

$$
\delta V_s=-\delta u_r n_c-\left(\frac{\delta h}{r_a}-\frac{h_c\delta r}{r_a r_c}\right)t_c-(R_s-I)\left(u_a n_c+\frac{h_a}{r_a}t_c\right).
$$

This is a decomposition in the nominal source basis. Its last norm is at most $V_{a,\max}\min(2,\Psi)$, with $V_{a,\max}\leq V_{c,\max}+e_{V,s}$ independently obtained from the completed source inventory. It does not reuse the old nominal-vector-only rotation bound after changing the decomposition. Let $F_V$ be the complete mean-value fixed-root source-velocity matrix, already enclosed by the unchanged coefficient family. Set $g_t=t_c(T)\cdot F_Vt_c(S_a)$ and $g_r=t_c(T)\cdot F_Vn_c(S_a)$, retaining their signed intervals before magnitudes. The contribution $-g_t\delta h(S_a)/r_a(S_a)$ is exact under that family. Positive source radii are independently enclosed. The negative mirror sign is essential.

## Current h damping and completed derivative history

The exact equation $\delta h'=r_a(T)\delta A_t+\delta r(T)A_{c,t}$ permits the coefficient

$$
a(T)=\frac{r_a(T)g_t(T,S_a)}{r_a(S_a)}.
$$

Keep an interval enclosing its full family, including actual receiving/source radius tubes. Since $\delta h(S_a)=\delta h(T)-\int_{S_a}^{T}\delta h'(q)\,dq$, the signed source contribution becomes $-a\delta h(T)+a\int_{S_a}^{T}\delta h'$. Let $a_*\geq\sup|a|$, $\lambda=-\inf a$. Remaining source radial velocity, source-radius contribution $g_th_c\delta r/(r_ar_c)$, physical source acceleration, angular rotation, signed-position history term, receiving-radius/comparison-tangential-acceleration term and residual must all be enclosed in a nonnegative remainder. Write this enclosure as $LZ+F_0$, where $Z$ uses the already assessed cell metric and receiving signed-radius coefficients. No signed term may also be retained in $F_0$, and no other term may be dropped. Then

$$
D^+|\delta h|\leq\lambda|\delta h|+LZ+F_0+a_*\int_{S_a}^{T}|\delta h'(q)|\,dq.
$$

A completed history derivative density is independently bounded by the physical Cartesian acceleration components:

$$
|\delta h'|\leq(r_{c,\max}+e_r)e_{A_t}+e_r|A_{c,t}|.
$$

This uses no actual jerk. On a negative-time source segment, the intrinsic $e_{A_t}$ must include the explicitly retained Cartesian-to-axis conversion, and $e_r$ must bind the original exact patch mismatch. Every closed source bin, both physical patch seams, and every partial endpoint are retained. A zeroth-moment primitive may accelerate exact integration, but a separate direct-sum reference checks it.

For a cell $[L_0,U_0]$ of width $d$, let $I_0$ bound the completed integral from the full source lower face through $L_0$, and let $Z_*,H_*$ be prescribed whole-cell trials. A current derivative supremum $Q_*$ satisfies

$$
Q_*\leq a_*H_*+LZ_*+F_0+a_*(I_0+dQ_*).
$$

When $1-a_*d>0$, the rational quantity

$$
Q_{req}=\frac{a_*H_*+LZ_*+F_0+a_*I_0}{1-a_*d}
$$

closes that obligation. Use $F_h=F_0+a_*(I_0+dQ_{req})$ in the h differential inequality. The coefficients and forcing may be interval upper bounds varying physically within the cell; the scalar inequality still follows pointwise. Failure of this sufficient inverse is a method obstruction only.

## Whole-cell versus endpoint h bounds

A negative h diagonal cannot be inserted into the earlier whole-supremum backward-Euler inverse: $-aH(q)$ cannot be bounded by $-a\sup H$. Instead let $E\geq e^{\lambda d}$ and $P\geq\int_0^d e^{\lambda q}\,dq$, using independently controlled outward exponentials and the continuous value $P=d$ at zero. For constant nonnegative forcing $B$, scalar comparison gives

$$
H(q)\leq e^{\lambda q}H_0+\left(\int_0^q e^{\lambda s}\,ds\right)B.
$$

This comparison trajectory is monotone or constant, because its derivative has constant sign multiplied by a positive exponential. Consequently its whole-cell maximum occurs at an endpoint, and

$$
H_*\leq\max(1,E)H_0+P(LZ_*+F_h).
$$

The radial comparison remains $Z_*\leq Z_0+d(MZ_*+C_hH_*+F_r)$ with $M\geq0$. Therefore, if $\Delta=1-dM-dC_hPL>0$, the following quantities enclose the complete cell:

$$
Z_*\leq\frac{Z_0+dC_h\max(1,E)H_0+dF_r+dC_hPF_h}{\Delta},\qquad
H_*\leq\max(1,E)H_0+P(LZ_*+F_h).
$$

A distinct endpoint bound is

$$
H_{end}\leq EH_0+P(LZ_*+F_h).
$$

All trial/component/source/physical-acceleration obligations use the whole-cell bound. The next receiving state may use the endpoint bound only after it is stored separately, with exact source inventories continuing to use the whole-cell bound. Existing inherited rows may initialize both endpoint and whole-cell h errors with their previously admitted common bound. The Z metric jump remains unchanged. Strict trial admission must test the whole-cell quantities; endpoint improvement alone is insufficient.

## Falsifiers and limits

An incorrect mirror sign; an incomplete fixed-root F_V family; omission of actual source speed from the new velocity rotation bound; a missing source bin, patch seam or current derivative integral; nonpositive receiving/source radius; invalid exponential/phi enclosure; nonpositive scalar/joint denominator; or using endpoint h as a historical whole-cell density falsifies this comparison. Its mathematical acceptance does not establish efficacy, a new actual prefix, stable binding or a first unit event. Those require complete target recurrence/domain/root/source assessment and the original conditional terminal-speed contradiction. A failure of its sufficient comparison enclosure does not identify a physical event.
