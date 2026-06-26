#!/usr/bin/env python3
"""Build and validate the canonical Architrino QR code asset."""

from __future__ import annotations

import argparse
import hashlib
import sys
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageChops, ImageColor, ImageDraw
import qrcode
from qrcode.constants import ERROR_CORRECT_H


REPO_ROOT = Path(__file__).resolve().parents[2]

CANONICAL_PAYLOAD = "https://www.architrino.com"
CANONICAL_OUTPUT_PATH = REPO_ROOT / "reference/design/logo-exports/architrino-qr-code/qr.png"
LOGO_SOURCE_PATH = (
    REPO_ROOT
    / "reference/design/logo-exports/noether-braid-ribbon-app-icon/noether-braid-ribbon-app-icon-1024.png"
)
LOGO_COMPOSITES_OUTPUT_DIR = REPO_ROOT / "reference/design/logo-exports/noether-braid-qr-logo-composites"
READER_FACING_BRAND_OUTPUT_DIR = REPO_ROOT / "content/assets/images/brand"
READER_FACING_LANDSCAPE_LOGO_QR_PATH = (
    READER_FACING_BRAND_OUTPUT_DIR / "architrino-logo-qr-landscape.png"
)

QR_SIZE_PX = 600
QR_BORDER_MODULES = 2
QR_PATTERN_BLOCK_SIZE_PX = 48
QR_PATTERN_PALETTE = ("#ff0000", "#0000ff", "#ff00ff")
QR_BACKGROUND_COLOR = "#ece4f2"
EXPECTED_QR_VERSION = 4
EXPECTED_QR_MODULE_COUNT = 33

STANDARD_PURPLE = "#4c0183"
QR_BACKGROUND_SELECTION = "75% of the darkest conservative standard-purple tint"

COMPOSITE_BACKGROUND_COLOR = (250, 250, 248)
COMPOSITE_PANEL_SIZE_PX = 600
COMPOSITE_ASSET_SIZE_PX = 500
COMPOSITE_ASSET_GAP_PX = 0


@dataclass(frozen=True)
class ImageComparison:
    matches: bool
    changed_pixels: int = 0
    bbox: tuple[int, int, int, int] | None = None


def make_base_qr(payload: str = CANONICAL_PAYLOAD) -> Image.Image:
    """Return the monochrome QR code resized to the committed asset size."""
    qr = qrcode.QRCode(error_correction=ERROR_CORRECT_H, border=QR_BORDER_MODULES)
    qr.add_data(payload)
    qr.make(fit=True)

    if qr.version != EXPECTED_QR_VERSION or len(qr.modules) != EXPECTED_QR_MODULE_COUNT:
        raise RuntimeError(
            "QR structure changed: "
            f"version={qr.version}, modules={len(qr.modules)}; "
            f"expected version={EXPECTED_QR_VERSION}, modules={EXPECTED_QR_MODULE_COUNT}"
        )

    image = qr.make_image(fill_color="black", back_color="white").convert("RGB")
    return image.resize((QR_SIZE_PX, QR_SIZE_PX), Image.Resampling.NEAREST)


def make_block_pattern() -> Image.Image:
    """Return the red-blue-magenta tiled pattern used for QR modules."""
    pattern = Image.new("RGB", (QR_SIZE_PX, QR_SIZE_PX), QR_BACKGROUND_COLOR)
    draw = ImageDraw.Draw(pattern)
    palette_rgb = [ImageColor.getrgb(color) for color in QR_PATTERN_PALETTE]

    rows = cols = (QR_SIZE_PX + QR_PATTERN_BLOCK_SIZE_PX - 1) // QR_PATTERN_BLOCK_SIZE_PX
    for row in range(rows):
        y0 = row * QR_PATTERN_BLOCK_SIZE_PX
        y1 = min(y0 + QR_PATTERN_BLOCK_SIZE_PX, QR_SIZE_PX)
        for col in range(cols):
            x0 = col * QR_PATTERN_BLOCK_SIZE_PX
            x1 = min(x0 + QR_PATTERN_BLOCK_SIZE_PX, QR_SIZE_PX)
            color = palette_rgb[(row + col) % len(palette_rgb)]
            draw.rectangle((x0, y0, x1 - 1, y1 - 1), fill=color)

    return pattern


def build_architrino_qr(background_color: str = QR_BACKGROUND_COLOR) -> Image.Image:
    """Return the canonical colored Architrino QR code image."""
    base = make_base_qr()
    module_mask = ImageChops.invert(base.convert("L"))
    pattern = make_block_pattern()
    background = Image.new("RGB", (QR_SIZE_PX, QR_SIZE_PX), background_color)
    return Image.composite(pattern, background, module_mask)


def read_image(path: Path) -> Image.Image:
    """Read an image as RGB and attach a useful error if the path is bad."""
    try:
        return Image.open(path).convert("RGB")
    except FileNotFoundError as exc:
        raise FileNotFoundError(f"Missing QR asset: {path}") from exc


def compare_images(expected: Image.Image, actual: Image.Image) -> ImageComparison:
    """Compare images by pixels, independent of PNG compression metadata."""
    if expected.size != actual.size:
        return ImageComparison(matches=False)

    difference = ImageChops.difference(expected, actual)
    bbox = difference.getbbox()
    if bbox is None:
        return ImageComparison(matches=True)

    changed_pixels = sum(1 for pixel in difference.getdata() if pixel != (0, 0, 0))
    return ImageComparison(matches=False, changed_pixels=changed_pixels, bbox=bbox)


def image_sha256(image_path: Path) -> str:
    return hashlib.sha256(image_path.read_bytes()).hexdigest()


def print_canonical_qr_summary() -> None:
    print(f"sha256: {image_sha256(CANONICAL_OUTPUT_PATH)}")
    print(
        f"background: {QR_BACKGROUND_COLOR} "
        f"({QR_BACKGROUND_SELECTION}; standard purple {STANDARD_PURPLE})"
    )


def fit_square(image: Image.Image, size: int) -> Image.Image:
    fitted = image.copy()
    fitted.thumbnail((size, size), Image.Resampling.LANCZOS)
    return fitted


def paste_artwork(canvas: Image.Image, image: Image.Image, position: tuple[int, int]) -> None:
    fitted = fit_square(image, COMPOSITE_ASSET_SIZE_PX)
    x, y = position
    x += (COMPOSITE_ASSET_SIZE_PX - fitted.width) // 2
    y += (COMPOSITE_ASSET_SIZE_PX - fitted.height) // 2
    canvas.paste(fitted, (x, y))


def make_2x1_composite(logo: Image.Image, qr_image: Image.Image) -> Image.Image:
    width = COMPOSITE_PANEL_SIZE_PX * 2
    height = COMPOSITE_PANEL_SIZE_PX
    canvas = Image.new("RGB", (width, height), COMPOSITE_BACKGROUND_COLOR)
    group_width = COMPOSITE_ASSET_SIZE_PX * 2 + COMPOSITE_ASSET_GAP_PX
    left_x = (width - group_width) // 2
    top_y = (height - COMPOSITE_ASSET_SIZE_PX) // 2
    right_x = left_x + COMPOSITE_ASSET_SIZE_PX + COMPOSITE_ASSET_GAP_PX
    paste_artwork(canvas, logo, (left_x, top_y))
    paste_artwork(canvas, qr_image, (right_x, top_y))
    return canvas


def make_1x2_composite(logo: Image.Image, qr_image: Image.Image) -> Image.Image:
    width = COMPOSITE_PANEL_SIZE_PX
    height = COMPOSITE_PANEL_SIZE_PX * 2
    canvas = Image.new("RGB", (width, height), COMPOSITE_BACKGROUND_COLOR)
    group_height = COMPOSITE_ASSET_SIZE_PX * 2 + COMPOSITE_ASSET_GAP_PX
    left_x = (width - COMPOSITE_ASSET_SIZE_PX) // 2
    top_y = (height - group_height) // 2
    bottom_y = top_y + COMPOSITE_ASSET_SIZE_PX + COMPOSITE_ASSET_GAP_PX
    paste_artwork(canvas, logo, (left_x, top_y))
    paste_artwork(canvas, qr_image, (left_x, bottom_y))
    return canvas


def save_png(image: Image.Image, path: Path) -> None:
    """Save a PNG using Pillow's default encoder, matching the committed asset."""
    path.parent.mkdir(parents=True, exist_ok=True)
    temp_path = path.with_name(f".{path.name}.tmp")
    image.save(temp_path, format="PNG")
    temp_path.replace(path)


def check_canonical_asset(generated: Image.Image) -> int:
    current = read_image(CANONICAL_OUTPUT_PATH)
    comparison = compare_images(generated, current)
    if comparison.matches:
        print(f"OK: {CANONICAL_OUTPUT_PATH.relative_to(REPO_ROOT)} matches generated QR pixels.")
        print(f"sha256: {image_sha256(CANONICAL_OUTPUT_PATH)}")
        return 0

    detail = "size mismatch"
    if comparison.bbox is not None:
        detail = f"changed_pixels={comparison.changed_pixels}, bbox={comparison.bbox}"
    print(
        f"ERROR: {CANONICAL_OUTPUT_PATH.relative_to(REPO_ROOT)} does not match generated QR ({detail}).",
        file=sys.stderr,
    )
    return 1


def write_logo_composites(qr_image: Image.Image) -> None:
    logo = read_image(LOGO_SOURCE_PATH)
    LOGO_COMPOSITES_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    READER_FACING_BRAND_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    landscape_composite = make_2x1_composite(logo, qr_image)
    save_png(
        landscape_composite,
        LOGO_COMPOSITES_OUTPUT_DIR / "noether-braid-qr-logo-2x1-logo-left-qr-right.png",
    )
    save_png(landscape_composite, READER_FACING_LANDSCAPE_LOGO_QR_PATH)
    save_png(
        make_1x2_composite(logo, qr_image),
        LOGO_COMPOSITES_OUTPUT_DIR / "noether-braid-qr-logo-1x2-logo-top-qr-bottom.png",
    )
    print(f"Wrote logo QR composites: {LOGO_COMPOSITES_OUTPUT_DIR.relative_to(REPO_ROOT)}")
    print(
        "Wrote reader-facing logo QR asset: "
        f"{READER_FACING_LANDSCAPE_LOGO_QR_PATH.relative_to(REPO_ROOT)}"
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument(
        "--check",
        action="store_true",
        help="Validate reference/design/logo-exports/architrino-qr-code/qr.png against the generated QR asset (default).",
    )
    mode.add_argument(
        "--write",
        action="store_true",
        help="Regenerate reference/design/logo-exports/architrino-qr-code/qr.png.",
    )
    mode.add_argument(
        "--write-logo-composites",
        action="store_true",
        help="Regenerate the selected logo-plus-QR composites.",
    )
    mode.add_argument(
        "--write-all",
        action="store_true",
        help="Regenerate the canonical QR image and selected logo-plus-QR composites.",
    )
    parser.add_argument(
        "--output",
        type=Path,
        help="Also write the generated QR image to this path, useful for one-off reproduction tests.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    generated = build_architrino_qr()

    if args.output:
        output_path = args.output if args.output.is_absolute() else REPO_ROOT / args.output
        save_png(generated, output_path)
        print(f"Wrote test QR image: {output_path}")

    if args.write:
        save_png(generated, CANONICAL_OUTPUT_PATH)
        print(f"Wrote canonical QR image: {CANONICAL_OUTPUT_PATH.relative_to(REPO_ROOT)}")
        print_canonical_qr_summary()
        return 0

    if args.write_logo_composites:
        write_logo_composites(generated)
        return 0

    if args.write_all:
        save_png(generated, CANONICAL_OUTPUT_PATH)
        print(f"Wrote canonical QR image: {CANONICAL_OUTPUT_PATH.relative_to(REPO_ROOT)}")
        print_canonical_qr_summary()
        write_logo_composites(generated)
        return 0

    return check_canonical_asset(generated)


if __name__ == "__main__":
    raise SystemExit(main())
