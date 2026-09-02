from __future__ import annotations

import hashlib
import json
import subprocess
import sys
import unittest
from decimal import Decimal
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ORACLE = ROOT / "scripts/eom/stationary-mirror-incoming-oracle.py"
RECEIPT = (
    ROOT
    / "reference/priorities/master-equation-closure"
    / "mec-007-stationary-mirror-incoming-oracle.v1.json"
)


class Mec007StationaryMirrorIncomingOracleTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.receipt = json.loads(RECEIPT.read_text(encoding="utf-8"))

    def test_receipt_is_bound_to_current_independent_oracle(self) -> None:
        expected_hash = hashlib.sha256(ORACLE.read_bytes()).hexdigest()
        self.assertEqual(
            self.receipt["provenance"]["oracle_sha256"], expected_hash
        )
        completed = subprocess.run(
            [sys.executable, str(ORACLE), "--verify-receipt", str(RECEIPT)],
            cwd=ROOT,
            check=True,
            capture_output=True,
            text=True,
        )
        self.assertEqual(
            json.loads(completed.stdout),
            {
                "schema": "mec007_stationary_mirror_incoming_oracle/v1",
                "result": "verified",
            },
        )

    def test_complete_incoming_census_and_terminal_margins(self) -> None:
        census = self.receipt["analytic_census"]
        self.assertEqual(census["partner_root_count_per_ordered_channel"], 1)
        self.assertEqual(census["positive_delay_self_root_count_per_label"], 0)
        for run in self.receipt["runs"]:
            terminal = run["terminal"]
            self.assertGreater(Decimal(terminal["q"]), 0)
            self.assertGreater(Decimal(terminal["range"]), 0)
            self.assertGreater(Decimal(terminal["transmitter_factor"]), 0)
            self.assertEqual(
                Decimal(terminal["signed_relative_acceleration_integral"]),
                Decimal("2"),
            )
            self.assertEqual(Decimal(terminal["total_variation"]), Decimal("2"))
        self.assertEqual(
            self.receipt["same_event_and_measure_disposition"]["disposition"],
            "Not advanced",
        )

    def test_fine_refinement_and_independent_eom_checkpoint_agree(self) -> None:
        medium, fine = self.receipt["runs"][-2:]
        tolerances = {
            "reception": Decimal("5e-10"),
            "q": Decimal("3e-12"),
            "range": Decimal("5e-11"),
            "transmitter_factor": Decimal("2e-10"),
        }
        for field, tolerance in tolerances.items():
            difference = abs(
                Decimal(medium["terminal"][field])
                - Decimal(fine["terminal"][field])
            )
            self.assertLess(difference, tolerance)

        checkpoint = fine["time_checkpoints"]["1.395"]
        eom_intervals = {
            "emission": (
                Decimal("0.811741528434414269999999999999999999999621"),
                Decimal("0.811751475274239850000000000000000000001714"),
            ),
            "transmitter_factor": (
                Decimal("0.751291692354186714392499169836310808872205"),
                Decimal("0.751355542462877290974881722350782573975691"),
            ),
            "receiver_factor": (
                Decimal("1.57389507995823852060360228258342005186484"),
                Decimal("1.57399061970295409177003402244894821328917"),
            ),
        }
        for field, (lower, upper) in eom_intervals.items():
            value = Decimal(checkpoint[field])
            self.assertLess(lower, value)
            self.assertLess(value, upper)

        errors = [
            Decimal(run["quadrature"]["absolute_difference"])
            for run in self.receipt["runs"][1:]
        ]
        self.assertGreater(errors[0], errors[1])
        self.assertGreater(errors[1], errors[2])


if __name__ == "__main__":
    unittest.main()
