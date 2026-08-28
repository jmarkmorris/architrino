# Children's-Book Pilot: On-Demand Exports

The pilot preserves a successful production experiment, not a released product. Routine edits, PRs, and full web-content regeneration do not produce or publish these books. An explicit export request builds local review copies from the existing illustrations; it never invokes image generation.

## Preserved Inputs

- The [manuscripts](../README.md), [style guide](../style-guide.md), [layout specification](../text-layout-proposals.md), [approved exemplars](../exemplars.md), and [image prompts](prompts/README.md) remain tracked.
- All 111 text-free originals remain under `content/assets/images/archie/childrens-books/source/`. Prompts are not a substitute for these originals: a new image-generation run would not reproduce them exactly.
- [generation-manifest.json](generation-manifest.json) connects manuscripts, originals, QA, and optional export paths. Export statuses are always `on_demand`; running or removing local exports does not change the manifest.
- `qa/<book>/` retains the existing per-image records and decisions. Automated export checks never approve or rewrite these records.
- [pilot-appearance.json](pilot-appearance.json) preserves source hashes, rendered story text, RGB pixel hashes for every page format, PDF page order/content, font hashes, and the measured rendering environment. It was captured from the saved pilot before the on-demand migration, not from the rewritten exporter.

Plainly: keep the artwork and recipe; regenerate the deliverables. The appearance comparison proves reproduction of the saved pilot, not editorial, scientific, accessibility, or release approval.

## Export Commands

Run from the repository root with the shared Python environment. The dependencies are pinned in [tools/requirements.txt](../tools/requirements.txt); install them into that environment only when needed. The measured environment used Pillow 11.2.1 and FreeType 2.13.3. Page lettering requires the exact Georgia font recorded in the baseline; contact-sheet labels require the recorded Arial font. The default paths are the macOS supplemental fonts. Licensed copies elsewhere can be supplied with `--font` and `--review-font`. No font files are redistributed and no substitute is silently accepted.

Check preserved inputs without generating anything or requiring existing exports:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/learning-office/childrens-books/tools/build_generation_manifest.py --check
"${AAA_VENV:-../.venv}/bin/python" reference/learning-office/childrens-books/tools/render_book_pages.py --all --check
```

For a requested single-book export:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/learning-office/childrens-books/tools/render_book_pages.py --book here-there-back --write
"${AAA_VENV:-../.venv}/bin/python" reference/learning-office/childrens-books/tools/render_book_pages.py --book here-there-back --check-exports
```

For a requested full pilot export, replace `--book here-there-back` with `--all` in both commands. Each export checks sources and fonts before writing, renders the three page formats and PDF, compares against the frozen pilot, then builds the contact sheet and review HTML. Progress is printed per illustration. A failed comparison is a failed export, not a reason to update the baseline automatically.

Outputs are ignored under `.local-data/childrens-books/exports/<book>/`:

- `landscape/`: 1536 by 1024 reverse-band pages;
- `4x5/`: 1080 by 1350 portrait pages;
- `9x16/`: 1080 by 1920 vertical pages;
- `<book>-first-draft.pdf`: ordered landscape pages;
- `review/index.html` and `<book>-landscape-contact-sheet.jpg`: local appearance review.

The review HTML links back to tracked originals, QA, and manifest, so it is a local workspace review tool, not a standalone public site. Open it locally or inspect the PDF directly; do not expose the ignored export root through the public web deployment. The output directory is disposable after any needed review, but deletion is never part of the exporter.

## Changes and Verification

When an authorized manuscript/inventory change requires a manifest refresh, run `build_generation_manifest.py --write`, then its `--check`. Merely changing a prompt does not regenerate an illustration. Changes to source pixels or rendered text fail the frozen-pilot comparison and require a deliberate editorial decision and visual review. Do not replace the baseline to make a failed check pass.

After an explicitly reviewed appearance change, `pilot_appearance.py --capture-reviewed-baseline` can capture the reviewed exports. This is a separate operator-approved action, never part of routine rendering or PR regeneration. Preserve the previous baseline and review evidence through repository history.

Focused exporter regression tests:

```bash
"${AAA_VENV:-../.venv}/bin/python" -m unittest discover -s tests -p 'test_childrens_book_exports.py'
node --test tests/pr-branch-process-conformance.test.js
```

Pixel comparison covers all 333 page images. PDF comparison covers ordered page geometry, drawing instructions, and image streams; PDF creation timestamps are deliberately excluded. Visual review of rendered PDFs still checks readability, spacing, and clipping. Source-art QA decisions remain unchanged, including pending decisions.

## Preserved Pilot Inventory

| Book | Source illustrations / PDF pages |
| --- | ---: |
| Here, There, Back | 10 |
| Roll, Turn, Again | 12 |
| Nature Remembers Motion | 14 |
| Again Makes A Pattern | 14 |
| What Changed? | 14 |
| The Message That Traveled | 15 |
| Patterns That Hold | 15 |
| The Tiny Transceivers | 17 |
| Total | 111 |

Other manuscripts are preserved designs without a current production image set. They are not silently included in `--all`.

## Migration Receipt

The 2026-08-28 transition compares regenerated pages against the previously tracked pilot at commit `0fb575921783188ce528a45c671090e9ecc00464`. The 357 old generated files (322,983,095 bytes) are removed from tracked website/review paths and retained locally under `.local-data/childrens-books/preserved-pilot/`. The originals, exemplars, prompts, manuscripts, and QA records are not removed. This reduces the next repository tree, not existing Git history or remote storage immediately. Deploying those removals requires the normal PR process; this workflow change does not itself publish or purge a live website.

Measured verification: a fresh eight-book export reproduced all 333 page-image pixel hashes and all eight PDF content signatures (111 ordered pages). The archive's 357 files matched their Git blob hashes. Poppler-rendered page 2 from each PDF was visually inspected for legible text, spacing, and clipping; this sampling supplements the complete pixel/content comparison and does not constitute source-art QA approval.
