# From the cubic actual row to a fifth-order source enclosure

**Derived candidate, pending independent assessment.** The [accepted cubic row](overnight2-a-canonical-cubic-assessment.md) and [local comparison lemma](overnight2-a-local-ode-source-comparison.md) can be combined with the [analytic comparison remainder](overnight2-a-cubic-comparison-analytic-remainder.md). This note evaluates the actual-to-comparison part. Its conclusion remains a candidate until this note, the complex remainder and the separately computed fifth-order coefficients have each received independent scrutiny.

The geometry is the same already admitted slow mirror reference, with unchanged canonical inverse-square response, coefficient normalization, complete history and $c_f=1$. No mirror history is substituted for the actual nominal/spatial pair. The auxiliary field below is an analytical instrument on one causal window.

## Source coverage and the cubic comparison

Use $\alpha=\epsilon/h$, $P=hp$, $Q=h^2/r$ and $\ell=2.1\alpha$ from the [evaluated first-order comparison](overnight2-a-evaluated-source-comparison.md). Retain the actual slow region and require

$$
\sigma^4(s)\ge10\epsilon.
\tag{1}
$$

The two latest delays exceed $3.9\epsilon r$, so every point $a$ of $[s-2.1\epsilon r,s]$ is later than $\sigma^2(s)$. Monotone source playback then gives $\sigma^2(a)\ge\sigma^4(s)\ge10\epsilon$. Thus the accepted cubic remainder applies at every receiver in this full comparison window. No release-seam derivative is introduced.

In coordinates $y(\tau)=Y(s+rh\tau)/r$, use the pointwise cubic field

$$
F_3=Q\left[-\frac n{\rho^2}
+\frac\alpha{\rho^2}(w-2pn)
+\frac{\alpha^2}{\rho^2}\left(\frac{|v|^2}{2}n+pv\right)
+\frac{\alpha^3Q}{3\rho^3}(4pn-5v)\right],
$$

where $\rho=|y|$, $n=y/\rho$, $p=n\cdot w$ and $v=w-pn$. All variables here are real. The comparison solution shares the actual terminal position and velocity. It remains in $|y-(1,0)|\le.01$, $|w-(P,Q)|\le.02$: on that convex tube, $|F_3|<4.2$, $L_y<10$, $L_w<5\alpha$. Its backward velocity change is below $.00882$ and position change below $.00842$.

These field constants can be checked without a new instrument. The first-order field has $L_y<9$ and $L_w<4.1\alpha$. Differentiating the quadratic term adds at most $8.5Q|w|^2\alpha^2/\rho^3<567\alpha^2$ to $L_y$ and $3Q|w|\alpha^2/\rho^2<50\alpha^2$ to $L_w$. Differentiating the cubic term adds at most $11Q^2|w|\alpha^3/\rho^4<737\alpha^3$ and $5Q^2\alpha^3/(3\rho^3)<28\alpha^3$. These leave the stated margins at $\alpha\le.001$. Its integral comparison denominator obeys

$$
\vartheta\le32.55\alpha^2<.000033.
$$

## Bounded actual discrepancy without differentiation

Write $y''=F_3(y,y')+e$. The accepted cubic errors at each source receiver, the radius ratio at least $.99$, and angular ratio at least $1-20\alpha^2$ give

$$
|e|<35000Q\alpha^4.
\tag{2}
$$

The triangle coefficient before rescaling is $31000+800Q_a\le34200$, and multiplying by $.99^{-2}(1-20\alpha^2)^{-4}$ stays below 35000. In fixed reception transverse axes, rotate the radial residual through the actual angle at most $2.15\alpha Q$ and use $Q_a\le Q/.99$. The resulting coefficient is bounded by

$$
\frac{1}{.99^2}(1-20\alpha^2)^{-4}
\left(\frac{800}{.99}+31000(2.15)\alpha\right)<900.
$$

Consequently

$$
|e_t|<900Q^2\alpha^4.
\tag{3}
$$

Both bounds concern the actual discrepancy itself. The comparison proof takes no derivative of it. The isotropic local lemma gives

$$
\sup|y-z|<78000Q\alpha^6,
\qquad \sup|y'-z'|<74000Q\alpha^5.
\tag{4}
$$

## Component retention

The actual and comparison paths have $|y_t|,|z_t|\le3\alpha Q$ and $|y'_t|,|z'_t|\le1.1Q$. The comparison tube closes because $|(F_3)_t|<4.4\alpha Q^2$ there. For the first-order part the corresponding bound is $4.3\alpha Q^2$. The added quadratic term contributes below $4.6\alpha^2Q^2$ and the cubic term below $7.8\alpha^3Q^2$.

On the whole joining tube, direct component differentiation gives

$$
|\partial_{y_r}(F_3)_t|<20\alpha Q^2,
\quad |\partial_{w_r}(F_3)_t|<40\alpha^2Q^2,
$$
$$
|\partial_{y_t}(F_3)_t|<2Q,
\quad |\partial_{w_t}(F_3)_t|<2\alpha Q.
\tag{5}
$$

Here is an explicit check of the additional mixed terms. Since $|n_t|<3.031\alpha Q$, $|v_t|<1.113Q$ and $|v_r|<3.374\alpha Q^2$, the radial-position derivative of $G_t=(|v|^2/2)n_t+pv_t$ is below $137\alpha Q$. Its radial-velocity derivative is below $1.126Q$, while $|G_t|<4.5Q$. After multiplication by $Q\alpha^2/\rho^2$ and differentiation of that denominator, these cost below $9.5\alpha^2Q^2$ and $1.15\alpha^2Q^2$. The cubic transverse numerator is $9pn_t-5w_t$. Its value is below $5.61Q$ and its radial-position derivative below $113\alpha Q$; the resulting extra mixed costs are below $6\alpha^3Q^3$ and $10\alpha^4Q^3$. Added to the first-order $13\alpha Q^2$ and $7\alpha^2Q^2$ bounds, these lie well within (5). The diagonal bounds also follow from the displayed full derivative estimates and the first-order component bounds, retaining their factors $Q$ and $\alpha Q$.

By (4), radial-to-transverse cross forcing is below

$$
20\alpha Q^2(78000Q\alpha^6)
+40\alpha^2Q^2(74000Q\alpha^5)
=4520000Q^3\alpha^7.
$$

Relative to $Q^2\alpha^4$, this is below $.019$. Using a transverse forcing allowance $910Q^2\alpha^4$ and the transverse denominator defect below $.000035$ gives

$$
\sup|y_t-z_t|<2010Q^2\alpha^6,
\qquad \sup|y'_t-z'_t|<1920Q^2\alpha^5.
\tag{6}
$$

This step retains the fixed-axis component estimates rather than dividing an isotropic residual by angular velocity.

## Root displacement and actual response bound

Both positive roots lie in the common window, since the root gap is negative at zero and positive at $\ell$, with chord length at most $2.01$. The transmitter floor is $m=.99598$ and the joining chord floor is $1.99$. Equations (4)–(6) imply

$$
|\Delta d|<79000Q\alpha^7,
\quad |\Delta S_r|<79000Q\alpha^6,
\quad |\Delta(\alpha w_r)|<75000Q\alpha^6,
$$
$$
|\Delta S_t|<2100Q^2\alpha^6,
\qquad |\Delta(\alpha w_t)|<1921Q^2\alpha^6.
\tag{7}
$$

The displaced source-time terms use the comparison bounds $|z'_t|<1.1Q$ and $|z''_t|<4.4\alpha Q^2$. The velocity error therefore acquires no unsupported transverse factor.

The same response derivatives as in the first-order comparison are bounded by $1.04$ isotropically, and by $.52$, $2.4\alpha Q$, $1.54\alpha Q$, $2.4\alpha^2Q^2$ in the four transverse component directions. Substitution yields

$$
|\mathcal R_{\rm actual}-\Phi_3|<650000\alpha^6,
\qquad |(\mathcal R_{\rm actual}-\Phi_3)_t|<5600Q\alpha^6.
\tag{8}
$$

For the second inequality, the coefficient is below $1092+189.6+115.5+.074<1400$ in units $Q^2\alpha^6$, and $Q\le4$. The first inequality follows from the full vector estimates behind (4) and the isotropic local lemma; $1.04(79000+75000)Q<650000$. These compare two evaluated responses. They are independent of the Taylor coefficients of the analytic comparison.

Combining (8) with the candidate complex Taylor enclosure would give

$$
|\mathcal R_{\rm actual}-T_5\Phi_3|<3.51\times10^{10}\alpha^6,
$$
$$
|\mathcal R_{{\rm actual},t}-(T_5\Phi_3)_t|<8.31\times10^8Q\alpha^6.
\tag{9}
$$

Physical slow acceleration bounds divide these expressions by $r^2$. Equation (9) is a candidate derived consequence with declared prerequisites, not acceptance of an unchecked printed fifth-order polynomial. The complex estimate dominates these conservative constants. It does not yet provide the cancellation-preserving long-time seed or phase estimate needed to decide the actual nominal member.

The original nonmirror centered-history forcing remains separate; it is not assigned (3) or a factor $q$. Every source level in (1) is necessary for this application, and the earlier release argument remains intact. No actual orbit is computed or replaced. Falsifiers include a missing source generation, an incorrect rescaling of the cubic field, a component derivative outside (5), a dropped clock displacement, or failure of a required complex Taylor bound. The [main A report](overnight2-a-followup-and-research-2026-10-07.md) owns independent assessment and integration.
