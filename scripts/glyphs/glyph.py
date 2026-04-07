#!/usr/bin/env python3
from __future__ import annotations

import argparse
from dataclasses import dataclass
from html import escape
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
SCALING_STUDY_VALUES = (0.8, 1.0, 1.2)
XYZZY_TILE_SIZE = 80
XYZZY_OUTER_TILE_FILL = "#000000"
XYZZY_INNER_TILE_OUTER_SIZE = 72
XYZZY_INNER_TILE_STROKE_WIDTH = 4
XYZZY_INNER_TILE_INSET = 6
XYZZY_INNER_TILE_SIZE = 68
XYZZY_INNER_TILE_RADIUS = 10
XYZZY_STANDARD_TEXT = "#f5f7ff"
XYZZY_ACCENT_BLUE = "#2d8cff"
XYZZY_ACCENT_PURPLE = "#a259ff"
XYZZY_ACCENT_RED = "#ff5a4a"
XYZZY_TEXT_FONT_FAMILY = "Inter, Arial, sans-serif"
XYZZY_EPSILON_FONT_FAMILY = "STIX Two Text, Cambria Math, Georgia, serif"


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


@dataclass(frozen=True)
class XyzzyTextLineSpec:
    text: str = ""
    color: str = XYZZY_STANDARD_TEXT
    count_sign: str | None = None


@dataclass(frozen=True)
class XyzzyTextTileSpec:
    key: str
    output_name: str
    title: str
    border_color: str
    line1: XyzzyTextLineSpec
    line2: XyzzyTextLineSpec
    line3: XyzzyTextLineSpec


def xyzzy_plain_line(text: str = "", color: str = XYZZY_STANDARD_TEXT) -> XyzzyTextLineSpec:
    return XyzzyTextLineSpec(text=text, color=color)


def xyzzy_count_line(sign: str) -> XyzzyTextLineSpec:
    sign_text = str(sign).strip()
    color = POLARITY_RED if sign_text == "+" else POLARITY_BLUE
    return XyzzyTextLineSpec(text="N", color=color, count_sign=sign_text)


def build_xyzzy_text_tile_specs() -> list[XyzzyTextTileSpec]:
    def make_tile(
        key: str,
        title: str,
        border_color: str,
        line1: XyzzyTextLineSpec | None = None,
        line2: XyzzyTextLineSpec | None = None,
        line3: XyzzyTextLineSpec | None = None,
    ) -> XyzzyTextTileSpec:
        return XyzzyTextTileSpec(
            key=key,
            output_name=f"xyzzy-tile-{key}.svg",
            title=title,
            border_color=border_color,
            line1=line1 or xyzzy_plain_line(),
            line2=line2 or xyzzy_plain_line(),
            line3=line3 or xyzzy_plain_line(),
        )

    def make_polarity_pair(
        slug: str,
        border_color: str,
        line2: str,
        line3: str = "",
        *,
        anti_line3: str | None = None,
    ) -> list[XyzzyTextTileSpec]:
        pro_title = f"Pro {line2}" if not line3 else f"Pro {line2} {line3}"
        anti_title = f"Anti {line2}" if not (anti_line3 or line3) else f"Anti {line2} {anti_line3 or line3}"
        return [
            make_tile(
                key=f"pro-{slug}",
                title=pro_title,
                border_color=border_color,
                line1=xyzzy_plain_line("Pro"),
                line2=xyzzy_plain_line(line2),
                line3=xyzzy_plain_line(line3),
            ),
            make_tile(
                key=f"anti-{slug}",
                title=anti_title,
                border_color=border_color,
                line1=xyzzy_plain_line("Anti"),
                line2=xyzzy_plain_line(line2),
                line3=xyzzy_plain_line(anti_line3 if anti_line3 is not None else line3),
            ),
        ]

    specs = [
        make_tile(
            key="associate",
            title="Associate operator tile",
            border_color=XYZZY_ACCENT_PURPLE,
            line1=xyzzy_count_line("+"),
            line2=xyzzy_plain_line("Associate"),
            line3=xyzzy_count_line("-"),
        ),
        make_tile(
            key="dissociate",
            title="Dissociate operator tile",
            border_color=XYZZY_ACCENT_PURPLE,
            line1=xyzzy_count_line("+"),
            line2=xyzzy_plain_line("Dissociate"),
            line3=xyzzy_count_line("-"),
        ),
        make_tile(
            key="pass-thru",
            title="Pass Thru operator tile",
            border_color=XYZZY_ACCENT_PURPLE,
            line1=xyzzy_count_line("+"),
            line2=xyzzy_plain_line("Pass Thru"),
            line3=xyzzy_count_line("-"),
        ),
        make_tile(
            key="architrinos",
            title="Architrinos ledger tile",
            border_color=XYZZY_ACCENT_PURPLE,
            line1=xyzzy_count_line("+"),
            line2=xyzzy_plain_line("Architrinos"),
            line3=xyzzy_count_line("-"),
        ),
        make_tile(
            key="photon",
            title="Photon tile",
            border_color=XYZZY_ACCENT_PURPLE,
            line2=xyzzy_plain_line("Photon"),
        ),
    ]
    specs.extend(make_polarity_pair("noether-core", XYZZY_ACCENT_PURPLE, "Noether", "Core"))
    specs.extend(
        [
            make_tile(
                key="negative-w-boson",
                title="Negative W boson tile",
                border_color=XYZZY_ACCENT_BLUE,
                line1=xyzzy_plain_line("Negative"),
                line2=xyzzy_plain_line("W"),
                line3=xyzzy_plain_line("Boson"),
            ),
            make_tile(
                key="neutral-z-boson",
                title="Neutral Z boson tile",
                border_color=XYZZY_ACCENT_PURPLE,
                line1=xyzzy_plain_line("Neutral"),
                line2=xyzzy_plain_line("Z"),
                line3=xyzzy_plain_line("Boson"),
            ),
            make_tile(
                key="positive-w-boson",
                title="Positive W boson tile",
                border_color=XYZZY_ACCENT_RED,
                line1=xyzzy_plain_line("Positive"),
                line2=xyzzy_plain_line("W"),
                line3=xyzzy_plain_line("Boson"),
            ),
            make_tile(
                key="noether-pair",
                title="Noether Pair tile",
                border_color=XYZZY_ACCENT_PURPLE,
                line1=xyzzy_plain_line("Noether"),
                line2=xyzzy_plain_line("Pair"),
                line3=xyzzy_plain_line("Pro+Anti"),
            ),
            make_tile(
                key="noether-quad",
                title="Noether Quad tile",
                border_color=XYZZY_ACCENT_PURPLE,
                line1=xyzzy_plain_line("Noether"),
                line2=xyzzy_plain_line("Quad"),
                line3=xyzzy_plain_line("Two Pair"),
            ),
        ]
    )
    specs.extend(make_polarity_pair("uni-binary", XYZZY_ACCENT_PURPLE, "Uni", "Binary"))
    specs.extend(make_polarity_pair("bi-binary", XYZZY_ACCENT_PURPLE, "Bi", "Binary"))
    specs.extend(make_polarity_pair("tau", XYZZY_ACCENT_BLUE, "Tau"))
    specs.extend(make_polarity_pair("muon", XYZZY_ACCENT_BLUE, "Muon"))
    specs.extend(make_polarity_pair("electron", XYZZY_ACCENT_BLUE, "Electron"))
    specs.extend(make_polarity_pair("tau-neutrino", XYZZY_ACCENT_PURPLE, "Tau", "Neutrino"))
    specs.extend(make_polarity_pair("muon-neutrino", XYZZY_ACCENT_PURPLE, "Muon", "Neutrino"))
    specs.extend(make_polarity_pair("electron-neutrino", XYZZY_ACCENT_PURPLE, "Electron", "Neutrino"))
    specs.extend(make_polarity_pair("bottom-quark", XYZZY_ACCENT_BLUE, "Bottom", "Quark"))
    specs.extend(make_polarity_pair("strange-quark", XYZZY_ACCENT_BLUE, "Strange", "Quark"))
    specs.extend(make_polarity_pair("down-quark", XYZZY_ACCENT_BLUE, "Down", "Quark"))
    specs.extend(make_polarity_pair("top-quark", XYZZY_ACCENT_RED, "Top", "Quark"))
    specs.extend(make_polarity_pair("charm-quark", XYZZY_ACCENT_RED, "Charm", "Quark"))
    specs.extend(make_polarity_pair("up-quark", XYZZY_ACCENT_RED, "Up", "Quark"))
    specs.extend(make_polarity_pair("proton", XYZZY_ACCENT_RED, "Proton", "u d u", anti_line3="!u !d !u"))
    specs.extend(
        make_polarity_pair("neutron", XYZZY_ACCENT_PURPLE, "Neutron", "d u d", anti_line3="!d !u !d")
    )
    specs.extend(
        [
            make_tile(
                key="positive-pion",
                title="Positive Pion tile",
                border_color=XYZZY_ACCENT_RED,
                line1=xyzzy_plain_line("Positive"),
                line2=xyzzy_plain_line("Pion"),
                line3=xyzzy_plain_line("u !d"),
            ),
            make_tile(
                key="negative-pion",
                title="Negative Pion tile",
                border_color=XYZZY_ACCENT_BLUE,
                line1=xyzzy_plain_line("Negative"),
                line2=xyzzy_plain_line("Pion"),
                line3=xyzzy_plain_line("d !u"),
            ),
            make_tile(
                key="neutral-pion-u",
                title="Neutral Pion u anti-u tile",
                border_color=XYZZY_ACCENT_PURPLE,
                line1=xyzzy_plain_line("Neutral"),
                line2=xyzzy_plain_line("Pion"),
                line3=xyzzy_plain_line("u !u"),
            ),
            make_tile(
                key="neutral-pion-d",
                title="Neutral Pion d anti-d tile",
                border_color=XYZZY_ACCENT_PURPLE,
                line1=xyzzy_plain_line("Neutral"),
                line2=xyzzy_plain_line("Pion"),
                line3=xyzzy_plain_line("d !d"),
            ),
            make_tile(
                key="positive-kaon",
                title="Positive Kaon tile",
                border_color=XYZZY_ACCENT_RED,
                line1=xyzzy_plain_line("Positive"),
                line2=xyzzy_plain_line("Kaon"),
                line3=xyzzy_plain_line("u !s"),
            ),
            make_tile(
                key="negative-kaon",
                title="Negative Kaon tile",
                border_color=XYZZY_ACCENT_BLUE,
                line1=xyzzy_plain_line("Negative"),
                line2=xyzzy_plain_line("Kaon"),
                line3=xyzzy_plain_line("s !u"),
            ),
            make_tile(
                key="neutral-kaon-d",
                title="Neutral Kaon d anti-s tile",
                border_color=XYZZY_ACCENT_PURPLE,
                line1=xyzzy_plain_line("Neutral"),
                line2=xyzzy_plain_line("Kaon"),
                line3=xyzzy_plain_line("d !s"),
            ),
            make_tile(
                key="neutral-kaon-s",
                title="Neutral Kaon s anti-d tile",
                border_color=XYZZY_ACCENT_PURPLE,
                line1=xyzzy_plain_line("Neutral"),
                line2=xyzzy_plain_line("Kaon"),
                line3=xyzzy_plain_line("s !d"),
            ),
            make_tile(
                key="positive-b-meson",
                title="Positive B Meson tile",
                border_color=XYZZY_ACCENT_RED,
                line1=xyzzy_plain_line("Positive"),
                line2=xyzzy_plain_line("B Meson"),
                line3=xyzzy_plain_line("u !b"),
            ),
            make_tile(
                key="negative-b-meson",
                title="Negative B Meson tile",
                border_color=XYZZY_ACCENT_BLUE,
                line1=xyzzy_plain_line("Negative"),
                line2=xyzzy_plain_line("B Meson"),
                line3=xyzzy_plain_line("b !u"),
            ),
            make_tile(
                key="neutral-b-meson-d",
                title="Neutral B Meson d anti-b tile",
                border_color=XYZZY_ACCENT_PURPLE,
                line1=xyzzy_plain_line("Neutral"),
                line2=xyzzy_plain_line("B Meson"),
                line3=xyzzy_plain_line("d !b"),
            ),
            make_tile(
                key="neutral-b-meson-b",
                title="Neutral B Meson b anti-d tile",
                border_color=XYZZY_ACCENT_PURPLE,
                line1=xyzzy_plain_line("Neutral"),
                line2=xyzzy_plain_line("B Meson"),
                line3=xyzzy_plain_line("b !d"),
            ),
        ]
    )
    return specs


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


def render_corner_label(
    x: int,
    y: int,
    sign: str,
    color: str,
    anchor: str | None = None,
    *,
    indent: str = "    ",
) -> str:
    anchor_attr = f' text-anchor="{anchor}"' if anchor else ""
    return (
        f'{indent}<text x="{x}" y="{y}" fill="{color}" font-family="STIX Two Text, Cambria Math, Georgia, serif" '
        f'font-size="23" font-weight="600"{anchor_attr}>\n'
        f"{indent}  {EPSILON_ENTITY}<tspan baseline-shift=\"super\" font-size=\"16\">{sign}</tspan>\n"
        f"{indent}</text>"
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
    lines = [f'  <g transform="translate({offset_x} {offset_y})">']
    tile_indent = "    "
    if scaling != 1.0:
        lines.append(
            f'    <g transform="translate(99 99) scale({scaling:.3f}) translate(-99 -99)">'
        )
        tile_indent = "      "
    lines.append(
        f'{tile_indent}<rect x="0" y="0" width="198" height="198" rx="7" fill="url(#{fill_id})" stroke="{spec.stroke}" stroke-width="2.4" filter="url(#{filter_id})"/>'
    )
    if include_labels and spec.top_sign and spec.top_color:
        lines.append(
            render_corner_label(23, 31, spec.top_sign, spec.top_color, indent=tile_indent)
        )
    if include_labels and spec.bottom_sign and spec.bottom_color:
        lines.append(
            render_corner_label(
                173,
                176,
                spec.bottom_sign,
                spec.bottom_color,
                "end",
                indent=tile_indent,
            )
        )
    lines.extend(
        [
            f'{tile_indent}<g transform="translate(99 99) scale({APP_GLYPH_SCALE:.3f})">',
            f'{tile_indent}  <use href="#{spec.glyph_id}"/>',
            f"{tile_indent}</g>",
        ]
    )
    if scaling != 1.0:
        lines.append("    </g>")
    lines.append("  </g>")
    return "\n".join(lines)


def render_standalone_svg(spec: TileSpec, scaling: float = 1.0) -> str:
    card = render_tile(spec, 21, 21, include_labels=spec.top_sign is not None, scaling=scaling)
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
    desc = f"{desc} Rendered at {scaling:g}x tile scale relative to the app baseline."
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


def render_prototype_svg(scaling: float = 1.0) -> str:
    pro_bare = TileSpec("bare", None, "baseBinaryGlyph", ACCENT_PURPLE)

    section_y = {
        "title": 82,
        "pro_bare_heading": 170,
        "pro_bare_copy": 200,
        "pro_bare_tile": 236,
        "pro_set_heading": 510,
        "pro_set_copy": 540,
        "pro_set_tiles": 590,
        "scale_heading": 920,
        "scale_copy": 950,
        "scale_headers": 1010,
        "scale_tiles": 1050,
    }
    tile_x = [90, 375, 660, 945]
    lines = [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1480 1340" role="img" aria-labelledby="title desc">',
        "  <title id=\"title\">AAA Glyphs</title>",
        "  <desc id=\"desc\">Prototype board for canonical binary glyphs and whole-tile scaling comparisons.</desc>",
        svg_defs(),
        '  <rect width="1480" height="1340" fill="url(#bg)"/>',
        "",
        '  <text x="80" y="82" fill="#f4f7ff" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="700">',
        "    AAA Glyphs",
        "  </text>",
        '  <text x="80" y="118" fill="#98a8cb" font-family="Inter, Arial, sans-serif" font-size="15">',
        "    Binary tiles encode only internal flavor; pro versus anti belongs to the enclosing fermion, not the binary tile.",
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
            f'  <text x="80" y="{section_y["scale_heading"]}" fill="#f4f7ff" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="700">',
            "    Scaling Study",
            "  </text>",
            f'  <text x="80" y="{section_y["scale_copy"]}" fill="#98a8cb" font-family="Inter, Arial, sans-serif" font-size="15">',
            "    These tiles scale the entire tile at 0.8, 1.0, and 1.2 relative to the app baseline while keeping the interior glyph proportion fixed.",
            "  </text>",
            "",
        ]
    )
    for x, scale_value in zip(tile_x[: len(SCALING_STUDY_VALUES)], SCALING_STUDY_VALUES, strict=True):
        lines.extend(
            [
                f'  <text x="{x + 99}" y="{section_y["scale_headers"]}" fill="#f4f7ff" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="700" text-anchor="middle">',
                f"    {scale_value:g}x",
                "  </text>",
                render_tile(
                    pro_bare,
                    x,
                    section_y["scale_tiles"],
                    include_labels=False,
                    scaling=scale_value,
                ),
                "",
            ]
        )
    lines.append("</svg>")
    return "\n".join(lines)


def get_xyzzy_text_tile_font_size(lines: list[str]) -> float:
    visible_lines = [line for line in lines if line]
    visible_count = len(visible_lines)
    max_length = max((len(line) for line in visible_lines), default=0)
    if visible_count <= 1:
        size = 16.0
    elif visible_count == 2:
        size = 13.75
    else:
        size = 11.75
    if max_length >= 11:
        size -= 0.75
    if max_length >= 14:
        size -= 0.75
    return max(9.0, size)


def get_xyzzy_text_tile_baselines(lines: list[str]) -> list[float]:
    visible_indices = [index for index, line in enumerate(lines) if line]
    visible_count = len(visible_indices)
    if visible_count <= 1:
        values = [48.0]
    elif visible_count == 2:
        values = [38.0, 54.0]
    else:
        values = [28.0, 43.0, 58.0]
    baseline_by_index: dict[int, float] = {}
    for index, baseline in zip(visible_indices, values, strict=True):
        baseline_by_index[index] = baseline
    return [baseline_by_index.get(index, 0.0) for index in range(len(lines))]


def render_xyzzy_text_line(
    line: XyzzyTextLineSpec,
    y: float,
    font_size: float,
    *,
    indent: str = "  ",
) -> str:
    if not line.text:
        return ""
    if line.count_sign:
        superscript_size = max(7.0, font_size - 2.5)
        return (
            f'{indent}<text x="40" y="{y:.2f}" fill="{line.color}" font-family="{XYZZY_TEXT_FONT_FAMILY}" '
            f'font-size="{font_size:.2f}" font-weight="700" text-anchor="middle">'
            f'{escape(line.text)} <tspan font-family="{XYZZY_EPSILON_FONT_FAMILY}">{EPSILON_ENTITY}</tspan>'
            f'<tspan baseline-shift="super" font-size="{superscript_size:.2f}">{escape(line.count_sign)}</tspan>'
            f"</text>"
        )
    return (
        f'{indent}<text x="40" y="{y:.2f}" fill="{line.color}" font-family="{XYZZY_TEXT_FONT_FAMILY}" '
        f'font-size="{font_size:.2f}" font-weight="700" text-anchor="middle">{escape(line.text)}</text>'
    )


def render_xyzzy_text_tile_svg(spec: XyzzyTextTileSpec) -> str:
    lines = [spec.line1.text, spec.line2.text, spec.line3.text]
    font_size = get_xyzzy_text_tile_font_size(lines)
    baselines = get_xyzzy_text_tile_baselines(lines)
    rendered_lines = [
        render_xyzzy_text_line(spec.line1, baselines[0], font_size),
        render_xyzzy_text_line(spec.line2, baselines[1], font_size),
        render_xyzzy_text_line(spec.line3, baselines[2], font_size),
    ]
    line_markup = [line for line in rendered_lines if line]
    return "\n".join(
        [
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {XYZZY_TILE_SIZE} {XYZZY_TILE_SIZE}" role="img" aria-labelledby="title desc">',
            f'  <title id="title">{escape(spec.title)}</title>',
            f'  <desc id="desc">{escape(spec.title)}. Xyzzy text tile with a black 80 by 80 outer tile and a centered 72 by 72 bordered square.</desc>',
            f'  <rect width="{XYZZY_TILE_SIZE}" height="{XYZZY_TILE_SIZE}" fill="{XYZZY_OUTER_TILE_FILL}"/>',
            (
                f'  <rect x="{XYZZY_INNER_TILE_INSET}" y="{XYZZY_INNER_TILE_INSET}" width="{XYZZY_INNER_TILE_SIZE}" '
                f'height="{XYZZY_INNER_TILE_SIZE}" rx="{XYZZY_INNER_TILE_RADIUS}" fill="none" '
                f'stroke="{spec.border_color}" stroke-width="{XYZZY_INNER_TILE_STROKE_WIDTH}"/>'
            ),
            *line_markup,
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
        "--xyzzy-tiles",
        action="store_true",
        help="Generate the current Xyzzy text-tile SVG set.",
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
        help="Tile scale multiplier relative to the app baseline. Default 1.0 matches the app size.",
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
    emit_all = args.all or (not requested and not args.prototype and not args.xyzzy_tiles)
    emit_prototype = args.prototype or (not requested and not args.all and not args.xyzzy_tiles)
    emit_xyzzy_tiles = args.xyzzy_tiles

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

    if emit_xyzzy_tiles:
        for spec in build_xyzzy_text_tile_specs():
            path = output_dir / spec.output_name
            path.write_text(render_xyzzy_text_tile_svg(spec), encoding="utf-8")
            written.append(path)

    for path in written:
        print(path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
