# Campaign local-anchor navigation audit

Status: measured source-navigation validation, 2026-10-06 09:30 UTC; no mathematical acceptance or source repair. The Ramon E. Moore reference author inspected the actual reader contracts and ran the separately known-tested [anchor checker](../evidence/authorized-cases-ten-hour-reference-campaign-anchor-check.mjs). The exact selection is every current Markdown file whose basename starts `authorized-cases-ten-hour-` under the master-equation-closure owner. Native `rg --files --hidden --no-ignore` selected 388 Markdown files; marked/code/math-aware extraction found 44 local fragment links to 32 distinct file/fragment pairs. No selected source changed during the read. The [compact receipt](../evidence/authorized-cases-ten-hour-reference-campaign-anchor-v1-receipt.json) binds the full local inventory and every target digest.

## Actual navigation contracts

The main [Markdown reader](../../../../../src/runtime/MarkdownRuntime.js), SHA-256 `68b7baa88b1768fb6189f89826025837ee6eddd056222341d260d11847f70dd2`, decodes a fragment into a section key and calls the actual [Markdown policy helper](../../../../../src/services/MarkdownPolicyService.js), SHA-256 `271cb9e663c3a120bc332a666b3839a34338994c5784a63873ddbbc5ebb83eb2`. It normalizes punctuation to spaces and recognizes only level-two/three ATX headings plus its bold-numbered pseudoheading form. Repeated matching headings select the first occurrence. Explicit HTML/attribute IDs are not an alternate section-key mechanism. If no section matches, the reader renders the whole document; the file link still opens, but the intended section selection fails.

The [reference surface](../../../../../src/apps/reference/ReferenceSurfaceRuntime.js), SHA-256 `57e1bda53ec313b6725a5f15ce7e29a8a66728bbd5b0f031aa0e8c701d6dfed0`, uses markdown-it without an automatic heading-ID plugin and drops the fragment when rewriting a link to an indexed document. For files outside its index it leaves the original link. This audit therefore does not certify fragment scrolling in that surface, a generic browser, GitHub, or any other renderer. The source-index slugger is an indexing convention, not this reader's navigation contract. The existing local-link-file checker establishes file presence and supplies no contrary fragment guarantee.

## Measured result and four scoped defects

The actual section helper uniquely selects a real, non-code heading for 40 of the 44 links. No repeated-heading ambiguity or fenced-heading false match occurs in these 40 target pairs. Four links have no main-reader section match:

| Source and line | Existing target heading | Reason |
| --- | --- | --- |
| [A joint-phase theorem](authorized-cases-ten-hour-a-joint-phase-theorem.md), line 5 | Parent brainstorming line 704: `#### Package A — Maxwell E: move from repaired bounds toward physical fate` | Level four is unsupported by the section helper. |
| [B continuity candidate](authorized-cases-ten-hour-b-positive-parameter-continuity-candidate.md), line 19 | Parent elongated adjudication line 354: `### 7.4 The outward section and a radius-independent acceleration constant` | Fragment begins `74-`; the actual normalized heading begins `7 4`. |
| [B continuity assessment](authorized-cases-ten-hour-b-positive-parameter-continuity-assessment.md), line 33 | Same existing section 7.4 | Same numeric punctuation mismatch. |
| [D outgoing neighborhood](authorized-cases-ten-hour-d-outgoing-neighborhood-candidate.md), line 7 | Binary manuscript line 910: `### 5.24. The positive radial branch has Cartesian scattering neighborhoods` | Fragment begins `524-`; the actual normalized heading begins `5 24`. |

Manual `rg -n` inspection confirmed all three intended headings and their containing files. These are reader-specific navigation defects, not missing source evidence or theorem defects. Frozen sources remain unchanged. A renderer-independent repair cannot be inferred by silently applying a different slug convention.

## Controls, bindings and limits

The [known receipt](../evidence/authorized-cases-ten-hour-reference-campaign-anchor-known.json), SHA-256 `c47aec0f03ae07656428df14b16519fb08819a493e2f5c9ede9b52b67b6ed8e3`, was written before the target. It checks explicit IDs as unsupported, repeated headings and first selection, math/punctuation normalization, decimal-section mismatch, level-four rejection, actual-helper recognition of a fenced fake heading, and exclusion of fenced/inline link examples and math applications from link extraction. The target checker is SHA-256 `c9e82ada481683f682fa4fb3257e1e945bfc34e5d4b76b8285d35b281dbcd109`.

The compact receipt is SHA-256 `d51e8a15a09c9cc4ef6c95f157e7d991a2967c1a0d1a369dbf307a553081aa40`. Its local full receipt is `.local-data/master-equation-closure/binary-research/authorized-cases-ten-hour/reference/authorized-cases-ten-hour-reference-campaign-anchor-v1.json`, SHA-256 `7c634876df2cda94dfec650b634d0356bfa552edca71ecb70390d9f549b4f295`. The full receipt includes every selected source digest, resolved target digest, heading match and source line. Reproduction uses the frozen checker with `target NEW_UNIQUE_LABEL`, after its existing hash-bound known receipt; outputs are exclusive new files. Changes in source fragments, target headings or the two navigation implementations falsify applicability of this snapshot. Later files are outside it. The final all-file syntax snapshot remains held for the coordinator's edits-stopped signal.
