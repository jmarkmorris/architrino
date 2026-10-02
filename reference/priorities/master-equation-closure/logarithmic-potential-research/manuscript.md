# Logarithmic Potentials, Reference Levels, and Spherical Wake Accounting

## The proposed scalar and its scope

A pair of opposite logarithmic potentials is a mathematically coherent comparison model. Its zero crossing specifies a reference level; its logarithmic shape specifies potential differences between scales. Those statements have different physical content. The discussion below derives consequences of the proposed scalar and identifies candidate interpretations without changing the Master Equation or asserting an electromagnetic recovery.

Let $r>0$ be distance from a source, $r_0>0$ a reference length, $A>0$ a potential amplitude, and $s\in\{+1,-1\}$ a source-polarity label. Write

$$
\phi_s(r)=sA\ln\!\left(\frac{r}{r_0}\right).
$$

The ratio inside the logarithm is dimensionless. Writing $\ln r$ suppresses a chosen length unit or reference; the numerical statement $r=1$ is meaningful only after that choice. The amplitude has the units of the proposed scalar. It acquires units of squared speed only if the scalar is defined to generate acceleration through a gradient.

This is a proposed radial law or an effective comparison, not another gauge of the current primitive kernel. The [Master Equation's moving-single-root scalar](../../../../content/markdown/aaa/dynamics/master-equation.md#superposition-and-local-wake-geometry) is already derived on a connected regular receiver chart with retained transmitter histories and causal-root selections fixed, while the selected emission times vary smoothly with receiver position. It has the form $\Phi_b=C_b\operatorname{sgn}(D_b)/r_b$ and satisfies $-\nabla\Phi_b=\mathbf A_b$. For a stationary transmitter, $D_b=c_f$, giving the current inverse-square acceleration. A logarithmic scalar with the same gradient-response interpretation would instead give inverse-distance acceleration. Neither local scalar representation establishes a global action or energy account.

## Radial comparison with electrostatic multipoles

The first row gives the proposed logarithmic scalar's exact radial dependence and gradient magnitude for $r>0$. The remaining rows are derived comparisons within ordinary three-dimensional Coulomb electrostatics, using charges at equally spaced sites along a line. Their leading powers follow from cancellation of successive moments, as shown in the [electrostatic multipole derivation](../../mapping-electromagnetism/analysis/electrostatic-multipole-falloff.md#construction-at-arbitrary-order).

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

The [canonical equation](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), with its transmitter weight written explicitly, is

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

The conserved emitted-sphere measure can retain its existing geometric propagation, but its area density still falls as $1/r^2$. Obtaining the proposed acceleration requires a changed reception response—equivalently a factor $r/L_*$ relative to the current response under the matching above—or another specified emission/response account. Spherical dilution alone does not derive the logarithmic law. The retained source weight can also be obtained by replacing the radial kernel in the current emission-time integral while leaving its causal delta unchanged; collapsing that delta at a simple root still supplies $1/|D_t|$.

The receiver factor $D_{r,ij}=c_f-\hat{\mathbf r}_{ij}\cdot\mathbf V_i(T_r)$ continues to enter root playback through $dT_t/dT_r=D_{r,ij}/D_{t,ij}$, rather than multiplying acceleration. Both $r=0$ and $D_t=0$ remain outside the ordinary-root expression. The change supplies no speed cap, contact prescription, or self-birth continuation, and the [conditional inverse-distance obstructions](analysis/inverse-distance-collinear-obstructions.md) remain relevant. Direct root differentiation, the stationary-source limit, and reference-shift invariance check the displayed comparison; a failure of any of these identities on a regular chart would refute it.

## What would connect radius with wake speed

A scalar zero cannot by itself select a velocity. The ratio $r/r_0$ measures distance, whereas $v/c_f$ measures speed. Their numerical equality requires a dynamical relation; choosing both units to equal one supplies no such relation. Current [energy-zero guidance](../../../../content/markdown/aaa/dynamics/energy.md#appendix-a-energy-zero-and-bookkeeping) likewise distinguishes a conventional reference radius from a certified boundary, energy minimum, or ground configuration.

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

The actual causal-root conditions use velocities and geometry. The [Master Equation's separator taxonomy](../../../../content/markdown/aaa/dynamics/master-equation.md#separator-taxonomy) distinguishes a transmitter factor $D_t=c_f-\hat{\mathbf r}\cdot\mathbf V_t$ from receiver playback $D_r=c_f-\hat{\mathbf r}\cdot\mathbf V_r$. Speed magnitude $c_f$ alone identifies neither event. Moving a scalar zero changes neither condition.

## Two moving opposites: exact instantaneous approach

The first collinear comparison treats both constituents as moving and uses an instantaneous logarithmic response. It is a separate control for the causal equation above: equal-time separation replaces delayed separation, the transmitter weight is set to one, and no self reception is included. The following result is derived for this declared comparison, without a speed cap, softening, or contact prescription.

Take unit polarity signs $\sigma_+=+1$, $\sigma_-=-1$ and the receiver scalar $\Psi_i=-K\sigma_i\sigma_j\ln(|X_i-X_j|/r_0)$, with $K>0$ of dimension squared speed. Differentiate with respect to the receiver coordinate before imposing symmetry. The opposite pair obeys

$$
\ddot X_+=-\frac{K}{X_+-X_-},
\qquad
\ddot X_-=\frac{K}{X_+-X_-}.
$$

Set $c_f=1$ and prescribe $X_\pm(0)=\pm x_0$, $\dot X_\pm(0)=\mp u_0$, with $x_0>0$ and $0\le u_0<1$. The midpoint remains at rest, so write $X_\pm=\pm x$, separation $d=2x$, and individual inward speed $u=-\dot x$. The positive half-separation is $x=|X_+-X_-|/2>0$: each constituent is that distance from the midpoint, and “positive” describes distance, not polarity. Then

$$
\boxed{\dot x=-u,\qquad \dot u=\frac{K}{2x}},
\qquad
\ddot d=-\frac{2K}{d}.
$$

Each constituent responds across the full separation $2x$, which supplies the factor $1/2$ in its acceleration. The fixed-center result cannot be substituted using half-separation as the source distance. Smoothness for $x>0$ gives local uniqueness; $\dot u>0$ makes inward speed increase strictly, including immediately after a rest release.

Differentiating $u^2+K\ln(x/x_0)$ along this equation gives zero, hence

$$
\boxed{u^2=u_0^2+K\ln(x_0/x)}.
$$

This is a first integral of the acceleration equation, not an assumed kinetic-energy or wake-energy law. It is valid when $u_0=0$, and the arbitrary reference $r_0$ has disappeared.

The pair therefore reaches individual speed one at positive separation:

$$
\boxed{x_v=x_0e^{-(1-u_0^2)/K},\qquad d_v=2x_v}.
$$

This is the first future event among individual wake-speed equality, contact, a turn, and loss of the ordinary positive-separation domain. The acceleration there is finite, $K/(2x_v)$, so this instantaneous equation continues smoothly through the diagnostic speed threshold. Relative closing speed is $2u$; using relative speed one would locate a different event at individual speed $1/2$.

The exact time follows by using the strictly increasing speed as a parameter:

$$
x(u)=x_0e^{(u_0^2-u^2)/K},
\qquad
T(u)=\frac{2x_0}{K}e^{u_0^2/K}
\int_{u_0}^{u}e^{-v^2/K}\,dv.
$$

The first-speed time is $T_v=T(1)$. Continuing the same instantaneous equation gives the finite endpoint time

$$
T_c=\frac{2x_0}{K}e^{u_0^2/K}
\int_{u_0}^{\infty}e^{-v^2/K}\,dv,
\qquad
0<T_v<T_c<\infty.
$$

As $T$ approaches $T_c$, separation tends to zero and individual speed grows without bound. There is no inward-to-outward turn and no finite-velocity classical continuation through contact. This conclusion concerns the incoming solution and does not specify a generalized passage or reflection rule. If $u_0=1$, wake-speed equality occurs at release; if $u_0>1$, the pair starts above that level and never returns to it. The same finite contact-time formula applies for every finite $u_0\ge0$.

For the exact normalized rest example $x_0=K=1$,

$$
x_v=e^{-1},\qquad d_v=2e^{-1},\qquad
T_v=2\int_0^1e^{-v^2}\,dv,\qquad
T_c=\sqrt{\pi}.
$$

The speed threshold thus occurs when the separation is $e^{-1}$ times its initial value. It is selected by preparation and amplitude, independently of where the potential crosses zero.

The [supporting derivation](analysis/instantaneous-collinear-first-event.md) establishes the maximal positive-separation interval and its endpoint; the [independent calculation](analysis/instantaneous-collinear-independent-check.md) reconstructs the reduction and event clock through full separation. The result shows that logarithmic attraction alone does not cap speed or regularize contact in this instantaneous approach. It supplies no event ordering for the delayed logarithmic equation, where source history, transmitter weighting, and possible self arrivals must be included explicitly.

## Causal logarithmic approach from a complete prepared history

The delayed candidate can now be posed as a definite initial-history problem. Its incoming motion has the same first-event order as the instantaneous comparison: individual speed reaches $c_f=1$ while the pair is still separated. Delay allows a closer approach and a later arrival at that speed. Self reception contributes nothing before or at that event, because no positive-delay self root exists yet. These are derived results for the candidate and preparations below, rather than adoption of a new primitive law.

### Emission, reception, and preparation

Retain the emitted-sphere measure and propagation of the current model, and postulate that each regular receiver response is multiplied by $r/L_*$ relative to the inverse-square response at a fixed matching length $L_*$. Equivalently, use the inverse-distance causal-root equation displayed above, including its absolute transmitter weighting and every admitted positive-delay self root. This is a complete response specification for studying motion. The factor is a new physical hypothesis; spherical dilution and the local logarithmic scalar do not derive it or provide a conserved energy account. The [formulation](analysis/causal-logarithmic-formulation.md) gives the emission-time representation, ordinary-root domain, and static and moving-source checks.

Choose equal-magnitude opposite polarities and write $K=\kappa_{\log}|q_+q_-|>0$. Set $c_f=1$ and supply the entire past

$$
X_\pm(T)=\pm(a-u_0T),\qquad T\le0,
\qquad a>0,\quad0\le u_0<1.
$$

The pair is held at rest when $u_0=0$; for positive $u_0$ it has a prescribed uniformly inward past. This is preparation data, not a claim that the interacting pair had already solved the proposed equation for all negative times. Future motion is released at zero with continuous position and velocity. The theorem covers the whole stated family, including the controlled variation $u_0=1/4$ at unchanged $a$ and $K$.

Before contact, put $X_\pm=\pm x(T)$ and $u=-\dot x$. The past partner emission is determined by

$$
R=T-S=x(T)+x(S),\qquad
D_t=1-u(S),\qquad D_r=1+u(T).
$$

The increasing function $P(T)=T+x(T)$ identifies the source uniquely through $P(S)=T-x(T)$ while all earlier speeds remain below one. A self root would require $\int_S^T u(v)\,dv=T-S$, which is impossible when the average speed on every such interval is less than one. Therefore the complete incoming equation is

$$
\boxed{\dot x=-u,\qquad
\dot u=\frac{K}{R[1-u(S)]},\qquad
\dot S=\frac{1+u(T)}{1-u(S)}.}
$$

The last expression describes root playback; it is not an extra acceleration multiplier. Initial values are $x(0)=a$, $u(0)=u_0$, $S(0)=-2a/(1-u_0)$, and $R(0)=2a/(1-u_0)$. In particular, $\dot u(0)=K/(2a)$. Positive delay and a nonzero source factor allow local unique evolution by using already determined history segments. No finite history truncation or self-root removal is needed.

While $S\le0$, the prepared past gives the explicit ordinary differential equation $\dot u=K/(x+a-u_0T)$. Its exact solution and the criterion for the source to enter the released history are given in the [incoming derivation](analysis/causal-collinear-first-event.md#prepared-history-reception-and-its-join). Crossing $S=0$ is a regular history join: source position and velocity are continuous, and $D_t=1-u_0>0$ there.

### Why speed one precedes contact

Attraction makes $u$ increase, while the delay satisfies $\dot R=-(u(T)+u(S))/(1-u(S))\le0$. Thus the acceleration is at least its initial value, $K/(2a)$, and the incoming below-speed-one interval cannot last indefinitely. Contact with speed at most one is also impossible. To see the obstruction, use emission time $S$ as the independent variable. The exact acceleration and playback relations give

$$
\frac{d}{dS}\left(u+\frac12u^2\right)=\frac{K}{T(S)-S}.
$$

Hypothetical contact at finite time $T_c$ would require $S\to T_c$. Since $T(S)<T_c$, integrating the right side gives at least a logarithmically divergent integral of $K/(T_c-S)$. The left side stays bounded for $u\le1$. This contradiction forces the first limiting event to be

$$
\boxed{0<T_v\le\frac{2a(1-u_0)}{K},\qquad
u(T_v)=1,\qquad x(T_v)>0.}
$$

There is exactly one partner root and zero positive-delay self roots at $T_v$. Its source time is still earlier than $T_v$, so $D_t=1-u(S_v)>0$ even though the receiver itself has reached speed one. The partner acceleration is finite, and $D_r=2$. Emitting at speed one and receiving an emission with a zero transmitter factor are different events; the latter has not occurred here.

The [independent calculation](analysis/causal-collinear-independent-check.md) obtains the event by bounding the delay directly. It also gives the finite range

$$
R_0e^{-(1-u_0^2)/K}\le R_v
\le R_0e^{-(1-u_0^2)/(2K)},\qquad
R_0=\frac{2a}{1-u_0}.
$$

These are bounds on the source-to-receiver distance at the event, not on the equal-time separation $2x_v$.

### How the result differs from instantaneous attraction

Compare the two models when they have the same present separation. The instantaneous model uses the partner's present position. The delayed model receives a wake emitted when the partner was farther away, so its source-to-receiver distance $R$ exceeds the present gap $2x$. The transmitter factor $1/[1-u(S)]$ amplifies the delayed contribution, but during this accelerating approach that amplification does not fully offset the greater distance.

The exact reason is that the partner has moved faster on average during the wake's flight than it was moving when it emitted that wake. Define its average inward speed during that interval by $\bar u=R^{-1}\int_S^T u(v)\,dv$, using $R=T-S$ in $c_f=1$ units. Causal geometry gives $2x=R(1-\bar u)$, and strictly increasing speed after release gives $u(S)<\bar u<1$. Thus

$$
\frac{\dot u_{\mathrm{causal}}}{K/(2x)}
=\frac{2x}{R[1-u(S)]}
=\frac{1-\bar u}{1-u(S)}<1.
$$

This ratio compares acceleration at the same current gap; it does not compare two different gaps at the same clock time. Both preparations start with the same inward speed. Since the delayed trajectory gains speed more slowly at every common gap, it is still below speed one when it reaches the gap at which the instantaneous model reaches one. It must approach closer before reaching that threshold. It also takes longer to reach every shared gap after release, and then has an additional interval of approach before its own threshold. Integrating the acceleration inequality gives

$$
\boxed{0<x_v^{\mathrm{causal}}<a e^{-(1-u_0^2)/K}
=x_v^{\mathrm{instantaneous}},\qquad
T_v^{\mathrm{causal}}>T_v^{\mathrm{instantaneous}}.}
$$

Thus delay changes where and when the threshold occurs without making contact the first event. For the exact example $a=1$, $K=2$, $u_0=0$, $c_f=1$, the source remains in the stationary prepared past through the event and

$$
x_v=2e^{-1/4}-1,\qquad
T_v=\int_0^1e^{-v^2/4}\,dv<1,\qquad
R_v=2e^{-1/4}>1.
$$

This exact example requires no numerical integration. For the other normalized rest preparation $a=K=1$, the hypothetical stationary-source value at speed one instead satisfies $T/R=e^{1/2}\int_0^1e^{-v^2/2}\,dv>1$. The source therefore joins the released history before speed one, and continuing the stationary-source formula would be incorrect. The general proof covers that genuinely evolving source history as well.

The current inverse-square Master Equation is a separate control. With the fixed matching length $L_*=2a$, its coefficient is $G=2aK$ and its incoming acceleration is $G/[R^2(1-u(S))]$ on its own evolved history. The same emission-coordinate proof, with $G/(T(S)-S)^2$ on the right, proves that this control also reaches speed one at positive separation. Initial accelerations match at rest; with inward prepared speed $u_0>0$, the control begins at $K(1-u_0)/(2a)$ while the logarithmic candidate begins at $K/(2a)$. Matching those again would retune the comparison and is not assumed. No ordering of the two delayed event positions is claimed.

### What has and has not happened at the endpoint

The pair has not passed through each other on the established causal trajectory: its separation is still positive at the first wake-speed event. Neither a turn nor a contact has occurred. At that exact instant the partner contribution is finite and no positive-delay self root exists. The separate continuation analysis below proves that the complete equation cannot continue this approach with finite continuous velocity along the line.

The full [incoming proof](analysis/causal-collinear-first-event.md) states the event ledger and its falsifiers. Its result is conditional on the declared response, complete affine preparations, equal couplings, and incoming mirror geometry. The continuation proof uses that established history; it does not transfer an endpoint from the inverse-square law or extrapolate the instantaneous trajectory.

### Why a finite-velocity collinear continuation fails

The obstacle is the first reception of each constituent's own wake. To see why it cannot be avoided by slowing down, suppose there were a continuation with finite continuous velocity through $T_v$. Require velocity changes to equal the integral of the full acceleration on every interval strictly after $T_v$. This includes classical motion and locally absolutely continuous velocity; it does not assume that the acceleration can already be integrated across the endpoint. Allow the two constituents to move differently after $T_v$, while remaining on the line.

Continuity keeps both constituents on their original sides and moving inward for a short time. Every partner contribution is attractive and points inward. Every possible self contribution is repulsive away from its own past emission point, which lies behind its current inward motion, so it also points inward. The existing partner root persists with positive delayed distance and a nonzero transmitter factor. Its acceleration is therefore bounded below by a positive number $m_i$ for receiver $i$. The complete equation requires

$$
\dot u_i\ge m_i>0,\qquad
u_i(T)\ge1+m_i(T-T_v)>1\quad(T>T_v).
$$

The speed crossing is thus forced by the equation. Remaining at speed one, braking, or beginning a reversal would violate it. This step is what turns the [earlier conditional self-birth argument](analysis/inverse-distance-collinear-obstructions.md) into an obstruction at the actual incoming endpoint.

Each such crossing creates exactly one positive-delay self root emitted before $T_v$, while its old partner root remains the only partner contribution. For one receiver, call the self emission time $\tau<T_v$, its delay $\rho=T-\tau$, and the two speed gaps $w_-=1-u(\tau)>0$ and $w_+=u(T)-1>0$. Its self contribution has positive inward sign and magnitude

$$
A_s=\frac{K}{\rho w_-},\qquad
\frac{d\rho}{dT}=\frac{w_-+w_+}{w_-},\qquad
A_s\,dT=\frac{K}{\rho(w_-+w_+)}\,d\rho.
$$

As reception approaches the birth event, the self emission approaches that same event from below, so $\rho\to0$. Finite continuous velocity keeps the speed-gap sum bounded above by a finite $B>0$. Therefore every proposed right-neighborhood of the event has

$$
\int_{T_v}^{T}A_s(t)\,dt
\ge\frac{K}{B}\int_0^{\rho(T)}\frac{d\rho}{\rho}
=+\infty.
$$

This is stronger than saying acceleration becomes large: its accumulated contribution is infinite. No other contribution can cancel it because they all accelerate that same receiver inward. Opposite coordinate signs for the two constituents do not help; each must satisfy its own velocity equation. Excluding the exact zero-delay emission does not exclude the nearby positive-delay self roots that cause this divergence.

**Derived result:** the specified causal logarithmic law has no finite-velocity continuation in this collinear solution class. The result also excludes outgoing collinear motions that break the initial mirror symmetry. It does not describe a realized jump to infinite speed, a physical halt, or annihilation; it says that the proposed acceleration equation supplies no admissible outgoing evolution in the stated class. A speed cap, impulse, deletion of self reception, or changed short-distance response would be an additional law.

The [complete continuation proof](analysis/causal-continuation-obstruction.md) gives the root census, integral regularity, falsifiers, and a further obstruction to nonnegative acceleration measures that remain finite up to the birth endpoint and retain the same ordinary contributions. An [independently constructed proof](analysis/causal-continuation-independent-check.md) checks the collinear result. Arbitrary weak formulations with undeclared singular velocity changes and transverse departures from the line are outside this theorem. The logarithmic candidate therefore weakens the incoming attraction but does not repair the collinear self-reception continuation problem under its declared rules.

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

Current Architrino wake geometry has a different, explicit conserved object. The [Master Equation's emitted-sphere construction](../../../../content/markdown/aaa/dynamics/master-equation.md) keeps the signed emission measure $M_e=c_fq_t\,dT_e$ fixed during free propagation and distributes it with area density $M_e/(4\pi R^2)$. Its surface integral is $M_e$. The text expressly separates that geometric conservation from any energy or momentum flux claim. Replacing this surface density by a logarithm would change the emission account; using a logarithm as a separate derived scalar would require explaining its relation to the unchanged measure.

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

## Disposition, checks, and next scientific question

Claim grade: derived for the reference-change identities, derivatives, fixed-center comparison trajectories, exact two-moving instantaneous approach and first-event ordering, sphere integrals, Laplacians, nonlinear radial flux, and finite-source asymptotics under their displayed assumptions. A changed gradient after changing only $r_0$, a radius-dependent circular speed for the exact fixed-center law $a_r=-\alpha/r$, or a nonzero divergence of the stated $\mathbf J$ away from the origin would refute the corresponding identity. Direct differentiation, trajectory substitution, and sphere integration provide the checkable instruments; the external references support only their stated classical comparisons.

Claim grade: guessed for a logarithmic primitive interaction, a medium-generated logarithmic response, a physically transported quadratic-gradient flux, or a logarithmic scale account in $\mathbb{A}\mathbb{A}\mathbb{A}$. The strongest supported conclusion is that a movable zero is harmless for a gradient-only response, while a logarithmic radial dependence has material dynamical consequences. No preferred radius, wake-speed ceiling, bound assembly, or cosmological ground is derived.

The before-and-after comparison supplies one conditional primitive acceleration-potential equation. Its physical source-to-receiver account remains to be specified, including what is conserved on an emitted sphere; the effective collective and accumulated-scale interpretations remain separate alternatives. A physical $r_0$–$c_f$ identification would additionally require an invariant event or solution relation that survives an additive scalar shift. The [remaining research plan](work-queue.md) uses the exact instantaneous collinear approach as its first-event control and retains the [existing conditional inverse-distance obstructions](analysis/inverse-distance-collinear-obstructions.md) at their separate delayed hypotheses. All logarithmic-potential development remains in this research directory while its promise is assessed; a proposed microscopic replacement still requires separate adjudication before adoption or corpus promotion.
