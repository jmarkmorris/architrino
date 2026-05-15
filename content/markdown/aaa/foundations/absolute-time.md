# Absolute Time

This chapter is the canonical substrate-level specification for absolute time in $\mathbb{A}\mathbb{A}\mathbb{A}$. It defines the global time parameter $t$, the ordering of events, the role of time in causal wake dynamics, and the distinction between fundamental absolute time and observer-level proper time.

The companion chapter [Absolute Time Defense](absolute-time-defense.md) gives the argumentative case for this choice. This chapter states the postulate itself and the mathematical structure that later dynamics use.

## Core Concept

Absolute time is a **one-dimensional, continuous, oriented parameter** that flows uniformly and independently of space, matter, energy, or any physical processes. It is **non-dynamical** and serves as the universal clock for all phenomena. Time does not curve, dilate, or respond to forces; it is the fixed stage upon which all dynamics unfold, not an actor within them.

## Mathematical Description

Time is modeled as the real number line:
$$
\mathbb{R}
$$

A specific instant is represented by a point $t \in \mathbb{R}$.

We equivalently encode absolute time as a **1-form**:
$$
\tau = dt
$$
on the manifold $T \cong \mathbb{R}$. This 1-form is closed and exact, and its level sets define surfaces of simultaneity when combined with space in the product manifold $\mathcal{M} = \mathbb{R} \times \mathbb{R}^3$.

## Dimensionalization

We **non-dimensionalize** time by choosing a reference timescale $T_0 > 0$ such that physical time $\hat{t}$ is given by:
$$
\hat{t} = T_0 \, t,
$$
where $t$ is dimensionless.

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

**Causality:** Event A causally precedes event B if and only if $t_A < t_B$. This ordering is absolute and observer-independent.

**Remark on the Thermodynamic Arrow of Time:** Any observed arrow of time in thermodynamic, biological, or cosmological systems, such as entropy increase, aging, or expansion, is an **emergent property** arising from the dynamics of assemblies and fields, not a kinematic postulate. The background time manifold $\mathbb{R}$ is symmetric under time reversal $t \mapsto -t$; the asymmetry emerges at macroscopic scales from initial conditions and dynamics.

The entropy arrow is therefore a finite-window statement, not a definition of time itself. For a chosen coarse-graining $\mathcal{Q}$ and observer-accessible window $W(t)$, an entropy summary has the schematic form
$$
S_{\mathcal{Q},W}(t)=k_B\log \mu\!\left(\Gamma_{\mathcal{Q},W(t)}\right),
$$
where $\Gamma_{\mathcal{Q},W(t)}$ is the set of microstates compatible with the retained macroscopic records in that window. This expression is meaningful only after the measure, coarse-graining, and access window are specified. In cosmology or other unbounded settings, the relevant bookkeeping must also expose boundary flux:
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

## Absolute and Universal Nature

The time coordinate $t$ is **absolute and universal**:

- The duration $\Delta t$ between any two events is **the same for all observers**, regardless of their position, velocity, or state of motion.
- **No relativity of simultaneity:** Two events with equal $t$-coordinates are simultaneous for all observers in an objective, frame-independent sense.
- **No time dilation at the kinematic level:** The clock rate is not affected by motion or gravitational fields at the level of the background.

Any observed slowing of clocks for moving or bound assemblies is not a change in the background time flow, but a change in how those assemblies' internal dynamics map onto the absolute time parameter. See [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md).

> **Implication:** In contrast to special relativity, simultaneity is an **objective, frame-independent property** in $\mathbb{A}\mathbb{A}\mathbb{A}$.

## No Absolute Origin and Completeness

The choice of $t = 0$ is **arbitrary and purely conventional**, serving only as a reference point. The timeline extends infinitely into:

- The **past**: $t \to -\infty$
- The **future**: $t \to +\infty$

As a manifold, $\mathbb{R}$ is:

- **Connected**: no gaps.
- **Complete**: geodesically complete, with no edges or boundaries.
- **Without endpoints**.

## Symmetries of Absolute Time

The fundamental kinematic symmetry of absolute time is the **additive group**:
$$
(\mathbb{R}, +)
$$
of **time translations**. This acts on time via:
$$
t \mapsto t + t_0, \quad t_0 \in \mathbb{R}.
$$

This symmetry expresses the principle that **the laws of physics are time-translation invariant**: a phenomenon occurring at time $t$ is physically identical to the same phenomenon at time $t + t_0$.

**Connection to Conservation Laws:** Time-translation invariance is the kinematic basis for the **conservation of energy**.

At the level of the background structure, time is symmetric under **time reversal**:
$$
t \mapsto -t.
$$

This is a **mathematical symmetry** of the manifold $\mathbb{R}$. However:

- **Dynamically**, the interaction law and the arrow of entropy may break this symmetry.
- The **causal orientation** (future = increasing $t$) is a chosen convention for modeling, not an intrinsic asymmetry of the time background itself.

## Role of Time in Dynamics

Time serves as a **universal, non-dynamical parameter** for all worldlines and field evolutions. It is:

- The independent variable in all equations of motion.
- The basis for defining velocities ($d\mathbf{x}/dt$) and accelerations ($d^2\mathbf{x}/dt^2$).
- A passive parameter, not an active participant in forces or curvature.

**Crucial constraint:** There is **no freedom to choose alternative time parameters** along a worldline. There is no proper time at the fundamental level; all worldlines are parametrized directly by the global $t$. This ensures that all dynamical evolution can be tracked consistently against a single, universal clock.

A **worldline** of an architrino or assembly is a map:
$$
\mathbf{x}: I \subset \mathbb{R} \to \mathbb{R}^3, \quad t \mapsto \mathbf{x}(t),
$$
where $I$ is an interval and $t$ is **strictly increasing** with respect to the time orientation.

**Key property:** Worldlines are **monotone in $t$**. There are no closed timelike curves or backward time travel. Branching, when it occurs, is **meta-stable branching in the dynamics** (multiple coexisting attractors), not a splitting of the time parameter itself. Formally:
$$
\frac{dt}{ds} > 0
$$
for any parametrization $s$ of the worldline.

## Causality and Finite Propagation Speed

**Causal Ordering:** Event A can influence event B **only if** $t_B > t_A$.

**Finite Propagation Speed:** All physical interactions are mediated by causal wakes that propagate at a **finite speed** $c_f$, the wake speed defined by the master equation.

**Path-History Interactions:** If a source is located at $(\hat{t}_0, \mathbf{x}_0)$, its influence reaches a receiver at $(\hat{t}, \mathbf{x})$ at the **emission time**:
$$
\hat{t}_{\text{emit}} = \hat{t} - \frac{\|\mathbf{x} - \mathbf{x}_0\|}{c_f}.
$$

Only if $\hat{t} \geq \hat{t}_{\text{emit}}$ can the source influence the receiver.

The interaction law is built entirely from path-history contributions at times $t' < t$; $\mathbb{A}\mathbb{A}\mathbb{A}$ contains no advanced or instantaneous interaction terms. This ensures causality at the fundamental level.

There are **no instantaneous actions-at-a-distance** and **no advanced potentials**.

## Path History and Non-Markovian Memory

A critical feature of $\mathbb{A}\mathbb{A}\mathbb{A}$ is that **all interactions are mediated by path history**: the cumulative effect of an architrino's exposure to all past sources.

At time $t$, an architrino at position $\mathbf{x}(t)$ experiences forces from all other architrinos based on the **intersection of its worldline with causal wake surfaces** emitted at all past times $t' < t$. This is naturally encoded in the [Master Equation of Motion](../dynamics/master-equation.md) and gives rise to **non-Markovian memory effects**, including the self-hit regime where an architrino interacts with its own past emissions.

Because $t$ is universal and absolute, we can unambiguously define the past (all $t' < t$) and integrate over it. This allows for a mechanistic model of interaction without invoking action-at-a-distance, while still permitting **meta-stable branching** at self-hit thresholds.

## Provenance and Identity Through Time

Each architrino carries a unique **provenance** label tied to its worldline history. That provenance is strictly monotone in $t$: exchanging labels is not a mere relabeling but an operation that changes the physical history of the participating entities. Any bookkeeping, conservation statement, or coarse-graining must explicitly state when provenance has been suppressed or when identical-looking exchanges are being treated at the effective level.

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
  - **Causal wakes** acting within the fixed Euclidean space.
  - **Self-interaction** of extended assemblies, such as the self-hit regime of binaries.

They do **not** arise from any curvature or dynamics of the time coordinate itself.

**Comparison to General Relativity:** In GR, time is part of a dynamical spacetime manifold that curves in response to stress-energy. Here, time is **fixed and non-dynamical**; any time-like curvature or dilation observed in experiments must emerge from the dynamics of assemblies and effective fields acting within this rigid temporal framework.

## Distinction from Relativistic Time

| **Feature** | **Absolute Time ($\mathbb{A}\mathbb{A}\mathbb{A}$)** | **Relativistic Time** |
|:---|:---|:---|
| **Manifold** | $\mathbb{R}$ (1D, separate from space) | Part of 4D spacetime with Lorentzian metric |
| **Universality** | Global, frame-independent clock | Relative; different observers measure different intervals |
| **Simultaneity** | Absolute and global | Relative; depends on observer's frame |
| **Duration** | Frame-independent | Frame-dependent; proper time varies with velocity and gravity |
| **Dilation** | None at kinematic level | Yes; $d\tau = \sqrt{1 - v^2/c^2} \, dt$ |
| **Mixing with Space** | No; time and space strictly separate | Yes; Lorentz boosts mix $t$ and $\mathbf{x}$ |
| **Causal Structure** | Defined by temporal ordering plus finite propagation speed $c_f$ | Encoded in the metric via lightcones |
| **Background Dynamics** | Non-dynamical | Dynamical; Einstein's equations |

## Summary Postulate

> **Postulate 1 (Absolute Time):** Time is an **absolute, universal, one-dimensional continuum** $\mathbb{R}$, with a fixed orientation (future = increasing $t$) and a uniform rate of advancement. Duration between events is **frame-independent**. The time coordinate is **non-dynamical** and does not encode forces or curvature. All dynamics occur via finite-speed wake propagation ($c_f$) in absolute time, with all interactions via path history; there is no instantaneous action-at-a-distance. Worldlines are parametrized directly by $t$ with no reparametrization freedom. Any physical arrow of time or observed time dilation is an emergent property of assemblies and their dynamics, not a feature of the background $t$ parameter itself.
