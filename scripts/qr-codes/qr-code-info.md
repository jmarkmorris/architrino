# Architrino QR Code Assets

This directory owns the QR-code generator for the committed Architrino QR asset.

## Source Of Truth

- Canonical payload: `https://www.architrino.com`
- Generator: `scripts/qr-codes/build-architrino-qr-assets.py`
- Canonical QR output: `reference/design/logo-exports/architrino-qr-code/qr.png`
- Current QR dimensions: `600 x 600` PNG
- Current module palette: pure red, pure blue, pure magenta
- Current background: `#ece4f2`, 75% of the darkest conservative standard-purple tint
- Current error correction: high

The generator intentionally has no arbitrary payload argument. If the canonical URL changes, update the constant in the generator and regenerate the checked-in asset in the same change.

## Regeneration

Check the committed QR asset:

```bash
VIRTUAL_ENV=/Users/markmorris/vibe/.venv /Users/markmorris/vibe/.venv/bin/python scripts/qr-codes/build-architrino-qr-assets.py --check
```

Regenerate the committed QR asset:

```bash
VIRTUAL_ENV=/Users/markmorris/vibe/.venv /Users/markmorris/vibe/.venv/bin/python scripts/qr-codes/build-architrino-qr-assets.py --write
```

Create a one-off reproduction file while still checking the committed asset:

```bash
VIRTUAL_ENV=/Users/markmorris/vibe/.venv /Users/markmorris/vibe/.venv/bin/python scripts/qr-codes/build-architrino-qr-assets.py --check --output /tmp/architrino-qr-recreated.png
```

Regenerate the selected logo-plus-QR composites:

```bash
VIRTUAL_ENV=/Users/markmorris/vibe/.venv /Users/markmorris/vibe/.venv/bin/python scripts/qr-codes/build-architrino-qr-assets.py --write-logo-composites
```

Regenerate the committed QR asset and selected logo-plus-QR composites together:

```bash
VIRTUAL_ENV=/Users/markmorris/vibe/.venv /Users/markmorris/vibe/.venv/bin/python scripts/qr-codes/build-architrino-qr-assets.py --write-all
```

## Layout Guidance

The committed QR image preserves the exact existing 2-module generator border so that it can be reproduced byte-for-byte in the current toolchain. For print, flyers, videos, and logo composites, add clear surrounding layout padding rather than silently changing the generator border.

Preferred QR presentation:

- keep the QR modules flat and high-contrast,
- keep the QR background white or near-white,
- keep shadows, gradients, images, and texture outside the QR symbol,
- verify any exported composite by decoding it back to `https://www.architrino.com`.

The selected QR background uses the logo background purple `#4c0183` mixed over white. It is the 75% version of the darkest conservative tint from the review pass: `#ece4f2`, with a minimum display-luma gap of about 158 between the QR background and the red, blue, and magenta modules.

## Dependencies

The generator uses `qrcode` and `Pillow`; both belong in the shared Python environment declared by `requirements.txt`.
