# An explicit analytic chart for the original logarithmic departure

**Status: derived candidate awaiting independent assessment.** The [independent coefficient-space construction](overnight2-a-reference-logarithmic-convergence.md) supplies a convergent local parameterization without assuming an analytic semiflow on arbitrary $C^1$ histories. This subject evaluates conservative constants in that construction. It uses the candidate [rational inverse bound](overnight2-a-logarithmic-inverse-bound.md), whose independent computational assessment is also pending. No finite-member fate follows from this local chart.

Retain the exact original registered coefficient-one logarithmic mirror-planar equation, $c_f=1$, exact balanced spiral, original complete compatible positive-amplitude family and the [independently reconstructed functional equation](overnight2-a-reference-logarithmic-manifold-method.md). All polynomial variables here describe the same limiting unstable manifold. They are not replacement physical preparations.

## Spaces, exact normalization and constants

Use the scalar Wiener algebra $\mathcal A$ with coefficient-sum norm on the unit bidisc, the vector space $Y=\mathcal A^2$ with the sum of complex Euclidean coefficient norms, and

$$
\|W\|_X=\sum_{i,j}\max(1,(i+j)^2)|W_{ij}|_2.
$$

Let $U=A+W$, $A=ae_1$, $\Omega=\omega J$, $B=I+\Omega$ and $k=\alpha+i\beta$. The existing exact enclosures imply

$$
.615<\lambda<.616,\quad .384<d_0=1-\lambda<.385,
\quad a<.278,\quad \omega<2.3,
$$
$$
\|B\|_2<2.51,\quad |BA|_2<.698,
\quad |k|<3.228,\quad \alpha>.013,
\quad D_0=1/\lambda.
$$

Choose the exact growing eigenvector with Euclidean norm one and its first Cartesian component real and positive. The accepted nonzero first-component normalization permits this rescaling. This differs by a fixed exact scale from the formal pilot's first-component-one convention; no pilot coefficient is used in the bounds below. Put $p=\zeta v+\eta\bar v$, so $\|p\|_X=2$ exactly.

For the analytic response construction choose the position coefficient ball and clock ball

$$
\|W\|_X\le\delta_0=10^{-8},\qquad
\ell=\lambda+e,\quad \|e\|_{\mathcal A}\le b=10^{-5}.
$$

All the inequalities below have strict reserve, so analyticity holds on an open neighborhood of these closed balls. Bilinear Cartesian products are used in the complexification. Norm estimates nevertheless use the complex Euclidean norm and its Cauchy inequality, so the scalar product remains bounded by the product of vector norms.

## Source composition and clock contraction

Since $\lambda<.616<e^{-.48}$ and $\alpha>.013$, $\lambda^\alpha<e^{-.00624}<.994$. The inequalities for the exponential can be checked by its positive Taylor series and alternating series at these small arguments. The logarithm series gives

$$
\|\log(\ell/\lambda)\|_{\mathcal A}
\le\frac{b}{\lambda-b}<1.627\times10^{-5}.
$$

Therefore

$$
\|\ell^k\|_{\mathcal A},\ \|\ell^{\bar k}\|_{\mathcal A}
\le\lambda^\alpha\exp\left(\frac{|k|b}{\lambda-b}\right)<.995.
\tag{1}
$$

Both source parameters lie strictly inside the unit coefficient domain. The rotation factor $E_\ell=e^{\Omega\log\ell}$ has norm below $\exp(2.3b/(\lambda-b))<1.00004$, because its constant factor $P=e^{\Omega\log\lambda}$ is real orthogonal. For the composed perturbation, $\|W_s\|_Y\le\delta_0$ and $\|\mathcal LW_s\|_Y\le |k|\delta_0$, where the latter notation means apply $\mathcal L$ before evaluating at the source.

Write $C=U+\ell E_\ell U_s$, $c_0=A+\lambda PA$, and $s=\sqrt{C\cdot C}$ on the base branch. Along a scalar clock variation, the base chord derivative is $E_\ell BA$, with norm below $.7$. The perturbation chord contribution has norm below $1.617\delta_0$. Hence

$$
\|C-c_0\|_Y\le .7b+1.617\delta_0
<\eta_0:=b+2\delta_0=1.002\times10^{-5}.
$$

The squared-chord perturbation divided by $d_0^2$ has norm at most $2\eta_0/d_0+\eta_0^2/d_0^2<.000053$. Its square-root series gives $\|s-d_0\|_{\mathcal A}<3\eta_0$; division by $s$ then gives

$$
\|C/s-n_0\|_Y<12\eta_0,\qquad n_0=c_0/d_0.
$$

The sampled velocity $w=E_\ell(BU+\mathcal LU)_s$ obeys

$$
\|w-w_0\|_Y<3b+6\delta_0,
\qquad w_0=PBA.
$$

Indeed its base clock variation is bounded by $\|\Omega\|\,|BA|\,b(\lambda-b)^{-1}\exp(2.3b/(\lambda-b))<3b$, while the perturbation is below $1.00004(2.51+3.228)\delta_0<6\delta_0$. Thus, on the whole unsolved clock product ball,

$$
\left\|1+(C/s)\cdot w-D_0\right\|_{\mathcal A}
<12b+24\delta_0.
\tag{2}
$$

For $G(e,W)=1-\lambda-e-s$, the exact derivative is $D_eG=-[1+(C/s)\cdot w]$ as a multiplication operator. Consequently the clock map $e\mapsto e+\lambda G(e,W)$ has Lipschitz constant below

$$
\lambda(12b+24\delta_0)<10^{-3}.
$$

At $e=0$, the chord perturbation is below $1.616\delta_0$, so $\|\lambda G(0,W)\|<3\delta_0$. The clock map therefore maps the closed $b$ ball strictly into itself: $10^{-3}b+3\delta_0<b$. It has a unique analytic fixed point, with the stronger solution bound

$$
\|e(W)\|_{\mathcal A}<\frac{3\delta_0}{1-10^{-3}}<3.004\delta_0.
$$

The complex contraction and normal convergence of source compositions justify analyticity in the declared coefficient spaces. This calculation does not assert that state-dependent evaluation is analytic on an arbitrary $C^1$ history ball.

## Response and nonlinear remainder bounds

On the solved clock, $s=d=1-\ell$, so (2) applies to the physical transmitter expression $D=1+(C/d)\cdot w$. The bounds above imply

$$
\|C\|_Y<.38502,\qquad
\|d^{-1}\|_{\mathcal A}<\frac1{.384-b},\qquad
\|D^{-1}\|_{\mathcal A}<\frac1{1/.616-(12b+24\delta_0)}.
$$

Multiplication yields

$$
\left\|\Phi(W):=\frac{C}{d^2D}\right\|_Y<2
\qquad(\|W\|_X\le10^{-8}).
\tag{3}
$$

Set $\rho=\delta_0/4=2.5\times10^{-9}$. The bound (3) holds beyond the closed ball of radius $2\rho$. Cauchy's formula in two scalar directions, each with radius $\rho/4$, gives

$$
\sup_{\|W\|_X\le\rho}\|D^2\Phi(W)\|_{X\times X\to Y}
\le\frac{32}{\rho^2}=5.12\times10^{18}<C_2:=6\times10^{18}.
$$

Let $\mathcal M$ be the full homological derivative, including the source clock, and $\mathcal N(W)=\mathcal F(W)-\mathcal MW$. Then $\|\mathcal N(W)\|_Y\le C_2\|W\|_X^2/2$ and $\|D\mathcal N(W)\|\le C_2\|W\|_X$. The local differential part is linear and introduces no extra second derivative here.

Assume the source-bound rational result $\|\mathcal M^{-1}\|_{Y_{\ge2}\to X_{\ge2}}\le C_M=60000$ is independently accepted. Choose

$$
r=10^{-25},\qquad \delta=r\|p\|_X=2\times10^{-25}.
$$

Then $\delta<\rho/2$ and $\delta<1/(4C_MC_2)$. The fixed-point map on $\|h\|_X\le\delta$ has Lipschitz constant at most $.144$ and image norm at most $2.88\times10^{-26}$. It therefore supplies a convergent solution

$$
U(\zeta,\eta)=A+r(\zeta v+\eta\bar v)+h(\zeta,\eta),
\quad \|h\|_X\le2.88\times10^{-26},
\quad \|U-A\|_X<2.3\times10^{-25}.
\tag{4}
$$

This is an explicit nonempty analytic domain in unit-eigenvector coordinates. The radius is deliberately conservative: the Cauchy estimate uses the entire complex coefficient ball and the global inverse bound, discarding the much smaller actual second derivative and individual frequency structure. The formal pilot's coefficient magnitudes do not enter the proof.

## History meaning and limits

For a real slice $\eta=\bar\zeta$, the generated position/velocity state over any fixed finite similarity-history window is

$$
\Xi(s)=\big(U(e^{ks}\zeta,e^{\bar k s}\eta),\mathcal LU(e^{ks}\zeta,e^{\bar k s}\eta)\big).
$$

Negative similarity time contracts both parameter moduli. The $X$ bound supplies all state derivatives required by its compatible $C^1$ history norm: the position deviation is below $2.3\times10^{-25}$, the first derivative below $3.228$ times this number and the second below $3.228^2$ times it. The nonlinear remainder alone is bounded by $2.88\times10^{-26}$ in $X$. The physical speed deviation is below $(2.51+3.228)2.3\times10^{-25}<1.4\times10^{-24}$. With the admitted base speed below $.696$, the physical strict-speed margin stays above $.303$. The source ratio remains positive, the delay stays near $-\log\lambda<.5$ and the transmitter factor remains positive. A finite reference history window of similarity width one contains it; the existing original-family construction already permits longer generated windows without altering the physical preparation.

These are compatible limiting histories in the original ordinary-root local chart. Their negative-time contraction and nonzero modal tangent identify their sufficiently small image with the same strong unstable manifold. Any further part of the displayed disk is a regular forward continuation of that local image along its own parameter flow. This does not assert a physical complete past through the formal origin $T=-1$. Full-past root coverage of actual original-family members and their approach to limiting histories continue to use the existing complete-history and attainment theorems; no remote root is removed by this coordinate construction.

The radius $r$ is not the original preparation amplitude, and its boundary is not automatically the old eigenfunctional checkpoint circle. An actual-family conclusion still needs the accepted attainment transfer and a finite controlled path into an open event region. At (4), the physical speed remains essentially the base speed, so unit-speed arrival is not established. The quantitative gain is a certified local history approximation and a convergent analytic starting object, conditional on the independent acceptance stated above.

Falsifiers are a missing factor in the complex source-composition norm, failure of the unsolved-clock derivative identity, an invalid square-root or reciprocal bound, a degree-weight mismatch in the inverse estimate, a wrong finite inverse enclosure, or confusing the pilot's eigenvector normalization with the unit normalization here. The two exact nonlinear controls in the method assessment and the rational inverse known controls protect distinct parts of this chain. The receiving account is [the main A report](overnight2-a-followup-and-research-2026-10-07.md); the original sources and independent references remain frozen.
