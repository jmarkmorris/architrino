#!/usr/bin/env python3
"""Arbitrary-precision T=0 oracle for the FSC six-path reference geometry.

This is a coordinate-space implementation separate from the JavaScript
time-scan instrument. It is deliberately limited to the prescribed T=0 slice.
"""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
from typing import Any

import mpmath as mp


REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_INPUT = (
    REPO_ROOT
    / "scripts/field-speed-ceiling/t0-six-path-oracle-input.v1.json"
)
RECEIPT_SCHEMA = "field_speed_ceiling_t0_six_path_mpmath_receipt/v1"


def canonical_json_bytes(value: Any) -> bytes:
    return json.dumps(
        value,
        ensure_ascii=False,
        separators=(",", ":"),
        sort_keys=True,
    ).encode("utf-8")


def sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


def add(left: list[mp.mpf], right: list[mp.mpf]) -> list[mp.mpf]:
    return [left[index] + right[index] for index in range(3)]


def subtract(left: list[mp.mpf], right: list[mp.mpf]) -> list[mp.mpf]:
    return [left[index] - right[index] for index in range(3)]


def scale(vector: list[mp.mpf], factor: mp.mpf) -> list[mp.mpf]:
    return [factor * value for value in vector]


def dot(left: list[mp.mpf], right: list[mp.mpf]) -> mp.mpf:
    return mp.fsum(left[index] * right[index] for index in range(3))


def cross(left: list[mp.mpf], right: list[mp.mpf]) -> list[mp.mpf]:
    return [
        left[1] * right[2] - left[2] * right[1],
        left[2] * right[0] - left[0] * right[2],
        left[0] * right[1] - left[1] * right[0],
    ]


def norm(vector: list[mp.mpf]) -> mp.mpf:
    return mp.sqrt(dot(vector, vector))


def unit(vector: list[mp.mpf]) -> list[mp.mpf]:
    magnitude = norm(vector)
    if magnitude <= 0:
        raise ValueError("cannot normalize the zero vector")
    return scale(vector, 1 / magnitude)


def label_name(label: tuple[int, int]) -> str:
    pair, member = label
    return f"{pair + 1}{'+' if member > 0 else '-'}"


def position(label: tuple[int, int], time: mp.mpf) -> list[mp.mpf]:
    pair, member_integer = label
    member = mp.mpf(member_integer)
    theta = time + pair * 2 * mp.pi / 3
    cosine = mp.cos(theta)
    sine = mp.sin(theta)
    if pair == 0:
        return [mp.mpf("0"), member * cosine, member * sine]
    if pair == 1:
        return [member * sine, mp.mpf("0"), member * cosine]
    return [member * cosine, member * sine, mp.mpf("0")]


def velocity(label: tuple[int, int], time: mp.mpf) -> list[mp.mpf]:
    pair, member_integer = label
    member = mp.mpf(member_integer)
    theta = time + pair * 2 * mp.pi / 3
    cosine = mp.cos(theta)
    sine = mp.sin(theta)
    if pair == 0:
        return [mp.mpf("0"), -member * sine, member * cosine]
    if pair == 1:
        return [member * cosine, mp.mpf("0"), -member * sine]
    return [-member * sine, member * cosine, mp.mpf("0")]


def causal_residual(
    receiver: tuple[int, int],
    transmitter: tuple[int, int],
    reception_time: mp.mpf,
    delay: mp.mpf,
) -> mp.mpf:
    return (
        norm(
            subtract(
                position(receiver, reception_time),
                position(transmitter, reception_time - delay),
            )
        )
        - delay
    )


def solve_root(
    receiver: tuple[int, int],
    transmitter: tuple[int, int],
    reception_time: mp.mpf,
    bisection_steps: int,
) -> mp.mpf:
    lower = mp.mpf("0")
    upper = mp.mpf("2")
    lower_residual = causal_residual(
        receiver, transmitter, reception_time, lower
    )
    upper_residual = causal_residual(
        receiver, transmitter, reception_time, upper
    )
    if lower_residual <= 0 or upper_residual > 0:
        raise ValueError(
            f"invalid root bracket for {label_name(receiver)} <- "
            f"{label_name(transmitter)}"
        )
    for _ in range(bisection_steps):
        midpoint = (lower + upper) / 2
        if midpoint == lower or midpoint == upper:
            break
        midpoint_residual = causal_residual(
            receiver, transmitter, reception_time, midpoint
        )
        if midpoint_residual == 0:
            return midpoint
        if midpoint_residual > 0:
            lower = midpoint
        else:
            upper = midpoint
    return (lower + upper) / 2


def decimal_token(value: mp.mpf, digits: int) -> str:
    if value == 0:
        return "0"
    return mp.nstr(
        value,
        n=digits,
        strip_zeros=False,
        min_fixed=-20,
        max_fixed=20,
    )


def projected_acceleration(
    raw_acceleration: list[mp.mpf],
    receiver_velocity: list[mp.mpf],
) -> list[mp.mpf]:
    speed_changing = dot(receiver_velocity, raw_acceleration)
    if speed_changing <= 0:
        return raw_acceleration
    return subtract(
        raw_acceleration,
        scale(receiver_velocity, speed_changing),
    )


def validate_input(packet: dict[str, Any]) -> None:
    if packet.get("schema") != "field_speed_ceiling_t0_six_path_oracle_input/v1":
        raise ValueError("unsupported input schema")
    specification = packet["specification"]
    expected_normalization = {
        "c_f": "1",
        "radius": "1",
        "omega": "1",
        "reception_time": "0",
        "coupling_factor": "1",
        "polarity_magnitude": "1",
    }
    if specification["normalization"] != expected_normalization:
        raise ValueError("v1 oracle admits only the declared normalized T=0 input")
    geometry = specification["geometry"]
    if geometry["phase_rule"] != "pair_index * 2*pi/3":
        raise ValueError("unsupported phase rule")
    if geometry["pair_indices"] != [0, 1, 2]:
        raise ValueError("v1 oracle requires exactly three declared pairs")
    if geometry["members"] != [1, -1]:
        raise ValueError("v1 oracle requires the declared antipodal members")
    if geometry["delay_bracket"] != ["0", "2"]:
        raise ValueError("unsupported delay bracket")


def build_receipt(
    input_path: Path,
    input_bytes: bytes,
    packet: dict[str, Any],
) -> dict[str, Any]:
    validate_input(packet)
    specification = packet["specification"]
    precision = int(specification["precision"]["decimal_digits"])
    bisection_steps = int(specification["precision"]["bisection_steps"])
    labels = [
        (pair, member)
        for pair in specification["geometry"]["pair_indices"]
        for member in specification["geometry"]["members"]
    ]
    reception_time = mp.mpf("0")

    with mp.workdps(precision):
        roots: list[dict[str, Any]] = []
        root_vectors: dict[tuple[str, str], dict[str, Any]] = {}
        for receiver in labels:
            for transmitter in labels:
                if receiver == transmitter:
                    continue
                delay = solve_root(
                    receiver,
                    transmitter,
                    reception_time,
                    bisection_steps,
                )
                transmitter_time = reception_time - delay
                separation = subtract(
                    position(receiver, reception_time),
                    position(transmitter, transmitter_time),
                )
                direction = unit(separation)
                residual = causal_residual(
                    receiver,
                    transmitter,
                    reception_time,
                    delay,
                )
                transmitter_jacobian = 1 - dot(
                    direction,
                    velocity(transmitter, transmitter_time),
                )
                receiver_jacobian = 1 - dot(
                    direction,
                    velocity(receiver, reception_time),
                )
                if transmitter_jacobian <= 0 or receiver_jacobian <= 0:
                    raise ValueError("reference root left the ordinary chart")
                receiver_name = label_name(receiver)
                transmitter_name = label_name(transmitter)
                roots.append(
                    {
                        "receiver": receiver_name,
                        "transmitter": transmitter_name,
                        "delay": decimal_token(delay, precision),
                        "residual": decimal_token(residual, precision),
                        "D_t": decimal_token(
                            transmitter_jacobian, precision
                        ),
                        "D_r": decimal_token(receiver_jacobian, precision),
                    }
                )
                root_vectors[(receiver_name, transmitter_name)] = {
                    "delay": delay,
                    "direction": direction,
                    "D_t": transmitter_jacobian,
                }

        orientation_results: dict[
            tuple[tuple[int, ...], str], dict[str, mp.mpf]
        ] = {}
        for orientation_list in specification["polarity_orientations"]:
            orientation = tuple(int(value) for value in orientation_list)
            for receiver in labels:
                receiver_name = label_name(receiver)
                raw_acceleration = [mp.mpf("0")] * 3
                receiver_polarity = (
                    orientation[receiver[0]] * receiver[1]
                )
                for transmitter in labels:
                    if receiver == transmitter:
                        continue
                    transmitter_name = label_name(transmitter)
                    root = root_vectors[(receiver_name, transmitter_name)]
                    transmitter_polarity = (
                        orientation[transmitter[0]] * transmitter[1]
                    )
                    magnitude = (
                        receiver_polarity
                        * transmitter_polarity
                        / (root["delay"] ** 2 * root["D_t"])
                    )
                    raw_acceleration = add(
                        raw_acceleration,
                        scale(root["direction"], magnitude),
                    )
                receiver_position = position(receiver, reception_time)
                receiver_velocity = velocity(receiver, reception_time)
                binormal = unit(
                    cross(receiver_position, receiver_velocity)
                )
                projected = projected_acceleration(
                    raw_acceleration, receiver_velocity
                )
                orientation_results[(orientation, receiver_name)] = {
                    "V_dot_A0": dot(
                        receiver_velocity, raw_acceleration
                    ),
                    "b_dot_projected_A0": dot(binormal, projected),
                }

        inequalities = []
        for witness in specification["sign_witnesses"]:
            orientation = tuple(int(value) for value in witness["orientation"])
            value = orientation_results[
                (orientation, witness["receiver"])
            ][witness["quantity"]]
            threshold = mp.mpf(witness["threshold"])
            relation = witness["relation"]
            satisfied = (
                value < threshold if relation == "<" else value > threshold
            )
            inequalities.append(
                {
                    "orientation": list(orientation),
                    "receiver": witness["receiver"],
                    "quantity": witness["quantity"],
                    "value": decimal_token(value, precision),
                    "relation": relation,
                    "threshold": witness["threshold"],
                    "satisfied": bool(satisfied),
                }
            )

        maximum_absolute_residual = max(
            abs(mp.mpf(root["residual"])) for root in roots
        )
        minimum_transmitter_jacobian = min(
            mp.mpf(root["D_t"]) for root in roots
        )
        minimum_receiver_jacobian = min(
            mp.mpf(root["D_r"]) for root in roots
        )

        receipt = {
            "schema": RECEIPT_SCHEMA,
            "authority": "arbitrary-precision T=0 coordinate-space diagnostic",
            "scope": packet["scope"],
            "provenance": {
                "input_path": input_path.relative_to(REPO_ROOT).as_posix(),
                "input_sha256": sha256_bytes(input_bytes),
                "specification_sha256": sha256_bytes(
                    canonical_json_bytes(specification)
                ),
                "oracle_path": Path(__file__)
                .resolve()
                .relative_to(REPO_ROOT)
                .as_posix(),
                "oracle_sha256": sha256_bytes(
                    Path(__file__).resolve().read_bytes()
                ),
                "mpmath_version": mp.__version__,
                "decimal_digits": precision,
                "bisection_steps": bisection_steps,
                "declared_reproduction_command": packet[
                    "declared_reproduction_command"
                ],
            },
            "ordinary_root_inventory": {
                "reception_time": "0",
                "labels": len(labels),
                "distinct_label_ordered_roots": len(roots),
                "same_label_positive_delay_roots": 0,
                "same_label_certificate": (
                    "analytic chord-arc inequality "
                    "2*sin(delay/2) < delay for delay > 0"
                ),
                "all_D_t_positive": all(
                    mp.mpf(root["D_t"]) > 0 for root in roots
                ),
                "all_D_r_positive": all(
                    mp.mpf(root["D_r"]) > 0 for root in roots
                ),
                "maximum_absolute_residual": decimal_token(
                    maximum_absolute_residual, precision
                ),
                "minimum_D_t": decimal_token(
                    minimum_transmitter_jacobian, precision
                ),
                "minimum_D_r": decimal_token(
                    minimum_receiver_jacobian, precision
                ),
                "roots": roots,
            },
            "minimal_response_sign_inequalities": inequalities,
            "claim_boundary": {
                "establishes": [
                    "100-decimal-place reproduction of the thirty distinct-label T=0 roots",
                    "positive D_t and D_r for all thirty T=0 roots",
                    "the four declared T=0 sign inequalities",
                ],
                "does_not_establish": [
                    "a result away from T=0",
                    "an interval-certified global root theorem",
                    "a field-speed ceiling",
                    "a boundary event law",
                    "continuation or braid retention",
                    "conservation",
                    "Planck-scale or Lorentz recovery",
                ],
            },
        }
    return receipt


def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, default=DEFAULT_INPUT)
    parser.add_argument("--write-receipt", type=Path)
    return parser.parse_args()


def main() -> None:
    arguments = parse_arguments()
    input_path = arguments.input.resolve()
    input_bytes = input_path.read_bytes()
    packet = json.loads(input_bytes)
    receipt = build_receipt(input_path, input_bytes, packet)
    rendered = json.dumps(receipt, indent=2, ensure_ascii=False) + "\n"
    if arguments.write_receipt:
        receipt_path = arguments.write_receipt.resolve()
        receipt_path.write_text(rendered, encoding="utf-8")
    print(rendered, end="")


if __name__ == "__main__":
    main()
