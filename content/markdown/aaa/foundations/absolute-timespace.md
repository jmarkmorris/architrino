# Absolute Timespace

This chapter is the canonical substrate-level specification for **absolute timespace** in $\mathbb{A}\mathbb{A}\mathbb{A}$. It defines the fixed product background $\mathbb{R}\times\mathbb{R}^3$, its global foliation into simultaneous Euclidean slices, the Newton-Cartan data used to keep time and space separate, and the causal wake geometry used by the microscopic dynamics.

Absolute timespace is not relativistic spacetime. It is the formal product of [Absolute Time](absolute-time.md) and the [Euclidean Void](euclidean-void.md). Effective spacetime geometry is reconstructed later from assembly and Noether sea dynamics; it is not the substrate itself.

## Core Concept

Absolute timespace is the formal, non-dynamical product background for all physical phenomena. It is the direct product of absolute time and the Euclidean void, forming a **foliated structure** where each leaf is a complete instantaneous Euclidean 3-space indexed by the universal time parameter $t$.

In $\mathbb{A}\mathbb{A}\mathbb{A}$:

- Time and space are logically and mathematically separate at the kinematic level.
- There is absolute simultaneity: all events with the same $t$ belong to the same simultaneity slice.
- There is no fundamental 4D Lorentzian metric mixing temporal and spatial dimensions.
- The background is non-dynamical: it does not respond to matter, energy, assemblies, or the Noether sea.

This separation fixes the chapter's sequence: first name the substrate datum, then identify the effective or inferential layer that reads it. The Euclidean void and absolute time are ontology. Clocks, rulers, metric tensors, and relativistic symmetries are treated as recovered behavior of assemblies and the Noether sea; their detailed laws are closure targets when the derivation is not supplied locally.

All curvature, expansion, clock dilation, and relativistic behavior must be recovered as effective descriptions of assemblies and Noether sea response within this fixed background.

## Product Manifold

The absolute timespace background is the Cartesian product
$$
\mathcal{M}=\mathbb{R}\times\mathbb{R}^3
$$
with coordinates
$$
(t,\mathbf{x})=(t,x,y,z)
$$

Each point in $\mathcal{M}$ represents an event: a fixed location $\mathbf{x}$ in the Euclidean void at a definite instant $t$.

The two factors have different ontological roles:

- $\mathbb{R}$ supplies the universal time parameter and total event ordering.
- $\mathbb{R}^3$ supplies the fixed Euclidean spatial container and spatial metric.

The product structure is fundamental. It is not an approximation to a deeper 4D curved metric.

## Foliation and Simultaneity Slices

Each instant $t=t_0$ defines a global simultaneity slice
$$
\Sigma_{t_0}=\{t_0\}\times\mathbb{R}^3\cong\mathbb{R}^3
$$

Every event $(t,\mathbf{x})$ belongs to exactly one slice $\Sigma_t$. This foliation is absolute and frame-independent.

An object or assembly traces a worldline through the product background:
$$
\gamma:I\subset\mathbb{R}\to\mathcal{M},
\qquad
t\mapsto(t,\mathbf{x}(t))
$$

For any alternate curve parameter $s$, admissible worldlines must satisfy
$$
\frac{dt}{ds}>0
$$

There are no closed timelike curves, no backward-time propagation, and no fundamental reparametrization freedom that replaces the absolute time parameter.

> **Plain language:** Absolute timespace is a stack of Euclidean 3-spaces, one for each value of $t$. A worldline passes through one slice at each instant.

On a fixed slice, the canonical universe-now notation is
$$
\mathbb{U}_{\text{now}} \equiv S(t)
$$

This denotes the complete ontic universe state on $\Sigma_t$: architrino positions, velocities, polarities, path-history and provenance bookkeeping, and self-hit history needed for deterministic evolution. It is not an observer's measurement record. Observer reconstructions sample or coarse-grain this state through assemblies and Noether sea coupling, which prevents absolute simultaneity from being confused with operationally synchronized clocks.

Because the master equation is path-history dependent, this complete state is not merely an instantaneous Markov list of positions and velocities. A precise slice-state schematic is
$$
S(t)
=
\big(
X(t),
H_t,
\mathcal{N}_{\mathrm{sea}}(t,\cdot),
\mathcal{B}_t
\big)
$$
Here $X(t)$ contains instantaneous architrino and assembly data, $H_t$ is the required path-history and provenance ledger, $\mathcal{N}_{\mathrm{sea}}$ is the local Noether sea state record, and $\mathcal{B}_t$ records the active branch chart or regularization data. Determinism applies to this complete history state, not to a history-free instantaneous projection.

## Newton-Cartan Data

The background geometry is encoded by a pair of structures rather than by a single non-degenerate 4D metric.

The substrate clock 1-form is the exact form
$$
dt
$$

This 1-form is closed, exact, and nowhere vanishing on $\mathcal{M}$. Its level sets are the simultaneity slices $\Sigma_t$. The symbol $\tau$ is reserved for derived observer proper time; emission times use $s$, and causal delay is written $\Delta_{ij}=t-s$.

The spatial metric on each slice is
$$
h=dx^2+dy^2+dz^2
$$
with Cartesian components
$$
h_{ij}=\delta_{ij}
$$

The metric $h$ acts only on spatial vectors tangent to $\Sigma_t$. Time and space are therefore encoded separately by $(dt,h)$.

A flat, torsion-free connection $\nabla$ satisfies
$$
\nabla dt=0,
\qquad
\nabla h=0
$$

These compatibility equations do not determine $\nabla$ by themselves in ordinary Newton-Cartan geometry. The same $(dt,h)$ admits torsion-free compatible connections whose coefficients represent rotating-frame or accelerating-frame inertial terms. In $\mathbb{A}\mathbb{A}\mathbb{A}$ the connection is therefore a dynamically completed piece of substrate data: $(dt,h)$ supply the foliation and spatial metric, and the interaction law selects the rest frame in which the finite causal-wake speed $c_f$ is isotropic. In the corresponding global Cartesian rest coordinates, the selected connection has
$$
\Gamma^\lambda_{\mu\nu}=0
$$

Covariant derivatives then reduce to ordinary partial derivatives, and spatial geodesics within each slice are straight lines. Nonzero coefficients introduced by rotating or accelerating coordinates are non-inertial descriptions of the same fixed substrate, not background curvature.

More geometrically, the compatible-connection freedom is an affine gauge freedom. Relative to a chosen flat rest connection, the rotational part of the Newton-Cartan freedom is modeled by rotation-valued 1-forms,
$$
\Omega^1(\mathcal{M})\otimes\mathfrak{so}(3)
$$
with the corresponding boost or acceleration terms supplying the usual non-inertial chart data. Thus the family of compatible descriptions is a torsor over the inertial-gauge data, while the wake law selects the unique flat representative in the $c_f$-isotropic frame. Rotating-frame Christoffel symbols are therefore pure-gauge representatives of that same flat $\nabla$; their Riemann curvature remains zero.

### Non-Inertial Coordinate Terms

A rotating coordinate chart can make ordinary motion acquire extra coordinate terms. If $\mathbf{x}=R(t)\mathbf{x}'$ with angular velocity $\boldsymbol{\Omega}$, then the Cartesian-rest-frame acceleration decomposes as
$$
\mathbf{a}
=
R(t)\left[
\mathbf{a}'
+2\boldsymbol{\Omega}\times\mathbf{v}'
+\boldsymbol{\Omega}\times(\boldsymbol{\Omega}\times\mathbf{x}')
+\dot{\boldsymbol{\Omega}}\times\mathbf{x}'
\right]
$$

The terms proportional to $2\boldsymbol{\Omega}\times\mathbf{v}'$, $\boldsymbol{\Omega}\times(\boldsymbol{\Omega}\times\mathbf{x}')$, and $\dot{\boldsymbol{\Omega}}\times\mathbf{x}'$ are coordinate descriptions on absolute timespace. They do not add curvature to the Euclidean void, and they do not introduce a substrate magnetic field. Their value is diagnostic: they show how transverse-looking observer equations can arise from a choice of non-inertial chart while the underlying substrate remains $\mathbb{R}\times\mathbb{R}^3$ with the selected flat connection in the Euclidean-void rest frame.

The provenance no-go is strict. A transverse velocity-dependent term produced only by a rotating or accelerating coordinate chart carries no source identity, emission time, causal-root label, or wake-energy ledger entry. It therefore cannot source a physical wake-mediated interaction or an emergent magnetic channel. A genuine transverse interaction must be traced to causal-wake provenance in the Master Equation or to an explicitly derived observer-level reduction of such provenance, not to inertial-coordinate algebra alone.

Equivalently, let $\mathcal{P}[\mathcal{T}]$ denote the provenance payload of a candidate force term $\mathcal{T}$: source identity, emission time, causal-root label, and energy or wake-history row when those data exist. Pure inertial-coordinate terms satisfy
$$
\mathcal{P}[\mathcal{T}_{\mathrm{inertial}}]=\varnothing
$$
A physical wake-mediated transverse term must instead satisfy $\mathcal{P}[\mathcal{T}]\ne\varnothing$ after reduction to the retained branch record. This separates connection-gauge content from the image of the causal-wake provenance map.

## No Fundamental 4D Metric

$\mathbb{A}\mathbb{A}\mathbb{A}$ does **not** define a fundamental non-degenerate 4D metric $g_{\mu\nu}$ on $\mathcal{M}$.

This means:

- There is no fundamental 4D interval mixing $dt$ and $d\mathbf{x}$.
- There are no fundamental Lorentz boosts that rotate time into space.
- Proper time is not a substrate interval.
- Effective metric language belongs to observer-level spacetime reconstruction.

The specified Newton-Cartan substrate data $(dt,h,\nabla)$ encode the substrate kinematics: absolute temporal ordering, Euclidean spatial geometry, and the selected Euclidean-void rest-frame connection.

## Measurement and Geometry

Spatial distance within a simultaneity slice is
$$
d_{\text{spatial}}(\mathbf{x}_1,\mathbf{x}_2)
=
\sqrt{(x_1-x_2)^2+(y_1-y_2)^2+(z_1-z_2)^2}
$$

Temporal duration between events is
$$
\Delta t=|t_2-t_1|
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
}\,dt
$$

A relativistic 4D arc length such as
$$
s=\int\sqrt{g_{\mu\nu}\,dx^\mu dx^\nu}
$$
is not a substrate-level object in $\mathbb{A}\mathbb{A}\mathbb{A}$.

## Velocity, Acceleration, and Momentum

Spatial velocity is the 3-vector
$$
\mathbf{v}(t)=\frac{d\mathbf{x}}{dt}
$$

Speed is
$$
v=\|\mathbf{v}\|
$$

Acceleration is
$$
\mathbf{a}(t)=\frac{d\mathbf{v}}{dt}
=
\frac{d^2\mathbf{x}}{dt^2}
$$

The usual 3-vector expressions follow:
$$
\mathbf{p}=m\mathbf{v},
\qquad
T=\frac{1}{2}m v^2
$$

Forces cause accelerations in the Euclidean void. Time supplies the universal evolution parameter; it does not supply curvature, force, or clock dilation by itself.

The same distinction applies to momentum and inertia: the kinematic variables live on the substrate, while the coefficients that make them measurable are effective assembly responses.

The scalar $m$ in the low-velocity observer formula is not a primitive rigid-body constant of the substrate. A rigid-body inertia tensor is a useful foil: in ordinary mechanics it maps a fixed body's angular velocity to angular momentum after a mass distribution has already been supplied. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the corresponding observer-level inertial response must be derived from the assembly's closed internal causal-history ledger, shielding state, coupling to the Noether sea, and orientation.

For a coarse-grained assembly $A$, the local linear response may be written as a pair of response maps
$$
\delta p_i
=
\mathcal{M}^{\mathrm{resp}}_{ij}
\!\left(A;\mathcal{H}_A,\mathcal{S}_A,\left.\mathcal{N}_{\mathrm{sea}}\right|_A,R_A\right)
\delta v^j,
\qquad
\delta J_i
=
\mathcal{I}^{\mathrm{resp}}_{ij}
\!\left(A;\mathcal{H}_A,\mathcal{S}_A,\left.\mathcal{N}_{\mathrm{sea}}\right|_A,R_A\right)
\delta\Omega^j
$$

Here $\mathcal{H}_A$ denotes the closed internal path-history and causal-root ledger of the assembly, $\mathcal{S}_A$ its shielding state, $\left.\mathcal{N}_{\mathrm{sea}}\right|_A$ the local Noether sea state sampled by the assembly, and $R_A\in SO(3)$ its orientation relative to the Euclidean-void rest frame. The ordinary scalar mass relation is recovered only in an isotropic observer branch where $\mathcal{M}^{\mathrm{resp}}_{ij}\to m\,\delta_{ij}$ over the probed directions.

The isotropy of $\mathcal{M}^{\mathrm{resp}}_{ij}$ is an assembly-geometry claim, not an unexplained smallness assumption. If the symmetry group of the retained trajectory bundle and closed causal-history ledger has no preferred axis on the probed scale, the tensor response can reduce to $m\delta_{ij}$. If the branch retains an axial layer, six-site axial frame, or other framed orientation data, the leading correction is a quadrupole-like orientational residual in $\mathcal{M}^{\mathrm{resp}}_{ij}$ unless shielding and averaging cancel it. The branch-level carrier can be represented by a symmetric trace-free framing tensor
$$
Q_A^{ij}
=
\left\langle
\hat n^i\hat n^j-\frac{1}{3}h^{ij}
\right\rangle_A^{\mathrm{frame}}
$$
where the average is taken over the retained framed trajectory bundle or declared axial frame of the assembly. The Hughes-Drever row below is therefore a direct constraint on residual orientational symmetry breaking in the assembly framing.

The same $Q_A^{ij}$ should feed the matter Hughes-Drever projection, the clock-orientation leakage row $\Delta^{\mathrm{ori}}$, and the ruler or metric-handoff anisotropy carried by $B_{ij}$. This does not prove those rows vanish. It states the economy target: one branch certificate bounding $\|Q_A\|$ should bound all three $\ell=2$ preferred-axis leakages, while $Q_A=0$ marks the limit in which the retained framed trajectory bundle has no preferred quadrupole axis at the tested scale.

The isotropic limit is not merely a simplifying convention. Hughes-Drever-type clock-comparison tests constrain orientation-dependent matter-sector response, so the residual attached to $\mathcal{M}^{\mathrm{resp}}_{ij}$ must be declared alongside clock and photon anisotropy bounds. A representative matter-anisotropy row should track a projected residual such as
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
after mapping the assembly response onto the tested matter-sector coefficients. The benchmark is not a single universal number: SME translations are species- and coefficient-dependent, with Hughes-Drever and clock-comparison rows reaching roughly the $10^{-27}$-class matter-anisotropy scale or stronger in several spin-coupling channels. Passing the scalar-mass limit therefore means driving the projected matter response below the declared Hughes-Drever/clock-comparison row, not only asserting isotropy in prose.

## Galilean Kinematic Structure

The product background admits the usual Galilean kinematic transformations that preserve the absolute foliation and the spatial metric on each slice.

Time translation:
$$
t'=t+t_0,
\qquad
\mathbf{x}'=\mathbf{x}
$$

Spatial translation:
$$
t'=t,
\qquad
\mathbf{x}'=\mathbf{x}+\mathbf{a}
$$

Rotation:
$$
t'=t,
\qquad
\mathbf{x}'=R\mathbf{x},
\qquad
R\in SO(3)
$$

Galilean boost:
$$
t'=t,
\qquad
\mathbf{x}'=\mathbf{x}+\mathbf{v}_0t
$$

The transformation preserves simultaneity slices because $t'=t$ up to a constant shift.

The Galilean group may be summarized as a semidirect product combining time translations, spatial Euclidean transformations, and velocity boosts. This is a kinematic statement about the product background.

## Preferred Rest Frame and Dynamical Symmetry Breaking

Although Galilean boosts preserve the product foliation kinematically, the interaction law selects a preferred rest frame: the frame in which the wake speed $c_f$ is isotropic. This selects the rest structure for the dynamics, not a pre-labeled spatial origin or built-in axis orientation.

The distinction is visible directly in the root equation. Under a Galilean coordinate change $\mathbf{x}'=\mathbf{x}-\mathbf{u}t$, the same primitive wake condition becomes
$$
\left\|
\mathbf{x}'_i(t)-\mathbf{x}'_j(s)+\mathbf{u}(t-s)
\right\|
=
c_f(t-s),
\qquad
s<t
$$
Thus boosts preserve the product foliation and are allowed coordinate descriptions, but they do not preserve the same isotropic wake-law form unless $\mathbf{u}=\mathbf{0}$ relative to the Euclidean-void rest frame. Galilean boosts are therefore kinematic coordinate transformations of the background, not dynamical symmetries of the primitive wake law.

This preferred frame is not curvature of the background. It is a dynamical consequence of finite-speed causal wake propagation, Noether sea dynamics, and assembly dynamics built on top of the absolute timespace substrate.

The observer-level task is therefore not to remove the absolute frame from the ontology. The task is to derive how physical clocks, rulers, and signals hide preferred-frame leakage to the required experimental precision. See [Lorentz Kinematics](../spacetime/lorentz-kinematics.md) and [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md).

## Speed Convention

The foundation stack keeps primitive, channel, branch, and calibrated speeds distinct:

| Symbol | Meaning | Status |
| --- | --- | --- |
| $c_f$ | Primitive causal-wake propagation speed relative to the Euclidean void | fundamental |
| $c_\gamma(\mathcal{N}_{\mathrm{sea}},\hat{\mathbf{k}})$ | Photon-channel speed in a Noether sea state and direction | derived |
| $c_{\text{eff}}$ | Effective signal or clock-channel speed for a specified dressed branch | derived/contextual |
| $c_\star$ | Local comparison speed used in a declared clock, ruler, or signal branch | branch-dependent |
| $c_0$ | Measured low-energy invariant light speed in weak homogeneous conditions | empirical calibration |

The symbols $c_f$, $c_\gamma$, $c_{\text{eff}}$, $c_\star$, and $c_0$ must not be identified unless the local document states the regime and derivation. In particular, $c_f$ belongs to primitive causal-root equations, while $c_0$ belongs to weak homogeneous observer calibration.

## Causal Wake Geometry

Causality is defined by absolute temporal ordering plus finite wake propagation speed.

Three related objects must be kept separate: temporal order, the filled reachability region, and actual causal-wake support. The Master Equation uses the last of these, not the whole filled region.

For two events
$$
A=(t_A,\mathbf{x}_A),
\qquad
B=(t_B,\mathbf{x}_B)
$$
event $A$ can causally precede $B$ only if
$$
t_A<t_B
$$

A wake emitted at $(t_0,\mathbf{x}_0)$ reaches points on the causal wake surface
$$
\|\mathbf{x}-\mathbf{x}_0\|=c_f(t-t_0),
\qquad
t>t_0
$$

The filled causal future of that emission is
$$
\{(t,\mathbf{x}):t\geq t_0,\ \|\mathbf{x}-\mathbf{x}_0\|\leq c_f(t-t_0)\}
$$

The equality surface is an expanding causal isochron: at each later $t$ it appears as a spatial sphere in the Euclidean void, not as a fundamental light cone of a Lorentzian metric. The filled region records causal order and finite-speed reachability, but it is not the support of a single emitted wake. In the exact Master Equation, a receiver is acted on only at boundary roots satisfying the equality condition above. With a mollifier, support is a narrow neighborhood of that boundary and is interpreted in the weak limit.

For source $j$ and receiver $i$, the canonical root function is
$$
F_{ij}(t,s)
=
\|\mathbf{x}_i(t)-\mathbf{x}_j(s)\|-c_f(t-s),
\qquad
s<t
$$
with active causal-root set
$$
\mathcal{C}_{ij}(t)
=
\{\,s<t:F_{ij}(t,s)=0\,\}
$$
The same notation covers partner hits ($i\ne j$) and self-hits ($i=j$). Simple-root branch charts require the transversality floor
$$
\left|
\partial_sF_{ij}(t,s)
\right|
=
\left|
c_f-\hat{\mathbf{r}}_{ij}(t,s)\cdot\mathbf{v}_j(s)
\right|
\ge
\kappa_{\mathrm{hit}}>0
$$
where
$$
\mathbf{r}_{ij}(t,s)=\mathbf{x}_i(t)-\mathbf{x}_j(s),
\qquad
\hat{\mathbf{r}}_{ij}=\frac{\mathbf{r}_{ij}}{\|\mathbf{r}_{ij}\|}
$$
Failure of this floor marks a caustic-like or degenerate wake-root regime; it is a branch-chart failure condition, not an ordinary small perturbation.

On a smooth retained branch $s=s_\ell(t)$, differentiating
$F_{ij}(t,s_\ell(t))=0$ gives the receiver-normal factor
$$
\frac{ds_\ell}{dt}
=
\frac{c_f-\hat{\mathbf{r}}_{ij}(t,s_\ell)\cdot\mathbf{v}_i(t)}
{c_f-\hat{\mathbf{r}}_{ij}(t,s_\ell)\cdot\mathbf{v}_j(s_\ell)}
$$
This identity is not a new coupling constant. It distinguishes the source-normal
causal-root Jacobian from the rate at which a moving receiver path samples the
same emitted causal wake sequence. A stationary receiver in the Euclidean-void
rest frame sets the numerator to $c_f$; radial receiver motion changes the
receiver-normal action or wake-history rate and must be recorded when a proof
uses accumulated action rather than only an event-local force row.

The status of $\kappa_{\mathrm{hit}}$ is fixed in [Absolute Time](absolute-time.md#causality-and-finite-propagation-speed): it is a declared branch-chart or certificate lower bound, not a universal coupling constant, coordinate parameter, or regularization width.

The causal wake geometry does not forbid a point architrino from having $\|\mathbf{v}\|>c_f$. It forbids backward-time influence. This separates kinematic freedom from dynamical stability: the Euclidean substrate places no kinematic speed limit on a point architrino, but that freedom does not imply that an assembly can be carried through the same regime intact.

In observer-level wave language, causality is often diagnosed by front velocity rather than group or phase velocity. The substrate statement is sharper: the causal front is the first nonzero causal-wake support in absolute time. Observer-level group-speed, phase-speed, or packet-reshaping effects cannot override the support condition above; they are summaries of how an already causal wake record is sampled by assemblies.

For standard-matter assemblies, the observer-level relativistic speed limit is a closure result of assembly structure and channel dressing, usually expressed with the declared local comparison speed $c_\star$ and with $c_0$ in the weak homogeneous observer branch. This statement is effective, not ontological: it constrains the recovered observer branch rather than the admissible velocities of individual architrinos.

At the primitive branch level, as constituent architrino speeds approach the wake-speed threshold $c_f$, the constituents increasingly outrun the potential interactions that normally maintain internal closure. The leading side of the assembly encounters a strongly asymmetric wake ledger while trailing structure remains tied to older path-history contributions. The result is severe mechanical deformation rather than a substrate-level prohibition.

A useful theorem-target diagnostic for this deformation is the active-root Euler characteristic of an assembly branch over a return cycle,
$$
\chi_{\mathrm{root}}(A)
=
\sum_{i,j\in A}
\sum_{s\in\mathcal{C}_{ij}}
\operatorname{sgn}\!\left(\partial_sF_{ij}\right)
$$
with the sums taken over the retained self-hit and partner-hit rows on the branch chart. On a regular chart this signed count is locally constant. A structural-integrity failure near the wake-speed threshold should therefore appear as a jump in $\chi_{\mathrm{root}}(A)$, or in the more detailed causal-root ledger it summarizes, rather than as a smooth kinematic slowing of the substrate background. This is a diagnostic target for Theorem G, not a proof that every branch fails at the same value of $\|\mathbf{v}\|$.

This structural-integrity claim is the central Lorentz-closure theorem target for this chapter and is restated as Theorem G in [Lorentz Kinematics](../spacetime/lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure). It must prove more than the qualitative statement that assemblies fail mechanically near $c_f$. A successful recovered observer branch must show that the matter-assembly limiting speed, Noether sea dressed clock/ruler speed, photon-channel speed, and weak-homogeneous calibration speed collapse to one common limit:
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
The same weak-field constitutive record must also keep the gravitational-wave tensor-channel speed tied to the photon channel within the multi-messenger residual recorded in the constraint ledger.
It must also show that approach to this limit yields Lorentzian kinematics rather than an arbitrary deformation law:
$$
\frac{R_{\parallel}}{R_{\perp}}
=
\frac{1}{\gamma_0(v)}
+O(\epsilon_{\mathrm{LV}}),
\qquad
\frac{d\tau}{dt}
=
\frac{1}{\gamma_0(v)}
+O(\epsilon_{\mathrm{LV}}),
\qquad
\gamma_0(v)
=
\left(1-\frac{v^2}{c_0^2}\right)^{-1/2}
$$
The proposed mechanism is one structural claim, not four independent coincidences. Matter transport, clock/ruler retiming, photon transport, and weak-homogeneous calibration must all be projections of the same causal-root ledger through the same Noether sea dressing map in the tested branch. The Lorentz shape is the same claim expressed in deformation variables: near the wake-speed threshold, the leading longitudinal-versus-transverse asymmetry of a closed return cycle must generate the same $\gamma_0(v)$ in envelope shape and phase rate. A sharper formulation is that the translating branch's closed-cycle geometry should factor through one deformation family on its orbit moduli,
$$
\mathcal{D}(v)=\exp(vK)
$$
with a single generator $K$ producing both the envelope ratio and the clock-phase rate at the tested order. If the longitudinal envelope response and the phase-rate response require independent generators, the branch has not recovered Lorentzian shape even if one scalar speed limit happens to match. The proof burden is to derive these relations from that shared ledger, dressing, and assembly deformation law. The theorem target fails if stable matter classes acquire composition-dependent limiting speeds, if $c_\gamma$ remains independently dressed from matter transport in the weak homogeneous branch, or if the leading deformation is non-Lorentzian after the $c_0$ calibration is fixed. The observer "speed of light" limit for macroscopic assemblies is therefore a structural integrity barrier only after this common-limit and Lorentz-shape closure is satisfied.

## Coordinates and Forbidden Transformations

Allowed substrate coordinates preserve the product structure:

- $t$ remains the absolute time parameter.
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
dt
$$

The spatial volume element on a slice is
$$
dV=dx\,dy\,dz
$$

The product measure is
$$
d\mathcal{V}=dt\,dx\,dy\,dz=dt\,dV
$$

The spatial gradient is
$$
\nabla f=
\left(
\frac{\partial f}{\partial x},
\frac{\partial f}{\partial y},
\frac{\partial f}{\partial z}
\right)
$$

The spatial Laplacian is
$$
\Delta f
=
\partial_x^2f+\partial_y^2f+\partial_z^2f
=
\delta^{ij}\partial_i\partial_j f
$$

The temporal derivative is
$$
\frac{\partial}{\partial t}
$$

All dynamical equations should make clear which derivatives are temporal, which are spatial, and when a calculation is using an effective metric approximation rather than substrate geometry.

## Regularity and Boundary Conditions

For well-posed dynamics on absolute timespace:

- Worldlines are absolutely continuous with piecewise continuous velocities.
- Any alternate parametrization $t(s)$ is strictly increasing.
- Source configurations are locally finite or represented by integrable measures.
- Regularized wake surfaces should preserve total polarity and converge to the intended causal-wake limit as the regulator is removed.
- Solutions should decay suitably at spatial infinity unless an incoming condition is explicitly imposed.

### Receiver-Centered Exhaustion Lemma

Infinite source families must supply a declared summation or continuum prescription under which the many-source wake sum converges. For each receiver event $(i,t)$, choose an increasing receiver-centered exhaustion of retained source events and take the limit in that order. In the simplest radial form the condition is
$$
\lim_{R\to\infty}
\sum_{\substack{j,\ s\in\mathcal{C}_{ij}(t)\\
\|\mathbf{x}_j(s)-\mathbf{x}_i(t)\|<R}}
\mathbf{a}_{ij}(t;s)
$$
with any neutrality, screening, principal-value, or mean-field subtraction rule stated before the limit is used.

This is an admissibility lemma for branches and continuum reductions: the branch is well-defined only when the receiver-centered limit exists under the declared subtraction or screening rule, and allowed refinements of the exhaustion do not change the resulting local acceleration. Inverse-square surface dilution alone is not enough in three spatial dimensions because the number of sources in a radial layer grows like $r^2\,dr$. The lemma supplies the convergence condition used by emergence arguments to justify effective locality and metastable assembly behavior.

There is one important homogeneous case where the lemma becomes a theorem rather than a bare admissibility requirement. Its scope is a background-sea result: it guarantees convergence for a statistically neutral far population under the stated mixing assumptions, not for every coherent assembly embedded in that population. Suppose the far population is statistically homogeneous, isotropic, locally neutral, and vector-mixing, with correlation length $\ell$ for the cell acceleration fluctuations. The required mixing is a condition on the vector sum, not only on scalar polarity neutrality; schematically, after subtracting the local neutral mean,
$$
\left|
\mathbb{E}\!\left[
\delta\mathbf{a}_{\mathrm{cell}}(\mathbf{r})
\cdot
\delta\mathbf{a}_{\mathrm{cell}}(\mathbf{r}')
\right]
\right|
\le
C\,e^{-\|\mathbf{r}-\mathbf{r}'\|/\ell}
$$
or a comparable summable vector-correlation bound. Partition space outside a fixed local ball into receiver-centered shells of thickness comparable to $\ell$, and group sources into neutral cells of diameter $O(\ell)$. Let $S_n$ be the vector acceleration contribution from shell $n$ after subtracting the local neutral mean. A shell at radius $r_n\sim n\ell$ contains $N_n=O(n^2)$ effectively independent cells, so signed fluctuations scale like $\sqrt{N_n}=O(n)$ while each cell contribution carries the inverse-square factor $O(r_n^{-2})=O(n^{-2})$. Hence
$$
\mathbb{E}\|S_n\|^2=O(n^{-2})
$$
under the declared mixing bound, and therefore
$$
\sum_{n=1}^{\infty}\mathbb{E}\|S_n\|^2<\infty
$$
The shell series converges in $L^2$ and almost surely by the standard square-summable fluctuation criterion. Thus a homogeneous locally neutral Noether sea record supplies a convergent receiver-centered exhaustion under these assumptions. This result does not prove convergence for arbitrary inhomogeneous or coherent far populations. A coherent far dipole texture, long-range orientational correlation, or anisotropic source family can defeat vector cancellation even when scalar polarity neutrality holds. Every coherent assembly, anisotropic source family, or long-range correlated medium feature on top of the background must supply its own shielding, screening, finite active horizon, or explicit subtraction prescription before its many-source wake sum is treated as closed.

These assumptions are not additional ontology. They are the analytic conditions needed for the master equation and simulation approximations to be well-defined on the product background.

## Relation to Relativistic Spacetime

Relativistic spacetime remains the correct comparison target for recovered observer laws, but this chapter does not treat it as substrate ontology. The table therefore compares a fixed product background with a downstream effective description.

| **Feature** | **Absolute Timespace** | **Relativistic Spacetime** |
|:---|:---|:---|
| **Manifold** | $\mathbb{R}\times\mathbb{R}^3$ | Four-dimensional spacetime manifold |
| **Time** | Universal parameter | Coordinate dimension or proper-time relation |
| **Spatial geometry** | Fixed Euclidean slices | Part of a dynamical metric |
| **Metric** | Separate $(dt,h)$ data | Non-degenerate $g_{\mu\nu}$ |
| **Simultaneity** | Absolute global foliation | Observer/frame dependent |
| **Causality** | Absolute order plus finite wake speed | Effective metric light cones |
| **Gravity** | Emergent from assembly and Noether sea dynamics | Spacetime curvature |
| **Expansion** | No expansion of the void | Metric expansion possible |

The effective metric used in GR-style recovery is a downstream constitutive object. It must be derived from clocks, rulers, signal transport, and Noether sea response. The local handoff is an observer-level clock-and-ruler relation of the form
$$
d\tau^2
=
A^2(\mathcal{N}_{\mathrm{sea}})\,dt^2
-
\frac{1}{c_0^2}
B_{ij}(\mathcal{N}_{\mathrm{sea}})
\left(dx^i-u^i_{\text{sea}}dt\right)
\left(dx^j-u^j_{\text{sea}}dt\right)
$$
with $A>0$ and $B_{ij}$ symmetric positive definite. Equivalently, defining $ds_{\mathrm{eff}}^2=-c_0^2d\tau^2$ and $x^0=c_0t$ gives the component export
$$
g^{\mathrm{eff}}_{00}
=
-A^2+\frac{1}{c_0^2}B_{ij}u^i_{\text{sea}}u^j_{\text{sea}},
\qquad
g^{\mathrm{eff}}_{0i}
=
-\frac{1}{c_0}B_{ij}u^j_{\text{sea}},
\qquad
g^{\mathrm{eff}}_{ij}
=
B_{ij}
$$
This is the same observer-level ADM/Cartan map stated in [Emergent Metric](../spacetime/emergent-metric.md). This equation is not substrate geometry; it is the required metric handoff from Noether sea state and Physical Observer assemblies into effective spacetime language.

## Role in $\mathbb{A}\mathbb{A}\mathbb{A}$

Absolute timespace is the formal product background in which all architrino dynamics unfold:

- Architrino worldlines are curves $(t,\mathbf{x}(t))$ in $\mathcal{M}$.
- Causal wakes are emitted at earlier events and intersect receivers at later events.
- Path history is well-defined because the past is the set of all events with smaller $t$.
- Assembly motion, clock behavior, and effective spacetime geometry are built on this substrate but are not identical with it.
- Proper time is a functional of physical observer dynamics, not a fundamental interval of $\mathcal{M}$.

## Summary Postulate

> **Postulate 3 (Absolute Timespace):** The background arena for all physics is the product manifold $\mathcal{M}=\mathbb{R}\times\mathbb{R}^3$, equipped with the exact substrate clock form $dt$ and Euclidean spatial metric $h_{ij}=\delta_{ij}$. This defines a global foliation into simultaneous Euclidean slices indexed by universal time. The background is non-dynamical and non-curved. Causality is defined by absolute temporal ordering and finite wake speed $c_f$. The product background preserves Galilean kinematic structure, while the interaction law selects a preferred rest frame dynamically. Effective Lorentz behavior, gravity, lensing, clock dilation, and cosmological expansion are recovery targets: when the assembly and Noether sea closure programs succeed, they are emergent descriptions within absolute timespace, not properties of the background itself.
