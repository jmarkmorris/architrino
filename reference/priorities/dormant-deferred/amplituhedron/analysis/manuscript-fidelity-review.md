# Positive-Geometry Manuscript Fidelity Review

## Disposition and scope

**Final disposition: accepted as a faithful explanatory draft after F1 and F2 closure.** The revised manuscript preserves the dormant comparison, scientific exclusions, complete recovery dependencies and the distinction between source history and current external verification. Its new elementary arguments correctly explain why an outcome probability, an amplitude and a canonical differential form cannot be silently identified. The two initially missing source qualifications—positivity of the external kinematic data and the infrared-safe observable requirement after loop integration—are restored. The initial findings and reviewed input hashes below remain historical; the final freeze and closure evidence appear at the end.

This is an independent two-way editorial fidelity audit with direct elementary mathematical checks. It is not independent verification of the external amplitude literature, a source-derived Architrino amplitude, any current scattering carrier or a positive-geometry recovery map. The scientific topic remains dormant; manuscript work neither satisfies a revisit trigger nor authorizes a new scientific task.

## Frozen inputs and actual reading

| Input | SHA-256 at comparison | Direct full reading |
| --- | --- | --- |
| [Original comparison](../amplituhedron.md) | `b09d2bd97da3461c20d837a5561b87d4cb6271c3b0d7e62e5618548999ddd810` | All 408 lines/39,577 bytes; untruncated numbered ranges 1–105, 106–210, 211–310, 311–408 |
| [Manuscript](../manuscript.md) | `70bc524b8486206dc54080ae68adde8241e1a2147eacaf94abee1fa7dc159d44` | All 137 lines/15,529 bytes; untruncated numbered ranges 1–75, 76–137 |
| [Author coverage](manuscript-source-coverage.md) | `0daaab27eeb2377f10fbfc0cad7d697b93b5f1c8089001ff7f8919b7bd1b6325` | All 48 lines; untruncated numbered output |

The reviewer read the original before opening the manuscript and waited for the coordinator's hash freeze. Native `wc -lc` measured original/manuscript sizes; `shasum -a 256` independently matched the two submitted draft hashes, and `shasum -a 256 -c .tmp/priority-manuscript/amplituhedron/baseline.sha256` passed the original. The reviewer's complete source reading notes are retained in `.tmp/priority-manuscript/amplituhedron-review/original-reading-notes.md`. No clipped source passage receives reading credit. No original, author manuscript, author coverage or Braid artifact was edited by the reviewer.

## Initial required repairs — subsequently closed

| Finding | Evidence and reason | Bounded repair and closure condition |
| --- | --- | --- |
| **F1 — external-data positivity omitted** | Original 26–34 begins with positive external kinematic data $Z$, then the schematic image $Y=CZ$. Manuscript 25–33 preserves positivity of the ordered maximal minors of $C$, but says only that external data and dimensions are fixed. Positivity of one matrix does not state the separate positivity assumption on the external data. Coverage row 18 says positive external data are retained, which is stronger than the current draft. | Explicitly state that $Z$ is positive external kinematic data in the chosen construction, alongside the existing dimension/convention qualification. Keep the formula schematic; no new dimension formula or external research is required. Close when the frozen revised passage and coverage agree with original 26–34. |
| **F2 — infrared-safe observable qualification omitted** | Original 110 and 196 distinguish a loop integrand from both its integration and construction of an infrared-safe observable before experiment. Manuscript 33 and 94 mention loop integration and observable predictions, but omit the infrared-safe qualification. Coverage row 20 nevertheless claims this burden retained. The source's integrand-to-observable distinction should not be compressed into integration alone. | Restore that loop integrands generally require integration and combination into an infrared-safe observable before experimental comparison, in the declared theory/domain. Close when revised manuscript and coverage preserve both steps without claiming a general collider pipeline or a new scientific result. |

Both are fidelity qualifications, not claims that the draft has derived an incorrect physical result. The reviewer has proposed no author edits beyond these two restorations. A revised frozen hash and the exact delta are sufficient for closure review because the remaining manuscript was fully read here.

## Source-to-manuscript omission audit

The following table covers the full original. Detailed administrative routing, duplicated historical discussion and external bibliography can remain supporting material when the coverage explicitly records that disposition; source support is not claimed freshly verified.

| Original lines and subject | Manuscript disposition | Audit result |
| --- | --- | --- |
| 3–12 status, exclusions and inquiry | 7–19, 131–137; author coverage 5,17,25,32 | Dormant comparison and no activation retained. Administrative source details appropriately remain supporting. |
| 14–40 object/theory/program, positive image, canonical form and triangulations | 9,25–51 | Formula and canonical-form/residue/cancellation meaning retained; **F1** is the missing external-data qualification. Bibliography retained by source reference, not independently verified. |
| 42–77 scattering purpose, S-matrix, rates and nonunique ontology | 11,15–19,71–80 | Incoming/outgoing role, observable ingredients and complementary structure/channel/resonance tests retained. Exact $S$-matrix equation, CERN links and expanded examples remain supporting; no unique substrate inference added. |
| 79–124 ordered prediction, integrand versus observable, competing methods | 71–88,94 | Preparation/theory/calculation/observable/interface/freeze/unblind/comparison preserved in prose; fixed-theory alternatives agree. **F2** addresses the omitted infrared-safe qualification. Exact construction-chain indices and operational table remain supporting. |
| 126–149 conditional improvement and empirical costs | 86–94 | Higher orders/multiplicities, numerical reliability, observables, consistency and classification retained across §§3.2–3.3; outside uncertainties remain explicit. No claim of measured speedup. |
| 151–185 foundational aims, on-shell classification and broader examples | 31–37,92–94,115–123 | Consistency, residues, on-shell methods, hidden structure and domain-limited locality/unitarity interpretation preserved. Detailed redundant-diagram discussion and named external examples remain supporting, without universal realization claim. |
| 187–203 extension meaning and seven directions | 92–94 | Broader theory/domain reach retained, including finite color/nonplanarity/mass/spin/reduced supersymmetry/realistic gauge/gravity/cosmology and observable extension. No assertion of an approximate original fit or inevitable universal geometry. |
| 205–229 complete recovery ladder and common-record test | 15–19,100–111,123–129 | Dependencies and anti-retuning retained; the added phase caveat correctly restricts the arrow chain. Optional geometry remains downstream. |
| 231–271 opportunity cost, historical deferral and five revisit triggers | 15–19,129,133–137; coverage25–26 | All triggers are paraphrased without claiming any passed. Exact dated judgment and current-no-artifact decision remain supporting. No empirical effort or absence claim refreshed by this review. |
| 273–308 primitive/comparison split, simple pole, history projection and schematic residual | 7–19,31,100–123 | Preserved with explicit mathematical type limitations. The original questioned pushforward equation and field dictionary remain supporting rather than silently promoted. Single-product factorization is correctly restricted. |
| 310–340 five assessments, five assumptions and seven burdens | 7–19,31–37,100–137; coverage28–29 | Formulation/ontology distinction, speculative resemblance, conditional comparison, insufficient strata and no scientific lane retained. Complete carrier, identities, independently fixed preparation/interface, target regime, positivity, boundary, residue, cancellation and no retuning are explicit; detailed independently authored wrong-ordering/split-record controls remain in the supported numbered source list. |
| 342–356 falsifiers and bounded negative interpretation | 107–111,123,127–135 | Wrong/fitted positivity, channel/residue/pole errors, surviving artificial boundaries, chart dependence, retuning and imported premises preserved. Failure rejects the declared bridge, not the whole theory. |
| 358–384 hypothetical four-point object and ownership | 100–127,133–137; coverage31–32 | Four-point family/map/channel/residue, wrong channel, alternate decomposition, positivity/chart test, residual tolerance and independent analytical reference retained. Existing ownership, conditional intake and later lane decision remain source support. No test is launched or adopted. |
| 386–408 twelve historical conclusions, possible promotion and no current artifact | 131–137; coverage32 | Conclusions are mapped by subject above. Historical order, exact owner labels, possible destinations and naming decision stay in the preserved original. Neither scientific reactivation nor promotion follows. |

## Manuscript-to-source support and elementary checks

### Probabilities, canonical forms and residual types

Manuscript 53–65 and 107–111 clarify a real incompleteness in original 287–308. The original writes a questioned equality between a history pushforward and canonical form plus residual, while describing the history measure through prepared/detector records. It supplies no common type in which this subtraction is defined. The draft retains the proposed map but makes that missing construction explicit: compare event measures under fixed observational conventions, or independently construct a form-level object with orientation/chart/boundary rules. Neither route is claimed complete. Stating the need for common domain, norm/test-function class, units and error is a clarification of the original residual burden, not a proof of a new bridge.

The reviewer's direct measure argument is elementary: for a measurable map from a probability space into its target, the pushforward mass on the full target equals the original total mass. Thus a finite normalized probability cannot equal a density with infinite total mass on that entire target. Restricting the domain, weighting, regulating or renormalizing changes the comparison object and needs an explicit construction. The manuscript does not exclude all links between histories and forms; it rejects only their unqualified identification. A valid common finite object with the necessary structure would resolve the missing-type issue, not contradict this scoped statement.

### The interval identities check directly

For $a<c<b$, the manuscript's interval form coefficient satisfies

$$
\frac{b-a}{(x-a)(b-x)}=\frac{1}{x-a}+\frac{1}{b-x}.
$$

Applying the same identity to the two subinterval forms leaves internal terms $1/(c-x)+1/(x-c)=0$. The meromorphic one-form sum equals the full interval form away from the displayed poles, with removable singularity at the artificial point after cancellation. This is an identity of forms; it is not the addition of two piecewise normalized probability measures. The draft labels it an algebraic comparison illustration and does not infer a physical history or amplituhedron from it.

On $(0,1)$ an antiderivative of $1/[x(1-x)]$ is $\log x-\log(1-x)$. Evaluating at $\delta$ and $1-\delta$ gives $2\log[(1-\delta)/\delta]$ for $0<\delta<1/2$, exactly as displayed at manuscript 58–60; the value diverges positively as $\delta\downarrow0$. Cancellation of a spurious internal pole does not remove the exterior endpoint divergences. These are reviewer-checked symbolic identities, with no numerical execution or claim about an actual scattering canonical form. A failure of the displayed algebra or its stated domain would reopen this part of the review.

### Rates do not uniquely recover phase

Manuscript 17 adds an explicit noninvertibility qualification to original 211–223 and 235–246. Directly, $|e^{i\chi}\mathcal M|^2=|\mathcal M|^2$ for real $\chi$. A squared magnitude does not select that phase, and coherent relative alternatives require appropriate interference-sensitive information and conventions. The draft correctly identifies the source arrows as a sequence of obligations, not a unique inverse reconstruction from cross sections. It does not claim that an overall-phase example proves every possible amplitude-reconstruction problem impossible, or that the missing effective phase law has been derived from substrate histories.

### Single-channel factorization versus a general intermediate-state sum

Original 277–285 and 360–371 give the compact four-point simple-pole product as a one-channel target. Manuscript 115–123 retains the product with left/right labels and explicitly fixes normalization and a local coordinate vanishing at that pole. Its warning that more general channels may require intermediate species/polarization sums prevents a scalar expression from being treated as universal, including at arbitrary loop singularities. It adds no claimed spectrum or carrier count. Actual transient assembly/event identity and complete recoil/remnant/wake/sea closure remain requirements, and copying the amplitude equation alone supplies no dynamics. The external general factorization literature was not independently checked in this task; the relevant fidelity result is preservation of the original restricted target without unwarranted generalization.

### Unsupported strengthening and operational boundary

The remaining manuscript claims are paraphrases of the source's definitions, comparisons, examples, burdens or decisions, with new derivations confined to the elementary qualifications above. The detailed two-way table identifies their destinations and supporting limits. No manuscript passage claims an accepted retained scattering carrier, generated positive image, amplitude recovery, canonical residual, fulfilled trigger, empirical performance improvement or present external-literature completeness. The source's special theory remains a comparison domain. The retained discussion of hypotheses/falsifiers does not create a scientific queue or alter the Braid pause.

## Validation and independent limits

The reviewer visually inspected the coordinator's existing `.tmp/priority-manuscript/amplituhedron/measure-excerpt.png` through the image tool. It shows complete §2.3, its displayed interval integral and both explanatory paragraphs, legible and unclipped at the supplied 1280×720 size, with footer carrying the frozen manuscript hash. This is inspection of that bounded retained image, not a fresh browser session or full-manuscript visual audit.

The coordinator reports known-case-first math/local-link checks, all seventeen manuscript expressions rendered by KaTeX, local target checks and real-browser inspection. The reviewer did not rerun those tools or independently validate their parsers, fragment links, external links, broader browser layout or current scientific owner state. Native SHA comparisons and the direct algebra above are the reviewer's own checks. No new extractor/checker or scientific calculation was run, so no new unvalidated target instrument is used to support this disposition.

The original bibliography, CERN pages, external amplitude constructions and linked quantum/equation/scattering owners remain unread in this task. Historical source support is preserved without being presented as fresh source verification. Author/reviewer agreement on fidelity does not independently prove any proposed scientific bridge.

## Initial closure status — superseded by the final review below

- **F1:** open; external-data positivity restoration required.
- **F2:** open; infrared-safe observable qualification restoration required.
- **Q1–Q4 elementary qualifications:** pass within the domains and limitations above.
- **Source preservation:** original baseline passes; author/manuscript hashes matched before comparison.

After F1–F2 are repaired and the revised hashes are frozen, review their exact deltas and recheck source preservation. No further scientific investigation or external source acquisition is required to close these editorial findings.

## Final repair closure and frozen acceptance

Native `shasum -a 256` matches the coordinator's revised manuscript `f4e742139de0036be3015b4fcf0e961372bc6a9a99769e66e1374a84a4422d38` and coverage `50cacc69a17fe5464b7b8690af1112f875d1bac8d5f819e73a7daad25ad65dcd`. The reviewer directly reread all 137 revised manuscript lines in untruncated ranges 1–75 and 76–137, plus all 50 revised coverage lines, against the previously displayed complete source/draft. This full reread confirms the two identified qualification changes at manuscript 31 and 33; the remaining substantive account preserves the reviewed argument. No original draft snapshot was retained before author repair, so this is a direct textual delta review against retained reading output, not a claimed bytewise diff against an independently saved old manuscript.

- **F1 closed:** manuscript 31 now requires external $Z$ to satisfy the declared positive-data conditions separately from the ordered-minor positivity of the plane representative, with construction-specific dimensions. This restores original 26–34 without adding an unsupported universal coordinate rule.
- **F2 closed:** manuscript 33 now explicitly requires extraction of physical conventions, loop integration and construction of an infrared-safe observable before experimental comparison. This restores original 110/196 and makes the coverage claim accurate.

The reviewer also inspected the retained `positive-final.png` image with the image tool: complete §2.1, both repaired paragraphs, formula, inline $Z$ and final source-hash footer are legible without clipping at the supplied 1280×720 size. This independently inspects the coordinator's image; it does not claim a fresh browser launch. The coordinator's eighteen-expression KaTeX and link/math checks remain author-reported validation. `shasum -a 256 -c` independently passes the original baseline after repair. No author or original source file was changed by the reviewer.

There are no remaining material editorial fidelity findings within the fully read original/manuscript/coverage scope. Acceptance remains qualified by the unread external literature/current scientific owners, lack of new scientific execution and absence of any independently verified history-to-amplitude-to-geometry bridge. The elementary mathematical checks in this report have only their stated scope. The original dormant decision, scientific exclusions and later revisit/intake authority remain intact. Freeze this report; Braid may resume only its separately assigned single same-record energy-methodology body.
