#!/usr/bin/env python3
"""Build deployed Noether Braid sea banner assets from the working master."""

from __future__ import annotations

import argparse
import json
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


REPO_ROOT = Path(__file__).resolve().parents[2]
SOURCE_PATH = (
    REPO_ROOT
    / "reference/design/banners/history/historical-noether-braid-sea/noether-braid-youtube-banner-sea-2048x1152.png"
)
MANIFEST_PATH = (
    REPO_ROOT
    / "reference/design/logo-exports/noether-braid-ribbon-social-platforms/manifest.json"
)
CONTACT_SHEET_PATH = (
    REPO_ROOT
    / "reference/design/banners/history/historical-noether-braid-sea/noether-braid-sea-platform-contact-sheet.jpg"
)

BANNER_ROLES = {
    "channel-banner",
    "company-cover",
    "profile-background",
    "community-banner-small",
    "community-banner-medium",
    "community-banner-large",
    "server-banner",
}


def load_banner_entries() -> list[dict]:
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    return [entry for entry in manifest["generated"] if entry["role"] in BANNER_ROLES]


def center_crop(image: Image.Image, width: int, height: int) -> Image.Image:
    left = (image.width - width) // 2
    top = (image.height - height) // 2
    return image.crop((left, top, left + width, top + height))


def tiled_crop(source: Image.Image, width: int, height: int) -> Image.Image:
    if width <= source.width and height <= source.height:
        return center_crop(source, width, height)

    tile_count_x = max(1, math.ceil(width / source.width) + 2)
    tile_count_y = max(1, math.ceil(height / source.height) + 2)
    canvas = Image.new("RGB", (tile_count_x * source.width, tile_count_y * source.height))

    for y in range(tile_count_y):
        for x in range(tile_count_x):
            canvas.paste(source, (x * source.width, y * source.height))

    return center_crop(canvas, width, height)


def render_banner(source: Image.Image, width: int, height: int) -> Image.Image:
    source_ratio = source.width / source.height
    target_ratio = width / height

    if abs(source_ratio - target_ratio) < 0.01:
        return source.resize((width, height), Image.Resampling.LANCZOS)

    return tiled_crop(source, width, height)


def write_banner_outputs(entries: list[dict]) -> list[Path]:
    source = Image.open(SOURCE_PATH).convert("RGB")
    written: list[Path] = []

    for entry in entries:
        output_path = REPO_ROOT / entry["file"]
        output_path.parent.mkdir(parents=True, exist_ok=True)
        banner = render_banner(source, entry["width"], entry["height"])
        banner.save(output_path, format="PNG")
        written.append(output_path)

    return written


def make_contact_sheet(entries: list[dict]) -> None:
    font = ImageFont.load_default()
    thumb_w = 520
    thumb_h = 170
    pad = 24
    label_h = 42
    cols = 2
    rows = math.ceil(len(entries) / cols)
    sheet_w = cols * thumb_w + (cols + 1) * pad
    sheet_h = rows * (thumb_h + label_h) + (rows + 1) * pad
    sheet = Image.new("RGB", (sheet_w, sheet_h), (248, 248, 246))
    draw = ImageDraw.Draw(sheet)

    for index, entry in enumerate(entries):
        row = index // cols
        col = index % cols
        x = pad + col * (thumb_w + pad)
        y = pad + row * (thumb_h + label_h + pad)
        image = Image.open(REPO_ROOT / entry["file"]).convert("RGB")
        image.thumbnail((thumb_w, thumb_h), Image.Resampling.LANCZOS)
        frame = Image.new("RGB", (thumb_w, thumb_h), (232, 228, 235))
        frame.paste(image, ((thumb_w - image.width) // 2, (thumb_h - image.height) // 2))
        sheet.paste(frame, (x, y))
        label = f"{entry['platform']} {entry['role']} - {entry['width']} x {entry['height']}"
        draw.text((x, y + thumb_h + 10), label, fill=(28, 22, 34), font=font)

    CONTACT_SHEET_PATH.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(CONTACT_SHEET_PATH, format="JPEG", quality=92)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--write", action="store_true", help="Write deployed banner assets.")
    parser.add_argument(
        "--contact-sheet",
        action="store_true",
        help="Write a working contact sheet after banner outputs exist.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    entries = load_banner_entries()

    if args.write:
        written = write_banner_outputs(entries)
        for path in written:
            print(f"Wrote {path.relative_to(REPO_ROOT)}")

    if args.contact_sheet:
        make_contact_sheet(entries)
        print(f"Wrote {CONTACT_SHEET_PATH.relative_to(REPO_ROOT)}")

    if not args.write and not args.contact_sheet:
        for entry in entries:
            print(f"{entry['file']} ({entry['width']} x {entry['height']})")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
