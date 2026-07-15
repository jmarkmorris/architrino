#!/usr/bin/env python3
"""Compare native root certificates against the 90-digit oracle on one trace.

The native runner supplies the exact initial retained histories plus only the
new cubic segment published by each accepted step.  The oracle reconstructs
that same evolving object; it does not run a second trajectory integrator.
"""

from __future__ import annotations

import argparse
import json
import sys
from decimal import Decimal
from pathlib import Path
from typing import Any

from scripts.eom.oracle.certified_history import (
    CubicHistorySegment,
    PiecewisePolynomialHistory,
    certify_causal_roots,
)


def segment(record: dict[str, Any], precision: int) -> CubicHistorySegment:
    return CubicHistorySegment.from_decimal_tokens(
        t_start=record["t_start"],
        t_end=record["t_end"],
        coefficients=tuple(tuple(axis) for axis in record["coefficients"]),
        position_error=record["position_error"],
        velocity_error=record["velocity_error"],
        precision=precision,
    )


def initial_histories(
    records: list[dict[str, Any]], precision: int
) -> dict[str, PiecewisePolynomialHistory]:
    return {
        record["path_id"]: PiecewisePolynomialHistory.from_segments(
            tuple(segment(item, precision) for item in record["segments"]),
            history_id=record["history_id"],
        )
        for record in records
    }


def append_segments(
    histories: dict[str, PiecewisePolynomialHistory],
    records: list[dict[str, Any]],
    precision: int,
) -> None:
    for record in records:
        path_id = record["path_id"]
        previous = histories[path_id]
        additions = tuple(segment(item, precision) for item in record["segments"])
        if not additions:
            continue
        PiecewisePolynomialHistory.from_segments(
            (previous.segments[-1], *additions),
            history_id=previous.history_id,
        )
        histories[path_id] = PiecewisePolynomialHistory(
            (*previous.segments, *additions), previous.history_id
        )


def oracle_status_class(certificate: Any) -> str:
    if certificate.status != "uncertified":
        return certificate.status
    reasons = {cell.reason for cell in certificate.unresolved_cells}
    same_retained_history = (
        certificate.receiver_history_id == certificate.source_history_id
        and certificate.receiver_history_digest
        == certificate.source_history_digest
    )
    if reasons and (
        reasons <= {"source_normal_interval_contains_zero"}
        or (
            same_retained_history
            and reasons
            <= {
                "source_normal_interval_contains_zero",
                "self_root_cluster_requires_finite_width",
            }
        )
    ):
        return "caustic_route_required"
    return "uncertified"


def first_row_divergence(native: dict[str, Any], oracle: Any) -> str | None:
    if native["status"] != oracle_status_class(oracle):
        return f"status native={native['status']} oracle={oracle.status}"
    if native["root_free_complement"] != oracle.root_free_complement:
        return "root_free_complement"
    if native["memory_boundary_contact"] != oracle.memory_boundary_contact:
        return "memory_boundary_contact"
    if native["coincident_endpoint_excluded"] != oracle.coincident_endpoint_excluded:
        return "coincident_endpoint_excluded"
    if len(native["roots"]) != len(oracle.roots):
        return f"root_count native={len(native['roots'])} oracle={len(oracle.roots)}"
    for index, (native_root, oracle_root) in enumerate(
        zip(native["roots"], oracle.roots)
    ):
        native_lower = Decimal(native_root["lower"])
        native_upper = Decimal(native_root["upper"])
        if native_lower > oracle_root.upper or native_upper < oracle_root.lower:
            return f"root_{index}_bracket_disjoint"
        if native_upper - native_lower > Decimal(native["root_tolerance"]):
            return f"root_{index}_native_width_exceeds_tolerance"
        if oracle_root.width > Decimal(native["root_tolerance"]):
            return f"root_{index}_oracle_width_exceeds_tolerance"
        if native_root["source_normal_sign"] != oracle_root.source_normal.strict_sign:
            return f"root_{index}_source_normal_sign"
    return None


def compare_trace(
    packet: dict[str, Any], *, progress_every: int = 0
) -> dict[str, Any]:
    precision = int(packet["precision_decimal_digits"])
    histories = initial_histories(packet["initial_histories"], precision)
    compared_snapshots = 0
    compared_rows = 0
    for snapshot in packet["snapshots"]:
        append_segments(histories, snapshot["appended_segments"], precision)
        reception = snapshot["reception_time"]
        for row in snapshot["root_certificates"]:
            receiver_id = row["receiver_path_id"]
            source_id = row["source_path_id"]
            oracle = certify_causal_roots(
                receiver=histories[receiver_id],
                source=histories[source_id],
                reception_time=reception,
                field_speed=packet["field_speed"],
                search_lower=row["searched_lower"],
                search_upper=row["searched_upper"],
                root_tolerance=row["root_tolerance"],
                max_depth=192,
                max_cells=500000,
            )
            compared_rows += 1
            divergence = first_row_divergence(row, oracle)
            if divergence is not None:
                return {
                    "schema": "eom_evolved_history_root_parity_result/v0",
                    "status": "diverged",
                    "run_id": packet["run_id"],
                    "first_divergent_step_index": snapshot["step_index"],
                    "first_divergent_reception_time": reception,
                    "receiver_path_id": receiver_id,
                    "source_path_id": source_id,
                    "reason": divergence,
                    "compared_snapshots": compared_snapshots,
                    "compared_rows": compared_rows,
                }
        compared_snapshots += 1
        if progress_every > 0 and compared_snapshots % progress_every == 0:
            print(
                f"parity_progress snapshots={compared_snapshots} "
                f"rows={compared_rows} reception={reception}",
                file=sys.stderr,
                flush=True,
            )
    return {
        "schema": "eom_evolved_history_root_parity_result/v0",
        "status": "parity_complete",
        "run_id": packet["run_id"],
        "first_divergent_step_index": None,
        "first_divergent_reception_time": None,
        "compared_snapshots": compared_snapshots,
        "compared_rows": compared_rows,
        "native_status": packet["native_status"],
        "native_accepted_end_time": packet["native_accepted_end_time"],
        "native_halt_code": packet["native_halt_code"],
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("trace", type=Path)
    parser.add_argument("--output", type=Path)
    parser.add_argument("--progress-every", type=int, default=100)
    arguments = parser.parse_args()
    packet = json.loads(arguments.trace.read_text())
    result = compare_trace(packet, progress_every=arguments.progress_every)
    rendered = json.dumps(result, indent=2, sort_keys=True) + "\n"
    if arguments.output is not None:
        arguments.output.write_text(rendered)
    print(rendered, end="")
    return 0 if result["status"] == "parity_complete" else 1


if __name__ == "__main__":
    raise SystemExit(main())
