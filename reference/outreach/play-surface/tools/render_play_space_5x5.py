#!/usr/bin/env python3
"""Render a 5x5 play-space concept using the starter-set tile fields."""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

from render_sine_tile_options import OPTIONS, TILE_SIZE, TileOption, make_height_field, perspective_coefficients


TILE_SAMPLES = 260
GRID_TILES = 5
GRID_SAMPLES = TILE_SAMPLES * GRID_TILES
FIELD_SIZE = TILE_SIZE * GRID_TILES
OUT_SIZE = (1800, 1400)
OUT_ROOT = Path(__file__).resolve().parents[1] / "assets/concepts"
OUT_FILE = "play-space-5x5-rim-variety.png"

SOURCE_CORNERS = [(0, 0), (GRID_SAMPLES, 0), (GRID_SAMPLES, GRID_SAMPLES), (0, GRID_SAMPLES)]
TOP_QUAD = [(540, 105), (1660, 365), (1195, 1230), (115, 865)]
DROP = 95


OPTION_BY_SLUG = {option.slug: option for option in OPTIONS}


LayoutTile = tuple[str, int]


LAYOUT: list[list[LayoutTile]] = [
    [
        ("sine-corner-ridge", 0),
        ("sine-straight-ridge", 3),
        ("sine-straight-ridge", 3),
        ("sine-straight-ridge", 3),
        ("sine-corner-ridge", 3),
    ],
    [
        ("sine-straight-ridge", 0),
        ("sine-standard-hill", 0),
        ("sine-wide-dip", 1),
        ("sine-curved-valley", 0),
        ("sine-straight-ridge", 2),
    ],
    [
        ("sine-straight-ridge", 0),
        ("sine-diagonal-saddle", 0),
        ("sine-paired-hill-dip", 0),
        ("sine-wide-hill", 2),
        ("sine-straight-ridge", 2),
    ],
    [
        ("sine-straight-ridge", 0),
        ("sine-standard-dip", 2),
        ("sine-curved-valley", 2),
        ("sine-standard-hill", 1),
        ("sine-straight-ridge", 2),
    ],
    [
        ("sine-corner-ridge", 1),
        ("sine-straight-ridge", 1),
        ("sine-straight-ridge", 1),
        ("sine-straight-ridge", 1),
        ("sine-corner-ridge", 2),
    ],
]


def tile_height(option: TileOption, rotation: int) -> np.ndarray:
    _, _, z = make_height_field(option, samples=TILE_SAMPLES)
    return np.rot90(z, rotation)


def make_play_space_height_field() -> np.ndarray:
    z = np.zeros((GRID_SAMPLES, GRID_SAMPLES), dtype=float)
    for row_index, row in enumerate(LAYOUT):
        for column_index, (slug, rotation) in enumerate(row):
            tile_z = tile_height(OPTION_BY_SLUG[slug], rotation)
            y0 = row_index * TILE_SAMPLES
            x0 = column_index * TILE_SAMPLES
            z[y0 : y0 + TILE_SAMPLES, x0 : x0 + TILE_SAMPLES] = tile_z
    return z


def shade_height_field(z: np.ndarray) -> Image.Image:
    spacing = FIELD_SIZE / (GRID_SAMPLES - 1)
    dz_dy, dz_dx = np.gradient(z, spacing, spacing)

    normal = np.dstack((-3.8 * dz_dx, -3.8 * dz_dy, np.ones_like(z)))
    normal /= np.linalg.norm(normal, axis=2, keepdims=True)
    light = np.array([-0.72, -0.55, 0.82])
    light /= np.linalg.norm(light)

    diffuse = np.clip(normal @ light, 0.0, 1.0)
    height_relief = np.clip(z, -1.0, 1.0)
    shade = 0.62 + 0.48 * diffuse + 0.16 * height_relief
    base = np.array([242, 241, 247], dtype=np.float32)
    rgb = np.clip(base * shade[..., None], 0, 255).astype(np.uint8)

    image = Image.fromarray(rgb, "RGB").filter(ImageFilter.GaussianBlur(radius=0.12)).convert("RGBA")
    draw = ImageDraw.Draw(image)

    seam_fill = (192, 190, 202, 90)
    for index in range(1, GRID_TILES):
        pos = index * TILE_SAMPLES
        draw.line((pos, 0, pos, GRID_SAMPLES), fill=seam_fill, width=2)
        draw.line((0, pos, GRID_SAMPLES, pos), fill=seam_fill, width=2)

    alpha = Image.new("L", image.size, 0)
    mask = ImageDraw.Draw(alpha)
    mask.rounded_rectangle((0, 0, GRID_SAMPLES - 1, GRID_SAMPLES - 1), radius=42, fill=255)
    image.putalpha(alpha)
    return image


def vertical_drop(point: tuple[int, int]) -> tuple[int, int]:
    return (point[0], point[1] + DROP)


def render(out_path: Path) -> None:
    z = make_play_space_height_field()
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
            (front_left_down[0] + 40, front_left_down[1] + 48),
            (front_right_down[0] + 54, front_right_down[1] + 52),
            (back_right_down[0] + 62, back_right_down[1] + 38),
            (back_left_down[0] + 44, back_left_down[1] + 34),
        ],
        fill=(65, 55, 85, 45),
    )
    canvas.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(radius=28)))

    draw.polygon([back_left, front_left, front_left_down, back_left_down], fill=(224, 222, 230))
    draw.polygon([front_left, front_right, front_right_down, front_left_down], fill=(214, 212, 221))
    draw.polygon([back_right, front_right, front_right_down, back_right_down], fill=(186, 184, 194))

    coeffs = perspective_coefficients(TOP_QUAD, SOURCE_CORNERS)
    warped_top = top.transform(
        OUT_SIZE,
        Image.Transform.PERSPECTIVE,
        coeffs,
        resample=Image.Resampling.BICUBIC,
    )
    canvas.alpha_composite(warped_top)

    edge = ImageDraw.Draw(canvas)
    edge.line([front_left, front_right, back_right], fill=(198, 196, 207), width=2)
    edge.line([back_right, back_left, front_left], fill=(232, 230, 238), width=2)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    canvas.convert("RGB").save(out_path, quality=95)
    print(f"wrote {out_path}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", type=Path, default=OUT_ROOT / OUT_FILE)
    args = parser.parse_args()
    render(args.out)


if __name__ == "__main__":
    main()
