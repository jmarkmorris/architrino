# Absolute Time Defense

This chapter argues why absolute time is the theory's fundamental evolution parameter, and — more importantly — states precisely what would falsify the proposed recovery of observed clock, ruler, and signal behavior from that choice.

One distinction carries the whole argument:

- **Absolute time** $T$ is the variable the [master equation](../dynamics/master-equation.md) evolves in.
- A **simultaneity slice** $\Sigma_T$ is the geometric copy of space at one value of that variable; the complete substrate state $S(T)$ is indexed on it.
- **Proper time** is what a physical clock reads.

The three are routinely conflated, and keeping them apart is necessary for a coherent statement of the theory.

The sequence is layered deliberately. First the ontological claim about absolute time and the [Euclidean void](euclidean-void.md). Then the dynamical claim about how states evolve on slices. Only after those are fixed does proper time appear, along with clock-rate extraction and relativistic inference. This is the argumentative companion to [Ontology](./ontology.md), [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md), and [Lorentz Kinematics](../spacetime/lorentz-kinematics.md).

## The Case for Absolute Time

1. **Fundamental evolution parameter.** $T$ is the unique parameter the master equation evolves in.
2. **Product substrate.** The background is $\mathcal{M}=\mathbb{R}\times\mathbb{R}^3$ with a projection $\pi_T$ reading off the time coordinate.
3. **Unique foliation.** The slice at fixed $T_\ast$ is everything sharing that time:

   $$
   \Sigma_{T_\ast} = \pi_T^{-1}(\{T_\ast\}) = \{T_\ast\}\times \mathbb{R}^3
   $$

   [View →](../../../../equation-mapping.html#corpus-equation-5e84fc71ef931610)

4. **Substrate clock form.** The theory postulates a global function $T$; its differential $dT$ is therefore exact, closed, and nowhere vanishing. Those properties encode the postulate and its foliation consistently, but they do not independently prove that nature supplies such a function.
5. **Derived clock time.** Proper time $\tau$ is not fundamental. It is a functional of a clock assembly's internal phase dynamics.

The list separates what exists from what can be read. Absolute time, the void, and the slices are substrate commitments. Proper time, synchronization, and simultaneity judgments are readouts produced by assemblies embedded in the medium.

So the defense does **not** deny observed clock dilation. It relocates it — from the nature of time to the behavior of clocks.

### The block-universe comparison

Special relativity is usually taken to show there is no global present. That conclusion is correct as far as it goes, and it goes exactly as far as observers.

Absolute time $T$ is fundamental. The complete state $\mathbb{U}_{\text{now}}\equiv S(T)$ is indexed on the slice $\Sigma_T$: it is the full state at one $T$, not a reading available to anyone. What special relativity denies as an invariant observable is a public simultaneity assignment shared by all inertial frames; an observer cannot reconstruct the substrate slice without clocks, rulers, and signal conventions that must themselves pass Lorentz tests.

The obligation this creates is specific rather than philosophical. Every attempt to read the absolute slicing — through matter clocks, photon synchronization, comparison against the cosmic microwave background rest frame, or gravitational channels — must be shown to collapse into an effective Lorentz reconstruction with leakage below declared bounds. Not argued to. Shown.

A cosmological frame such as the microwave background rest frame is a useful effective slicing for data reduction, and it is not absolute time. It supplies a large-scale record only after photon transport, source evolution, and receiver cadence are modeled, and it licenses no exact global present.

## Absolute Time, Global Foliation, and Proper Time

On each slice $\Sigma_T$ the spatial metric is Euclidean, $h_{ij}=\delta_{ij}$, and the state is indexed as $S(T)$. Absolute time is substrate structure, not a coordinate choice.

$\mathbb{U}_{\text{now}}\equiv S(T)$ is not a reconstruction of events. It is the complete state on a slice: positions, velocities, polarities, path histories, and any branch data the delayed dynamics needs. Observers infer a coarse fraction of it.

Because the master equation depends on path history, the state on a slice is not just an instantaneous snapshot:

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

[View →](../../../../equation-mapping.html#corpus-equation-32ba4361fc774e61)

with instantaneous data $X(T)$, the history and provenance ledger $H_T$, the retained medium state, and $\mathcal{B}_T$ recording the dynamically occupied branch and active roots. A numerical regularization may accompany a calculation without becoming part of the physical state. Determinism applies where this complete physical state defines a well-posed initial-history problem.

The branch entry is not analyst bookkeeping smuggled into the ontology. $\mathcal{B}_T$ is real insofar as it records which branch the deterministic history actually occupies and which roots are active. Chart labels and regularization parameters used to represent that state remain descriptive. A different analyst may use different coordinates, but cannot choose a *different occupied branch* without changing the physical state itself.

### Deterministic evolution and branch selection

The delay-differential master equation is deterministic. Where the declared chart makes evolution well posed, a fully specified state — including its history ledger — generates a unique trajectory forward.

Where distinct stable neighbourhoods and their separatrix have been established, apparent branching is **multistability**, not stochasticity: arbitrarily small differences on opposite sides can send trajectories to different outcomes. More generally the honest phrase is branch selection under deterministic flow, never "a distribution of allowed configurations" from one exact state. The stronger term *attractor-basin selection* is reserved for a subsystem whose contraction and exported fluxes have actually been established.

A finite observer may lack the resolution to know which branch is occupied. That ignorance is **inferential**. It does not convert one exact state into many simultaneous futures.

### Proper time for physical observers

Physical clocks are assemblies. Their ticks are internal phase advances, so the definition is phase extraction rather than a fitted scalar:

$$
d\tau_{\mathcal A}
=
\frac{d\varphi_{\mathcal A}}{\Omega_{\mathcal A}^{(0)}},
\qquad
\frac{d\tau_{\mathcal A}}{dt_{\mathrm{eff}}}
=
\frac{
\Omega_{\mathcal A}
\left(
\mathbf{w},
\mathcal{N}_{\mathrm{sea}},
R_{\mathcal A},
H_{\mathcal A}
\right)
}{
\Omega_{\mathcal A}^{(0)}
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-105e00cb4ffec320)

Elapsed clock time is phase advanced divided by the rate at rest, and the rate at which the clock runs relative to effective time is its current rate over its rest rate. The rate depends on velocity relative to the medium, the medium state, the clock's orientation and geometry $R_{\mathcal A}$, and its history $H_{\mathcal A}$. Both rates are phases per unit effective time, so the ratio is a pure number.

Velocity relative to the local medium flow is

$$
w^i_{\mathcal A}
=
\frac{dx^i_{\mathcal A,\mathrm{eff}}}{dt_{\mathrm{eff}}}
-
u^i_{\mathrm{sea,eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-5ab406531d40bca2)

the clock's own velocity minus the medium's. This variable isolates motion through the medium in the proposed clock map; any additional dependence on absolute motion remains part of the preferred-frame residual and cannot be discarded by definition.

### When is something actually a clock?

Phase extraction is not always available, and saying so precisely is what keeps this from being circular.

An assembly can serve as a clock only if it carries a persistent phase. For a periodic branch, a **Poincaré return map** records successive crossings of a transverse section and a stable fixed or periodic point supplies repeatable returns. For a quasiperiodic invariant circle, an orientation-preserving circle map may instead carry a well-defined rotation number. These are distinct clock cases and must not be collapsed into one criterion.

For the invariant-circle case, picture observing a rotating pointer at each return to the section. The circle map records its successive positions, but those positions alone specify neither the complete turns between observations nor the elapsed time. Write the phase in cycles as $\theta\in\mathbb R/\mathbb Z$ and the return map as $P_{\mathcal A}$. A **lift** $\tilde P_{\mathcal A}$ keeps the phase on the real line and satisfies $\tilde P_{\mathcal A}(x+1)=\tilde P_{\mathcal A}(x)+1$. The continuous physical phase selects the lift that counts the actual complete turns. In expressions involving that lift, $\theta$ denotes a chosen real representative of the initial circle phase.

The **rotation number** records the mean advance per return, reduced modulo one cycle:

$$
\rho_{\mathcal A}
=
\lim_{n\to\infty}
\frac{\tilde P_{\mathcal A}^{\,n}(\theta)-\theta}{n}
\quad \mathrm{mod}\ 1
$$

[View →](../../../../equation-mapping.html#corpus-equation-21cce4f28c680633)

The numerator counts the phase advance over $n$ returns. Dividing by $n$ gives cycles per return; reducing modulo one discards whole turns from that mean. Adding a complete turn between every pair of observations leaves the circle map unchanged, so its rotation number alone does not recover the physical turn count.

The real hypothesis in that case is invertibility. When the return map restricted to an invariant circle is an orientation-preserving homeomorphism, the limit exists and does not depend on where one starts. If the circle map is non-invertible, a rotation set rather than one rotation number may be required. A periodic clock does not need this circle-map construction: its phase is defined by repeatable return along its periodic orbit.

Frequency also needs the time between returns. Let $\delta t_{\mathcal A}(\theta)>0$ be the elapsed effective time $t_{\mathrm{eff}}$ until the next return from phase $\theta$, and write $\theta_k=P_{\mathcal A}^{\,k}(\theta)$ for the successive circle phases. The mean frequency is the total physical phase advance divided by the total elapsed effective time:

$$
\overline\nu_{\mathcal A}
=\lim_{n\to\infty}
\frac{\tilde P_{\mathcal A}^{\,n}(\theta)-\theta}
{\sum_{k=0}^{n-1}\delta t_{\mathcal A}(\theta_k)},
\qquad
\overline\Omega_{\mathcal A}=2\pi\overline\nu_{\mathcal A}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-bec62a39745a7416)

Here $\overline\nu_{\mathcal A}$ is measured in cycles per effective-time unit and $\overline\Omega_{\mathcal A}$ is the mean angular phase rate. If the real mean advance per return converges and the mean return duration converges to a finite positive value, this ratio exists and equals the quotient of those two limits. A frequency shared across the branch also requires the quotient to be independent of the initial phase. Doubling all return durations leaves the circle map unchanged and halves the frequency. Rates per substrate time $T$ require the corresponding time conversion; they cannot be identified with rates per $t_{\mathrm{eff}}$ by notation alone.

The delayed trajectory supplies the physical turn counts and return times when these can be extracted consistently. A unique mean frequency alone does not establish small timing fluctuations or a positive instantaneous phase rate. Those remain part of phase coherence. For a periodic orbit with one counted phase cycle per period, the frequency is the reciprocal of that period in the declared time parameter.

So the clock-validity domain has at least two controlled cases: a stable periodic orbit with repeatable return, or a normally stable invariant circle with coherent phase, physical turn counts, and controlled return times. There the phase can be chosen continuously and its rate is a candidate observable.

If a moving or dressed branch loses every admissible phase structure — through destruction of a periodic orbit, breakup of an invariant circle, loss of circle-map invertibility, or collapse of transverse stability — then **proper time is undefined for that branch.** A transition from periodic to quasiperiodic motion is not automatically a failure; it is a failure only when no unique, stable phase functional survives.

### The clock certificate

In the braid clock class this is the observer-side use of the [candidate and certified braid](../noether-braid/noether-braid-configuration-space.md#candidate-and-certified-braids) distinction. For a periodic branch, a physical clock is a record that returns under the delayed map, up to genuine symmetries only, with a positive transverse Floquet margin. Its phase is the coordinate along that periodic orbit:

$$
\mathcal R_{\mathrm{cert}}(\mathcal A)
\le
\epsilon_{\mathrm{cert}},
\qquad
\Delta_{\mathrm{Floquet}}^{\perp}(\mathcal A)>0.
$$

[View →](../../../../equation-mapping.html#corpus-equation-860738cb635545d8)

the return residual is small, and the **Floquet** margin for transverse perturbations of the periodic orbit is strictly positive. An invariant-circle clock requires the corresponding normal-hyperbolicity and phase-coherence certificate rather than this periodic-orbit Floquet row.

The positive transverse-margin condition is **open**: a stable phase-locked cycle with strictly positive margin survives sufficiently small perturbations of its dressing and record. A certificate also needs strict slack below the chosen return-residual ceiling; a record sitting exactly on that ceiling has no such robustness guarantee.

The certificate establishes transverse persistence on the retained branch. It does **not** prove contraction of the complete history flow, and the word *attracting* applies only after a reduced subsystem includes the wake, medium, and memory-boundary fluxes crossing its boundary and proves contraction with those included.

Clock repeatability requires a reproducible phase evolution with the relevant delayed history and exchanges accounted for. An additional condition enters when a branch is represented by an [effective Hamiltonian](../dynamics/effective-lagrangian.md): its evolution must preserve the symplectic structure, the oriented-area structure on pairs of state variations. For a delayed branch, the proposed structure includes a memory correction. Its candidate boundary balance over one return is

$$
\oint_{\mathrm{return}}
\omega_{\mathrm{mem},\partial[-h,0]}
=
O(\epsilon_{\omega}).
$$

[View →](../../../../equation-mapping.html#corpus-equation-13b3921c2e458f6a)

Here $h$ is the retained history duration, $[-h,0]$ is the interval of history ages, and $\omega_{\mathrm{mem},\partial[-h,0]}$ denotes the proposed boundary contribution to the transported memory-corrected symplectic structure. Its kernel, boundary identity, evaluation over a return, and norm and scale for the error $\epsilon_\omega$ require an explicit construction. These remain open conditions for this Hamiltonian representation; the displayed balance is not an established equivalent of the clock certificate.

A defect in this proposed symplectic balance does not by itself establish clock-rate drift. The phase calculation must determine whether omitted history or physical exchanges change the rate, introduce timing errors, or destroy the repeatable phase. Failure of a reduced Hamiltonian description alone does not disqualify a branch as a clock, and a repeatable phase alone does not establish Hamiltonian validity. An externally maintained clock requires the driving and exported fluxes to be included in the same repeatability account.

### The medium state

The full local medium record is

$$
\mathcal{N}_{\mathrm{sea}}
=
\left(
\rho_{\text{NS}},
n,
u^i_{\text{sea}},
Q^{\text{sea}}_{ij},
\sigma^{\text{sea}}_{ij},
\nabla\rho_{\text{NS}},
\ldots
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-60bfdf3c6a2e0b4e)

density, normalized Noether braid density $n$, flow, orientation, stress, gradients, and more. The single scalar $\chi_{\text{sea}}\equiv c_f/c_{\text{eff}}$ is only a delay factor for one declared channel, not the state.

A broad expression $d\tau=F(\cdots)dt_{\mathrm{eff}}$ may summarize things once a channel is declared, but the closure target is the extracted phase functional. Proper time is not a free scalar assigned independently of the dynamics.

The integral form is

$$
\tau(t_{\mathrm{eff},1})-\tau(t_{\mathrm{eff},0})=\int_{t_{\mathrm{eff},0}}^{t_{\mathrm{eff},1}}\frac{\omega_{\text{clk}}(t_{\mathrm{eff}})}{\omega_0}\,dt_{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d21e5fbcfc3a642b)

accumulating the rate ratio over the interval. What hides inside the rate is the local root ledger, the relevant history, and the same medium variables the metric handoff uses.

## Clock Universality: The Hard Part

Defining proper time this way avoids assigning it arbitrarily. It does **not** prove relativity-compatible behavior, and the gap is where the defense is genuinely exposed.

The requirement is stronger: every admitted low-energy clock and ruler in a tested comparison class must reduce to the *same* observer-level map. For each assembly,

$$
A_{\mathcal A}
=
A+\delta A_{\mathcal A},
\qquad
B_{ij}^{(\mathcal A)}
=
B_{ij}+\delta B_{ij}^{(\mathcal A)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e9e0a48dfe4c1487)

a common clock function and ruler tensor plus a small assembly-specific remainder. The universality residual is

$$
\epsilon_{\mathrm{univ}}
\equiv
\sup_{\mathcal A,\mathcal B}
\max\left(
\left|
\frac{A_{\mathcal A}}{A_{\mathcal B}}-1
\right|,
\frac{
\left\|
B^{(\mathcal A)}-B^{(\mathcal B)}
\right\|
}{
\left\|
B^{(\mathcal B)}
\right\|
}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-bce23479e117f7c9)

the worst fractional disagreement between any two clocks or rulers in the class. It must fall below the relevant experimental ceiling.

The proposed mechanism is **common origin**: atomic, nuclear, and mechanical clocks are all architrino assemblies solved from the same wake law, the same root grammar, and the same medium state. The program asks whether a moving branch deforms their cycles, periods, and scales *together*, rather than assigning each a Lorentz factor by fiat. Common origin alone does not guarantee that result.

### Route one: connected moduli

Let $\mathfrak M_{\mathrm{clk}}$ be the space of admitted clock and ruler branches — their **moduli**, the parameter space of all such configurations — and let $\Phi_\lambda$ be the medium dressing flow acting on it.

If every admitted clock lies in one connected piece of that space, and the dressing generator preserves the topological labels carried by the root ledger and framing, a useful local obstruction is the failure of two operations to commute:

$$
\mathcal K_{\mathrm{dress,br}}
\equiv
\sup_{\mathcal A\in\mathfrak M_{\mathrm{clk}}}
\left\|
[D_{\mathrm{dress}},D_{\mathrm{br}}]_{\mathcal A}
\right\|
$$

[View →](../../../../equation-mapping.html#corpus-equation-31a569f78e0dfb28)

The commutator compares dressing then moving along the branch with moving then dressing. Its vanishing is an infinitesimal path-independence condition, not a universality theorem. A theorem also needs agreement at a reference branch, regular transport over paths of controlled length, and trivial or quantitatively bounded holonomy around closed paths, together with chart-error control. Only after those ingredients are supplied may $\epsilon_{\mathrm{univ}}$ be bounded by the corresponding reference, commutator, holonomy, and chart terms.

This is not yet a proof. It is the topological route by which one dressing map could move every clock together.

### Route two: spectral separation

Common ingredients are not sufficient, and this is the subtler requirement.

Let $\Delta_{\mathrm{sea,gap}}>0$ be the lowest frequency gap between the shared long-wavelength medium sector and any *other* collective sector that couples to clocks, and let $\omega_{\mathrm{test}}$ be the highest frequency in the comparison. Single-sector reduction requires

$$
\frac{\omega_{\mathrm{test}}}{\Delta_{\mathrm{sea,gap}}}
\ll
1
$$

[View →](../../../../equation-mapping.html#corpus-equation-a393148bda4b7213)

the experiment must probe far below any competing response. If a controlled low-frequency reduction has been proved for those sectors, then

$$
\epsilon_{\mathrm{univ}}
\le
\epsilon_{\mathrm{intra}}
+
\epsilon_{\mathrm{mix}}(r),
\qquad
 r=\frac{\omega_{\mathrm{test}}}{\Delta_{\mathrm{sea,gap}}},
\qquad
\lim_{r\to0}\epsilon_{\mathrm{mix}}(r)=0,
$$

[View →](../../../../equation-mapping.html#corpus-equation-3bdffce6e2e36133)

with $\epsilon_{\mathrm{intra}}$ the transport, holonomy, and chart remainder, and $\epsilon_{\mathrm{mix}}(r)$ the contamination from other sectors, required by the reduction theorem to vanish as the frequency ratio $r$ does.

This is conditional, not automatic. **A second gapless sector with a species-dependent coupling sets the gap to zero and defeats this route entirely** — different clocks would then sample different responses with nothing suppressing the difference.

Common microscopic ingredients are not enough. The tested clocks and rulers must share one low-frequency medium response, while every competing response either decouples or sits above the tested band.

This is the clock-side analogue of the mass-map universality residual in [Energy](../dynamics/energy.md#emergent-inertia-mass-from-shielded-energy). Both can be expressed as transport problems over branch space. They are controlled by the same holonomy only after one shared connection or dressing transport has been derived for both clock/ruler and inertial-response functionals. Disconnected sectors remove the continuous-path argument, but do not by themselves prove a nonzero residual: separate sectors could still map to the same effective coefficients.

### The dressing caveat

The common-origin argument works only after the dressing map descends to a shared channel. If one apparatus samples one dressed channel and another samples a different one without a common reduction, the mismatch is not hidden by the definition of $\tau$. It appears as a residual and must be carried as pressure on the Lorentz-closure program.

Clock universality is therefore one component of the common-limit closure in [Lorentz Kinematics](../spacetime/lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure), not a standalone definition.

## The Lorentz-Closure Target

For a declared clock branch:

$$
\frac{d\tau_{\mathcal A}}{dt_{\mathrm{eff}}}
=
A(\mathcal{N}_{\mathrm{sea}})
\sqrt{
1-
\frac{
B_{ij}(\mathcal{N}_{\mathrm{sea}})w^iw^j
}{
A^2(\mathcal{N}_{\mathrm{sea}})c_0^2
}
}
\left[
1
+
\Delta_{\mathcal A}^{\mathrm{ori}}
+
\Delta_{\mathcal A}^{\mathrm{comp}}
+
\Delta_{\mathcal A}^{\mathrm{PF}}
+
O(w^4/c_0^4)
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-3f62541724b9b224)

The square root is the required relativistic target ansatz for the declared branch. It is derived only when the assembly and medium calculation produces this form and closes the residuals. The bracket collects three residuals — orientation leakage, composition dependence, and preferred-frame leakage — which must be bounded by experiment rather than absorbed into the constitutive function.

For $A>0$, the clock path lies in the timelike domain $B_{ij}w^iw^j<A^2c_0^2$, where the metric handoff below assigns positive squared elapsed clock time. Dividing that quadratic form by $dt_{\mathrm{eff}}^2$ gives $(d\tau/dt_{\mathrm{eff}})^2=A^2-B_{ij}w^iw^j/c_0^2$ before the declared residual corrections. Factoring $A^2$ out of its positive square root produces the velocity denominator $A^2c_0^2$ in the clock target. This algebraic agreement is required for a common clock and metric description; its derivation from assembly dynamics remains the recovery obligation.

The clock's orientation response must be calculated from its delayed dynamics and medium coupling. A candidate statistic of the framed trajectory bundle is the framing quadrupole:

$$
Q_{\mathcal A}^{ij}
=
\left\langle
\hat n^i\hat n^j
-
\frac{1}{3}h^{ij}
\right\rangle_{\mathcal A}^{\mathrm{frame}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-985e981bcb83865e)

where the framing directions are unit vectors and the average is normalized so that $\langle1\rangle_{\mathcal A}^{\mathrm{frame}}=1$. A branch calculation must specify the direction extraction, retained history interval, and weighting prescription before comparing clocks or response channels. Subtracting the isotropic part makes this statistic trace-free. Its vanishing removes its quadrupolar preferred-axis moment, but does not exclude higher directional moments, phase relations, or other relevant history information. A conditional ansatz for the clock's leading directional response is

$$
\Delta_{\mathcal A}^{\mathrm{ori}}(\hat{\mathbf n})
=
\lambda_{\mathcal A}
Q_{\mathcal A}^{ij}
\left(
\hat n_i\hat n_j
-
\frac{1}{3}h_{ij}
\right)
+
O_{\ell\ge4}
$$

[View →](../../../../equation-mapping.html#corpus-equation-b77dc16ee840f76f)

where $\hat{\mathbf n}$ now denotes the probe direction and $\lambda_{\mathcal A}$ is the proposed scalar response gain. The term $O_{\ell\ge4}$ denotes spherical-harmonic multipoles of degree four and above, not fourth order in a small angle. This even-multipole expansion assumes the observable is reciprocal under $\hat{\mathbf n}\mapsto-\hat{\mathbf n}$; without that symmetry, odd multipoles must be retained too. The ansatz additionally requires the clock's quadrupolar response to be proportional to this particular framing statistic. Matching tensor type does not establish that proportionality.

The response calculation must derive the dependence on $Q_{\mathcal A}$ and the gain $\lambda_{\mathcal A}$ from the counted phase rate. A leading-order approximation needs a declared expansion parameter and bounds on omitted contributions across its branch regime and probe orientations. The harmonic-degree label alone supplies no such bound, and small $Q_{\mathcal A}$ controls neither higher moments nor an unbounded response gain. The same physical history must account for the matter and clock channels, but the sufficiency of this statistic for both remains unestablished. Information discarded by the framing average must be retained in the response description whenever its effect cannot be bounded within the declared approximation.

For braid candidates, [Noether Braid Configuration Space](../noether-braid/noether-braid-configuration-space.md#frame-orthogonality-and-framing-anisotropy) supplies the geometric order parameter. The target is sharper than near-orthogonality: driving the plane parameter to unity suppresses the non-orthogonal part of the framing quadrupole, while making the whole tensor small also needs near-degenerate spectral weights, shielding, or averaging in the same extraction. These geometric conditions constrain the statistic. Their implications for clock orientation, matter anisotropy, mass anisotropy, and Lorentz period anisotropy require the respective response derivations and bounds on omitted information; they do not follow from small framing quadrupole alone.

### The composition channel is where this is most exposed

The residual budget is not symmetric, and it is worth saying which way it leans.

$\Delta_{\mathcal A}^{\mathrm{comp}}$ can survive even when every clock has an internally consistent phase definition, if two species sample inequivalent dressed channels. The common-channel reduction must prove that atomic, nuclear, mechanical, and material assemblies descend to the same functions — or carry the mismatch as a failed row. Once that holds, the other two residuals become branch-geometry and drift terms bounded by the tests below.

Connected branch space offers a transport route for comparing species: if a certificate-preserving path exists, its holonomy bounds the mismatch. If every path crosses a phase-lock jump, fold-sector change, frame wall, or memory-boundary failure, that route is unavailable. Disconnectedness alone does not impose a positive **topological floor**, because separate components may still export identical clock functions. The residual is irreducible only after the component-wise maps are computed and shown to disagree.

### Equivalence-principle residual

Differential free-fall is a separate observer-level test. For two assemblies falling toward a source:

$$
\eta_{AB}^{S}
=
\frac{2(a_A^S-a_B^S)}{a_A^S+a_B^S}
$$

[View →](../../../../equation-mapping.html#corpus-equation-6527952b172a86b7)

the fractional difference in their accelerations, zero when composition does not matter. This is the **Eötvös ratio**. The MICROSCOPE final result for titanium and platinum was $\eta(\mathrm{Ti},\mathrm{Pt})=[-1.5\pm2.3\,(\mathrm{stat})\pm1.5\,(\mathrm{syst})]\times10^{-15}$ at one standard deviation; see Touboul and collaborators, [*MICROSCOPE Mission: Final Results of the Test of the Equivalence Principle* (2022)](https://doi.org/10.1103/PhysRevLett.129.121102).

That benchmark applies to free fall, **not** to the clock composition residual. The two may be linked only after a formal cross-map derives both the gravitational response and the clock and ruler maps from the same record. Treating one bound as covering the other would be exactly the shortcut this chapter exists to prevent.

### The ceilings

These are experimental requirements and bookkeeping ceilings, not amplitudes the framework predicts:

| Residual | Meaning | Required low-energy ceiling | Framework-predicted scale |
| --- | --- | --- | --- |
| $\Delta_{\mathcal A}^{\mathrm{ori}}$ | Orientation leakage in clock/ruler response | channel-specific; the cited Nagel resonator result reaches the $10^{-18}$ scale | Must be computed from branch-chart, hierarchy, dressing, and regularization residuals; no value is predicted by the phase definition alone. |
| $\Delta_{\mathcal A}^{\mathrm{comp}}$ | Composition dependence across atomic, nuclear, mechanical, or material assemblies | bounded by the declared composition-sensitive clock-comparison row for the selected species and channel; no universal equivalence-principle ceiling is assigned | Must descend from a common $A$ and $B_{ij}$ after dressing; channel-dependent maps contribute directly. |
| $\eta_{AB}^{S}$ | Composition-dependent differential acceleration toward source $S$ | bounded by the declared instrument and material pair; MICROSCOPE supplies a $10^{-15}$-class platinum/titanium benchmark | Must descend from the effective gravitational and inertial response maps. Constrains the composition residual only after the cross-map above is derived. |
| $\Delta_{\mathcal A}^{\mathrm{PF}}$ | Preferred-frame leakage into observables | projected into the two-way anisotropy and PPN rows below unless a sharper bound is declared | Must be traced to named branch-chart, drift, or dressing terms rather than fitted as a nuisance. |

For the resonator benchmark, Nagel and collaborators reported an orientation-dependent relative frequency change of $(9.2\pm10.7)\times10^{-19}$ at 95% confidence in [*Direct terrestrial test of Lorentz symmetry in electrodynamics to $10^{-18}$* (2015)](https://doi.org/10.1038/ncomms9174). Clock and matter limits are channel- and species-dependent; the [Data Tables for Lorentz and CPT Violation](https://arxiv.org/abs/0801.0287) should be used to select the coefficient actually exported by a proposed map.

### Required emergent limits

**Speed convention.** $c_f$ is the primitive wake speed inside delayed-root equations. Observer-level limits use the declared channel speed $c_\star$, equal to the dressed effective speed for clocks and rulers, with $c_0$ the measured low-energy calibration in the weak homogeneous limit. The claim that a dressing flow approaches $c_0$ is a closure target, not the definition of $c_0$. Set $c_\star=c_f$ only for a primitive chart, or after deriving that a specific cycle is governed by the undressed speed.

Homogeneous medium, low velocities:

$$
\frac{d\tau_{\mathcal A}}{dt_{\mathrm{eff}}} \approx \sqrt{1 - \|\mathbf{w}\|^2/c_\star^2},
\qquad c_\star=c_0 \text{ in the weak homogeneous observer branch}
$$

[View →](../../../../equation-mapping.html#corpus-equation-03a877c70273e6a2)

In the medium-rest branch the flow vanishes, so velocity relative to the medium is just velocity.

Weak field, low velocities, after the clock-channel potential is matched to the Newtonian benchmark:

$$
\Phi_{\text{eff}}=\Phi_N+O(\Phi_N^2/c_0^2),
\qquad
\frac{d\tau_{\mathcal A}}{dt_{\mathrm{eff}}} \approx \sqrt{1 + 2\Phi_{\text{eff}}/c_0^2 - \|\mathbf{w}\|^2/c_0^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-53bfef88e39b1d25)

with $\Phi_N$ the conventional negative Newtonian potential. If a positive convention is used instead, set

$$
\Phi_N=-U_N
$$

[View →](../../../../equation-mapping.html#corpus-equation-56e423932ee52960)

so the first-order expansion reads

$$
\frac{d\tau_{\mathcal A}}{dt_{\mathrm{eff}}}
\approx
1+\frac{\Phi_N}{c_0^2}
-\frac{\|\mathbf{w}\|^2}{2c_0^2}
=
1-\frac{U_N}{c_0^2}
-\frac{\|\mathbf{w}\|^2}{2c_0^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-06d0e5181bfb5d54)

which is the required first-order observer benchmark: clocks run slower deeper in a gravitational well and when moving. The displayed expansion states the target after matching; the $\mathbb{A}\mathbb{A}\mathbb{A}$ recovery is complete only when the same assembly and medium record derives it.

### Speed convention table

| Symbol | Meaning | Status |
| --- | --- | --- |
| $c_f$ | Primitive causal-wake propagation speed relative to the Euclidean void | fundamental |
| $c_\gamma(\mathcal{N}_{\mathrm{sea}},\hat{\mathbf{k}})$ | Photon-channel speed in a medium state and direction | derived |
| $c_{\text{eff}}$ | Effective signal or clock-channel speed for a dressed branch | derived/contextual |
| $c_\star$ | Local comparison speed in a declared branch | branch-dependent |
| $c_0$ | Measured low-energy invariant light speed in weak homogeneous conditions | empirical calibration target |

None may be identified with another until the regime and derivation are stated.

## Preferred-Frame Leakage Closure

The operational diagnostic is two-way photon speed:

$$
c_{2w}(\hat{\mathbf n})
=
\frac{2L}{T_+(\hat{\mathbf n})+T_-(\hat{\mathbf n})}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e41b35d34629c42b)

round-trip distance over round-trip time. Two-way rather than one-way because one-way measurement requires synchronized clocks at both ends, which presupposes the convention under test.

Its anisotropy must fit

$$
\frac{c_{2w}(\hat{\mathbf n})-c_0}{c_0}
=
\zeta_0
+
\zeta_{ij}^{\mathrm{TF}}
\left(
\hat n^i\hat n^j-\frac{1}{3}\delta^{ij}
\right)
+
\cdots
$$

[View →](../../../../equation-mapping.html#corpus-equation-a7d979a4d966f967)

an isotropic piece plus a direction-dependent piece. The coefficient must be compared with a declared contemporary instrument and coefficient map; the Nagel benchmark cited above reached the $10^{-18}$ scale for its resonator channel.

The parameterized post-Newtonian export must also pass:

$$
\left(
|\gamma_{\mathrm{PPN}}-1|,
|\beta_{\mathrm{PPN}}-1|,
|\alpha_1|,
|\alpha_2|,
|\alpha_3|
\right)
\le
\left(
2.3\times10^{-5},
8\times10^{-5},
4\times10^{-5},
2\times10^{-9},
4\times10^{-20}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-5330b39dbced67eb)

The **parameterized post-Newtonian (PPN) framework** is the standard weak-field catalogue of ways a metric gravity theory can differ from general relativity. The displayed inequality is interpreted component by component and records representative bounds compiled in Will's 2014 [review of experimental tests of general relativity](https://doi.org/10.12942/lrr-2014-4), not a timeless or automatically current bound vector. Its entries summarize different experiments and, for some preferred-frame parameters, include strong-field pulsar analyses rather than five independent measurements of one system. The first two entries test spatial curvature per unit mass and nonlinear superposition; $\alpha_1$, $\alpha_2$, and $\alpha_3$ parameterize preferred-frame or related nonconservative effects. Any present comparison must select the current coefficient-specific constraint and state its assumptions.

Any screening must be included before exporting these coefficients, and the exported values must pass. Preferred-frame hiding is a numerical closure condition, not a prose reassurance.

The trace-free photon coefficient is the proposed photon-channel projection of the medium framing quadrupole. It is parallel to but distinct from the matter tensor: matter leakage tests assembly framing, while photon and PPN leakage test the medium response sampled by the signal. For a reciprocal two-way observable, reversing the path direction removes odd directional multipoles, so a dipole term is absent and the leading anisotropic row is quadrupolar. Translation and rotation invariance alone would not establish that cancellation. The projection from medium state to each coefficient remains a derivation target.

## Effective Metric Handoff

Locally:

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

[View →](../../../../equation-mapping.html#corpus-equation-0f9a5b68a09b6135)

The handoff is admissible only where

$$
A>0,
\qquad
B_{ij}=B_{ji},
\qquad
B_{ij}\xi^i\xi^j>0
\quad
\text{for }\xi\ne0
$$

[View →](../../../../equation-mapping.html#corpus-equation-d47797a6f7809924)

These have physical content rather than being technical hygiene. $A>0$ supplies a positive rest-clock factor. A moving clock must additionally lie in the timelike domain stated above and retain a valid, advancing phase. Positive-definiteness of $B_{ij}$ says every spatial direction has positive measured length. A single light cone additionally requires a nondispersive, nonbirefringent signal law governed by this same tensor.

The handoff fails when a certified cycle is lost, when a branch transition makes the ledger discontinuous, when a Jacobian floor collapses, or when a strong-field channel becomes dispersive or **birefringent** — splitting a signal by polarization so no single response tensor describes it. There the metric description is suspended and analysis returns to finite branch data, as in [Lorentz Kinematics](../spacetime/lorentz-kinematics.md#causal-root-ledger-progression-as-a-lorentz-prediction) and [Singularity Resolution](../spacetime/singularity-resolution.md).

### Conditional uniform-flow affine-equivalence lemma

Suppose on one window that $A$ is a positive constant, $B_{ij}$ is a constant positive-definite matrix, the medium flow is constant, and every admitted clock, ruler, and signal couples only through this handoff. Choose a constant matrix satisfying

$$
B_{ij}
=
\delta_{ab}L^a{}_iL^b{}_j
$$

[View →](../../../../equation-mapping.html#corpus-equation-ebb791623df657c4)

a square root of the ruler tensor, and define

$$
t'_{\mathrm{eff}}
=
A\,t_{\mathrm{eff}},
\qquad
y^a_{\mathrm{eff}}
=
\frac{1}{c_0}
L^a{}_i
\left(
x^i_{\mathrm{eff}}
-
u^i_{\mathrm{sea,eff}}t_{\mathrm{eff}}
\right).
$$

[View →](../../../../equation-mapping.html#corpus-equation-f1f3c9c3e04165e5)

rescaling time by the clock rate and moving to coordinates that drift with the medium. Then

$$
d\tau^2
=
dt_{\mathrm{eff}}'^2
-
\delta_{ab}\,dy^a_{\mathrm{eff}}dy^b_{\mathrm{eff}}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-9622f4df7a4487ec)

flat Minkowski form on that window, with the constant coefficients absorbed into the chosen effective coordinates.

A uniform medium flow with constant universal response is **coordinate-removable** within this local quadratic handoff. This lemma shows that those constant coefficients alone do not create an observable local anisotropy for channels satisfying its hypotheses. It does not prove global preferred-frame hiding or explain why the required universal coefficients arise.

But note what it does not do. It does not remove the substrate frame, and it does not establish universality — it assumed it. What it does is localize observable leakage to the places where its hypotheses fail: gradients or time dependence in the medium, dispersion, non-universal coupling, or channels outside the single handoff.

### Forward regularity and inverse identifiability

The handoff first requires a well-defined forward map. Write it as

$$
\Psi_{\mathrm{cr}}
:
(\mathcal{B}_t,H_t,\mathcal{N}_{\mathrm{sea}})
\longmapsto
(A,B_{ij}).
$$

[View →](../../../../equation-mapping.html#corpus-equation-d13e1ce133948a4e)

from branch, history, and medium data to one clock rate and one ruler tensor. Many microscopic records may legitimately produce the same effective pair, so the map need not be invertible. What the export needs is single-valued continuity and sufficient differential rank in the output directions being varied. A rank-deficiency set may be written

$$
\mathfrak{F}_{\mathrm{cr}}
=
\{
\operatorname{rank}D\Psi_{\mathrm{cr}}
<
\operatorname{rank}_{\mathrm{reg}}
\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-855b8fb677f47adc)

and the conditioning face is a singular-value floor:

$$
\sigma_{\min}
\left(
D\Psi_{\mathrm{cr}}\big|_{\mathrm{reg}}
\right)
\ge
\sigma_{\mathrm{cr}}>0.
$$

[View →](../../../../equation-mapping.html#corpus-equation-b59763c66090a8a4)

The smallest retained **singular value** measures the most compressed direction in a chosen complement to the expected coarse-graining fibers. Bounding it away from zero controls sensitivity of the exported variables on that reduced chart; it does not recover the erased microscopic data.

Positivity and forward regularity are separate admissibility conditions. A branch can fail by losing clock or ruler positivity, by making the forward export discontinuous or multivalued, or by losing rank in an output direction required by the effective chart. Inverse identification of microscopic state from $(A,B_{ij})$ is a different problem and is not required for coarse-graining.

The geometry of the failure set depends on the dimensions and the rank condition. A scalar fold is generically codimension one, but determinantal rank varieties can have higher codimension. No universal codimension follows from the notation above. Each clock-and-ruler chart must state its dimensions, regular rank, and failure geometry rather than importing the fold count from the causal-root problem.

### Export

Define

$$
ds_{\mathrm{eff}}^2=-c_0^2d\tau^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-142d1bd421e3f1b2)

With $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$, the components are

$$
g^{\mathrm{eff}}_{00}
=
-A^2+\frac{1}{c_0^2}B_{ij}u^i_{\mathrm{sea,eff}}u^j_{\mathrm{sea,eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-077f6f96b2236e09)

$$
g^{\mathrm{eff}}_{0i}
=
-\frac{1}{c_0}B_{ij}u^j_{\mathrm{sea,eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e0931c21a6845226)

and

$$
g^{\mathrm{eff}}_{ij}
=
B_{ij}
$$

[View →](../../../../equation-mapping.html#corpus-equation-58d9d410e1c1b17a)

The time-time component carries the clock rate corrected for flow, the mixed components carry the flow itself, and the spatial components are the ruler tensor.

Photon closure then reads the null condition of that form, with the photon speed derived from the same medium state:

$$
\frac{dx_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}}
=
u^i_{\mathrm{sea,eff}}
+
c_\gamma^{\mathrm{rel}}(\hat{\mathbf{k}})\hat k^i
$$

[View →](../../../../equation-mapping.html#corpus-equation-53d3b79421c051ab)

light is carried by the medium flow and travels through it at

$$
c_\gamma^{\mathrm{rel}}(\hat{\mathbf{k}})
=
\frac{c_0A}{\sqrt{B_{ij}\hat k^i\hat k^j}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-b386c818670a88e7)

the clock rate over the ruler length in the direction of travel. The weak homogeneous branch requires the clock function to approach one, the ruler tensor to approach the identity, and the flow to vanish.

### The same-record rule

This is stricter than using one symbol in several equations, and it is the strongest structural constraint in the chapter.

The clock and ruler map must consume the **same** medium record that supplies the effective gravitational constant, the matter limiting speed, and the photon speed:

$$
\Theta_{\mathrm{sea}}
\longmapsto
\left(
A,\,
B_{ij},\,
G_{\mathrm{eff}},\,
c_{\text{eff}},\,
c_\gamma
\right).
$$

[View →](../../../../equation-mapping.html#corpus-equation-30f59d13f3892938)

one object, five projections. If these require separate records or independently tuned tensors, the effective metric is **fitted rather than derived**. It may still summarize data, but it does not provide the claimed common-origin explanation. The burden is one constitutive object with five projections.

## Key Point

Relativity of simultaneity and time dilation are emergent observer-level effects of assembly dynamics. The formalism evolves in absolute time; proper time is a derived functional.

The closure burden is therefore not to remove the preferred foliation. It is to derive clock, ruler, and signal behavior that bounds leakage to the required precision.

## Falsifiability Wall

The defense fails in three specific ways, and none is a matter of interpretation.

**It fails** if the composition residual cannot be driven below the declared clock-comparison ceiling by a common-channel reduction.

**The connected-moduli route fails** if realized clock species occupy different deformation classes with no certificate-preserving dressing path between them. That does not by itself prove a nonzero composition residual; the defense fails only if their separately computed effective maps disagree above the declared ceiling.

**It fails** if a stable low-energy clock or ruler retains orientation or preferred-frame leakage after branch-chart, dressing, and regularization terms are accounted for, with residuals above the relevant cavity or two-way anisotropy row — in particular at the $10^{-18}$ scale for the strictest resonator comparisons.

Such leakage would not be an alternative reading of proper time. It would falsify the proposed Lorentz-recovery branch. Persistent failure across every admissible branch would make this absolute-time realization incompatible with the measured observer sector; it would not constitute a purely logical disproof of every possible absolute-time model.
