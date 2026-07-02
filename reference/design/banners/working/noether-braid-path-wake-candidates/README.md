# Noether Braid Path/Wake Banner Candidates

Status: selected candidate set.

These candidates are generated social banner backgrounds intended to sit behind the Noether Braid social profile logo. They do not include the logo, QR code, brand text, chalkboards, or equations inside the banner itself.

## Design Constraint

- Use only reds, purples, and blues, plus dark values of the same palette.
- Show paths and wakes as the primary visual language.
- Keep the profile-logo collision zone readable when a circular Noether Braid avatar sits over the lower-left banner area.
- Avoid dark middle bands; darker corner or edge tinting is acceptable.

## Review Assets

- Contact sheet with profile-logo overlay: `noether-braid-path-wake-candidates-contact-sheet.jpg`
- Crossing wake sheets: `crossing-wake-sheets-2560x1440.png`
- Dual-stream wake interference: `dual-stream-wake-interference-2560x1440.png`
- Source-basin wake field: `source-basin-wake-field-2560x1440.png`

The `*.png` files without the `2560x1440` suffix are the direct built-in image-generation outputs copied into this package before local resizing and palette discipline.

## Selection Outcome

- Crossing wake sheets was selected and promoted into `../noether-braid-crossing-wake-sheets/`.
- Source-basin wake field and dual-stream wake interference remain review alternatives, but they are not the deployed banner direction.

## Generation Notes

Mode: built-in `image_gen` tool, followed by local 16:9 normalization and palette discipline.

Prompt direction:

- Generate 16:9 social banner backgrounds for an independent physics research brand.
- Use abstract paths and wakes as the subject.
- Restrict the palette to reds, purples, blues, and dark values of those colors.
- Design for a separate circular Noether Braid profile logo overlay.
- Keep the banner logo-free, QR-free, text-free, chalkboard-free, and equation-free.

## Next Pass

After one candidate is selected, generate platform-specific deployed crops and test each crop with a simulated Noether Braid avatar overlay before promotion.
