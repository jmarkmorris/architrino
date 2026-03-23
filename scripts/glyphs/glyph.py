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
APP_GLYPH_SCALE = 1.07
ANTI_FRAME_INSET = 6
ANTI_FRAME_RADIUS = 5
SCALING_STUDY_VALUES = (0.8, 1.0, 1.2)


@dataclass(frozen=True)
class TileSpec:
    key: str
    output_name: str | None
    glyph_id: str
    stroke: str
    anti: bool = False
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
    "anti-bare": TileSpec(
        key="anti-bare",
        output_name="glyph-binary-anti-bare.svg",
        glyph_id="baseBinaryGlyph",
        stroke=ACCENT_PURPLE,
        anti=True,
    ),
    "anti-negative": TileSpec(
        key="anti-negative",
        output_name="glyph-binary-anti-negative.svg",
        glyph_id="personality-ee",
        stroke=ACCENT_BLUE,
        anti=True,
        top_sign="-",
        bottom_sign="-",
        top_color=POLARITY_BLUE,
        bottom_color=POLARITY_BLUE,
    ),
    "anti-neutral": TileSpec(
        key="anti-neutral",
        output_name="glyph-binary-anti-neutral.svg",
        glyph_id="personality-pe",
        stroke=ACCENT_PURPLE,
        anti=True,
        top_sign="+",
        bottom_sign="-",
        top_color=POLARITY_RED,
        bottom_color=POLARITY_BLUE,
        selected=True,
    ),
    "anti-positive": TileSpec(
        key="anti-positive",
        output_name="glyph-binary-anti-positive.svg",
        glyph_id="personality-pp",
        stroke=ACCENT_RED,
        anti=True,
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


def render_tile(
    spec: TileSpec,
    offset_x: int,
    offset_y: int,
    *,
    include_labels: bool = True,
    scaling: float = 1.0,
) -> str:
    fill_id = "chipSelected" if spec.selected else "chipFill"
    filter_id = "chipSelectedGlow" if spec.selected else "shadow"
    resolved_scale = APP_GLYPH_SCALE * scaling
    lines = [
        f'  <g transform="translate({offset_x} {offset_y})">',
        f'    <rect x="0" y="0" width="198" height="198" rx="7" fill="url(#{fill_id})" stroke="{spec.stroke}" stroke-width="2.4" filter="url(#{filter_id})"/>',
    ]
    if spec.anti:
        lines.append(
            f'    <rect x="{ANTI_FRAME_INSET}" y="{ANTI_FRAME_INSET}" width="{198 - 2 * ANTI_FRAME_INSET}" height="{198 - 2 * ANTI_FRAME_INSET}" rx="{ANTI_FRAME_RADIUS}" fill="none" stroke="{spec.stroke}" stroke-width="1.9" opacity="0.92"/>'
        )
    if include_labels and spec.top_sign and spec.top_color:
        lines.append(render_corner_label(23, 31, spec.top_sign, spec.top_color))
    if include_labels and spec.bottom_sign and spec.bottom_color:
        lines.append(render_corner_label(173, 176, spec.bottom_sign, spec.bottom_color, "end"))
    lines.extend(
        [
            f'    <g transform="translate(99 99) scale({resolved_scale:.3f})">',
            f'      <use href="#{spec.glyph_id}"/>',
            "    </g>",
            "  </g>",
        ]
    )
    return "\n".join(lines)


def render_standalone_svg(spec: TileSpec, scaling: float = 1.0) -> str:
    card = render_tile(spec, 21, 21, include_labels=spec.top_sign is not None, scaling=scaling)
    title_prefix = "Anti " if spec.anti else ""
    key = spec.key.removeprefix("anti-")
    title = {
        "bare": "Bare binary glyph",
        "negative": "Negative binary glyph",
        "neutral": "Canonical neutral binary glyph",
        "positive": "Positive binary glyph",
    }[key]
    desc = {
        "bare": "Canonical neutral binary orbit and axis without personality charges or epsilon labels.",
        "negative": "Canonical binary glyph with negative personality charges on top and bottom.",
        "neutral": "Canonical binary glyph with positrino above and electrino below.",
        "positive": "Canonical binary glyph with positive personality charges on top and bottom.",
    }[key]
    if spec.anti:
        desc = f"{desc} Anti cores are denoted by a double frame."
    desc = f"{desc} Rendered at {scaling:g}x app scale."
    return "\n".join(
        [
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" role="img" aria-labelledby="title desc">',
            f"  <title id=\"title\">{title_prefix}{title}</title>",
            f"  <desc id=\"desc\">{desc}</desc>",
            svg_defs(),
            card,
            "</svg>",
        ]
    )


def render_prototype_svg(scaling: float = 1.0) -> str:
    pro_bare = TileSpec("bare", None, "baseBinaryGlyph", ACCENT_PURPLE)
    anti_bare = TileSpec("anti-bare", None, "baseBinaryGlyph", ACCENT_PURPLE, anti=True)

    def clone_spec(spec: TileSpec, *, anti: bool = False) -> TileSpec:
        return TileSpec(
            key=f'{"anti-" if anti else ""}{spec.key}',
            output_name=None,
            glyph_id=spec.glyph_id,
            stroke=spec.stroke,
            anti=anti,
            top_sign=spec.top_sign,
            bottom_sign=spec.bottom_sign,
            top_color=spec.top_color,
            bottom_color=spec.bottom_color,
            selected=spec.selected,
        )

    section_y = {
        "title": 82,
        "pro_bare_heading": 170,
        "pro_bare_copy": 200,
        "pro_bare_tile": 236,
        "pro_set_heading": 510,
        "pro_set_copy": 540,
        "pro_set_tiles": 590,
        "anti_bare_heading": 920,
        "anti_bare_copy": 950,
        "anti_bare_tile": 986,
        "anti_set_heading": 1260,
        "anti_set_copy": 1290,
        "anti_set_tiles": 1340,
        "scale_heading": 1615,
        "scale_copy": 1645,
        "scale_headers": 1690,
        "scale_row_1": 1725,
    }
    tile_x = [90, 375, 660, 945]
    lines = [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1480 2500" role="img" aria-labelledby="title desc">',
        "  <title id=\"title\">AAA Glyphs</title>",
        "  <desc id=\"desc\">Prototype board for pro and anti binary glyphs. Anti variants use a double frame while keeping the inner glyph unchanged.</desc>",
        svg_defs(),
        '  <rect width="1480" height="2500" fill="url(#bg)"/>',
        "",
        '  <text x="80" y="82" fill="#f4f7ff" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="700">',
        "    AAA Glyphs",
        "  </text>",
        '  <text x="80" y="118" fill="#98a8cb" font-family="Inter, Arial, sans-serif" font-size="15">',
        "    Anti cores are shown with a double frame while the internal binary glyph remains unchanged.",
        "  </text>",
        "",
        f'  <text x="80" y="{section_y["pro_bare_heading"]}" fill="#f4f7ff" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="700">',
        "    Canonical Neutral Binary",
        "  </text>",
        f'  <text x="80" y="{section_y["pro_bare_copy"]}" fill="#98a8cb" font-family="Inter, Arial, sans-serif" font-size="15">',
        "    Shows the electrino-positrino binary orbit and orbital axis only, without personality charges or epsilon labels.",
        "  </text>",
        "",
        render_tile(pro_bare, tile_x[0], section_y["pro_bare_tile"], include_labels=False, scaling=scaling),
        "",
        f'  <text x="80" y="{section_y["pro_set_heading"]}" fill="#f4f7ff" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="700">',
        "    Canonical Binary Personality Set",
        "  </text>",
        f'  <text x="80" y="{section_y["pro_set_copy"]}" fill="#98a8cb" font-family="Inter, Arial, sans-serif" font-size="15">',
        "    Full four-state vocabulary is shown here. Reduced menus use e/e, p/e, p/p, with p/e as the canonical neutral representative.",
        "  </text>",
        "",
    ]
    for x, spec in zip(tile_x, PROTOTYPE_SPECS, strict=True):
        lines.append(render_tile(spec, x, section_y["pro_set_tiles"], scaling=scaling))
        lines.append("")

    lines.extend(
        [
            f'  <text x="80" y="{section_y["anti_bare_heading"]}" fill="#f4f7ff" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="700">',
            "    Canonical Neutral Binary for Anti Assemblies",
            "  </text>",
            f'  <text x="80" y="{section_y["anti_bare_copy"]}" fill="#98a8cb" font-family="Inter, Arial, sans-serif" font-size="15">',
            "    Same binary scaffold, with anti state indicated only by the double frame.",
            "  </text>",
            "",
            render_tile(anti_bare, tile_x[0], section_y["anti_bare_tile"], include_labels=False, scaling=scaling),
            "",
            f'  <text x="80" y="{section_y["anti_set_heading"]}" fill="#f4f7ff" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="700">',
            "    Binary Personality Set for Anti Assemblies",
            "  </text>",
            f'  <text x="80" y="{section_y["anti_set_copy"]}" fill="#98a8cb" font-family="Inter, Arial, sans-serif" font-size="15">',
            "    The anti set duplicates the same four internal glyph states and marks anti at the tile frame only.",
            "  </text>",
            "",
        ]
    )
    for x, spec in zip(tile_x, PROTOTYPE_SPECS, strict=True):
        lines.append(render_tile(clone_spec(spec, anti=True), x, section_y["anti_set_tiles"], scaling=scaling))
        lines.append("")
    lines.extend(
        [
            f'  <text x="80" y="{section_y["scale_heading"]}" fill="#f4f7ff" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="700">',
            "    Scaling Study",
            "  </text>",
            f'  <text x="80" y="{section_y["scale_copy"]}" fill="#98a8cb" font-family="Inter, Arial, sans-serif" font-size="15">',
            "    Default scaling 1.0 matches the app baseline. The rows below compare pro and anti bare binaries at 0.8, 1.0, and 1.2.",
            "  </text>",
            f'  <text x="425" y="{section_y["scale_headers"]}" fill="#f4f7ff" font-family="Inter, Arial, sans-serif" font-size="17" font-weight="700" text-anchor="middle">',
            "    Pro",
            "  </text>",
            f'  <text x="710" y="{section_y["scale_headers"]}" fill="#f4f7ff" font-family="Inter, Arial, sans-serif" font-size="17" font-weight="700" text-anchor="middle">',
            "    Anti",
            "  </text>",
            "",
        ]
    )
    for index, scale_value in enumerate(SCALING_STUDY_VALUES):
        row_y = section_y["scale_row_1"] + (index * 250)
        lines.extend(
            [
                f'  <text x="80" y="{row_y + 112}" fill="#f4f7ff" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="700">',
                f"    Scale {scale_value:g}",
                "  </text>",
                render_tile(pro_bare, 325, row_y, include_labels=False, scaling=scale_value),
                "",
                render_tile(anti_bare, 610, row_y, include_labels=False, scaling=scale_value),
                "",
            ]
        )
    lines.append("</svg>")
    return "\n".join(lines)


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
    parser.add_argument(
        "--scaling",
        type=float,
        default=1.0,
        help="Glyph scale multiplier relative to the app baseline. Default 1.0 matches the app size.",
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
    if args.scaling <= 0:
        raise SystemExit("--scaling must be greater than 0.")
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
        path.write_text(render_standalone_svg(spec, scaling=args.scaling), encoding="utf-8")
        written.append(path)

    if emit_prototype:
        prototype_path = output_dir / "quark-glyph-prototype.svg"
        prototype_path.write_text(render_prototype_svg(scaling=args.scaling), encoding="utf-8")
        written.append(prototype_path)

    for path in written:
        print(path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
