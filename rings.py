#!/usr/bin/env python3
"""Compute best ring splits x / y / z for N=1..50.

x = outer ring node count
y = inner ring node count
z = center node count (0 or 1)

The search mirrors the current placement rules used by SceneGraphRuntime.
"""

from __future__ import annotations

from dataclasses import dataclass
import math


HALO_SCALE = 1.18
GUARD_BAND_MIN = 0.15
GUARD_BAND_RATIO = 0.08
MAX_NODE_RADIUS = 1.0

MIN_OUTER_RADIUS = 0.0
PHASE_SAMPLES = 720
RADIUS_TIE_EPS = 1e-6


@dataclass(frozen=True)
class Candidate:
    outer_count: int
    inner_count: int
    has_center: bool
    outer_radius: float
    extent: float

    @property
    def center_count(self) -> int:
        return 1 if self.has_center else 0


def layout_metrics(max_node_radius: float = MAX_NODE_RADIUS) -> tuple[float, float]:
    halo_diameter = max_node_radius * HALO_SCALE * 2.0
    guard_band = max(GUARD_BAND_MIN, halo_diameter * GUARD_BAND_RATIO)
    required_chord = halo_diameter + guard_band
    return max_node_radius, required_chord


def ring_self_radius(count: int, required_chord: float) -> float:
    if count <= 1:
        return 0.0
    return required_chord / (2.0 * math.sin(math.pi / count))


def min_outer_inner_distance(
    outer_count: int,
    outer_radius: float,
    inner_count: int,
    inner_radius: float,
    phase_offset: float,
) -> float:
    # For two uniform angular lattices, pairwise angle differences lie on a
    # grid with spacing 2*pi/lcm(outer_count, inner_count). So for a given
    # phase, nearest-pair distance depends only on the nearest grid point.
    lattice_size = math.lcm(outer_count, inner_count)
    phase_fraction = (phase_offset / math.tau) % 1.0
    t = phase_fraction * lattice_size
    nearest_index = math.floor(t + 0.5)
    frac_steps = abs(t - nearest_index)
    min_delta = math.tau * (frac_steps / lattice_size)
    return math.sqrt(
        outer_radius * outer_radius
        + inner_radius * inner_radius
        - 2.0 * outer_radius * inner_radius * math.cos(min_delta)
    )


def solve_two_ring_outer_radius(
    outer_count: int,
    inner_count: int,
    inner_radius: float,
    required_chord: float,
) -> float | None:
    def feasible_at_radius(outer_radius: float) -> bool:
        for sample in range(PHASE_SAMPLES):
            phase = (sample / PHASE_SAMPLES) * math.tau
            distance = min_outer_inner_distance(
                outer_count,
                outer_radius,
                inner_count,
                inner_radius,
                phase,
            )
            if distance >= required_chord:
                return True
        return False

    low = max(
        MIN_OUTER_RADIUS,
        ring_self_radius(outer_count, required_chord),
        inner_radius + 0.01,
    )
    high = max(low + required_chord, low * 1.4)

    if feasible_at_radius(low):
        return low

    expansion_steps = 0
    while not feasible_at_radius(high) and expansion_steps < 20:
        high *= 1.35
        expansion_steps += 1

    if not feasible_at_radius(high):
        return None

    for _ in range(24):
        mid = (low + high) / 2.0
        if feasible_at_radius(mid):
            high = mid
        else:
            low = mid
    return high


def evaluate_candidate(
    outer_count: int,
    inner_count: int,
    has_center: bool,
    max_node_radius: float,
    required_chord: float,
) -> Candidate | None:
    if inner_count == 0:
        outer_radius = max(MIN_OUTER_RADIUS, ring_self_radius(outer_count, required_chord))
        return Candidate(
            outer_count=outer_count,
            inner_count=inner_count,
            has_center=has_center,
            outer_radius=outer_radius,
            extent=outer_radius + max_node_radius,
        )

    inner_radius = max(required_chord, ring_self_radius(inner_count, required_chord))
    outer_radius = solve_two_ring_outer_radius(
        outer_count=outer_count,
        inner_count=inner_count,
        inner_radius=inner_radius,
        required_chord=required_chord,
    )
    if outer_radius is None:
        return None
    return Candidate(
        outer_count=outer_count,
        inner_count=inner_count,
        has_center=has_center,
        outer_radius=outer_radius,
        extent=outer_radius + max_node_radius,
    )


def candidate_sort_key(candidate: Candidate) -> tuple[float, int, float, int, int]:
    # Matches current runtime tie-breaking:
    # 1) smaller extent
    # 2) center preferred
    # 3) more balanced outer/inner split
    # 4) larger outer count
    # 5) smaller inner count
    balance = (
        abs(candidate.outer_count - candidate.inner_count)
        if candidate.inner_count > 0
        else float("inf")
    )
    return (
        candidate.extent,
        0 if candidate.has_center else 1,
        balance,
        -candidate.outer_count,
        candidate.inner_count,
    )


def solve_for_n(n: int) -> Candidate:
    max_node_radius, required_chord = layout_metrics()

    if n <= 0:
        return Candidate(0, 0, False, 0.0, 0.0)

    raw_candidates: list[tuple[int, int, bool]] = []

    # Single ring (no center) is always allowed.
    raw_candidates.append((n, 0, False))

    center_modes = (False, True) if n > 6 else (False,)
    for has_center in center_modes:
        remaining = n - (1 if has_center else 0)
        if remaining < 2:
            continue

        if has_center:
            raw_candidates.append((remaining, 0, True))

        max_inner = remaining // 2
        for inner_count in range(1, max_inner + 1):
            outer_count = remaining - inner_count
            if outer_count < inner_count:
                continue
            raw_candidates.append((outer_count, inner_count, has_center))

    scored: list[Candidate] = []
    for outer_count, inner_count, has_center in raw_candidates:
        candidate = evaluate_candidate(
            outer_count=outer_count,
            inner_count=inner_count,
            has_center=has_center,
            max_node_radius=max_node_radius,
            required_chord=required_chord,
        )
        if candidate is not None:
            scored.append(candidate)

    # Runtime fallback when no candidates are possible: single ring.
    if not scored:
        return evaluate_candidate(
            outer_count=n,
            inner_count=0,
            has_center=False,
            max_node_radius=max_node_radius,
            required_chord=required_chord,
        )

    scored.sort(key=candidate_sort_key)
    best = scored[0]

    # Preference override requested by user:
    # If 6 < y < 12, try m/6/{0,1} where m = N - 6 - z.
    # If any such option yields the same radius (same extent), use it.
    if 6 < best.inner_count < 12:
      preferred_candidates: list[Candidate] = []
      for z in (0, 1):
          outer_count = n - 6 - z
          if outer_count < 6:
              continue
          candidate = evaluate_candidate(
              outer_count=outer_count,
              inner_count=6,
              has_center=(z == 1),
              max_node_radius=max_node_radius,
              required_chord=required_chord,
          )
          if candidate is None:
              continue
          if math.isclose(candidate.extent, best.extent, abs_tol=RADIUS_TIE_EPS):
              preferred_candidates.append(candidate)
      if preferred_candidates:
          preferred_candidates.sort(key=candidate_sort_key)
          return preferred_candidates[0]

    return best


def main() -> None:
    print("N | x | y | z | radius")
    for n in range(1, 51):
        best = solve_for_n(n)
        # Relative max node radius after fit, assuming frame radius = 1.
        rel_radius = 1.0 / best.extent if best.extent > 0 else 0.0
        print(
            f"{n} | {best.outer_count} | {best.inner_count} | {best.center_count} | {rel_radius:.6f}"
        )


if __name__ == "__main__":
    main()
