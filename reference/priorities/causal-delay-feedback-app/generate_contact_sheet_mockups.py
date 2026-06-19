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

POSITRINO = (255, 0, 0, 255)
ELECTRINO = (0, 0, 255, 255)
POSITRINO_WAKE = (255, 150, 166, 255)
ELECTRINO_WAKE = (150, 170, 255, 255)
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
    selected_depth: int = 2
    wake_bands: int = 15
    final_span: float = 28.0
    start_span: float = 4.5
    dot_radius: float = 1.55
    alpha_scale: float = 1.0
    falloff_power: float = 1.0


VARIANTS = [
    Variant(
        key="cross_feedback_baseline_15_fronts",
        title="Baseline - 15 light cross-path fronts",
        mode="partial_propagating_arcs",
    ),
    Variant(
        key="cross_feedback_tight_fronts",
        title="Tight fronts - narrower receiver sector",
        mode="partial_propagating_arcs",
        final_span=20,
        start_span=3.5,
    ),
    Variant(
        key="cross_feedback_wide_fronts",
        title="Wide fronts - broader receiver sector",
        mode="partial_propagating_arcs",
        final_span=42,
        start_span=6,
    ),
    Variant(
        key="cross_feedback_thin_fronts",
        title="Thin fronts - lighter trace weight",
        mode="partial_propagating_arcs",
        dot_radius=1.2,
        alpha_scale=0.78,
    ),
    Variant(
        key="cross_feedback_bright_fronts",
        title="Bright fronts - stronger visibility",
        mode="partial_propagating_arcs",
        dot_radius=1.8,
        alpha_scale=1.18,
    ),
    Variant(
        key="cross_feedback_strong_falloff",
        title="Strong falloff - older wakes fade harder",
        mode="partial_propagating_arcs",
        alpha_scale=0.92,
        falloff_power=1.7,
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
    {"depth": 1, "t": 0.16, "weight": 0.24, "falloff": "0.24", "state": "older"},
    {"depth": 2, "t": 0.38, "weight": 0.48, "falloff": "0.48", "state": "active"},
    {"depth": 3, "t": 0.62, "weight": 0.72, "falloff": "0.72", "state": "active"},
    {"depth": 4, "t": 0.88, "weight": 1.00, "falloff": "1.00", "state": "newer"},
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
    t = max(0.0, min(1.0, t))
    u = 1 - t
    if kind == "positrino":
        p0 = (270, 835)
        p1 = (430, 915)
        p2 = (760, 390)
        p3 = (1358, 238)
    else:
        p0 = (250, 705)
        p1 = (470, 520)
        p2 = (755, 865)
        p3 = (1335, 322)
    x = u**3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t**3 * p3[0]
    y = u**3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t**3 * p3[1]
    return x, y


def sample_path(kind: str, start: float = 0.03, end: float = 0.88, count: int = 160) -> list[tuple[float, float]]:
    return [path_point(kind, start + (end - start) * i / (count - 1)) for i in range(count)]


def draw_background(c: Canvas) -> None:
    c.draw.rectangle((0, 0, WIDTH * SCALE, HEIGHT * SCALE), fill=c.theme["canvas"])

    c.line([(92, 908), (1510, 908)], (255, 255, 255, 112), 1.2)
    c.line([(92, 908), (92, 182)], (255, 255, 255, 84), 1.2)
    c.draw.polygon([c.xy((1510, 908)), c.xy((1496, 900)), c.xy((1496, 916))], fill=(255, 255, 255, 124))
    c.draw.polygon([c.xy((92, 182)), c.xy((84, 196)), c.xy((100, 196))], fill=(255, 255, 255, 70))
    c.text((112, 920), "time", 14, (238, 243, 255, 172), "regular")
    c.text((74, 165), "space", 14, (238, 243, 255, 150), "regular", anchor="lm")


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
            path_points = [(bx + 9, 69), (bx + 16, 58), (bx + 24, 64)]
            c.line(path_points, (255, 255, 255, 182), 1.8)
            for point in path_points:
                c.circle(point, 2.4, (255, 255, 255, 196))
        elif label == "reset":
            c.arc((bx + 16, 64), 9, 35, 315, (255, 255, 255, 182), 2)
            c.draw.polygon([c.xy((bx + 10, 56)), c.xy((bx + 10, 66)), c.xy((bx + 18, 61))], fill=(255, 255, 255, 182))
        else:
            for tooth_index in range(8):
                angle = math.tau * tooth_index / 8
                inner = (bx + 16 + 7.5 * math.cos(angle), 64 + 7.5 * math.sin(angle))
                outer = (bx + 16 + 10.5 * math.cos(angle), 64 + 10.5 * math.sin(angle))
                c.line([inner, outer], (255, 255, 255, 164), 1.6)
            c.ellipse_outline((bx + 16, 64), 6.2, (255, 255, 255, 184), 1.7)
            c.circle((bx + 16, 64), 2.3, (36, 20, 55, 228), (255, 255, 255, 168), 1.1)


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
        c.circle((x + 18 + index * 7, y + 15), 2.2, with_alpha(POSITRINO_WAKE, 215))
        c.circle((x + 18 + index * 7, y + 21), 2.2, with_alpha(ELECTRINO_WAKE, 215))
    c.text((x + 60, y + 16), "dotted wakes", 14, (246, 247, 255, 205), "regular", anchor="lm")

    x += 192
    c.rounded(x, y, 190, 30, 6, (34, 18, 54, 226), (255, 255, 255, 58), 1)
    c.text((x + 15, y + 15), "4 retained path points", 14, (246, 247, 255, 196), "regular", anchor="lm")


def draw_path_trail(c: Canvas, kind: str, color: tuple[int, int, int, int]) -> None:
    points = sample_path(kind)
    halo_color = mix(color, WHITE, 0.45)
    c.line(points, with_alpha(halo_color, 82), 14)
    for i in range(len(points) - 1):
        alpha = round(92 + 138 * (i / (len(points) - 1)))
        width = 3.0 + 3.4 * (i / (len(points) - 1))
        c.line([points[i], points[i + 1]], with_alpha(color, alpha), width)

    for depth in DEPTHS:
        point = path_point(kind, depth["t"])
        c.circle(point, 8.5, (8, 6, 18, 210), with_alpha(WHITE, 172), 1.2)
        c.circle(point, 4.2, color)
        label_offset = (13, -13) if kind == "positrino" else (13, 15)
        c.text(
            (point[0] + label_offset[0], point[1] + label_offset[1]),
            str(depth["depth"]),
            13,
            with_alpha(WHITE, 210),
            "bold",
            anchor="mm",
        )

    now = path_point(kind, 0.88)
    c.circle(now, 20, with_alpha(color, 30))
    c.circle(now, 9, color, WHITE, 1.4)

    label = "positrino" if kind == "positrino" else "electrino"
    offset_y = -28 if kind == "positrino" else 30
    c.text((now[0] + 16, now[1] + offset_y), label, 14, with_alpha(color, 230), "bold", anchor="lm")


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
    count = dot_count or max(16, min(220, round((span / 360) * radius * 1.2)))
    for index in range(count + 1):
        t = index / max(1, count)
        angle = start_deg + (end_deg - start_deg) * t
        point = (
            center[0] + radius * math.cos(math.radians(angle)),
            center[1] + radius * math.sin(math.radians(angle)),
        )
        c.circle(point, dot_radius, color)


def draw_wake_progression(
    c: Canvas,
    source_kind: str,
    target_kind: str,
    color: tuple[int, int, int, int],
    source_depth: dict[str, object],
    target_depth: dict[str, object],
    variant: Variant,
) -> None:
    source = path_point(source_kind, float(source_depth["t"]))
    target = path_point(target_kind, float(target_depth["t"]))
    radius = distance(source, target)
    theta = angle_between(source, target)
    weight = min(float(source_depth["weight"]), float(target_depth["weight"]))
    falloff_weight = weight**variant.falloff_power
    band_count = max(2, variant.wake_bands)

    for index in range(band_count):
        progress = (index + 1) / band_count
        band_radius = radius * progress
        wake_span = variant.start_span + (variant.final_span - variant.start_span) * progress
        alpha = round((30 + 148 * progress) * (0.44 + 0.56 * falloff_weight) * variant.alpha_scale)
        dot_radius = variant.dot_radius * (0.72 + 0.34 * progress) * (0.72 + 0.3 * falloff_weight)
        draw_dotted_arc(
            c,
            source,
            band_radius,
            theta - wake_span * 0.5,
            theta + wake_span * 0.5,
            with_alpha(color, min(235, alpha)),
            max(1.05, dot_radius),
        )


def draw_wakes(c: Canvas) -> None:
    by_depth = {int(depth["depth"]): depth for depth in DEPTHS}
    for index in range(1, 4):
        draw_wake_progression(
            c,
            "positrino",
            "electrino",
            POSITRINO_WAKE,
            by_depth[index],
            by_depth[index + 1],
            c.variant,
        )
        draw_wake_progression(
            c,
            "electrino",
            "positrino",
            ELECTRINO_WAKE,
            by_depth[index],
            by_depth[index + 1],
            c.variant,
        )


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
    c.text((x + 24, y + 34), "Feedback Links", 22, WHITE, "bold", anchor="lm")
    c.text((x + 24, y + 60), "emitter point -> later receiver point", 13, (224, 230, 255, 158), "regular", anchor="lm")

    links = [
        ("red 1 -> blue 2", POSITRINO_WAKE, "older red wake"),
        ("blue 1 -> red 2", ELECTRINO_WAKE, "older blue wake"),
        ("red 2 -> blue 3", POSITRINO_WAKE, "middle red wake"),
        ("blue 2 -> red 3", ELECTRINO_WAKE, "middle blue wake"),
        ("red 3 -> blue 4", POSITRINO_WAKE, "newer red wake"),
        ("blue 3 -> red 4", ELECTRINO_WAKE, "newer blue wake"),
    ]
    row_y = y + 96
    row_h = 72
    for index, (label, color, note) in enumerate(links):
        fill = (18, 12, 30, 230 if index in (2, 3) else 208)
        outline = with_alpha(color, 96 if index in (2, 3) else 54)
        c.rounded(x + 18, row_y, w - 36, row_h, 7, fill, outline, 1)
        c.text((x + 36, row_y + 25), label, 15, with_alpha(color, 235), "bold", anchor="lm")
        c.text((x + 36, row_y + 49), note, 12, (224, 230, 255, 150), "regular", anchor="lm")
        c.line([(x + 202, row_y + 36), (x + 248, row_y + 36)], with_alpha(color, 190), 2.0)
        row_y += row_h + 12

    c.rounded(x + 18, y + h - 106, w - 36, 68, 7, (18, 12, 30, 220), (255, 255, 255, 54), 1)
    c.text((x + 36, y + h - 78), "trace count", 16, WHITE, "bold", anchor="lm")
    c.text((x + 36, y + h - 51), f"{c.variant.wake_bands} fronts per link", 15, (224, 230, 255, 194), "regular", anchor="lm")


def draw_bottom_readout(c: Canvas) -> None:
    c.rounded(64, 940, 980, 80, 8, c.theme["panel"], c.theme["panel_border"], 1)
    chips = [
        ("now", "0.88"),
        ("retained points", "4 per path"),
        ("dataset", "representative mock solver replay"),
        ("layout", "time-space cross feedback"),
    ]
    x = 88
    for label, value in chips:
        c.text((x, 963), label, 13, (224, 230, 255, 142), "regular", anchor="la")
        c.text((x, 990), value, 16, WHITE, "bold", anchor="la")
        x += 218 if label != "dataset" else 330


def draw_scene(c: Canvas) -> None:
    draw_background(c)
    draw_toolbar(c)
    draw_legend(c)
    draw_wakes(c)
    draw_path_trail(c, "positrino", POSITRINO)
    draw_path_trail(c, "electrino", ELECTRINO)
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
        "Time-space cross feedback, official red/blue path colors, and lighter emitter-colored growing wake bands.",
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
        draw.text((x, y + thumb_h + 20), f"{index + 1}. {entry['title']}", fill=WHITE, font=label_font)

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
