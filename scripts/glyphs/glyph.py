#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from dataclasses import dataclass
from functools import lru_cache
from html import escape
from pathlib import Path

from PIL import ImageFont


EPSILON_GLYPH = "ϵ"
TEXT_FONT_PATH = "/System/Library/Fonts/HelveticaNeue.ttc"
EPSILON_FONT_PATH = "/System/Library/Fonts/Supplemental/Times New Roman.ttf"
EPSILON_FONT_FAMILY = "'STIX Two Text', Cambria Math, Georgia, serif"


@dataclass(frozen=True)
class XyzzyResolvedLine:
    kind: str
    text: str = ""
    color: str = ""
    count_sign: str | None = None


@dataclass(frozen=True)
class XyzzyResolvedTile:
    key: str
    title: str
    border_color: str
    lines: tuple[XyzzyResolvedLine, XyzzyResolvedLine, XyzzyResolvedLine]


@dataclass(frozen=True)
class XyzzyCatalog:
    spec_path: Path
    tile_size: float
    outer_fill: str
    inner_border_outer_size: float
    inner_border_stroke_width: float
    inner_border_outer_radius: float
    text_font_family: str
    text_font_size: float
    text_font_weight: int
    line_gap: float
    epsilon_entity: str
    tiles: tuple[XyzzyResolvedTile, ...]


@lru_cache(maxsize=None)
def load_font(path: str, size: float) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size)


def measure_font_bbox(font_path: str, size: float, text: str) -> tuple[float, float, float]:
    font = load_font(font_path, size)
    left, top, _right, bottom = font.getbbox(text, anchor="ls")
    return float(left), float(top), float(bottom)


def resolve_palette_color(palette: dict[str, str], token: str) -> str:
    if token in palette:
        return palette[token]
    if token.startswith("#"):
        return token
    raise ValueError(f"Unknown palette token: {token}")


def resolve_line_spec(
    line_spec: dict[str, object],
    *,
    palette: dict[str, str],
) -> XyzzyResolvedLine:
    line_type = str(line_spec.get("type", "blank"))
    if line_type == "blank":
        return XyzzyResolvedLine(kind="blank")
    if line_type == "literal":
        return XyzzyResolvedLine(
            kind="literal",
            text=str(line_spec.get("text", "")),
            color=resolve_palette_color(palette, str(line_spec.get("color", "white"))),
        )
    if line_type == "count":
        return XyzzyResolvedLine(
            kind="count",
            text=str(line_spec.get("placeholder", "")),
            color=resolve_palette_color(palette, str(line_spec.get("color", "white"))),
            count_sign=str(line_spec.get("sign", "")).strip() or None,
        )
    raise ValueError(f"Unsupported line type: {line_type}")


def load_xyzzy_catalog(spec_path: Path) -> XyzzyCatalog:
    raw = json.loads(spec_path.read_text(encoding="utf-8"))
    geometry = raw["geometry"]
    palette = raw["palette"]
    text_layout = raw["textLayout"]
    tiles: list[XyzzyResolvedTile] = []
    for tile_spec in raw["tiles"]:
        line_specs = tile_spec["lines"]
        if len(line_specs) != 3:
            raise ValueError(f"Tile {tile_spec.get('key')} must have exactly 3 lines.")
        tiles.append(
            XyzzyResolvedTile(
                key=str(tile_spec["key"]),
                title=str(tile_spec["title"]),
                border_color=resolve_palette_color(palette, str(tile_spec["borderColor"])),
                lines=tuple(
                    resolve_line_spec(line_spec, palette=palette) for line_spec in line_specs
                ),
            )
        )
    return XyzzyCatalog(
        spec_path=spec_path,
        tile_size=float(geometry["tileSizePx"]),
        outer_fill=resolve_palette_color(palette, str(geometry["outerFillColor"])),
        inner_border_outer_size=float(geometry["innerBorderOuterSizePx"]),
        inner_border_stroke_width=float(geometry["innerBorderStrokeWidthPx"]),
        inner_border_outer_radius=float(geometry["innerBorderOuterRadiusPx"]),
        text_font_family=str(text_layout["fontFamily"]),
        text_font_size=float(text_layout["fontSizePx"]),
        text_font_weight=int(text_layout["fontWeight"]),
        line_gap=float(text_layout["lineGapPx"]),
        epsilon_entity=str(text_layout["epsilonEntity"]),
        tiles=tuple(tiles),
    )


def get_line_bounds(line: XyzzyResolvedLine, catalog: XyzzyCatalog) -> tuple[float, float]:
    if not line.text:
        return 0.0, 0.0
    if line.kind == "count" and line.count_sign:
        superscript_size = max(7.0, catalog.text_font_size - 2.5)
        superscript_shift = catalog.text_font_size * 0.36
        segments = [
            (line.text + " ", TEXT_FONT_PATH, catalog.text_font_size, 0.0),
            (EPSILON_GLYPH, EPSILON_FONT_PATH, catalog.text_font_size, 0.0),
            (line.count_sign, TEXT_FONT_PATH, superscript_size, -superscript_shift),
        ]
        top = 0.0
        bottom = 0.0
        first = True
        for text, font_path, font_size, baseline_shift in segments:
            _left, segment_top, segment_bottom = measure_font_bbox(font_path, font_size, text)
            segment_top += baseline_shift
            segment_bottom += baseline_shift
            if first:
                top = segment_top
                bottom = segment_bottom
                first = False
            else:
                top = min(top, segment_top)
                bottom = max(bottom, segment_bottom)
        return top, bottom
    _left, top, bottom = measure_font_bbox(TEXT_FONT_PATH, catalog.text_font_size, line.text)
    return top, bottom


def get_tile_baselines(lines: tuple[XyzzyResolvedLine, ...], catalog: XyzzyCatalog) -> list[float]:
    visible_entries = [
        (index, *get_line_bounds(line, catalog))
        for index, line in enumerate(lines)
        if line.text
    ]
    if not visible_entries:
        return [0.0 for _ in lines]
    top_cursor = 0.0
    baselines_by_index: dict[int, float] = {}
    block_bottom = 0.0
    for visible_position, (index, line_top, line_bottom) in enumerate(visible_entries):
        baseline = top_cursor - line_top
        baselines_by_index[index] = baseline
        block_bottom = baseline + line_bottom
        if visible_position < len(visible_entries) - 1:
            top_cursor = block_bottom + catalog.line_gap
    vertical_offset = (catalog.tile_size / 2.0) - (block_bottom / 2.0)
    return [baselines_by_index.get(index, 0.0) + vertical_offset for index in range(len(lines))]


def render_line(
    line: XyzzyResolvedLine,
    y: float,
    *,
    catalog: XyzzyCatalog,
    indent: str = "  ",
) -> str:
    if not line.text:
        return ""
    if line.kind == "count" and line.count_sign:
        superscript_size = max(7.0, catalog.text_font_size - 2.5)
        return (
            f'{indent}<text x="{catalog.tile_size / 2.0:.2f}" y="{y:.2f}" fill="{line.color}" '
            f'font-family="{catalog.text_font_family}" font-size="{catalog.text_font_size:.2f}" '
            f'font-weight="{catalog.text_font_weight}" text-anchor="middle">'
            f'{escape(line.text)} <tspan font-family="{EPSILON_FONT_FAMILY}">{catalog.epsilon_entity}</tspan>'
            f'<tspan baseline-shift="super" font-size="{superscript_size:.2f}">{escape(line.count_sign)}</tspan>'
            f"</text>"
        )
    return (
        f'{indent}<text x="{catalog.tile_size / 2.0:.2f}" y="{y:.2f}" fill="{line.color}" '
        f'font-family="{catalog.text_font_family}" font-size="{catalog.text_font_size:.2f}" '
        f'font-weight="{catalog.text_font_weight}" text-anchor="middle">{escape(line.text)}</text>'
    )


def render_tile_svg(tile: XyzzyResolvedTile, catalog: XyzzyCatalog) -> str:
    baselines = get_tile_baselines(tile.lines, catalog)
    rect_inset = (
        (catalog.tile_size - catalog.inner_border_outer_size) / 2.0
        + (catalog.inner_border_stroke_width / 2.0)
    )
    rect_size = catalog.inner_border_outer_size - catalog.inner_border_stroke_width
    rect_radius = max(0.0, catalog.inner_border_outer_radius - (catalog.inner_border_stroke_width / 2.0))
    lines = [
        render_line(tile.lines[0], baselines[0], catalog=catalog),
        render_line(tile.lines[1], baselines[1], catalog=catalog),
        render_line(tile.lines[2], baselines[2], catalog=catalog),
    ]
    return "\n".join(
        [
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {catalog.tile_size:.0f} {catalog.tile_size:.0f}" role="img" aria-labelledby="title desc">',
            f'  <title id="title">{escape(tile.title)}</title>',
            (
                f'  <desc id="desc">{escape(tile.title)}. Xyzzy reference tile generated from '
                f'{escape(catalog.spec_path.name)}.</desc>'
            ),
            f'  <rect width="{catalog.tile_size:.0f}" height="{catalog.tile_size:.0f}" fill="{catalog.outer_fill}"/>',
            (
                f'  <rect x="{rect_inset:.2f}" y="{rect_inset:.2f}" width="{rect_size:.2f}" '
                f'height="{rect_size:.2f}" rx="{rect_radius:.2f}" fill="none" '
                f'stroke="{tile.border_color}" stroke-width="{catalog.inner_border_stroke_width:.2f}"/>'
            ),
            *[line for line in lines if line],
            "</svg>",
        ]
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate Xyzzy reference text-tile SVGs from a shared JSON catalog."
    )
    parser.add_argument(
        "--spec-json",
        default=str(Path(__file__).resolve().with_name("xyzzy-tiles.json")),
        help="Shared Xyzzy tile JSON catalog. Defaults to xyzzy-tiles.json next to glyph.py.",
    )
    parser.add_argument(
        "--output-dir",
        default=str(Path(__file__).resolve().parent),
        help="Directory for generated SVG files. Defaults to the glyph.py directory.",
    )
    parser.add_argument(
        "--output-prefix",
        default="xyzzy-tile-",
        help="Filename prefix for generated SVG files. Defaults to xyzzy-tile-.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    catalog = load_xyzzy_catalog(Path(args.spec_json))
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    written: list[Path] = []
    for tile in catalog.tiles:
        output_path = output_dir / f"{args.output_prefix}{tile.key}.svg"
        output_path.write_text(render_tile_svg(tile, catalog), encoding="utf-8")
        written.append(output_path)
    for path in written:
        print(path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
