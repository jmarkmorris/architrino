# Topo Prescribed Circular Binary v1

## Status And Authority

- Contract identity: `topo_prescribed_circular_binary/v1`
- Scenario label: `Orbiting binary electrino and positrino`
- Claim grade: derived conditional display from two exact prescribed circular histories
- Numerical convention: $c_f=1$
- Raw product: signed equal-wake-intensity sum
- Display authority: prescribed-path visualization only
- Not supplied: EOM evolution, stability, binding, energy, conservation, physical retention, potential identity, or acceptance evidence

Plainly: the scenario draws what the declared circular paths imply under one finite-history sampling rule. It does not claim that the paths solve the EOM solver or describe a stable physical binary.

## Geometry And Responsive Policy

The visible horizontal world interval is $[0,1]$. The binary center is
$\mathbf C=(1/2,1/2)$ and the shared world-space orbital radius is adjustable
over $0.01\leq R\leq0.45$. The default is $R=0.3$. At default radius and replay
progress $p=0$, the electrino starts at $(0.2,0.5)$ and the positrino starts at
$(0.8,0.5)$. Their prescribed histories are

$$
\mathbf X_-(T)=\mathbf C+R
\begin{pmatrix}
\cos(\pi+\omega T)\\
\sin(\pi+\omega T)
\end{pmatrix},
\qquad
\mathbf X_+(T)=\mathbf C+R
\begin{pmatrix}
\cos(\omega T)\\
\sin(\omega T)
\end{pmatrix},
\qquad
\omega=d\frac{\beta}{R},
\qquad
d\in\{-1,+1\},
$$

where $d=+1$ is the default counterclockwise direction and $d=-1$ is clockwise. Plainly: the orbital-radius slider moves both sources inward or outward while keeping them opposite. The speed parameter sets angular-speed magnitude through $\beta=R|\omega|$, so changing radius or direction does not silently change the requested nonnegative tangential-speed magnitude.

One world unit is one visible canvas width. The vertical world interval is centered
at $y=1/2$ and has height $H/W$, where $W$ and $H$ are the visible pixel width
and height. If $H/W<2R$, the top and bottom of the selected orbit extend beyond the
visible stage and are clipped. The policy is
`clip-stage-preserve-world-scale/v1`: resizing never shrinks the radius or uses
a different horizontal and vertical scale.

Plainly: on a wide, short screen, part of the selected true circle can pass offscreen. That clipping is the explicit tradeoff that preserves equal world scale at every slider radius.

## Finite Retained History And Replay

For $\beta>0$, the orbit period is

$$
P=\frac{2\pi R}{\beta}.
$$

The displayed replay parameter $p\in[0,1]$ maps to reception time
$T=P(1+p)$. Thus the open frame has one prescribed orbit of retained history,
and playback advances exactly one additional orbit from $T=P$ through $T=2P$.
At $\beta=0$, both histories are stationary, $T=2\pi R$ is the finite retained
window, progress is fixed at zero, and play and replay are disabled.

Plainly: the binary is warmed up with one finite orbit before the visible replay starts. The replay then shows one orbit, while $\beta=0$ becomes a genuinely stationary comparison rather than an infinitely slow animation.

## Per-Source Causal Root

For each source $s\in\{-,+\}$, sample point $\mathbf x$, and reception time
$T$, Topo solves the ordinary positive-delay equation directly:

$$
g_s(\tau)
=
\left\|\mathbf x-\mathbf X_s(T-\tau)\right\|-\tau
=0,
\qquad
0<\tau\leq T.
$$

The implementation evaluates the actual circular history inside a fixed-count
bisection. It does not use a constant-velocity analytic delay formula. At an
off-source point, $g_s(0)>0$. A retained-history root is bracketed exactly when
$g_s(T)\leq0$; if $g_s(T)>0$, that source reports
`unavailable:no_ordinary_root_in_retained_history`.

Plainly: every pixel looks backward along each circle for the emission whose wake had exactly enough time to arrive. If the finite stored history is too short, Topo leaves the product unavailable rather than filling in a guessed value.

For $0\leq\beta<1$, wherever the distance function is differentiable,

$$
g_s'(\tau)
=
\widehat{\mathbf R}_s(\tau)\cdot
\dot{\mathbf X}_s(T-\tau)-1
\leq \beta-1<0.
$$

Therefore $g_s$ is strictly decreasing. The endpoint sign test supplies a
bracket, and the intermediate-value theorem plus strict decrease supplies
existence and uniqueness of one ordinary root. The source marker itself is
masked as `singular:endpoint_source` because the excluded $\tau=0$ endpoint is
not an ordinary root.

Plainly: below wake speed, the residual can cross zero only once. The bisection is therefore selecting the one allowed finite-history emission, not choosing among unresolved branches.

## Exact $\beta=1$ Endpoint

At $\beta=1$, the bound becomes $g_s'(\tau)\leq0$, so the code uses a separate
endpoint classification. It retains an ordinary result only when the same
finite interval brackets a positive root and the direct circular residual
converges. For a nondegenerate circle, equality in the derivative bound can
occur only at isolated tangencies because the velocity direction rotates; it
cannot create a positive-length constant residual interval. The source point
is classified `nonordinary:endpoint_source`. A missing bracket or failed
residual check remains unavailable or unresolved.

Plainly: the endpoint is not treated as an ordinary sub-wake-speed case. Topo may display a directly bracketed circular root, but it fails closed whenever the finite history does not supply one.

## Signed Equal-Wake-Intensity Product

After both ordinary roots are present, the displayed raw value is

$$
W(\mathbf x,T)
=
\sum_{s\in\{-,+\}}
\frac{\sigma_s\kappa}{\tau_s^2},
\qquad
\sigma_-=-1,
\quad
\sigma_+=+1,
\quad
\kappa=0.04.
$$

Both contributions must be present. One missing source root makes the complete
sample unavailable; Topo never displays a partial one-source sum. The name of
$W$ is `signed equal-wake intensity`. It is not a scalar potential. A potential
name becomes available only if the $\mathbb{A}\mathbb{A}\mathbb{A}$ corpus
establishes a separately versioned potential product with the required
scientific kernel.

Plainly: blue and red contributions are added with opposite signs after both travel times are solved. The result is an intensity comparison, not potential energy or an acceleration quantity.

The display coordinate is the existing direct signed base-10 map

$$
C_{10}(W)
=
\operatorname{sgn}(W)
\log_{10}\left(1+\frac{|W|}{4}\right),
$$

normalized symmetrically at $|W|=64$. The binary path applies no `asinh`
calibration after this transform.

Plainly: the orders-of-magnitude color mapping is applied once, directly to the signed two-source sum. No second nonlinear contrast step changes that meaning.

## View And Controls

The binary view contains only the heatmap, two source markers governed by the
shared Topo half-size contract, an optional thin solid circular orbit guide,
orbit progress, the orbital-radius and direction controls, and the shared
play, pause, and replay controls. The single-source contour-range and
contour-visibility controls are hidden and inert while this scenario is active.
The binary overlay draws no field contours, contour labels, source circles, or
source labels. The solid circle is a prescribed reference path at the selected
$R$, not an equal-intensity contour or a dynamical claim. Playback lasts eight
wall-clock seconds for usability; that wall time is only the rate at which the
prescribed replay parameter is viewed.

Plainly: the screen does not pretend to offer contour controls that do nothing. The smaller moving dots identify the prescribed sources, and the optional solid circle shows only where those authored paths run.

The binary display also exposes a small accessible radio group for `Purple`
and `White` neutral backgrounds. Purple is the unchanged Electric Purple
`#8F00FF` default. White uses `#FFFFFF` as a display-only neutral midpoint and
changes only color interpolation, unavailable pixels, and the legend. The orbit
guide is pale lavender on Purple and restrained Electric Purple on White. Each
checked radio uses its named option color with a contrasting boundary.
Background selection does not
change roots, raw values, orbital radius, frame identity, or playback.

Plainly: the radio group lets the reader compare the same signed numbers against two neutral visual baselines. White exposes weaker blue/red contrast differently, but it does not turn neutral into a new scientific value.

## Verification And Falsifiers

Focused tests compare selected $\beta<1$ roots and signed sums with the
separately authored prescribed-path CPU evaluator in
`ExactPrescribedSourceWake.mjs`. Closed controls also check the stationary
inverse-square sum, exact center cancellation, antipodal geometry, one-orbit
closure, both radius endpoints, $|\omega|=\beta/R$, source masking,
finite-history failure, the $\beta=1$ classification, direct signed-log mapping,
the shared half-radius marker contract, solid-guide geometry, both angular-rate
signs, contained source masking, and background-control
isolation.

Plainly: the implementation is checked both against simple cases with known answers and against a pre-existing independent CPU path. Agreement remains evidence about this prescribed calculation, not evidence that nature realizes the orbit.

Reject the display implementation if any selected CPU root differs beyond the
declared tolerance; a returned root does not satisfy the direct circular
residual; the markers cease to be antipodal; the slider changes tangential
$\beta$ or fails to update period and guide radius; one replay does not close
after $2\pi$; a partial source ledger produces a finite color; the binary path applies
a second nonlinear display transform; the background control changes raw data;
the marker radius is not half its predecessor; the guide is dashed or treated
as a field contour; or contour geometry appears while the binary scenario is selected.

Plainly: each failure is directly inspectable in the focused test output or in the live Topo frame. None of these checks upgrades the scenario to dynamics, stability, binding, conservation, potential, or acceptance evidence.
