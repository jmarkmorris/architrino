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
DEFAULT_OUT_JSON = CERT_DIR / "fresh_v10_finite_itinerary_strict_gap_screen.shifted_separator.v0.json"
DEFAULT_OUT_MD = CERT_DIR / "fresh_v10_finite_itinerary_strict_gap_screen.shifted_separator.v0.md"

T0 = 6.28318530718
AMPLITUDE = 1.25
SOLVE_TOLERANCE = 1e-9


def parse_args():
    parser = argparse.ArgumentParser(
        description=(
            "Finite sampled LP screen for shifted-separator strict gaps plus "
            "field-speed sign-itinerary guards."
        )
    )
    parser.add_argument("--contract", default=str(DEFAULT_CONTRACT))
    parser.add_argument("--input", default=str(DEFAULT_INPUT))
    parser.add_argument("--out-json", default=str(DEFAULT_OUT_JSON))
    parser.add_argument("--out-md", default=str(DEFAULT_OUT_MD))
    parser.add_argument("--pretty", action="store_true")
    parser.add_argument("--amplitude-bound", type=positive_float, default=1.0)
    parser.add_argument("--gap-sample-count", type=positive_int, default=8)
    parser.add_argument("--speed-sample-count", type=positive_int, default=1000)
    parser.add_argument("--speed-guard", type=positive_float, default=0.015)
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


def read_json(path):
    return json.loads(Path(path).read_text())


def write_json(path, value, pretty):
    output_path = Path(path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    indent = 2 if pretty else None
    output_path.write_text(json.dumps(value, indent=indent) + "\n")


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


def basis_ids(input_packet):
    ids = [entry if isinstance(entry, str) else entry["id"] for entry in input_packet["variables"]]
    if not ids:
        raise ValueError("This screen expects at least one shifted-separator basis variable.")
    return ids


def arc_by_basis(input_packet):
    return {arc["basis"]: arc for arc in input_packet["basis_definition"]["first_half_arcs"]}


def basis_values(theta, ids, arcs):
    return [bump_value(theta, arcs[var_id]) for var_id in ids]


def basis_derivatives(theta, ids, arcs):
    return [bump_derivative(theta, arcs[var_id]) / T0 for var_id in ids]


def z_basis(theta, ledger, ids, arcs):
    sign = 1 if ledger == "w" else -1
    return [sign * value for value in basis_values(theta, ids, arcs)]


def samples(theta_range, count):
    left, right = [float(value) for value in theta_range]
    return [left + (right - left) * index / count for index in range(count + 1)]


def add_constraint(rows, bounds, metadata, coefficients, upper_bound, entry):
    rows.append(coefficients)
    bounds.append(upper_bound)
    metadata.append(entry)


def build_constraints(contract, input_packet, ids, arcs, args):
    rows = []
    bounds = []
    metadata = []
    bound = args.amplitude_bound
    variable_count = len(ids)

    for variable, var_id in enumerate(ids):
        upper = [0.0] * (variable_count + 1)
        upper[variable] = 1.0
        add_constraint(rows, bounds, metadata, upper, bound, {"id": f"bound_{var_id}_upper", "kind": "bound"})
        lower = [0.0] * (variable_count + 1)
        lower[variable] = -1.0
        add_constraint(rows, bounds, metadata, lower, bound, {"id": f"bound_{var_id}_lower", "kind": "bound"})

    for row in input_packet["gap_constraints"]:
        receiver_samples = samples(row["receiver_theta_range"], args.gap_sample_count)
        source_samples = samples(row["source_theta_range"], args.gap_sample_count)
        for receiver_theta in receiver_samples:
            for source_theta in source_samples:
                if row["orientation"] == "source_below_receiver":
                    base_gap = z_base(receiver_theta, row["ledger"], contract) - z_base(source_theta, row["ledger"], contract)
                    receiver_basis = z_basis(receiver_theta, row["ledger"], ids, arcs)
                    source_basis = z_basis(source_theta, row["ledger"], ids, arcs)
                    gap_derivative = [value - source_basis[index] for index, value in enumerate(receiver_basis)]
                elif row["orientation"] == "receiver_below_source":
                    base_gap = z_base(source_theta, row["ledger"], contract) - z_base(receiver_theta, row["ledger"], contract)
                    source_basis = z_basis(source_theta, row["ledger"], ids, arcs)
                    receiver_basis = z_basis(receiver_theta, row["ledger"], ids, arcs)
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

    included_speed_samples = 0
    excluded_speed_samples = 0
    for index in range(args.speed_sample_count):
        theta = (index + 0.5) / args.speed_sample_count
        xdot = existing_x_prime(theta, contract) / T0
        derivative_basis = basis_derivatives(theta, ids, arcs)
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

    counts = {
        "total": len(rows),
        "bound": sum(1 for entry in metadata if entry["kind"] == "bound"),
        "sampled_gap": sum(1 for entry in metadata if entry["kind"] == "sampled_gap"),
        "sampled_field_speed_sign": included_speed_samples,
        "excluded_field_speed_near_contact": excluded_speed_samples,
    }
    return np.array(rows, dtype=float), np.array(bounds, dtype=float), metadata, counts


def evaluate_rows(matrix, upper_bounds, metadata, solution):
    values = matrix @ solution - upper_bounds
    slacks = upper_bounds - matrix @ solution
    result = {}
    for kind in ["bound", "sampled_gap", "sampled_field_speed_sign"]:
        indexes = [index for index, entry in enumerate(metadata) if entry["kind"] == kind]
        limiting = sorted(indexes, key=lambda index: slacks[index])[:8]
        result[kind] = {
            "count": len(indexes),
            "max_violation": clean_number(max(values[index] for index in indexes)),
            "min_slack": clean_number(min(slacks[index] for index in indexes)),
            "limiting_rows": [
                {
                    "id": metadata[index]["id"],
                    "kind": metadata[index]["kind"],
                    "slack": clean_number(slacks[index]),
                    "value": clean_number(values[index]),
                    "ledger": metadata[index].get("ledger"),
                    "target": clean_number(metadata[index].get("target")),
                    "theta": clean_number(metadata[index].get("theta")),
                    "receiver_theta": clean_number(metadata[index].get("receiver_theta")),
                    "source_theta": clean_number(metadata[index].get("source_theta")),
                }
                for index in limiting
            ],
        }
    return result


def separator_derivative_audit(contract, ids, arcs):
    rows = []
    for separator_id, theta in contract.get("shifted_separator_coordinates", {}).items():
        if not isinstance(theta, (int, float)):
            continue
        derivatives = {var_id: clean_number(bump_derivative(theta, arcs[var_id]) / T0) for var_id in ids}
        rows.append(
            {
                "id": separator_id,
                "theta": clean_number(theta),
                "xdot_fresh": clean_number(existing_x_prime(theta, contract) / T0),
                "basis_xdot_derivatives": derivatives,
                "max_abs_basis_xdot_derivative": clean_number(max(abs(value) for value in derivatives.values())),
            }
        )
    return rows


def assert_inputs(contract, input_packet):
    if contract["packet_id"] != "fresh-same-packet-fold-shear-seed-v0":
        raise ValueError(f"Unexpected contract packet_id: {contract['packet_id']}")
    if not input_packet["packet_id"].startswith("fresh-v10-shifted-separator-") or not input_packet["packet_id"].endswith(
        "fixed-period-strict-gap-matrix-v0"
    ):
        raise ValueError(f"Unexpected shifted strict-gap input packet_id: {input_packet['packet_id']}")
    if input_packet.get("claim_limits", {}).get("claims_finite_itinerary_preservation"):
        raise ValueError("Input unexpectedly claims finite itinerary preservation.")


def build_screen(contract, input_packet, args):
    assert_inputs(contract, input_packet)
    ids = basis_ids(input_packet)
    arcs = arc_by_basis(input_packet)
    matrix, upper_bounds, metadata, counts = build_constraints(contract, input_packet, ids, arcs, args)
    objective = np.array([0.0] * len(ids) + [-1.0])
    result = linprog(
        objective,
        A_ub=matrix,
        b_ub=upper_bounds,
        bounds=[(-args.amplitude_bound, args.amplitude_bound)] * len(ids) + [(-10.0, 10.0)],
        method="highs",
    )

    base = {
        "schema": "breather-fresh-v10-finite-itinerary-strict-gap-screen-v1",
        "packet_id": "fresh-v10-finite-itinerary-strict-gap-screen-shifted-separator-v0",
        "source_packet": contract["packet_id"],
        "source_strict_gap_packet": input_packet["packet_id"],
        "claim_level": (
            "priority-only finite sampled LP screen for shifted-separator strict gaps "
            "plus field-speed sign itinerary; not interval-certified"
        ),
        "branch_chart_authorized": False,
        "preledger_pass": False,
        "updates_live_ledger": False,
        "variables": ids,
        "finite_screen_model": {
            "variable_count": len(ids),
            "basis_model": input_packet.get("packet_identity", {}).get("basis_model"),
            "coefficient_bound": args.amplitude_bound,
            "optimized_quantity": (
                "sampled strict-gap margin gamma with "
                "base_gap(theta_r,theta_s)+D_gap(theta_r,theta_s) h >= gamma"
            ),
            "gap_sample_count_per_interval": args.gap_sample_count + 1,
            "speed_midpoint_samples": args.speed_sample_count,
            "speed_guard": (
                "Samples whose current signed distance from xdot=+1 or xdot=-1 is "
                "below the guard are excluded as separator/contact neighborhoods."
            ),
            "speed_guard_value": args.speed_guard,
            "field_speed_inequality": (
                "For retained samples, sign(xdot_fresh(theta)-target)*(xdot_h(theta)-target) >= 0 "
                "for target in {-1,+1}."
            ),
        },
        "constraints": counts,
        "separator_derivative_audit": separator_derivative_audit(contract, ids, arcs),
        "limitations": [
            "This is a finite sampled LP screen, not an outward-rounded interval certificate.",
            "A nonpositive sampled optimum is a no-go for this declared bounded sample screen, not a proof over all bases or all interval points.",
            "The field-speed constraints preserve signs only at retained samples outside the declared speed guard; they do not certify root count.",
            "No live causal ledger, branch chart, fold atlas, or AAA theorem prose is updated.",
        ],
    }

    if not result.success:
        return {
            **base,
            "status": "screen_lp_solver_failed",
            "solver": {
                "method": "scipy.optimize.linprog(method='highs')",
                "success": False,
                "status_code": int(result.status),
                "message": result.message,
            },
            "conclusion": "The sampled LP did not solve, so this screen is inconclusive.",
            "recommended_next_step": "Rerun the screen with a smaller sample set or inspect the LP conditioning.",
        }

    solution = result.x
    sampled_gap_margin = solution[len(ids)]
    evaluation = evaluate_rows(matrix, upper_bounds, metadata, solution)
    status = (
        "sampled_feasible_candidate_found"
        if sampled_gap_margin > SOLVE_TOLERANCE
        else "sampled_itinerary_constraints_block_positive_strict_gap_margin"
    )
    return {
        **base,
        "status": status,
        "solver": {
            "method": "scipy.optimize.linprog(method='highs')",
            "success": True,
            "status_code": int(result.status),
            "message": result.message,
            "objective_minimized": clean_number(result.fun),
            "sample_gap_margin": clean_number(sampled_gap_margin),
            "coefficients": {var_id: clean_number(solution[index]) for index, var_id in enumerate(ids)},
            "max_constraint_violation": clean_number(float(np.max(matrix @ solution - upper_bounds))),
        },
        "evaluation": evaluation,
        "conclusion": (
            "The sampled finite screen found a bounded shifted-separator coefficient vector with positive sampled collar margin while preserving retained field-speed signs."
            if sampled_gap_margin > SOLVE_TOLERANCE
            else (
                "Under this bounded shifted-separator basis and retained field-speed sign samples, "
                "the sampled LP optimum has nonpositive strict-gap margin; the declared bounded basis "
                "is not enough for a finite itinerary-preserving strict-gap repair."
            )
        ),
        "recommended_next_step": (
            "Promote only to a candidate-generation attempt after interval root and null-coordinate certification, not directly to a pre-ledger pass."
            if sampled_gap_margin > SOLVE_TOLERANCE
            else (
                "Move from this declared shifted basis to a richer finite constrained basis or an explicit higher-fold itinerary decision; "
                "do not keep following single tangent rays in this basis."
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


def build_report(screen):
    coefficient_rows = [
        [f"`{key}`", format_number(value)] for key, value in screen.get("solver", {}).get("coefficients", {}).items()
    ]
    constraint_rows = [[key.replace("_", "\\_"), str(value)] for key, value in screen.get("constraints", {}).items()]
    limiting_gap_rows = screen.get("evaluation", {}).get("sampled_gap", {}).get("limiting_rows", [])
    limiting_speed_rows = screen.get("evaluation", {}).get("sampled_field_speed_sign", {}).get("limiting_rows", [])
    gap_rows = [
        [
            f"`{row['id']}`",
            format_number(row["slack"]),
            format_number(row["receiver_theta"]),
            format_number(row["source_theta"]),
        ]
        for row in limiting_gap_rows
    ]
    speed_rows = [
        [f"`{row['id']}`", format_number(row["target"]), format_number(row["theta"]), format_number(row["slack"])]
        for row in limiting_speed_rows
    ]
    separator_rows = [
        [
            f"`{row['id']}`",
            format_number(row["theta"]),
            format_number(row["xdot_fresh"]),
            format_number(row["max_abs_basis_xdot_derivative"]),
        ]
        for row in screen.get("separator_derivative_audit", [])
    ]

    return f"""# Fresh v10 Finite-Itinerary Strict-Gap Screen

## Scope

This packet is a priority-only finite sampled LP screen for the shifted-separator
strict-gap basis. It asks whether the declared shifted coefficients can open the
sampled v10 parent-complement collars while preserving the sampled field-speed
sign itinerary away from separator/contact neighborhoods.

It does not claim an interval certificate, a repaired candidate, a proof-interval
pre-ledger pass, a live ledger update, or branch-chart authorization.

Artifacts:

- `fresh_v10_finite_itinerary_strict_gap_screen.shifted_separator.v0.json`
- `fresh_v10_finite_itinerary_strict_gap_screen.shifted_separator.v0.md`
- `../../../../../scripts/proof-programs/fresh-v10-finite-itinerary-strict-gap-screen.py`

## Executed Command

```bash
/Users/markmorris/vibe/.venv/bin/python scripts/proof-programs/fresh-v10-finite-itinerary-strict-gap-screen.py --pretty
```

## Finite Screen

The LP variables are the shifted-separator coefficients and a sampled strict-gap
margin $\\gamma$. Each coefficient is bounded by
$|h_j|\\le {format_number(screen.get('finite_screen_model', {}).get('coefficient_bound'))}$.

For every sampled receiver/source pair in each v10 collar, the screen imposes
$$
z_{{\\ell,h}}(\\theta_r)-z_{{\\ell,h}}(\\theta_s)\\ge \\gamma
$$
or the reversed sampled orientation chosen by the v10 strict-gap target. For
retained field-speed samples it also imposes
$$
\\operatorname{{sign}}(\\dot X_{{\\mathrm{{fresh}}}}(\\theta)-v)
\\bigl(\\dot X_h(\\theta)-v\\bigr)\\ge 0,
\\qquad v\\in\\{{-1,+1\\}}.
$$
Samples within the speed guard are treated as separator/contact neighborhoods
and are not counted as sign-preservation guards.

{markdown_table(["Constraint class", "Count"], constraint_rows)}

## Solver Result

Status: `{screen.get('status')}`

Sampled strict-gap margin:
$$
\\gamma_{{\\mathrm{{sample}}}}={format_number(screen.get('solver', {}).get('sample_gap_margin'))}.
$$

{markdown_table(["Coefficient", "Value"], coefficient_rows)}

## Limiting Sampled Gap Rows

{markdown_table(["Collar", "Slack", "receiver theta", "source theta"], gap_rows)}

## Limiting Field-Speed Sign Rows

{markdown_table(["Row", "Target", "theta", "Slack"], speed_rows)}

## Separator Derivative Audit

The shifted bumps have zero derivative at the declared separator phases, so the
declared separator contacts remain fixed to first order in this basis.

{markdown_table(["Separator", "theta", "fresh xdot", "max abs basis xdot derivative"], separator_rows)}

## Conclusion

{screen.get('conclusion')}

Recommended next step: {screen.get('recommended_next_step')}

## Capture Decision

Priority-only. This screen sharpens the solver route but is not corpus-ready
theorem prose. Promotion should wait for an interval-certified repaired
candidate or for an explicit decision to replace the current itinerary.
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
