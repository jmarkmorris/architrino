#!/usr/bin/env python3
"""Export the preserved children's-book pilot on demand; default is source check only."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps
from build_generation_manifest import checked_manifest
from pilot_appearance import (
    BASELINE, PAGE_FONT, REVIEW_FONT, pdf_path, require_font, verify_exports, verify_sources,
)


REPO = Path(__file__).resolve().parents[4]
EXPORT_ROOT = REPO / ".local-data/childrens-books/exports"
DEEP_PURPLE = (34, 0, 51)
WHITE = (255, 255, 255)


def load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    return ImageFont.truetype(str(PAGE_FONT), size=size)


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
    global PAGE_FONT
    parser = argparse.ArgumentParser(description=__doc__)
    books = parser.add_mutually_exclusive_group(required=True)
    books.add_argument("--book")
    books.add_argument("--all", action="store_true")
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--write", action="store_true", help="Render and verify local exports, including review bundles")
    mode.add_argument("--check", action="store_true", help="Validate preserved sources; no exports required (default)")
    mode.add_argument("--check-exports", action="store_true", help="Verify existing pages and PDF contents against the frozen pilot")
    parser.add_argument("--font", type=Path, default=PAGE_FONT, help="Licensed copy of the exact pilot Georgia font")
    parser.add_argument("--review-font", type=Path, default=REVIEW_FONT, help="Licensed copy of the exact pilot Arial font")
    args = parser.parse_args()

    manifest = checked_manifest()
    entries = [entry for entry in manifest["entries"] if args.all or entry["book_slug"] == args.book]
    if not entries:
        raise SystemExit(f"no manifest entries for book {args.book}")
    baseline = json.loads(BASELINE.read_text())
    verify_sources(entries, baseline)
    if args.check_exports:
        verify_exports(entries, baseline)
        from build_review_bundle import verify_review
        for slug in dict.fromkeys(entry["book_slug"] for entry in entries):
            verify_review(slug)
        print(f"Verified {len(entries) * 3} page images and their ordered PDF contents")
        return
    if not args.write:
        print(f"Verified {len(entries)} preserved source illustrations and story texts; exports not required")
        return

    # Preflight the entire selected set before writing anything. Never substitute
    # fonts or silently skip a missing source and produce an incomplete book.
    PAGE_FONT = require_font(args.font, "page", baseline)
    review_font = require_font(args.review_font, "review", baseline)
    if EXPORT_ROOT.resolve() != EXPORT_ROOT:
        raise ValueError("export root must not redirect through a symlink")
    for entry in entries:
        for key in ("page_landscape_png", "derivative_4x5_png", "derivative_9x16_png"):
            target = REPO / entry["paths"][key]
            if target.resolve() != target or not target.is_relative_to(EXPORT_ROOT):
                raise ValueError(f"unsafe export target: {target}")
    for slug in dict.fromkeys(entry["book_slug"] for entry in entries):
        pdf = pdf_path(slug)
        for target in (pdf, pdf.parent / "review/index.html",
                       pdf.parent / "review" / f"{slug}-landscape-contact-sheet.jpg"):
            if target.resolve() != target:
                raise ValueError(f"unsafe export target: {target}")

    from build_review_bundle import build_review
    for book in manifest["books"]:
        book_entries = [entry for entry in entries if entry["book_slug"] == book["slug"]]
        if not book_entries:
            continue
        render_book(book_entries)
        verify_exports(book_entries, baseline)
        build_review(book, book_entries, review_font)
        print(f"Verified pilot appearance: {book['slug']} ({len(book_entries)} pages)", flush=True)
    print(f"On-demand export complete: {EXPORT_ROOT}")


def render_book(entries: list[dict]) -> None:
    rendered = 0
    landscape_pages: list[Path] = []
    for entry in entries:
        source_path = REPO / entry["paths"]["source_png"]
        targets = [
            ("landscape", (1536, 1024), REPO / entry["paths"]["page_landscape_png"]),
            ("4x5", (1080, 1350), REPO / entry["paths"]["derivative_4x5_png"]),
            ("9x16", (1080, 1920), REPO / entry["paths"]["derivative_9x16_png"]),
        ]
        with Image.open(source_path) as source:
            for derivative, size, target in targets:
                render_one(entry, source, target, size, derivative)
                rendered += 1
                if derivative == "landscape":
                    landscape_pages.append(target)
        print(f"Rendered {entry['id']} ({rendered} images)", flush=True)

    if landscape_pages:
        target = pdf_path(entries[0]["book_slug"])
        target.parent.mkdir(parents=True, exist_ok=True)
        pdf_images = []
        try:
            for path in landscape_pages:
                with Image.open(path) as image:
                    pdf_images.append(image.convert("RGB"))
            pdf_images[0].save(target, save_all=True, append_images=pdf_images[1:])
        finally:
            for image in pdf_images:
                image.close()
        print(f"wrote pdf: {target.relative_to(REPO)}", flush=True)


if __name__ == "__main__":
    main()
