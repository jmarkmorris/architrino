# Noether Braid Crossing Wake Sheets Deployed Banners

This directory contains deployed platform-size PNG exports generated from the selected Noether Braid Crossing Wake Sheets working master.

- Working master: `../../../../../../reference/design/banners/working/noether-braid-crossing-wake-sheets/noether-braid-crossing-wake-sheets-master-2560x1440.png`
- Builder: `../../../../../../scripts/art/build-noether-braid-crossing-wake-banner-assets.py`
- Export manifest: `../../../../../../reference/design/banners/working/noether-braid-crossing-wake-sheets/noether-braid-crossing-wake-platform-manifest.json`

Regenerate these files from the repo root with:

```bash
VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" scripts/art/build-noether-braid-crossing-wake-banner-assets.py --write --contact-sheet --update-ledger
```
