# Evaluated component bounds for a short canonical source comparison

**Derived candidate, pending independent assessment.** This note evaluates the [conditional local comparison](overnight2-a-local-ode-source-comparison.md) on the accepted later generated mirror domain. It preserves the transverse factor and does not differentiate the actual acceleration discrepancy. Its auxiliary ordinary differential equation is used only to evaluate one source functional; it supplies neither a physical past nor a forward production evolution.

The original canonical law, source coupling, complete supplied past and $c_f=1$ remain fixed. The nominal/spatial pair is not silently assigned mirror symmetry. Its separate centered-history forcing would require an additional bound. The [independently assessed cubic row](overnight2-a-canonical-cubic-assessment.md) offers a complementary direct-derivative proof; the present candidate is useful mainly as a possible route to higher finite orders.

## Actual and comparison windows

Fix a receiving state in the accepted slow mirror class. Write $\alpha=\epsilon/h$, $P=hp$, $Q=hq=h^2/r$, with $|P|\le3$, $0<Q\le4$, $|hY'|\le4$ and $\alpha<.000506$. Bounds below use the weaker algebraic ceiling $.001$. Let $\ell=2.1\alpha$ and set

$$
y(\tau)=Y(s+rh\tau)/r,
\quad y(0)=(1,0),\quad y'(0)=(P,Q),
\qquad -\ell\le\tau\le0.
$$

Require $\sigma^2(s)\ge10\epsilon$, so this enlarged source window is generated. Indeed the two positive delays together exceed $3.9\epsilon r$, by the accepted speed and radius ratios, whereas its length in slow time is $2.1\epsilon r$. Every point of the enlarged window is therefore later than the second nested source and lies beyond the accepted generated entry.

On this window the old slow-region bounds give

$$
|r(a)/r-1|<.01,\qquad
1-20\alpha^2<h(a)/h\le1,
\qquad |\theta(a)-\theta(s)|\le2.15\alpha Q.
\tag{1}
$$

For completeness, these slightly enlarged-window constants close directly: provisionally take radius ratio at least $.99$ and angular ratio at least $.999$. Then $h|Y'(a)|\le4/.999$, whose displacement over $2.1\alpha$ is below $.008409<.01$. Integrating $h'/h\le2\epsilon/r(a)^2$ gives logarithmic angular change below $2\alpha Q\ell/.99^2<17.15\alpha^2$, which improves the angular bound to $1-20\alpha^2$. Integrating the angular rate gives $Q\ell/.99^2<2.15\alpha Q$. These improvements prevent a first loss of the provisional bounds. Complete history and ordinary-root claims remain those of the accepted mirror theorem.

Use the comparison field

$$
F(y,w)=\frac{Q}{|y|^2}
\left[-n_y+\alpha\{w-2(n_y\cdot w)n_y\}\right].
\tag{2}
$$

The comparison $z''=F(z,z')$ has the same terminal position and velocity. On the convex tube $|y-(1,0)|\le.01$, $|w-(P,Q)|\le.02$, both $|w|\le4.02$ and $|y|\ge.99$. The field obeys $|F|<4.1$, position Lipschitz constant $L_y<9$, and velocity Lipschitz constant $L_w<.0041$. The position derivative bound follows from $2Q/.99^3+6\alpha Q(4.02)/.99^3<9$. Backward integration gives velocity change below $.00861$ and position change below $.00841$, so the comparison remains strictly inside the tube for the entire window. The same actual-path estimates place it inside that tube. Thus

$$
\vartheta=L_y\ell^2/2+L_w\ell<3\times10^{-5}.
$$

The accepted second-order row gives the actual discrepancy $y''-F=e$. In the source point's own polar frame its radial coefficient is bounded by $Q_a^2/2+1400\alpha_a\le9.401$ and its transverse coefficient by $(3+30\alpha_a)Q_a$, in units $\alpha_a^2/r(a)^2$. Scaling to the current window and using (1) yields

$$
|e|\le23Q\alpha^2.
\tag{3}
$$

For its fixed reception transverse component, use $Q_a\le Q/.99$ and the rotation angle in (1). The source transverse discrepancy contributes below $3.064\alpha^2Q$, and the radial discrepancy rotated through $2.15\alpha Q$ contributes below $.0203\alpha^2Q$, before multiplication by $Q/.99^2$. Consequently

$$
|e_t|\le3.2Q^2\alpha^2.
\tag{4}
$$

No derivative of (3) or (4) is assumed. The isotropic comparison lemma now implies

$$
\sup|y-z|<51Q\alpha^4,
\qquad \sup|y'-z'|<48.4Q\alpha^3.
\tag{5}
$$

## A component comparison before division by angular velocity

Both paths satisfy $|y_t|,|z_t|\le3\alpha Q$ and $|y'_t|,|z'_t|\le1.1Q$. For the actual path these follow from (1), $|hp_a|<3.001$ and $hq_a\le Q/.99$. For the comparison, the transverse field within the proposed component tube is below $4.3\alpha Q^2$. Its integrated velocity change is below $9.03\alpha^2Q^2<.1Q$, and its position stays below $2.10004\alpha Q<3\alpha Q$. This closes the component tube, including arbitrarily small positive $Q$.

The fixed transverse component of (2) is

$$
F_t=Q\left[-\frac{y_t}{|y|^3}
+\alpha\left(\frac{w_t}{|y|^2}
-\frac{2(y\cdot w)y_t}{|y|^4}\right)\right].
$$

Direct differentiation on every joining segment gives the bounds

$$
|\partial_{y_r}F_t|\le13\alpha Q^2,
\quad |\partial_{w_r}F_t|\le7\alpha^2Q^2,
\quad |\partial_{y_t}F_t|\le1.1Q,
\quad |\partial_{w_t}F_t|\le1.1\alpha Q.
\tag{6}
$$

For example the radial-position contributions are bounded by $9.38\alpha Q^2$, $2.27\alpha Q^2$ and $.126\alpha Q^2$; their sum is below thirteen. The radial-velocity derivative is $-2\alpha Qy_ry_t/|y|^4$, which is bounded by $7\alpha^2Q^2$. The transverse-position leading term is below $1.032Q$, and all its velocity-dependent terms leave the bound below $1.1Q$. All segments remain in both declared convex tubes.

Equations (4)–(6) yield a scalar transverse comparison. The radial errors act as an extra forcing below

$$
13\alpha Q^2(51Q\alpha^4)
+7\alpha^2Q^2(48.4Q\alpha^3)
<.000005Q^2\alpha^2.
$$

The transverse integral denominator has defect at most $(1.1Q)\ell^2/2+(1.1\alpha Q)\ell<.000019$. Using a forcing bound $3.3Q^2\alpha^2$ therefore gives

$$
\sup|y_t-z_t|<7.3Q^2\alpha^4,
\qquad \sup|y'_t-z'_t|<7Q^2\alpha^3.
\tag{7}
$$

This is a componentwise integral proof. Reflection symmetry alone would not justify attaching a factor to the isotropic error.

## Both displaced clocks and the response

The roots satisfy $d=\alpha|(1,0)+y(-d)|$. The full window covers the unique positive comparison root as well as the actual root: the gap is negative at zero and positive at $\ell$, since every chord has length at most $2.01<2.1$. Its derivative is at least $m=1-.00402=.99598$. Every joining chord stays within $.01$ of $(2,0)$, so its norm is at least $a_*=1.99$.

The local comparison lemma and (5) give clock difference below $52Q\alpha^5$. The sampled radial chord difference is below $52Q\alpha^4$, and the sampled radial physical-velocity difference below $49Q\alpha^4$. Using the transverse speed and acceleration tube in the displaced-time terms of (7) gives

$$
|\Delta S_t|<7.4Q^2\alpha^4,
\qquad |\Delta(\alpha w_t)|<7.1Q^2\alpha^4.
\tag{8}
$$

For the dimensionless response $\mathcal R=-4S/(|S|^3D)$, $D=1+\widehat S\cdot v$ and $v=\alpha w$, the isotropic derivatives in the conditional lemma are both below $1.04$. Their complete substitution gives

$$
|\mathcal R_y-\mathcal R_z|<110Q\alpha^4\le440\alpha^4.
\tag{9}
$$

For the transverse response, direct differentiation on the joining tube gives

$$
|\partial_{S_t}\mathcal R_t|<.52,
\quad |\partial_{S_r}\mathcal R_t|<2.4\alpha Q,
\quad |\partial_{v_r}\mathcal R_t|<1.54\alpha Q,
\quad |\partial_{v_t}\mathcal R_t|<2.4\alpha^2Q^2.
$$

Combining these with (8) and the radial differences gives a coefficient below $3.848+.125+.076+.001<4.1$ in units $Q^2\alpha^4$. Therefore

$$
|\mathcal R_{y,t}-\mathcal R_{z,t}|<4.1Q^2\alpha^4
\le20Q\alpha^4.
\tag{10}
$$

Returning to the unscaled acceleration divides (9) and (10) by $r^2$. The transverse allowance is therefore at most $20\epsilon^4q/(r^2h^3)$. These are differences between two evaluated source responses, not bounds on the whole Taylor remainder of the comparison response. The latter remains a separate analytic calculation.

## Next use and limits

The evaluated comparison offers a path to higher finite orders: use an already proved local acceleration polynomial, bound its actual discrepancy, compare over one covered source window, and retain a separately bounded Taylor expansion of its analytic comparison response. Each iteration must retain its own component and root estimates. An iteration has not yet been completed beyond (2)–(10), and no arbitrary-order physical theorem is claimed.

The direct cubic remainder is already available independently. A potential fifth-order source response would use that cubic local field as the auxiliary equation and gain two orders from its fourth-order discrepancy. That requires new evaluated constants and a Taylor enclosure; it is not licensed simply by the power counting. For the original nominal/spatial case the additional bounded forcing remains explicit and need not carry $q$. No new production solver, new past or assumed regularity is introduced.

Falsifiers include failure of the enlarged actual window to be generated, a first exit from a comparison tube, an omitted displaced-clock component, an incorrect derivative in (6), or division of a residual by $q$ before its factor is proved. This note is frozen as a candidate before independent assessment. No new instrument or target computation was used. Its receiving owner is the [main A report](overnight2-a-followup-and-research-2026-10-07.md).
