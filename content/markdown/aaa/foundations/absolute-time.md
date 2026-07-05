# Absolute Time

This chapter defines absolute time in $\mathbb{A}\mathbb{A}\mathbb{A}$ at the substrate level. It says what the time parameter $t$ is, how it orders events, how causal wakes use it, and why observer proper time is a derived clock readout rather than a second fundamental time.

The companion chapter [Absolute Time Defense](absolute-time-defense.md) gives the argumentative case for this choice. This chapter does the more basic job: it states the postulate and the mathematical structure used by the later dynamics.

## Core Concept

Absolute time is the one universal ordering parameter. It is **one-dimensional, continuous, and oriented**, and it advances independently of space, matter, energy, or any physical process. In substrate ontology, it is **non-dynamical**: time does not curve, dilate, accelerate, or respond to forces.

Physical clocks are different. A clock is an assembly with repeatable internal cycles. The clock can speed up or slow down as an assembly, but the cycles are compared against the absolute parameter; they do not generate it.

The word **uniformly** is a dynamical normalization statement, not an extra clock substance on the bare line. Before units and laws are declared, the oriented manifold $T\cong\mathbb{R}$ admits affine relabelings $t\mapsto at+b$ with $a>0$. The origin $b$ remains conventional. The scale $a$ is fixed only after the dynamics are declared: the primitive wake speed $c_f$ is constant in the Euclidean-void rest frame, all worldlines use the same parameter $t$, and the master equation keeps its receiving law form.

A rescaling of $t$ is therefore a unit change involving $T_0$, $L_0$, $c_f$, and the coupling normalizations. It is not a second physical freedom to choose a different flow of time. Constancy of $c_f$ together with form-invariance of the receiving law pins $t$ to its affine class; a smooth nonlinear reclock $t\mapsto\phi(t)$ would introduce time-dependent propagation and derivative factors, so $\operatorname{Diff}^+(\mathbb{R})$ is not a substrate symmetry.

After that scale fixing, the remaining freedom is only translation by $b$. The background time line is therefore best understood as a principal homogeneous space for $(\mathbb{R},+)$: it has a global orientation and duration scale, but no marked origin. This makes the conventional status of $t=0$ precise without weakening the physical status of the affine scale chosen by the receiving law.

## Time Implementation Ladder

Ordinary language uses the word "time" for several different things. $\mathbb{A}\mathbb{A}\mathbb{A}$ separates those things so the reader does not confuse the substrate parameter with clocks or observations:

1. **Substrate ordering:** Absolute time $t$ orders universe states. It is not directly measured by a physical clock and has no natural origin; its affine scale is fixed only after the causal-wake law and unit convention are declared.
2. **Causal-wake implementation:** Architrino worldlines and emissions make the ordering physically operative. A source event at emission time $s$ contributes at a receiver time $t$ only when the causal wake support satisfies
$$
r_{ij}(t;s)=c_f(t-s).
$$
In this layer, temporal separation and Euclidean distance become a receiver-local interaction condition.
3. **Assembly clock readout:** Physical clock time is an assembly-level phase extraction. A stable binary or Noether braid branch supplies repeatable internal cycles, and observer clock time is the count of those cycles relative to a reference branch, not another substrate parameter. In the notation of the clock chapters,
$$
d\tau_{\mathcal A}
=
\frac{d\varphi_{\mathcal A}}{\Omega_{\mathcal A}^{(0)}}.
$$
Motion through the Euclidean void and coupling to the Noether sea can retune the internal cycle, so derived clock time changes even though absolute time does not.

This ladder preserves the useful intuition that cycles make clocks while preventing cycles from being confused with time itself. A moving assembly may trace a helical history through absolute timespace, and its internal cycle may slow or speed relative to $t$; the substrate ordering parameter remains the same line.

It also prevents a second confusion. Absolute simultaneity does not mean an observer can read the whole simultaneous universe state. It means there is a fact of the matter about the ordering parameter. What an observer can reconstruct is limited by assembly clocks, causal wakes, signal transport, and Noether sea coupling.

## Mathematical Description

Mathematically, time is the real number line:
$$
\mathbb{R}
$$

A specific instant is a point $t \in \mathbb{R}$.

The same orientation can be encoded by the exact **clock 1-form**:
$$
dt
$$
on the manifold $T \cong \mathbb{R}$. This 1-form is closed and exact, and its level sets define simultaneity slices when combined with space in the product manifold $\mathcal{M} = \mathbb{R} \times \mathbb{R}^3$.

The notation keeps the levels apart. The symbol $\tau$ is reserved for derived observer proper time. Emission times use $s$, and causal delay is written $\Delta_{ij}=t-s$ rather than by reusing the proper-time symbol.

The substrate structure is absolute time together with the Euclidean void, formally the absolute timespace $\mathcal{M}$. Effective spacetime geometry and proper time are later observer-level reconstructions from assembly dynamics, clock behavior, and Noether sea response. They are not additional time coordinates at the ontological level.

## Dimensionalization

The equations are usually written in nondimensional form. Choose a reference timescale $T_0 > 0$ such that physical time $\hat{t}$ is given by:
$$
\hat{t} = T_0 \, t
$$
where $t$ is dimensionless.

Positions require the corresponding length scale. Choose $L_0>0$ and write
$$
\hat{\mathbf{x}}=L_0\mathbf{x},
\qquad
\hat t=T_0t,
\qquad
c_f=\frac{\hat c_f T_0}{L_0}
$$
Here hatted quantities are dimensional and unhatted quantities are nondimensional. With this convention, the nondimensional causal-root condition keeps the same form,
$$
\|\mathbf{x}_i(t)-\mathbf{x}_j(s)\|
=
c_f(t-s)
$$
while the dimensional condition is
$$
\|\hat{\mathbf{x}}_i(\hat t)-\hat{\mathbf{x}}_j(\hat s)\|
=
\hat c_f(\hat t-\hat s)
$$

Choosing $T_0$ fixes the affine scale of $t$ for the declared model. Setting $c_f=1$ is the special unit convention $L_0/T_0=\hat c_f$; keeping $c_f$ explicit leaves the physical anchor visible.

> **Plain language:** We pick a standard unit of duration, such as one second or one maximum-curvature binary orbit time, and measure all times as pure numbers of that unit, keeping equations dimensionally clean.

## Duration and Linear Advancement

Once the affine scale is fixed by the declared dynamical normalization, duration is simple. The **duration** between two instants $t_1$ and $t_2$ is the absolute difference:
$$
\Delta t = |t_2 - t_1|
$$

The corresponding physical duration is:
$$
\Delta \hat{t} = T_0 \, \Delta t
$$

This duration rule is **invariant under time translation**. It is the same for all observers, regardless of their position or state of motion.

> **Plain language:** The gap between any two moments is always given by subtraction; there is no acceleration or deceleration of time itself.

## Time Orientation and Causal Ordering

We endow $\mathbb{R}$ with a **global orientation**:

- **Future** corresponds to increasing $t$.
- **Past** corresponds to decreasing $t$.

The set of all instants is **totally ordered**: for any two instants $t_1$ and $t_2$, exactly one of the following holds:
$$
t_1 < t_2, \quad t_1 = t_2, \quad \text{or} \quad t_1 > t_2
$$

**Temporal ordering:** Event A temporally precedes event B if and only if $t_A < t_B$. This ordering is absolute and observer-independent.

Causal influence is stricter than temporal precedence. Event A can influence event B only when $t_A<t_B$ and event B lies on the finite-speed causal wake support emitted from A. Being earlier is necessary; being on the received wake support is the additional physical condition.

**Remark on the Thermodynamic Arrow of Time:** The background time manifold $\mathbb{R}$ is symmetric under time reversal $t \mapsto -t$ as a bare oriented line. The declared interaction law is not time-symmetric in that same sense: causal wakes contribute only from emission times $s<t$, and the theory excludes advanced or instantaneous interaction terms.

The causal arrow is therefore a law-level feature of the master-equation support convention. Thermodynamic, biological, and cosmological arrows are emergent finite-window properties built on that oriented dynamics, initial and boundary conditions, and the records retained by a finite observer. This differs from time-symmetric absorber formulations, where past- and future-supported solutions are treated as part of one law.

The entropy arrow is therefore a finite-window statement, not a definition of time itself. For a chosen coarse-graining $\mathcal{Q}$ and observer-accessible window $W(t)$, an entropy summary has the schematic form
$$
S_{\mathcal{Q},W}(t)=k_B\log \mu\!\left(\Gamma_{\mathcal{Q},W(t)}\right)
$$
where $\Gamma_{\mathcal{Q},W(t)}$ is the set of microstates compatible with the retained macroscopic records in that window. This expression is meaningful only after the measure, coarse-graining, and access window are specified.

The same statement can be written as a projection of complete deterministic histories into the records retained by a Physical Observer. Let $\mu_t$ be a measure on the complete-state and path-history ensemble compatible with the declared preparation, and let $\Pi_{\mathcal{Q},W}$ map those histories to the variables retained by the coarse-graining $\mathcal{Q}$ on the window $W$. Then the observer-window entropy has the form
$$
S_{\Pi,W}(t)
=
k_B\,\mathcal{H}\!\left((\Pi_{\mathcal{Q},W})_*\mu_t\right)
$$
where $\mathcal{H}$ is the entropy functional on the pushed-forward record measure. Even if the complete dynamics preserve the underlying measure, $S_{\Pi,W}$ can increase when $\Pi_{\mathcal{Q},W}$ discards path-history, boundary-wake, or apparatus-record information. This is an observer-window projection effect, not evidence that absolute time itself is generated by entropy.

The measure statement is an admissibility assumption, not a free infinite-dimensional Liouville theorem. For delayed dynamics the natural history space is a path-history space, such as a finite-memory regularized section of $C([-h,0];\mathbb{R}^{3N})$ or a finite Galerkin chart after the mollifier $\eta$ and memory horizon $h$ have been declared. Entropy claims in this chapter therefore apply on a stated finite or regularized history chart carrying a quasi-invariant preparation measure. Extending the same notation to an infinite-history limit is a closure target, not something supplied by the definition of absolute time.

In cosmology or other unbounded settings, the relevant bookkeeping must also expose boundary flux:
$$
\frac{dS_{\mathcal{Q},W}}{dt}
=
\sigma_W(t)
-
\int_{\partial W(t)}
\left(
\mathbf{J}_S
-
s_{\mathcal{Q}}\mathbf{u}_{\partial W}
\right)
\cdot\hat{\mathbf{n}}\,dA
+
\mathcal{R}_{\mathcal{Q}}(t)
$$
with $\sigma_W$ the local production term, $\mathbf{J}_S$ the entropy flux through the boundary in the fixed substrate chart, $s_{\mathcal{Q}}$ the retained entropy density, $\mathbf{u}_{\partial W}$ the velocity of the moving window boundary, and $\mathcal{R}_{\mathcal{Q}}$ the residual created by changing the coarse-graining or record set. For a fixed window, $\mathbf{u}_{\partial W}=\mathbf{0}$ and the expression reduces to the ordinary flux balance. Plain language: entropy can diagnose an emergent arrow inside a stated physical and inferential window, but it does not supply the absolute ordering parameter $t$.

The residual $\mathcal{R}_{\mathcal{Q}}$ has the same structural role as other chart-change terms in the foundation stack. On a regular observer chart the projection rank, record set, and coarse-graining are fixed, so the functional is single-valued. When the observer projection changes rank, for example at a branch fold, record separator, or coarse-graining handoff, $\mathcal{R}_{\mathcal{Q}}$ records the entropy jump introduced by the changed chart rather than a force acting on time itself.

A monotone entropy arrow in that window is therefore a conditional balance statement:
$$
\frac{dS_{\mathcal{Q},W}}{dt}\ge 0
\quad\Longleftrightarrow\quad
\sigma_W(t)+\mathcal{R}_{\mathcal{Q}}(t)
\ge
\int_{\partial W(t)}
\left(
\mathbf{J}_S
-
s_{\mathcal{Q}}\mathbf{u}_{\partial W}
\right)
\cdot\hat{\mathbf{n}}\,dA
$$
for the declared coarse-graining and record set. Without those window data, the theory does not promote entropy increase into a definition of time.

## Absolute and Universal Nature

The time coordinate $t$ is **absolute and universal**:

- The duration $\Delta t$ between any two events is **the same for all observers**, regardless of their position, velocity, or state of motion.
- **No relativity of simultaneity:** Two events with equal $t$-coordinates are simultaneous for all observers in an objective, frame-independent sense.
- **No time dilation at the kinematic level:** The advancement of the background parameter is not affected by motion or observer-level gravitational conditions.

Any observed slowing of clocks for moving or bound assemblies is not a change in the background time flow. It is a change in how those assemblies' internal dynamics map onto the absolute time parameter. Proper time is therefore an inferred clock readout in the observer sector, not a second substrate time. See [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md).

> **Implication:** In contrast to special relativity, simultaneity is an **objective, frame-independent property** in $\mathbb{A}\mathbb{A}\mathbb{A}$.

## No Absolute Origin and Completeness

The choice of $t = 0$ is **arbitrary and purely conventional**. It serves only as a reference point. The timeline extends infinitely into:

- The **past**: $t \to -\infty$
- The **future**: $t \to +\infty$

As a manifold, $\mathbb{R}$ is:

- **Connected**: no gaps.
- **Complete**: geodesically complete, with no edges or boundaries.
- **Without endpoints**.

This is a statement about the background time manifold used by the fundamental dynamics. It is not by itself a solved cosmological boundary condition. A particular cosmological solution may occupy all of $\mathbb{R}$ or a dynamically selected interval, depending on its boundary data. Modeling the time factor as $\mathbb{R}$ prevents artificial endpoints in the substrate parameter; it does not prove that every realized universe history has no initialization, cutoff, or external selection condition.

## Symmetries of Absolute Time

The fundamental kinematic symmetry of absolute time is the **additive group**:
$$
(\mathbb{R}, +)
$$
of **time translations**. This acts on time via:
$$
t \mapsto t + t_0, \quad t_0 \in \mathbb{R}
$$

This symmetry expresses the principle that **the laws of physics are time-translation invariant**: the same admissible state and path-history data, translated by a constant amount in $t$, obey the same dynamical law.

The larger group of smooth orientation-preserving time relabelings is not a symmetry of the substrate law. Once the constant wake speed and receiving-law normalization are fixed, nonlinear time reparametrizations change the causal-root spacing, source-normal denominators, and receiver-normal factors rather than merely changing units.

**Connection to Conservation Laws:** Time-translation invariance is the kinematic basis for **energy conservation** when the relevant dynamics admit an energy or action formulation. In this chapter, the point is structural: the background clock supplies a fixed parameter against which such conservation statements can be formulated.

At the level of the background structure, time is symmetric under **time reversal**:
$$
t \mapsto -t
$$

This is a **mathematical symmetry** of the manifold $\mathbb{R}$, not automatically a symmetry of the declared dynamics. The master equation chooses future as increasing $t$ by summing only over causal-root rows with $s<t$. A reflected history would solve a different future-supported law unless the causal-support convention were changed. The **causal orientation** is therefore part of the dynamics' support rule; it is not curvature, force, or internal structure of the time background itself.

## Role of Time in Dynamics

Time serves as a **universal, non-dynamical parameter** for all worldlines, causal wakes, and observer-level effective laws. It is:

- The independent variable in all equations of motion.
- The basis for defining velocities ($d\mathbf{x}/dt$) and accelerations ($d^2\mathbf{x}/dt^2$).
- A passive parameter, not an active participant in forces or curvature.

**Crucial constraint:** There is **no freedom to choose alternative fundamental time parameters** along a worldline. There is no proper time at the substrate level; all worldlines are parametrized directly by the absolute $t$. This ensures that all dynamical evolution can be tracked consistently against a single, universal clock.

A **worldline** of an architrino or assembly is a map:
$$
\mathbf{x}: I \subset \mathbb{R} \to \mathbb{R}^3, \quad t \mapsto \mathbf{x}(t)
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
\{\,t_0<t:\|\mathbf{x}_i(t)-\mathbf{x}_j(t_0)\|=c_f(t-t_0)\,\}
$$

Only emission times in $\mathcal{C}_{ij}(t)$ contribute to the receiver at time $t$. Earlier events that miss this root condition do not contribute through this channel. In dimensional variables, the same condition is written with hatted times and positions using the corresponding dimensional value of $c_f$.

Equivalently, define the root function
$$
F_{ij}(t,s)
=
\|\mathbf{x}_i(t)-\mathbf{x}_j(s)\|-c_f(t-s),
\qquad
s<t
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
\kappa_{\mathrm{hit}}>0
$$
where
$$
\mathbf{r}_{ij}(t,s)=\mathbf{x}_i(t)-\mathbf{x}_j(s),
\qquad
\hat{\mathbf{r}}_{ij}=\frac{\mathbf{r}_{ij}}{\|\mathbf{r}_{ij}\|}
$$
Failure of this transversality floor marks a caustic-like or degenerate wake-root regime. It must be routed to branch-chart or regularization analysis rather than treated as an ordinary force perturbation.

For self-hits, the shared root function does not erase the additional geometry carried by source identity. When $i=j$, a root means the same worldline $\gamma_i$ re-enters its own forward causal isochron. In general this is a curvature, torsion, and return-geometry condition on $\gamma_i$, not a speed test by itself. A super-field-speed segment is a regime warning for possible self-hit roots, but the accepted branch is still defined by same-source root existence together with the transversality floor.

The symbol $\kappa_{\mathrm{hit}}>0$ is not a universal coupling constant and not the regularization width $\eta$. It denotes a declared positive lower bound for one retained branch chart, certificate, or regularized model after the units, root labels, endpoint convention, and memory window have been fixed. Concrete branch packets may report the same condition as a certified Jacobian floor such as $J_0$ or $\nu_J$. The existence of a positive floor is part of simple-root admissibility; its numerical value belongs to the branch-chart or validation record, not to the universal parameter ledger. It is not a coordinate parameter and cannot be removed by relabeling the same history.

Topologically, a generic loss of this floor is a codimension-one fold of the causal-root manifold: two simple roots can merge into one degenerate root, or a simple root can be born at a caustic boundary. The floor is therefore not merely an analytic small-denominator guard. It certifies that the branch count and causal-root topology are stable on the retained chart; when it fails, the event must be treated as a root bifurcation, reconnection, or chart transition.

The corresponding root caustic set for a pair of histories is
$$
\Sigma_{ij}
=
\{(t,s):F_{ij}(t,s)=0,\ \partial_sF_{ij}(t,s)=0\}
$$
On a generic one-parameter branch this is a Whitney fold, or $A_2$ singularity, of the root map $s\mapsto F_{ij}(t,s)$. Higher events such as a cusp, where $\partial_s^2F_{ij}=0$ also holds, are codimension-two alarms for branch-pair creation, annihilation, or merger of fold events. In simulation language, fold contact is the first warning that the Jacobian floor has failed; cusp contact is a stronger warning that the local branch-count catalogue itself is changing.

This is one instance of a broader foundation-stack discipline: **non-degeneracy floors** convert exact failure sets into graded admissibility certificates. The root Jacobian floor here, the basin-separatrix floor in [Emergence](emergence-of-structure.md#context-as-constraint-on-basin-selection), and the basis-conditioning floor in [Constructing the Absolute Frame](constructing-the-absolute-frame.md#reconstruction-existence-lemma) serve the same role for different objects. They are certificate margins attached to declared charts, not universal constants.

The interaction law is built entirely from path-history contributions at times $t' < t$ that satisfy the causal-root condition; $\mathbb{A}\mathbb{A}\mathbb{A}$ contains no advanced or instantaneous interaction terms. This delayed-only support condition is a law-level causal asymmetry, not merely an initial-condition effect.

There are **no instantaneous actions-at-a-distance** and **no advanced potentials**.

This gives the postulate a hard failure wall. Postulate 1 fails if any accepted substrate-level interaction requires support from $s > t$, instantaneous coupling at spatial separation, or a clock-rate field that enters the receiving law as an independent substrate variable rather than as a derived assembly readout. Observer-level proper time, clock dilation, and effective metric lapse may still be recovered, but they cannot be promoted into a second fundamental time parameter without replacing the postulate.

## Path History and Non-Markovian Memory

A critical feature of $\mathbb{A}\mathbb{A}\mathbb{A}$ is that **all interactions are mediated by path history**. The present receiver does not respond to an instantaneous distant object. It responds to the cumulative causal wake surfaces that reach it from prior emission events.

At time $T$, an architrino at position $\mathbf X(T)$ receives wake contributions where its worldline intersects **causal wake surfaces** emitted at all past times $T' < T$; through the [Master Equation](../dynamics/master-equation.md), those received wakes determine receiver-local acceleration rather than a primitive force. This gives rise to **non-Markovian memory effects**, including the self-hit regime where an architrino interacts with its own past emissions.

Because $T$ is universal and absolute, the past (all $T' < T$) is unambiguous, and the theory can sum or integrate over admissible delayed contributions. This allows for a mechanistic model of interaction without invoking action-at-a-distance, while still permitting **deterministic multistability** at self-hit thresholds.

## Provenance and Identity Through Time

Each architrino carries a unique **provenance** record tied to its worldline history. That provenance is strictly monotone in $T$: exchanging records is not a mere relabeling but an operation that changes the physical history of the participating entities. Any bookkeeping, conservation statement, or coarse-graining must explicitly state when provenance has been suppressed or when identical-looking exchanges are being treated at the effective level.

Consequently, an exact global flip or permutation of architrinos is not a substrate symmetry unless it preserves the full path-history and causal-wake record. Schematically, if a universe state is written as

$$
\mathbb{U}_{\text{now}}\equiv S(T)
=
\{(\mathbf X_i(T),\mathbf V_i(T),q_i,H_i(T))\}_i
$$

where $H_i(T)$ denotes the path-history and provenance record carried by architrino $i$, then a proposed exchange is exact only when it preserves the instantaneous data and the corresponding $H_i(T)$ records. Generic architrinos are therefore not interchangeable at the ontic level even when finite observers can treat their exposed properties as effectively identical.

For same-polarity exchange and downstream fermionic-statistics claims, the history record must be read jointly, not as a set of independent single-worldline ledgers. A braid can preserve endpoint data while changing the relative framing or linking class of the exchanged worldlines. Exact exchange therefore requires preservation of the joint path-history record, including relative framing, linking, and any protected framed self-linking row such as $Lk=\operatorname{Wr}+\operatorname{Tw}$ when that row is part of the branch certificate. If the joint framed or linking class changes, the exchange is a different substrate branch, not a hidden exact permutation symmetry.

Equivalently, exact exchange acts on connected components of the configuration space of framed worldline strands, not merely on the symmetric group of endpoint labels. A same-polarity permutation is exact only in the identity-component stabilizer of the joint framed-braid data. Provenance leakage is therefore expected whenever an exchange path crosses between components of framed-braid space, even if a finite observer cannot resolve the endpoint-preserving difference.

The architrino-specific identity claim is developed further in [Architrino](architrino.md).

## Geodesics and the Absence of Temporal Dynamics

In $\mathbb{A}\mathbb{A}\mathbb{A}$, time itself has no internal structure or dynamics. It does not encode forces, curvature, or acceleration of any kind.

- **Geodesics of time** are trivial: they are simply the flow $t \mapsto t$ at constant rate.
- All **forces and accelerations** arise from:
  - **Causal wakes** acting within the fixed Euclidean void.
  - **Self-interaction** of extended assemblies, such as the self-hit regime of binaries.

They do **not** arise from any curvature or dynamics of the time coordinate itself.

**Comparison to General Relativity:** In GR, time is part of a dynamical spacetime manifold that curves in response to stress-energy. Here, time is **fixed and non-dynamical**. Any observer-level clock dilation, lapse effect, or effective metric curvature observed in experiments must emerge from assembly dynamics, causal wakes, and Noether sea response within this rigid temporal framework. The comparison does not deny relativistic phenomenology; it assigns that phenomenology to an effective recovery layer rather than to fundamental time.

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

> **Postulate 1 (Absolute Time):** Time is an **absolute, universal, one-dimensional continuum** $\mathbb{R}$, with a fixed orientation (future = increasing $t$) and a dynamical scale anchored by the constant primitive wake speed $c_f$ and the time-translation-invariant master equation. Duration between events is **frame-independent**. The time coordinate is **non-dynamical** and does not encode forces or curvature. All dynamics occur via finite-speed wake propagation ($c_f$) in absolute time, with all interactions via path history; there is no instantaneous action-at-a-distance and no advanced interaction term. Worldlines are parametrized directly by $t$ with no fundamental reparametrization freedom beyond unit choice and origin choice. Any thermodynamic arrow, observer-clock dilation, or relativistic proper-time effect is an emergent property of assemblies, causal wakes, and effective observer reconstruction, not a feature of the background $t$ parameter itself.
