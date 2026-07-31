from __future__ import annotations

import hashlib
import json
import subprocess
import sys
import unittest
from decimal import Decimal
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ORACLE = (
    ROOT
    / "scripts/field-speed-ceiling/t0-six-path-mpmath-oracle.py"
)
INPUT = (
    ROOT
    / "scripts/field-speed-ceiling/t0-six-path-oracle-input.v1.json"
)
RECEIPT = (
    ROOT
    / "reference/priorities/field-speed-ceiling/"
    "fsc-004-t0-six-path-mpmath-receipt.v1.json"
)
PYTHON = Path(sys.executable)


def sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


class FieldSpeedCeilingT0MpmathOracleTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.input_packet = json.loads(INPUT.read_text(encoding="utf-8"))
        cls.receipt = json.loads(RECEIPT.read_text(encoding="utf-8"))
        completed = subprocess.run(
            [
                str(PYTHON),
                str(ORACLE),
                "--input",
                str(INPUT),
            ],
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        cls.reproduced = json.loads(completed.stdout)

    def test_checked_in_receipt_reproduces_exactly(self) -> None:
        self.assertEqual(self.reproduced, self.receipt)

    def test_provenance_hashes_bind_input_specification_and_oracle(self) -> None:
        provenance = self.receipt["provenance"]
        specification = self.input_packet["specification"]
        canonical_specification = json.dumps(
            specification,
            ensure_ascii=False,
            separators=(",", ":"),
            sort_keys=True,
        ).encode("utf-8")
        self.assertEqual(
            provenance["input_sha256"],
            sha256_bytes(INPUT.read_bytes()),
        )
        self.assertEqual(
            provenance["specification_sha256"],
            sha256_bytes(canonical_specification),
        )
        self.assertEqual(
            provenance["oracle_sha256"],
            sha256_bytes(ORACLE.read_bytes()),
        )
        self.assertEqual(provenance["decimal_digits"], 100)
        self.assertEqual(provenance["mpmath_version"], "1.3.0")
        self.assertIn("AAA_VENV", provenance["declared_reproduction_command"])

    def test_all_thirty_T0_roots_are_explicit_and_regular(self) -> None:
        inventory = self.receipt["ordinary_root_inventory"]
        roots = inventory["roots"]
        self.assertEqual(inventory["reception_time"], "0")
        self.assertEqual(inventory["distinct_label_ordered_roots"], 30)
        self.assertEqual(inventory["same_label_positive_delay_roots"], 0)
        self.assertEqual(len(roots), 30)
        self.assertEqual(
            len(
                {
                    (root["receiver"], root["transmitter"])
                    for root in roots
                }
            ),
            30,
        )
        self.assertTrue(
            all(root["receiver"] != root["transmitter"] for root in roots)
        )
        self.assertTrue(
            all(Decimal(root["D_t"]) > 0 for root in roots)
        )
        self.assertTrue(
            all(Decimal(root["D_r"]) > 0 for root in roots)
        )
        self.assertLess(
            max(abs(Decimal(root["residual"])) for root in roots),
            Decimal("2e-95"),
        )

    def test_four_published_T0_sign_inequalities_hold(self) -> None:
        witnesses = self.receipt["minimal_response_sign_inequalities"]
        self.assertEqual(len(witnesses), 4)
        self.assertTrue(all(witness["satisfied"] for witness in witnesses))
        expected = [
            ("<", Decimal("-0.3655392198715")),
            ("<", Decimal("-0.3655392198715")),
            (">", Decimal("0.8925757279332")),
            ("<", Decimal("-0.3301014265762")),
        ]
        for witness, (relation, published_value) in zip(witnesses, expected):
            self.assertEqual(witness["relation"], relation)
            self.assertLess(
                abs(Decimal(witness["value"]) - published_value),
                Decimal("5e-13"),
            )

    def test_claim_boundary_remains_T0_and_non_adoptive(self) -> None:
        boundary = self.receipt["claim_boundary"]
        joined = " ".join(boundary["does_not_establish"])
        self.assertIn("away from T=0", joined)
        self.assertIn("field-speed ceiling", joined)
        self.assertIn("boundary event law", joined)
        self.assertIn("continuation", joined)
        self.assertIn("conservation", joined)
        self.assertIn("Lorentz", joined)


if __name__ == "__main__":
    unittest.main()
