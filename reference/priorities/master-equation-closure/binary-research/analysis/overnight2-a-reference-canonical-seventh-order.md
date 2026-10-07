# Independent seventh-order canonical source reference

**Blind formal reference, frozen for separate assessment.** This calculation reads the [seventh-order method](overnight2-a-seventh-order-method.md) and frozen accepted fifth-order sources, but not the coordinator's seventh-order instrument, target receipt or result. It changes no law, history, source treatment or physical preparation. The goal is a separately derived degree-six/seven source-response polynomial, not a trajectory, entry sign or fate claim. The mathematical lens is Hale with exact Moore-style controls.

The [new reference instrument](../evidence/overnight2-a-reference-canonical-seventh-order.py) uses sparse Cartesian Lie differentiation, followed by implicit-clock polynomial elimination. Its clock/response series implementation is adapted from the frozen [fifth-order reference instrument](../evidence/overnight2-a-reference-canonical-fifth-order.py), whose identity is recorded below; the older file is not edited. The new derivative engine has its own known controls before target use. It does not load the coordinator's implementation.

## Pointwise scaling checked before coefficient discovery

A receiving-frame polynomial must first be converted to a local physical field. Write physical slow radius and components as $r_a,p_a,q_a$, and retain the original $\epsilon$. Eliminating $h$ from the accepted fourth- and fifth-order response monomials gives the following radial and transverse acceleration coefficients after factoring out $\epsilon^j/r_a^2$:

$$
\begin{aligned}
a_4^{\rm phys}&=\frac{8p_a^2}{3r_a}+\frac{q_a^4}{8}-\frac{8q_a^2}{3r_a}+\frac1{r_a^2},\\
b_4^{\rm phys}&=\frac{p_aq_a^2}{2}-\frac{19p_a}{3r_a},\\
a_5^{\rm phys}&=\frac{44p_a^3}{15r_a}-\frac{196p_aq_a^2}{15r_a}+\frac{19p_a}{5r_a^2},\\
b_5^{\rm phys}&=-\frac{142p_a^2}{15r_a}+\frac{121q_a^2}{30r_a}+\frac3{5r_a^2}.
\end{aligned}
\tag{1}
$$

The vector coefficient is $a_j^{\rm phys}n_a+b_j^{\rm phys}v_a$, where $v_a$ is the transverse velocity, not the unit tangent. This distinction supplies the extra $q_a$ in the tangential row. For example $\alpha^4Q^4/8=\epsilon^4q_a^4/8$ after returning to the local unscaled variables, while $\alpha^4QP^2=\epsilon^4p_a^2/r_a$. The receiving $h$ cancels in every monomial.

Now fix reception scales $r,h$ and put $r_a=r\rho$, $p_a=p/h$, $v_a=v/h$, $Q=h^2/r$, $\alpha=\epsilon/h$. Multiplication of physical acceleration by $rh^2$ converts (1) into precisely

$$
F_5=F_3+\frac{Q\alpha^4}{\rho^2}(a_4n+b_4v)
+\frac{Q\alpha^5}{\rho^2}(a_5n+b_5v),
$$

with the method's four displayed coefficients. In particular each $1/r_a$ becomes $Q/(h^2\rho)$ and each $1/r_a^2$ becomes $Q^2/(h^4\rho^2)$. This verifies the radial powers and the extra coupling factors. The field is rotationally covariant because it is assembled from scalar contractions, $n$, and $v$. It is an auxiliary analytic field for one source response, not a law assigned to the actual path.

## Separate Cartesian Lie construction

Represent exact expressions as rational-coefficient monomials in $(x,y,u,v,Q,\rho)$, with $\rho^2=x^2+y^2$. The new engine implements

$$
\partial_x\rho^k=kx\rho^{k-2},\qquad
\partial_y\rho^k=ky\rho^{k-2}
$$

in addition to the ordinary monomial derivative. Products are expanded in a sparse rational dictionary. The relation $\rho^2=x^2+y^2$ is respected by these derivatives; it need not be reduced at every intermediate step. At reception $x=1$, $y=0$, $u=P$, $v=Q$, $\rho=1$, the expressions become exact polynomials in $P,Q$.

Let $A_j$ be the coefficient of $\alpha^j$ in $F_5$, and define $\mathcal L_0=w\cdot\partial_y+A_0\cdot\partial_w$, $\mathcal L_j=A_j\cdot\partial_w$ for $j>0$. The coefficient recursion for successive time derivatives is

$$
V^{(k+1)}_j=\sum_{i=0}^j\mathcal L_i V^{(k)}_{j-i}.
\tag{2}
$$

The degree-seven source position requires acceleration coefficients through degree five, jerk through degree four, the next derivative through degree three, then through degrees two, one and zero. The velocity is the derivative of that same Taylor polynomial, retained through source-time degree six. Terms from an unknown sixth-order comparison acceleration first affect the response at degree eight, so $F_5$ suffices for the stated formal target.

Independently of this sparse implementation, the two new highest time derivatives at $\alpha=0$ can be derived in polar coordinates from $r'=p$, $p'=q^2/r-k/r^2$, $q'=-pq/r$. For a vector with polar components $(a,b)$, its fixed-coordinate derivative has polar components $(a'-qb/r,b'+qa/r)$. At reception, with central coefficient $k=Q$, $r=1$, $p=P$, $q=Q$, this gives

$$
\begin{aligned}
y^{(6)}_r={}&-120QP^4+360P^2Q^3-45Q^5-204P^2Q^2+66Q^4-22Q^3,\\
y^{(6)}_t={}&240P^3Q^2-180PQ^4+150PQ^3,\\
y^{(7)}_r={}&720QP^5-3600P^3Q^3+1350PQ^5+1908P^3Q^2-1872PQ^4+584PQ^3,\\
y^{(7)}_t={}&-1800P^4Q^2+2700P^2Q^4-225Q^6-2124P^2Q^3+396Q^5-172Q^4.
\end{aligned}
\tag{3}
$$

At $P=0,Q=1$ these are $(-1,0)$ and $(0,-1)$, as required by the exact unit circular solution of the auxiliary central ODE. This is an analytical derivative control, not a new canonical supplied history. Equations (1)–(3) were written before reading the reference target output.

The source is sampled at $\tau=-2\alpha L$. The same implicit equation $S\cdot S=4L^2$, $S=n_0+y(-2\alpha L)$ determines every coefficient of $L$. The new coefficient $L_j$ enters its degree-$j$ residual as $-8L_j$, since its effect inside the sampled path has an extra factor $\alpha$. The response is $-S/(2L^3D)$ with $D=1+\alpha S\cdot w(-2\alpha L)/(2L)$. The source velocity and clock are never prescribed separately.

## Known controls and execution boundary

Before a generated degree-seven target, known mode checks the new radial-power derivative, product rule and commuting mixed derivatives. It then checks the pointwise reception values and quarter-turn covariance of all six field coefficients, the exact affine response through degree seven, and the independently accepted generated fifth-order response through a degree-five-only invocation. The affine coefficient lists are

$$
(-1,-P,Q^2/2,0,Q^4/8,0,Q^6/16,0),
\qquad
(0,Q,PQ,0,PQ^3/2,0,3PQ^5/8,0).
$$

The field reception check compares $A_j$ with $Q$ times the accepted response coefficient; omitting that factor would fail it. Quarter-turn evaluation uses $y=(0,1)$, $w=(-Q,P)$ and compares with the rotated field. No new seventh-order coefficient is used as a known fixture.

The coordinator owns both supervisor launches. The exact requested known command is `OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" -B reference/priorities/master-equation-closure/binary-research/evidence/overnight2-a-reference-canonical-seventh-order.py known`. The instrument has a 90-second internal alarm, 512 MiB cooperative resident-memory ceiling, 1 MiB output ceiling and advancing derivative progress; the coordinator supplies the 120-second outer limit. A budget failure ends this bounded attempt without automatic expansion.

The method's accumulated-remainder scaling also follows from the exact polar identities. If the local radial and transverse acceleration errors are $C_r\alpha^{m+1}/r^2$ and $C_tQ\alpha^{m+1}/r^2$, the eccentricity derivative contributes at most $(C_r+2C_tQ+|P|C_t)\alpha^{m+1}/h$ to $(e/h)_\theta$. The angular-denominator term adds at most $|e|C_t\alpha^{m+1}/h$, because the angular derivative error is at most $C_th\alpha^{m+1}$. With $Q\le4$, $|P|\le3$ and $|e|\le3$, their sum is bounded by $(C_r+14C_t)\epsilon^{m+1}/h^{m+2}$. Integrating with $h_\theta\ge0.99\epsilon$ gives the method's coefficient $1/[0.99(m+1)h_0^{m+1}]$. This is an integrated local forcing allowance within an exact identity, not a closeness theorem for two solutions or a bound across the release seam.

**Known-first receipt.** The coordinator's supervised known run completed at 06:10:02 UTC under lease `dacc3eac-ee13-458f-b4f9-e2900afdac35`, with closed process group. The retained receipt `.local-data/master-equation-closure/overnight2-a/reference-canonical-seventh-known.json` reports all six controls `PASS`, elapsed time 0.5309109999798238 seconds, and unchanged instrument SHA-256 `c19306b992d3b8e5c98f1451b441923be5a443336ac9784b215eab201a21922d`. The progress log and original supervisor logs are retained by the coordinator. I read this receipt before any target output. The recorded reused reference-engine identity is `fe8a6b3a1fd48843549829448cf7a4ca0215cff3a32ac4474c023febc091bfa2`; it is implementation provenance, not a second independent reference.

## Independent degree-six and degree-seven coefficients

Let $T_5\Phi$ denote the already independently matched degree-five response. The new reference finds

$$
\mathcal R_r=(T_5\Phi)_r+\alpha^6R_6+\alpha^7R_7+O(\alpha^8),
\qquad
\mathcal R_t=(T_5\Phi)_t+\alpha^6T_6+\alpha^7T_7+O(\alpha^8),
$$

where

$$
\begin{aligned}
R_6={}&\frac Q{720}\left(2304P^4-25632P^2Q^2+3408P^2Q
+45Q^5+6240Q^4-672Q^3-224Q^2\right),\\
R_7={}&\frac{PQ}{630}\left(2088P^4-46728P^2Q^2+762P^2Q
+40329Q^4+10758Q^3-7832Q^2\right),\\
T_6={}&-\frac{PQ^2}{120}\left(1200P^2-45Q^3-2392Q^2-1248Q\right),\\
T_7={}&-\frac{Q^2}{2520}\left(26352P^4-149400P^2Q^2-107256P^2Q
+28683Q^4+35880Q^3-13928Q^2\right).
\end{aligned}
\tag{4}
$$

The dimensionless response equals the physical slow acceleration multiplied by $r^2$. Equation (4) is a derived formal coefficient claim, measured by the separately authored exact arithmetic reference, with known controls first. The $O(\alpha^8)$ symbols assert local analyticity of the comparison response, not a uniform actual-history remainder. The coordinator's coefficients remain undisclosed at this freeze.

The new implicit clock coefficients are

$$
\begin{aligned}
L_6={}&\frac1{720}\left(720P^6+1800P^4Q^2-720P^4Q
+1350P^2Q^4+432P^2Q^3+1344P^2Q^2\right.\\
&\left.\hspace{23mm}+225Q^6-1440Q^5-2120Q^4+1136Q^3\right),\\
L_7={}&-\frac P{1260}\left(1260P^6+3780P^4Q^2-1080P^4Q
+3780P^2Q^4-7200P^2Q^3-3072P^2Q^2\right.\\
&\left.\hspace{25mm}+1260Q^6+4443Q^5+26776Q^4-7232Q^3\right).
\end{aligned}
\tag{5}
$$

The new transmitter coefficients are

$$
\begin{aligned}
D_6={}&\frac Q{60}\left(240P^4-2592P^2Q^2+464P^2Q
+643Q^4-152Q^3-88Q^2\right),\\
D_7={}&\frac{PQ}{240}\left(960P^4-21344P^2Q^2+1152P^2Q
-15Q^5+19072Q^4+3672Q^3-5952Q^2\right).
\end{aligned}
\tag{6}
$$

The exact coefficient residual $S\cdot S-4L^2$ vanishes through degree seven. At zero parameter its derivative with respect to $L$ is $-8$, so the implicit-function theorem selects the local branch $L(0)=1$. Squaring the norm has not licensed another branch. The complete physical root census is inherited from the admitted history; this formal local comparison does not replace it.

The hand-derived highest time jets (3) agree term by term with the independently produced sparse output. At $P=0$, the new radial odd coefficient and transverse even coefficient vanish. The radial $Q^6/16$ term in $R_6$ and transverse $3PQ^5/8$ term in $T_6$ also retain the affine-source contributions, with the remaining monomials supplied by generated acceleration. These are structural checks, not acceptance by self-reproduction.

**Target receipt.** The supervised target completed at 06:10:26 UTC, lease `6040b018-5540-44ca-8901-54ee0e91c1cd`, with closed process group and supervisor wall time 1.934 seconds. The retained output `.local-data/master-equation-closure/overnight2-a/reference-canonical-seventh-target.json` reports elapsed time 1.8432792089879513 seconds and the same frozen instrument identity as the known run. The progress log records 204, 212, 246, 208 and 132 sparse terms after derivative orders three through seven, then zero implicit-clock residual through degree seven. Those counts describe this computation; they do not estimate another job's cost. Both original supervisor logs and copied runtime receipts remain with the coordinator. There was no failed or enlarged numerical attempt in this reference calculation.

## First remaining theorem obligations

The pointwise scaling and formal coefficients are supported at this reference's stated grade. A uniform actual seventh-order theorem still needs an evaluated actual-to-$F_5$ comparison and a uniform analytic Taylor remainder of its evaluated response. Earlier $F_3$ derivative/tube constants cannot simply be assigned to $F_5$, and the printed polynomial factor $Q$ alone cannot establish a transverse remainder factor.

A sufficient source-coverage pattern is available without changing the physical history. The accepted actual fifth-order row requires $\sigma^4(a)\ge10\epsilon$ at every receiver $a$ where it is used. Since the common window starts after $\sigma^2(s)$, the stronger condition $\sigma^6(s)\ge10\epsilon$ guarantees that requirement by monotone playback. This is a sufficient condition for a prospective comparison, not proof of its optimality. With a proved full-window discrepancy of order $\alpha^6$, bounded field and response derivatives would give order $\alpha^8$ after the twice-integrated source comparison. Componentwise estimates and both displaced clocks remain necessary for the transverse conclusion. No derivative of an actual residual is required by that route.

The first quantitative inequality still missing from this reference is a uniform actual-to-$F_5$ response bound with evaluated new field constants, followed by its degree-seven Taylor-tail bound. The coordinator is independently developing those bounds; they were not read for this coefficient derivation. Original nonmirror forcing, normal components, two original source clocks, the release layer and accumulated phase remain additional obligations. Equation (4) does not determine the nominal entry sign or an all-future physical event.

Falsifiers are an incorrect physical rescaling in (1), a derivative rule inconsistent with $\rho^2=x^2+y^2$, a missing term in (2), disagreement with the hand control (3), a nonzero implicit residual after (5), or a mismatched transmitter coefficient (6). A failure of a later actual-history remainder would limit that transfer; it would not by itself invalidate these formal comparison coefficients. Independent comparison with the coordinator's undisclosed result is the next algebraic assessment, not another run of this same producer.

## Preservation and validation

Only this new analysis and its new reference instrument are authored here. The older instrument, earlier references, candidate subjects, shared report, canonical law/history, Git metadata and generated owners are unchanged. Native `shasum -a 256` measures the following identities before target use and at closeout:

| Source | SHA-256 |
| --- | --- |
| Seventh-order method | `0852e25970df08355b0d1358414967fafa82aaa66ca050c3445227fc7e450b66` |
| Older fifth-order reference instrument | `fe8a6b3a1fd48843549829448cf7a4ca0215cff3a32ac4474c023febc091bfa2` |
| Accepted fifth-order remainder assessment | `1c02cf2a31be75000a7c207292b327f39035f9be014fcbc0b7da2c5878430364` |
| New seventh-order reference instrument | `c19306b992d3b8e5c98f1451b441923be5a443336ac9784b215eab201a21922d` |

The existing known-first document checker validates only TeX, whitespace and local links. It does not establish the coefficient identities or actual-history transfer. The [main A report](overnight2-a-followup-and-research-2026-10-07.md) owns integration and the coordinator's separate assessment. Both supervised reference jobs are closed; no further run is requested.

**Freeze receipt, 2026-10-07 06:12 UTC.** `node reference/priorities/master-equation-closure/binary-research/evidence/authorized-cases-followup-document-check.mjs reference/priorities/master-equation-closure/binary-research/analysis/overnight2-a-reference-canonical-seventh-order.md` passed known controls first, then 112 mathematical spans and four local links, with no whitespace diagnostics. The four-source `shasum -a 256` closeout matched the table exactly. The coordinator's seventh-order coefficients, producer, target receipt and new analytic-bound material remain unread at this freeze. This reference is ready for separate mathematical comparison.
