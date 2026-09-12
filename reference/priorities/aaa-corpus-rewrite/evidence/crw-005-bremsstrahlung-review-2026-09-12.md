# CRW-005 Bremsstrahlung bounded review and repair — 2026-09-12

## Disposition and scope

Priority 51 received a complete chapter review and bounded repair under the operator's explicit two-file assignment. The review records 15 finding groups, BR-01 through BR-15: nine high and six medium. All fifteen received local textual repairs; the underlying research obligations remain open. “High” denotes a material accounting, mathematical-domain, or evidence-authority defect; “medium” denotes a consequential definition, normalization, regime, or projection omission. Severity is editorial/review severity, not a measured physical effect.

The authorized targets are [Bremsstrahlung](../../../../content/markdown/aaa/reactions/bremsstrahlung.md) and this new receipt. The assignment supersedes the review-only default of the [corpus-reviewer procedure](../../../office-of-research/cto/prompts/corpus-reviewer.md), but authorizes no shared-record, other-chapter, software, fixture, generated-artifact, or publication changes. The tool operation record contains writes only to these two paths. No staging, commit, push, reset, stash, regeneration, or linked-worktree operation was performed. Ambient work was not adopted as this review's work.

This is a single-reviewer audit followed by editor self-review, not a separately staffed independent acceptance review. Its independent references are the named standard derivations and immutable baseline; its mathematical witnesses are explicit algebra and counterexamples. Neither agreement with those witnesses nor successful syntax checks establishes a physical photon branch, EOM solver acceptance, theory closure, or downstream closure.

## Provenance and baseline

Before editing, `git --no-optional-locks status --short -- content/markdown/aaa/reactions/bremsstrahlung.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-bremsstrahlung-review-2026-09-12.md` returned no entries; `test ! -e reference/priorities/aaa-corpus-rewrite/evidence/crw-005-bremsstrahlung-review-2026-09-12.md` succeeded. The chapter was therefore clean in that scoped index/working-tree comparison and the receipt absent at that observation. The supplied dispatch hash was verified with `shasum -a 256` before repair and rechecked before patching.

- Dispatch chapter SHA-256: `59bf3a7a53e24f09c7e275af93bdb5414f8e383607b8be2a73d4316c3877e295`.
- Immutable dispatch comparison: commit `859f2b07cb17889ca2c239d82fd61455c2ba903c`, chapter blob `5ff53803090d503304488adf40a129103183ebc8`.
- Final chapter SHA-256 by `shasum -a 256 content/markdown/aaa/reactions/bremsstrahlung.md`: `e5a4496f006c900a0769d3c3176bccdba11a32604d3a7e4532224a69419fb869`.
- Baseline line references below refer to `git show 859f2b07cb17889ca2c239d82fd61455c2ba903c:content/markdown/aaa/reactions/bremsstrahlung.md | nl -ba`, lines 1–535. Final references refer to the final-hash chapter, lines 1–562, read completely with `nl -ba`.
- Pre-campaign comparison: `git diff bfbb3ea3e7175e70e6d0707fef9b0a200f9fe845 859f2b07cb17889ca2c239d82fd61455c2ba903c -- content/markdown/aaa/reactions/bremsstrahlung.md` showed only the opening paragraph change and the merger of the fixed-hit explanation; its scoped numstat was two added and four removed lines. Together with the complete baseline reread, this identifies all pre-campaign differences. It does not support attributing the mathematical findings to the conversion.
- The actual chapter diff of `c973402b96d50e45b9bdac0da2bd680e6c26116f` was inspected: it merged the changing-trajectory explanation without altering display mathematics. Commit subjects were not used as evidence of contents.

The [conversion ledger](conversion-ledger.md), line 96 at inspection, records edition 1.0 on 2026-09-04. The [live review board](../corpus-review-status.md), line 12 at inspection, listed priority 51 as unread. The [CRW-005 owner](../work-queue.md#crw-005--independent-post-conversion-assurance-review) supplies preservation and assurance requirements; its historical packet counts were not treated as current completion evidence. Shared board and queue updates belong to the coordinator and are outside this assignment.

## Sources, owners, and binding surfaces inspected

Repository procedure and style owners were read before task edits: [AGENTS.md](../../../../AGENTS.md), the [generated startup router](../../../op/agent-startup-orientation.generated.md), the [review skill](../../../../.agents/skills/architrino-review/SKILL.md), its [live owner](../../../op/skills/skill-architrino-review.md), [corpus-reviewer procedure](../../../office-of-research/cto/prompts/corpus-reviewer.md), [theory orientation](../../../op/theory-orientation.md), [operator explanation standard](../../../op/operator-explanation-standard.md), [execution procedure](../../../op/codex-goal-seeking-prompt-template.md), [skills policy](../../../op/skills/README.md), and [geometry/dynamics specialist instructions](../../../office-of-research/specialists/roles-geometry-dynamics/system-prompt.md). The review used the current edition-1.1 [academic style guide](../../../../content/markdown/aaa/archie/academic-style-guide.md) while preserving the historical edition-1.0 record.

The authoring comparison also inspected [mathematics style](../../../../content/markdown/aaa/archie/mathematics-style-guide.md), [mathematics terminology](../../../../content/markdown/aaa/archie/mathematics-terminology.md), [terminology usage](../../../../content/markdown/aaa/archie/terminology-usage.md), the [comparative glossary](../../../../content/markdown/aaa/archie/comparative-glossary.md), and the source/attribution policy in [About Architrino](../../../../content/markdown/aaa/archie/about-architrino.md). Relevant foundational definitions were checked in [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), [Euclidean Void](../../../../content/markdown/aaa/foundations/euclidean-void.md), [Absolute Time](../../../../content/markdown/aaa/foundations/absolute-time.md), [Absolute Timespace](../../../../content/markdown/aaa/foundations/absolute-timespace.md), [Detecting the Absolute Frame](../../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md), and [Constructing the Absolute Frame](../../../../content/markdown/aaa/foundations/constructing-the-absolute-frame.md). These were definition/level checks, not fresh reviews of those chapters.

Physics-owner checks were bounded to the linked obligations:

- [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), canonical acceleration form and root weighting, lines 1363–1445 at inspection: transmitter weighting is counted once; an assembly diagnostic is not a new per-hit law.
- [Radiation](../../../../content/markdown/aaa/reactions/radiation.md), basin/gate and full-ledger sections, lines 194–237 and 505–552 at inspection; [Mode Taxonomy](../../../../content/markdown/aaa/reactions/mode-taxonomy.md), opening definitions and channel conventions.
- [Electroweak Bosons](../../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md#photon-referent-status), photon referent status: a candidate assembly is not an exhibited physical branch.
- [Proper Time and Time Dilation](../../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md), normalized density/delay at line 104 and cadence/mismatch definitions at lines 251–300; the linked [Noether Sea](../../../../content/markdown/aaa/spacetime/noether-sea.md) density and delay definitions. Clock cadence, sea cadence, and observer-chart time remain distinct.
- The [Condensed Matter receipt](crw-005-condensed-matter-review-2026-09-12.md), validation appendix, was used as a checker-pattern reference. It was not used as physics evidence or as approval for additional writes.

External verification was restricted to standard comparison or observer-level constraints, never imported as an architrino premise:

- [Condon and Ransom, Essential Radio Astronomy, chapter 4](https://www.cv.nrao.edu/~sransom/web/Ch4.html), equations 4.29–4.39 and 4.51: thermal distribution, angular emissivity convention, and absorption relation inspected.
- [Particle Data Group, Passage of Particles Through Matter, 2022](https://pdg.lbl.gov/2022/reviews/rpp2022-rev-passage-particles-matter.pdf), sections 34.4.3 and 34.4.6, especially equation 34.28: separate charge contributions and material suppression regimes inspected.
- [Kaplunovsky, Radiation from Accelerated Charges](https://web2.ph.utexas.edu/~vadim/Classes/2022s/accel.pdf), pages 14–16, equations 71–79: emission/arrival-time Jacobian and collinear radiation comparison inspected. The angular integral below is an additional explicit algebraic check.
- [NASA NTRS 19850032363](https://ntrs.nasa.gov/citations/19850032363): the citation page could not be opened by the browsing tool; the [NASA citation API](https://ntrs.nasa.gov/api/citations/19850032363) was successfully read with `curl -L --fail --silent` and `jq`. Abstract and metadata verify the Voyager 2–3 kHz report, the conditional plasma-frequency comparison, Kurth/Gurnett/Scarf/Poynter authorship, and the 1984 Nature publication. The full paper and raw instrument records were not inspected.
- [NIST fundamental constants table](https://physics.nist.gov/cuu/pdf/all.pdf): the Planck-constant conversion used for the conditional radio-energy calculation was checked. This is an effective photon-energy conversion, not a primitive architrino constant.
- [RAPTOR, Bronzwaer et al.](https://arxiv.org/abs/1801.10452): abstract and indexed transfer-equation context were inspected; full-paper retrieval was unsuccessful. No quantitative finding relies on unread parts. BR-13 rests on the stated invariant's domain and the explicit redistribution counterexample.

Binding inspection included the [equation-corpus generator](../../../../scripts/build-equation-mapping-corpus.mjs), [equation-link checker](../../../../scripts/validate-equation-mapping-links.mjs), [content validator](../../../../scripts/validate-content.mjs), [runtime-asset declaration](../../../../scripts/config/generated-runtime-assets.json), and the vendored KaTeX loader. Equation IDs and generated registry checks were considered before repair. A subsequent scoped `rg` route search also found old chapter-heading routes in the generated source-index snapshot; both renamed headings therefore retain explicit old anchors. The chapter-path search identified generated textbook reading copies and the source-index snapshot as additional derived consumers. This is a binding inventory, not a claim that every byte-hash consumer has been exhaustively found. Generated files, fixtures, and historical evidence were not edited.

## Findings and implemented repairs

Each entry distinguishes a demonstrated local defect from the research proposition that remains unresolved. Baseline and final spans are exact references in the two chapter versions identified above.

### BR-01 — Medium — Acceleration is not speed loss

Baseline lines 3, 35–47, 56–91, and 203; final lines 3, 36–52, 61–96, and 216. The residual uses the norm of a vector derivative, but its prose called that quantity deceleration magnitude and described the entire channel as deceleration-only. Derived counterexample: a circular trajectory has nonzero acceleration while its speed derivative vanishes. The standard radiative comparison admits deflection; the chapter's displayed decelerating skeleton is only a subset.

Repair: distinguish vector acceleration from speed loss, declare the skeleton's restricted scope, define the assembly/path variables, and keep the fixed-hit law acceleration-first. The introductory theory abbreviation was conformed without changing the effective/substrate boundary. Falsifier: a demonstrated additional assumption restricting every encounter in the chapter to strictly collinear speed loss would remove the broader mismatch; neither the baseline residual nor its channel inventory supplies that assumption.

### BR-02 — High — Named functions and thresholds did not establish a photon branch

Baseline lines 93–133, 189, 213–228, and 513; final lines 98–140, 200, 222–243, and 540. The text moved from an undefined energy functional and excitation diagnostic to a stable attractor, threshold-triggered photon output, and an increased transition-kernel weight. By comparison with the Master Equation and photon-status owners, these are proposals, not derived trajectories, ensemble measures, or stability results. The baseline already contained some open-status qualifiers; the defect was the contradictory affirmative conclusions elsewhere.

Repair: define the proposed functional's domain/reference/nonnegativity burden, distinguish deterministic path evolution from a statistical ensemble map, retain branch existence as open, and identify the gravitational argument rewrite as a proposed constitutive map. For the metric term, metric compatibility gives a zero covariant metric derivative; coordinate gradients instead require a declared chart and do not define an invariant trigger. Falsifier/reopening condition: exhibit an independently checked photon-producing history, acceleration balance and persistence, the functional/reference branch, and a declared ensemble law. Merely renaming an input or fitting the exponential response does not meet that condition.

### BR-03 — High — Source depletion and prepared excitation were conflated

Baseline lines 135–175 and 507; final lines 142–186 and 534. The full source-depletion ledger included wake and handoff transfers, but its alleged energy reduction omitted them and replaced depletion with prepared excitation. Remnant excitation could also be counted in both the outgoing source and the separate right-hand account.

Derived witness: a prepared excitation of ten units emitting six and retaining four has depletion six, not ten. Repair: preserve both displays but explicitly distinguish their budgets, frame, event window, sign conventions, and conditions for omitting wake/handoff transfers; prohibit remnant double counting. Falsifier: a same-history derivation identifying preparation with depletion and independently bounding every omitted transfer would justify the restricted reduction. No such derivation is supplied here.

### BR-04 — High — The probability formula needed a domain and a separate energy gate

Baseline lines 105–117, 181–211, and 225–226; final lines 112–124 and 190–241. The displayed exponential can be positive below the hypothesized photon floor, zero at drive-threshold equality, and negative for negative excitation. Thus the trigger inequality cannot by itself imply positive photon probability.

Derived controls with normalized inputs give: at drive equality, probability zero; at drive ratio two and excitation/reference ratio one-half, probability 0.3934693402873666 even when the excitation is below a unit floor; at excitation/reference ratio minus one, probability −1.718281828459045. Repair: require positive scales, finite nonnegative drive and excitation, dimensional consistency and nonsingular exponent domains, and explicitly set probability zero outside the inherited energy-eligible domain. The response remains proposed per encounter window, not an established rate, spectrum, or multiplicity law. Falsifier: algebra contradicting these substitutions, or a supplied physical event law that proves the missing gate and window invariance, would require revisiting the respective conclusion.

### BR-05 — High — A detector threshold did not justify heat routing or infrared safety

Baseline lines 327–347; final lines 346–366. The “default-safe” interpretation identified unresolved emission with heat and treated eligibility as a guaranteed stable photon. A detector's failure to record a photon establishes neither its absence nor local thermalization. Replacing transport by heat changes an observable energy/momentum route.

Repair: make floor and heating hypotheses explicit, separate both eligibility conditions from actual output, retain unresolved accounts, and require the same detector-inclusive QED comparison. NASA abstract/metadata verification supports only the conditional received-frequency observation. Using the inspected Planck conversion gives approximately $8.2713\times10^{-12}\,\mathrm{eV}$ at 2 kHz; the source-floor inference additionally needs source-to-receiver transfer and plasma propagation checks. Falsifier: a verified freely propagating photon below a proposed universal received-frame floor rejects that floor; a turnover alone cannot distinguish nucleation from medium or detector suppression. No new measurement or bremsstrahlung-source identification is claimed.

### BR-06 — Medium — Thermal baselines lacked regime and angular normalization

Baseline lines 230–264; final lines 245–281. The proportional emissivity and absorption displays are supportable but need a distribution, units, composition convention, and consistent solid-angle normalization. A general frequency integral is not a Rosseland mean.

Repair: specify nonrelativistic, nondegenerate Maxwellian electrons; define emissivity per volume/time/frequency/solid angle, species summation and Gaunt-factor scope, and net absorption including stimulated emission. The corresponding angle-integrated Kirchhoff formula needs the factor $4\pi$. The Kramers opacity scaling is explicitly a Rosseland-mean, fixed-composition thermal approximation. Falsifier: a declared alternative convention must reproduce the same coefficient dimensions and integrated transfer; disagreement in a matched independent thermal benchmark would reopen the claimed applicability. Strongly coupled, degenerate, and relativistic regimes remain outside this compact formula.

### BR-07 — Medium — Cooling and inclusion thresholds did not define the full budget

Baseline lines 266–303; final lines 283–320. The thermal-energy numerator counted only electrons and hydrogen nuclei although the surrounding shock discussion allowed other species and degrees of freedom. Display selection at an approximately 1% threshold does not physically reroute free-free emission or bound aggregate omissions.

Repair: restrict the displayed cooling estimate to optically thin, fully ionized hydrogen with a common temperature and the stated ideal-gas model; define the common cooling-coefficient normalization and additional energy accounts for other compositions. An omitted component remains in the remainder budget. Derived witness: twenty components of 0.9% total 18%. Falsifier: explicit composition/energy accounting and a total omitted-contribution bound below the required tolerance would permit the corresponding reduction. This review does not choose a shock cooling curve or assert a channel fraction.

### BR-08 — Medium — Positron charge reversal and thermal averaging needed distinct assumptions

Baseline lines 305–310; final lines 324–327 and 38. Reversing projectile charge at a fixed target is not the time reverse of its original encounter. A thermal sum of independent local events also needs a formation/interference regime.

Repair: distinguish the positron's trajectory and Coulomb-correction benchmark, and require formation-length/medium-interference effects to be negligible or included before independent-event averaging. Falsifier: a stated symmetry of the full target/projectile initial and final records could prove a restricted rate relation; reversing one charge alone does not. An independently derived medium kernel could establish the proposed ensemble reduction in a specified regime.

### BR-09 — High — Elastic suppression did not supply the inclusive resolved contribution

Baseline lines 349–366 and 509; final lines 368–385 and 536. Multiplying a coherent $Z^2$ contribution by an elastic form factor cannot in general create a resolved inclusive term proportional to $Z$. Impact parameter alone also does not fix the momentum-transfer resolution scale.

Derived check for independent identical constituent positions: expanding the squared sum of amplitudes gives $Z+Z(Z-1)|F|^2$, split into coherent $Z^2|F|^2$ and variance $Z(1-|F|^2)$. With $Z=3$ and $F=0$, the coherent elastic structure factor is zero while the inclusive structure factor is three. This illustrative sum is not a full nuclear model.

Repair: distinguish elastic, inclusive, atomic-screening, and nuclear-size effects; define the phase scale $q_{\mathrm{tr}}R_{\mathrm{nuc}}/\hbar$; label the gravity factor guessed and restrict its displayed product to the coherent contribution with nonnegative total factor. The only display-byte repair replaces momentum-transfer `q` with `q_{\mathrm{tr}}`, preserving the equation ID and separating it from electric charge. Falsifier: a complete independently checked structure function can replace the illustrative independent-position limit; it must explicitly supply the incoherent final states rather than infer them from elastic suppression.

### BR-10 — High — Reduced momentum balance was presented as established microscopic closure

Baseline lines 368–378; final lines 387–399 and 534. The plus-sum momentum display needs outgoing-minus-incoming changes, unlike the earlier source-depletion sign. It omitted explicit wake/handoff terms and claimed recoil dominance and a microscopic angular closure without a derived momentum functional.

Repair: state the sign convention and omitted-flux conditions, retain momentum balance as an effective recovery requirement, and distinguish finite recoil momentum with small energy from dominance of the vector sum. Falsifier: a conserved same-history assembly momentum functional with controlled boundary fluxes would justify stronger conservation language; a separate angular-amplitude derivation is still required to determine the radiation pattern.

### BR-11 — High — Correct classical power displays were overextended into unmeasured closure

Baseline lines 380–419 and 505; final lines 401–442 and 532. The fifth-power angular denominator is correct for power per emission time in the collinear classical comparison, not per detector arrival time or every scattering geometry. The angular ratio is undefined at axial zeros, and the integrated ratio is undefined for a zero-radiation reference. The chapter's asserted approach to zero supplied no independent mapped result.

Repair: preserve both standard displays, specify their time/geometry convention, make residuals conditional on positive denominators, use absolute/bin comparisons at nodes, and require matched corrected benchmarks and independent radiation/momentum accounts. The analytic integration below supports the standard collinear formula only. Falsifier: a mapped calculation meeting a stated benchmark and error budget can establish a measured local recovery result; a ratio of two zeroes or an unmatched correction cannot.

### BR-12 — Medium — Sea cadence was not an electron observer-clock conversion

Baseline lines 30 and 421–443; final lines 30–32 and 444–468. The timing owner defines sea cadence separately from clock readout. Derived chain rule: if $J_e=dt_{\mathrm{eff}}/dT$ and $C_e=d\tau_e/dT$, then $\Gamma_{\mathrm{eff}}=J_e/C_e$. Even when $C_e=C_N=1/2$, choosing $J_e=2$ gives $\Gamma_{\mathrm{eff}}=4$ but $\Gamma_N=2$.

Repair: require the chart Jacobian and a vanishing clock/sea mismatch for the respective identifications. The weak-correction split remains proposed, with correlated density/potential effects and omitted clock/history arguments explicit. Falsifier: an independently derived clock projection establishing $J_e=1$ and zero mismatch on a specified branch permits the restricted equality, not its universal use.

### BR-13 — High — A frequency budget did not establish invariant intensity transport

Baseline lines 445–472; final lines 470–499. The invariant $I_\nu/\nu^3$ requires its collisionless nondispersive metric/occupation assumptions. A multiplicative attenuation factor cannot generally describe distributed emission or in-scattering and frequency redistribution.

Repair: define endpoint frequency ratio and frames, limit the invariant and scalar transmission to their domains, require transport source/redistribution terms otherwise, and keep frequency-dependent transmission inside bolometric integration. Derived counterexample: a two-bin source with entries $(1,0)$ can scatter into $(1/2,1/2)$, while a finite diagonal multiplicative attenuation at unchanged frequency leaves the empty second bin zero. Falsifier: a derived transport law proving the proposed occupation invariant and absence of redistribution/source terms would authorize the restricted formula. A signed path-frequency entry alone is not that proof.

### BR-14 — High — A cooling-timescale ratio was not a sufficient LTE test

Baseline lines 474–487 and 508; final lines 501–514 and 535. A small coupling/cooling ratio says nothing by itself about faster external driving or whether that coupling actually thermalizes electrons, equilibrates ions, or changes ionization.

Repair: require the relevant processes and competing timescales, distinguish Maxwellian coefficients from an equilibrium radiation field, and avoid treating a large generic ratio as proof that no other process can maintain the distribution. Derived counterexample in common arbitrary time units: coupling 1, cooling 1000, and driving 0.1 give ratio 0.001 while driving is faster than coupling. Falsifier: a kinetic equilibration calculation against all faster state changes can establish local applicability; the two-timescale ratio cannot certify it alone.

### BR-15 — Medium — Null-geodesic propagation required a nondispersive regime

Baseline lines 489–499; final lines 516–526. Universal null-geodesic language conflicts with the chapter's plasma-propagation scope unless a nondispersive metric limit is independently established.

Repair: preserve the null/geodesic display as a transparent geometric-optics recovery target, define the affine ray tangent, and separate dispersive medium propagation. Falsifier: a derived medium response and error bound establishing the null-ray approximation for the specified frequency/domain would permit that restricted use. No effective metric or lensing law was derived here.

## Mathematical witnesses and evidence independence

The following are conditional mathematics or arithmetic, not physical branch tests. All numerical examples use normalized wake-speed units with $c_f=1$; dimensionless ratios and arbitrary energy/time units do not assign primitive mass or import an acceleration law. The NASA frequency/energy comparison is separately observer-level.

For BR-11, put $u=\cos\theta$. For $0\le\beta<1$, the angular integral is

$$
\int_{-1}^{1}\frac{1-u^2}{(1-\beta u)^5}\,du
=\frac{4}{3(1-\beta^2)^3}.
$$

For nonzero $\beta$, substituting $w=1-\beta u$ gives the primitive $\beta^{-3}[(1-\beta^2)/(4w^4)-2/(3w^3)+1/(2w^2)]$ between $1-\beta$ and $1+\beta$. At $\beta=0$, direct integration gives $4/3$. Multiplication by the azimuthal integral $2\pi$ and the chapter's prefactor yields its $\gamma^6$ total-power expression. This is a derivation within the standard classical comparison, not within primitive dynamics.

Appendix B's Simpson implementation first passed the independently known polynomial integrals $2/3$ and $1/4$, before evaluating the target kernel. At $\beta=0,0.3,0.6,0.9$, its 20,000-panel results were respectively 1.3333333333333226, 1.7693532969465837, 5.086263020833307, and 194.39179666535574. The largest relative difference from the closed form was approximately $4.25\times10^{-12}$, within the declared $10^{-8}$ check tolerance. This validates a bounded quadrature comparison, not the physical radiation map.

The same control-first run returned the probability, energy, omission, coherence, clock, timescale, redistribution, and low-frequency arithmetic stated in the findings. The closed-form arguments are independently inspectable; the witness script does not become an EOM solver oracle by reproducing them. No reference implementation was edited alongside its subject.

## Validation record

The final chapter was reread completely, and the scoped diff was reviewed against the immutable baseline. The known-case-first checker in Appendix A passed its control-only run before any target run: four math expressions including two display forms, fenced/inline-code exclusion, valid and invalid KaTeX, unmatched delimiters, present/missing paths and anchors, heading and explicit-anchor recognition, moved-prose viewer identity, the one-symbol normalization, and whitespace/EOF controls.

Measured by Appendix A using the vendored KaTeX renderer with `throwOnError:true`:

- Baseline: 199 math expressions; 26 dollar-display blocks; 41 local links, including 27 anchor links; one external citation.
- Final chapter: 255 math expressions; 26 dollar-display blocks; 45 local links, including 28 anchor links; four external citations. All extracted math rendered and all scoped local paths/anchors resolved.
- Display preservation: 25 of 26 TeX bodies byte-identical. The only body difference is `q` to `q_{\mathrm{tr}}` in `corpus-equation-81a3234d5ca1d29f`, baseline delimiter line 360/final delimiter line 379; formula body lines 361/380. All 26 viewer links and their order remain identical.
- All 27 baseline heading routes are preserved by the checker, including the two explicit compatibility anchors for renamed headings.
- Receipt: 39 extracted math expressions rendered; 39 local links, including two anchors, resolved; seven external source links enumerated; whitespace and single-final-newline checks passed. This checker is scoped to the Markdown forms present in these two files, not a universal Markdown parser or a visual-layout review.

`git diff --check -- content/markdown/aaa/reactions/bremsstrahlung.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-bremsstrahlung-review-2026-09-12.md` returned exit 0 for tracked changes. Because an untracked receipt is not included by ordinary `git diff`, Appendix A separately checks its whitespace, single final newline, math, and local links.

The first post-repair `node scripts/validate-content.mjs --check --strict` returned exit 1: four errors, zero warnings, and 30 notes, across 199 corpus Markdown files and 1,694 repository Markdown files at that observation. Each error was a missing link target `tests/current-launch-bindings.test.js`, reported outside the authorized paths:

- `reference/priorities/development-process-review/analysis/option-b-cached-root-cover-cutover.md:53`.
- `reference/priorities/development-process-review/analysis/option-b-cached-root-cover-full-cutover.md:51`.
- `reference/priorities/development-process-review/analysis/option-b-current-source-cutover-inventory.md:85`.
- `reference/priorities/development-process-review/analysis/option-b-prescribed-response-and-acceleration-cutover.md:5`.

This first result is historical validation evidence, not a causal attribution or proof that the errors predate this task. The target files and missing test were not repaired here. Those four errors were no longer reported in subsequent strict runs; no cause or author is assigned to the concurrent change.

The initial receipt check caught two incorrect local foundation-link spellings in this report; both were repaired to the observed `detecting-the-absolute-frame.md` and `constructing-the-absolute-frame.md` paths, then the scoped check passed. The next post-receipt strict run returned exit 1 with one error, zero warnings, and 30 notes over 1,695 repository Markdown files: `reference/priorities/aaa-corpus-rewrite/evidence/crw-005-radiation-review-2026-09-12.md:50`, target `y`, resolving to `reference/priorities/aaa-corpus-rewrite/evidence/y`. Read-only inspection of that line with `sed -n '44,54p'` showed the reported target inside an inline-code math example, not an intended navigation link. That observation suggested a validator parsing limitation; its implementation was not repaired or certified here.

The final `node scripts/validate-content.mjs --check --strict` run returned exit 0: zero errors, zero warnings, and 30 notes, with 391 scene files, 199 corpus Markdown files, and 1,695 repository Markdown files audited. The Radiation diagnostic was no longer reported. This review did not edit that receipt or the validator and assigns no cause to the concurrent resolution. This pass covers the observed global snapshot, not mathematical correctness or generated-registry freshness. The final receipt-only validation-status update was followed by the scoped checks again.

## Generated artifacts and deferred command

All three observed `node scripts/build-equation-mapping-corpus.mjs --check` runs returned exit 1 with `content/generated/equation-mapping/corpus-equations.json` stale; each counted 199 Markdown files, 4,685 display equations, and 23 promoted equations. The final observed run counted 30,439 symbol definitions. The first check overlapped the edit period and does not isolate when unrelated drift arose. The source byte changes and the one notation change require generated refresh, but no complete drift attribution is claimed.

No generator write was run. The exact deferred repair command for that reported drift is:

```sh
node scripts/build-equation-mapping-corpus.mjs --write
node scripts/build-equation-mapping-corpus.mjs --check
```

The command belongs to an explicitly authorized regeneration or publication runner because it can update more than this chapter. Existing equation IDs are preserved; freshness of their generated text is not claimed. The generated full-corpus source index and textbook reading copies were left untouched and their freshness was not certified. The runtime-asset declaration names `node scripts/archie-service/build-full-corpus-source-index.mjs --write` for the index; this review did not run it or its check. No fixture was regenerated and no iOS package was requested.

## Remaining obligations and closure limits

Local repair is complete for BR-01–BR-15, but replacing an unsupported assertion with its correct scope does not solve its scientific obligation. Still required are: a conserved assembly/event functional with complete boundary accounts; an exhibited persistent photon branch and an admissible encounter ensemble; a derived excitation diagnostic, two-gate event law, spectrum, multiplicity, and window-consistent rate; independent angular/power and screened/inclusive cross-section recovery; source-versus-propagation tests of any floor; thermal/kinetic normalization and equilibration evidence; an electron-clock projection; and a medium/metric transport derivation with redistribution where needed.

No unresolved authored-content blocker was reported by the final strict-validation run. Generated-registry freshness remains deferred by the assignment's no-regeneration boundary; its separate failing check prevents calling the whole repository fully validated. The two reviewed files can be handed off with that explicit limitation. Shared priority/status disposition, another reviewer's acceptance, downstream propagation, generator refresh, and publication remain outside this task.

Next concrete step: the coordinator should inspect BR-01–BR-15 and the two-file diff and record the disposition in its authorized shared owner. A separately authorized regeneration runner can then refresh the equation registry and rerun its check and strict validation. No blanket theory or corpus closure follows from that administrative disposition.

## Appendix A — Reproducible scoped preservation, KaTeX, and local-link check

Run the code below once without `CRW_PHASE=target` and record its control pass before running target mode. It writes no files. Every target-mode run repeats controls before reading the chapter. The immutable baseline, exact notation exception, retained equation IDs, and heading routes are compared explicitly.

```sh
CRW_PHASE=target node --input-type=module <<'CRW_NODE'
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {parseCorpusDisplayEquations} from './scripts/build-equation-mapping-corpus.mjs';
import {loadVendoredCommonJsBundle} from './scripts/load-vendored-commonjs-bundle.mjs';
const chapter='content/markdown/aaa/reactions/bremsstrahlung.md';
const report='reference/priorities/aaa-corpus-rewrite/evidence/crw-005-bremsstrahlung-review-2026-09-12.md';
const katex=loadVendoredCommonJsBundle(path.resolve('apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js'));
function prose(s){return s.replace(/(^|\n)[ \t]*(\x60{3,}|~{3,})[^\n]*\n[\s\S]*?\n[ \t]*\2[ \t]*(?=\n|$)/gu,'$1').replace(/(\x60+)[^\n]*?\1/gu,'');}
const mathRe=/\$\$([\s\S]*?)\$\$|(?<![\\$])\$([^$\n]+?)(?<!\\)\$(?!\$)|\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/gu;
function math(s){const p=prose(s);const out=[...p.matchAll(mathRe)].map(m=>({tex:m[1]??m[2]??m[3]??m[4],display:m[1]!==undefined||m[4]!==undefined}));assert.ok(!p.replace(mathRe,'').match(/(?<!\\)\$/u),'unmatched dollar');return out;}
function links(s){return [...prose(s).matchAll(/(?<!!)\[[^\]\n]*\]\(([^)\s]+)\)/gu)].map(m=>m[1]);}
function slug(s){return s.toLowerCase().replace(/[^\p{L}\p{N}_\s-]/gu,'').replace(/\s/g,'-');}
function anchors(s){return new Set([...prose(s).matchAll(/^#{1,6}\s+(.+)$/gm)].map(m=>slug(m[1])).concat([...s.matchAll(/id="([^"]+)"/g)].map(m=>m[1])));}
function checkLinks(s,p){let local=0,anchor=0,external=0;const ids=new Set(JSON.parse(fs.readFileSync('content/generated/equation-mapping/corpus-equations.json','utf8')).records.map(r=>r.semanticId));for(const href of links(s)){if(/^https?:/.test(href)){external++;continue;}assert.ok(!href.startsWith('/'),'absolute local link');const [file,hash]=href.split('#');const resolved=file?path.resolve(path.dirname(p),decodeURIComponent(file)):path.resolve(p);assert.ok(fs.existsSync(resolved),href);local++;if(hash){if(resolved.endsWith('/equation-mapping.html'))assert.ok(ids.has(hash),href);else if(resolved.endsWith('.md'))assert.ok(anchors(fs.readFileSync(resolved,'utf8')).has(decodeURIComponent(hash)),href);anchor++;}}return {local,anchor,external};}
function notation(s){return s.replaceAll('q_{\\mathrm{tr}}','q');}
const eof=s=>s.endsWith('\n')&&!s.endsWith('\n\n');
function controls(){
 assert.ok(!/[ \t]+$/m.test('ok\n'));assert.ok(/[ \t]+$/m.test('bad \n'));
 assert.ok(eof('ok\n'));assert.ok(!eof('bad'));assert.ok(!eof('bad\n\n'));
 assert.equal(notation('F(q_{\\mathrm{tr}}^2)+q'),'F(q^2)+q');assert.equal(notation('2+3'),'2+3');
 const s='# Control\n\n$x=1$ and \\(y=2\\).\n\n$$\na=b\n$$\n\n[View →](../../../../equation-mapping.html#control)\n\n\\[c=d\\]\n\n\x60$ignored$ [bad](absent)\x60\n\x60\x60\x60tex\n$$ignored$$\n[bad](absent)\n\x60\x60\x60\n~~~text\n$ignored$\n~~~\n[ok](AGENTS.md)';
 const m=math(s);assert.equal(m.length,4);assert.equal(m.filter(x=>x.display).length,2);
 const d=parseCorpusDisplayEquations(chapter,s);assert.equal(d.length,1);
 assert.deepEqual(d.map(x=>x.existingLink.text),parseCorpusDisplayEquations(chapter,'Added\n\n'+s).map(x=>x.existingLink.text));
 assert.deepEqual(links(s),['../../../../equation-mapping.html#control','AGENTS.md']);
 assert.equal(slug('Dynamic Exclusion Envelope'),'dynamic-exclusion-envelope');
 assert.ok(anchors('# Heading\n<a id="old-route"></a>').has('old-route'));
 for(const x of m)katex.renderToString(x.tex,{throwOnError:true,displayMode:x.display});
 assert.throws(()=>katex.renderToString('\\notAValidCrwCommand',{throwOnError:true}));
 assert.throws(()=>math('$unclosed'));
 assert.equal(checkLinks('[good](AGENTS.md#guiding-objective)','control.md').anchor,1);
 assert.throws(()=>checkLinks('[bad](crw-005-known-absent-control-file.md)','control.md'));
 assert.throws(()=>checkLinks('[bad](AGENTS.md#crw-005-known-absent-anchor)','control.md'));
 console.log('CONTROL PASS: 4 math expressions/2 displays; code exclusions; valid/invalid KaTeX; unmatched dollar; existing/missing paths and anchors; heading and explicit anchors; viewer identity after prefix movement; notation map; whitespace and EOF.');
}
controls();
if(process.env.CRW_PHASE==='target'){
 const base=execFileSync('git',['show','859f2b07cb17889ca2c239d82fd61455c2ba903c:'+chapter],{encoding:'utf8'});
 const current=fs.readFileSync(chapter,'utf8');
 for(const [name,s] of [['BASELINE',base],['CHAPTER',current]]){
  const m=math(s);for(const x of m)katex.renderToString(x.tex,{throwOnError:true,displayMode:x.display});
  const d=parseCorpusDisplayEquations(chapter,s);assert.ok(d.every(x=>x.existingLink),'display missing viewer link');
  assert.ok(!/[ \t]+$/m.test(s));assert.ok(eof(s));
  console.log(name,JSON.stringify({expressions:m.length,displays:d.length,links:checkLinks(s,chapter),whitespace:'pass'}));
 }
 const old=parseCorpusDisplayEquations(chapter,base),now=parseCorpusDisplayEquations(chapter,current);
 assert.deepEqual(old.map(d=>d.existingLink.text),now.map(d=>d.existingLink.text),'viewer link changes');
 assert.ok(old.every((d,i)=>notation(d.tex)===notation(now[i].tex)),'undeclared display change');
 const changed=old.map((d,i)=>({id:d.existingLink.semanticId,baseline:d.startLine,final:now[i].startLine,same:d.tex===now[i].tex})).filter(x=>!x.same);
 console.log('DISPLAY PRESERVATION',JSON.stringify({total:old.length,identical:old.length-changed.length,changes:changed}));
 const missing=[...anchors(base)].filter(a=>!anchors(current).has(a));assert.deepEqual(missing,[]);
 console.log('BASELINE HEADING ROUTES PRESERVED',anchors(base).size);
 if(fs.existsSync(report)){const s=fs.readFileSync(report,'utf8');const m=math(s);for(const x of m)katex.renderToString(x.tex,{throwOnError:true,displayMode:x.display});assert.ok(!/[ \t]+$/m.test(s));assert.ok(eof(s));console.log('REPORT',JSON.stringify({expressions:m.length,links:checkLinks(s,report),whitespace:'pass'}));}
}
CRW_NODE
```

## Appendix B — Reproducible arithmetic witnesses

Run once without `CRW_PHASE=target` to record the known-case pass, then in target mode. These calculations establish the stated conditional counterexamples and quadrature check only; they do not simulate an encounter.

```sh
CRW_PHASE=target node --input-type=module <<'CRW_NODE'
import assert from 'node:assert/strict';
const c_f=1;
const near=(a,b,tol=1e-12)=>assert.ok(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),JSON.stringify({a,b,tol}));
const simpson=(f,a,b,n)=>{assert.ok(n>0&&n%2===0);let sum=f(a)+f(b);for(let i=1;i<n;i++)sum+=(i%2?4:2)*f(a+(b-a)*i/n);return sum*(b-a)/(3*n);};
const response=(S,Sstar,E,Eref)=>1-Math.exp(-Math.max((S-Sstar)/Sstar,0)*E/Eref);
const coherent=(Z,F2)=>Z*Z*F2;
const inclusive=(Z,F2)=>Z+Z*(Z-1)*F2;
near(simpson(u=>u*u,-1,1,10),2/3);near(simpson(u=>u*u*u,0,1,10),1/4);
near(response(2,1,Math.log(2),1),0.5);near(coherent(1,1),1);near(inclusive(1,1),1);
near(1/4,0.25);
console.log('CONTROL PASS: Simpson u^2=2/3 and u^3=1/4; exponential response=1/2; one-constituent sums=1; fraction tolerance; c_f=1.');
if(process.env.CRW_PHASE==='target'){
 const out={};
 out.probability={threshold:response(1,1,1,1),belowEnergyFloor:response(2,1,0.5,1),negativeEnergy:response(2,1,-1,1)};
 assert.equal(out.probability.threshold,0);assert.ok(out.probability.belowEnergyFloor>0);assert.ok(out.probability.negativeEnergy<0);
 out.energy={prepared:10,photon:6,retained:4,sourceDepletion:10-4};assert.equal(out.energy.sourceDepletion,6);assert.equal(out.energy.prepared,6+4);
 out.omissions={channels:20,eachFraction:0.009,totalFraction:20*0.009};near(out.omissions.totalFraction,0.18);
 out.coherence=[0,0.25,1].map(F2=>({F2,elastic:coherent(3,F2),inclusive:inclusive(3,F2),variance:3*(1-F2)}));
 for(const x of out.coherence)near(x.elastic+x.variance,x.inclusive);
 out.angular=[0,0.3,0.6,0.9].map(beta=>{const numerical=simpson(u=>(1-u*u)/(1-beta*u)**5,-1,1,20000);const closed=4/(3*(1-beta*beta)**3);near(numerical,closed,1e-8);return {beta,numerical,closed,relativeError:Math.abs(numerical-closed)/closed};});
 out.arrivalJacobian=1-0.6*0.5;near(out.arrivalJacobian,0.7);
 assert.ok(Number.isNaN(0/0));out.zeroNodeRatio='undefined (0/0)';
 out.clock={J:2,C_N:0.5,clockCadence:0.5,Gamma_N:1/0.5,Gamma_eff:2/0.5};assert.notEqual(out.clock.Gamma_N,out.clock.Gamma_eff);
 out.lte={tauCouple:1,tauCool:1000,tauDrive:0.1,ratio:1/1000};assert.ok(out.lte.ratio<0.01&&out.lte.tauDrive<out.lte.tauCouple);
 out.redistribution={incoming:[1,0],outgoing:[0.5,0.5],multiplicativeSecondBin:0};assert.notEqual(out.redistribution.outgoing[1],out.redistribution.multiplicativeSecondBin);
 out.lowFrequencyEnergy_eV=4.135667696e-15*2000;near(out.lowFrequencyEnergy_eV/1e-12,8.271335392);
 console.log(JSON.stringify(out,null,2));
}
CRW_NODE
```
