# CRW-005 Theory Mapping Review — 2026-09-13

## Scope and outcome

Full 1244-line baseline review of [Theory Mapping](../../../../content/markdown/aaa/philosophy-history/theory-mapping.md), with segmented reads recovering the middle omitted by the initial output limit, followed by chapter-local corrections and diff inspection. The comparison matrix, historical interpretations, ontology stance and all section headings remain. No additional speculative sector was made mandatory. Scoped `git --no-optional-locks status` showed no pre-existing chapter changes.

Baseline chapter SHA-256: `66eafb5c1c91b51c3f9dfe0c6375ae947db7f2d8659b9c7caa5aef0ac46883d6`.

Final chapter SHA-256: `a4c1fe39b8e4c06e6084b2c095b3beaca638a474d534d670adefb05aa97b7cc7`.

## Findings

| ID | Severity | Repair and disposition |
| :--- | :--- | :--- |
| TM-01 | High | Marked proposed ontology relocations and individual SM, quark, neutrino, Higgs, GR, dark-sector, bounce, quantum and measurement mappings at their actual conditional level. A change of variables or geometrical analogy does not establish the effective law. |
| TM-02 | High | Replaced the suggestion that finite axial permutations supply continuous Standard Model gauge factors. Continuous generators, representations, dynamics and exact observed-family selection remain distinct proof targets. |
| TM-03 | Medium | Declared the scalar action’s real-field, natural-unit and mostly-minus signature convention. Declared the spin table’s same signature and its opposite wave-operator sign relative to the separate mostly-plus Klein–Gordon entry. Existing formulas remain consistent on those domains. |
| TM-04 | High | Replaced established gluon-vortex/confinement claims with the current proposed color-corridor interpretation and retained spin/response proof burdens. The confinement target now includes string breaking rather than indefinite linear energy growth in full QCD. |
| TM-05 | High | Separated global phase symmetry and a conditional charge theorem from local QED gauge covariance and its compensating connection. Fixed primitive polarity alone does not derive a continuous phase symmetry or gauge dynamics. Photon carrier stability and field mapping remain open. |
| TM-06 | Medium | Declared the neutrino mixing display’s state-expansion convention, conjugate to a common charged-current field convention. Mode labels alone do not extract a PMNS matrix. |
| TM-07 | Medium | Separated technicolor from composite-Higgs model families; a condensate produces electroweak breaking only with an appropriate transforming representation/orientation. SUSY geometric pairings do not derive its graded algebra. PQ, SUSY, composite and unconfirmed LQG spectra remain optional comparisons. |
| TM-08 | High | Removed the claim that variable signal speed and straight-line motion alone yield universal effective geodesics. Null and timelike response, the variational map and metric coefficients require one derived record. |
| TM-09 | High | Corrected inverse-square potential language: isolated Newtonian potential scales as minus inverse distance, while acceleration magnitude scales as inverse distance squared. Dilution alone does not supply the gravitational coefficient or mass map. |
| TM-10 | Medium | Distinguished spacetime interval from momentum mass shell and declared the massive four-momentum relation. Restricted the algebraic MOND relation to symmetric settings or a phenomenological prescription rather than a general field equation. |
| TM-11 | Medium | Supplied observer-unit and density conventions for Friedmann and equation-of-state displays, identified reduced versus unreduced Planck conventions, and identified holographic-dark-energy `c` as a dimensionless model parameter rather than either speed. Effective Friedmann renaming is a conditional ansatz. |
| TM-12 | Medium | Bounded the potential slow-roll parameter to a canonical scalar; a small slope alone does not control potential curvature or initial kinetic energy. Required an equilibrium background before the scalar-mode linearization target. |
| TM-13 | Medium | Defined the CMB mode power as an isotropic ensemble quantity, distinct from a finite-sky estimator and its covariance. |
| TM-14 | High | Identified the BBN equations as schematic local two-body collision terms, not full physical-density cosmological evolution. Dilution, transport, inverse/decay and combinatorial terms must be restored under the declared record. Reaction cross sections are effective assembly quantities. |
| TM-15 | Medium | Restricted Sakharov language to its usual symmetric-initial, CPT-preserving setting. Distinguished assembly production needed to compensate effective dilution from a fixed physical volume with no dilution. |
| TM-16 | High | Corrected the contracting constant-equation-of-state exponent to `2/[3(1+w)]`. Specified flat single-component GR comparison and negative-time branch; bounded the local bounce condition by smoothness, positive finite scale factor and separate continuation checks. |
| TM-17 | Medium | Replaced source-process phrasing with the actual Boyle–Finn–Turok primary model and its conditional consequences. Neither that proposal nor holographic capacity is an established substrate derivation. |
| TM-18 | Medium | Clarified that relativistic energy expansion motivates a kinetic operator only with inherited quantum structure. Speeds are illustrative tolerance-dependent comparisons; Planck-normalized examples are selected examples, not a universal validity range. Rounded legacy values remain intact. |
| TM-19 | Medium | Bounded the Pauli row to external magnetic coupling with zero scalar potential and Dirac `g=2`; removed primitive-speed spin identification for massive W/Z modes. Specified normalized/projectable outcome domains and the spinless, no-vector-potential, nonnodal Bohm guiding-law domain. |
| TM-20 | High | Qualified count entropy by a finite equiprobable configuration set or dimensionless reference volume. The physical measure and thermodynamic law are not supplied by counting or naming an ensemble. Quantum current, Born probabilities, reduced-state dynamics and definite records remain independent recovery targets. |

Disposition: twenty chapter-local findings repaired, nine High and eleven Medium. This is expository and mathematical closure of the listed defects, not completion of the mapped physics programs.

## Independent mathematical checks

- A finite permutation group has finitely many elements and no nontrivial continuous one-parameter subgroup; it cannot itself equal positive-dimensional connected groups such as SU(3), SU(2) or U(1). Supplying a representation space and generators is additional structure, and does not yet derive a physical gauge spectrum.
- Variation of the retained scalar action in signature `(+---)` yields `box_plus phi + m² phi + V'(phi)=0`. For the free field, multiplying by minus one and using `box_minus=-box_plus` gives the retained separate Klein–Gordon display. Plane waves give positive `omega²=k²+m²` in observer natural units. No scalar action is imposed on primitive architrino dynamics.
- For `D=partial+ieA`, transforming the matter field by `exp(-ie alpha(x))` and the connection by `A+partial alpha` gives covariant transformation of `D psi`. A constant phase omits the derivative term and cannot establish local connection behavior. This direct algebra supports TM-05 separately from the chapter’s wording.
- Differentiating `Phi=-GM/r` gives radial acceleration `-GM/r²`; confusing potential with acceleration loses one length dimension. Separately, a spatially varying optical propagation speed constrains null rays but alone does not specify massive-particle response or both weak-metric potentials.
- A conserved count in physical volume proportional to `a³` has `dn/dt=-3Hn` even with zero collision terms. Thus the displayed BBN collision sum cannot be the complete physical-density evolution in an expanding chart. In natural units a two-body cross section times speed times two densities has the required density/time dimension.
- Under flat constant-`w` GR comparison assumptions, continuity gives `rho proportional to a^[-3(1+w)]`; combining with Friedmann gives the contracting power `a proportional to (-t)^[2/(3(1+w))]`. Dust and radiation recover exponents `2/3` and `1/2`. These are independent analytic checks of the corrected bracket, not an imported substrate cosmology.
- A constant nonzero gauge-singlet condensate preserves the gauge action on it, so condensation alone does not imply electroweak breaking. Likewise a normalized vector is required for `|a><a|` to be an idempotent rank-one projector; the selective update requires nonzero denominator. The Bohm expression divides by the wavefunction and therefore excludes nodes.
- A count entropy formula assumes equal weights or a declared reference volume. Nonuniform discrete weights need weighted entropy; an uncountable history space has no unqualified finite configuration count. Establishing a physical sampling measure is separate from this mathematical identity.

The in-session numerical instrument passed known cases first: `gamma(0)=1`, `gamma(0.6)=1.25`, and zero kinetic energy gives zero speed. It then used only the chapter’s existing observer rest-energy inputs. Electron speed ratios for 1 eV, 13.6 eV, 10 keV, 50 keV and 100 keV were 0.00197835, 0.00729567, 0.194985, 0.412686 and 0.548220. Electron kinetic energies at speed ratios 0.1 and 0.3 were 2574.3236 and 24673.5516 eV; proton values using the retained 938 MeV input were 4725470.713 and 45291176.845 eV. These support approximate legacy comparisons (10 keV’s `0.20c` is deliberately coarse), not exact quoted precision or universal approximation thresholds. No legacy value was silently relabeled as a primitive wake-speed calculation.

## Live owners and primary references

- [Gauge Structure Emergence](../../../../content/markdown/aaa/assemblies/gauge-structure-emergence.md), opening and lines 177–199, separates passive local chart covariance from an actual assembly derivation. [Gluons](../../../../content/markdown/aaa/assemblies/bosons/gluons.md), opening claim boundary, lines 57–78 and 131–152, grades corridor realization, confinement and spin as proposed while preserving conditional operator identities.
- [Emergent Metric](../../../../content/markdown/aaa/spacetime/emergent-metric.md), lines 290–330, separates timelike variational and null-eikonal requirements. [Effective Lagrangian](../../../../content/markdown/aaa/dynamics/effective-lagrangian.md), lines 1080–1148, retains residual-controlled quantum chart, measure and spinor obligations. Those owners prevent promoting a geometrical analogy to a recovery theorem.
- [Li, A Model of Holographic Dark Energy](https://arxiv.org/pdf/hep-th/0403127), equation (1), PDF p. 2, retrieved lines 23–39, defines the numerical constant and reduced Planck mass. Its horizon-choice discussion is model-specific, not a derived architrino bound.
- [Boyle, Finn and Turok, CPT-Symmetric Universe](https://arxiv.org/abs/1803.08928), abstract, explicitly identifies the right-handed-neutrino dark-sector proposal and massless-lightest-neutrino consequence under that model. This is a cited comparison, not a new mandatory target.
- [Tong, Gauge Theory, section 1](https://www.damtp.cam.ac.uk/user/tong/gaugetheory/1em.pdf) was opened as an author’s technical reference for the local gauge comparison. The gauge-sign calculation above is the independent check; no premise is imported into architrino dynamics.

## Preservation and validation

The custom in-memory marked extractor first passed one known link and fenced-code exclusion case. The math extractor first passed two inline/display spans with inline-code exclusion; KaTeX rejected an invalid command. On the target, all 344 final TeX spans passed strict KaTeX with `throwOnError: true` and `strict: 'error'`. There are 54 displays; 53 are byte-identical to HEAD. The sole changed display is zero-based index 33, the ekpyrotic exponent; its viewer identity `corpus-equation-87c1f8b343a7ce9f` is unchanged.

Every original link and all headings were preserved by comparison to `git show HEAD:<chapter>`. There are 86 final links, including 84 existing local targets checked by direct path resolution. The two new external model links were opened. The checks do not validate every fragment inside every neighboring document. The legacy numerical table entries were preserved.

`git diff --check HEAD -- content/markdown/aaa/philosophy-history/theory-mapping.md` passed. `node scripts/validate-content.mjs --check --strict` passed with zero errors/warnings (199 corpus Markdown / 1753 repository Markdown before this receipt). Receipt paths, whitespace and embedded final hash were checked separately. No generated write was performed; equation-index regeneration, if needed after source edits, belongs to the authorized publication/regeneration procedure rather than this review.

## Remaining obligations

- TM-O1: Continuous gauge representations, family selection, corridor dynamics, confinement, charge/energy maps and effective gravity remain with the technical owners. Independent retained derivations could supersede these conditional descriptions.
- TM-O2: Cosmological observer maps, full reaction/transport networks, measures, quantum probability/current and apparatus records remain required for physical recovery. The comparison equations do not instantiate them.
- TM-O3: Optional theories remain comparisons with model-specific assumptions and evidence. A newly established sector or independently derived correspondence could change its status; no new empirical search or exhaustive survey was performed here.

No neighboring chapter, runtime, fixture, generated artifact, shared record or Git index was written. The coordinator owns integration of this completed bounded review.
