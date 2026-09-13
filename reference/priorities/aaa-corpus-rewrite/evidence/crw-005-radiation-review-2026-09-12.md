# CRW-005 Radiation review and bounded repair — 2026-09-12

## Scope and provenance

This receipt covers priority 49, [Radiation](../../../../content/markdown/aaa/reactions/radiation.md), under explicit authority to repair that chapter and create this receipt only. Shared status, priorities, work queue, work log, conversion ledger, other chapters, generated artifacts, fixtures, code, and publication files are outside the write scope. This is an editorial and mathematical self-review with separately identified algebraic counterexamples and external comparison references; it is not independent EOM solver acceptance.

Claim grade: measured. Before editing, `git --no-optional-locks status --short -- content/markdown/aaa/reactions/radiation.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-radiation-review-2026-09-12.md` returned no entries, `test ! -e reference/priorities/aaa-corpus-rewrite/evidence/crw-005-radiation-review-2026-09-12.md` succeeded, and `shasum -a 256 content/markdown/aaa/reactions/radiation.md` returned the supplied dispatch hash `aececdc32b529331eedfc1befae2ae25d378954bb5143c01e0eeed92d234be64`. The baseline commit read by `git rev-parse HEAD` was `859f2b07cb17889ca2c239d82fd61455c2ba903c`. A repeated pre-edit hash check returned the same value. Falsifier: different bytes at that commit/path or a conflicting scoped status observation would invalidate this baseline attribution.

The complete baseline chapter was read with `nl -ba` in contiguous ranges 1–214, 215–480, 481–830, and 831–1228. All baseline line references below refer to those bytes, retrievable with `git show 859f2b07cb17889ca2c239d82fd61455c2ba903c:content/markdown/aaa/reactions/radiation.md`. The conversion ledger records the chapter at edition 1.0 on 2026-09-04. Inspection of `git diff c973402b^ c973402b -- content/markdown/aaa/reactions/radiation.md` shows the fixed-hit explanation joined into ordinary prose and equation-viewer paragraphs separated. That inspected diff does not establish that the substantive findings below were introduced by conversion; causal attribution of older defects is not claimed.

## Owners and sources inspected

- The complete [AGENTS.md](../../../../AGENTS.md), [generated startup router](../../../op/agent-startup-orientation.generated.md), [review skill](../../../../.agents/skills/architrino-review/SKILL.md), its [live instruction owner](../../../op/skills/skill-architrino-review.md), the complete [corpus reviewer procedure](../../../office-of-research/cto/prompts/corpus-reviewer.md), [theory orientation](../../../op/theory-orientation.md), and [operator explanation standard](../../../op/operator-explanation-standard.md) govern this bounded assignment.
- The [academic style guide](../../../../content/markdown/aaa/archie/academic-style-guide.md), [mathematics style guide](../../../../content/markdown/aaa/archie/mathematics-style-guide.md), [mathematics terminology](../../../../content/markdown/aaa/archie/mathematics-terminology.md), [terminology usage](../../../../content/markdown/aaa/archie/terminology-usage.md), [comparative glossary](../../../../content/markdown/aaa/archie/comparative-glossary.md), and [About Architrino](../../../../content/markdown/aaa/archie/about-architrino.md) supply style, layer, symbol, and selective-reference rules. The [geometry/dynamics review lens](../../../office-of-research/specialists/roles-geometry-dynamics/system-prompt.md) supplies no additional theory authority.
- [Work queue](../work-queue.md), lines 1–49, [priorities](../priorities.md), ownership and phasing sections, [document board](../corpus-review-status.md), priority 49, [conversion ledger](conversion-ledger.md), line 94, and the Radiation scene in [textbook traversal](../../../../content/graph/textbook_toc.json) establish assignment context. Historical queue counts are not treated as current counts. These owners were read only.
- Foundation openings and coordinate anchors were inspected in [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), [Euclidean Void](../../../../content/markdown/aaa/foundations/euclidean-void.md), [Absolute Time](../../../../content/markdown/aaa/foundations/absolute-time.md), [Absolute Timespace](../../../../content/markdown/aaa/foundations/absolute-timespace.md), [Detecting the Absolute Frame](../../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md), and [Constructing the Absolute Frame](../../../../content/markdown/aaa/foundations/constructing-the-absolute-frame.md). These were relevant anchor reads, not full reviews of those chapters.
- [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), opening and causal-root/acceleration definitions; [Electroweak Bosons](../../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md), photon referent status and Gate A/B, especially its helicity residual; [Mode Taxonomy](../../../../content/markdown/aaa/reactions/mode-taxonomy.md), channel vocabulary; [Reaction Ledger](../../../../content/markdown/aaa/validation/reaction-ledger.md), scope and provenance; [Reaction-Cosmology Provenance Ledger](../../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md), radiation and thermalization handoffs; and [Bremsstrahlung](../../../../content/markdown/aaa/reactions/bremsstrahlung.md), opening mechanism and notation, ground the local consistency review. Nearby files can be concurrently edited; this receipt claims no closure of their contents.
- B. Zwiebach, *Quantum Physics III*, MIT 8.06 (2018), [chapter 4, section 4.3, pp. 89–94](https://ocw.mit.edu/courses/8-06-quantum-physics-iii-spring-2018/89ef6d5958ee59bae9a91345c3d8c8e4_MIT8_06S18ch4.pdf), was inspected for density-of-states units and the intermediate time window of the golden rule. D. Tong, *Electromagnetism* (2015), [chapter 7, sections 7.5.4 and 7.6](https://www.damtp.cam.ac.uk/user/tong/em/el6.pdf), was inspected for response analyticity, large-frequency hypotheses, and conductor limits. They constrain standard comparisons only. The local algebra and counterexamples below are separately stated; neither source establishes Architrino dynamics.

## Findings and repairs

Severity `high` means a passage can license an unsupported physical or acceptance conclusion, or misbalance an event. Severity `medium` means a definition, approximation domain, or comparison normalization is missing or overbroad. The findings are demonstrated local issues rather than optional stylistic preferences. Their physical replacements remain conditional wherever the underlying derivation is open.

| ID | Severity | Baseline lines | Demonstrated issue and implemented repair | Claim grade and checkable falsifier |
| --- | --- | --- | --- | --- |
| RAD-01 | High | 3–9, 47, 82, 170 | Foundational branch vocabulary was used without local clues, and every resolved transport change was described as an action-quantum transfer. Added brief linked definitions and separated ordinary transfer accounting from an unproved quantization law; declared the retained-history requirement in the residual inputs. | Measured by full-text comparison for the omissions; inferred for the necessary claim boundary. Falsifier: a supplied derivation establishing quantization for every admitted transport event and the required history map. |
| RAD-02 | Medium | 25–45 | Catch-up geometry, the definition of the Lorentz-like factor, small-turning validity, and the native/observer map were missing. Defined the geometry, supplied the exact factor identity, restricted the displacement approximation, and made the power-law comparison conditional on an overlapping domain and clock/speed map. | Derived algebra and approximation-domain analysis. Falsifier: failure of the stated factor identity, or a uniform remainder bound supporting the original fixed-parameter endpoint extrapolation. |
| RAD-03 | Medium | 84–110 | Subtraction of phase ledgers lacked a common lift/window, and a three-coordinate norm was called distance to the nearest closure class without a reference/minimization rule. Defined matched lifts and winding data, fixed the absolute-time meaning, and delimited the norm. | Derived by phase-representative and projection counterexamples. Falsifier: a declared quotient metric and sufficient retained-state map making the original identification valid. |
| RAD-04 | High | 114–124, 196–217 | A timescale ratio and a phase mismatch were made to select a stable basin and positive excitation gap without an established branch or energy reference. Added stability, amplitude, history, reference-energy, and reachability conditions. | Inferred from missing hypotheses; derived that the displayed ratio and norm contain no stability or reachability information. Falsifier: a same-history theorem supplying those implications on the declared domain. |
| RAD-05 | High | 138–149, 1196 | The thermal cooling ratio was used to choose thermal versus non-thermal channels. Defined cooling-function units, composition and optical assumptions, and separated cooling time from acceleration and spectral partition, including the later target table. | Derived from the diagnostic's inputs: acceleration efficiency and competing losses are absent. Falsifier: a stated channel model proving unique partition from the included inputs. |
| RAD-06 | High | 172–192 | Finite separate four-momentum terms were presumed and a damping term was identified with a conservation residual that should vanish. Declared observer-chart four-momentum, disjoint accounts and driver/medium inputs, and extracted damping from outgoing transfer rather than the zero balance defect. | Derived accounting distinction; inferred finiteness boundary. Falsifier: a proved finite decomposition and a definition in which the proposed damping term is demonstrably a nonzero transfer rather than the total residual. |
| RAD-07 | High | 241–259, 274–292, 298–316, 507–525, 604–622 | The post-drive emission reduction was applied to capture, and zero outgoing photon energy removed the incoming polarization obligation. Reaction-free was also equated with purely radiative. Restricted the reduced budget, required disjoint gains, defined the frequency-exchange tolerance, and retained incoming energy/polarization in capture records and schema fields. | Derived by complete-absorption and recoil counterexamples. Falsifier: an explicit signed input convention that closes the original equation while retaining the absorbed photon's handoff. |
| RAD-08 | Medium | 261–272 | Golden-rule density units and time domain were omitted; cross section was probability divided by flux rather than rate/flux or probability/fluence. Added the needed normalization and prohibited a second phase-space integration of an already integrated rate. | Derived dimensional check, supported by the inspected MIT comparison. Falsifier: a definition of incident flux as fluence in the original text and a consistent final-state measure. |
| RAD-09 | High | 322–370 | Lensing added the counterparties' momentum gains to the photon, opposite the chapter's final-minus-initial balance. The curvature diagnostic also responds to coherent bending. Corrected the two signs and distinguished bending magnitude from a radiation or identity defect. | Derived by conservation and constant-curvature examples. Falsifier: a consistent original incoming-transfer convention, or a proof that every nonzero bending diagnostic violates the accepted coherent family. |
| RAD-10 | Medium | 374–503 | Vacuum field formulas and normal-directed far-zone momentum flux lacked their material, boundary, and radial-propagation restrictions. Defined the observer calibration, fixed-volume/common-origin assumptions, and the source-centered radial sphere; general momentum transfer uses stress flux. | Derived geometry and accounting-domain check. Falsifier: a nonradial boundary satisfying the normal-directed replacement for all outgoing directions without additional terms. |
| RAD-11 | High | 527–602 | Event balance and absence of transverse leakage appeared to imply helicity ±1. Restricted the equation to a Gate B helicity eigenchannel, distinguished intrinsic spin from orbital angular momentum and polarization, and retained only the valid projection-error bound as a local deduction. | Derived: any axial angular momentum satisfies transverse-zero, irrespective of its magnitude. Falsifier: a derivation of the discrete spectrum from independently specified Gate B dynamics. |
| RAD-12 | High | 657–684, 730, 1192 | One additive floor mixed energy, momentum, and angular-momentum units; order-one normalized errors could pass; a named unresolved term could count as closure. Used component-specific floors, predeclared error allowances, independent benchmark requirements, and explicit incomplete/failed disposition for unevaluated terms. | Derived dimensional and acceptance counterexamples. Falsifier: documented prior nondimensionalization and strict tolerances, plus evaluated transfers closing every residual. |
| RAD-13 | High | 751–835, 994–1035 | The finite surface-channel set omitted transmission, and energy, momentum, and angular-momentum budgets used unmatched categories. Added the transmission member and table entry; required disjoint inclusive accounts and common-window fractions, including diffuse output, remnant, recoil, and external supply. | Measured set omission and derived accounting constraints. Falsifier: an existing explicitly declared transmission member or complete disjoint assignment satisfying all original balances. |
| RAD-14 | Medium | 837–871 | A sum of balance defects was called cavity loss, and nonnegative weights allowed unchecked zero-weight bounces. Distinguished balance, optical survival, and phase preservation; required per-bounce checks and stated multiplicative survival. | Derived absorption and zero-weight counterexamples. Falsifier: a definition identifying the balance residual with measured optical survival under additional constraints. |
| RAD-15 | High | 875–924, 1202 | Causal support alone was made to imply upper-half-plane analyticity and unsubtracted Kramers-Kronig relations. Added stability/integrability, asymptotic, instantaneous-response, and boundary-value conditions, including the target ledger. | Derived growing-kernel and instantaneous-response counterexamples; standard domain supported by the inspected Cambridge source. Falsifier: a valid unsubtracted derivation for the excluded kernels without supplementary terms. |
| RAD-16 | Medium | 926–1035 | Conductor, skin-depth, plasma, and Brewster formulas were presented without sufficient regime or variable definitions. Added passive plane-wave and good-conductor assumptions, amplitude/intensity distinction, separate conductivity bookkeeping, effective carrier mass, and nonmagnetic interface restrictions; replaced bare relaxation-time notation by a defined subscript. | Derived equation-domain and dimensional interpretation; standard comparison supported by Cambridge. Falsifier: a calculation extending the same formulas to the excluded magnetic, lossy, growing, or nonlocal cases without modification. |
| RAD-17 | Medium | 1039–1051 | The temperature derivative included Boltzmann's constant without specifying dimensionless entropy. Defined entropy as physical entropy divided by that constant and stated equilibrium differentiability. | Derived units. Falsifier: the original chapter's explicit dimensionless definition, or a consistent dimensional convention giving the same relation for physical entropy. |
| RAD-18 | High | 1053–1063, 1125–1144, 1158 | Coupling/cooling alone was used to establish LTE, while a sum of all interaction rates was declared universally necessary for blackbody approach. Separated state and timescale conditions, interaction and distortion-relaxation rates, number-changing channels, initially Planckian states, and frequency histories; made the integral's observer time explicit. | Derived elastic-scattering and initial-equilibrium counterexamples; inferred relaxation requirements. Falsifier: an admitted dynamics in which the counted interactions necessarily relax every spectral mode, with initial conditions excluding the counterexamples. |
| RAD-19 | Medium | 1081–1123, 1154–1163, 1193–1204, 1214–1228 | Detailed-balance algebra divided implicitly by possibly zero rates; elastic scattering was exactly frequency preserving despite recoil; the final rapid-drive diagram and standard benchmark domains were overbroad. Added nonzero connected rates and consistent degeneracy conventions, recoil/Doppler qualification, acceleration including direction change, and explicit diagram and single-photon/relativistic comparison limits. | Derived zero-rate and recoil limits; inferred scope clarification. Falsifier: a nonzero-rate proof or a declared approximation already making each omitted restriction explicit. |

## Validation working record

Before the target was passed to the in-session math/link/preservation checker, its known-case run returned: `CONTROLS PASS: two math expressions; one display; two links; fenced decoys ignored; malformed math rejected; equal/reordered arrays distinguished; valid/invalid KaTeX distinguished.` The checker uses the existing display-equation parser, KaTeX 0.16.47, and the vendored Markdown parser evaluated in a Node VM. Two earlier module-loading attempts failed before any target processing: the vendored browser bundle was not a callable Node export, and no installed `markdown-it` package existed. Loading the existing browser bundle in its intended global form resolved the harness issue without installing or writing anything.

The first target link run exposed a harness false positive: bracketed TeX followed by parentheses inside the thermalization display was parsed as a Markdown link. No chapter repair was made for that result. Math was masked before Markdown link extraction, and a separate bracketed-TeX known case returned no links before the target was rerun. The corrected target check passed. This is a harness correction, not a demonstrated chapter defect. The strict repository validator later interpreted an inline-code copy of that fixture in this receipt as a link; the redundant inline example was removed, while its executable fenced reproduction below was retained.

Before running the algebraic witnesses below, the arithmetic/vector assertion helpers passed a separate known-case-only run: `WITNESS CONTROLS PASS: arithmetic equality/rejection and vector addition/negation.` The control verifies an exact sum, rejects an incorrect sum, and checks vector addition and negation. Numerical witness inputs use normalized wake speed `c_f=1` whenever that speed enters; observer comparisons and arbitrary angular-momentum units are not identifications with substrate constants.

## Final repair locations

The findings table contains 19 distinct IDs, RAD-01 through RAD-19, by scoped `rg -c` on its ID/severity rows; 11 are high by the corresponding High-row count and the remaining 8 are medium. These final-source references locate their repairs; they are not additional findings.

| Finding | Final chapter lines |
| --- | --- |
| RAD-01 | 5, 49, 172 |
| RAD-02 | 27–47 |
| RAD-03 | 98–112 |
| RAD-04 | 126, 198–219 |
| RAD-05 | 128–151, 1204 |
| RAD-06 | 192–194 |
| RAD-07 | 261, 318, 511–529, 553, 628 |
| RAD-08 | 263–274 |
| RAD-09 | 335–372 |
| RAD-10 | 376, 484–507 |
| RAD-11 | 531–606 |
| RAD-12 | 665–690, 715, 736, 1200, 1209 |
| RAD-13 | 761–841, 1033 |
| RAD-14 | 867–879 |
| RAD-15 | 906–932, 1210 |
| RAD-16 | 934–1043 |
| RAD-17 | 1049–1059 |
| RAD-18 | 1061–1071, 1135–1152, 1166, 1203 |
| RAD-19 | 1099–1131, 1162–1168, 1203, 1238–1242 |

## Separately checkable mathematics

These are derived identities, dimensional arguments, and counterexamples to particular implications, not measured Architrino behavior. The arithmetic runner below checks 11 grouped witness families against stated algebra. It does not evolve an assembly, construct a physical medium, validate the EOM solver, or establish a microscopic reference implementation independent of this editorial reviewer.

- RAD-02: factorization $1-\beta_f^2=(1-\beta_f)(1+\beta_f)$ proves the factor identity for $|\beta_f|<1$. With $c_f=1$, $d=1$, and transverse acceleration magnitude $0.001$, the nominal small-turning parameter $a_\perp t_{\mathrm{prep}}/v$ is $0.004$ at $v=0.5$ but exceeds $10$ at $v=0.9999$. The fixed-parameter endpoint extrapolation leaves its approximation domain. These are kinematic witness inputs, not a physical branch.
- RAD-03 and RAD-04: phases represented by $0$ and $2\pi$ agree on the circle but differ under raw subtraction. Three matched real differences define the weighted norm, not a distance over all histories or a stable reference. An energy difference is positive only after its ordering is established; choosing a geometrically nearest reference does not impose that ordering.
- RAD-05: the cooling ratio is a function of thermal density, temperature, cooling function, size, and speed. Without an independently derived map it cannot determine an omitted acceleration efficiency or spectrum. This is a missing-input implication, not a simulated shock counterexample.
- RAD-06 and RAD-07: source loss $-1$ and outgoing photon gain $+1$ give zero total defect with nonzero radiation. Complete capture has photon change $0-1$ and material gain $+1$. The full signed budget closes; setting the photon contribution to zero leaves the unit material gain unexplained.
- RAD-08 and RAD-12: an energy-valued matrix element, inverse-energy final-state density, and inverse-action prefactor give inverse-time units. Rate divided by incident number flux has area units; probability divided by that flux has area-times-time units. A common dimensional additive floor cannot be added to energy, momentum, and angular momentum without prior nondimensionalization. A conservation defect equal to a whole signal passes an order-one normalized threshold if the denominator is that signal; an error allowance must express the intended accuracy.
- RAD-09: incoming photon momentum $(1,0)$, outgoing momentum $(0,1)$, and counterparty gain $(1,-1)$ close the final-minus-initial balance. Subtracting the gain from incoming momentum gives the outgoing vector; adding it gives $(2,-1)$ and fails. A unit circle has integrated curvature $2\pi$, irrespective of a coherent-transport interpretation, so positivity alone cannot diagnose a defect.
- RAD-10: on a vacuum plane wave the momentum-flux direction is the propagation direction. Replacing it by an arbitrary boundary normal is valid only when they coincide. A fixed control volume avoids moving-boundary transport terms; material storage remains outside the vacuum field-energy formula.
- RAD-11: in angular-momentum units with $\hbar=1$, set the propagation axis to $(0,0,1)$ and both source depletion and photon angular momentum to $(0,0,2)$, with other transfers zero. The balance defect and transverse component vanish, yet the helicity projection is $2$. This refutes the inference, not the photon Gate B spectrum. Cauchy-Schwarz separately proves $|\hat{\mathbf k}\cdot\mathbf B_\gamma^0|/\hbar\le\|\mathbf B_\gamma^0\|/\hbar$.
- RAD-13 and RAD-14: transmission was already named elsewhere in the chapter but absent from its finite surface set. For input $1$, optical output $0.9$, and uptake $0.1$, the balance defect is zero although optical loss is nonzero. Two such bounces leave survival $0.9^2=0.81$. A zero weight hides any finite defect at that bounce.
- RAD-15: a causal growing kernel $\mathcal X(t)=e^{\alpha t}$ for $t\ge0$, $\alpha>0$, has a transform converging only for $\operatorname{Im}\omega>\alpha$. Its analytic continuation is $-1/(\alpha+i\omega)$, with a pole at $\omega=i\alpha$. An instantaneous response has a constant real transform; its zero imaginary part makes the unsubtracted real-part integral zero, which cannot reproduce that nonzero constant without an additional term. The runner checks the elementary boundary statements; this integral calculation is the analytic reference.
- RAD-16 and RAD-17: amplitude decays as $e^{-k_2z}$ and intensity as $e^{-2k_2z}$, giving the factor-of-two attenuation-length distinction. From $S_{\mathrm{phys}}=k_B S_{\mathrm{ens}}$, differentiation gives $\partial S_{\mathrm{ens}}/\partial E=(1/k_B)\partial S_{\mathrm{phys}}/\partial E=1/(k_BT)$.
- RAD-18 and RAD-19: coupling duration $0.01$, cooling duration $1$, and escape duration $0.0001$ give a small coupling/cooling ratio but not coupling faster than escape. Direction-only elastic scattering preserves frequency occupation despite large interaction depth; an already Planckian bath supplies the opposite zero-depth example. Positive connected coefficients and the displayed rate/population ratios give $n/(1+n)=e^{-x}$, hence $n=1/(e^x-1)$ for $x>0$. If both rates vanish, every occupation satisfies balance. The runner checks $g_i=2$, $g_j=3$, emission coefficient $3$, absorption coefficient $2$, $x=1$, and zero-rate occupations $0,1,7$.

The finding-specific falsifiers identify the definitions, domain bounds, or dynamical evidence that would change these dispositions. No guessed physical result was promoted.

## Validation results and generated-artifact status

Measured by the controlled two-path checker reproduced below, the final chapter has 392 successfully rendered math expressions, including 65 displays, and 91 Markdown links, including 89 local links; the receipt has 52 rendered math expressions and 35 links, including 33 local links. All local path targets and Markdown heading fragments checked by that instrument resolve. It skips code and math when finding links; it does not inspect browser-rendered equation-viewer fragments or certify remote availability. All original chapter Markdown links and headings remain present by its baseline preservation comparisons.

Measured by the existing display-equation parser against the fixed baseline commit, all 65 existing equation-viewer identities remain in order; 60 display bodies remain byte-identical and exactly five change intentionally:

| Equation identity suffix | Baseline start | Final start | Authorized change |
| --- | --- | --- | --- |
| `3767dd0c9810d99c` | 334 | 336 | Subtract counterparty momentum gains. |
| `9f79567629bf1e99` | 659 | 665 | Quantity-specific additive-floor subscripts. |
| `6be2dcca60eb646f` | 755 | 761 | Add transmission. |
| `d58a53912edab28d` | 956 | 964 | Define the Drude relaxation subscript. |
| `c23f3cbef64110c7` | 1127 | 1135 | Mark the integration variable and bounds as observer time. |

The complete edited chapter was reread with `nl -ba` and `sed` over contiguous lines 1–300, 301–650, 651–1000, and 1001–1242; subsequent small consistency edits at lines 128, 274, 553, 1061, 1071, 1203, and 1209 were reread in the scoped diff. The complete receipt was also reread. This is editorial self-review, not a second independent reviewer.

| Command or instrument | Observed result and scope |
| --- | --- |
| Controlled Node math/link/preservation runner below | Exit 0 for the two authorized paths; chapter counts and five exact exceptions above. |
| Controlled Node arithmetic runner below | Exit 0; 11 grouped algebraic/diagnostic families passed. |
| `git --no-optional-locks diff --check -- content/markdown/aaa/reactions/radiation.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-radiation-review-2026-09-12.md` | Exit 0; no whitespace errors in the tracked scoped diff. |
| `rg -n '[ \t]+$' content/markdown/aaa/reactions/radiation.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-radiation-review-2026-09-12.md` | Exit 1 with no matches: no trailing spaces/tabs in either file, including the untracked receipt. |
| `node scripts/validate-equation-mapping-links.mjs` | Exit 0; 23 registered promoted equation links resolve across canonical corpus sources. This is narrower than the chapter's 65 source identities. |
| `node scripts/validate-content.mjs --check --strict` | Final run: exit 0; 0 errors, 0 warnings, 30 notes; 1695 repository Markdown files audited. Earlier runs and their changing results are recorded below. This pass does not certify the separate generated-registry check. |
| `node scripts/build-equation-mapping-corpus.mjs --check` | Exit 1; stale `content/generated/equation-mapping/corpus-equations.json`. Snapshot: 199 Markdown files, 4685 displays, 23 promoted equations, 30439 symbol definitions. Concurrent work can change totals. No regeneration run. |
| `shasum -a 256 content/markdown/aaa/reactions/radiation.md` | Final SHA-256: `1b74b1ba87fdc99f43a72a7c022430fc9ed2ec48bf1c0bb1457ff1a058b785a5`. |
| `git show 859f2b07cb17889ca2c239d82fd61455c2ba903c:content/markdown/aaa/reactions/radiation.md \| shasum -a 256` | Reproduced the supplied dispatch hash. |

The first strict-validator run returned four errors, all resolving `../../../../tests/current-launch-bindings.test.js` to missing `tests/current-launch-bindings.test.js`:

- `reference/priorities/development-process-review/analysis/option-b-cached-root-cover-cutover.md:53`
- `reference/priorities/development-process-review/analysis/option-b-cached-root-cover-full-cutover.md:51`
- `reference/priorities/development-process-review/analysis/option-b-current-source-cutover-inventory.md:85`
- `reference/priorities/development-process-review/analysis/option-b-prescribed-response-and-acceleration-cutover.md:5`

Their cause and time of introduction were not investigated; no claim that they were pre-existing or attributable to an agent is made. This worker did not repair them. They were absent from the later strict run, which instead returned one error for the inline-code test fixture at receipt line 50. After removing that redundant inline example as recorded above, the final strict run returned zero errors and warnings. The shared checkout changed concurrently; the earlier four-link failure is retained as validation history, not a current blocker.

The inspected equation generator binds display formulas, viewer identities, source positions, and symbol records into its registry; `scripts/build-equation-mapping-corpus.mjs` lines 710–733 distinguish read-only check from writes. The Radiation scene/section references were found by scoped `rg` in `content/graph/textbook_toc.json`, lines 6376–6509, and the board and conversion ledger retain their ownership records. No exhaustive claim about other consumers or byte binders is made. Changed formulas and source positions require eventual synchronization, but whole-registry drift is not attributed solely to this task.

Deferred exact command, for a separately authorized regeneration/publication runner only: `node scripts/build-equation-mapping-corpus.mjs --write`. Then rerun `node scripts/build-equation-mapping-corpus.mjs --check` and `node scripts/validate-equation-mapping-links.mjs`. Other generators, fixtures, reading copies, source-index freshness, EOM tests, and downstream acceptance sweeps were not run or certified here.

## Closure disposition and remaining obligations

Bounded repair disposition: RAD-01 through RAD-19 are addressed in the two authorized deliverables. This counts repaired local findings, not 19 established physical failures. Missing dynamical hypotheses were repaired by conditional statements, not supplied by editorial declaration.

Open scientific obligations remain: an admissible retained-history source and photon branch; stable return maps and reachable basins; a finite independently justified energy/momentum decomposition; a derived wake-to-outgoing-transfer law; a native-to-observer clock/speed/observable map; Gate A and Gate B including helicity/polarization; independent Gate C benchmarks; material response derived from the same dynamics; and ensemble rates, mixing, escape, and distortion relaxation sufficient for the claimed thermal state. No physical branch existence, EOM solver acceptance, theory closure, general conservation theorem, blackbody recovery, or downstream chapter/cosmology closure is established here.

The remaining validation limitation is deferred equation-registry drift. It does not prevent this bounded receipt, but prevents an all-checks-green claim despite the final strict-content pass. No further local repair was identified by this review. Final scoped `git --no-optional-locks status --short --` on the two authorized paths showed an unstaged chapter modification and an untracked receipt; scoped `git diff --numstat` measured 81 inserted and 67 removed chapter lines.

Next concrete step: the CRW-005 coordinator should adjudicate this receipt and reconcile priority 49 under its authority. This worker did not update shared owners. Leave regeneration to an authorized runner after concurrent authored work settles. No staging, committing, pushing, resets, stashing, linked worktrees, generated writes, or edits to shared status or other chapters were performed.

## Reproduction: controlled math, local links, and preservation

Run from the repository root. Known cases precede the two real paths. Code is retained here rather than created as a third file.

```bash
node --input-type=module <<'NODE'

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
import katex from 'katex';
import {parseCorpusDisplayEquations} from './scripts/build-equation-mapping-corpus.mjs';
const require=createRequire(import.meta.url);
const vm=require('node:vm');
const sandbox={};
vm.runInNewContext(fs.readFileSync('vendor/markdown-it/markdown-it.min.js','utf8'),sandbox);
const md=sandbox.markdownit();
function prose(s){
 let fence=null;
 return s.split('\n').map(l=>{
  const m=l.match(/^\s*(\x60{3,}|~{3,})/);
  if(m){if(!fence)fence=m[1][0];else if(fence===m[1][0])fence=null;return '';}
  return fence?'':l.replace(/(\x60+)([\s\S]*?)\1/g,'');
 }).join('\n');
}
function maths(s){
 const p=prose(s), arr=[];
 const rem=p.replace(/\$\$([\s\S]*?)\$\$|(?<!\\)\$([^\n$]*?)(?<!\\)\$/g,(v,d,i,at)=>{
  arr.push({tex:d??i,display:d!==undefined,line:p.slice(0,at).split('\n').length});return ' '.repeat(v.length);
 });
 assert(!/(?<!\\)\$/.test(rem),'unmatched dollar');
 return arr;
}
function links(s){
 const out=[];function visit(t){for(const x of t){if(x.type==='link_open')out.push(x.attrGet('href'));if(x.type==='image')out.push(x.attrGet('src'));if(x.children)visit(x.children);}}
 const clean=prose(s).replace(/\$\$[\s\S]*?\$\$|(?<!\\)\$[^\n$]*?(?<!\\)\$/g,'');
 visit(md.parse(clean,{}));return out;
}
function same(a,b){return JSON.stringify(a)===JSON.stringify(b);}
const fixture='# Known\n\n$x$ and \x60bad $\x60.\n\n$$\nx^2\n$$\n\n[View →](../../../../equation-mapping.html#known)\n\n[local](AGENTS.md)\n\n\x60\x60\x60md\n$unclosed\n[bad](missing.md)\n\x60\x60\x60\n';
assert.deepEqual(maths(fixture).map(x=>x.tex.trim()),['x','x^2']);
assert.deepEqual(links(fixture),['../../../../equation-mapping.html#known','AGENTS.md']);
assert.equal(parseCorpusDisplayEquations('content/markdown/aaa/reactions/known.md',fixture).length,1);
assert.throws(()=>maths('$unclosed'));
assert(same(['a','b'],['a','b'])&&!same(['a','b'],['b','a']));
katex.renderToString('\\frac{1}{2}',{throwOnError:true,strict:'error'});
assert.throws(()=>katex.renderToString('\\notARealCommand',{throwOnError:true,strict:'error'}));
console.log('CONTROLS PASS: two math expressions; one display; two links; fenced decoys ignored; malformed math rejected; equal/reordered arrays distinguished; valid/invalid KaTeX distinguished.');

assert.deepEqual(links('$$\\left[x\\right](y)$$'),[]);
console.log('MATH-LINK CONTROL PASS: bracketed TeX is not a Markdown link.');


const chapter='content/markdown/aaa/reactions/radiation.md';
const report='reference/priorities/aaa-corpus-rewrite/evidence/crw-005-radiation-review-2026-09-12.md';
function resolved(href,source){const p=decodeURIComponent(href.split('#')[0].split('?')[0]);return p?path.resolve(path.dirname(source),p):path.resolve(source);}
assert(fs.existsSync(resolved('AGENTS.md','known.md')));
assert(!fs.existsSync(resolved('__crw005_known_absent__.md','known.md')));
function anchors(s){return [...s.matchAll(/^#{1,6}\s+(.+)$/gm)].map(m=>m[1].toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu,'').replace(/\s/g,'-'));}
assert(anchors('# Known Heading\n').includes('known-heading'));
console.log('LINK CONTROLS PASS: known existing/missing targets and known heading anchor.');
for(const p of [chapter,report]){
 const s=fs.readFileSync(p,'utf8'), math=maths(s), hrefs=links(s);
 for(const m of math)katex.renderToString(m.tex,{throwOnError:true,strict:'error',displayMode:m.display});
 const local=hrefs.filter(x=>!/^https?:|^mailto:/.test(x));
 for(const href of local){
  assert(!href.startsWith('/'),'absolute link '+href);
  const dest=resolved(href,p);assert(fs.existsSync(dest),p+' missing '+href);
  const frag=href.split('#')[1];
  if(frag&&dest.endsWith('.md')) assert(anchors(fs.readFileSync(dest,'utf8')).includes(decodeURIComponent(frag)),p+' missing anchor '+href);
 }
 console.log(JSON.stringify({p,math:math.length,displays:math.filter(x=>x.display).length,links:hrefs.length,localLinks:local.length}));
}
const old=execFileSync('git',['show','859f2b07cb17889ca2c239d82fd61455c2ba903c:'+chapter],{encoding:'utf8'});
const cur=fs.readFileSync(chapter,'utf8');
const a=parseCorpusDisplayEquations(chapter,old),b=parseCorpusDisplayEquations(chapter,cur);
assert.equal(a.length,b.length);
assert(same(a.map(x=>x.existingLink.text),b.map(x=>x.existingLink.text)),'viewer identities differ');
for(const href of links(old))assert(links(cur).includes(href),'original link removed '+href);
for(const h of old.match(/^#{1,6} .+$/gm))assert(cur.includes(h),'heading removed '+h);
const changed=a.flatMap((x,i)=>x.tex!==b[i].tex?[{baseline:x.startLine,final:b[i].startLine,link:x.existingLink.text}]:[]);
assert.equal(changed.length,5);
console.log(JSON.stringify({displayCount:a.length,unchanged:a.length-changed.length,changed}));

NODE
```

## Reproduction: arithmetic witnesses

```bash
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
const near=(a,b)=>assert(Math.abs(a-b)<=1e-12*Math.max(1,Math.abs(a),Math.abs(b)));
const add=(a,b)=>a.map((v,i)=>v+b[i]);
const neg=a=>a.map(v=>-v);
near(2+3,5);assert.throws(()=>near(2+3,6));
assert.deepEqual(add([1,2],[3,4]),[4,6]);
assert.deepEqual(neg([1,-2]),[-1,2]);
console.log('WITNESS CONTROLS PASS: arithmetic equality/rejection and vector addition/negation.');

const cf=1, d=1, a=.001;
for(const beta of [0,.5,.9,.99])near(1/(1-beta),(1+beta)/(1-beta*beta));
assert(a*d/(cf-.5)/.5<.01);
assert(a*d/(cf-.9999)/.9999>1);
near(Math.cos(0),Math.cos(2*Math.PI));assert(2*Math.PI>0);
const outgoing=1, source=-1;
near(source+outgoing,0);assert(outgoing>0);
near(0-1+1,0);assert(0!==0+1); // capture closes only with incoming photon
const pin=[1,0],pout=[0,1],uptake=[1,-1];
assert.deepEqual(add(add(pout,neg(pin)),uptake),[0,0]);
assert.deepEqual(add(pin,neg(uptake)),pout);
assert.notDeepEqual(add(pin,uptake),pout);
const spin=[0,0,2],deltaJ=[0,0,2];
assert.deepEqual(add(deltaJ,neg(spin)),[0,0,0]);
near(Math.hypot(spin[0],spin[1]),0);assert(![-1,1].includes(spin[2]));
near(2*Math.PI*1,2*Math.PI); // unit circle total curvature, not a defect
near(1-.9-.1,0);near(.9*.9,.81);near(0*100+1*0,0);
near(Math.exp(-2)/(Math.exp(-1)**2),1); // intensity is squared amplitude
const x=1,gi=2,gj=3,Gem=3,Gabs=2,fj=1,fi=gi/gj*Math.exp(-x);
near(Gem*gi,Gabs*gj);
const n=1/Math.expm1(x);
near(Gem*fi*(1+n),Gabs*fj*n);
for(const occupation of [0,1,7])near(0*(1+occupation),0*occupation);
assert(.01/1<.02);assert(.01/.0001>1); // cooling separation fails escape separation
// Real-axis unsubtracted KK applied to X=1: Im X=0, so predicted Re X=0, actual=1.
near(1-0,1);
// e^(alpha t) with transform e^(i omega t): convergence needs Im omega > alpha.
const alpha=1;assert(.5>0&&.5<alpha);near(alpha+(-alpha),0);
const labels=['RAD-02 catch-up identity and endpoint domain','RAD-03 phase representatives',
'RAD-06 zero balance with nonzero output','RAD-07 capture input',
'RAD-09 lens signs and coherent curvature','RAD-11 helicity counterexample',
'RAD-14 loss versus balance and zero weight','RAD-16 amplitude versus intensity',
'RAD-19 nonzero detailed balance and zero-rate degeneracy',
'RAD-18 escape versus cooling','RAD-15 instantaneous and growing kernels'];
console.log('WITNESSES PASS: '+labels.length+' grouped algebraic/diagnostic families.');
for(const s of labels)console.log(s);

NODE
```
