#!/usr/bin/env python3
"""Render sine-eased play-surface starter-set tile concepts.

These are geometry studies, not CAD or manufacturing drawings. The renderer
uses deterministic sine/cosine-family height fields so each rolling feature is
smooth, unpatterned, and free of hard lips, sudden drops, flat hill/dip spots,
or constant-depth low regions.
"""

from __future__ import annotations

import argparse
from dataclasses import dataclass
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


TILE_SIZE = 11.0
HALF_TILE = TILE_SIZE / 2.0
GRID_SAMPLES = 1200
OUT_SIZE = (1200, 1200)
OUT_ROOT = Path(__file__).resolve().parents[1] / "assets/concepts/sine-curve-options"

SOURCE_CORNERS = [(0, 0), (GRID_SAMPLES, 0), (GRID_SAMPLES, GRID_SAMPLES), (0, GRID_SAMPLES)]
TOP_QUAD = [(405, 260), (1095, 430), (750, 875), (75, 675)]
DROP = 130
PROFILE_PANEL = (210, 965, 990, 1115)
FEATURE_RADIUS = 3.25
WIDE_FEATURE_RADIUS = 4.15
EDGE_FEATURE_CLEARANCE = 0.75
RIDGE_HALF_WIDTH = 1.45
VALLEY_HALF_WIDTH = 1.85
APPROACH_BAND = 0.85


@dataclass(frozen=True)
class TileOption:
    slug: str
    kind: str
    amplitude: float = 0.0
    radius: float = FEATURE_RADIUS
    center: tuple[float, float] = (4.45, 6.55)


OPTIONS = [
    TileOption("sine-flat", "flat", 0.0),
    TileOption("sine-standard-hill", "round-hill", 1.0, FEATURE_RADIUS, (4.35, 6.65)),
    TileOption("sine-wide-hill", "round-hill", 1.0, WIDE_FEATURE_RADIUS, (4.7, 6.25)),
    TileOption("sine-standard-dip", "round-dip", -1.0, FEATURE_RADIUS, (4.35, 6.65)),
    TileOption("sine-wide-dip", "round-dip", -1.0, WIDE_FEATURE_RADIUS, (4.7, 6.25)),
    TileOption("sine-diagonal-saddle", "diagonal-saddle", 1.0),
    TileOption("sine-curved-valley", "curved-valley", -1.0),
    TileOption("sine-straight-ridge", "straight-ridge", 1.0),
    TileOption("sine-corner-ridge", "corner-ridge", 1.0),
    TileOption("sine-paired-hill-dip", "paired-hill-dip", 1.0),
]


def cosine_lobe(t: np.ndarray) -> np.ndarray:
    """Raised cosine lobe with zero slope at the feature edge and center."""
    t = np.clip(t, 0.0, 1.0)
    return 0.5 * (1.0 + np.cos(np.pi * t))


def smooth_window(value: np.ndarray, start: float, end: float, fade: float) -> np.ndarray:
    """Zero-slope fade-in/fade-out window for keeping sides neutral."""
    left = np.clip((value - start) / fade, 0.0, 1.0)
    right = np.clip((end - value) / fade, 0.0, 1.0)
    return 0.5 * (1.0 - np.cos(np.pi * left)) * 0.5 * (1.0 - np.cos(np.pi * right))


def radial_level_change(
    x: np.ndarray,
    y: np.ndarray,
    *,
    center: tuple[float, float],
    radius: float,
    amplitude: float,
) -> np.ndarray:
    """Circular hill or dip with no flat plateau or flat bottom."""
    distance = np.hypot(x - center[0], y - center[1])
    z = np.zeros_like(distance)

    inside = distance < radius
    t = distance[inside] / radius
    z[inside] = amplitude * cosine_lobe(t)
    return z


def straight_ridge(
    x: np.ndarray,
    y: np.ndarray,
    *,
    center_x: float,
    segment_start: float,
    segment_end: float,
    half_width: float,
    amplitude: float,
) -> np.ndarray:
    distance = distance_to_segment(x, y, (center_x, segment_start), (center_x, segment_end))
    z = np.zeros_like(distance)
    inside = distance < half_width
    z[inside] = amplitude * cosine_lobe(distance[inside] / half_width)
    return z


def distance_to_segment(
    x: np.ndarray,
    y: np.ndarray,
    start: tuple[float, float],
    end: tuple[float, float],
) -> np.ndarray:
    sx, sy = start
    ex, ey = end
    dx = ex - sx
    dy = ey - sy
    length_sq = dx * dx + dy * dy
    t = np.clip(((x - sx) * dx + (y - sy) * dy) / length_sq, 0.0, 1.0)
    nearest_x = sx + t * dx
    nearest_y = sy + t * dy
    return np.hypot(x - nearest_x, y - nearest_y)


def corner_ridge(x: np.ndarray, y: np.ndarray, *, amplitude: float) -> np.ndarray:
    offset = EDGE_FEATURE_CLEARANCE + RIDGE_HALF_WIDTH
    arc_radius = 1.45
    arc_center = (offset + arc_radius, offset + arc_radius)
    segment_end = TILE_SIZE - EDGE_FEATURE_CLEARANCE - RIDGE_HALF_WIDTH

    vertical = distance_to_segment(x, y, (offset, arc_center[1]), (offset, segment_end))
    horizontal = distance_to_segment(x, y, (arc_center[0], offset), (segment_end, offset))

    arc_distance = np.abs(np.hypot(x - arc_center[0], y - arc_center[1]) - arc_radius)
    on_arc_quadrant = (x <= arc_center[0]) & (y <= arc_center[1])
    arc_distance = np.where(on_arc_quadrant, arc_distance, np.inf)

    distance = np.minimum(np.minimum(vertical, horizontal), arc_distance)
    z = np.zeros_like(distance)
    inside = distance < RIDGE_HALF_WIDTH
    z[inside] = amplitude * cosine_lobe(distance[inside] / RIDGE_HALF_WIDTH)
    return z


def curved_valley(x: np.ndarray, y: np.ndarray, *, amplitude: float) -> np.ndarray:
    x_start = EDGE_FEATURE_CLEARANCE + VALLEY_HALF_WIDTH
    x_end = TILE_SIZE - EDGE_FEATURE_CLEARANCE - VALLEY_HALF_WIDTH
    phase = (x - x_start) / (x_end - x_start)
    center_y = HALF_TILE + 1.2 * np.sin(2.0 * np.pi * phase - 0.35)
    distance = np.abs(y - center_y)
    center_x = (x_start + x_end) / 2.0
    half_length = (x_end - x_start) / 2.0
    length_t = np.abs(x - center_x) / half_length

    z = np.zeros_like(distance)
    inside = (distance < VALLEY_HALF_WIDTH) & (length_t < 1.0)
    z[inside] = (
        amplitude
        * cosine_lobe(distance[inside] / VALLEY_HALF_WIDTH)
        * cosine_lobe(length_t[inside])
    )
    return z


def edge_secondary_feature(x: np.ndarray, y: np.ndarray, *, amplitude: float) -> np.ndarray:
    return radial_level_change(
        x,
        y,
        center=(7.35, 6.55),
        radius=2.1,
        amplitude=amplitude,
    )


def corner_secondary_feature(x: np.ndarray, y: np.ndarray, *, amplitude: float) -> np.ndarray:
    return radial_level_change(
        x,
        y,
        center=(7.15, 7.1),
        radius=2.15,
        amplitude=amplitude,
    )


def diagonal_saddle(x: np.ndarray, y: np.ndarray, *, amplitude: float) -> np.ndarray:
    side_fade = np.sin(np.pi * x / TILE_SIZE) ** 2 * np.sin(np.pi * y / TILE_SIZE) ** 2
    diagonal_wave = np.sin(np.pi * (x - y) / TILE_SIZE)
    raw = side_fade * diagonal_wave
    peak = float(np.max(np.abs(raw)))
    return amplitude * raw / peak


def make_height_field(option: TileOption, samples: int = GRID_SAMPLES) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    axis = np.linspace(0.0, TILE_SIZE, samples)
    x, y = np.meshgrid(axis, axis)

    if option.kind == "flat":
        z = np.zeros_like(x)
    elif option.kind in {"round-hill", "round-dip"}:
        z = radial_level_change(
            x,
            y,
            center=option.center,
            radius=option.radius,
            amplitude=option.amplitude,
        )
    elif option.kind == "diagonal-saddle":
        z = diagonal_saddle(x, y, amplitude=option.amplitude)
    elif option.kind == "curved-valley":
        z = curved_valley(x, y, amplitude=option.amplitude)
    elif option.kind == "straight-ridge":
        z = straight_ridge(
            x,
            y,
            center_x=EDGE_FEATURE_CLEARANCE + RIDGE_HALF_WIDTH,
            segment_start=EDGE_FEATURE_CLEARANCE + RIDGE_HALF_WIDTH,
            segment_end=TILE_SIZE - EDGE_FEATURE_CLEARANCE - RIDGE_HALF_WIDTH,
            half_width=RIDGE_HALF_WIDTH,
            amplitude=option.amplitude,
        )
        z += edge_secondary_feature(x, y, amplitude=-option.amplitude)
    elif option.kind == "corner-ridge":
        z = corner_ridge(x, y, amplitude=option.amplitude)
        z += corner_secondary_feature(x, y, amplitude=option.amplitude)
    elif option.kind == "paired-hill-dip":
        z = radial_level_change(
            x,
            y,
            center=(3.4, 7.25),
            radius=2.65,
            amplitude=option.amplitude,
        )
        z += radial_level_change(
            x,
            y,
            center=(7.45, 3.95),
            radius=2.65,
            amplitude=-option.amplitude,
        )
    else:
        raise ValueError(f"Unknown option kind: {option.kind}")

    return x, y, z


def bilinear_sample(axis: np.ndarray, z: np.ndarray, xs: np.ndarray, ys: np.ndarray) -> np.ndarray:
    scale = (len(axis) - 1) / TILE_SIZE
    px = np.clip(xs * scale, 0.0, len(axis) - 1.0)
    py = np.clip(ys * scale, 0.0, len(axis) - 1.0)

    x0 = np.floor(px).astype(int)
    y0 = np.floor(py).astype(int)
    x1 = np.clip(x0 + 1, 0, len(axis) - 1)
    y1 = np.clip(y0 + 1, 0, len(axis) - 1)
    wx = px - x0
    wy = py - y0

    top = z[y0, x0] * (1.0 - wx) + z[y0, x1] * wx
    bottom = z[y1, x0] * (1.0 - wx) + z[y1, x1] * wx
    return top * (1.0 - wy) + bottom * wy


def profile_values(option: TileOption, samples: int = 900) -> tuple[np.ndarray, np.ndarray]:
    axis = np.linspace(0.0, TILE_SIZE, 700)
    _, _, z_grid = make_height_field(option, samples=700)

    if option.kind in {"round-hill", "round-dip"}:
        xs = np.linspace(
            option.center[0] - option.radius - 0.55,
            option.center[0] + option.radius + 0.55,
            samples,
        )
        ys = np.full_like(xs, option.center[1])
    elif option.kind == "curved-valley":
        x_start = EDGE_FEATURE_CLEARANCE + VALLEY_HALF_WIDTH
        x_end = TILE_SIZE - EDGE_FEATURE_CLEARANCE - VALLEY_HALF_WIDTH
        x_mid = (x_start + x_end) / 2.0
        phase = (x_mid - x_start) / (x_end - x_start)
        xs = np.full(samples, x_mid)
        center_y = HALF_TILE + 1.2 * np.sin(2.0 * np.pi * phase - 0.35)
        ys = np.linspace(center_y - VALLEY_HALF_WIDTH - 0.75, center_y + VALLEY_HALF_WIDTH + 0.75, samples)
    elif option.kind == "straight-ridge":
        ridge_center = EDGE_FEATURE_CLEARANCE + RIDGE_HALF_WIDTH
        xs = np.linspace(ridge_center - RIDGE_HALF_WIDTH - 0.85, ridge_center + RIDGE_HALF_WIDTH + 0.85, samples)
        ys = np.full_like(xs, HALF_TILE)
    elif option.kind == "corner-ridge":
        xs = np.full(samples, 6.5)
        ridge_center = EDGE_FEATURE_CLEARANCE + RIDGE_HALF_WIDTH
        ys = np.linspace(ridge_center - RIDGE_HALF_WIDTH - 0.75, ridge_center + RIDGE_HALF_WIDTH + 0.75, samples)
    elif option.kind == "paired-hill-dip":
        xs = np.linspace(2.1, 8.7, samples)
        ys = np.linspace(7.9, 3.45, samples)
    elif option.kind == "diagonal-saddle":
        xs = np.linspace(0.85, TILE_SIZE - 0.85, samples)
        ys = np.full_like(xs, HALF_TILE)
    else:
        xs = np.linspace(0.85, TILE_SIZE - 0.85, samples)
        ys = np.full_like(xs, HALF_TILE)

    z = bilinear_sample(axis, z_grid, xs, ys)
    distance = np.linspace(0.0, 1.0, samples)
    return distance, z


def shade_height_field(z: np.ndarray) -> Image.Image:
    spacing = TILE_SIZE / (GRID_SAMPLES - 1)
    dz_dy, dz_dx = np.gradient(z, spacing, spacing)

    normal = np.dstack((-4.2 * dz_dx, -4.2 * dz_dy, np.ones_like(z)))
    normal /= np.linalg.norm(normal, axis=2, keepdims=True)
    light = np.array([-0.85, -0.58, 0.85])
    light /= np.linalg.norm(light)

    diffuse = normal @ light
    height_relief = np.clip(z, -1.0, 1.0)
    shade = 0.78 + 0.34 * diffuse + 0.03 * height_relief

    base = np.array([242, 241, 247], dtype=np.float32)
    rgb = np.clip(base * shade[..., None], 0, 255).astype(np.uint8)

    image = Image.fromarray(rgb, "RGB").filter(ImageFilter.GaussianBlur(radius=0.06))
    alpha = Image.new("L", image.size, 0)
    mask = ImageDraw.Draw(alpha)
    mask.rounded_rectangle(
        (0, 0, GRID_SAMPLES - 1, GRID_SAMPLES - 1),
        radius=72,
        fill=255,
    )
    image.putalpha(alpha)
    return image


def perspective_coefficients(dest: list[tuple[int, int]], source: list[tuple[int, int]]) -> list[float]:
    """Return PIL perspective coefficients mapping output pixels to source pixels."""
    matrix = []
    vector = []
    for (x, y), (u, v) in zip(dest, source):
        matrix.append([x, y, 1, 0, 0, 0, -u * x, -u * y])
        matrix.append([0, 0, 0, x, y, 1, -v * x, -v * y])
        vector.append(u)
        vector.append(v)
    return np.linalg.solve(np.array(matrix, dtype=float), np.array(vector, dtype=float)).tolist()


def vertical_drop(point: tuple[int, int]) -> tuple[int, int]:
    return (point[0], point[1] + DROP)


def draw_sidewall(
    draw: ImageDraw.ImageDraw,
    points: list[tuple[int, int]],
    *,
    fill: tuple[int, int, int],
) -> None:
    draw.polygon(points, fill=fill)


def draw_antialiased_line(
    image: Image.Image,
    points: list[tuple[float, float]],
    *,
    fill: tuple[int, int, int, int],
    width: int,
) -> None:
    scale = 3
    overlay = Image.new("RGBA", (image.width * scale, image.height * scale), (0, 0, 0, 0))
    scaled = [(round(x * scale), round(y * scale)) for x, y in points]
    ImageDraw.Draw(overlay).line(scaled, fill=fill, width=width * scale, joint="curve")
    overlay = overlay.resize(image.size, Image.Resampling.LANCZOS)
    image.alpha_composite(overlay)


def draw_profile_panel(canvas: Image.Image, option: TileOption) -> None:
    draw = ImageDraw.Draw(canvas)
    x0, y0, x1, y1 = PROFILE_PANEL
    draw.rounded_rectangle((x0, y0, x1, y1), radius=18, fill=(244, 242, 249, 238))

    margin_x = 42
    margin_y = 24
    plot_x0 = x0 + margin_x
    plot_x1 = x1 - margin_x
    plot_y0 = y0 + margin_y
    plot_y1 = y1 - margin_y
    mid_y = (plot_y0 + plot_y1) / 2

    draw.line((plot_x0, mid_y, plot_x1, mid_y), fill=(205, 202, 214, 255), width=2)

    x, z = profile_values(option)
    y_abs_max = max(float(np.max(np.abs(z))), abs(option.amplitude), 0.12)

    points = []
    for px, pz in zip(x, z):
        sx = plot_x0 + float(px) * (plot_x1 - plot_x0)
        sy = mid_y - float(pz) / y_abs_max * ((plot_y1 - plot_y0) * 0.42)
        points.append((sx, sy))

    draw_antialiased_line(canvas, points, fill=(76, 72, 89, 255), width=4)


def render_option(option: TileOption, out_path: Path) -> None:
    _, _, z = make_height_field(option)
    top = shade_height_field(z)

    canvas = Image.new("RGBA", OUT_SIZE, (250, 248, 255, 255))
    draw = ImageDraw.Draw(canvas)

    back_left, back_right, front_right, front_left = TOP_QUAD
    back_left_down = vertical_drop(back_left)
    back_right_down = vertical_drop(back_right)
    front_right_down = vertical_drop(front_right)
    front_left_down = vertical_drop(front_left)

    shadow = Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.polygon(
        [
            (front_left_down[0] + 24, front_left_down[1] + 34),
            (front_right_down[0] + 36, front_right_down[1] + 34),
            (back_right_down[0] + 44, back_right_down[1] + 28),
            (back_left_down[0] + 24, back_left_down[1] + 24),
        ],
        fill=(65, 55, 85, 54),
    )
    canvas.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(radius=24)))

    draw_sidewall(
        draw,
        [back_left, front_left, front_left_down, back_left_down],
        fill=(224, 222, 230),
    )
    draw_sidewall(
        draw,
        [front_left, front_right, front_right_down, front_left_down],
        fill=(214, 212, 221),
    )
    draw_sidewall(
        draw,
        [back_right, front_right, front_right_down, back_right_down],
        fill=(186, 184, 194),
    )

    coeffs = perspective_coefficients(TOP_QUAD, SOURCE_CORNERS)
    warped_top = top.transform(
        OUT_SIZE,
        Image.Transform.PERSPECTIVE,
        coeffs,
        resample=Image.Resampling.BICUBIC,
    )
    canvas.alpha_composite(warped_top)

    edge = ImageDraw.Draw(canvas)
    edge.line([front_left, front_right, back_right], fill=(199, 197, 207), width=2)
    edge.line([back_right, back_left, front_left], fill=(232, 230, 238), width=2)
    draw_profile_panel(canvas, option)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    canvas.convert("RGB").save(out_path, quality=95)
    print(f"wrote {out_path}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", type=Path, default=OUT_ROOT)
    args = parser.parse_args()

    for option in OPTIONS:
        render_option(option, args.out / f"{option.slug}.png")


if __name__ == "__main__":
    main()
