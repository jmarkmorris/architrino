#!/usr/bin/env python3
"""Clean-room T1 reductions over certified EOM-oracle acceleration rows."""

from __future__ import annotations

import argparse
import json
import sys
import time
from dataclasses import dataclass
from decimal import ROUND_CEILING, Decimal, localcontext
from pathlib import Path
from typing import Iterable

import mpmath as mp

from scripts.eom.oracle.certified_acceleration import (
    PairAccelerationRequest,
    certify_pair_acceleration,
)
from scripts.eom.oracle.certified_history import (
    CubicHistorySegment,
    PiecewisePolynomialHistory,
    certify_causal_roots,
)
from scripts.eom.oracle.decimal_interval import (
    DecimalInterval,
    IntervalVector,
    interval_dot,
    interval_vector,
)


ROOT = Path(__file__).resolve().parents[2]
DEFAULT_FIXTURE = (
    ROOT
    / "reference/priorities/app-solver/evidence/t1-fixture-data-2026-07-15.json"
)
PRECISION = 90
ROOT_TOLERANCE = "1e-10"
ACCELERATION_TOLERANCE = "1e-4"
SOURCE_NORMAL_FLOOR = "1e-6"


@dataclass(frozen=True)
class CircularPath:
    path_id: str
    radius: Decimal
    angular_rate: Decimal
    phase: Decimal
    charge: int


def _tier_one(packet: dict[str, object]) -> dict[str, object]:
    for tier in packet["tiers"]:  # type: ignore[index]
        if tier["tier"] == 1:  # type: ignore[index]
            return tier  # type: ignore[return-value]
    raise ValueError("fixture packet has no Tier 1 configuration")


def load_tier_one(path: Path = DEFAULT_FIXTURE) -> dict[str, object]:
    """Load configuration only; pre-filled verdict fields are never consulted."""

    return _tier_one(json.loads(path.read_text(encoding="utf-8")))


def charge_ledgers(tier: dict[str, object]) -> dict[str, object]:
    fixtures = tier["fixtures"]  # type: ignore[index]
    ledgers = fixtures["charge_ledgers"]  # type: ignore[index]

    three = ledgers["three_neutral_binary_rings"]  # type: ignore[index]
    three_net = sum(site["charge_units"] for site in three["site_list"])

    screened = ledgers["section_99_screened_pair"]  # type: ignore[index]
    screened_rows: list[dict[str, object]] = []
    for occupancy in screened["allowed_recorded_occupancies"]:
        for orientations in screened["allowed_recorded_ring_orientation_patterns"]:
            pro: list[int] = []
            for count, orientation in zip(occupancy, orientations):
                pro.extend(orientation * (1 if ordinal % 2 == 0 else -1) for ordinal in range(count))
            anti = [-charge for charge in pro]
            screened_rows.append(
                {
                    "occupancy": occupancy,
                    "orientations": orientations,
                    "pro_net_charge_units": sum(pro),
                    "anti_net_charge_units": sum(anti),
                    "pair_net_charge_units": sum(pro) + sum(anti),
                }
            )

    payload = ledgers["section_99_electron_payload"]  # type: ignore[index]
    payload_units = sum(site["charge_units"] for site in payload["site_list"])
    payload_e = Decimal(payload_units) / Decimal(6)

    flat = ledgers["section_96_flat_control_charge_ledger"]  # type: ignore[index]
    flat_units = sum(
        base * ordinal
        for base in flat["ring_base_polarities"]
        for ordinal in flat["ordinal_polarity_pattern_per_ring"]
    )

    results = {
        "three_neutral_binary_rings": {
            "recorded": three["expected_net_charge_units"],
            "new": three_net,
            "absolute_delta": abs(three_net - three["expected_net_charge_units"]),
            "tolerance": 0,
        },
        "section_99_screened_pair": {
            "recorded": screened["expected_pair_net_charge_units"],
            "rows": screened_rows,
            "new_values": [row["pair_net_charge_units"] for row in screened_rows],
            "absolute_delta": max(abs(row["pair_net_charge_units"]) for row in screened_rows),
            "tolerance": 0,
        },
        "section_99_electron_payload_units": {
            "recorded": payload["expected_payload_net_charge_units"],
            "new": payload_units,
            "absolute_delta": abs(payload_units - payload["expected_payload_net_charge_units"]),
            "tolerance": 0,
        },
        "section_99_electron_payload_e": {
            "recorded": str(payload["expected_payload_charge_in_e"]),
            "new": str(payload_e),
            "absolute_delta": str(abs(payload_e - Decimal(payload["expected_payload_charge_in_e"]))),
            "tolerance": "0",
        },
        "section_96_flat_control": {
            "recorded": flat["expected_net_charge_units"],
            "new": flat_units,
            "absolute_delta": abs(flat_units - flat["expected_net_charge_units"]),
            "tolerance": 0,
        },
    }
    for result in results.values():
        result["status"] = (
            "PASS" if Decimal(str(result["absolute_delta"])) <= Decimal(str(result["tolerance"])) else "FAIL"
        )
        result["claim_grade"] = "derived"
    return results


def _decimal_token(value: mp.mpf, digits: int = 105) -> str:
    return mp.nstr(value, n=digits, strip_zeros=False)


def _bounded_taylor_errors(radius: Decimal, angular_rate: Decimal, step: Decimal) -> tuple[Decimal, Decimal]:
    """Fourth-order position and third-order velocity Taylor remainders."""

    with localcontext() as context:
        context.prec = PRECISION
        context.rounding = ROUND_CEILING
        omega4 = abs(angular_rate) ** 4
        guard = Decimal("1e-80")
        position = +(Decimal(2) * radius * omega4 * step**4 / Decimal(24) + guard)
        velocity = +(Decimal(2) * radius * omega4 * step**3 / Decimal(6) + guard)
    return position, velocity


def circular_history(
    path: CircularPath,
    *,
    t_start: Decimal,
    t_end: Decimal,
    segment_count: int,
) -> PiecewisePolynomialHistory:
    """Enclose one analytic circular history by guarded cubic Taylor segments."""

    if segment_count < 1:
        raise ValueError("segment_count must be positive")
    with localcontext() as context:
        context.prec = PRECISION
        step = +((t_end - t_start) / Decimal(segment_count))
        boundaries = [+(t_start + step * index) for index in range(segment_count)] + [t_end]
    position_error, velocity_error = _bounded_taylor_errors(
        path.radius, path.angular_rate, step
    )
    mp.mp.dps = PRECISION + 30
    radius = mp.mpf(str(path.radius))
    omega = mp.mpf(str(path.angular_rate))
    phase = mp.mpf(str(path.phase))
    segments: list[CubicHistorySegment] = []
    for index in range(segment_count):
        lower = boundaries[index]
        upper = boundaries[index + 1]
        theta = omega * mp.mpf(str(lower)) + phase
        sine = mp.sin(theta)
        cosine = mp.cos(theta)
        x = (
            radius * cosine,
            -radius * omega * sine,
            -radius * omega**2 * cosine / 2,
            radius * omega**3 * sine / 6,
        )
        y = (
            radius * sine,
            radius * omega * cosine,
            -radius * omega**2 * sine / 2,
            -radius * omega**3 * cosine / 6,
        )
        segments.append(
            CubicHistorySegment.from_decimal_tokens(
                t_start=str(lower),
                t_end=str(upper),
                coefficients=(
                    tuple(_decimal_token(value) for value in x),
                    tuple(_decimal_token(value) for value in y),
                    ("0", "0", "0", "0"),
                ),
                position_error=str(position_error),
                velocity_error=str(velocity_error),
                precision=PRECISION,
            )
        )
    return PiecewisePolynomialHistory.from_segments(segments, history_id=path.path_id)


@dataclass(frozen=True)
class Section14Configuration:
    field_speed: Decimal
    receivers: tuple[CircularPath, ...]
    sources: tuple[CircularPath, ...]
    reception_start: Decimal
    reception_stop: Decimal
    history_window: Decimal
    owner_root_scan_subdivisions: int


def _tangent(path: CircularPath, reception_time: Decimal) -> IntervalVector:
    mp.mp.dps = PRECISION + 30
    theta = (
        mp.mpf(str(path.angular_rate)) * mp.mpf(str(reception_time))
        + mp.mpf(str(path.phase))
    )
    return interval_vector(
        (
            DecimalInterval.point(_decimal_token(-mp.sin(theta)), PRECISION),
            DecimalInterval.point(_decimal_token(mp.cos(theta)), PRECISION),
            DecimalInterval.point("0", PRECISION),
        )
    )


def reduce_projected_contributions(contributions: Iterable[DecimalInterval]) -> dict[str, DecimalInterval]:
    """Reduce signed branch rows with unambiguous surviving/cancellation names."""

    materialized = tuple(contributions)
    if not materialized:
        raise ValueError("at least one contribution is required")
    precision = materialized[0].precision
    net = DecimalInterval.point(0, precision)
    magnitude_sum = DecimalInterval.point(0, precision)
    for contribution in materialized:
        net = net + contribution
        magnitude_sum = magnitude_sum + contribution.absolute()
    surviving_fraction = net.absolute() / magnitude_sum
    cancellation_fraction = (
        DecimalInterval.point(1, precision) - surviving_fraction
    )
    return {
        "net": net,
        "magnitude_sum": magnitude_sum,
        "surviving_fraction_S": surviving_fraction,
        "cancellation_fraction_C": cancellation_fraction,
    }


def _interval_record(value: DecimalInterval) -> dict[str, str]:
    return {
        "lower": str(value.lower),
        "upper": str(value.upper),
        "midpoint": str(value.midpoint),
        "width": str(value.width),
    }


def section_14_owner_configuration(
    tier: dict[str, object],
) -> Section14Configuration:
    """Select only the fixture-firewalled owning §14 configuration."""

    fixture = tier["fixtures"][  # type: ignore[index]
        "section_14_causal_root_sum_owner_configuration"
    ]
    literal = fixture["literal_configuration_inputs"]
    sampling = fixture["literal_sampling_and_root_search_request_constants"]
    receiver = literal["middle_receiver"]
    source = literal["inner_source"]
    field_speed = Decimal(str(literal["field_speed"]["value"]))
    receiver_radius = Decimal(str(receiver["radius"]["value"]))
    receiver_rate = (
        Decimal(str(receiver["tangential_speed_parameter"]["value"]))
        / receiver_radius
    )
    source_radius = (
        Decimal(str(source["radius_ratio_to_middle_receiver"]["value"]))
        * receiver_radius
    )
    source_rate = (
        Decimal(str(source["angular_rate_ratio_to_middle_receiver"]["value"]))
        * receiver_rate
    )
    mp.mp.dps = PRECISION + 30
    pi = Decimal(_decimal_token(mp.pi))
    receivers = tuple(
        CircularPath(
            path_id=f"middle-receiver-{index}",
            radius=receiver_radius,
            angular_rate=receiver_rate,
            phase=Decimal(2 * index) * pi / Decimal(3),
            charge=int(receiver["site_polarities"]["values"][index]),
        )
        for index in receiver["site_indices"]["values"]
    )
    phase_base = Decimal(str(source["phase_base"]["value"]))
    phase_offsets = source["phase_offsets"]["values"]
    sources = tuple(
        CircularPath(
            path_id=f"inner-source-{index}",
            radius=source_radius,
            angular_rate=source_rate,
            phase=phase_base + (Decimal(0) if offset == 0 else pi),
            charge=int(source["site_polarities"]["values"][index]),
        )
        for index, offset in enumerate(phase_offsets)
    )
    reception_start = Decimal(
        str(sampling["reception_time_window"]["start"]["value"])
    )
    reception_period = Decimal(2) * pi / receiver_rate
    window = (
        (receiver_radius + source_radius) / field_speed
        + Decimal(str(sampling["source_history_window_padding"]["value"]))
    )
    return Section14Configuration(
        field_speed=field_speed,
        receivers=receivers,
        sources=sources,
        reception_start=reception_start,
        reception_stop=reception_start + reception_period,
        history_window=window,
        owner_root_scan_subdivisions=int(
            sampling["owner_neutral_witness_root_scan_subdivisions"]["value"]
        ),
    )


def derive_common_scale_cancellation(
    configuration: Section14Configuration,
) -> dict[str, object]:
    """Prove whether one common positive coupling can be gauged to one."""

    charge_magnitudes = {
        abs(path.charge) for path in (*configuration.receivers, *configuration.sources)
    }
    if charge_magnitudes != {1}:
        return {
            "status": "NOT-VERIFIABLE",
            "missing_input_or_interface": (
                "one common source/receiver charge magnitude; recorded polarity signs "
                f"have magnitudes {sorted(charge_magnitudes)}"
            ),
        }
    return {
        "status": "DERIVED",
        "coupling_gauge": "1",
        "charge_product_magnitude": "1",
        "reason": (
            "every branch carries the same positive multiplier kappa*|q_r*q_s|; "
            "the fixture gives |q_r|=|q_s|=1, so that multiplier cancels from S and C"
        ),
    }


def reception_times(
    configuration: Section14Configuration, sample_count: int
) -> tuple[Decimal, ...]:
    """Construct the required half-open full-window uniform reception grid."""

    if sample_count < 1:
        raise ValueError("sample_count must be positive")
    with localcontext() as context:
        context.prec = PRECISION
        step = +(
            (configuration.reception_stop - configuration.reception_start)
            / Decimal(sample_count)
        )
        return tuple(
            +(configuration.reception_start + Decimal(index) * step)
            for index in range(sample_count)
        )


def _history_segment_count(
    configuration: Section14Configuration, segments_per_window: int
) -> int:
    if segments_per_window < 1:
        raise ValueError("segments_per_window must be positive")
    duration = (
        configuration.reception_stop
        - configuration.reception_start
        + configuration.history_window
    )
    with localcontext() as context:
        context.prec = PRECISION
        target_step = configuration.history_window / Decimal(segments_per_window)
        return int((duration / target_step).to_integral_value(rounding=ROUND_CEILING))


def _not_verifiable(
    *,
    sample_count: int,
    step_index: int,
    reason: str,
    root_count: int,
    pair_count: int,
) -> dict[str, object]:
    return {
        "status": "NOT-VERIFIABLE",
        "sample_count_N_T": sample_count,
        "failed_step": step_index,
        "root_count_before_failure": root_count,
        "pair_count_before_failure": pair_count,
        "missing_input_or_interface": reason,
    }


def evaluate_section_14_window(
    tier: dict[str, object],
    *,
    sample_count: int,
    history_segments_per_window: int,
    heartbeat_every: int = 100,
    heartbeat: bool = True,
) -> dict[str, object]:
    """Evaluate every certified branch over the owning full reception window."""

    configuration = section_14_owner_configuration(tier)
    scale_contract = derive_common_scale_cancellation(configuration)
    if scale_contract["status"] != "DERIVED":
        return {
            "status": "NOT-VERIFIABLE",
            "sample_count_N_T": sample_count,
            **scale_contract,
        }
    times = reception_times(configuration, sample_count)
    history_start = configuration.reception_start - configuration.history_window
    history_stop = configuration.reception_stop
    history_segment_count = _history_segment_count(
        configuration, history_segments_per_window
    )
    histories = {
        path.path_id: circular_history(
            path,
            t_start=history_start,
            t_end=history_stop,
            segment_count=history_segment_count,
        )
        for path in (*configuration.receivers, *configuration.sources)
    }
    started = time.monotonic()
    precision = PRECISION
    signed_sum = DecimalInterval.point(0, precision)
    magnitude_sum = DecimalInterval.point(0, precision)
    pair_count = 0
    root_count = 0
    root_count_histogram: dict[str, int] = {}
    total_pairs = sample_count * len(configuration.receivers) * len(configuration.sources)
    if heartbeat:
        print(
            "heartbeat "
            f"N_T={sample_count} step=0/{sample_count} simulation_time={times[0]} "
            f"root_progress=0 pair_progress=0/{total_pairs} wall_seconds=0.000",
            file=sys.stderr,
            flush=True,
        )
    for step_index, reception_time in enumerate(times, start=1):
        for receiver in configuration.receivers:
            tangent = _tangent(receiver, reception_time)
            for source in configuration.sources:
                pair_count += 1
                search_lower = reception_time - configuration.history_window
                root_certificate = certify_causal_roots(
                    receiver=histories[receiver.path_id],
                    source=histories[source.path_id],
                    reception_time=str(reception_time),
                    field_speed=str(configuration.field_speed),
                    search_lower=str(search_lower),
                    search_upper=str(reception_time),
                    root_tolerance=ROOT_TOLERANCE,
                    max_depth=256,
                    max_cells=1_000_000,
                )
                if root_certificate.status != "certified_complete":
                    return _not_verifiable(
                        sample_count=sample_count,
                        step_index=step_index,
                        reason=(
                            f"certified simple-root coverage for {receiver.path_id}<-{source.path_id}; "
                            f"oracle status={root_certificate.status}, unresolved={len(root_certificate.unresolved_cells)}"
                        ),
                        root_count=root_count,
                        pair_count=pair_count,
                    )
                request = PairAccelerationRequest.from_decimal_tokens(
                    receiver_path_id=receiver.path_id,
                    source_path_id=source.path_id,
                    receiver_history=histories[receiver.path_id],
                    source_history=histories[source.path_id],
                    root_certificate=root_certificate,
                    receiver_charge=str(receiver.charge),
                    source_charge=str(source.charge),
                    coupling="1",
                    chart="sharp",
                    source_normal_floor=SOURCE_NORMAL_FLOOR,
                    acceleration_tolerance=ACCELERATION_TOLERANCE,
                )
                certificate = certify_pair_acceleration(request)
                if (
                    certificate.status == "uncertified"
                    or certificate.total_acceleration is None
                ):
                    return _not_verifiable(
                        sample_count=sample_count,
                        step_index=step_index,
                        reason=(
                            f"certified acceleration enclosure for {receiver.path_id}<-{source.path_id}; "
                            f"oracle reason={certificate.failure_reason}"
                        ),
                        root_count=root_count,
                        pair_count=pair_count,
                    )
                pair_roots = len(root_certificate.roots)
                if len(certificate.rows) != pair_roots:
                    return _not_verifiable(
                        sample_count=sample_count,
                        step_index=step_index,
                        reason=(
                            "EOM/oracle branch-row contract did not expose one row per certified "
                            f"root for {receiver.path_id}<-{source.path_id}: roots={pair_roots}, "
                            f"rows={len(certificate.rows)}"
                        ),
                        root_count=root_count,
                        pair_count=pair_count,
                    )
                root_count += pair_roots
                root_count_histogram[str(pair_roots)] = (
                    root_count_histogram.get(str(pair_roots), 0) + 1
                )
                for row in certificate.rows:
                    scalar = interval_dot(row.acceleration, tangent)
                    signed_sum = signed_sum + scalar
                    magnitude_sum = magnitude_sum + scalar.absolute()
        if heartbeat and (
            step_index % heartbeat_every == 0 or step_index == sample_count
        ):
            print(
                "heartbeat "
                f"N_T={sample_count} step={step_index}/{sample_count} "
                f"simulation_time={reception_time} root_progress={root_count} "
                f"pair_progress={pair_count}/{total_pairs} "
                f"wall_seconds={time.monotonic() - started:.3f}",
                file=sys.stderr,
                flush=True,
            )
    average_scale = DecimalInterval.point(
        Decimal(1) / Decimal(sample_count), precision
    )
    average_net = signed_sum * average_scale
    average_magnitude = magnitude_sum * average_scale
    surviving_fraction = signed_sum.absolute() / magnitude_sum
    cancellation_fraction = DecimalInterval.point(1, precision) - surviving_fraction
    return {
        "status": "MEASURED",
        "claim_grade": "measured",
        "sample_count_N_T": sample_count,
        "reception_window": {
            "lower": str(configuration.reception_start),
            "upper_exclusive": str(configuration.reception_stop),
        },
        "history_window": str(configuration.history_window),
        "history_segments_per_window": history_segments_per_window,
        "history_segment_count": history_segment_count,
        "owner_root_scan_subdivisions_recorded": (
            configuration.owner_root_scan_subdivisions
        ),
        "coupling_contract": scale_contract,
        "pair_count": pair_count,
        "root_count": root_count,
        "root_count_histogram_by_pair": root_count_histogram,
        "average_net_signed_root_sum": _interval_record(average_net),
        "average_magnitude_sum": _interval_record(average_magnitude),
        "surviving_fraction_S": _interval_record(surviving_fraction),
        "cancellation_fraction_C": _interval_record(cancellation_fraction),
        "wall_seconds": f"{time.monotonic() - started:.6f}",
    }


def _record_interval(record: dict[str, str]) -> DecimalInterval:
    return DecimalInterval.bounds(record["lower"], record["upper"], PRECISION)


def _interval_distance(left: DecimalInterval, right: DecimalInterval) -> Decimal:
    return max(
        abs(left.lower - right.lower),
        abs(left.upper - right.upper),
    )


def adjudicate_section_14_ladder(
    ladder: list[dict[str, object]],
) -> dict[str, object]:
    """Apply the fixed target tolerance and separate predeclared settling rule."""

    expected_counts = [2000, 4000, 8000]
    counts = [row.get("sample_count_N_T") for row in ladder]
    if counts != expected_counts:
        raise ValueError(f"official ladder must be {expected_counts}, got {counts}")
    intervals = [
        _record_interval(row["cancellation_fraction_C"])  # type: ignore[arg-type,index]
        for row in ladder
    ]
    documented_width = Decimal("0.010") / Decimal("7.42")
    comparison_tolerance = max(Decimal("0.005"), documented_width)
    distance_24 = _interval_distance(intervals[0], intervals[1])
    distance_48 = _interval_distance(intervals[1], intervals[2])
    certified_width = max(intervals[1].width, intervals[2].width)
    convergence_scale = documented_width + certified_width
    convergence_pass = (
        distance_48 <= convergence_scale and distance_48 <= distance_24
    )
    target = Decimal("0.97")
    target_lower = target - comparison_tolerance
    target_upper = target + comparison_tolerance
    comparison_pass = (
        intervals[2].lower >= target_lower and intervals[2].upper <= target_upper
    )
    status = (
        "NOT-VERIFIABLE"
        if not convergence_pass
        else ("PASS" if comparison_pass else "FAIL")
    )
    return {
        "status": status,
        "recorded_target_cancellation_fraction_C": str(target),
        "comparison_tolerance_fixed": str(comparison_tolerance),
        "documented_normalized_width": str(documented_width),
        "target_acceptance_interval": {
            "lower": str(target_lower),
            "upper": str(target_upper),
        },
        "comparison_pass": comparison_pass,
        "live_convergence": {
            "distance_2000_to_4000": str(distance_24),
            "distance_4000_to_8000": str(distance_48),
            "certified_enclosure_width_scale": str(certified_width),
            "documented_plus_certified_scale": str(convergence_scale),
            "final_movement_within_scale": distance_48 <= convergence_scale,
            "final_movement_nonincreasing": distance_48 <= distance_24,
            "pass": convergence_pass,
        },
        "absolute_midpoint_delta_at_8000": str(
            abs(intervals[2].midpoint - target)
        ),
        "falsifier": (
            "overturn this disposition if the same fixture-firewalled full-window "
            "branch reduction yields a complete certified C_8000 enclosure inside "
            "[0.965,0.975] and the predeclared live-convergence inequalities pass"
        ),
    }


def execute_tier_one(
    fixture_path: Path,
    *,
    sample_counts: tuple[int, ...] = (2000, 4000, 8000),
    history_segments_per_window: int = 96,
    heartbeat_every: int = 100,
    heartbeat: bool = True,
) -> dict[str, object]:
    tier = load_tier_one(fixture_path)
    ledgers = charge_ledgers(tier)
    if any(row["status"] != "PASS" for row in ledgers.values()):
        return {"tier": 1, "status": "FAIL", "charge_ledgers": ledgers}

    configuration = section_14_owner_configuration(tier)
    allowed_counts = tuple(
        tier["fixtures"]["section_14_causal_root_sum_owner_configuration"]  # type: ignore[index]
        ["literal_sampling_and_root_search_request_constants"]
        ["published_reception_sample_count_convergence_ladder"]["values"]
    )
    if sample_counts != allowed_counts and sample_counts != (8, 16, 32):
        # Arbitrary small grids are allowed through evaluate_section_14_window for tests;
        # execute_tier_one owns only the official or fixed fast-test ladder.
        raise ValueError(f"unsupported Tier-1 ladder {sample_counts}")
    ladder: list[dict[str, object]] = []
    for sample_count in sample_counts:
        row = evaluate_section_14_window(
            tier,
            sample_count=sample_count,
            history_segments_per_window=history_segments_per_window,
            heartbeat_every=heartbeat_every,
            heartbeat=heartbeat,
        )
        ladder.append(row)
        if row["status"] == "NOT-VERIFIABLE":
            return {
                "tier": 1,
                "status": "NOT-VERIFIABLE",
                "claim_grade": "measured",
                "charge_ledgers": ledgers,
                "section_14": {
                    "configuration": {
                        "reception_start": str(configuration.reception_start),
                        "reception_stop": str(configuration.reception_stop),
                        "history_window": str(configuration.history_window),
                    },
                    "ladder": ladder,
                },
            }
    if sample_counts == (2000, 4000, 8000):
        adjudication = adjudicate_section_14_ladder(ladder)
    else:
        adjudication = {"status": "FAST-GRID-MEASURED", "official": False}
    return {
        "tier": 1,
        "status": adjudication["status"],
        "claim_grade": "measured",
        "charge_ledgers": ledgers,
        "section_14": {
            "configuration": {
                "reception_start": str(configuration.reception_start),
                "reception_stop": str(configuration.reception_stop),
                "history_window": str(configuration.history_window),
                "receiver_count": len(configuration.receivers),
                "source_count": len(configuration.sources),
            },
            "ladder": ladder,
            "adjudication": adjudication,
        },
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--fixture", type=Path, default=DEFAULT_FIXTURE)
    parser.add_argument(
        "--ladder", type=int, nargs=3, default=(2000, 4000, 8000)
    )
    parser.add_argument("--history-segments-per-window", type=int, default=96)
    parser.add_argument("--heartbeat-every", type=int, default=100)
    parser.add_argument("--no-heartbeat", action="store_true")
    args = parser.parse_args()
    result = execute_tier_one(
        args.fixture,
        sample_counts=tuple(args.ladder),
        history_segments_per_window=args.history_segments_per_window,
        heartbeat_every=args.heartbeat_every,
        heartbeat=not args.no_heartbeat,
    )
    json.dump(result, sys.stdout, indent=2)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
