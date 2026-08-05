#!/usr/bin/env python3
"""Replay the FSC-010 Dottie-endpoint numerical witness receipt.

The all-lambda root census is analytic.  This oracle binds only the declared
equal-speed normalized endpoint numbers to the input and source hashes.
"""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
from typing import Any

import mpmath as mp


REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_INPUT = REPO_ROOT / "scripts/field-speed-ceiling/circular-binary-all-root-certificate-input.v1.json"
RECEIPT_SCHEMA = "field_speed_ceiling_circular_binary_all_root_mpmath_receipt/v1"


def canonical_json_bytes(value: Any) -> bytes:
    return json.dumps(value, ensure_ascii=False, separators=(",", ":"), sort_keys=True).encode("utf-8")


def sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


def token(value: mp.mpf, digits: int) -> str:
    return mp.nstr(value, n=digits, strip_zeros=False, min_fixed=-20, max_fixed=20)


def f(value: mp.mpf) -> mp.mpf:
    return value - mp.cos(value)


def validate_input(packet: dict[str, Any]) -> None:
    if packet.get("schema") != "field_speed_ceiling_circular_binary_all_root_certificate_input/v1":
        raise ValueError("unsupported input schema")
    spec = packet["specification"]
    if spec["normalization"] != {"c_f": "1", "c_a": "1", "K": "1"}:
        raise ValueError("v1 receipt fixes the normalized equal-speed endpoint")
    if spec["root_equation"] != "xi - cos(xi) = 0 on [0, 1]":
        raise ValueError("unsupported root equation")
    if int(spec["precision"]["decimal_digits"]) < 80:
        raise ValueError("at least 80 decimal digits are required")
    if int(spec["precision"]["bisection_steps"]) < 200:
        raise ValueError("at least 200 bisection steps are required")


def build_receipt(input_path: Path, input_bytes: bytes, packet: dict[str, Any]) -> dict[str, Any]:
    validate_input(packet)
    spec = packet["specification"]
    digits = int(spec["precision"]["decimal_digits"])
    steps = int(spec["precision"]["bisection_steps"])
    lower_text, upper_text = spec["dottie_bracket"]

    with mp.workdps(digits):
        lower = mp.mpf(lower_text)
        upper = mp.mpf(upper_text)
        if not (lower > 0 and upper < 1 and f(lower) < 0 and f(upper) > 0):
            raise ValueError("declared Dottie bracket fails its sign certificate")
        left, right = lower, upper
        for _ in range(steps):
            middle = (left + right) / 2
            if f(middle) < 0:
                left = middle
            else:
                right = middle
        dottie = (left + right) / 2
        sin_lower, sin_upper = mp.sin(lower), mp.sin(upper)
        factor_lower = lower * (1 + sin_lower)
        factor_upper = upper * (1 + sin_upper)
        radius_lower = 1 / (4 * factor_upper)
        radius_upper = 1 / (4 * factor_lower)
        omega_lower = 4 * factor_lower
        omega_upper = 4 * factor_upper
        dt_lower = 1 + sin_lower
        dt_upper = 1 + sin_upper
        residual = f(dottie)
        compatible_radius = 1 / (4 * dottie * (1 + mp.sin(dottie)))
        raw_radial_at_radius = -1 / (4 * compatible_radius**2 * dottie * (1 + mp.sin(dottie)))
        required_radial_at_radius = -1 / compatible_radius
        balance_residual = raw_radial_at_radius - required_radial_at_radius
        # At the compatible radius and the Dottie endpoint,
        # A_theta = 4*sin(D)*(1+sin(D)), which is increasing on this bracket.
        raw_tangential_lower = 4 * sin_lower * (1 + sin_lower)

        return {
            "schema": RECEIPT_SCHEMA,
            "authority": "reproducible arbitrary-precision normalized Dottie-endpoint numerical witness",
            "scope": "numeric witness for c_f=c_a=K=1 only; analytic packet supplies the all-lambda proof",
            "provenance": {
                "input_path": str(input_path.relative_to(REPO_ROOT)),
                "input_sha256": sha256_bytes(input_bytes),
                "specification_sha256": sha256_bytes(canonical_json_bytes(spec)),
                "oracle_path": "scripts/field-speed-ceiling/circular-binary-all-root-mpmath-oracle.py",
                "oracle_sha256": sha256_bytes(Path(__file__).read_bytes()),
                "mpmath_version": mp.__version__,
                "decimal_digits": digits,
                "bisection_steps": steps,
                "declared_reproduction_command": "VIRTUAL_ENV=\"${AAA_VENV:-../.venv}\" \"${AAA_VENV:-../.venv}/bin/python\" scripts/field-speed-ceiling/circular-binary-all-root-mpmath-oracle.py --input scripts/field-speed-ceiling/circular-binary-all-root-certificate-input.v1.json --write-receipt reference/priorities/field-speed-ceiling/fsc-010-circular-binary-all-root-mpmath-receipt.v1.json",
            },
            "dottie_root_bracket": {
                "equation": "xi - cos(xi) = 0",
                "lower": lower_text,
                "upper": upper_text,
                "lower_sign": token(f(lower), digits),
                "upper_sign": token(f(upper), digits),
                "bisection_midpoint": token(dottie, digits),
                "midpoint_residual": token(residual, digits),
                "analytic_uniqueness": "xi - cos(xi) is strictly increasing on [0, 1]",
            },
            "reported_numerical_bounds": {
                "D_t_equals_D_r_lower": token(dt_lower, digits),
                "D_t_equals_D_r_upper": token(dt_upper, digits),
                "D_times_one_plus_sin_D_lower": token(factor_lower, digits),
                "D_times_one_plus_sin_D_upper": token(factor_upper, digits),
                "compatible_radius_lower": token(radius_lower, digits),
                "compatible_radius_upper": token(radius_upper, digits),
                "angular_frequency_lower": token(omega_lower, digits),
                "angular_frequency_upper": token(omega_upper, digits),
                "raw_tangential_acceleration_lower": token(raw_tangential_lower, digits),
                "compatible_radius_midpoint": token(compatible_radius, digits),
                "raw_radial_acceleration_midpoint": token(raw_radial_at_radius, digits),
                "required_radial_acceleration_midpoint": token(required_radial_at_radius, digits),
                "radial_balance_residual_midpoint": token(balance_residual, digits),
            },
            "analytic_certificate": {
                "partner_root": "one positive root for each lambda in (0,1], from xi=lambda*cos(xi) on [0,lambda]",
                "root_factors": "D_t=D_r=c_f*(1+lambda*sin(xi_lambda))>0",
                "same_transmitter": "no positive-delay self root: eta=lambda*abs(sin(eta)) implies 0<eta<=lambda<=1 and eta>lambda*sin(eta)",
                "response": "the complete two-label raw ledger has inward radial and forward tangential components; post-sum ceiling response removes the forward component",
                "balance": "R=K/[4*c_a^2*cos(xi_lambda)*(1+lambda*sin(xi_lambda))], abs(omega)=c_a/R",
            },
            "claim_boundary": {
                "does_not_establish": [
                    "a coupled delayed-history solution", "capture", "stability", "conservation", "action transfer", "a retained braid", "adoption of a path-speed ceiling"
                ]
            },
        }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=Path, default=DEFAULT_INPUT)
    parser.add_argument("--write-receipt", type=Path)
    args = parser.parse_args()
    input_path = args.input.resolve()
    input_bytes = input_path.read_bytes()
    receipt = build_receipt(input_path, input_bytes, json.loads(input_bytes))
    rendered = json.dumps(receipt, ensure_ascii=False, indent=2) + "\n"
    if args.write_receipt:
        args.write_receipt.write_text(rendered, encoding="utf-8")
    else:
        print(rendered, end="")


if __name__ == "__main__":
    main()
