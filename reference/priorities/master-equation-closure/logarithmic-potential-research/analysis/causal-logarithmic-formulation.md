# Causal logarithmic response and prepared collinear histories

This treatment specifies the inverse-distance candidate sufficiently to pose the incoming two-body problem. Each architrino emits expanding spherical wakes; the receiver adds the acceleration from every admitted earlier emission, including its own emissions when the geometry admits them. The proposed change is a distance-dependent reception response. The wake geometry, polarity sign, and transmitter weighting retain their current definitions. The proposal is a primitive-law comparison within this research lane, not an accepted replacement of the [current Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form).

**Claim grade: guessed for the physical reception postulate; derived for the ordinary-root identities and local initial-value result below.** The mathematical result is conditional on that postulate and the specified histories. A missing causal root, a discrepancy in either explicit source check, or failure of the stated local regularity argument would refute the relevant mathematical claim. No energy-conservation, passage, or physical-law-selection claim follows from the formulation.

## Emission, reception, and the admitted domain

Let $\mathbf X_j(S)$ and $\mathbf V_j(S)$ be the position and velocity of transmitter $j$ at absolute emission time $S$, and let $T$ be the reception time. Set the wake propagation speed to $c_f=1$. Every emission creates a sphere centered permanently at $\mathbf X_j(S)$, with radius $T-S$ at time $T$ and conserved signed measure $q_j\,dS$. The surface measure per unit area is $q_j\,dS/[4\pi(T-S)^2]$. This is the normalized form of the canonical [emission-labeled wake transport](../../../../../content/markdown/aaa/dynamics/master-equation.md#autonomous-emission-labeled-wake-transport), and supplies a complete geometric emission account for the comparison. It does not identify the transported measure as energy.

For a receiver $i$, define the emission-to-reception vector, distance, outward unit direction, and causal support function by

$$
\mathbf r_{ij}(T;S)=\mathbf X_i(T)-\mathbf X_j(S),
\qquad R_{ij}=\|\mathbf r_{ij}\|,
\qquad \mathbf n_{ij}=\frac{\mathbf r_{ij}}{R_{ij}},
\qquad g_{ij}(T;S)=R_{ij}-(T-S).
$$

An admitted root is an emission time $S<T$ for which $g_{ij}=0$. The strictly earlier-time condition excludes the same-time self endpoint. At every ordinary root the range is positive and

$$
D_{t,ij}=\partial_Sg_{ij}
=1-\mathbf n_{ij}\cdot\mathbf V_j(S)\ne0.
$$

The candidate's transparent reception rule leaves the emitted sphere unchanged and contributes acceleration through

$$
\ddot{\mathbf X}_i(T)
=\sum_j\kappa_{\log}\sigma_{ij}|q_iq_j|
\int_{S<T}\frac{\mathbf n_{ij}(T;S)}{R_{ij}(T;S)}
\delta\!\left(g_{ij}(T;S)\right)\,dS,
\qquad
\sigma_{ij}=\operatorname{sign}(q_iq_j).
$$

The delta distribution selects the arriving spheres. At simple roots its emission-time change of variables gives the equivalent sum

$$
\boxed{
\ddot{\mathbf X}_i(T)
=\sum_j\sum_{S\in\mathcal C_{ij}(T)}
\kappa_{\log}\sigma_{ij}|q_iq_j|
\frac{\mathbf n_{ij}(T;S)}{R_{ij}(T;S)|D_{t,ij}(T;S)|}
},
\qquad
\mathcal C_{ij}(T)=\{S<T:g_{ij}(T;S)=0\}.
$$

Both descriptions mean this ordinary-root operator. Neither defines a value at a multiple root, zero delay, or zero range. Every admitted positive-delay self root has $j=i$ and positive polarity product; none is suppressed. The two-body problem has no other population, incoming environmental wake, cap, core, resetting, or impulse. An infinite number of roots would require a separately justified convergent sum; the incoming history studied below has only one partner root per receiver and no self roots.

The reception postulate is exactly a factor $R/L_*$ relative to the current inverse-square response when the couplings are matched by $\kappa=\kappa_{\log}L_*$ at a declared distance $L_*>0$. The propagated area density itself still falls as $1/R^2$. Thus the extra factor is a specified receiver response, rather than a consequence of dilution. Choosing this response completes the mathematical model; deriving it physically or recovering a collective effective response remains a separate question.

## Which logarithmic descriptions are equivalent

On a connected regular root chart, hold the transmitter history and reception time fixed while varying the receiver position. Implicit differentiation gives

$$
\nabla_{\mathbf X_i}S=-\frac{\mathbf n_{ij}}{D_{t,ij}},
\qquad
\nabla_{\mathbf X_i}R_{ij}=\frac{\mathbf n_{ij}}{D_{t,ij}}.
$$

With $C_{ij}=\kappa_{\log}\sigma_{ij}|q_iq_j|$ and the constant branch sign $\varepsilon_{ij}=\operatorname{sgn}(D_{t,ij})$, the local acceleration-potential is

$$
\Phi_{ij}^{\log}
=-C_{ij}\varepsilon_{ij}\ln(R_{ij}/r_0),
\qquad
-\nabla_{\mathbf X_i}\Phi_{ij}^{\log}
=\frac{C_{ij}\mathbf n_{ij}}{R_{ij}|D_{t,ij}|}.
$$

Here $r_0>0$ is an arbitrary reference length. Changing it adds a chartwise constant, and leaves the acceleration unchanged. The causal scalar and the direct radial replacement are therefore equivalent as receiver gradients on these regular charts. An extra transmitter weight inside the scalar would differentiate that weight and specify a different law. A chartwise scalar with retained histories is not a global action or conserved energy for the coupled evolution.

The [instantaneous comparison](instantaneous-collinear-first-event.md) evaluates both positions at one time and contains no causal-root factor. It has a different initial-value problem. The manuscript's [nonlinear-flux construction](../manuscript.md) supplies static scalar identities with a nonlinear flux and is also a distinct proposal; it supplies no derivation of the reception rule used here. Neither construction substitutes for the complete retained histories required below.

The logarithmic coefficient $\kappa_{\log}|q_iq_j|$ has dimensions of squared speed, $L^2T^{-2}$. The current inverse-square coefficient $\kappa|q_iq_j|$ has dimensions $L^3T^{-2}$. The calibration length $L_*$ changes how two different response laws are compared; the potential reference $r_0$ changes neither law.

## Complete supplied past and release

Place two equal-magnitude opposite polarities on a fixed line, with their midpoint at the origin. Write their labeled positions as

$$
\mathbf X_+(T)=x(T)\mathbf e,
\qquad
\mathbf X_-(T)=-x(T)\mathbf e,
\qquad
u(T)=-\dot x(T),
\qquad
K=\kappa_{\log}|q_+q_-|>0,
$$

where $\mathbf e$ is a fixed unit vector. Before contact, $x>0$ is the positive half-separation, the full separation is $2x$, and $u\ge0$ is each architrino's inward speed. The relative closing speed is $2u$.

The entire initial past is supplied, not truncated:

$$
\boxed{x(S)=a-u_0S,\qquad u(S)=u_0,
\qquad -\infty<S\le0,\qquad a>0,\quad 0\le u_0<1.}
$$

At $T=0$ the candidate equation begins to determine future acceleration, with $x(0)=a$ and $u(0)=u_0$. The principal preparation is rest release, $u_0=0$; the controlled inward preparation is $u_0=1/4$, with the same $a$ and $K$. Every emission from this supplied past remains available thereafter. The affine past is prepared initial data, not a claim that the unforced candidate equation generated the past: its zero prescribed acceleration generally disagrees with the nonzero mutual reception acceleration. Position and velocity match continuously at release, while acceleration may change there. No velocity impulse is imposed.

For the right receiver and left transmitter, the emission-to-reception direction is $+\mathbf e$ while both current and past half-separations are positive. The causal condition and source factor become

$$
T-S=x(T)+x(S)=R(T),
\qquad D_t(T)=1-u(S),
\qquad D_r(T)=1+u(T).
$$

Opposite polarity makes the right receiver accelerate leftward. Reflection gives the left receiver's equal inward acceleration. Once root completeness is established, the full candidate is consequently

$$
\boxed{\dot x(T)=-u(T),\qquad
\dot u(T)=\frac{K}{[x(T)+x(S(T))][1-u(S(T))]}.}
$$

The receiver factor appears only in the root playback identity

$$
\dot S(T)=\frac{1+u(T)}{1-u(S(T))}.
$$

It is not an additional acceleration multiplier.

## Complete root census before wake-speed equality

Assume a retained incoming prefix has $x(T)>0$ and $0\le u(T)<1$, together with the specified past. Define

$$
H(S)=S+x(S).
$$

Its derivative is $H'(S)=1-u(S)>0$. The supplied affine past has $H(S)=a+(1-u_0)S\to-\infty$ as $S\to-\infty$. The partner-root equation is

$$
H(S)=T-x(T).
$$

At $S=T$, its left side exceeds its right side by $2x(T)>0$. Strict monotonicity therefore gives exactly one partner root with $S<T$, positive range, and positive transmitter factor. The same argument applies at the reflected receiver.

Self reception is excluded by geometry on this prefix, rather than by altering the root rule. For any two distinct times $S<T$ on one labeled path,

$$
\|\mathbf X_i(T)-\mathbf X_i(S)\|
\le\int_S^T\|\mathbf V_i(\tau)\|\,d\tau
<T-S.
$$

The strict inequality follows from continuity and speed below one on every compact portion of the retained interval. Thus no positive-delay self root exists anywhere in the complete past. A first terminal instant with $u(T)=1$ also has no positive-delay self root if all earlier speeds are below one: equality at a single endpoint cannot make a nonzero-duration chord attain speed one. This says nothing about roots born in a proposed later continuation.

These arguments establish that the two equations above are the full two-body operator on the incoming sub-wake-speed prefix. They are not a partner-only approximation. A second partner root, a self root, or $D_t\le0$ on a prefix satisfying the stated hypotheses would directly refute the census.

## Explicit source checks and the first history interval

The stationary-source check can be done directly without differentiating a root-dependent scalar. A source held fixed at a point a distance $R$ from a fixed reception location has the unique emission time $S=T-R$, source derivative $D_t=1$, and candidate acceleration $K/R$ in the polarity-selected direction. This recovers the static inverse-distance response.

For a separate prescribed moving-source check, continue the affine geometry only as a supplied path, $x(\tau)=a-u_0\tau$, while $x(T)>0$. Solving the linear causal equation gives

$$
S(T)=\frac{(1+u_0)T-2a}{1-u_0},
\qquad R(T)=\frac{2(a-u_0T)}{1-u_0},
\qquad D_t=1-u_0,
\qquad D_r=1+u_0.
$$

Direct substitution into $R=T-S$ verifies the root independently of the scalar calculation. The candidate then evaluates to

$$
\dot u\big|_{\mathrm{evaluated\ affine\ path}}
=\frac{K}{2(a-u_0T)}.
$$

This is a response evaluation on a prescribed path, not an equation solved by that affine path: the prescribed acceleration is zero. It checks the sign, delayed distance, transmitter denominator, and playback derivative on a moving ordinary root.

For the actual released trajectory, until its selected partner emission time reaches $S=0$, only the affine supplied past is sampled. Substitution of $x(S)=a-u_0S$ gives the exact identities

$$
S(T)=\frac{T-x(T)-a}{1-u_0},
\qquad
R(T)=\frac{x(T)+a-u_0T}{1-u_0},
\qquad
\boxed{\dot u(T)=\frac{K}{x(T)+a-u_0T}.}
$$

In particular,

$$
S(0)=-\frac{2a}{1-u_0},
\qquad R(0)=\frac{2a}{1-u_0},
\qquad \dot u(0^+)=\frac{K}{2a}.
$$

The larger initial delayed distance for inward preparation is exactly offset by its larger transmitter weight in this logarithmic candidate. For $a=K=c_f=1$, rest preparation gives $S(0)=-2$, $R(0)=2$, and $D_t=1$, whereas $u_0=1/4$ gives $S(0)=-8/3$, $R(0)=8/3$, and $D_t=3/4$. Both give initial inward acceleration $1/2$; their initial root playback rates are respectively $1$ and $5/3$.

The selected root first joins the generated history at $S=0$, if that event lies in the interval under study. Its equation is $T=x(T)+a$. Because $d[T-x(T)]/dT=1+u(T)>0$, this join can occur at most once on an incoming prefix. Velocity is continuous at release, so this history join leaves the acceleration continuous; a derivative of acceleration may change when the sampled source acceleration changes.

## Local existence and uniqueness on the ordinary incoming domain

The affine preparation gives an actual locally well-posed initial problem. At release the unique partner delay is $2a/(1-u_0)>0$, its source factor is $1-u_0>0$, and there are no self roots. Choose a sufficiently short future interval on which $x>a/2$, $u<1$, and $T<a/2$. Then $T-x-a<0$, so all partner emissions still belong to the supplied past. The exact future equation on this interval is the ordinary differential equation

$$
\dot x=-u,\qquad \dot u=\frac{K}{x+a-u_0T},
\qquad (x(0),u(0))=(a,u_0).
$$

Its denominator is strictly positive near the initial data and its right side is locally Lipschitz in $(x,u)$. The ordinary initial-value existence and uniqueness theorem therefore gives one local solution. Since $\dot u>0$, the rest preparation immediately acquires inward speed and every inward preparation remains incoming while this domain persists. For the full two-body equations, the same initial positive-delay separation reduces the short-time problem to an ordinary differential equation with the fixed affine sources. Reflection symmetry and equal polarity magnitudes preserve the symmetric line solution by uniqueness.

The construction continues by short steps while the retained prefix satisfies positive half-separation and speed bounded strictly below one. On a compact such prefix, let $x\ge\delta>0$ and $u\le1-\eta$ with $\delta,\eta>0$. The partner delay is $R=x(T)+x(S)\ge2\delta$, since $x$ decreases on the incoming solution. Its inverse-coordinate representation

$$
S(T)=H^{-1}(T-x(T))
$$

has inverse derivative bounded by $1/\eta$ wherever the root is sampled. In a step shorter than the positive delay bound, the sampled position and velocity come entirely from the already constructed history. They are locally Lipschitz, including at the release join where velocity is continuous and its one-sided derivatives are bounded. Composition with $H^{-1}$ consequently gives a locally Lipschitz ordinary right side for the next step. Repeating these steps gives unique continuation on every compact part of this regular incoming domain.

This proof supplies local existence and uniqueness for the declared preparation, not for arbitrary histories, multiple roots, or singular endpoints. It also does not assert that speed one is reached before contact; that event ordering requires the separate incoming-motion derivation. Its hypotheses identify the quantities that must be controlled there. A failure of the positive delay bound, the source-factor bound, or the retained-history regularity prevents use of this continuation argument.

## Separately normalized current-law control

Keep the current-law comparison as a separate evolution with its own trajectory $x_{\mathrm c}(T)$, speed $u_{\mathrm c}(T)$, and partner root $S_{\mathrm c}(T)$. Give it the same supplied affine past and choose the fixed comparison length $L_*=2a$. With $G=\kappa|q_+q_-|=KL_*=2aK$, its incoming equations are

$$
\dot x_{\mathrm c}=-u_{\mathrm c},\qquad
\dot u_{\mathrm c}
=\frac{G}{[x_{\mathrm c}(T)+x_{\mathrm c}(S_{\mathrm c})]^2[1-u_{\mathrm c}(S_{\mathrm c})]},
\qquad
T-S_{\mathrm c}=x_{\mathrm c}(T)+x_{\mathrm c}(S_{\mathrm c}).
$$

The same root census and local initial-value construction apply on its own positive-separation, sub-wake-speed prefix. In its affine-past interval,

$$
\dot u_{\mathrm c}(T)
=\frac{2aK(1-u_0)}{[x_{\mathrm c}(T)+a-u_0T]^2},
\qquad
\dot u_{\mathrm c}(0^+)=\frac{K(1-u_0)}{2a}.
$$

The coefficients match the two per-hit accelerations at distance $2a$, so they match at release from rest. The inward preparation has initial causal range $2a/(1-u_0)$; keeping the calibration fixed therefore gives a different initial current-law acceleration. For $a=K=c_f=1$ and $u_0=1/4$, it is $3/8$, compared with the logarithmic candidate's $1/2$. Matching these inward initial accelerations as well would require changing $L_*$ to that preparation's larger causal range. That would be a different, explicitly retuned comparison. No such change is made here.

The factor $R/L_*$ compares the two operators on the same evaluated history. Their future histories generally differ, so neither equation's evolving roots or event times may be copied into the other. The present construction fixes the mathematical candidate and its initial domain; the incoming event and any later continuation must be proved for each evolution separately.
