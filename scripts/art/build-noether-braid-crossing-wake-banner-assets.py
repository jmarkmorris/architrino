#!/usr/bin/env python3
"""Build deployed Noether Braid Crossing Wake banner assets."""

from __future__ import annotations

import argparse
import hashlib
import json
import math
from dataclasses import dataclass
from datetime import date
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


REPO_ROOT = Path(__file__).resolve().parents[2]
FAMILY = "noether-braid-crossing-wake-sheets"
SOURCE_PATH = (
    REPO_ROOT
    / "reference/design/banners/working/noether-braid-crossing-wake-sheets/noether-braid-crossing-wake-sheets-master-2560x1440.png"
)
SELECTED_FROM_PATH = (
    REPO_ROOT
    / "reference/design/banners/working/noether-braid-path-wake-candidates/crossing-wake-sheets-2560x1440.png"
)
OUTPUT_DIR = REPO_ROOT / f"content/assets/images/brand/banners/{FAMILY}"
MANIFEST_PATH = (
    REPO_ROOT
    / "reference/design/banners/working/noether-braid-crossing-wake-sheets/noether-braid-crossing-wake-platform-manifest.json"
)
CONTACT_SHEET_PATH = (
    REPO_ROOT
    / "reference/design/banners/working/noether-braid-crossing-wake-sheets/noether-braid-crossing-wake-platform-contact-sheet.jpg"
)
IMAGES_LEDGER_PATH = REPO_ROOT / "content/assets/images/images.json"
AVATAR_PATH = REPO_ROOT / "content/assets/images/brand/noether-braid-all-platforms-avatar-master-1024x1024.png"


@dataclass(frozen=True)
class BannerExport:
    platform: str
    platform_label: str
    role: str
    role_label: str
    width: int
    height: int
    focus_y: float = 0.46
    note: str = ""

    @property
    def file_name(self) -> str:
        return f"noether-braid-crossing-wake-{self.platform}-{self.role}-{self.width}x{self.height}.png"

    @property
    def output_path(self) -> Path:
        return OUTPUT_DIR / self.file_name

    @property
    def image_id(self) -> str:
        return self.output_path.stem


EXPORTS = [
    BannerExport("youtube", "YouTube", "channel-banner", "Channel Banner", 2560, 1440, 0.50),
    BannerExport("discord", "Discord", "server-banner", "Server Banner", 960, 540, 0.50),
    BannerExport("linkedin", "LinkedIn", "profile-cover", "Profile Cover", 1584, 396, 0.43),
    BannerExport("linkedin", "LinkedIn", "company-cover", "Company Cover", 1128, 191, 0.40),
    BannerExport("reddit", "Reddit", "community-banner-small", "Community Banner Small", 1920, 128, 0.38),
    BannerExport("reddit", "Reddit", "community-banner-medium", "Community Banner Medium", 1920, 256, 0.39),
    BannerExport("reddit", "Reddit", "community-banner-large", "Community Banner Large", 1920, 384, 0.40),
    BannerExport("x", "X", "profile-header", "Profile Header", 1500, 500, 0.43),
    BannerExport("bluesky", "Bluesky", "profile-banner", "Profile Banner", 1500, 500, 0.43),
    BannerExport("mastodon", "Mastodon", "profile-header", "Profile Header", 1500, 500, 0.43),
    BannerExport("facebook", "Facebook", "page-cover", "Page Cover", 1640, 924, 0.50),
    BannerExport("twitch", "Twitch", "profile-banner", "Profile Banner", 1200, 480, 0.48),
    BannerExport("open-graph", "Open Graph", "preview", "Preview", 1200, 630, 0.50),
    BannerExport("github", "GitHub", "social-preview", "Social Preview", 1280, 640, 0.50),
]


def clamp(value: int, minimum: int, maximum: int) -> int:
    return max(minimum, min(value, maximum))


def cover_crop(source: Image.Image, width: int, height: int, focus_y: float) -> Image.Image:
    source_ratio = source.width / source.height
    target_ratio = width / height

    if abs(source_ratio - target_ratio) < 0.005:
        return source.resize((width, height), Image.Resampling.LANCZOS)

    if source_ratio > target_ratio:
        crop_height = source.height
        crop_width = int(round(crop_height * target_ratio))
        left = clamp((source.width - crop_width) // 2, 0, source.width - crop_width)
        top = 0
    else:
        crop_width = source.width
        crop_height = int(round(crop_width / target_ratio))
        left = 0
        center_y = int(round(source.height * focus_y))
        top = clamp(center_y - crop_height // 2, 0, source.height - crop_height)

    cropped = source.crop((left, top, left + crop_width, top + crop_height))
    return cropped.resize((width, height), Image.Resampling.LANCZOS)


def render_export(source: Image.Image, export: BannerExport) -> Image.Image:
    return cover_crop(source, export.width, export.height, export.focus_y)


def file_sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def manifest_entry(export: BannerExport) -> dict:
    return {
        "file": str(export.output_path.relative_to(REPO_ROOT)),
        "platform": export.platform,
        "role": export.role,
        "width": export.width,
        "height": export.height,
        "focusY": export.focus_y,
    }


def write_outputs() -> None:
    source = Image.open(SOURCE_PATH).convert("RGB")
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for export in EXPORTS:
        image = render_export(source, export)
        image.save(export.output_path, format="PNG")
        print(f"Wrote {export.output_path.relative_to(REPO_ROOT)}")

    manifest = {
        "family": FAMILY,
        "source": str(SOURCE_PATH.relative_to(REPO_ROOT)),
        "selectedFrom": str(SELECTED_FROM_PATH.relative_to(REPO_ROOT)),
        "generated": [manifest_entry(export) for export in EXPORTS],
    }
    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {MANIFEST_PATH.relative_to(REPO_ROOT)}")


def circular_avatar(size: int) -> Image.Image | None:
    if not AVATAR_PATH.exists():
        return None

    avatar = Image.open(AVATAR_PATH).convert("RGBA").resize((size, size), Image.Resampling.LANCZOS)
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size - 1, size - 1), fill=255)

    framed = Image.new("RGBA", (size + 6, size + 6), (0, 0, 0, 0))
    frame_mask = Image.new("L", framed.size, 0)
    frame_draw = ImageDraw.Draw(frame_mask)
    frame_draw.ellipse((0, 0, size + 5, size + 5), fill=255)
    framed.paste((246, 242, 255, 255), (0, 0), frame_mask)
    framed.paste(avatar, (3, 3), mask)
    return framed


def make_contact_sheet() -> None:
    source = Image.open(SOURCE_PATH).convert("RGB")
    font = ImageFont.load_default()
    thumb_w = 640
    thumb_h = 210
    pad = 26
    label_h = 44
    cols = 2
    rows = math.ceil(len(EXPORTS) / cols)
    sheet_w = cols * thumb_w + (cols + 1) * pad
    sheet_h = rows * (thumb_h + label_h) + (rows + 1) * pad
    sheet = Image.new("RGB", (sheet_w, sheet_h), (22, 8, 31))
    draw = ImageDraw.Draw(sheet)

    for index, export in enumerate(EXPORTS):
        row = index // cols
        col = index % cols
        x = pad + col * (thumb_w + pad)
        y = pad + row * (thumb_h + label_h + pad)

        image = render_export(source, export)
        image.thumbnail((thumb_w, thumb_h), Image.Resampling.LANCZOS)
        frame = Image.new("RGB", (thumb_w, thumb_h), (16, 8, 28))
        px = (thumb_w - image.width) // 2
        py = (thumb_h - image.height) // 2
        frame.paste(image, (px, py))

        avatar_size = max(28, min(82, int(image.height * 0.44)))
        avatar = circular_avatar(avatar_size)
        if avatar is not None:
            ox = px + max(10, int(image.width * 0.05))
            oy = py + image.height - avatar.height - max(8, int(image.height * 0.06))
            frame.paste(avatar, (ox, oy), avatar)

        sheet.paste(frame, (x, y))
        label = f"{export.platform_label} {export.role_label} - {export.width} x {export.height}"
        draw.text((x, y + thumb_h + 11), label, fill=(238, 229, 255), font=font)

    CONTACT_SHEET_PATH.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(CONTACT_SHEET_PATH, format="JPEG", quality=92)
    print(f"Wrote {CONTACT_SHEET_PATH.relative_to(REPO_ROOT)}")


def ledger_entry(export: BannerExport, today: str) -> dict:
    output_path = export.output_path
    relative_output = str(output_path.relative_to(REPO_ROOT))
    return {
        "id": export.image_id,
        "title": f"Noether Braid Crossing Wake {export.platform_label} {export.role_label} {export.width}x{export.height}",
        "description": f"Noether Braid crossing-wake {export.platform_label} {export.role_label.lower()} brand export.",
        "path": relative_output,
        "mediaType": "image/png",
        "dimensions": {
            "width": export.width,
            "height": export.height,
        },
        "fileSizeBytes": output_path.stat().st_size,
        "sha256": file_sha256(output_path),
        "dateCreated": today,
        "dateImported": today,
        "status": "approved",
        "category": "brand",
        "source": {
            "name": "Architrino project",
            "pageUrl": "https://www.architrino.com",
            "fileUrl": None,
            "generator": "scripts/art/build-noether-braid-crossing-wake-banner-assets.py",
            "accessedDate": today,
        },
        "creators": [
            {
                "name": "Architrino project",
                "role": "brand image author",
            }
        ],
        "license": {
            "rightsStatus": "project-owned",
            "label": "Project license",
            "rationale": "Created for project-owned Noether Braid brand use from the approved Crossing Wake Sheets generated banner master and local export tooling.",
            "requiresAttribution": False,
        },
        "creditLine": "Created by the Architrino project, 2026.",
        "usage": {
            "intendedUses": [
                "brand sharing",
                "social platform asset",
            ],
            "usedBy": [
                "content/assets/images/brand/banners/noether-braid-crossing-wake-sheets/README.md",
                "reference/design/banners/working/noether-braid-crossing-wake-sheets/README.md",
                "reference/design/banners/working/noether-braid-crossing-wake-sheets/noether-braid-crossing-wake-platform-manifest.json",
            ],
        },
        "selectionNotes": [
            "Promoted from the selected Crossing Wake Sheets path/wake candidate on 2026-07-02.",
            "Generated into the deployed Noether Braid crossing-wake banner family from the selected 2560 x 1440 working master.",
        ],
    }


def update_image_ledger() -> None:
    missing = [export.output_path for export in EXPORTS if not export.output_path.exists()]
    if missing:
        missing_list = ", ".join(str(path.relative_to(REPO_ROOT)) for path in missing)
        raise FileNotFoundError(f"Run --write before --update-ledger. Missing: {missing_list}")

    today = date.today().isoformat()
    ledger = json.loads(IMAGES_LEDGER_PATH.read_text(encoding="utf-8"))
    generated_ids = {export.image_id for export in EXPORTS}
    ledger["images"] = [entry for entry in ledger["images"] if entry.get("id") not in generated_ids]
    ledger["images"].extend(ledger_entry(export, today) for export in EXPORTS)
    IMAGES_LEDGER_PATH.write_text(json.dumps(ledger, indent=2) + "\n", encoding="utf-8")
    print(f"Updated {IMAGES_LEDGER_PATH.relative_to(REPO_ROOT)}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--write", action="store_true", help="Write deployed banner assets and manifest.")
    parser.add_argument("--contact-sheet", action="store_true", help="Write a working platform contact sheet.")
    parser.add_argument("--update-ledger", action="store_true", help="Update content/assets/images/images.json entries.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    if args.write:
        write_outputs()

    if args.contact_sheet:
        make_contact_sheet()

    if args.update_ledger:
        update_image_ledger()

    if not args.write and not args.contact_sheet and not args.update_ledger:
        for export in EXPORTS:
            print(f"{export.output_path.relative_to(REPO_ROOT)} ({export.width} x {export.height})")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
