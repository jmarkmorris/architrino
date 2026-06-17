from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parent
SOURCE_SIZE = 1024
HOME_SIZE = 180

COLORS = {
    "reader_purple": (75, 0, 130),
    "deep_purple": (39, 0, 74),
    "tile_purple": (162, 89, 255),
    "red": (255, 90, 74),
    "blue": (45, 140, 255),
    "standard_red": (255, 61, 61),
    "standard_blue": (24, 121, 255),
    "white": (245, 247, 255),
    "soft_white": (220, 226, 255),
}

BACKGROUND_CACHE: dict[int, Image.Image] = {}


def blend(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return tuple(int(round(a[i] * (1 - t) + b[i] * t)) for i in range(3))


def rgba(color: tuple[int, int, int], alpha: float) -> tuple[int, int, int, int]:
    return (*color, max(0, min(255, int(round(alpha * 255)))))


def make_canvas(size: int) -> Image.Image:
    if size in BACKGROUND_CACHE:
        return BACKGROUND_CACHE[size].copy()

    base = Image.new("RGB", (size, size), COLORS["reader_purple"])
    px = base.load()
    center = size / 2
    for y in range(size):
        yy = (y - center) / center
        for x in range(size):
            xx = (x - center) / center
            r = math.sqrt(xx * xx + yy * yy)
            diagonal = (x + y) / (size * 2)
            c = blend(COLORS["reader_purple"], COLORS["deep_purple"], min(1, r * 0.72 + diagonal * 0.22))
            if r < 0.55:
                c = blend(c, COLORS["tile_purple"], (0.55 - r) * 0.18)
            px[x, y] = c
    result = base.convert("RGBA")
    BACKGROUND_CACHE[size] = result
    return result.copy()


def draw_tiny_architrino(
    draw: ImageDraw.ImageDraw,
    x: float,
    y: float,
    radius: float,
    color: tuple[int, int, int],
) -> None:
    for i in range(3, 0, -1):
        rr = radius * (1 + i * 0.18)
        draw.ellipse((x - rr, y - rr, x + rr, y + rr), fill=rgba(color, 0.025 * i))
    draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=rgba(color, 1.0))
    draw.ellipse(
        (x - radius, y - radius, x + radius, y + radius),
        outline=rgba(COLORS["soft_white"], 0.78),
        width=max(2, int(radius * 0.1)),
    )
    hi = radius * 0.22
    draw.ellipse((x - hi * 1.7, y - hi * 1.7, x - hi * 0.1, y - hi * 0.1), fill=rgba(COLORS["white"], 0.5))


def draw_flat_architrino(
    draw: ImageDraw.ImageDraw,
    x: float,
    y: float,
    radius: float,
    color: tuple[int, int, int],
) -> None:
    for i in range(3, 0, -1):
        rr = radius * (1 + i * 0.22)
        draw.ellipse((x - rr, y - rr, x + rr, y + rr), fill=rgba(color, 0.022 * i))
    draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=rgba(color, 1.0))
    draw.ellipse(
        (x - radius, y - radius, x + radius, y + radius),
        outline=rgba(COLORS["soft_white"], 0.64),
        width=max(2, int(radius * 0.08)),
    )


def ellipse_point(cx: float, cy: float, rx: float, ry: float, angle: float) -> tuple[float, float]:
    return cx + math.cos(angle) * rx, cy + math.sin(angle) * ry


def rotate_point(x: float, y: float, cx: float, cy: float, rotation: float) -> tuple[float, float]:
    dx = x - cx
    dy = y - cy
    c = math.cos(rotation)
    s = math.sin(rotation)
    return cx + dx * c - dy * s, cy + dx * s + dy * c


def rotated_ellipse_point(cx: float, cy: float, rx: float, ry: float, angle: float, rotation: float) -> tuple[float, float]:
    x, y = ellipse_point(cx, cy, rx, ry, angle)
    return rotate_point(x, y, cx, cy, rotation)


def draw_large_tail_rotated_arc(
    draw: ImageDraw.ImageDraw,
    cx: float,
    cy: float,
    rx: float,
    ry: float,
    rotation: float,
    angle_end: float,
    sweep: float,
    color: tuple[int, int, int],
    core_width: float,
    flare_width: float,
) -> tuple[float, float]:
    return draw_rotated_arc_trail(
        draw,
        cx,
        cy,
        rx,
        ry,
        rotation,
        angle_end,
        sweep,
        color,
        flare_width,
        max(1.0, core_width * 0.22),
        0.94,
        0.0,
        steps=130,
    )


def draw_rotated_arc_trail(
    draw: ImageDraw.ImageDraw,
    cx: float,
    cy: float,
    rx: float,
    ry: float,
    rotation: float,
    angle_end: float,
    sweep: float,
    color: tuple[int, int, int],
    near_width: float,
    far_width: float,
    near_alpha: float = 0.92,
    far_alpha: float = 0.0,
    steps: int = 110,
) -> tuple[float, float]:
    previous = rotated_ellipse_point(cx, cy, rx, ry, angle_end - sweep, rotation)
    for index in range(1, steps + 1):
        t = index / steps
        angle = angle_end - sweep + sweep * t
        current = rotated_ellipse_point(cx, cy, rx, ry, angle, rotation)
        fade = t * t * (3 - 2 * t)
        width = far_width * (1 - fade) + near_width * fade
        alpha = far_alpha * (1 - fade) + near_alpha * fade
        draw.line((previous, current), fill=rgba(color, alpha), width=max(1, int(round(width))))
        previous = current
    return rotated_ellipse_point(cx, cy, rx, ry, angle_end, rotation)


def draw_atomic_tail_backdrop(
    image: Image.Image,
    draw: ImageDraw.ImageDraw,
    cx: float,
    cy: float,
    sp,
    orbit_specs: list[tuple[float, float]],
    *,
    rx: float = 334,
    ry: float = 132,
    orbit_alpha: float = 0.42,
    tail_sweep: float = 62,
    tail_core: float = 8.5,
    tail_flare: float = 36,
    particle_radius: float = 19,
) -> ImageDraw.ImageDraw:
    for rotation_degrees, _ in orbit_specs:
        draw_rotated_orbit(
            image,
            cx,
            cy,
            sp(rx),
            sp(ry),
            rotation_degrees,
            COLORS["tile_purple"],
            int(sp(7)),
            orbit_alpha,
        )
        draw = ImageDraw.Draw(image, "RGBA")
    red_points = []
    blue_points = []
    for rotation_degrees, red_angle_degrees in orbit_specs:
        rotation = math.radians(rotation_degrees)
        red_angle = math.radians(red_angle_degrees)
        blue_angle = red_angle + math.pi
        red_points.append(
            draw_large_tail_rotated_arc(
                draw,
                cx,
                cy,
                sp(rx),
                sp(ry),
                rotation,
                red_angle,
                math.radians(tail_sweep),
                COLORS["standard_red"],
                sp(tail_core),
                sp(tail_flare),
            )
        )
        blue_points.append(
            draw_large_tail_rotated_arc(
                draw,
                cx,
                cy,
                sp(rx),
                sp(ry),
                rotation,
                blue_angle,
                math.radians(tail_sweep),
                COLORS["standard_blue"],
                sp(tail_core),
                sp(tail_flare),
            )
        )
    for point in red_points:
        draw_flat_architrino(draw, *point, sp(particle_radius), COLORS["standard_red"])
    for point in blue_points:
        draw_flat_architrino(draw, *point, sp(particle_radius), COLORS["standard_blue"])
    return draw


def draw_rotated_orbit(
    image: Image.Image,
    cx: float,
    cy: float,
    rx: float,
    ry: float,
    angle: float,
    color: tuple[int, int, int],
    width: int,
    alpha: float = 0.26,
) -> None:
    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay, "RGBA")
    od.ellipse((cx - rx, cy - ry, cx + rx, cy + ry), outline=rgba(color, alpha), width=width)
    overlay = overlay.rotate(angle, center=(cx, cy), resample=Image.Resampling.BICUBIC)
    image.alpha_composite(overlay)


def render_variant(name: str, variant: str, size: int = SOURCE_SIZE) -> Image.Image:
    aa = 2
    s = size * aa
    image = make_canvas(s)
    draw = ImageDraw.Draw(image, "RGBA")
    cx = cy = s / 2
    unit = s / SOURCE_SIZE

    def sp(value: float) -> float:
        return value * unit

    if variant == "binary_atomic_backdrop":
        orbit_specs = [
            (0, math.radians(18)),
            (60, math.radians(138)),
            (120, math.radians(258)),
        ]
        for rotation_degrees, _ in orbit_specs:
            draw_rotated_orbit(image, cx, cy, sp(332), sp(130), rotation_degrees, COLORS["tile_purple"], int(sp(7)), 0.46)
            draw = ImageDraw.Draw(image, "RGBA")
        for rotation_degrees, particle_angle in orbit_specs:
            rotation = math.radians(rotation_degrees)
            opposite_angle = particle_angle + math.pi
            red_point = draw_rotated_arc_trail(
                draw,
                cx,
                cy,
                sp(332),
                sp(130),
                rotation,
                particle_angle,
                math.radians(38),
                COLORS["standard_red"],
                sp(22),
                sp(2.2),
                0.88,
                0.0,
            )
            blue_point = draw_rotated_arc_trail(
                draw,
                cx,
                cy,
                sp(332),
                sp(130),
                rotation,
                opposite_angle,
                math.radians(38),
                COLORS["standard_blue"],
                sp(22),
                sp(2.2),
                0.88,
                0.0,
            )
            draw_tiny_architrino(draw, *red_point, sp(22), COLORS["standard_red"])
            draw_tiny_architrino(draw, *blue_point, sp(22), COLORS["standard_blue"])

    elif variant == "atomic_tail_wide":
        draw = draw_atomic_tail_backdrop(
            image,
            draw,
            cx,
            cy,
            sp,
            [(0, 0), (60, 0), (120, 0)],
            tail_sweep=58,
            tail_core=7.5,
            tail_flare=30,
            particle_radius=16,
            orbit_alpha=0.38,
        )

    elif variant == "atomic_tail_pinwheel":
        draw = draw_atomic_tail_backdrop(
            image,
            draw,
            cx,
            cy,
            sp,
            [(0, 24), (60, 24), (120, 24)],
            tail_sweep=64,
            tail_core=7.5,
            tail_flare=32,
            particle_radius=16,
            orbit_alpha=0.36,
        )

    elif variant == "atomic_tail_outer":
        draw = draw_atomic_tail_backdrop(
            image,
            draw,
            cx,
            cy,
            sp,
            [(0, -24), (60, -24), (120, -24)],
            rx=350,
            ry=130,
            tail_sweep=62,
            tail_core=7,
            tail_flare=32,
            particle_radius=15,
            orbit_alpha=0.36,
        )

    elif variant == "atomic_tail_quiet":
        draw = draw_atomic_tail_backdrop(
            image,
            draw,
            cx,
            cy,
            sp,
            [(0, 12), (60, -12), (120, 12)],
            rx=340,
            ry=128,
            tail_sweep=56,
            tail_core=6.5,
            tail_flare=28,
            particle_radius=15,
            orbit_alpha=0.34,
        )

    else:
        raise ValueError(f"unknown variant: {variant}")

    image = image.resize((size, size), Image.Resampling.LANCZOS)
    return image.convert("RGB")


THREE_ELLIPTICAL_ORBIT_VARIANTS = [
    ("12-binary-atomic-backdrop", "binary_atomic_backdrop"),
    ("25-atomic-tail-wide", "atomic_tail_wide"),
    ("26-atomic-tail-pinwheel", "atomic_tail_pinwheel"),
    ("27-atomic-tail-outer", "atomic_tail_outer"),
    ("28-atomic-tail-quiet", "atomic_tail_quiet"),
]


def main() -> None:
    render_variant_group(THREE_ELLIPTICAL_ORBIT_VARIANTS)


def render_variant_group(variants: list[tuple[str, str]]) -> dict[str, Image.Image]:
    icons: dict[str, Image.Image] = {}
    for name, variant in variants:
        icon = render_variant(name, variant, SOURCE_SIZE)
        home = icon.resize((HOME_SIZE, HOME_SIZE), Image.Resampling.LANCZOS)
        icons[name] = home
        home.save(ROOT / f"architrino-icon-{name}-180.png")
    return icons


if __name__ == "__main__":
    main()
