# Independent assessment of the strictly subfield circle-family kernel

## Scope and frozen verdict

Claim grade: derived, using the exact interval evidence audited below. The [subject theorem](alternatives-screen-2026-10-05-time-symmetric-speed-family-kernel.md) is supported: at every fixed speed $0<\beta<1$, the complete Cartesian linearized boundary operator at the circle's own physical period has exactly the six real Euclidean symmetry directions in its kernel. The assessment reconstructs the physical variation, reduces the exceptional algebra independently, checks the finite enclosure implementation, and accounts for every Fourier index. This verdict concerns periodic boundary nondegeneracy only. It neither identifies a causal release nor establishes stability, attraction, nonlinear classification, or an endpoint-uniform inverse bound.

The equation is the explicitly selected [equal past/future radial comparison](../../equation-variants/manuscript.md#14-time-symmetric-direct-interaction), with $\alpha=1/2$, $K=c_f=1$, opposite labels and complete all-time paths. Every ordinary self and partner source belongs to the equation. No observer-level force law, mass, additional response factor, or singular-event rule enters the proof. The subject and both its scalar and Cartesian instruments remained unchanged during this assessment. A subsequent nonlinear investigation must cite this frozen verdict separately rather than change its scope.

## Physical clocks and full Cartesian variation

Put $S=T+\varepsilon r$, where $\varepsilon=-1$ or $+1$ selects the past or future root, $r=|X_i(T)-X_j(S)|$, $n=(X_i-X_j)/r$, $v=X_j'(S)$, $a=X_j''(S)$ and $D=1+\varepsilon n\cdot v$. For a path variation $\eta$, define $d=\eta_i(T)-\eta_j(S)$; the source variation here is evaluated at the unperturbed source clock. Differentiating the root equation, with reception time held fixed, gives

$$
\delta S=\varepsilon n\cdot(d-v\delta S)
=\frac{\varepsilon n\cdot d}{D},\qquad
\delta\mathbf r=Bd,\qquad B=I-\frac{\varepsilon vn^{\mathsf T}}D.
$$

The source velocity changes by $\eta_j'(S)+a\delta S$. With $P=I-nn^{\mathsf T}$, this implies

$$
\delta D=\varepsilon\left[\frac{v\cdot PBd}{r}+n\cdot\eta_j'(S)+(n\cdot a)\delta S\right].
$$

Differentiation of the opposite-polarity row $-n/(r^2D)$ therefore yields $\delta A=M d+N\eta_j'(S)$, with

$$
M=-\frac1{r^3D}\left[(I-3nn^{\mathsf T})B-\frac{\varepsilon nv^{\mathsf T}PB}{D}-\frac{r(n\cdot a)nn^{\mathsf T}}{D^2}\right],\qquad
N=\frac{\varepsilon nn^{\mathsf T}}{r^2D^2}.
$$

These signs follow directly from the differentiated clock. In particular the last term inside the bracket has a minus sign and retains the acceleration shift. Removing it would change the operator under assessment.

At the circle, write $x=\beta\cos x$, $c=\cos x$, $s=\sin x$, $D=1+\beta s$, $R=(4\beta^2cD)^{-1}$ and $\omega=\beta/R$. The partner range is $2Rc$, the source angle is $\varepsilon2x$, and $r(n\cdot a)=2\beta^2c^2$. Radial balance gives $1/(r^3D\omega^2)=1/(2c^2)$; thus the nondimensional coefficients used in the subject are obtained from the physical derivative, without changing the equation.

For the future source ray $n=(c,s)$ and its perpendicular unit vector $t=(-s,c)$, the reconstructed tensor is

$$
\frac M{\omega^2}=\alpha nn^{\mathsf T}+\gamma(nt^{\mathsf T}+tn^{\mathsf T})+\zeta tt^{\mathsf T},\qquad
\frac N\omega=\kappa nn^{\mathsf T},
$$

$$
\alpha=\frac1{c^2D}+\frac{\beta^2}{2D^2},\quad
\gamma=-\frac\beta{2cD},\quad
\zeta=-\frac1{2c^2},\quad
\kappa=-2\gamma.
$$

Here $\alpha,\gamma,\zeta$ are tensor coefficients; this $\alpha$ is local tensor notation, not a varied past/future mixing weight. The past position tensor is the reflection across the radial axis; its velocity tensor has the additional minus sign from $\varepsilon$. The exact algebra instrument described below independently verifies the Cartesian-to-ray identity modulo $c^2+s^2=1$.

Complete-source coverage follows before spectral decomposition. If both speeds are bounded by $v_*<1$, every nonzero self chord is shorter than its time interval. Each partner root function $g(\tau)=\tau-|X_i(T)-X_j(T+\varepsilon\tau)|$ has derivative at least $1-v_*>0$, begins negative for separated labels and tends to infinity. Consequently each side has exactly one partner root, no noninstantaneous self root and $D\ge1-v_*$. Small $C^1$ periodic neighborhoods preserve the strict speed and separation margins. A finite source-window argument is unnecessary.

## Reconstruction of the Fourier blocks

Let $Q(\theta)$ rotate the plane by $\theta$, and $J=\left(\begin{smallmatrix}0&-1\\1&0\end{smallmatrix}\right)$. In $\eta_i(T)=Q(\omega T)u_i(\omega T)$, physical differentiation acts as $\omega(\partial_\theta+J)$. Exchange-even perturbations satisfy $u_j=u_i$ and exchange-odd perturbations satisfy $u_j=-u_i$; these sectors together span the unrestricted two-label planar space. Reflection in the circle plane separates the two normal components. No antipodal restriction is imposed on general perturbations.

For the Fourier vector $u_i(\theta)=u e^{im\theta}$ and exchange sign $\chi=\pm1$, the physical residual divided by $\omega^2$ is

$$
H_{\chi,m}=(imI+J)^2-\frac12\sum_{\varepsilon=\pm1}\frac{M_\varepsilon}{\omega^2}
+\frac\chi2\sum_{\varepsilon=\pm1}\left[\frac{M_\varepsilon}{\omega^2}Q(\varepsilon2x)-\frac{N_\varepsilon}{\omega}Q(\varepsilon2x)(imI+J)\right]e^{i\varepsilon2mx}.
$$

This establishes the source-velocity sign in the block directly. For the future side, $NQ/\omega=\kappa\left(\begin{smallmatrix}c^2&-cs\\cs&-s^2\end{smallmatrix}\right)$ and $MQ/\omega^2-NQJ/\omega=\left(\begin{smallmatrix}U&-W\\W&V\end{smallmatrix}\right)$, where $U=\alpha c^2-\zeta s^2+\kappa cs$, $V=-\alpha s^2+\zeta c^2+\kappa cs$ and $W=(\alpha+\zeta)cs+\gamma\cos2x$. The diagonal entries of the averaged $M/\omega^2$ are $A=\alpha c^2+\kappa cs+\zeta s^2$ and $C=\alpha s^2-\kappa cs+\zeta c^2$. Pairing the reflected time directions gives exactly

$$
H_{\chi,m}=\begin{pmatrix}a&if\\-if&d\end{pmatrix},\quad
\begin{aligned}
a&=-m^2-1-A+\chi[U\cos(2mx)+m\kappa c^2\sin(2mx)],\\
d&=-m^2-1-C+\chi[V\cos(2mx)-m\kappa s^2\sin(2mx)],\\
f&=-2m+\chi[-W\sin(2mx)+m\kappa cs\cos(2mx)].
\end{aligned}
$$

All entries $a,d,f$ are real. The determinant is therefore $ad-f^2$, and negative indices supply complex conjugates rather than missing sectors. Fourier uniqueness for continuous periodic functions shows that excluding all other coefficients excludes every classical periodic kernel vector; no convergence assertion for a differentiated pointwise Fourier series is needed.

## Exceptional modes, complete finite cover and infinite tail

The normal common-displacement equation is $(mx)^2=\beta^2\sin^2(mx)$ and has only $m=0$, since $\beta<1$. The opposite-displacement equation is $m^2c^2=\cos^2(mx)$; its only indices are $m=\pm1$, because $c>7/10$ excludes $|m|\ge2$ and $m=0$ fails. These give vertical translation and two rigid tilts, respectively.

For the planar exceptions, the independent rational reduction confirms all three displayed exceptional matrices in the [formulation](alternatives-screen-2026-10-05-time-symmetric-speed-family-formulation.md): common $m=0$ is negative definite, opposite $m=0$ has precisely its tangential null vector, and common $m=1$ is $\left(\begin{smallmatrix}h&ih\\-ih&h\end{smallmatrix}\right)$ with $h<0$. The signs use $2x<3/2<\pi/2$, $D>0$ and the positive terms in the complementary entries. Their real null vectors give axial rotation and two planar translations.

The potentially delicate opposite $m=1$ determinant is exactly

$$
\det H_{-,1}=\frac{s^2}{c^4D^2}P(x),\qquad
P=r_0^2c^2(1-8s^2c^2)-2r_0(1-2s^2)(3-4s^2)+2(3-4s^2),\qquad
r_0=\frac1{c\operatorname{sinc}x}.
$$

The review instrument constructs the original Cartesian rows and reduces the numerator of this identity modulo $c^2+s^2-1$, with $r_0=\beta/s$. Multiplication by $s^2$ before reduction removes an artificial singularity; substituting $\beta=x/c$ then gives the displayed sinc formula. The resulting remainder is exactly zero. The exact value $P(0)=1$ permits a complete closed enclosure including zero, while $s^2>0$ on every actual positive-speed circle. Thus the small determinant near zero cannot hide an omitted positive-speed exceptional mode.

The frozen reference's interval operations enclose rational inputs by outward rounding on a grid of step $10^{-45}$. Addition, negation and the four endpoint products enclose the corresponding real operation; reciprocal division rejects any interval containing zero and encloses the reciprocal by reversed endpoints. Every denominator encountered in the certificate stays positive. The trigonometric routine evaluates the scalar Taylor polynomial at the exact interval midpoint, bounds its remainder by $|\text{mid}|^{d+1}/(d+1)!$, and then adds the interval half-width, using the unit Lipschitz constant of sine and cosine. The sinc routine encloses its even-power polynomial by interval arithmetic and adds the next alternating term as a uniform remainder on $[0,3/4]$. These are valid enclosures, including the larger Fourier arguments. Decimal displays are never used in comparisons.

The finite certificate covers the adjacent closed cells $[3j/2048,3(j+1)/2048]$, $0\le j<512$. Their union is $[0,3/4]$, which contains the entire physical angle interval because $\cos(3/4)<3/4$. The reference encloses the Cartesian determinant for each $m=2,3,4,5$ and both signs $\chi$, and separately encloses $P$. The real determinant lower endpoint being positive excludes a zero even without consulting its imaginary enclosure; analytically the determinant is real by the block calculation above. Extension beyond the physical endpoint is used only to enclose formulas and does not extend the root census to superfield motion.

The analytic tail closes the infinite coverage. Since $D<2$, $\alpha\ge|\zeta|$, and therefore the symmetric ray tensor obeys $\|M/\omega^2\|\le\alpha+|\gamma|\le100/49+1/2+5/7=319/98$. Also $\|N/\omega\|\le10/7$. It follows that

$$
\|H_{\chi,m}+m^2I\|\le2|m|+1+\frac{319}{49}+\frac{10}{7}(|m|+1)=\frac{24}{7}|m|+\frac{438}{49}<m^2\quad(|m|\ge6).
$$

The strict inequality holds at six and its difference increases thereafter. The inverse follows by the convergent geometric series for $I-E/m^2$. The excluded normal modes, exceptional planar blocks, finite modes two through five and this tail exhaust the Cartesian periodic boundary problem. They leave exactly six real directions, all Euclidean.

## Review evidence and provenance

The disjoint [review instrument](../evidence/alternatives-screen-2026-10-05-time-symmetric-family-adjudication.py) passed its known controls before either target. Its controls include exact circle-polynomial reduction, difference-of-squares factorization, the imported arithmetic controls and the frozen reference controls. The algebra target is separately assembled from the physical Cartesian derivative. The interval target replays the unchanged reference under new output names: this verifies reproducibility and is not described as a second independent enclosure implementation. Mathematical independence in this assessment comes from the reconstructed physical derivative and block/tail arguments; the finite numerical certificate remains the audited rational Cartesian reference.

Measured by the review instrument under the mandatory shared virtual environment, known controls passed at 17:12:54 UTC and the exact algebra target passed at 17:13:09 UTC on 2026-10-05. Receipts are local provenance under `.local-data/master-equation-closure/binary-research/alternatives-screen-2026-10-05-time-symmetric-family-adjudication-`, ending in `known.json`, `algebra.json` and `interval.json`. The tracked instrument is the durable reproducer. Run `known`, then `algebra` and `interval`, using disjoint receipt names for any subsequent rerun; the program refuses to overwrite existing receipts.

Measured by the same review instrument, the complete interval replay passed at 17:14:31 UTC after 59.404 seconds for its target: all 512 closed cells passed, the retained exact lower bound for $P$ is $202885930491274325811381746800770717676289861/250000000000000000000000000000000000000000000>811/1000$, and the smallest retained finite determinant lower bound is greater than $5.07156$. The eight exact determinant lower endpoints match the frozen target receipt. The scalar diagnostic's floating values play no role in the exclusion. This successful completed replay closes the evidence needed for the verdict above; it does not strengthen that verdict into a nonlinear assertion.

The source hashes were measured by `shasum -a 256` on these exact files before assessment:

| Frozen source | SHA-256 |
| --- | --- |
| Kernel theorem | `d9b643565d9682fad07df0476f8a6802d0de254b850f570ad4021d930a996c80` |
| Formulation | `40f8721c7155d10537f1665a4626abb4b1ade9ae866a2c16dc61163ac1c6c753` |
| Scalar diagnostic | `dac5c3a9d5b58645addb633c0dae18c1d7edeab5d48132a7ea39e8ce064c8603` |
| Cartesian interval reference | `43c7da211120330a76f1e8030d9b211667845329d807df08f61e77e4135ee01b` |
| Imported arithmetic | `874c3db24a7f5a12f640b8c6b4a30b32c5b453fabd550f3b9478a744781c9c03` |
| Review instrument | `b033cdd0679139f073f225a20febdeb21edd2ee3d581fe3c2a57e911e9f4b334` |

Falsifiers are a clock derivative that contradicts the displayed calculation; a nonzero remainder in one of the exact identities; an arithmetic operation or remainder bound that fails to enclose its input; a failed finite cell; a Fourier index outside the explicit coverage; or a nonsymmetry null vector in a listed block. Endpoint degeneracy, a distant-period solution and a formal nonperiodic exponential are outside the theorem and do not falsify this fixed-period statement. No unresolved mathematical obstruction was found within the stated coverage.
