#!/usr/bin/env python3
"""Purpose-built 3D feasibility checks for the play-surface tile concept.

This is not CAD and not a safety certificate. It is a lightweight parametric
checker for the current children's-book play-surface assumptions: tile height
fields, neutral sides, ridge placement, support-zone conflicts, and rough
stacking assumptions.
"""

from __future__ import annotations

import argparse
import html
import json
import math
from pathlib import Path
from typing import Callable


REPO = Path(__file__).resolve().parents[4]
OUT_ROOT = REPO / "reference/outreach/childrens-books/production/model-checks"

TILE_SIZE = 11.0
BODY_HEIGHT = 3.0
NEUTRAL = 1.5
LOW_OFFSET = 0.5
HIGH_OFFSET = 1.0
LOW_SURFACE = NEUTRAL - HIGH_OFFSET
HIGH_SURFACE = NEUTRAL + HIGH_OFFSET
DEFAULT_APPROACH_BAND = 0.5
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
    return t * t * (3.0 - 2.0 * t)


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


def hill_low(x: float, y: float, band: float) -> float:
    return radial_feature(x, y, band, center=(4.0, 6.7), radius=3.4, amplitude=LOW_OFFSET)


def hill_high(x: float, y: float, band: float) -> float:
    return radial_feature(x, y, band, center=(4.0, 6.7), radius=3.4, amplitude=HIGH_OFFSET)


def dip_low(x: float, y: float, band: float) -> float:
    return radial_feature(x, y, band, center=(4.0, 6.7), radius=3.4, amplitude=-LOW_OFFSET)


def dip_high(x: float, y: float, band: float) -> float:
    return radial_feature(x, y, band, center=(4.0, 6.7), radius=3.4, amplitude=-HIGH_OFFSET)


def saddle(x: float, y: float, band: float) -> float:
    nx = (x - TILE_SIZE / 2.0) / (TILE_SIZE / 2.0)
    ny = (y - TILE_SIZE / 2.0) / (TILE_SIZE / 2.0)
    raw = 0.42 * (nx * nx - ny * ny)
    return NEUTRAL + raw * side_fade(x, y, band)


def curved_valley(x: float, y: float, band: float) -> float:
    curve_center = 5.5 + 1.2 * math.sin((x / TILE_SIZE) * math.pi * 1.3)
    d = y - curve_center
    return NEUTRAL - LOW_OFFSET * ridge_profile(d, 1.55) * side_fade(x, y, band)


def straight_ridge(x: float, y: float, band: float) -> float:
    centerline = band + 0.72
    length_fade = smoothstep(0.0, band, y) * smoothstep(0.0, band, TILE_SIZE - y)
    value = HIGH_OFFSET * ridge_profile(x - centerline, 0.85) * length_fade
    return NEUTRAL + value


def corner_ridge(x: float, y: float, band: float) -> float:
    centerline = band + 0.72
    vertical = ridge_profile(x - centerline, 0.85) * smoothstep(0.0, band, y)
    horizontal = ridge_profile(y - centerline, 0.85) * smoothstep(0.0, band, x)
    corner_round = ridge_profile(math.hypot(x - centerline, y - centerline), 1.05)
    value = HIGH_OFFSET * max(vertical, horizontal, corner_round)
    value *= smoothstep(0.0, band, TILE_SIZE - x) * smoothstep(0.0, band, TILE_SIZE - y)
    return NEUTRAL + value


def paired_hill_dip(x: float, y: float, band: float) -> float:
    hill = LOW_OFFSET * bump_profile(math.hypot(x - 3.4, y - 7.0), 2.8)
    dip = -LOW_OFFSET * bump_profile(math.hypot(x - 7.2, y - 3.8), 2.8)
    return NEUTRAL + (hill + dip) * side_fade(x, y, band)


TILE_MODELS: dict[str, HeightFn] = {
    "flat": flat_tile,
    "hill_low": hill_low,
    "hill_high": hill_high,
    "dip_low": dip_low,
    "dip_high": dip_high,
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
