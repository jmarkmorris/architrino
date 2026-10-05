# Independent admission of the inverse-distance expanding spiral

## Verdict and exact scope

**Derived verdict: accepted.** The fixed inverse-distance law with $p=1$ and $K=R_*=c_f=1$ admits the proposed exactly expanding mirror-planar binary from the specified complete compatible history. The balance rectangle contains one and only one common zero. That zero has strictly subfield constant speed, positive radius coefficient and ordinary positive transmitter factor. The complete prepared past supplies precisely the sources used by the exact future. Ordinary local uniqueness then identifies that exact future as the unique global ordinary continuation of this preparation.

Radius grows linearly, the unwrapped angle grows without bound, and Cartesian velocity has no limit. This is a concrete complete-history existence and fate result. It proves neither stability nor attraction, uniqueness among all possible spirals, generic inverse-distance fate, or the behavior of unrelated nonmirror preparations. Uniqueness of the balance zero is confined to the certified rectangle; uniqueness of evolution is for the specified complete history on ordinary charts.

This is an independent reconstruction after disclosure, using the Jack K. Hale lens. The subject's proposed conclusions are tested below rather than used as premises. No Weber, Darwin, canonical global-fate, or other radial-power fate result enters the proof.

## Frozen sources and independent evidence

The inspected [analytical formulation](alternatives-screen-2026-10-05-logarithmic-spiral-formulation.md) has SHA-256 `70d640721c8f35391f13bf43e888532d55ab8ab0d57001bf11e86cf01e1dcecf`. The inspected [v2 certificate](../evidence/alternatives-screen-2026-10-05-logarithmic-spiral-certificate-v2.py) has SHA-256 `f59864eb2c20d0694a462f36868766b4073d2191099244569b9f874144778885`. These identities were measured with `shasum -a 256` before assessment. The [validation record](alternatives-screen-2026-10-05-logarithmic-spiral-validation.md) and retained v2 known/target receipts supply the subject's execution provenance.

The independently authored [rational endpoint and automatic-derivative reference](../evidence/alternatives-screen-2026-10-05-logarithmic-spiral-independent.py) has SHA-256 `7ed067dbcfc172e4feda87ebc36090ccc406dbdb9a0fec4e6319c958b113fa76`. It imports no subject code. It uses scalar alternating-series bounds and monotonicity for sine and cosine, a scalar positive exponential series with a geometric remainder, and interval automatic differentiation of the two balance expressions. This differs from the subject's direct interval polynomial evaluation and manually entered Jacobian.

The shared venv executed the independent known controls at `2026-10-05T15:43:51.344318+00:00`, before its target at `2026-10-05T15:44:03.739177+00:00`. Its controls covered signed interval multiplication and reciprocal, exact zero values, elementary nonzero trigonometric/exponential bounds, both exact zero-angle balances and their automatic derivatives, an exactly known diagonal contraction, rejection of a failed self-map, and square-root containment. The known receipt was recorded and checked by source hash before the target was permitted.

Local receipts are `.local-data/master-equation-closure/binary-research/alternatives-screen-2026-10-05-logarithmic-spiral-independent-known.json` and the matching `-target.json`. These are retained local evidence, not portable tracked inputs. The linked reference source reproduces them with the commands below.

## Cartesian equation and reduction to two balances

Write $t=1+T$, identify the plane with the complex coordinates, and set

$$
q(T)=at e^{i\omega\log t},\qquad
q'(T)=a(1+i\omega)e^{i\omega\log t},\qquad
q''(T)=\frac{a(-\omega^2+i\omega)}t e^{i\omega\log t}.
$$

Suppose $1+S=\lambda t$, with $0<\lambda<1$, and define $\delta=-\omega\log\lambda$. In the receiving axes,

$$
q(T)+q(S)=at(1+\lambda e^{-i\delta}),\qquad
L=|1+\lambda e^{-i\delta}|.
$$

The exact root equation $T-S=|q(T)+q(S)|$ is $(1-\lambda)t=atL$, hence $a=(1-\lambda)/L$. Its positive-delay chord direction is

$$
n=\frac{(1+\lambda\cos\delta,-\lambda\sin\delta)}L.
$$

For opposite polarities, the complete single-partner inverse-distance acceleration is $-n/(RD)$, where $R=(1-\lambda)t$ and $D=1+n\cdot q'(S)$. Agreement of its direction with $(-\omega^2,\omega)$ gives

$$
\lambda\omega\sin\delta=1+\lambda\cos\delta,
$$

equivalently $F_1=\omega\sin\delta-\cos\delta-e^{\delta/\omega}=0$. The certified positive angle and positive frequency make the radial/tangential ratios nondegenerate.

The source velocity, expressed in the same receiving axes, is

$$
q'(S)=a(\cos\delta+\omega\sin\delta,\ \omega\cos\delta-\sin\delta).
$$

Taking its dot product with the chord gives

$$
D=1+\frac aL(\cos\delta+\lambda+\omega\sin\delta).
$$

At a directional zero, the parenthesis equals $2\cos\delta+\lambda+1/\lambda=L^2/\lambda$. Therefore $D=1+aL/\lambda=1/\lambda$. This identity is conditional on $F_1=0$; it is not an off-root formula used to change the law.

With this $D$, radial magnitude equality is

$$
\frac{(1-\lambda)\omega^2}{L}
=\frac{\lambda(1+\lambda\cos\delta)}{L(1-\lambda)},
$$

which is precisely $F_2=(1-\lambda)^2\omega^2-\lambda(1+\lambda\cos\delta)=0$. The directional equation then supplies the remaining tangential equality. Thus the two balances establish the full Cartesian acceleration, not just a tangential residual or an orbit-shape condition.

## Audit of the subject's exact arithmetic and theorem

The subject implements closed rational intervals. Addition, negation and multiplication enclose their exact real operations; its reciprocal reverses nonzero same-sign endpoints correctly. Integer powers take the correct zero-crossing even-power case. No floating-point result enters an admission assertion.

Its exponential polynomial includes degrees zero through 80. For $|x|\le2$, its remainder $9|x|^{81}/81!$ bounds the Taylor remainder because $e^{|x|}\le e^2<9$. The elementary estimate $e<3$ follows by bounding the factorial-series tail after its first two terms by a strict geometric series. Its sine polynomial through degree 79 has remainder bounded by $|x|^{80}/80!$, and its cosine polynomial through degree 78 has remainder bounded by $|x|^{79}/79!$. These are valid, conservative real Taylor bounds. Direct interval evaluation may overestimate but does not lose containment.

The source's square-root bracket takes the integer square root of the floor of a positive rational times the square of its denominator scale. This produces a lower bracket; adding one scale unit at the upper endpoint produces an upper bracket. The explicit squared checks validate containment. Interval division denominators exclude zero throughout the target.

Differentiating the two exact balances independently gives, with $\lambda_\omega=\lambda\delta/\omega^2$ and $\lambda_\delta=-\lambda/\omega$,

$$
\partial_\omega F_1=\sin\delta+\frac{\delta}{\omega^2\lambda},\qquad
\partial_\delta F_1=\omega\cos\delta+\sin\delta-\frac1{\omega\lambda},
$$

$$
\partial_\omega F_2=2\omega(1-\lambda)^2
-2\omega^2(1-\lambda)\lambda_\omega
-\lambda_\omega(1+2\lambda\cos\delta),
$$

$$
\partial_\delta F_2=-2\omega^2(1-\lambda)\lambda_\delta
-\lambda_\delta(1+2\lambda\cos\delta)+\lambda^2\sin\delta.
$$

These agree with the subject's Jacobian. The independent instrument instead obtains derivatives through interval automatic differentiation, including evaluation of $e^{\delta/\omega}$ directly rather than as the reciprocal of an independently enclosed $\lambda$.

Let $x_0$ be the declared rational center, $\rho=10^{-10}$, and $Q=x_0+[-\rho,\rho]^2$. The rational matrix

$$
B=\begin{pmatrix}4/5&-1/2\\1/50&8/15\end{pmatrix},\qquad \det B=131/300
$$

is nonsingular. If interval row sums bound $I-BDF$ by $\ell_i<1$, then $G(x)=x-BF(x)$ has supremum-norm Lipschitz constant at most $\max_i\ell_i$. Also

$$
|G_i(x)-(x_0)_i|\le |(BF(x_0))_i|+\rho\ell_i.
$$

The strict image-radius inequalities therefore make $G$ a contraction of the closed rectangle into its interior. Completeness gives one fixed point; nonsingularity of $B$ identifies fixed points with common zeros. Every zero in the rectangle is a fixed point, so uniqueness in the entire rectangle follows as well.

Measured provenance check: `diff -u` between the original and v2 subject instruments shows only addition of the `sys` import and `sys.set_int_max_str_digits(0)`. This changes serialization capacity, not arithmetic or proof assertions. The retained v2 known receipt precedes its target receipt and both identify the declared v2 hash. The original serialization failure is not needed as evidence of any target result.

## Independent target result

The independent reference's real-function enclosures use monotonic endpoint evaluation: sine is increasing and cosine decreasing on $[0,3/2]\subset[0,\pi/2)$, and the exponential is increasing. At a scalar nonnegative argument its exponential remainder is bounded by the first omitted term divided by $1-x/62$ after degree 60. Negative exponential arguments use reciprocal bounds. For sine and cosine, consecutive alternating partial sums enclose the scalar values. Exact rational interval arithmetic propagates these enclosures and the derivatives over the full rectangle.

**Measured, with exact-rational mathematical consequences:** the independent target run proves the following conservative bounds. Decimal bounds in this table are finite rational outward bounds; no rounded floating-point comparison was used to admit the target.

| Quantity | Independently certified enclosure or upper bound |
| --- | --- |
| First row norm of $I-BDF$ | $<0.058$ |
| Second row norm of $I-BDF$ | $<0.0067$ |
| First image radius | $<5.786\times10^{-12}$ |
| Second image radius | $<6.617\times10^{-13}$ |
| $\lambda$ | $(0.61529070386,0.61529070395)$ |
| $a$ | $(0.27770576373,0.27770576382)$ |
| $a\sqrt{1+\omega^2}$ | $(0.69597695433,0.69597695460)$ |
| $1/\lambda$ | $(1.62524802274,1.62524802296)$ |
| $a\lambda$ | $(0.17086977483,0.17086977491)$ |

The image radii are strictly smaller than $10^{-10}$, and both row norms are below one. Thus the common zero exists uniquely in the frozen rectangle. Its frequency lies in $(11/5,3)$, its angle in $(0,3/2)\subset(0,\pi/2)$, its speed is below one, and its source-cut radius exceeds $0.17$. The broader advertised bounds $a\in(0.277,0.279)$, speed in $(0.695,0.697)$ and $D\in(1,2)$ follow. This is a whole-rectangle certificate, not a sampled small residual.

## Complete preparation and full root census

Let the exact certified parameters define $S_c=\lambda-1>-1$, and use the analytic spiral only for $T\ge S_c$. Its jets $q_c,v_c,a_c$ are finite there, with $|q_c|=a\lambda>0$ and $|v_c|=v<1$. The proposed positive $\eta$ obeys

$$
\eta\le1/100,\qquad
\eta\le\frac{|q_c|}{8(1+v+|a_c|)},\qquad
\eta\le\frac{1-v}{4(1+|a_c|)}.
$$

On its earlier patch, the prescribed velocity is

$$
V=v_c(3z^2-2z^3)+\eta a_c z^2(z-1),\qquad 0\le z\le1.
$$

The two polynomials have values zero at $z=0$ and values one and zero respectively at $z=1$. Their derivatives are both zero at $z=0$, while the derivatives at $z=1$ are zero and one respectively. Differentiating with $dz/dT=1/\eta$ therefore gives exactly the endpoint velocity/acceleration pairs $(0,0)$ and $(v_c,a_c)$. The integrated position matches $q_c$ at the new seam. A held earlier position matches the old seam. The acceleration is continuous and piecewise has bounded derivative, giving a complete $C^{2,1}$ history.

Since $0\le3z^2-2z^3\le1$ and $|z^2(z-1)|\le1$,

$$
|V|\le v+\eta|a_c|
\le v+\frac{(1-v)|a_c|}{4(1+|a_c|)}<1.
$$

Also

$$
|q(T)-q_c|\le\eta(v+\eta|a_c|)\le|q_c|/8.
$$

Thus the patch and held tail stay separated. The retained spiral segment has radius at least $a\lambda$, and the future radius only grows. One strict speed margin bounds the complete held tail, patch, retained spiral segment and proposed future. The preparation is imposed past data; it need not satisfy the future equation before release.

At every $T\ge0$, the proposed source $S=\lambda(1+T)-1$ satisfies $S\ge S_c$. Hence both its position and velocity are exactly those used in the balance derivation. To exclude an unaccounted source in the modified past, consider

$$
\Phi_T(S)=T-S-|q(T)+q(S)|.
$$

For $S_1<S_2\le T$ and the complete speed bound $b<1$,

$$
\Phi_T(S_1)-\Phi_T(S_2)\ge(1-b)(S_2-S_1)>0.
$$

At reception it is $-2|q(T)|<0$, and in the held remote past it tends to $+\infty$. The explicitly found partner root is therefore the unique complete root. The self inequality $|q(T)-q(S)|\le b(T-S)<T-S$ excludes every positive-delay self arrival over the entire past. This is a proof of the full census, not a rule suppressing unused roots.

At $T=0$, the source is exactly $S_c$. The patch matches its source jets, and the prescribed segment through release has the analytic spiral acceleration. The balance equations therefore match the actual received acceleration to $q''(0-)$ exactly. The complete preparation is compatible without extending the spiral through its formal singular origin at $T=-1$.

## Global ordinary uniqueness and asymptotic facts

On every finite future interval the explicit solution remains separated, its speed stays at the same strict subfield value, and the unique partner delay is $(1-\lambda)(1+T)>0$. Its transmitter factor is the positive constant $1/\lambda$. Source times are finite and lie in already supplied or generated history, with full regularity. The source equation has a simple root and locally Lipschitz state dependence; the prepared source velocity is locally Lipschitz. The usual stepwise ordinary differential argument therefore gives local uniqueness on these charts.

The analytic path satisfies that exact equation for all $T\ge0$, so any ordinary continuation from the same complete preparation agrees with it by local uniqueness and successive continuation. None of the ordinary chart boundaries occurs at finite time. This establishes the unique all-future ordinary solution for this preparation; it does not select a continuation through singular charts in other cases.

The following consequences are exact:

$$
|q(T)|=a(1+T)\longrightarrow\infty,\qquad
|q'(T)|=a\sqrt{1+\omega^2}\in(0.695,0.697),
$$

$$
\theta(T)-\theta(0)=\omega\log(1+T)\longrightarrow\infty.
$$

To check nonconvergence of Cartesian velocity explicitly, take $T_n=e^{2\pi n/\omega}-1$ and $U_n=e^{(2\pi n+\pi)/\omega}-1$. Both tend to infinity, while $q'(T_n)=a(1+i\omega)$ and $q'(U_n)=-a(1+i\omega)$. These distinct nonzero subsequential values rule out a velocity limit. Pair separation is $2a(1+T)$; the partner has exactly opposite velocity and acceleration.

## Reproduction, falsifiers and disposition

Run the independent known case before its target, using fresh output paths because the reference refuses to overwrite a receipt:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-logarithmic-spiral-independent.py --out .local-data/master-equation-closure/binary-research/alternatives-screen-2026-10-05-logarithmic-spiral-independent-known.json
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-logarithmic-spiral-independent.py --target --known .local-data/master-equation-closure/binary-research/alternatives-screen-2026-10-05-logarithmic-spiral-independent-known.json --out .local-data/master-equation-closure/binary-research/alternatives-screen-2026-10-05-logarithmic-spiral-independent-target.json
```

The scientific falsifiers are a Taylor interval failing scalar containment on its declared range; a missed Jacobian term invalidating the contraction bounds; either exact Cartesian balance failing at the certified common zero; an extra causal root under the proved complete speed margin; a patch jet or separation estimate failing; or two distinct ordinary futures from this same complete regular history. A different fate for another preparation or instability of this spiral would not refute the accepted existence result.

Measured repository validation: `git diff --no-index --check /dev/null` returned no whitespace diagnostics for each new authored file, and repeated `shasum -a 256` returned the frozen formulation, subject certificate and independent-reference identities recorded above. Whitespace and hash checks establish repository facts only; the mathematical evidence is the reconstruction and independent exact-arithmetic certificate.

Only this new assessment, the separate independent reference and its two local receipts are written by this review. The subject, its certificates and receipts, previous references, production solver, shared manuscripts, registries and priority owners are unchanged by these writes. No publication or regeneration is performed. Both independent runs completed in the foreground; no owned process remains active. This bounded review is complete and returns integration to the principal investigator.
