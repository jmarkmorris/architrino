#!/usr/bin/env python3
"""Generate deterministic 2D contact-sheet mockups for the causal-delay app."""

from __future__ import annotations

import json
import math
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
OUT_DIR = ROOT / "contact-sheets"
WIDTH = 1920
HEIGHT = 1080
SCALE = 2

POSITRINO = (255, 86, 112, 255)
ELECTRINO = (83, 174, 255, 255)
CYAN = (74, 229, 255, 255)
AMBER = (255, 196, 87, 255)
WHITE = (246, 247, 255, 255)
MUTED = (180, 189, 220, 255)

FONT_PATHS = {
    "regular": [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/HelveticaNeue.ttc",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
    ],
    "bold": [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/HelveticaNeue.ttc",
    ],
}


@dataclass(frozen=True)
class Variant:
    key: str
    title: str
    mode: str
    dense: bool = False
    full_circles: bool = False
    contrast: bool = False
    selected_depth: int = 1


VARIANTS = [
    Variant(
        key="partial_arcs_baseline_solid_purple",
        title="Partial arcs baseline on solid purple",
        mode="partial_propagating_arcs",
        selected_depth=1,
    ),
    Variant(
        key="full_circular_arcs_solid_purple",
        title="Full circular arcs on solid purple",
        mode="full_circular_arcs",
        full_circles=True,
        selected_depth=2,
    ),
    Variant(
        key="depth_1_focus_solid_purple",
        title="Depth 1 focus on solid purple",
        mode="partial_propagating_arcs",
        selected_depth=1,
    ),
    Variant(
        key="depth_2_focus_solid_purple",
        title="Depth 2 focus on solid purple",
        mode="partial_propagating_arcs",
        selected_depth=2,
    ),
    Variant(
        key="dense_history_solid_purple",
        title="Dense history on solid purple",
        mode="partial_propagating_arcs",
        dense=True,
        selected_depth=2,
    ),
    Variant(
        key="contrast_stress_solid_purple",
        title="Contrast stress on solid purple",
        mode="partial_propagating_arcs",
        dense=True,
        contrast=True,
        selected_depth=3,
    ),
]

THEMES = {
    "solid": {
        "canvas": (64, 29, 104, 255),
        "bottom": (64, 29, 104, 255),
        "panel": (6, 6, 12, 220),
        "panel_border": (224, 207, 255, 92),
    },
}

DEPTHS = [
    {"depth": 1, "t": 0.61, "weight": 1.00, "falloff": "1.00", "state": "active"},
    {"depth": 2, "t": 0.44, "weight": 0.58, "falloff": "0.58", "state": "active"},
    {"depth": 3, "t": 0.27, "weight": 0.27, "falloff": "0.27", "state": "near threshold"},
]


def mix(a: tuple[int, int, int, int], b: tuple[int, int, int, int], t: float) -> tuple[int, int, int, int]:
    t = max(0.0, min(1.0, t))
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(4))


def with_alpha(color: tuple[int, int, int, int], alpha: int) -> tuple[int, int, int, int]:
    return color[0], color[1], color[2], max(0, min(255, alpha))


def scaled_color(color: tuple[int, int, int, int], alpha_scale: float) -> tuple[int, int, int, int]:
    return with_alpha(color, round(color[3] * alpha_scale))


def load_font(size: int, weight: str = "regular") -> ImageFont.ImageFont:
    for path in FONT_PATHS[weight]:
        if Path(path).exists():
            try:
                return ImageFont.truetype(path, size * SCALE)
            except OSError:
                continue
    return ImageFont.load_default(size * SCALE)


FONTS = {
    ("regular", size): load_font(size, "regular")
    for size in (12, 13, 14, 15, 16, 18, 20, 22, 24, 28, 32, 38)
}
FONTS.update(
    {
        ("bold", size): load_font(size, "bold")
        for size in (12, 13, 14, 15, 16, 18, 20, 22, 24, 28, 32, 38)
    }
)


class Canvas:
    def __init__(self, variant: Variant):
        self.variant = variant
        self.theme = THEMES["solid"]
        self.image = Image.new("RGBA", (WIDTH * SCALE, HEIGHT * SCALE), (0, 0, 0, 255))
        self.draw = ImageDraw.Draw(self.image, "RGBA")

    def p(self, value: float) -> int:
        return round(value * SCALE)

    def xy(self, point: tuple[float, float]) -> tuple[int, int]:
        return self.p(point[0]), self.p(point[1])

    def box(self, x: float, y: float, w: float, h: float) -> tuple[int, int, int, int]:
        return self.p(x), self.p(y), self.p(x + w), self.p(y + h)

    def circle_box(self, x: float, y: float, radius: float) -> tuple[int, int, int, int]:
        return self.box(x - radius, y - radius, radius * 2, radius * 2)

    def line(
        self,
        points: list[tuple[float, float]],
        color: tuple[int, int, int, int],
        width: float = 1.0,
    ) -> None:
        if len(points) >= 2:
            self.draw.line([self.xy(point) for point in points], fill=color, width=max(1, self.p(width)), joint="curve")

    def rounded(
        self,
        x: float,
        y: float,
        w: float,
        h: float,
        radius: float,
        fill: tuple[int, int, int, int],
        outline: tuple[int, int, int, int] | None = None,
        width: float = 1.0,
    ) -> None:
        self.draw.rounded_rectangle(
            self.box(x, y, w, h),
            radius=self.p(radius),
            fill=fill,
            outline=outline,
            width=max(1, self.p(width)) if outline else 1,
        )

    def text(
        self,
        point: tuple[float, float],
        text: str,
        size: int,
        color: tuple[int, int, int, int] = WHITE,
        weight: str = "regular",
        anchor: str = "la",
    ) -> None:
        self.draw.text(self.xy(point), text, fill=color, font=FONTS[(weight, size)], anchor=anchor)

    def circle(
        self,
        point: tuple[float, float],
        radius: float,
        fill: tuple[int, int, int, int],
        outline: tuple[int, int, int, int] | None = None,
        width: float = 1.0,
    ) -> None:
        self.draw.ellipse(
            self.circle_box(point[0], point[1], radius),
            fill=fill,
            outline=outline,
            width=max(1, self.p(width)) if outline else 1,
        )

    def ellipse_outline(
        self,
        point: tuple[float, float],
        radius: float,
        color: tuple[int, int, int, int],
        width: float,
    ) -> None:
        self.draw.ellipse(self.circle_box(point[0], point[1], radius), outline=color, width=max(1, self.p(width)))

    def arc(
        self,
        center: tuple[float, float],
        radius: float,
        start_deg: float,
        end_deg: float,
        color: tuple[int, int, int, int],
        width: float,
    ) -> None:
        self.draw.arc(
            self.circle_box(center[0], center[1], radius),
            start=start_deg,
            end=end_deg,
            fill=color,
            width=max(1, self.p(width)),
        )

    def save(self, path: Path) -> None:
        output = self.image.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
        flattened = Image.new("RGBA", output.size, self.theme["bottom"])
        flattened.alpha_composite(output)
        flattened.convert("RGB").save(path)


def path_point(kind: str, t: float) -> tuple[float, float]:
    turn = max(0.0, min(1.0, (t - 0.54) / 0.32))
    turn = turn * turn * (3 - 2 * turn)
    x = 210 + 960 * t + 165 * turn
    if kind == "positrino":
        return (
            x,
            330 + 72 * math.sin(1.9 * math.pi * t + 0.4) + 125 * turn,
        )
    return (
        x,
        675 - 76 * math.sin(1.7 * math.pi * t + 0.35) - 120 * turn,
    )


def sample_path(kind: str, start: float = 0.03, end: float = 0.86, count: int = 90) -> list[tuple[float, float]]:
    return [path_point(kind, start + (end - start) * i / (count - 1)) for i in range(count)]


def draw_background(c: Canvas) -> None:
    c.draw.rectangle((0, 0, WIDTH * SCALE, HEIGHT * SCALE), fill=c.theme["canvas"])

    c.line([(92, 908), (1510, 908)], (255, 255, 255, 82), 1.2)
    c.line([(92, 908), (92, 182)], (255, 255, 255, 58), 1.2)
    c.draw.polygon([c.xy((1510, 908)), c.xy((1496, 900)), c.xy((1496, 916))], fill=(255, 255, 255, 92))
    c.draw.polygon([c.xy((92, 182)), c.xy((84, 196)), c.xy((100, 196))], fill=(255, 255, 255, 70))
    c.text((112, 920), "absolute time", 14, (238, 243, 255, 142), "regular")
    c.text((74, 165), "causal distance", 14, (238, 243, 255, 126), "regular", anchor="lm")


def draw_toolbar(c: Canvas) -> None:
    c.rounded(54, 32, 1036, 64, 8, c.theme["panel"], c.theme["panel_border"], 1)
    c.text((78, 63), "Causal Delay Feedback", 28, WHITE, "bold", anchor="lm")
    c.text((395, 63), "representative mock solver replay", 15, (220, 224, 245, 176), "regular", anchor="lm")
    c.rounded(642, 47, 232, 32, 6, (35, 18, 55, 228), (255, 255, 255, 74), 1)
    c.text((658, 63), c.variant.mode, 14, (242, 244, 255, 214), "regular", anchor="lm")

    x = 900
    buttons = [("play", 0), ("paths", 1), ("reset", 2), ("gear", 3)]
    for label, index in buttons:
        bx = x + index * 42
        c.rounded(bx, 47, 32, 32, 6, (36, 20, 55, 228), (255, 255, 255, 72), 1)
        if label == "play":
            c.draw.polygon([c.xy((bx + 12, 55)), c.xy((bx + 12, 73)), c.xy((bx + 23, 64))], fill=(255, 255, 255, 196))
        elif label == "paths":
            c.arc((bx + 16, 64), 9, 205, 350, (255, 255, 255, 182), 2)
            c.circle((bx + 23, 60), 2.2, (255, 255, 255, 182))
        elif label == "reset":
            c.arc((bx + 16, 64), 9, 35, 320, (255, 255, 255, 182), 2)
            c.draw.polygon([c.xy((bx + 10, 55)), c.xy((bx + 9, 65)), c.xy((bx + 18, 60))], fill=(255, 255, 255, 182))
        else:
            c.ellipse_outline((bx + 16, 64), 8, (255, 255, 255, 176), 1.8)
            c.circle((bx + 16, 64), 2.4, (255, 255, 255, 176))

    c.rounded(1130, 32, 348, 64, 8, c.theme["panel"], c.theme["panel_border"], 1)
    c.text((1152, 55), c.variant.title, 18, WHITE, "bold", anchor="lm")
    c.text((1152, 78), "1920x1080 proof tile", 13, (220, 224, 245, 164), "regular", anchor="lm")


def draw_legend(c: Canvas) -> None:
    x = 64
    y = 122
    c.rounded(x, y, 194, 30, 6, (34, 18, 54, 226), (255, 255, 255, 64), 1)
    c.line([(x + 16, y + 15), (x + 44, y + 15)], with_alpha(POSITRINO, 215), 2.6)
    c.line([(x + 16, y + 21), (x + 44, y + 21)], with_alpha(ELECTRINO, 215), 2.6)
    c.text((x + 56, y + 16), "solid path history", 14, (246, 247, 255, 205), "regular", anchor="lm")

    x += 208
    c.rounded(x, y, 178, 30, 6, (34, 18, 54, 226), (255, 255, 255, 64), 1)
    for index in range(5):
        c.circle((x + 18 + index * 7, y + 15), 2.2, with_alpha(POSITRINO, 215))
        c.circle((x + 18 + index * 7, y + 21), 2.2, with_alpha(ELECTRINO, 215))
    c.text((x + 60, y + 16), "dotted wakes", 14, (246, 247, 255, 205), "regular", anchor="lm")

    x += 192
    c.rounded(x, y, 190, 30, 6, (34, 18, 54, 226), (255, 255, 255, 58), 1)
    c.text((x + 15, y + 15), "3 retained wake hits", 14, (246, 247, 255, 196), "regular", anchor="lm")


def draw_path_trail(c: Canvas, kind: str, color: tuple[int, int, int, int]) -> None:
    points = sample_path(kind)
    c.line(points, with_alpha(color, 70), 12)
    for i in range(len(points) - 1):
        alpha = round(92 + 138 * (i / (len(points) - 1)))
        width = 3.0 + 3.4 * (i / (len(points) - 1))
        c.line([points[i], points[i + 1]], with_alpha(color, alpha), width)

    for depth in DEPTHS:
        point = path_point(kind, depth["t"])
        c.circle(point, 8.5, (8, 6, 18, 210), with_alpha(WHITE, 172), 1.2)
        c.circle(point, 4.2, color)

    now = path_point(kind, 0.86)
    c.circle(now, 20, with_alpha(color, 30))
    c.circle(now, 9, color, WHITE, 1.4)

    label = "positrino" if kind == "positrino" else "electrino"
    offset_y = -28 if kind == "positrino" else 30
    c.text((now[0] + 16, now[1] + offset_y), label, 14, with_alpha(color, 230), "bold", anchor="lm")


def draw_virtual_observer(c: Canvas, point: tuple[float, float]) -> None:
    c.circle(point, 34, (255, 255, 255, 18), (255, 255, 255, 96), 1.2)
    c.circle(point, 16, (255, 255, 255, 30), CYAN, 2.2)
    c.line([(point[0] - 48, point[1]), (point[0] - 23, point[1])], with_alpha(CYAN, 150), 1.4)
    c.line([(point[0] + 23, point[1]), (point[0] + 48, point[1])], with_alpha(CYAN, 150), 1.4)
    c.line([(point[0], point[1] - 48), (point[0], point[1] - 23)], with_alpha(CYAN, 150), 1.4)
    c.line([(point[0], point[1] + 23), (point[0], point[1] + 48)], with_alpha(CYAN, 150), 1.4)
    c.circle(point, 4.5, WHITE)
    c.text((point[0] + 26, point[1] - 38), "Virtual Observer", 16, WHITE, "bold", anchor="lm")
    c.text((point[0] + 26, point[1] - 17), "now t=0.86", 13, (225, 232, 255, 170), "regular", anchor="lm")


def angle_between(center: tuple[float, float], point: tuple[float, float]) -> float:
    return math.degrees(math.atan2(point[1] - center[1], point[0] - center[0]))


def distance(a: tuple[float, float], b: tuple[float, float]) -> float:
    return math.hypot(a[0] - b[0], a[1] - b[1])


def arc_points(
    center: tuple[float, float],
    radius: float,
    start_deg: float,
    end_deg: float,
    count: int,
) -> list[tuple[float, float]]:
    return [
        (
            center[0] + radius * math.cos(math.radians(start_deg + (end_deg - start_deg) * i / (count - 1))),
            center[1] + radius * math.sin(math.radians(start_deg + (end_deg - start_deg) * i / (count - 1))),
        )
        for i in range(count)
    ]


def draw_dashed_arc(
    c: Canvas,
    center: tuple[float, float],
    radius: float,
    start_deg: float,
    end_deg: float,
    color: tuple[int, int, int, int],
    width: float,
    dashes: int = 18,
) -> None:
    points = arc_points(center, radius, start_deg, end_deg, dashes * 2 + 1)
    for i in range(0, len(points) - 1, 2):
        c.line([points[i], points[i + 1]], color, width)


def draw_dotted_arc(
    c: Canvas,
    center: tuple[float, float],
    radius: float,
    start_deg: float,
    end_deg: float,
    color: tuple[int, int, int, int],
    dot_radius: float,
    dot_count: int | None = None,
) -> None:
    span = abs(end_deg - start_deg)
    count = dot_count or max(12, min(150, round((span / 360) * radius * 0.72)))
    for index in range(count + 1):
        t = index / max(1, count)
        angle = start_deg + (end_deg - start_deg) * t
        point = (
            center[0] + radius * math.cos(math.radians(angle)),
            center[1] + radius * math.sin(math.radians(angle)),
        )
        c.circle(point, dot_radius, color)


def draw_wake_for_emitter(
    c: Canvas,
    kind: str,
    color: tuple[int, int, int, int],
    observer: tuple[float, float],
    depth: dict[str, object],
    variant: Variant,
) -> None:
    source = path_point(kind, float(depth["t"]))
    radius = distance(source, observer)
    theta = angle_between(source, observer)
    depth_index = int(depth["depth"])
    weight = float(depth["weight"])
    span = 50 - depth_index * 8
    width = 6.4 * weight + 1.1
    alpha = round(210 * weight)

    if variant.full_circles:
        draw_dotted_arc(c, source, radius, 0, 360, with_alpha(color, 34), 1.2, 132)
        draw_dotted_arc(
            c,
            source,
            radius,
            theta - span * 0.5,
            theta + span * 0.5,
            with_alpha(color, min(235, alpha + 35)),
            max(2.0, width * 0.43),
        )
    else:
        draw_dotted_arc(
            c,
            source,
            radius,
            theta - span * 0.58,
            theta + span * 0.58,
            with_alpha(color, alpha),
            max(1.8, width * 0.43),
        )

    if variant.dense:
        offset = 34 if kind == "positrino" else -34
        draw_dashed_arc(
            c,
            (source[0] - 32, source[1] + offset),
            radius * 0.92,
            theta - span * 0.9,
            theta + span * 0.25,
            with_alpha(color, round(60 * weight)),
            max(1.0, width * 0.35),
        )

    pulse_angle = theta - span * 0.16 if kind == "positrino" else theta + span * 0.16
    pulse = (
        source[0] + radius * math.cos(math.radians(pulse_angle)),
        source[1] + radius * math.sin(math.radians(pulse_angle)),
    )
    c.circle(pulse, 9.5 * weight + 2, with_alpha(color, min(245, alpha + 40)), WHITE if depth_index == variant.selected_depth else None, 1.2)


def draw_wakes(c: Canvas, observer: tuple[float, float]) -> None:
    for depth in DEPTHS:
        draw_wake_for_emitter(c, "positrino", POSITRINO, observer, depth, c.variant)
        draw_wake_for_emitter(c, "electrino", ELECTRINO, observer, depth, c.variant)

    if c.variant.contrast:
        warning_source = path_point("electrino", 0.18)
        radius = distance(warning_source, observer) * 0.88
        theta = angle_between(warning_source, observer)
        draw_dashed_arc(c, warning_source, radius, theta - 26, theta + 28, AMBER, 2.3, 14)
        c.text((warning_source[0] - 4, warning_source[1] + 44), "rejected root", 13, AMBER, "bold", anchor="mm")


def draw_stack_bar(c: Canvas, x: float, y: float, width: float, color: tuple[int, int, int, int], value: float) -> None:
    value = max(0.0, min(1.0, value))
    c.rounded(x, y, width, 8, 4, (42, 34, 64, 232), None)
    c.rounded(x, y, width * value, 8, 4, with_alpha(color, 190), None)


def draw_contribution_stack(c: Canvas) -> None:
    x = 1580
    y = 142
    w = 300
    h = 782
    c.rounded(x, y, w, h, 8, c.theme["panel"], c.theme["panel_border"], 1)
    c.text((x + 24, y + 34), "Virtual Observer Stack", 22, WHITE, "bold", anchor="lm")
    c.text((x + 24, y + 60), "right-edge contribution readout", 13, (224, 230, 255, 158), "regular", anchor="lm")

    row_y = y + 94
    for depth in DEPTHS:
        depth_index = int(depth["depth"])
        active = depth_index == c.variant.selected_depth
        row_h = 144
        fill = (18, 12, 30, 238 if active else 216)
        outline = with_alpha(CYAN if active else WHITE, 132 if active else 44)
        c.rounded(x + 18, row_y, w - 36, row_h, 7, fill, outline, 1)
        c.text((x + 36, row_y + 27), f"depth {depth_index}", 18, WHITE, "bold", anchor="lm")
        state = str(depth["state"])
        state_color = CYAN if state == "active" else AMBER
        if c.variant.contrast and depth_index == 3:
            state = "below threshold"
            state_color = AMBER
        c.text((x + 190, row_y + 27), state, 13, state_color, "bold", anchor="lm")

        weight = float(depth["weight"])
        draw_stack_bar(c, x + 36, row_y + 62, 104, POSITRINO, weight)
        draw_stack_bar(c, x + 36, row_y + 86, 104, ELECTRINO, max(0.12, weight * 0.74))
        c.text((x + 154, row_y + 65), f"+{weight:.2f}", 14, with_alpha(POSITRINO, 220), "regular", anchor="lm")
        c.text((x + 154, row_y + 89), f"-{weight * 0.74:.2f}", 14, with_alpha(ELECTRINO, 220), "regular", anchor="lm")
        c.text((x + 36, row_y + 119), f"falloff 1/r = {depth['falloff']}", 13, (224, 230, 255, 164), "regular", anchor="lm")
        row_y += row_h + 16

    c.rounded(x + 18, y + h - 126, w - 36, 88, 7, (18, 12, 30, 220), (255, 255, 255, 54), 1)
    c.text((x + 36, y + h - 94), "sum readout", 16, WHITE, "bold", anchor="lm")
    c.text((x + 36, y + h - 64), "+0.42 active / +0.05 weak", 15, (224, 230, 255, 194), "regular", anchor="lm")
    c.line([(x + 36, y + h - 42), (x + w - 36, y + h - 42)], with_alpha(AMBER, 130), 1.2)
    c.text((x + w - 38, y + h - 47), "assembly threshold", 12, with_alpha(AMBER, 190), "regular", anchor="rs")


def draw_bottom_readout(c: Canvas) -> None:
    c.rounded(64, 940, 980, 80, 8, c.theme["panel"], c.theme["panel_border"], 1)
    chips = [
        ("now", "0.86"),
        ("retained hits", "3 wake hits"),
        ("dataset", "representative mock solver replay"),
        ("layout", "right-edge stack"),
    ]
    x = 88
    for label, value in chips:
        c.text((x, 963), label, 13, (224, 230, 255, 142), "regular", anchor="la")
        c.text((x, 990), value, 16, WHITE, "bold", anchor="la")
        x += 218 if label != "dataset" else 330


def draw_scene(c: Canvas) -> None:
    observer = (1360, 566)
    draw_background(c)
    draw_toolbar(c)
    draw_legend(c)
    draw_path_trail(c, "positrino", POSITRINO)
    draw_path_trail(c, "electrino", ELECTRINO)
    draw_wakes(c, observer)
    draw_virtual_observer(c, observer)
    draw_contribution_stack(c)
    draw_bottom_readout(c)


def generate_tiles() -> list[dict[str, str]]:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest = []
    for variant in VARIANTS:
        canvas = Canvas(variant)
        draw_scene(canvas)
        path = OUT_DIR / f"{variant.key}.png"
        canvas.save(path)
        manifest.append(
            {
                "variant": variant.key,
                "title": variant.title,
                "path": str(path.relative_to(ROOT)),
                "size": f"{WIDTH}x{HEIGHT}",
                "datasetSource": "representative_mock_solver_replay",
            }
        )
    return manifest


def generate_review_sheet(manifest: list[dict[str, str]]) -> None:
    sheet_w = 3840
    sheet_h = 2160
    thumb_w = 1180
    thumb_h = 664
    gap_x = 70
    gap_y = 126
    left = 80
    top = 248

    sheet = Image.new("RGBA", (sheet_w, sheet_h), (20, 10, 32, 255))
    draw = ImageDraw.Draw(sheet, "RGBA")
    for y in range(sheet_h):
        t = y / max(1, sheet_h - 1)
        draw.line([(0, y), (sheet_w, y)], fill=mix((45, 17, 75, 255), (8, 5, 18, 255), t))

    title_font = load_font(30, "bold")
    body_font = load_font(13, "regular")
    label_font = load_font(12, "bold")
    draw.text((82, 72), "Causal Delay Feedback - Six Mock Contact Sheet Proofs", fill=WHITE, font=title_font)
    draw.text(
        (86, 148),
        "All tiles are 1920x1080 representative mock solver replay frames with the right-edge contribution stack.",
        fill=(224, 230, 255, 188),
        font=body_font,
    )

    for index, entry in enumerate(manifest):
        col = index % 3
        row = index // 3
        x = left + col * (thumb_w + gap_x)
        y = top + row * (thumb_h + gap_y)
        tile = Image.open(ROOT / entry["path"]).convert("RGBA")
        tile = tile.resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
        draw.rounded_rectangle(
            (x - 4, y - 4, x + thumb_w + 4, y + thumb_h + 4),
            radius=14,
            fill=(255, 255, 255, 34),
            outline=(255, 255, 255, 86),
            width=2,
        )
        sheet.alpha_composite(tile, (x, y))
        draw.text((x, y + thumb_h + 20), f"{index + 1}. {entry['variant']}", fill=WHITE, font=label_font)

    sheet.convert("RGB").save(OUT_DIR / "contact-sheet-six-variants.png")


def main() -> int:
    manifest = generate_tiles()
    generate_review_sheet(manifest)
    (OUT_DIR / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    for entry in manifest:
        print(f"wrote {entry['path']}")
    print("wrote contact-sheets/contact-sheet-six-variants.png")
    print("wrote contact-sheets/manifest.json")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
