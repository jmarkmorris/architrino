#!/usr/bin/env python3
"""Render reverse-band pages and social derivatives from source images."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


REPO = Path(__file__).resolve().parents[4]
MANIFEST = REPO / "reference/archie/childrens-books/production/generation-manifest.json"
FONT_CANDIDATES = [
    Path("/System/Library/Fonts/Supplemental/Georgia.ttf"),
    Path("/System/Library/Fonts/Supplemental/Times New Roman.ttf"),
    Path("/System/Library/Fonts/Supplemental/Arial.ttf"),
]
DEEP_PURPLE = (34, 0, 51)
WHITE = (255, 255, 255)


def load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for path in FONT_CANDIDATES:
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default(size=size)


def text_lines(text: str, font: ImageFont.ImageFont, max_width: int, draw: ImageDraw.ImageDraw) -> list[str]:
    paragraphs = [p.strip() for p in text.splitlines() if p.strip()]
    lines: list[str] = []
    for paragraph in paragraphs:
        words = paragraph.split()
        current: list[str] = []
        for word in words:
            candidate = " ".join([*current, word])
            if draw.textbbox((0, 0), candidate, font=font)[2] <= max_width or not current:
                current.append(word)
            else:
                lines.append(" ".join(current))
                current = [word]
        if current:
            lines.append(" ".join(current))
    return lines


def fit_text(text: str, box: tuple[int, int, int, int], base_size: int, title: bool, draw: ImageDraw.ImageDraw) -> tuple[ImageFont.ImageFont, list[str], int]:
    x0, y0, x1, y1 = box
    size = base_size + (12 if title else 0)
    while size >= 24:
        font = load_font(size)
        lines = text_lines(text, font, x1 - x0, draw)
        line_height = int(size * 1.2)
        total = line_height * len(lines)
        if total <= y1 - y0:
            return font, lines, line_height
        size -= 2
    font = load_font(24)
    lines = text_lines(text, font, x1 - x0, draw)
    return font, lines, 30


def source_to_canvas(source: Image.Image, size: tuple[int, int], band_height: int, derivative: str) -> Image.Image:
    width, height = size
    canvas = Image.new("RGB", size, WHITE)
    art_height = height - band_height
    art = ImageOps.contain(source.convert("RGB"), (width, art_height), method=Image.Resampling.LANCZOS)
    x = (width - art.width) // 2
    y = max(0, (art_height - art.height) // 2)
    if derivative == "9x16":
        y = max(24, (art_height - art.height) // 3)
    canvas.paste(art, (x, y))
    return canvas


def render_one(entry: dict, source: Image.Image, target: Path, size: tuple[int, int], derivative: str) -> None:
    width, height = size
    band_height = {
        "landscape": int(height * 0.245),
        "4x5": int(height * 0.24),
        "9x16": int(height * 0.235),
    }[derivative]
    page = source_to_canvas(source, size, band_height, derivative)
    draw = ImageDraw.Draw(page)
    band_top = height - band_height
    draw.rectangle((0, band_top, width, height), fill=DEEP_PURPLE)

    margin_x = int(width * (0.075 if derivative == "landscape" else 0.08))
    margin_y = int(band_height * 0.22)
    text_box = (margin_x, band_top + margin_y, width - margin_x, height - margin_y)
    base_size = 42 if derivative == "landscape" else 40
    if derivative == "9x16":
        base_size = 42
    title = entry["kind"] == "cover"
    text = entry.get("story_text") or entry["label"]
    font, lines, line_height = fit_text(text, text_box, base_size, title, draw)
    y = text_box[1]
    for line in lines:
        draw.text((text_box[0], y), line, font=font, fill=WHITE)
        y += line_height

    target.parent.mkdir(parents=True, exist_ok=True)
    page.save(target)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--book", required=True)
    args = parser.parse_args()

    manifest = json.loads(MANIFEST.read_text())
    entries = [entry for entry in manifest["entries"] if entry["book_slug"] == args.book]
    if not entries:
        raise SystemExit(f"no manifest entries for book {args.book}")

    rendered = 0
    skipped = 0
    landscape_pages: list[Path] = []
    for entry in entries:
        source_path = REPO / entry["paths"]["source_png"]
        if not source_path.exists():
            skipped += 1
            continue
        source = Image.open(source_path)
        targets = [
            ("landscape", (1536, 1024), REPO / entry["paths"]["page_landscape_png"]),
            ("4x5", (1080, 1350), REPO / entry["paths"]["derivative_4x5_png"]),
            ("9x16", (1080, 1920), REPO / entry["paths"]["derivative_9x16_png"]),
        ]
        for derivative, size, target in targets:
            render_one(entry, source, target, size, derivative)
            rendered += 1
            if derivative == "landscape":
                landscape_pages.append(target)

    if landscape_pages:
        pdf_path = REPO / "content/assets/books/childrens-books" / args.book / f"{args.book}-first-draft.pdf"
        pdf_path.parent.mkdir(parents=True, exist_ok=True)
        pdf_images = [Image.open(path).convert("RGB") for path in landscape_pages]
        pdf_images[0].save(pdf_path, save_all=True, append_images=pdf_images[1:])
        print(f"wrote pdf: {pdf_path.relative_to(REPO)}")

    print(f"rendered files: {rendered}")
    print(f"skipped entries without source images: {skipped}")


if __name__ == "__main__":
    main()
