# Absolute Time

In $\mathbb{A}\mathbb{A}\mathbb{A}$ there is one universal ordering parameter, written $T$. It supplies a common duration scale everywhere, but it is not a physical clock and no apparatus reads it directly.

This chapter says what $T$ is, how it orders events, how the [wakes](architrino.md) that carry every interaction use it, and why the time a physical clock displays is a *derived* quantity rather than a second fundamental one.

That last distinction is the one to hold onto, because it is where almost every objection to absolute time comes from. Established relativity predicts and experiments confirm that moving clocks accumulate less proper time, and that inertial observers can assign opposite time order to spacelike-separated events. $\mathbb{A}\mathbb{A}\mathbb{A}$ accepts those observer-level targets but assigns their explanation to clock, ruler, signal, and medium dynamics. Deriving that recovery is an obligation; it is not supplied by postulating $T$.

The companion chapter [Absolute Time Defense](absolute-time-defense.md) argues the case. This chapter does the more basic job of stating the structure the later dynamics use.

Keep three uses of the word "time" separate throughout. **Absolute time** is the substrate ordering parameter. **Causal-wake timing** is how that ordering becomes active in interactions. **Clock time** is a physical readout extracted from something that cycles repeatably. The spacetime chapters later compare those readouts against relativistic proper time; they never add a second fundamental clock.

## Core Concept

Absolute time is one universal ordering parameter: **one-dimensional, continuous, and oriented**, advancing uniformly and independently of space, matter, energy, or any process. In the substrate ontology it is **non-dynamical** — it does not curve, dilate, accelerate, or respond to anything.

Physical clocks are a different kind of object. A clock is an assembly with repeatable internal cycles. It can run fast or slow as an assembly does, and its cycles are compared against the absolute parameter. They do not generate it.

### What "uniformly" is actually claiming

The word **uniformly** needs care, because on a bare line it means almost nothing.

Before any units or laws are declared, an oriented time line admits relabelings $T\mapsto aT+b$ with $a>0$ — stretch the scale, shift the origin. Nothing about the line itself distinguishes one such labeling from another, so "advances uniformly" would be empty.

The dynamics do the fixing. The origin $b$ stays conventional, but the scale $a$ is pinned once three things are declared: the wake speed $c_f$ is constant in the void's rest frame, every worldline uses the same $T$, and the master equation keeps its form.

So rescaling $T$ is a change of units involving $T_0$, $L_0$, $c_f$, and the coupling normalizations together. It is not a second freedom to choose how fast time flows.

The stronger statement is that *nonlinear* reclockings are excluded outright. A smooth relabeling $T\mapsto\phi(T)$ that is not affine would make propagation speed and derivative factors vary with time, which the constancy of $c_f$ forbids. So the group of all smooth orientation-preserving relabelings is not a symmetry here; only the affine ones are.

The [constant-time emission measure](architrino.md#constant-time-emission-measure-postulate) gives a compatible second condition on the same parameter. Because emission is uniform in $T$ with motion-independent amplitude, a nonlinear reclocking would make the emission density acquire a time-varying factor. The wake-speed postulate and emission measure therefore select the same affine class, but they are coordinated parts of one model rather than independent evidence for it.

After the scale is fixed, only translation by $b$ remains. The background time line is therefore a set with a global orientation and duration scale but **no marked origin** — a torsor, or principal homogeneous space, for $(\mathbb{R},+)$. Differences and temporal order are defined, but no instant is intrinsically labeled zero. That makes the conventional status of $T=0$ precise without weakening the absolute ordering.

## Time Implementation Ladder

Ordinary language uses "time" for several different things, and $\mathbb{A}\mathbb{A}\mathbb{A}$ separates them deliberately.

**1. Substrate ordering.** Absolute time $T$ orders universe states. No physical clock reads it directly, it has no natural origin, and its scale is fixed only once the wake law and unit convention are declared.

**2. Causal-wake implementation.** Worldlines and their emissions make that ordering physically operative. A transmitter event at emission time $T_t$ contributes at reception time $T_r$ only when the wake has just arrived:

$$
r_{ij}(T_r,T_t)=c_f(T_r-T_t),
$$

[View →](../../../../equation-mapping.html#corpus-equation-079f15c58f4fd603)

where $r_{ij}(T_r,T_t)=\|\mathbf X_i(T_r)-\mathbf X_j(T_t)\|$ is the distance from where the transmitter was to where the receiver is. This is where temporal separation and spatial distance become a single local condition: neither alone determines whether an interaction happens, only the two together.

**3. Assembly clock readout.** Clock time is a phase count. A stable binary or braid supplies repeatable internal cycles, and clock time is the number of those cycles measured against a reference. Writing $\varphi_{\mathcal A}$ for the counted phase and $\Omega_{\mathcal A}^{(0)}$ for the rest-branch reference rate,

$$
d\tau_{\mathcal A}
=
\frac{d\varphi_{\mathcal A}}{\Omega_{\mathcal A}^{(0)}}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-6554a68e5088fcba)

This equation defines the candidate clock readout: divide phase advance by the declared rest-branch rate. It becomes observer proper time only after the clock certificate and universality tests show that different admitted clocks recover the same map. Motion through the void and coupling to the medium can retune the internal cycle, so the readout may change even though $T$ does not.

The ladder keeps the useful intuition that cycles make clocks while preventing cycles from being mistaken for time itself. A moving periodic assembly may trace a helical history in a suitable product of translation and phase coordinates, but that geometry is branch-specific. The ordering parameter is the same line throughout.

It also blocks a second confusion. Absolute simultaneity does not mean an observer can *read* the simultaneous state of the universe. It means there is a fact of the matter about the ordering. What can be reconstructed is limited by clocks, wakes, signal transport, and medium coupling — which is a great deal less.

## Mathematical Description

Time is the real line:

$$
\mathbb{R}
$$

[View →](../../../../equation-mapping.html#corpus-equation-c2b8df32454a4ae6)

and an instant is a point $T\in\mathbb{R}$.

The orientation can equivalently be carried by the **clock 1-form**:

$$
dT
$$

[View →](../../../../equation-mapping.html#corpus-equation-c6696fbaf71b269c)

A 1-form is an object that takes a displacement and returns a number; this one returns elapsed time. It is *closed* and *exact*, which together mean it is the derivative of a genuine global function — there really is a single universal $T$, not merely a local sense of duration that might fail to piece together consistently. Combined with space in the product background $\mathcal{M}=\mathbb{R}\times\mathbb{R}^3$, its level sets are the simultaneity slices.

Notation keeps the levels apart: $\tau$ is reserved for derived proper time, emission times are $T_t$, and causal delay is $\Delta_{ij}=T-T_t$ rather than reusing the proper-time symbol.

The substrate structure is absolute time together with the [Euclidean void](euclidean-void.md), formally [absolute timespace](absolute-timespace.md). Effective spacetime geometry and proper time are later observer-level reconstructions. They are not additional time coordinates.

## Dimensionalization

Equations are usually written without units. Choose a reference timescale $T_0>0$ so that physical time $\hat T$ is

$$
\hat T = T_0 \, T
$$

[View →](../../../../equation-mapping.html#corpus-equation-1bd41191b2ccab82)

with $T$ a pure number. Positions need a matching length scale $L_0>0$:

$$
\hat{\mathbf X}=L_0\mathbf X,
\qquad
\hat T=T_0T,
\qquad
c_f=\frac{\hat c_f T_0}{L_0}
$$

[View →](../../../../equation-mapping.html#corpus-equation-68c0b410d718ed52)

Hatted quantities carry units; unhatted ones are pure numbers. The wake speed becomes a pure number by measuring how many length units the wake crosses per time unit.

With this convention the root condition keeps its form without units,

$$
\|\mathbf X_i(T_r)-\mathbf X_j(T_t)\|
=
c_f(T_r-T_t)
$$

[View →](../../../../equation-mapping.html#corpus-equation-6b9d1a38632179a2)

and with them,

$$
\|\hat{\mathbf X}_i(\hat T_r)-\hat{\mathbf X}_j(\hat T_t)\|
=
\hat c_f(\hat T_r-\hat T_t)
$$

[View →](../../../../equation-mapping.html#corpus-equation-9efbea1f31e04dd6)

The two say the same thing.

Choosing $T_0$ fixes the affine scale for a declared model. Setting $c_f=1$ is the particular convention $L_0/T_0=\hat c_f$ — measuring distance in units the wake crosses in one time unit — which makes the wake speed disappear from the equations. Keeping $c_f$ explicit leaves the physical anchor visible instead.

Symbolic derivations may retain $c_f$ where its dependence matters, but every new numerical instantiation, fixture, simulation, tolerance, and worked example uses $c_f=1$. A legacy artifact recorded at another value must be rerun before it supports a current conclusion.

In short: pick a standard unit of duration — a second, or one maximum-curvature orbit — and measure everything as a pure multiple of it.

## Duration and Linear Advancement

Once the scale is fixed, duration is subtraction:

$$
\Delta T = |T_2 - T_1|
$$

[View →](../../../../equation-mapping.html#corpus-equation-f5d569750586df42)

and in physical units

$$
\Delta \hat T = T_0 \, \Delta T
$$

[View →](../../../../equation-mapping.html#corpus-equation-9cff1d4d836b911c)

This is unchanged by shifting the origin and is one substrate interval for the two events. Different physical clocks or coordinate reconstructions may assign different readouts to paths connecting those events; that is an observer-level dynamical effect. The substrate parameter itself neither speeds up nor slows down.

## Time Orientation and Causal Ordering

The line carries a **global orientation**: future is increasing $T$, past is decreasing $T$.

The instants are **totally ordered** — for any two, exactly one of

$$
T_1 < T_2, \quad T_1 = T_2, \quad \text{or} \quad T_1 > T_2
$$

[View →](../../../../equation-mapping.html#corpus-equation-73a406ffea6fd85b)

holds, with no ambiguity and no observer-dependence. Event A temporally precedes B if and only if $T_A<T_B$.

Causal influence is stricter than temporal precedence, and conflating the two is a common error. A can influence B only when $T_A<T_B$ **and** B lies on the wake support emitted from A. Being earlier is necessary; being on the arriving wake is the additional physical requirement. Most earlier events are causally irrelevant to any given later one.

### The arrow of time

The bare line $\mathbb{R}$ is symmetric under reversal $T\mapsto-T$. The interaction law is not. Wakes contribute only from emission times $T_t<T$, and the theory admits no advanced or instantaneous terms.

So the causal arrow is a feature of the *law*, specifically of which emission times the master equation is allowed to sum over. Thermodynamic, biological, and cosmological arrows are emergent properties built on that oriented dynamics together with initial conditions and the records a finite observer retains.

This differs from time-symmetric direct-action formulations of electrodynamics, in which both past- and future-supported terms may appear and boundary conditions select the realized arrow; Wheeler and Feynman's [absorber formulation](https://doi.org/10.1103/RevModPhys.17.157) is the canonical comparison. Here the delayed-only asymmetry is placed in the substrate law itself.

That choice carries a recovery burden of the same family as preferred-frame leakage. Where an effective equilibrium description requires microscopic reversibility or detailed balance, the theory must derive those approximate relations and state their regime; known time-reversal-violating channels must remain outside that approximation. The derivation is owned by the theory-bridge layer.

The entropy arrow is a finite-window statement rather than a definition of time. A valid entropy claim must declare its preparation measure, its coarse-graining, the observer-accessible window, boundary flux, and any record-change residual. Projection can make a retained entropy increase by discarding path history, boundary wakes, and apparatus information, but monotonic increase still requires a theorem or measurement for the declared dynamics, preparation, coarse-graining, and boundary conditions. The definitions and residual $\mathcal{R}_{\mathcal Q}$ are owned by [Entropy](../dynamics/entropy.md#mapping-out-to-effective-physics). The conclusion needed here is narrow: entropy diagnoses an arrow inside a stated window; it does not supply the ordering parameter.

## Absolute and Universal Nature

The parameter $T$ is absolute and universal:

- Duration $\Delta T$ between two events is one **frame-independent substrate interval**, whether or not an observer can read it directly.
- **No relativity of simultaneity.** Two events with equal $T$ are simultaneous in an objective sense.
- **No kinematic time dilation.** The background parameter is unaffected by motion or by gravitational conditions.

Observed slowing of clocks on moving or bound assemblies is not a change in the background. It is a change in how those assemblies' internal dynamics map onto $T$. Proper time is an inferred readout in the observer sector, not a second substrate time. See [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md).

The contrast with special relativity is sharp and deliberate: simultaneity here is an objective, frame-independent property.

## No Absolute Origin and Completeness

The choice of $T=0$ is arbitrary. The line runs to $T\to-\infty$ and $T\to+\infty$.

As a manifold $\mathbb{R}$ is **connected** with no gaps, **complete** under the duration distance $|T_2-T_1|$ so that no sequence of instants converges to a missing one, and **without endpoints**.

This describes the background used by the fundamental dynamics, and it is not a solved cosmological boundary condition. A particular cosmological solution may occupy all of $\mathbb{R}$ or only a dynamically selected interval. Modeling the time factor as the full line avoids inventing artificial endpoints in the parameter; it does not prove that any realized history lacks an initialization or cutoff.

## Symmetries of Absolute Time

The kinematic symmetry is the additive group

$$
(\mathbb{R}, +)
$$

[View →](../../../../equation-mapping.html#corpus-equation-6ecdce42168d70f9)

of time translations, acting by

$$
T \mapsto T + T_{\mathrm{shift}}, \quad T_{\mathrm{shift}} \in \mathbb{R}
$$

[View →](../../../../equation-mapping.html#corpus-equation-42a6f1d16fa05d72)

expressing that the laws do not care when you start the clock: the same state and history, shifted by a constant, obey the same law.

Smooth nonlinear relabelings are not symmetries. Once the constant wake speed and the receiving law are fixed, a nonlinear reclocking changes the spacing of causal roots and the transmitter- and receiver-side factors. That is a change of physics, not of units.

Time-translation invariance is necessary for the proposed **energy conservation** route, but background symmetry alone is insufficient. Noether's theorem applies to a differentiable action invariant under the translation, and the delayed theory must include and close its history and boundary terms. The background supplies the parameter against which that theorem can be formulated; the complete action must still earn the conserved charge.

At the level of the bare background, time is symmetric under reversal:

$$
T \mapsto -T
$$

[View →](../../../../equation-mapping.html#corpus-equation-ccb6a1eab7aab2a3)

This is a symmetry of the manifold, not automatically of the dynamics. The master equation picks the future by summing only over rows with $T_t<T$. A reflected history would solve a *different*, future-supported law unless the support convention were changed too. The causal orientation therefore lives in the law's support rule, not in curvature, force, or structure of the time background.

## Role of Time in Dynamics

Time is a universal, non-dynamical parameter for all worldlines, wakes, and effective laws. It is the independent variable in every equation of motion, the basis for velocity $d\mathbf X/dT$ and acceleration $d^2\mathbf X/dT^2$, and a passive parameter rather than a participant.

**There is no freedom to choose an alternative fundamental time parameter along a worldline.** There is no proper time at the substrate level; every worldline is parametrized directly by $T$. This is what lets all evolution be tracked against a single clock.

A worldline is a map

$$
\mathbf X: I \subset \mathbb{R} \to \mathbb{R}^3, \quad T \mapsto \mathbf X(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-c985db7235edb3a7)

on an interval $I$, with $T$ strictly increasing.

Worldlines are **graphs over $T$**: one position per instant. Physical evolution is admitted only toward increasing $T$. An auxiliary parameter could retrace the same graph in reverse, but that re-description is not an advanced physical trajectory; a closed or backward segment in substrate time would cease to be a single-valued graph over $T$.

Branching, where it occurs, is **deterministic multistability**: the complete history state selects among admitted branches. An attractor description is reserved for a declared retained subsystem with established contraction and flux accounting. Neither is a splitting of the time parameter.

## Causality and Finite Propagation Speed

Event A can influence B only if $T_B>T_A$ — necessary, not sufficient. All interactions are carried by wakes propagating at the finite speed $c_f$.

The foundation stack keeps the speeds distinct:

| Symbol | Meaning | Status |
| --- | --- | --- |
| $c_f$ | Primitive causal-wake propagation speed relative to the Euclidean void | fundamental |
| $c_\gamma(\mathcal{N}_{\mathrm{sea}},\hat{\mathbf{k}})$ | Photon-channel speed in a medium state and direction | derived |
| $c_{\text{eff}}$ | Effective signal or clock-channel speed for a dressed branch | derived/contextual |
| $c_\star$ | Local comparison speed in a declared clock, ruler, or signal branch | branch-dependent |
| $c_0$ | Measured low-energy invariant light speed in weak homogeneous conditions | empirical calibration target |

None may be identified with another until the regime and derivation are stated.

If transmitter $j$ emits from $\mathbf X_j(T_t)$ and receiver $i$ sits at $\mathbf X_i(T_r)$, the contributing emission times are

$$
\mathcal{C}_{ij}(T_r)
=
\{\,T_t<T_r:\|\mathbf X_i(T_r)-\mathbf X_j(T_t)\|=c_f(T_r-T_t)\,\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-dee62fd344eab043)

every past moment whose expanding wake reaches the receiver exactly now. Only these contribute. Earlier events that miss the condition contribute nothing through this channel — which is most of them.

Equivalently, define

$$
F_{ij}(T_r,T_t)
=
\|\mathbf X_i(T_r)-\mathbf X_j(T_t)\|-c_f(T_r-T_t),
\qquad
T_t<T_r
$$

[View →](../../../../equation-mapping.html#corpus-equation-6cfd6895bac76596)

the gap between how far apart they were and how far the wake has travelled, so that $\mathcal{C}_{ij}(T_r)$ is where it vanishes. The same set covers partner hits when $i\ne j$ and self-hits when $i=j$; no separate self-hit law is needed, which is worth noting because it means self-interaction is not a special case bolted on.

A usable branch chart requires the crossing to be clean:

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

[View →](../../../../equation-mapping.html#corpus-equation-b36170ce274c583a)

where

$$
\mathbf{r}_{ij}(T_r,T_t)=\mathbf X_i(T_r)-\mathbf X_j(T_t),
\qquad
\hat{\mathbf{r}}_{ij}=\frac{\mathbf{r}_{ij}}{\|\mathbf{r}_{ij}\|}
$$

[View →](../../../../equation-mapping.html#corpus-equation-5cbd1d920a3685bc)

Requiring this bounded away from zero requires $F_{ij}$ to cross zero at a definite rate rather than grazing it. Failure marks a caustic-like regime and must be routed to branch-chart or regularization analysis — not treated as an ordinary small perturbation.

For self-hits the shared root function hides extra geometry. When $i=j$, a root means the worldline has re-entered its own expanding wake. In general that is a condition on the curvature, torsion, and return geometry of the path, not a speed test. A segment faster than the wake speed is a warning that self-hit roots may exist, but the accepted branch is still defined by root existence together with the transversality floor and the retained transmitter-side weight.

### What the floor is, and is not

$\kappa_{\mathrm{hit}}$ is not a universal coupling constant and not the regularization width $\eta$. It is a declared positive lower bound for one retained branch chart, certificate, or regularized model, after units, root labels, endpoint convention, and memory window have been fixed. Branch packets may report the same condition as a certified Jacobian floor such as $J_0$ or $\nu_J$. Having a positive floor is part of admissibility; its numerical value belongs to the branch record rather than the universal parameter ledger. It cannot be removed by relabeling.

Generically, losing the floor is a **codimension-one fold** of the root manifold — a failure that one-parameter families can cross. At the fold there is one degenerate double root; crossing the fold creates or destroys a pair of simple roots. So the floor is not just a guard against small denominators. It certifies that the *number* of simple roots and their arrangement are stable on the retained chart; when it fails, the event is a bifurcation or chart transition.

The caustic set for a pair of histories is

$$
\Sigma_{ij}
=
\{(T_r,T_t):F_{ij}(T_r,T_t)=0,\ \partial_{T_t}F_{ij}(T_r,T_t)=0\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-177db29a2a4a5a62)

where the root condition holds and its derivative vanishes simultaneously. On a generic one-parameter branch this is a Whitney fold, the simplest way a smooth family of solutions can turn back on itself. Higher events such as a cusp, where the second derivative also vanishes, are codimension-two — rarer still, and warning that the catalogue of branches is itself changing. In simulation, fold contact is the first alarm that the floor has failed; cusp contact is the stronger one.

This is one instance of a discipline running through the foundations: **non-degeneracy floors turn exact failure sets into graded admissibility certificates.** The root Jacobian floor here, the basin-separatrix floor in [Emergence](emergence-of-structure.md#context-as-constraint-on-basin-selection), and the basis-conditioning floor in [Constructing the Absolute Frame](constructing-the-absolute-frame.md#reconstruction-existence-lemma) all do the same job for different objects. They are margins attached to declared charts, not universal constants.

The interaction law is built entirely from emission times $T_t<T_r$ satisfying the root condition. There are no advanced terms and no instantaneous action at a distance. This delayed-only support is a law-level asymmetry, not an artifact of initial conditions.

That gives the postulate a hard failure wall. **Postulate 1 fails** if any accepted substrate interaction requires support from $T_t>T$, instantaneous coupling across separation, or a clock-rate field entering the receiving law as an independent substrate variable rather than a derived readout. Observer-level proper time, clock dilation, and effective lapse may all be recovered, but none may be promoted into a second fundamental time without replacing the postulate.

## Path History and Non-Markovian Memory

All interactions are mediated by path history. A receiver does not respond to an instantaneous distant object. It responds to the wake surfaces reaching it from prior emissions.

At time $T$, an architrino receives contributions wherever its worldline meets wake surfaces emitted at past times $T_t<T$; through the [Master Equation](../dynamics/master-equation.md) those receptions determine acceleration directly, with no primitive force involved.

This makes the dynamics **non-Markovian** in an instantaneous-state description: the future depends on the retained history required by the admitted root domain rather than on the present state alone. The canonical unbounded-history model may retain roots from arbitrarily early emissions; any finite-memory approximation must declare its cutoff. The same statement includes the self-hit regime, where an architrino interacts with its own past emissions.

Because $T$ is universal, the past is unambiguous, and contributions can be summed over it without needing to say whose past is meant. That is what allows a mechanistic model of interaction without action at a distance, while still permitting deterministic multistability at self-hit thresholds.

## Provenance and Identity Through Time

Each architrino carries a **provenance** record tied to its worldline, strictly monotone in $T$. Exchanging two records is not relabeling; it changes the physical history of the participants. Any bookkeeping, conservation statement, or coarse-graining must say explicitly when provenance has been suppressed.

So an exact permutation of architrinos is not a substrate symmetry unless it preserves the full history record. Writing a universe state as

$$
\mathbb{U}_{\text{now}}\equiv S(T)
=
\{(\mathbf X_i(T),\mathbf V_i(T),q_i,H_i(T))\}_i
$$

[View →](../../../../equation-mapping.html#corpus-equation-791f39811d866128)

with position, velocity, polarity, and history record $H_i(T)$ for each architrino, a proposed exchange is exact only if it preserves both the instantaneous data *and* the histories. Generic architrinos are not interchangeable at the substrate level, even where observers can treat their exposed properties as identical.

For same-polarity exchange and any downstream claim about fermionic statistics, the histories must be read **jointly** rather than as independent single-worldline ledgers. This matters because a braid can preserve every endpoint while changing how the strands wind around each other. Exact exchange therefore requires preserving the joint record, including relative framing, linking, and any protected row such as $Lk=\operatorname{Wr}+\operatorname{Tw}$ when it is part of the branch certificate. If the joint class changes, the exchange is a different branch, not a hidden symmetry.

Equivalently, exact exchange acts on connected components of the configuration space of framed strands, not merely on permutations of endpoint labels. A same-polarity permutation is continuously connected to doing nothing only when an allowed path stays in the same component. Crossing to another component invalidates that continuity argument; whether an observer sees leakage is a separate quantitative question about the projection map.

The identity claim is developed further in [Architrino](architrino.md).

## Geodesics and the Absence of Temporal Dynamics

Time has no internal structure and no dynamics. It encodes no forces, no curvature, no acceleration.

The flow of time is trivial: the parameter advances, and there is no geodesic equation to solve because no metric or connection is declared on the bare line. Every substrate acceleration arises from admitted causal-root contributions, including same-transmitter self-hits of an individual architrino and the combined self- and partner-hit ledgers of assemblies. None arises from curvature or dynamics of the time coordinate.

**Comparison with general relativity.** There, time is part of a dynamical spacetime that curves in response to energy and momentum. Here it is fixed and non-dynamical. Every observed clock dilation, lapse effect, and curvature must emerge from assembly dynamics, wakes, and medium response inside this fixed framework. The comparison does not deny relativistic phenomenology; it assigns it to a recovery layer rather than to fundamental time.

## Distinction from Relativistic Time

| **Feature** | **Absolute Time ($\mathbb{A}\mathbb{A}\mathbb{A}$)** | **Relativistic Time** |
|:---|:---|:---|
| **Manifold** | $\mathbb{R}$ (1D, separate from space) | Part of 4D spacetime with Lorentzian metric |
| **Universality** | Universal ordering parameter and duration scale | Coordinate-time assignments depend on frame; proper time depends on the path |
| **Simultaneity** | Absolute and global | Relative; depends on observer's frame |
| **Duration** | One substrate interval for two events | Coordinate-time separation is frame-dependent; proper time along a fixed worldline is invariant |
| **Dilation** | None at kinematic level | Yes; in flat inertial coordinates, $d\tau = \sqrt{1 - v^2/c^2} \, dt_{\mathrm{eff}}$ |
| **Mixing with Space** | No; time and space strictly separate | Yes; Lorentz boosts mix $t_{\mathrm{eff}}$ and $x_{\mathrm{eff}}^i$ |
| **Causal Structure** | Defined by temporal ordering plus finite propagation speed $c_f$ | Encoded in the metric via lightcones |
| **Background Dynamics** | Non-dynamical | Dynamical; Einstein's equations |

## Summary Postulate

> **Postulate 1 (Absolute Time):** Time is an **absolute, universal, one-dimensional continuum** $\mathbb{R}$, with a fixed orientation (future = increasing $T$) and a dynamical scale anchored by the constant primitive wake speed $c_f$ and the time-translation-invariant master equation. Duration between events is **frame-independent**. The time coordinate is **non-dynamical** and does not encode forces or curvature. All dynamics occur via finite-speed wake propagation ($c_f$) in absolute time, with all interactions via path history; there is no instantaneous action-at-a-distance and no advanced interaction term. Worldlines are parametrized directly by $T$ with no fundamental reparametrization freedom beyond unit choice and origin choice. Any thermodynamic arrow, observer-clock dilation, or relativistic proper-time effect is an emergent property of assemblies, causal wakes, and effective observer reconstruction, not a feature of the background $T$ parameter itself.
