#!/usr/bin/env python3
from __future__ import annotations

import argparse
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable


EPSILON_ENTITY = "&#x03F5;"

ACCENT_BLUE = "#3c8dff"
ACCENT_PURPLE = "#b889ff"
ACCENT_RED = "#ff5561"

POLARITY_BLUE = "#1879ff"
POLARITY_RED = "#ff3d3d"
STRUCTURE_PURPLE = "#a259ff"


@dataclass(frozen=True)
class TileSpec:
    key: str
    output_name: str | None
    glyph_id: str
    stroke: str
    top_sign: str | None = None
    bottom_sign: str | None = None
    top_color: str | None = None
    bottom_color: str | None = None
    selected: bool = False


STANDALONE_SPECS = {
    "bare": TileSpec(
        key="bare",
        output_name="glyph-binary-bare.svg",
        glyph_id="baseBinaryGlyph",
        stroke=ACCENT_PURPLE,
    ),
    "negative": TileSpec(
        key="negative",
        output_name="glyph-binary-negative.svg",
        glyph_id="personality-ee",
        stroke=ACCENT_BLUE,
        top_sign="-",
        bottom_sign="-",
        top_color=POLARITY_BLUE,
        bottom_color=POLARITY_BLUE,
    ),
    "neutral": TileSpec(
        key="neutral",
        output_name="glyph-binary-neutral.svg",
        glyph_id="personality-pe",
        stroke=ACCENT_PURPLE,
        top_sign="+",
        bottom_sign="-",
        top_color=POLARITY_RED,
        bottom_color=POLARITY_BLUE,
        selected=True,
    ),
    "positive": TileSpec(
        key="positive",
        output_name="glyph-binary-positive.svg",
        glyph_id="personality-pp",
        stroke=ACCENT_RED,
        top_sign="+",
        bottom_sign="+",
        top_color=POLARITY_RED,
        bottom_color=POLARITY_RED,
    ),
}

PROTOTYPE_SPECS = [
    TileSpec(
        key="negative",
        output_name=None,
        glyph_id="personality-ee",
        stroke=ACCENT_BLUE,
        top_sign="-",
        bottom_sign="-",
        top_color=POLARITY_BLUE,
        bottom_color=POLARITY_BLUE,
    ),
    TileSpec(
        key="neutral",
        output_name=None,
        glyph_id="personality-pe",
        stroke=ACCENT_PURPLE,
        top_sign="+",
        bottom_sign="-",
        top_color=POLARITY_RED,
        bottom_color=POLARITY_BLUE,
        selected=True,
    ),
    TileSpec(
        key="alternate-neutral",
        output_name=None,
        glyph_id="personality-ep",
        stroke=ACCENT_PURPLE,
        top_sign="-",
        bottom_sign="+",
        top_color=POLARITY_BLUE,
        bottom_color=POLARITY_RED,
        selected=True,
    ),
    TileSpec(
        key="positive",
        output_name=None,
        glyph_id="personality-pp",
        stroke=ACCENT_RED,
        top_sign="+",
        bottom_sign="+",
        top_color=POLARITY_RED,
        bottom_color=POLARITY_RED,
    ),
]


def svg_defs() -> str:
    return """  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#10172a"/>
      <stop offset="100%" stop-color="#090d18"/>
    </linearGradient>
    <linearGradient id="chipFill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
    <linearGradient id="chipSelected" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#000000" flood-opacity="0.34"/>
    </filter>
    <filter id="glowPurple" x="-60%" y="-60%" width="220%" height="220%">
      <feDropShadow dx="0" dy="0" stdDeviation="5.5" flood-color="#9b5cff" flood-opacity="0.22"/>
    </filter>
    <filter id="glowBlue" x="-60%" y="-60%" width="220%" height="220%">
      <feDropShadow dx="0" dy="0" stdDeviation="4.2" flood-color="#1b84ff" flood-opacity="0.28"/>
    </filter>
    <filter id="glowRed" x="-60%" y="-60%" width="220%" height="220%">
      <feDropShadow dx="0" dy="0" stdDeviation="4.2" flood-color="#ff3d4a" flood-opacity="0.26"/>
    </filter>
    <filter id="chipSelectedGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="12" flood-color="#000000" flood-opacity="0.26"/>
      <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#000000" flood-opacity="0.34"/>
    </filter>
    <g id="baseBinaryGlyph">
      <ellipse cx="0" cy="0" rx="60" ry="16" fill="none" stroke="#a259ff" stroke-width="3" filter="url(#glowPurple)"/>
      <line x1="0" y1="-60" x2="0" y2="60" stroke="#a259ff" stroke-width="1.55" stroke-linecap="round" opacity="0.86"/>
      <circle cx="-60" cy="0" r="9" fill="#1879ff" filter="url(#glowBlue)"/>
      <circle cx="60" cy="0" r="9" fill="#ff3d3d" filter="url(#glowRed)"/>
    </g>
    <g id="personality-ee">
      <use href="#baseBinaryGlyph"/>
      <circle cx="0" cy="-60" r="8.2" fill="#1879ff" filter="url(#glowBlue)"/>
      <circle cx="0" cy="60" r="8.2" fill="#1879ff" filter="url(#glowBlue)"/>
    </g>
    <g id="personality-pe">
      <use href="#baseBinaryGlyph"/>
      <circle cx="0" cy="-60" r="8.2" fill="#ff3d3d" filter="url(#glowRed)"/>
      <circle cx="0" cy="60" r="8.2" fill="#1879ff" filter="url(#glowBlue)"/>
    </g>
    <g id="personality-pp">
      <use href="#baseBinaryGlyph"/>
      <circle cx="0" cy="-60" r="8.2" fill="#ff3d3d" filter="url(#glowRed)"/>
      <circle cx="0" cy="60" r="8.2" fill="#ff3d3d" filter="url(#glowRed)"/>
    </g>
    <g id="personality-ep">
      <use href="#baseBinaryGlyph"/>
      <circle cx="0" cy="-60" r="8.2" fill="#1879ff" filter="url(#glowBlue)"/>
      <circle cx="0" cy="60" r="8.2" fill="#ff3d3d" filter="url(#glowRed)"/>
    </g>
  </defs>"""


def render_corner_label(x: int, y: int, sign: str, color: str, anchor: str | None = None) -> str:
    anchor_attr = f' text-anchor="{anchor}"' if anchor else ""
    return (
        f'    <text x="{x}" y="{y}" fill="{color}" font-family="STIX Two Text, Cambria Math, Georgia, serif" '
        f'font-size="23" font-weight="600"{anchor_attr}>\n'
        f'      {EPSILON_ENTITY}<tspan baseline-shift="super" font-size="16">{sign}</tspan>\n'
        f"    </text>"
    )


def render_tile(spec: TileSpec, offset_x: int, offset_y: int, *, include_labels: bool = True) -> str:
    fill_id = "chipSelected" if spec.selected else "chipFill"
    filter_id = "chipSelectedGlow" if spec.selected else "shadow"
    lines = [
        f'  <g transform="translate({offset_x} {offset_y})">',
        f'    <rect x="0" y="0" width="198" height="198" rx="7" fill="url(#{fill_id})" stroke="{spec.stroke}" stroke-width="2.4" filter="url(#{filter_id})"/>',
    ]
    if include_labels and spec.top_sign and spec.top_color:
        lines.append(render_corner_label(23, 31, spec.top_sign, spec.top_color))
    if include_labels and spec.bottom_sign and spec.bottom_color:
        lines.append(render_corner_label(173, 176, spec.bottom_sign, spec.bottom_color, "end"))
    lines.extend(
        [
            '    <g transform="translate(99 99) scale(1.07)">',
            f'      <use href="#{spec.glyph_id}"/>',
            "    </g>",
            "  </g>",
        ]
    )
    return "\n".join(lines)


def render_standalone_svg(spec: TileSpec) -> str:
    card = render_tile(spec, 21, 21, include_labels=spec.top_sign is not None)
    title = {
        "bare": "Bare binary glyph",
        "negative": "Negative binary glyph",
        "neutral": "Canonical neutral binary glyph",
        "positive": "Positive binary glyph",
    }[spec.key]
    desc = {
        "bare": "Canonical neutral binary orbit and axis without personality charges or epsilon labels.",
        "negative": "Canonical binary glyph with negative personality charges on top and bottom.",
        "neutral": "Canonical binary glyph with positrino above and electrino below.",
        "positive": "Canonical binary glyph with positive personality charges on top and bottom.",
    }[spec.key]
    return "\n".join(
        [
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" role="img" aria-labelledby="title desc">',
            f"  <title id=\"title\">{title}</title>",
            f"  <desc id=\"desc\">{desc}</desc>",
            svg_defs(),
            card,
            "</svg>",
        ]
    )


def render_prototype_svg() -> str:
    cards = [
        render_tile(TileSpec("bare", None, "baseBinaryGlyph", ACCENT_PURPLE), 90, 236, include_labels=False),
        render_tile(PROTOTYPE_SPECS[0], 90, 590),
        render_tile(PROTOTYPE_SPECS[1], 375, 590),
        render_tile(PROTOTYPE_SPECS[2], 660, 590),
        render_tile(PROTOTYPE_SPECS[3], 945, 590),
    ]
    return "\n".join(
        [
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1480 860" role="img" aria-labelledby="title desc">',
            "  <title id=\"title\">AAA Glyphs</title>",
            "  <desc id=\"desc\">Prototype board for canonical neutral and personality binary glyphs using purple orbit structure and red-blue architrino dots.</desc>",
            svg_defs(),
            '  <rect width="1480" height="860" fill="url(#bg)"/>',
            "",
            '  <text x="80" y="82" fill="#f4f7ff" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="700">',
            "    AAA Glyphs",
            "  </text>",
            "",
            '  <text x="80" y="170" fill="#f4f7ff" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="700">',
            "    Canonical Neutral Binary (From Below)",
            "  </text>",
            '  <text x="80" y="200" fill="#98a8cb" font-family="Inter, Arial, sans-serif" font-size="15">',
            "    Shows the electrino-positrino binary orbit and orbital axis only, without personality charges or epsilon labels.",
            "  </text>",
            "",
            cards[0],
            "",
            '  <text x="80" y="510" fill="#f4f7ff" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="700">',
            "    Canonical Binary Personality Set",
            "  </text>",
            '  <text x="80" y="540" fill="#98a8cb" font-family="Inter, Arial, sans-serif" font-size="15">',
            "    Full four-state vocabulary is shown here. Reduced menus use e/e, p/e, p/p, with p/e as the canonical neutral representative.",
            "  </text>",
            "",
            cards[1],
            "",
            cards[2],
            "",
            cards[3],
            "",
            cards[4],
            "",
            "</svg>",
        ]
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate canonical binary glyph SVGs into /tmp or another output directory."
    )
    parser.add_argument(
        "--option",
        action="append",
        choices=sorted(STANDALONE_SPECS.keys()),
        help="Generate one or more standalone glyph variants.",
    )
    parser.add_argument(
        "--all",
        action="store_true",
        help="Generate all standalone glyph variants.",
    )
    parser.add_argument(
        "--prototype",
        action="store_true",
        help="Generate a regenerated /tmp/quark-glyph-prototype.svg board.",
    )
    parser.add_argument(
        "--output-dir",
        default="/tmp",
        help="Directory for generated SVG files. Defaults to /tmp.",
    )
    return parser.parse_args()


def unique_preserving_order(items: Iterable[str]) -> list[str]:
    seen: set[str] = set()
    ordered: list[str] = []
    for item in items:
        if item in seen:
            continue
        seen.add(item)
        ordered.append(item)
    return ordered


def main() -> int:
    args = parse_args()
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    requested = unique_preserving_order(args.option or [])
    emit_all = args.all or (not requested and not args.prototype)
    emit_prototype = args.prototype or (not requested and not args.all)

    written: list[Path] = []

    if emit_all:
        requested = list(STANDALONE_SPECS.keys())

    for key in requested:
        spec = STANDALONE_SPECS[key]
        assert spec.output_name is not None
        path = output_dir / spec.output_name
        path.write_text(render_standalone_svg(spec), encoding="utf-8")
        written.append(path)

    if emit_prototype:
        prototype_path = output_dir / "quark-glyph-prototype.svg"
        prototype_path.write_text(render_prototype_svg(), encoding="utf-8")
        written.append(prototype_path)

    for path in written:
        print(path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
