# Editorial, status and source-routing reconciliation (serial task 1, 2026-10-10)

This report records three bounded editorial corrections selected by the operator through the [reciprocal review plan](reciprocal-review-plan-2026-10-09.md): one ambiguous sentence in the parent [README](../README.md), source routing for Sections 7 and 9 of the parent [manuscript](../manuscript.md), and proposed wording that separates dated historical statements from current status in documents this task does not own. No equation, proof, numerical result, grade or count was changed, and no historical receipt was edited.

The work was done in two packets. The first, reported at 22:49 UTC, made the README correction and 25 routing edits and left the full-document reading unfinished. The second, a continuation after review, finished the reading, read the source bodies behind the links, routed the passages the first packet had left, and replaced the check instrument's replay entry. Section 9 states what each packet did and did not check.

## 1. Result

- **README.** The sentence about travelling balances now names its subject and sits beside the finite balances it describes. One line changed.
- **Manuscript.** Thirty passages in Sections 7 and 9 now link to the source section that carries the argument: 35 links to nine source documents. Every mathematical expression and every heading is unchanged.
- **Reading.** The README and all eleven manuscript sections were read in full across the two packets. Section 7 lists the findings; none affects an edited passage, and five are proposals for the owner outside the released passages.
- **Status wording.** Section 5 gives exact proposed text for the plan's F0-9, F1-5 and F2-2 rows and its open-obligations paragraph, and a companion note for the closure-corrections addendum.

**Grade.** The edits are measured by the retained before and after copies and their patches. The claim that a linked passage supports its sentence is measured by reading the source lines named in Section 4; it says where an argument is recorded, and is not a re-derivation of that argument.

## 2. Preflight: writers and binders

Before each packet's edit, the files matched the hashes recorded at the preceding step and no other writer had changed them, by `shasum -a 256` and `git --no-optional-locks status --short` on the two paths.

| File | SHA-256 at dispatch | After the first packet | After the continuation |
| --- | --- | --- | --- |
| `README.md` | `02f1af13776c9682fe450b3742600ef34a0145d8e22fa853e01e66069165cf94` | `ee81d6c455ef05fac983c19ddfd43bc533ff835045976f54f886dfc953349528` | unchanged |
| `manuscript.md` | `c2a761769e3b5f788733d002484de7f55ef2d9864643f64b5a7c26368b1c50a6` | `09872a319c5f058e2707cb5041d0ba244d1565e4fd45b38f12409472c73b74ba` | `8b23ee434d2b851b6fbef1ac8ab4f43d9d9ae7c1924e14603ac307c35e181d7d` |

The binder inventory below was taken before the first edit. Its scope is a literal search for the two dispatch-hash prefixes and for the two repository paths under `reference/`, `.local-data/master-equation-closure/`, `scripts/` and `tests/`. It does not establish that nothing else binds these files; a generator that reads the directory by pattern, or a record outside those four trees, would not appear.

| Binder | What it binds | Handling |
| --- | --- | --- |
| The plan's dated receipts (its separate-verification table and task-1 dispatch receipt) | The dispatch hashes of both files | Dated observations of an earlier state; not retargeted. They describe the retained before copies |
| Two shared-conversation transcripts, `2026-10-09-closure-review-plan` and `2026-10-10-lattice-darwin-followup` | The README dispatch hash | Transcripts; not edited |
| `reciprocal-followup-2026-10-10/validation/integration-final.json` and `reciprocal-review-20261010/validation/closure-recheck-hashes.json` in local storage | Dispatch hashes as final manifests of earlier packets | Historical receipts; not repinned |
| Document-check logs, baseline manifests and binder searches under `overnight2-c/`, `overnight2-d/` and the two validation directories; `sublattice-decomposition/evaluation/manuscript-fidelity.json` | The paths, as records of earlier checks | Historical; not rerun |
| [Manuscript fidelity review](manuscript-fidelity-review.md) | An older manuscript version, `76b8a6a2…` | Already historical before this task |
| Inbound links to manuscript headings | Heading text | Unaffected: all heading lines are identical before and after |

No script or test under `scripts/` or `tests/` names either path literally, by the same search. Retained copies and patches are in `.local-data/master-equation-closure/serial-editorial-reconciliation-2026-10-10/`. The first packet's files are `before/`, `after/`, `README.patch`, `manuscript.patch`, `check.mjs`, `document-check.log` and `receipts.sha256`; all eight entries of that receipt list still verify. The continuation added `check-replay.mjs` and the directory `continuation/` with the final manuscript, a patch from the first packet's version, a total patch from the dispatch version, the replay log and its own receipt list. No first-packet file was changed.

## 3. The README sentence

The paragraph first counts the finite rigid balances, then mentions the infinite rotating ladder, then said "Some travel along their rotation axis, and the smallest is a pair in closed form." After the ladder sentence, "some" and "the smallest" had no clear subject. The sentence's history shows the intended one: before the 2026-10-10 repair that separated the ladder's two grades, the phrase "some travelling along their rotation axis" was attached to the 165 finite arrangements.

The corrected text moves the sentence directly after the finite count and names its subject: "Some of these finite balances travel along their rotation axis, and the smallest finite balance is a pair in closed form." The ladder sentence follows unchanged. The finite count, the interval enclosure of the 126, the derived small-speed existence of the ladder, the unenclosed float branch and the formal-mode grade are all word-for-word as before.

The two halves of that sentence are separate facts, and the new wording keeps them separate. The [closed-form pair](../binary-research/analysis/asymmetric-opposite-pair-closed-form.md) is described by its source as two opposite architrinos circling a common centre on two different circles; that source does not describe it as travelling. The [search report](../braid-program/analysis/rigid-balance-search-2026-10-04.md) says of its first campaign that four arrangements travel along their axis and that the smallest of those has three members. The manuscript's own Section 8.4, read in the continuation, states the same two facts in adjacent sentences: four balances "travel steadily along their rotation axis", and "the smallest of all is an opposite pair on unequal circles". The corrected sentence therefore does not say that the pair travels.

## 4. Manuscript source routing

Each row gives the manuscript passage, the linked source section, and what was read to confirm support. "Full" means the whole section or status block; "opening" means its first paragraphs and displayed result. The last column says which packet added the link.

| Section | Passage linked | Source section | Read | Packet |
| --- | --- | --- | --- | --- |
| 7.1 | Emitted-surface kinematic realization | [Wake-state closure, regular kinematic substate](independent-causal-wake-state-closure.md#regular-kinematic-substate-result) | Full. States the stored labels, fixed centre and radius growing at $c_f$, and that no energy, momentum or reception-transfer law is derived | 1 |
| 7.1 | A conserved completion must derive its account maps | [Wake-state analysis, conservation equations](analysis-independent-causal-wake-state.md#4-conservation-equations-expose-missing-information) | Opening: the motion accounts as fixed functions and the candidate totals | 2 |
| 7.2 | Characteristic-tail kernel and its identity | [Characteristic tail, closed local identity](characteristic-tail.md#11-the-closed-local-identity) | Opening, with the displayed identity | 1 |
| 7.2 | The frozen action fails its complete requirements | [Characteristic tail, status](characteristic-tail.md#status-and-authority) | Full | 1 |
| 7.2 | Euler coefficient with a future term | [Complete receiver-plus-transmitter variation](characteristic-tail.md#163-complete-receiver-plus-transmitter-variation) | Opening and the closing Euler equation with both half-weighted terms | 1 |
| 7.2 | Transverse future change and its coefficient | [Future-only transverse control](characteristic-tail.md#164-future-only-transverse-cross-pair-control) | Setup; the coefficient $-\Lambda/(2R^3)$ along $\mathbf e_y$ located by search within the section | 1 |
| 7.2 | Self integral diverges on Lipschitz self paths | [Independent verification audit](characteristic-tail.md#161a-independent-verification-audit) | Full in the continuation. The audit bounds the tail below by $C/r$ where the regulator is bounded below, uses $r\le Mu$, and obtains $\int_0^\epsilon du/u=\infty$. It also records the finite-difference table and that the table has no standalone replay artifact, as the manuscript says | 1, body read in 2 |
| 7.2 | Self-only repair cannot cancel the cross response | [Scope of the worldline-only obstruction](characteristic-tail.md#165-scope-of-the-worldline-only-no-go) | Opening three paragraphs | 1 |
| 7.2 | Exact elimination of auxiliary variables | [Exact-localization corollary](characteristic-tail.md#166-exact-localization-corollary) | Setup and stated conclusions | 1 |
| 7.3 | Finite-funded observation excluded | [Allocation adjudication, finite aggregate capacity](allocation-independent-adjudication.md#2-finite-aggregate-capacity-reconstructed-proof) | Full in the continuation. With total budget $C_I$ and a common bound $\Omega$ vanishing at zero, a compatible set of more than $C_I/\delta$ receivers forces one share below $\delta$, contradicting the unchanged nonzero observation. The section names the uniform bound and arbitrary finite compatibility as added assumptions | 1, body read in 2 |
| 7.3 | Driven-receiver scalar obstruction | [Proposal, assumptions and theorem](nondepleting-account-proposal.md#assumptions-and-theorem); [adjudication, verdict](nondepleting-account-independent-adjudication.md#verdict-and-scope) | Both full | 1 |
| 7.3 | Coupled trajectories lack independently variable source derivatives | [Adjudication, supplied histories](nondepleting-account-independent-adjudication.md#2-what-independently-variable-supplied-histories-mean) | Opening: the freedom belongs to supplied smooth source histories and is "not a conclusion about source derivatives on a coupled EOM solution" | 2 |
| 7.3 | Total variation of a signed account | [Adjudication, complete-past total variation](nondepleting-account-independent-adjudication.md#6-complete-past-total-variation) | Opening | 1 |
| 7.4 | Ordered definitions behind the finite-budget obstruction | [Wake-state analysis, receiver-dependent sharing](analysis-independent-causal-wake-state.md#25-receiver-dependent-sharing-with-a-uniformly-controlled-observation) | Opening: allocation measures first, "Representation comes next", then the receiver observation and its bound | 2 |
| 7.4 | Point reception, atoms and patch solid angle | [Wake-state analysis, reception representation and observation](analysis-independent-causal-wake-state.md#21-reception-representation-and-observation) | Full. One point has zero measure for an ordinary density; an atom is visible only if the declared reader assigns it a value; singular-continuous content may remain visible; the cap solid angle is $\pi\varepsilon^2/r^2$ to leading order with density growing as inverse patch area; patch radius, wake thickness and emission-time regulator are distinct controls | 2 |
| 7.4 | Playback derivative and bounded-gain allocation | [Allocation adjudication, playback-zero throughput](allocation-independent-adjudication.md#3-playback-zero-throughput-reconstructed-neighborhood-test) | Opening, the $o(h)$ bound and the verdict | 1 |
| 7.5 | Many covariant emission weights | [Proposal, account-identification freedom](nondepleting-account-proposal.md#2-an-explicit-account-identification-freedom); [adjudication, underdetermination](nondepleting-account-independent-adjudication.md#5-carrier-to-account-underdetermination) | Openings | 1 |
| 7.5 | Domain connectedness against fibre connectedness | [Adjudication, completing constancy](nondepleting-account-independent-adjudication.md#completing-constancy-on-the-whole-domain) | Full in the continuation. It says connectedness of the total domain does not imply connected fibres, and instead uses an affine identity in the receiver velocity on an open set to make the whole gradient vanish | 1, body read in 2 |
| 7.5 | Measures need measurable labels and summable currents | [Adjudication, separate-channel display](nondepleting-account-independent-adjudication.md#7-what-the-separate-channel-display-does-and-does-not-define) | Opening | 1 |
| 7.5 | Orbital angular integrability and origin change | [Adjudication, angular and causal conditions](nondepleting-account-independent-adjudication.md#angular-and-causal-conditions) | Opening and the global orbital-integral paragraph | 1 |
| 7.6 | Splitting a region preserves additive transfers | [Wake-state analysis, retained-boundary partition](analysis-independent-causal-wake-state.md#27-retained-boundary-partition-cannot-create-a-second-allocation); [its adjudication](allocation-independent-adjudication.md#4-retained-boundary-additivity) | The analysis section in full: consumed, retained and exported parts sum to the cohort; staged exports add to the direct export; simultaneous spending needs unique event ownership; no relabeling of spent content. The adjudication's opening identity | 1, source added in 2 |
| 7.6 | An outgoing ray cannot return to its centre | [Proposal, causal transfer and angular bookkeeping](nondepleting-account-proposal.md#6-causal-transfer-and-angular-bookkeeping) | Full | 1 |
| 9 | Prepared interface for the conditional targets | [Bridge handoff, dependency split](lorentz-gr-bridge-handoff.md#dependency-split); [residual handoff, packet status](lorentz-test-residual-handoff.md#packet-status) | Both full. Each states that it claims no recovery and that its rows are unpopulated | 1 |
| 9.1 | The drift susceptibility | [Branch-closure program, bare-void response tensor target](branch-closure-program.md#bare-void-response-tensor-target) | Full. Defines the same derivative of total momentum with respect to drift velocity at zero drift, calls it an assembly-level response and "not a fundamental architrino property", gives the comparison with internal energy over $c_f^2$ as a target, lists the differentiable drift family, root identity, memory and regulator requirements, and separates it from the sea-dressed response | 2 |
| 9.2 | Shape tensor, fixed weights, semiaxes and clock period | [Bridge handoff, moving-assembly contract](lorentz-gr-bridge-handoff.md#moving-noether-braid-contract) | Full. Declares $c_\star$ and $\gamma_\star$, the cycle-averaged shape tensor with fixed nonnegative geometric extraction weights that are "not an architrino mass", the projected semiaxes, the clock period from one declared phase on the same branch, and both residual targets as "not yet claimed" | 2; the first packet linked the same section one paragraph later |
| 9.2 | Prepared coefficient relations and stiffness expansions | [Bridge handoff, prepared coefficient identities](lorentz-gr-bridge-handoff.md#prepared-coefficient-identities) | Opening | 1 |
| 9.3 | Weak-field map | [Bridge handoff, weak-field medium response](lorentz-gr-bridge-handoff.md#weak-field-medium-response-handoff) | Opening | 1 |
| 9.3 | PPN comparison scales | [Bridge handoff, PPN and leakage variables](lorentz-gr-bridge-handoff.md#ppn-and-leakage-variables) | The five recorded scales located by search; not refreshed, as the manuscript already says | 1 |
| 9.3 | Robertson–Mansouri–Sexl and Standard-Model Extension projections | [Residual handoff, RMS rows](lorentz-test-residual-handoff.md#rms-residual-rows); [SME-style rows](lorentz-test-residual-handoff.md#sme-style-residual-rows) | Openings | 1 |
| 9.3 | An absent row is untested, not zero | [Residual handoff, null-row discipline](lorentz-test-residual-handoff.md#null-row-discipline) | Opening | 1 |

The added wording keeps three distinctions the assignment named. The action's receiver identity is linked separately from its future-support term and from its divergent self sector, each to its own source section. The recovery links in Section 9 describe the handoffs and the response target as a dependency packet, an unpopulated contract and a theorem target, so they remain conditional on returned histories and derived accounts. The historical observational figures were linked to where they are recorded and were not refreshed.

### 4.1 Passages deliberately left without a link

Three statements in Sections 7 and 9 have no link, and none is a gap in the mathematics.

1. **Section 7.6, the earliest-crossing sentence.** "An earliest-crossing label cannot stand in for a surface-resolved flux" is a caution about a bookkeeping choice. A search of the parent analysis directory for `earliest crossing`, `earliest-crossing`, `first-crossing label` and `surface-resolved` found the phrase "surface-resolved" in the wake-state analysis and the characteristic-tail record, and no derivation of this particular sentence. It follows from the paragraph's own first sentence: a surface that crosses a boundary only in part cannot be described by one label for the whole emission. It is left as a stated requirement.
2. **Section 9.2, "a zero or ill-defined cadence does not define a period".** The contract defines the period as $2\pi$ over the mean cadence; the manuscript's sentence states the domain of that definition. No external derivation exists to cite.
3. **Section 7.1, the balance equation** $\Delta E_{\rm motion}+\Delta E_{\rm wake}+\Phi_E=0$. This is the definition of what a conserved completion would have to satisfy. The preceding sentence now links the analysis that writes out the candidate totals; the display itself is a requirement and not a result.

**One starting owner is not linked in Sections 7 or 9.** The [receiver wake-gradient closure](receiver-wake-gradient-closure.md) derives the receiver-position gradient of the regular acceleration operator and a single-root scalar-gradient theorem, by its status, finding, and the openings of those two sections. Those are the subjects of the manuscript's Sections 2.3 and 2.4, which were not released for editing. Section 7.1 gives the proposal.

## 5. Status wording: proposals for the owner

These are exact proposals for documents this task does not own. None was applied. Each separates a dated statement, which should stay as written, from current status.

### 5.1 The plan's execution-disposition rows

**F0-9, status cell.** Current: "Awaiting consolidated summary batch." Proposed: "Not applied in any recorded batch, by search of this plan for the finding's identifier; no summary batch is scheduled. The queue's detailed rows govern. Optional editorial reconciliation, not blocking."

**F1-5, status cell.** Current: "Named governing links added to Sections 2, 4 and 5. Additional Section 7/9 routing remains editorial debt; it does not invalidate conditional definitions." Proposed: "Named governing links added to Sections 2, 4 and 5 in the first batch, and to Sections 7 and 9 on 2026-10-10 by serial task 1, recorded in the [reconciliation report](serial-editorial-reconciliation-2026-10-10.md#4-manuscript-source-routing). Three statements there are left unlinked as stated requirements. Missing links do not imply missing mathematics."

**F2-2, status cell.** Current begins "Returned to Claude." Proposed replacement of those three words only: "Resolved at the repaired statement: Claude reconstructed the regular-row counterexample in its separate verification, recorded under 'Separate verification and requested repairs'." The rest of the cell stands: no derived regular-row conclusion for all 274 releases is accepted, and the 250 measured-hypothesis count is preserved. The 24 arrivals without those measurements are the subject of serial task 7.

### 5.2 The plan's paragraph "Scientific and editorial obligations left open"

That paragraph is a dated statement of the overnight campaign's closeout, and the plan already says its ninety-minute section governs the older open-coverage statements. The proposal is to leave the paragraph as written and add one dated note directly beneath it:

> **Status after later dated sections, 2026-10-10.** Three statements above describe the overnight closeout and are superseded. The finite aligned preparation is now admitted by the quantitative confinement proof recorded under "2. Quantitative aligned Darwin confinement"; the long trajectory controls remain unlaunched and are serial task 6. The lattice continuation chain was reconstructed in the ninety-minute follow-up, and its field, residual and source-prefix enclosures were replayed in stage 0 with zero scientific differences, at a grade that remains conditional on subject-only interval evaluations. Section 7 and 9 routing was added by serial task 1. Integration of the manuscript's dated update paragraph in Section 8.4 remains editorial debt. The other obligations in the paragraph stand as written.

### 5.3 The closure-corrections addendum

The [addendum](closure-architecture-corrections-2026-10-10.md) has SHA-256 `cbef44f434f6aa35fe08c63619a24d78a279fcb669dfe0eee93f4aeaf4aeef14` by `shasum -a 256` during the first packet, the value a verification receipt names. Its scope paragraph says "Separate verification is pending", and its last section, "Pending integration and verification", says Darwin assessment and separate verification remain in progress. Both were true when written and are no longer current. Because a receipt names these bytes, the proposal is a companion note beside it and not an edit:

> **Status note for `closure-architecture-corrections-2026-10-10.md`, dated 2026-10-10.** The addendum is preserved at the bytes its verification receipt names. Two of its statements describe the time of writing: "Separate verification is pending" in its scope paragraph, and its final section "Pending integration and verification". Both steps were completed afterwards. The reciprocal review plan records the Darwin correction batch and, under "Separate verification and requested repairs", Claude's verification of the living-summary files with two accepted repairs. The addendum's numbered corrections remain governing as written; only its two pending-status statements are superseded by this note.

### 5.4 The binary tracker: premise withdrawn

The assignment described the binary tracker as still calling finite aligned admission uncertified. The first packet did not find that wording, by a case-insensitive search for seven admission and certification phrasings on lines mentioning Darwin, aligned, near-circle, DC-100 or preparation, across every Markdown file under the closure directory. The reviewer then read both priorities entries directly and withdrew the premise: they already record the admission as resolved. No change is proposed and no further search was made.

## 6. Validation and preservation

Two check instruments exist, and the difference between them matters.

**The first-packet instrument, `check.mjs`.** It produced the first packet's results, retained in `document-check.log`. Review found two defects in how it was retained and described, neither of which changes its results. Its retained copy imports repository modules by a path relative to the scratch directory it was written in, so it fails at import when run from the retained directory. And one of its known cases read the live manuscript to test for a present and an absent fragment, so the first packet's statement that all known cases passed "before reading any target" was inaccurate: the manuscript, a target, was read inside the known-case block. Both files are kept unchanged as the record of what ran.

**The replay instrument, `check-replay.mjs`.** It resolves the repository's modules from its own location and runs from the repository root with no scratch dependency. Every known case uses a synthetic in-memory document or the instrument's own path, and the known-case line is printed before any target is opened. Its known cases are: three heading-to-fragment conversions, including a mixed-case section number and a colon; a present fragment; a planted absent fragment; a heading inside a code fence, which must not count as a fragment; a missing path; a link inside a code fence, which must be ignored; and five planted defects that must each be reported, namely changed mathematics, a changed heading, a dropped link, trailing whitespace and invalid TeX. It uses the repository's own Markdown link and math extractors and KaTeX.

```bash
node .local-data/master-equation-closure/serial-editorial-reconciliation-2026-10-10/check-replay.mjs \
  reference/priorities/master-equation-closure/README.md .local-data/master-equation-closure/serial-editorial-reconciliation-2026-10-10/before/README.md \
  reference/priorities/master-equation-closure/manuscript.md .local-data/master-equation-closure/serial-editorial-reconciliation-2026-10-10/before/manuscript.md
```

Results of the replay on the final files, against the dispatch versions:

| Check | README | Manuscript |
| --- | --- | --- |
| Links, before and after | 52 and 52 | 73 and 108 |
| Link paths that do not exist | 0 | 0 |
| Fragments checked against target headings, missing | 2, 0 | 57, 0 |
| Math expressions, and equal to the dispatch version in order | 0, yes | 425, yes |
| Heading lines identical to the dispatch version | yes | yes |
| Pre-existing link targets all retained | yes | yes |
| Trailing whitespace | none | none |

Against the first packet's manuscript the continuation shows a net six added links: seven added and one moved from the second paragraph of Section 9.2 to its first. `git --no-optional-locks diff --check` on the two paths returned exit 0 with no output after each packet. No generator was run and no regular test was added.

The fragment check uses a conversion rule written here and tested on known cases; it is not the renderer's own rule. A fragment that this rule accepts and a renderer converts differently would be missed. The falsifier is any added link whose fragment fails to resolve in the rendered preview.

## 7. Whole-document reading: coverage and findings

**Coverage.** The README was read in full in the first packet. Manuscript Sections 7, 9, 10 and 11 were read in full in the first packet; Sections 1 to 6 and 8 were read in full in the continuation. No section is unread. This is an editorial self-review by the editor of these passages; it is not an independent validation of the manuscript's mathematics, and no derivation was re-performed.

**Nothing found affects an edited passage.** Section 8.4 agrees with the corrected README sentence, as Section 3 notes. Section 8.4's closing statement that persistence is open agrees with Section 9's opening sentence that no returned assembly history has been established. Section 7.2's remark that the finite-difference table has no standalone replay artifact agrees with the source audit. A whole-document term scan found no term the project bars; the four uses of "force" are two verbs, one exclusion and one label explicitly denied, and the six uses of "mass" are exclusions or comparison targets. All numerical examples are stated in normalized units with $c_f=1$.

The following findings are outside the released passages. None was applied; each is a proposal for the owner.

### 7.1 Section 2: route the receiver gradient and the local scalar

Section 2.3 ends its tensor display with "This is a derived regular-chart tensor", and Section 2.4 states that the scalar $\Phi$ satisfies $-\nabla\Phi=\mathbf a$ on a simple-root chart. Neither names its source, and the manuscript has no link to the receiver wake-gradient closure anywhere, by search. The proposed text is shown as source, with link targets written as they would appear in the manuscript. For Section 2.3, replacing its sentence "This is a derived regular-chart tensor.":

```markdown
This is a derived regular-chart tensor, obtained in the [receiver wake-gradient closure](analysis/receiver-wake-gradient-closure.md#complete-one-root-receiver-gradient).
```

For Section 2.4, added after "which gives the result directly.":

```markdown
The [moving-single-root scalar-gradient theorem](analysis/receiver-wake-gradient-closure.md#moving-single-root-scalar-gradient-theorem) states the hypotheses.
```

Support read: the closure's status and finding, the opening of its one-root gradient section, which defines the same range gradient $c_f\mathbf n/D$, and the hypotheses of its scalar-gradient theorem. The theorem's conclusion and the full tensor were not compared term by term with the manuscript's display; that comparison should precede applying the first link.

### 7.2 Section 8.4: the ladder is stated at a stronger grade than the README now gives it

Section 8.4 says the infinite rotating ladder "balances exactly at every speed examined, from $4\times10^{-4}$ to $0.995$ of wake speed, and its existence is proved at small speed". The README, after the repair recorded in the plan as V-2, says existence is derived for sufficiently small speed and that the broader measured branch "is a float balance to rounding, without an enclosure". The two documents now grade the same measured branch differently. Proposed replacement for the manuscript clause: "is a float balance to rounding at every speed examined, from $4\times10^{-4}$ to $0.995$ of wake speed, without an enclosure, and its existence is derived for sufficiently small speed". The ladder's source was not reread for this proposal; it rests on the README's repaired wording and the plan's record of that repair.

### 7.3 Section 8.4: superseded counts precede the paragraph that corrects them

The first three paragraphs of Section 8.4 give the first campaign's figures: 93 balances found and 65 below wake speed; growing roots "never fewer than five and typically three per member"; and every one of the 65 reaching wake speed within $1.4$ periods. A later paragraph headed "Update, 2026-10-06" says it extends and corrects them: 165 balances with 126 below wake speed, never fewer than two growing roots per member, and 274 of 276 releases arriving, with the earlier statement called "too strong". A reader meets the superseded statements first, and the README gives only the current ones. This is the integration of dated update paragraphs that the plan lists as editorial debt. It needs the section's owner, because merging the paragraphs means choosing which first-campaign details to keep; no replacement text is offered here.

### 7.4 Sections 3.5.1 and 8.4: process history in running prose

The repository's authoring rule asks ordinary prose to state the current source of truth and leave history to decision and log records. These phrases narrate process instead: in Section 8.4, "adjudicated by a delegated reviewer in the same session" (twice), "accepted with corrections by a delegated adjudicator who re-derived it blind", and "Four results of an overnight continuation extend and correct the paragraph above"; in Section 3.5.1, "now proves", "now supplies" and "is no longer required". The evidence grade these phrases carry should be kept when they are reworded; for example "adjudicated separately" with the adjudication linked. No replacement was drafted, since the wording belongs with the integration in 7.3.

### 7.5 Section 11: a link label and its target disagree

Section 11 says circular and braid applications are developed "in the Braid Program", and that link's target is the binary-research manuscript. The fragment resolves. Proposed wording, shown as source with link targets written as they would appear in the manuscript:

```markdown
circular applications in [binary research](binary-research/manuscript.md#1-circular-motion-and-regular-local-evolution), and collections beyond one pair in the [Braid Program](braid-program/manuscript.md)
```

The second target was checked only for existence.

## 8. Falsifiers

- A linked source section that does not contain the stated support at the place named in Section 4.
- A changed mathematical expression, heading or pre-existing link in either file, which the retained patches and the replay would show.
- A manuscript section not read, or an inconsistency between an edited passage and another section that Section 7 does not report.
- The replay instrument failing to run from the repository root after the scratch directory is removed, or printing a target result before its known-case line.
- A binder outside the four searched trees that names the dispatch bytes of either file and is now silently stale.

## 9. What each packet did and did not check

| Item | First packet, reported 22:49 UTC | Continuation |
| --- | --- | --- |
| README sentence | Corrected; README read in full | Unchanged; confirmed against manuscript Section 8.4 |
| Manuscript routing | 25 passages, 29 links, seven sources | Six further passages and one moved link; 30 passages, 35 links, nine sources |
| Source bodies behind three links | Not read: only a disposition, a located sentence and a verdict row | Read in full: the finite-capacity proof, the self-divergence bound and the completing-constancy argument |
| Five unrouted passage groups | Listed as unrouted | Four routed to located and read sources; the remainder are three stated requirements, explained in Section 4.1 |
| Manuscript reading | Sections 7, 9, 10, 11; a term scan of the rest | Sections 1 to 6 and 8 read in full; findings in Section 7 |
| Check instrument | Ran from scratch; retained copy could not run; one known case read a target | Replay entry added; synthetic known cases; runs from its retained location |
| Binary tracker | Stale wording not found | Premise withdrawn by the reviewer; no action |

### Review dispositions

| Comment | Disposition | Where resolved |
| --- | --- | --- |
| R1-01: complete the editorial reading | Accepted and done. Every manuscript section is read; findings recorded, none applied outside the released passages | Section 7 |
| R1-02: read the supporting bodies and finish the routing | Accepted and done. Three bodies read; four passage groups routed; three statements explained as requirements with no derivation to cite; susceptibility and shape and clock definitions verified against their owners | Sections 4 and 4.1 |
| R1-03: make the retained checker replayable | Accepted and done. Original checker and log preserved; a separately named replay entry resolves modules from its own location, uses synthetic known cases, and was run before the current targets. The first packet's "before any target" statement is corrected in Section 6 | Section 6 |
