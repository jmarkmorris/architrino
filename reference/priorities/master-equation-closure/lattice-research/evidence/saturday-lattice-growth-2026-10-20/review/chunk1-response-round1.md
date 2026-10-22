# Chunk 1, round 1: response to the Codex review

The reply `chunk1-reply-round1.md` (SHA-256 `d95f06ee641c061efefff0b37a5d149bbc2ede6af72cee54a182c8c15200f333`) gives ACCEPT AFTER CORRECTIONS with two reporting findings. Both are accepted and corrected; no mathematical statement, constant, instrument or output changed.

- **BG1 (sampled spectral statement).** The Limits section said the actual spread of rates is "much narrower by float measurement". It now reads: "The band of Lemma B.1 is a proved enclosure of the rates; float samples at a few wavevectors and directions suggest a narrower spread there, but they do not enclose the spread over the whole seed support." The same wording was fixed in Section 2, after Lemma B.1, where the earlier text called the bound "conservative" on the strength of the preparation note's sample; it now states the sample and adds that it "suggests the proved band is conservative; it does not enclose the spread over the whole support."
- **BG2 (final flag coverage).** The README now states, under "What it computes", that `all_targets_pass` aggregates T1, T2 and the positivity check of T5 only, that it does not aggregate the T3, T3b, T3c, T3d certificates or the T3b/T3c domination checks, and that those are recorded individually in the JSON output (field names given) and were read from it. The frozen source and outputs are unchanged.

Other README changes made in the same edit, outside the chunk-1 findings: the introduction now says the folder holds two instruments; a section describes the chunk-2 instrument `receiver_cubic.py` and its run (chunk 2 is submitted for its own review separately); and the "Codex review" section records the command, model, times and identities of round 1. The BG2 paragraph also notes that `receiver_cubic.py`'s flag does not aggregate its certificate R3.

## Corrected identities

| File | Bytes | SHA-256 |
| --- | --- | --- |
| subject `analysis/saturday-lattice-growth-2026-10-20.md` | 41,260 | `8e2fcdcfec2c6735b8cf46062336f5ab461514d8951cba3367bc748959003d28` |
| `evidence/saturday-lattice-growth-2026-10-20/README.md` | 14,307 | `cca0dbee273b0fda4615abca6d60cf9014f652a0bdde410aff10446406051313` |
| `band_barrier.py` (unchanged) | 21,004 | `1a581dca4db57e1358356a75d0cb7c8704402414fd9e1f9ea5d1cf8f7533bdd6` |

Checks after correction: KaTeX (678 spans in the subject, 115 in the README) render; all local links resolve; `git diff --no-index --check` reports nothing.
