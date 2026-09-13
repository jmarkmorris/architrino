# CRW-005 Candidate, Not A Throne review — 2026-09-13

## Scope and disposition

Full five-line [comic leaf](../../../../content/markdown/aaa/archie/comics/candidate-not-a-throne.md) read and [original artwork](../../../../content/assets/images/comics/candidate-not-a-throne.png) visually inspected with `view_image`. Scoped `git --no-optional-locks status --short -- <leaf>` showed no source modification before review. Own leaf and this receipt only. **Unchanged pass:** no warranted source or image correction; no artwork generation, runtime/generated writes, neighboring edits, or Git publication performed.

Source SHA-256 by `shasum -a 256`: `f18905aee986e14172def1d9176abb37f0c9b9db3ce1efda5585aad43c9cb860`.

Artwork SHA-256 by `shasum -a 256`: `b611b1391caea52c2a176c15d418c40c6ec03c2753c4bfcae25a7c11a6093617`.

## Findings and observations

| ID | Disposition | Observation and reason |
| --- | --- | --- |
| CNT-P1 | Retained | Caption treats a candidate as provisional and subject to proof, simulation, or validation. It does not assert that one simulation proves a theory or that the illustrated mechanism is established. |
| CNT-P2 | Retained | Artwork shows three researchers discussing an SMBH jet mechanism candidate, an accretion-disk/jet sketch, question-mark labels for outflow, disk coupling, magnetic collimation, radiation feedback, composition/energy budget, and sub-grid physics. These are unresolved observer-level questions in a sketch, not imported substrate laws. |
| CNT-P3 | Retained | Visible dialogue contrasts an interesting mechanism with the need for a test rather than a throne. A held candidate sign, proof-burden folder marked not yet, robustness/model-comparison checklist, and open-question notebook reinforce the caption. The humor is coherent and honestly provisional. |
| CNT-P4 | Retained | `view_image` showed readable main title, labels, speech bubbles, and foreground paperwork. `sips -g pixelWidth -g pixelHeight` measured 1254×1254 pixels. No clipping or contradiction requiring alteration was observed at this inspection scale; no claim of cross-device rendered legibility is made. |
| CNT-P5 | Retained | Linked-image alt text matches the title; both relative image targets match and resolve to the original PNG. No mathematical display or TeX expression requires equation validation. Peripheral mathematical-looking symbols are visual jokes or decorative notation, not derivations. |

## Checks, limits, and handoff

A bounded Node link extractor first passed a linked-image example with both targets `x.png` as a known case returning two identical targets. Applied afterward to the leaf, it returned two matching targets and confirmed both resolve to the original image. `git diff --check HEAD -- <leaf>` passed without source changes; receipt whitespace was separately checked with `git diff --no-index --check /dev/null <receipt>`.

This review is full-source and original-image inspection, not deployed browser testing, astronomy-source verification, or proof of a jet mechanism. Humor was evaluated as humor; no claim grade was promoted. Original art, source, title, and links were preserved. Prior-editor causation was not investigated.

**CNT-O1:** Coordinator integrates the unchanged disposition and verifies source/art hashes. Different artwork bytes, changed targets, or later prose asserting the candidate is established would invalidate this bounded pass. No further leaf edit is proposed.
