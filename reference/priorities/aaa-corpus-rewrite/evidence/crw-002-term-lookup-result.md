# CRW-002 Term Lookup and Orientation Result

Date: 2026-09-04

## Result

CRW-002 now gives a reader an explicit term-lookup route from every scene and document: a persistent `Glossary` action opens the rendered Comparative Glossary, whose first column now includes the load-bearing foundational terms that the audit found missing. Authored Markdown links to named headings open the owning section directly rather than discarding the heading and leaving the reader to search the destination page. Closing a document-only reading scene returns through scene history, or Home when the document was opened directly, instead of exposing its empty canvas. A render-time term decorator is declined because a real-corpus prototype produced a 33.3% false-positive rate on an ambiguity-stratified sample. Two already-converted passages received narrow inline clues because their opening arguments depend immediately on the meaning of causal wake, causal root, and polarity.

Claim grade: `measured` for the implemented route, glossary rows, source diffs, focused tests, and live browser behavior; `inferred` for the editorial judgment that the two inline clues are sufficient within CRW-002's narrow scope. Falsifier: an arbitrary scene or document from which the Glossary control is absent or cannot open the glossary, a missing audited first-column term, a changed claim boundary in the edited prose, or another already-converted passage whose argument cannot be followed without an immediate definition.

## Files changed

- [`content/markdown/aaa/archie/comparative-glossary.md`](../../../../content/markdown/aaa/archie/comparative-glossary.md) adds first-class rows for `Wake`, `Causal Root`, `Complete State / Universe State`, `Polarity`, `Physical Observer`, and `Worldline`.
- [`src/apps/architrino/ArchitrinoSceneAppRuntime.js`](../../../../src/apps/architrino/ArchitrinoSceneAppRuntime.js) adds the persistent `documents`-kind Glossary action after Search and routes it to `content/scenes/archie/glossary.json` through ordinary scene history.
- [`src/runtime/MarkdownRuntime.js`](../../../../src/runtime/MarkdownRuntime.js) preserves authored Markdown heading fragments and routes them through the existing section-reader identity.
- [`src/runtime/ScenePanelUiRuntime.js`](../../../../src/runtime/ScenePanelUiRuntime.js) distinguishes document-only scenes from document overlays and gives every close path the same return-or-reveal behavior.
- [`src/services/MarkdownSceneRegistryService.js`](../../../../src/services/MarkdownSceneRegistryService.js) gives fragment-routed section scenes a readable title.
- [`tests/scene-hud-toolbar-order.test.js`](../../../../tests/scene-hud-toolbar-order.test.js) locks the sixth action's order, identifier, accessible label, and generated rather than static ownership.
- [`tests/markdown-runtime-layout.test.js`](../../../../tests/markdown-runtime-layout.test.js) covers heading-fragment routing and document-only close return behavior; [`tests/markdown-scene-registry.test.js`](../../../../tests/markdown-scene-registry.test.js) covers the readable section-scene identity.
- [`content/markdown/aaa/archie/navigation-and-controls.md`](../../../../content/markdown/aaa/archie/navigation-and-controls.md) documents term lookup in Quick Start and Interface Controls.
- [`content/markdown/aaa/noether-braid/2d-braid-assemblies.md`](../../../../content/markdown/aaa/noether-braid/2d-braid-assemblies.md) defines and links the causal-root ledger and polarity where the opening result depends on both.
- [`content/markdown/aaa/noether-braid/braid-analysis-methodology.md`](../../../../content/markdown/aaa/noether-braid/braid-analysis-methodology.md) defines and links the causal-wake formula where the method is introduced.
- [`conversion-ledger.md`](conversion-ledger.md) records both new reader-support documents and the two later CRW-002 clue additions without word counts.

## Glossary first-column audit

The audit read the first column of the primary glossary table separately from the definitions. It then compared that visible lookup surface with the nine current foundation documents. `Wake` and `Causal Root` were absent as required by the dispatch. Four other repeatedly introduced foundation terms were likewise absent as reader-scannable first-column entries: `Polarity`, `Worldline`, `Physical Observer`, and `Complete State / Universe State`. All six are now present.

The new rows preserve the foundation layer boundaries. Wake, polarity, and worldline are substrate-level terms. A causal root is a derived delayed-dynamics record and is not itself an acceleration, equilibrium, or stability result. A Physical Observer is an observer-access role rather than substrate ontology. The complete state is the ontic substrate record from which such an observer accesses only a constrained projection.

Claim grade: `measured` for first-column presence and `derived` for the layer classifications transferred from the foundation documents. Falsifier: a first-column scan that fails to find any new row, or a cited foundation passage that assigns one of these terms a different layer or stronger claim.

## Reachability decision

The persistent toolbar was selected over the textbook table of contents. The [UI Guidelines](../../../../content/markdown/aaa/archie/ui-guidelines.md) settle the placement: global navigation buttons have the stable order TOC, Back, Forward, Home, Search, then optional document-entry actions. The Glossary control occupies that first optional slot, uses the centrally owned documents icon, has the accessible label `Open comparative glossary`, and remains present when the reader arrives directly from an external link or search result.

This satisfies the stable global ordering, icon-only control, hit-target, and screen-reader naming rules. It slightly strains toolbar density because a sixth control permanently occupies the app's most-used chrome. It does not move an open-document operation out of the reading-surface header: the action opens a separate reference document and is therefore the optional document-entry case named by the global rule.

Definition links retain their declared heading target. The runtime opens the owning section as a normal history-bearing reading scene, so the definition is visible immediately and no `Cmd/Ctrl + F` step is required. The reading-surface close action is conditional: it returns through Back only when hiding the panel would leave a document-only scene with no visible objects; direct document entry falls back to Home, while Markdown over a populated scene remains dismissible in place.

Claim grade: `derived` from the accepted UI rule and `measured` by source inspection and live browser QA. Falsifier: a UI-guide rule that reserves the post-Search optional slot for another meaning, or a supported viewport where the added action hides, overlaps, or prevents use of another global control.

## Render-time decorator prototype

The prototype was read-only; no decorator implementation was added. It parsed 113 usable plain-text labels from the primary glossary table after removing TeX-only and trailing parenthetical qualifiers. It then selected 12 corpus documents at evenly spaced positions in the sorted 199-document list and searched eligible prose with these rules:

- case-insensitive exact forms;
- no plural or possessive expansion;
- longest labels first so `Causal Wake` wins over `Wake` at the same position;
- no matches in headings, tables, fenced or inline code, TeX, or authored links; and
- no match inside a hyphenated or alphanumeric compound.

The 12-document run found 143 candidate first-occurrence decorations covering 49 distinct labels. That count establishes only the reach of the matching rule; it does not establish semantic correctness.

The ambiguity test separately collected every eligible exact-form occurrence for six deliberately difficult terms across all 199 corpus documents, selected five evenly spaced contexts from each sorted hit list, and classified the resulting 30 contexts by reading the source passage.

| Term | Eligible contexts | Sampled | False positives | Observed ambiguity |
| --- | ---: | ---: | ---: | --- |
| `assembly` | 1,496 | 5 | 0 | All five referred to an Architrino assembly. |
| `binary` | 463 | 5 | 2 | `binary outcomes` and `binary completeness ratios` were ordinary mathematical uses. |
| `wake` | 945 | 5 | 0 | All five referred to causal-wake structure or bookkeeping. |
| `field` | 567 | 5 | 5 | The sample included an academic field, standard/effective fields, and reduced continuum variables rather than the glossary's default substrate-term warning. |
| `reaction` | 261 | 5 | 0 | All five were Architrino reaction-channel uses. |
| `background` | 273 | 5 | 3 | CMB/background expansion and experimental background subtraction were not the fixed ontological background. |
| **Total** |  | **30** | **10** | **33.3% false positives.** |

The prototype therefore settles longest-match ordering but fails the semantic-disambiguation burden. Exact-only matching also avoids false inflections by missing `wakes`, `Wake's`, and similar forms, which makes the coverage incomplete rather than safely extensible.

Recommendation: **decline the render-time decorator.** If automated term-link assistance is reconsidered, retain only an offline context-aware classifier that reads the surrounding sentence or paragraph and proposes a specific glossary link, no link, or a terminology correction for human acceptance. It must not run autonomously during rendering or write links without review. No classifier prototype, all-document run, or corpus-wide link insertion is approved.

Claim grade: `measured` by the inline Node source scanner over the named domains plus manual semantic classification of the 30 selected contexts. Falsifier: an independent classification of the same sampled passages that materially changes the observed 10-of-30 false-positive count. The implementation boundary may be superseded only by a later operator decision.

## Repeat scan and selective inline clues

The original 70-document result is preserved in the queue, but its term list, parser, command, and file list were not preserved in the repository. Its exact count therefore cannot be reproduced or treated as a before-and-after baseline.

A replacement current-state scan covered all 149 corpus documents outside `archie/` and `foundations/`. It searched eligible prose for `Architrino`, `Wake`, `Causal Root`, `Polarity`, `Worldline`, `Physical Observer`, `Complete State`, `Path History`, `Absolute Time`, and `Euclidean Void`, then selected documents containing at least one term and no authored link into `foundations/`. The exclusions matched the decorator prototype. The scan returned 113 candidate documents. This is a new, explicitly scoped measurement, not evidence that the earlier 70 increased to 113.

The manual passage audit then concentrated on the highest-use documents already recorded as converted, because unconverted documents remain under CRW-003 criterion 8. It found two opening arguments that require an immediate clue:

- `2d-braid-assemblies.md` turns immediately on what a complete causal-root ledger records and how polarity controls the fold mechanism.
- `braid-analysis-methodology.md` defines its comparison protocol through one common causal-wake formula.

Those passages now carry concise definitions and links. The high-use spatial-braid opening already routes its unfamiliar taxonomy and retention concepts to their owning documents; its later foundational vocabulary did not require a new CRW-002 clue once the persistent glossary route existed. No broad document sweep was performed.

Claim grade: `measured` for the 149-file domain and 113 candidates; `inferred` for the two-passage load-bearing judgment. Falsifier: recovery of the original scan specification that yields a comparable repeat, or a reviewed already-converted passage where understanding the next claim depends on a foundational term that still lacks both local explanation and an adequate owning link.

## Later glossary canon review

The dispatch initially barred side-effect corrections to six pre-existing rows. A later operator-approved canon review compared those rows with their current foundation and spacetime owners and corrected them:

- `Absolute Frame / Preferred Frame` now distinguishes complete-state identification of the Euclidean-void rest frame from the still-open question of preferred-frame leakage to embedded Physical Observers.
- `Absolute Time` now uses canonical $T$ and separates absolute simultaneity and duration from derived assembly-clock readouts and synchronization procedures.
- `Causal Cone` now distinguishes the filled reachability region from the spherical boundary that carries actual wake support.
- `Causal Wake` now names a continuously emitted, transmitter-dependent physical causal record and excludes material-shell, fluid, and independently specifiable field-substance readings.
- `Effective Metric` now states the shared Noether sea and Physical Observer reconstruction while retaining the constitutive map and general-relativistic benchmark agreement as closure targets.
- `Spacetime Medium` now identifies itself as a bridge term for the Noether sea and retains effective-metric and inertial-response maps as open constitutive recovery problems.

Claim grade: `derived` by direct comparison with the controlling canon passages in `foundations/detecting-the-absolute-frame.md`, `foundations/absolute-time.md`, `foundations/absolute-timespace.md`, `foundations/architrino.md`, `spacetime/emergent-metric.md`, and `spacetime/noether-sea.md`. Falsifier: a controlling owner passage that establishes observer-level frame hiding, the complete shared-record metric map, or the inertial-response map at a stronger completed claim level.

## Validation and generated drift

- `git diff --check` passed on each CRW-002 edit batch.
- `node --test tests/top-dynamic-control-bar-runtime.test.js tests/scene-hud-toolbar-order.test.js` passed 10 tests with zero failures.
- `node scripts/validate-equation-mapping-links.mjs` passed all 23 registered canonical-source equation links.
- `node scripts/validate-content.mjs --check --strict` reported zero errors and zero warnings.
- Live QA at `http://127.0.0.1:5173/` showed the accessible `Open comparative glossary` button in sixth position, opened the rendered Comparative Glossary with the new entries, and returned to the prior root scene through Back.
- `node scripts/build-scene-graph.mjs --check --strict` reported zero errors and zero warnings, with existing drift in `content/graph/textbook_toc.json` and `content/generated/markdown/textbook/toc.md`.
- `node scripts/build-textbook-md-pdf.mjs --check` reported zero errors and zero warnings, with twelve stale reading copies: the aggregate textbook plus Foundations, Dynamics, Noether Braid, Noether Sea and Effective Spacetime, Standard Model Assemblies, Atomic and Nuclear Assemblies, Reactions, Quantum, Cosmology, Validation, and Philosophy-History.

No generator was run with `--write`. The authorized regeneration commands for the final branch process remain `node scripts/build-scene-graph.mjs --write` and `node scripts/build-textbook-md-pdf.mjs --write`.

Claim grade: `measured` by the named commands and live browser instrument. Falsifier: rerunning any command against the same working state and obtaining a different outcome, or a browser session in which the control does not complete the stated route.

## Open items

- The original 70-document measurement remains non-reproducible from repository evidence because its exact specification was not retained. The explicit 149-document replacement scan should be used for any future comparison unless the original specification is recovered.
- Generated textbook navigation and reading copies remain stale by policy and await authorized regeneration or the final branch process.

Closure goal: met for CRW-002 — a reader who lands on an arbitrary corpus document can resolve an unfamiliar $\mathbb{A}\mathbb{A}\mathbb{A}$ term through an explicit persistent Glossary control without knowing in advance that the glossary exists; a precise definition link lands on its owning section, closing a document-only route returns to useful context rather than a blank canvas, and the reviewed glossary rows preserve their controlling claim boundaries.
