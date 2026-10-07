# An actual seventh-order response bound from the fifth-order comparison

**Derived candidate, pending independent assessment.** This note transfers the independently checked fifth-order actual mirror response to a seventh-order evaluated response. The auxiliary ordinary differential equation is used only on one complete causal window. The physical equation remains the canonical inverse-square Master Equation, with its fixed coupling, complete admitted slow mirror past and $c_f=1$. This does not yet transfer the result to the original nominal nonmirror history or decide its entry phase.

The prerequisites are the [accepted fifth-order remainder assessment](overnight2-a-reference-fifth-order-remainder.md), the [local source-comparison lemma](overnight2-a-local-ode-source-comparison.md), the pointwise field $F_5$ in the [seventh-order method](overnight2-a-seventh-order-method.md), and the separately proposed [complex comparison bound](overnight2-a-fifth-comparison-analytic-remainder.md). Identification of its Taylor polynomial with the printed seventh-order coefficients requires the independently derived coefficient reference. No numerical trajectory is used here.

## Complete generated-source window

Retain the slow mirror domain $h\ge.99$, $|e|\le3$, $\epsilon\le1/2000$, and set $\alpha=\epsilon/h$, $P=hp$, $Q=h^2/r$. Thus $|P|\le3$, $0\le Q\le4$ and $P^2+Q^2\le16$. Use the deliberately enlarged bound $\alpha\le.001$. Require the sufficient source-generation condition

$$
\sigma^6(s)\ge10\epsilon.
\tag{1}
$$

Here $\sigma$ is the actual mirror causal-source clock, and its superscript denotes composition. Every receiver $a$ in $[s-2.1\epsilon r,s]$ lies after $\sigma^2(s)$ by the accepted two-delay lower bound. Monotonicity of playback gives $\sigma^4(a)\ge\sigma^6(s)$, so the accepted fifth-order row is available throughout the comparison window. This is a sufficient proof condition, not a claim that six generations are physically necessary. Earlier release seams remain a separate part of the original preparation.

In fixed reception axes and time $\tau=(a-s)/(rh)$, the actual path obeys $y''=F_5(y,y')+f$. The comparison $z''=F_5(z,z')$ shares the actual terminal position and velocity. The fifth-order actual residual and the accepted radius/angular ratios imply

$$
|f|<4\times10^{10}Q\alpha^6,
\qquad |f_t|<10^9Q^2\alpha^6.
\tag{2}
$$

For the first inequality the coefficient before source rescaling is at most $3.51\times10^{10}+4(8.31\times10^8)=3.8424\times10^{10}$. Multiply by $.99^{-2}(1-20\alpha^2)^{-6}$ to obtain the stated allowance. For the fixed transverse component, the rotated radial error and transverse error have coefficient at most

$$
.99^{-2}(1-20\alpha^2)^{-6}
\left(\frac{8.31\times10^8}{.99}
+3.51\times10^{10}(2.15)\alpha\right)<10^9.
$$

The actual angle is at most $2.15\alpha Q$. No derivative of $f$ is taken.

## Real comparison and derivative bounds

Use the real convex tube $|y-(1,0)|\le.01$, $|w-(P,Q)|\le.02$. On it the fifth-order field obeys

$$
|F_5|<4.2,\qquad L_y<10,\qquad L_w<5\alpha.
\tag{3}
$$

Here is an explicit derivative allowance for the terms added to the already checked cubic field. Extend the tube only for this analytical estimate to complex $\|y-(1,0)\|\le.05$, $\|w\|\le4.1$, using the square-root branch $\rho=\sqrt{y\cdot y}$. Dot products are bilinear and bounds use Hermitian norms. Then

$$
|\rho|>.947,\quad \|n\|<1.109,\quad |p|<4.548,
\quad \|v\|<9.145,\quad |v\cdot v|<83.64.
$$

Absolute substitution in the pointwise scalar coefficients gives $|a_4|<2100$, $|b_4|<320$, $|a_5|<23000$, $|b_5|<2300$. Thus the vector coefficients of $\alpha^4$ and $\alpha^5$, including $Q$, have norms below 24000 and 210000. A complex coordinate circle of radius $.01$ about each point of the real tube stays inside this extension. Cauchy's derivative inequality, with a conservative factor for the two Cartesian coordinates, bounds each added derivative operator by

$$
10^7\alpha^4+10^8\alpha^5.
$$

The cubic estimates are $L_y<9+567\alpha^2+737\alpha^3$ and $L_w<4.1\alpha+50\alpha^2+28\alpha^3$. Their sum with the added allowance implies (3); the analogous field bound follows from $4.1+100\alpha^2+200\alpha^3+24000\alpha^4+210000\alpha^5<4.2$. Integration over $\ell=2.1\alpha$ retains the real tube, and the comparison denominator defect is at most $32.55\alpha^2<.000033$.

The local comparison lemma applied to (2) gives

$$
\sup|y-z|<9\times10^{10}Q\alpha^8,
\qquad \sup|y'-z'|<8.5\times10^{10}Q\alpha^7.
\tag{4}
$$

## Transverse factor and mixed derivatives

Both paths retain $|y_t|,|z_t|\le3\alpha Q$ and $|y'_t|,|z'_t|\le1.1Q$. Write the extra transverse fields as

$$
(F_j)_t=Q\alpha^j(A_jy_t+B_jw_t),
\qquad A_j=\frac{a_j-pb_j}{\rho^3},\quad B_j=\frac{b_j}{\rho^2},
\qquad j=4,5.
$$

On the complex extension just used, $|A_4|<5000$, $|B_4|<400$, $|A_5|<50000$, $|B_5|<3000$. Coordinate derivatives are bounded by 100 times these values. Holding the transverse coordinates fixed, the added radial-position or radial-velocity derivatives are bounded respectively by

$$
45500Q^2\alpha^4,\qquad 345000Q^2\alpha^5.
$$

For example, the first coefficient comes from $500000(3\alpha)+40000(1.1)\le45500$. The diagonal additions for $j=4$ are at most $187000Q\alpha^4$ and $182400Q\alpha^4$, and those for $j=5$ at most $1.43\times10^6Q\alpha^5$ and $1.383\times10^6Q\alpha^5$. Combining these with the accepted cubic component bounds, including the correction recorded in its independent assessment, gives

$$
|\partial_{y_r}(F_5)_t|<30\alpha Q^2,
\quad |\partial_{w_r}(F_5)_t|<50\alpha^2Q^2,
$$
$$
|\partial_{y_t}(F_5)_t|<3Q,
\quad |\partial_{w_t}(F_5)_t|<3\alpha Q.
\tag{5}
$$

The field additions themselves are at most $455Q^2\alpha^4$ and $3450Q^2\alpha^5$, so $|(F_5)_t|<4.5\alpha Q^2$ and the transverse tube closes. In particular these estimates retain zero transverse response when $Q=0$ before any division by an angular quantity.

By (4)–(5), cross forcing from the radial errors is bounded by $6.95\times10^{12}Q^3\alpha^9$. In units $Q^2\alpha^6$ this is below 27800, leaving ample room inside the total allowance $1.01\times10^9Q^2\alpha^6$. The diagonal integral defect is below $12.915Q\alpha^2<.000052$. Consequently

$$
\sup|y_t-z_t|<2.3\times10^9Q^2\alpha^8,
\qquad \sup|y'_t-z'_t|<2.2\times10^9Q^2\alpha^7.
\tag{6}
$$

## Evaluated causal-root response

The actual and comparison positive roots both lie in the full window, and the transmitter and joining-chord floors remain $.99598$ and $1.99$. With $S$ the source-to-receiver chord, the local comparison lemma gives

$$
|\Delta d|<9.1\times10^{10}Q\alpha^9,
\quad |\Delta S|<9.1\times10^{10}Q\alpha^8,
\quad |\Delta(\alpha w)|<8.6\times10^{10}Q\alpha^8.
$$

The comparison transverse source velocity is at most $1.1Q$ and its transverse source acceleration at most $4.5\alpha Q^2$. Including the shifted source time in (6) gives

$$
|\Delta S_t|<2.41\times10^9Q^2\alpha^8,
\qquad |\Delta(\alpha w_t)|<2.21\times10^9Q^2\alpha^8.
\tag{7}
$$

Use the previously checked response derivatives: isotropic norms below $1.04$, transverse derivatives bounded by $.52$, $2.4\alpha Q$, $1.54\alpha Q$ and $2.4\alpha^2Q^2$ in the respective transverse-chord, radial-chord, radial-velocity and transverse-velocity directions. Substitution yields

$$
|\mathcal R_{\rm actual}-\Phi_5|<7.5\times10^{11}\alpha^8,
\qquad |(\mathcal R_{\rm actual}-\Phi_5)_t|<6.5\times10^9Q\alpha^8.
\tag{8}
$$

For the first inequality, $1.04(9.1+8.6)10^{10}Q<7.5\times10^{11}$. For the second, the coefficient in units $Q^2\alpha^8$ is below $1.2532\times10^9+2.184\times10^8+1.3244\times10^8+84864<1.605\times10^9$, and $Q\le4$.

Combining (8) with the proposed complex Taylor enclosure gives the candidate actual row

$$
|\mathcal R_{\rm actual}-T_7\Phi_5|<8.8\times10^{13}\alpha^8,
$$
$$
|\mathcal R_{{\rm actual},t}-(T_7\Phi_5)_t|<2.12\times10^{12}Q\alpha^8.
\tag{9}
$$

Divide by $r^2$ for slow physical acceleration. The accumulated direct remainder in the exact $e/h$ identity is then controlled by equation (1) of the seventh-order method with $m=7$. It still excludes release error, original nonmirror forcing, homogeneous comparison growth and phase conversion. Those are the next deciding obligations; (9) alone is not a fate certificate or a justification to evolve the comparison as a replacement physical law.

Falsifiers are a missing source generation in (1), an invalid complex extension or derivative bound, failure of transverse retention, an omitted shifted-root term, or failure of either the independent coefficient identification or complex comparison enclosure. No additional computational target was launched for this analytical note. The [main A report](overnight2-a-followup-and-research-2026-10-07.md) owns its assessment and integration.
