# Logarithmic Potentials, Reference Levels, and Spherical Wake Accounting

## The proposed scalar and its scope

A pair of opposite logarithmic potentials is a mathematically coherent comparison model. Its zero crossing specifies a reference level; its logarithmic shape specifies potential differences between scales. Those statements have different physical content. The discussion below derives consequences of the proposed scalar and identifies candidate interpretations without changing the Master Equation or asserting an electromagnetic recovery.

Let $r>0$ be distance from a source, $r_0>0$ a reference length, $A>0$ a potential amplitude, and $s\in\{+1,-1\}$ a source-polarity label. Write

$$
\phi_s(r)=sA\ln\!\left(\frac{r}{r_0}\right).
$$

The ratio inside the logarithm is dimensionless. Writing $\ln r$ suppresses a chosen length unit or reference; the numerical statement $r=1$ is meaningful only after that choice. The amplitude has the units of the proposed scalar. It acquires units of squared speed only if the scalar is defined to generate acceleration through a gradient.

This is a proposed radial law or an effective comparison, not another gauge of the current primitive kernel. The [Master Equation's moving-single-root scalar](../../../../../content/markdown/aaa/dynamics/master-equation.md#superposition-and-local-wake-geometry) is already derived on a connected regular receiver chart with retained transmitter histories and causal-root selections fixed, while the selected emission times vary smoothly with receiver position. It has the form $\Phi_b=C_b\operatorname{sgn}(D_b)/r_b$ and satisfies $-\nabla\Phi_b=\mathbf A_b$. For a stationary transmitter, $D_b=c_f$, giving the current inverse-square acceleration. A logarithmic scalar with the same gradient-response interpretation would instead give inverse-distance acceleration. Neither local scalar representation establishes a global action or energy account.

## Radial comparison with electrostatic multipoles

The first row gives the proposed logarithmic scalar's exact radial dependence and gradient magnitude for $r>0$. The remaining rows are derived comparisons within ordinary three-dimensional Coulomb electrostatics, using charges at equally spaced sites along a line. Their leading powers follow from cancellation of successive moments, as shown in the [electrostatic multipole derivation](../../../mapping-electromagnetism/analysis/electrostatic-multipole-falloff.md#construction-at-arbitrary-order).

| Configuration—charges equally spaced along a line | Leading multipole or symmetry | Potential radial dependence | Electric-field / gradient falloff |
| --- | --- | --- | --- |
| Single signed source with the proposed logarithmic kernel | Spherical symmetry; changed kernel | $\pm A\ln(r/r_0)$ | $A/r$ (gradient magnitude) |
| $q$ | Monopole | $1/r$ | $1/r^2$ |
| $-q,\;+q$ | Dipole | $1/r^2$ | $1/r^3$ |
| $q,\;-2q,\;+q$ | Quadrupole | $1/r^3$ | $1/r^4$ |
| $-q,\;+3q,\;-3q,\;+q$ | Octupole | $1/r^4$ | $1/r^5$ |
| $q,\;-4q,\;+6q,\;-4q,\;+q$ | Hexadecapole | $1/r^5$ | $1/r^6$ |

The logarithmic potential does not fall to zero at infinity; its row uses a different assumed kernel, and its gradient becomes an acceleration or electric field only through a specified receiver coupling. The Coulomb multipole rows suppress amplitudes and angular factors and describe leading far-field behavior when distance is large compared with the configuration's extent. A zero of a leading potential's angular factor need not make the field vanish, because an angular derivative can remain nonzero. These comparisons do not import Coulomb electrostatics into the architrino-level law.

## Reference zero, polarity, and a floating ground

Changing $r_0$ to $\lambda r_0$, with $\lambda>0$, gives

$$
\phi_s(r;\lambda r_0)=\phi_s(r;r_0)-sA\ln\lambda.
$$

This is an additive constant for each source polarity. It leaves every spatial gradient and every potential difference unchanged. In particular,

$$
\phi_s(r_2)-\phi_s(r_1)=sA\ln\!\left(\frac{r_2}{r_1}\right),
\qquad
\phi_s(\lambda r)-\phi_s(r)=sA\ln\lambda.
$$

Every equal ratio of distances gives the same potential difference. Thus each doubling contributes $sA\ln2$, independently of the starting radius. The logarithm measures scale ratios and contains no preferred zero radius through its gradient. A floating reference is consistent with this mathematics when the response depends only on differences or gradients. A physical environmental background could select a convenient reference, but an absolute value becomes dynamically significant only if a specified observable or law depends on it after the reference convention is fixed.

At $r=r_0$, the scalar is zero while its slope is nonzero:

$$
\frac{d\phi_s}{dr}=\frac{sA}{r},
\qquad
\left.\frac{d\phi_s}{dr}\right|_{r_0}=\frac{sA}{r_0}.
$$

Crossing this radius does not reverse that slope or exchange the two polarities. Even the ordinary Coulomb comparison $C(1/r-1/r_0)$ crosses zero at $r_0$ while retaining the same inverse-square gradient as $C/r$. The existence of a zero crossing therefore does not distinguish a logarithmic interaction.

The logarithm diverges at both ends of its unbounded radial domain, so infinity cannot be assigned a finite zero by subtracting one finite constant. Finite-radius differences remain defined. Ordinary electrostatics already uses this construction for an infinite straight line charge, with distance measured from the line and a finite reference radius; [OpenStax's infinite-wire calculation](https://openstax.org/books/university-physics-volume-2/pages/7-3-calculations-of-electric-potential) supplies an independent comparison. A finite physical source or medium may require inner and outer transitions before either divergence is reached.

The source sign does not determine attraction and repulsion without a receiver rule. If receiver polarity is $t\in\{+1,-1\}$ and the proposed rule is $\mathbf a_t=-t\nabla\phi_s$, then $\mathbf a_t=-stA\hat{\mathbf r}/r$: equal polarities attract. To preserve same-polarity repulsion with this minus-gradient convention, reverse the source-scalar assignment. Equivalently, an acceleration-potential for the pair can be postulated as $U_{st}=-\alpha st\ln(r/r_0)$ with $\alpha>0$, yielding $\mathbf a_t=\alpha st\hat{\mathbf r}/r$. This is conditional comparison algebra, not a new accepted substrate rule.

## Master Equation before and after a logarithmic replacement

The following comparison makes one specific hypothesis: change the radial response from inverse-square to inverse-distance while retaining the current causal propagation, polarity convention, transmitter-side weighting, and linear addition of admitted hits. This is a proposed replacement at the primitive interaction level. The equations below derive its consequences on regular roots; they do not select it as the physical law. A collective effective logarithm or the nonlinear-flux construction discussed later would require its own derivation and need not make this replacement.

### Shared causal geometry

Receiver $i$ is evaluated at reception time $T_r$; transmitter $j$ supplies its position and velocity at the earlier emission time $T_t$. Define

$$
\mathbf r_{ij}=\mathbf X_i(T_r)-\mathbf X_j(T_t),
\qquad
r_{ij}=\|\mathbf r_{ij}\|,
\qquad
\hat{\mathbf r}_{ij}=\frac{\mathbf r_{ij}}{r_{ij}},
$$

$$
\mathcal C_{ij}(T_r)
=\left\{T_t<T_r\;\middle|\;
r_{ij}=c_f(T_r-T_t)\right\},
\qquad
D_{t,ij}=c_f-\hat{\mathbf r}_{ij}\cdot\mathbf V_j(T_t).
$$

The displayed acceleration sums apply where all retained roots are simple, $D_{t,ij}\ne0$, and have positive separation. They include admitted positive-delay self hits with $j=i$, and exclude the same-time endpoint $T_t=T_r$. The sign $\sigma_{ij}=\operatorname{sign}(q_iq_j)$ is positive for like polarities and negative for opposites. Both couplings below are positive. For an infinite source or root population, existence of the sum requires a separate convergence argument.

### Before: the current Master Equation

The [canonical equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), with its transmitter weight written explicitly, is

$$
\boxed{
\frac{d^2\mathbf X_i}{dT_r^2}
=
\sum_j\sum_{T_t\in\mathcal C_{ij}(T_r)}
\kappa\,\sigma_{ij}|q_iq_j|\,
\frac{c_f}{|D_{t,ij}|}\,
\frac{\hat{\mathbf r}_{ij}}{r_{ij}^{\,2}}
}.
$$

Each hit contributes an inverse-square radial acceleration multiplied by the dimensionless source weight $c_f/|D_{t,ij}|$.

### After: the proposed logarithmic-potential equation

Retaining that source weight and replacing the radial response gives

$$
\boxed{
\frac{d^2\mathbf X_i}{dT_r^2}
=
\sum_j\sum_{T_t\in\mathcal C_{ij}(T_r)}
\kappa_{\log}\,\sigma_{ij}|q_iq_j|\,
\frac{c_f}{|D_{t,ij}|}\,
\frac{\hat{\mathbf r}_{ij}}{r_{ij}}
}.
$$

The change at each admitted hit is

$$
\frac{\kappa}{r_{ij}^{\,2}}
\quad\longrightarrow\quad
\frac{\kappa_{\log}}{r_{ij}}.
$$

The direction remains from the past emission point to the current receiver. Like polarities still repel, opposites still attract, and positive-delay self hits retain the positive sign. The same causal-root condition is used, but the changed acceleration generally produces different future histories, roots, and event times. Neither the potential reference radius nor a new receiver-speed multiplier appears in the acceleration.

### Why the logarithmic scalar gives this moving-source response

For one selected root, abbreviate $r=r_{ij}$, $\mathbf n=\hat{\mathbf r}_{ij}$, $D_t=D_{t,ij}$, $C=\kappa\sigma_{ij}|q_iq_j|$, and $C_{\log}=\kappa_{\log}\sigma_{ij}|q_iq_j|$. Hold reception time and the transmitter history fixed on a connected regular receiver chart. The selected emission time still changes as the receiver position changes. Differentiating the causal constraint gives

$$
0=\mathbf n\cdot d\mathbf X_i+D_t\,dT_t,
\qquad
\nabla_{\mathbf X_i}T_t=-\frac{\mathbf n}{D_t},
\qquad
\nabla_{\mathbf X_i}r=\frac{c_f}{D_t}\mathbf n.
$$

With the branch sign $\varepsilon=\operatorname{sgn}(D_t)$ constant on this chart, the before-and-after acceleration-potentials are

$$
\Phi^{\mathrm{current}}=\frac{C\varepsilon}{r},
\qquad
\Phi^{\log}=-C_{\log}\varepsilon\ln(r/r_0).
$$

Their receiver gradients give

$$
-\nabla_{\mathbf X_i}\Phi^{\mathrm{current}}
=C\frac{c_f}{|D_t|}\frac{\mathbf n}{r^2},
\qquad
-\nabla_{\mathbf X_i}\Phi^{\log}
=C_{\log}\frac{c_f}{|D_t|}\frac{\mathbf n}{r}.
$$

These are derived local identities, including for negative-$D_t$ branches. The minus sign in front of the logarithm preserves the original attraction/repulsion convention; replacing $1/r$ by a positive logarithm without that sign would reverse it. The factor $\varepsilon$ converts the signed root derivative into the absolute transmitter weight. Inserting an additional $c_f/|D_t|$ into either scalar would generally introduce derivatives of that weight and define a different equation. For a stationary transmitter, $D_t=c_f$ and the two gradients reduce directly to their respective inverse-square and inverse-distance forms.

Changing $r_0$ to $\lambda r_0$ adds $C_{\log}\varepsilon\ln\lambda$ to the logarithmic scalar, a constant on the fixed regular chart, so it changes neither acceleration. These scalars describe a receiver gradient with retained histories; they are not a global action or a conserved energy for mutually evolving constituents.

### Coupling normalization and the remaining physical choice

Changing the distance power changes the coupling dimensions:

$$
[\kappa|q_iq_j|]=L^3T^{-2},
\qquad
[\kappa_{\log}|q_iq_j|]=L^2T^{-2}.
$$

Here $L$ and $T$ denote dimensions of length and time. To match the two per-hit accelerations at a declared comparison distance $L_*>0$, choose

$$
\kappa_{\log}=\frac{\kappa}{L_*},
\qquad
\mathbf A_{ij}^{\log}
=\frac{r_{ij}}{L_*}\,\mathbf A_{ij}^{\mathrm{current}}
\quad\text{on the same evaluated hit}.
$$

Thus the proposed contribution is weaker below $L_*$ and stronger above it under that matching convention. The relation compares operators on the same supplied history; it is not a rescaling of their distinct evolved trajectories. The amplitude-matching distance $L_*$ and the arbitrary scalar reference $r_0$ have different roles. Moving $r_0$ must not silently retune $\kappa_{\log}$. Numerical instantiations retain $c_f=1$.

The conserved emitted-sphere measure can retain its existing geometric propagation, but its area density still falls as $1/r^2$. Obtaining the proposed acceleration requires a changed reception response—equivalently a factor $r/L_*$ relative to the current response under the matching above—or another specified emission/response account. Spherical dilution alone does not derive the logarithmic law. On a causal hit, $r=c_f(T_r-T_t)$, so the additional factor weights wake age as well as range. Its dependence on the emission's age or sphere radius must therefore be part of the reception hypothesis; it is not supplied by unchanged dilution alone. This observation does not establish acausal propagation or require a spatially nonlocal receiver implementation. The retained source weight can also be obtained by replacing the radial kernel in the current emission-time integral while leaving its causal delta unchanged; collapsing that delta at a simple root still supplies $1/|D_t|$.

The receiver factor $D_{r,ij}=c_f-\hat{\mathbf r}_{ij}\cdot\mathbf V_i(T_r)$ continues to enter root playback through $dT_t/dT_r=D_{r,ij}/D_{t,ij}$, rather than multiplying acceleration. Both $r=0$ and $D_t=0$ remain outside the ordinary-root expression. The change supplies no speed cap, contact prescription, or self-birth continuation. The [active continuation obstruction](../../collinear-research/analysis/logarithmic-causal-continuation-obstruction.md) concerns the stated logarithmic law; the [older mixed comparison](../../collinear-research/analysis/logarithmic-inverse-distance-collinear-obstructions.md) retains its separate hypotheses, including an explicitly withdrawn quadratic-response section that supplies no active premise. Direct root differentiation, the stationary-source limit, and reference-shift invariance check the displayed comparison; a failure of any of these identities on a regular chart would refute it.

## What would connect radius with wake speed

A scalar zero cannot by itself select a velocity. The ratio $r/r_0$ measures distance, whereas $v/c_f$ measures speed. Their numerical equality requires a dynamical relation; choosing both units to equal one supplies no such relation. Current [energy-zero guidance](../../../../../content/markdown/aaa/dynamics/energy.md#appendix-a-energy-zero-and-bookkeeping) likewise distinguishes a conventional reference radius from a certified boundary, energy minimum, or ground configuration.

There is nevertheless a useful conditional speed result. Assume a fixed center and an instantaneous inward acceleration

$$
\mathbf a=-\frac{\alpha}{r}\hat{\mathbf r},
\qquad \alpha>0.
$$

Here $\alpha$ has units of squared speed. Circular kinematics requires acceleration magnitude $v^2/r$, so circular balance gives

$$
\frac{v^2}{r}=\frac{\alpha}{r},
\qquad v^2=\alpha.
$$

The circular speed is independent of radius. Setting $\alpha=c_f^2$ gives wake-speed circles at every radius in this instantaneous comparison. In normalized numerical units $c_f=1$, the choice is $\alpha=1$. This selects an amplitude, not a zero-crossing radius; it establishes neither a speed ceiling nor a lawful delayed assembly. A two-moving-member problem would require its own separation and orbit-radius factors. The same circular-balance mechanism appears at the explicitly effective gravitational comparison level in [the logarithmic-potential discussion in Dynamics and Astrophysics of Galaxies](https://galaxiesbook.org/chapters/I-01.-Gravitation_4-Examples-of-spherical-potentials.html), without supplying any substrate premise here.

For radial motion in the fixed-center comparison, multiplying $\ddot r=-\alpha/r$ by $\dot r$ and integrating gives

$$
v_r^2(r)=v_{r,i}^2-2\alpha\ln\!\left(\frac{r}{r_i}\right).
$$

The subscript $i$ denotes initial data, and $v_r=\dot r$. Where the resulting trajectory is admitted, its wake-speed crossing radius would be

$$
r_{\mathrm{cross}}=r_i\exp\!\left(\frac{v_{r,i}^2-c_f^2}{2\alpha}\right).
$$

It depends on initial conditions and amplitude, while $r_0$ cancels. The outward-sign comparison instead has $v_r^2(r)=v_{r,i}^2+2\alpha\ln(r/r_i)$ and supplies no upper-speed bound. These are identities of postulated acceleration equations with a fixed source, not an invocation of architrino mass or a derived global energy law.

The actual causal-root conditions use velocities and geometry. The [Master Equation's separator taxonomy](../../../../../content/markdown/aaa/dynamics/master-equation.md#separator-taxonomy) distinguishes a transmitter factor $D_t=c_f-\hat{\mathbf r}\cdot\mathbf V_t$ from receiver playback $D_r=c_f-\hat{\mathbf r}\cdot\mathbf V_r$. Speed magnitude $c_f$ alone identifies neither event. Moving a scalar zero changes neither condition.

## What is integrated over an expanding sphere

The phrase total potential can refer to distinct quantities. For a sphere $S_R$ centered on the proposed source, the scalar value, its surface integral, and a gradient flux are respectively

$$
\phi_s(R)=sA\ln(R/r_0),
\qquad
\int_{S_R}\phi_s\,dS=4\pi sAR^2\ln(R/r_0),
\qquad
\int_{S_R}(-\nabla\phi_s)\cdot d\mathbf S=-4\pi sAR.
$$

Here $dS$ is area and $d\mathbf S$ is outward oriented area. These expressions are exact geometric identities for the declared static scalar. They hold when evaluated on growing radii as well, but do not by themselves describe propagation or identify a transported quantity. The surface integral of the scalar changes under a shift of the potential zero and has no automatic conservation status. Even $\phi=C/R$ gives $\int_{S_R}\phi\,dS=4\pi CR$, which grows with radius. Under ordinary source-free electrostatics, the conserved spherical quantity is the electric-field flux, not the surface integral of potential.

Current Architrino wake geometry has a different, explicit conserved object. The [Master Equation's emitted-sphere construction](../../../../../content/markdown/aaa/dynamics/master-equation.md) keeps the signed emission measure $M_e=c_fq_t\,dT_e$ fixed during free propagation and distributes it with area density $M_e/(4\pi R^2)$. Its surface integral is $M_e$. The text expressly separates that geometric conservation from any energy or momentum flux claim. Replacing this surface density by a logarithm would change the emission account; using a logarithm as a separate derived scalar would require explaining its relation to the unchanged measure.

One suggestive mathematical identity is

$$
\int_{S_R}|\nabla\phi_s|^2\,dS=4\pi A^2.
$$

The gradient falls as $1/R$, so its square cancels the sphere's $R^2$ area. This does not identify the integrand as energy or any other physical density. It does show why a nonconstant potential integral alone cannot rule out a conserved spherical account built from a different quantity.

## Three ways a logarithm could acquire physical meaning

### An effective geometry or distributed source

In three dimensions, for $r>0$,

$$
\nabla^2\phi_s
=\frac{1}{r^2}\frac{d}{dr}\left(r^2\frac{sA}{r}\right)
=\frac{sA}{r^2}.
$$

Thus a spherical logarithm is not a source-free solution of the ordinary linear three-dimensional Poisson equation. If that equation is chosen as an electrostatic comparison, $\nabla^2\phi=-\rho/\epsilon_0$ requires $\rho(r)=-\epsilon_0sA/r^2$ and enclosed charge $-4\pi\epsilon_0sAR$. There is no additional point-source delta at the origin for this linear Laplacian: the gradient flux through a shrinking sphere tends to zero. Extending the density to arbitrarily large radius gives an unbounded source inventory. A finite source radius would require an outer transition.

In two spatial dimensions, by contrast, the radial Laplacian is $r^{-1}\partial_r(r\partial_r)$, and it annihilates $\ln r$ away from zero. The circular gradient flux is constant. An infinite straight line in three dimensions supplies the corresponding cylindrical geometry, whose side area per unit length grows as $r$. Restricting a three-dimensional point configuration to a plane does not itself change its interaction kernel to the two-dimensional one.

These results suggest effective line-like geometry, an extended response, or a collective medium as candidate origins. None is established for an Architrino assembly by choosing the logarithm.

### A nonlinear flux law

There is also a point-source route in three dimensions if the flux law is changed. Define the mathematical flux

$$
\mathbf J=|\nabla\phi_s|\nabla\phi_s
=\frac{sA^2}{r^2}\hat{\mathbf r}.
$$

Its divergence vanishes for $r>0$, its sphere flux is $4\pi sA^2$, and distributionally $\nabla\cdot\mathbf J=4\pi sA^2\delta^{(3)}(\mathbf x)$. The delta denotes a point-supported source, established by the nonzero limiting sphere flux. Thus a quadratic relation between gradient and flux supports a logarithmic scalar with a conserved spherical flux. This is a derived mathematical alternative. Selecting $\mathbf J$ as a physical wake flux would be a new constitutive hypothesis requiring a derivation and receiver map; it does not follow from the current linear acceleration sum. In particular, this nonlinear equation does not generally permit adding individual logarithmic source solutions.

### A measure accumulated across scales

The identity $d\phi_s/d\ln r=sA$ suggests a bookkeeping interpretation: equal intervals of logarithmic scale contribute equal scalar increments. A logarithm can then summarize a hierarchy or accumulated response while a separate microscopic kernel remains inverse-square. Merely taking a logarithm of an existing scalar for display has the same mathematical shape but changes the acceleration if its new gradient is used without the appropriate inverse transformation. To make this interpretation physical, identify the quantity being accumulated, its weighting per scale, and the receiver observable it controls.

## Neutral logarithmic sources and the earlier multipole question

Under a separate assumption of linear addition of prescribed logarithmic source scalars, a finite neutral configuration cancels their common logarithmic divergence. This linear-sum comparison is distinct from the nonlinear flux equation above. Let signed weights be $s_i$, source positions $\mathbf a_i$, total weight $Q=\sum_i s_i$, and first signed position moment $\mathbf p=\sum_i s_i\mathbf a_i$. For $r$ much larger than the source extent and $\mathbf x=r\hat{\mathbf n}$,

$$
\sum_i s_iA\ln\!\left(\frac{|\mathbf x-\mathbf a_i|}{r_0}\right)
=AQ\ln(r/r_0)-\frac{A\hat{\mathbf n}\cdot\mathbf p}{r}+O(r^{-2}).
$$

This follows by expanding each logarithm as $\ln(r/r_0)-(\hat{\mathbf n}\cdot\mathbf a_i)/r+O(r^{-2})$. If $Q=0$, the reference $r_0$ cancels exactly, and the leading scalar can decay as $1/r$. Its negative gradient is

$$
-\nabla\Phi
=\frac{A}{r^2}\left[\mathbf p-2\hat{\mathbf n}(\hat{\mathbf n}\cdot\mathbf p)\right]+O(r^{-3}).
$$

For nonzero $\mathbf p$, the leading magnitude is $A|\mathbf p|/r^2$, but the vector has a dipolar angular pattern and zero net sphere flux. Matching the inverse-square magnitude alone therefore does not recover an isotropic Coulomb source. A uniformly oriented average removes this dipole term; it does not convert it into a monopole. Finite neutrality also supplies no proof that an infinite universe's potential or acceleration sum converges independently of summation order.

## An exact two-source nonlinear comparison

An equal-and-opposite pair provides a special case compatible with both the logarithmic sum and the proposed quadratic-gradient flux. Put the positive scalar source at $\mathbf a$ and the negative scalar source at $\mathbf b$, with $\mathbf a\ne\mathbf b$, and define $r_+=|\mathbf x-\mathbf a|$ and $r_-=|\mathbf x-\mathbf b|$. The scalar is

$$
\Phi(\mathbf x)=A\ln\!\left(\frac{r_+}{r_-}\right).
$$

The reference length cancels. Its zero is the plane of points equidistant from the two sources, and its gradient is nonzero at every finite nonsource point. Thus a zero can encode relative geometry while still identifying neither zero interaction nor a speed threshold.

For a direct check, write $\mathbf u=\mathbf x-\mathbf a$, $\mathbf v=\mathbf x-\mathbf b$, $u=|\mathbf u|$, $v=|\mathbf v|$, and $d=|\mathbf a-\mathbf b|$. Differentiation and the identity $|\mathbf u-\mathbf v|=d$ give

$$
\nabla\Phi=A\left(\frac{\mathbf u}{u^2}-\frac{\mathbf v}{v^2}\right),
\qquad
|\nabla\Phi|=\frac{Ad}{uv},
\qquad
\mathbf J=A^2d\left(\frac{\mathbf u}{u^3v}-\frac{\mathbf v}{uv^3}\right).
$$

Away from both source points, the divergences of the two displayed flux terms cancel: each unsigned term contributes $-\mathbf u\cdot\mathbf v/(u^3v^3)$, and the expression subtracts them. On a shrinking sphere about $\mathbf a$, the first term supplies flux $4\pi A^2$ and the second contributes a vanishing amount; about $\mathbf b$, the flux is $-4\pi A^2$. Therefore

$$
\nabla\cdot\mathbf J
=4\pi A^2\left[\delta^{(3)}(\mathbf x-\mathbf a)-\delta^{(3)}(\mathbf x-\mathbf b)\right].
$$

This exact mathematical solution shows that a two-polarity logarithmic ratio and conserved signed nonlinear flux can coexist in three dimensions. It neither restores general linear superposition for that nonlinear equation nor selects a physical acceleration response, propagation law, or energy account. Source motion would require additional time-dependent equations.

## Configuration comparisons relevant to disposition

The [radial exponent comparison](../../collinear-research/analysis/logarithmic-critical-exponent-comparison.md) proves the self-birth obstruction for $n\le-1$ under its incoming-history and regularity assumptions. The logarithmic candidate is the boundary case $n=-1$. Passage integrability and first-order radial neutrality also change there, but existence for every $n>-1$ is an open construction problem, not a consequence of those thresholds.

The [first-order circular comparison](../../binary-research/analysis/logarithmic-first-order-circle-response.md) gives instantaneous radial balance $v^2=K/2$ and a positive delayed forward residual. Its forced small-speed solution has mean radial drift $K/(2c_f)$; extension over secular times remains inferred. Removing the first-order radial correction does not remove the circular residual or establish a bound binary.

The [static checkerboard comparison](../../lattice-research/analysis/logarithmic-static-checkerboard-response.md) supplies a derived advantage under a declared neutral-cell summation: the receiver-displacement derivative is $KS I/(3\ell^2)$ with $S<0$, so it is restoring in every direction while other sources remain fixed. This contrasts with the inverse-square checkerboard's zero static derivative. The full delayed collective spectrum is unresolved. These configuration results neither select the replacement nor change the deferred research disposition.

## Disposition, checks, and next scientific question

Claim grade: derived for the reference-change identities, derivatives, fixed-center comparison trajectories, exact two-moving instantaneous approach and first-event ordering, sphere integrals, Laplacians, nonlinear radial flux, and finite-source asymptotics under their displayed assumptions. A changed gradient after changing only $r_0$, a radius-dependent circular speed for the exact fixed-center law $a_r=-\alpha/r$, or a nonzero divergence of the stated $\mathbf J$ away from the origin would refute the corresponding identity. Direct differentiation, trajectory substitution, and sphere integration provide the checkable instruments; the external references support only their stated classical comparisons.

Claim grade: guessed for a logarithmic primitive interaction, a medium-generated logarithmic response, a physically transported quadratic-gradient flux, or a logarithmic scale account in $\mathbb{A}\mathbb{A}\mathbb{A}$. The strongest supported conclusion is that a movable zero is harmless for a gradient-only response, while a logarithmic radial dependence has material dynamical consequences. No preferred radius, wake-speed ceiling, bound assembly, or cosmological ground is derived.

The before-and-after comparison supplies one conditional primitive acceleration-potential equation. Its physical source-to-receiver account remains to be specified, including what is conserved on an emitted sphere; the effective collective and accumulated-scale interpretations remain separate alternatives. A physical $r_0$–$c_f$ identification would additionally require an invariant event or solution relation that survives an additive scalar shift. The [remaining research plan](../../collinear-research/analysis/logarithmic-research-plan.md) uses the exact instantaneous collinear approach as its first-event control and the [active causal obstruction](../../collinear-research/analysis/logarithmic-causal-continuation-obstruction.md) for the unchanged logarithmic response. The older mixed comparison is historical support only at its separately stated assumptions; its withdrawn quadratic-response argument is excluded. Shared definitions and general account questions remain with this parent; configuration-specific development belongs to its geometry owner while the proposal's promise is assessed; a proposed microscopic replacement still requires separate adjudication before adoption or corpus promotion.
