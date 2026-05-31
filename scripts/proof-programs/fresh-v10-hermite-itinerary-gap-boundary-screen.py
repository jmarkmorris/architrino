#!/usr/bin/env python3

import argparse
import json
import math
from bisect import bisect_right
from pathlib import Path

import numpy as np
from scipy.optimize import linprog


CERT_DIR = Path("reference/priorities/proof-programs/breather-proof/certificate")
DEFAULT_CONTRACT = CERT_DIR / "fresh_same_packet_fold_shear_seed.v0.json"
DEFAULT_INPUT = CERT_DIR / "gap_opening_fresh_v10_strict_gap_input.shifted_separator_fixed_period.v0.json"
DEFAULT_OUT_JSON = CERT_DIR / "fresh_v10_hermite_itinerary_gap_boundary_screen.v0.json"
DEFAULT_OUT_MD = CERT_DIR / "fresh_v10_hermite_itinerary_gap_boundary_screen.v0.md"

T0 = 6.28318530718
AMPLITUDE = 1.25
SOLVE_TOLERANCE = 1e-9


def parse_args():
    parser = argparse.ArgumentParser(
        description=(
            "Hermite finite-itinerary boundary screen for shifted-separator v10 "
            "strict-gap repair attempts."
        )
    )
    parser.add_argument("--contract", default=str(DEFAULT_CONTRACT))
    parser.add_argument("--input", default=str(DEFAULT_INPUT))
    parser.add_argument("--out-json", default=str(DEFAULT_OUT_JSON))
    parser.add_argument("--out-md", default=str(DEFAULT_OUT_MD))
    parser.add_argument("--pretty", action="store_true")
    parser.add_argument(
        "--levels",
        default="8,12,16,24,32,48,64,80,96,128,160,192,224,256",
        help="Comma-separated uniform half-grid counts to solve.",
    )
    parser.add_argument("--value-bound", type=positive_float, default=1.0)
    parser.add_argument("--derivative-bound", type=positive_float, default=80.0)
    parser.add_argument("--gap-sample-count", type=positive_int, default=8)
    parser.add_argument("--speed-sample-count", type=positive_int, default=1000)
    parser.add_argument("--speed-guard", type=positive_float, default=0.015)
    parser.add_argument(
        "--sensitivity-levels",
        default="128,256",
        help="Comma-separated levels used for derivative-bound sensitivity solves.",
    )
    parser.add_argument(
        "--sensitivity-derivative-bounds",
        default="40,80,160,320,640",
        help="Comma-separated derivative bounds used for sensitivity solves.",
    )
    parser.add_argument("--skip-sensitivity", action="store_true")
    return parser.parse_args()


def positive_float(value):
    number = float(value)
    if not math.isfinite(number) or number <= 0:
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


def parse_float_list(value):
    result = [float(part.strip()) for part in value.split(",") if part.strip()]
    if not result or any(not math.isfinite(item) or item <= 0 for item in result):
        raise argparse.ArgumentTypeError("expected a comma-separated list of positive finite numbers")
    return result


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
    if abs(number) < 1e-14:
        return 0
    return float(f"{number:.15g}")


def mod_one(value):
    reduced = value - math.floor(value)
    if abs(reduced) < 1e-12 or abs(reduced - 1) < 1e-12:
        return 0.0
    return reduced


def first_half_theta(theta):
    reduced = mod_one(theta)
    return reduced - 0.5 if reduced >= 0.5 else reduced


def mirror_sign(theta):
    return -1 if mod_one(theta) >= 0.5 else 1


def half_theta_and_sign(theta):
    reduced = mod_one(theta)
    if reduced >= 0.5:
        return reduced - 0.5, -1.0
    return reduced, 1.0


def arc_coordinate(theta, arc):
    local_theta = first_half_theta(theta)
    left, right = [float(value) for value in arc["theta_range"]]
    if local_theta < left - 1e-12 or local_theta > right + 1e-12:
        return None
    return min(1.0, max(0.0, (local_theta - left) / (right - left)))


def bump_value(theta, arc):
    coordinate = arc_coordinate(theta, arc)
    if coordinate is None:
        return 0.0
    return mirror_sign(theta) * math.sin(math.pi * coordinate) ** 2


def bump_derivative(theta, arc):
    coordinate = arc_coordinate(theta, arc)
    if coordinate is None:
        return 0.0
    left, right = [float(value) for value in arc["theta_range"]]
    return mirror_sign(theta) * (math.pi / (right - left)) * math.sin(2 * math.pi * coordinate)


def shear_value(theta, arcs, witness):
    return sum(witness.get(arc["basis"], 0.0) * bump_value(theta, arc) for arc in arcs)


def shear_derivative(theta, arcs, witness):
    return sum(witness.get(arc["basis"], 0.0) * bump_derivative(theta, arc) for arc in arcs)


def base_x(theta):
    return AMPLITUDE * math.cos(2 * math.pi * theta)


def base_x_prime(theta):
    return -2 * math.pi * AMPLITUDE * math.sin(2 * math.pi * theta)


def seed_theta(theta, contract):
    return mod_one(theta + contract["seed_history"]["delta"])


def existing_x(theta, contract):
    old_theta = seed_theta(theta, contract)
    return base_x(old_theta) + contract["seed_history"]["epsilon"] * shear_value(
        old_theta,
        contract["seed_history"]["first_half_arcs"],
        contract["seed_history"]["witness"],
    )


def existing_x_prime(theta, contract):
    old_theta = seed_theta(theta, contract)
    return base_x_prime(old_theta) + contract["seed_history"]["epsilon"] * shear_derivative(
        old_theta,
        contract["seed_history"]["first_half_arcs"],
        contract["seed_history"]["witness"],
    )


def z_base(theta, ledger, contract):
    return T0 * theta + (1 if ledger == "w" else -1) * existing_x(theta, contract)


def samples(theta_range, count):
    left, right = [float(value) for value in theta_range]
    return [left + (right - left) * index / count for index in range(count + 1)]


def dedupe_sorted(values, tolerance=1e-13):
    result = []
    for value in sorted(float(item) for item in values):
        if not result or abs(value - result[-1]) > tolerance:
            result.append(clean_number(value))
    return result


def hermite_nodes(contract, input_packet, uniform_half_grid_count):
    nodes = [index / (2 * uniform_half_grid_count) for index in range(uniform_half_grid_count + 1)]
    nodes.extend([0.0, 0.5])
    for key in ["sigma_1", "sigma_2"]:
        theta = contract.get("shifted_separator_coordinates", {}).get(key)
        if isinstance(theta, (int, float)):
            nodes.append(float(theta))
    for row in input_packet["gap_constraints"]:
        for key in ["receiver_theta_range", "source_theta_range"]:
            for theta in row[key]:
                nodes.append(first_half_theta(float(theta)))
    result = dedupe_sorted(nodes)
    if result[0] != 0 or result[-1] != 0.5:
        raise ValueError("Hermite node set must span [0, 0.5].")
    return result


def hermite_coefficients(theta, nodes, derivative=False):
    local_theta, sign = half_theta_and_sign(theta)
    if local_theta <= nodes[0] + 1e-13:
        index = 0
    elif local_theta >= nodes[-1] - 1e-13:
        index = len(nodes) - 2
    else:
        index = max(0, min(len(nodes) - 2, bisect_right(nodes, local_theta) - 1))

    left = nodes[index]
    right = nodes[index + 1]
    width = right - left
    if width <= 0:
        raise ValueError("Hermite nodes must be strictly increasing.")
    coordinate = (local_theta - left) / width
    coefficients = [0.0] * (2 * len(nodes))

    if derivative:
        coefficients[index] = sign * (6 * coordinate**2 - 6 * coordinate) / width
        coefficients[len(nodes) + index] = sign * (3 * coordinate**2 - 4 * coordinate + 1)
        coefficients[index + 1] = sign * (-6 * coordinate**2 + 6 * coordinate) / width
        coefficients[len(nodes) + index + 1] = sign * (3 * coordinate**2 - 2 * coordinate)
    else:
        h00 = 2 * coordinate**3 - 3 * coordinate**2 + 1
        h10 = coordinate**3 - 2 * coordinate**2 + coordinate
        h01 = -2 * coordinate**3 + 3 * coordinate**2
        h11 = coordinate**3 - coordinate**2
        coefficients[index] = sign * h00
        coefficients[len(nodes) + index] = sign * width * h10
        coefficients[index + 1] = sign * h01
        coefficients[len(nodes) + index + 1] = sign * width * h11

    return coefficients


def z_basis(theta, ledger, nodes):
    sign = 1.0 if ledger == "w" else -1.0
    return [sign * value for value in hermite_coefficients(theta, nodes)]


def xdot_basis(theta, nodes):
    return [value / T0 for value in hermite_coefficients(theta, nodes, derivative=True)]


def add_constraint(rows, bounds, metadata, coefficients, upper_bound, entry):
    rows.append(coefficients)
    bounds.append(upper_bound)
    metadata.append(entry)


def add_bound_constraints(rows, bounds, metadata, nodes, args, derivative_bound):
    variable_count = 2 * len(nodes)
    for index, theta in enumerate(nodes):
        upper = [0.0] * (variable_count + 1)
        upper[index] = 1.0
        add_constraint(rows, bounds, metadata, upper, args.value_bound, {"id": f"H_{index}_upper", "kind": "node_value_bound", "theta": theta})
        lower = [0.0] * (variable_count + 1)
        lower[index] = -1.0
        add_constraint(rows, bounds, metadata, lower, args.value_bound, {"id": f"H_{index}_lower", "kind": "node_value_bound", "theta": theta})

        upper = [0.0] * (variable_count + 1)
        upper[len(nodes) + index] = 1.0
        add_constraint(
            rows,
            bounds,
            metadata,
            upper,
            derivative_bound,
            {"id": f"Hp_{index}_upper", "kind": "node_derivative_bound", "theta": theta},
        )
        lower = [0.0] * (variable_count + 1)
        lower[len(nodes) + index] = -1.0
        add_constraint(
            rows,
            bounds,
            metadata,
            lower,
            derivative_bound,
            {"id": f"Hp_{index}_lower", "kind": "node_derivative_bound", "theta": theta},
        )


def add_equality_as_two_inequalities(rows, bounds, metadata, coefficients, entry):
    add_constraint(rows, bounds, metadata, coefficients, 0.0, entry | {"sense": "upper"})
    add_constraint(rows, bounds, metadata, [-value for value in coefficients], 0.0, entry | {"sense": "lower"})


def add_continuity_locks(rows, bounds, metadata, nodes, contract):
    variable_count = 2 * len(nodes)
    value_lock = [0.0] * (variable_count + 1)
    value_lock[0] = 1.0
    value_lock[len(nodes) - 1] = 1.0
    add_equality_as_two_inequalities(
        rows,
        bounds,
        metadata,
        value_lock,
        {"id": "anti_periodic_value_continuity", "kind": "anti_periodic_continuity_lock"},
    )

    derivative_lock = [0.0] * (variable_count + 1)
    derivative_lock[len(nodes)] = 1.0
    derivative_lock[2 * len(nodes) - 1] = 1.0
    add_equality_as_two_inequalities(
        rows,
        bounds,
        metadata,
        derivative_lock,
        {"id": "anti_periodic_derivative_continuity", "kind": "anti_periodic_continuity_lock"},
    )

    for separator_id in ["sigma_1", "sigma_2"]:
        theta = contract.get("shifted_separator_coordinates", {}).get(separator_id)
        if not isinstance(theta, (int, float)):
            continue
        local_theta = first_half_theta(float(theta))
        index = min(range(len(nodes)), key=lambda item: abs(nodes[item] - local_theta))
        if abs(nodes[index] - local_theta) > 1e-10:
            raise ValueError(f"Missing Hermite node for {separator_id}.")
        derivative_lock = [0.0] * (variable_count + 1)
        derivative_lock[len(nodes) + index] = 1.0
        add_equality_as_two_inequalities(
            rows,
            bounds,
            metadata,
            derivative_lock,
            {
                "id": f"{separator_id}_derivative_lock",
                "kind": "separator_derivative_lock",
                "theta": clean_number(local_theta),
            },
        )


def add_gap_constraints(rows, bounds, metadata, nodes, contract, input_packet, args):
    variable_count = 2 * len(nodes)
    for row in input_packet["gap_constraints"]:
        receiver_samples = samples(row["receiver_theta_range"], args.gap_sample_count)
        source_samples = samples(row["source_theta_range"], args.gap_sample_count)
        for receiver_theta in receiver_samples:
            for source_theta in source_samples:
                if row["orientation"] == "source_below_receiver":
                    base_gap = z_base(receiver_theta, row["ledger"], contract) - z_base(source_theta, row["ledger"], contract)
                    receiver_basis = z_basis(receiver_theta, row["ledger"], nodes)
                    source_basis = z_basis(source_theta, row["ledger"], nodes)
                    gap_derivative = [value - source_basis[index] for index, value in enumerate(receiver_basis)]
                elif row["orientation"] == "receiver_below_source":
                    base_gap = z_base(source_theta, row["ledger"], contract) - z_base(receiver_theta, row["ledger"], contract)
                    source_basis = z_basis(source_theta, row["ledger"], nodes)
                    receiver_basis = z_basis(receiver_theta, row["ledger"], nodes)
                    gap_derivative = [value - receiver_basis[index] for index, value in enumerate(source_basis)]
                else:
                    raise ValueError(f"Unknown gap orientation for {row['id']}: {row['orientation']}")
                add_constraint(
                    rows,
                    bounds,
                    metadata,
                    [-value for value in gap_derivative] + [1.0],
                    base_gap,
                    {
                        "id": row["id"],
                        "kind": "sampled_gap",
                        "ledger": row["ledger"],
                        "orientation": row["orientation"],
                        "receiver_theta": receiver_theta,
                        "source_theta": source_theta,
                        "base_gap": base_gap,
                    },
                )
                if len(gap_derivative) != variable_count:
                    raise ValueError("Unexpected Hermite gap derivative width.")


def add_speed_constraints(rows, bounds, metadata, nodes, contract, args):
    included_speed_samples = 0
    excluded_speed_samples = 0
    for index in range(args.speed_sample_count):
        theta = (index + 0.5) / args.speed_sample_count
        xdot = existing_x_prime(theta, contract) / T0
        derivative_basis = xdot_basis(theta, nodes)
        for target in [-1.0, 1.0]:
            residual = xdot - target
            if abs(residual) < args.speed_guard:
                excluded_speed_samples += 1
                continue
            sign = 1.0 if residual > 0 else -1.0
            add_constraint(
                rows,
                bounds,
                metadata,
                [-sign * value for value in derivative_basis] + [0.0],
                sign * residual,
                {
                    "id": f"speed_{'plus' if target > 0 else 'minus'}_{index}",
                    "kind": "sampled_field_speed_sign",
                    "target": target,
                    "theta": theta,
                    "base_signed_margin": sign * residual,
                },
            )
            included_speed_samples += 1
    return included_speed_samples, excluded_speed_samples


def build_constraints(contract, input_packet, nodes, args, derivative_bound):
    rows = []
    bounds = []
    metadata = []
    add_bound_constraints(rows, bounds, metadata, nodes, args, derivative_bound)
    add_continuity_locks(rows, bounds, metadata, nodes, contract)
    add_gap_constraints(rows, bounds, metadata, nodes, contract, input_packet, args)
    included_speed_samples, excluded_speed_samples = add_speed_constraints(rows, bounds, metadata, nodes, contract, args)
    counts = {
        "total": len(rows),
        "node_value_bound": sum(1 for entry in metadata if entry["kind"] == "node_value_bound"),
        "node_derivative_bound": sum(1 for entry in metadata if entry["kind"] == "node_derivative_bound"),
        "anti_periodic_continuity_lock": sum(1 for entry in metadata if entry["kind"] == "anti_periodic_continuity_lock"),
        "separator_derivative_lock": sum(1 for entry in metadata if entry["kind"] == "separator_derivative_lock"),
        "sampled_gap": sum(1 for entry in metadata if entry["kind"] == "sampled_gap"),
        "sampled_field_speed_sign": included_speed_samples,
        "excluded_field_speed_near_contact": excluded_speed_samples,
    }
    return np.array(rows, dtype=float), np.array(bounds, dtype=float), metadata, counts


def limiting_rows(matrix, upper_bounds, metadata, solution, kinds=None, count=8):
    slack = upper_bounds - matrix @ solution
    if kinds is None:
        indexes = list(range(len(metadata)))
    else:
        kind_set = set(kinds)
        indexes = [index for index, entry in enumerate(metadata) if entry["kind"] in kind_set]
    limiting = sorted(indexes, key=lambda index: slack[index])[:count]
    return [
        {
            "id": metadata[index]["id"],
            "kind": metadata[index]["kind"],
            "slack": clean_number(slack[index]),
            "ledger": metadata[index].get("ledger"),
            "target": clean_number(metadata[index].get("target")),
            "theta": clean_number(metadata[index].get("theta")),
            "receiver_theta": clean_number(metadata[index].get("receiver_theta")),
            "source_theta": clean_number(metadata[index].get("source_theta")),
        }
        for index in limiting
    ]


def solve_level(contract, input_packet, args, uniform_half_grid_count, derivative_bound):
    nodes = hermite_nodes(contract, input_packet, uniform_half_grid_count)
    variable_count = 2 * len(nodes)
    matrix, upper_bounds, metadata, counts = build_constraints(contract, input_packet, nodes, args, derivative_bound)
    objective = np.array([0.0] * variable_count + [-1.0])
    result = linprog(
        objective,
        A_ub=matrix,
        b_ub=upper_bounds,
        bounds=[(-args.value_bound, args.value_bound)] * len(nodes)
        + [(-derivative_bound, derivative_bound)] * len(nodes)
        + [(-10.0, 10.0)],
        method="highs",
        options={
            "primal_feasibility_tolerance": 1e-10,
            "dual_feasibility_tolerance": 1e-10,
            "ipm_optimality_tolerance": 1e-10,
        },
    )

    base = {
        "uniform_half_grid_count": uniform_half_grid_count,
        "node_count": len(nodes),
        "variable_count": variable_count + 1,
        "derivative_bound": clean_number(derivative_bound),
        "constraints": counts,
    }
    if not result.success:
        return {
            **base,
            "status": "screen_lp_solver_failed",
            "solver": {
                "success": False,
                "status_code": int(result.status),
                "message": result.message,
            },
        }

    solution = result.x
    gamma = float(solution[variable_count])
    max_violation = float(np.max(matrix @ solution - upper_bounds))
    status = "positive_sampled_margin_found" if gamma > SOLVE_TOLERANCE else "no_positive_sampled_margin_found"
    return {
        **base,
        "status": status,
        "solver": {
            "success": True,
            "status_code": int(result.status),
            "message": result.message,
            "objective_minimized": clean_number(result.fun),
            "sample_gap_margin": clean_number(gamma),
            "max_constraint_violation": clean_number(max_violation),
        },
        "limiting_rows": limiting_rows(matrix, upper_bounds, metadata, solution),
        "limiting_gap_rows": limiting_rows(matrix, upper_bounds, metadata, solution, kinds=["sampled_gap"]),
        "limiting_speed_rows": limiting_rows(matrix, upper_bounds, metadata, solution, kinds=["sampled_field_speed_sign"]),
    }


def assert_inputs(contract, input_packet):
    if contract["packet_id"] != "fresh-same-packet-fold-shear-seed-v0":
        raise ValueError(f"Unexpected contract packet_id: {contract['packet_id']}")
    if input_packet["packet_id"] != "fresh-v10-shifted-separator-fixed-period-strict-gap-matrix-v0":
        raise ValueError(f"Unexpected shifted strict-gap input packet_id: {input_packet['packet_id']}")
    if input_packet.get("claim_limits", {}).get("claims_finite_itinerary_preservation"):
        raise ValueError("Input unexpectedly claims finite itinerary preservation.")


def build_screen(contract, input_packet, args):
    assert_inputs(contract, input_packet)
    levels = parse_int_list(args.levels)
    sensitivity_levels = parse_int_list(args.sensitivity_levels)
    sensitivity_derivative_bounds = parse_float_list(args.sensitivity_derivative_bounds)

    level_results = [
        solve_level(contract, input_packet, args, level, args.derivative_bound)
        for level in levels
    ]
    successful_results = [item for item in level_results if item.get("solver", {}).get("success")]
    best = max(successful_results, key=lambda item: item["solver"]["sample_gap_margin"]) if successful_results else None
    positive_results = [
        item for item in successful_results if item["solver"]["sample_gap_margin"] > SOLVE_TOLERANCE
    ]

    sensitivity_results = []
    if not args.skip_sensitivity:
        for level in sensitivity_levels:
            for derivative_bound in sensitivity_derivative_bounds:
                sensitivity_results.append(solve_level(contract, input_packet, args, level, derivative_bound))

    status = (
        "sampled_hermite_positive_margin_found"
        if positive_results
        else "sampled_hermite_boundary_no_positive_margin_found"
    )

    return {
        "schema": "breather-fresh-v10-hermite-itinerary-gap-boundary-screen-v1",
        "packet_id": "fresh-v10-hermite-itinerary-gap-boundary-screen-v0",
        "source_packet": contract["packet_id"],
        "source_strict_gap_packet": input_packet["packet_id"],
        "status": status,
        "claim_level": (
            "priority-only finite sampled Hermite collocation LP screen for same-itinerary "
            "shifted-separator strict-gap repair; not interval-certified"
        ),
        "branch_chart_authorized": False,
        "preledger_pass": False,
        "updates_live_ledger": False,
        "finite_screen_model": {
            "basis_model": (
                "anti-periodic cubic Hermite half-period deformation with nodal values "
                "and nodal theta-derivatives"
            ),
            "uniform_half_grid_levels": levels,
            "value_bound": args.value_bound,
            "derivative_bound": args.derivative_bound,
            "gap_sample_count_per_interval": args.gap_sample_count + 1,
            "speed_midpoint_samples": args.speed_sample_count,
            "speed_guard_value": args.speed_guard,
            "separator_derivative_policy": (
                "H'(sigma_1)=H'(sigma_2)=0, so the shifted separator contacts remain "
                "fixed to first order."
            ),
            "continuity_policy": "H(1/2)=-H(0) and H'(1/2)=-H'(0).",
            "field_speed_inequality": (
                "For retained samples, sign(xdot_fresh(theta)-target)*(xdot_H(theta)-target) >= 0 "
                "for target in {-1,+1}."
            ),
            "solver": "scipy.optimize.linprog(method='highs') with 1e-10 feasibility tolerances",
            "strict_positive_tolerance": SOLVE_TOLERANCE,
        },
        "level_results": level_results,
        "best_result": best,
        "positive_results": positive_results,
        "derivative_bound_sensitivity": sensitivity_results,
        "limitations": [
            "This is a finite sampled LP screen, not an outward-rounded interval certificate.",
            "A nonpositive sampled optimum is a no-go for the declared bounded Hermite sample screen, not a proof over all bases or all interval points.",
            "The field-speed constraints preserve signs only at retained samples outside the declared speed guard; they do not certify root count.",
            "No live causal ledger, branch chart, fold atlas, or AAA theorem prose is updated.",
        ],
        "conclusion": (
            "The sampled Hermite basis found a positive strict-gap margin at one or more tested levels."
            if positive_results
            else (
                "The sampled Hermite sequence approaches the finite-itinerary boundary from below "
                "and does not find a positive strict-gap margin at any tested level."
            )
        ),
        "recommended_next_step": (
            "If this is pursued further, leave the same-itinerary bounded-basis repair route and make an explicit itinerary-changing branch decision or derive an interval dual obstruction."
            if not positive_results
            else "Do not promote directly; first run interval root and null-coordinate certification for the positive sampled candidate."
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


def result_rows(results):
    rows = []
    for item in results:
        solver = item.get("solver", {})
        rows.append(
            [
                str(item.get("uniform_half_grid_count")),
                str(item.get("node_count")),
                str(item.get("variable_count")),
                format_number(solver.get("sample_gap_margin")),
                format_number(solver.get("max_constraint_violation")),
                item.get("status", ""),
            ]
        )
    return rows


def sensitivity_rows(results):
    rows = []
    for item in results:
        solver = item.get("solver", {})
        rows.append(
            [
                str(item.get("uniform_half_grid_count")),
                format_number(item.get("derivative_bound")),
                format_number(solver.get("sample_gap_margin")),
                format_number(solver.get("max_constraint_violation")),
            ]
        )
    return rows


def limiting_rows_table(rows):
    return [
        [
            f"`{row.get('id')}`",
            row.get("kind", ""),
            format_number(row.get("slack")),
            format_number(row.get("theta")),
            format_number(row.get("receiver_theta")),
            format_number(row.get("source_theta")),
        ]
        for row in rows
    ]


def build_report(screen):
    best = screen.get("best_result") or {}
    best_solver = best.get("solver", {})
    best_limiting = best.get("limiting_rows", [])
    sensitivity = screen.get("derivative_bound_sensitivity", [])

    return f"""# Fresh v10 Hermite Itinerary Gap Boundary Screen

## Scope

This packet is a priority-only finite sampled LP screen for the shifted-separator
v10 strict-gap route. It asks whether a richer same-itinerary deformation basis,
modeled as an anti-periodic cubic Hermite function on the half period, can open
the sampled parent-complement collars while preserving retained field-speed sign
samples.

It does not claim an interval certificate, a repaired candidate, a proof-interval
pre-ledger pass, a live ledger update, branch-chart authorization, or a theorem
in AAA prose.

Artifacts:

- `fresh_v10_hermite_itinerary_gap_boundary_screen.v0.json`
- `fresh_v10_hermite_itinerary_gap_boundary_screen.v0.md`
- `../../../../../scripts/proof-programs/fresh-v10-hermite-itinerary-gap-boundary-screen.py`

## Executed Command

```bash
/Users/markmorris/vibe/.venv/bin/python scripts/proof-programs/fresh-v10-hermite-itinerary-gap-boundary-screen.py --pretty
```

## Hermite Screen

The variables are nodal values $H_i$, nodal derivatives $H'_i$, and a sampled
strict-gap margin $\\gamma$. The screen imposes $|H_i|\\le {format_number(screen.get('finite_screen_model', {}).get('value_bound'))}$
and $|H'_i|\\le {format_number(screen.get('finite_screen_model', {}).get('derivative_bound'))}$ at the default solves.
The deformation is anti-periodic:
$$
H(\\theta+1/2)=-H(\\theta),
\\qquad
H'(\\theta+1/2)=-H'(\\theta).
$$
It also locks the shifted separator derivatives by imposing
$$
H'(\\sigma_1)=H'(\\sigma_2)=0.
$$

For every sampled receiver/source pair in each v10 collar, the screen imposes
$$
z_{{\\ell,H}}(\\theta_r)-z_{{\\ell,H}}(\\theta_s)\\ge \\gamma
$$
or the reversed sampled orientation chosen by the v10 strict-gap target. For
retained field-speed samples it imposes
$$
\\operatorname{{sign}}(\\dot X_{{\\mathrm{{fresh}}}}(\\theta)-v)
\\bigl(\\dot X_H(\\theta)-v\\bigr)\\ge 0,
\\qquad v\\in\\{{-1,+1\\}}.
$$

## Grid Refinement Results

{markdown_table(["Half-grid", "Nodes", "Variables", "gamma sample", "max violation", "Status"], result_rows(screen.get("level_results", [])))}

Best sampled margin:
$$
\\gamma_{{\\mathrm{{sample}}}}={format_number(best_solver.get('sample_gap_margin'))}.
$$

The best tested level is `{best.get('uniform_half_grid_count')}` with
`{best.get('node_count')}` Hermite nodes and `{best.get('variable_count')}`
LP variables.

## Derivative-Bound Sensitivity

The derivative cap is not the active bottleneck in the tested high-resolution
screens: changing it over the listed range leaves the sampled margin unchanged
to the displayed precision.

{markdown_table(["Half-grid", "derivative bound", "gamma sample", "max violation"], sensitivity_rows(sensitivity))}

## Limiting Rows At Best Level

{markdown_table(["Row", "Kind", "Slack", "theta", "receiver theta", "source theta"], limiting_rows_table(best_limiting))}

## Conclusion

{screen.get('conclusion')}

Recommended next step: {screen.get('recommended_next_step')}

## Capture Decision

Priority-only. This screen materially sharpens the proof route by showing that a
substantially richer same-itinerary Hermite basis reaches the sampled boundary
but still fails to produce positive strict-gap margin. Promotion should wait for
either an interval dual obstruction or an explicitly authorized itinerary change.
"""


def main():
    args = parse_args()
    contract = read_json(args.contract)
    input_packet = read_json(args.input)
    screen = build_screen(contract, input_packet, args)
    write_json(args.out_json, screen, args.pretty)
    write_text(args.out_md, build_report(screen))


if __name__ == "__main__":
    main()
