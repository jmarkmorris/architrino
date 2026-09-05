# Emergence of Structure

**Emergence** here means persistent organization formed by [architrino](architrino.md) dynamics — patterns that hold together and last, built from parts that individually do nothing of the sort.

It does not mean that a second kind of substance or law is added on top. That is the point of the word, and also the way it most often goes wrong. Saying something "emerges" can be a genuine explanation or a polite way of saying "we don't know yet," and this chapter exists partly to keep the two apart.

Three claims, at three levels:

- **Substrate:** architrinos move in absolute time through the [Euclidean void](euclidean-void.md) and interact through [wakes](architrino.md) — the expanding records each one leaves as it moves.
- **Effective:** repeated delayed interactions can settle into assemblies, branch records, and coarse variables useful at observer scales.
- **Inferential:** once a preparation and a measure are declared, unresolved branch selection can be assigned weights — without treating those weights as randomness built into the world.

So the chapter is about how order can be *real* without being *primitive*. Architrinos supply the inventory, the wake law supplies the motion, and assemblies appear only after histories are constrained, repeated, and coarse-grained. Nothing mystical is added. The hard part is proving which delayed histories become stable enough to deserve higher-level names.

## Conway's Game of Life: A Discrete Touchstone

Conway's Game of Life is a useful first picture and a misleading second one.

It is a zero-player cellular automaton: cells live on a two-dimensional grid, every cell updates simultaneously at discrete ticks, and each cell's next state depends only on its immediate neighbours. From those rules a surprising world appears:

- **Still lifes:** configurations that never change.
- **Oscillators:** patterns repeating with a fixed period.
- **Spaceships**, such as the glider: patterns that travel across the grid.

The lesson that carries over is narrow: simple deterministic rules can generate stable forms, periodic behavior, and moving patterns, with none of those written into the rules.

The dynamics do not carry over at all. Life is grid-based, memoryless, nearest-neighbour, and updated synchronously at discrete ticks. Architrino dynamics instead uses continuous space, absolute time, delayed path history, and no nearest-neighbour cutoff; over an unbounded history its causal reach can be unbounded. It has a shared substrate time but no global discrete update rule. Pushing the analogy past the first lesson does damage.

What does survive is a structural map. A still life is the analogue of an equilibrium, an oscillator of a periodic orbit, and a glider of a travelling branch.

In dynamical-systems language these are three different invariant patterns: a fixed point, a periodic orbit, and — for the glider — a **relative periodic orbit** that closes only after applying a spatial translation. Rotation number is a separate invariant for suitable circle maps; it is not what makes an ordinary periodic orbit periodic. In the frame moving with the glider, the relative periodic orbit appears stationary or periodic; in the fixed frame, each recurrence carries a displacement.

In $\mathbb{A}\mathbb{A}\mathbb{A}$, architrinos move in continuous space and absolute time. A receiver responds when wake surfaces emitted in the past meet its current event, so interactions are not synchronized by a discrete tick. Each contribution depends on the transmitter's sampled past state and the receiver's current state; integrated playback and branch selection may depend on the retained histories. The effective evolution is a nonlinear delay-differential system with formally unlimited range, not a rule table.

## Emergence in Continuous Delay Dynamics

The closer analogy is a population of coupled oscillators with delayed feedback — systems where phase-lagged coupling produces synchronization, competing basins, and persistent coherent structures. These are guides to the right mental model, not substitutes for the master equation. Structure forms through continuous delayed feedback and basin selection.

- **Absolute time and Euclidean void.** No grid and no time steps. Interactions occur whenever an architrino crosses an expanding wake surface.
- **Delayed roots.** Active terms depend on past transmitter positions and, in self-hit regimes, on the architrino's own earlier path. Evaluating the next motion needs history, not just the present state.
- **Unlimited range, with convergence to be earned.** Wake surfaces are not nearest-neighbour links. Contributions fall as $1/r^2$, so distant structure can contribute in principle. But inverse-square falloff alone does *not* make an infinite three-dimensional sum converge, for a reason worth carrying: a shell at radius $r$ contains sources growing as $r^2$, which exactly cancels the falloff. A valid branch must declare the cancellation, screening, horizon, or subtraction that makes its sum well-defined.
- **Emergent assemblies.** The dynamical target is that delayed interactions admit stable or metastable configurations called **assemblies**. An assembly is not a new primitive; it is a retained branch structure of the delay dynamics, comparable to a synchronized oscillator cluster or a soliton. The existence and persistence of each physical assembly class must be derived or measured, and it becomes an attractor basin only where the reduced flow has the contraction and flux accounting stated below.

Stability here is dynamic rather than static. An assembly is not held together by definition or by one instantaneous acceleration balance. The claim that it persists is established only when its delayed return record remains on an admissible branch with the required stability margin, energy and boundary ledger, shielding, and provenance closure. The physical trajectory may persist before those facts are known, but the corpus may not grade it as stable on that basis. It can dissolve, branch, or reconfigure when the corresponding dynamical conditions fail.

That makes a demonstrated persistence claim a finite-window statement. For a declared observation window $W$ and surrounding context $c$, a branch is certified as persistent only while its history stays in an admitted neighbourhood and its causal-root, shielding, and provenance conditions continue to close. Failure of a diagnostic suspends the certificate; an actual branch transition or departure from the neighbourhood establishes reconfiguration or dissolution. A coarse label may survive either event and cannot decide between them.

## Context as Constraint on Basin Selection

Higher-level context does not add a rival law or substance. It is lower-level physical state summarized as an environment, acting through the same wake dynamics while constraining which histories and branch charts are available.

For a regularized chart, fix a regulator $\eta>0$, a memory horizon $h$, and a record window $W=[0,T]$. Let $\mathcal{H}_{\eta,h}$ be the space of admissible path histories, $\Phi_t^c$ the delayed flow under context $c$, $\Pi_L$ the map exposing lower-level data, and $\Gamma_{\mathrm{adm}}(c)$ the branch charts the surrounding context admits. The context-restricted history set is

$$
\mathcal K_c
=
\{\,\phi\in\mathcal H_{\eta,h}\mid
G_\alpha(\Pi_L\phi(0),c)=0\ \text{for all}\ \alpha,
\ \exists\gamma\in\Gamma_{\mathrm{adm}}(c):\phi\in\mathcal H_\gamma\,\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-dec5af64b60d25c8)

reading as: the histories that satisfy every constraint $G_\alpha$ imposed by the context, and that live in at least one branch chart the context allows.

The native state is $\mathsf Z=(\mathbf X,\mathbf V)$, and the constrained flow is still the same lower-level dynamics:

$$
\frac{d\mathsf Z}{dT}=F_L(\mathsf Z_T),\qquad \mathsf Z_T\in \mathcal K_c
$$

[View →](../../../../equation-mapping.html#corpus-equation-a22147c2836f6f9e)

where $\mathsf Z_T(\theta)=\mathsf Z(T+\theta)$ is the stretch of history the delayed equation needs. The constraints restrict which histories are available; they are not causes acting from outside.

### Context changes are wall-crossings

The load-bearing object is the map from context to admitted charts, $c\mapsto\Gamma_{\mathrm{adm}}(c)$.

Picture the space of possible contexts as divided into regions. Across most of it, small changes in context change nothing about which branches are available. But there are surfaces where a branch chart opens, closes, or changes character — and crossing one changes the available physics discontinuously.

A context change that turns an impossible branch into a possible one is such a crossing, not a second causal law. That places context changes in the same geometric family as root folds and basin separatrices: a discrete label changes only when the retained chart crosses a singular surface.

### Basin weights

Once the admissible histories and a measure source are fixed, branch weights can be defined. Let $\Pi_{\mathrm{br}}$ read the realized branch at the end of the window. The basin for branch $k$ is

$$
B_k^W(c)
=
\{\phi\in\mathcal K_c\mid \Pi_{\mathrm{br}}\Phi_T^c(\phi)=k,\ \Phi_s^c(\phi)\in\mathcal K_c\ \text{for }0\le s\le T\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-b767f484238c02b2)

the histories that end on branch $k$ and stay admissible throughout.

The measure $\mu_c$ must come from a declared preparation, return section, coarse-graining, or medium occupation rule. **It is not a probability assigned after the outcome.** For the formula below, require $\mu_c$ to be normalized on the admissible history set, $\mu_c(\mathcal K_c)=1$. With it fixed, the branch weight is

$$
P_c(k)=\mu_c(B_k^W(c))
$$

[View →](../../../../equation-mapping.html#corpus-equation-b765c7f1fa3ef956)

the fraction of admissible histories landing on branch $k$.

This is only the foundation-level form, and the gap between it and quantum probability is large. It becomes a recovery of the Born rule — the established rule that outcome probabilities are $|\psi_k|^2$ — only after a measurement chart supplies an apparatus kernel, a record map, interference bookkeeping, and a proof that the *same* declared measure reproduces those frequencies across measurement contexts. Critically, the measure may not be changed between predicting outcome statistics, predicting interference, and computing thermodynamic cost. That burden belongs to [Wavefunction Ontology](../quantum/wavefunction-ontology.md) and [Quantum Operator Mapping](../philosophy-history/theory-bridges/quantum-operator-mapping.md#statistical-measure-and-the-born-rule-emergence).

### The partition has to be clean

For weights to support inference, the basins must partition the space sensibly:

$$
\mu_c(\partial B_k^W(c))=0,
\qquad
\mu_c\!\left(\mathcal K_c\setminus\bigcup_k B_k^W(c)\right)\le\varepsilon_{\text{esc}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-b685ad66e70ea708)

the boundaries carry no weight, and almost nothing escapes classification.

This is an admissibility **target**, not an automatic property, and delayed feedback is exactly where it can fail. Basin boundaries in state-dependent delay systems may be fractal. A **riddled basin** is stronger: every neighborhood of a point in one basin contains positive-measure points belonging to another. Where such intermingling defeats stable classification under the declared preparation measure, the displayed weights are not yet robust branch probabilities.

The remedy is a regularity condition analogous to the root transversality floor. On the declared return section, each boundary between neighbouring basins should be a clean surface outside a negligible set:

$$
S_{k\ell}(\phi)=0,
\qquad
\|DS_{k\ell}(\phi)\|_\ast \ge \kappa_{\mathrm{sep}} > 0
$$

[View →](../../../../equation-mapping.html#corpus-equation-ca01df3e59b9e366)

a separator function vanishing on the boundary, with gradient bounded away from zero so the boundary is a genuine surface rather than a smear. Without such a row, or an equivalent proof, $P_c(k)$ is a diagnostic volume rather than a branch-weight law.

Smoothness of each separator is still not enough in an infinite-dimensional delay system, because infinitely many smooth sheets can pile up. So a valid chart also needs local finiteness: on every compact region $K$ of the return section,

$$
\#\{(k,\ell,n):\{S_{k\ell}^{(n)}=0\}\cap K\ne\varnothing\}<\infty
$$

[View →](../../../../equation-mapping.html#corpus-equation-77791d0694746ea9)

only finitely many separator sheets meet it, with $n$ indexing the multiple sheets a delayed return map can create between the same pair of branches. This excludes one countable-sheet accumulation mechanism for a pathological boundary — the basin analogue of excluding accumulating cusps in a root chart — but it does not by itself rule out every possible riddled-basin mechanism.

Changing context can shift the weights by moving boundaries, suppressing branches, or opening self-hit channels, while the ontology remains the same worldlines and wakes throughout.

## Context Changes and Energy Ledger

A change in context is not free relabeling. Something physical must have changed, and it must be paid for.

If the surroundings change from $c$ to $c'$, the emergence claim is admissible only when the altered constraints change the accessible basins *and* the change is accounted for in the same energy and provenance bookkeeping used everywhere else.

A clean opening criterion is

$$
\mu_c(B_k^W(c))=0,
\qquad
\mu_{c'}(B_k^W(c'))>0
$$

[View →](../../../../equation-mapping.html#corpus-equation-e26dabf6f02bd8bf)

a branch with no admissible histories before, and some after. The reverse records closure; intermediate changes record reshaping.

A physical transition must be representable as a replayable event

$$
\mathsf e=(\mathsf Z,I_{\mathsf e},Y_{\mathsf e})
$$

[View →](../../../../equation-mapping.html#corpus-equation-d3df431c5011bc64)

with local state and history $\mathsf Z$, the finite set of selected channels $I_{\mathsf e}$, and $Y_{\mathsf e}$ listing what came out: outgoing assemblies, radiation, recoil, medium updates, remnants, and provenance records.

### The energy row, and what it still owes

The row below is a **closure template**, not an established law, and the distinction matters because the honest status is easy to lose.

Time-translation invariance of a delay equation does not by itself hand you a conserved energy the way it does for an ordinary one. A compatible route is an action-boundary or work-integral construction, because it can use the same delayed history rows that generate the acceleration. A local potential reconstruction is equivalent only once its crosswalk is stated, and a boundary-flux account is admissible only once the branch supplies a convergence law such as the [Receiver-Centered Exhaustion Lemma](absolute-timespace.md#receiver-centered-exhaustion-lemma).

When it closes, $E_{\text{wake}}$ should be read as the conserved charge of the delayed action under time translation — not as an energy density sitting on one time slice. For memory depth $h$ it is a functional of the retained history segment

$$
\mathsf Z_T\in C([-h,0],\mathcal Z)
$$

[View →](../../../../equation-mapping.html#corpus-equation-70098b9d537b12f5)

a continuous history taking values in the native state space $\mathcal Z$, rather than a value at one instant, with boundary terms built from the same kernel that supplies the acceleration. In simulation, the object to discretize is that functional over the window, not a pointwise Hamiltonian introduced independently.

$$
\Delta_E(\mathsf e)
=
\Delta
\left(
K_{\mathrm{mech}}
+
E_{\text{wake}}
+
E_{\mathrm{sea}}
\right)_{\mathrm{retained}}
+
\sum_{\beta\in Y_{\mathsf e}}\Delta E_\beta
-
W_{\partial\Omega}
=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-f5c52ce08e9ae48d)

Everything must balance: the change in what is kept inside — motion bookkeeping, wake energy, medium energy — plus everything exported, minus work done across the boundary, sums to zero. Here $K_{\mathrm{mech}}$ is a declared motion-bookkeeping functional for retained architrino degrees of freedom, not a primitive $m\|\mathbf V\|^2/2$ term; `retained` marks what stays inside the account, and $W_{\partial\Omega}$ is boundary work counted positive when done on the subsystem.

The **no-double-counting rule** is explicit. A medium update inside retained $E_{\mathrm{sea}}$ must not also appear as an outgoing row, and one exported outside belongs in $Y_{\mathsf e}$ rather than in retained energy. A local potential reconstruction may replace $E_{\text{wake}}$ as an equivalent account; it must not be added alongside as a second store. Radiation, recoil, products, remnant excitation, and unresolved medium updates must be named in $Y_{\mathsf e}$ and closed through [Reaction Ledger and Channel Closure](../validation/reaction-ledger.md) — never hidden inside the word "emergence." A new branch becomes available because constraints changed, not because a law was added.

The ledger also separates full-history conservation from reduced assembly behavior. A retained branch can be contractive while the complete particle-plus-wake ledger is conserved — but that combination is established only when one calculation balances retained mechanical change against wake energy, medium energy, outgoing channels, and boundary work on the same window. A partner-only positive-work diagnostic does not establish it; it identifies a contribution the complete calculation must account for.

## Assembly Theory and Recursion

Assemblies are recursive dynamical organizations, not new primitives. A larger assembly is a higher-level pattern built from lower-level branch records that still have to close.

- **Base case:** the **orbiting binary**, an electrino paired with a positrino — the first bound assembly candidate, once its two-body stability certificate is supplied.
- **Recursive step:** more complex assemblies described through constituent sub-assemblies, indexed shielding, separated radii and frequencies, and the root ledgers keeping the combined motion closed.

So many candidate forms can be decomposed into simpler binary components — *provided* the branch supplies the required closure, shielding, and provenance. The decomposition is physical only if the lower ledgers actually explain the higher persistence.

Assembly-index language from origin-of-life research is a useful comparison rather than a new layer. It asks for a shortest construction path once reusable sub-assemblies are allowed; Sharma and collaborators give the contemporary formulation in [*Assembly theory explains and quantifies selection and evolution* (2023)](https://doi.org/10.1038/s41586-023-06600-9). The native requirement is stricter: a path counts only when the retained reaction history preserves branch identity, energy closure, shielding, and provenance across the window. Two histories can end with the same coarse label without being equivalent, and only the ledger settles it. "Abiotic selection" here means a branch forms and persists under the relevant constraints — it imports no biological reproduction or agency.

### Shielding is a target, not an assumption

The phrase "progressively stronger shielding" is a theorem target. Adding a layer can reduce external reactivity, leave it unchanged, or expose a new resonance, and assuming the first would be assuming the conclusion.

A useful monotone on a declared window is

$$
\Sigma_{\mathrm{shield}}(A;W)
=
\frac{\Phi_{\mathrm{int}}^{\mathrm{root}}(A;W)}
{\Phi_{\mathrm{ext}}^{\mathrm{root}}(A;W)+\varepsilon_{\mathrm{reg}}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d1cc7aa3a12e1317)

where $\Phi_{\mathrm{int}}^{\mathrm{root}}$ and $\Phi_{\mathrm{ext}}^{\mathrm{root}}$ are nonnegative integrated magnitudes of admitted root contributions on the same window and in the same units, and $\varepsilon_{\mathrm{reg}}>0$ has those units and keeps the ratio finite when exposure is small. A well-shielded assembly has a large internal-to-exposed ratio under that declared measure.

A candidate estimator for external exposure is the lowest surviving polarity-weighted moment of the configuration: arrangements whose low-order moments cancel expose less at distance, which is the hypothesis developed for the six-architrino [Accessory Configuration](../noether-braid/braid-mathematics.md#accessory-configuration). A capture step is shielding-improving only if external reactivity actually falls, with the internal account fixed or separately controlled and the energy and provenance ledger still closing. Where monotonicity fails, the result is a side branch or an over-reactive intermediate, not a rung on the main ladder.

## Bottom-Up Structural Ladder

The recursive picture reads as a construction ladder. It is a map of *claim levels*, not a proof that every branch is derived.

Its discipline is strict: **a higher rung cannot be more closed than the weakest rung it depends on.** If a fermion or composite-matter claim rests on an unclosed binary or braid branch, it inherits that branch's status until the supporting certificate closes. This is what stops a chain of plausible steps from adding up to an unearned conclusion.

1. **Ontological background** — *postulate*. Absolute time and the Euclidean void provide the arena.
2. **Primitive transceivers** — *primitive definition*. Individual architrinos.
3. **First bound assembly** — *branch-certificate target*. A stable orbiting electrino:positrino binary, once certified.
4. **Noether braid candidates** — *analytical construction target*. Three neutral binaries in prescribed coordinate classes, with two-component circular configurations carrying six neutral binaries in one twelve-worldline record. Current instruments evaluate declared geometry on prescribed records; they do not evolve or certify a branch. Shielding must be computed from the complete record, never inferred from radius order or family membership.
5. **Noether braid stabilization** — *closure target*. A retained neutral six-architrino branch is the required shielded scaffold; see [Noether Braid](../noether-braid/noether-braid.md). Its persistence must close through delayed phase return, energy separation, and reduced external reactivity. The [scoped anti-damping results](../noether-braid/braid-mathematics.md#scoped-anti-damping-results) record several chart-specific positive-work obstructions, while the [equal-geometry return-response analysis](../noether-braid/coordinate-axis-six-point-symmetry-and-return-response.md#isolated-release-and-the-return-response-question) isolates the corresponding phase-compensation question. These are analytically related constraints, not independent validation of an evolved branch. They require any persistent braid to close a compensating channel — internal exchange, same-transmitter transitions, or medium response — rather than relying on static acceleration balance.
6. **Fermions with axial layers** — *working map*. A retained braid plus a six-site axial layer is the candidate architecture for charged fermions and quark families. Generation and shielding-tier maps must be derived from the retained ledger, not assigned by family. Pro/anti orientation tracks handedness within one architecture rather than a separate substance. Neutrino and near-photon branches need their own closures.
7. **Collective medium** — *effective collective-state target*. Balanced populations of neutral braids organize into the [Noether sea](../spacetime/noether-sea.md), which is a collective state of braids rather than a second substrate.
8. **Bosonic channels** — *channel-specific routing targets*. Propagating coupled disturbances appear as effective bosonic channels, and the channels are **not** interchangeable: photons through the coaxial contra-rotating pair branch, weak carriers through massive corridor maps, gluonic links through color-sector reconfiguration. These belong to the interaction branch, not a separate species; see [Gauge Structure Emergence](../assemblies/gauge-structure-emergence.md).
9. **Composite matter and reactions** — *effective summary after lower closure*. Nucleons, atoms, and larger structures from coupling already-formed assemblies. A reaction is reorganization of conserved constituents, not creation from nothing.

The ladder prevents category drift. Fermions, bosonic channels, and observer-level spacetime are not separate species added by hand. They are organizational levels of the same dynamics.

## Emergence Claim Discipline

When this corpus says something "emerges," the claim must identify four things. These keep the word from becoming shorthand for an unpaid debt:

1. **Mechanism** — how the effect arises from lower-level dynamics.
2. **Mapping** — which lower-level configurations correspond to the emergent object.
3. **Regime** — where the description is expected to hold.
4. **Breakdown** — what changes outside it.

For example, Lorentz-like behavior is an emergence claim only when the text names the deformation law for moving assemblies, the clock-period renormalization, the medium response, and the coefficient or theorem that would suppress preferred-frame leakage — plus the regime where it holds and the conditions where it fails.

This makes every emergence claim auditable, and requires the prose to say whether the mechanism is derived, simulated, conjectural, or merely routed.

The ladder should also not be read as a single stack after braids appear. Three branches open at once:

- **Matter branch:** braids with axial layers are candidate maps to fermions and then composites.
- **Medium branch:** dense balanced populations are the proposed carrier of the Noether sea.
- **Interaction branch:** phase-locked disturbances and exchange corridors are candidate maps to effective bosonic behavior.

The theory does not place a photon, a fermion axial layer, and the medium on the same explanatory rung. They are different organizations of the same ingredients.

## Emergent Measures and Stability Markers

The most useful observer-level quantities appear only after assemblies form. They are not primitives waiting underneath.

- **Angular momentum** — *derivation target*. Mechanism: organized binary circulation and ordered orientation. Mapping: through return-period phase and the angular-momentum ledger. Regime: stable closed cycles. Breakdown: separator crossings, ledger changes, dissociation.
- **Chirality** — *derivation target*. Mechanism: ordered-frame precession plus a deformation-stable topological row such as the framed self-linking $Lk(\gamma,\gamma^{\mathrm{fr}})=\operatorname{Wr}(\gamma)+\operatorname{Tw}(\gamma,\gamma^{\mathrm{fr}})$, splitting total linking into coiling in space and rotation of the frame. Regime: branch-preserving deformation with no collisions and a nonsingular frame. Breakdown: a root bifurcation, reconnection, collision-floor loss, or frame slip changing the class.
- **Apparent mass and reactivity** — *effective summary with a closure burden*. Mechanism: a closed internal history ledger, shielding, and medium response. Mapping: through internal energy, shielding exposure, and the medium channel. Regime: stable assemblies in a declared medium context. Dissipative drag is a separate failure channel, not the default mass mechanism.

Emergence is therefore not just a catalogue of larger objects. It is the level at which familiar physical descriptors can become well-defined after their maps and regimes close.

## The Dynamics of Structure and Asymmetry

At the substrate level, structure is carried by **dynamical geometry**. Each architrino receives the causal-root contributions that actually meet it and, where same-transmitter roots exist, contributions from its own past emissions. This is a delayed many-body problem with no finite-range cutoff in the canonical model; whether a particular branch admits a closed form is a mathematical question rather than a foundation postulate.

Because wake density falls as $1/r^2$, nearby coherent roots weigh more than distant ones. That supports effective locality only once the branch supplies convergence control, because — as above — a radial layer contains $O(r^2\,dr)$ sources, exactly cancelling the falloff.

An admissible many-source branch must satisfy the [Receiver-Centered Exhaustion Lemma](absolute-timespace.md#receiver-centered-exhaustion-lemma), making

$$
\lim_{R\to\infty}
\sum_{\substack{j,\ T_t\in\mathcal{C}_{ij}(T_r)\\
\|\mathbf X_j(T_t)-\mathbf X_i(T_r)\|<R}}
\mathbf A_{ij}(T_r;T_t)
$$

[View →](../../../../equation-mapping.html#corpus-equation-856c9b4a5873bdd3)

exist under a declared summation prescription: add up contributions within distance $R$, let $R$ grow, and require a limit. Acceptable mechanisms include local neutrality, angular cancellation, shielding, a screened kernel, a finite horizon, or a declared subtraction. Without one, the sum is not defined.

For the weak homogeneous case, the lemma derives the $O(n^{-2})$ shell-variance target from local neutrality and vector mixing. Almost-sure and mean-square convergence additionally require the stated martingale-difference shell hypothesis, or another declared cross-shell convergence theorem. That is the foothold the medium construction consumes; coherent, inhomogeneous, strong-field, or poorly screened branches keep a separate burden.

This convergence discipline makes the acceleration sum well-defined; it does not by itself make an assembly metastable. Persistence additionally requires a retained return or stability certificate, an energy and boundary ledger, shielding, and provenance closure.

So the unbounded-history statement does not mean every past wake carries equal weight. An architrino receives the contributions whose supports intersect it. A declared branch may control the remote sum through dilution together with phase cancellation, screening, a finite active horizon, or demonstrated shielding; none follows automatically from the kernel. The task is identifying which branches remain dynamically active — not inferring shielding from a label, nor treating the entire past universe as an undifferentiated influence.

### Self-hit is not a speed test

Self-hit occurs when the same-transmitter root set is nonempty:

$$
\mathcal{C}_{ii}(T_r)
=
\{\,T_t<T_r:\|\mathbf X_i(T_r)-\mathbf X_i(T_t)\|=c_f(T_r-T_t)\,\}
\ne
\varnothing
$$

[View →](../../../../equation-mapping.html#corpus-equation-883656d7fdb85db5)

the architrino now sits exactly on a surface it emitted earlier.

If its speed stays below $c_f$ by any margin $\delta_v>0$ throughout $[T_t,T_r]$, no self-hit is possible on that interval, because

$$
\|\mathbf X_i(T_r)-\mathbf X_i(T_t)\|
\le
\int_{T_t}^{T_r}\|\mathbf V_i(U)\|\,dU
<
c_f(T_r-T_t)
$$

[View →](../../../../equation-mapping.html#corpus-equation-bc9b501879794569)

The chord distance cannot exceed the integrated speed, and if speed stays under $c_f$ throughout the stated interval then the architrino cannot meet its own surface on that interval. If the bound persists for all later times, the exclusion persists as well.

So reaching $c_f$ somewhere in the history is **necessary** for a nontrivial self-hit — but not **sufficient**. Curvature, acceleration, and branch geometry decide whether the worldline actually meets its own surface. The onset condition is root existence plus transversality, never the scalar inequality alone. Onset governs whether a root exists; an admitted contribution additionally carries the transmitter-side weight.

That creates a **threshold asymmetry**. A small acceleration from crossing a wake can push an architrino into a chart where same-transmitter roots become admissible, or where the transversality floor fails. The transistor comparison is pedagogical only — a small input changing which channel conducts. The mechanism here is delayed root selection, not electronics.

The common pattern is a discrete label changing at a regularity boundary, but the codimension must be proved for each map. Generic same-transmitter root onset is a codimension-one fold. A context opening is codimension one only when one regular scalar wall function defines it, and a basin boundary is a regular hypersurface only under the separator assumptions above. More complicated rank losses, cusps, or riddled basins can have different local structure.

Emergence is therefore not merely "larger patterns appear." It is the formation and reorganization of persistent branches across stratified geometry.

## Provenance within Emergence

Emergence does not erase identity. Architrinos cannot be created or destroyed and each follows a unique path, so they keep their provenance even inside a complex assembly. An assembly is collective behavior, not a new entity.

That has a practical consequence for reaction language. Reaction, association, dissociation, reconfiguration, and channels historically called decay are all **provenance-preserving rearrangements** of constituents in a complicated environment. The local region may be hard to resolve, but the ontology says worldlines and provenance records are redirected, rebound, screened, or released — never created from nothing.

Complete-state bookkeeping could in principle track every architrino's distinct path as it associates, dissociates, reconfigures, and continues. That is a claim about what the ontology contains, not about what any observer could reconstruct.
