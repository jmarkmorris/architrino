"""Scale model and conservative stationary controls for the EOM baseline."""

from __future__ import annotations

import math
from dataclasses import dataclass
from typing import Any, Iterable

import numpy as np


AUTHORITY = "reference-benchmark-only"
POPULATION_LADDER = (10_000, 100_000, 1_000_000)
HOT_SEGMENT_BYTES = 320
DENSE_PAIR_ROW_BYTES = 64


@dataclass(frozen=True)
class BlockCounts:
    visited_nodes: int
    excluded_pairs: int
    exact_fallback_pairs: int
    active_root_pairs: int

    @property
    def logical_pairs(self) -> int:
        return self.excluded_pairs + self.exact_fallback_pairs

    @property
    def exclusion_ratio(self) -> float:
        return self.excluded_pairs / self.logical_pairs


def logical_ordered_pairs(population: int) -> int:
    if population < 1:
        raise ValueError("population must be positive")
    return population * population


def stationary_block_counts(
    positions: Iterable[float],
    *,
    leaf_size: int = 8,
    field_speed: float = 1.0,
    maximum_delay: float = 1.0,
) -> BlockCounts:
    """Conservative dual-tree exclusion for one stationary 1-D control.

    The lower distance and causal reach are rounded outward with ``nextafter``.
    This is a deliberately narrow certified prototype: it is valid only for
    the stationary control represented here and is not the general EOM block
    exclusion engine.
    """

    values = tuple(float(value) for value in positions)
    if not values or any(not math.isfinite(value) for value in values):
        raise ValueError("positions must be finite and nonempty")
    if any(values[index] > values[index + 1] for index in range(len(values) - 1)):
        raise ValueError("positions must be sorted")
    if leaf_size < 1 or field_speed <= 0.0 or maximum_delay <= 0.0:
        raise ValueError("leaf size, field speed, and maximum delay must be positive")

    stack = [(0, len(values), 0, len(values))]
    visited = excluded = exact = active = 0
    reach_upper = math.nextafter(field_speed * maximum_delay, math.inf)
    while stack:
        receiver_begin, receiver_end, source_begin, source_end = stack.pop()
        visited += 1
        receiver_count = receiver_end - receiver_begin
        source_count = source_end - source_begin
        receiver_min = values[receiver_begin]
        receiver_max = values[receiver_end - 1]
        source_min = values[source_begin]
        source_max = values[source_end - 1]
        lower_distance = 0.0
        if receiver_max < source_min:
            lower_distance = math.nextafter(source_min - receiver_max, -math.inf)
        elif source_max < receiver_min:
            lower_distance = math.nextafter(receiver_min - source_max, -math.inf)
        if lower_distance > reach_upper:
            excluded += receiver_count * source_count
            continue
        if receiver_count <= leaf_size and source_count <= leaf_size:
            exact += receiver_count * source_count
            for receiver in range(receiver_begin, receiver_end):
                for source in range(source_begin, source_end):
                    distance = abs(values[receiver] - values[source])
                    if 0.0 < distance <= field_speed * maximum_delay:
                        active += 1
            continue
        if receiver_count >= source_count and receiver_count > leaf_size:
            middle = receiver_begin + receiver_count // 2
            stack.append((middle, receiver_end, source_begin, source_end))
            stack.append((receiver_begin, middle, source_begin, source_end))
        else:
            middle = source_begin + source_count // 2
            stack.append((receiver_begin, receiver_end, middle, source_end))
            stack.append((receiver_begin, receiver_end, source_begin, middle))
    return BlockCounts(visited, excluded, exact, active)


def exhaustive_stationary_active_pairs(
    positions: Iterable[float],
    *,
    causal_reach: float = 1.0,
) -> int:
    values = np.asarray(tuple(positions), dtype=np.float64)
    distances = np.abs(values[:, None] - values[None, :])
    return int(np.count_nonzero((distances > 0.0) & (distances <= causal_reach)))


def dense_resource_projection(
    population: int,
    *,
    measured_bulk_rows_per_second: float,
    memory_budget_bytes: int,
    wall_budget_seconds: float,
    pair_row_bytes: int = DENSE_PAIR_ROW_BYTES,
) -> dict[str, Any]:
    pairs = logical_ordered_pairs(population)
    dense_bytes = pairs * pair_row_bytes
    optimistic_seconds = pairs / measured_bulk_rows_per_second
    reasons: list[str] = []
    if dense_bytes > memory_budget_bytes:
        reasons.append("dense_pair_rows_exceed_memory_budget")
    if optimistic_seconds > wall_budget_seconds:
        reasons.append("optimistic_bulk_bound_time_exceeds_wall_budget")
    return {
        "population": population,
        "logical_ordered_pairs": pairs,
        "minimum_dense_pair_row_bytes": dense_bytes,
        "optimistic_bulk_bound_seconds": optimistic_seconds,
        "decision": "resource_envelope_exceeded" if reasons else "within_projection_only",
        "reasons": reasons,
        "projection_limit": (
            "The time is an optimistic lower bound from a bulk classification kernel; "
            "it excludes retained-history search, root refinement, precision escalation, "
            "force evaluation, reduction, integration, and output."
        ),
    }
