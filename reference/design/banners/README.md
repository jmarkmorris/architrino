# Banner Assets

This directory owns working material for reusable Architrino and Noether Braid banner families.

## Directories

- `working/` stores editable or source banner masters, review contact sheets, and design notes.
- `content/assets/images/brand/banners/` stores deployed banner PNGs that are safe to reference from public-facing surfaces.

Keep deployed files reproducible from a working master. When a banner family changes, update the working source first, regenerate the deployed sizes, and refresh the image manifest entries for the deployed files.

## Current Families

- `history/historical-noether-braid-sea/` preserves the first Noether Braid sea banner family as a non-default design record.
- `working/noether-braid-crossing-wake-sheets/` owns the selected Crossing Wake Sheets path/wake banner family.
- `working/noether-braid-path-wake-candidates/` preserves review alternatives to the selected social-banner direction.
- `history/rejected-noether-braid-profile-candidates/` preserves a rejected generated social-banner candidate snapshot.

## Regeneration

```bash
VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" scripts/art/build-noether-braid-banner-assets.py --write --contact-sheet
```
