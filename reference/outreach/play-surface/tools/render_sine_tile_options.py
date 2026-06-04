#!/usr/bin/env python3
"""Render sine-eased play-surface tile concept options.

These are geometry studies, not CAD or manufacturing drawings. The renderer
uses a deterministic raised-cosine height field so the surface feature follows
the intended level-to-level S-curve instead of a guessed visual contour.
"""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


TILE_SIZE = 11.0
GRID_SAMPLES = 1200
OUT_SIZE = (1200, 1200)
OUT_ROOT = Path(__file__).resolve().parents[1] / "assets/concepts/sine-curve-options"

SOURCE_CORNERS = [(0, 0), (GRID_SAMPLES, 0), (GRID_SAMPLES, GRID_SAMPLES), (0, GRID_SAMPLES)]
TOP_QUAD = [(405, 260), (1095, 430), (750, 875), (75, 675)]
DROP = 130


def raised_cosine(t: np.ndarray) -> np.ndarray:
    """Zero-slope transition from level 0 to level 1."""
    t = np.clip(t, 0.0, 1.0)
    return 0.5 * (1.0 - np.cos(np.pi * t))


def radial_level_change(
    x: np.ndarray,
    y: np.ndarray,
    *,
    center: tuple[float, float],
    plateau_radius: float,
    transition_width: float,
    amplitude: float,
) -> np.ndarray:
    """Circular level feature with sine-eased walls and a flat center level."""
    distance = np.hypot(x - center[0], y - center[1])
    outer_radius = plateau_radius + transition_width
    z = np.zeros_like(distance)

    inside = distance <= plateau_radius
    transition = (distance > plateau_radius) & (distance < outer_radius)

    z[inside] = amplitude
    t = (outer_radius - distance[transition]) / transition_width
    z[transition] = amplitude * raised_cosine(t)
    return z


def make_height_field(amplitude: float) -> np.ndarray:
    axis = np.linspace(0.0, TILE_SIZE, GRID_SAMPLES)
    x, y = np.meshgrid(axis, axis)
    return radial_level_change(
        x,
        y,
        center=(4.45, 6.55),
        plateau_radius=0.95,
        transition_width=2.25,
        amplitude=amplitude,
    )


def shade_height_field(z: np.ndarray) -> Image.Image:
    spacing = TILE_SIZE / (GRID_SAMPLES - 1)
    dz_dy, dz_dx = np.gradient(z, spacing, spacing)

    normal = np.dstack((-1.55 * dz_dx, -1.55 * dz_dy, np.ones_like(z)))
    normal /= np.linalg.norm(normal, axis=2, keepdims=True)
    light = np.array([-0.45, -0.75, 1.35])
    light /= np.linalg.norm(light)

    diffuse = np.clip(normal @ light, 0.0, 1.0)
    shade = 0.72 + 0.34 * diffuse

    base = np.array([242, 241, 247], dtype=np.float32)
    rgb = np.clip(base * shade[..., None], 0, 255).astype(np.uint8)

    # Very soft plastic finish, not texture.
    image = Image.fromarray(rgb, "RGB").filter(ImageFilter.GaussianBlur(radius=0.35))
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


def render_option(name: str, amplitude: float, out_path: Path) -> None:
    z = make_height_field(amplitude)
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

    out_path.parent.mkdir(parents=True, exist_ok=True)
    canvas.convert("RGB").save(out_path, quality=95)
    print(f"wrote {out_path}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", type=Path, default=OUT_ROOT)
    args = parser.parse_args()

    options = [
        ("sine-low-hill", 0.5),
        ("sine-high-hill", 1.0),
        ("sine-low-dip", -0.5),
        ("sine-high-dip", -1.0),
    ]
    for name, amplitude in options:
        render_option(name, amplitude, args.out / f"{name}.png")


if __name__ == "__main__":
    main()
