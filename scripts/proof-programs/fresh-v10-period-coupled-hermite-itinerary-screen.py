#!/usr/bin/env python3

import argparse
import importlib.util
import json
import math
from pathlib import Path

import numpy as np
from scipy.optimize import linprog


CERT_DIR = Path("reference/priorities/proof-programs/breather-proof/certificate")
DEFAULT_CONTRACT = CERT_DIR / "fresh_same_packet_fold_shear_seed.v0.json"
DEFAULT_INPUT = CERT_DIR / "gap_opening_fresh_v10_strict_gap_input.shifted_separator_fixed_period.v0.json"
DEFAULT_OUT_JSON = CERT_DIR / "fresh_v10_period_coupled_hermite_itinerary_screen.v0.json"
DEFAULT_OUT_MD = CERT_DIR / "fresh_v10_period_coupled_hermite_itinerary_screen.v0.md"
HELPER_SCRIPT = Path(__file__).with_name("fresh-v10-hermite-itinerary-gap-boundary-screen.py")

T0 = 6.28318530718
SOLVE_TOLERANCE = 1e-9


def load_hermite_helper():
    spec = importlib.util.spec_from_file_location("fresh_v10_hermite_helper", HELPER_SCRIPT)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


hermite = load_hermite_helper()


def parse_args():
    parser = argparse.ArgumentParser(
        description=(
            "Period-coupled Hermite finite-itinerary screen for fresh v10 "
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
        default="16,24,32,48,64,80,96,128,160,192,224,256",
        help="Comma-separated uniform half-grid counts to solve.",
    )
    parser.add_argument("--value-bound", type=positive_float, default=1.0)
    parser.add_argument("--derivative-bound", type=positive_float, default=80.0)
    parser.add_argument(
        "--period-bound",
        type=positive_float,
        default=0.25,
        help="Symmetric bound for the period tangent b_T.",
    )
    parser.add_argument("--gap-sample-count", type=positive_int, default=8)
    parser.add_argument("--speed-sample-count", type=positive_int, default=1000)
    parser.add_argument("--speed-guard", type=positive_float, default=0.015)
    parser.add_argument(
        "--sensitivity-levels",
        default="128,256",
        help="Comma-separated levels used for period-bound sensitivity solves.",
    )
    parser.add_argument(
        "--sensitivity-period-bounds",
        default="0.05,0.1,0.176804284695,0.25,0.5",
        help="Comma-separated period bounds used for sensitivity solves.",
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
    return hermite.clean_number(value)


def add_constraint(rows, bounds, metadata, coefficients, upper_bound, entry):
    rows.append(coefficients)
    bounds.append(upper_bound)
    metadata.append(entry)


def add_equality_as_two_inequalities(rows, bounds, metadata, coefficients, entry):
    add_constraint(rows, bounds, metadata, coefficients, 0.0, entry | {"sense": "upper"})
    add_constraint(rows, bounds, metadata, [-value for value in coefficients], 0.0, entry | {"sense": "lower"})


def variable_count(nodes):
    return 1 + 2 * len(nodes)


def h_offset():
    return 1


def hp_offset(nodes):
    return 1 + len(nodes)


def gamma_index(nodes):
    return variable_count(nodes)


def h_coefficients(theta, nodes, derivative=False):
    return hermite.hermite_coefficients(theta, nodes, derivative=derivative)


def full_h_coefficients(theta, nodes, derivative=False):
    return [0.0] + h_coefficients(theta, nodes, derivative=derivative)


def z_basis(theta, ledger, nodes):
    sign = 1.0 if ledger == "w" else -1.0
    return [0.0] + [sign * value for value in h_coefficients(theta, nodes)]


def xprime_basis(theta, nodes):
    return [0.0] + h_coefficients(theta, nodes, derivative=True)


def add_bound_constraints(rows, bounds, metadata, nodes, args, period_bound):
    width = variable_count(nodes) + 1
    upper = [0.0] * width
    upper[0] = 1.0
    add_constraint(rows, bounds, metadata, upper, period_bound, {"id": "b_T_upper", "kind": "period_bound"})
    lower = [0.0] * width
    lower[0] = -1.0
    add_constraint(rows, bounds, metadata, lower, period_bound, {"id": "b_T_lower", "kind": "period_bound"})

    for index, theta in enumerate(nodes):
        upper = [0.0] * width
        upper[h_offset() + index] = 1.0
        add_constraint(
            rows,
            bounds,
            metadata,
            upper,
            args.value_bound,
            {"id": f"H_{index}_upper", "kind": "node_value_bound", "theta": theta},
        )
        lower = [0.0] * width
        lower[h_offset() + index] = -1.0
        add_constraint(
            rows,
            bounds,
            metadata,
            lower,
            args.value_bound,
            {"id": f"H_{index}_lower", "kind": "node_value_bound", "theta": theta},
        )

        upper = [0.0] * width
        upper[hp_offset(nodes) + index] = 1.0
        add_constraint(
            rows,
            bounds,
            metadata,
            upper,
            args.derivative_bound,
            {"id": f"Hp_{index}_upper", "kind": "node_derivative_bound", "theta": theta},
        )
        lower = [0.0] * width
        lower[hp_offset(nodes) + index] = -1.0
        add_constraint(
            rows,
            bounds,
            metadata,
            lower,
            args.derivative_bound,
            {"id": f"Hp_{index}_lower", "kind": "node_derivative_bound", "theta": theta},
        )


def add_continuity_locks(rows, bounds, metadata, nodes):
    width = variable_count(nodes) + 1
    value_lock = [0.0] * width
    value_lock[h_offset()] = 1.0
    value_lock[h_offset() + len(nodes) - 1] = 1.0
    add_equality_as_two_inequalities(
        rows,
        bounds,
        metadata,
        value_lock,
        {"id": "anti_periodic_value_continuity", "kind": "anti_periodic_continuity_lock"},
    )

    derivative_lock = [0.0] * width
    derivative_lock[hp_offset(nodes)] = 1.0
    derivative_lock[hp_offset(nodes) + len(nodes) - 1] = 1.0
    add_equality_as_two_inequalities(
        rows,
        bounds,
        metadata,
        derivative_lock,
        {"id": "anti_periodic_derivative_continuity", "kind": "anti_periodic_continuity_lock"},
    )


def separator_target(theta, contract):
    xdot = hermite.existing_x_prime(theta, contract) / T0
    target = -1.0 if xdot < 0 else 1.0
    if abs(abs(xdot) - 1.0) > 1e-6:
        raise ValueError(f"Separator theta {theta} is not close to a field-speed contact: xdot={xdot}")
    return target


def add_separator_numerator_locks(rows, bounds, metadata, nodes, contract):
    width = variable_count(nodes) + 1
    for separator_id in ["sigma_1", "sigma_2"]:
        theta = contract.get("shifted_separator_coordinates", {}).get(separator_id)
        if not isinstance(theta, (int, float)):
            continue
        local_theta = hermite.first_half_theta(float(theta))
        index = min(range(len(nodes)), key=lambda item: abs(nodes[item] - local_theta))
        if abs(nodes[index] - local_theta) > 1e-10:
            raise ValueError(f"Missing Hermite node for {separator_id}.")
        target = separator_target(float(theta), contract)
        lock = [0.0] * width
        lock[0] = -target
        lock[hp_offset(nodes) + index] = 1.0
        add_equality_as_two_inequalities(
            rows,
            bounds,
            metadata,
            lock,
            {
                "id": f"{separator_id}_period_coupled_speed_lock",
                "kind": "separator_period_coupled_speed_lock",
                "theta": clean_number(local_theta),
                "target": clean_number(target),
            },
        )


def add_gap_constraints(rows, bounds, metadata, nodes, contract, input_packet, args):
    for row in input_packet["gap_constraints"]:
        receiver_samples = hermite.samples(row["receiver_theta_range"], args.gap_sample_count)
        source_samples = hermite.samples(row["source_theta_range"], args.gap_sample_count)
        for receiver_theta in receiver_samples:
            for source_theta in source_samples:
                if row["orientation"] == "source_below_receiver":
                    base_gap = hermite.z_base(receiver_theta, row["ledger"], contract) - hermite.z_base(source_theta, row["ledger"], contract)
                    receiver_basis = z_basis(receiver_theta, row["ledger"], nodes)
                    source_basis = z_basis(source_theta, row["ledger"], nodes)
                    gap_derivative = [value - source_basis[index] for index, value in enumerate(receiver_basis)]
                    gap_derivative[0] = receiver_theta - source_theta
                elif row["orientation"] == "receiver_below_source":
                    base_gap = hermite.z_base(source_theta, row["ledger"], contract) - hermite.z_base(receiver_theta, row["ledger"], contract)
                    source_basis = z_basis(source_theta, row["ledger"], nodes)
                    receiver_basis = z_basis(receiver_theta, row["ledger"], nodes)
                    gap_derivative = [value - receiver_basis[index] for index, value in enumerate(source_basis)]
                    gap_derivative[0] = source_theta - receiver_theta
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


def add_speed_constraints(rows, bounds, metadata, nodes, contract, args):
    included_speed_samples = 0
    excluded_speed_samples = 0
    for index in range(args.speed_sample_count):
        theta = (index + 0.5) / args.speed_sample_count
        xprime = hermite.existing_x_prime(theta, contract)
        derivative_basis = xprime_basis(theta, nodes)
        for target in [-1.0, 1.0]:
            residual = xprime - target * T0
            if abs(residual / T0) < args.speed_guard:
                excluded_speed_samples += 1
                continue
            sign = 1.0 if residual > 0 else -1.0
            derivative_basis[0] = -target
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
                    "base_signed_margin": sign * residual / T0,
                },
            )
            included_speed_samples += 1
    return included_speed_samples, excluded_speed_samples


def build_constraints(contract, input_packet, nodes, args, period_bound):
    rows = []
    bounds = []
    metadata = []
    add_bound_constraints(rows, bounds, metadata, nodes, args, period_bound)
    add_continuity_locks(rows, bounds, metadata, nodes)
    add_separator_numerator_locks(rows, bounds, metadata, nodes, contract)
    add_gap_constraints(rows, bounds, metadata, nodes, contract, input_packet, args)
    included_speed_samples, excluded_speed_samples = add_speed_constraints(rows, bounds, metadata, nodes, contract, args)
    counts = {
        "total": len(rows),
        "period_bound": sum(1 for entry in metadata if entry["kind"] == "period_bound"),
        "node_value_bound": sum(1 for entry in metadata if entry["kind"] == "node_value_bound"),
        "node_derivative_bound": sum(1 for entry in metadata if entry["kind"] == "node_derivative_bound"),
        "anti_periodic_continuity_lock": sum(1 for entry in metadata if entry["kind"] == "anti_periodic_continuity_lock"),
        "separator_period_coupled_speed_lock": sum(1 for entry in metadata if entry["kind"] == "separator_period_coupled_speed_lock"),
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


def solve_level(contract, input_packet, args, uniform_half_grid_count, period_bound):
    nodes = hermite.hermite_nodes(contract, input_packet, uniform_half_grid_count)
    width = variable_count(nodes)
    matrix, upper_bounds, metadata, counts = build_constraints(contract, input_packet, nodes, args, period_bound)
    objective = np.array([0.0] * width + [-1.0])
    bounds = [(-period_bound, period_bound)]
    bounds.extend([(-args.value_bound, args.value_bound)] * len(nodes))
    bounds.extend([(-args.derivative_bound, args.derivative_bound)] * len(nodes))
    bounds.append((-10.0, 10.0))
    result = linprog(
        objective,
        A_ub=matrix,
        b_ub=upper_bounds,
        bounds=bounds,
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
        "variable_count": width + 1,
        "period_bound": clean_number(period_bound),
        "value_bound": clean_number(args.value_bound),
        "derivative_bound": clean_number(args.derivative_bound),
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
    gamma = float(solution[gamma_index(nodes)])
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
            "period_tangent": clean_number(solution[0]),
            "max_constraint_violation": clean_number(max_violation),
        },
        "limiting_rows": limiting_rows(matrix, upper_bounds, metadata, solution),
        "limiting_gap_rows": limiting_rows(matrix, upper_bounds, metadata, solution, kinds=["sampled_gap"]),
        "limiting_speed_rows": limiting_rows(matrix, upper_bounds, metadata, solution, kinds=["sampled_field_speed_sign"]),
        "limiting_separator_locks": limiting_rows(matrix, upper_bounds, metadata, solution, kinds=["separator_period_coupled_speed_lock"], count=4),
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
    sensitivity_period_bounds = parse_float_list(args.sensitivity_period_bounds)

    level_results = [
        solve_level(contract, input_packet, args, level, args.period_bound)
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
            for period_bound in sensitivity_period_bounds:
                sensitivity_results.append(solve_level(contract, input_packet, args, level, period_bound))

    status = (
        "sampled_period_coupled_hermite_positive_margin_found"
        if positive_results
        else "sampled_period_coupled_hermite_no_positive_margin_found"
    )

    return {
        "schema": "breather-fresh-v10-period-coupled-hermite-itinerary-screen-v1",
        "packet_id": "fresh-v10-period-coupled-hermite-itinerary-screen-v0",
        "source_packet": contract["packet_id"],
        "source_strict_gap_packet": input_packet["packet_id"],
        "status": status,
        "claim_level": (
            "priority-only finite sampled period-coupled Hermite LP screen for same-itinerary "
            "strict-gap repair; not interval-certified"
        ),
        "branch_chart_authorized": False,
        "preledger_pass": False,
        "updates_live_ledger": False,
        "finite_screen_model": {
            "basis_model": (
                "anti-periodic cubic Hermite half-period deformation plus period tangent b_T"
            ),
            "structural_difference": (
                "The period tangent is solved together with H. Separator contacts are locked by "
                "H'(sigma_i)-v_i b_T=0, and retained field-speed signs use the numerator "
                "X'(theta)+H'(theta)-v(T0+b_T)."
            ),
            "uniform_half_grid_levels": levels,
            "value_bound": args.value_bound,
            "derivative_bound": args.derivative_bound,
            "period_bound": args.period_bound,
            "gap_sample_count_per_interval": args.gap_sample_count + 1,
            "speed_midpoint_samples": args.speed_sample_count,
            "speed_guard_value": args.speed_guard,
            "continuity_policy": "H(1/2)=-H(0) and H'(1/2)=-H'(0).",
            "separator_lock_policy": "H'(sigma_i)-v_i b_T=0 for sigma_1 and sigma_2; anti-periodicity supplies sigma_3 and sigma_4.",
            "field_speed_inequality": (
                "For retained samples, sign(X'_fresh(theta)-vT0)*(X'_fresh(theta)+H'(theta)-v(T0+b_T)) >= 0 "
                "for v in {-1,+1}."
            ),
            "solver": "scipy.optimize.linprog(method='highs') with 1e-10 feasibility tolerances",
            "strict_positive_tolerance": SOLVE_TOLERANCE,
        },
        "level_results": level_results,
        "best_result": best,
        "positive_results": positive_results,
        "period_bound_sensitivity": sensitivity_results,
        "limitations": [
            "This is a finite sampled LP screen, not an outward-rounded interval certificate.",
            "A nonpositive sampled optimum is a no-go for this declared period-coupled sample screen, not a proof over all structural ansatz families.",
            "The field-speed constraints preserve signs only at retained samples outside the declared speed guard; they do not certify root count.",
            "No live causal ledger, branch chart, fold atlas, or AAA theorem prose is updated.",
        ],
        "conclusion": (
            "The sampled period-coupled Hermite ansatz found a positive strict-gap margin at one or more tested levels."
            if positive_results
            else (
                "The sampled period-coupled Hermite ansatz does not find a positive strict-gap margin "
                "at any tested level or period-bound sensitivity run."
            )
        ),
        "recommended_next_step": (
            "Do not promote directly; first integrate the candidate finitely, audit field-speed roots, and run proof-interval preledger checks."
            if positive_results
            else (
                "Treat period coupling plus separator speed locks as another exhausted same-itinerary structural ansatz; "
                "the next constructive route should rebuild the itinerary or use a non-additive structural law."
            )
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
                format_number(solver.get("period_tangent")),
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
                format_number(item.get("period_bound")),
                format_number(solver.get("period_tangent")),
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
    sensitivity = screen.get("period_bound_sensitivity", [])

    return f"""# Fresh v10 Period-Coupled Hermite Itinerary Screen

## Scope

This packet is a priority-only finite sampled LP screen for a different
same-itinerary structural ansatz. It keeps the anti-periodic cubic Hermite
deformation but adds a period tangent $b_T$ and locks the field-speed separator
contacts by the numerator condition
$$
H'(\\sigma_i)-v_i b_T=0.
$$
The retained field-speed sign constraints are imposed directly on
$$
X'_{{\\mathrm{{fresh}}}}(\\theta)+H'(\\theta)-v(T_0+b_T),
\\qquad v\\in\\{{-1,+1\\}}.
$$

It does not claim an interval certificate, a repaired candidate, a proof-interval
preledger pass, a live ledger update, branch-chart authorization, or a theorem
in AAA prose.

Artifacts:

- `fresh_v10_period_coupled_hermite_itinerary_screen.v0.json`
- `fresh_v10_period_coupled_hermite_itinerary_screen.v0.md`
- `../../../../../scripts/proof-programs/fresh-v10-period-coupled-hermite-itinerary-screen.py`

## Executed Command

```bash
/Users/markmorris/vibe/.venv/bin/python scripts/proof-programs/fresh-v10-period-coupled-hermite-itinerary-screen.py --pretty
```

## Structural Screen

The variables are $b_T$, nodal values $H_i$, nodal derivatives $H'_i$, and a
sampled strict-gap margin $\\gamma$. The screen imposes
$|b_T|\\le {format_number(screen.get('finite_screen_model', {}).get('period_bound'))}$,
$|H_i|\\le {format_number(screen.get('finite_screen_model', {}).get('value_bound'))}$,
and $|H'_i|\\le {format_number(screen.get('finite_screen_model', {}).get('derivative_bound'))}$.

For every sampled receiver/source pair in each v10 collar, the screen imposes
the selected oriented null-coordinate gap with
$$
z_{{\\ell,H,b_T}}(\\theta)= (T_0+b_T)\\theta \\pm (X_{{\\mathrm{{fresh}}}}(\\theta)+H(\\theta)).
$$

{markdown_table(["Half-grid", "Nodes", "Variables", "b_T", "gamma sample", "max violation", "Status"], result_rows(screen.get("level_results", [])))}

Best sampled margin:
$$
\\gamma_{{\\mathrm{{sample}}}}={format_number(best_solver.get('sample_gap_margin'))}.
$$

The best tested level is `{best.get('uniform_half_grid_count')}` with
`{best.get('node_count')}` Hermite nodes and `{best.get('variable_count')}`
LP variables. Its period tangent is
$$
b_T={format_number(best_solver.get('period_tangent'))}.
$$

## Period-Bound Sensitivity

{markdown_table(["Half-grid", "period bound", "b_T", "gamma sample", "max violation"], sensitivity_rows(sensitivity))}

## Limiting Rows At Best Level

{markdown_table(["Row", "Kind", "Slack", "theta", "receiver theta", "source theta"], limiting_rows_table(best_limiting))}

## Conclusion

{screen.get('conclusion')}

Recommended next step: {screen.get('recommended_next_step')}

## Capture Decision

Priority-only. This screen tests a structural route distinct from mere Hermite
basis enrichment because the period tangent is part of the solve and the
separator field-speed contacts are locked through the same numerator used by
the retained speed-sign guards. Promotion should wait for either a positive
candidate that survives finite integration and proof-interval checks, or for a
decision to rebuild the itinerary.
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
