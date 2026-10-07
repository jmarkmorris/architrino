# Direct derivative bounds enlarge the original logarithmic chart

**Status: derived candidate, awaiting independent assessment.** The [first quantitative chart](overnight2-a-logarithmic-quantitative-chart.md), accepted by its [independent assessment](overnight2-a-reference-logarithmic-quantitative-chart.md), proves a parameter radius of $10^{-25}$. Its smallness comes chiefly from a Cauchy second-derivative bound over a tiny coefficient ball. Here direct differentiation of the same implicit source clock and acceleration response gives a candidate radius $10^{-10}$ in the same exact unit-eigenvector coordinates. The equation, complete physical preparation and limiting manifold are unchanged. This improves a local analytic starting domain; it does not select a finite original-family member or establish its later fate.

Retain the registered coefficient-one inverse-distance equation, $c_f=1$, opposite-polarity mirror-planar geometry, exact balanced spiral and original compatible positive-amplitude complete histories. The [independent convergence construction](overnight2-a-reference-logarithmic-convergence.md) and [method assessment](overnight2-a-reference-logarithmic-manifold-method.md) supply the functional equation and its history meaning. No floating formal coefficient is used below. The accepted inverse estimate $C_M=60000$ and its independent rational Cartesian verification remain frozen premises.

## Declared norms and a larger complex clock domain

Use the same scalar coefficient-sum Wiener algebra $\mathcal A$, vector coefficient-sum Euclidean norm $Y$, and degree-squared norm

$$
\|W\|_X=\sum_{i,j\ge0}\max(1,(i+j)^2)|W_{ij}|_2.
$$

Write $U=A+W$, $A=ae_1$, $\Omega=\omega J$, $B=I+\Omega$, $k=\alpha+i\beta$, and $\mathcal L=k\zeta\partial_\zeta+\bar k\eta\partial_\eta$. All base quantities are the exact admitted values. Their accepted enclosures give

$$
.615<\lambda<.616,\quad .384<d_0=1-\lambda<.385,
\quad a<.278,\quad \omega<2.3,
$$
$$
\|B\|_2=\|\Omega-I\|_2<2.51,
\quad |BA|_2<.698,\quad |k|<3.228,
\quad \alpha>.013,
\quad D_0=1/\lambda.
\tag{1}
$$

Consider the product ball

$$
\|W\|_X\le\delta_0=10^{-4},\qquad
\ell=\lambda+e,\qquad \|e\|_{\mathcal A}\le b=5\times10^{-4}.
\tag{2}
$$

The same logarithm and exponential series used in the accepted chart yield

$$
\|\log(\ell/\lambda)\|_{\mathcal A}
\le\frac b{\lambda-b}<.000814,
$$
$$
\|\ell^k\|_{\mathcal A},\ \|\ell^{\bar k}\|_{\mathcal A}
\le .994\exp(3.228\times.000814)<.997=:q,
\quad \|E_\ell\|<1.002,
\tag{3}
$$

where $E_\ell=\exp(\Omega\log\ell)$. The constant rotation at $\lambda$ is orthogonal, so only the clock perturbation contributes to its norm bound. Each degree-$n$ composed term gains a factor at most $q^n$. These strict inequalities justify normal convergence and differentiation of the source compositions on an open neighborhood of (2).

Define

$$
U_s=U(\zeta\ell^k,\eta\ell^{\bar k}),\qquad
C=U+\ell E_\ell U_s,
\qquad w=E_\ell(BU+\mathcal LU)_s,
\qquad s=\sqrt{C\cdot C}.
\tag{4}
$$

The square root has the positive base branch; the complex Cartesian product is bilinear. Euclidean coefficient norms still bound this product. Put $c_0=A+\lambda E_\lambda A$ and $n_0=c_0/d_0$. The base chord's clock derivative has norm below $.7$, and the perturbation chord has norm below $1.619\delta_0$. Consequently

$$
\|C-c_0\|_Y<\eta:=b+2\delta_0=.0007,
\quad \|s-d_0\|_{\mathcal A}<3\eta,
\quad \|C/s-n_0\|_Y<12\eta.
\tag{5}
$$

For completeness, the squared-chord relative perturbation is bounded by $2\eta/.384+\eta^2/.384^2<.00365$. The square-root series bounds its square-root change by $3\eta$. Then $C/s-n_0=(C-c_0)/s+n_0(d_0-s)/s$ has norm at most $4\eta/(.384-3\eta)<12\eta$. Thus $\|C/s\|<1.01$ and $\|s^{-1}\|<1/.3819$.

The velocity estimates are

$$
\|w-w_0\|_Y<3b+6\delta_0=3\eta,
\qquad \|w\|_Y\le1.002(.698+5.738\delta_0)<.7.
\tag{6}
$$

The second bound is obtained directly, rather than by adding the looser first bound to the base norm. On the entire unsolved clock ball,

$$
\|1+(C/s)\cdot w-D_0\|_{\mathcal A}
\le12\eta(.698)+(1+12\eta)3\eta<12\eta=.0084.
\tag{7}
$$

For $G(e,W)=1-\lambda-e-s$, its clock derivative is exactly $G_e=-[1+(C/s)\cdot w]$. Thus $e\mapsto e+\lambda G(e,W)$ has Lipschitz constant below $.01$. At $e=0$ its norm is below $3\delta_0$ by the same square-root estimate applied to a chord perturbation below $1.616\delta_0$. Since $.01b+3\delta_0=.000305<b$, this map has a unique analytic clock throughout (2). On the solved clock $s=d=1-\ell$, with

$$
\|C\|_Y<.3857,\quad \|d^{-1}\|<1/.3835,
\quad \|D^{-1}\|<.621,
\quad D=1+(C/d)\cdot w.
\tag{8}
$$

The last inequality follows from $D_0>1/.616$ and (7). These are coefficient norms of reciprocals, not order assertions for arbitrary complex functions.

## Direct first and second partial derivatives

All following derivatives in a $W$ direction are evaluated on directions of $X$ norm at most one; a clock direction has $\mathcal A$ norm at most one. Subscripts in this section mean partial derivatives with the other input fixed. Because $C$ and $w$ are affine in $U$ at fixed clock,

$$
C_{UU}=w_{UU}=0,\qquad
C_\ell=w,\qquad C_{U\ell}=w_U,\qquad C_{\ell\ell}=w_\ell.
\tag{9}
$$

Directly from (3), the weighted differential bounds $\|\mathcal LW\|_Y\le|k|\|W\|_X$ and $\|\mathcal L^2W\|_Y\le|k|^2\|W\|_X$ give

$$
\|C_U\|<1.62,\quad \|w_U\|<6,
\quad \|w_\ell\|<3,\quad \|w_{U\ell}\|<52,
\quad \|w_{\ell\ell}\|<15.
\tag{10}
$$

Here the exact clock differential formulas are

$$
w_\ell=\ell^{-1}E_\ell(\Omega+\mathcal L)(B+\mathcal L)U_s,
$$
$$
w_{\ell\ell}=\ell^{-2}E_\ell
(\Omega+\mathcal L-I)(\Omega+\mathcal L)(B+\mathcal L)U_s.
\tag{11}
$$

Operators are applied before source evaluation. In the first formula, the perturbation operator bound is

$$
2.3(2.51)+(2.3+2.51)3.228+3.228^2<32.
$$

Multiplication by $1.002/.6145$ makes it less than $52$; for $w_\ell$ its perturbation is below $.0052$, and its base contribution is below $1.002(2.3)(.698)/.6145<2.62$. For the second formula the constant, linear and quadratic operator coefficients have norms at most $14.5$, $17.85$ and $7.32$. The cubic term is controlled by the strict source contraction rather than assuming a third uncomposed derivative is bounded on $X$:

$$
\| (\mathcal L^3 W)_s\|_Y
\le |k|^3\sup_{n\ge1}(nq^n)\|W\|_X
\le 3.228^3\frac q{1-q}\delta_0.
\tag{12}
$$

The last inequality follows from $nq^n\le\sum_{j=1}^n q^j\le q/(1-q)$. Thus the base contribution to $w_{\ell\ell}$ is below $1.002(2.51)(2.3)(.698)/.6145^2<10.7$, and its perturbation is below

$$
\frac{1.002\delta_0}{.6145^2}
\left[14.5+17.85(3.228)+7.32(3.228)^2
+(3.228)^3\frac{.997}{.003}\right]<3.1.
$$

This proves the deliberately rounded bound $15$ in (10). There is no hidden loss of a source derivative.

For the square-root map, $Ds=C/s$ and $D^2s=(I-nn^{\mathsf T})/s$ with $n=C/s$. Therefore

$$
\|Ds\|<1.01,\qquad
\|D^2s\|\le\frac{1+1.01^2}{.3819}<6.
$$

The implicit clock consequently obeys

$$
\|G_{UU}\|<16,\quad \|G_{U\ell}\|<13,
\quad \|G_{\ell\ell}\|<6.1,\quad \|G_\ell^{-1}\|<.621.
\tag{13}
$$

For example the mixed estimate is $6(1.62)(.7)+1.01(6)<13$, and the pure clock estimate is $6(.7)^2+1.01(3)<6.1$. Implicit differentiation, including both mixed terms for the bilinear second derivative, now gives

$$
\|D\ell\|<.621(1.01)(1.62)<1.1,
$$
$$
\|D^2\ell\|<.621[16+2(13)(1.1)+6.1(1.1)^2]<33.
\tag{14}
$$

## Total response Hessian

Subscripts 1 and 2 now denote total first- and second-derivative operator norms of a map of $W$, after solving its clock. Equations (6), (9), (10) and (14) imply the following bounds:

| Map | Value bound | First derivative | Second derivative |
| --- | ---: | ---: | ---: |
| $C$ | $.3857$ | $2.4$ | $40$ |
| $d$ | use $\|d^{-1}\|<1/.3835$ | $1.1$ | $33$ |
| $w$ | $.7$ | $10$ | $240$ |
| $n=C/d$ | $1.01$ | $10$ | $250$ |
| $D=1+n\cdot w$ | use $\|D^{-1}\|<.621$ | $18$ | $620$ |
| $f=d^{-2}$ | $6.81$ | $40$ | $1520$ |
| $g=D^{-1}$ | $.621$ | $7$ | $400$ |

Each entry follows by product differentiation in the same algebra. Explicitly,

$$
C_2<2(6)(1.1)+3(1.1)^2+.7(33)<40,
$$
$$
w_2<2(52)(1.1)+15(1.1)^2+3(33)<240,
$$
$$
n_1<\frac{2.4}{.3835}+\frac{.3857(1.1)}{.3835^2}<10,
$$
$$
n_2<\frac{40}{.3835}+\frac{2(2.4)(1.1)}{.3835^2}
+\frac{.3857(33)}{.3835^2}
+\frac{2(.3857)(1.1)^2}{.3835^3}<250,
$$
$$
D_1<10(.7)+1.01(10)<18,
\qquad D_2<250(.7)+2(10)(10)+1.01(240)<620,
$$
$$
f_2<\frac{6(1.1)^2}{.3835^4}+\frac{2(33)}{.3835^3}<1520,
\qquad g_2<2(.621)^3(18)^2+(.621)^2(620)<400.
$$

For the acceleration response $\Phi=Cfg=C/(d^2D)$ the full bilinear product rule therefore gives

$$
\|D^2\Phi\|
\le C_2f_0g_0+C_0f_2g_0+C_0f_0g_2
+2C_1f_1g_0+2C_1f_0g_1+2C_0f_1g_1
<3000.
\tag{15}
$$

This bound holds on the full ball $\|W\|_X\le10^{-4}$, with strict reserve. Only the response contributes nonlinear second derivatives: the local differential part of the invariance equation is linear. In (15) $C_2$ means the second derivative of the chord; the scalar nonlinear-Hessian constant used next is denoted $H_2=3000$ to avoid ambiguity.

## Candidate convergent disk and history error

Use the exact unit eigenvector with first component real and positive, and $p=\zeta v+\eta\bar v$, $\|p\|_X=2$. The accepted inverse bound $C_M=60000$ acts between precisely the same $Y_{\ge2}$ and $X_{\ge2}$ spaces. Choose

$$
r=10^{-10},\qquad \delta=2r=2\times10^{-10},\qquad H_2=3000.
$$

On the ball $\|h\|_X\le\delta$, the full perturbation $W=rp+h$ stays inside (2). The inherited fixed-point argument has contraction constant

$$
2C_MH_2\delta=.072<1,
$$

and image norm at most

$$
2C_MH_2\delta^2=1.44\times10^{-11}<\delta.
$$

It supplies the convergent parameterization

$$
U=A+r(\zeta v+\eta\bar v)+h,
\qquad \|h\|_X\le1.44\times10^{-11},
\qquad \|U-A\|_X\le2.144\times10^{-10}.
\tag{16}
$$

All smaller positive radii are admitted by the same inequalities. Relative to the first quantitative proof, (16) increases the guaranteed parameter radius by $10^{15}$ without altering the inverse calculation or fitting the formal pilot. It remains a conservative local domain; this estimate is not an event detector.

For the compatible similarity-history state $(U,\mathcal LU)$, the sum $C^1$ norm is bounded by $(1+|k|)^2$ times the $X$ norm. Thus the nonlinear history remainder is below $2.58\times10^{-10}$ and the total history deviation below $3.84\times10^{-9}$, on every fixed finite negative-time window. Physical velocity changes by at most $(2.51+3.228)\|U-A\|_X<1.24\times10^{-9}$, so the strict-speed margin remains above $.303$. The clock and transmitter factors remain ordinary, the source ratio positive, and a similarity-history window of width one contains the local delay. Complete-past applicability and the original family's attainment of limiting histories retain their existing proofs; this parameterization supplies no new physical past through the formal singular origin.

An actual finite-amplitude fate still requires controlled transport from these histories to an open event or all-future region and transfer from the original compatible family. The parameter radius is not a numerical original preparation amplitude. Nor is constant parameter modulus automatically the old eigenfunctional checkpoint. These distinctions are unchanged by the larger radius.

## Evidence boundary and falsifiers

This is an analytical subject with no new numerical target. Known identities inherited from the method include the exact rotation family, the time-origin family and its nonconstant source-clock correction, and the independently reconstructed Cartesian clock derivative. The new substantive claim is the direct Hessian bound (15), to be checked independently before target use. No agreement with the floating degree-four pilot is offered as its evidence.

Checkable falsifiers are a missing clock derivative or degree weight in (11)–(12), a product-ball source norm reaching one, failure of the square-root/reciprocal bounds, omission of a mixed derivative in (13)–(15), or a mismatch between the inverse and coefficient norms. Any one would reopen the enlarged disk. The original accepted tiny chart remains intact if this improvement fails. The receiving operator account is [the main A report](overnight2-a-followup-and-research-2026-10-07.md); all earlier subjects and references are preserved unchanged.
