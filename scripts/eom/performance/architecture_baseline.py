#!/usr/bin/env python3
"""Execute the reference-only EOM performance architecture baseline.

The benchmark packet measures representative costs and conservative scale
projections. It does not implement production EOM evolution, general
retained-history block exclusion, or a production backend decision.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
from dataclasses import asdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from .baseline_model import (
    AUTHORITY,
    DENSE_PAIR_ROW_BYTES,
    HOT_SEGMENT_BYTES,
    POPULATION_LADDER,
    dense_resource_projection,
    exhaustive_stationary_active_pairs,
    logical_ordered_pairs,
    stationary_block_counts,
)
from .local_benchmarks import (
    capabilities,
    metal_baseline,
    native_baselines,
    numpy_baseline,
    oracle_baseline,
    storage_baseline,
)


SCHEMA = "eom_performance_architecture_baseline/v0"


def _source_digests(repo: Path) -> dict[str, str]:
    relative_paths = (
        "scripts/eom/performance/architecture_baseline.py",
        "scripts/eom/performance/baseline_model.py",
        "scripts/eom/performance/local_benchmarks.py",
        "scripts/eom/performance/native_kernel_baseline.cpp",
        "scripts/eom/performance/metal_bound_baseline.swift",
    )
    return {
        relative_path: hashlib.sha256((repo / relative_path).read_bytes()).hexdigest()
        for relative_path in relative_paths
    }


def _nested_control() -> dict[str, Any]:
    cases = []
    for spacing in (2.0, 0.25):
        population = 256
        positions = tuple(index * spacing for index in range(population))
        blocks = stationary_block_counts(positions, leaf_size=8)
        exhaustive_active = exhaustive_stationary_active_pairs(positions)
        cases.append(
            {
                "population": population,
                "spacing": spacing,
                "logical_pairs": logical_ordered_pairs(population),
                **asdict(blocks),
                "exclusion_ratio": blocks.exclusion_ratio,
                "exhaustive_active_root_pairs": exhaustive_active,
                "complete_disjoint_coverage": blocks.logical_pairs
                == logical_ordered_pairs(population),
                "active_pair_parity": blocks.active_root_pairs == exhaustive_active,
            }
        )
    return {
        "schema": "eom_stationary_block_exclusion_nested_control/v0",
        "authority": AUTHORITY,
        "cases": cases,
        "all_pass": all(
            case["complete_disjoint_coverage"] and case["active_pair_parity"]
            for case in cases
        ),
    }


def run_survey(*, quick: bool, include_native: bool, include_metal: bool) -> dict[str, Any]:
    repo = Path(__file__).resolve().parents[3]
    host_capabilities = capabilities()
    logical_cpus = int(host_capabilities["host"]["logical_cpu_count"] or 1)
    samples = 250_000 if quick else 4_000_000
    result: dict[str, Any] = {
        "schema": SCHEMA,
        "authority": AUTHORITY,
        "run_timestamp_utc": datetime.now(timezone.utc).isoformat(),
        "benchmark_mode": "quick" if quick else "full-local",
        "scope": {
            "measured": [
                "independent decimal-interval oracle cost",
                "NumPy binary64 bulk kernels",
                "local immutable-chunk write, fsync, read, and hash",
                "stationary-control exhaustive parity",
            ],
            "projected": [
                "dense ordered-pair row storage",
                "dense bulk-bound lower-limit wall time",
                "hot retained-history storage",
            ],
            "not_implemented": [
                "production EOM",
                "general moving-history certified block exclusion",
                "exact surviving-pair production root batches",
                "representative branch-divergence and precision-escalation frequencies",
                "distributed retained-history service",
                "multi-GPU execution",
                "atomic distributed accepted-window commit",
            ],
        },
        "capabilities": host_capabilities,
        "benchmark_source_digests": _source_digests(repo),
        "nested_exhaustive_control": _nested_control(),
        "numpy": numpy_baseline(samples),
        "independent_oracle": oracle_baseline(5 if quick else 25),
        "local_storage": storage_baseline(16 if quick else 128),
    }

    unavailable: list[dict[str, str]] = []
    if include_native and host_capabilities["toolchains"]["clang++"]:
        result["native_cpp"] = native_baselines(
            repo, quick=quick, logical_cpus=logical_cpus
        )
    else:
        unavailable.append({"backend": "native_cpp", "reason": "disabled_or_no_clang"})
    if include_metal and host_capabilities["toolchains"]["metal"]:
        try:
            result["metal"] = metal_baseline(repo, quick=quick)
        except (subprocess.SubprocessError, OSError, json.JSONDecodeError) as error:
            unavailable.append({"backend": "metal", "reason": str(error)})
    else:
        unavailable.append({"backend": "metal", "reason": "disabled_or_no_toolchain"})
    if not host_capabilities["toolchains"]["rustc"]:
        unavailable.append({"backend": "rust", "reason": "toolchain_not_installed"})
    unavailable.extend(
        (
            {"backend": "multi_gpu", "reason": "only_one_local_Metal_device"},
            {"backend": "distributed", "reason": "no_distributed_test_envelope"},
        )
    )
    result["unavailable_or_unmeasured"] = unavailable

    bulk_rates = [result["numpy"]["pair_classification"]["rows_per_second"]]
    if "native_cpp" in result:
        bulk_rates.append(
            result["native_cpp"]["auto_vector_reference"]["pair_classification"]
            ["rows_per_second"]
        )
    if "metal" in result:
        bulk_rates.append(result["metal"]["kernel_rows_per_second_wall"])
    measured_bulk_rate = max(bulk_rates)
    memory_budget = int(host_capabilities["host"]["memory_bytes"] * 0.75)
    result["scale_projection"] = {
        "measured_bulk_rows_per_second_used": measured_bulk_rate,
        "memory_budget_bytes": memory_budget,
        "wall_budget_seconds": 3600.0,
        "dense_pair_row_bytes_assumed": DENSE_PAIR_ROW_BYTES,
        "retained_history_segment_bytes_assumed": HOT_SEGMENT_BYTES,
        "populations": [
            {
                **dense_resource_projection(
                    population,
                    measured_bulk_rows_per_second=measured_bulk_rate,
                    memory_budget_bytes=memory_budget,
                    wall_budget_seconds=3600.0,
                ),
                "hot_history_bytes_H32": population * 32 * HOT_SEGMENT_BYTES,
                "hot_history_bytes_H128": population * 128 * HOT_SEGMENT_BYTES,
                "one_output_segment_bytes": population * HOT_SEGMENT_BYTES,
            }
            for population in POPULATION_LADDER
        ],
    }
    result["survey_disposition"] = {
        "local_baseline": "complete",
        "production_language_decision": "not_ready",
        "production_block_exclusion": "not_started",
        "existing_central_solver": "unchanged",
        "next_evidence": [
            "general moving-history certified block-bound prototype",
            "native exact-pair root/interpolation batch with oracle parity",
            "Rust representative kernel after toolchain availability",
            "Metal precision-escalation and difficult-row return feasibility decision",
            "multi-device and distributed receiver-owner benchmark envelope",
        ],
    }
    canonical = json.dumps(result, sort_keys=True, separators=(",", ":"))
    result["result_digest"] = hashlib.sha256(canonical.encode("utf-8")).hexdigest()
    return result


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--quick", action="store_true", help="run a short validation baseline")
    parser.add_argument("--skip-native", action="store_true")
    parser.add_argument("--skip-metal", action="store_true")
    parser.add_argument("--output", type=Path)
    parser.add_argument("--quiet", action="store_true", help="suppress JSON on stdout")
    arguments = parser.parse_args()
    result = run_survey(
        quick=arguments.quick,
        include_native=not arguments.skip_native,
        include_metal=not arguments.skip_metal,
    )
    payload = json.dumps(result, indent=2, sort_keys=True) + "\n"
    if arguments.output:
        arguments.output.parent.mkdir(parents=True, exist_ok=True)
        arguments.output.write_text(payload, encoding="utf-8")
    if not arguments.quiet:
        print(payload, end="")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
