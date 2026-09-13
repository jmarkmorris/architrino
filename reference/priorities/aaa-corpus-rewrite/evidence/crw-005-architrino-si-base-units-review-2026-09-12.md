# CRW-005 — SI Base Units bounded review — 2026-09-12

## Scope and disposition

Priority 70: [$\mathbb{A}\mathbb{A}\mathbb{A}$ and SI Base Units: Deep Intersection Analysis](../../../../content/markdown/aaa/validation/architrino-si-base-units.md). This worker reviewed the complete chapter and implemented SI-01–SI-23: 16 High and 7 Medium finding groups. Completion means bounded mathematical, notation, attribution, and claim-boundary repairs. It does not establish physical assemblies, quantization, EOM solver acceptance, observational recovery, or theory closure.

The only authored paths changed by this worker are the assigned chapter and this receipt. Shared CRW-005 records belong to the coordinator and were not edited. No Git-changing command or generated-artifact write was run.

Claim grade: measured. Initial scoped Git status showed no changes to either assigned path. The chapter baseline is commit c7a00b8116b24f6d70d081c24a503e0aba3366f4, whose file bytes were checked with Git show piped to shasum. Baseline SHA-256:

    27b928af5868dd182f476c300c35a5e3b49348fd1ffffee06db88dda869f02fc

The final chapter hash from shasum -a 256 is:

    424c915a88bd066fc542db7642bfe853527f8392879890aaca54d011e5dc42af

Falsifier: a fresh hash differing from this final value invalidates this receipt's byte-specific handoff until the changed text is reviewed.

## Authority and evidence

The worker used architrino-review, its maintained owner, and the live Corpus Reviewer procedure. The user's explicit repair instruction supplied the implementation authority. Repository startup, operator communication, theory orientation, and the current style and terminology authorities governed the pass. Relevant mathematical ownership was checked in Ontology, the Master Equation's canonical acceleration law, Parameter Ledger's dimensional and CODATA interfaces, the braid taxonomy's coordinate constraints, Entropy's ensemble distinction, and Particle Masses' reference-attractor boundary. Controlled canon was not edited.

External standards were used exclusively as observer-level definitions or comparison constraints:

- BIPM, *The International System of Units (SI)*, ninth edition (2019), version 4.01 (June 2026), [DOI: 10.59161/AUEZ1291](https://doi.org/10.59161/AUEZ1291), [brochure PDF](https://www.bipm.org/documents/20126/41483022/SI-Brochure-9.pdf). Inspected §§2.2–2.3.2, English printed pp. 124–131, covering defining constants, unit equations, proper-time interpretation of the second, measured molar-mass constant, and directional photometry. This source is distributed under CC BY 4.0; the chapter paraphrases and algebraically rearranges its definitions.
- NIST, [CODATA Recommended Values of the Fundamental Physical Constants: 2022](https://physics.nist.gov/cuu/pdf/wall_2022.pdf), the one-page constants table. It supports the quoted fine-structure and gravitational constants and their rounded standard uncertainties. No numerical update or new empirical result is claimed.

Pre-edit binding inventory by fixed-string search for the chapter path under content/, scripts/, tests/, and reference/ found the equation registry, scene and textbook graphs, Markdown index, generated reading copies, generated reference/source-index surfaces, scene configuration, and authored references. The existing parser showed 24 equation IDs; these are preserved. This is a bounded consumer search, not a claim that every possible byte-sensitive consumer was discovered. Generated artifacts remained read-only.

## Findings and repairs

Line numbers in the Baseline column refer to the immutable baseline above. Revised locations name sections of the linked chapter. High denotes a mathematical or evidence-boundary defect capable of changing an inference; Medium denotes a consequential scope, definition, or exposition defect.

| ID | Severity | Baseline | Finding, repair, grade, and falsifier |
| --- | --- | --- | --- |
| SI-01 | High | 3–17, 406–425, 489–508 | The introduction and conclusion promised to derive exact SI numerical conventions and reduce them to three or four fundamental parameters. Replaced this with physical ratios under declared units and an explicitly unresolved parameter count. Claim grade: derived at the unit-convention level. Rescaling a unit changes the numerical value without changing the physical quantity; a purported numerical prediction invariant under every such rescaling would overturn this diagnosis. |
| SI-02 | Medium | 9, 21–33, 119–145 | The history blurred four substantively redefined units with the uniform seven-constant formulation; the Cs definition omitted the unperturbed ground-state qualification. Corrected both and supplied checked BIPM attribution. Claim grade: measured by comparison with BIPM §2.3.1. Falsifier: the cited definition specifying a different transition or revision structure. |
| SI-03 | Medium | 35–64 | CODATA values lacked a direct source and definitions for their uncertainty notation; the precision discussion blurred dimensional and dimensionless comparisons. Named the rounded uncertainties, defined relative standard uncertainty, and explained inherited Planck-unit uncertainty. Claim grade: measured for source values, derived for division and square-root propagation. Falsifier: different quoted input uncertainties or a different dependence on $G$. |
| SI-04 | High | 66–77 | The benchmark-normalized residual lacked the conditions needed to interpret it statistically. Retained the diagnostic and added prediction uncertainty, covariance, and tuning restrictions. Claim grade: derived from the variance of a difference. Falsifier: an independently justified covariance model yielding a different variance under the same assumptions. |
| SI-05 | High | 79–114, 410–425 | The scale inventory omitted $\kappa$ and mixed derived geometry, state normalizations, and primitive inputs. Restored $R_*=\kappa\epsilon^2/c_f^2$, $T_*=R_*/c_f$, the mass-dimensional action conversion, and the distinction between dimensional scales and solved branches. Claim grade: derived from the canonical coupling dimensions. Falsifier: dimensional exponents inconsistent with the Master Equation or a complete independent parameter reduction. |
| SI-06 | Medium | 83–86, 500–505 | Bare $t$ named absolute time and the Euclidean void was said to have no intrinsic structure. Used canonical $T$ and distinguished its fixed metric from material contents. Claim grade: measured against notation and ontology owners. Falsifier: those live owners assigning a different clock symbol or denying the Euclidean metric. |
| SI-07 | High | 90 | The kernel description implied that regularization handled physical coincidence. It now names admitted positive-separation roots and the separate continuation burden. Claim grade: measured against the canonical Master Equation scope. Falsifier: an accepted finite coincidence continuation establishing the stronger claim for the same law. |
| SI-08 | High | 94–103 | The geometry description left axial half-separations unrestricted despite the coincident-midpoint member's zero-offset condition, and presented alignment and quantization as consequences. Stated the exact coordinate constraint, required a declared flattening operator, and separated prescribed geometry from dynamics and quantum recovery. Claim grade: measured for taxonomy, derived for non-implication. Falsifier: a retained theorem deriving those dynamical claims from precisely the stated data. |
| SI-09 | Medium | 97–103 | Super-wake-speed motion was used to identify a maximum-curvature radius, and reference density was grouped with universal geometry. Named a branch-specific curvature diagnostic and identified number-density normalization as state data. Claim grade: derived scope restriction. Falsifier: a theorem selecting a unique radius and universal density from the supplied data alone. |
| SI-10 | High | 129–151 | The Cs discussion referred to an unspecified source record and reduced the target to selected binary and nuclear channels without a time conversion. Recast that allocation as a hypothesis, included the full atomic inventory, and supplied the conditional frequency map $\widehat\nu_{\mathrm{Cs}}/(a_{\mathrm{clk}}T_*)$. Claim grade: derived for the clock chain rule; guessed for the assembly allocation. Falsifier: a complete atomic history and clock map contradicting the proposed assignment or conversion. |
| SI-11 | High | 148–152 | A one-polarity circular-current moment was presented as the path to the assembly magnetic moment. Replaced it with a signed effective-charge comparison, deriving current times area and requiring a full sum and observer map. Claim grade: derived within the stated circular-current comparison. Equal co-rotating opposite charges give zero total moment; a nonzero total for exactly that comparison would falsify the sum. |
| SI-12 | High | 168–192 | Operational $c$, substrate $c_f$, and candidate $c_\gamma$ were conflated; weak gradients were treated as enough for equality. Added local clock/ruler factors and the condition on $\chi_\gamma$. Claim grade: derived chain rule and counterexample. A constant $\chi_\gamma=2$ has zero gradient but $c_\gamma=c_f/2$; a claimed equality for that example without compensating readout factors fails. |
| SI-13 | High | 187–194, 437–439 | An unnamed $10^{-17}$ Lorentz-test number was applied to $c/c_f$, while dense sea and Planck scale were assigned unproved photon effects. Replaced these with experiment-specific observables and conditional constitutive predictions. Claim grade: inferred evidence restriction. Falsifier: a named experiment plus derived apparatus map supporting exactly the formerly claimed bound and regime. |
| SI-14 | High | 212–249 | The integer action relation was displayed as established, reused $n$ for density and excitation count, and left $\mathcal J_3$ ambiguous between state action and universal increment. Marked quantization as a target, introduced $N_3$, defined specific radian action and cycle conversion, and stated the canonical-reduction and independent-calibration requirements. Claim grade: derived dimensional and $2\pi$ identities; guessed quantization. Falsifier: a derived universal action spectrum or failure of the stated cycle/radian definition. |
| SI-15 | High | 256–259 | The ampere equation multiplied charge by C/s, producing charge squared per time. Corrected it to $e/(1.602176634\times10^{-19})$ times inverse seconds. Claim grade: derived quantity algebra. Falsifier: failure to recover charge/time dimensions and unit value one after substituting the exact SI charge. |
| SI-16 | Medium | 265–275 | Charge calibration was called recovery and the spectrum mixed confined quark assignments with isolated objects while omitting multiply charged ions. Separated calibration, physical realization, confined fractions, integer isolated charges, and the unresolved exclusion of $e/6$ carriers. Claim grade: inferred scope repair grounded in the observer-level spectrum. Falsifier: a demonstrated isolated carrier inconsistent with the stated regime or a derived confinement map. |
| SI-17 | Medium | 293–307 | A one-half equipartition value labeled total kinetic energy lacked its per-term meaning and classical-access conditions. Defined one quadratic term, the independent six-mode sum, and its reference energy. Claim grade: derived within the classical equilibrium comparison. Falsifier: a normalizable classical quadratic ensemble satisfying the assumptions but violating the Gaussian energy average. |
| SI-18 | High | 290–320, 415–424, 451–454 | The chapter proposed deriving $k_B$ from mass/speed and broadly excluded configuration energy. Replaced the undetermined function with the entropy-derivative thermal-energy relation, held the ensemble variables fixed, and excluded only inaccessible energy. Claim grade: derived dimensional and thermodynamic-comparison identity; physical ensemble recovery open. Falsifier: a complete independent temperature-unit dimension in the claimed mass/speed inputs, or a contrary entropy derivative within the declared ensemble. |
| SI-19 | High | 324–332 | The velocity second moment counted coherent group motion as heat and did not declare its observer chart. Used the centered effective velocity variance, with scalar-inertia and three-mode assumptions. Claim grade: derived. A common velocity shift changes the raw second moment but leaves centered variance invariant; failure of that identity overturns the repair. |
| SI-20 | High | 339–362, 401, 424 | The mole formula inverted the correct quantity relation, and $N_A$ was said to follow from proton mass. Corrected the unit equation and counting relation, retained $N_A=M_u/m_u$, and explained that measured atomic mass and exact entity count have different roles. Claim grade: derived and BIPM-verified. Falsifier: a units-consistent contrary counting definition or a derivation selecting the arbitrary Avogadro number from particle masses. |
| SI-21 | High | 369–374 | The candela expression inverted luminous efficacy and omitted the radiant-intensity geometry. Corrected it to $(K_{\text{cd}}/683)\,\mathrm{W\,sr^{-1}}$ and explained lumen versus candela. Claim grade: derived and BIPM-verified. Falsifier: failure of the corrected expression to have luminous-intensity units or to recover the one-candela reference intensity. |
| SI-22 | Medium | 378–387 | Radiant power was identified with photon count rate, and the SI definition was used to assert retinal resonance and an internal photon phase. Added photon energy to the observer-level power relation, separated standardized photometry from individual perception, and kept internal/biological assignments conditional. Claim grade: derived for energy/time accounting; guessed for biological and assembly mappings. Falsifier: a consistent power definition without energy per photon, or a supplied microscopic derivation establishing the stronger assignments. |
| SI-23 | High | 461–485 | The fine-structure formula and undetermined running function allowed circular reconstruction, while the reference scale and action quantity lacked clear meanings. Explained permittivity's measured status, required response normalization at the reference scale, and defined the energy-scale and action symbols. Claim grade: derived algebra and inferred predictive boundary. Falsifier: a response computed independently of the target data that supplies predictive residuals under the fixed map. |

The revised chapter retains the original review scope and all original headings, including the existing Closure Priorities navigation. Its remaining physical targets are not newly accepted work or evidence of completion.

## Explicit analytical witnesses

These witnesses establish bounded algebra and counterexamples, not substrate dynamics.

1. From $e=n_e\,\mathrm{A\,s}$, division by $n_e$ and one second gives one ampere. The old expression had dimensions $\mathrm Q^2/\mathrm T$.
2. From $N_A=n_A\,\mathrm{mol^{-1}}$, one mole is $n_A/N_A$. The old right side had inverse-amount dimensions because a specified entity count is dimensionless.
3. From $K_{\text{cd}}=683\,\mathrm{cd\,sr\,W^{-1}}$, multiplication by $\mathrm{W\,sr^{-1}}/683$ gives one candela. The old product cancelled to a dimensionless quantity.
4. The coupling dimensions give $[R_*]=\mathrm L$, $[T_*]=\mathrm T$, and $[\kappa\epsilon^2/c_f]=\mathrm L^2/\mathrm T$. Multiplication by $\mu_{\text{arch}}$ gives action dimensions. Mass times speed squared gives energy, with no temperature dimension; a mass ratio has no amount dimension.
5. With $c_f=1$, constant $\chi_\gamma=2$ gives $c_\gamma=1/2$, while $\chi_\gamma=1/2$ gives 2. Neither homogeneity nor positivity alone supplies the claimed equality or ceiling. Clock and ruler factors 4 and 2 respectively produce an operational speed of $1/4$ in this formal map; these are arithmetic examples, not realized media.
6. The chain rule gives cycles per clock time as cycles per absolute time divided by $a_{\mathrm{clk}}$. It also gives operational speed as substrate group speed times $b_{\mathrm{rul}}/a_{\mathrm{clk}}$.
7. In the circular-current comparison, $Q=1$, $\omega_{\mathrm{eff}}=2$, and radius 3 give moment 9; the equal co-rotating charge of opposite sign contributes $-9$. These effective comparison units do not instantiate a substrate charge law.
8. By definition, cycle action is $2\pi$ times radian action. A constant conjugate momentum 3 around an angle cycle gives radian action 3; choosing 3.25 gives 3.25. The closed integral itself does not select integer increments or prove a physically realized orbit.
9. For one classical quadratic coordinate with energy $a x^2/2$, a Gaussian weight $\exp[-a x^2/(2\theta)]$ and integration by parts give $a\langle x^2\rangle=\theta$. Each term therefore contributes $\theta/2$, and six independent terms give $3\theta$, where $\theta=k_BT_{\mathrm{temp}}$. The vanishing boundary term and equilibrium measure are essential.
10. The samples $(-1,1)$ and $(9,11)$ both have centered variance 1, but raw second moments 1 and 101. Treating the latter as temperature incorrectly turns a coherent velocity shift into heating.
11. For the explicit entropy comparison $S_*=(d/2)\ln(E/E_{\mathrm{ref}})$ with fixed positive reference energy, the inverse derivative is $2E/d$; $d=6$, $E=3$ gives thermal energy 1. This tests differentiation and dimensional consistency, not the physical choice of entropy.
12. Uncorrelated uncertainties 3 and 4 give difference variance 25; covariance 6 changes it to 13. This is why one benchmark uncertainty is insufficient when prediction uncertainty matters.
13. Dividing the rounded CODATA uncertainties gives $u_r(\alpha)=1.5073959909534913\times10^{-10}$ and $u_r(G)=2.2474266964325848\times10^{-5}$, consistent with the chapter's rounded approximations.
14. Observer SI arithmetic gives $299792458/(540\times10^{12})=555.1712185185185\,\mathrm{nm}$. The SI value of $c$ in this calculation is not a numerical assignment to primitive $c_f$.
15. Defining $\epsilon_0=e^2/(4\pi\hbar c\,\alpha_{\mathrm{input}})$ and substituting back returns $\alpha_{\mathrm{input}}$ exactly. Likewise, defining the running function as a measured curve divided by its anchor merely restates the data.

## Validation and preservation

Claim grade: measured. Before target checks, the in-session Node instrument passed a known Markdown sample containing one heading, two links, two valid TeX expressions, and one stable equation ID, while ignoring a fenced fake link and invalid TeX. A deliberately invalid KaTeX command and a nonexistent local path were detected. Separately, the dimension/arithmetic helper passed known velocity and inverse-unit identities and rejected wrong dimensions and arithmetic before use on chapter witnesses.

Two instrument-preparation defects were exposed and corrected rather than counted as target failures. An over-precise manually transcribed expected alpha uncertainty was replaced by the independently specified three-significant-digit rounding interval. A JavaScript replacement-string insertion collapsed double-dollar delimiters in the in-memory baseline; callback insertion was first tested on a known double-dollar sample, and the corrected preservation run required the baseline SHA-256 before parsing. Neither error changed chapter mathematics. Final target results below use the corrected instruments.

- Node dimensional/arithmetic witnesses: all 15 declared groups passed, including seven correct unit equations and three rejected old dimension expressions; new substrate examples used $c_f=1$.
- Repository equation parser plus baseline comparison: all 24 original equation IDs preserved in order. Thirteen display bodies are unchanged; eleven changed intentionally. All 25 original headings remain, with one Sources heading added. All 35 original link occurrences remain; the chapter has 44 links after adding sources and relevant canon.
- KaTeX with throwOnError and strict error mode: all 270 chapter expressions passed. This checks syntax, not physical truth.
- Relative-path existence checks: all local destinations extracted from the chapter resolve. This check does not validate external uptime or every fragment anchor.
- Pre-receipt strict content check: 0 errors, 0 warnings, 30 notes; 391 scene files, 199 content Markdown files, and 1720 repository Markdown files audited at that shared-tree snapshot.
- Equation registry check: exit 1, stale generated registry at content/generated/equation-mapping/corpus-equations.json; 199 Markdown files and 4685 display equations inspected. No missing equation links were reported. Expected drift after authored source/context changes remains deferred.
- Scoped Git diff check and direct chapter whitespace check passed.
- Final two-file Node check, after its recorded known-case pass: 270 chapter and 68 receipt TeX expressions passed KaTeX with throwOnError and strict error mode. All 40 chapter and one receipt local destinations resolved; direct trailing-whitespace checks passed for both files, including the new receipt outside tracked Git diff coverage.
- First post-receipt `node scripts/validate-content.mjs --check --strict`: exit 0, 0 errors, 0 warnings, 30 notes; 391 scene files, 199 content Markdown files, and 1724 repository Markdown files audited at that shared-tree snapshot. The changed repository count reflects the shared snapshot, not this worker's two-file edit count.
- Latest repeated `node scripts/validate-content.mjs --check --strict`: exit 1, 4 errors, 0 warnings, 30 notes across 1725 repository Markdown files. All four errors are outside this worker's two-file scope, in crw-005-hubble-s8-tensions-review-2026-09-12.md: line 199 has relative targets equation-mapping.html#corpus-equation-0123456789abcdef and missing-fixture; line 204 has AGENTS.md and missing. The validator resolves these relative to the evidence directory and reports missing paths. This worker did not edit that receipt or attribute the errors to a particular change. The latest whole-repository gate is not green; the two-file TeX, local-path, whitespace, and identity checks remain passing.
- Final `node scripts/build-equation-mapping-corpus.mjs --check`: exit 1 solely reporting the stale generated registry; 199 Markdown files, 4685 displays, 23 promoted equations, and 30481 symbol definitions inspected. No generated write was performed.
- Final `git --no-optional-locks diff --check -- content/markdown/aaa/validation/architrino-si-base-units.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-architrino-si-base-units-review-2026-09-12.md`: exit 0. The independently scoped Node comparison against the hash-verified baseline confirmed the equation, heading, and link preservation counts above.

Integration caution, measured by final scoped Git status and working-tree diff: the chapter was staged and the receipt was staged with further working-tree edits, although this worker made no Git writes. The staged receipt still contained the pending-validation placeholder and an extra blank line at EOF; the scoped cached diff check returned exit 2 for that blank line. The final working-tree receipt replaces the placeholder and removes that blank line. Integration must use the completed working-tree receipt, not the earlier index snapshot; this worker did not change the index.

The eleven changed display identities, retained in place, are:

| Equation ID suffix | Change |
| --- | --- |
| d7d54a608eba2015 | Replace an unspecified Cs frequency function with an explicit conditional clock-conversion target |
| f61b3d6b23fd83d3 | Standardize the metre's unit-symbol notation; quantity relation unchanged |
| aaa74c94b6bb625d | Name the effective speed and mark substrate matching as a target |
| 781f2ac09c5affe0 | Mark action quantization as a target and distinguish the excitation index |
| 0ea5b1cad3404774 | Repair ampere dimensions |
| 727378deccb8f892 | Identify one quadratic energy term |
| 053769453c128364 | Replace supposed derivation of the kelvin convention with the thermal-energy entropy derivative |
| df39b3f7358076e5 | Center the effective velocity variance |
| 6eb9f380eafc80fe | Repair mole inversion |
| cf962aafd06dee6e | Repair candela inversion and solid-angle factor |
| 3760e7503aee13bf | Disambiguate the reference probe energy scale |

Full IDs retain the prefix corpus-equation-. No display equation was added or deleted.

The exact deferred regeneration command is:

```bash
node scripts/build-equation-mapping-corpus.mjs --write
```

After an authorized regeneration, rerun its --check. This review does not authorize that write.

## Open obligations and handoff

- SI-O1: Physical atomic, charged-assembly, photon, and reference-assembly existence; retained dynamics and stability must precede identity or spectrum claims.
- SI-O2: A common observer clock/ruler/charge/action map with declared calibrations, uncertainties, and holdout observables. This includes a complete Cs hyperfine calculation and experimentally discriminable speed effects.
- SI-O3: An independently derived action functional and universal quantum increments. Periodicity, geometric taxonomy, and a fitted action scale do not establish quantum statistics or the Planck relation.
- SI-O4: Physical ensemble measures, accessible energy and inertia, equilibrium limits, and constitutive medium response. The entropy derivative and Gaussian comparison do not construct these objects.
- SI-O5: Predictive electromagnetic response and parameter reduction with input accounting across observables. Neither an arbitrary response function nor dimensional analysis demonstrates a complete reduction.

The coordinator can integrate SI-01–SI-23 after checking the final chapter hash and the two-file validation above. Generated-registry refresh remains a separate authorized integration action. No shared board count was changed by this worker.
