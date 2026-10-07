# Independent assessment of the fifth-order mirror remainder

**Derived and assessed, with one intermediate constant corrected.** The [evaluated first-order comparison](overnight2-a-evaluated-source-comparison.md), [complex cubic-comparison enclosure](overnight2-a-cubic-comparison-analytic-remainder.md), and [actual-to-cubic-comparison bound](overnight2-a-cubic-to-fifth-source-bound.md) jointly establish a fifth-order actual mirror response with a sixth-order remainder on the explicitly later generated domain. The printed bound $|\partial_{w_r}G_t|<1.126Q$ is too tight on its declared tube; replace it by $1.15Q$ and its scaled contribution by $1.2\alpha^2Q^2$. This leaves all stated final bounds intact. The frozen subject files are preserved.

This is an after-disclosure mathematical assessment using the Hale lens and Moore-style explicit inequalities. The [fifth-order coefficients](overnight2-a-canonical-fifth-order-row.md) agree term by term with the separately frozen [blind reference](overnight2-a-reference-canonical-fifth-order.md), including the clock and transmitter polynomials. That reference was completed before this assessment or disclosure of the subject coefficients. No new numerical instrument or target is used here. The original canonical law, source coefficient, complete mirror history, release seam and $c_f=1$ remain fixed; this does not assign mirror symmetry to the nominal/spatial family.

## Accepted domain and source coverage

Use the admitted slow mirror class, $\alpha=\epsilon/h$, $P=hp$, $Q=hq=h^2/r$, $|P|\le3$, $0<Q\le4$, $P^2+Q^2\le16$, and actual $\alpha<0.000506$. The conservative algebraic ceiling is $\alpha\le0.001$. For the fifth-order actual statement require

$$
\sigma^4(s)\ge s_*=10\epsilon.
\tag{1}
$$

The common rescaled comparison window is $[-\ell,0]$, $\ell=2.1\alpha$, corresponding to $[s-2.1\epsilon r,s]$. To reconstruct its coverage, the complete-history speed bound gives $\beta\le4.05\epsilon\le0.002025$. Each causal delay has lower bound $2\epsilon r_{\rm receiver}/(1+\beta)$. The previous source radius exceeds $0.99r$. Therefore the sum of the last two delays exceeds

$$
\frac{2(1+0.99)}{1.002025}\epsilon r>3.97\epsilon r>3.9\epsilon r.
$$

The comparison window starts later than $\sigma^2(s)$. Source playback is strictly increasing because both ordinary root factors are positive. Thus every receiver $a$ in the window satisfies $\sigma^2(a)\ge\sigma^4(s)\ge s_*$. This is exactly the full-window condition needed to apply the [accepted cubic error](overnight2-a-canonical-cubic-assessment.md) at every $a$. The first-order comparison needs only $\sigma^2(s)\ge s_*$ because its inherited row needs no additional two-source condition at $a$.

Condition (1) is sufficient for this proof. The subject's phrase that every source level is “necessary” should be read as coverage used by this argument, not a proof that (1) is a minimal necessary condition. No claim is made across the earlier supplied-history seam, and no source is replaced by an auxiliary path.

The enlarged-window radius and angular estimates also close independently. Starting with radius ratio at least $0.99$ and angular ratio at least $0.999$ gives displacement less than $2.1\alpha(4/0.999)<0.008409$. The logarithmic angular-magnitude change is below $2\alpha Q\ell/0.99^2<17.15\alpha^2$, improving the angular ratio to $1-20\alpha^2$. The angle is at most $Q\ell/0.99^2<2.15\alpha Q$. All improvements are strict and close the backward bootstrap. Actual acceleration integration places the velocity inside $|w-(P,Q)|<0.02$ as well.

## Real comparison estimates reconstructed

For the real cubic field $F_3$, use the convex tube $|y-(1,0)|\le0.01$, $|w-(P,Q)|\le0.02$. The first-order field has $L_y<9$, $L_w<4.1\alpha$. For the quadratic term, direct differentiation gives additions bounded by

$$
\frac{8.5Q|w|^2\alpha^2}{\rho^3}<567\alpha^2,
\qquad
\frac{3Q|w|\alpha^2}{\rho^2}<50\alpha^2.
$$

For the cubic term, the velocity matrix is $9nn^{\mathsf T}-5I$, with eigenvalues four and minus five. Its derivative bounds add at most $737\alpha^3$ and $28\alpha^3$. Hence $L_y<10$, $L_w<5\alpha$, and $|F_3|<4.2$. Backward integration gives velocity change below $0.00882$ and position change below $0.00842$, proving comparison retention. The common integral denominator has defect at most $32.55\alpha^2<0.000033$.

The accepted cubic errors scale by $rh^2$ into $y''=F_3+e$. Isotropically the coefficient is at most

$$
(31000+800Q_a)\,0.99^{-2}(1-20\alpha^2)^{-4}<35000.
$$

Thus $|e|<35000Q\alpha^4$. Rotation of the radial residual through at most $2.15\alpha Q$, and $Q_a\le Q/0.99$, give

$$
|e_t|\le Q^2\alpha^4\,0.99^{-2}(1-20\alpha^2)^{-4}
\left(\frac{800}{0.99}+66650\alpha\right)<900Q^2\alpha^4.
\tag{2}
$$

The bracket is below 893 at the auxiliary endpoint. These are bounds on the discrepancy itself; no derivative is taken. The twice-integrated comparison therefore gives $\|y-z\|_\infty<78000Q\alpha^6$ and $\|y'-z'\|_\infty<74000Q\alpha^5$.

The analogous first-order subject constants also survive reconstruction. Its instantaneous radial and transverse coefficients are bounded by $9.401$ and $(3+30\alpha_a)Q_a$. After rescaling and rotation they give $|e|<23Q\alpha^2$ and $|e_t|<3.2Q^2\alpha^2$. Its comparison errors $51Q\alpha^4$, $48.4Q\alpha^3$, and transverse errors $7.3Q^2\alpha^4$, $7Q^2\alpha^3$ follow with its stated integral denominators. They compare evaluated source responses, not their Taylor truncations.

## Corrected component derivative and retained angular factor

The actual and comparison paths lie in $|y_t|\le3\alpha Q$, $|w_t|\le1.1Q$. The first-order transverse field is below $4.3\alpha Q^2$; the quadratic and cubic additions are below $4.6\alpha^2Q^2$ and $7.8\alpha^3Q^2$. Thus $|(F_3)_t|<4.4\alpha Q^2$ closes the same component tube.

Write the quadratic numerator as

$$
G_t=Bn_t+pw_t,\qquad B=(|w|^2-3p^2)/2.
$$

Then

$$
\partial_{w_r}G_t=n_rw_t-3pn_rn_t.
\tag{3}
$$

A concrete tube check shows why the subject's intermediate $1.126Q$ is not a uniform bound. Take $\alpha=1/1000$, $Q=1/5$, $P=289/100$, $y=(1,-3/5000)$, and $w=(289/100,11/50)$. This satisfies the declared phase-space/component tube and the receiving eccentricity restriction $P^2+(Q-1)^2=8.9921<9$. With $\rho=\sqrt{1.00000036}$, (3), divided by $Q$, equals

$$
\frac{1.1}{\rho}+\frac{0.026008812}{\rho^3}>1.1260085>1.126.
$$

This is a test of a claimed uniform tube inequality, not an assertion that an actual history passes through this auxiliary point. No physical counterexample is inferred.

The direct safe bound is

$$
|\partial_{w_r}G_t|
\le |w_t|+3|p||n_t|
\le[1.1+3(4.02)(3.031)\alpha]Q<1.15Q.
$$

After multiplying by $Q\alpha^2/\rho^2$, its contribution is below $1.2\alpha^2Q^2$. The radial-position numerator bound remains valid: $|B|\le|w|^2$, $|v_r|<3.374\alpha Q^2$ and $|n_t|<3.031\alpha Q$ yield $|\partial_{y_r}G_t|<137\alpha Q$ and $|G_t|<4.5Q$. Including the denominator derivative gives a contribution below $9.5\alpha^2Q^2$. The cubic mixed terms satisfy the subject's looser allowances. The corrected totals therefore retain

$$
|\partial_{y_r}(F_3)_t|<20\alpha Q^2,
\quad |\partial_{w_r}(F_3)_t|<40\alpha^2Q^2,
\quad |\partial_{y_t}(F_3)_t|<2Q,
\quad |\partial_{w_t}(F_3)_t|<2\alpha Q.
\tag{4}
$$

For the diagonal terms, keeping $Q$ explicit in the full derivative bounds gives additional position terms below $142Q\alpha^2+185Q\alpha^3$, and velocity terms below $12.31Q\alpha^2+6.88Q\alpha^3$. These fit comfortably above the first-order $1.1Q$ and $1.1\alpha Q$ bounds, without dividing by a small $Q$.

The radial cross forcing from (4) is $4520000Q^3\alpha^7<0.019Q^2\alpha^4$. The transverse denominator defect is at most $8.61Q\alpha^2<0.000035$. With forcing allowance $910Q^2\alpha^4$, the resulting position and velocity errors are below $2010Q^2\alpha^6$ and $1920Q^2\alpha^5$. These justify the subject's component comparison after the correction.

## Both source clocks and evaluated response

The actual and comparison root gaps are negative at zero, positive at $\ell$, and have slope at least $m=0.99598$. Every joining chord stays within distance $0.01$ of $(2,0)$, giving chord floor 1.99. The clock difference is below $79000Q\alpha^7$. Its displaced-time contributions use $|z'_t|<1.1Q$, $|z''_t|<4.4\alpha Q^2$; therefore the sampled bounds are

$$
|\Delta S|<79000Q\alpha^6,\quad
|\Delta(\alpha w)|<75000Q\alpha^6,
\quad |\Delta S_t|<2100Q^2\alpha^6,
\quad |\Delta(\alpha w_t)|<1921Q^2\alpha^6.
$$

The transverse chord coefficient before rounding is at most $2010+86.9=2096.9$. The transverse sampled-velocity correction adds less than $0.002$ to 1920. Both clock effects are retained.

Direct differentiation of $-4S/(|S|^3D)$ gives isotropic derivatives below 1.04 and transverse component derivatives below $0.52$, $2.4\alpha Q$, $1.54\alpha Q$, $2.4\alpha^2Q^2$. The leading radial cross coefficient, for example, is at most $36/(1.99^4m)<2.31$ before the small transmitter derivative. The radial-velocity coefficient is at most $12/(1.99^3m^2)<1.54$. These checks independently support the stated response constants.

Consequently

$$
|\mathcal R_{\rm actual}-\Phi_3|<650000\alpha^6,
\qquad |(\mathcal R_{\rm actual}-\Phi_3)_t|<5600Q\alpha^6.
\tag{5}
$$

The isotropic coefficient is bounded by $1.04(79000+75000)Q\le640640$. The transverse coefficient in units $Q^2\alpha^6$ is below $1092+189.6+115.5+0.074=1397.174<1400$, then $Q^2\le4Q$ gives 5600. The first-order evaluated response bounds $110Q\alpha^4$ and $4.1Q^2\alpha^4$ follow from the same derivatives and their lower-order path errors.

## The larger complex disk independently reconstructed

The subject's radius $0.02$ is a new, larger construction than the independent reference's radius $0.005$. Its larger tube and weaker uniform constants are independently checked here; the smaller reference disk by itself would not certify it.

For complex $\alpha$, $|\alpha|\le0.02$, and $|\xi|\le2.5$, use the tube $|y-n_0|\le0.25$, $|w|\le5.5$, with the bilinear square root $\rho=\sqrt{y\cdot y}$ near one. Then $|y\cdot y-1|\le0.5625$ and $|\rho|\ge\sqrt{0.4375}$. Bounding the four field terms separately gives $17.32$, $8.283$, $3.209$, $0.031$, with sum $28.843<29$. The first bound uses $Q|y||\rho|^{-3}$, rather than unnecessarily multiplying separate bounds for $n$ and $\rho^{-2}$. The integrated velocity and position changes are at most 1.45 and 0.23625, strictly inside the tube.

These bounds support holomorphic continuation of the local ODE solution across the entire disk. More explicitly, start with its local power-series disk. At a putative first smaller circle of failure, bounded field and strict tube margin give a limit along each radial segment and a uniform local analytic continuation about every boundary point. Local uniqueness makes the neighboring continuations agree, contradicting that first radius. This uses finite-dimensional analytic ODE existence and uniqueness; no analytic history-flow assertion enters.

For $|L-1|\le0.25$, $\xi=-2L$ is covered. The clock map sends that disk into $|L-1|<0.144$, and its derivative is bounded by

$$
\frac{2.25(0.02)(5.5)}{2\sqrt{0.734375}}<0.145.
$$

Uniform contraction gives a unique holomorphic clock on the parameter disk. The same branch has $|\sqrt{S\cdot S}|>1.713$, $|D|>0.855$, and $|\Phi_3|<2.1$. The analytic denominator retains both sampled velocity and displaced source time.

For the transverse field, independent termwise totals are below $13.856+5.767+2.383+0.021<22.1$ for $|y_t|$, and $0.1832+0.03811+0.00074<0.223$ for $|w_t|$. Thus $W_t\le Q+0.05(22.1Y_t+0.223W_t)$ and $Y_t\le0.05W_t$ give $W_t\le Q/0.9336<1.072Q$, $Y_t<0.0536Q$. The exact response then gives $|\Phi_{3,t}|<0.05Q$. This preserves the factor before any division.

Cauchy's coefficient bound and the geometric tail establish

$$
|\Phi_3-T_5\Phi_3|<3.5\times10^{10}\alpha^6,
\qquad
|\Phi_{3,t}-(T_5\Phi_3)_t|<8.3\times10^8Q\alpha^6,
\tag{6}
$$

for $0\le\alpha\le0.001$. In particular $0.02^6=6.4\times10^{-11}$ and the geometric denominator is at least 0.95; the respective coefficients are below $3.454\times10^{10}$ and $8.224\times10^8$. The larger disk improves the bound despite using a broader tube. The frozen independent coefficient derivation identifies the printed polynomial with this $T_5\Phi_3$; the Cauchy argument alone would not identify an unchecked list.

## Accepted actual fifth-order statement and limits

Combining (5) and (6), the exact actual mirror response on (1) obeys the fifth-order polynomial of the subject/reference with

$$
|r^2A-T_5\Phi_3|<3.51\times10^{10}\alpha^6,
\qquad
|r^2A_t-(T_5\Phi_3)_t|<8.31\times10^8Q\alpha^6.
\tag{7}
$$

Equivalently the physical slow acceleration errors are bounded by $3.51\times10^{10}\epsilon^6/(r^2h^6)$ isotropically and $8.31\times10^8\epsilon^6q/(r^2h^5)$ transversely. The factor $Q=hq$ changes the transverse power of $h$; replacing it by $q$ without this conversion would be wrong. The bound is uniform on the declared generated region, not through the release seam. These conservative constants do not by themselves establish a useful long-time phase estimate.

The original nominal/spatial family still requires its additional centered-history forcing, two original source clocks and normal components bounded and integrated without inventing a transverse factor. No original entry sign, positive terminal speed, all-future fate, new physical preparation or convergent infinite-order expansion follows. The local mirror theorem is the supported conclusion.

Falsifiers are a source map violating monotone playback, a comparison window leaving the declared generated domain, a field or component derivative exceeding the corrected tube bounds, a dropped clock displacement, a complex branch/denominator entering its excluded set, or a mismatch between the independently computed polynomial and the Taylor coefficients. The explicit point following (3) falsifies only the over-tight intermediate bound; the corrected final theorem retains substantial margin.

## Preservation and validation

The only authored file is this new assessment. All subjects and prior references remain frozen. Native `shasum -a 256` measured the identities below at first inspection and closeout. A first attempted hash of the nonexistent basename `overnight2-a-canonical-fifth-order.md` returned a missing-file diagnostic; `rg --files` identified the actual `-row.md` owner, which was then read and hashed. No conclusion or edit was based on the missing path.

| Read-only source | SHA-256 |
| --- | --- |
| Evaluated first-order comparison | `c72d8d7df4808771aeefead2e903e01d09fb76dda80e79967e9240a98d12aa0e` |
| Complex cubic-comparison enclosure | `c324161e7419bc3718d1aec16eb2a2db1b806cef3c72625e536c2d023868f813` |
| Actual-to-cubic-comparison bound | `0364d0ab9f260ef135c14c5c2aa78c47256492d8cd057afe058ccc72dbbbde01` |
| Independent fifth-order reference | `4739db517b376873759f0593dac17b3d822b80bebe0b1dae4e4dbe1470ee3ebb` |
| Fifth-order coefficient subject | `c0892c4c775fb00dec11c60ffd6943a4f49d81ce02bb0056a97c65e1c0e6dc13` |
| Accepted cubic assessment | `ef18c18f49cb82264efa03ed51c2c1fdefad508f36d90255acb29f9b474d4013` |
| Wider-regime assessment | `94f279458db71131c0f83879745d380313e1b6627e84a62523675706d4716640` |

No CPU target, Python invocation, new checking instrument, generator or Git mutation was used. The existing known-first document checker validates TeX, whitespace and local links, not the theorem. The [main A report](overnight2-a-followup-and-research-2026-10-07.md) owns integration and the correction record; no frozen side is rewritten.

**Freeze receipt, 2026-10-07 06:00 UTC.** `node reference/priorities/master-equation-closure/binary-research/evidence/authorized-cases-followup-document-check.mjs reference/priorities/master-equation-closure/binary-research/analysis/overnight2-a-reference-fifth-order-remainder.md` passed its known controls first, then 174 mathematical spans and seven local links, with no whitespace diagnostics. The seven-source `shasum -a 256` closeout returned exactly the identities above. This assessment is frozen with the corrected intermediate constant and unchanged final theorem; no process remains active from this review.
