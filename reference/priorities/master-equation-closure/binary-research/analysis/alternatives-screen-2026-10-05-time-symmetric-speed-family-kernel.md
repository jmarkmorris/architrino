# Six Euclidean periodic kernel directions throughout the strictly subfield time-symmetric circle family

Status: derived theorem with exact rational interval finite-mode evidence, 2026-10-05; awaiting independent assessment by the coordinating investigator. The Poincare lens organizes the analysis and supplies no premise. The selected law is [Section 14's equal past/future canonical radial response](../../equation-variants/manuscript.md#14-time-symmetric-direct-interaction), with $\alpha=1/2$, $K=c_f=1$, complete two-label opposite-polarity histories, and every ordinary self/partner source retained. No response coefficient is varied. Speed parameterizes different exact solutions of this one equation.

## Theorem and boundary space

**Derived, with the finite interval certificate below.** For every $0<\beta<1$, let

$$
x=\beta\cos x,\quad R=\frac1{4\beta^2\cos x(1+\beta\sin x)},\quad \omega=\frac\beta R,
\qquad X_\pm(T)=\pm R(\cos\omega T,\sin\omega T,0).
$$

In the complete Cartesian space $C^2_{\mathrm{per}}([0,2\pi/\omega];\mathbb R^6)$ at this fixed physical period, the linearized boundary operator has exactly six real kernel directions: the three translations and the three rigid rotations of the complete binary path. This includes all exchange-even, exchange-odd and out-of-plane perturbations. No additional fixed-period infinitesimal boundary mode occurs anywhere in the strictly subfield circle family.

This is a boundary nondegeneracy theorem. It asserts neither causal evolution stability, a nonlinear bifurcation classification, nor nonlinear fate. It does not vary the period while defining the kernel. The known nonlinear local-isolation proof at speed one half remains a separate frozen result; no shared owner is updated here. Uniformly sized neighborhoods as $\beta\to0$ or $\beta\to1$ are not asserted.

## Complete sources and linearization

For any complete periodic path with speed bounded strictly below one, its self-chord is strictly shorter than every nonzero time difference. Thus there is no noninstantaneous self root in either time direction. For distinct separated labels, $\tau-|X_i(T)-X_j(T\pm\tau)|$ is strictly increasing, begins negative, and tends to positive infinity. There is exactly one partner root on each side, with denominator at least the positive subfield margin. This argument covers the complete real time axis, not a finite source window. A sufficiently small $C^1$ periodic neighborhood of each individual circle preserves separation and this census.

At the circle, the delay is $\tau=2x/\omega=2R\cos x$ and $D_\pm=1+\beta\sin x$. The increasing map $\beta=x/\cos x$ bijects $(0,x_*)$ with $(0,1)$, where $x_*=\cos x_*$. The alternating upper bound for $\cos(3/4)$ gives $x_*<3/4$, and $\cos x>7/10$ throughout the physical range.

The [frozen formulation](alternatives-screen-2026-10-05-time-symmetric-speed-family-formulation.md) derives the full source-clock, source-position, source-velocity and shifted-source-acceleration terms. In particular

$$
\delta S=\frac{\varepsilon n\cdot(\eta_i-\eta_j)}{D_\varepsilon},\qquad
\delta X_j'(S)=\eta_j'(S)+X_j''(S)\delta S.
$$

The second term here is essential. The fixed physical velocity, not a coordinate-frame derivative alone, is varied. In the rotating representation $\eta_i(T)=Q(\omega T)u_i(\omega T)$, physical differentiation becomes $\omega(\partial_\theta+J)u_i$. Translation and inversion covariance separate the exchange parities, and the planar reflection separates normal from planar variation. These are direct decompositions of all six Cartesian components; no mirror restriction is imposed on the perturbation.

The resulting dimensionless planar blocks are the Hermitian matrices $H_{\chi,m}$ displayed in the formulation. Its algebraic derivation also shows why the determinant is real: the two time directions pair as reflected complex conjugates. Fourier coefficients of every classical periodic kernel vector satisfy these blocks. Conversely each block null vector reconstructs a smooth kernel vector. Negative indices are conjugates, so no mode enumeration is omitted by evaluating nonnegative indices.

## Analytic normal sector and exceptional planar blocks

For common normal displacement, the equation is $(mx)^2=\beta^2\sin^2(mx)$. Since $\beta<1$ and $|\sin y|\le|y|$, only $m=0$ remains. For opposite normal displacement, $m^2\cos^2x=\cos^2(mx)$; $m=0$ fails, $m=\pm1$ are the rigid tilts, and $|m|\ge2$ is impossible because $4(7/10)^2>1$. Thus the normal kernel has three real dimensions at every speed.

The common planar $m=0$ block is diagonal and strictly negative because its entries are

$$
-\frac{\cos2x}{\cos^2x},\qquad -\frac{2\beta\sin^3x+\sin^2x+1}{\cos^2x(1+\beta\sin x)^2}.
$$

Here $2x<3/2<\pi/2$. The opposite planar $m=0$ block has exactly one zero entry, its tangential phase entry, and its radial entry is strictly negative. The common planar $m=1$ block has entries $(h,ih;-ih,h)$ with $h<0$, so its complex nullity is exactly one. These exact formulas and signs are in the formulation. They give one real axial-rotation direction and two real planar-translation directions.

The remaining exceptional block, opposite planar $m=1$, is nonsingular for every $x>0$ because

$$
\det H_{-,1}=\frac{\sin^2x}{\cos^4x(1+\beta\sin x)^2}P(x),
$$

and the certificate proves $P(x)>811/1000$ throughout $[0,3/4]$. The normalized expression uses $1/(\cos x\operatorname{sinc}x)$ and has the exact removable value $P(0)=1$. This positive uniform factor is crucial: point checks away from zero could not exclude an accumulating sequence of extra modes as speed tends to zero. The determinant itself tends to zero there; the excluded endpoint is a degenerate limit, not an additional positive-speed circle.

## Analytic infinite Fourier tail

In the orthonormal source-ray basis, the dimensionless position tensor is symmetric with entries $(\alpha,\gamma;\gamma,\zeta)$ as given in the formulation. Since $D<2$, $\alpha\ge|\zeta|$. The bounds $\cos x>7/10$, $\beta<1$ and $D\ge1$ give

$$
\|M/\omega^2\|\le\alpha+|\gamma|\le\frac{319}{98},\qquad
\|N/\omega\|\le\frac{10}{7}.
$$

Averaging the two time directions and multiplying by unitary Fourier phases or real rotation matrices do not increase these norms. Hence

$$
H_{\chi,m}=-m^2 I+E_{\chi,m},\qquad
\|E_{\chi,m}\|\le2|m|+1+\frac{319}{49}+\frac{10}{7}(|m|+1)
=\frac{24}{7}|m|+\frac{438}{49}.
$$

For every integer $|m|\ge6$ this is strictly less than $m^2$. The geometric-series inverse proves invertibility for the entire remaining tail, uniformly over the physical speed range. No numerical truncation substitutes for this step.

## Independent finite-mode certificate

The [Cartesian interval reference](../evidence/alternatives-screen-2026-10-05-time-symmetric-speed-family-interval.py) was authored separately from the [scalar-block subject instrument](../evidence/alternatives-screen-2026-10-05-time-symmetric-speed-family-scalar.py). It does not import the scalar formula implementation. For $m=2,3,4,5$ it assembles the original Cartesian $B$, ray projector, shifted-source tensor, source-velocity tensor, rotating physical derivative and both time directions, then takes the complex $2\times2$ determinant. Only unchanged outward-rounded rational interval arithmetic is imported from the [earlier independent arithmetic source](../evidence/alternatives-screen-2026-10-05-independent-circle.py). The normalized first-mode polynomial is separately evaluated and compared with original Cartesian assembly in its known controls.

Trigonometric enclosures evaluate the scalar Taylor polynomial at the interval midpoint, add the Taylor remainder with the global unit derivative bound, and add the half-width using the unit Lipschitz bound. The sinc enclosure uses its alternating even-power series with the first omitted term as a uniform bound on $[0,3/4]$. Arithmetic rounds outward to a rational grid of step $10^{-45}$. The proof does not depend on floating trigonometry, floating singular values or decimal display rounding.

**Measured known-first record.** At 17:01:10 UTC on 2026-10-05, the reference passed exact zero-speed determinants for both parities and $m=0,\ldots,5$, rational alternating sine/cosine bounds, $P(0)=1$, the exact Euclidean null vectors at three nonzero rational angles, and comparison of the normalized first-mode determinant with independently assembled Cartesian tensors. The earlier scalar subject passed its own zero-speed and Euclidean controls at 16:57:42 UTC before its two frozen diagnostic points. Those floating point diagnostics played no exclusion role.

**Measured complete interval record.** The reference target finished at 17:02:14 UTC, after 52.464 measured elapsed seconds. It covered exactly the 512 closed intervals

$$
\left[\frac{3j}{2048},\frac{3(j+1)}{2048}\right],\qquad j=0,\ldots,511,
$$

and returned no failed cell. This covers all of $[0,3/4]$, hence every physical circle angle. The following are conservative rational lower bounds, weaker than the exact retained receipt bounds:

| Planar parity | Fourier index | Strict determinant lower bound |
| --- | ---: | ---: |
| Opposite | 2 | $11$ |
| Opposite | 3 | $63$ |
| Opposite | 4 | $211$ |
| Opposite | 5 | $548$ |
| Common | 2 | $5$ |
| Common | 3 | $61$ |
| Common | 4 | $220$ |
| Common | 5 | $568$ |

The normalized first-mode factor has retained exact lower bound greater than $811/1000$. The smallest finite determinant lower bound is greater than $5.07156$. Each bound holds on every covered cell, not merely at its center or endpoints. Extending the interval slightly past the physical endpoint is an enclosure convenience; it does not assert a superfield source census.

Combining these finite exclusions, the exact exceptional modes, the normal proof and the infinite tail gives exactly six real Euclidean directions and no others. This is the claimed complete fixed-period kernel theorem.

## Provenance, reproduction and falsifiers

Local receipts are retained under the existing ignored owner `.local-data/master-equation-closure/binary-research/`, with prefixes `alternatives-screen-2026-10-05-time-symmetric-speed-family-scalar-` and `alternatives-screen-2026-10-05-time-symmetric-speed-family-interval-`, each ending in `known.json` or `target.json`. These are local provenance; the linked source instruments are the durable reproducers. Commands, in mandatory order, are:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-time-symmetric-speed-family-interval.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-time-symmetric-speed-family-interval.py target
```

The instrument refuses to overwrite existing receipts; an independent rerun must retain its receipts under a disjoint owner or filename, without changing the frozen mathematical subject and reference together. No new regular test suite, production evolution solver or generated artifact was introduced.

Hashes measured by `shasum -a 256` over the named files:

| Source | SHA-256 |
| --- | --- |
| Frozen formulation | `40f8721c7155d10537f1665a4626abb4b1ade9ae866a2c16dc61163ac1c6c753` |
| Scalar subject instrument | `dac5c3a9d5b58645addb633c0dae18c1d7edeab5d48132a7ea39e8ce064c8603` |
| Independent Cartesian interval reference | `43c7da211120330a76f1e8030d9b211667845329d807df08f61e77e4135ee01b` |
| Unchanged imported rational arithmetic | `874c3db24a7f5a12f640b8c6b4a30b32c5b453fabd550f3b9478a744781c9c03` |
| Earlier binary source | `9362c263573002225ecf47258ebdd37a5a9ccfb5ccd4af4d787a060ff1de47a3` |

Falsifiers are concrete: a missing ordinary source in a complete strictly subfield periodic history; a disagreement between the differentiated source clock/velocity and the displayed Cartesian row; an incorrect polynomial identity for the normalized first block; an interval arithmetic or Taylor remainder operation that fails to enclose its exact argument; a failed cell in an independent Cartesian enclosure; or an exact nonsymmetry Fourier null vector contradicting the listed finite exclusions or tail estimate. The report makes no all-frequency causal spectrum claim for anyone to infer from the absence of periodic zeros.

Only four newly named subject/evidence files were authored for this assignment: this theorem, the formulation, the scalar diagnostic and the Cartesian interval reference. Previous subjects, references, manuscript owners, priority lists and shared ledgers were left untouched by this assignment. The foreground certificate exited successfully; no owned process remains. Scoped whitespace checking and source hashes are reported to the coordinating investigator separately. Independent assessment is the remaining acceptance step, not a missing piece of the stated mathematical coverage.
