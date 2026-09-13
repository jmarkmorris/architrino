# CRW-005 — Comics hub review

## Scope and disposition

Full review of [Comics](../../../../content/markdown/aaa/archie/comics.md) and visual inspection of all 17 linked original images. No hub source edit is warranted: its description of visual jokes about claims, evidence, history, observation, and critique matches the inspected collection. No artwork was edited or generated. The coordinator separately inspected the two original images with follow-up concerns and agreed that those belong to the later leaf reviews.

Unchanged hub SHA-256: `ea9e192b9375ff215722b420a0a1b4b2ed402f981c668e422478cd5b7491c947`.

Only this receipt is a durable worker edit. Scoped `git --no-optional-locks status` showed no hub edits. Shared records and individual comic-leaf adjudication belong to the coordinator.

## Visual review

Each original was opened directly using `view_image`, in four batches: Nature Is Analog through Citation Needed; Old Alchemy through What Counts As Evidence; New Theory through First Page Problem; Observable Edge through We Need To Talk. The main dialogue, visual subject, and explanatory notes are readable in those views. Some decorative book titles and notebook marks are too small or stylized for rigorous transcription; no theorem or physical measurement is inferred from them.

The collection clearly uses personification, exaggerated academic situations, and metaphor. A speaking clipboard, evidence receipt, budget joke, or personified claim is not treated as a literal physical assertion. The candidate, residual, assumptions, and observer-boundary comics generally express the hub's methodological purpose without claiming completed substrate derivations.

## Comic-specific follow-ups, not hub defects

**COM-F1 — Nature Is Analog, mathematical notation ambiguity.** The original lists ket labels |0>, |1>, |+>, |−> with weights 0.62, 0.24, 0.11, 0.03 beneath a state symbol. With their standard qubit meanings, these are not four mutually orthogonal outcomes of one projective measurement. If read as probabilities for the separate Z and X measurements, each pair should sum to one; the depicted pairs sum to 0.86 and 0.14. The notebook's last entry appears as 0.3 rather than the board's 0.03. A different instrument/record interpretation would require an explicit convention; an unstated POVM should not be supplied by the reviewer. The intended discrete-record/continuous-dynamics distinction is sound as a conceptual comparison, but the decorative table is not a quantitative quantum example. Preserve the artwork and address this through leaf-source or caption clarification when that leaf is reviewed.

**COM-F2 — First Page Problem, chronological label order.** The scroll's rightward time sequence places CMB before BBN. Read as an effective cosmological chronology, nucleosynthesis precedes CMB last scattering. The coordinator visually confirmed that this is a timeline, not merely an unordered binder index. Preserve the artwork; identify the schematic-label limitation in the later leaf review rather than changing the hub or silently treating the order as correct.

These observations do not complete reviews of the leaf prose or authorize artwork revision. They establish no empirical failure of the theory. The remaining illustrations contain obvious schematic or humorous simplifications; this hub pass does not certify every small mathematical mark, attribution, or historical statement within each image.

## Focused checks

By `node .tmp/crw-005-comics-review/check.mjs`, following a known nested Markdown image-link pair and fenced-code exclusion case, all 34 image targets resolve: 17 full originals and 17 thumbnails. A separate PNG-header reader passes a known 2-by-3 fixture before reading target metadata; all 34 headers have the PNG signature, IHDR marker, and positive dimensions. Full originals additionally decode through the visual tool. Header validation alone is not full thumbnail decoding or visual comparison.

There is no TeX prose or display equation in the hub. No browser layout, mobile scaling, accessibility-completeness, thumbnail pixel-equivalence, publication freshness, or independent leaf-source audit was performed. Those limits do not invalidate the measured local target availability or the unchanged hub disposition.

## Asset preservation record

The following hashes bind the exact local images inspected or header-checked. They are preservation evidence, not scientific validation. Paths are relative to `content/assets/images/comics/`.

| Asset | Dimensions | SHA-256 |
| --- | --- | --- |
| `nature-is-analog.png` | 1254 × 1254 | `78c60b878cd18f63772170e9df267e673d9e89b5e5c9fabd3b69759254dfa6f2` |
| `thumbnails/nature-is-analog-thumb.png` | 360 × 360 | `2f688ec579cb8fbb1292561ab53d4b7b055e68b62c97493c9739a76636fcfce3` |
| `present-has-an-inbox.png` | 1254 × 1254 | `a13bccf6db7223dfded4fb6e610adb33f69e3d05c0c2903b32d3ff01dc9c06c2` |
| `thumbnails/present-has-an-inbox-thumb.png` | 360 × 360 | `bd43261f861ed326c8d65d8f0db1dc671971c2e66984fdce82343c94a60f62ad` |
| `group-project-assumption.png` | 1254 × 1254 | `120e08dd8f4a752edd89fa9ec596e996a8b077b160a34eb1a0594bb43b7d3a48` |
| `thumbnails/group-project-assumption-thumb.png` | 360 × 360 | `b2e0a38246bfedb4ef6ba06e67a3c86b702accf2f8a66cf8b5414972f84a642e` |
| `citation-needed.png` | 1536 × 1536 | `ac53708cf5efacadd64f59b5a627b1eeb248ca26e9a2914ebe5b36e50aa97b8c` |
| `thumbnails/citation-needed-thumb.png` | 360 × 360 | `f0808924bcdb9a68fb60abbefb2f96c47f06c588086942e0bfadf15d4a540c5d` |
| `old-alchemy-new-apparatus.png` | 1254 × 1254 | `062312b2fada66ed3296cffec78f948ab7928284a0b1852879abb8dcca9d6e6b` |
| `thumbnails/old-alchemy-new-apparatus-thumb.png` | 360 × 360 | `24d9c1716eae771975ab898b3c64f42ce06605df8198b774c2547a76a42b5b38` |
| `acknowledgements-in-architrinos-room.png` | 1254 × 1254 | `7d70977ca2a9b598a744ffe1b99b23e33dfbcdc629e0e3e2dc07f5db26ab9b58` |
| `thumbnails/acknowledgements-in-architrinos-room-thumb.png` | 360 × 360 | `93678c362f093e0d82e5eae9a579dafc95d4a54717b4dddf6039b89840e570b0` |
| `candidate-not-a-throne.png` | 1254 × 1254 | `b611b1391caea52c2a176c15d418c40c6ec03c2753c4bfcae25a7c11a6093617` |
| `thumbnails/candidate-not-a-throne-thumb.png` | 360 × 360 | `1caa86426fd6109f848e3cec1d56818b0f9d90c428ac09f0f006db0b48ceae20` |
| `what-counts-as-evidence.png` | 1254 × 1254 | `96d22edd3d50d7f16f0aec8844db35f5639f7d5bb59efb491cf640b184ac5836` |
| `thumbnails/what-counts-as-evidence-thumb.png` | 360 × 360 | `e4b9cd6cee835032676616070aed9b7548d7a2396873983aa55bcb37fc4bbcfc` |
| `new-theory-same-budget.png` | 1254 × 1254 | `78527437ce476ecc50986e711129eb5abd4a0eda44856153eecf9158b5e1a598` |
| `thumbnails/new-theory-same-budget-thumb.png` | 360 × 360 | `e0fb25eb992f18a2854df7a14f9790e88af372441468879cf00d208cd87dc9fb` |
| `show-the-residuals.png` | 1254 × 1254 | `c2122ddd3491eb4a06886dd40c5dcad7bad7f121f94ae1966bd71b322eceb8e1` |
| `thumbnails/show-the-residuals-thumb.png` | 360 × 360 | `d68d131951b8d9c19771b568b20346ae12cfe1b66a96c706aced108973254bfa` |
| `office-hours-for-a-claim.png` | 1254 × 1254 | `8dee922094edd54fae2acedf18207938ea2b3493249293679c7bbdad32e233e7` |
| `thumbnails/office-hours-for-a-claim-thumb.png` | 360 × 360 | `9f4e35bebd278562d42f50d580a80e35b5aede1d378549cac33a526394d81003` |
| `first-page-is-not-the-beginning.png` | 1536 × 1536 | `047befecfe0d91f83c969eddd825bbc106b8bea75c71c662ef0bb6c28a7021b1` |
| `thumbnails/first-page-is-not-the-beginning-thumb.png` | 360 × 360 | `5235f4f245789ee1192ce81dee5b618a734b272dcc7fbf6bb4d7c7b0188c7859` |
| `observable-edge-receipt.png` | 1536 × 1536 | `688fcf3f206f822c04149ddf3bd71676e4870d534828d6a6c8e7cb7e695fb090` |
| `thumbnails/observable-edge-receipt-thumb.png` | 360 × 360 | `a16faa998f14336c0fbec211e05e0c8e7638f63f02c96cb7a88b895b0bcef649` |
| `first-footage-not-birth-certificate.png` | 1536 × 1536 | `6762818769d59bdba195f8afa7557078baca2302c438a8fc5658f1e31da6852a` |
| `thumbnails/first-footage-not-birth-certificate-thumb.png` | 360 × 360 | `73490c2da8df68a4576d38591e3fa09b04f1a963bf0962d43a237a0af7ea067f` |
| `birthday-cake-for-observer-era.png` | 1536 × 1536 | `b54cb4a6c3495e3a775e7b0a8adf435da485009187a506ed75828c1befc73bc6` |
| `thumbnails/birthday-cake-for-observer-era-thumb.png` | 360 × 360 | `be6d7709923e9a072e8086681b0592f411f2015485a60eef0ecf6325703dce7e` |
| `four-theories-one-oval.png` | 1254 × 1254 | `05c7920d02f177b9ab1909b4e2e0eb6a83c48517c39bdbd42e169a820969e5ba` |
| `thumbnails/four-theories-one-oval-thumb.png` | 360 × 360 | `36f2f2bce80e8940125af47e716aa6d21d9a2db6b4353729dedd18131d183598` |
| `we-need-to-talk.png` | 1254 × 1254 | `1c12c28bc3322aa36a359278b2d76f73b733422075e89f7eb0e84713f2fa1995` |
| `thumbnails/we-need-to-talk-thumb.png` | 360 × 360 | `19f61b07d597afd1c9abd2a389473a30c25f816bb1baa97aa42f8658612294f6` |

No hub or asset bytes changed. COM-F1 and COM-F2 remain explicit leaf-review follow-ups; coordinator integration is separate.
