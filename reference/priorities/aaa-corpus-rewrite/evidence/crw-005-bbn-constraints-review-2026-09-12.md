# CRW-005 BBN Constraints Review — 2026-09-12

## Scope and disposition

Priority 63, [BBN Constraints](../../../../content/markdown/aaa/cosmology/BBN-constraints.md), received a complete bounded review and editorial self-review. BBN-01–BBN-20 record twenty repaired mathematical, notation, attribution, and evidence-boundary findings: fifteen High and five Medium. High means that the defect can change a physical or mathematical conclusion; Medium means that a definition, comparison, or interpretation lacks a necessary qualification.

The assignment authorizes only that chapter and this receipt. Shared status, priorities, work-log, and work-queue integration belongs to the coordinator. This review does not establish an SMBH reactor, retained particle branch, EOM solver acceptance, theory closure, or cosmological recovery. The local-reactor interpretation remains discoverable at guessed grade. The mathematical checks establish the specific identities and counterexamples below, not the physical viability of that interpretation.

The review skill routed this work through the live Corpus Reviewer procedure; the explicit assignment authorizes safe repairs beyond its review-only default. The startup instructions, generated router, maintained review owner, Corpus Reviewer, Theory Orientation, skills policy, operator explanation standard, execution template, academic and mathematical style guides, mathematical terminology, terminology usage, comparative glossary, About Architrino, and geometry/dynamics role packet supplied the workflow and authoring rules. Foundation openings and the Master Equation opening supplied the primitive/effective boundary. Black Holes, Expansion Mechanism, Nucleon Structure, and neutrino chapter passages supplied nearby canon. The specific owners control where older guide summaries are more permissive. No controlled guide was edited.

## Provenance and preservation

The two authorized paths had no entries under scoped git status before editing, and the chapter had no difference from HEAD under git diff. Both commands used the top-level Git option --no-optional-locks. The chapter baseline is retained at commit 5549583a1fa498a72e90aa1a170f26bec10dbd54; this identifies bytes, not causal authorship. Baseline references below use its 450-line chapter. The retained object's hash was verified separately with git show piped to shasum -a 256.

Baseline SHA-256:

~~~text
8ae9f4ff618fd7b6fb3f6ca449d56dec42dec31d99d84672227ab5f5d506d706
~~~

Final chapter SHA-256, measured by shasum -a 256:

~~~text
cb1110c051a060af5d02b0c29c44b34d66b3bfc84eacca746502ca9b36e121d0
~~~

The final chapter has 465 lines by captured source enumeration. A fence-aware inventory, tested first on a known miniature document, found all 33 original headings unchanged, all 28 original links retained with the same labels and targets, and all 17 display/viewer identities retained in order. There are 35 final links. Eleven display bodies intentionally changed; six remain byte-identical. This is structural preservation, not mathematical equivalence of changed formulas.

The pre-edit path search with rg -l -F 'BBN-constraints.md' over scripts/, tests/, content/graph/, content/generated/, reference/, and .agents/ found the scene graph, textbook TOC and reading copies, equation-mapping and cosmology priority references, source history, and CRW conversion/status owners. The generator source declares content/generated/equation-mapping/corpus-equations.json as its registry. These binding and navigation surfaces remained read-only. The search does not establish exhaustive consumer absence or fixture freshness.

Claim grade: measured for source state, hashes, and preservation using the named instruments and scopes. Falsifier: different bytes at either cited source, changed or missing preserved identities, or edits outside the two authorized paths attributable to this review. This is a live-checkout snapshot, not a claim about concurrent agents' files.

## Findings and repairs

Every finding below is resolved at the bounded repair level. Underived physics remains open even where its overstatement has been repaired. Baseline and final references identify chapter lines.

### BBN-01 — High: standard chronology was conflated with a singular origin

Baseline 7–12, 427–450; final 9–14, 440–463. The old starting window omitted weak freeze-out and presented a singularity as part of the reaction calculation. It also attributed all light elements to one epoch. The repair distinguishes early thermal yields, weak versus nuclear timing, later processing, and extrapolation to an initial singularity. Claim grade: inferred scope correction, with standard chronology checked against PDG §24.2. Falsifier: a demonstrated dependence of the finite-temperature reaction calculation on a specified singular boundary rather than on finite thermal initial data.

### BBN-02 — High: the SMBH mechanism and nucleon architecture exceeded their evidence

Baseline 3–35, 51–76, 230–237; final 3–37, 53–77, 241–248. Recurring nucleosynthesis, maximum-curvature compression, and release were asserted without a local reactor calculation; protons and neutrons were called nucleon Noether braids. The live Nucleon Structure owner treats nucleons as composite color-singlet assembly targets. The repair preserves the recurring-source hypothesis, defines its native entities, makes saturation and escape obligations explicit, and separates empirical reaction inputs from their assembly derivation. Claim grade: inferred from the evidentiary gap and measured comparison with the named canon. Falsifier: a same-history reactor derivation and composite-nucleon mapping establishing the stronger statements.

### BBN-03 — High: the number-density network omitted dilution and reaction structure

Baseline 77–86; final 79–91. A source-free expanding element has constant species count but changing density. The old equation gave zero density derivative when reaction rates vanished. Differentiating $N_i=n_iV$ yields the repaired volume term. Directed rates and signed stoichiometric multiplicities also represent one-body channels, photodissociation, reverse reactions, and identical-reactant counting. Claim grade: derived from population bookkeeping; count eight at volumes one and two gives densities eight and four. Falsifier: failure to conserve $n_iV$ under the repaired reaction-free, source-free equation, or a miscounted event under the declared stoichiometry.

### BBN-04 — Medium: incoming energy categories overlapped

Baseline 88–108; final 93–111. Compact-object release is a provenance label, whereas photons and baryons are carrier labels; summing both can count the same energy twice. The repair requires disjoint incoming transfers and identifies stored, outgoing, reaction, and work terms needed for a balance. Claim grade: derived accounting distinction. A one-unit photon release remains one unit regardless of how many source labels describe it. Falsifier: a declared disjoint partition and complete balance warranting the original thermal-record inference.

### BBN-05 — Medium: time layers, temperature units, and local variables were underdefined

Baseline 110–137, 325–350, 362, 378; final 113–142, 338–365, 375, 391. Bare source-history time, temperature notation, and temperature expressed directly in MeV obscured layer and unit choices. The repair uses $t_{\mathrm{eff}}$, $T_{\mathrm{temp},s}$, and $k_BT_{\mathrm{temp}}$, defines the observer calibration $c_0$, and limits the radiation-era time–temperature relation to its comparison assumptions. The native/effective clock map remains required. Claim grade: measured notation defect and derived dimensional distinction. Falsifier: remaining ambiguous working-time symbols or temperature/energy substitution in the scoped chapter.

### BBN-06 — High: the deuterium estimate hid neutron availability

Baseline 145–157; final 151–162. The old schematic expression depended only on photon loading and temperature, although deuterium equilibrium also depends on neutron density. Its positive temperature power after blackbody substitution was not itself an error. The repair gives the dilute-gas relation with spin factor $3/4$, reduced nucleon mass, explicit $n_n$, and chemical-equilibrium derivation. It distinguishes equilibrium from the final surviving yield. Claim grade: derived within the stated observer-comparison gas assumptions. Falsifier: failure of Maxwell–Boltzmann substitution, the zero-neutron limit, or dimensional consistency of $n_n(\hbar^2/(\mu_{np}k_BT_{\mathrm{temp}}))^{3/2}$.

### BBN-07 — High: per-particle forward and reverse weak rates were equated

Baseline 180–190; final 185–195. Detailed balance equates event flows, not rates per differently populated species. The repair derives the neutron-fraction equation, fixed-bath equilibrium, and relaxation rate $\lambda_{n\to p}+\lambda_{p\to n}$. With rates seven and one in an effective-time unit, equilibrium is $X_n=1/8$ and $n_n/n_p=1/7$, while relaxation rate is eight. The thermal-change comparison remains approximate. Claim grade: derived. Falsifier: substitution fails to give zero derivative at equilibrium or exponential perturbation relaxation at the rate sum.

### BBN-08 — High: the FLRW density law was imported into local cooling

Baseline 190–204; final 197–212. Relabeling the expansion rate did not derive its square-root dependence on local radiation density. The display now names $H_{\mathrm{FLRW}}$, declares energy-density units and the fixed-coupling Friedmann comparison, and sums active flavors explicitly. Local transport owes its own response law. Claim grade: inferred missing constitutive implication. Falsifier: a derivation from the same local transport and clock history reproducing the square-root law over the claimed domain.

### BBN-09 — High: effective neutrino loading lacked a fixed normalization

Baseline 204–214, 409–415; final 214–224, 422–428. A source-dependent single-neutrino denominator can conceal excess energy by dividing it out; the epoch was unspecified. The repair uses the late-time reference $(7/8)(4/11)^{4/3}\rho_\gamma$, excludes electron–positron annihilation from that instantaneous interpretation, and distinguishes theoretical calculation from observational inference. Three equal species twice the reference neutrino temperature give loading 48, not three. Claim grade: derived normalization counterexample; the convention is checked against Bennett et al., equation (1). Falsifier: failure to recover three for three reference thermal species or failure of fourth-power energy scaling at fixed photon bath.

### BBN-10 — High: the electron chemical-potential contribution was omitted

Baseline 216–228; final 226–239. Weak chemical equilibrium gives $\mu_n+\mu_{\nu_e}=\mu_p+\mu_e$. The leading exponent therefore includes $+\xi_e-\xi_{\nu_e}$. The neutrino-only expression requires a negligible electron contribution, which was not established for the compact-source bath. The repair names both chemical potentials and common-temperature equilibrium assumptions. Claim grade: derived. Falsifier: inconsistent signs under chemical-potential substitution, or application to a nonthermal bath without an independently computed weak-rate ratio.

### BBN-11 — High: model exposure was labeled observed and treated as sufficient yield data

Baseline 301–323; final 313–336. The integral measures neutron-induced processing under a specified history, not a directly observed quantity or a complete BBN network. The repair uses a reference-history superscript, defines clock and units, and limits exposure equivalence to branches claiming that history. For equal material weights and exposures zero and two, mean survival is $(1+e^{-2})/2=0.5676676416$, whereas survival at the mean exposure is $e^{-1}=0.3678794412$. Claim grade: derived nonlinear counterexample. Falsifier: a separately proved reduction that makes exposure sufficient and commutes with the declared mixing operation.

### BBN-12 — Medium: injection units, spectral norms, and change baselines were unspecified

Baseline 325–352; final 338–365. The mass-function measure and per-object spectrum now specify number per volume, mass, time, and energy. Covariance positivity, weighted yield norm, spectral domains, and measures must be supplied before evaluation. Injection-induced $\delta_{\mathrm{inj}}N_{\text{eff}}$ is distinct from observation-relative $\Delta N_{\text{eff}}$. A baseline ten with target zero is repaired by a shift minus ten: a large change can yield zero observation residual. Claim grade: derived distinction between change and error; measured missing definitions. Falsifier: dimensional inconsistency of the defined injection integral or treatment of its change norm as observational goodness of fit.

### BBN-13 — High: componentwise bounds were an unqualified acceptance test

Baseline 280–299; final 291–311. The repair requires positive tolerances fixed before comparison, named observation models, correlation treatment, and a specified neutrino reference. An error vector $(0.8,0.8)$ passes a unit maximum-norm box but has Euclidean length $1.13137$; that box is not a covariance-based confidence contour. Stellar surface lithium requires a processing map; net versus total baryon counting requires negligible antimatter or separate populations. Claim grade: derived statistical counterexample and inferred missing definitions. Falsifier: a declared likelihood and transport model justifying the particular acceptance region and comparison surfaces.

### BBN-14 — High: uncertainty on a mean was treated as reactor dispersion

Baseline 358–366; final 371–379. The Cooke et al. value is retained as a dated seven-system benchmark. Its combined-mean error is not a direct upper limit on source variation; the helium inference has the same distinction. For independent equal-variance draws, the mean's standard error is population standard deviation divided by the square root of sample size, before measurement errors and selection. Saturation of two source variables also leaves residence-time and composition variation unresolved. Claim grade: derived statistical distinction and inferred missing population map. Falsifier: a likelihood using individual measurements and the selected source population that establishes a specific intrinsic-dispersion bound.

### BBN-15 — High: stellar processing was used as passive homogenization

Baseline 251–266; final 262–277. The repair distinguishes material mixing from nuclear processing and limits homogeneity to specified samples. Deuterium destruction during stellar processing is checked against PDG §24.3. Ratios must use transported counts: channels with $(D,H)=(1,1)$ and $(9,3)$ yield combined D/H of 2.5, whereas averaging their ratios gives two. These arbitrary dimensionless counts test aggregation only. Claim grade: derived counterexample and inferred scope correction. Falsifier: a source-to-observer transport calculation preserving all isotope distributions under the proposed processing mechanism.

### BBN-16 — High: dilution, cooling, and a one-second duration were conflated

Baseline 66–68, 368–374; final 66–68, 381–387. Volume dilution contributes $d\ln V/dt_{\mathrm{eff}}$, while the isotropic Hubble-like scale is one third of it. Cooling follows a separate thermal law. Speed without a length cannot set duration, and wake speed is not a proved upper bound on constituent velocity. The repair also supplies helium counting: if almost all neutrons enter helium and $r=n_n/n_p\le1$, then $Y_p=2r/(1+r)$, so $Y_p>1/2$ requires $r>1/3$. Claim grade: derived kinematic, dimensional, and counting corrections. Falsifier: failure of the volume identity in its declared chart or of the counting relation under its assumptions.

### BBN-17 — High: laminar cooling and order-unity depth were promoted to sufficient physics

Baseline 376–392; final 389–405. A non-monotonic history with negligible integrated destruction can preserve D, so monotonic laminar flow is not necessary. Scattering depth does not establish thermal photon number, and an order-unity relaxation depth leaves finite deviations. The repair separates number loading, energy density, spectrum, thermalizing exposure, and yields. It compares photon energy density to baryon rest-energy density rather than mass density. Claim grade: derived dimensional and limiting-case corrections; inferred missing transport sufficiency. Falsifier: a necessity theorem for monotonic flow or a thermalization calculation achieving the required spectrum and isotope precision under the original condition.

### BBN-18 — High: a lithium hypothesis was labeled a prediction

Baseline 239–247, 261, 394–400; final 250–258, 272, 407–413. The earlier conjecture qualification conflicted with the later statement that depletion emerges as a prediction. The repair keeps preferential mass-7 reduction as a candidate and requires channel-resolved yields, material weighting, parameter range, and stellar processing. Claim grade: inferred from the internal claim mismatch. Falsifier: a validated calculation producing the lithium change while preserving D and helium over the declared source population.

### BBN-19 — Medium: equation-of-state stiffness was treated as outflow closure

Baseline 402–407; final 415–420. Pressure is not generally a function of density alone in a heated reacting mixture. The repair declares the barotropic restriction, identifies energy density in $w=P/u$, and separates sound-speed response from pressure-gradient acceleration and boundary conditions. A stiff uniform medium has no pressure-gradient-driven outflow merely by being stiff. Claim grade: derived limiting counterexample and inferred missing constitutive data. Falsifier: a full thermal/composition relation and dynamical balance establishing the proposed outward acceleration and timing.

### BBN-20 — Medium: eternal-background and attractor claims exceeded their implications

Baseline 417–450; final 430–463. The repair separates unmarked absolute time from singular-event continuation, attraction from its basin and relaxation time, and an early source label from a source-before-star chronology. The speculative interpretation survives without a claim that tuned boundary histories are eliminated or explanatory superiority demonstrated. Claim grade: inferred scope correction. Falsifier: a derived accessible attractor, same-history enrichment chronology, and quantitative comparison establishing those advantages.

## Independent references and instruments

The mathematical references are population conservation, chemical-equilibrium substitution, a two-state rate equation, dimensional analysis, and explicit aggregation and residual counterexamples. The editor authored the repairs and arithmetic evaluation: this is self-review with independently checkable mathematical references, not a second editor's approval. No EOM solver, physical reactor, reaction-network yield simulation, or source-population fit was run.

Bounded external verification inspected:

- B. D. Fields, P. Molaro, and S. Sarkar, [PDG 2025 Big Bang Nucleosynthesis](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-bbang-nucleosynthesis.pdf), §§24.2–24.3 and equation (24.3), for comparison chronology, helium attribution, and later processing.
- R. Cooke, M. Pettini, and C. C. Steidel, [One Percent Determination of the Primordial Deuterium Abundance](https://arxiv.org/abs/1710.11129), 2018, arXiv:1710.11129v3, abstract, for the retained dated mean and sample size. This check did not refit individual absorbers.
- J. J. Bennett et al., [Towards a precision calculation of the effective neutrino number in the Standard Model II](https://arxiv.org/html/2012.02726v3), 2021, arXiv:2012.02726v3, abstract and equation (1), for the theoretical benchmark and late-time normalization. Its observational forecasts were not used.

Before custom target checks, a synthetic Markdown example established one heading, one displayed equation and viewer ID, one ordinary link, and exclusion of a fenced false heading/equation/link. A separate Node control established two expressions from one inline and one display example, one display under the repository parser, an existing and a deliberately missing path, successful KaTeX for a fraction, and rejection of malformed TeX. Arithmetic controls passed $2+2=4$, rejected $2+2=5$, and returned unit survival at zero exposure. Controls were recorded before target runs.

Subsequent Node arithmetic checks used $c_f=1$ and returned:

| Check | Result | Boundary |
| --- | --- | --- |
| Reaction-free inventory at two volumes | 8 and 8 | Counting only |
| Unequal weak-rate equilibrium / relaxation | $X_n=0.125$, rate sum 8 | Fixed bath |
| Helium counting | 0.25 at $r=1/7$; 0.5 at $r=1/3$ | Efficient neutron incorporation |
| Mean survival / survival at mean exposure | 0.5676676416183064 / 0.36787944117144233 | Pure removal, equal weights |
| Fixed radiation normalizer | 0.22710731766023898 | Standard photon-relative convention |
| Three species at twice reference temperature | Effective loading 48 | Ideal relativistic thermal scaling |
| Maximum residual / Euclidean residual | 0.8 / 1.1313708498984762 | Two-dimensional counterexample |
| Injection-change magnitude / final error | 10 / 0 | Change is not error |
| Baryon density arithmetic | $2.032056\times10^{-5}\,\mathrm{g/cm^3}$ | Rounded blackbody coefficient $20.28\,\mathrm{cm^{-3}K^{-3}}$, quoted temperature and ratio, and rounded baryon mass $1.67\times10^{-24}\,\mathrm g$; not source data |
| Ratio of combined counts / mean ratio | 2.5 / 2 | Aggregation only |

The deuterium expression was checked symbolically by substitution as shown in the chapter; no floating-point agreement was used to establish that rule. The retained density is consistent with rounded benchmark arithmetic, not evidence for the underlying bath.

## Equation identity record

All seventeen existing viewer IDs remain. These eleven bodies changed:

| Stable equation ID | Change |
| --- | --- |
| corpus-equation-4ccff45d27ba9dd3 | Population dilution, stoichiometry, source/exchange |
| corpus-equation-c047808244f4a655 | Temperature/time notation and display punctuation |
| corpus-equation-7a76b30502e7a057 | Effective comparison time |
| corpus-equation-5d124b91adcd4eb2 | Neutron-dependent deuterium equilibrium |
| corpus-equation-a34b812929f48825 | Sum of forward and reverse weak rates |
| corpus-equation-8821f40ec36ed562 | FLRW label and active-flavor sum |
| corpus-equation-e9237a193c1a0868 | Fixed late-time radiation reference |
| corpus-equation-fb9e55095714519e | Electron chemical-potential term |
| corpus-equation-15cf2016b6de39e6 | Reference, not observed, exposure |
| corpus-equation-1a3c5a58a4df14ab | Effective-time injection notation |
| corpus-equation-1cc2859b3073bde0 | Effective-time spectra and injection-induced neutrino change |

## Validation record

The chapter-only controlled Node check rendered 180 inline/display expressions using KaTeX with error-on-failure, parsed seventeen displays using the repository parser, and resolved every local path among 35 links. This path check establishes filesystem destinations, not every external URL or HTML fragment. External references above were separately inspected.

Before receipt creation, node scripts/validate-content.mjs --check --strict exited zero with 0 errors, 0 warnings, and 30 notes across 391 scenes, 199 corpus Markdown files, and 1716 repository Markdown files. This is a shared-checkout snapshot.

The command node scripts/build-equation-mapping-corpus.mjs --check exited one and reported stale content/generated/equation-mapping/corpus-equations.json (199 Markdown files, 4685 displays, 23 promoted equations, 30468 symbol definitions in that snapshot). No generator write was run. The exact deferred command is:

~~~bash
node scripts/build-equation-mapping-corpus.mjs --write
~~~

The registry must be checked again after authorized regeneration. Stale derived data do not falsify the chapter's mathematical repairs.

After receipt creation, the controlled two-file Node check passed: 180 chapter expressions and 39 receipt expressions rendered with strict KaTeX; the repository parser found seventeen chapter displays and no receipt displays; all local destinations among 35 chapter links and four receipt links resolved. Additional controls established tilde-fence exclusion and finding-heading counting before either target was checked. The receipt contains twenty finding headings by the controlled count and fifteen High / five Medium headings by rg enumeration.

The post-receipt command node scripts/validate-content.mjs --check --strict exited zero with 0 errors, 0 warnings, and 30 notes across 391 scenes, 199 corpus Markdown files, and 1718 repository Markdown files. Concurrent work can change repository-wide counts. Scoped git diff --check HEAD passed; because Git diff does not include the new untracked receipt, direct whitespace inspection also covers both source files. The final chapter hash remained cb1110c051a060af5d02b0c29c44b34d66b3bfc84eacca746502ca9b36e121d0 under shasum -a 256. These are bounded document and arithmetic checks, not full repository, solver, physical, or independent-editor acceptance.

## Open obligations and handoff

Physical work remains to derive a source population and its transport, clock, thermal, nuclear, and neutrino histories from accepted assembly dynamics; establish production, survival, escape, mixing, and source-before-star chronology; and compute joint observational residuals with errors, correlations, selection, and stellar processing. The saturation attractor, lithium advantage, Noether sea equation of state, and cosmological recovery are not established here.

The coordinator can integrate this bounded disposition after checking the final hash and validation. Shared-board advancement and the other workers' reviews are outside this worker's scope.
