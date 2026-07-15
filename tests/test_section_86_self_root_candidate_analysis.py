from __future__ import annotations

import csv
import importlib.util
import tempfile
import unittest
from decimal import Decimal
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts/eom/analyze-section-86-self-root-candidate.py"
SPEC = importlib.util.spec_from_file_location(
    "section_86_self_root_candidate_analysis",
    SCRIPT,
)
assert SPEC is not None and SPEC.loader is not None
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class Section86SelfRootCandidateAnalysisTests(unittest.TestCase):
    def test_exact_token_tsv_builds_oracle_history(self) -> None:
        fieldnames = [
            "start_time",
            "reception_time",
            "failure_code",
            "correction_iteration",
            "path_id",
            "history_id",
            "history_fingerprint",
            "segment_index",
            "t_start",
            "t_end",
            "x0",
            "x1",
            "x2",
            "x3",
            "y0",
            "y1",
            "y2",
            "y3",
            "z0",
            "z1",
            "z2",
            "z3",
            "position_error",
            "velocity_error",
        ]
        row = {
            "start_time": "-1",
            "reception_time": "0",
            "failure_code": "root_completeness_not_certified",
            "correction_iteration": "0",
            "path_id": "M+",
            "history_id": "stationary-self",
            "history_fingerprint": "fnv1a64:test",
            "segment_index": "0",
            "t_start": "-1",
            "t_end": "0",
            "x0": "0",
            "x1": "0",
            "x2": "0",
            "x3": "0",
            "y0": "0",
            "y1": "0",
            "y2": "0",
            "y3": "0",
            "z0": "0",
            "z1": "0",
            "z2": "0",
            "z3": "0",
            "position_error": "0",
            "velocity_error": "0",
        }
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "candidate.tsv"
            with path.open("w", newline="", encoding="utf-8") as stream:
                writer = csv.DictWriter(
                    stream,
                    fieldnames=fieldnames,
                    delimiter="\t",
                )
                writer.writeheader()
                writer.writerow(row)
            metadata, histories = MODULE.parse_candidate(path, precision=90)

        self.assertEqual(metadata["reception_time"], "0")
        self.assertEqual(tuple(histories), ("M+",))
        self.assertEqual(histories["M+"].t_start, Decimal("-1"))

    def test_classification_requires_both_middle_paths(self) -> None:
        certified = {"status": "certified_complete"}
        failed = {"status": "uncertified"}
        self.assertEqual(
            MODULE.classify((certified, certified), (certified, certified)),
            "native_certificate_defect_indicated",
        )
        self.assertEqual(
            MODULE.classify((failed, failed), (certified, certified)),
            "stored_history_reconstruction_envelope_horizon",
        )
        self.assertEqual(
            MODULE.classify((failed, failed), (failed, failed)),
            "independent_oracle_horizon_unresolved",
        )
        self.assertEqual(
            MODULE.classify(
                (failed, failed),
                (certified, certified),
                join_floor_within_stored_envelope=False,
            ),
            "independent_oracle_horizon_unresolved",
        )

    def test_join_floor_preserves_coefficients_and_covers_nominal_join(self) -> None:
        left = MODULE.CubicHistorySegment.from_decimal_tokens(
            t_start="0",
            t_end="1",
            coefficients=(("0", "1", "0", "0"), ("0",) * 4, ("0",) * 4),
            position_error="1e-6",
            velocity_error="1e-6",
            precision=90,
        )
        right = MODULE.CubicHistorySegment.from_decimal_tokens(
            t_start="1",
            t_end="2",
            coefficients=(
                ("1.0000000001", "1.0000000002", "0", "0"),
                ("0",) * 4,
                ("0",) * 4,
            ),
            position_error="1e-6",
            velocity_error="1e-6",
            precision=90,
        )
        bounded = MODULE.PiecewisePolynomialHistory.from_segments(
            (left, right),
            history_id="join-floor-test",
        )

        floor, diagnostics = MODULE.join_floor_history(bounded)

        self.assertEqual(floor.segments[0].coefficients, left.coefficients)
        self.assertEqual(floor.segments[1].coefficients, right.coefficients)
        self.assertEqual(
            floor.segments[0].position_error,
            Decimal("0.00000000005"),
        )
        self.assertEqual(
            floor.segments[1].velocity_error,
            Decimal("0.0000000001"),
        )
        self.assertTrue(diagnostics["floor_within_stored_envelope"])


if __name__ == "__main__":
    unittest.main()
