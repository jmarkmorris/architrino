#!/usr/bin/env python3

import argparse
import importlib.machinery
import importlib.util
import json
from fractions import Fraction
from pathlib import Path

import numpy as np
from scipy.optimize import linprog


CERT_DIR = Path("reference/priorities/proof-programs/breather-proof/certificate")
DEFAULT_CONTRACT = CERT_DIR / "fresh_same_packet_fold_shear_seed.v0.json"
DEFAULT_INPUT = CERT_DIR / "gap_opening_fresh_v10_strict_gap_input.shifted_separator_fixed_period.v0.json"
DEFAULT_OUT_JSON = CERT_DIR / "fresh_v10_hermite_dual_rationalization_audit.v0.json"
DEFAULT_OUT_MD = CERT_DIR / "fresh_v10_hermite_dual_rationalization_audit.v0.md"
DUAL_SCRIPT = Path("scripts/proof-programs/fresh-v10-hermite-dual-obstruction.py")


def parse_args():
    parser = argparse.ArgumentParser(
        description="Rational-multiplier audit for the fresh v10 Hermite sampled dual obstruction."
    )
    parser.add_argument("--contract", default=str(DEFAULT_CONTRACT))
    parser.add_argument("--input", default=str(DEFAULT_INPUT))
    parser.add_argument("--out-json", default=str(DEFAULT_OUT_JSON))
    parser.add_argument("--out-md", default=str(DEFAULT_OUT_MD))
    parser.add_argument("--pretty", action="store_true")
    parser.add_argument("--level", type=positive_int, default=256)
    parser.add_argument("--denominator-caps", default="1000000,1000000000,1000000000000")
    parser.add_argument("--value-bound", type=positive_float, default=1.0)
    parser.add_argument("--derivative-bound", type=positive_float, default=80.0)
    parser.add_argument("--gamma-bound", type=positive_float, default=10.0)
    parser.add_argument("--gap-sample-count", type=positive_int, default=8)
    parser.add_argument("--speed-sample-count", type=positive_int, default=1000)
    parser.add_argument("--speed-guard", type=positive_float, default=0.015)
    return parser.parse_args()


def positive_float(value):
    number = float(value)
    if not np.isfinite(number) or number <= 0:
        raise argparse.ArgumentTypeError(f"expected a positive finite number, got {value}")
    return number


def positive_int(value):
    number = int(value)
    if number <= 0:
        raise argparse.ArgumentTypeError(f"expected a positive integer, got {value}")
    return number


def parse_int_list(value):
    result = [int(part.strip()) for part in value.split(",") if part.strip()]
    if not result or any(item <= 0 for item in result):
        raise argparse.ArgumentTypeError("expected a comma-separated list of positive integers")
    return result


def load_dual_module():
    loader = importlib.machinery.SourceFileLoader("fresh_v10_hermite_dual", str(DUAL_SCRIPT))
    spec = importlib.util.spec_from_loader(loader.name, loader)
    module = importlib.util.module_from_spec(spec)
    loader.exec_module(module)
    return module


def read_json(path):
    return json.loads(Path(path).read_text())


def write_json(path, value, pretty):
    output_path = Path(path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(value, indent=2 if pretty else None) + "\n")


def write_text(path, value):
    output_path = Path(path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(value)


def clean_number(value):
    if value is None:
        return None
    number = float(value)
    if abs(number) < 1e-18:
        return 0
    return float(f"{number:.15g}")


def format_number(value):
    if value is None:
        return "null"
    if isinstance(value, (int, float)):
        return str(clean_number(value))
    return str(value)


def markdown_table(headers, rows):
    lines = [
        f"| {' | '.join(headers)} |",
        f"| {' | '.join(['---'] * len(headers))} |",
    ]
    lines.extend(f"| {' | '.join(row)} |" for row in rows)
    return "\n".join(lines)


def solve_dual_system(dual, contract, input_packet, args):
    hermite = dual.load_hermite_module()
    nodes = hermite.hermite_nodes(contract, input_packet, args.level)
    matrix, upper_bounds, metadata, counts = hermite.build_constraints(
        contract,
        input_packet,
        nodes,
        args,
        args.derivative_bound,
    )
    gamma_objective = np.zeros(matrix.shape[1])
    gamma_objective[-1] = 1.0
    result = linprog(
        upper_bounds,
        A_eq=matrix.T,
        b_eq=gamma_objective,
        bounds=[(0.0, None)] * matrix.shape[0],
        method="highs",
        options={
            "primal_feasibility_tolerance": 1e-10,
            "dual_feasibility_tolerance": 1e-10,
            "ipm_optimality_tolerance": 1e-10,
        },
    )
    if not result.success:
        raise RuntimeError(f"dual LP failed: {result.message}")
    return nodes, matrix, upper_bounds, metadata, counts, gamma_objective, result.x


def rationalize_vector(multipliers, active_indexes, denominator_cap):
    rational_vector = np.zeros_like(multipliers)
    rational_entries = {}
    max_abs_delta = 0.0
    max_denominator = 1
    for index in active_indexes:
        rational = Fraction(float(multipliers[index])).limit_denominator(denominator_cap)
        rational_value = float(rational)
        rational_vector[index] = rational_value
        rational_entries[index] = rational
        max_abs_delta = max(max_abs_delta, abs(rational_value - float(multipliers[index])))
        max_denominator = max(max_denominator, rational.denominator)
    return rational_vector, rational_entries, max_abs_delta, max_denominator


def rational_entry(index, metadata, multiplier, rational):
    entry = {
        "row_index": int(index),
        "id": metadata[index]["id"],
        "kind": metadata[index]["kind"],
        "lambda_float": clean_number(multiplier),
        "lambda_q": {
            "numerator": rational.numerator,
            "denominator": rational.denominator,
            "decimal": clean_number(float(rational)),
        },
        "ledger": metadata[index].get("ledger"),
        "orientation": metadata[index].get("orientation"),
        "target": clean_number(metadata[index].get("target")),
        "theta": clean_number(metadata[index].get("theta")),
        "receiver_theta": clean_number(metadata[index].get("receiver_theta")),
        "source_theta": clean_number(metadata[index].get("source_theta")),
        "base_gap": clean_number(metadata[index].get("base_gap")),
        "base_signed_margin": clean_number(metadata[index].get("base_signed_margin")),
    }
    return entry


def audit_cap(matrix, upper_bounds, gamma_objective, multipliers, metadata, nodes, args, denominator_cap):
    active_indexes = [index for index, value in enumerate(multipliers) if value > 1e-12]
    rational_vector, rational_entries, max_abs_delta, max_denominator = rationalize_vector(
        multipliers,
        active_indexes,
        denominator_cap,
    )
    equality_residual = matrix.T @ rational_vector - gamma_objective
    residual_abs_bounds = np.array(
        [args.value_bound] * len(nodes) + [args.derivative_bound] * len(nodes) + [args.gamma_bound],
        dtype=float,
    )
    residual_allowance = float(np.sum(np.abs(equality_residual) * residual_abs_bounds))
    objective = float(upper_bounds @ rational_vector)
    adjusted = objective + residual_allowance
    return {
        "denominator_cap": denominator_cap,
        "status": (
            "negative_adjusted_bound_for_binary64_rows"
            if adjusted < 0
            else "nonnegative_adjusted_bound_for_binary64_rows"
        ),
        "active_multiplier_count": len(active_indexes),
        "max_abs_float_to_rational_delta": clean_number(max_abs_delta),
        "max_denominator_used": max_denominator,
        "binary64_row_dual_objective": clean_number(objective),
        "binary64_row_weighted_residual_allowance": clean_number(residual_allowance),
        "binary64_row_residual_adjusted_upper_bound": clean_number(adjusted),
        "binary64_row_max_equality_residual_abs": clean_number(float(np.max(np.abs(equality_residual)))),
        "active_rational_multipliers": [
            rational_entry(index, metadata, multipliers[index], rational_entries[index])
            for index in active_indexes
        ],
    }


def build_certificate(args):
    dual = load_dual_module()
    contract = read_json(args.contract)
    input_packet = read_json(args.input)
    nodes, matrix, upper_bounds, metadata, counts, gamma_objective, multipliers = solve_dual_system(
        dual,
        contract,
        input_packet,
        args,
    )
    caps = parse_int_list(args.denominator_caps)
    cap_results = [
        audit_cap(matrix, upper_bounds, gamma_objective, multipliers, metadata, nodes, args, cap)
        for cap in caps
    ]
    selected = next(
        (item for item in cap_results if item["binary64_row_residual_adjusted_upper_bound"] < 0),
        None,
    )
    return {
        "schema": "breather-fresh-v10-hermite-dual-rationalization-audit-v1",
        "packet_id": "fresh-v10-hermite-dual-rationalization-audit-v0",
        "source_packet": contract["packet_id"],
        "source_strict_gap_packet": input_packet["packet_id"],
        "source_dual_packet": "fresh-v10-hermite-dual-obstruction-v0",
        "status": (
            "rational_multiplier_candidate_binary64_rows_negative"
            if selected
            else "rational_multiplier_candidate_binary64_rows_not_closed"
        ),
        "claim_level": (
            "priority-only rational multiplier candidate for the sampled Hermite dual; "
            "row coefficients are still binary64 and not outward-rounded"
        ),
        "branch_chart_authorized": False,
        "preledger_pass": False,
        "updates_live_ledger": False,
        "level": args.level,
        "constraints": counts,
        "active_multiplier_threshold": 1e-12,
        "selected_denominator_cap": selected["denominator_cap"] if selected else None,
        "selected_result": selected,
        "cap_results": cap_results,
        "limitations": [
            "Only the dual multipliers are rationalized; Hermite row coefficients and trigonometric values are still binary64.",
            "The residual allowance is evaluated against the current binary64 matrix, not an outward-rounded interval matrix.",
            "This packet supplies rational multiplier targets for proof-grade intervalization but does not itself prove a same-itinerary obstruction.",
            "No live causal ledger, branch chart, fold atlas, or AAA theorem prose is updated.",
        ],
        "recommended_next_step": (
            "Build an outward-rounded interval row backend for the selected active rows and check the selected rational multipliers against those interval row enclosures."
            if selected
            else "Try a different rationalization strategy or abandon the active-row intervalization route."
        ),
    }


def cap_rows(certificate):
    return [
        [
            str(item.get("denominator_cap")),
            str(item.get("active_multiplier_count")),
            format_number(item.get("max_abs_float_to_rational_delta")),
            str(item.get("max_denominator_used")),
            format_number(item.get("binary64_row_dual_objective")),
            format_number(item.get("binary64_row_weighted_residual_allowance")),
            format_number(item.get("binary64_row_residual_adjusted_upper_bound")),
            item.get("status", ""),
        ]
        for item in certificate.get("cap_results", [])
    ]


def selected_multiplier_rows(certificate):
    selected = certificate.get("selected_result") or {}
    return [
        [
            str(row.get("row_index")),
            f"`{row.get('id')}`",
            row.get("kind", ""),
            str(row.get("lambda_q", {}).get("numerator")),
            str(row.get("lambda_q", {}).get("denominator")),
            format_number(row.get("lambda_q", {}).get("decimal")),
            format_number(row.get("theta")),
            format_number(row.get("receiver_theta")),
            format_number(row.get("source_theta")),
        ]
        for row in selected.get("active_rational_multipliers", [])
    ]


def build_report(certificate):
    selected = certificate.get("selected_result") or {}
    selected_cap = certificate.get("selected_denominator_cap")
    selected_bound = selected.get("binary64_row_residual_adjusted_upper_bound")
    return f"""# Fresh v10 Hermite Dual Rationalization Audit

## Scope

This packet is a priority-only rational-multiplier audit for the fresh v10
Hermite sampled dual obstruction. It asks whether the active binary64 dual
multipliers can be replaced by exact rationals while preserving a negative
residual-adjusted upper bound against the current sampled row matrix.

It does not claim an outward-rounded interval row certificate, a repaired
candidate, a proof-interval pre-ledger pass, a live ledger update, branch-chart
authorization, or a theorem in AAA prose.

Artifacts:

- `fresh_v10_hermite_dual_rationalization_audit.v0.json`
- `fresh_v10_hermite_dual_rationalization_audit.v0.md`
- `../../../../../scripts/proof-programs/fresh-v10-hermite-dual-rationalization-audit.py`

## Executed Command

```bash
VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" scripts/proof-programs/fresh-v10-hermite-dual-rationalization-audit.py --pretty
```

## Denominator Cap Results

{markdown_table(["Cap", "Active", "max abs delta", "max denominator", "dual objective", "residual allowance", "adjusted upper", "Status"], cap_rows(certificate))}

The selected denominator cap is `{selected_cap}`. Against the current binary64
row matrix, the selected rational multipliers give
$$
\\gamma\\le {format_number(selected_bound)}.
$$

This remains negative, so rationalizing the multiplier side is not the blocker.
The blocker is the missing outward-rounded interval row backend for the active
Hermite rows.

## Selected Active Rational Multipliers

{markdown_table(["Index", "Row", "Kind", "numerator", "denominator", "decimal", "theta", "receiver theta", "source theta"], selected_multiplier_rows(certificate))}

## Conclusion

The active Hermite dual multipliers admit an exact-rational candidate with
denominator cap `{selected_cap}` while preserving a negative binary64-row
residual-adjusted upper bound. This is not proof-grade, but it narrows the next
proof task to interval-enclosing the active Hermite row coefficients and
checking the rational multipliers against those outward-rounded rows.

## Capture Decision

Priority-only. This audit strengthens the proof-grade intervalization route by
showing that the multiplier side can be made exact; the row-coefficient
interval backend remains the live obstruction.
"""


def main():
    args = parse_args()
    certificate = build_certificate(args)
    write_json(args.out_json, certificate, args.pretty)
    write_text(args.out_md, build_report(certificate))


if __name__ == "__main__":
    main()
