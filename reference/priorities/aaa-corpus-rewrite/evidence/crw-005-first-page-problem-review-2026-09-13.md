# CRW-005 First Page Problem review — 2026-09-13

## Scope and disposition

Full five-line [comic leaf](../../../../content/markdown/aaa/archie/comics/first-page-problem.md) read and [original artwork](../../../../content/assets/images/comics/first-page-is-not-the-beginning.png) visually inspected with `view_image`. Scoped `git --no-optional-locks status --short -- <leaf>` showed no pre-existing source modification. **Bounded repair:** two medium findings, FPP-01–FPP-02, addressed in a compact two-sentence caption. Image bytes, title, alt text, and original image links unchanged. Own leaf and this receipt only; no hub edits, image generation/modification, runtime/generated writes, or Git publication.

Final source SHA-256 by `shasum -a 256`: `fae37a975b7b29dc22c17faac85bddd4638564302ca98080be5fd35e1b99b606`.

Original artwork SHA-256 by `shasum -a 256`: `047befecfe0d91f83c969eddd825bbc106b8bea75c71c662ef0bb6c28a7021b1`.

## Findings and visual observations

| ID | Severity/disposition | Evidence and resolution |
| --- | --- | --- |
| FPP-01 | Medium — repaired | Original caption categorically denied that the first reconstructed page could coincide with a beginning. Limited observed/reconstructed coverage establishes neither a cosmic beginning nor an earlier history by itself. Replaced categorical denial with this inference boundary; the image's explicitly unbounded candidate history remains a proposal. |
| FPP-02 | Medium — repaired in caption | Original artwork places CMB before BBN along its rightward observer-window timeline, not only on binder tabs. This is not standard physical chronology. Caption explicitly calls the labels schematic and states that BBN precedes the CMB last-scattering epoch. Approved artwork was preserved as instructed. |
| FPP-P1 | Retained | Artwork depicts a student asking whether page one begins everything, a researcher distinguishing reconstruction from origin, and another making a birth-certificate/paperwork joke. Binder, scroll, observer window, uncertainty diagram, and cautionary notes coherently illustrate the intended inference distinction. |
| FPP-P2 | Retained with explicit limit | Scroll contains an unbounded candidate history with no-earlier/no-later-boundary labels. The new caption prevents these from being read as an empirically established earlier/later history. No claim of cosmological completion or refutation of standard observations follows. |
| FPP-P3 | Retained | Main dialogue, binder, scroll, and labels were readable in `view_image`. `sips -g pixelWidth -g pixelHeight` measured 1536×1536. No TeX expression or mathematical derivation requires a KaTeX or numerical test. This inspection does not certify every deployed device's rendering. |

## Primary verification and independent reasoning

[NASA's universe overview](https://science.nasa.gov/universe/overview/), sections “Big Bang and Nucleosynthesis” and “Recombination,” places nucleosynthesis in the first minutes and recombination/transparent propagation around 380,000 years. This supports only the effective standard-chronology ordering used in the caption; no inflationary history, absolute-origin claim, or simplified account of CMB production is imported from that page. The source was opened and the relevant sections read after targeted search. No experimental data or cosmological solver was rerun.

The inference check is logical: restricting two different admissible histories to the same observed interval can yield the same reconstructed record, whether one history has an earlier extension or terminates at the interval boundary. The restricted record alone therefore distinguishes neither possibility. This is not a proof that either candidate is dynamically admitted by the Architrino master equation; that requires separate continuation and observational recovery work.

## Validation and limits

A bounded Node link extractor first passed a known linked-image example with two matching image targets. Applied afterward, it returned three links: the new NASA reference and two identical original PNG targets, both confirmed to exist. `git diff --check HEAD -- <leaf>` passed. Receipt whitespace was checked separately with `git diff --no-index --check /dev/null <receipt>`.

No original-art correction is claimed: its CMB/BBN ordering remains visibly schematic and is corrected by the adjacent caption. The source is still five lines; no tutorial or theorem apparatus was added. No prior-editor attribution was attempted.

**FPP-O1:** Coordinator verifies final source/art hashes, propagates any necessary shared review disposition, and runs joined content checks. The hub has its own reviewer. This receipt does not establish cosmic origin, unbounded history, or browser/deployment acceptance.
