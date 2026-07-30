#!/usr/bin/env python3
"""Build review contact sheets and local review indexes for a book."""

from __future__ import annotations

import argparse
import html
import json
import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


REPO = Path(__file__).resolve().parents[4]
PRODUCTION = REPO / "reference/learning-office/childrens-books/production"
MANIFEST = PRODUCTION / "generation-manifest.json"
FONT_CANDIDATES = [
    Path("/System/Library/Fonts/Supplemental/Arial.ttf"),
    Path("/System/Library/Fonts/Supplemental/Georgia.ttf"),
]


CHECKLISTS = {
    "the-tiny-transceivers": [
        "No in-image text, letters, numbers, labels, logos, or watermarks in source art.",
        "Electra and Poz stay visually consistent enough with Books 1-8.",
        "Electra and Poz are not red/blue polarity roles, teams, moods, or personalities.",
        "Red and blue points remain point transceivers, not faces, atoms, planets, beads, balls, dust, or characters.",
        "Paths, source positions, wakes, received cues, and path bends stay easy to point to.",
        "Spread 4's blank card stays blank, with no generated word or pseudo-writing.",
        "The reverse text band is readable and does not cover important path geometry.",
    ],
}

DEFAULT_CHECKLIST = [
    "No in-image text, letters, numbers, labels, logos, or watermarks in source art.",
    "Electra and Poz stay visually consistent enough with the approved previous books.",
    "The intended page geometry stays easy to point to.",
    "The source image remains one continuous scene, not a contact sheet or detached diagram.",
    "The reverse text band is readable and does not cover important visual information.",
]


def load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for path in FONT_CANDIDATES:
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default(size=size)


def contact_sheet(entries: list[dict], output: Path) -> None:
    thumb_size = (720, 480)
    label_height = 38
    gap = 24
    cols = 2
    rows = (len(entries) + cols - 1) // cols
    width = cols * thumb_size[0] + (cols + 1) * gap
    row_height = thumb_size[1] + label_height + gap
    height = rows * row_height + gap
    sheet = Image.new("RGB", (width, height), (255, 255, 255))
    draw = ImageDraw.Draw(sheet)
    font = load_font(24)

    for index, entry in enumerate(entries):
        row, col = divmod(index, cols)
        x = gap + col * (thumb_size[0] + gap)
        y = gap + row * row_height
        page_path = REPO / entry["paths"]["page_landscape_png"]
        image = Image.open(page_path).convert("RGB")
        tile = Image.new("RGB", thumb_size, (255, 255, 255))
        image = ImageOps.contain(image, thumb_size, method=Image.Resampling.LANCZOS)
        tile.paste(image, ((thumb_size[0] - image.width) // 2, (thumb_size[1] - image.height) // 2))
        sheet.paste(tile, (x, y))
        draw.rectangle((x, y + thumb_size[1], x + thumb_size[0], y + thumb_size[1] + label_height), fill=(250, 247, 252))
        draw.text((x + 12, y + thumb_size[1] + 7), entry["id"], fill=(29, 23, 35), font=font)

    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output, quality=92)


def figure(src: str, alt: str, caption: str) -> str:
    return (
        f'        <figure><img src="{html.escape(src)}" alt="{html.escape(alt)}">'
        f"<figcaption>{html.escape(caption)}</figcaption></figure>"
    )


def repo_relative_link(output: Path, repo_path: str) -> str:
    return Path(os.path.relpath(REPO / repo_path, start=output.parent)).as_posix()


def review_index(book: dict, entries: list[dict], output: Path) -> None:
    slug = book["slug"]
    title = book["title"]
    book_number = book["book_number"]
    checklist = CHECKLISTS.get(slug, DEFAULT_CHECKLIST)
    contact_name = f"{slug}-landscape-contact-sheet.jpg"
    landscape_figures = "\n".join(
        figure(
            repo_relative_link(output, entry["paths"]["page_landscape_png"]),
            entry["label"],
            entry["id"].replace(f"{slug}-", ""),
        )
        for entry in entries
    )
    source_figures = "\n".join(
        figure(
            repo_relative_link(output, entry["paths"]["source_png"]),
            f"Source {entry['label']}",
            f"source {entry['id'].replace(f'{slug}-', '')}",
        )
        for entry in entries
    )
    checklist_items = "\n".join(f"        <li>{html.escape(item)}</li>" for item in checklist)
    document = f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{html.escape(title)} - Review</title>
  <style>
    body {{
      margin: 0;
      font-family: Arial, sans-serif;
      color: #1d1723;
      background: #fff;
    }}

    header,
    main {{
      max-width: 1120px;
      margin: 0 auto;
      padding: 24px;
    }}

    header {{
      border-bottom: 1px solid #e7dff0;
    }}

    h1,
    h2 {{
      margin: 0 0 12px;
      font-weight: 700;
    }}

    p {{
      line-height: 1.45;
      margin: 0 0 14px;
    }}

    a {{
      color: #4b1173;
      font-weight: 700;
    }}

    .links {{
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 16px;
    }}

    .links a {{
      border: 1px solid #cdb7dd;
      border-radius: 6px;
      padding: 10px 12px;
      text-decoration: none;
      background: #faf7fc;
    }}

    .section {{
      padding: 28px 0;
      border-bottom: 1px solid #eee7f4;
    }}

    .checklist {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
      gap: 10px;
      padding: 0;
      list-style: none;
    }}

    .checklist li {{
      border: 1px solid #eee7f4;
      border-radius: 6px;
      padding: 12px;
      background: #fff;
    }}

    .contact {{
      display: block;
      max-width: 100%;
      height: auto;
      border: 1px solid #eee7f4;
    }}

    .grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
    }}

    figure {{
      margin: 0;
      border: 1px solid #eee7f4;
      border-radius: 6px;
      overflow: hidden;
      background: #fff;
    }}

    figure img {{
      width: 100%;
      display: block;
    }}

    figcaption {{
      padding: 9px 10px;
      font-size: 14px;
      background: #faf7fc;
    }}
  </style>
</head>
<body>
  <header>
    <h1>{html.escape(title)} - Book {book_number} Review</h1>
    <p>First-draft source images and page layouts are generated. QA is intentionally pending until operator review.</p>
    <div class="links">
      <a href="{repo_relative_link(output, f'content/assets/books/childrens-books/{slug}/{slug}-first-draft.pdf')}">Open first-draft PDF</a>
      <a href="{contact_name}">Open contact sheet</a>
      <a href="../../qa/{slug}/{slug}-qa-summary.json">Open QA summary</a>
      <a href="../../generation-manifest.json">Open manifest</a>
    </div>
  </header>
  <main>
    <section class="section">
      <h2>Review Checklist</h2>
      <ul class="checklist">
{checklist_items}
      </ul>
    </section>

    <section class="section">
      <h2>Contact Sheet</h2>
      <img class="contact" src="{contact_name}" alt="Book {book_number} landscape page contact sheet">
    </section>

    <section class="section">
      <h2>Landscape Pages</h2>
      <div class="grid">
{landscape_figures}
      </div>
    </section>

    <section class="section">
      <h2>Source Images</h2>
      <div class="grid">
{source_figures}
      </div>
    </section>
  </main>
</body>
</html>
"""
    output.write_text(document)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--book", required=True)
    args = parser.parse_args()

    manifest = json.loads(MANIFEST.read_text())
    book = next((item for item in manifest["books"] if item["slug"] == args.book), None)
    if book is None:
        raise SystemExit(f"no book metadata for {args.book}")
    entries = [entry for entry in manifest["entries"] if entry["book_slug"] == args.book]
    if not entries:
        raise SystemExit(f"no manifest entries for {args.book}")
    missing = [entry["paths"]["page_landscape_png"] for entry in entries if not (REPO / entry["paths"]["page_landscape_png"]).exists()]
    if missing:
        raise SystemExit("missing landscape pages:\n" + "\n".join(missing))

    review_dir = PRODUCTION / "review" / args.book
    contact_path = review_dir / f"{args.book}-landscape-contact-sheet.jpg"
    index_path = review_dir / "index.html"
    contact_sheet(entries, contact_path)
    review_index(book, entries, index_path)
    print(f"wrote contact sheet: {contact_path.relative_to(REPO)}")
    print(f"wrote review index: {index_path.relative_to(REPO)}")


if __name__ == "__main__":
    main()
