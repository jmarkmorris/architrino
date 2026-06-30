#!/usr/bin/env python3
"""Purpose-built 3D feasibility checks for the play-surface tile concept.

This is not CAD and not a safety certificate. It is a lightweight parametric
checker for the current play-surface product assumptions: tile height fields,
neutral sides, ridge placement, support-zone conflicts, and rough stacking
assumptions.
"""

from __future__ import annotations

import argparse
import html
import json
import math
from pathlib import Path
from typing import Callable


REPO = Path(__file__).resolve().parents[4]
OUT_ROOT = REPO / "reference/archie/play-surface/model-checks"

TILE_SIZE = 11.0
BODY_HEIGHT = 3.0
NEUTRAL = 1.5
ACTIVE_OFFSET = 1.0
LOW_SURFACE = NEUTRAL - ACTIVE_OFFSET
HIGH_SURFACE = NEUTRAL + ACTIVE_OFFSET
DEFAULT_APPROACH_BAND = 0.75
STANDARD_ROUND_RADIUS = 3.25
WIDE_ROUND_RADIUS = 4.15
FEATURE_EDGE_CLEARANCE = 0.75
RIDGE_HALF_WIDTH = 1.45
VALLEY_HALF_WIDTH = 1.85
SADDLE_PEAK = 0.5176077295389507
GRID_SAMPLES = 81
SUPPORT_TOLERANCE = 0.08
SURFACE_CLEARANCE = 0.125
WALL_THICKNESS = 0.18


HeightFn = Callable[[float, float, float], float]


def clamp(value: float, low: float, high: float) -> float:
    return max(low, min(high, value))


def smoothstep(edge0: float, edge1: float, x: float) -> float:
    if edge0 == edge1:
        return 1.0 if x >= edge1 else 0.0
    t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0)
    return 0.5 * (1.0 - math.cos(math.pi * t))


def side_fade(x: float, y: float, band: float) -> float:
    distance = min(x, y, TILE_SIZE - x, TILE_SIZE - y)
    return smoothstep(0.0, band, distance)


def bump_profile(distance: float, radius: float) -> float:
    if distance >= radius:
        return 0.0
    return 0.5 * (1.0 + math.cos(math.pi * distance / radius))


def ridge_profile(distance: float, half_width: float) -> float:
    distance = abs(distance)
    if distance >= half_width:
        return 0.0
    return 0.5 * (1.0 + math.cos(math.pi * distance / half_width))


def distance_to_segment(
    x: float,
    y: float,
    start: tuple[float, float],
    end: tuple[float, float],
) -> float:
    sx, sy = start
    ex, ey = end
    dx = ex - sx
    dy = ey - sy
    length_sq = dx * dx + dy * dy
    t = clamp(((x - sx) * dx + (y - sy) * dy) / length_sq, 0.0, 1.0)
    nearest_x = sx + t * dx
    nearest_y = sy + t * dy
    return math.hypot(x - nearest_x, y - nearest_y)


def radial_feature(
    x: float,
    y: float,
    band: float,
    *,
    center: tuple[float, float],
    radius: float,
    amplitude: float,
) -> float:
    d = math.hypot(x - center[0], y - center[1])
    return NEUTRAL + amplitude * bump_profile(d, radius) * side_fade(x, y, band)


def flat_tile(x: float, y: float, band: float) -> float:
    return NEUTRAL


def standard_hill(x: float, y: float, band: float) -> float:
    return radial_feature(
        x,
        y,
        band,
        center=(4.35, 6.65),
        radius=STANDARD_ROUND_RADIUS,
        amplitude=ACTIVE_OFFSET,
    )


def wide_hill(x: float, y: float, band: float) -> float:
    return radial_feature(
        x,
        y,
        band,
        center=(4.7, 6.25),
        radius=WIDE_ROUND_RADIUS,
        amplitude=ACTIVE_OFFSET,
    )


def standard_dip(x: float, y: float, band: float) -> float:
    return radial_feature(
        x,
        y,
        band,
        center=(4.35, 6.65),
        radius=STANDARD_ROUND_RADIUS,
        amplitude=-ACTIVE_OFFSET,
    )


def wide_dip(x: float, y: float, band: float) -> float:
    return radial_feature(
        x,
        y,
        band,
        center=(4.7, 6.25),
        radius=WIDE_ROUND_RADIUS,
        amplitude=-ACTIVE_OFFSET,
    )


def saddle(x: float, y: float, band: float) -> float:
    fade = math.sin(math.pi * x / TILE_SIZE) ** 2 * math.sin(math.pi * y / TILE_SIZE) ** 2
    wave = math.sin(math.pi * (x - y) / TILE_SIZE)
    raw = fade * wave
    return NEUTRAL + ACTIVE_OFFSET * raw / SADDLE_PEAK


def curved_valley(x: float, y: float, band: float) -> float:
    x_start = FEATURE_EDGE_CLEARANCE + VALLEY_HALF_WIDTH
    x_end = TILE_SIZE - FEATURE_EDGE_CLEARANCE - VALLEY_HALF_WIDTH
    if x < x_start or x > x_end:
        return NEUTRAL
    phase = (x - x_start) / (x_end - x_start)
    curve_center = 5.5 + 1.2 * math.sin(2.0 * math.pi * phase - 0.35)
    cross_profile = ridge_profile(y - curve_center, VALLEY_HALF_WIDTH)
    center_x = (x_start + x_end) / 2.0
    half_length = (x_end - x_start) / 2.0
    length_profile = bump_profile(abs(x - center_x), half_length)
    return NEUTRAL - ACTIVE_OFFSET * cross_profile * length_profile


def straight_ridge(x: float, y: float, band: float) -> float:
    centerline = FEATURE_EDGE_CLEARANCE + RIDGE_HALF_WIDTH
    start = FEATURE_EDGE_CLEARANCE + RIDGE_HALF_WIDTH
    end = TILE_SIZE - FEATURE_EDGE_CLEARANCE - RIDGE_HALF_WIDTH
    d = distance_to_segment(x, y, (centerline, start), (centerline, end))
    value = ACTIVE_OFFSET * ridge_profile(d, RIDGE_HALF_WIDTH)
    secondary = -ACTIVE_OFFSET * bump_profile(math.hypot(x - 7.35, y - 6.55), 2.1)
    return NEUTRAL + value + secondary


def corner_ridge(x: float, y: float, band: float) -> float:
    centerline = FEATURE_EDGE_CLEARANCE + RIDGE_HALF_WIDTH
    arc_radius = RIDGE_HALF_WIDTH
    arc_center = (centerline + arc_radius, centerline + arc_radius)
    segment_end = TILE_SIZE - FEATURE_EDGE_CLEARANCE - RIDGE_HALF_WIDTH
    vertical = distance_to_segment(x, y, (centerline, arc_center[1]), (centerline, segment_end))
    horizontal = distance_to_segment(x, y, (arc_center[0], centerline), (segment_end, centerline))
    arc = abs(math.hypot(x - arc_center[0], y - arc_center[1]) - arc_radius)
    if x > arc_center[0] or y > arc_center[1]:
        arc = float("inf")
    value = ACTIVE_OFFSET * ridge_profile(min(vertical, horizontal, arc), RIDGE_HALF_WIDTH)
    secondary = ACTIVE_OFFSET * bump_profile(math.hypot(x - 7.15, y - 7.1), 2.15)
    return NEUTRAL + value + secondary


def paired_hill_dip(x: float, y: float, band: float) -> float:
    hill = ACTIVE_OFFSET * bump_profile(math.hypot(x - 3.4, y - 7.25), 2.65)
    dip = -ACTIVE_OFFSET * bump_profile(math.hypot(x - 7.45, y - 3.95), 2.65)
    return NEUTRAL + (hill + dip) * side_fade(x, y, band)


TILE_MODELS: dict[str, HeightFn] = {
    "flat": flat_tile,
    "standard_hill": standard_hill,
    "wide_hill": wide_hill,
    "standard_dip": standard_dip,
    "wide_dip": wide_dip,
    "saddle": saddle,
    "curved_valley": curved_valley,
    "corner_ridge": corner_ridge,
    "straight_ridge": straight_ridge,
    "paired_hill_dip": paired_hill_dip,
}


SUPPORT_ZONES = {
    "corner_pads": [
        (0.35, 0.35, 1.25, 1.25),
        (TILE_SIZE - 1.25, 0.35, TILE_SIZE - 0.35, 1.25),
        (0.35, TILE_SIZE - 1.25, 1.25, TILE_SIZE - 0.35),
        (TILE_SIZE - 1.25, TILE_SIZE - 1.25, TILE_SIZE - 0.35, TILE_SIZE - 0.35),
    ],
    "side_midpoints": [
        (0.35, 4.65, 1.25, 6.35),
        (TILE_SIZE - 1.25, 4.65, TILE_SIZE - 0.35, 6.35),
        (4.65, 0.35, 6.35, 1.25),
        (4.65, TILE_SIZE - 1.25, 6.35, TILE_SIZE - 0.35),
    ],
}


def sample_grid(fn: HeightFn, band: float) -> list[list[float]]:
    values: list[list[float]] = []
    for row in range(GRID_SAMPLES):
        y = TILE_SIZE * row / (GRID_SAMPLES - 1)
        line = []
        for col in range(GRID_SAMPLES):
            x = TILE_SIZE * col / (GRID_SAMPLES - 1)
            line.append(clamp(fn(x, y, band), LOW_SURFACE, HIGH_SURFACE))
        values.append(line)
    return values


def iter_points() -> list[tuple[float, float]]:
    points = []
    for row in range(GRID_SAMPLES):
        y = TILE_SIZE * row / (GRID_SAMPLES - 1)
        for col in range(GRID_SAMPLES):
            x = TILE_SIZE * col / (GRID_SAMPLES - 1)
            points.append((x, y))
    return points


def zone_contains(zone: tuple[float, float, float, float], x: float, y: float) -> bool:
    x0, y0, x1, y1 = zone
    return x0 <= x <= x1 and y0 <= y <= y1


def support_report(fn: HeightFn, band: float) -> dict:
    out = {}
    points = iter_points()
    for preset, zones in SUPPORT_ZONES.items():
        heights = [
            fn(x, y, band)
            for x, y in points
            if any(zone_contains(zone, x, y) for zone in zones)
        ]
        if not heights:
            out[preset] = {"status": "no_samples"}
            continue
        deviations = [abs(h - NEUTRAL) for h in heights]
        max_deviation = max(deviations)
        out[preset] = {
            "min_height": round(min(heights), 4),
            "max_height": round(max(heights), 4),
            "max_neutral_deviation": round(max_deviation, 4),
            "passes_neutral_support": max_deviation <= SUPPORT_TOLERANCE,
        }
    return out


def side_report(fn: HeightFn, band: float) -> dict:
    checks = {}
    samples = 101
    sides = {
        "left": [(0.0, TILE_SIZE * i / (samples - 1)) for i in range(samples)],
        "right": [(TILE_SIZE, TILE_SIZE * i / (samples - 1)) for i in range(samples)],
        "bottom": [(TILE_SIZE * i / (samples - 1), 0.0) for i in range(samples)],
        "top": [(TILE_SIZE * i / (samples - 1), TILE_SIZE) for i in range(samples)],
    }
    for name, points in sides.items():
        heights = [fn(x, y, band) for x, y in points]
        checks[name] = {
            "max_neutral_deviation": round(max(abs(h - NEUTRAL) for h in heights), 5),
            "passes": max(abs(h - NEUTRAL) for h in heights) <= 1e-5,
        }
    return checks


def summarize_tile(name: str, fn: HeightFn, band: float, pitches: list[float]) -> dict:
    grid = sample_grid(fn, band)
    flat = [h for row in grid for h in row]
    supports = support_report(fn, band)
    side = side_report(fn, band)
    stack = {}
    max_height = max(flat)
    min_height = min(flat)
    for pitch in pitches:
        cavity_ceiling = pitch + BODY_HEIGHT - WALL_THICKNESS
        open_cavity_clearance = cavity_ceiling - max_height
        stack[str(pitch)] = {
            "open_cavity_ceiling": round(cavity_ceiling, 4),
            "max_surface_height": round(max_height, 4),
            "min_surface_height": round(min_height, 4),
            "open_cavity_clearance": round(open_cavity_clearance, 4),
            "open_cavity_passes": open_cavity_clearance >= SURFACE_CLEARANCE,
            "support_conflicts": [
                preset
                for preset, item in supports.items()
                if not item.get("passes_neutral_support", False)
            ],
        }
    return {
        "tile": name,
        "min_height": round(min_height, 4),
        "max_height": round(max_height, 4),
        "side_neutrality": side,
        "support_zones": supports,
        "stack_assumptions_by_pitch": stack,
    }


def svg_color(value: float) -> str:
    t = clamp((value - LOW_SURFACE) / (HIGH_SURFACE - LOW_SURFACE), 0.0, 1.0)
    # Low is pale blue, neutral is white, high is pale purple.
    if t < 0.5:
        local = t / 0.5
        r = int(210 + 45 * local)
        g = int(226 + 29 * local)
        b = 255
    else:
        local = (t - 0.5) / 0.5
        r = 255
        g = int(255 - 55 * local)
        b = 255
    return f"rgb({r},{g},{b})"


def write_svg(out_path: Path, band: float) -> None:
    tile_px = 132
    label_h = 28
    gap = 18
    cols = 3
    rows = math.ceil(len(TILE_MODELS) / cols)
    width = cols * tile_px + (cols + 1) * gap
    height = rows * (tile_px + label_h + gap) + gap
    cell = tile_px / GRID_SAMPLES
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',
        '<rect width="100%" height="100%" fill="white"/>',
    ]
    for idx, (name, fn) in enumerate(TILE_MODELS.items()):
        row, col = divmod(idx, cols)
        x0 = gap + col * (tile_px + gap)
        y0 = gap + row * (tile_px + label_h + gap)
        grid = sample_grid(fn, band)
        for r, line in enumerate(grid):
            for c, value in enumerate(line):
                x = x0 + c * cell
                y = y0 + r * cell
                parts.append(
                    f'<rect x="{x:.2f}" y="{y:.2f}" width="{cell + 0.2:.2f}" '
                    f'height="{cell + 0.2:.2f}" fill="{svg_color(value)}"/>'
                )
        parts.append(
            f'<rect x="{x0}" y="{y0}" width="{tile_px}" height="{tile_px}" '
            'fill="none" stroke="#888" stroke-width="1"/>'
        )
        parts.append(
            f'<text x="{x0}" y="{y0 + tile_px + 18}" font-family="Arial" '
            f'font-size="12" fill="black">{html.escape(name)}</text>'
        )
    parts.append("</svg>")
    out_path.write_text("\n".join(parts) + "\n")


def build_report(band: float, pitches: list[float]) -> dict:
    reports = [summarize_tile(name, fn, band, pitches) for name, fn in TILE_MODELS.items()]
    blockers = []
    for item in reports:
        for preset, support in item["support_zones"].items():
            if not support.get("passes_neutral_support", False):
                blockers.append(
                    {
                        "tile": item["tile"],
                        "support_preset": preset,
                        "max_neutral_deviation": support.get("max_neutral_deviation"),
                    }
                )
    return {
        "units": "inches",
        "tile_size": TILE_SIZE,
        "body_height": BODY_HEIGHT,
        "neutral_plane": NEUTRAL,
        "ordinary_surface_range": [LOW_SURFACE, HIGH_SURFACE],
        "approach_band": band,
        "support_tolerance": SUPPORT_TOLERANCE,
        "surface_clearance": SURFACE_CLEARANCE,
        "tested_stack_pitches": pitches,
        "summary": {
            "tile_count": len(TILE_MODELS),
            "support_zone_conflicts": blockers,
            "interpretation": (
                "Support conflicts are not proof of failure. They show where "
                "standoffs/ribs would land on non-neutral contour geometry and "
                "therefore need a different support zone, underside relief, or "
                "packaging insert."
            ),
        },
        "tiles": reports,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", type=Path, default=OUT_ROOT)
    parser.add_argument("--approach-band", type=float, default=DEFAULT_APPROACH_BAND)
    parser.add_argument("--pitches", default="1.0,1.25")
    args = parser.parse_args()

    pitches = [float(item.strip()) for item in args.pitches.split(",") if item.strip()]
    args.out.mkdir(parents=True, exist_ok=True)
    report = build_report(args.approach_band, pitches)
    report_path = args.out / "play-surface-model-report.json"
    svg_path = args.out / "play-surface-heightfields.svg"
    report_path.write_text(json.dumps(report, indent=2) + "\n")
    write_svg(svg_path, args.approach_band)
    conflicts = report["summary"]["support_zone_conflicts"]
    print(f"wrote {report_path}")
    print(f"wrote {svg_path}")
    print(f"support zone conflicts: {len(conflicts)}")
    if conflicts:
        print("first conflicts:")
        for conflict in conflicts[:8]:
            print(
                f"- {conflict['tile']} / {conflict['support_preset']} "
                f"deviation={conflict['max_neutral_deviation']}"
            )


if __name__ == "__main__":
    main()
