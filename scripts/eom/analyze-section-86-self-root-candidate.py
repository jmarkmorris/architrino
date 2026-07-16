#!/usr/bin/env python3
"""Independently classify a captured Section 86 self-root candidate.

The input is the exact-token TSV emitted by the native diagnostics callback.
The load-bearing root certificates are produced by the pre-existing,
separately authored Decimal oracle.  This script does not import the EOM solver
code and does not modify the oracle.
"""

from __future__ import annotations

import argparse
import csv
import json
from collections import defaultdict
from decimal import Decimal, localcontext
from pathlib import Path
from typing import Iterable

from scripts.eom.oracle.certified_history import (
    CubicHistorySegment,
    PiecewisePolynomialHistory,
    certify_causal_roots,
)


COEFFICIENT_COLUMNS = (
    ("x0", "x1", "x2", "x3"),
    ("y0", "y1", "y2", "y3"),
    ("z0", "z1", "z2", "z3"),
)


def parse_candidate(
    path: Path,
    *,
    precision: int,
) -> tuple[dict[str, str], dict[str, PiecewisePolynomialHistory]]:
    with path.open(newline="", encoding="utf-8") as stream:
        rows = list(csv.DictReader(stream, delimiter="\t"))
    if not rows:
        raise ValueError("candidate history TSV is empty")

    metadata_keys = (
        "start_time",
        "reception_time",
        "failure_code",
        "correction_iteration",
    )
    metadata = {key: rows[0][key] for key in metadata_keys}
    for row in rows:
        for key, expected in metadata.items():
            if row[key] != expected:
                raise ValueError(f"candidate metadata differs for {key}")

    grouped: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in rows:
        grouped[row["path_id"]].append(row)

    histories: dict[str, PiecewisePolynomialHistory] = {}
    for path_id, path_rows in grouped.items():
        path_rows.sort(key=lambda row: int(row["segment_index"]))
        expected_indices = list(range(len(path_rows)))
        actual_indices = [int(row["segment_index"]) for row in path_rows]
        if actual_indices != expected_indices:
            raise ValueError(f"non-contiguous segment indices for {path_id}")
        history_ids = {row["history_id"] for row in path_rows}
        fingerprints = {row["history_fingerprint"] for row in path_rows}
        if len(history_ids) != 1 or len(fingerprints) != 1:
            raise ValueError(f"history identity differs within {path_id}")
        segments = [
            CubicHistorySegment.from_decimal_tokens(
                t_start=row["t_start"],
                t_end=row["t_end"],
                coefficients=tuple(
                    tuple(row[column] for column in axis)
                    for axis in COEFFICIENT_COLUMNS
                ),
                position_error=row["position_error"],
                velocity_error=row["velocity_error"],
                precision=precision,
            )
            for row in path_rows
        ]
        histories[path_id] = PiecewisePolynomialHistory.from_segments(
            segments,
            history_id=next(iter(history_ids)),
        )
    return metadata, histories


def join_floor_history(
    history: PiecewisePolynomialHistory,
) -> tuple[PiecewisePolynomialHistory, dict[str, object]]:
    """Keep the nominal cubics with only enough radius to cover their joins.

    Accepted native segments are continuous as enclosures, while their nominal
    decimal coefficients can differ at a join by roundoff far below the stored
    reconstruction radii.  A literal zero-radius history is therefore not a
    valid continuous retained history.  This construction leaves every
    coefficient untouched and assigns each adjacent pair half its nominal join
    gap, producing the smallest symmetric per-join continuity floor.
    """

    segments = history.segments
    position_floors = [Decimal(0) for _ in segments]
    velocity_floors = [Decimal(0) for _ in segments]
    maximum_position_gap = Decimal(0)
    maximum_velocity_gap = Decimal(0)
    maximum_position_fraction = Decimal(0)
    maximum_velocity_fraction = Decimal(0)

    with localcontext() as context:
        context.prec = history.precision
        for index, (prior, following) in enumerate(
            zip(segments, segments[1:])
        ):
            prior_position, prior_velocity = prior.nominal_state(prior.t_end)
            next_position, next_velocity = following.nominal_state(
                following.t_start
            )
            position_gap = max(
                abs(prior_position[axis] - next_position[axis])
                for axis in range(3)
            )
            velocity_gap = max(
                abs(prior_velocity[axis] - next_velocity[axis])
                for axis in range(3)
            )
            half_position_gap = position_gap / Decimal(2)
            half_velocity_gap = velocity_gap / Decimal(2)
            position_floors[index] = max(
                position_floors[index], half_position_gap
            )
            position_floors[index + 1] = max(
                position_floors[index + 1], half_position_gap
            )
            velocity_floors[index] = max(
                velocity_floors[index], half_velocity_gap
            )
            velocity_floors[index + 1] = max(
                velocity_floors[index + 1], half_velocity_gap
            )
            maximum_position_gap = max(maximum_position_gap, position_gap)
            maximum_velocity_gap = max(maximum_velocity_gap, velocity_gap)
            stored_position_allowance = (
                prior.position_error + following.position_error
            )
            stored_velocity_allowance = (
                prior.velocity_error + following.velocity_error
            )
            if stored_position_allowance:
                maximum_position_fraction = max(
                    maximum_position_fraction,
                    position_gap / stored_position_allowance,
                )
            if stored_velocity_allowance:
                maximum_velocity_fraction = max(
                    maximum_velocity_fraction,
                    velocity_gap / stored_velocity_allowance,
                )

    floor_within_stored_envelope = all(
        position_floors[index] <= segment.position_error
        and velocity_floors[index] <= segment.velocity_error
        for index, segment in enumerate(segments)
    )
    floor_history = PiecewisePolynomialHistory.from_segments(
        (
            CubicHistorySegment.from_decimal_tokens(
                t_start=segment.t_start,
                t_end=segment.t_end,
                coefficients=segment.coefficients,
                position_error=position_floors[index],
                velocity_error=velocity_floors[index],
                precision=history.precision,
            )
            for index, segment in enumerate(segments)
        ),
        history_id=f"{history.history_id}/join-floor-diagnostic",
    )
    diagnostics = {
        "construction": "unchanged_coefficients_symmetric_join_floor",
        "maximum_position_join_gap": str(maximum_position_gap),
        "maximum_velocity_join_gap": str(maximum_velocity_gap),
        "maximum_position_join_fraction_of_stored_allowance": str(
            maximum_position_fraction
        ),
        "maximum_velocity_join_fraction_of_stored_allowance": str(
            maximum_velocity_fraction
        ),
        "maximum_position_floor": str(max(position_floors)),
        "maximum_velocity_floor": str(max(velocity_floors)),
        "floor_within_stored_envelope": floor_within_stored_envelope,
    }
    return floor_history, diagnostics


def certificate_record(
    history: PiecewisePolynomialHistory,
    *,
    reception_time: str,
    field_speed: str,
    root_tolerance: str,
    max_depth: int,
) -> dict[str, object]:
    certificate = certify_causal_roots(
        receiver=history,
        source=history,
        reception_time=reception_time,
        field_speed=field_speed,
        search_lower=str(history.t_start),
        search_upper=reception_time,
        root_tolerance=root_tolerance,
        max_depth=max_depth,
    )
    return certificate.to_record()


def classify(
    bounded: Iterable[dict[str, object]],
    join_floor: Iterable[dict[str, object]],
    join_floor_within_stored_envelope: bool = True,
) -> str:
    bounded_records = list(bounded)
    join_floor_records = list(join_floor)
    if all(record["status"] == "certified_complete" for record in bounded_records):
        return "native_certificate_defect_indicated"
    if join_floor_within_stored_envelope and all(
        record["status"] == "certified_complete"
        for record in join_floor_records
    ):
        return "stored_history_reconstruction_envelope_horizon"
    return "independent_oracle_horizon_unresolved"


def write_json_atomic(path: Path, record: dict[str, object]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(f"{path.name}.tmp")
    temporary.write_text(
        json.dumps(record, indent=2, sort_keys=True) + "\n",
        encoding="utf-8",
    )
    temporary.replace(path)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--paths", default="M+,M-")
    parser.add_argument("--precision", type=int, default=90)
    parser.add_argument("--field-speed", default="1")
    parser.add_argument("--root-tolerance", default="1e-5")
    parser.add_argument("--max-depth", type=int, default=256)
    options = parser.parse_args()

    metadata, histories = parse_candidate(
        options.input,
        precision=options.precision,
    )
    selected_paths = tuple(
        value.strip() for value in options.paths.split(",") if value.strip()
    )
    missing = [path_id for path_id in selected_paths if path_id not in histories]
    if missing:
        raise ValueError(f"candidate lacks paths: {','.join(missing)}")

    bounded: dict[str, dict[str, object]] = {}
    join_floor: dict[str, dict[str, object]] = {}
    join_floor_diagnostics: dict[str, dict[str, object]] = {}
    for path_id in selected_paths:
        history = histories[path_id]
        bounded[path_id] = certificate_record(
            history,
            reception_time=metadata["reception_time"],
            field_speed=options.field_speed,
            root_tolerance=options.root_tolerance,
            max_depth=options.max_depth,
        )
        floor_history, floor_diagnostics = join_floor_history(history)
        join_floor_diagnostics[path_id] = floor_diagnostics
        join_floor[path_id] = certificate_record(
            floor_history,
            reception_time=metadata["reception_time"],
            field_speed=options.field_speed,
            root_tolerance=options.root_tolerance,
            max_depth=options.max_depth,
        )

    result = {
        "schema": "section_86_self_root_candidate_adjudication/v0",
        "input": str(options.input),
        "metadata": metadata,
        "paths": list(selected_paths),
        "precision_decimal_digits": options.precision,
        "field_speed": options.field_speed,
        "root_tolerance": options.root_tolerance,
        "bounded_history_certificates": bounded,
        "join_floor_certificates": join_floor,
        "join_floor_diagnostics": join_floor_diagnostics,
        "classification": classify(
            bounded.values(),
            join_floor.values(),
            all(
                record["floor_within_stored_envelope"] is True
                for record in join_floor_diagnostics.values()
            ),
        ),
        "claim_grades": {
            "measured": (
                "captured native candidate tokens and independent oracle records"
            ),
            "derived": (
                "classification from bounded-versus-join-floor certificate status"
            ),
            "inferred": (
                "physical meaning remains conditional on the classification and "
                "requires native parity before any repair is accepted"
            ),
        },
    }
    write_json_atomic(options.output, result)
    print(json.dumps({"classification": result["classification"]}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
