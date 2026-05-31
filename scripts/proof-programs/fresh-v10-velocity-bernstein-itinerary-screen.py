#!/usr/bin/env python3

import argparse
import json
import math
from pathlib import Path

import numpy as np
from scipy.optimize import linprog


CERT_DIR = Path("reference/priorities/proof-programs/breather-proof/certificate")
DEFAULT_CONTRACT = CERT_DIR / "fresh_same_packet_fold_shear_seed.v0.json"
DEFAULT_INPUT = CERT_DIR / "gap_opening_fresh_v10_strict_gap_input.shifted_separator_fixed_period.v0.json"
DEFAULT_OUT_JSON = CERT_DIR / "fresh_v10_velocity_bernstein_itinerary_screen.v0.json"
DEFAULT_OUT_MD = CERT_DIR / "fresh_v10_velocity_bernstein_itinerary_screen.v0.md"

T0 = 6.28318530718
SOLVE_TOLERANCE = 1e-9


def parse_args():
    parser = argparse.ArgumentParser(
        description=(
            "Velocity-first Bernstein finite-itinerary screen for fresh v10 "
            "strict-gap repair attempts."
        )
    )
    parser.add_argument("--contract", default=str(DEFAULT_CONTRACT))
    parser.add_argument("--input", default=str(DEFAULT_INPUT))
    parser.add_argument("--out-json", default=str(DEFAULT_OUT_JSON))
    parser.add_argument("--out-md", default=str(DEFAULT_OUT_MD))
    parser.add_argument("--pretty", action="store_true")
    parser.add_argument(
        "--degrees",
        default="3,5,7,9,11,15,21,31",
        help="Comma-separated Bernstein degrees to solve on each first-half velocity arc.",
    )
    parser.add_argument("--gap-sample-count", type=positive_int, default=8)
    parser.add_argument("--speed-margin", type=positive_float, default=0.015)
    parser.add_argument("--velocity-bound", type=positive_float, default=2.5)
    parser.add_argument(
        "--sensitivity-degrees",
        default="11,21,31",
        help="Comma-separated degrees used for speed-margin sensitivity solves.",
    )
    parser.add_argument(
        "--sensitivity-speed-margins",
        default="0.005,0.01,0.015,0.025",
        help="Comma-separated speed margins used for sensitivity solves.",
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


def first_half(theta):
    reduced = mod_one(theta)
    if reduced >= 0.5:
        return reduced - 0.5, -1.0
    return reduced, 1.0


def samples(theta_range, count):
    left, right = [float(value) for value in theta_range]
    return [left + (right - left) * index / count for index in range(count + 1)]


def add_constraint(rows, bounds, metadata, coefficients, upper_bound, entry):
    rows.append(coefficients)
    bounds.append(upper_bound)
    metadata.append(entry)


def add_equality_as_two_inequalities(rows, bounds, metadata, coefficients, entry):
    add_constraint(rows, bounds, metadata, coefficients, 0.0, entry | {"sense": "upper"})
    add_constraint(rows, bounds, metadata, [-value for value in coefficients], 0.0, entry | {"sense": "lower"})


def bernstein_integral_unit(degree, k, s):
    total = 0.0
    for j in range(degree - k + 1):
        total += (
            math.comb(degree, k)
            * math.comb(degree - k, j)
            * ((-1.0) ** j)
            * (s ** (k + j + 1))
            / (k + j + 1)
        )
    return total


def velocity_arcs(contract):
    sigma_1 = contract.get("shifted_separator_coordinates", {}).get("sigma_1")
    sigma_2 = contract.get("shifted_separator_coordinates", {}).get("sigma_2")
    if not isinstance(sigma_1, (int, float)) or not isinstance(sigma_2, (int, float)):
        raise ValueError("Fresh contract must provide shifted separator coordinates.")
    return [
        {"id": "I0_subfield", "theta_range": [0.0, float(sigma_1)], "zone": "subfield"},
        {"id": "I1_superfield", "theta_range": [float(sigma_1), float(sigma_2)], "zone": "superfield"},
        {"id": "I2_subfield", "theta_range": [float(sigma_2), 0.5], "zone": "subfield"},
    ]


def control_variables(arcs, degree):
    variables = []
    for arc_index, arc in enumerate(arcs):
        for k in range(degree + 1):
            variables.append(
                {
                    "id": f"U_{arc['id']}_{k}",
                    "arc_index": arc_index,
                    "arc_id": arc["id"],
                    "control_index": k,
                    "degree": degree,
                    "zone": arc["zone"],
                    "theta": clean_number(
                        float(arc["theta_range"][0])
                        + (float(arc["theta_range"][1]) - float(arc["theta_range"][0])) * k / degree
                    ),
                }
            )
    return variables


def integral_coefficients_first_half(theta, arcs, variables):
    coeffs = [0.0] * len(variables)
    remaining_theta = theta
    for arc_index, arc in enumerate(arcs):
        left, right = [float(value) for value in arc["theta_range"]]
        width = right - left
        if remaining_theta <= left + 1e-14:
            break
        upper = min(remaining_theta, right)
        if upper <= left:
            continue
        s = max(0.0, min(1.0, (upper - left) / width))
        for index, variable in enumerate(variables):
            if variable["arc_index"] != arc_index:
                continue
            coeffs[index] += width * bernstein_integral_unit(variable["degree"], variable["control_index"], s)
        if remaining_theta <= right + 1e-14:
            break
    return coeffs


def half_integral_coefficients(arcs, variables):
    coeffs = [0.0] * len(variables)
    for arc_index, arc in enumerate(arcs):
        left, right = [float(value) for value in arc["theta_range"]]
        width = right - left
        for index, variable in enumerate(variables):
            if variable["arc_index"] == arc_index:
                coeffs[index] += width / (variable["degree"] + 1)
    return coeffs


def x_coefficients(theta, arcs, variables, half_integral):
    local_theta, sign = first_half(theta)
    local_integral = integral_coefficients_first_half(local_theta, arcs, variables)
    return [sign * T0 * (local_integral[index] - 0.5 * half_integral[index]) for index in range(len(variables))]


def z_coefficients(theta, ledger, arcs, variables, half_integral):
    sign = 1.0 if ledger == "w" else -1.0
    x_coeffs = x_coefficients(theta, arcs, variables, half_integral)
    return [sign * value for value in x_coeffs]


def z_constant(theta):
    return T0 * theta


def control_kind(variable, degree):
    k = variable["control_index"]
    arc_id = variable["arc_id"]
    if arc_id == "I0_subfield" and k == degree:
        return "separator_endpoint"
    if arc_id == "I1_superfield" and k in {0, degree}:
        return "separator_endpoint"
    if arc_id == "I2_subfield" and k == 0:
        return "separator_endpoint"
    if variable["zone"] == "superfield":
        return "superfield_interior"
    return "subfield"


def add_control_corridor_constraints(rows, bounds, metadata, variables, degree, args, speed_margin):
    width = len(variables) + 1
    for index, variable in enumerate(variables):
        kind = control_kind(variable, degree)
        if kind == "separator_endpoint":
            eq = [0.0] * width
            eq[index] = 1.0
            add_equality_as_two_inequalities(
                rows,
                bounds,
                metadata,
                eq,
                {
                    "id": f"{variable['id']}_separator_equals_minus_one",
                    "kind": "separator_speed_lock",
                    "arc": variable["arc_id"],
                    "control_index": variable["control_index"],
                    "target": -1.0,
                },
            )
            continue

        lower_limit = -1.0 + speed_margin if kind == "subfield" else -args.velocity_bound
        upper_limit = 1.0 - speed_margin if kind == "subfield" else -1.0 - speed_margin
        upper = [0.0] * width
        upper[index] = 1.0
        add_constraint(
            rows,
            bounds,
            metadata,
            upper,
            upper_limit,
            {
                "id": f"{variable['id']}_upper",
                "kind": "velocity_corridor",
                "arc": variable["arc_id"],
                "control_index": variable["control_index"],
                "corridor": kind,
            },
        )
        lower = [0.0] * width
        lower[index] = -1.0
        add_constraint(
            rows,
            bounds,
            metadata,
            lower,
            -lower_limit,
            {
                "id": f"{variable['id']}_lower",
                "kind": "velocity_corridor",
                "arc": variable["arc_id"],
                "control_index": variable["control_index"],
                "corridor": kind,
            },
        )


def add_gap_constraints(rows, bounds, metadata, arcs, variables, half_integral, input_packet, args):
    for row in input_packet["gap_constraints"]:
        receiver_samples = samples(row["receiver_theta_range"], args.gap_sample_count)
        source_samples = samples(row["source_theta_range"], args.gap_sample_count)
        for receiver_theta in receiver_samples:
            for source_theta in source_samples:
                if row["orientation"] == "source_below_receiver":
                    base_gap = z_constant(receiver_theta) - z_constant(source_theta)
                    receiver_basis = z_coefficients(receiver_theta, row["ledger"], arcs, variables, half_integral)
                    source_basis = z_coefficients(source_theta, row["ledger"], arcs, variables, half_integral)
                    gap_coeffs = [value - source_basis[index] for index, value in enumerate(receiver_basis)]
                elif row["orientation"] == "receiver_below_source":
                    base_gap = z_constant(source_theta) - z_constant(receiver_theta)
                    source_basis = z_coefficients(source_theta, row["ledger"], arcs, variables, half_integral)
                    receiver_basis = z_coefficients(receiver_theta, row["ledger"], arcs, variables, half_integral)
                    gap_coeffs = [value - receiver_basis[index] for index, value in enumerate(source_basis)]
                else:
                    raise ValueError(f"Unknown gap orientation for {row['id']}: {row['orientation']}")
                add_constraint(
                    rows,
                    bounds,
                    metadata,
                    [-value for value in gap_coeffs] + [1.0],
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


def build_constraints(contract, input_packet, degree, args, speed_margin):
    arcs = velocity_arcs(contract)
    variables = control_variables(arcs, degree)
    half_integral = half_integral_coefficients(arcs, variables)
    rows = []
    bounds = []
    metadata = []
    add_control_corridor_constraints(rows, bounds, metadata, variables, degree, args, speed_margin)
    add_gap_constraints(rows, bounds, metadata, arcs, variables, half_integral, input_packet, args)
    counts = {
        "total": len(rows),
        "separator_speed_lock": sum(1 for entry in metadata if entry["kind"] == "separator_speed_lock"),
        "velocity_corridor": sum(1 for entry in metadata if entry["kind"] == "velocity_corridor"),
        "sampled_gap": sum(1 for entry in metadata if entry["kind"] == "sampled_gap"),
    }
    return arcs, variables, np.array(rows, dtype=float), np.array(bounds, dtype=float), metadata, counts


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
            "theta": clean_number(metadata[index].get("theta")),
            "receiver_theta": clean_number(metadata[index].get("receiver_theta")),
            "source_theta": clean_number(metadata[index].get("source_theta")),
            "arc": metadata[index].get("arc"),
            "control_index": metadata[index].get("control_index"),
            "corridor": metadata[index].get("corridor"),
        }
        for index in limiting
    ]


def solve_degree(contract, input_packet, args, degree, speed_margin):
    arcs, variables, matrix, upper_bounds, metadata, counts = build_constraints(contract, input_packet, degree, args, speed_margin)
    objective = np.array([0.0] * len(variables) + [-1.0])
    variable_bounds = [(-args.velocity_bound, args.velocity_bound)] * len(variables) + [(-10.0, 10.0)]
    result = linprog(
        objective,
        A_ub=matrix,
        b_ub=upper_bounds,
        bounds=variable_bounds,
        method="highs",
        options={
            "primal_feasibility_tolerance": 1e-10,
            "dual_feasibility_tolerance": 1e-10,
            "ipm_optimality_tolerance": 1e-10,
        },
    )

    base = {
        "degree": degree,
        "arc_count": len(arcs),
        "control_count": len(variables),
        "variable_count": len(variables) + 1,
        "speed_margin": clean_number(speed_margin),
        "velocity_bound": clean_number(args.velocity_bound),
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
    gamma = float(solution[len(variables)])
    max_violation = float(np.max(matrix @ solution - upper_bounds))
    status = "positive_sampled_margin_found" if gamma > SOLVE_TOLERANCE else "no_positive_sampled_margin_found"
    controls_by_arc = {}
    for index, variable in enumerate(variables):
        controls_by_arc.setdefault(variable["arc_id"], []).append(clean_number(solution[index]))
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
        "controls_by_arc": controls_by_arc,
        "limiting_rows": limiting_rows(matrix, upper_bounds, metadata, solution),
        "limiting_gap_rows": limiting_rows(matrix, upper_bounds, metadata, solution, kinds=["sampled_gap"]),
        "limiting_corridor_rows": limiting_rows(matrix, upper_bounds, metadata, solution, kinds=["velocity_corridor", "separator_speed_lock"]),
    }


def assert_inputs(contract, input_packet):
    if contract["packet_id"] != "fresh-same-packet-fold-shear-seed-v0":
        raise ValueError(f"Unexpected contract packet_id: {contract['packet_id']}")
    if input_packet["packet_id"] != "fresh-v10-shifted-separator-fixed-period-strict-gap-matrix-v0":
        raise ValueError(f"Unexpected strict-gap input packet_id: {input_packet['packet_id']}")
    if input_packet.get("claim_limits", {}).get("claims_finite_itinerary_preservation"):
        raise ValueError("Input unexpectedly claims finite itinerary preservation.")


def build_screen(contract, input_packet, args):
    assert_inputs(contract, input_packet)
    degrees = parse_int_list(args.degrees)
    sensitivity_degrees = parse_int_list(args.sensitivity_degrees)
    sensitivity_speed_margins = parse_float_list(args.sensitivity_speed_margins)
    arcs = velocity_arcs(contract)

    degree_results = [
        solve_degree(contract, input_packet, args, degree, args.speed_margin)
        for degree in degrees
    ]
    successful_results = [item for item in degree_results if item.get("solver", {}).get("success")]
    best = max(successful_results, key=lambda item: item["solver"]["sample_gap_margin"]) if successful_results else None
    positive_results = [
        item for item in successful_results if item["solver"]["sample_gap_margin"] > SOLVE_TOLERANCE
    ]

    sensitivity_results = []
    if not args.skip_sensitivity:
        for degree in sensitivity_degrees:
            for speed_margin in sensitivity_speed_margins:
                sensitivity_results.append(solve_degree(contract, input_packet, args, degree, speed_margin))

    status = (
        "sampled_velocity_bernstein_positive_margin_found"
        if positive_results
        else "sampled_velocity_bernstein_no_positive_margin_found"
    )

    return {
        "schema": "breather-fresh-v10-velocity-bernstein-itinerary-screen-v1",
        "packet_id": "fresh-v10-velocity-bernstein-itinerary-screen-v0",
        "source_packet": contract["packet_id"],
        "source_strict_gap_packet": input_packet["packet_id"],
        "status": status,
        "claim_level": (
            "priority-only finite sampled velocity-first Bernstein LP screen for same-itinerary "
            "strict-gap repair; not interval-certified"
        ),
        "branch_chart_authorized": False,
        "preledger_pass": False,
        "updates_live_ledger": False,
        "finite_screen_model": {
            "basis_model": "first-half velocity xdot=X'/T represented by Bernstein control values on three fixed separator arcs",
            "structural_difference": (
                "The field-speed itinerary is built into the Bernstein control corridor. "
                "Subfield arcs have -1+eta <= U <= 1-eta, the superfield arc has U <= -1-eta, "
                "and separator controls equal -1; X is recovered by quadrature and half-period anti-periodicity."
            ),
            "degrees": degrees,
            "speed_margin": args.speed_margin,
            "velocity_bound": args.velocity_bound,
            "gap_sample_count_per_interval": args.gap_sample_count + 1,
            "period": T0,
            "separator_arcs": arcs,
            "anti_periodic_policy": "U(theta+1/2)=-U(theta), X(theta+1/2)=-X(theta).",
            "solver": "scipy.optimize.linprog(method='highs') with 1e-10 feasibility tolerances",
            "strict_positive_tolerance": SOLVE_TOLERANCE,
        },
        "degree_results": degree_results,
        "best_result": best,
        "positive_results": positive_results,
        "speed_margin_sensitivity": sensitivity_results,
        "limitations": [
            "This is a finite sampled LP screen, not an outward-rounded interval certificate.",
            "The fixed separator locations are inherited from the fresh packet and are not optimized.",
            "The Bernstein control corridor gives a convex-hull sign certificate for the declared velocity arcs, but the collar gaps are still sampled.",
            "No live causal ledger, branch chart, fold atlas, or AAA theorem prose is updated.",
        ],
        "conclusion": (
            "The velocity-first Bernstein ansatz found a positive sampled strict-gap margin at one or more tested degrees."
            if positive_results
            else (
                "The velocity-first Bernstein sign-corridor ansatz does not find a positive sampled strict-gap margin "
                "at any tested degree or speed-margin sensitivity run."
            )
        ),
        "recommended_next_step": (
            "Do not promote directly; first convert the velocity controls into a candidate packet and run interval collar and proof-interval preledger checks."
            if positive_results
            else (
                "This closes the tested bounded fixed-separator velocity-corridor route as a constructive same-itinerary screen; "
                "the remaining same-itinerary options require nonlinear fold-coordinate collocation or an itinerary rebuild."
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
                str(item.get("degree")),
                str(item.get("control_count")),
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
                str(item.get("degree")),
                format_number(item.get("speed_margin")),
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
            format_number(row.get("receiver_theta")),
            format_number(row.get("source_theta")),
            row.get("arc") or "",
            "" if row.get("control_index") is None else str(row.get("control_index")),
        ]
        for row in rows
    ]


def build_report(screen):
    best = screen.get("best_result") or {}
    best_solver = best.get("solver", {})
    best_limiting = best.get("limiting_rows", [])
    sensitivity = screen.get("speed_margin_sensitivity", [])

    return f"""# Fresh v10 Velocity-Bernstein Itinerary Screen

## Scope

This packet is a priority-only finite sampled LP screen for a velocity-first
same-itinerary structural ansatz. It parameterizes
$U(\\theta)=X'(\\theta)/T_0$ on the three first-half arcs cut by the shifted
separator phases, then recovers $X$ by quadrature and half-period
anti-periodicity. Field-speed itinerary preservation is built into the
Bernstein control corridor:

- subfield arcs: $-1+\\eta\\le U\\le 1-\\eta$,
- superfield arc: $U\\le -1-\\eta$,
- separator controls: $U=-1$.

It does not claim an interval certificate, a repaired candidate, a proof-interval
preledger pass, a live ledger update, branch-chart authorization, or a theorem
in AAA prose.

Artifacts:

- `fresh_v10_velocity_bernstein_itinerary_screen.v0.json`
- `fresh_v10_velocity_bernstein_itinerary_screen.v0.md`
- `../../../../../scripts/proof-programs/fresh-v10-velocity-bernstein-itinerary-screen.py`

## Executed Command

```bash
/Users/markmorris/vibe/.venv/bin/python scripts/proof-programs/fresh-v10-velocity-bernstein-itinerary-screen.py --pretty
```

## Structural Screen

For each tested degree, the LP variables are Bernstein control values for
$U$ on the three first-half arcs and a sampled strict-gap margin $\\gamma$.
The period is fixed at $T_0={format_number(screen.get('finite_screen_model', {}).get('period'))}$.
The screen imposes the selected oriented null-coordinate gaps after reconstructing
$$
X(\\theta)=T_0\\left(\\int_0^\\theta U(s)\\,ds
-\\frac12\\int_0^{1/2}U(s)\\,ds\\right)
$$
on the first half and extending by $X(\\theta+1/2)=-X(\\theta)$.

{markdown_table(["Degree", "Controls", "Variables", "gamma sample", "max violation", "Status"], result_rows(screen.get("degree_results", [])))}

Best sampled margin:
$$
\\gamma_{{\\mathrm{{sample}}}}={format_number(best_solver.get('sample_gap_margin'))}.
$$

The best tested degree is `{best.get('degree')}` with `{best.get('control_count')}`
velocity controls and `{best.get('variable_count')}` LP variables.

## Speed-Margin Sensitivity

{markdown_table(["Degree", "speed margin", "gamma sample", "max violation"], sensitivity_rows(sensitivity))}

## Limiting Rows At Best Degree

{markdown_table(["Row", "Kind", "Slack", "receiver theta", "source theta", "arc", "control"], limiting_rows_table(best_limiting))}

## Conclusion

{screen.get('conclusion')}

Recommended next step: {screen.get('recommended_next_step')}

## Capture Decision

Priority-only. This screen is structurally different from additive Hermite
enrichment because it treats the velocity sign itinerary as a convex-hull
control law and derives the position function by quadrature. Promotion should
wait for either a positive candidate that survives interval collar checks and
the proof-interval preledger, or for an explicit itinerary rebuild.
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
