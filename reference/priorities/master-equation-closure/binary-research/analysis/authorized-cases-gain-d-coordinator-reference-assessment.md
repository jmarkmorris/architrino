# Assessment of the preparation-specific radial threshold

**Claim grade: derived independent reconstruction.** The [frozen geometric-threshold reference](authorized-cases-gain-d-reference-geometric-threshold.md) is accepted with one polynomial-coefficient correction below. This reconstruction follows disclosure of that reference; it is not claimed as a second blind derivation. The separately frozen coordinator [return-gain note](authorized-cases-gain-d-coordinator-return-gain.md) preceded disclosure and supplies a different actual-component check. Neither analysis proves the nominal radial-entry sign.

## Exact criterion and correction

Use the reference's unchanged canonical law, complete nominal-prefix/spatial class and notation: $\chi=K/d$, $u$ outward relative radial speed, $v$ transverse relative velocity, $g=\sqrt{1-|b|^2}$ for transverse midpoint velocity $b$, and $j=-J>0$. Let $F(u)=u-2\log(1+u/2)$, $P=\chi-F(u)+(3/2)\chi^2$, and define the unique positive $U_*(\chi)$ by $F(U_*)=\chi+(3/2)\chi^2$. Direct substitution gives

$$
j+\frac{|v|^2}{2}+2\chi(1-g)
=q_\chi(u):=2\chi+\chi u-\frac{u^2}{2}.
$$

On $u\ge0$, $F$ increases, while $q_\chi$ increases only up to $u=\chi$ and then decreases. Since $U_*>2\sqrt\chi>\chi$ and $q_\chi(U_*)<2\chi$, the small increasing branch cannot meet the sublevel. This proves the reference's exact equivalence

$$
P\le0\quad\Longleftrightarrow\quad
j+\frac{|v|^2}{2}+2\chi(1-g)\le B(\chi),
\qquad B(\chi)=q_\chi(U_*).
\tag{1}
$$

The fourth-order Taylor brackets for $F$ are valid by integration of a finite geometric series with its signed remainder. For $s=\sqrt\chi\le10^{-6}$ they place $U_*$ between $2s+(2/3)s^2+s^3$ and $2s+(2/3)s^2+2s^3$. The reference's subsequent displayed quadratic substitution has one wrong coefficient. The correct exact polynomial is

$$
q_\chi\left(2s+\frac23s^2+a s^3\right)
=\frac23s^3+\left(\frac49-2a\right)s^4
+\frac a3s^5-\frac{a^2}{2}s^6.
\tag{2}
$$

In particular the $s^5$ coefficient is $+a/3$, not $-2a/3$. The missing contribution is $+a s^5$ from $\chi u$. The claimed bounds survive: at $a=1$, the fourth-order coefficient is $-14/9$ and the positive correction is less than $10^{-6}/3$, preserving an upper coefficient below $-3/2$; at $a=2$, the coefficient is $-32/9$ and its correction is greater than $-2\times10^{-12}$, preserving a lower coefficient above $-4$. Monotonicity therefore gives exactly the accepted enclosure

$$
\frac23\chi^{3/2}-4\chi^2
<B(\chi)<\frac23\chi^{3/2}-\frac32\chi^2.
\tag{3}
$$

The frozen reference remains unchanged. This correction affects the displayed supporting polynomial, not the criterion, threshold range or subsequent disposition.

## Quantitative discrimination and geometry

The account rearrangement

$$
P=\frac j2+\frac{|v|^2}{4}+\chi(1-g)
-\frac{\chi u}{2}+\frac{u^2}{4}-F(u)+\frac32\chi^2
$$

and the upper Taylor bound on $F$ give the reference's exclusion. The minimum of $-\chi u/2+u^3/12$ on $u\ge0$ is $-(\sqrt2/3)\chi^{3/2}$; also $u^4\le4.04^2\chi^2$. Hence $j_L\ge\chi_L^{3/2}$ implies $P_L>.028\chi_L^{3/2}>5\times10^{-57}$. The accepted whole-passage delayed allowance is $9\times10^{-59}$. This proves a conditional exclusion with a quantitative gap, not nominal membership in that exclusion.

Conversely, on the actual negative branch, (1) and (3) imply

$$
j_L<\frac23\chi_L^{3/2},\qquad
|v_L|^2<\frac43\chi_L^{3/2},\qquad
u_L^2>4\chi_L.
\tag{4}
$$

Thus the angle $\theta_L$ between outward $U_L$ and $N_L$ must satisfy

$$
0\le\theta_L=\arctan\frac{|v_L|}{u_L}
<\frac{\chi_L^{1/4}}{\sqrt3}
<4.65\times10^{-10}\ \text{radians}.
\tag{5}
$$

The last bound uses the retained $\chi_L<(5/12)10^{-36}$. This is a necessary alignment for this sufficient escape certificate while $J_L<0$, not a requirement for every possible dispersing solution. It explains why a small absolute velocity or an angular floor does not establish entry: at this distance the criterion demands motion extremely close to radial, together with a much smaller signed deficit. All statements remain conditional on the actual negative first-$L$ branch being realized.

## Signed passage and acceptance boundary

The exact radial row can be written $u'=\mathcal A-k(2+u)+e_r$, with $\mathcal A=|v|^2/d+2k(1-g)+Q_r\ge0$. Multiplication by $F'(u)$ and use of $\chi'=-ku$ independently verifies the signs in reference (15)–(16). The integral of $3ku\chi$ is exactly $(3/2)(\chi_D^2-\chi_L^2)$, including returns. The remaining $\mathcal A$ integral is oriented along the actual radial history and cannot be made positive by its pointwise outward sign. Its angular-floor-only lower bound on a hypothetically monotone passage is correctly below $2\times10^{-66}$; that number bounds the displayed floor contribution, not the actual gain from above.

The required endpoint information concerns a threshold of order $\chi_L^{3/2}$, approximately $10^{-55}$, while the retained deficit enclosure is of order $\chi_L$, approximately $10^{-37}$. The more than $4.6\times10^{18}$ ratio compares those information scales, not a numerical error or a proven physical discrepancy. No actual sign, new complete preparation, enlarged equation domain, stability or binding claim is accepted. The historical numerical source remains unidentified as before.

Analytical controls are the integral definition and monotonicity of $F$, exact quadratic expansion (2), the cubic minimum and direct differentiation of the signed radial account. Falsifiers are an omitted term in the actual account, failure of the stated small-speed branch, a false polynomial bracket, or incorrect treatment of an inward contribution as outward. No numerical target or scientific process was run; document validation has only syntax/link scope. The additional alignment consequence (5) is separately submitted to the reference worker for checking before shared integration.
