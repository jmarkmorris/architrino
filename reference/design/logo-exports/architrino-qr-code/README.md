# Architrino QR Code Export

This package contains the canonical Architrino QR code export.

- QR image: `qr.png`
- Payload: `https://www.architrino.com`
- Background: `#ece4f2`, the selected 75% standard-purple tint
- Generator: `../../../../scripts/qr-codes/build-architrino-qr-assets.py`

## Regeneration

```bash
VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" scripts/qr-codes/build-architrino-qr-assets.py --write
```
