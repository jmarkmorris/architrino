# Banner Assets

This directory owns working material for reusable Architrino and Noether Braid banner families.

## Directories

- `working/` stores editable or source banner masters, review contact sheets, and design notes.
- `content/assets/images/brand/banners/` stores deployed banner PNGs that are safe to reference from public-facing surfaces.

Keep deployed files reproducible from a working master. When a banner family changes, update the working source first, regenerate the deployed sizes, and refresh the image manifest entries for the deployed files.

## Current Families

- `working/noether-braid-sea/` owns the first Noether Braid sea banner family, derived from the original `2048 x 1152` tiny-braid sea image.
- `working/noether-braid-crossing-wake-sheets/` owns the selected Crossing Wake Sheets path/wake banner family.
- `working/noether-braid-path-wake-candidates/` owns the active generated social banner candidates: red, purple, and blue path/wake fields designed to sit behind the Noether Braid profile logo.
- `working/noether-braid-profile-candidates/` owns a rejected generated social banner candidate snapshot.

## Regeneration

```bash
VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" scripts/art/build-noether-braid-banner-assets.py --write --contact-sheet
```
