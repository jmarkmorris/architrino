from __future__ import annotations

import hashlib
import json
import subprocess
import sys
import unittest
from decimal import Decimal
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ORACLE = ROOT / "scripts/field-speed-ceiling/circular-binary-all-root-mpmath-oracle.py"
INPUT = ROOT / "scripts/field-speed-ceiling/circular-binary-all-root-certificate-input.v1.json"
RECEIPT = ROOT / "reference/priorities/field-speed-ceiling/fsc-010-circular-binary-all-root-mpmath-receipt.v1.json"


def sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


class CircularBinaryAllRootCertificateTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.input_packet = json.loads(INPUT.read_text(encoding="utf-8"))
        cls.receipt = json.loads(RECEIPT.read_text(encoding="utf-8"))
        completed = subprocess.run(
            [str(Path(sys.executable)), str(ORACLE), "--input", str(INPUT)],
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        cls.reproduced = json.loads(completed.stdout)

    def test_checked_in_receipt_reproduces_exactly(self) -> None:
        self.assertEqual(self.reproduced, self.receipt)

    def test_provenance_binds_input_specification_and_oracle(self) -> None:
        provenance = self.receipt["provenance"]
        specification = self.input_packet["specification"]
        canonical_specification = json.dumps(
            specification, ensure_ascii=False, separators=(",", ":"), sort_keys=True
        ).encode("utf-8")
        self.assertEqual(provenance["input_sha256"], sha256_bytes(INPUT.read_bytes()))
        self.assertEqual(provenance["specification_sha256"], sha256_bytes(canonical_specification))
        self.assertEqual(provenance["oracle_sha256"], sha256_bytes(ORACLE.read_bytes()))
        self.assertEqual(provenance["mpmath_version"], "1.3.0")
        self.assertEqual(provenance["decimal_digits"], 100)

    def test_dottie_bracket_and_regular_margins_are_strict(self) -> None:
        root = self.receipt["dottie_root_bracket"]
        bounds = self.receipt["reported_numerical_bounds"]
        self.assertLess(Decimal(root["lower_sign"]), 0)
        self.assertGreater(Decimal(root["upper_sign"]), 0)
        self.assertGreater(Decimal(bounds["D_t_equals_D_r_lower"]), 1)
        self.assertGreater(Decimal(bounds["raw_tangential_acceleration_lower"]), 0)
        self.assertLess(
            abs(Decimal(bounds["radial_balance_residual_midpoint"])), Decimal("2e-95")
        )

    def test_claim_boundary_excludes_dynamical_overclaims(self) -> None:
        boundary = " ".join(self.receipt["claim_boundary"]["does_not_establish"])
        for phrase in ("delayed-history", "capture", "stability", "conservation", "retained braid"):
            self.assertIn(phrase, boundary)


if __name__ == "__main__":
    unittest.main()
