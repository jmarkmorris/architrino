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
    {
        "slug": "what-changed",
        "title": "What Changed?",
        "book_number": 5,
        "age_band": "4-5",
        "story_spreads": 12,
        "cover_count": 1,
        "back_matter_count": 1,
        "back_matter_story_text": "Change one thing.\nCompare what happened.",
    },
    {
        "slug": "the-message-that-traveled",
        "title": "The Message That Traveled",
        "book_number": 6,
        "age_band": "5-6",
        "story_spreads": 12,
        "cover_count": 1,
        "back_matter_count": 2,
        "back_matter_story_text": "Begin.\nTravel.\nArrive.",
        "back_matter_activities": [
            (
                "Electra and Poz sit apart in a white play space while a grown-up hand taps a small "
                "white-and-purple bell near Poz. Soft purple sound rings travel from the bell toward "
                "Electra. Keep the source bell, travel path, and Electra's listening arrival place visible."
            ),
            (
                "Electra and Poz sit beside a shallow white tray of pale purple-blue water while a "
                "grown-up hand drops a small purple pebble into the water. A ripple travels outward "
                "and reaches a small paper leaf, moving it gently."
            ),
        ],
    },
    {
        "slug": "patterns-that-hold",
        "title": "Patterns That Hold",
        "book_number": 8,
        "age_band": "7-8",
        "story_spreads": 12,
        "cover_count": 1,
        "back_matter_count": 2,
        "back_matter_story_text": "Move.\nFit.\nHold.",
        "back_matter_activities": [
            (
                "Electra and Poz sit beside a white bead table while a small grown-up hand gives "
                "one bead a gentle push. Three beads on soft purple strings show older/fainter "
                "and newer/fresher arc traces returning to a simple repeated relation. Keep the "
                "grown-up hand small and secondary"
            ),
            (
                "Electra and Poz watch while a small grown-up hand moves one bead farther from a "
                "three-bead setup. Keep the other beads in place, show the old repeated arcs "
                "faintly, and show the newer motion trace failing to fit until the spacing is "
                "restored nearby"
            ),
        ],
    },
    {
        "slug": "the-tiny-transceivers",
        "title": "The Tiny Transceivers",
        "book_number": 9,
        "age_band": "8-9",
        "story_spreads": 14,
        "cover_count": 1,
        "back_matter_count": 2,
        "back_matter_story_text": "Path.\nSend.\nReceive.",
        "back_matter_activities": [
            (
                "Electra and Poz sit beside a white tabletop lab surface while a small grown-up "
                "hand places or slides one red point token across the surface. The point leaves "
                "a short red path trace with older/fainter and newer/fresher positions, showing "
                "persistent identity through motion"
            ),
            (
                "Electra and Poz watch while a small grown-up hand points to an earlier red "
                "source position, a soft red wake traveling from it, and a blue point whose path "
                "bends after the wake arrives"
            ),
        ],
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
    export = f".local-data/childrens-books/exports/{slug}"
    return {
        "source_png": f"content/assets/images/archie/childrens-books/source/{slug}/{eid}.png",
        "qa_json": f"reference/learning-office/childrens-books/production/qa/{slug}/{eid}.qa.json",
        "qa_markdown": f"reference/learning-office/childrens-books/production/qa/{slug}/{eid}.qa.md",
        "page_landscape_png": f"{export}/landscape/{eid}.png",
        "derivative_4x5_png": f"{export}/4x5/{eid}.png",
        "derivative_9x16_png": f"{export}/9x16/{eid}.png",
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
    return {
        "source_image": "generated" if source else "planned",
        "qa": qa_status(),
        # Local export existence must never change a tracked manifest.
        "page_layout": "on_demand",
        "derivative_4x5": "on_demand",
        "derivative_9x16": "on_demand",
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

    activities = book.get("back_matter_activities") or extract_activity_lines(md)
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
        "schema_version": 2,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "root": "reference/learning-office/childrens-books",
        "total_source_images": total,
        "generation_order": [book["slug"] for book in BOOKS],
        "books": books_out,
        "entries": entries,
    }


def checked_manifest() -> dict:
    stored = json.loads(OUT.read_text())
    expected = build_manifest()
    if {k: v for k, v in stored.items() if k != "generated_at"} != {
        k: v for k, v in expected.items() if k != "generated_at"
    }:
        raise ValueError("manifest drift: run build_generation_manifest.py --write in an authorized refresh")
    return stored


def main() -> None:
    parser = argparse.ArgumentParser()
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--write", action="store_true", help="Refresh the tracked manifest explicitly")
    mode.add_argument("--check", action="store_true", help="Check without writing (default)")
    args = parser.parse_args()

    manifest = build_manifest()
    if args.write:
        OUT.parent.mkdir(parents=True, exist_ok=True)
        OUT.write_text(json.dumps(manifest, indent=2) + "\n")
        print(f"wrote {OUT.relative_to(ROOT.parents[2])}")
    else:
        checked_manifest()
        print("manifest matches manuscripts, sources and QA; local exports are optional")
    print(f"entries: {len(manifest['entries'])}")


if __name__ == "__main__":
    main()
