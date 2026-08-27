# Amplituhedron and Positive-Geometry Scattering Mapping

## Status and Scope

- **Status:** dormant-deferred external-watch comparison topic; not queued, scored, promoted, or authorized for implementation.
- **Claim level:** speculation about an effective recovery map.
- **Dormant home:** `reference/priorities/dormant-deferred/amplituhedron` owns this preserved discussion and its revisit conditions.
- **Revisit destinations:** `quantum-closure` would own a future amplitude and history-measure question; `mapping-equations`, especially `EQ-30` and the shared finite-window statistical carrier, would own any authorized executable projection and residual.
- **Priority disposition:** defer internal $\mathbb{A}\mathbb{A}\mathbb{A}$ work and let the collider/scattering-amplitudes community mature the realistic positive-geometry side; reconsider only after the prerequisites and revisit triggers below are satisfied.
- **Excluded claims:** the amplituhedron is not substrate ontology, a retained Noether braid, a replacement Master Equation, evidence for a retained scattering carrier, or evidence that locality, unitarity, supersymmetry, planarity, momentum twistors, or quantum amplitudes have been recovered by $\mathbb{A}\mathbb{A}\mathbb{A}$.

This packet captures the initial 2026-08-26 inquiry about what the amplituhedron is, whether it may relate to $\mathbb{A}\mathbb{A}\mathbb{A}$, what its originating research program calls the underlying theory, why scattering science is performed, what the modern amplitudes program is trying to achieve, whether the amplituhedron should become a theory-mapping target, and whether it warrants a standalone priority lane.

## Source Concept and Terminology

The amplituhedron was introduced by Nima Arkani-Hamed and Jaroslav Trnka as a positive-geometric formulation of scattering amplitudes in the planar limit of $\mathcal N=4$ supersymmetric Yang--Mills theory. The amplituhedron is the geometric object or formulation; the physical theory in the original construction is planar $\mathcal N=4$ super-Yang--Mills theory; and the broader mathematical program is positive geometry and canonical forms within scattering-amplitude research.

The primary starting points are:

- Nima Arkani-Hamed, Jacob Bourjaily, Freddy Cachazo, Alexander Goncharov, Alexander Postnikov, and Jaroslav Trnka, [Scattering Amplitudes and the Positive Grassmannian](https://arxiv.org/abs/1212.5605).
- Nima Arkani-Hamed and Jaroslav Trnka, [The Amplituhedron](https://arxiv.org/abs/1312.2007).
- Nima Arkani-Hamed, Yuntao Bai, and Thomas Lam, [Positive Geometries and Canonical Forms](https://arxiv.org/abs/1703.04541).
- Nima Arkani-Hamed, Tzu-Chen Huang, and Yu-tin Huang, [Scattering Amplitudes For All Masses and Spins](https://arxiv.org/abs/1709.04891).
- Nima Arkani-Hamed, Hadleigh Frost, Giulio Salvatori, Pierre-Guy Plamondon, and Hugh Thomas, [All Loop Scattering As A Counting Problem](https://arxiv.org/abs/2309.15913).

For positive external kinematic data $Z$, the tree amplituhedron is obtained schematically as the image

$$
Y=CZ,
\qquad
C\in G_+(k,n),
$$

where $G_+(k,n)$ is the positive Grassmannian, the space of $k$-planes represented by matrices whose ordered maximal minors are positive. The associated canonical differential form has logarithmic singularities on the geometry's boundaries and recursively reduces by residues to the canonical forms of those boundaries. In the declared planar $\mathcal N=4$ comparison regime, that form encodes the tree amplitude or loop integrand; the quoted term “volume” is projective and canonical-form language, not ordinary Euclidean volume.

Plainly: the amplituhedron is not a material object in spacetime. It packages allowed effective scattering kinematics into a geometry whose boundaries carry the factorization information that Feynman-diagram calculations distribute across many terms.

Different triangulations of the positive geometry provide different intermediate representations of the same canonical form. Internal triangulation boundaries are not physical and must cancel, while external physical boundaries carry the permitted singularities and residues. This is the precise sense in which locality and unitarity can emerge from the positive geometry rather than appear as manifest starting ingredients of that representation.

Plainly: different valid decompositions may look very different during a calculation, but the final physical boundary structure is independent of that bookkeeping. This does not by itself show that spacetime, locality, or causal dynamics is absent from nature.

## What Scattering Science Is

**Observer-level role:** scattering science prepares a known incoming configuration, lets the constituents interact, and records the distribution of outgoing configurations. The central comparison object is the scattering matrix $S$, which maps an asymptotic incoming state to an asymptotic outgoing state,

$$
\lvert \mathrm{out}\rangle
=
S\lvert \mathrm{in}\rangle.
$$

Its matrix elements are scattering amplitudes. After the preparation flux, final-state phase space, unresolved alternatives, and detector response are supplied, squared amplitudes determine observable event rates and differential cross sections schematically through

$$
d\sigma_{a\to b}
=
\frac{1}{\mathcal F}
\left|\mathcal M_{a\to b}\right|^2
d\Pi_b.
$$

Plainly: the experiment counts what comes out after specified things are sent in. The amplitude is the theory's compact prediction for the alternatives and their interference; the cross section is the calibrated event rate that experiments can compare with data.

Scattering is scientifically valuable because a controlled collision can expose structure that is inaccessible to direct imaging. Varying incoming species, energy, momentum transfer, polarization, angle, and target state asks different questions of the same system. The resulting rates and distributions can:

1. resolve whether an apparently elementary object has internal spatial or dynamical structure through form factors and inelastic channels;
2. identify interaction channels, coupling strengths, selection rules, and conserved quantities;
3. reveal transient or metastable states through poles, resonance widths, and branching fractions;
4. test symmetry relations and factorization across many processes;
5. determine where an effective description succeeds or breaks down; and
6. expose new particles, interactions, or compositeness through reproducible departures from a fixed prediction.

This experimental purpose is explicit in CERN's description of collider research: accelerators and detectors test the predictions and limits of the Standard Model, analyze the particles produced in collisions, and pursue unresolved questions about the fundamental structure of matter. See [CERN Physics](https://home.cern/science/physics/) and [The Large Hadron Collider](https://home.cern/science/accelerators/large-hadron-collider/).

Plainly: scattering turns “what is this object and how does it interact?” into a controlled input-output experiment. It is powerful because one hypothesized internal mechanism must survive many energies, angles, channels, and detector arrangements without being retuned separately for each one.

Scattering also has a boundary as evidence. An $S$-matrix describes prepared incoming and outgoing records, often using an idealization of states far before and after the interaction. It does not uniquely reveal what happened inside the interaction window, and different microscopic accounts can agree on the same measured amplitudes over a limited regime. Scattering data therefore constrain substrate dynamics sharply but do not, by themselves, prove a unique substrate ontology.

## Operational Order: From Theory to Experimental Test

For a genuine predeclared scattering prediction, the operational order is:

1. **Choose the theory and approximation.** Specify the particle content, interactions, parameter values, perturbative order, kinematic regime, and any idealizations.
2. **Specify the incoming preparation.** Declare incoming species, momenta, energy, polarization or spin information, beam distributions, and target state.
3. **Calculate the amplitude.** Use Feynman diagrams, on-shell recursion, generalized unitarity, a positive geometry such as the amplituhedron when its domain applies, or another valid method.
4. **Construct the observable.** Square and combine amplitudes as required, integrate over final-state phase space, include interference and unresolved alternatives, and obtain cross sections or differential distributions.
5. **Add the experimental interface.** Convolve with parton or beam distributions where relevant, impose event definitions and cuts, and propagate the prediction through detector acceptance, resolution, and reconstruction.
6. **Freeze the prediction or analysis protocol.** State the predicted distributions, theory uncertainties, parameter-fitting boundary, and statistical comparison before reading the signal region when the test is intended to be predictive.
7. **Run or unblind the experiment.** Collect event records and reduce them through the declared calibration and analysis pipeline.
8. **Compare prediction and data.** Accept consistency on the declared domain, refine bounded nuisance estimates, or identify a discrepancy requiring a calculation correction, a changed effective model, or genuinely new physics.

Plainly: the theory calculation comes before the experimental verdict. The experiment does not generate the amplituhedron; the theory and external kinematic data define the geometry, and its canonical form supplies an amplitude that can enter the prediction pipeline.

The amplituhedron-specific calculation occupies only step 3:

$$
\left(
\text{planar }\mathcal N=4\text{ theory},
\text{external data }Z,
n,k,L
\right)
\longrightarrow
\mathcal A_{n,k,L}
\longrightarrow
\Omega(\mathcal A_{n,k,L})
\longrightarrow
\text{amplitude or loop integrand}.
$$

Plainly: one first defines the amplituhedron from the chosen theory and kinematics, then determines its canonical form, and then extracts the amplitude or loop integrand. At loop level the integrand generally still has to be integrated and combined into an infrared-safe observable before comparison with an experiment.

### Is the Amplituhedron a Competing Prediction Method?

Yes, but the object of competition must be stated precisely. Within a domain where several methods apply, Feynman diagrams, on-shell recursion, generalized unitarity, and the amplituhedron are alternative representations or computational routes to the amplitude of the same theory.

| Question | Operational answer |
| --- | --- |
| Is the amplituhedron calculated before an experiment? | Its geometry and canonical form can be determined from the theory and external kinematics without using the measured event counts. When used predictively, this occurs before comparison with the data. |
| Does it make a prediction? | Its canonical form yields a scattering amplitude or loop integrand in the declared theoretical setting. Further integration and experimental modeling are needed for a measured cross section. |
| Does it compete with Feynman diagrams? | Yes, as an alternative route to the same amplitude where both methods apply. |
| Should the two routes give different answers? | No. At the same theory point, perturbative order, convention, and observable definition, they must agree within the declared analytical or numerical error. |
| Is the amplituhedron already a general collider-prediction engine? | No. Its most complete realization is in planar $\mathcal N=4$ super-Yang--Mills theory, not the full Standard Model prediction pipeline. |

Plainly: this is primarily competition over representation, reach, transparency, and computational burden—not competition between two physical laws making intentionally different predictions.

### Does It Promise Better Predictions?

The careful answer is **indirectly and conditionally**. Merely rewriting the same exact amplitude cannot make the underlying theory more accurate. If two correct methods evaluate the same theory at the same order with the same inputs, they predict the same observable. A positive-geometry formula does not repair an incorrect theory, determine unknown parameters, or remove experimental uncertainty by itself.

New amplitude methods can nevertheless improve theory testing when they enable one or more of the following:

1. **Higher perturbative order.** Calculating additional loop orders can reduce truncation uncertainty and reveal smaller deviations from the tested theory.
2. **Higher multiplicity.** Efficient treatment of more outgoing particles can make complex event classes predictable rather than inaccessible.
3. **More stable evaluation.** Making cancellations and singularity structure explicit can reduce numerical instability in difficult kinematic regions.
4. **More observables.** A compact analytic representation can expose angular, polarization, soft, collinear, and multi-scale predictions that are difficult to extract diagram by diagram.
5. **Stronger internal checks.** Factorization, symmetry, spurious-pole cancellation, and alternative representations can detect errors before comparison with data.
6. **Theory classification.** On-shell consistency can rule out candidate interactions or sharply constrain their allowed form before a full conventional field-theory construction is available.

Every claimed efficiency or cost advantage remains empirical: it must be demonstrated on the same amplitude or observable by wall time, memory use, numerical conditioning, achievable perturbative order, or another predeclared performance measure. Geometric elegance alone does not establish computational superiority.

Plainly: better mathematics can let physicists calculate a sharper prediction, which makes a smaller experimental discrepancy meaningful. But the gain comes from reaching a more complete or reliable calculation—not from the amplituhedron assigning a different probability to the same fully specified theory.

Several major uncertainties may also sit outside the amplitude calculation: parton distributions, nonperturbative QCD, hadronization, missing effective parameters, beam modeling, detector calibration, event reconstruction, and statistical or systematic error. An amplituhedron-like improvement at step 3 cannot automatically remove uncertainties introduced at steps 1, 4, or 5.

### Is Efficiency the Basic Program?

Efficiency is one practical payoff, but describing the program as mostly an efficiency play misses its central scientific wager. The deeper program asks why final amplitudes are far simpler and more symmetric than their conventional derivations, whether physical consistency can determine interactions directly from on-shell data, and whether locality and unitarity can emerge from geometry or combinatorics. A faster calculation matters experimentally; a successful reconstruction of those principles would change the conceptual organization of quantum field theory.

Plainly: the near-term promise is better calculational reach. The long-term promise is a better explanation of why the scattering rules have the form they do.

## What the Scattering-Amplitudes Program Is Trying to Achieve

The modern amplitudes program has both practical and foundational aims.

### Direct and Efficient Calculation

Feynman diagrams make locality and perturbative unitarity manifest, but they introduce large amounts of intermediate redundancy. Individual diagrams depend on gauge choices, off-shell variables, or artificial decompositions that cancel only after many terms are summed. The amplitudes program seeks formulations that work directly with physical on-shell data, expose cancellations before brute-force expansion, and make otherwise impractical calculations tractable.

Plainly: the aim is to compute the measurable answer without carrying every bookkeeping variable that disappears from the answer.

### Classification by Consistency

On-shell methods ask which amplitudes are compatible with declared symmetries, particle masses and spins, factorization, and unitarity. Three-point amplitudes provide elementary building blocks; consistent residues constrain four-point and higher amplitudes. This can classify allowed interactions and recover familiar field-theory structures from consistency of observable scattering data rather than from a preselected Lagrangian description.

Plainly: instead of proposing every possible microscopic equation and calculating its consequences, one asks which observable interaction patterns can fit together consistently at all channel boundaries.

### Expose Hidden Mathematical Structure

The exceptional simplicity and hidden symmetries of final amplitudes suggest that conventional diagrams are not the most economical representation. Positive Grassmannians, on-shell diagrams, cluster-like structures, combinatorics, and positive geometries are attempts to identify the mathematical object whose canonical data is the amplitude. In the amplituhedron, physical poles and factorization residues arise as boundaries, while spurious boundaries introduced by a triangulation cancel.

Plainly: they are looking for the geometry or combinatorial rule that makes the final answer inevitable, rather than treating its simplicity as a miraculous cancellation among thousands of diagram terms.

### Make Locality and Unitarity Derived Features

The original amplituhedron proposal explicitly seeks a formulation in which locality and unitarity are not the central manifest inputs but arise together from positive geometry. This is a statement about reconstructing scattering amplitudes in the declared theory and regime. It is not yet a universal derivation of physical spacetime, quantum mechanics, or the real-world Standard Model.

Plainly: the ambition is not merely a faster calculator. It is to discover whether principles that look fundamental in ordinary quantum field theory are consequences of a deeper mathematical organization.

### Reach Beyond the Special Model

Planar $\mathcal N=4$ super-Yang--Mills theory is an unusually symmetric laboratory, not the observed particle theory. Later work extends on-shell methods to particles of general mass and spin and explores positive or combinatorial formulations in broader theories. The 2023 all-loop counting program describes its longer-term aim as formulating real-world fundamental physics in a radically new language in which locality and unitarity emerge from deeper structures. That is a research objective, not an accomplished reformulation of the full Standard Model or quantum gravity.

Plainly: the special theory is where the hidden organization is easiest to see. The larger project is to determine which parts survive when supersymmetry and planarity are removed and realistic particles and interactions are restored.

The same positive-geometry impulse has also been explored for cosmological wavefunctions, where asymptotic scattering states are not the whole problem. Cosmological polytopes provide an example of extending the geometric program beyond the flat-space scattering matrix, but only in declared model classes; see [Cosmological Polytopes and the Wavefunction of the Universe](https://arxiv.org/abs/1709.02813). This extension reinforces the program's foundational ambition while also showing that the amplituhedron itself is not the universal object for every physical setting.

## What “Extending the Amplituhedron” Means

The original amplituhedron is intended to encode the relevant amplitude or loop integrand exactly in its declared planar $\mathcal N=4$ super-Yang--Mills domain. The extension problem is therefore not to make that same geometry fit the same scattering data more accurately. It is to discover which underlying ideas survive in broader and more realistic settings:

1. finite color and nonplanar processes;
2. less or no supersymmetry;
3. massive particles and general spin;
4. QCD-like and electroweak interactions;
5. gravity and cosmological observables;
6. loop-integrated, infrared-safe quantities rather than integrands alone; and
7. predictions close enough to experimental observables to join beam, event-definition, and detector pipelines.

Plainly: planar $\mathcal N=4$ super-Yang--Mills theory is the clean laboratory in which the hidden organization is easiest to see. The broader aim is to carry the useful structure into theories that describe real scattering.

That generalization need not be one larger universal amplituhedron. The research program already includes positive geometries, on-shell recursion, kinematic spaces, combinatorial counting, and other structures. The amplituhedron may be a decisive example of a more general organizing principle rather than the final object for every theory.

Plainly: the enduring target is a universal geometric or combinatorial organization of scattering, not preservation of one named geometry at any cost.

## Why Scattering Is a High-Value $\mathbb{A}\mathbb{A}\mathbb{A}$ Recovery Target

Scattering is unusually demanding for $\mathbb{A}\mathbb{A}\mathbb{A}$ because it joins ontology, dynamics, coarse-graining, and measurement in one test. A successful account must carry source assemblies and their identities into a finite causal interaction window; resolve transient assemblies, wake and Noether sea exchange, recoil, and remnant channels; produce admissible outgoing histories; define a preparation measure and detector kernel; and recover rates, angular distributions, polarization behavior, thresholds, resonances, and factorization from that same record.

A defensible recovery ladder is

$$
\mathcal H_{\mathrm{substrate}}
\longrightarrow
\mathcal E_{\mathrm{event}}
\longrightarrow
\mu_{\mathrm{out}}
\longrightarrow
\left(\mathcal M,\sigma,F,\Gamma\right)
\longrightarrow
\Omega(\mathcal A)
$$

only when each arrow is defined and validated. Here $\mathcal E_{\mathrm{event}}$ is the finite interaction ledger, $\mu_{\mathrm{out}}$ is the prepared and detector-conditioned outcome measure, $\mathcal M$ is an effective amplitude, $\sigma$ is a cross section, $F$ is a form factor, $\Gamma$ is a decay or resonance-width record, and $\Omega(\mathcal A)$ is an optional positive-geometry representation in a regime where such a geometry is independently known.

Plainly: the amplituhedron belongs at the far end of the recovery chain. It can test whether a derived scattering description has the correct global organization, but it cannot supply the missing assemblies, causal histories, outcome measure, or detector response at the earlier stages.

This makes scattering a strong anti-retuning test. One accepted retained carrier should account jointly for total and differential rates, allowed and forbidden channels, physical poles, residues, form factors, polarization and spin dependence, resonance behavior, and detector-conditioned event classes. A model that fits each row with a separate effective parameter has not recovered the common physical process.

The mapping target is therefore stronger than numerical agreement with one cross section. The result must explain why the allowed outcome space has its observed boundaries and why the measure on that space has the observed amplitude structure. Positive geometry is valuable precisely because it tests both support and boundary organization; it remains optional unless a source-derived $\mathbb{A}\mathbb{A}\mathbb{A}$ map actually lands there.

## Effort, Opportunity Cost, and Back-Burner Disposition

The apparent bridge hides a long dependency chain:

$$
\text{retained assemblies}
\longrightarrow
\text{closed scattering event ledger}
\longrightarrow
\text{prepared outcome measure}
\longrightarrow
\text{detector-conditioned cross sections}
\longrightarrow
\text{derived effective amplitude}
\longrightarrow
\text{positive-geometry test}.
$$

Plainly: the amplituhedron question begins only after $\mathbb{A}\mathbb{A}\mathbb{A}$ has solved most of its ordinary scattering problem. Positive geometry cannot substitute for any missing link earlier in the chain.

The current internal effort risk is therefore high:

- no accepted retained $\mathbb{A}\mathbb{A}\mathbb{A}$ scattering carrier presently supplies the complete chain;
- every projection introduces its own state, measure, detector, approximation, and no-hidden-retune obligations;
- the original amplituhedron's special theory domain is far from an $\mathbb{A}\mathbb{A}\mathbb{A}$ assembly calculation and from a full real-world collider observable;
- even a successful match could be only a new representation of an already-derived amplitude rather than a new physical discriminator; and
- specialists in collider physics, scattering amplitudes, and positive geometry are better positioned to determine which generalization actually survives beyond the special model.

**Operator judgment — 2026-08-26:** pursuing the complete assembly-to-amplitude-to-amplituhedron bridge now risks a Sisyphean effort: each completed mapping may expose another prerequisite without materially advancing current theory closure. Treat this as a back-burner external-watch topic rather than an active $\mathbb{A}\mathbb{A}\mathbb{A}$ research lane.

Plainly: the idea is worth remembering, but it is not presently worth diverting effort from retained assemblies, Master Equation closure, scattering event ledgers, and ordinary cross-section recovery.

Reconsider active work only if at least one of these triggers occurs:

1. $\mathbb{A}\mathbb{A}\mathbb{A}$ obtains an accepted retained four-point scattering carrier and same-record event ledger;
2. `EQ-30` advances from its toy/attempt state to an accepted source-bound cross-section and form-factor carrier;
3. an effective $\mathbb{A}\mathbb{A}\mathbb{A}$ amplitude is independently derived, making its support and residues concrete rather than guessed;
4. external specialists produce a positive-geometry or comparably direct construction for realistic massive, nonplanar, QCD-like scattering that materially lowers the mapping burden; or
5. the proposed geometry yields a specific discriminator unavailable from the ordinary amplitude and cross-section program.

Until then, external results may be noted when they cross one of those triggers, but no implementation, new queue item, dedicated lane, or score movement is authorized by this packet.

## Relation to the Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Program

The defensible connection is an effective mapping hypothesis, not a shared ontology. $\mathbb{A}\mathbb{A}\mathbb{A}$ starts with architrino identities, polarity, Euclidean void, absolute time, causal-wake history, and the Master Equation. Scattering amplitudes, on-shell states, momentum twistors, supersymmetry, and positive Grassmannian coordinates belong to an observer-level recovery or comparison interface unless separately derived.

The existing quantum-closure amplitude benchmark already requires physical simple-pole factorization,

$$
\lim_{s\to0}sA_4=A_3A_3,
$$

with no unphysical $1/s^2$ pole in the same channel. In $\mathbb{A}\mathbb{A}\mathbb{A}$, a successful residue must correspond to an admissible intermediate assembly or event-ledger channel derived from causal-wake dynamics, with the reaction ledger and every remnant, recoil, wake, and Noether sea account closed on the same record.

Plainly: when an effective scattering process separates into two stages, $\mathbb{A}\mathbb{A}\mathbb{A}$ must supply the actual transient carrier joining those stages. Writing the correct amplitude identity without that carrier would reproduce a target formula without explaining it.

The candidate comparison contract is

$$
\Psi:
\mathcal H_{\mathrm{scat}}^{W,\mathrm{ret}}
\longrightarrow
\mathcal K_{n,k},
\qquad
\Psi_*\mu_{\mathrm{hist}}
\stackrel{?}{=}
\Omega(\mathcal A_{n,k})+\mathcal R_{\mathrm{pos}},
$$

where:

- $\mathcal H_{\mathrm{scat}}^{W,\mathrm{ret}}$ is a retained finite-window scattering-history domain;
- $\Psi$ is a source-derived projection from complete event histories to a separately defined effective on-shell kinematic chart $\mathcal K_{n,k}$;
- $\mu_{\mathrm{hist}}$ is the prepared history measure, including the fixed detector and exposure records required by the finite-window statistical carrier;
- $\Omega(\mathcal A_{n,k})$ is the amplituhedron canonical form in one explicitly declared comparison regime; and
- $\mathcal R_{\mathrm{pos}}$ records the failure of the pushed-forward history density to reproduce that canonical form.

Plainly: first determine which complete $\mathbb{A}\mathbb{A}\mathbb{A}$ histories constitute one scattering preparation and outcome. Only then test whether their effective image has the amplituhedron's positivity, boundaries, and canonical density. The proposed equality is a target with a residual, not a present result.

## Strongest Defensible Assessment

| Question | Assessment | Claim boundary |
| --- | --- | --- |
| Is the amplituhedron itself a physical theory? | No. It is a geometric formulation associated originally with planar $\mathcal N=4$ super-Yang--Mills amplitudes. | Do not call it a competing substrate theory or a theory of everything. |
| Does it resemble the $\mathbb{A}\mathbb{A}\mathbb{A}$ emergence strategy? | Yes, methodologically. Both programs permit familiar effective structures to arise from a less conventional starting representation. | Methodological resonance is not mathematical or physical evidence. |
| Can it be a theory-mapping target? | Yes. It is a stringent observer-level benchmark for amplitude support, boundary factorization, spurious-boundary cancellation, and measure pushforward. | The benchmark must not become an architrino-level premise. |
| Do current causal-root or braid strata establish positive geometry? | No. | Stratification alone does not establish positive minors, a canonical form, or amplitude recovery. |
| Should a standalone amplituhedron lane exist now? | No. The first object belongs under the existing quantum-closure and mapping-equations owners. | Reconsider only after a nontrivial result creates several independently testable follow-on objects. |

## Assumptions and Proof Burden

The comparison assumes:

1. a retained scattering carrier exists on a declared finite history window;
2. incoming, intermediate, and outgoing assembly identities are source-derived and preserved through one event ledger;
3. an effective on-shell map $\Psi$ can be constructed without importing field-theory ontology as substrate law;
4. the prepared-event measure, exposure record, and detector kernel are fixed independently of the desired amplitude; and
5. the first comparison is restricted to a regime in which the chosen amplituhedron result actually applies.

The proof burden is to:

1. construct $\Psi$ from one complete retained record;
2. prove that its image satisfies the required ordered-minor positivity rather than merely reusing positive causal-root magnitudes;
3. identify the image's boundary stratification and map each physical boundary to an admissible transient-assembly channel;
4. recover the correct simple-pole residue on that boundary;
5. show that spurious boundaries introduced by alternative decompositions cancel;
6. compare the pushed-forward history density with the canonical form without channel-by-channel retuning; and
7. pass independently authored wrong-channel, wrong-ordering, split-record, and triangulation-dependence controls.

Plainly: the bridge earns attention only if the same $\mathbb{A}\mathbb{A}\mathbb{A}$ record explains both which scattering configurations are allowed and why their effective weights and singularities have the positive-geometry form.

## Falsifiers and Stop Conditions

Reject the proposed bridge for the tested class if any of the following survives numerical and analytical error bounds:

- the effective image fails the required minor ordering or positivity;
- positivity appears only because the target coordinates were fitted after seeing the desired form;
- a physical factorization boundary has no admissible intermediate assembly or event-ledger channel;
- the retained intermediate channel exists but gives the wrong residue or a higher-order pole;
- a deliberately wrong channel produces the same residue;
- spurious poles or internal-boundary contributions fail to cancel;
- the result changes under an allowed chart or triangulation change;
- separate detector, exposure, or channel retuning is required; or
- supersymmetry, planarity, momentum-twistor data, locality, or unitarity must be inserted as substrate premises to obtain the match.

A negative result is still useful if it isolates which obstruction belongs to the retained carrier, the on-shell projection, positivity, factorization, or the effective measure. A failure in the special planar $\mathcal N=4$ comparison does not by itself falsify $\mathbb{A}\mathbb{A}\mathbb{A}$; it falsifies that declared recovery bridge.

## Hypothetical First Mathematical Artifact After Revisit

If a revisit trigger passes, the smallest useful artifact would be a one-channel four-point comparison packet. It should declare:

1. one retained finite-window $\mathbb{A}\mathbb{A}\mathbb{A}$ scattering-history family $\mathcal H_{4}^{W,\mathrm{ret}}$;
2. one source-derived projection $\Psi_4$ to a minimal effective kinematic chart;
3. one physical channel coordinate $s$ and the corresponding transient-assembly factorization row;
4. the simple-pole target $\lim_{s\to0}sA_4=A_3A_3$;
5. one deliberately wrong channel that must fail;
6. one alternative decomposition whose spurious boundary must cancel;
7. the positivity and chart-independence checks; and
8. the residual $\mathcal R_{\mathrm{pos}}$ with a predeclared acceptance tolerance.

This packet must use an independent analytical four-point reference for the target residue. Agreement between two instruments that share the same amplitude implementation establishes only implementation parity.

Plainly: if this topic is reactivated, do not begin with the full amplituhedron. First ask whether one honest $\mathbb{A}\mathbb{A}\mathbb{A}$ scattering family produces one correct physical boundary while rejecting one false boundary.

## Ownership and Lane Decision

No standalone top-level amplituhedron priority lane is warranted at this stage.

- `quantum-closure` owns this back-burner comparison packet, the effective amplitude, and the history-measure question.
- `mapping-equations`, through `EQ-30` and the finite-window statistical carrier, owns the executable projection, detector/exposure bindings, and residual calculation.
- Reaction and gauge-structure owners consume a validated factorization and event-ledger result; they do not independently redefine the amplitude map.
- The amplituhedron remains a benchmark within the broader positive-geometry scattering question rather than the name of a new $\mathbb{A}\mathbb{A}\mathbb{A}$ physical sector.

Reconsider even the hypothetical four-point packet only after a revisit trigger passes. Reconsider a standalone lane only after that packet then establishes a source-derived positive image, correct physical-boundary residues, cancellation of spurious boundaries, and enough follow-on work to require several independently testable objects. If that threshold is crossed, select the lane name with the operator before canonizing it; a broader positive-geometry scattering label may prove more accurate than naming the lane after one special geometry.

## Discussion Record — 2026-08-26

The discussion reached twelve durable conclusions:

1. The amplituhedron is a positive-geometric formulation, not a physical theory distinct from planar $\mathcal N=4$ super-Yang--Mills theory.
2. Its most promising relation to $\mathbb{A}\mathbb{A}\mathbb{A}$ is as an observer-level target for the pushforward of retained deterministic scattering histories, not as substrate ontology.
3. The strongest first test is four-point factorization with a physical intermediate-assembly boundary, one wrong-channel falsifier, and spurious-boundary cancellation.
4. The work should remain a focused packet under `quantum-closure`, with executable ownership in `mapping-equations`, until a nontrivial result justifies a dedicated lane.
5. Scattering science is performed because controlled incoming states and measured outgoing distributions jointly probe internal structure, interaction channels, transient states, symmetries, and the breakdown of effective descriptions.
6. The amplitudes program is trying to calculate directly from physical on-shell data, classify consistent interactions, expose the hidden geometry or combinatorics of amplitudes, and determine whether locality and unitarity can be recovered as consequences of deeper structure; extension to real-world physics remains an open research objective.
7. In a predictive test, the amplitude calculation precedes comparison with experimental event counts; the amplituhedron, when applicable, supplies the amplitude or loop integrand at the calculation stage rather than replacing the later observable and detector pipeline.
8. Alternative amplitude methods must agree when they compute the same theory, order, and observable; they compete over reach, transparency, stability, and measured computational cost rather than intentionally different physical predictions.
9. Better theory predictions are an indirect conditional payoff: a new method can enable higher orders, higher multiplicities, more stable evaluation, more observables, and stronger consistency checks, but it cannot by itself repair a wrong theory or remove beam, nonperturbative, detector, and experimental uncertainties.
10. Extending the amplituhedron means generalizing its underlying positive-geometric or combinatorial principles to broader and more realistic scattering, not improving an allegedly approximate fit within its original exact domain.
11. The full $\mathbb{A}\mathbb{A}\mathbb{A}$ bridge is deeply downstream and carries high opportunity cost because retained scattering carriers, event ledgers, outcome measures, detector projections, and effective amplitudes must close first.
12. The operator assigns the topic to the back burner and prefers that collider, scattering-amplitudes, and positive-geometry specialists mature the external construction; internal work resumes only after a declared revisit trigger materially lowers the burden or supplies a unique discriminator.

## Promotion Target and Next Artifact

- **Possible promotion targets after validation:** the scattering sections of [Gauge Structure Emergence](../../../../content/markdown/aaa/assemblies/gauge-structure-emergence.md), [Radiation](../../../../content/markdown/aaa/reactions/radiation.md), and the relevant quantum summary only to the exact level established by a future recovered map.
- **Current next artifact:** none authorized. On the first satisfied revisit trigger, prepare a compact go/no-go intake comparing the then-current external construction with the accepted $\mathbb{A}\mathbb{A}\mathbb{A}$ scattering carrier; authorize the four-point comparison packet only after that intake establishes a materially reduced burden and a non-duplicative discriminator.

Closure goal: keep the amplituhedron comparison dormant until ordinary $\mathbb{A}\mathbb{A}\mathbb{A}$ scattering closure and external positive-geometry advances make one bounded, discriminating four-point test both possible and worthwhile.
