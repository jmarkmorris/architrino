#!/usr/bin/env python3
"""Independent fold-separated interval oracle for the orthogonal-plane weave.

The frozen JavaScript subject and its circular-binary helper are intentionally
not imported.  This oracle works from four scalar phase-zero causal equations,
enumerates their root sheets by analytic trigonometric lobes, and uses mpmath
directed interval arithmetic to exclude simultaneous transverse zeros.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable

import mpmath as mp


REPO_ROOT = Path(__file__).resolve().parents[3]
DEFAULT_PROTOCOL = (
    REPO_ROOT
    / "src/prescribed-path-analysis/protocols/"
    "orthogonal-plane-weave-fold-separated-interval-protocol.v1.json"
)
RECEIPT_SCHEMA = (
    "braid-program/orthogonal-plane-weave-fold-separated-interval-receipt.v1"
)
KINDS = ("self", "partner", "plus", "minus")


def sine(value: Any) -> Any:
    return mp.iv.sin(value) if hasattr(value, "_mpi_") else mp.sin(value)


def cosine(value: Any) -> Any:
    return mp.iv.cos(value) if hasattr(value, "_mpi_") else mp.cos(value)


def sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


def canonical_json_bytes(value: Any) -> bytes:
    return json.dumps(
        value, ensure_ascii=False, separators=(",", ":"), sort_keys=True
    ).encode("utf-8")


def token(value: mp.mpf, digits: int = 40) -> str:
    if value == 0:
        return "0"
    return mp.nstr(
        value,
        n=digits,
        strip_zeros=False,
        min_fixed=-20,
        max_fixed=20,
    )


def c_value(kind: str, x: Any) -> Any:
    if kind == "self":
        return 2 - 2 * cosine(x)
    if kind == "partner":
        return 2 + 2 * cosine(x)
    if kind == "plus":
        return 2 + 2 * sine(x)
    if kind == "minus":
        return 2 - 2 * sine(x)
    raise ValueError(f"unknown root kind {kind}")


def cp_value(kind: str, x: Any) -> Any:
    if kind == "self":
        return 2 * sine(x)
    if kind == "partner":
        return -2 * sine(x)
    if kind == "plus":
        return 2 * cosine(x)
    if kind == "minus":
        return -2 * cosine(x)
    raise ValueError(f"unknown root kind {kind}")


def cpp_value(kind: str, x: Any) -> Any:
    if kind == "self":
        return 2 * cosine(x)
    if kind == "partner":
        return -2 * cosine(x)
    if kind == "plus":
        return -2 * sine(x)
    if kind == "minus":
        return 2 * sine(x)
    raise ValueError(f"unknown root kind {kind}")


def h_value(kind: str, beta: Any, x: Any) -> Any:
    return c_value(kind, x) - (x / beta) ** 2


def hx_value(kind: str, beta: Any, x: Any) -> Any:
    return cp_value(kind, x) - 2 * x / (beta**2)


def fold_value(kind: str, x: Any) -> Any:
    return x * cp_value(kind, x) - 2 * c_value(kind, x)


def fold_derivative(kind: str, x: Any) -> Any:
    return x * cpp_value(kind, x) - cp_value(kind, x)


def beta_curve(kind: str, x: mp.mpf) -> mp.mpf:
    c = c_value(kind, x)
    if c <= 0:
        return mp.inf
    return x / mp.sqrt(c)


def zero_boundaries(kind: str, maximum_x: mp.mpf) -> list[mp.mpf]:
    boundaries = [mp.mpf("0")]
    if kind == "self":
        origin = 2 * mp.pi
        period = 2 * mp.pi
    elif kind == "partner":
        origin = mp.pi
        period = 2 * mp.pi
    elif kind == "plus":
        origin = 3 * mp.pi / 2
        period = 2 * mp.pi
    elif kind == "minus":
        origin = mp.pi / 2
        period = 2 * mp.pi
    else:
        raise ValueError(kind)
    value = origin
    while value < maximum_x:
        boundaries.append(value)
        value += period
    boundaries.append(maximum_x)
    return boundaries


def bisect_sign_change(
    function: Callable[[mp.mpf], mp.mpf],
    lower: mp.mpf,
    upper: mp.mpf,
    steps: int,
) -> tuple[mp.mpf, mp.mpf]:
    lower_value = function(lower)
    upper_value = function(upper)
    if lower_value == 0:
        return lower, lower
    if upper_value == 0:
        return upper, upper
    if mp.sign(lower_value) == mp.sign(upper_value):
        raise ValueError("bisection requires opposite endpoint signs")
    for _ in range(steps):
        middle = (lower + upper) / 2
        middle_value = function(middle)
        if middle_value == 0:
            return lower, upper
        if mp.sign(middle_value) == mp.sign(lower_value):
            lower = middle
            lower_value = middle_value
        else:
            upper = middle
            upper_value = middle_value
    return lower, upper


@dataclass(frozen=True)
class Lobe:
    kind: str
    index: int
    lower: mp.mpf
    upper: mp.mpf
    fold_x_lower: mp.mpf | None
    fold_x_upper: mp.mpf | None
    fold_beta_lower: mp.mpf | None
    fold_beta_upper: mp.mpf | None

    @property
    def has_interior_fold(self) -> bool:
        return self.fold_x_lower is not None


@dataclass(frozen=True)
class RootSheet:
    kind: str
    lobe_index: int
    side: str
    x_lower: mp.mpf
    x_upper: mp.mpf


def find_lobes(kind: str, maximum_x: mp.mpf, steps: int) -> list[Lobe]:
    boundaries = zero_boundaries(kind, maximum_x)
    lobes: list[Lobe] = []
    epsilon = mp.mpf("1e-30")
    for index, (lower, upper) in enumerate(zip(boundaries, boundaries[1:])):
        if upper - lower <= epsilon:
            continue
        if index == 0:
            lobes.append(Lobe(kind, index, lower, upper, None, None, None, None))
            continue
        left = lower + epsilon
        right = upper - epsilon
        if right <= left:
            continue
        function = lambda value: fold_value(kind, value)
        sample_count = 512
        prior_x = left
        prior_value = function(prior_x)
        bracket = None
        for sample in range(1, sample_count + 1):
            current_x = left + (right - left) * sample / sample_count
            current_value = function(current_x)
            if mp.sign(prior_value) != mp.sign(current_value):
                bracket = (prior_x, current_x)
                break
            prior_x = current_x
            prior_value = current_value
        if bracket is None:
            # A terminal lobe truncated by x=24 can be monotone on the retained
            # domain.  It contributes no in-domain fold and is treated as a
            # one-sided lobe below.
            lobes.append(Lobe(kind, index, lower, upper, None, None, None, None))
            continue
        fold_lower, fold_upper = bisect_sign_change(
            function, bracket[0], bracket[1], steps
        )
        fold_interval = mp.iv.mpf([str(fold_lower), str(fold_upper)])
        beta_interval = fold_interval / mp.iv.sqrt(
            c_value(kind, fold_interval)
        )
        beta_lower, beta_upper = iv_bounds(beta_interval)
        lobes.append(
            Lobe(
                kind,
                index,
                lower,
                upper,
                fold_lower,
                fold_upper,
                beta_lower,
                beta_upper,
            )
        )
    return lobes


def root_on_branch(
    kind: str,
    beta: mp.mpf,
    lower: mp.mpf,
    upper: mp.mpf,
    steps: int,
) -> mp.mpf:
    epsilon = mp.mpf("1e-40")
    left = max(lower + epsilon, epsilon)
    right = upper - epsilon
    function = lambda value: beta_curve(kind, value) - beta
    left_value = function(left)
    right_value = function(right)
    if left_value == 0:
        return left
    if right_value == 0:
        return right
    if mp.sign(left_value) == mp.sign(right_value):
        raise ValueError(
            f"root branch failed to bracket {kind} beta={token(beta)} "
            f"on [{token(lower)},{token(upper)}]"
        )
    for _ in range(steps):
        middle = (left + right) / 2
        middle_value = function(middle)
        if middle_value == 0 or middle == left or middle == right:
            left = middle
            right = middle
            break
        if mp.sign(middle_value) == mp.sign(left_value):
            left = middle
            left_value = middle_value
        else:
            right = middle
            right_value = middle_value
    return (left + right) / 2


def sheets_at_beta(
    beta: mp.mpf,
    lobes_by_kind: dict[str, list[Lobe]],
    steps: int,
) -> list[RootSheet]:
    sheets: list[RootSheet] = []
    for kind in KINDS:
        for lobe in lobes_by_kind[kind]:
            if lobe.index == 0:
                threshold = mp.mpf("1") if kind == "self" else mp.mpf("0")
                if beta <= threshold:
                    continue
                root = root_on_branch(
                    kind, beta, lobe.lower, lobe.upper, steps
                )
                sheets.append(
                    RootSheet(kind, lobe.index, "right", root, root)
                )
                continue
            if not lobe.has_interior_fold:
                # A truncated monotone lobe can contain at most one root.  The
                # endpoint signs decide it directly.
                epsilon = mp.mpf("1e-28")
                left = lobe.lower + epsilon
                right = lobe.upper - epsilon
                values = [
                    beta_curve(kind, left) - beta,
                    beta_curve(kind, right) - beta,
                ]
                if mp.sign(values[0]) != mp.sign(values[1]):
                    root = root_on_branch(kind, beta, left, right, steps)
                    sheets.append(
                        RootSheet(kind, lobe.index, "terminal", root, root)
                    )
                continue
            assert lobe.fold_x_lower is not None
            assert lobe.fold_x_upper is not None
            assert lobe.fold_beta_lower is not None
            if beta <= lobe.fold_beta_lower:
                continue
            fold_midpoint = (lobe.fold_x_lower + lobe.fold_x_upper) / 2
            left_root = root_on_branch(
                kind, beta, lobe.lower, fold_midpoint, steps
            )
            right_root = root_on_branch(
                kind, beta, fold_midpoint, lobe.upper, steps
            )
            sheets.extend(
                [
                    RootSheet(kind, lobe.index, "left", left_root, left_root),
                    RootSheet(kind, lobe.index, "right", right_root, right_root),
                ]
            )
    return sheets


def sheet_lookup(
    sheets: list[RootSheet], kind: str, lobe_index: int, side: str
) -> RootSheet:
    matches = [
        sheet
        for sheet in sheets
        if (sheet.kind, sheet.lobe_index, sheet.side)
        == (kind, lobe_index, side)
    ]
    if len(matches) != 1:
        raise ValueError(
            f"expected one sheet {(kind, lobe_index, side)}, got {len(matches)}"
        )
    return matches[0]


def sheet_tubes(
    beta_lower: mp.mpf,
    beta_upper: mp.mpf,
    lobes_by_kind: dict[str, list[Lobe]],
    steps: int,
    sheets_cache: dict[str, list[RootSheet]],
    inflation: mp.mpf,
) -> list[RootSheet]:
    midpoint = (beta_lower + beta_upper) / 2
    def cached(value: mp.mpf) -> list[RootSheet]:
        key = token(value, 90)
        if key not in sheets_cache:
            sheets_cache[key] = sheets_at_beta(value, lobes_by_kind, steps)
        return sheets_cache[key]

    midpoint_sheets = cached(midpoint)
    lower_sheets = cached(beta_lower)
    upper_sheets = cached(beta_upper)
    if len(midpoint_sheets) != len(lower_sheets) or len(midpoint_sheets) != len(upper_sheets):
        raise ValueError("beta cell crosses a root-topology boundary")
    tubes: list[RootSheet] = []
    for sheet in midpoint_sheets:
        lower_sheet = sheet_lookup(
            lower_sheets, sheet.kind, sheet.lobe_index, sheet.side
        )
        upper_sheet = sheet_lookup(
            upper_sheets, sheet.kind, sheet.lobe_index, sheet.side
        )
        values = [
            lower_sheet.x_lower,
            upper_sheet.x_lower,
            sheet.x_lower,
        ]
        tubes.append(
            RootSheet(
                sheet.kind,
                sheet.lobe_index,
                sheet.side,
                min(values) - inflation,
                max(values) + inflation,
            )
        )
    return tubes


def iv_bounds(value: Any) -> tuple[mp.mpf, mp.mpf]:
    lower_raw, upper_raw = value._mpi_
    return mp.mpf(lower_raw), mp.mpf(upper_raw)


def iv_contains_zero(value: Any) -> bool:
    lower, upper = iv_bounds(value)
    return lower <= 0 <= upper


def interval_hx_point(kind: str, beta: mp.mpf, x: mp.mpf) -> Any:
    beta_point = mp.iv.mpf([str(beta), str(beta)])
    x_point = mp.iv.mpf([str(x), str(x)])
    return cp_value(kind, x_point) - 2 * x_point / (beta_point**2)


def interval_hx_rectangle(
    kind: str,
    beta_lower: mp.mpf,
    beta_upper: mp.mpf,
    x_lower: mp.mpf,
    x_upper: mp.mpf,
) -> Any:
    """Bound H_x without duplicating x across cancelling interval terms.

    H_x is strictly increasing in beta for x>0.  Its x derivative is
    C''(x)-2/beta^2.  When that derivative has one sign on the rectangle,
    directed point evaluations at the corresponding corners give its exact
    rectangular extrema up to outward rounding.
    """
    beta_interval = mp.iv.mpf([str(beta_lower), str(beta_upper)])
    x_interval = mp.iv.mpf([str(x_lower), str(x_upper)])
    derivative_x = cpp_value(kind, x_interval) - 2 / (beta_interval**2)
    derivative_lower, derivative_upper = iv_bounds(derivative_x)
    if derivative_upper < 0:
        lower_corner = interval_hx_point(kind, beta_lower, x_upper)
        upper_corner = interval_hx_point(kind, beta_upper, x_lower)
    elif derivative_lower > 0:
        lower_corner = interval_hx_point(kind, beta_lower, x_lower)
        upper_corner = interval_hx_point(kind, beta_upper, x_upper)
    else:
        # A derivative turning point need not be a root fold.  The direct
        # natural interval extension remains rigorous and is usually sharp on
        # the already-subdivided tube; accept it only when it separates zero.
        generic = cp_value(kind, x_interval) - 2 * x_interval / (beta_interval**2)
        if not iv_contains_zero(generic):
            return generic
        raise ValueError(f"H_x x-monotonicity unresolved for {kind}")
    lower = iv_bounds(lower_corner)[0]
    upper = iv_bounds(upper_corner)[1]
    return mp.iv.mpf([str(lower), str(upper)])


def iv_record(value: Any, digits: int = 32) -> dict[str, str]:
    lower, upper = iv_bounds(value)
    return {"lower": token(lower, digits), "upper": token(upper, digits)}


def interval_transverse_components(
    beta_lower: mp.mpf,
    beta_upper: mp.mpf,
    tubes: list[RootSheet],
) -> tuple[Any, Any, mp.mpf, mp.mpf]:
    beta_interval = mp.iv.mpf([str(beta_lower), str(beta_upper)])
    tangent = -mp.iv.cos(mp.iv.sqrt(2) * beta_interval) / mp.iv.sqrt(2)
    normal = mp.iv.sin(mp.iv.sqrt(2) * beta_interval) / mp.iv.sqrt(2)
    minimum_abs_hx = mp.inf
    minimum_abs_dt = mp.mpf("1")
    for sheet in tubes:
        x_interval = mp.iv.mpf([str(sheet.x_lower), str(sheet.x_upper)])
        hx = interval_hx_rectangle(
            sheet.kind,
            beta_lower,
            beta_upper,
            sheet.x_lower,
            sheet.x_upper,
        )
        hx_lower, hx_upper = iv_bounds(hx)
        if hx_lower <= 0 <= hx_upper:
            raise ValueError(
                f"root tube reaches a fold for {sheet.kind} lobe {sheet.lobe_index}"
            )
        h_left = h_value(
            sheet.kind,
            beta_interval,
            mp.iv.mpf([str(sheet.x_lower), str(sheet.x_lower)]),
        )
        h_right = h_value(
            sheet.kind,
            beta_interval,
            mp.iv.mpf([str(sheet.x_upper), str(sheet.x_upper)]),
        )
        left_lower, left_upper = iv_bounds(h_left)
        right_lower, right_upper = iv_bounds(h_right)
        opposite_boundary_signs = (
            left_upper < 0 < right_lower or right_upper < 0 < left_lower
        )
        if not opposite_boundary_signs:
            raise ValueError(
                f"root tube lacks uniform boundary signs for {sheet.kind} "
                f"lobe {sheet.lobe_index}"
            )
        minimum_abs_hx = min(minimum_abs_hx, abs(hx_lower), abs(hx_upper))
        dt = (beta_interval**2) * abs(hx) / (2 * x_interval)
        dt_lower, _ = iv_bounds(dt)
        minimum_abs_dt = min(minimum_abs_dt, dt_lower)
        denominator = (x_interval**2) * abs(hx)
        if sheet.kind in ("self", "partner"):
            tangent += (
                2 * beta_interval * mp.iv.sin(x_interval) / denominator
            )
        else:
            normal += (
                -2 * beta_interval * mp.iv.cos(x_interval) / denominator
            )
    return tangent, normal, minimum_abs_hx, minimum_abs_dt


def point_transverse_components(
    beta: mp.mpf,
    lobes_by_kind: dict[str, list[Lobe]],
    steps: int,
) -> dict[str, Any]:
    sheets = sheets_at_beta(beta, lobes_by_kind, steps)
    tangent = -mp.cos(mp.sqrt(2) * beta) / mp.sqrt(2)
    normal = mp.sin(mp.sqrt(2) * beta) / mp.sqrt(2)
    roots = []
    for sheet in sheets:
        x = sheet.x_lower
        hx = hx_value(sheet.kind, beta, x)
        if sheet.kind in ("self", "partner"):
            contribution = 2 * beta * mp.sin(x) / (x**2 * abs(hx))
            tangent += contribution
            component = "tangent"
        else:
            contribution = -2 * beta * mp.cos(x) / (x**2 * abs(hx))
            normal += contribution
            component = "planeNormal"
        roots.append(
            {
                "kind": sheet.kind,
                "lobeIndex": sheet.lobe_index,
                "side": sheet.side,
                "x": token(x, 50),
                "delay": token(x / beta, 50),
                "H": token(h_value(sheet.kind, beta, x), 30),
                "H_x": token(hx, 40),
                "D_t": token(-(beta**2) * hx / (2 * x), 40),
                "component": component,
                "contribution": token(contribution, 40),
            }
        )
    return {
        "beta": token(beta, 40),
        "tangent": token(tangent, 40),
        "planeNormal": token(normal, 40),
        "transverseNorm": token(mp.hypot(tangent, normal), 40),
        "rootCount": len(roots) + 2,
        "variableRootCount": len(roots),
        "fixedCrossRootCount": 2,
        "roots": roots,
    }


def merge_fold_boxes(
    folds: list[dict[str, Any]],
    domain_lower: mp.mpf,
    domain_upper: mp.mpf,
    half_width: mp.mpf,
) -> list[dict[str, Any]]:
    raw = []
    for fold in folds:
        center = fold["betaMidpointMpf"]
        raw.append(
            {
                "lowerMpf": max(domain_lower, center - half_width),
                "upperMpf": min(domain_upper, center + half_width),
                "folds": [fold],
            }
        )
    raw.sort(key=lambda row: row["lowerMpf"])
    merged: list[dict[str, Any]] = []
    for row in raw:
        if merged and row["lowerMpf"] <= merged[-1]["upperMpf"]:
            merged[-1]["upperMpf"] = max(
                merged[-1]["upperMpf"], row["upperMpf"]
            )
            merged[-1]["folds"].extend(row["folds"])
        else:
            merged.append(row)
    return merged


def build_fold_inventory(
    lobes_by_kind: dict[str, list[Lobe]],
    domain_lower: mp.mpf,
    domain_upper: mp.mpf,
) -> list[dict[str, Any]]:
    folds: list[dict[str, Any]] = [
        {
            "kind": "self",
            "lobeIndex": 0,
            "type": "coincident-self-root boundary fold",
            "xLower": "0",
            "xUpper": "0",
            "betaLower": "1",
            "betaUpper": "1",
            "betaMidpointMpf": mp.mpf("1"),
            "foldResidual": "0",
        }
    ]
    for kind in KINDS:
        for lobe in lobes_by_kind[kind]:
            if not lobe.has_interior_fold:
                continue
            assert lobe.fold_x_lower is not None
            assert lobe.fold_x_upper is not None
            assert lobe.fold_beta_lower is not None
            assert lobe.fold_beta_upper is not None
            beta_midpoint = (lobe.fold_beta_lower + lobe.fold_beta_upper) / 2
            if not (domain_lower <= beta_midpoint <= domain_upper):
                continue
            x_midpoint = (lobe.fold_x_lower + lobe.fold_x_upper) / 2
            folds.append(
                {
                    "kind": kind,
                    "lobeIndex": lobe.index,
                    "type": "ordinary-root fold",
                    "xLower": token(lobe.fold_x_lower, 90),
                    "xUpper": token(lobe.fold_x_upper, 90),
                    "betaLower": token(lobe.fold_beta_lower, 90),
                    "betaUpper": token(lobe.fold_beta_upper, 90),
                    "betaMidpointMpf": beta_midpoint,
                    "foldResidual": token(fold_value(kind, x_midpoint), 30),
                    "foldDerivative": token(fold_derivative(kind, x_midpoint), 40),
                }
            )
    folds.sort(key=lambda row: row["betaMidpointMpf"])
    return folds


def validate_protocol(packet: dict[str, Any], protocol_path: Path) -> None:
    expected_schema = (
        "prescribed-path-analysis/"
        "orthogonal-plane-weave-fold-separated-interval-protocol.v1"
    )
    if packet.get("schema") != expected_schema:
        raise ValueError("unsupported interval protocol schema")
    domain = packet["domain"]
    if domain["fieldSpeed"] != "1" or domain["beta"] != ["0.25", "12"]:
        raise ValueError("protocol must retain c_f=1 and beta_f in [0.25,12]")
    if domain["witnessReceptionPhase"] != "0":
        raise ValueError("v1 oracle requires the phase-zero witness")
    frozen = packet["frozenSubject"]
    for path_key, hash_key in (
        ("path", "sha256"),
        ("evidencePath", "evidenceSha256"),
    ):
        source_path = REPO_ROOT / frozen[path_key]
        if sha256_bytes(source_path.read_bytes()) != frozen[hash_key]:
            raise ValueError(f"frozen subject binding changed: {source_path}")
    if protocol_path != DEFAULT_PROTOCOL.resolve():
        raise ValueError("v1 oracle accepts only the canonical protocol path")


def build_receipt(
    protocol_path: Path,
    protocol_bytes: bytes,
    packet: dict[str, Any],
) -> dict[str, Any]:
    validate_protocol(packet, protocol_path)
    numerics = packet["numerics"]
    digits = int(numerics["decimalDigits"])
    steps = int(numerics["bisectionSteps"])
    mp.mp.dps = digits + 30
    mp.iv.dps = digits
    domain_lower = mp.mpf(packet["domain"]["beta"][0])
    domain_upper = mp.mpf(packet["domain"]["beta"][1])
    maximum_x = mp.mpf(packet["domain"]["dimensionlessEmissionAngle"][1])
    half_width = mp.mpf(numerics["foldBoxHalfWidth"])
    initial_width = mp.mpf(numerics["initialBetaCellWidth"])
    minimum_width = mp.mpf(numerics["minimumBetaCellWidth"])
    interval_inflation = mp.mpf(numerics["intervalInflation"])
    maximum_cells = int(numerics["maximumBetaCells"])

    lobes_by_kind = {
        kind: find_lobes(kind, maximum_x, steps) for kind in KINDS
    }
    folds = build_fold_inventory(lobes_by_kind, domain_lower, domain_upper)
    fold_boxes = merge_fold_boxes(
        folds, domain_lower, domain_upper, half_width
    )

    ordinary_charts = []
    cursor = domain_lower
    for box in fold_boxes:
        if cursor < box["lowerMpf"]:
            ordinary_charts.append((cursor, box["lowerMpf"]))
        cursor = max(cursor, box["upperMpf"])
    if cursor < domain_upper:
        ordinary_charts.append((cursor, domain_upper))

    stack: list[tuple[mp.mpf, mp.mpf, int]] = []
    for chart_lower, chart_upper in ordinary_charts:
        cell_lower = chart_lower
        while cell_lower < chart_upper:
            cell_upper = min(chart_upper, cell_lower + initial_width)
            stack.append((cell_lower, cell_upper, 0))
            cell_lower = cell_upper
    stack.reverse()

    certified_cells: list[dict[str, Any]] = []
    candidate_cells: list[dict[str, Any]] = []
    split_count = 0
    minimum_root_factor = mp.inf
    minimum_dt_factor = mp.mpf("1")
    maximum_tube_root_residual = mp.mpf("0")
    sheets_cache: dict[str, list[RootSheet]] = {}
    processed_cells = 0
    failure_reasons: dict[str, int] = {}
    while stack:
        processed_cells += 1
        if processed_cells % 1000 == 0:
            print(
                f"interval progress processed={processed_cells} "
                f"certified={len(certified_cells)} pending={len(stack)} "
                f"candidates={len(candidate_cells)} failures={failure_reasons}",
                file=sys.stderr,
                flush=True,
            )
        if len(certified_cells) + len(candidate_cells) + len(stack) > maximum_cells:
            raise RuntimeError("maximum beta-cell budget exceeded")
        beta_lower, beta_upper, depth = stack.pop()
        try:
            tubes = sheet_tubes(
                beta_lower,
                beta_upper,
                lobes_by_kind,
                steps,
                sheets_cache,
                interval_inflation,
            )
            (
                tangent,
                normal,
                minimum_abs_hx,
                minimum_abs_dt,
            ) = interval_transverse_components(beta_lower, beta_upper, tubes)
            minimum_root_factor = min(minimum_root_factor, minimum_abs_hx)
            minimum_dt_factor = min(minimum_dt_factor, minimum_abs_dt)
            for sheet in tubes:
                beta_interval = mp.iv.mpf([str(beta_lower), str(beta_upper)])
                x_interval = mp.iv.mpf([str(sheet.x_lower), str(sheet.x_upper)])
                residual = h_value(sheet.kind, beta_interval, x_interval)
                residual_lower, residual_upper = iv_bounds(residual)
                maximum_tube_root_residual = max(
                    maximum_tube_root_residual,
                    abs(residual_lower),
                    abs(residual_upper),
                )
        except ValueError as error:
            message = str(error)
            if message.startswith("root branch failed to bracket"):
                reason = "root-branch-bracket"
            elif message.startswith("root tube"):
                reason = "root-tube-separation"
            else:
                reason = message.split(" for ")[0]
            failure_reasons[reason] = failure_reasons.get(reason, 0) + 1
            if beta_upper - beta_lower <= minimum_width:
                candidate_cells.append(
                    {
                        "beta": [token(beta_lower), token(beta_upper)],
                        "reason": "ordinary root tube did not separate from a fold",
                        "depth": depth,
                    }
                )
                continue
            midpoint = (beta_lower + beta_upper) / 2
            stack.extend(
                [
                    (midpoint, beta_upper, depth + 1),
                    (beta_lower, midpoint, depth + 1),
                ]
            )
            split_count += 1
            continue

        tangent_excludes = not iv_contains_zero(tangent)
        normal_excludes = not iv_contains_zero(normal)
        if tangent_excludes or normal_excludes:
            certified_cells.append(
                {
                    "beta": [token(beta_lower), token(beta_upper)],
                    "witness": "tangent" if tangent_excludes else "planeNormal",
                    "tangent": iv_record(tangent),
                    "planeNormal": iv_record(normal),
                    "rootTubeCount": len(tubes) + 2,
                    "variableRootTubeCount": len(tubes),
                    "minimumAbsoluteH_x": token(minimum_abs_hx, 32),
                    "minimumAbsoluteD_t": token(minimum_abs_dt, 32),
                    "depth": depth,
                }
            )
            continue
        if beta_upper - beta_lower <= minimum_width:
            candidate_cells.append(
                {
                    "beta": [token(beta_lower), token(beta_upper)],
                    "reason": "both transverse interval witnesses contain zero",
                    "tangent": iv_record(tangent),
                    "planeNormal": iv_record(normal),
                    "rootTubeCount": len(tubes) + 2,
                    "depth": depth,
                }
            )
            continue
        midpoint = (beta_lower + beta_upper) / 2
        stack.extend(
            [
                (midpoint, beta_upper, depth + 1),
                (beta_lower, midpoint, depth + 1),
            ]
        )
        split_count += 1

    certified_cells.sort(key=lambda row: mp.mpf(row["beta"][0]))
    candidate_cells.sort(key=lambda row: mp.mpf(row["beta"][0]))
    fold_records = []
    for box in fold_boxes:
        fold_records.append(
            {
                "beta": [token(box["lowerMpf"]), token(box["upperMpf"])],
                "width": token(box["upperMpf"] - box["lowerMpf"]),
                "disposition": "unresolved-nonordinary-fold-box",
                "folds": [
                    {
                        key: value
                        for key, value in fold.items()
                        if key != "betaMidpointMpf"
                    }
                    for fold in box["folds"]
                ],
            }
        )

    point_betas = [
        mp.mpf("0.25"),
        mp.mpf("0.933"),
        mp.mpf("1.5"),
        mp.mpf("3.070356625390253"),
        mp.mpf("5.36"),
        mp.mpf("6.53"),
        mp.mpf("7.972"),
        mp.mpf("9.842"),
        mp.mpf("9.85"),
        mp.mpf("12"),
    ]
    point_controls = [
        point_transverse_components(beta, lobes_by_kind, steps)
        for beta in point_betas
        if all(
            not (box["lowerMpf"] <= beta <= box["upperMpf"])
            for box in fold_boxes
        )
    ]
    maximum_point_root_residual = max(
        (
            abs(mp.mpf(root["H"]))
            for control in point_controls
            for root in control["roots"]
        ),
        default=mp.mpf("0"),
    )
    terminal_boundary = {}
    boundary_beta = mp.iv.mpf([str(domain_upper), str(domain_upper)])
    boundary_x = mp.iv.mpf([str(maximum_x), str(maximum_x)])
    for kind in KINDS:
        value = h_value(kind, boundary_beta, boundary_x)
        if iv_bounds(value)[1] >= 0:
            raise RuntimeError(f"terminal x boundary is not root-free for {kind}")
        terminal_boundary[kind] = iv_record(value)

    if candidate_cells:
        disposition = "certified candidate or unresolved ordinary boxes remain"
    elif fold_records:
        disposition = "ordinary domain excluded with explicit unresolved fold boxes"
    else:
        disposition = "bounded no-balance theorem"

    covered_ordinary_width = mp.fsum(
        mp.mpf(row["beta"][1]) - mp.mpf(row["beta"][0])
        for row in certified_cells
    )
    candidate_width = mp.fsum(
        mp.mpf(row["beta"][1]) - mp.mpf(row["beta"][0])
        for row in candidate_cells
    )
    fold_width = mp.fsum(
        box["upperMpf"] - box["lowerMpf"] for box in fold_boxes
    )
    domain_width = domain_upper - domain_lower

    return {
        "schema": RECEIPT_SCHEMA,
        "date": "2026-08-29",
        "authority": "independent fold-separated interval diagnostic",
        "disposition": disposition,
        "logicalCertificate": {
            "necessaryCondition": (
                "Complete-phase balance requires tangent=planeNormal=0 "
                "for receiver a1+ at phi=0."
            ),
            "ordinaryDomainConclusion": (
                "Every certified ordinary beta cell excludes zero from at "
                "least one directed-rounding transverse interval."
            ),
            "foldConclusion": (
                "D_t=0 boxes are nonordinary under the canonical simple-root "
                "acceleration and remain explicit rather than fabricated."
            ),
        },
        "domain": packet["domain"],
        "modelScope": packet["claimBoundary"],
        "provenance": {
            "protocolPath": protocol_path.relative_to(REPO_ROOT).as_posix(),
            "protocolSha256": sha256_bytes(protocol_bytes),
            "protocolSpecificationSha256": sha256_bytes(
                canonical_json_bytes(packet)
            ),
            "oraclePath": Path(__file__).relative_to(REPO_ROOT).as_posix(),
            "oracleSha256": sha256_bytes(Path(__file__).read_bytes()),
            "frozenSubject": packet["frozenSubject"],
            "mpmathVersion": mp.__version__,
            "decimalDigits": digits,
            "reproductionCommand": (
                'VIRTUAL_ENV="${AAA_VENV:-../.venv}" '
                '"${AAA_VENV:-../.venv}/bin/python" '
                "scripts/prescribed-path-analysis/oracle/"
                "orthogonal_plane_weave_interval_oracle.py --write-receipt "
                "reference/priorities/braid-program/evidence/"
                "2026-08-29-orthogonal-plane-weave-fold-separated-interval.v1.json"
            ),
        },
        "analyticalReduction": packet["analyticalReduction"],
        "foldInventory": {
            "count": len(fold_records),
            "boxes": fold_records,
        },
        "ordinaryCertificate": {
            "ordinaryChartCount": len(ordinary_charts),
            "certifiedCellCount": len(certified_cells),
            "candidateOrUnresolvedOrdinaryCellCount": len(candidate_cells),
            "splitCount": split_count,
            "certifiedCells": certified_cells,
            "candidateOrUnresolvedOrdinaryCells": candidate_cells,
        },
        "coverageAccounting": {
            "domainWidth": token(domain_width),
            "certifiedOrdinaryWidth": token(covered_ordinary_width),
            "foldBoxWidth": token(fold_width),
            "candidateOrUnresolvedOrdinaryWidth": token(candidate_width),
            "accountedWidth": token(
                covered_ordinary_width + fold_width + candidate_width
            ),
            "accountingResidual": token(
                domain_width
                - covered_ordinary_width
                - fold_width
                - candidate_width,
                30,
            ),
        },
        "rootCertification": {
            "method": (
                "Complete trigonometric lobes with one monotone first branch "
                "and two branches around each isolated interior fold; root "
                "tubes are endpoint hulls on fold-free beta cells."
            ),
            "maximumAbsoluteTubeEquationRange": token(
                maximum_tube_root_residual, 32
            ),
            "maximumPointControlAbsoluteRootResidual": token(
                maximum_point_root_residual, 32
            ),
            "minimumAbsoluteH_x": token(minimum_root_factor, 32),
            "minimumAbsoluteD_t": token(minimum_dt_factor, 32),
            "coincidentSelfRoot": "excluded analytically at x=0",
            "fixedCrossRoots": "two roots at delay=sqrt(2), each with D_t=1",
            "terminalXBoundaryAtBeta12": terminal_boundary,
        },
        "pointControls": point_controls,
        "claimGrades": {
            "phaseZeroReduction": "derived",
            "foldAndRootSheetInventory": "interval-certified analytical reduction",
            "ordinaryCellExclusion": "measured by directed interval arithmetic",
            "completeBoundedLocus": (
                "unresolved at declared fold boxes unless foldInventory.count=0"
            ),
        },
        "falsifiers": packet["falsifiers"],
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--protocol", type=Path, default=DEFAULT_PROTOCOL)
    parser.add_argument("--write-receipt", type=Path)
    args = parser.parse_args()
    protocol_path = args.protocol.resolve()
    protocol_bytes = protocol_path.read_bytes()
    packet = json.loads(protocol_bytes)
    receipt = build_receipt(protocol_path, protocol_bytes, packet)
    rendered = json.dumps(receipt, ensure_ascii=False, indent=2) + "\n"
    if args.write_receipt:
        args.write_receipt.write_text(rendered, encoding="utf-8")
    else:
        print(rendered, end="")


if __name__ == "__main__":
    main()
