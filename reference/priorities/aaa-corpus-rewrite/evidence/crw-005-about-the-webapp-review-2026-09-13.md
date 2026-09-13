# CRW-005 About the Webapp bounded review — 2026-09-13

## Scope and outcome

Full 129-line [About the Webapp](../../../../content/markdown/aaa/archie/about-the-webapp.md) read. Scoped `git --no-optional-locks status --short -- <chapter>` showed no chapter modification before work. Own chapter plus this receipt only; coordinator integrates shared records. Existing architecture and Core policy preserved. No runtime, generated, neighboring corpus, or Git publication writes performed.

**Disposition:** two bounded medium-severity clarifications, AW-01–AW-02; other reviewed claims retained at implementation-supported or normative scope. This is a documentation review from source inspection, not a deployed-browser acceptance test or scientific validation.

Final source SHA-256 by `shasum -a 256 content/markdown/aaa/archie/about-the-webapp.md`: `b1d85b59bec6d5432277e6f811f0a465466befa4acb0609c6ba69feeb2d2b254`.

## Findings and dispositions

| ID | Severity/disposition | Evidence and resolution |
| --- | --- | --- |
| AW-01 | Medium — repaired | Unqualified Borg run-start wording omitted execution-service availability. [BorgEomHttpClient.js](../../../../src/apps/borg/BorgEomHttpClient.js) posts retained-history requests to `/api/eom/borg-shadow/v0`; [local development server](../../../../scripts/dev/start-local-dev.mjs) creates the compiled EOM process client, serializes requests, and returns not-found when disabled. [BorgBootstrap.js](../../../../src/apps/borg/BorgBootstrap.js) separates EOM service execution and recorded replay. Chapter now says run starts require the local EOM service, while the browser inspects/replays. No browser-only scientific solver is asserted. |
| AW-02 | Medium — repaired | Feedback wording could imply automatic form opening or submission. [FeedbackManifestRuntime.js](../../../../src/apps/feedback/FeedbackManifestRuntime.js), build/render functions, constructs a visible local summary, provides an explicit copy control, and sets an ordinary GitHub issue link. Chapter now instructs review/copy and reader-initiated opening, with optional inclusion. Existing privacy policy remains intact. |
| AW-P1 | Retained | [Applications manifest](../../../../content/scenes/archie/applications.json) lists exactly 14 objects in the prose order. Its child routes and `order: objects` were read. Inclusion remains expressly independent of evidence/proof grade. |
| AW-P2 | Retained | Scene graph, Markdown manifests, and runtime rendering claims are supported by [ArchitrinoSceneAppRuntime.js](../../../../src/apps/architrino/ArchitrinoSceneAppRuntime.js), [MarkdownManifestService.js](../../../../src/services/MarkdownManifestService.js), [SceneGraphManifestService.js](../../../../src/services/SceneGraphManifestService.js), and [MarkdownRuntime.js](../../../../src/runtime/MarkdownRuntime.js). These are implementation paths, not live deployed network measurements. |
| AW-P3 | Retained | [Graph builder](../../../../scripts/build-scene-graph.mjs), periodic-grid and element-legend sections, explicitly emits runtime-generated edges. No generator was run in write mode and no manifest freshness claim is made. |
| AW-P4 | Retained | [index.html](../../../../index.html) includes KaTeX, Markdown-it, and Mermaid assets; [MermaidMarkdownRuntime.js](../../../../src/runtime/MermaidMarkdownRuntime.js) selects fenced Mermaid source; Architrino runtime constructs Three WebGL/CSS2D renderers and Markdown-it. [MoleculeRuntime.js](../../../../src/apps/molecule/MoleculeRuntime.js) uses PubChem formula-to-CID lookup, properties, and 3D/2D SDF retrieval. [pdgfeed.py](../../../../scripts/pdg/pdgfeed.py) supplies local Python ingestion entrypoints. No external PubChem request or Python execution was made. |
| AW-P5 | Retained normative scope | Headless AAA Core wording matches [software architecture policy](../../../../content/markdown/aaa/archie/software-architecture-and-maintenance.md), including service contracts and app-owned browser composition. No new normative policy was introduced and no global absence-of-consumers claim is made. |
| AW-P6 | Retained | Animator's recorded-output controls and playback runtime distinguish authored scenes and accepted recorded data. “Accepted” remains recorded-output admission, not scientific certification. The chapter explicitly separates application inclusion from proof grade. |

## Validation and limits

- `node .tmp/crw-005-about-webapp/check.cjs` first passed a known two-link example containing a document and image, then confirmed **all 11 original targets unchanged, 9 local targets existing, and all 16 headings unchanged**. External links and mailto were excluded from filesystem checks; fragment behavior and QR decoding were not tested.
- The same instrument first passed a known ordered two-object manifest, then checked the real manifest's **14 titles in prose order**, normalizing only straight versus typographic apostrophe. This is independent comparison between authored scene data and prose, not an application functionality test.
- `git diff --check HEAD -- content/markdown/aaa/archie/about-the-webapp.md` passed. The source contains no mathematical derivation requiring numerical verification; no extra runtime tests were introduced for two prose clarifications.
- Source code paths were read at the referenced behavior, not exhaustively audited. No browser was launched, server started, EOM run dispatched, public issue opened, message sent, or external service availability certified. Public-site deployment equality and all-app usability are outside this receipt.
- Initial guessed paths for Borg/server files did not exist; `rg --files` resolved the actual paths before reasoning or editing. A failed path lookup was not treated as missing functionality.
- Prior-editor causation was not investigated. The two ambiguities are documented from current bytes and implementation, with no attribution to Claude or another editor.

## Open obligations

**AW-O1:** Coordinator verifies final bytes, reconciles source fingerprints, and runs joined corpus validation. Any generated source digest changes remain for the authorized generator/publication procedure.

**AW-O2:** A claim that the public deployment currently supports every described interaction would require a separate browser/deployment check. This review establishes bounded documentation consistency with inspected implementation only. A differing run service or user workflow would overturn the corresponding implementation reading and should be checked in the named paths.
