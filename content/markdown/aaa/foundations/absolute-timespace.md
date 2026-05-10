# Absolute Timespace

This chapter is the canonical substrate-level specification for **absolute timespace** in $\mathbb{A}\mathbb{A}\mathbb{A}$. It defines the fixed product background $\mathbb{R}\times\mathbb{R}^3$, its global foliation into simultaneous Euclidean slices, the Newton-Cartan data used to keep time and space separate, and the causal wake geometry used by the microscopic dynamics.

Absolute timespace is not relativistic spacetime. It is the formal product of [Absolute Time](absolute-time.md) and the [Euclidean Void](euclidean-void.md). Effective spacetime geometry is reconstructed later from assembly and Noether Sea dynamics; it is not the substrate itself.

## Core Concept

Absolute timespace is the formal, non-dynamical product background for all physical phenomena. It is the direct product of absolute time and the Euclidean void, forming a **foliated structure** where each leaf is a complete instantaneous Euclidean 3-space indexed by the universal time parameter $t$.

In $\mathbb{A}\mathbb{A}\mathbb{A}$:

- Time and space are logically and mathematically separate at the kinematic level.
- There is absolute simultaneity: all events with the same $t$ belong to the same global slice.
- There is no fundamental 4D Lorentzian metric mixing temporal and spatial dimensions.
- The background is non-dynamical: it does not respond to matter, energy, assemblies, or the Noether Sea.

All curvature, expansion, clock dilation, and relativistic behavior must be recovered as effective descriptions of assemblies and Noether Sea response within this fixed background.

## Product Manifold

The absolute timespace background is the Cartesian product
$$
\mathcal{M}=\mathbb{R}\times\mathbb{R}^3,
$$
with coordinates
$$
(t,\mathbf{x})=(t,x,y,z).
$$

Each point in $\mathcal{M}$ represents an event: a fixed location $\mathbf{x}$ in the Euclidean void at a definite instant $t$.

The two factors have different ontological roles:

- $\mathbb{R}$ supplies the universal time parameter and total event ordering.
- $\mathbb{R}^3$ supplies the fixed Euclidean spatial container and spatial metric.

The product structure is fundamental. It is not an approximation to a deeper 4D curved metric.

## Foliation and Simultaneity Slices

Each instant $t=t_0$ defines a global simultaneity slice
$$
\Sigma_{t_0}=\{t_0\}\times\mathbb{R}^3\cong\mathbb{R}^3.
$$

Every event $(t,\mathbf{x})$ belongs to exactly one slice $\Sigma_t$. This foliation is absolute and frame-independent.

An object or assembly traces a worldline through the product background:
$$
\gamma:I\subset\mathbb{R}\to\mathcal{M},
\qquad
t\mapsto(t,\mathbf{x}(t)).
$$

For any alternate curve parameter $s$, admissible worldlines must satisfy
$$
\frac{dt}{ds}>0.
$$

There are no closed timelike curves, no backward-time propagation, and no fundamental reparametrization freedom that replaces the global time parameter.

> **Plain language:** Absolute timespace is a stack of Euclidean 3-spaces, one for each value of $t$. A worldline passes through one slice at each instant.

## Newton-Cartan Data

The background geometry is encoded by a pair of structures rather than by a single non-degenerate 4D metric.

The absolute clock 1-form is
$$
\tau=dt.
$$

This 1-form is closed, exact, and nowhere vanishing on $\mathcal{M}$. Its level sets are the simultaneity slices $\Sigma_t$.

The spatial metric on each slice is
$$
h=dx^2+dy^2+dz^2,
$$
with Cartesian components
$$
h_{ij}=\delta_{ij}.
$$

The metric $h$ acts only on spatial vectors tangent to $\Sigma_t$. Time and space are therefore encoded separately by $(\tau,h)$.

A flat, torsion-free connection $\nabla$ satisfies
$$
\nabla\tau=0,
\qquad
\nabla h=0.
$$

In global Cartesian coordinates the connection coefficients vanish. Covariant derivatives reduce to ordinary partial derivatives, and spatial geodesics within each slice are straight lines.

## No Fundamental 4D Metric

$\mathbb{A}\mathbb{A}\mathbb{A}$ does **not** define a fundamental non-degenerate 4D metric $g_{\mu\nu}$ on $\mathcal{M}$.

This means:

- There is no fundamental 4D interval mixing $dt$ and $d\mathbf{x}$.
- There are no fundamental Lorentz boosts that rotate time into space.
- Proper time is not a substrate interval.
- Effective metric language belongs to observer-level spacetime reconstruction.

The pair $(\tau,h)$ is sufficient to encode the substrate kinematics: absolute temporal ordering plus Euclidean spatial geometry.

## Measurement and Geometry

Spatial distance within a simultaneity slice is
$$
d_{\text{spatial}}(\mathbf{x}_1,\mathbf{x}_2)
=
\sqrt{(x_1-x_2)^2+(y_1-y_2)^2+(z_1-z_2)^2}.
$$

Temporal duration between events is
$$
\Delta t=|t_2-t_1|.
$$

Spatial arc length along a path $\mathbf{x}(t)$ from $t_1$ to $t_2$ is
$$
L[\mathbf{x};t_1,t_2]
=
\int_{t_1}^{t_2}\|\mathbf{v}(t)\|\,dt
=
\int_{t_1}^{t_2}
\sqrt{
\left(\frac{dx}{dt}\right)^2+
\left(\frac{dy}{dt}\right)^2+
\left(\frac{dz}{dt}\right)^2
}\,dt.
$$

A relativistic 4D arc length such as
$$
s=\int\sqrt{g_{\mu\nu}\,dx^\mu dx^\nu}
$$
is not a substrate-level object in $\mathbb{A}\mathbb{A}\mathbb{A}$.

## Velocity, Acceleration, and Momentum

Spatial velocity is the 3-vector
$$
\mathbf{v}(t)=\frac{d\mathbf{x}}{dt}.
$$

Speed is
$$
v=\|\mathbf{v}\|.
$$

Acceleration is
$$
\mathbf{a}(t)=\frac{d\mathbf{v}}{dt}
=
\frac{d^2\mathbf{x}}{dt^2}.
$$

The usual 3-vector expressions follow:
$$
\mathbf{p}=m\mathbf{v},
\qquad
T=\frac{1}{2}m v^2.
$$

Forces cause accelerations in the Euclidean void. Time supplies the universal evolution parameter; it does not supply curvature, force, or clock dilation by itself.

## Galilean Kinematic Structure

The product background admits the usual Galilean kinematic transformations that preserve the absolute foliation and the spatial metric on each slice.

Time translation:
$$
t'=t+t_0,
\qquad
\mathbf{x}'=\mathbf{x}.
$$

Spatial translation:
$$
t'=t,
\qquad
\mathbf{x}'=\mathbf{x}+\mathbf{a}.
$$

Rotation:
$$
t'=t,
\qquad
\mathbf{x}'=R\mathbf{x},
\qquad
R\in SO(3).
$$

Galilean boost:
$$
t'=t,
\qquad
\mathbf{x}'=\mathbf{x}+\mathbf{v}_0t.
$$

The transformation preserves simultaneity slices because $t'=t$ up to a constant shift.

The Galilean group may be summarized as a semidirect product combining time translations, spatial Euclidean transformations, and velocity boosts. This is a kinematic statement about the product background.

## Preferred Rest Frame and Dynamical Symmetry Breaking

Although Galilean boosts preserve the product foliation kinematically, the interaction law selects a preferred rest frame: the frame in which the wake speed $c_f$ is isotropic.

This preferred frame is not curvature of the background. It is a dynamical consequence of finite-speed causal wake propagation and the medium/assembly dynamics built on top of the absolute timespace substrate.

The observer-level task is therefore not to remove the absolute frame from the ontology. The task is to derive how physical clocks, rulers, and signals hide preferred-frame leakage to the required experimental precision. See [Lorentz Kinematics](../spacetime/lorentz-kinematics.md) and [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md).

## Causal Wake Geometry

Causality is defined by absolute temporal ordering plus finite wake propagation speed.

For two events
$$
A=(t_A,\mathbf{x}_A),
\qquad
B=(t_B,\mathbf{x}_B),
$$
event $A$ can causally precede $B$ only if
$$
t_A<t_B.
$$

A wake emitted at $(t_0,\mathbf{x}_0)$ reaches points on the causal wake surface
$$
\|\mathbf{x}-\mathbf{x}_0\|=c_f(t-t_0),
\qquad
t>t_0.
$$

The corresponding causal influence region is
$$
\{(t,\mathbf{x}):t\geq t_0,\ \|\mathbf{x}-\mathbf{x}_0\|\leq c_f(t-t_0)\}.
$$

This is an expanding spatial sphere through the absolute-time stack, not a fundamental light cone of a Lorentzian metric. The boundary surface is the locus of points receiving the wake contribution emitted at $t_0$.

The causal wake geometry does not forbid an architrino from having $v>c_f$. It forbids backward-time influence. Super-field-speed motion is therefore a dynamical regime in which a source can outrun and later re-enter its own wake history, enabling self-hit behavior.

## Coordinates and Forbidden Transformations

Allowed substrate coordinates preserve the product structure:

- $t$ remains the global absolute time parameter.
- Spatial coordinates may be Cartesian or curvilinear coordinates on $\Sigma_t$.
- Spatial coordinate changes may rewrite $h_{ij}$ but do not curve the Euclidean void.

Forbidden at the substrate level:

- Lorentz boosts as fundamental time-space rotations.
- Transformations of the form $t'=t+f(\mathbf{x})$ with nonconstant $f$.
- Any operation that destroys the foliation into constant-$t$ slices.
- Any transformation that treats effective metric behavior as the fundamental background.

These exclusions preserve the distinction between absolute timespace and emergent spacetime.

## Measures and Operators

The absolute time measure is
$$
dt.
$$

The spatial volume element on a slice is
$$
dV=dx\,dy\,dz.
$$

The product measure is
$$
d\mathcal{V}=dt\,dx\,dy\,dz=dt\,dV.
$$

The spatial gradient is
$$
\nabla f=
\left(
\frac{\partial f}{\partial x},
\frac{\partial f}{\partial y},
\frac{\partial f}{\partial z}
\right).
$$

The spatial Laplacian is
$$
\Delta f
=
\partial_x^2f+\partial_y^2f+\partial_z^2f
=
\delta^{ij}\partial_i\partial_j f.
$$

The temporal derivative is
$$
\frac{\partial}{\partial t}.
$$

All dynamical equations should make clear which derivatives are temporal, which are spatial, and when a calculation is using an effective metric approximation rather than substrate geometry.

## Regularity and Boundary Conditions

For well-posed dynamics on absolute timespace:

- Worldlines are absolutely continuous with piecewise continuous velocities.
- Any alternate parametrization $t(s)$ is strictly increasing.
- Source configurations are locally finite or represented by integrable measures.
- Regularized wake surfaces should preserve total polarity and converge to the intended causal-wake limit as the regulator is removed.
- Solutions should decay suitably at spatial infinity unless an incoming condition is explicitly imposed.

These assumptions are not additional ontology. They are the analytic conditions needed for the master equation and simulation approximations to be well-defined on the product background.

## Relation to Relativistic Spacetime

| **Feature** | **Absolute Timespace** | **Relativistic Spacetime** |
|:---|:---|:---|
| **Manifold** | $\mathbb{R}\times\mathbb{R}^3$ | Four-dimensional spacetime manifold |
| **Time** | Universal parameter | Coordinate dimension or proper-time relation |
| **Spatial geometry** | Fixed Euclidean slices | Part of a dynamical metric |
| **Metric** | Separate $(\tau,h)$ data | Non-degenerate $g_{\mu\nu}$ |
| **Simultaneity** | Absolute global foliation | Observer/frame dependent |
| **Causality** | Absolute order plus finite wake speed | Metric light cones |
| **Gravity** | Emergent from assembly and Noether Sea dynamics | Spacetime curvature |
| **Expansion** | No expansion of the void | Metric expansion possible |

The effective metric used in GR-style recovery is a downstream constitutive object. It must be derived from clocks, rulers, signal transport, and Noether Sea response. See [Emergent Metric](../spacetime/emergent-metric.md).

## Role in $\mathbb{A}\mathbb{A}\mathbb{A}$

Absolute timespace is the formal product background in which all architrino dynamics unfold:

- Architrino worldlines are curves $(t,\mathbf{x}(t))$ in $\mathcal{M}$.
- Causal wakes are emitted at earlier events and intersect receivers at later events.
- Path history is well-defined because the past is the set of all events with smaller $t$.
- Assembly motion, clock behavior, and effective spacetime geometry are built on this substrate but are not identical with it.
- Proper time is a functional of physical observer dynamics, not a fundamental interval of $\mathcal{M}$.

## Summary Postulate

> **Postulate 3 (Absolute Timespace):** The background arena for all physics is the product manifold $\mathcal{M}=\mathbb{R}\times\mathbb{R}^3$, equipped with absolute time $\tau=dt$ and Euclidean spatial metric $h_{ij}=\delta_{ij}$. This defines a global foliation into simultaneous Euclidean slices indexed by universal time. The background is non-dynamical and non-curved. Causality is defined by absolute temporal ordering and finite wake speed $c_f$. The product background preserves Galilean kinematic structure, while the interaction law selects a preferred rest frame dynamically. Effective Lorentz behavior, gravity, lensing, clock dilation, and cosmological expansion are emergent descriptions of assemblies and Noether Sea dynamics within absolute timespace, not properties of the background itself.
