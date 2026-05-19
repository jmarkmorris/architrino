# Chapter Authoring and Source Mining

## Workstream Metadata

- Kind: `priority`
- Rank: `15`
- Value: `4.19`
- Cost: `2.7`
- ROI: `1.55`
- Status: `queued`

## Task Queue

1. `mine_source_material` — Mine legacy and external source material only where it materially saves time. Status: `pending`. Depends on: `fill_thin_chapters`.

## Scope

This is the ranked queue for source-material mining and corpus integration. 

## Core Theory Focus Constraint

During the current core geometrical theory push, do not treat chapter coverage as a substitute for solving the mathematics. Use this queue only when the chapter work adds or clarifies definitions, equations, closure targets, proof routes, or worked examples that directly serve the active theory stack.

## Scorecard Use

- For scorecard purposes, this is the main Coverage bucket.
- Under the validated-closure scorecard, Coverage+Interface Readiness has weight `2`, so this queue improves reader and corpus completeness without substituting for certified equations, coefficients, parameters, or benchmark validation.
- If the goal is the fastest validated-closure score increase, pair this workstream with [residual-routing-event-ledger](../tri-binary-causal-closure/residual-routing-event-ledger.md), [exposure-quotient-theorem](../mass-map/exposure-quotient-theorem.md), and [mass-map](../mass-map/mass-map.md) rather than treating prose coverage as the main lift.
- Rule of thumb to retain: a `+10` point gain in Coverage+Interface Readiness adds about `+0.2` to the weighted total; high-weight categories such as Empirical Precision+Benchmark Validation, Formula+Coefficient Recovery, Master EOM+Local Dynamics, Parameter+Scale Closure, and Potential+Action Closure move the total more.

## Source Mining Feeds

- Mine material from WordPress and other prior social material (twitter).
- Mine old PowerPoint decks, cleaning them up only when migration into the web site or $\mathbb{A}\mathbb{A}\mathbb{A}$ corpus is worthwhile.
- Mine archived papers, arXiv-style papers, and local PDF paper collections for definitions, examples, derivation routes, and source leads.
- Mine YouTube videos and course playlists when transcripts, slides, or lecture notes can be reduced into concrete chapter material.
- Mine David Kaiser's MIT OCW `STS.042J/8.225J` course sequence, especially Lecture 23, `The Birth of Particle Cosmology`, plus the surrounding late-course particle-cosmology lectures.

## Candidate Source-Mining Backlog

Use this backlog as a triage surface, not as a requirement factory. A source earns mining time only when it can yield at least one concrete artifact: a numerical benchmark, derivation route, worked example, source lead, canonical table or figure, visual explanation, or reader-facing bridge for the active $\mathbb{A}\mathbb{A}\mathbb{A}$ theory stack.

### Tier 1: Closure Benchmarks And Numerical Anchors

| Source family | Mine first | $\mathbb{A}\mathbb{A}\mathbb{A}$ value | Priority destination |
| --- | --- | --- | --- |
| Particle Data Group, [Review of Particle Physics](https://pdg.lbl.gov/) and `pdgLive` | Current 2025 update plus the 2024 review tables; particle masses, widths, lifetimes, CKM/PMNS, neutrinos, QCD, electroweak fits, cosmological parameters, constants, and statistics reviews. | Replaces the already mined 2018 PDG snapshot with current benchmark values and uncertainty conventions. | [standard-model-closure](../standard-model-closure/standard-model-closure.md), [mass-map](../mass-map/mass-map.md), [validation-gates](../validation-gates/validation-gates.md) |
| NIST/CODATA [fundamental constants](https://physics.nist.gov/cuu/Constants/) and uncertainty guides | 2022 CODATA constants; $G$, $\alpha$, $\hbar c$, particle mass ratios, SI conversion factors, and uncertainty notation. | Anchors parameter-scale closure and prevents informal constants from leaking into equations. | [mass-map](../mass-map/mass-map.md), [master-equation-closure](../master-equation-closure/master-equation-closure.md), [validation-gates](../validation-gates/validation-gates.md) |
| Living Reviews / Clifford Will / SME-style Lorentz-test baselines | [The Confrontation between General Relativity and Experiment](https://link.springer.com/article/10.12942/lrr-2014-4), modern PPN tests, preferred-frame bounds, and [Data Tables for Lorentz and CPT Violation](https://physics.nmu.edu/~nrussell/research/datatables.htm). | Sharpens the Lorentz / GR bridge into concrete PPN, synchronization, clock-retuning, and leakage bounds. | [tri-binary-causal-closure](../tri-binary-causal-closure/tri-binary-causal-closure.md), [master-equation-closure](../master-equation-closure/master-equation-closure.md), [cross-theory-mapping](../cross-theory-mapping/cross-theory-mapping.md) |
| GWOSC / LVK gravitational-wave public data | [GWOSC catalogs and APIs](https://gwosc.org/eventapi/), strain data, parameter-estimation releases, waveform tutorials, and event visualizations. | Gives strong-field, radiation, inspiral, ringdown, and energy-accounting benchmarks with open data. | [strong-field-closure](../strong-field-closure/strong-field-closure.md), [tri-binary-causal-closure](../tri-binary-causal-closure/tri-binary-causal-closure.md), [simulations](../simulations/simulations.md) |
| CMB / BAO / low-redshift cosmology data | [Planck Legacy Archive maps](https://wiki.cosmos.esa.int/planck-legacy-archive/index.php/Maps), [NASA LAMBDA](https://lambda.gsfc.nasa.gov/), [DESI BAO cosmology products](https://data.desi.lbl.gov/doc/releases/dr1/vac/bao-cosmo-params/), ACT lensing and power-spectrum papers, SH0ES, Pantheon+, DES, and Euclid public releases when available. | Separates $\Lambda$CDM-era observer variables from $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology while preserving redshift, distance, transfer-function, and tension benchmarks. | [cosmology-closure](../cosmology-closure/cosmology-closure.md), [cross-theory-mapping](../cross-theory-mapping/cosmological-redshift-distance-ladder.md), [validation-gates](../validation-gates/validation-gates.md) |
| Event Horizon Telescope public data and image papers | [EHT public data](https://eventhorizontelescope.org/for-astronomers/data), M87*, Sgr A*, polarization, visibility-domain reconstructions, and jet-launch follow-up papers. | Supplies image-level and visibility-level strong-field constraints without treating black-hole imagery as a loose analogy. | [strong-field-closure](../strong-field-closure/strong-field-closure.md), [cross-theory-mapping](../cross-theory-mapping/gravitational-lensing.md), [validation-gates](../validation-gates/validation-gates.md) |

### Tier 2: Derivation, Proof, And Theory-Bridge Sources

| Source family | Mine first | $\mathbb{A}\mathbb{A}\mathbb{A}$ value | Priority destination |
| --- | --- | --- | --- |
| MIT OCW and MIT-hosted relativity notes beyond Tong | MIT [8.962 General Relativity](https://ocw.mit.edu/courses/8-962-general-relativity-spring-2020/), Scott Hughes' [typed notes](https://web.mit.edu/sahughes/www/8.962/index.html), and Alan Guth-era lecture notes/slides. | Independent derivation scaffolds for curvature, stress-energy, gravitational radiation, cosmology, and gravitational energy. | [tri-binary-causal-closure](../tri-binary-causal-closure/tri-binary-causal-closure.md), [strong-field-closure](../strong-field-closure/strong-field-closure.md), [chapter-authoring](chapter-authoring.md) |
| Review journals and survey families discoverable through OpenAlex | Reviews of Modern Physics, Living Reviews in Relativity, Physics Reports, Annual Review of Astronomy and Astrophysics, Annual Review of Nuclear and Particle Science, and high-citation arXiv reviews. | Better source discovery than random keyword mining; use citation counts as prioritization signals, not as proof of relevance. | All ranked workstreams, especially [master-equation-closure](../master-equation-closure/master-equation-closure.md), [proof-programs](../proof-programs/proof-programs.md), and [standard-model-closure](../standard-model-closure/standard-model-closure.md) |
| CERN Academic Training, CERN Yellow Reports, and summer-student lecture material | [CERN Academic Training Lectures](https://cds.cern.ch/collection/Academic%20Training%20Lectures?ln=en), Standard Model, detectors, Higgs, flavor, dark matter, dark energy, and inflation lecture sequences. | Turns Standard Model and detector explanations into concrete provenance examples: what enters, what exits, what is measured, and which variables are reconstructed. | [standard-model-closure](../standard-model-closure/standard-model-closure.md), [angular-momentum-spin](../angular-momentum-spin/angular-momentum-spin.md), [cross-theory-mapping](../cross-theory-mapping/cross-theory-mapping.md) |
| TASI / Les Houches / ICTP lecture notes | TASI cosmological perturbations, inflation, early-universe cosmology, dark matter, amplitudes, SMEFT, neutrinos, black holes, and lattice/QCD lecture notes. | Dense bridge material between graduate pedagogy and review literature; often includes equations, exercises, and source leads. | [cosmology-closure](../cosmology-closure/cosmology-closure.md), [quantum-closure](../quantum-closure/quantum-closure.md), [standard-model-closure](../standard-model-closure/standard-model-closure.md) |
| Independent QFT / gauge / amplitudes references | Srednicki's [Quantum Field Theory draft](https://web.physics.ucsb.edu/~mark/ms-qft-DRAFT.pdf), Arkani-Hamed scattering-amplitude lectures, positive-geometry papers, and gauge/topological-field notes. | Comparison framework for gauge covariance, scattering, locality emergence, color/kinematics structure, and geometry-first amplitude language; do not import as ontology. | [standard-model-closure](../standard-model-closure/geometry-first-program.md), [proof-programs](../proof-programs/proof-programs.md), [quantum-closure](../quantum-closure/quantum-closure.md) |
| Condensed-matter, analogue-gravity, and topological-defect sources | Volovik-style emergent-medium material, analogue-gravity reviews, topological phases, vortices, defects, elasticity, pressure response, and transport papers. | Useful only when the source supplies order parameters, transport equations, quantized-defect analogues, criticality, or constitutive response. Avoid analogy-only promotion. | [mass-map](../mass-map/mass-map.md), [dark-sector](../dark-sector/dark-sector.md), spacetime and Noether-Sea corpus targets through priority promotion |

### Tier 3: Video And Seminar Archives

| Source family | Mine first | $\mathbb{A}\mathbb{A}\mathbb{A}$ value | Mining rule |
| --- | --- | --- | --- |
| Perimeter Institute [PIRSA](https://pirsa.org/node) | Foundational physics, quantum gravity, black holes, cosmology, quantum information, and PSI core lecture series with PIRSA IDs and slides. | Citable seminar records and slides; good for source leads and current expert problem framing. | Mine transcript/slide pairs only when the talk yields a named equation, theorem target, benchmark, or source lead. |
| KITP [Online Talks](https://www.kitp.ucsb.edu/online-talks) | Program talks with slides on black holes, quantum matter, cosmology, non-equilibrium dynamics, amplitudes, and gravitational waves. | Dense frontier material with speaker-provided PDFs and discussion Q&A. | Treat as source discovery first; promote only equations, constraints, and source leads. |
| IAS / Cornell / Simons Center video lecture collections | Arkani-Hamed amplitudes, positive geometry, quantum spacetime, black holes, cosmology, and mathematical-physics lectures. | Good for disciplined comparison frameworks where spacetime, locality, and quantum mechanics are derived rather than assumed. | Route speculative geometry claims to discussion before canonization. |
| CERN videos and public detector lectures | Detector walkthroughs, event reconstruction, trigger systems, Standard Model lectures, and open-data tutorials. | High value for end-to-end measurement provenance: collision, detector response, reconstruction, particle ID, uncertainty. | Prefer official slides and open-data notebooks over popular summaries. |
| Sean Carroll, Quanta, Royal Institution, and similar long-form interviews/lectures | Episodes with primary researchers on black holes, cosmology tensions, quantum foundations, amplitudes, and Standard Model anomalies. | Mostly explanatory and source-lead value, not closure evidence. | Mine only when transcripts are available and the episode points to papers, equations, or clear reader explanations. |

### Tier 4: Image, Diagram, And Data Mining

| Source family | Mine first | $\mathbb{A}\mathbb{A}\mathbb{A}$ value | Mining rule |
| --- | --- | --- | --- |
| CMB maps and spectra | Planck component maps, CMB lensing maps, temperature/polarization power spectra, WMAP comparison images, and likelihood documentation. | Visual bridge for effective cosmological variables, transfer functions, redshift, and observer-level $\Lambda$CDM summaries. | Preserve data provenance and avoid decorative use. |
| Collider event displays | [CERN Open Data CMS event display](https://opendata.cern.ch/visualise/events/CMS), ATLAS/CMS public images, event-selection tutorials, and detector-slice diagrams. | Explains Standard Model reconstruction and measurement without relying on cartoon particle language. | Use as provenance diagrams; record collision channel, visible objects, and reconstruction variables. |
| Gravitational-wave visual products | GWOSC waveform plots, spectrograms, sky-localization maps, parameter-corner plots, and public notebooks. | Direct visual bridge for radiation, inspiral, merger, ringdown, and parameter inference. | Mine alongside the underlying event metadata, not as standalone illustrations. |
| EHT imagery and visibility-domain products | M87* and Sgr A* images, polarization maps, visibility amplitudes, closure phases, and reconstruction comparison figures. | Strong-field visual benchmark for compact-object shadows, plasma environment, and observer reconstruction. | Separate measured image products from GR model interpretation. |
| Large-scale structure visuals | SDSS/DESI galaxy maps, BAO summary plots, weak-lensing maps, supernova Hubble diagrams, and distance-ladder diagrams. | Helps readers see which cosmological quantities are observations, which are fitted model variables, and which are $\mathbb{A}\mathbb{A}\mathbb{A}$ translation targets. | Mine source data and caption logic; do not treat survey-map aesthetics as evidence. |
| Educational simulations and public-domain teaching diagrams | [PhET simulations](https://phet.colorado.edu/?lang=en), OpenStax figures, Feynman Lectures diagrams, and MIT OCW public-domain NASA/mission images. | Supports chapter explanations for waves, interference, relativity, fields, and measurement. | Use for explanatory scaffolding only; verify license before reusing an image. |

### OpenAlex Sweep Lanes To Add Under Priority Folders

| Priority folder | OpenAlex lane | Expected artifact |
| --- | --- | --- |
| [master-equation-closure](../master-equation-closure/master-equation-closure.md) | State-dependent delay equations, neutral functional equations, variational principles with delay, event-driven root finding, direct-action electrodynamics. | History-chart theorem targets, smoothness obligations, and action-level wake-history accounting. |
| [proof-programs](../proof-programs/proof-programs.md) | Choreographies, computer-assisted periodic-orbit proofs, interval methods, topological degree, validated ODE/DDE numerics. | Candidate-cycle certificate grammar and residual/collocation acceptance rows. |
| [simulations](../simulations/simulations.md) | DDE solvers, validated integration, adaptive event handling, stiff regularization, convergence testing, negative controls. | Simulation acceptance predicates and convergence/failure-mode rows under existing gates. |
| [mass-map](../mass-map/mass-map.md) | High-pressure condensed matter, elastic moduli, equation-of-state data, shielding/screening analogues, lattice/DFT benchmarks. | Medium-response tensor probes, pressure-response coefficients, and scale estimates. |
| [tri-binary-causal-closure](../tri-binary-causal-closure/tri-binary-causal-closure.md) | Lorentz tests, clock synchronization, effective metrics, PPN, redshift-distance tests, radiation reaction. | Moving-assembly, clock-retuning, synchronization, and preferred-frame leakage targets. |
| [angular-momentum-spin](../angular-momentum-spin/angular-momentum-spin.md) | Spinor geometry, geometric phase, angular momentum in fields, polarization, Bell and Stern-Gerlach experiments. | Noether-core angular-momentum ledger, spinor closure route, photon/measurement prerequisites. |
| [standard-model-closure](../standard-model-closure/standard-model-closure.md) | SMEFT, anomaly cancellation, confinement, flux tubes, flavor mixing, neutrino oscillations, electroweak fits. | Geometry-first gauge closure, weak-sector provenance, CKM/PMNS compatibility, and nuclear-binding bridge rows. |
| [quantum-closure](../quantum-closure/quantum-closure.md) | Born-rule derivations, transfer operators, quantum trajectories, decoherence, pilot-wave stress tests, Bell experiments. | Basin-measure theorem targets and detector-response kernels. |
| [cosmology-closure](../cosmology-closure/cosmology-closure.md) | CMB perturbations, BAO, BBN, distance ladder, redshift drift, growth of structure, Hubble-tension reviews. | Effective-variable translation targets and falsifiable transfer-function constraints. |
| [strong-field-closure](../strong-field-closure/strong-field-closure.md) | Black-hole perturbation theory, numerical relativity, EHT constraints, compact-object alternatives, gravitational-wave catalogs. | Strong-field observable ledger tied to images, waveforms, and ringdown spectra. |

### Immediate Mining Order

1. Current PDG plus NIST/CODATA: quickest way to refresh constants, particle values, units, and uncertainty conventions.
2. GWOSC, EHT, Planck/LAMBDA, and DESI: strongest open-data bridge for gravity, radiation, strong-field, and $\Lambda$CDM-era constraints.
3. MIT 8.962, CERN Academic Training, TASI, PIRSA, and KITP: highest-yield derivation and source-lead reservoirs.
4. Feynman Lectures, OpenStax, PhET, and public lecture material: use only for explanation, diagrams, and student-facing worked intuition.

## Mining Completed

| Source mined | Date mined |
| --- | --- |
| Curt Jaimungal's long-form physicist interviews, source window January 1, 2025 through May 17, 2026 | May 17, 2026 |
| David Tong, [Dynamics and Relativity](https://davidtong.org/pdfs/teaching/dynamics-and-relativity/dynrel.pdf) | May 18, 2026 |
| David Tong, [Classical Dynamics](https://davidtong.org/pdfs/teaching/classical-dynamics/clas.pdf) | May 18, 2026 |
| David Tong, [Vector Calculus](https://davidtong.org/pdfs/teaching/vector-calculus/vc.pdf) | May 18, 2026 |
| David Tong, [Electromagnetism](https://davidtong.org/pdfs/teaching/electromagnetism/electro.pdf) | May 18, 2026 |
| David Tong, [Quantum Mechanics](https://davidtong.org/pdfs/teaching/quantum-mechanics/qm.pdf) | May 18, 2026 |
| David Tong, [Topics in Quantum Mechanics](https://davidtong.org/pdfs/teaching/topics-in-quantum-mechanics/topicsinqm.pdf) | May 18, 2026 |
| David Tong, [Solid State Physics](https://davidtong.org/pdfs/teaching/solid-state-physics/solidstate.pdf) | May 18, 2026 |
| David Tong, [Quantum Hall Effect](https://davidtong.org/pdfs/teaching/quantum-hall-effect/qhe.pdf) | May 18, 2026 |
| David Tong, [Fluid Mechanics](https://davidtong.org/pdfs/teaching/fluid-mechanics/fluids.pdf) | May 18, 2026 |
| David Tong, [Kinetic Theory](https://davidtong.org/pdfs/teaching/kinetic-theory/kinetic.pdf) | May 18, 2026 |
| David Tong, [Mathematical Biology](https://davidtong.org/pdfs/teaching/mathematical-biology/mathbio.pdf) | May 18, 2026 |
| David Tong, [Statistical Physics](https://davidtong.org/pdfs/teaching/statistical-physics/statphys.pdf) | May 18, 2026 |
| David Tong, [Statistical Field Theory](https://davidtong.org/pdfs/teaching/statistical-field-theory/sft.pdf) | May 18, 2026 |
| David Tong, [General Relativity](https://davidtong.org/pdfs/teaching/general-relativity/gr.pdf) | May 18, 2026 |
| David Tong, [Cosmology](https://davidtong.org/pdfs/teaching/cosmology/cosmo.pdf) | May 18, 2026 |
| David Tong, [Quantum Field Theory](https://davidtong.org/pdfs/teaching/quantum-field-theory/qft.pdf) | May 18, 2026 |
| David Tong, [Gauge Theory](https://davidtong.org/pdfs/teaching/gauge-theory/gauge.pdf) | May 18, 2026 |
| David Tong, [Particle Physics](https://davidtong.org/pdfs/teaching/particle-physics/pp.pdf) | May 18, 2026 |
| David Tong, [The Standard Model](https://davidtong.org/pdfs/teaching/standard-model/standardmodel.pdf) | May 18, 2026 |
| David Tong, [Supersymmetric Quantum Mechanics](https://davidtong.org/pdfs/teaching/supersymmetric-quantum-mechanics/susyqm.pdf) | May 18, 2026 |
| David Tong, [Supersymmetric Field Theory](https://davidtong.org/pdfs/teaching/supersymmetric-field-theory/susy.pdf) | May 18, 2026 |
| David Tong, [String Theory](https://davidtong.org/pdfs/teaching/string-theory/string.pdf) | May 18, 2026 |
| David Tong, [Solitons and D-Branes](https://davidtong.org/pdfs/teaching/solitons/tasi.pdf) | May 18, 2026 |
| Elisabete M. de Gouveia Dal Pino, `0406319.pdf`, `Astrophysical Jets and Outflows` | May 18, 2026 |
| Phillip James Edwin Peebles, `10.1140--epjh--e2016-70034-0.pdf`, `Robert Dicke and the naissance of experimental gravity physics, 1957-1967` | May 18, 2026 |
| Cormac O'Raifeartaigh, Brendan McCann, Werner Nahm, and Simon Mitton, `1402.0132.pdf`, `Einstein's steady-state theory: an abandoned model of the cosmos` | May 18, 2026 |
| Justin Khoury, `1409.0012.pdf`, `An Alternative to Particle Dark Matter` | May 18, 2026 |
| Lasha Berezhiani and Justin Khoury, `1506.07877.pdf`, `Dark Matter Superfluidity and Galactic Dynamics` | May 18, 2026 |
| Lasha Berezhiani and Justin Khoury, `1507.01019.pdf`, `Theory of Dark Matter Superfluidity` | May 18, 2026 |
| Justin Khoury, `1507.03013.pdf`, `A Dark Matter Superfluid` | May 18, 2026 |
| Alexander Unzicker, `1510.0082v1.pdf`, `Robert Dicke's Momentous Error - A Comment on Rev.Mod.Phys. 29 (1957), p. 363` | May 18, 2026 |
| G. Gamow, `158549a0.pdf`, `Rotating Universe` | May 18, 2026 |
| Ralph A. Alpher and Robert Herman, `162774b0.pdf`, `Evolution of the Universe` | May 18, 2026 |
| Cormac O'Raifeartaigh, Michael O'Keeffe, Werner Nahm, and Simon Mitton, `1701.07261.pdf`, `Einstein's 1917 Static Model of the Universe: A Centennial Review` | May 18, 2026 |
| Cormac O'Raifeartaigh, Michael O'Keeffe, Werner Nahm, and Simon Mitton, `1711.06890.pdf`, `One Hundred Years of the Cosmological Constant: from 'Superfluous Stunt' to Dark Energy` | May 18, 2026 |
| Jean Bricmont and Sheldon Goldstein, `1804.03401.pdf`, `Diagnosing the Trouble With Quantum Mechanics` | May 18, 2026 |
| Cormac O'Raifeartaigh and Simon Mitton, `1804.06768.pdf`, `Interrogating the legend of Einstein's "biggest blunder"` | May 18, 2026 |
| Elisa G. M. Ferreira, Guilherme Franzmann, Justin Khoury, and Robert Brandenberger, `1810.09474.pdf`, `Unified Superfluid Dark Sector` | May 18, 2026 |
| Roger Blandford, David Meier, and Anthony Readhead, `1812.06025.pdf`, `Relativistic Jets in Active Galactic Nuclei` | May 18, 2026 |
| Lasha Berezhiani and Justin Khoury, `1812.09332.pdf`, `Emergent long-range interactions in Bose-Einstein Condensates` | May 18, 2026 |
| Alexander Blum and Dieter Brill, `1905.05988v1.pdf`, `Tokyo Wheeler or the Epistemic Preconditions of the Renaissance of Relativity` | May 18, 2026 |
| R. H. Dicke, P. J. E. Peebles, P. G. Roll, and D. T. Wilkinson, `1965ApJ___142__414D.pdf`, `Cosmic Black-Body Radiation` | May 18, 2026 |
| A. A. Penzias and R. W. Wilson, `1965ApJ___142__419P.pdf`, `A Measurement of Excess Antenna Temperature at 4080 Mc/s` | May 18, 2026 |
| Contemporary Physics Education Project, `2014-fund-chart.pdf`, `The Standard Model of Fundamental Particles and Interactions` | May 18, 2026 |
| Alexander Blum and Stefano Furlan, `2206.14664v1.pdf`, `How John Wheeler lost his faith in the law` | May 18, 2026 |
| Murray Gell-Mann, `8foldway1961gellmann.pdf`, `The Eightfold Way: A Theory of Strong Interaction Symmetry` | May 18, 2026 |
| Carroll O. Alley, Darryl Leiter, Yutaka Mizobuchi, and Huseyin Yilmaz, `9906458.pdf`, `Energy Crisis in Astrophysics (Black Holes vs. N-Body Metrics)` | May 18, 2026 |
| Gordon Kane, `Are virtual particles really constantly popping in and out of existence? Or are they merely a mathem.pdf`, `Are virtual particles really constantly popping in and out of existence? Or are they merely a mathematical bookkeeping device for quantum mechanics?` | May 18, 2026 |
| R. H. Dicke, `DickeRevModPhys.29.363.pdf`, `Gravitation without a Principle of Equivalence` | May 18, 2026 |
| P. A. M. Dirac, `Dirac.pdf`, `Quantised Singularities in the Electromagnetic Field` | May 18, 2026 |
| P. A. M. Dirac, `Dirac1938.pdf`, `Classical Theory of Radiating Electrons` | May 18, 2026 |
| Freeman Dyson, `Dyson - Is A Graviton Detectable - poincare2012.pdf`, `Is a Graviton Detectable?` | May 18, 2026 |
| J. S. Farnes, `JSFarnes-1712.07962.pdf`, `A unifying theory of dark energy and dark matter: Negative masses and matter creation within a modified Lambda-CDM framework` | May 18, 2026 |
| Louis de Broglie, `Phil-Mag-47-446-1924.pdf`, `A Tentative Theory of Light Quanta` | May 18, 2026 |
| Ralph A. Alpher, H. Bethe, and George Gamow, `PhysRev.73.803.pdf`, `The Origin of Chemical Elements` | May 18, 2026 |
| M. Tanabashi et al. (Particle Data Group), `PhysRevD.98.030001.pdf`, `Review of Particle Physics` | May 18, 2026 |
| Roger Penrose, `PhysRevLett.14.57.pdf`, `Gravitational Collapse and Space-Time Singularities` | May 18, 2026 |
| K. P. Sinha, C. Sivaram, and E. C. G. Sudarshan, `The_superfluid_vacuum_state_time-varying_cosmologi.pdf`, `The Superfluid Vacuum State, Time-Varying Cosmological Constant, and Nonsingular Cosmological Models` | May 18, 2026 |
| F. Hoyle, G. Burbidge, and J. V. Narlikar, `burbidge2.pdf`, `On the Hubble constant and the cosmological constant` | May 18, 2026 |
| F. Hoyle, G. Burbidge, and J. V. Narlikar, `burbidge3.pdf`, `Further astrophysical quantities expected in a quasi-steady state Universe` | May 18, 2026 |
| F. Hoyle, G. Burbidge, and J. V. Narlikar, `burbidge4.pdf`, `Astrophysical deductions from the quasi-steady-state cosmology` | May 18, 2026 |
| F. Hoyle, G. Burbidge, and J. V. Narlikar, `burbidge5.pdf`, `A Quasi-Steady State Cosmological Model with Creation of Matter` | May 18, 2026 |
| Masataka Fukugita and P. J. E. Peebles, `cosmicenergyinventory.pdf`, `The Cosmic Energy Inventory` | May 18, 2026 |
| Chen Zhang and Xin Zhang, `pbh-2302.07002v3.pdf`, `Gravitational capture of magnetic monopoles by primordial black holes in the early universe` | May 18, 2026 |
| Xin-Zhe Wang and Can-Min Deng, `pbh-2401.00555v2.pdf`, `The primordial black holes solution to the cosmological monopole problem` | May 18, 2026 |
| De-Chang Dai and Dejan Stojkovic, `pbh-2409.14321v2.pdf`, `Searching for small primordial black holes in planets, asteroids and here on Earth` | May 18, 2026 |
| Sheldon Goldstein, `qm-bohm_sc.pdf`, `Bohmian Mechanics` | May 18, 2026 |
| K. P. Sinha, C. Sivaram, and E. C. G. Sudarshan, `superfluid_1976_001.pdf`, `Aether as a Superfluid State of Particle-Antiparticle Pairs` | May 18, 2026 |
| K. P. Sinha and E. C. G. Sudarshan, `superfluid_1978_006.pdf`, `The Superfluid as a Source of All Interactions` | May 18, 2026 |
| B. L. Hu, `spacetimecondensateHU.pdf`, `Can Spacetime be a Condensate?` | May 18, 2026 |
| Jan Sieber, [Finding periodic orbits in state-dependent delay differential equations as roots of algebraic equations](https://arxiv.org/abs/1010.2391), arXiv v10 with journal reference DOI `10.3934/dcds.2012.32.2607` | May 18, 2026 |
| K. Engelborghs, T. Luzyanina, K. J. in 't Hout, and D. Roose, [Collocation Methods for the Computation of Periodic Solutions of Delay Differential Equations](https://doi.org/10.1137/S1064827599363381) | May 19, 2026 |
| Harvey Segur and Martin D. Kruskal, [Nonexistence of small-amplitude breather solutions in $\phi^4$ theory](https://doi.org/10.1103/PhysRevLett.58.747) | May 19, 2026 |
| Kristian B. Dysthe and Karsten Trulsen, [Note on Breather Type Solutions of the NLS as Models for Freak-Waves](https://doi.org/10.1238/Physica.Topical.082a00048) | May 19, 2026 |
| Bo-Ling Guo and Li-Ming Ling, [Rogue Wave, Breathers and Bright-Dark-Rogue Solutions for the Coupled Schrodinger Equations](https://doi.org/10.1088/0256-307X/28/11/110202) | May 19, 2026 |
| David J. Kedziora, Adrian Ankiewicz, and Nail Akhmediev, [Second-order nonlinear Schrodinger equation breather solutions in the degenerate and rogue wave limits](https://doi.org/10.1103/PhysRevE.85.066601) | May 19, 2026 |
| Jochen Denzler, [Nonpersistence of breather families for the perturbed sine Gordon equation](https://doi.org/10.1007/BF02108081) | May 19, 2026 |
