# Noether Braid Crossing Wake Sheets Banner

This working package owns the selected Crossing Wake Sheets social banner family.

- Working master: `noether-braid-crossing-wake-sheets-master-2560x1440.png`
- Selected from: `../noether-braid-path-wake-candidates/crossing-wake-sheets-2560x1440.png`
- Deployed directory: `../../../../../content/assets/images/brand/banners/noether-braid-crossing-wake-sheets/`
- Platform manifest: `noether-braid-crossing-wake-platform-manifest.json`
- Builder: `../../../../../scripts/art/build-noether-braid-crossing-wake-banner-assets.py`
- Review contact sheet: `noether-braid-crossing-wake-platform-contact-sheet.jpg`

The banner image is a red, purple, and blue path/wake field designed to sit behind the separate Noether Braid social profile logo. The deployed files do not include the logo, QR code, brand text, chalkboards, or equations.

## Platform Exports

Regenerate the deployed PNGs, platform manifest, contact sheet, and image-ledger records from the repo root with:

```bash
VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" scripts/art/build-noether-braid-crossing-wake-banner-assets.py --write --contact-sheet --update-ledger
```

## Crop Policy

The shallow LinkedIn and Reddit crops use vertical focus points that keep visible path and wake motion in frame. This avoids a dark middle band while preserving darker edge tinting.
