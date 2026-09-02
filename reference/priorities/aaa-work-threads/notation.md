# Notation Strategy and Transition Plan

Closure goal: Make only worthwhile, independent notation corrections with clear meanings, checked destinations, and a bounded source-and-consumer update; defer changes that require definition decisions or cascading renames.

## Current scope — worthwhile, easy corrections only

**Operator direction, 2026-08-28:** stop expanding the notation overhaul. The speed-symbol assessment established that the connected migration is not an easy cleanup. Defer it, along with xi clearance and broader alphabet-wide standardization. Keep the assessment as reference material, not a standing obligation to finish it. This scope supersedes earlier first-priority and next-step instructions below.

Consider a correction only when all four conditions hold:

1. It fixes a concrete reader problem, such as an incorrect label, typo, or inconsistent spelling of an already-settled concept; cosmetic uniformity alone is insufficient.
2. The intended meaning and replacement are already clear. No new theory decision, reference-frame choice, averaging rule, unit change, or normalization is needed.
3. The destination has no competing use that must be relocated. If one rename creates another rename, defer the connected change.
4. Its complete source and active-consumer update is bounded and readily checked, including any app-equation descriptions or generated descendants. Small scope is not permission to leave affected copies inconsistent.

Plainly: fix obvious errors and useful inconsistencies; do not redesign working notation to make the table tidier. If an apparently easy correction develops a dependency chain, stop that correction rather than enlarge the project.

**Keep:** the completed period, suppression-alias, and group-velocity terminology cleanups. **Defer:** the three unresolved speed-family entries and two xi entries; the current working disposition is therefore 39 retain and 5 defer. Deferral does not resolve or approve their conflicting meanings. Existing canonical guidance remains in force, and no new symbol or coexistence policy is adopted.

**Completed easy correction, 2026-08-28:** Topo's speed slider now has the accessible label “Speed divided by wake speed (beta)” rather than “Speed, beta divided by wake speed.” The correction is confined to the shared input in [topo.html](../../../topo.html); it applies across its scenarios without changing symbols, values, calculations, or visible layout. One assertion was added to the existing [Topo UI test](../../../tests/topo-interaction-contract.test.js): it failed against the old label, then all 41 tests in that file passed after the correction. No equation registry, textbook, or other generated publication change is needed for this app-only label.

**Next action:** stop this notation pass. No additional cleanup is scheduled. Reconsider only a concrete, worthwhile correction encountered in normal work that meets the four conditions above; do not resume the deferred symbol migrations or start another broad inventory.

**Earlier decision-only review, retained as history:** the initial dispositions were **39 retain, 3 decision needed, 2 defer** across 44 overlapping table entries, not 44 distinct symbols or an occurrence census. The three speed entries were then selected as first priority, leading to the assessment in Section 4.8. The current scope above defers that connected migration. The completed transitions in Sections 4.4, 4.6, and 4.7 stand.

## 0. Current Decision Review

**Approved scope:** review the approved notation table, identify the consequential ambiguities, mark other entries retain or defer, and select the first priority. The assistant owns inventory and dependency checking; the operator receives the consequential choices and their tradeoffs. The review changed only this planning document. The subsequent terminology approval includes canonical guidance and active source/consumer wording; existing source/output receipts remain intact.

### Earlier review result — superseded work priority

| Disposition | Entries | Meaning and next action |
| --- | ---: | --- |
| Retain | 39 | Keep the approved notation and distinctions. No scheduled rename or demand to clear every unrelated use of the letter. Reopen a row when an actual conflicting interpretation or inconsistent use is demonstrated. |
| Decision needed | 3 | The entries for $v$, $\beta_f$, and the channel group-speed factor family describe one connected ambiguity: assembly group velocity versus constituent/internal motion. This is the first priority for a complete assessment. |
| Defer | 2 | The bare-xi entry and combined shape/scale entry overlap. Keep the approved geometric definitions; postpone xi clearance while full/local angle meanings, domains, and any normalization questions remain unresolved. This does not defer or reverse the completed suppression-alias cleanup. |

Plainly: this is one priority, not 44 cleanup jobs. Retain means keep the working choice; it does not mean every occurrence has been audited. Defer means preserve the present text and recorded uncertainty, not declare the competing meanings acceptable or change their definitions.

**Review basis:** current [Mathematical Terminology](../../../content/markdown/aaa/archie/mathematics-terminology.md), the [Mathematics Style Guide](../../../content/markdown/aaa/archie/mathematics-style-guide.md), the [canon ownership rule](../../../content/markdown/aaa/archie/terminology-usage.md#canon-ownership-and-precedence), the completed transition receipts, and the targeted source comparisons below. Row dispositions are editorial judgments based on those definitions and the existing evidence; they are not a new whole-corpus semantic audit or certification of the physical claims. The earlier census and conflict columns remain evidence, while the new review column determines work priority.

### Deferred assessment: assembly group velocity versus internal motion

**Terminology approved and synchronized, 2026-08-28:** use `group velocity` for whole-assembly translation and `group speed` for its magnitude. Preserve constant-motion and averaging assumptions, the declared center, the void/sea/observer reference frame, and the distinction from wave-packet group velocity. Source and app-label implementation is complete; the separately authorized publication rebuild is also complete. Section 4.7 records the scope and checks. Mathematical symbol choices remain unchanged. Historical records, literal machine identifiers, distinct medium/statistical/numerical uses, and on-demand iOS/PDF snapshots retain their recorded language.

**Observed conflict:** the guide assigns $v$ to assembly group speed and $\beta_f=v/c_f$ to the corresponding group-speed/wake-speed ratio. The [Master Equation circular-orbit section](../../../content/markdown/aaa/dynamics/master-equation.md#sub-field-speed-two-body-uniform-circular-orbit) instead uses the same pair for the orbital speed $\omega R$ on a symmetric circle. Its [single-architrino self-hit section](../../../content/markdown/aaa/dynamics/master-equation.md#super-field-speed-single-architrino-uniform-circular-self-hit) uses that orbital ratio above one. [Lorentz Kinematics](../../../content/markdown/aaa/spacetime/lorentz-kinematics.md) uses the group velocity meaning for translating assemblies and clock/ruler targets. Those are different moving objects and different physical uses, even though both ratios are dimensionless.

Plainly: an assembly can have no overall group velocity while its constituents circulate. Reading the orbital speed as the assembly group speed would assign the wrong motion to a formula. This is why the speed ambiguity comes before cosmetic reuse of a letter in unrelated subjects. The distinction does not assert a new speed limit or apply an observer-level Lorentz law to a constituent.

| Direction to assess | Benefit | Tradeoff and current boundary |
| --- | --- | --- |
| **Preferred: keep the approved group velocity meanings and distinguish internal motion.** | Preserves the core guide and makes the moving object explicit across dynamics and observer comparisons. | Requires a complete inventory of displaced internal uses and a checked short destination. No orbital spelling is approved yet. |
| Generalize the same symbols to any locally declared speed. | Preserves more existing circular formulas and keeps individual expressions short. | Changes the guide's reservation and shifts interpretation onto local definitions, including standalone app pages. Requires evidence that mixed-context reading remains clear. |
| Defer all speed renames and explain each local meaning. | Avoids migration while the inventory is incomplete. | Leaves the cross-document notation mismatch in place. This remains the implementation state until a complete proposal is approved; explanation edits also need their own scope. |

Plainly: the preferred direction keeps short names for group velocity and gives internal motion a distinct, checked name. We are selecting which problem to solve, not asking the operator to choose an unexamined replacement letter.

**Assessment recorded in Section 4.8, 2026-08-28:** the conflict includes group speed, total constituent speed, center-relative internal speed, and tangential orbital speed. Existing $s$ is not a cleared destination: it also denotes dimensional speed in the kinetic account, a sine-sheet sign, and normalized time. Indexed beta forms also overlap between binary speeds and sampled group speeds. Section 4.8 records affected source families, destination occupants, consumer dependencies, protected uses, and the remaining definition decisions. No new spelling or mathematical migration is proposed or approved.

**Deferred deliverable, only if the broader migration is reopened:** one complete group velocity/internal-motion assessment: definitions and frames; every active affected occurrence and consumer; retained comparison/provenance uses; candidate destinations and every required secondary move; representative before/after expressions; and exact source/output/check boundaries. Preserve dimensional speed versus normalized ratio, vector versus scalar, and the denominator channel. Keep xi names, angle domains, normalization, numerical values, and dynamics unchanged in this assessment. If a candidate move truly depends on an unresolved angle or frame definition, flag that dependent part rather than silently incorporating a mathematical correction.

**Stop condition:** bring the completed connected proposal and its remaining consequential choice to the operator before any mathematical symbol migration. The approved terminology-only implementation is recorded in Section 4.7. Do not start another alphabet-wide census or require resolution of unrelated retained/deferred families. Reopen this priority selection if source review shows the alleged speed conflict is absent, already explicitly reconciled, or less consequential than a newly demonstrated ambiguity.

Plainly: the assistant does the tracing and checks. The operator should receive a complete choice, including who would move and where, without having to supervise individual search hits.

**Planning change:** complete the conflict checks for the selected connected change and its destinations, not every approved family as a prerequisite. This supersedes the earlier whole-map sequencing requirement. It preserves Section 0.3's obligation to account for every displaced use in an approved change, Section 0.4's convention rule, and the separate source/output approval boundaries. It does not amend the guides' document-level reservation policy or authorize blanket local reuse.

### 0.1 Coverage and decision requirements

For a selected change, search the whole active collection and its consumers for the affected meanings and destination occupants; do not limit coverage to the top 50. Section 3.2 now records which approved entries to retain, investigate first, or defer. Inventory repeated and unique displays separately; include inline mathematics, local definitions, active working documents, curated app content, labels, code consumers, and generated descendants. Identify historical or on-demand surfaces explicitly rather than implying that “everywhere” includes rewriting immutable evidence or rebuilding every export. Unrelated retained/deferred families are not prerequisites for the selected assessment.

For each concept under review, the assessment must answer all of the following before approval:

1. What does it mean, at what physical or mathematical layer, with what units, domain, reference state, and index conventions? Which owner defines it, and what is its claim status?
2. What other meanings share this symbol or its variants? Which uses are native concepts, standard comparisons, or locally bound variables? A subscript or bold font does not by itself settle that policy question.
3. Why is each use important, what history or familiar convention supports it, and how consistently is it used? Keep importance separate from frequency and from the need to retain this particular letter.
4. What is the proposed treatment for every competing meaning: retain, qualify, rename, preserve as an explicit comparison/provenance exception, or leave unresolved? Name the destination of every displaced use and inventory that destination's current occupants too. State both the proposed reader explanation and a reasonable alternative where there is a real choice. Assess the complete connected set of changes, not just the preferred symbol.
5. Is the change a pure rename, a variable transformation, a definition change, or a mathematical correction? Separate these decisions and their verification burdens.
6. What changes in every affected source and consumer, what intentionally stays unchanged, and how will existing checks and reader inspection establish completeness? Include app-equation definitions and search, not only displayed formulas.

Plainly: the operator should receive the whole decision, including its consequences, before being asked to approve it. New discoveries belong in the assessment; they do not silently extend an approved change.

Planning is ready for a selected implementation batch only when its scope rules are settled, every inventoried occurrence has a justified disposition, every displacement destination has been checked, the transition table and reader examples agree, and the complete dependency and verification plan is recorded. Unresolved meanings or destination conflicts block that connected set of changes. Other unrelated families may remain retained or deferred without being represented as occurrence-audited or migrated. Destination checks must search broadly enough to find their actual occupants, but do not require redesigning unrelated families.

### 0.2 Retained evidence and deferred gaps

- Apply the accepted convention rule in Section 0.4 to local variables and standard-framework uses. Establish which actual uses are conventional and resolve mixed-context presentation; the mathematical guides have not yet been updated.
- The approved-entry review and first priority are recorded above. Complete the occurrence inventory for that selected priority; the top-50 spelling counts do not establish which concepts have been checked everywhere.
- For xi, finish the expanded assessment in Section 4.5. The display inventory does not cover all active uses: lattice displacements, phase offsets, five-coordinate perturbations, weak-lensing correlations, muon-decay parameters, and sensitivity parameters also enter. Full versus local angle domains and some record definitions remain unresolved.
- Separate the shape-reference normalization question from the letter choice. Likewise, distinguish full versus local branch angles and rotation-sign conventions before proposing a common delay-angle definition.
- Define how app-equation will obtain and display the correct local meaning; a generic fallback is not a completed semantic assessment.
- Record the exact source/output scope and approval boundary for each later batch. Historical PDFs and iOS packaging remain excluded unless explicitly brought into scope.

**Deferred scope:** completion of the group velocity/internal-motion assessment and its displacement dependencies is not a current task. Xi clearance and general qualifier shortening are deferred. Do not ask for a replacement spelling until the selected family's inventory and full decision assessment are available. Each subsequent discussion should state the current phase, the decision being considered, what remains unresolved, and the next prerequisite; explaining a choice or answering a question does not authorize implementation.

### 0.3 Clearing prior uses and checking replacement destinations

The operator's 2026-08-28 direction adds an explicit requirement: choosing a preferred symbol includes planning how to clear its conflicting prior uses. Those uses cannot simply be declared unimportant or left to a later unrelated cleanup. Under the accepted Section 0.4 rule, a use conventional in its field may retain its symbol there; a nonconventional competing use may move without protecting an arbitrary old name. Establish the actual convention and context before assigning either disposition.

1. Define the proposed reservation and scope. List all present occupants of the exact form and relevant family, including vector, index, comparison, and local-variable variants; distinguish actual collisions from uses outside the proposed reservation.
2. Give each occupant a disposition. A conventional use may remain in its established context under Section 0.4; a nonconventional conflict gets a stated destination, or causes us to reconsider the reservation. Record the evidence and context, not just a judgment that a glyph looks familiar. Unverified conventional status remains unresolved.
3. Inspect every proposed destination before selecting it. Record its present meanings and consumers. If it displaces another use, add that use and its destination to the same assessment. Continue until every proposed move reaches a checked destination or an explicitly approved coexistence rule. Mark missing information unresolved, not conflict-free.
4. Compare complete alternatives. Include the preferred symbol and all secondary moves, total distinct affected occurrences/files, reader familiarity, qualifier burden, mathematical risks, interfaces, and generated outputs. Count a shared affected equation or file once in the aggregate. Do not infer implementation time from occurrence counts.
5. Approve the connected set together. A swap or cycle of names must be mapped by concept, not by sequential text replacement. The final design must give each concept its intended notation in every declared scope without creating a new collision. If clearing the preferred symbol causes excessive disruption, compare changing that preferred symbol instead.
6. Keep changes to definitions, normalizations, or physical claims separate from spelling changes. Implement only after the full plan and source/output boundaries are approved, and verify both the new canonical uses and the displaced uses at their destinations.

Plainly: reserving a name can require moving several existing users, and their new names may already be occupied. We must assess the whole chain before approving the first move. This expands planning coverage; it does not authorize any rename.

### 0.4 Accepted reservation rule and remaining scope details

**Operator decision, 2026-08-28:** when another use of a reserved symbol is conventional in its part of physics or mathematics, it may retain that symbol in that context. Otherwise, there is no objection to relocating the competing use to another symbol. This is the accepted planning rule for symbol reservation; it supersedes the earlier generic proposal to permit unrelated uses merely by adding approved qualifiers, and it rejects a blanket claim over every form of a letter.

Convention concerns the **symbol, its meaning, and its field together**. A letter being common somewhere in mathematics does not establish that our particular use of it is conventional. Repeated use in our own documents also does not establish an external convention. Record the relevant field, the actual conventional definition, supporting references, and whether our use matches it. An unresolved convention check stays unresolved; failure to find evidence in one search is not proof that no convention exists.

Plainly: respect the names readers already know in that subject. Our own arbitrary names have no comparable claim on the letter, so they can move when they conflict with the canonical notation.

The rule is not limited to quotations or boxed comparison passages: a conventional symbol may remain wherever the corresponding concept is being used in its actual mathematical or physical context. It does not authorize importing that field's laws into primitive reasoning, or treating a reframed definition as identical merely because it uses the familiar letter. Relevant definitions and physical-layer distinctions remain necessary.

For a nonconventional competing use, evaluate a short alternative rather than automatically retaining it with a long subscript. A qualifier remains a possible destination when it provides the clearest concise distinction, but is not itself a reason to protect the old name. A scalar/vector font difference, an index, or a historical-looking spelling does not establish conventional status. Bound variables receive the same context-sensitive assessment; no blanket ban or exemption is approved here.

Plainly: the criterion is established usage in the relevant field, not whether we can decorate a symbol enough to keep it. This preserves the preference for short, consistent notation.

**Not settled by this decision:** how two legitimate conventional meanings should be distinguished when they meet in one formula, document, or standalone app page; which particular xi uses qualify as conventional; and the final destination of every use that moves. Existing unambiguous qualified conventions remain the baseline while those cases are assessed. Frozen evidence and literal compatibility fields retain their recorded spellings with a current translation. No guide, equation, interface, or generated-output migration is authorized by this planning decision.

If a broader migration is explicitly reopened, the planning work order is:

1. Use the completed Section 3.2 review: retain the baseline, assess group velocity/internal motion first, and defer xi clearance. Do not ask the operator to approve the general reservation rule again. Apply it to actual competing uses in the selected assessment, recording field, meaning, convention evidence, and retain/move/unresolved disposition.
2. Complete the conflict map for the **selected connected change**, including every displaced use and destination reached from it. Review the remaining top-50 rows and lower-frequency occupants wherever they intersect that map. Other retained or deferred families do not block this work unless an actual dependency joins them to it.
3. Give every proposed destination an occupancy result and disposition under the same convention rule. Keep linked quantities together: a velocity, its magnitude, its normalized ratio, and its dependent factors cannot be renamed independently by character. Expand the assessment only for a demonstrated dependency.
4. Compare complete alternatives using distinct affected occurrences and files, retained conventions, qualifier length, mathematical changes, and interface risks. Reject an attractive short name if its complete displacement chain is worse than a checked alternative. Do not translate these counts into an implementation-time estimate.
5. Review one complete connected proposal at a time with the operator, including before/after formulas and every retained conventional context. Record approved, rejected, deferred, and unresolved decisions separately. An unresolved destination or meaning blocks that connected proposal.
6. Only after that approval, prepare its exact source and output batch under Sections 4.3 and 5. Source edits require explicit authorization; publication-output regeneration requires its own scoped authorization. Verify all incoming and displaced meanings, not only the chosen canonical symbol.

Plainly: the general reservation policy is decided. Trace the selected speed distinction completely, including any established conventions or displaced local uses, before proposing implementation.

## 1. Strategy

Use the briefest notation that accurately identifies the concept in its mathematical setting. Preserve familiar notation when its meaning remains compatible. Where $\mathbb{A}\mathbb{A}\mathbb{A}$ reframes a familiar concept, state the changed definition and use a short qualifier when needed to prevent the old definition from being imported. Give central theory concepts short canonical symbols that are reused consistently across documents.

The long-term target is a compact working mathematical language, not permanently verbose migration notation. A subscript should communicate a distinction that matters: coordinate layer, physical channel, event role, quantity type, or selected member. Do not attach a theory acronym or a generic qualification to every symbol merely to mark ownership.

The operator's direction supports the following strategy; its exact implementation remains open:

1. **Straighten out approved notation first.** The mathematical guides and accepted decisions are our initial choices, collected in Section 3.2. Prioritize their consistent use across all active consumers before reviewing the remaining frequency rows. They remain revisable, but record and approve departures explicitly; do not treat every collision as permission to redesign the notation.
2. **Assign notation by concept.** The same concept should have the same canonical notation wherever it appears. Different spellings of the same concept are a different problem from one familiar letter used for unrelated, explicitly scoped concepts.
3. **Preserve established conventions in their fields.** Under the accepted Section 0.4 rule, another use conventional in its part of physics or mathematics may retain its symbol there. Nonconventional competing uses may move. Verify the actual meaning and convention; neither a familiar letter nor repetition in this repository establishes that status.
4. **Claim short symbols when appropriate.** A central theory quantity can own a short symbol even if another discipline uses that letter differently. Define it clearly, document the reservation, and distinguish the meanings in comparison passages.
5. **Spend qualifiers where they prevent confusion.** Retain distinctions such as primitive versus observer-channel speed. Prefer a concise role subscript over a long descriptive identifier, but do not shorten away an unresolved physical distinction.
6. **Make the reframe explicit.** State what is preserved, what is redefined, its physical layer, and whether correspondence is a definition, derived result, recovery target, or comparison. Similar glyphs do not prove equivalent physics.
7. **Change a concept everywhere.** An approved transition includes every active occurrence of that concept, its definitions, dependent expressions, examples, app explanations, and relevant implementation interfaces. It does not replace every matching character regardless of meaning.
8. **Review readability as well as consistency.** A replacement that is longer, harder to recognize, or ambiguous with another quantity must earn its cost. Leave well-scoped conventional reuse alone unless it creates a concrete reader or calculation error.

Plainly: readers should learn one short name for each recurring concept. Extra marks belong where they stop two different things from being confused. A familiar letter can still do another clearly defined job in a separate mathematical setting.

### Reassessing the preliminary concern labels

The consultation census identified overloaded notation, not mandatory renames. Its `Concern` labels are review leads. Using $n$ for an integer and for normalized density, or $\pi$ for the circle constant and for a permutation, does not by itself establish an error. Ask whether a reserved meaning is violated, whether meanings coexist ambiguously, and whether the same concept changes notation between documents.

The current [symbol canon](../../../content/markdown/aaa/archie/mathematics-terminology.md) is stricter than unrestricted local reuse: one glyph has one meaning within a document; a symbol used in three or more chapters requires a canonical row; subscripts and indices are part of identity. An allowance for clearly scoped bound indices or conventional comparison notation must therefore be decided in the guides before it is used as an exception. This plan does not silently relax that rule.

Plainly: an integer index called “en” is not automatically a density mistake. But a chapter cannot quietly change a reserved meaning. We need to agree where a mathematical scope begins and ends before enforcing a global rename.

## 2. Existing Knowledge: The Initial Draft

### 2.1 Authority and ownership

This hierarchy is already stated in [Terminology Usage: Canon Ownership and Precedence](../../../content/markdown/aaa/archie/terminology-usage.md#canon-ownership-and-precedence).

| Existing owner | What it controls | Use in this plan |
| --- | --- | --- |
| [Mathematics Style Guide](../../../content/markdown/aaa/archie/mathematics-style-guide.md) | Equation construction, coordinate layers, TeX, vectors, indices, presentation. | First owner for strategy, permitted shorthand, and the eventual reader explanation. |
| [Mathematical Terminology](../../../content/markdown/aaa/archie/mathematics-terminology.md) | Canonical cross-chapter symbols and their meanings. | Authoritative definitions and reservations; approved decisions ultimately land here. |
| [Terminology Usage](../../../content/markdown/aaa/archie/terminology-usage.md) | Term selection, physical-layer distinctions, rationale. | Explains why an inherited ontology must not enter a substrate derivation through familiar language. |
| [Comparative Glossary](../../../content/markdown/aaa/archie/comparative-glossary.md) | Translation between standard frameworks and this theory. | Records inherited meaning, reframed meaning, and correspondence status; does not override symbol canon. |
| [Academic Style Guide](../../../content/markdown/aaa/archie/academic-style-guide.md) | Expository structure and comprehension. | Keeps definitions and explanations near their equations. |
| [Repository instructions](../../../AGENTS.md) | Theory layers, normalized wake-speed units, evidence and edit boundaries. | Prevents a notation change from becoming an unapproved physical or workflow change. |

Plainly: the style guide explains how to write the mathematics, the symbol glossary says what it means, and the comparison glossary explains how to read it alongside familiar physics. This planning file must not become a competing permanent glossary.

### 2.2 Current reservations and distinctions

These are observed rules in the live guides, not new policy approved by this plan.

| Subject | Current notation and rule | Initial disposition |
| --- | --- | --- |
| Absolute time and position | $T$, $\mathbf X$, $\mathbf X_i(T)$; native differentials use the same capitals. | Retain. |
| Velocity and acceleration | $\mathbf V=d\mathbf X/dT$, $\mathbf A=d\mathbf V/dT$; bold vectors, hats for unit directions. | Retain; distinguish scalars and components. |
| Observer chart and clock | $t_{\mathrm{eff}}$, $x_{\mathrm{eff}}^i$ for observer coordinates; $\tau$ for derived physical-clock time. | Retain pending an explicitly approved shortening policy. |
| Other time quantities | $T_t$ emission, $T_r$ reception, $T_W$ record window, $T_{\mathrm{rec}}$ persistence duration, $T_{\mathrm{temp}}$ temperature. | Preserve roles; resolve period notation separately. |
| Spatial metric | $h_{ij}$ for Euclidean geometry; $g_{\mu\nu}^{\mathrm{eff}}$ and indexed $\gamma_{ij}^{\mathrm{eff}}$ for observer geometry. | Retain type and layer distinctions. |
| Speed channels | $c_f$ primitive wake; $c_{\mathrm{eff}}$ dressed assembly channel; $c_\gamma$ photon channel; $c_0$ asymptotic calibration; $c_\star$ declared comparison channel. | Retain; equality requires a derivation and regime. |
| Speed ratios | Channel-qualified $\beta_f,\beta_{\mathrm{eff}},\beta_\star$ and corresponding $\gamma$ factors; $v$ assigned to assembly group speed. | Retain channels; resolve internal orbital-speed uses. |
| Density and delay | $n=\rho_{\mathrm{NS}}/\rho_{\mathrm{NS},0}$ is normalized sea density; $\chi_{\mathrm{sea}}=c_f/c_{\mathrm{eff}}$ is sea delay factor. | Retain; do not call native delay factor $n$. |
| Envelope geometry | $\xi=R_\parallel/R_\perp$ is shape; $\lambda=R_\perp/R_{\perp,0}$ is transverse scale. | Retain these short assignments initially. |
| Polarity and interaction | $q_i$ polarity, $\epsilon$ polarity magnitude, $\epsilon_\pm$ inventory units, $\kappa$ coupling, $\sigma_{tr}$ interaction sign. | Retain; separate effective charge bookkeeping. |
| Causal-hit geometry | $\Delta_{r\leftarrow t}$ delay, $\mathbf r_t$ separation vector, $r$ distance, $D_t,D_r$ event-role factors, $W^{\mathrm{acc}}$ acceleration weight. | Retain; different factors or weights are not spelling variants. |
| Universe state | $\mathbb{U}_{\text{now}}\equiv S(T)$. | Retain; resolve other state/action/entropy contexts by scope. |
| Differential operators | $\nabla,\nabla^2$ for spatial differentiation and Laplacian; subscripted $\Delta$ for delays or residuals. | Retain, along with ordinary finite changes such as $\Delta E$. |
| Identifier spelling | Subscripts and indices are part of identity; stable identifiers use $\mathrm{...}$, ordinary words use $\text{...}$. | Normalize only after distinguishing identifiers from prose. |
| Local definitions | Define new symbols locally; shared symbols also need canonical definitions. | An app fallback is not a substitute. |
| Comparison formulas | Label the standard form, supply a layer-explicit working form and symbol map. | Retain; no standard-physics premise imported into the substrate. |

Plainly: the existing system already gives short names to time, position, polarity, density, shape, and scale. Its longer names usually distinguish clocks, channels, or event roles. Those distinctions should survive any improvement in spelling.

### 2.3 Earlier decisions and unfinished work

Live Git history confirms earlier notation work. Commit `626211d84` on 2026-07-05 included capital native coordinates, vector notation, and coordinate-layer normalization. Commit `a6c3d9c79` on 2026-07-06 further distinguished observer calibration from primitive wake speed in effective-potential formulas. These are evidence of deliberate choices, not authority to restore every formula or convention they contained; current owners govern.

The [cross-workstream queue](work-queue.md) already routes related work through AWT-006 (atomic/nuclear notation review), AWT-007 (spacetime notation, ownership, and speed distinctions), and AWT-014 (speed-symbol consolidation). This file coordinates discussion without closing those tasks, changing status or ranking, or claiming their physical blockers have disappeared.

One live guide conflict illustrates the need to review guidance itself: the comparative glossary's Absolute Time row still uses lowercase $t$ for the native global parameter, while the mathematical owners reserve $T$. The precedence rule identifies the owner; the non-owner occurrence belongs in the future inventory.

Plainly: earlier discussions left durable rules and some unfinished propagation. Preserve the decisions that still hold, repair incomplete propagation, and explicitly reconsider any rule the operator wants to improve.

## 3. Equation Census and Its Limits

### 3.1 Snapshot and instrument

The consultation examined the [Equation Mapping registry](../../../content/generated/equation-mapping/corpus-equations.json). Its contents were rechecked unchanged while preparing this draft.

| Observation | Recorded value and boundary |
| --- | --- |
| Equation records | 4,598 display records in 153 files containing displays; the generator scans 199 Markdown files in total. |
| Repeated formulas | 4,436 distinct strings after whitespace normalization; 162 excess records under that limited test. Not an algebraic redundancy count. |
| Instrument | One-off JavaScript traversal of vendored KaTeX 0.16.11 parse trees; exploratory, not an accepted semantic validator. |
| Coverage | All 4,598 formulas parsed; one unsupported triple-dot spelling expanded in scratch analysis only. Four manually enumerated examples checked selected tokenization behavior, not whole-corpus semantics. |
| Uses | Selected symbol appearances, including repeats inside one formula. |
| Equations | Records containing the normalized symbol; repeated records remain included. |
| Normalization | Numeric powers grouped with bases; subscripts, named superscripts, and vector styling generally retained; equivalent bracing and identifier text/roman spellings normalized. Operator limits traversed separately. |
| Exclusions | Numerals, punctuation, basic arithmetic/relation signs, ordinary text, and named functions. Named calculus operators remain counted. |
| Assessment grade | Counts measured under instrument conventions; meanings and consistency inferred from canon and sampled contexts. |
| App descriptions | 29,623 symbol-description records; 20,375 (68.8%) classified as `shared-context` fallback text. Not a measurement of how many symbols lack mathematical definitions. |

Plainly: the census tells us what readers encounter often. It does not establish that repeated letters have the same meaning, duplicate formulas are unnecessary, or every occurrence has been semantically reviewed.

Registry SHA-256: `c67ac690439a18b541775793b88fd30e59332b308d7006fe8d02422ab006a36b`. Consultation script SHA-256: `dee997fcebe1599eb8f557e85c978f66471feaa8a1a82734dcee2197676e10e7`. The script and full output were temporary consultation artifacts; this file preserves the findings without depending on temporary-file links. Rebuild a reproducible census before treating counts as migration acceptance evidence.

Plainly: these fingerprints identify the input and instrument. A changed input or counting rule needs a new dated result; this table must not silently become a current enforcement baseline.

A numeric superscript may mean a power or a space's dimension; an inverse may mean reciprocal or inverse map. Indices, quantities, and particle labels can share glyphs. The temporary normalization is unsuitable for automatic replacements. Repetition also biases frequency toward repeated exposition. A semantic inventory must retain raw TeX and source locations alongside normalized identifiers and report occurrence-weighted and deduplicated views.

Plainly: a search hit is a place to inspect, not permission to replace. First establish the object, units, indices, and physical layer.

#### 3.1.1 Conflict / clearance column

The symbol and candidate-transition tables now include **Conflict / clearance**. This column concerns the prior uses that must be resolved to establish a proposed reservation, including conflicts at replacement destinations. It is separate from frequency and from whether the present usage is locally consistent.

Use a transparent assessment rather than an invented combined score: **Known conflict** means distinct competing meanings have been identified; **Scope-dependent** means the coexistence rule determines which uses must move; **Unassessed** means coverage is insufficient; **Scoped case completed** refers only to the recorded completed transition, not every other use of the glyph. A sampled-consistent row is still unassessed for complete clearance. These are planning descriptions, not new canonical terminology or permission to rename.

Where available, record **other semantic roles / distinct display equations / source files** as the initial exposure measure. Then record how many roles must move, may remain under an approved scope, or remain unresolved; identify every onward destination conflict. Under Section 0.4, include the competing use's **conventional status, relevant field, matching definition, and evidence** before selecting retain or move. Unknown convention evidence stays unverified, just as unknown counts stay unmeasured rather than zero. Include inline and app/code/interface scope separately. For a proposed incoming use, the destination's existing occupants count as conflicts to assess even if its current uses are internally consistent.

Plainly: the column tells us how much competing usage we know about and whether we know how to resolve it. It does not equate every matching letter with an error or pretend a preliminary label is a measured migration cost.

**Measured xi example, 2026-08-28:** the verified registry snapshot `e043c8849ce1002910f1335fc978a130ebf03008b17133123649df73c23d116a` contains 160 lowercase-xi-family display records. The source-context assessment assigns 72 to shape and its dependent readouts, leaving **88 display records, 222 raw xi tokens, and 16 source files** to adjudicate for other meanings. Splitting the combined vector categories gives **13 other roles**: circular delay/branch angles; axial positions; internal displacements; path variations/symmetry generators; curvature coupling; preferred-location parameter; neutrino asymmetry; effective horizon vector; transport suppression; causal-writhe record components; jump times; complex multipliers; and arbitrary test vectors. Role boundaries are a manual semantic classification, not an automatic proof of conflict. Full and local circular-angle conventions still require separate decisions within that group. Counts include repeats and family variants, not only the original bare-xi row; they exclude inline/code/generated-copy counts. Required moves, approved coexistence, and destination conflicts remain unresolved.

**Coverage correction:** the 13-role figure is a display-snapshot count, not a repository-wide total. The broader source scan in Section 4.5 finds additional roles and an existing occupant of the proposed xi-d family. Those findings extend the clearance assessment without changing the original display census.

Plainly: xi has 88 non-shape display equations to review, not 88 approved renames. Bold vectors and qualified comparisons may remain, but only under the scope rules we settle. Additional uses outside those displays must also be settled. The other rows do not receive invented numerical burdens merely to fill the column.

### 3.2 Approved $\mathbb{A}\mathbb{A}\mathbb{A}$ notation — retained baseline

**Current choices, open to revision.** The [canonical symbol guide](../../../content/markdown/aaa/archie/mathematics-terminology.md) and [style guide](../../../content/markdown/aaa/archie/mathematics-style-guide.md) already assign the meanings below. These are our starting choices, not new proposals and not immutable decisions. The current scope permits only worthwhile, independent corrections; it does not schedule a comprehensive cleanup of these families. Any replacement of an approved form must be explicitly agreed before propagation.

Plainly: start with the symbols we already think we want. Make their use consistent everywhere; reconsider a choice when there is a clear reason to improve it.

#### 3.2.1 Approved reservations represented in the top 50

The following 16 rows are moved from the original census table; the remaining 34 follow in Section 3.3. Ranks, counts, and preliminary assessments are unchanged. The meaning column now states the approved role, not the collection of meanings encountered. Counts still include other uses of the counted symbol: the $S$ count, for example, is not a count solely of the approved universe state $S(T)$.

| Census rank | Symbol | Uses | Equations | Approved meaning | Preliminary consistency assessment | Conflict / clearance | Review disposition |
| ---: | --- | ---: | ---: | --- | --- | --- | --- |
| 1 | $T$ | 1,786 | 705 | Absolute time | Concern: also cycle period. | Scoped period case completed (§4.4); other conflicts unassessed. | Retain — absolute time; completed period cleanup stands. |
| 5 | $T_t$ | 648 | 238 | Transmitter emission time | Consistent event role. | Unassessed; no competing meaning identified in sampled event-role uses. | Retain — emission-event role is explicit. |
| 8 | $c_f$ | 443 | 337 | Primitive wake speed | Consistent shared quantity. | Unassessed; sampled channel meaning stable. | Retain — primitive wake channel; no speed-channel merger. |
| 10 | $T_r$ | 398 | 142 | Receiver reception time | Consistent event role. | Unassessed; no competing meaning identified in sampled event-role uses. | Retain — reception-event role is explicit. |
| 12 | $t_{\mathrm{eff}}$ | 342 | 163 | Observer coordinate time | Consistent layer distinction. | Unassessed; sampled layer meaning stable. | Retain — observer coordinate; keep the layer qualifier. |
| 13 | $\mathbf X$ | 338 | 178 | Euclidean position vector | Consistent position/configuration geometry. | Unassessed; vector/configuration scope needs checking. | Retain — position vector; distinguish configuration records locally. |
| 15 | $c_0$ | 317 | 193 | Observer speed calibration | Consistent channel assignment. | Unassessed; sampled calibration meaning stable. | Retain — observer calibration, separate from primitive wake speed. |
| 19 | $r$ | 274 | 134 | Causal separation distance | Mixed separation and orbital geometry. | Known competing roles — separation/orbital distance; extent and destinations unmeasured. | Retain — causal distance; inspect orbital reuse only at an actual shared context. |
| 21 | $v$ | 249 | 119 | Assembly group speed | Concern: group, total constituent, and orbital speeds. | High semantic conflict — four motion quantities and their source families assessed in §4.8; no destination approved. | Defer — connected speed-symbol migration exceeds the worthwhile-easy scope. |
| 24 | $n$ | 212 | 144 | Normalized Noether braid density | Concern to reassess by scope. | Scope-dependent — density/integer roles; extent and replacement destinations unmeasured. | Retain — normalized density; no blanket integer-index cleanup. |
| 26 | $\beta_f$ | 209 | 111 | Group-speed/wake-speed ratio | Concern: group, circular constituent, or inertial transmitter numerator. | High semantic conflict — 108 non-group math spans in four corpus sources at the §4.8 checkpoint; s and indexed-beta destinations are not cleared. | Defer — preserve the assessment; no ratio rename scheduled. |
| 29 | $\xi$ | 176 | 88 | Envelope shape ratio | Concern: distinct core definitions. | Display snapshot: 13 other roles / 88 displays / 16 files. Additional active roles and the xi-d destination conflict are in §4.5; not cleared. | Defer — keep shape meaning; resolve angle definitions before clearance. |
| 37 | $\nabla$ | 145 | 104 | Spatial differentiation | Consistent; coordinate layer matters. | Unassessed; sampled operator meaning stable. | Retain — spatial operator with its declared coordinate layer. |
| 38 | $\kappa$ | 139 | 123 | Interaction coupling | Consistent core role. | Unassessed; core role stable in sample, other domains unchecked. | Retain — core coupling; other local coefficients do not mandate a global rename. |
| 41 | $S$ | 135 | 95 | Universe state, as $S(T)$ | Concern: also surfaces and Bell expressions. | Known competing roles — state/surface/Bell expression; scope, extent, and destinations unresolved. | Retain — complete state identity; preserve other conventional contexts pending actual conflict. |
| 43 | $\lambda$ | 131 | 75 | Transverse scale ratio | Concern: also wavelength and hidden variable. | Known competing roles — scale/wavelength/hidden variable; extent and destinations unmeasured. | Retain — transverse scale; wavelength and comparison reuse is not an automatic rename. |

Plainly: “approved” describes the intended symbol and meaning. It does not certify all counted occurrences. The review column selects current work; the preliminary concern and conflict columns preserve earlier evidence without making every concern an immediate cleanup.

#### 3.2.2 Related approved forms, including those outside the top 50

These families complete the central reservations summarized in Section 2.2 and include other explicit assignments in the live guide. They have been included in the decision review even when uncommon; their review dispositions do not schedule a migration. No occurrence counts are assigned here without a fresh census. This is a planning extract; the linked guides remain the full authority.

| Approved form or family | Brief meaning | First-pass obligation | Conflict / clearance | Review disposition |
| --- | --- | --- | --- | --- |
| $\mathcal M=\mathbb R\times\mathbb R^3$, $\Sigma_T$, $\mathbf X_i(T)$ | Absolute timespace; slice; worldline | Preserve absolute time and Euclidean space; no substrate spacetime metric. | Unassessed by member; required moves and destination occupants not yet measured. | Retain — absolute product, slice, and worldline roles. |
| $\mathbf V=d\mathbf X/dT$, $\mathbf A=d\mathbf V/dT$ | Velocity; acceleration | Keep vectors, scalar speeds, components, and derivatives distinct. | Unassessed by member; required moves and destination occupants not yet measured. | Retain — vector derivatives; broader scalar-speed migration is deferred. |
| $h_{ij}$, $\hat{\mathbf r}_t$, $\|\cdot\|$, $\nabla^2$ | Spatial metric; direction; norm; Laplacian | Retain spatial layer and vector/operator identity. | Unassessed by member; required moves and destination occupants not yet measured. | Retain — spatial metric, unit direction, norm, and operator. |
| $x_{\mathrm{eff}}^i$, $dt_{\mathrm{eff}}$, $dx_{\mathrm{eff}}^i$, $\partial_{t_{\mathrm{eff}}}$ | Observer coordinates and derivatives | Pair with $t_{\mathrm{eff}}$; require an explicit map from absolute coordinates. | Unassessed by member; required moves and destination occupants not yet measured. | Retain — observer coordinates and derivatives remain explicit. |
| $\tau$, $d\tau$ | Derived clock time | Distinguish clock readout from either coordinate time. | Unassessed by member; required moves and destination occupants not yet measured. | Retain — clock readout; do not equate it with coordinate time. |
| $P$, $P_b$, $P_q$, $P_0$, $P_{\mathrm{ret}}$ | Cycle; branch; clock; reference; return periods | Approved 2026-08-28. Preserve the declared return condition and time units; use $P_{\mathrm{cyc}}$ for actual collisions. Source and local web synchronization verified in Section 4.4. | Scoped period case completed (§4.4); other occupants of P are not globally cleared. | Retain — completed period decision and its collision qualifiers. |
| $T_W$, $T_{\mathrm{rec}}$, $T_{\mathrm{temp}}$ | Record window; persistence; temperature | Protect bare $T$; do not merge these quantities. | Unassessed by member; required moves and destination occupants not yet measured. | Retain — already distinguished duration and temperature roles. |
| $\mathbb U_{\text{now}}\equiv S(T)$ | Complete universe state | Preserve the required history and provenance; classify other $S$ uses separately. | Competing state/action/surface/comparison meanings require scope and destination checks. | Retain — complete state including required history; no sufficiency claim. |
| $c_{\mathrm{eff}}$, $c_\gamma$, $c_{\mathrm{GW}}$, $c_\star$ | Dressed; photon; gravitational-wave; declared speed | Keep channel definitions distinct, alongside $c_f$ and $c_0$. | Unassessed by member; required moves and destination occupants not yet measured. | Retain — distinct declared propagation and calibration channels. |
| $\beta_X=v/c_X$, $\gamma_X=(1-\beta_X^2)^{-1/2}$ | Channel group-speed ratio; Lorentz factor | Use a declared channel $X$; do not silently use internal orbital speed for $v$. | Group-speed/orbital ratios and metric/comparison forms; clearance unmeasured. | Defer — same connected speed-symbol migration; retain channel distinctions. |
| $\rho_{\text{NS}}$, $\rho_{\text{NS},0}$, $n=\rho_{\text{NS}}/\rho_{\text{NS},0}$ | Physical; reference; normalized density | Reserve $n$ for normalized density; decide local-index exceptions explicitly. | Density versus bound-index and other rho roles; clearance unmeasured. | Retain — dimensional versus normalized density stays explicit. |
| $\chi_{\text{sea}}=c_f/c_{\mathrm{eff}}$, $\chi_\gamma=c_0/c_\gamma$ | Sea; photon delay factors | Preserve different reference speeds; neither is density $n$. | Unassessed by member; required moves and destination occupants not yet measured. | Retain — sea and photon delay factors have different reference speeds. |
| $\xi=R_\parallel/R_\perp$, $\lambda=R_\perp/R_{\perp,0}$ | Envelope shape; transverse scale | Separate delay angles, wavelengths, and other parameters from these geometry ratios. | Xi display snapshot: 13 other roles / 88 displays / 16 files; expanded active/destination assessment in §4.5. Lambda remains unassessed. | Defer — retain both geometry definitions; xi angle clearance is postponed. |
| $\Omega(n,\lambda)$, $\omega_{\text{clk}}/\omega_0=d\tau/dt_{\mathrm{eff}}$ | Constitutive factor; clock-rate ratio | Keep geometry, constitutive response, and extracted clock rate distinct. | Unassessed by member; required moves and destination occupants not yet measured. | Retain — constitutive response and extracted clock rate stay separate. |

Plainly: the less frequent partners matter too. Time, speed, density, shape, and clock readings need complete families of names, not isolated repairs to their most common letters.

| Approved form or family | Brief meaning | First-pass obligation | Conflict / clearance | Review disposition |
| --- | --- | --- | --- | --- |
| $\epsilon$, $\epsilon_\pm$, $q_i$, $q_t$, $q_r$, $\sigma_{tr}$ | Polarity magnitude; labels; values; interaction sign | Keep inventories, fixed polarities, and the acceleration sign aligned. | Unassessed by member; required moves and destination occupants not yet measured. | Retain — polarity and interaction-sign meanings; coordinate collisions need specific evidence. |
| $T_t$, $T_r$, $\Delta_{r\leftarrow t}=T_r-T_t$ | Emission; reception; travel delay | Distinguish a time delay from an angle or finite change. | Unassessed by member; required moves and destination occupants not yet measured. | Retain — time events and duration, not angular coordinates. |
| $\mathbf r_t$, $r=\|\mathbf r_t\|$, $\hat{\mathbf r}_t$ | Causal separation; distance; direction | Use the emission site and reception site, not simultaneous positions. | Unassessed by member; required moves and destination occupants not yet measured. | Retain — emission-to-reception geometry; no simultaneous-position substitution. |
| $\mathcal C_{r\leftarrow t}(T_r)$ | Arriving emission-time set | Preserve transmitter/receiver roles and causal-root membership. | Unassessed by member; required moves and destination occupants not yet measured. | Retain — arriving emission-time set and root membership. |
| $D_t$, $D_r$, $J^t_{r\leftarrow t}$, $W^{\mathrm{acc}}_{r\leftarrow t}$ | Emission; crossing; Jacobian; acceleration weight | Protect the separate formulas; legacy weight differences are not automatic renames. | Unassessed by member; required moves and destination occupants not yet measured. | Retain — current distinct definitions; old weight-law differences are mathematical review. |
| $\delta(r-c_f\Delta)$, $\delta_\eta$, $H(\Delta)$, $\Phi$, $\Phi_\eta$ | Causal surface; smoothing; step; potentials | Retain the declared distribution, smoothing, and causal conventions. | Unassessed by member; required moves and destination occupants not yet measured. | Retain — causal distribution, smoothing, and potential definitions. |
| $o_{\mathrm{PA}}$, $c_{\mathrm{pol}}$, $\chi_{\mathrm{pol}}$ | Orientation; polarity assignment; handedness | Preserve each sign's definition and domain of validity. | Unassessed by member; required moves and destination occupants not yet measured. | Retain — distinct orientation, assignment, and handedness signs. |
| $a\in\{1,2,3\}$, $(R_a,f_a,\phi_a)$, $h\in\{1,2,3\}$ | Binary identity; coordinates; candidate carrier | Do not relabel persistent indices by size or speed; $h$ needs its declared analysis. | Unassessed by member; required moves and destination occupants not yet measured. | Retain — persistent identities; preserve analysis conditions. |
| $g_{\mu\nu}^{\mathrm{eff}}$, $\gamma_{ij}^{\mathrm{eff}}$, $\Gamma^\lambda_{\mu\nu}(g^{\mathrm{eff}})$ | Observer metrics; connection | Keep tensor indices and observer layer; scalar $\gamma_{\mathrm{eff}}$ is a different object. | Unassessed by member; required moves and destination occupants not yet measured. | Retain — effective tensors; do not confuse them with scalar group-speed factors. |
| $\Phi_N$, $\Phi_{\text{eff}}$, $U$, $U_\Phi$, $U_{\text{eff}}$ | Benchmark; constitutive; branch potentials | Preserve the guide's signs, definitions, and effective/comparison roles. | Unassessed by member; required moves and destination occupants not yet measured. | Retain — declared potential meanings, signs, and layer distinctions. |
| $K_\parallel,K_\perp$, $(k_2,\ell_2,k_4,\ell_4)$ | Stiffness channels; expansion coefficients | Keep axis roles and expansion conventions together. | Unassessed by member; required moves and destination occupants not yet measured. | Retain — channel coefficients; do not change their expansion variable silently. |
| $\gamma_{\mathrm{PPN}}$, $\beta_{\mathrm{PPN}}$, $\alpha_i$, $\Xi_i$, $\epsilon_{\mathrm{LV}}$, $\Delta_{\mathrm{tw}}$ | Comparison parameters; leakage diagnostics | Do not consume the dressed group-speed symbols $\beta_{\mathrm{eff}},\gamma_{\mathrm{eff}}$. | Unassessed by member; required moves and destination occupants not yet measured. | Retain — qualified comparison and leakage quantities. |
| $\mathcal L_{\text{eff}}$, $D_\mu$, $g,g'$, $\theta_W$, $Y$ | Effective Lagrangian and gauge symbols | Preserve labeled effective mappings; these are not primitive premises. | Unassessed by member; required moves and destination occupants not yet measured. | Retain — effective gauge mapping; no primitive-law import. |
| $a(t_{\mathrm{eff}})$, $H(t_{\mathrm{eff}})$, $\Omega_m$, $\Omega_\Lambda$ | Effective cosmology summaries | Keep observer-time dependence and distinguish local index and operator uses. | Unassessed by member; required moves and destination occupants not yet measured. | Retain — effective cosmology variables and observer time. |

Plainly: approved notation does not certify the physical result it names. A recovery target stays a target, a conditional quantity stays conditional, and a change of spelling must not change the mathematics.

**Current work order:** preserve the completed time/period change; assess assembly group velocity versus internal motion first; defer xi shape/angle clearance; retain the other approved choices. This is 39 retain entries, 3 decision-needed entries belonging to one speed family, and 2 deferred entries belonging to the overlapping xi review. Other frequency rows enter only through an actual conflict with the selected change. A later newly demonstrated ambiguity may justify a new priority; the table is not a mandatory alphabet-wide migration queue.

### 3.3 Remaining top-50 rows from the consultation

These 34 rows complete the original top 50 after the approved reservations moved to Section 3.2. Their placement does not make ordinary calculus or conventional local notation disapproved. They are a second review priority unless they collide with an approved family; for example, bare $t$ and $c$ must be inspected during the time/channel pass.

`Consistent` means a stable role in sampled contexts. `Mixed` identifies local reuse. `Concern` preserves the preliminary review lead, not a mandatory rename. Section 1 governs reassessment. Ties are ordered by equation count, then normalized spelling.

| Rank | Symbol | Uses | Equations | Brief meaning | Preliminary assessment | Conflict / clearance |
| ---: | --- | ---: | ---: | --- | --- | --- |
| 2 | $d$ | 1,224 | 589 | Differential; distance | Mixed: also particle label. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 3 | $\Delta$ | 1,019 | 492 | Change; delay; phase gap | Concern: roles can have different units. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 4 | $\theta$ | 703 | 317 | Angle; parameter collection | Concern: also configuration and history parameter. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 6 | $\sum$ | 508 | 379 | Summation | Consistent operator. | Unassessed; no competing meaning identified in sampled operator uses. |
| 7 | $\partial$ | 478 | 268 | Derivative; boundary | Mixed conventional roles. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 9 | $a$ | 408 | 219 | Scale factor; index | Mixed: also outcome and coefficient. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 11 | $\int$ | 354 | 276 | Integration | Consistent operator. | Unassessed; no competing meaning identified in sampled operator uses. |
| 14 | $i$ | 335 | 261 | Index; imaginary unit | Mixed conventional roles. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 16 | $A$ | 317 | 168 | Assembly; coefficient | Mixed: also apparatus and clock factor. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 17 | $\pi$ | 303 | 250 | Circle constant; map | Mixed: also permutation and record map. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 18 | $W$ | 287 | 165 | Observation window/domain | Mixed temporal and spatial scope. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 20 | $b$ | 255 | 146 | Branch; outcome; parameter | Mixed local definitions. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 22 | $s$ | 235 | 118 | Speed; path parameter | Mixed: also sign and particle label. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 23 | $R$ | 215 | 146 | Radius; map; curvature | Mixed quantity types. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 25 | $\delta$ | 210 | 121 | Variation; delta distribution | Mixed: also local phase difference. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 27 | $k$ | 196 | 111 | Wavenumber; index | Mixed mode, outcome, component roles. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 28 | $t$ | 195 | 96 | Unqualified time | Concern where working layer is undeclared. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 30 | $E$ | 174 | 108 | Energy; endpoint label | Mixed: also environment class. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 31 | $j$ | 173 | 145 | Transmitter/component index | Mixed indexed objects. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 32 | $m$ | 167 | 117 | Effective mass; mode index | Mixed quantity and integer label. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 33 | $\ell$ | 165 | 95 | Length; mode/index | Mixed length, harmonic, binary roles. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 34 | $O$ | 158 | 136 | Remainder order; observer | Mixed, predominantly order estimates. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 35 | $\omega$ | 151 | 73 | Angular frequency | Consistent quantity, differing oscillators. | Unassessed; sampled frequency role stable, oscillator distinctions remain. |
| 36 | $\hbar$ | 148 | 117 | Reduced action quantum | Consistent meaning; recovery status separate. | Unassessed; no competing meaning identified in sample. |
| 39 | $T'$ | 136 | 47 | Auxiliary/transformed time | Mixed integration/transformation roles. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 40 | $e$ | 135 | 96 | Exponential base; charge | Mixed: also event labels. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 42 | $N$ | 131 | 81 | Count; clock factor | Mixed discrete and continuous roles. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 44 | $p$ | 130 | 69 | Momentum; spiral pitch | Mixed: also scaling parameter. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 45 | $P$ | 127 | 68 | Probability; momentum magnitude | Mixed local meanings. | Scope-dependent — probability/momentum/period; period case in §4.4, full burden unmeasured. |
| 46 | $c$ | 123 | 91 | Comparison speed; label | Concern where speed channel is unspecified. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 47 | $\rho$ | 123 | 71 | Density; radius ratio | Concern: also statistical state and action fraction. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 48 | $\theta_{\mathrm{sea}}$ | 121 | 63 | Sea-state parameters | Mostly consistent; record contents vary. | Unassessed; variation in record contents needs semantic review. |
| 49 | $u$ | 120 | 62 | Group velocity; auxiliary parameter | Mixed: also integration and particle labels. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |
| 50 | $z$ | 119 | 49 | Redshift; coordinate | Mostly consistent in cosmology; other local roles. | Scope-dependent; competing uses noted, extent and destinations unmeasured. |

Plainly: these rows retain the rest of the census, with their original ranks and counts. Frequency helps us find common notation, but our approved concepts determine what we straighten out first.

### 3.4 Strongest source-backed leads

- **Time versus period — source transition applied:** The original census found $T(v)=\gamma_\star(v)T_0$ for a period in [Return-Cycle Lorentz Quantization](../../../content/markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md). That source now uses $P(v)=\gamma_\star(v)P_0$, consistent with the existing $P_b$ branch-period family in [Binary Dynamics](../../../content/markdown/aaa/dynamics/binary-dynamics.md). The original frequency table remains a dated baseline, not a post-migration count.
- **Shape versus delay angle:** [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md) defines $\xi=\omega\Delta/2$ in circular geometry; [Braid Envelope Geometry](../../../content/markdown/aaa/noether-braid/braid-envelope-geometry.md) uses $\xi=R_\parallel/R_\perp$. They are different dimensionless objects.
- **Group velocity versus circulation:** the circular Master Equation benchmark uses $v=\omega R$ and $\beta_f=v/c_f$ for internal motion, while the guide assigns $v$ to assembly group speed. Existing binary ratio $s$ is a possible compact destination, subject to preserving dimensions.

Plainly: a period is a duration, xi can mean flattening or an angle, and internal motion is not movement of the whole assembly. These are concrete opportunities to carry the wrong definition between related derivations.

Each lead is overturned or narrowed by a valid explicit mapping and approved scope rule that makes the roles unambiguous. Counts alone cannot establish these semantic findings.

## 4. Proposed Transition Table

**The absolute-time/cycle-period transition is completed approved work; further implementation remains paused under Section 0.** Other entries remain discussion proposals; “retain” alone does not authorize a new enforcement campaign. Candidate spellings require a collision and ownership inventory, including the displacement chains in Section 0.3. A transition includes the reserved concept, every conflicting occupant that must move, their checked destinations, and all active consumers. It can close separately from unrelated concept families, but not while a required secondary move remains unplanned or after changing only one chapter. Preliminary claims below that a comparison use may remain are candidate scope decisions, not granted exceptions.

### 4.1 Time, geometry, and speed

| Current use | Proposed destination | Reason and scope | Prerequisite or decision | Conflict / clearance |
| --- | --- | --- | --- | --- |
| $T$ absolute time | Retain $T$. | Central short canonical quantity. | Approved: remove competing cycle-period uses; no blanket change of other time quantities. | Scoped period conflict resolved (§4.4); wider reservation still needs inventory. |
| Native $t,\mathbf x$ or scalar-styled vectors | $T,\mathbf X$ and indexed native forms. | Existing coordinate-layer rule. | Classify native/comparison uses; preserve actual scalar components; include guidance consumers. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |
| Observer $t,x^i$ in working formulas | $t_{\mathrm{eff}},x_{\mathrm{eff}}^i$. | Distinguish observer and substrate coordinates. | No shortening to bare letters without a guide decision. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |
| $T(v),T_q,T_0$ as periods | Approved $P,P_q,P_0$; preserve existing $P_b$; use $P_{\mathrm{cyc}}$ only when another $P$ coexists. | Short period notation; reserve $T$. | Source migration and authorized local web regeneration complete; role-specific mappings, collisions, and evidence in Section 4.4. | P already has probability/momentum uses; approved period qualifiers recorded in §4.4. |
| Bare $T$ temperature | $T_{\mathrm{temp}}$ or an existing temperature subscript. | Already settled in the guide. | Preserve true absolute-time uses. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |
| $\tau$ physical-clock readout | Retain $\tau$. | Familiar clock/proper-time bridge. | Do not identify it with absolute time. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |
| $\tau$ native causal travel delay | Prefer $\Delta$ with event subscripts when needed. | Separate travel delay from clock readout. | Comparison relaxation/proper-time meanings are separate concepts. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |
| $\Delta$ change, travel time, phase gap | Keep $\Delta E$; explicit delay $\Delta_{r\leftarrow t}$; existing $\delta$ family for full delay angles. | Preserve concise forms without mixing duration and angle. | Check delta distributions and variations before selecting angle spelling. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |
| $\xi$ envelope shape | Retain $\xi$. | Existing short geometry reservation. | Preserve axis-ratio definition, not a Lorentz identity by definition. | Display snapshot: 13 other roles / 88 displays / 16 files; additional active roles in §4.5. Every prior use needs a disposition. |
| $\xi$ half-delay angle | Compare $\theta_{\mathrm d}$ for full half-delay and $\theta_{\mathrm{loc}}$ for the local partner-chart coordinate; earlier $\xi_d$ remains an alternative. | Preserve half-angle normalization and distinguish full versus local coordinates. | Complete the sign/domain and family checks in Section 4.5 before selecting a spelling. | Existing $\boldsymbol\xi_{\mathrm d}$ is a lattice displacement; no initial theta-d/theta-loc matches. Neither absence nor font difference is final clearance. |
| $\lambda$ envelope scale | Retain $\lambda$. | Existing concise shape/scale pair. | Inspect adjoining wavelength/eigenvalue/hidden-variable uses. | Scale, wavelength, eigenvalue, hidden-variable occupants; proposed qualified destinations unchecked. |
| Other $\lambda$ concepts at shared interfaces | Candidates $\lambda_\gamma$ wavelength, $\lambda_{\mathrm{hv}}$ hidden variable when needed. | Familiar letter with a role qualifier. | No mandatory suffix in isolated approved comparison notation; no invented equivalence to a history record. | Scale, wavelength, eigenvalue, hidden-variable occupants; proposed qualified destinations unchecked. |
| Primitive/dressed/photon/calibration speeds | Retain $c_f,c_{\mathrm{eff}},c_\gamma,c_0,c_\star$. | Protect physical channels. | No collapse without theorem and regime; numerical primitive wake speed remains $c_f=1$. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |
| Bare $c$ in native or mixed working formulas | Actual declared channel symbol. | Remove an unspecified propagation law or denominator. | Identify from definition, not familiar algebra. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |
| $v$ assembly group speed | Retain $v$. | Existing short role. | Separate assembly and internal motion. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |
| Dimensionful internal orbital $v$ | Candidate $v_{\mathrm{orb}}$ or explicit $\|\mathbf V_i\|$. | Preserve dimensions and identify the moving object. | Audit existing orbital notation; never replace a speed directly by a ratio. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |
| Orbital $\beta_f$ and binary $s$ | No destination selected; retain the approved group-speed meaning of $\beta_f$ as the planning baseline. | Separate circulation from group motion without merging total and relative speeds. | Section 4.8 supersedes the earlier preference for s: its dimensional, sign, and time occupants must remain distinct. | High conflict for bare s; an indexed beta alone also fails to distinguish binary speed from sampled group speed. No secondary eviction is approved. |
| PPN versus group-speed $\beta,\gamma$ | Retain $\beta_{\mathrm{PPN}},\gamma_{\mathrm{PPN}}$ and channel-qualified group-speed factors. | Existing distinct roles. | Indexed metric tensors are not these scalar parameters. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |

Plainly: keep short names for the main concepts. Qualify a competing use or reuse an existing short alternative. Do not turn a change of letters into a hidden change of units, angle normalization, or physical channel.

### 4.2 State, density, polarity, and conventional reuse

| Current use | Proposed destination | Reason and scope | Prerequisite or decision | Conflict / clearance |
| --- | --- | --- | --- | --- |
| Normalized sea density $n$ | Retain $n$ and dimensional $\rho_{\mathrm{NS}}$. | Deliberately concise constitutive notation. | Same definition in every consumer. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |
| Native delay/refractive factor called $n$ | $\chi_{\mathrm{sea}}$ or declared photon variant. | Existing density/delay distinction. | Standard optical $n$ may remain as labeled comparison with a map. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |
| $n$ bound integer index | Preserve where approved scope permits; another index when density coexists. | Avoid renaming harmless dummy variables everywhere. | Decide exception against current document-wide reservation rule first. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |
| $\theta$ angle and parameter record | Keep geometric $\theta$ and shared $\theta_{\mathrm{sea}}$; candidate $\theta_{\mathrm{cfg}}$ for colliding configuration records. | Angle versus parameter collection. | Inventory schemas; bolding an abstract record does not make it a vector. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |
| $\rho$ density, normalized radius, delayed radius ratio, statistical state | Keep established density/state notation by domain; candidates $\rho_R$ normalized radius and $\rho_d$ delayed/current radius ratio where derivations meet. | Separate distinct ratios and densities. | Approve exact definitions; no blanket suffix for conventional uses. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |
| Complete universe state $S(T)$ | Retain $S(T)$ and $\mathbb{U}_{\text{now}}$. | Existing compact identity. | Preserve required history; naming does not prove state sufficiency. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |
| Other $S$ meanings in shared native exposition | Existing $\mathcal S$ for action where applicable; candidates $S_{\mathrm{th}}$ entropy and $S_{\mathrm{CHSH}}$ Bell expression where needed. | Protect recognizable concepts without banning conventional $S$. | Classify action, source, surface, entropy, and statistical meanings. | Proposed action/entropy/Bell forms each need destination and scope checks. |
| $E$ energy and endpoint/environment labels | Keep energy $E$; candidate $\mathrm{em},\mathrm{rec}$ endpoint labels at ambiguous interfaces. | Preserve the familiar energy symbol. | An event is not merely its time; retain full event data and mapping. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |
| $W$ spatial domain and time interval | Keep domain $W$, duration $T_W$; candidate interval $I$ when both coexist. | Domain versus duration. | Inspect other $I$ roles; neither object is $W^{\mathrm{acc}}$. | Candidate I is not assumed free; interval and other I roles need inventory. |
| $\epsilon$ polarity and tolerance | Keep polarity $\epsilon$; existing $\varepsilon$ with purpose subscript where needed for tolerances. | Small typographic distinction. | Verify rendering and tolerance consumers; values stay unchanged. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |
| $q_i$ polarity and generalized coordinate | Keep polarity $q_i$; use the existing reduced-coordinate family, often $y$, where both meet. | Coordinate values are not fixed polarity values. | Keep conventional $q,p$ in labeled comparisons with a map. | Reduced-coordinate destination (including y) needs occupancy and interface checks. |
| $h,\hbar$ action; $h_{ij}$ metric; $h$ history horizon | Keep action and metric conventions; candidate $h_{\mathrm{mem}}$ for colliding history horizon. | Include this below-top-50 family because guides already distinguish the roles. | Audit horizon versus memory-usage definitions before reusing the subscript. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |
| $\mu_{\mathrm{arch}}$ and mass-like fields | Retain declared numerical/bulk-bookkeeping meaning. | Cleanup cannot create primitive architrino mass. | Formula/schema meaning changes require a separate decision. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |
| $D_t,D_r,J^t,W^{\mathrm{acc}}$ and older weights | Preserve current owner definitions; map provenance explicitly. | Older weights can be different mathematics, not spellings. | Never replace them lexically; route substantive differences to dynamics. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |
| $i$ index/imaginary unit, $d$ distance/differential, $e$ charge/exponential base | Preserve familiar forms; evaluate upright typography or $\exp$ where useful. | Ordinary conventions are often shortest and clearest. | Global typography needs approval; particle labels are separate. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |
| Generic $a,b,j,k,m,\ell,p,P,N,O,R,u,z$ | No blanket rename; keep stable local and vector/index conventions. | Frequency does not justify exclusive ownership of every letter. | Change only a proven collision or inconsistent spelling of a recurring concept. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |
| Equivalent TeX and app symbol chips | One approved spelling per identifier; preserve vectors and meaningful scripts in extraction. | Display and explanation must name the same object. | Repair existing extractor/consumers only in an authorized implementation phase. | Unassessed; prior occupants, retained scopes, and replacement destinations need inventory. |

Plainly: preserve familiar short notation by default. Qualify recurring meanings when they actually meet. A qualifier does not cure an undefined concept, and a new name must not change the physical claim.

### 4.3 Required detail for an approved transition

The accepted convention rule adds a required field for every competing use: **conventional status in the relevant field, supporting evidence, and correspondence of our definition to that conventional meaning**. Apply this to replacement destinations as well. A conventional use may retain its symbol in that context; a local competing choice has no automatic claim to retain the old letter. Missing evidence is unresolved, not a license to declare the use nonconventional.

Plainly: before deciding who moves, determine whose notation is an established convention and whose is our own choice. Then check every destination with the same care.

Expand each selected row here before execution: concept and definition; units; scalar/vector/tensor/record type; physical layer; present forms; chosen form; allowed comparison/local forms; forbidden collisions; conflict exposure and clearance disposition; owner; exact affected paths and occurrences; dependent expressions; code/schema consequences; provenance exceptions; validation. Add a linked transition row for each displaced meaning, stating its current symbol, proposed destination, current occupants of that destination, required further moves, and unresolved decisions. A destination without a completed occupancy check is unassessed, not available by default. Record the combined scope and alternatives for the connected set before approval.

Distinguish a pure rename from a variable transformation. A rename preserves the object. Replacing a half-angle by a full angle, or a speed by a normalized ratio, changes substitution rules and requires derivative, bound, and unit checks. An unresolved physical correspondence remains unresolved after either operation.

Plainly: establish what moves, where it moves, and what stays unchanged before touching a formula. This table holds decisions; the occurrence inventory supplies the complete work list.

### 4.4 Approved transition: absolute time and cycle periods

**Decision, 2026-08-28:** retain $T$ for absolute time; use $P$ for a cycle period, with existing role subscripts and a short qualifier where another $P$ coexists. This is a change of notation, not a change of dynamics, units, numerical values, or claim grade. The source migration and separately authorized app/reading-copy regeneration are complete locally. This does not claim a commit, deployment, or update to installed readers.

**Definition and type:** a period is a scalar duration measured in a declared time coordinate. Its dimensions are time until normalization is declared. Specify whether the cycle returns a signal, a reduced shape, an apparatus record phase, or the complete delayed history. A proposed period does not establish existence or stability of the proposed cycle.

Plainly: $T$ tells us when; $P$ tells us how long one declared cycle takes. We changed the names and their explanations, not the physical claims.

#### Approved spellings and actual collisions

| Previous period use | Current period notation | Scope and preservation rule |
| --- | --- | --- |
| $T(v)$, $T_q$, $T_u$, $T_0$ | $P(v)$, $P_q$, $P_u$, $P_0$ | Moving, branch, and reference clock periods. The $T$ inside $P_q[v(T),a(T)]$ stays absolute time. |
| $T_{\mathrm{ret}}$, $T_{\mathbf k}$ | $P_{\mathrm{ret}}$, $P_{\mathbf k}$ | Complete-history return and winding-indexed cycle periods. Epochs in $[T_0,T_0+P_{\mathrm{ret}}]$ remain $T_0$. |
| $T_N$, $T_{N0}$ | $P_N$, $P_{N0}$ | Local and reference Noether sea cadence periods; frequency relations and ratio direction are unchanged. |
| $T_a$, $T_I,T_M,T_O$, $T_{\mathrm{ref}}$, $T_{\mathrm{int}}$, $T_\star$, $T_{\mathrm{core}}$ | Corresponding $P$ with the same role subscript | Per-binary, declared layer, reference, internal-cycle, selected-cycle, and core periods. A normalization time or interaction duration with a similar old spelling is not renamed. |
| $T_{\parallel}$, $T_{\perp}$, $T_{\circlearrowleft}$ | $P_{\parallel}$, $P_{\perp}$, $P_{\circlearrowleft}$ | Complete round-trip signal cycles; one-way travel times remain durations with their existing definitions. |
| $T_{\mathrm{cycle}}$, $T_{\text{cycle}}$, candidate orbital $t_0$ | $P_{\mathrm{cycle}}$, $P_{\text{cycle}}$, $P_0$ | Preserve the stated cycle and candidate status; do not rename lower-case epochs. |
| Bare period $T$ beside probability, parity, or a permutation $P$ | $P_{\mathrm{cyc}}$ | Master Equation, Angular Momentum and Spin, and the equation-closure packet need this distinction. Path ordering $\mathcal P$ stays unchanged. |
| Pilot-wave period $T_n$ beside probability $P_n$ | $P_{\mathrm{cyc},n}$ | Preserve the existing probability $P_n=\mu_*(B_n)$. |
| Apparatus-cycle $T_{\text{rec}}$ | $P_{\mathrm{rec}}$ | Only the phase-cycle normalization changes; formation time and required persistence duration do not. |
| Candidate-cycle $\tau$; relative-return $\tau$ | $P_{\mathrm{cyc}}$; $P_{\mathrm{rel}}$ | The recurrence and asymmetric counter-breathing representative shape/current sections of the active braid-inference packet. A reflected shape can return after $P_{\mathrm{rel}}$ while its fixed-frame current requires $2P_{\mathrm{rel}}$. |
| Dimensionless $P(\beta_f)$ in rescaled time $s=T/P_0$ | $P_s(\beta_f)=P(c_f\beta_f)/P_0$ | Separate the dimensionless rescaled period from the physical period $P(v)$. This makes the existing normalization explicit. |

Plainly: most replacements change one letter. Extra subscripts are used where the shorter replacement would confuse two quantities already present in the same document.

#### Interfaces and preserved records

The canonical owners are the existing [Mathematics Style Guide](../../../content/markdown/aaa/archie/mathematics-style-guide.md#absolute-time-and-cycle-periods) and [Mathematical Terminology](../../../content/markdown/aaa/archie/mathematics-terminology.md). The new reader explanation lives in the style guide, not in a new glossary. The equation generator's shared $P$ fallback now includes cycle periods without removing its other valid meanings. Local definitions remain preferable to this deliberately broad fallback.

The serialized key `T_N_over_T_N0` still means the current period ratio $P_N/P_{N0}$; the literal emission-row identifier `clock_period_T_u_T0` still means $P_u/P_0$. Their active documentation now states these translations. Established clock-residual labels such as $R_T$ and $C_T$ remain labels, not period variables. No schema version, serialized key, solver variable, saved app draft, fixture number, or historical result was changed. Promoted app maps were inspected and have no matching period formula requiring a separate authored rename; basic pages now consume the refreshed registry.

Frozen evidence, work logs, dated review records, and past campaign results preserve their original notation. When reading a historical cycle period $T$ or $T_{\mathrm{ret}}$ beside current prose, translate it to $P$ or $P_{\mathrm{ret}}$ only after confirming that the recorded quantity is a cycle duration. Do not translate an epoch, emission/reception time, arbitrary scale, record window, persistence duration, temperature, tensor, map, or interaction duration by its letter alone. The original top-50 census and concern labels above remain the pre-transition baseline; they are not current-use counts.

Plainly: saved data keeps working, and historical evidence stays authentic. Current explanations say how those older field names map to the new period notation.

#### Source scope

The source batch touches 28 canonical Markdown documents, 14 active priority documents, and one developer README. The generator fallback, its existing test suite, and this plan are additional authored changes. The following is the exact Markdown scope, separate from other agents' changes in the shared checkout:

- [content/markdown/aaa/archie/mathematics-style-guide.md](../../../content/markdown/aaa/archie/mathematics-style-guide.md)
- [content/markdown/aaa/archie/mathematics-terminology.md](../../../content/markdown/aaa/archie/mathematics-terminology.md)
- [content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md](../../../content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md)
- [content/markdown/aaa/cosmology/cosmology-ontology.md](../../../content/markdown/aaa/cosmology/cosmology-ontology.md)
- [content/markdown/aaa/cosmology/expansion-mechanism.md](../../../content/markdown/aaa/cosmology/expansion-mechanism.md)
- [content/markdown/aaa/dynamics/binary-dynamics.md](../../../content/markdown/aaa/dynamics/binary-dynamics.md)
- [content/markdown/aaa/dynamics/energy.md](../../../content/markdown/aaa/dynamics/energy.md)
- [content/markdown/aaa/dynamics/entropy.md](../../../content/markdown/aaa/dynamics/entropy.md)
- [content/markdown/aaa/dynamics/master-equation.md](../../../content/markdown/aaa/dynamics/master-equation.md)
- [content/markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md](../../../content/markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md)
- [content/markdown/aaa/noether-braid/braid-analysis-methodology.md](../../../content/markdown/aaa/noether-braid/braid-analysis-methodology.md)
- [content/markdown/aaa/noether-braid/braid-envelope-geometry.md](../../../content/markdown/aaa/noether-braid/braid-envelope-geometry.md)
- [content/markdown/aaa/noether-braid/noether-braid-configuration-space.md](../../../content/markdown/aaa/noether-braid/noether-braid-configuration-space.md)
- [content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md](../../../content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md)
- [content/markdown/aaa/philosophy-history/theory-bridges/pilot-wave-character.md](../../../content/markdown/aaa/philosophy-history/theory-bridges/pilot-wave-character.md)
- [content/markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md](../../../content/markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md)
- [content/markdown/aaa/philosophy-history/theory-bridges/special-relativity-noether-braid.md](../../../content/markdown/aaa/philosophy-history/theory-bridges/special-relativity-noether-braid.md)
- [content/markdown/aaa/spacetime/lorentz-kinematics.md](../../../content/markdown/aaa/spacetime/lorentz-kinematics.md)
- [content/markdown/aaa/spacetime/proper-time-and-time-dilation.md](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md)
- [content/markdown/aaa/validation/closure-scorecard.md](../../../content/markdown/aaa/validation/closure-scorecard.md)
- [content/markdown/aaa/validation/failure-criteria.md](../../../content/markdown/aaa/validation/failure-criteria.md)
- [content/markdown/aaa/validation/known-tensions.md](../../../content/markdown/aaa/validation/known-tensions.md)
- [content/markdown/aaa/validation/simulations/a0-branch-certificate-protocol.md](../../../content/markdown/aaa/validation/simulations/a0-branch-certificate-protocol.md)
- [content/markdown/aaa/validation/simulations/a0-tier0-result-interpretation.md](../../../content/markdown/aaa/validation/simulations/a0-tier0-result-interpretation.md)
- [content/markdown/aaa/validation/simulations/action-energy/self-interaction-switch.md](../../../content/markdown/aaa/validation/simulations/action-energy/self-interaction-switch.md)
- [content/markdown/aaa/validation/simulations/action-energy/units-and-constants.md](../../../content/markdown/aaa/validation/simulations/action-energy/units-and-constants.md)
- [content/markdown/aaa/validation/simulations/perspective.md](../../../content/markdown/aaa/validation/simulations/perspective.md)
- [content/markdown/aaa/validation/simulations/redshift-budget-toy-model.md](../../../content/markdown/aaa/validation/simulations/redshift-budget-toy-model.md)
- [reference/priorities/app-simulation/simulations.md](../../../reference/priorities/app-simulation/simulations.md)
- [reference/priorities/braid-program/same-record-energy-ledger-methodology.md](../../../reference/priorities/braid-program/same-record-energy-ledger-methodology.md)
- [reference/priorities/field-speed-ceiling/mathematics-geometry-dynamical-system.md](../../../reference/priorities/field-speed-ceiling/mathematics-geometry-dynamical-system.md)
- [reference/priorities/mapping-benchmarks/cosmological-redshift-distance-ladder.md](../../../reference/priorities/mapping-benchmarks/cosmological-redshift-distance-ladder.md)
- [reference/priorities/mapping-benchmarks/effective-metric-deformation.md](../../../reference/priorities/mapping-benchmarks/effective-metric-deformation.md)
- [reference/priorities/mapping-benchmarks/lorentz-invariance-test-suite.md](../../../reference/priorities/mapping-benchmarks/lorentz-invariance-test-suite.md)
- [reference/priorities/mapping-equations/eq-02-04-lorentz-energy-packet.md](../../../reference/priorities/mapping-equations/eq-02-04-lorentz-energy-packet.md)
- [reference/priorities/mapping-equations/eq-02-04-translating-binary-shared-record-instantiation.md](../../../reference/priorities/mapping-equations/eq-02-04-translating-binary-shared-record-instantiation.md)
- [reference/priorities/mapping-equations/eq-07-10-17-19-effective-metric-cosmology-packet.md](../../../reference/priorities/mapping-equations/eq-07-10-17-19-effective-metric-cosmology-packet.md)
- [reference/priorities/mapping-equations/equation-score-5-closure-ladder.md](../../../reference/priorities/mapping-equations/equation-score-5-closure-ladder.md)
- [reference/priorities/mapping-equations/equation.md](../../../reference/priorities/mapping-equations/equation.md)
- [reference/priorities/mapping-equations/inferring-braid-requirements.md](../../../reference/priorities/mapping-equations/inferring-braid-requirements.md)
- [reference/priorities/master-equation-closure/lorentz-gr-bridge-handoff.md](../../../reference/priorities/master-equation-closure/lorentz-gr-bridge-handoff.md)
- [reference/priorities/master-equation-closure/lorentz-test-residual-handoff.md](../../../reference/priorities/master-equation-closure/lorentz-test-residual-handoff.md)
- [src/prescribed-path-analysis/README.md](../../../src/prescribed-path-analysis/README.md)

#### Validation and publication boundary

- **Measured source identity:** an independent literal Markdown-link comparison against the pre-edit snapshot preserves all 4,598 corpus equation links and their source-file bindings. The scoped display parser finds 98 changed display equations across the canonical and active working documents, with no display added or removed. This is notation/identity evidence, not a physical validity check.
- **Measured rendering:** the math-preview delimiter parser and bundled KaTeX 0.16.11 check 14,776 expressions in the 43 scoped Markdown files after the local-definition follow-up. There are no new parse/render failures. Three unchanged strict-render failures predate the edit: a Unicode prime in `perspective.md` and two unsupported `\dddot` expressions in `mapping-equations/equation.md`. These are retained as separate rendering debt, not silently corrected by this notation batch.
- **Source validation:** `node scripts/validate-content.mjs --check --strict` passes with zero errors and zero warnings. The focused period/definition tests pass. The added regression test protects the original equation IDs, absolute-time arguments inside a period expression, and the distinct path-ordering operator.
- **App suite:** after regeneration the four existing Equation Mapping test files run 97 tests: 96 pass, with only the unrelated iOS snapshot-count assertion failing (4,546 packaged links versus its old 4,543 assertion). The generated registry contains 4,598 equations, 23 promoted pages, and 29,625 symbol records; the count change is two symbol records, not two new equations. The test now also protects precise local definitions for representative cycle-period chips. iOS was not rebuilt or changed.
- **Generated outputs:** 12 files changed: `content/generated/equation-mapping/corpus-equations.json`, `content/graph/textbook_toc.json`, `content/generated/markdown/textbook/toc.md`, and nine reading copies under `content/generated/markdown/textbook/reading-copies/`: `architrino-textbook.md`, `dynamics.md`, `noether-braid.md`, `noether-sea-and-effective-spacetime.md`, `standard-model-assemblies.md`, `cosmology.md`, `validation.md`, `philosophy-history.md`, and `about-architrino.md`. The authorized rebuild also resolved the previously recorded TOC and About-page drift against current sources. All three generator checks pass.
- **Formula and source checks:** all 4,598 registry IDs retain their original source-file and promotion bindings. All 65 changed canonical display formulas appear in the combined reading copy; the other 33 changed displays are in active working documents. No equation links were added. SHA-256 comparison confirms the snapshotted iOS package files are unchanged. No PDF export, commit, push, or deployment occurred.
- **Definition follow-up:** browser inspection exposed broad fallback descriptions for migrated periods. Added 26 explicit local-definition paragraphs in 10 already-scoped source files, then regenerated the registry and reading copies again. All newly introduced period chips in the changed canonical formulas now have detected local definitions. Two distinct non-period symbols still have broad extraction descriptions: the return-map expression $P_{P_{\mathrm{ret}}}^{(\mathbf V)}$ and the unbraced path-ordering token $\mathcal P$. They are not period quantities and were not relabeled as such; their extraction quality remains a separate issue.

Plainly: the local app and textbook copies now agree with the new period notation. The remaining iOS test failure concerns an older packaged snapshot, and no package or historical PDF was changed to make that assertion pass.

**Regeneration executed:** `node scripts/build-scene-graph.mjs --write --strict`, `node scripts/build-equation-mapping-corpus.mjs --write`, and `node scripts/build-textbook-md-pdf.mjs --write`, with their corresponding checks. The equation and reading-copy stages were repeated after the local-definition follow-up. The live local app displays $P(v)=\gamma_\star(v)P_0$ with loaded fonts, no KaTeX errors, and a local cycle-period definition for $P$; its source panel names the current Markdown source. Visual inspection and identity checks establish notation and rendering, not physical correctness.

**Candidate identified after the period batch:** retain $\xi$ for the envelope ratio $R_\parallel/R_\perp$ and consider $\xi_d$ for the half-delay angle. Section 4.5 preserves that unapproved proposal. The planning reset in Section 0 supersedes the former instruction to treat it as the next notation decision.

Plainly: the time/period receipt records the completed local update. Further work returns to planning; the shape/angle collision is evidence for that planning, not permission to begin another migration.

**Falsifiers:** an inventoried active period still spelled with the old time symbol without a documented exception; a changed equation ID or numeric value; a probability or absolute-time variable renamed as a period; a new KaTeX failure; or a served app formula/definition that disagrees with its current source. Reopen the relevant transition row when any of these checks fails.

### 4.5 Expanded xi assessment — candidate plan, not migration approval

**Current result:** retain the existing shape reservation as the starting choice, assess every displaced meaning, and compare destinations before selecting one. The display census supplies 13 competing roles; active working documents add further roles. This section gives them candidate dispositions and names the remaining checks. No spelling below is newly approved, and the complete active occurrence manifest is not yet adjudicated.

#### 4.5.1 Coverage and a confirmed destination conflict

**Measured, 2026-08-28:** the registry hash in Section 3.1.1 is unchanged. A separate literal scan examined 2,887 text/JSON files under `content/markdown/aaa`, `reference`, `src`, `scripts`, and `tests`, excluding this plan and respecting repository ignore rules. It found 1,157 raw xi tokens on 748 lines in 103 files. These counts include active prose, repeated formulas, compatibility material, and historical records; they are not equation counts or required edits. Binary assets, ignored local records, generated reading copies, and iOS packaging are outside these source counts.

The search uses `\\xi(?![A-Za-z])` in PCRE2 plus Unicode ξ. A word-boundary search misses immediately subscripted xi because underscore counts as a word character. The destination probe additionally normalizes TeX whitespace, braces, upright/bold wrappers, and escaped backslashes; possible scalar/vector overlap is reported conservatively. Non-TeX identifiers, alternate subscript orderings, and semantic equivalence still need separate review. Local review artifacts are `xi-source-occurrences.json` and `xi-destination-scan.json`; findings and decisions belong in this plan.

Plainly: include subscripts when searching. The larger source count identifies places to inspect, not files to replace indiscriminately.

**Known occupant:** [asymmetric counter-breathing representative Cubic Lattice](../mapping-electromagnetism/f6c-cubic-lattice.md#translation-symmetry-decomposition) already defines $\boldsymbol\xi_{\mathrm d}=(\boldsymbol\xi_+-\boldsymbol\xi_-)/2$ as the polarity-differential displacement. Four lines in one file use that form. It is a length-valued vector amplitude, not a delay angle. Scalar $\xi_d$ is therefore not an empty family: it requires an approved type/scope distinction or an additional move.

No normalized prefix matches were found in this source scope for the role-qualified candidates below: $\theta_{\mathrm d}$, $\theta_{\mathrm{loc}}$, $\xi_{\mathrm{ax}}$, $\xi_{\mathrm{int}}$, $\xi_{\mathrm{var}}$, $\xi_{\mathrm{sym}}$, $\xi_R$, $\xi_{\mathrm{test}}$, $\xi_{\mathrm{wr}}$, $\xi_{\mathrm{lat}}$, $\xi_{\mathrm{cap}}$, $\xi_{\mathrm{cfg}}$, $\xi_{\mathrm{phase}}$, $\xi_{\mathrm{pert}}$, $\xi_{\mathrm{WL}}$, $\xi_{\mathrm{mu}}$, $\xi_H$, $\xi_{\mathrm{gw}}$, or $T_{\mathrm{jump}}$. This is initial spelling evidence, not complete semantic clearance of indexed forms, aliases, interfaces, or uses outside the scan.

Plainly: theta is now a concrete alternative for the angle because it avoids a demonstrated xi-d occupant. It has passed an initial search, not the full approval test.

#### 4.5.2 Proposed dispositions for every display-inventory role

Counts are distinct registry displays in the recorded snapshot. The candidate qualifiers below predate the accepted convention rule in Section 0.4 and must now be reassessed: conventional uses may remain in their fields; nonconventional competing uses may move to short checked alternatives. These are not approved renames or reasons to preserve an arbitrary old letter by adding a long qualifier. Conventional status is not established by this table's source counts. Concept names and claim grades stay unchanged.

| Present meaning | Displays | Importance and proposed disposition | Conflict / clearance |
| --- | ---: | --- | --- |
| Envelope shape and dependent readouts | 72 | Central dimensionless geometry: retain $\xi=R_\parallel/R_\perp$ and legitimate shape indices. Not a clock identity by definition. | Incoming reservation; all competing rows need disposition. Reference normalization is a separate mathematical question. |
| Circular delay and branch angles | 55 | Causal-root geometry: compare full half-delay $\theta_{\mathrm d}$ and local partner-chart coordinate $\theta_{\mathrm{loc}}$. Preserve root/partner indices. | No initial destination matches. Full/local and rotation-sign conventions remain open; xi-d has a lattice occupant. |
| Ordered axial positions | 9 | Essential length coordinates: candidate $\xi_{\mathrm{ax},m}$, including corresponding pair-indexed forms. Compare shorter $z_m$. | Xi-ax has no initial matches. Exact $z_m$ has none, but indexed $z_1$ occurs in frozen evidence/reviews and bare $z$ is widely used; the whole z family is not cleared. |
| Internal orbit displacement | 3 | Length vector relative to a translating center: candidate $\boldsymbol\xi_{\mathrm{int},a}^{(u)}$, including derivatives and return relations. | No initial qualifier matches. Not interchangeable with a generator, phase row, or reduced-coordinate record. |
| Path variation / symmetry generator | 4 | Variational and conditional Noether scaffolding: candidates $\boldsymbol\xi_{\mathrm{var},i}$ and $\boldsymbol\xi_{\mathrm{sym},i}$, respectively. | No initial qualifier matches. Move matching $Q$, $B$, and variation labels together; preserve action/endpoint assumptions. |
| Scalar-curvature coupling | 3 | Effective comparison/recovery parameter: candidate working symbol $\xi_R$; source $\xi$ only under an approved comparison mapping. | No initial matches. Include the inline target in Theory Mapping, absent from this display count. |
| Whitehead preferred-location parameter | 2 | Important observer constraint: retain existing $\xi_W$ and its stated distinction from shape. | Already qualified; explicitly approve its scope rather than silently exempting it. |
| Neutrino-sector asymmetry | 1 | BBN recovery input: retain $\xi_{\nu_e}^{\theta}$ with its declared asymmetry meaning. | Already qualified. Do not supply an unestablished chemical-potential definition. Include its active BBN packet. |
| Effective horizon vector | 2 | Effective energy-flux comparison: candidate $\xi_H^\mu$ in working formulas. | No initial matches. Generator identity, units, and normalization need definition before one shared symbol is approved. |
| Direct-transport suppression | 3 in the pre-change census | Dimensionless factor in a postulated mixing construction: now written as existing $e^{-\sigma}$ directly, removing the alias. **Complete:** source, outputs, and app visual acceptance in Section 4.6. | Existing $\sigma$ already means the stated penalty in this section. Assumptions and numbers preserved; no new destination quantity or displaced use. |
| Causal-writhe row components | 1 | Lifted retained-row record: candidate $\xi_{\mathrm{wr},r,H}$ and corresponding M/L entries. | No initial matches. Component meanings/units remain insufficiently explicit; define before deciding. This does not establish spinor support. |
| Sampled jump reception times | 2 | Validation sample times: candidates $T_{\mathrm{jump},a}$ and $T_{\mathrm{jump},\pi(a)}$. | No initial matches. Preserve matching direction, denominator, and root identity. These are not transmitter times. |
| Bound complex scalar multiplier | 2 | Dummy defining a complex line: prefer the complex span of the analyzer direction, eliminating xi. | No new named destination. Verify set/span equality and component notation in both sources before approval. |
| Arbitrary test vector | 1 | Nonzero vector for positive definiteness: candidate components $\xi_{\mathrm{test}}^i$ and matching nonzero condition. | No initial matches. Compare a shorter checked dummy; preserve dimension and positivity. |

Plainly: the other quantities are not disposable. Some are essential geometry or validation variables; others belong to comparison models or unproved constructions. All 88 non-shape displays are represented, but an initial candidate is not a cleared migration.

#### 4.5.3 Additional active uses and displaced-use dependencies

| Use beyond the display inventory | Owner / meaning | Candidate disposition and conflict |
| --- | --- | --- |
| Lattice amplitudes | [asymmetric counter-breathing representative Cubic Lattice](../mapping-electromagnetism/f6c-cubic-lattice.md): $\boldsymbol\xi_\pm,\boldsymbol\xi_{\mathrm c},\boldsymbol\xi_{\mathrm d}$. | Compare explicitly retaining the displacement family with qualifying it as $\boldsymbol\xi_{\mathrm{lat},\pm/\mathrm c/\mathrm d}$. Xi-lat has no initial matches. Do not evict this use automatically to accommodate the angle. |
| Five length coordinates | [Initialization Ledger](../braid-program/three-binary-five-coordinate-initialization-ledger.md), [bounded comparison](../braid-program/three-binary-five-coordinate-bounded-eom-comparison.md), [Configuration Chart](../braid-program/configuration-chart.md): $\xi_h,\xi_\rho,\xi_\tau,\xi_c,\xi_s$. | Candidate xi-cfg family, or a checked existing reduced-coordinate family. Xi-cfg has no initial matches. Tangential $\xi_\tau$ is length, not angle. Code uses `q`, `qDot` and descriptive coordinate names; preserve that mapping. |
| Lifted phase offsets | [Inferring Braid Requirements](../mapping-equations/inferring-braid-requirements.md): redundant $\boldsymbol\phi=\boldsymbol\phi^{A2}+\vartheta\mathbf1+\boldsymbol\xi$. | Candidate $\boldsymbol\xi_{\mathrm{phase}}$, with no initial matches. Existing $\boldsymbol\delta\phi$ is the zero-sum row after gauge fixing; substituting it before gauge fixing changes the domain. |
| Captured body-frame orbit | [asymmetric counter-breathing representative Geometry](../braid-program/f6c-geometry.md#how-six-captured-orbits-could-enter-a-face-calculation): $\boldsymbol\xi_e$ in orbital area rate. | Candidate $\boldsymbol\xi_{\mathrm{cap},e}$, with no initial matches. Check origin/frame against internal displacement before deciding whether they should share a family. |
| Sensitivity parameter | [Receiver Wake Gradient Closure](../master-equation-closure/receiver-wake-gradient-closure.md): arbitrary fixed-time parameter in $\partial_\xi$ and dependent root/direction/Jacobian derivatives. | Candidate $\xi_{\mathrm{pert}}$ throughout the chain; no initial matches. Units depend on the chosen perturbation, not on the new name. |
| Weak-lensing correlations | [Cosmology Priorities](../dormant-deferred/mapping-cosmology/priorities.md): $\boldsymbol\xi_\pm$ in the lensing/RSD residual. | Explicit comparison mapping, or $\boldsymbol\xi_{\mathrm{WL},\pm}$ in mixed formulas; update uncertainty labels too. Xi-WL has no initial matches. Unqualified vector forms overlap lattice amplitudes. |
| Muon-decay parameter | [Weak Flavor Event Ledger](../mapping-standard-model/weak-flavor-event-ledger-benchmark-packet.md): $\xi$ in the stated muon-spectrum benchmark. | Explicit comparison mapping, or $\xi_{\mathrm{mu}}$ in mixed working formulas; no initial qualifier matches. Keep observational-constraint status, not a native premise. |
| Wave-energy flux vector | [Gravitational Waves](../mapping-benchmarks/gravitational-waves.md): $\xi^\beta$ in a boundary flux. | Candidate $\xi_{\mathrm{gw}}^\beta$, with no initial matches. Identify time-flow and normalization; do not assume it is the horizon vector. |
| More axial consumers | [Braid Taxonomy](../../../content/markdown/aaa/noether-braid/braid-taxonomy.md), [Coincident-Axis Three-Binary and Two-Component Circular Analytics](../braid-program/coincident-axis-and-two-component-circular-analytics.md), [Coincident-Axis Outward Protocol](../braid-program/coincident-axis-and-two-component-circular-search-protocol.md). | Follow the same axial mapping, including $\xi_{a,\pm}=b_a\pm h_a$. Preserve `axialCoordinate` and frozen numerical records. |
| More jump-time consumers | [Simulation Procedures](../app-simulation/simulations.md). | Same jump-time mapping. Existing differences in the time-map spelling and denominator need separate reconciliation, not a silent correction. |
| Further shape consumers | Inline geometry, sea/clock, compact-star, strong-field, and equation-working packets identified by the raw scan. | Retain actual shape ratios and their derivatives/uncertainty labels/readouts. Complete occurrence dispositions; file topic alone does not classify every xi. |

Plainly: app-equation is not the full boundary. Active calculations contain other xi uses, including places where a seemingly simple substitution would change units or erase a gauge condition. Those dependencies belong in the same assessment.

#### 4.5.4 Connected alternatives and representative formulas

| Alternative | Connected consequences | Assessment |
| --- | --- | --- |
| Keep shape $\xi$; use $\theta_{\mathrm d}$ / $\theta_{\mathrm{loc}}$ for angles | Preserve the canonical shape letter and distinguish two angle coordinates. No need to displace lattice xi-d solely for the angle; other xi roles still require disposition. | Candidate to reassess after verifying field conventions. Initial search clear; full family/domain checks incomplete. |
| Keep shape $\xi$; use $\xi_d$ plus a distinct local-angle form | Same core angle meanings, plus overlap with lattice $\boldsymbol\xi_{\mathrm d}$. | Verify conventions first. Font alone neither establishes conventional status nor proves an actual conflict. |
| Reserve the entire lowercase-xi family for shape | Would move even qualified and conventional uses to non-xi forms. | Not selected: a blanket exclusion of established field conventions conflicts with the accepted Section 0.4 rule. |
| Move shape itself | Preserve some existing angle notation but move 72 shape-related displays and many guide/app/code/inline consumers. | Compare if total clearance is more disruptive. No replacement shape symbol selected or cleared. |

Plainly: a short name in one equation can create a longer chain elsewhere. Theta avoids one demonstrated collision, but the whole proposal remains open.

On the positive-cadence self-root chart, a representative pure rename would be

$$
\xi=\frac{\omega\Delta}{2},\quad |\sin\xi|=\frac{\xi}{\beta_{a,n}}
\quad\longmapsto\quad
\theta_{\mathrm d}=\frac{\omega\Delta}{2},\quad |\sin\theta_{\mathrm d}|=\frac{\theta_{\mathrm d}}{\beta_{a,n}}.
$$

Plainly: only the name changes. The half-angle, absolute value, and existing speed ratio remain. Sources using $|\omega|$ need their orientation convention checked explicitly.

The general partner chart in [Binary Dynamics](../../../content/markdown/aaa/dynamics/binary-dynamics.md#parameter-free-circular-branch-packet) instead gives the local-coordinate rename

$$
2\pi m+2\sigma\xi=2s\cos\xi
\quad\longmapsto\quad
2\pi m+2\sigma\theta_{\mathrm{loc}}=2s\cos\theta_{\mathrm{loc}}.
$$

Plainly: this angle locates a point within a branch; the full delay includes winding. Dividing by two gives $\pi m+\sigma\theta_{\mathrm{loc}}=s\cos\theta_{\mathrm{loc}}$, but identifying the left side as full positive half-delay requires the branch domain and orientation. Do not equate the two angle coordinates globally.

#### 4.5.5 Source manifest and completion requirements

The non-shape display manifest has 16 canonical files:

- Angles and variations: [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md), [Binary Dynamics](../../../content/markdown/aaa/dynamics/binary-dynamics.md), [Effective Lagrangian](../../../content/markdown/aaa/dynamics/effective-lagrangian.md).
- Axial coordinates: [Braid Analysis Methodology](../../../content/markdown/aaa/noether-braid/braid-analysis-methodology.md), [two-component circular configurations](../../../content/markdown/aaa/noether-braid/3d-braid-assemblies.md).
- Comparisons and test objects: [Klein–Gordon Scalar Fields](../../../content/markdown/aaa/philosophy-history/theory-bridges/klein-gordon-scalar-fields.md), [PPN Parameters](../../../content/markdown/aaa/spacetime/ppn-parameters.md), [BBN Constraints](../../../content/markdown/aaa/cosmology/BBN-constraints.md), [Emergent Metric](../../../content/markdown/aaa/spacetime/emergent-metric.md), [Thermodynamic Residual](../../../content/markdown/aaa/validation/simulations/thermodynamic-residual.md), [Absolute Time Defense](../../../content/markdown/aaa/foundations/absolute-time-defense.md).
- Suppression, writhe, and spans: [Weak Mixing](../../../content/markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md), [Angular Momentum and Spin](../../../content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md), [Electroweak Bosons](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md).
- Jump times: [Convergence Tests](../../../content/markdown/aaa/validation/simulations/convergence-tests.md), [Well-Posedness and Regularization](../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md).

Plainly: these are measured source locations, not the final write list. Add active/inline consumers, including [Theory Mapping](../../../content/markdown/aaa/philosophy-history/theory-mapping.md), and explicitly identify any comparisons that will remain.

Before requesting a notation decision or implementation permission:

1. When the deferred xi assessment resumes, apply the accepted Section 0.4 convention rule: establish the relevant field, actual meaning, evidence of convention, and retain/move/unresolved disposition for each competing use. Settle presentation where legitimate meanings meet, including standalone app pages. Complete the xi-connected conflict map and its displacement destinations before a xi migration; unrelated families are not prerequisites.
2. Adjudicate all 103 raw-matching files path by path and expand to non-TeX identifiers/direct consumers. Distinguish current guidance from frozen evidence; dates and directory names alone do not establish immutability. Preserve Greek-letter teaching assets as alphabet content.
3. Resolve full/local angle domains and rotation sign, horizon/wave-flux generator normalization, causal-writhe component definitions, and pre/post-gauge phase coordinates. Separate mathematical questions from notation. In particular, $V(v)/V(0)=\lambda^3(v)\xi(v)$ assumes $\xi(0)=1$; the general geometry includes division by $\xi(0)$. Do not repair that normalization during a rename.
4. Check every full destination family, including reordered/multiple subscripts, root indices, stars, derivatives, vectors, Unicode, aliases, and interfaces. Record further displacements or approved coexistence. An exact-spelling zero is insufficient.
5. Finalize occurrence dispositions and before/after examples for every role. Aggregate distinct files/displays without double counting. Include the separate $\eta$ self-angle in the active [all-root certificate](../field-speed-ceiling/circular-binary-all-root-certificate.md): consistency is by concept, not only by the old xi spelling. Cover the [outer-super-field circular-layer frequency-step action ledger](../braid-program/coincident-midpoint-common-frequency-step-action-ledger.md), [Geometry and Dynamical System](../field-speed-ceiling/mathematics-geometry-dynamical-system.md), and [Point-Cloud and Wake Energy Audit](../master-equation-closure/point-cloud-and-wake-energy-audit.md).
6. Plan exact local definitions for app-equation. The earlier angle snapshot has 63 xi-bearing symbol entries in 55 displays: 30 shared fallbacks and 33 heuristic source-context descriptions. Neither category certifies meaning. Check full/local angles, every displaced role, retained shape, and comparison mappings; change extraction only for a demonstrated gap in an authorized batch.
7. Preserve actual shape consumers in `EquationMappingData.js`, `IdealBraidRuntime.js`, retained-record analyzers, and hydrogen response fields. Keep descriptive `axialCoordinate`, `q`/`qDot` and stable machine keys unless separately approved. The all-root mpmath oracle validates a literal `root_equation` containing xi: preserve that compatibility/provenance contract and document its current translation. Do not change an independent oracle and its subject together to make their outputs agree.
8. Approve the complete connected proposal, then its exact source batch and separate generated-output scope. Preserve equation IDs and mathematical values for pure renames. Use existing source/tests and the generation/check order in Section 5.3; inspect app formulas, chips, search, and reading copies. Historical PDFs, iOS packaging, and deployment remain excluded unless explicitly authorized.

Plainly: the reservation policy is settled; the next work is checking which uses satisfy it. This section supplies destination evidence and candidate dispositions, but conventional status and complete clearance remain to be established. No migration is authorized.

### 4.6 Independent cleanup: redundant suppression alias

**Historical receipt:** the authorization and narrow-route exception below record the conditions when this cleanup was performed. The later decision-only review in Section 0 now governs the sequencing of future work; the historical whole-map condition is not a current prerequisite.

**Complete — operator authorization, 2026-08-28:** after the scoped proposal to remove the local suppression alias and refresh affected web copies, the operator requested: “Closure goal: finish one fully checked, independent notation cleanup.” This authorized the stated [Weak Mixing](../../../content/markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md) source/output batch. The operator then answered yes to extending scope to fix the app's shared equation-fitting code. Source transition, generated copies, regression checks, and final app visual acceptance are complete. No further notation family was changed.

**Approved narrow route:** this independent cleanup precedes completion of the whole approved-family conflict map because its own affected-use and destination assessment is complete. Expanding an existing definition introduces no new symbol reservation and requires no further displacement. This relaxes the whole-map prerequisite in Section 0.4 for this approved batch only; the broader inventory remains open. It does not permit a partially understood rename chain.

Plainly: we removed an unnecessary extra name without choosing a new letter or moving another concept. The app now fits the complete equations on screen.

The pre-change chapter explicitly defined $\xi\equiv e^{-\sigma}$ for its direct-transport suppression factor. The chapter now uses the already defined expression $e^{-\sigma}$ throughout this local construction, keeping the concept name and its postulated status. This is expansion of a stated definition, not a claim that xi is never conventional elsewhere in physics.

| Item | Implemented treatment |
| --- | --- |
| Definition | Name $e^{-\sigma}$ directly as the Direct-Transport Suppression Factor; keep its stated range. |
| Three displayed equations | Replace this alias in the amplitude relation, phase relation, and rounded numerical summary. Keep all other terms, numerical values, and equation links. |
| Four prose mentions | Update the definition paragraph, matrix-structure summary, CP-phase summary, and proof target to use the same expression. |
| Existing sigma | Retain the already defined extra transport penalty. Do not change the separately qualified uncertainty symbols elsewhere in the chapter. |
| Destination conflict | No new letter, subscript family, or independent quantity is introduced. The destination is the expression already declared equal to this alias in the same construction. |
| Other xi meanings | Preserve shape, delay angles, vectors, comparisons, and all unrelated uses. |

Plainly: sigma remains the transport penalty, and the exponential of minus sigma remains its suppression factor. Removing the extra xi name changes neither the calculation nor the physical assumptions.

**Measured pre-change source scope, 2026-08-28:** the chapter contained eight raw xi tokens on eight lines: four tokens across three display equations and four inline/prose occurrences. All eight have been removed. The preserved display IDs are `corpus-equation-58898312379d9609`, `corpus-equation-ccc19aa7c2baec0f`, and `corpus-equation-abbd720bd46fe80f`. Searches for the named suppression concept and holonomy-closure references found two other canonical prose consumers, [Constraint Ledger](../../../content/markdown/aaa/validation/constraint-ledger.md) and [Quantum Number Mapping](../../../content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md); neither uses xi or requires a notation change for this alias. The scoped source/code searches found no corresponding active implementation occurrence; this does not claim absence from every possible historical artifact. The earlier top-50 and xi-family counts remain explicitly historical census inputs, not post-change counts.

#### 4.6.1 Source and output receipt

1. Captured the pre-edit source, registry, and hashes of 259 canonical/output/graph/iOS files. The pre-edit registry SHA-256 is `e043c8849ce1002910f1335fc978a130ebf03008b17133123649df73c23d116a`.
2. Expanded the local alias in the three displays and four prose locations. Retained the range, all numerical tokens, the physical assumptions, and all 55 equation IDs in the chapter. Compared the edited formulas with literal substitution into the frozen pre-edit formulas, removing the redundant defining self-equality. This independent substitution check does not use the corpus generator as its oracle.
3. Extended [the existing corpus test](../../../tests/equation-mapping-corpus.test.js) with literal expected formulas, preserved IDs, and the exact local suppression definition. Updated the existing aggregate symbol count from 29,625 to 29,624 because expansion removes one duplicate alias chip. No generator implementation changed; the later authorized app fitting correction is recorded below.
4. Ran `node scripts/build-equation-mapping-corpus.mjs --write` and `node scripts/build-textbook-md-pdf.mjs --write`. Only the registry and two reading copies changed: [complete textbook](../../../content/generated/markdown/textbook/reading-copies/architrino-textbook.md) and [philosophy/history](../../../content/generated/markdown/textbook/reading-copies/philosophy-history.md). Neither generator inserted new equation links.
5. Compared the complete registry against the frozen baseline: all 4,598 IDs and source/promoted bindings are preserved; exactly three formulas differ. Four records differ overall, all within this chapter: the three formula records plus the preceding context record `corpus-equation-e779845e1f2a805d`. Every other registry record is unchanged. Each revised formula has the correct source-derived suppression-factor description; shared xi fallbacks are unchanged.
6. Verified all three revised formulas in both affected reading copies. The hash comparison found exactly four changed files among the 259 captured files: the canonical chapter and the three generated files. All 39 iOS package files are byte-identical. Historical PDFs, commits, deployment, and other xi meanings were not changed.

Plainly: the change has reached the intended source and web copies, without changing the underlying calculation or moving any other symbol. Tests establish notation and identity preservation; they do not prove the physical construction.

**Checks passed:** `node scripts/validate-content.mjs --check --strict`, `node scripts/build-scene-graph.mjs --check --strict`, `node scripts/build-equation-mapping-corpus.mjs --check`, `node scripts/build-textbook-md-pdf.mjs --check`, and `git diff --check`. Source validation reported zero errors and warnings; its 30 informational notes remain outside this cleanup. The final scoped run passed 98 tests with zero failures, including the added fitting regression (the source-only run had 97):

```bash
node --test --test-skip-pattern='shipped in the iOS package' tests/equation-mapping-corpus.test.js tests/equation-mapping-runtime.test.js tests/equation-mapping-sidebar.test.js tests/equation-mapping-symbol-tooltip.test.js
```

Plainly: the web/app checks pass. The iOS-package-specific test was explicitly excluded because packaging is outside the approved batch; this is not a claim that the complete iOS suite passes.

#### 4.6.2 Shared fitting correction and completed browser acceptance

**Initial browser finding:** all three app routes loaded the revised formulas with fonts loaded and zero KaTeX error elements. Their suppression-factor entries carried the correct local meaning, and searching for `e^{-\sigma}` returned all three revised equations and the adjacent context record. The phase equation was legible, but the amplitude relation and numerical summary clipped horizontally at the inspected 1280-by-720 viewport. The numerical summary also clipped at the app's small equation size. This prevented the initial source/output completion from being treated as full acceptance.

**Diagnosed cause and authorized correction:** [EquationMappingRuntime.js](../../../src/apps/equation-mapping/EquationMappingRuntime.js) preferred the centered container's `scrollWidth` over the full measured width of its formula parts. Content extending before the scroll origin was omitted. The live failing amplitude equation had a 1475.74-pixel formula part in a 980-pixel container, but its container `scrollWidth` was only 1228 pixels. The shared implementation now measures complete formula parts per explicit row, includes fixed horizontal padding separately from scalable glyphs, selects a size that fits every row, and rounds fitted sizes down so rounding cannot exceed the measured allowance. No equation-specific CSS or formula rewrites were introduced.

Plainly: centering hid part of the equation from the old width measurement. The corrected measurement includes both ends and keeps the existing spacing and intentional line breaks.

**Independent regression:** the new case in [the existing runtime test](../../../tests/equation-mapping-runtime.test.js) uses a hand-calculated 1808-pixel centered row in a 908-pixel container, with eight pixels of fixed padding. Its 1800 pixels of glyphs must halve to 900 pixels, giving a 30-pixel font from a 60-pixel base. The test failed before the fix (40.1178 pixels) and passes afterward. Existing tests still cover shrink-before-wrap behavior and explicit solve rows; the fitting test also checks fixed padding at the minimum size and downward rounding. This checks layout arithmetic, not physics.

**Final measured browser acceptance:** all three revised equations were inspected in app-equation at small, medium, and large settings at 1280 by 720. Every measured case has loaded fonts, zero KaTeX error elements, and zero left/right formula-part overflow. The amplitude equation also passes with the sidebar collapsed. Screenshots of the amplitude, phase, and numerical formulas were visually inspected; superscripts, subscripts, fraction, range, and numerical values are legible. Medium sizing and the open sidebar were restored. The suppression-factor source definition remains correct after the runtime fix.

The math-preview skill rendered a source-preserving section snapshot and an exact three-formula excerpt in the purple/white theme. The excerpt has three display equations, loaded fonts, zero KaTeX errors, and a visually inspected PNG with all three equations visible. Local snapshots are presentation evidence only and do not substitute for app acceptance. They are stored with the baseline and comparison receipts under the task's local `notation-cleanup` artifact directory; they are not publication outputs.

**Closure:** this independent notation cleanup is complete within the approved source, web-output, and app-layout scope. The final app measurements are stored as `app-fit-final.json`, with `app-amplitude-fixed.png` and `app-numeric-fixed.png` in the task's local `notation-cleanup` artifact directory. The source/output baseline receipt remains intact. No additional generation was needed for the runtime-only fix; corresponding generator checks remain clean. iOS packaging, historical PDFs, commits, and deployment remain excluded. The broader conflict map and subsequent notation decisions remain planning work, not implicitly approved implementation.

Plainly: this one cleanup is finished, including the actual app display. Other notation choices remain open and untouched.

### 4.7 Approved terminology: group velocity and group speed

**Source implementation, 2026-08-28:** the operator approved global implementation of the assembly-motion terminology. The scoped edit set contains 68 source files: 38 corpus documents, 25 active guidance/planning documents, four app source files, and one existing test file. The operator subsequently approved regeneration; the source-and-output terminology transition is complete within the stated scope.

| Previous wording and meaning | Current wording | Preserved boundary |
| --- | --- | --- |
| Assembly drift, translation velocity, translational velocity, or bulk velocity denoting translation of the complete assembly | Group velocity | Direction, declared center, reference frame, averaging, and constant-motion assumptions remain explicit. |
| Translation speed, drift speed, or center-of-mass speed denoting the magnitude of that motion | Group speed | Scalar magnitude, dimensionless ratios, and the stated center-of-mass convention remain distinct. |
| Axial motion in a translating helical construction | Axial group-velocity component | The signed component is not relabeled as a nonnegative speed. |
| Sea flow/drift, phase drift, numerical or statistical drift, and conventional wave-packet group velocity | Retain the established meaning | These are not interchangeable with whole-assembly group velocity. Equality with wave-packet group velocity remains a recovery question where applicable. |
| Historical evidence, frozen predeclarations, literal code/schema identifiers, and recorded formula subscripts | Retain recorded spelling | No API, provenance, or mathematical-symbol migration is included. |

Plainly: one assembly motion now has one name. The change preserves what moves, how it is measured, and the conditions under which each statement holds. It does not assign an assembly velocity to an individual orbit or rename unrelated uses of drift.

**Consumer changes:** canonical wording is owned by [Terminology Usage](../../../content/markdown/aaa/archie/terminology-usage.md#site-and-group-velocity-usage), with matching entries in the mathematical guides and comparative glossary. Active dynamics, assembly, spacetime, reaction, validation, and theory-bridge explanations and working plans follow that wording. App-equation uses `Group velocity through sea` and `group speed`; Braid Search uses `Group speed`; the scene motion controls use `Scene Group Velocity X/Y`. Existing keys, bindings, equations, and numerical values are unchanged.

**Measured preservation checks:** a temporary comparison script checked all 199 corpus Markdown files against the pre-change formulas: all 4,598 display equations and their equation-link text are unchanged. It also compared all TeX spans in 63 edited Markdown sources against captured originals, and compared formulas, formula parts, anchor IDs, overlay IDs, targets, and math blocks for all 23 curated equation maps. The completed Section 4.4 and 4.6 receipts remain unchanged. The instrument and manifest are local verification artifacts under `/tmp/aaa-group-velocity-20260828/`; they are not a new maintained inventory. A changed formula, identity, or retained condition would invalidate this preservation claim; it can be checked directly in the source diff.

Plainly: the checks establish a wording change with preserved mathematical content. They do not prove the physics or settle the unresolved choice of symbols for internal motion.

**Source-stage validation:** strict content validation passed with zero errors, zero warnings, and 30 existing informational notes. Scene-graph freshness and all 23 registered equation links passed. The scoped app/test batch passed 92 of 93 tests. Its sole failure was the existing `Braid Search is exposed through the public standalone launch inventory` assertion: the applications list lacked `braid_search`. At that checkpoint, the failing test, launch runtime, and applications list were unchanged from `HEAD`; this failure was outside the terminology edit. The app-equation browser DOM contained the new caption and magnitude explanation with loaded fonts and zero KaTeX errors. Generated symbol descriptions were not claimed current before regeneration.

**Authorized publication checkpoint completed, 2026-08-28:** reran the three generators below against the live sources, then passed all corresponding freshness checks. The registry, eleven textbook reading copies, and startup-guidance index changed. All thirteen reading copies are now current. The extra copy beyond the earlier ten-copy estimate was cosmology; its only change carries the approved `drift inward` to `move inward` source edit. The guidance index reflects its current source files, including already-existing reference-policy guidance; no guidance policy was authored in this regeneration step.

```bash
node scripts/build-equation-mapping-corpus.mjs --write
node scripts/build-textbook-md-pdf.mjs --write
node scripts/build-agent-startup-orientation.mjs --write
node scripts/build-equation-mapping-corpus.mjs --check
node scripts/build-textbook-md-pdf.mjs --check
node scripts/build-agent-startup-orientation.mjs --check
```

Plainly: the approved wording now reaches the equation registry and textbook reading copies, and the generated guidance index matches its sources. Regeneration does not change the calculations or approve another notation decision.

**Publication preservation and checks:** a frozen pre-write registry and SHA-256 snapshot of 961 files were compared with the rebuilt files. All 4,598 equation formulas, IDs, semantic IDs, source paths, promotion bindings, and symbol IDs/TeX are unchanged; the count remains 23 promoted equations and 29,624 symbol definitions. The generator added zero source links. Changes affect 282 records through headings, source context/line locations, search text, or descriptions, including 128 records with changed symbol-description data. Every TeX span in all eleven changed reading copies matches the pre-write copy. All 199 corpus sources, 52 inspected iOS files, and 18 inspected PDFs remain byte-identical to the pre-write snapshot. Local comparison artifacts are under `/tmp/aaa-notation-publication-4UvOtG/`.

Plainly: this comparison independently checks preservation against the files before regeneration. Freshness checks establish that outputs match current generators, while the frozen-file comparison checks that the rebuild preserved formulas and excluded artifacts; neither is a physics proof.

**Final publication validation:** all three generator checks, strict content validation, strict scene-graph validation, the 23-link equation validator, and `git diff --check` passed. Content validation again reported zero errors, zero warnings, and 30 informational notes. The selected equation corpus, runtime, sidebar, and tooltip suite passed 98 tests with zero failures. The iOS-package-specific test was excluded explicitly, as in the earlier web-output cleanup; this is not a claim about the complete iOS or dashboard suite.

```bash
node --test --test-skip-pattern='shipped in the iOS package' tests/equation-mapping-corpus.test.js tests/equation-mapping-runtime.test.js tests/equation-mapping-sidebar.test.js tests/equation-mapping-symbol-tooltip.test.js
```

Plainly: this terminology batch is complete for active sources, app captions, and the authorized generated publication surfaces. iOS packaging, historical PDFs, deployment, commits, and any further symbol migration remain outside this batch. The next notation step is the complete group-speed/internal-motion conflict assessment described in Section 0, with no symbol changes until its proposal is approved.

### 4.8 Group speed and internal motion — assessment before symbol selection

**Status, 2026-08-28: assessment only.** This section changes the plan, not canonical notation, equations, app behavior, or generated publications. The terminology batch in Section 4.7 remains complete. The present assessment identifies connected meanings and displacement obligations; it does **not** certify a global rename as ready. The definition boundaries below must be settled before a transition table can assign destinations to all affected uses.

**Finding:** the important conflict is not simply two names for velocity. The same scalar and ratio are being used for different moving objects, different reference centers, and sometimes different averaging operations. Most group-speed formulas can remain as they are. The difficult cases are the constituent meanings occupying the group-speed notation, and destinations that already have another speed meaning.

Plainly: we do not need a new alphabet. We need to identify whose motion a symbol measures, and avoid moving a confusing definition into another occupied symbol.

#### 4.8.1 The quantities that must remain distinct

| Quantity | Existing notation and defining context | Units and scope | Assessment |
| --- | --- | --- | --- |
| Whole-assembly group speed | $v$ and $\beta_f=v/c_f$ in the guides; $u$ in several translating-binary calculations | Speed, or dimensionless ratio; declared center, frame, and averaging convention | Retain the approved role. Aliases u and qualified translation forms are a separate consistency question, not evidence that the motion is internal. |
| Total native constituent speed | $\|\mathbf V_i(T)\|$, with $\mathbf V_i=d\mathbf X_i/dT$; $\beta_i=\|\mathbf V_i\|/c_f$ in the simulation units guide | Speed in the void with absolute time; one identified architrino | Distinct from assembly group speed. It remains meaningful for a free or straight-moving architrino with no orbit. |
| Internal speed relative to a declared center | $\mathbf v_i^{\mathrm{int}}$ and $v_{\mathrm{int},i}=\|\mathbf v_i^{\mathrm{int}}\|$ in Braid Mathematics | Speed after subtracting the declared center velocity | Includes more than tangential circulation. A rotating coordinate chart needs its own stated derivative convention. |
| Tangential orbital speed | $\omega R$, $2\pi f_a r_a$, and $v_{\mathrm{orb}}^{\mathrm{tan}}$ in circular/carrier charts | Speed associated with a declared orbit, radius, axis, and time coordinate | Equals total constituent speed only in the appropriate stationary circular geometry. Radial motion, moving centers, and nested rotations break that identification. |

Plainly: a stationary assembly can contain fast-moving constituents. A moving assembly can add its group motion to their internal motion. A changing orbit can also have radial motion, so “internal” and “tangential” are not synonyms.

The existing [Braid Mathematics speed-budget lemma](../../../content/markdown/aaa/noether-braid/braid-mathematics.md#transverse-internal-motion-speed-budget-lemma) gives the relevant kinematics:

$$
\mathbf V_i=\mathbf V_{\mathrm{grp}}+\mathbf v_i^{\mathrm{int}},
\qquad
\|\mathbf V_i\|^2
=\|\mathbf V_{\mathrm{grp}}\|^2+\|\mathbf v_i^{\mathrm{int}}\|^2
+2\mathbf V_{\mathrm{grp}}\cdot\mathbf v_i^{\mathrm{int}}.
$$

Plainly: total speed depends on the directions as well as the magnitudes. The simpler sum of two squared speeds is valid only when the two motions are perpendicular. A rename must preserve that cross term and must not quietly assume perpendicularity.

**Claim boundary:** this identity is kinematics, not a retention or speed-pinning result. The lemma separately labels fixed total site speed as a branch hypothesis. Likewise, a speed above $c_f$ does not by itself prove a self-hit: the causal history and geometry must admit a positive-delay same-transmitter root. No constituent speed cap, observer Lorentz factor, or primitive mass premise is introduced here.

#### 4.8.2 Size and location of the direct beta-f conflict

The earlier census remains an unchanged historical display snapshot: bare $v$ ranked **21**, and $\beta_f$ ranked **26**. Those counts measure spelling, not physical meaning. The targeted live scan below is a different instrument: it extracts inline and display TeX from corpus and reference Markdown, masks fenced and inline code, and searches the raw math before contextual classification. This includes beta-f inside function subscripts, which a standalone-symbol filter misses. The display count was cross-checked with the corpus builder's display parser. A math span is one delimited expression, not one repeated token.

| Non-group use of $\beta_f$ | Live corpus source and locations | Display spans | Inline spans | What would have to travel together |
| --- | --- | ---: | ---: | --- |
| Stationary circular constituent ratio, including cross-references | [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md): line 159; circular and maximum-curvature sections at 2958–3748; circular-limit references at 3831, 3873, 3915, 3987; summary at 4422 | 37 | 49 | Definition, partner/self root equations, acceleration projections, branch thresholds, asymptotics, numerical comparisons, and references back to that chart |
| One uniformly moving transmitter | Master Equation: 1802–1820 | 2 | 0 | $\|\mathbf V_{j,0}\|/c_f$ and the corresponding angular wake-density factor; this is not an orbital quantity |
| Circular partner certificate and its speed-ratio equivalence | [Binary Dynamics](../../../content/markdown/aaa/dynamics/binary-dynamics.md): 426–532 and 1132 | 9 | 7 | Certificate and the statement identifying its beta-f with the chapter's s |
| Circular branch-count benchmark | [Causal Action Functional](../../../content/markdown/aaa/dynamics/causal-action-functional.md): 122–145 | 2 | 1 | Circular ratio, counting function, domain, and upper-speed bound |
| Native branch-scan threshold | [Units and Constants](../../../content/markdown/aaa/validation/simulations/action-energy/units-and-constants.md): 44–55 | 0 | 1 | Reconcile the threshold's beta-f with the preceding total-site beta-i and circular s definitions |
| **Corpus subtotal** | **Four source documents** | **50** | **58** | **108 spans whose beta-f numerator is not assembly group speed** |

Plainly: this is a material conflict, but not 108 independent decisions. Most occurrences belong to the same circular derivation. The single-transmitter case must not be swept into an orbital rename.

The same single-transmitter use appears in [Point-Cloud and Wake-Energy Audit](../master-equation-closure/point-cloud-and-wake-energy-audit.md), lines 88–160: **14 additional math spans**, including the closed-surface response functions and their counterexample. Its preceding fixed-cloud group-speed section stays separate. These reference spans are not part of the 4,598-equation app census.

**Coverage boundary:** 50 is the count of display expressions containing this beta-f spelling in the conflicting corpus contexts, not the total number of equations that a future rename would touch. Affected formulas also use bare v, s, threshold symbols that omit f, and derivatives whose variable is encoded in a function name. Those dependencies are listed below. Search artifacts and the temporary instrument are under `/tmp/aaa-speed-assessment-26aa12/`; the source locations and definitions in this section are the durable assessment. Counts are a dated snapshot, not a maintained registry.

**Retained beta-f uses:** the rest of Master Equation's translating-loop and fixed-point-cloud calculations; Lorentz Kinematics; Horizon Chirality; Ideal Braid Guide; the group-motion parts of Radiation; No-Go Theorems; Historical Context and Missed Opportunities; Spacetime Models and Noether Sea; and the mathematical guides. The reference equation plan, score ladder, translating-binary shared-record packet, and Lorentz/GR handoff also use group-speed ratios. Research Notebook, work logs, and historical closure records retain their provenance. In Lorentz Kinematics at 257–266, the uniformly moving-transmitter expression is explicitly the **uniform-translation part** of the binary Jacobian before its internal term is added; it is not the total speed of the circling constituent.

Plainly: similar-looking wake formulas can have different speed inputs. We retain the one explicitly measuring the group-translation component and separate the one defined from the total transmitter velocity.

#### 4.8.3 Other native speed uses that must be accounted for

These are affected-use families, not approved replacements. Source line numbers below refer to this assessment checkpoint. Indexed forms are included because preserving only bare v would leave the same ambiguity in three-binary summaries.

| Source family | Actual meanings and locations | Disposition before any rename |
| --- | --- | --- |
| Master Equation's dimensional v | Circular diagnostic at 2645; circular speed, velocity projections, per-hit power, maximum-curvature parameters, and summaries across 2961–3748 and 4417–4470 | Tie each dimensional speed to its circular or total-site definition. Preserve factors of $c_f$, signed projections, and parameters of residual functions. |
| Binary Dynamics and its numerical baselines | Circular s and its root families throughout the chapter; dimensional $P'(s)=K'(s)/s$ at 2076; characteristic speed $s_b$ in the closure packet and [Analytic Baselines](../../../content/markdown/aaa/validation/simulations/action-energy/analytic-baselines.md) | Do not globally replace s or normalize its kinetic argument. Check each definition, not the numerical coincidence when $c_f=1$. |
| Coincident-midpoint and axially separated 4:2:1 owners | [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../../../content/markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md): $v_a,\beta_a$ in circular-action and pinning charts, $s_a$ in the field-speed index set. [Three-Binary 4:2:1 Frequency Lock](../../../content/markdown/aaa/noether-braid/three-binary-4-2-1-frequency-lock.md): $v_a=2\pi f_a r_a=\beta_a c_f$, carrier $v_h^{\mathrm{car}}$, and returned speed-factor rows | Preserve binary identity, tangential carrier meaning, instantaneous fluctuations, and cycle-averaged carrier values. An index a is not automatically an individual architrino index i. |
| Center-relative versus combined motion | [Braid Mathematics](../../../content/markdown/aaa/noether-braid/braid-mathematics.md), [Coordinate-Axis Six-Point Symmetry and Return Response](../../../content/markdown/aaa/noether-braid/coordinate-axis-six-point-symmetry-and-return-response.md), [Planck-Scale Coincident-Midpoint Orthogonal-Axis Geometry](../../../content/markdown/aaa/philosophy-history/theory-bridges/mapping-planck-scale-to-coincident-midpoint-orthogonal-axis-geometry.md), and [Photon priorities](../app-photon/priorities.md) | Keep group motion, internal vector, tangential component, and total speed distinct. Preserve $v_{\mathrm{eff}}$, $v_{k,\mathrm{abs}}$, and declared projections until their role is mapped; “eff” in that geometry note is not a propagation-speed channel. |
| Native self-hit/field-speed prose | Reality, Quantum, Causality (35, 76, 107–112, 162, 308); Algorithmic Resonance (24); Energy (1314); Inflation Model (41); Agency and Internal Causation (54); Superposition Mechanism (29); Solving the Crisis (204, 320, 398) | Total-site versus characteristic internal speed is not specified consistently enough for an automatic orbital substitution. Preserve hypothesis/threshold status; wording such as “field-speed limit” is a separate theory claim, not fixed by relabeling v. |
| Indexed binary summaries | Black Holes; Singularity Resolution; Horizon Chirality; Dark Energy; Inflation Model; Color Charge SU(3); Quantum Operator Mapping; Angular Momentum and Spin; Particle Masses; Hyde Periodic Table; Architrino SI Base Units; Theory Mapping | Follow the declared binary/carrier chart. Preserve persistent indices, rest/translation assumptions, and conditional regime assignments; do not turn a particular record's binary-2 role into a universal taxonomy rule. |
| Guides and diagnostic wording | Photon Guide (99, circular preset speed; 200, vector transmitter/receiver derivatives); Comparative Glossary (62, 107, 114, 170–171); Parameter Ledger (40) | Update only native meanings if a migration is approved. Retain conventional comparison cells and vector derivatives. The ledger's old statement that v can denote field speed requires explicit reconciliation with canonical $c_f$, not a new field-speed alias. |
| Signed one-dimensional motion | [Causal Set and Delay Geometry](../../../content/markdown/aaa/validation/simulations/action-energy/causal-set-and-delay-geometry.md) (44); field-speed-ceiling analyses, including [Trailing-Front Activation](../field-speed-ceiling/trailing-front-activation-dichotomy.md), [Mirror Selection](../field-speed-ceiling/exact-mirror-continuation-selection-analysis.md), and [Mirror Completion](../field-speed-ceiling/mirror-event-family-completion-and-right-trace.md) | Preserve signed velocity, its derivative, and absolute-value conditions. Replacing it by a nonnegative speed norm would change the mathematics. Frozen review/proof records keep their recorded notation. |
| Active operator consumers | [Field-Speed Mathematics](../field-speed-ceiling/mathematics-geometry-dynamical-system.md), [Independent Causal-Wake State Analysis](../master-equation-closure/analysis-independent-causal-wake-state.md), [Dark-Sector Photon-Like Mode](../dormant-deferred/dark-sector/dark-sector-photon-like-mode.md), [Simulation protocol details](../app-simulation/simulations.md), and specialist guidance | Separate native total speed, orbital speed, signed speed, and conventional counterexamples. The helical construction's axial u and transverse v are different components. Do not relabel its total-speed budget as either component. |

Plainly: “orbital” alone is not enough to choose a new name. An electron going around a nucleus is an assembly following an orbit; an architrino circulating inside that electron is a constituent. The object and reference center determine which row applies.

The related specialist guidance is in `reference/research-office/specialists/roles-og-entourage/{alfa,cami,cos,dyna,red,sol,system-prompt}.md` and `roles-geometry-dynamics/{hendrik-lorentz,henri-poincare}.md`. The Topo and Photon plans consume the native speed controls. The dormant Causal Delay Feedback root plans preserve the meanings of their existing speed controls; dormant status alone is not evidence that an associated app surface has disappeared. Historical reviews, evidence records, and research logs require an explicit provenance boundary rather than a blind text replacement.

**Definition gaps, not rename permission:** broad threshold summaries do not always specify total native speed versus tangential carrier speed. The axially separated orthogonal-axis 4:2:1 braid explicitly distinguishes a cycle-averaged carrier value from microscopic crossings; the existing s-a threshold set in the coincident-midpoint orthogonal-axis braid compares a time-dependent binary speed against $c_f$. These cannot be equated by a choice of letter. Keep those entries unresolved until their owner definitions supply the intended center, component, and averaging.

#### 4.8.4 Destination conflicts and displacement burden

The table assesses previously mentioned or already-existing spellings. It selects none. “No exact occupant found” is a lexical search result, not approval of a definition or proof that every future context is safe. Qualitative conflict levels describe semantic overlap; no artificial numerical score is assigned.

| Spelling examined | Existing occupants | Conflict / clearance assessment | Displaced-use obligation if pursued |
| --- | --- | --- | --- |
| Bare s as the common internal ratio | Binary Dynamics' dimensionless circle ratio; Energy's dimensional $s_a=\|\mathbf V_a\|$ and speed argument s; Master Equation's $s=\pm1$ sine-sheet sign and $s_n=(-1)^n$; Lorentz Kinematics' $s=T/P_0$; ordinary path parameters | **High: not cleared.** Different units and meanings coexist, including the kinetic speed argument inside Binary Dynamics itself. | Would require a destination for the dimensional speed family, sign family, and any conflicting time/path parameter in shared contexts, then destination checks for each. No such secondary eviction is approved. The earlier “prefer s” entry is withdrawn. |
| Indexed $\beta_i,\beta_a,\beta_k$ without a role qualifier | Total-site beta-i in Units and Constants; circular/carrier beta-a and beta-k in the coincident-midpoint and axially separated 4:2:1 braid charts; sampled group-speed beta-j in Lorentz Kinematics (1593) and beta-k in the translating-binary packet (898); beta-k as a coefficient in a frozen residual-box proof | **High for a global family reservation.** The index may identify an architrino, a binary, a sampled speed, or a coefficient. | Preserve those index meanings. A universal “indexed beta means internal speed” rule would displace group-sample notation and overlap a provenance-bound coefficient. Retaining current local scopes avoids that eviction but does not establish a global standard. |
| $v_{\mathrm{int},i}$ or related internal forms | Existing center-relative speed in Braid Mathematics; characteristic internal scale $v_{\mathrm{int}}$ in Master Equation (2092–2100) and the point-cloud audit; internal velocity vector in Inferring Braid Requirements | **Moderate: compatible general role, different measurement operations.** | Do not overwrite a characteristic scale with an instantaneous site value, or use the internal norm for total native speed. No unrelated occupant needs moving merely to retain these meanings. |
| $v_{\mathrm{orb}}$ and an orbital-qualified beta-f | Six math spans already use $v_{\mathrm{orb}}^{\mathrm{tan}}$ in the Planck-scale coincident-midpoint orthogonal-axis geometry chapter. No exact $\beta_{\mathrm{orb},f}$ or $\beta_{f,\mathrm{orb}}$ was found in the scanned corpus/reference math, including text/roman qualifier variants. | **Low lexical conflict; definition still required.** | The existing tangential qualifier and geometric assumptions must survive. This family cannot absorb straight-moving transmitters or arbitrary total-site speed. No secondary eviction identified for those exact ratios; this is not clearance of all possible qualifier spellings. |
| An absolute/site-qualified speed | Photon priorities already use $v_{k,\mathrm{abs}}$ for a combined native speed; canonical $\|\mathbf V_i\|$ denotes the norm directly | **Low lexical conflict for the qualified role; index and frame still matter.** | Preserve binary k versus architrino i, and peak versus instantaneous versus averaged speed. A direct norm requires no new bare-letter reservation. |
| Bare u | Group speed in translating-binary calculations, the group term in the transverse speed-budget lemma, and ordinary integration/displacement variables | **High if reassigned to internal motion.** | Would displace existing group-speed uses while leaving conventional dummy-variable scopes to protect. It does not simplify the current problem. |
| Scalar $V_i$ as a short speed | Standard PPN matter-current potential components in PPN Parameters; existing velocity components and bold native $\mathbf V_i$ elsewhere | **High readability conflict.** | The conventional PPN use is protected by the operator's convention rule. Bold velocity, scalar norm, and component index must remain visually distinct. |

Plainly: short names are not free merely because they look convenient in one equation. Role-qualified names encounter fewer unrelated occupants, while direct vector norms avoid claiming another letter. Neither approach resolves an unspecified physical definition.

**Protected conventional uses:** keep standard observer/comparison velocity notation, PPN parameters and potentials, Higgs/condensate v, the conventional reaction-rate factor $\langle\sigma v\rangle$, thermal/distribution speed arguments, interferometric $(u,v)$ coordinates, mathematical test vectors, and the contextual-value map $v(O)$ in Quantum Operator Mapping. The same character does not make these internal-speed quantities. If a conventional expression and a native quantity share one explanation, make the local distinction explicit; do not clear the conventional symbol globally.

#### 4.8.5 Dependencies that a complete transition must preserve

| Dependency | Actual source use | Required treatment in a later approved plan |
| --- | --- | --- |
| Circular root functions and derivatives | Master Equation's $g_{\beta_f,s}$, $g_{\beta_f}'$, related functions and speed sensitivities, partner/self-root equations and bounds; Binary Dynamics' s-dependent root functions and derivatives | Rename the parameter, function labels, derivatives, domains, captions, and references together. Preserve the differentiation variable and which variables are held fixed; a prime on the root function is not automatically a speed derivative. |
| Thresholds without the full original spelling | $\beta_f^\star$, $\beta_n^\star$, $\beta_{f,n}^\star$, binary $s_n$, and branch-count $\beta_{\max}$ | Follow the threshold's definition. Do not confuse a critical speed $s_n$ in one source with the sine-sheet sign $s_n$ in another. |
| Dimensional versus normalized arguments | $v=\omega R$ versus a speed divided by $c_f$; kinetic $K(s)$ and $P(s)$; period-averaged circular power using $s_b$ | A pure rename preserves units. A normalized argument requires explicit function redefinition and chain-rule factors; $c_f=1$ in numerical runs does not erase this distinction. |
| Bound variables and channel labels | Self/partner suffixes in $N_s,J_s,\delta_s$; sine-sheet signs; signal denominator $c_{\mathrm{sig}}$; group ratios with $c_f,c_{\mathrm{eff}},c_\star$ | Preserve role-bound suffixes and the exact denominator. Do not manufacture an internal-motion gamma factor by analogy with group-speed factors. |
| Native historical speeds | Transmitter speed at emission, receiver speed at reception, maximum speed over a stored span | Preserve event labels and the operation used to form the diagnostic. An instantaneous orbit speed is not a substitute for a history maximum. |
| Physical and evidential status | Prescribed circles, algebraic cancellation points, open branch pinning, conditional carrier values, observer recovery targets | Preserve assumptions, numerical values, domains, and claim grades. A notation cleanup cannot establish retention, stability, a universal binary role, or an instantaneous self-hit threshold. |

Plainly: a correct migration changes the name everywhere that refers to the same quantity, while leaving both the calculation and its limitations intact. Replacing a letter without its derivative or threshold family would leave a broken derivation.

#### 4.8.6 App-equation and other consumer boundaries

| Consumer | Current connection | Scope if a later symbol change is approved |
| --- | --- | --- |
| Equation corpus and app-equation | [Corpus builder](../../../scripts/build-equation-mapping-corpus.mjs) derives displayed formulas, symbol descriptions, scope, and search text from source equations and nearby context | Preserve existing equation links and semantic IDs. The builder reuses an existing link's ID; a formula-derived fallback is used only when that link is absent. Check local symbol explanations and search, not just KaTeX parsing. The generic fallback “a velocity or local state variable” does not establish the intended speed role. |
| Promoted equation maps | Curated formulas, labels, overlays, bindings, and prose under `src/apps/equation-mapping` | Inventory affected promoted maps against the selected equations. Preserve group-speed maps and machine contracts; not every map containing beta needs a change. |
| Circular analyzer | [Circular self-hit analyzer](../../../scripts/equation-mapping/analyze-circular-self-hit-binary.mjs) uses machine parameter beta, beta-valued results, and the existing CLI | Its mathematical beta is the circle ratio. Keeping a documented code parameter does not require renaming its schema or CLI. For display-only notation changes, preserve numerical inputs/results and test the displayed mapping. |
| Photon | [Diagnostics runtime](../../../src/apps/photon/PhotonDiagnosticsRuntime.js): `Max transmitter v/c_f`, `Span self-hit max v/c_sig`, and `Helical self-hit max v/c_sig`; Photon Guide and priorities define preset and combined speeds | These are total transmitter/history diagnostics, not assembly group speed. Update paired plain-text/math labels and tests only after the role is selected. Preserve maxima, emission/history scope, and the signal denominator. |
| Topo | [Topo page](../../../topo.html) speed control; [circular scenario](../../../src/apps/topo/TopoCircularBinaryScenario.js) computes angular velocity from beta/radius in normalized units; the same control also serves straight source motion | Distinguish circular and collinear meanings. The accessible label “beta divided by wake speed” is misleading because beta is the ratio; record it for the consumer wording batch. Do not alter the control range or shader/schema keys as a notation side effect. |
| Group-motion apps and records | Ideal Braid and translating-binary equation records use beta for group motion; serialized `beta_f` and `beta_f_u` are existing interfaces | Retain group meaning and machine interface. Display prose may explain the symbol without renaming stored records. |
| Documentation and publication copies | Canonical guides, affected active priorities, generated equation registry and textbook reading copies | Sources first; generator checks identify drift. Publication writes require explicit approval for the later batch, followed by fresh checks. iOS packages, historical PDFs, frozen evidence, and research logs remain outside automatic migration. |

Plainly: “everywhere” means every active consumer of the changed meaning. It does not mean changing unrelated beta controls, rewriting historical measurements, or hand-editing generated copies.

#### 4.8.7 Deferred decisions and conditions for resumption

**No letter choice is requested yet.** The remaining decisions are about meaning:

1. **What does an indexed binary speed measure outside a stationary circle?** The circular identity fixes a tangential quantity, while self-hit and full native velocity definitions concern total site motion and its history. Existing translating, nested, and carrier summaries do not all state the same center and averaging. Map them to their actual owner definitions; do not declare them equal for brevity.
2. **How far should the group-speed reservation extend?** Keeping bare v and beta-f for group speed is the current baseline. Extending that reservation to every indexed or qualified v/beta would also displace already-explicit internal forms and sampled group-speed forms. That broader family rule is not currently approved. Conventional field-specific uses remain protected.

Plainly: the first decision determines what is measured. The second determines how much existing notation must move. Choosing a replacement before settling these would repeat the earlier planning mistake.

**Deferred resumption procedure, not the next task:** only if the operator explicitly reopens this connected migration, prepare the definition decision for indexed binary speed using the coincident-midpoint orthogonal-axis, axially separated orthogonal-axis 4:2:1, total-site, and translating speed-budget owners. Separate the unambiguous stationary-circle subset from summaries requiring a definition decision before preparing any transition option. The current scope permits only worthwhile, independent corrections and does not require completing this assessment's remaining definition work.

**Completion condition for the later proposal:** every occurrence selected for change has an exact destination and preserved definition; every incumbent at that destination is retained with a justified scope or has its own fully checked move; unresolved physical meanings are excluded explicitly, not assigned a convenient new symbol. No equation edits or publication regeneration precede operator approval.

**Assessment verification:** source definitions and consumer code were inspected; conflict counts are lexical measurements followed by contextual classification, not physics validation. An incorrectly classified numerator, missed active family member, or occupied proposed destination would overturn the corresponding clearance claim. Recheck live sources before execution because the repository and line numbers continue to change.

## 5. Detailed Plan Before Execution

**Conditional procedure:** apply these phases only to a correction admitted by the current scope at the top of this document, or to a broader migration explicitly reopened by the operator. They are not an instruction to resume the deferred notation overhaul.

### Phase 1 — Agree on strategy and scope

Review Sections 1–2 and the approved notation in Section 3.2 first. Adopt that approved set as the first-priority pass, with explicit retain/reconsider decisions rather than redesigning it from the frequency ranking. Apply the accepted Section 0.4 rule: established uses may keep their symbols in the relevant field, and nonconventional competing uses may move. Resolve the actual applications and mixed-context presentation, including bound indices. Keep layer and channel distinctions until their owning definitions or derivations change. Select transition rows for further design and reject unnecessary renames explicitly.

**Completion:** approved strategy and scope rules, with named open choices. Completing discussion does not authorize migration.

### Phase 2 — Build the semantic inventory

Start with the approved families in Section 3.2, including their less frequent partners and any colliding symbols from Section 3.3. Inventory display and inline mathematics, prose definitions, headings, captions, tables, source links, app formulas, labels, explanations, and exports. Search TeX variants, Unicode, vector/scalar forms, subscripts, derivatives, and indexed families. Group by concept and definition, not character alone.

Give every occurrence a deterministic path-by-path disposition: change; retain canonical form; retain distinct concept; preserve labeled comparison; preserve immutable provenance; or unresolved and blocked. Include active priority packets and procedures teaching or consuming the convention. Reconcile the census against raw formulas; separate extractor defects from authored notation defects. Fill the Conflict / clearance column from this evidence and follow every proposed replacement to its current occupants as required by Section 0.3; a selected family's inventory includes the secondary moves needed to make its destination available.

**Completion:** every occurrence in a selected family has a disposition and owner. No unresolved “all others” category. Ambiguous definitions or replacements block that family.

Plainly: this makes “change it everywhere” checkable. Every location gets a decision, including places where the same character correctly means something else.

### Phase 3 — Approve notation and representative mappings

Compare the preferred short form with the current form and a reasonable alternative only where there is a real choice. Evaluate brevity, familiarity, collisions, TeX burden, dimensional clarity, and reuse across the complete connected set of moves. Include the cost in readability and affected scope of clearing prior users, not just the convenience of the preferred symbol. Review before/after expressions from the owner, a downstream derivation, a mixed-framework explanation, and every displaced concept's destination.

Keep proposed guide text here while approval is pending. State any change to a reserved glyph or permitted shorthand exactly. Check agreement between reader explanation, glossary definition, and transition table.

**Completion:** one destination per concept, approved scope/qualifiers, comparison forms, and substitution obligations. Implementation still requires the operator's explicit direction.

### Phase 4 — Plan complete dependency batches

For each approved concept, identify its full active dependency set. Schedule the Section 3.2 families first; record any blocked family and its unresolved decision before moving to lower-priority notation. A family may require several editing sessions, but remains unfinished until all consumers are covered. Representative examples are design checks, not permission to publish a partial migration.

Assign one responsible owner per surface and one integrator for the concept. Keep execution single-owner unless parallel work is explicitly approved. Do not add a notation database or validator when the existing glossary, extractor, tests, and transition table meet the actual need.

| Surface | Required treatment in a later authorized batch |
| --- | --- |
| Guides | Update owning definition and style rule; reconcile other guides by precedence. |
| Corpus Markdown | Change selected meaning in displays, inline math, prose, examples, captions, derivations, and duplicates; preserve unrelated meanings. |
| Active priority material | Update live instructions and consumers so they do not reintroduce old conventions. |
| Equation Mapping | Preserve semantic IDs and links for unchanged mathematical equations; align chips, definitions, search, curated explanations. Inspect source ownership. |
| Other apps and scenes | Include formulas, controls, legends, accessible labels, tooltips, scene metadata; inspect rendered output. |
| Code and tests | Separate display strings from internal names and public contracts; test behavior independently of spelling. |
| Schemas/interfaces | Review readers/writers, serialization, bindings, fixtures together. Incompatible changes need an explicit version/transition decision; no silent aliases or shims. |
| Generated outputs | Regenerate affected web/textbook artifacts from owners only with authority; never hand-edit. iOS is on-demand only, including during final PR flow; see Section 5.3. |
| Historical sources/evidence | Preserve original sources, frozen records, hashes, numerical provenance. Translate at current consumers; these are not active competing conventions. |

Plainly: the accepted meaning must reach the book, app, and working instructions. Historical evidence keeps its recorded notation with an explicit translation. Rewriting frozen evidence would require a separate decision.

### Phase 5 — Execute only after authorization

Recheck live state and ownership. Change canonical sources and all active consumers of the approved family. Preserve stable equation IDs through notation-only edits. For pure renames, retain original mathematical content as an independent comparison basis; for transformations, verify substitutions separately.

Do not change an independent oracle in the same change as its subject. If both implementations must adopt a mathematical rule, their agreement tests implementations only; the rule needs independent justification. Labels, rendering, and schema checks do not validate physics.

Run generator checks during edits. Report drift and its required regeneration command; no generated writes without authority. A transition can be source-complete but awaiting regeneration; it is not publication-complete then.

Plainly: a rename leaves the mathematics unchanged. A variable transformation also needs mathematical verification. Apps and books are finished only when their generated copies agree with approved sources.

### Phase 6 — Verify completeness and comprehension

Use the occurrence inventory as the acceptance list. Account for every remaining old form by disposition. Confirm new forms, units, indices, intact equations/links, and unchanged claim grades. Check that shortening has not erased a channel or promoted an effective quantity into a primitive.

Use existing verification first, rereading entrypoints at execution time:

| Check | What it establishes |
| --- | --- |
| `node scripts/build-equation-mapping-corpus.mjs --check` | Registry, link, context, and generated-record agreement; not semantics. |
| `node --test tests/equation-mapping-corpus.test.js` | Existing extraction/registry behaviors; extend for meaningful gaps if changed. |
| `node scripts/validate-content.mjs --check --strict` | Current content/index integrity. |
| `node scripts/build-scene-graph.mjs --check --strict` | Scene graph agreement. |
| `node scripts/build-textbook-md-pdf.mjs --check` | Reading-copy agreement. |
| `node scripts/export-ios-textbook-package.mjs --check --strict` | iOS package agreement. |
| Applicable existing notation checks | Known polarity, frequency-triplet, and current Master Equation terminology constraints; not all semantics. |
| Browser/reader inspection | Actual symbols, definitions, wrapping, tooltips, search, and comparison maps. |
| `git diff --check` | Whitespace errors in the inspected diff, not mathematics or coverage. |

Plainly: automation catches broken references, stale outputs, and known spelling rules. Correct meaning requires source-context review; a variable transformation additionally requires mathematical verification.

Closeouts must name concepts completed, paths changed, comparison/provenance exceptions, unresolved occurrences, checks actually run, and generated surfaces pending. Fewer symbols or fewer search hits are not success by themselves. Success means the approved meaning and notation across all active uses, readable equations, and unchanged physics.

### 5.1 Step-by-step implementation order

The phases above establish the approval boundaries; Section 0 records their current status. The following sequence makes them operational. It is a proposed procedure, not permission to execute it. The planning steps must be completed before source-edit approval is requested; do not move inventory after a spelling decision. Repeat the implementation sequence for each approved concept family; complete the family across its active consumers before publishing it. Do not combine equation deduplication, theory revisions, or unrelated editorial cleanup with a notation-only batch.

| Step | Action | Required result before proceeding |
| ---: | --- | --- |
| 1 | Apply the worthwhile-easy criteria at the top of this document to at most one correction from the existing assessment. The connected speed-symbol migration is deferred. | A concrete reader benefit, settled meaning, no displaced occupant, and a bounded complete update; otherwise stop notation work. |
| 2 | Capture the current canonical sources, generated registry, equation IDs, source links, counts, and affected-file hashes. Refresh the census against that snapshot. | A reproducible starting point. The earlier 4,598-equation count is a dated observation, not a permanent target. |
| 3 | Starting with the Section 3.2 approved families and their colliding forms, inventory every form of each selected symbol and classify each occurrence by concept, definition, units, physical layer, and disposition. Include inline mathematics and non-equation surfaces; fill the conflict column and follow replacement destinations through all required secondary moves. | Complete occurrence list and checked destination occupants for the connected set; unresolved meanings or onward collisions block that set rather than receiving an automatic replacement. |
| 4 | Attach each occurrence to its source owner and downstream consumers using Section 5.2. Record existing equation IDs and any curated formula, callout, code, schema, or export dependency. | Exact source and output paths, preservation exceptions, and responsible editor; no unexamined consumer category. |
| 5 | Approve the completed transition rows and representative before/after equations. Obtain explicit implementation authority and identify whether regeneration is authorized now or reserved for the final publication process. | Approved notation, substitutions, scope, tests, and regeneration boundary. Approval of this plan alone is insufficient. |
| 6 | Establish the mathematical acceptance cases before editing. For renames, preserve the original expressions for comparison; for transformations, verify units, derivatives, bounds, and substitutions independently. | A way to detect changed mathematics, distinct from app rendering and generator checks. |
| 7 | Update the owning guide definitions, reader explanation, and every active canonical Markdown occurrence for the family, including repeated equations and their local definitions. Preserve each existing Equation Mapping link and ID. | The authored concept is consistent throughout the source set. Guide decisions and their consumers are one unfinished batch until both are updated. |
| 8 | Update affected promoted Equation Mapping formulas, formula parts, anchor labels, callouts, and search wording. Inspect extracted symbols and definitions; change extraction behavior only if the approved notation exposes a real gap. | Both basic and promoted app pages express the approved notation. No manually edited generated registry or independent competing glossary. |
| 9 | Update other active consumers: scenes, app labels, diagrams, working instructions, code display strings, and relevant interfaces/tests. Handle any public schema change under a separately approved version decision. | Every listed consumer has a recorded disposition; frozen evidence is preserved, with translations at current consumers where needed. |
| 10 | Run the relevant source, notation, and generator checks. Review every reported difference and coordinate any whole-corpus generator write with other ongoing work. | Known generated drift is recorded as pending; unexpected source changes, missing IDs, and semantic errors are resolved before regeneration. |
| 11 | Once authorized, regenerate affected outputs in the dependency order in Section 5.3, and run the corresponding checks again. | App registry, graph, reading copies, current PDFs, and iOS package agree with their sources wherever affected. |
| 12 | Compare before/after inventories and equation IDs; run the focused tests and broader applicable checks in Section 5.4. | Every old occurrence is changed or explicitly retained; no unexplained lost/added equation IDs, count changes, or stale descriptions. |
| 13 | Inspect actual app and reader output, including promoted and basic pages, source navigation, tooltips, search, narrow layouts, PDF pages, and the relevant iOS views. Exercise editor/reset paths in disposable test state. | Correct visible notation and definitions, working links, readable layouts, and no loss of user data. Tests alone do not satisfy this step. |
| 14 | Review and, only when separately authorized, publish the complete source/output batch through the live branch/PR procedure. Then verify the served app and distributed reader artifacts against the approved revision. | A consistent released version. Pending publication, deployment, or reader distribution remains explicit rather than being reported complete. |
| 15 | Record completion by concept and update that family's occurrence and conflict results. Adopt the maintenance loop in Section 5.5 for later edits. Keep other entries retain/defer unless new evidence justifies another priority; do not automatically advance into the remaining census rows. | A completed selected change with checked consumers, without implying that unexamined families are cleared or scheduling an unnecessary full migration. |

Plainly: decide the names, find every use, change the authoritative sources, update the app's extra explanations, rebuild their copies, and inspect what readers receive. A family stays unfinished while any required copy still uses the old convention.

### 5.2 How app-equation and other consumers stay synchronized

Here, `app-equation` means the Equation Mapping app at [equation-mapping.html](../../../equation-mapping.html). The following dependency map is based on source inspection, not an end-to-end runtime measurement. Recheck these owners before execution; a changed loader or generator would invalidate the corresponding routing claim. The [registry and authoring contract](../app-equation-mapping/registry-and-authoring-contract.md) remains the app's authority.

| Surface | Current source and update path | Synchronization obligation |
| --- | --- | --- |
| Basic equation pages | Canonical Markdown → [corpus generator](../../../scripts/build-equation-mapping-corpus.mjs) → `content/generated/equation-mapping/corpus-equations.json` → [loader](../../../src/apps/equation-mapping/EquationMappingCorpusLoader.js) and [registry](../../../src/apps/equation-mapping/EquationMappingRegistry.js). | Edit the equation and local definition at source, then regenerate. Check formula, symbols, description provenance, source context, and navigation together. |
| Promoted equation pages | [EquationMappingData.js](../../../src/apps/equation-mapping/EquationMappingData.js) supplies curated formulas, formula parts, anchors, and overlays. The registry combines these with generated source context and symbol records. | Regeneration alone does not rewrite curated formulas or callouts. Reconcile each affected curated expression with its source, including intentionally expanded forms; literal equality is not always the right test. |
| Equation identity and links | The adjacent `Explore this equation in Equation Mapping` link carries the existing ID. The generator reuses that ID; only an unlinked occurrence receives an ID derived from its path and formula. | Preserve existing link IDs through renames and moves; repair relative link paths when moving files. A missing link must not silently turn a renamed formula into a new page. Splits, merges, and deletions require a separate identity decision. |
| Browser state and app entrypoints | [main.js](../../../src/apps/equation-mapping/main.js) supplies current registry documents to the [runtime](../../../src/apps/equation-mapping/EquationMappingRuntime.js), bypassing saved document drafts on normal startup. A runtime mount without supplied documents merges saved drafts; the current reset action loads the curated seed set. | Test normal startup, alternate mounts, edit/reset, and reload separately. Do not claim that saved drafts override normal corpus loading. Preserve user work; do not clear storage or add a migration mechanism without an approved need and policy. |
| Web corpus, scenes, and other apps | Canonical Markdown, `content/scenes/`, and the relevant app's authored formula/label owners; graph outputs come from [build-scene-graph.mjs](../../../scripts/build-scene-graph.mjs). | Search and update source prose, diagrams, captions, accessible text, controls, and overlays as applicable. Inspect each affected rendering path; Equation Mapping checks do not cover other apps. |
| Textbook reading copies and current review PDFs | Graph/TOC plus canonical Markdown → [reading-copy generator](../../../scripts/build-textbook-md-pdf.mjs) → [review-PDF generator](../../../scripts/build-textbook-review-pdfs.mjs). | Rebuild Markdown before PDFs. The script named `build-textbook-md-pdf.mjs` writes Markdown reading copies, not the actual PDFs. Preserve archival snapshots under their provenance policy. |
| iOS reader | Current TOC, reading copies, reference guides, and reader assets → [package exporter](../../../scripts/export-ios-textbook-package.mjs) → `apps/ios/ArchitrinoReader/GeneratedTextbookPackage/`. | Refresh package content, rendered HTML, links, search index, and manifest together. Equation links route to the public web app; test that boundary. A rebuilt package does not update an already installed reader until its normal distribution/update process occurs. |
| Active procedures, tests, and generated orientation | Update active authored guidance and applicable existing test/check owners. [Startup orientation](../../../scripts/build-agent-startup-orientation.mjs) is generated from its declared sources. | Prevent later authors from reintroducing obsolete notation. Do not rewrite frozen fixtures or historical evidence as cosmetic cleanup; classify their current consumers first. |

Plainly: the source equation feeds the basic app page automatically after regeneration. Promoted pages contain additional authored material that must be changed deliberately. Books, PDFs, and the installed reader each have their own production step.

**Definition quality:** prefer a precise definition beside the source equation. Check the generated symbol record against that local meaning. The generator's shared descriptions and context detection are heuristics, so changing a global fallback for an overloaded letter can spread the wrong meaning. Extend the existing extractor or definition resolution only for a demonstrated, tested gap; do not make a new symbol database a prerequisite for this migration.

**Scope safeguard:** the equation generator's `--write` mode scans the corpus and can insert missing links into canonical Markdown, as well as writing JSON. The other listed generators can also affect more than the selected family. Inventory their expected write sets first; coordinate concurrent source changes and review the actual diff afterward. If the command would include unapproved material, stop for a scope decision rather than hand-editing its output or inventing an unsupported scoped flag.

Plainly: automatic output is only as reliable as its definitions and inputs. A global rebuild can pick up unrelated work, so its write scope must be understood before it runs.

### 5.3 Regeneration order at an authorized checkpoint

**Export scope:** under the current repository policy, the iOS textbook package is an on-demand development snapshot. Every iOS generation, freshness check, view inspection, or distribution step mentioned in this plan applies only when iOS packaging is explicitly requested. It is not a routine notation-batch or final-PR requirement. Preserve historical snapshots; schedule current review-PDF exports only when included in the approved batch.

Run only affected stages, in the order below. These are future commands, not commands run by this planning task. The same live-source snapshot must underlie the entire completed checkpoint; later input changes require rechecking and rebuilding the affected descendants. Each row's check follows its write, and all affected checks run again against the final state.

| Order | Authorized write command | Required check and output |
| ---: | --- | --- |
| 1 | `node scripts/build-scene-graph.mjs --write --strict` | `node scripts/build-scene-graph.mjs --check --strict`; current graph, TOC data, and TOC Markdown for downstream consumers. |
| 2 | `node scripts/build-equation-mapping-corpus.mjs --write` | `node scripts/build-equation-mapping-corpus.mjs --check`; current equation registry and preserved source links. Recheck stage 1 after any source-link insertion and rerun affected stages if it changes their inputs. |
| 3 | `node scripts/build-textbook-md-pdf.mjs --write` | `node scripts/build-textbook-md-pdf.mjs --check`; current chapter and combined Markdown reading copies, including equation links. |
| 4 | `node scripts/build-textbook-review-pdfs.mjs --write` | `node scripts/build-textbook-review-pdfs.mjs --check`; current review PDFs and manifest. Inspect changed pages visually; a manifest check is not visual verification. |
| 5 | `node scripts/export-ios-textbook-package.mjs --write --strict` | `node scripts/export-ios-textbook-package.mjs --check --strict`; current reader package, links, and search data. |
| 6 | `node scripts/build-agent-startup-orientation.mjs --write` | `node scripts/build-agent-startup-orientation.mjs --check`; only when its declared inputs changed or its check reports drift. |

Plainly: update the map of the book, update the equation app's data, build the readable book copies, then package them for each reader. Run the checks again after the last input change; an earlier pass does not certify later edits.

Long PDF or package jobs follow the existing [heartbeat procedure](../../op/long-running-test-heartbeats.md). Missing tools, denied regeneration authority, or an unavailable distribution step leave that surface pending. Do not call the family complete by excluding a required output after the fact.

### 5.4 Acceptance checks for each completed family

1. **Coverage and mathematical meaning.** Reconcile every inventoried occurrence, including retained comparisons and provenance. Compare the old/new expressions under the approved mapping. Require unchanged units, mathematical type, physical layer, and claim grade for pure renames; independently justify any transformation.
2. **Stable identity and extraction.** Compare the equation ID sets and their source bindings. For a notation-only batch with no additions or removals, expect the same equation occurrence count and IDs. Inspect changes to symbol counts and meanings separately: different TeX tokenization can legitimately change symbol counts. Existing tests contain snapshot counts; update expectations only from a reviewed inventory change, never merely to obtain a pass.
3. **Focused app tests.** Run `node --test tests/equation-mapping-corpus.test.js tests/equation-mapping-runtime.test.js tests/equation-mapping-sidebar.test.js tests/equation-mapping-symbol-tooltip.test.js`. Extend these existing suites only where changed behavior has a meaningful coverage gap, especially ID preservation, curated/source agreement, local definitions, and draft/reset handling. Run `node --test tests/ios-textbook-link-routing.test.js` when the reader-link boundary is affected.

Plainly: unchanged equation counts and working pages are necessary checks, but they cannot tell us whether a symbol means the right thing. That requires the reviewed concept mapping and local definitions.

4. **Generated and broader checks.** Run the affected checks in Section 5.3 and the live `node scripts/check-content-integrity.mjs` entrypoint. Inspect its current coverage rather than assuming it checks every output; apply the on-demand iOS boundary in Section 5.3. Actual review-PDF freshness needs its separate check above. Use the live foundational-impact routing and branch/PR procedure for additional checks when the changed sources trigger them; this list is not a replacement for those owners.
5. **Reader inspection.** Programmatically inspect all affected records, then visually cover each changed rendering pattern: basic versus promoted page, vector and subscript forms, inline versus display math, tooltip with pointer and keyboard focus, long equations on narrow screens, search results, source-return links, and current PDF/iOS representations. Resolve every failed sample and expand inspection to related instances. A sample is evidence for those cases, not proof of every layout.
6. **Publication and delivery.** When publication is authorized, follow the live [branch/PR workflow](../../op/git/codex-pr-branch.md), including its exact-state validation receipt after final sources and staging. Publish sources, app code, and generated data as one consistent revision. Verify the served registry and app assets correspond to that revision; check normal reload as well as a fresh browser context for stale caching. Verify reader package distribution separately. Do not invent a deployment command or claim that local generation updates installed clients.

Plainly: check the files, then check the working app, then check what was actually delivered. Passing a generator check proves freshness against its inputs, not physical correctness or a completed deployment.

Record the final result per family here: approved mapping; completed paths; justified preserved uses; checks and inspected examples; pending regeneration/publication/distribution; and any new ambiguity. If a release problem requires reversal, use a reviewed change that restores the whole affected source/output family together and preserves unrelated work. Do not restore only the glossary or only the JSON.

### 5.5 Keeping the system current after migration

Use the same shorter loop for every later equation or notation edit:

1. Consult the owning glossary and style rule before choosing a symbol. Propose a canon change first when the desired meaning is not permitted.
2. Edit the equation and its local definitions together; preserve its existing app link. Check other active uses of that concept and any curated app representation in the same change.
3. Run existing source and generator checks during editing. Keep affected generated surfaces visibly pending until an authorized regeneration checkpoint; never silently publish mixed old/new notation.
4. At that checkpoint, regenerate the affected descendants in Section 5.3, run applicable tests, and inspect the changed reader surfaces. Include outputs in the same reviewed release.
5. Extend an existing notation check only when an approved rule can be checked reliably. Do not ban generic letters globally or treat a heuristic meaning guess as enforcement. Reuse the existing [Content Integrity workflow](../../../.github/workflows/content-integrity.yml); it detects generated drift but does not automatically repair or semantically validate it.
6. Refresh the occurrence inventory and census after approved symbol-family changes. Keep the canonical definitions in the existing guides; retain this file for decisions and transition history rather than letting it become a second current glossary.

Plainly: changing a formula includes maintaining its explanation and published copies. Existing checks tell us when copies are stale; an authorized rebuild and reader check finish the job. This is an editing and release discipline, not a new background automation.

## 6. Future Reader-Facing Explanation

Prefer a concise “How to Read the Notation” section in the existing [Mathematics Style Guide](../../../content/markdown/aaa/archie/mathematics-style-guide.md), definitions in [Mathematical Terminology](../../../content/markdown/aaa/archie/mathematics-terminology.md), and framework mappings in the [Comparative Glossary](../../../content/markdown/aaa/archie/comparative-glossary.md). Do not create another permanent guide unless these owners cannot meet the need.

Proposed reader copy, not an edit to the guides:

> This text keeps familiar mathematical notation wherever the quantity retains its familiar role. Central concepts have short, consistent symbols. A subscript distinguishes a different channel, event, or physical description when that distinction matters to the equation.
>
> Absolute time is written $T$, and a position in Euclidean space is written $\mathbf X$. An observer's reconstructed coordinates use $t_{\mathrm{eff}}$ and $x_{\mathrm{eff}}^i$. The primitive wake speed is $c_f$; other speed subscripts identify other propagation or calibration channels. Sharing units does not make two quantities identical.
>
> When a familiar physical concept is reframed, its definition and its relation to the familiar quantity are stated explicitly. A correspondence may be a definition, a derived result, or a recovery target. The same letter alone establishes none of these. Symbols are defined at introduction, and recurring quantities keep the same notation throughout the text.

Plainly: readers get stable notation and definitions, not migration history. Final wording must match approved decisions; reader-facing guides must not link back to this priority plan.

For Equation Mapping, distinguish source definitions, canonical definitions applied through explicit concept mappings, and unresolved fallbacks. The [generator](../../../scripts/build-equation-mapping-corpus.mjs) produces `source-context` and `shared-context` descriptions. Source-context detection is also heuristic: finding a nearby sentence does not verify the definition. Prefer precise definitions and source references over lists of possible meanings.

Plainly: a tooltip should explain this symbol in this equation. If the meaning is unresolved, say so rather than making vague text look authoritative.

## 7. Decisions Still Open

1. Complete the selected group velocity/internal-motion assessment and bring back the recommended direction with checked replacement candidates, every displaced use, and the exact source/output/verification scope. Retaining the approved group velocity meanings is preferred; an orbital spelling is not yet approved.
2. Resolve concrete conventional-use or mixed-context presentation questions only where the selected assessment encounters them. The Section 0.4 convention rule is accepted; the guides' document-level rule has not been amended by this planning review.
3. Keep xi shape/angle clearance deferred pending its definition/domain and displacement checks in Section 4.5. Reference-shape normalization is separate mathematical work. Keep current coordinate-layer qualifiers; general shortening remains deferred until representative examples justify reconsideration.

The approved-table decision review is complete; it is no longer an open task. Review the selected complete assessment one consequential choice at a time. The approved period and suppression transitions are completed work, not standing authority for additional edits. Further implementation is paused under Section 0; other candidate spellings are not authorized merely because they appear here.

**Closure goal:** choose notation together with a complete, conflict-checked plan for every displaced use; then authorize complete concept transitions across the corpus, app-equation, and all active consumers.
