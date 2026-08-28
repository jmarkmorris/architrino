"""Frozen-pilot appearance comparison, independent of the page compositor.

Hashes establish reproduction of the saved pilot, not editorial/physics approval.
Capturing a replacement baseline requires a separate operator-reviewed decision.
"""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path

import PIL
from PIL import Image, features
from pypdf import PdfReader

REPO = Path(__file__).resolve().parents[4]
PRODUCTION = REPO / "reference/learning-office/childrens-books/production"
BASELINE = PRODUCTION / "pilot-appearance.json"
PAGE_KEYS = ("page_landscape_png", "derivative_4x5_png", "derivative_9x16_png")
PAGE_FONT = Path("/System/Library/Fonts/Supplemental/Georgia.ttf")
REVIEW_FONT = Path("/System/Library/Fonts/Supplemental/Arial.ttf")


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def image_signature(path: Path) -> dict:
    with Image.open(path) as image:
        rgb = image.convert("RGB")
        return {"size": list(rgb.size), "rgb_sha256": sha256(rgb.tobytes())}


def pdf_signature(path: Path) -> list[dict]:
    """Compare page order, geometry, drawing commands and image streams, not dates."""
    result = []
    for page in PdfReader(path).pages:
        if page.rotation != 0 or list(page.cropbox) != list(page.mediabox):
            raise ValueError(f"unexpected PDF rotation or crop: {path}")
        images = page["/Resources"]["/XObject"]
        for image in images.values():
            image = image.get_object()
            if image.get("/ColorSpace") != "/DeviceRGB" or image.get("/BitsPerComponent") != 8:
                raise ValueError(f"unexpected pilot PDF image color interpretation: {path}")
        result.append({
            "media_box": [float(value) for value in page.mediabox],
            "contents_sha256": sha256(page.get_contents().get_data()),
            "images": [{
                "name": str(name),
                "width": images[name]["/Width"],
                "height": images[name]["/Height"],
                "filter": str(images[name].get("/Filter")),
                "data_sha256": sha256(images[name].get_data()),
            } for name in sorted(images)],
        })
    return result


def source_signature(entry: dict) -> dict:
    return {
        "source_sha256": sha256((REPO / entry["paths"]["source_png"]).read_bytes()),
        "kind": entry["kind"],
        "text": entry.get("story_text") or entry["label"],
    }


def pdf_path(slug: str) -> Path:
    return REPO / ".local-data/childrens-books/exports" / slug / f"{slug}-first-draft.pdf"


def verify_sources(entries: list[dict], baseline: dict) -> None:
    for entry in entries:
        expected = baseline["entries"].get(entry["id"])
        if expected is None or source_signature(entry) != expected["source"]:
            raise ValueError(f"pilot source/text changed or missing baseline: {entry['id']}")


def verify_exports(entries: list[dict], baseline: dict) -> None:
    verify_sources(entries, baseline)
    for entry in entries:
        for key in PAGE_KEYS:
            if image_signature(REPO / entry["paths"][key]) != baseline["entries"][entry["id"]][key]:
                raise ValueError(f"pilot appearance mismatch: {entry['id']} {key}")
    for slug in dict.fromkeys(entry["book_slug"] for entry in entries):
        if pdf_signature(pdf_path(slug)) != baseline["pdfs"][slug]:
            raise ValueError(f"pilot PDF page/order/content mismatch: {slug}")


def require_font(path: Path, role: str, baseline: dict) -> Path:
    path = path.expanduser().resolve()
    if not path.is_file() or sha256(path.read_bytes()) != baseline["fonts"][role]["sha256"]:
        raise ValueError(f"matching pilot {role} font required: {path}; no font substitution allowed")
    return path


def capture(manifest: dict) -> dict:
    result = {
        "schema_version": 1,
        "claim": "Saved-pilot pixel and PDF-content reproduction only; not source-art QA approval.",
        "environment": {"pillow": PIL.__version__, "freetype": features.version("freetype2")},
        "fonts": {role: {"name": path.name, "sha256": sha256(path.read_bytes())}
                  for role, path in [("page", PAGE_FONT), ("review", REVIEW_FONT)]},
        "entries": {},
        "pdfs": {},
    }
    for entry in manifest["entries"]:
        result["entries"][entry["id"]] = {
            "source": source_signature(entry),
            **{key: image_signature(REPO / entry["paths"][key]) for key in PAGE_KEYS},
        }
    for book in manifest["books"]:
        slug = book["slug"]
        result["pdfs"][slug] = pdf_signature(pdf_path(slug))
    return result


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--capture-reviewed-baseline", action="store_true", required=True,
                        help="Replace baseline only after explicit operator review; never a normal export step")
    args = parser.parse_args()
    manifest = json.loads((PRODUCTION / "generation-manifest.json").read_text())
    BASELINE.write_text(json.dumps(capture(manifest), indent=2) + "\n")
    print(f"Captured {len(manifest['entries'])} reviewed pilot entries: {BASELINE}")


if __name__ == "__main__":
    main()
