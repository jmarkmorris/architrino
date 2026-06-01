#!/usr/bin/env python3
"""Build the children's-book source-image generation manifest."""

from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "production" / "generation-manifest.json"

BOOKS = [
    {
        "slug": "here-there-back",
        "title": "Here, There, Back",
        "age_band": "baby-toddler",
        "story_spreads": 8,
        "cover_count": 1,
        "back_matter_count": 1,
    },
    {
        "slug": "nature-remembers-motion",
        "title": "Nature Remembers Motion",
        "age_band": "3-5",
        "story_spreads": 12,
        "cover_count": 1,
        "back_matter_count": 2,
    },
    {
        "slug": "the-message-that-traveled",
        "title": "The Message That Traveled",
        "age_band": "6-8",
        "story_spreads": 16,
        "cover_count": 1,
        "back_matter_count": 2,
    },
    {
        "slug": "the-tiny-transceivers",
        "title": "The Tiny Transceivers",
        "age_band": "9-11",
        "story_spreads": 18,
        "cover_count": 1,
        "back_matter_count": 3,
    },
    {
        "slug": "the-balance-point",
        "title": "The Balance Point",
        "age_band": "12-14",
        "story_spreads": 18,
        "cover_count": 1,
        "back_matter_count": 4,
    },
    {
        "slug": "the-history-that-pushes-now",
        "title": "The History That Pushes Now",
        "age_band": "15-16",
        "story_spreads": 20,
        "cover_count": 1,
        "back_matter_count": 5,
    },
    {
        "slug": "the-world-we-recover",
        "title": "The World We Recover",
        "age_band": "17-18",
        "story_spreads": 20,
        "cover_count": 1,
        "back_matter_count": 6,
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


def prompt_from_section(section: str) -> str:
    block = field(section, "Illustration prompt:", ["\n### ", "\n## "])
    return strip_blockquote(block)


def section_story_text(section: str) -> str:
    title_block = field(section, "Read-aloud title:", ["\n\nLesson:"])
    if title_block:
        return strip_blockquote(title_block)
    text_block = field(section, "Read-aloud text:", ["\n\nLesson:"])
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
                "lesson": field(body, "Lesson:", ["\n\n$\\mathbb{A}\\mathbb{A}\\mathbb{A}$ geometry:"]),
                "geometry": field(
                    body,
                    "$\\mathbb{A}\\mathbb{A}\\mathbb{A}$ geometry:",
                    ["\n\nBackground concepts:"],
                ),
                "background_concepts": field(body, "Background concepts:", ["\n\nIllustration prompt:"]),
                "prompt": prompt,
            }
        )
    return sorted(out, key=lambda item: (item["kind"] != "cover", item["sequence"]))


def extract_activity_lines(md: str) -> list[str]:
    lines: list[str] = []
    for match in re.finditer(r"(?m)^\d+\.\s+(.+)$", md):
        lines.append(match.group(1).strip())
    if lines:
        return lines
    activity = field(md, "### Activity", ["\n\n### ", "\n\n## "])
    compact = " ".join(
        line.strip().lstrip("> ").strip()
        for line in activity.splitlines()
        if line.strip()
    )
    if compact:
        return [compact]
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
        "age_band": book["age_band"],
        "kind": "back_matter_activity",
        "sequence": index,
        "label": f"Back Matter Activity {index}",
        "source_markdown": f"{slug}.md",
        "story_text": activity if book["slug"] != "here-there-back" else "Here.\nThere.\nBack.\nAgain.",
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


def build_manifest() -> dict:
    entries = []
    books_out = []
    for book in BOOKS:
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

        entries.extend(book_entries)
        books_out.append(
            {
                **book,
                "target_source_images": book["cover_count"] + book["story_spreads"] + book["back_matter_count"],
                "manifest_entries": len(book_entries),
            }
        )

    total = sum(book["target_source_images"] for book in books_out)
    if total != 142 or len(entries) != 142:
        raise SystemExit(f"manifest count mismatch: books={total}, entries={len(entries)}")

    return {
        "schema_version": 1,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "root": "reference/outreach/childrens-books",
        "total_source_images": 142,
        "generation_order": [book["slug"] for book in BOOKS],
        "books": books_out,
        "entries": entries,
    }


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    manifest = build_manifest()
    OUT.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"wrote {OUT.relative_to(ROOT.parents[2])}")
    print(f"entries: {len(manifest['entries'])}")


if __name__ == "__main__":
    main()
