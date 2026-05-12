# Bell's Theorem: Traditional Derivation and Architrino Assembly Architecture Response

This document presents the standard derivation and physical content of Bell's theorem, then states how the Architrino Assembly Architecture ($\mathbb{A}\mathbb{A}\mathbb{A}$) should approach the experimentally observed violations of Bell inequalities. It is a bridge document, not the final mechanism. The final account must be rebuilt from the architrino-level angular-momentum and spin ledger developed in [Angular Momentum and Spin](./angular-momentum-and-spin.md).

The phrase "hidden variable" is inherited from the Bell literature. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the relevant variables are not hidden from nature. They are unresolved by the observer-level quantum abstraction. The task is therefore not to defend a vague hidden-variable category, but to identify the exact architrino, Noether-core, causal-wake, and measurement-apparatus variables whose coarse description becomes quantum spin statistics.

---

## Traditional Statement of Bell's Theorem

### The EPR Argument (Precursor)

Einstein, Podolsky, and Rosen (1935) argued from two premises:

- **Realism**: If, without disturbing a system, the outcome of a measurement can be predicted with certainty, there exists an element of physical reality corresponding to that outcome.
- **Locality**: No action performed on one system can instantaneously affect a distant system.

Applied to a pair of particles with perfectly anti-correlated spins, EPR concluded that both spin components must possess simultaneous definite values (predetermined by hidden variables $\lambda$), and that quantum mechanics, which assigns no such values, is therefore incomplete.

The quantum formalist response (Bohr) rejected the premise that unmeasured observables possess definite values. The debate remained philosophical until Bell (1964) converted it into a quantitative, experimentally testable constraint.

### Bell's Derivation

Consider a source that produces pairs of particles sent to two distant detectors. Detector $A$ measures along axis $\hat{m}_A$ and records outcome $a = \pm 1$; detector $B$ measures along $\hat{m}_B$ and records $b = \pm 1$.

**Assumption 1 (Realism / Hidden Variables).** There exists a complete specification $\lambda$ (drawn from some space $\Lambda$ with distribution $\rho(\lambda)$) such that the outcomes are deterministic functions:

$$
a = A(\hat{m}_A, \lambda), \quad b = B(\hat{m}_B, \lambda).
$$

**Assumption 2 (Bell Locality).** The outcome at each detector depends only on the local measurement setting and the shared hidden variable, not on the distant setting:

$$
A(\hat{m}_A, \lambda) \text{ is independent of } \hat{m}_B, \quad B(\hat{m}_B, \lambda) \text{ is independent of } \hat{m}_A.
$$

This is the factorizability condition. For stochastic theories it generalizes to:

$$
P(a, b \,|\, \hat{m}_A, \hat{m}_B, \lambda) = P(a \,|\, \hat{m}_A, \lambda)\; P(b \,|\, \hat{m}_B, \lambda).
$$

**Assumption 3 (Measurement Independence).** The hidden variable $\lambda$ is statistically independent of the freely chosen measurement settings:

$$
\rho(\lambda \,|\, \hat{m}_A, \hat{m}_B) = \rho(\lambda).
$$

### The CHSH Inequality

From these three assumptions, Clauser, Horne, Shimony, and Holt (1969) derived the experimentally accessible inequality. Define the correlation function:

$$
E(\hat{m}_A, \hat{m}_B) = \int_\Lambda A(\hat{m}_A, \lambda)\, B(\hat{m}_B, \lambda)\, \rho(\lambda)\, d\lambda.
$$

For any four measurement settings $\hat{m}_A, \hat{m}_A', \hat{m}_B, \hat{m}_B'$, the CHSH combination:

$$
S = E(\hat{m}_A, \hat{m}_B) - E(\hat{m}_A, \hat{m}_B') + E(\hat{m}_A', \hat{m}_B) + E(\hat{m}_A', \hat{m}_B')
$$

satisfies:

$$
|S| \leq 2.
$$

This bound holds for any local, realistic, measurement-independent hidden-variable theory, regardless of the specific form of $A$, $B$, or $\rho$.

### Quantum Mechanical Prediction

For the spin-singlet state $|\Psi^-\rangle = \frac{1}{\sqrt{2}}(|\!\uparrow\downarrow\rangle - |\!\downarrow\uparrow\rangle)$, quantum mechanics predicts:

$$
E_{\text{QM}}(\hat{m}_A, \hat{m}_B) = -\hat{m}_A \cdot \hat{m}_B = -\cos\theta_{AB},
$$

where $\theta_{AB}$ is the angle between the two measurement axes. With the optimal choice of settings ($\theta = \pi/4$ increments), this yields:

$$
|S_{\text{QM}}| = 2\sqrt{2} \approx 2.828,
$$

which violates the CHSH bound. The value $2\sqrt{2}$ is the **Tsirelson bound**, the maximum achievable by any quantum state.

### Experimental Status

Beginning with Freedman and Clauser (1972) and Aspect, Dalibard, and Roger (1982), and culminating in loophole-free tests (Hensen et al. 2015, Giustina et al. 2015, Shalm et al. 2015), experiments consistently observe $|S| > 2$, in agreement with the quantum prediction. The three principal loopholes have been individually and jointly closed:

- **Locality loophole**: measurement settings chosen and outcomes recorded in spacelike-separated regions.
- **Detection loophole**: sufficiently high detection efficiency to rule out biased subsamples.
- **Freedom-of-choice loophole**: settings determined by sources (distant quasars, cosmic photons) causally disconnected from the particle source.

The experimental conclusion is unambiguous: at least one of the three Bell assumptions must fail.

---

## The Logical Structure of the Theorem

Bell's theorem is a **no-go theorem**: it excludes a class of theories, not a specific model. Its logical skeleton is:

$$
\text{(Realism)} \;\wedge\; \text{(Bell Locality)} \;\wedge\; \text{(Measurement Independence)} \;\Rightarrow\; |S| \leq 2.
$$

The contrapositive is:

$$
|S| > 2 \;\Rightarrow\; \neg\text{(Realism)} \;\vee\; \neg\text{(Bell Locality)} \;\vee\; \neg\text{(Measurement Independence)}.
$$

Experiment confirms $|S| > 2$. Therefore at least one assumption is false. The interpretive question is: *which one?*

The major responses in the literature are:

| Response | Assumption Denied | Representative Framework |
|:---|:---|:---|
| Orthodox QM (Copenhagen) | Realism | Standard textbook QM |
| Many-Worlds | Bell Locality (implicitly, via branching) | Everettian QM |
| Pilot-Wave | Bell Locality (explicitly) | de Broglie–Bohm |
| Superdeterminism | Measurement Independence | 't Hooft, some retrocausal models |
| Retrocausal | Bell Locality (via future boundary conditions) | Transactional, two-state-vector |

---

## Architrino Assembly Architecture Placement

### What The Bell Abstraction Can And Cannot Decide

At the Bell-abstraction level, any $\mathbb{A}\mathbb{A}\mathbb{A}$ completion that reproduces the experiments cannot reduce to a local factorizable response model with measurement-independent variables. That is the hard constraint. It does not decide what angular momentum is, what spin is, or how a Noether core responds to a detector. Those questions belong one level lower, in the architrino and causal-wake dynamics.

The current placement is therefore:

- **Realism is retained**: every architrino possesses a definite position $\mathbf{x}_i(t)$, velocity $\mathbf{v}_i(t)$, polarity $q_i$, and path-history ledger at every absolute time $t$. The complete microstate exists independently of observation.

- **Measurement independence is retained**: detector settings are not assumed to be pre-correlated with the source microstate. $\mathbb{A}\mathbb{A}\mathbb{A}$ does not invoke superdeterminism.

- **Bell factorizability is a closure target, not a slogan**: if the completed substrate model is compressed into Bell variables, it must fail the factorized local-response form

$$
P(a, b \,|\, \hat{m}_A, \hat{m}_B, \lambda) \neq P(a \,|\, \hat{m}_A, \lambda)\; P(b \,|\, \hat{m}_B, \lambda),
$$

while still preserving no-signaling. The mechanism for that failure must be derived from the angular-momentum ledger and the detector coupling, not inserted by terminology.

### Why Angular Momentum Must Come First

The non-separability of $\lambda$ requires a precise physical account. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the first object is not an abstract spin label. It is the full angular-momentum ledger of a pair-creation event: architrino positions and velocities, binary frequencies, Noether-core orientations, active causal-root branches, self-action terms, and causal-wake history.

**Creation event.** When a parent assembly fragments into daughters $A$ and $B$ at absolute time $t_0$, the Master Equation and conservation laws jointly constrain the daughter microstates $\Gamma_A(t_0)$ and $\Gamma_B(t_0)$. For a spin-singlet-like event, the observer-level summary is

$$
\mathbf{J}_A+\mathbf{J}_B=\mathbf{0}.
$$

That summary is necessary, but it is not the mechanism. The substrate question is how the total angular-momentum functional is conserved while the daughter Noether cores redistribute action across inner, middle, and outer binaries, including self-action and causal-wake terms. The statement $\mathbf{J}_A=-\mathbf{J}_B$ is only the coarse ledger result of that deeper process.

**Measurement geometry.** When detector $A$ measures along axis $\hat{m}_A$, the apparatus does not read a tiny arrow. It drives the local assembly through a finite-time coupling process whose outcome depends on the full spin ledger: ordered binary-plane geometry, phase, active causal wakes, local Noether-Sea state, and the apparatus potential. The Stern-Gerlach-like scaffold in [Angular Momentum and Spin](./angular-momentum-and-spin.md#stern-gerlach-like-measurement-response) formulates this as apparatus potential-gradient coupling, basin-boundary crossing, angular-momentum exchange, and wake / Noether-Sea recoil. A correct theory must derive how that coupling produces the two observed outcomes called spin-up and spin-down along $\hat{m}_A$.

**Why this is not action at a distance.** No usable signal, energy, or causal wake is allowed to pass from one detector to the other during spacelike-separated measurement. The Bell-level difficulty is therefore not solved by adding a signal. It must be solved by showing that the full pair provenance and each local measurement interaction do not compress into the factorizable local-response model that Bell excludes.

### Reproducing the Quantum Correlation Function

The central quantitative test is whether the $\mathbb{A}\mathbb{A}\mathbb{A}$ hidden-variable structure reproduces the singlet correlation:

$$
E(\hat{m}_A, \hat{m}_B) = -\cos\theta_{AB}.
$$

**Classical-axis failure mode.** Suppose each daughter merely carries an opposite internal angular-momentum direction $\hat{n}$, distributed uniformly over the unit sphere. For a given $\hat{n}$, let detector $A$ return $a=+1$ if $\hat{m}_A\cdot\hat{n}>0$ and $a=-1$ otherwise.

With this deterministic assignment and the constraint $\hat{n}_A = -\hat{n}_B = \hat{n}$, the naive correlation function is:

$$
E_{\text{naive}}(\theta_{AB}) = -1 + \frac{2\theta_{AB}}{\pi},
$$

which is **linear** in $\theta_{AB}$ and does not violate the CHSH bound. This is the well-known failure of all local hidden-variable models with sharp basin boundaries.

This calculation is important because it shows what not to claim. Angular-momentum conservation at creation is not enough if it is reduced to preassigned opposite local axes. Simple smoothing of a local axis response is also not automatically enough; it must be checked against the full correlation function.

The candidate $\mathbb{A}\mathbb{A}\mathbb{A}$ route lies in the finite-time measurement interaction of a full Noether-core ledger rather than in a preassigned spin label. The ingredients to derive are:

1. **Angular-momentum ledger geometry**: the internal spin ledger includes ordered binary-plane geometry, binary frequencies, causal-root branches, and causal-wake angular momentum.

2. **Self-hit memory**: the daughter assembly's response is history-dependent, so the measurement interaction is not a memoryless readout of one vector.

3. **Contextual apparatus coupling**: a detector axis defines a real local interaction geometry, not merely an argument inserted into a probability formula.

4. **Pair provenance**: the two daughter ledgers come from one creation event and may retain relational constraints that are lost when one tries to split the state into two independent local packages.

The quantitative closure target is therefore:

$$
E(\hat{m}_A,\hat{m}_B)
=\sum_{a,b=\pm1}ab\int P(a,b\,|\,\hat{m}_A,\hat{m}_B,\lambda)\rho(\lambda)\,d\lambda
=-\cos\theta_{AB},
$$

with marginal probabilities independent of the distant setting. The local Stern-Gerlach kernels are deterministic basin indicators derived from the architrino-level angular-momentum and measurement-response dynamics, not ready-made spin-projection rules. The remaining Bell-level task is to derive the preparation and pair-provenance measures that make those local kernels reproduce the observed correlation.

**Status:** This derivation is a **target**, not a completed result. The immediate prerequisite is the angular-momentum and spin program: derive how total angular momentum is conserved and redistributed in a changing-frequency Noether core, use the Master-Equation apparatus impulse and record-cycle invariant measure to realize $K_{\pm}^{\text{SG}}$, and then derive the pair-provenance measure for correlated cores. The single-core half-angle basin arithmetic and the external apparatus-term origins are now available in the reduced Stern-Gerlach chart, but this is not yet a Bell-pair correlation proof.

---

## Comparison with Other Hidden-Variable Frameworks

### de Broglie–Bohm (Pilot-Wave) Theory

This is the closest structural relative in the inherited taxonomy. Both $\mathbb{A}\mathbb{A}\mathbb{A}$ and Bohmian mechanics are deterministic and realistic; any successful $\mathbb{A}\mathbb{A}\mathbb{A}$ Bell account will also be nonlocal in Bell's technical sense. Key differences:

| Feature | de Broglie–Bohm | $\mathbb{A}\mathbb{A}\mathbb{A}$ |
|:---|:---|:---|
| Hidden variables | Particle positions in 3D | Full microstate $\Gamma(t)$ (positions, velocities, charges) in 3D |
| Guidance mechanism | Pilot wave $\psi$ on configuration space $\mathbb{R}^{3N}$ | Superposed causal-wake geometry in physical 3D space |
| Ontological economy | Two ontological categories (particles + wave) | One category (architrinos); wake structure is generated by architrinos |
| Nonlocality mechanism | $\psi$ on configuration space couples all particles | To be derived from pair provenance plus measurement-response ledger |
| Spacetime | Minkowski (standard) or absolute time (non-relativistic) | Euclidean void + absolute time (fundamental) |
| Memory | Markovian (given $\psi$) | Non-Markovian (self-hit, path-history dependence) |

In Bohmian mechanics, the pilot wave on $\mathbb{R}^{3N}$ provides nonlocal guidance: the full configuration helps determine the velocity field. In $\mathbb{A}\mathbb{A}\mathbb{A}$, it is premature to say that the entire Bell burden resides only in initial conditions. A pure initial-condition account that compresses into independent local response functions would fall back into the class excluded by Bell. The open task is to determine how the full angular-momentum ledger, pair provenance, and local measurement coupling appear when translated into Bell's variables.

### Superdeterminism

Superdeterministic models deny measurement independence: the detector settings and the hidden variables share a common cause in the remote past, eliminating genuine free choice. $\mathbb{A}\mathbb{A}\mathbb{A}$ explicitly rejects this route. The creation event that sets $\lambda$ is causally disconnected from the apparatus settings (which can be determined by distant quasars or quantum random-number generators). Measurement independence is a structural feature of the theory, not an approximation.

### Retrocausal Models

Retrocausal interpretations allow influences from future measurement settings to propagate backward in time to the source, effectively setting $\lambda$ in response to $\hat{m}_A$ and $\hat{m}_B$. $\mathbb{A}\mathbb{A}\mathbb{A}$'s absolute-time ontology categorically forbids backward-in-$t$ causation. All causal influences propagate forward in absolute time at or below $c_f$. The correlations in $\lambda$ are forward-causal consequences of the creation event, established before any measurement setting is chosen.

---

## The Role of Absolute Time

The existence of a global time parameter $t$ is essential for the internal consistency of the $\mathbb{A}\mathbb{A}\mathbb{A}$ account of Bell violations.

**Problem in relativistic frameworks.** In Minkowski spacetime, spacelike-separated measurements have no invariant temporal ordering. Telling a story about "what happens first" requires selecting a frame, and different frames give different orderings. This makes it conceptually difficult to describe how pre-established correlations are "read out" without invoking some form of action at a distance.

**Resolution via absolute time.** In $\mathbb{A}\mathbb{A}\mathbb{A}$, the temporal ordering of all events is objective. Measurements at $A$ and $B$ occur at definite absolute times $t_A$ and $t_B$, with $t_A < t_B$, $t_A = t_B$, or $t_A > t_B$ as an objective fact. In all three cases the account is the same:

1. At $t_0 < \min(t_A, t_B)$: the creation event establishes $\lambda$.
2. At each measurement time: the local apparatus drives the local assembly across a basin boundary. The outcome is determined by $\lambda$ and the local setting.
3. After both measurements: comparison of results (via sub-$c_f$ classical communication) reveals the correlations.

No step may involve faster-than-$c_f$ signal transfer. The correlations are visible only upon comparison. The objective temporal ordering removes one frame-dependence puzzle, but it does not by itself solve Bell's theorem. The missing work is the lower-level derivation of the spin ledger and measurement-response kernel.

**Emergent Lorentz invariance.** Physical Observers, who lack access to absolute time and use assembly-based clocks and rulers, reconstruct an effective Minkowski geometry in which the temporal ordering of spacelike-separated events is frame-dependent. This does not contradict the underlying absolute ordering; it reflects the epistemic limitations of assembly-based measurement; see [Observer Framework](../spacetime/observer-framework.md).

---

## Observables, Falsifiability, and Failure Modes

**Closure target:** $\mathbb{A}\mathbb{A}\mathbb{A}$ must reproduce all experimentally observed Bell inequality violations from architrino-level angular-momentum and measurement-response dynamics, without superluminal signaling or denial of measurement independence.

**Assumptions:**
- The full microstate $\Gamma(t)$ is definite at all $t$ (realism).
- Conservation constraints at creation establish a joint pair ledger, but the detailed angular-momentum distribution must be derived.
- Measurement is local threshold resolution (no distant causal input at measurement time).
- Measurement independence holds (no superdeterminism, no retrocausation).
- The measurement-response kernel of a Noether-core assembly interacting with an apparatus is a deterministic basin indicator, not a primitive $\cos^2(\alpha/2)$ rule. The single-core half-angle law is now computed in the reduced Stern-Gerlach chart; the Master-Equation burden is to derive the effective spinor coordinate and verify that the branch-sum apparatus impulse and record-cycle invariant measure realize that chart.

**Required recoveries:**
- All standard Bell-CHSH violations are reproduced: $|S| = 2\sqrt{2}$ for singlet pairs with optimal settings.
- No violation of the Tsirelson bound: $|S| \leq 2\sqrt{2}$. Observing $|S| > 2\sqrt{2}$ would falsify both QM and any $\mathbb{A}\mathbb{A}\mathbb{A}$ model that reproduces QM.
- No-signaling is exact: no measurement protocol on $A$ can alter the marginal statistics at $B$.
- Decoherence rates for entangled pairs depend on local Noether-Sea density, providing an environmental sensitivity absent in bare QM (shared prediction with [Entanglement and Nonlocality](./entanglement-nonlocality.md)).

**Failure Modes:**
- If the Master Equation dynamics for a tri-binary measurement interaction yield a response function that is **not** $\cos^2(\alpha/2)$—for instance, a linear or piecewise-linear function—the resulting $E(\theta_{AB})$ will disagree with the quantum prediction and with experiment. This is a falsification of the specific mechanism, requiring revision of the measurement model or the assembly-apparatus coupling.
- If simulations of correlated pair creation under the Master Equation produce a hidden-variable distribution $\rho(\lambda)$ that is **separable** (factorizes into independent local distributions), the theory reduces to a local hidden-variable model and cannot violate the CHSH bound. This would be a fundamental failure requiring revision of the creation-event dynamics or the conservation-law implementation.
- If any experiment demonstrates genuine **signaling** via entanglement (information transfer at $B$ contingent on the setting choice at $A$, without a classical channel), the entire framework fails.
- If measurement independence is empirically falsified (e.g., via cosmic Bell tests showing setting–source correlations at a level incompatible with statistical noise), the assumption structure changes for all interpretations, not only $\mathbb{A}\mathbb{A}\mathbb{A}$.

**Next Steps:**
- Derive the total angular-momentum functional for a Noether core with changing inner, middle, and outer binary frequencies, including self-action and causal-wake terms.
- Evaluate the Master-Equation branch-sum apparatus impulse, separatrix normal, and record-cycle invariant measure for a tri-binary assembly driven by a Stern-Gerlach-like apparatus potential gradient.
- Simulate a minimal fragmentation event (parent tri-binary $\to$ two daughters) and extract the joint pair ledger, not merely a pair of opposite classical axes.
- Compute $E(\theta_{AB})$ from the derived response kernel and hidden-variable distribution; compare against $-\cos\theta_{AB}$ and evaluate $|S|$.
- If $|S| < 2\sqrt{2}$, identify the source of the deficit (response-function shape, distribution non-uniformity, or residual separability) and determine whether refinement of the measurement model or the creation dynamics can close the gap.
