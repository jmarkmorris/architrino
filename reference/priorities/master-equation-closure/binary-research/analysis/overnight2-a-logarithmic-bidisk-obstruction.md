# A first-jet obstruction to a larger logarithmic source bidisk

**Status: analytical subject awaiting independent assessment of the clock-jet enclosure and disk argument.** This is a limitation of a declared complex parameter domain, not a physical event or an exclusion of real nonlinear continuation. It retains the exact logarithmic coefficient-one mirror-planar spiral, growing eigenvalue and original-family local unstable manifold admitted by the [method assessment](overnight2-a-reference-logarithmic-manifold-method.md). The [bounded continuation attempt](overnight2-a-logarithmic-continuation-method.md) selected radius $r=1/100$ in first-Cartesian-component eigenvector coordinates. The calculation below gives necessary conditions before any higher-degree tail estimate can admit that domain.

## The exact first clock coefficient

Write $k=\alpha+i\beta$, $v=(1,v_2)$ for the exact growing null vector, and

$$
U(z,w)=A+vz+\bar v w+O((|z|+|w|)^2),
\qquad
\ell(z,w)=\lambda+Lz+\bar Lw+O((|z|+|w|)^2).
$$

The real slice is $w=\bar z$. The independently derived unsolved-clock differential in the method assessment gives

$$
L=-\lambda n_0\cdot(I+\lambda^{k+1}P)v.
\tag{1}
$$

No higher coefficient of the parameterization enters (1). The exact admitted balance gives $D_0=1/\lambda$. The source variables are $z\ell^k,w\ell^{\bar k}$ on the logarithm branch at positive $\lambda$. This subject does not use a floating polynomial coefficient as a bound for $L$; a separate exact enclosure of (1) remains necessary for the numerical consequence below.

## A necessary Wiener-norm condition

Rescale $z=r\zeta,w=r\eta$ to the unit bidisk. The constant coefficient of $\ell^k$ has modulus $\lambda^\alpha$. Its two linear coefficients each have modulus $r|k|\lambda^{\alpha-1}|L|$. Therefore the coefficient-sum norm satisfies

$$
\|\ell^k\|_{\mathcal A}
\ge\lambda^\alpha+2r|k|\lambda^{\alpha-1}|L|.
\tag{2}
$$

The same lower bound holds for $\ell^{\bar k}$. Higher coefficients cannot cancel any term in this sum of absolute values. Consequently the previously used sufficient source-composition condition $\|\ell^k\|_{\mathcal A}<1$ necessarily requires

$$
r<r_{\mathcal A}:=
\frac{\lambda(\lambda^{-\alpha}-1)}{2|k||L|}.
\tag{3}
$$

Equality cannot meet the strict condition. Increasing polynomial degree or sharpening the tail cannot remove a violated lower bound (2). This conclusion alone does not show that source composition is unbounded in another norm.

## A stronger domain obstruction independent of the coefficient norm

Suppose the analytic source map itself sends the complete complex bidisk $|z|,|w|<r$ into that same bidisk. Its first component divided by $r$ is

$$
F(\zeta,\eta)=\zeta\ell(r\zeta,r\eta)^k,
\qquad |F|\le1.
$$

Choose a unit complex number $u$ so that $L$ and $u\bar L$ have the same argument. The disk restriction $f(t)=F(t,ut)$ is holomorphic, satisfies $f(0)=0$ and has modulus at most one. Thus $g(t)=f(t)/t$ also has modulus at most one. To see this without assuming a coefficient theorem, on every circle $|t|=R<1$ the bound is $|g(t)|\le1/R$; the maximum principle and $R\uparrow1$ give the assertion throughout the disk. Its first two coefficients are

$$
g(0)=\lambda^k,
\qquad g'(0)=rk\lambda^{k-1}(L+u\bar L).
$$

For a holomorphic disk map $g$ with $a=g(0)$, the function $(g-a)/(1-\bar a g)$ maps the disk into itself and vanishes at zero. The same disk argument bounds the modulus of its derivative at zero by one. Hence $|g'(0)|\le1-|a|^2$. In the present case this gives the necessary condition

$$
2r|k|\lambda^{\alpha-1}|L|\le1-\lambda^{2\alpha},
\qquad
r\le r_{\mathrm{disk}}:=
\frac{\lambda^{1-\alpha}(1-\lambda^{2\alpha})}{2|k||L|}.
\tag{4}
$$

The necessary radius is related to (3) by $r_{\mathrm{disk}}=(1+\lambda^\alpha)r_{\mathcal A}$. This obstruction is stronger in meaning than a failed estimate: if (4) is violated, the analytic source map cannot preserve the entire declared bidisk. The formula uses only its exact first jet, so no undisclosed higher coefficient can repair that particular domain requirement. It does not prohibit analytic continuation of $U$ to a larger domain that contains source images, a noncircular complex domain, multiple local charts or a real-history argument. It also does not say that a real ordinary causal root ceases to exist.

## Coarse numerical sufficiency and remaining check

The inherited exact parameter and root enclosures imply $.615<\lambda<.616$, $0<\alpha<.014$ and $|k|>3.22$. If a separate enclosure gives $|L|>.2$, then $r=1/100$ already violates (4). The elementary exponential series gives $e^{.49}>1+.49+.49^2/2+.49^3/6>1/.615$, so $-\log\lambda<.49$. Therefore $1-\lambda^{2\alpha}<2\alpha(-\log\lambda)<.01372$. Also $1-\alpha>7/8$ and the exact rational inequality $.616^7<(2/3)^8$ imply $\lambda^{1-\alpha}<2/3$. Thus the left side of (4) is strictly larger than $2(.01)(3.22)(1.5)(.2)=.01932$. The strict gap exceeds $.0056$. These deliberately coarse margins avoid making the subject depend on a reported decimal clock coefficient.

Until the independent clock enclosure and coarse exponential inequalities have passed known controls or an analytical review, only the symbolic necessary conditions (3)–(4) are proposed here. If accepted with the indicated margins, they close the selected $r=.01$ same-bidisk continuation attempt without deciding any original-family trajectory's later fate. Falsifiers are an incorrect clock derivative, wrong eigenvector normalization, failure of the first-jet enclosure, an invalid holomorphic branch, or a mistaken application of the one-variable disk restriction. The [main A report](overnight2-a-followup-and-research-2026-10-07.md) receives the independent disposition.
