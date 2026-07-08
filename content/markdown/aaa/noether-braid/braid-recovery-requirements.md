# Braid Recovery Requirements

Before any particular braid geometry is featured, the theory owes the reader a contract: what must a candidate braid actually deliver? This chapter states that contract once, independently of which realization — one support band, three ordered bands, or another family member — eventually satisfies it. The requirements come in two layers. The retention layer asks whether a six-architrino branch can persist at all as one coherent causal-return record. The recovery layer asks what a retained branch must then hand to the rest of physics: the clocks, rulers, masses, charges, spectra, statistics, forces, and cosmological histories that general relativity, quantum theory, the Standard Model, and the $\Lambda$CDM-era observations already describe at the observer level.

Stating the requirements realization-independently protects the proof order. A realization chapter may carry beautiful exact structure and still leave every row below open; a recovery chapter may state a sharp observer-level target that no current branch can yet consume. Keeping the contract in one place prevents both failure modes from hiding: every claim in the braid scene can be checked against this chapter's ladder, and every ladder row names the chapter where its detailed burden lives.

Nothing in this chapter is a retained-branch result. Every row below is an obligation — a theorem target, closure target, or comparison target at its stated level — and the current proof dispositions belong to the [Noether Braid Proof Map](noether-braid-proof-map.md), not to this chapter.

## Document Role

This chapter owns the realization-independent statement of the braid proof burden: the retained-branch certificate row structure, the first-failure reporting discipline, the ordered proof-burden ladder, and the full recovery-target inventory consumed by the downstream theory. It deliberately owns no geometry and no evidence. The base-family definitions live in [Neutral Braid](neutral-braid.md), [Symmetric Shell Braid](symmetric-shell-braid.md), and [Nested Shell Braid](nested-shell-braid.md); the shared mathematical machinery lives in [Braid Mathematics](braid-mathematics.md); Proof IDs, dispositions, and environment-qualified rounds live in the [Noether Braid Proof Map](noether-braid-proof-map.md) with the grammar defined in [Noether Braid Taxonomy](noether-braid-taxonomy.md).

A reader should use this chapter the way an engineer uses a requirements specification: to know what any proposed design must eventually satisfy, and to recognize when a reported success addresses one row while leaving the blocking rows untouched.

## The Retained-Branch Certificate

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

The inventory row fixes which six architrinos are present and their polarity balance. The curve and support rows fix the closed support geometry and its declared band structure — this is the only place where the family member enters, as the declared support descriptor. The root row demands the actual retained causal roots for all ordered distinct source pairs, thirty in the six-body case, with delays, Jacobian floors, receiver-normal branch strengths, and lines of action assembled from the true path histories rather than from a compressed force law. The tail, dynamics, action, and Noether rows demand that the delayed forces, the action bookkeeping, and the conserved-quantity ledger all balance on the same record. The event and stability rows demand that discrete branch events are logged and that the branch returns after perturbation, and the convergence row demands that the far-population wake sums the record depends on actually converge.

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

Every predicate must use the same source-pair policy, same-source policy, memory depth, support descriptor, action convention, event interval, and inventory ledger. If any row changes those conventions, the result is a ledger mismatch, not a retention result. The neutral-braid statement of this certificate, with the base-family notation, is given in [Neutral Braid](neutral-braid.md#retained-branch-certificate-target); a shell or nested realization inherits the same rows and may compress the all-pairs ledger only after its reduction row proves how the compressed rows are inherited.

## The First-Failure Ladder

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

## Proof-Burden Order

The retention certificate is the first rung of a longer ladder. The burdens close in a fixed order, and a packet can supply evidence for one rung while leaving the next rung open. The [Noether Braid Proof Map](noether-braid-proof-map.md#proof-burden-order) tracks which Proof IDs currently exercise each rung; the realization-independent ladder is:

| Order | Burden | What must close on the same record |
| --- | --- | --- |
| 1 | Rest branch retention | The full certificate conjunction in the declared rest environment. |
| 2 | Noether sea embedded retention | The rest rows plus the local population-response row from like assemblies, for branches whose stability is supplied by the ambient medium rather than by isolation. |
| 3 | Moving observer export | Transport, response-center, clock, ruler, energy/action, and preferred-frame-leakage rows for nonzero group velocity. |
| 4 | Assembly consumer rows | The recovery-target inventory below, each target consuming the retained branch record rather than substituting for it. |

Two consequences of this ordering deserve emphasis. First, isolation is a limiting seed chart, not the physical situation: a branch that fails in the Euclidean void and closes only with the embedded population-response row is still a physical success, because the universe supplies the medium. Second, consumer success never travels backward. A recovered spectrum, force law, or metric export classifies a retained branch; it does not retroactively prove retention, and it earns no claim-level promotion for the rungs beneath it.

## Recovery-Target Inventory

A retained, transportable braid branch is the theory's proposed common cause for a wide inventory of observer-level physics. This section states that inventory once. Each row names the target, the requirement in realization-independent form, and the chapter that owns the detailed derivation burden. The rows are stated from the perspective of the working theory; their individual claim levels — derivation, closure target, effective summary, or comparison target — are carried by the owning chapters.

### Relativistic and Gravitational Targets

| Target | Requirement | Owning chapters |
| --- | --- | --- |
| Lorentz clock/ruler export | A moving retained branch must retune its internal record so that clock rate and envelope contraction collapse to the observer-calibrated $\gamma_0(v_{\mathrm{eff}})=(1-v_{\mathrm{eff}}^2/c_0^2)^{-1/2}$ in the homogeneous weak-field limit, with preferred-frame leakage bounded below current test sensitivity. | [Lorentz Kinematics](../spacetime/lorentz-kinematics.md), [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md) |
| Effective metric and weak-field gravity | The braid-bearing Noether sea must export an effective metric whose weak clock row reproduces $d\tau_{\mathcal A}/dt\approx1-U_N/c_0^2-\|\mathbf w\|^2/(2c_0^2)$, with the Newtonian potential match, effective coupling, and PPN coefficients derived from one same-record constitutive response rather than fit separately. | [Emergent Metric](../spacetime/emergent-metric.md), [General Relativity](../spacetime/general-relativity.md), [PPN Parameters](../spacetime/ppn-parameters.md) |
| Strong-field and horizon behavior | The terminal-alignment condition of the braid family must recover horizon phenomenology — darkness, entropy counting over alignment-restricted closure labels, and singularity resolution — as branch-boundary behavior rather than as imported geometry. | [Black Holes](../spacetime/black-holes.md), [Singularity Resolution](../spacetime/singularity-resolution.md) |

### Quantum and Standard-Model Targets

| Target | Requirement | Owning chapters |
| --- | --- | --- |
| Mass map | Observed particle masses must be extracted as effective inertial response of retained branches — small observed mass from large shielded interior energy — with the extraction rule derived from the same branch record used for retention. | [Particle Masses](../assemblies/particle-masses.md) |
| Fermion generations | The three-generation ladder must be recovered as a structural ladder of the braid family — the working reading is a shielding-tier ladder — with the generation count derived from the delayed dynamics rather than postulated. | [Nested Shell Braid](nested-shell-braid.md#the-nested-shell-braid-hierarchy-and-fermion-generations), [Muon and Tau](../assemblies/fermions/muon-tau.md) |
| Spin-statistics and exchange | Fermionic antisymmetry and bosonic shared occupation must be recovered from braid envelope geometry plus an exchange sign consumed from the same retained row that supplies spinor closure, not from a separately selected bookkeeping sign. | [Fermi-Dirac and Bose-Einstein Statistics](../quantum/fermi-dirac-and-bose-einstein-statistics.md), [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md) |
| Photon and Maxwell recovery | The photon channel must be recovered as a propagating assembly of released action history whose superposed delayed potentials reproduce Maxwell behavior, transverse polarization, and propagation at the recovered signal speed. | [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md), [Radiation](../reactions/radiation.md) |
| Strong force and color | Color bookkeeping, gluon-like exchange, and confinement must be recovered from braid substructure and its interaction channels, including why isolated color-carrying assemblies are unstable. | [Color Charge and SU(3)](../assemblies/fermions/color-charge-su3.md), [Gluons](../assemblies/bosons/gluons.md), [Nucleon Structure](../nuclear-atomic/nucleon-structure.md) |
| Weak channel | Weak-interaction phenomenology — short range, flavor change, mixing structure — must be recovered from near-field braid interactions without a primitive massive mediator, with the mediator masses and mixing angle emerging as assembly properties. | [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md), [Weak Mixing Angle](../assemblies/fermions/weak-mixing-angle.md) |
| Net-charge quantization | Observer-level electric charge must arrive in the observed quantized units as a consequence of admissible dressing inventories over the braid's net polarity inventory, not as a primitive label. | [Quantum Number Mapping](../assemblies/fermions/quantum-number-mapping.md), [Architrino](../foundations/architrino.md#polarity-and-electric-bookkeeping) |
| Atomic spectra | Atomic energy levels and spectral lines must be recovered as electron-assembly resonance envelopes in the structured nuclear and Noether sea wake environment, with level spacing inherited from the action-transaction ledger. | [Atomic Spectra](../nuclear-atomic/atomic-spectra.md), [Atomic Structure](../nuclear-atomic/atomic-structure.md) |

### Cosmology-Era Targets

The fixed-void discipline makes the cosmological rows unusually sharp: with no expanding void available, every redshift-linked observable must be recovered from transport through the evolving Noether sea.

| Target | Requirement | Owning chapters |
| --- | --- | --- |
| Redshift transport rows | Surface-brightness dimming $(1+z)^{-4}$, light-curve time dilation $(1+z)$, and $T_{\mathrm{CMB}}(z)=T_0(1+z)$ must be recovered from transport physics rather than from tired-light energy loss. | [Expansion Mechanism](../cosmology/expansion-mechanism.md), [Cosmology Reconstruction](../cosmology/cosmology-reconstruction.md) |
| Era ladder | The observationally anchored era sequence — nucleosynthesis abundances, recombination and the CMB, structure formation — must be recovered with an effective scale history derived from the mass map and Noether sea response coefficients. | [BBN Constraints](../cosmology/BBN-constraints.md), [CMB](../cosmology/CMB.md), [Structure Formation](../cosmology/structure-formation.md) |
| Dark-sector accounting | The phenomena attributed to dark matter and dark energy must be recovered as Noether sea population, response, and gradient effects, or explicitly scoped as open residuals. | [Dark Matter](../cosmology/dark-matter.md), [Dark Energy](../cosmology/dark-energy.md) |

## Noether Sea Selection Burdens

The recovery rows above mostly consume one retained branch. The medium rows consume a population, and they add a burden that no single-branch success can discharge: the featured braid class must be shown to dominate the ambient medium. A class can serve as the Noether sea population only if it passes every entry of the selection residual defined in [Noether Sea](../spacetime/noether-sea.md#composition): retained-branch closure, local polarity neutrality, convergence of the far-population wake sum, dense packing without uncontrolled branch disruption, weak homogeneous transparency, a shared constitutive response across the refractive, clock, stress, and metric channels, compatibility with the particle-building program, and a production or recycling route that supplies sufficient abundance.

Transparency is a bounded-response condition, not zero coupling: the medium must keep direct loss, scattering, and preferred-frame visibility small while still supplying the constitutive response that clocks, photon transport, matter response, and neutrino-like propagation are recovered from. A candidate class that decouples entirely passes neither side of that check. The selection burden is therefore comparative — the featured class must pass while competing assembly classes either fail a row or are classified as localized matter, radiation, reaction, or strong-field branches — and it remains open even after any single branch is retained.

## Reading Discipline

Three rules keep this contract usable. First, requirements are not evidence: adding, sharpening, or reorganizing rows in this chapter changes no proof status anywhere. Second, claim levels travel with their owning chapters: a row stated here in working-theory voice may be a derivation, a closure target, or a comparison target at its source, and the source governs. Third, the ladder is ordered: any reported success should be located on the proof-burden ladder before it is celebrated, and any reported failure should be located on the first-failure ladder before it is generalized.
