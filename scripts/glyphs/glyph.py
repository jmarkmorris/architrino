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
class XyzzyBinaryGlyphCircle:
    key: str
    cx: float
    cy: float
    radius: float
    fill_color: str
    filter_value: str = ""


@dataclass(frozen=True)
class XyzzyBinaryGlyphOrbit:
    cx: float
    cy: float
    rx: float
    ry: float
    stroke_color: str
    stroke_width: float
    filter_value: str = ""


@dataclass(frozen=True)
class XyzzyBinaryGlyphAxis:
    x1: float
    y1: float
    x2: float
    y2: float
    stroke_color: str
    stroke_width: float
    line_cap: str = "round"
    opacity: float = 1.0
    stroke_dasharray: str = ""
    stroke_dashoffset: float = 0.0


@dataclass(frozen=True)
class XyzzyBinaryGlyph:
    show_orbit: bool
    show_axis: bool
    view_box_width: float
    view_box_height: float
    orbit: XyzzyBinaryGlyphOrbit
    axis: XyzzyBinaryGlyphAxis
    circles: tuple[XyzzyBinaryGlyphCircle, ...]


@dataclass(frozen=True)
class XyzzyChargeCircle:
    cx: float
    cy: float
    radius: float
    fill_color: str
    filter_value: str = ""


@dataclass(frozen=True)
class XyzzyResolvedTile:
    key: str
    title: str
    tile_type: str
    border_color: str
    lines: tuple[XyzzyResolvedLine, ...]
    grammar_code: str = ""
    binary_glyph: XyzzyBinaryGlyph | None = None
    text_offset_y: float = 0.0
    charge_circle: XyzzyChargeCircle | None = None


@dataclass(frozen=True)
class XyzzyCatalog:
    spec_path: Path
    tile_size: float
    outer_fill: str
    inner_border_outer_inset: float
    inner_border_outer_size: float
    inner_border_stroke_width: float
    inner_border_outer_radius: float
    text_font_family: str
    text_font_size: float
    text_font_weight: int
    line_gap: float
    epsilon_entity: str
    tiles: tuple[XyzzyResolvedTile, ...]


@dataclass(frozen=True)
class XyzzyReviewGroup:
    key: str
    title: str
    rows: tuple[tuple[str, ...], ...]


@dataclass(frozen=True)
class XyzzyReviewGroupCatalog:
    spec_path: Path
    special_groups: tuple[XyzzyReviewGroup, ...]
    single_row_groups: tuple[XyzzyReviewGroup, ...]
    quark_color_groups: tuple[XyzzyReviewGroup, ...]
    composite_groups: tuple[XyzzyReviewGroup, ...]


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


def resolve_binary_glyph(
    binary_glyph_spec: dict[str, object],
    *,
    palette: dict[str, str],
) -> XyzzyBinaryGlyph:
    glyph_spec = binary_glyph_spec if isinstance(binary_glyph_spec, dict) else {}
    orbit_spec = glyph_spec.get("orbit")
    axis_spec = glyph_spec.get("axis")
    circle_specs = glyph_spec.get("circles")
    orbit_spec = orbit_spec if isinstance(orbit_spec, dict) else {}
    axis_spec = axis_spec if isinstance(axis_spec, dict) else {}
    return XyzzyBinaryGlyph(
        show_orbit=bool(glyph_spec.get("showOrbit", True)),
        show_axis=bool(glyph_spec.get("showAxis", True)),
        view_box_width=float(glyph_spec.get("viewBoxWidth", 120)),
        view_box_height=float(glyph_spec.get("viewBoxHeight", 120)),
        orbit=XyzzyBinaryGlyphOrbit(
            cx=float(orbit_spec.get("cx", 60)),
            cy=float(orbit_spec.get("cy", 60)),
            rx=float(orbit_spec.get("rx", 38)),
            ry=float(orbit_spec.get("ry", 13)),
            stroke_color=resolve_palette_color(palette, str(orbit_spec.get("strokeColor", ""))),
            stroke_width=float(orbit_spec.get("strokeWidth", 5)),
            filter_value=str(orbit_spec.get("filter", "")).strip(),
        ),
        axis=XyzzyBinaryGlyphAxis(
            x1=float(axis_spec.get("x1", 60)),
            y1=float(axis_spec.get("y1", 33.3333333333)),
            x2=float(axis_spec.get("x2", 60)),
            y2=float(axis_spec.get("y2", 86.6666666667)),
            stroke_color=resolve_palette_color(palette, str(axis_spec.get("strokeColor", ""))),
            stroke_width=float(axis_spec.get("strokeWidth", 4)),
            line_cap=str(axis_spec.get("lineCap", "butt")).strip() or "butt",
            opacity=float(axis_spec.get("opacity", 1)),
            stroke_dasharray=str(axis_spec.get("strokeDasharray", "")).strip(),
            stroke_dashoffset=float(axis_spec.get("strokeDashoffset", 0)),
        ),
        circles=tuple(
            XyzzyBinaryGlyphCircle(
                key=str(circle_spec.get("key", "")),
                cx=float(circle_spec.get("cx", 0)),
                cy=float(circle_spec.get("cy", 0)),
                radius=float(circle_spec.get("r", 0)),
                fill_color=resolve_palette_color(palette, str(circle_spec.get("fillColor", ""))),
                filter_value=str(circle_spec.get("filter", "")).strip(),
            )
            for circle_spec in (circle_specs if isinstance(circle_specs, list) else [])
        ),
    )


def resolve_charge_circle(
    charge_circle_spec: dict[str, object],
    *,
    palette: dict[str, str],
) -> XyzzyChargeCircle | None:
    if not isinstance(charge_circle_spec, dict) or not charge_circle_spec:
        return None
    radius = float(charge_circle_spec.get("r", 0))
    if radius <= 0:
        return None
    return XyzzyChargeCircle(
        cx=float(charge_circle_spec.get("cx", 40)),
        cy=float(charge_circle_spec.get("cy", 57)),
        radius=radius,
        fill_color=resolve_palette_color(palette, str(charge_circle_spec.get("fillColor", ""))),
        filter_value=str(charge_circle_spec.get("filter", "")).strip(),
    )


def create_binary_circle(
    key: str,
    position: dict[str, object],
    radius: float,
    fill_color: str,
    filter_value: str,
    *,
    palette: dict[str, str],
) -> XyzzyBinaryGlyphCircle:
    return XyzzyBinaryGlyphCircle(
        key=key,
        cx=float(position.get("cx", 0)),
        cy=float(position.get("cy", 0)),
        radius=float(radius),
        fill_color=resolve_palette_color(palette, fill_color),
        filter_value=filter_value.strip(),
    )


def resolve_binary_border_color(generator: dict[str, object], polar_code: str, *, palette: dict[str, str]) -> str:
    border_color_by_polar = (
        generator.get("borderColorByPolar") if isinstance(generator.get("borderColorByPolar"), dict) else {}
    )
    token = str(border_color_by_polar.get(polar_code, generator.get("borderColor", "purple")))
    return resolve_palette_color(palette, token)


def resolve_binary_axis_for_mode(generator: dict[str, object], mode: str) -> dict[str, object]:
    base_axis = generator.get("axis") if isinstance(generator.get("axis"), dict) else {}
    axis_by_mode = generator.get("axisByMode") if isinstance(generator.get("axisByMode"), dict) else {}
    mode_override = axis_by_mode.get(mode) if isinstance(axis_by_mode.get(mode), dict) else {}
    return {
        **base_axis,
        **mode_override,
    }


def resolve_binary_polar_options_for_mode(generator: dict[str, object], mode: str) -> list[str]:
    polar_options_by_mode = (
        generator.get("polarOptionsByMode") if isinstance(generator.get("polarOptionsByMode"), dict) else {}
    )
    mode_specific_options = polar_options_by_mode.get(mode)
    if isinstance(mode_specific_options, list):
        return [str(option) for option in mode_specific_options]
    polar_options = generator.get("polarOptions")
    if isinstance(polar_options, list):
        return [str(option) for option in polar_options]
    return []


def build_binary_glyph_tile_from_grammar(
    grammar_code: str,
    generator: dict[str, object],
    *,
    palette: dict[str, str],
) -> XyzzyResolvedTile:
    mode, binary, polar = (part.strip() for part in grammar_code.split(":", 2))
    colors = generator.get("colors", {}) if isinstance(generator.get("colors"), dict) else {}
    filters = generator.get("filters", {}) if isinstance(generator.get("filters"), dict) else {}
    positions = generator.get("positions", {}) if isinstance(generator.get("positions"), dict) else {}
    circle_radius = float(generator.get("circleRadius", 0))
    color_by_code = {
        "b": str(colors.get("blue", "")),
        "r": str(colors.get("red", "")),
    }
    binary_pair = None
    if binary == "br":
        binary_pair = {"left": color_by_code["b"], "right": color_by_code["r"]}
    elif binary == "rb":
        binary_pair = {"left": color_by_code["r"], "right": color_by_code["b"]}
    polar_pair = None
    if len(polar) == 2:
        polar_pair = {
            "bottom": color_by_code.get(polar[0], ""),
            "top": color_by_code.get(polar[1], ""),
        }
    circles: list[XyzzyBinaryGlyphCircle] = []
    if binary_pair:
        circles.extend(
            [
                create_binary_circle(
                    "left",
                    positions.get("left", {}) if isinstance(positions.get("left"), dict) else {},
                    circle_radius,
                    binary_pair["left"],
                    str(filters.get(binary_pair["left"], "")),
                    palette=palette,
                ),
                create_binary_circle(
                    "right",
                    positions.get("right", {}) if isinstance(positions.get("right"), dict) else {},
                    circle_radius,
                    binary_pair["right"],
                    str(filters.get(binary_pair["right"], "")),
                    palette=palette,
                ),
            ]
        )
    if polar_pair:
        circles.extend(
            [
                create_binary_circle(
                    "top",
                    positions.get("top", {}) if isinstance(positions.get("top"), dict) else {},
                    circle_radius,
                    polar_pair["top"],
                    str(filters.get(polar_pair["top"], "")),
                    palette=palette,
                ),
                create_binary_circle(
                    "bottom",
                    positions.get("bottom", {}) if isinstance(positions.get("bottom"), dict) else {},
                    circle_radius,
                    polar_pair["bottom"],
                    str(filters.get(polar_pair["bottom"], "")),
                    palette=palette,
                ),
            ]
        )
    return XyzzyResolvedTile(
        key=f"binary-{mode}-{('none' if binary == '--' else binary)}-{polar}",
        title=f"{str(generator.get('titlePrefix', 'Binary tile'))}: {grammar_code}",
        tile_type="binary-glyph",
        border_color=resolve_binary_border_color(generator, polar, palette=palette),
        lines=tuple(),
        grammar_code=grammar_code,
        binary_glyph=resolve_binary_glyph(
            {
                "showOrbit": mode in {"full", "bare"},
                "showAxis": mode in {"full", "axis", "bare"},
                "viewBoxWidth": generator.get("viewBoxWidth", 120),
                "viewBoxHeight": generator.get("viewBoxHeight", 120),
                "orbit": generator.get("orbit", {}),
                "axis": resolve_binary_axis_for_mode(generator, mode),
                "circles": [
                    {
                        "key": circle.key,
                        "cx": circle.cx,
                        "cy": circle.cy,
                        "r": circle.radius,
                        "fillColor": circle.fill_color,
                        "filter": circle.filter_value,
                    }
                    for circle in circles
                ],
            },
            palette=palette,
        ),
    )


def create_generated_binary_glyph_tiles(
    raw: dict[str, object],
    *,
    palette: dict[str, str],
) -> list[XyzzyResolvedTile]:
    generator = raw.get("binaryGlyphGenerator")
    if not isinstance(generator, dict):
        return []
    binary_options_by_mode = (
        generator.get("binaryOptionsByMode") if isinstance(generator.get("binaryOptionsByMode"), dict) else {}
    )
    mode_order = (
        generator.get("modeOrder")
        if isinstance(generator.get("modeOrder"), list)
        else list(binary_options_by_mode.keys())
    )
    generated_tiles: list[XyzzyResolvedTile] = []
    for mode in mode_order:
        if not isinstance(mode, str) or not mode.strip():
            continue
        binary_options = binary_options_by_mode.get(mode, [])
        if not isinstance(binary_options, list):
            continue
        polar_options = resolve_binary_polar_options_for_mode(generator, mode)
        for binary in binary_options:
            if not isinstance(binary, str):
                continue
            for polar in polar_options:
                generated_tiles.append(
                    build_binary_glyph_tile_from_grammar(
                        f"{mode}:{binary}:{str(polar)}",
                        generator,
                        palette=palette,
                    )
                )
    return generated_tiles


def load_xyzzy_catalog(spec_path: Path) -> XyzzyCatalog:
    raw = json.loads(spec_path.read_text(encoding="utf-8"))
    geometry = raw["geometry"]
    palette = raw["palette"]
    text_layout = raw["textLayout"]
    tiles: list[XyzzyResolvedTile] = []
    for tile_spec in raw["tiles"]:
        tile_type = str(tile_spec.get("type", "text"))
        line_specs = tile_spec.get("lines", [])
        resolved_lines: tuple[XyzzyResolvedLine, ...] = tuple()
        binary_glyph = None
        charge_circle = None
        if tile_type in {"text", "charge-glyph"}:
            if len(line_specs) != 3:
                raise ValueError(f"Tile {tile_spec.get('key')} must have exactly 3 lines.")
            resolved_lines = tuple(
                resolve_line_spec(line_spec, palette=palette) for line_spec in line_specs
            )
        elif tile_type == "binary-glyph":
            binary_glyph = resolve_binary_glyph(tile_spec.get("binaryGlyph", {}), palette=palette)
        else:
            raise ValueError(f"Unsupported tile type: {tile_type}")
        if tile_type == "charge-glyph":
            charge_circle = resolve_charge_circle(tile_spec.get("chargeCircle", {}), palette=palette)
        tiles.append(
            XyzzyResolvedTile(
                key=str(tile_spec["key"]),
                title=str(tile_spec["title"]),
                tile_type=tile_type,
                border_color=resolve_palette_color(palette, str(tile_spec["borderColor"])),
                lines=resolved_lines,
                grammar_code=str(tile_spec.get("grammarCode", "")),
                binary_glyph=binary_glyph,
                text_offset_y=float(tile_spec.get("textOffsetYPx", 0)),
                charge_circle=charge_circle,
            )
        )
    tiles.extend(create_generated_binary_glyph_tiles(raw, palette=palette))
    tile_size = float(geometry["tileSizePx"])
    inner_border_outer_size = float(geometry["innerBorderOuterSizePx"])
    inner_border_outer_inset = float(geometry.get("innerBorderOuterInsetPx", (tile_size - inner_border_outer_size) / 2.0))
    return XyzzyCatalog(
        spec_path=spec_path,
        tile_size=tile_size,
        outer_fill=resolve_palette_color(palette, str(geometry["outerFillColor"])),
        inner_border_outer_inset=inner_border_outer_inset,
        inner_border_outer_size=inner_border_outer_size,
        inner_border_stroke_width=float(geometry["innerBorderStrokeWidthPx"]),
        inner_border_outer_radius=float(geometry["innerBorderOuterRadiusPx"]),
        text_font_family=str(text_layout["fontFamily"]),
        text_font_size=float(text_layout["fontSizePx"]),
        text_font_weight=int(text_layout["fontWeight"]),
        line_gap=float(text_layout["lineGapPx"]),
        epsilon_entity=str(text_layout["epsilonEntity"]),
        tiles=tuple(tiles),
    )


def get_frame_geometry(catalog: XyzzyCatalog) -> tuple[float, float, float, float]:
    rect_inset = catalog.inner_border_outer_inset + (catalog.inner_border_stroke_width / 2.0)
    rect_size = catalog.inner_border_outer_size - catalog.inner_border_stroke_width
    rect_radius = max(0.0, catalog.inner_border_outer_radius - (catalog.inner_border_stroke_width / 2.0))
    return rect_inset, rect_size, rect_radius, catalog.inner_border_outer_inset


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


def render_tile_body_lines(
    tile: XyzzyResolvedTile,
    catalog: XyzzyCatalog,
    *,
    indent: str = "  ",
) -> list[str]:
    rect_inset, rect_size, rect_radius, outer_inset = get_frame_geometry(catalog)
    content: list[str] = []
    if tile.tile_type == "text":
        baselines = get_tile_baselines(tile.lines, catalog)
        rendered_lines = [
            render_line(tile.lines[0], baselines[0] + tile.text_offset_y, catalog=catalog),
            render_line(tile.lines[1], baselines[1] + tile.text_offset_y, catalog=catalog),
            render_line(tile.lines[2], baselines[2] + tile.text_offset_y, catalog=catalog),
        ]
        content.extend(line for line in rendered_lines if line)
    elif tile.tile_type == "charge-glyph":
        if tile.charge_circle:
            circle_style = (
                f' style="filter:{escape(tile.charge_circle.filter_value)}"'
                if tile.charge_circle.filter_value
                else ""
            )
            content.append(
                (
                    f'  <circle cx="{tile.charge_circle.cx:.2f}" cy="{tile.charge_circle.cy:.2f}" '
                    f'r="{tile.charge_circle.radius:.2f}" fill="{tile.charge_circle.fill_color}" '
                    f'vector-effect="non-scaling-stroke"{circle_style}/>'
                )
            )
        baselines = get_tile_baselines(tile.lines, catalog)
        rendered_lines = [
            render_line(tile.lines[0], baselines[0] + tile.text_offset_y, catalog=catalog),
            render_line(tile.lines[1], baselines[1] + tile.text_offset_y, catalog=catalog),
            render_line(tile.lines[2], baselines[2] + tile.text_offset_y, catalog=catalog),
        ]
        content.extend(line for line in rendered_lines if line)
    elif tile.tile_type == "binary-glyph" and tile.binary_glyph:
        glyph_inset = outer_inset
        orbit = tile.binary_glyph.orbit
        axis = tile.binary_glyph.axis
        content.append(
            (
                f'  <svg x="{glyph_inset:.2f}" y="{glyph_inset:.2f}" '
                f'width="{catalog.inner_border_outer_size:.2f}" '
                f'height="{catalog.inner_border_outer_size:.2f}" '
                f'viewBox="0 0 {tile.binary_glyph.view_box_width:.0f} {tile.binary_glyph.view_box_height:.0f}" '
                f'aria-hidden="true">'
            )
        )
        if tile.binary_glyph.show_orbit:
            orbit_style = (
                f' style="filter:{escape(orbit.filter_value)}"'
                if orbit.filter_value
                else ""
            )
            content.append(
                (
                    f'    <ellipse cx="{orbit.cx:.2f}" cy="{orbit.cy:.2f}" rx="{orbit.rx:.2f}" '
                    f'ry="{orbit.ry:.2f}" fill="none" stroke="{orbit.stroke_color}" '
                    f'stroke-width="{orbit.stroke_width:.2f}"{orbit_style}/>'
                )
            )
        if tile.binary_glyph.show_axis:
            axis_dasharray = (
                f' stroke-dasharray="{escape(axis.stroke_dasharray)}"'
                if axis.stroke_dasharray
                else ""
            )
            axis_dashoffset = (
                f' stroke-dashoffset="{axis.stroke_dashoffset:.2f}"'
                if axis.stroke_dashoffset
                else ""
            )
            content.append(
                (
                    f'    <line x1="{axis.x1:.2f}" y1="{axis.y1:.2f}" x2="{axis.x2:.2f}" y2="{axis.y2:.2f}" '
                    f'fill="none" stroke="{axis.stroke_color}" stroke-width="{axis.stroke_width:.2f}" '
                    f'stroke-linecap="{escape(axis.line_cap)}" '
                    f'opacity="{axis.opacity:.2f}"{axis_dasharray}{axis_dashoffset}/>'
                )
            )
        for circle in tile.binary_glyph.circles:
            circle_style = (
                f' style="filter:{escape(circle.filter_value)}"'
                if circle.filter_value
                else ""
            )
            content.append(
                (
                    f'    <circle cx="{circle.cx:.2f}" cy="{circle.cy:.2f}" r="{circle.radius:.2f}" '
                    f'fill="{circle.fill_color}" vector-effect="non-scaling-stroke"{circle_style}/>'
                )
            )
        content.append("  </svg>")
    nested_content = [line if line.startswith("  ") else f"  {line}" for line in content]
    return [
        f'{indent}<rect width="{catalog.tile_size:.0f}" height="{catalog.tile_size:.0f}" fill="{catalog.outer_fill}"/>',
        (
            f'{indent}<rect x="{rect_inset:.2f}" y="{rect_inset:.2f}" width="{rect_size:.2f}" '
            f'height="{rect_size:.2f}" rx="{rect_radius:.2f}" fill="none" '
            f'stroke="{tile.border_color}" stroke-width="{catalog.inner_border_stroke_width:.2f}"/>'
        ),
        *(f"{indent}{line[2:]}" if line.startswith("  ") else f"{indent}{line}" for line in nested_content),
    ]


def render_tile_svg(tile: XyzzyResolvedTile, catalog: XyzzyCatalog) -> str:
    return "\n".join(
        [
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {catalog.tile_size:.0f} {catalog.tile_size:.0f}" role="img" aria-labelledby="title desc">',
            f'  <title id="title">{escape(tile.title)}</title>',
            (
                f'  <desc id="desc">{escape(tile.title)}. Xyzzy reference tile generated from '
                f'{escape(catalog.spec_path.name)}.</desc>'
            ),
            *render_tile_body_lines(tile, catalog, indent="  "),
            "</svg>",
        ]
    )


def load_xyzzy_review_group_catalog(spec_path: Path) -> XyzzyReviewGroupCatalog:
    raw = json.loads(spec_path.read_text(encoding="utf-8"))

    def resolve_groups(key: str) -> tuple[XyzzyReviewGroup, ...]:
        groups = raw.get(key)
        if not isinstance(groups, list):
            return tuple()
        resolved_groups: list[XyzzyReviewGroup] = []
        for group_spec in groups:
            if not isinstance(group_spec, dict):
                continue
            rows = group_spec.get("rows")
            if not isinstance(rows, list):
                continue
            resolved_rows: list[tuple[str, ...]] = []
            for row in rows:
                if not isinstance(row, list):
                    continue
                resolved_rows.append(tuple(str(tile_key) for tile_key in row if str(tile_key).strip()))
            if not resolved_rows:
                continue
            resolved_groups.append(
                XyzzyReviewGroup(
                    key=str(group_spec.get("key", "")).strip(),
                    title=str(group_spec.get("title", "")).strip(),
                    rows=tuple(resolved_rows),
                )
            )
        return tuple(group for group in resolved_groups if group.key and group.rows)

    return XyzzyReviewGroupCatalog(
        spec_path=spec_path,
        special_groups=resolve_groups("specialGroups"),
        single_row_groups=resolve_groups("singleRowGroups"),
        quark_color_groups=resolve_groups("quarkColorGroups"),
        composite_groups=resolve_groups("compositeGroups"),
    )


def render_group_svg(group: XyzzyReviewGroup, catalog: XyzzyCatalog) -> str:
    tile_by_key = {tile.key: tile for tile in catalog.tiles}
    missing_tile_keys = [
        tile_key
        for row in group.rows
        for tile_key in row
        if tile_key not in tile_by_key
    ]
    if missing_tile_keys:
        missing_keys = ", ".join(sorted(set(missing_tile_keys)))
        raise ValueError(f"Group {group.key} references unknown tile keys: {missing_keys}")

    width = catalog.tile_size * 4
    height = catalog.tile_size * len(group.rows)
    lines = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width:.0f} {height:.0f}" role="img" aria-labelledby="title desc">',
        f'  <title id="title">{escape(group.title)}</title>',
        (
            f'  <desc id="desc">{escape(group.title)}. Xyzzy group reference generated from '
            f'{escape(catalog.spec_path.name)}.</desc>'
        ),
    ]
    for row_index, row in enumerate(group.rows):
        for column_index, tile_key in enumerate(row):
            tile = tile_by_key[tile_key]
            x = column_index * catalog.tile_size
            y = row_index * catalog.tile_size
            lines.append(f'  <g transform="translate({x:.2f} {y:.2f})">')
            lines.extend(render_tile_body_lines(tile, catalog, indent="    "))
            lines.append("  </g>")
    lines.append("</svg>")
    return "\n".join(lines)


def parse_args() -> argparse.Namespace:
    repo_root = Path(__file__).resolve().parents[2]
    parser = argparse.ArgumentParser(
        description="Generate Xyzzy reference SVG tiles from a shared JSON catalog."
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
    parser.add_argument(
        "--group-spec-json",
        default=str(repo_root / "src" / "apps" / "xyzzy" / "xyzzy-review-groups.json"),
        help="Shared Xyzzy review-group JSON catalog. Defaults to src/apps/xyzzy/xyzzy-review-groups.json.",
    )
    parser.add_argument(
        "--group-output-prefix",
        default="xyzzy-group-",
        help="Filename prefix for generated Xyzzy group SVG files. Defaults to xyzzy-group-.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    catalog = load_xyzzy_catalog(Path(args.spec_json))
    group_catalog = load_xyzzy_review_group_catalog(Path(args.group_spec_json))
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    written: list[Path] = []
    for tile in catalog.tiles:
        output_path = output_dir / f"{args.output_prefix}{tile.key}.svg"
        output_path.write_text(render_tile_svg(tile, catalog), encoding="utf-8")
        written.append(output_path)
    for group in (
        *group_catalog.special_groups,
        *group_catalog.single_row_groups,
        *group_catalog.quark_color_groups,
        *group_catalog.composite_groups,
    ):
        output_path = output_dir / f"{args.group_output_prefix}{group.key}.svg"
        output_path.write_text(render_group_svg(group, catalog), encoding="utf-8")
        written.append(output_path)
    for path in written:
        print(path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
