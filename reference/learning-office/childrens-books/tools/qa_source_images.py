#!/usr/bin/env python3
"""Write lightweight QA reports for generated source images."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from PIL import Image


REPO = Path(__file__).resolve().parents[4]
MANIFEST = REPO / "reference/learning-office/childrens-books/production/generation-manifest.json"


def saturated_non_palette_fraction(image: Image.Image) -> float:
    rgb = image.convert("RGB").resize((256, 256))
    off_palette = 0
    sampled = 0
    get_pixels = getattr(rgb, "get_flattened_data", rgb.getdata)
    for r, g, b in get_pixels():
        mx = max(r, g, b)
        mn = min(r, g, b)
        if mx < 80 or mx - mn < 45:
            continue
        sampled += 1
        # Allow red, blue, purple, white/black/gray. Flag saturated yellow,
        # green, teal, and orange as likely style-guide drift.
        redish = r > 150 and g < 110 and b < 140
        blueish = b > 150 and r < 140 and g < 140
        purpleish = r > 95 and b > 95 and g < max(r, b) * 0.75
        if not (redish or blueish or purpleish):
            off_palette += 1
    return off_palette / sampled if sampled else 0.0


def qa_entry(entry: dict, approve: bool) -> dict:
    source = REPO / entry["paths"]["source_png"]
    result = {
        "id": entry["id"],
        "book_slug": entry["book_slug"],
        "source_png": entry["paths"]["source_png"],
        "exists": source.exists(),
        "automated": {},
        "manual_checklist": {
            "palette": "approved" if approve else "pending",
            "no_in_image_text": "approved" if approve else "pending",
            "one_continuous_scene": "approved" if approve else "pending",
            "correct_geometry": "approved" if approve else "pending",
        },
        "decision": "approved" if approve else "pending",
    }
    if not source.exists():
        return result

    image = Image.open(source)
    w, h = image.size
    off_palette = saturated_non_palette_fraction(image)
    result["automated"] = {
        "width": w,
        "height": h,
        "aspect_ratio": round(w / h, 4),
        "saturated_non_palette_fraction": round(off_palette, 4),
        "palette_flag": off_palette > 0.08,
    }
    return result


def write_markdown(entry: dict, qa: dict) -> str:
    auto = qa["automated"]
    lines = [
        f"# QA: {entry['label']}",
        "",
        f"- id: `{entry['id']}`",
        f"- source: `{entry['paths']['source_png']}`",
        f"- lesson: {entry['lesson']}",
        f"- geometry: {entry['geometry']}",
        "",
        "## Automated Checks",
        "",
    ]
    if not qa["exists"]:
        lines.append("- source image: missing")
    else:
        lines.extend(
            [
                "- source image: present",
                f"- dimensions: {auto['width']} x {auto['height']}",
                f"- aspect ratio: {auto['aspect_ratio']}",
                f"- saturated non-palette fraction: {auto['saturated_non_palette_fraction']}",
                f"- palette flag: {auto['palette_flag']}",
            ]
        )
    lines.extend(
        [
            "",
            "## Manual Checklist",
            "",
            f"- [{'x' if qa['manual_checklist']['palette'] == 'approved' else ' '}] Palette follows the style guide.",
            f"- [{'x' if qa['manual_checklist']['no_in_image_text'] == 'approved' else ' '}] No in-image text, captions, labels, equations, watermark, or logo.",
            f"- [{'x' if qa['manual_checklist']['one_continuous_scene'] == 'approved' else ' '}] One continuous scene, not a contact sheet or inset diagram collection.",
            f"- [{'x' if qa['manual_checklist']['correct_geometry'] == 'approved' else ' '}] Geometry teaches the stated lesson.",
            "",
            f"Decision: {qa['decision']}",
            "",
        ]
    )
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--book", required=True)
    parser.add_argument("--approve", action="store_true", help="mark manual checklist approved after visual review")
    args = parser.parse_args()

    manifest = json.loads(MANIFEST.read_text())
    entries = [entry for entry in manifest["entries"] if entry["book_slug"] == args.book]
    if not entries:
        raise SystemExit(f"no manifest entries for book {args.book}")

    qa_root = REPO / "reference/learning-office/childrens-books/production/qa" / args.book
    qa_root.mkdir(parents=True, exist_ok=True)
    summary = []
    for entry in entries:
        qa = qa_entry(entry, args.approve)
        summary.append(qa)
        json_path = REPO / entry["paths"]["qa_json"]
        md_path = REPO / entry["paths"]["qa_markdown"]
        json_path.parent.mkdir(parents=True, exist_ok=True)
        json_path.write_text(json.dumps(qa, indent=2) + "\n")
        md_path.write_text(write_markdown(entry, qa))

    summary_path = qa_root / f"{args.book}-qa-summary.json"
    summary_path.write_text(json.dumps(summary, indent=2) + "\n")
    present = sum(1 for item in summary if item["exists"])
    flags = sum(1 for item in summary if item.get("automated", {}).get("palette_flag"))
    print(f"wrote QA for {len(summary)} manifest entries")
    print(f"source images present: {present}")
    print(f"automated palette flags: {flags}")


if __name__ == "__main__":
    main()
