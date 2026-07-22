# Noether Braid

## Noether Braid

The **Noether braid** is the reader-facing class of neutral six-architrino assembly scaffolds used by the Noether sea chapters and particle-architecture chapters. It is the first place where the reader should think in terms of a retained six-body branch rather than a pair, point particle, or ordinary orbit.

A Noether braid is not assumed at the outset to be a set of exact binaries. The base object is a polarity-neutral six-body branch whose architrino paths lie on closed support curves with speed factors bounded above and below. In that branch, three negative-polarity architrinos (electrinos) and three positive-polarity architrinos (positrinos) maintain a persistent causal-return ledger.

The simple idea is six persistent strands plus one shared ledger. The hard question is whether the delayed dynamics can keep that ledger coherent: the same six identities, the same active root structure, compatible action and wake rows, and enough stability to serve as a reusable assembly scaffold.

This question is the crux of the theory. The Noether sea, the particle architecture, the mass-response program, and the effective-metric recovery all rest on a retained six-body branch, so the retained-branch question is the central open obligation of this scene. The chapters here define the braid families, carry the shared mathematics, explain the configuration-space hypotheses, and state the requirements a retained branch must satisfy, each at its stated claim level. These chapters do not track the search: status, run results, and candidate rankings are not textbook content, and a result enters only once it is established at its stated claim level.

One working principle of this scene deserves stating openly. When two statements derived along independent routes turn out to describe the same limit — the horizon-alignment condition and the vanishing of the axial polarity dipole, or the same moment cancellation appearing in both a braid record and an Accessory Configuration — that coincidence is treated as a seam of the underlying ontology, not as an accident to admire. In a correct substrate theory one mechanism surfaces in many observer-level places precisely because it is one mechanism, so each multi-route convergence is logged, the common cause is hunted, and the identified mechanism is then required to make at least one new prediction beyond the statements it unified. Convergences that resist unification are equally valuable, because they mark places where the ontology is still missing a part.

### Neutral-Braid Base

The neutral braid is the broad six-architrino case before a family member imposes a binary partition or geometric relation. Its polarity inventory contains three electrinos and three positrinos, indexed by $i\in\{1,\ldots,6\}$ with signs $\sigma_i\in\{+1,-1\}$ satisfying

$$
\#\{i:\sigma_i=+1\}
=
\#\{i:\sigma_i=-1\}
=3,
\qquad
\sum_{i=1}^{6}\sigma_i=0.
$$

Equivalently, the compact inventory is $3\epsilon_+ + 3\epsilon_-$. This ledger is imposed before any binary partition, member assignment, or reference fixture. Each architrino has three attractive opposite-polarity channels and two repulsive same-polarity channels among the other five sites. The $3+2$ count is an inventory fact, not a compressed acceleration law; the net acceleration must still be assembled from the retained causal roots and path history.

Before a family chart is selected, the intrinsic path of architrino $i$ may be represented by a closed arclength curve

$$
\mathbf Y_i:\mathbb{R}/L_i\mathbb{Z}\to\mathbb{R}^3,
\qquad
\left\|\mathbf Y_i'(s)\right\|=1,
$$

with physical trajectory

$$
\mathbf X_i(T)=\mathbf Y_i(\lambda_i(T)),
\qquad
\frac{d\lambda_i}{dT}(T)=\nu_i(T),
\qquad
0<\nu_-\leq\nu_i(T)\leq\nu_+<\infty.
$$

Thus the base class permits changing support geometry, nonuniform speed, changing local curvature, and delayed multi-channel response without first reducing the motion to exact binary rows. A retained neutral braid must still return to a closed causal ledger within the declared recovery tolerance. Every A, B, or C component braid inherits this neutral inventory before adding its member coordinates.

The prescribed geometry is organized by [Braid Taxonomy](../../../../markdown/aaa/noether-braid/braid-taxonomy.md). Its current map is:

| Term | Definition | Additional structure |
| --- | --- | --- |
| [**neutral braid**](#neutral-braid-base) | The broad six-architrino neutral case before any required binary grouping or radial organization. | Polarity balance and causal-return bookkeeping. |
| [**Family A**](../../../../markdown/aaa/noether-braid/braid-family-a.md) | One braid whose three binary axes are orthogonal at the near-rest endpoint and converge toward the group-translation direction under the prescribed response. | `A1` is the zero-axial-offset subset, `A2` is the fully symmetric member, and `A3` carries the general axial/transverse decomposition. |
| [**Family B**](../../../../markdown/aaa/noether-braid/braid-family-b.md) | One braid whose three binary midpoints and axes coincide. | `B1` is the rigid common-frequency member. |
| [**Family C**](../../../../markdown/aaa/noether-braid/braid-family-c.md) | An assembly composed of two complete B1 braids. | `C1` has the same circulation sense; `C2` has the opposite circulation sense. |

These definitions name prescribed coordinate classes, not retained-branch existence. Stable all-pairs roots, recovery after perturbation, and observer-export behavior are theorem targets that must be certified by the branch ledger rather than read back into a family identifier. The broader diagnostic axes and search variables remain in [Noether Braid Configuration Space](../../../../markdown/aaa/noether-braid/noether-braid-configuration-space.md).

The word **braid** names the six retained worldline strands together with their shared causal-return ledger. It does not by itself assert that the branch already carries a protected mathematical braid-group class. A protected braid, linking, framing, or chirality class is extra structure to be certified by the [assembly topological charge](../../../../markdown/aaa/noether-braid/noether-braid-topological-charge.md) program.

Canonical reader-facing prose uses **Noether braid** for the assembly class, **neutral braid** for the base case, and the family/member identifiers for prescribed geometry. Durable symbols and internal runtime identifiers may still contain `NS`, `noether_braid`, or `nested-shell-braid`; those strings are stable implementation identifiers, not a second taxonomy. The braid's dynamic envelope geometry is developed separately in [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md), while metric-level translation belongs to [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md).

### Simple Picture

A Noether braid is a candidate way for six architrinos to keep coming back into a repeatable causal relationship. The important object is not a drawn knot or a fixed material ring. It is the full branch record: which architrinos are present, which causal wakes return, which root identities stay active, and which conserved or nearly conserved quantities survive around the cycle.

That is why the family identifiers are deliberately neutral. `A1`, `A2`, `A3`, `B1`, `C1`, and `C2` point to explicit table rows; the identifiers do not themselves imply stability, mass response, photon behavior, or Noether sea dominance. Those claims require retained branch certificates and downstream export rows.

### Document Role

This chapter is the overview and family map for the Noether braid stack. It defines the word **braid**, routes the coordinate taxonomy, and explains why family identifiers are geometry classes rather than retained-branch results.

It does not carry the detailed family derivations, select a frequency family, assign proof dispositions, compute assembly topological charge, or export Lorentz clock/ruler deformation by itself. Neighboring chapters consume the branch record named here, and they play distinct roles. The taxonomy defines the coordinate system and member rows; the requirements chapter states the realization-independent proof contract; the mathematics chapter carries the machinery shared by every realization; the configuration-space chapter carries broader diagnostic axes and search variables; the analysis chapter works one candidate frequency family exactly; the export chapters describe what a retained branch would hand to the rest of the theory.

| Role | Chapter | What it owns |
| --- | --- | --- |
| Requirements | [Braid Recovery Requirements](../../../../markdown/aaa/noether-braid/braid-recovery-requirements.md) | The realization-independent retention-certificate shape, its base-family instantiation, proof-burden order, and recovery-target inventory. |
| Taxonomy | [Braid Taxonomy](../../../../markdown/aaa/noether-braid/braid-taxonomy.md) | The canonical coordinates, family/member identifiers, master tables, and prescribed response endpoints. |
| Family definition | [Braid Family A](../../../../markdown/aaa/noether-braid/braid-family-a.md) | The shared Family-A geometry, A1 and A3 variants, the A2 definition, and their coordinate-locus relations. |
| Family definition | [Braid Family B](../../../../markdown/aaa/noether-braid/braid-family-b.md) | The exact B1 path geometry, coordinate boundaries, axial-translation specialization, and Family-A boundary. |
| Family definition | [Braid Family C](../../../../markdown/aaa/noether-braid/braid-family-c.md) | The exact two-B1 composition chart, C1/C2 circulation relation, derived axis offset, and physical-mapping boundary. |
| Configuration space | [Noether Braid Configuration Space](../../../../markdown/aaa/noether-braid/noether-braid-configuration-space.md) | The evidence-level terms and supplementary rank-three angular-momentum-frame diagnostics outside the canonical taxonomy. |
| Braid A1 dynamics and interpretation | [Braid A1 Dynamics and Interpretation](../../../../markdown/aaa/noether-braid/braid-a1-dynamics.md) | A1 retention questions, closure labels, cadence retuning, scaling, alignment, and downstream hypotheses. |
| A2 symmetry and return response | [A2 Symmetry and Return Response](../../../../markdown/aaa/noether-braid/braid-a2-symmetry-and-return-response.md) | The A2 invariant-channel theorem, two-ring geometry, dipole identity, momentum screw, and return-response analysis. |
| Mathematics | [Braid Mathematics](../../../../markdown/aaa/noether-braid/braid-mathematics.md) | The shared machinery: transverse speed-budget lemmas, eigen-braid spectrum framing, fold-set action quantization as hypothesis, and Accessory Configuration moment analysis. |
| Analysis methodology | [Candidate Braid Analysis Methodology](../../../../markdown/aaa/noether-braid/braid-analysis-methodology.md) | The common causal-wake map, internal and external probes, energy-ledger interface, sampling method, and candidate-grading rules. |
| Analysis | [A3.3 Doubling-Frequency Resonance Lock](../../../../markdown/aaa/noether-braid/braid-a3-3-doubling-frequency-lock.md) | The A3.3 $4{:}2{:}1$ candidate, including its zero-axial-offset A1.3 locus, and its lock analysis. |
| Export | [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md) | The family-general envelope and observer-export interface: dynamic exclusion envelope, sea-interface diagnostic, canonical geometry variables, and the Lorentz projection. |
| Export | [Noether Braid Topological Charge](../../../../markdown/aaa/noether-braid/noether-braid-topological-charge.md) | Classification of retained branch charts. |

A first reading should follow the table order: what a retained braid must satisfy, then the coordinate taxonomy and Family-A, Family-B, and Family-C definitions, then the broader configuration space and member specialists, then shared mathematics, the common analysis method, and candidate analyses, with the export chapters as the interface layer. Search progress is not tracked in these chapters.

### Medium-Selection Burden

Branch retention is not the same question as Noether sea primacy. A retained Noether braid branch would show that one neutral assembly class can persist. It would not yet show that this class is the dominant ambient structure in the universe, because many other architrino assemblies might also be imagined.

The stronger claim is a selection theorem over candidate assembly classes. A class can serve as the ambient Noether sea population only if it can be retained as a branch and also form a dense, locally neutral, convergent, transparent, pressure-bearing, and constitutively useful medium. In the notation of [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md#composition), any proposed Family-A route must pass the ambient selection residual while competing assembly classes either fail, remain local matter or reaction branches, or appear only as higher-energy, short-lived, or environment-specific excitations.

This distinction protects the proof order. The neutral-braid row asks whether the six-site architecture can close; each family/member row adds its own coordinate constraints. The Noether sea selection row asks why one retained member should dominate the weak homogeneous medium rather than a different assembly population. A particle-like success, a metric-like export, or an appealing exclusion volume is therefore not enough by itself; the same branch class must also supply the statistical abundance, far-field cancellation, packing, and shared-response properties needed by the Noether sea.

## Braid Recovery Requirements

Before any particular braid geometry is featured, the theory owes the reader a contract: what must a candidate braid actually deliver? This chapter states that contract once, independently of which realization — one support band, three ordered bands, or another family member — eventually satisfies it. The requirements come in two layers. The retention layer asks whether a six-architrino branch can persist at all as one coherent causal-return record. The recovery layer asks what a retained branch must then hand to the rest of physics: the clocks, rulers, masses, charges, spectra, statistics, forces, and cosmological histories that general relativity, quantum theory, the Standard Model, and the $\Lambda$CDM-era observations already describe at the observer level.

Stating the requirements realization-independently protects the proof order. A realization chapter may carry beautiful exact structure and still leave every row below open; a recovery chapter may state a sharp observer-level target that no current branch can yet consume. Keeping the contract in one place prevents both failure modes from hiding: every claim in the braid scene can be checked against this chapter's ladder, and every ladder row names the chapter where its detailed burden lives.

Nothing in this chapter is a retained-branch result. Every row below is an obligation — a theorem target, closure target, or comparison target at its stated level — and proof dispositions are not carried in this chapter.

### Document Role

This chapter owns the realization-independent statement of the braid proof burden: the retained-branch certificate row structure, the first-failure reporting discipline, the ordered proof-burden ladder, and the full recovery-target inventory consumed by the downstream theory. It deliberately owns no geometry and no evidence. The neutral six-body base lives in [Noether Braid](../../../../markdown/aaa/noether-braid/noether-braid.md#neutral-braid-base); prescribed member definitions live in [Braid Taxonomy](../../../../markdown/aaa/noether-braid/braid-taxonomy.md), [Braid Family A](../../../../markdown/aaa/noether-braid/braid-family-a.md), and [Braid Family B](../../../../markdown/aaa/noether-braid/braid-family-b.md). The shared mathematical machinery lives in [Braid Mathematics](../../../../markdown/aaa/noether-braid/braid-mathematics.md). Proof dispositions are not carried in this chapter; broader diagnostic axes live in [Noether Braid Configuration Space](../../../../markdown/aaa/noether-braid/noether-braid-configuration-space.md).

A reader should use this chapter the way an engineer uses a requirements specification: to know what any proposed design must eventually satisfy, and to recognize when a reported success addresses one row while leaving the blocking rows untouched.

### The Retained-Branch Certificate

The retention question is the same for every family member. A candidate branch $B$ over a test window $W$ is a claim that six specific architrinos — three electrinos and three positrinos, the polarity inventory $3\epsilon_+ + 3\epsilon_-$ — keep returning to one repeatable causal relationship: same six identities, same active root structure, compatible action and wake rows, and enough stability to serve as a reusable assembly scaffold. The certificate makes that claim auditable by splitting it into rows that must all close on one ledger identity:

$$
\mathsf{R}(B,W)
=
\left(
\mathsf{Inventory},
\mathsf{Curves}^{\nu},
\mathsf{Support},
\mathsf{Root}^{\nu},
\mathsf{Tail}^{\nu},
\mathsf{Dynamics}^{\nu},
\mathsf{Action}_{\Gamma}^{\nu},
\mathsf{Noether}^{\nu},
\mathsf{Event}^{\nu},
\mathsf{Stability}^{\nu},
\mathsf{Convergence},
\mathsf{Status}
\right)
$$

The inventory row fixes which six architrinos are present and their polarity balance. The curve and support rows fix the closed support geometry and its declared band structure — this is the only place where the family member enters, as the declared support descriptor. The root row demands the actual retained causal roots for all ordered distinct source pairs, thirty in the six-body case, with delays, Jacobian floors, transmitter-side acceleration weights, and lines of action assembled from the true path histories rather than from a compressed acceleration law. The tail, dynamics, action, and Noether rows demand that the delayed accelerations, the action bookkeeping, and the conserved-quantity ledger all balance on the same record. The event and stability rows demand that discrete branch events are logged and that the branch returns after perturbation, and the convergence row demands that the far-population wake sums the record depends on actually converge.

Retention is the conjunction, never a partial credit:

$$
\mathrm{Retain}(B,W)
\Longleftrightarrow
P_{\mathrm{inventory}}
\wedge
P_{\mathrm{curves}}
\wedge
P_{\mathrm{support}}
\wedge
P_{\mathrm{root}}
\wedge
P_{\mathrm{tail}}
\wedge
P_{\mathrm{dyn}}
\wedge
P_{\Gamma}
\wedge
P_{\mathrm{Noether}}
\wedge
P_{\mathrm{event}}
\wedge
P_{\mathrm{stab}}
\wedge
P_{\mathrm{conv}}
$$

Every predicate must use the same source-pair policy, same-transmitter policy, memory depth, support descriptor, action convention, event interval, and inventory ledger. If any row changes those conventions, the result is a ledger mismatch, not a retention result. The neutral-braid statement of this certificate, with the base-family notation, is given in [Neutral Braid](../../../../markdown/aaa/noether-braid/braid-recovery-requirements.md#base-family-certificate-instantiation); any prescribed taxonomy member inherits the same rows and may compress the all-pairs ledger only after its reduction map proves how the compressed entries are inherited.

### The First-Failure Ladder

A certificate that fails should fail informatively. The reporting discipline is to identify the first blocking row, in the fixed row order above, together with the data needed to act on it:

$$
\mathsf{F}(B,W)
=
\left(
\mathrm{first\_failed\_row},
\mathrm{ledger\_id},
\mathrm{margin},
\mathrm{blocking\_packet},
\mathrm{repair\_or\_rejection}
\right)
$$

The ladder shape carries the scene's central reading rule. Rows through convergence block branch retention; case-reduction and observer-export rows classify downstream structure only after the required rows close. A favorable Lorentz, photon, topology, mass-map, or envelope-geometry diagnostic therefore cannot rescue an open root, tail, dynamics, action, event, stability, or convergence row — and symmetrically, a negative diagnostic remains scoped to the branch chart and assumptions that produced it. The margin entry keeps quantitative failures honest: a row that fails by a certified interval is worth more to the program than a row that merely lacks evidence, because it either rejects a chart or names the exact quantity a repair must move.

### Proof-Burden Order

The retention certificate is the first rung of a longer ladder. The burdens close in a fixed order, and a packet can supply evidence for one rung while leaving the next rung open. The realization-independent ladder is:

| Order | Burden | What must close on the same record |
| --- | --- | --- |
| 1 | Rest branch retention | The full certificate conjunction in the declared rest environment. |
| 2 | Noether sea embedded retention | The rest rows plus the local population-response row from like assemblies, for branches whose stability is supplied by the ambient medium rather than by isolation. |
| 3 | Moving observer export | Transport, response-center, clock, ruler, energy/action, and preferred-frame-leakage rows for nonzero group velocity. |
| 4 | Assembly consumer rows | The recovery-target inventory below, each target consuming the retained branch record rather than substituting for it. |

Two consequences of this ordering deserve emphasis. First, isolation is a limiting seed chart, not the physical situation: a branch that fails in the Euclidean void and closes only with the embedded population-response row is still a physical success, because the universe supplies the medium. Second, consumer success never travels backward. A recovered spectrum, acceleration law, or metric export classifies a retained branch; it does not retroactively prove retention, and it earns no claim-level promotion for the rungs beneath it.

### Recovery-Target Inventory

A retained, transportable braid branch is the theory's proposed common cause for a wide inventory of observer-level physics. This section states that inventory once. Each row names the target, the requirement in realization-independent form, and the chapter that owns the detailed derivation burden. The rows are stated from the perspective of the working theory; their individual claim levels — derivation, closure target, effective summary, or comparison target — are carried by the owning chapters.

#### Relativistic and Gravitational Targets

| Target | Requirement | Owning chapters |
| --- | --- | --- |
| Lorentz clock/ruler export | A moving retained branch must retune its internal record so that clock rate and envelope contraction collapse to the observer-calibrated $\gamma_0(v_{\mathrm{eff}})=(1-v_{\mathrm{eff}}^2/c_0^2)^{-1/2}$ in the homogeneous weak-field limit, with preferred-frame leakage bounded below current test sensitivity. | [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md), [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md) |
| Effective metric and weak-field gravity | The braid-bearing Noether sea must export an effective metric whose weak clock row reproduces $d\tau_{\mathcal A}/dt\approx1-U_N/c_0^2-\|\mathbf w\|^2/(2c_0^2)$, with the Newtonian potential match, effective coupling, and PPN coefficients derived from one same-record constitutive response rather than fit separately. | [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md), [General Relativity](../../../../markdown/aaa/spacetime/general-relativity.md), [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md) |
| Strong-field and horizon behavior | The terminal-alignment condition of the braid family must recover horizon phenomenology — darkness, entropy counting over alignment-restricted closure labels, and singularity resolution — as branch-boundary behavior rather than as imported geometry. | [Black Holes](../../../../markdown/aaa/spacetime/black-holes.md), [Singularity Resolution](../../../../markdown/aaa/spacetime/singularity-resolution.md) |
| Decay-rate dilation and the clock hypothesis | A moving unstable retained branch must dilate its decay and transaction rates by the same $1/\gamma_0(v_{\mathrm{eff}})$ as its clock export — the storage-ring muon-lifetime record and rotor time-dilation measurements are the tested benchmarks — with the candidate mechanism that internal cadence, and therefore the pacing of action-transaction events, slows with the clock. The residual acceleration dependence of decay rates must remain below the clock-hypothesis bounds (pure $1/\gamma$ behavior verified at accelerations of order $10^{18}\,g$ in storage rings), which bounds how much braid-geometry strain per unit acceleration may leak into transaction rates. | [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md), [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md) |

#### Quantum and Standard-Model Targets

| Target | Requirement | Owning chapters |
| --- | --- | --- |
| Mass map | Observed particle masses must be extracted as effective inertial response of retained branches — small observed mass from large shielded interior energy — with the extraction rule derived from the same branch record used for retention. | [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md) |
| Fermion generations | The three-generation ladder must be recovered as a structural ladder of the braid family — the working reading is a shielding-tier ladder — with the generation count derived from the delayed dynamics rather than postulated. | [A1 Shielding](../../../../markdown/aaa/noether-braid/braid-a1-dynamics.md#a1-shielding-and-fermion-generations), [Muon and Tau](../../../../markdown/aaa/assemblies/fermions/muon-tau.md) |
| Spin-statistics and exchange | Fermionic antisymmetry and bosonic shared occupation must be recovered from braid envelope geometry plus an exchange sign consumed from the same retained row that supplies spinor closure, not from a separately selected bookkeeping sign. | [Fermi-Dirac and Bose-Einstein Statistics](../../../../markdown/aaa/quantum/fermi-dirac-and-bose-einstein-statistics.md), [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md) |
| Photon and Maxwell recovery | The photon channel must be recovered as a propagating assembly of released action history whose superposed delayed potentials reproduce Maxwell behavior, transverse polarization, and propagation at the recovered signal speed. | [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md), [Radiation](../../../../markdown/aaa/reactions/radiation.md) |
| Strong force and color | Color bookkeeping, gluon-like exchange, and confinement must be recovered from braid substructure and its interaction channels, including why isolated color-carrying assemblies are unstable. | [Color Charge and SU(3)](../../../../markdown/aaa/assemblies/fermions/color-charge-su3.md), [Gluons](../../../../markdown/aaa/assemblies/bosons/gluons.md), [Nucleon Structure](../../../../markdown/aaa/nuclear-atomic/nucleon-structure.md) |
| Weak channel | Weak-interaction phenomenology — short range, flavor change, mixing structure — must be recovered from near-field braid interactions without a primitive massive mediator, with the mediator masses and mixing angle emerging as assembly properties. | [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md), [Weak Mixing Angle](../../../../markdown/aaa/assemblies/fermions/weak-mixing-angle.md) |
| Net-charge quantization | Observer-level electric charge must arrive in the observed quantized units as a consequence of admissible dressing inventories over the braid's net polarity inventory, not as a primitive label. | [Quantum Number Mapping](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md), [Architrino](../../../../markdown/aaa/foundations/architrino.md#polarity-and-electric-bookkeeping) |
| Atomic spectra | Atomic energy levels and spectral lines must be recovered as electron-assembly resonance envelopes in the structured nuclear and Noether sea wake environment, with level spacing inherited from the action-transaction ledger. | [Atomic Spectra](../../../../markdown/aaa/nuclear-atomic/atomic-spectra.md), [Atomic Structure](../../../../markdown/aaa/nuclear-atomic/atomic-structure.md) |

#### Cosmology-Era Targets

The fixed-void discipline makes the cosmological rows unusually sharp: with no expanding void available, every redshift-linked observable must be recovered from transport through the evolving Noether sea.

| Target | Requirement | Owning chapters |
| --- | --- | --- |
| Redshift transport rows | Surface-brightness dimming $(1+z)^{-4}$, light-curve time dilation $(1+z)$, and $T_{\mathrm{CMB}}(z)=T_0(1+z)$ must be recovered from transport physics rather than from tired-light energy loss. | [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md), [Cosmology Reconstruction](../../../../markdown/aaa/cosmology/cosmology-reconstruction.md) |
| Era ladder | The observationally anchored era sequence — nucleosynthesis abundances, recombination and the CMB, structure formation — must be recovered with an effective scale history derived from the mass map and Noether sea response coefficients. | [BBN Constraints](../../../../markdown/aaa/cosmology/BBN-constraints.md), [CMB](../../../../markdown/aaa/cosmology/CMB.md), [Structure Formation](../../../../markdown/aaa/cosmology/structure-formation.md) |
| Dark-sector accounting | The phenomena attributed to dark matter and dark energy must be recovered as Noether sea population, response, and gradient effects, or explicitly scoped as open residuals. | [Dark Matter](../../../../markdown/aaa/cosmology/dark-matter.md), [Dark Energy](../../../../markdown/aaa/cosmology/dark-energy.md) |

### Noether Sea Selection Burdens

The recovery rows above mostly consume one retained branch. The medium rows consume a population, and they add a burden that no single-branch success can discharge: the featured braid class must be shown to dominate the ambient medium. A class can serve as the Noether sea population only if it passes every entry of the selection residual defined in [Noether Sea](../../../../markdown/aaa/spacetime/noether-sea.md#composition): retained-branch closure, local polarity neutrality, convergence of the far-population wake sum, dense packing without uncontrolled branch disruption, weak homogeneous transparency, a shared constitutive response across the refractive, clock, stress, and metric channels, compatibility with the particle-building program, and a production or recycling route that supplies sufficient abundance.

Transparency is a bounded-response condition, not zero coupling: the medium must keep direct loss, scattering, and preferred-frame visibility small while still supplying the constitutive response that clocks, photon transport, matter response, and neutrino-like propagation are recovered from. A candidate class that decouples entirely passes neither side of that check. The selection burden is therefore comparative — the featured class must pass while competing assembly classes either fail a row or are classified as localized matter, radiation, reaction, or strong-field branches — and it remains open even after any single branch is retained.

### Reading Discipline

Three rules keep this contract usable. First, requirements are not evidence: adding, sharpening, or reorganizing rows in this chapter changes no proof status anywhere. Second, claim levels travel with their owning chapters: a row stated here in working-theory voice may be a derivation, a closure target, or a comparison target at its source, and the source governs. Third, the ladder is ordered: any reported success should be located on the proof-burden ladder before it is celebrated, and any reported failure should be located on the first-failure ladder before it is generalized.

### Base-Family Certificate Instantiation

This section instantiates the general contract for the base family, the **neutral braid** — the six-architrino, polarity-balanced case whose full definition follows in [Noether Braid](../../../../markdown/aaa/noether-braid/noether-braid.md#neutral-braid-base); the inventory facts used here (three electrinos, three positrinos, thirty ordered distinct source pairs) are all a reader needs in advance. The neutral braid claim is a theorem target, not a retained-branch result. A candidate branch $B$ over a test window $W$ is retained only if the required rows close on one ledger identity. The master certificate can be summarized as

$$
\mathsf{R}_{\mathrm{NB}}(B,W)
=
\left(
\mathsf{Inventory},
\mathsf{Curves}^{\nu},
\mathsf{Support},
\mathsf{Root}^{\nu},
\mathsf{Tail}^{\nu},
\mathsf{Dynamics}^{\nu},
\mathsf{Action}_{\Gamma}^{\nu},
\mathsf{Noether}^{\nu},
\mathsf{Event}^{\nu},
\mathsf{Stability}^{\nu},
\mathsf{Convergence},
\mathsf{Status}
\right)
$$

The corresponding retention predicate is

$$
\mathrm{Retain}_{\mathrm{NB}}(B,W)
\Longleftrightarrow
P_{\mathrm{inventory}}
\wedge
P_{\mathrm{curves}}
\wedge
P_{\mathrm{support}}
\wedge
P_{\mathrm{root}}
\wedge
P_{\mathrm{tail}}
\wedge
P_{\mathrm{dyn}}
\wedge
P_{\Gamma}
\wedge
P_{\mathrm{Noether}}
\wedge
P_{\mathrm{event}}
\wedge
P_{\mathrm{stab}}
\wedge
P_{\mathrm{conv}}
$$

Every predicate in this conjunction must use the same source-pair policy, same-transmitter policy, memory depth, support descriptor, action convention, event interval, and inventory ledger. If any row changes those conventions, the status is a ledger mismatch rather than a retention result.

The root row begins with all ordered distinct source pairs. With $I=\{1,\ldots,6\}$,

$$
\Pi_{\mathrm{all}}
=
\{(i,j)\in I\times I:i\ne j\},
\qquad
|\Pi_{\mathrm{all}}|=30
$$

Same-transmitter rows $(i,i)$ are governed by the declared same-transmitter policy and are deliberately excluded from $\Pi_{\mathrm{all}}$; the ordered distinct-pair count is therefore $6\times5=30$. The $3$ attractive and $2$ repulsive transmitter-site counts for each receiver are inventory facts, not a compressed acceleration law. The acceleration contribution must still be assembled from the actual retained causal roots, delays, Jacobian floors, transmitter-side acceleration weights, and line-of-action vectors for these ordered pairs. A prescribed taxonomy member can reduce this ledger only after its reduction map proves how the compressed entries are inherited from the all-pairs ledger.

The certificate should report the first blocking row as

$$
\mathsf{F}_{\mathrm{NB}}(B,W)
=
\left(
\mathrm{first\_failed\_row},
\mathrm{ledger\_id},
\mathrm{margin},
\mathrm{blocking\_packet},
\mathrm{repair\_or\_rejection}
\right)
$$

Rows through convergence block branch retention. Case-reduction and observer-export rows classify downstream structure only after the required neutral rows close. Therefore a favorable Lorentz, photon, topology, mass-map, or shell-geometry diagnostic cannot rescue an open root, tail, dynamics, action, event, stability, or convergence row.

Reading discipline for future diagnostics on this chart, retained from earlier work at method level: a resolved causal-root ledger does not imply force closure; inventory attraction bias does not imply force closure; resolved positive-delay root rows do not imply force closure; and sampled phase or polarity-phase improvements do not imply retention. A negative result for one rigid carrier hypothesis is not a rejection of the neutral braid, any A/B/C member, or the bounded-speed, controlled-self-hit, fold-layer, and medium-response programs. No measured residuals are carried in this chapter: results enter only when established, with instrument and claim level stated.

## Braid Taxonomy

This chapter describes prescribed Noether braid geometries through explicit coordinates. The taxonomy has three levels: assembly composition, individual braid, and individual binary.

Each taxonomy member receives a neutral identifier consisting of a family letter and a member number, such as `A1`, `A2`, `A3`, or `B1`. A decimal suffix identifies a constrained variant of a member, such as `A1.1`. The identifier carries no geometric meaning. The member's table entries and Borg depiction define the geometry. Family and member names are optional aliases.

This is a geometry-and-motion taxonomy. It does not establish that a prescribed configuration is generated, retained, or stable under the EOM solver.

### Assembly Composition

Assembly composition describes how complete braid records are combined.

| Coordinate | Meaning |
| --- | --- |
| Braid count $N_{\mathcal B}$ | Number of complete braids in the assembly. |
| Relative braid-center displacement | Position of each braid center relative to the assembly center when $N_{\mathcal B}>1$. |
| Relative orientation | Orientation of each braid record relative to the assembly reference frame. |
| Relative phase | Timing offset between braid records. |
| Relative circulation | Whether the braid records advance with the same or opposite circulation sense. |

### Individual Braid

One Noether braid consists of three neutral binaries. Each binary contains one electrino and one positrino. Other polarity pairings are outside the present taxonomy.

The overarching translation characteristic is the speed of the complete assembly group. Let $\mathbf X_{\mathrm{grp}}(T)$ be the declared translation center of the prescribed assembly group. Its group velocity and group translation speed are

$$
\mathbf V_{\mathrm{grp}}(T)=\frac{d\mathbf X_{\mathrm{grp}}}{dT}
$$

and

$$
s_{\mathrm{grp}}(T)=\left\|\mathbf V_{\mathrm{grp}}(T)\right\|
$$

For a one-braid member, $\mathbf X_{\mathrm{grp}}$ is the declared center of that braid. For a two-braid member, it is the declared center of the complete two-braid assembly. The group translation speed is distinct from the internal orbital speeds of the six architrinos in each braid.

The braid-level record contains this overarching characteristic and the coordinate collections obtained from its three binaries:

| Coordinate collection | Definition |
| --- | --- |
| Group translation speed $s_{\mathrm{grp}}$ | Translation speed of the complete one-braid or two-braid assembly group. |
| Binary midpoint data | The ordered midpoint vectors $(\mathbf c_1,\mathbf c_2,\mathbf c_3)$. A member row may constrain their relation without redefining the individual midpoint coordinate. |
| Axis data | The ordered binary-axis unit vectors $(\hat{\mathbf n}_1,\hat{\mathbf n}_2,\hat{\mathbf n}_3)$. The vectors are recorded directly without assigning an axis-structure class. |
| Circulation data | The ordered circulation senses of the three binaries. |

Many more braid geometries may be investigated. They are not enumerated here.

### Individual Binary

For binary $a\in\{1,2,3\}$, let the endpoint positions in the Euclidean void be $\mathbf X_{a1}(T)$ and $\mathbf X_{a2}(T)$. Define the binary midpoint and half-separation vector by

$$
\mathbf c_a(T)=\frac{\mathbf X_{a1}(T)+\mathbf X_{a2}(T)}{2}
$$

and

$$
\mathbf d_a(T)=\frac{\mathbf X_{a1}(T)-\mathbf X_{a2}(T)}{2}
$$

Given an oriented binary-axis unit vector $\hat{\mathbf n}_a(T)$, choose the endpoint and axis orientations so that the axial coordinate is nonnegative, and define

$$
h_a(T)=\mathbf d_a(T)\mathbin{\cdot}\hat{\mathbf n}_a(T)
$$

and

$$
\rho_a(T)=\left\|\mathbf d_a(T)-h_a(T)\hat{\mathbf n}_a(T)\right\|
$$

Here $h_a$ is the **axial half-separation**, and $\rho_a$ is the **transverse orbit radius**. The binary radius is the endpoint distance from the binary midpoint:

$$
R_a(T)=\left\|\mathbf d_a(T)\right\|
$$

The axial and transverse coordinates decompose that radius according to

$$
R_a^2(T)=h_a^2(T)+\rho_a^2(T)
$$

Frequency and phase belong to the individual binary. Every binary phase is specified relative to the same braid-level zero point.

The binary coordinate columns are:

| Coordinate | Meaning |
| --- | --- |
| Radius $R_a$ | Endpoint distance from the binary midpoint $\mathbf c_a$. |
| Frequency $f_a$ | Repetition frequency of the prescribed binary motion. |
| Phase $\phi_a$ | Phase of binary $a$ relative to the common braid-level zero point. |

The coordinate limits have direct geometric meanings:

- $\rho_a=0$: both endpoints remain on the binary axis.
- $h_a=0$: both endpoints lie in the plane through $\mathbf c_a$ orthogonal to the binary axis.
- $h_a>0$ and $\rho_a>0$: the endpoints occupy separated transverse orbits around the binary axis.

If a display requires an angular coordinate, it may derive

$$
\alpha_a(T)=\operatorname{atan2}\!\left(h_a(T),\rho_a(T)\right)
$$

This angle is not a primary taxonomy coordinate.

Only rigid time dependence is considered in the taxonomy table as an idealized characteristic. Other possible time dependences, including breathing, precession, and other deformations, lie outside its present scope.

### Family A: Noether Core

Family A is the original Noether core geometry. Its member distinctions and symmetry relationships are developed in [Braid Family A](../../../../markdown/aaa/noether-braid/braid-family-a.md). Let $\hat{\mathbf n}_a^{(0)}$ denote its three binary axes at the near-rest endpoint. These axes are mutually orthogonal:

$$
\hat{\mathbf n}_a^{(0)}\mathbin{\cdot}\hat{\mathbf n}_b^{(0)}=\delta_{ab}
$$

The near-rest axes define the equal-component braid direction

$$
\hat{\mathbf u}_A
=
\frac{
\hat{\mathbf n}_1^{(0)}
+
\hat{\mathbf n}_2^{(0)}
+
\hat{\mathbf n}_3^{(0)}
}{\sqrt3}
$$

Family A translates along this direction:

$$
\mathbf V_{\mathrm{grp}}(T)
=
s_{\mathrm{grp}}(T)\hat{\mathbf u}_A
$$

Let $\lambda_A\in[0,1]$ denote the prescribed Family-A flattening coordinate. The near-rest endpoint is $\lambda_A=0$. As $\lambda_A$ increases, the three binary axes converge toward the translation direction. The flat endpoint is

$$
\hat{\mathbf n}_1(1)
=
\hat{\mathbf n}_2(1)
=
\hat{\mathbf n}_3(1)
=
\hat{\mathbf u}_A
$$

The combined binary envelope is nearly spherical at the near-rest endpoint in a weak-gradient deep-space environment. Increasing group translation speed or gravitational gradient increases $\lambda_A$, compresses the envelope along $\hat{\mathbf u}_A$, and makes the envelope increasingly oblate. The event-horizon response endpoint and the photon-channel response endpoint use the flat limit $\lambda_A=1$. These endpoint assignments are prescribed Family-A taxonomy; deriving the response path and either physical channel from an EOM-solver record remains open.

`A1` is the zero-axial-offset Family-A member. All three binary midpoints coincide with the braid center, and each binary has

$$
\mathbf c_a(T)=\mathbf X_{\mathrm{grp}}(T),
\qquad
h_a=0,
\qquad
\rho_a=R_a.
$$

Thus the electrino and positrino of binary $a$ traverse the same geometric circle in the plane through the braid center orthogonal to $\hat{\mathbf n}_a$, while occupying antipodal points at every common time. The phrase "same plane" applies within each binary; the three Family-A binary planes remain distinct whenever their axes are distinct.

The A1 indices $a\in\{1,2,3\}$ are persistent record identities, not a sorting by radius, frequency, speed, or any derived dynamical role. Their radii satisfy

$$
R_a>0,
\qquad
a\in\{1,2,3\},
$$

and may be assigned independently, including equal values. The three frequencies are also independently assignable. If an evolved branch later supplies a field-speed carrier, a boundary-leading path, or another distinguished role, that role is a diagnostic derived from the branch record and does not relabel the binaries.

`A2` is the fully symmetric Family-A member. Its three binaries have equal radii, equal axial half-separations, equal transverse orbit radii, equal frequencies, one circulation sense, and phases separated by $120^\circ$. Thus a $120^\circ$ rotation about $\hat{\mathbf u}_A$ cyclically permutes the three binaries without selecting one of them.

`A3` is the general axial-decomposition Family-A member. Its three binary midpoints coincide with the braid center, while each persistent binary independently carries nonnegative $h_a$ and $\rho_a$ satisfying $R_a^2=h_a^2+\rho_a^2$. When $h_a>0$ and $\rho_a>0$, the two endpoint orbit centers are separated by $2h_a\hat{\mathbf n}_a$. A1 is the exact zero-axial-offset subset of A3:

$$
A1.n
=
A3.n\mathbin{\cap}
\left\{
h_1=h_2=h_3=0,
\quad
\mathbf c_1=\mathbf c_2=\mathbf c_3=\mathbf X_{\mathrm{grp}}
\right\}
$$

for each shared constrained-variant suffix $n\in\{1,2,3,4\}$. The unsuffixed A1 member is the corresponding zero-axial-offset subset of unsuffixed A3. A2 is selected by its cyclic symmetry constraints and occupies a symmetric locus within the A3 coordinate space; it is not renamed by this subset relation.

### Family B: Coincident Binary Axes

Family B contains one-braid members whose three binary axes coincide. Its exact path geometry and coordinate boundaries are developed in [Braid Family B](../../../../markdown/aaa/noether-braid/braid-family-b.md). The B1 chart uses one common binary midpoint at the braid center,

$$
\mathbf c_1(T)
=
\mathbf c_2(T)
=
\mathbf c_3(T)
=
\mathbf X_{\mathrm{grp}}(T),
$$

and one common oriented axis:

$$
\hat{\mathbf n}_1
=
\hat{\mathbf n}_2
=
\hat{\mathbf n}_3
=
\hat{\mathbf n}_B
$$

`B1` is the rigid common-frequency member. Its binaries may have different radii, axial half-separations, transverse orbit radii, and phases, but share one midpoint, one axis, one frequency, and one circulation sense. The coincident-axis relation distinguishes Family B from Family A; the family identifier does not assert that either geometry is dynamically retained.

Family A and Family B meet on a boundary. Every Family-A member reaches the coincident-axis relation at $\lambda_A=1$; a common-frequency Family-A variant with one common circulation sense and coincident binary midpoints also occupies the B1 coordinate locus at that endpoint. This geometric coincidence does not identify the two families away from the boundary.

### Family C: Two-Braid Composition

Family C contains assemblies made from two complete `B1` braids. Its exact composition chart, twelve endpoint paths, derived axis offset, and physical-mapping boundary are developed in [Braid Family C](../../../../markdown/aaa/noether-braid/braid-family-c.md). The relative braid-center displacement, relative orientation, and relative phase remain explicit assembly coordinates.

`C1` is the co-rotating member: the two component braids have the same circulation sense. `C2` is the counter-rotating member: the two component braids have opposite circulation senses. These members define prescribed composition classes only; they do not assert a binding or retention mechanism.

### Master Tables

The first three tables carry the geometry. The fourth table supplies optional names, source-record routing, Borg routing, and brief explanation. A constrained variant appears only in the tables whose values it changes. In every other table, it inherits the row of its parent member. Thus `A1.2` uses the `A1` assembly and braid rows together with the `A1.2` binary and navigation rows, while `A3.2` inherits from `A3`. `NA` means not applicable.

#### Assembly Composition Master Table

| Member ID | Braid count | Relative braid-center displacement | Relative orientation | Relative phase | Relative circulation |
| --- | --- | --- | --- | --- | --- |
| `A1` | 1 | NA | NA | NA | NA |
| `A2` | 1 | NA | NA | NA | NA |
| `A3` | 1 | NA | NA | NA | NA |
| `B1` | 1 | NA | NA | NA | NA |
| `C1` | 2 | $\Delta\mathbf C$ | $Q_{21}$ | $\Delta\phi$ | Same |
| `C2` | 2 | $\Delta\mathbf C$ | $Q_{21}$ | $\Delta\phi$ | Opposite |

#### Individual Braid Master Table

| Member ID | Braid index | Component member | Group translation speed | Binary-midpoint relation | Axis relation | Distinguished direction | Common phase zero | Circulation data |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `A1` | 1 | A1 | Variable $s_{\mathrm{grp}}$ | $\mathbf c_1=\mathbf c_2=\mathbf c_3=\mathbf X_{\mathrm{grp}}$ | Orthogonal at $\lambda_A=0$; coincident at $\lambda_A=1$ | Translation direction $\hat{\mathbf u}_A$ | $T=0$ | Not yet specified |
| `A2` | 1 | A2 | Variable $s_{\mathrm{grp}}$ | $\mathbf c_1=\mathbf c_2=\mathbf c_3=\mathbf X_{\mathrm{grp}}$ | Orthogonal at $\lambda_A=0$; coincident at $\lambda_A=1$ | Translation direction $\hat{\mathbf u}_A$ | $T=0$ | One common sense |
| `A3` | 1 | A3 | Variable $s_{\mathrm{grp}}$ | $\mathbf c_1=\mathbf c_2=\mathbf c_3=\mathbf X_{\mathrm{grp}}$ | Orthogonal at $\lambda_A=0$; coincident at $\lambda_A=1$ | Translation direction $\hat{\mathbf u}_A$ | $T=0$ | Not yet specified |
| `B1` | 1 | B1 | Variable $s_{\mathrm{grp}}$ | $\mathbf c_1=\mathbf c_2=\mathbf c_3=\mathbf X_{\mathrm{grp}}$ | $\hat{\mathbf n}_1=\hat{\mathbf n}_2=\hat{\mathbf n}_3=\hat{\mathbf n}_B$ | $\hat{\mathbf n}_B$ | $T=0$ | One common sense |
| `C1` | 1 | B1 | Variable $s_{\mathrm{grp}}$ | Inherited from B1 within component 1 | Inherited from B1 | Inherited from B1 | $T=0$ | Common sense $q$ |
| `C1` | 2 | B1 | Variable $s_{\mathrm{grp}}$ | Inherited from B1 within component 2 | Inherited from B1 | Inherited from B1 | $T=0$ | Common sense $q$ |
| `C2` | 1 | B1 | Variable $s_{\mathrm{grp}}$ | Inherited from B1 within component 1 | Inherited from B1 | Inherited from B1 | $T=0$ | Sense $q$ |
| `C2` | 2 | B1 | Variable $s_{\mathrm{grp}}$ | Inherited from B1 within component 2 | Inherited from B1 | Inherited from B1 | $T=0$ | Sense $-q$ |

#### Individual Binary Master Table

Within A1 and A3, the symbols $R_1,R_2,R_3$ are independent positive coordinates attached to persistent binary indices. They do not encode a size order, and equality is permitted unless a constrained row says otherwise. A repeated symbol $R$ or $f$ declares equality across the corresponding rows. Unconstrained phases remain $\phi_1,\phi_2,\phi_3$. A1 fixes $h_a=0$ and $\rho_a=R_a$; A3 carries the general axial and transverse decomposition of $R_a$ defined above. Family-C members inherit the individual-binary rows of their two B1 components.

| Member ID | Braid index | Binary index | Radius | Axial half-separation | Transverse orbit radius | Frequency | Phase |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `A1` | 1 | 1 | $R_1$ | $0$ | $R_1$ | $f_1$ | $\phi_1$ |
| `A1` | 1 | 2 | $R_2$ | $0$ | $R_2$ | $f_2$ | $\phi_2$ |
| `A1` | 1 | 3 | $R_3$ | $0$ | $R_3$ | $f_3$ | $\phi_3$ |
| `A1.1` | 1 | 1 | $R_1$ | $0$ | $R_1$ | $f$ | $\phi_1$ |
| `A1.1` | 1 | 2 | $R_2$ | $0$ | $R_2$ | $f$ | $\phi_2$ |
| `A1.1` | 1 | 3 | $R_3$ | $0$ | $R_3$ | $f$ | $\phi_3$ |
| `A1.2` | 1 | 1 | $R$ | $0$ | $R$ | $f$ | $0$ |
| `A1.2` | 1 | 2 | $R$ | $0$ | $R$ | $f$ | $2\pi/3$ |
| `A1.2` | 1 | 3 | $R$ | $0$ | $R$ | $f$ | $4\pi/3$ |
| `A1.3` | 1 | 1 | $R_1$ | $0$ | $R_1$ | $4f$ | $\phi_1$ |
| `A1.3` | 1 | 2 | $R_2$ | $0$ | $R_2$ | $2f$ | $\phi_2$ |
| `A1.3` | 1 | 3 | $R_3$ | $0$ | $R_3$ | $f$ | $\phi_3$ |
| `A1.4` | 1 | 1 | $R_1$ | $0$ | $R_1$ | $3f$ | $\phi_1$ |
| `A1.4` | 1 | 2 | $R_2$ | $0$ | $R_2$ | $2f$ | $\phi_2$ |
| `A1.4` | 1 | 3 | $R_3$ | $0$ | $R_3$ | $f$ | $\phi_3$ |
| `A2` | 1 | 1 | $R$ | $h$ | $\rho$ | $f$ | $0$ |
| `A2` | 1 | 2 | $R$ | $h$ | $\rho$ | $f$ | $2\pi/3$ |
| `A2` | 1 | 3 | $R$ | $h$ | $\rho$ | $f$ | $4\pi/3$ |
| `A3` | 1 | 1 | $R_1$ | $h_1$ | $\rho_1$ | $f_1$ | $\phi_1$ |
| `A3` | 1 | 2 | $R_2$ | $h_2$ | $\rho_2$ | $f_2$ | $\phi_2$ |
| `A3` | 1 | 3 | $R_3$ | $h_3$ | $\rho_3$ | $f_3$ | $\phi_3$ |
| `A3.1` | 1 | 1 | $R_1$ | $h_1$ | $\rho_1$ | $f$ | $\phi_1$ |
| `A3.1` | 1 | 2 | $R_2$ | $h_2$ | $\rho_2$ | $f$ | $\phi_2$ |
| `A3.1` | 1 | 3 | $R_3$ | $h_3$ | $\rho_3$ | $f$ | $\phi_3$ |
| `A3.2` | 1 | 1 | $R$ | $h_1$ | $\rho_1$ | $f$ | $0$ |
| `A3.2` | 1 | 2 | $R$ | $h_2$ | $\rho_2$ | $f$ | $2\pi/3$ |
| `A3.2` | 1 | 3 | $R$ | $h_3$ | $\rho_3$ | $f$ | $4\pi/3$ |
| `A3.3` | 1 | 1 | $R_1$ | $h_1$ | $\rho_1$ | $4f$ | $\phi_1$ |
| `A3.3` | 1 | 2 | $R_2$ | $h_2$ | $\rho_2$ | $2f$ | $\phi_2$ |
| `A3.3` | 1 | 3 | $R_3$ | $h_3$ | $\rho_3$ | $f$ | $\phi_3$ |
| `A3.4` | 1 | 1 | $R_1$ | $h_1$ | $\rho_1$ | $3f$ | $\phi_1$ |
| `A3.4` | 1 | 2 | $R_2$ | $h_2$ | $\rho_2$ | $2f$ | $\phi_2$ |
| `A3.4` | 1 | 3 | $R_3$ | $h_3$ | $\rho_3$ | $f$ | $\phi_3$ |
| `B1` | 1 | 1 | $R_1$ | $h_1$ | $\rho_1$ | $f$ | $\phi_1$ |
| `B1` | 1 | 2 | $R_2$ | $h_2$ | $\rho_2$ | $f$ | $\phi_2$ |
| `B1` | 1 | 3 | $R_3$ | $h_3$ | $\rho_3$ | $f$ | $\phi_3$ |

#### Naming and Navigation Master Table

Family and member names are optional aliases. The Description column may aid navigation, but it does not define the geometry and must not introduce a characteristic absent from the first three master tables.

| Member ID | Family name | Member name | Geometry record | Borg depiction | Description |
| --- | --- | --- | --- | --- | --- |
| `A1` | Noether core | Coincident endpoint orbits | `family-a-a1-general-v1` | `A1 — coincident endpoint orbits` | Zero-axial-offset Family-A member whose two endpoint paths share one geometric circle within each binary. |
| `A1.1` | Noether core | Equal-frequency | `family-a-a1-1-equal-frequency-v1` | `A1.1 — equal frequency` | A1 constrained to one common binary frequency while retaining independently assignable radii. |
| `A1.2` | Noether core | Equal-frequency equal-radius | `family-a-a1-2-equal-frequency-equal-radius-v1` | `A1.2 — equal frequency, equal radius` | A1 constrained to equal radii, equal frequencies, and phases separated by $120^\circ$. |
| `A1.3` | Noether core | 4:2:1-frequency | `family-a-a1-3-4-2-1-frequency-v1` | `A1.3 — 4:2:1 frequency` | A1 constrained to the indexed frequency ratio $f_1:f_2:f_3=4:2:1$; the ratio does not order the radii. |
| `A1.4` | Noether core | 3:2:1-frequency | `family-a-a1-4-3-2-1-frequency-v1` | `A1.4 — 3:2:1 frequency` | A1 constrained to the indexed frequency ratio $f_1:f_2:f_3=3:2:1$; the ratio does not order the radii. |
| `A2` | Noether core | Fully symmetric | `family-a-a2-fully-symmetric-v1` | `A2 — fully symmetric` | Three equivalent binaries with equal geometry, equal frequencies, $120^\circ$ phase spacing, and one circulation sense. |
| `A3` | Noether core | General axial decomposition | `family-a-a3-general-v1` | `A3 — general` | General Family-A member with independently assignable positive radii, frequencies, phases, and axial/transverse decompositions. |
| `A3.1` | Noether core | Equal-frequency axial decomposition | `family-a-a3-1-equal-frequency-v1` | `A3.1 — equal frequency` | A3 constrained to one common binary frequency while retaining independently assignable radii and decompositions. |
| `A3.2` | Noether core | Equal-frequency equal-radius axial decomposition | `family-a-a3-2-equal-frequency-equal-radius-v1` | `A3.2 — equal frequency, equal radius` | A3 constrained to equal radii, equal frequencies, and phases separated by $120^\circ$. |
| `A3.3` | Noether core | 4:2:1-frequency axial decomposition | `family-a-a3-3-4-2-1-frequency-v1` | `A3.3 — 4:2:1 frequency` | A3 constrained to the indexed frequency ratio $f_1:f_2:f_3=4:2:1$; the ratio does not order the radii. |
| `A3.4` | Noether core | 3:2:1-frequency axial decomposition | `family-a-a3-4-3-2-1-frequency-v1` | `A3.4 — 3:2:1 frequency` | A3 constrained to the indexed frequency ratio $f_1:f_2:f_3=3:2:1$; the ratio does not order the radii. |
| `B1` | Coincident binary axes | Rigid common-frequency | Four source records: interior, high-axial, all-equatorial, and all-axial | Four `B1` coordinate labels in Borg | One braid with one common binary midpoint, coincident binary axes, one common frequency, and one common circulation sense. |
| `C1` | Two-braid composition | Co-rotating B1 pair | `family-c-c1-co-rotating-b1-pair-v1` | `C1 — co-rotating B1 pair` | Two complete B1 braids with a common circulation sense and explicit relative placement, orientation, and phase. |
| `C2` | Two-braid composition | Counter-rotating B1 pair | `family-c-c2-counter-rotating-b1-pair-v1` | `C2 — counter-rotating B1 pair` | Two complete B1 braids with opposite circulation senses and explicit relative placement, orientation, and phase. |

## Braid Family A

### Braid Family A

Family A contains prescribed one-braid geometries whose three binary axes are mutually orthogonal at the near-rest endpoint and converge toward the group-translation direction as the prescribed flattening coordinate increases. The canonical coordinates, response endpoints, and master-table rows are defined in [Braid Taxonomy](../../../../markdown/aaa/noether-braid/braid-taxonomy.md#family-a-noether-core). This chapter explains how those coordinates distinguish A1, A2, A3, and their constrained loci.

Family A is a geometry-and-motion definition. It does not establish that an A1, A2, or A3 record is generated, retained, or stable under the EOM solver. The realization-independent retention burden is stated in [Braid Recovery Requirements](../../../../markdown/aaa/noether-braid/braid-recovery-requirements.md).

#### Shared Family-A Geometry

Every Family-A member is one complete Noether braid composed of three neutral binaries. Each binary contains one electrino and one positrino. The three binary midpoints coincide with the braid center. The binaries share a braid-level phase zero, while radius, axial half-separation, transverse orbit radius, frequency, phase, and circulation are binary coordinates.

At the near-rest endpoint, the three binary axes are mutually orthogonal. Their equal-component direction is the Family-A translation direction. The complete braid translates along that direction, and the translation speed is the braid's group translation speed rather than an internal architrino speed.

The prescribed flattening coordinate $\lambda_A$ connects two endpoint geometries:

| $\lambda_A$ | Binary-axis relation | Envelope description |
| --- | --- | --- |
| $0$ | Three mutually orthogonal axes | Nearly spherical near-rest endpoint in the declared weak-gradient environment. |
| $0 < \lambda_A < 1$ | Three axes converging toward the translation direction | Increasingly oblate intermediate geometry. |
| $1$ | Three coincident axes along the translation direction | Flat response endpoint assigned to the event-horizon and photon channels. |

This response is prescribed taxonomy. An EOM-solver derivation of the path through these geometries, including either physical endpoint assignment, remains open.

The coincident-axis endpoint is also a geometric boundary with Family B. A Family-A record does not become a Family-B record away from that boundary, and coincidence at one endpoint does not establish a shared dynamical branch.

#### A1

A1 is the zero-axial-offset Family-A member. Its indices $a\in\{1,2,3\}$ are persistent record identities. They are not assigned by sorting the radii, frequencies, speeds, or later dynamical roles. The radii are independently assignable positive coordinates, and equal values are permitted. The three frequencies are likewise independently assignable.

For every A1 binary,

$$
\mathbf c_a(T)=\mathbf X_{\mathrm{grp}}(T),
\qquad
h_a=0,
\qquad
\rho_a=R_a.
$$

The two architrinos therefore remain antipodal while traversing the same geometric circle, whose center is the braid center. The three binary circles need not share one plane: at the near-rest endpoint their plane normals are the three mutually orthogonal Family-A axes.

A1 does not require the exact cyclic binary-permutation symmetry of A2. When its binary coordinates differ, a spatial rotation cannot map one binary onto another with different geometry. An integer frequency ratio can make the full prescribed figure repeat after a common period, but it does not by itself establish spatial equivalence.

##### A1 Constrained Variants

Each constrained variant inherits A1's persistent binary indices, common braid center, and zero axial half-separation unless its master-table row explicitly replaces another coordinate:

| Member | Added constraint | What remains inherited |
| --- | --- | --- |
| `A1.1` | One common frequency. | Independently assignable radii and phases; $h_a=0$ and $\rho_a=R_a$. |
| `A1.2` | Equal radii, one common frequency, and phases $0$, $2\pi/3$, and $4\pi/3$. | The shared zero-axial-offset relation remains fixed. |
| `A1.3` | Indexed frequency ratio $f_1:f_2:f_3=4:2:1$. | Independently assignable radii and unconstrained phases; the ratio does not order the radii. |
| `A1.4` | Indexed frequency ratio $f_1:f_2:f_3=3:2:1$. | Independently assignable radii and unconstrained phases; the ratio does not order the radii. |

The exact radius, frequency, phase, axial-half-separation, and transverse-orbit-radius rows are carried only by the [Individual Binary Master Table](../../../../markdown/aaa/noether-braid/braid-taxonomy.md#individual-binary-master-table).

#### A2

A2 is the fully symmetric Family-A member. Its three binaries have equal radii, equal axial half-separations, equal transverse orbit radii, equal frequencies, one circulation sense, and phases separated by $120^\circ$. No binary is distinguished. A $120^\circ$ rotation about the Family-A translation direction cyclically permutes the three binaries.

An exact near-rest reference fixture places the three binary axes on an orthonormal frame. At one common reference time, each positrino lies at distance $R$ from the braid center along one positive frame axis and its electrino partner lies at the antipodal point. This is the face-opposite seed used by the invariant-channel analysis in [A2 Symmetry and Return Response](../../../../markdown/aaa/noether-braid/braid-a2-symmetry-and-return-response.md#invariant-channels-and-equivariant-reductions).

The fixture is one exact A2 representative, not the whole A2 coordinate space. At that reference instant it uses axial half-separation $h=R$ and transverse orbit radius $\rho=0$. The A2 taxonomy permits any common pair $(h,\rho)$ satisfying the binary-radius relation, provided all three binaries share that geometry and the other A2 constraints.

The member-specific symmetry lemma, reduced channels, two-ring geometry, axial polarity-dipole identity, momentum-screw alignment, and retention questions are developed in [A2 Symmetry and Return Response](../../../../markdown/aaa/noether-braid/braid-a2-symmetry-and-return-response.md). Those results constrain the fixture under their stated assumptions; they do not certify A2 retention.

#### A3

A3 is the general axial-decomposition Family-A member. It retains the common braid center and persistent binary identities of A1 while permitting each binary to carry its own nonnegative axial half-separation and transverse orbit radius:

$$
R_a^2=h_a^2+\rho_a^2.
$$

For endpoint sign $\sigma\in\{+1,-1\}$, the center of the endpoint's circular path is

$$
\mathbf O_{a,\sigma}(T)
=
\mathbf X_{\mathrm{grp}}(T)
+
\sigma h_a\hat{\mathbf n}_a.
$$

Thus $h_a>0$ separates the two endpoint orbit centers by $2h_a\hat{\mathbf n}_a$, even though the endpoint positions remain antipodal about the binary midpoint at every common time. A3 permits $h_a=0$, so A1 is its exact zero-axial-offset subset rather than a disjoint class.

##### A3 Constrained Variants

The A3 suffixes carry the same frequency, radius, and phase restrictions as the corresponding A1 suffixes, while retaining independently assignable axial/transverse decompositions:

| Member | Added constraint | What remains inherited |
| --- | --- | --- |
| `A3.1` | One common frequency. | Independently assignable radii, decompositions, and phases. |
| `A3.2` | Equal radii, one common frequency, and phases $0$, $2\pi/3$, and $4\pi/3$. | The axial and transverse decompositions may differ among binaries. |
| `A3.3` | Indexed frequency ratio $f_1:f_2:f_3=4:2:1$. | Independently assignable radii, decompositions, and unconstrained phases. |
| `A3.4` | Indexed frequency ratio $f_1:f_2:f_3=3:2:1$. | Independently assignable radii, decompositions, and unconstrained phases. |

For every shared suffix $n\in\{1,2,3,4\}$,

$$
A1.n=A3.n\mathbin{\cap}\{h_1=h_2=h_3=0\}.
$$

#### A1, A2, and A3 Relations

A1.2, A2, and A3.2 share equal radii, equal frequencies, and the same three phase values, but they are not identical members:

| Coordinate or relation | `A1.2` | `A2` | `A3.2` |
| --- | --- | --- | --- |
| Axial half-separations | $h_1=h_2=h_3=0$ | One common $h$ | $h_1,h_2,h_3$ may differ |
| Transverse orbit radii | $\rho_1=\rho_2=\rho_3=R$ | One common $\rho$ | $\rho_1,\rho_2,\rho_3$ may differ |
| Circulation | Inherited A1 value is not yet specified | One common sense | Inherited A3 value is not yet specified |
| Cyclic binary equivalence | Not required | Required | Not required |

A1.2 is the $h=0$ locus of A3.2. A2 occupies the cyclically symmetric locus of A3 and intersects A1 when its common geometry also has $h=0$. These coordinate coincidences do not establish a physical transition.

#### Claim Boundary

The Family-A definitions are prescribed. They would be falsified as EOM-solver branch claims by a same-record evolution showing that the declared coordinate relations cannot be retained under the required causal-root, acceleration, action, and stability rows. Until such a record exists, Family A supplies exact display geometry and explicit closure targets, not a retained physical braid.

### Braid A1 Dynamics and Interpretation

This specialist chapter carries the retention, phase-closure, cadence-retuning, scaling, strong-field, and downstream interpretation hypotheses specific to A1. The A1 coordinates and constrained variants are defined in [Braid Family A](../../../../markdown/aaa/noether-braid/braid-family-a.md#a1); the realization-independent proof contract is defined in [Braid Recovery Requirements](../../../../markdown/aaa/noether-braid/braid-recovery-requirements.md).

Nothing in this chapter establishes an EOM-solver-retained A1 branch. Derived identities, conditional results, hypotheses, and observer-level mappings keep their stated claim grades.

#### Claim-Ownership Classification

The claims in this chapter have three distinct scopes: A1-specific hypotheses, family-general recovery requirements stated in A1 coordinates, and physical assignments that are not established for A1. The table classifies scope, not truth.

| Claim unit | Classification | Consequence |
| --- | --- | --- |
| Symmetry-distance diagnostic relative to A2 | A1-specific hypothesis | The diagnostic depends on A1's departure from the A2 symmetry channel and does not generalize to every family. |
| Retention, causal-root closure, perturbation recovery, and same-record shielding tests | Family-general recovery requirements | A1 is one instantiation. The proof contract belongs to [Braid Recovery Requirements](../../../../markdown/aaa/noether-braid/braid-recovery-requirements.md), and the common analysis record belongs to [Candidate Braid Analysis Methodology](../../../../markdown/aaa/noether-braid/braid-analysis-methodology.md). |
| Integer phase return and root-ledger return | Family-general recovery requirement with an A1-specific coordinate form | Return is required for every periodic candidate; $(k_1,k_2,k_3)$ and $\Lambda_{A1}$ are A1 chart coordinates. |
| Cadence-scale retuning map and rest-level scaling curve | A1-specific hypothesis | The maps depend on $\Lambda_{A1}$ and cannot be assigned to another member without a separate derivation. |
| Fold-set action clicks | Family-general hypothesis | The machinery is owned by [Braid Mathematics](../../../../markdown/aaa/noether-braid/braid-mathematics.md#action-clicks-at-the-fold-set), not by A1. |
| Reduced closure label $\Lambda_{A1}$ and its alignment restriction | A1-specific hypothesis | The label is available for A1 branch comparison only and does not establish a retained branch. |
| Dynamic exclusion-envelope export | Family-general export requirement with an A1 realization | The shared interface is owned by [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md). |
| Three-support-row shielding mapped to fermion generations | Unsupported A1 assignment | No retained branch, shielding extraction, or particle map currently establishes the assignment. |
| Family-A axis convergence under the prescribed response | A1-specific prescribed response and dynamical recovery target | The endpoint is part of the A1 chart; evolved convergence remains unproved. |
| Event-horizon, Planck-scale, and dipole-quiet identifications | Unsupported A1 assignments | These remain comparison hypotheses until A1-specific moment and strong-field records establish them. The A2 dipole theorem cannot be transferred to A1 by analogy. |
| A Noether braid as the structural candidate for fermion recovery | Family-general recovery requirement | Assigning A1, rather than another retained member, to a fermion class remains unsupported. |

An unsupported A1 assignment is not part of the A1 definition and must not be consumed downstream as an A1 property. It remains an explicitly graded hypothesis awaiting derivation or rejection.

#### Retention and Interpretation

The A1 geometry, persistent binary indices, and constrained variants are defined in [Braid Family A](../../../../markdown/aaa/noether-braid/braid-family-a.md#a1). The remaining material below concerns phase closure, retuning, dynamics, shielding, and downstream interpretations. It does not add coordinates to the A1 definition.

All equations use the persistent indices $a\in\{1,2,3\}$. The indices do not encode a radius order or preassign a field-speed carrier, self-hit channel, shielding rank, or envelope-leading path. Any such diagnostic must be extracted from the same retained branch record used by the equation in which it appears.

##### Symmetry-Distance Diagnostic

A2's exact threefold channel pins its kinematic angular momentum along the Family-A translation direction. A1 does not require the equal geometry and cyclic binary-permutation symmetry used by that theorem, so the same pinning result does not apply to a general A1 record. The resulting hypothesis is that nonzero precession may diagnose distance from the A2 symmetry channel, while decaying precession may diagnose relaxation toward it. This is an inferred diagnostic, not a proof that A1 precesses, that A1 relaxes toward A2, or that either member is retained. A retained evolution would falsify the diagnostic if its measured precession failed to track an independently defined symmetry-distance residual.

##### Retention and Shielding Hypotheses

A1 retention requires more than its prescribed binary coordinates. The three binary responses, inter-binary wake exchange, any branch-derived field-speed transfer, and the full envelope exposure must close into one persistent causal-return cycle. A time-averaged potential may be used as a comparison summary, but the proof burden is a same-record closure of the causal-root ledger, phase return, separator conditions, and perturbation response.

Far-field cancellation is a separate hypothesis. Rapid positive- and negative-polarity motion may suppress the exposed wake signature relative to the raw sum of the six constituent contributions, but quantitative shielding and any mass-map consequence remain closure targets. A same-record far-field calculation that does not show the required suppression would falsify that hypothesis without altering the A1 geometric definition.

##### Integer Phase-Closure States

An A1 record should be treated as a closed-cycle geometry before it is treated as a particle label. Over a stable return duration $T_{\mathrm{ret}}$ beginning at a chosen absolute-time origin $T_0$, each binary must return its phase together with the relevant causal-root ledger:

$$
\Theta_a(T_0;T_{\mathrm{ret}})
=
\int_{T_0}^{T_0+T_{\mathrm{ret}}}\omega_a(T')\,dT'
+
\Phi_a^{\text{root}}(T_0;T_{\mathrm{ret}})
=
2\pi k_a,
\qquad
k_a\in\mathbb{Z},
\qquad
a\in\{1,2,3\}
$$

The integers $k_a$ are winding counts over the closure period. They are not a claim that the layer frequencies are integer-valued at every instant. When ordinary layer frequency is used below, $\omega_a=2\pi f_a$. The surrounding root ledger records which self-hit, partner-hit, and inter-layer branches made the closure admissible.

On the retuning hypothesis below, an accepted energy-level change is a one-$h_{\mathrm{act}}$ closed-cycle action transaction that moves the A1 record from one admissible integer-and-root ledger to another. The causal wake emitted by the retuned braid should therefore carry information about the braid's closure state. Higher-level atomic orbital configurations, when they are recovered, should appear as electron-assembly resonance envelopes in that structured nuclear and Noether sea wake environment, not as primitive labels pasted onto the braid.

The same closure-label machinery is the candidate carrier for branch-quantized Lorentz response. A moving A1 record should not be assigned a Lorentz factor independently of its internal ledger. Instead, a stable closure label should determine the all-binary retuning of radii, frequencies, characteristic speeds, and wake exchange; the full path-history envelope then projects the ruler factor seen by Physical Observers. In the homogeneous weak-field limit, the admitted labels must collapse to the observer-calibrated $\gamma_0(v_{\mathrm{eff}})=(1-v_{\mathrm{eff}}^2/c_0^2)^{-1/2}$ within the preferred-frame leakage bound.

##### Cadence-Scale Retuning Hypothesis

The single-braid version of the $h_{\mathrm{act}}$-step claim is geometric rather than merely thermal. An accepted action transaction does not add energy to a rigid object. It moves the A1 record from one admissible closure branch toward another, and the braid resolves that transaction by retuning its cadence-scale closure. The symbol $h_{\mathrm{act}}$ denotes the closed-cycle action unit in this chart; it is distinct from the finite-memory depth $h_{\mathrm{mem}}$ used in dynamics chapters, and its comparison with the observer-level Planck constant $h$ remains part of action-scale closure.

The bookkeeping distinction is

$$
h_{\mathrm{act}}=\text{action per accepted cycle},
\qquad
A_N=Nh_{\mathrm{act}},
\qquad
E_N=A_N f_N
$$

Here $h_{\mathrm{act}}$ is the fixed closed-cycle action unit, $N$ is the integer number of accepted action units carried by the branch, $A_N$ is the total branch action level, and $f_N$ is a representative cadence extracted from the closed A1 branch. A one-$h_{\mathrm{act}}$ transaction changes the action ledger; a branch with many accepted units is scaled by $Nh_{\mathrm{act}}$. The accepted branch may answer through one or more of the cadence, binary radii, envelope scale, envelope ratio, orientation, strain, and inter-binary wake-exchange variables. The inter-binary ledgers $\mathcal{G}_{12},\mathcal{G}_{13},\mathcal{G}_{23}$ are defined in [Reduced A1 Closure Label](#reduced-a1-closure-label):

$$
\Delta A_{\mathrm{cyc}}=\pm h_{\mathrm{act}}
\quad\Rightarrow\quad
(f_N,\ R_1,R_2,R_3,\ \lambda,\ \xi,\ \mathcal{G}_{12},\mathcal{G}_{13},\mathcal{G}_{23})
\longmapsto
(f_N',\ R_1',R_2',R_3',\ \lambda',\ \xi',\ \mathcal{G}_{12}',\mathcal{G}_{13}',\mathcal{G}_{23}')
$$

In the simplest fixed-speed layer estimate,

$$
v_a\sim 2\pi R_a f_a,
\qquad
a\in\{1,2,3\}
$$

If a branch keeps $v_a$ approximately fixed while accepting the transaction, then

$$
R_a f_a\approx\text{constant},
\qquad
\Delta f_a>0\Rightarrow\Delta R_a<0,
\qquad
\Delta f_a<0\Rightarrow\Delta R_a>0
$$

The proof target is the constrained map, not only this sign rule. On a fixed branch chart $q$, collect the logarithmic retuning variables into

$$
\mathbf{y}_q
=
\left(
\ln f_1,\ln f_2,\ln f_3,\,
\ln R_1,\ln R_2,\ln R_3,\,
\ln\lambda,\ln\xi
\right)_q^{T}
$$

Let $A_{\mathrm{cyc},q}(\mathbf{y},\mathcal{G})$ be the closed-cycle action ledger on that chart, and let

$$
\mathcal{C}_q(\mathbf{y},\mathcal{G})=0
$$

collect the integer phase-closure, causal-root, separator, inter-layer wake-exchange, and stability conditions that define the branch. A first-order accepted retuning with action sign $s_{\mathrm{act}}\in\{+1,-1\}$ must satisfy

$$
D A_{\mathrm{cyc},q}[\Delta\mathbf{y}]
+
\Delta A_{\mathrm{wake}}
=
s_{\mathrm{act}}h_{\mathrm{act}}
$$

together with the branch-preservation condition

$$
D\mathcal{C}_q[\Delta\mathbf{y}]
+
\Delta\mathcal{C}_{\mathcal{G}}
=0
$$

If $\Delta\mathcal{C}_{\mathcal{G}}=0$, the retuning stays on the same causal-root ledger. If $\Delta\mathcal{C}_{\mathcal{G}}\neq0$, the event is a branch transition and must be treated as a separator crossing or causal-locus reconnection rather than as smooth single-braid drift.

The local cadence-scale retuning map is therefore the closure target

$$
\mathcal{R}_{\mathrm{cyc}}^{(q,s_{\mathrm{act}})}
:
(\Lambda_{A1},\theta_{\mathrm{env}})
\longmapsto
\left(
\Delta f_N,\Delta R_1,\Delta R_2,\Delta R_3,\Delta\lambda,\Delta\xi
\right)
$$

where $\Lambda_{A1}$ is defined in [Reduced A1 Closure Label](#reduced-a1-closure-label), and $\theta_{\mathrm{env}}$ records the local Noether sea state and neighboring-assembly conditions. The representative cadence increment is an extraction from the layer increments, for example

$$
\Delta\ln f_N
=
w_1^{(q)}\Delta\ln f_1
+
w_2^{(q)}\Delta\ln f_2
+
w_3^{(q)}\Delta\ln f_3,
\qquad
w_1^{(q)}+w_2^{(q)}+w_3^{(q)}=1
$$

with the weights determined by the same branch and exposure record used for clock and medium coupling. The full A1 record need not put the entire transaction into a single binary. One binary may tighten while another expands, and the path-history envelope may change through $\lambda$ or $\xi$, provided the total closure label remains admissible.

This is the local branchwise origin of the smoother Noether sea equilibrium-current language: individual retunings are discrete, while many asynchronous accepted retunings can coarse-grain into a continuous cadence-space current.

###### Action Clicks at the Field-Speed Hinge

The candidate physical implementation of the discrete action transaction — each accepted transaction realized as a controlled crossing of the causal-root fold set that changes the integer root count by one — is core-agnostic machinery and is developed at hypothesis level in [Braid Mathematics](../../../../markdown/aaa/noether-braid/braid-mathematics.md#action-clicks-at-the-fold-set). For this chapter's ledger the hypothesis-level consequences are that the closed-cycle action unit $h_{\mathrm{act}}$ is the action transacted in one crossing, that closure-label changes are tied to causal-root bifurcation, and that many asynchronous crossings coarse-grain into the smooth cadence-space current named above. No binary is assigned this role by the taxonomy, and no dynamical mechanism holding a branch at the field-speed locus is asserted.

##### Rest-Level Scaling Curve

The cadence-scale retuning map becomes more predictive when a homogeneous pool of group-velocity-zero Noether braids is assumed to occupy the same reduced closure label and the same integer rest level. In that case the pool is made of equal braids at one level $N$, while the scaling curve compares neighboring admissible rest levels along the same branch. The scaling variable is not $h_{\mathrm{act}}$ itself. The fixed quantity is the closed-cycle action unit $h_{\mathrm{act}}$; the branch variable is the total action level

$$
A_N=Nh_{\mathrm{act}},
\qquad
N\in\mathbb{Z}_{>0}
$$

For any declared binary channel $a\in\{1,2,3\}$, write its action allocation as

$$
N_a=p_a^{(q)}N,
\qquad
I_a=N_a\hbar_{\mathrm{act}}
=p_a^{(q)}N\frac{h_{\mathrm{act}}}{2\pi}
$$

Here $p_a^{(q)}$ is the branch share carried by binary $a$ and $\hbar_{\mathrm{act}}\equiv h_{\mathrm{act}}/(2\pi)$. With the reduced circular-action chart

$$
I_a=\mu_a^{\mathrm{rot}}R_a v_a
$$

Here $\mu_a^{\mathrm{rot}}$ is an effective rotational branch-response coefficient for this reduced chart. It is not a primitive mass assigned to architrinos; it is a bookkeeping response factor that must ultimately be extracted from the same branch record used by the mass-map program.

With this declaration, the action ledger determines the product

$$
\boxed{
R_a(N)\,v_a(N)
=
\frac{p_a^{(q)}Nh_{\mathrm{act}}}{2\pi\mu_a^{\mathrm{rot}}}.
}
$$

This is the part fixed directly by the $Nh_{\mathrm{act}}$ action ledger. It says that a higher rest level must carry a larger radius-speed product in the selected channel, but it does not by itself decide whether the extra product appears as larger radius, higher speed, or both. The separate functions $R_a(N)$, $v_a(N)$, and

$$
f_a(N)=\frac{v_a(N)}{2\pi R_a(N)}
$$

therefore require one more branch-closure equation.

One possible closure is a branch-pinned speed, stated as a chart hypothesis only. No mechanism holding a branch at fixed speed is established. If the selected binary channel keeps

$$
v_a=\beta_ac_f
$$

with fixed $\beta_a$, then

$$
\boxed{
R_a(N)
=
\frac{p_a^{(q)}Nh_{\mathrm{act}}}{2\pi\mu_a^{\mathrm{rot}}\beta_ac_f},
\qquad
f_a(N)
=
\frac{\mu_a^{\mathrm{rot}}\beta_a^2c_f^2}
{p_a^{(q)}Nh_{\mathrm{act}}}.
}
$$

This special branch gives

$$
\boxed{
R_a\propto N,
\qquad
v_a\propto N^0,
\qquad
f_a\propto N^{-1}.
}
$$

A different closure comes from a bare inverse-square radial balance. If the delayed root ledger reduces to

$$
\frac{v_a^2}{R_a}
=
\frac{K_a}{4R_a^2}\mathcal{B}_a(\beta_a;\Lambda_{A1,a})
$$

Here the factor $1/(4R_a^2)$ is the inverse-square factor for an opposite member at diameter $d=2R_a$. The coefficient $K_a$ is the reduced channel coupling combination, $\mathcal{B}_a(\beta_a;\Lambda_{A1,a})$ is the dimensionless delayed-root radial balance factor, and $\Lambda_{A1,a}$ is the selected channel sublabel inherited from the reduced A1 closure label. If $\mathcal{B}_a$ is approximately constant on the compared segment, then the same action product gives

$$
\boxed{
R_a\propto N^2,
\qquad
v_a\propto N^{-1},
\qquad
f_a\propto N^{-3}.
}
$$

Thus the $Nh_{\mathrm{act}}$ ledger alone does not canonize a single radius curve. It supplies the product law; the branch speed, delayed-root radial balance, tangential closure, and any Noether sea return terms decide the actual rest-level scaling.

If the selected binary channel instead carries a declared energy projection

$$
E_a(N)=\zeta_a^{(q)}\mu_a^{\mathrm{rot}}v_a^2
$$

then

$$
\boxed{
v_a(N)
=
\sqrt{\frac{E_a(N)}{\zeta_a^{(q)}\mu_a^{\mathrm{rot}}}},
\qquad
R_a(N)
=
\frac{p_a^{(q)}Nh_{\mathrm{act}}\sqrt{\zeta_a^{(q)}}}
{2\pi\sqrt{\mu_a^{\mathrm{rot}}E_a(N)}}.
}
$$

This form is the safest way to use any external energy-level equation: insert the branch energy projection $E_a(N)$, then derive the corresponding channel radius and speed.

The same chart also gives a packing readout for the Noether sea, but the packing scale must be extracted from all six paths rather than from a preselected binary. In a nearly spherical exclusion-envelope approximation, let

$$
R_{\mathrm{excl}}
=
\alpha_{\mathrm{env}}^{(q)}R_{\mathrm{env}}
$$

where $R_{\mathrm{env}}$ is a branch-derived characteristic radius of the full path-history envelope and $\alpha_{\mathrm{env}}^{(q)}$ converts it into the selected exclusion-interface threshold. Equal exclusion-envelope center contact then occurs at

$$
d_{\mathrm{nn}}=2R_{\mathrm{excl}}
$$

and the densest ordinary equal-sphere center density is

$$
\rho_{\mathrm{NS},\max}^{\#}
=
\frac{1}{4\sqrt{2}R_{\mathrm{excl}}^3}
$$

The density symbol functions as packing notation for this chart, distinct from the physical Noether sea density field $\rho_{\text{NS}}(\mathbf X,T)$; the $\#$ marks a center number density for the relevant Noether braid exclusion envelopes. Therefore the packing curve inherits the radius closure:

$$
\rho_{\mathrm{NS},\max}^{\#}(N)
\propto
R_{\mathrm{env}}(N)^{-3}
$$

If the branch independently proves that one selected channel $a$ controls $R_{\mathrm{env}}$ with a fixed proportionality, then its fixed-speed estimate gives $\rho_{\mathrm{NS},\max}^{\#}\propto N^{-3}$, while its bare inverse-square estimate with approximately constant $\mathcal{B}_a$ gives $\rho_{\mathrm{NS},\max}^{\#}\propto N^{-6}$. Without that boundary-leading certificate, the single-channel exponents do not transfer to packing. These are branch diagnostics, not competing definitions of a Noether braid.

This packing formula is only the spherical leading estimate. At high relative velocity, high Noether sea delay, or high gravitational strain, the branch data cannot be kept constant:

$$
p_a^{(q)},\ \mu_a^{\mathrm{rot}},\ \alpha_{\mathrm{env}}^{(q)},\ \mathcal{B}_a(\beta_a;\Lambda_{A1,a})
\longrightarrow
p_a(q,\theta_{\mathrm{env}}),\ \mu_a^{\mathrm{rot}}(q,\theta_{\mathrm{env}}),\ \alpha_{\mathrm{env}}(q,\theta_{\mathrm{env}}),\ \mathcal{B}_a(\beta_a;\Lambda_{A1,a},\theta_{\mathrm{env}})
$$

The scaling curve is therefore piecewise by branch. Once the branch supplies $\xi$ and $\lambda$, the exclusion envelope must be treated as an oblate spheroidal envelope rather than a sphere, and the center-density calculation must inherit orientation, strain, and Noether sea delay data from the same branch label.

##### Reduced A1 Closure Label

For proof work, the integer phase-closure state should be packaged with the branch data that made the closure admissible. The reduced A1 closure label is a branch label, not a new ontological ingredient. The symbol $\Lambda_{A1}$ denotes this reduced closure label:

$$
\Lambda_{A1}
=
\left(
k_1,k_2,k_3;\
\mathcal{G}_1,\mathcal{G}_2,\mathcal{G}_3;\
\mathcal{G}_{12},\mathcal{G}_{13},\mathcal{G}_{23};\
\chi_c
\right)
$$

Here $k_1,k_2,k_3$ are the binary winding counts over the chosen return period. The binary ledgers $\mathcal{G}_1,\mathcal{G}_2,\mathcal{G}_3$ record active self-hit and partner-hit branches, root multiplicities, winding or phase branch, emission-order data, and separator history. The inter-binary ledgers $\mathcal{G}_{12},\mathcal{G}_{13},\mathcal{G}_{23}$ record delayed exchange roots and phase-lock constraints between binary pairs. The branch label $\chi_c$ records braid chirality derived from the indexed path record, for example through $\operatorname{Wr}_c$ or a multi-component causal-writhe parity; it must not be inferred from a high/middle/low radius ordering.

This label is reduced because it omits the full architrino trajectories and retains only the closure data needed for branch comparison. It is useful only under a theorem-target burden: smooth branch-preserving deformations should keep $\Lambda_{A1}$ fixed, while a change of label should be tied to a causal-root bifurcation, separator crossing, or causal-locus reconnection. The chirality entry $\chi_c$ is not yet proved by this definition; it names the entry that the later causal-writhe or ordered-frame proof must fill.

The quantum-number generalization begins at this level. Generation, spin, chirality, and later observer-level orbital labels should be read as downstream coarse-grainings or measurement labels derived from admissible A1 closure labels and their emitted causal-wake envelopes. They should not be imposed as primitive particle labels before the closure, wake-envelope, and apparatus-coupling maps have been derived.

For the horizon-interface entropy calculation, the counted labels must be restrictions of this same reduced closure label, not a second black-hole bookkeeping system. Define the branch-derived field-speed and self-hit index sets on a declared window $W$ by
$$
\mathcal H_q(W)
=
\left\{a:\sup_{T\in W}|s_a(T)-c_f|\le\varepsilon_hc_f\right\},
\qquad
\mathcal S_q(W)
=
\left\{a:\text{a retained same-transmitter root row exists on }W\right\}.
$$
These sets preserve the binary indices and derive their roles from the retained record. The alignment-restricted label is the theorem-target restriction
$$
\Lambda_{A1}^{\mathrm{align}}
=
\left.
\Lambda_{A1}
\right|_{\substack{
|\mathcal H_q(W)|\ge2,\;|\mathcal S_q(W)|\ge1\\
\text{coincident binary axes along }\hat{\mathbf u}_A\\
\text{precession ceases}
}}
$$
with the remaining admissible entries inherited from the binary ledgers, inter-binary ledgers, chirality entry, and emitted wake envelope. For a connected block $U$ of alignment-area patches, the local label set to be counted has the schematic form
$$
\mathcal{L}_U(\theta_{\mathrm{env}})
=
\left\{
\left(\Lambda_{A1,p}^{\mathrm{align}}\right)_{p\in U}
:
\mathcal{G}_{\partial U},\,
\mathcal{B}_{\partial\Omega}^{(\mathrm{env})}(\theta_{\mathrm{env}};W),\,
\text{conservation and interface compatibility hold}
\right\}
/
\sim_{\mathrm{env},\theta_{\mathrm{env}},W}
$$
Here $\mathcal{G}_{\partial U}$ records the causal-root and wake-exchange compatibility across the edge of the block. This expression does not yet derive the entropy coefficient. It identifies the native object whose block entropy density must be computed before $\log|\mathcal{L}_U|/|U|\to1/4$ can be treated as more than a comparison target.

##### Geometry and Exclusion Envelope

The same A1 motion that may supply shielding is the geometric footprint a retained branch would sweep into a dynamic exclusion envelope. That envelope is not the braid definition itself; it is the candidate excluded-region readout of the A1 assembly. For the oblate spheroidal form, exclusion-envelope interpretation, and deformation channels, see [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md).

##### A1 Shielding and Fermion Generations

This section states an unsupported A1 assignment. No retained branch, computed shielding ledger, or particle-recovery map currently establishes that support-row count determines fermion generation. The hypothesis counts support; it does not rank the three A1 binaries by radius:

-   **Isolated binary:** the most exposed shielding tier, corresponding to Generation III.
-   **Two-support-row shielding tier:** one additional retained support row, corresponding to the Generation-II shielding tier.
-   **A1:** a retained three-support-row braid, corresponding to the Generation-I shielding tier.

If an evolved family of records established this mapping, the generation ladder would become the visible signature of how many retained support rows participate in shielding. Until then, [Particle Masses: Emergent Inertia in the Noether sea](../../../../markdown/aaa/assemblies/particle-masses.md) and the charged-lepton story beginning with [Electron](../../../../markdown/aaa/assemblies/fermions/electron.md) may consume it only as a recovery target, not as an A1 property.

Any attempt to pair this shielding ladder with accessory geometry must use a complete six-architrino [Accessory Configuration](../../../../markdown/aaa/noether-braid/braid-mathematics.md#accessory-configuration). The six sites may lie inside, across, or outside the braid envelope, and their polarity and position records must be declared. Accessory Configuration geometry is not part of the A1 dynamics definition.

##### A1 Alignment and Planck-Scale Framing

Maximal curvature, same-transmitter-root access, field-speed occupancy, energy-transfer leverage, and external exposure are branch diagnostics, not A1 member assignments. A retained record may place these diagnostics on different binary indices, may place more than one diagnostic on one index, or may fail to supply a unique assignment. The sets $\mathcal H_q(W)$ and $\mathcal S_q(W)$ above record two of these distinctions without changing the binary identities.

The horizon-approach hypothesis for A1 is therefore permutation-neutral: as the assembly approaches its terminal-alignment target, the three binary axes converge to the Family-A translation direction, precession ceases, at least two branch-derived speed rows approach the field-speed locus, and at least one retained same-transmitter-root row remains available. Which indices satisfy those conditions, and how their frequencies, radii, and energy rows retune, must be measured on the evolved branch. This is a derivation target, not an evolved-trajectory result.

The canonical term for this whole-assembly transition is the **braid symmetry-breaking point**. It does not assign permanent roles to binaries 1, 2, or 3 and does not claim that their radii, frequencies, or energies become equal. Because $s_a=\omega_a\rho_a$, equal threshold speed does not by itself imply equal frequency, equal effective lever arm, equal radius, or equal energy.

The proposed local black-hole dual is an unsupported A1 assignment. It asks whether a retained A1 branch can make the horizon-interface, same-transmitter-root, and exterior-coupling diagnostics coexist while the binary axes align. Only a branch-derived strong-field record could establish that mapping; the prescribed endpoint does not.

**Mapping hypothesis (unsupported):** "Planck-scale" references may map to the **event-horizon alignment condition** (coincident A1 binary axes with branch-derived field-speed occupancy) only if an explicit derivation supplies that scale map; compare [Singularity Resolution](../../../../markdown/aaa/spacetime/singularity-resolution.md) and [Mapping the Planck Scale to A1 Geometry](../../../../markdown/aaa/philosophy-history/theory-bridges/planck-scale-nested-shell-braid-alignment.md).

The alignment limit also has a proposed wake-signature reading, but the available theorem is member-specific. The [axial polarity dipole identity](../../../../markdown/aaa/noether-braid/braid-a2-symmetry-and-return-response.md#moments-and-the-axial-polarity-dipole) proves the cancellation only for A2's symmetric two-ring geometry. A general A1 record does not inherit that identity. The A1 **dipole-quiet limit** is therefore a theorem target requiring an A1-specific cycle-resolved moment calculation. If that calculation leaves a nonzero leading polarity-signed moment at terminal alignment, the proposed identification with horizon darkness and the associated entropy interpretation fail.

##### The Foundation for Fermions

The Noether braid class supplies a family-general structural candidate for the fermion program. Different closure labels, shielding tiers, energy records, and surrounding axial/wake structures may map to Standard Model flavors and generations, but no current result selects A1 or establishes that mapping. It remains a derivation target until retained branch labels, shielding ledgers, and apparatus-coupling records have been recovered from the dynamics.

The collective motion, or **group velocity**, of a Noether braid assembly determines its emergent behavior. The way these assemblies interact and pack together can lead to different statistical properties. The geometry-facing version of that claim is developed in [Fermi-Dirac and Bose-Einstein Statistics](../../../../markdown/aaa/quantum/fermi-dirac-and-bose-einstein-statistics.md): volumetric Noether braid envelopes are the substrate candidate for fermionic exclusion, while strongly oblated coherent support is the candidate route to bosonic shared occupation.

##### A1 Dynamics

The A1 mechanism program — how a three-layer assembly could keep compatible branch
records as one moving delayed system, with same-record closure across period, active-root ledger,
deformation map, medium response, observer export, and event ledger — is an open
obligation, not carried in this chapter. The realization-independent
machinery lives with the shared mathematics in [Braid Mathematics](../../../../markdown/aaa/noether-braid/braid-mathematics.md#substrate-and-effective-levels).
Results enter this chapter only when established at their stated claim level.

For the strong-field continuation, see [Black Holes](../../../../markdown/aaa/spacetime/black-holes.md) and
[Horizon Chirality](../../../../markdown/aaa/spacetime/horizon-chirality.md).

### A2 Symmetry and Return Response

A2 is the fully symmetric Family-A member defined in [Braid Family A](../../../../markdown/aaa/noether-braid/braid-family-a.md#a2). This specialist chapter owns the mathematics and retention analysis unique to its exact face-opposite reference fixture: the invariant symmetry channels, the two-ring projection, the axial polarity dipole, the momentum screw, the near-antipodality diagnostic, and the isolated and sea-embedded return-response questions.

The chapter does not redefine A2 and does not certify a retained branch. Its exact results constrain the declared A2 fixture under their stated hypotheses. The realization-independent retention contract remains in [Braid Recovery Requirements](../../../../markdown/aaa/noether-braid/braid-recovery-requirements.md), and the family-general speed split remains in [Braid Mathematics](../../../../markdown/aaa/noether-braid/braid-mathematics.md#transverse-internal-motion-speed-budget-lemma).

#### Invariant Channels and Equivariant Reductions

The sharpest currently proved structure for A2 is a symmetry channel, not a retained branch. The face-opposite seed places the three electrinos opposite the three positrinos on the positive coordinate axes,

$$
\epsilon_{+,x}=(R,0,0),
\qquad
\epsilon_{+,y}=(0,R,0),
\qquad
\epsilon_{+,z}=(0,0,R),
\qquad
\epsilon_{-,i}=-\epsilon_{+,i}
$$

This seed lies on a common sphere, so it is the maximal-symmetry Family-A member: the A2 reference fixture defined in [Braid Family A](../../../../markdown/aaa/noether-braid/braid-family-a.md#a2). Two finite symmetry groups act on the seed by simultaneous spatial transformation and site relabeling. For a coordinate-axis permutation $\rho\in S_3$, let $M_\rho$ be the coordinate-permutation matrix and let $\rho$ permute site labels within each polarity; let $\iota$ compose point inversion with polarity exchange. Both act on configurations by

$$
(g\cdot\mathbf X)_\ell(t)=M_g\,\mathbf X_{g^{-1}\ell}(t)
$$

and because point inversion commutes with every permutation matrix, the groups are direct products: the zero-angular-momentum group $G_0=S_3\times\langle\iota\rangle$ of order twelve, and the body-diagonal rotating group $G_{\mathrm{rot}}=C_3\times\langle\iota\rangle$ of order six, where $C_3=\langle\varrho\rangle$ is the three-fold rotation about the body diagonal

$$
\hat{\mathbf n}=\frac{(1,1,1)}{\sqrt3}
$$

No physical process relabels an electrino as a positrino: every architrino is unique, with its own provenance and path history. The operations above are comparison maps between two possible configurations of the universe. If one configuration solves the delayed dynamics, its transformed twin solves it too. When the seed happens to be its own twin, the twins' shared trajectory is constrained, and that constraint is the entire content of the channel.

##### The Six-Point Symmetry Invariant Lemma

The channel statement is a derivation about the delayed dynamics, proved for the partner-wake master-equation kernel class. For receiver $\ell$ at reception time $T_r$, the retained acceleration law under proof is

$$
\mathbf A_\ell[\mathbf X]\!(T_r)
=
\sum_{\ell'}\;
\sum_{T_t\in\mathcal R_{\ell\ell'}[\mathbf X]\!(T_r)}
\sigma_\ell\sigma_{\ell'}\,\kappa\,
\frac{W(T_t)}{\left(d^2+\varepsilon^2\right)^{3/2}}\;\mathbf d
$$

where $\mathbf d=\mathbf X_\ell(T_r)-\mathbf X_{\ell'}(T_t)$ with $d=\|\mathbf d\|$, the causal roots $T_t$ solve $d=c_f(T_r-T_t)$ within the retained history window, $\varepsilon$ is the softening, $\kappa$ the coupling, and the acceleration weight is $W=c_f/|D_t|$ on a sign-certified transmitter-side Jacobian floor. Receiver-side velocity remains in the signed root-playback record $D_r/D_t$ but not in this instantaneous acceleration kernel.

Four explicit hypotheses carry the proof:

1. **Kernel equivariance.** The acceleration magnitude depends only on invariant scalars times the polarity product $\sigma_\ell\sigma_{\ell'}$, directed along $\hat{\mathbf d}$.
2. **Symmetric retained-root policy.** The retained-root set is determined by the root residual and declared invariant criteria only, with no ordering-dependent or label-dependent pruning.
3. **Well-posedness window.** On the window, pairwise separations keep a positive floor and all speeds stay below field speed by a fixed margin; then each directed pair has exactly one causal root, the Jacobian floor is automatic, and the method of steps yields a unique forward solution.
4. **Symmetric initial history.** The hold-window history is invariant under the acting group: the static seed is $G_0$-invariant, and the rigidly rotating seed about $\hat{\mathbf n}$ is $G_{\mathrm{rot}}$-invariant. Transpositions reverse the rotation sense and are excluded from the rotating group; this is where ordered-braid chirality first enters the rotating channel.

**Lemma.** Under these hypotheses, the unique solution remains on the fixed-point set of the acting group for as long as the window lasts.

The proof has two moves. First, functional equivariance: the root residual is built from norms, so the retained root sets of transformed pairs correspond, every kernel scalar is invariant, and the polarity product is preserved — permutations fix each $\sigma_\ell$, while $\iota$ flips both factors — so the acceleration functional transforms exactly as the configuration does. The $\iota$ case is precisely the charge-conjugate inversion oddness obligation: conjugating polarities and inverting space negates every acceleration. Second, uniqueness transfer: the transformed solution is again a solution with the same history, so uniqueness forces it to coincide with the original, which is exactly the statement that the solution stays on the fixed-point set.

The lemma converts the six-body problem into small closed reduced systems. On the zero-angular-momentum channel the fixed-point set is

$$
\epsilon_{+,x}=(a,b,b),
\qquad
\epsilon_{+,y}=(b,a,b),
\qquad
\epsilon_{+,z}=(b,b,a),
\qquad
\epsilon_{-,i}=-\epsilon_{+,i}
$$

a closed two-function state-dependent delay system in $(a,b)$. On the body-diagonal rotating channel,

$$
\epsilon_{+,y}=\varrho\,\epsilon_{+,x},
\qquad
\epsilon_{+,z}=\varrho^2\,\epsilon_{+,x},
\qquad
\epsilon_{-,i}=-\epsilon_{+,i}
$$

a closed three-function reduced system in $\epsilon_{+,x}$ alone. Once the branch also carries group velocity along $\hat{\mathbf n}$, translation breaks $\iota$ while preserving $C_3$, and the reduction needs two representative worldlines, $\epsilon_{+,x}$ and $\epsilon_{-,x}$.

Exact corollaries follow on the channel: the dynamic center is identically zero and antipodal pairs are exact; all six sites share one radius and one speed, so the reduced-radius diagnostic is exact rather than an empirical average; the acceleration of $\epsilon_{+,x}$ has the template $(A,B,B)$ forced by its stabilizer; and the kinematic angular momentum is exactly parallel to $\hat{\mathbf n}$ on the rotating channel.

The scope boundary is part of the result. Invariance of the channel does not prove stability transverse to it, and no statement in this section claims branch retention. The lemma is a derivation-closure result for the invariance and reduction obligations only, proved for the declared kernel class. Any solver kernel or runner that violates kernel equivariance or root-policy symmetry — an axis-fixed cap, asymmetric softening, or ordering-dependent pruning — voids the conclusion for that run, which makes the lemma an audit predicate on implementations. Applying the channel to any retained-history record still requires the same-record receiver-side, action, wake, event, support, and stability entries demanded by [Braid Recovery Requirements](../../../../markdown/aaa/noether-braid/braid-recovery-requirements.md).

##### Polarity Conjugation

Because the delayed acceleration kernel depends on polarity only through products $\sigma_i\sigma_j$, global polarity conjugation leaves every trajectory unchanged: an electrino-face-leading branch and a positrino-face-leading branch are exactly degenerate in isolation. The leading-octant sign can acquire physical meaning only through coupling to an environment that is not polarity-balanced, which is where ordered-braid chirality must obtain its content; the helicity sign of the momentum screw below is the candidate carrier of that chirality label. Translation along $\hat{\mathbf n}$, by contrast, produces a real asymmetry: with $\iota$ broken, the leading face meets fresh medium while the trailing face rides in the branch's own wake, and this fore-aft wake asymmetry is the native deformation channel developed further in [A1 Dynamics](../../../../markdown/aaa/noether-braid/braid-a1-dynamics.md#a1-dynamics).

#### A2 Two-Ring Geometry

Every site of the face-opposite A2 seed has the same height $\pm R/\sqrt3$ along $\hat{\mathbf n}$ and the same lever arm $R\sqrt{2/3}$ from the axis, because the body diagonal makes equal angles $\arccos(1/\sqrt3)$ with the three coordinate axes. Viewed along $\hat{\mathbf n}$, the three electrinos form one triangular ring below the mid-plane and the three positrinos form a matching triangular ring above it. The two triangles are staggered by $60^\circ$, so their projections interleave into a hexagon.

The two-ring view also organizes the neutral braid's channel bookkeeping. Each site's two repulsive channels connect it to its own ring mates, and its three attractive channels connect it to the opposite ring. Intra-ring repulsion spaces each ring at $120^\circ$, while inter-ring attraction sets the ring separation. The same minimum-energy logic that arranges accessory charges around a dressed assembly therefore already organizes the core itself: two mutually repelling rings are bound face-to-face by cross-ring attraction. Each member of one ring couples attractively to all three members of the other, and the staggered rings give those connections a zigzag pattern. Under rotation the connections wind into helices about the axis, and the handedness of the winding is the chirality datum carried by the rotating channel. Equal lever arms give every site the same tangential speed under rigid rotation about $\hat{\mathbf n}$, and on the rotating channel the three opposite-polarity pairs hold an exact $120^\circ$ phase separation at every instant, because the rotation by $2\pi/3$ about $\hat{\mathbf n}$ is one of the acting symmetries rather than an approximate phase convention.

#### Moments and the Axial Polarity Dipole

A **moment** here is a polarity-weighted sum over the configuration: the plain total $\sum_\ell\sigma_\ell$ is the net polarity inventory, the first moment $\sum_\ell\sigma_\ell\mathbf X_\ell$ is the dipole, and higher moments record signed shape at finer order. Moments matter because they are what a distant receiver can reconstruct from the superposed delayed potential, ranked by distance: the $\ell$-th moment controls the contribution fading as $1/r^{\ell+1}$. For a polarity-neutral assembly the dipole is independent of the choice of origin, so the braid's dipole is a well-defined property of the branch rather than of a coordinate convention.

Since $\mathbb I+\varrho+\varrho^2=3\hat{\mathbf n}\hat{\mathbf n}^{\!\top}$ for the cyclic coordinate permutation $\varrho$, the polarity-signed dipole of the channel is exactly axial at all times, even under drift:

$$
\sum_{\ell}\sigma_\ell\,\mathbf X_\ell
=
3\left(\hat{\mathbf n}\cdot\left(\epsilon_{+,x}-\epsilon_{-,x}\right)\right)\hat{\mathbf n}
$$

The transverse dipole components cancel in balanced three-phase fashion. This cancellation is a statement about the braid's summed distant signature, not about the accelerations inside it: each architrino still receives the full delayed influence of all five partners through its own causal roots, and none of those per-receiver contributions vanish. What cancels is the collective polarity-signed moment that a distant receiver reconstructs from the superposed wakes. A branch that flattens toward the transverse plane therefore loses its leading polarity-signed moment entirely: the flattened fast configuration is quiet at dipole order, with its first surviving structure at higher moment order. This identity is the channel's native contribution to the energy-shielding story used by the Family-A chapters, and it links the terminal planar limit to wake quietness rather than to increased exposure.

#### Momentum Screw and Helicity

The same projector identity pins both kinematic momenta to the axis on the rotating channel:

$$
\mathbf P_{\mathrm{kin}}
=
3\,\hat{\mathbf n}\cdot\left(\mathbf v_{+,x}+\mathbf v_{-,x}\right)\hat{\mathbf n},
\qquad
\mathbf J_{\mathrm{kin}}\parallel\hat{\mathbf n}
$$

The body-diagonal direction is therefore the central axis of the branch's momentum screw: the unique direction that carries both linear and angular kinematic momentum, with the transport state reduced to the two scalars $P_\parallel$ and $J_\parallel$. Their origin-independent combination $\mathbf J\cdot\mathbf P$ — helicity in normalized form, screw pitch in geometric form — is the natural combined label, since an origin shift changes $\mathbf J$ only by a term orthogonal to $\mathbf P$. In delayed dynamics the particle-only momenta are not separately conserved; the causal wakes carry momentum and angular momentum of their own, and conservation is a statement about the combined particle and wake ledger. On the channel, symmetry fixes the momentum directions exactly while the magnitudes exchange with the wake ledger.

For the translating rotating A2 channel, group velocity along $\hat{\mathbf n}$ is perpendicular to every site's tangential velocity. Its exact site-speed split is therefore an A2 realization of the family-general [transverse internal-motion speed-budget lemma](../../../../markdown/aaa/noether-braid/braid-mathematics.md#transverse-internal-motion-speed-budget-lemma). A mechanism that pins the total site-speed budget remains an open branch hypothesis.

#### Retention and Return Response

The prescribed A2 geometry and its exact near-rest reference fixture do not establish retention. The following diagnostic and no-return result state what an A2 branch record must overcome.

##### Near-Antipodality Recovery Diagnostic

Exact antipodality belongs to the A2 reference fixture. A retained record under external disturbance need not preserve that ideal relation at every instant, so recovery is tested separately from the member definition. Let $\iota$ exchange the two opposite-polarity members of each binary, let $\mathbf C(T)$ be the declared braid-center curve, and let $R$ be the common A2 binary radius. Define

$$
\delta_{\mathrm{anti},i}(T)
=
\frac{
\left\| \mathbf X_i(T)+\mathbf X_{\iota(i)}(T)-2\mathbf C(T)\right\|
}{R}
$$

A candidate recovery entry must declare tolerances and show

$$
\sup_{T\in J}\delta_{\mathrm{anti},i}(T)
\leq
\varepsilon_{\mathrm{anti}},
\qquad
\delta_{\mathrm{anti},i}(T+T_{\mathrm{rec}})
\leq
\theta_{\mathrm{rec}}\,\delta_{\mathrm{anti},i}(T)+\varepsilon_{\mathrm{drive}},
\qquad
0\leq\theta_{\mathrm{rec}}<1
$$

for $T,T+T_{\mathrm{rec}}\in J$. Here $T_{\mathrm{rec}}$ is the declared recovery time, $\theta_{\mathrm{rec}}$ is the dimensionless recovery contraction factor, and $\varepsilon_{\mathrm{drive}}$ is the driving residue. This is a certificate target, not an established A2 property.

##### Isolated Release and the Return-Response Question

Two claims about the face-opposite seed on the [zero-angular-momentum channel](#invariant-channels-and-equivariant-reductions) must not be conflated. The symmetry claim is established: the seed stays exactly on the invariant channel, with the dynamic center at zero, all six radii equal, and antipodal partners exact — an equivariance theorem of the channel, independent of any trajectory. The retention claim is a separate question, and the isolated seed does not answer it in the affirmative: the channel carries no centrifugal support and the void supplies no restoring term, so nothing in the isolated construction makes it a self-maintaining branch. What the seed actually does once released is open, and is a target for direct evolution rather than a recorded result. Claim level: established equivariance theorem for the channel; the dynamical fate is open.

This pairing is informative rather than damaging. A2 was never expected to close as a bare partner-wake problem in the Euclidean void: the candidate stabilizing ingredients — same-transmitter self-hit contributions, retained wake-energy response, shielding, angular-momentum-bearing initial data, and local Noether sea response — are exactly the ingredients the isolated diagnostic omits. The void result therefore sharpens the retention question into a return-response question: which internal or environmental term changes the reduced-radius equation from escape to a second turning point, a stable support radius, or a bounded limit cycle. The threefold rotating channel above supplies the first untested internal candidate, since the zero-angular-momentum release is a radial free-fall chart with no centrifugal support. The environmental candidate is the sea-embedding route stated next.

The question can be stated sharply rather than qualitatively, because the invariant channel carries a conditional no-return certificate. Two monitored conditions carry it: sub-field speed, meaning every worldline stays below the field speed $c_f$; and an opposite-polarity separation floor, meaning the closest opposite-polarity non-antipodal pair stays at least one reduced radius $R$ apart. The floor holds automatically from the channel's own geometry, and the retained causal-root count reduces to exactly one root per directed pair, so sub-field speed is the only condition that must be watched forward in time. Under the two conditions the reduced-radius acceleration satisfies a signed inverse-square lower bound $\ddot R\ge -K/R^2$, with $K$ built only from the branch's coupling, its declared speed and weight caps, and the polarity structure. Same-polarity partner terms cancel by an exact radial-sign argument, and the opposite-polarity terms are bounded by the floor. A short energy-integral argument then closes it: if the outward speed at a chosen certificate time clears the margin $\dot R^2>2K/R$, the reduced radius cannot turn back while the two conditions hold. This conditional statement is an established derivation on the channel, not a retained-branch claim. Whether any isolated branch actually clears the margin is an evolution question and is open.

The consequence sharpens the return-response question to a single named target. A return turn cannot be the first event — any return must be preceded by a violation of sub-field speed or the opposite-polarity floor — so once the margin is cleared on the isolated channel the reduced radius cannot turn back while the branch stays sub-field, and retention is possible only through a term that ends sub-field speed first, driving the internal speed to the field-speed hinge where the outward drive stops before the radius can turn. If the anti-damping indications of [Braid Mathematics](../../../../markdown/aaa/noether-braid/braid-mathematics.md#scoped-anti-damping-results) hold, any such transverse pumping feeds escape rather than return, and its only bearing on the certificate is that it pushes the speed toward $c_f$, the condition whose failure ends the window. The open target is therefore precise: exhibit an internal or environmental absorber that ends sub-field speed before the margin is crossed. The fold-geometry constraint on single-site absorbers is set out in [Braid Mathematics](../../../../markdown/aaa/noether-braid/braid-mathematics.md#fold-geometry-of-the-click-coincidence-versus-finite-chord); the environmental candidate is the sea-embedding route below.

##### The Sea-Embedding Route

The environmental route embeds the same A2 configuration at rest in a surrounding [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md) of like assemblies. This does not define a new taxonomy member; it is the same configuration with like assemblies allowed to supply the environmental response needed for retention. In this reading, isolation is a limiting seed chart, and physical retention is local persistence inside an already populated medium.

The route inherits the return-response question directly: it asks whether the delayed response of a like-assembly population changes the reduced-radius equation from escape to a second turning point, a stable support radius, or a bounded limit cycle. Closing it requires an explicit like-assembly population record, a declared boundary condition, and a Noether sea response entry tied to the same target branch, under the same-record evidence discipline of [Braid Recovery Requirements](../../../../markdown/aaa/noether-braid/braid-recovery-requirements.md). Whether a static like-assembly environment can supply retention, and whether a dynamic, formation-history-driven Noether sea response can do what a static one cannot, are open questions; no environmental verdict is carried in this chapter.

#### Claim Boundary

The invariant-channel lemma, its exact channel corollaries, the two-ring geometry, the dipole identity, the momentum-screw alignment, and the conditional no-return bound retain their stated derivation or exact-kinematic grades. None establishes A2 branch retention. A same-record evolution that violates the lemma's hypotheses or its predicted fixed-point relations would falsify application of the theorem to that record; a retained A2 claim still requires the complete certificate defined in [Braid Recovery Requirements](../../../../markdown/aaa/noether-braid/braid-recovery-requirements.md).

### A3.3 Doubling-Frequency Resonance Lock

This chapter owns the specialized A3.3 doubling-frequency $4{:}2{:}1$ lock study inside the broader [Noether Braid Configuration Space](../../../../markdown/aaa/noether-braid/noether-braid-configuration-space.md). The persistent indices $a\in\{1,2,3\}$ identify the three A3 binaries, with $f_1:f_2:f_3=4:2:1$ in A3.3. The zero-axial-offset A1.3 member is the $h_1=h_2=h_3=0$ locus of the same frequency chart. The candidate is definitionally frequency-separated and tests that chart under explicit support, field-speed-carrier, phase-return, and stability assumptions. It does not order the radii, make doubling frequency the default Noether braid frequency, certify A3 dynamics from kinematics, or generalize to B1, whose iso-frequency common-axis structure has no doubling ladder to lock.

It should be read together with [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md), [A3.3](../../../../markdown/aaa/noether-braid/braid-family-a.md#a3-constrained-variants), [A1 Dynamics](../../../../markdown/aaa/noether-braid/braid-a1-dynamics.md#a1-dynamics), and [Mapping the Planck Scale](../../../../markdown/aaa/philosophy-history/theory-bridges/planck-scale-nested-shell-braid-alignment.md), which provide the assembly scaffold, zero-offset subset, geometry, and scale-setting context for the lock relations derived here.

The level distinctions matter throughout. Ontologically, the three indexed binaries are assembly components built from architrino constituents. Dynamically, the reduced model replaces their full delayed causal-wake history by a finite-$\eta$ branch chart. Effectively, low-order multipoles and potentials are comparison summaries of that branch behavior. As a derivation target, an integer lock is selected only after the phase-return degree/holonomy, cancellation score, and stability gap all favor the same branch.

The analysis keeps the field speed $c_f$ explicit rather than setting it to one. Here $r_a$ is the characteristic radius and $v_a=\|\mathbf{V}_a\|$ is the scalar tangential speed of one member of binary $a$ around that binary's center. These analysis variables do not replace the exact endpoint-distance coordinate $R_a$ in the taxonomy.

The general indexed state $\mathcal T_{3B}$, its $S_3$ relabeling action, and the iso-frequency and integer-ratio subfamilies are defined in [Noether Braid Configuration Space](../../../../markdown/aaa/noether-braid/noether-braid-configuration-space.md#unordered-layer-semantics). The doubling-frequency specialization adds the indexed relation $f_1:f_2:f_3=4:2:1$, the exact carrier identity $v_a=2\pi f_a r_a$, integer phase-return data, and the finite-$\eta$ selection and stability rows. It does not add a radius order or a permanent dynamical role assignment.

#### Status and Assumptions

The lock analysis is organized around one exact identity and four explicit assumptions. This separation prevents a kinematic formula from being mistaken for a dynamical selection principle.

#### Exact Kinematic Identity

For each binary carrier,
$$
v_a = 2\pi f_a r_a = \beta_a c_f,
\qquad
0<\beta_a,
\qquad
c_f>0
$$

Equivalently,
$$
f_a=\frac{v_a}{2\pi r_a},
\qquad
r_a=\frac{v_a}{2\pi f_a},
\qquad
v_a=2\pi f_a r_a
$$

Plain language: for any one binary carrier, if we know any two of frequency, tangential speed, and radius, then the third is fixed.

This identity is exact. It is not an assumption, and it does not select a lock by itself.
The logical spine is therefore:

1. **Kinematics:** $v_a=2\pi f_a r_a$ relates speed, frequency, and radius without introducing topology.
2. **Integer closure:** Assumption 2 is the only place where the integer pair $(m,n)$ enters; it turns frequency commensurability into return-map degree/holonomy data.
3. **Selection:** Assumption 4 and the finite-$\eta$ return map decide whether one already-integer-labeled sector is dynamically preferred.

Everything before Assumption 2 is topology-free kinematics. Everything after Assumption 2 is selection among sectors that already carry integer phase-return data.

#### Assumption 1 (Candidate Caustic-Grazing Carrier)

For a reduced exterior or horizon-transition comparison chart, choose a candidate carrier index $h\in\{1,2,3\}$. The index $h$ is an analysis parameter to be compared across all admissible choices, not an A3.3 taxonomy assignment. The candidate is not pinned exactly on an infinite-acceleration surface. It is modeled as a caustic-grazing carrier whose cycle-averaged value is the field speed:
$$
v_h^{\mathrm{car}}=c_f,
\qquad
\beta_h^{\mathrm{car}}=1
$$
For compact notation, the algebra below writes $v_h=c_f$ and $\beta_h=1$ for this carrier value.

The branch-level motion may have microscopic crossings
$$
v_h(T)=c_f+\delta v_h(T),
\qquad
\langle \delta v_h\rangle_W=0
$$
over the declared window $W$. Each regularized crossing of the $J_h^{t}(\theta_h)=0$ boundary is a caustic transit with finite impulse
$$
\Delta\mathbf{V}_{h,j}
=
\int_{T_j^-}^{T_j^+}
\mathbf{A}_h^{(\eta)}(T)\,dT,
\qquad
\left\|\Delta\mathbf{V}_{h,j}\right\|<\infty
$$
rather than an infinite-acceleration constraint. These impulse events are candidate mechanical origins for the discrete causal-root ledger steps used in the [energy bookkeeping](../../../../markdown/aaa/dynamics/energy.md#self-hit-echo-and-discrete-steps-working-note).

This is the main regime assumption of the doubling-frequency-lock analysis. The speed $c_f$ is the propagation speed of causal isochrons in the reduced dynamics, not an observer-level claim about an effective metric.
It is not a claim that every Noether braid regime has any fixed binary exactly at $c_f$. A promoted result must compare the three possible $h$ assignments or prove from the retained record why only one is admissible.

#### Assumption 2 (Exact Integer Phase Closure)

Let the binary-3 reference period be $P_3=\frac{1}{f_3}$. Assume that when binary 3 completes one full cycle, binaries 2 and 1 also land exactly at the beginning of their own cycles. Equivalently, there exist integers
$$
m,n\in\mathbb{N},
\qquad
1<m<n
$$
such that
$$
\theta_3(T+P_3)=\theta_3(T)+2\pi
$$
$$
\theta_2(T+P_3)=\theta_2(T)+2\pi m
$$
$$
\theta_1(T+P_3)=\theta_1(T)+2\pi n
$$

Therefore the indexed frequency triplet is $f_1:f_2:f_3=n:m:1$, with $f_2=m f_3$ and $f_1=n f_3$.

Plain language: after one binary-3 revolution, binaries 2 and 1 have completed whole numbers of revolutions as well, so the three-binary pattern closes exactly. Binary 3 is the phase reference because the A3.3 row assigns it the base frequency, not because it is geometrically outer.

This is the reduced constant-frequency carrier model. It is a branch-level closure assumption, not a statement that the assembly has only three degrees of freedom. In the full Noether braid closure problem, the simple phases $\theta_a(T)=q_a\omega_3 T+\phi_a$, with $(q_1,q_2,q_3)=(n,m,1)$ and $\omega_3=2\pi f_3$, are replaced by integrated winding, causal-root, and frame-phase ledgers over the accepted branch chart.

#### Assumption 3 (Fixed Relative Phase Lock)

The lock is not just commensurate in frequency. It also carries fixed relative phase offsets over time. One convenient formulation is
$$
\phi_{23}(T)\equiv \theta_2(T)-m\theta_3(T)=\phi_{23}^\ast
$$
$$
\phi_{13}(T)\equiv \theta_1(T)-n\theta_3(T)=\phi_{13}^\ast
$$
with constants $\phi_{23}^\ast,\phi_{13}^\ast$.

Plain language: the binaries keep the same timing relationship cycle after cycle rather than drifting through one another.

#### Bundle Holonomy Reading

Assumptions 2 and 3 can be restated as a phase-bundle condition. Let the binary-3 phase be the base cycle and define the relative connection one-forms

$$
\vartheta_{23}
=
d\theta_2-m\,d\theta_3,
\qquad
\vartheta_{13}
=
d\theta_1-n\,d\theta_3
$$

Exact integer phase closure says the covering degrees over one binary-3 cycle are

$$
\frac{1}{2\pi}\oint_{S^1_3}d\theta_2=m,
\qquad
\frac{1}{2\pi}\oint_{S^1_3}d\theta_1=n
$$

or equivalently

$$
\oint_{S^1_3}\vartheta_{23}=0,
\qquad
\oint_{S^1_3}\vartheta_{13}=0
\quad
(\mathrm{mod}\ 2\pi)
$$

on the locked branch. Fixed relative phase then says these one-forms are flat on the retained return chart: their integrated values do not drift, and the constants $\phi_{23}^\ast,\phi_{13}^\ast$ are the residual flat-connection data. The discrete and continuous pieces should be kept separate:

$$
(m,n)=\text{covering degrees over }S^1_3,
\qquad
(\phi_{23}^\ast,\phi_{13}^\ast)=\text{flat-connection moduli}
$$

Thus the lock is a flat relative-phase connection with integer holonomy, not a literal first Chern class over the binary-3 phase circle. In the language of [Effective Lagrangian](../../../../markdown/aaa/dynamics/effective-lagrangian.md#ordinary-hamiltonian-orientation), the integers $(m,n)$ are the phase-return degree data that make the reduced action-angle chart globally replayable rather than merely local.

The phase-bundle picture also requires genuine three-dimensional binary-plane independence. Let $\hat{\mathbf{n}}_1,\hat{\mathbf{n}}_2,\hat{\mathbf{n}}_3$ be the orbital-plane normals of the three binaries and define

$$
D_{\mathrm{plane}}
=
\det
\left[
\hat{\mathbf{n}}_1,\hat{\mathbf{n}}_2,\hat{\mathbf{n}}_3
\right]
$$

The reduced $T^3$ lock is nondegenerate only while $D_{\mathrm{plane}}\neq0$. Mutual orthogonality gives $|D_{\mathrm{plane}}|=1$, while horizon-alignment or coplanar degeneration drives $D_{\mathrm{plane}}\to0$ and collapses the three-circle bundle to a lower-dimensional projection. The determinant is therefore the natural order parameter for the loss of doubling-frequency precession at alignment.
For a promoted finite-$\eta$ chart this is a conditioning floor,
$$
|D_{\mathrm{plane}}|\ge\delta_{\mathrm{plane}}>0.
$$
It is the phase-bundle analogue of the basis-conditioning and aperture floors in the frame-construction and detection chapters: $D_{\mathrm{plane}}\to0$ means the three plane normals no longer define a stable oriented frame. The codimension-one wall $D_{\mathrm{plane}}=0$ is also where the near-orthogonal Noether braid phase chart degenerates toward a coplanar cyclic sector, so crossing it is a sector-wall event rather than a harmless coordinate limit.

#### Assumption 4 (Bundle-Flatness and Cancellation Selection Principle)

Among the admissible binary-3-normalized integer locks $(1:m:n)$, the physically selected lock is assumed to be the one whose phase bundle admits the flattest replayable connection while minimizing exposed causal-wake leakage. The cycle-averaged cancellation of a low-order causal-wake multipole or effective potential signal is the effective diagnostic for that deeper bundle condition.

This is a selection principle, not yet a theorem. Its role is to explain why one exact integer lock might be preferred over nearby commensurate alternatives. The primary object is the branch bundle; the cancellation score is accepted only when it is computed from the same holonomy data, candidate-carrier impulse record, and finite-$\eta$ return map.
The admissible class must be declared before minimization: positive radii, $1 < m < n$, a fixed finite-$\eta$ branch chart, nonzero branch-transversality floors, and the speed bounds assigned to the exterior/horizon regime.

For a declared comparison chart, candidate binary $h$ is the curvature carrier. Between caustic events the locked triple is modeled as flat phase transport. At its regularized caustics, the connection acquires concentrated curvature,

$$
\Omega_{\mathrm{phase}}
=
\sum_j
\mathcal{F}_j\,
\delta_\eta(\theta_h-\theta_{h,j}^{\ast})\,
\sum_{b\ne h}d\theta_h\wedge d\theta_b
+
\Omega_{\mathrm{reg}}
$$

where $\theta_{h,j}^{\ast}$ are the candidate-carrier caustic phases and $\mathcal{F}_j$ is proportional to the finite caustic impulse $\Delta\mathbf{V}_{h,j}$ and its wake-history increment on the retained branch. Any energy-routing fulcrum is therefore geometric and branch-derived: transfers may concentrate at the carrier caustic phases where the phase-bundle connection is not flat. This is the same ledger event class used by the [self-hit echo bookkeeping](../../../../markdown/aaa/dynamics/energy.md#self-hit-echo-and-discrete-steps-working-note).

A minimal test functional can be written before committing to a particular lock. Let $(q_1,q_2,q_3)=(n,m,1)$, with phase variables $\theta_k(T)=q_k\omega_3 T+\phi_k$ and $\omega_3=2\pi f_3$. For a low-order truncation depth $L$, define
$$
S_L(T)
=
\sum_{k\in\{1,2,3\}}\sum_{\ell=1}^{L}
A_{k,\ell}(\beta_k,r_k,\eta,D_t,D_r,W^{\mathrm{acc}},J_k^{t})\,
e^{i\ell(q_k\omega_3 T+\phi_k)}
$$
The coefficients $A_{k,\ell}$ are not free fit parameters. They must be extracted from the same finite-$\eta$ transmitter-side acceleration-weight, branch-transversality, and causal-wake ledger used to test the candidate lock.
They therefore belong to the dynamics of the causal-wake branch chart, even when the resulting signal is later summarized as an effective potential.
For the caustic-grazing candidate carrier this extraction is not an ordinary smooth Fourier coefficient. A carrier harmonic must carry the caustic transversality weight of the window while keeping transmitter-side acceleration/action strength on the same retained record, schematically

$$
A_{h,\ell}
=
\int_0^{2\pi}
\frac{
w_{h,\ell}^{r}(\theta_h)
}{
|J_h^{t}(\theta_h)|+\eta_J
}
e^{-i\ell\theta_h}\,d\theta_h
$$

with $\eta_J$ the declared Jacobian-floor regularization and $w_{h,\ell}^{r}$ the branch-derived numerator computed from the same retained $D_t$, $D_r$, and $W^{\mathrm{acc}}$ row for that harmonic channel. The $J_h^{t}$ factor is a caustic-window transversality weight, not a substitute for transmitter-side acceleration weight. As $\eta_J$ is lowered, the coefficient is dominated by neighborhoods of the caustic phases $\theta_{h,j}^{\ast}$, while the integrated impulse remains finite under the simple-caustic rule in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#caustic-transit-and-finite-impulse). Thus the selection question is not whether three generic Fourier amplitudes cancel, but whether the finite candidate-carrier impulse deposits the right spectral weight into the first common resonance block.
The cycle-averaged cancellation score over one binary-3 reference window starting at $T_\ast$ is
$$
C_L(m,n;\phi)
=
\frac{1}{P_3}\int_{T_\ast}^{T_\ast+P_3} |S_L(T')|^2\,dT'
=
\sum_{\nu}
\left|
\sum_{(k,\ell):\,\ell q_k=\nu}
A_{k,\ell}e^{i\ell\phi_k}
\right|^2
$$
The doubling-frequency claim becomes a theorem target only if $(m,n)=(2,4)$ minimizes this score under the admissible branch equations and retains a positive stability gap.

**Harmonic-overlap lemma.** The score decomposes into resonance blocks labeled by $\nu$. A phase choice can affect cancellation between two binaries only when their finite harmonic supports overlap:
$$
\nu\in q_k\{1,\ldots,L\}\cap q_b\{1,\ldots,L\}
$$
for distinct binary indices $k$ and $b$. If a block has no overlap, its contribution to $C_L$ is phase-independent and cannot select an integer lock. For the doubling-frequency candidate $(m,n)=(2,4)$, the first binary-3/binary-2 overlap is $\nu=2$ via $(3,\ell=2)$ and $(2,\ell=1)$; the first all-binary overlap is
$$
\nu=4
$$
via $(3,\ell=4)$, $(2,\ell=2)$, and $(1,\ell=1)$. Thus this functional can select $1:2:4$ only if $L\ge4$ and the $\nu=4$ block has nontrivial branch-derived amplitudes. A complete cancellation of that all-binary block additionally requires the amplitude magnitudes to satisfy the polygon condition
$$
\max(|A_{3,4}|,|A_{2,2}|,|A_{1,1}|)
\le
\text{sum of the other two}
$$
The lemma is only a harmonic support statement. It shows where cancellation is possible; it does not show that the branch-derived amplitudes or the return-map stability actually select the doubling-frequency lock.
The selection therefore has two independent requirements. The topological requirement is that the all-binary resonance block is nonempty; for the doubling-frequency candidate this is the $\nu=4$ block. The dynamical requirement is that the branch-derived complex amplitudes in that block can close a polygon after the caustic-weighted carrier contribution is included. The first requirement belongs to the covering structure; the second belongs to the finite-$\eta$ delayed dynamics and cannot be inferred from topology alone.

Topologically, the same $\nu=4$ statement says the doubling-frequency lock is the first common cover of the three phase circles. The covering maps can be written

$$
S^1_3
\xleftarrow{\ \times m\ }
S^1_2
\xleftarrow{\ \times n/m\ }
S^1_1
$$

when $m$ divides $n$. The doubling-frequency case $m=2,\ n=4$ is the minimal nontrivial self-similar cover because each indexed phase circle double-covers its reference neighbor. More generally, self-similar covers obey $n=m^2$; after $1{:}2{:}4$, the next such comparison family is $1{:}3{:}9$, not $1{:}2{:}3$ or $1{:}3{:}6$. This does not prove the doubling-frequency branch wins dynamically, but it explains why $1{:}2{:}4$ is the first topologically clean candidate before the amplitude calculation begins.
Equivalently, the resonance blocks are the isotypic components of the integer action generated by the lock, and $\nu=\operatorname{lcm}(1,2,4)=4$ is the first common period of all three circles. The doubling-frequency tower is the unique minimal repeated cover
$$
S^1\xleftarrow{\times 2}S^1\xleftarrow{\times 2}S^1
$$
among non-identity integer towers. This is why the doubling-frequency family is also the natural candidate for a renormalization-style fixed point in the truncation analysis: repeated double covering is the simplest scale-similar phase organization.

#### Non-Assumptions

The doubling-frequency-lock analysis does **not** assume:

- common-speed closure $v_1=v_2=v_3$,
- any radius ordering or self-similar radius relation,
- or the specific frequency lock $1:2:4$ at the outset.

Those are possible special cases or later outcomes, not starting axioms here.
Only exact integer closure is studied here. Rational or self-similar locks can be compared only after clearing denominators or constructing a separate branch map.

#### Immediate Consequences

This section is pure algebra from the exact identity and the first two assumptions. It does not use the cancellation principle.

Let
$$
(q_1,q_2,q_3)=(n,m,1).
$$
The exact identity gives every characteristic radius relative to the binary-3 reference radius:
$$
r_a
=
\frac{\beta_a c_f}{2\pi q_a f_3},
\qquad
\frac{r_a}{r_3}
=
\frac{\beta_a}{q_a\beta_3},
\qquad
a\in\{1,2,3\}.
$$
If the candidate carrier is binary $h$, Assumption 1 adds only $\beta_h=1$. It does not order the other radii. Thus the frequency ratio and one field-speed condition still leave the remaining speed factors to be determined by the branch dynamics.

#### Proposition 1 (Exterior Integer Lock Formulas)

Under Assumptions 1-2,
$$
f_1:f_2:f_3 = n:m:1
$$
and
$$
r_1:r_2:r_3
=
\frac{\beta_1}{n}:\frac{\beta_2}{m}:\beta_3.
$$

**Proof.** The frequency ratio is exactly Assumption 2. The radius ratios follow from
$$
r_a=\frac{\beta_a c_f}{2\pi f_a}
$$
together with $(f_1,f_2,f_3)=(nf_3,mf_3,f_3)$. The carrier choice adds $\beta_h=1$ only after $h$ is declared. $\square$

The geometry is controlled by integer phase closure plus a separately declared caustic-grazing carrier condition. The proposition makes no claim about which integer pair or carrier index is dynamically preferred.

#### Could $1{:}2{:}4$ Be a Solution?

If one later chooses the doubling-frequency integers
$$
m=2,
\qquad
n=4
$$
then
$$
f_1:f_2:f_3 = 4:2:1
$$
but the radius ratios become
$$
r_1:r_2:r_3
=
\frac{\beta_1}{4}:\frac{\beta_2}{2}:\beta_3.
$$

So the doubling-frequency lock is a viable candidate pattern, but it does **not** by itself imply equal-speed geometry, and it does **not** by itself imply a self-similar radius law unless further assumptions are added.

#### What Exact Periodicity Gives, and What It Does Not

Exact periodicity naturally supports rational or integer commensurability, but it does not by itself choose the integers $m,n$.

What exact lock gives:

- the three indexed frequencies lie on a commensurate lattice,
- the three-binary configuration repeats after one binary-3 reference period,
- fixed relative phases become meaningful dynamical observables,
- the covering data $(m,n)$ become phase-bundle winding data for the retained branch chart.

What exact lock does not give by itself:

- that the preferred lock is doubling-frequency,
- that the branch speeds are equal,
- that the radii are self-similar,
- or that cancellation is actually maximal for one specific integer pair $(m,n)$.

The bundle-flatness and cancellation principle is the extra ingredient intended to select among the many admissible integer locks.

#### Interpreting the Cancellation Principle

The motivation for Assumption 4 is that a cycle-closing integer lock can support persistent superposition over repeated binary-3 reference periods only when the relative phase connection stays flat enough to replay. If the phase organization is favorable, the low-order causal-wake multipole or effective potential contribution can cancel more effectively over one full return cycle.

At the substrate level, the relevant quantity is exposed causal-wake leakage. At the effective level, the same organization may be reported as reduced low-order potential signal. At the inference level, the reduced model is allowed to select a lock only if the cancellation gap survives the declared truncation and stability tests.

In that sense, the selection principle is closer to a flat-bundle replay test than to a bare numerology of integer ratios. The intuition is that a physically preferred lock should minimize exposed wake leakage, phase-slip variance, and residual phase curvature subject to the delayed dynamics. If the bundle-flatness diagnostic and the cancellation score disagree, the cancellation score is only an effective summary and cannot by itself overrule a holonomy or return-map failure.

This does not yet prove which pair $(m,n)$ wins. It states the criterion that the reduced model should test.

#### RG-Style Truncation Test

The cancellation functional uses a finite harmonic depth
$$
L
$$
That truncation must be certified rather than assumed. The useful analogy from renormalization-group reasoning is not that $\mathbb{A}\mathbb{A}\mathbb{A}$ inherits a field-theory RG flow, but that discarded modes must be shown irrelevant for the decision being made.

The branch geometry predicts which modes are most dangerous. Smooth noncarrier binaries should have rapidly decaying coefficients,

$$
|A_{b,\ell}|
\le
C e^{-c\ell},
\qquad b\ne h
$$

on an analytic replayable chart. The candidate carrier instead has an algebraic pre-cutoff tail because its impulse is phase-localized:

$$
|A_{h,\ell}|
\lesssim
C_{\eta}\,\ell^{-p_{\mathrm{fold}}}
$$

with $p_{\mathrm{fold}}$ fixed by the caustic normal form and the regulator. Here $S_L$ is the impulse-accumulated velocity-row signal obtained after integrating the regularized carrier impulse through the retained branch record; it is not the unintegrated acceleration or potential row. In a local fold coordinate $x=\theta_h-\theta_{h,j}^{\ast}$, a generic Whitney $A_2$ fold gives a velocity-row cusp $B_0+B_1|x|^{1/2}+O(x)$, whose Fourier coefficients scale as $\ell^{-3/2}$. The corresponding unintegrated acceleration-row singularity would scale as $|x|^{-1/2}$ and would not supply the $L_{\mathrm{eff}}^{-2}$ tail budget used below. Thus the velocity-row normal form gives the pre-cutoff exponent
$$
p_{\mathrm{fold}}=\frac{3}{2}.
$$
A cusp or higher catastrophe would change this exponent and therefore change the truncation budget. The finite-depth proof must therefore report the carrier-caustic spectral exponent or cutoff, not only assert that high harmonics are small. In the RG analogy, the smooth noncarrier harmonics are irrelevant tails, while the carrier caustic block is the marginal channel that can still affect selection beyond the first all-binary block.

For a candidate lock $(m,n)$, define the tail score
$$
T_L(m,n)
\equiv
\sum_{\nu>L_{\mathrm{eff}}}
\left|
\sum_{(k,\ell):\,\ell q_k=\nu}
A_{k,\ell}e^{i\ell\phi_k}
\right|^2
$$
where
$$
L_{\mathrm{eff}}
$$
is the largest resonance block retained in the selection audit. The finite-depth proof must supply a bound
$$
T_L(m,n)\le \varepsilon_L
$$
uniformly over the admissible branch chart and then compare the winner gap
$$
\Delta C_L
\equiv
\min_{(m,n)\ne(m_\ast,n_\ast)}
\big(C_L(m,n)-C_L(m_\ast,n_\ast)\big)
$$
against the truncation error. A lock is selected by the finite calculation only if
$$
\Delta C_L>2\varepsilon_L
$$
For the generic $A_2$ fold exponent, the carrier tail dominates the smooth noncarrier tails:
$$
|A_{h,\ell}|^2=O(\ell^{-3}),
\qquad
\varepsilon_L=O(L_{\mathrm{eff}}^{-2}).
$$
Thus a practical finite-depth certificate must choose $L_{\mathrm{eff}}$ large enough that the bound implied by $L_{\mathrm{eff}}^{-2}$ is less than $\frac12\Delta C_L$ on the same branch chart. This is a stopping rule for the selection calculation, not a new assumption about which lock wins.

This turns "higher harmonics are small" into a checkable theorem target tied to the same branch-derived amplitudes used in
$$
C_L
$$

#### Reduced-Theorem Target

The right theorem target is not "prove $1:2:4$ from kinematics alone." The stronger target is a proof route that keeps kinematics, branch dynamics, phase-bundle topology, effective cancellation, and inference separate:

1. classify the admissible indexed integer locks $(n:m:1)$ under exact delayed phase closure,
2. compute the corresponding radius relations for each candidate carrier choice $h$ under $\beta_h=1$,
3. require nondegenerate orbital-plane data $D_{\mathrm{plane}}\neq0$ so the retained phase bundle is genuinely three-dimensional,
4. define the phase-bundle curvature and caustic-weighted cancellation functional for the low-order causal-wake multipole or effective potential,
5. determine which integer lock minimizes residual curvature and exposed leakage in the exterior/horizon regime,
6. and verify the selected lock by a finite-$\eta$ return map with a positive Floquet gap on the complement of the flat moduli.

Equivalently, for each candidate $(m,n)$ one should construct a return map
$$
P_{\eta,m,n}:\mathcal{S}_{m,n}\to\mathcal{S}_{m,n}
$$
on the retained branch chart and require
$$
\Delta_{m,n}
=
1-\max_{i\notin G}|\mu_i(P_{\eta,m,n})|
>0
$$
off the neutral symmetry directions $G$.

Here $\mathcal{S}_{m,n}$ is a finite-$\eta$ reduced phase-amplitude branch chart: it retains the binary phases, relative phase offsets, orbital-plane normals, radii, speeds, active branch data, branch-transversality floors, caustic-impulse rows, candidate-carrier index, and history variables needed to evaluate one binary-3-period return. The neutral directions $G$ are not an arbitrary hand list. They are the tangent directions that preserve the same flat connection and branch identity:

$$
G
=
T_{\mathrm{global}}
\oplus
\mathfrak{so}(3)_{\mathrm{rot}}
\oplus
T_{\mathrm{flat}}
\oplus
G_{\mathrm{rel}}
$$

where $T_{\mathrm{global}}$ is the global time or phase shift, $\mathfrak{so}(3)_{\mathrm{rot}}$ is the rigid spatial-rotation tangent space, $T_{\mathrm{flat}}=\operatorname{span}\{(\delta\phi_{23},\delta\phi_{13})\}$ is the flat-connection moduli space, and $G_{\mathrm{rel}}$ contains any declared relabeling symmetry of the retained branch chart. A lock is dynamically stable only if the return map contracts on the complement of $G$ and the flat-modulus directions remain genuinely neutral. If a flat-modulus direction becomes unstable, the frequency commensurability may remain while Assumption 3 fails through relative-phase drift.
The quotient rule is strict. A direction in $T_{\mathrm{flat}}$ is treated as a symmetry only when the holonomy-defect coordinate
$$
\Theta(T)
=
\left(
\phi_{23}(T)-\phi_{23}^\ast,\,
\phi_{13}(T)-\phi_{13}^\ast
\right)
$$
has zero Floquet exponent on the retained return map. If $\Theta$ has a positive exponent, the same direction is a lock-breaking instability, not a quotient direction. This is the retained-branch version of the embedded-binary warning in [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md): a reduced subsystem's apparent neutral direction cannot be removed unless it is neutral for the full retained branch chart.

If the minimizer turns out to be the binary-3-normalized lock $1{:}2{:}4$, equivalently $(m,n)=(2,4)$, then the doubling-frequency hierarchy would be a derived selection result rather than a starting assumption.

In the invariant language of [Noether Braid Topological Charge](../../../../markdown/aaa/noether-braid/noether-braid-topological-charge.md), the reduced theorem target is to find an admissible topological sector

$$
[\mathfrak B]_{\mathrm{freq}}
=
\left(
N_s,\,
M_p,\,
c_1
\right)
=
\left(
N_s,\,
M_p,\,
(m,n)
\right)
$$

with flat phase connection, positive Floquet gap off $G$, and $|D_{\mathrm{plane}}|$ bounded away from zero outside the horizon-alignment locus. The doubling-frequency conjecture is the sharper claim that $(N_s,M_p,(2,4))$ is the minimal-curvature such class in the exterior/horizon-transition regime.

#### Recurrence Diagnostic

The finite-$\eta$ return-map test should also reject transient near-locks. For a sampled returned-branch trajectory, let $\boldsymbol{\psi}_i=(\theta_{3,i},\phi_{23,i},\phi_{13,i})$ be the returned phase row, $\mathbf{r}^{\mathrm{bin}}_i=(r_{1,i},r_{2,i},r_{3,i})$ the binary-radius row, $\boldsymbol{\beta}_i=(\beta_{1,i},\beta_{2,i},\beta_{3,i})$ the speed-factor row, and $\mathcal{R}^{\mathrm{rec}}_i$ the returned branch record containing active-root ledger data, candidate-carrier impulse rows, and retained causal-wake history variables. The sampled state is
$$
z_i=(\boldsymbol{\psi}_i,\mathbf{r}^{\mathrm{bin}}_i,\boldsymbol{\beta}_i,\mathcal{R}^{\mathrm{rec}}_i,h_i,\hat{\mathbf{n}}_{1,i},\hat{\mathbf{n}}_{2,i},\hat{\mathbf{n}}_{3,i})\in\mathcal{S}_{m,n}.
$$
Define a recurrence matrix
$$
Q^{(\epsilon)}_{ij}
=
\mathbf{1}
\left[
d_{\mathcal{S}}(z_i,z_j)<\epsilon
\ \wedge\
\|\Theta_i-\Theta_j\|<\epsilon_{\Theta}
\ \wedge\
|D_{\mathrm{plane},i}-D_{\mathrm{plane},j}|<\epsilon_D
\right]
$$
where $d_{\mathcal{S}}$ is the declared branch-chart distance after quotienting the neutral symmetries in $G$, while the holonomy-defect coordinate is not quotiented:

$$
\Theta(T)
=
\left(
\phi_{23}(T)-\phi_{23}^\ast,\,
\phi_{13}(T)-\phi_{13}^\ast
\right)
$$

A candidate $1{:}2$ row, or a chained $1{:}2{:}4$ row, is recurrence-positive only if returned-section hits recur at the declared binary-3-period multiples, the recurrence period agrees with the winding and active-branch ledger, the relative-phase defect $\Theta$ recurs to zero, the plane determinant stays in the nondegenerate domain, the candidate-carrier assignment is stable under refinement or its transition is explicitly recorded, the recurrence structure persists under timestep, history-resolution, and $\eta$ refinement, and nearby trials that fail the non-symmetry Floquet gap do not pass this recurrence check. This separates point recurrence from true phase-lock recurrence.

#### Ancillary Symmetry Check

The older $\mathbb{Z}_3$ dipole-cancellation identity belongs to a different assembly sector. It can still be kept as a planar symmetry test:
$$
1+e^{i2\pi/3}+e^{i4\pi/3}=0
$$

This is an in-plane cancellation for three equal phases separated by $120^\circ$. It is therefore naturally associated with coplanar, boson-like stealth arrangements rather than with the near-orthogonal rank-three bundle studied in this chapter. In compact form:

$$
\mathbb{Z}_3\ \text{stealth}
\longleftrightarrow
\text{coplanar cyclic sector}
$$

whereas

$$
1{:}2{:}4\ \text{doubling-frequency cover}
\longleftrightarrow
\text{near-orthogonal }T^3\text{ sector}
$$

The two mechanisms can both reduce exposed causal-wake leakage, but they do it through different topology. Planar cyclic symmetry cancels inside one plane; the doubling-frequency Noether braid lock distributes the phase-bundle covering across three independent orbital planes. The $\mathbb{Z}_3$ identity should therefore not be used as evidence for or against the frequency-selection assumptions above.
The separating wall is the plane-degeneracy condition
$$
D_{\mathrm{plane}}=0.
$$
On one side, the near-orthogonal sector carries three independent phase circles and covering data. On the wall, the phase chart collapses into a coplanar cyclic configuration where cancellation is representation-theoretic inside one plane. Crossing this wall is therefore a change in cancellation topology, not a smooth deformation inside one sector. The reachable theorem target is that the doubling-frequency sector and the coplanar $\mathbb{Z}_3$ sector cannot be connected by a path that preserves both $|D_{\mathrm{plane}}|\ge\delta_{\mathrm{plane}}>0$ and a positive non-symmetry Floquet gap.

For a neighboring closure problem, see [Horizon Chirality](../../../../markdown/aaa/spacetime/horizon-chirality.md).

## Braid Family B

Family B contains prescribed one-braid geometries whose three binary axes are the same oriented line. The canonical coordinates and master-table rows are defined in [Braid Taxonomy](../../../../markdown/aaa/noether-braid/braid-taxonomy.md#family-b-coincident-binary-axes). This chapter gives the exact B1 path geometry, its coordinate boundaries, and its intersection with Family A.

Family B is a geometry-and-motion definition. It does not establish that a B1 record is generated, retained, or stable under the EOM solver. The realization-independent retention burden is stated in [Braid Recovery Requirements](../../../../markdown/aaa/noether-braid/braid-recovery-requirements.md).

### Shared Family-B Geometry

Every Family-B member is one complete Noether braid composed of three neutral binaries. The binaries share one oriented axis $\hat{\mathbf n}_B$. The source-defined B1 chart also gives them one common midpoint, the braid center $\mathbf C(T)$.

Choose transverse unit vectors $\hat{\mathbf e}_1$ and $\hat{\mathbf e}_2$ so that $(\hat{\mathbf e}_1,\hat{\mathbf e}_2,\hat{\mathbf n}_B)$ is an orthonormal frame. For binary $a\in\{1,2,3\}$, define

$$
\theta_a(T)=q\,2\pi fT+\phi_a,
\qquad
q\in\{+1,-1\},
$$

where $f$ is the common frequency, $\phi_a$ is the binary phase relative to the braid-level zero point, and $q$ is the common circulation sense. The binary half-separation vector is

$$
\mathbf d_a(T)
=
h_a\hat{\mathbf n}_B
+
\rho_a
\left[
\cos\theta_a(T)\hat{\mathbf e}_1
+
\sin\theta_a(T)\hat{\mathbf e}_2
\right].
$$

The two endpoint paths are

$$
\mathbf X_{a1}(T)=\mathbf C(T)+\mathbf d_a(T),
\qquad
\mathbf X_{a2}(T)=\mathbf C(T)-\mathbf d_a(T).
$$

These equations make the B1 restrictions explicit: the endpoints of each neutral binary remain antipodal about the common braid center; all three binaries use the same axis, frequency, and circulation sense; and the radii, axial half-separations, transverse orbit radii, and phases may differ by binary.

The radius decomposition $R_a^2=h_a^2+\rho_a^2$ is defined in the [Individual Binary](../../../../markdown/aaa/noether-braid/braid-taxonomy.md#individual-binary) coordinate section. The internal speed of either endpoint of binary $a$ is

$$
s_a=2\pi f\rho_a.
$$

Thus internal speed is controlled by transverse orbit radius rather than by total binary radius alone. If a display derives the optional angle $\alpha_a=\operatorname{atan2}(h_a,\rho_a)$, the same relation is $s_a=2\pi fR_a\cos\alpha_a$. The angle is not a primary taxonomy coordinate.

### B1

B1 is the rigid common-frequency member of Family B. Its member-level constraints are:

| Coordinate or relation | B1 value |
| --- | --- |
| Braid count | One |
| Binary midpoints | One common braid center $\mathbf C(T)$ |
| Binary axes | $\hat{\mathbf n}_1=\hat{\mathbf n}_2=\hat{\mathbf n}_3=\hat{\mathbf n}_B$ |
| Frequency | One common $f$ |
| Circulation | One common sense $q$ |
| Radii | $R_1,R_2,R_3$ independently assignable |
| Axial half-separations | $h_1,h_2,h_3$ independently assignable subject to each radius decomposition |
| Transverse orbit radii | $\rho_1,\rho_2,\rho_3$ independently assignable subject to each radius decomposition |
| Phases | $\phi_1,\phi_2,\phi_3$ independently assignable relative to the common zero point |
| Hinge | None |

Rigid here means that the declared $R_a$, $h_a$, $\rho_a$, $f$, $\phi_a$, frame, and circulation sense do not change during the prescribed record. It is a kinematic restriction, not an EOM-solver rigidity result.

### Coordinate Boundaries

The equatorial and axial depictions are coordinate boundaries of B1, not separately identified braid families. Each binary can reach either boundary independently:

| Boundary locus | Coordinate condition | Endpoint motion |
| --- | --- | --- |
| Equatorial | $h_a=0$, $\rho_a=R_a$ | The endpoints traverse one circle in the plane through $\mathbf C(T)$ orthogonal to $\hat{\mathbf n}_B$. |
| Axial | $\rho_a=0$, $h_a=R_a$ | The endpoints remain on the common axis and have zero internal orbital speed. |
| Interior | $h_a>0$, $\rho_a>0$ | The endpoints traverse separated transverse circles on opposite sides of the braid center. |

The all-equatorial display sets $h_a=0$ for all three binaries. The all-axial display sets $\rho_a=0$ for all three binaries. Mixed boundary records are also permitted by the B1 coordinates. These loci do not carry decimal member IDs.

At an axial locus, $\phi_a$ and $f$ remain prescribed record labels but no longer change that binary's endpoint positions because its transverse orbit radius is zero. Two axial records that differ only in those labels therefore depict the same path geometry unless another retained record gives the labels an independent dynamical role.

### Axial Translation

When the braid center translates along the common axis at constant group speed,

$$
\mathbf C(T)
=
\mathbf C(0)+s_{\mathrm{grp}}T\hat{\mathbf n}_B,
$$

each non-axial endpoint follows an exact screw path: axial translation plus circular motion about the same axis. The axial and transverse velocity components are orthogonal, so the exact site-speed split is the channel kinematics developed in [Braid Mathematics](../../../../markdown/aaa/noether-braid/braid-mathematics.md#transverse-internal-motion-speed-budget-lemma). A mechanism that fixes the total speed budget remains an open branch hypothesis.

Axial translation is a B1 specialization, not a Family-B requirement. A record whose group velocity is not parallel to $\hat{\mathbf n}_B$ retains the same internal B1 geometry but is not an axial screw path.

### Boundary with Family A

Family A and Family B share a coordinate boundary. At $\lambda_A=1$, the three Family-A axes coincide with the Family-A translation direction. A common-frequency Family-A record with one common circulation sense then satisfies the B1 axis, frequency, and circulation relations. It reaches the source-defined common-center B1 chart only if its three binary midpoints also coincide with the braid center.

This overlap is a coordinate-locus statement. It does not identify Family A with Family B away from the boundary and does not establish a physical transition between them.

### Claim Boundary

The B1 equations define prescribed paths exactly. They would be falsified as EOM-solver branch claims by a same-record evolution showing that the common-axis, common-frequency, common-center, or rigid-coordinate relations cannot be retained under the required causal-root, acceleration, action, and stability records. Until such evidence exists, B1 supplies an exact display geometry and explicit closure targets, not a retained physical braid.

## Braid Family C

Family C contains prescribed assemblies composed of two complete B1 braids. The canonical assembly coordinates and master-table rows are defined in [Braid Taxonomy](../../../../markdown/aaa/noether-braid/braid-taxonomy.md#family-c-two-braid-composition). This chapter gives the exact two-braid path chart, distinguishes braid-center displacement from axis offset, and defines C1 and C2.

Family C is a geometry-and-motion definition. It does not establish that a C1 or C2 record is generated, bound, retained, or stable under the EOM solver. The realization-independent retention burden is stated in [Braid Recovery Requirements](../../../../markdown/aaa/noether-braid/braid-recovery-requirements.md).

### Shared Family-C Composition

Index the two component braids by $b\in\{1,2\}$ and the three binaries within each component by $a\in\{1,2,3\}$. A Family-C assembly therefore contains twelve architrinos on twelve prescribed paths.

Let $\mathbf C_b(T)$ be the center of component braid $b$. Define the complete assembly center and the relative braid-center displacement by

$$
\mathbf X_{\mathrm{grp}}(T)
=
\frac{\mathbf C_1(T)+\mathbf C_2(T)}{2}
$$

and

$$
\Delta\mathbf C
=
\mathbf C_2(T)-\mathbf C_1(T).
$$

The current rigid Family-C chart holds $\Delta\mathbf C$, $Q_{21}$, and $\Delta\phi$ constant. The component centers are therefore

$$
\mathbf C_1(T)
=
\mathbf X_{\mathrm{grp}}(T)-\frac12\Delta\mathbf C,
\qquad
\mathbf C_2(T)
=
\mathbf X_{\mathrm{grp}}(T)+\frac12\Delta\mathbf C.
$$

This is a geometric midpoint definition. It does not assign mass or another dynamical weight to either component. Both component centers have the group velocity $d\mathbf X_{\mathrm{grp}}/dT$ and the group translation speed $s_{\mathrm{grp}}$ defined in the taxonomy.

Choose an oriented orthonormal frame

$$
\mathcal F_b
=
\left(
\hat{\mathbf e}_{b1},
\hat{\mathbf e}_{b2},
\hat{\mathbf n}_b
\right)
$$

for each component braid. The relative orientation $Q_{21}\in SO(3)$, where $SO(3)$ is the set of proper three-dimensional rotations, maps the complete oriented frame of component 1 into the frame of component 2:

$$
\hat{\mathbf e}_{21}=Q_{21}\hat{\mathbf e}_{11},
\qquad
\hat{\mathbf e}_{22}=Q_{21}\hat{\mathbf e}_{12},
\qquad
\hat{\mathbf n}_2=Q_{21}\hat{\mathbf n}_1.
$$

For a circular B1 record, a rotation of the transverse basis about $\hat{\mathbf n}_b$ can be compensated by an equal and opposite shift of all three binary phases. The source record must therefore declare one reference meridian in each transverse frame if $Q_{21}$ and $\Delta\phi$ are to be stored as separate coordinates. Without that convention, the two fields contain a representation redundancy: changing the transverse-frame meridian and compensating the phase offset describes the same twelve paths.

For component $b$, let $f_b$ be its B1 common frequency, let $q_b\in\{+1,-1\}$ be its B1 common circulation sense, and let $(R_{ba},h_{ba},\rho_{ba},\phi_{ba})$ be the inherited binary coordinates. Set the component phase offsets to

$$
\delta_1=0,
\qquad
\delta_2=\Delta\phi.
$$

The angle and half-separation vector of binary $(b,a)$ are

$$
\theta_{ba}(T)
=
q_b\,2\pi f_bT+\phi_{ba}+\delta_b
$$

and

$$
\mathbf d_{ba}(T)
=
h_{ba}\hat{\mathbf n}_b
+
\rho_{ba}
\left[
\cos\theta_{ba}(T)\hat{\mathbf e}_{b1}
+
\sin\theta_{ba}(T)\hat{\mathbf e}_{b2}
\right],
$$

with

$$
R_{ba}^2=h_{ba}^2+\rho_{ba}^2.
$$

The twelve endpoint paths are

$$
\mathbf X_{ba1}(T)=\mathbf C_b(T)+\mathbf d_{ba}(T),
\qquad
\mathbf X_{ba2}(T)=\mathbf C_b(T)-\mathbf d_{ba}(T).
$$

These equations inherit the complete B1 definition separately within each component. Family C does not require the two components to have equal radii, equal axial half-separations, equal transverse orbit radii, equal frequencies, or equal internal phase patterns. Such equalities define constrained loci inside C1 or C2 and must be stated explicitly by a source record.

The relative phase $\Delta\phi$ is the offset between the two braid-level phase zeros at $T=0$; it is not by itself a frequency lock. For C1, the signed angular difference of corresponding binary records changes at rate

$$
\frac{d}{dT}\left(\theta_{2a}-\theta_{1a}\right)
=
2\pi q_1(f_2-f_1).
$$

It is constant only when the two component frequencies are equal. For C2, the contra-rotating phase sum changes at rate

$$
\frac{d}{dT}\left(\theta_{2a}+\theta_{1a}\right)
=
2\pi q_1(f_1-f_2),
$$

so equal component frequencies preserve the corresponding contra-rotating phase relation. The member identifiers do not impose either frequency equality.

### Center Displacement and Axis Offset

The two oriented component axes are the lines

$$
L_b(T)
=
\left\{
\mathbf C_b(T)+s\hat{\mathbf n}_b:s\in\mathbb R
\right\}.
$$

The axis offset is derived from $\Delta\mathbf C$ and $Q_{21}$; it is not an additional independent Family-C coordinate. When the axes are not parallel, their shortest separation is

$$
d_{\mathrm{axis}}
=
\frac{
\left|\Delta\mathbf C\mathbin{\cdot}
\left(\hat{\mathbf n}_1\mathbin{\times}\hat{\mathbf n}_2\right)\right|
}{
\left\|\hat{\mathbf n}_1\mathbin{\times}\hat{\mathbf n}_2\right\|
}.
$$

When the axes are parallel, it is

$$
d_{\mathrm{axis}}
=
\left\|
\Delta\mathbf C
-
\left(\Delta\mathbf C\mathbin{\cdot}\hat{\mathbf n}_1\right)
\hat{\mathbf n}_1
\right\|.
$$

The axes are coaxial exactly when they are parallel and $d_{\mathrm{axis}}=0$. Coaxiality does not require the two braid centers to coincide: $\Delta\mathbf C$ may be nonzero along the common axis. This distinction separates the axial spacing of two component braids from a transverse displacement between their axes.

Circulation comparison uses the oriented frames after $Q_{21}$ places both records in the assembly frame. This removes the sign ambiguity that would arise if one silently reversed an axis direction while continuing to call clockwise and counter-clockwise the same thing.

### C1

C1 is the same-circulation Family-C member:

$$
q_2=q_1.
$$

It inherits the full shared composition chart, including independently assignable component geometry, center displacement, relative orientation, and relative phase. Same circulation does not by itself require coaxial axes, equal frequencies, phase lock, binding, or retention.

### C2

C2 is the opposite-circulation Family-C member:

$$
q_2=-q_1.
$$

It inherits the same independent composition coordinates as C1. Opposite circulation does not by itself require coaxial axes, equal frequencies, phase lock, polarity conjugation, binding, or retention.

### Interface With Two-Braid Physical Hypotheses

Family C supplies a generic prescribed coordinate chart for two complete B1 records. A particle or transport hypothesis may occupy a constrained locus of this chart only after its extra relations are stated explicitly.

In particular, the photon-channel hypothesis is a **coaxial contra-rotating polarity-conjugate planar pair**. C2 supplies the opposite-circulation coordinate relation only if both photon-side planar records are established as B1 components. Planarization, coaxial placement, propagation-axis alignment, polarity conjugation, pair spacing, null propagation, polarization, and helicity remain owned by [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md#the-photon-gamma-coaxial-contra-rotating-polarity-conjugate-planar-pair) and its closure gates. The current taxonomy does not yet assign the photon, meson, or neutrino two-braid hypotheses to C1 or C2, because their component-member and relative-configuration mappings have not been established.

### Claim Boundary

The Family-C equations are exact prescribed paths. They would be falsified as EOM-solver branch claims by a same-record evolution showing that either component loses its B1 relations or that the declared inter-component coordinates fail the required causal-root, acceleration, action, and stability rows. Until such a record exists, C1 and C2 define display and comparison geometry rather than bound physical assemblies.

## Noether Braid Configuration Space

This chapter gives the analysis space surrounding the canonical braid taxonomy: the evidence-level vocabulary and the rank-three angular-momentum-frame variables used to test a candidate record. It comes after the family map in [Noether Braid](../../../../markdown/aaa/noether-braid/noether-braid.md), the prescribed coordinates in [Braid Taxonomy](../../../../markdown/aaa/noether-braid/braid-taxonomy.md), and the retention contract of [Braid Recovery Requirements](../../../../markdown/aaa/noether-braid/braid-recovery-requirements.md). The analyzed regions include [Family A](../../../../markdown/aaa/noether-braid/braid-family-a.md), the A3.3 $4{:}2{:}1$ lock and its A1.3 zero-axial-offset locus, iso-frequency candidates, and field-speed hinge-occupancy candidates. Within the rank-three sublocus, a branch candidate is a three-row state whose energies, phase offsets, angular-momentum rows, plane orientations, causal-root ledgers, frequencies, radii, speeds, and whole-branch group velocity must be solved together.

This is a search architecture and theorem target, not a completed classification theorem. The goal is to find which regions of the Noether braid configuration space support stable retained branches in a Noether sea populated by like assemblies, identify which branches remain candidate braids and which can be promoted to certified braids, and then use those branches as the entry point for assembly topological charge, energy differentials, shielding, and accessory-architrino capture.

The plain reading is that configuration space is the menu of possible branch records, not a list of already-existing particles. A candidate braid becomes important only when its rows return together under the delayed dynamics. Until then, labels such as `4:2:1`, iso-frequency, field-speed hinge, or rank-three are search coordinates.

This distinction prevents premature naming. A three-row branch is valuable because three independent angular-momentum rows can supply a full internal frame in Euclidean space. It is not valuable because three rows sound elegant. The solver still has to prove that the energies, phases, orientations, root ledgers, and group velocity belong to one retained record.

### Document Role

This chapter owns the rank-three angular-momentum-frame search variables: unordered layer labels, angular-momentum two-form rows, the plane-frame determinant, group velocity, energy/frequency/speed/radius ledgers, role assignment, and permutation accounting. It is the place to ask whether a candidate branch supplies three retained angular-momentum rows with enough conditioning to form a volumetric internal frame.

It does not exhaust the full Noether braid class, certify A1 retention, or make $4{:}2{:}1$, iso-frequency, or field-speed-hinge assumptions the default. Those are specializations that must declare their member definition and same-record branch rows before any analysis label is attached.

### Evidence-Level Terms

This chapter uses four evidence-level terms in a controlled way:

| Term | Meaning in this chapter | What it does not claim by itself |
| --- | --- | --- |
| branch | A candidate whole six-architrino Noether braid history over a declared finite memory window. The branch is the object whose inventory, paths, causal roots, wakes, energy/action rows, angular-momentum rows, phases, support data, response-center data, and Noether sea row are tested together. | A branch is not a single path, a single binary row, or a visual braid drawing. It is also not automatically stable or physical. |
| retained | Evidential status for a branch, row, or chart whose required data close on the same record under the declared tolerance, event/domain convention, and stability conditions. | `Retained` does not mean assumed, preferred, or merely still under discussion. If the same-record ledgers are missing, the object remains a candidate. |
| support | The geometric region, envelope, or comparison chart occupied by the branch data. A1 path support, a path-history-derived oblate spheroidal envelope, and an axial comparison chart describe different objects. | Support is not an acceleration law and not proof of retention. A support label says how the candidate is represented geometrically, not that the delayed dynamics preserve it. |
| record | The finite ledger attached to one branch over the declared memory window. It includes only data that can still affect the next delayed update or certificate: inventory, path history, causal-root rows, wake rows, energy/action rows, momentum and angular-momentum rows, phase and plane-orientation rows, support claims, response-center and group-velocity rows, and the local Noether sea row. | A record is not a narrative summary or a loose collection of diagnostics. A proof claim must say which rows close on the same record. |

This chapter is the front door for classifying Noether braid configurations. It names the independent axes used to describe a candidate branch before any adjudication of retention. The taxonomy is therefore a configuration language, not a classification theorem.

A supplementary analysis record for a candidate branch $\mathfrak B$ can be written schematically as

$$
\mathsf{Analysis}_{\mathfrak B}
=
\left(
\mathsf{AngularMomentumFrame},
\mathsf{Handedness},
\mathsf{SpeedRegime},
\mathsf{HingeOccupancy}
\right).
$$

These entries are diagnostics that may be computed from a taxonomy member's record. They are not additional columns in the canonical taxonomy, and they do not by themselves prove that the delayed dynamics admit a stable branch. Retention and certification are evidence statuses, not configuration axes.

### Family-B Example: B1

A reader who wants one concrete configuration to hold in mind while reading the axes below can use [B1](../../../../markdown/aaa/noether-braid/braid-family-b.md#b1). Its three neutral binaries share one midpoint, one axis, one frequency, and one circulation sense. Binary $a$ has internal speed $s_a=2\pi f\rho_a$, so different transverse orbit radii produce different internal speeds even though all three binaries share $f$. The all-equatorial and all-axial depictions are coordinate boundaries of the same member.

The status discipline binds. B1 is a prescribed member, not a retained branch, and no family ranking is asserted. Its exact geometry does not establish physical formation, retention, or preference over another taxonomy member.

### Supplementary Diagnostics

The canonical dimensions are defined only in [Braid Taxonomy](../../../../markdown/aaa/noether-braid/braid-taxonomy.md). This chapter adds analysis diagnostics that may be applied after a member is specified: angular-momentum-frame rank, frame handedness, speed regime, and field-speed-hinge occupancy. These diagnostics are intentionally outside the master taxonomy table until a later decision promotes one of them.

### Base Inventory

The base inventory is the neutral six-architrino case described in [Noether Braid](../../../../markdown/aaa/noether-braid/noether-braid.md#neutral-braid-base). It contains three positive-polarity architrinos and three negative-polarity architrinos:

$$
\#\{i:\sigma_i=+1\}
=
\#\{i:\sigma_i=-1\}
=3,
\qquad
\sum_i \sigma_i=0.
$$

This inventory says only that the candidate has the required polarity count and a shared causal-return ledger. It does not assume exact binary pairs, an A1 or B1 member, an orthogonal angular-momentum frame, or a protected topological class.

### Angular-Momentum Frame

The angular-momentum-frame axis asks whether the retained branch emits enough angular-momentum rows to define a full internal 3D frame. The rows are ledger data extracted from the branch, not assumed circular orbits. The three-row or rank-three search region is developed in [Noether Braid Configuration Space](../../../../markdown/aaa/noether-braid/noether-braid-configuration-space.md), but it remains only one region inside the broader Noether braid taxonomy rather than the definition of every Noether braid.

| Frame value | Meaning | What it does not prove |
| --- | --- | --- |
| not assigned | The branch has not yet supplied retained angular-momentum rows. | It does not reject the branch; it only leaves the frame axis open. |
| rank-three frame | The branch supplies three retained angular-momentum rows with nonzero frame determinant. | It does not by itself prove shell support, frequency lock, polarity placement, or certification. |
| planar lower-rank braid (`PL`) | The branch is lower-rank on this axis because $D_{\mathrm{plane}}=0$ (defined below) or because no retained three-row frame exists. | It is not automatically the planar reduced chart and not automatically a terminal A1 boundary. |

For a rank-three frame, the branch record includes three angular-momentum two-form classes. Here class means a ledger-extracted angular-momentum two-form row up to the declared branch-window equivalence, not a de Rham cohomology class of the Euclidean void:

$$
[\omega_J^{(a)}],
\qquad
a\in\{1,2,3\},
$$

with derived plane normals $\hat{\mathbf n}_a$ when the Hodge-dual direction is nonzero. The frame is volumetric only when

$$
D_{\mathrm{plane}}
=
\det
\begin{bmatrix}
\hat{\mathbf n}_1 & \hat{\mathbf n}_2 & \hat{\mathbf n}_3
\end{bmatrix}
\ne 0.
$$

A planar lower-rank braid (`PL`) may still be dynamically meaningful, but it is not a promoted rank-three Noether braid branch until the three-row frame condition and its conditioning floor are supplied on the same retained record.

The planar reduced chart is different. A reduced planar chart is a proof or simulation representation that places branch data into a common plane or near-plane so a restricted calculation can be performed. The canonical planar rank-three Noether braid reduced chart is the rank-three instance of this reduced chart usage. Such a chart may also represent a `PL` candidate, the terminal boundary of A1, or the photon-channel bridge described by the coaxial contra-rotating polarity-conjugate planar pair. The generic opposite-circulation composition coordinates for two complete B1 records are defined separately by [C2](../../../../markdown/aaa/noether-braid/braid-family-c.md#c2); planarization and photon identity are additional constraints. A planar reduced chart should therefore be named as a chart, not used as a base-family name.

### Angular-Momentum Handedness

Angular-momentum handedness records the orientation of the ordered rank-three frame when the frame exists. If the retained branch supplies ordered plane normals $\hat{\mathbf n}_1,\hat{\mathbf n}_2,\hat{\mathbf n}_3$, then the sign of $D_{\mathrm{plane}}$ gives the handedness of that ordered frame:

$$
\operatorname{sgn}(D_{\mathrm{plane}})
=
\begin{cases}
+1, & \text{positive-handed},\\
-1, & \text{negative-handed}.
\end{cases}
$$

When $D_{\mathrm{plane}}=0$ or the branch has no retained three-row frame, handedness is not assigned as a rank-three property. It may still have planar chirality, circulation signs, or other lower-rank orientation diagnostics, but those are separate rows.

### Speed, Hinge, And Frequency Families

The speed regime records how retained speed rows relate to the field speed $c_f$. Sub-field-speed rows satisfy speeds below the local field-speed hinge; field-speed rows sit at the transition scale; super-field-speed rows enter regimes where delayed self-interaction can become available. These diagnostics remain attached to the persistent indices $a\in\{1,2,3\}$; a later branch may distinguish one or more indices without renaming them.

Field-speed hinge occupancy is a separate axis. It asks which row, if any, operates within a declared tolerance of $c_f$, and it must say which speed statistic is being tested: transverse carrier speed, orbital/circulation speed, or another branch-declared component. A hinge row is not automatically a self-hit row. It is the speed-regime condition at which the branch can transition from the partner-only regime toward a ledger with both partner-hit and self-hit access, provided the same-transmitter causal-root ledger and transversality rows also close.

| Hinge value | Meaning |
| --- | --- |
| no hinge row | No retained row is declared within the $c_f$ hinge tolerance. |
| single-hinge | One row is organized around the field-speed hinge. |
| multi-hinge | More than one row is organized around the field-speed hinge. |
| terminal hinge | The branch approaches a terminal-alignment regime, such as the braid symmetry-breaking point, where hinge occupancy and loss of volumetric slack must be tested together. |

The frequency-ratio family records return or winding-frequency relations. The main examples are:

| Frequency-ratio value | Meaning |
| --- | --- |
| iso-frequency `1:1:1` | Candidate family with common return rate across the three retained rows. The rigid common-axis member is [B1](../../../../markdown/aaa/noether-braid/braid-family-b.md#b1). |
| integer-ratio `3:2:1` | Candidate family with integer return rates but no repeated-doubling assumption. |
| doubling-frequency $4{:}2{:}1$ | The A3.3 member with indexed ratio $f_1:f_2:f_3=4:2:1$, studied in [A3.3 Doubling-Frequency Resonance Lock](../../../../markdown/aaa/noether-braid/braid-a3-3-doubling-frequency-lock.md). A1.3 is its zero-axial-offset locus. The ratio does not imply a radius order. |

Frequency-ratio labels are candidate-family labels until the phase-return degree, causal-root ledger, finite-memory gluing, and stability rows close on the same branch. Hinge labels require their own speed and causal-root rows; they are not frequency-ratio names.

### Scope Of The Hypothesis

The three-row exact-binary hypothesis is a decomposition strategy, not an exhaustion theorem. There may be stable Noether braid configurations that do not admit a clean split into three persistent binary rows. The reason to study this decomposition first is that three independent angular-momentum directions are enough to span the orientation data of Euclidean three-space. In that sense, the three-row exact-binary decomposition is the minimal exact-binary architecture that can test whether a stable assembly carries a full three-dimensional internal frame.

This also means that the word `binary` names a retained angular-momentum row, not necessarily a perfectly circular two-body orbit at every instant. A certified row may have a conserved or slowly bounded angular-momentum ledger while the actual architrino paths on the retained support are quasiperiodic, braided, or chaotic. On such a row, $f_a$ is a return or winding frequency, $r_a$ is a characteristic lever arm, $s_a$ is a speed row or speed statistic, and $E_a$ is the retained branch-energy row. A circular carrier chart is the cleanest comparison case, not the only admissible path geometry.

In geometric language, the three rows are derived from three retained angular-momentum two-form classes on the branch, not from three assumed circular sub-orbits. The brackets do not mean de Rham cohomology classes of $\mathbb{R}^3$; they mean the declared equivalence of branch-window angular-momentum bivectors that preserve the same retained ledger row. Write these classes schematically as
$$
[\omega_J^{(a)}],
\qquad
a\in\{1,2,3\}.
$$
The plane normal $\hat{\mathbf n}_a$ is the Euclidean Hodge-dual direction extracted from that class,
$$
\hat{\mathbf n}_a
=
\frac{\star[\omega_J^{(a)}]}
{\|\star[\omega_J^{(a)}]\|},
$$
whenever the numerator is nonzero. The Hodge dual is applied to a representative after the branch ledger row is declared; a refinement that changes the dual direction is a different retained row, not the same class. Thus axis language means a ledger direction derived from the retained branch record. It is not an assumption that constituent paths are axial, circular, or disjoint.

### Why Three Retained Rows

The reason to begin with three retained rows is geometric. Euclidean space has three independent spatial directions, and a stable three-dimensional assembly needs enough internal direction data to define an orientation frame rather than only a planar cycle. A single binary row supplies one orbital plane and one plane normal. Two rows can define a relative angle, but they do not by themselves supply a full nondegenerate three-axis frame. Three retained rows can, when their plane normals are independent, define a local three-dimensional frame.

Let the three retained binary planes have unit normals
$$
\hat{\mathbf n}_1,\,
\hat{\mathbf n}_2,\,
\hat{\mathbf n}_3.
$$
The plane-orientation nondegeneracy measure is
$$
D_{\mathrm{plane}}
=
\det\!\begin{bmatrix}
\hat{\mathbf n}_1 & \hat{\mathbf n}_2 & \hat{\mathbf n}_3
\end{bmatrix}.
$$
The branch is genuinely three-dimensional only when $D_{\mathrm{plane}}\ne0$. Near $|D_{\mathrm{plane}}|=1$, the three planes are close to mutually orthogonal. Near $D_{\mathrm{plane}}=0$, the rank-three frame degenerates toward a coplanar or lower-dimensional support. This determinant is therefore a natural order parameter for the transition between a volumetric Noether braid branch and a planar or horizon-aligned branch.

For promotion work this becomes a nondegeneracy floor:
$$
|D_{\mathrm{plane}}|
\ge
\delta_{\mathrm{plane}}>0.
$$
It is the frame-bundle analogue of the Jacobian and separatrix floors used elsewhere: the map from three retained plane normals to an oriented internal frame loses conditioning when this determinant approaches zero. The wall $D_{\mathrm{plane}}=0$ is therefore the coplanar or horizon-aligned stratum where the frame ceases to be rank three. In current sector language, this is the boundary between a volumetric near-orthogonal sector and a planar cyclic sector; the solver must determine which side a retained branch actually occupies.

This is a statement about a derived orientation frame, not a claim that the constituent architrino paths are axial. The actual six paths may be braided, quasiperiodic, chaotic, shell-supported, or otherwise noncircular while still emitting retained angular-momentum rows from which principal directions can be extracted. Axis language in this chapter therefore means a ledger or envelope direction derived from the branch record, not a primitive path pattern.

The claim is not that every stable assembly must have three exact binary rows. The broader [Noether braid](../../../../markdown/aaa/noether-braid/noether-braid.md) class permits six-body branches before exact binary grouping is certified. The three-row exact-binary search inside that class is the minimal exact-binary architecture that can test full three-dimensional frame closure.

Equivalently, the three-row exact-binary locus is a sublocus of the six-body Noether braid configuration class:
$$
\mathcal{T}_{3B}^{\mathrm{locus}}
\subset
\mathcal{N}_{6\text{-body}}.
$$
A six-body branch belongs to this sublocus only when its retained angular-momentum record admits three independent rows, or equivalently a rank-three frame extraction with $D_{\mathrm{plane}}\ne0$. A planar, oblate, or lower-rank Noether braid may still be stable, but it is not a promoted rank-three Noether braid branch until the three-row frame condition is met.

### General Branch State

Use the persistent binary indices $a\in\{1,2,3\}$. These labels are bookkeeping identities only. They do not imply an ordering of frequency, radius, energy, speed, phase, plane orientation, or root-ledger complexity, and they are not replaced when two coordinate values cross. The minimal branch record for this sublocus is
$$
\mathcal{T}_{3B}
=
\left\{
\left(
f_a,\,
r_a,\,
E_a,\,
s_a,\,
\phi_a,\,
\hat{\mathbf n}_a,\,
\mathcal{L}_a
\right)
\right\}_{a=1}^{3}.
$$
Here $f_a$ is the layer frequency or return rate, $r_a$ is the characteristic radius or retained lever arm, $E_a$ is the retained branch-energy row, $s_a=\|\mathbf{V}_a\|$ is the scalar tangential speed or speed statistic, $\phi_a$ is the phase origin or offset, $\hat{\mathbf n}_a$ is the orbital-plane normal, and $\mathcal{L}_a$ is the active causal-root ledger data for that layer. On a circular carrier chart,
$$
s_a=2\pi f_a r_a.
$$
This identity is kinematic only. It does not select the frequencies, radii, speeds, energies, phase offsets, plane orientations, or causal-root ledgers.

The practical search should treat the branch energy row $E_a$, angular-momentum row, phase data, and causal-root ledger $\mathcal{L}_a$ as primary retained data. The radius and speed are then constrained by the selected carrier chart, conservation laws, and the branch's energy closure. In simple circular rows, fixed $f_a$ and $E_a$ may determine an admissible $r_a$ and $s_a$ after the kinetic, binding, and wake-energy terms are specified. In noncircular rows, the same energy may correspond to a bounded family of paths with the same return frequency but different local speed profile. Thus energy is central, but it is not by itself a complete coordinate on the Noether braid configuration space.

### Branch Group Velocity

The internal plane data do not encode group velocity. The plane normals $\hat{\mathbf n}_a$ describe the assembly's internal angular-momentum frame. The group velocity is the drift of the retained branch envelope or response center through the local Noether sea:
$$
\mathbf{V}_{\mathrm{grp}}
=
\frac{d\mathbf{X}_{\mathrm{resp}}}{dT}
\quad
\text{relative to the declared Noether sea record.}
$$
The full branch record should therefore be read as
$$
B_{3B}
=
\left(
\mathcal{T}_{3B},\,
\mathbf{X}_{\mathrm{resp}},\,
\mathbf{V}_{\mathrm{grp}},\,
\mathbf{P}_{\mathfrak B},\,
\mathbf{J}_{\mathfrak B},\,
\theta_{\mathrm{sea}}
\right),
$$
where $\mathbf{P}_{\mathfrak B}$ and $\mathbf{J}_{\mathfrak B}$ are the branch-total momentum and angular-momentum ledgers, and $\theta_{\mathrm{sea}}$ is the local Noether sea response record used to compare moving branches.

This distinction matters for the equivalence-principle and Lorentz-closure programs. In a validated low-energy regime, uniform group velocity should not become an observable composition-dependent force merely because two assemblies carry different internal plane orientations. That is an effective recovery target: the moving branch must retune its clock, ruler, and signal rows so that preferred-frame leakage stays below the declared bounds. It is not a reason to omit $\mathbf{V}_{\mathrm{grp}}$ from the dynamics. The correct statement is that $\mathbf{V}_{\mathrm{grp}}$ is a separate branch-transport variable whose observable leakage must be suppressed by common-channel closure.

This variable is unambiguous only when the response-center theorem target closes on the same branch. The exposed-energy response center, inertial response center, and wake-momentum boundary ledger must agree up to the declared response residual $\mathcal R_{\mathrm{resp}}$. If they do not, the phrase "group velocity of the branch" can point to different moment maps, and the candidate is not ready for certified-braid promotion. Thus $\mathbf{V}_{\mathrm{grp}}$ is part of the retained record, but its use as a single transport velocity is conditional on center-of-response closure.

### Candidate And Certified Braids

A **candidate braid** is a proposed Noether braid branch or branch family whose certificate rows have not all closed. A **certified braid** is a theorem-target status for a Noether braid branch, not a new primitive substance. A branch is certified only when its full retained record returns to itself under the delayed dynamics, up to declared symmetries, and its required stability, alignment, and observer-export rows close on the same record.

The retained record is not an arbitrary internal diary and it is not an arbitrary collection of architrinos. It is the finite branch chart for one Noether braid: the six-body polarity-neutral inventory of three positive-polarity and three negative-polarity architrinos, together with the path-history rows, causal-root ledger, wake-tail rows, energy/action rows, momentum and angular-momentum rows, phase data, plane-orientation data, response-center data, group-velocity row, and Noether sea record that can still affect the next delayed update of that same six-body branch. A path-history segment belongs to the retained record only while it can still enter a self-hit, partner-hit, wake-tail, boundary, or branch-return row on the declared memory window.

Let $P_{T_{\mathrm{ret}}}^{(\mathbf{V})}$ be the finite-memory return map over one branch return duration $T_{\mathrm{ret}}$, including translation by the branch group velocity $\mathbf{V}_{\mathrm{grp}}$. Let $\mathcal G_{\mathrm{sym}}$ contain only declared neutral symmetries such as global phase shift, rigid spatial rotation, translation of the response center, and permitted $S_3$ layer relabeling. A rank-three Noether braid branch $B_{3B}$ is a candidate for certified-braid promotion when there exists $g\in\mathcal G_{\mathrm{sym}}$ such that
$$
\mathcal R_{\mathrm{cert}}
=
d_{\mathfrak B}
\left(
P_{T_{\mathrm{ret}}}^{(\mathbf{V})}(B_{3B}),\,
g\cdot B_{3B}
\right)
\le
\epsilon_{\mathrm{cert}},
$$
on the same retained branch chart $\mathfrak B$, with the non-symmetry return directions carrying a positive stability margin. The metric $d_{\mathfrak B}$ must compare the same branch rows: causal-root ledger, energy/action ledger, angular-momentum rows, phase data, plane-orientation data, response-center motion, group velocity, Noether sea record, and assembly topological charge.

The quotient group $\mathcal G_{\mathrm{sym}}$ is not a convenience list. It must be the neutral group of the retained return map: directions removed from the stability test have zero Floquet exponent because they are declared symmetries of the full branch chart. A direction that is neutral in an isolated sub-row but unstable in the enclosing rank-three Noether braid chart is not quotiented. In that sense, the certified-braid certificate is the branch-symplectic promotion test evaluated on the retained branch chart: the finite-memory return map must recur modulo true neutral symmetries while contracting or bounding every non-symmetry direction, and an action-derived reduced Hamiltonian promotion must also report the return-map symplectic residual $\mathcal R_{\Omega}$ defined in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#return-map-symplectic-residual-for-action-derived-branch-promotion).

The branch-intrinsic conserved record must also export Lorentz-compatible observer rows before certification. In the homogeneous moving-branch regime, the same retained record must recover the ruler and clock deformation laws,
$$
\xi
=
\frac{R_{\parallel}}{R_{\perp}}
\to
\frac{1}{\gamma},
\qquad
\frac{d\tau}{dt_{\mathrm{eff}}}
\to
\frac{1}{\gamma},
$$
with preferred-frame leakage bounded by the declared $\epsilon_{\mathrm{LV}}$ or two-way anisotropy diagnostic. The observer components are produced through a derived moving-assembly map,
$$
C_{\mathrm{obs}}
=
\Lambda_{\mathrm{eff}}
\left(
\mathbf{V}_{\mathrm{grp}},
\theta_{\mathrm{sea}}
\right)
C_{\mathrm{branch}}
+O(\epsilon_{\mathrm{LV}}),
$$
when Lorentz closure applies. Here $C_{\mathrm{branch}}$ is the branch-intrinsic component vector being exported, such as an energy-momentum, angular-momentum, clock, or ruler row, and $C_{\mathrm{obs}}$ is the corresponding effective observer-chart component vector. The map $\Lambda_{\mathrm{eff}}$ is the effective export map, not the reduced A1 closure label $\Lambda_{A1}$. The export may dress those components, but it does not replace the branch record itself. Topological rows such as assembly topological charge remain branch-intrinsic invariants unless the branch crosses a fold, reconnection, or other declared surgery event.

### Momentum And Principal-Direction Decomposition

A candidate for certified-braid promotion should also say how its three retained rows align with the conserved momentum ledgers. A branch whose retained record returns but whose axes do not align with branch-total momentum and angular momentum remains a return-map candidate, not a promoted certified braid. The branch-total momentum and angular momentum should be computed on the same finite window as the return map:
$$
\mathbf{P}_{\mathfrak B}
=
\mathbf{P}_{\mathrm{mech}}
+
\mathbf{P}_{\mathrm{wake}},
\qquad
\mathbf{J}_{\mathfrak B}
=
\mathbf{J}_{\mathrm{mech}}
+
\mathbf{J}_{\mathrm{wake}}.
$$
The mechanical and wake terms must use the same endpoint convention as the retained branch chart; otherwise the axis comparison is only a visualization.

When $\|\mathbf{P}_{\mathfrak B}\|>0$, the unit vector
$$
\hat{\mathbf e}_{P}
=
\frac{\mathbf{P}_{\mathfrak B}}{\|\mathbf{P}_{\mathfrak B}\|}
$$
is the transport axis. When $\|\mathbf{J}_{\mathfrak B}\|>0$, the unit vector
$$
\hat{\mathbf e}_{J}
=
\frac{\mathbf{J}_{\mathfrak B}}{\|\mathbf{J}_{\mathfrak B}\|}
$$
is the branch's total angular-momentum axis. The three retained plane normals $\hat{\mathbf n}_a$ should then be read as a principal-direction decomposition of $\mathbf{J}_{\mathfrak B}$, not as arbitrary visual decoration and not as a claim that the paths themselves lie on axes. A simple diagnostic is the angular-momentum closure vector
$$
\mathcal{R}_{J\mathrm{-axis}}
=
\left\|
\hat{\mathbf e}_{J}
-
\frac{\sum_{a=1}^{3}w_a\hat{\mathbf n}_a}
{\left\|\sum_{a=1}^{3}w_a\hat{\mathbf n}_a\right\|}
\right\|,
$$
where the weights $w_a$ are declared branch-action, branch-angular-momentum, or energy-row weights and the weighted normal sum is required to be nonzero. This is not yet a theorem: it is the axis-alignment row a solver must populate before claiming that the three retained rows faithfully decompose the assembly's conserved angular momentum.

The stronger faithful-decomposition test is spectral. Build the symmetric branch angular-momentum frame tensor
$$
\mathsf{J}_{\mathfrak B}^{ij}
=
\sum_{a=1}^{3}
J_a\,\hat n_a^i\hat n_a^j,
$$
with $J_a$ supplied by the retained branch-angular-momentum or action row. A promoted rank-three Noether braid branch should show that this tensor has three nonzero eigenvalues and that its eigenframe agrees with the retained normal frame up to the allowed $S_3$ relabeling and sign conventions. This is an orthogonality-sensitive test: when the normals are not mutually orthogonal, the eigenvectors of $\mathsf{J}_{\mathfrak B}^{ij}$ need not coincide with $\{\hat{\mathbf n}_a\}$ even if the retained weights are nonzero. If two $J_a$ are equal within tolerance, the certificate must use an eigenvalue-gap condition or a subspace-match criterion rather than a unique eigenvector match. If diagonalizing $\mathsf{J}_{\mathfrak B}^{ij}$ produces a different frame, then $\mathcal{R}_{J\mathrm{-axis}}$ is not a mere visualization error: the three retained rows are not a faithful decomposition of the conserved angular-momentum ledger.

The retained angular-momentum decomposition does not select one coarse envelope family. In a rest branch, $\mathbf{P}_{\mathfrak B}=\mathbf 0$, so the internal angular-momentum axes and plane determinant describe the retained three-dimensional support, while the swept constituent paths separately determine whether the envelope is fusiform, oblate spheroidal, or another certified form. In a moving branch, $\hat{\mathbf e}_{P}$ marks the drift direction relative to the Noether sea, and Lorentz closure asks whether the family-declared envelope deforms with a longitudinal-to-transverse ratio
$$
\xi
=
\frac{R_{\parallel}}{R_{\perp}},
\qquad
R_{\parallel}\ \text{measured along }\hat{\mathbf e}_{P},
$$
while the same internal angular-momentum ledger remains retained. Thus the retained rows decompose internal angular momentum into principal directions, while group velocity and total momentum select the moving-envelope axis. They do not convert the [B1](../../../../markdown/aaa/noether-braid/braid-family-b.md#b1) common-axis internal geometry into a Family-A oblate response; B1's member-declared rest envelope and its moving-envelope projection are separate records in [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md#envelope-forms).

### Unordered Layer Semantics

The search must not assume that one binary is high-frequency, low-frequency, high-energy, low-energy, fast, slow, boundary-leading, field-speed-carrying, or otherwise geometrically privileged before the retained branch supplies that diagnostic. The raw search domain is therefore the indexed but unsorted product
$$
\widetilde{\mathcal C}_{3B}
=
\left\{
(\mathcal T_1,\mathcal T_2,\mathcal T_3):
\mathcal T_a=(f_a,r_a,E_a,s_a,\phi_a,\hat{\mathbf n}_a,\mathcal L_a)
\right\}.
$$
The symmetric group $S_3$ acts on this space by permuting the three support-row records:
$$
\pi\cdot(\mathcal T_1,\mathcal T_2,\mathcal T_3)
=
(\mathcal T_{\pi^{-1}(1)},\mathcal T_{\pi^{-1}(2)},\mathcal T_{\pi^{-1}(3)}),
\qquad
\pi\in S_3.
$$
Two rows may therefore be the same physical candidate up to a relabeling even when they appear as distinct solver outputs.

The default search policy is to keep $\widetilde{\mathcal C}_{3B}$ unquotiented. Repeated $S_3$-related solutions are useful confirmation that the solver is finding a symmetric sector rather than a one-off artifact. An analysis tool may later isolate one representative sector by computing a permutation-invariant key,
$$
\operatorname{key}(B)
=
\operatorname{sort}_{a=1}^{3}
\operatorname{fingerprint}(\mathcal T_a),
$$
but that quotient is an analysis summary, not the search domain. No branch is rejected merely because a symmetric relabeling has already appeared.

When branch counts, continuation-family cardinalities, or basin weights are reported, the quotient must be applied explicitly. If a physical branch has stabilizer subgroup $\operatorname{Stab}_{S_3}(B)$, then its orbit size in the unquotiented cover is
$$
\frac{|S_3|}
{|\operatorname{Stab}_{S_3}(B)|}.
$$
The unquotiented solver rows are useful evidence, but they are not independent physical branches. Any comparison to the finite-continuation family $\mathfrak S_{\Omega,W}^{\mathrm{ME},\eta}$, the regularized Master Equation continuation set over window $W$ and mollifier $\eta$, or to basin measures must reduce by the same $S_3$ orbit accounting rather than overcounting six label copies as six distinct certified braids.

The general configuration ratios are
$$
f_1:f_2:f_3,
\qquad
r_1:r_2:r_3,
\qquad
E_1:E_2:E_3,
\qquad
s_1:s_2:s_3.
$$
These ratios are reported in the current layer labels. They are not sorted ratios and they carry no inequality unless a retained branch later assigns a role order.

The branch-search problem is to find retained stable states
$$
\mathcal{T}_{3B}
\in
\widetilde{\mathcal C}_{3B}
$$
over this full variable set, then compare their energy differentials
$$
\Delta E_{ab}=E_a-E_b
$$
and ledger decompositions on the same retained row set. The doubling-frequency, iso-frequency, and broader integer-ratio families are subfamilies of $\widetilde{\mathcal C}_{3B}$, not definitions of it. Field-speed hinge occupancy is a separate speed-regime axis on the same branch rows, not a frequency-ratio family.

### Super-Field-Speed Carrier Rows

The general search naturally includes carrier speeds above the causal wake propagation speed. Since
$$
s_a=2\pi f_a r_a,
$$
fixing one row of the search does not fix the others. Even an iso-frequency family
$$
f_1=f_2=f_3
$$
can have different radii, energies, speeds, phases, and active root ledgers:
$$
r_1:r_2:r_3
\ne
1:1:1,
\qquad
s_1:s_2:s_3
\ne
1:1:1.
$$
If one retained lever arm is large enough at the common frequency, then that layer has $s_a>c_f$.

This is not a signal-speed claim. The primitive causal wake still propagates at $c_f$. A row with $s_a>c_f$ is a carrier-trajectory row in the retained branch chart. Its importance is dynamical: it changes the causal-root inventory. Super-field-speed carrier motion can create additional self-hit and partner-hit roots, acceleration-Jacobian sign changes, and move the branch into the fold and caustic regimes that feed the causal-root ledger. The possibility of one or more super-field-speed layers is therefore a reason to scan the full Noether braid configuration space rather than preselecting a single speed hierarchy.

In a certified row, the important event is not speed alone but the appearance of same-transmitter causal roots with the required transversality floors; a certified row that contributes acceleration or action additionally carries the same-record transmitter-side acceleration weight, while the signed-root topology below is fixed by root existence and the causal-root Jacobian sign. Still, $s_a>c_f$ is the natural warning gate for the layer's self-hit signed-root complex:
$$
C_+^{(a)}\oplus C_-^{(a)}.
$$
This is the layerwise specialization of the [signed causal-root complex](../../../../markdown/aaa/dynamics/master-equation.md#signed-causal-root-complex): simple same-transmitter roots are split by the sign of their causal-root Jacobian before the layer contributes to assembly topological charge.
A branch with one super-field-speed layer can carry a different assembly topological charge structure from a branch with two or three such layers, because the self-hit ledgers and signed degrees are layer-dependent. This is another reason the search must preserve the full unordered speed tuple $s_1:s_2:s_3$ rather than collapsing immediately to a preferred hierarchy.

Family B realizes this decoupling directly. In [B1](../../../../markdown/aaa/noether-braid/braid-family-b.md#b1), each binary has internal speed $s_a=2\pi f\rho_a$, so the speed tuple is independent of the total-radius values when the transverse orbit radii are chosen independently. The equatorial and axial cases are coordinate boundaries of B1. Its harmonic-matching hypothesis and discrete-symmetry derivations are stated in [B1 Hypotheses and Discrete Symmetry](../../../../markdown/aaa/noether-braid/braid-b1-symmetry.md). No family ordering is asserted.

A terminology boundary applies throughout this section: the field-speed value $s_a=c_f$ is a **coordinate locus** of the configuration space — the boundary where the same-transmitter root inventory changes — and nothing here asserts that any dynamical mechanism holds a layer at that locus. Occupancy of the locus is a chart label, not an attractor claim.

### Stability In A Sea Of Like Assemblies

An isolated Noether braid return map is not enough for Noether braid promotion. A retained branch must also remain stable when embedded in a Noether sea containing like assemblies. The relevant stability question is not only whether one branch closes, but whether a population of similar branches can coexist without destroying the retained ledgers.

For a candidate branch $B$ over a window $W$, write the stability target schematically as
$$
\mathrm{Stable}_{3B}(B;W,\mathcal{N}_{\mathrm{sea}})
\Longleftrightarrow
P_{\mathrm{root}}
\wedge
P_{\mathrm{phase}}
\wedge
P_{\mathrm{energy}}
\wedge
P_{\mathrm{return}}
\wedge
P_{\mathrm{sea}}.
$$
Here $P_{\mathrm{root}}$ requires persistent causal-root ledgers with positive root floors except at declared caustic transits, $P_{\mathrm{phase}}$ requires bounded phase-offset drift, $P_{\mathrm{energy}}$ requires a closed branch-energy row, $P_{\mathrm{return}}$ requires a Floquet, Conley, or comparable return certificate, and $P_{\mathrm{sea}}$ requires the same branch to remain coherent under the background Noether sea response generated by like assemblies. This last predicate is the bridge from an isolated branch search to a stable medium of assemblies.

The result of this search should be an atlas of stable regions in $\widetilde{\mathcal C}_{3B}$, not a single preferred row. Patterns may include doubling-frequency locks, iso-frequency families, integer-ratio families such as `3:2:1`, field-speed hinge-occupancy regimes, planar degenerations, and mixed regimes where one or more layers run above $c_f$ while the whole assembly remains a retained delayed branch. If a stable region is $S_3$-symmetric, the atlas may also report the corresponding quotient-sector representative, but the unquotiented evidence should remain available.

### Toward A Periodic Table Of The Noether Braid

The phrase "periodic table of the Noether braid" names the classification program, not an already completed table. The proposed atlas should classify retained branches by:

1. The compact assembly topological charge $[\mathfrak B]_{\mathrm{top}}=(N_s,M_p,c_1)$ and its signed-degree refinement, where $N_s$ counts active self-hit roots, $M_p$ counts active partner-hit roots, and $c_1$ is the phase-return degree slot defined in [Noether Braid Topological Charge](../../../../markdown/aaa/noether-braid/noether-braid-topological-charge.md).
2. The frequency, radius, energy, and speed ratios of $\mathcal{T}_{3B}$.
3. The plane-orientation determinant $D_{\mathrm{plane}}$ and handedness data.
4. The energy differentials $\Delta E_{ab}$ and their wake-history decomposition.
5. The response of the branch to a sea of like assemblies.
6. The capture or exclusion behavior of additional architrinos near the branch.

The classification is topological only where the entries are invariant under branch-preserving deformation. It is dynamical where the entries depend on energy balance, phase locking, sea response, and return-map stability. A promoted table must therefore carry both topological labels and dynamical margins.

### Accessory Configuration Capture

After a stable braid has been retained, the next search level asks whether an **Accessory Configuration** can couple to that braid without destroying the braid ledger. An Accessory Configuration is exactly six additional architrinos, each with a declared electrino or positrino polarity, that are associated with the braid but are not members of its neutral six-architrino core. Their positions may be inside, across, or outside the braid envelope. The name does not prescribe an axial, polar, planar, or surrounding placement.

For a braid branch $B$, define the admissible configuration set in the six-site phase-position-history space by

$$
\mathcal{C}_{\mathrm{acc}}(B)
=
\left\{
\left(
\mathbf X_p,\mathbf V_p,\tau_p,\phi_p
\right)_{p=1}^{6}:
\mathrm{Retain}_{\mathrm{acc}}
\!\left[
B;\left(\mathbf X_p,\mathbf V_p,\tau_p,\phi_p\right)_{p=1}^{6}
\right]
=1
\right\}.
$$

The retention predicate must use the same causal-root, action, energy, and return-map conventions as the braid branch. It must preserve the braid ledger while giving all six accessory architrinos bounded delayed-return rows, finite energy exchange, and bounded phase drift. Six visually plausible positions are not an Accessory Configuration branch certificate.

Topologically, admissible capture preserves the braid's assembly topological charge while augmenting the complete assembly record with a six-site accessory ledger. If the core values of $N_s$, $M_p$, $c_1$, signed degree, or phase-return data change, the event is not capture in this sense; it is a braid reconfiguration through a fold, reconnection, or branch surgery.

The architectural question is therefore

$$
B
\longrightarrow
\left(
\mathcal{C}_{\mathrm{acc}}(B),
(\tau_p)_{p=1}^{6},
\mathrm{placement\ record},
\Delta E_{\mathrm{acc}}
\right).
$$

An axial six-site organization is one possible derived Accessory Configuration, not its definition. The retained calculation must decide the polarity assignment, placement, and path geometry.

### Frame Orthogonality And Framing Anisotropy

The configuration-space program also supplies a compact theorem target for anisotropy leakage. A faithful rank-three Noether braid branch has two related order parameters: the frame determinant $D_{\mathrm{plane}}$ and the trace-free framing quadrupole $Q_A$ used by [Absolute Timespace](../../../../markdown/aaa/foundations/absolute-timespace.md). Let $w_a$ be normalized spectral weights supplied by the retained action, energy, or angular-momentum tensor row, with $\sum_a w_a=1$. The finite retained-frame representative of the foundation average is
$$
Q_A^{ij}
=
\sum_{a=1}^{3}
w_a
\left(
\hat n_a^i\hat n_a^j
-\frac{1}{3}h^{ij}
\right)
$$
Writing $\lambda_a=w_a-\frac{1}{3}$ separates this into two channels:
$$
Q_A^{ij}
=
\frac{1}{3}
\left(
\sum_{a=1}^{3}\hat n_a^i\hat n_a^j
-h^{ij}
\right)
+
\sum_{a=1}^{3}
\lambda_a
\left(
\hat n_a^i\hat n_a^j
-\frac{1}{3}h^{ij}
\right),
\qquad
\sum_a\lambda_a=0
$$
where the first term measures non-orthogonal-frame leakage and the second term measures spectral-weight anisotropy. The weights are branch data, not parameters chosen after the fact.

The reachable theorem target is therefore two-part:
$$
|D_{\mathrm{plane}}|\to1
\quad\Longrightarrow\quad
\left\|
\frac{1}{3}
\left(
\sum_{a=1}^{3}\hat n_a^i\hat n_a^j
-h^{ij}
\right)
\right\|\to0,
\qquad
|D_{\mathrm{plane}}|\to1
\quad\text{and}\quad
\max_a|\lambda_a|\to0
\quad\Longrightarrow\quad
\|Q_A\|\to0
$$
while degeneration toward $D_{\mathrm{plane}}=0$ may produce large framing anisotropy even with nearly equal weights. Orthogonality suppresses the non-orthogonal-frame contribution; near-degenerate retained spectral weights, shielding, or averaging must separately suppress the weight-anisotropy contribution. If both parts are proved for a retained branch class, the same geometric row would suppress Lorentz period anisotropy, clock-orientation leakage, Hughes-Drever-type inertial anisotropy, and scalar-mass anisotropy. Both parts remain theorem targets; no measured family comparison currently bears on them.

### Relation To The Doubling-frequency Chapter

[A3.3 Doubling-Frequency Resonance Lock](../../../../markdown/aaa/noether-braid/braid-a3-3-doubling-frequency-lock.md) studies one restricted member inside this broader configuration space. It asks whether the indexed A3 frequency triplet, especially the A3.3 relation $f_1:f_2:f_3=4:2:1$, can close as an integer phase-bundle lock with a stable return map and controlled caustic behavior. The A1.3 chart inherits the same frequency relation on the zero-axial-offset locus.

The doubling-frequency chapter should therefore be read as a specialized search row:
$$
\mathcal{C}_{\mathrm{dbl}}
\subset
\widetilde{\mathcal C}_{3B}.
$$
Iso-frequency, unequal-radius candidates occupy a different row:
$$
\mathcal{C}_{f=f=f}
=
\{B\in\widetilde{\mathcal C}_{3B}:f_1=f_2=f_3\}.
$$
Both rows are legitimate until the retained-branch certificates decide which, if either, survives. The general Noether braid search keeps the mathematics wide enough for the solver to discover stable configurations rather than forcing every stable Noether braid into a preselected frequency pattern.

## B1 Hypotheses and Discrete Symmetry

This chapter owns the B1 harmonic-matching hypothesis, discrete-symmetry derivations, and open retention burden. The prescribed common-center, common-axis path geometry and its equatorial, axial, and axial-translation loci are defined in [Braid Family B](../../../../markdown/aaa/noether-braid/braid-family-b.md).

The status discipline of the braid stack binds throughout. B1 is a prescribed member, not a retained branch. The kernel-covariance results below are derivations within their declared scope; physical formation, self-support, retention, selection, and observer-level symmetry recovery remain open. The retained-branch certificate target of [Braid Recovery Requirements](../../../../markdown/aaa/noether-braid/braid-recovery-requirements.md) governs those claims.

### The Harmonic-Matching Hypothesis

The rigidity constraint is motivated by a structural argument; the argument does not select the B1 antipodal geometry, and its quantitative force is an untested hypothesis. A circular orbit's kinematic requirement is a single-harmonic rotating vector, so only the time-constant part of the received causal wake in the co-rotating frame can supply it. Rigid co-rotation puts all wake power into exactly that part. Any relative binary motion — frequency locks between binaries, counter-rotation, or speed modulation — moves wake power into oscillating harmonics that circular kinematics cannot absorb, and the lowest-mode orbit deformations add kinematic harmonics faster than they match wake harmonics.

Causal delay is what would make this principle decisive rather than a soft preference. During one antipodal wake transit at near-field speed the pair rotates through roughly a third of a turn, so static-binding intuition — including the naive Kepler-third-law scaling for frequency-separated binaries — does not transfer to the delayed dynamics. Claim level: analytic structural argument; the comparative strength of rigid co-rotation against the other taxonomy members is not established.

Rigidity has a second, exact consequence: every pairwise alignment scalar between sites is time-constant, so any alignment condition arranged once in the geometry holds around the entire cycle, sustained by the rotation itself rather than by a separate phase-locking mechanism.

### Discrete-Symmetry Structure

Claim level: **analytical (derivation grade) for the declared kernel's discrete-symmetry covariance; derivation target for physical formation, branch retention, and weak-sector parity and $CP$ recovery.** This section distinguishes what the interaction law fixes from what the imposed fixed-channel geometry and any later effective transaction operator would still have to establish.

**The law's evenness.** The pairwise causal-wake law is even under polarity conjugation $C$ (every electrino $\leftrightarrow$ positrino: only the polarity product $\sigma_a\sigma_b$ enters, invariant under a global sign flip of every polarity) and even under parity $P$ (the acceleration is radial along the delayed line of action, $\propto\hat{\mathbf r}/r^2$, with no primitive handedness). Two exact degeneracies follow at once, as theorems about the law rather than observations about a solution: the $C$-image of any closed configuration — the polarity-conjugate braid, the same geometry with every polarity reversed — is a degenerate solution, and the $P$-image — the mirror geometry with rotation sense reflected — is a degenerate enantiomer. Polarity conjugation does not change the pro/anti ordered orientation because it does not move a worldline.

**The chiral invariant.** A prescribed B1 member is chiral when its axial polarity dipole $\mathbf p$ (polar, reversed by both $C$ and $P$) is locked to its spin $\mathbf S$ (axial, invariant under both $C$ and $P$), with the binary phase offsets supplying the third locked structure. Their product is a pseudoscalar,

$$
\chi=\operatorname{sign}(\mathbf p\cdot\mathbf S),
$$

the declared chiral invariant of that prescribed member. Its transformation law is forced by the vector characters above:

| operation | $\mathbf p$ | $\mathbf S$ | $\chi$ |
| --- | --- | --- | --- |
| $C$ (polarity conjugation) | $-\mathbf p$ | $+\mathbf S$ | $-\chi$ |
| $P$ (parity) | $-\mathbf p$ | $+\mathbf S$ | $-\chi$ |
| $CP$ | $+\mathbf p$ | $+\mathbf S$ | $+\chi$ |

So $C$ and $P$ each reverse $\chi$, while $CP$ preserves it. For the declared polarity-product radial kernel, the $C$-, $P$-, and $CP$-transforms of any solution are degenerate transformed solutions. This is an exact covariance of the declared kernel; it does not establish formation into an $\iota$-fixed history, branch retention, or $CP$ conservation in weak reaction channels. Claim level: derivation grade for the declared kernel.

The pro/anti ordered orientation is a separate sign. Let $o_{\mathrm{PA}}$ denote the deformation-stable orientation extracted from the indexed B1 path or angular-momentum-frame record. It is not a high/middle/low radius order. Because $C$ leaves worldlines fixed, $o_{\mathrm{PA}}$ is $C$-even; because $P$ mirrors the orientation, it is $P$-odd. The polarity-assignment sign on this chart is therefore

$$
c_{\mathrm{pol}}
\equiv
\chi o_{\mathrm{PA}},
\qquad
\chi=o_{\mathrm{PA}}c_{\mathrm{pol}}.
$$

Thus $C$ reverses $c_{\mathrm{pol}}$ at fixed $o_{\mathrm{PA}}$, while $P$ reverses $o_{\mathrm{PA}}$ at fixed $c_{\mathrm{pol}}$. With left/right defined by the sign of $\chi$, $C$ maps a left braid to a right polarity-conjugate braid on the same pro/anti orientation; $CP$ maps it to a left polarity-conjugate braid on the mirrored orientation. This is exact covariance of the declared kernel plus definition-level sign bookkeeping. It does not establish formation, branch retention, or $CP$ conservation in weak reaction channels.

**Any axial polarity-orientation selection must be $C$-covariant.** If a dynamical mechanism selects a preferred drift orientation relative to the axial polarity dipole — one polarity-leading side — the kernel evenness forces the selection to lock to $\chi$ rather than to an absolute polarity: a braid and its $C$-image would lead with opposite polarities, and the two configurations would be exactly degenerate under the kernel covariance. Whether any such selection mechanism exists is an open question; none is asserted here.

**The crossing order is the observable face of $o_{\mathrm{PA}}$, not of $\chi$ alone.** An observer stationed on the incoming drift axis, watching the three binary paths cross a reference meridian as the braid rotates, records a fixed cyclic order — $1{:}2{:}3$ or $1{:}3{:}2$ — whose sign is $o_{\mathrm{PA}}$; the two orders are the $P$-image enantiomers. Polarity conjugation leaves that sequence unchanged while reversing $\chi$. For a rigid common-frequency braid this order is a structural invariant, and its invariance is also a representability marker: a genuine closed braid preserves the order, whereas a differential- or counter-rotating configuration lets the binaries lap and the order scramble.

**Which channels could read the glove.** Effective channels that do not resolve the internal lock are candidates to inherit the declared kernel's parity covariance. A weak-flavored transaction channel that reorganizes the internal lock is a candidate route by which a maximal B1 lock could produce maximal parity selectivity, but no weak-transaction operator has yet been derived from a retained branch record. The primitive kernel remains $CP$-covariant; reproducing the measured nonzero $CP$ asymmetries therefore requires a separate $CP$-odd effective event or branch residual. Candidate sources include Noether sea polarity/chirality texture and interference between transaction paths at different drift-dependent internal angles, but these are hypotheses rather than established next-order terms. The combined $CPT$ benchmark is carried in [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md).

The B1 construction therefore supplies a conditional discrete-symmetry scaffold, not yet a recovery of the observed pattern. A retained chiral branch and a derived weak-transaction operator must still produce the observed handedness selectivity, while a separate $CP$-odd event or branch residual must reproduce the measured kaon and B-system asymmetries. Neither recovery has been established. Claim level: derivation target for weak parity and $CP$ recovery; the primitive-kernel covariance is exact within its declared scope.

### Candidate Status and Open Burden

B1 is a prescribed member. Everything beyond its exact geometry and the declared kernel-covariance structure is open: whether any realization satisfies the master equation, whether a satisfying realization persists under evolution, whether persistence requires an environment, and how B1 compares with the other taxonomy members. Those questions are governed by the retention contract of [Braid Recovery Requirements](../../../../markdown/aaa/noether-braid/braid-recovery-requirements.md). Results enter this chapter only when established, with instrument and claim level stated.

## Braid Mathematics

Six architrinos interacting through delayed causal wakes form a hard dynamical problem: the state is an entire path history, the per-hit accelerations arrive along causal roots that must be solved for, and no general closed-form solution exists. This chapter collects what can nevertheless be established exactly — by symmetry, geometry, and kinematics — before any support-band structure is chosen and before any branch is claimed to persist. The machinery here is core-agnostic: every braid realization in the [Noether Braid](../../../../markdown/aaa/noether-braid/noether-braid.md) family consumes it, and none of it asserts branch retention.

The results divide by strength, and the division is stated with each result. Exact derivations include the transverse speed-budget lemmas and the constant-lag reduction of the rotating-wave ansatz. Scoped negative results include the anti-damping family, which rejects specific rigid charts without rejecting the braid program. Candidate mechanisms at hypothesis level include the action-click picture at the causal-root fold set and the Accessory Configuration moment analysis. Theorem targets include the eigen-braid spectrum system. Claim levels travel with their statements throughout. The A2-specific invariant channels, two-ring geometry, dipole identity, momentum-screw alignment, and return-response analysis live in [A2 Symmetry and Return Response](../../../../markdown/aaa/noether-braid/braid-a2-symmetry-and-return-response.md).

### Document Role

This chapter owns the shared mathematical machinery of the braid family: the substrate levels and speed hierarchy with the transverse speed-budget lemmas, the spiral-helical motion picture and mass thesis, the hinge equation sketch, the acceleration-gradient comparison, the scoped anti-damping negative results, the eigen-braid spectrum framing, the action-click mechanism, and the Accessory Configuration moment analysis. The neutral six-body base lives in [Noether Braid](../../../../markdown/aaa/noether-braid/noether-braid.md#neutral-braid-base); prescribed coordinates and definitions live in [Braid Taxonomy](../../../../markdown/aaa/noether-braid/braid-taxonomy.md), [Braid Family A](../../../../markdown/aaa/noether-braid/braid-family-a.md), and [Braid Family B](../../../../markdown/aaa/noether-braid/braid-family-b.md). The realization-independent proof obligations live in [Braid Recovery Requirements](../../../../markdown/aaa/noether-braid/braid-recovery-requirements.md). Realization chapters state which of this machinery their configurations inherit and what fixture-specific evidence they add.

### Substrate and Effective Levels

Braid dynamics uses four levels of description:

| Level | Meaning |
| --- | --- |
| Substrate ontology | Euclidean void, absolute substrate time $T$, architrinos, causal wakes, and causal-root branch structure. |
| Assembly dynamics | Noether braids, their coupled binary layers, self-hit multiplicity, shielding, phase closure, and root-ledger transitions. |
| Observer-inference exports | Rest mass, photon propagation, reconstructed kinematics, geodesics, and horizon behavior as later reconstructed by assembly-built observers. |
| Inference and closure status | Mathematical closures that remain to be derived before effective claims can be treated as proved rather than reconstructed. |

The distinction matters because the Euclidean void is not being curved at the substrate level. Curvature, geodesic motion, lapse, and horizon language enter only as observer-level bookkeeping reconstructed downstream from Noether sea state variables and assembly response.

### Speed Hierarchy

Several speed symbols must remain separated:

| Symbol or phrase | Meaning |
| --- | --- |
| $c_f$ | Primitive wake propagation speed in the substrate. |
| $c_{\text{eff}}(\mathbf X,T)$ | Noether sea dressed assembly-channel propagation speed used only after a downstream observer-channel map has been declared. |
| $c_\gamma(\mathbf X,T)$ | Local photon-channel speed; equality with $c_{\text{eff}}(\mathbf X,T)$ is a photon-channel closure target for the working observer-level photon branch, not a definition. |
| Locally measured light speed | The operational speed reconstructed downstream from assembly periods, rulers, and photon synchronization. |

The primitive speed $c_f$ is used for wake-intersection and self-hit geometry. The effective speed $c_{\text{eff}}$ belongs to Noether sea dressed closure and observer-level comparisons. These are not interchangeable. Any diagnostic that moves from primitive wake geometry to observer-level periods, rulers, or photons must declare its dressing map outside the primitive branch calculation.

#### Transverse Causal Budget Lemma

When a retained moving branch is exported to a clock, ruler, or photon-synchronization channel, the branch must declare the channel speed used by that export. The primitive branch chart solves causal roots with $c_f$. A dressed clock/ruler comparison uses $c_\star=c_{\text{eff}}(\mathbf X,T)$ after the Noether sea dressing map has been declared, while a photon synchronization comparison uses its declared photon-channel speed $c_\gamma(\mathbf X,T)$. The weak homogeneous measured limit may identify the declared channel speed with $c_0$ only after the clock, ruler, and photon rows collapse to one observer-accessible speed within the preferred-frame leakage budget.

For a branch whose response center drifts through the local Noether sea with material drift $\mathbf w$, the transverse budget is
$$
c_\star^2
=
\|\mathbf w\|^2+c_{\perp}^2,
\qquad
\beta_\star=\frac{\|\mathbf w\|}{c_\star},
\qquad
\gamma_\star=\frac{1}{\sqrt{1-\beta_\star^2}}
$$
Thus an observer-export clock or ruler row must extract
$$
\frac{c_{\perp}}{c_\star}
=
\frac{1}{\gamma_\star}
$$
from the same retained branch record, not append it as an independent Lorentz factor. The lemma fails as a citation target if a calculation solves primitive roots with $c_f$ and then reports an observer-level clock, ruler, or photon speed without the declared dressing map, or if the clock, ruler, and photon rows are sourced from different branch ledgers.

#### Transverse Internal-Motion Speed-Budget Lemma

Let one site's native velocity be decomposed into group translation and internal motion,

$$
\mathbf V_i
=
\mathbf V_{\mathrm{grp}}+\mathbf v_i^{\mathrm{int}}
$$

The exact native speed identity is

$$
\|\mathbf V_i\|^2
=
\|\mathbf V_{\mathrm{grp}}\|^2
+
\|\mathbf v_i^{\mathrm{int}}\|^2
+
2\mathbf V_{\mathrm{grp}}\cdot\mathbf v_i^{\mathrm{int}}
$$

If the internal motion is transverse to the group translation at every instant, then the cross term vanishes and the site speed is the exact quadrature

$$
\|\mathbf V_i\|^2
=
u^2+v_{\mathrm{int},i}^2,
\qquad
u=\|\mathbf V_{\mathrm{grp}}\|,
\qquad
v_{\mathrm{int},i}=\|\mathbf v_i^{\mathrm{int}}\|
$$

If a branch additionally pins the total site speed to $\|\mathbf V_i\|=\beta_\ast c_f$, the available internal speed is forced to

$$
v_{\mathrm{int},i}(u)
=
\sqrt{\beta_\ast^2c_f^2-u^2}
$$

The quadrature is exact kinematics under the transverse-motion hypothesis. The pinning of $\beta_\ast$ is a separate branch hypothesis, not an established retention mechanism. The A2 body-diagonal rotating channel and the B1 axial screw chart are two realizations of the transverse geometry; neither realization makes fixed total site speed automatic. A record with $\mathbf V_{\mathrm{grp}}\cdot\mathbf v_i^{\mathrm{int}}\neq0$ falsifies use of the quadrature for that site and must retain the cross term, which generally makes the maximum speed phase dependent.

The same pinned-speed hypothesis appears in the retained A1 scaling material of [A1 Dynamics](../../../../markdown/aaa/noether-braid/braid-a1-dynamics.md#retention-and-interpretation): a branch that holds an indexed internal speed fixed while accepting action transactions is forced onto the $R_a f_a\approx\text{constant}$ product law. The shared lemma shows how the hypothesis would also constrain transport; it does not establish that A1, A2, or B1 satisfies the pinning condition.

### Spiral-Helical Motion Picture

A resting Noether braid is a phase-locked structure of coupled binary layers. When the braid moves with center-of-mass velocity $\mathbf{V}_{\text{cm}}$, the rest-state circular or near-circular binary motions are drawn into braided spiral-helical cable patterns through the Euclidean void.

The spiral-helical picture is not decorative. A causal wake sent between partners, or between the layers, must now reach a receiver that has moved during the wake's travel time. The internal phase geometry must therefore retune its pitch, radius, tilt, and timing to preserve the same closure ledger. In dynamics language, bulk velocity is encoded as internal geometry.

This is the common mechanical basis for three later downstream readouts:

- branch-period stretch, because each completed internal cycle requires a different causal path in absolute time;
- longitudinal ruler contraction, because inter-assembly spacing must retune for forward and backward exchange;
- inertial response, because acceleration forces the internal causal ledger to re-close under a changing kinematic bias.

### Mass Thesis as a Dynamics Target

The conservative mass thesis is that rest mass is not primitive architrino substance. It is the externally measurable response of shielded, phase-locked internal causal history.

In roadmap form, the target relation is

$$
m_0(A)c_{\text{eff}}^2
\sim
\zeta(A)E_{\text{internal}}(A)
$$

where $E_{\text{internal}}(A)$ is the closed internal causal-history energy ledger of assembly $A$, and $\zeta(A)$ is the shielding or leakage factor that controls how much of that ledger couples to external probes. This is not yet a derived mass formula. It becomes a theorem only after the shielding factor, the internal energy ledger, and the first-order momentum-skew response are derived from the closed braid dynamics.

### Hinge Equation Sketch

**Equation of motion near the hinge ($v \approx c_f$)** For each architrino $i$ interacting with its partner $j$:
$$
\frac{d^2\mathbf X_i}{dT^2}(T)=\mathbf{a}_{i,j}(T;\{T_{p,k}\})+\mathbf{a}_{i,i}^{\mathrm{active}}(T;\{T_{s,m}\})+\mathbf{a}_{\text{ext}}(T)
$$
with delay constraints (causal roots):
$$
\|\mathbf X_j(T_{p,k})-\mathbf X_i(T)\|=c_f\,(T-T_{p,k}), \quad
\|\mathbf X_i(T_{s,m})-\mathbf X_i(T)\|=c_f\,(T-T_{s,m})
$$
where $\mathbf{a}_{i,i}^{\mathrm{active}}$ is a shorthand for the sum over retained self-hit roots in $\mathcal{C}_{ii}(T)$, not an instantaneous switch $H(s-1)$. Self-hit remains path-history dependent: roots emitted during an earlier super-field-speed interval can stay active after the current speed has changed.
The second constraint is the native small-scale bridge-like causal structure in this sketch: the receiver at $\mathbf X_i(T)$ is linked to an earlier point on the same worldline by its own causal wake. The connectedness is path-history closure in the causal-root ledger, not a tunnel in the Euclidean void. Any connected-geometry translation belongs only after coarse-graining into an effective horizon-interface or metric description.

and $s=\|\mathbf V\|/c_f$. For symmetric, non-translating circular geometry, the delay angles satisfy
$$
\delta_p=2s\cos(\delta_p/2), \qquad \delta_s=2s\sin(\delta_s/2)
$$
with no self-hit solution for $s\le 1$ and a small-root branch $\tilde{\delta}_s\to 0^+$ for $s>1$. The radial/tangential split then reads
$$
\ddot r-r\dot\theta^2=A_{\text{rad}}(\delta_p,\delta_s), \qquad r\ddot\theta+2\dot r\dot\theta=T(\delta_p,\delta_s)
$$
The symmetry breaking at the hinge is geometric: as $\tilde{\delta}_s\to 0^+$ the self-hit radial factor scales like $1/\sin(\tilde{\delta}_s/2)$, turning on a large outward term while the state remains continuous.

The working guess that the self-hit regime may change the effective action-step scale from $\Delta L_c$ to $2\Delta L_c$ is a theorem burden for the broader causal-closure program. This chapter keeps only the local hinge geometry needed to state the dynamical branch condition.

### Acceleration-Gradient Branch Comparison

The local dynamics burden behind later equivalence-principle recovery is a substrate comparison, not an observer postulate. A uniformly accelerated assembly and a stationary assembly placed in a matched Noether sea gradient should output compatible delay-geometry records on the same kind of branch packet (the scan packet defined with A1 diagnostics in [A1 Dynamics](../../../../markdown/aaa/noether-braid/braid-a1-dynamics.md#a1-dynamics)):
$$
\mathcal{D}_{A1}^{\mathrm{accel}}(W)
\sim
\mathcal{D}_{A1}^{\mathrm{grad}}(W)
$$
with the comparison made from phase-closure residuals, anisotropy ratios, branch-period records, stability thresholds, and cycle-averaged causal-work or phase-slip variance.

The ambient Noether sea must participate in this comparison. Deforming the assembly alone is not enough, because the gradient-driven case changes the Noether sea response record while the accelerated case changes how the same retained causal-root ledger is transported through absolute time. The downstream observer-inference question is whether those exported packets recover the usual local equivalence behavior. This chapter only asks whether the substrate packets match before that translation.

---

### Scoped Anti-Damping Results

A recurring obstruction shapes the whole retention program: in chart after chart, the delayed kernel does net positive work on the assembly's current motion. The wake pushes forward rather than braking — anti-damping — so a persistent braid cannot close as a static force balance; it must supply an exchange or export channel for the pumped action. The evidence family consists of scoped negative results, each valid only under its own chart, kernel, and conventions:

1. **Circular partner-wake binary.** On the uniform circular benchmark, the retained circular row has an inward radial component and a forward tangential work row; the combination accelerates the orbiting motion and prevents a partner-only constant-speed circle. Any sub-field-speed contraction claim must beat this row through non-circular geometry, wake-flux export, recoil, or a later multi-root ledger. The detailed statement lives in [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md).
2. **Collinear self-hit reading.** Along a true collinear history, the same-transmitter term is naturally read as an anti-damping or positive-work contribution on the physically relevant post-crossing outbound branch: self-interaction tends to reinforce the current radial motion rather than furnish a centrifugal-style barrier. The open question is therefore whether partner attraction can recapture the motion despite that self-drive.
3. **Frozen rigid octahedral chart.** The rigid zero-offset octahedral carrier at fixed speed is conjectured to carry a nonzero tangential residual rejecting the narrow fixed-speed branch chart; this conjecture is unverified, and the reading discipline for that chart is recorded in [Noether Braid](../../../../markdown/aaa/noether-braid/noether-braid.md#neutral-braid-base).
4. **Zero-angular-momentum channel invariance.** The face-opposite seed placed on the zero-angular-momentum channel stays exactly on that channel: the dynamic center holds at zero, all six radii stay equal, and antipodal partners stay exact. This is the invariant-channel theorem, not a statement of the seed's dynamical fate, which is open; the fixture record lives in the [A2 isolated-release analysis](../../../../markdown/aaa/noether-braid/braid-a2-symmetry-and-return-response.md#isolated-release-and-the-return-response-question).
5. **Rigid rotating-wave family.** The rigid single-frequency A2 rotating wave fails twice, independently. Axially: same-ring contributions have exactly zero axial component, while every opposite-ring contribution pulls the two rings together, and a sum of strictly one-signed terms cannot vanish — so the rigid rotating wave has no axial equilibrium at any two-ring aspect and any sub-field rim speed, and the rigid single-frequency family, if it existed, would be forced planar. This axial no-balance statement is a derivation. Tangentially: on the planar hexagon, the conjectured behavior is a strictly positive tangential residual growing with rim speed while the radial residual stays inward — the delayed kernel pumping the rotation rather than braking it. That tangential conjecture is unverified; the axial derivation stands on its own.

The reading discipline matters as much as the results. Each entry is scoped to the chart and assumptions that produced it; the agreement across charts is qualitative consilience, and no ledger quantity may be consumed across charts. None of these results rejects the neutral braid, A1, A2, B1, and C-family, bounded-speed, controlled self-hit, fold-layer, or medium-response programs.

The constructive consequence is a sharpened search. Admissible persistent braids are necessarily non-rigid: the pumped tangential action must be exchanged with another internal channel — radial breathing against rotation, the two-frequency class whose closed figures are the integer phase-closure states — or absorbed by same-transmitter contributions at the field-speed hinge, or exported to a Noether sea environment. The rigid ansatz cannot represent wake exhaust by construction, so its failure was arguably necessary: a retained branch must have somewhere to put the pumped action. The spectrum hunt below is therefore a hunt for relative periodic orbits, not relative equilibria.

### The Eigen-Braid Spectrum

If persistent braids exist, the family should have a spectrum: a discrete set of admissible internal configurations, the way a bounded resonator has modes. The natural first ansatz is the rotating wave — a relative equilibrium of the delayed dynamics on the body-diagonal channel,

$$
\mathbf X_\ell(t)
=
\operatorname{Rot}(\hat{\mathbf n},\omega t)\,\mathbf X_\ell(0)
+u\,\hat{\mathbf n}\,t
$$

with angular rate $\omega$ and axial drift $u$. On the channel the free data reduce to the representative worldlines of the equivariant reduction, and the natural branch coordinate is the screw pitch, equivalently the pair $(u,\omega)$ with the channel radius.

A constant-lag reduction makes the ansatz tractable, and it is a derivation. On the rotating-wave ansatz, every directed-pair causal delay is constant in time: splitting any initial separation into axial and transverse parts relative to $\hat{\mathbf n}$, the rotation acts only on the transverse part and the drift only on the axial part, so the separation norm between reception time $T_r$ and transmitter emission time $T_r-\tau$ depends on $\tau$ alone. Each directed pair's root residual

$$
F_{ij}(\tau)
=
\left\|\boldsymbol\Delta_\perp(\tau)\right\|^2
+\left(\Delta_\parallel+u\tau\right)^2
-c_f^2\tau^2
$$

is a fixed transcendental function of the lag $\tau$, and causal roots are its zeros: constant phase lags. The same argument covers same-transmitter root records. The consequence is structural: on this ansatz the state-dependent delay system collapses to a finite algebraic problem, and the infinite-dimensional history disappears from the unknowns.

The spectrum system is then a theorem target. An admissible rotating-wave row is a solution of a finite residual system: for each representative receiver, the kinematic identity that the kernel sum over all constant-lag roots equals the ansatz acceleration; the root equations $F_{ij}(\tau_r)=0$ for every retained lag in the declared root-topology class; and the admissibility inequalities — sub-field speed or declared hinge occupancy, positive Jacobian floors, transmitter-side acceleration-weight floors, noncollision margins. Solutions form the **eigen-braid spectrum**: for fixed drift and fixed root-topology class, a solution set $\{(\omega_k,R_k)\}$ indexed by root topology and winding data. Discreteness is a target rather than an assumption — the residuals are real-analytic away from caustics and collisions, so solution sets are generically isolated, and a degenerate continuum would itself be a reportable structure.

A second interface target rides on the spectrum. Each row carries a definite screw pitch and helicity sign, and the interface hypothesis is that admissible rows at fixed root topology form a discrete pitch ladder whose transitions are root-topology transitions — the click picture below — so that action quantization is inherited from integer root counts rather than imposed.

The current status keeps the target honest. The axial no-balance derivation above forces the rigid single-frequency family planar, and the anti-damping indications (where they hold) disfavor it further, so the live spectrum question is posed for relative periodic orbits — breathing against rotation with periodic rather than constant delays — and for hinge-occupying and sea-embedded rows. A found row would still be a relative equilibrium or relative periodic orbit only; transverse stability, action and wake balance, and the same-record rows of [Braid Recovery Requirements](../../../../markdown/aaa/noether-braid/braid-recovery-requirements.md) all remain between a spectrum row and a retained branch.

### Action Clicks at the Fold Set

The material in this section is a candidate mechanism at hypothesis level: it proposes how the discrete action transaction of the [cadence-scale retuning hypothesis](../../../../markdown/aaa/noether-braid/braid-a1-dynamics.md#cadence-scale-retuning-hypothesis) is physically implemented, and none of it is yet supported by a retained branch record.

Start with an everyday machine. A mechanical watch does not spend energy continuously; an escapement lets the stored energy advance the mechanism one discrete click at a time, and the click count is an integer because a gear tooth is either engaged or it is not. The proposal here is that the field-speed hinge is the braid's escapement.

Three properties make the field speed special for the hinge row, and none of them is arbitrary. First, $c_f$ is the boundary of self-interaction: delayed same-transmitter causal roots exist only for a strand that has exceeded field speed somewhere on its recent path, so crossing the edge is not a matter of degree — it opens a class of causal roots that simply do not exist below it. Second, the transmitter-side factor of the transmitter-side acceleration weight $W^{\mathrm{acc}}$ approaches its caustic as a source's normal speed approaches $c_f$, so the edge is where wake delivery is most sharply concentrated. Third, for a given support radius, the stored kinematic angular momentum of a row grows with its tangential speed and saturates at the sub-field edge, so the hinge is the configuration that stores the most angular momentum per unit radius without opening the self-interaction ledger. The hinge row sits at the marginal point of all three properties at once.

The click itself is then a root-topology event, and it already has a canonical mathematical home: the causal-root fold set $\Sigma_{ij}$ defined in [Architrino](../../../../markdown/aaa/foundations/architrino.md#core-definition), where the root residual and its emission-time derivative vanish together. An accepted transaction momentarily carries the hinge row across the edge, one same-transmitter causal root opens or closes — a controlled crossing of the fold set rather than a pathology — and the branch re-locks below the edge with its integer ledger changed by one. Quantization on this reading is not imposed on the dynamics; it is inherited from the fact that a causal root either exists or does not, so the count of active roots is an integer and every admissible transaction changes it by a whole step. The closed-cycle action unit $h_{\mathrm{act}}$ is the action transacted in one such click, and the statement that closure-label changes are tied to causal-root bifurcation becomes the click's formal description. The hinge acts as the assembly's double-entry accountant: each click posts one entry to the internal integer ledger and a matching entry to the outgoing wake, so the books balance event by event rather than continuously. A wake entry remains on the books whether or not it is ever received; in a populated Noether sea essentially every entry is eventually redeemed by some receiver, and the unredeemed remainder is regulated by the medium's convergence requirement rather than lost.

The click is also an instance of the codimension-one transition pattern stated in [Emergence of Structure](../../../../markdown/aaa/foundations/emergence-of-structure.md#the-dynamics-of-structure-and-asymmetry): an integer branch label changes only when the retained chart crosses a singular stratum, and self-hit onset is named there as exactly such a fold. The hinge click is that fold crossed deliberately and repeatedly, under control, as the branch's transaction mechanism.

The statistical layer is where familiar physics should emerge. A single braid is a discrete clicking system: its energy record changes in whole steps at particular instants, and the timing of a given click depends sensitively on the phase of the internal cycle when the transaction arrives, which makes individual click outcomes practically unpredictable even though the substrate dynamics is deterministic. Click-outcome weights therefore belong to the declared-measure basin formalism of [Emergence of Structure](../../../../markdown/aaa/foundations/emergence-of-structure.md#context-as-constraint-on-basin-selection): a click probability is a basin volume under a declared preparation measure, and any Born-rule contact inherits that chapter's measure discipline rather than adding a probability postulate. A population of braids clicks asynchronously, and the coarse-grained result is a smooth cadence-space current — the same relationship as between molecular collisions and smooth gas pressure. On this reading, the smoothness of observed energy exchange is a law-of-large-numbers statement about click ensembles, and the discreteness that quantum measurements keep finding at the bottom is the escapement showing through. The same picture supplies a destabilization boundary: a transaction rate slow compared with the internal cadence lets the braid re-lock between clicks (an adiabatic exchange), while forcing faster than the cadence — a sharp transverse re-pointing of the branch axis, or an abrupt longitudinal deceleration — outruns the re-locking and breaks the phase lock instead of advancing it, releasing structure rather than storing action. Whether this adiabatic-to-diabatic boundary reproduces observed radiative and decay thresholds is an open, falsifiable target: in solver records, clicks should appear as integer transitions in the active root count of the hinge row, and the declared hinge tolerance is the click window.

#### Fold Geometry of the Click: Coincidence Versus Finite Chord

Whether a hinge click can supply a clean, chart-defined transacted amount depends on where on the fold set the crossing is born, and the two singular loci of the point-transceiver ontology separate the cases. [Architrino](../../../../markdown/aaa/foundations/architrino.md#point-transceiver-status) distinguishes the coincidence stratum $\{r_{ij}=0\}$ — a spatial point-kernel problem that requires a declared spatial regularization — from the caustic stratum $\{\partial_{T_t}F_{ij}=0\}$ — a causal-root fold that requires a fold-resolution chart. A click carries a chart-defined magnitude only when its crossing sits on the second locus while staying clear of the first.

A same-transmitter (self-hit) crossing on a smooth strand is born on the coincidence stratum. As the causal lag $\Delta\to 0$ the separation is $\lVert\mathbf X(T)-\mathbf X(T-\Delta)\rVert=\lvert\mathbf v\rvert\,\Delta+O(\Delta^2)$, so the same-transmitter root nucleates exactly at the field-speed crossing with a vanishing chord, $r_{ij}\to 0$ as the root opens. On the symmetric one-band channel this onset is a cusp rather than a generic fold, and the transacted amount is not fixed by the fold chart; it is set instead by the point-transceiver short-distance self-regularization scale $d_0$ — of order the near-field two-body scale $\kappa\epsilon^2/c_f^2$ of [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md) (with $\epsilon$ the architrino polarity-charge magnitude), and in the minimum-circular-binary reading the collapse-arresting radius itself, whose derivation from $\kappa$, $\epsilon$, and $c_f$ remains an open question noted in [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md). This is a scoped negative for any single-site absorber picture: the symmetric single-site self-hit cannot supply a chart-defined transacted amount, because its magnitude is a property of $d_0$ rather than of the branch geometry. Same-transmitter rows remain in the ontology and are what set $d_0$; they simply do not fix a clean click on their own.

A cross-hit crossing between two distinct strands can instead be born at finite chord. When the transmitter-side alignment $\mathbf v_j\cdot\hat{\mathbf r}_{ij}=c_f$ holds at finite separation, the crossing sits on the caustic stratum with $r_{ij}\neq 0$: a generic (Whitney $A_2$) fold of nonzero curvature whose transacted impulse is finite and independent of the short-distance regularization. This is the surviving route to a chart-clean click magnitude, and it is a theorem target rather than a result. It is contingent on a hinge geometry that sustains the alignment $\mathbf v_j\cdot\hat{\mathbf r}_{ij}=c_f$ across a click window — the same dynamic-alignment and formation-history condition that gates the [A2 return-response question](../../../../markdown/aaa/noether-braid/braid-a2-symmetry-and-return-response.md#isolated-release-and-the-return-response-question). Whether a braid's own formation and recycling dynamics hold that alignment long enough to transact is the open question on which the clean click magnitude, and with it the whole hinge-absorber route, depends.

### Accessory Configuration

An **Accessory Configuration** is a declared set of six architrinos associated with a Noether braid but not included in the braid's neutral six-architrino core. Each accessory site has its own declared electrino or positrino polarity. The six positions may lie inside the braid's effective envelope, cross that envelope, or lie outside it; the term does not assume an axial layer, a surrounding shell, or any other placement geometry.

Let the accessory sites be indexed by $p\in\{1,\ldots,6\}$, with polarity signs $\tau_p\in\{+1,-1\}$ and positions relative to the braid group center

$$
\mathbf r_p(T)
=
\mathbf X_p^{\mathrm{acc}}(T)-\mathbf X_{\mathrm{grp}}(T).
$$

The first configuration data are the net accessory polarity and polarity-signed spatial moments,

$$
Q_{\mathrm{acc}}=\sum_{p=1}^{6}\tau_p,
\qquad
\mathbf p_{\mathrm{acc}}=\sum_{p=1}^{6}\tau_p\mathbf r_p,
$$

with higher moments built from the same six signed positions. These moments are derived readouts of a specified Accessory Configuration. They do not determine the six trajectories, prove confinement, or establish a retained assembly.

At hypothesis level, configurations whose low-order polarity-signed moments cancel may expose less structure to distant receivers than configurations with the same net accessory polarity but larger surviving moments. The net polarity $Q_{\mathrm{acc}}$ cannot be hidden by rearranging the six sites. Any additional quietness ordering must be computed from the actual six-site polarity assignment, positions, path histories, and braid coupling. It cannot be inferred from an equal-polarity point arrangement or from a four-site or two-site substitute.

The required dynamical test is a same-record calculation: the braid core must remain retained while all six accessory trajectories acquire bounded causal-return ledgers, and the computed far-field wake must be compared with the moment ordering. The moment hypothesis fails if the first surviving moment does not track independently computed exposed-wake or mass-response records.

## Candidate Braid Analysis Methodology

This chapter defines an analytical method for prescribed braid records. Its purpose is controlled comparison: every candidate is evaluated with the same causal-wake formula, probe set, retained-history rule, return window, and scoring rules before one geometry is said to cancel or expose more wake than another.

A prescribed record supplies known transmitter paths from which the delayed roots, wake superposition, virtual-probe response, cancellation, angular structure, and spectra can be evaluated at any event $(T,\mathbf X)$. The method concerns only those analytical consequences of the declared paths. It does not assess assembly stability, environmental support, or any unprescribed motion.

The phrase **absolute observer position** means a coordinate probe at an event $(T,\mathbf X)$ in absolute time and the Euclidean void. It does not introduce a Physical Observer or an effective spacetime frame. The native coordinates are

$$
(T,\mathbf X)=(T,X^1,X^2,X^3).
$$

### Analysis Record

Every published candidate analysis must identify one source record. At minimum that record carries:

- the paths $\mathbf X_j(T)$, velocities $\mathbf V_j(T)$, polarities $q_j$, and persistent identities of all architrinos;
- the family/member identifier and complete taxonomy-coordinate row;
- the prescribed-geometry engine and chart version;
- the retained history interval, analysis window, return duration $T_{\mathrm{ret}}$, and absolute-time origin $T_0$;
- the field speed $c_f$, coupling convention, root policy, self-hit policy, and any mollifier or cutoff;
- the spatial probe set, enclosing surfaces, temporal sampling rule, and numerical tolerances; and
- the source hash, engine identity, parameter vector, sampling seed, and generated result hash.

Write the scored result as $\mathbf G[S;P]$, where $S$ is the complete source record and $P$ is the complete analysis protocol. The protocol includes the probe set, history depth, root policy, surface geometry, normalization, tolerances, and sampling rule.

Any source change $S\rightarrow S'$ invalidates the prior score by default. A score may be retained only when a dependency review demonstrates that the changed field cannot enter that measure. In particular:

- a path, radius, frequency, phase, group-translation, polarity, or retained-history change requires new roots and recomputation of every downstream wake measure;
- a probe, boundary, root-policy, normalization, or tolerance change defines a new protocol $P'$ and requires every compared candidate to be evaluated under $P'$;
- an added environmental response defines a different analysis outside the scope of this method; and
- a metadata-only correction may preserve numerical measures only when the source identity and dependency review are recorded with the correction.

Comparing $\mathbf G[S;P]$ directly with $\mathbf G[S';P']$ is uncontrolled unless the difference is explicitly presented as a sensitivity study. The dependency review must state which measures were invalidated, which were recomputed, and why any retained measure is invariant.

### Superimposed Causal-Wake Map

The requested wave formula is not an imported wave-equation partial differential equation. It is the superposition of the same delayed causal isochrons used by the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#path-history-sum-and-integral-representation).

For source $j$, emission time $T_t<T$, and coordinate probe $\mathbf X$, define

$$
\mathbf r_j(T,\mathbf X;T_t)
=
\mathbf X-\mathbf X_j(T_t),
\qquad
r_j=\|\mathbf r_j\|,
\qquad
\widehat{\mathbf r}_j=\frac{\mathbf r_j}{r_j},
$$

and the causal constraint

$$
g_j(T,\mathbf X;T_t)
=
r_j(T,\mathbf X;T_t)-c_f(T-T_t).
$$

The active emission-time roots are

$$
\mathcal C_j(T,\mathbf X)
=
\left\{
T_t<T:g_j(T,\mathbf X;T_t)=0
\right\}.
$$

A source-normalized signed causal-wake map is then

$$
\boxed{
\mathcal W(T,\mathbf X)
=
\sum_j q_j
\int_{T_{\min}}^T
\frac{
\delta\!\left(g_j(T,\mathbf X;T_t)\right)
}{4\pi r_j^2(T,\mathbf X;T_t)}
\,dT_t
}
$$

for the declared retained-history start $T_{\min}$. This scalar records signed causal-wake exposure under the declared source normalization. It is not by itself energy, potential, or acceleration.

For simple roots, define the transmitter-side factor

$$
D_{t,j}
=
c_f-\widehat{\mathbf r}_j\cdot\mathbf V_j(T_t).
$$

The delta integral collapses to

$$
\boxed{
\mathcal W(T,\mathbf X)
=
\sum_j
\sum_{T_t\in\mathcal C_j(T,\mathbf X)}
\frac{q_j}{4\pi r_j^2|D_{t,j}|}
}
$$

when $|D_{t,j}|>0$ on every retained root. A root with $D_{t,j}=0$ is a caustic-like chart boundary and must be routed through the declared fold or regularization treatment rather than silently clipped.

The unsigned companion ledger

$$
\mathcal W_{\mathrm{abs}}(T,\mathbf X)
=
\sum_j
\sum_{T_t\in\mathcal C_j(T,\mathbf X)}
\frac{|q_j|}{4\pi r_j^2|D_{t,j}|}
$$

separates weak net exposure caused by cancellation from weak exposure caused by small individual contributions. The pointwise signed-cancellation ratio

$$
\chi_{\mathcal W}(T,\mathbf X)
=
\frac{|\mathcal W(T,\mathbf X)|}
{\mathcal W_{\mathrm{abs}}(T,\mathbf X)+\varepsilon_{\mathcal W}}
$$

lies near zero when the signed contributions cancel and near one when they reinforce, subject to the declared denominator floor $\varepsilon_{\mathcal W}>0$.

#### Explicit Prescribed-Orbit Reduction

For a circular prescribed endpoint with fixed orbit center $\mathbf C_j$, orthonormal plane vectors $\mathbf u_j$ and $\mathbf v_j$, radius $R_j$, angular frequency $\omega_j$, and phase $\phi_j$, write

$$
\mathbf X_j(T_t)
=
\mathbf C_j
+
R_j\left[
\mathbf u_j\cos(\omega_jT_t+\phi_j)
+
\mathbf v_j\sin(\omega_jT_t+\phi_j)
\right].
$$

At an arbitrary event $(T,\mathbf X)$, define

$$
\mathbf d_j=\mathbf X-\mathbf C_j,
\qquad
A_j=\mathbf d_j\cdot\mathbf u_j,
\qquad
B_j=\mathbf d_j\cdot\mathbf v_j,
$$

$$
H_j=\sqrt{A_j^2+B_j^2},
\qquad
\delta_j=\operatorname{atan2}(B_j,A_j).
$$

The causal-root condition then reduces exactly to the scalar equation

$$
\boxed{
c_f^2(T-T_t)^2
=
\|\mathbf d_j\|^2+R_j^2
-2R_jH_j\cos(\omega_jT_t+\phi_j-\delta_j)
}
$$

for each transmitter $j$. Thus the full spatial problem does not require evolving the source: at each requested $(T,\mathbf X)$, solve this one-dimensional delayed-time equation over the retained history, substitute all certified roots into $\mathcal W$ or $\mathbf A_p$, and sum the six endpoint contributions. A translating orbit is handled by placing the declared center path $\mathbf C_j(T_t)$ directly in the original causal equation; the fixed-center reduction above applies in a co-translating coordinate chart only when that chart and its conversion back to absolute coordinates are stated.

This reduction supports complete time traces, spatial slices, enclosing-surface maps, angular decompositions, and spectra for prescribed circular records. More general prescribed paths use the same root equation $g_j=0$ without the circular trigonometric reduction.

#### Virtual-Probe Response

The scalar wake map does not encode the polarity or direction of a receiving architrino. For a stationary virtual probe with declared charge $q_p$ at $\mathbf X$, the acceleration-first response is

$$
\boxed{
\mathbf A_p(T,\mathbf X;q_p)
=
\sum_j
\sum_{T_t\in\mathcal C_j(T,\mathbf X)}
\kappa\,\operatorname{sign}(q_jq_p)|q_jq_p|
\frac{c_f}{|D_{t,j}|}
\frac{\widehat{\mathbf r}_j}{r_j^2}
}
$$

under the canonical simple-root acceleration convention of the Master Equation. The stationary probe is a comparison instrument, not an added source in the braid record. Positive- and negative-polarity probe responses must be reported separately when their distinction matters.

For a moving diagnostic probe $\mathbf X_p(T)$, the same arriving-hit strength applies at its current position. Its velocity changes root playback through

$$
m_{p\leftarrow j}
=
\frac{D_{r,j}}{D_{t,j}},
\qquad
D_{r,j}
=
c_f-\widehat{\mathbf r}_j\cdot\mathbf V_p(T),
$$

but $D_{r,j}$ does not multiply the instantaneous acceleration.

### Wakes Experienced Inside the Braid

At receiver architrino $i$, set $\mathbf X=\mathbf X_i(T)$ and exclude $i$ from the transmitter sum to obtain the wake received from the other architrinos:

$$
\boxed{
\mathbf A_i^{\mathrm{others}}(T)
=
\sum_{j\ne i}
\sum_{T_t\in\mathcal C_{i\leftarrow j}(T)}
\mathbf A_{i\leftarrow j}(T;T_t)
}
$$

Self-hit acceleration, when active, is recorded separately as $\mathbf A_i^{\mathrm{self}}(T)$. This separation prevents a geometry with strong self-hit support from being mistaken for one stabilized by inter-architrino exchange.

Over the complete orbital or return cycle,

$$
T_0\le T<T_0+T_{\mathrm{ret}},
$$

the internal report must retain each pairwise contribution, the net vector, its components in the declared braid frame, root identities, $D_t$ margins, and root-playback derivatives. Cycle averages must not replace peak values or root-transition events.

Because the paths are known, their required kinematic acceleration is also known analytically. Define the prescribed-path equation mismatch

$$
\boxed{
\mathbf R_i^{\mathrm{path}}(T)
=
\frac{d^2\mathbf X_i}{dT^2}
-
\left(
\mathbf A_i^{\mathrm{others}}(T)
+
\mathbf A_i^{\mathrm{self}}(T)
\right)
}
$$

under the declared self-hit convention. This is a pointwise comparison between the acceleration required by the prescribed path and the acceleration supplied by the analytical causal-hit sum. Its peak, RMS, mean vector, phase dependence, and per-binary decomposition are legitimate prescribed-record measures. If the self-hit term or another accepted acceleration contribution is unavailable, the result must be labeled a partial mismatch rather than a complete Master Equation residual. A small mismatch measures compatibility of the declared chart with the evaluated acceleration contributions; it does not establish stability.

### Probe Geometry

A candidate should be tested on the same nested probe geometry:

1. the braid center and each binary midpoint;
2. each architrino path and declared binary axis;
3. a three-dimensional interior grid covering the path-history envelope;
4. one or more enclosing surfaces $S_R$ outside that envelope;
5. a far-field directional grid with enough angular resolution to separate isotropic and anisotropic leakage; and
6. adaptive samples near small-$|D_t|$ roots, close approaches, envelope extrema, and rapid phase changes.

The enclosing radius $R$ must be large enough to test the intended far-field approximation and varied to show whether the extracted angular coefficients have settled. A single favorable direction cannot establish external wake cancellation.

### Objective Measures

Every measure in this chapter is a deterministic analytical consequence of a prescribed source record. Root finding, quadrature, and sampling may be performed numerically, but they evaluate the declared formulas rather than evolving the source.

#### Prescribed-Record Analytical Measures

| Measure | Definition or required record | What it tests |
| --- | --- | --- |
| Prescribed-period closure | Position, velocity, and phase differences between $T_0$ and $T_0+T_{\mathrm{ret}}$ | Whether the declared formulas and chosen return period are internally consistent |
| Minimum separation | $d_{\min}=\min_{T,i\ne j}\|\mathbf X_i(T)-\mathbf X_j(T)\|$ | Whether the prescribed chart contains a collision, an undeclared coincidence, or a near-singular pair geometry |
| Root-transversality margin | $\min|D_{t,j}|$ over all retained probe and internal roots | Distance from an unresolved causal-root fold |
| Root-topology ledger | Root counts, identities, births, deaths, and reconnections versus $T$ | Whether averaged curves hide causal-branch changes |
| Internal prescribed-path response | Per-endpoint peak, RMS, and cycle integral of $\mathbf A_i^{\mathrm{others}}$ evaluated on the prescribed paths | The acceleration that the other prescribed paths would deliver, not whether those paths persist |
| Prescribed-path equation mismatch | Peak, RMS, mean, phase-resolved, and per-binary rows of $\mathbf R_i^{\mathrm{path}}$ | Pointwise compatibility between the prescribed kinematics and the evaluated acceleration contributions |
| External signed exposure | $\mathcal W$ on $S_R$ through the complete cycle | Net polarity-signed wake exposure |
| External raw exposure | $\mathcal W_{\mathrm{abs}}$ on $S_R$ through the complete cycle | Wake strength before signed cancellation |
| Directional response | $\mathbf A_p$ for both probe polarities on $S_R$ | Vector exposure and polarity dependence |
| Angular ledger | Cycle-resolved isotropic and higher angular coefficients | Which external angular channels survive cancellation |
| Anisotropy | Non-isotropic far-field ledger relative to the naive constituent ledger | Whether a scalar cancellation summary is adequate |
| Spatial response gradient | $\nabla_{\mathbf X}\mathbf A_p$ away from source paths and causal-root folds | How differently nearby absolute-coordinate probes respond |
| Temporal variation | $\partial_T\mathcal W$ and $\partial_T\mathbf A_p$ on continuous root branches | Peak rate of change and phase localization of wake features |
| Radial scaling | The same angular and exposure rows evaluated over a declared sequence of enclosing radii $R$ | Whether a claimed far-field regime and its power-law scaling have been reached |
| Symmetry residual | Difference between a measure and its transform under each declared chart symmetry | Which prescribed symmetries survive in the causal-wake field |
| Spectral ledger | Fourier coefficients over $T_{\mathrm{ret}}$ for selected internal and external rows | Harmonic content, sidebands, and phase locking |
| Source-parameter sensitivity | Recomputed measures under declared changes of radius, frequency, phase, orientation, and translation | How dependent the analytical result is on the prescribed coordinates |
| Numerical convergence | Change under tighter root and quadrature tolerances for the same $S$ and $P$ | Whether the analytical result has been evaluated accurately |

Minimum separation is a validity diagnostic, not a claim that architrinos are hard objects. A zero separation may make the $1/r^2$ response singular or expose an undeclared coincidence in the chart. A small separation warns that a reported score may be dominated by a near-singular pair. It should normally be a gate or an annotation, not a reward to maximize.

The term **return residual** is replaced here by **prescribed-period closure residual**. It checks only that the declared path formulas return to the same position, velocity, and phase after $T_{\mathrm{ret}}$. It is often zero by construction and is an integrity check on the chart and selected period, not a stability measure. Root and wake ledgers may also be checked for periodicity, but their endpoint differences remain analytical consistency diagnostics.

Spatial and temporal derivatives must be evaluated branch by branch. At a causal-root birth, death, or fold, the discontinuity or singular behavior is itself the reported event; a derivative must not be fabricated by differencing across it.

Two additional diagnostics are useful but must not be mislabeled as energy. Define the cycle-and-surface external-exposure norm

$$
\mathcal L_{\mathrm{ext}}(R)
=
\frac{1}{T_{\mathrm{ret}}}
\int_{T_0}^{T_0+T_{\mathrm{ret}}}
\int_{S_R}
\|\mathbf A_p(T,\mathbf X)\|^2
\,dA\,dT
$$

and the corresponding uncancelled norm $\mathcal L_{\mathrm{raw}}(R)$ formed by replacing the net vector with the sum of constituent response magnitudes before squaring. Then

$$
\eta_{\mathrm{ext}}(R)
=
\frac{\mathcal L_{\mathrm{ext}}(R)}
{\mathcal L_{\mathrm{raw}}(R)+\varepsilon_L}
$$

is a geometry-response exposure fraction. It measures external cancellation under a declared probe and surface convention. It is analytically computable from a prescribed record and is not the apparent-energy fraction.

### Analytical Claim Boundary

The signed wake $\mathcal W$, unsigned wake $\mathcal W_{\mathrm{abs}}$, virtual-probe response $\mathbf A_p$, angular coefficients, and exposure fraction $\eta_{\mathrm{ext}}$ are the available analytical ledgers. None is an energy quantity. This method therefore does not report total energy, apparent energy, apparent-energy fractions, or stability scores. It also does not include a Noether-sea response. Introducing any such quantity requires a separate definition and cannot be accomplished by relabeling a wake-exposure measure.

### Analytical Evaluation Programs

The measures in this chapter require analytical programs that evaluate the declared formulas for an exact source record. These programs are not assembly-evolution simulations. They hold the prescribed paths fixed and calculate their consequences at the requested absolute-coordinate events.

The analytical program suite should have separable components for:

1. validating and evaluating the source paths, velocities, accelerations, periods, and taxonomy coordinates;
2. enumerating every retained causal root and recording its identity, topology, and $D_t$ margin;
3. evaluating $\mathcal W$, $\mathcal W_{\mathrm{abs}}$, $\chi_{\mathcal W}$, and $\mathbf A_p$ at internal and external probes;
4. reducing the event-level results into the separation, root, mismatch, exposure, angular, spectral, radial-scaling, symmetry, and sensitivity measures defined above; and
5. emitting a result packet keyed by the exact source hash and protocol hash.

Each component must expose numerical tolerances and convergence checks. Where a closed-form, symmetry-protected, static, or other independently known analytical case exists, it should be used as an independent check. Replaying output from the same program establishes reproducibility, not correctness.

Only after these programs can calculate the common measure set should a broad parameter campaign begin. Otherwise a sampling run merely produces many configurations without a controlled basis for comparing them.

### Monte Carlo Configuration-Space Analysis

Let $\boldsymbol\theta$ contain the complete taxonomy coordinates, group-translation speed, phase origin, and any permitted prescribed-history coordinates. A sampling campaign must publish the domain $\Theta$, units, constraints, and sampling measure. There is no coordinate-free meaning to “random braid”; uniform sampling in radius, logarithmic radius, speed, or frequency represents different candidate populations.

For a family/member candidate $M$, define its admissible configuration space by

$$
\Theta_M
=
\left\{
\boldsymbol\theta:
\boldsymbol\theta\text{ satisfies the taxonomy relations and declared analysis gates for }M
\right\}.
$$

A Monte Carlo campaign draws prescribed instantiations $\boldsymbol\theta^{(k)}\in\Theta_M$, builds the exact source record $S(\boldsymbol\theta^{(k)})$, and runs the analytical programs to obtain

$$
\mathbf G^{(k)}
=
\mathbf G\!\left[S(\boldsymbol\theta^{(k)});P\right].
$$

The common protocol $P$ must remain fixed across the compared sample. A changed source definition, measure, probe set, history depth, root policy, boundary, or normalization requires an impact review and invalidates every affected score. The campaign must recompute those scores before they re-enter the comparison population.

The analytical campaign has three stages:

1. **Monte Carlo coverage.** Draw a reproducible, seeded sample from each declared measure over $\Theta_M$. Use stratification so narrow coordinate regions are not lost by chance.
2. **Directed refinement.** Add targeted samples around strong external cancellation, admissible root margins, candidate optima, and boundaries where root topology or prescribed-period closure changes. Include deliberately adverse directions so the method does not optimize only one favorable projection.
3. **Robustness and sensitivity analysis.** Resample neighborhoods around leading instantiations, vary one declared coordinate at a time where useful, and report whether the apparent advantage survives small changes in coordinates, sampling measure, and numerical resolution.

Every result row must include the family/member identifier, full parameter vector, source grade, sampling measure, seed or directed-selection rule, root status, numerical resolution, and metric uncertainty.

The campaign output should include the distribution of every objective and gate, parameter-to-measure sensitivity, correlations that may reveal redundant coordinates, the non-dominated set under $\mathbf G_{\mathrm{an}}$, and the location and width of robust favorable regions. A single best sampled point is not enough: the central question is whether a candidate has a reproducible favorable region in configuration space or only a narrowly tuned instantiation.

### Candidate Grading

The prescribed-record analytical grade is fail-closed and occurs in this order:

1. **Record validity:** complete provenance, finite values, legal coordinates, reproducible paths, and a current score for the exact source hash.
2. **Geometric admissibility:** no undeclared collision or coincidence, a complete declared period, and converged geometric extraction.
3. **Causal admissibility:** complete retained roots, declared self-hit treatment, resolved fold events, and converged root sums.
4. **Analytical wake comparison:** signed and raw exposure, cancellation, anisotropy, spectra, peak response, and source-parameter sensitivity under one common protocol.

A prescribed chart receives only an analytical prescribed-record grade. Stability and energy are outside the method and outside its score.

#### Candidate Cohort Registry

The comparison cohort spans every currently defined family/member class in the taxonomy. Each column below now names one complete prescribed source record $S$. The source-record hash identifies that exact record; it is not an analytical score. Every analytical cell remains `Pending` until the candidate has been evaluated under the common protocol declared for the completed cohort.

The four exact `B1` prescribed instantiations retain compatibility source identifiers while using taxonomy-first display names. These candidate names describe their taxonomy coordinates; they do not create additional taxonomy members. All four use one common midpoint, the common axis $\hat{\mathbf n}_B=(0,0,1)$, group translation speed $s_{\mathrm{grp}}=0$, radii

$$
(R_1,R_2,R_3)=(0.22,0.32,0.44),
$$

common frequency $f=0.25$, and phases $(\phi_1,\phi_2,\phi_3)=(0,2\pi/3,4\pi/3)$. Their distinguishing coordinates are:

| Candidate name | $(h_1,h_2,h_3)$ | $(\rho_1,\rho_2,\rho_3)$ | Coordinate status |
| --- | --- | --- | --- |
| `B1 — interior reference` | $(0.075244432,0.205692035,0.398775426)$ | $(0.206732377,0.245134222,0.185952035)$ | Interior for all three binaries |
| `B1 — high-axial interior` | $(0.206732377,0.315138481,0.438325667)$ | $(0.075244432,0.055567417,0.038348527)$ | Interior for all three binaries, with $h_a/R_a$ near the axial boundary |
| `B1 — all-equatorial boundary` | $(0,0,0)$ | $(0.22,0.32,0.44)$ | $h_a=0$ for all three binaries |
| `B1 — all-axial boundary` | $(0.22,0.32,0.44)$ | $(0,0,0)$ | $\rho_a=0$ for all three binaries |

The derived $h_a$ and $\rho_a$ values are shown to nine decimal places for identification; they are not analytical results. The complete source record $S$ remains authoritative for exact coordinates, endpoint identities, and polarities. Every scored row also depends on one common analysis protocol $P$.

#### Candidate Comparison Tables

The comparison tables use candidates as columns and metrics as rows. The family split keeps the tables readable; every table uses the same metric definitions and protocol. `Pending` means that the candidate has not yet been evaluated under the shared source-and-protocol declaration printed with the table. `NA` is reserved for a measure whose definition does not apply; it must not be used merely because a value has not been computed.

##### Family-A Candidates

The A1/A3 taxonomy correction changes five A1 source specifications and introduces five A3 specifications. The former A1 source-record hashes are therefore marked `Superseded`; no replacement analytical source records or analytical campaign packets are emitted by this display-candidate review. The source-specification SHA-256 row binds the current prescribed geometry while every analytical result remains `Pending`.

| Metric or gate | `A1` | `A1.1` | `A1.2` | `A1.3` | `A1.4` | `A2` | `A3` | `A3.1` | `A3.2` | `A3.3` | `A3.4` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Source-record hash | Superseded | Superseded | Superseded | Superseded | Superseded | `96b5d0cf9161fb542818d3a1a6b2cbe819edd1603ef7bc239e6991813dfe7cb4` | Pending | Pending | Pending | Pending | Pending |
| Source-specification SHA-256 | `91231ecbf574db7bee3bb67835943035b8fa37b0d30a694806238b801de2e329` | `77692fb096aa3c5bad9e6cb03e8e04effb7c2bfacccf7006f3442c3399fcaa5f` | `0871049c99cb9dbcce62c6594c98d8fa578af6716f5e95700c909a1fefdb5054` | `e32f404561078edfc25165696074be6112c7252202047d0e5a375b330d470024` | `ac990320d843a1f5d1270b327d1427be24c59f0db85aecabea742b94206d53ff` | `517aa879f6e6f806d6bb79b4ced625777e50f5ca0063192721f0535ecbb05d3c` | `c054979b3a250c0a12670923a67e4a25163db17ff104fb665649d12371370d92` | `ebc3294e0acb825db359227fe3a6dcdd587cd95166899abc02299ab920054a33` | `c03c9c40e0786b177a8c7bdd21d9e0b8f67cea262256e89b4f3c411f95ac20d4` | `951b305f626ca30d629cb968fdc60f81408d519b7dd8828493779f3c6b46cf4e` | `1c280732216ddca081663626110880f6d5330234f0fafd23174d6d9f09fde173` |
| Common protocol hash | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Prescribed-period closure | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Minimum separation $d_{\min}$ | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Root-transversality margin $\min|D_t|$ | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Root-topology completeness | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Numerical convergence | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| External-exposure fraction $\eta_{\mathrm{ext}}(R)$ | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Anisotropy $\epsilon_{\mathrm{aniso}}(R)$ | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Peak external response $A_{\mathrm{ext,peak}}(R)$ | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Peak signed-cancellation ratio $\chi_{\mathcal W,\mathrm{peak}}(R)$ | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Source-parameter sensitivity $S_{\boldsymbol\theta}$ | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Dominance status | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |

##### Family-B Candidates

| Metric or gate | `B1 — interior reference` | `B1 — high-axial interior` | `B1 — all-equatorial boundary` | `B1 — all-axial boundary` |
| --- | --- | --- | --- | --- |
| Source-record hash | `3ad1e879d3364db0d332bdc59cac042c3c5bc552365a2e227f2392339ab2506b` | `31f8d06f954c9c9fe64c8a9d2316d479dad49b8eb2437bba844a718b03202cd0` | `c2079804643afa4254a7f037ee479f804af0a2c88f4b2680fe9c69c836f7595b` | `a61aba26f4258e3b5a80595da1bb7f84e0c8790da0b43d732e08ee3f7e320ed6` |
| Common protocol hash | Pending | Pending | Pending | Pending |
| Prescribed-period closure | Pending | Pending | Pending | Pending |
| Minimum separation $d_{\min}$ | Pending | Pending | Pending | Pending |
| Root-transversality margin $\min|D_t|$ | Pending | Pending | Pending | Pending |
| Root-topology completeness | Pending | Pending | Pending | Pending |
| Numerical convergence | Pending | Pending | Pending | Pending |
| External-exposure fraction $\eta_{\mathrm{ext}}(R)$ | Pending | Pending | Pending | Pending |
| Anisotropy $\epsilon_{\mathrm{aniso}}(R)$ | Pending | Pending | Pending | Pending |
| Peak external response $A_{\mathrm{ext,peak}}(R)$ | Pending | Pending | Pending | Pending |
| Peak signed-cancellation ratio $\chi_{\mathcal W,\mathrm{peak}}(R)$ | Pending | Pending | Pending | Pending |
| Source-parameter sensitivity $S_{\boldsymbol\theta}$ | Pending | Pending | Pending | Pending |
| Dominance status | Pending | Pending | Pending | Pending |

##### Family-C Candidates

| Metric or gate | `C1` | `C2` |
| --- | --- | --- |
| Source-record hash | `65e8bd4c68a36fb59ff67fab4e8bef78aba640a66f796752e49276235c7fdb7a` | `61bcdb5871affe8aa76a12e1ac0765f81eaf67342fa164eab33b28a8878c29d7` |
| Common protocol hash | Pending | Pending |
| Prescribed-period closure | Pending | Pending |
| Minimum separation $d_{\min}$ | Pending | Pending |
| Root-transversality margin $\min|D_t|$ | Pending | Pending |
| Root-topology completeness | Pending | Pending |
| Numerical convergence | Pending | Pending |
| External-exposure fraction $\eta_{\mathrm{ext}}(R)$ | Pending | Pending |
| Anisotropy $\epsilon_{\mathrm{aniso}}(R)$ | Pending | Pending |
| Peak external response $A_{\mathrm{ext,peak}}(R)$ | Pending | Pending |
| Peak signed-cancellation ratio $\chi_{\mathcal W,\mathrm{peak}}(R)$ | Pending | Pending |
| Source-parameter sensitivity $S_{\boldsymbol\theta}$ | Pending | Pending |
| Dominance status | Pending | Pending |

Each published table must state the enclosing radius or radius sequence, surface and time reductions, probe polarity, normalization, tolerance, and uncertainty attached to every scalar row. A cell may link to a fuller ledger when a scalar would hide root transitions, angular structure, or phase dependence.

Among prescribed candidates evaluated under the same protocol, report an analytical objective vector rather than hiding choices inside one number. One suitable starting vector is

$$
\mathbf G_{\mathrm{an}}
=
\left(
\eta_{\mathrm{ext}},
\epsilon_{\mathrm{aniso}},
A_{\mathrm{ext,peak}},
\chi_{\mathcal W,\mathrm{peak}},
S_{\boldsymbol\theta}
\right),
$$

where $S_{\boldsymbol\theta}$ is the declared sensitivity of the wake measures to source-coordinate changes. Prescribed-period closure, minimum separation, and the root-transversality margin are validity gates or annotations rather than performance rewards.

One candidate dominates another only when it is no worse on every declared objective and better on at least one. A single weighted score is permitted only after the weights and normalization are fixed before inspecting the result. “Strongest analytical wake cancellation” is a legitimate comparison question. “Lowest apparent energy” is not a quantity defined by this methodology.

Separate grades are required for a family/member chart and for a particular instantiation. A strong instantiation supports existence within a sampled region; it does not establish that the family as a whole has the same performance.

### Borg Analysis Surface

Borg should expose this method as a record-derived analysis surface. A user should be able to place fixed or moving probes at arbitrary $(T,\mathbf X)$ coordinates and display:

- $\mathcal W$, $\mathcal W_{\mathrm{abs}}$, and $\chi_{\mathcal W}$;
- positive- and negative-polarity virtual-probe responses;
- individual transmitter contributions and their vector sum;
- root count, root identity, $D_t$, and fold events;
- time graphs over the full return cycle;
- spatial slices, enclosing-surface maps, spectra, and angular coefficients; and
- source-parameter sensitivity, invalidated-score status, and the exact source and protocol hashes.

The graph must remain synchronized with animation time and preserve source-record provenance. Borg may also present a teaching sequence that highlights selected binaries, axes, wakes, envelopes, roots, or probes while explanatory text appears on the canvas. Teaching cues are annotations on the record; they are not evidence generated by the record.

Energy and stability controls should not appear as outputs of this analytical surface because the method does not define them.

### Minimum Publication Packet

A publishable candidate analysis contains:

1. the complete source record and taxonomy row;
2. the superimposed causal-wake formula and all normalization choices;
3. the internal receiver-wake ledger through one complete return cycle;
4. the probe geometry and raw time-dependent curves;
5. prescribed-period closure, root, separation, cancellation, anisotropy, spectral, and source-sensitivity metrics;
6. an explicit analytical claim boundary that excludes energy and stability conclusions;
7. the Monte Carlo, directed-refinement, and robustness sampling declarations;
8. the gate result and multi-objective comparison vector; and
9. the exact observation that would falsify each promoted claim.

This packet makes analytical candidate comparison reproducible. A prescribed braid remains a prescribed geometry with analytically evaluated causal-wake properties; the method makes no claim about stability or physical retention.

## Braid Envelope Geometry

This chapter is the canonical home for the geometric footprint of a Noether braid assembly: its dynamic exclusion envelope, the envelope forms of the named families, the canonical geometry variables, and the assembly-level deformation channels. It faces the Noether sea and effective-spacetime consumers because the geometry of many such envelopes is the local material out of which Noether sea density, strain, and delay variables are coarse-grained. The prescribed family coordinates belong to [Braid Taxonomy](../../../../markdown/aaa/noether-braid/braid-taxonomy.md), with Family A developed in [Braid Family A](../../../../markdown/aaa/noether-braid/braid-family-a.md), Family B in [Braid Family B](../../../../markdown/aaa/noether-braid/braid-family-b.md), and Family C in [Braid Family C](../../../../markdown/aaa/noether-braid/braid-family-c.md); delayed retention and deformation mechanisms belong to their mathematical and member-specific owners.

A Noether braid is not a static object. It is a dynamic system of six architrinos whose high-frequency paths sweep out a persistent volume of intense wake activity. That swept volume is the assembly's effective exclusion envelope.

In plain terms, this chapter explains what a retained braid "looks like" to neighboring assemblies and to the Noether sea. The envelope is not a hard surface. It is the region where the assembly's locked wake activity is strong enough that other histories are deflected, excluded, phase-disrupted, or forced to retune.

That is why this geometry matters downstream. Pressure, packing, clock/ruler response, effective metric behavior, and Noether sea density are all coarse readings of many such envelopes and their deformations. The page therefore keeps the geometric export rows separate from the proof that the branch itself is retained.

### Document Role

This chapter is the envelope and export-interface chapter for braid geometry. It owns:

- the dynamic exclusion-envelope interpretation of a braid assembly,
- the envelope forms associated with the member coordinates — B1's common-axis envelope and the Family-A oblate spheroidal envelope,
- the role of the boundary layer in setting the leading envelope surface,
- and assembly-level deformation of the envelope under external effective fields, nearby wakes, and Noether sea conditions.

This chapter does not own:

- primitive architrino ontology; see [Architrino](../../../../markdown/aaa/foundations/architrino.md),
- the prescribed family scaffolds; see [Braid Taxonomy](../../../../markdown/aaa/noether-braid/braid-taxonomy.md), [Braid Family A](../../../../markdown/aaa/noether-braid/braid-family-a.md), and [Braid Family B](../../../../markdown/aaa/noether-braid/braid-family-b.md),
- exact delay-root dynamics; see [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md),
- observer clocks and rulers; see [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md),
- or metric reconstruction; see [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md).

The role boundary is practical: the family chapters and the retained-branch program decide whether a branch is retained; this chapter describes the envelope rows and deformation variables that a retained branch can emit into Noether sea, packing, clock/ruler, and effective-metric consumers.

### Dynamic Exclusion Envelope

The six architrinos within a Noether braid are in rapid orbital motion. The superposition of their fluctuating causal-wake contributions creates a region that is difficult for other architrinos or assemblies to penetrate without being strongly accelerated, deflected, or phase-disrupted.

This region acts as a dynamic **exclusion envelope**. It is not a solid object with a hard material surface. It is a coherent region of intense wake activity defined by the collective path history of the constituent architrinos.

Another Noether braid approaching this region does not encounter a classical wall. It encounters a rapidly varying causal-wake environment whose accelerations and phase constraints can prevent stable transit through the braid volume.

#### Exclusion Envelope As Pressure Source

The dynamic exclusion envelope also supplies the native route from assembly geometry to pressure. Pressure is not introduced as a separate primitive substance. It is an effective stress readout that appears when many stable assemblies cannot be moved closer without increasing wake disruption, branch deformation, or loss of stable closure.

For a compact region $\Omega$, the first packing-pressure readout is the trace of the exclusion-stress tensor already carried by the packing channel:

$$
P_{\mathrm{pack}}(\Omega,T)
=
\frac{1}{3|\Omega|}
\int_{\Omega}
\operatorname{tr} S_{\mathrm{excl}}(\mathbf X,T)\,d^3X
$$

Here $S_{\mathrm{excl}}$ is the coarse-grained tensor assembled from the local entries $\mathcal{S}_{j,\mathrm{excl}}^{ab}$ in the packing projector below. The factor $1/3$ extracts the isotropic pressure component in three spatial dimensions; anisotropic residuals remain in the stress tensor and must not be hidden when the local packing is directionally biased.

This is the Noether braid analogue of the familiar lesson from electron degeneracy: excluded state volume can become macroscopic pressure. The analogy is limited but useful. In ordinary electron matter, the observer-level pressure law also depends on the recovered fermionic exchange sign and momentum-state filling. In the Noether braid substrate, the corresponding pressure channel must be derived from the member-specific exclusion envelope, causal-wake disruption, and the same retained branch ledger that later recovers the fermionic exchange rule. A B1 consumer projects its envelope from the common-axis paths, while an A1 consumer uses its near-spherical-to-oblate response. Exclusion geometry can explain why closer packing becomes dynamically costly; spin-statistics closure is still required before the full electron pressure law has been recovered.

### Assembly-Noether Sea Interface Diagnostic

The dynamic exclusion envelope supplies a spatial approximation to a deeper ledger boundary. At the exact level, an assembly is defined by the architrinos, closure labels, and wake-exchange records phase-locked to that assembly. The surrounding Noether sea is the neighboring neutral braid population and its ambient wake record after the assembly ledger has been excluded.

For an assembly $a$ and a declared response channel $X$, let $\mathcal{W}_{a,X}^{\mathrm{locked}}(\mathbf X,T)$ denote the local coarse-grained wake/exclusion contribution tied to the assembly's accepted closure label, and let $\mathcal{W}_{\mathrm{sea},X}^{\mathrm{ambient}}(\mathbf X,T)$ denote the ambient Noether sea contribution in the same region. A practical interface diagnostic is

$$
D_{a,X}(\mathbf X,T)
=
\frac{
\left\|\mathcal{W}_{a,X}^{\mathrm{locked}}(\mathbf X,T)\right\|
}{
\left\|\mathcal{W}_{a,X}^{\mathrm{locked}}(\mathbf X,T)\right\|
+
\left\|\mathcal{W}_{\mathrm{sea},X}^{\mathrm{ambient}}(\mathbf X,T)\right\|
}
$$

The first computable form comes from the same causal-root flux used in the Master Equation. Fix a coarse-graining kernel $K_\ell$, a channel $X$ being tested, and a sample event $(\mathbf X,T)$. For a transmitter constituent $j$ at emission time $T_t$, define

$$
r_{\mathbf Xj}(T;T_t)
=
\left\|\mathbf X-\mathbf X_j(T_t)\right\|,
\qquad
g_{\mathbf Xj}(T;T_t)
=
r_{\mathbf Xj}(T;T_t)-c_f(T-T_t)
$$

$$
J_{\mathbf Xj}(T;T_t)
=
1-
\frac{\mathbf V_j(T_t)\cdot\hat{\mathbf{r}}_{\mathbf Xj}(T;T_t)}{c_f},
\qquad
\mathcal{C}_{\mathbf Xj}(T)
=
\{T_t<T:g_{\mathbf Xj}(T;T_t)=0\}
$$

Let $\mathcal{I}_a(T)$ be the architrino constituents and bound wake records belonging to assembly $a$, and let $\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,T)$ be the ambient Noether sea contributors in the same coarse window after excluding $\mathcal{I}_a(T)$. Let $w_{j,a}^{\mathrm{lock}}(T_t;T)$ retain the branches phase-locked to the assembly label, let $w_j^{\mathrm{sea}}(T_t;T)$ retain the ambient branches, and let $\alpha_{j,X}(\mathbf X,T;T_t)\ge 0$ be the channel intensity inherited from branch-ledger exposure in channel $X$.

The receiver-side factor needs a declared probe state because the sample event $(\mathbf X,T)$ is not itself an architrino worldline. It is retained for root playback and path-rate diagnostics, not as part of the acceleration weight. For clock, packing, and stationary interface-level scans, use a void-stationary probe, $\mathbf V_{\mathrm{probe},X}(\mathbf X,T)=\mathbf 0$, so $D_{r,\mathbf Xj}^{(X)}=c_f$. For penetration along a declared test path, use $\mathbf V_{\mathrm{probe},\mathrm{penetration}}=v_{\mathrm{path}}\hat{\mathbf{u}}$ at the sample event. A moving reaction-corridor scan must declare its probe velocity before this diagnostic is evaluated. With that channel probe fixed, define

$$
D_{t,\mathbf Xj}(T;T_t)
\equiv
c_f-\mathbf V_j(T_t)\cdot\hat{\mathbf{r}}_{\mathbf Xj}(T;T_t),
\qquad
D_{r,\mathbf Xj}^{(X)}(T;T_t)
\equiv
c_f-\mathbf V_{\mathrm{probe},X}(\mathbf X,T)\cdot\hat{\mathbf{r}}_{\mathbf Xj}(T;T_t)
$$

and

$$
W_{\mathbf Xj}^{\mathrm{acc},X}(T;T_t)
\equiv
\frac{c_f}{|D_{t,\mathbf Xj}(T;T_t)|}
$$

as the transmitter-side acceleration weight on the same root record. Then the simple-root diagnostic is

$$
\mathcal{W}_{a,X}^{\mathrm{locked}}(\mathbf X,T;\ell)
=
K_\ell *
\sum_{j\in\mathcal{I}_a(T)}
\sum_{T_t\in\mathcal{C}_{\mathbf Xj}(T)}
w_{j,a}^{\mathrm{lock}}(T_t;T)
\frac{\alpha_{j,X}(\mathbf X,T;T_t)W_{\mathbf Xj}^{\mathrm{acc},X}(T;T_t)}
{r_{\mathbf Xj}^2(T;T_t)}
$$

and

$$
\mathcal{W}_{\mathrm{sea},X}^{\mathrm{ambient}}(\mathbf X,T;\ell)
=
K_\ell *
\sum_{j\in\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,T)}
\sum_{T_t\in\mathcal{C}_{\mathbf Xj}(T)}
w_j^{\mathrm{sea}}(T_t;T)
\frac{\alpha_{j,X}(\mathbf X,T;T_t)W_{\mathbf Xj}^{\mathrm{acc},X}(T;T_t)}
{r_{\mathbf Xj}^2(T;T_t)}
$$

These coefficients are not fit amplitudes. For each accepted causal root, define the root-selected branch record

$$
\mathcal{B}_{\mathbf Xj}^{(T_t)}
=
\left(
j,\,
T_t,\,
\hat{\mathbf{r}}_{\mathbf Xj},\,
r_{\mathbf Xj},\,
J_{\mathbf Xj},\,
q_j,\,
\mathcal{L}_{j}^{\mathrm{wake}},\,
\Lambda_j
\right)_{(\mathbf X,T;T_t)}
$$

Here $\mathcal{L}_{j}^{\mathrm{wake}}$ is the wake-history ledger carried by the transmitter branch and $\Lambda_j$ is the closure label or neutral braid label available on that branch. The locked weight is the assembly projector

$$
w_{j,a}^{\mathrm{lock}}(T_t;T)
=
\mathbf{1}_{j\in\mathcal{I}_a(T)}
\,
\zeta_a
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
$$

where $\zeta_a\in[0,1]$ is one for an accepted phase-locked branch of $\Lambda_a(T)$ and zero for a rejected branch in the exact ledger limit. A regularized branch chart may replace this sharp value by

$$
\zeta_a^{(\eta_\Lambda)}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
=
\exp
\!\left[
-
\frac{
d_{\Lambda_a}^2
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)}
{\eta_\Lambda^2}
\right]
$$

where $d_{\Lambda_a}$ measures closure-label, phase, and branch-provenance mismatch against the accepted assembly ledger. The ambient weight is the complement projector

$$
w_j^{\mathrm{sea}}(T_t;T)
=
\mathbf{1}_{j\in\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,T)}
\,
\zeta_{\mathrm{sea}}^{(\ell)}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
$$

where $\zeta_{\mathrm{sea}}^{(\ell)}\in[0,1]$ retains branches belonging to the neutral braid equilibrium record in the coarse window after all resolved assembly ledgers have been removed. Thus a branch cannot contribute to the locked numerator and the ambient denominator by relabeling alone; it must pass the corresponding ledger projector.

The first symbolic form of this ambient projector comes from ledger complement plus local cadence smoothing. Let $\mathfrak A_{\mathrm{res}}(\Omega_\ell,T)$ be the resolved assembly ledgers inside the same coarse window, including matter assemblies and any resolved corridor ledger that has not been declared ambient Noether sea. Define the complement factor

$$
\chi_{\mathrm{comp}}^{(\ell)}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
=
\mathbf{1}_{j\in\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,T)}
\prod_{a'\in\mathfrak A_{\mathrm{res}}(\Omega_\ell,T)}
\left[
1-
\zeta_{a'}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
\right]
$$

For any neutral braid branch quantity $f_k(T)$, write the ambient window average after resolved assembly ledgers have been removed as

$$
\left\langle f\right\rangle_{\mathrm{sea},\ell}(\mathbf X,T)
=
\frac{
\sum_{k\in\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,T)}
K_\ell(\mathbf X-\mathbf{X}_k(T))f_k(T)
}{
\sum_{k\in\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,T)}
K_\ell(\mathbf X-\mathbf{X}_k(T))
}
$$

Let $\nu_k$ be the cadence variable of neutral braid $k$, let $\bar\nu_{\mathrm{sea}}^{(\ell)}=\left\langle\nu\right\rangle_{\mathrm{sea},\ell}$, and let $\sigma_{\nu,\ell}^2=\left\langle(\nu-\bar\nu_{\mathrm{sea}}^{(\ell)})^2\right\rangle_{\mathrm{sea},\ell}$. The cadence residual of the candidate branch is

$$
\Delta_{\mathrm{cad}}^{(\ell)}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
=
\frac{
\nu_j(T_t)-\bar\nu_{\mathrm{sea}}^{(\ell)}(\mathbf X,T)
}{
\sqrt{\sigma_{\nu,\ell}^2+\epsilon_\nu^2}
}
$$

Let $\mathcal N_{\ell}^{\setminus\mathrm{res}}$ be the neutral-pairing residual and $\mathbf P_{\ell}^{\setminus\mathrm{res}}$ the orientation/polarization residual of the same window after resolved assembly ledgers have been removed. The window-balance residual is

$$
\left(\Delta_{\mathrm{bal}}^{(\ell)}\right)^2
=
\frac{
\left\|\mathcal N_{\ell}^{\setminus\mathrm{res}}\right\|^2
}{
\epsilon_N^2
}
+
\frac{
\left\|\mathbf P_{\ell}^{\setminus\mathrm{res}}\right\|^2
}{
\epsilon_P^2
}
$$

The ambient acceptance is then

$$
\zeta_{\mathrm{sea}}^{(\ell)}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
=
\chi_{\mathrm{comp}}^{(\ell)}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
\exp
\!\left[
-
\frac{1}{2}
\left(
\left(\Delta_{\mathrm{cad}}^{(\ell)}\right)^2
+
\left(\Delta_{\mathrm{bal}}^{(\ell)}\right)^2
\right)
\right]
$$

This form rejects assembly-locked branches because any resolved locked projector $\zeta_{a'}=1$ drives the complement factor to zero in the exact ledger limit. It retains ambient Noether sea branches in the same coarse window when they remain outside all resolved assembly ledgers and agree with the locally smoothed neutral braid cadence and balance record. The tolerances $\epsilon_\nu$, $\epsilon_N$, and $\epsilon_P$ are resolution tolerances for the chosen window and ledger chart; they are not channel-specific fit parameters. Channel differences still enter through $\Pi_X$ and $Q_X$, while the assembly/complement split and neutral-equilibrium projector remain common to the diagnostic.

The channel intensity is the channel exposure of the same root-selected branch record:

$$
\mathcal{E}_{X}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
=
Q_X
\!\left[
\Pi_X
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right],
\qquad
\alpha_{j,X}(\mathbf X,T;T_t)
=
\left\|
\mathcal{E}_{X}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
\right\|_X
$$

The projection $\Pi_X$ selects the channel being tested and $Q_X$ removes only equivalences that preserve that channel's benchmark. The intensity $\alpha_{j,X}$ is dimensionless because the channel norms are tolerance ratios. The dimensional coupling $\kappa$ and polarity factors enter only through retained channel entries that already require them, such as the signed acceleration used by penetration. Clock-coupling keeps cadence and phase entries that perturb the clock functional. Reaction-corridor calculations keep the oriented exchange, line-defect, color, weak, or provenance entries declared by that corridor. Packing keeps scalar or tensor exclusion-stress magnitude after acceleration signs are discarded. Penetration keeps the local acceleration and phase-disruption entries along the tested path. These channels may use different $\Pi_X$, but they must not change the causal-root kernel, the assembly/complement split, or the transmitter branch record.

The first concrete projector family can be stated as retained entries of $\mathcal{B}_{\mathbf Xj}^{(T_t)}$ plus derived local entries computed from the same branch. For the clock channel,

$$
\Pi_{\mathrm{clock}}
\mathcal{B}_{\mathbf Xj}^{(T_t)}
=
\left(
\delta\theta_{\mathrm{clk}}^{(j)},\,
\delta\omega_{\mathrm{clk}}^{(j)},\,
\delta\chi_{\mathrm{sea}}^{(\ell,j)},\,
J_{\mathbf Xj},\,
\Lambda_j,\,
\mathcal{L}_{j}^{\mathrm{wake}}\big|_{\mathrm{phase}}
\right)
$$

where $\delta\theta_{\mathrm{clk}}^{(j)}$ and $\delta\omega_{\mathrm{clk}}^{(j)}$ are the branch-induced phase and cadence increments of the declared clock functional, and $\delta\chi_{\mathrm{sea}}^{(\ell,j)}$ is the branch contribution to the coarse Noether sea delay factor. The quotient $Q_{\mathrm{clock}}$ may remove phase-origin choices and hidden constituent relabelings only when $\omega_{\mathrm{clk}}/\omega_0$ is unchanged.

For a reaction corridor,

$$
\Pi_{\mathrm{corridor}}
\mathcal{B}_{\mathbf Xj}^{(T_t)}
=
\left(
\hat{\mathbf{r}}_{\mathbf Xj},\,
q_j,\,
\mathcal{L}_{j}^{\mathrm{wake}}\big|_{\mathrm{oriented}},\,
\mathcal{L}_{j}^{\mathrm{corr}},\,
\mathcal{P}_{j}^{\mathrm{prov}},\,
\Theta_j^{\mathrm{strain}}
\right)
$$

where $\mathcal{L}_{j}^{\mathrm{corr}}$ is the declared strong, weak, color, electromagnetic, or material corridor ledger, $\mathcal{P}_{j}^{\mathrm{prov}}$ is the provenance record of participating architrinos and energy entries, and $\Theta_j^{\mathrm{strain}}$ is the line-defect or medium-strain entry when the corridor calculation requires one. The quotient $Q_{\mathrm{corridor}}$ may remove only corridor-basis relabelings that preserve the recovered reaction channel, provenance ledger, and line-defect energy.

For packing,

$$
\Pi_{\mathrm{packing}}
\mathcal{B}_{\mathbf Xj}^{(T_t)}
=
\left(
\left\|\mathcal{L}_{j}^{\mathrm{wake}}\right\|_{\mathrm{excl}},\,
\mathcal{S}_{j,\mathrm{excl}}^{ab},\,
R_{\parallel,j},\,
R_{\perp,j},\,
\lambda_j,\,
\xi_j
\right)
$$

where $\mathcal{S}_{j,\mathrm{excl}}^{ab}$ is the local exclusion-stress entry and $(R_{\parallel,j},R_{\perp,j},\lambda_j,\xi_j)$ are the envelope entries exposed by the branch. Packing deliberately discards attraction/repulsion sign after the exclusion magnitude and stress tensor are retained, because the benchmark is stable adjacency rather than signed acceleration along one path.

For penetration along a declared test path with tangent $\hat{\mathbf{u}}$ at $\mathbf X$,

$$
\Pi_{\mathrm{penetration}}
\mathcal{B}_{\mathbf Xj}^{(T_t)}
=
\left(
\mathbf{a}_{\mathbf X\leftarrow j}(T;T_t),\,
\mathbf{a}_{\mathbf X\leftarrow j}(T;T_t)\cdot\hat{\mathbf{u}},\,
\Delta\phi_{\mathrm{disrupt}}^{(j)},\,
r_{\mathbf Xj},\,
J_{\mathbf Xj},\,
\Lambda_j
\right)
$$

where $\mathbf{a}_{\mathbf X\leftarrow j}$ is the signed branch acceleration obtained from the same causal-root law and $\Delta\phi_{\mathrm{disrupt}}^{(j)}$ is the induced phase-disruption increment on the tested transit branch. Unlike packing, penetration keeps the signed line-of-action entry because the benchmark asks whether the transit path remains dynamically stable.

The first channel norms are dimensionless stability diagnostics on these retained records. Their denominator scales are declared resolution or benchmark tolerances for the channel chart; they are not per-observable fit parameters. For clock coupling,

$$
\left\|
\mathcal E_{\mathrm{clock}}
\right\|_{\mathrm{clock}}^2
=
\frac{\left(\delta\omega_{\mathrm{clk}}/\omega_0\right)^2}{\epsilon_\omega^2}
+
\frac{\operatorname{dist}_{S^1}^2(\delta\theta_{\mathrm{clk}},0)}{\epsilon_\theta^2}
+
\frac{\left(\delta\chi_{\mathrm{sea}}^{(\ell,j)}/\chi_{\mathrm{sea}}^{(\ell)}\right)^2}{\epsilon_\chi^2}
+
\frac{\left\|
\mathcal{L}_{j}^{\mathrm{wake}}\big|_{\mathrm{phase}}
\right\|_{\mathrm{phase}}^2}{\epsilon_{\mathrm{phase}}^2}
$$

For a declared reaction corridor with oriented corridor record $\hat{\mathbf c}_X$,

$$
\left\|
\mathcal E_{\mathrm{corridor}}
\right\|_{\mathrm{corridor}}^2
=
\frac{1-\hat{\mathbf r}_{\mathbf Xj}\cdot\hat{\mathbf c}_X}{\epsilon_{\mathrm{dir}}^2}
+
\frac{\left\|
\mathcal{L}_{j}^{\mathrm{wake}}\big|_{\mathrm{oriented}}
\right\|_{\mathrm{oriented}}^2}{\epsilon_{\mathrm{or}}^2}
+
\frac{\left\|
\mathcal{L}_{j}^{\mathrm{corr}}
\right\|_{\mathrm{corr}}^2}{\epsilon_{\mathrm{corr}}^2}
+
\frac{d_{\mathrm{prov}}^2(\mathcal P_j^{\mathrm{prov}},\mathcal P_X^{\mathrm{prov}})}{\epsilon_{\mathrm{prov}}^2}
+
\frac{\left\|\Theta_j^{\mathrm{strain}}\right\|^2}{\epsilon_{\Theta}^2}
$$

For packing, signs of attraction and repulsion have already been quotiented out, but exclusion magnitude and shape remain:

$$
\left\|
\mathcal E_{\mathrm{packing}}
\right\|_{\mathrm{packing}}^2
=
\frac{
\left\|
\mathcal{L}_{j}^{\mathrm{wake}}
\right\|_{\mathrm{excl}}^2
}{\epsilon_{\mathrm{excl}}^2}
+
\frac{
\left\|
\mathcal{S}_{j,\mathrm{excl}}^{ab}
\right\|_{S}^2
}{\epsilon_S^2}
+
\frac{\left(\Delta\ln R_{\parallel,j}\right)^2}{\epsilon_{\parallel}^2}
+
\frac{\left(\Delta\ln R_{\perp,j}\right)^2}{\epsilon_{\perp}^2}
+
\frac{\left(\Delta\ln\lambda_j\right)^2}{\epsilon_\lambda^2}
+
\frac{\left(\Delta\ln\xi_j\right)^2}{\epsilon_\xi^2}
$$

Here each $\Delta\ln$ term is measured relative to the declared same-member branch reference for the channel: the retained rest branch of the member under test for clock/ruler calibration, the candidate neighboring braid for packing, or the pre-entry path branch for penetration. A weak homogeneous A1 record is one possible A1 calibration branch; it is not the reference for a B1 calculation.

For penetration along $\hat{\mathbf u}$, decompose the signed branch acceleration into tangent and transverse parts,

$$
a_{\parallel,j}
=
\mathbf a_{\mathbf X\leftarrow j}\cdot\hat{\mathbf u},
\qquad
\mathbf a_{\perp,j}
=
\mathbf a_{\mathbf X\leftarrow j}
-
a_{\parallel,j}\hat{\mathbf u}
$$

The dominance norm is

$$
\left\|
\mathcal E_{\mathrm{penetration}}
\right\|_{\mathrm{penetration}}^2
=
\frac{a_{\parallel,j}^2}{a_{\parallel,\mathrm{tol}}^2}
+
\frac{\left\|\mathbf a_{\perp,j}\right\|^2}{a_{\perp,\mathrm{tol}}^2}
+
\frac{\operatorname{dist}_{S^1}^2(\Delta\phi_{\mathrm{disrupt}}^{(j)},0)}{\epsilon_{\mathrm{disrupt}}^2}
+
\frac{\left(\Delta\ln r_{\mathbf Xj}\right)^2}{\epsilon_r^2}
+
\frac{\left(\Delta\ln|J_{\mathbf Xj}|\right)^2}{\epsilon_J^2}
$$

The signed entries in the penetration record remain available before the norm is taken, so a stabilizing tangent push and a destabilizing tangent push are not treated as the same path-history branch. The scalar norm is used only after the sign-sensitive admissibility test has decided which branch contributes to the penetration benchmark.

The tolerance scales must be inherited from declared ledger comparisons. Let $\mathcal O_X[\mathcal B]$ be the channel readout produced from the projected branch record, and let $\Delta_X^{\mathrm{tol}}$ be the benchmark sensitivity fixed before the scan. For any retained scalar entry $y_\mu(\mathcal B)$ in channel $X$, the first admissible scale is the local pullback of that readout tolerance,

$$
\epsilon_{\mu,X}^{2}
=
\sup_{\delta y_\mu}
\left\{
\left(\delta y_\mu\right)^2:
\frac{
\left\|
\mathcal O_X[\mathcal B+\delta_\mu\mathcal B]
-
\mathcal O_X[\mathcal B]
\right\|_X
}{
\left\|
\mathcal O_X[\mathcal B]
\right\|_X+\varepsilon_X
}
\le
\Delta_X^{\mathrm{tol}}
\right\}
$$

This definition makes the $\epsilon$ values derived chart scales: they are how far a retained ledger entry may move before the declared channel readout changes by more than the accepted tolerance. The practical first estimates are:

$$
\epsilon_\omega=\Delta_{\Gamma}^{\mathrm{tol}},
\qquad
\epsilon_\theta=\Delta_{\theta}^{\mathrm{tol}},
\qquad
\epsilon_\chi=\Delta_{\chi}^{\mathrm{clk\text{-}sig,tol}}
$$

for clock scans;

$$
\epsilon_{\mathrm{dir}}
=
1-\cos\theta_X^{\mathrm{tol}},
\qquad
\epsilon_{\mathrm{prov}}
=
\Delta_{\mathrm{prov},X}^{\mathrm{tol}}
$$

for corridor scans, with exact provenance closure represented by the limit $\Delta_{\mathrm{prov},X}^{\mathrm{tol}}\to0$ after regularization; and

$$
\epsilon_{\parallel}
=
\Delta\ln R_{\parallel}^{\mathrm{stab}},
\qquad
\epsilon_{\perp}
=
\Delta\ln R_{\perp}^{\mathrm{stab}},
\qquad
\epsilon_{\lambda}
=
\Delta\ln\lambda^{\mathrm{stab}},
\qquad
\epsilon_{\xi}
=
\Delta\ln\xi^{\mathrm{stab}}
$$

for packing scans, where the stable ranges are measured over accepted neighboring-braid branches rather than chosen per atom or line. For penetration over a trial path of duration $T_{\mathrm{path}}$ and speed $v_{\mathrm{path}}$,

$$
a_{\parallel,\mathrm{tol}}
=
\frac{v_{\mathrm{path}}\Delta v_{\parallel}^{\mathrm{tol}}}{T_{\mathrm{path}}},
\qquad
a_{\perp,\mathrm{tol}}
=
\frac{v_{\mathrm{path}}\theta_{\mathrm{path}}^{\mathrm{tol}}}{T_{\mathrm{path}}},
\qquad
\epsilon_{\mathrm{disrupt}}
=
\Delta\phi_{\mathrm{path}}^{\mathrm{tol}}
$$

Thus tolerance derivation is a ledger-replay problem. A hydrogen line, packing calculation, or penetration test may choose a different channel tolerance because it asks a different stability question, but it may not retune the tolerance after seeing the observable.

The mismatch metric used in the regularized locked projector must also be ledger-derived. Let $\mathcal{R}_a(T)$ be the accepted reduced record of assembly $a$ containing its closure label, phase state, active causal roots, provenance entries, and conserved ledger increments. The first symbolic mismatch is

$$
d_{\Lambda_a}^2
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
=
d_{\mathrm{disc}}^2
+
\frac{
\operatorname{dist}_{S^1}^2
\!\left(
\phi_j-\phi_a
\right)}
{\epsilon_\phi^2}
+
\frac{
d_{\mathrm{root}}^2
\!\left(
\mathcal{R}_j,\mathcal{R}_a
\right)}
{\epsilon_{\mathrm{root}}^2}
+
\frac{
d_{\mathrm{prov}}^2
\!\left(
\mathcal{P}_j,\mathcal{P}_a
\right)}
{\epsilon_{\mathrm{prov}}^2}
+
\frac{
\left\|
\Delta\mathcal{N}_{j\to a}
\right\|_{\mathrm{cons}}^2}
{\epsilon_{\mathrm{cons}}^2}
$$

Here $d_{\mathrm{disc}}=0$ when the discrete closure labels are compatible and $d_{\mathrm{disc}}=\infty$ when they are incompatible; $\operatorname{dist}_{S^1}$ is phase distance; $d_{\mathrm{root}}$ compares active causal-root ledgers; $d_{\mathrm{prov}}$ compares participating-source provenance; and $\Delta\mathcal{N}_{j\to a}$ collects the energy, momentum, angular-momentum, polarity, and other conserved-increment residuals needed by the assembly ledger. This makes $\zeta_a$ a branch-admission test. If any term has to be chosen separately for clock, corridor, packing, and penetration benchmarks, the interface diagnostic has reverted to a fitted surface rather than a closure-ledger projection.

For regularized simulations, the branch sum is replaced by the corresponding finite-width integral with $\delta_\eta(g_{\mathbf Xj})$. The important constraint is that the numerator and denominator of $D_{a,X}$ use the same channel $X$, the same causal-width rule, and the same coarse-graining window. Signed force cancellation belongs in acceleration calculations; interface dominance uses retained channel magnitude so that a cancellation in one direction is not mistaken for absence of wake activity.

Then the effective assembly-Noether sea interface for a declared stability threshold $D_X$ is the level set

$$
\partial\Omega_a(D_X,T)
=
\left\{
\mathbf X\in\Sigma_T:
D_{a,X}(\mathbf X,T)=D_X
\right\}
$$

The level-set threshold is not universal. A penetration calculation, packing calculation, clock-coupling calculation, and reaction-corridor calculation choose different $D_X$ values because they test different stability criteria. A useful ordering of first thresholds is

$$
0
<
D_{\mathrm{clock}}
\le
D_{\mathrm{corridor}}
\le
D_{\mathrm{packing}}
\le
D_{\mathrm{penetration}}
<
1
$$

Clock-coupling can be sensitive to weak locked-wake tails. A reaction corridor needs a stronger coherent channel but need not coincide with the full exclusion envelope. Packing asks where another stable Noether braid or assembly can remain without persistent phase disruption. Penetration asks where transit through the assembly-dominated wake becomes dynamically unstable. What must remain invariant is the level distinction: exact assembly membership is a closure-ledger fact, while $\partial\Omega_a(D_X,T)$ is a spatial interface extracted from that ledger and the surrounding Noether sea response.

### Envelope Forms

The envelope form is member data: the union of the swept constituent paths, together with any precession, sets the time-averaged boundary that neighbors and the Noether sea read. [B1](../../../../markdown/aaa/noether-braid/braid-family-b.md#b1) sweeps a common-axis envelope at rest, with axial extent set by the $h_a$ values and transverse extent set by the $\rho_a$ values. B1 does not fix the sign of $R_{\parallel}-R_{\perp}$: an elongated, equatorial, or intermediate envelope can be selected by its binary coordinates. The Family-A response uses the **near-spherical-to-oblate envelope** described next. The moving Lorentz-projection target is a separate branch response and must not be inferred from a rest-shape sign.

#### Near-Spherical-to-Oblate Form (A1)

The A1 structure contains three persistently indexed binaries whose reference orbital planes are mutually orthogonal by definition. Near rest in a weak, homogeneous Noether sea, the working response hypothesis is a nearly spherical time-averaged envelope. Increased translation speed or gravitational gradient compresses the envelope along the Family-A $(1,1,1)$ translation direction, so the envelope becomes increasingly oblate as the three binary axes converge toward that direction. This is the prescribed Family-A response, not an EOM-solver-retained settling result.

No binary is assigned the leading boundary by the taxonomy. For a declared branch window $W$ and direction $\hat{\mathbf m}$, define the directional support of binary $a$ by
$$
H_a(\hat{\mathbf m};W)
=
\sup_{\substack{T\in W\\j\in\{1,2\}}}
\hat{\mathbf m}\mathbin{\cdot}
\left(\mathbf X_{aj}(T)-\mathbf X_{\mathrm{grp}}(T)\right),
$$
and the full path-history support by
$$
H_{\mathrm{env}}(\hat{\mathbf m};W)
=
\max_{a\in\{1,2,3\}}H_a(\hat{\mathbf m};W).
$$
An index is boundary-leading in direction $\hat{\mathbf m}$ only when it attains this maximum on the retained record. The maximizer may depend on direction or time, may be nonunique, and does not relabel the binary. Under the prescribed compression response, the union of all six paths produces the flattened-pole, equatorial-bulge form: an **oblate spheroidal exclusion envelope**.

In low-stress A1 prose, "A1 envelope" means this effective path-history envelope, not a literal material surface.

### Canonical Geometry Variables

For either family, use $R_{\parallel}$ for the semiaxis along the declared family axis or moving-branch drift axis and $R_{\perp}$ for the transverse semiaxis. The canonical shape ratio is
$$
\xi\equiv\frac{R_{\parallel}}{R_{\perp}}
$$
so $\xi=1$ denotes a spherical envelope, $\xi>1$ denotes a fusiform envelope elongated along the parallel axis, and $\xi<1$ denotes an oblate spheroidal envelope compressed along the parallel axis. A family label must accompany any rest-envelope value of $\xi$.

Use
$$
\lambda\equiv\frac{R_{\perp}}{R_{\perp,0}}
$$
for the transverse scale ratio relative to a stated reference envelope. The pair $(\xi,\lambda)$ belongs first to braid envelope geometry: $\xi$ records shape and $\lambda$ records scale.

Observer clock behavior is a downstream readout, not the definition of either geometry variable. In a successful homogeneous Lorentz-closure regime, the theory should derive
$$
\frac{\omega_{\text{clk}}}{\omega_0}=\frac{d\tau}{dt_{\mathrm{eff}}}\to\xi\to\frac{1}{\gamma}
$$
but this is a moving-branch closure target linking the clock channel to the envelope projection. It should not be used to define $\xi$, and it does not determine B1's rest-envelope aspect ratio.

### Lorentz Projection Role

For branch-quantized Lorentz response, the envelope variables $(\xi,\lambda)$ are projection variables. They expose the geometry of a stable branch to external clocks, rulers, and nearby assemblies, but they do not by themselves contain the full branch state. The equations in this section state the family-general moving-envelope target; the A1 instantiation begins in [Retuning Projection to Envelope Variables](#retuning-projection-to-envelope-variables), while the B1 projection remains open.

The hidden branch state contains the member-specific binary radii, frequencies, speeds, axes, active causal-root ledger, and wake exchange. For A1 and B1 alike, the leading surface must be projected from all six paths. Therefore the observed ruler factor is extracted through the declared member envelope,
$$
\gamma_{\mathrm{rul}}^{(q)}(v)
\equiv
\frac{R_{\perp,q}(v)}{R_{\parallel,q}(v)}
=
\frac{1}{\xi_q(v)}
$$
but the branch $q$ is accepted only when all three binary ledgers also retune consistently with clock closure, conservation, and preferred-frame leakage bounds.

The direct Lorentz-to-geometry map comes from a closed return cycle. In a homogeneous cell, define
$$
\gamma_{\text{eff}}(v)
\equiv
\frac{1}{\sqrt{1-v^2/c_{\text{eff}}^2}}
$$
Let $T_{\mathrm{ref}}$ denote the rest-branch reference period for the same homogeneous branch chart.
The longitudinal return time for an envelope semiaxis $R_{\parallel}$ is
$$
T_{\parallel}
=
\frac{R_{\parallel}}{c_{\text{eff}}-v}
+
\frac{R_{\parallel}}{c_{\text{eff}}+v}
=
\frac{2R_{\parallel}}{c_{\text{eff}}}\gamma_{\text{eff}}^2
$$
while the transverse causal-budget return time is
$$
T_{\perp}
=
\frac{2R_{\perp}}{c_{\text{eff}}}\gamma_{\text{eff}}
$$
Requiring $T_{\parallel}=T_{\perp}+O(\epsilon_{\mathrm{LV}}T_{\mathrm{ref}})$ gives
$$
\xi_q(v)
=
\frac{R_{\parallel,q}(v)}{R_{\perp,q}(v)}
=
\frac{1}{\gamma_{\text{eff}}(v)}
+O(\epsilon_{\mathrm{LV}})
$$
The role of the geometry chapter is to record this as an envelope projection, not as a primitive definition. The derivation and closure coefficients belong to [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md#closed-return-derivation-of-the-lorentz-axis-ratio).

This distinction prevents a single-binary shortcut. A branch-derived boundary-leading channel can estimate one visible deformation contribution, while a mature Lorentz closure must show that the same branch update also determines the clock factor
$$
\gamma_{\mathrm{clk}}^{(q)}(v)=\frac{T_q(v)}{T_{\mathrm{ref}}}
$$
and that the admitted branches satisfy
$$
\gamma_{\mathrm{clk}}^{(q)}(v)
=
\gamma_{\mathrm{rul}}^{(q)}(v)
+O(\epsilon_{\mathrm{LV}})
$$
The envelope is therefore the visible projection of the retained causal-root ledger, not an independently assigned Lorentz surface.

### Retuning Projection to Envelope Variables

This section is the A1 instantiation of the envelope projection, stated on its cadence-scale retuning map ([A1 Dynamics](../../../../markdown/aaa/noether-braid/braid-a1-dynamics.md#cadence-scale-retuning-hypothesis)); the corresponding projection for B1 remains open.

The cadence-scale retuning map must project into $(\lambda,\xi)$ through the envelope geometry, not by assigning those variables independently. Let

$$
\mathbf{e}_q
=
\left(
\ln R_{\parallel,q},\,
\ln R_{\perp,q}
\right)^{T}
$$

denote the logarithmic semiaxis record of branch $q$. The envelope projection is a branch-dependent map

$$
\mathbf{e}_q
=
\mathcal{P}_{\mathrm{env}}^{(q)}
\!\left(
\ln R_1,\ln R_2,\ln R_3,\,
\mathbf{A}_1,\mathbf{A}_2,\mathbf{A}_3,\,
\mathcal{L}_{\mathrm{root}},\mathcal{L}_{\mathrm{wake}}
\right)
$$

where the axes, root ledger, and wake ledger are part of the branch data. The induced geometry increments are therefore

$$
\Delta\ln\lambda
=
\Delta\ln R_{\perp,q},
\qquad
\Delta\ln\xi
=
\Delta\ln R_{\parallel,q}
-
\Delta\ln R_{\perp,q}
$$

If one binary $a_{\mathrm{env}}$ is uniquely boundary-leading over the relevant directions and window, the projection reduces to the useful estimate

$$
\Delta\ln\lambda
\approx
\Delta\ln R_{a_{\mathrm{env}}},
\qquad
\Delta\ln\xi
\approx
\Delta\ln R_{\parallel,a_{\mathrm{env}}}
-
\Delta\ln R_{\perp,a_{\mathrm{env}}}
$$

This approximation is a projection estimate, not a branch proof. It fails when the maximizer changes with direction or time, when more than one binary contributes at the same order, or when root-history, axis precession, or neighbor-induced strain changes the interface independently of a single radius. Those failures are informative: they identify which hidden ledger entries must be retained before the retuning map can be used for clock, ruler, or Noether sea transport calculations.

### A1 Envelope Deformability

The oblate spheroidal envelope is deformable because it is generated by orbit paths, not by a rigid shell. Those paths depend on the superposition of:

- internal binary wakes,
- self-hit and partner-hit closure,
- nearby assembly wakes,
- Noether sea density and stress,
- and the braid's translational state through the Noether sea.

External effective fields, nearby assembly wakes, and dense local assemblies can perturb the binary paths. The most exposed channel must be derived from the branch response and need not be the same index in every direction or environment. A distortion of any boundary-leading path changes the exclusion envelope.

This gives A1 two distinct geometric roles:

1. As an assembly, it can deform while preserving A1 identity across a stable regime.
2. As a medium constituent, many deforming braids can contribute to coarse-grained Noether sea density, strain, and signal-propagation changes.

The claim that those coarse-grained changes reconstruct observer-level gravity is not owned here. It belongs to [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md), [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md), and [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md).

For the special-relativity-facing comparison of this deformation channel, see [the deformable Noether braid comparison](../../../../markdown/aaa/philosophy-history/theory-bridges/special-relativity-noether-braid.md). For the focused synthesis of the closed-return quantization claim, see [Return-Cycle Lorentz Quantization](../../../../markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md).

### Geometry Interfaces

For local assembly modeling, use this page as the geometric source for:

- a family-declared fusiform or oblate spheroidal envelope boundary,
- principal axes set by the retained family's orientation,
- deformation of the family-leading envelope paths under local gradients,
- and exclusion-volume changes relevant to packing, shielding, and collision channels.

For the Family-A definitions, use [Braid Family A](../../../../markdown/aaa/noether-braid/braid-family-a.md), where the prescribed flattening response is separated from the EOM-solver retention burden. For the Family-B definition, use [Braid Family B](../../../../markdown/aaa/noether-braid/braid-family-b.md); its moving-envelope projection remains open.

For Noether sea modeling, use [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md) and [Noether Sea Pro/Anti Coupling](../../../../markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md), where many Noether braids become a coupled medium rather than isolated assembly envelopes.

### Summary Commitment

> **A1 Geometry Commitment:** A1 has a near-spherical weak-stress envelope that becomes oblate under increased translation speed or gravitational gradient. The exclusion envelope is generated by binary path histories and is dynamic and deformable, not a rigid surface. Its deformation is an assembly-level input to Noether sea state variables, while metric and gravity-language reconstruction belongs to the spacetime branch.

> **Member-Scoping Commitment:** B1's rest aspect ratio depends on its prescribed binary coordinates; A1 is near spherical in its weak-stress reference state and becomes increasingly oblate along its prescribed compression response. The moving Lorentz-projection target $\xi\to1/\gamma$ is a branch-response statement and must be derived separately for each member.

> **Lorentz Projection Commitment:** In Lorentz closure, the full six-path envelope supplies the observable ruler projection, while the accepted branch state remains a retained causal-root ledger. The geometry chapter records $\xi$ and $\lambda$ as projection variables; it does not reduce clock, mass, or action-ledger closure to one binary path or to envelope shape alone.

## Noether Braid Topological Charge

This chapter gives a first-class home to the candidate topological label of a Noether braid assembly. The label combines the causal-root ledger of the delayed dynamics with the phase-return degree data of a resonance-locked Family-A member. Its purpose is to state what can be computed from a retained branch chart, what is invariant inside a nondegenerate branch domain, and what remains a theorem target before the label can serve as a topological periodic table of assemblies. The general search domain that emits candidate Noether braid branch charts is developed in [Noether Braid Configuration Space](../../../../markdown/aaa/noether-braid/noether-braid-configuration-space.md).

The reader-facing idea is that a topological charge is not a decorative name for a braid. It is a proposed invariant label carried by one retained branch chart. Root counts tell which self-hit and partner-hit channels are active; signed degrees say what survives fold-pair surgery; phase-return degree data say how the locked branch winds over one cycle. Only the combination can become a stable assembly label.

This page therefore starts from computation, not classification. A solver must first produce a retained branch with causal-root floors, finite memory, gluing, wake-boundary closure, and stability. The topological label is read from that branch; it does not certify the branch by itself.

The compact notation is
$$
[\mathfrak B]_{\mathrm{top}}
=
\left(
N_s,\,
M_p,\,
c_1
\right)
$$
where $N_s$ counts active self-hit roots, $M_p$ counts active partner-hit roots, and $c_1$ denotes the established phase-entry slot of the retained resonance lock. In this chapter that slot means return-map degree data unless a later two-torus curvature chart is explicitly supplied. For a promoted lock with a three-phase chart this last entry is usually a pair
$$
c_1=(m,n)\in\mathbb{Z}^2
$$
rather than a scalar integer: $m$ and $n$ are the binary-2 and binary-1 winding numbers over one binary-3 reference period.

This compact form records the count data most directly emitted by a branch solver. The conserved refinement is
$$
[\mathfrak B]_{\mathrm{deg}}
=
\left(
D_t,\,
D_p,\,
c_1
\right),
$$
where $D_t$ and $D_p$ are signed root degrees. The unsigned counts $N_s$ and $M_p$ can change by opposite-sign fold-pair birth or death, while $D_t$ and $D_p$ are the degree-like data preserved by generic fold surgery. A promoted report should therefore carry both the compact assembly topological charge and its signed-degree refinement.

This is a definition and closure target, not a completed classification theorem. It becomes a physical assembly label only after the same retained branch chart supplies positive root floors, finite memory, finite local-to-global gluing, stable return data, and a closed wake-history boundary ledger.

In the terminology of [Noether Braid Configuration Space](../../../../markdown/aaa/noether-braid/noether-braid-configuration-space.md#candidate-and-certified-braids), a candidate for certified-braid promotion is the dynamical return-map status of the full retained branch. The assembly topological charge is the branch-intrinsic topological label carried by that candidate. It is not a Lorentz-dressed observer component: moving-assembly export may transform energy-momentum and angular-momentum readouts, but $[\mathfrak B]_{\mathrm{top}}$ changes only when the retained branch crosses a fold, reconnection, or declared surgery event.

### Document Role

This chapter is the downstream classifier for retained Noether braid branch charts. It owns $[\mathfrak B]_{\mathrm{top}}$, the signed-degree refinement, invariance conditions, allowed transitions, and simulation extraction order for the topological label.

It does not certify branch retention by itself and does not create a base classification label. It consumes a same-record branch chart from the neutral-base, A/B/C-member, rank-three, or lower-rank proof effort; the label becomes physical only after the causal-root, phase-return, gluing, wake-boundary, and stability rows close on that same record.

### Source Of The Three Entries

The first two entries come from the causal-root complex of the Master Equation. On a retained branch chart, active roots are split by transmitter identity and by Jacobian sign. Let $b_\ell$ denote the formal generator attached to active root row $\ell$. The modules below are free $\mathbb{Z}$-modules, so the ledger invariant is their rank. For the self-hit sector,
$$
C_{s,+}(\mathfrak B)
=
\mathbb{Z}\langle b_\ell:\text{self root},\ J_\ell>0\rangle,
\qquad
C_{s,-}(\mathfrak B)
=
\mathbb{Z}\langle b_\ell:\text{self root},\ J_\ell<0\rangle.
$$
For the partner-hit sector,
$$
C_{p,+}(\mathfrak B)
=
\mathbb{Z}\langle b_\ell:\text{partner root},\ J_\ell>0\rangle,
\qquad
C_{p,-}(\mathfrak B)
=
\mathbb{Z}\langle b_\ell:\text{partner root},\ J_\ell<0\rangle.
$$
The unsigned ledgers are
$$
N_s
=
\operatorname{rank}_{\mathbb{Z}} C_{s,+}+\operatorname{rank}_{\mathbb{Z}} C_{s,-},
\qquad
M_p
=
\operatorname{rank}_{\mathbb{Z}} C_{p,+}+\operatorname{rank}_{\mathbb{Z}} C_{p,-}.
$$
The signed degrees
$$
D_t
=
\operatorname{rank}_{\mathbb{Z}} C_{s,+}-\operatorname{rank}_{\mathbb{Z}} C_{s,-},
\qquad
D_p
=
\operatorname{rank}_{\mathbb{Z}} C_{p,+}-\operatorname{rank}_{\mathbb{Z}} C_{p,-}
$$
are not extra entries in the compact assembly topological charge, but they are required side data and form the conserved-degree refinement $[\mathfrak B]_{\mathrm{deg}}$. A solver that reports only $N_s$ and $M_p$ has counted roots without proving which opposite-sign pairs can be born, die, or persist under deformation.

Equivalently, each source sector is a $\mathbb{Z}_2$-graded two-term root module, inheriting the signed causal-root-complex reading from [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#signed-causal-root-complex):
$$
C_{\sigma,\bullet}
=
C_{\sigma,+}\oplus C_{\sigma,-},
\qquad
\sigma\in\{s,p\}.
$$
The unsigned ledgers $N_s$ and $M_p$ are ranks of a chosen presentation. They are useful live-channel counts, but they are not the conserved quantities across fold-pair surgery. The conserved local degree is the Euler characteristic
$$
\chi(C_{\sigma,\bullet})
=
\operatorname{rank}_{\mathbb{Z}} C_{\sigma,+}-\operatorname{rank}_{\mathbb{Z}} C_{\sigma,-}
=
D_\sigma.
$$
A generic fold birth adds one positive and one negative generator, so the presentation rank changes by two while $\chi(C_{\sigma,\bullet})$ is unchanged.

The geometric reading is intersection-theoretic. On a lifted finite-memory strip, each connected retained causal-locus component has an oriented intersection number with a generic receiver-time fiber. Let $\mathcal L_\sigma$ be the retained causal-locus chain in sector $\sigma\in\{s,p\}$ and let $F_{T_\ast}$ be a generic receiver-time fiber at fixed absolute time $T_\ast$. Then
$$
D_\sigma
=
\left\langle[\mathcal L_\sigma],[F_{T_\ast}]\right\rangle.
$$
On a regular one-parameter family with parameter $\mu$,
$$
\frac{d}{d\mu}
\left\langle[\mathcal L_\sigma(\mu)],[F_{T_\ast}]\right\rangle
=0.
$$
Fold-pair births and deaths appear as null-homologous bigons with local contributions $+1-1=0$. Summing oriented intersections in the self and partner sectors gives $D_t$ and $D_p$; summing their absolute values gives $N_s$ and $M_p$. This is the bridge to [Causal Action Functional](../../../../markdown/aaa/dynamics/causal-action-functional.md#geometrictopological-framework): the same causal-locus components that carry action-counting weight also supply the signed root degrees used by the assembly topological charge.

The third entry comes from the phase-return chart of a resonance-locked Noether braid. Let $\theta_1,\theta_2,\theta_3$ be the phase coordinates attached to the persistent binary indices. Exact integer closure over one binary-3 reference period $P_3$ means
$$
\theta_3(T+P_3)=\theta_3(T)+2\pi,
$$
$$
\theta_2(T+P_3)=\theta_2(T)+2\pi m,
\qquad
\theta_1(T+P_3)=\theta_1(T)+2\pi n.
$$
Equivalently, the relative-phase one-forms
$$
\vartheta_2=d\theta_2-m\,d\theta_3,
\qquad
\vartheta_1=d\theta_1-n\,d\theta_3
$$
have integer holonomy and become flat on a promoted phase-locked branch. Let $\rho_3:S^1_3\to\mathfrak B$ be one retained binary-3 return cycle. The shorthand
$$
c_1[\theta_1,\theta_2,\theta_3]
=
\left(
\operatorname{deg}(\theta_2\circ\rho_3),\,
\operatorname{deg}(\theta_1\circ\rho_3)
\right)
=(m,n)
$$
records this phase-return degree data. The doubling-frequency `4:2:1` candidate is the binary-3-normalized case $(m,n)=(2,4)$, equivalently $f_1:f_2:f_3=4:2:1$.

The symbol $c_1$ is retained as the established phase-entry notation, but it should not be read here as a literal first Chern class of principal circle bundles over the binary-3 phase circle. Such bundles over $S^1_3$ are topologically trivial because $H^2(S^1_3;\mathbb{Z})=0$. The claim is the degree-pair claim
$$
(m,n)\in[S^1_3,S^1]\times[S^1_3,S^1]\cong\mathbb{Z}^2,
$$
with flat relative-phase recurrence on the retained return chart. If a later chart supplies a genuine two-torus curvature form, its first Chern number can be compared with this degree pair. Until then, $c_1=(m,n)$ means return-map degree data, not a curvature integral.

The doubling-frequency data $(m,n)=(2,4)$ belong specifically to the frequency-separated A3.3 member and its A1.3 zero-axial-offset locus. They are not generic Noether braid data. In particular, [B1](../../../../markdown/aaa/noether-braid/braid-family-b.md#b1) is common-frequency on one common-axis phase chart: its three path families do not supply three independent orbital-plane normals, so the rank-three phase entry defined here is suspended rather than assigned $(1,1)$ or $(2,4)$. A B1 branch may still report the partial charge $(N_s,M_p)$; a B1 lower-rank return invariant would require a separate definition and certificate.

The phase entry is also conditional on the three support-row planes remaining independent. If $\hat{\mathbf n}_1,\hat{\mathbf n}_2,\hat{\mathbf n}_3$ are the retained orbital-plane normals, define
$$
D_{\mathrm{plane}}
=
\det\!\left[
\hat{\mathbf n}_1\ \hat{\mathbf n}_2\ \hat{\mathbf n}_3
\right].
$$
The degree pair is admissible only when
$$
|D_{\mathrm{plane}}|\ge \delta_{\mathrm{plane}}>0.
$$
When this floor fails, the three phases no longer supply an independent return chart, so $c_1$ must be suspended rather than compared across the degeneracy.

### Candidate Definition

For a finite-$\eta$ branch chart $\mathfrak B$, the assembly topological charge is admissible only when the following data are present on the same retained row set:

1. Active root rows split by transmitter identity: self-hit and partner-hit.
2. Jacobian-sign grading for those rows: $C_{s,+},C_{s,-},C_{p,+},C_{p,-}$.
3. Positive transversality floors away from declared finite caustic transits.
4. Finite memory depth and positive inactive-root gaps.
5. A finite local-to-global gluing result for the branch chart, or an explicit finite multistability family.
6. For a rank-three branch, integer phase closure, flat relative-phase connection, and a plane-independence floor $|D_{\mathrm{plane}}|\ge\delta_{\mathrm{plane}}>0$.
7. A return-map stability certificate, such as a Floquet or Conley-style branch certificate, after quotienting only true symmetry directions.
8. If a binary $h\in\{1,2,3\}$ is treated as a caustic-grazing carrier, regulator-stable carrier rows showing that the reported root degrees and phase-return entry do not depend on the finite-$\eta$ convention in the promoted limit. The index $h$ is a branch diagnostic, not a taxonomy assignment.

Under those conditions the compact assembly topological charge is
$$
[\mathfrak B]_{\mathrm{top}}
=
\left(
N_s,\,
M_p,\,
c_1[\theta_1,\theta_2,\theta_3]
\right)
\in
\mathbb{Z}_{\ge0}\times\mathbb{Z}_{\ge0}\times\mathbb{Z}^2.
$$
For a Noether braid branch without a phase-return chart, the partial assembly topological charge $(N_s,M_p)$ may be recorded, but $c_1$ is not assigned until that chart exists.

A useful refinement is a branch-preserving chirality label
$$
\chi_{\mathrm{fr}}\in\mathbb{Z}_2.
$$
The richer ordered-braid chirality label $\chi_c$ is introduced in [Reduced A1 Closure Label](../../../../markdown/aaa/noether-braid/braid-a1-dynamics.md#reduced-a1-closure-label). In this chapter, $\chi_{\mathrm{fr}}$ is the certified $\mathbb{Z}_2$ projection of that richer chirality data when the same branch chart supplies a deformation-stable handed marker, such as a framed self-linking sign or a certified maximal-curvature-binary circulation sign. It is not an independent competitor to $\chi_c$, and it is not part of the base triple until the projection is certified. It must be invariant under the same branch-preserving deformations that keep $(N_s,M_p,c_1)$ fixed, and it may flip only at an independent framing wall $\Sigma_{\mathrm{frame}}$ where the nonsingular framing floor fails. It is the natural place to record handedness, but it must not be substituted for the root and phase-return data. The two signs of the maximal-curvature-binary circulation are introduced in [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md#emergent-properties-and-measurement-standards).

### Invariance And Allowed Transitions

The assembly topological charge is designed to be locally invariant. Between branch boundaries, the implicit-function theorem transports each simple active root continuously, so $N_s$, $M_p$, $D_t$, and $D_p$ remain constant. At a generic fold, one positive and one negative root are created or annihilated. Therefore
$$
\left(\Delta N_s,\Delta M_p\right)\in\{(\pm2,0),(0,\pm2)\},
\qquad
\Delta D_t=\Delta D_p=0
$$
for an ordinary fold-pair event. In the sector where the fold occurs, the unsigned count changes by $\pm2$ while both signed degrees remain unchanged.

Cusp or higher singular strata are not automatically governed by the generic fold law. They require a separate regularized normal form before their ledger surgery can be promoted. Likewise, $c_1=(m,n)$ remains fixed under deformation only while the return-map degree pair is unchanged, the relative-phase connection stays flat, and the plane-independence floor remains positive. A loss of resonance lock, a plane-degeneracy transition, or a branch-fold event that changes the return chart can change the phase entry.

Near generic walls the transition stratification is product-like:
$$
\Sigma_{\mathrm{charge}}
=
\Sigma_{\mathrm{root}}
\cup
\Sigma_{\mathrm{phase}}
\cup
\Sigma_{\mathrm{plane}},
$$
with $\Sigma_{\mathrm{frame}}$ added when $\chi_{\mathrm{fr}}$ is part of the certified report. Away from intersections these are transverse codimension-one walls, so exactly one entry of the compact label or one certified refinement changes. Codimension-two intersections encode simultaneous events, such as a cusp, a root-plus-phase transition, or a plane-plus-phase transition; those require their own normal form before any ledger surgery is inferred.

The transition catalogue therefore has a native form:

| Event | Codimension | Assembly topological charge effect | Required certificate |
| --- | --- | --- | --- |
| Branch-preserving deformation | 0 on the retained chart | No change to $(N_s,M_p,c_1)$ or $(D_t,D_p,c_1)$ | Positive floors, finite memory, stable gluing |
| Self-root fold | 1 generically | $\Delta N_s=\pm2$, $\Delta D_t=0$ generically | Fold normal form and post-transit chart |
| Partner-root fold | 1 generically | $\Delta M_p=\pm2$, $\Delta D_p=0$ generically | Fold normal form and post-transit chart |
| Phase-lock jump | 1 for a resonance crossing | $\Delta c_1\ne0$ | Degree/holonomy change and return-map transition |
| Plane-degeneracy transition | 1 generically, higher with imposed symmetry | Phase-return chart may lose rank before $c_1$ can be compared | Orbital-plane determinant and return-chart continuation |
| Framing or chirality flip | 1 or higher, depending on the framing chart | $\Delta\chi_{\mathrm{fr}}\ne0$ | Framed-linking or handedness transition certificate |
| Cusp or deeper singular stratum | 2 or higher generically | Not inferred from fold law | Singular-stratum chart and regulator-stable transition data |

This is why the triple belongs in one object. The root ledgers describe which delayed causal channels are live, while the phase-return entry describes how the multi-layer branch returns to itself. Both are characteristic data of the same retained causal-root sheaf: local root sections, overlap gluing, and phase degree/holonomy must agree before an assembly label is promoted.

### Role In The Assembly Atlas

The topological atlas of assemblies should not classify objects by visual similarity alone. It should classify retained branches by deformation-stable integers that can be extracted from the same simulation record used to test the dynamics. The candidate atlas entry for a stable assembly is therefore
$$
\mathcal{Q}_{\mathrm{asm}}
=
\left(
N_s,\,
M_p,\,
c_1,\,
\chi_{\mathrm{fr}}\ \text{when certified}
\right)
$$
together with its stability margins, energy/wake ledger, and gluing status.

The intended use is constrained:

- $(N_s,M_p)$ records the binding-channel census: self-hit channels, partner-hit channels, and their signed degrees.
- $c_1=(m,n)$ records the resonance-lock return-map degree pair of a promoted rank-three branch; $(2,4)$ is the A3.3 doubling-frequency candidate, including its A1.3 zero-axial-offset locus, not a family-general value.
- $\chi_{\mathrm{fr}}$ records handedness only after a framed handed marker is certified.
- Physical particle identity, generation structure, spin-statistics, exclusion, and Standard Model quantum numbers are downstream mappings, not consequences of the notation alone.

Thus $(N_s,M_p,c_1)$ is the candidate conserved label that says when two assemblies occupy the same topological sector. It is not yet a proof that a given sector is an electron analogue, photon analogue, or quark analogue.
Strictly, the compact count triple is locally conserved only inside one nondegenerate branch domain. Across generic fold-pair surgery the degree-refined data $(D_t,D_p,c_1)$ are the conserved part, while $N_s$ and $M_p$ record how many live channels the retained branch currently carries.

### Simulation Extraction

A branch solver should extract the assembly topological charge in this order:

1. Build the finite-$\eta$ retained branch chart and declare its memory window.
2. Find active causal roots on the same retained row set.
3. Label each root by transmitter identity: self or partner.
4. Record the Jacobian sign and compute $C_{s,+},C_{s,-},C_{p,+},C_{p,-}$.
5. Compute $N_s$, $M_p$, $D_t$, and $D_p$.
6. Compute the lifted-strip fiber-intersection degrees that realize $D_t$ and $D_p$ whenever the causal-locus chart is available.
7. Track fold, caustic, cusp, or inactive-gap transition metadata.
8. For branches with a Noether braid phase-return chart, compute phase degree/holonomy $(m,n)$ from the returned phase chart, verify the floor $|D_{\mathrm{plane}}|\ge\delta_{\mathrm{plane}}>0$, and show that $(m,n)$ comes from the return map rather than from frequency ratios alone.
9. If a caustic-grazing carrier $h$ is used, test that the signed degrees and phase-return entry are stable under the declared $\eta$ refinement.
10. Test gluing and finite continuation cardinality for the local charts.
11. Test the return-map stability gap off true symmetry directions.
12. Report $[\mathfrak B]_{\mathrm{top}}$ only after the same retained rows pass these checks.

The failure modes are equally important. A candidate is not promoted if the roots are counted without signs, if self and partner rows are mixed, if the phase lock is inferred from frequency ratios without holonomy recurrence, if local branch charts do not glue, or if the continuation family is empty, infinite, or unlabeled.

### Status

The established pieces are local:

- The delay-map theorem pack in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#delay-map-theorem-pack-formalized) proves signed degree invariance on regular families and the generic opposite-sign fold-pair law.
- The signed causal-root complex in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#signed-causal-root-complex) supplies the local chain-complex reading of active roots.
- [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md#super-field-speed-root-ledgers-and-resonance-lock) supplies the self-hit and partner-hit ledger notation used by $(N_s,M_p)$.
- [A3.3 Doubling-Frequency Resonance Lock](../../../../markdown/aaa/noether-braid/braid-a3-3-doubling-frequency-lock.md#assumption-2-exact-integer-phase-closure) supplies the A3.3 integer phase-closure data whose return-map degree pair is recorded as $c_1=(m,n)$; A1.3 is its zero-axial-offset locus, and B1 does not inherit that rank-three entry.
- [Effective Lagrangian](../../../../markdown/aaa/dynamics/effective-lagrangian.md#topological-constraints-and-assembly-stability) uses the same topological sector in the action and mass-gap theorem target.

The open proof burden is global:

- prove that a stable assembly realizes a fixed assembly topological charge over a finite branch domain;
- prove gluing of the local causal-root charts into a finite labeled continuation family;
- prove a positive stability gap for the assembly topological charge sector;
- determine whether the entries are independent or constrained by radial balance, phase flatness, and Noether sea response, starting with the reachable theorem target that for a layer winding $k_a\in\{1,m,n\}$ the layerwise self-hit degree obeys a parity or lower-bound law $D_t^{(a)}\equiv f(k_a)\pmod 2$ derived from the circular self-hit fold-birth sequence and the lifted-strip fiber-intersection formula;
- prove that any caustic-grazing carrier rows have regulator-stable signed degrees and phase-return entries, so the assembly topological charge does not depend on the finite-$\eta$ convention used to regularize the field-speed transition;
- map any certified sectors to observer-level particle quantum numbers without fitting the labels afterward.

The chapter should therefore be read as the canonical definition and proof target for assembly topological charge, not as the completed topological periodic table.
