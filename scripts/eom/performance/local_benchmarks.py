"""Local CPU, accelerator, oracle, and storage probes for the EOM survey."""

from __future__ import annotations

import hashlib
import json
import os
import platform
import shutil
import statistics
import subprocess
import tempfile
import time
from pathlib import Path
from typing import Any

import numpy as np
import psutil

from scripts.eom.oracle.certified_history import (
    CubicHistorySegment,
    PiecewisePolynomialHistory,
    certify_causal_roots,
)

from .baseline_model import AUTHORITY, POPULATION_LADDER


def median_measure(operation: Any, repeats: int = 5) -> tuple[float, Any]:
    timings: list[float] = []
    witness: Any = None
    for _ in range(repeats):
        start = time.perf_counter()
        witness = operation()
        timings.append(time.perf_counter() - start)
    return float(np.median(np.asarray(timings))), witness


def numpy_baseline(samples: int) -> dict[str, Any]:
    index = np.arange(samples, dtype=np.int64)
    receiver = (index % 4096).astype(np.float64) * 0.125
    source = ((index * 104729 + 17) % 4096).astype(np.float64) * 0.125
    elapsed, classification = median_measure(
        lambda: np.greater(np.abs(receiver - source), 1.0), repeats=5
    )
    excluded = int(np.count_nonzero(classification))
    local_time = (index % 1000).astype(np.float64) / 1000.0
    elapsed_interpolation, interpolation = median_measure(
        lambda: ((0.125 * local_time - 0.25) * local_time + 0.5) * local_time
        + 1.0,
        repeats=5,
    )
    pair_values = np.where(index % 2 == 0, 1.0, -1.0) / ((index % 1024) + 1)
    elapsed_reduction, reduction = median_measure(
        lambda: float(np.sum(pair_values, dtype=np.float64)), repeats=5
    )
    return {
        "schema": "eom_numpy_kernel_baseline/v0",
        "authority": AUTHORITY,
        "numeric_format": "binary64",
        "pair_classification": {
            "rows": samples,
            "excluded": excluded,
            "seconds_median": elapsed,
            "rows_per_second": samples / elapsed,
            "estimated_stream_bytes_per_second": samples * 17 / elapsed,
        },
        "history_interpolation": {
            "rows": samples,
            "seconds_median": elapsed_interpolation,
            "rows_per_second": samples / elapsed_interpolation,
            "witness": float(interpolation[samples // 2]),
        },
        "numpy_reduction": {
            "values": samples,
            "seconds_median": elapsed_reduction,
            "values_per_second": samples / elapsed_reduction,
            "sum": reduction,
            "limit": "NumPy reduction order is not the production deterministic tree.",
        },
    }


def _history(history_id: str, x: tuple[str, str, str, str]) -> PiecewisePolynomialHistory:
    segment = CubicHistorySegment.from_decimal_tokens(
        t_start="0",
        t_end="5",
        coefficients=(x, ("0", "0", "0", "0"), ("0", "0", "0", "0")),
        precision=90,
    )
    return PiecewisePolynomialHistory.from_segments((segment,), history_id=history_id)


def oracle_baseline(iterations: int) -> dict[str, Any]:
    receiver = _history("baseline-receiver", ("0", "0", "0", "0"))
    source = _history("baseline-source", ("2", "0", "0", "0"))

    def certify() -> Any:
        return certify_causal_roots(
            receiver=receiver,
            source=source,
            reception_time="5",
            field_speed="1",
            search_lower="0",
            search_upper="4.5",
            root_tolerance="1e-30",
        )

    start = time.perf_counter()
    certificates = [certify() for _ in range(iterations)]
    root_seconds = time.perf_counter() - start
    segment = source.segments[0]
    times = [
        segment.t_start + (segment.t_end - segment.t_start) * index / iterations
        for index in range(iterations)
    ]
    start = time.perf_counter()
    states = [segment.nominal_state(value) for value in times]
    interpolation_seconds = time.perf_counter() - start
    return {
        "schema": "eom_independent_oracle_cost_baseline/v0",
        "authority": AUTHORITY,
        "numeric_format": "decimal_interval_90_digits",
        "root_certification": {
            "ordered_pairs": iterations,
            "seconds": root_seconds,
            "pairs_per_second": iterations / root_seconds,
            "all_complete": all(value.status == "certified_complete" for value in certificates),
            "root_count_each": len(certificates[0].roots),
            "visited_cells_each": certificates[0].visited_cells,
        },
        "history_interpolation": {
            "states": iterations,
            "seconds": interpolation_seconds,
            "states_per_second": iterations / interpolation_seconds,
            "witness": str(states[-1][0][0]),
        },
        "limit": "Correctness-first per-pair oracle cost; not a production throughput path.",
    }


def storage_baseline(mebibytes: int) -> dict[str, Any]:
    total_bytes = mebibytes * 1024 * 1024
    chunk = bytes(8 * 1024 * 1024)
    with tempfile.TemporaryDirectory(prefix="eom-storage-baseline-") as directory:
        path = Path(directory) / "immutable-history-chunk.bin"
        start = time.perf_counter()
        with path.open("wb", buffering=0) as handle:
            remaining = total_bytes
            while remaining:
                count = min(remaining, len(chunk))
                handle.write(chunk[:count])
                remaining -= count
            os.fsync(handle.fileno())
        write_seconds = time.perf_counter() - start
        digest = hashlib.sha256()
        start = time.perf_counter()
        with path.open("rb", buffering=0) as handle:
            while data := handle.read(len(chunk)):
                digest.update(data)
        read_seconds = time.perf_counter() - start
    return {
        "schema": "eom_local_storage_baseline/v0",
        "authority": AUTHORITY,
        "bytes": total_bytes,
        "write_fsync_seconds": write_seconds,
        "write_bytes_per_second": total_bytes / write_seconds,
        "read_hash_seconds": read_seconds,
        "read_hash_bytes_per_second": total_bytes / read_seconds,
        "sha256": digest.hexdigest(),
        "limit": "Local temporary storage only; no distributed history or streamed manifest test.",
    }


def _run_json(command: list[str], *, timeout: int = 180) -> dict[str, Any]:
    completed = subprocess.run(
        command, check=True, capture_output=True, text=True, timeout=timeout
    )
    return json.loads(completed.stdout)


def _compile_native(source: Path, output: Path, *, vectorized: bool) -> list[str]:
    flags = [
        "clang++", "-std=c++20", "-O3", "-march=native", "-fno-fast-math", "-pthread"
    ]
    if not vectorized:
        flags.extend(("-fno-vectorize", "-fno-slp-vectorize"))
    subprocess.run(
        [*flags, str(source), "-o", str(output)],
        check=True,
        capture_output=True,
        text=True,
        timeout=180,
    )
    return flags[1:]


def _native_run(
    binary: Path,
    *,
    population: int,
    threads: int,
    spacing: float,
    samples: int,
) -> dict[str, Any]:
    return _run_json(
        [
            str(binary), "--population", str(population), "--threads", str(threads),
            "--spacing", str(spacing), "--leaf-size", "8", "--pair-samples",
            str(samples), "--interpolation-samples", str(samples), "--reduction-size",
            str(min(samples, 2_000_000)),
        ]
    )


def _median_native_runs(results: list[dict[str, Any]]) -> dict[str, Any]:
    reference = json.loads(json.dumps(results[0]))
    for result in results[1:]:
        for field in ("population", "threads", "spacing", "leaf_size", "logical_ordered_pairs"):
            if result[field] != reference[field]:
                raise ValueError("native median inputs disagree")
        for section, count_fields in (
            ("block_traversal", ("visited_nodes", "excluded_pairs", "exact_fallback_pairs", "active_root_pairs")),
            ("pair_classification", ("rows", "excluded")),
            ("history_interpolation", ("rows",)),
            ("fixed_pairwise_reduction", ("values", "sum")),
        ):
            if any(result[section][field] != reference[section][field] for field in count_fields):
                raise ValueError(f"native {section} deterministic outputs disagree")
    for section in (
        "block_traversal",
        "pair_classification",
        "history_interpolation",
        "fixed_pairwise_reduction",
    ):
        reference[section]["seconds"] = statistics.median(
            result[section]["seconds"] for result in results
        )
    reference["pair_classification"]["rows_per_second"] = (
        reference["pair_classification"]["rows"]
        / reference["pair_classification"]["seconds"]
    )
    reference["history_interpolation"]["rows_per_second"] = (
        reference["history_interpolation"]["rows"]
        / reference["history_interpolation"]["seconds"]
    )
    reference["fixed_pairwise_reduction"]["values_per_second"] = (
        reference["fixed_pairwise_reduction"]["values"]
        / reference["fixed_pairwise_reduction"]["seconds"]
    )
    reference["outer_process_repeats"] = len(results)
    return reference


def native_baselines(repo: Path, *, quick: bool, logical_cpus: int) -> dict[str, Any]:
    source = repo / "scripts/eom/performance/native_kernel_baseline.cpp"
    samples = 500_000 if quick else 8_000_000
    populations = (10_000, 100_000) if quick else POPULATION_LADDER
    max_threads = min(logical_cpus, 8)
    thread_ladder = tuple(value for value in (1, 2, 4, 8) if value <= max_threads)
    with tempfile.TemporaryDirectory(prefix="eom-native-baseline-") as directory:
        auto_binary = Path(directory) / "native-auto"
        scalar_binary = Path(directory) / "native-scalar"
        auto_flags = _compile_native(source, auto_binary, vectorized=True)
        scalar_flags = _compile_native(source, scalar_binary, vectorized=False)
        auto_reference = _median_native_runs(
            [
                _native_run(
                    auto_binary,
                    population=10_000,
                    threads=1,
                    spacing=2.0,
                    samples=samples,
                )
                for _ in range(5)
            ]
        )
        scalar_reference = _median_native_runs(
            [
                _native_run(
                    scalar_binary,
                    population=10_000,
                    threads=1,
                    spacing=2.0,
                    samples=samples,
                )
                for _ in range(5)
            ]
        )
        population_ladder = [
            _native_run(
                auto_binary,
                population=population,
                threads=max_threads,
                spacing=2.0,
                samples=max(100_000, samples // 8),
            )
            for population in populations
        ]
        largest_population = populations[-1]
        thread_scaling = [
            _native_run(
                auto_binary,
                population=largest_population,
                threads=threads,
                spacing=2.0,
                samples=100_000,
            )
            for threads in thread_ladder
        ]
        active_control = _native_run(
            auto_binary,
            population=10_000,
            threads=max_threads,
            spacing=0.25,
            samples=max(100_000, samples // 8),
        )
    auto_pair_rate = auto_reference["pair_classification"]["rows_per_second"]
    scalar_pair_rate = scalar_reference["pair_classification"]["rows_per_second"]
    auto_interp_rate = auto_reference["history_interpolation"]["rows_per_second"]
    scalar_interp_rate = scalar_reference["history_interpolation"]["rows_per_second"]
    single = thread_scaling[0]["block_traversal"]["seconds"]
    return {
        "schema": "eom_native_architecture_survey/v0",
        "authority": AUTHORITY,
        "candidate_language": "C++20",
        "compiler_version": subprocess.run(
            ["clang++", "--version"],
            check=True,
            capture_output=True,
            text=True,
            timeout=30,
        ).stdout.strip(),
        "auto_vector_flags": auto_flags,
        "scalar_flags": scalar_flags,
        "auto_vector_reference": auto_reference,
        "scalar_reference": scalar_reference,
        "candidate_vector_gain": {
            "pair_classification": auto_pair_rate / scalar_pair_rate,
            "history_interpolation": auto_interp_rate / scalar_interp_rate,
            "limit": "Compiler auto-vector candidate gain; no instruction-counter proof of SIMD use.",
        },
        "sparse_population_ladder": population_ladder,
        "sparse_thread_scaling": [
            {
                **result,
                "block_speedup_vs_one_thread": single / result["block_traversal"]["seconds"],
            }
            for result in thread_scaling
        ],
        "active_local_control": active_control,
        "control_geometry": {
            "model": "stationary one-dimensional retained histories",
            "reception_time": 1.0,
            "emission_delay_interval": [0.0, 1.0],
            "field_speed": 1.0,
            "sparse_spacing": 2.0,
            "active_control_spacing": 0.25,
            "outward_rounding": "binary64 nextafter on lower distance and causal reach",
            "promotion_limit": "Not valid for general moving or polynomial retained histories.",
        },
    }


def metal_baseline(repo: Path, *, quick: bool) -> dict[str, Any]:
    source = repo / "scripts/eom/performance/metal_bound_baseline.swift"
    pairs = 500_000 if quick else 8_000_000
    with tempfile.TemporaryDirectory(prefix="eom-metal-baseline-") as directory:
        binary = Path(directory) / "metal-bound-baseline"
        compile_command = [
            "xcrun", "swiftc", "-O", "-framework", "Metal", str(source), "-o", str(binary)
        ]
        subprocess.run(
            compile_command,
            check=True,
            capture_output=True,
            text=True,
            timeout=180,
        )
        result = _run_json([str(binary), "--pairs", str(pairs), "--repeats", "5"])
    result["compile_command"] = compile_command[:-2] + ["-o", "<temporary-binary>"]
    result["compiler_version"] = subprocess.run(
        ["xcrun", "swiftc", "--version"],
        check=True,
        capture_output=True,
        text=True,
        timeout=30,
    ).stdout.strip()
    return result


def capabilities() -> dict[str, Any]:
    memory = psutil.virtual_memory()
    return {
        "host": {
            "platform": platform.platform(),
            "machine": platform.machine(),
            "python": platform.python_version(),
            "logical_cpu_count": os.cpu_count(),
            "physical_cpu_count": psutil.cpu_count(logical=False),
            "memory_bytes": memory.total,
        },
        "toolchains": {
            "clang++": shutil.which("clang++"),
            "rustc": shutil.which("rustc"),
            "cargo": shutil.which("cargo"),
            "swiftc": shutil.which("swiftc") or shutil.which("xcrun"),
            "metal": shutil.which("metal") or shutil.which("xcrun"),
        },
        "python_runtime": {"numpy": np.__version__, "psutil": psutil.__version__},
    }
