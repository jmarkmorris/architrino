# Zero terminal speeds accumulate in every fixed radial-power family between one and two

## Candidate theorem and its exact dependencies

**Derived candidate, pending independent assessment.** Fix any $p\in(1,2]$. In the unchanged [complete compatible preparation family](alternatives-screen-2026-10-05-radial-power-family-preparation.md), zero-terminal-speed parameters accumulate at $\epsilon=0$. More precisely, there is an existential $\epsilon_*(p)>0$ such that every interval $(0,\epsilon_1)$ with $0<\epsilon_1<\epsilon_*(p)$ contains a parameter whose actual delayed future has zero terminal velocity. For each such fixed member, radius is comparable to $T^{2/(p+1)}$ at late times and total angular advance is finite.

This theorem depends on the new [fixed-power transition](alternatives-screen-2026-10-05-radial-power-family-transition.md) and [global dispersal proof](alternatives-screen-2026-10-05-radial-power-family-global.md), both presently undergoing independent reconstruction. It therefore remains a candidate until those premises and this extension are separately assessed. The equation retains $K=R_*=c_f=1$, its complete ordinary self/partner convention, opposite mirror labels, the frozen circle tail and its old-sourced compatibility patch. No exponent or preparation is adjusted after an outcome. The conclusion is for each fixed exponent, with no common threshold or common parameter sequence over exponents. At $p=2$ it concerns the canonical control; at $p=3/2$ it agrees with the separately assessed earlier terminal-speed theorem.

No particular parameter is located. Positive terminal-speed existence, discreteness, density or ordering of the zero set, a quantitative admission threshold, nonmirror robustness and arbitrary-history fate are not asserted. The proof permits every sufficiently small member to have zero terminal speed. Its new step is a nonvanishing winding coordinate valid for general fixed power, not an inference from a numerical trend.

## Notation and admitted-form global rows

Write $c=p-1\in(0,1]$, $k=3-p=2-c$, $A=2/k$, $a=h^{2/k}$, $x=r/a$, $y=a^{c/2}r'$, $\delta=\epsilon a^{-c/2}$, and $z=x^{-c}$. Here $r=|Y|$ is the scaled member radius and the prime is the scaled physical-time derivative. Set

$$
\ell=1/c\ge1,\qquad \nu=k/c=2\ell-1\ge1,\qquad \kappa=\sqrt k.
$$

The symbol $\ell$ in this source is a fixed exponent, not a source delay. The weighted clock is $d\chi/ds=a^{-(p+1)/2}x^{-p}$. The global proof provides a bounded positive-coordinate chart, uniform complete subfield speed, the actual history-dependent rows

$$
z_\chi=-cy+\frac{2c}{k}\delta z+O_p(\delta^2z),\qquad
y_\chi=z^\nu-1+\frac{c(p-2)}k\delta y+O_p(\delta^2),\qquad
\delta_\chi=-\frac c k\delta^2+O_p(\delta^3),
$$

and a finite weighted endpoint with

$$
z\to0,\quad y\to y_\infty\ge0,\quad
\delta\to\delta_\infty>0,\quad a\to a_\infty\in(0,\infty).
$$

Every finite physical time remains regular; this endpoint is physical time infinity. The physical terminal speed is $\epsilon a_\infty^{-c/2}y_\infty$, so its positivity is equivalent to $y_\infty>0$ for each fixed launch.

The transition uses $w=y-A\delta x^{-c}$ and a corrected potential minimum $x_\delta=1+O_p(\delta^2)$ with $dx_\delta/d\delta=O_p(\delta)$. Its amplitude $J$ is positive and comparable to $|(x-x_\delta,w)|$, has initial size comparable to $\epsilon$, and reaches a fixed $j_*(p)>0$. Its nonzero phase rotates with

$$
\frac d{d\eta}\arg[\kappa(x-x_\delta)+iw]
=-\kappa+O_p(J+\delta+\delta^3/J)<-b_p<0
$$

until the event. The last fixed-amplitude band has $\eta$ duration comparable to $\epsilon^{-(p+2)/p}$. All these are actual-history inequalities from the stated dependencies; no remainder below is differentiated.

## A nonvanishing coordinate through the entire generated future

Define

$$
\mathcal W=\kappa(1-x_\delta z^\ell)
+i\left[z^\ell y-A\delta z^{\ell+1}\right]
=z^\ell[\kappa(x-x_\delta)+iw].
$$

At every finite time $z>0$. Before the fixed transition its positive amplitude therefore makes $\mathcal W$ nonzero. At release its imaginary part is $-A\epsilon$ and its real part is $O_p(\epsilon^2)$. There is one continuous initial argument near $-\pi/2$ for all sufficiently small parameters.

After transition, the global proof gives a fixed scalar gap above the central minimum,

$$
e=\frac12y^2+\frac12z^{2/c}-\frac zc\ge e_{\min}+g_p,
\qquad g_p>0.
$$

On its action annulus this follows from the strictly increasing corrected action and its uniformly small difference from the central action. If the actual path reaches $e=1$, its final bounded-time comparison with that central level preserves the same lower gap after reducing the launch threshold. Thus the gap covers the whole post-transition future, including the last comparison interval.

A zero of $\mathcal W$ would require $z=x_\delta^{-1/\ell}=1+O_p(\delta^2)$ and $y=A\delta z=O_p(\delta)$. Its scalar would satisfy $e-e_{\min}=O_p(\delta^2)$, contradicting the fixed gap. Hence $\mathcal W$ never vanishes at any generated time. The auxiliary function $x_\delta$ remains defined by its local potential minimum for all small $\delta$; the actual radius is not required to stay near that minimum.

## Uniform sign of the post-transition winding

First set $\delta=0$ and let $U_0=\kappa(1-z^\ell)$ and $V_0=z^\ell y$. Under the central field $z_\chi=-cy$, $y_\chi=z^\nu-1$, the identity $c\ell=1$ gives

$$
(U_0)_\chi=\kappa z^{\ell-1}y,\qquad
(V_0)_\chi=-z^{\ell-1}y^2+z^\ell(z^\nu-1).
$$

Their determinant is therefore

$$
U_0(V_0)_\chi-V_0(U_0)_\chi
=-\kappa\left[z^{\ell-1}y^2+z^\ell(z^\ell-1)(z^\nu-1)\right].
$$

The bracket is positive for every $z>0$ except $(z,y)=(1,0)$, since both powers are positive and $z^\ell-1$ and $z^\nu-1$ have the same sign.

For the actual components $U=\operatorname{Re}\mathcal W$, $V=\operatorname{Im}\mathcal W$, direct product differentiation using the actual bounded rows gives

$$
U-U_0=O_p(\delta^2z^\ell),\qquad
V-V_0=O_p(\delta z^{\ell+1}),
$$

$$
U_\chi-(U_0)_\chi\big|_{F_0}
=O_p(\delta z^\ell+\delta^2z^{\ell-1}|y|),\qquad
V_\chi-(V_0)_\chi\big|_{F_0}
=O_p(\delta z^\ell|y|+\delta^2z^\ell).
$$

Only $x_\delta'$ and the explicit powers are differentiated. The error functions in the delayed rows are merely substituted with their stated bounds. When these component estimates are multiplied into the determinant, the smallest potentially problematic power is $z^{2\ell-1}$. Since $\ell\ge1$, it is bounded by a fixed multiple of $z^\ell$ on the global box. Consequently

$$
\operatorname{Im}(\overline{\mathcal W}\mathcal W_\chi)
=-\kappa\left[z^{\ell-1}y^2+z^\ell(z^\ell-1)(z^\nu-1)\right]+O_p(\delta z^\ell).
$$

This weighted error, rather than an unweighted $O_p(\delta)$, is essential at infinity. For $0<z\le1/2$, both $\ell,\nu\ge1$ imply $(1-z^\ell)(1-z^\nu)\ge1/4$, so the bracket dominates $z^{\ell-1}y^2+z^\ell/4$. On the remaining compact box $z\ge1/2$, the fixed scalar gap excludes the sole zero of the bracket and supplies a positive minimum. For small enough fixed-power launches, the actual determinant is strictly negative everywhere after transition. Thus the lifted phase $\psi=\arg\mathcal W$ decreases throughout that future.

Before transition, the positive factor $z^\ell$ leaves the transition phase unchanged. Its negative rate and last-band duration give

$$
\psi_b\le C_p-b_p\epsilon^{-(p+2)/p}.
$$

The initial phase is bounded and the earlier phase also decreases, so no unbounded positive prefix cancels this estimate. At the endpoint, bounded $y,\delta$ and $z\to0$ give $\mathcal W\to\kappa>0$. A small disk about that nonzero number admits one continuous argument and excludes further complete turns. The finite lifted limit exists and is

$$
\psi_\infty=2\pi N_p(\epsilon),\qquad N_p(\epsilon)\in\mathbb Z,
\qquad N_p(\epsilon)\longrightarrow-\infty\quad(\epsilon\downarrow0).
$$

Noninteger powers cause no differentiability problem here: $z>0$ during differentiation and $\ell\ge1$ supplies every bound used toward the endpoint. No analytic continuation of this winding coordinate through $z=0$ is required.

## Parameter continuity where terminal speed is positive

Fix a positive parameter $\epsilon_0$ in the common sufficiently small range. The circular-tail radius, frequency and patch coefficient depend smoothly on parameter nearby. On every fixed compact old physical-time interval, the histories vary continuously in $C^2$, including their moving patch seam because the correction and its first two derivatives vanish there. Uniform convergence over the infinite circular past is neither true in general nor required.

The proved global speed margin and local boundedness of the radius on a finite physical reception interval place all actual partner sources in one compact old-time interval, by the complete delay bounds. A positive separation floor on that finite interval gives a positive delay floor. Root monotonicity gives a Lipschitz root displacement bound by the position discrepancy divided by $1-b$. Bounded source acceleration controls source-velocity evaluation at the displaced time. Integrating the two actual position/velocity equations on successive intervals shorter than the delay floor and applying the integral difference inequality proves continuous dependence on parameter at each finite physical time. The positive intrinsic coordinates and their lifted phase inherit that continuity.

Suppose the selected parameter has $y_\infty=Y_*>0$. At a sufficiently late finite physical time $T_0$, take $y(T_0)>3Y_*/4$ and $z(T_0)=\zeta$ arbitrarily small. Nearby parameters have $y(T_0)>2Y_*/3$ and $0<z(T_0)<2\zeta$. The actual row has form $z_\chi=-cy+b(\chi)z$, $|b|\le C_p\epsilon$, and $|y_\chi|\le M_p$. Choose $\zeta$ small enough that, while $y\ge Y_*/2$ and $z\le2\zeta$, one has $z_\chi\le-cY_*/4$ and

$$
M_p\frac{8\zeta}{cY_*}<\frac{Y_*}{6}.
$$

Then $z$ reaches its terminal boundary within weighted duration $8\zeta/(cY_*)$, before $y$ can fall to $Y_*/2$. The global theorem rules out any competing ordinary-domain endpoint. Every nearby member also has positive terminal speed. Thus the positive-speed parameter set is open.

For the integer, more than this sign preservation is needed. The finite prefix of $\mathcal W$ has a positive minimum modulus, so its lifted phase depends continuously on parameter. Make $\zeta$ smaller if needed so that $\operatorname{Re}\mathcal W=\kappa(1-x_\delta z^\ell)>\kappa/2$ throughout the terminal strip for all nearby parameters. The whole remaining path then lies in one right-half-plane argument chart and approaches the positive real axis. It adds no whole turn. Hence the terminal integer $N_p$ is locally constant at every positive-speed parameter. No endpoint continuity at a zero-speed member or at parameter zero is assumed.

## Existence by connectedness and precise limitations

If an interval $(0,\epsilon_1)$ contained no zero-speed member, every member there would have positive terminal speed by the nonnegative-terminal theorem. The integer $N_p$ would be locally constant everywhere on that connected interval and therefore constant. Its proved divergence at zero contradicts that conclusion. Every such interval consequently contains a zero-speed member; choosing each new parameter smaller than half the preceding one produces a sequence decreasing to zero.

The complement of the open positive-speed set is a relatively closed zero-speed set in the admitted interval. This does not make its members isolated or its interior empty. The argument admits the possibility of an interval of zeros and does not establish any positive-speed launch. It provides no finite numerical parameter or common set of parameters for distinct exponents.

For each selected zero-speed member, the global reconstruction gives $y\asymp\Delta$, $z\asymp\Delta^2$, $\Delta=\chi_\infty-\chi$. Therefore $ds/d\chi\asymp\Delta^{-2p/(p-1)}$ and $r\asymp\Delta^{-2/(p-1)}$, yielding physical radius comparable to $T^{2/(p+1)}$. The constants are member-dependent. This is dispersal with speed tending to zero, not capture or asymptotic binding.

Falsifiers are a vanishing release seed; failure of the scalar gap on the final comparison interval; a missing factor $z^\ell$ in the determinant error; a zero of the auxiliary coordinate despite the displayed gap; failure of complete-source finite-time parameter continuity; or failure of the positive-speed terminal strip. No numerical trajectory or unexamined physical law supplies a premise. This source remains separate from the frozen preparation, transition and global subjects, and awaits a fresh independent review.
