# Mixed derivatives and projected remainders in the nonmirror proof

**Derived, conditional on the domains and explicitly stated lower-order row bounds below.** This independently reconstructs local obligations from serial task 4: the four mixed component derivative allowances for the cubic and fifth-order comparison fields, the projected `1600` and `1900` budgets, the seed's scalar polynomial residuals and the ideal `800 epsilon^2` initialization. Actual source-envelope admission and the complete nonmirror dispersal chain also use the separately reviewed entry, clock, response and continuation arguments. The equation, supplied histories and numerical $c_f=1$ remain unchanged. No trajectory, standard-physics law or new participant enters.

The fixed-coordinate comparison fields are those of the [cubic method](../binary-research/analysis/overnight2-a-canonical-fifth-order-method.md) and [fifth-order method](../binary-research/analysis/overnight2-a-seventh-order-method.md). The target allowances are in the [fifth-order assessment](../binary-research/analysis/overnight2-a-reference-fifth-order-remainder.md) and [fifth-to-seventh transport](../binary-research/analysis/overnight2-a-fifth-to-seventh-source-bound.md). The projected argument uses the [spatial seed assessment](../binary-research/analysis/overnight2-a-reference-spatial-seed.md), preserving its inherited entry and history premises. All calculations here are hand derivations with conservative inequalities, not instrument output.

## Fixed-coordinate fields and analytical controls

Hold the receiving parameters $Q$ and $\alpha$ fixed when taking coordinate derivatives. Put $\rho=|y|$, $n=y/\rho$, $p=n\cdot w$, $v=w-pn$ and $B=(|w|^2-3p^2)/2$. In fixed reception axes the transverse cubic field is

$$
(F_3)_t=Q\left[-\frac{n_t}{\rho^2}
+\frac{\alpha}{\rho^2}(w_t-2pn_t)
+\frac{\alpha^2}{\rho^2}(Bn_t+pw_t)\right]
+\frac{Q^2\alpha^3}{3\rho^3}(9pn_t-5w_t).
$$

Before applying tube estimates, the $\alpha=0$ control recovers the central field $-Qy/|y|^3$. At $y=(1,0)$ its transverse derivatives are $\partial_{y_r}=0$, $\partial_{y_t}=-Q$ and both velocity derivatives zero. At the same point the first-order transverse field is $Q\alpha w_t$, with $\partial_{w_t}=Q\alpha$ and $\partial_{y_r}=-2Q\alpha w_t$. The formulas below recover these independently known values. At $Q=0$ every field term vanishes before dividing by a transverse quantity.

For $a=r,t$, write $v_a=w_a-pn_a$ and $\delta_{at}=1$ only when $a=t$. Direct differentiation gives

$$
\rho\,\partial_{y_a}n_t=\delta_{at}-n_an_t,
\qquad \rho\,\partial_{y_a}p=v_a,
\qquad \partial_{w_a}p=n_a.
$$

The four transverse field terms therefore have derivatives

$$
\begin{aligned}
\partial_{y_a}(F_0)_t&=-\frac Q{\rho^3}(\delta_{at}-3n_an_t),\\
\partial_{y_a}(F_1)_t&=\frac{Q\alpha}{\rho^3}[-2n_aw_t-2v_an_t-2p\delta_{at}+6pn_an_t],\\
\partial_{w_a}(F_1)_t&=\frac{Q\alpha}{\rho^2}(\delta_{at}-2n_an_t),\\
\partial_{y_a}(F_2)_t&=\frac{Q\alpha^2}{\rho^3}[-3pv_an_t+B(\delta_{at}-3n_an_t)+v_aw_t-2n_apw_t],\\
\partial_{w_a}(F_2)_t&=\frac{Q\alpha^2}{\rho^2}[(w_a-3pn_a)n_t+n_aw_t+p\delta_{at}],\\
\partial_{y_a}(F_{\rm cubic})_t&=\frac{Q^2\alpha^3}{3\rho^4}[9v_an_t+9p\delta_{at}-36pn_an_t+15n_aw_t],\\
\partial_{w_a}(F_{\rm cubic})_t&=\frac{Q^2\alpha^3}{3\rho^3}(9n_an_t-5\delta_{at}).
\end{aligned}
$$

The complete quadratic velocity derivative includes the $w_an_t$ term omitted in the frozen assessment. Its radial case is bounded in the [seventh continuation review](serial-root-birth-nonmirror-codex-seventh-continuation-review-2026-10-10.md).

## Real tube bounds

Use $|y-(1,0)|\le.01$, $|w-(P,Q)|\le.02$, $P^2+Q^2\le16$, $|P|\le3$, $0\le Q\le4$ and $0\le\alpha\le.001$, together with the admitted component bounds $|y_t|\le3\alpha Q$ and $|w_t|\le1.1Q$. Then

$$
\rho\ge.99,\quad |w|,|p|,|v|\le4.02,\quad |w_r|\le3.02,
\quad |n_t|\le3.031\alpha Q,\quad |B|\le16.1604.
$$

The sharper radial projection identity $v_r=n_t^2w_r-n_rn_tw_t$ gives

$$
|v_r|\le3.031(1.1+3.02(3.031)(.001))\alpha Q^2<3.374\alpha Q^2.
$$

Termwise substitution into the displayed derivatives gives the following conservative sums. Each entry bounds the absolute derivative; no cancellation between different field terms is used.

| Derivative | Central term | First-order term | Quadratic term | Cubic term | Sum |
| --- | --- | --- | --- | --- | --- |
| $\partial_{y_r}(F_3)_t$, units $\alpha Q^2$ | $9.372$ | $2.344$ | $.0095$ | $.000024$ | $<12$ |
| $\partial_{w_r}(F_3)_t$, units $\alpha^2Q^2$ | $0$ | $6.185$ | $1.142$ | $.000038$ | $<7.33$ |
| $\partial_{y_t}(F_3)_t$, units $Q$ | $1.032$ | $.00851$ | $.000035$ | $.000000053$ | $<1.05$ |
| $\partial_{w_t}(F_3)_t$, units $\alpha Q$ | $0$ | $1.021$ | $.00421$ | $.00000688$ | $<1.026$ |

For example, the radial-position quadratic coefficient in units $\alpha^2Q^2$ is at most

$$
\frac{2(4.02)(1.1)+3(16.1604)(3.031)\alpha
+(3.374)(1.1)\alpha Q^2+3(4.02)(3.374)(3.031)\alpha^2Q^2}{.99^3}<9.5.
$$

Its contribution to the first table row is thus below $.0095$. The complete radial-velocity quadratic numerator is below $1.11880Q$, so its contribution is below $1.11880/.99^2<1.142$. The diagonal bounds retain the explicit $Q$ rather than dividing by it. The source's cubic allowances $20\alpha Q^2$, $40\alpha^2Q^2$, $2Q$ and $2\alpha Q$ follow with margin.

## Fifth-order additions

On the analytical complex extension $\|y-(1,0)\|\le.05$, $\|w\|\le4.1$, the bilinear square has $|y\cdot y|\ge.8975$. Hence $|\rho|>.947$, $\|n\|<1.109$, $|p|<4.548$, $\|v\|<9.145$ and $|v\cdot v|<83.64$. Absolute substitution into the explicit four coefficient polynomials of the fifth-order method gives

$$
|a_4|<2100,\quad |b_4|<320,\quad |a_5|<23000,\quad |b_5|<2300.
$$

For example, the radial fourth-order majorant is the sum $8(4)(4.548)^2/(3(.947))+(83.64)^2/8+8(4)(83.64)/(3(.947))+16/(.947)^2<2100$. The remaining bounds follow by the same absolute substitution, retaining every monomial. Therefore $A_j=(a_j-pb_j)/\rho^3$ and $B_j=b_j/\rho^2$ satisfy

$$
|A_4|<5000,\quad |B_4|<400,\quad |A_5|<50000,\quad |B_5|<3000.
$$

A complex coordinate circle of radius $.01$ about any point of the real tube stays inside this extension: its position displacement is at most $.02$, and its velocity norm at most $4.03$. The square-root branch is holomorphic there because $y\cdot y$ stays in the disk of radius $.1025$ about one. Cauchy's coordinate derivative estimate bounds the derivatives of each $A_j,B_j$ by one hundred times its displayed bound.

Since $(F_j)_t=Q\alpha^j(A_jy_t+B_jw_t)$, the added radial-position and radial-velocity derivatives are each below $45500Q^2\alpha^4+345000Q^2\alpha^5$. The added transverse-position derivative is below $187000Q\alpha^4+1430000Q\alpha^5$, and the transverse-velocity derivative below $182400Q\alpha^4+1383000Q\alpha^5$. These coefficients include the derivatives of the explicit transverse coordinates: for example $5000+500000(3\alpha Q)+40000(1.1Q)\le187000$.

Combined with the real table, these give

$$
|\partial_{y_r}(F_5)_t|<12.001\alpha Q^2<30\alpha Q^2,
\qquad |\partial_{w_r}(F_5)_t|<7.376\alpha^2Q^2<50\alpha^2Q^2,
$$
$$
|\partial_{y_t}(F_5)_t|<1.051Q<3Q,
\qquad |\partial_{w_t}(F_5)_t|<1.027\alpha Q<3\alpha Q.
$$

This checks the complete local component allowances. It retains the admitted real component tube as a premise, rather than proving actual source-window admission from these derivatives.

## Projected `1600` and `1900` budgets

Now use the physical slow relative coordinates of the spatial seed assessment: $Y=rn$, $h=|Y\times Y_s|$, $t_\theta=\ell\times n$, $p=Y_s\cdot n$, $q=h/r$, $P=hp$, $Q=hq$ and $\alpha=\epsilon/h<.000338$. Retain $|e|\le3$, $|P|\le3$ and $Q\le4$, with $e=(Q-1)n-Pt_\theta$. The row bounds assumed in this section are

$$
|Q_n|\le1400\epsilon^3/(r^2h^3),\qquad
\|Q_\perp\|\le30\epsilon^3q/(r^2h^2).
$$

These are the lower-order seed row inequalities; their acceleration-envelope and root-residual proof is not supplied by this section. The exact moving-plane projection gives radial eccentricity remainder at most $60Q\epsilon^3/h^3$ and tangential remainder at most $(1400+30|P|)\epsilon^3/h^3$. Orthogonality yields

$$
|R_e|\le\sqrt{240^2+1490^2}\,\epsilon^3/h^3<1600\epsilon^3/h^3.
$$

The angular remainder is $|R_h|\le30\epsilon^3/h^2$. Thus the `1600` constant follows without discarding a tangential row or combining orthogonal components linearly.

Write $c=e/h$, $D=nn^{\mathsf T}-t_\theta t_\theta^{\mathsf T}$, $B=-\tfrac12(nt_\theta^{\mathsf T}+t_\theta n^{\mathsf T})$ and

$$
b=c+\frac{2\epsilon}{h^2}t_\theta+\frac{5\epsilon^2}{2h^3}n,
\qquad z=(I-\epsilon B/h)b.
$$

All derivatives in this calculation are projected into the current plane. The exact projected identities are $n_\theta=t_\theta$, $(t_\theta)_\theta=-n$ and $B_\theta=D$. They do not set the normal acceleration to zero; normal rotation drops from the derivative of the in-plane norm.

The remainder of $c_\theta$ is bounded by $(1600+30|e|)\epsilon^3/h^4\le1690\epsilon^3/h^4$. Explicit corrector differentiation gives

$$
b_\theta=\frac\epsilon h Db+N+R_b,
\quad N=\frac{\epsilon^2}{h^3}\{-e_t(2+e_n)n-(e_n+e_n^2/2)t_\theta\}.
$$

The linear and quadratic parts of $N$ have norms at most $2|e|$ and $|e|^2$, so $|N|\le5\epsilon^2|e|/h^3$. The remaining corrector terms give

$$
|R_b|\le\{1690+10+4|P|+7.5\alpha|P|+120\alpha+225\alpha^2\}\epsilon^3/h^4
<1713\epsilon^3/h^4.
$$

Using $\|B\|=1/2$, $\|D\|=1$ and $|c|\le|b|+(2+2.5\alpha)\epsilon/h^2$, the product rule for $z$ then gives homogeneous coefficient at most $(6+4\alpha+15\alpha^2)/(1-\alpha/2)<6.003$ in units $\epsilon^2/h^2$ multiplying $|z|$. Its direct remainder coefficient is below $(1+\alpha/2)(1713+10+12.5\alpha)<1724$, inside `1900`.

The direct discrepancy $f$, with $|f|\le\nu/r^2$, is also retained. Its angular contribution is $h_\theta|_f=r^3f_t/h$, and cancellation using $e=(Q-1)n-Pt_\theta$ gives

$$
c_\theta|_f=\frac{r^3}{h^3}(Q+1)f_t n-\frac{r^2}{h}f_n t_\theta.
$$

Consequently $|c_\theta|_f\le5\nu r/h^3$. After both correctors its coefficient is below

$$
(1+\alpha/2)(5+4\alpha+7.5\alpha^2)
+\tfrac\alpha2(3+2\alpha+2.5\alpha^2)<5.004<16.
$$

The assessment's claimed inequality follows with explicit reserve:

$$
|\mathcal D_\theta z|\le\frac{10\epsilon^2}{h^2}|z|
+\frac{1900\epsilon^3}{h^4}+\frac{16\nu r}{h^3}.
$$

## Scalar seed residuals

The [spatial seed assessment](../binary-research/analysis/overnight2-a-reference-spatial-seed.md) uses $\Lambda_0=1-\alpha P+\alpha^2 C$, where $C=P^2-Q+Q^2/2$ and $|C|\le21$. Substitute the radial direction polynomial $1-\alpha^2Q^2/2$ into its root relation. Expansion, before any domain estimate, gives

$$
\begin{aligned}
&\Lambda_0(1-\alpha^2Q^2/2+\alpha P)+\alpha^2\Lambda_0^2Q-1\\
&=\alpha^3P(P^2-3Q+Q^2)
+\alpha^4\{Q(P^2+2C)-CQ^2/2\}
-2\alpha^5PCQ+\alpha^6C^2Q.
\end{aligned}
$$

The coefficients are bounded by $111$, $4(9+42)+21(16)/2=372$, $2(3)(21)(4)=504$ and $21^2(4)=1764$. Thus the original three intermediate constants are supported by direct algebra; a sampled disk maximum is unnecessary. At $\alpha\le.000338$ their higher-degree contribution in units $\alpha^3$ is less than $.126$. At $\alpha=0$ this polynomial vanishes, and at $P=Q=0$ it vanishes identically, providing analytical controls before the tube estimate. Including the source error $170$, direction error $1.01$ and derivative floor $.996$ yields $(170+111+.126+1.01)/.996<300$.

For $D_0=1+\alpha P+\alpha^2D$, $D=2Q-Q^2$, one has $|D|\le8$ on $0\le Q\le4$. The amplitude residual $(1+\alpha P)\Lambda_0^2D_0-1$ has no degree-one or degree-two term. Its degree-three coefficient is $2P(P^2-2Q+Q^2)$, bounded by $198$. Its coefficients at degrees four through seven are respectively

$$
(C-P^2)^2+(2C-P^2)D,\quad
2PC(C-P^2)+P^3D,\quad
C^2D-2P^2CD+P^2C^2,\quad PC^2D.
$$

Since $|C-P^2|=|-Q+Q^2/2|\le4$, absolute monomial bounds $1452$, $720$, $10521$ and $10584$ suffice. Their higher-degree contribution is below $.492$ in units $\alpha^3$ at the actual ceiling. The existing root and denominator substitution allowances and positive denominator floor then imply the amplitude `1300` bound with reserve. This is an independent finite polynomial derivation; it does not replace the vector acceleration integrals that supply the initial $170$, $25$, $330$ and $50$ errors.

## Release-layer initialization and the ideal `800` estimate

The [wider-regime source](../binary-research/analysis/slow-binary-wider-regime.md) admits $\epsilon\le1/2000$, $h_0\ge1999/2000$, $r\in[.99,1.01]$ on the release layer and $|e|\le1.041\epsilon$. Its first-order row remainder is $|Q_0|\le6000\epsilon^2$. The [independent local adjudication](../binary-research/analysis/slow-binary-independent-adjudication-2026-10-03.md) proves the acceleration-dependent `256` remainder using integrated velocity and a Hessian bound. Its transformation to this scaled mirror preparation gives $256(4+16r)\epsilon^2/r^2<6000\epsilon^2$ for the recent-past acceleration bound eight and speed bound two. The acceleration step at release is admitted by the integral estimate; no jerk bound is inserted.

The exact planar identity already derived above gives

$$
e_\theta=\frac{2\epsilon Q}{h}n+R_e^{(0)},\qquad
h_\theta=\epsilon+R_h^{(0)}.
$$

Its radial error is at most $2(1.01)^2(6000)\epsilon^2<12242\epsilon^2$. Its tangential error is at most $6121\epsilon^2+(1.01)^3(6000)(1.041)\epsilon^3/(.9995)^2<6125\epsilon^2$, using $|p|\le|e|/h$. Orthogonality therefore gives $|R_e^{(0)}|<14000\epsilon^2$, while $|R_h^{(0)}|\le(1.01)^3(6000)\epsilon^2/.9995<6200\epsilon^2$.

For $a=e/h+2\epsilon t/h^2$, direct differentiation cancels the constant rotating drive:

$$
a_\theta=\frac{2\epsilon e_n}{h^2}n+\frac{R_e^{(0)}}h
-\frac{e h_\theta}{h^2}-\frac{4\epsilon h_\theta}{h^3}t.
$$

The four absolute coefficients in units $\epsilon^2$ are below $2.09$, $14007.1$, $4.28$ and $16.43$ respectively at the largest admitted $\epsilon$. Their sum is below $14030<15000$. This derives the final release-layer sub-bound without inheriting the peer's unquantified “about fifty” row estimate.

Integration over $\theta_*<12\epsilon$ costs at most $180000\epsilon^3\le90\epsilon^2$. The second corrector costs less than $2.504\epsilon^2$, and the initial matrix multiplication less than $1.530\epsilon^2$, using $|b(\theta_*)|<3.055\epsilon$. Thus $|z(\theta_*)-c_*|<100\epsilon^2$ with $c_*=e_0/h_0+2\epsilon t_0/h_0^2$.

For the ideal future branch, the already derived inequality for $z$ and $h_\theta\ge.99\epsilon$ give integrated coefficients $a_0=10/(.99h_0)$ and $b_0=1900/(2.97h_0^3)$. They obey $a_0<10.107$, $b_0<640.7$. Consequently

$$
100+\frac{3.055a_0+b_0}{1-a_0/2000}
<100+\frac{671.576885}{.9949465}<775<800,
$$

where the penultimate inequality follows from $675(.9949465)=671.5888875>671.576885$. This checks the ideal seed bound with an explicit rational margin. Its use in the spatial theorem retains that theorem's separately admitted perturbation, radius and moving-frame bounds; it does not turn the ideal mirror history into the selected nonmirror history.

## Scope, falsifiers and retention

The mixed-field proof is a full derivation on the stated real and complex tubes. The projected proof is conditional on the `1400` and `30` signed row remainders, vector scope and admitted moving-plane identities. The scalar root and ideal initialization derivations close those local obligations under their displayed hypotheses. They do not independently prove the actual nonmirror history's admission, the original release table or the all-future theorem by themselves. Falsifiers are an error in any displayed derivative/product rule or polynomial, a point inside the declared tube exceeding a majorant, or a lower-order seed/source hypothesis not satisfied by the selected history.

Frozen source bytes and this derivation are retained under a fresh `codex-mixed-projected-check/` owner. The same bound Claude session was observed Running during this work; no message, interruption or successor assignment was sent. Presentation checks establish local links, delimiters and whitespace only. No numerical instrument, Python run, generated-source write or Git mutation was used for this derivation.
