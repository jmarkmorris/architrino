# Noether Braid Sea Deployed Banners

This directory contains deployed platform-size PNG exports generated from the Noether Braid sea working master.

- Working master: `../../../../../../reference/design/banners/history/historical-noether-braid-sea/noether-braid-youtube-banner-sea-2048x1152.png`
- Builder: `../../../../../../scripts/art/build-noether-braid-banner-assets.py`
- Export manifest: `../../../../../../reference/design/logo-exports/noether-braid-ribbon-social-platforms/manifest.json`

Regenerate these files from the repo root with:

```bash
VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" scripts/art/build-noether-braid-banner-assets.py --write --contact-sheet
```
