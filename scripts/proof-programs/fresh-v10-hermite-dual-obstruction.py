#!/usr/bin/env python3

import argparse
import importlib.machinery
import importlib.util
import json
from pathlib import Path

import numpy as np
from scipy.optimize import linprog


CERT_DIR = Path("reference/priorities/proof-programs/breather-proof/certificate")
DEFAULT_CONTRACT = CERT_DIR / "fresh_same_packet_fold_shear_seed.v0.json"
DEFAULT_INPUT = CERT_DIR / "gap_opening_fresh_v10_strict_gap_input.shifted_separator_fixed_period.v0.json"
DEFAULT_OUT_JSON = CERT_DIR / "fresh_v10_hermite_dual_obstruction.v0.json"
DEFAULT_OUT_MD = CERT_DIR / "fresh_v10_hermite_dual_obstruction.v0.md"
HERMIT_SCREEN_SCRIPT = Path("scripts/proof-programs/fresh-v10-hermite-itinerary-gap-boundary-screen.py")
ACTIVE_MULTIPLIER_THRESHOLD = 1e-12


def parse_args():
    parser = argparse.ArgumentParser(
        description="Numerical dual obstruction for the fresh v10 Hermite finite-itinerary screen."
    )
    parser.add_argument("--contract", default=str(DEFAULT_CONTRACT))
    parser.add_argument("--input", default=str(DEFAULT_INPUT))
    parser.add_argument("--out-json", default=str(DEFAULT_OUT_JSON))
    parser.add_argument("--out-md", default=str(DEFAULT_OUT_MD))
    parser.add_argument("--pretty", action="store_true")
    parser.add_argument("--levels", default="64,96,128,160,192,224,256")
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


def load_hermite_module():
    loader = importlib.machinery.SourceFileLoader("fresh_v10_hermite_screen", str(HERMIT_SCREEN_SCRIPT))
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


def multiplier_summary(index, multiplier, metadata):
    entry = metadata[index]
    return {
        "row_index": index,
        "id": entry["id"],
        "kind": entry["kind"],
        "lambda": clean_number(multiplier),
        "ledger": entry.get("ledger"),
        "orientation": entry.get("orientation"),
        "target": clean_number(entry.get("target")),
        "theta": clean_number(entry.get("theta")),
        "receiver_theta": clean_number(entry.get("receiver_theta")),
        "source_theta": clean_number(entry.get("source_theta")),
        "base_gap": clean_number(entry.get("base_gap")),
        "base_signed_margin": clean_number(entry.get("base_signed_margin")),
    }


def active_multipliers(multipliers, metadata):
    return [
        multiplier_summary(index, value, metadata)
        for index, value in enumerate(multipliers)
        if value > ACTIVE_MULTIPLIER_THRESHOLD
    ]


def dominant_multipliers(multipliers, metadata, count=12):
    indexes = [index for index, value in enumerate(multipliers) if value > ACTIVE_MULTIPLIER_THRESHOLD]
    indexes = sorted(indexes, key=lambda index: multipliers[index], reverse=True)[:count]
    return [multiplier_summary(index, multipliers[index], metadata) for index in indexes]


def multiplier_counts_by_kind(multipliers, metadata):
    counts = {}
    for index, value in enumerate(multipliers):
        if value <= ACTIVE_MULTIPLIER_THRESHOLD:
            continue
        kind = metadata[index]["kind"]
        counts[kind] = counts.get(kind, 0) + 1
    return counts


def solve_dual_for_level(hermite, contract, input_packet, args, level):
    nodes = hermite.hermite_nodes(contract, input_packet, level)
    matrix, upper_bounds, metadata, counts = hermite.build_constraints(
        contract,
        input_packet,
        nodes,
        args,
        args.derivative_bound,
    )
    variable_count = matrix.shape[1]
    gamma_objective = np.zeros(variable_count)
    gamma_objective[-1] = 1.0
    primal_result = linprog(
        -gamma_objective,
        A_ub=matrix,
        b_ub=upper_bounds,
        bounds=[(None, None)] * variable_count,
        method="highs",
        options={
            "primal_feasibility_tolerance": 1e-10,
            "dual_feasibility_tolerance": 1e-10,
            "ipm_optimality_tolerance": 1e-10,
        },
    )
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

    base = {
        "uniform_half_grid_count": level,
        "node_count": len(nodes),
        "primal_variable_count": variable_count,
        "dual_variable_count": int(matrix.shape[0]),
        "constraints": counts,
    }
    if not primal_result.success:
        return {
            **base,
            "status": "row_only_primal_lp_solver_failed",
            "solver": {
                "success": False,
                "status_code": int(primal_result.status),
                "message": primal_result.message,
            },
        }
    if not result.success:
        return {
            **base,
            "status": "dual_lp_solver_failed",
            "solver": {
                "success": False,
                "status_code": int(result.status),
                "message": result.message,
            },
        }

    multipliers = result.x
    equality_residual = matrix.T @ multipliers - gamma_objective
    residual_abs_bounds = np.array(
        [args.value_bound] * len(nodes) + [args.derivative_bound] * len(nodes) + [args.gamma_bound],
        dtype=float,
    )
    residual_allowance = float(np.sum(np.abs(equality_residual) * residual_abs_bounds))
    dual_objective = float(upper_bounds @ multipliers)
    row_only_primal_gamma = float(gamma_objective @ primal_result.x)
    primal_slacks = upper_bounds - matrix @ primal_result.x
    complementarity = multipliers * primal_slacks
    residual_adjusted_upper_bound = dual_objective + residual_allowance
    status = (
        "negative_upper_bound_with_float_residual_allowance"
        if residual_adjusted_upper_bound < 0
        else "nonnegative_after_float_residual_allowance"
    )

    return {
        **base,
        "status": status,
        "solver": {
            "method": "scipy.optimize.linprog(method='highs')",
            "success": True,
            "status_code": int(result.status),
            "message": result.message,
            "row_only_primal_gamma": clean_number(row_only_primal_gamma),
            "dual_objective_upper_bound": clean_number(dual_objective),
            "primal_dual_gap": clean_number(dual_objective - row_only_primal_gamma),
            "max_equality_residual_abs": clean_number(float(np.max(np.abs(equality_residual)))),
            "weighted_residual_allowance": clean_number(residual_allowance),
            "residual_adjusted_upper_bound": clean_number(residual_adjusted_upper_bound),
            "min_multiplier": clean_number(float(np.min(multipliers))),
            "dual_nonnegativity_violation": clean_number(float(max(0.0, -np.min(multipliers)))),
            "max_complementarity_abs": clean_number(float(np.max(np.abs(complementarity)))),
            "nonzero_multiplier_count": int(np.count_nonzero(multipliers > ACTIVE_MULTIPLIER_THRESHOLD)),
            "nonzero_multiplier_counts_by_kind": multiplier_counts_by_kind(multipliers, metadata),
            "active_multiplier_threshold": ACTIVE_MULTIPLIER_THRESHOLD,
        },
        "active_multipliers": active_multipliers(multipliers, metadata),
        "dominant_multipliers": dominant_multipliers(multipliers, metadata),
    }


def build_certificate(contract, input_packet, args):
    hermite = load_hermite_module()
    levels = parse_int_list(args.levels)
    level_results = [solve_dual_for_level(hermite, contract, input_packet, args, level) for level in levels]
    successful = [item for item in level_results if item.get("solver", {}).get("success")]
    failed_adjusted = [
        item for item in successful if item["solver"]["residual_adjusted_upper_bound"] >= 0
    ]
    tightest = max(
        successful,
        key=lambda item: item["solver"]["residual_adjusted_upper_bound"],
    ) if successful else None
    status = (
        "sampled_dual_obstruction_float_certified_for_tested_levels"
        if successful and not failed_adjusted
        else "sampled_dual_obstruction_not_closed_for_all_tested_levels"
    )
    return {
        "schema": "breather-fresh-v10-hermite-dual-obstruction-v1",
        "packet_id": "fresh-v10-hermite-dual-obstruction-v0",
        "source_packet": contract["packet_id"],
        "source_strict_gap_packet": input_packet["packet_id"],
        "source_screen_packet": "fresh-v10-hermite-itinerary-gap-boundary-screen-v0",
        "status": status,
        "claim_level": (
            "priority-only finite sampled numerical dual obstruction for the Hermite same-itinerary LP; "
            "not rationalized or outward-rounded"
        ),
        "branch_chart_authorized": False,
        "preledger_pass": False,
        "updates_live_ledger": False,
        "dual_model": {
            "primal_form": "max gamma subject to A x <= b over the sampled Hermite LP row system",
            "dual_form": "min b^T lambda subject to A^T lambda = e_gamma and lambda >= 0",
            "gamma_bound": f"not a proof row; used only for binary64 residual-inflation budget: {args.gamma_bound}",
            "value_bound": args.value_bound,
            "derivative_bound": args.derivative_bound,
            "levels": levels,
            "gap_sample_count_per_interval": args.gap_sample_count + 1,
            "speed_midpoint_samples": args.speed_sample_count,
            "speed_guard_value": args.speed_guard,
            "float_residual_allowance": (
                "The residual-adjusted upper bound adds |A^T lambda-e_gamma| dotted with the declared "
                "value/derivative box bounds and the disclosed gamma residual cap. This is a binary64 "
                "numerical allowance, not an interval proof or an added proof row."
            ),
        },
        "level_results": level_results,
        "tightest_residual_adjusted_upper_bound": tightest,
        "limitations": [
            "The multipliers are binary64 numerical dual data, not exact rational or outward-rounded interval multipliers.",
            "The obstruction applies only to the finite sampled Hermite LP levels listed here.",
            "The gamma residual cap is a numerical residual budget, not a sampled proof-row constraint.",
            "The sampled LP keeps field-speed signs only at retained samples outside the declared guard.",
            "No live causal ledger, branch chart, fold atlas, or AAA theorem prose is updated.",
        ],
        "conclusion": (
            "For every tested level, the numerical dual multipliers give a residual-adjusted negative upper bound on the sampled strict-gap margin."
            if successful and not failed_adjusted
            else "At least one tested level lacks a residual-adjusted negative numerical dual upper bound."
        ),
        "recommended_next_step": (
            "Rationalize or outward-round the active dual rows if a proof-grade same-itinerary obstruction is needed; otherwise make the itinerary/structural ansatz decision."
        ),
    }


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


def level_rows(certificate):
    rows = []
    for item in certificate.get("level_results", []):
        solver = item.get("solver", {})
        rows.append(
            [
                str(item.get("uniform_half_grid_count")),
                str(item.get("node_count")),
                str(item.get("primal_variable_count")),
                str(item.get("dual_variable_count")),
                format_number(solver.get("row_only_primal_gamma")),
                format_number(solver.get("dual_objective_upper_bound")),
                format_number(solver.get("weighted_residual_allowance")),
                format_number(solver.get("residual_adjusted_upper_bound")),
                str(solver.get("nonzero_multiplier_count")),
                item.get("status", ""),
            ]
        )
    return rows


def multiplier_rows(rows):
    return [
        [
            f"`{row.get('id')}`",
            row.get("kind", ""),
            format_number(row.get("lambda")),
            format_number(row.get("theta")),
            format_number(row.get("receiver_theta")),
            format_number(row.get("source_theta")),
        ]
        for row in rows
    ]


def active_multiplier_rows(rows):
    return [
        [
            str(row.get("row_index")),
            f"`{row.get('id')}`",
            row.get("kind", ""),
            format_number(row.get("lambda")),
            format_number(row.get("theta")),
            format_number(row.get("receiver_theta")),
            format_number(row.get("source_theta")),
            format_number(row.get("base_gap") if row.get("base_gap") is not None else row.get("base_signed_margin")),
        ]
        for row in rows
    ]


def build_report(certificate):
    tightest = certificate.get("tightest_residual_adjusted_upper_bound") or {}
    tightest_solver = tightest.get("solver", {})
    dominant = tightest.get("dominant_multipliers", [])
    active = tightest.get("active_multipliers", [])

    return f"""# Fresh v10 Hermite Dual Obstruction

## Scope

This packet is a priority-only numerical dual obstruction for the fresh v10
Hermite same-itinerary strict-gap LP. It asks whether the finite sampled LP has
nonnegative multipliers proving an upper bound
$$
\\gamma\\le b^T\\lambda
$$
for the sampled strict-gap margin.

It does not claim a rational dual certificate, an outward-rounded interval
certificate, a repaired candidate, a proof-interval pre-ledger pass, a live
ledger update, branch-chart authorization, or a theorem in AAA prose.

Artifacts:

- `fresh_v10_hermite_dual_obstruction.v0.json`
- `fresh_v10_hermite_dual_obstruction.v0.md`
- `../../../../../scripts/proof-programs/fresh-v10-hermite-dual-obstruction.py`

## Executed Command

```bash
/Users/markmorris/vibe/.venv/bin/python scripts/proof-programs/fresh-v10-hermite-dual-obstruction.py --pretty
```

## Dual Form

For each sampled Hermite level, the primal screen is written as
$$
\\max_x e_\\gamma^Tx
\\qquad
\\text{{subject to}}
\\qquad
Ax\\le b.
$$
The dual certificate solves
$$
\\min_{{\\lambda\\ge0}} b^T\\lambda
\\qquad
\\text{{subject to}}
\\qquad
A^T\\lambda=e_\\gamma.
$$
Any feasible dual multiplier vector gives the sampled upper bound
$$
\\gamma\\le b^T\\lambda.
$$

Because this packet uses binary64 numerical multipliers, it also records a
residual-adjusted upper bound by adding
$$
\\left|A^T\\lambda-e_\\gamma\\right|\\cdot B_x,
$$
where $B_x$ is the declared variable box bound vector for nodal values, nodal
derivatives, and the disclosed $\\gamma$ residual cap. That cap is not included
as a proof row in the dual LP.

## Level Results

{markdown_table(["Half-grid", "Nodes", "Primal vars", "Dual vars", "primal gamma", "dual upper", "residual allowance", "adjusted upper", "nonzero lambdas", "Status"], level_rows(certificate))}

The tightest residual-adjusted upper bound occurs at half-grid
`{tightest.get('uniform_half_grid_count')}`:
$$
\\gamma\\le {format_number(tightest_solver.get('residual_adjusted_upper_bound'))}.
$$

## Dominant Multipliers At Tightest Level

{markdown_table(["Row", "Kind", "lambda", "theta", "receiver theta", "source theta"], multiplier_rows(dominant))}

## Active Multipliers At Tightest Level

Rows with $\\lambda>{ACTIVE_MULTIPLIER_THRESHOLD}$ are the concrete numerical
target for proof-grade rationalization or outward-rounded intervalization.

{markdown_table(["Index", "Row", "Kind", "lambda", "theta", "receiver theta", "source theta", "base row value"], active_multiplier_rows(active))}

## Conclusion

{certificate.get('conclusion')}

Recommended next step: {certificate.get('recommended_next_step')}

## Capture Decision

Priority-only. This numerical dual certificate materially strengthens the
same-itinerary no-go evidence, but promotion to proof-grade obstruction requires
rational or outward-rounded multipliers and interval-enclosed row data.
"""


def main():
    args = parse_args()
    contract = read_json(args.contract)
    input_packet = read_json(args.input)
    certificate = build_certificate(contract, input_packet, args)
    write_json(args.out_json, certificate, args.pretty)
    write_text(args.out_md, build_report(certificate))


if __name__ == "__main__":
    main()
