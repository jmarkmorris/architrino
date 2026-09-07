# Absolute Timespace

This chapter specifies the fixed stage on which everything else happens.

**Absolute timespace** is one universal time line multiplied by one fixed three-dimensional space. Not woven together — multiplied, kept as two separate factors. A point in it is an event: somewhere, at some instant.

That word "multiplied" is doing real work, and it is where this theory parts company with established relativity at the deepest level. In relativity, space and time are components of a single four-dimensional geometry, and which parts of an event are "when" and which are "where" depends on who is looking. Here they never mix. Time is time, space is space, and no change of viewpoint trades one for the other.

The chapter defines that product background $\mathbb{R}\times\mathbb{R}^3$, the way it slices into instants, the mathematical data used to keep the two factors apart, and the geometry of the wakes that carry every interaction.

Absolute timespace is not relativistic spacetime. It is the formal product of [Absolute Time](absolute-time.md) and the [Euclidean Void](euclidean-void.md). Effective spacetime geometry, the curved thing observers reconstruct, is recovered later from assembly and medium dynamics. It is not the substrate.

## Core Concept

Absolute timespace is the non-dynamical background for all physical phenomena: the direct product of absolute time and the Euclidean void.

That product is a **foliated structure** — think of a deck of cards, where each card is all of space at one instant and the deck is stacked in time order. Each such card is called a *leaf* or a *slice*, and the universal time parameter $T$ says which one you are on. The physical state is indexed on a slice; it is not identical to the geometric slice.

In $\mathbb{A}\mathbb{A}\mathbb{A}$:

- Time and space are logically and mathematically separate.
- Simultaneity is absolute: all events sharing a value of $T$ are on the same slice, for everyone, always.
- There is no fundamental four-dimensional metric mixing time and space.
- The background is non-dynamical: it does not respond to matter, energy, assemblies, or the medium.

That separation sets the chapter's sequence. First name the substrate datum, then identify the effective layer that reads it. The void and absolute time are ontology. Clocks, rulers, metric tensors, and relativistic symmetries are behavior of assemblies and the medium — recovered, not assumed, and treated as closure targets wherever the derivation is not yet supplied.

Every instance of curvature, expansion, clock dilation, and relativistic behavior must be recovered as an effective description of what happens *inside* this fixed background.

## Product Manifold

The background is the Cartesian product

$$
\mathcal{M}=\mathbb{R}\times\mathbb{R}^3
$$

[View →](../../../../equation-mapping.html#corpus-equation-c17d24f0e7ad8f22)

meaning: pick any real number for time, and independently pick any point in three-dimensional space. Coordinates are

$$
(T,\mathbf X)=(T,X,Y,Z)
$$

[View →](../../../../equation-mapping.html#corpus-equation-e5f04fb02ab4af94)

and each such point is an **event**: a fixed location in the void at a definite instant.

The two factors have different jobs. The $\mathbb{R}$ supplies universal time and a total ordering of instants, hence of simultaneity slices. Two events on different slices have an unambiguous temporal order; distinct events on the same slice are simultaneous. The $\mathbb{R}^3$ supplies the fixed spatial container and its distance rule.

The product structure is fundamental. It is not an approximation to some deeper curved four-dimensional geometry waiting to be discovered.

## Foliation and Simultaneity Slices

Each instant $T=T_\ast$ defines a global slice

$$
\Sigma_{T_\ast}=\{T_\ast\}\times\mathbb{R}^3\cong\mathbb{R}^3
$$

[View →](../../../../equation-mapping.html#corpus-equation-7c8132d11e3e8cd2)

which is all of space at that one moment, and which is itself just a copy of ordinary three-dimensional space.

Every event belongs to exactly one slice. This slicing is absolute and does not depend on any frame.

Anything that persists traces a **worldline** through the background:

$$
\gamma:I\subset\mathbb{R}\to\mathcal{M},
\qquad
T\mapsto(T,\mathbf X(T))
$$

[View →](../../../../equation-mapping.html#corpus-equation-e40c37105a39c7cc)

Worldlines are graphs over $T$: for each instant there is exactly one position. Admissible physical evolution is future-directed, so it is followed toward increasing $T$. Reversing an auxiliary curve parameter would merely retrace the same geometric curve and would not define a second physical evolution.

The future-directed admissibility rule and the wake law's support condition $T_t<T_r$ exclude causal loops: every link of an admissible causal chain increases $T$, so the chain cannot return to its starting event. This excludes the paths returning to their own past that occur as closed timelike curves in some relativistic geometries. The product manifold supplies a global time parameter; the admissibility and support rules select the physical direction of evolution. Being a graph over $T$ alone does not select that direction.

Absolute timespace is a stack of Euclidean spaces, one for each value of $T$, and a worldline pierces exactly one slice at each instant.

### The complete state on a slice

On a fixed slice the complete state is written

$$
\mathbb{U}_{\text{now}} \equiv S(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-905ffb69b4d67db6)

covering every architrino position, velocity, and polarity, plus the path-history and provenance records and the self-hit history that deterministic evolution requires.

This is emphatically not an observer's measurement record. Observers sample or coarse-grain this state through assemblies and their coupling to the medium, and that distinction is what keeps absolute simultaneity from being confused with clocks that have been synchronized by some procedure.

The same distinction blocks a common objection from relativity. A slice $\Sigma_T$ is a real element of the ontology, but it is not a readable global present. Observers recover simultaneity through clock phases, ruler records, photon channels, and local medium state. The closure target is that those channels reproduce the special-relativistic absence of an invariant observer-accessible global "now" within measured precision. Cosmological records such as the rest frame of the microwave background supply an approximate effective slicing, but that is an inferred chart, not the substrate slice.

Because the master equation depends on path history, the complete state is not merely a list of current positions and velocities. In established mechanics a system is called **Markovian** when the present state alone determines the future; this one is not in an instantaneous-state description, because a receiver may respond to earlier transmitter events retained by the admitted causal-root domain. So the slice state carries more:

$$
S(T)
=
\big(
X(T),
H_T,
\mathcal{N}_{\mathrm{sea}}(T,\cdot),
\mathcal{B}_T
\big)
$$

[View →](../../../../equation-mapping.html#corpus-equation-b8f87e751d9129e0)

where $X(T)$ holds the instantaneous architrino and assembly data, $H_T$ is the retained path-history and provenance ledger, $\mathcal{N}_{\mathrm{sea}}$ is the local medium state, and $\mathcal{B}_T$ records the dynamically occupied branch and active root labels. A numerical regularization may accompany this state in a calculation, but it is not thereby promoted into ontology. Determinism applies to the complete physical state on a chart where the initial-history problem is well posed, not to a history-free snapshot.

## Newton-Cartan Data

The background geometry is encoded by a *pair* of structures rather than a single metric, and the reason is worth stating before the formalism.

A four-dimensional metric of the relativistic kind assigns a length to any displacement, including displacements that mix time and space. That is exactly what this theory refuses to do. So instead of one object measuring everything, there are two: one that keeps time ordered, and one that measures distance within a slice. This arrangement is called **Newton-Cartan** geometry, after the mathematical framework developed to give Newtonian physics the same geometric language relativity uses.

The clock structure is the **1-form** $dT$:

$$
dT
$$

[View →](../../../../equation-mapping.html#corpus-equation-0fe7adc347436e7a)

A 1-form is a machine that eats a displacement and returns a number; this one returns how much time the displacement covers. It is **closed** and **exact**, technical conditions that together mean it is the derivative of a genuine global function — there really is a universal time $T$, not merely a local notion of elapsed time that might fail to fit together globally. It never vanishes, and its level sets are the slices $\Sigma_T$.

Notation discipline: $\tau$ is reserved for derived observer proper time, emission times are $T_t$, and causal delay is $\Delta_{ij}=T-T_t$.

The spatial metric on each slice is

$$
h=dX^2+dY^2+dZ^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-15c89c7543c55597)

with components

$$
h_{ij}=\delta_{ij}
$$

[View →](../../../../equation-mapping.html#corpus-equation-5bc8229205e63bfc)

and it acts only on displacements lying within a slice. Time and space are therefore carried separately by the pair $(dT,h)$, which is the whole point of the arrangement.

### The connection is additional substrate data

A **connection** $\nabla$ is the rule for comparing vectors at different points — what "parallel" and "unaccelerated" mean. The substrate connection is required to be flat and torsion-free and to satisfy the compatibility conditions

$$
\nabla dT=0,
\qquad
\nabla h=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-5e8d2d2a37022aee)

meaning it preserves both the time structure and spatial distances. "Torsion-free" means that the connection has no antisymmetric displacement defect; infinitesimal parallelograms close under parallel transport. Flatness is the separate condition that its curvature vanishes.

Unlike the nondegenerate metric case, these compatibility conditions **do not pin down a unique connection**. The same degenerate time-and-space data admit many compatible torsion-free connections, with their difference commonly encoded by Newton–Coriolis two-form data. Those alternatives need not all be flat, and they are not all coordinate descriptions of one connection.

The theory therefore supplies a flat connection as an additional substrate commitment. In Cartesian coordinates adapted to that connection,

$$
\Gamma^\lambda_{\mu\nu}=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-ced9e1e9a19afbc8)

so covariant derivatives reduce to ordinary partial derivatives and straight constant-velocity worldlines are unaccelerated. The wake law then selects a preferred inertial rest frame within this flat affine structure: the frame in which $c_f$ is isotropic. It does not derive the connection from $(dT,h)$ alone.

Time-dependent rotating or accelerating coordinates can describe this same flat connection with nonzero Christoffel symbols. For a rotating orthonormal frame, the local rotational chart data are represented by a connection 1-form valued in infinitesimal rotations,

$$
\omega_{\mathrm{rot}}
\in
\Omega^1(\mathcal{M})\otimes\mathfrak{so}(3)
$$

[View →](../../../../equation-mapping.html#corpus-equation-92b456bc0c19791a)

where $\mathfrak{so}(3)$ is the space of infinitesimal rotations. These coordinate-induced coefficients are descriptive and leave the curvature zero. They must not be conflated with the full family of Newton–Cartan-compatible connections, whose members can encode different inertial or gravitational structure rather than a mere change of chart.

### Non-Inertial Coordinate Terms

Describing motion in a rotating chart makes extra terms appear. With $\mathbf X=R(T)\mathbf X'$ at angular velocity $\boldsymbol{\Omega}$, the acceleration decomposes as

$$
\mathbf A
=
R(T)\left[
\mathbf A'
+2\boldsymbol{\Omega}\times\mathbf V'
+\boldsymbol{\Omega}\times(\boldsymbol{\Omega}\times\mathbf X')
+\frac{d\boldsymbol{\Omega}}{dT}\times\mathbf X'
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-99a7e5771cb12c88)

The three extra terms are familiar from established mechanics. In the displayed expression for inertial-frame acceleration, $2\boldsymbol{\Omega}\times\mathbf V'$ is the Coriolis kinematic term, $\boldsymbol{\Omega}\times(\boldsymbol{\Omega}\times\mathbf X')$ points inward toward the rotation axis, and the last term is the Euler contribution from changing rotation rate. When the equation is solved for $\mathbf A'$, their negatives are the familiar fictitious Coriolis, outward centrifugal, and Euler accelerations. None adds curvature to the void or introduces a substrate magnetic field.

Their value here is diagnostic. They show how equations full of transverse, velocity-dependent terms can arise purely from a choice of chart, while the substrate stays $\mathbb{R}\times\mathbb{R}^3$ with its flat connection.

That matters because it sets up a strict rule against a tempting error. A transverse velocity-dependent term produced only by a rotating or accelerating chart carries **no transmitter identity, no emission time, no causal-root label, and no energy ledger entry.** It cannot source a physical interaction or an emergent magnetic channel, because there is nothing behind it. A genuine transverse interaction has to be traced back to wake provenance in the [Master Equation](../dynamics/master-equation.md), or to an explicitly derived reduction of such provenance — never to inertial-coordinate algebra.

Stated formally, let $\mathcal{P}[\mathcal{T}]$ be the provenance payload of a candidate term: transmitter identity, emission time, root label, and energy row. Pure inertial terms satisfy

$$
\mathcal{P}[\mathcal{T}_{\mathrm{inertial}}]=\varnothing
$$

[View →](../../../../equation-mapping.html#corpus-equation-fbcfc376e5f01a61)

their payload is the empty set, while a physical wake-mediated term must have a nonempty one after reduction to the retained branch record. The test separates gauge artifacts from real interactions, and it is mechanical rather than a matter of judgment.

## No Fundamental 4D Metric

$\mathbb{A}\mathbb{A}\mathbb{A}$ does **not** define a fundamental four-dimensional metric $g_{\mu\nu}$ on $\mathcal{M}$.

Consequently:

- There is no fundamental interval mixing $dT$ and $d\mathbf X$.
- There are no fundamental Lorentz boosts rotating time into space.
- Proper time is not a substrate quantity.
- Effective metric language belongs to observer-level reconstruction.

The declared data $(dT,h,\nabla)$ encode the substrate kinematics: absolute ordering, Euclidean geometry, and the additional flat affine connection. The wake law selects the preferred rest frame within that structure. Relativistic metric language enters only after clocks, rulers, and signal channels have been reconstructed.

## Measurement and Geometry

Spatial distance within a slice is

$$
d_{\text{spatial}}(\mathbf X_1,\mathbf X_2)
=
\sqrt{\delta_{ij}(X_1^i-X_2^i)(X_1^j-X_2^j)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4ed111c880d463cf)

ordinary Pythagoras. Temporal duration between events is

$$
\Delta T=|T_2-T_1|
$$

[View →](../../../../equation-mapping.html#corpus-equation-102dc50f1575f4b3)

with no dependence on who is measuring. Spatial arc length along a path is

$$
L[\mathbf X;T_1,T_2]
=
\int_{T_1}^{T_2}\|\mathbf V(T)\|\,dT
=
\int_{T_1}^{T_2}
\sqrt{
\left(\frac{dX}{dT}\right)^2+
\left(\frac{dY}{dT}\right)^2+
\left(\frac{dZ}{dT}\right)^2
}\,dT
$$

[View →](../../../../equation-mapping.html#corpus-equation-5517bcd09102947b)

speed integrated over time, which is distance travelled.

A four-dimensional relativistic arc length such as

$$
s=\int\sqrt{\left|g_{\mu\nu}\,dx^\mu dx^\nu\right|}
$$

[View →](../../../../equation-mapping.html#corpus-equation-b3f429e785a987e8)

is a comparison form only. It is what established relativity computes, included here so the two can be set side by side, and it is not a substrate object.

## Velocity, Acceleration, and Momentum

Velocity is

$$
\mathbf V(T)=\frac{d\mathbf X}{dT}
$$

[View →](../../../../equation-mapping.html#corpus-equation-03592408a97d58ff)

speed is its magnitude

$$
\|\mathbf V\|
$$

[View →](../../../../equation-mapping.html#corpus-equation-1d4a67bf31ec688e)

and acceleration is the rate of change of velocity

$$
\mathbf A(T)=\frac{d\mathbf V}{dT}
=
\frac{d^2\mathbf X}{dT^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-b022bab9465b2ae3)

At the observer level the familiar low-speed forms are

$$
\mathbf p=m\mathbf V,
\qquad
K=\frac{1}{2}m\|\mathbf V\|^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-672b055f139227e2)

momentum and kinetic energy. But $m$ here is an effective assembly-response coefficient, not substrate data — no architrino has one.

Causal-root hits produce accelerations directly. Time supplies the evolution parameter and nothing else: it contributes no curvature, no acceleration, and no clock dilation by itself.

### Mass is a response, not a constant

The scalar $m$ is not a primitive constant. A useful contrast is the rigid-body inertia tensor of ordinary mechanics, which converts angular velocity into angular momentum — but only *after* someone has supplied a mass distribution. Here there is no mass distribution to supply. The inertial response has to be derived from the assembly's own internal ledger, its shielding, its coupling to the medium, and its orientation.

For a coarse-grained assembly $A$, the linear response is a pair of maps:

$$
\delta p_i
=
\mathcal{M}^{\mathrm{resp}}_{ij}
\!\left(A;\mathcal{H}_A,\mathcal{S}_A,\left.\mathcal{N}_{\mathrm{sea}}\right|_A,R_A\right)
\delta V^j,
\qquad
\delta J_i
=
\mathcal{I}^{\mathrm{resp}}_{ij}
\!\left(A;\mathcal{H}_A,\mathcal{S}_A,\left.\mathcal{N}_{\mathrm{sea}}\right|_A,R_A\right)
\delta\Omega^j
$$

[View →](../../../../equation-mapping.html#corpus-equation-03b78cbf7ecefc3c)

reading as: a small change in velocity produces a change in momentum through a response matrix, and a small change in rotation rate produces a change in angular momentum through another. The arguments are the assembly's closed internal history $\mathcal{H}_A$, its shielding $\mathcal{S}_A$, the local medium state it samples, and its orientation $R_A$ relative to the rest frame.

Ordinary scalar mass is recovered only where the response matrix becomes proportional to the identity, $\mathcal{M}^{\mathrm{resp}}_{ij}\to m\,\delta_{ij}$, across the directions probed — that is, only where the assembly responds identically however you push it.

That isotropy is an assembly-geometry claim, not a convenient assumption. If the retained trajectory bundle and internal ledger have no preferred axis at the probed scale, the response can reduce to $m\delta_{ij}$. If the branch keeps an axial layer or other framed orientation, the leading correction is a direction-dependent residual unless shielding and averaging cancel it. A candidate diagnostic of this directional structure is the symmetric trace-free framing tensor

$$
Q_A^{ij}
=
\left\langle
\hat n^i\hat n^j-\frac{1}{3}h^{ij}
\right\rangle_A^{\mathrm{frame}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e2f115e364e4de37)

where $\hat{\mathbf n}$ is a unit framing direction and the average is normalized so that $\langle1\rangle_A^{\mathrm{frame}}=1$. A branch calculation must declare how it extracts the framing directions, which history interval it averages, and how it assigns and normalizes their weights. Weights derived from action, energy, or angular-momentum data are distinct prescriptions unless their equivalence is established. The prescription is fixed before comparing the response channels.

Subtracting the isotropic part makes $Q_A$ trace-free. Its vanishing means there is no **quadrupolar** preferred-axis moment in this statistic; higher directional moments, phase relations, and delayed-history information can remain. Consequently, $Q_A=0$ alone establishes neither full framing isotropy nor isotropy of the physical response.

### Framing-Quadrupole Economy Theorem Target

The quadrupole economy target is to identify a branch regime in which a bound on $\|Q_A\|$, with the averaging prescription fixed, controls all three leading preferred-axis effects:

1. the matter-sector orientation residual $\epsilon_M^{\mathrm{HD}}$;
2. the clock-orientation residual $\Delta^{\mathrm{ori}}$;
3. the ruler anisotropy carried by the trace-free part of $B_{ij}$.

Establishing this target requires deriving each response from the assembly's delayed dynamics and medium coupling. The matter calculation must relate framing to the directional inertial response; the clock calculation must relate it to the counted cycle frequency; the ruler calculation must relate it to the measured spatial response. Each derivation must identify its dependence on $Q_A$ and bound the effect of information discarded by that average. A leading-order claim also needs a declared expansion parameter and a bound on the omitted terms, uniform over the stated branch regime and probe orientations. Small $Q_A$ does not by itself supply either a small omitted contribution or a bounded response gain.

The common physical history must account consistently for all three channels. The sufficiency of this particular tensor is an additional, unestablished reduction claim. If a channel depends materially on omitted information, that information must be retained or its effect controlled within a narrower approximation. Failure of quadrupole economy alone does not establish failure of the underlying physical account.

The isotropic limit is not a simplifying convention but an experimental constraint. **Hughes–Drever experiments** compare atomic clocks as the Earth rotates, testing whether physics depends on which way an apparatus points; they are among the most precise null results in physics. So the residual attached to $\mathcal{M}^{\mathrm{resp}}_{ij}$ has to be declared against them:

$$
\epsilon_M^{\mathrm{HD}}
=
\sup_{\hat{\mathbf{n}}}
\left|
\frac{\hat n^i
\left(\mathcal{M}^{\mathrm{resp}}_{ij}-m\delta_{ij}\right)
\hat n^j}{m}
\right|
$$

[View →](../../../../equation-mapping.html#corpus-equation-a5215f9ae9b96d4e)

taking the worst direction, measuring how far the response departs from pure scalar mass, and dividing by $m$ to make it a fractional figure.

The benchmark is not one universal number, because translations into the standard catalogue of Lorentz-violation coefficients are species- and channel-dependent and often dimensionful. Some proton-sector clock-comparison coefficients are bounded near $10^{-27}\,\mathrm{GeV}$; that number is not a dimensionless ceiling on $\epsilon_M^{\mathrm{HD}}$. Passing requires an explicit projection from the assembly response to the experimental coefficient being compared. The maintained [Data Tables for Lorentz and CPT Violation](https://arxiv.org/abs/0801.0287) provide the channel-by-channel limits.

## Galilean Kinematic Structure

The background admits the kinematic transformations that preserve both the slicing and the spatial metric.

Time translation:

$$
T'=T+T_0,
\qquad
\mathbf X'=\mathbf X
$$

[View →](../../../../equation-mapping.html#corpus-equation-8987a5718e9a16e3)

Spatial translation:

$$
T'=T,
\qquad
\mathbf X'=\mathbf X+\mathbf X_0
$$

[View →](../../../../equation-mapping.html#corpus-equation-382eb44a0069c60c)

Rotation:

$$
T'=T,
\qquad
\mathbf X'=R\mathbf X,
\qquad
R\in SO(3)
$$

[View →](../../../../equation-mapping.html#corpus-equation-255b2a33ef41d60e)

**Galilean boost** — the everyday change to a viewpoint moving at constant velocity, in which velocities simply add:

$$
T'=T,
\qquad
\mathbf X'=\mathbf X+\mathbf V_0T
$$

[View →](../../../../equation-mapping.html#corpus-equation-2b31d19894e289a8)

Every one keeps $T'=T$ up to a constant shift, so simultaneity survives — which is precisely what a Lorentz boost fails to do.

Together these form the Galilean group, combining time translations, spatial Euclidean transformations, and boosts. This is a statement about the background's kinematics, not about the dynamics.

## Preferred Rest Frame from the Wake Law

Galilean boosts preserve the slicing, but the *interaction law* does not treat them equally. It selects a preferred frame: the one in which the wake speed $c_f$ is the same in all directions.

The asymmetry is visible directly in the root condition. Under a boost $\mathbf X'=\mathbf X-\mathbf U T$, the same primitive condition becomes

$$
\left\|
\mathbf X'_i(T)-\mathbf X'_j(T_t)+\mathbf U(T-T_t)
\right\|
=
c_f(T-T_t),
\qquad
T_t<T
$$

[View →](../../../../equation-mapping.html#corpus-equation-87cc85fb442bdb06)

and the extra $\mathbf U(T-T_t)$ term does not go away. The wake is no longer a sphere centered where it was emitted; it is a sphere drifting sideways. The isotropic form is recovered only when $\mathbf U=\mathbf{0}$ relative to the void's rest frame.

So boosts are legitimate coordinate descriptions of the background but are not symmetries of the wake law. This selects a rest *structure* for the dynamics — not a preferred origin, and not a built-in axis.

This is not curvature. It is a structural consequence of finite-speed propagation: the wake speed is fixed relative to the void, and everything else builds on that.

The observer-level task is therefore not to remove the absolute frame from the ontology. It is to derive how clocks, rulers, and signals conceal it to the precision experiments have reached. See [Lorentz Kinematics](../spacetime/lorentz-kinematics.md) and [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md).

## Speed Convention

The foundation stack keeps several speeds distinct, and collapsing them is a recurring source of error:

| Symbol | Meaning | Status |
| --- | --- | --- |
| $c_f$ | Primitive causal-wake propagation speed relative to the Euclidean void | fundamental |
| $c_\gamma(\mathcal{N}_{\mathrm{sea}},\hat{\mathbf{k}})$ | Photon-channel speed in a given medium state and direction | derived |
| $c_{\text{eff}}$ | Effective signal or clock-channel speed for a specified dressed branch | derived/contextual |
| $c_\star$ | Local comparison speed in a declared clock, ruler, or signal branch | branch-dependent |
| $c_0$ | Measured low-energy invariant light speed in weak homogeneous conditions | empirical calibration target |

None of these may be identified with another unless a document states the regime and the derivation. In particular $c_f$ belongs to the primitive root equations, while $c_0$ is what a laboratory measures.

## Causal Wake Geometry

Causal-wake propagation respects absolute temporal order and the finite speed $c_f$. Temporal order, direct wake support, and the locations a wake has passed by a given time describe different aspects of that propagation. The master equation selects direct contributions by the support equality.

For two events

$$
A=(T_A,\mathbf X_A),
\qquad
B=(T_B,\mathbf X_B)
$$

[View →](../../../../equation-mapping.html#corpus-equation-5284a40dafc30538)

$A$ can causally precede $B$ only if

$$
T_A<T_B
$$

[View →](../../../../equation-mapping.html#corpus-equation-e37ea6c0628046e5)

That is **temporal order**, and it is necessary but not sufficient.

A wake emitted at $(T_t,\mathbf X_{\mathrm{em}})$ occupies the surface

$$
\|\mathbf X-\mathbf X_{\mathrm{em}}\|=c_f(T-T_t),
\qquad
T>T_t
$$

[View →](../../../../equation-mapping.html#corpus-equation-e07376a5400d1530)

an expanding sphere. That is the **actual wake support**.

Including every fixed spatial location reached no later than a given time produces the filled set

$$
\{(T,\mathbf X):T\geq T_t,\ \|\mathbf X-\mathbf X_{\mathrm{em}}\|\leq c_f(T-T_t)\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1d76ea7bd73813c1)

which records passage by time $T$, with the emission point included as the boundary case $T=T_t$.

The sphere gives the direct support of that emission at the current time. An interior event in the filled set is not an additional direct hit: the wake passed that fixed location earlier. With $c_f=1$, a wake emitted at the origin at $T_t=0$ reaches a location one unit away at $T=1$; the event at that location at $T=2$ lies inside the filled set but receives no second contribution from that emission. A moving receiver can meet the same surface again only if its worldline intersects it again. With a mollifier, direct support is represented by a narrow shell around the surface, interpreted in the limit.

Indirect influence also includes changes carried forward in affected worldlines and later emissions. The filled set has not been proved to bound all such influence: individual architrinos are not kinematically restricted to speeds below $c_f$. A reachability theorem for a specified signaling procedure must account for its admitted transport and relay mechanisms. This distinction adds no observer-level faster-than-light signaling claim.

For transmitter $j$ and receiver $i$ the root function is

$$
F_{ij}(T_r,T_t)
=
\|\mathbf X_i(T_r)-\mathbf X_j(T_t)\|-c_f(T_r-T_t),
\qquad
T_t<T_r
$$

[View →](../../../../equation-mapping.html#corpus-equation-24ab0b04a66ba894)

the difference between how far apart they were and how far the wake has travelled, zero exactly when the sphere arrives. The active roots are

$$
\mathcal{C}_{ij}(T_r)
=
\{\,T_t<T_r:F_{ij}(T_r,T_t)=0\,\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e9bc8f92cc4493ea)

every past emission moment currently being heard. The same notation covers partner hits ($i\ne j$) and self-hits ($i=j$).

On a regular root chart, a nonzero emission-time derivative permits local continuation of a root. A declared positive margin supplies a quantitative conditioning bound:

$$
\left|
\partial_{T_t}F_{ij}(T_r,T_t)
\right|
=
\left|
c_f-\hat{\mathbf{r}}_{ij}(T_r,T_t)\cdot\mathbf V_j(T_t)
\right|
\ge
\kappa_{\mathrm{hit}}>0
$$

[View →](../../../../equation-mapping.html#corpus-equation-66377babb203934c)

where

$$
\mathbf{r}_{ij}(T_r,T_t)=\mathbf X_i(T_r)-\mathbf X_j(T_t),
\qquad
\hat{\mathbf{r}}_{ij}=\frac{\mathbf{r}_{ij}}{\|\mathbf{r}_{ij}\|}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0beea2d96374e0e7)

The middle expression is the transmitter-side factor met in [Architrino](architrino.md). Falling below a chosen margin can leave the derivative nonzero and the root simple; it does not by itself establish a caustic. Actual derivative zero requires a singular-root analysis. Preserving the root inventory also requires that no root enter or leave the retained history boundaries and that the admitted transmitter-receiver pair set remain fixed. A regular root can leave a memory window without any derivative degeneration.

On a smooth branch $T_t=T_{t,\ell}(T_r)$, differentiating the root condition gives

$$
\frac{dT_{t,\ell}}{dT_r}
=
\frac{c_f-\hat{\mathbf{r}}_{ij}(T_r,T_{t,\ell})\cdot\mathbf V_i(T_r)}
{c_f-\hat{\mathbf{r}}_{ij}(T_r,T_{t,\ell})\cdot\mathbf V_j(T_{t,\ell})}
$$

[View →](../../../../equation-mapping.html#corpus-equation-44c0a4132a111eae)

the rate at which the emission time being heard advances as the reception time advances. This is not a new coupling constant. It separates the transmitter-side factor from the rate at which a moving receiver sweeps through the emitted sequence — a receiver rushing toward a transmitter samples its past faster than one standing still. A stationary receiver in the rest frame makes the numerator exactly $c_f$. Radial receiver motion changes the accumulated action and must be recorded whenever a proof integrates over history rather than evaluating one event.

The status of $\kappa_{\mathrm{hit}}$ is fixed in [Absolute Time](absolute-time.md#causality-and-finite-propagation-speed): a declared branch-chart bound, not a universal constant, coordinate parameter, or regulator width.

### Exceeding the wake speed is permitted; backward influence is not

The product geometry does not forbid a point architrino from exceeding $c_f$. Backward influence is excluded by future-directed evolution and the wake law's $T_t<T_r$ support rule. A constituent speed and the temporal orientation of an interaction are separate questions.

This separates kinematic freedom from dynamical stability. The substrate imposes no speed limit on a point. It does not follow that an assembly can be carried through that regime intact, and the rest of this section is about why.

In observer-level wave language causality is usually diagnosed by front velocity rather than group or phase velocity. The substrate statement is sharper: the causal front is the first nonzero wake support in absolute time, full stop. Group-speed and phase-speed effects are summaries of how an already-causal record is sampled, and cannot override the support condition.

For ordinary matter the relativistic speed limit is a closure *target* for assembly structure and channel dressing, expressed with $c_\star$ or with $c_0$ in the weak homogeneous branch. Once derived, it constrains the recovered observer branch, not the admissible velocities of individual architrinos.

At the primitive level, approaching $c_f$ can make the leading and trailing constituents sample increasingly asymmetric delayed ledgers. The theorem target is to show, for each retained assembly class, whether that asymmetry produces severe deformation, phase loss, or dissociation. The background itself supplies no speed prohibition, and the qualitative ledger asymmetry is not yet a proof of structural failure.

### A diagnostic for that failure

A useful theorem-target diagnostic follows the instantaneous root inventory through one declared return cycle. At each reception time $T_r$, fix the assembly pair set and retained history domain, then split its finite set of simple roots by the sign of their emission-time derivative into counts $N_+(A;T_r)$ and $N_-(A;T_r)$. The signed count is

$$
\chi_{\mathrm{root}}(A;T_r)
=
N_+(A;T_r)-N_-(A;T_r)
=
\sum_{i,j\in A}
\sum_{T_t\in\mathcal{C}_{ij}(T_r)}
\operatorname{sgn}\!\left(\partial_{T_t}F_{ij}(T_r,T_t)\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-085c6e60abf7246e)

where the root sets are restricted to that retained domain. These are counts at $T_r$ followed as functions of reception time, not totals of sampled rows accumulated over the cycle. Sampling the same smooth root branch more often does not create additional roots.

The two components detect different failures, which is why both are kept. Generic fold events create or destroy roots in pairs of *opposite* sign, so they change the unsigned total $N=N_++N_-$ by $\pm2$ while leaving the signed total $\chi_{\mathrm{root}}$ untouched — the conservation recorded in [Master Equation](../dynamics/master-equation.md#signed-causal-root-complex) and [Noether Braid Topological Charge](../noether-braid/noether-braid-topological-charge.md).

So a near-threshold fold cascade shows up as jumps in $(N_+,N_-)$ with $\chi_{\mathrm{root}}$ steady, while a jump in $\chi_{\mathrm{root}}$ itself signals something else: a root leaving the chart or memory window, a change in the pair set, or a degeneracy outside the generic fold class. A structural-integrity failure near $c_f$ should appear here rather than as some smooth slowing of the background. This is a diagnostic target for Theorem G, not a proof that every branch fails at the same speed.

### The Lorentz-closure burden

That structural-integrity claim is the central Lorentz-closure target for this chapter, restated as Theorem G in [Lorentz Kinematics](../spacetime/lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure). It has to prove considerably more than "assemblies break near $c_f$."

A successful recovered branch must show that four separately-defined limiting speeds collapse to one:

$$
c_{\mathrm{mat}}^{\mathrm{lim}}
=
c_{\text{eff}}
=
c_\gamma
=
c_0
\left[1+O(\epsilon_{\mathrm{LV}})\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-526d35d9d534becb)

the matter limit, the dressed clock and ruler speed, the photon speed, and the calibrated laboratory speed, agreeing to within the Lorentz-violation budget $\epsilon_{\mathrm{LV}}$. The same constitutive record must keep the gravitational-wave speed tied to the photon channel within the multi-messenger residual.

It must also recover the three boost generators the substrate dynamics lacks, so that the seven proved substrate symmetries participate in the ten-generator Poincare structure within the same budget. The Lorentz subgroup has six generators, comprising three rotations and three boosts; the four time and space translations complete the Poincare group. Counting generators is not the same as conserving the associated charges, and those remain separate closure targets.

The approach to the limit must recover the Lorentzian changes relative to a declared rest branch. Let $R_\parallel(v_{\mathrm{eff}})$ and $R_\perp(v_{\mathrm{eff}})$ be positive longitudinal and transverse envelope radii measured by the same prescription, with internal excitation, medium state, and reference orientation held fixed in the branch comparison. Normalize each radius to its rest value. In a weak homogeneous observer chart calibrated so that the reference clock has $d\tau/dt_{\mathrm{eff}}=1$ at rest, the targets are

$$
\frac{R_\parallel(v_{\mathrm{eff}})/R_\parallel(0)}
{R_\perp(v_{\mathrm{eff}})/R_\perp(0)}
=
\frac{1}{\gamma_0(v_{\mathrm{eff}})}
+O(\epsilon_{\mathrm{LV}}),
\qquad
\frac{d\tau}{dt_{\mathrm{eff}}}
=
\frac{1}{\gamma_0(v_{\mathrm{eff}})}
+O(\epsilon_{\mathrm{LV}}),
\qquad
\gamma_0(v_{\mathrm{eff}})
=
\left(1-\frac{v_{\mathrm{eff}}^2}{c_0^2}\right)^{-1/2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-c2c28880e4a680bb)

The first compares longitudinal and transverse deformation factors; it does not require equal radii at rest. In normalized units $c_f=1$, a rest aspect ratio of two gives the target moving aspect ratio $2/\gamma_0$, not $1/\gamma_0$. The second compares the moving clock rate with its calibrated rest rate. Both statements apply for $0\le v_{\mathrm{eff}}<c_0$ in the declared branch regime. The residual estimates require an explicit velocity interval and uniform bounds on that interval; extending them arbitrarily close to $c_0$ is an additional limit estimate, not a consequence of the displayed $O(\epsilon_{\mathrm{LV}})$ notation.

Matter transport, clock retiming, photon transport, and laboratory calibration must be derived consistently from the same retained physical record and medium response. Their observable maps can differ: a clock counts cycles, a ruler compares spatial extents, and a signal measurement compares emission and reception records. Agreement obtained by independently fitting those channels does not establish the common dynamical origin.

A group representation describes a different mathematical object from any one of those measured ratios. In the recovered homogeneous observer geometry, fix a boost axis and let $\mathcal D$ act on the four event coordinates $x_{\mathrm{eff}}^\mu=(c_0t_{\mathrm{eff}},x_{\mathrm{eff}}^1,x_{\mathrm{eff}}^2,x_{\mathrm{eff}}^3)$. Its standard Lorentz representation is

$$
\mathcal{D}(v_{\mathrm{eff}})=\exp\!\left(\varphi_{\text{eff}}K\right),
\qquad
\tanh\varphi_{\text{eff}}=\frac{v_{\mathrm{eff}}}{c_0},
$$

[View →](../../../../equation-mapping.html#corpus-equation-d47aad562c4e8ad1)

where **rapidity** $\varphi_{\text{eff}}$ adds under composition of collinear boosts, and $K$ is the dimensionless linear generator for the chosen axis in this event-coordinate representation. This is an observer-level recovery target, not an imposed action on native assembly histories. Non-collinear boosts also include a rotation and cannot be summarized by scalar rapidity addition.

Clock readings and simultaneous length comparisons require their own extraction maps from transformed event records. Their reduced factors need not obey the composition law of $\mathcal D$: the contraction factor $\operatorname{sech}\varphi_{\mathrm{eff}}$ does not multiply under rapidity addition. Different observable spaces may also represent the same abstract symmetry with different matrices. Lorentz recovery requires a consistent action and observation maps derived from the common physical record; different reduced maps alone do not demonstrate failure.

The target fails if stable matter classes acquire composition-dependent limiting speeds, if the photon channel stays independently dressed from matter transport, or if the leading deformation is non-Lorentzian once $c_0$ is calibrated. The observer speed limit is a structural barrier only after all of this closes.

## Coordinates and Forbidden Transformations

Allowed substrate coordinates preserve the product structure:

- $T$ remains the absolute time parameter.
- Spatial coordinates may be Cartesian or curvilinear on $\Sigma_T$.
- Spatial coordinate changes may rewrite $h_{ij}$ without curving the void.

Forbidden at the substrate level:

- Lorentz boosts as fundamental time-space rotations.
- Transformations $T'=T+f(\mathbf X)$ with nonconstant $f$, which would make simultaneity position-dependent and destroy the slicing.
- Anything else that destroys the constant-$T$ foliation.
- Treating effective metric behavior as the fundamental background.

These exclusions are what keep absolute timespace distinct from emergent spacetime.

## Measures and Operators

The time measure is

$$
dT
$$

[View →](../../../../equation-mapping.html#corpus-equation-0fe7adc347436e7a-2)

The spatial volume element on a slice is

$$
dV=dX\,dY\,dZ
$$

[View →](../../../../equation-mapping.html#corpus-equation-fdb88434d089d358)

and the product measure is

$$
d\mathcal{V}=dT\,dX\,dY\,dZ=dT\,dV
$$

[View →](../../../../equation-mapping.html#corpus-equation-37d05577c7335e04)

which factorizes cleanly because the background does.

The spatial gradient is

$$
\nabla f=
\left(
\frac{\partial f}{\partial X},
\frac{\partial f}{\partial Y},
\frac{\partial f}{\partial Z}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-03dd2099e7af4a10)

the spatial Laplacian is

$$
\Delta f
=
\partial_X^2f+\partial_Y^2f+\partial_Z^2f
=
\delta^{ij}\partial_i\partial_j f
$$

[View →](../../../../equation-mapping.html#corpus-equation-fbae59b43cba1665)

and the temporal derivative is

$$
\frac{\partial}{\partial T}
$$

[View →](../../../../equation-mapping.html#corpus-equation-625579eac01c110e)

Every dynamical equation should make plain which derivatives are temporal, which are spatial, and when a calculation has moved into an effective-metric approximation rather than substrate geometry.

## Regularity and Boundary Conditions

For well-posed dynamics:

- Worldlines are absolutely continuous with piecewise continuous velocities.
- Any alternate parametrization $T(s)$ is strictly increasing.
- Source configurations are locally finite or represented by integrable measures.
- Regularized wake surfaces preserve total polarity and converge to the intended limit as the regulator is removed.
- Solutions decay suitably at spatial infinity unless an incoming condition is imposed.

### Receiver-Centered Exhaustion Lemma

An infinite population of sources raises a real question: does the total acceleration at a point even have a value?

For each receiver event $(i,T_r)$, choose an increasing sequence of retained transmitter events centered on the receiver and take the limit in that order. In radial form:

$$
\lim_{R\to\infty}
\sum_{\substack{j,\ T_t\in\mathcal{C}_{ij}(T_r)\\
\|\mathbf X_j(T_t)-\mathbf X_i(T_r)\|<R}}
\mathbf A_{ij}(T_r;T_t)
$$

[View →](../../../../equation-mapping.html#corpus-equation-58b42e746cbf75dd)

summing contributions from everything within distance $R$ and letting $R$ grow, with any neutrality, screening, or subtraction rule declared *before* the limit is taken.

The sum runs over retained emission events — $(j,T_t)$ pairs — not over sources. A transmitter faster than the wake speed can contribute several active roots entering the ball at different $R$, so the ordering must be at event level.

This is an admissibility condition: a branch is well-defined only when the limit exists under the declared exhaustion and subtraction rule. Subdividing a fixed finite region while retaining all its events must preserve its sum. Independence from arbitrary rearrangements of an infinite series requires a separate proof. Inverse-square dilution alone is not enough in three dimensions: a homogeneous population supplies $O(r^2\,dr)$ sources in a shell, offsetting a per-contribution magnitude of $O(r^{-2})$ before any cancellation. A convergence argument must therefore control the full weighted vector sum.

### When the lemma becomes a theorem

There is one important case where convergence can be proved rather than assumed. Its scope is a background result: it covers a statistically neutral far population, not every coherent assembly embedded in one.

Fix a receiver event and suppose the far population is statistically homogeneous, isotropic, and locally neutral. Partition the retained emission events outside a local ball into cells of diameter $O(\ell)$, with a uniformly bounded number of cell centers per volume $\ell^3$. Each cell contribution must be well-defined before taking the far-population limit. Let $\delta\mathbf a_k$ be cell $k$'s complete received acceleration minus its ensemble mean, including every admitted root and its transmitter-side weight. Write $r_k$ for the distance of its center from the receiver and $d_{kl}$ for the distance between two cell centers. One sufficient weighted covariance hypothesis is

$$
\left|
\mathbb{E}\!\left[\delta\mathbf a_k\cdot\delta\mathbf a_l\right]
\right|
\le
C\,r_k^{-2}r_l^{-2}e^{-d_{kl}/\ell}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7e63fec8490556b9)

The constant $C$ is uniform over the cells at this receiver event and carries the units required by the bound. The radial factors control the size of received fluctuations; the exponential controls correlations between separated cells. At $k=l$, the same inequality bounds each cell's second moment by $C r_k^{-4}$. Per-hit inverse-square dilution alone does not supply this complete-cell bound: admitted root multiplicities, source populations, and transmitter weights must satisfy the stated moment condition too. Statistical neutrality alone proves none of those conditions.

Group these cells into successive receiver-centered shells of thickness $\ell$, and let $I_n$ contain the cells in shell $n$, with radii comparable to $n\ell$. The packing bound gives $|I_n|=O(n^2)$ and a uniform bound on $\sum_l e^{-d_{kl}/\ell}$: the number of nearby cells grows polynomially with separation, while the exponential decays faster. For the centered shell sum $S_n=\sum_{k\in I_n}\delta\mathbf a_k$, the covariance expansion therefore gives

$$
\mathbb E\|S_n\|^2
\le C_1 n^{-4}\sum_{k\in I_n}\sum_{l\in I_n}e^{-d_{kl}/\ell}
\le C_2 n^{-4}|I_n|
=O(n^{-2}),
$$

[View →](../../../../equation-mapping.html#corpus-equation-4b531110b8f53f7b)

where $C_1$ and $C_2$ are independent of the shell index and include the fixed powers of $\ell$. The shell fluctuation is thus square-summable:

$$
\sum_{n=1}^{\infty}\mathbb{E}\|S_n\|^2<\infty
$$

[View →](../../../../equation-mapping.html#corpus-equation-1036eabe49f53f39)

To obtain convergence both in mean square and almost surely, add the explicit hypothesis $\mathbb E[S_n\mid\mathcal F_{n-1}]=0$, where $\mathcal F_{n-1}$ contains the information revealed by the completed preceding shells and $S_n$ is measurable once shell $n$ is revealed. This makes the partial sums an $L^2$-bounded martingale: distinct increments have zero covariance, so the second moment of each partial sum is bounded by the sum of the shell variances. The martingale convergence theorem then gives both conclusions. Exponential cell covariance does not itself prove this conditional-mean hypothesis. Without it, a different convergence theorem is needed, and only the conclusion of that theorem may be claimed.

This proves convergence of the centered sum along the completed-shell exhaustion under the stated hypotheses. Recovering the full acceleration also requires zero coherent shell mean, a convergent sum of those means, or an explicitly declared subtraction rule. Intermediate cutoffs within a shell and other exhaustion orders require control of their residual contributions before they can be assigned the same limit. Cancellation in this conditional statistical model does not establish that the physical Noether sea satisfies its weighted covariance or conditional-mean assumptions.

That is also exactly why the theorem does not extend. A coherent far dipole texture, long-range orientational correlation, or anisotropic source family can defeat vector cancellation even with perfect polarity neutrality — the shells would add in step rather than at random. Every coherent assembly or correlated medium feature on top of the background must supply its own shielding, screening, finite horizon, or explicit subtraction before its sum may be treated as closed.

The first such obligation is isolated in [Noether Sea](../spacetime/noether-sea.md). For a weak density gradient $\rho_{\mathrm{NS}}=\rho_0+\mathbf g_\rho\cdot\mathbf X+\cdots$, the multipole contribution and the conditional shell mean must be derived and shown convergent. The homogeneous theorem does not by itself imply an acceleration proportional to $-\nabla\rho_{\mathrm{NS}}$, fix the sign or size of a weak-gradient response, or close the gravity, clock, and ruler maps.

Cancellation in a uniform sea says nothing about the response of a tilted one. That remains a separate derivation.

These conditions are not extra ontology. They are what the master equation and its numerical approximations need in order to be well-defined.

## Relation to Relativistic Spacetime

Relativistic spacetime remains the correct comparison target for recovered observer laws. This table sets a fixed product background beside a downstream effective description — the two are at different levels, and the comparison is only meaningful with that said.

| **Feature** | **Absolute Timespace** | **Relativistic Spacetime** |
|:---|:---|:---|
| **Manifold** | $\mathbb{R}\times\mathbb{R}^3$ | Four-dimensional spacetime manifold |
| **Time** | Universal parameter | Coordinate dimension or proper-time relation |
| **Spatial geometry** | Fixed Euclidean slices | Part of a dynamical metric |
| **Metric** | Separate $(dT,h)$ data | Non-degenerate $g_{\mu\nu}$ |
| **Simultaneity** | Absolute global foliation | Observer/frame dependent |
| **Causality** | Absolute order plus finite wake speed | Effective metric light cones |
| **Gravity** | Emergent from assembly and Noether sea dynamics | Spacetime curvature |
| **Expansion** | No expansion of the void | Metric expansion possible |

The effective metric used in relativistic recovery is a downstream object, derived from clocks, rulers, signal transport, and medium response. The local handoff is

$$
d\tau^2
=
A^2(\mathcal{N}_{\mathrm{sea}})\,dt_{\mathrm{eff}}^2
-
\frac{1}{c_0^2}
B_{ij}(\mathcal{N}_{\mathrm{sea}})
\left(dx_{\mathrm{eff}}^i-u^i_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\right)
\left(dx_{\mathrm{eff}}^j-u^j_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-d8fd4033b3daa123)

with $A>0$ and $B_{ij}$ symmetric positive definite. The factor $A$ is how fast a local clock runs, $B_{ij}$ is how local rulers measure distance, and $u^i_{\mathrm{sea,eff}}$ is the medium's flow, subtracted so that distance is measured relative to the medium rather than the chart.

Equivalently, define $ds_{\mathrm{eff}}^2=-c_0^2d\tau^2$ and $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$. In that convention the component form is

$$
g^{\mathrm{eff}}_{00}
=
-A^2+\frac{1}{c_0^2}B_{ij}u^i_{\mathrm{sea,eff}}u^j_{\mathrm{sea,eff}},
\qquad
g^{\mathrm{eff}}_{0i}
=
-\frac{1}{c_0}B_{ij}u^j_{\mathrm{sea,eff}},
\qquad
g^{\mathrm{eff}}_{ij}
=
B_{ij}
$$

[View →](../../../../equation-mapping.html#corpus-equation-a20b3912bb43ea2b)

the same decomposition used in [Emergent Metric](../spacetime/emergent-metric.md). This is not substrate geometry. It is the required handoff from medium state and observer assemblies into effective spacetime language.

## Role in $\mathbb{A}\mathbb{A}\mathbb{A}$

Absolute timespace is the background in which all architrino dynamics unfold:

- Worldlines are curves $(T,\mathbf X(T))$ in $\mathcal{M}$.
- Wakes are emitted at earlier events and meet receivers at later ones.
- Path history is well-defined because the past is simply everything at smaller $T$.
- Assembly motion, clock behavior, and effective geometry are built on this substrate without being identical to it.
- Proper time is a functional of observer dynamics, not a fundamental interval.

## Summary Postulate

Postulate 3 fails if any accepted substrate interaction requires breaking the constant-$T$ slicing — for instance through a time coordinate $T'=T+f(\mathbf X)$ — or requires a fundamental non-degenerate four-metric. Effective clock synchronization, proper time, and metric reconstruction may mix observer coordinates after recovery; they cannot replace the substrate product structure without replacing this postulate.

> **Postulate 3 (Absolute Timespace):** The background arena for all physics is the product manifold $\mathcal{M}=\mathbb{R}\times\mathbb{R}^3$, equipped with the exact substrate clock form $dT$, Euclidean spatial metric $h_{ij}=\delta_{ij}$, and a compatible flat torsion-free product connection $\nabla$. These data define a global foliation into simultaneous Euclidean slices indexed by universal time and an affine rule for comparing positions and velocities across slices. The background is non-dynamical and non-curved. Causality is defined by absolute temporal ordering and finite wake speed $c_f$. The product background preserves Galilean kinematic structure, while the interaction law, by fixing the wake speed $c_f$ relative to the void, structurally distinguishes the void rest frame within that structure. Effective Lorentz behavior, gravity, lensing, clock dilation, and cosmological expansion are recovery targets: when the assembly and Noether sea closure programs succeed, they are emergent descriptions within absolute timespace, not properties of the background itself.
