# CRW-005 — Licenses, Attribution & Source Use review

## Scope and disposition

Full-document review of [Licenses, Attribution & Source Use](../../../../content/markdown/aaa/archie/licenses-attributions.md). Two factual attribution details are repaired. The controlled rights/source policy, existing creator credits, and item-specific provenance remain intact. This is a bounded summary-to-source comparison, not legal advice, an enforceability decision, or an exhaustive asset compliance audit.

Baseline SHA-256: `53f3a9974199a612eb2ca394401bfbac78db17b3cf23c7c09dc11c518f83c42a`.

Final chapter SHA-256: `e64e4749e3917cce3197125481f6dda4c0b7c3b2192b06f9651742e812364ce7`.

The initial scoped `git --no-optional-locks status --short` showed no chapter edit. Worker ownership is this chapter and receipt only; the coordinator owns shared integration.

## Findings and repairs

**LA-01 — Low severity, Three.js revision-specific license reference.** Direct reading of [the bundled module](../../../../vendor/three/three.module.js) found revision 161 and its 2010–2023 copyright header. The page instead linked the upstream r152 license. The [official r161 license](https://github.com/mrdoob/three.js/blob/r161/LICENSE), independently retrieved on 2026-09-13, states MIT and 2010–2024. The corrected entry links r161 and accurately names both the bundled header and upstream notice. It does not rewrite the vendor file, assert byte identity with upstream, or infer the precise provenance of the separate CSS2DRenderer file from its local import alone. The latter's source was inspected and imports the local Three.js module.

**LA-02 — Low severity, Standard Model image version distinction.** The [image manifest](../../../../content/assets/images/images.json), record `standard-model-elementary-particles`, distinguishes Cush's current public-domain version from MissMJ's original CC BY 3.0 version. The [creator's Commons source page](https://commons.wikimedia.org/wiki/File:Standard_Model_of_Elementary_Particles.svg), licensing sections independently retrieved on 2026-09-13, makes that same distinction. The page now states it explicitly while retaining both creators, the CC BY 3.0 link, and the manifest pointer. No downstream rights determination is inferred.

## Other evidence inspected

- The complete repository [LICENSE](../../../../LICENSE) supports the project-authored code and associated-document MIT summary and copyright identity. The About Architrino source-selection and disclosure sections support the page's separation of editorial reference policy and item-specific rights requirements.
- The complete [production audio SOURCE](../../../../src/apps/greek-letter-match/audio/SOURCE.md) supports the 24-recording scope, pinned model, Marin instruction distinction, and restricted CC0 dedication. [Official CC0 legal code](https://creativecommons.org/publicdomain/zero/1.0/legalcode.en) supports the waiver/fallback structure and excluded-rights distinction. No new audio generation or byte-parity certification was performed.
- [PDG's official API license section](https://pdgapi.lbl.gov/doc/schema.html#license) supports edition-dependent licensing and CC BY 4.0 beginning with 2024. [Bowserinator's upstream LICENSE](https://github.com/Bowserinator/Periodic-Table-JSON/blob/master/LICENSE.md) identifies CC BY-SA 3.0. Official [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) and [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) summaries were inspected for the stated attribution and ShareAlike distinctions.
- The [U.S. Copyright Office fair-use index](https://www.copyright.gov/fair-use/) supports the existing statement that educational purpose alone does not determine fair use. No item-specific fair-use judgment was made.
- The named nuclear/atomic, detector/event, tree-of-life, Solvay, Plato, spectrum and brand summaries were compared with the manifest's creator/license fields. Apart from LA-02, those inspected summaries agree with the declared records. Category pointers for portraits, observatories and comics remain category pointers, not certification of every underlying rights record. A known synthetic selection case passed before the manifest selector ran; an unmatched literal id was not treated as a missing asset because the source target paths are the relevant link obligation.
- Bundled Mermaid and KaTeX license notices, Mermaid provenance/version, and the markdown-it MIT header agree with the page. The Molecule app's lookup policy names PubChem PUG REST. No live molecule lookup or complete vendor provenance audit was performed.

## Focused checks and remaining limits

The Markdown checker passed known cases before target use, including fenced-code exclusion and valid/invalid KaTeX inputs. The final target has 81 link occurrences, of which all 37 local occurrences resolve by filesystem existence checks. All headings remain; there are zero mathematical spans, displays, and equation-viewer links. `git diff --check` passes for the chapter; the new receipt also passes its whitespace check. The final source diff comprises the two described attribution paragraphs only.

No remote-link sweep, full manifest verification, image hash audit, license acquisition campaign, runtime/vendor edit, generated write, or Git mutation was performed. Primary-source retrieval was selective and supports the specified comparisons only. The current page does not establish that each historical import was lawful or each downstream use is permitted. A changed local module revision, a source notice contradicting an entry, or a demonstrated mismatch between a named asset and its declared record would overturn the relevant finding. No unresolved factual ambiguity requires changing policy in this bounded pass; the precise CSS2DRenderer upstream revision remains unestablished here. Coordinator adjudication and integration remain separate.
