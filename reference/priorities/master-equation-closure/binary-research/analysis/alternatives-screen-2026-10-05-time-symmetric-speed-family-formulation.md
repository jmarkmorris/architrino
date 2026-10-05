# Time-symmetric circle speed family: frozen periodic-boundary formulation

Status: new subject derivation, 2026-10-05; Poincare analytical lens. Fixed Section 14 equal past/future canonical radial law, alpha one half, K and wake speed one. This file concerns the complete Cartesian fixed-physical-period boundary kernel at each exact circle, not causal dynamical stability or nonlinear bifurcation. Previous beta one-half references remain unchanged.

The exact circle family and Cartesian row derivative are in [the frozen binary source](alternatives-screen-2026-10-05-binary.md), Sections 5, 8 and 13. Write $x=\beta\cos x$, $c=\cos x$, $s=\sin x$, $D=1+\beta s$, $R=(4\beta^2cD)^{-1}$ and $\omega=\beta/R$. Thus $0<x<x_*<3/4$, where $x_*=\cos x_*$. Complete strict subfield periodic histories have one partner root in each time direction, no noninstantaneous self roots, and strictly positive transmitter denominators. Small Cartesian periodic perturbations preserve that census by the uniform speed margin.

For the future row, resolve its dimensionless position tensor in the orthonormal source-ray basis $n=(c,s)$, $t=(-s,c)$:

$$
M/\omega^2=\alpha nn^{\mathsf T}+\gamma(nt^{\mathsf T}+tn^{\mathsf T})+\zeta tt^{\mathsf T},\quad N/\omega=\kappa nn^{\mathsf T},
$$

$$
\alpha=\frac1{c^2D}+\frac{\beta^2}{2D^2},\quad \gamma=-\frac{\beta}{2cD},\quad \zeta=-\frac1{2c^2},\quad \kappa=\frac{\beta}{cD}=-2\gamma.
$$

This follows from $B=I-vn^{\mathsf T}/D$ and the full shifted-source velocity derivative, including the source acceleration term. In the $(n,t)$ basis, $B$ has entries $(1/D,0;\beta c/D,1)$; the radial-row tensor bracket is $(-2/D-\beta^2c^2/D^2,\beta c/D;\beta c/D,1)$. The past tensor is the reflection of $M$ and the negative reflection of $N$.

Set

$$
A=\alpha c^2+\kappa cs+\zeta s^2,\quad C=\alpha s^2-\kappa cs+\zeta c^2,
$$

$$
U=\alpha c^2-\zeta s^2+\kappa cs,\quad V=-\alpha s^2+\zeta c^2+\kappa cs,\quad W=(\alpha+\zeta)cs+\gamma\cos(2x).
$$

For exchange parity $\chi=+1$ (common displacement) or $-1$ (opposite displacement), rotating-frame Fourier index $m\in\mathbb Z$, and $z=2mx$, the dimensionless planar block is

$$
H_{\chi,m}=\begin{pmatrix}a&i f\\-i f&d\end{pmatrix},
$$

$$
\begin{aligned}
a&=-m^2-1-A+\chi[U\cos z+m\kappa c^2\sin z],\\
d&=-m^2-1-C+\chi[V\cos z-m\kappa s^2\sin z],\\
f&=-2m+\chi[-W\sin z+m\kappa cs\cos z].
\end{aligned}
$$

Its determinant is $ad-f^2$. This is obtained from averaging $(M Q-N Q(imI+J))\exp(\pm2imx)$, with the correctly reflected $M,N,Q$. Exact Euclidean modes require common $m=1$ and opposite $m=0$ to be rank one, subject to a nonzero complementary entry. Negative Fourier indices are conjugates. Every other planar zero would be an additional fixed-period Cartesian boundary mode.

The normal common sector has only $m=0$: $(mx)^2=\beta^2\sin^2(mx)$ excludes nonzero indices. The normal opposite sector has only $m=\pm1$: $m^2c^2=\cos^2(mx)$ and $c>\cos(3/4)>7/10$ exclude $|m|\ge2$, while $m=0$ fails. This is analytic, with no scan.

## Numerical protocol frozen before target

Any numerical target in the first bounded experiment is restricted to $x\in[0,3/4]$ in the displayed analytic continuation, and planar modes $m=0,1,2,3,4,5,6$. The continuation slightly beyond $x_*$ is only an enclosure convenience; only $x/\cos x<1$ represents the selected physical family. A scalar-block instrument must first pass the exact zero-speed limit (common determinant $(m^2-1)^2$, opposite determinant $m^2(m^2-1)$) and the independent Euclidean symmetry identities at nonzero rational angles. Initial target evaluations are restricted to the two angles $x=1/2$ and $7/10$; these are a diagnostic to select proof routes, never an exclusion by sampling. Any interval subdivision proof will cover explicitly declared complete intervals, not promote point samples.

Falsifiers: an omitted source-clock term in the displayed tensor; failure of the exact symmetry identities; a nonzero normal mode satisfying the scalar equations; any exact additional planar determinant zero within the declared physical family. A numerical discrepancy must be checked against the original Cartesian row before interpretation.

## Complete interval certificate protocol, frozen before its target on 2026-10-05

The proposed reference will independently assemble the Cartesian tensor before Fourier averaging, importing only unchanged rational interval arithmetic. It will certify every nonsymmetry block $m=2,3,4,5$ in both parities on the entire angle interval $[0,3/4]$ using 512 closed equal cells. It will separately certify the normalized opposite $m=1$ determinant on that same complete interval. The normalization is analytic, not numerical division by a small determinant:

$$
\det H_{-,1}=\frac{s^2}{c^4D^2}\,P,\quad
P=r^2c^2(1-8s^2c^2)-2r(1-2s^2)(3-4s^2)+2(3-4s^2),\quad r=\frac1{c\operatorname{sinc}x}.
$$

Here $\operatorname{sinc}0=1$, so $P(0)=1$ and the zero-speed endpoint is included without a singular interval division. The equality follows by expanding $ad-f^2$; a symbolic factorization check was calibrated on $x^2-1$ before this target algebra and then returned this polynomial. Its proof remains the checkable polynomial identity, not a software authority.

The other finite exceptional blocks have exact signs:

$$
H_{+,0;11}=-\frac{\cos2x}{c^2},\qquad H_{+,0;22}=-\frac{2\beta s^3+s^2+1}{c^2D^2},
$$

$$
H_{-,0;11}=-\frac{2\beta^2s^2+\beta^2+6\beta s+3}{D^2},\qquad H_{-,0;22}=0,
$$

$$
H_{+,1;11}=H_{+,1;22}=f_{+,1}=-\frac{2\beta^2s^4+\beta^2s^2+4\beta s^3+2\beta s+s^2+2}{D^2}<0.
$$

Thus common zero frequency is invertible, opposite zero frequency has exactly its phase null vector, and common first frequency has exactly its translation null vector.

For every physical speed below one, $c>7/10$, $1\le D<2$, and the ray-basis symmetric tensor satisfies $\|M/\omega^2\|\le319/98$, while $\|N/\omega\|\le10/7$. Consequently

$$
\|H_{\chi,m}+m^2I\|\le\frac{24}{7}|m|+\frac{438}{49}<m^2\quad(|m|\ge6).
$$

This excludes the entire higher planar Fourier tail by a norm-convergent inverse. The exact norm estimate uses $\alpha\ge|\zeta|$ (because $D<2$), the maximum absolute row sum in the orthonormal ray basis, and $\|imI+J\|\le|m|+1$. The certificate therefore has a finite, predetermined coverage obligation. It first must pass zero-speed exact determinants, rational trigonometric bounds, and exact translation/phase null-vector controls at rational nonzero angles. A failure will be recorded rather than converted into a root claim.
