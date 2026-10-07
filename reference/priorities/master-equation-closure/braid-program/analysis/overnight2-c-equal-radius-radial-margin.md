# A radial residual margin for nonalternating equal-radius circles

## Statement and assumptions

Claim grade: derived, pending independent reconstruction. Use the same complete equal-radius circular logarithmic histories as the [polarity-order proof](overnight2-c-equal-radius-polarity-order.md): three fixed neutral antipodal unit-polarity pairs, six distinct present positions, common radius $a>0$, speed $0<v\le1$, $K_{\log}=c_f=1$, unchanged source factor, all thirty positive partner roots and no positive self root. Suppose the three positive endpoints lie in a semicircle. With $F_{i,r}=A_{i,r}+v^2/a$, at least one positive receiver satisfies

$$
|F_{i,r}|>\frac{v}{16a}.
$$

This is an explicit residual lower bound for the entire nonalternating equal-radius sector. It does not include the remaining alternating sector, superfield histories or arbitrary unequal radii.

## A uniform separation between opposite radial factors

The complete angle chart gives $\beta=H_v(\alpha)$ and $R_v(\beta)=[1-v\cos(\alpha/2)]^{-1}$. For $0<\beta<\pi$, write $\alpha_1=H_v^{-1}(\beta)$ and $\alpha_2=H_v^{-1}(\beta+\pi)$. Since $H_v'(\alpha)=D\le2$,

$$
\pi=\int_{\alpha_1}^{\alpha_2}D\,d\alpha\le2(\alpha_2-\alpha_1),
\qquad \alpha_2-\alpha_1\ge\frac\pi2.
$$

Differentiating the reciprocal factor with respect to $\alpha$ gives

$$
R_v(\beta)-R_v(\beta+\pi)
=\int_{\alpha_1}^{\alpha_2}\frac{v\sin(\alpha/2)}{2[1-v\cos(\alpha/2)]^2}\,d\alpha
\ge\frac v8\int_{\alpha_1}^{\alpha_2}\sin(\alpha/2)\,d\alpha.
$$

The sine is nonnegative on $[0,2\pi]$. Its integral over any interval of length at least $\pi/2$ is at least $2-\sqrt2$: for an interval of exactly that length, the integral is minimized at one of the endpoints of $[0,2\pi]$, as follows either by differentiating its starting-position formula or by symmetry and monotonicity toward the central maximum. Enlarging the interval cannot lower the integral. Therefore

$$
R_v(\beta)-R_v(\beta+\pi)
\ge\frac{(2-\sqrt2)v}{8}>\frac v{16}.
$$

The strict last inequality uses $\sqrt2<3/2$. This estimate is uniform in phase and speed, including the closed speed boundary, as long as the partner positions remain distinct. It supplies a conservative margin, not an optimal constant.

## Two extreme receivers give a residual obstruction

Use unwrapped positive phases of span less than $\pi$, which exists because no pair of positive endpoints can differ by exactly $\pi$ without a coincident label. At the largest-phase positive receiver, each of the other two neutral pairs has clockwise positive-source separation in $(0,\pi)$. Each paired radial contribution exceeds $v/(32a)$. At the smallest-phase receiver the two contributions are negative, each below $-v/(32a)$. Both receivers share the same own-antipode contribution $-R_v(\pi)/(2a)$. Thus

$$
A_{\max,r}-A_{\min,r}>\frac{v}{8a}.
$$

The required circular radial acceleration is the same at both receivers, so their residual difference is identical. If both residual magnitudes were at most $v/(16a)$, their difference could not exceed $v/(8a)$. This contradiction proves the stated residual lower bound.

No numerical root approximation or sampled residual is used. The estimate retains all five partner rows at each receiver, with the complete root chart accounting for all positive-delay history.

## Consequence for a separated compact boundary subset

On any fixed compact subset of this equal-radius sector with positive speed bounded below and all present separations bounded below, the residual lower bound has a uniform positive floor. The closed-subfield partner sums are continuous by the [root-bound theorem](overnight2-c-closed-subfield-root-bound.md). Consequently some relative neighborhood within the original subfield parameter domain also contains no exact configurations. This is a qualitative neighborhood statement: no radius-width constant is computed, and no claim of a uniform neighborhood over colliding or zero-speed preparations follows from it.

Within C's already proved compact containing domain, the relevant separated nonalternating equal-radius subset is compact and its speed has a positive lower bound. The preceding consequence therefore applies to that subset once this radial margin is independently verified. It still does not remove alternating equal-radius boundary points.

Falsifiers are a wrong root-angle interval length, an incorrect uniform sine-integral bound, a sign or multiplicity error in the two neutral pair sums, or a nonalternating equal-radius configuration whose entire radial residual is at or below the stated margin. Independence requires reconstructing these inequalities and their complete-root context; agreement of sampled residuals alone would not establish the result.
