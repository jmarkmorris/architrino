#!/usr/bin/env python3
"""Build the children's-book generated-image manifest."""

from __future__ import annotations

import json
import re
import argparse
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "production" / "generation-manifest.json"

# Books with current source-generation prompt approval managed by this manifest.
BOOKS = [
    {
        "slug": "here-there-back",
        "title": "Here, There, Back",
        "book_number": 1,
        "age_band": "0-1",
        "story_spreads": 8,
        "cover_count": 1,
        "back_matter_count": 1,
    },
    {
        "slug": "roll-turn-again",
        "title": "Roll, Turn, Again",
        "book_number": 2,
        "age_band": "1-2",
        "story_spreads": 10,
        "cover_count": 1,
        "back_matter_count": 1,
        "back_matter_story_text": "Roll.\nTurn.\nAgain.",
    },
    {
        "slug": "nature-remembers-motion",
        "title": "Nature Remembers Motion",
        "book_number": 3,
        "age_band": "2-3",
        "story_spreads": 12,
        "cover_count": 1,
        "back_matter_count": 1,
        "back_matter_story_text": "Make a trail.\nFollow it.\nAgain.",
    },
    {
        "slug": "again-makes-a-pattern",
        "title": "Again Makes A Pattern",
        "book_number": 4,
        "age_band": "3-4",
        "story_spreads": 12,
        "cover_count": 1,
        "back_matter_count": 1,
        "back_matter_story_text": "Roll again.\nFind the pattern.",
    },
]

PALETTE_RULE = (
    "Use only pure red, pure blue, red-blue purples, white, and black for "
    "non-human visual systems and AAA geometry. Keep scenery, clothing, and "
    "tools in white/purple/black unless a red or blue mark is explicitly part "
    "of the physics geometry. Human skin and hair may use natural tones."
)

TEXT_RULE = "No in-image text, captions, labels, equations, watermark, or logo."


def strip_blockquote(block: str) -> str:
    lines = []
    for line in block.strip().splitlines():
        line = line.strip()
        if line.startswith(">"):
            line = line[1:].strip()
        lines.append(line)
    while lines and not lines[0]:
        lines.pop(0)
    while lines and not lines[-1]:
        lines.pop()
    return "\n".join(lines)


def field(text: str, start_label: str, end_labels: list[str]) -> str:
    start = text.find(start_label)
    if start < 0:
        return ""
    start += len(start_label)
    ends = [text.find(label, start) for label in end_labels]
    ends = [idx for idx in ends if idx >= 0]
    end = min(ends) if ends else len(text)
    return text[start:end].strip()


def field_any(text: str, start_labels: list[str], end_labels: list[str]) -> str:
    for start_label in start_labels:
        value = field(text, start_label, end_labels)
        if value:
            return value
    return ""


def prompt_from_section(section: str) -> str:
    block = field(section, "Illustration prompt:", ["\n### ", "\n## "])
    return strip_blockquote(block)


def section_story_text(section: str) -> str:
    story_end_labels = [
        "\n\nLesson:",
        "\n\nEditor note:",
        "\n\n$\\mathbb{A}\\mathbb{A}\\mathbb{A}$ geometry:",
        "\n\nGeometry:",
        "\n\nBackground concepts:",
        "\n\nIllustration prompt:",
    ]
    title_block = field(section, "Read-aloud title:", story_end_labels)
    if title_block:
        return strip_blockquote(title_block)
    text_block = field(section, "Read-aloud text:", story_end_labels)
    return strip_blockquote(text_block)


def parse_sections(md: str) -> list[dict]:
    raw_sections = re.split(r"(?m)^### ", md)
    out = []
    for raw in raw_sections[1:]:
        heading, _, body = raw.partition("\n")
        heading = heading.strip()
        prompt = prompt_from_section(body)
        if not prompt:
            continue
        spread_match = re.match(r"Spread\s+(\d+):\s*(.+)", heading)
        if heading == "Cover":
            kind = "cover"
            sequence = 0
            label = "Cover"
        elif spread_match:
            kind = "story_spread"
            sequence = int(spread_match.group(1))
            label = spread_match.group(2).strip()
        else:
            continue
        out.append(
            {
                "kind": kind,
                "sequence": sequence,
                "label": label,
                "story_text": section_story_text(body),
                "lesson": field_any(
                    body,
                    ["Lesson:", "Editor note:"],
                    [
                        "\n\n$\\mathbb{A}\\mathbb{A}\\mathbb{A}$ geometry:",
                        "\n\nGeometry:",
                        "\n\nBackground concepts:",
                        "\n\nIllustration prompt:",
                    ],
                ),
                "geometry": field_any(
                    body,
                    ["$\\mathbb{A}\\mathbb{A}\\mathbb{A}$ geometry:", "Geometry:"],
                    ["\n\nBackground concepts:", "\n\nIllustration prompt:"],
                ),
                "background_concepts": field(body, "Background concepts:", ["\n\nIllustration prompt:"]),
                "prompt": prompt,
            }
        )
    return sorted(out, key=lambda item: (item["kind"] != "cover", item["sequence"]))


def extract_activity_lines(md: str) -> list[str]:
    activity = field(md, "### Activity", ["\n\n### ", "\n\n## "])
    compact = " ".join(
        line.strip().lstrip("> ").strip()
        for line in activity.splitlines()
        if line.strip()
    )
    if compact:
        return [compact]

    lines: list[str] = []
    for match in re.finditer(r"(?m)^\d+\.\s+(.+)$", md):
        lines.append(match.group(1).strip())
    if lines:
        return lines
    return []


def back_matter_entry(book: dict, index: int, activity: str) -> dict:
    title = book["title"]
    slug = book["slug"]
    prompt = (
        f"Back-matter activity source image for {title}. Show one clean, text-free "
        f"activity scene for: {activity}. Approved children's-book exemplar style, "
        f"natural human skin and hair, informal play, white page space, black "
        f"expressive linework, white/purple scenery and tools, and red/blue/purple "
        f"AAA geometry only where it teaches the activity. {TEXT_RULE}"
    )
    return {
        "id": f"{slug}-backmatter-{index:02d}",
        "book_slug": slug,
        "book_title": title,
        "book_number": book["book_number"],
        "age_band": book["age_band"],
        "kind": "back_matter_activity",
        "sequence": index,
        "label": f"Back Matter Activity {index}",
        "source_markdown": f"{slug}.md",
        "story_text": book.get(
            "back_matter_story_text",
            activity if book["slug"] != "here-there-back" else "Here.\nThere.\nBack.\nAgain.",
        ),
        "lesson": "Back-matter activity image.",
        "geometry": "Use the geometry already introduced in the story at activity scale.",
        "background_concepts": "Adult/teacher support image; keep it text-free.",
        "prompt": prompt,
    }


def entry_paths(entry: dict) -> dict:
    slug = entry["book_slug"]
    eid = entry["id"]
    return {
        "source_png": f"reference/outreach/childrens-books/production/source/{slug}/{eid}.png",
        "qa_json": f"reference/outreach/childrens-books/production/qa/{slug}/{eid}.qa.json",
        "qa_markdown": f"reference/outreach/childrens-books/production/qa/{slug}/{eid}.qa.md",
        "page_landscape_png": f"reference/outreach/childrens-books/production/pages/{slug}/landscape/{eid}.png",
        "derivative_4x5_png": f"reference/outreach/childrens-books/production/derivatives/{slug}/4x5/{eid}.png",
        "derivative_9x16_png": f"reference/outreach/childrens-books/production/derivatives/{slug}/9x16/{eid}.png",
    }


def status_for(paths: dict) -> dict:
    repo = ROOT.parents[2]

    def exists(repo_path: str) -> bool:
        return (repo / repo_path).exists()

    def qa_status() -> str:
        qa_path = repo / paths["qa_json"]
        if not qa_path.exists():
            return "pending"
        try:
            decision = json.loads(qa_path.read_text()).get("decision")
        except json.JSONDecodeError:
            return "reported"
        return decision or "reported"

    source = exists(paths["source_png"])
    page = exists(paths["page_landscape_png"])
    d4 = exists(paths["derivative_4x5_png"])
    d9 = exists(paths["derivative_9x16_png"])
    return {
        "source_image": "generated" if source else "planned",
        "qa": qa_status(),
        "page_layout": "exported" if page else "pending",
        "derivative_4x5": "exported" if d4 else "pending",
        "derivative_9x16": "exported" if d9 else "pending",
    }


def build_book_entries(book: dict) -> tuple[dict, list[dict]]:
    md_path = ROOT / f"{book['slug']}.md"
    md = md_path.read_text()
    sections = parse_sections(md)
    expected_prompt_count = book["cover_count"] + book["story_spreads"]
    if len(sections) != expected_prompt_count:
        raise SystemExit(
            f"{book['slug']}: expected {expected_prompt_count} cover/story prompts, found {len(sections)}"
        )

    book_entries = []
    for section in sections:
        eid = f"{book['slug']}-cover" if section["kind"] == "cover" else f"{book['slug']}-spread-{section['sequence']:02d}"
        entry = {
            "id": eid,
            "book_slug": book["slug"],
            "book_title": book["title"],
            "book_number": book["book_number"],
            "age_band": book["age_band"],
            "source_markdown": f"{book['slug']}.md",
            **section,
        }
        book_entries.append(entry)

    activities = extract_activity_lines(md)
    if not activities:
        activities = ["teacher-led review activity using the story's physical play materials"]
    for idx in range(1, book["back_matter_count"] + 1):
        activity = activities[(idx - 1) % len(activities)]
        book_entries.append(back_matter_entry(book, idx, activity))

    for entry in book_entries:
        entry["palette_rule"] = PALETTE_RULE
        entry["text_rule"] = TEXT_RULE
        entry["aspect"] = "landscape_3x2_source"
        entry["paths"] = entry_paths(entry)
        entry["status"] = status_for(entry["paths"])

    book_out = {
        **book,
        "target_source_images": book["cover_count"] + book["story_spreads"] + book["back_matter_count"],
        "manifest_entries": len(book_entries),
    }
    return book_out, book_entries


def build_manifest() -> dict:
    entries = []
    books_out = []
    for book in BOOKS:
        book_out, book_entries = build_book_entries(book)
        entries.extend(book_entries)
        books_out.append(book_out)

    total = sum(book["target_source_images"] for book in books_out)
    if len(entries) != total:
        raise SystemExit(f"manifest count mismatch: books={total}, entries={len(entries)}")

    return {
        "schema_version": 1,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "root": "reference/outreach/childrens-books",
        "total_source_images": total,
        "generation_order": [book["slug"] for book in BOOKS],
        "books": books_out,
        "entries": entries,
    }


def refresh_manifest_book(book_slug: str) -> dict:
    book = next((candidate for candidate in BOOKS if candidate["slug"] == book_slug), None)
    if not book:
        raise SystemExit(f"unknown book slug: {book_slug}")
    if not OUT.exists():
        raise SystemExit(f"cannot refresh {book_slug}: manifest missing at {OUT}")

    manifest = json.loads(OUT.read_text())
    book_out, book_entries = build_book_entries(book)
    manifest["generated_at"] = datetime.now(timezone.utc).isoformat()

    existing_books = manifest.get("books", [])
    replaced = False
    for index, existing_book in enumerate(existing_books):
        if existing_book.get("slug") == book_slug:
            existing_books[index] = book_out
            replaced = True
            break
    if not replaced:
        existing_books.append(book_out)
    manifest["books"] = existing_books

    entries_by_book: dict[str, list[dict]] = {}
    for entry in manifest.get("entries", []):
        slug = entry.get("book_slug")
        if slug != book_slug:
            entries_by_book.setdefault(slug, []).append(entry)
    entries_by_book[book_slug] = book_entries

    ordered_entries: list[dict] = []
    for slug in manifest.get("generation_order", []):
        ordered_entries.extend(entries_by_book.pop(slug, []))
    for slug in sorted(entries_by_book):
        ordered_entries.extend(entries_by_book[slug])
    manifest["entries"] = ordered_entries
    return manifest


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--book", help="Refresh only one book in the existing manifest")
    args = parser.parse_args()

    OUT.parent.mkdir(parents=True, exist_ok=True)
    manifest = refresh_manifest_book(args.book) if args.book else build_manifest()
    OUT.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"wrote {OUT.relative_to(ROOT.parents[2])}")
    print(f"entries: {len(manifest['entries'])}")


if __name__ == "__main__":
    main()
