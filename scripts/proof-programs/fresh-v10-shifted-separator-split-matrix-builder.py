#!/usr/bin/env python3

import argparse
import json
import math
from pathlib import Path


CERT_DIR = Path("reference/priorities/proof-programs/breather-proof/certificate")
DEFAULT_CONTRACT = CERT_DIR / "fresh_same_packet_fold_shear_seed.v0.json"
DEFAULT_V10_LEDGER = CERT_DIR / "causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v10.json"
DEFAULT_OUT = CERT_DIR / "gap_opening_fresh_v10_strict_gap_input.shifted_separator_split2_fixed_period.v0.json"
OUTPUT_SCHEMA = "aaa-proof/null-coordinate-gap-opening-scan/v1"


def parse_args():
    parser = argparse.ArgumentParser(description="Build a split shifted-separator strict-gap matrix input.")
    parser.add_argument("--contract", default=str(DEFAULT_CONTRACT))
    parser.add_argument("--v10-ledger", default=str(DEFAULT_V10_LEDGER))
    parser.add_argument("--out", default=str(DEFAULT_OUT))
    parser.add_argument("--splits-per-arc", type=positive_int, default=2)
    parser.add_argument("--pretty", action="store_true")
    return parser.parse_args()


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
    output_path.write_text(json.dumps(value, indent=2 if pretty else None) + "\n")


def clean_number(value):
    if abs(value) < 1e-14:
        return 0
    return float(f"{value:.15g}")


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


def candidate_extrema_thetas(theta_range, arc):
    left, right = [float(value) for value in theta_range]
    arc_left, arc_right = [float(value) for value in arc["theta_range"]]
    arc_mid = (arc_left + arc_right) / 2
    candidates = [left, right]
    for lift in [0.0, 0.5]:
        for theta in [arc_left + lift, arc_mid + lift, arc_right + lift]:
            if left - 1e-12 <= theta <= right + 1e-12:
                candidates.append(max(left, min(right, theta)))
    return sorted({clean_number(value) for value in candidates})


def min_over(theta_range, arc, sign):
    return min(sign * bump_value(theta, arc) for theta in candidate_extrema_thetas(theta_range, arc))


def max_over(theta_range, arc, sign):
    return max(sign * bump_value(theta, arc) for theta in candidate_extrema_thetas(theta_range, arc))


def selected_strict_gap(strip):
    receiver_lo, receiver_hi = [float(value) for value in strip["receiver_range"]]
    source_lo, source_hi = [float(value) for value in strip["source_range"]]
    source_below_receiver_deficit = source_hi - receiver_lo
    receiver_below_source_deficit = receiver_hi - source_lo
    if source_below_receiver_deficit <= receiver_below_source_deficit:
        return {
            "orientation": "source_below_receiver",
            "required_margin": clean_number(max(0.0, source_below_receiver_deficit)),
            "source_below_receiver_deficit": clean_number(source_below_receiver_deficit),
            "receiver_below_source_deficit": clean_number(receiver_below_source_deficit),
        }
    return {
        "orientation": "receiver_below_source",
        "required_margin": clean_number(max(0.0, receiver_below_source_deficit)),
        "source_below_receiver_deficit": clean_number(source_below_receiver_deficit),
        "receiver_below_source_deficit": clean_number(receiver_below_source_deficit),
    }


def coefficients_for_gap(strip, orientation, arcs):
    coefficients = {}
    sign = 1 if strip["ledger"] == "w" else -1
    for arc in arcs:
        if orientation == "source_below_receiver":
            value = min_over(strip["receiver_theta_range"], arc, sign) - max_over(strip["source_theta_range"], arc, sign)
        else:
            value = min_over(strip["source_theta_range"], arc, sign) - max_over(strip["receiver_theta_range"], arc, sign)
        coefficients[arc["basis"]] = clean_number(value)
    return coefficients


def shifted_split_arcs(contract, splits_per_arc):
    sigma_1 = contract.get("shifted_separator_coordinates", {}).get("sigma_1")
    sigma_2 = contract.get("shifted_separator_coordinates", {}).get("sigma_2")
    if not isinstance(sigma_1, (int, float)) or not isinstance(sigma_2, (int, float)):
        raise ValueError("Fresh contract must provide shifted_separator_coordinates.sigma_1 and sigma_2.")
    base_arcs = [
        ("A0_shifted", 0.0, float(sigma_1)),
        ("A1_shifted", float(sigma_1), float(sigma_2)),
        ("A2_shifted", float(sigma_2), 0.5),
    ]
    arcs = []
    for arc_index, (arc_id, left, right) in enumerate(base_arcs):
        width = (right - left) / splits_per_arc
        for split in range(splits_per_arc):
            split_left = left + split * width
            split_right = left + (split + 1) * width
            arcs.append(
                {
                    "id": f"{arc_id}_s{split + 1}",
                    "theta_range": [clean_number(split_left), clean_number(split_right)],
                    "basis": f"h_A{arc_index}s{split + 1}",
                }
            )
    return arcs


def assert_inputs(contract, ledger):
    if contract["packet_id"] != "fresh-same-packet-fold-shear-seed-v0":
        raise ValueError(f"Unexpected contract packet_id: {contract['packet_id']}")
    if ledger["schema"] != "breather-causal-ledger-fresh-proof-interval-v10":
        raise ValueError("Proof-interval-v10 ledger schema mismatch.")
    if ledger["packet_id"] != contract["packet_id"]:
        raise ValueError("Ledger packet_id does not match contract packet_id.")
    strips = ledger.get("parent_complement_strips_v10", [])
    if not isinstance(strips, list) or len(strips) != 10:
        raise ValueError("Expected exactly 10 v10 parent-complement strips.")
    if ledger.get("branch_chart_authorized") or ledger.get("preledger_pass") or ledger.get("updates_live_ledger"):
        raise ValueError("Imported v10 unexpectedly authorizes a live preledger or branch chart.")


def build_input(contract, ledger, splits_per_arc):
    assert_inputs(contract, ledger)
    arcs = shifted_split_arcs(contract, splits_per_arc)
    gap_constraints = []
    for strip in ledger["parent_complement_strips_v10"]:
        gap = selected_strict_gap(strip)
        gap_constraints.append(
            {
                "id": strip["strip_id"],
                "collar_id": strip["strip_id"],
                "parent_base_row_id": strip["parent_base_row_id"],
                "simple_root_subrow_id": strip["simple_root_subrow_id"],
                "ledger": strip["ledger"],
                "side": strip["side"],
                "receiver_interval": strip["receiver_interval"],
                "source_interval": strip["source_interval"],
                "receiver_theta_range": strip["receiver_theta_range"],
                "source_theta_range": strip["source_theta_range"],
                "receiver_range": strip["receiver_range"],
                "source_range": strip["source_range"],
                "orientation": gap["orientation"],
                "source_below_receiver_deficit": gap["source_below_receiver_deficit"],
                "receiver_below_source_deficit": gap["receiver_below_source_deficit"],
                "required_margin": gap["required_margin"],
                "coefficients": coefficients_for_gap(strip, gap["orientation"], arcs),
            }
        )

    return {
        "schema": OUTPUT_SCHEMA,
        "packet_id": f"fresh-v10-shifted-separator-split{splits_per_arc}-fixed-period-strict-gap-matrix-v0",
        "packet_identity": {
            "source_packet": ledger["packet_id"],
            "source_refinement": ledger["refinement_id"],
            "matrix_status": "diagnostic_v10_parent_complement_shifted_separator_split_basis_fixed_period_not_full_candidate",
            "basis_model": f"shifted_separator_aligned_split{splits_per_arc}_half_period_antisymmetric_c1_arc_bumps",
            "period_mode": "fixed",
            "separator_policy": (
                "Basis subarcs split the fresh shifted separator arcs; each bump has zero theta-derivative "
                "at its subarc endpoints, including the four separator phases."
            ),
        },
        "source": (
            "Proof-interval-v10 parent-complement collars evaluated against split shifted-separator "
            "half-period-antisymmetric C1 bumps on the current fresh packet."
        ),
        "claim_limits": {
            "claims_breather": False,
            "claims_preledger_pass": False,
            "claims_branch_chart_authorization": False,
            "claims_interval_certification": False,
            "claims_live_candidate": False,
            "claims_full_structural_jacobian": False,
            "claims_finite_itinerary_preservation": False,
        },
        "basis_definition": {
            "first_half_arcs": arcs,
            "formula": (
                "psi(theta)=sin(pi*(theta-L)/(R-L))^2 on its shifted split subarc and 0 outside; "
                "H(theta+1/2)=-H(theta)."
            ),
            "coordinate_functionals": {
                "w": "z_w(theta)=T_cyc theta + X(theta)",
                "u": "z_u(theta)=T_cyc theta - X(theta)",
            },
            "fixed_period": True,
            "separator_velocity_note": (
                "Because the declared separator phases are subarc endpoints and sin^2 has zero derivative "
                "at endpoints, this basis preserves separator velocities to first order at fixed period."
            ),
            "extrema_note": (
                "Rows use finite extrema candidates for each declared basis on the listed v10 collar intervals; "
                "this is a diagnostic tangent matrix, not an outward-rounded interval certificate."
            ),
        },
        "variables": [
            {"id": arc["basis"], "meaning": f"C1 {arc['id']} bump shear, extended by H(theta+1/2)=-H(theta)"}
            for arc in arcs
        ],
        "structural_constraints": [],
        "gap_constraints": gap_constraints,
        "source_summary": ledger["summary"],
        "limitations": [
            "Diagnostic finite tangent matrix only; it is not a full structural Jacobian for a solved candidate.",
            "Finite basis extrema are not outward-rounded interval lower bounds.",
            "Any candidate witness must still be checked as a finite deformation against the field-speed itinerary.",
            "The result must not update the live causal ledger or authorize branch-chart construction.",
        ],
    }


def main():
    args = parse_args()
    contract = read_json(args.contract)
    ledger = read_json(args.v10_ledger)
    write_json(args.out, build_input(contract, ledger, args.splits_per_arc), args.pretty)


if __name__ == "__main__":
    main()
