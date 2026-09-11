# CRW-005 Independent Review: Noether Sea Pro/Anti Coupling

Review date: 2026-09-11. Assignment: independent, complete-chapter review in the existing shared checkout. Disposition: corrections recommended before treating this chapter as a reliable explanatory reference; the organizing hypothesis itself is neither established nor refuted by this review.

The principal demonstrated mismatch is at chapter line 49: the signed difference of pro/anti population densities is identified with an ambient balance diagnostic whose linked definition contains additional neutral-pairing and orientation/polarization information. The three displayed equations are otherwise consistent as definitions on a declared two-class population. The main remaining issues are an unconditional stability requirement without a dynamical basis, missing classification and normalization conditions, an unsupported passage from complementary orientation to transparency, and an unspecified meaning of a minimal four-braid cluster. These are not evidence that the proposed Noether sea or a particular cluster cannot exist.

## Scope, independence, and source identity

The reviewed chapter is [Noether Sea Pro/Anti Coupling](../../../../content/markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md). Every line, 1–101, was read. The revised [Noether Sea](../../../../content/markdown/aaa/spacetime/noether-sea.md) was read in full, lines 1–1271. Its SHA-256 matches the operator-supplied value. Line references below refer to these source bytes, not rendered page positions.

| Source | Lines by `wc -l` | SHA-256 by `shasum -a 256` |
| --- | ---: | --- |
| Current `content/markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md` | 101 | `96df9a1789f56f2adc7684d7170df969f38c5d5f6d95f1cde22c6d298fd70215` |
| Current `content/markdown/aaa/spacetime/noether-sea.md` | 1271 | `ce5cbbcd3860dd8092d101a4354b27c71ceeb38f7187a9fe44c3e6712950d2d9` |
| Assigned chapter at `897fe1aa7` | 100 | `616ec23b00e4781e4cdaa21d25f3ffd5e78f9524a42b1b8547fd5c18210bfd9f` |
| Noether sea chapter at `897fe1aa7` | 1216 | `255cb1bb0441724cf9ce36110a4a7c30b173abbc7454420d163fd379cac8798d` |

The historical commit resolves by `git rev-parse 897fe1aa7` to `897fe1aa79be7ae1e77144d52ef396d209645323`; the observed checkout HEAD was `8f07f380f832dc9d1bb332382097fbc40731b8c6`. The full historical assigned chapter was inspected with `git show`. Its diff against the reviewed source contains one inserted blank line following the first equation-view link and no changed prose or formulas. Thus the concerns below are present in the pre-campaign assigned source as well; this comparison establishes textual continuity, not original authorship or the commit that introduced an issue. Historical Noether sea bytes were hashed and counted, but that historical companion was not subjected to a second full review.

The review followed live `AGENTS.md`, the generated startup router's Corpus review route, the architrino-review skill and its maintained owner, the corpus-reviewer procedure, theory orientation, operator explanation standard, goal-seeking procedure, and repository skills policy. Style and terminology checks used the academic and mathematics style guides and relevant symbol, terminology, and comparative-glossary entries. Nearby source checks included foundational layer definitions, the canonical Master Equation section, the complete Noether Braid overview, the orientation passages in Constructing the Absolute Frame and Horizon Chirality, the assembly–sea interface definition, the causal-writhe definition, and the metric/clock/cosmology routing passages. This is a full review of the assigned chapter, not an exhaustive audit of every linked book-length owner.

No reviewer reports or reviewer messages were consulted, no reviewer was contacted, and no conclusion was adopted by reviewer agreement. Historical workflow memory was used only to orient the procedure; scientific findings were established from the live sources and the explicit arguments below. Independence here means that the algebraic checks, counterexamples, and source comparisons are separately checkable; neither another agent nor a structural parser certifies the physics.

Only this evidence file and disposable material under `.tmp/crw005-pro-anti-review/` were created or edited by this review. The corpus, shared trackers, generators, and Git publication state were not changed by this task.

## Findings and severity

P2 denotes a correction needed to prevent a misleading scientific or mathematical reading. P3 denotes an explanatory or presentation improvement. A demonstrated error is separated below from an incomplete hypothesis, a missing assumption, and an open physical obligation. Recommended repairs remain proposals; none has been applied to a corpus source.

| ID | Severity | Assigned chapter lines | Classification | Finding |
| --- | --- | --- | --- | --- |
| F1 | P2 | 49 | Demonstrated definition mismatch | The full ambient balance diagnostic is not generally a normalized signed population difference. |
| F2 | P2 | 41–49, 87 | Claim-grade overstatement | A stability threshold is asserted as required although only a population identity and an open coupling hypothesis are supplied. |
| F3 | P2 | 11–21, 27–49 | Missing domain and definition | The two-component identity needs a complete orientation classification, shared smoothing convention, and positive reference density. |
| F4 | P2 | 25, 55–68 | Unsupported mechanism inference | Opposite handedness and count balance do not establish antiparallel circulation, wake cancellation, or transparency. |
| F5 | P3 | 55–61, 68, 101 | Ambiguous minimality; open dynamics | Four members are not minimal for either polarity neutrality or pro/anti count balance; the stronger intended property is unspecified. |
| F6 | P3 | 3–7, 16–25, 49, 80–97 | Reader-flow and terminology defect | Undefined load-bearing concepts and ownership language interrupt a short hypothesis explanation. |

### F1. Preserve the full ambient balance diagnostic

At line 49, the chapter says that the ambient diagnostic's `Delta_bal` term is the normalized window readout of the signed density difference. The revised Noether sea chapter, lines 629–649, instead describes a neutral-pairing/orientation diagnostic, explicitly says that it is not a dynamical equilibrium or stability test, and points to the assembly-facing definition. [Braid Envelope Geometry](../../../../content/markdown/aaa/noether-braid/braid-envelope-geometry.md#assembly-noether-sea-interface-diagnostic), lines 289–305, defines

$$
\left(\Delta_{\mathrm{bal}}^{(\ell)}\right)^2
=\frac{\|\mathcal N_\ell^{\setminus\mathrm{res}}\|^2}{\epsilon_N^2}
+\frac{\|\mathbf P_\ell^{\setminus\mathrm{res}}\|^2}{\epsilon_P^2}
$$

Here the first numerator is a neutral-pairing residual, the second is an orientation/polarization residual, and the positive denominators are separately declared resolution scales. Neither numerator is defined there as the signed pro-minus-anti number density. The diagnostic is a norm-like magnitude, whereas the chapter's density difference carries a sign and number-per-volume units.

An algebraic counterexample to the claimed general identification is a window with equal orientation counts, hence zero density difference, but residual values `N = 0` and `||P|| = epsilon_P`. The interface formula gives `Delta_bal^2 = 1`; any normalized zero density difference remains zero. This is a counterassignment permitted by the displayed diagnostic, not a claim that such a window has been evolved as a physical sea. For the scalar identification to hold, an additional reduction must exclude such assignments by proving how both residuals depend on the count difference. Neither the assigned chapter nor the cited interface passages supplies it.

Smallest repair: describe the normalized density difference as a candidate contribution to the orientation part of the ambient diagnostic. Preserve the independent neutral-pairing and orientation/polarization terms, or state and justify the restricted subclass in which they reduce to a single scalar. Keep diagnostic tolerance separate from a physical stability threshold.

Claim grade: derived for the algebraic non-equivalence; measured for the source mismatch by line-numbered reads of the three cited passages. Falsifier: a same-domain derivation fixing both residuals uniquely from the signed population difference, with matching units, window, exclusion rule, and normalization, would remove the mismatch on that domain. Merely choosing a normalization does not do this.

### F2. A population bound is not a dynamical stability criterion

Line 23 appropriately says coexistence may be required. Line 49 strengthens this to the statement that long-lived regions require an imbalance below a coupling-dependent stability threshold. The chapter gives no evolution equation, equilibrium branch, perturbation class, threshold, or retained-history evidence for that necessity. Its closing line 101 correctly leaves the coupling law open; it does not supply the missing derivation at line 49. The revised Noether sea chapter's explicit diagnostic/stability distinction at lines 629–649 makes this qualification particularly necessary.

For nonnegative number densities, addition and subtraction give the exact inverse relations

$$
\rho_+=\frac{\rho_{\mathrm{NS}}+\Delta\rho_{\mathrm{NS}}}{2},
\qquad
\rho_-=\frac{\rho_{\mathrm{NS}}-\Delta\rho_{\mathrm{NS}}}{2}
$$

Consequently,

$$
|\Delta\rho_{\mathrm{NS}}|\le\rho_{\mathrm{NS}}
$$

This is a positivity bound at a specified event, not a uniform absolute-density bound over the universe and not a stability result. Where total density is positive, define the temporary review variable `b` as the signed fractional imbalance,

$$
b=\frac{\Delta\rho_{\mathrm{NS}}}{\rho_{\mathrm{NS}}},
\qquad -1\le b\le1
$$

The boundary `|b| = 1` simply means that one classified orientation has zero density. Algebra does not forbid it. To see why the sign of stability is independent information, compare the two illustrative scalar laws

$$
\frac{db}{dT}=-\lambda b(1-b^2)
\qquad\text{and}\qquad
\frac{db}{dT}=+\lambda b(1-b^2),
\qquad \lambda>0
$$

Both preserve the interval `[-1,1]` for initial data in it. Their derivatives at `b = 0` are respectively `-lambda` and `+lambda`, so the same balanced state is locally attracting in the first and repelling in the second. These comparison equations are not proposed architrino laws and do not determine which behavior the Master Equation produces. They establish only that the density definitions and a symmetry between signs cannot determine stability.

Smallest repair: state the exact positivity bound, and label any stricter persistence threshold as a hypothesis to be derived for a specified retained branch and environment. Replace the unqualified requirement at line 49 with that conditional claim. A reader-ready hypothesis note need not solve the complete stability problem, but must not imply that the membership diagnostic has solved it.

Claim grade: derived for the positivity inequality and comparison-law distinction; inferred for the editorial judgment that the local necessity language exceeds its evidence. Falsifier: an independently checkable retained-branch calculation deriving a stricter necessary threshold under stated boundary conditions would support the stronger statement for that regime. A favorable membership score alone would not.

### F3. Define which population is being split

The revised Noether sea chapter, lines 9–18, defines `rho_NS` as braid number density using a nonnegative, normalized spatial smoothing window and an ambient identity set. The assigned chapter's lines 27–36 do not repeat that brief definition, name the reference value `rho_NS,0`, or state which carriers have a defined pro/anti sign. This matters because line 21 acknowledges that the invariant still needs completion, while [Terminology Usage](../../../../content/markdown/aaa/archie/terminology-usage.md#proanti-orientation-and-polarity-conjugation), lines 149–187, explicitly withholds the sign at the planar limit. The broad Noether Braid overview also includes configurations beyond a nondegenerate three-dimensional indexed frame.

An exact specialization of the current population definition is available. On an independently classified ambient identity set in which every carrier has a defined sign `o_s`, use the same braid centers and the same smoothing window for both components:

$$
\rho_\pm(\mathbf X,T)
=\sum_{s\in\mathcal I_{\mathrm{sea}}(T)}
W_\ell(\mathbf X-\mathbf X_s(T))\frac{1\pm o_s(T)}{2}
$$

Because `o_s` is either `+1` or `-1`, its two indicator weights add to one and have difference `o_s`. The chapter's sum and difference equations follow immediately. The window has inverse-volume units, integrates to one, and uses the ambient classification that excludes resolved assemblies. This derivation defines a conditional projection; it neither constructs the sign nor proves that the chosen population is physically selected.

If an admitted ambient identity lacks a sign, the two indicator weights are unavailable. Omitting that identity from both sums leaves its positive weight out of the total-density equation. Assigning it an arbitrary sign conceals the missing classification. This does not mean that planar photon packets must be counted as ambient sea: the revised owner permits their separate classification. It means that the assumption excluding all unclassified carriers from the stated ambient population must be visible.

The normalization additionally requires a declared constant reference number density `rho_NS,0 > 0`, in the same units as `rho_NS`. A zero local total density still permits `n = 0`; it makes the fractional imbalance `b` and the population-average diagnostic undefined. These are different denominator conditions.

Smallest repair: introduce the components as smoothed ambient number densities on the nondegenerate classified branch, identify the common window and exclusion convention, name the positive reference density, and state how unclassified carriers or branch transitions are excluded or retained as unresolved contributions. A short definition beside the equations is sufficient; a new tracker or ontology is unnecessary.

Claim grade: derived for the indicator identities and missing-weight counterexample; measured for the absent local qualifications by reading lines 27–49. Falsifier: a declaration that the complete ambient set lies in a certified two-sign domain, with common smoothing and positive reference density, removes the omission. It must be supported on the proposed population, not inferred from the label “Noether braid.”

### F4. Separate handedness, antiparallel circulation, and transparency

Line 25 offers an antiparallel-pairing picture, then says that complementary orientations give mutual suppression of polar-site leakage and comparative transparency. Lines 55–68 repeat low-moment, torque, and robustness motivations. These are useful hypotheses, but the intermediate steps are not established by an orientation sign or equal counts. The revised Noether sea chapter, lines 154–178, requires both bounded loss/scattering and the required nonzero response; lines 190–192 additionally distinguish central support, reciprocal whole-complex balance, and stability.

The first distinction can be checked without a physical model. A chirality sign is unchanged by proper rotation. Rotating one member of an opposite-chirality pair therefore preserves its pro/anti count while changing which axes face one another. Opposite chirality alone cannot specify relative alignment. More sharply, spatial inversion sends positions and velocities to their negatives, but leaves a kinematic circulation vector unchanged:

$$
(-\mathbf r)\times(-\mathbf V)=\mathbf r\times\mathbf V
$$

Thus a parity image can carry opposite proposed pro/anti sign and the same axial circulation vector. An additional relative rotation, phase relation, or dynamical selection is required to obtain antiparallel circulation. The cross product here is a geometric diagnostic, not a primitive magnetic interaction or an assumption of architrino mass.

The second distinction follows directly from the canonical [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), lines 1373–1524. For a fixed receiver and admitted roots, cancellation requires cancellation of the full signed vectors, including separation, direction, and transmitter weight. Equal numbers of opposite polarities do not cancel arbitrary weighted terms. As a separately checkable static-history probe, set `c_f = 1`, `kappa = 1`, and polarity magnitudes to one. Put a positive receiver at the origin, a positive transmitter at `X = 1`, and a negative transmitter at `X = 2`, all with zero velocity in their supplied histories. The roots at receiver time `T_r = 0` are `T_t = -1` and `-2`, both have `D_t = 1`, and the total contribution is

$$
\mathbf A=(-1+1/4)\hat{\mathbf x}
=-\frac34\hat{\mathbf x}
$$

The source inventory is neutral but the acceleration does not cancel. This probe is not a retained solution or a Noether braid; it refutes only the implication from count neutrality to cancellation. The physical cluster hypothesis needs a corresponding all-root calculation on its actual histories. Even a canceled low-order wake moment would not alone establish lossless transmission and the required medium response.

Smallest repair: explicitly call polar leakage suppression and transparency the proposed outcomes of an as-yet-undetermined relative orientation, phase, and coupling law. Name the comparison: the same declared probes and retained-history window for the cluster and its chosen reference configuration. Do not claim a suppression magnitude or transparency result without that evidence. The chapter already refuses to import a nuclear binding law, and that restriction should be preserved.

Claim grade: derived for the orientation/alignment distinction and the static-root non-cancellation example; inferred for the diagnosis of an unsupported mechanism transition in the prose. Falsifier: a retained cluster record and independent all-root comparison demonstrating the stated suppression, together with channel response/loss bounds, would support the physical claim on its declared domain. The example does not falsify the existential possibility expressed by “can.”

### F5. Specify the property for which four members are minimal

The phrase “minimal neutral cluster” at line 55 lacks a minimization criterion. Each constituent braid is already polarity neutral, and one pro plus one anti already has zero pro/anti count difference. The arithmetic is exact: equal nonzero integer counts first occur at `(1,1)`, not `(2,2)`. A four-member arrangement can be a candidate minimal structure for some stronger requirement—specified packing, reciprocal support, or perturbation tolerance—but the chapter does not establish such a requirement.

The single-constituent motivation can be made precise without claiming stability. In an initially balanced `(k,k)` count, losing one member of either sign leaves fractional imbalance magnitude `1/(2k-1)`. This is `1` for a pair and `1/3` for a four-member group. That is reduced fractional count disturbance, not evidence of binding or dynamical recovery; the absolute count difference is one in both cases. Moreover, displacement, phase perturbation, and removal are different tests. The chapter says perturbation, not necessarily removal, so this calculation illustrates a possible criterion rather than interpreting its current sentence as a completed theorem.

The helium comparison is clearly labeled as an analogy, and lines 63–68 explicitly reject reusing baryons or QCD binding equations. There is no demonstrated forbidden nuclear-law import. However, the count analogy does not carry the low-moment configuration or the robustness result along with it. No external nuclear reference could establish those properties for this different assembly.

Smallest repair: say “candidate four-braid cluster” rather than “minimal neutral cluster,” unless a stronger property and comparison with smaller groups are supplied. Retain the bounded geometric/count analogy if it helps, while leaving compactness, robustness, and low torque as properties to calculate. At line 101, an energy-minimum test also needs a declared energy functional, constraints, and surrounding-medium account; a scalar minimum alone is not a general stability theorem for delayed dynamics.

Claim grade: derived for minimal count balance and the removal calculation; inferred for the ambiguity and repair recommendation. Falsifier: a defined property requiring at least four braids and a proof excluding smaller candidates would justify minimality with respect to that property. A retained perturbation calculation could justify robustness; the helium count cannot.

### F6. Make the hypothesis readable without workflow context

The chapter repeatedly introduces itself through ownership and consumers: lines 5, 16, 51, and 80–97. Its “Ownership Boundary” is useful operational routing, but a reader-facing explanation can convey the same links through a concise “Related descriptions” paragraph. The academic style guide's Audience and Self-contained exposition sections require a clue at first use rather than reliance on an external chapter or internal workflow vocabulary.

The load-bearing terms include Noether braid at line 3, indexed-frame orientation and retained branch at line 21, axial circulation and polar-site leakage at line 25, and the coarse window and excluded assembly ledgers at line 49. The text does not locally explain what the neutral assembly is, what circulates at the polar sites, what signal “leakage” measures, or how the spatial population window is chosen. The exact density definitions are addressed in F3 rather than duplicated as an additional mathematical defect.

Smallest repair: add brief physical definitions where these terms become necessary, split the long orientation and diagnostic paragraphs into definition, implication, and open condition, and replace ownership lists with compact navigation prose. Define `C` as polarity reversal at fixed paths and `P` as spatial reflection before relying on the transformation rules. Preserve the excellent distinction between persistent binary identities and sorted radii/frequencies at line 21. State the subject directly instead of calling it a note repeatedly.

Claim grade: measured for the locations and wording by full source read; inferred for the reader-flow judgment. Falsifier: local definitions sufficient to identify the physical object, readout, and hypothesis boundary without following the links would remove the explanatory objection. This is not a physics failure and does not license a change to the underlying symbols or claim strength.

## Open obligations, not demonstrated errors

### Orientation carrier and its parity action

Lines 21, 23, and 101 already say that the invariant and its parity behavior remain to be established. It would therefore be incorrect to report the mere absence of a completed invariant as a discovered false theorem. The source also correctly rejects temporal order and radius sorting as the sign carrier.

A useful check for the future construction is the parity type of its inputs. If three ordinary angular-momentum or circulation vectors are used, each is axial: under an orthogonal transformation `R` it transforms as `det(R) R L`. Their scalar triple product consequently obeys

$$
\det[\mathbf L'_1,\mathbf L'_2,\mathbf L'_3]
=(\det R)^4\det[\mathbf L_1,\mathbf L_2,\mathbf L_3]
=\det[\mathbf L_1,\mathbf L_2,\mathbf L_3]
$$

It is parity even and cannot by itself be the required parity-odd sign. A triple product of three polar displacement vectors is parity odd, but its sign alone does not prove preservation under allowed branch deformations; zero crossings must be excluded on the actual domain. The chapter does not explicitly adopt either formula, so this is a constraint on candidate construction, not a finding that it contains the wrong determinant.

The linked topology routes are also qualified. Constructing the Absolute Frame, lines 173–189, requires a closed nonsingular framed ribbon and distinguishes linking from writhe and coordinate handedness. [Causal Action Functional](../../../../content/markdown/aaa/dynamics/causal-action-functional.md#causal-writhe-and-topological-use), lines 99–117, defines causal writhe as a projection-dependent selected-crossing statistic and explicitly does not equate it with a protected invariant. Horizon Chirality, lines 25–52, supplies candidates and links back to this chapter; it is not an independent completed construction. A future proof must supply the actual retained curves, closure, framing, transformation, and allowed deformation class.

Claim grade: derived for the axial determinant transformation; measured for the cited qualification in the live owners. Falsifier: a purported three-axial-vector determinant that reverses under a correctly transformed spatial inversion would contradict the derivation. A completed different carrier with the required symmetry and deformation theorem would discharge the open obligation without conflicting with this review.

### Population dynamics, cluster retention, and effective export

The sum/difference definitions introduce no fluxes or orientation-conversion rates. Once orientation-resolved continuity is attempted, addition and subtraction of the two component balances must recover the total-density and imbalance balances on the same ambient identity set, with recruitment, return, boundary flux, and any undefined-sign transition counted consistently. This is an open coupling-law obligation, not a missing term in one of the chapter's three definitional equations.

Whole-cluster retention must precede perturbation analysis. A central braid balanced by prescribed neighbors is not a balanced complex until every neighbor also satisfies its equation on the same histories. A candidate energy extremum is not a substitute for that check. The revised Noether sea chapter, lines 184–231, provides the relevant environment and reciprocal-support boundary; the Causal Action Functional introduction explicitly says its scalar is not a proved variational generator.

Lines 72–78 and 101 correctly place metric, wave, and cosmology outputs downstream of assembly response and retain hypothesis language. A weak-field density perturbation is not stated there to be the sole response variable; it would overread the sentence to accuse it of explicitly identifying density with delay. Nevertheless, any future quantitative export must retain the distinct density, delay, cadence, stress, orientation, and clock/ruler variables in Noether sea lines 259–347 and the shared map in Emergent Metric lines 47–70. Equal pro/anti counts do not themselves supply isotropy, wave speeds, constitutive coefficients, abundance, packing, or observer recovery.

Claim grade: inferred for these remaining proof obligations from the stated hypothesis and the live contracts. Falsifier/completion evidence: an independently checked same-history construction supplying the missing orientation balance, reciprocal retention, response extraction, and observer comparisons would discharge each relevant obligation. This review neither ran such a simulation nor searched every retained numerical evidence collection for one.

## Complete chapter coverage and positive checks

| Lines | Review disposition |
| --- | --- |
| 1–7 | Topic and scope are identifiable. The fixed background, medium contents, and effective layer agree with the revised Noether sea chapter. “Persistent” describes the intended medium ontology, not a measured retention result; improve the local explanatory clue under F6. |
| 9–23 | Persistent indices, orientation/polarity separation, and the conditional parity claim are appropriate. Carrier existence and degenerate-domain treatment remain open; F3 identifies the consequence for population counting. |
| 25 | Pairing-to-suppression inference requires the qualifications in F4. |
| 27–39 | Density sum and reference normalization are algebraically consistent with the revised number-density convention under F3's assumptions. `n` is not used as refractive index. |
| 41–51 | Difference equation has the correct sign. F1 and F2 concern the interpretation of its diagnostic and stability implications. |
| 53–68 | The four-member motif is openly speculative, and the nuclear mechanism is not imported. F4 and F5 identify the unproved suppression, robustness, and minimality. |
| 70–78 | Effective geometry stays distinct from the Euclidean void. No explicit speed equality, metric theorem, or cosmological law is asserted. Quantitative recovery remains open. |
| 80–97 | Routing destinations exist and match their broad subjects. Reader-facing ownership language is the F6 issue; it is not a broken-link result. |
| 99–101 | The closing hypothesis boundary is valuable and should be preserved. It does not retroactively derive the stronger claims earlier in the chapter. Energy minimum, retention, stability, and observer export must remain distinct. |

Global polarity conjugation is independently consistent with the canonical acceleration formula on a fixed admitted-history domain. Replacing every `q_i` by `-q_i` preserves every product `q_i q_j`, while leaving root geometry and transmitter weights unchanged. Any orientation functional depending only on those indexed paths is therefore unchanged by `C`. This validates the chapter's separation of labels; it does not prove the existence of a matter/antimatter branch or decide the separate orientation-antimatter correspondence hypothesis in Terminology Usage lines 189–197.

The absence of external references in this short hypothesis chapter is not independently an error. The source policy permits explicit original reasoning and bounded hypotheses without an ornamental bibliography. The helium analogy cannot certify the proposed dynamics, and adding a nuclear citation would not repair that gap. No external numerical measurement is presented in the assigned chapter. External works named in nearby canon were not treated as independently verified evidence in this review; the substantive checks above are direct algebra, geometric transformation rules, and local source comparisons.

## Validation commands and results

All commands ran in `/Users/markmorris/vibe/architrino`. No Python, generator `--write`, broad test wrapper, solver run, commit, push, pull request, or worktree operation was used.

| Command or instrument | Recorded result and scope |
| --- | --- |
| `test -r AGENTS.md` followed by `cat AGENTS.md` | Checkout readable; live startup file read. |
| `nl -ba content/markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md` | Full 101-line source read; findings use these exact line numbers. |
| `nl -ba content/markdown/aaa/spacetime/noether-sea.md` with contiguous `sed` windows | Full revised companion read through line 1271. |
| `shasum -a 256` and `wc -l` on the two current chapters | Hashes and counts in the source table; the supplied companion hash matched. |
| `git show 897fe1aa7:content/markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md` | Full 100-line pre-campaign target available and read. Separate hash/count commands produced the historical table values. |
| `git diff 897fe1aa7 -- content/markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md` | Exactly one added blank line after the first equation-view link; no substantive source difference in this comparison. |
| `git --no-optional-locks status --short --` followed by the two chapter paths | Empty output at the scoped checks; no source/index change reported for those paths. This is not a claim about the whole shared checkout. |
| `node .tmp/crw005-pro-anti-review/check-review.mjs --self-test` | Passed before the target run: one real Markdown link; fenced link/math and inline-code math excluded; expected heading slug; one display and one inline expression; two-node TOC traversal; valid/invalid KaTeX controls; matching and mismatching source/formula binding controls. |
| `node .tmp/crw005-pro-anti-review/check-review.mjs` | Exit 0. Parsed 19 links, all local file/heading/registry checks passed. Three display equations and 21 inline expressions parsed with zero KaTeX errors. Three source/formula registry bindings passed. One textbook TOC entry matched the assigned path. The independently calculated SHA-256 and logical line count agreed with `shasum`/`wc`. |

The scratch verifier uses the repository's existing `parseCorpusDisplayEquations`, bundled Markdown-it, and bundled KaTeX 0.16.11. Its new link/inline-math/heading/TOC/binding glue was tested on known fixtures before running on the chapter. The first self-test launch failed because of an incorrect relative import; the second failed because a VM-created array has a different prototype under strict deep comparison. Both were corrected in scratch, and the fixture then passed before any target run. A later addition of explicit equation source/formula binding checks also passed its fixtures before the updated target run. These were instrument-development failures, not corpus findings.

The link results are 11 plain local-file links, five Markdown heading links, and three equation-view links. The display IDs are `corpus-equation-8b71698c0f19606e` at lines 29–33, `corpus-equation-97ffe36cc3e2158c` at lines 35–39, and `corpus-equation-065ce48e2e3776f9` at lines 43–47. Each was found exactly once by the binding comparison with the same source path and TeX. Registry agreement proves source consistency, not mathematical independence, semantic symbol completeness, or browser behavior.

The TOC lookup found `spacetime__noether_sea_pro_anti_coupling`, titled “Noether Sea Pro/Anti Coupling.” The explicit single-chapter assignment governed scope; no other chapter was independently reviewed as an additional campaign item.

Additional source fingerprints used for substantive cross-checks were measured with `shasum -a 256`:

| Path relative to `content/markdown/aaa/` | SHA-256 |
| --- | --- |
| `noether-braid/braid-envelope-geometry.md` | `8a9cc859f4e99b3ff69533f685217f3584acf1858f0384aafb9ad51ccd4960f5` |
| `foundations/constructing-the-absolute-frame.md` | `338bade09771545d55eaa58ef7bae25727ddd224160424088160cc4bb8d103cc` |
| `spacetime/horizon-chirality.md` | `4791d2399ddb04fd698bde353bdda32ef9d77e79f51e59f6a5706b8ba5bc61b7` |
| `archie/terminology-usage.md` | `529168068a9d345096226e5086a444810aa324df903cc0ea24fe2549d68df33a` |
| `dynamics/master-equation.md` | `c402cc83621b60f0a80ad4f1f48a4db1a6fa12a5a6c2874d02b9d93e03c2cf05` |

## Limitations and repair order

The full assigned source and full revised companion were reviewed; other large owners were read at relevant definitions and interfaces. No claim is made that all mathematics elsewhere in those owners is correct. In particular, the mathematical terminology table still calls `rho_NS` a mass/number density at line 59, whereas the requested revised Noether sea source explicitly selects number density at line 18. This review uses that more specific population definition and does not silently amend the glossary. A future corpus integration should preserve that choice explicitly.

The structural check is source-level validation. KaTeX parsing used the checked-in iOS renderer bundle as a syntax instrument; no iOS package was regenerated and no web browser visual inspection was performed. Heading checks use the repository source-index slug convention for the five ordinary anchors actually present; they do not certify every renderer's anchor behavior. The full content-integrity wrapper was not run because it includes a runtime-assets `--write` step and broader unrelated gates. No whole-repository validation result is claimed.

The analytic examples are definition checks and prescribed-history counterexamples to invalid implications. They are not evolved clusters, independent experimental measurements, or proofs of instability of the actual proposed medium. In particular, no equilibrium was assumed for a stability spectrum, no primitive architrino mass or nuclear interaction was imported, and all numerical wake examples used `c_f = 1`. A second model reproducing these words or numbers would not increase the claim grade.

Recommended repair order: correct F1's diagnostic identification; distinguish the F2 population bound from a persistence hypothesis; state F3's classification and density definitions; qualify F4's proposed suppression mechanism; then resolve the F5 minimality wording and F6 exposition. The orientation invariant, reciprocal cluster retention, coupling law, and common constitutive export remain open scientific work. Those obligations do not require turning this bounded hypothesis chapter into a claim of completed theory.

Final verification after writing the report: `shasum -a 256` returned the same seven current-source hashes recorded above, including the assigned chapter and the operator-pinned Noether sea companion; `wc -l` again returned 101 and 1271 for those chapters. `node .tmp/crw005-pro-anti-review/check-review.mjs --report` passed all six report links and all nine displayed report equations after the known-case self-test passed. `git diff --no-index --check /dev/null reference/priorities/aaa-corpus-rewrite/evidence/crw-005-noether-sea-pro-anti-coupling-review-2026-09-11.md` emitted no whitespace diagnostics; its exit status was 1 because the new nonempty file differs from `/dev/null`, not a clean-diff exit 0. Scoped `git --no-optional-locks status --short` showed only the new untracked evidence report among that report and the two assigned chapter paths. These checks support byte-stable source references and a readable evidence artifact; they do not upgrade the physical hypotheses.
