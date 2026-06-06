# Children's Book Production Outputs

This folder contains generated production artifacts for the children's book workflow.

- `generation-manifest.json` tracks generated source illustrations.
- `source/<book>/` contains text-free generated source illustrations.
- `qa/<book>/` contains per-image QA records for palette, no text, one continuous scene, and lesson geometry.
- `pages/<book>/landscape/` contains first-draft reverse-band book pages.
- `pages/<book>/<book>-first-draft.pdf` combines the landscape first-draft pages.
- `derivatives/<book>/4x5/` contains feed portrait exports.
- `derivatives/<book>/9x16/` contains YouTube Shorts/TikTok exports.

Current production status:

- `here-there-back`: Electra/Poz manifest refreshed; stale Little One-era source images, QA records, landscape pages, PDF, and derivatives removed; 10 source images are planned and ready for generation.
- Other books have no current production images after the Electra/Poz manuscript refresh. Add them back to `generation-manifest.json` only after their current image prompts are approved.

Production target for the manuscript line:

- `224` core source illustrations: one cover/key-art image plus one source image for each story spread.
- up to `32` optional back-matter source images.
- `256` recommended full-series ceiling.
- layout crops, PDFs, 4:5 assets, and 9:16 assets are derivatives, not additional source illustrations.
