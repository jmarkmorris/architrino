# Absolute Time

This chapter is the canonical substrate-level specification for absolute time in $\mathbb{A}\mathbb{A}\mathbb{A}$. It defines the absolute time parameter $t$, the ordering of events, the role of time in causal wake dynamics, and the distinction between fundamental absolute time and observer-level proper time.

The companion chapter [Absolute Time Defense](absolute-time-defense.md) gives the argumentative case for this choice. This chapter states the postulate itself and the mathematical structure that later dynamics use.

## Core Concept

Absolute time is a **one-dimensional, continuous, oriented parameter** that advances uniformly and independently of space, matter, energy, or any physical process. In substrate ontology, it is **non-dynamical**: time does not curve, dilate, accelerate, or respond to forces. Physical clocks are assemblies whose internal cycles are compared against this parameter; they do not generate the parameter itself.

## Mathematical Description

Time is modeled as the real number line:
$$
\mathbb{R}
$$

A specific instant is represented by a point $t \in \mathbb{R}$.

We equivalently encode the orientation of absolute time by the exact **clock 1-form**:
$$
dt
$$
on the manifold $T \cong \mathbb{R}$. This 1-form is closed and exact, and its level sets define simultaneity slices when combined with space in the product manifold $\mathcal{M} = \mathbb{R} \times \mathbb{R}^3$. The symbol $\tau$ is reserved for derived observer proper time. Emission times use $s$, and causal delay is written $\Delta_{ij}=t-s$ rather than by reusing the proper-time symbol.

The level distinction is essential. The substrate structure is absolute time together with the Euclidean void, formally the absolute timespace $\mathcal{M}$. Effective spacetime geometry and proper time are later observer-level reconstructions from assembly dynamics, clock behavior, and Noether sea response; they are not additional time coordinates at the ontological level.

## Dimensionalization

We **non-dimensionalize** time by choosing a reference timescale $T_0 > 0$ such that physical time $\hat{t}$ is given by:
$$
\hat{t} = T_0 \, t,
$$
where $t$ is dimensionless.

Positions require the corresponding length scale. Choose $L_0>0$ and write
$$
\hat{\mathbf{x}}=L_0\mathbf{x},
\qquad
\hat t=T_0t,
\qquad
c_f=\frac{\hat c_f T_0}{L_0}.
$$
Here hatted quantities are dimensional and unhatted quantities are nondimensional. With this convention the nondimensional causal-root condition keeps the same form,
$$
\|\mathbf{x}_i(t)-\mathbf{x}_j(s)\|
=
c_f(t-s),
$$
while the dimensional condition is
$$
\|\hat{\mathbf{x}}_i(\hat t)-\hat{\mathbf{x}}_j(\hat s)\|
=
\hat c_f(\hat t-\hat s).
$$

> **Plain language:** We pick a standard unit of duration, such as one second or one maximum-curvature binary orbit time, and measure all times as pure numbers of that unit, keeping equations dimensionally clean.

## Duration and Linear Advancement

Time progresses at a constant, immutable rate. The **duration** between two instants $t_1$ and $t_2$ is the absolute difference:
$$
\Delta t = |t_2 - t_1|.
$$

The corresponding physical duration is:
$$
\Delta \hat{t} = T_0 \, \Delta t.
$$

This metric is **invariant under time translation**: it is the same for all observers, regardless of their position or state of motion.

> **Plain language:** The gap between any two moments is always given by subtraction; there is no acceleration or deceleration of time itself.

## Time Orientation and Causal Ordering

We endow $\mathbb{R}$ with a **global orientation**:

- **Future** corresponds to increasing $t$.
- **Past** corresponds to decreasing $t$.

The set of all instants is **totally ordered**: for any two instants $t_1$ and $t_2$, exactly one of the following holds:
$$
t_1 < t_2, \quad t_1 = t_2, \quad \text{or} \quad t_1 > t_2.
$$

**Temporal ordering:** Event A temporally precedes event B if and only if $t_A < t_B$. This ordering is absolute and observer-independent. Causal influence is stricter than temporal precedence: Event A can influence event B only when $t_A<t_B$ and event B lies on the finite-speed causal wake support emitted from A.

**Remark on the Thermodynamic Arrow of Time:** Any observed arrow of time in thermodynamic, biological, or cosmological systems, such as entropy increase, aging, or effective expansion, is an **emergent property** arising from the dynamics of assemblies, causal wakes, and observer-level effective fields, not a kinematic postulate. The background time manifold $\mathbb{R}$ is symmetric under time reversal $t \mapsto -t$; the asymmetry emerges at macroscopic scales from initial conditions, dynamics, and the records retained by a finite observer.

The entropy arrow is therefore a finite-window statement, not a definition of time itself. For a chosen coarse-graining $\mathcal{Q}$ and observer-accessible window $W(t)$, an entropy summary has the schematic form
$$
S_{\mathcal{Q},W}(t)=k_B\log \mu\!\left(\Gamma_{\mathcal{Q},W(t)}\right),
$$
where $\Gamma_{\mathcal{Q},W(t)}$ is the set of microstates compatible with the retained macroscopic records in that window. This expression is meaningful only after the measure, coarse-graining, and access window are specified.

The same statement can be written as a projection of complete deterministic histories into the records retained by a Physical Observer. Let $\mu_t$ be a measure on the complete-state and path-history ensemble compatible with the declared preparation, and let $\Pi_{\mathcal{Q},W}$ map those histories to the variables retained by the coarse-graining $\mathcal{Q}$ on the window $W$. Then the observer-window entropy has the form
$$
S_{\Pi,W}(t)
=
k_B\,\mathcal{H}\!\left((\Pi_{\mathcal{Q},W})_*\mu_t\right),
$$
where $\mathcal{H}$ is the entropy functional on the pushed-forward record measure. Even if the complete dynamics preserve the underlying measure, $S_{\Pi,W}$ can increase when $\Pi_{\mathcal{Q},W}$ discards path-history, boundary-wake, or apparatus-record information. This is an observer-window projection effect, not evidence that absolute time itself is generated by entropy.

In cosmology or other unbounded settings, the relevant bookkeeping must also expose boundary flux:
$$
\frac{dS_{\mathcal{Q},W}}{dt}
=
\sigma_W(t)
-
\int_{\partial W(t)}\mathbf{J}_S\cdot\hat{\mathbf{n}}\,dA
+
\mathcal{R}_{\mathcal{Q}}(t),
$$
with $\sigma_W$ the local production term, $\mathbf{J}_S$ the entropy flux through the boundary, and $\mathcal{R}_{\mathcal{Q}}$ the residual created by changing the coarse-graining or record set. Plain language: entropy can diagnose an emergent arrow inside a stated physical and inferential window, but it does not supply the absolute ordering parameter $t$.

A monotone entropy arrow in that window is therefore a conditional balance statement:
$$
\frac{dS_{\mathcal{Q},W}}{dt}\ge 0
\quad\Longleftrightarrow\quad
\sigma_W(t)+\mathcal{R}_{\mathcal{Q}}(t)
\ge
\int_{\partial W(t)}\mathbf{J}_S\cdot\hat{\mathbf{n}}\,dA
$$
for the declared coarse-graining and record set. Without those window data, the theory does not promote entropy increase into a definition of time.

## Absolute and Universal Nature

The time coordinate $t$ is **absolute and universal**:

- The duration $\Delta t$ between any two events is **the same for all observers**, regardless of their position, velocity, or state of motion.
- **No relativity of simultaneity:** Two events with equal $t$-coordinates are simultaneous for all observers in an objective, frame-independent sense.
- **No time dilation at the kinematic level:** The advancement of the background parameter is not affected by motion or observer-level gravitational conditions.

Any observed slowing of clocks for moving or bound assemblies is not a change in the background time flow, but a change in how those assemblies' internal dynamics map onto the absolute time parameter. Proper time is therefore an inferred clock readout in the observer sector, not a second substrate time. See [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md).

> **Implication:** In contrast to special relativity, simultaneity is an **objective, frame-independent property** in $\mathbb{A}\mathbb{A}\mathbb{A}$.

## No Absolute Origin and Completeness

The choice of $t = 0$ is **arbitrary and purely conventional**, serving only as a reference point. The timeline extends infinitely into:

- The **past**: $t \to -\infty$
- The **future**: $t \to +\infty$

As a manifold, $\mathbb{R}$ is:

- **Connected**: no gaps.
- **Complete**: geodesically complete, with no edges or boundaries.
- **Without endpoints**.

This is a statement about the background time manifold used by the fundamental dynamics, not by itself a solved cosmological boundary condition. A particular cosmological solution may occupy all of $\mathbb{R}$ or a dynamically selected interval, depending on its boundary data. Modeling the time factor as $\mathbb{R}$ prevents artificial endpoints in the substrate parameter; it does not prove that every realized universe history has no initialization, cutoff, or external selection condition.

## Symmetries of Absolute Time

The fundamental kinematic symmetry of absolute time is the **additive group**:
$$
(\mathbb{R}, +)
$$
of **time translations**. This acts on time via:
$$
t \mapsto t + t_0, \quad t_0 \in \mathbb{R}.
$$

This symmetry expresses the principle that **the laws of physics are time-translation invariant**: the same admissible state and path-history data, translated by a constant amount in $t$, obey the same dynamical law.

**Connection to Conservation Laws:** Time-translation invariance is the kinematic basis for **energy conservation** when the relevant dynamics admit an energy or action formulation. In this chapter, the point is structural: the background clock supplies a fixed parameter against which such conservation statements can be formulated.

At the level of the background structure, time is symmetric under **time reversal**:
$$
t \mapsto -t.
$$

This is a **mathematical symmetry** of the manifold $\mathbb{R}$. However:

- **Dynamically**, delayed causal wakes and observer-window entropy can break this symmetry in the realized history.
- The **causal orientation** (future = increasing $t$) is the chosen orientation used by the dynamics; it is not curvature, force, or internal structure of the time background itself.

## Role of Time in Dynamics

Time serves as a **universal, non-dynamical parameter** for all worldlines, causal wakes, and observer-level effective laws. It is:

- The independent variable in all equations of motion.
- The basis for defining velocities ($d\mathbf{x}/dt$) and accelerations ($d^2\mathbf{x}/dt^2$).
- A passive parameter, not an active participant in forces or curvature.

**Crucial constraint:** There is **no freedom to choose alternative fundamental time parameters** along a worldline. There is no proper time at the substrate level; all worldlines are parametrized directly by the absolute $t$. This ensures that all dynamical evolution can be tracked consistently against a single, universal clock.

A **worldline** of an architrino or assembly is a map:
$$
\mathbf{x}: I \subset \mathbb{R} \to \mathbb{R}^3, \quad t \mapsto \mathbf{x}(t),
$$
where $I$ is an interval and $t$ is **strictly increasing** with respect to the time orientation.

**Key property:** Worldlines are **monotone in $t$**. There are no closed timelike curves or backward time travel. Branching, when it occurs, is **deterministic multistability in the dynamics** (multiple coexisting attractors), not a splitting of the time parameter itself. Formally:
$$
\frac{dt}{ds} > 0
$$
for any admissible orientation-preserving parametrization $s$ of the worldline.

## Causality and Finite Propagation Speed

**Causal Ordering:** Event A can influence event B **only if** $t_B > t_A$. This is a necessary condition, not a sufficient one.

**Finite Propagation Speed:** All physical interactions are mediated by causal wakes that propagate at a **finite speed** $c_f$, the wake speed used by the master equation.

The foundation stack keeps the relevant speed symbols distinct:

| Symbol | Meaning | Status |
| --- | --- | --- |
| $c_f$ | Primitive causal-wake propagation speed relative to the Euclidean void | fundamental |
| $c_\gamma(\mathcal{N}_{\mathrm{sea}},\hat{\mathbf{k}})$ | Photon-channel speed in a Noether sea state and direction | derived |
| $c_{\text{eff}}$ | Effective signal or clock-channel speed for a specified dressed branch | derived/contextual |
| $c_\star$ | Local comparison speed used in a declared clock, ruler, or signal branch | branch-dependent |
| $c_0$ | Measured low-energy invariant light speed in weak homogeneous conditions | empirical calibration |

These symbols must not be identified unless the local regime and derivation have been stated.

**Path-History Interactions:** If source $j$ emits from $\mathbf{x}_j(t_0)$ and receiver $i$ is at $\mathbf{x}_i(t)$, the contributing emission times are the delayed roots
$$
\mathcal{C}_{ij}(t)
=
\{\,t_0<t:\|\mathbf{x}_i(t)-\mathbf{x}_j(t_0)\|=c_f(t-t_0)\,\}.
$$

Only emission times in $\mathcal{C}_{ij}(t)$ contribute to the receiver at time $t$. In dimensional variables, the same condition is written with hatted times and positions using the corresponding dimensional value of $c_f$.

Equivalently, define the root function
$$
F_{ij}(t,s)
=
\|\mathbf{x}_i(t)-\mathbf{x}_j(s)\|-c_f(t-s),
\qquad
s<t.
$$
Then $\mathcal{C}_{ij}(t)=\{\,s<t:F_{ij}(t,s)=0\,\}$. The same set covers ordinary partner hits when $i\ne j$ and self-hits when $i=j$; no separate self-hit law is needed. A simple-root branch chart requires
$$
\left|
\partial_sF_{ij}(t,s)
\right|
=
\left|
c_f-\hat{\mathbf{r}}_{ij}(t,s)\cdot\mathbf{v}_j(s)
\right|
\ge
\kappa_{\mathrm{hit}}>0,
$$
where
$$
\mathbf{r}_{ij}(t,s)=\mathbf{x}_i(t)-\mathbf{x}_j(s),
\qquad
\hat{\mathbf{r}}_{ij}=\frac{\mathbf{r}_{ij}}{\|\mathbf{r}_{ij}\|}.
$$
Failure of this transversality floor marks a caustic-like or degenerate wake-root regime, so it must be routed to branch-chart or regularization analysis rather than treated as an ordinary force perturbation.

The constant $\kappa_{\mathrm{hit}}>0$ is a physical branch-admissibility floor for causal-root separation in the declared model or regularization. It is not a coordinate parameter and cannot be removed by relabeling the same history.

The interaction law is built entirely from path-history contributions at times $t' < t$ that satisfy the causal-root condition; $\mathbb{A}\mathbb{A}\mathbb{A}$ contains no advanced or instantaneous interaction terms. This ensures causality at the fundamental level.

There are **no instantaneous actions-at-a-distance** and **no advanced potentials**.

## Path History and Non-Markovian Memory

A critical feature of $\mathbb{A}\mathbb{A}\mathbb{A}$ is that **all interactions are mediated by path history**: the cumulative effect of the causal wake surfaces that reach an architrino from prior emission events.

At time $t$, an architrino at position $\mathbf{x}(t)$ experiences forces from all other architrinos based on the **intersection of its worldline with causal wake surfaces** emitted at all past times $t' < t$. This is naturally encoded in the [Master Equation of Motion](../dynamics/master-equation.md) and gives rise to **non-Markovian memory effects**, including the self-hit regime where an architrino interacts with its own past emissions.

Because $t$ is universal and absolute, the past (all $t' < t$) is unambiguous, and the theory can sum or integrate over admissible delayed contributions. This allows for a mechanistic model of interaction without invoking action-at-a-distance, while still permitting **deterministic multistability** at self-hit thresholds.

## Provenance and Identity Through Time

Each architrino carries a unique **provenance** record tied to its worldline history. That provenance is strictly monotone in $t$: exchanging records is not a mere relabeling but an operation that changes the physical history of the participating entities. Any bookkeeping, conservation statement, or coarse-graining must explicitly state when provenance has been suppressed or when identical-looking exchanges are being treated at the effective level.

Consequently, an exact global flip or permutation of architrinos is not a substrate symmetry unless it preserves the full path-history and causal-wake record. Schematically, if a universe state is written as

$$
\mathbb{U}_{\text{now}}\equiv S(t)
=
\{(\mathbf{x}_i(t),\mathbf{v}_i(t),q_i,H_i(t))\}_i,
$$

where $H_i(t)$ denotes the path-history and provenance record carried by architrino $i$, then a proposed exchange is exact only when it preserves the instantaneous data and the corresponding $H_i(t)$ records. Generic architrinos are therefore not interchangeable at the ontic level even when finite observers can treat their exposed properties as effectively identical.

The architrino-specific identity claim is developed further in [Architrino](architrino.md).

## Geodesics and the Absence of Temporal Dynamics

In $\mathbb{A}\mathbb{A}\mathbb{A}$, time itself has no internal structure or dynamics. It does not encode forces, curvature, or acceleration of any kind.

- **Geodesics of time** are trivial: they are simply the flow $t \mapsto t$ at constant rate.
- All **forces and accelerations** arise from:
  - **Causal wakes** acting within the fixed Euclidean void.
  - **Self-interaction** of extended assemblies, such as the self-hit regime of binaries.

They do **not** arise from any curvature or dynamics of the time coordinate itself.

**Comparison to General Relativity:** In GR, time is part of a dynamical spacetime manifold that curves in response to stress-energy. Here, time is **fixed and non-dynamical**; any observer-level clock dilation, lapse effect, or effective metric curvature observed in experiments must emerge from assembly dynamics, causal wakes, and Noether sea response within this rigid temporal framework. The comparison does not deny relativistic phenomenology; it assigns that phenomenology to an effective recovery layer rather than to fundamental time.

## Distinction from Relativistic Time

| **Feature** | **Absolute Time ($\mathbb{A}\mathbb{A}\mathbb{A}$)** | **Relativistic Time** |
|:---|:---|:---|
| **Manifold** | $\mathbb{R}$ (1D, separate from space) | Part of 4D spacetime with Lorentzian metric |
| **Universality** | Universal, frame-independent clock | Relative; different observers measure different intervals |
| **Simultaneity** | Absolute and global | Relative; depends on observer's frame |
| **Duration** | Frame-independent | Frame-dependent; proper time varies with velocity and gravity |
| **Dilation** | None at kinematic level | Yes; $d\tau = \sqrt{1 - v^2/c^2} \, dt$ |
| **Mixing with Space** | No; time and space strictly separate | Yes; Lorentz boosts mix $t$ and $\mathbf{x}$ |
| **Causal Structure** | Defined by temporal ordering plus finite propagation speed $c_f$ | Encoded in the metric via lightcones |
| **Background Dynamics** | Non-dynamical | Dynamical; Einstein's equations |

## Summary Postulate

> **Postulate 1 (Absolute Time):** Time is an **absolute, universal, one-dimensional continuum** $\mathbb{R}$, with a fixed orientation (future = increasing $t$) and a uniform rate of advancement. Duration between events is **frame-independent**. The time coordinate is **non-dynamical** and does not encode forces or curvature. All dynamics occur via finite-speed wake propagation ($c_f$) in absolute time, with all interactions via path history; there is no instantaneous action-at-a-distance. Worldlines are parametrized directly by $t$ with no fundamental reparametrization freedom. Any thermodynamic arrow, observer-clock dilation, or relativistic proper-time effect is an emergent property of assemblies, causal wakes, and effective observer reconstruction, not a feature of the background $t$ parameter itself.
