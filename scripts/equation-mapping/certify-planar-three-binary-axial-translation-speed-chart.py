#!/usr/bin/env python3

"""Certify the bounded axial-translation-speed chart on T02 through T36.

This wrapper consumes the frozen, independently authored stationary interval
oracle and its accepted zero-count receipt.  It evaluates the exact signed
axial weight on every certified stationary balance bracket.  It imports no
prescribed-path subject evaluator and performs no new stationary root search.
"""

from __future__ import annotations

import hashlib
import importlib.util
import json
import sys
from pathlib import Path

import mpmath as mp


ROOT = Path(__file__).resolve().parents[2]
STATIONARY_OWNER = ROOT / ".local-data/braid-analysis/b13-velocity-search"
STATIONARY_RECEIPT = STATIONARY_OWNER / "2026-08-29-b13-equal-radius-interval-zero-count.v1.json"
STATIONARY_ORACLE = STATIONARY_OWNER / "interval_b13_zero_count.py"

FROZEN_STATIONARY_RECEIPT_SHA256 = "fd83e4ea68aace450fc945e410182177c048be05a592608a865e14bc93e463af"
FROZEN_STATIONARY_ORACLE_SHA256 = "b16ea1f0137ccbf5349012fb341a461c4af89b5ad968fe1d4151212ebfa582f4"
INTERVAL_DPS = 80
POINT_DPS = 120
TRANSLATION_INTERVAL = (mp.mpf("-0.9"), mp.mpf("0.9"))


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def load_stationary_oracle():
    specification = importlib.util.spec_from_file_location(
        "frozen_stationary_b13_interval_oracle_for_axial_speed_chart",
        STATIONARY_ORACLE,
    )
    module = importlib.util.module_from_spec(specification)
    sys.modules[specification.name] = module
    specification.loader.exec_module(module)
    return module


def interval_string(module, value, digits=50):
    return [
        mp.nstr(module.lower(value), digits),
        mp.nstr(module.upper(value), digits),
    ]


def signed_axial_weight(module, oracle, beta_lo, beta_hi, topology):
    beta = module.I(beta_lo, beta_hi)
    total = module.I(0)
    minimum_transversality = mp.inf
    root_count = 0
    for branch in oracle.branches(topology):
        root = oracle.root_over(beta_lo, beta_hi, branch)
        sine = mp.iv.sin(root)
        cosine = mp.iv.cos(root)
        jacobian = beta * cosine - 1
        expected_sign = 1 if branch.side == "rising" else -1
        if module.strict_sign(jacobian) != expected_sign:
            raise module.CertificateFailure(
                f"T{topology:02d} unresolved transversality for "
                f"m={branch.level} {branch.side}"
            )
        absolute_jacobian = jacobian if expected_sign == 1 else -jacobian
        minimum_transversality = min(
            minimum_transversality,
            module.lower(absolute_jacobian),
        )
        polarity = -1 if branch.level % 2 else 1
        total += polarity / (4 * sine * sine * absolute_jacobian)
        root_count += 1
    return total, minimum_transversality, root_count


def main():
    for path, expected in (
        (STATIONARY_RECEIPT, FROZEN_STATIONARY_RECEIPT_SHA256),
        (STATIONARY_ORACLE, FROZEN_STATIONARY_ORACLE_SHA256),
    ):
        actual = sha256(path)
        if actual != expected:
            raise RuntimeError(f"frozen input changed: {path}: {actual}")

    mp.mp.dps = POINT_DPS
    mp.iv.dps = INTERVAL_DPS
    module = load_stationary_oracle()
    module.mp.mp.dps = POINT_DPS
    module.mp.iv.dps = INTERVAL_DPS
    oracle = module.Oracle()

    stationary = json.loads(STATIONARY_RECEIPT.read_text())
    if not stationary["summary"]["allPassed"]:
        raise RuntimeError("stationary zero-count receipt is not accepted")

    rows = []
    for interval in stationary["intervals"]:
        topology = int(interval["topologyIntervalId"][1:])
        for zero in interval["zeros"]:
            beta_lo, beta_hi = map(mp.mpf, zero["betaBracket"])
            weight, minimum_transversality, root_count = signed_axial_weight(
                module,
                oracle,
                beta_lo,
                beta_hi,
                topology,
            )
            sign = module.strict_sign(weight)
            if sign is None:
                raise RuntimeError(
                    f"{interval['topologyIntervalId']} signed axial weight contains zero"
                )
            directed_root_count = 6 * root_count
            if directed_root_count != interval["directedRootCount"]:
                raise RuntimeError(
                    f"{interval['topologyIntervalId']} directed root count "
                    f"{directed_root_count} "
                    f"does not match {interval['directedRootCount']}"
                )
            rows.append({
                "topologyIntervalId": interval["topologyIntervalId"],
                "stationaryBetaBracket": zero["betaBracket"],
                "symmetryReducedRootCountPerReceiver": root_count,
                "directedRootCount": directed_root_count,
                "signedAxialWeight": interval_string(module, weight),
                "strictSign": sign,
                "minimumBranchTransversality": mp.nstr(
                    minimum_transversality,
                    40,
                ),
                "translatedBranchDisposition": (
                    "stationary balance at u=0; no full prescribed screw-path "
                    "balance for nonzero u in the declared interval"
                ),
            })

    expected_topologies = [f"T{index:02d}" for index in range(2, 37, 2)]
    actual_topologies = [row["topologyIntervalId"] for row in rows]
    if actual_topologies != expected_topologies:
        raise RuntimeError(
            f"expected {expected_topologies}, received {actual_topologies}"
        )
    if any(row["strictSign"] != -1 for row in rows):
        raise RuntimeError("not every certified signed axial weight is negative")

    packet = {
        "schema": "braid-program/planar-three-binary-axial-translation-speed-chart.v1",
        "declared": {
            "fieldSpeed": "1",
            "axialGroupSpeedInterval": [
                mp.nstr(TRANSLATION_INTERVAL[0]),
                mp.nstr(TRANSLATION_INTERVAL[1]),
            ],
            "nonzeroSpeedDomain": "-0.9<=u<0 or 0<u<=0.9",
            "stationaryBetaCoverage": ["0.05", "20"],
            "stationaryTopologyCoverage": ["T02", "T36 even classes"],
            "regularPhases": ["0", "pi/3", "2pi/3", "pi", "4pi/3", "5pi/3"],
            "polarities": [1, -1, 1, -1, 1, -1],
        },
        "frozenInputs": {
            "stationaryIntervalReceipt": str(STATIONARY_RECEIPT.relative_to(ROOT)),
            "stationaryIntervalReceiptSha256": FROZEN_STATIONARY_RECEIPT_SHA256,
            "stationaryIntervalOracle": str(STATIONARY_ORACLE.relative_to(ROOT)),
            "stationaryIntervalOracleSha256": FROZEN_STATIONARY_ORACLE_SHA256,
        },
        "arithmetic": {
            "kernel": "mpmath 1.3 libmpi arbitrary-precision interval arithmetic",
            "intervalDecimalDigits": INTERVAL_DPS,
            "pointDecimalDigits": POINT_DPS,
            "outwardRounding": "frozen stationary oracle interval primitives",
        },
        "exactReduction": {
            "gamma": "sqrt(1-u^2)",
            "transverseSpeed": "beta_f=gamma*b_n",
            "compatibleRadius": "R(u)=R_n/gamma",
            "axialResidual": "R_z(u)=u*S(b_n)",
            "signedAxialWeight": "S(b)=sum_m (-1)^m/[4 sin(v_m)^2 |b cos(v_m)-1|]",
        },
        "rows": rows,
        "summary": {
            "certifiedStationaryBalances": len(rows),
            "allSignedWeightsStrictlyNegative": True,
            "minimumAbsoluteSignedWeightLower": mp.nstr(
                min(-mp.mpf(row["signedAxialWeight"][1]) for row in rows),
                40,
            ),
            "decision": (
                "the only prescribed screw-path balances on the declared "
                "T02-through-T36 chart occur at u=0; no nonzero axial "
                "translation in [-0.9,0.9] balances"
            ),
            "allPassed": True,
        },
        "claimBoundary": (
            "computer-assisted derived finite-chart result for the equal-radius, "
            "regular-phase, common-circulation prescribed screw-path chart on "
            "the eighteen certified stationary balances T02 through T36 and "
            "-0.9<=u<=0.9 only; no completeness above beta=20, unequal-radius, "
            "phase-deformed, non-axial, release, retention, stability, binding, "
            "or physical-realization claim"
        ),
        "falsifier": (
            "a certified signed-weight interval containing zero, a missing or "
            "misowned stationary root, an invalid stationary zero count, a "
            "failure of the exact screw-path reduction, or an outward-rounding "
            "failure"
        ),
    }
    print(json.dumps(packet, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
